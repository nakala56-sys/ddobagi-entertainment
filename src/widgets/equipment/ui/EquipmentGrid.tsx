"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
            className="section py-[7.2rem] tablet:py-[12rem] section-cream bg-[#f5f5f5]"
            aria-labelledby="equipment-grid-title"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto">
                <h2
                    id="equipment-grid-title"
                    className="display-title text-[3.6rem] tablet:text-[4.8rem] pc:text-[8rem] font-[580]"
                    data-reveal
                >
                    방송에 필요한 장비와
                    <br />
                    <span className="accent text-[var(--accent,#000000)]">제작 환경.</span>
                </h2>
                <p
                    className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373]"
                    data-reveal
                >
                    카메라·조명·마이크·방송용 PC부터 스튜디오와 OBS 송출 시스템까지, 방송 환경에 맞춰 장비와 세팅을 안내합니다.
                </p>
                <div className="equipment-grid grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-3 gap-[3.2rem_2rem] tablet:gap-[4rem_2.4rem] mt-[6rem]">
                    {equipment.map((item) => (
                        <article
                            key={item.id}
                            className="equipment-card"
                            data-reveal
                        >
                            <div className="equipment-image relative h-[30rem] tablet:h-[28rem] overflow-clip">
                                <Image
                                    className="grayscale"
                                    src={item.image}
                                    alt={`${item.title} 관련 방송 환경`}
                                    fill
                                    sizes="(min-width: 90rem) 30vw, (min-width: 48rem) 45vw, 90vw"
                                />
                            </div>
                            <div className="equipment-card-copy pt-[2.4rem]">
                                <span className="eyebrow text-[1.2rem] font-[650] leading-[1.0] uppercase">{item.englishTitle}</span>
                                <h3 className="text-[2.4rem] font-[600] mt-[0.8rem] leading-[1.0]">{item.title}</h3>
                                <p className="mt-[1.2rem] text-[1.2rem] tablet:text-[1.6rem] text-[#737373] leading-[1.5]">{item.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
