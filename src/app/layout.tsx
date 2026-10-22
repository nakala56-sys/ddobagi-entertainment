import type { ReactNode } from "react";
import localFont from "next/font/local";
import { GlobalErrorBoundary } from "@/app/providers/GlobalErrorBoundary";
import { GlobalErrorListener } from "@/app/providers/GlobalErrorListener";
import { buildRootMetadata } from "@/shared/lib/seo";
import "@/shared/styles/index.scss";
import "@/shared/styles/global.css";

export const metadata = buildRootMetadata();
const astaSans = localFont({
    src: "../../public/fonts/asta-sans/AstaSans-Variable.woff2",
    weight: "300 800",
    style: "normal",
    variable: "--font-asta-sans",
    display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="ko"
            className={astaSans.variable}
        >
            <body>
                <GlobalErrorBoundary>
                    <GlobalErrorListener />
                    {children}
                </GlobalErrorBoundary>
            </body>
        </html>
    );
}
