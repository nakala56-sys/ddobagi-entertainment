import { ServicesView } from "@/views/services/ServicesView";
import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPageMetadata({ title: "서비스", description: "크리에이터 매니지먼트, 라이브 방송 기획·운영, 방송 콘텐츠 제작과 육성, 브랜드·광고 협업을 소개합니다.", path: "/services" });

export default function ServicesPage() {
    return (
        <Main id="services">
            <ServicesView />
        </Main>
    );
}
