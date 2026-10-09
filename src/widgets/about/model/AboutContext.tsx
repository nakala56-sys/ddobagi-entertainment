"use client";

import { createContext, useContext, type ReactNode } from "react";
import useBrandExplore from "./useBrandExplore";

const AboutContext = createContext<ReturnType<typeof useBrandExplore> | null>(null);

export function AboutPageProvider({ children }: { children: ReactNode }) {
    const state = useBrandExplore();
    return <AboutContext.Provider value={{ ...state }}>{children}</AboutContext.Provider>;
}

export function useAboutProvider() {
    const context = useContext(AboutContext);
    if (!context) throw new Error("useAboutProvider must be used inside AboutPageProvider");
    return context;
}
