"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

const REEL_IMAGES = [
    { src: "/images/landing/studio3.jpg", alt: "또바기 방송 스튜디오" },
    { src: "/images/landing/bj.jpg", alt: "방송 중인 크리에이터" },
    { src: "/images/equipment/setup-mic.jpg", alt: "방송 촬영 장비" },
    { src: "/images/services/collaboration.jpg", alt: "디렉팅 현장" },
    { src: "/images/landing/room.jpg", alt: "콘텐츠 제작 공간" },
    { src: "/images/home/creator-stories.webp", alt: "크리에이터의 방송 활동" },
    { src: "/images/equipment/lighting.webp", alt: "스튜디오 조명" },
    { src: "/images/landing/studio2.jpg", alt: "방송 제작 공간" },
] as const;

export function CreatorReel() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.creatorReel(sectionRef.current);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="creator-reel relative z-10 bg-[var(--color-background)] py-[8rem] tablet:py-[12rem]"
            aria-labelledby="home-reel-title"
        >
            <h2
                id="home-reel-title"
                className="sr-only leading-[1.5]"
            >
                또바기 현장
            </h2>
            <div
                data-reel-viewport
                className="cursor-grab touch-pan-y overflow-hidden [perspective:90rem] [perspective-origin:50%_50%] [transform-style:preserve-3d] select-none data-[dragging=true]:cursor-grabbing"
            >
                <div
                    data-reel-track
                    className="relative flex w-max [transform-style:preserve-3d]"
                >
                    {[0, 1].map((copy) => (
                        <div
                            key={copy}
                            data-reel-set={copy === 0 ? "" : undefined}
                            aria-hidden={copy === 1 ? true : undefined}
                            className="flex [transform-style:preserve-3d] gap-[1.6rem] pr-[1.6rem]"
                        >
                            {REEL_IMAGES.map((image) => (
                                <article
                                    key={`${copy}-${image.src}`}
                                    data-reel-card
                                    className="relative h-[34rem] w-[24rem] shrink-0 overflow-hidden tablet:h-[40rem] tablet:w-[28rem] pc:h-[44rem] pc:w-[32rem]"
                                >
                                    <Image
                                        src={image.src}
                                        alt={copy === 0 ? image.alt : ""}
                                        fill
                                        sizes="(min-width: 90rem) 32rem, (min-width: 48rem) 28rem, 24rem"
                                        draggable={false}
                                        className="pointer-events-none object-cover"
                                    />
                                </article>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
