"use client";

import { useToastStore } from "@/shared/model/stores/useToastStore";

export function Toast() {
    const toasts = useToastStore((state) => state.toastList);
    const remove = useToastStore((state) => state.removeToastById);
    return <div className="toast-layer fixed top-5 left-[50%] -translate-x-1/2 z-[150] w-[min(40rem,_90vw)]" aria-live="polite">{toasts.map((toast) => <div className="toast-message flex justify-between gap-5 bg-[var(--paper)] text-[var(--ink)] border-[0.4rem] border-solid border-[var(--line)] p-[1.6rem_2rem] mb-3 [&_button]:bg-transparent [&_button]:border-0" key={toast.id}><p>{toast.msg}</p><button type="button" aria-label="알림 닫기" onClick={() => remove(toast.id)}>×</button></div>)}</div>;
}
