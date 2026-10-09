"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Animation from "@/shared/utils/animation";

export function PageTransition({ children }: { children: ReactNode }) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!rootRef.current) return;
        return Animation.layout.loading(rootRef.current, () => setReady(true));
    }, []);

    return (
        <div
            ref={rootRef}
            data-page-pending={!ready}
        >
            <div
                data-page-content
                inert={!ready}
                aria-busy={!ready}
            >
                {children}
            </div>
            {!ready ? (
                <div
                    className="page-loading page-loading-overlay"
                    data-page-loader
                    data-lenis-prevent
                    role="status"
                >
                    <span
                        className="page-loading-text"
                        data-loading-text
                    >
                        CONNECTING TO DDOBAGI <span aria-hidden="true"> · · ·</span>
                    </span>
                </div>
            ) : null}
        </div>
    );
}
