/**
 * Pure layout computation functions for virtual section scrolling.
 *
 * These are stateless — they take data in, return layout info out.
 * No Vue reactivity, no DOM access.
 */

/** A flattened section item with hierarchy metadata for virtual scrolling. */
export interface FlatSection {
    id: string;
    index: number;
    depth: number;
    parentId: string | null;
    rootId: string;
    rootIndex: number;
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
}

/** The visible window range with spacer sizes for virtual scrolling. */
export interface SectionWindowRange {
    startIndex: number;
    endIndex: number;
    topSpacerPx: number;
    bottomSpacerPx: number;
}

/** A forced index range that must be included in the visible window. */
export interface ForcedSectionWindowRange {
    startIndex: number;
    endIndex: number;
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

    return {
        entries,
        totalHeight: offset,
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
 * before and after the viewport. An optional `forcedRange` guarantees
 * certain indices are always included (used for warm-up targeting).
 */
export function resolveSectionWindow<T extends FlatSection>(
    layout: SectionLayout<T>,
    scrollTopPx: number,
    viewportHeightPx: number,
    overscanBeforePx: number,
    overscanAfterPx: number,
    forcedRange?: ForcedSectionWindowRange | null,
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
    const endOffset = Math.max(
        0,
        scrollTopPx + viewportHeightPx + overscanAfterPx,
    );

    let startIndex = findStartIndex(layout.entries, startOffset);
    let endIndex = findEndIndex(layout.entries, endOffset);

    if (forcedRange) {
        startIndex = Math.min(startIndex, forcedRange.startIndex);
        endIndex = Math.max(endIndex, forcedRange.endIndex);
    }

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
 * Useful for highlighting the current section in a navigation sidebar.
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
 */
export function findSectionOffset<T extends FlatSection>(
    layout: SectionLayout<T>,
    id: string,
): number | null {
    for (const entry of layout.entries) {
        if (entry.item.id === id) {
            return entry.top;
        }
    }
    return null;
}
