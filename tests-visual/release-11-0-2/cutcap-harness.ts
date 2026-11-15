// daraksha's glass-only repro `dock-cutcap`, ported to `src/`: a collapsed GlassDock
// with a #persistent seat and a two-layer DockLayerGroup. `?active=page` opens on the
// narrow layer, `?end=1` adds a #persistent-end seat and `?radius-dock=` retunes the
// dock corner token, as the site does. Imports are relative to `src/`, so the file
// mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockLayer from "../../src/components/dock/DockLayer.vue";
import DockLayerGroup from "../../src/components/dock/DockLayerGroup.vue";

const q = new URLSearchParams(location.search);
const active = q.get("active") === "page" ? "page" : "pages";
const end = q.get("end") === "1";
const radius = q.get("radius-dock");
if (radius) document.documentElement.style.setProperty("--radius-dock", radius);

createApp({
    setup: () => () =>
        h("div", { style: "position:fixed;inset-inline:0;bottom:24px;display:flex;justify-content:center" }, [
            h(
                GlassDock,
                { fitContent: true, collapsedLabel: "open the dock", class: "repro-dock" },
                {
                    persistent: () => h(DockControl, { "aria-label": "Theme" }, () => "◐"),
                    ...(end ? { "persistent-end": () => h(DockControl, { "aria-label": "Play" }, () => "▷") } : {}),
                    collapsed: () => h("span", "✎"),
                    default: () =>
                        h(DockLayerGroup, { active, showSwitcher: false }, () => [
                            h(DockLayer, { id: "pages", label: "Pages" }, () => [
                                h(DockControl, { compact: true, active: true, "aria-label": "Name", class: "seat" }, () => "✎ Name ›"),
                                h(DockControl, { "aria-label": "Colour", class: "seat" }, () => "◍"),
                                h(DockControl, { "aria-label": "Motion", class: "seat" }, () => "▢"),
                            ]),
                            h(DockLayer, { id: "page", label: "Controls" }, () => [h(DockControl, { "aria-label": "Pages" }, () => "←")]),
                        ]),
                },
            ),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
