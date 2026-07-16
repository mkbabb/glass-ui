import { mount } from "@vue/test-utils";
import { defineComponent, h, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
    buildSectionLayout,
    findSectionOffset,
    resolveActiveSection,
    resolveSectionWindow,
    type FlatSection,
    type SectionLayout,
} from "../../demo/composables/virtual/virtualSectionLayout";
import { useVirtualSectionWindow } from "../../demo/composables/virtual/useVirtualSectionWindow";

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

afterEach(() => vi.useRealTimers());

describe("virtualSectionLayout — demo windowing layout", () => {
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
        expect(findSectionOffset(LAYOUT, "section-500")).toBe(LAYOUT.entries[500].top);
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

    it("replaces, stabilizes, and releases a target across two measurement batches", async () => {
        vi.useFakeTimers();
        const scroller = document.createElement("div");
        Object.defineProperty(scroller, "clientHeight", { value: 300 });
        const sections = makeSections(40).map((section) => ({
            ...section,
            estimatedHeight: 100,
        }));

        let ensureTargetWindow = (_id: string) => {};
        let measureSection = (_id: string, _el: HTMLElement | null) => {};
        let visibleIds = () => [] as string[];
        const wrapper = mount(
            defineComponent({
                setup() {
                    const window = useVirtualSectionWindow({
                        items: sections,
                        scrollContainer: ref<HTMLElement | null>(scroller),
                    });
                    ensureTargetWindow = window.ensureTargetWindow;
                    measureSection = window.measureSection;
                    visibleIds = () => window.visibleItems.value.map((item) => item.id);
                    return () => h("div");
                },
            }),
        );

        function report(id: string, height: number) {
            const el = document.createElement("div");
            Object.defineProperty(el, "offsetHeight", { value: height });
            measureSection(id, el);
        }

        ensureTargetWindow("section-25");

        expect(scroller.scrollTop).toBe(2_500);
        expect(visibleIds()).toContain("section-25");
        expect(visibleIds().length).toBeLessThan(20);

        // A newer request deterministically replaces the first target and its
        // outstanding ref set.
        ensureTargetWindow("section-10");
        expect(scroller.scrollTop).toBe(1_000);
        report("section-22", 140);
        await vi.runAllTimersAsync();
        expect(scroller.scrollTop).toBe(1_000);

        // Batch one mixes a pre-target change with an after-target change.
        // Only the former moves the target top, so the same delta is added to
        // scrollTop and the target stays at the viewport origin.
        report("section-7", 140);
        report("section-15", 180);
        await vi.runAllTimersAsync();
        expect(scroller.scrollTop).toBe(1_040);

        // Batch two reports the remaining rendered refs through the target.
        // The estimate-equal row still counts as a report; target/after-target
        // heights do not move the target top.
        report("section-8", 80);
        report("section-9", 100);
        report("section-10", 160);
        await vi.runAllTimersAsync();
        expect(scroller.scrollTop).toBe(1_020);

        // Every recorded ref has reported, so reconciliation is released.
        // A later pre-target resize updates layout without holding the old
        // target in place indefinitely.
        report("section-7", 180);
        await vi.runAllTimersAsync();
        expect(scroller.scrollTop).toBe(1_020);

        wrapper.unmount();
        vi.useRealTimers();
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
