"use client";

import { createContext, useContext, type ReactNode } from "react";
import useServiceExplore from "./useServiceExplore";

const ServicesContext = createContext<ReturnType<typeof useServiceExplore> | null>(null);

export function ServicesPageProvider({ children }: { children: ReactNode }) {
    const state = useServiceExplore();
    return <ServicesContext.Provider value={{ ...state }}>{children}</ServicesContext.Provider>;
}

export function useServicesProvider() {
    const context = useContext(ServicesContext);
    if (!context) throw new Error("useServicesProvider must be used inside ServicesPageProvider");
    return context;
}
