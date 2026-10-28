import type { Service } from "../model/service.type";

export const services: Service[] = [
    {
        id: "management",
        title: "크리에이터 매니지먼트",
        englishTitle: "Creator Management",
        description: "크리에이터의 개성과 방송 스타일을 바탕으로 활동 방향을 함께 찾고, 꾸준히 성장할 수 있도록 방송 활동을 관리하고 지원합니다. 조건에 따라 최대 10:0 계약도 안내합니다.",
        image: "/images/services/management.jpg",
    },
    {
        id: "live",
        title: "라이브 방송 기획 및 운영",
        englishTitle: "Live Production",
        description: "방송 콘셉트와 진행 구성을 기획하고, 시청자 참여 이벤트와 콜라보 방송 등 라이브 콘텐츠의 운영을 함께합니다.",
        image: "/images/services/live.jpg",
    },
    {
        id: "production",
        title: "방송 콘텐츠 제작",
        englishTitle: "Content Production",
        description: "방송 콘셉트에 맞는 콘텐츠를 기획하고, 썸네일과 방송 화면, 프로필 이미지, 영상 편집 등 제작에 필요한 작업을 지원합니다.",
        image: "/images/services/production.jpg",
    },
    {
        id: "development",
        title: "크리에이터 육성 및 지원",
        englishTitle: "Creator Development",
        description: "방송을 처음 준비하는 단계부터 콘텐츠 방향과 시청자 소통에 대한 맞춤 피드백까지, 크리에이터의 경험과 준비 상황에 맞춰 성장을 돕습니다.",
        image: "/images/services/development.jpg",
    },
    {
        id: "collaboration",
        title: "브랜드·광고 협업",
        englishTitle: "Brand Collaboration",
        description: "크리에이터의 개성과 콘텐츠에 맞는 브랜드·광고 협업을 기획하고, 콘텐츠 제작과 진행을 함께 조율합니다.",
        image: "/images/services/collaboration.jpg",
    },
];
