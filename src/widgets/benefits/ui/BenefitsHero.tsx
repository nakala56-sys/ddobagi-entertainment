"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

export function BenefitsHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.benefits.section.hero(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="hero [--accent:#ffffff] min-h-[100svh] relative overflow-clip bg-[#000000] text-[white] flex items-end [&_h1]:text-6xl [&_h1]:compact:text-6xl [&_h1]:site:text-[8.4rem] [&_h1]:wide:text-[10.4rem] [&_h1]:xl:text-[13.6rem] [&_h1]:2xl:text-[15.2rem] [&_h1]:leading-[round(up,0.98em,0.4rem)] [&_h1]:font-[580] [&_h1]:tracking-[round(nearest,-0.055em,0.4rem)] [&_h1]:mt-13 max-site:[&_h1]:text-5xl max-site:[&_h1]:compact:text-[5.6rem] max-site:[&_h1]:site:text-[9.2rem] max-site:[&_h1]:wide:text-[9.2rem] max-site:[&_h1]:xl:text-[9.2rem] max-site:[&_h1]:2xl:text-[9.2rem] max-site:[&_h1]:mt-10" aria-labelledby="benefits-hero-title">
            <div className="hero-image absolute inset-0 [&_img]:object-[center_38%]" data-image><Image src="/images/services/design.webp" alt="방송 디자인 제작을 설명하는 회사소개서 이미지" fill sizes="100vw" priority /></div>
            <div className="hero-shade absolute inset-0 bg-[linear-gradient(180deg,_#00000088,_#00000066_35%,_#000000c9)]" />
            <div className="hero-content relative pt-45 pb-14 max-site:pt-38 max-site:pb-10 content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]">
                <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase" data-reveal>CREATOR BENEFITS</p>
                <h1 id="benefits-hero-title"><span className="line-mask block overflow-clip [&_>_span]:block [&_>_span]:pb-[round(up,0.12em,0.4rem)]"><span data-line>FOCUS ON</span></span><span className="line-mask block overflow-clip [&_>_span]:block [&_>_span]:pb-[round(up,0.12em,0.4rem)]"><span data-line>YOUR CREATIVITY.</span></span></h1>
                <div className="hero-bottom flex justify-between items-end gap-10 mt-14 [&_h2]:text-lg [&_h2]:compact:text-lg [&_h2]:site:text-lg [&_h2]:wide:text-[2.8rem] [&_h2]:xl:text-3xl [&_h2]:2xl:text-3xl [&_h2]:font-[550] [&_h2]:tracking-[round(nearest,-0.035em,0.4rem)] [&_p]:mt-3 [&_p]:text-[#ffffffb5] [&_p]:text-base max-site:mt-10 max-site:block max-site:[&_h2]:text-2xl max-site:[&_p]:text-base max-site:[&_p]:max-w-80" data-reveal><div><h2>성장에 필요한 지원을 함께.</h2><p>시작하는 크리에이터도, 다음 단계를 준비하는 크리에이터도.</p></div><span className="scroll-hint site:pb-16 flex items-center gap-8 text-xs tracking-[round(nearest,0.12em,0.4rem)] whitespace-nowrap [&_>_span]:text-lg max-site:mt-8">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></span></div>
            </div>
        </section>
    );
}
