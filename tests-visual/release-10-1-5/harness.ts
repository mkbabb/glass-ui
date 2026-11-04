// glass-ui 10.1.5 — the engine witnesses' harness for value.js's served-app review
// (INBOUND O-129 rows 1, 2, 5, 6 and 7). One page, one scene per `?scene=`, the real
// library components from `src/` under the demo's own cascade. Imports are relative to
// `src/`, so the same file mounts unchanged on a v10.1.4 tree: that is how each witness
// is shown RED on 10.1.4 and GREEN on 10.1.5.
import "../../demo/demo.css";
import { createApp, defineComponent, h, ref, type Component } from "vue";
import { Compass } from "@lucide/vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockSeparator from "../../src/components/dock/DockSeparator.vue";
import DockTrigger from "../../src/components/dock/DockTrigger.vue";
import DockLayer from "../../src/components/dock/DockLayer.vue";
import DockLayerGroup from "../../src/components/dock/DockLayerGroup.vue";
import Slider from "../../src/components/slider/Slider.vue";
import Input from "../../src/components/input/Input.vue";
import Button from "../../src/components/button/Button.vue";
import CardDescription from "../../src/components/card/CardDescription.vue";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "../../src/components/menu";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;

/** A 24px glyph, as a consumer's icon component renders one inside its control. */
const glyph = () =>
    h("svg", { viewBox: "0 0 24 24", width: 24, height: 24, "aria-hidden": "true" }, [
        h("circle", {
            cx: 12,
            cy: 12,
            r: 8,
            fill: "none",
            stroke: "currentColor",
            "stroke-width": 2,
        }),
    ]);

const seat = (label: string) => h(DockControl, { "aria-label": label, "data-witness": label }, glyph);

/** `?collapse=false|open|closed` → the dock's `collapse` prop. */
function collapseProp(): false | "open" | "closed" {
    const c = params.get("collapse");
    return c === "open" || c === "closed" ? c : false;
}

const stage = (child: unknown) =>
    h(
        "div",
        {
            "data-witness": "stage",
            style: "display:flex;justify-content:center;align-items:flex-start;padding:16px 0;min-block-size:240px",
        },
        [child],
    );

const scenes: Record<string, Component> = {
    // value.js's app dock (color.babb.dev `AppDock`): a fit-content pill of a menu
    // trigger and a few seats. `?collapse=` sets the posture (`false`, the value mobile
    // dock, is the default); `?seats=` the seat count (default 3).
    dock: defineComponent(() => {
        const n = Number(params.get("seats") ?? 3);
        return () =>
            stage(
                h(
                    GlassDock,
                    {
                        fitContent: true,
                        collapse: collapseProp(),
                        ref: (dock: unknown) => {
                            w.__dock = dock;
                        },
                    },
                    {
                        default: () => [
                            h(DropdownMenu, { modal: false }, () => [
                                h(DockTrigger, { for: "dropdown", "aria-label": "Menu" }, () => [
                                    glyph(),
                                    h("span", "Menu"),
                                ]),
                                h(DropdownMenuContent, () => [h(DropdownMenuItem, () => "Home")]),
                            ]),
                            h(DockSeparator),
                            ...Array.from({ length: n }, (_, i) => seat(`Seat ${i + 1}`)),
                        ],
                        collapsed: () => h("span", { "data-witness": "summary" }, glyph()),
                    },
                ),
            );
    }),

    // Critique round 2: a dock of mixed seats. `?kinds=` a comma list of `icon` and
    // `tab:<label>` (each seat `data-witness="S<i>"`), `?persistent=1` adds a seat in each
    // persistent region (`lead`, `tail`), `?orientation=vertical` a vertical dock in a
    // `?stageH=` tall column, `?maxw=` a max inline size and `?fit=0` drops fitContent.
    seats: defineComponent(() => {
        const orientation = (params.get("orientation") ?? "horizontal") as "horizontal" | "vertical";
        const kinds = (params.get("kinds") ?? "icon,icon,icon").split(",");
        const persistent = params.get("persistent") === "1";
        return () =>
            h(
                "div",
                {
                    "data-witness": "stage",
                    style:
                        orientation === "vertical"
                            ? `display:flex;padding:16px;block-size:${params.get("stageH") ?? "600"}px`
                            : "display:flex;justify-content:center;align-items:flex-start;padding:16px 0;min-block-size:240px",
                },
                [
                    h(
                        GlassDock,
                        {
                            fitContent: params.get("fit") !== "0",
                            collapse: false,
                            orientation,
                            style: params.get("maxw") ? `max-inline-size:${params.get("maxw")}px` : undefined,
                        },
                        {
                            default: () =>
                                kinds.map((k, i) =>
                                    k.startsWith("tab:")
                                        ? h(DockControl, { shape: "tab", "data-witness": `S${i + 1}` }, () => [
                                              glyph(),
                                              h("span", k.slice(4)),
                                          ])
                                        : h(DockControl, { "aria-label": `S${i + 1}`, "data-witness": `S${i + 1}` }, glyph),
                                ),
                            collapsed: () => h("span", glyph()),
                            ...(persistent
                                ? {
                                      persistent: () =>
                                          h(DockControl, { "aria-label": "Lead", "data-witness": "lead" }, glyph),
                                      "persistent-end": () =>
                                          h(DockControl, { "aria-label": "Tail", "data-witness": "tail" }, glyph),
                                  }
                                : {}),
                        },
                    ),
                ],
            );
    }),

    // A dock whose run is a DockLayerGroup: an action layer of seats and an INPUT layer
    // (value's colour input: a `.dock-search-field` holding an `.input-bar`). The active
    // layer is `window.__layer` (a ref), so a witness can step through every layer.
    layers: defineComponent(() => {
        const active = ref(params.get("layer") ?? "actions");
        w.__layer = active;
        return () =>
            stage(
                h(
                    GlassDock,
                    { fitContent: true, collapse: collapseProp() },
                    {
                        default: () =>
                            h(
                                DockLayerGroup,
                                {
                                    active: active.value,
                                    "onUpdate:active": (v: string) => (active.value = v),
                                    showSwitcher: false,
                                },
                                () => [
                                    h(DockLayer, { id: "actions", label: "Actions" }, () => [
                                        seat("Copy"),
                                        seat("Share"),
                                        h(DockSeparator),
                                        seat("Input"),
                                    ]),
                                    h(DockLayer, { id: "input", label: "Input" }, () => [
                                        seat("Back"),
                                        h("div", { class: "dock-search-field" }, [
                                            h("label", { class: "input-bar" }, [
                                                h("input", {
                                                    class: "input-bar-field",
                                                    "aria-label": "Colour",
                                                    value: "oklch(73% 0.2 2)",
                                                }),
                                            ]),
                                        ]),
                                    ]),
                                ],
                            ),
                        collapsed: () => h("span", { "data-witness": "summary" }, glyph()),
                    },
                ),
            );
    }),

    // The integrated-thumb scrubber at min, mid and max (fourier /morph 'Morph'
    // 50..800 at 50; value's Atmosphere 'Zones' 6/6 at max), and the same three inverted.
    slider: defineComponent(() => {
        const row = (id: string, value: number, min: number, max: number, extra = {}) =>
            h("div", { "data-witness": id, style: "padding:12px 24px;inline-size:320px" }, [
                h(Slider, {
                    modelValue: [value],
                    min,
                    max,
                    "aria-label": id,
                    ...extra,
                }),
            ]);
        return () =>
            h("div", [
                row("min", 50, 50, 800),
                row("mid", 425, 50, 800),
                row("max", 6, 1, 6),
                row("inv-min", 50, 50, 800, { inverted: true }),
                row("inv-max", 6, 1, 6, { inverted: true }),
                row("dis-min", 0, 0, 10, { disabled: true }),
                row("dis-max", 10, 0, 10, { disabled: true }),
            ]);
    }),

    // Value marks on the scrubber (critique D1): a mark at each quarter with the value
    // ON a mark, the same inverted and vertical, and a value at min below a near mark.
    marks: defineComponent(() => {
        const quarters = [0, 25, 50, 75, 100];
        const row = (id: string, value: number, marks: number[], extra: Record<string, unknown> = {}) =>
            h(
                "div",
                {
                    "data-witness": id,
                    style:
                        extra.orientation === "vertical"
                            ? "padding:12px 24px;block-size:200px;display:inline-flex"
                            : "padding:12px 24px;inline-size:320px",
                },
                [h(Slider, { modelValue: [value], min: 0, max: 100, marks, "aria-label": id, ...extra })],
            );
        return () =>
            h("div", [
                row("on-25", 25, quarters),
                row("on-75", 75, quarters),
                row("inv-25", 25, quarters, { inverted: true }),
                row("v-75", 75, quarters, { orientation: "vertical" }),
                row("below-5", 0, [5]),
            ]);
    }),

    // A pane: its subtitle (CardDescription) over the two field recipes a consumer
    // composes — the `.input-bar` seat (value's Browse search) and the `<Input>` pill.
    type: defineComponent(
        () => () =>
            h("div", { style: "padding:16px;display:grid;gap:12px" }, [
                h(CardDescription, { "data-witness": "subtitle" }, () => "Pane subtitle"),
                h("label", { class: "input-bar", "data-witness": "bar" }, [
                    h("input", {
                        class: "input-bar-field",
                        "aria-label": "Search",
                        placeholder: "Search",
                    }),
                ]),
                h(Input, { "data-witness": "pill", "aria-label": "Name", placeholder: "Name" }),
                // An sm field: the `-sm` rung through the field seam (critique D2).
                h("label", { class: "input-bar", "data-witness": "bar-sm", style: "--control-pill-text: var(--control-text-sm)" }, [
                    h("input", { class: "input-bar-field", "aria-label": "Filter", placeholder: "Filter" }),
                ]),
                h(Button, { "data-witness": "btn-md" }, () => "Button"),
                h(Button, { "data-witness": "btn-sm", size: "sm" }, () => "Small"),
                h(DropdownMenu, { defaultOpen: true, modal: false }, () => [
                    h(DropdownMenuTrigger, () => "Open"),
                    h(DropdownMenuContent, { align: "start" }, () => [
                        h(DropdownMenuLabel, { "data-witness": "mlabel" }, () => "Section"),
                        h(DropdownMenuItem, { "data-witness": "mitem" }, () => [
                            h("span", "Item"),
                            h(DropdownMenuShortcut, { "data-witness": "mshort" }, () => "⌘K"),
                        ]),
                    ]),
                ]),
            ]),
    ),

    // fourier's nav menu (`AppDock.vue:230-240`): a DropdownMenuItem holding a bare icon
    // component and a span label, open on mount.
    menu: defineComponent(
        () => () =>
            h("div", { style: "padding:16px" }, [
                h(DropdownMenu, { defaultOpen: true, modal: false }, () => [
                    h(DropdownMenuTrigger, { "data-witness": "trigger" }, () => "Open"),
                    h(DropdownMenuContent, { align: "start" }, () => [
                        h(DropdownMenuItem, { "data-witness": "item" }, () => [
                            h(Compass, { "aria-hidden": "true", "data-witness": "icon" }),
                            h("span", { "data-witness": "label" }, "Visualize"),
                        ]),
                    ]),
                ]),
            ]),
    ),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(Scene).mount("#app");
w.__ready = true;
