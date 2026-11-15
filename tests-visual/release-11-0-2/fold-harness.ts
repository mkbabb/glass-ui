// A long scrolling page with an untouched `collapse="open"` GlassDock fixed at its foot,
// which folds one idle window after mount. Imports are relative to `src/`, so the file
// mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";

document.body.style.cssText = "margin:0";

createApp({
    setup: () => () =>
        h("div", [
            h(
                "main",
                { style: "display:grid;gap:16px;padding:24px" },
                Array.from({ length: 120 }, (_, i) => h("p", { style: "margin:0;height:48px" }, `Row ${i + 1}`)),
            ),
            h("div", { style: "position:fixed;inset-inline:0;bottom:24px;display:flex;justify-content:center" }, [
                h(
                    GlassDock,
                    { collapse: "open", class: "fold-dock" },
                    {
                        default: () => [
                            h(DockControl, { "aria-label": "Home", active: true }, () => "⌂"),
                            h(DockControl, { "aria-label": "Search" }, () => "⌕"),
                            h(DockControl, { "aria-label": "Settings" }, () => "⚙"),
                            h(DockControl, { shape: "tab", "aria-label": "Day" }, () => "Day"),
                            h(DockControl, { shape: "tab", "aria-label": "Week" }, () => "Week"),
                        ],
                    },
                ),
            ]),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
