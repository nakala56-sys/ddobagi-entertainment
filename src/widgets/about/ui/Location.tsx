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
        try { await copyToClipboard(company.address); setCopyMessage("주소를 복사했습니다."); }
        catch { setCopyMessage("주소를 복사하지 못했습니다. 위 주소를 선택해 복사해주세요."); }
    };
    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.about.section.location(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="section py-30 max-site:py-18 section-cream bg-[#f5f5f5]" aria-labelledby="location-title"><div className="content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]">
            <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase" data-reveal>03 — FIND US</p><div className="section-heading flex items-end justify-between gap-10 mb-15 [.is-horizontal_&]:mb-8 [.is-pinned_&]:mb-8 max-site:items-start max-site:flex-col max-site:gap-8 max-site:mb-10"><h2 id="location-title" className="display-title text-[4rem] compact:text-[4rem] site:text-5xl wide:text-6xl xl:text-[8rem] 2xl:text-[8rem] leading-[round(up,1.13em,0.4rem)] font-[580] tracking-[round(nearest,-0.055em,0.4rem)] mt-7 [.split-copy_&]:m-0 [.split-copy_&]:text-4xl [.split-copy_&]:compact:text-4xl [.split-copy_&]:site:text-[4.4rem] [.split-copy_&]:wide:text-[5.2rem] [.split-copy_&]:xl:text-[6.8rem] [.split-copy_&]:2xl:text-[6.8rem] [.stack-card_&]:text-3xl [.stack-card_&]:compact:text-3xl [.stack-card_&]:site:text-4xl [.stack-card_&]:wide:text-[4.4rem] [.stack-card_&]:xl:text-[5.6rem] [.stack-card_&]:2xl:text-[5.6rem] [.stack-card_&]:my-8 max-site:text-4xl max-site:compact:text-[4rem] max-site:site:text-6xl max-site:wide:text-6xl max-site:xl:text-6xl max-site:2xl:text-6xl max-site:mt-5 max-site:[.split-copy_&]:text-[4rem] max-site:[.split-copy_&]:compact:text-[4rem] max-site:[.split-copy_&]:site:text-6xl max-site:[.split-copy_&]:wide:text-6xl max-site:[.split-copy_&]:xl:text-6xl max-site:[.split-copy_&]:2xl:text-6xl max-site:[.showcase-copy_&]:text-5xl max-site:[.stack-card_&]:text-[4rem]" data-reveal>새로운 시작을<br />만나는 곳.</h2><div data-reveal><address className="body-copy text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)] [.section-dark_&]:text-[#b5b5b5] [.showcase-copy_&]:mt-8 [.stack-card_&]:max-w-110 [.stack-card_&]:text-[#b5b5b5] max-site:[.showcase-copy_&]:mt-5">{company.address}</address><div className="button-row flex flex-wrap gap-6 mt-5"><a className="text-link inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent text-[inherit]" href={company.mapUrl} target="_blank" rel="noopener noreferrer">지도에서 보기 ↗<span className="sr-only absolute w-1 h-1 overflow-hidden [clip:rect(0,_0,_0,_0)] whitespace-nowrap"> (새 창)</span></a><button type="button" className="text-button inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent text-[inherit]" onClick={copyAddress}>주소 복사</button></div><p className="copy-status min-h-6 text-xs mt-3" role="status">{copyMessage}</p></div></div>
            <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="location-map block relative h-113 border-[0.4rem] border-solid border-[var(--line)] overflow-clip max-site:h-80" aria-label="네이버 지도에서 또바기 위치 보기 (새 창)" data-reveal><Image src="/images/about/location.svg" alt="서울 강남구 학동로4길에 위치한 또바기 주소 안내" fill sizes="90vw" /><span className="map-label absolute top-6 left-8 flex gap-5 text-xs tracking-[round(nearest,0.12em,0.4rem)] max-compact:left-5 max-compact:top-5">SEOUL · GANGNAM <span aria-hidden="true">↗</span></span></a>
        </div></section>
    );
}
