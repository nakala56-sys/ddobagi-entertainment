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
    return <footer ref={footerRef} className="site-footer section-dark"><div className="content-width">
        <div className="footer-top"><div data-reveal><p className="eyebrow">ALWAYS BY YOUR SIDE</p><Link href="/" className="footer-wordmark">TOBBAGI<span>↗</span></Link></div><nav aria-label="하단 메뉴">{navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav></div>
        <div className="footer-bottom"><address><strong>{company.name}</strong><span>{company.address}</span><a href={`tel:${company.phone.replaceAll("-", "")}`}>{company.phone}</a></address><p>© {new Date().getFullYear()} TOBBAGI ENTERTAINMENT</p></div>
    </div></footer>;
}
