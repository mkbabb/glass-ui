// glass-ui 10.1.5 — critic round 4's probe harness (critic-2's scenes plus round 4's). One page, one scene per `?scene=`,
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
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup,
    DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuTrigger,
} from "../../src/components/menu";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../src/components/select";
import SegmentedTabs from "../../src/components/tabs/SegmentedTabs.vue";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../src/components/table";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;
if (params.get("dir")) document.documentElement.dir = params.get("dir")!;
if (params.get("noro") === "1") delete (window as unknown as { ResizeObserver?: unknown }).ResizeObserver;
{
    const RO = window.ResizeObserver;
    let made = 0;
    if (RO) {
        window.ResizeObserver = class extends RO { constructor(cb: ResizeObserverCallback) { super(cb); made += 1; } };
    }
    w.__roMade = () => made;
    const errs: string[] = [];
    window.addEventListener("error", (e) => errs.push(String(e.message)));
    w.__errs = errs;
}
const cur = ref(Number(params.get("cur") ?? -1));
w.__cur = cur;
const tick = ref(0);
w.__tick = tick;

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
        if (k.startsWith("wmenu:"))
            return h(DropdownMenu, { modal: false }, () => [
                h(DockTrigger, { for: "dropdown", "data-witness": id }, () => [glyph(), h("span", k.slice(6))]),
                h(DropdownMenuContent, () => [h(DropdownMenuItem, () => "Home")]),
            ]);
        if (k === "live")
            return h(DockControl, { shape: "tab", "data-witness": id }, () => [glyph(), h("span", `t ${tick.value}`)]);
        if (k === "cur") {
            const n = i;
            return h(DockControl, { "aria-label": id, "data-witness": id, "aria-current": cur.value === n ? "page" : undefined }, glyph);
        }
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
                            "data-preset": params.get("preset") ?? undefined,
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

const Gl = () => h("svg", { viewBox: "0 0 24 24", width: 16, height: 16, "aria-hidden": "true", "data-icon": "" }, [h("circle", { cx: 12, cy: 12, r: 8, fill: "none", stroke: "currentColor", "stroke-width": 2 })]);

scenes.slider4 = defineComponent(() => {
    const cells: [string, Record<string, unknown>][] = [
        ["h-0", { modelValue: [0] }], ["h-50", { modelValue: [50] }], ["h-100", { modelValue: [100] }],
        ["fourier-min", { modelValue: [50], min: 50, max: 800 }], ["zones-max", { modelValue: [6], min: 0, max: 6, step: 1 }],
        ["step-edge", { modelValue: [9], min: 0, max: 10, step: 3 }], ["step-first", { modelValue: [3], min: 0, max: 10, step: 3 }],
        ["sm-50", { modelValue: [50], size: "sm" }], ["lg-50", { modelValue: [50], size: "lg" }],
        ["sm-0", { modelValue: [0], size: "sm" }], ["lg-100", { modelValue: [100], size: "lg" }],
        ["dis-0", { modelValue: [0], disabled: true }], ["dis-100", { modelValue: [100], disabled: true }],
        ["rtl-0", { modelValue: [0], dir: "rtl" }], ["rtl-100", { modelValue: [100], dir: "rtl" }], ["rtl-50", { modelValue: [50], dir: "rtl" }],
        ["inv-0", { modelValue: [0], inverted: true }], ["inv-100", { modelValue: [100], inverted: true }],
    ];
    const vcells: [string, Record<string, unknown>][] = [
        ["v-0", { modelValue: [0] }], ["v-50", { modelValue: [50] }], ["v-100", { modelValue: [100] }],
        ["vinv-0", { modelValue: [0], inverted: true }], ["vinv-100", { modelValue: [100], inverted: true }],
    ];
    return () =>
        h("div", [
            ...cells.map(([id, p]) => h("div", { "data-witness": id, style: "padding:10px 24px;inline-size:320px" }, [h(Slider, { min: 0, max: 100, ...p, "aria-label": id })])),
            h("div", { style: "display:flex;gap:24px;padding:24px" }, vcells.map(([id, p]) => h("div", { "data-witness": id, style: "block-size:200px;display:inline-flex" }, [h(Slider, { min: 0, max: 100, orientation: "vertical", ...p, "aria-label": id })]))),
        ]);
});

scenes.fields4 = defineComponent(() => {
    const sel = ref("a");
    return () =>
        h("div", { style: "padding:16px;display:grid;gap:12px" }, [
            h(CardDescription, { "data-witness": "subtitle" }, () => "Pane subtitle"),
            h("label", { class: "input-bar", "data-witness": "bar" }, [h("input", { class: "input-bar-field", "aria-label": "Search", placeholder: "Search" })]),
            h("div", { class: "input-pill", "data-witness": "pill", tabindex: 0 }, "Pill"),
            h("input", { class: "input-pill", "data-witness": "pill-input", "aria-label": "pill input" }),
            h("input", { class: "input-pill control-sm", "data-witness": "pill-sm", "aria-label": "pill sm", style: "--control-pill-text: var(--control-text-sm)" }),
            h(Input, { "data-witness": "input", "aria-label": "Name", placeholder: "Name" }),
            h(Textarea, { "data-witness": "textarea", "aria-label": "Notes", placeholder: "Notes" }),
            h(Select, { modelValue: sel.value, "onUpdate:modelValue": (v: string) => (sel.value = v) }, () => [
                h(SelectTrigger, { "data-witness": "select", "aria-label": "Pick" }, () => [h(SelectValue)]),
                h(SelectContent, () => [h(SelectItem, { value: "a" }, () => "Alpha")]),
            ]),
        ]);
});

scenes.menu4 = defineComponent(() => {
    const checked = ref(true);
    const radio = ref("a");
    return () =>
        h("div", { style: "padding:24px" }, [
            h(DropdownMenu, { defaultOpen: true, modal: false }, () => [
                h(DropdownMenuTrigger, { "data-witness": "trigger" }, () => "Open"),
                h(DropdownMenuContent, () => [
                    h(DropdownMenuItem, { "data-witness": "icon" }, () => [Gl(), "Settings"]),
                    h(DropdownMenuItem, { "data-witness": "plain" }, () => "Plain label"),
                    h(DropdownMenuItem, { "data-witness": "icon2" }, () => [Gl(), h("span", "Spanned label")]),
                    h(DropdownMenuCheckboxItem, { "data-witness": "check", modelValue: checked.value, "onUpdate:modelValue": (v: boolean) => (checked.value = v) }, () => [Gl(), "Checkbox"]),
                    h(DropdownMenuCheckboxItem, { "data-witness": "check-plain", modelValue: checked.value }, () => "Checkbox plain"),
                    h(DropdownMenuRadioGroup, { modelValue: radio.value, "onUpdate:modelValue": (v: string) => (radio.value = v) }, () => [
                        h(DropdownMenuRadioItem, { value: "a", "data-witness": "radio" }, () => [Gl(), "Radio"]),
                        h(DropdownMenuRadioItem, { value: "b", "data-witness": "radio-plain" }, () => "Radio plain"),
                    ]),
                    h(DropdownMenuSub, () => [
                        h(DropdownMenuSubTrigger, { "data-witness": "sub" }, () => [Gl(), "More"]),
                        h(DropdownMenuSubContent, () => [h(DropdownMenuItem, () => "Inner")]),
                    ]),
                ]),
            ]),
        ]);
});

scenes.segtabs = defineComponent(() => {
    const v = ref("a");
    w.__seg = v;
    return () =>
        h("div", [
            h("header", { "data-witness": "header", style: "position:fixed;top:0;left:0;right:0;height:80px;z-index:1;background:rgb(200,30,30)" }),
            h("div", { style: "block-size:300px" }),
            h("div", { "data-witness": "host", style: "padding:16px" }, [
                h(SegmentedTabs, { variant: (params.get("variant") ?? "pill") as "pill", modelValue: v.value, "onUpdate:modelValue": (x: string) => (v.value = x), options: [{ label: "Alpha", value: "a" }, { label: "Beta", value: "b" }, { label: "Gamma", value: "c" }] }),
            ]),
            h("div", { style: "block-size:2000px" }),
        ]);
});

scenes.table = defineComponent(
    () => () =>
        h("div", { style: "padding:24px" }, [
            h("span", { "data-witness": "probe-border", style: "border:1px solid var(--border)" }, "x"),
            h(Table, () => [
                h(TableHeader, { "data-witness": "thead" }, () => [h(TableRow, { "data-witness": "hrow" }, () => [h(TableHead, () => "A"), h(TableHead, () => "B")])]),
                h(TableBody, () => [1, 2, 3].map((n) => h(TableRow, { "data-witness": `row${n}` }, () => [h(TableCell, () => `a${n}`), h(TableCell, () => `b${n}`)]))),
            ]),
        ]),
);

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(Scene).mount("#app");
w.__ready = true;
