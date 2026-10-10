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
        <section
            ref={sectionRef}
            className="section py-18 tablet:py-30 content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto"
            aria-labelledby="creator-stories-title"
        >
            <p
                className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                data-reveal
            >
                05 — REAL CREATORS, REAL STORIES
            </p>
            <div className="split-layout grid grid-cols-1 tablet:grid-cols-2 items-center gap-10 pc:gap-18">
                <div
                    className="portrait-image relative h-110 tablet:h-170 overflow-clip"
                    data-reveal
                >
                    <Image
                        className="grayscale"
                        src="/images/home/creator-stories.webp"
                        alt="회사소개서에 담긴 소속 크리에이터들의 실제 방송 활동 사례"
                        fill
                        sizes="(min-width: 48rem) 45vw, 90vw"
                    />
                </div>
                <div className="split-copy flex flex-col items-start gap-6 tablet:gap-8">
                    <h2
                        id="creator-stories-title"
                        className="display-title text-[4rem] tablet:text-[4.4rem] pc:text-[6.8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] m-0"
                        data-reveal
                    >
                        각자의 이야기.
                        <br />
                        함께 만드는 <span className="accent text-[var(--accent)]">다음.</span>
                    </h2>
                    <p
                        className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)]"
                        data-reveal
                    >
                        다양한 콘텐츠, 각자의 방송 스타일.
                        <br />
                        실제 크리에이터의 활동을 바탕으로
                        <br />
                        방송 환경과 콘텐츠의 방향을 함께 고민합니다.
                    </p>
                    <ContactCreatorButton>나의 가능성 이야기하기</ContactCreatorButton>
                </div>
            </div>
        </section>
    );
}
