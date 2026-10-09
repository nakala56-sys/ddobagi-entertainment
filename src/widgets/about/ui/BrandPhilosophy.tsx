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
        <section ref={sectionRef} className="section content-width" aria-labelledby="philosophy-title"><div className="split-layout philosophy-layout">
            <div className="philosophy-image" data-reveal><div className="portrait-image"><Image src="/images/about/brand.webp" alt="회사소개서의 다양한 개인 방송 세팅 사례" fill sizes="(min-width: 900px) 45vw, 90vw" /></div></div>
            <div className="split-copy"><p className="eyebrow" data-reveal>01 — OUR PHILOSOPHY</p><h2 id="philosophy-title" className="display-title" data-reveal>Everyone has<br />their own <span className="accent">color.</span></h2><p className="body-copy" data-reveal>각자가 가진 개성과 매력을 소중하게 생각합니다.</p><p className="body-copy" data-reveal>누군가를 보여주는 데서 멈추지 않고,<br />자신만의 색깔을 가진 크리에이터로 성장할 수 있도록<br />함께 고민하고 만들어갑니다.</p><p className="body-copy" data-reveal>시작을 위한 환경, 지속을 위한 지원.<br />또바기는 오래 함께할 수 있는 방향을 찾습니다.</p></div>
        </div></section>
    );
}
