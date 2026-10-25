import type { Equipment } from "../model/equipment.type";

export const equipment: Equipment[] = [
    { id: "camera", title: "방송용 카메라", englishTitle: "Camera", description: "크리에이터의 표정과 움직임을 담는 촬영 환경을 구성합니다.", image: "/images/equipment/setup-mic.jpg" },
    { id: "lighting", title: "조명", englishTitle: "Lighting", description: "공간과 방송 콘셉트에 맞는 조명 세팅을 지원합니다.", image: "/images/equipment/setup-desk.jpg" },
    {
        id: "audio",
        title: "마이크·오디오",
        englishTitle: "Microphone & Audio",
        description: "마이크와 오디오 장비를 통해 목소리와 현장감을 전달할 수 있도록 방송 환경을 세팅합니다.",
        image: "/images/equipment/setup-mic.jpg",
    },
    { id: "pc", title: "방송용 PC", englishTitle: "Broadcast PC", description: "콘텐츠 제작과 라이브 방송에 필요한 작업 환경을 마련합니다.", image: "/images/equipment/setup-desk.jpg" },
    {
        id: "streaming",
        title: "OBS 및 송출 시스템",
        englishTitle: "OBS & Streaming System",
        description: "OBS 화면 구성과 송출 설정을 지원하고, 방송 중 발생하는 기술적인 문제를 함께 살핍니다.",
        image: "/images/equipment/setup-mic.jpg",
    },
    {
        id: "studio",
        title: "스튜디오",
        englishTitle: "Studio",
        description: "개인 방송부터 여러 크리에이터가 함께하는 콘텐츠까지, 제작에 집중할 공간을 소개합니다.",
        image: "/images/equipment/setup-desk.jpg",
    },
];
