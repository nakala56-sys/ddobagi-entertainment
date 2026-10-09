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
    return <header ref={headerRef} className="site-header [--accent:#ffffff] h-23 absolute top-0 left-0 w-full z-[20] flex items-center justify-between p-[0_4rem] text-[white] border-b-[0.4rem] border-solid border-b-[#ffffff28] max-wide:px-8 max-site:h-19 max-site:px-5">
        <Link className="brand-logo flex items-center gap-3 text-lg font-[750] leading-[round(up,1.1em,0.4rem)] tracking-[round(nearest,0.07em,0.4rem)] [&_small]:block [&_small]:text-[0.8rem] [&_small]:tracking-[round(nearest,0.18em,0.4rem)] [&_small]:mt-1 [&_small]:font-[500] max-site:text-base" href="/" aria-label="또바기 엔터테인먼트 홈"><Image className="logo-symbol w-12 h-auto shrink-0 object-contain max-site:w-10" src="/images/common/tobbagi-logo.webp" alt="" width={48} height={47} priority /><span>TOBBAGI<small>ENTERTAINMENT</small></span></Link>
        <nav className="desktop-navigation flex gap-9 text-xs [&_a[aria-current=page]]:text-[#ffffff] [&_a[aria-current=page]]:underline [&_a[aria-current=page]]:underline-offset-[0.8rem] max-wide:gap-5 max-site:hidden" aria-label="주 메뉴">{navigation.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav>
        <div className="header-actions flex items-center gap-5"><ContactCreatorButton className="header-contact [&.header-contact]:text-xs [&.header-contact]:p-[1.2rem_1.6rem] [&.header-contact]:gap-5 [&.header-contact]:max-site:hidden">Let’s Talk</ContactCreatorButton><button className="menu-toggle hidden w-10 h-10 border-0 bg-transparent text-[white] [&_span]:block [&_span]:h-1 [&_span]:bg-[currentColor] [&_span]:w-7 [&_span]:m-2 max-site:block" type="button" aria-label="메뉴 열기" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(true)}><span /><span /></button></div>
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>;
}
