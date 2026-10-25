"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Animation from "@/shared/utils/animation";

export function ViewTransitionNavigation() {
    const router = useRouter();
    const pathname = usePathname();
    const pending = useRef<(() => void) | null>(null);
    const scrollTopOnNavigation = useRef(false);

    useLayoutEffect(() => {
        if (scrollTopOnNavigation.current) Animation.layout.scrollToTop();
        pending.current?.();
        pending.current = null;
    }, [pathname]);

    useEffect(() => {
        if (!scrollTopOnNavigation.current) return;
        const frame = window.requestAnimationFrame(() => {
            if (!scrollTopOnNavigation.current) return;
            Animation.layout.scrollToTop();
            scrollTopOnNavigation.current = false;
        });
        return () => window.cancelAnimationFrame(frame);
    }, [pathname]);

    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            if (!(event.target instanceof Element)) return;
            const anchor = event.target.closest("a");
            if (!(anchor instanceof HTMLAnchorElement)) return;
            if (anchor.target && anchor.target !== "_self") return;
            if (anchor.hasAttribute("download")) return;
            const href = anchor.getAttribute("href");
            if (!href || href.startsWith("#")) return;

            const url = new URL(anchor.href);
            if (url.origin !== window.location.origin) return;
            if (url.pathname === window.location.pathname && url.search === window.location.search) return;
            if (!url.hash) scrollTopOnNavigation.current = true;
            if (typeof document.startViewTransition !== "function") return;

            event.preventDefault();
            const next = `${url.pathname}${url.search}${url.hash}`;
            document.startViewTransition(() => {
                return new Promise<void>((resolve) => {
                    const timer = window.setTimeout(resolve, 1500);
                    pending.current = () => {
                        window.clearTimeout(timer);
                        resolve();
                    };
                    router.push(next, { scroll: false });
                });
            });
        };

        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, [router]);

    return null;
}
