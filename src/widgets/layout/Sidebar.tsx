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
            className="mobile-menu backdrop:bg-[#00000080] [--accent:#000000] w-full h-[100svh] max-w-none max-h-none m-0 p-8 text-[var(--ink)] bg-[var(--paper)] border-0"
            aria-label="사이트 메뉴"
            data-lenis-prevent
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
        >
            <div className="mobile-menu-top flex items-center justify-between mb-13">
                <span className="eyebrow text-xs tracking-[round(nearest,0.16em,0.4rem)] font-[650] leading-[round(up,1.7em,0.4rem)] uppercase">TOBBAGI ENTERTAINMENT</span>
                <button
                    type="button"
                    className="menu-close text-[4rem] leading-[round(up,1em,0.4rem)] bg-transparent border-0"
                    aria-label="메뉴 닫기"
                    onClick={onClose}
                >
                    ×
                </button>
            </div>
            <nav
                className="flex flex-col mb-10"
                aria-label="모바일 주 메뉴"
            >
                {navigation.map((item, index) => (
                    <Link
                        className="flex items-center gap-4 py-4 border-b-[0.4rem] border-solid border-b-[var(--line)] text-3xl tablet:text-5xl tracking-[round(nearest,-0.04em,0.4rem)] aria-[current=page]:text-[var(--accent)] aria-[current=page]:underline aria-[current=page]:underline-offset-[0.8rem]"
                        key={item.href}
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        onClick={onClose}
                    >
                        <small className="text-[var(--accent)] text-xs tracking-[0]">0{index + 1}</small>
                        {item.label}
                        <span className="ml-[auto] text-xs tracking-[0] text-[var(--muted)]">{item.korean}</span>
                    </Link>
                ))}
            </nav>
            <p className="body-copy text-base pc:text-lg leading-[round(up,1.9em,0.4rem)] text-[var(--muted)]">꾸준히. 한결같이. 함께.</p>
        </dialog>
    );
}
