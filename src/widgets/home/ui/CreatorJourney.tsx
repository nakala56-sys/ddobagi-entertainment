"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";

const STEPS = [
    { title: "카카오톡 문의", description: "방송을 준비 중이거나 활동 중이라면, 현재 상황과 궁금한 점을 남겨주세요." },
    { title: "방향 상담", description: "방송 경험과 관심 콘텐츠를 바탕으로, 앞으로의 활동 방향을 함께 이야기합니다." },
    { title: "맞춤 지원 안내", description: "방송 환경과 콘텐츠에 필요한 지원을 살펴보고, 지원 범위와 조건을 안내합니다." },
    { title: "방송 준비", description: "상담한 내용을 바탕으로 장비 세팅과 콘텐츠 방향을 준비합니다." },
];

export function CreatorJourney() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.creatorJourney(sectionRef.current);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section relative z-10 bg-[#f5f5f5] py-[7.2rem] tablet:py-[12rem]"
            aria-labelledby="home-journey-title"
        >
            <div className="content-width mx-auto w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem]">
                <h2
                    id="home-journey-title"
                    className="display-title mt-[2rem] tablet:mt-[2.8rem] text-[3.6rem] tablet:text-[4.8rem] pc:text-[8rem] leading-[1.5] font-[580] break-keep"
                    data-reveal
                >
                    상담부터 활동까지,
                    <br />
                    차근차근 함께합니다.
                </h2>
                <p
                    className="body-copy mt-[3.2rem] text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373] break-keep"
                    data-reveal
                >
                    지금의 방송 경험과 준비 상황을 들려주세요.
                    <br />
                    필요한 지원과 활동 방향을 함께 이야기합니다.
                </p>
                <ol className="mt-[4.8rem] tablet:mt-[7.2rem] grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-4 gap-[3.2rem] tablet:gap-[4rem]">
                    {STEPS.map((step, index) => (
                        <li
                            key={step.title}
                            className="border-t border-solid border-[#dedede] pt-[2.8rem]"
                            data-reveal
                        >
                            <span
                                className="text-[1.2rem] text-[var(--accent,#000000)]"
                                aria-hidden="true"
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="mt-[2.4rem] text-[2rem] tablet:text-[2.4rem] font-[600] leading-[1.0]">{step.title}</h3>
                            <p className="mt-[1.6rem] text-[1.6rem] leading-[1.5] text-[#737373] break-keep">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
