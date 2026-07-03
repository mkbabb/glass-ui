// AZ.W-ADAPTIVE-AUTO Arm 2 — `useGlassBackdropLuminance`: the sampled-luminance
// observer, the iOS-27 DYNAMIC refinement of the W55 declarative bright bucket.
//
// THE PROBLEM. The declarative `--glass-backdrop: light|dark` bucket (W55) + the
// unconditional self-engage default (Arm 1) are the legibility FLOOR — they darken a
// glass surface over light content with no consumer opt-in. But a STATIC light/dark
// bucket is too coarse for the ANIMATED-backdrop case (a dock floating over a live
// aurora field, whose luminance shifts frame-to-frame): the surface is sometimes over
// a bright bleed and sometimes over a dark trough, and the right darken is the one
// that TRACKS the painted backdrop. R3-7's word: "darken DYNAMICALLY like iOS 27 so we
// can actually see these elements."
//
// THE IMPOSSIBILITY. There is NO web API that reads the pixels painted BEHIND a
// `backdrop-filter` element (the composited output is not exposed to script). So the
// observer cannot read the blurred backdrop directly. Two legitimate samples instead:
//
//   - STATIC page case: an `elementsFromPoint` stack-walk at the surface's centre +
//     corners, reading the FIRST element under the surface that carries a resolved
//     non-transparent background, and un-wrapping its `var(--token)` background through
//     the `resolveTokenColor` leaf (the AX.W16 single-source un-wrap). This samples the
//     PAINTED background LAYER (the page/card surface), not the blurred composite — the
//     legitimate proxy for "what is behind the glass".
//
//   - ANIMATED case (`data-glass-sample="live"`): a downsampled (32×32) offscreen-canvas
//     `drawImage(sourceCanvas) + getImageData` of the KNOWN background-layer canvas (the
//     aurora/blob `<canvas>` the surface floats over — located by id/selector). The
//     surface's bounding box maps to the source-canvas region; the mean luminance of the
//     downsample is the dynamic signal. This re-samples periodically on the rAF loop.
//
// THE WRITE. The observer computes WCAG relative luminance of the sampled backdrop,
// writes `--glass-backdrop-luma` (0..1, the numeric escape hatch — its FIRST real
// consumer, the named B3-1/E3G-4 delta) AND derives the discrete `--glass-backdrop:
// light|dark` bucket (threshold ~0.6) on the target element. The discrete bucket re-
// engages the EXISTING `@container style()` + self-engage machinery (zero new seam); the
// numeric token is reserved for a future continuous-strength reader.
//
// THE BUDGET. rAF-THROTTLED ≤ 4 Hz (250 ms min between samples) + IntersectionObserver-
// gated (no sample while offscreen) + parked on `document.hidden`/content-hidden — the
// `useWebGLCanvas` offscreen-pause precedent. It COMPOSES the existing substrates
// (`useResizeObserver` / `useIntersectionPause` / `useRAFLoop` + the `resolveTokenColor`
// leaf) — it hand-rolls NO throttle/gate/raf path. Under `prefers-reduced-motion:
// reduce` the live re-sample loop COLLAPSES to a single mount sample (the substrate
// freezes its WebGL backdrop to ONE static frame under PRM, so a periodic re-sample of a
// frozen canvas is pure waste — and would violate the substrate's PRM discipline); the
// observer mirrors the substrate's live `matchMedia('change')` monitor and re-arms only
// if PRM is lifted. The static page surface samples ONCE on mount + on resize-settle.

import { onScopeDispose, readonly, ref, watch, type Ref } from "vue";
import { useRAFLoop, type RAFLoopControls } from "../motion/useRAFLoop";
import { useIntersectionPause } from "../motion/useIntersectionPause";
import { useResizeObserver } from "../dom/useResizeObserver";
import { resolveTokenColor } from "../dom/useResolveTokenColor";
import { isCanvas, relLuminance, parseRgb } from "./backdropSampleMath";
// BE.W-AMBIENT-TINT — the ambient-hue histogram (accumulate/resolve + the value.js
// color source) lives in the colocated leaf; the observer COMPOSES it (BG.W-COLOCATE
// — ratchet-drain #9). The value.js import moved WITH it (proof:single-color-core).
import {
    makeHueHistogram,
    accumulateHuePixel,
    resolveAmbientHue,
} from "./ambientHueHistogram";

/** The discrete bucket the observer derives + writes (re-engages the W55 machinery). */
export type GlassBackdropBucket = "light" | "dark";

export interface UseGlassBackdropLuminanceOptions {
    /**
     * The KNOWN background-layer source for the ANIMATED case — an HTMLCanvasElement
     * (or a getter / a CSS selector resolved against the document). When present, the
     * observer downsamples this canvas under the surface's bounding box each settle
     * instead of the static `elementsFromPoint` stack-walk. The aurora/blob `<canvas>`
     * the surface floats over.
     */
    backgroundCanvas?:
        | HTMLCanvasElement
        | (() => HTMLCanvasElement | null)
        | string
        | null;
    /**
     * Force the LIVE periodic re-sample loop on (mirrors the `data-glass-sample="live"`
     * attribute on the target). Default: read from the target's
     * `data-glass-sample === "live"` attribute. The static page case samples once on
     * mount + resize-settle; the live case re-samples on the throttled loop.
     */
    live?: boolean;
    /**
     * The luminance threshold above which the backdrop is `light` (engages the darken).
     * Default 0.6 — a near-white page surface (luma ≈ 0.9) is light; a dark substrate
     * (luma ≈ 0.1) is dark; a mid aurora bleed crosses here.
     */
    lightThreshold?: number;
    /**
     * Minimum milliseconds between samples on the live loop (the ≤ 4 Hz throttle floor).
     * Default 250 (4 Hz). Bounded ≥ 250 (the budget floor — a faster sample is the
     * C5-9 frame-budget risk the H3 arm-(a) default-on profile must hold).
     */
    minSampleIntervalMs?: number;
    /**
     * Write the discrete `--glass-backdrop` bucket too (re-engages the @container +
     * self-engage machinery). Default true. When false, only the numeric
     * `--glass-backdrop-luma` is written (a continuous-strength consumer).
     */
    writeBucket?: boolean;
}

export interface UseGlassBackdropLuminanceControls {
    /** The last sampled backdrop relative luminance (0..1), or null before the first sample. */
    readonly luma: Readonly<Ref<number | null>>;
    /** The last derived bucket, or null before the first sample. */
    readonly bucket: Readonly<Ref<GlassBackdropBucket | null>>;
    /** Force one sample now (bypasses the throttle — used on mount + resize-settle). */
    sampleNow: () => void;
    /** Stop the loop + detach every observer/listener. */
    dispose: () => void;
}

const PRM_QUERY = "(prefers-reduced-motion: reduce)";
const SAMPLE_DOWNSAMPLE = 32;

/** The per-sample result — the luminance AND the ambient hue (the FREE rider). */
interface SampleResult {
    /** WCAG relative luminance of the sampled backdrop (0..1). */
    luma: number;
    /** A complete `oklch()` ambient-hue string, or `transparent` for a gray null. */
    ambientHue: string;
}

/** BG.W-FIELD-ACCENT-RECONCILE — the library convention marking the ONE shell
 *  field canvas (the recessive shell `<Aurora>` the demo chassis mounts behind every
 *  non-focal route; also the WS8 BACKDROP-SAMPLE marker). A glass surface that does
 *  NOT name an explicit `backgroundCanvas` auto-discovers this canvas so it samples
 *  the LIVE field rather than a static stack-walk; absent it (a focal route where the
 *  shell stands down, an SSR scope) the static `elementsFromPoint` path is the floor. */
const SHELL_FIELD_CANVAS_SELECTOR =
    "[data-glass-field-canvas] canvas, canvas[data-glass-field-canvas]";

function resolveSourceCanvas(
    src: UseGlassBackdropLuminanceOptions["backgroundCanvas"],
): HTMLCanvasElement | null {
    if (!src) {
        // Auto-discover the shell field canvas — the rewire to the live shell field
        // (backward-safe: no field canvas → null → the static elementsFromPoint path).
        if (typeof document !== "undefined") {
            const field = document.querySelector(SHELL_FIELD_CANVAS_SELECTOR);
            if (isCanvas(field)) return field;
        }
        return null;
    }
    if (isCanvas(src)) return src;
    if (typeof src === "function") {
        const c = src();
        return isCanvas(c) ? c : null;
    }
    if (typeof src === "string" && typeof document !== "undefined") {
        const el = document.querySelector(src);
        return isCanvas(el) ? el : null;
    }
    return null;
}

/**
 * The sampled-luminance observer. Wire it on a glass surface (the dock root, a
 * content-glass panel) to write a DYNAMIC backdrop-luminance signal that refines the
 * W55 declarative bucket. Default-on for the dock (H3 arm a); a dark-substrate consumer
 * opts out by setting `--glass-tint-strength: 0%` on the surface (the declarative floor
 * stays the guarantee — the observer only refines).
 *
 * @param target the glass surface element ref to sample under + write the tokens on
 * @param options sampling source, throttle, threshold (see the interface)
 */
export function useGlassBackdropLuminance(
    target: Ref<HTMLElement | null>,
    options: UseGlassBackdropLuminanceOptions = {},
): UseGlassBackdropLuminanceControls {
    const {
        lightThreshold = 0.6,
        minSampleIntervalMs = 250,
        writeBucket = true,
    } = options;
    // The throttle floor is bounded ≥ 250 ms (≤ 4 Hz) — the C5-9 budget guarantee.
    const sampleIntervalMs = Math.max(250, minSampleIntervalMs);

    const luma = ref<number | null>(null);
    const bucket = ref<GlassBackdropBucket | null>(null);

    // SSR / no-DOM: a pure no-op handle (the static surfaces never need this; the
    // composable is safe to call in a non-browser scope).
    if (typeof window === "undefined") {
        return {
            luma: readonly(luma) as Readonly<Ref<number | null>>,
            bucket: readonly(bucket) as Readonly<Ref<GlassBackdropBucket | null>>,
            sampleNow: () => {},
            dispose: () => {},
        };
    }

    // PRM monitor (mirrors the useWebGLCanvas substrate's live matchMedia change
    // listener) — under reduce the live re-sample loop collapses to a single sample.
    const prmMql = window.matchMedia(PRM_QUERY);
    let prefersReduced = prmMql.matches;

    // A reusable offscreen downsample canvas for the animated case.
    let downCanvas: HTMLCanvasElement | null = null;
    let downCtx: CanvasRenderingContext2D | null = null;
    function getDownContext(): CanvasRenderingContext2D | null {
        if (!downCanvas) {
            downCanvas = document.createElement("canvas");
            downCanvas.width = SAMPLE_DOWNSAMPLE;
            downCanvas.height = SAMPLE_DOWNSAMPLE;
        }
        if (!downCtx) {
            downCtx = downCanvas.getContext("2d", { willReadFrequently: true });
        }
        return downCtx;
    }

    /** Is the LIVE re-sample loop requested? (the data-attr or the explicit option) */
    function isLive(): boolean {
        if (options.live !== undefined) return options.live;
        return target.value?.dataset.glassSample === "live";
    }

    /**
     * Sample the ANIMATED backdrop: downsample the known source canvas under the
     * surface's bounding box → mean relative luminance + the ambient-hue histogram
     * (a FREE rider over the SAME pixel pass). Returns null if no source.
     */
    function sampleAnimated(el: HTMLElement): SampleResult | null {
        const source = resolveSourceCanvas(options.backgroundCanvas);
        if (!source || source.width === 0 || source.height === 0) return null;
        const ctx = getDownContext();
        if (!ctx) return null;
        const rect = el.getBoundingClientRect();
        const srcRect = source.getBoundingClientRect();
        if (srcRect.width === 0 || srcRect.height === 0) return null;
        // Map the surface's viewport box → the source canvas's backing-store region.
        const scaleX = source.width / srcRect.width;
        const scaleY = source.height / srcRect.height;
        const sx = Math.max(0, (rect.left - srcRect.left) * scaleX);
        const sy = Math.max(0, (rect.top - srcRect.top) * scaleY);
        const sw = Math.min(source.width - sx, Math.max(1, rect.width * scaleX));
        const sh = Math.min(source.height - sy, Math.max(1, rect.height * scaleY));
        if (sw <= 0 || sh <= 0) return null;
        try {
            ctx.clearRect(0, 0, SAMPLE_DOWNSAMPLE, SAMPLE_DOWNSAMPLE);
            ctx.drawImage(
                source,
                sx,
                sy,
                sw,
                sh,
                0,
                0,
                SAMPLE_DOWNSAMPLE,
                SAMPLE_DOWNSAMPLE,
            );
            const data = ctx.getImageData(
                0,
                0,
                SAMPLE_DOWNSAMPLE,
                SAMPLE_DOWNSAMPLE,
            ).data;
            let sum = 0;
            let n = 0;
            const hist = makeHueHistogram();
            for (let i = 0; i < data.length; i += 4) {
                // Composite over white (the alpha-translucent aurora over the page).
                const a = data[i + 3]! / 255;
                const r = data[i]! * a + 255 * (1 - a);
                const g = data[i + 1]! * a + 255 * (1 - a);
                const b = data[i + 2]! * a + 255 * (1 - a);
                sum += relLuminance(r, g, b);
                // BE.W-AMBIENT-TINT — the hue histogram, a FREE rider in the SAME
                // loop (no second getImageData, no second canvas, no second pass).
                accumulateHuePixel(hist, r, g, b, a);
                n++;
            }
            return n > 0
                ? { luma: sum / n, ambientHue: resolveAmbientHue(hist) }
                : null;
        } catch {
            // fail-explicit: befitting — a tainted/cross-origin canvas throws on
            // getImageData; the null return SURFACES the miss to the caller, which
            // falls back to the static stack-walk (the declarative bucket stays the
            // legibility floor regardless — never a silent wrong answer).
            return null;
        }
    }

    /**
     * Sample the STATIC backdrop: stack-walk `elementsFromPoint` at the surface centre,
     * read the first element under it with a resolved non-transparent background, un-wrap
     * the `var(--token)` through the resolveTokenColor leaf → relative luminance + the
     * ambient hue (the single resolved background color binned the SAME way).
     */
    function sampleStatic(el: HTMLElement): SampleResult | null {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const stack = document.elementsFromPoint(cx, cy);
        // Skip the surface itself + its glass descendants; find the first BACKGROUND
        // layer below it with an opaque-enough painted background.
        for (const node of stack) {
            if (!(node instanceof HTMLElement)) continue;
            if (node === el || el.contains(node)) continue;
            const bgRaw = getComputedStyle(node).backgroundColor;
            const concrete = resolveTokenColor(bgRaw, el);
            const rgba = parseRgb(concrete);
            if (!rgba) continue;
            if (rgba[3] < 0.5) continue; // a near-transparent layer is not the backdrop
            return staticResult(rgba);
        }
        // Nothing opaque under it → the page paints through to the body/root; read that.
        const bodyBg = resolveTokenColor(
            getComputedStyle(document.body).backgroundColor,
            el,
        );
        const bodyRgba = parseRgb(bodyBg);
        return bodyRgba ? staticResult(bodyRgba) : null;
    }

    /** A single resolved backdrop color → the luma + the ambient hue (binned alone). */
    function staticResult(rgba: [number, number, number, number]): SampleResult {
        const hist = makeHueHistogram();
        accumulateHuePixel(hist, rgba[0], rgba[1], rgba[2], rgba[3]);
        return {
            luma: relLuminance(rgba[0], rgba[1], rgba[2]),
            ambientHue: resolveAmbientHue(hist),
        };
    }

    /** Write the derived signal onto the target's inline style. */
    function write(result: SampleResult): void {
        const value = result.luma;
        luma.value = value;
        const el = target.value;
        if (!el) return;
        el.style.setProperty("--glass-backdrop-luma", value.toFixed(3));
        // BE.W-AMBIENT-TINT — the ambient hue (a complete `oklch()` at a FIXED
        // sub-perceptual chroma, or `transparent` for a gray null) the plate's tint
        // cascade biases toward at the opt-in `--glass-ambient-strength` (the W55
        // self-engage re-point reads it; ZERO new compositing seam). A gray backdrop
        // writes `transparent` — the room tints nothing (the correct null identity).
        el.style.setProperty("--glass-ambient-hue", result.ambientHue);
        if (writeBucket) {
            const next: GlassBackdropBucket =
                value >= lightThreshold ? "light" : "dark";
            bucket.value = next;
            el.style.setProperty("--glass-backdrop", next);
        }
    }

    let lastSampleAt = 0;

    /** One sample now (bypasses the throttle — mount + resize-settle path). */
    function sampleNow(): void {
        const el = target.value;
        if (!el) return;
        const result = isLive()
            ? sampleAnimated(el) ?? sampleStatic(el)
            : sampleStatic(el);
        if (result !== null) write(result);
        lastSampleAt =
            typeof performance !== "undefined" ? performance.now() : Date.now();
    }

    // ── The rAF loop — THROTTLED to ≤ 4 Hz, only ticks while live + not reduced ──────
    const loop: RAFLoopControls = useRAFLoop(
        ({ now }) => {
            if (prefersReduced) return; // PRM → the loop is parked (single mount sample)
            if (now - lastSampleAt < sampleIntervalMs) return; // ≤ 4 Hz throttle
            sampleNow();
        },
        { immediate: false, pauseWhenHidden: true, respectReducedMotion: true },
    );

    // ── IntersectionObserver gate — park the loop while the surface is offscreen ─────
    const io = useIntersectionPause(
        () => target.value,
        {
            pause: () => loop.pause(),
            resume: () => {
                if (isLive() && !prefersReduced) loop.resume();
            },
        },
        { rootMargin: "200px" },
    );

    // ── Resize-settle re-sample (the static page case re-samples on a layout change) ─
    const ro = useResizeObserver(target, () => sampleNow());

    // ── Arm/disarm the live loop on PRM flips (mirrors the substrate's live monitor) ─
    function applyMotionState(): void {
        prefersReduced = prmMql.matches;
        if (prefersReduced) {
            loop.stop();
            sampleNow(); // one static frame under reduce (the substrate freezes too)
        } else if (isLive()) {
            loop.start();
        }
    }
    const onPrmChange = () => applyMotionState();
    if (typeof prmMql.addEventListener === "function") {
        prmMql.addEventListener("change", onPrmChange);
    }

    // First sample once the target is present; arm the loop for the live case.
    const stopTargetWatch = watch(
        () => target.value,
        (el) => {
            if (!el) return;
            sampleNow();
            applyMotionState();
        },
        { immediate: true, flush: "post" },
    );

    function dispose(): void {
        stopTargetWatch();
        loop.dispose();
        io.dispose();
        ro.stop();
        if (typeof prmMql.removeEventListener === "function") {
            prmMql.removeEventListener("change", onPrmChange);
        }
        downCanvas = null;
        downCtx = null;
    }

    onScopeDispose(dispose);

    return {
        luma: readonly(luma) as Readonly<Ref<number | null>>,
        bucket: readonly(bucket) as Readonly<Ref<GlassBackdropBucket | null>>,
        sampleNow,
        dispose,
    };
}
