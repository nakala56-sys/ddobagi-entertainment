import { BenefitsView } from "@/views/benefits/BenefitsView";
import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPageMetadata({
    title: "지원 혜택",
    description: "전용 방송 스튜디오, 장비, 콘텐츠 기획, 기술 지원, 개인 브랜딩, 영상·이미지 제작과 성형시술 지원을 안내합니다.",
    path: "/benefits",
});

export default function BenefitsPage() {
    return (
        <Main id="benefits">
            <BenefitsView />
        </Main>
    );
}
