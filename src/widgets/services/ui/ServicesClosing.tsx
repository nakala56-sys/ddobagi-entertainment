"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ContactCreatorButton } from "@/features/contactCreator";
import Animation from "@/shared/utils/animation";

export function ServicesClosing() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.services.section.closing(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="closing section-dark" aria-labelledby="services-closing-title">
            <div className="closing-image" data-image><Image src="/images/services/setup.webp" alt="또바기 회사소개서에 담긴 방송 환경" fill sizes="100vw" /></div>
            <div className="closing-content content-width"><p className="eyebrow" data-reveal>NEXT — CREATE TOGETHER</p><h2 id="services-closing-title" data-reveal>YOUR POTENTIAL.<br />OUR PASSION.</h2><p className="body-copy" data-reveal>어떤 방송을 만들고 싶은지, 함께 이야기해요.</p><div data-reveal><ContactCreatorButton>또바기와 함께 시작하기</ContactCreatorButton></div></div>
        </section>
    );
}
