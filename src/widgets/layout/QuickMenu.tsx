"use client";

import { company } from "@/entities/company/constants/company";

export function QuickMenu() {
    return (
        <aside
            className="quick-menu flex gap-2 fixed right-5 bottom-5 z-[15] text-xs"
            aria-label="빠른 메뉴"
        >
            <a
                className="p-[1.2rem_1.6rem] bg-[var(--paper)] text-[var(--ink)] border-[0.4rem] border-solid border-[var(--line)] rounded-full shadow-[0_0.4rem_1.6rem_#00000015]"
                href={company.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="카카오톡 상담 (새 창)"
            >
                Talk ↗
            </a>
            <button
                className="p-[1.2rem_1.6rem] bg-[var(--paper)] text-[var(--ink)] border-[0.4rem] border-solid border-[var(--line)] rounded-full shadow-[0_0.4rem_1.6rem_#00000015]"
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}
                aria-label="맨 위로 이동"
            >
                ↑
            </button>
        </aside>
    );
}
