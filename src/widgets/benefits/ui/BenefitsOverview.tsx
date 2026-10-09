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
        <section ref={sectionRef} className="section content-width" aria-labelledby="benefits-overview-title">
            <p className="eyebrow" data-reveal>01 — SUPPORT FOR YOUR GROWTH</p><h2 id="benefits-overview-title" className="display-title" data-reveal>각자의 속도로.<br />함께 <span className="accent">성장하도록.</span></h2><div className="benefits-grid">{benefits.map((item, index) => <article key={item.id} className="benefit-card" data-reveal><div className="benefit-image"><Image src={item.image} alt={`${item.title} 소개 이미지`} fill sizes="(min-width: 900px) 50vw, 90vw" /></div><div className="benefit-copy"><span className="card-number">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
        </section>
    );
}
