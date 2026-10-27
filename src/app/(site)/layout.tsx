"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import Animation from "@/shared/utils/animation";
import { PageTransition } from "@/shared/ui/transition/PageTransition";
import { ViewTransitionNavigation } from "@/shared/ui/transition/ViewTransitionNavigation";
import { ApiLoading } from "@/widgets/layout/ApiLoading";
import { QuickActions } from "@/widgets/layout/QuickActions";
import { Report } from "@/widgets/layout/Report";
import { QueryProvider } from "@/app/providers/QueryProvider";

const Header = dynamic(() => import("@/widgets/layout/Header").then((module) => module.Header));
const Footer = dynamic(() => import("@/widgets/layout/Footer").then((module) => module.Footer));
const Toast = dynamic(() => import("@/widgets/layout/Toast").then((module) => module.Toast), { ssr: false });
const Progress = dynamic(() => import("@/widgets/layout/Progress").then((module) => module.Progress), { ssr: false });
const WelcomeModal = dynamic(() => import("@/widgets/layout/WelcomeModal").then((module) => module.WelcomeModal), { ssr: false });

export default function SiteLayout({ children }: { children: ReactNode }) {
    const [introReady, setIntroReady] = useState(false);
    const handleReady = useCallback(() => setIntroReady(true), []);

    useEffect(() => Animation.layout.common(), []);
    return (
        <QueryProvider>
            <PageTransition
                onReady={handleReady}
                chrome={
                    <>
                        <a
                            className="skip-link fixed left-[2rem] -top-[8rem] z-[200] bg-[var(--color-point)] text-[var(--color-text)] p-[1.6rem_2rem] focus:top-[1.2rem] leading-[1.0]"
                            href="#main-content"
                        >
                            본문 바로가기
                        </a>
                        <Header />
                        <QuickActions />
                        <Toast />
                        <Report />
                        <Progress />
                        <ApiLoading />
                    </>
                }
            >
                <ViewTransitionNavigation />
                <div id="main-content">{children}</div>
                <Footer />
            </PageTransition>
            {introReady ? <WelcomeModal /> : null}
        </QueryProvider>
    );
}
