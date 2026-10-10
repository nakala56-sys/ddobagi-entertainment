"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { benefits } from "@/entities/benefit/constants/benefits";
import Animation from "@/shared/utils/animation";

export function BenefitsOverview() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.benefits.section.overview(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="section py-18 tablet:py-30 content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto"
            aria-labelledby="benefits-overview-title"
        >
            <p
                className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                data-reveal
            >
                01 — SUPPORT FOR YOUR GROWTH
            </p>
            <h2
                id="benefits-overview-title"
                className="display-title text-4xl tablet:text-5xl pc:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-5 tablet:mt-7"
                data-reveal
            >
                각자의 속도로.
                <br />
                함께 <span className="accent text-[var(--accent)]">성장하도록.</span>
            </h2>
            <div className="benefits-grid grid grid-cols-1 tablet:grid-cols-3 gap-[3.2rem_2rem] tablet:gap-8 mt-15">
                {benefits.map((item, index) => (
                    <article
                        key={item.id}
                        className="benefit-card [&:nth-child(6n_+_1)]:col-span-2 [&:nth-child(6n_+_4)]:col-span-2 [&:nth-child(n)]:col-auto"
                        data-reveal
                    >
                        <div className="benefit-image relative h-75 tablet:h-80 overflow-clip">
                            <Image
                                className="grayscale"
                                src={item.image}
                                alt={`${item.title} 소개 이미지`}
                                fill
                                sizes="(min-width: 48rem) 50vw, 90vw"
                            />
                        </div>
                        <div className="benefit-copy py-6">
                            <span className="card-number text-xs text-[var(--accent)] tracking-[round(nearest,0.12em,0.4rem)]">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="text-2xl my-[0.8rem_1.2rem] font-[600]">{item.title}</h3>
                            <p className="text-base text-[var(--muted)]">{item.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
