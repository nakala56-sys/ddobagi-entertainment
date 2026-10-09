"use client";

import dynamic from "next/dynamic";

const EquipmentPanel = dynamic(() => import("@/widgets/equipment").then((module) => module.EquipmentPanel), {
    ssr: false,
    loading: () => <div className="page-loading" role="status">또바기를 만나고 있어요<span aria-hidden="true"> · · ·</span></div>,
});

export function EquipmentView() {
    return <EquipmentPanel />;
}
