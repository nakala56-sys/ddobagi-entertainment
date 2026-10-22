"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Animation from "@/shared/utils/animation";

/** Deterministic horizontal slots so SSR and client match. */
const MOMENT_IMAGES = [
    { src: "/images/home/studio.webp", alt: "또바기 방송 스튜디오", x: 14, size: "md" },
    { src: "/images/home/creator-stories.webp", alt: "크리에이터와 함께한 순간", x: 72, size: "lg" },
    { src: "/images/about/brand.webp", alt: "브랜드와 함께하는 방송 환경", x: 28, size: "sm" },
    { src: "/images/services/directing.webp", alt: "디렉팅 지원 현장", x: 78, size: "md" },
    { src: "/images/equipment/streaming.webp", alt: "스트리밍 장비 세팅", x: 18, size: "lg" },
    { src: "/images/landing/bj.jpg", alt: "방송 중인 크리에이터", x: 58, size: "sm" },
    { src: "/images/equipment/studio.webp", alt: "스튜디오 전경", x: 38, size: "md" },
] as const;

const SIZE_CLASS = {
    sm: "w-[42vw] max-w-[22rem] aspect-[3/4]",
    md: "w-[48vw] max-w-[28rem] aspect-[4/5]",
    lg: "w-[56vw] max-w-[34rem] aspect-[3/4]",
} as const;

// sizes uses the initial font size; caps account for the 62.5% root and object-cover magnification.
const IMAGE_SIZES: Partial<Record<(typeof MOMENT_IMAGES)[number]["src"], string>> = {
    "/images/about/brand.webp": "min(45vw, 14.5rem)",
    "/images/services/directing.webp": "min(60vw, 22rem)",
    "/images/equipment/studio.webp": "min(60vw, 22rem)",
};

export function BeliefMoments() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.beliefMoments(sectionRef.current);
    }, []);

    const imageGap = 70;
    const firstTop = 12;
    // Extra room after the last image so it can fully exit above the viewport
    // before sticky copy releases and the next section scrolls in.
    const exitPad = 180;
    const trackHeight = `${firstTop + (MOMENT_IMAGES.length - 1) * imageGap + exitPad}vh`;

    return (
        <section
            ref={sectionRef}
            className="belief-moments relative z-10 overflow-x-clip"
            aria-labelledby="home-belief-moments-title"
        >
            <div className="sticky top-0 z-20 flex h-svh items-center justify-center pointer-events-none">
                <div className="content-width pointer-events-auto mx-auto flex w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] flex-col items-center text-center px-[2rem]">
                    <h2
                        id="home-belief-moments-title"
                        className="display-title mt-[2rem] tablet:mt-[2.8rem] text-[3.6rem] tablet:text-[4.8rem] pc:text-[8rem] leading-[1.5] font-[580]"
                        data-reveal
                    >
                        크리에이터의 방송을,
                        <br />
                        함께 기획하고 <span className="accent text-[var(--accent,#000000)]">키웁니다.</span>
                    </h2>
                    <p
                        className="body-copy mt-[4rem] max-w-[60rem] text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373]"
                        data-reveal
                    >
                        방송 스타일과 콘텐츠 방향, 시청자와의 소통까지.
                        <br />
                        크리에이터의 개성에 맞는 방향을 찾고,
                        <br />
                        꾸준한 방송 활동을 지원합니다.
                    </p>
                    <Link
                        className="text-[inherit] mt-[4.8rem] inline-flex items-center gap-[3.2rem] border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent py-[1.2rem] text-[1.6rem] font-[650] leading-[1.0]"
                        href="/about"
                        data-reveal
                    >
                        또바기 엔터테인먼트 소개 <span aria-hidden="true">↗</span>
                    </Link>
                </div>
            </div>

            <div
                className="relative z-0 -mt-[100svh]"
                style={{ height: trackHeight }}
                aria-hidden="true"
            >
                {MOMENT_IMAGES.map((image, index) => (
                    <div
                        key={image.src}
                        className="absolute -translate-x-1/2"
                        style={{ top: `${firstTop + index * imageGap}vh`, left: `${image.x}%` }}
                    >
                        <div
                            data-float-image
                            className={`relative overflow-hidden rounded-[0.4rem] will-change-transform ${SIZE_CLASS[image.size]}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes={IMAGE_SIZES[image.src] ?? "(min-width: 48rem) 34rem, 56vw"}
                                className="object-cover grayscale"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
