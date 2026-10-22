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
        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);
    return (
        <dialog
            ref={dialogRef}
            id="mobile-menu"
            className="mobile-menu backdrop:bg-[#00000080] [--accent:#000000] w-full h-[100svh] max-w-none max-h-none m-0 p-[3.2rem] text-[#000000] bg-[#ffffff] border-0"
            aria-label="사이트 메뉴"
            data-lenis-prevent
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
        >
            <div className="mobile-menu-top flex items-center justify-between mb-[5.2rem]">
                <span className="eyebrow text-[1.2rem] font-[650] leading-[1.0] uppercase">TOBBAGI ENTERTAINMENT</span>
                <button
                    type="button"
                    className="menu-close text-[4rem] leading-[1.0] bg-transparent border-0"
                    aria-label="메뉴 닫기"
                    onClick={onClose}
                >
                    ×
                </button>
            </div>
            <nav
                className="flex flex-col mb-[4rem]"
                aria-label="모바일 주 메뉴"
            >
                {navigation.map((item, index) => (
                    <Link
                        className="flex items-center gap-[1.6rem] py-[1.6rem] border-b-[0.4rem] border-solid border-b-[#dedede] text-[3rem] tablet:text-[4.8rem] aria-[current=page]:text-[var(--accent,#000000)] aria-[current=page]:underline aria-[current=page]:underline-offset-[0.8rem] leading-[1.0]"
                        key={item.href}
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        onClick={onClose}
                    >
                        <small className="text-[var(--accent,#000000)] text-[1.2rem]">0{index + 1}</small>
                        {item.label}
                        <span className="ml-[auto] text-[1.2rem] text-[#737373]">{item.korean}</span>
                    </Link>
                ))}
            </nav>
            <p className="body-copy text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373]">꾸준히. 한결같이. 함께.</p>
        </dialog>
    );
}
