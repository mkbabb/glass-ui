// Fix 2 witness harness: O-212 (one inline bound), O-213's overlay half, O-214 (one
// indicator after a pointer open), G13, G14, the Collapsible's 11.0.0 consumer contract,
// the Table on the page and inside a Card (unpainted cells), and the dock's gliding mark
// with a seat whose text ticks. One scene per ?scene=. The library is imported by
// relative source path, so the same page runs on the branch and on a v11.0.0 tree.
import "./harness.css";
import { createApp, defineComponent, h, ref } from "vue";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../src/components/select";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../src/components/popover";
import { Configurator } from "../../../../../src/components/configurator";
import { SegmentedTabs } from "../../../../../src/components/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../src/components/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../../src/components/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../src/components/card";
import { GlassDock, DockControl } from "../../../../../src/components/dock";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "select";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
// A page taller than the viewport, so a classic scrollbar (and its stable gutter) is present.
if (params.get("tall")) document.documentElement.style.setProperty("--harness-tall", "1");
const w = window as unknown as Record<string, unknown>;

const ROWS = ["Neon cyberpunk gradient", "Quiet season", "Harbour at dusk", "Ochre field", "Violet hour", "Slate"];

const SelectScene = defineComponent(() => {
    const value = ref(ROWS[1]);
    const tw = Number(params.get("tw") ?? 386);
    return () =>
        h("div", { class: "scene", style: "padding: 80px 16px" }, [
            h(Select, { modelValue: value.value, "onUpdate:modelValue": (v: string) => (value.value = v) }, () => [
                h(SelectTrigger, { "data-probe": "trigger", style: `inline-size: ${tw}px`, "aria-label": "Preset" }, () => h(SelectValue)),
                h(SelectContent, null, () => ROWS.map((f) => h(SelectItem, { value: f, key: f, "data-probe": "row" }, () => f))),
            ]),
        ]);
});

// An anchored panel the consumer sizes to its anchor (?tw= px).
const PopoverScene = defineComponent(() => {
    const tw = Number(params.get("tw") ?? 358);
    return () =>
        h("div", { class: "scene", style: "padding: 80px 16px" }, [
            h(Popover, null, () => [
                h(PopoverTrigger, { "data-probe": "anchor", style: `inline-size: ${tw}px; block-size: 40px` }, () => "Anchor"),
                h(PopoverContent, { "data-probe": "panel", class: "w-(--reka-popper-anchor-width)" }, () => "A panel as wide as its anchor"),
            ]),
        ]);
});

const ConfigScene = defineComponent(() => {
    const side = params.get("side") ?? "right";
    return () =>
        h("div", { style: "padding: 0" }, [
            h(Configurator, { asideSide: side, "data-probe": "cfg" }, {
                stage: () => h("div", { "data-probe": "stage-content", style: "block-size: 300px; background: color-mix(in oklab, var(--primary) 20%, transparent)" }, "stage"),
                default: () => h("div", { "data-probe": "aside-content" }, "controls"),
            }),
        ]);
});

const TabsScene = defineComponent(() => {
    const v = ref("controls");
    return () =>
        h("div", { class: "scene", style: "padding: 24px 16px" }, [
            h("div", { "data-probe": "tabs" }, [
                h(SegmentedTabs, {
                    modelValue: v.value,
                    "onUpdate:modelValue": (x: string) => (v.value = x),
                    options: [
                        { label: "Controls", value: "controls" },
                        { label: "Canvas", value: "canvas" },
                    ],
                    ariaLabel: "Workspace",
                }),
            ]),
        ]);
});

// The Collapsible as an 11.0.0 consumer wrote it: a `>` rule on the content's children,
// the reka height variable, and the gap on the library's hook.
const CollapsibleScene = defineComponent(() => {
    const open = ref(false);
    w.__toggle = () => (open.value = !open.value);
    return () =>
        h("div", { class: "scene", style: "padding: 24px 16px" }, [
            h(Collapsible, { open: open.value, "onUpdate:open": (x: boolean) => (open.value = x), "data-probe": "croot", style: "--collapsible-gap: 12px" }, () => [
                h(CollapsibleTrigger, { "data-probe": "ctrig" }, () => "More"),
                h(CollapsibleContent, { class: "consumer-content", "data-probe": "content" }, () => [
                    h("p", { "data-probe": "para" }, "Body text that runs to a second line at a phone width, so the region has some height to travel."),
                    h("p", "Second paragraph."),
                    h("p", "Third paragraph."),
                ]),
            ]),
        ]);
});

// A Table on the page ground and the same Table inside a Card, cells unpainted.
const tableOf = (probe: string) =>
    h("div", { "data-probe": probe }, [
        h(Table, null, () => [
            h(TableHeader, null, () => h(TableRow, null, () => ["Run", "Engine", "Result"].map((c) => h(TableHead, { key: c }, () => c)))),
            h(TableBody, null, () =>
                [["1", "Chromium", "green"], ["2", "WebKit", "green"], ["3", "Chromium", "red"]].map((r) =>
                    h(TableRow, { key: r[0] }, () => r.map((c, i) => h(TableCell, { key: i }, () => c))),
                ),
            ),
        ]),
    ]);
const TableScene = defineComponent(() => () =>
    h("div", { class: "scene", style: "padding: 24px 16px; display: grid; gap: 32px" }, [
        tableOf("page-table"),
        h("div", { "data-probe": "card-host" }, [
            h(Card, null, () => [
                h(CardHeader, null, () => h(CardTitle, null, () => "Runs")),
                h(CardContent, null, () => tableOf("card-table")),
            ]),
        ]),
    ]),
);

// The dock's gliding mark, with a seat whose text ticks (?scene=nav). window.__select(i)
// moves the destination; window.__tick() changes the ticking seat's text.
const tabs = ["Overview", "Methods", "Results", "Notes"];
const NavScene = defineComponent(() => {
    const current = ref(0);
    const count = ref(0);
    w.__select = (i: number) => (current.value = i);
    w.__tick = () => count.value++;
    return () =>
        h("div", { class: "scene", style: "padding: 24px 16px" }, [
            h("div", { "data-probe": "nav" }, [
                h(GlassDock, { collapse: false, backdropMode: "static" }, {
                    default: () =>
                        tabs.map((label, i) =>
                            h(
                                DockControl,
                                { shape: "tab", "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) },
                                () => (i === 2 ? `${label} ${count.value}` : label),
                            ),
                        ),
                }),
            ]),
        ]);
});

const scenes: Record<string, ReturnType<typeof defineComponent>> = {
    select: SelectScene,
    popover: PopoverScene,
    config: ConfigScene,
    tabs: TabsScene,
    collapsible: CollapsibleScene,
    table: TableScene,
    nav: NavScene,
};
createApp(scenes[scene] ?? SelectScene).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
