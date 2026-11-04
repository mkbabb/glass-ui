// glass-ui 10.1.5 — critic round 1's probe harness. One page, one scene per `?scene=`,
// the real library components from `src/` under the demo's own cascade. Reads only.
import "../../demo/demo.css";
import { createApp, defineComponent, h, ref, type Component } from "vue";
import { Compass, Settings } from "@lucide/vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockSeparator from "../../src/components/dock/DockSeparator.vue";
import DockTrigger from "../../src/components/dock/DockTrigger.vue";
import Slider from "../../src/components/slider/Slider.vue";
import Input from "../../src/components/input/Input.vue";
import Button from "../../src/components/button/Button.vue";
import CardDescription from "../../src/components/card/CardDescription.vue";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../../src/components/menu";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;
if (params.get("dir")) document.documentElement.dir = params.get("dir")!;
if (params.get("dark")) document.documentElement.classList.add("dark");

const glyph = () =>
    h("svg", { viewBox: "0 0 24 24", width: 24, height: 24, "aria-hidden": "true" }, [
        h("circle", { cx: 12, cy: 12, r: 8, fill: "none", stroke: "currentColor", "stroke-width": 2 }),
    ]);
const seat = (label: string) =>
    h(DockControl, { "aria-label": label, "data-witness": label }, glyph);

const scenes: Record<string, Component> = {
    dock: defineComponent(() => {
        const n = Number(params.get("seats") ?? 3);
        const c = params.get("collapse");
        const collapse = c === "open" || c === "closed" ? c : false;
        const orientation = (params.get("orientation") ?? "horizontal") as "horizontal" | "vertical";
        const shape = (params.get("shape") ?? "pill") as "pill" | "rounded" | "card";
        const fit = params.get("fit") !== "0";
        return () =>
            h(
                "div",
                {
                    "data-witness": "stage",
                    style:
                        orientation === "vertical"
                            ? "display:flex;padding:16px;block-size:" + (params.get("stageH") ?? "600") + "px"
                            : "display:flex;justify-content:center;align-items:flex-start;padding:16px " +
                              (fit ? "0" : "16px") +
                              ";min-block-size:240px",
                },
                [
                    h(
                        GlassDock,
                        {
                            fitContent: fit,
                            collapse,
                            orientation,
                            shape,
                            style: fit ? undefined : "flex:1",
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
                ],
            );
    }),

    slider: defineComponent(() => {
        const rows: [string, number, number, number, Record<string, unknown>][] = [];
        for (const size of ["sm", "md", "lg"]) {
            rows.push([`${size}-min`, 0, 0, 100, { size }]);
            rows.push([`${size}-mid`, 50, 0, 100, { size }]);
            rows.push([`${size}-max`, 100, 0, 100, { size }]);
        }
        rows.push(["step-min", 1, 1, 10, { step: 3 }]);
        rows.push(["step-max", 10, 1, 10, { step: 3 }]);
        rows.push(["dis-min", 0, 0, 10, { disabled: true }]);
        rows.push(["dis-max", 10, 0, 10, { disabled: true }]);
        rows.push(["rtl-min", 0, 0, 10, { dir: "rtl" }]);
        rows.push(["rtl-mid", 5, 0, 10, { dir: "rtl" }]);
        rows.push(["rtl-max", 10, 0, 10, { dir: "rtl" }]);
        rows.push(["vinv-min", 0, 0, 10, { orientation: "vertical", inverted: true }]);
        rows.push(["vinv-max", 10, 0, 10, { orientation: "vertical", inverted: true }]);
        const vrows: [string, number][] = [["v-min", 0], ["v-mid", 5], ["v-max", 10]];
        const drag = ref([5]);
        w.__drag = drag;
        return () =>
            h("div", [
                ...rows.map(([id, value, min, max, extra]) =>
                    h(
                        "div",
                        {
                            "data-witness": id,
                            style:
                                extra.orientation === "vertical"
                                    ? "padding:12px 24px;block-size:160px;display:inline-flex"
                                    : "padding:8px 24px;inline-size:320px",
                        },
                        [h(Slider, { modelValue: [value], min, max, "aria-label": id, ...extra })],
                    ),
                ),
                h(
                    "div",
                    { style: "display:flex;gap:24px;padding:12px 24px;block-size:160px" },
                    vrows.map(([id, v]) =>
                        h("div", { "data-witness": id, style: "display:inline-flex;block-size:160px" }, [
                            h(Slider, { modelValue: [v], min: 0, max: 10, orientation: "vertical", "aria-label": id }),
                        ]),
                    ),
                ),
                h("div", { "data-witness": "drag", style: "padding:8px 24px;inline-size:320px" }, [
                    h(Slider, {
                        modelValue: drag.value,
                        "onUpdate:modelValue": (v: number[]) => (drag.value = v),
                        min: 0,
                        max: 100,
                        "aria-label": "drag",
                    }),
                ]),
            ]);
    }),

    // A scrubber with value marks, at a value ON a mark and at min below a near mark.
    marks: defineComponent(
        () => () =>
            h("div", [
                ...[0, 25, 50, 75, 100].map((v) =>
                    h("div", { "data-witness": `on-${v}`, style: "padding:8px 24px;inline-size:320px" }, [
                        h(Slider, { modelValue: [v], min: 0, max: 100, marks: [0, 25, 50, 75, 100], "aria-label": `on-${v}` }),
                    ]),
                ),
                h("div", { "data-witness": "below-5", style: "padding:8px 24px;inline-size:320px" }, [
                    h(Slider, { modelValue: [0], min: 0, max: 100, marks: [5], "aria-label": "below-5" }),
                ]),
            ]),
    ),

    type: defineComponent(
        () => () =>
            h("div", { style: "padding:16px;display:grid;gap:12px;justify-items:start" }, [
                h(CardDescription, { "data-witness": "subtitle" }, () => "Pane subtitle"),
                h("label", { class: "input-bar", "data-witness": "bar" }, [
                    h("input", { class: "input-bar-field", "aria-label": "Search", placeholder: "Search" }),
                ]),
                h(Input, { "data-witness": "pill", "aria-label": "Name", placeholder: "Name" }),
                h(Button, { "data-witness": "btn-md" }, () => "Button"),
                h(Button, { "data-witness": "btn-sm", size: "sm" }, () => "Small"),
                h(DropdownMenu, { defaultOpen: true, modal: false }, () => [
                    h(DropdownMenuTrigger, { "data-witness": "trigger" }, () => "Open"),
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

    menu: defineComponent(() => {
        const checked = ref(true);
        const radio = ref("a");
        return () =>
            h("div", { style: "padding:16px" }, [
                h(DropdownMenu, { defaultOpen: true, modal: false }, () => [
                    h(DropdownMenuTrigger, { "data-witness": "trigger" }, () => "Open"),
                    h(DropdownMenuContent, { align: "start" }, () => [
                        h(DropdownMenuItem, { "data-witness": "icon-item" }, () => [
                            h(Compass, { "aria-hidden": "true", "data-part": "icon" }),
                            h("span", { "data-part": "label" }, "Visualize"),
                        ]),
                        h(DropdownMenuItem, { "data-witness": "text-item" }, () => "Plain text"),
                        h(DropdownMenuItem, { "data-witness": "mixed-item" }, () => [
                            "Delete ",
                            h("strong", { "data-part": "strong" }, "file"),
                        ]),
                        h(
                            DropdownMenuCheckboxItem,
                            {
                                "data-witness": "check-item",
                                modelValue: checked.value,
                                "onUpdate:modelValue": (v: boolean) => (checked.value = v),
                            },
                            () => [
                                h(Settings, { "aria-hidden": "true", "data-part": "icon" }),
                                h("span", { "data-part": "label" }, "Checked"),
                            ],
                        ),
                        h(
                            DropdownMenuRadioGroup,
                            { modelValue: radio.value, "onUpdate:modelValue": (v: string) => (radio.value = v) },
                            () => [
                                h(DropdownMenuRadioItem, { value: "a", "data-witness": "radio-item" }, () => [
                                    h(Settings, { "aria-hidden": "true", "data-part": "icon" }),
                                    h("span", { "data-part": "label" }, "Radio"),
                                ]),
                            ],
                        ),
                        h(DropdownMenuSub, () => [
                            h(DropdownMenuSubTrigger, { "data-witness": "sub-trigger" }, () => [
                                h(Compass, { "aria-hidden": "true", "data-part": "icon" }),
                                h("span", { "data-part": "label" }, "More"),
                            ]),
                            h(DropdownMenuSubContent, () => [h(DropdownMenuItem, () => "Inner")]),
                        ]),
                    ]),
                ]),
            ]);
    }),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(Scene).mount("#app");
w.__ready = true;
