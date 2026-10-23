"use client";

import { useToastStore } from "@/shared/model/stores/useToastStore";

export function Toast() {
    const toasts = useToastStore((state) => state.toastList);
    const remove = useToastStore((state) => state.removeToastById);
    return (
        <div
            className="toast-layer fixed top-[2rem] left-[50%] -translate-x-1/2 z-[150] w-[90vw] max-w-[40rem]"
            aria-live="polite"
        >
            {toasts.map((toast) => (
                <div
                    className="toast-message flex justify-between gap-[2rem] bg-[var(--color-background)] text-[var(--color-text)] border-[0.4rem] border-solid border-[var(--color-line)] p-[1.6rem_2rem] mb-[1.2rem]"
                    key={toast.id}
                >
                    <p className="leading-[1.5]">{toast.msg}</p>
                    <button
                        className="bg-transparent border-0 leading-[1.0]"
                        type="button"
                        aria-label="알림 닫기"
                        onClick={() => remove(toast.id)}
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
}
