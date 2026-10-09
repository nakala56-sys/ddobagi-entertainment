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
    return <footer ref={footerRef} className="site-footer py-[8rem_3.2rem] max-site:pt-15 section-dark [--accent:#ffffff] text-[var(--paper)] bg-[#000000]"><div className="content-width w-[min(132rem,_calc(100%_-_12rem))] mx-auto max-wide:w-[calc(100%_-_8rem)] max-site:w-[calc(100%_-_4rem)]">
        <div className="footer-top flex justify-between items-start gap-10 pb-15 [&_nav]:flex [&_nav]:flex-col [&_nav]:gap-3 [&_nav]:pt-5 [&_nav]:text-xs max-site:flex-col max-site:pb-10 max-site:[&_nav]:flex-row max-site:[&_nav]:flex-wrap max-site:[&_nav]:gap-5 max-site:[&_nav]:p-0"><div data-reveal><p className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">ALWAYS BY YOUR SIDE</p><Link href="/" className="footer-wordmark block text-[5.2rem] compact:text-[5.2rem] site:text-7xl wide:text-[8.8rem] xl:text-[11.6rem] 2xl:text-[12rem] leading-[round(up,1.2em,0.4rem)] font-[600] tracking-[round(nearest,-0.06em,0.4rem)] mt-5 [&_span]:text-[var(--accent)] [&_span]:ml-5">TOBBAGI<span>↗</span></Link></div><nav aria-label="하단 메뉴">{navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav></div>
        <div className="footer-bottom flex justify-between items-end gap-8 border-t-[0.4rem] border-solid border-t-[#ffffff25] pt-8 text-xs text-[#a6a6a6] [&_address]:flex [&_address]:flex-col [&_address]:gap-1 [&_strong]:text-[var(--paper)] [&_strong]:font-[550] [&_strong]:mb-2 max-site:items-start max-site:flex-col max-site:text-xs"><address><strong>{company.name}</strong><span>{company.address}</span><a href={`tel:${company.phone.replaceAll("-", "")}`}>{company.phone}</a></address><p>© {new Date().getFullYear()} TOBBAGI ENTERTAINMENT</p></div>
    </div></footer>;
}
