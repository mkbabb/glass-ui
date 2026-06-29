import { describe, expect, it } from "vitest";
import {
    buildSectionLayout,
    findSectionOffset,
    resolveActiveSection,
    resolveSectionWindow,
    type FlatSection,
    type SectionLayout,
} from "@glass/composables/virtual/virtualSectionLayout";
import { useWindowedStore } from "@glass/composables/virtual/useWindowedStore";

// ── Fixture data — a 1000-item synthetic section list ────────────────────────
// Heights vary deterministically (40..159px) so offsets are non-uniform; this
// exercises the binary-search window/offset/active paths over a real spread.
function makeSections(n: number): FlatSection[] {
    return Array.from({ length: n }, (_, i) => ({
        id: `section-${i}`,
        index: i,
        depth: i % 3,
        parentId: i % 3 === 0 ? null : `section-${i - (i % 3)}`,
        rootId: `section-${i - (i % 3)}`,
        rootIndex: Math.floor(i / 3),
        estimatedHeight: 40 + ((i * 7) % 120),
    }));
}

// The reference linear scan — the words-copy O(n) shape `findSectionOffset`
// refined away from. The fixture pins the binary-search variant byte-identical
// to THIS over every id in a 1000-item layout.
function linearFindOffset<T extends FlatSection>(
    layout: SectionLayout<T>,
    id: string,
): number | null {
    for (const entry of layout.entries) {
        if (entry.item.id === id) return entry.top;
    }
    return null;
}

const SECTIONS = makeSections(1000);
const LAYOUT = buildSectionLayout(SECTIONS, (s) => s.estimatedHeight);

describe("virtualSectionLayout — pure layout engine (BC.W-VIRTUAL-WINDOW)", () => {
    it("buildSectionLayout accumulates monotone top/bottom offsets", () => {
        expect(LAYOUT.entries).toHaveLength(1000);
        expect(LAYOUT.entries[0].top).toBe(0);
        // Each entry's top equals the previous bottom; bottom = top + height.
        let running = 0;
        for (const e of LAYOUT.entries) {
            expect(e.top).toBe(running);
            expect(e.height).toBe(Math.max(1, Math.round(e.item.estimatedHeight)));
            running += e.height;
            expect(e.bottom).toBe(running);
        }
        expect(LAYOUT.totalHeight).toBe(running);
    });

    it("findSectionOffset (binary search) is byte-identical to the linear scan", () => {
        // Every id resolves identically through the refined binary search and
        // the reference linear scan — the homecoming-discipline byte-faithful
        // pin over the full 1000-item layout.
        for (const s of SECTIONS) {
            expect(findSectionOffset(LAYOUT, s.id)).toBe(
                linearFindOffset(LAYOUT, s.id),
            );
        }
        // A missing id resolves to null in both.
        expect(findSectionOffset(LAYOUT, "section-9999")).toBeNull();
        expect(linearFindOffset(LAYOUT, "section-9999")).toBeNull();
        // Spot-check an absolute value: section-0 is at top 0.
        expect(findSectionOffset(LAYOUT, "section-0")).toBe(0);
        expect(findSectionOffset(LAYOUT, "section-500")).toBe(
            LAYOUT.entries[500].top,
        );
    });

    it("resolveSectionWindow returns a bounded window with honest spacers", () => {
        const viewport = 900;
        const scrollTop = 12_000;
        const win = resolveSectionWindow(
            LAYOUT,
            scrollTop,
            viewport,
            viewport, // overscanBefore
            viewport * 2, // overscanAfter
        );
        // The window is a small slice, not the whole list.
        expect(win.startIndex).toBeGreaterThan(0);
        expect(win.endIndex).toBeLessThan(999);
        expect(win.endIndex - win.startIndex).toBeLessThan(200);
        // Spacers reflect the entries outside the window — top spacer is the
        // first windowed entry's top; bottom spacer fills to total height.
        expect(win.topSpacerPx).toBe(LAYOUT.entries[win.startIndex].top);
        expect(win.bottomSpacerPx).toBe(
            LAYOUT.totalHeight - LAYOUT.entries[win.endIndex].bottom,
        );
        // The full scroll height is honest: topSpacer + windowed heights +
        // bottomSpacer === totalHeight.
        let windowedHeight = 0;
        for (let i = win.startIndex; i <= win.endIndex; i++) {
            windowedHeight += LAYOUT.entries[i].height;
        }
        expect(win.topSpacerPx + windowedHeight + win.bottomSpacerPx).toBe(
            LAYOUT.totalHeight,
        );
    });

    it("resolveSectionWindow honors a forced (warm) range", () => {
        const viewport = 900;
        // Scroll near the top; force a far range into the window.
        const forced = { startIndex: 800, endIndex: 805 };
        const win = resolveSectionWindow(
            LAYOUT,
            0,
            viewport,
            viewport,
            viewport * 2,
            forced,
        );
        expect(win.startIndex).toBeLessThanOrEqual(0);
        expect(win.endIndex).toBeGreaterThanOrEqual(805);
    });

    it("resolveActiveSection returns the last section whose top <= offset", () => {
        const e = LAYOUT.entries[300];
        // An offset just inside section-300 resolves to section-300.
        const active = resolveActiveSection(LAYOUT, e.top + 1);
        expect(active?.id).toBe("section-300");
        // Exactly at a top resolves to that section.
        expect(resolveActiveSection(LAYOUT, e.top)?.id).toBe("section-300");
        // Offset 0 resolves to the first section.
        expect(resolveActiveSection(LAYOUT, 0)?.id).toBe("section-0");
    });

    it("empty layout degrades cleanly", () => {
        const empty = buildSectionLayout<FlatSection>([], () => 10);
        expect(empty.entries).toHaveLength(0);
        expect(empty.totalHeight).toBe(0);
        const win = resolveSectionWindow(empty, 0, 900, 900, 1800);
        expect(win.endIndex).toBeLessThan(win.startIndex);
        expect(resolveActiveSection(empty, 0)).toBeNull();
        expect(findSectionOffset(empty, "x")).toBeNull();
    });
});

describe("useWindowedStore — generation-counter race-guard (VW3 live assert)", () => {
    it("appendIfCurrent rejects a stale append after a reset bumped generation", () => {
        const store = useWindowedStore<number>({ maxResident: 200 });
        // Page 1 lands; capture the generation the fetch started under.
        store.set([1, 2, 3], true);
        const gen = store.generation.value;
        expect(store.items.value).toEqual([1, 2, 3]);

        // A reset (e.g. a new search) bumps the generation mid-flight.
        store.set([10, 20], true);
        expect(store.generation.value).toBe(gen + 1);

        // The stale page-2 append (started under the OLD generation) is rejected
        // and does NOT mutate items.
        const accepted = store.appendIfCurrent([4, 5, 6], gen);
        expect(accepted).toBe(false);
        expect(store.items.value).toEqual([10, 20]);

        // A current-generation append IS accepted.
        const ok = store.appendIfCurrent([30], store.generation.value);
        expect(ok).toBe(true);
        expect(store.items.value).toEqual([10, 20, 30]);
    });

    it("set(append) evicts from the front past maxResident", () => {
        const store = useWindowedStore<number>({ maxResident: 5 });
        store.set([1, 2, 3], true);
        store.set([4, 5, 6, 7], false); // 7 items -> evict 2 from front
        expect(store.items.value).toEqual([3, 4, 5, 6, 7]);
        expect(store.windowStart.value).toBe(2);
    });

    it("prepend evicts from the end and bumps generation", () => {
        const store = useWindowedStore<number>({ maxResident: 5 });
        store.set([10, 11, 12], true);
        const gen = store.generation.value;
        store.prepend([7, 8, 9, 10], 3); // 7 items -> keep first 5
        expect(store.items.value).toEqual([7, 8, 9, 10, 10]);
        expect(store.windowStart.value).toBe(3);
        expect(store.generation.value).toBe(gen + 1);
    });
});
