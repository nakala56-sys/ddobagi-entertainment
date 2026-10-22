interface TextShimmerProps {
    children: string;
    as?: React.ElementType;
    className?: string;
    duration?: number;
    style?: React.CSSProperties;
    color?: {
        start: string;
        end: string;
    };
}

export const Shimmer = ({
    children,
    as: Component = "span",
    className = "",
    style = {},
    color = {
        start: "var(--color-brand-500)",
        end: "rgba(0,0,0,1)",
    },
    duration = 2,
}: TextShimmerProps) => {
    return (
        <Component
            ref={null}
            className={`inline-block relative text-transparent bg-clip-text bg-size-[400%_100%] bg-repeat bg-position-[0%_0%] animate-[text-shimmer_var(--shimmer-duration,2s)_cubic-bezier(0.22,1,0.36,1)_infinite] bg-[linear-gradient(90deg,var(--shimmer-start)_0%,var(--shimmer-end)_50%,var(--shimmer-start)_100%)] [-webkit-text-fill-color:transparent] ${className}`}
            style={{ ...style, "--shimmer-start": color.start, "--shimmer-end": color.end, "--shimmer-duration": `${duration}s` } as React.CSSProperties}
        >
            {children}
        </Component>
    );
};
