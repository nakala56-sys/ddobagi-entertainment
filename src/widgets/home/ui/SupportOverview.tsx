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
            data-gallery-cover-anchor
            className="section py-18 tablet:py-30 section-cream bg-[#f5f5f5] data-[gallery-cover=true]:relative data-[gallery-cover=true]:z-20 data-[gallery-cover=true]:min-h-svh"
            aria-labelledby="home-support-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto">
                <div
                    data-horizontal-target
                    data-pinned-target
                    className="section-heading flex items-start tablet:items-end justify-between gap-8 tablet:gap-10 mb-10 tablet:mb-15 data-[horizontal=true]:mb-8 data-[pinned=true]:mb-8 flex-col tablet:flex-row"
                >
                    <div>
                        <p
                            className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                            data-reveal
                        >
                            03 — SUPPORT SYSTEM
                        </p>
                        <h2
                            id="home-support-title"
                            className="display-title text-4xl tablet:text-5xl pc:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-5 tablet:mt-7"
                            data-reveal
                        >
                            혼자보다,
                            <br />
                            함께 더 멀리.
                        </h2>
                    </div>
                    <Link
                        className="text-[inherit] inline-flex gap-8 items-center font-[650] text-base py-3 bg-transparent"
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
                            className="support-card relative p-5 tablet:p-9 min-h-50 tablet:min-h-68"
                            data-reveal
                        >
                            <span className="card-number text-xs text-[var(--accent)] tracking-[round(nearest,0.12em,0.4rem)]">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="mt-5 tablet:mt-8 text-lg tablet:text-2xl font-[600] tracking-[round(nearest,-0.04em,0.4rem)]">{item.title}</h3>
                            <p className="text-xs tablet:text-base text-[var(--muted)] mt-4 leading-[round(up,1.8em,0.4rem)] pr-4 p-0">{item.description}</p>
                            <span
                                className="card-mark absolute right-5 tablet:right-8 top-4 tablet:top-8 text-[var(--accent)] text-lg"
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
