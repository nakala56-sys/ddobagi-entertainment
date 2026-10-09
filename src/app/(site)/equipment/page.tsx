import { EquipmentView } from "@/views/equipment/EquipmentView";
import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPageMetadata({ title: "방송 환경", description: "카메라, 조명, 오디오와 스튜디오 등 방송을 위한 환경을 소개합니다.", path: "/equipment" });

export default function EquipmentPage() {
    return <Main id="equipment"><EquipmentView /></Main>;
}
