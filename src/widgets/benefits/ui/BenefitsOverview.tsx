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
        <section ref={sectionRef} className="section py-30 max-site:py-18 content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]" aria-labelledby="benefits-overview-title">
            <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase" data-reveal>01 — SUPPORT FOR YOUR GROWTH</p><h2 id="benefits-overview-title" className="display-title text-[4rem] compact:text-[4rem] site:text-5xl wide:text-6xl xl:text-[8rem] 2xl:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-7 [.split-copy_&]:m-0 [.split-copy_&]:text-4xl [.split-copy_&]:compact:text-4xl [.split-copy_&]:site:text-[4.4rem] [.split-copy_&]:wide:text-[5.2rem] [.split-copy_&]:xl:text-[6.8rem] [.split-copy_&]:2xl:text-[6.8rem] [.stack-card_&]:text-3xl [.stack-card_&]:compact:text-3xl [.stack-card_&]:site:text-4xl [.stack-card_&]:wide:text-[4.4rem] [.stack-card_&]:xl:text-[5.6rem] [.stack-card_&]:2xl:text-[5.6rem] [.stack-card_&]:my-8 max-site:text-4xl max-site:compact:text-[4rem] max-site:site:text-6xl max-site:wide:text-6xl max-site:xl:text-6xl max-site:2xl:text-6xl max-site:mt-5 max-site:[.split-copy_&]:text-[4rem] max-site:[.split-copy_&]:compact:text-[4rem] max-site:[.split-copy_&]:site:text-6xl max-site:[.split-copy_&]:wide:text-6xl max-site:[.split-copy_&]:xl:text-6xl max-site:[.split-copy_&]:2xl:text-6xl max-site:[.showcase-copy_&]:text-5xl max-site:[.stack-card_&]:text-[4rem]" data-reveal>각자의 속도로.<br />함께 <span className="accent text-[var(--accent)]">성장하도록.</span></h2><div className="benefits-grid grid grid-cols-3 gap-8 mt-15 max-site:grid-cols-2 max-site:gap-[3.2rem_2rem] max-compact:grid-cols-1">{benefits.map((item, index) => <article key={item.id} className="benefit-card [&:nth-child(6n_+_1)]:col-span-2 [&:nth-child(6n_+_4)]:col-span-2 max-site:[&:nth-child(n)]:col-auto" data-reveal><div className="benefit-image relative h-80 overflow-clip max-site:h-70 max-compact:h-75"><Image src={item.image} alt={`${item.title} 소개 이미지`} fill sizes="(min-width: 900px) 50vw, 90vw" /></div><div className="benefit-copy py-6 [&_h3]:text-2xl [&_h3]:my-[0.8rem_1.2rem] [&_h3]:font-[600] [&_p]:text-base [&_p]:text-[var(--muted)]"><span className="card-number text-xs text-[var(--accent)] tracking-[round(nearest,0.12em,0.4rem)]">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
        </section>
    );
}
