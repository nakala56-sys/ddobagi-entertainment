"use client";

import dynamic from "next/dynamic";

const HomePanel = dynamic(() => import("@/widgets/home").then((module) => module.HomePanel), {
    ssr: false,
    loading: () => (
        <div
            className="page-loading min-h-[100svh] grid [place-content:center] text-[#ededed] text-base tracking-[round(nearest,0.08em,0.4rem)]"
            role="status"
        >
            CONNECTING TO DDOBAGI <span aria-hidden="true"> · · ·</span>
        </div>
    ),
});

export function HomeView() {
    return <HomePanel />;
}
