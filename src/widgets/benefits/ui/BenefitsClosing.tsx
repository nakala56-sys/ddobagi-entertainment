"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ContactCreatorButton } from "@/features/contactCreator";
import Animation from "@/shared/utils/animation";

export function BenefitsClosing() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.benefits.section.closing(sectionRef.current);
    }, []);
    return (
        <section
            ref={sectionRef}
            className="closing relative overflow-clip min-h-[75svh] tablet:min-h-[85svh] flex items-center py-[8rem] tablet:py-[12rem] section-dark [--accent:#ffffff] text-[#ffffff] bg-[#000000]"
            aria-labelledby="benefits-closing-title"
        >
            <div
                className="closing-image absolute inset-0 opacity-[0.2]"
                data-image
            >
                <Image
                    className="grayscale"
                    src="/images/home/studio.webp"
                    alt="또바기 회사소개서에 담긴 방송 환경"
                    fill
                    sizes="100vw"
                />
            </div>
            <div className="closing-content relative text-center flex flex-col items-center gap-[3.2rem] tablet:gap-[3.6rem] content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto">
                <h2
                    className="text-[4rem] tablet:text-[6.8rem] pc:text-[11.2rem] leading-[1.5] font-[550]"
                    id="benefits-closing-title"
                    data-reveal
                >
                    GROW TOGETHER.
                    <br />
                    SHINE BRIGHTER.
                </h2>
                <p
                    className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#b5b5b5]"
                    data-reveal
                >
                    당신의 가능성을 믿고, 그 성장을 함께 만들어갑니다.
                </p>
                <div data-reveal>
                    <ContactCreatorButton />
                </div>
            </div>
        </section>
    );
}
