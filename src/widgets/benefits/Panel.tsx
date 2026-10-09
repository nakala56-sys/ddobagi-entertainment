"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import { BenefitsPageProvider } from "./model/BenefitsContext";
import * as Layer from "@/widgets/benefits/ui";

export default function Panel() {
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!panelRef.current) return;
        return Animation.layout.main(panelRef.current);
    }, []);
    return (
        <BenefitsPageProvider>
            <div ref={panelRef} className="route-panel">
                <Layer.BenefitsHero />
                <Layer.BenefitsOverview />
                <Layer.BenefitsStickyCards />
                <Layer.BenefitsClosing />
            </div>
            <Layer.Modal />
        </BenefitsPageProvider>
    );
}
