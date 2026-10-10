import React, { InputHTMLAttributes } from "react";

type InputSize = "sm" | "md" | "lg" | "xlg";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    className?: string;
    name: string;
    placeholder: string;
    size?: InputSize;
}

const sizeClasses: Record<InputSize, string> = {
    sm: "min-h-11",
    md: "min-h-13",
    lg: "min-h-13",
    xlg: "min-h-18",
};

const Input = ({ className = "", name, placeholder, type, size = "md", ...props }: InputProps) => {
    const heightClass = sizeClasses[size];

    return (
        <input
            {...props}
            className={`${heightClass} ${className} rounded-[1.6rem] border-[0.4rem] border-[var(--adaptive-black100)] hover:border-[var(--adaptive-black500)] px-4 transition-colors`}
            name={name}
            placeholder={placeholder}
            type={type}
        />
    );
};

export default Input;
