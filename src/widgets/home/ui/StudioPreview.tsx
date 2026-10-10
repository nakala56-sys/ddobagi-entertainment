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
            className="section py-30 max-site:py-18 text-black bg-white"
            aria-labelledby="home-studio-title"
        >
            <div className="content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]">
                <div className="section-heading flex items-end justify-between gap-10 mb-15 [.is-horizontal_&]:mb-8 [.is-pinned_&]:mb-8 max-site:items-start max-site:flex-col max-site:gap-8 max-site:mb-10">
                    <div>
                        <p
                            className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                            data-reveal
                        >
                            04 — YOUR SPACE
                        </p>
                        <h2
                            id="home-studio-title"
                            className="display-title text-[4rem] compact:text-[4rem] site:text-5xl wide:text-6xl xl:text-[8rem] 2xl:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-7 [.split-copy_&]:m-0 [.split-copy_&]:text-4xl [.split-copy_&]:compact:text-4xl [.split-copy_&]:site:text-[4.4rem] [.split-copy_&]:wide:text-[5.2rem] [.split-copy_&]:xl:text-[6.8rem] [.split-copy_&]:2xl:text-[6.8rem] [.stack-card_&]:text-3xl [.stack-card_&]:compact:text-3xl [.stack-card_&]:site:text-4xl [.stack-card_&]:wide:text-[4.4rem] [.stack-card_&]:xl:text-[5.6rem] [.stack-card_&]:2xl:text-[5.6rem] [.stack-card_&]:my-8 max-site:text-4xl max-site:compact:text-[4rem] max-site:site:text-6xl max-site:wide:text-6xl max-site:xl:text-6xl max-site:2xl:text-6xl max-site:mt-5 max-site:[.split-copy_&]:text-[4rem] max-site:[.split-copy_&]:compact:text-[4rem] max-site:[.split-copy_&]:site:text-6xl max-site:[.split-copy_&]:wide:text-6xl max-site:[.split-copy_&]:xl:text-6xl max-site:[.split-copy_&]:2xl:text-6xl max-site:[.showcase-copy_&]:text-5xl max-site:[.stack-card_&]:text-[4rem]"
                            data-reveal
                        >
                            새로운 무대가
                            <br />
                            준비되어 있어요.
                        </h2>
                    </div>
                    <Link
                        className="text-link inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent text-[inherit]"
                        href="/equipment"
                        data-reveal
                    >
                        방송 환경 둘러보기 ↗
                    </Link>
                </div>
                <div
                    className="wide-image relative h-[min(60vw,_65.2rem)] overflow-clip max-site:h-105 max-compact:h-75"
                    data-image
                >
                    <Image
                        className="filter-none!"
                        src="/images/home/image3.png"
                        alt="회사소개서에 소개된 또바기 방송 스튜디오"
                        fill
                        sizes="(min-width: 1440px) 1320px, 90vw"
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
