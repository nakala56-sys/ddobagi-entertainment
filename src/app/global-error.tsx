"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        console.error("Application global error", {
            digest: error.digest,
            message: error.message,
        });
    }, [error]);

    return (
        <html lang="ko">
            <body className="m-0 min-h-screen bg-[var(--color-background)] font-sans text-[var(--color-text)]">
                <main className="grid min-h-screen place-items-center bg-[var(--color-background)] p-[2.4rem] text-[var(--color-text)]">
                    <section className="w-full max-w-[42rem] rounded-[1.6rem] border-[0.4rem] border-[var(--color-line)] bg-[var(--color-background)] p-[2.8rem]">
                        <span className="mb-[1.2rem] block text-[1.2rem] font-bold text-[var(--color-point)]">Global Error</span>
                        <h1 className="mt-0 mb-[1.2rem] text-[2.4rem] leading-[1.5]">서비스 오류가 발생했습니다</h1>
                        <p className="mt-0 mb-[2rem] leading-[1.5] text-[#b5b5b5]">운영 로그에 오류 정보가 기록되었습니다. 잠시 후 다시 시도해주세요.</p>
                        <button
                            className="min-h-[4.4rem] w-full rounded-[1.2rem] bg-[var(--color-point)] font-bold text-[var(--color-text)] leading-[1.0]"
                            onClick={reset}
                            type="button"
                        >
                            다시 시도
                        </button>
                    </section>
                </main>
            </body>
        </html>
    );
}
