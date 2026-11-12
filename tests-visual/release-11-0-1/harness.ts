// glass-ui 11.0.1 — the owner's two dock cases as scenes, with the real components from
// `src/` under the demo's own cascade. Imports are relative to `src/`, so the same file
// mounts unchanged on a v11.0.0 tree (RED there, GREEN on 11.0.1).
//   ?scene=figure  a fit-content dock with a #persistent seat, a two-face layer group whose
//                  first face opens on a compact "Name ›" seat (active) and two icon seats,
//                  and a one-seat second face. `active=page` opens on the narrow face,
//                  `end=1` adds a #persistent-end seat, `collapse=open|closed`,
//                  `radius-dock=<length>` sets the consumer's `--radius-dock`.
//   ?scene=focus   an open dock whose middle seat is a compact "Focus" label seat.
import "../../demo/demo.css";
import { createApp, h } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockLayer from "../../src/components/dock/DockLayer.vue";
import DockLayerGroup from "../../src/components/dock/DockLayerGroup.vue";

const q = new URLSearchParams(location.search);
const scene = q.get("scene") ?? "figure";
const active = q.get("active") === "page" ? "page" : "pages";
const end = q.get("end") === "1";
const collapse = q.get("collapse") === "open" ? "open" : "closed";
const radius = q.get("radius-dock");
if (radius) document.documentElement.style.setProperty("--radius-dock", radius);

const glyph = () =>
    h("svg", { viewBox: "0 0 24 24", width: 20, height: 20, "aria-hidden": "true" }, [
        h("circle", { cx: 12, cy: 12, r: 8, fill: "none", stroke: "currentColor", "stroke-width": 2 }),
    ]);

const stage = (child: ReturnType<typeof h>) =>
    h("div", { style: "position:fixed;inset-inline:0;bottom:48px;display:flex;justify-content:center" }, [child]);

const figure = () =>
    stage(
        h(
            GlassDock,
            { fitContent: true, collapse, collapsedLabel: "open the dock", class: "witness-dock" },
            {
                persistent: () => h(DockControl, { "aria-label": "Theme", "data-witness": "theme" }, glyph),
                ...(end ? { "persistent-end": () => h(DockControl, { "aria-label": "Play" }, glyph) } : {}),
                collapsed: () => h("span", { "aria-hidden": "true" }, "✎"),
                default: () =>
                    h(DockLayerGroup, { active, showSwitcher: false }, () => [
                        h(DockLayer, { id: "pages", label: "Pages" }, () => [
                            h(
                                DockControl,
                                { compact: true, active: true, "aria-label": "Name", "data-witness": "wide" },
                                () => [glyph(), h("span", "Name ›")],
                            ),
                            h(DockControl, { "aria-label": "Colour" }, glyph),
                            h(DockControl, { "aria-label": "Motion" }, glyph),
                        ]),
                        h(DockLayer, { id: "page", label: "Controls" }, () => [
                            h(DockControl, { "aria-label": "Pages" }, glyph),
                        ]),
                    ]),
            },
        ),
    );

const focus = () =>
    stage(
        h(
            GlassDock,
            { fitContent: true, collapse: false, class: "witness-dock" },
            {
                default: () => [
                    h(DockControl, { "aria-label": "Back" }, glyph),
                    h(DockControl, { compact: true, "aria-label": "Focus", "data-witness": "wide" }, () => [
                        glyph(),
                        h("span", "Focus"),
                    ]),
                    h(DockControl, { "aria-label": "Sections" }, glyph),
                ],
            },
        ),
    );

createApp({ render: () => (scene === "focus" ? focus() : figure()) }).mount("#app");
