// Lane L4 witness harness. One page, one scene per item, chosen by ?scene=. The same file
// runs on the branch and on a v11.0.0 tree (it imports the library by relative source
// path), so the probe reads the same DOM on both.
import "./harness.css";
import { createApp, defineComponent, h } from "vue";
import { GlassDock, DockControl } from "../../../../src/components/dock";
import { Blob, BLOB_CONFIG_DEFAULTS } from "../../../../src/components/blob";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "scheme";
// The dev server injects the library's pre-paint script, which sets the class (and an
// inline color-scheme) from the OS. The scheme scene models a consumer that sets `.dark`
// itself and runs no such script (daraksha), so it clears both first.
if (scene === "scheme") {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.removeProperty("color-scheme");
}
// `cls=dark` stamps the class; the OS scheme is the context's emulated colorScheme.
if (params.get("cls") === "dark" || params.get("theme") === "dark") document.documentElement.classList.add("dark");
const w = window as unknown as Record<string, unknown>;

// Count every frame request the page makes, from before the app mounts (the park probe).
const raf = window.requestAnimationFrame.bind(window);
w.__rafCalls = 0;
window.requestAnimationFrame = (cb: FrameRequestCallback) => {
    (w.__rafCalls as number)++;
    return raf(cb);
};

// ── O-175 (2) · the class is the mode ───────────────────────────────────────────────
const Scheme = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("div", { class: "probe-card", "data-probe": "card" }, [
            h("p", { "data-probe": "ink" }, "Station 4 · Line 2"),
            h("p", { class: "probe-muted", "data-probe": "muted" }, "Updated a minute ago"),
            h("div", { class: "probe-pop", "data-probe": "pop" }, "Open now"),
        ]),
    ]),
);

// ── O-185 · the dock grain: the page's only url() paint ──────────────────────────────
const glyph = () =>
    h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" }, [
        h("path", { d: "M2 8h12M8 2v12", stroke: "currentColor", "stroke-width": 2, fill: "none" }),
    ]);
const Grain = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("div", { "data-probe": "dock" }, [
            h(GlassDock, { collapse: false, backdropMode: "static" }, {
                default: () => [
                    h(DockControl, { "aria-label": "One" }, () => glyph()),
                    h(DockControl, { "aria-label": "Two" }, () => glyph()),
                    h(DockControl, { "aria-label": "Three" }, () => glyph()),
                    h(DockControl, { "aria-label": "Four" }, () => glyph()),
                    h(DockControl, { "aria-label": "Five" }, () => glyph()),
                ],
            }),
        ]),
        h("p", { style: "font-size:12px" }, "ok"),
    ]),
);

// ── O-204 (3) · the blob's paint past its box, and the offscreen park ────────────────
// `reach`: one body of raw radius 0.62 (0.62 × 0.625 = 0.3875 uv, past the wrapper's
// 0.3125 edge, inside the canvas's 0.5), frozen (tempo 0) so the frame is stable.
// `park`: the default animated blob, then scrolled 4000 px away.
const reach = params.get("blob") !== "park";
const config = reach
    ? {
          ...BLOB_CONFIG_DEFAULTS,
          geometry: { ...BLOB_CONFIG_DEFAULTS.geometry, bodyRadius: 0.62, satelliteCount: 0 },
          tempo: 0,
      }
    : BLOB_CONFIG_DEFAULTS;
const BlobScene = defineComponent(() => () =>
    h("div", null, [
        h("div", { class: "blob-host", "data-probe": "blob-host" }, [h(Blob, { config, color: "oklch(0.72 0.16 40)", "data-probe": "blob" })]),
        h("div", { class: "spacer" }),
    ]),
);

const scenes: Record<string, ReturnType<typeof defineComponent>> = { scheme: Scheme, grain: Grain, blob: BlobScene };
createApp(scenes[scene] ?? Scheme).mount("#app");
raf(() => raf(() => (w.__ready = true)));
