import type { ReactNode } from "react";

type MainProps = { children: ReactNode; id?: string; className?: { container?: string; inner?: string } };

export default function Main({ children, id, className }: MainProps) {
    return (
        <main
            id={id}
            tabIndex={-1}
            className={className?.container}
        >
            <div className={className?.inner}>{children}</div>
        </main>
    );
}
