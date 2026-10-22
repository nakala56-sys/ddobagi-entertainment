"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import { AboutPageProvider } from "./model/AboutContext";
import * as Layer from "@/widgets/about/ui";

export default function Panel() {
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!panelRef.current) return;
        return Animation.layout.main(panelRef.current);
    }, []);
    return (
        <AboutPageProvider>
            <div
                ref={panelRef}
                className="route-panel"
            >
                <Layer.AboutHero />
                <Layer.BrandPhilosophy />
                <Layer.Location />
            </div>
            <Layer.Modal />
        </AboutPageProvider>
    );
}
