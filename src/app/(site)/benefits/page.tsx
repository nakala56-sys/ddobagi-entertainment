import { BenefitsView } from "@/views/benefits/BenefitsView";
import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPageMetadata({ title: "지원 혜택", description: "또바기 크리에이터를 위한 방송 운영, 콘텐츠 제작과 제휴 지원을 소개합니다.", path: "/benefits" });

export default function BenefitsPage() {
    return <Main id="benefits"><BenefitsView /></Main>;
}
