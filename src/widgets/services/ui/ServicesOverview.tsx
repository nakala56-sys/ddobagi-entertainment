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
        <section ref={sectionRef} className="section content-width" aria-labelledby="services-overview-title">
            <p className="eyebrow" data-reveal>01 — WHAT WE DO</p><h2 id="services-overview-title" className="display-title" data-reveal>방송의 시작부터,<br />콘텐츠의 다음까지.</h2>
            <div className="service-list">{services.map((item, index) => <a key={item.id} href={`#service-${item.id}`} className="service-row" data-service-row data-reveal><span className="card-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{item.englishTitle}</h3><p>{item.title}</p></div><span className="row-arrow" aria-hidden="true">↗</span><div className="service-preview" data-preview><Image src={item.image} alt="" fill sizes="280px" /></div></a>)}</div>
        </section>
    );
}
