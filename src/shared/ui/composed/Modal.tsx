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
    return <dialog ref={ref} className="site-modal" aria-labelledby={titleId} data-lenis-prevent onCancel={(event) => { event.preventDefault(); onClose(); }}>
        <div className="modal-header"><h2 id={titleId}>{title}</h2><button type="button" aria-label="모달 닫기" onClick={onClose}>×</button></div>
        {children}
    </dialog>;
}
