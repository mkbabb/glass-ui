// 10.1.1 · atlas G-3 — the run roves its own seats and never writes into a composite
// widget a seat holds. Kept from the atlas U relay (`proto/D5-A/r4/g-dock-seat-rule.test.ts`).
//
// RED on 10.1.0: `syncRoving` wrote −1 onto the selected item of a ToggleGroup nested in
// a container seat, leaving the group with no tab stop, and an ArrowRight inside the
// container left it for the next seat.
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h, nextTick } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import ToggleGroup from "@glass/components/toggle-group/ToggleGroup.vue";
import ToggleGroupItem from "@glass/components/toggle-group/ToggleGroupItem.vue";

function dockWithContainerSeat() {
    return mount(GlassDock, {
        props: { collapse: "open" as const },
        slots: {
            default: () => [
                h("button", { "data-seat": "0" }, "a"),
                h("div", { "data-seat": "c" }, [
                    h(ToggleGroup, { type: "single", modelValue: "x" }, () => [
                        h(ToggleGroupItem, { value: "x", "data-item": "x" }, () => "X"),
                        h(ToggleGroupItem, { value: "y", "data-item": "y" }, () => "Y"),
                    ]),
                    h("button", { "data-inner": "" }, "inner"),
                ]),
                h("button", { "data-seat": "2" }, "b"),
            ],
        },
        attachTo: document.body,
    });
}

describe("dock run · seat rule", () => {
    it("a composite nested in a container seat keeps its one tab stop", async () => {
        const w = dockWithContainerSeat();
        await nextTick();
        await nextTick();
        const stops = w.findAll("[data-item]").filter((i) => i.attributes("tabindex") === "0");
        expect(stops.map((s) => s.attributes("data-item"))).toEqual(["x"]);
        expect(w.get("[data-inner]").attributes("tabindex")).toBeUndefined();
        w.unmount();
    });

    it("arrows travel the roved seats and skip the container seat", async () => {
        const w = dockWithContainerSeat();
        await nextTick();
        await w.get('[data-seat="0"]').trigger("keydown", { key: "ArrowRight" });
        await nextTick();
        expect(document.activeElement?.getAttribute("data-seat")).toBe("2");
        w.unmount();
    });

    it("a key pressed inside a container seat is the seat's own", async () => {
        const w = dockWithContainerSeat();
        await nextTick();
        const inner = w.get("[data-inner]").element as HTMLElement;
        inner.focus();
        await w.get("[data-inner]").trigger("keydown", { key: "ArrowRight" });
        await nextTick();
        expect(document.activeElement).toBe(inner);
        w.unmount();
    });
});
