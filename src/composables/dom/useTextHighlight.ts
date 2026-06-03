// Named text highlight via the CSS Custom Highlight API.
//
// The platform paints a `Range` set under a named `Highlight` registered in
// `CSS.highlights`, styled by a `::highlight(<name>)` rule — no DOM mutation,
// no `<mark>` wrapper splitting the text node. Consumers that paint matched
// substrings (search marks, equation-variable emphasis) hand the composable a
// set of `Range`s (or a container + query) and the platform repaints in place.
//
// Feature-detect: `CSS.highlights` and the `Highlight` constructor land
// together (Chromium 105+, Safari 17.2+, Firefox 140+). When either is absent
// the composable no-ops — `set`/`setFromMatches`/`clear` are safe to call and
// the consumer keeps whatever fallback it renders. SSR (no `document`/`CSS`)
// takes the same no-op path.
//
// The highlight registry is process-global keyed by name, so two composables
// sharing a name share one `Highlight`; pick a name unique to the surface
// (`fuzzy-search`, `fourier-eq`, …) and ship a matching `::highlight()` paint.

import { getCurrentScope, onScopeDispose } from "vue";

/** Match a query against a text-node's content, returning matched char ranges. */
export type HighlightMatcher = (
    /** The text-node's full string content. */
    text: string,
    /** The active query (already passed through to the matcher unchanged). */
    query: string,
) => Array<{ start: number; end: number }>;

export interface UseTextHighlightControls {
    /** Replace the highlight's range set. Empty array clears the paint. */
    set: (ranges: Range[]) => void;
    /**
     * Walk every text node under `container`, run `matcher` per node, and
     * highlight the returned `[start, end)` char spans. Replaces the prior set.
     * The default matcher is a case-insensitive substring scan over `query`.
     */
    setFromMatches: (
        container: HTMLElement,
        query: string,
        matcher?: HighlightMatcher,
    ) => void;
    /** Drop every range — the named highlight stops painting. */
    clear: () => void;
    /** True when the CSS Custom Highlight API is available (else every op no-ops). */
    readonly supported: boolean;
}

/** `CSS.highlights` + the `Highlight` constructor are present. */
function detectSupport(): boolean {
    return (
        typeof CSS !== "undefined" &&
        // `highlights` is a `HighlightRegistry` (Map-like) on the CSS namespace.
        "highlights" in CSS &&
        typeof (globalThis as { Highlight?: unknown }).Highlight === "function"
    );
}

/** Default substring matcher — every case-insensitive occurrence of `query`. */
function substringMatcher(
    text: string,
    query: string,
): Array<{ start: number; end: number }> {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    const hay = text.toLowerCase();
    const out: Array<{ start: number; end: number }> = [];
    let from = 0;
    for (;;) {
        const at = hay.indexOf(needle, from);
        if (at === -1) break;
        out.push({ start: at, end: at + needle.length });
        from = at + needle.length;
    }
    return out;
}

/**
 * Drive a named CSS Custom Highlight reactively.
 *
 * @param name registry key — must match a `::highlight(<name>)` style rule.
 *
 * @example
 * const hl = useTextHighlight("fuzzy-search");
 * watch([query, listEl], ([q, el]) => {
 *     if (el) hl.setFromMatches(el, q, fuzzyRanges);
 * });
 *
 * // Or hand it pre-built ranges directly:
 * hl.set([range]);
 */
export function useTextHighlight(name: string): UseTextHighlightControls {
    const supported = detectSupport();

    // One Highlight per composable instance; the name keys it in the registry.
    // Constructed lazily on first `set` so an unused instance registers nothing.
    let highlight: Highlight | null = null;

    function ensureHighlight(): Highlight {
        if (highlight) return highlight;
        highlight = new Highlight();
        CSS.highlights.set(name, highlight);
        return highlight;
    }

    function set(ranges: Range[]): void {
        if (!supported) return;
        const hl = ensureHighlight();
        hl.clear();
        for (const range of ranges) hl.add(range);
    }

    function setFromMatches(
        container: HTMLElement,
        query: string,
        matcher: HighlightMatcher = substringMatcher,
    ): void {
        if (!supported) return;
        const ranges: Range[] = [];
        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
        );
        for (
            let node = walker.nextNode();
            node;
            node = walker.nextNode()
        ) {
            const content = node.textContent ?? "";
            if (!content) continue;
            for (const span of matcher(content, query)) {
                if (span.start >= span.end) continue;
                const range = document.createRange();
                range.setStart(node, span.start);
                range.setEnd(node, span.end);
                ranges.push(range);
            }
        }
        set(ranges);
    }

    function clear(): void {
        if (!supported || !highlight) return;
        highlight.clear();
    }

    function dispose(): void {
        if (!supported) return;
        highlight?.clear();
        // Drop the registry entry so a stale name can't paint a torn-down view.
        CSS.highlights.delete(name);
        highlight = null;
    }

    if (getCurrentScope()) {
        onScopeDispose(dispose);
    }

    return { set, setFromMatches, clear, supported };
}
