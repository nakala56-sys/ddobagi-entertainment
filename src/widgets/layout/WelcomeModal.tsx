"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { MetallicPaint } from "@/shared/ui/metallic-paint/MetallicPaint";

const HIDDEN_UNTIL_KEY = "ddobagi:welcome-hidden-until:v1";
const SUPPORT_ITEMS = ["개인방송 스튜디오·장비 지원", "콘텐츠 기획·방송세팅·기술지원", "개인브랜딩 지원", "방송 스튜디오·지하 1층 연습실 대여/대관"];
const MOTION_MS = 500;

function prefersReducedMotion() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function WelcomeModal() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const descriptionId = useId();
    const [open, setOpen] = useState(false);
    const [entered, setEntered] = useState(false);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        try {
            const hiddenUntil = Number(window.localStorage.getItem(HIDDEN_UNTIL_KEY));
            setOpen(!Number.isFinite(hiddenUntil) || hiddenUntil <= Date.now());
        } catch {
            setOpen(true);
        }
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog || !open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();

        const frame = requestAnimationFrame(() => {
            if (prefersReducedMotion()) {
                setEntered(true);
                return;
            }
            requestAnimationFrame(() => setEntered(true));
        });

        return () => {
            cancelAnimationFrame(frame);
            dialog.close();
            document.body.style.overflow = previousOverflow;
            setEntered(false);
            setClosing(false);
        };
    }, [open]);

    useEffect(() => {
        if (!closing) return;
        const delay = prefersReducedMotion() ? 0 : MOTION_MS;
        const timer = window.setTimeout(() => {
            setOpen(false);
        }, delay);
        return () => window.clearTimeout(timer);
    }, [closing]);

    const close = () => {
        if (!open || closing) return;
        setClosing(true);
        setEntered(false);
    };

    const hideToday = () => {
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);
        try {
            window.localStorage.setItem(HIDDEN_UNTIL_KEY, String(tomorrow.getTime()));
        } catch {
            // 저장소를 사용할 수 없는 환경에서도 모달은 닫습니다.
        }
        close();
    };

    return (
        <dialog
            ref={dialogRef}
            data-entered={entered ? "true" : "false"}
            className="welcome-modal m-auto max-h-[calc(100svh_-_3.2rem)] w-[calc(100vw_-_3.2rem)] max-w-[56rem] overflow-y-auto overscroll-contain rounded-[2.4rem] border-0 bg-[var(--color-background)] p-0 text-[var(--color-text)] opacity-0 scale-[0.97] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none backdrop:bg-[#101d17c9] backdrop:backdrop-blur-[0.3rem] backdrop:opacity-0 backdrop:transition-opacity backdrop:duration-500 backdrop:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:backdrop:transition-none data-[entered=true]:opacity-100 data-[entered=true]:scale-100 data-[entered=true]:backdrop:opacity-100"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            data-lenis-prevent
            onCancel={(event) => {
                event.preventDefault();
                close();
            }}
        >
            <div className="relative flex flex-col gap-[2.4rem]">
                <section className="flex px-[2.4rem] mt-[2.4rem]">
                    <div className="flex items-center gap-[1.6rem]">
                        {open ? (
                            <MetallicPaint
                                imageSrc="/images/common/ttobagi-logo.webp"
                                preserveMaterial
                                color="#e8c46a"
                                width={52}
                                height={52}
                                density={1.8}
                                softness={0.05}
                                edgeBend={1}
                                speed={1}
                                dispersion={0.15}
                            />
                        ) : null}
                    </div>
                    <button
                        type="button"
                        className="absolute top-[1rem] right-[1rem] flex h-[4.4rem] w-[4.4rem] items-center justify-center text-[var(--color-gray-700)] transition-colors hover:text-[var(--color-point)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-point)]"
                        aria-label="안내 모달 닫기"
                        onClick={close}
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-hidden="true"
                        >
                            <path d="m5 5 14 14M19 5 5 19" />
                        </svg>
                    </button>
                </section>

                <section className="flex flex-col gap-[0.8rem] px-[2.4rem]">
                    <h2
                        id={titleId}
                        className="text-[3rem] leading-[1.3] font-[800] tracking-[-0.06em] break-keep tablet:text-[3.8rem]"
                    >
                        당신의 방송,
                        <br />
                        함께 준비하겠습니다.
                    </h2>
                    <p
                        id={descriptionId}
                        className="text-[1.6rem] leading-[1.8] text-[var(--color-gray-700)] tablet:text-[1.8rem]"
                    >
                        처음 시작하는 방송도,
                        <br />
                        다음 단계를 준비하는 방송도.
                    </p>
                </section>

                {/* <div className="w-full flex-1 h-[0.1rem] bg-[#00000020]" /> */}

                <section>
                    <ul className="px-[2.4rem] flex flex-col gap-[0.4rem] text-[1.5rem] leading-[1.6] text-[var(--color-gray-800)] tablet:text-[1.6rem]">
                        {SUPPORT_ITEMS.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-[0.8rem] break-keep"
                            >
                                <span
                                    className="shrink-0 text-[var(--color-point)]"
                                    aria-hidden="true"
                                >
                                    ✓
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="px-[2.4rem] mt-[2.0rem] text-[1.4rem] leading-[1] break-keep text-[var(--color-gray-500)] text-left">* 지원 범위와 공간 이용 조건은 상담을 통해 안내합니다.</p>
                </section>

                <Link
                    href="/benefits"
                    className="flex min-h-[5.6rem] items-center justify-center gap-[0.8rem] bg-[#243028] px-[1.6rem] py-[1.6rem] text-[1.6rem] font-[700] text-[var(--color-background)] transition-colors hover:bg-[var(--color-gray-800)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-point)]"
                    onClick={close}
                >
                    지원 및 이용 안내 보기
                    <span aria-hidden="true">↗</span>
                </Link>
            </div>
            <div className="flex items-center justify-center gap-[1.6rem] px-[2.4rem] py-[0.4rem] text-[1.4rem] text-[var(--color-gray-500)] tablet:px-[3.6rem]">
                <button
                    type="button"
                    className="min-h-[1.4rem] text-center hover:text-[var(--color-point)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-point)]"
                    onClick={hideToday}
                >
                    오늘 하루 보지 않기
                </button>
            </div>
        </dialog>
    );
}
