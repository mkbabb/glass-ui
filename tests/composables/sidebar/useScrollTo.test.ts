import { effectScope, ref, type EffectScope } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useScrollTo } from "@glass/composables/sidebar/useScrollTo";
import type { TreeIndexEntry } from "@glass/composables/sidebar/types";

// These specs assert the SYNCHRONOUS ensureTargetLoaded partial-load (the
// visibleCount math), not the rAF scroll settle. Stub rAF to a no-op so the
// retry loop stays outside this focused contract; each invocation still owns a
// real Vue effect scope and teardown.
let scope: EffectScope;

beforeEach(() => {
    scope = effectScope();
    vi.stubGlobal("requestAnimationFrame", () => 0);
});
afterEach(() => {
    scope.stop();
    vi.unstubAllGlobals();
});

// ── Fixture — a flat treeIndex over 10 root sections ─────────────────────────
// Each entry carries the four SectionHierarchy fields; `rootIndex` is the
// load-bearing one for the partial-load (`ensureTargetLoaded` → rootIndex + 2).
function makeIndex(n: number): Map<string, TreeIndexEntry> {
    const index = new Map<string, TreeIndexEntry>();
    for (let i = 0; i < n; i++) {
        const id = `sec-${i}`;
        index.set(id, {
            node: { id },
            depth: 0,
            rootId: id,
            parentId: id,
            rootIndex: i,
        });
    }
    return index;
}

describe("useScrollTo.ensureTargetLoaded (the partial-load)", () => {
    it("loads only up to the target's rootIndex + 2 when a treeIndex is passed", () => {
        const visibleCount = ref(2);
        const treeIndex = makeIndex(10);
        const { scrollTo } = scope.run(() => useScrollTo({
            scrollContainer: ref<HTMLElement | null>(null),
            totalCount: 10,
            visibleCount,
            treeIndex,
        }))!;

        // Targeting sec-5 (rootIndex 5) loads up to 5 + 2 = 7, NOT all 10.
        scrollTo("sec-5");
        expect(visibleCount.value).toBe(7);
    });

    it("clamps the partial-load to totalCount (never overshoots)", () => {
        const visibleCount = ref(2);
        const treeIndex = makeIndex(10);
        const { scrollTo } = scope.run(() => useScrollTo({
            scrollContainer: ref<HTMLElement | null>(null),
            totalCount: 10,
            visibleCount,
            treeIndex,
        }))!;

        // Targeting the last section (rootIndex 9): 9 + 2 = 11 clamps to 10.
        scrollTo("sec-9");
        expect(visibleCount.value).toBe(10);
    });

    it("never shrinks an already-larger visibleCount (Math.max guard)", () => {
        const visibleCount = ref(8);
        const treeIndex = makeIndex(10);
        const { scrollTo } = scope.run(() => useScrollTo({
            scrollContainer: ref<HTMLElement | null>(null),
            totalCount: 10,
            visibleCount,
            treeIndex,
        }))!;

        // Targeting sec-1 would want rootIndex+2 = 3, but 8 is already larger.
        scrollTo("sec-1");
        expect(visibleCount.value).toBe(8);
    });

    it("falls back to loading everything (totalCount) without a treeIndex", () => {
        const visibleCount = ref(2);
        const { scrollTo } = scope.run(() => useScrollTo({
            scrollContainer: ref<HTMLElement | null>(null),
            totalCount: 10,
            visibleCount,
            // no treeIndex
        }))!;

        scrollTo("sec-5");
        expect(visibleCount.value).toBe(10);
    });

    it("falls back to totalCount when the id is absent from the treeIndex", () => {
        const visibleCount = ref(2);
        const treeIndex = makeIndex(10);
        const { scrollTo } = scope.run(() => useScrollTo({
            scrollContainer: ref<HTMLElement | null>(null),
            totalCount: 10,
            visibleCount,
            treeIndex,
        }))!;

        scrollTo("does-not-exist");
        expect(visibleCount.value).toBe(10);
    });
});
