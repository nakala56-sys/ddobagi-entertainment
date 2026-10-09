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
        <section ref={sectionRef} className="hero" aria-labelledby="benefits-hero-title">
            <div className="hero-image" data-image><Image src="/images/services/design.webp" alt="방송 디자인 제작을 설명하는 회사소개서 이미지" fill sizes="100vw" priority /></div>
            <div className="hero-shade" />
            <div className="hero-content content-width">
                <p className="eyebrow" data-reveal>CREATOR BENEFITS</p>
                <h1 id="benefits-hero-title"><span className="line-mask"><span data-line>FOCUS ON</span></span><span className="line-mask"><span data-line>YOUR CREATIVITY.</span></span></h1>
                <div className="hero-bottom" data-reveal><div><h2>성장에 필요한 지원을 함께.</h2><p>시작하는 크리에이터도, 다음 단계를 준비하는 크리에이터도.</p></div><span className="scroll-hint">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></span></div>
            </div>
        </section>
    );
}
