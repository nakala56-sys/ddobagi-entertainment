"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { benefits } from "@/entities/benefit/constants/benefits";
import Animation from "@/shared/utils/animation";

export function SupportOverview() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.supportOverview(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="section section-cream" aria-labelledby="home-support-title"><div className="content-width">
            <div className="section-heading"><div><p className="eyebrow" data-reveal>03 — SUPPORT SYSTEM</p><h2 id="home-support-title" className="display-title" data-reveal>혼자보다,<br />함께 더 멀리.</h2></div><Link className="text-link" href="/benefits" data-reveal>지원 혜택 보기 ↗</Link></div>
            <div className="support-grid">{benefits.map((item, index) => <article key={item.id} className="support-card" data-reveal><span className="card-number">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p><span className="card-mark" aria-hidden="true">↗</span></article>)}</div>
        </div></section>
    );
}
