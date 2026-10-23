type InputSize = "sm" | "md" | "lg" | "xlg";

interface InputProps {
    className?: string;
    name: string;
    placeholder: string;
    type?: string;
    size?: InputSize;
}

const sizeClasses: Record<InputSize, string> = {
    sm: "min-h-[6rem]",
    md: "min-h-[12.8rem]",
    lg: "min-h-[24rem]",
    xlg: "min-h-[32rem]",
};

const TextArea = ({ className = "", name, placeholder, type, size = "md" }: InputProps) => {
    const heightClass = sizeClasses[size];

    return (
        <textarea
            className={`${heightClass} ${className} rounded-[1.6rem] border-[0.4rem] border-[var(--color-line)] hover:border-[#737373] p-[1.6rem] transition-colors leading-[1.5]`}
            name={name}
            placeholder={placeholder}
        />
    );
};

export default TextArea;
