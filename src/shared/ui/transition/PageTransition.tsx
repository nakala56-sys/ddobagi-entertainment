"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Animation from "@/shared/utils/animation";

export function PageTransition({
    children,
    chrome,
    waveIntro = true,
    onReady,
}: {
    children: ReactNode;
    /** Fixed chrome must stay outside the faded content wrapper or iOS offsets position:fixed. */
    chrome?: ReactNode;
    waveIntro?: boolean;
    onReady?: () => void;
}) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!rootRef.current) return;
        return Animation.layout.loading(
            rootRef.current,
            () => {
                setReady(true);
                onReady?.();
            },
            waveIntro,
        );
    }, [waveIntro, onReady]);

    return (
        <div
            ref={rootRef}
            data-page-pending={!ready}
        >
            {chrome ? (
                <div
                    data-page-chrome
                    className={ready ? undefined : "invisible"}
                    // Keep boolean attrs stable for the first client paint (ready starts false on server too).
                    aria-hidden={ready ? undefined : true}
                >
                    {chrome}
                </div>
            ) : null}
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
                    aria-label="CONNECTING TO DDOBAGI"
                >
                    <span
                        className="page-loading-text inline-block h-[1em] overflow-hidden whitespace-nowrap text-[2.0rem] leading-none text-[transparent] bg-[linear-gradient(90deg,var(--color-text)_0%,var(--color-text)_33.333%,var(--color-point)_48%,var(--color-text)_66.667%,var(--color-text)_100%)] bg-size-[300%_100%] bg-position-[100%_0%] bg-no-repeat bg-clip-text [-webkit-text-fill-color:transparent]"
                        data-loading-text
                        aria-hidden="true"
                    >
                        CONNECTING TO DDOBAGI <span aria-hidden="true"> · · ·</span>
                    </span>
                </div>
            ) : null}
        </div>
    );
}
