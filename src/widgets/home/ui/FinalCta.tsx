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
            className="closing relative z-10 overflow-visible bg-white motion-reduce:bg-black section-dark [--accent:#ffffff] text-[var(--paper)]"
            aria-labelledby="home-closing-title"
        >
            {/* Fixed to the viewport so parent overflow cannot clip the expanding ink. */}
            <div
                data-cta-ink
                aria-hidden="true"
                className="pointer-events-none invisible fixed inset-0 z-0 overflow-hidden motion-reduce:hidden"
            >
                <svg
                    data-cta-svg
                    viewBox="0 0 100 100"
                    className="h-full w-full overflow-hidden"
                >
                    <defs>
                        <filter
                            data-cta-filter
                            id={`cta-ink-wobble-${wobbleId}`}
                            filterUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                        >
                            <feTurbulence
                                data-cta-noise
                                type="fractalNoise"
                                baseFrequency="0.02"
                                numOctaves="2"
                                seed="7"
                                result="noise"
                            />
                            <feDisplacementMap
                                data-cta-displacement
                                in="SourceGraphic"
                                in2="noise"
                                scale="3.2"
                                xChannelSelector="R"
                                yChannelSelector="G"
                            />
                            <feGaussianBlur
                                data-cta-blur
                                stdDeviation="0.55"
                            />
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

            <div className="relative z-10 flex min-h-[100svh] items-center py-20 tablet:py-30 mix-blend-difference motion-reduce:mix-blend-normal motion-reduce:min-h-[85svh]">
                <div
                    data-cta-content
                    className="closing-content relative z-10 mx-auto flex w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] flex-col items-center gap-8 tablet:gap-9 text-center content-width"
                >
                    <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">06 — YOUR NEXT CHAPTER</p>
                    <h2
                        className="text-[4rem] tablet:text-[6.8rem] pc:text-[11.2rem] leading-[round(up,1.02em,0.4rem)] tracking-[round(nearest,-0.055em,0.4rem)] font-[550]"
                        id="home-closing-title"
                    >
                        LET’S GROW
                        <br />
                        TOGETHER.
                    </h2>
                    <p className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[#b5b5b5]">당신의 다음 이야기를 기다립니다.</p>
                    <div>
                        <ContactCreatorButton>또바기와 함께 시작하기</ContactCreatorButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
