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
import { RadioGroup, RadioGroupItem } from "@glass/components/radio-group";

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

    // A composite root seated DIRECTLY in the run renders its own `tabindex` (reka's
    // RovingFocusGroup root; RadioGroup is one). Focusable is not "its own control":
    // the root holds controls, so the run neither roves it nor claims its arrows.
    // RED before the held-control clause: the run took the root for a seat, wrote its
    // tabindex, and moved ArrowRight on the focused radio to the next seat.
    function dockWithDirectComposite() {
        return mount(GlassDock, {
            props: { collapse: "open" as const },
            slots: {
                default: () => [
                    h("button", { "data-seat": "0" }, "a"),
                    h(
                        RadioGroup,
                        { modelValue: "x", orientation: "horizontal", "data-seat": "g" },
                        () => [
                            h(RadioGroupItem, { value: "x", "data-item": "x", "aria-label": "X" }),
                            h(RadioGroupItem, { value: "y", "data-item": "y", "aria-label": "Y" }),
                        ],
                    ),
                    h("button", { "data-seat": "2" }, "b"),
                ],
            },
            attachTo: document.body,
        });
    }

    it("a composite root seated directly is not roved, and its arrows stay its own", async () => {
        const w = dockWithDirectComposite();
        await nextTick();
        await nextTick();
        // The run's one stop is on a seat that is its own control, never the group.
        const seat0 = w.get('[data-seat="0"]').element as HTMLElement;
        const seat2 = w.get('[data-seat="2"]').element as HTMLElement;
        expect([seat0.tabIndex, seat2.tabIndex].sort()).toEqual([-1, 0]);
        // The group's own roving answers the arrow after the bubble, so the final
        // activeElement alone cannot tell a claimed key from an unclaimed one: the
        // witness is that the next seat never took focus at all.
        let stolen = 0;
        seat2.addEventListener("focus", () => stolen++);
        const radio = w.get('[data-item="x"]').element as HTMLElement;
        radio.focus();
        await w.get('[data-item="x"]').trigger("keydown", { key: "ArrowRight" });
        await nextTick();
        expect(stolen).toBe(0);
        expect(w.get('[data-seat="g"]').element.contains(document.activeElement)).toBe(true);
        w.unmount();
    });

    it("arrows from a roved seat skip a directly seated composite", async () => {
        const w = dockWithDirectComposite();
        await nextTick();
        const seat0 = w.get('[data-seat="0"]').element as HTMLElement;
        seat0.focus();
        await w.get('[data-seat="0"]').trigger("keydown", { key: "ArrowRight" });
        await nextTick();
        expect(document.activeElement?.getAttribute("data-seat")).toBe("2");
        w.unmount();
    });
});
