"use client";

import { useEffect, useRef } from "react";

import Animation from "@/shared/utils/animation";

export function BrandMessage() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        return Animation.about.section.brandMessage(sectionRef.current);
    }, []);
    return (
        <section ref={sectionRef} className="brand-message section-dark" aria-labelledby="brand-message-title"><div className="content-width">
            <p className="eyebrow">02 — THE TOBBAGI WAY</p><h2 id="brand-message-title"><span data-word data-reveal>꾸준히.</span><span data-word data-reveal>한결같이.</span><span className="accent" data-word data-reveal>함께.</span></h2><p className="body-copy">Consistently. Sincerely. Together.<br />각자의 장점이 자연스럽게 빛날 수 있도록.</p>
        </div></section>
    );
}
