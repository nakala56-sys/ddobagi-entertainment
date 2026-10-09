"use client";

import { company } from "@/entities/company/constants/company";

export function QuickMenu() {
    return <aside className="quick-menu flex gap-2 fixed right-5 bottom-5 z-[15] text-xs [&_a]:p-[1.2rem_1.6rem] [&_a]:bg-[var(--paper)] [&_a]:text-[var(--ink)] [&_a]:border-[0.4rem] [&_a]:border-solid [&_a]:border-[var(--line)] [&_a]:rounded-full [&_a]:shadow-[0_0.4rem_1.6rem_#00000015] [&_button]:p-[1.2rem_1.6rem] [&_button]:bg-[var(--paper)] [&_button]:text-[var(--ink)] [&_button]:border-[0.4rem] [&_button]:border-solid [&_button]:border-[var(--line)] [&_button]:rounded-full [&_button]:shadow-[0_0.4rem_1.6rem_#00000015]" aria-label="빠른 메뉴"><a href={company.contactUrl} target="_blank" rel="noopener noreferrer" aria-label="카카오톡 상담 (새 창)">Talk ↗</a><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })} aria-label="맨 위로 이동">↑</button></aside>;
}
