"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

type ModalProps = { title: string; open?: boolean; onClose: () => void; children: ReactNode };

export default function Modal({ title, open = false, onClose, children }: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    useEffect(() => {
        const dialog = ref.current;
        if (!dialog || !open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();
        return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
    }, [open]);
    return <dialog ref={ref} className="site-modal w-[min(50rem,_calc(100vw_-_4rem))] max-h-[85svh] p-8 text-[var(--ink)] bg-[var(--paper)] border-[0.4rem] border-solid border-[var(--line)] m-auto backdrop:bg-[#00000080]" aria-labelledby={titleId} data-lenis-prevent onCancel={(event) => { event.preventDefault(); onClose(); }}>
        <div className="modal-header flex items-center justify-between gap-5 mb-8 [&_h2]:text-lg [&_button]:text-3xl [&_button]:border-0 [&_button]:bg-transparent"><h2 id={titleId}>{title}</h2><button type="button" aria-label="모달 닫기" onClick={onClose}>×</button></div>
        {children}
    </dialog>;
}
