// BK row #31 (W-A11Y) — the A11Y family's `G-KEY-SCOPE` seat.
//
// THE ASSERTION (ECOUTE §3, verbatim): "A delegated row-level `keydown` handler tests
// `event.target` against its handle before consuming the key."
//
// RED at HEAD before the cure: `useSortable.ts`'s `onPointerdown` guarded with
// `targetIsHandle` and its `onKeydown`, bound on the same `<li>`, did not — so the
// controller's Space/Enter branch `preventDefault()`-ed every Space pressed anywhere
// inside a sortable row. ECOUTE reproduced it as "a nested `<input>` cannot type a
// space"; the same swallow hit any nested `<button>`, whose own Space activation the
// row consumed on its behalf.
//
// These are BEHAVIOURAL asserts against the real composable — the defect lives in the
// interaction between a delegated listener and a focusable descendant, which no source
// scan can see and no rendered-attribute assert can reach.

import { mount } from "@vue/test-utils";
import { defineComponent, h, ref } from "vue";
import { describe, expect, it } from "vitest";

import {
    SortableList,
    SortableItem,
    SortableHandle,
} from "@glass/components/sortable-list";

type Row = { id: string; label: string };

function mountList(handleSelector?: string | null) {
    const items = ref<Row[]>([
        { id: "a", label: "Alpha" },
        { id: "b", label: "Bravo" },
        { id: "c", label: "Charlie" },
    ]);

    const wrapper = mount(
        defineComponent({
            setup() {
                return () =>
                    // [2026-08-09 · BK #66 CLOSE · RT-40-D] `SortableList` is a
                    // `<script setup generic="T">` SFC. `h()` propagates a `generic=`
                    // only through TEMPLATE type-checking, so at a render-function
                    // call site `T` resolves to `unknown` and every `Row`-typed
                    // callback below mismatched — three TS2769s that made
                    // `vue-tsc -p tsconfig.test.json` (a `release.yml` step) RED. A TS
                    // instantiation expression pins `T` at the seam, which keeps every
                    // callback FULLY checked rather than casting the check away.
                    h(
                        SortableList<Row>,
                        {
                            items: items.value,
                            getId: (item: Row) => item.id,
                            getLabel: (item: Row) => item.label,
                            ...(handleSelector === undefined ? {} : { handleSelector }),
                            "onUpdate:items": (next: Row[]) => {
                                items.value = next;
                            },
                            onReorder: (next: Row[]) => {
                                items.value = next;
                            },
                        },
                        {
                            default: () =>
                                items.value.map((item) =>
                                    h(SortableItem, { id: item.id, key: item.id }, {
                                        default: () => [
                                            h(SortableHandle, null, {
                                                default: () => "⠿",
                                            }),
                                            h("input", {
                                                class: "row-field",
                                                "data-id": item.id,
                                            }),
                                        ],
                                    }),
                                ),
                        },
                    );
            },
        }),
        { attachTo: document.body },
    );

    return { wrapper, items };
}

describe("G-KEY-SCOPE — a delegated row handler only consumes keys that start at its grip", () => {
    it("a Space typed in a nested <input> is NOT consumed by the row", async () => {
        const { wrapper } = mountList();
        const field = wrapper.find("input.row-field");
        expect(field.exists()).toBe(true);

        // `preventDefault()` on this event is the whole defect: it is what stops the
        // character reaching the field. Assert on `defaultPrevented`, not on a spy —
        // the browser reads the flag, so the flag is what has to be right.
        const event = new KeyboardEvent("keydown", {
            key: " ",
            bubbles: true,
            cancelable: true,
        });
        field.element.dispatchEvent(event);
        await wrapper.vm.$nextTick();

        expect(event.defaultPrevented).toBe(false);
        // and no drag was lifted by it
        expect(wrapper.find(".sortable-item[data-sortable-lifted]").exists()).toBe(false);
    });

    it("a Space typed on the HANDLE still lifts the row (the cure takes nothing away)", async () => {
        const { wrapper } = mountList();
        const handle = wrapper.find("[data-sortable-handle]");
        expect(handle.exists()).toBe(true);

        const event = new KeyboardEvent("keydown", {
            key: " ",
            bubbles: true,
            cancelable: true,
        });
        handle.element.dispatchEvent(event);
        await wrapper.vm.$nextTick();

        expect(event.defaultPrevented).toBe(true);
        expect(wrapper.find(".sortable-item[data-sortable-lifted]").exists()).toBe(true);
    });

    it("Escape typed in a nested field is not stolen mid-drag either", async () => {
        const { wrapper } = mountList();
        const handle = wrapper.find("[data-sortable-handle]");
        handle.element.dispatchEvent(
            new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true }),
        );
        await wrapper.vm.$nextTick();
        expect(wrapper.find(".sortable-item[data-sortable-lifted]").exists()).toBe(true);

        const escape = new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
            cancelable: true,
        });
        wrapper.find("input.row-field").element.dispatchEvent(escape);
        await wrapper.vm.$nextTick();
        expect(escape.defaultPrevented).toBe(false);
    });

    it("the pointer path and the key path ask the SAME question", async () => {
        // ONE predicate, both input modes, asserted through the component rather than
        // against a hand-made EventTarget: the `null` (drag-from-anywhere) branch is
        // the one with no consumer in the shipped default, so it is the one a unit
        // fake would most easily get wrong. With no handle declared the ROW is the
        // grip — a key that starts on a focusable descendant is not the row's to take.
        const { wrapper } = mountList(null);

        const fromField = new KeyboardEvent("keydown", {
            key: " ",
            bubbles: true,
            cancelable: true,
        });
        wrapper.find("input.row-field").element.dispatchEvent(fromField);
        await wrapper.vm.$nextTick();
        expect(
            fromField.defaultPrevented,
            "no handle declared ⇒ a descendant that owns its own keys is NOT the grip",
        ).toBe(false);
        expect(wrapper.find(".sortable-item[data-sortable-lifted]").exists()).toBe(false);

        const fromRow = new KeyboardEvent("keydown", {
            key: " ",
            bubbles: true,
            cancelable: true,
        });
        wrapper.find("li.sortable-item").element.dispatchEvent(fromRow);
        await wrapper.vm.$nextTick();
        expect(
            fromRow.defaultPrevented,
            "no handle declared ⇒ the row itself is the grip",
        ).toBe(true);
        expect(wrapper.find(".sortable-item[data-sortable-lifted]").exists()).toBe(true);
    });
});
