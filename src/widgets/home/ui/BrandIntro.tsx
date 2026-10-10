"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Animation from "@/shared/utils/animation";

export function BrandIntro() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.brandIntro(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="section relative z-10 py-18 tablet:py-35 content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto brand-intro"
            aria-labelledby="home-brand-title"
        >
            <p
                className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                data-reveal
            >
                02 — OUR BELIEF
            </p>
            <h2
                id="home-brand-title"
                className="display-title text-4xl tablet:text-5xl pc:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-5 tablet:mt-7"
                data-reveal
            >
                가능성은 당신에게.
                <br />그 다음은 <span className="accent text-[var(--accent)]">우리 함께.</span>
            </h2>
            <div className="intro-bottom flex items-start tablet:items-end justify-between gap-8 tablet:gap-10 mt-8 tablet:mt-13 flex-col tablet:flex-row mb-0">
                <p
                    className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)]"
                    data-reveal
                >
                    각자의 매력을 발견하고, 콘텐츠로 연결하고,
                    <br />
                    꾸준히 성장할 수 있는 환경을 만듭니다.
                    <br />
                    또바기는 크리에이터의 다음을 함께하는 파트너입니다.
                </p>
                <Link
                    className="text-[inherit] inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent"
                    href="/about"
                    data-reveal
                >
                    또바기 알아보기 <span aria-hidden="true">↗</span>
                </Link>
            </div>
        </section>
    );
}
