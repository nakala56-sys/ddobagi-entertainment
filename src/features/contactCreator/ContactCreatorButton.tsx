import { company } from "@/entities/company/constants/company";

export function ContactCreatorButton({ children = "크리에이터 상담하기", className = "" }: { children?: React.ReactNode; className?: string }) {
    return (
        <a
            data-report-id="contact-creator"
            data-report-type="item"
            className={`contact-button inline-flex items-center justify-between gap-[4rem] p-[2rem_2.8rem] rounded-full text-[1.6rem] leading-[1.0] ${className} `}
            href={company.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
            <span
                className="aria-hidden:text-[1.8rem]"
                aria-hidden="true"
            >
                ↗
            </span>
            <span className="sr-only absolute w-[0.4rem] h-[0.4rem] overflow-hidden [clip:rect(0,_0,_0,_0)] whitespace-nowrap"> (새 창)</span>
        </a>
    );
}
