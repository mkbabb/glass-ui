// glass-ui 10.1.2 — the engine witnesses' harness for the declared seat marker (atlas
// G-4, arm b-ii; INBOUND O-102d). One page, one scene per `?scene=`, the real library
// components from `src/` under the demo's own cascade. Imports are relative to `src/`,
// so the same file mounts unchanged on a 10.1.1 tree: that is how each witness is shown
// RED on 10.1.1 and GREEN on 10.1.2.
import "../../demo/demo.css";
import { createApp, defineComponent, h, ref, type Component } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockSeparator from "../../src/components/dock/DockSeparator.vue";
import DockTrigger from "../../src/components/dock/DockTrigger.vue";
import { DarkModeToggle } from "../../src/components/dark-mode-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../../src/components/popover";
import { RadioGroup, RadioGroupItem } from "../../src/components/radio-group";
import ToggleGroup from "../../src/components/toggle-group/ToggleGroup.vue";
import ToggleGroupItem from "../../src/components/toggle-group/ToggleGroupItem.vue";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;

/** A focusable stop before and after a dock pinned to the bottom of the viewport. */
function page(seats: () => unknown[]) {
    return h("div", { style: "padding:24px" }, [
        h("button", { type: "button", "data-witness": "before" }, "before"),
        h(
            "div",
            {
                style: "position:fixed;inset-inline:0;bottom:16px;display:flex;justify-content:center;z-index:var(--z-dock)",
            },
            h(GlassDock, { collapse: false }, seats),
        ),
        h("button", { type: "button", "data-witness": "after", style: "margin-top:24px" }, "after"),
    ]);
}

const scenes: Record<string, Component> = {
    // The atlas shapes that lost Tab order (addendum 1, G-4 census), seated directly in
    // a run between two declared seats: a filter trigger, a gear button, a provenance
    // handle, a year-range input pair and a dark toggle.
    atlas: defineComponent(() => () =>
        page(() => [
            h(DockControl, { "aria-label": "Play", "data-witness": "seat-0" }, () => "A"),
            h(Popover, () => [
                h(PopoverTrigger, { "aria-label": "Filter", "data-witness": "filter" }, () => "F"),
                h(PopoverContent, { side: "top", "aria-label": "Filter" }, () => "filters"),
            ]),
            h("button", { type: "button", "aria-label": "Settings", "data-witness": "gear" }, "G"),
            h("div", {
                role: "button",
                tabindex: "0",
                "aria-label": "Provenance",
                "data-witness": "handle",
                style: "inline-size:24px;block-size:24px",
            }),
            h("div", { "data-witness": "year-range", style: "display:flex;gap:4px" }, [
                h("input", { type: "number", value: 2019, "aria-label": "From", "data-witness": "year-from", style: "inline-size:5ch" }),
                h("input", { type: "number", value: 2024, "aria-label": "To", "data-witness": "year-to", style: "inline-size:5ch" }),
            ]),
            h(DarkModeToggle, { "data-witness": "dark" }),
            h(DockControl, { "aria-label": "Last", "data-witness": "seat-9" }, () => "B"),
        ]),
    ),

    // A run of glass's own seat primitives only, a separator among them.
    declared: defineComponent(() => () =>
        page(() => [
            h(DockControl, { "aria-label": "Play", "data-witness": "seat-0" }, () => "A"),
            h(DockSeparator),
            h(Popover, () => [
                h(DockTrigger, { for: "popover", "aria-label": "Time", "data-witness": "seat-1" }, () => "T"),
                h(PopoverContent, { side: "top", "aria-label": "Time" }, () => "0.42 s"),
            ]),
            h(DockControl, { "aria-label": "Last", "data-witness": "seat-2" }, () => "B"),
        ]),
    ),

    // A consumer seat whose declaration is reactive: a button declared between two
    // DockControls, undeclared by `window.__undeclare()` while it stays mounted.
    reactive: defineComponent(() => {
        const declared = ref(true);
        w.__undeclare = () => (declared.value = false);
        return () =>
            page(() => [
                h(DockControl, { "aria-label": "Play", "data-witness": "seat-0" }, () => "A"),
                h(
                    "button",
                    {
                        type: "button",
                        "aria-label": "Middle",
                        "data-witness": "middle",
                        ...(declared.value ? { "data-glass-dock-seat": "" } : {}),
                    },
                    "M",
                ),
                h(DockControl, { "aria-label": "Last", "data-witness": "seat-2" }, () => "B"),
            ]);
    }),

    // RadioGroup and ToggleGroup seated directly, between two declared seats.
    composites: defineComponent(() => {
        const radio = ref("x");
        const toggle = ref("x");
        return () =>
            page(() => [
                h(DockControl, { "aria-label": "Play", "data-witness": "seat-0" }, () => "A"),
                h(
                    RadioGroup,
                    {
                        modelValue: radio.value,
                        "onUpdate:modelValue": (v: string) => (radio.value = v),
                        orientation: "horizontal",
                        "aria-label": "Radio",
                        "data-witness": "radio",
                        style: "display:flex;gap:8px",
                    },
                    () => [
                        h(RadioGroupItem, { value: "x", "data-item": "radio-x", "aria-label": "X" }),
                        h(RadioGroupItem, { value: "y", "data-item": "radio-y", "aria-label": "Y" }),
                    ],
                ),
                h(
                    ToggleGroup,
                    {
                        type: "single",
                        modelValue: toggle.value,
                        "onUpdate:modelValue": (v: string) => (toggle.value = v),
                        "aria-label": "Toggle",
                        "data-witness": "toggle",
                    },
                    () => [
                        h(ToggleGroupItem, { value: "x", "data-item": "toggle-x" }, () => "X"),
                        h(ToggleGroupItem, { value: "y", "data-item": "toggle-y" }, () => "Y"),
                    ],
                ),
                h(DockControl, { "aria-label": "Last", "data-witness": "seat-9" }, () => "B"),
            ]);
    }),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(Scene).mount("#app");
w.__ready = true;
