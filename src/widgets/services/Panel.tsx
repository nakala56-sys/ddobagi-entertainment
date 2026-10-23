"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import { ServicesPageProvider } from "./model/ServicesContext";
import * as Layer from "@/widgets/services/ui";

export default function Panel() {
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!panelRef.current) return;
        return Animation.layout.main(panelRef.current);
    }, []);
    return (
        <ServicesPageProvider>
            <div
                ref={panelRef}
                className="route-panel"
            >
                <Layer.ServicesHero />
                <Layer.ServicesOverview />
                {/* <Layer.ServicesClosing /> */}
            </div>
            <Layer.Modal />
        </ServicesPageProvider>
    );
}
