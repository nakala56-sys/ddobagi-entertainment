"use client";

import { useEffect, useRef, useState } from "react";
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
            data-report-id="about-location"
            data-report-type="group"
            className="section py-[7.2rem] tablet:py-[12rem] section-cream bg-[var(--color-background)]"
            aria-labelledby="location-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto">
                <div className="section-heading flex items-start tablet:items-end justify-between gap-[3.2rem] tablet:gap-[4rem] mb-[4rem] tablet:mb-[6rem] flex-col tablet:flex-row">
                    <h2
                        id="location-title"
                        className="display-title text-[3.6rem] tablet:text-[4.8rem] pc:text-[5.8rem] font-[580]"
                        data-reveal
                    >
                        오시는 길.
                    </h2>
                    <div data-reveal>
                        <address className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373]">{company.address}</address>
                        <div className="button-row flex flex-wrap gap-[2.4rem] mt-[2rem]">
                            <a
                                className="text-[inherit] inline-flex gap-[3.2rem] items-center font-[650] text-[1.6rem] py-[1.2rem] border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent leading-[1.0]"
                                href={company.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                지도에서 보기 ↗<span className="sr-only absolute w-[0.4rem] h-[0.4rem] overflow-hidden [clip:rect(0,_0,_0,_0)] whitespace-nowrap"> (새 창)</span>
                            </a>
                            <button
                                type="button"
                                className="text-[inherit] inline-flex gap-[3.2rem] items-center font-[650] text-[1.6rem] py-[1.2rem] border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent leading-[1.0]"
                                onClick={copyAddress}
                            >
                                주소 복사
                            </button>
                        </div>
                        <p
                            className="copy-status min-h-[2.4rem] text-[1.2rem] mt-[1.2rem] leading-[1.0]"
                            role="status"
                        >
                            {copyMessage}
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="location-map w-full h-[32rem] tablet:h-[45.2rem] overflow-clip leading-[1.0]"
                data-reveal
            >
                <iframe
                    title={`${company.name} 위치 안내 지도`}
                    src={company.mapEmbedUrl}
                    className="block w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </div>
        </section>
    );
}
