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
    const isHome = pathname === "/";
    return (
        <header
            ref={headerRef}
            className={`site-header [--accent:#17212b] [--header-ink:#17212b] h-19 tablet:h-23 absolute top-0 left-0 w-full z-[20] flex items-center justify-between py-0 text-[var(--header-ink)] px-5 tablet:px-8 pc:px-10`}
        >
            <Link
                className="brand-logo flex items-center gap-3 text-base tablet:text-lg font-[750] leading-[round(up,1.1em,0.4rem)] tracking-[round(nearest,0.07em,0.4rem)]"
                href="/"
                aria-label="또바기 엔터테인먼트 홈"
            >
                <Image
                    className={`logo-symbol w-10 tablet:w-12 h-auto shrink-0 object-contain grayscale ${isHome ? "" : ""} `}

                    src="/images/common/tobbagi-logo.webp"
                    alt=""
                    width={48}
                    height={47}
                    priority
                />
                <section className="flex flex-col">
                    <p className="text-[1.6rem]">TOBBAGI</p>
                    <p className="text-[1.6rem]">ENTERTAINMENT</p>
                </section>
                {/* <span>
                    TOBBAGI<small>ENTERTAINMENT</small>
                </span> */}
            </Link>
            <nav
                className="desktop-navigation hidden tablet:flex gap-5 pc:gap-9 text-[1.6rem]"
                aria-label="주 메뉴"
            >
                {navigation.map((item) => (
                    <Link
                        className="aria-[current=page]:text-current aria-[current=page]:underline aria-[current=page]:underline-offset-[0.8rem]"
                        key={item.href}
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
            <div className="header-actions flex items-center gap-5">
                <ContactCreatorButton className="header-contact [&.header-contact]:text-xs [&.header-contact]:p-[1.2rem_1.6rem] [&.header-contact]:gap-5 [&.header-contact]:hidden tablet:[&.header-contact]:inline-flex">
                    Let’s Talk
                </ContactCreatorButton>
                <button
                    className="menu-toggle block tablet:hidden w-10 h-10 border-0 bg-transparent text-current"
                    type="button"
                    aria-label="메뉴 열기"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setMenuOpen(true)}
                >
                    <span className="block h-1 bg-[currentColor] w-7 m-2" />
                    <span className="block h-1 bg-[currentColor] w-7 m-2" />
                </button>
            </div>
            <Sidebar
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
        </header>
    );
}
