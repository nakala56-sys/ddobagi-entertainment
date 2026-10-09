"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Animation from "@/shared/utils/animation";

export function Progress() {
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    useEffect(() => {
        if (!ref.current) return;
        return Animation.layout.progress(ref.current);
    }, [pathname]);
    return <div ref={ref} className="site-progress" aria-hidden="true" />;
}
