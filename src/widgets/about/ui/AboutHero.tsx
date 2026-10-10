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
                className="px-5 tablet:px-15 pt-38 tablet:pt-40 pb-10 tablet:pb-14 flex flex-col"
                textClassName="mx-auto w-full max-w-330 text-left text-[5.2rem] leading-[round(up,1.04em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)]"
                speed={1}
                distortion={0.8}
                before={
                    <p
                        className="eyebrow mx-auto mb-8 tablet:mb-10 w-full max-w-330 text-left text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                        data-reveal
                    >
                        ABOUT US
                    </p>
                }
            >
                <div
                    className="hero-bottom mx-auto w-full max-w-330 mt-12 tablet:mt-16 text-left break-keep"
                    data-reveal
                >
                    <h2 className="text-2xl tablet:text-3xl font-[550] tracking-[round(nearest,-0.035em,0.4rem)]">매력을 발견하고, 가능성을 키웁니다.</h2>
                    <p className="mt-4 text-base text-[#53616c]">각자의 개성이 오래 빛날 수 있도록 함께합니다.</p>
                    <span className="scroll-hint inline-flex items-center gap-6 mt-12 tablet:mt-16 text-xs tracking-[round(nearest,0.12em,0.4rem)]">
                        SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
                    </span>
                </div>
            </GradientWave>
        </section>
    );
}
