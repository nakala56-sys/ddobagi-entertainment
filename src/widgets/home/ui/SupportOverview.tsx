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
            data-gallery-cover
            className="section py-30 max-site:py-18 section-cream bg-[#f5f5f5] [&.is-gallery-cover]:relative [&.is-gallery-cover]:z-20 [&.is-gallery-cover]:min-h-svh"
            aria-labelledby="home-support-title"
        >
            <div className="content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]">
                <div className="section-heading flex items-end justify-between gap-10 mb-15 [.is-horizontal_&]:mb-8 [.is-pinned_&]:mb-8 max-site:items-start max-site:flex-col max-site:gap-8 max-site:mb-10">
                    <div>
                        <p
                            className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                            data-reveal
                        >
                            03 — SUPPORT SYSTEM
                        </p>
                        <h2
                            id="home-support-title"
                            className="display-title text-[4rem] compact:text-[4rem] site:text-5xl wide:text-6xl xl:text-[8rem] 2xl:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-7 [.split-copy_&]:m-0 [.split-copy_&]:text-4xl [.split-copy_&]:compact:text-4xl [.split-copy_&]:site:text-[4.4rem] [.split-copy_&]:wide:text-[5.2rem] [.split-copy_&]:xl:text-[6.8rem] [.split-copy_&]:2xl:text-[6.8rem] [.stack-card_&]:text-3xl [.stack-card_&]:compact:text-3xl [.stack-card_&]:site:text-4xl [.stack-card_&]:wide:text-[4.4rem] [.stack-card_&]:xl:text-[5.6rem] [.stack-card_&]:2xl:text-[5.6rem] [.stack-card_&]:my-8 max-site:text-4xl max-site:compact:text-[4rem] max-site:site:text-6xl max-site:wide:text-6xl max-site:xl:text-6xl max-site:2xl:text-6xl max-site:mt-5 max-site:[.split-copy_&]:text-[4rem] max-site:[.split-copy_&]:compact:text-[4rem] max-site:[.split-copy_&]:site:text-6xl max-site:[.split-copy_&]:wide:text-6xl max-site:[.split-copy_&]:xl:text-6xl max-site:[.split-copy_&]:2xl:text-6xl max-site:[.showcase-copy_&]:text-5xl max-site:[.stack-card_&]:text-[4rem]"
                            data-reveal
                        >
                            혼자보다,
                            <br />
                            함께 더 멀리.
                        </h2>
                    </div>
                    <Link
                        className="text-link inline-flex gap-8 items-center font-[650] text-base py-3 bg-transparent text-[inherit]"
                        href="/benefits"
                        data-reveal
                    >
                        지원 혜택 보기 ↗
                    </Link>
                </div>
                <div className="support-grid grid grid-cols-3 max-site:grid-cols-2 max-compact:grid-cols-1">
                    {benefits.map((item, index) => (
                        <article
                            key={item.id}
                            className="support-card relative p-9 min-h-68 [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-[600] [&_h3]:tracking-[round(nearest,-0.04em,0.4rem)] [&_p]:text-base [&_p]:text-[var(--muted)] [&_p]:mt-4 [&_p]:leading-[round(up,1.8em,0.4rem)] [&_p]:pr-4 max-site:p-5 max-site:min-h-68 max-site:[&_h3]:text-lg max-site:[&_p]:text-xs max-site:[&_p]:p-0 max-compact:min-h-50 max-compact:[&_h3]:mt-5"
                            data-reveal
                        >
                            <span className="card-number text-xs text-[var(--accent)] tracking-[round(nearest,0.12em,0.4rem)]">{String(index + 1).padStart(2, "0")}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <span
                                className="card-mark absolute right-8 top-8 text-[var(--accent)] text-lg max-site:right-5 max-site:top-4"
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
