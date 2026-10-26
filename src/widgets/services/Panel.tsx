"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";
import * as Layer from "@/widgets/services/ui";

export default function Panel() {
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!panelRef.current) return;
        return Animation.layout.main(panelRef.current);
    }, []);
    return (
        <div
            ref={panelRef}
            className="route-panel"
        >
            <Layer.ServicesHero />
            <Layer.ServicesOverview />
        </div>
    );
}
