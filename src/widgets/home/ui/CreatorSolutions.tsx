"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Animation from "@/shared/utils/animation";

const CARDS = [
    {
        id: "studio",
        href: "/equipment",
        title: ["방송에 필요한 준비는 가볍게,", "나에게 맞는 공간에서 시작해요"],
        link: "방송 환경 살펴보기",
        background: "bg-[linear-gradient(145deg,#deeee9,#bfd1f2_40%,#e9e4f4_70%,#ffe0cc)]",
        Visual: StudioVisual,
    },
    {
        id: "direction",
        href: "/services",
        title: ["내가 가진 매력이 콘텐츠가 되도록,", "기획부터 디렉팅까지 함께해요"],
        link: "콘텐츠 지원 알아보기",
        background: "bg-[linear-gradient(145deg,#b9cef2,#dff3fc)]",
        Visual: DirectionVisual,
    },
    {
        id: "growth",
        href: "/benefits",
        title: ["오늘의 방송을 다음 가능성으로,", "내 속도에 맞춰 성장해요"],
        link: "맞춤 지원 살펴보기",
        background: "bg-[linear-gradient(145deg,#f5f0f7,#edf2f9_55%,#bed2fa)]",
        Visual: GrowthVisual,
    },
] as const;

function StudioVisual() {
    return (
        <div className="absolute inset-x-[10%] top-[15%] rounded-[7cqw] bg-white/75 p-[8%] shadow-[0_3cqw_10cqw_#5d77a00a]">
            <p className="text-[3cqw] font-[500] text-[#9ba4af]">방송 환경 준비</p>
            <p className="mt-[1.4cqw] text-[4.4cqw] font-[650] text-[#3d4652]">나에게 맞춘 세팅</p>
            <div className="mt-[6cqw] space-y-[2cqw]">
                {["스튜디오", "조명", "오디오", "송출", "모니터링"].map((label, index) => (
                    <div
                        key={label}
                        data-solution-meter
                        className="flex h-[11cqw] origin-left items-center rounded-[3cqw] bg-white/90 px-[3cqw] text-[3.2cqw] font-[500] text-[#8b95a1]"
                        style={{ width: `${100 - index * 14}%` }}
                    >
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
}

function DirectionVisual() {
    return (
        <>
            <div className="absolute left-[8%] top-[28%] size-[80%] rounded-full bg-white/35" />
            <div
                data-solution-pass
                className="absolute left-[32%] top-[20%] h-[59%] w-[45%] rotate-[3deg] rounded-[5cqw] bg-white/95"
            />
            <div
                data-solution-pass
                className="absolute left-[24%] top-[24%] flex h-[59%] w-[45%] -rotate-[3deg] flex-col justify-between rounded-[5cqw] border-[0.3cqw] border-solid border-white/75 bg-[linear-gradient(145deg,#f4efff,#e0edff_60%,#f6fbff)] p-[5%] shadow-[0_4cqw_8cqw_#6787b51a]"
            >
                <div className="flex items-center justify-between gap-[2cqw] text-[#9099b1]">
                    <span className="text-[2.5cqw] font-[650] tracking-[0.12em]">TTOBAGI</span>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="size-[6cqw]"
                    >
                        <rect
                            x="3"
                            y="6"
                            width="12"
                            height="12"
                            rx="3"
                        />
                        <path d="m15 10 6-3v10l-6-3" />
                    </svg>
                </div>
                <p className="text-[5.6cqw] font-[650] leading-[1.35] text-[#677a9b]">
                    YOUR COLOR.
                    <br />
                    ON AIR.
                </p>
                <div>
                    <p className="text-[2.6cqw] text-[#8c98aa]">나만의 콘텐츠</p>
                    <p className="mt-[1cqw] text-[3.1cqw] font-[650] text-[#4e5968]">기획부터 디렉팅까지</p>
                </div>
            </div>
        </>
    );
}

function GrowthVisual() {
    return (
        <div className="absolute inset-x-[10%] top-[15%] rounded-[7cqw] bg-white/80 p-[6.4%]">
            <p className="text-[3cqw] font-[500] text-[#a1a9b3]">크리에이터 맞춤 지원</p>
            <p className="mt-[1.4cqw] text-[4cqw] font-[650] text-[#4e5968]">나의 다음을 위한 플랜</p>
            <div className="mt-[5cqw] space-y-[1.6cqw]">
                {["콘텐츠 기획", "방송 피드백", "활동 방향 상담", "채널 운영", "새로운 무대"].map((label, index) => (
                    <div
                        key={label}
                        data-solution-row
                        className="flex h-[10.5cqw] items-center gap-[2.6cqw] rounded-[3cqw] bg-white/85 px-[3cqw]"
                    >
                        <span className="text-[2.8cqw] font-[650] text-[#bdc6d3]">{String(index + 1).padStart(2, "0")}</span>
                        <span className="flex-1 text-[3.1cqw] font-[550] text-[#6b7684]">{label}</span>
                        <svg
                            data-solution-check
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#91a8c8"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-[4.2cqw]"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                            />
                            <path d="m8 12 3 3 5-6" />
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CardArrow() {
    return (
        <span className="absolute bottom-[5%] right-[6%] grid size-[9cqw] place-items-center rounded-full bg-[#192b4510] text-[#4e5968] group-hover:bg-[#192b4520] group-focus-visible:bg-[#192b4520]">
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
                    <span className="inline-flex items-center -space-x-[0.4rem] align-middle text-[2rem] tablet:text-[2.8rem] pc:text-[3.6rem]">
                        {["방송", "콘텐츠", "성장"].map((label, index) => (
                            <span
                                key={label}
                                data-solution-chip
                                className={`inline-block rounded-full px-[1.6rem] py-[0.8rem] tablet:px-[2rem] tablet:py-[1rem] ${index === 1 ? "relative -top-[1rem] -rotate-[6deg] bg-[radial-gradient(ellipse_at_60%_90%,#c9bff1,#f0eff8_70%)] text-[#62528c]" : "bg-[#f2f4f6] text-[#626975]"}`}
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
                                    className={`relative aspect-[5/6] overflow-hidden [container-type:inline-size] ${card.background}`}
                                >
                                    <card.Visual />
                                    <CardArrow />
                                </div>
                                <div className="px-[0.8rem] pt-[2.4rem] tablet:px-[1.2rem] tablet:pt-[2.8rem] pc:pt-[3.2rem]">
                                    <h3
                                        id={`home-solution-${card.id}-title`}
                                        className="text-[2rem] tablet:text-[1.6rem] min-[64rem]:text-[2rem] pc:text-[2.2rem] font-[600] leading-[1.6] break-keep"
                                    >
                                        {card.title[0]}
                                        <br />
                                        {card.title[1]}
                                    </h3>
                                    <p className="mt-[1.2rem] text-[1.4rem] tablet:text-[1.2rem] pc:text-[1.6rem] font-[450] leading-[1.6] text-[#8b95a1]">{card.link}</p>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
