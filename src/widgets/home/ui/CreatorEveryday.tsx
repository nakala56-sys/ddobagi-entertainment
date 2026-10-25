"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

const PHOTOS = [
    { src: "/images/landing/bj.jpg", alt: "나만의 콘텐츠로 방송하는 크리에이터", position: "65% center" },
    { src: "/images/landing/room.jpg", alt: "방송에 집중할 수 있도록 준비된 개인 스튜디오", position: "center" },
    { src: "/images/services/management.jpg", alt: "새로운 활동을 함께 준비하는 크리에이터와 파트너", position: "55% center" },
    { src: "/images/home/moment-script.jpg", alt: "콘텐츠 방향을 함께 이야기하는 제작 현장", position: "42% center" },
] as const;

const TILES = [
    {
        column: 1,
        side: "top",
        label: "CREATIVE DIRECTION",
        lines: ["함께 찾는", "나만의 방향"],
        background: "bg-[linear-gradient(145deg,#eef1fb,#e9f0f8)]",
        icon: "M4 19V9m0 0 4 4M4 9l4-4h12m-4-4 4 4-4 4",
        decoration: "orbit",
    },
    {
        column: 2,
        side: "top",
        label: "ALL IN ONE",
        lines: ["기획부터", "촬영까지"],
        background: "bg-[linear-gradient(145deg,#f8eeed,#f4f3ee)]",
        icon: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z",
        decoration: "",
    },
    {
        column: 3,
        side: "top",
        label: "MY OWN CONTENT",
        lines: ["내 매력을 담은", "콘텐츠"],
        background: "bg-[linear-gradient(145deg,#f5f1fc,#f9f2e9)]",
        icon: "M9 4h6l2 3h4v13H3V7h4Zm3 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
        decoration: "ticket",
    },
    {
        column: 0,
        side: "bottom",
        label: "YOUR NEXT STORY",
        lines: ["좋아하는 일이", "콘텐츠가 되도록"],
        background: "bg-[linear-gradient(145deg,#eee9f8,#eaf6f8)]",
        icon: "m8 5 11 7-11 7Z",
        decoration: "grid",
    },
    {
        column: 1,
        side: "bottom",
        label: "CREATOR STUDIO",
        lines: ["나에게 맞춘", "방송 환경"],
        background: "bg-[linear-gradient(145deg,#e8f7fc,#edf1f7)]",
        icon: "M3 4h18v13H3Zm5 17h8m-4-4v4",
        decoration: "",
    },
    {
        column: 2,
        side: "bottom",
        label: "GROW TOGETHER",
        lines: ["오늘의 방송이", "내일의 가능성으로"],
        background: "bg-[linear-gradient(145deg,#e7eefb,#f1f4f8)]",
        icon: "M4 19 10 13l4 3 6-11m-6 0h6v6",
        decoration: "bars",
    },
] as const;

const CARD_CLASS = "relative overflow-hidden rounded-[2.8rem] tablet:rounded-[2rem] min-[52.125rem]:rounded-[2.4vw] min-[125rem]:rounded-[4.8rem] data-[everyday=true]:absolute data-[everyday=true]:aspect-auto";
const COPY_CLASS = "relative z-20 mx-auto w-[calc(100%_-_4rem)] max-w-[132rem] tablet:w-[calc(100%_-_8rem)] data-[everyday=true]:absolute data-[everyday=true]:m-0";
const TITLE_CLASS = "text-[3.2rem] tablet:text-[3.6rem] min-[59.25rem]:text-[3.8vw] min-[105.3125rem]:text-[6.4rem] font-[650] leading-[1.5] break-keep";
const BODY_CLASS = "mt-[2.4rem] text-[1.5rem] tablet:text-[1.8rem] font-[450] leading-[1.5] text-[#7b8491] break-keep";

export function CreatorEveryday() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.creatorEveryday(sectionRef.current);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="creator-everyday relative z-10 bg-[var(--color-background)] text-[var(--color-text)]"
            aria-labelledby="home-everyday-title"
        >
            <div
                data-everyday-target
                data-everyday-stage
                className="relative overflow-hidden py-[8rem] tablet:py-[12rem] data-[everyday=true]:h-svh data-[everyday=true]:p-0"
            >
                <div
                    data-everyday-target
                    data-everyday-intro
                    data-reveal
                    className={COPY_CLASS}
                >
                    <h2
                        id="home-everyday-title"
                        className={TITLE_CLASS}
                    >
                        또바기가 <span className="text-[#31598a]">바꾼</span> 일상
                    </h2>
                    <p className={BODY_CLASS}>
                        방송 준비부터 콘텐츠가 완성되는 순간까지.
                        <br />
                        복잡한 준비는 가볍게, 나의 콘텐츠에 더 집중하세요.
                    </p>
                </div>

                <div
                    data-everyday-target
                    className="relative mx-auto mt-[4rem] grid w-[calc(100%_-_4rem)] max-w-[132rem] grid-cols-2 gap-[1.6rem] tablet:mt-[5.6rem] tablet:w-[calc(100%_-_8rem)] tablet:grid-cols-4 tablet:gap-[2rem] data-[everyday=true]:absolute data-[everyday=true]:inset-0 data-[everyday=true]:m-0 data-[everyday=true]:block data-[everyday=true]:w-full data-[everyday=true]:max-w-none"
                >
                    {PHOTOS.map((photo) => (
                        <div
                            key={photo.src}
                            data-everyday-target
                            data-everyday-photo
                            data-reveal
                            className={`${CARD_CLASS} aspect-[3/4]`}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="(min-width: 48rem) 24vw, 50vw"
                                className="object-cover"
                                style={{ objectPosition: photo.position }}
                            />
                        </div>
                    ))}

                    {TILES.map((tile) => (
                        <div
                            key={tile.label}
                            data-everyday-target
                            data-everyday-tile
                            data-everyday-extra
                            data-column={tile.column}
                            data-side={tile.side}
                            data-reveal
                            className={`${CARD_CLASS} ${tile.background} flex aspect-square flex-col justify-between p-[2rem] tablet:p-[1.6rem] min-[50rem]:p-[2vw] min-[100rem]:p-[3.2rem] text-[#4e5968]`}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="relative z-10 size-[2.4rem] tablet:size-[1.8rem] min-[56.25rem]:size-[2vw] min-[100rem]:size-[3.2rem]"
                                aria-hidden="true"
                            >
                                <path d={tile.icon} />
                            </svg>
                            {tile.decoration === "orbit" && (
                                <div
                                    aria-hidden="true"
                                    className="absolute -right-1/4 -top-1/4 size-full rounded-full border-[2.4rem] border-white/40"
                                />
                            )}
                            {tile.decoration === "ticket" && (
                                <div
                                    aria-hidden="true"
                                    className="absolute -right-[12%] top-[18%] h-1/2 w-[80%] -rotate-[18deg] rounded-[1.6rem] bg-white/65"
                                />
                            )}
                            {tile.decoration === "grid" && (
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 opacity-50 [background-image:radial-gradient(#b9c5e2_30%,transparent_32%)] [background-size:2.4rem_2.4rem] [mask-image:linear-gradient(black,transparent_85%)]"
                                />
                            )}
                            {tile.decoration === "bars" && (
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-x-[10%] top-[35%] flex h-[12%] items-end gap-[3%] opacity-40"
                                >
                                    {Array.from({ length: 16 }, (_, index) => (
                                        <span
                                            key={index}
                                            className="flex-1 rounded-full bg-[#9eb7df]"
                                            style={{ height: `${35 + (index % 5) * 15}%` }}
                                        />
                                    ))}
                                </div>
                            )}
                            <div className="relative z-10">
                                <p className="mb-[0.8rem] text-[0.9rem] tablet:text-[0.8rem] min-[66.6875rem]:text-[0.75vw] min-[91.6875rem]:text-[1.1rem] font-[550] text-[#87909c] leading-[1.0]">{tile.label}</p>
                                <p className="text-[1.8rem] tablet:text-[1.4rem] min-[62.5rem]:text-[1.4vw] min-[116.125rem]:text-[2.6rem] font-[550] leading-[1.5] break-keep">
                                    {tile.lines[0]}
                                    <br />
                                    {tile.lines[1]}
                                </p>
                            </div>
                        </div>
                    ))}

                    {[-1, 4].flatMap((column) =>
                        [0, 1].map((row) => (
                            <div
                                key={`${column}-${row}`}
                                data-everyday-target
                                data-everyday-extra
                                data-everyday-ghost
                                data-column={column}
                                data-row={row}
                                aria-hidden="true"
                                className={`${CARD_CLASS} hidden bg-[#f4f6f8] data-[everyday=true]:block`}
                            />
                        )),
                    )}
                </div>

                <div
                    data-everyday-target
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 hidden bg-[linear-gradient(90deg,white,transparent_14%,transparent_86%,white)] data-[everyday=true]:block"
                />
                <div
                    data-everyday-target
                    data-everyday-fade
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-[44%] bg-[linear-gradient(transparent,white_52%)] data-[everyday=true]:block"
                />
                <div
                    data-everyday-target
                    data-everyday-outro
                    data-reveal
                    className={`${COPY_CLASS} mt-[4.8rem] tablet:mt-[6.4rem]`}
                >
                    <h3 className={TITLE_CLASS}>
                        또바기가 <span className="bg-[linear-gradient(100deg,#283e63,#638bb8)] bg-clip-text text-transparent">바꿀 내일</span>
                    </h3>
                    <p className={BODY_CLASS}>
                        상상하던 콘텐츠가 나의 다음 이야기가 되는 곳.
                        <br />더 넓은 무대와 새로운 기회를 함께 만들어가세요.
                    </p>
                </div>
            </div>
        </section>
    );
}
