/**
 * Aurora adaptive render substrate (AM.W1; `aurora-lazy-init §3.1`).
 *
 * Aurora is NEVER retired — the warm wash composites under every branch. Only
 * the *substrate* adapts: the animated WebGL field on capable devices, the
 * static CSS-gradient placeholder (a complete render of the same palette) on
 * low-power / reduced-motion / save-data devices.
 */
import { probeWebGL2Renderer } from "../../../composables/glass/webgl/useWebGLCanvas";

export type AuroraRenderMode = "webgl" | "css" | "auto";

/**
 * Detect a SOFTWARE / CPU WebGL renderer (SwiftShader, llvmpipe, the Microsoft
 * Basic Render Driver) via the shared `probeWebGL2Renderer` capability helper
 * (BB.W-CI-GREEN — the substrate owns the SINGLE `getContext("webgl2")`
 * bootstrap; this consumer reads the renderer STRING through it rather than
 * creating a second probe context, per `proof:webgl-substrate-single`).
 *
 * WHY this is a `"css"` signal (the N.W5 Defect-A root cause, proven live under
 * the playwright SwiftShader harness): a full-viewport WebGL2 surface is a
 * compositor layer the rasteriser must re-raster on every composite. On a
 * software rasteriser that per-composite cost is so high that a REAL pointer
 * interaction — which forces a composite — starves the renderer's input ack and
 * the page goes UNRESPONSIVE (the headless-Chromium hang; the same severe jank a
 * GPU-blocklisted user feels). Neither a frame-cadence cap, a backing-store
 * shrink, nor a reduced-motion park cures it (all keep the live GL layer);
 * ONLY *not creating the WebGL surface* does. So a software renderer takes the
 * `"css"` substrate — the static gradient placeholder is a complete render of the
 * same palette, composites cheaply, and never stalls input. A blocklisted-GPU
 * user gets a smooth atmosphere instead of a janky/hanging one.
 *
 * A `null` probe (no WebGL2 / extension masked / throw) returns `false` — we
 * never downgrade a renderer we cannot PROVE is software (the `"css"` path is the
 * conservative-but-lossy choice, so a false miss keeps the richer default).
 */
export function isSoftwareWebGLRenderer(): boolean {
    // BB.W-AURORA-SWRASTER — the probe call is wrapped: a THROWING probe (a partial
    // webgl2 stub with no `getExtension`, an SSR/happy-dom shim) is morally a `null`
    // probe — "cannot prove software", so we keep the richer default (`false`). This
    // matters now the guard runs for forced `mode:"webgl"` too: the probe is reached
    // in envs the `"auto"`-only gate never exercised.
    let r: string | null;
    try {
        r = probeWebGL2Renderer();
    } catch {
        // fail-explicit: a befitting swallow — a THROWING probe (a partial webgl2
        // stub with no getExtension, an SSR/happy-dom shim) is morally a `null` probe
        // ("cannot prove software"). Returning `false` SURFACES the un-proven state:
        // the conservative non-downgrade keeps the richer WebGL default, never a
        // silent forced "css" fall on an env we could not certify.
        return false;
    }
    if (r === null) return false;
    return (
        r.includes("swiftshader") ||
        r.includes("llvmpipe") ||
        r.includes("software") ||
        r.includes("basic render") ||
        r.includes("microsoft basic")
    );
}

/**
 * Resolve-mode options. The software-raster GUARD is the safe DEFAULT (see
 * {@link resolveRenderMode}); the single ESCAPE is `forceWebGLUnderSoftwareRaster`
 * (BB.W-AURORA-SWRASTER).
 */
export interface ResolveRenderModeOptions {
    /**
     * Opt OUT of the universal software-raster guard. When `true`, a forced
     * `mode:"webgl"`/`mode:"capture"` arm ARMS the live WebGL2 surface even on a
     * detected software renderer (SwiftShader / llvmpipe / MS Basic Render) — for
     * a deterministic test that ACCEPTS the per-composite raster cost. Default
     * `false`: the guard is the SAFE default (a software-raster signal forces
     * `"css"` regardless of the requested mode, so a consumer who pins
     * `mode:"webgl"` on a headless / GPU-blocklisted device gets the static
     * ground, never the page-wedging hang). The escape is NAMED + recorded,
     * never silent.
     */
    forceWebGLUnderSoftwareRaster?: boolean;
}

/**
 * Resolve `"auto"` to a concrete substrate per device tier — AND universalize the
 * software-raster guard out of the `"auto"`-only branch (BB.W-AURORA-SWRASTER).
 *
 * THE GUARD (the universal first leg). A SOFTWARE WebGL renderer (SwiftShader /
 * llvmpipe / MS Basic Render — the GPU-blocklisted / headless path) forces `"css"`
 * for ANY WebGL-ARMING requested mode (`"webgl"` OR `"auto"`), not only `"auto"`.
 * A full-viewport software-rastered GL layer is so expensive to re-raster on every
 * composite that a pointer interaction starves the renderer's input ack and the
 * page goes UNRESPONSIVE (the headless-Chromium hang the speedtest harness
 * documents). A consumer (or a capture harness) that pins `mode:"webgl"` /
 * `mode:"capture"` on such a device MUST still fall to the static ground — so the
 * probe runs BEFORE the `mode !== "auto"` short-circuit when the requested mode
 * would arm WebGL. The single ESCAPE is `options.forceWebGLUnderSoftwareRaster`
 * (default `false` — the guard is the safe default).
 *
 * BC.W-VIZ-AURORA (T1) — the DEAD-STATIC `"auto"` fall is RETIRED. The
 * `lowConcurrency` (`hardwareConcurrency <= 4`) and `saveData` heuristics are
 * GONE: they predate the offscreen-park + the `AV_AURORA_DPR_MAX` sub-2× cap +
 * the demand-gate that make a full-viewport aurora cheap, and `<= 4` is
 * false-positive-prone in 2026 (a capable base-M-series laptop / a throttled VM
 * tab reports 4 logical cores → it got a FROZEN static gradient that reads as
 * "the aurora is broken", USER-DEFECTS §E "renders SLOW"). So `"auto"` arms the
 * GPU on every Chrome-113/Safari-26/Firefox-141 device.
 *
 * Reduced-motion is handled SOLELY by the substrate's live `matchMedia` freeze
 * (`createCanvasLifecycle` paints ONE static frame then parks, and re-arms on
 * un-reduce) — NOT a render-mode fall (the old `"css"` fall never armed WebGL,
 * so an un-reduce mid-session could never wake it; the substrate freeze does).
 * The ONLY `"css"` signal that remains is the genuine software-raster GUARD
 * (the universal first leg above) — and even that is subsumed by
 * `BC.W-WEBGPU-EVERYWHERE`'s try-WebGPU-then-rebuild-WebGL2 picker.
 *
 * THE CAPABLE PATH IS BYTE-UNTOUCHED: `isSoftwareWebGLRenderer()` returns `false`
 * on a real GPU (or a null probe — never a false downgrade), so a forced
 * `mode:"webgl"` on hardware passes through exactly as before.
 *
 * SSR / missing-API safe: if `navigator` / `window` / the probes are
 * unavailable we ASSUME a capable device and resolve `"webgl"` (the warm wash
 * still composites either way — the only question is whether it animates).
 *
 * Called ONCE at component setup — the device tier is a mount-time decision,
 * not a reactive one (a connection-type flip mid-session does not re-resolve;
 * the consumer remounts to re-evaluate, matching the deferred-arm contract).
 */
export function resolveRenderMode(
    mode: AuroraRenderMode,
    options: ResolveRenderModeOptions = {},
): "webgl" | "css" {
    // THE UNIVERSAL SOFTWARE-RASTER GUARD (BB.W-AURORA-SWRASTER) — runs BEFORE the
    // `mode !== "auto"` short-circuit, for any mode that would ARM WebGL (`"webgl"`
    // or `"auto"`). An explicit `"css"` needs no probe (it never arms WebGL). The
    // escape opts out (default off — the guard is the safe default).
    if (
        mode !== "css" &&
        !options.forceWebGLUnderSoftwareRaster &&
        isSoftwareWebGLRenderer()
    ) {
        return "css";
    }

    if (mode !== "auto") return mode;

    // BC.W-VIZ-AURORA (T1) — `"auto"` arms the GPU on every device. The only
    // `"css"` signal is the universal software-raster guard above (a real GPU /
    // a null probe never trips it). The `lowConcurrency`/`saveData`/`reducedMotion`
    // dead-static heuristics are RETIRED: reduced-motion is the substrate's live
    // `matchMedia` freeze (one static frame then park, re-arms on un-reduce), and
    // a 4-core report no longer demotes a 2026-capable device to a frozen gradient
    // (the "renders SLOW" defect root). SSR is the same answer (assume capable —
    // the warm wash composites either way; the WebGL arm is browser-only deferred).
    return "webgl";
}
