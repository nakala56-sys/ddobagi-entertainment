"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

export function AboutHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.about.section.hero(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="hero [--accent:#ffffff] min-h-[100svh] relative overflow-clip bg-[#000000] text-[white] flex items-end [&_h1]:text-6xl [&_h1]:compact:text-6xl [&_h1]:site:text-[8.4rem] [&_h1]:wide:text-[10.4rem] [&_h1]:xl:text-[13.6rem] [&_h1]:2xl:text-[15.2rem] [&_h1]:leading-[round(up,0.98em,0.4rem)] [&_h1]:font-[580] [&_h1]:tracking-[round(nearest,-0.055em,0.4rem)] [&_h1]:mt-13 max-site:[&_h1]:text-5xl max-site:[&_h1]:compact:text-[5.6rem] max-site:[&_h1]:site:text-[9.2rem] max-site:[&_h1]:wide:text-[9.2rem] max-site:[&_h1]:xl:text-[9.2rem] max-site:[&_h1]:2xl:text-[9.2rem] max-site:[&_h1]:mt-10" aria-labelledby="about-hero-title">
            <div className="hero-image absolute inset-0 [&_img]:object-[center_38%]" data-image><Image src="/images/about/brand.webp" alt="또바기 회사소개서에 소개된 개인 방송 환경" fill sizes="100vw" priority /></div>
            <div className="hero-shade absolute inset-0 bg-[linear-gradient(180deg,_#00000088,_#00000066_35%,_#000000c9)]" />
            <div className="hero-content relative pt-45 pb-14 max-site:pt-38 max-site:pb-10 content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]">
                <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase" data-reveal>ABOUT US</p>
                <h1 id="about-hero-title"><span className="line-mask block overflow-clip [&_>_span]:block [&_>_span]:pb-[round(up,0.12em,0.4rem)]"><span data-line>EVERY COLOR</span></span><span className="line-mask block overflow-clip [&_>_span]:block [&_>_span]:pb-[round(up,0.12em,0.4rem)]"><span data-line>HAS A STORY.</span></span></h1>
                <div className="hero-bottom flex justify-between items-end gap-10 mt-14 [&_h2]:text-lg [&_h2]:compact:text-lg [&_h2]:site:text-lg [&_h2]:wide:text-[2.8rem] [&_h2]:xl:text-3xl [&_h2]:2xl:text-3xl [&_h2]:font-[550] [&_h2]:tracking-[round(nearest,-0.035em,0.4rem)] [&_p]:mt-3 [&_p]:text-[#ffffffb5] [&_p]:text-base max-site:mt-10 max-site:block max-site:[&_h2]:text-2xl max-site:[&_p]:text-base max-site:[&_p]:max-w-80" data-reveal><div><h2>매력을 발견하고, 가능성을 키웁니다.</h2><p>각자의 개성이 오래 빛날 수 있도록 함께합니다.</p></div><span className="scroll-hint site:pb-16 flex items-center gap-8 text-xs tracking-[round(nearest,0.12em,0.4rem)] whitespace-nowrap [&_>_span]:text-lg max-site:mt-8">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></span></div>
            </div>
        </section>
    );
}
