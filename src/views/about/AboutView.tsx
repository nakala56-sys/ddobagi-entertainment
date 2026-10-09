"use client";

import dynamic from "next/dynamic";

const AboutPanel = dynamic(() => import("@/widgets/about").then((module) => module.AboutPanel), {
    ssr: false,
    loading: () => <div className="page-loading" role="status">또바기를 만나고 있어요<span aria-hidden="true"> · · ·</span></div>,
});

export function AboutView() {
    return <AboutPanel />;
}
