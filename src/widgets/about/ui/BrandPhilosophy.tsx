"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

export function BrandPhilosophy() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.about.section.brandPhilosophy(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="section py-30 max-site:py-18 content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]" aria-labelledby="philosophy-title"><div className="split-layout grid grid-cols-2 items-center gap-18 max-wide:gap-10 max-site:grid-cols-1 max-site:gap-10 philosophy-layout [&.philosophy-layout]:items-start">
            <div className="philosophy-image [.philosophy-layout_&]:sticky [.philosophy-layout_&]:top-20 max-site:[.philosophy-layout_&]:relative max-site:[.philosophy-layout_&]:top-auto" data-reveal><div className="portrait-image relative h-170 overflow-clip max-site:h-138 max-compact:h-110"><Image src="/images/about/brand.webp" alt="회사소개서의 다양한 개인 방송 세팅 사례" fill sizes="(min-width: 900px) 45vw, 90vw" /></div></div>
            <div className="split-copy flex flex-col items-start gap-8 max-site:gap-6"><p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase" data-reveal>01 — OUR PHILOSOPHY</p><h2 id="philosophy-title" className="display-title text-[4rem] compact:text-[4rem] site:text-5xl wide:text-6xl xl:text-[8rem] 2xl:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-7 [.split-copy_&]:m-0 [.split-copy_&]:text-4xl [.split-copy_&]:compact:text-4xl [.split-copy_&]:site:text-[4.4rem] [.split-copy_&]:wide:text-[5.2rem] [.split-copy_&]:xl:text-[6.8rem] [.split-copy_&]:2xl:text-[6.8rem] [.stack-card_&]:text-3xl [.stack-card_&]:compact:text-3xl [.stack-card_&]:site:text-4xl [.stack-card_&]:wide:text-[4.4rem] [.stack-card_&]:xl:text-[5.6rem] [.stack-card_&]:2xl:text-[5.6rem] [.stack-card_&]:my-8 max-site:text-4xl max-site:compact:text-[4rem] max-site:site:text-6xl max-site:wide:text-6xl max-site:xl:text-6xl max-site:2xl:text-6xl max-site:mt-5 max-site:[.split-copy_&]:text-[4rem] max-site:[.split-copy_&]:compact:text-[4rem] max-site:[.split-copy_&]:site:text-6xl max-site:[.split-copy_&]:wide:text-6xl max-site:[.split-copy_&]:xl:text-6xl max-site:[.split-copy_&]:2xl:text-6xl max-site:[.showcase-copy_&]:text-5xl max-site:[.stack-card_&]:text-[4rem]" data-reveal>Everyone has<br />their own <span className="accent text-[var(--accent)]">color.</span></h2><p className="body-copy text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)] [.section-dark_&]:text-[#b5b5b5] [.showcase-copy_&]:mt-8 [.stack-card_&]:max-w-110 [.stack-card_&]:text-[#b5b5b5] max-site:[.showcase-copy_&]:mt-5" data-reveal>각자가 가진 개성과 매력을 소중하게 생각합니다.</p><p className="body-copy text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)] [.section-dark_&]:text-[#b5b5b5] [.showcase-copy_&]:mt-8 [.stack-card_&]:max-w-110 [.stack-card_&]:text-[#b5b5b5] max-site:[.showcase-copy_&]:mt-5" data-reveal>누군가를 보여주는 데서 멈추지 않고,<br />자신만의 색깔을 가진 크리에이터로 성장할 수 있도록<br />함께 고민하고 만들어갑니다.</p><p className="body-copy text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)] [.section-dark_&]:text-[#b5b5b5] [.showcase-copy_&]:mt-8 [.stack-card_&]:max-w-110 [.stack-card_&]:text-[#b5b5b5] max-site:[.showcase-copy_&]:mt-5" data-reveal>시작을 위한 환경, 지속을 위한 지원.<br />또바기는 오래 함께할 수 있는 방향을 찾습니다.</p></div>
        </div></section>
    );
}
