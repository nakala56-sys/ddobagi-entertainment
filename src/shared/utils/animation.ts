import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Cleanup = () => void;
type Conditions = { desktop: boolean; reduced: boolean };
type SectionAnimation = (root: HTMLElement, conditions: Conditions) => void | Cleanup;

// Every section owns its selectors, timelines, media queries and cleanup.
function section(root: HTMLElement, animate: SectionAnimation): Cleanup {
    const media = gsap.matchMedia(root);
    let active = true;
    let refreshFrame = 0;
    const refresh = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
            if (active) ScrollTrigger.refresh();
        });
    };
    media.add({ all: "(min-width: 0px)", desktop: "(min-width: 900px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
        const conditions = context.conditions as Conditions;
        // Static markup remains readable when animation is disabled.
        if (conditions.reduced) return;
        return animate(root, conditions);
    });
    const images = Array.from(root.querySelectorAll("img"));
    images.forEach((image) => image.addEventListener("load", refresh));
    document.fonts.ready.then(() => { if (active) refresh(); });
    refresh();
    return () => {
        active = false;
        cancelAnimationFrame(refreshFrame);
        images.forEach((image) => image.removeEventListener("load", refresh));
        media.revert();
    };
}

function reveal(root: HTMLElement) {
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, { autoAlpha: 0, y: 36, duration: 0.85, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 92%", toggleActions: "play none none reverse" } });
    });
}

function intro(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        gsap.from(root.querySelectorAll("[data-line]"), { yPercent: 105, autoAlpha: 0, duration: 1.1, stagger: 0.13, ease: "power3.out" });
        gsap.from(root.querySelectorAll("[data-reveal]"), { autoAlpha: 0, y: 24, delay: 0.35, duration: 1 });
        if (desktop) gsap.to(root.querySelector("[data-image]"), { scale: 1.12, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1 } });
    });
}

function entrance(root: HTMLElement): Cleanup {
    return section(root, () => { reveal(root); });
}

function imageReveal(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        reveal(root);
        if (desktop) gsap.fromTo(root.querySelector("[data-image]"), { clipPath: "inset(12% 8% 12% 8%)", scale: 0.95 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none", scrollTrigger: { trigger: root, start: "top 80%", end: "center center", scrub: 1 } });
    });
}

function message(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        if (!desktop) { reveal(root); return; }
        const words = root.querySelectorAll("[data-word]");
        gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=130%", pin: true, scrub: 1, invalidateOnRefresh: true } })
            .from(words, { opacity: 0.15, y: 30, stagger: 0.6, duration: 0.7 });
    });
}

function serviceOverview(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        reveal(root);
        if (!desktop) return;
        const cleanups: Cleanup[] = [];
        root.querySelectorAll<HTMLElement>("[data-service-row]").forEach((row) => {
            const preview = row.querySelector<HTMLElement>("[data-preview]");
            if (!preview) return;
            // All animations are created inside the media context; events only control them.
            const x = gsap.quickTo(preview, "x", { duration: 0.35, ease: "power3.out" });
            const y = gsap.quickTo(preview, "y", { duration: 0.35, ease: "power3.out" });
            const visibility = gsap.fromTo(preview, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.25, paused: true });
            const enter = () => visibility.play();
            const leave = () => visibility.reverse();
            const move = (event: PointerEvent) => {
                const bounds = row.getBoundingClientRect();
                x(event.clientX - bounds.left - bounds.width * 0.68);
                y((event.clientY - bounds.top - bounds.height / 2) * 0.3);
            };
            row.addEventListener("pointerenter", enter);
            row.addEventListener("pointerleave", leave);
            row.addEventListener("pointermove", move);
            row.addEventListener("focusin", enter);
            row.addEventListener("focusout", leave);
            cleanups.push(() => {
                row.removeEventListener("pointerenter", enter);
                row.removeEventListener("pointerleave", leave);
                row.removeEventListener("pointermove", move);
                row.removeEventListener("focusin", enter);
                row.removeEventListener("focusout", leave);
            });
        });
        return () => cleanups.forEach((cleanup) => cleanup());
    });
}

function horizontal(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        if (!desktop) { reveal(root); return; }
        const track = root.querySelector<HTMLElement>("[data-track]");
        const viewport = root.querySelector<HTMLElement>("[data-viewport]");
        if (!track || !viewport) return;
        root.classList.add("is-horizontal");
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        const cards = track.querySelectorAll<HTMLElement>("[data-slide]");
        const counter = root.querySelector<HTMLElement>("[data-counter]");
        const progress = root.querySelector<HTMLElement>("[data-slider-progress]");
        const tween = gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: {
            trigger: root, start: "top top", end: () => `+=${Math.max(distance(), window.innerHeight)}`, pin: true, scrub: 1, invalidateOnRefresh: true,
            snap: { snapTo: 1 / Math.max(1, cards.length - 1), duration: { min: 0.1, max: 0.25 }, delay: 0.15 },
            onUpdate: (trigger) => {
                if (counter) counter.textContent = `${String(Math.round(trigger.progress * (cards.length - 1)) + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
                if (progress) progress.style.transform = `scaleX(${trigger.progress})`;
            },
        } });
        cards.forEach((card) => gsap.fromTo(card.querySelector("[data-slide-image]"), { scale: 1 }, { scale: 1.06, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true } }));
        let focusFrame = 0;
        const select = (index: number) => {
            if (index < 0) return;
            cancelAnimationFrame(focusFrame);
            // Native anchor/focus scrolling finishes before we select the horizontal card.
            focusFrame = requestAnimationFrame(() => {
                const trigger = tween.scrollTrigger;
                if (!trigger) return;
                window.scrollTo({ top: trigger.start + index / Math.max(1, cards.length - 1) * (trigger.end - trigger.start), behavior: "instant" });
                ScrollTrigger.update();
            });
        };
        const focus = (event: FocusEvent) => select(Array.from(cards).findIndex((card) => card.contains(event.target as Node)));
        const hash = () => select(Array.from(cards).findIndex((card) => `#${card.id}` === window.location.hash));
        root.addEventListener("focusin", focus);
        window.addEventListener("hashchange", hash);
        hash();
        return () => {
            cancelAnimationFrame(focusFrame);
            root.removeEventListener("focusin", focus);
            window.removeEventListener("hashchange", hash);
            root.classList.remove("is-horizontal");
            if (counter) counter.textContent = `01 / ${String(cards.length).padStart(2, "0")}`;
            if (progress) progress.style.removeProperty("transform");
        };
    });
}

function showcase(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        if (!desktop) { reveal(root); return; }
        const cards = root.querySelectorAll<HTMLElement>("[data-showcase-card]");
        const indicator = root.querySelector<HTMLElement>("[data-counter]");
        root.classList.add("is-pinned");
        gsap.set(cards, { autoAlpha: 0, x: 30 });
        gsap.set(cards[0], { autoAlpha: 1, x: 0 });
        const timeline = gsap.timeline({ scrollTrigger: {
            trigger: root, start: "top top", end: () => `+=${window.innerHeight * 2.5}`, pin: true, scrub: 0.7, invalidateOnRefresh: true,
            onUpdate: (trigger) => {
                if (indicator) indicator.textContent = `${String(Math.min(cards.length, Math.floor(trigger.progress * (cards.length - 1)) + 1)).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
            },
        } });
        cards.forEach((card, index) => {
            if (!index) return;
            timeline.to(cards[index - 1], { autoAlpha: 0, x: -30, duration: 0.35 }, index - 1)
                .to(card, { autoAlpha: 1, x: 0, duration: 0.5 }, index - 1 + 0.15);
        });
        return () => {
            root.classList.remove("is-pinned");
            if (indicator) indicator.textContent = `01 / ${String(cards.length).padStart(2, "0")}`;
        };
    });
}

function stacking(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        if (!desktop) { reveal(root); return; }
        const cards = root.querySelectorAll<HTMLElement>("[data-stack-card]");
        root.classList.add("is-stacking");
        gsap.set(cards, { zIndex: (index) => index + 1 });
        gsap.set(Array.from(cards).slice(1), { yPercent: 120 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: () => `+=${window.innerHeight * 2}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
        cards.forEach((card, index) => {
            if (!index) return;
            timeline.to(cards[index - 1], { scale: 0.94, y: -18 * (cards.length - index), duration: 1 }, index - 1)
                .to(card, { yPercent: 0, duration: 1 }, index - 1);
        });
        return () => root.classList.remove("is-stacking");
    });
}

class Animation {
    static layout = {
        common: (): Cleanup => {
            const media = gsap.matchMedia();
            media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
                const lenis = new Lenis({ lerp: 0.12, allowNestedScroll: true });
                const update = () => ScrollTrigger.update();
                lenis.on("scroll", update);
                const tick = (time: number) => lenis.raf(time * 1000);
                gsap.ticker.add(tick);
                return () => { gsap.ticker.remove(tick); lenis.off("scroll", update); lenis.destroy(); };
            });
            return () => media.revert();
        },
        header: (root: HTMLElement): Cleanup => section(root, () => {
            gsap.from(root, { y: -20, autoAlpha: 0, duration: 0.6 });
        }),
        main: (root: HTMLElement): Cleanup => {
            // Refresh route measurements without overriding Next.js back/forward restoration.
            const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
            root.dataset.animationReady = "true";
            return () => { cancelAnimationFrame(frame); delete root.dataset.animationReady; };
        },
        footer: entrance,
        progress: (root: HTMLElement): Cleanup => {
            const context = gsap.context(() => {
                gsap.fromTo(root, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true, invalidateOnRefresh: true } });
            }, root);
            return () => context.revert();
        },
    };

    static landing = { section: { heroIntro: intro, brandIntro: entrance, supportOverview: entrance, studioPreview: imageReveal, creatorStories: entrance, finalCta: imageReveal } };
    static about = { section: { hero: intro, brandPhilosophy: entrance, brandMessage: message, location: entrance } };
    static services = { section: { hero: intro, overview: serviceOverview, slider: horizontal, closing: imageReveal } };
    static equipment = { section: { hero: intro, showcase, grid: entrance, studioEnvironment: imageReveal } };
    static benefits = { section: { hero: intro, overview: entrance, stickyCards: stacking, closing: imageReveal } };
}

export default Animation;
