// glass-ui 10.1.3 — the engine witnesses' harness for an edge-anchored dock's first
// expand frame (value.js O-110). One page, one scene per `?scene=`, the real library
// components from `src/` under the demo's own cascade. Imports are relative to `src/`,
// so the same file mounts unchanged on a 10.1.2 tree: that is how each witness is shown
// RED on 10.1.2 and GREEN on 10.1.3.
import "../../demo/demo.css";
import { createApp, defineComponent, h, ref, type Component } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockSeparator from "../../src/components/dock/DockSeparator.vue";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;

/** A 24px glyph, as a consumer's icon component renders one inside its control. */
const glyph = () =>
    h("svg", { viewBox: "0 0 24 24", width: 24, height: 24, "aria-hidden": "true" }, [
        h("circle", {
            cx: 12,
            cy: 12,
            r: 8,
            fill: "none",
            stroke: "currentColor",
            "stroke-width": 2,
        }),
    ]);

const seat = (label: string, onClick?: () => void) =>
    h(DockControl, { "aria-label": label, "data-witness": label, onClick }, glyph);

const scenes: Record<string, Component> = {
    // fourier's canvas dock (`CanvasControlsDock.vue` in `VisualizationView.vue`): a
    // `fit-content` collapsible dock in a box pinned to one edge of a stage by that edge
    // alone (`position: absolute; top: 0.5rem; right: 0.5rem`), so the box is the dock's
    // width and grows away from the pinned edge. Its full pane is the view menu, publish,
    // equation, export and fullscreen; its summary a neutral glyph; and "Edit contour"
    // is its one `#persistent-end` control, present in both postures, on the anchored
    // side. `?anchor=left` pins the box by `left` instead, and seats "Edit contour" in
    // `#persistent`, again on the anchored side. A click on "Edit contour" counts in
    // `window.__edits`.
    "edge-anchor": defineComponent(() => {
        const edits = ref(0);
        w.__edits = 0;
        const edge = params.get("anchor") === "left" ? "left" : "right";
        const onEdit = () => {
            edits.value += 1;
            w.__edits = edits.value;
        };
        return () =>
            h("div", { style: "padding:8px" }, [
                h(
                    "div",
                    {
                        "data-witness": "stage",
                        style: "position:relative;block-size:480px;border-radius:12px;background:color-mix(in srgb, var(--foreground) 6%, transparent)",
                    },
                    [
                        h(
                            "div",
                            {
                                "data-witness": "anchor",
                                style: `position:absolute;top:0.5rem;${edge}:0.5rem;z-index:var(--z-controls)`,
                            },
                            h(
                                GlassDock,
                                { fitContent: true },
                                {
                                    default: () => [
                                        seat("View layers"),
                                        h(DockSeparator),
                                        seat("Publish to Gallery"),
                                        seat("Equation"),
                                        seat("Export frame"),
                                        h(DockSeparator),
                                        seat("Fullscreen"),
                                    ],
                                    collapsed: () =>
                                        h(
                                            "span",
                                            { "data-witness": "summary" },
                                            glyph(),
                                        ),
                                    [edge === "right"
                                        ? "persistent-end"
                                        : "persistent"]: () =>
                                        seat("Edit contour", onEdit),
                                },
                            ),
                        ),
                    ],
                ),
            ]);
    }),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(Scene).mount("#app");
w.__ready = true;
