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
        <section ref={sectionRef} className="section content-width brand-intro" aria-labelledby="home-brand-title">
            <p className="eyebrow" data-reveal>02 — OUR BELIEF</p>
            <h2 id="home-brand-title" className="display-title" data-reveal>가능성은 당신에게.<br />그 다음은 <span className="accent">우리 함께.</span></h2>
            <div className="intro-bottom"><p className="body-copy" data-reveal>각자의 매력을 발견하고, 콘텐츠로 연결하고,<br />꾸준히 성장할 수 있는 환경을 만듭니다.<br />또바기는 크리에이터의 다음을 함께하는 파트너입니다.</p><Link className="text-link" href="/about" data-reveal>또바기 알아보기 <span aria-hidden="true">↗</span></Link></div>
        </section>
    );
}
