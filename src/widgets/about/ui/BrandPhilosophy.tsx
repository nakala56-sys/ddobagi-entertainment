"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Animation from "@/shared/utils/animation";

export function BrandPhilosophy() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.about.section.brandPhilosophy(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            data-report-id="about-philosophy"
            data-report-type="group"
            className="section py-[7.2rem] tablet:py-[12rem] content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto"
            aria-labelledby="philosophy-title"
        >
            <div className="split-layout grid grid-cols-1 tablet:grid-cols-2 items-center gap-[4rem] pc:gap-[7.2rem] philosophy-layout [&.philosophy-layout]:items-start">
                <div
                    className="philosophy-image relative"
                    data-reveal
                >
                    <div className="portrait-image relative h-[44rem] tablet:h-[68rem] overflow-clip">
                        <Image
                            src="/images/about/brand-set.jpg"
                            alt="촬영 현장에서 대본을 두고 이야기하는 장면"
                            fill
                            unoptimized
                            sizes="(min-width: 48rem) 45vw, 90vw"
                            className="object-cover object-[-110px]"
                        />
                    </div>
                </div>
                <div className="split-copy flex flex-col items-start gap-[2.4rem] tablet:gap-[3.2rem] break-keep">
                    <h2
                        id="philosophy-title"
                        className="display-title text-[3.6rem] tablet:text-[4rem] pc:text-[3.2rem] leading-[1.5] font-[580] m-0 break-keep"
                        data-reveal
                    >
                        안녕하세요
                    </h2>
                    <p
                        className="body-copy font-semibold text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373]"
                        data-reveal
                    >
                        사람의 매력을 발견하고, 그 가능성을 함께 키워갑니다.
                    </p>
                    <p
                        className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373]"
                        data-reveal
                    >
                        또바기 엔터테인먼트는 각자가 가진 개성과 매력을 소중하게 생각합니다.
                    </p>
                    <p
                        className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373]"
                        data-reveal
                    >
                        누군가를 단순히 보여주는 것에 그치지 않고, 자신만의 색깔을 가진 크리에이터와 아티스트로 성장할 수 있도록 함께 고민하고 만들어갑니다.
                    </p>
                    <p
                        className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373]"
                        data-reveal
                    >
                        콘텐츠 기획부터 방송, 매니지먼트까지
                        <br />
                        각자의 장점이 가장 자연스럽게 빛날 수 있는 방향을 찾고, 오래 함께할 수 있는 환경을 만드는 것이 또바기 엔터테인먼트가 하는 일입니다.
                    </p>
                    <p
                        className="body-copy font-semibold text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#ff4321]"
                        data-reveal
                    >
                        꾸준히, 한결같이, 함께.
                    </p>
                    <p
                        className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373]"
                        data-reveal
                    >
                        ‘또바기’라는 이름처럼 변함없는 마음으로
                        <br />
                        새로운 가능성을 만들어가겠습니다.
                    </p>
                </div>
            </div>
        </section>
    );
}
