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
        <section ref={sectionRef} className="section section-cream" aria-labelledby="location-title"><div className="content-width">
            <p className="eyebrow" data-reveal>03 — FIND US</p><div className="section-heading"><h2 id="location-title" className="display-title" data-reveal>새로운 시작을<br />만나는 곳.</h2><div data-reveal><address className="body-copy">{company.address}</address><div className="button-row"><a className="text-link" href={company.mapUrl} target="_blank" rel="noopener noreferrer">지도에서 보기 ↗<span className="sr-only"> (새 창)</span></a><button type="button" className="text-button" onClick={copyAddress}>주소 복사</button></div><p className="copy-status" role="status">{copyMessage}</p></div></div>
            <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="location-map" aria-label="네이버 지도에서 또바기 위치 보기 (새 창)" data-reveal><Image src="/images/about/location.svg" alt="서울 강남구 학동로4길에 위치한 또바기 주소 안내" fill sizes="90vw" /><span className="map-label">SEOUL · GANGNAM <span aria-hidden="true">↗</span></span></a>
        </div></section>
    );
}
