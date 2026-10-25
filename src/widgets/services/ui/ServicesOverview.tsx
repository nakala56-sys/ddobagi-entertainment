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
        <section
            ref={sectionRef}
            className="section overflow-x-clip py-[7.2rem] tablet:py-[12rem] content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto"
            aria-labelledby="services-overview-title"
        >
            <div className="service-list mt-[6rem]">
                {services.map((item, index) => (
                    <article
                        key={item.id}
                        id={`service-${item.id}`}
                        className="service-row relative grid [grid-template-columns:3.2rem_1fr] tablet:[grid-template-columns:5.2rem_1fr] items-start gap-[1.2rem] tablet:gap-[2rem] py-[2.4rem] tablet:py-[3.6rem] border-b-[0.1rem] border-solid border-b-[var(--color-line)]"
                        data-service-row
                        data-reveal
                    >
                        <span className="card-number text-[1.8rem] text-[var(--accent,#000000)]">{String(index + 1).padStart(2, "0")}</span>
                        <div>
                            <p className="eyebrow text-[1.8rem] text-[#737373] uppercase">{item.englishTitle}</p>
                            <h3 className="mt-[1.2rem] text-[2.4rem] tablet:text-[3rem] pc:text-[4.2rem] font-[500] break-keep">{item.title}</h3>
                            <p className="mt-[1.6rem] max-w-[88rem] text-[1.6rem] leading-[1.5] text-[#737373] break-keep">{item.description}</p>
                        </div>
                        <div
                            className="service-preview invisible absolute -top-[3.2rem] left-[68%] w-[28rem] h-[22rem] pointer-events-none z-[2] overflow-clip hidden tablet:block"
                            data-preview
                        >
                            <Image
                                src={item.image}
                                alt=""
                                fill
                                unoptimized
                                sizes="280px"
                                className="object-cover object-center"
                            />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
