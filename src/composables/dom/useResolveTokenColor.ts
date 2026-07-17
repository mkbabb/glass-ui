// `resolveTokenColor`: the ONE `var(--token)` → concrete-rgb un-wrap leaf.
//
// value.js's `parseCssColor` reports `color_context_required` for a `var(--token)` wrapper
// per frame on a token color. So a token color MUST
// be un-wrapped to a concrete `rgb(...)` BEFORE the renderer's injected
// `ColorResolver` (value.js) ever sees it. That un-wrap was bolted on TWICE — once in
// `GooBlob.vue` (`resolveColorString`) and again INSIDE the renderer
// (`useMetaballRenderer.ts` `resolveRimColor` + its `rimCache`), the second reaching
// BACK into the canvas element for a `getComputedStyle` and so coupling the pure-fn
// renderer to a DOM read the inv-K-3 seam was built to avoid.
//
// This leaf is the SINGLE un-wrap path. The SFC un-wraps EVERY color string (base +
// rim + every palette stop) through it BEFORE handing concrete strings to the
// renderer, so the renderer's `ColorResolver` only ever sees concrete `rgb(...)`
// strings and stays DOM-free. `getComputedStyle` appears EXACTLY ONCE in the codebase
// for this concern (here).
//
// NOT `useTokenColor`: that composable reads a CSS custom property BY NAME
// (`--meter-track-stroke`) into a reactive ref. This leaf un-wraps an arbitrary CSS
// color STRING (which may be a `var(--token)` wrapper OR a literal hex/oklch/hsl) into
// a concrete value via the paint-and-read cascade trick. Distinct signature, distinct
// purpose — a sibling on the `dom/` subtree, not a rename of `useTokenColor`.
//
// The cache is keyed by `css` and bounded; the un-wrap re-runs on a dark-mode flip
// only when the SFC re-invokes (a token resolves differently under `.dark`), which the
// SFC drives with a `MutationObserver` on `<html>.class` — never per frame (a
// `getComputedStyle` is a forced sync reflow).

/** A bounded LRU-ish cache for the un-wrap (clears wholesale past the cap). */
export interface ResolveTokenColorCache {
    resolve: (css: string, el: HTMLElement | null) => string;
    /** Drop every cached entry — call on a cascade change (dark-mode flip) so a token re-resolves. */
    invalidate: () => void;
}

/**
 * Un-wrap a `var(--token)` color to a concrete `rgb(...)` via a single cached cascade
 * read; a literal (no `var()`) passes straight through. Paints `css` onto the element's
 * `color` property — a `var(--token)` painted on a real CSS property resolves through
 * the cascade, so `getComputedStyle(el).color` returns the concrete `rgb(...)` — then
 * restores the prior value. SSR-safe (returns `css` unchanged when `window`/`el` are
 * absent).
 *
 * @param css the color string (a `var(--token)` wrapper or a literal)
 * @param el  the element to resolve the cascade against (the host wrapper)
 * @returns the concrete color string the `ColorResolver` can parse
 */
export function resolveTokenColor(css: string, el: HTMLElement | null): string {
    // A literal color (no `var()`) is already concrete — pass through.
    if (!css.includes("var(")) return css;
    if (typeof window === "undefined" || !el) return css;
    // Paint the `var(--token)` onto a real CSS property → the cascade resolves it →
    // read back the concrete `rgb(...)` → restore the prior value.
    const prev = el.style.color;
    el.style.color = css;
    const resolved = getComputedStyle(el).color;
    el.style.color = prev;
    return resolved || css;
}

/**
 * Build a bounded cache around `resolveTokenColor` — the un-wrap (a forced sync
 * reflow) runs once per unique color string. `invalidate()` drops every entry so a
 * token re-resolves on a dark-mode flip (the SFC observes `<html>.class` and calls it).
 *
 * @param maxEntries the cache cap before a wholesale clear (default 256)
 */
export function createTokenColorCache(maxEntries = 256): ResolveTokenColorCache {
    const cache = new Map<string, string>();
    return {
        resolve(css: string, el: HTMLElement | null): string {
            const cached = cache.get(css);
            if (cached !== undefined) return cached;
            const resolved = resolveTokenColor(css, el);
            if (cache.size >= maxEntries) cache.clear();
            cache.set(css, resolved);
            return resolved;
        },
        invalidate() {
            cache.clear();
        },
    };
}
