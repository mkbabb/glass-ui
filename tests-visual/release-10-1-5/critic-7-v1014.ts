// glass-ui 10.1.5 — critic round 7's probe harness: the round-7 inbound compositions (O-156/O-165 hover
// ellipse, O-157 static veil ink, O-161 toggle touch hover, O-162 summary ring, O-166/O-167 the dock-hosted
// Slider, O-176/O-177 collapse="open" idle and Tab/press mid-expand) and the fix-6 attacks (a collapse from a
// scrolled overflow, layer switches across fit/overflow, the vertical yield). One page, one scene per `?scene=`,
// the real library components from `src/` under the demo's own cascade. Reads only.
import "./v1014/demo/demo.css";
import { createApp, defineComponent, h, ref, type Component } from "vue";

import GlassDock from "./v1014/src/components/dock/GlassDock.vue";
import DockControl from "./v1014/src/components/dock/DockControl.vue";
import DockSeparator from "./v1014/src/components/dock/DockSeparator.vue";
import DockLayer from "./v1014/src/components/dock/DockLayer.vue";
import DockLayerGroup from "./v1014/src/components/dock/DockLayerGroup.vue";
import Slider from "./v1014/src/components/slider/Slider.vue";
import SegmentedTabs from "./v1014/src/components/tabs/SegmentedTabs.vue";
import DarkModeToggle from "./v1014/src/components/dark-mode-toggle/DarkModeToggle.vue";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;
if (params.get("dir")) document.documentElement.dir = params.get("dir")!;
// The theme seeds vueuse useDark's own storage, so a DarkModeToggle in the scene keeps it.
try {
    localStorage.setItem("vueuse-color-scheme", params.get("dark") === "1" ? "dark" : "light");
} catch {}
if (params.get("dark") === "1") document.documentElement.classList.add("dark");
const clicks: Record<string, number> = {};
w.__clicks = clicks;
const bump = (id: string) => () => {
    clicks[id] = (clicks[id] ?? 0) + 1;
};
const key = ref(0);
w.__key = key;

const glyph = () =>
    h("svg", { viewBox: "0 0 24 24", width: 24, height: 24, "aria-hidden": "true" }, [
        h("circle", { cx: 12, cy: 12, r: 8, fill: "none", stroke: "currentColor", "stroke-width": 2 }),
    ]);

const time = ref([30]);
w.__time = time;

/** `?kinds=` a comma list: `icon`, `tab:<label>`, `ctl:<aria-label>`, `sep`, `slider`, `dmt`, `seg`. */
function seats(list?: string): unknown[] {
    const kinds = (list ?? params.get("kinds") ?? "tab:Home,icon,sep,slider,icon,icon,dmt").split(",");
    let i = 0;
    return kinds.map((k) => {
        i += 1;
        const id = `S${i}`;
        if (k === "sep") return h(DockSeparator);
        if (k === "slider")
            return h("div", { "data-witness": id, "data-kind": "slider", style: "display:flex;align-items:center;inline-size:140px;padding-inline:8px" }, [
                h(Slider, {
                    modelValue: time.value,
                    "onUpdate:modelValue": (v: number[]) => (time.value = v),
                    min: 0, max: 120, step: Number(params.get("step") ?? 30), marks: [0, 30, 60, 120], size: "sm", "aria-label": "Time",
                    style: "inline-size:100%",
                }),
            ]);
        if (k === "dmt") return h(DarkModeToggle, { size: "dock", "data-witness": id, onClick: bump(id) });
        if (k === "seg") {
            const v = ref("a");
            return h("div", { "data-witness": id, "data-kind": "seg", role: "group", "aria-label": `group ${id}` }, [
                h(SegmentedTabs, { modelValue: v.value, "onUpdate:modelValue": (x: string) => (v.value = x), options: [{ label: "Map", value: "a" }, { label: "List", value: "b" }] }),
            ]);
        }
        if (k.startsWith("tab:"))
            return h(DockControl, { shape: "tab", "data-witness": id, onClick: bump(id) }, () => [glyph(), h("span", k.slice(4))]);
        if (k.startsWith("ctl:")) return h(DockControl, { "aria-label": k.slice(4), "data-witness": id, onClick: bump(id) }, glyph);
        return h(DockControl, { "aria-label": id, "data-witness": id, onClick: bump(id) }, glyph);
    });
}

function collapseProp(): false | "open" | "closed" {
    const c = params.get("collapse");
    return c === "open" || c === "closed" ? c : false;
}

const stageStyle = () => {
    const bg = params.get("bg");
    const ink = params.get("ink");
    return [
        "display:flex;justify-content:center;align-items:flex-start;padding:40px 0;min-block-size:240px",
        bg ? `background:${bg}` : "",
        ink ? `--glass-veil-ink:${ink}` : "",
    ].join(";");
};

const scenes: Record<string, Component> = {
    dock: defineComponent(() => {
        const orientation = (params.get("orientation") ?? "horizontal") as "horizontal" | "vertical";
        return () =>
            h(
                "div",
                {
                    "data-witness": "stage",
                    style:
                        orientation === "vertical"
                            ? `display:flex;padding:16px;block-size:${params.get("stageH") ?? "600"}px`
                            : stageStyle(),
                },
                [
                    h(
                        GlassDock,
                        {
                            key: key.value,
                            fitContent: params.get("fit") !== "0",
                            collapse: collapseProp(),
                            orientation,
                            backdropMode: (params.get("backdrop") ?? "live") as "live" | "static",
                            style: params.get("maxw") ? `max-inline-size:${params.get("maxw")}px` : undefined,
                            ref: (dock: unknown) => {
                                w.__dock = dock;
                            },
                        },
                        {
                            default: () => seats(),
                            collapsed: () => h("span", { "data-witness": "summary" }, glyph()),
                        },
                    ),
                ],
            );
    }),

    /* Two layers, one that fits and one that overflows (`?maxw=`), to read data-run-fits across a switch. */
    layers: defineComponent(() => {
        const active = ref(params.get("layer") ?? "wide");
        w.__layer = active;
        return () =>
            h("div", { style: stageStyle() }, [
                h(
                    GlassDock,
                    {
                        fitContent: true,
                        collapse: collapseProp(),
                        style: params.get("maxw") ? `max-inline-size:${params.get("maxw")}px` : undefined,
                        ref: (dock: unknown) => {
                            w.__dock = dock;
                        },
                    },
                    {
                        default: () =>
                            h(
                                DockLayerGroup,
                                { active: active.value, "onUpdate:active": (v: string) => (active.value = v), showSwitcher: false },
                                () => [
                                    h(DockLayer, { id: "wide", label: "Wide" }, () =>
                                        seats("tab:Home,icon,icon,icon,icon,icon,icon,icon,tab:Settings").map((s) => s),
                                    ),
                                    h(DockLayer, { id: "narrow", label: "Narrow" }, () => seats("icon,icon")),
                                ],
                            ),
                        collapsed: () => h("span", { "data-witness": "summary" }, glyph()),
                    },
                ),
            ]);
    }),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(Scene).mount("#app");
w.__ready = true;
