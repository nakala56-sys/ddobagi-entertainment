"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ContactCreatorButton } from "@/features/contactCreator";
import Animation from "@/shared/utils/animation";

export function StudioEnvironment() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.equipment.section.studioEnvironment(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="section section-dark" aria-labelledby="studio-environment-title"><div className="content-width">
            <p className="eyebrow" data-reveal>03 — YOUR SPACE TO CREATE</p><h2 id="studio-environment-title" className="display-title" data-reveal>콘텐츠가 시작되는 공간.</h2><div className="wide-image studio-full-image" data-image><Image src="/images/equipment/studio.webp" alt="회사소개서에 소개된 또바기 대형 방송 스튜디오" fill sizes="90vw" /></div><div className="intro-bottom"><p className="body-copy" data-reveal>개인 방송부터 함께 만드는 라이브 콘텐츠까지.<br />방송과 제작에 집중할 수 있는 공간을 소개합니다.</p><ContactCreatorButton>방송 환경 상담하기</ContactCreatorButton></div>
        </div></section>
    );
}
