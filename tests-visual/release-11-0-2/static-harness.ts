// An open GlassDock with `backdrop-mode="static"` (or `live` with ?mode=live) over a
// striped page, in the light or dark scheme (?theme=dark): icon controls (one active),
// a compact control, tab controls (one active) and a separator. Imports are relative to
// `src/`, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockSeparator from "../../src/components/dock/DockSeparator.vue";

const q = new URLSearchParams(location.search);
if (q.get("theme") === "dark") document.documentElement.classList.add("dark");
document.body.style.cssText =
    "margin:0;min-height:100vh;background:repeating-linear-gradient(45deg,#e2553a 0 24px,#3a7be2 24px 48px)";

createApp({
    setup: () => () =>
        h("div", { style: "position:fixed;inset-inline:0;bottom:24px;display:flex;justify-content:center" }, [
            h(
                GlassDock,
                { backdropMode: q.get("mode") === "live" ? "live" : "static", collapse: false, class: "static-dock" },
                {
                    default: () => [
                        h(DockControl, { "aria-label": "Home", active: true }, () => "⌂"),
                        h(DockControl, { "aria-label": "Search" }, () => "⌕"),
                        h(DockControl, { compact: true, "aria-label": "Motion" }, () => "▢ Motion"),
                        h(DockSeparator),
                        h(DockControl, { shape: "tab", active: true, "aria-label": "Day" }, () => "Day"),
                        h(DockControl, { shape: "tab", "aria-label": "Week" }, () => "Week"),
                    ],
                },
            ),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
