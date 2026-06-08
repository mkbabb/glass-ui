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
// The highlight registry is process-global keyed by name, and a name IS a
// paint identity (`::highlight(<name>)` has no wildcard form). Two surfaces
// that share a name — two FuzzySearch instances both painting
// `glass-search-mark`, say — therefore MULTIPLEX rather than clobber: each
// instance is a contributor whose current ranges union into one shared
// `Highlight`. The module-level `groups` map below holds, per name, the set of
// live contributors; any `set`/`clear`/`dispose` rebuilds the shared
// `Highlight` from the union of all live contributors' ranges. The registry
// entry is deleted only when the last contributor for a name disposes.

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

/** One instance's contribution to a shared name — its current range set. */
interface Contributor {
    ranges: Range[];
}

/**
 * Per-name contributor sets. Every live `useTextHighlight(name)` instance owns
 * a `Contributor` in `groups.get(name)`; the shared `Highlight` registered
 * under `name` is the union of all members' ranges.
 */
const groups = new Map<string, Set<Contributor>>();

/** `CSS.highlights` + the `Highlight` constructor are present. */
function detectSupport(): boolean {
    return (
        typeof CSS !== "undefined" &&
        // `highlights` is a `HighlightRegistry` (Map-like) on the CSS namespace.
        "highlights" in CSS &&
        typeof (globalThis as { Highlight?: unknown }).Highlight === "function"
    );
}

/**
 * Rebuild the shared `Highlight` for `name` from the union of all live
 * contributors' ranges. With no contributors left, drop the registry entry so
 * a stale name can't paint a torn-down view.
 */
function rebuild(name: string): void {
    const members = groups.get(name);
    if (!members || members.size === 0) {
        CSS.highlights.delete(name);
        return;
    }
    const highlight = new Highlight();
    for (const member of members) {
        for (const range of member.ranges) highlight.add(range);
    }
    CSS.highlights.set(name, highlight);
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
 *   Instances sharing a name multiplex: each contributes its own ranges and
 *   the shared paint is their union (last to dispose drops the registry entry).
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

    // This instance's contribution to the shared name, registered lazily on the
    // first `set` so an unused instance never joins the group nor registers.
    let contributor: Contributor | null = null;

    function ensureContributor(): Contributor {
        if (contributor) return contributor;
        contributor = { ranges: [] };
        let members = groups.get(name);
        if (!members) {
            members = new Set<Contributor>();
            groups.set(name, members);
        }
        members.add(contributor);
        return contributor;
    }

    function set(ranges: Range[]): void {
        if (!supported) return;
        ensureContributor().ranges = ranges.slice();
        rebuild(name);
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
        if (!supported || !contributor) return;
        contributor.ranges = [];
        rebuild(name);
    }

    function dispose(): void {
        if (!supported || !contributor) return;
        // Drop this instance's contribution and rebuild the shared paint from
        // whoever's left; the registry entry survives until the last leaves.
        groups.get(name)?.delete(contributor);
        rebuild(name);
        const members = groups.get(name);
        if (members && members.size === 0) groups.delete(name);
        contributor = null;
    }

    if (getCurrentScope()) {
        onScopeDispose(dispose);
    }

    return { set, setFromMatches, clear, supported };
}
