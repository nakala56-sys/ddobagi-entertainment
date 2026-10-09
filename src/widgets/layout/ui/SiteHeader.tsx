"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/shared/config/navigation";
import { ContactCreatorButton } from "@/features/contactCreator";
import Animation from "@/shared/utils/animation";
import { Sidebar } from "../Sidebar";

export function SiteHeader() {
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        if (!headerRef.current) return;
        return Animation.layout.header(headerRef.current);
    }, []);
    return <header ref={headerRef} className="site-header">
        <Link className="brand-logo" href="/" aria-label="또바기 엔터테인먼트 홈"><Image className="logo-symbol" src="/images/common/tobbagi-logo.webp" alt="" width={48} height={47} priority /><span>TOBBAGI<small>ENTERTAINMENT</small></span></Link>
        <nav className="desktop-navigation" aria-label="주 메뉴">{navigation.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav>
        <div className="header-actions"><ContactCreatorButton className="header-contact">Let’s Talk</ContactCreatorButton><button className="menu-toggle" type="button" aria-label="메뉴 열기" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(true)}><span /><span /></button></div>
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>;
}
