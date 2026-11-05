// glass-ui 11.0.0 critique 2 — posture harness. Real components from `src/` under the demo
// cascade. `?scene=page&orient=horizontal|vertical&collapse=closed|open|false` lays a page
// dock; `?scene=figure` mirrors atlas's PlateDock lane (press-only, anchor end, static).
// Every seat counts the clicks it receives on `window.__clicks`.
import "../../../demo/demo.css";
import { createApp, defineComponent, h } from "vue";

import GlassDock from "../../../src/components/dock/GlassDock.vue";
import DockControl from "../../../src/components/dock/DockControl.vue";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;
const clicks: Record<string, number> = {};
w.__clicks = clicks;

const glyph = () =>
    h("svg", { viewBox: "0 0 24 24", width: 24, height: 24, "aria-hidden": "true" }, [
        h("circle", { cx: 12, cy: 12, r: 8, fill: "none", stroke: "currentColor", "stroke-width": 2 }),
    ]);
const seat = (label: string) =>
    h(DockControl, { "aria-label": label, "data-seat": label, onClick: () => (clicks[label] = (clicks[label] ?? 0) + 1) }, glyph);
const handle = () =>
    h("span", { "data-probe": "handle", style: "display:grid;place-items:center;inline-size:44px;block-size:44px" }, glyph());
const collapse = (() => {
    const c = params.get("collapse") ?? "closed";
    return c === "false" ? false : c;
})();

const scenes: Record<string, () => unknown> = {
    page: () => {
        const vertical = params.get("orient") === "vertical";
        return h("div", { style: "min-block-size:200vh;padding:16px" }, [
            h("button", { "data-probe": "before" }, "before"),
            h("p", "page"),
            h(
                GlassDock,
                {
                    class: vertical ? "fixed left-4 top-24" : "fixed bottom-4",
                    orientation: vertical ? "vertical" : "horizontal",
                    collapse,
                    "data-probe": "dock",
                    ref: (d: unknown) => (w.__dock = d),
                },
                {
                    default: () => [seat("Home"), seat("Search"), seat("Library"), seat("Settings"), seat("Profile")],
                    collapsed: handle,
                },
            ),
            h("button", { "data-probe": "outside", style: "margin-top:40px;margin-left:200px" }, "outside"),
        ]);
    },
    // A figure dock laid straight in a 720 px flex row with free space (the dock's own
    // auto inline margins centre it), `anchor` from the query.
    row: () =>
        h("div", { style: "padding:24px" }, [
            h("div", { "data-probe": "control", style: "display:flex;inline-size:min(720px,100% - 48px);outline:1px dashed gray" }, [
                h(
                    GlassDock,
                    {
                        collapse: "closed",
                        expandOn: "press",
                        anchor: params.get("anchor") ?? "end",
                        collapsedLabel: "Tools",
                        backdropMode: "static",
                        "data-probe": "dock",
                    },
                    { default: () => [seat("Options"), seat("Download"), seat("Enlarge")], collapsed: handle },
                ),
            ]),
        ]),
    figure: () =>
        h("div", { style: "padding:24px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:1rem;inline-size:min(900px,100% - 48px)" }, [
            h("div", { style: "grid-column:1" }, "Fund balance by year"),
            h("div", { "data-probe": "control", style: "grid-column:2;display:flex;justify-content:flex-end;min-inline-size:196px" }, [
                h("div", { style: "display:flex;justify-content:flex-end;min-inline-size:44px" }, [
                    h(
                        GlassDock,
                        {
                            collapse: "closed",
                            expandOn: "press",
                            anchor: "end",
                            collapsedLabel: "Tools for Fund balance by year",
                            backdropMode: "static",
                            "data-probe": "dock",
                            ref: (d: unknown) => (w.__dock = d),
                        },
                        { default: () => [seat("Options"), seat("Download"), seat("Enlarge")], collapsed: handle },
                    ),
                ]),
            ]),
            h("button", { "data-probe": "outside", style: "grid-column:1;margin-top:120px" }, "outside"),
        ]),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(defineComponent(() => Scene)).mount("#app");
w.__ready = true;
