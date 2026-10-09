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
        <section ref={sectionRef} className="hero" aria-labelledby="about-hero-title">
            <div className="hero-image" data-image><Image src="/images/about/brand.webp" alt="또바기 회사소개서에 소개된 개인 방송 환경" fill sizes="100vw" priority /></div>
            <div className="hero-shade" />
            <div className="hero-content content-width">
                <p className="eyebrow" data-reveal>ABOUT US</p>
                <h1 id="about-hero-title"><span className="line-mask"><span data-line>EVERY COLOR</span></span><span className="line-mask"><span data-line>HAS A STORY.</span></span></h1>
                <div className="hero-bottom" data-reveal><div><h2>매력을 발견하고, 가능성을 키웁니다.</h2><p>각자의 개성이 오래 빛날 수 있도록 함께합니다.</p></div><span className="scroll-hint">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></span></div>
            </div>
        </section>
    );
}
