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
        <section ref={sectionRef} className="section py-30 max-site:py-18 content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)] showcase-section [&.is-pinned]:py-13 [&.is-pinned]:min-h-[100svh]" aria-labelledby="equipment-showcase-title">
            <div className="section-heading flex items-end justify-between gap-10 mb-15 [.is-horizontal_&]:mb-8 [.is-pinned_&]:mb-8 max-site:items-start max-site:flex-col max-site:gap-8 max-site:mb-10"><div><p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">01 — THE SETUP</p><h2 id="equipment-showcase-title" className="section-title text-[2.8rem] compact:text-[2.8rem] site:text-[2.8rem] wide:text-3xl xl:text-[4.4rem] 2xl:text-[4.4rem] leading-[round(up,1.25em,0.4rem)] tracking-[round(nearest,-0.04em,0.4rem)] mt-5 font-[600]">만드는 사람을 위한 준비.</h2></div><span data-counter className="slide-counter text-xs tracking-[round(nearest,0.12em,0.4rem)] whitespace-nowrap" aria-hidden="true">01 / 06</span></div>
            <div className="showcase-stage grid gap-15 [.is-pinned_&]:relative [.is-pinned_&]:h-[68svh]">{equipment.map((item, index) => <article key={item.id} className="showcase-card grid grid-cols-2 gap-15 items-center [.is-pinned_&]:absolute [.is-pinned_&]:inset-0 max-site:grid-cols-1 max-site:gap-8" data-showcase-card data-reveal><div className="showcase-image relative h-130 overflow-clip [.is-pinned_&]:h-[65svh] max-site:h-95"><Image src={item.image} alt={`${item.title} 카테고리를 소개하는 방송 환경 이미지`} fill sizes="(min-width: 900px) 50vw, 90vw" loading="eager" /></div><div className="showcase-copy"><span className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">{String(index + 1).padStart(2, "0")} — {item.englishTitle}</span><h3 className="display-title text-[4rem] compact:text-[4rem] site:text-5xl wide:text-6xl xl:text-[8rem] 2xl:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-7 [.split-copy_&]:m-0 [.split-copy_&]:text-4xl [.split-copy_&]:compact:text-4xl [.split-copy_&]:site:text-[4.4rem] [.split-copy_&]:wide:text-[5.2rem] [.split-copy_&]:xl:text-[6.8rem] [.split-copy_&]:2xl:text-[6.8rem] [.stack-card_&]:text-3xl [.stack-card_&]:compact:text-3xl [.stack-card_&]:site:text-4xl [.stack-card_&]:wide:text-[4.4rem] [.stack-card_&]:xl:text-[5.6rem] [.stack-card_&]:2xl:text-[5.6rem] [.stack-card_&]:my-8 max-site:text-4xl max-site:compact:text-[4rem] max-site:site:text-6xl max-site:wide:text-6xl max-site:xl:text-6xl max-site:2xl:text-6xl max-site:mt-5 max-site:[.split-copy_&]:text-[4rem] max-site:[.split-copy_&]:compact:text-[4rem] max-site:[.split-copy_&]:site:text-6xl max-site:[.split-copy_&]:wide:text-6xl max-site:[.split-copy_&]:xl:text-6xl max-site:[.split-copy_&]:2xl:text-6xl max-site:[.showcase-copy_&]:text-5xl max-site:[.stack-card_&]:text-[4rem]">{item.title}</h3><p className="body-copy text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)] [.section-dark_&]:text-[#b5b5b5] [.showcase-copy_&]:mt-8 [.stack-card_&]:max-w-110 [.stack-card_&]:text-[#b5b5b5] max-site:[.showcase-copy_&]:mt-5">{item.description}</p></div></article>)}</div>
        </section>
    );
}
