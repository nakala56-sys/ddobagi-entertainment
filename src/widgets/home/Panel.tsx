"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import * as Layer from "@/widgets/home/ui";

export default function Panel() {
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!panelRef.current) return;
        return Animation.layout.main(panelRef.current);
    }, []);
    return (
        <div
            ref={panelRef}
            className="route-panel overflow-visible"
        >
            <Layer.HeroIntro />
            <Layer.BeliefMoments />
            <Layer.SettlementTrust />
            <Layer.SupportOverview />
            <Layer.CreatorSolutions />
            <Layer.CreatorJourney />
            <Layer.CreatorGallery />
            <Layer.CreatorFaq />
            <Layer.FinalCta />
            <Layer.SectionNavigation />
        </div>
    );
}
