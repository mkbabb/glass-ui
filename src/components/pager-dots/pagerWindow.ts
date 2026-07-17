/* pagerWindow — the ONE windowing oracle the position-dot rail renders.
   The shared, pure, DOM-free window math: every index while they all fit, else `fit`
   indices centered on the active and clamped to the ends, with edge flags cueing
   more beyond. Sourced from ONE place — PagerDots composes it AND `<DeckPager>`
   composes it through PagerDots; there is NO third copy (the deck wave's binding
   fence — the boundary verdict rides the pure math with the dots, never the deck
   engine). */

export interface PagerWindow {
    /** The 0-based slide indices to render as dots. */
    shown: number[];
    /** The window is clipped at the start (a dimmed leading edge dot). */
    clippedStart: boolean;
    /** The window is clipped at the end (a dimmed trailing edge dot). */
    clippedEnd: boolean;
}

export function pagerWindow(
    total: number,
    activeIndex: number,
    fit: number,
): PagerWindow {
    const m = Math.max(1, Math.min(fit, total));
    const start =
        total <= m
            ? 0
            : Math.max(0, Math.min(activeIndex - Math.floor(m / 2), total - m));
    const length = Math.min(m, total);
    const shown = Array.from({ length }, (_, i) => start + i);
    return {
        shown,
        clippedStart: shown.length > 0 && shown[0]! > 0,
        clippedEnd: shown.length > 0 && shown[shown.length - 1]! < total - 1,
    };
}
