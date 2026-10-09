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
        <section ref={sectionRef} className="section relative z-10 py-30 max-site:py-18 content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)] brand-intro py-35" aria-labelledby="home-brand-title">
            <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase" data-reveal>02 — OUR BELIEF</p>
            <h2 id="home-brand-title" className="display-title text-[4rem] compact:text-[4rem] site:text-5xl wide:text-6xl xl:text-[8rem] 2xl:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-7 [.split-copy_&]:m-0 [.split-copy_&]:text-4xl [.split-copy_&]:compact:text-4xl [.split-copy_&]:site:text-[4.4rem] [.split-copy_&]:wide:text-[5.2rem] [.split-copy_&]:xl:text-[6.8rem] [.split-copy_&]:2xl:text-[6.8rem] [.stack-card_&]:text-3xl [.stack-card_&]:compact:text-3xl [.stack-card_&]:site:text-4xl [.stack-card_&]:wide:text-[4.4rem] [.stack-card_&]:xl:text-[5.6rem] [.stack-card_&]:2xl:text-[5.6rem] [.stack-card_&]:my-8 max-site:text-4xl max-site:compact:text-[4rem] max-site:site:text-6xl max-site:wide:text-6xl max-site:xl:text-6xl max-site:2xl:text-6xl max-site:mt-5 max-site:[.split-copy_&]:text-[4rem] max-site:[.split-copy_&]:compact:text-[4rem] max-site:[.split-copy_&]:site:text-6xl max-site:[.split-copy_&]:wide:text-6xl max-site:[.split-copy_&]:xl:text-6xl max-site:[.split-copy_&]:2xl:text-6xl max-site:[.showcase-copy_&]:text-5xl max-site:[.stack-card_&]:text-[4rem]" data-reveal>가능성은 당신에게.<br />그 다음은 <span className="accent text-[var(--accent)]">우리 함께.</span></h2>
            <div className="intro-bottom flex items-end justify-between gap-10 mt-13 max-site:items-start max-site:flex-col max-site:gap-8 max-site:mb-10 max-site:mb-0 max-site:mt-8"><p className="body-copy text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)] [.section-dark_&]:text-[#b5b5b5] [.showcase-copy_&]:mt-8 [.stack-card_&]:max-w-110 [.stack-card_&]:text-[#b5b5b5] max-site:[.showcase-copy_&]:mt-5" data-reveal>각자의 매력을 발견하고, 콘텐츠로 연결하고,<br />꾸준히 성장할 수 있는 환경을 만듭니다.<br />또바기는 크리에이터의 다음을 함께하는 파트너입니다.</p><Link className="text-link inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent text-[inherit]" href="/about" data-reveal>또바기 알아보기 <span aria-hidden="true">↗</span></Link></div>
        </section>
    );
}
