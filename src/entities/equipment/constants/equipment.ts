import type { Equipment } from "../model/equipment.type";

export const equipment: Equipment[] = [
    { id: "camera", title: "카메라", englishTitle: "Camera", description: "크리에이터의 표정과 움직임을 담는 촬영 환경을 구성합니다.", image: "/images/equipment/camera.webp" },
    { id: "lighting", title: "조명", englishTitle: "Lighting", description: "공간과 방송 콘셉트에 맞는 조명 세팅을 지원합니다.", image: "/images/equipment/lighting.webp" },
    { id: "audio", title: "오디오", englishTitle: "Audio", description: "목소리와 현장감을 전달할 수 있도록 오디오 환경을 세팅합니다.", image: "/images/equipment/audio.webp" },
    { id: "pc", title: "방송용 PC", englishTitle: "Broadcast PC", description: "콘텐츠 제작과 라이브 방송에 필요한 작업 환경을 마련합니다.", image: "/images/equipment/pc.webp" },
    {
        id: "streaming",
        title: "송출 시스템",
        englishTitle: "Streaming System",
        description: "방송 화면과 송출 설정, 운영 중 기술적인 문제까지 함께 살핍니다.",
        image: "/images/equipment/streaming.webp",
    },
    {
        id: "studio",
        title: "스튜디오",
        englishTitle: "Studio",
        description: "개인 방송부터 여러 크리에이터가 함께하는 콘텐츠까지, 제작에 집중할 공간을 소개합니다.",
        image: "/images/equipment/studio.webp",
    },
];
