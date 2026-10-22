"use client";

import { InputHTMLAttributes, useId, useRef } from "react";

type CalendarSize = "sm" | "md" | "lg" | "xlg";

type CalendarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    className?: string;
    size?: CalendarSize;
};

const sizeClasses: Record<CalendarSize, string> = {
    sm: "min-h-[4.4rem]",
    md: "min-h-[5.2rem]",
    lg: "min-h-[5.2rem]",
    xlg: "min-h-[7.2rem]",
};

function formatCalendarValue(value: string, type: CalendarProps["type"]) {
    if (!value) {
        return "";
    }

    if (type === "date") {
        return value.replace(/-/g, ".");
    }

    if (type === "time") {
        return value;
    }

    return value.replace("T", " ");
}

const Calendar = ({ className = "", size = "md", type = "datetime-local", placeholder, style, value, disabled, id, ...props }: CalendarProps) => {
    const heightClass = sizeClasses[size];
    const generatedId = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputId = id ?? generatedId;
    const displayValue = typeof value === "string" ? formatCalendarValue(value, type) : "";

    function handleOpenPicker() {
        const input = inputRef.current;

        if (!input || disabled) {
            return;
        }

        const pickerInput = input as HTMLInputElement & { showPicker?: () => void };

        if (pickerInput.showPicker) {
            pickerInput.showPicker();

            return;
        }

        input.focus();
        input.click();
    }

    return (
        <div className="relative w-full">
            <input
                {...props}
                className="pointer-events-none absolute h-[0.4rem] w-[0.4rem] opacity-0 leading-[1.0]"
                disabled={disabled}
                id={inputId}
                ref={inputRef}
                type={type}
                value={value}
            />
            <button
                className={`${heightClass} ${className} flex w-full items-center border-[0.4rem] border-[#ededed] bg-white px-[1.6rem] text-left transition-colors hover:border-[#737373] disabled:cursor-not-allowed disabled:bg-[#ffffff] leading-[1.0]`}
                disabled={disabled}
                onClick={handleOpenPicker}
                style={style}
                type="button"
            >
                <span className={displayValue ? "text-inherit" : "text-[#737373]"}>{displayValue || placeholder || "선택해주세요"}</span>
            </button>
        </div>
    );
};

export default Calendar;
