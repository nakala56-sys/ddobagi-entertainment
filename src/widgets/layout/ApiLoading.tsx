"use client";

import { useApiPendingStore } from "@/shared/model/stores/useApiPendingStore";

export function ApiLoading() {
    const pending = useApiPendingStore((state) => state.pendingCount > 0);
    if (!pending) return null;
    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed bottom-16 left-1/2 z-[150] -translate-x-1/2 rounded-full bg-black px-6 py-3 text-base text-white"
        >
            처리 중입니다…
        </div>
    );
}
