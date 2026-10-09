"use client";

import { createContext, useContext, type ReactNode } from "react";
import useEquipmentExplore from "./useEquipmentExplore";

const EquipmentContext = createContext<ReturnType<typeof useEquipmentExplore> | null>(null);

export function EquipmentPageProvider({ children }: { children: ReactNode }) {
    const state = useEquipmentExplore();
    return <EquipmentContext.Provider value={{ ...state }}>{children}</EquipmentContext.Provider>;
}

export function useEquipmentProvider() {
    const context = useContext(EquipmentContext);
    if (!context) throw new Error("useEquipmentProvider must be used inside EquipmentPageProvider");
    return context;
}
