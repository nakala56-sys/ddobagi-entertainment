"use client";

import { useCallback, useState } from "react";

export default function useBenefitExplore() {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [submittedKeyword, setSubmittedKeyword] = useState("");
    const search = useCallback(() => {
        setSubmittedKeyword(keyword.trim());
        setPage(1);
    }, [keyword]);
    const reset = useCallback(() => {
        setKeyword("");
        setSubmittedKeyword("");
        setPage(1);
    }, []);
    return { keyword, page, submittedKeyword, setKeyword, setPage, search, reset };
}
