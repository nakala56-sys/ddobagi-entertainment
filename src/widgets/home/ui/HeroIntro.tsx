"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
                text={["YOUR COLOR.", "YOUR STAGE."]}
                id="home-hero-title"
                as="h1"
                className="min-h-[100svh] px-5 tablet:px-15 pt-38 tablet:pt-40 pb-10 tablet:pb-14 flex flex-col justify-center"
                textClassName="mx-auto w-full max-w-330 text-center text-[3.6rem] mobile:text-5xl tablet:text-[8.4rem] pc:text-[15.2rem] leading-[round(up,1.04em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)]"
                speed={1}
                distortion={0.8}
            >
                <div
                    className="hero-bottom mx-auto w-full max-w-330 mt-12 tablet:mt-16 text-center break-keep"
                    data-reveal
                >
                    <h2 className="text-2xl tablet:text-3xl font-[550] tracking-[round(nearest,-0.035em,0.4rem)]">당신만의 색깔이 빛나는 무대.</h2>
                    <p className="mt-4 text-base text-[#53616c]">방송을 시작하는 순간부터, 다음 가능성을 만나는 날까지.</p>
                    <span className="scroll-hint inline-flex items-center gap-6 mt-12 tablet:mt-16 text-xs tracking-[round(nearest,0.12em,0.4rem)]">
                        SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
                    </span>
                </div>
            </GradientWave>
        </section>
    );
}
