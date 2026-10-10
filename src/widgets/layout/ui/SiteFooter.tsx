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
            className="site-footer relative z-10 pt-15 pb-8 tablet:pt-20 section-dark [--accent:#ffffff] text-[var(--paper)] bg-[#000000]"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[min(132rem,_calc(100%_-_12rem))] mx-auto">
                <div className="footer-top flex justify-between items-start gap-10 pb-10 tablet:pb-15 flex-col tablet:flex-row">
                    <div data-reveal>
                        <p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">ALWAYS BY YOUR SIDE</p>
                        <Link
                            href="/"
                            className="footer-wordmark block text-[5.2rem] tablet:text-7xl pc:text-[12rem] leading-[round(up,1.2em,0.4rem)] font-[600] tracking-[round(nearest,-0.06em,0.4rem)] mt-5"
                        >
                            TOBBAGI<span className="text-[var(--accent)] ml-5">↗</span>
                        </Link>
                    </div>
                    <nav
                        className="flex flex-row tablet:flex-col gap-5 tablet:gap-3 pt-0 tablet:pt-5 text-xs flex-wrap tablet:flex-nowrap"
                        aria-label="하단 메뉴"
                    >
                        {navigation.map((item) => (
                            <Link
                                href={item.href}
                                key={item.href}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="footer-bottom flex justify-between items-start tablet:items-end gap-8 border-t-[0.4rem] border-solid border-t-[#ffffff25] pt-8 text-xs text-[#a6a6a6] flex-col tablet:flex-row">
                    <address className="flex flex-col gap-1">
                        <strong className="text-[var(--paper)] font-[550] mb-2">{company.name}</strong>
                        <span>{company.address}</span>
                        <a href={`tel:${company.phone.replaceAll("-", "")}`}>{company.phone}</a>
                    </address>
                    <p>© {new Date().getFullYear()} TOBBAGI ENTERTAINMENT</p>
                </div>
            </div>
        </footer>
    );
}
