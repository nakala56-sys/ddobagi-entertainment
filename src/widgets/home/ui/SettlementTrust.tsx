"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";

const HUNDREDS = ["0", "1"];
const TENS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const ONES = Array.from({ length: 101 }, (_, index) => String(index % 10));

const PLACES = [
    { name: "hundreds", digits: HUNDREDS, shift: "-1em" },
    { name: "tens", digits: TENS, shift: "-10em" },
    { name: "ones", digits: ONES, shift: "-100em" },
] as const;

export function SettlementTrust() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.settlementTrust(sectionRef.current);
    }, []);

    return (
        <section
            ref={sectionRef}
            data-report-id="home-settlement"
            data-report-type="group"
            className="section relative z-10 bg-[var(--color-background)]"
            aria-labelledby="home-settlement-title"
        >
            <div
                data-settlement-stage
                className="relative flex min-h-svh items-center justify-center"
            >
                <div
                    data-settlement-gauge
                    aria-hidden="true"
                    className="absolute inset-0 origin-left bg-[color-mix(in_srgb,var(--accent)_16%,transparent)]"
                    style={{ transform: "scaleX(1)" }}
                />
                <div className="content-width relative z-10 mx-auto flex w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] flex-col items-center text-center">
                    <h2
                        id="home-settlement-title"
                        className="display-title text-[3rem] tablet:text-[4.8rem] pc:text-[5.8rem] leading-[1.5] font-[580] break-keep"
                        data-title-rise
                    >
                        활동 성과에 따라,
                        <br />
                        투명하게 정산합니다.
                    </h2>
                    <p className="sr-only">100%</p>
                    <p
                        className="mt-[2.4rem] tablet:mt-[4rem] flex items-end justify-center font-[580] leading-none text-[var(--accent)] tabular-nums text-[clamp(8.8rem,24vw,20rem)]"
                        data-settlement-figure
                        aria-hidden="true"
                    >
                        {PLACES.map((place) => (
                            <span
                                key={place.name}
                                data-settlement-column={place.name}
                                className="block h-[1em] min-w-0 overflow-hidden"
                            >
                                <span
                                    data-settlement-track={place.name}
                                    className="block"
                                    style={{ transform: `translateY(${place.shift})` }}
                                >
                                    {place.digits.map((digit, index) => (
                                        <span
                                            key={`${place.name}-${index}`}
                                            className="block h-[1em] leading-none"
                                        >
                                            {digit}
                                        </span>
                                    ))}
                                </span>
                            </span>
                        ))}
                        <span className="mb-[0.08em] text-[0.42em] leading-none">%</span>
                    </p>
                    <p
                        className="body-copy mt-[3.2rem] max-w-[64rem] text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373] break-keep"
                        data-reveal
                    >
                        실제 방송 활동과 개인별 성과를 기준으로,
                        <br />
                        정산을 투명하게 관리하고 지급합니다.
                    </p>
                </div>
            </div>
        </section>
    );
}
