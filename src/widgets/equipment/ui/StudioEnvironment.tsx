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
            className="section py-[7.2rem] tablet:py-[12rem] section-dark [--accent:#ffffff] text-[#ffffff] bg-[#000000]"
            aria-labelledby="studio-environment-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto">
                <h2
                    id="studio-environment-title"
                    className="display-title text-[3.6rem] tablet:text-[4.8rem] pc:text-[8rem] leading-[1.5] font-[580] mt-[2rem] tablet:mt-[2.8rem]"
                    data-reveal
                >
                    콘텐츠가 시작되는 공간.
                </h2>
                <div
                    className="wide-image relative h-[30rem] tablet:h-[60vw] tablet:max-h-[65.2rem] overflow-clip studio-full-image mt-[5.2rem]"
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
                <div className="intro-bottom flex items-start tablet:items-end justify-between gap-[3.2rem] tablet:gap-[4rem] mt-[3.2rem] tablet:mt-[5.2rem] flex-col tablet:flex-row mb-0">
                    <p
                        className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#b5b5b5]"
                        data-reveal
                    >
                        개인 방송부터 함께 만드는 라이브 콘텐츠까지.
                        <br />
                        방송과 제작에 집중할 수 있는 공간을 소개합니다.
                    </p>
                    <ContactCreatorButton />
                </div>
            </div>
        </section>
    );
}
