/**
 * Pure layout computation functions for virtual section scrolling.
 *
 * These are stateless — they take data in, return layout info out.
 * No Vue reactivity, no DOM access.
 *
 * Demo-local continuation of the retired section-layout engine. Behavior stays
 * byte-faithful to the former implementation, including the binary-search
 * offset lookup and shared hierarchy type.
 */

import type { SectionHierarchy } from "@glass/composables/sidebar/types";

/**
 * A flattened section item with hierarchy metadata for virtual scrolling.
 *
 * The four hierarchy fields (`depth`/`rootId`/`parentId`/`rootIndex`) come
 * from the shared `SectionHierarchy` base (`composables/sidebar/types`) — the
 * same fields the sidebar's `TreeIndexEntry` carries, declared ONCE. The
 * demo story builds these at its call site.
 */
export interface FlatSection extends SectionHierarchy {
    id: string;
    index: number;
    estimatedHeight: number;
}

/** A single entry in a computed section layout with resolved position. */
interface VirtualLayoutEntry<T extends FlatSection = FlatSection> {
    item: T;
    height: number;
    top: number;
    bottom: number;
}

/** Complete layout for a list of sections — entries plus total height. */
export interface SectionLayout<T extends FlatSection = FlatSection> {
    entries: VirtualLayoutEntry<T>[];
    totalHeight: number;
    /**
     * Entry slots sorted ascending by `item.id`, so `findSectionOffset` can
     * binary-search an arbitrary string id in O(log n) (the words copy
     * linear-scanned `entries` — `virtualSectionLayout.ts:244-252`). Built
     * once in `buildSectionLayout`; the `top` is read straight off the matched
     * entry, so the offset answer is byte-identical to the linear scan.
     */
    byId: VirtualLayoutEntry<T>[];
}

/** The visible window range with spacer sizes for virtual scrolling. */
export interface SectionWindowRange {
    startIndex: number;
    endIndex: number;
    topSpacerPx: number;
    bottomSpacerPx: number;
}

/**
 * Build a layout from a flat list of sections using a height resolver.
 *
 * Each entry gets an absolute `top` and `bottom` offset in pixels,
 * computed sequentially from index 0. Heights are rounded and clamped >= 1.
 */
export function buildSectionLayout<T extends FlatSection>(
    items: readonly T[],
    getHeight: (item: T) => number,
): SectionLayout<T> {
    let offset = 0;
    const entries = items.map((item) => {
        const height = Math.max(1, Math.round(getHeight(item)));
        const top = offset;
        offset += height;
        return {
            item,
            height,
            top,
            bottom: offset,
        };
    });

    // A by-id-sorted view so `findSectionOffset` binary-searches an arbitrary
    // string id (a total order over ids) instead of linear-scanning entries.
    const byId = entries
        .slice()
        .sort((a, b) => (a.item.id < b.item.id ? -1 : a.item.id > b.item.id ? 1 : 0));

    return {
        entries,
        totalHeight: offset,
        byId,
    };
}

/**
 * Binary search for the first entry whose bottom edge is past `startOffset`.
 * Returns the index of the first visible item.
 */
function findStartIndex<T extends FlatSection>(
    entries: readonly VirtualLayoutEntry<T>[],
    startOffset: number,
): number {
    if (entries.length === 0) return 0;
    let low = 0;
    let high = entries.length - 1;
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (entries[mid].bottom <= startOffset) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}

/**
 * Binary search for the last entry whose top edge is before `endOffset`.
 * Returns the index of the last visible item.
 */
function findEndIndex<T extends FlatSection>(
    entries: readonly VirtualLayoutEntry<T>[],
    endOffset: number,
): number {
    if (entries.length === 0) return 0;
    let low = 0;
    let high = entries.length - 1;
    while (low < high) {
        const mid = Math.ceil((low + high) / 2);
        if (entries[mid].top < endOffset) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }
    return low;
}

/**
 * Resolve which section indices are visible given scroll state.
 *
 * Uses binary search for O(log n) lookup. Overscan extends the window
 * before and after the viewport.
 */
export function resolveSectionWindow<T extends FlatSection>(
    layout: SectionLayout<T>,
    scrollTopPx: number,
    viewportHeightPx: number,
    overscanBeforePx: number,
    overscanAfterPx: number,
): SectionWindowRange {
    if (layout.entries.length === 0) {
        return {
            startIndex: 0,
            endIndex: -1,
            topSpacerPx: 0,
            bottomSpacerPx: 0,
        };
    }

    const startOffset = Math.max(0, scrollTopPx - overscanBeforePx);
    const endOffset = Math.max(0, scrollTopPx + viewportHeightPx + overscanAfterPx);

    let startIndex = findStartIndex(layout.entries, startOffset);
    let endIndex = findEndIndex(layout.entries, endOffset);

    startIndex = Math.max(0, Math.min(startIndex, layout.entries.length - 1));
    endIndex = Math.max(startIndex, Math.min(endIndex, layout.entries.length - 1));

    return {
        startIndex,
        endIndex,
        topSpacerPx: layout.entries[startIndex]?.top ?? 0,
        bottomSpacerPx: Math.max(
            0,
            layout.totalHeight - (layout.entries[endIndex]?.bottom ?? 0),
        ),
    };
}

/**
 * Find the section that is "active" at a given scroll offset.
 *
 * Returns the last section whose top edge is at or before `activeOffsetPx`.
 *
 * NOTE — this is the windowing-LOCAL render-active reader (the section at the
 * 20%-viewport mark, used to label the current render window). It is NOT the
 * ToC's binding active-section reader: a sidebar/ToC consumer reads
 * `useScrollTracker.activeId` (the deepest-visible reader) for the highlight.
 * The two serve distinct concerns and are deliberately separate.
 */
export function resolveActiveSection<T extends FlatSection>(
    layout: SectionLayout<T>,
    activeOffsetPx: number,
): T | null {
    if (layout.entries.length === 0) return null;

    let low = 0;
    let high = layout.entries.length - 1;
    while (low < high) {
        const mid = Math.ceil((low + high) / 2);
        if (layout.entries[mid].top <= activeOffsetPx) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }

    return layout.entries[low]?.item ?? null;
}

/**
 * Find the pixel offset of a section by its `id`.
 * Returns `null` if the section is not in the layout.
 *
 * REFINEMENT: the words copy linear-scans `entries`
 * matching on `id` (O(n), `virtualSectionLayout.ts:244-252`). Here we binary
 * search `layout.byId` — the entries sorted ascending by `item.id` in
 * `buildSectionLayout` — which is a total order over the string ids, so the
 * search is correct + O(log n). The `top` is read straight off the matched
 * entry, so the answer is byte-identical to the linear scan (the fixture pins
 * this over a 1000-item layout).
 */
export function findSectionOffset<T extends FlatSection>(
    layout: SectionLayout<T>,
    id: string,
): number | null {
    const byId = layout.byId;
    let low = 0;
    let high = byId.length - 1;
    while (low <= high) {
        const mid = (low + high) >> 1;
        const probeId = byId[mid].item.id;
        if (probeId === id) return byId[mid].top;
        if (probeId < id) low = mid + 1;
        else high = mid - 1;
    }
    return null;
}
