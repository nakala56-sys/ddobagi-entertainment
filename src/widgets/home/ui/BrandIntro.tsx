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
            className="section relative z-10 py-[7.2rem] tablet:py-[14rem] content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto brand-intro"
            aria-labelledby="home-brand-title"
        >
            <h2
                id="home-brand-title"
                className="display-title text-[3.6rem] tablet:text-[4.8rem] pc:text-[5.8rem] font-[580]"
                data-reveal
            >
                가능성은 당신에게.
                <br />그 다음은 <span className="accent text-[var(--accent,#000000)]">우리 함께.</span>
            </h2>
            <div className="intro-bottom flex items-start tablet:items-end justify-between gap-[3.2rem] tablet:gap-[4rem] mt-[3.2rem] tablet:mt-[5.2rem] flex-col tablet:flex-row mb-0">
                <p
                    className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373]"
                    data-reveal
                >
                    각자의 매력을 발견하고, 콘텐츠로 연결하고,
                    <br />
                    꾸준히 성장할 수 있는 환경을 만듭니다.
                    <br />
                    또바기는 크리에이터의 다음을 함께하는 파트너입니다.
                </p>
                <Link
                    className="text-[inherit] inline-flex gap-[3.2rem] items-center font-[650] text-[1.6rem] py-[1.2rem] border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent leading-[1.0]"
                    href="/about"
                    data-reveal
                >
                    또바기 알아보기 <span aria-hidden="true">↗</span>
                </Link>
            </div>
        </section>
    );
}
