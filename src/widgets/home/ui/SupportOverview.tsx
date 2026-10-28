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
        <section
            ref={sectionRef}
            data-report-id="home-support"
            data-report-type="group"
            data-gallery-cover-anchor
            className="section py-[7.2rem] tablet:py-[12rem] section-cream bg-[var(--color-background)] data-[gallery-cover=true]:relative data-[gallery-cover=true]:z-20 data-[gallery-cover=true]:min-h-svh"
            aria-labelledby="home-support-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto">
                <div
                    data-horizontal-target
                    data-pinned-target
                    className="section-heading flex items-start tablet:items-end justify-between gap-[3.2rem] tablet:gap-[4rem] mb-[4rem] tablet:mb-[6rem] data-[horizontal=true]:mb-[3.2rem] data-[pinned=true]:mb-[3.2rem] flex-col tablet:flex-row"
                >
                    <div>
                        <h2
                            id="home-support-title"
                            className="display-title text-[3rem] tablet:text-[4.8rem] pc:text-[5.8rem] font-[580] break-keep"
                            data-title-rise
                        >
                            방송 준비부터 운영까지,
                            <br />
                            체계적으로 지원합니다.
                        </h2>
                    </div>
                    <Link
                        className="text-[inherit] inline-flex gap-[3.2rem] items-center font-[650] text-[1.6rem] py-[1.2rem] bg-transparent leading-[1.0]"
                        href="/benefits"
                        data-reveal
                    >
                        지원 혜택 보기 ↗
                    </Link>
                </div>
                <div className="support-grid grid grid-cols-1 tablet:grid-cols-3">
                    {benefits.map((item, index) => (
                        <article
                            key={item.id}
                            className="support-card relative p-[2rem] tablet:p-[3.6rem] min-h-[20rem] tablet:min-h-[27.2rem]"
                            data-reveal
                        >
                            <span className="card-number text-[1.2rem] text-[var(--accent,#000000)] leading-[1.0]">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="mt-[2rem] tablet:mt-[3.2rem] text-[1.8rem] tablet:text-[2.4rem] font-[600] leading-[1.0] tablet:leading-[1.5] pc:leading-[1.0]">{item.title}</h3>
                            <p className="text-[1.4rem] tablet:text-[1.6rem] text-[#737373] mt-[1.6rem] leading-[1.5] pr-[1.6rem] p-0">{item.description}</p>
                            <span
                                className="card-mark absolute right-[2rem] tablet:right-[3.2rem] top-[1.6rem] tablet:top-[3.2rem] text-[var(--accent,#000000)] text-[1.8rem] leading-[1.0]"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
