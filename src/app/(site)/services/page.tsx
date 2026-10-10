import { ServicesView } from "@/views/services/ServicesView";
import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPageMetadata({ title: "서비스", description: "전문 장비 세팅, 기술지원, 디렉팅과 콘텐츠 제작 서비스를 소개합니다.", path: "/services" });

export default function ServicesPage() {
    return (
        <Main id="services">
            <ServicesView />
        </Main>
    );
}
