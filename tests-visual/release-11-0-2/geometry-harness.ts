// Sliders at one value (`?value=`, 0 to 100) for the geometry reading: a scrubber and a
// spectrum at sm, md and lg, horizontal (320 px) and vertical (12rem), plus one
// horizontal inverted, one RTL (the page's `dir` and the Slider's) and one vertical
// inverted scrubber at md. Each root carries
// `data-cell="<variant>-<size>-<orientation>[-inverted|-rtl]"`. `?theme=dark` for the
// dark scheme. Imports are relative to `src/`, so the file mounts unchanged on an
// older tree.
import "../../demo/demo.css";
import { createApp, h } from "vue";

import Slider from "../../src/components/slider/Slider.vue";

const q = new URLSearchParams(location.search);
const value = Number(q.get("value") ?? "50");
if (q.get("theme") === "dark") document.documentElement.classList.add("dark");
document.body.style.cssText = "margin:0;background:var(--background)";

type Cell = { variant: "scrubber" | "spectrum"; size: "sm" | "md" | "lg"; vertical: boolean; inverted?: boolean; rtl?: boolean };
const cells: Cell[] = [];
for (const variant of ["scrubber", "spectrum"] as const)
    for (const size of ["sm", "md", "lg"] as const)
        for (const vertical of [false, true]) cells.push({ variant, size, vertical });
cells.push({ variant: "scrubber", size: "md", vertical: false, inverted: true });
cells.push({ variant: "scrubber", size: "md", vertical: false, rtl: true });
cells.push({ variant: "scrubber", size: "md", vertical: true, inverted: true });

const name = (c: Cell) =>
    `${c.variant}-${c.size}-${c.vertical ? "vertical" : "horizontal"}${c.inverted ? "-inverted" : ""}${c.rtl ? "-rtl" : ""}`;

createApp({
    setup: () => () =>
        h(
            "main",
            { style: "display:flex;flex-wrap:wrap;gap:32px;padding:32px;align-items:center" },
            cells.map((c) =>
                h("div", { dir: c.rtl ? "rtl" : "ltr", style: c.vertical ? "" : "width:320px" }, [
                    h(Slider, {
                        "data-cell": name(c),
                        min: 0,
                        max: 100,
                        step: 1,
                        defaultValue: [value],
                        size: c.size,
                        variant: c.variant,
                        orientation: c.vertical ? "vertical" : "horizontal",
                        inverted: c.inverted,
                        dir: c.rtl ? "rtl" : undefined,
                        style: c.variant === "spectrum" ? "--glass-slider-track-background:linear-gradient(90deg,#e33,#3a3,#33e)" : undefined,
                        "aria-label": name(c),
                    }),
                ]),
            ),
        ),
}).mount("#app");
document.body.dataset.ready = "1";
