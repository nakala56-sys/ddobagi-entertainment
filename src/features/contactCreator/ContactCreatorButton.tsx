import { company } from "@/entities/company/constants/company";

export function ContactCreatorButton({ children = "함께 시작하기", className = "" }: { children?: React.ReactNode; className?: string }) {
    return (
        <a
            className={`contact-button inline-flex items-center justify-between gap-10 border-[0.4rem] border-solid border-[currentColor] p-[2rem_2.8rem] rounded-full text-base leading-[round(up,1.2em,0.4rem)] ${className} `}
            href={company.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
            <span
                className="aria-hidden:text-lg"
                aria-hidden="true"
            >
                ↗
            </span>
            <span className="sr-only absolute w-1 h-1 overflow-hidden [clip:rect(0,_0,_0,_0)] whitespace-nowrap"> (새 창)</span>
        </a>
    );
}
