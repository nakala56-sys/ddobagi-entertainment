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
        <section
            ref={sectionRef}
            className="brand-message min-h-[85svh] tablet:min-h-[100svh] flex items-center py-20 section-dark [--accent:#ffffff] text-[var(--paper)] bg-[#000000]"
            aria-labelledby="brand-message-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto">
                <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">02 — THE TOBBAGI WAY</p>
                <h2
                    className="my-10 text-[6.8rem] tablet:text-[8rem] pc:text-[13.2rem] leading-[round(up,1.18em,0.4rem)] font-[550] tracking-[round(nearest,-0.075em,0.4rem)]"
                    id="brand-message-title"
                >
                    <span
                        className="block"
                        data-word
                        data-reveal
                    >
                        꾸준히.
                    </span>
                    <span
                        className="block"
                        data-word
                        data-reveal
                    >
                        한결같이.
                    </span>
                    <span
                        className="accent text-[var(--accent)] block"
                        data-word
                        data-reveal
                    >
                        함께.
                    </span>
                </h2>
                <p className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[#b5b5b5]">
                    Consistently. Sincerely. Together.
                    <br />
                    각자의 장점이 자연스럽게 빛날 수 있도록.
                </p>
            </div>
        </section>
    );
}
