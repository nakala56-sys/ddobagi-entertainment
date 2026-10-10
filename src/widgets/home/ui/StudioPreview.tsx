"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Animation from "@/shared/utils/animation";

export function StudioPreview() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.studioPreview(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="section py-18 tablet:py-30 text-black bg-white"
            aria-labelledby="home-studio-title"
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
                            04 — YOUR SPACE
                        </p>
                        <h2
                            id="home-studio-title"
                            className="display-title text-4xl tablet:text-5xl pc:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-5 tablet:mt-7"
                            data-reveal
                        >
                            새로운 무대가
                            <br />
                            준비되어 있어요.
                        </h2>
                    </div>
                    <Link
                        className="text-[inherit] inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent"
                        href="/equipment"
                        data-reveal
                    >
                        방송 환경 둘러보기 ↗
                    </Link>
                </div>
                <div
                    className="wide-image relative h-75 tablet:h-[min(60vw,_65.2rem)] overflow-clip"
                    data-image
                >
                    <Image
                        className="filter-none! grayscale"
                        src="/images/home/image3.png"
                        alt="회사소개서에 소개된 또바기 방송 스튜디오"
                        fill
                        sizes="(min-width: 90rem) 1320px, 90vw"
                    />
                </div>
                <p
                    className="image-caption text-xs mt-6"
                    data-reveal
                >
                    전문 장비와 방송 세팅. 콘텐츠에 집중할 수 있는 공간.
                </p>
            </div>
        </section>
    );
}
