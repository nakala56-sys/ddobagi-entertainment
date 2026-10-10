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
    return (
        <div
            ref={ref}
            className="site-progress fixed top-0 left-0 right-0 h-1 z-[50] bg-[#ffffff] mix-blend-difference scale-x-0 origin-left"
            aria-hidden="true"
        />
    );
}
