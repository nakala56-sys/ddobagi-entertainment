"use client";

import { company } from "@/entities/company/constants/company";

export function QuickMenu() {
    return <aside className="quick-menu" aria-label="빠른 메뉴"><a href={company.contactUrl} target="_blank" rel="noopener noreferrer" aria-label="카카오톡 상담 (새 창)">Talk ↗</a><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })} aria-label="맨 위로 이동">↑</button></aside>;
}
