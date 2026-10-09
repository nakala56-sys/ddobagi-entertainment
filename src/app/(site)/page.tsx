import { HomeView } from "@/views/home/HomeView";
import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPageMetadata({ title: "또바기 엔터테인먼트", description: "방송 환경부터 콘텐츠까지, 크리에이터의 성장을 함께 만드는 또바기 엔터테인먼트입니다.", path: "/" });

export default function HomePage() {
    return <Main id="home"><HomeView /></Main>;
}
