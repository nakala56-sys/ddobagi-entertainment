import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clientFetch } from "./client";
import { ApiError, readApiResponse } from "./error";
import { useApiPendingStore } from "@/shared/model/stores/useApiPendingStore";

const showErrorToast = vi.hoisted(() => vi.fn());
vi.mock("@/shared/lib/toast", () => ({ showErrorToast }));

beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("window", new EventTarget());
    useApiPendingStore.setState({ pendingCount: 0 });
});

afterEach(() => vi.unstubAllGlobals());

describe("common API handling", () => {
    it("keeps concurrent write requests pending until both finish", async () => {
        const resolvers: ((response: Response) => void)[] = [];
        vi.stubGlobal(
            "fetch",
            vi.fn(() => new Promise<Response>((resolve) => resolvers.push(resolve))),
        );
        const first = clientFetch("/first", { method: "POST", body: { value: 1 } });
        const second = clientFetch("/second", { method: "DELETE" });
        expect(useApiPendingStore.getState().pendingCount).toBe(2);
        resolvers[0](Response.json({ ok: true }));
        await first;
        expect(useApiPendingStore.getState().pendingCount).toBe(1);
        resolvers[1](new Response(null, { status: 204 }));
        await expect(second).resolves.toBeUndefined();
        expect(useApiPendingStore.getState().pendingCount).toBe(0);
    });

    it.each([401, 419])("handles auth expiration %s and releases loading on failure", async (status) => {
        const expired = vi.fn();
        window.addEventListener("api:auth-expired", expired);
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ message: "인증이 만료되었습니다." }, { status })));
        await expect(clientFetch("/write", { method: "PATCH" })).rejects.toMatchObject({ status });
        expect(expired).toHaveBeenCalledOnce();
        expect(showErrorToast).toHaveBeenCalledWith("인증이 만료되었습니다.");
        expect(useApiPendingStore.getState().pendingCount).toBe(0);
    });

    it("retains caller Headers and lets the browser encode multipart bodies", async () => {
        const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }));
        vi.stubGlobal("fetch", fetchMock);
        const body = new FormData();
        body.set("value", "test");
        await clientFetch("/upload", { method: "POST", headers: new Headers({ "X-Test": "kept" }), body });
        const options = fetchMock.mock.calls[0][1];
        expect(options.headers.get("X-Test")).toBe("kept");
        expect(options.headers.has("Content-Type")).toBe(false);
        expect(options.body).toBe(body);
    });

    it("normalizes non-JSON HTTP errors and rejects invalid successful JSON", async () => {
        await expect(readApiResponse(new Response("unavailable", { status: 503 }))).rejects.toMatchObject({ status: 503, message: "API 요청에 실패했습니다." });
        await expect(readApiResponse(new Response("invalid JSON"))).rejects.toBeInstanceOf(ApiError);
    });

    it("clears loading and shows common feedback for network errors", async () => {
        vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
        await expect(clientFetch("/write", { method: "PUT" })).rejects.toThrow("Failed to fetch");
        expect(useApiPendingStore.getState().pendingCount).toBe(0);
        expect(showErrorToast).toHaveBeenCalledWith("Failed to fetch");
    });
});
