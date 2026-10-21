// 10.1.2 · atlas G-3/G-4, arm (b-ii) — THE DECLARED SEAT MARKER (INBOUND O-102d).
// The run roves only the children that declare themselves a seat with
// `data-glass-dock-seat`, which glass's seat primitives (DockControl, DockTrigger) set.
// Every other child keeps its natural tab stop and its own keys; the run writes into
// nothing it was not told is a seat. `role="toolbar"` is claimed only by a run whose
// every child is a declared seat, glass's DockSeparator (a toolbar holds separators) and
// reka's form `<select aria-hidden="true" tabindex="-1">` beside a named Select's trigger
// aside.
//
// RED on 10.1.1, which inferred a seat from focusability: a plain button, a reka trigger
// and a `[role=button][tabindex]` handle seated in the run were roved and written to −1,
// so atlas's filter trigger, gear, provenance handle and dark toggle left the Tab order,
// and the run claimed `role="toolbar"` over every run whatever it held.
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h, nextTick } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockControl from "@glass/components/dock/DockControl.vue";
import DockSeparator from "@glass/components/dock/DockSeparator.vue";
import DockTrigger from "@glass/components/dock/DockTrigger.vue";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import { Popover, PopoverTrigger } from "@glass/components/popover";
import { RadioGroup, RadioGroupItem } from "@glass/components/radio-group";
import { Select } from "@glass/components/select";
import ToggleGroup from "@glass/components/toggle-group/ToggleGroup.vue";
import ToggleGroupItem from "@glass/components/toggle-group/ToggleGroupItem.vue";

const SEAT = "data-glass-dock-seat";

function dock(seats: () => unknown[]) {
    return mount(GlassDock, {
        props: { collapse: "open" as const },
        slots: { default: seats },
        attachTo: document.body,
    });
}

async function settle(): Promise<void> {
    await nextTick();
    await nextTick();
}

/**
 * The atlas shapes that lost Tab order on 10.1.0/10.1.1, each seated directly in the run
 * between two declared seats (the year-range pair too: 10.1.1 left a wrapped pair alone).
 */
function atlasRun() {
    return dock(() => [
        h(DockControl, { "aria-label": "Play", "data-witness": "seat-0" }, () => "A"),
        h(Popover, () =>
            h(PopoverTrigger, { "aria-label": "Filter", "data-witness": "filter" }, () => "F"),
        ),
        h("button", { type: "button", "aria-label": "Settings", "data-witness": "gear" }, "G"),
        h("div", { role: "button", tabindex: "0", "aria-label": "Provenance", "data-witness": "handle" }),
        h("input", { type: "number", "aria-label": "From", "data-witness": "year-from" }),
        h("input", { type: "number", "aria-label": "To", "data-witness": "year-to" }),
        h(DarkModeToggle, { "data-witness": "dark" }),
        h(DockControl, { "aria-label": "Last", "data-witness": "seat-9" }, () => "B"),
    ]);
}

const UNDECLARED = ["filter", "gear", "handle", "year-from", "year-to", "dark"] as const;

describe("dock run · the declared seat marker (b-ii)", () => {
    it("glass's seat primitives declare themselves", async () => {
        const w = dock(() => [
            h(DockControl, { "aria-label": "A", "data-witness": "control" }),
            h(Popover, () => h(DockTrigger, { for: "popover", "aria-label": "T", "data-witness": "trigger" })),
        ]);
        await settle();
        expect(w.get('[data-witness="control"]').attributes()).toHaveProperty(SEAT);
        expect(w.get('[data-witness="trigger"]').attributes()).toHaveProperty(SEAT);
        w.unmount();
    });

    it("every undeclared control keeps its natural tab stop", async () => {
        const w = atlasRun();
        await settle();
        for (const name of UNDECLARED) {
            const el = w.get(`[data-witness="${name}"]`).element as HTMLElement;
            expect(el.tabIndex, name).toBe(0);
        }
        // The declared seats share one stop.
        const s0 = w.get('[data-witness="seat-0"]').element as HTMLElement;
        const s9 = w.get('[data-witness="seat-9"]').element as HTMLElement;
        expect([s0.tabIndex, s9.tabIndex]).toEqual([0, -1]);
        w.unmount();
    });

    it("arrows rove only the declared seats", async () => {
        const w = atlasRun();
        await settle();
        (w.get('[data-witness="seat-0"]').element as HTMLElement).focus();
        await w.get('[data-witness="seat-0"]').trigger("keydown", { key: "ArrowRight" });
        await nextTick();
        expect(document.activeElement?.getAttribute("data-witness")).toBe("seat-9");
        await w.get('[data-witness="seat-9"]').trigger("keydown", { key: "Home" });
        await nextTick();
        expect(document.activeElement?.getAttribute("data-witness")).toBe("seat-0");
        w.unmount();
    });

    it("a key pressed in an undeclared control is its own", async () => {
        const w = atlasRun();
        await settle();
        for (const name of ["gear", "handle", "dark"] as const) {
            const el = w.get(`[data-witness="${name}"]`);
            (el.element as HTMLElement).focus();
            const ev = new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true });
            el.element.dispatchEvent(ev);
            await nextTick();
            expect(ev.defaultPrevented, name).toBe(false);
            expect(document.activeElement, name).toBe(el.element);
        }
        w.unmount();
    });

    it("a run with any undeclared child claims no toolbar role", async () => {
        const w = atlasRun();
        await settle();
        const run = w.get(".dock-run");
        expect(run.attributes("role")).toBeUndefined();
        expect(run.attributes("aria-orientation")).toBeUndefined();
        w.unmount();
    });

    it("an all-declared run is a toolbar, separators included", async () => {
        const w = dock(() => [
            h(DockControl, { "aria-label": "A" }),
            h(DockSeparator),
            h(Popover, () => h(DockTrigger, { for: "popover", "aria-label": "T" })),
        ]);
        await settle();
        const run = w.get(".dock-run");
        expect(run.attributes("role")).toBe("toolbar");
        expect(run.attributes("aria-orientation")).toBe("horizontal");
        w.unmount();
    });

    // A consumer's focusable splitter is a `role="separator"` child that is not glass's
    // `<DockSeparator>`: undeclared, so it keeps its stop and voids the claim.
    it("a focusable splitter is undeclared: its own stop, and no toolbar role", async () => {
        const w = dock(() => [
            h(DockControl, { "aria-label": "A", "data-witness": "seat-0" }),
            h("div", {
                role: "separator",
                tabindex: "0",
                "aria-valuenow": "50",
                "aria-label": "Resize",
                "data-witness": "splitter",
            }),
            h(DockControl, { "aria-label": "B", "data-witness": "seat-2" }),
        ]);
        await settle();
        expect((w.get('[data-witness="splitter"]').element as HTMLElement).tabIndex).toBe(0);
        const run = w.get(".dock-run");
        expect(run.attributes("role")).toBeUndefined();
        expect(run.attributes("aria-orientation")).toBeUndefined();
        w.unmount();
    });

    // reka's Select, given a `name` inside a `<form>`, renders its native `<select>`
    // (`aria-hidden="true" tabindex="-1"`) beside the trigger, so it is a child of the
    // run. Nobody reaches it, so it does not void the claim. RED on the first three 10.1.2
    // cuts, which counted it as an undeclared child (role=null); green on 10.1.1, which
    // claimed the role over every run.
    it("a DockTrigger for=select in a form keeps the toolbar claim of a declared run", async () => {
        const w = mount(
            () =>
                h("form", [
                    h(GlassDock, { collapse: "open" }, () => [
                        h(DockControl, { "aria-label": "A", "data-witness": "seat-0" }),
                        h(Select, { name: "unit", modelValue: "s" }, () =>
                            h(DockTrigger, { for: "select", "aria-label": "Unit", "data-witness": "seat-1" }, () => "s"),
                        ),
                        h(DockSeparator),
                        h(DockControl, { "aria-label": "B", "data-witness": "seat-3" }),
                    ]),
                ]),
            { attachTo: document.body },
        );
        await settle();
        await new Promise((r) => setTimeout(r));
        await settle();
        const run = w.get(".dock-run");
        const bubble = run.element.querySelector(":scope > select");
        expect(bubble?.getAttribute("aria-hidden")).toBe("true");
        expect(run.attributes("role")).toBe("toolbar");
        (w.get('[data-witness="seat-0"]').element as HTMLElement).focus();
        await w.get('[data-witness="seat-0"]').trigger("keydown", { key: "ArrowRight" });
        await nextTick();
        expect(document.activeElement?.getAttribute("data-witness")).toBe("seat-1");
        w.unmount();
    });

    // `aria-hidden` alone is not inert: a child that still takes Tab is undeclared.
    it("an aria-hidden child that still takes Tab voids the claim", async () => {
        const w = dock(() => [
            h(DockControl, { "aria-label": "A" }),
            h("button", { type: "button", "aria-hidden": "true", "data-witness": "hidden" }, "H"),
        ]);
        await settle();
        expect((w.get('[data-witness="hidden"]').element as HTMLElement).tabIndex).toBe(0);
        expect(w.get(".dock-run").attributes("role")).toBeUndefined();
        w.unmount();
    });

    // The waiver is reka's exact shape, not "aria-hidden and a negative tabIndex": a
    // non-focusable wrapper reads tabIndex −1, so that test waived an `aria-hidden` div
    // whose button still takes Tab. RED on 10.1.1 (the role over every run) and on the
    // fourth 10.1.2 cut (critique-4 D-1).
    it("an aria-hidden wrapper around a Tab stop voids the claim", async () => {
        const w = dock(() => [
            h(DockControl, { "aria-label": "A" }),
            h("div", { "aria-hidden": "true" }, [
                h("button", { type: "button", "data-witness": "hid" }, "H"),
            ]),
            h(DockControl, { "aria-label": "B" }),
        ]);
        await settle();
        expect((w.get('[data-witness="hid"]').element as HTMLElement).tabIndex).toBe(0);
        expect(w.get(".dock-run").attributes("role")).toBeUndefined();
        w.unmount();
    });

    // The claim reads a direct child's `aria-hidden` and `tabindex` (the form-select
    // shape), so a change to either in place re-derives it. RED on 10.1.1 and on the
    // fourth 10.1.2 cut, which observed neither (critique-4 D-2).
    it("the toolbar claim follows a child's aria-hidden and tabindex changed in place", async () => {
        const w = dock(() => [
            h(DockControl, { "aria-label": "A" }),
            h("select", { "aria-hidden": "true", tabindex: "-1", "data-witness": "native" }, [
                h("option", { value: "s" }, "s"),
            ]),
            h(DockControl, { "aria-label": "B" }),
        ]);
        await settle();
        const run = w.get(".dock-run");
        expect(run.attributes("role")).toBe("toolbar");
        const native = w.get('[data-witness="native"]').element as HTMLElement;
        native.removeAttribute("aria-hidden");
        native.removeAttribute("tabindex");
        await new Promise((r) => setTimeout(r));
        await settle();
        expect(native.tabIndex).toBe(0);
        expect(run.attributes("role")).toBeUndefined();
        w.unmount();
    });

    it("the toolbar claim follows the children as they change", async () => {
        const extra = { on: false };
        const w = mount(
            {
                data: () => extra,
                render() {
                    return h(GlassDock, { collapse: "open" }, () => [
                        h(DockControl, { "aria-label": "A" }),
                        (this as unknown as { on: boolean }).on ? h("button", "plain") : null,
                    ]);
                },
            },
            { attachTo: document.body },
        );
        await settle();
        expect(w.get(".dock-run").attributes("role")).toBe("toolbar");
        (w.vm as unknown as { on: boolean }).on = true;
        await settle();
        await new Promise((r) => setTimeout(r));
        await settle();
        expect(w.get(".dock-run").attributes("role")).toBeUndefined();
        w.unmount();
    });

    // A seat whose declaration is reactive: the run wrote −1 into it while it was declared,
    // and once the marker is gone that write must go with it. RED before the release:
    // the button kept tabindex=-1 and left the Tab order.
    for (const [label, authored] of [
        ["a button with no authored tabindex", null],
        ["a [role=button] handle with an authored tabindex", "0"],
    ] as const) {
        it(`a child that drops its declaration gets its own tab stop back (${label})`, async () => {
            const state = { declared: true };
            const w = mount(
                {
                    data: () => state,
                    render() {
                        const declared = (this as unknown as { declared: boolean }).declared;
                        const attrs: Record<string, unknown> = { "data-witness": "middle", "aria-label": "M" };
                        if (declared) attrs[SEAT] = "";
                        if (authored !== null) {
                            attrs.role = "button";
                            attrs.tabindex = authored;
                        }
                        return h(GlassDock, { collapse: "open" }, () => [
                            h(DockControl, { "aria-label": "A", "data-witness": "seat-0" }),
                            authored === null ? h("button", attrs, "M") : h("div", attrs),
                            h(DockControl, { "aria-label": "B", "data-witness": "seat-2" }),
                        ]);
                    },
                },
                { attachTo: document.body },
            );
            await settle();
            const middle = w.get('[data-witness="middle"]').element as HTMLElement;
            expect(middle.getAttribute("tabindex")).toBe("-1");
            expect(w.get(".dock-run").attributes("role")).toBe("toolbar");

            (w.vm as unknown as { declared: boolean }).declared = false;
            await settle();
            await new Promise((r) => setTimeout(r));
            await settle();

            expect(w.get('[data-witness="middle"]').element).toBe(middle);
            expect(middle.getAttribute("tabindex")).toBe(authored);
            expect(middle.tabIndex).toBe(0);
            expect(w.get(".dock-run").attributes("role")).toBeUndefined();
            w.unmount();
        });
    }

    it("a composite nested in an undeclared container keeps its one tab stop and its arrows", async () => {
        const w = dock(() => [
            h(DockControl, { "aria-label": "A", "data-witness": "seat-0" }),
            h("div", { "data-witness": "container" }, [
                h(ToggleGroup, { type: "single", modelValue: "x" }, () => [
                    h(ToggleGroupItem, { value: "x", "data-item": "x" }, () => "X"),
                    h(ToggleGroupItem, { value: "y", "data-item": "y" }, () => "Y"),
                ]),
                h("button", { "data-inner": "" }, "inner"),
            ]),
            h(DockControl, { "aria-label": "B", "data-witness": "seat-2" }),
        ]);
        await settle();
        const stops = w.findAll("[data-item]").filter((i) => i.attributes("tabindex") === "0");
        expect(stops.map((s) => s.attributes("data-item"))).toEqual(["x"]);
        expect(w.get("[data-inner]").attributes("tabindex")).toBeUndefined();
        const inner = w.get("[data-inner]").element as HTMLElement;
        inner.focus();
        await w.get("[data-inner]").trigger("keydown", { key: "ArrowRight" });
        await nextTick();
        expect(document.activeElement).toBe(inner);
        w.unmount();
    });

    // A composite root seated DIRECTLY in the run is undeclared: the run neither roves it
    // nor claims its arrows, whatever `tabindex` its reka root renders.
    for (const [label, composite] of [
        [
            "RadioGroup",
            () =>
                h(RadioGroup, { modelValue: "x", orientation: "horizontal", "data-witness": "group" }, () => [
                    h(RadioGroupItem, { value: "x", "data-item": "x", "aria-label": "X" }),
                    h(RadioGroupItem, { value: "y", "data-item": "y", "aria-label": "Y" }),
                ]),
        ],
        [
            "ToggleGroup",
            () =>
                h(ToggleGroup, { type: "single", modelValue: "x", "data-witness": "group" }, () => [
                    h(ToggleGroupItem, { value: "x", "data-item": "x" }, () => "X"),
                    h(ToggleGroupItem, { value: "y", "data-item": "y" }, () => "Y"),
                ]),
        ],
    ] as const) {
        it(`a ${label} seated directly keeps its arrows, and the run's arrows skip it`, async () => {
            const w = dock(() => [
                h(DockControl, { "aria-label": "A", "data-witness": "seat-0" }),
                composite(),
                h(DockControl, { "aria-label": "B", "data-witness": "seat-2" }),
            ]);
            await settle();
            const seat2 = w.get('[data-witness="seat-2"]').element as HTMLElement;
            let stolen = 0;
            seat2.addEventListener("focus", () => stolen++);
            const item = w.get('[data-item="x"]');
            (item.element as HTMLElement).focus();
            await item.trigger("keydown", { key: "ArrowRight" });
            await nextTick();
            expect(stolen).toBe(0);
            expect(w.get('[data-witness="group"]').element.contains(document.activeElement)).toBe(true);
            (w.get('[data-witness="seat-0"]').element as HTMLElement).focus();
            await w.get('[data-witness="seat-0"]').trigger("keydown", { key: "ArrowRight" });
            await nextTick();
            expect(document.activeElement).toBe(seat2);
            w.unmount();
        });
    }
});
