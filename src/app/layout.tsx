import type { ReactNode } from "react";
import localFont from "next/font/local";
import { GlobalErrorBoundary } from "@/app/providers/GlobalErrorBoundary";
import { GlobalErrorListener } from "@/app/providers/GlobalErrorListener";
import { buildRootMetadata } from "@/shared/lib/seo";
import "@/shared/styles/index.scss";
import "@/shared/styles/global.css";

export const metadata = buildRootMetadata();
const suit = localFont({ src: "../../public/fonts/suit/woff2/SUIT-Variable.woff2", weight: "100 900", variable: "--font-suit", display: "swap" });

const nanum = localFont({
    src: [
        { path: "../../public/fonts/optimized/NanumSquareR.aa32197e.woff2", weight: "400" },
        { path: "../../public/fonts/optimized/NanumSquareB.47d76a82.woff2", weight: "700" },
        { path: "../../public/fonts/optimized/NanumSquareEB.e703add6.woff2", weight: "800" },
    ],
    variable: "--font-nanum-square",
    display: "swap",
    preload: false,
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="ko"
            className={`${suit.variable} ${nanum.variable}`}
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
