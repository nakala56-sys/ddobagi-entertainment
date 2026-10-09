"use client";

import dynamic from "next/dynamic";

const HomePanel = dynamic(() => import("@/widgets/home").then((module) => module.HomePanel), {
    ssr: false,
    loading: () => <div className="page-loading" role="status">또바기를 만나고 있어요<span aria-hidden="true"> · · ·</span></div>,
});

export function HomeView() {
    return <HomePanel />;
}
