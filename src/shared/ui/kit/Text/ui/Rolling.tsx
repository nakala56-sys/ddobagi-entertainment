import { formatPriceWithCommas } from "@/shared/utils/formatPrice";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FontSizeProps {
    textSize?: 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38;
}

// 메인 컴포넌트 (숫자를 자릿수별로 분리해서 NumberColumn으로 보냄)
interface AnimateNumberProps extends FontSizeProps {
    value: number;
    amount?: number;
    digit?: number;
    initialValue?: number;
    rollingCount?: number;
    staggerDelay?: number;
    className?: {
        container?: string;
        text?: string;
        guide?: {
            front?: string;
            back?: string;
        };
    };
    guide?: {
        front?: string;
        back?: string;
    };
    delay?: number;
    ariaLabel?: string;
    onClick?: () => void;
}

interface NumberColumnProps extends FontSizeProps {
    active: boolean;
    digit: number;
    className: string;
    initialDigit: number;
    rollingCount: number;
    size: any;
    delay: number;
    staggerDelay: number;
    columnIndex: number;
    onClick?: () => void;
}

export const Rolling = ({
    value,
    amount = 0.25,
    digit = 1,
    delay = 0,
    initialValue = 0,
    rollingCount = 1,
    staggerDelay = 0.06,
    className = {
        container: "",
        text: "",
        guide: {
            front: "",
            back: "",
        },
    },
    textSize = 16,
    guide = {
        front: "",
        back: "",
    },
    ariaLabel = "",
    onClick,
}: AnimateNumberProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);
    const normalizedLength = Math.max(digit, String(Math.trunc(Math.abs(value))).length, String(Math.trunc(Math.abs(initialValue))).length);
    const FORMAT_VALUE = formatPriceWithCommas(value).padStart(normalizedLength, "0").split("");
    const FORMAT_INITIAL_VALUE = formatPriceWithCommas(initialValue).padStart(normalizedLength, "0").split("");

    const sizeMap = {
        12: { text: "1.2", height: "1.2", fontClass: "text-xs", heightClass: "h-3", lineHeightClass: "leading-[1.2rem]" },
        13: { text: "1.2", height: "1.2", fontClass: "text-xs", heightClass: "h-3", lineHeightClass: "leading-[1.2rem]" },
        14: { text: "1.6", height: "1.6", fontClass: "text-base", heightClass: "h-4", lineHeightClass: "leading-[1.6rem]" },
        15: { text: "1.6", height: "1.6", fontClass: "text-base", heightClass: "h-4", lineHeightClass: "leading-[1.6rem]" },
        16: { text: "1.6", height: "1.6", fontClass: "text-base", heightClass: "h-4", lineHeightClass: "leading-[1.6rem]" },
        17: { text: "1.6", height: "1.6", fontClass: "text-base", heightClass: "h-4", lineHeightClass: "leading-[1.6rem]" },
        18: { text: "2", height: "2", fontClass: "text-lg", heightClass: "h-5", lineHeightClass: "leading-[2rem]" },
        19: { text: "2", height: "2", fontClass: "text-lg", heightClass: "h-5", lineHeightClass: "leading-[2rem]" },
        20: { text: "2", height: "2", fontClass: "text-lg", heightClass: "h-5", lineHeightClass: "leading-[2rem]" },
        21: { text: "2", height: "2", fontClass: "text-lg", heightClass: "h-5", lineHeightClass: "leading-[2rem]" },
        22: { text: "2.4", height: "2.4", fontClass: "text-2xl", heightClass: "h-6", lineHeightClass: "leading-[2.4rem]" },
        23: { text: "2.4", height: "2.4", fontClass: "text-2xl", heightClass: "h-6", lineHeightClass: "leading-[2.4rem]" },
        24: { text: "2.4", height: "2.4", fontClass: "text-2xl", heightClass: "h-6", lineHeightClass: "leading-[2.4rem]" },
        25: { text: "2.4", height: "2.4", fontClass: "text-2xl", heightClass: "h-6", lineHeightClass: "leading-[2.4rem]" },
        26: { text: "2.8", height: "2.8", fontClass: "text-[2.8rem]", heightClass: "h-7", lineHeightClass: "leading-[2.8rem]" },
        27: { text: "2.8", height: "2.8", fontClass: "text-[2.8rem]", heightClass: "h-7", lineHeightClass: "leading-[2.8rem]" },
        28: { text: "2.8", height: "2.8", fontClass: "text-[2.8rem]", heightClass: "h-7", lineHeightClass: "leading-[2.8rem]" },
        29: { text: "2.8", height: "2.8", fontClass: "text-[2.8rem]", heightClass: "h-7", lineHeightClass: "leading-[2.8rem]" },
        30: { text: "3.2", height: "3.2", fontClass: "text-3xl", heightClass: "h-8", lineHeightClass: "leading-[3.2rem]" },
        31: { text: "3.2", height: "3.2", fontClass: "text-3xl", heightClass: "h-8", lineHeightClass: "leading-[3.2rem]" },
        32: { text: "3.2", height: "3.2", fontClass: "text-3xl", heightClass: "h-8", lineHeightClass: "leading-[3.2rem]" },
        33: { text: "3.2", height: "3.2", fontClass: "text-3xl", heightClass: "h-8", lineHeightClass: "leading-[3.2rem]" },
        34: { text: "3.6", height: "3.6", fontClass: "text-4xl", heightClass: "h-9", lineHeightClass: "leading-[3.6rem]" },
        35: { text: "3.6", height: "3.6", fontClass: "text-4xl", heightClass: "h-9", lineHeightClass: "leading-[3.6rem]" },
        36: { text: "3.6", height: "3.6", fontClass: "text-4xl", heightClass: "h-9", lineHeightClass: "leading-[3.6rem]" },
        37: { text: "3.6", height: "3.6", fontClass: "text-4xl", heightClass: "h-9", lineHeightClass: "leading-[3.6rem]" },
        38: { text: "4", height: "4", fontClass: "text-[4rem]", heightClass: "h-10", lineHeightClass: "leading-[4rem]" },
    };

    const size = sizeMap[textSize] || sizeMap[14]; // fallback

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return undefined;
        const currentElement = element;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio >= amount) {
                    setActive(true);
                    return;
                }

                if (entry.boundingClientRect.top >= window.innerHeight) {
                    setActive(false);
                }
            },
            {
                threshold: [...new Set([0, amount, ...Array.from({ length: 11 }, (_, index) => index / 10)])].sort((a, b) => a - b),
            },
        );

        function resetWhenBelow() {
            const rect = currentElement.getBoundingClientRect();
            if (rect.top >= window.innerHeight) setActive(false);
        }

        observer.observe(currentElement);
        resetWhenBelow();
        window.addEventListener("scroll", resetWhenBelow, { passive: true });
        window.addEventListener("resize", resetWhenBelow);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", resetWhenBelow);
            window.removeEventListener("resize", resetWhenBelow);
        };
    }, [amount]);

    return (
        <div
            className={`${className?.container ?? ""} relative flex items-center`}
            aria-label={ariaLabel}
            data-value={value}
            ref={containerRef}

        >
            {guide.front ? (
                <motion.p
                    layout
                    className={`${className.guide?.front ?? ""}  ${size.fontClass}`}

                >
                    {guide.front}
                </motion.p>
            ) : null}

            {FORMAT_VALUE.map((digit, idx) => {
                return (
                    <Fragment key={idx}>
                        {digit === "," ? (
                            <motion.p
                                layout
                                className={`${className?.text ?? ""} ${size.fontClass}`}

                            >
                                ,
                            </motion.p>
                        ) : (
                            <NumberColumn
                                active={active}
                                key={idx}
                                digit={parseInt(digit)}
                                className={className?.text ?? ""}
                                initialDigit={parseInt(FORMAT_INITIAL_VALUE[idx] ?? "0")}
                                rollingCount={rollingCount}
                                size={size}
                                delay={delay}
                                staggerDelay={staggerDelay}
                                columnIndex={idx}
                                onClick={onClick}
                            />
                        )}
                    </Fragment>
                );
            })}

            {guide.back ? (
                <motion.p
                    layout
                    className={`${className.guide?.back ?? ""} ${size.fontClass}`}

                >
                    {guide.back}
                </motion.p>
            ) : null}
        </div>
    );
};

// 숫자 하나(자릿수 하나) 애니메이션 처리
const NumberColumn = ({ active, digit, className, initialDigit, rollingCount, size, delay, staggerDelay, columnIndex, onClick }: NumberColumnProps) => {
    const [position, setPosition] = useState(0);
    const numbers = useMemo(() => Array.from({ length: Math.max(1, rollingCount) + 1 }, () => Array.from({ length: 10 }, (_, index) => index)).flat(), [rollingCount]);

    const columnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (columnRef.current) {
            const height = columnRef?.current?.clientHeight;

            setPosition(active ? -height * (Math.max(1, rollingCount) * 10 + digit) : -height * initialDigit); // 음수로 내려가야 증가됨
        }
    }, [active, digit, initialDigit, rollingCount]);

    return (
        <div
            className={`number-column ${className} text-center overflow-hidden ${size.heightClass}`}

            ref={columnRef}
            onClick={onClick}
        >
            <motion.div
                key="number-column"
                animate={{ y: position }}
                transition={{ duration: active ? Math.max(0.9, rollingCount * 0.45) : 0, delay: active ? delay + columnIndex * staggerDelay : 0, ease: [0.25, 0.8, 0.25, 1], staggerChildren: 0.5 }}
                className={`flex flex-col items-center`}
            >
                {numbers.map((number, index) => (
                    <p
                        key={index}
                        className={`${className} text-center ${size.fontClass} ${size.heightClass} ${size.lineHeightClass}`}

                    >
                        {number}
                    </p>
                ))}
            </motion.div>
        </div>
    );
};
