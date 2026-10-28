import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";
import { getBreakpointQuery } from "@/shared/lib/breakpoints";
import { draggableLoop } from "./draggableLoop";

const MOTION_EASE = "site-motion";
const SHIMMER_EASE = "site-shimmer";
const SCROLL_SCRUB = 1.25;
let smoothScroller: Lenis | undefined;
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create(MOTION_EASE, "0.22,1,0.36,1");
    CustomEase.create(SHIMMER_EASE, "0.65,0,0.35,1");
    // The mobile address bar resize should not rebuild every scroll animation.
    ScrollTrigger.config?.({ ignoreMobileResize: true });
}

const textFrom = { autoAlpha: 0, y: 72 };
const textTo = { autoAlpha: 1, y: 0 };

type Cleanup = () => void;
type Conditions = { desktop: boolean; reduced: boolean };
type SectionAnimation = (root: HTMLElement, conditions: Conditions) => void | Cleanup;

const pendingRefreshes = new Set<() => void>();
let refreshFrame: number | undefined;
let refreshIdleTimer: number | undefined;
let scrollIdleBound = false;
const REFRESH_IDLE_MS = 160;

function flushScheduledRefresh() {
    refreshFrame = undefined;
    refreshIdleTimer = undefined;
    pendingRefreshes.clear();
    ScrollTrigger.refresh();
}

/** immediate: mount/fonts. idle: lazy image loads — wait until scrolling settles to avoid first-play jitter. */
function scheduleRefresh(owner: () => void, mode: "immediate" | "idle" = "idle") {
    pendingRefreshes.add(owner);
    if (mode === "immediate") {
        if (refreshIdleTimer !== undefined) {
            window.clearTimeout(refreshIdleTimer);
            refreshIdleTimer = undefined;
        }
        if (refreshFrame !== undefined) return;
        refreshFrame = requestAnimationFrame(flushScheduledRefresh);
        return;
    }
    if (refreshFrame !== undefined) return;
    if (refreshIdleTimer !== undefined) window.clearTimeout(refreshIdleTimer);
    refreshIdleTimer = window.setTimeout(() => {
        refreshIdleTimer = undefined;
        if (refreshFrame !== undefined) return;
        refreshFrame = requestAnimationFrame(flushScheduledRefresh);
    }, REFRESH_IDLE_MS);
    if (!scrollIdleBound) {
        scrollIdleBound = true;
        window.addEventListener(
            "scroll",
            () => {
                if (refreshIdleTimer === undefined) return;
                window.clearTimeout(refreshIdleTimer);
                refreshIdleTimer = window.setTimeout(() => {
                    refreshIdleTimer = undefined;
                    if (refreshFrame !== undefined) return;
                    refreshFrame = requestAnimationFrame(flushScheduledRefresh);
                }, REFRESH_IDLE_MS);
            },
            { passive: true },
        );
    }
}

function setSectionState(root: Element, state: string, enabled: boolean) {
    const targets = [root, ...root.querySelectorAll(`[data-${state}-target]`)];
    targets.forEach((target) => {
        if (enabled) target.setAttribute(`data-${state}`, "true");
        else target.removeAttribute(`data-${state}`);
    });
}

// Every section owns its selectors, timelines, media queries and cleanup.
function section(root: HTMLElement, animate: SectionAnimation): Cleanup {
    const media = gsap.matchMedia(root);
    let active = true;
    const refreshNow = () => scheduleRefresh(refreshNow, "immediate");
    const refreshIdle = () => scheduleRefresh(refreshIdle, "idle");
    media.add({ all: "all", desktop: getBreakpointQuery("tablet"), reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
        const conditions = context.conditions as Conditions;
        // Static markup remains readable when animation is disabled.
        if (conditions.reduced) return;
        return animate(root, conditions);
    });
    const images = Array.from(root.querySelectorAll("img"));
    images.forEach((image) => image.addEventListener("load", refreshIdle));
    document.fonts.ready.then(() => {
        if (active) refreshNow();
    });
    refreshNow();
    return () => {
        active = false;
        pendingRefreshes.delete(refreshNow);
        pendingRefreshes.delete(refreshIdle);
        if (!pendingRefreshes.size) {
            if (refreshFrame !== undefined) {
                cancelAnimationFrame(refreshFrame);
                refreshFrame = undefined;
            }
            if (refreshIdleTimer !== undefined) {
                window.clearTimeout(refreshIdleTimer);
                refreshIdleTimer = undefined;
            }
        }
        images.forEach((image) => image.removeEventListener("load", refreshIdle));
        media.revert();
    };
}

// Scroll sets the target; numeric scrub eases the playhead toward it without losing reversibility.
function scrollTimeline(trigger: HTMLElement, options: ScrollTrigger.Vars = {}) {
    let renderedProgress: number | undefined;
    return gsap.timeline({
        defaults: { ease: MOTION_EASE, duration: 1 },
        scrollTrigger: {
            trigger,
            start: "clamp(top 92%)",
            end: "clamp(top 65%)",
            scrub: SCROLL_SCRUB,
            invalidateOnRefresh: true,
            ...options,
            onRefreshInit: (self) => {
                // Lazy image/font loads must not snap a moving playhead to the scroll target.
                // Boolean scrub has no catch-up tween, so only numeric scrub can be mid-flight.
                const tween = self.getTween();
                renderedProgress = typeof tween?.isActive === "function" && tween.isActive() ? self.animation?.progress() : undefined;
                options.onRefreshInit?.(self);
            },
            onRefresh: (self) => {
                if (renderedProgress !== undefined) {
                    self.animation?.progress(renderedProgress);
                    self.getTween()?.resetTo("totalProgress", self.progress, renderedProgress);
                    renderedProgress = undefined;
                }
                options.onRefresh?.(self);
            },
        },
    });
}

type TitlePiece = { kind: "char"; element: HTMLElement } | { kind: "chip"; element: HTMLElement };

function titlePieces(title: HTMLElement) {
    const pieces: TitlePiece[] = [];
    const split = Boolean(title.querySelector("[data-title-char]"));
    const appendWord = (word: string, parent: ParentNode) => {
        const holder = document.createElement("span");
        holder.style.display = "inline-block";
        holder.style.whiteSpace = "nowrap";
        for (const char of Array.from(word)) {
            const mask = document.createElement("span");
            mask.style.display = "inline-block";
            mask.style.overflow = "hidden";
            mask.style.height = "1em";
            mask.style.lineHeight = "1";
            mask.style.verticalAlign = "baseline";
            const glyph = document.createElement("span");
            glyph.dataset.titleChar = "";
            glyph.style.display = "inline-block";
            glyph.style.lineHeight = "1";
            glyph.textContent = char;
            mask.append(glyph);
            holder.append(mask);
            pieces.push({ kind: "char", element: glyph });
        }
        parent.append(holder);
    };
    const walk = (node: ChildNode) => {
        if (node instanceof HTMLElement && node.matches("[data-solution-chip]")) {
            pieces.push({ kind: "chip", element: node });
            return;
        }
        if (node instanceof HTMLElement && node.dataset.titleChar !== undefined) {
            pieces.push({ kind: "char", element: node });
            return;
        }
        if (node.nodeType === Node.TEXT_NODE) {
            if (split) return;
            const text = node.textContent ?? "";
            const fragment = document.createDocumentFragment();
            text.split(/(\s+)/).forEach((part) => {
                if (!part) return;
                if (/^\s+$/.test(part)) fragment.append(document.createTextNode(part));
                else appendWord(part, fragment);
            });
            node.parentNode?.replaceChild(fragment, node);
            return;
        }
        if (!(node instanceof HTMLElement) || node.tagName === "BR") return;
        Array.from(node.childNodes).forEach(walk);
    };
    Array.from(title.childNodes).forEach(walk);
    return pieces;
}

function titleRise(root: HTMLElement) {
    root.querySelectorAll<HTMLElement>("[data-title-rise]").forEach((title) => {
        const pieces = titlePieces(title);
        const chars = pieces.flatMap((piece) => (piece.kind === "char" ? [piece.element] : []));
        if (!pieces.length) return;
        const home = Boolean(title.closest("main#home"));
        const timeline = scrollTimeline(title, home ? { end: "clamp(top 12%)", scrub: 1.4 } : {});
        if (!pieces.some((piece) => piece.kind === "chip")) {
            // Later staggers stay unrendered until their start, so park every glyph below the mask first.
            gsap.set(chars, { yPercent: 100, willChange: "transform", force3D: true });
            timeline.to(chars, { yPercent: 0, duration: 0.7, stagger: 0.1, ease: MOTION_EASE });
            return;
        }

        let time = 0;
        let charRun: HTMLElement[] = [];
        let chipRun: HTMLElement[] = [];
        const flushChars = () => {
            if (!charRun.length) return;
            gsap.set(charRun, { yPercent: 100 });
            charRun.forEach((char, index) => {
                timeline.to(char, { yPercent: 0, duration: 0.7, ease: MOTION_EASE }, time + index * 0.1);
            });
            if (charRun.length) time += (charRun.length - 1) * 0.1 + 0.7;
            charRun = [];
        };
        const flushChips = () => {
            if (!chipRun.length) return;
            chipRun.forEach((chip, index) => {
                const rotation = chip.className.includes("-rotate-") ? -6 : 0;
                const at = time + index * 0.12;
                gsap.set(chip, { scale: 0, y: -28, rotation, transformOrigin: "50% 50%" });
                timeline.to(chip, { scale: 1, y: 18, rotation, duration: 0.45, ease: "power2.out" }, at);
                timeline.to(chip, { y: 0, rotation, duration: 0.35, ease: MOTION_EASE }, at + 0.45);
            });
            if (chipRun.length) time += (chipRun.length - 1) * 0.12 + 0.8;
            chipRun = [];
        };
        pieces.forEach((piece) => {
            if (piece.kind === "char") {
                flushChips();
                charRun.push(piece.element);
                return;
            }
            flushChars();
            chipRun.push(piece.element);
        });
        flushChars();
        flushChips();
    });
}

function revealElement(element: HTMLElement) {
    // Promote a compositor layer before the first scrub catch-up on phones.
    gsap.set(element, { willChange: "transform, opacity", force3D: true });
    if (element.closest("main:not(#home)")) {
        gsap.fromTo(element, textFrom, {
            ...textTo,
            duration: 0.65,
            ease: MOTION_EASE,
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
        return;
    }
    const home = Boolean(element.closest("main#home"));
    scrollTimeline(element, home ? { end: "clamp(top 22%)", scrub: 1.4 } : {}).fromTo(element, textFrom, textTo);
}

function reveal(root: HTMLElement) {
    titleRise(root);
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(revealElement);
}

function heroTitleRoll(root: HTMLElement) {
    const title = root.querySelector<HTMLElement>("[data-hero-roll]");
    const copy = root.querySelector<HTMLElement>("[data-hero-copy]");
    const slides = title ? [...title.querySelectorAll<HTMLElement>("[data-hero-slide]")] : [];
    const copies = copy ? [...copy.querySelectorAll<HTMLElement>("[data-hero-copy-slide]")] : [];
    let index = 0;
    let timer: gsap.core.Tween | undefined;
    let timeline: gsap.core.Timeline | undefined;
    let started = false;
    const roll = () => {
        const current = slides[index];
        const next = slides[(index + 1) % slides.length];
        const currentCopy = copies[index];
        const nextCopy = copies[(index + 1) % copies.length];
        if (!current || !next || !currentCopy || !nextCopy) return;
        gsap.set(next, { autoAlpha: 1, y: 0, yPercent: 100 });
        timeline = gsap.timeline({
            onComplete: () => {
                index = (index + 1) % slides.length;
                current.setAttribute("aria-hidden", "true");
                next.removeAttribute("aria-hidden");
                currentCopy.setAttribute("aria-hidden", "true");
                nextCopy.removeAttribute("aria-hidden");
                timer = gsap.delayedCall(3.4, roll);
            },
        });
        timeline.to(currentCopy, { autoAlpha: 0, y: -8, duration: 0.28, ease: MOTION_EASE }, 0);
        timeline.to(current, { y: 0, yPercent: -100, duration: 0.7, ease: MOTION_EASE }, 0);
        timeline.to(next, { y: 0, yPercent: 0, duration: 0.7, ease: MOTION_EASE }, 0);
        timeline.fromTo(nextCopy, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.42, ease: MOTION_EASE }, 0.24);
    };
    return {
        start() {
            if (started || slides.length < 2 || copies.length !== slides.length) return;
            started = true;
            gsap.set(slides[0], { y: 0, yPercent: 0 });
            gsap.set(slides.slice(1), { y: 0, yPercent: 100 });
            gsap.set(copies[0], { autoAlpha: 1, y: 0 });
            gsap.set(copies.slice(1), { autoAlpha: 0, y: 8 });
            timer = gsap.delayedCall(3.4, roll);
        },
        stop() {
            started = false;
            timer?.kill();
            timeline?.kill();
        },
    };
}

function intro(root: HTMLElement): Cleanup {
    return section(root, () => {
        const heroFrom = { ...textFrom, filter: "blur(20px)" };
        const heroTo = { ...textTo, filter: "blur(0px)" };
        const lines = root.querySelectorAll<HTMLElement>("[data-line]");
        const reveals = root.querySelectorAll<HTMLElement>("[data-reveal]");
        const timeline = gsap.timeline({ paused: true, defaults: { ease: MOTION_EASE, duration: 1.1 } });
        if (lines.length) timeline.fromTo(lines, heroFrom, { ...heroTo, stagger: 0.1 }, 0);
        if (reveals.length) timeline.fromTo(reveals, heroFrom, { ...heroTo, stagger: 0.1 }, 0);
        const transition = root.closest<HTMLElement>("[data-page-pending]");
        const roll = heroTitleRoll(root);
        const play = () => {
            timeline.play();
            roll.start();
        };
        if (transition?.dataset.pagePending === "true") transition.addEventListener("page:reveal", play, { once: true });
        else play();
        const image = root.querySelector<HTMLElement>("[data-image]");
        if (image) scrollTimeline(root, { start: "top top", end: "bottom top" }).to(image, { scale: 1.12 });
        const guide = root.querySelector<HTMLElement>("[data-hero-scroll]");
        const guideLine = root.querySelector<HTMLElement>("[data-hero-scroll-line]");
        if (guide) scrollTimeline(root, { start: 0, end: () => `+=${Math.max(80, window.innerHeight * 0.15)}`, scrub: true }).to(guide, { autoAlpha: 0, ease: "none" });
        if (guideLine) gsap.fromTo(guideLine, { yPercent: 100 }, { yPercent: -100, duration: 1.2, repeat: -1, ease: "power1.inOut" });
        return () => {
            roll.stop();
            transition?.removeEventListener("page:reveal", play);
        };
    });
}

function entrance(root: HTMLElement): Cleanup {
    return section(root, () => {
        reveal(root);
    });
}

function studioEnvironment(root: HTMLElement): Cleanup {
    const cleanupReveal = entrance(root);
    const gallery = root.querySelector<HTMLElement>("[data-studio-gallery]");
    const cleanupGallery = gallery ? draggableLoop(gallery) : undefined;
    return () => {
        cleanupGallery?.();
        cleanupReveal();
    };
}

function creatorFaq(root: HTMLElement): Cleanup {
    return section(root, () => {
        reveal(root);
        const refresh = () => ScrollTrigger.refresh();
        root.addEventListener("toggle", refresh, true);
        return () => root.removeEventListener("toggle", refresh, true);
    });
}

function creatorGallery(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        if (!desktop) {
            reveal(root);
            return;
        }
        const stage = root.querySelector<HTMLElement>("[data-gallery-stage]");
        const lead = root.querySelector<HTMLElement>("[data-gallery-lead]");
        const top = root.querySelector<HTMLElement>("[data-gallery-top]");
        const bottom = root.querySelector<HTMLElement>("[data-gallery-bottom]");
        const copy = root.querySelector<HTMLElement>("[data-gallery-copy]");
        const shade = root.querySelector<HTMLElement>("[data-gallery-shade]");
        const sides = root.querySelectorAll<HTMLElement>("[data-gallery-side]");
        if (!stage || !lead || !top || !bottom || !copy || !shade) return;

        const cover = root.previousElementSibling?.matches("[data-gallery-cover-anchor]") ? root.previousElementSibling : null;
        setSectionState(root, "gallery", true);
        if (cover) {
            setSectionState(cover, "gallery-cover", true);
            setSectionState(root, "gallery-reveal", true);
        }
        const width = () => stage.clientWidth;
        const height = () => stage.clientHeight;
        const cardWidth = () => Math.min(width() * 0.29, 560);
        const cardHeight = () => Math.min((cardWidth() * 2) / 3, height() * 0.4);
        const smallWidth = () => Math.min(width() * 0.2, 380);
        const smallHeight = () => (smallWidth() * 2) / 3;
        const gap = () => Math.min(48, Math.max(24, width() * 0.024));
        const bottomY = () => -height() * 0.1 + cardHeight() / 2 + gap() + smallHeight() / 2;
        const measure = () => {
            gsap.set(stage, {
                "--gallery-card-width": `${cardWidth()}px`,
                "--gallery-card-height": `${cardHeight()}px`,
                "--gallery-small-width": `${smallWidth()}px`,
                "--gallery-small-height": `${smallHeight()}px`,
                "--gallery-gap": `${gap()}px`,
            });
        };
        measure();
        gsap.set([lead, top, bottom], { xPercent: -50, yPercent: -50 });
        gsap.set(sides, { autoAlpha: 0 });
        gsap.set(bottom, { autoAlpha: 0 });

        const timeline = scrollTimeline(root, {
            start: "top top",
            end: () => `+=${height() * (cover ? 5 : 4)}`,
            pin: true,
            scrub: 1.4,
            onRefreshInit: measure,
        });
        timeline
            // Reserve one viewport for the cover to scroll away before the gallery shrinks.
            .addLabel("gallery", cover ? 1.275 : 0)
            .fromTo(
                lead,
                { width, height, borderRadius: 0 },
                { width: () => Math.min(1320, width() * 0.82), height: () => Math.min(height() * 0.76, width() * 0.46), borderRadius: 20, duration: 0.8, ease: "none" },
                "gallery+=1",
            )
            .fromTo(copy, { autoAlpha: 0, y: 72 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "none" }, 0)
            .to(copy, { autoAlpha: 0, y: -36, duration: 0.35, ease: "none" }, "gallery+=0.65")
            .to(shade, { autoAlpha: 0, duration: 0.35, ease: "none" }, "gallery+=0.65")
            .to(lead, { width: cardWidth, height: cardHeight, duration: 0.8, ease: "none" }, "gallery+=1.8")
            .to([lead, top], { y: () => -height() * 0.1, duration: 0.6, ease: "none" }, "gallery+=2.8")
            .to(sides, { autoAlpha: 1, stagger: { each: 0.1, from: "center" }, duration: 0.6, ease: "none" }, "gallery+=2.8")
            .fromTo(bottom, { y: () => bottomY() + 72 }, { y: bottomY, autoAlpha: 1, duration: 0.7, ease: "none" }, "gallery+=3.4")
            .to([lead, top], { x: () => -cardWidth() * 0.28, duration: 1.2, ease: "none" }, "gallery+=3.9")
            .to(bottom, { x: () => smallWidth() * 0.55, duration: 1.2, ease: "none" }, "gallery+=3.9");

        return () => {
            setSectionState(root, "gallery", false);
            setSectionState(root, "gallery-reveal", false);
            if (cover) setSectionState(cover, "gallery-cover", false);
        };
    });
}

function creatorSolutions(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        reveal(root);
        const grid = root.querySelector<HTMLElement>("[data-solution-grid]");
        const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-solution-card]"));
        const contents = root.querySelectorAll<HTMLElement>("[data-solution-content]");
        if (!grid || !cards.length) return;

        if (desktop) {
            scrollTimeline(grid, { start: "clamp(top 90%)", end: "clamp(top 20%)", scrub: 1.25 }).fromTo(
                contents,
                { y: (index) => index * 48, autoAlpha: (index) => 1 - index * 0.35 },
                { y: 0, autoAlpha: 1, stagger: 0.16, ease: "none" },
            );
        } else {
            cards.forEach((card) => {
                scrollTimeline(card, { end: "clamp(top 55%)" }).fromTo(card.querySelector("[data-solution-content]"), { y: 40, autoAlpha: 0.35 }, { y: 0, autoAlpha: 1, ease: "none" });
            });
        }
    });
}

function beliefMoments(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        reveal(root);
        const copy = root.querySelector<HTMLElement>("[data-belief-copy]");
        const frames = root.querySelectorAll<HTMLElement>("[data-float-image]");
        if (!copy || !frames.length) return;

        // position:sticky cannot stick while html/body use overflow-x:hidden.
        // Transform pins avoid competing with the fixed header + backdrop-filter layer on iOS.
        ScrollTrigger.create({
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            pin: copy,
            pinSpacing: false,
            pinType: desktop ? "fixed" : "transform",
            anticipatePin: desktop ? 1 : 0,
            invalidateOnRefresh: true,
        });

        // Scaling filtered photos on every scroll tick is what stutters phones.
        if (!desktop) return;

        gsap.set(frames, { willChange: "transform", force3D: true });
        frames.forEach((frame) => {
            scrollTimeline(frame, { start: "top bottom", end: "bottom top" })
                .fromTo(frame, { scale: 0.94 }, { scale: 1, ease: "none", duration: 0.5 })
                .to(frame, { scale: 0.94, ease: "none", duration: 0.5 });
        });
    });
}

function settlementTrust(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        reveal(root);
        const stage = root.querySelector<HTMLElement>("[data-settlement-stage]");
        const gauge = root.querySelector<HTMLElement>("[data-settlement-gauge]");
        const hundreds = root.querySelector<HTMLElement>("[data-settlement-track='hundreds']");
        const tens = root.querySelector<HTMLElement>("[data-settlement-track='tens']");
        const ones = root.querySelector<HTMLElement>("[data-settlement-track='ones']");
        const hundredsColumn = root.querySelector<HTMLElement>("[data-settlement-column='hundreds']");
        const tensColumn = root.querySelector<HTMLElement>("[data-settlement-column='tens']");
        if (!stage || !gauge || !hundreds || !tens || !ones || !hundredsColumn || !tensColumn) return;

        const digit = ones.children[0];
        const unit = () => {
            const box = digit?.getBoundingClientRect();
            return { height: box?.height || 0, width: box?.width || 0 };
        };
        let step = unit();
        const state = { value: 0 };
        [hundreds, tens, ones].forEach((track) => {
            track.style.transform = "none";
        });
        const render = () => {
            const value = state.value;
            const decade = Math.floor(value / 10);
            const onesPart = value - decade * 10;
            const tensIndex = Math.min(10, decade + (onesPart > 9 ? onesPart - 9 : 0));
            const tensIn = gsap.utils.clamp(0, 1, (value - 9.2) / 0.8);
            const hundredsIn = gsap.utils.clamp(0, 1, (value - 99.2) / 0.8);
            gsap.set(ones, { y: -step.height * value });
            gsap.set(tens, { y: -step.height * tensIndex });
            gsap.set(hundreds, { y: -step.height });
            gsap.set(tensColumn, { width: step.width * tensIn });
            gsap.set(hundredsColumn, { width: step.width * hundredsIn });
        };
        const measure = () => {
            step = unit();
            render();
        };
        gsap.set(gauge, { scaleX: 0, transformOrigin: "left center" });
        measure();
        scrollTimeline(root, {
            start: "top top",
            end: "+=100%",
            pin: stage,
            pinType: desktop ? "fixed" : "transform",
            anticipatePin: 1,
            onRefreshInit: measure,
        })
            .to(state, { value: 100, ease: "none", duration: 1, onUpdate: render }, 0)
            .fromTo(gauge, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
    });
}

function imageReveal(root: HTMLElement): Cleanup {
    return section(root, () => {
        reveal(root);
        const image = root.querySelector<HTMLElement>("[data-image]");
        if (image)
            scrollTimeline(image, { start: "clamp(top 85%)", end: "clamp(center center)" }).fromTo(
                image,
                { clipPath: "inset(12% 8% 12% 8%)", scale: 0.95 },
                { clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
            );
    });
}

/** Opaque stop of the wave gradient. The faded rim sits outside this radius. */
const CTA_WAVE_SOLID = 0.86;

/** The resting arc waits in the park. It locks to the screen and spreads once that arc arrives. */
function finalCta(root: HTMLElement): Cleanup {
    return section(root, () => {
        const park = root.querySelector<HTMLElement>("[data-cta-park]");
        const ink = root.querySelector<HTMLElement>("[data-cta-ink]");
        const circle = root.querySelector<HTMLElement>("[data-cta-circle]");
        if (!park || !ink || !circle) return;

        const wave = { centerY: 0, lift: 0, startRadius: 0, endRadius: 1 };
        const measure = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const centerY = height + width * 0.6;
            const lift = height * 0.16;
            const startRadius = Math.max(0, centerY - height);
            const endRadius = Math.hypot(width / 2, centerY);
            wave.centerY = centerY;
            wave.lift = lift;
            wave.startRadius = startRadius;
            wave.endRadius = endRadius;
            gsap.set(circle, {
                width: (endRadius / CTA_WAVE_SOLID) * 2,
                height: (endRadius / CTA_WAVE_SOLID) * 2,
                left: width / 2,
                top: centerY - lift,
                xPercent: -50,
                yPercent: -50,
                transformOrigin: "50% 50%",
                force3D: true,
                background: `radial-gradient(circle, #20261f 0%, #20261f ${CTA_WAVE_SOLID * 100}%, transparent 100%)`,
            });
        };
        const placeInk = (fixed: boolean) => {
            if (fixed) {
                if (ink.parentElement !== root) root.appendChild(ink);
                ink.style.position = "fixed";
                ink.style.inset = "0";
                ink.style.zIndex = "0";
                ink.style.height = "100%";
                ink.style.width = "100%";
                return;
            }
            if (ink.parentElement !== park) park.appendChild(ink);
            ink.style.position = "";
            ink.style.inset = "";
            ink.style.zIndex = "";
            ink.style.height = "";
            ink.style.width = "";
        };
        const syncPlacement = (self: ScrollTrigger) => {
            const seated = self.isActive || self.progress > 0;
            placeInk(seated);
        };
        measure();
        gsap.set(circle, { scale: wave.startRadius / wave.endRadius });

        scrollTimeline(park, {
            start: "bottom bottom",
            end: () => `+=${window.innerHeight}`,
            scrub: 1.6,
            onRefreshInit: measure,
            onToggle: syncPlacement,
            onRefresh: syncPlacement,
        }).fromTo(circle, { scale: () => wave.startRadius / wave.endRadius }, { scale: 1, duration: 1, ease: SHIMMER_EASE }, 0);

        reveal(root);
        return () => {
            placeInk(false);
        };
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

function pageLoading(root: HTMLElement, onComplete: () => void, waveIntro = false): Cleanup {
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
    const restoreScroll = () => {
        document.documentElement.style.overflow = previousOverflow;
    };
    const revealPage = () => {
        const panel = content.querySelector<HTMLElement>(".route-panel");
        const image = content.querySelector<HTMLImageElement>(".hero-image img");
        if (
            !active ||
            revealing ||
            !shimmerDone ||
            document.fonts.status === "loading" ||
            content.querySelector(".page-loading") ||
            (panel && panel.dataset.animationReady !== "true") ||
            (image && !image.complete)
        )
            return;
        revealing = true;
        observer.disconnect();
        if (reduced) {
            restoreScroll();
            gsap.set(content, { autoAlpha: 1, clearProps: "transform" });
            gsap.set(overlay, { autoAlpha: 0 });
            onComplete();
            requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
        } else transition.play();
    };
    const observer = new MutationObserver(revealPage);
    const context = gsap.context(() => {
        const textExitDuration = 0.5;
        const fadeAt = textExitDuration + (waveIntro ? 0.15 : 0);
        const fadeDuration = 0.9;
        const finishReveal = () => {
            // Drop any leftover transform so nested fixed chrome is not offset on iOS.
            gsap.set(content, { clearProps: "transform" });
            restoreScroll();
            // Two frames after overflow unlock so pin/start measurements match the settled viewport.
            requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
        };
        const fadeContent = { autoAlpha: 1, duration: fadeDuration, ease: MOTION_EASE, immediateRender: false, force3D: false };
        transition = gsap.timeline({ paused: true, onComplete });
        transition.set(text, { backgroundImage: "none", color: "var(--color-text)", webkitTextFillColor: "currentColor", transformOrigin: "50% 50%" }, 0);
        // Whole line scales down and fades — cubic-bezier via site MOTION_EASE (0.22, 1, 0.36, 1).
        transition.to(text, { scale: 0.97, autoAlpha: 0, duration: textExitDuration, ease: MOTION_EASE }, 0);
        if (waveIntro) {
            transition
                .call(
                    () => {
                        const wave = content.querySelector<HTMLElement>(".hero [data-gradient-wave]");
                        if (wave) gsap.set(wave, { visibility: "visible" });
                        root.dispatchEvent(new Event("page:wave"));
                        root.dispatchEvent(new Event("page:reveal"));
                    },
                    [],
                    fadeAt,
                )
                .fromTo(content, { autoAlpha: 0 }, fadeContent, fadeAt)
                .to(overlay, { autoAlpha: 0, duration: fadeDuration, ease: MOTION_EASE }, fadeAt)
                .call(finishReveal, [], fadeAt + fadeDuration);
        } else {
            transition
                .call(
                    () => {
                        root.dispatchEvent(new Event("page:reveal"));
                    },
                    [],
                    fadeAt,
                )
                .fromTo(content, { autoAlpha: 0 }, fadeContent, fadeAt)
                .to(overlay, { autoAlpha: 0, duration: fadeDuration, ease: MOTION_EASE }, fadeAt)
                .call(finishReveal, [], fadeAt + fadeDuration);
        }
        if (reduced) gsap.set(text, { backgroundPosition: "0% 0%" });
        else
            gsap.fromTo(
                text,
                { backgroundPosition: "100% 0%" },
                {
                    backgroundPosition: "0% 0%",
                    duration: 1.6,
                    ease: SHIMMER_EASE,
                    onComplete: () => {
                        shimmerDone = true;
                        revealPage();
                    },
                },
            );
    }, root);
    observer.observe(content, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-animation-ready"] });
    content.addEventListener("load", revealPage, true);
    content.addEventListener("error", revealPage, true);
    // Route content can start another font load after the initial ready promise resolves.
    document.fonts.addEventListener("loadingdone", revealPage);
    document.fonts.addEventListener("loadingerror", revealPage);
    document.fonts.ready.then(() => {
        if (active) revealPage();
    });
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

function sectionNavigation(root: HTMLElement): Cleanup {
    const media = gsap.matchMedia(root);
    media.add({ desktop: "(min-width: 64rem)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
        const { desktop, reduced } = context.conditions as Conditions;
        if (!desktop) return;
        const items = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-section-target]")).flatMap((link) => {
            const target = document.getElementById(link.dataset.sectionTarget ?? "")?.closest<HTMLElement>("section");
            const bar = link.querySelector<HTMLElement>("[data-section-bar]");
            return target && bar ? [{ link, target, bar }] : [];
        });
        if (!items.length) return;

        gsap.set(
            items.map(({ bar }) => bar),
            { width: 28 },
        );
        const widths = items.map(({ bar }) => (reduced ? gsap.quickSetter(bar, "width", "px") : gsap.quickTo(bar, "width", { duration: 0.3, ease: MOTION_EASE })));
        const expand = (pointerY: number) => {
            const centers = items.map(({ link }) => {
                const bounds = link.getBoundingClientRect();
                return bounds.top + bounds.height / 2;
            });
            centers.forEach((center, index) => {
                const distance = (pointerY - center) / 100;
                widths[index](28 + 52 * Math.exp(-distance * distance));
            });
        };
        const reset = () => {
            const focused = items.find(({ link }) => link.matches(":focus-visible"));
            if (focused) {
                const bounds = focused.link.getBoundingClientRect();
                expand(bounds.top + bounds.height / 2);
            } else widths.forEach((setWidth) => setWidth(28));
        };
        const move = (event: PointerEvent) => expand(event.clientY);
        const focus = (event: FocusEvent) => {
            if (!(event.target instanceof HTMLElement) || !event.target.matches(":focus-visible")) return;
            const bounds = event.target.getBoundingClientRect();
            expand(bounds.top + bounds.height / 2);
        };

        let positions: number[] = [];
        let currentIndex = -1;
        const updateCurrent = () => {
            const position = window.scrollY + window.innerHeight * 0.3;
            let current = 0;
            positions.forEach((start, index) => {
                if (start <= position) current = index;
            });
            if (current === currentIndex) return;
            currentIndex = current;
            items.forEach(({ link }, index) => {
                if (index === current) link.setAttribute("aria-current", "location");
                else link.removeAttribute("aria-current");
            });
        };
        const measure = () => {
            const triggers = ScrollTrigger.getAll();
            positions = items.map(({ target }) => {
                const pinned = triggers.find((trigger) => trigger.pin === target);
                // The gallery first lets its preceding cover scroll away for one viewport.
                if (pinned) return pinned.start + (target.dataset.galleryReveal === "true" ? target.offsetHeight : 0);
                return target.getBoundingClientRect().top + window.scrollY;
            });
            updateCurrent();
        };
        const navigate = (event: MouseEvent) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const index = items.findIndex(({ link }) => event.target instanceof Node && link.contains(event.target));
            if (index < 0) return;
            event.preventDefault();
            const top = Math.max(0, positions[index]);
            // Keep the scroll target through image/font-triggered ScrollTrigger refreshes.
            if (!reduced && smoothScroller) smoothScroller.scrollTo(top);
            else window.scrollTo({ top, behavior: "instant" });
        };

        ScrollTrigger.create({ start: 0, end: "max", onUpdate: updateCurrent });
        ScrollTrigger.addEventListener("refresh", measure);
        root.addEventListener("pointermove", move, { passive: true });
        root.addEventListener("pointerleave", reset);
        root.addEventListener("focusin", focus);
        root.addEventListener("focusout", reset);
        root.addEventListener("click", navigate);
        measure();

        return () => {
            ScrollTrigger.removeEventListener("refresh", measure);
            root.removeEventListener("pointermove", move);
            root.removeEventListener("pointerleave", reset);
            root.removeEventListener("focusin", focus);
            root.removeEventListener("focusout", reset);
            root.removeEventListener("click", navigate);
            items.forEach(({ link }, index) => {
                if (index === 0) link.setAttribute("aria-current", "location");
                else link.removeAttribute("aria-current");
            });
        };
    });
    return () => media.revert();
}

function siteHeader(root: HTMLElement): Cleanup {
    // No scroll-linked translate: moving the fixed header up exposes a gap at the viewport top.
    const home = document.getElementById("home");
    const hero = home?.querySelector<HTMLElement>('[data-report-id="home-hero"]');
    const cta = home?.querySelector<HTMLElement>("[data-cta-wave]");
    const ink = home?.querySelector<HTMLElement>("[data-cta-ink]");
    const circle = home?.querySelector<HTMLElement>("[data-cta-circle]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let previousLight: boolean | undefined;

    const syncColor = () => {
        const bounds = root.getBoundingClientRect();
        const top = Math.max(0, bounds.top);
        const threshold = bounds.height * 0.05;
        const overlaps = (area: { top: number; bottom: number }) => Math.min(bounds.bottom, area.bottom) - Math.max(top, area.top) > threshold;
        let light = Boolean(hero && overlaps(hero.getBoundingClientRect()));

        if (!light && cta) {
            const area = cta.getBoundingClientRect();
            if (reduced.matches) light = overlaps(area);
            else if (ink?.style.position === "fixed" && circle) {
                const wave = circle.getBoundingClientRect();
                // Ignore the transparent rim when measuring the dark CTA background.
                light = overlaps({ top: Math.max(area.top, wave.top + (wave.height * (1 - CTA_WAVE_SOLID)) / 2), bottom: area.bottom });
            }
        }

        if (light === previousLight) return;
        previousLight = light;
        // Share with section nav / quick-top via the document root.
        // Inverse is always set (never cleared) so quick-top never falls back to white-on-white.
        if (light) {
            root.style.setProperty("--header-ink", "#ffffff");
            root.style.setProperty("--header-ink-inverse", "#303325");
            document.documentElement.style.setProperty("--header-ink", "#ffffff");
            document.documentElement.style.setProperty("--header-ink-inverse", "#303325");
        } else {
            root.style.removeProperty("--header-ink");
            root.style.setProperty("--header-ink-inverse", "#ffffff");
            document.documentElement.style.removeProperty("--header-ink");
            document.documentElement.style.setProperty("--header-ink-inverse", "#ffffff");
        }
    };

    syncColor();
    if (home) gsap.ticker.add(syncColor);
    return () => {
        gsap.ticker.remove(syncColor);
        root.style.removeProperty("--header-ink");
        root.style.removeProperty("--header-ink-inverse");
        document.documentElement.style.removeProperty("--header-ink");
        document.documentElement.style.removeProperty("--header-ink-inverse");
    };
}

class Animation {
    static layout = {
        loading: pageLoading,
        scrollToTop: () => {
            if (smoothScroller) smoothScroller.scrollTo(0, { immediate: true, force: true });
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            ScrollTrigger.update();
        },
        scrollToTopSmooth: () => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                Animation.layout.scrollToTop();
                return;
            }
            if (smoothScroller) smoothScroller.scrollTo(0);
            else window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        },
        common: (): Cleanup => {
            const media = gsap.matchMedia();
            media.add({ smooth: "(prefers-reduced-motion: no-preference)", desktop: getBreakpointQuery("tablet") }, (context) => {
                const { smooth, desktop } = context.conditions as { smooth: boolean; desktop: boolean };
                if (!smooth) return;
                if (desktop) {
                    const lenis = new Lenis({ lerp: 0, duration: 1.1, easing: gsap.parseEase(MOTION_EASE), allowNestedScroll: true });
                    smoothScroller = lenis;
                    const update = () => ScrollTrigger.update();
                    lenis.on("scroll", update);
                    const tick = (time: number) => lenis.raf(time * 1000);
                    gsap.ticker.add(tick);
                    return () => {
                        gsap.ticker.remove(tick);
                        lenis.off("scroll", update);
                        if (smoothScroller === lenis) smoothScroller = undefined;
                        lenis.destroy();
                    };
                }
                // Chrome lives outside the faded content wrapper, so normalizeScroll can sync pins without shifting the header.
                ScrollTrigger.normalizeScroll({ allowNestedScroll: true, lockAxis: true });
                return () => ScrollTrigger.normalizeScroll(false);
            });
            return () => media.revert();
        },
        header: siteHeader,
        main: (root: HTMLElement): Cleanup => {
            // Refresh route measurements without overriding Next.js back/forward restoration.
            const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
            root.dataset.animationReady = "true";
            return () => {
                cancelAnimationFrame(frame);
                delete root.dataset.animationReady;
            };
        },
        footer: entrance,
        progress: (root: HTMLElement): Cleanup => {
            const context = gsap.context(() => {
                scrollTimeline(root, { start: 0, end: "max", scrub: true }).fromTo(root, { scaleX: 0 }, { scaleX: 1, ease: "none" });
            }, root);
            return () => context.revert();
        },
    };

    static landing = {
        navigation: sectionNavigation,
        section: {
            heroIntro: intro,
            creatorGallery,
            creatorSolutions,
            beliefMoments,
            settlementTrust,
            supportOverview: entrance,
            creatorJourney: entrance,
            creatorFaq,
            finalCta,
        },
    };
    static about = { section: { hero: intro, brandPhilosophy: entrance, location: entrance } };
    static services = { section: { hero: intro, overview: serviceOverview } };
    static equipment = { section: { hero: intro, grid: entrance, studioEnvironment } };
    static benefits = { section: { hero: intro, overview: entrance } };
}

export default Animation;
