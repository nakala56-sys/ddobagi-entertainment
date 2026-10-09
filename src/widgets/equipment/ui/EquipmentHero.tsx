"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

export function EquipmentHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.equipment.section.hero(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="hero" aria-labelledby="equipment-hero-title">
            <div className="hero-image" data-image><Image src="/images/home/studio.webp" alt="또바기 방송 스튜디오의 촬영 장비와 조명" fill sizes="100vw" priority /></div>
            <div className="hero-shade" />
            <div className="hero-content content-width">
                <p className="eyebrow" data-reveal>BROADCAST ENVIRONMENT</p>
                <h1 id="equipment-hero-title"><span className="line-mask"><span data-line>READY FOR</span></span><span className="line-mask"><span data-line>YOUR NEXT.</span></span></h1>
                <div className="hero-bottom" data-reveal><div><h2>더 좋은 콘텐츠를 위한 환경.</h2><p>작은 디테일부터 공간까지, 방송을 위한 준비를 함께합니다.</p></div><span className="scroll-hint">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></span></div>
            </div>
        </section>
    );
}
