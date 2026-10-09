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
    return <>
        <button type="button" className="scaffold-trigger fixed bottom-5 left-5 z-[30] p-[0.8rem_1.2rem] bg-[var(--ink)] text-[white] border-[0.4rem] border-solid border-[var(--accent)] text-xs" onClick={() => open("test")}>Benefits 상태 확인</button>
        <Modal title="Benefits 개발 상태 확인" open={target === "test"} onClose={close}>
            <form className="scaffold-form flex flex-col gap-5 [&_label]:flex [&_label]:flex-col [&_label]:gap-1 [&_input]:p-3 [&_input]:border-[0.4rem] [&_input]:border-solid [&_input]:border-[var(--line)] [&_input]:bg-[white] [&_input]:min-w-0" onSubmit={(event) => { event.preventDefault(); state.search(); }}>
                <label>키워드<input value={state.keyword} onChange={(event) => state.setKeyword(event.target.value)} /></label>
                <label>페이지<input type="number" min="1" value={state.page} onChange={(event) => state.setPage(Math.max(1, Number(event.target.value) || 1))} /></label>
                <output aria-live="polite">검색: {state.submittedKeyword || "전체"} · 페이지: {state.page}</output>
                <div className="button-row flex flex-wrap gap-6 mt-5"><button type="submit" className="text-button inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent text-[inherit]">검색</button><button type="button" className="text-button inline-flex gap-8 items-center font-[650] text-base py-3 border-0 border-b-[0.4rem] border-solid border-b-[currentColor] bg-transparent text-[inherit]" onClick={state.reset}>초기화</button></div>
            </form>
        </Modal>
    </>;
}
