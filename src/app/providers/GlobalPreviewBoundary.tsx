"use client";

import { useState, type ReactNode } from "react";

const PREVIEW_ENDS_AT = new Date("2026-10-29T23:59:59+09:00");

type GlobalPreviewBoundaryProps = {
    children: ReactNode;
};

export function GlobalPreviewBoundary({ children }: GlobalPreviewBoundaryProps) {
    const [allowBrowse, setAllowBrowse] = useState(false);
    const [isExpired] = useState(() => Date.now() > PREVIEW_ENDS_AT.getTime());

    if (isExpired && !allowBrowse) {
        return (
            <main className="flex justify-center items-center gap-[1.2rem] flex-col h-[100dvh] bg-white p-[3.2rem] text-[var(--color-text)]">
                <section className="flex flex-col items-center gap-[0.4rem]">
                    <h2 className="text-[2.4rem]">now in development.</h2>
                    <p>개발진행중 입니다.</p>
                </section>

                <button
                    type="button"
                    onClick={() => setAllowBrowse(true)}
                    className="bg-[var(--color-gray-200)] text-[var(--color-gray-700)] p-[1.2rem_2.4rem] rounded-[1.4rem]"
                >
                    둘러보기
                </button>
            </main>
        );
    }

    return children;
}
