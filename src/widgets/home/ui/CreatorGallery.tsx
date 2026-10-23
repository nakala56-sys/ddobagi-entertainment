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
            className="creator-gallery relative z-10 bg-[var(--color-background)] data-[gallery-reveal=true]:-mt-[100svh]"
            aria-labelledby="home-gallery-title"
        >
            <h2
                id="home-gallery-title"
                className="sr-only leading-[1.5]"
            >
                방송이 시작되고, 콘텐츠가 만들어지는 곳.
            </h2>
            <div
                data-gallery-target
                data-gallery-stage
                className="relative overflow-hidden px-[2rem] py-[7.2rem] data-[gallery=true]:h-svh data-[gallery=true]:p-0"
            >
                <div
                    data-gallery-target
                    data-gallery-lead
                    className="relative z-20 mx-auto aspect-[16/10] w-full max-w-[132rem] overflow-hidden rounded-[2rem] data-[gallery=true]:absolute data-[gallery=true]:left-1/2 data-[gallery=true]:top-1/2 data-[gallery=true]:m-0 data-[gallery=true]:aspect-auto data-[gallery=true]:max-w-none"
                >
                    <Image
                        src="/images/landing/studio3.jpg"
                        alt="또바기 크리에이터의 콘텐츠가 만들어지는 방송 스튜디오"
                        fill
                        sizes="100vw"
                        loading="eager"
                        className="object-cover filter-none! grayscale"
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
                        className="absolute inset-0 flex flex-col items-center justify-center px-[2.4rem] text-center text-white break-keep text-[2.4rem] tablet:text-[6rem] pc:text-[7.2rem] font-[580] leading-[1.5]"
                    >
                        <span>방송이 시작되고,</span>
                        <span>콘텐츠가 만들어지는 곳.</span>
                    </p>
                </div>
                <div
                    data-gallery-target
                    data-gallery-top
                    className="mx-auto mt-[2.4rem] grid max-w-[132rem] grid-cols-2 gap-[2.4rem] data-[gallery=true]:absolute data-[gallery=true]:left-1/2 data-[gallery=true]:top-1/2 data-[gallery=true]:m-0 data-[gallery=true]:flex data-[gallery=true]:max-w-none data-[gallery=true]:gap-[var(--gallery-gap)]"
                >
                    {TOP_IMAGES.map((image) => (
                        <div
                            data-gallery-target
                            key={image?.src ?? "lead-slot"}
                            data-gallery-side={image ? "" : undefined}
                            data-reveal={image ? "" : undefined}
                            aria-hidden={image ? undefined : true}
                            className={`aspect-[3/2] overflow-hidden rounded-[2rem] data-[gallery=true]:h-[var(--gallery-card-height)] data-[gallery=true]:w-[var(--gallery-card-width)] data-[gallery=true]:shrink-0 ${image ? "relative" : "hidden data-[gallery=true]:block"} `}
                        >
                            {image ? (
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(min-width: 48rem) 29vw, 50vw"
                                    className="object-cover filter-none! grayscale"
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
                <div
                    data-gallery-target
                    data-gallery-bottom
                    className="mx-auto mt-[2.4rem] grid max-w-[132rem] grid-cols-2 gap-[2.4rem] data-[gallery=true]:absolute data-[gallery=true]:left-1/2 data-[gallery=true]:top-1/2 data-[gallery=true]:m-0 data-[gallery=true]:flex data-[gallery=true]:max-w-none data-[gallery=true]:gap-[var(--gallery-gap)]"
                >
                    {BOTTOM_IMAGES.map((image) => (
                        <div
                            data-gallery-target
                            key={image.src}
                            data-reveal
                            className="relative aspect-[3/2] overflow-hidden rounded-[2rem] data-[gallery=true]:h-[var(--gallery-small-height)] data-[gallery=true]:w-[var(--gallery-small-width)] data-[gallery=true]:shrink-0"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(min-width: 48rem) 20vw, 50vw"
                                className="object-cover filter-none! grayscale"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
