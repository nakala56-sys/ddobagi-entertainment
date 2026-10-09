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
        <section ref={sectionRef} className="section py-30 max-site:py-18 section-cream bg-[#f5f5f5]" aria-labelledby="equipment-grid-title"><div className="content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]">
            <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase" data-reveal>02 — EQUIPMENT COLLECTION</p><h2 id="equipment-grid-title" className="display-title text-[4rem] compact:text-[4rem] site:text-5xl wide:text-6xl xl:text-[8rem] 2xl:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-7 [.split-copy_&]:m-0 [.split-copy_&]:text-4xl [.split-copy_&]:compact:text-4xl [.split-copy_&]:site:text-[4.4rem] [.split-copy_&]:wide:text-[5.2rem] [.split-copy_&]:xl:text-[6.8rem] [.split-copy_&]:2xl:text-[6.8rem] [.stack-card_&]:text-3xl [.stack-card_&]:compact:text-3xl [.stack-card_&]:site:text-4xl [.stack-card_&]:wide:text-[4.4rem] [.stack-card_&]:xl:text-[5.6rem] [.stack-card_&]:2xl:text-[5.6rem] [.stack-card_&]:my-8 max-site:text-4xl max-site:compact:text-[4rem] max-site:site:text-6xl max-site:wide:text-6xl max-site:xl:text-6xl max-site:2xl:text-6xl max-site:mt-5 max-site:[.split-copy_&]:text-[4rem] max-site:[.split-copy_&]:compact:text-[4rem] max-site:[.split-copy_&]:site:text-6xl max-site:[.split-copy_&]:wide:text-6xl max-site:[.split-copy_&]:xl:text-6xl max-site:[.split-copy_&]:2xl:text-6xl max-site:[.showcase-copy_&]:text-5xl max-site:[.stack-card_&]:text-[4rem]" data-reveal>작은 디테일이<br />만드는 <span className="accent text-[var(--accent)]">차이.</span></h2><p className="body-copy text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)] [.section-dark_&]:text-[#b5b5b5] [.showcase-copy_&]:mt-8 [.stack-card_&]:max-w-110 [.stack-card_&]:text-[#b5b5b5] max-site:[.showcase-copy_&]:mt-5" data-reveal>방송 환경에 맞춰 장비와 세팅을 안내합니다.</p>
            <div className="equipment-grid grid grid-cols-3 gap-[4rem_2.4rem] mt-15 max-site:grid-cols-2 max-site:gap-[3.2rem_2rem] max-compact:grid-cols-1">{equipment.map((item) => <article key={item.id} className="equipment-card" data-reveal><div className="equipment-image relative h-70 overflow-clip max-site:h-60 max-compact:h-75"><Image src={item.image} alt={`${item.title} 관련 방송 환경`} fill sizes="(min-width: 900px) 30vw, 90vw" /></div><div className="equipment-card-copy pt-6 [&_h3]:text-2xl [&_h3]:font-[600] [&_h3]:mt-2 [&_p]:mt-3 [&_p]:text-base [&_p]:text-[var(--muted)] max-site:[&_p]:text-xs"><span className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">{item.englishTitle}</span><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
        </div></section>
    );
}
