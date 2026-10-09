import type { CompanyProfile } from "../model/company.type";

export const company: CompanyProfile = {
    name: "또바기 엔터테인먼트",
    englishName: "TOBBAGI ENTERTAINMENT",
    address: "서울특별시 강남구 학동로4길 50, 우영빌딩 B1·B2",
    phone: "02-6949-0286",
    contactUrl: "https://open.kakao.com/o/s0UmPOAc",
    mapUrl: "https://map.naver.com/p/search/서울특별시%20강남구%20학동로4길%2050",
};

export const studioImages = [
    { src: "/images/home/studio.webp", alt: "회사소개서에 소개된 또바기 방송 스튜디오와 장비" },
    { src: "/images/equipment/studio.webp", alt: "회사소개서에 소개된 또바기 대형 방송 스튜디오" },
];
