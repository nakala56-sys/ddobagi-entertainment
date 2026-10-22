"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import { GradientWave } from "@/shared/ui/gradient-wave/GradientWave";

export function HeroIntro() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.heroIntro(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="hero relative overflow-visible"
            aria-labelledby="home-hero-title"
        >
            <GradientWave
                text={["YOUR COLOR.", "ON AIR."]}
                id="home-hero-title"
                as="h1"
                className="min-h-[100svh] px-[2rem] tablet:px-[6rem] pt-[15.2rem] tablet:pt-[16rem] pb-[4rem] tablet:pb-[5.6rem] flex flex-col justify-center"
                textClassName="mx-auto w-full max-w-[132rem] text-center text-[3.6rem] mobile:text-[4.8rem] tablet:text-[8.4rem] pc:text-[15.2rem] leading-[1.5] font-[580]"
                speed={1}
                distortion={0.8}
            >
                <div
                    className="hero-bottom mx-auto w-full max-w-[132rem] mt-[4.8rem] tablet:mt-[6.4rem] text-center break-keep"
                    data-reveal
                >
                    <h2 className="text-[2.4rem] tablet:text-[3rem] font-[550] leading-[1.5]">
                        라이브 방송 크리에이터를 위한
                        <br />
                        또바기 엔터테인먼트.
                    </h2>
                    <p className="mt-[1.6rem] text-[1.6rem] text-[#53616c] leading-[1.5]">
                        방송 준비부터 콘텐츠 제작, 맞춤 디렉팅까지.
                        <br />
                        크리에이터의 시작과 성장을 함께합니다.
                    </p>
                    <span className="scroll-hint inline-flex items-center gap-[2.4rem] mt-[4.8rem] tablet:mt-[6.4rem] text-[1.2rem] leading-[1.0]">
                        SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
                    </span>
                </div>
            </GradientWave>
        </section>
    );
}
