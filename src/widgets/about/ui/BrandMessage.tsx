"use client";

import { useEffect, useRef } from "react";

import Animation from "@/shared/utils/animation";

export function BrandMessage() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.about.section.brandMessage(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="brand-message min-h-[100svh] flex items-center py-20 [&_h2]:my-10 [&_h2]:text-6xl [&_h2]:compact:text-6xl [&_h2]:site:text-[8rem] [&_h2]:wide:text-[10rem] [&_h2]:xl:text-9xl [&_h2]:2xl:text-[13.2rem] [&_h2]:leading-[round(up,1.18em,0.4rem)] [&_h2]:font-[550] [&_h2]:tracking-[round(nearest,-0.075em,0.4rem)] [&_h2_span]:block max-site:min-h-[85svh] max-site:[&_h2]:text-[8rem] max-compact:[&_h2]:text-[6.8rem] section-dark [--accent:#ffffff] text-[var(--paper)] bg-[#000000]" aria-labelledby="brand-message-title"><div className="content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]">
            <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">02 — THE TOBBAGI WAY</p><h2 id="brand-message-title"><span data-word data-reveal>꾸준히.</span><span data-word data-reveal>한결같이.</span><span className="accent text-[var(--accent)]" data-word data-reveal>함께.</span></h2><p className="body-copy text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)] [.section-dark_&]:text-[#b5b5b5] [.showcase-copy_&]:mt-8 [.stack-card_&]:max-w-110 [.stack-card_&]:text-[#b5b5b5] max-site:[.showcase-copy_&]:mt-5">Consistently. Sincerely. Together.<br />각자의 장점이 자연스럽게 빛날 수 있도록.</p>
        </div></section>
    );
}
