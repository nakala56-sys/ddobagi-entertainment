"use client";

import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Animation from "@/shared/utils/animation";
import { PageTransition } from "@/shared/ui/transition/PageTransition";
import { ApiLoading } from "@/widgets/layout/ApiLoading";

const Header = dynamic(() => import("@/widgets/layout/Header").then((module) => module.Header), { ssr: false });
const Footer = dynamic(() => import("@/widgets/layout/Footer").then((module) => module.Footer), { ssr: false });
const QuickMenu = dynamic(() => import("@/widgets/layout/QuickMenu").then((module) => module.QuickMenu), { ssr: false });
const Toast = dynamic(() => import("@/widgets/layout/Toast").then((module) => module.Toast), { ssr: false });
const Progress = dynamic(() => import("@/widgets/layout/Progress").then((module) => module.Progress), { ssr: false });

export default function SiteLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    useEffect(() => Animation.layout.common(), []);
    return (
        <PageTransition key={pathname}>
            <a
                className="skip-link fixed left-5 -top-20 z-[200] bg-[var(--paper)] text-[var(--ink)] p-[1.6rem_2rem] focus:top-3"
                href="#main-content"
            >
                본문 바로가기
            </a>
            <Header />
            <div id="main-content">{children}</div>
            <Footer />
            <QuickMenu />
            <Toast />
            <Progress />
            <ApiLoading />
        </PageTransition>
    );
}
