"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { company } from "@/entities/company/constants/company";
import { copyToClipboard } from "@/shared/lib/clipboard";
import Animation from "@/shared/utils/animation";

export function Location() {
    const sectionRef = useRef<HTMLElement>(null);
    const [copyMessage, setCopyMessage] = useState("");
    const copyAddress = async () => {
        try {
            await copyToClipboard(company.address);
            setCopyMessage("주소를 복사했습니다.");
        } catch {
            setCopyMessage("주소를 복사하지 못했습니다. 위 주소를 선택해 복사해주세요.");
        }
    };
    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.about.section.location(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="section py-18 tablet:py-30 section-cream bg-[#f5f5f5]"
            aria-labelledby="location-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto">
                <p
                    className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase"
                    data-reveal
                >
                    03 — FIND US
                </p>
                <div
                    data-horizontal-target
                    data-pinned-target
                    className="section-heading flex items-start tablet:items-end justify-between gap-8 tablet:gap-10 mb-10 tablet:mb-15 data-[horizontal=true]:mb-8 data-[pinned=true]:mb-8 flex-col tablet:flex-row"
                >
                    <h2
                        id="location-title"
                        className="display-title text-4xl tablet:text-5xl pc:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-5 tablet:mt-7"
                        data-reveal
                    >
                        새로운 시작을
                        <br />
                        만나는 곳.
                    </h2>
                    <div data-reveal>
                        <address className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)]">{company.address}</address>
                        <div className="button-row flex flex-wrap gap-6 mt-5">
                            <a
                                className="text-[inherit] inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent"
                                href={company.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                지도에서 보기 ↗<span className="sr-only absolute w-1 h-1 overflow-hidden [clip:rect(0,_0,_0,_0)] whitespace-nowrap"> (새 창)</span>
                            </a>
                            <button
                                type="button"
                                className="text-[inherit] inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent"
                                onClick={copyAddress}
                            >
                                주소 복사
                            </button>
                        </div>
                        <p
                            className="copy-status min-h-6 text-xs mt-3"
                            role="status"
                        >
                            {copyMessage}
                        </p>
                    </div>
                </div>
                <a
                    href={company.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="location-map block relative h-80 tablet:h-113 border-[0.4rem] border-solid border-[var(--line)] overflow-clip"
                    aria-label="네이버 지도에서 또바기 위치 보기 (새 창)"
                    data-reveal
                >
                    <Image
                        className="grayscale"
                        src="/images/about/location.svg"
                        alt="서울 강남구 학동로4길에 위치한 또바기 주소 안내"
                        fill
                        sizes="90vw"
                    />
                    <span className="map-label absolute top-5 tablet:top-6 left-5 tablet:left-8 flex gap-5 text-xs tracking-[round(nearest,0.12em,0.4rem)]">
                        SEOUL · GANGNAM <span aria-hidden="true">↗</span>
                    </span>
                </a>
            </div>
        </section>
    );
}
