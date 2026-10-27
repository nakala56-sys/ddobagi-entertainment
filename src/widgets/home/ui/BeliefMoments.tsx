"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Animation from "@/shared/utils/animation";

/** Deterministic horizontal slots so SSR and client match. */
const MOMENT_IMAGES = [
    { src: "/images/home/moment-desk.jpg", alt: "마이크 앞에서 방송하는 크리에이터", x: 14, size: "md" },
    { src: "/images/home/moment-set.jpg", alt: "촬영 현장에서 포즈를 취한 크리에이터", x: 72, size: "lg" },
    { src: "/images/home/moment-camera.jpg", alt: "분홍 조명 아래에서 출연진을 촬영하는 장면", x: 28, size: "md" },
    { src: "/images/home/moment-monitor.jpg", alt: "모니터를 함께 확인하는 장면", x: 78, size: "md" },
    { src: "/images/home/moment-script.jpg", alt: "대본을 두고 이야기하는 장면", x: 18, size: "lg" },
    { src: "/images/home/moment-studio-wait.jpg", alt: "분홍 스튜디오에서 대기하는 출연진", x: 58, size: "sm" },
    { src: "/images/home/moment-studio-pose.jpg", alt: "분홍 스튜디오에서 포즈를 취한 출연진", x: 38, size: "md" },
] as const;

const SIZE_CLASS = {
    sm: "w-[34vw] tablet:w-[42vw] max-w-[22rem] aspect-[3/4]",
    md: "w-[38vw] tablet:w-[48vw] max-w-[28rem] aspect-[4/5]",
    lg: "w-[44vw] tablet:w-[56vw] max-w-[34rem] aspect-[3/4]",
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
    // before the pinned copy releases and the next section scrolls in.
    const exitPad = 180;
    const trackHeight = `${firstTop + (MOMENT_IMAGES.length - 1) * imageGap + exitPad}vh`;

    return (
        <section
            ref={sectionRef}
            data-report-id="home-belief-moments"
            data-report-type="group"
            className="belief-moments relative z-10"
            aria-labelledby="home-belief-moments-title"
        >
            <div
                data-belief-copy
                className="relative z-20 flex h-svh w-full items-center justify-center pointer-events-none"
            >
                <div className="content-width pointer-events-auto mx-auto flex w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] flex-col items-center text-center px-[2rem]">
                    <h2
                        id="home-belief-moments-title"
                        className="display-title mt-[2rem] tablet:mt-[2.8rem] text-[3rem] tablet:text-[4.8rem] pc:text-[5.8rem] leading-[1.5] font-[580] break-keep"
                        data-title-rise
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
                className="relative z-0 -mt-[100svh] overflow-x-clip"
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
                            className={`relative overflow-hidden rounded-[0.4rem] ${SIZE_CLASS[image.size]}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(min-width: 48rem) 34rem, 56vw"
                                loading={index === 0 ? "eager" : "lazy"}
                                className="object-cover tablet:grayscale"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
