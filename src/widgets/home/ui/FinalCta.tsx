"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ContactCreatorButton } from "@/features/contactCreator";
import Animation from "@/shared/utils/animation";

export function FinalCta() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.finalCta(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="closing section-dark" aria-labelledby="home-closing-title">
            <div className="closing-image" data-image><Image src="/images/equipment/studio.webp" alt="또바기 회사소개서에 담긴 방송 환경" fill sizes="100vw" /></div>
            <div className="closing-content content-width"><p className="eyebrow" data-reveal>06 — YOUR NEXT CHAPTER</p><h2 id="home-closing-title" data-reveal>LET’S GROW<br />TOGETHER.</h2><p className="body-copy" data-reveal>당신의 다음 이야기를 기다립니다.</p><div data-reveal><ContactCreatorButton>또바기와 함께 시작하기</ContactCreatorButton></div></div>
        </section>
    );
}
