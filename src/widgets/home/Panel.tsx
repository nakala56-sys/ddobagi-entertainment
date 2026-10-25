"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import { HomePageProvider } from "./model/HomeContext";
import * as Layer from "@/widgets/home/ui";

export default function Panel() {
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!panelRef.current) return;
        return Animation.layout.main(panelRef.current);
    }, []);
    return (
        <HomePageProvider>
            <div
                ref={panelRef}
                className="route-panel overflow-visible"
            >
                <Layer.HeroIntro />
                {/* <Layer.BrandIntro /> */}
                <Layer.BeliefMoments />
                {/* <Layer.CreatorReel /> */}
                <Layer.SupportOverview />
                {/* <Layer.CreatorEveryday /> */}
                <Layer.CreatorSolutions />
                {/* <Layer.StudioPreview /> */}
                {/* <Layer.CreatorStories /> */}
                <Layer.CreatorFaq />
                <Layer.CreatorJourney />
                <Layer.CreatorGallery />
                <Layer.FinalCta />
                <Layer.SectionNavigation />
            </div>
            <Layer.Modal />
        </HomePageProvider>
    );
}
