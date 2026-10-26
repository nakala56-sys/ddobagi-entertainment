import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { draggableLoop } from "./draggableLoop";

const mocks = vi.hoisted(() => ({
    ticks: new Set<(time: number, delta: number) => void>(),
    setX: vi.fn(),
    clear: vi.fn(),
}));

vi.mock("gsap", () => ({
    default: {
        quickSetter: () => mocks.setX,
        set: mocks.clear,
        ticker: {
            add: (callback: (time: number, delta: number) => void) => mocks.ticks.add(callback),
            remove: (callback: (time: number, delta: number) => void) => mocks.ticks.delete(callback),
        },
    },
}));

let reduced: { matches: boolean };
let resize: () => void;
let disconnect: ReturnType<typeof vi.fn>;
let cleanups: (() => void)[];

beforeEach(() => {
    vi.clearAllMocks();
    mocks.ticks.clear();
    reduced = { matches: false };
    cleanups = [];
    disconnect = vi.fn();
    vi.stubGlobal("window", { matchMedia: () => reduced });
    vi.stubGlobal("document", { hidden: false });
    vi.stubGlobal(
        "ResizeObserver",
        class {
            constructor(callback: () => void) {
                resize = callback;
            }
            observe = vi.fn();
            disconnect = disconnect;
        },
    );
});

afterEach(() => {
    cleanups.forEach((cleanup) => cleanup());
    vi.unstubAllGlobals();
});

function mount() {
    let width = 1000;
    const captures = new Set<number>();
    const track = {};
    const group = { getBoundingClientRect: () => ({ width }) };
    const root = Object.assign(new EventTarget(), {
        dataset: {} as Record<string, string>,
        clientWidth: 400,
        querySelector: (selector: string) => (selector === "[data-loop-track]" ? track : group),
        setPointerCapture: (id: number) => captures.add(id),
        hasPointerCapture: (id: number) => captures.has(id),
        releasePointerCapture: (id: number) => captures.delete(id),
    });
    const cleanup = draggableLoop(root as unknown as HTMLElement);
    cleanups.push(cleanup);
    return {
        root,
        captures,
        cleanup,
        resizeTo: (nextWidth: number) => {
            width = nextWidth;
            resize();
        },
    };
}

function pointer(root: EventTarget, type: string, x: number, y = 0, pointerId = 1, pointerType = "mouse", button = 0) {
    root.dispatchEvent(Object.assign(new Event(type), { clientX: x, clientY: y, pointerId, pointerType, button, isPrimary: true }));
}

function advance(frames = 60) {
    for (let frame = 0; frame < frames; frame++) mocks.ticks.forEach((tick) => tick(frame / 60, 1000 / 60));
}

function position() {
    return mocks.setX.mock.lastCall![0] as number;
}

describe("draggable photo loop", () => {
    it("starts drifting left slowly and pauses while held", () => {
        const { root } = mount();
        expect(mocks.setX).toHaveBeenCalled();
        advance();
        expect(position()).toBeCloseTo(-20);
        pointer(root, "pointerdown", 100);
        advance();
        expect(position()).toBeCloseTo(-20);
        pointer(root, "pointerup", 100);
        advance();
        expect(position()).toBeCloseTo(-40);
    });

    it.each(["mouse", "touch"])("follows %s dragging and resumes in its last direction", (type) => {
        const { root } = mount();
        pointer(root, "pointerdown", 200, 0, 1, type);
        pointer(root, "pointermove", 100, 0, 1, type);
        expect(position()).toBeCloseTo(-100);
        pointer(root, "pointermove", 140, 0, 1, type);
        expect(position()).toBeCloseTo(-60);
        pointer(root, "pointerup", 140, 0, 1, type);
        advance();
        expect(position()).toBeCloseTo(-40);
    });

    it("wraps in either direction even when a drag spans several loops", () => {
        const { root } = mount();
        pointer(root, "pointerdown", 0);
        pointer(root, "pointermove", -2150);
        expect(position()).toBeCloseTo(-150);
        pointer(root, "pointermove", 100);
        expect(position()).toBeCloseTo(-900);
    });

    it("lets vertical touch gestures scroll without moving the photos", () => {
        const { root, captures } = mount();
        pointer(root, "pointerdown", 100, 100, 1, "touch");
        pointer(root, "pointermove", 103, 160, 1, "touch");
        expect(position()).toBeCloseTo(0);
        expect(captures.size).toBe(0);
        advance();
        expect(position()).toBeCloseTo(-20);
    });

    it.each(["pointercancel", "lostpointercapture"])("resumes after %s and clears the dragging state", (event) => {
        const { root, captures } = mount();
        pointer(root, "pointerdown", 200);
        pointer(root, "pointermove", 100);
        pointer(root, event, 100);
        expect(root.dataset.dragging).toBeUndefined();
        expect(captures.size).toBe(0);
        advance();
        expect(position()).toBeCloseTo(-120);
    });

    it("ignores another pointer and mouse secondary buttons", () => {
        const { root, captures } = mount();
        pointer(root, "pointerdown", 200, 0, 1, "mouse", 2);
        expect(captures.size).toBe(0);
        pointer(root, "pointerdown", 200);
        pointer(root, "pointerdown", 100, 0, 2);
        pointer(root, "pointermove", 0, 0, 2);
        pointer(root, "pointerup", 0, 0, 2);
        advance();
        expect(position()).toBeCloseTo(0);
        pointer(root, "pointermove", 100);
        expect(position()).toBeCloseTo(-100);
    });

    it("preserves the visible loop progress and direction after resizing", () => {
        const { root, resizeTo } = mount();
        pointer(root, "pointerdown", 100);
        pointer(root, "pointermove", 400);
        pointer(root, "pointerup", 400);
        expect(position()).toBeCloseTo(-700);
        resizeTo(2000);
        expect(position()).toBeCloseTo(-1400);
        advance();
        expect(position()).toBeCloseTo(-1380);
    });

    it("keeps manual dragging available when reduced motion disables autoplay", () => {
        reduced.matches = true;
        const { root } = mount();
        advance();
        expect(position()).toBeCloseTo(0);
        pointer(root, "pointerdown", 200);
        pointer(root, "pointermove", 100);
        pointer(root, "pointerup", 100);
        advance();
        expect(position()).toBeCloseTo(-100);
        reduced.matches = false;
        advance();
        expect(position()).toBeCloseTo(-120);
    });

    it("does not autoplay in a hidden tab or jump after a delayed frame", () => {
        mount();
        Object.defineProperty(document, "hidden", { value: true, configurable: true });
        advance();
        expect(position()).toBeCloseTo(0);
        Object.defineProperty(document, "hidden", { value: false, configurable: true });
        mocks.ticks.forEach((tick) => tick(30, 30_000));
        expect(position()).toBeGreaterThan(-2);
    });

    it("supports keyboard navigation and pausing with the space key", () => {
        const { root } = mount();
        const key = (value: string) => root.dispatchEvent(Object.assign(new Event("keydown", { cancelable: true }), { key: value }));
        key("ArrowRight");
        expect(position()).toBeCloseTo(-320);
        key(" ");
        advance();
        expect(position()).toBeCloseTo(-320);
        key(" ");
        key("ArrowLeft");
        expect(position()).toBeCloseTo(0);
        advance();
        expect(position()).toBeCloseTo(-980);
    });

    it("stops listeners, capture, resizing and animation on cleanup", () => {
        const { root, captures, cleanup } = mount();
        pointer(root, "pointerdown", 200);
        pointer(root, "pointermove", 100);
        cleanup();
        expect(captures.size).toBe(0);
        expect(mocks.ticks.size).toBe(0);
        expect(disconnect).toHaveBeenCalledOnce();
        expect(mocks.clear).toHaveBeenCalled();
        mocks.setX.mockClear();
        pointer(root, "pointerdown", 200);
        pointer(root, "pointermove", 100);
        advance();
        expect(mocks.setX).not.toHaveBeenCalled();
    });
});
