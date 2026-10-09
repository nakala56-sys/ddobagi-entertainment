"use client";

import { useToastStore } from "@/shared/model/stores/useToastStore";

export function Toast() {
    const toasts = useToastStore((state) => state.toastList);
    const remove = useToastStore((state) => state.removeToastById);
    return <div className="toast-layer" aria-live="polite">{toasts.map((toast) => <div className="toast-message" key={toast.id}><p>{toast.msg}</p><button type="button" aria-label="알림 닫기" onClick={() => remove(toast.id)}>×</button></div>)}</div>;
}
