import type { ReactNode } from "react";
import localFont from "next/font/local";
import { GlobalErrorBoundary } from "@/app/providers/GlobalErrorBoundary";
import { GlobalErrorListener } from "@/app/providers/GlobalErrorListener";
import { buildRootMetadata } from "@/shared/lib/seo";
import "@/shared/style/scss/index.scss";
import "./globals.css";

export const metadata = buildRootMetadata();
const suit = localFont({ src: "../../public/fonts/suit/woff2/SUIT-Variable.woff2", weight: "100 900", variable: "--font-suit", display: "swap" });

export default function RootLayout({ children }: { children: ReactNode }) {
    return <html lang="ko" className={suit.variable}><body><GlobalErrorBoundary><GlobalErrorListener />{children}</GlobalErrorBoundary></body></html>;
}
