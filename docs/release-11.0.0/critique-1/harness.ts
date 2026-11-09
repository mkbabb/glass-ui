// glass-ui 11.0.0 critique 1 — probe harness. Real components from `src/` under the demo
// cascade. `?scene=row&anchor=end|start|center&box=flex|grid` lays a figure dock in a
// 720 px row with free space; `?scene=atlas` mirrors atlas's PlateDock lane (a 196 px flex
// end control holding a flex-end wrapper); `?scene=page` is a page dock (collapsible).
import "../../../demo/demo.css";
import { createApp, defineComponent, h } from "vue";

import GlassDock from "../../../src/components/dock/GlassDock.vue";
import DockControl from "../../../src/components/dock/DockControl.vue";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;

const glyph = () =>
    h("svg", { viewBox: "0 0 24 24", width: 24, height: 24, "aria-hidden": "true" }, [
        h("circle", { cx: 12, cy: 12, r: 8, fill: "none", stroke: "currentColor", "stroke-width": 2 }),
    ]);
const seat = (label: string) => h(DockControl, { "aria-label": label, "data-seat": label }, glyph);

const figureDock = (anchor: string) =>
    h(
        GlassDock,
        {
            orientation: "horizontal",
            collapse: "closed",
            expandOn: "press",
            anchor,
            collapsedLabel: "Tools for probe",
            backdropMode: "static",
            shape: "pill",
            "data-probe": "dock",
            ref: (d: unknown) => (w.__dock = d),
        },
        {
            default: () => [seat("Options"), seat("Download"), seat("Enlarge"), seat("Close")],
            collapsed: () =>
                h("span", { "data-probe": "handle", style: "display:grid;place-items:center;inline-size:44px;block-size:44px" }, glyph()),
        },
    );

const scenes: Record<string, () => unknown> = {
    row: () => {
        const box = params.get("box") === "grid" ? "display:grid" : "display:flex";
        return h("div", { style: "padding:24px" }, [
            h("div", { "data-probe": "row", style: `${box};inline-size:720px;outline:1px dashed gray` }, [
                figureDock(params.get("anchor") ?? "end"),
            ]),
        ]);
    },
    atlas: () =>
        h("div", { style: "padding:24px;display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:1rem;inline-size:min(900px,100% - 48px)" }, [
            h("div", { style: "grid-column:1" }, "Fund balance by year"),
            h(
                "div",
                { "data-probe": "control", style: "grid-column:3;display:flex;flex:none;align-items:flex-start;gap:.75rem;justify-content:flex-end;min-inline-size:196px" },
                [h("div", { "data-probe": "plate-dock", style: "display:flex;justify-content:flex-end;min-inline-size:44px" }, [figureDock("end")])],
            ),
        ]),
    page: () =>
        h("div", { style: "min-block-size:200vh;padding:16px" }, [
            h("p", "page"),
            h(
                GlassDock,
                { class: "fixed bottom-4", collapse: "closed", "data-probe": "dock", ref: (d: unknown) => (w.__dock = d) },
                {
                    default: () => [seat("Home"), seat("Search"), seat("Library"), seat("Settings"), seat("Profile")],
                    collapsed: () => h("span", { "data-probe": "handle", style: "display:grid;place-items:center;inline-size:44px;block-size:44px" }, glyph()),
                },
            ),
            h("button", { "data-probe": "outside", style: "margin-top:40px" }, "outside"),
        ]),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(defineComponent(() => Scene)).mount("#app");
w.__ready = true;
