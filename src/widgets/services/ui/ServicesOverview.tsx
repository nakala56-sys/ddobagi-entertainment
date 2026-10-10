"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { services } from "@/entities/service/constants/services";
import Animation from "@/shared/utils/animation";

export function ServicesOverview() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.services.section.overview(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="section overflow-x-clip py-18 tablet:py-30 content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto"
            aria-labelledby="services-overview-title"
        >
            <p
                className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                data-reveal
            >
                01 — WHAT WE DO
            </p>
            <h2
                id="services-overview-title"
                className="display-title text-4xl tablet:text-5xl pc:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-5 tablet:mt-7"
                data-reveal
            >
                방송의 시작부터,
                <br />
                콘텐츠의 다음까지.
            </h2>
            <div className="service-list mt-15 border-t-[0.4rem] border-solid border-t-[var(--line)]">
                {services.map((item, index) => (
                    <a
                        key={item.id}
                        href={`#service-${item.id}`}
                        className="service-row relative grid [grid-template-columns:3.2rem_1fr_3.2rem] tablet:[grid-template-columns:5.2rem_1fr_5.2rem] items-center gap-3 tablet:gap-5 py-6 tablet:py-9 border-b-[0.4rem] border-solid border-b-[var(--line)]"
                        data-service-row
                        data-reveal
                    >
                        <span className="card-number text-xs text-[var(--accent)] tracking-[round(nearest,0.12em,0.4rem)]">{String(index + 1).padStart(2, "0")}</span>
                        <div>
                            <h3 className="text-2xl tablet:text-3xl pc:text-[5.2rem] tracking-[round(nearest,-0.045em,0.4rem)] font-[550]">{item.englishTitle}</h3>
                            <p className="text-base text-[var(--muted)] mt-2">{item.title}</p>
                        </div>
                        <span
                            className="row-arrow text-3xl text-right"
                            aria-hidden="true"
                        >
                            ↗
                        </span>
                        <div
                            className="service-preview invisible absolute -top-8 left-[68%] w-70 h-55 pointer-events-none z-[2] overflow-clip hidden tablet:block"
                            data-preview
                        >
                            <Image
                                className="grayscale"
                                src={item.image}
                                alt=""
                                fill
                                sizes="280px"
                            />
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
