"use client";

import { useMemo, type CSSProperties } from "react";

export interface GradualBlurProps {
    position?: "top" | "bottom";
    height?: CSSProperties["height"];
    strength?: number;
    layers?: number;
    tint?: string;
    className?: string;
    style?: CSSProperties;
}

/** Progressive backdrop blur adapted from https://reactbits.dev/animations/gradual-blur. */
export function GradualBlur({ position = "top", height = "100%", strength = 2, layers = 6, tint, className = "", style }: GradualBlurProps) {
    const { blurLayers, tintMask } = useMemo(() => {
        const count = Math.min(16, Math.max(1, Math.round(layers) || 1));
        const direction = position === "top" ? "to top" : "to bottom";
        const level = (progress: number) => (Math.max(0, strength) * 12 * (2 ** (4 * progress) - 1)) / 15;
        const blurLayers: CSSProperties[] = Array.from({ length: count }, (_, index) => {
            const from = level(index / count);
            const to = level((index + 1) / count);
            // Incremental radii keep the stacked blur within the intended strength.
            const filter = `blur(${Math.sqrt(Math.max(0, to * to - from * from)).toFixed(3)}px)`;
            const mask = `linear-gradient(${direction}, transparent ${((index / count) * 100).toFixed(2)}%, #000 ${(((index + 1) / count) * 100).toFixed(2)}%)`;

            return {
                backdropFilter: filter,
                WebkitBackdropFilter: filter,
                maskImage: mask,
                WebkitMaskImage: mask,
            };
        });
        const stops = Array.from({ length: 9 }, (_, index) => {
            const progress = index / 8;
            const alpha = progress ** 3 * (progress * (progress * 6 - 15) + 10);
            return `rgba(0, 0, 0, ${alpha.toFixed(3)}) ${progress * 100}%`;
        }).join(", ");

        return { blurLayers, tintMask: `linear-gradient(${direction}, ${stops})` };
    }, [position, strength, layers]);

    const rootClassName = ["pointer-events-none absolute inset-x-0 z-0", position === "top" ? "top-0" : "bottom-0", className].filter(Boolean).join(" ");

    return (
        <div
            aria-hidden="true"
            className={rootClassName}
            style={{ height, ...style }}
        >
            {blurLayers.map((layer, index) => (
                <div
                    key={index}
                    className="absolute inset-0"
                    style={layer}
                />
            ))}
            {tint ? (
                <div
                    className="absolute inset-0"
                    style={{ background: tint, maskImage: tintMask, WebkitMaskImage: tintMask }}
                />
            ) : null}
        </div>
    );
}
