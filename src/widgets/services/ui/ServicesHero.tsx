"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import { GradientWave } from "@/shared/ui/gradient-wave/GradientWave";

export function ServicesHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.services.section.hero(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="hero relative overflow-visible"
            aria-labelledby="services-hero-title"
        >
            <GradientWave
                text={["YOU CREATE.", "WE SUPPORT."]}
                id="services-hero-title"
                as="h1"
                className="px-5 pt-38 pb-10 flex flex-col site:px-15 site:pt-40 site:pb-14"
                textClassName="mx-auto w-full max-w-330 text-left text-[5.2rem] leading-[round(up,1.04em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)]"
                speed={1}
                distortion={0.8}
                before={<p className="eyebrow mx-auto mb-8 site:mb-10 w-full max-w-330 text-left text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase" data-reveal>OUR SERVICES</p>}
            >
                <div
                    className="hero-bottom mx-auto w-full max-w-330 mt-12 site:mt-16 text-left break-keep"
                    data-reveal
                >
                    <h2 className="text-2xl site:text-3xl font-[550] tracking-[round(nearest,-0.035em,0.4rem)]">당신은 콘텐츠에 집중하세요.</h2>
                    <p className="mt-4 text-base text-[#53616c]">방송 환경부터 운영과 기획까지, 필요한 순간에 함께합니다.</p>
                    <span className="scroll-hint inline-flex items-center gap-6 mt-12 site:mt-16 text-xs tracking-[round(nearest,0.12em,0.4rem)]">
                        SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
                    </span>
                </div>
            </GradientWave>
        </section>
    );
}
