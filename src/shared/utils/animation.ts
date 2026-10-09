import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";

const MOTION_EASE = "site-motion";
const SHIMMER_EASE = "site-shimmer";
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create(MOTION_EASE, "0.22,1,0.36,1");
    CustomEase.create(SHIMMER_EASE, "0.65,0,0.35,1");
}

const textFrom = { autoAlpha: 0, y: 36, filter: "blur(20px)" };
const textTo = { autoAlpha: 1, y: 0, filter: "blur(0px)" };

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

// The scroll position controls time; CustomEase controls the visual motion within it.
function scrollTimeline(trigger: HTMLElement, options: ScrollTrigger.Vars = {}) {
    return gsap.timeline({
        defaults: { ease: MOTION_EASE, duration: 1 },
        scrollTrigger: { trigger, start: "clamp(top 92%)", end: "clamp(top 65%)", scrub: true, invalidateOnRefresh: true, ...options },
    });
}

function reveal(root: HTMLElement) {
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        scrollTimeline(element).fromTo(element, textFrom, textTo);
    });
}

function intro(root: HTMLElement): Cleanup {
    return section(root, () => {
        const timeline = scrollTimeline(root, { start: "top top", end: () => `+=${window.innerHeight * 0.55}`, pin: true });
        timeline.fromTo(root.querySelectorAll("[data-line]"), textFrom, textTo, 0)
            .fromTo(root.querySelectorAll("[data-reveal]"), textFrom, textTo, 0);
        const image = root.querySelector<HTMLElement>("[data-image]");
        if (image) timeline.to(image, { scale: 1.12 }, 0);
    });
}

function homeIntro(root: HTMLElement): Cleanup {
    return section(root, () => {
        const timeline = gsap.timeline({ paused: true, defaults: { ease: MOTION_EASE, duration: 1.1 } })
            .fromTo(root.querySelectorAll("[data-line]"), textFrom, { ...textTo, stagger: 0.12 }, 0)
            .fromTo(root.querySelectorAll("[data-reveal]"), textFrom, textTo, 0.12);
        const transition = root.closest<HTMLElement>("[data-page-pending]");
        const play = () => { timeline.play(); };
        if (transition?.dataset.pagePending === "true") transition.addEventListener("page:reveal", play, { once: true });
        else play();
        const image = root.querySelector<HTMLElement>("[data-image]");
        if (image) scrollTimeline(root, { start: "top top", end: "bottom top" }).to(image, { scale: 1.12 });
        return () => transition?.removeEventListener("page:reveal", play);
    });
}

function entrance(root: HTMLElement): Cleanup {
    return section(root, () => { reveal(root); });
}

/** Images scale 0→1 as they reach viewport center, then stay at 1. */
function beliefMoments(root: HTMLElement): Cleanup {
    return section(root, () => {
        reveal(root);
        root.querySelectorAll<HTMLElement>("[data-float-image]").forEach((frame) => {
            gsap.set(frame, { scale: 0, transformOrigin: "50% 50%" });
            gsap.fromTo(frame, { scale: 0 }, {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: frame,
                    start: "center bottom",
                    end: "center center",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });
        });
    });
}

function imageReveal(root: HTMLElement): Cleanup {
    return section(root, () => {
        reveal(root);
        const image = root.querySelector<HTMLElement>("[data-image]");
        if (image) scrollTimeline(image, { start: "clamp(top 85%)", end: "clamp(center center)" })
            .fromTo(image, { clipPath: "inset(12% 8% 12% 8%)", scale: 0.95 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 });
    });
}

/** Soft wobbly circular mask expands into the closing CTA before it fully enters view. */
function finalCta(root: HTMLElement): Cleanup {
    return section(root, () => {
        gsap.set(root, { "--cta-wave": "0%", "--cta-wave-x": "50%", "--cta-wave-y": "-6%" });
        const wave = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: root,
                // Start while CTA is still below the fold so the black wave arrives first.
                start: "top bottom+=160",
                end: "top 38%",
                scrub: true,
                invalidateOnRefresh: true,
            },
        });
        wave.fromTo(root, { "--cta-wave": "0%" }, { "--cta-wave": "140%", duration: 1 }, 0)
            // Slight organic drift so the expanding rim feels wobbly rather than a perfect circle.
            .fromTo(root, { "--cta-wave-x": "46%" }, { "--cta-wave-x": "54%", duration: 1 }, 0)
            .fromTo(root, { "--cta-wave-y": "-10%" }, { "--cta-wave-y": "4%", duration: 1 }, 0);

        reveal(root);
    });
}

function message(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        if (!desktop) { reveal(root); return; }
        const words = root.querySelectorAll("[data-word]");
        scrollTimeline(root, { start: "top top", end: "+=130%", pin: true })
            .fromTo(words, textFrom, { ...textTo, stagger: 0.6, duration: 0.7 });
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
            const x = gsap.quickTo(preview, "x", { duration: 0.35, ease: MOTION_EASE });
            const y = gsap.quickTo(preview, "y", { duration: 0.35, ease: MOTION_EASE });
            const visibility = gsap.fromTo(preview, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.25, ease: MOTION_EASE, paused: true });
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
        const timeline = scrollTimeline(root, {
            start: "top top", end: () => `+=${Math.max(distance(), window.innerHeight)}`, pin: true,
            onUpdate: (trigger) => {
                if (counter) counter.textContent = `${String(Math.round(trigger.progress * (cards.length - 1)) + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
            },
        // containerAnimation requires linear track movement for correct card measurements.
        }).to(track, { x: () => -distance(), ease: "none" });
        if (progress) timeline.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
        cards.forEach((card) => {
            const image = card.querySelector<HTMLElement>("[data-slide-image]");
            if (image) scrollTimeline(card, { containerAnimation: timeline, start: "left right", end: "right left" })
                .fromTo(image, { scale: 1 }, { scale: 1.06 });
        });
        let focusFrame = 0;
        const select = (index: number) => {
            if (index < 0) return;
            cancelAnimationFrame(focusFrame);
            // Native anchor/focus scrolling finishes before we select the horizontal card.
            focusFrame = requestAnimationFrame(() => {
                const trigger = timeline.scrollTrigger;
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
        gsap.set(cards, textFrom);
        gsap.set(cards[0], textTo);
        const timeline = scrollTimeline(root, {
            start: "top top", end: () => `+=${window.innerHeight * 2.5}`, pin: true,
            onUpdate: (trigger) => {
                if (indicator) indicator.textContent = `${String(Math.min(cards.length, Math.floor(trigger.progress * (cards.length - 1)) + 1)).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
            },
        });
        cards.forEach((card, index) => {
            if (!index) return;
            timeline.to(cards[index - 1], { autoAlpha: 0, y: -36, filter: "blur(20px)", duration: 0.35 }, index - 1)
                .to(card, { ...textTo, duration: 0.5 }, index - 1 + 0.15);
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
        const timeline = scrollTimeline(root, { start: "top top", end: () => `+=${window.innerHeight * 2}`, pin: true });
        cards.forEach((card, index) => {
            if (!index) return;
            timeline.to(cards[index - 1], { scale: 0.94, y: -18 * (cards.length - index), duration: 1 }, index - 1)
                .to(card, { yPercent: 0, duration: 1 }, index - 1)
                .fromTo(card.firstElementChild, textFrom, textTo, index - 1);
        });
        return () => root.classList.remove("is-stacking");
    });
}

function pageLoading(root: HTMLElement, onComplete: () => void): Cleanup {
    const content = root.querySelector<HTMLElement>("[data-page-content]")!;
    const overlay = root.querySelector<HTMLElement>("[data-page-loader]")!;
    const text = root.querySelector<HTMLElement>("[data-loading-text]")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    let active = true;
    let shimmerDone = reduced;
    let revealing = false;
    let transition: gsap.core.Timeline;
    const restoreScroll = () => { document.documentElement.style.overflow = previousOverflow; };
    const revealPage = () => {
        const panel = content.querySelector<HTMLElement>(".route-panel");
        const image = content.querySelector<HTMLImageElement>(".hero-image img");
        if (!active || revealing || !shimmerDone || document.fonts.status === "loading" || content.querySelector(".page-loading") || (panel && panel.dataset.animationReady !== "true") || (image && !image.complete)) return;
        revealing = true;
        observer.disconnect();
        restoreScroll();
        if (reduced) {
            gsap.set(content, { autoAlpha: 1 });
            gsap.set(overlay, { autoAlpha: 0 });
            onComplete();
            ScrollTrigger.refresh();
        } else transition.play();
    };
    const observer = new MutationObserver(revealPage);
    const context = gsap.context(() => {
        transition = gsap.timeline({ paused: true, defaults: { ease: MOTION_EASE, duration: 0.45 }, onComplete })
            .call(() => { root.dispatchEvent(new Event("page:reveal")); ScrollTrigger.refresh(); })
            .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1 }, 0)
            .to(overlay, { autoAlpha: 0 }, 0);
        if (reduced) gsap.set(text, { backgroundPosition: "0% 0%" });
        else gsap.fromTo(text, { backgroundPosition: "100% 0%" }, {
            backgroundPosition: "0% 0%", duration: 1.6, ease: SHIMMER_EASE,
            onComplete: () => { shimmerDone = true; revealPage(); },
        });
    }, root);
    observer.observe(content, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-animation-ready"] });
    content.addEventListener("load", revealPage, true);
    content.addEventListener("error", revealPage, true);
    // Route content can start another font load after the initial ready promise resolves.
    document.fonts.addEventListener("loadingdone", revealPage);
    document.fonts.addEventListener("loadingerror", revealPage);
    document.fonts.ready.then(() => { if (active) revealPage(); });
    revealPage();
    return () => {
        active = false;
        observer.disconnect();
        content.removeEventListener("load", revealPage, true);
        content.removeEventListener("error", revealPage, true);
        document.fonts.removeEventListener("loadingdone", revealPage);
        document.fonts.removeEventListener("loadingerror", revealPage);
        restoreScroll();
        context.revert();
    };
}

class Animation {
    static layout = {
        loading: pageLoading,
        common: (): Cleanup => {
            const media = gsap.matchMedia();
            media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
                const lenis = new Lenis({ lerp: 0, duration: 1.1, easing: gsap.parseEase(MOTION_EASE), allowNestedScroll: true });
                const update = () => ScrollTrigger.update();
                lenis.on("scroll", update);
                const tick = (time: number) => lenis.raf(time * 1000);
                gsap.ticker.add(tick);
                return () => { gsap.ticker.remove(tick); lenis.off("scroll", update); lenis.destroy(); };
            });
            return () => media.revert();
        },
        header: (root: HTMLElement): Cleanup => section(root, () => {
            // Keep navigation and the logo usable at scroll progress zero.
            scrollTimeline(root, { start: 0, end: () => `+=${root.offsetHeight}` }).to(root, { y: -20 });
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
                scrollTimeline(root, { start: 0, end: "max" }).fromTo(root, { scaleX: 0 }, { scaleX: 1, ease: "none" });
            }, root);
            return () => context.revert();
        },
    };

    static landing = { section: { heroIntro: homeIntro, brandIntro: entrance, beliefMoments, supportOverview: entrance, studioPreview: imageReveal, creatorStories: entrance, finalCta } };
    static about = { section: { hero: intro, brandPhilosophy: entrance, brandMessage: message, location: entrance } };
    static services = { section: { hero: intro, overview: serviceOverview, slider: horizontal, closing: imageReveal } };
    static equipment = { section: { hero: intro, showcase, grid: entrance, studioEnvironment: imageReveal } };
    static benefits = { section: { hero: intro, overview: entrance, stickyCards: stacking, closing: imageReveal } };
}

export default Animation;
