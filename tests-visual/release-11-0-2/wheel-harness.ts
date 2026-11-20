// A horizontal GlassDock held open in a 240 px column, its run of fourteen controls
// overflowing, on a page four viewports tall (`?orientation=vertical` for a vertical dock
// in a 240 px tall box). Imports are relative to `src/`, so the file mounts unchanged on
// an older tree.
import "../../demo/demo.css";
import { createApp, h } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";

const vertical = new URLSearchParams(location.search).get("orientation") === "vertical";

createApp({
    setup: () => () =>
        h("div", { style: "min-block-size:400vh;background:var(--background);padding:600px 80px" }, [
            h("div", { style: vertical ? "block-size:240px;display:flex" : "inline-size:240px" }, [
                h(
                    GlassDock,
                    { collapse: false, orientation: vertical ? "vertical" : "horizontal", "data-witness": "dock" },
                    () =>
                        Array.from({ length: 14 }, (_, i) =>
                            h(DockControl, { "aria-label": `Control ${i + 1}` }, () => String(i + 1)),
                        ),
                ),
            ]),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
