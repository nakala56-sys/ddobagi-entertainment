"use client";

import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";
import Animation from "@/shared/utils/animation";
import { PageTransition } from "@/shared/ui/transition/PageTransition";
import { ViewTransitionNavigation } from "@/shared/ui/transition/ViewTransitionNavigation";
import { ApiLoading } from "@/widgets/layout/ApiLoading";
import { Report } from "@/widgets/layout/Report";
import { QueryProvider } from "@/app/providers/QueryProvider";

const Header = dynamic(() => import("@/widgets/layout/Header").then((module) => module.Header));
const Footer = dynamic(() => import("@/widgets/layout/Footer").then((module) => module.Footer));
const QuickMenu = dynamic(() => import("@/widgets/layout/QuickMenu").then((module) => module.QuickMenu), { ssr: false });
const Toast = dynamic(() => import("@/widgets/layout/Toast").then((module) => module.Toast), { ssr: false });
const Progress = dynamic(() => import("@/widgets/layout/Progress").then((module) => module.Progress), { ssr: false });

export default function SiteLayout({ children }: { children: ReactNode }) {
    useEffect(() => Animation.layout.common(), []);
    return (
        <QueryProvider>
            <PageTransition>
                <ViewTransitionNavigation />
                <a
                    className="skip-link fixed left-[2rem] -top-[8rem] z-[200] bg-[var(--color-point)] text-[var(--color-text)] p-[1.6rem_2rem] focus:top-[1.2rem] leading-[1.0]"
                    href="#main-content"
                >
                    본문 바로가기
                </a>
                <Header />
                <div id="main-content">{children}</div>
                <Footer />
                {/* <QuickMenu /> */}
                <Toast />
                <Report />
                <Progress />
                <ApiLoading />
            </PageTransition>
        </QueryProvider>
    );
}
