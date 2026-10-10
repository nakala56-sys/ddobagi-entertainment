import { NextResponse } from "next/server";
import type { ApiResponse } from "@/shared/lib/api/client";
import { getSiteUrl } from "@/shared/lib/siteUrl";
import { readApiResponse } from "./error";

type ServerFetchOptions = Omit<RequestInit, "body"> & {
    body?: unknown;
};

export async function serverFetch<T>(url: string, options: ServerFetchOptions = {}): Promise<T> {
    const target = url.startsWith("http") ? url : `${getSiteUrl()}${url}`;
    const headers = new Headers(options.headers);
    const isFormData = options.body instanceof FormData;
    if (!isFormData && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    try {
        const response = await fetch(target, {
            ...options,
            headers,
            body: options.body === undefined ? undefined : isFormData ? (options.body as FormData) : JSON.stringify(options.body),
        });
        return await readApiResponse<T>(response);
    } catch (error) {
        const normalized = error instanceof Error ? error : new Error("서버 API 요청에 실패했습니다.");
        console.error("[serverFetch]", normalized);
        throw normalized;
    }
}

export function apiOk<T>(data: T, init?: ResponseInit) {
    const response: ApiResponse<T> = { result: data };

    return NextResponse.json(response, init);
}

export function apiError(message: string, status = 400) {
    return NextResponse.json({ message }, { status });
}

export const serverApi = {
    get: <T>(url: string, options?: ServerFetchOptions) => serverFetch<T>(url, options),
    post: <T>(url: string, body?: unknown, options?: ServerFetchOptions) => serverFetch<T>(url, { ...options, method: "POST", body }),
    patch: <T>(url: string, body?: unknown, options?: ServerFetchOptions) => serverFetch<T>(url, { ...options, method: "PATCH", body }),
    delete: <T>(url: string, options?: ServerFetchOptions) => serverFetch<T>(url, { ...options, method: "DELETE" }),
};
