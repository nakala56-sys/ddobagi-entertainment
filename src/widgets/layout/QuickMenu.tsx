"use client";

import { company } from "@/entities/company/constants/company";

export function QuickMenu() {
    return (
        <aside
            className="quick-menu flex gap-[0.8rem] fixed right-[2rem] bottom-[2rem] z-[15] text-[1.2rem]"
            aria-label="빠른 메뉴"
        >
            <a
                className="p-[1.2rem_1.6rem] bg-[var(--color-background)] text-[var(--color-text)] border-[0.4rem] border-solid border-[var(--color-line)] rounded-full shadow-[0_0.4rem_1.6rem_#00000015] leading-[1.0]"
                href={company.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="크리에이터 상담하기 — 카카오톡 (새 창)"
            >
                크리에이터 상담하기 ↗
            </a>
            <button
                className="p-[1.2rem_1.6rem] bg-[var(--color-background)] text-[var(--color-text)] border-[0.4rem] border-solid border-[var(--color-line)] rounded-full shadow-[0_0.4rem_1.6rem_#00000015] leading-[1.0]"
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}
                aria-label="맨 위로 이동"
            >
                ↑
            </button>
        </aside>
    );
}
