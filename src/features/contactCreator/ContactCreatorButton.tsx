import { company } from "@/entities/company/constants/company";

export function ContactCreatorButton({ children = "함께 시작하기", className = "" }: { children?: React.ReactNode; className?: string }) {
    return <a className={`contact-button ${className}`} href={company.contactUrl} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true">↗</span><span className="sr-only"> (새 창)</span></a>;
}
