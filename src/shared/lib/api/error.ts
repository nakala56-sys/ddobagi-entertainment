export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status: number,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export async function readApiResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) return undefined as T;
    const data = await response.json().catch(() => {
        if (response.ok) throw new ApiError("API 응답을 읽지 못했습니다.", response.status);
        return null;
    });
    if (!response.ok) {
        const message = typeof data?.message === "string" && data.message.trim() ? data.message : "API 요청에 실패했습니다.";
        throw new ApiError(message, response.status);
    }
    return data as T;
}
