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
    sm: "min-h-11",
    md: "min-h-13",
    lg: "min-h-13",
    xlg: "min-h-18",
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
                className={`${className} w-full appearance-none border-[0.4rem] px-3 cursor-pointer hover:bg-[var(--adaptive-grey100)]`}

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

            <span className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--adaptive-black300)] ${iconClassName}`}>{icon}</span>
        </div>
    );
};

export default Select;
