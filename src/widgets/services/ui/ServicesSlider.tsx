"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { services } from "@/entities/service/constants/services";
import Animation from "@/shared/utils/animation";

export function ServicesSlider() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.services.section.slider(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="section py-18 tablet:py-30 section-dark [--accent:#ffffff] text-[var(--paper)] bg-[#000000] horizontal-section overflow-clip data-[horizontal=true]:py-13 data-[horizontal=true]:min-h-[100svh]"
            aria-labelledby="services-slider-title"
        >
            <div
                data-horizontal-target
                data-pinned-target
                className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto section-heading flex items-start tablet:items-end justify-between gap-8 tablet:gap-10 mb-10 tablet:mb-15 data-[horizontal=true]:mb-8 data-[pinned=true]:mb-8 flex-col tablet:flex-row"
            >
                <div>
                    <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">02 — OUR SERVICES</p>
                    <h2
                        id="services-slider-title"
                        className="section-title text-[2.8rem] pc:text-[4.4rem] leading-[round(up,1.25em,0.4rem)] tracking-[round(nearest,-0.04em,0.4rem)] mt-5 font-[600]"
                    >
                        가능성을 콘텐츠로.
                    </h2>
                </div>
                <span
                    className="slide-counter text-xs tracking-[round(nearest,0.12em,0.4rem)] whitespace-nowrap"
                    data-counter
                    aria-hidden="true"
                >
                    01 / 05
                </span>
            </div>
            <div
                className="slider-viewport w-full"
                data-viewport
            >
                <div
                    data-horizontal-target
                    className="slider-track grid gap-13 w-[calc(100%_-_4rem)] tablet:w-[min(132rem,_calc(100%_-_12rem))] mx-auto data-[horizontal=true]:flex data-[horizontal=true]:w-max data-[horizontal=true]:gap-10 data-[horizontal=true]:m-0 data-[horizontal=true]:px-[max(6rem,_calc((100vw_-_132rem)_/_2))]"
                    data-track
                >
                    {services.map((item, index) => (
                        <article
                            data-horizontal-target
                            key={item.id}
                            id={`service-${item.id}`}
                            className="service-slide min-w-0 scroll-mt-25 data-[horizontal=true]:w-[65vw] data-[horizontal=true]:shrink-0"
                            data-slide
                            data-reveal
                            tabIndex={0}
                        >
                            <div
                                data-horizontal-target
                                className="slide-image relative h-75 tablet:h-100 overflow-clip data-[horizontal=true]:h-[48svh]"
                            >
                                <Image
                                    className="grayscale"
                                    src={item.image}
                                    alt={`${item.title}을 설명하는 회사소개서 이미지`}
                                    fill
                                    sizes="(min-width: 48rem) 65vw, 90vw"
                                    data-slide-image
                                    loading="eager"
                                />
                            </div>
                            <div className="slide-copy flex items-start gap-5 tablet:gap-8 pt-6">
                                <span className="card-number text-xs text-[var(--accent)] tracking-[round(nearest,0.12em,0.4rem)]">{String(index + 1).padStart(2, "0")}</span>
                                <div>
                                    <h3 className="text-2xl tablet:text-[2.8rem] tracking-[round(nearest,-0.04em,0.4rem)] font-[600]">{item.title}</h3>
                                    <p className="max-w-150 text-[#b5b5b5] text-base mt-3">{item.description}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <div
                data-horizontal-target
                className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto slider-progress hidden h-1 bg-[#ffffff30] mt-10 data-[horizontal=true]:block"
                aria-hidden="true"
            >
                <span
                    className="block h-full bg-[var(--accent)] scale-x-0 origin-left"
                    data-slider-progress
                />
            </div>
        </section>
    );
}
