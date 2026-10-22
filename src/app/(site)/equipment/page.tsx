import { EquipmentView } from "@/views/equipment/EquipmentView";
import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPageMetadata({ title: "방송 환경", description: "방송용 카메라, 조명, 마이크, 방송용 PC, 스튜디오와 OBS 및 송출 시스템을 소개합니다.", path: "/equipment" });

export default function EquipmentPage() {
    return (
        <Main id="equipment">
            <EquipmentView />
        </Main>
    );
}
