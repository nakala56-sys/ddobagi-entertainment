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
            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 h-full mix-blend-exclusion">
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
                <div
                    className="absolute top-1/2 right-[2rem] flex w-[calc(100%-4rem)] -translate-y-1/2 flex-col items-start justify-start text-left tablet:right-0 tablet:w-1/2 tablet:text-center"
                    data-reveal
                >
                    <h2
                        id="home-hero-title"
                        className="w-full text-left text-[clamp(1.7rem,4.8vw,2.8rem)] font-semibold leading-[1.4] [text-shadow:0_0_1rem_#000]"
                        data-hero-roll
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
                                    data-hero-body={roll.body.join("\n")}
                                    aria-hidden={index === 0 ? undefined : true}
                                    className="absolute inset-x-0 top-0 block"
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
                    <p
                        className="mt-[1.6rem] text-left text-[1.5rem] leading-[1.5] break-keep tablet:text-[2rem]"
                        data-hero-copy
                    >
                        {HERO_ROLLS[0].body.map((line, index) => (
                            <span key={line}>
                                {index > 0 ? <br /> : null}
                                {line}
                            </span>
                        ))}
                    </p>

                    <div className="flex flex-col items-center mt-[4.8rem]">
                        {/* 꼬리가 긴 선 */}
                        <div className="w-[0.2rem] h-[5.2rem] bg-[#ede9d7] rounded-full" />
                        {/* 화살촉 (두 개의 막대를 45도와 -45도로 기울임) */}
                        <div
                            className="relative h-[1.3rem] flex items-center justify-center"
                            style={{ marginTop: "-0.1rem" }}
                            aria-hidden="true"
                        >
                            <div
                                className="absolute bottom-[1.4rem] left-[-1.2rem] w-[1.4rem] h-[0.18rem] bg-[#ede9d7] rounded-full"
                                style={{ transform: "rotate(45deg)" }}
                            ></div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
