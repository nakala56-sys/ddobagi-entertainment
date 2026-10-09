"use client";

import { createContext, useContext, type ReactNode } from "react";
import useHomeExplore from "./useHomeExplore";

const HomeContext = createContext<ReturnType<typeof useHomeExplore> | null>(null);

export function HomePageProvider({ children }: { children: ReactNode }) {
    const state = useHomeExplore();
    return <HomeContext.Provider value={{ ...state }}>{children}</HomeContext.Provider>;
}

export function useHomeProvider() {
    const context = useContext(HomeContext);
    if (!context) throw new Error("useHomeProvider must be used inside HomePageProvider");
    return context;
}
