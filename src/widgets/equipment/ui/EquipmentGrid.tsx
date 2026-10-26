"use client";

import { useEffect, useRef } from "react";
import { equipment } from "@/entities/equipment/constants/equipment";
import Animation from "@/shared/utils/animation";

export function EquipmentGrid() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.equipment.section.grid(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            data-report-id="equipment-grid"
            data-report-type="group"
            className="section py-[7.2rem] tablet:py-[12rem] section-cream bg-[var(--color-background)]"
            aria-labelledby="equipment-grid-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto">
                <h2
                    id="equipment-grid-title"
                    className="display-title text-[3rem] tablet:text-[4.8rem] pc:text-[5.8rem] font-[580] break-keep"
                    data-reveal
                >
                    방송에 필요한 준비,
                    <br />
                    <span className="accent text-[var(--accent,#000000)]">이렇게 지원합니다.</span>
                </h2>
                <p
                    className="body-copy mt-[2.4rem] text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373] break-keep"
                    data-reveal
                >
                    방송용 PC부터 스튜디오와 송출 시스템까지, 방송에 필요한 장비와 환경을 지원합니다.
                </p>
                <div className="equipment-grid grid grid-cols-2 pc:grid-cols-3 gap-[1.6rem] mt-[4rem] tablet:mt-[6rem]">
                    {equipment.map((item) => (
                        <article
                            key={item.id}
                            data-report-id={`equipment-${item.id}`}
                            data-report-type="item"
                            className="equipment-card flex flex-col items-start gap-[1.6rem] rounded-[16px] bg-[#ffffff10] p-[1.6rem]"
                            data-reveal
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 -960 960 960"
                                fill="currentColor"
                                className="shrink-0"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d={item.iconPath} />
                            </svg>
                            <h3 className="text-[1.6rem] tablet:text-[2rem] font-[600] leading-[1.5] break-keep">{item.title}</h3>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
