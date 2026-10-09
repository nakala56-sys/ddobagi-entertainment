"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navigation } from "@/shared/config/navigation";

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const pathname = usePathname();
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog || !open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();
        return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
    }, [open]);
    return <dialog ref={dialogRef} id="mobile-menu" className="mobile-menu backdrop:bg-[#00000080] [--accent:#000000] w-full h-[100svh] max-w-none max-h-none m-0 p-8 text-[var(--ink)] bg-[var(--paper)] border-0 [&_nav]:flex [&_nav]:flex-col [&_nav]:mb-10 [&_nav_a]:flex [&_nav_a]:items-center [&_nav_a]:gap-4 [&_nav_a]:py-4 [&_nav_a]:border-b-[0.4rem] [&_nav_a]:border-solid [&_nav_a]:border-b-[var(--line)] [&_nav_a]:text-3xl [&_nav_a]:compact:text-[4.4rem] [&_nav_a]:site:text-5xl [&_nav_a]:wide:text-5xl [&_nav_a]:xl:text-5xl [&_nav_a]:2xl:text-5xl [&_nav_a]:tracking-[round(nearest,-0.04em,0.4rem)] [&_nav_small]:text-[var(--accent)] [&_nav_small]:text-xs [&_nav_small]:tracking-[0] [&_nav_span]:ml-[auto] [&_nav_span]:text-xs [&_nav_span]:tracking-[0] [&_nav_span]:text-[var(--muted)] [&_nav_a[aria-current=page]]:text-[var(--accent)] [&_nav_a[aria-current=page]]:underline [&_nav_a[aria-current=page]]:underline-offset-[0.8rem]" aria-label="사이트 메뉴" data-lenis-prevent onCancel={(event) => { event.preventDefault(); onClose(); }}>
        <div className="mobile-menu-top flex items-center justify-between mb-13"><span className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">TOBBAGI ENTERTAINMENT</span><button type="button" className="menu-close text-[4rem] leading-[round(up,1em,0.4rem)] bg-transparent border-0" aria-label="메뉴 닫기" onClick={onClose}>×</button></div>
        <nav aria-label="모바일 주 메뉴">{navigation.map((item, index) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={onClose}><small>0{index + 1}</small>{item.label}<span>{item.korean}</span></Link>)}</nav>
        <p className="body-copy text-base compact:text-base site:text-base wide:text-base xl:text-lg 2xl:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)] [.section-dark_&]:text-[#b5b5b5] [.showcase-copy_&]:mt-8 [.stack-card_&]:max-w-110 [.stack-card_&]:text-[#b5b5b5] max-site:[.showcase-copy_&]:mt-5">꾸준히. 한결같이. 함께.</p>
    </dialog>;
}
