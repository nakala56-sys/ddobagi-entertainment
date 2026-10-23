"use client";

import { useApiPendingStore } from "@/shared/model/stores/useApiPendingStore";

export function ApiLoading() {
    const pending = useApiPendingStore((state) => state.pendingCount > 0);
    if (!pending) return null;
    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed bottom-[6.4rem] left-1/2 z-[150] -translate-x-1/2 rounded-full bg-[var(--color-point)] px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[var(--color-text)]"
        >
            처리 중입니다…
        </div>
    );
}
