"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/shared/config/navigation";
import Animation from "@/shared/utils/animation";
import { Sidebar } from "../Sidebar";
import { MetallicPaint } from "@/shared/ui/metallic-paint/MetallicPaint";

export function SiteHeader() {
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        if (!headerRef.current) return;
        return Animation.layout.header(headerRef.current);
    }, []);
    return (
        <header
            ref={headerRef}
            className={`site-header [--header-ink:var(--color-text)] fixed top-0 left-0 w-full z-[20] flex items-start justify-between gap-[1.6rem] py-0 text-[var(--header-ink)] px-[2rem] tablet:p-[3.2rem] pc:px-[4rem]`}
        >
            <Link
                className="flex-1 brand-logo flex items-start justify-start gap-[1.2rem] text-[1.6rem] tablet:text-[1.8rem] font-[750] leading-[1.0]"
                href="/"
                aria-label="또바기 엔터테인먼트 홈"
            >
                <MetallicPaint
                    imageSrc="/images/common/ttobagi-logo.webp"
                    // color="#ffffff"
                    color="#ffa16a"
                    width={52}
                    height={52}
                    edgeBend={0.8}
                />
                <p className="text-[2.4rem]">
                    TTOBAGI_<span className="text-[1.8rem]">ENTERTAINMENT</span>
                    {/* TTOBAGI<small>ENTERTAINMENT</small> */}
                </p>
            </Link>
            <nav
                className="flex-1 desktop-navigation hidden tablet:flex gap-[0.8rem] min-[64rem]:gap-[2rem] pc:gap-[3.6rem] text-[1.4rem] min-[64rem]:text-[1.6rem]"
                aria-label="주 메뉴"
            >
                {navigation.map((item) => (
                    <Link
                        className="text-[2.0rem]"
                        // className="text-[1.8rem] aria-[current=page]:text-current aria-[current=page]:underline aria-[current=page]:underline-offset-[0.8rem]"
                        key={item.href}
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
            <div className="header-actions flex items-center gap-[2rem]">
                {/* <ContactCreatorButton className="header-contact whitespace-nowrap [&.header-contact]:text-[1.2rem] [&.header-contact]:p-[1.2rem_1.6rem] [&.header-contact]:gap-[2rem] [&.header-contact]:hidden tablet:[&.header-contact]:inline-flex">
                    크리에이터 상담하기
                </ContactCreatorButton> */}
                <button
                    className="menu-toggle block tablet:hidden w-[4rem] h-[4rem] border-0 bg-transparent text-current leading-[1.0]"
                    type="button"
                    aria-label="메뉴 열기"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setMenuOpen(true)}
                >
                    <span className="block h-[0.4rem] bg-[currentColor] w-[2.8rem] m-[0.8rem]" />
                    <span className="block h-[0.4rem] bg-[currentColor] w-[2.8rem] m-[0.8rem]" />
                </button>
            </div>
            <Sidebar
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
        </header>
    );
}
