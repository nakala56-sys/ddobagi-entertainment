"use client";

import { useEffect, useId, useRef } from "react";
import { ContactCreatorButton } from "@/features/contactCreator";
import Animation from "@/shared/utils/animation";

export function FinalCta() {
    const sectionRef = useRef<HTMLElement>(null);
    const wobbleId = useId().replace(/:/g, "");

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.finalCta(sectionRef.current);
    }, []);

    return (
        <section
            ref={sectionRef}
            data-cta-wave
            className="closing relative z-10 overflow-visible bg-black [&_h2]:text-[4.4rem] [&_h2]:compact:text-[4.4rem] [&_h2]:site:text-[6.8rem] [&_h2]:wide:text-[8.4rem] [&_h2]:xl:text-[10.8rem] [&_h2]:2xl:text-[11.2rem] [&_h2]:leading-[round(up,1.02em,0.4rem)] [&_h2]:tracking-[round(nearest,-0.055em,0.4rem)] [&_h2]:font-[550] max-site:[&_h2]:text-[4rem] max-site:[&_h2]:compact:text-5xl max-site:[&_h2]:site:text-[8rem] max-site:[&_h2]:wide:text-[8rem] max-site:[&_h2]:xl:text-[8rem] max-site:[&_h2]:2xl:text-[8rem] section-dark [--accent:#ffffff] text-[var(--paper)]"
            aria-labelledby="home-closing-title"
        >
            {/* Fixed to the viewport so parent overflow cannot clip the expanding ink. */}
            <div
                data-cta-ink
                aria-hidden="true"
                className="pointer-events-none invisible fixed inset-0 z-0 overflow-hidden motion-reduce:hidden"
            >
                <svg data-cta-svg viewBox="0 0 100 100" className="h-full w-full overflow-hidden">
                    <defs>
                        <filter data-cta-filter id={`cta-ink-wobble-${wobbleId}`} filterUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                            <feTurbulence data-cta-noise type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" result="noise" />
                            <feDisplacementMap data-cta-displacement in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                            <feGaussianBlur data-cta-blur stdDeviation="0.55" />
                        </filter>
                    </defs>
                    {/* Origin near the bottom edge — the ink rises like a wave into the white page. */}
                    <circle
                        data-cta-circle
                        cx="50"
                        cy="108"
                        r="0"
                        fill="#000000"
                        filter={`url(#cta-ink-wobble-${wobbleId})`}
                    />
                </svg>
            </div>

            <div className="sticky top-0 z-10 flex min-h-[100svh] items-center py-30 max-site:py-20 motion-reduce:static motion-reduce:min-h-[85svh]">
                <div
                    data-cta-content
                    className="closing-content relative z-10 mx-auto flex w-[min(132rem,_calc(100%_-_12rem))] max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)] flex-col items-center gap-9 text-center max-site:gap-8 content-width"
                >
                    <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">
                        06 — YOUR NEXT CHAPTER
                    </p>
                    <h2 id="home-closing-title">
                        LET’S GROW
                        <br />
                        TOGETHER.
                    </h2>
                    <p className="body-copy text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[#b5b5b5]">
                        당신의 다음 이야기를 기다립니다.
                    </p>
                    <div>
                        <ContactCreatorButton>또바기와 함께 시작하기</ContactCreatorButton>
                    </div>
                </div>
            </div>
            <div aria-hidden="true" className="h-[50svh] motion-reduce:hidden" />
        </section>
    );
}
