// supportsBackdropRefract — the RUNTIME LATCH for the `.glass-lens` refraction
// composite, replacing the WebKit-lying `@supports (backdrop-filter: url(#…))` gate.
//
// THE LIE THIS REPLACES. `backdrop-filter: url(#…)` is Chromium-only (WebKit bug
// 245510 open, Firefox not shipping). The old gate sat the whole `.glass-lens`
// composite behind `@supports (backdrop-filter: url("#glass-refract"))` — but WebKit
// 26.5 returns TRUE for that condition in EVERY form (fragment, gate, the shipped
// data-URI value, bare and after `blur()`) and retains the whole composite in computed
// style, then DROPS the entire value at paint, blur leg included. So the gate engaged,
// the gated declaration overrode the un-gated blur base, and `.glass-lens` shipped on
// the Safari floor with NO backdrop filter at all — worse than the blur-only degrade
// the recipe promises. A CSS `@supports` cannot discriminate this engine: it lies by
// accepting at parse (the `supportsCssTimeline` lesson — never trust a detector that
// cannot reject).
//
// THE LATCH. `armGlassRefract()` sets `:root[data-glass-refract="on"]` once per session
// when — and only when — the composite is paint-proven, honesty-ordered:
//   1 · no CSS Typed-OM / no document (SSR)                            → OFF
//   2 · the engine does not even CLAIM url() support (Firefox-class)   → OFF
//   3 · the engine returns true for a GARBAGE value (happy-dom/jsdom
//       always-true shim class)                                       → OFF
//   4 · the FUNCTIONAL arm — the accept-and-drop class (WebKit) passes
//       every supports/computed read while paint drops the url() value,
//       so it is discriminable ONLY by exercising the url()-referenced
//       -filter raster path. Canvas 2D `ctx.filter = url(#f)` rides the
//       SAME capability: Chromium applies the SVG filter to the raster,
//       WebKit ignores it. Validated per engine by BJ.W-REFRACT-LATCH's
//       live-π (Chromium red / WebKit blue) before it is trusted.
//
// The functional arm is a PROXY (canvas 2D raster ≠ the backdrop-filter compositing
// pipeline) and one-directional — it can only add confidence, never override an honest
// rejection. If a future engine paints backdrop-filter url() but not canvas url() (or
// vice-versa), the born-RED `gate:refract-lens-never-sharper` (tests-visual) keeps the
// scoping honest forever: the lens may never paint sharper than its own blur base on any
// engine, latched ON or OFF.
//
// Colocation: A07 — homes in `composables/glass/` beside the other glass runtime
// detectors. `arm*` (not `use*`) signals shape: a one-shot idempotent side-effect
// installer that returns void, kin to `installDarkModeSync`. `sideEffects: ['*.css']`
// prunes module-load side effects, so the arm is EXPLICIT — the consuming app calls it
// once at bootstrap (the demo does so in `demo/main.ts`).

const REFRACT_ATTR = "data-glass-refract";

let armed = false;

/**
 * The functional arm. Exercises the url()-referenced-filter raster path that
 * `backdrop-filter: url(#…)` depends on, via canvas 2D `ctx.filter`: draw blue, apply
 * an SVG filter that forces every pixel red, read back. RED → the engine ran the url()
 * filter in its raster (Chromium); BLUE → it dropped the value (WebKit accept-and-drop).
 * Needs a live DOM mount for the filter node; any failure resolves to `false` (OFF).
 */
function probeCanvasFilterRaster(): boolean {
    try {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "0");
        svg.setAttribute("height", "0");
        svg.style.position = "absolute";
        const id = "gl-refract-probe";
        const filter = document.createElementNS(svgNS, "filter");
        filter.setAttribute("id", id);
        const cm = document.createElementNS(svgNS, "feColorMatrix");
        cm.setAttribute("type", "matrix");
        // R←1, G←0, B←0, A←A: force opaque red regardless of the drawn color.
        cm.setAttribute("values", "0 0 0 0 1  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0");
        filter.appendChild(cm);
        svg.appendChild(filter);

        const mount = document.body ?? document.documentElement;
        mount.appendChild(svg);
        try {
            const canvas = document.createElement("canvas");
            canvas.width = 4;
            canvas.height = 4;
            const ctx = canvas.getContext("2d");
            if (!ctx) return false;

            ctx.fillStyle = "rgb(0,0,255)";
            ctx.fillRect(0, 0, 4, 4);
            ctx.filter = `url("#${id}")`;
            ctx.fillStyle = "rgb(0,0,255)";
            ctx.fillRect(0, 0, 4, 4);

            const px = ctx.getImageData(2, 2, 1, 1).data;
            return px[0] > 200 && px[2] < 60;
        } finally {
            svg.remove();
        }
    } catch {
        return false;
    }
}

/**
 * True only when `.glass-lens`'s `backdrop-filter: url(#…)` composite is paint-proven on
 * this engine — honesty-ordered, with the functional arm defeating the WebKit
 * accept-and-drop lie that no `CSS.supports`/computed read can catch.
 */
export function supportsBackdropRefract(): boolean {
    if (typeof CSS === "undefined" || typeof CSS.supports !== "function") return false;
    if (typeof document === "undefined") return false;
    // Honest rejection — the engine does not even claim url() support.
    if (!CSS.supports("backdrop-filter", 'url("#glass-refract")')) return false;
    // Always-true shim guard — a real engine rejects an invalid value.
    if (CSS.supports("backdrop-filter", "gl-not-a-real-filter")) return false;
    // The accept-and-drop class is discriminable only functionally.
    return probeCanvasFilterRaster();
}

/**
 * Arm the `.glass-lens` refraction once per session: set `:root[data-glass-refract="on"]`
 * iff {@link supportsBackdropRefract} proves the composite paints. Idempotent, SSR-safe,
 * and DOM-ready-deferred (the functional arm needs a mount point). With the latch OFF the
 * lens degrades to its un-gated blur base — the intended Safari-floor degrade.
 */
export function armGlassRefract(): void {
    if (armed || typeof document === "undefined") return;

    const set = (): void => {
        if (armed) return;
        armed = true;
        if (supportsBackdropRefract()) {
            document.documentElement.setAttribute(REFRACT_ATTR, "on");
        }
    };

    if (document.body) {
        set();
    } else {
        document.addEventListener("DOMContentLoaded", set, { once: true });
    }
}
