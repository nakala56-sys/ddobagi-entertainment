"use client";

import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";
import Animation from "@/shared/utils/animation";

const Header = dynamic(() => import("@/widgets/layout/Header").then((module) => module.Header), { ssr: false });
const Footer = dynamic(() => import("@/widgets/layout/Footer").then((module) => module.Footer), { ssr: false });
const QuickMenu = dynamic(() => import("@/widgets/layout/QuickMenu").then((module) => module.QuickMenu), { ssr: false });
const Toast = dynamic(() => import("@/widgets/layout/Toast").then((module) => module.Toast), { ssr: false });
const Progress = dynamic(() => import("@/widgets/layout/Progress").then((module) => module.Progress), { ssr: false });

export default function SiteLayout({ children }: { children: ReactNode }) {
    useEffect(() => Animation.layout.common(), []);
    return <><a className="skip-link" href="#main-content">본문 바로가기</a><Header /><div id="main-content">{children}</div><Footer /><QuickMenu /><Toast /><Progress /></>;
}
