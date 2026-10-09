"use client";

import dynamic from "next/dynamic";

const EquipmentPanel = dynamic(() => import("@/widgets/equipment").then((module) => module.EquipmentPanel), {
    ssr: false,
    loading: () => (
        <div
            className="page-loading"
            role="status"
        >
            CONNECTING TO DDOBAGI <span aria-hidden="true"> · · ·</span>
        </div>
    ),
});

export function EquipmentView() {
    return <EquipmentPanel />;
}
