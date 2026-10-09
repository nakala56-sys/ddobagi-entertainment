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
        <section ref={sectionRef} className="section py-30 max-site:py-18 section-dark [--accent:#ffffff] text-[var(--paper)] bg-[#000000] horizontal-section overflow-clip [&.is-horizontal]:py-13 [&.is-horizontal]:min-h-[100svh]" aria-labelledby="services-slider-title">
            <div className="content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)] section-heading flex items-end justify-between gap-10 mb-15 [.is-horizontal_&]:mb-8 [.is-pinned_&]:mb-8 max-site:items-start max-site:flex-col max-site:gap-8 max-site:mb-10"><div><p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">02 — OUR SERVICES</p><h2 id="services-slider-title" className="section-title text-[2.8rem] compact:text-[2.8rem] site:text-[2.8rem] wide:text-3xl xl:text-[4.4rem] 2xl:text-[4.4rem] leading-[round(up,1.25em,0.4rem)] tracking-[round(nearest,-0.04em,0.4rem)] mt-5 font-[600]">가능성을 콘텐츠로.</h2></div><span className="slide-counter text-xs tracking-[round(nearest,0.12em,0.4rem)] whitespace-nowrap" data-counter aria-hidden="true">01 / 05</span></div>
            <div className="slider-viewport w-full" data-viewport><div className="slider-track grid gap-13 w-[min(132rem,_calc(100%_-_12rem))] mx-auto [.is-horizontal_&]:flex [.is-horizontal_&]:w-max [.is-horizontal_&]:gap-10 [.is-horizontal_&]:m-0 [.is-horizontal_&]:px-[max(6rem,_calc((100vw_-_132rem)_/_2))] max-site:w-[calc(100%_-_4rem)] max-site:gap-13" data-track>{services.map((item, index) => <article key={item.id} id={`service-${item.id}`} className="service-slide min-w-0 scroll-mt-25 [.is-horizontal_&]:w-[65vw] [.is-horizontal_&]:shrink-0" data-slide data-reveal tabIndex={0}><div className="slide-image relative h-100 overflow-clip [.is-horizontal_&]:h-[48svh] max-site:h-90 max-compact:h-75"><Image src={item.image} alt={`${item.title}을 설명하는 회사소개서 이미지`} fill sizes="(min-width: 900px) 65vw, 90vw" data-slide-image loading="eager" /></div><div className="slide-copy flex items-start gap-8 pt-6 [&_h3]:text-[2.8rem] [&_h3]:tracking-[round(nearest,-0.04em,0.4rem)] [&_h3]:font-[600] [&_p]:max-w-150 [&_p]:text-[#b5b5b5] [&_p]:text-base [&_p]:mt-3 max-site:gap-5 max-site:[&_h3]:text-2xl"><span className="card-number text-xs text-[var(--accent)] tracking-[round(nearest,0.12em,0.4rem)]">{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></div></article>)}</div></div>
            <div className="content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)] slider-progress hidden h-1 bg-[#ffffff30] mt-10 [&_span]:block [&_span]:h-full [&_span]:bg-[var(--accent)] [&_span]:scale-x-0 [&_span]:origin-left [.is-horizontal_&]:block" aria-hidden="true"><span data-slider-progress /></div>
        </section>
    );
}
