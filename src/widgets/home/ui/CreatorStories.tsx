"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ContactCreatorButton } from "@/features/contactCreator";
import Animation from "@/shared/utils/animation";

export function CreatorStories() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.creatorStories(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="section content-width" aria-labelledby="creator-stories-title">
            <p className="eyebrow" data-reveal>05 — REAL CREATORS, REAL STORIES</p>
            <div className="split-layout"><div className="portrait-image" data-reveal><Image src="/images/home/creator-stories.webp" alt="회사소개서에 담긴 소속 크리에이터들의 실제 방송 활동 사례" fill sizes="(min-width: 900px) 45vw, 90vw" /></div><div className="split-copy"><h2 id="creator-stories-title" className="display-title" data-reveal>각자의 이야기.<br />함께 만드는 <span className="accent">다음.</span></h2><p className="body-copy" data-reveal>다양한 콘텐츠, 각자의 방송 스타일.<br />실제 크리에이터의 활동을 바탕으로<br />방송 환경과 콘텐츠의 방향을 함께 고민합니다.</p><ContactCreatorButton>나의 가능성 이야기하기</ContactCreatorButton></div></div>
        </section>
    );
}
