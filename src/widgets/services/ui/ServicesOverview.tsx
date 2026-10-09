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
        <section ref={sectionRef} className="section py-30 max-site:py-18 content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]" aria-labelledby="services-overview-title">
            <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase" data-reveal>01 — WHAT WE DO</p><h2 id="services-overview-title" className="display-title text-[4rem] compact:text-[4rem] site:text-5xl wide:text-6xl xl:text-[8rem] 2xl:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-7 [.split-copy_&]:m-0 [.split-copy_&]:text-4xl [.split-copy_&]:compact:text-4xl [.split-copy_&]:site:text-[4.4rem] [.split-copy_&]:wide:text-[5.2rem] [.split-copy_&]:xl:text-[6.8rem] [.split-copy_&]:2xl:text-[6.8rem] [.stack-card_&]:text-3xl [.stack-card_&]:compact:text-3xl [.stack-card_&]:site:text-4xl [.stack-card_&]:wide:text-[4.4rem] [.stack-card_&]:xl:text-[5.6rem] [.stack-card_&]:2xl:text-[5.6rem] [.stack-card_&]:my-8 max-site:text-4xl max-site:compact:text-[4rem] max-site:site:text-6xl max-site:wide:text-6xl max-site:xl:text-6xl max-site:2xl:text-6xl max-site:mt-5 max-site:[.split-copy_&]:text-[4rem] max-site:[.split-copy_&]:compact:text-[4rem] max-site:[.split-copy_&]:site:text-6xl max-site:[.split-copy_&]:wide:text-6xl max-site:[.split-copy_&]:xl:text-6xl max-site:[.split-copy_&]:2xl:text-6xl max-site:[.showcase-copy_&]:text-5xl max-site:[.stack-card_&]:text-[4rem]" data-reveal>방송의 시작부터,<br />콘텐츠의 다음까지.</h2>
            <div className="service-list mt-15 border-t-[0.4rem] border-solid border-t-[var(--line)]">{services.map((item, index) => <a key={item.id} href={`#service-${item.id}`} className="service-row relative grid [grid-template-columns:5.2rem_1fr_5.2rem] items-center gap-5 py-9 border-b-[0.4rem] border-solid border-b-[var(--line)] [&_h3]:text-[2.8rem] [&_h3]:compact:text-[2.8rem] [&_h3]:site:text-3xl [&_h3]:wide:text-4xl [&_h3]:xl:text-5xl [&_h3]:2xl:text-[5.2rem] [&_h3]:tracking-[round(nearest,-0.045em,0.4rem)] [&_h3]:font-[550] [&_p]:text-base [&_p]:text-[var(--muted)] [&_p]:mt-2 max-site:[grid-template-columns:3.2rem_1fr_3.2rem] max-site:py-6 max-site:gap-3 max-site:[&_h3]:text-2xl max-site:[&_h3]:compact:text-[2.8rem] max-site:[&_h3]:site:text-[4rem] max-site:[&_h3]:wide:text-[4rem] max-site:[&_h3]:xl:text-[4rem] max-site:[&_h3]:2xl:text-[4rem]" data-service-row data-reveal><span className="card-number text-xs text-[var(--accent)] tracking-[round(nearest,0.12em,0.4rem)]">{String(index + 1).padStart(2, "0")}</span><div><h3>{item.englishTitle}</h3><p>{item.title}</p></div><span className="row-arrow text-3xl text-right" aria-hidden="true">↗</span><div className="service-preview invisible absolute -top-8 left-[68%] w-70 h-55 pointer-events-none z-[2] overflow-clip max-site:hidden" data-preview><Image src={item.image} alt="" fill sizes="280px" /></div></a>)}</div>
        </section>
    );
}
