import gsap from "gsap";

type Drag = { id: number; startX: number; startY: number; lastX: number; horizontal: boolean };

export function draggableLoop(root: HTMLElement): () => void {
    const track = root.querySelector<HTMLElement>("[data-loop-track]");
    const group = root.querySelector<HTMLElement>("[data-loop-group]");
    if (!track || !group) return () => {};

    const setX = gsap.quickSetter(track, "x", "px");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let x = 0;
    let direction = -1;
    let paused = false;
    let drag: Drag | undefined;

    const render = () => {
        if (!width) return;
        // Repeated copies meet at the same point, so wrapping never exposes an edge.
        x = ((x % width) - width) % width;
        setX(x);
    };
    const measure = () => {
        const nextWidth = group.getBoundingClientRect().width;
        if (!nextWidth) return;
        if (width) x = (x / width) * nextWidth;
        width = nextWidth;
        render();
    };
    const finish = () => {
        const id = drag?.id;
        drag = undefined;
        delete root.dataset.dragging;
        if (id !== undefined && root.hasPointerCapture(id)) root.releasePointerCapture(id);
    };
    const down = (event: PointerEvent) => {
        if (drag || !event.isPrimary || event.button !== 0) return;
        drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, horizontal: false };
        root.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
        if (!drag || drag.id !== event.pointerId) return;
        if (!drag.horizontal) {
            const dx = Math.abs(event.clientX - drag.startX);
            const dy = Math.abs(event.clientY - drag.startY);
            if (Math.max(dx, dy) < 6) return;
            if (dy > dx) {
                finish();
                return;
            }
            drag.horizontal = true;
            root.dataset.dragging = "true";
        }
        const delta = event.clientX - drag.lastX;
        drag.lastX = event.clientX;
        if (!delta) return;
        direction = Math.sign(delta);
        x += delta;
        render();
    };
    const up = (event: PointerEvent) => {
        if (drag?.id === event.pointerId) finish();
    };
    const keydown = (event: KeyboardEvent) => {
        if (event.key === " ") {
            event.preventDefault();
            paused = !paused;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            direction = event.key === "ArrowLeft" ? 1 : -1;
            x += direction * root.clientWidth * 0.8;
            render();
        }
    };
    const tick = (_time: number, delta: number) => {
        if (drag || paused || reduced.matches || document.hidden) return;
        x += direction * 20 * (Math.min(delta, 64) / 1000);
        render();
    };

    const resize = new ResizeObserver(measure);
    resize.observe(group);
    measure();
    gsap.ticker.add(tick);
    root.addEventListener("pointerdown", down);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerup", up);
    root.addEventListener("pointercancel", up);
    root.addEventListener("lostpointercapture", up);
    root.addEventListener("keydown", keydown);

    return () => {
        root.removeEventListener("pointerdown", down);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerup", up);
        root.removeEventListener("pointercancel", up);
        root.removeEventListener("lostpointercapture", up);
        root.removeEventListener("keydown", keydown);
        finish();
        resize.disconnect();
        gsap.ticker.remove(tick);
        gsap.set(track, { clearProps: "transform" });
    };
}
