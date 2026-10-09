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
        <section ref={sectionRef} className="section section-cream" aria-labelledby="equipment-grid-title"><div className="content-width">
            <p className="eyebrow" data-reveal>02 — EQUIPMENT COLLECTION</p><h2 id="equipment-grid-title" className="display-title" data-reveal>작은 디테일이<br />만드는 <span className="accent">차이.</span></h2><p className="body-copy" data-reveal>방송 환경에 맞춰 장비와 세팅을 안내합니다.</p>
            <div className="equipment-grid">{equipment.map((item) => <article key={item.id} className="equipment-card" data-reveal><div className="equipment-image"><Image src={item.image} alt={`${item.title} 관련 방송 환경`} fill sizes="(min-width: 900px) 30vw, 90vw" /></div><div className="equipment-card-copy"><span className="eyebrow">{item.englishTitle}</span><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
        </div></section>
    );
}
