import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";
import { getBreakpointQuery } from "@/shared/lib/breakpoints";

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

const pendingRefreshes = new Set<Cleanup>();
let refreshFrame: number | undefined;

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
    const refresh = () => {
        pendingRefreshes.add(refresh);
        if (refreshFrame !== undefined) return;
        refreshFrame = requestAnimationFrame(() => {
            refreshFrame = undefined;
            pendingRefreshes.clear();
            ScrollTrigger.refresh();
        });
    };
    media.add({ all: "all", desktop: getBreakpointQuery("tablet"), reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
        const conditions = context.conditions as Conditions;
        // Static markup remains readable when animation is disabled.
        if (conditions.reduced) return;
        return animate(root, conditions);
    });
    const images = Array.from(root.querySelectorAll("img"));
    images.forEach((image) => image.addEventListener("load", refresh));
    document.fonts.ready.then(() => {
        if (active) refresh();
    });
    refresh();
    return () => {
        active = false;
        pendingRefreshes.delete(refresh);
        if (!pendingRefreshes.size && refreshFrame !== undefined) {
            cancelAnimationFrame(refreshFrame);
            refreshFrame = undefined;
        }
        images.forEach((image) => image.removeEventListener("load", refresh));
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
            gsap.set(chars, { yPercent: 100 });
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
    let index = 0;
    let timer: gsap.core.Tween | undefined;
    let timeline: gsap.core.Timeline | undefined;
    let started = false;
    const writeCopy = (slide: HTMLElement) => {
        if (!copy) return;
        const lines = (slide.dataset.heroBody ?? "").split("\n");
        copy.replaceChildren(
            ...lines.flatMap((line, lineIndex) => {
                const nodes: Node[] = [];
                if (lineIndex) nodes.push(document.createElement("br"));
                nodes.push(document.createTextNode(line));
                return nodes;
            }),
        );
    };
    const roll = () => {
        const current = slides[index];
        const next = slides[(index + 1) % slides.length];
        if (!current || !next || !copy) return;
        gsap.set(next, { y: 0, yPercent: 100 });
        timeline = gsap.timeline({
            onComplete: () => {
                index = (index + 1) % slides.length;
                current.setAttribute("aria-hidden", "true");
                next.removeAttribute("aria-hidden");
                timer = gsap.delayedCall(3.4, roll);
            },
        });
        timeline.to(copy, { autoAlpha: 0, duration: 0.28, ease: MOTION_EASE }, 0);
        timeline.to(current, { y: 0, yPercent: -100, duration: 0.7, ease: MOTION_EASE }, 0);
        timeline.to(next, { y: 0, yPercent: 0, duration: 0.7, ease: MOTION_EASE }, 0);
        timeline.call(() => writeCopy(next));
        timeline.to(copy, { autoAlpha: 1, duration: 0.4, ease: MOTION_EASE });
    };
    return {
        start() {
            if (started || slides.length < 2 || !copy) return;
            started = true;
            gsap.set(slides[0], { y: 0, yPercent: 0 });
            gsap.set(slides.slice(1), { y: 0, yPercent: 100 });
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
        const timeline = gsap.timeline({ paused: true, defaults: { ease: root.closest("main#home") ? "none" : MOTION_EASE, duration: 1.1 } });
        if (lines.length) timeline.fromTo(lines, heroFrom, { ...heroTo, stagger: 0.12 }, 0);
        if (reveals.length) timeline.fromTo(reveals, heroFrom, heroTo, 0.12);
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

        cards.forEach((card) => {
            const meters = card.querySelectorAll("[data-solution-meter]");
            const passes = card.querySelectorAll("[data-solution-pass]");
            const rows = card.querySelectorAll("[data-solution-row]");
            const checks = card.querySelectorAll("[data-solution-check]");
            const timeline = scrollTimeline(card, { start: "clamp(top 85%)", end: "clamp(top 15%)" });
            if (meters.length) timeline.fromTo(meters, { scaleX: 0.18 }, { scaleX: 1, stagger: 0.12, ease: "none" });
            if (passes.length) timeline.fromTo(passes, { y: 48, rotation: -10, scale: 0.9 }, { y: 0, rotation: (index) => (index === 0 ? 3 : -3), scale: 1, stagger: 0.15, ease: "none" });
            if (rows.length) {
                timeline
                    .fromTo(rows, { y: 16, autoAlpha: 0.2 }, { y: 0, autoAlpha: 1, stagger: 0.12, ease: "none" })
                    .fromTo(checks, { scale: 0 }, { scale: 1, transformOrigin: "center", stagger: 0.12, ease: "none" }, 0.25);
            }
        });
    });
}

function beliefMoments(root: HTMLElement): Cleanup {
    return section(root, (_, { desktop }) => {
        reveal(root);
        const copy = root.querySelector<HTMLElement>("[data-belief-copy]");
        const frames = root.querySelectorAll<HTMLElement>("[data-float-image]");
        if (!copy || !frames.length) return;

        // position:sticky cannot stick while html/body use overflow-x:hidden.
        ScrollTrigger.create({
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            pin: copy,
            pinSpacing: false,
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

/** The slow ink and the normally scrolling CTA have independent playheads. */
function finalCta(root: HTMLElement): Cleanup {
    return section(root, () => {
        const ink = root.querySelector<HTMLElement>("[data-cta-ink]");
        const svg = root.querySelector<SVGSVGElement>("[data-cta-svg]");
        const circle = root.querySelector<SVGCircleElement>("[data-cta-circle]");
        const filter = root.querySelector<SVGFilterElement>("[data-cta-filter]");
        const noise = root.querySelector<SVGFETurbulenceElement>("[data-cta-noise]");
        const displacement = root.querySelector<SVGFEDisplacementMapElement>("[data-cta-displacement]");
        const blur = root.querySelector<SVGFEGaussianBlurElement>("[data-cta-blur]");
        const content = root.querySelector<HTMLElement>("[data-cta-content]");
        if (!ink || !svg || !circle || !filter || !noise || !displacement || !blur || !content) return;

        let startRadius = 0;
        let endRadius = 0;
        const measure = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const size = Math.min(width, height);
            const grid = (value: number) => Math.max(4, Math.round(value / 4) * 4);
            // Keep the soft rim without scaling blur cost indefinitely on large screens.
            const drift = grid(size * 0.22);
            const softness = grid(Math.min(height * 0.08, 80));
            // Displacement reaches half its scale; three blur deviations pad the visible rim.
            const margin = grid(drift * 0.5 + softness * 3);
            const centerY = height + width * 0.6;
            startRadius = Math.max(0, centerY - height - margin);
            endRadius = Math.hypot(width / 2, centerY) + margin;
            svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
            circle.setAttribute("cx", String(width / 2));
            circle.setAttribute("cy", String(centerY));
            // Bound filter buffers to the viewport instead of the growing circle's huge box.
            filter.setAttribute("x", String(-margin));
            filter.setAttribute("y", String(-margin));
            filter.setAttribute("width", String(width + margin * 2));
            filter.setAttribute("height", String(height + margin * 2));
            // Keep noise frequency fixed while the circle expands.
            noise.setAttribute("baseFrequency", String(0.9 / size));
            displacement.setAttribute("scale", String(drift));
            blur.setAttribute("stdDeviation", String(softness));
        };
        measure();

        gsap.set(ink, { autoAlpha: 1 });

        scrollTimeline(root, {
            start: "top bottom",
            end: "top top",
            scrub: 1.6,
            onRefreshInit: measure,
        }).fromTo(circle, { attr: { r: () => startRadius } }, { attr: { r: () => endRadius }, duration: 1, ease: SHIMMER_EASE }, 0);

        reveal(root);
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
            gsap.set(content, { autoAlpha: 1 });
            gsap.set(overlay, { autoAlpha: 0 });
            onComplete();
            ScrollTrigger.refresh();
        } else transition.play();
    };
    const observer = new MutationObserver(revealPage);
    const context = gsap.context(() => {
        const fadeAt = 0.15;
        const fadeDuration = 0.9;
        const finishReveal = () => {
            restoreScroll();
            ScrollTrigger.refresh();
        };
        transition = gsap.timeline({ paused: true, onComplete });
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
                .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, duration: fadeDuration, ease: MOTION_EASE, immediateRender: false }, fadeAt)
                .to(overlay, { autoAlpha: 0, duration: fadeDuration, ease: MOTION_EASE }, fadeAt)
                .call(finishReveal, [], fadeAt + fadeDuration);
        } else {
            transition
                .call(() => {
                    root.dispatchEvent(new Event("page:reveal"));
                })
                .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, duration: fadeDuration, ease: MOTION_EASE, immediateRender: false }, 0)
                .to(overlay, { autoAlpha: 0, duration: fadeDuration, ease: MOTION_EASE }, 0)
                .call(finishReveal);
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

class Animation {
    static layout = {
        loading: pageLoading,
        scrollToTop: () => {
            if (smoothScroller) smoothScroller.scrollTo(0, { immediate: true, force: true });
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            ScrollTrigger.update();
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
                // Mobile browsers scroll off the main thread, so a pinned layer otherwise lags a frame behind.
                ScrollTrigger.normalizeScroll({ allowNestedScroll: true, lockAxis: true });
                return () => ScrollTrigger.normalizeScroll(false);
            });
            return () => media.revert();
        },
        header: (root: HTMLElement): Cleanup =>
            section(root, () => {
                // Keep navigation and the logo usable at scroll progress zero.
                scrollTimeline(root, { start: 0, end: () => `+=${root.offsetHeight}`, scrub: 0.45 }).to(root, { y: -20 });
            }),
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
            supportOverview: entrance,
            creatorJourney: entrance,
            creatorFaq,
            finalCta,
        },
    };
    static about = { section: { hero: intro, brandPhilosophy: entrance, location: entrance } };
    static services = { section: { hero: intro, overview: serviceOverview } };
    static equipment = { section: { hero: intro, grid: entrance, studioEnvironment: entrance } };
    static benefits = { section: { hero: intro, overview: entrance, closing: entrance } };
}

export default Animation;
