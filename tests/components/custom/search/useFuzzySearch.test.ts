// BC.W-FUZZY-HARDEN — the composable behaviour floor: the 120ms debounce, the
// selectedIndex reset on results change, the onKeydown Arrow/Enter/Escape nav,
// and the onScopeDispose cleanup. The surface here is EXACTLY what the dock
// composes (BC.W-DOCK-SEARCH) — these units pin it stable.
import { effectScope, nextTick } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useFuzzySearch } from "@glass/components/custom/search/composables/useFuzzySearch";
import type { SearchableItem, SearchResult } from "@glass/components/custom/search/composables/types";

const items: SearchableItem[] = [
    { id: "1", label: "Glass panel", text: "surface tokens", type: "component" },
    { id: "2", label: "Glassy dock", text: "navigation rail", type: "component" },
    { id: "3", label: "Search index", text: "fuzzy scoring", type: "helper" },
];

function keyEvent(key: string): KeyboardEvent {
    return { key, preventDefault: vi.fn() } as unknown as KeyboardEvent;
}

describe("useFuzzySearch", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("exposes the full dock-composable surface", () => {
        const scope = effectScope();
        const state = scope.run(() => useFuzzySearch({ items }))!;
        for (const k of [
            "query",
            "results",
            "selectedIndex",
            "isOpen",
            "isExpanded",
            "onKeydown",
            "selectResult",
            "close",
            "open",
            "toggleExpanded",
        ] as const) {
            expect(state[k]).toBeDefined();
        }
        scope.stop();
    });

    it("debounces the query (120ms default) before producing results", async () => {
        const scope = effectScope();
        const state = scope.run(() => useFuzzySearch({ items }))!;

        state.query.value = "glass";
        await nextTick();
        // before the debounce window elapses, results are still empty.
        expect(state.results.value.length).toBe(0);

        vi.advanceTimersByTime(120);
        await nextTick();
        expect(state.results.value.length).toBeGreaterThan(0);
        scope.stop();
    });

    it("emits results immediately when debounceMs is 0", async () => {
        const scope = effectScope();
        const state = scope.run(() => useFuzzySearch({ items, debounceMs: 0 }))!;
        state.query.value = "glass";
        await nextTick();
        expect(state.results.value.length).toBeGreaterThan(0);
        scope.stop();
    });

    it("resets selectedIndex to 0 when the result set changes", async () => {
        const scope = effectScope();
        const state = scope.run(() => useFuzzySearch({ items, debounceMs: 0 }))!;
        state.query.value = "glass";
        await nextTick();
        state.selectedIndex.value = 1;
        // a new query → a new result set → selectedIndex resets.
        state.query.value = "search";
        await nextTick();
        await nextTick();
        expect(state.selectedIndex.value).toBe(0);
        scope.stop();
    });

    it("onKeydown ArrowDown/ArrowUp walks the result list within bounds", async () => {
        const scope = effectScope();
        const state = scope.run(() => useFuzzySearch({ items, debounceMs: 0 }))!;
        state.query.value = "glass"; // 2 results
        await nextTick();
        expect(state.results.value.length).toBe(2);

        expect(state.selectedIndex.value).toBe(0);
        state.onKeydown(keyEvent("ArrowDown"));
        expect(state.selectedIndex.value).toBe(1);
        // clamps at the last index
        state.onKeydown(keyEvent("ArrowDown"));
        expect(state.selectedIndex.value).toBe(1);
        state.onKeydown(keyEvent("ArrowUp"));
        expect(state.selectedIndex.value).toBe(0);
        // clamps at 0
        state.onKeydown(keyEvent("ArrowUp"));
        expect(state.selectedIndex.value).toBe(0);
        scope.stop();
    });

    it("onKeydown Enter selects the highlighted result via onSelect", async () => {
        const onSelect = vi.fn();
        const scope = effectScope();
        const state = scope.run(() => useFuzzySearch({ items, debounceMs: 0, onSelect }))!;
        state.query.value = "glass";
        await nextTick();
        state.selectedIndex.value = 0;
        state.onKeydown(keyEvent("Enter"));
        expect(onSelect).toHaveBeenCalledTimes(1);
        const arg = onSelect.mock.calls[0][0] as SearchResult;
        expect(arg.item.id).toBe(state.results.value[0]?.item.id ?? "1");
        scope.stop();
    });

    it("onKeydown Escape collapses the expanded modal first, then closes", async () => {
        const scope = effectScope();
        const state = scope.run(() => useFuzzySearch({ items, debounceMs: 0 }))!;
        state.open();
        state.query.value = "glass";
        await nextTick();
        state.toggleExpanded();
        expect(state.isExpanded.value).toBe(true);

        // first Escape collapses the modal (does not close).
        state.onKeydown(keyEvent("Escape"));
        expect(state.isExpanded.value).toBe(false);
        expect(state.isOpen.value).toBe(true);

        // second Escape closes.
        state.onKeydown(keyEvent("Escape"));
        expect(state.isOpen.value).toBe(false);
        expect(state.query.value).toBe("");
        scope.stop();
    });

    it("selectResult fires onSelect and closes", async () => {
        const onSelect = vi.fn();
        const scope = effectScope();
        const state = scope.run(() => useFuzzySearch({ items, debounceMs: 0, onSelect }))!;
        state.open();
        state.query.value = "glass";
        await nextTick();
        const first = state.results.value[0];
        state.selectResult(first);
        expect(onSelect).toHaveBeenCalledWith(first);
        expect(state.isOpen.value).toBe(false);
        scope.stop();
    });

    it("onScopeDispose clears the pending debounce timer (no orphaned timeout)", async () => {
        const scope = effectScope();
        const state = scope.run(() => useFuzzySearch({ items }))!;
        state.query.value = "glass";
        await nextTick();
        // dispose before the debounce fires — the timer must be cleared.
        scope.stop();
        vi.advanceTimersByTime(500);
        await nextTick();
        // results stay empty: the debounced query never committed after disposal.
        expect(state.results.value.length).toBe(0);
    });
});
