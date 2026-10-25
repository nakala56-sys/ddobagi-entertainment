"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";

const SECTIONS = [
    { id: "home-hero-title", label: "또바기" },
    { id: "home-belief-moments-title", label: "크리에이터" },
    { id: "home-reel-title", label: "현장" },
    { id: "home-support-title", label: "지원" },
    { id: "home-gallery-title", label: "스튜디오" },
    { id: "home-everyday-title", label: "일상" },
    { id: "home-solutions-title", label: "맞춤 지원" },
    { id: "home-journey-title", label: "시작하기" },
    { id: "home-faq-title", label: "궁금한 점" },
    { id: "home-closing-title", label: "함께하기" },
] as const;

export function SectionNavigation() {
    const navigationRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!navigationRef.current) return;
        return Animation.landing.navigation(navigationRef.current);
    }, []);

    return (
        <nav
            ref={navigationRef}
            data-report-id="home-section-navigation"
            data-report-type="group"
            aria-label="랜딩 섹션 이동"
            className="home-section-navigation fixed left-[2rem] top-1/2 z-30 hidden w-[19.2rem] -translate-y-1/2 text-white mix-blend-difference min-[64rem]:block pc:right-[3.2rem]"
        >
            <ol>
                {SECTIONS.map((section, index) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            data-report-id={`home-section-nav-${section.id}`}
                            data-report-type="item"
                            data-section-target={section.id}
                            aria-label={`${section.label} 섹션으로 이동`}
                            aria-current={index === 0 ? "location" : undefined}
                            className="group relative flex h-[2.4rem] items-center rounded-[0.2rem] focus-visible:outline-[0.2rem] focus-visible:outline-solid focus-visible:outline-white focus-visible:outline-offset-[0.4rem]"
                        >
                            <span
                                data-section-bar
                                aria-hidden="true"
                                className="block h-[0.4rem] w-[2.8rem] bg-[var(--color-point)] opacity-20 group-hover:opacity-100 group-focus-visible:opacity-100 group-aria-[current=location]:opacity-100"
                            />
                            <span
                                aria-hidden="true"
                                className="pointer-events-none invisible absolute left-[10rem] top-1/2 -translate-y-1/2 whitespace-nowrap text-[1.6rem] font-[600] leading-[1.4] tracking-[-0.04em] group-hover:visible group-focus-visible:visible"
                            >
                                {section.label}
                            </span>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
