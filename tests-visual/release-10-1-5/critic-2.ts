// glass-ui 10.1.5 — critic round 2's probe harness. One page, one scene per `?scene=`,
// the real library components from `src/` under the demo's own cascade. Reads only.
import "../../demo/demo.css";
import { createApp, defineComponent, h, ref, type Component } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockSeparator from "../../src/components/dock/DockSeparator.vue";
import DockTrigger from "../../src/components/dock/DockTrigger.vue";
import DockLayer from "../../src/components/dock/DockLayer.vue";
import DockLayerGroup from "../../src/components/dock/DockLayerGroup.vue";
import Slider from "../../src/components/slider/Slider.vue";
import Input from "../../src/components/input/Input.vue";
import Textarea from "../../src/components/textarea/Textarea.vue";
import CardDescription from "../../src/components/card/CardDescription.vue";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "../../src/components/menu";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;
if (params.get("dir")) document.documentElement.dir = params.get("dir")!;

const glyph = () =>
    h("svg", { viewBox: "0 0 24 24", width: 24, height: 24, "aria-hidden": "true" }, [
        h("circle", { cx: 12, cy: 12, r: 8, fill: "none", stroke: "currentColor", "stroke-width": 2 }),
    ]);

/** `?kinds=` a comma list: `icon`, `tab:<label>`, `menu`, `sep`. */
function seats(): unknown[] {
    const kinds = (params.get("kinds") ?? "menu,sep,icon,icon,icon").split(",");
    let i = 0;
    return kinds.map((k) => {
        i += 1;
        const id = `S${i}`;
        if (k === "sep") return h(DockSeparator);
        if (k === "menu")
            return h(DropdownMenu, { modal: false }, () => [
                h(DockTrigger, { for: "dropdown", "aria-label": "Menu", "data-witness": id }, () => [
                    glyph(),
                    h("span", "Home"),
                ]),
                h(DropdownMenuContent, () => [h(DropdownMenuItem, () => "Home")]),
            ]);
        if (k.startsWith("tab:"))
            return h(DockControl, { shape: "tab", "data-witness": id }, () => [glyph(), h("span", k.slice(4))]);
        return h(DockControl, { "aria-label": id, "data-witness": id }, glyph);
    });
}

function collapseProp(): false | "open" | "closed" {
    const c = params.get("collapse");
    return c === "open" || c === "closed" ? c : false;
}

const scenes: Record<string, Component> = {
    dock: defineComponent(() => {
        const orientation = (params.get("orientation") ?? "horizontal") as "horizontal" | "vertical";
        const persistent = params.get("persistent") === "1";
        return () =>
            h(
                "div",
                {
                    style:
                        orientation === "vertical"
                            ? "display:flex;padding:16px;block-size:" + (params.get("stageH") ?? "600") + "px"
                            : "display:flex;justify-content:center;align-items:flex-start;padding:16px 0;min-block-size:240px",
                },
                [
                    h(
                        GlassDock,
                        {
                            fitContent: params.get("fit") !== "0",
                            collapse: collapseProp(),
                            orientation,
                            style: params.get("maxw") ? `max-inline-size:${params.get("maxw")}px` : undefined,
                            ref: (dock: unknown) => {
                                w.__dock = dock;
                            },
                        },
                        {
                            default: () => seats(),
                            collapsed: () =>
                                params.get("summary") === "tab"
                                    ? h(DockControl, { shape: "tab", "data-witness": "summary" }, () => [glyph(), h("span", "Home")])
                                    : h("span", { "data-witness": "summary" }, glyph()),
                            ...(persistent
                                ? {
                                      persistent: () => h(DockControl, { "aria-label": "Lead", "data-witness": "lead" }, glyph),
                                      "persistent-end": () =>
                                          h(DockControl, { "aria-label": "Tail", "data-witness": "tail" }, glyph),
                                  }
                                : {}),
                        },
                    ),
                ],
            );
    }),

    layers: defineComponent(() => {
        const active = ref(params.get("layer") ?? "actions");
        w.__layer = active;
        return () =>
            h("div", { style: "display:flex;justify-content:center;align-items:flex-start;padding:16px 0;min-block-size:240px" }, [
                h(
                    GlassDock,
                    { fitContent: true, collapse: collapseProp() },
                    {
                        default: () =>
                            h(
                                DockLayerGroup,
                                { active: active.value, "onUpdate:active": (v: string) => (active.value = v), showSwitcher: false },
                                () => [
                                    h(DockLayer, { id: "actions", label: "Actions" }, () => [
                                        h(DockControl, { shape: "tab", "data-witness": "L1" }, () => [glyph(), h("span", "Home")]),
                                        h(DockControl, { "aria-label": "Share", "data-witness": "L2" }, glyph),
                                        h(DockControl, { "aria-label": "Input", "data-witness": "L3" }, glyph),
                                    ]),
                                    h(DockLayer, { id: "input", label: "Input" }, () => [
                                        h(DockControl, { "aria-label": "Back", "data-witness": "I1" }, glyph),
                                        h("div", { class: "dock-search-field" }, [
                                            h("label", { class: "input-bar" }, [
                                                h("input", { class: "input-bar-field", "aria-label": "Colour", value: "oklch(73% 0.2 2)", "data-witness": "I2" }),
                                            ]),
                                        ]),
                                    ]),
                                ],
                            ),
                        collapsed: () => h("span", { "data-witness": "summary" }, glyph()),
                    },
                ),
            ]);
    }),

    slider: defineComponent(() => {
        const one = ref([50]);
        const two = ref([20, 80]);
        w.__one = one;
        return () =>
            h("div", [
                h("div", { "data-witness": "drag", style: "padding:24px;inline-size:320px" }, [
                    h(Slider, { modelValue: one.value, "onUpdate:modelValue": (v: number[]) => (one.value = v), min: 0, max: 100, "aria-label": "drag" }),
                ]),
                h("div", { "data-witness": "drag-v", style: "padding:24px;block-size:200px;display:inline-flex" }, [
                    h(Slider, { modelValue: [50], min: 0, max: 100, orientation: "vertical", "aria-label": "drag-v" }),
                ]),
                h("div", { "data-witness": "two", style: "padding:24px;inline-size:320px" }, [
                    h(Slider, { modelValue: two.value, "onUpdate:modelValue": (v: number[]) => (two.value = v), min: 0, max: 100, "aria-label": "two" }),
                ]),
                ...["sm", "md", "lg"].flatMap((size) =>
                    [0, 100].map((v) =>
                        h("div", { "data-witness": `${size}-${v}`, style: "padding:12px 24px;inline-size:320px" }, [
                            h(Slider, { modelValue: [v], min: 0, max: 100, size, "aria-label": `${size}-${v}` }),
                        ]),
                    ),
                ),
                // A step that does not divide the range: max is unreachable by steps.
                h("div", { "data-witness": "step-odd", style: "padding:12px 24px;inline-size:320px" }, [
                    h(Slider, { modelValue: [9], min: 0, max: 10, step: 3, "aria-label": "step-odd" }),
                ]),
            ]);
    }),

    fields: defineComponent(
        () => () =>
            h("div", { style: "padding:16px;display:grid;gap:12px" }, [
                h(CardDescription, { "data-witness": "subtitle" }, () => "Pane subtitle"),
                h("label", { class: "input-bar", "data-witness": "bar" }, [
                    h("input", { class: "input-bar-field", "aria-label": "Search", placeholder: "Search" }),
                ]),
                h(Input, { "data-witness": "input", "aria-label": "Name", placeholder: "Name" }),
                h(Textarea, { "data-witness": "textarea", "aria-label": "Notes", placeholder: "Notes" }),
                h("div", { class: "input-pill", "data-witness": "pill", tabindex: 0 }, "Pill"),
            ]),
    ),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(Scene).mount("#app");
w.__ready = true;
