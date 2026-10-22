import React, { InputHTMLAttributes } from "react";

type InputSize = "sm" | "md" | "lg" | "xlg";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    className?: string;
    name: string;
    placeholder: string;
    size?: InputSize;
}

const sizeClasses: Record<InputSize, string> = {
    sm: "min-h-[4.4rem]",
    md: "min-h-[5.2rem]",
    lg: "min-h-[5.2rem]",
    xlg: "min-h-[7.2rem]",
};

const Input = ({ className = "", name, placeholder, type, size = "md", ...props }: InputProps) => {
    const heightClass = sizeClasses[size];

    return (
        <input
            {...props}
            className={`${heightClass} ${className} rounded-[1.6rem] border-[0.4rem] border-[#ededed] hover:border-[#737373] px-[1.6rem] transition-colors leading-[1.0]`}
            name={name}
            placeholder={placeholder}
            type={type}
        />
    );
};

export default Input;
