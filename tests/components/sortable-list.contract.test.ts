import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
import { describe, expect, it } from "vitest";

import {
    SortableHandle,
    SortableItem,
    SortableList,
} from "@glass/components/sortable-list";

interface Item {
    id: string;
    label: string;
}

const initialItems = (): Item[] => [
    { id: "a", label: "Alpha" },
    { id: "b", label: "Beta" },
    { id: "c", label: "Gamma" },
];

function mountList(disabledId = "") {
    return mount(defineComponent({
        components: { SortableHandle, SortableItem, SortableList },
        setup() {
            return { disabledId, items: ref(initialItems()) };
        },
        template: `
            <SortableList
                :items="items"
                :get-id="item => item.id"
                :get-label="item => item.label"
                label="Tasks"
                @reorder="items = $event"
            >
                <SortableItem
                    v-for="item in items"
                    :key="item.id"
                    :id="item.id"
                    :disabled="item.id === disabledId"
                >
                    <SortableHandle>{{ item.label }}</SortableHandle>
                </SortableItem>
            </SortableList>
        `,
    }), { attachTo: document.body });
}

function rowOrder(wrapper: ReturnType<typeof mountList>): string[] {
    return wrapper.findAll("li").map((row) => row.attributes("data-sortable-id") ?? "");
}

describe("SortableList transaction contract", () => {
    it("renders native list, listitem, and named button semantics", () => {
        const wrapper = mountList("b");

        expect(wrapper.get("ul").attributes("role")).toBeUndefined();
        expect(wrapper.findAll("li")).toHaveLength(3);
        expect(wrapper.findAll("button")).toHaveLength(3);
        expect(wrapper.get('[data-sortable-id="a"] button').attributes("aria-label"))
            .toBe("Reorder Alpha");
        expect(
            wrapper
                .get('[data-sortable-id="a"] button')
                .attributes("data-control-target"),
        ).toBe("");
        expect(wrapper.get('[data-sortable-id="b"] button').attributes("disabled"))
            .toBeDefined();
        expect(wrapper.get("[aria-live]").attributes("aria-live")).toBe("polite");

        wrapper.unmount();
    });

    it("lifts, proposes, and commits with stable focus and one reorder", async () => {
        const wrapper = mountList();
        const handle = wrapper.get('[data-sortable-id="a"] button');
        (handle.element as HTMLButtonElement).focus();

        await handle.trigger("keydown", { key: " " });
        expect(wrapper.get("[aria-live]").text()).toContain("Lifted Alpha, position 1 of 3");
        await handle.trigger("keydown", { key: "End" });
        expect(wrapper.get("[aria-live]").text()).toContain("proposed position 3 of 3");
        await handle.trigger("keydown", { key: "Enter" });
        await nextTick();

        expect(rowOrder(wrapper)).toEqual(["b", "c", "a"]);
        expect(wrapper.get("[aria-live]").text()).toContain("Dropped Alpha, position 3 of 3");
        expect(document.activeElement).toBe(
            wrapper.get('[data-sortable-id="a"] button').element,
        );

        wrapper.unmount();
    });

    it("cancels without reordering and excludes disabled items", async () => {
        const wrapper = mountList("b");
        const alpha = wrapper.get('[data-sortable-id="a"] button');
        await alpha.trigger("keydown", { key: "Enter" });
        await alpha.trigger("keydown", { key: "End" });
        await alpha.trigger("keydown", { key: "Escape" });

        expect(rowOrder(wrapper)).toEqual(["a", "b", "c"]);
        expect(wrapper.get("[aria-live]").text()).toContain("Cancelled moving Alpha");

        await wrapper.get('[data-sortable-id="b"] button').trigger("keydown", { key: " " });
        expect(wrapper.get('[data-sortable-id="b"]').classes())
            .not.toContain("is-sortable-dragging");

        wrapper.unmount();
    });

    it("treats pointercancel as cancellation, never a drop", async () => {
        const wrapper = mountList();
        await wrapper.get('[data-sortable-id="a"] button').trigger("pointerdown", {
            button: 0,
            pointerId: 1,
            clientX: 10,
            clientY: 10,
        });
        // The gesture must EARN the transaction before there is one to cancel: a press
        // that never travels is a click, and the stationary-tap case below holds that
        // half. Cross the slop, then have the system take the pointer away.
        document.dispatchEvent(
            new PointerEvent("pointermove", { pointerId: 1, clientX: 10, clientY: 40 }),
        );
        document.dispatchEvent(new PointerEvent("pointercancel", { pointerId: 1 }));
        await nextTick();

        expect(rowOrder(wrapper)).toEqual(["a", "b", "c"]);
        expect(wrapper.get("[aria-live]").text()).toContain("Cancelled moving Alpha");

        wrapper.unmount();
    });

    it("commits a touch transfer at the retained foreign insertion index", async () => {
        const wrapper = mount(defineComponent({
            components: { SortableHandle, SortableItem, SortableList },
            setup() {
                return {
                    left: ref<Item[]>([{ id: "a", label: "Alpha" }]),
                    right: ref<Item[]>([{ id: "b", label: "Beta" }]),
                };
            },
            methods: {
                insert(list: Item[], index: number, item: Item) {
                    const next = [...list];
                    next.splice(index, 0, item);
                    return next;
                },
            },
            template: `
                <SortableList
                    group="board"
                    label="Backlog"
                    :items="left"
                    :get-id="item => item.id"
                    :get-label="item => item.label"
                    @reorder="left = $event"
                    @insert="(index, item) => left = insert(left, index, item)"
                >
                    <SortableItem v-for="item in left" :key="item.id" :id="item.id">
                        <SortableHandle>{{ item.label }}</SortableHandle>
                    </SortableItem>
                </SortableList>
                <SortableList
                    group="board"
                    label="Doing"
                    :items="right"
                    :get-id="item => item.id"
                    :get-label="item => item.label"
                    @reorder="right = $event"
                    @insert="(index, item) => right = insert(right, index, item)"
                >
                    <SortableItem v-for="item in right" :key="item.id" :id="item.id">
                        <SortableHandle>{{ item.label }}</SortableHandle>
                    </SortableItem>
                </SortableList>
            `,
        }), { attachTo: document.body });

        const [sourceList, targetList] = wrapper.findAll("ul");
        Object.defineProperty(sourceList!.element, "getBoundingClientRect", {
            value: () => ({ left: 0, right: 90, top: 0, bottom: 100, width: 90, height: 100 }),
        });
        Object.defineProperty(targetList!.element, "getBoundingClientRect", {
            value: () => ({ left: 100, right: 200, top: 0, bottom: 100, width: 100, height: 100 }),
        });
        Object.defineProperty(targetList!.get("li").element, "getBoundingClientRect", {
            value: () => ({ left: 100, right: 200, top: 0, bottom: 40, width: 100, height: 40 }),
        });

        await sourceList!.get("button").trigger("pointerdown", {
            button: 0,
            pointerId: 2,
            pointerType: "touch",
            clientX: 10,
            clientY: 10,
        });
        document.dispatchEvent(new PointerEvent("pointermove", {
            pointerId: 2,
            pointerType: "touch",
            clientX: 150,
            clientY: 80,
        }));
        document.dispatchEvent(new PointerEvent("pointerup", {
            pointerId: 2,
            pointerType: "touch",
            clientX: 150,
            clientY: 80,
        }));
        await nextTick();

        expect(sourceList!.findAll("li")).toHaveLength(0);
        expect(targetList!.findAll("li").map((row) => row.attributes("data-sortable-id")))
            .toEqual(["b", "a"]);
        expect(wrapper.findAll("[aria-live]")[0]!.text())
            .toContain("Moved Alpha from Backlog to Doing, position 2 of 2");
        expect(document.activeElement).toBe(
            targetList!.get('[data-sortable-id="a"] button').element,
        );

        wrapper.unmount();
    });
});
