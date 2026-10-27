"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Animation from "@/shared/utils/animation";

const actionClass =
    "grid size-[5.2rem] place-items-center overflow-hidden rounded-full shadow-[0_0.8rem_2.4rem_rgba(35,36,30,0.18)] focus-visible:outline-2 focus-visible:outline-offset-[0.4rem] focus-visible:outline-[var(--color-point)]";

function TopIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="size-[2rem]"
            aria-hidden="true"
        >
            <path
                d="M12 18V6M6.5 11.5 12 6l5.5 5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function QuickActions() {
    const [raised, setRaised] = useState(false);

    useEffect(() => {
        const update = () => setRaised(window.scrollY > 1);
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <div
            data-report-id="quick-actions"
            data-report-type="group"
            className={`fixed top-1/2 right-[1.6rem] z-30 flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none tablet:right-[2.4rem] ${raised ? "-translate-y-[calc(50%+3.2rem)]" : "-translate-y-1/2"}`}
        >
            <a
                data-report-id="quick-kakao"
                data-report-type="item"
                className={`${actionClass} mb-[1.2rem]`}
                href="https://open.kakao.com/o/saUb2nUi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="카카오톡 상담"
            >
                <Image
                    src="/images/common/kakao-talk.png"
                    alt=""
                    width={554}
                    height={554}
                    unoptimized
                    className="size-full object-cover"
                />
                <span className="sr-only absolute h-[0.4rem] w-[0.4rem] overflow-hidden [clip:rect(0,_0,_0,_0)] whitespace-nowrap"> (새 창)</span>
            </a>
            <a
                data-report-id="quick-instagram"
                data-report-type="item"
                className={actionClass}
                href="https://www.instagram.com/ddobagi_ent?srtk=aXFkbmt6MTVjY3hp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="인스타그램"
            >
                <Image
                    src="/images/common/instagram.png"
                    alt=""
                    width={1000}
                    height={1000}
                    unoptimized
                    className="size-full object-cover"
                />
                <span className="sr-only absolute h-[0.4rem] w-[0.4rem] overflow-hidden [clip:rect(0,_0,_0,_0)] whitespace-nowrap"> (새 창)</span>
            </a>
            <button
                type="button"
                data-report-id="quick-top"
                data-report-type="item"
                className={`absolute top-[calc(100%+1.2rem)] left-0 grid size-[5.2rem] place-items-center rounded-full bg-[#20261f] text-[#faf9f5] shadow-[0_0.8rem_2.4rem_rgba(35,36,30,0.18)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-[0.4rem] focus-visible:outline-[var(--color-point)] motion-reduce:transition-none ${raised ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[1.2rem] opacity-0"}`}
                aria-label="맨 위로 이동"
                aria-hidden={raised ? undefined : true}
                tabIndex={raised ? 0 : -1}
                onClick={() => Animation.layout.scrollToTopSmooth()}
            >
                <TopIcon />
            </button>
        </div>
    );
}
