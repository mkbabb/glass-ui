// Un-wrap a `var(--token)` CSS color to a CONCRETE color string via one cached
// cascade read.
//
// THE PROBLEM IT SOLVES (AX.W16 F4). A WebGL color resolver (value.js's
// `parseCSSColor` behind the blob's injected `ColorResolver`) cannot parse a
// `var(--token)` wrapper — it threw once per frame on a token color (the AW.W13
// `374b98e` runtime bug). The only way to resolve a `var()` to its concrete value
// is to read it back through the live cascade: paint the string onto a real CSS
// property on a mounted element and read `getComputedStyle(el).<prop>`, which the
// browser has resolved to the concrete `rgb(...)`.
//
// THE LEAK IT CLOSES. That cascade read was bolted on TWICE — once in `GooBlob.vue`
// (`resolveColorString`) and once INSIDE the renderer (`useMetaballRenderer`'s
// `resolveRimColor`), so the renderer reached BACK into the canvas element to do a
// `getComputedStyle`, coupling the DOM-free renderer (the AT.W0 inv-K-3 seam) to a
// DOM read it was specifically built to avoid. This leaf is the ONE un-wrap path:
// the SFC un-wraps every color string BEFORE handing it to the renderer, so the
// renderer's `colorResolver` only ever sees CONCRETE strings and stays DOM-free.
//
// `getComputedStyle` is a forced sync reflow, so the read is CACHED per unique
// string (the consumer cycles a handful of stable tokens) and is NEVER called per
// frame — the SFC resolves on mount + on a color/theme change only.

/**
 * A cached `var(--token)` → concrete-color un-wrapper bound to a resolver element.
 *
 * `createTokenColorResolver(getEl)` returns a `resolve(css)` that:
 *   - passes a LITERAL color (no `var()`) straight through (no DOM touch);
 *   - for a `var()`-bearing string, paints it onto the element's `color` property
 *     and reads back the browser-resolved concrete value, cached per unique input.
 *
 * `getEl` is a late-bound getter (the element may mount after the resolver is
 * created). When the element or `window` is absent (SSR / pre-mount), the original
 * string passes through unchanged.
 *
 * Theme flips (`.dark` on `<html>`) change what a token resolves to, so the
 * consumer must `clear()` the cache on a dark-mode mutation and re-resolve — the
 * leaf owns the cache, the consumer owns WHEN to invalidate it.
 */
export interface TokenColorUnwrapper {
    /** Un-wrap a CSS color string to a concrete value (cached). */
    resolve: (css: string) => string;
    /** Drop the cache — call on a theme flip so tokens re-resolve under the new cascade. */
    clear: () => void;
}

export function createTokenColorResolver(
    getEl: () => HTMLElement | null,
): TokenColorUnwrapper {
    const cache = new Map<string, string>();

    function resolve(css: string): string {
        // A literal color (no `var()`) is already concrete — pass through, no cache,
        // no DOM touch.
        if (!css.includes("var(")) return css;
        const cached = cache.get(css);
        if (cached !== undefined) return cached;
        const el = getEl();
        if (typeof window === "undefined" || !el) return css;
        // Paint the `var(--token)` onto a real CSS property and read the
        // browser-resolved concrete value back through the cascade.
        const prev = el.style.color;
        el.style.color = css;
        const concrete = getComputedStyle(el).color || css;
        el.style.color = prev;
        if (cache.size > 256) cache.clear();
        cache.set(css, concrete);
        return concrete;
    }

    function clear(): void {
        cache.clear();
    }

    return { resolve, clear };
}
