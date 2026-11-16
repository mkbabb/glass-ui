// What the exits harness does not hold for the reduced-motion witnesses: a site's own
// fade (an unlayered rule in the page, `transition: opacity 144ms`), a collapsible dock
// that a press on its summary unfolds and Escape folds, and a navigation run of four
// seats whose `aria-current` moves on a press, and a Slider. Imports are relative to
// `src/`, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import Slider from "../../src/components/slider/Slider.vue";

document.body.style.cssText = "margin:0;min-height:100vh;background:#e9e4dc";

const off = ref(false);
const current = ref(0);
const seats = ["Home", "Search", "Library", "Settings"];
const btn = "padding:10px 14px;background:#fff;color:#000;border-radius:8px;font:14px sans-serif";

createApp({
    setup: () => () =>
        h("div", { style: "padding:24px 8px;display:flex;flex-direction:column;align-items:center;gap:32px" }, [
            h("button", { "data-testid": "r-site-toggle", style: btn, onClick: () => (off.value = !off.value) }, "Toggle the site's fade"),
            h("div", { class: "site-fade", "data-testid": "r-site", "data-off": off.value ? "" : undefined, style: "width:160px;height:48px;background:#13e" }),
            h(
                GlassDock,
                { collapse: "closed", expandOn: "press", class: "r-fold", "aria-label": "Fold" },
                {
                    collapsed: () => h("span", { style: "padding:0 12px" }, "Menu"),
                    default: () => [
                        h(DockControl, { "aria-label": "One" }, () => "1"),
                        h(DockControl, { "aria-label": "Two" }, () => "2"),
                        h(DockControl, { "aria-label": "Three" }, () => "3"),
                        h(DockControl, { "aria-label": "Four" }, () => "4"),
                    ],
                },
            ),
            h(
                GlassDock,
                { collapse: false, class: "r-run", "aria-label": "Run" },
                {
                    default: () =>
                        seats.map((s, i) =>
                            h(
                                DockControl,
                                {
                                    "aria-label": s,
                                    "aria-current": current.value === i ? "page" : undefined,
                                    "data-testid": `r-seat-${i}`,
                                    onClick: () => (current.value = i),
                                },
                                () => s.slice(0, 1),
                            ),
                        ),
                },
            ),
            h("div", { "data-testid": "r-slider", style: "width:240px;padding:12px" }, [h(Slider, { defaultValue: [40], "aria-label": "Level" })]),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
