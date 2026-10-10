import { finishApiPending, startApiPending } from "@/shared/model/stores/useApiPendingStore";
import { showErrorToast } from "@/shared/lib/toast";
import { ApiError, readApiResponse } from "./error";

type ClientFetchOptions = Omit<RequestInit, "body"> & {
    body?: unknown;
};

export type ApiResponse<T> = {
    result: T;
};

export async function clientFetch<T>(url: string, options: ClientFetchOptions = {}): Promise<T> {
    const isFormData = options.body instanceof FormData;
    const method = (options.method ?? "GET").toUpperCase();
    const shouldTrackPending = typeof window !== "undefined" && method !== "GET" && method !== "HEAD";
    const headers = new Headers(options.headers);
    if (!isFormData && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

    if (shouldTrackPending) {
        startApiPending();
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            body: options.body === undefined ? undefined : isFormData ? (options.body as FormData) : JSON.stringify(options.body),
        });
        return await readApiResponse<T>(response);
    } catch (error) {
        const normalized = error instanceof Error ? error : new Error("API 요청에 실패했습니다.");
        if (typeof window !== "undefined") {
            if (error instanceof ApiError && (error.status === 401 || error.status === 419)) {
                window.dispatchEvent(new CustomEvent("api:auth-expired", { detail: { status: error.status } }));
            }
            showErrorToast(normalized.message);
        }
        throw normalized;
    } finally {
        if (shouldTrackPending) {
            finishApiPending();
        }
    }
}

export const clientApi = {
    get: <T>(url: string) => clientFetch<T>(url),
    post: <T>(url: string, body?: unknown, options?: ClientFetchOptions) => clientFetch<T>(url, { ...options, method: "POST", body }),
    patch: <T>(url: string, body?: unknown, options?: ClientFetchOptions) => clientFetch<T>(url, { ...options, method: "PATCH", body }),
    delete: <T>(url: string, options?: ClientFetchOptions) => clientFetch<T>(url, { ...options, method: "DELETE" }),
};
