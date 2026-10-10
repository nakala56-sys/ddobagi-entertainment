"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { equipment } from "@/entities/equipment/constants/equipment";
import Animation from "@/shared/utils/animation";

export function EquipmentGrid() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.equipment.section.grid(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="section py-18 tablet:py-30 section-cream bg-[#f5f5f5]"
            aria-labelledby="equipment-grid-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto">
                <p
                    className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                    data-reveal
                >
                    02 — EQUIPMENT COLLECTION
                </p>
                <h2
                    id="equipment-grid-title"
                    className="display-title text-4xl tablet:text-5xl pc:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-5 tablet:mt-7"
                    data-reveal
                >
                    작은 디테일이
                    <br />
                    만드는 <span className="accent text-[var(--accent)]">차이.</span>
                </h2>
                <p
                    className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)]"
                    data-reveal
                >
                    방송 환경에 맞춰 장비와 세팅을 안내합니다.
                </p>
                <div className="equipment-grid grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-3 gap-[3.2rem_2rem] tablet:gap-[4rem_2.4rem] mt-15">
                    {equipment.map((item) => (
                        <article
                            key={item.id}
                            className="equipment-card"
                            data-reveal
                        >
                            <div className="equipment-image relative h-75 tablet:h-70 overflow-clip">
                                <Image
                                    className="grayscale"
                                    src={item.image}
                                    alt={`${item.title} 관련 방송 환경`}
                                    fill
                                    sizes="(min-width: 90rem) 30vw, (min-width: 48rem) 45vw, 90vw"
                                />
                            </div>
                            <div className="equipment-card-copy pt-6">
                                <span className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">{item.englishTitle}</span>
                                <h3 className="text-2xl font-[600] mt-2">{item.title}</h3>
                                <p className="mt-3 text-xs tablet:text-base text-[var(--muted)]">{item.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
