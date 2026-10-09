"use client";

import { useEffect } from "react";
import Modal from "@/shared/ui/composed/Modal";
import { useHomeProvider } from "../model/HomeContext";
import { useConfirmModalStore } from "../model/useConfirmModalStore";

export function TestModal() {
    const state = useHomeProvider();
    const target = useConfirmModalStore((value) => value.target);
    const open = useConfirmModalStore((value) => value.open);
    const close = useConfirmModalStore((value) => value.close);
    useEffect(() => close, [close]);
    if (process.env.NODE_ENV !== "development") return null;
    return <>
        <button type="button" className="scaffold-trigger" onClick={() => open("test")}>Home 상태 확인</button>
        <Modal title="Home 개발 상태 확인" open={target === "test"} onClose={close}>
            <form className="scaffold-form" onSubmit={(event) => { event.preventDefault(); state.search(); }}>
                <label>키워드<input value={state.keyword} onChange={(event) => state.setKeyword(event.target.value)} /></label>
                <label>페이지<input type="number" min="1" value={state.page} onChange={(event) => state.setPage(Math.max(1, Number(event.target.value) || 1))} /></label>
                <output aria-live="polite">검색: {state.submittedKeyword || "전체"} · 페이지: {state.page}</output>
                <div className="button-row"><button type="submit" className="text-button">검색</button><button type="button" className="text-button" onClick={state.reset}>초기화</button></div>
            </form>
        </Modal>
    </>;
}
