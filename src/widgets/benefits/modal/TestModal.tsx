"use client";

import { useEffect } from "react";
import Modal from "@/shared/ui/composed/Modal";
import { useBenefitsProvider } from "../model/BenefitsContext";
import { useConfirmModalStore } from "../model/useConfirmModalStore";

export function TestModal() {
    const state = useBenefitsProvider();
    const target = useConfirmModalStore((value) => value.target);
    const open = useConfirmModalStore((value) => value.open);
    const close = useConfirmModalStore((value) => value.close);
    useEffect(() => close, [close]);
    if (process.env.NODE_ENV !== "development") return null;
    return (
        <>
            <button
                type="button"
                className="scaffold-trigger fixed bottom-[2rem] left-[2rem] z-[30] p-[0.8rem_1.2rem] bg-[#000000] text-[white] border-[0.4rem] border-solid border-[var(--accent,#000000)] text-[1.2rem] leading-[1.0]"
                onClick={() => open("test")}
            >
                Benefits 상태 확인
            </button>
            <Modal
                title="Benefits 개발 상태 확인"
                open={target === "test"}
                onClose={close}
            >
                <form
                    className="scaffold-form flex flex-col gap-[2rem]"
                    onSubmit={(event) => {
                        event.preventDefault();
                        state.search();
                    }}
                >
                    <label className="flex flex-col gap-[0.4rem]">
                        키워드
                        <input
                            className="p-[1.2rem] border-[0.4rem] border-solid border-[var(--color-line)] bg-[var(--color-background)] min-w-0 leading-[1.0]"
                            value={state.keyword}
                            onChange={(event) => state.setKeyword(event.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-[0.4rem]">
                        페이지
                        <input
                            className="p-[1.2rem] border-[0.4rem] border-solid border-[var(--color-line)] bg-[var(--color-background)] min-w-0 leading-[1.0]"
                            type="number"
                            min="1"
                            value={state.page}
                            onChange={(event) => state.setPage(Math.max(1, Number(event.target.value) || 1))}
                        />
                    </label>
                    <output aria-live="polite">
                        검색: {state.submittedKeyword || "전체"} · 페이지: {state.page}
                    </output>
                    <div className="button-row flex flex-wrap gap-[2.4rem] mt-[2rem]">
                        <button
                            type="submit"
                            className="text-[inherit] inline-flex gap-[3.2rem] items-center font-[650] text-[1.6rem] py-[1.2rem] border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent leading-[1.0]"
                        >
                            검색
                        </button>
                        <button
                            type="button"
                            className="text-[inherit] inline-flex gap-[3.2rem] items-center font-[650] text-[1.6rem] py-[1.2rem] border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent leading-[1.0]"
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
