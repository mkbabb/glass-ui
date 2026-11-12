// glass-ui 11.0.1, critic round 2 — two scenes the release harness does not carry, with
// the real components from `src/` under the demo's own cascade.
//   ?scene=switch    the figure dock (a #persistent seat, a #persistent-end seat, a wide
//                    face and a one-seat face), open, its active face set by
//                    `window.__layer("pages" | "page")`: the morph between a wide and a
//                    narrow active layer.
//   ?scene=press     the figure dock, folded, with 11.0.0's `expandOn="press"`: a dock
//                    that opens only on a press or Enter/Space on its summary.
//   ?scene=vertical  a vertical fit-content dock of four icon seats that collapses
//                    (`collapse=open|closed`), in a 600 px column.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockLayer from "../../src/components/dock/DockLayer.vue";
import DockLayerGroup from "../../src/components/dock/DockLayerGroup.vue";

const q = new URLSearchParams(location.search);
const scene = q.get("scene") ?? "switch";
const collapse = q.get("collapse") === "open" ? "open" : "closed";

const glyph = () =>
    h("svg", { viewBox: "0 0 24 24", width: 20, height: 20, "aria-hidden": "true" }, [
        h("circle", { cx: 12, cy: 12, r: 8, fill: "none", stroke: "currentColor", "stroke-width": 2 }),
    ]);

const layer = ref<"pages" | "page">("pages");
(window as unknown as { __layer: (id: "pages" | "page") => void }).__layer = (id) => {
    layer.value = id;
};

const switcher = () =>
    h("div", { style: "position:fixed;inset-inline:0;bottom:48px;display:flex;justify-content:center" }, [
        h(
            GlassDock,
            { fitContent: true, collapse: false, class: "witness-dock" },
            {
                persistent: () => h(DockControl, { "aria-label": "Theme" }, glyph),
                "persistent-end": () => h(DockControl, { "aria-label": "Play" }, glyph),
                default: () =>
                    h(
                        DockLayerGroup,
                        {
                            active: layer.value,
                            "onUpdate:active": (v: "pages" | "page") => (layer.value = v),
                            showSwitcher: false,
                        },
                        () => [
                            h(DockLayer, { id: "pages", label: "Pages" }, () => [
                                h(DockControl, { compact: true, active: true, "aria-label": "Name", "data-witness": "wide" }, () => [
                                    glyph(),
                                    h("span", "Name ›"),
                                ]),
                                h(DockControl, { "aria-label": "Colour" }, glyph),
                                h(DockControl, { "aria-label": "Motion" }, glyph),
                            ]),
                            h(DockLayer, { id: "page", label: "Controls" }, () => [
                                h(DockControl, { "aria-label": "Pages" }, glyph),
                            ]),
                        ],
                    ),
            },
        ),
    ]);

const pressOnly = () =>
    h("div", { style: "position:fixed;inset-inline:0;bottom:48px;display:flex;justify-content:center" }, [
        h(
            GlassDock,
            { fitContent: true, collapse: "closed", expandOn: "press", collapsedLabel: "open the dock", class: "witness-dock" },
            {
                collapsed: () => h("span", { "aria-hidden": "true" }, "✎"),
                default: () => ["One", "Two", "Three"].map((l) => h(DockControl, { "aria-label": l }, glyph)),
            },
        ),
    ]);

const vertical = () =>
    h("div", { style: "position:fixed;inset-block:0;inset-inline-start:48px;display:flex;align-items:center;block-size:600px" }, [
        h(
            GlassDock,
            { fitContent: true, collapse, orientation: "vertical", collapsedLabel: "open the dock", class: "witness-dock" },
            {
                collapsed: () => h("span", { "aria-hidden": "true" }, "✎"),
                default: () => ["One", "Two", "Three", "Four"].map((l) => h(DockControl, { "aria-label": l }, glyph)),
            },
        ),
    ]);

createApp({ render: () => (scene === "vertical" ? vertical() : scene === "press" ? pressOnly() : switcher()) }).mount("#app");
