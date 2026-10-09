type InputSize = "sm" | "md" | "lg" | "xlg";

interface InputProps {
    className?: string;
    name: string;
    placeholder: string;
    type?: string;
    size?: InputSize;
}

const sizeClasses: Record<InputSize, string> = {
    sm: "min-h-15",
    md: "min-h-32",
    lg: "min-h-60",
    xlg: "min-h-80",
};

const TextArea = ({ className = "", name, placeholder, type, size = "md" }: InputProps) => {
    const heightClass = sizeClasses[size];

    return (
        <textarea
            className={`${heightClass} ${className} rounded-[1.6rem] border-[0.4rem] border-[var(--adaptive-black100)] hover:border-[var(--adaptive-black500)] p-4 transition-colors`}
            name={name}
            placeholder={placeholder}

        />
    );
};

export default TextArea;
