import Link from "next/link";

import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPageMetadata({
    title: "페이지를 찾을 수 없습니다 | 또바기 엔터테인먼트",
    description: "요청하신 페이지를 찾을 수 없습니다.",
    path: "/404",
    noIndex: true,
});

export default function NotFound() {
    return (
        <Main
            id="not-found"
            className={{ container: "min-h-[calc(100svh-10.8rem)]" }}
        >
            <section className="mx-auto flex min-h-[calc(100svh-10.8rem)] max-w-170 flex-col items-center justify-center gap-6 px-4 py-13 text-center">
                <p className="text-base font-[700] text-[var(--adaptive-grey500)]">404</p>
                <h1 className="m-0 text-3xl font-[900] leading-[round(up,1.4em,0.4rem)]">페이지를 찾을 수 없습니다</h1>
                <p className="m-0 text-lg leading-[round(up,1.6em,0.4rem)] text-[var(--adaptive-grey500)]">주소가 변경되었거나 더 이상 제공되지 않는 페이지입니다.</p>
                <Link
                    className="rounded-full bg-black px-6 py-4 text-base font-[700] text-white"
                    href="/"
                >
                    메인으로 돌아가기
                </Link>
            </section>
        </Main>
    );
}
