import { AboutView } from "@/views/about/AboutView";
import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPageMetadata({ title: "회사소개", description: "각자의 개성과 가능성을 함께 키워가는 또바기 엔터테인먼트를 소개합니다.", path: "/about" });

export default function AboutPage() {
    return (
        <Main id="about">
            <AboutView />
        </Main>
    );
}
