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
            className="data-[page-pending=true]:[&>[data-page-content]]:invisible"
        >
            <div
                data-page-content
                className="[&_img]:grayscale"
                inert={!ready}
                aria-busy={!ready}
            >
                {children}
            </div>
            {!ready ? (
                <div
                    className="page-loading min-h-[100svh] grid [place-content:center] text-[#ededed] text-base tracking-[round(nearest,0.08em,0.4rem)] page-loading-overlay fixed inset-0 z-[200] bg-[#ffffff] p-5 text-center"
                    data-page-loader
                    data-lenis-prevent
                    role="status"
                >
                    <span
                        className="page-loading-text inline-block text-[transparent] bg-[linear-gradient(90deg,_#000000_0%,_#000000_33.333%,_#8b5cf6_38%,_#3b82f6_43%,_#22c55e_48%,_#facc15_53%,_#fb923c_58%,_#f472b6_63%,_#ededed_66.667%,_#ededed_100%)] bg-size-[300%_100%] bg-position-[100%_0%] bg-no-repeat bg-clip-text [-webkit-text-fill-color:transparent]"
                        data-loading-text
                    >
                        CONNECTING TO DDOBAGI <span aria-hidden="true"> · · ·</span>
                    </span>
                </div>
            ) : null}
        </div>
    );
}
