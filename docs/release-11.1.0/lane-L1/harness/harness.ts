// Lane L1 witness harness. One page, three scenes, chosen by ?scene=. The same file runs
// on the branch and on a v11.0.0 tree (it imports the library by relative source path),
// so the probe reads the same DOM on both. On v11.0.0 the props it sets that do not exist
// yet (`edge`) fall through as attributes and change nothing.
import "./harness.css";
import { createApp, defineComponent, h, ref } from "vue";
import { GlassDock, DockControl } from "../../../../src/components/dock";
import { ScrollProgressRim } from "../../../../src/components/scroll-progress-rim";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "collapsed";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");

const glyph = () =>
    h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" }, [
        h("path", { d: "M2 8h12M8 2v12", stroke: "currentColor", "stroke-width": 2, fill: "none" }),
    ]);

const Collapsed = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        // A glyph and a short reading: the content-sized face.
        h("div", { "data-probe": "wide" }, [
            h(GlassDock, { collapse: "closed", backdropMode: "static", style: "pointer-events:none" }, {
                default: () => h("span", { class: "px-3" }, "Expanded"),
                collapsed: () =>
                    h("span", { "data-probe": "face", style: "display:inline-flex;align-items:center;gap:4px;font-variant-numeric:tabular-nums" }, [
                        glyph(),
                        h("span", "Now 12"),
                    ]),
            }),
        ]),
        // One glyph: the square face stays a circle.
        h("div", { "data-probe": "square" }, [
            h(GlassDock, { collapse: "closed", backdropMode: "static", style: "pointer-events:none" }, {
                default: () => h("span", { class: "px-3" }, "Expanded"),
                collapsed: () => h("span", { "data-probe": "face", style: "display:inline-flex" }, [glyph()]),
            }),
        ]),
    ]),
);

const progress = ref(Number(params.get("value") ?? "1"));
(window as unknown as { __setProgress: (v: number) => void }).__setProgress = (v) => {
    progress.value = v;
};

const Rim = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("div", { class: "host", "data-probe": "rim-host" }, [
            h(GlassDock, { collapse: false, backdropMode: "static" }, {
                default: () => [
                    h(DockControl, { "aria-label": "One" }, () => glyph()),
                    h(DockControl, { "aria-label": "Two" }, () => glyph()),
                    h(DockControl, { "aria-label": "Three" }, () => glyph()),
                    h("span", { class: "px-3 font-mono text-micro" }, "Reading"),
                ],
                persistent: () =>
                    h(ScrollProgressRim, {
                        value: progress.value,
                        max: 1,
                        edge: "border",
                        stops: ["rgb(255, 0, 255)"],
                    }),
            }),
        ]),
    ]),
);

const tabs = ["Overview", "Methods", "Results", "Notes"];
const current = ref(0);
(window as unknown as { __select: (i: number) => void }).__select = (i) => {
    current.value = i;
};

const Nav = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("div", { "data-probe": "nav" }, [
            h(GlassDock, { collapse: false, backdropMode: "static" }, {
                default: () =>
                    tabs.map((label, i) =>
                        h(
                            DockControl,
                            {
                                shape: "tab",
                                "aria-current": current.value === i ? "page" : undefined,
                                "data-tab": i,
                                onClick: () => (current.value = i),
                            },
                            () => label,
                        ),
                    ),
            }),
        ]),
    ]),
);

const scenes: Record<string, ReturnType<typeof defineComponent>> = { collapsed: Collapsed, rim: Rim, nav: Nav };
createApp(scenes[scene] ?? Collapsed).mount("#app");
(window as unknown as { __ready: boolean }).__ready = true;
