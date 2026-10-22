import { HomeView } from "@/views/home/HomeView";
import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPageMetadata({
    title: "또바기 엔터테인먼트",
    description: "라이브 방송 크리에이터를 위한 또바기 엔터테인먼트. 방송 준비부터 콘텐츠 제작, 맞춤 디렉팅까지 크리에이터의 시작과 성장을 함께합니다.",
    path: "/",
});

export default function HomePage() {
    return (
        <Main id="home">
            <HomeView />
        </Main>
    );
}
