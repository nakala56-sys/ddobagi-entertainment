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
            className="closing relative z-10 overflow-visible bg-[var(--color-background)] motion-reduce:bg-[var(--color-background)] section-dark text-[#ffffff]"
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
                        fill="#ffffff"
                        filter={`url(#cta-ink-wobble-${wobbleId})`}
                    />
                </svg>
            </div>

            <div className="relative z-10 flex min-h-[100svh] items-center py-[8rem] tablet:py-[12rem] mix-blend-difference motion-reduce:mix-blend-normal motion-reduce:min-h-[85svh]">
                <div
                    data-cta-content
                    className="closing-content relative z-10 mx-auto flex w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] flex-col items-center gap-[3.2rem] tablet:gap-[3.6rem] text-center content-width"
                >
                    <h2
                        className="text-[2.4rem] min-[343px]:text-[7vw] min-[1372px]:text-[9.6rem] leading-[1.5] font-[550] break-keep"
                        id="home-closing-title"
                        data-title-rise
                    >
                        첫 방송도, 다음 도전도.
                        <br />
                        또바기와 함께하세요.
                    </h2>
                    <p
                        className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#b5b5b5] break-keep"
                        data-reveal
                    >
                        방송을 처음 준비하는 분도, 새로운 방향을 고민하는 크리에이터도.
                        <br />
                        지금 필요한 지원을 또바기와 상담해보세요.
                    </p>
                    <div data-reveal>
                        <ContactCreatorButton />
                    </div>
                </div>
            </div>
        </section>
    );
}
