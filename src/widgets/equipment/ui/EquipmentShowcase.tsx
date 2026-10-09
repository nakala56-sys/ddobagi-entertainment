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
        <section ref={sectionRef} className="section content-width showcase-section" aria-labelledby="equipment-showcase-title">
            <div className="section-heading"><div><p className="eyebrow">01 — THE SETUP</p><h2 id="equipment-showcase-title" className="section-title">만드는 사람을 위한 준비.</h2></div><span data-counter className="slide-counter" aria-hidden="true">01 / 06</span></div>
            <div className="showcase-stage">{equipment.map((item, index) => <article key={item.id} className="showcase-card" data-showcase-card data-reveal><div className="showcase-image"><Image src={item.image} alt={`${item.title} 카테고리를 소개하는 방송 환경 이미지`} fill sizes="(min-width: 900px) 50vw, 90vw" loading="eager" /></div><div className="showcase-copy"><span className="eyebrow">{String(index + 1).padStart(2, "0")} — {item.englishTitle}</span><h3 className="display-title">{item.title}</h3><p className="body-copy">{item.description}</p></div></article>)}</div>
        </section>
    );
}
