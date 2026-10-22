"use client";

import { useEffect, useRef } from "react";
import Animation from "@/shared/utils/animation";

const QUESTIONS = [
    {
        question: "방송 경험이 없어도 상담할 수 있나요?",
        answer: "네, 처음 방송을 준비하는 분도 상담할 수 있습니다. 현재 준비 상황과 관심 있는 콘텐츠를 들려주시면, 필요한 방송 환경과 활동 방향을 함께 이야기합니다.",
    },
    {
        question: "장비와 콘텐츠 제작도 지원하나요?",
        answer: "장비 설치·세팅, 맞춤 디렉팅, 방송 디자인·영상 제작, 이벤트·콜라보 방송 기획 등을 지원합니다. 제휴 뷰티 케어를 포함한 세부 지원 범위와 조건은 상담을 통해 안내합니다.",
    },
    {
        question: "방송 중 기술적인 문제가 생기면 도움을 받을 수 있나요?",
        answer: "송출 오류와 장비 문제, 방송 세팅 등 기술적인 문제에 원격으로 대응합니다. 구체적인 지원 방법과 범위는 상담 시 안내해드립니다.",
    },
    {
        question: "지원 비용과 계약 조건은 어떻게 되나요?",
        answer: "지원 비용과 계약 조건은 상담을 통해 안내합니다. 필요한 지원과 앞으로의 활동 방향을 먼저 이야기해주세요.",
    },
    {
        question: "상담은 어떻게 신청하나요?",
        answer: "‘크리에이터 상담하기’를 누르면 카카오톡 오픈채팅으로 연결됩니다. 준비 중이거나 현재 진행 중인 방송에 대해 편하게 남겨주세요.",
    },
];

export function CreatorFaq() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.landing.section.creatorFaq(sectionRef.current);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section relative z-10 bg-white py-[7.2rem] tablet:py-[12rem]"
            aria-labelledby="home-faq-title"
        >
            <div className="content-width mx-auto grid w-[calc(100%_-_4rem)] tablet:w-[calc(100%_-_8rem)] pc:w-[calc(100%_-_12rem)] pc:max-w-[132rem] grid-cols-1 tablet:grid-cols-[0.8fr_1.2fr] items-start gap-[4rem] pc:gap-[7.2rem]">
                <div>
                    <h2
                        id="home-faq-title"
                        className="display-title mt-[2rem] tablet:mt-[2.8rem] text-[3.6rem] tablet:text-[4rem] pc:text-[5.6rem] leading-[1.5] font-[580] break-keep"
                        data-reveal
                    >
                        자주 묻는
                        <br />
                        질문.
                    </h2>
                    <p
                        className="body-copy mt-[3.2rem] max-w-[36rem] text-[1.6rem] pc:text-[1.8rem] leading-[1.5] text-[#737373] break-keep"
                        data-reveal
                    >
                        방송을 시작하기 전, 궁금한 내용을 확인해보세요.
                    </p>
                </div>
                <div className="border-t border-solid border-[#dedede]">
                    {QUESTIONS.map((item) => (
                        <details
                            key={item.question}
                            className="group border-b border-solid border-[#dedede]"
                            data-reveal
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-[2.4rem] py-[2.8rem] text-[1.8rem] tablet:text-[2.4rem] font-[600] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent,#000000)] [&::-webkit-details-marker]:hidden leading-[1.5]">
                                <span className="break-keep">{item.question}</span>
                                <span
                                    className="shrink-0 text-[var(--accent,#000000)] transition-transform group-open:rotate-45 motion-reduce:transition-none"
                                    aria-hidden="true"
                                >
                                    +
                                </span>
                            </summary>
                            <p className="pb-[2.8rem] pr-[4.8rem] text-[1.6rem] leading-[1.5] text-[#737373] break-keep">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
