"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Animation from "@/shared/utils/animation";

const CARDS = [
    {
        id: "studio",
        href: "/equipment",
        title: ["방송에 필요한 준비는 가볍게,", "나에게 맞는 공간에서 시작해요"],
        link: "방송 환경 살펴보기",
        image: "/images/equipment/studio-stage.webp",
    },
    {
        id: "direction",
        href: "/services",
        title: ["내가 가진 매력이 콘텐츠가 되도록,", "기획부터 디렉팅까지 함께해요"],
        link: "콘텐츠 지원 알아보기",
        image: "/images/benefits/content-production.webp",
    },
    {
        id: "growth",
        href: "/benefits",
        title: ["오늘의 방송을 다음 가능성으로,", "내 속도에 맞춰 성장해요"],
        link: "맞춤 지원 살펴보기",
        image: "/images/benefits/personal-branding.webp",
    },
] as const;

function CardArrow() {
    return (
        <span className="absolute bottom-[5%] right-[6%] grid size-[9cqw] place-items-center rounded-full bg-white/85 text-[#4e5968] group-hover:bg-white group-focus-visible:bg-white">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-[5cqw]"
            >
                <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
        </span>
    );
}

export function CreatorSolutions() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.creatorSolutions(sectionRef.current);
    }, []);

    return (
        <section
            ref={sectionRef}
            data-report-id="home-solutions"
            data-report-type="group"
            aria-labelledby="home-solutions-title"
            className="creator-solutions relative z-10 bg-[var(--color-background)] py-[8rem] tablet:py-[12rem] text-[var(--color-text)]"
        >
            <div className="mx-auto w-[calc(100%_-_4rem)] max-w-[180rem] tablet:w-[calc(100%_-_8rem)] pc:w-[88%]">
                <h2
                    id="home-solutions-title"
                    data-title-rise
                    className="mx-auto max-w-[120rem] text-center text-[2.8rem] tablet:text-[3.2rem] pc:text-[4rem] font-[650] leading-[1.8] break-keep"
                >
                    막막했던{" "}
                    <span className="inline-flex items-center -space-x-[-0.4rem] align-middle text-[2rem] tablet:text-[2.8rem] pc:text-[3.6rem]">
                        {["방송", "콘텐츠", "성장"].map((label, index) => (
                            <span
                                key={label}
                                data-solution-chip
                                className={`inline-block rounded-full px-[1.6rem] py-[0.8rem] tablet:px-[2rem] tablet:py-[1rem] ${index === 1 ? "relative -top-[1rem] -rotate-[6deg] bg-[radial-gradient(ellipse_at_60%_90%,#f1d4bf,#f8f6ef_70%)] text-[#a52913]" : "bg-[#f2f4f6] text-[#626975]"}`}
                            >
                                {label}
                            </span>
                        ))}
                    </span>{" "}
                    준비, 이제 함께해요.
                </h2>

                <div
                    data-solution-grid
                    className="mt-[4.8rem] grid grid-cols-1 gap-[4.8rem] tablet:mt-[6.4rem] tablet:grid-cols-3 tablet:gap-0"
                >
                    {CARDS.map((card) => (
                        <article
                            key={card.id}
                            data-solution-card
                            className="min-w-0"
                        >
                            <Link
                                href={card.href}
                                data-solution-content
                                aria-labelledby={`home-solution-${card.id}-title`}
                                className="group block focus-visible:outline-[0.3rem] focus-visible:outline-solid focus-visible:outline-[#31598a] focus-visible:outline-offset-[0.8rem]"
                            >
                                <div
                                    data-solution-visual
                                    aria-hidden="true"
                                    className="relative aspect-[5/6] overflow-hidden [container-type:inline-size]"
                                >
                                    <Image
                                        src={card.image}
                                        alt=""
                                        fill
                                        unoptimized
                                        sizes="(min-width: 64rem) 30vw, 100vw"
                                        className="object-cover"
                                    />
                                    <CardArrow />
                                </div>
                                <div className="px-[0.8rem] pt-[2.4rem] tablet:px-[1.2rem] tablet:pt-[2.8rem] pc:pt-[3.2rem]">
                                    <h3
                                        id={`home-solution-${card.id}-title`}
                                        className="text-[2rem] pc:text-[2.2rem] font-[600] leading-[1.6] break-keep"
                                    >
                                        {card.title[0]}
                                        <br />
                                        {card.title[1]}
                                    </h3>
                                    <p className="mt-[1.2rem] text-[1.4rem] pc:text-[1.6rem] font-[450] leading-[1.6] text-[#8b95a1]">{card.link}</p>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
