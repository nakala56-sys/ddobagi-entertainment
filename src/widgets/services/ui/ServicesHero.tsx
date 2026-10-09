"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

export function ServicesHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.services.section.hero(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="hero" aria-labelledby="services-hero-title">
            <div className="hero-image" data-image><Image src="/images/services/directing.webp" alt="디렉팅 지원을 설명하는 회사소개서 이미지" fill sizes="100vw" priority /></div>
            <div className="hero-shade" />
            <div className="hero-content content-width">
                <p className="eyebrow" data-reveal>OUR SERVICES</p>
                <h1 id="services-hero-title"><span className="line-mask"><span data-line>YOU CREATE.</span></span><span className="line-mask"><span data-line>WE SUPPORT.</span></span></h1>
                <div className="hero-bottom" data-reveal><div><h2>당신은 콘텐츠에 집중하세요.</h2><p>방송 환경부터 운영과 기획까지, 필요한 순간에 함께합니다.</p></div><span className="scroll-hint">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></span></div>
            </div>
        </section>
    );
}
