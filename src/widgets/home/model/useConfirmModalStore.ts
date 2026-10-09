"use client";

import { create } from "zustand";

type ConfirmModalState = {
    target: "test" | null;
    open: (target: "test") => void;
    close: () => void;
};

export const useConfirmModalStore = create<ConfirmModalState>((set) => ({
    target: null,
    open: (target) => set({ target }),
    close: () => set({ target: null }),
}));
