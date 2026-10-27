"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

const STUDIO_IMAGES = [
    { src: "/images/equipment/studio-room.webp", alt: "넓은 마루와 대형 거울이 있는 방송 스튜디오", width: 1600, height: 1200 },
    { src: "/images/equipment/studio-crown.webp", alt: "왕관 영상과 분홍빛 LED 화면으로 꾸민 방송 스튜디오", width: 1192, height: 1320 },
    { src: "/images/equipment/studio-neon.webp", alt: "파란색과 보라색 네온 영상이 펼쳐진 LED 방송 스튜디오", width: 1234, height: 1275 },
    { src: "/images/equipment/studio-stage.webp", alt: "천장과 벽면, 바닥 LED 화면에 분홍빛 나비 영상이 펼쳐진 방송 스튜디오", width: 1448, height: 1086 },
    { src: "/images/equipment/studio-orange.webp", alt: "주황빛 LED 화면과 소파, 촬영 장비가 있는 방송 스튜디오", width: 1086, height: 1448 },
] as const;

export function StudioEnvironment() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.equipment.section.studioEnvironment(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            data-report-id="equipment-studio"
            data-report-type="group"
            className="section py-[7.2rem] tablet:py-[12rem] section-dark bg-[#20261f] text-[#f3f7ee]"
            aria-labelledby="studio-environment-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto">
                <h2
                    id="studio-environment-title"
                    className="display-title text-[3rem] tablet:text-[4.8rem] pc:text-[5.8rem] font-[580] break-keep"
                    data-reveal
                >
                    콘텐츠가 시작되는 공간.
                </h2>
                <div
                    data-studio-gallery
                    data-lenis-prevent-touch
                    className="relative left-1/2 w-screen -translate-x-1/2 mt-[5.2rem] overflow-hidden cursor-grab select-none [touch-action:pan-y_pinch-zoom] data-[dragging=true]:cursor-grabbing focus-visible:outline-[0.2rem] focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[0.8rem]"
                    role="region"
                    aria-roledescription="슬라이드"
                    aria-label="스튜디오 사진. 좌우 방향키로 이동하고 스페이스 키로 자동 이동을 멈추거나 재생할 수 있습니다."
                    tabIndex={0}
                >
                    <div
                        data-loop-track
                        className="flex w-max will-change-transform"
                    >
                        {[0, 1, 2].map((copy) => (
                            <div
                                key={copy}
                                data-loop-group
                                aria-hidden={copy > 0 ? true : undefined}
                                className="flex shrink-0 gap-[0.2rem] pr-[0.2rem]"
                            >
                                {STUDIO_IMAGES.map((image) => (
                                    <Image
                                        key={image.src}
                                        src={image.src}
                                        alt={copy === 0 ? image.alt : ""}
                                        width={image.width}
                                        height={image.height}
                                        unoptimized
                                        loading="eager"
                                        draggable={false}
                                        className="block h-[30rem] tablet:h-[52rem] w-auto max-w-none shrink-0 pointer-events-none"
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="intro-bottom flex items-start tablet:items-end justify-between gap-[3.2rem] tablet:gap-[4rem] mt-[3.2rem] tablet:mt-[5.2rem] flex-col tablet:flex-row mb-0">
                    <p
                        className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#b5b5b5]"
                        data-reveal
                    >
                        개인 방송부터 함께 만드는 라이브 콘텐츠까지.
                        <br />
                        방송과 제작에 집중할 수 있는 공간을 소개합니다.
                    </p>
                </div>
            </div>
        </section>
    );
}
