"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import { EquipmentPageProvider } from "./model/EquipmentContext";
import * as Layer from "@/widgets/equipment/ui";

export default function Panel() {
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!panelRef.current) return;
        return Animation.layout.main(panelRef.current);
    }, []);
    return (
        <EquipmentPageProvider>
            <div
                ref={panelRef}
                className="route-panel"
            >
                <Layer.EquipmentHero />
                <Layer.EquipmentShowcase />
                <Layer.EquipmentGrid />
                <Layer.StudioEnvironment />
            </div>
            <Layer.Modal />
        </EquipmentPageProvider>
    );
}
