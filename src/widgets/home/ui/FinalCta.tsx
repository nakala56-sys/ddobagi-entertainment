"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
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
            data-cta-wave
            className="closing relative overflow-hidden min-h-[85svh] flex items-center py-30 [&_h2]:text-[4.4rem] [&_h2]:compact:text-[4.4rem] [&_h2]:site:text-[6.8rem] [&_h2]:wide:text-[8.4rem] [&_h2]:xl:text-[10.8rem] [&_h2]:2xl:text-[11.2rem] [&_h2]:leading-[round(up,1.02em,0.4rem)] [&_h2]:tracking-[round(nearest,-0.055em,0.4rem)] [&_h2]:font-[550] max-site:min-h-[75svh] max-site:py-20 max-site:[&_h2]:text-[4rem] max-site:[&_h2]:compact:text-5xl max-site:[&_h2]:site:text-[8rem] max-site:[&_h2]:wide:text-[8rem] max-site:[&_h2]:xl:text-[8rem] max-site:[&_h2]:2xl:text-[8rem] section-dark [--accent:#ffffff] text-[var(--paper)] bg-[#000000] motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]"
            style={
                {
                    "--cta-wave": "0%",
                    "--cta-wave-x": "50%",
                    "--cta-wave-y": "-6%",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 115% 95% at var(--cta-wave-x) var(--cta-wave-y), #000 0%, #000 var(--cta-wave), transparent calc(var(--cta-wave) + 24%))",
                    maskImage:
                        "radial-gradient(ellipse 115% 95% at var(--cta-wave-x) var(--cta-wave-y), #000 0%, #000 var(--cta-wave), transparent calc(var(--cta-wave) + 24%))",
                } as CSSProperties
            }
            aria-labelledby="home-closing-title"
        >
            <div className="closing-image absolute inset-0 opacity-[0.2]" data-image>
                <Image src="/images/equipment/studio.webp" alt="또바기 회사소개서에 담긴 방송 환경" fill sizes="100vw" />
            </div>
            <div className="closing-content relative text-center flex flex-col items-center gap-9 max-site:gap-8 content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]">
                <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase" data-reveal>
                    06 — YOUR NEXT CHAPTER
                </p>
                <h2 id="home-closing-title" data-reveal>
                    LET’S GROW
                    <br />
                    TOGETHER.
                </h2>
                <p
                    className="body-copy text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)] [.section-dark_&]:text-[#b5b5b5] [.showcase-copy_&]:mt-8 [.stack-card_&]:max-w-110 [.stack-card_&]:text-[#b5b5b5] max-site:[.showcase-copy_&]:mt-5"
                    data-reveal
                >
                    당신의 다음 이야기를 기다립니다.
                </p>
                <div data-reveal>
                    <ContactCreatorButton>또바기와 함께 시작하기</ContactCreatorButton>
                </div>
            </div>
        </section>
    );
}
