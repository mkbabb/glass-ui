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

const scenes: Record<string, Component> = {
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
