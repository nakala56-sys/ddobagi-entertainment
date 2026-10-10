"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import { GradientWave } from "@/shared/ui/gradient-wave/GradientWave";

export function BenefitsHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.benefits.section.hero(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="hero relative overflow-visible"
            aria-labelledby="benefits-hero-title"
        >
            <GradientWave
                text={["FOCUS ON", "YOUR CREATIVITY."]}
                id="benefits-hero-title"
                as="h1"
                className="px-5 tablet:px-15 pt-38 tablet:pt-40 pb-10 tablet:pb-14 flex flex-col"
                textClassName="mx-auto w-full max-w-330 text-left text-[5.2rem] leading-[round(up,1.04em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)]"
                speed={1}
                distortion={0.8}
                before={
                    <p
                        className="eyebrow mx-auto mb-8 tablet:mb-10 w-full max-w-330 text-left text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                        data-reveal
                    >
                        CREATOR BENEFITS
                    </p>
                }
            >
                <div
                    className="hero-bottom mx-auto w-full max-w-330 mt-12 tablet:mt-16 text-left break-keep"
                    data-reveal
                >
                    <h2 className="text-2xl tablet:text-3xl font-[550] tracking-[round(nearest,-0.035em,0.4rem)]">성장에 필요한 지원을 함께.</h2>
                    <p className="mt-4 text-base text-[#53616c]">시작하는 크리에이터도, 다음 단계를 준비하는 크리에이터도.</p>
                    <span className="scroll-hint inline-flex items-center gap-6 mt-12 tablet:mt-16 text-xs tracking-[round(nearest,0.12em,0.4rem)]">
                        SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
                    </span>
                </div>
            </GradientWave>
        </section>
    );
}
