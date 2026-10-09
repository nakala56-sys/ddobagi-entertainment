"use client";

import dynamic from "next/dynamic";

const BenefitsPanel = dynamic(() => import("@/widgets/benefits").then((module) => module.BenefitsPanel), {
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

export function BenefitsView() {
    return <BenefitsPanel />;
}
