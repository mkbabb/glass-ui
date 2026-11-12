// A scrubber Slider at its minimum, shaped like fourier's Duration control (min 50,
// value 50), one per size rung, each 320px wide. Imports are relative to `src/`, so the
// file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h } from "vue";

import Slider from "../../src/components/slider/Slider.vue";

const sizes = ["sm", "md", "lg"] as const;

createApp({
    setup: () => () =>
        h(
            "main",
            { style: "display:grid;gap:40px;padding:48px;width:320px" },
            sizes.map((size) =>
                h("div", { "data-row": size }, [
                    h(Slider, { min: 50, max: 1000, step: 10, defaultValue: [50], size, "aria-label": `duration ${size}` }),
                ]),
            ),
        ),
}).mount("#app");
document.body.dataset.ready = "1";
