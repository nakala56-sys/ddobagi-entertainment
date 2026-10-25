"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import { GradientWaveSettle } from "@/shared/ui/gradient-wave/GradientWaveSettle";

export function EquipmentHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.equipment.section.hero(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            data-report-id="equipment-hero"
            data-report-type="group"
            className="hero relative overflow-visible"
            aria-labelledby="equipment-hero-title"
        >
            <GradientWaveSettle
                text={["READY FOR", "YOUR NEXT."]}
                id="equipment-hero-title"
                as="h1"
                className="px-[2rem] tablet:px-[6rem] pt-[15.2rem] tablet:pt-[16rem] pb-[4rem] tablet:pb-[5.6rem] flex flex-col"
                textClassName="mx-auto w-full max-w-[132rem] text-left text-[5.2rem] leading-[1.5] font-[580]"
                colors={["#137456", "#136874", "#137456", "#136874"]}
                speed={1}
                distortion={0.8}
                before={
                    <p
                        className="eyebrow mx-auto mb-[3.2rem] tablet:mb-[4rem] w-full max-w-[132rem] text-left text-[1.2rem] font-[650] leading-[1.0] uppercase"
                        data-reveal
                    >
                        BROADCAST ENVIRONMENT
                    </p>
                }
            >
                <div
                    className="hero-bottom mx-auto w-full max-w-[132rem] mt-[4.8rem] tablet:mt-[6.4rem] text-left break-keep"
                    data-reveal
                >
                    <h2 className="text-[2.0rem] font-[500]">방송 장비부터 스튜디오까지.</h2>
                    <p className="mt-[1.6rem] text-[1.6rem] text-[#b5b5b5] leading-[1.5]">작은 디테일부터 공간까지, 방송을 위한 준비를 함께합니다.</p>
                    <span className="scroll-hint inline-flex items-center gap-[2.4rem] mt-[4.8rem] tablet:mt-[6.4rem] text-[1.2rem] leading-[1.0]">
                        SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
                    </span>
                </div>
            </GradientWaveSettle>
        </section>
    );
}
