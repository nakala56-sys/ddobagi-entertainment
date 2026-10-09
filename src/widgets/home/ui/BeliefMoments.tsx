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
    sm: "w-[min(42vw,22rem)] aspect-[3/4]",
    md: "w-[min(48vw,28rem)] aspect-[4/5]",
    lg: "w-[min(56vw,34rem)] aspect-[3/4]",
} as const;

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
            className="belief-moments relative z-10 overflow-visible"
            aria-labelledby="home-belief-moments-title"
        >
            <div className="sticky top-0 z-20 flex h-svh items-center justify-center pointer-events-none">
                <div className="content-width pointer-events-auto mx-auto flex w-[min(132rem,_calc(100%_-_12rem))] max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)] flex-col items-center text-center px-5">
                    <p
                        className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                        data-reveal
                    >
                        02 — OUR BELIEF
                    </p>
                    <h2
                        id="home-belief-moments-title"
                        className="display-title mt-7 text-[4rem] compact:text-[4rem] site:text-5xl wide:text-6xl xl:text-[8rem] 2xl:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] max-site:mt-5 max-site:text-4xl"
                        data-reveal
                    >
                        가능성은 당신에게.
                        <br />
                        그 다음은 <span className="accent text-[var(--accent)]">우리 함께.</span>
                    </h2>
                    <p
                        className="body-copy mt-10 max-w-150 text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)]"
                        data-reveal
                    >
                        각자의 매력을 발견하고, 콘텐츠로 연결하고,
                        <br />
                        꾸준히 성장할 수 있는 환경을 만듭니다.
                        <br />
                        또바기는 크리에이터의 다음을 함께하는 파트너입니다.
                    </p>
                    <Link
                        className="text-link mt-12 inline-flex items-center gap-8 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent py-3 text-base font-[650] text-[inherit]"
                        href="/about"
                        data-reveal
                    >
                        또바기 알아보기 <span aria-hidden="true">↗</span>
                    </Link>
                </div>
            </div>

            <div className="relative z-0 -mt-[100svh]" style={{ height: trackHeight }} aria-hidden="true">
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
                                sizes="(min-width: 900px) 34rem, 56vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
