"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

const TOP_IMAGES = [
    { src: "/images/landing/studio2.jpg", alt: "또바기 방송 제작 공간" },
    { src: "/images/services/directing.webp", alt: "크리에이터 디렉팅 현장" },
    null,
    { src: "/images/home/creator-stories.webp", alt: "다양한 크리에이터의 방송 활동" },
    { src: "/images/services/events.webp", alt: "함께 만드는 방송 콘텐츠" },
] as const;

const BOTTOM_IMAGES = [
    { src: "/images/equipment/camera.webp", alt: "방송 촬영 장비" },
    { src: "/images/landing/room.jpg", alt: "콘텐츠에 집중하는 방송 공간" },
    { src: "/images/about/brand.webp", alt: "또바기와 함께하는 크리에이터" },
    { src: "/images/landing/optimized/meeting.50114570.avif", alt: "함께 준비하는 방송 제작 환경" },
    { src: "/images/equipment/streaming.webp", alt: "크리에이터를 위한 스트리밍 환경" },
    { src: "/images/home/studio.webp", alt: "또바기 방송 스튜디오 전경" },
] as const;

export function CreatorGallery() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.creatorGallery(sectionRef.current);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="creator-gallery relative z-10 bg-white [&.is-gallery-reveal]:-mt-[100svh]"
            aria-labelledby="home-gallery-title"
        >
            <h2
                id="home-gallery-title"
                className="sr-only"
            >
                당신의 무대가 넓어지는 순간
            </h2>
            <div
                data-gallery-stage
                className="relative overflow-hidden px-5 py-18 [.is-gallery_&]:h-svh [.is-gallery_&]:p-0"
            >
                <div
                    data-gallery-lead
                    className="relative z-20 mx-auto aspect-[16/10] w-full max-w-330 overflow-hidden rounded-[2rem] [.is-gallery_&]:absolute [.is-gallery_&]:left-1/2 [.is-gallery_&]:top-1/2 [.is-gallery_&]:m-0 [.is-gallery_&]:aspect-auto [.is-gallery_&]:max-w-none"
                >
                    <Image
                        src="/images/landing/studio3.jpg"
                        alt="또바기 크리에이터의 콘텐츠가 만들어지는 방송 스튜디오"
                        fill
                        sizes="100vw"
                        loading="eager"
                        className="object-cover filter-none!"
                    />
                    <div
                        data-gallery-shade
                        className="absolute inset-0 bg-black/40"
                        aria-hidden="true"
                    />
                    <p
                        data-gallery-copy
                        data-reveal
                        aria-hidden="true"
                        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-balance break-keep text-2xl font-[580] leading-[1.3] tracking-[-0.04em] text-white site:text-6xl xl:text-[7.2rem]"
                    >
                        <span>당신의 색깔이 빛나고,</span>
                        <span>당신의 무대가 넓어지는 곳.</span>
                    </p>
                </div>
                <div
                    data-gallery-top
                    className="mx-auto mt-6 grid max-w-330 grid-cols-2 gap-6 [.is-gallery_&]:absolute [.is-gallery_&]:left-1/2 [.is-gallery_&]:top-1/2 [.is-gallery_&]:m-0 [.is-gallery_&]:flex [.is-gallery_&]:max-w-none [.is-gallery_&]:gap-[var(--gallery-gap)]"
                >
                    {TOP_IMAGES.map((image) => (
                        <div
                            key={image?.src ?? "lead-slot"}
                            data-gallery-side={image ? "" : undefined}
                            data-reveal={image ? "" : undefined}
                            aria-hidden={image ? undefined : true}
                            className={`${image ? "relative" : "hidden [.is-gallery_&]:block"} aspect-[3/2] overflow-hidden rounded-[2rem] [.is-gallery_&]:h-[var(--gallery-card-height)] [.is-gallery_&]:w-[var(--gallery-card-width)] [.is-gallery_&]:shrink-0`}
                        >
                            {image ? (
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(min-width: 900px) 29vw, 50vw"
                                    className="object-cover filter-none!"
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
                <div
                    data-gallery-bottom
                    className="mx-auto mt-6 grid max-w-330 grid-cols-2 gap-6 [.is-gallery_&]:absolute [.is-gallery_&]:left-1/2 [.is-gallery_&]:top-1/2 [.is-gallery_&]:m-0 [.is-gallery_&]:flex [.is-gallery_&]:max-w-none [.is-gallery_&]:gap-[var(--gallery-gap)]"
                >
                    {BOTTOM_IMAGES.map((image) => (
                        <div
                            key={image.src}
                            data-reveal
                            className="relative aspect-[3/2] overflow-hidden rounded-[2rem] [.is-gallery_&]:h-[var(--gallery-small-height)] [.is-gallery_&]:w-[var(--gallery-small-width)] [.is-gallery_&]:shrink-0"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(min-width: 900px) 20vw, 50vw"
                                className="object-cover filter-none!"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
