"use client";

import { createContext, useContext, type ReactNode } from "react";
import useBenefitExplore from "./useBenefitExplore";

const BenefitsContext = createContext<ReturnType<typeof useBenefitExplore> | null>(null);

export function BenefitsPageProvider({ children }: { children: ReactNode }) {
    const state = useBenefitExplore();
    return <BenefitsContext.Provider value={{ ...state }}>{children}</BenefitsContext.Provider>;
}

export function useBenefitsProvider() {
    const context = useContext(BenefitsContext);
    if (!context) throw new Error("useBenefitsProvider must be used inside BenefitsPageProvider");
    return context;
}
