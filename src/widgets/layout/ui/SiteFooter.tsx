"use client";

import { useEffect, useRef } from "react";
import { company } from "@/entities/company/constants/company";
import Animation from "@/shared/utils/animation";
import { MetallicPaint } from "@/shared/ui/metallic-paint/MetallicPaint";

export function SiteFooter() {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!footerRef.current) return;
        return Animation.layout.footer(footerRef.current);
    }, []);

    useEffect(() => {
        const footer = footerRef.current;
        if (!footer) return;

        const syncFooterHeight = () => {
            document.documentElement.style.setProperty("--footer-height", `${footer.offsetHeight}px`);
        };

        syncFooterHeight();
        const resizeObserver = new ResizeObserver(syncFooterHeight);
        resizeObserver.observe(footer);

        return () => {
            resizeObserver.disconnect();
            document.documentElement.style.removeProperty("--footer-height");
        };
    }, []);

    return (
        <footer
            ref={footerRef}
            data-report-id="site-footer"
            data-report-type="group"
            className="site-footer relative z-10 pt-[4.8rem] pb-[3.2rem] tablet:pt-[6.4rem] section-dark text-[#f3f7ee] bg-[#20261f] border-t border-t-[#ffffff10]"
        >
            <div className="content-width w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] mx-auto">
                <div className="footer-bottom flex justify-between items-start tablet:items-end gap-[3.2rem] text-[1.2rem] text-[#c9cfc4] flex-col tablet:flex-row">
                    <section className="flex flex-col">
                        <section className="flex flex-col gap-[0.4rem]">
                            <MetallicPaint
                                imageSrc="/images/common/ttobagi-logo.webp"
                                preserveMaterial
                                color="#e8c46a"
                                width={52}
                                height={52}
                                edgeBend={1}
                            />
                            <strong className="text-[2.0rem] text-[#f3f7ee] font-semibold mb-[0.8rem]">{company.name}</strong>
                        </section>

                        <section className="flex flex-col gap-[0.4rem]">
                            <span>{company.address}</span>
                            <a
                                href={`tel:${company.phone.replaceAll("-", "")}`}
                                className="leading-[1.0]"
                            >
                                {company.phone}
                            </a>
                        </section>
                    </section>

                    <p className="leading-[1.0]">© {new Date().getFullYear()} DDOBAGI ENTERTAINMENT</p>
                </div>
            </div>
        </footer>
    );
}
