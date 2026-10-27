import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Animation from "./animation";

const mocks = vi.hoisted(() => ({
    refresh: vi.fn(),
    create: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    writes: [] as string[],
    ticks: new Set<() => void>(),
}));

vi.mock("gsap", () => ({
    default: {
        matchMedia: () => {
            let cleanup: (() => void) | undefined;
            return {
                add: (_query: unknown, callback: (context: unknown) => (() => void) | undefined) => {
                    cleanup = callback({ conditions: { desktop: true, reduced: true } });
                },
                revert: () => cleanup?.(),
            };
        },
        set: vi.fn(),
        quickSetter: () => () => mocks.writes.push("write"),
        ticker: {
            add: (callback: () => void) => mocks.ticks.add(callback),
            remove: (callback: () => void) => mocks.ticks.delete(callback),
        },
    },
}));
vi.mock("gsap/ScrollTrigger", () => ({
    ScrollTrigger: {
        refresh: mocks.refresh,
        create: mocks.create,
        getAll: () => [],
        addEventListener: mocks.addEventListener,
        removeEventListener: mocks.removeEventListener,
    },
}));
vi.mock("gsap/CustomEase", () => ({ CustomEase: {} }));
vi.mock("lenis", () => ({ default: class {} }));
vi.mock("@/shared/lib/breakpoints", () => ({ getBreakpointQuery: () => "(min-width: 48rem)" }));

let frames: Map<number, FrameRequestCallback>;
let frameId: number;
let cleanups: (() => void)[];
let timeouts: Map<number, { callback: () => void; at: number }>;
let timeoutId: number;
let clock: number;

beforeEach(() => {
    vi.clearAllMocks();
    mocks.writes.length = 0;
    mocks.ticks.clear();
    frames = new Map();
    frameId = 0;
    timeouts = new Map();
    timeoutId = 0;
    clock = 0;
    cleanups = [];
    vi.stubGlobal("document", { fonts: { ready: Promise.resolve() }, getElementById: vi.fn() });
    vi.stubGlobal("window", {
        scrollY: 0,
        innerHeight: 800,
        matchMedia: vi.fn(() => ({ matches: true })),
        addEventListener: vi.fn(),
        setTimeout: (callback: () => void, ms = 0) => {
            const id = ++timeoutId;
            timeouts.set(id, { callback, at: clock + Number(ms) });
            return id;
        },
        clearTimeout: (id?: number) => {
            if (id !== undefined) timeouts.delete(id);
        },
    });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
        const id = frameId++;
        frames.set(id, callback);
        return id;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
});

afterEach(async () => {
    cleanups.forEach((cleanup) => cleanup());
    await Promise.resolve();
    vi.unstubAllGlobals();
});

async function flushFrame() {
    await Promise.resolve();
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback(16));
}

async function flushIdle(ms = 160) {
    clock += ms;
    const due = [...timeouts.entries()].filter(([, item]) => item.at <= clock);
    due.forEach(([id, item]) => {
        timeouts.delete(id);
        item.callback();
    });
    await flushFrame();
}

function mountSection() {
    const image = new EventTarget();
    const root = { querySelectorAll: () => [image] } as unknown as HTMLElement;
    const cleanup = Animation.about.section.location(root);
    cleanups.push(cleanup);
    return { image, cleanup };
}

describe("section refresh scheduling", () => {
    it("refreshes once when multiple sections, images and fonts become ready in one frame", async () => {
        const sections = Array.from({ length: 11 }, mountSection);
        sections.forEach(({ image }) => image.dispatchEvent(new Event("load")));
        await flushFrame();
        expect(mocks.refresh).toHaveBeenCalledOnce();
    });

    it("keeps another section's refresh when one section unmounts", async () => {
        const first = mountSection();
        mountSection();
        first.cleanup();
        await flushFrame();
        expect(mocks.refresh).toHaveBeenCalledOnce();
    });

    it("cancels pending work and ignores image and font readiness after unmount", async () => {
        const sections = Array.from({ length: 3 }, mountSection);
        sections.forEach(({ image, cleanup }) => {
            cleanup();
            image.dispatchEvent(new Event("load"));
        });
        await flushFrame();
        expect(mocks.refresh).not.toHaveBeenCalled();
        expect(frames.size).toBe(0);
    });

    it("refreshes again for images loaded in a later frame", async () => {
        const { image } = mountSection();
        await flushFrame();
        image.dispatchEvent(new Event("load"));
        // Lazy image loads wait for scroll idle before refreshing.
        await flushIdle();
        expect(mocks.refresh).toHaveBeenCalledTimes(2);
    });

    it("can restart after setup and cleanup repeat", async () => {
        for (let index = 0; index < 10; index++) mountSection().cleanup();
        mountSection();
        await flushFrame();
        expect(mocks.refresh).toHaveBeenCalledOnce();
    });
});

function mountNavigation() {
    const links = Array.from({ length: 9 }, (_, index) => {
        const attributes = new Map<string, string>();
        return {
            dataset: { sectionTarget: String(index) },
            querySelector: () => ({}),
            getBoundingClientRect: () => {
                mocks.writes.push("read");
                return { top: index * 24, height: 24 };
            },
            setAttribute: vi.fn((name: string, value: string) => attributes.set(name, value)),
            removeAttribute: vi.fn((name: string) => attributes.delete(name)),
            attributes,
        };
    });
    vi.mocked(document.getElementById).mockImplementation(
        (id) =>
            ({
                closest: () => ({ getBoundingClientRect: () => ({ top: Number(id) * 1000 - window.scrollY }) }),
            }) as unknown as HTMLElement,
    );
    const root = Object.assign(new EventTarget(), { querySelectorAll: () => links });
    const cleanup = Animation.landing.navigation(root as unknown as HTMLElement);
    cleanups.push(cleanup);
    const update = mocks.create.mock.lastCall![0].onUpdate as () => void;
    return { root, links, update, cleanup };
}

describe("section navigation updates", () => {
    it("does not rewrite the active location when scroll stays in the same section", () => {
        const { links, update } = mountNavigation();
        links.forEach((link) => {
            link.setAttribute.mockClear();
            link.removeAttribute.mockClear();
        });
        for (let index = 0; index < 100; index++) update();
        links.forEach((link) => {
            expect(link.setAttribute).not.toHaveBeenCalled();
            expect(link.removeAttribute).not.toHaveBeenCalled();
        });
    });

    it("updates the active location when scrolling forward and back", () => {
        const { links, update } = mountNavigation();
        window.scrollY = 1800;
        update();
        expect(links[2].attributes.get("aria-current")).toBe("location");
        expect(links[0].attributes.has("aria-current")).toBe(false);
        window.scrollY = 0;
        update();
        expect(links[0].attributes.get("aria-current")).toBe("location");
        expect(links[2].attributes.has("aria-current")).toBe(false);
    });

    it("reads all link positions before writing reduced-motion widths", () => {
        const { root } = mountNavigation();
        mocks.writes.length = 0;
        root.dispatchEvent(Object.assign(new Event("pointermove"), { clientY: 60 }));
        expect(mocks.writes).toEqual([...Array(9).fill("read"), ...Array(9).fill("write")]);
    });

    it("removes pointer and refresh listeners when navigation unmounts", () => {
        const { root, cleanup } = mountNavigation();
        cleanup();
        mocks.writes.length = 0;
        root.dispatchEvent(Object.assign(new Event("pointermove"), { clientY: 60 }));
        expect(mocks.writes).toEqual([]);
        expect(mocks.removeEventListener).toHaveBeenCalledWith("refresh", mocks.addEventListener.mock.lastCall![1]);
    });
});

function mountHeader(home = true) {
    const bounds = { top: 0, bottom: 100, height: 100 };
    const heroBounds = { top: 0, bottom: 800 };
    const ctaBounds = { top: 5000, bottom: 7000 };
    const circleBounds = { top: 100, height: 200 };
    const ink = { style: { position: "" } };
    const styles = new Map<string, string>();
    const root = {
        getBoundingClientRect: () => bounds,
        querySelectorAll: () => [],
        style: {
            setProperty: (name: string, value: string) => styles.set(name, value),
            removeProperty: (name: string) => styles.delete(name),
        },
    } as unknown as HTMLElement;
    const targets = new Map<string, unknown>([
        ['[data-report-id="home-hero"]', { getBoundingClientRect: () => heroBounds }],
        ["[data-cta-wave]", { getBoundingClientRect: () => ctaBounds }],
        ["[data-cta-ink]", ink],
        ["[data-cta-circle]", { getBoundingClientRect: () => circleBounds }],
    ]);
    vi.mocked(document.getElementById).mockReturnValue(home ? ({ querySelector: (selector: string) => targets.get(selector) } as unknown as HTMLElement) : null);
    const cleanup = Animation.layout.header(root);
    cleanups.push(cleanup);
    return { bounds, heroBounds, ctaBounds, circleBounds, ink, styles, cleanup, tick: () => mocks.ticks.forEach((callback) => callback()) };
}

describe("header contrast", () => {
    it("uses white text on the home hero even with reduced motion", () => {
        const { styles } = mountHeader();
        expect(styles.get("--header-ink")).toBe("#ffffff");
    });

    it("restores the original color at five percent overlap and reverses when scrolling back", () => {
        const { heroBounds, styles, tick } = mountHeader();
        heroBounds.bottom = 6;
        tick();
        expect(styles.get("--header-ink")).toBe("#ffffff");
        heroBounds.bottom = 5;
        tick();
        expect(styles.has("--header-ink")).toBe(false);
        heroBounds.bottom = -1;
        tick();
        expect(styles.has("--header-ink")).toBe(false);
        heroBounds.bottom = 6;
        tick();
        expect(styles.get("--header-ink")).toBe("#ffffff");
    });

    it("recalculates the overlap threshold when the header resizes", () => {
        const { bounds, heroBounds, styles, tick } = mountHeader();
        heroBounds.bottom = 6;
        bounds.bottom = bounds.height = 200;
        tick();
        expect(styles.has("--header-ink")).toBe(false);
        bounds.bottom = bounds.height = 100;
        tick();
        expect(styles.get("--header-ink")).toBe("#ffffff");
    });

    it("uses the full header height when the header moves partly above the viewport", () => {
        const { bounds, heroBounds, styles, tick } = mountHeader();
        bounds.top = -20;
        bounds.bottom = 80;
        heroBounds.bottom = 5;
        tick();
        expect(styles.has("--header-ink")).toBe(false);
        heroBounds.bottom = 6;
        tick();
        expect(styles.get("--header-ink")).toBe("#ffffff");
    });

    it("waits for the opaque CTA wave to overlap the header and reverses with the wave", () => {
        vi.mocked(window.matchMedia).mockReturnValue({ matches: false } as MediaQueryList);
        const header = mountHeader();
        header.heroBounds.bottom = -1;
        header.ctaBounds.top = -200;
        header.ink.style.position = "fixed";
        header.tick();
        expect(header.styles.has("--header-ink")).toBe(false);
        header.circleBounds.top = 70;
        header.tick();
        expect(header.styles.get("--header-ink")).toBe("#ffffff");
        header.circleBounds.top = 82;
        header.tick();
        expect(header.styles.has("--header-ink")).toBe(false);
    });

    it("uses the static CTA bounds with reduced motion", () => {
        const { heroBounds, ctaBounds, styles, tick } = mountHeader();
        heroBounds.bottom = -1;
        ctaBounds.top = 94;
        tick();
        expect(styles.get("--header-ink")).toBe("#ffffff");
        ctaBounds.top = 95;
        tick();
        expect(styles.has("--header-ink")).toBe(false);
    });

    it("keeps the original color outside the home page", () => {
        const { styles, tick } = mountHeader(false);
        tick();
        expect(styles.has("--header-ink")).toBe(false);
    });

    it("clears the color and stops tracking on route cleanup", () => {
        const { styles, cleanup } = mountHeader();
        expect(styles.get("--header-ink")).toBe("#ffffff");
        cleanup();
        expect(styles.has("--header-ink")).toBe(false);
        expect(mocks.ticks.size).toBe(0);
    });
});
