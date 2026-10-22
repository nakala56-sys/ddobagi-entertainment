"use client";

import { ReactNode, SelectHTMLAttributes } from "react";

type SelectOption = {
    label: string;
    value: string;
};

type SelectSize = "sm" | "md" | "lg" | "xlg";

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
    className?: string;
    icon?: ReactNode;
    iconClassName?: string;
    options: SelectOption[];
    size?: SelectSize;
    onClick?: () => void;
    wrapperClassName?: string;
};

const sizeClasses: Record<SelectSize, string> = {
    sm: "min-h-[4.4rem]",
    md: "min-h-[5.2rem]",
    lg: "min-h-[5.2rem]",
    xlg: "min-h-[7.2rem]",
};

const defaultIcon = (
    <svg
        aria-hidden="true"
        fill="none"
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
        />
    </svg>
);

const Select = ({ className = "", icon = defaultIcon, iconClassName = "", options, size = "sm", wrapperClassName = "", onClick, ...props }: SelectProps) => {
    const heightClass = sizeClasses[size];

    return (
        <div className={`${heightClass} relative ${wrapperClassName}`}>
            <select
                {...props}
                className={`${className} w-full appearance-none border-[0.4rem] px-[1.2rem] cursor-pointer hover:bg-[#ffffff] leading-[1.0]`}

                onClick={onClick}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            <span className={`pointer-events-none absolute right-[1.6rem] top-1/2 -translate-y-1/2 text-[#d1d6db] ${iconClassName}`}>{icon}</span>
        </div>
    );
};

export default Select;
