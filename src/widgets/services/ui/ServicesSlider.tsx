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
        <section ref={sectionRef} className="section section-dark horizontal-section" aria-labelledby="services-slider-title">
            <div className="content-width section-heading"><div><p className="eyebrow">02 — OUR SERVICES</p><h2 id="services-slider-title" className="section-title">가능성을 콘텐츠로.</h2></div><span className="slide-counter" data-counter aria-hidden="true">01 / 05</span></div>
            <div className="slider-viewport" data-viewport><div className="slider-track" data-track>{services.map((item, index) => <article key={item.id} id={`service-${item.id}`} className="service-slide" data-slide data-reveal tabIndex={0}><div className="slide-image"><Image src={item.image} alt={`${item.title}을 설명하는 회사소개서 이미지`} fill sizes="(min-width: 900px) 65vw, 90vw" data-slide-image loading="eager" /></div><div className="slide-copy"><span className="card-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></div></article>)}</div></div>
            <div className="content-width slider-progress" aria-hidden="true"><span data-slider-progress /></div>
        </section>
    );
}
