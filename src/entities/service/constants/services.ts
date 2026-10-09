import type { Service } from "../model/service.type";

export const services: Service[] = [
    { id: "setup", title: "전문 장비 설치·세팅", englishTitle: "Broadcast Setup", description: "카메라, 조명, 오디오와 송출 환경까지. 전문 기사 방문을 통해 방송에 맞는 환경을 함께 구성합니다.", image: "/images/services/setup.webp" },
    { id: "remote", title: "원격 기술지원", englishTitle: "Technical Support", description: "송출 오류와 장비 문제, 방송 세팅까지. 방송 중 발생하는 기술적인 문제에 원격으로 대응합니다.", image: "/images/services/remote.webp" },
    { id: "directing", title: "맞춤 디렉팅", englishTitle: "Creator Directing", description: "방송 스타일과 콘텐츠 방향, 시청자와의 소통까지. 각자의 장점을 찾는 맞춤 피드백을 제공합니다.", image: "/images/services/directing.webp" },
    { id: "design", title: "디자인 콘텐츠 제작", englishTitle: "Creative Production", description: "썸네일과 방송 화면, 프로필 이미지, 영상 편집까지. 방송 콘셉트에 맞는 디자인과 콘텐츠를 제작합니다.", image: "/images/services/design.webp" },
    { id: "events", title: "이벤트 콘텐츠 기획", englishTitle: "Content Planning", description: "시청자 참여 이벤트, 시즌 콘텐츠, 콜라보 방송까지. 방송의 성격에 맞는 아이디어를 함께 만듭니다.", image: "/images/services/events.webp" },
];
