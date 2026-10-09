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
                <Layer.BrandIntro />
                <Layer.BeliefMoments />
                <Layer.SupportOverview />
                <Layer.StudioPreview />
                <Layer.CreatorStories />
                <Layer.FinalCta />
            </div>
            <Layer.Modal />
        </HomePageProvider>
    );
}
