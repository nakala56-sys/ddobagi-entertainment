"use client";

import { useEffect } from "react";
import Modal from "@/shared/ui/composed/Modal";
import { useAboutProvider } from "../model/AboutContext";
import { useConfirmModalStore } from "../model/useConfirmModalStore";

export function TestModal() {
    const state = useAboutProvider();
    const target = useConfirmModalStore((value) => value.target);
    const open = useConfirmModalStore((value) => value.open);
    const close = useConfirmModalStore((value) => value.close);
    useEffect(() => close, [close]);
    if (process.env.NODE_ENV !== "development") return null;
    return (
        <>
            <button
                type="button"
                className="scaffold-trigger fixed bottom-5 left-5 z-[30] p-[0.8rem_1.2rem] bg-[var(--ink)] text-[white] border-[0.4rem] border-solid border-[var(--accent)] text-xs"
                onClick={() => open("test")}
            >
                About 상태 확인
            </button>
            <Modal
                title="About 개발 상태 확인"
                open={target === "test"}
                onClose={close}
            >
                <form
                    className="scaffold-form flex flex-col gap-5"
                    onSubmit={(event) => {
                        event.preventDefault();
                        state.search();
                    }}
                >
                    <label className="flex flex-col gap-1">
                        키워드
                        <input
                            className="p-3 border-[0.4rem] border-solid border-[var(--line)] bg-[white] min-w-0"
                            value={state.keyword}
                            onChange={(event) => state.setKeyword(event.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        페이지
                        <input
                            className="p-3 border-[0.4rem] border-solid border-[var(--line)] bg-[white] min-w-0"
                            type="number"
                            min="1"
                            value={state.page}
                            onChange={(event) => state.setPage(Math.max(1, Number(event.target.value) || 1))}
                        />
                    </label>
                    <output aria-live="polite">
                        검색: {state.submittedKeyword || "전체"} · 페이지: {state.page}
                    </output>
                    <div className="button-row flex flex-wrap gap-6 mt-5">
                        <button
                            type="submit"
                            className="text-[inherit] inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent"
                        >
                            검색
                        </button>
                        <button
                            type="button"
                            className="text-[inherit] inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent"
                            onClick={state.reset}
                        >
                            초기화
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
