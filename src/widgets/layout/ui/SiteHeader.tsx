"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { navigation } from "@/shared/config/navigation";
import { showToast } from "@/shared/lib/toast";
import Animation from "@/shared/utils/animation";
import { Sidebar } from "../Sidebar";
import { MetallicPaint } from "@/shared/ui/metallic-paint/MetallicPaint";

function isPlainClick(event: MouseEvent<HTMLAnchorElement>) {
    return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function SiteHeader() {
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const blockSameRoute = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!isPlainClick(event) || pathname !== href) return;
        event.preventDefault();
        showToast({ msg: "이미 해당 페이지를 보고 있어요" });
    };
    useEffect(() => {
        if (!headerRef.current) return;
        return Animation.layout.header(headerRef.current);
    }, []);
    return (
        <header
            ref={headerRef}
            data-report-id="site-header"
            data-report-type="group"
            className={`site-header [--header-ink:var(--color-text)] fixed top-0 left-0 w-full z-[20] flex items-start justify-between gap-[1.6rem] py-0 text-[var(--header-ink)] px-[2rem] tablet:p-[3.2rem] pc:px-[4rem]`}
        >
            <section className="flex items-center justify-between max-w-[1440px] w-full h-full gap-[12.1rem] mx-auto">
                <Link
                    data-report-id="nav-home"
                    data-report-type="item"
                    className="flex-1 brand-logo flex items-end justify-start gap-[1.2rem] text-[1.6rem] tablet:text-[1.8rem] font-[750] leading-[1.0]"
                    href="/"
                    aria-label="또바기 엔터테인먼트 홈"
                    onClick={(event) => blockSameRoute(event, "/")}
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
                    {navigation.map((item) => {
                        const current = pathname === item.href;
                        return (
                            <Link
                                data-report-id={`nav-${item.href.slice(1)}`}
                                data-report-type="item"
                                className={`group relative text-[2.0rem] ${current ? "text-[#ff4321]" : ""}`}
                                key={item.href}
                                href={item.href}
                                aria-current={current ? "page" : undefined}
                                onClick={(event) => blockSameRoute(event, item.href)}
                            >
                                {item.label}
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute bottom-[-0.35rem] left-0 h-[0.2rem] w-full origin-left scale-x-0 bg-[#ff4321] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                                />
                            </Link>
                        );
                    })}
                </nav>

                <Sidebar
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                />
            </section>
        </header>
    );
}
