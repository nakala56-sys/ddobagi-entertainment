export type Breakpoint = "mobile" | "tablet" | "pc";

/** Media queries read the same rem tokens that generate Tailwind variants. */
export function getBreakpointQuery(breakpoint: Breakpoint) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(`--breakpoint-${breakpoint}`).trim();
    if (!value) throw new Error(`Missing breakpoint token: ${breakpoint}`);
    return `(min-width: ${value})`;
}
