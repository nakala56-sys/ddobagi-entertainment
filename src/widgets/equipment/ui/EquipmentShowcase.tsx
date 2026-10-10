"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { equipment } from "@/entities/equipment/constants/equipment";
import Animation from "@/shared/utils/animation";

export function EquipmentShowcase() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.equipment.section.showcase(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="section py-18 tablet:py-30 content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto showcase-section data-[pinned=true]:py-13 data-[pinned=true]:min-h-[100svh]"
            aria-labelledby="equipment-showcase-title"
        >
            <div
                data-horizontal-target
                data-pinned-target
                className="section-heading flex items-start tablet:items-end justify-between gap-8 tablet:gap-10 mb-10 tablet:mb-15 data-[horizontal=true]:mb-8 data-[pinned=true]:mb-8 flex-col tablet:flex-row"
            >
                <div>
                    <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">01 — THE SETUP</p>
                    <h2
                        id="equipment-showcase-title"
                        className="section-title text-[2.8rem] pc:text-[4.4rem] leading-[round(up,1.25em,0.4rem)] tracking-[round(nearest,-0.04em,0.4rem)] mt-5 font-[600]"
                    >
                        만드는 사람을 위한 준비.
                    </h2>
                </div>
                <span
                    data-counter
                    className="slide-counter text-xs tracking-[round(nearest,0.12em,0.4rem)] whitespace-nowrap"
                    aria-hidden="true"
                >
                    01 / 06
                </span>
            </div>
            <div
                data-pinned-target
                className="showcase-stage grid gap-15 data-[pinned=true]:relative data-[pinned=true]:h-[68svh]"
            >
                {equipment.map((item, index) => (
                    <article
                        data-pinned-target
                        key={item.id}
                        className="showcase-card grid grid-cols-1 tablet:grid-cols-2 gap-8 tablet:gap-15 items-center data-[pinned=true]:absolute data-[pinned=true]:inset-0"
                        data-showcase-card
                        data-reveal
                    >
                        <div
                            data-pinned-target
                            className="showcase-image relative h-95 tablet:h-130 overflow-clip data-[pinned=true]:h-[65svh]"
                        >
                            <Image
                                className="grayscale"
                                src={item.image}
                                alt={`${item.title} 카테고리를 소개하는 방송 환경 이미지`}
                                fill
                                sizes="(min-width: 48rem) 50vw, 90vw"
                                loading="eager"
                            />
                        </div>
                        <div className="showcase-copy">
                            <span className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">
                                {String(index + 1).padStart(2, "0")} — {item.englishTitle}
                            </span>
                            <h3 className="display-title text-5xl pc:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-5 tablet:mt-7">
                                {item.title}
                            </h3>
                            <p className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)] mt-5 tablet:mt-8">{item.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
