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
import { GradualBlur } from "@/shared/ui/gradual-blur/GradualBlur";

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
    }, [pathname]);
    return (
        <header
            ref={headerRef}
            data-report-id="site-header"
            data-report-type="group"
            className="site-header fixed top-0 left-0 z-[20] flex h-[7.2rem] w-full items-center justify-between gap-[1.6rem] px-[2rem] py-0 text-[var(--header-ink,var(--color-text))] tablet:h-auto tablet:items-start tablet:p-[3.2rem] pc:px-[4rem]"
        >
            <GradualBlur
                height="calc(100% + 3.2rem)"
                strength={5}
                // tint="color-mix(in srgb, var(--color-background) 80%, transparent)"
            />
            <section className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-center justify-between gap-[1.2rem] tablet:gap-[4rem] pc:gap-[12.2rem]">
                <Link
                    data-report-id="nav-home"
                    data-report-type="item"
                    className="brand-logo flex min-w-0 flex-1 items-center justify-start gap-[1.2rem] text-[1.6rem] font-[750] leading-[1.0] tablet:items-end tablet:text-[1.8rem]"
                    href="/"
                    aria-label="또바기 엔터테인먼트 홈"
                    onClick={(event) => blockSameRoute(event, "/")}
                >
                    <MetallicPaint
                        imageSrc="/images/common/ttobagi-logo.webp"
                        preserveMaterial
                        color="#e8c46a"
                        width={52}
                        height={52}
                        density={1.8}
                        softness={0.05}
                        edgeBend={1}
                        speed={1}
                        dispersion={0.15}
                    />
                    <p className="hidden truncate text-[1.6rem] tablet:block tablet:text-[2.4rem]">
                        DDOBAGI_<span className="text-[1.2rem] tablet:text-[1.8rem]">ENTERTAINMENT</span>
                        {/* DDOBAGI<small>ENTERTAINMENT</small> */}
                    </p>
                </Link>

                <button
                    type="button"
                    className="inline-flex h-[4.4rem] w-[4.4rem] shrink-0 items-center justify-center tablet:hidden"
                    aria-label="메뉴 열기"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setMenuOpen(true)}
                >
                    <span
                        className="flex w-[2rem] flex-col gap-[0.4rem]"
                        aria-hidden="true"
                    >
                        <span className="block h-[0.2rem] w-full bg-current" />
                        <span className="block h-[0.2rem] w-full bg-current" />
                        <span className="block h-[0.2rem] w-full bg-current" />
                    </span>
                </button>

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
                                className={`group relative text-[2.0rem] ${current ? "text-[#92702b]" : ""}`}
                                key={item.href}
                                href={item.href}
                                aria-current={current ? "page" : undefined}
                                onClick={(event) => blockSameRoute(event, item.href)}
                            >
                                {item.label}
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute bottom-[-0.35rem] left-0 h-[0.2rem] w-full origin-left scale-x-0 bg-[#92702b] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
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
