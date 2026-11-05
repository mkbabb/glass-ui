// glass-ui U/B7 (atlas, proposed 10.2.0) — the engine witnesses' harness. One page, one
// scene per `?scene=`, the real library components from `src/` under the demo's own
// cascade. Imports are relative to `src/`, so the same file mounts unchanged on the
// 10.1.1 tree (bbf176f02): that is how each witness is shown RED there and GREEN here.
import "../../demo/demo.css";
import { createApp, defineComponent, h, onBeforeUnmount, onMounted, ref, shallowRef, type Component } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import Aurora from "../../src/components/aurora/Aurora.vue";
import { DEFAULT_AURORA_CONFIG, type AuroraConfig } from "../../src/components/aurora/constants/presets";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;
const SEATS = Number(params.get("seats") ?? 16);

/** A tall page behind the dock, so a page scroll is visible as `scrollY`. */
const page = () =>
    h(
        "main",
        { style: "min-height:4000px;padding:24px 24px 24px 120px" },
        Array.from({ length: 40 }, (_, i) => h("p", { style: "margin:0 0 80px" }, `Paragraph ${i + 1}`)),
    );

/** A vertical dock on the left edge with `SEATS` labelled seats, collapsed at rest. */
function verticalDock(extra: Record<string, unknown> = {}) {
    const dock = ref<InstanceType<typeof GlassDock> | null>(null);
    const clicks = ref<string[]>([]);
    w.__dock = () => dock.value;
    w.__clicks = clicks.value;
    return () =>
        h(
            "div",
            {
                style: "position:fixed;inset-inline-start:16px;inset-block-start:16px;z-index:var(--z-dock);--dock-max-block-size:min(60vh, 480px)",
            },
            h(
                GlassDock,
                { ref: dock, orientation: "vertical", ...extra },
                {
                    collapsed: () => h(DockControl, { "aria-label": "Sections", "data-witness": "summary" }, () => "≡"),
                    default: () =>
                        Array.from({ length: SEATS }, (_, i) =>
                            h(
                                DockControl,
                                {
                                    shape: "tab",
                                    "aria-label": `Section ${i + 1}`,
                                    "data-seat": String(i + 1),
                                    onClick: () => clicks.value.push(`Section ${i + 1}`),
                                },
                                () => `Section ${i + 1}`,
                            ),
                        ),
                },
            ),
        );
}

/** The aurora behind a tall page, its nuclei leaning with the scroll fraction: the
 *  config shape atlas fed it before U/B7 (`useAuroraConfig` tide + section lean). */
const auroraScroll = defineComponent(() => {
    const config = shallowRef<AuroraConfig>(DEFAULT_AURORA_CONFIG);
    const onScroll = () => {
        const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        const f = scrollY / max;
        config.value = {
            ...DEFAULT_AURORA_CONFIG,
            nuclei: DEFAULT_AURORA_CONFIG.nuclei.map((n, i) => ({ ...n, y: n.y + (i % 2 ? 0.2 : -0.2) * f })),
        };
    };
    onMounted(() => addEventListener("scroll", onScroll, { passive: true }));
    onBeforeUnmount(() => removeEventListener("scroll", onScroll));
    return () =>
        h("div", [
            h(Aurora, {
                config: config.value,
                renderMode: (params.get("mode") as "webgl" | "css" | "auto") ?? "auto",
                runtimeOptions: {
                    initStrategy: "eager",
                    ...(params.get("engine") === "webgl2" ? { forceBackend: "webgl2" as const } : {}),
                },
                onRendererStatus: (status: unknown) => {
                    w.__auroraStatus = status;
                },
                style: "position:fixed;inset:0;z-index:0",
            }),
            h("div", { style: "position:relative;z-index:1" }, page()),
        ]);
});

/** A press-only figure dock (`anchor`, static backdrop), its summary a 44 px handle. */
const figureDock = (anchor: string, orientation: "horizontal" | "vertical" = "horizontal") =>
    h(
        GlassDock,
        {
            orientation,
            collapse: "closed",
            expandOn: "press",
            anchor,
            collapsedLabel: "Tools for the figure",
            backdropMode: "static",
            "data-probe": "dock",
        },
        {
            default: () =>
                ["Options", "Download", "Enlarge", "Close"].map((label) =>
                    h(DockControl, { "aria-label": label, "data-seat": label }, () => label[0]),
                ),
            collapsed: () =>
                h("span", { "data-probe": "handle", style: "display:grid;place-items:center;inline-size:44px;block-size:44px" }, "≡"),
        },
    );

const scenes: Record<string, Component> = {
    // anchor · a figure dock in a 720 px flex or grid row (or a 480 px column for a
    // vertical dock) with free space; `dir=rtl` mirrors the row.
    "figure-row": defineComponent(() => () => {
        const vertical = params.get("orientation") === "vertical";
        const box = params.get("box") === "grid" ? "display:grid" : vertical ? "display:flex;flex-direction:column" : "display:flex";
        const size = vertical ? "block-size:480px;inline-size:120px" : "inline-size:720px";
        return h("div", { style: "padding:24px", dir: params.get("dir") ?? "ltr" }, [
            h("div", { "data-probe": "row", style: `${box};${size};outline:1px dashed gray` }, [
                figureDock(params.get("anchor") ?? "end", vertical ? "vertical" : "horizontal"),
            ]),
        ]);
    }),
    // anchor · atlas's figure lane: a content-sized flex-end wrapper in a flex-end control.
    "figure-atlas": defineComponent(() => () =>
        h("div", { style: "padding:24px;display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:1rem;inline-size:min(900px,100% - 48px)" }, [
            h("div", { style: "grid-column:1" }, "Fund balance by year"),
            h(
                "div",
                { "data-probe": "control", style: "grid-column:3;display:flex;flex:none;align-items:flex-start;gap:.75rem;justify-content:flex-end;min-inline-size:196px" },
                [h("div", { style: "display:flex;justify-content:flex-end;min-inline-size:44px" }, [figureDock("end")])],
            ),
        ]),
    ),

    // D-5 · a vertical dock opened by its owner, then a seat tapped mid-morph.
    "dock-morph": defineComponent(() => {
        const dock = verticalDock();
        return () => h("div", [page(), dock()]);
    }),
    // §2.4 / R-INTERACT §7 · the expanded run under its mandatory snap.
    "dock-run": defineComponent(() => {
        const dock = verticalDock({ collapse: params.get("open") === "1" ? "open" : "closed" });
        return () => h("div", [page(), dock()]);
    }),
    // F6 · the WebGL witness page.
    "aurora-scroll": auroraScroll,
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene ${scene}`);
createApp(Scene).mount("#app");
w.__ready = true;
