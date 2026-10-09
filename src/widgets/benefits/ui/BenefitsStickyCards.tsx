"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { benefits, benefitGroups } from "@/entities/benefit/constants/benefits";
import Animation from "@/shared/utils/animation";

export function BenefitsStickyCards() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.benefits.section.stickyCards(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="section section-cream stacking-section" aria-labelledby="benefits-stack-title"><div className="content-width">
            <p className="eyebrow">02 — ALWAYS BY YOUR SIDE</p><h2 id="benefits-stack-title" className="section-title">함께할수록 더 단단하게.</h2><div className="stacking-stage">{benefitGroups.map((group, index) => <article key={group.englishTitle} className="stack-card" data-stack-card data-reveal><div><span className="eyebrow">{String(index + 1).padStart(2, "0")} — {group.englishTitle}</span><h3 className="display-title">{group.title}</h3><p className="body-copy">{group.description}</p><ul className="benefit-tags">{group.benefitIds.map((id) => <li key={id}>{benefits.find((item) => item.id === id)?.title}</li>)}</ul></div><div className="stack-image"><Image src={benefits.find((item) => item.id === group.benefitIds[0])!.image} alt={`${group.title} 소개 이미지`} fill sizes="(min-width: 900px) 35vw, 90vw" /></div></article>)}</div>
        </div></section>
    );
}
