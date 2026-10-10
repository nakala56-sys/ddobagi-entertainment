"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { benefits, benefitGroups } from "@/entities/benefit/constants/benefits";
import Animation from "@/shared/utils/animation";

export function BenefitsStickyCards() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.benefits.section.stickyCards(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="section py-18 tablet:py-30 section-cream bg-[#f5f5f5] stacking-section data-[stacking=true]:py-13 data-[stacking=true]:min-h-[100svh] data-[stacking=true]:overflow-clip"
            aria-labelledby="benefits-stack-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto">
                <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">02 — ALWAYS BY YOUR SIDE</p>
                <h2
                    id="benefits-stack-title"
                    className="section-title text-[2.8rem] pc:text-[4.4rem] leading-[round(up,1.25em,0.4rem)] tracking-[round(nearest,-0.04em,0.4rem)] mt-5 font-[600]"
                >
                    함께할수록 더 단단하게.
                </h2>
                <div
                    data-stacking-target
                    className="stacking-stage grid gap-8 mt-10 data-[stacking=true]:relative data-[stacking=true]:h-[70svh]"
                >
                    {benefitGroups.map((group, index) => (
                        <article
                            data-stacking-target
                            key={group.englishTitle}
                            className="stack-card grid grid-cols-1 tablet:[grid-template-columns:1.2fr_1fr] items-center gap-8 pc:gap-10 p-6 tablet:p-9 pc:p-13 bg-[#000000] text-[var(--paper)] rounded-[0.4rem] [&:nth-child(even)]:bg-[#242424] data-[stacking=true]:absolute data-[stacking=true]:inset-0 data-[stacking=true]:origin-top"
                            data-stack-card
                            data-reveal
                        >
                            <div>
                                <span className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">
                                    {String(index + 1).padStart(2, "0")} — {group.englishTitle}
                                </span>
                                <h3 className="display-title text-[4rem] tablet:text-4xl pc:text-[5.6rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-5 tablet:mt-7 my-8">
                                    {group.title}
                                </h3>
                                <p className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[#b5b5b5] max-w-110">{group.description}</p>
                                <ul className="benefit-tags flex flex-wrap gap-3 list-none p-0 mt-8">
                                    {group.benefitIds.map((id) => (
                                        <li
                                            className="text-xs p-[0.8rem_1.2rem] border-[0.4rem] border-solid border-[#ffffff35] rounded-full"
                                            key={id}
                                        >
                                            {benefits.find((item) => item.id === id)?.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="stack-image relative h-80 tablet:h-95 overflow-clip">
                                <Image
                                    className="grayscale"
                                    src={benefits.find((item) => item.id === group.benefitIds[0])!.image}
                                    alt={`${group.title} 소개 이미지`}
                                    fill
                                    sizes="(min-width: 48rem) 35vw, 90vw"
                                />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
