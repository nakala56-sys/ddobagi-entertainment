import type { Benefit, BenefitGroup } from "../model/benefit.type";

export const benefits: Benefit[] = [
    { id: "setup", title: "전문 장비 설치·세팅", description: "카메라, 조명, 오디오와 송출 환경까지. 전문 기사 방문을 통해 방송에 맞는 환경을 함께 구성합니다.", image: "/images/services/setup.webp" },
    { id: "remote", title: "원격 기술지원", description: "송출 오류와 장비 문제, 방송 세팅까지. 방송 중 발생하는 기술적인 문제에 원격으로 대응합니다.", image: "/images/services/remote.webp" },
    { id: "directing", title: "맞춤 디렉팅", description: "방송 스타일과 콘텐츠 방향, 시청자와의 소통까지. 각자의 장점을 찾는 맞춤 피드백을 제공합니다.", image: "/images/services/directing.webp" },
    {
        id: "design",
        title: "디자인 콘텐츠 제작",
        description: "썸네일과 방송 화면, 프로필 이미지, 영상 편집까지. 방송 콘셉트에 맞는 디자인과 콘텐츠를 제작합니다.",
        image: "/images/services/design.webp",
    },
    { id: "events", title: "이벤트 콘텐츠 기획", description: "시청자 참여 이벤트, 시즌 콘텐츠, 콜라보 방송까지. 방송의 성격에 맞는 아이디어를 함께 만듭니다.", image: "/images/services/events.webp" },
    { id: "beauty", title: "뷰티 지원", description: "소개서에 안내된 제휴 뷰티 케어와 스타일링 지원입니다. 적용 범위와 조건은 상담을 통해 안내합니다.", image: "/images/benefits/beauty.webp" },
];

export const benefitGroups: BenefitGroup[] = [
    { title: "방송에 집중할 환경", englishTitle: "Production Environment", description: "전문 장비 설치와 맞춤 세팅으로 방송을 시작할 준비를 함께합니다.", benefitIds: ["setup"] },
    { title: "함께하는 방송 운영", englishTitle: "Broadcast Support", description: "기술적인 문제는 함께 해결하고, 방송의 방향은 맞춤 디렉팅으로 찾아갑니다.", benefitIds: ["remote", "directing"] },
    { title: "계속 성장하는 콘텐츠", englishTitle: "Creative Growth", description: "디자인 제작과 새로운 이벤트 기획으로 크리에이터의 개성을 콘텐츠에 담습니다.", benefitIds: ["design", "events"] },
    { title: "나를 표현하는 스타일", englishTitle: "Personal Styling", description: "제휴 뷰티 케어와 스타일링 지원을 통해 크리에이터의 표현을 돕습니다.", benefitIds: ["beauty"] },
];
