// A dashboard rail reduced to its morph: a vertical GlassDock fixed at the page's top-left
// (`anchor="start"`), a persistent region with a 44 px crest and a site layer, four
// sections, and a foot in `#persistent-end`. The consumer yields the site layer, the
// layers and the foot on `.collapsed:not([data-morphing])` and takes the site layer and
// the foot out of flow during a collapsing morph, as atlas's site dock does.
// `window.__expand()` / `__collapse()` drive it. Imports are relative to `src/`, so the
// file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";

if (new URLSearchParams(location.search).get("theme") === "dark") document.documentElement.classList.add("dark");

const style = document.createElement("style");
style.textContent = `
    .rg-rail { position: fixed; inset-block-start: 20px; inset-inline-start: 20px; --dock-collapsed-padding: 0px; }
    .rg-rail .rg-crest { inline-size: 44px; block-size: 44px; border-radius: 50%; background: #c33; display: grid; place-items: center; color: white; font: 600 13px system-ui; }
    .rg-rail .rg-site { display: grid; gap: 8px; }
    .rg-rail .dock-layer--full { inline-size: 72px; }
    .rg-rail.collapsed:not([data-morphing]) .dock-layers,
    .rg-rail.collapsed:not([data-morphing]) .dock-persistent-end,
    .rg-rail.collapsed:not([data-morphing]) .rg-site { display: none; }
    .rg-rail.collapsed[data-morphing] .dock-persistent > .rg-site { position: absolute; inset-block-start: 52px; inset-inline: 0; }
    .rg-rail.collapsed[data-morphing] .dock-persistent-end { position: absolute; inset-block-end: 8px; inset-inline: 0; margin: 0; }
`;
document.head.append(style);

const w = window as unknown as { __expand: () => void; __collapse: () => void };
const rail = ref<{ expand: () => void; collapse: () => void } | null>(null);
w.__expand = () => rail.value?.expand();
w.__collapse = () => rail.value?.collapse();

createApp({
    setup: () => () =>
        h("div", { style: "min-block-size:100vh;background:var(--background)" }, [
            h(
                GlassDock,
                {
                    ref: rail,
                    orientation: "vertical",
                    anchor: "start",
                    collapse: "closed",
                    expandOn: "press",
                    class: "rg-rail",
                    "data-witness": "rail",
                },
                {
                    persistent: () => [
                        h("div", { class: "rg-crest", "data-witness": "crest" }, "TIL"),
                        h("div", { class: "rg-site", "data-witness": "site" }, [
                            h(DockControl, { "aria-label": "Dashboards" }, () => "D"),
                            h(DockControl, { "aria-label": "Search" }, () => "S"),
                        ]),
                    ],
                    default: () =>
                        ["I", "II", "III", "IV"].map((n) => h(DockControl, { "aria-label": `Section ${n}` }, () => n)),
                    "persistent-end": () => [
                        h("div", { "data-witness": "foot", style: "display:grid;gap:8px" }, [
                            h(DockControl, { "aria-label": "Filters" }, () => "F"),
                            h(DockControl, { "aria-label": "Theme" }, () => "T"),
                        ]),
                    ],
                },
            ),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
