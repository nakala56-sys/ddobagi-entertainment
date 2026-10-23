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
        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);
    return (
        <dialog
            ref={ref}
            className="site-modal w-[calc(100vw_-_4rem)] max-w-[50rem] max-h-[85svh] p-[3.2rem] text-[var(--color-text)] bg-[var(--color-background)] border-[0.4rem] border-solid border-[var(--color-line)] m-auto backdrop:bg-[#00000080]"
            aria-labelledby={titleId}
            data-lenis-prevent
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
        >
            <div className="modal-header flex items-center justify-between gap-[2rem] mb-[3.2rem]">
                <h2
                    className="text-[1.8rem] leading-[1.5]"
                    id={titleId}
                >
                    {title}
                </h2>
                <button
                    className="text-[3rem] border-0 bg-transparent leading-[1.0]"
                    type="button"
                    aria-label="모달 닫기"
                    onClick={onClose}
                >
                    ×
                </button>
            </div>
            {children}
        </dialog>
    );
}
