"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Animation from "@/shared/utils/animation";

export function PageTransition({ children, waveIntro = true }: { children: ReactNode; waveIntro?: boolean }) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!rootRef.current) return;
        return Animation.layout.loading(rootRef.current, () => setReady(true), waveIntro);
    }, [waveIntro]);

    return (
        <div
            ref={rootRef}
            data-page-pending={!ready}
        >
            <div
                data-page-content
                className="aria-busy:invisible"
                inert={!ready}
                aria-busy={!ready}
            >
                {children}
            </div>
            {!ready ? (
                <div
                    className="page-loading min-h-[100svh] grid [place-content:center] text-[var(--color-text)] text-[1.6rem] page-loading-overlay fixed inset-0 z-[200] bg-[var(--color-background)] p-[2rem] text-center"
                    data-page-loader
                    data-lenis-prevent
                    role="status"
                >
                    <span
                        className="page-loading-text inline-block text-[transparent] bg-[linear-gradient(90deg,var(--color-text)_0%,var(--color-text)_33.333%,var(--color-point)_48%,var(--color-text)_66.667%,var(--color-text)_100%)] bg-size-[300%_100%] bg-position-[100%_0%] bg-no-repeat bg-clip-text [-webkit-text-fill-color:transparent]"
                        data-loading-text
                    >
                        CONNECTING TO DDOBAGI <span aria-hidden="true"> · · ·</span>
                    </span>
                </div>
            ) : null}
        </div>
    );
}
