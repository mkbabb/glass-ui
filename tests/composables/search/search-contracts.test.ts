import { nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildIndex, clearSearchCache, searchIndex } from "@glass/composables/search/match";
import { useFuzzySearch } from "@glass/composables/search/useFuzzySearch";
import type { SearchableItem } from "@glass/composables/search/types";
import { mountComposable } from "../../utils/mountComposable";
import SearchRoute from "../../../demo/stories/data/search.vue";

// The `FuzzySearch.vue` overlay component retired at REDUCTION W3 (A14 — demo-only,
// zero constellation consumers). Its highlighting/aria coverage retired with it; the
// fuzzy ENGINE (buildIndex/searchIndex/useFuzzySearch — the dock's live matcher via
// useDockSearch) survives and keeps its coverage below.

function item(id: string, label: string): SearchableItem {
    return {
        id,
        label,
        text: label,
        type: "component",
    };
}

describe("fuzzy search index caching", () => {
    afterEach(() => {
        clearSearchCache();
    });

    it("scopes cached queries to the index instance", () => {
        const first = buildIndex([item("first", "Shared Label")]);
        const second = buildIndex([item("second", "Shared Label")]);

        expect(searchIndex(first, "shared")[0]?.item.id).toBe("first");
        expect(searchIndex(second, "shared")[0]?.item.id).toBe("second");
    });

    it("does not reuse a truncated maxResults cache entry", () => {
        const index = buildIndex([
            item("first", "Alpha One"),
            item("second", "Alpha Two"),
        ]);

        expect(searchIndex(index, "alpha", 1)).toHaveLength(1);
        expect(searchIndex(index, "alpha", 2)).toHaveLength(2);
    });
});

describe("useFuzzySearch debounce cleanup", () => {
    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
        clearSearchCache();
    });

    it("clears pending debounce timers when the owning scope is disposed", async () => {
        vi.useFakeTimers();
        const mounted = mountComposable(() =>
            useFuzzySearch({
                items: [item("alpha", "Alpha Result")],
                debounceMs: 100,
            }),
        );
        // The Vue app-mount schedules one env-init timer under fake timers; drop it
        // so the assertion measures exactly the debounce timer, order-independent.
        vi.clearAllTimers();
        let disposed = false;

        try {
            mounted.result.query.value = "alpha";
            await nextTick();

            expect(vi.getTimerCount()).toBe(1);
            mounted.unmount();
            disposed = true;
            expect(vi.getTimerCount()).toBe(0);
        } finally {
            if (!disposed) mounted.unmount();
        }
    });

    it("cancels pending debounce work and refreshes against changed sources", async () => {
        vi.useFakeTimers();
        const items = ref<SearchableItem[]>([item("old", "Beta Result")]);
        const mounted = mountComposable(() =>
            useFuzzySearch({
                items: () => items.value,
                debounceMs: 100,
            }),
        );
        // Drop the one env-init timer the app-mount schedules under fake timers.
        vi.clearAllTimers();

        try {
            mounted.result.query.value = "alpha";
            await nextTick();
            expect(vi.getTimerCount()).toBe(1);

            items.value = [item("new", "Alpha Result")];
            await nextTick();

            expect(vi.getTimerCount()).toBe(0);
            expect(mounted.result.results.value[0]?.item.id).toBe("new");
        } finally {
            mounted.unmount();
        }
    });
});

// ── THE COMBOBOX SEMANTICS, READ OFF THE RENDERED DOM ────────────────────────────
// [2026-08-28 · BK π-CURE · R4 · owner #42 W-SEARCH] Born RED against `ebb58a0f`.
//
// The π band's a11y walk (`pi-SEARCH-ROUTE-aria-wiring-1440-dark.json`) measured
// `aria-activedescendant` following ArrowDown correctly across all five steps while
// `role=option` and `aria-selected` counted **0 in the entire document** at every step.
// The route's template *reads* correct — it authors `role="option"` and
// `:aria-selected` on each `<Card>`. Both silently no-op: `Card` binds `v-bind="$attrs"`
// FIRST and then restates `:role` / `:aria-selected` / `:tabindex` from its own
// `selected` prop, so the later explicit bindings win and an unset `selected` REMOVES
// the attributes the consumer authored. The engine half was never the defect; the
// route was writing to a channel the component owns.
//
// This is the class the browser catches and vue-tsc/units do not (a fallthrough attr
// clobbered by an explicit binding type-checks perfectly), which is why the arm reads
// the rendered DOM of the real route rather than the source text.
describe("/data/search — the listbox is a listbox and its options are options", () => {
    const mountedRoutes: Array<ReturnType<typeof mount>> = [];

    afterEach(() => {
        while (mountedRoutes.length) mountedRoutes.pop()?.unmount();
        clearSearchCache();
    });

    async function mountQueried(query: string) {
        // `StoryPage` reads `useRoute().path` for its route-window attribute — the
        // memory router is the demo-tree harness (`tests/demo/landing.test.ts`), not a
        // stub of the subject: the listbox under test is the route's own markup.
        const router = createRouter({
            history: createMemoryHistory(),
            routes: [{ path: "/data/search", component: { template: "<div />" } }],
        });
        await router.push("/data/search");
        await router.isReady();

        const wrapper = mount(SearchRoute, {
            attachTo: document.body,
            global: { plugins: [router] },
        });
        mountedRoutes.push(wrapper);
        await wrapper.get("input.input-bar-field").setValue(query);
        // The route's own `debounceMs: 40`, drained on real timers — the walk is a
        // rendered-DOM fact, not a timer fact.
        await new Promise((resolve) => setTimeout(resolve, 80));
        await nextTick();
        return wrapper;
    }

    it("gives every result row role=option, a stable id and an aria-selected state", async () => {
        const wrapper = await mountQueried("dock");

        const listbox = wrapper.get('[role="listbox"]');
        const options = wrapper.findAll('[role="option"]');

        expect(options.length).toBeGreaterThan(0);
        // The listbox OWNS them — every option is a descendant of the listbox, which
        // is what `aria-activedescendant` resolution requires.
        expect(listbox.findAll('[role="option"]').length).toBe(options.length);

        for (const option of options) {
            expect(option.attributes("id")).toMatch(/^search-result-search-row-\d{3}$/);
            expect(option.attributes("aria-selected")).toMatch(/^(true|false)$/);
        }

        // THE RESIDUAL, PINNED RATHER THAN LEFT TO DRIFT. `selected` is Card's OPTION
        // contract and that contract includes a tab stop by design — *"`selected="false"`
        // is an unselected OPTION, which owes a role and a tab stop"* (`Card.vue:44-46`,
        // `:60`). Consuming the channel therefore also makes each of the 12 rows
        // focusable, beside a field that walks them with `aria-activedescendant` — two
        // focus models on one widget. It is asserted here because it is a MEASURED
        // consequence of this cure (12 tabbable rows where there were 0), and because the
        // route cannot undo it: `Card` binds `v-bind="$attrs"` FIRST, so a consumer
        // `tabindex` loses to the component's own — the same clobber that caused R4.
        // The question is Card's option contract, not this route's, and is routed there;
        // when it is answered this line is the site that says so.
        for (const option of options) {
            expect(option.attributes("tabindex")).toBe("0");
        }

        const selected = options.filter(
            (option) => option.attributes("aria-selected") === "true",
        );
        expect(selected).toHaveLength(1);
    });

    it("wires the field as a combobox that controls the listbox", async () => {
        const wrapper = await mountQueried("dock");

        const input = wrapper.get("input.input-bar-field");
        const listboxId = wrapper.get('[role="listbox"]').attributes("id");

        expect(listboxId).toBeTruthy();
        expect(input.attributes("role")).toBe("combobox");
        expect(input.attributes("aria-controls")).toBe(listboxId);
        expect(input.attributes("aria-expanded")).toBe("true");
        expect(input.attributes("aria-autocomplete")).toBe("list");
    });

    it("moves aria-selected with aria-activedescendant on ArrowDown", async () => {
        const wrapper = await mountQueried("dock");
        const input = wrapper.get("input.input-bar-field");

        const activeOption = () => {
            const id = input.attributes("aria-activedescendant");
            expect(id, "the field must point at an active descendant").toBeTruthy();
            const node = wrapper.element.querySelector(`#${CSS.escape(id!)}`);
            expect(node, `#${id} must exist inside the route`).not.toBeNull();
            return node as HTMLElement;
        };

        const first = activeOption();
        expect(first.getAttribute("role")).toBe("option");
        expect(first.getAttribute("aria-selected")).toBe("true");

        await input.trigger("keydown", { key: "ArrowDown" });
        await nextTick();

        const second = activeOption();
        expect(second).not.toBe(first);
        expect(second.getAttribute("role")).toBe("option");
        expect(second.getAttribute("aria-selected")).toBe("true");
        // The vacated row hands the state back — one selected option, never two.
        expect(first.getAttribute("aria-selected")).toBe("false");
    });
});
