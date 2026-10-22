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
            className="section py-[7.2rem] tablet:py-[12rem] content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto"
            aria-labelledby="benefits-overview-title"
        >
            <h2
                id="benefits-overview-title"
                className="display-title text-[3.6rem] tablet:text-[4.8rem] pc:text-[8rem] font-[580]"
                data-reveal
            >
                크리에이터를 위한
                <br />
                <span className="accent text-[var(--accent,#000000)]">일곱 가지 지원.</span>
            </h2>
            <div className="benefits-grid grid grid-cols-1 tablet:grid-cols-3 gap-[3.2rem_2rem] tablet:gap-[3.2rem] mt-[6rem]">
                {benefitDetails.map((item, index) => (
                    <article
                        key={item.id}
                        className="benefit-card [&:nth-child(6n_+_1)]:col-span-2 [&:nth-child(6n_+_4)]:col-span-2 [&:nth-child(n)]:col-auto"
                        data-reveal
                    >
                        <div className="benefit-image relative h-[30rem] tablet:h-[32rem] overflow-clip">
                            <Image
                                className="grayscale"
                                src={item.image}
                                alt={`${item.title} 소개 이미지`}
                                fill
                                sizes="(min-width: 48rem) 50vw, 90vw"
                            />
                        </div>
                        <div className="benefit-copy py-[2.4rem]">
                            <span className="card-number text-[1.2rem] text-[var(--accent,#000000)] leading-[1.0]">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="text-[2.4rem] my-[0.8rem_1.2rem] font-[600] leading-[1.5]">{item.title}</h3>
                            <p className="text-[1.6rem] text-[#737373] leading-[1.5]">{item.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
