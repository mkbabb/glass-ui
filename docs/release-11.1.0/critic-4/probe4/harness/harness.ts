// Critic 4 probe harness: angles the lanes, the fix witnesses and critics 2 and 3 do not
// hold. A Blob whose box ends at the viewport edge (does the wider paint scroll the
// page), the dock's run mark in a right-to-left dock and a vertical one, a menu whose
// trigger sits at the viewport's far edge, a Slider dragged vertically and right to left,
// and a Collapsible nested in one that sets the gap. One scene per ?scene=. The library
// is imported by relative source path, so the same page runs on the branch and v11.0.0.
import "./harness.css";
import { createApp, defineComponent, h, nextTick, ref } from "vue";
import { Blob, BLOB_CONFIG_DEFAULTS } from "../../../../../src/components/blob";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../src/components/collapsible";
import { GlassDock, DockControl } from "../../../../../src/components/dock";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../../src/components/menu";
import { Slider } from "../../../../../src/components/slider";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "blob";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
if (params.get("dir")) document.documentElement.dir = params.get("dir")!;
const w = window as unknown as Record<string, unknown>;

// ?at=edge | last. The default animated blob (satellites orbit wide).
const BlobScene = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("p", { style: "margin: 0" }, "A page with a blob."),
        h("div", { class: params.get("at") === "last" ? "blob-last" : "blob-edge", "data-probe": "blob-host" }, [
            h(Blob, { config: BLOB_CONFIG_DEFAULTS, color: "oklch(0.72 0.16 40)", "data-probe": "blob" }),
        ]),
    ]),
);

const tabs = ["Overview", "Methods", "Results", "Notes"];
const current = ref(1);
w.__select = (i: number) => (current.value = i);
// ?orientation=vertical; ?dir=rtl (on <html>); ?shape=icon (glyph seats, the spring press); ?plain=1 (the library's own selected colour).
const NavScene = defineComponent(() => () =>
    h("div", { class: params.get("plain") === "1" ? "scene" : "scene mark-probe" }, [
        h("div", { "data-probe": "nav", style: "display: inline-block" }, [
            h(GlassDock, { collapse: false, backdropMode: "static", orientation: (params.get("orientation") ?? "horizontal") as "horizontal" | "vertical" }, {
                default: () =>
                    tabs.map((label, i) =>
                        params.get("shape") === "icon"
                            ? h(DockControl, { "aria-label": label, "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, () => h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" }, [h("path", { d: "M2 8h12M8 2v12", stroke: "currentColor", "stroke-width": 2, fill: "none" })]))
                            : h(DockControl, { shape: "tab", "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, () => label),
                    ),
            }),
        ]),
    ]),
);

// A menu whose trigger ends at the viewport's inline-end edge; rows longer than 22rem.
const MenuScene = defineComponent(() => () =>
    h("div", { class: "scene", style: "display: flex; justify-content: flex-end" }, [
        h(DropdownMenu, null, () => [
            h(DropdownMenuTrigger, { "data-probe": "mtrig", style: "padding: 8px 12px" }, () => "Open"),
            h(DropdownMenuContent, { "data-probe": "menu", align: (params.get("align") ?? "start") as "start" | "end" }, () =>
                ["A row with a long label that asks for all the room a menu can have", "Short", "Another long row, long enough to pass the trigger"].map((t) => h(DropdownMenuItem, null, () => t)),
            ),
        ]),
    ]),
);

// ?orientation=vertical; ?dir=rtl. A plain controlled v-model.
const SliderScene = defineComponent(() => {
    const model = ref([50]);
    const seen: number[] = [];
    const commits: number[] = [];
    w.__model = () => [...model.value];
    w.__seen = () => seen;
    w.__commits = () => commits;
    const vertical = params.get("orientation") === "vertical";
    return () =>
        h("div", { class: "scene", style: vertical ? "block-size: 300px; inline-size: 60px" : "inline-size: 300px" }, [
            h(Slider, {
                modelValue: model.value,
                "onUpdate:modelValue": (v: number[]) => { seen.push(v[0]); model.value = v; },
                onValueCommit: (v: number[]) => commits.push(v[0]),
                min: 0, max: 100, step: 1, "data-probe": "slider",
                orientation: vertical ? "vertical" : "horizontal",
                dir: (params.get("dir") ?? "ltr") as "ltr" | "rtl",
                style: vertical ? "block-size: 260px" : undefined,
            }),
        ]);
});

// The outer Collapsible sets the gap; the inner one sets nothing.
const NestedScene = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h(Collapsible, { defaultOpen: true, style: "--collapsible-gap: 12px", "data-probe": "outer" }, () => [
            h(CollapsibleTrigger, null, () => "Outer"),
            h(CollapsibleContent, { "data-probe": "outer-content" }, () => [
                h("p", { style: "margin: 0" }, "Outer body"),
                h(Collapsible, { defaultOpen: true, "data-probe": "inner" }, () => [
                    h(CollapsibleTrigger, { "data-probe": "inner-trig" }, () => "Inner"),
                    h(CollapsibleContent, { "data-probe": "inner-content" }, () => [h("p", { "data-probe": "inner-p", style: "margin: 0" }, "Inner body")]),
                ]),
            ]),
        ]),
    ]),
);

// A dock that mounts on demand (orchestrator-note-mark-press.md, the first measure):
// ?marked=0 leaves `aria-current` off every seat, so the run draws no mark.
const MountDockScene = defineComponent(() => {
    const show = ref(false);
    const marked = params.get("marked") !== "0";
    w.__mountDock = async () => { performance.mark("c4-mount-start"); show.value = true; await nextTick(); performance.mark("c4-mount-end"); };
    return () =>
        h("div", { class: "scene mark-probe" }, [
            h("p", { style: "margin: 0 0 16px" }, "A page that mounts a dock."),
            show.value
                ? h("div", { "data-probe": "nav", style: "display: inline-block" }, [
                      h(GlassDock, { collapse: false, backdropMode: "static" }, {
                          default: () => tabs.map((label, i) => h(DockControl, { shape: "tab", "aria-current": marked && i === 1 ? "page" : undefined, "data-tab": i }, () => label)),
                      }),
                  ])
                : null,
        ]);
});

const scenes: Record<string, ReturnType<typeof defineComponent>> = { mountdock: MountDockScene, blob: BlobScene, nav: NavScene, menu: MenuScene, slider: SliderScene, nested: NestedScene };
createApp(scenes[scene] ?? BlobScene).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
