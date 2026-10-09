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
    return <dialog ref={dialogRef} id="mobile-menu" className="mobile-menu" aria-label="사이트 메뉴" data-lenis-prevent onCancel={(event) => { event.preventDefault(); onClose(); }}>
        <div className="mobile-menu-top"><span className="eyebrow">TOBBAGI ENTERTAINMENT</span><button type="button" className="menu-close" aria-label="메뉴 닫기" onClick={onClose}>×</button></div>
        <nav aria-label="모바일 주 메뉴">{navigation.map((item, index) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={onClose}><small>0{index + 1}</small>{item.label}<span>{item.korean}</span></Link>)}</nav>
        <p className="body-copy">꾸준히. 한결같이. 함께.</p>
    </dialog>;
}
