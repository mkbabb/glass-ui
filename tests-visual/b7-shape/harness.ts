// glass-ui U/B7 G1 — the shape-and-glide witnesses' harness. One page, one scene per
// `?scene=`, the real library components from `src/` under the demo's own cascade.
// Imports are relative to `src/`, so the same file mounts unchanged on the 10.1.1 tag:
// that is how each witness is shown failing on bbf176f02 and passing on this branch.
//
// `?layered=1` loads the demo cascade the way atlas does: the compiled sheet is wrapped
// whole in a consumer layer (`@layer app.recipes { … }`), after an app layer order
// statement. `?theme=dark` sets the dark class on the root.
import { createApp, defineComponent, h, ref, type Component } from "vue";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;

if (params.get("layered") === "1") {
    const css = (await import("../../demo/demo.css?inline")).default as string;
    const style = document.createElement("style");
    style.textContent = `@layer app, app.tokens, app.recipes, app.components;\n@layer app.recipes {\n${css}\n}`;
    document.head.append(style);
} else {
    await import("../../demo/demo.css");
}
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");

/** atlas's base sheet: the root clips horizontal overflow on both html and body. */
function clipRoot(): void {
    for (const el of [document.documentElement, document.body]) el.style.overflowX = "clip";
}

const { default: SegmentedTabs } = await import("../../src/components/tabs/SegmentedTabs.vue");

const TAB_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Funding", value: "funding" },
    { label: "Schools", value: "schools" },
    { label: "Networks", value: "networks" },
    { label: "Speeds", value: "speeds" },
];

const scenes: Record<string, () => Promise<Component>> = {
    // O-17: radius scales with size; circles are circles.
    radius: async () => {
        const { Avatar, AvatarFallback } = await import("../../src/components/avatar");
        const { StatusDot } = await import("../../src/components/status-dot");
        const { Switch } = await import("../../src/components/switch");
        const { RadioGroup, RadioGroupItem } = await import("../../src/components/radio-group");
        const { DarkModeToggle } = await import("../../src/components/dark-mode-toggle");
        const { PagerDots } = await import("../../src/components/pager-dots");
        const { Chip } = await import("../../src/components/chip");
        const { Input } = await import("../../src/components/input");
        const { default: GlassDock } = await import("../../src/components/dock/GlassDock.vue");
        const { default: DockControl } = await import("../../src/components/dock/DockControl.vue");
        const { default: ToggleGroup } = await import("../../src/components/toggle-group/ToggleGroup.vue");
        const { default: ToggleGroupItem } = await import("../../src/components/toggle-group/ToggleGroupItem.vue");
        return defineComponent(() => {
            const on = ref(true);
            const radio = ref("a");
            const pick = ref("a");
            return () =>
                h("div", { style: "padding:32px;display:flex;flex-direction:column;gap:20px;align-items:flex-start" }, [
                    h(Avatar, { size: "lg", "data-witness": "avatar" }, () => h(AvatarFallback, () => "MB")),
                    h(StatusDot, { state: "online", "data-witness": "status-dot" }),
                    h(Switch, { modelValue: on.value, "onUpdate:modelValue": (v: boolean) => (on.value = v), "aria-label": "On", "data-witness": "switch" }),
                    h(RadioGroup, { modelValue: radio.value, "aria-label": "Pick", "data-witness": "radio" }, () => [
                        h(RadioGroupItem, { value: "a", "aria-label": "A" }),
                    ]),
                    h(DarkModeToggle, { "data-witness": "dark-toggle" }),
                    h(PagerDots, { count: 3, modelValue: 0, "data-witness": "pager" }),
                    h(Chip, { size: "sm", "data-witness": "chip" }, () => "Funding"),
                    h("div", { style: "width:320px" }, [h(Input, { "aria-label": "Search", "data-witness": "input" })]),
                    h("div", { class: "rounded-pill", "data-witness": "bar44", style: "height:44px;width:320px;background:var(--muted)" }),
                    h(ToggleGroup, { type: "single", modelValue: pick.value, "aria-label": "Program", "data-witness": "toggles" }, () => [
                        h(ToggleGroupItem, { value: "a" }, () => "E-Rate"),
                    ]),
                    h("div", { style: "position:relative;height:80px" }, [
                        h(GlassDock, { collapse: "closed", "data-witness": "dock-collapsed" }, () => [
                            h(DockControl, { "aria-label": "Play" }, () => "▶"),
                        ]),
                    ]),
                    h("div", { style: "position:relative;height:80px" }, [
                        h(GlassDock, { collapse: false, "data-witness": "dock-open" }, () => [
                            h(DockControl, { "aria-label": "Play", "data-witness": "dock-icon" }, () => "▶"),
                            h(DockControl, { "aria-label": "Stop" }, () => "■"),
                        ]),
                    ]),
                ]);
        });
    },

    // G1-7: past its rung a control is a bar; on its rung it stays a stadium.
    bar: async () => {
        const { Button } = await import("../../src/components/button");
        const { default: ToggleGroup } = await import("../../src/components/toggle-group/ToggleGroup.vue");
        const { default: ToggleGroupItem } = await import("../../src/components/toggle-group/ToggleGroupItem.vue");
        return defineComponent(() => {
            const pick = ref("a");
            const strip = ref("all");
            const pair = ref("on");
            return () =>
                h("div", { style: "padding:32px;display:flex;flex-direction:column;gap:20px;align-items:flex-start" }, [
                    h(Button, { "data-witness": "btn-line" }, () => "Download"),
                    h("div", { style: "inline-size:150px" }, [
                        h(Button, { "data-witness": "btn-wrap" }, () => "Download the school funding table"),
                    ]),
                    h(Button, { "data-witness": "btn-wide", style: "inline-size:22rem" }, () => "Apply filters"),
                    h(ToggleGroup, { type: "single", modelValue: pick.value, "aria-label": "Program" }, () => [
                        h(ToggleGroupItem, { value: "a", "data-witness": "toggle-line" }, () => "E-Rate"),
                        h(ToggleGroupItem, { value: "b", "data-witness": "toggle-wrap", style: "max-inline-size:120px" }, () => "Rural schools in urban districts"),
                    ]),
                    h(SegmentedTabs, {
                        options: [
                            { label: "All programs", value: "all" },
                            { label: "Funding requests", value: "funding" },
                            { label: "Schools", value: "schools" },
                            { label: "Networks", value: "networks" },
                            { label: "Speeds", value: "speeds" },
                        ],
                        modelValue: strip.value,
                        "onUpdate:modelValue": (v: string) => (strip.value = v),
                        ariaLabel: "Subject",
                        "data-witness": "strip-wide",
                        style: "min-inline-size:24rem",
                    }),
                    h(SegmentedTabs, {
                        options: [
                            { label: "On", value: "on" },
                            { label: "Off", value: "off" },
                        ],
                        modelValue: pair.value,
                        "onUpdate:modelValue": (v: string) => (pair.value = v),
                        ariaLabel: "Power",
                        "data-witness": "strip-short",
                    }),
                ]);
        });
    },

    // O-4/§4.2: capsule hover and ToggleGroup press carry no spatial leg.
    press: async () => {
        const { default: ToggleGroup } = await import("../../src/components/toggle-group/ToggleGroup.vue");
        const { default: ToggleGroupItem } = await import("../../src/components/toggle-group/ToggleGroupItem.vue");
        const { Chip } = await import("../../src/components/chip");
        return defineComponent(() => {
            const pick = ref("a");
            return () =>
                h("div", { style: "padding:48px;display:flex;gap:24px;align-items:center" }, [
                    h(
                        ToggleGroup,
                        { type: "single", modelValue: pick.value, "onUpdate:modelValue": (v: string) => (pick.value = v), "aria-label": "Program" },
                        () => [
                            h(ToggleGroupItem, { value: "a", "data-witness": "toggle-a" }, () => "E-Rate"),
                            h(ToggleGroupItem, { value: "b", "data-witness": "toggle-b" }, () => "ECF"),
                        ],
                    ),
                    h(Chip, { mode: "action", "data-witness": "chip" }, () => "Download"),
                ]);
        });
    },

    // D-1: a side sheet opened from deep in a long page, under the consumer layer wrap
    // and atlas's root `overflow-x: clip`, stays on screen.
    sheet: async () => {
        const { Dialog, DialogTitle, DialogDescription } = await import("../../src/components/dialog");
        const { SheetContent } = await import("../../src/components/sheet");
        clipRoot();
        return defineComponent(() => {
            const open = ref(false);
            w.__open = () => (open.value = true);
            return () =>
                h("div", { style: "height:4000px;padding:32px" }, [
                    h("p", "Long page"),
                    h(Dialog, { open: open.value, "onUpdate:open": (v: boolean) => (open.value = v) }, () => [
                        h(SheetContent, { side: "right", "data-witness": "sheet" }, () => [
                            h(DialogTitle, () => "Filters"),
                            h(DialogDescription, () => "Narrow the map."),
                        ]),
                    ]),
                ]);
        });
    },

    // D-2: a sticky filter row holding a DropdownMenu and a Select, in a long page under
    // atlas's root `overflow-x: clip`. Opening either leaves the page's scroll alone.
    sticky: async () => {
        const menu = await import("../../src/components/menu");
        const sel = await import("../../src/components/select");
        clipRoot();
        return defineComponent(() => {
            const value = ref("a");
            return () =>
                h("div", { style: "height:4000px" }, [
                    h("div", { style: "height:600px" }),
                    h(
                        "div",
                        {
                            "data-witness": "sticky-row",
                            style: "position:sticky;top:0;display:flex;gap:16px;padding:12px;background:var(--background);z-index:5",
                        },
                        [
                            h(menu.DropdownMenu, null, () => [
                                h(menu.DropdownMenuTrigger, { "data-witness": "menu-trigger" }, () => "Actions"),
                                h(menu.DropdownMenuContent, { "data-witness": "menu" }, () => [
                                    h(menu.DropdownMenuItem, () => "Download CSV"),
                                    h(menu.DropdownMenuItem, () => "Copy link"),
                                ]),
                            ]),
                            h(sel.Select, { modelValue: value.value, "onUpdate:modelValue": (v: string) => (value.value = v) }, () => [
                                h(sel.SelectTrigger, { "data-witness": "select-trigger", style: "width:180px" }, () => h(sel.SelectValue)),
                                h(sel.SelectContent, { "data-witness": "select" }, () =>
                                    ["a", "b", "c"].map((v) => h(sel.SelectItem, { value: v }, () => `Year ${v}`)),
                                ),
                            ]),
                        ],
                    ),
                ]);
        });
    },

    // D-3 and D-6: a twelve-row Select near the top of the page.
    select: async () => {
        const sel = await import("../../src/components/select");
        return defineComponent(() => {
            const value = ref("1");
            const rows = Array.from({ length: 12 }, (_, i) => String(i + 1));
            return () =>
                h("div", { style: "padding:24px" }, [
                    h(sel.Select, { modelValue: value.value, "onUpdate:modelValue": (v: string) => (value.value = v) }, () => [
                        h(sel.SelectTrigger, { "data-witness": "select-trigger", style: "width:200px" }, () => h(sel.SelectValue)),
                        h(sel.SelectContent, { "data-witness": "select" }, () =>
                            rows.map((v) => h(sel.SelectItem, { value: v }, () => `School year 20${10 + Number(v)}`)),
                        ),
                    ]),
                ]);
        });
    },

    // The sizing law: a menu with a long label and a popover, both opened from a
    // trigger at the right edge; a forty-row menu opened low in the viewport.
    sizing: async () => {
        const menu = await import("../../src/components/menu");
        const pop = await import("../../src/components/popover");
        const long =
            "Download the per-school funding table with every commitment line as a spreadsheet";
        return defineComponent(() => () =>
            h("div", { style: "position:relative;height:100vh" }, [
                h("div", { style: "position:absolute;top:24px;right:4px;display:flex;flex-direction:column;align-items:flex-end;gap:12px" }, [
                    h(menu.DropdownMenu, null, () => [
                        h(menu.DropdownMenuTrigger, { "data-witness": "long-trigger" }, () => "More"),
                        h(menu.DropdownMenuContent, { "data-witness": "long-menu" }, () => [
                            h(menu.DropdownMenuItem, () => long),
                            h(menu.DropdownMenuItem, () => "Copy link"),
                        ]),
                    ]),
                    h(pop.Popover, null, () => [
                        h(pop.PopoverTrigger, { "data-witness": "pop-trigger" }, () => "About"),
                        h(pop.PopoverContent, { "data-witness": "pop" }, () =>
                            h("p", `${long}. ${long}.`),
                        ),
                    ]),
                ]),
                h("div", { style: "position:absolute;top:60vh;left:24px" }, [
                    h(menu.DropdownMenu, null, () => [
                        h(menu.DropdownMenuTrigger, { "data-witness": "tall-trigger" }, () => "Districts"),
                        h(menu.DropdownMenuContent, { "data-witness": "tall-menu" }, () =>
                            Array.from({ length: 40 }, (_, i) => h(menu.DropdownMenuItem, () => `District ${i + 1}`)),
                        ),
                    ]),
                ]),
            ]),
        );
    },

    // The O-4 strip: five equal tabs on the pill material.
    tabs: async () =>
        defineComponent(() => {
            const model = ref("all");
            w.__select = (v: string) => (model.value = v);
            return () =>
                h("div", { style: "padding:48px" }, [
                    h(SegmentedTabs, {
                        options: TAB_OPTIONS,
                        modelValue: model.value,
                        "onUpdate:modelValue": (v: string) => (model.value = v),
                        ariaLabel: "Subject",
                        "data-witness": "strip",
                    }),
                ]);
        }),
};

const make = scenes[scene];
if (!make) throw new Error(`unknown scene "${scene}"`);
createApp(await make()).mount("#app");
w.__ready = true;
