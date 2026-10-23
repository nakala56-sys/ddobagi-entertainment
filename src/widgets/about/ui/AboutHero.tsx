"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import { GradientWave } from "@/shared/ui/gradient-wave/GradientWave";

export function AboutHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.about.section.hero(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="hero relative overflow-visible"
            aria-labelledby="about-hero-title"
        >
            <GradientWave
                text={["EVERY COLOR", "HAS A STORY."]}
                id="about-hero-title"
                as="h1"
                className="px-[2rem] tablet:px-[6rem] pt-[15.2rem] tablet:pt-[16rem] pb-[4rem] tablet:pb-[5.6rem] flex flex-col"
                textClassName="mx-auto w-full max-w-[132rem] text-left text-[5.2rem] leading-[1.5] font-[580]"
                speed={1}
                distortion={0.8}
                before={
                    <p
                        className="eyebrow mx-auto mb-[3.2rem] tablet:mb-[4rem] w-full max-w-[132rem] text-left text-[1.2rem] font-[650] leading-[1.0] uppercase"
                        data-reveal
                    >
                        ABOUT US
                    </p>
                }
            >
                <div
                    className="hero-bottom mx-auto w-full max-w-[132rem] mt-[4.8rem] tablet:mt-[6.4rem] text-left break-keep"
                    data-reveal
                >
                    <h2 className="text-[2.0rem] font-[500]">
                        사람의 매력을 발견하고,
                        <br />그 가능성을 함께 키워갑니다.
                    </h2>
                    <p className="mt-[1.6rem] text-[1.6rem] text-[#b5b5b5] leading-[1.5]">각자의 개성이 오래 빛날 수 있도록 함께합니다.</p>
                    <span className="scroll-hint inline-flex items-center gap-[2.4rem] mt-[4.8rem] tablet:mt-[6.4rem] text-[1.2rem] leading-[1.0]">
                        SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
                    </span>
                </div>
            </GradientWave>
        </section>
    );
}
