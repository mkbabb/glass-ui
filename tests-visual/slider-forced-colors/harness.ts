// Three Sliders, one per focus arm: the scrubber, the invalid scrubber and the spectrum.
// Each sits alone in a padded row so its focus mark has room to paint. Imports are
// relative to `src/`, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h } from "vue";

import Slider from "../../src/components/slider/Slider.vue";

const rows = [
    { id: "scrubber", props: {} },
    { id: "invalid", props: { invalid: true } },
    { id: "spectrum", props: { variant: "spectrum" } },
];

createApp({
    setup: () => () =>
        h(
            "main",
            { style: "display:grid;gap:48px;padding:48px;max-width:420px" },
            rows.map((r) =>
                h("div", { "data-row": r.id, style: "padding:12px" }, [
                    h(Slider, { defaultValue: [40], "aria-label": r.id, ...r.props }),
                ]),
            ),
        ),
}).mount("#app");
document.body.dataset.ready = "1";
