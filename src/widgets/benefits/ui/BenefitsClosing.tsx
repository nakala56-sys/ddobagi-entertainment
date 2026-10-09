"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ContactCreatorButton } from "@/features/contactCreator";
import Animation from "@/shared/utils/animation";

export function BenefitsClosing() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.benefits.section.closing(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="closing section-dark" aria-labelledby="benefits-closing-title">
            <div className="closing-image" data-image><Image src="/images/home/studio.webp" alt="또바기 회사소개서에 담긴 방송 환경" fill sizes="100vw" /></div>
            <div className="closing-content content-width"><p className="eyebrow" data-reveal>NEXT — GROW TOGETHER</p><h2 id="benefits-closing-title" data-reveal>GROW TOGETHER.<br />SHINE BRIGHTER.</h2><p className="body-copy" data-reveal>당신의 가능성을 믿고, 그 성장을 함께 만들어갑니다.</p><div data-reveal><ContactCreatorButton>또바기와 함께 시작하기</ContactCreatorButton></div></div>
        </section>
    );
}
