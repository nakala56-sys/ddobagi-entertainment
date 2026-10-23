"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { company } from "@/entities/company/constants/company";
import { navigation } from "@/shared/config/navigation";
import Animation from "@/shared/utils/animation";

export function SiteFooter() {
    const footerRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (!footerRef.current) return;
        return Animation.layout.footer(footerRef.current);
    }, []);
    return (
        <footer
            ref={footerRef}
            className="site-footer relative z-10 pt-[6rem] pb-[3.2rem] tablet:pt-[8rem] section-dark text-[#ffffff] bg-[#000000]"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto">
                <div className="footer-top flex justify-between items-start gap-[4rem] pb-[4rem] tablet:pb-[6rem] flex-col tablet:flex-row">
                    <div data-reveal>
                        <p className="eyebrow text-[1.2rem] font-[650] leading-[1.0] uppercase">ALWAYS BY YOUR SIDE</p>
                        <Link
                            href="/"
                            className="footer-wordmark block text-[5.2rem] tablet:text-[7.2rem] pc:text-[12rem] leading-[1.0] font-[600] mt-[2rem]"
                        >
                            TTOBAGI<span className="text-[var(--accent,#000000)] ml-[2rem]">↗</span>
                        </Link>
                    </div>
                    <nav
                        className="flex flex-row tablet:flex-col gap-[2rem] tablet:gap-[1.2rem] pt-0 tablet:pt-[2rem] text-[1.2rem] flex-wrap tablet:flex-nowrap"
                        aria-label="하단 메뉴"
                    >
                        {navigation.map((item) => (
                            <Link
                                href={item.href}
                                key={item.href}
                                className="leading-[1.0]"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="footer-bottom flex justify-between items-start tablet:items-end gap-[3.2rem] border-t-[0.4rem] border-solid border-t-[#ffffff25] pt-[3.2rem] text-[1.2rem] text-[#a6a6a6] flex-col tablet:flex-row">
                    <address className="flex flex-col gap-[0.4rem]">
                        <strong className="text-[#ffffff] font-[550] mb-[0.8rem]">{company.name}</strong>
                        <span>{company.address}</span>
                        <a
                            href={`tel:${company.phone.replaceAll("-", "")}`}
                            className="leading-[1.0]"
                        >
                            {company.phone}
                        </a>
                    </address>
                    <p className="leading-[1.0]">© {new Date().getFullYear()} TTOBAGI ENTERTAINMENT</p>
                </div>
            </div>
        </footer>
    );
}
