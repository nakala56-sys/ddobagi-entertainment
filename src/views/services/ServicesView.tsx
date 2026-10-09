"use client";

import dynamic from "next/dynamic";

const ServicesPanel = dynamic(() => import("@/widgets/services").then((module) => module.ServicesPanel), {
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

export function ServicesView() {
    return <ServicesPanel />;
}
