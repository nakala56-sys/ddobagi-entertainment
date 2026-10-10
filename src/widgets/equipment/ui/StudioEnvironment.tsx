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
        <section
            ref={sectionRef}
            className="section py-18 tablet:py-30 section-dark [--accent:#ffffff] text-[var(--paper)] bg-[#000000]"
            aria-labelledby="studio-environment-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto">
                <p
                    className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                    data-reveal
                >
                    03 — YOUR SPACE TO CREATE
                </p>
                <h2
                    id="studio-environment-title"
                    className="display-title text-4xl tablet:text-5xl pc:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-5 tablet:mt-7"
                    data-reveal
                >
                    콘텐츠가 시작되는 공간.
                </h2>
                <div
                    className="wide-image relative h-75 tablet:h-[min(60vw,_65.2rem)] overflow-clip studio-full-image mt-13"
                    data-image
                >
                    <Image
                        className="grayscale"
                        src="/images/equipment/studio.webp"
                        alt="회사소개서에 소개된 또바기 대형 방송 스튜디오"
                        fill
                        sizes="90vw"
                    />
                </div>
                <div className="intro-bottom flex items-start tablet:items-end justify-between gap-8 tablet:gap-10 mt-8 tablet:mt-13 flex-col tablet:flex-row mb-0">
                    <p
                        className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[#b5b5b5]"
                        data-reveal
                    >
                        개인 방송부터 함께 만드는 라이브 콘텐츠까지.
                        <br />
                        방송과 제작에 집중할 수 있는 공간을 소개합니다.
                    </p>
                    <ContactCreatorButton>방송 환경 상담하기</ContactCreatorButton>
                </div>
            </div>
        </section>
    );
}
