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
            className="section py-[7.2rem] tablet:py-[12rem] text-[var(--color-text)] bg-[var(--color-background)]"
            aria-labelledby="home-studio-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto">
                <div
                    data-horizontal-target
                    data-pinned-target
                    className="section-heading flex items-start tablet:items-end justify-between gap-[3.2rem] tablet:gap-[4rem] mb-[4rem] tablet:mb-[6rem] data-[horizontal=true]:mb-[3.2rem] data-[pinned=true]:mb-[3.2rem] flex-col tablet:flex-row"
                >
                    <div>
                        <h2
                            id="home-studio-title"
                            className="display-title text-[3.6rem] tablet:text-[4.8rem] pc:text-[8rem] font-[580]"
                            data-reveal
                        >
                            새로운 무대가
                            <br />
                            준비되어 있어요.
                        </h2>
                    </div>
                    <Link
                        className="text-[inherit] inline-flex gap-[3.2rem] items-center font-[650] text-[1.6rem] py-[1.2rem] border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent leading-[1.0]"
                        href="/equipment"
                        data-reveal
                    >
                        방송 환경 둘러보기 ↗
                    </Link>
                </div>
                <div
                    className="wide-image relative h-[30rem] tablet:h-[60vw] tablet:max-h-[65.2rem] overflow-clip"
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
                    className="image-caption text-[1.2rem] mt-[2.4rem] leading-[1.0]"
                    data-reveal
                >
                    전문 장비와 방송 세팅. 콘텐츠에 집중할 수 있는 공간.
                </p>
            </div>
        </section>
    );
}
