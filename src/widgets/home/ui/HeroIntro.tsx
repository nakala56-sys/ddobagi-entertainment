"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

export function HeroIntro() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.heroIntro(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="hero" aria-labelledby="home-hero-title">
            <div className="hero-image" data-image><Image src="/images/home/hero.webp" alt="또바기 회사소개서에 소개된 방송 스튜디오" fill sizes="100vw" priority /></div>
            <div className="hero-shade" />
            <div className="hero-content content-width">
                <p className="eyebrow" data-reveal>01 — TOBBAGI ENTERTAINMENT</p>
                <h1 id="home-hero-title"><span className="line-mask"><span data-line>YOUR COLOR.</span></span><span className="line-mask"><span data-line>YOUR STAGE.</span></span></h1>
                <div className="hero-bottom" data-reveal><div><h2>당신만의 색깔이 빛나는 무대.</h2><p>방송을 시작하는 순간부터, 다음 가능성을 만나는 날까지.</p></div><span className="scroll-hint">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></span></div>
            </div>
        </section>
    );
}
