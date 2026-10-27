"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

const HERO_ROLLS = [
    {
        lines: ["크리에이터 매니지먼트부터", "브랜드 협업까지."],
        body: ["라이브 방송 기획·운영부터 콘텐츠 제작, 크리에이터 육성,", "그리고 브랜드와의 협업까지.", "성장하는 크리에이터를 위한 모든 과정을 저희가 함께합니다."],
    },
    {
        lines: ["크리에이터의 방송을,", "함께 기획하고 키웁니다."],
        body: ["방송 스타일과 콘텐츠 방향, 시청자와의 소통까지.", "크리에이터의 개성에 맞는 방향을 찾고,", "꾸준한 방송 활동을 지원합니다."],
    },
    {
        lines: ["상담부터 활동까지,", "차근차근 함께합니다."],
        body: ["지금의 방송 경험과 준비 상황을 들려주세요.", "필요한 지원과 활동 방향을 함께 이야기합니다."],
    },
] as const;

export function HeroIntro() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.heroIntro(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            data-report-id="home-hero"
            data-report-type="group"
            className="hero relative min-h-[100svh] overflow-hidden"
            aria-labelledby="home-hero-title"
        >
            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 h-full">
                <Image
                    src="/images/home/hero-wide.png"
                    alt=""
                    width={1915}
                    height={821}
                    unoptimized
                    priority
                    sizes="100vw"
                    data-image
                    className="block h-full w-full max-w-none object-cover brightness-70"
                />
            </div>
            <section className="relative z-10 flex min-h-[100svh] flex-col items-end justify-center px-[2rem] pt-[15.2rem] pb-[4rem] tablet:px-[6rem] tablet:pt-[16rem] tablet:pb-[5.6rem]">
                <div className="absolute top-1/2 right-[2rem] flex w-[calc(100%-4rem)] -translate-y-1/2 flex-col items-start justify-start text-left text-[#faf9f5] tablet:right-0 tablet:w-1/2 tablet:text-center">
                    <h2
                        id="home-hero-title"
                        className="w-full text-left text-[clamp(2.2rem,6vw,3rem)] font-semibold leading-[1.4] [text-shadow:0_0_1rem_#000] tablet:text-[clamp(3rem,3.2vw,4.2rem)]"
                        data-hero-roll
                        data-reveal
                    >
                        <span
                            data-hero-mask
                            className="relative block w-full overflow-hidden"
                            style={{ height: "2.8em" }}
                        >
                            {HERO_ROLLS.map((roll, index) => (
                                <span
                                    key={roll.lines[0]}
                                    data-hero-slide
                                    aria-hidden={index === 0 ? undefined : true}
                                    className={`absolute inset-x-0 top-0 block ${index === 0 ? "" : "invisible"}`}
                                >
                                    {roll.lines.map((line) => (
                                        <span
                                            key={line}
                                            className="block whitespace-nowrap"
                                        >
                                            {line}
                                        </span>
                                    ))}
                                </span>
                            ))}
                        </span>
                    </h2>
                    <div
                        className="mt-[2rem] grid w-full items-start pr-[6.4rem] text-left text-[1.8rem] leading-[1.5] break-keep tablet:pr-[8rem] tablet:text-[2.2rem] pc:text-[2.4rem]"
                        data-hero-copy
                        data-reveal
                    >
                        {HERO_ROLLS.map((roll, index) => (
                            <p
                                key={roll.lines[0]}
                                data-hero-copy-slide
                                aria-hidden={index === 0 ? undefined : true}
                                className={`col-start-1 row-start-1 min-w-0 ${index === 0 ? "" : "invisible"}`}
                            >
                                {roll.body.map((line, lineIndex) => (
                                    <span key={line}>
                                        {lineIndex > 0 ? <br /> : null}
                                        {line}
                                    </span>
                                ))}
                            </p>
                        ))}
                    </div>
                </div>
            </section>
            <div
                data-hero-scroll
                className="pointer-events-none absolute bottom-[3.2rem] left-1/2 z-10 -translate-x-1/2 text-[#faf9f5] tablet:bottom-[4rem]"
            >
                <div
                    className="flex flex-col items-center gap-[1.2rem]"
                    data-reveal
                >
                    <div
                        className="relative h-[7.2rem] w-[0.2rem] overflow-hidden"
                        aria-hidden="true"
                    >
                        <div
                            data-hero-scroll-line
                            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#ffffff_40%,#ffffff_70%,transparent_100%)]"
                        />
                    </div>
                    <p className="text-[1.4rem] font-medium tracking-[0.08em] [text-shadow:0_0_2rem_#000]">스크롤을 내려 둘러보세요</p>
                </div>
            </div>
        </section>
    );
}
