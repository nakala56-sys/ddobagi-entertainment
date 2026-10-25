"use client";

import { useEffect, useRef } from "react";
import { company } from "@/entities/company/constants/company";
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
            className="site-footer relative z-10 pt-[4.8rem] pb-[3.2rem] tablet:pt-[6.4rem] section-dark text-[#ffffff] bg-[#000000]"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto">
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
