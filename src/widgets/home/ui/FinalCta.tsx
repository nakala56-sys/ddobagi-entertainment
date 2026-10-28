"use client";

import { useEffect, useRef } from "react";
import { ContactCreatorButton } from "@/features/contactCreator";
import Animation from "@/shared/utils/animation";

export function FinalCta() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.finalCta(sectionRef.current);
    }, []);

    return (
        <section
            ref={sectionRef}
            data-report-id="home-closing"
            data-report-type="group"
            data-cta-wave
            className="closing relative z-10 overflow-visible bg-[var(--color-background)] motion-reduce:bg-[#20261f] section-dark text-[var(--color-text)]"
            aria-labelledby="home-closing-title"
        >
            <div
                data-cta-park
                className="relative h-[46vh] overflow-hidden motion-reduce:h-0"
            >
                <div
                    data-cta-ink
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-svh overflow-hidden motion-reduce:hidden"
                >
                    <div
                        data-cta-circle
                        className="absolute rounded-full"
                    />
                </div>
            </div>

            <div className="relative z-10 flex min-h-[calc(100svh_-_var(--footer-height))] items-center py-[8rem] tablet:py-[12rem] motion-reduce:min-h-[calc(85svh_-_var(--footer-height))]">
                <div
                    data-cta-content
                    className="closing-content text-[var(--color-text)] relative z-10 mx-auto flex w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] flex-col items-center gap-[3.2rem] tablet:gap-[3.6rem] text-center content-width"
                >
                    <h2
                        className="text-[2.4rem] text-[#faf9f5] tablet:text-[4rem] pc:text-[5.8rem] break-keep leading-[1]"
                        id="home-closing-title"
                        data-title-rise
                    >
                        첫 방송도, 다음 도전도.
                        <br />
                        또바기와 함께하세요.
                    </h2>
                    <p
                        className="body-copy text-[#faf9f5] text-[1.6rem] pc:text-[1.8rem] leading-[1.5] break-keep"
                        data-reveal
                    >
                        방송을 처음 준비하는 분도, 새로운 방향을 고민하는 크리에이터도.
                        <br />
                        지금 필요한 지원을 또바기와 상담해보세요.
                    </p>
                    {/* <div data-reveal>
                        <ContactCreatorButton />
                    </div> */}
                </div>
            </div>
        </section>
    );
}
