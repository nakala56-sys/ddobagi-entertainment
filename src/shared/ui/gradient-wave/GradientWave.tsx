"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createTextMask, createWaveRenderer, DEFAULT_WAVE_COLORS, type WaveColors } from "./renderer";

/** Extra background height below the section, as a fraction of section height. */
const WAVE_BLEED = 0.34;

export type GradientWaveProps = {
    /** Newlines or an array define explicit lines; long lines also wrap naturally. */
    text: string | readonly string[];
    id?: string;
    as?: "h1" | "h2" | "h3";
    className?: string;
    textClassName?: string;
    colors?: WaveColors;
    /** Relative playback speed; zero freezes the wave. */
    speed?: number;
    /** Refraction/chromatic separation strength, from zero to two. */
    distortion?: number;
    before?: ReactNode;
    children?: ReactNode;
};

export function GradientWave({ text, id, as: Heading = "h2", className = "", textClassName = "", colors = DEFAULT_WAVE_COLORS, speed = 1, distortion = 1, before, children }: GradientWaveProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const backgroundRef = useRef<HTMLCanvasElement>(null);
    const textRef = useRef<HTMLCanvasElement>(null);
    const [ready, setReady] = useState(false);
    const lines = typeof text === "string" ? text.split("\n") : text;
    const textKey = lines.join("\n");
    const colorKey = colors.join(",");
    const bleedScale = 1 + WAVE_BLEED;
    const bleedMaskStop = `${(100 / bleedScale).toFixed(2)}%`;

    useEffect(() => {
        const root = rootRef.current;
        const heading = headingRef.current;
        const backgroundCanvas = backgroundRef.current;
        const textCanvas = textRef.current;
        if (!root || !heading || !backgroundCanvas || !textCanvas) return;
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const transition = root.closest<HTMLElement>("[data-page-pending]");
        let background: ReturnType<typeof createWaveRenderer> = null;
        let foreground: ReturnType<typeof createWaveRenderer> = null;
        let active = true;
        let visible = false;
        let revealed = transition?.dataset.pagePending !== "true";
        let frame = 0;
        let previous = 0;
        let elapsed = 0;
        const playback = Math.max(0, Number.isFinite(speed) ? speed : 1);
        const strength = Math.min(2, Math.max(0, Number.isFinite(distortion) ? distortion : 1));
        const palette = colorKey.split(",") as unknown as WaveColors;
        const canvasBleed = 1 + WAVE_BLEED;

        const stop = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            previous = 0;
        };
        const draw = (time: number) => {
            frame = 0;
            if (previous) elapsed += Math.min((time - previous) / 1000, 0.25) * playback;
            previous = time;
            background?.render(elapsed);
            foreground?.render(elapsed);
            if (playback) frame = requestAnimationFrame(draw);
        };
        const resume = () => {
            stop();
            if (background && foreground && visible && revealed && !document.hidden && !motion.matches) frame = requestAnimationFrame(draw);
        };
        const resize = () => {
            if (!background || !foreground) return;
            const width = root.clientWidth;
            const height = root.clientHeight;
            if (!width || !height) return;
            // Layout offsets ignore GSAP's intro translation so both layers move together.
            const x = heading.offsetLeft;
            const y = heading.offsetTop;
            const headingWidth = heading.clientWidth;
            const headingHeight = heading.clientHeight;
            // Background canvas is taller than the section so the wave can bleed into the next one.
            const bleedHeight = Math.round(height * canvasBleed);
            background.resize(width, bleedHeight, [0, 0, 1, canvasBleed], [width, height]);
            const ratio = foreground.resize(headingWidth, headingHeight, [x / width, y / height, headingWidth / width, headingHeight / height], [width, height]);
            const mask = createTextMask(heading, headingWidth, headingHeight, ratio);
            if (!mask) {
                stop();
                setReady(false);
                return;
            }
            foreground.mask(mask);
            background.render(elapsed);
            foreground.render(elapsed);
            setReady(true);
        };
        const dispose = () => {
            stop();
            background?.dispose();
            foreground?.dispose();
            background = null;
            foreground = null;
        };
        const setup = () => {
            dispose();
            setReady(false);
            if (!active || motion.matches) return;
            background = createWaveRenderer(backgroundCanvas, palette, false, strength);
            foreground = createWaveRenderer(textCanvas, palette, true, strength);
            if (!background || !foreground) {
                dispose();
                return;
            }
            resize();
            resume();
        };
        const reveal = () => {
            if (!revealed) {
                revealed = true;
                resume();
            }
        };
        const lost = (event: Event) => {
            event.preventDefault();
            dispose();
            setReady(false);
        };
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            resume();
        });
        const sizes = new ResizeObserver(resize);
        const slots = new Set<Element>();
        const observeSlots = () => {
            slots.forEach((element) => {
                if (element.parentElement !== root) {
                    sizes.unobserve(element);
                    slots.delete(element);
                }
            });
            Array.from(root.children).forEach((element) => {
                if (element.tagName === "DIV" && !slots.has(element)) {
                    sizes.observe(element);
                    slots.add(element);
                }
            });
        };
        const layout = new MutationObserver(() => {
            observeSlots();
            resize();
        });
        observer.observe(root);
        sizes.observe(root);
        sizes.observe(heading);
        observeSlots();
        layout.observe(root, { childList: true });
        motion.addEventListener("change", setup);
        window.addEventListener("resize", resize);
        document.addEventListener("visibilitychange", resume);
        document.fonts.addEventListener("loadingdone", resize);
        transition?.addEventListener("page:reveal", reveal);
        transition?.addEventListener("page:wave", reveal);
        [backgroundCanvas, textCanvas].forEach((canvas) => {
            canvas.addEventListener("webglcontextlost", lost);
            canvas.addEventListener("webglcontextrestored", setup);
        });
        document.fonts.ready.then(() => {
            if (active) setup();
        });
        return () => {
            active = false;
            dispose();
            observer.disconnect();
            sizes.disconnect();
            layout.disconnect();
            motion.removeEventListener("change", setup);
            window.removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", resume);
            document.fonts.removeEventListener("loadingdone", resize);
            transition?.removeEventListener("page:reveal", reveal);
            transition?.removeEventListener("page:wave", reveal);
            [backgroundCanvas, textCanvas].forEach((canvas) => {
                canvas.removeEventListener("webglcontextlost", lost);
                canvas.removeEventListener("webglcontextrestored", setup);
            });
        };
    }, [textKey, colorKey, speed, distortion, Heading, textClassName, className]);

    return (
        <div
            ref={rootRef}
            data-gradient-wave
            data-wave-ready={ready}
            style={{ "--wave-color-0": colors[0] } as CSSProperties}
            className={`relative isolate overflow-visible bg-[radial-gradient(ellipse_100%_140%_at_50%_-60%,var(--wave-color-0)_40%,var(--color-background)_75%)] text-[var(--color-text)] ${className}`}
        >
            <canvas
                ref={backgroundRef}
                aria-hidden="true"
                style={{
                    height: `${bleedScale * 100}%`,
                    WebkitMaskImage: `linear-gradient(to bottom, #000 0%, #000 ${bleedMaskStop}, transparent 100%)`,
                    maskImage: `linear-gradient(to bottom, #000 0%, #000 ${bleedMaskStop}, transparent 100%)`,
                }}
                className={`pointer-events-none absolute top-0 left-0 z-0 w-full ${ready ? "visible" : "invisible"}`}
            />
            {before ? <div className="relative z-10">{before}</div> : null}
            <Heading
                ref={headingRef}
                id={id}
                aria-label={lines.join(" ")}
                data-line
                className={`relative z-10 ${textClassName}`}
            >
                {lines.map((line, index) => (
                    <span
                        key={index}
                        data-wave-line
                        className={`block whitespace-pre-wrap break-words ${ready ? "text-transparent" : ""}`}
                    >
                        {line || "\u00a0"}
                    </span>
                ))}
                <canvas
                    ref={textRef}
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 h-full w-full ${ready ? "visible" : "invisible"}`}
                />
            </Heading>
            {children ? <div className="relative z-10">{children}</div> : null}
        </div>
    );
}
