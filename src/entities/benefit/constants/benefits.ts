import type { Benefit } from "../model/benefit.type";

export const benefits: Benefit[] = [
    { id: "setup", title: "전문 장비 설치·세팅", description: "카메라, 조명, 오디오와 송출 환경까지. 전문 기사 방문을 통해 방송에 맞는 환경을 함께 구성합니다.", image: "/images/equipment/setup-desk.jpg" },
    { id: "remote", title: "원격 기술지원", description: "송출 오류와 장비 문제, 방송 세팅까지. 방송 중 발생하는 기술적인 문제에 원격으로 대응합니다.", image: "/images/home/moment-monitor.jpg" },
    {
        id: "directing",
        title: "크리에이터 맞춤 디렉팅",
        description: "방송 스타일과 콘텐츠 방향, 시청자와의 소통까지. 각자의 장점을 찾는 맞춤 피드백을 제공합니다.",
        image: "/images/services/collaboration.jpg",
    },
    {
        id: "design",
        title: "방송 디자인·영상 제작",
        description: "썸네일과 방송 화면, 프로필 이미지, 영상 편집까지. 방송 콘셉트에 맞는 디자인과 콘텐츠를 제작합니다.",
        image: "/images/services/production.jpg",
    },
    {
        id: "events",
        title: "이벤트·콜라보 방송 기획",
        description: "시청자 참여 이벤트, 시즌 콘텐츠, 콜라보 방송까지. 방송의 성격에 맞는 아이디어를 함께 만듭니다.",
        image: "/images/services/live.jpg",
    },
    { id: "beauty", title: "제휴 뷰티 케어", description: "방송 이미지에 맞춘 제휴 뷰티 케어를 지원합니다. 지원 범위와 조건은 상담을 통해 안내합니다.", image: "/images/home/moment-studio-pose.jpg" },
];

export const benefitDetails: Benefit[] = [
    {
        id: "studio",
        title: "전용 방송 스튜디오 지원",
        description: "개인 방송부터 함께 만드는 라이브 콘텐츠까지, 방송과 제작에 집중할 수 있는 스튜디오 환경을 지원합니다.",
        image: "/images/equipment/studio-space.jpg",
    },
    { id: "equipment", title: "방송 장비 지원", description: "방송용 카메라, 조명, 마이크, 방송용 PC 등 콘텐츠와 방송 환경에 맞는 장비 구성을 지원합니다.", image: "/images/equipment/setup-mic.jpg" },
    {
        id: "planning",
        title: "콘텐츠 기획 지원",
        description: "크리에이터의 개성과 방송 스타일에 맞춰 콘텐츠 방향을 찾고, 시청자 참여 이벤트와 콜라보 방송을 함께 기획합니다.",
        image: "/images/home/moment-script.jpg",
    },
    {
        id: "technical",
        title: "방송 세팅 및 기술 지원",
        description: "전문 장비 설치와 OBS 송출 세팅부터 방송 중 발생하는 기술적인 문제의 원격 대응까지 지원합니다.",
        image: "/images/equipment/setup-desk.jpg",
    },
    {
        id: "branding",
        title: "개인 브랜딩 지원",
        description: "크리에이터의 개성과 방송 스타일에 맞춰 프로필과 채널 이미지를 정리하고, 자신만의 브랜드를 만드는 방향을 함께 고민합니다.",
        image: "/images/about/brand-set.jpg",
    },
    {
        id: "production",
        title: "영상·이미지 콘텐츠 제작 지원",
        description: "썸네일, 방송 화면, 프로필 이미지와 영상 편집 등 방송 콘셉트에 맞는 콘텐츠 제작을 지원합니다.",
        image: "/images/services/production.jpg",
    },
    {
        id: "beauty",
        title: "성형시술 지원",
        description: "제휴를 통한 성형·뷰티 시술 지원을 안내합니다. 적용 가능한 항목과 지원 조건은 상담을 통해 확인하실 수 있습니다.",
        image: "/images/home/gallery-stage.jpg",
    },
];
