"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { benefitDetails } from "@/entities/benefit/constants/benefits";
import Animation from "@/shared/utils/animation";

export function BenefitsOverview() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.benefits.section.overview(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            data-report-id="benefits-overview"
            data-report-type="group"
            className="section py-[7.2rem] tablet:py-[12rem] content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto"
            aria-labelledby="benefits-overview-title"
        >
            <h2
                id="benefits-overview-title"
                className="display-title text-[3rem] tablet:text-[4.8rem] pc:text-[5.8rem] font-[580] break-keep"
                data-reveal
            >
                크리에이터를 위한
                <br />
                <span className="accent text-[var(--accent,#000000)]">일곱 가지 지원.</span>
            </h2>
            <div className="mt-[4.8rem] tablet:mt-[6.4rem] border-t-[0.1rem] border-solid border-[var(--color-line)]">
                {benefitDetails.map((item, index) => (
                    <article
                        key={item.id}
                        data-report-id={`benefit-${item.id}`}
                        data-report-type="item"
                        className="grid grid-cols-1 items-center gap-[2rem] border-b-[0.1rem] border-solid border-[var(--color-line)] py-[2.8rem] tablet:grid-cols-[minmax(28rem,42rem)_1fr] tablet:gap-[4.8rem] tablet:py-[3.6rem] pc:grid-cols-[48rem_1fr] pc:gap-[6.4rem]"
                        data-reveal
                    >
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                                src={item.image}
                                alt={`${item.title} 소개 이미지`}
                                fill
                                unoptimized
                                sizes="(min-width: 90rem) 480px, (min-width: 48rem) 420px, 100vw"
                                className="object-cover object-center"
                            />
                        </div>
                        <div className="min-w-0">
                            <span className="card-number text-[1.4rem] leading-[1] text-[var(--accent,#000000)]">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="mt-[1.2rem] text-[2.4rem] font-[600] leading-[1.5] break-keep tablet:text-[2.8rem] pc:text-[3.2rem]">{item.title}</h3>
                            <p className="mt-[1.2rem] max-w-[64rem] text-[1.6rem] leading-[1.6] text-[#737373] break-keep">{item.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
