"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

export function BrandPhilosophy() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.about.section.brandPhilosophy(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="section py-18 tablet:py-30 content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto"
            aria-labelledby="philosophy-title"
        >
            <div className="split-layout grid grid-cols-1 tablet:grid-cols-2 items-center gap-10 pc:gap-18 philosophy-layout [&.philosophy-layout]:items-start">
                <div
                    className="philosophy-image relative tablet:sticky top-auto tablet:top-20"
                    data-reveal
                >
                    <div className="portrait-image relative h-110 tablet:h-170 overflow-clip">
                        <Image
                            className="grayscale"
                            src="/images/about/brand.webp"
                            alt="회사소개서의 다양한 개인 방송 세팅 사례"
                            fill
                            sizes="(min-width: 48rem) 45vw, 90vw"
                        />
                    </div>
                </div>
                <div className="split-copy flex flex-col items-start gap-6 tablet:gap-8">
                    <p
                        className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                        data-reveal
                    >
                        01 — OUR PHILOSOPHY
                    </p>
                    <h2
                        id="philosophy-title"
                        className="display-title text-[4rem] tablet:text-[4.4rem] pc:text-[6.8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] m-0"
                        data-reveal
                    >
                        Everyone has
                        <br />
                        their own <span className="accent text-[var(--accent)]">color.</span>
                    </h2>
                    <p
                        className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)]"
                        data-reveal
                    >
                        각자가 가진 개성과 매력을 소중하게 생각합니다.
                    </p>
                    <p
                        className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)]"
                        data-reveal
                    >
                        누군가를 보여주는 데서 멈추지 않고,
                        <br />
                        자신만의 색깔을 가진 크리에이터로 성장할 수 있도록
                        <br />
                        함께 고민하고 만들어갑니다.
                    </p>
                    <p
                        className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)]"
                        data-reveal
                    >
                        시작을 위한 환경, 지속을 위한 지원.
                        <br />
                        또바기는 오래 함께할 수 있는 방향을 찾습니다.
                    </p>
                </div>
            </div>
        </section>
    );
}
