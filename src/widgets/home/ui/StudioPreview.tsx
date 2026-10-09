"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Animation from "@/shared/utils/animation";

export function StudioPreview() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.studioPreview(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="section section-dark" aria-labelledby="home-studio-title"><div className="content-width">
            <div className="section-heading"><div><p className="eyebrow" data-reveal>04 — YOUR SPACE</p><h2 id="home-studio-title" className="display-title" data-reveal>새로운 무대가<br />준비되어 있어요.</h2></div><Link className="text-link" href="/equipment" data-reveal>방송 환경 둘러보기 ↗</Link></div>
            <div className="wide-image" data-image><Image src="/images/home/studio.webp" alt="회사소개서에 소개된 또바기 방송 스튜디오" fill sizes="(min-width: 1440px) 1320px, 90vw" /></div>
            <p className="image-caption" data-reveal>전문 장비와 방송 세팅. 콘텐츠에 집중할 수 있는 공간.</p>
        </div></section>
    );
}
