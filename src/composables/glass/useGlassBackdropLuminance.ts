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
// BI.W-ENCAP-REDRAIN — the stateless backdrop-sampling + OKLab-reduce family (the
// `elementsFromPoint` stack-walk + the downsampled `drawImage+getImageData` field
// reader + the OKLab luminance/ambient-hue reduce) lives in the colocated leaf; the
// observer COMPOSES it (the no-god-module colocation carve). The observer keeps only
// the reactive wiring + the reusable downsample-canvas lifecycle + the
// `--glass-backdrop-*` / `--glass-ambient-*` writes. The value.js color source rides
// THROUGH the leaf (proof:single-color-core follows the sampler into the ambient-hue
// histogram it composes).
import {
    sampleStatic,
    sampleAnimated,
    resolveSourceCanvas,
    SAMPLE_DOWNSAMPLE,
    type SampleResult,
    type BackgroundCanvasSource,
} from "./backdropLuminanceSample";

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
    backgroundCanvas?: BackgroundCanvasSource;
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
    /**
     * BI.W-DOCK-LUMA-SHARE — mark this as the SHARED per-ROUTE observer. It stamps
     * `GLASS_BACKDROP_SHARED_ATTR` on its target (the route/stage scope) so descendant
     * glass surfaces (docks) DETECT the coverage and STAND DOWN — inheriting the route's
     * `--glass-backdrop-luma` / `--glass-backdrop` / `--glass-ambient-*` via the cascade
     * rather than each mounting its own readback loop (12 per-dock observers over ONE
     * aurora → ONE per-route readback). Default false: a per-SURFACE observer, which
     * stands down when a shared ancestor covers it and self-samples as the honest floor
     * when standalone. N docks over the SAME aurora read ONE per-route signal.
     */
    shared?: boolean;
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
/**
 * BI.W-DOCK-LUMA-SHARE — the shared-coverage marker. A SHARED route observer
 * (`shared: true`) stamps this attribute on its target (the route/stage scope); a
 * per-SURFACE observer detects it on an ANCESTOR (`.closest`) and STANDS DOWN —
 * inheriting the route's `--glass-backdrop-luma` / `--glass-backdrop` /
 * `--glass-ambient-*` via the registered inheriting @property cascade instead of
 * mounting its OWN `drawImage + getImageData` readback loop (the 12 per-dock observers
 * over ONE DockStage aurora collapse to ONE per-route readback — PERF-6/FAM-5). A DOM
 * marker, NOT provide/inject: provide/inject does not cross the `<slot>` boundary (the
 * DockStage renders `<slot>`, the docks are slotted from the route, so the slotted
 * content's instance-parent is the slot OWNER not the stage), and the marker rides the
 * SAME DOM ancestry the inheriting custom property itself cascades over.
 */
export const GLASS_BACKDROP_SHARED_ATTR = "data-glass-backdrop-shared";
// The bounded ambient-bias strength the observer WRITES when it samples a real (non-
// transparent) modal hue — the companion write-strength knob material.css names "the
// observer's target owns". ≤ 8% (sub-perceptual under the W55 --glass-tint-strength-aa
// 20% bound; tokens/glass.css §BE.W-AMBIENT-TINT). A `transparent` (gray/null) sample
// keeps the 0% no-op floor. Without this write the sampled hue rides a frozen 0%
// strength — a half-dead channel (a hue written but never READ), the state NF.3 forbids.
const AMBIENT_STRENGTH_ENGAGED = "8%";

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

    // BI.W-DOCK-LUMA-SHARE — the shared/per-surface role. A SHARED route observer stamps
    // the coverage marker + runs the ONE per-route readback; a per-SURFACE observer stands
    // down when a shared ancestor covers it (inherits the route luma via the cascade) and
    // self-samples as the honest floor when standalone.
    const isShared = options.shared === true;

    /**
     * Does a SHARED route observer cover this per-surface target? True when an ANCESTOR
     * carries `GLASS_BACKDROP_SHARED_ATTR`. `.closest` starts at `el`, but a per-surface
     * target never carries the marker itself (only a `shared` observer stamps it), so a
     * match is an ancestor's shared scope. A shared observer never stands down (it IS the
     * coverage), so it short-circuits false.
     */
    function coveredByShared(el: HTMLElement): boolean {
        if (isShared) return false;
        return el.closest(`[${GLASS_BACKDROP_SHARED_ATTR}]`) !== null;
    }

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

    /**
     * Is the LIVE re-sample loop requested? The explicit `live` option / the
     * `data-glass-sample="live"` attr force it; it is ALSO true when a field canvas
     * is RESOLVABLE (handed via `backgroundCanvas` OR auto-discovered off the shell
     * `[data-glass-field-canvas]`). BG.W-GLASS-SIGNAL-TRUTH (ST3/ST5): the dock hands
     * the DockStage aurora canvas but no `live` flag — without the canvas leg the
     * `sampleAnimated` path is UNREACHABLE and the observer is DEAD on the whole dock
     * band (0 of 12 docks fired the writer-fired witness). A resolvable field canvas
     * IS the live signal: the surface samples the painted field (real luma + ambient
     * hue) rather than a coarse static stack-walk, and the witness lands.
     */
    function isLive(): boolean {
        if (options.live !== undefined) return options.live;
        if (target.value?.dataset.glassSample === "live") return true;
        return resolveSourceCanvas(options.backgroundCanvas) !== null;
    }

    /**
     * Does the config INTEND the live re-sample loop? This is the ARMING predicate,
     * DISTINCT from `isLive()` (the per-sample READBACK decision). The loop must arm
     * on live INTENT even before the field canvas RESOLVES: the aurora `<canvas>`
     * mounts a beat AFTER the surface (the DockStage field paints post-mount), so a
     * mount-time `isLive()` that REQUIRES `resolveSourceCanvas() !== null` reads false
     * at the single mount sample, never `loop.start()`s, and — with NO watcher on the
     * getter's resolution — stays DEAD forever. BG.W-GLASS-SIGNAL-TRUTH (M8 runtime,
     * the paint-DELTA re-open): the ST5 fix (isLive considers a resolvable canvas) was
     * NECESSARY but not SUFFICIENT — 0 of 12 docks fired the witness because the arm
     * still keyed off the un-resolved mount instant. A PROVIDED source (a getter /
     * canvas / selector) signals live intent NOW; the running loop's per-tick
     * `isLive()` re-check then picks up the field the instant it paints (and
     * `sampleAnimated` writes the real warm luma + ambient hue). No new watcher, no
     * second raf — the throttled loop IS the re-check.
     */
    function wantsLiveLoop(): boolean {
        if (options.live !== undefined) return options.live;
        if (target.value?.dataset.glassSample === "live") return true;
        // A CONFIGURED source — even one that resolves null THIS instant (the field
        // canvas not yet mounted) — is live intent. `!= null` admits a getter /
        // canvas / selector but not an explicit `backgroundCanvas: null` (no source).
        if (options.backgroundCanvas != null) return true;
        // No explicit source: a discoverable shell field canvas IS the live signal.
        return resolveSourceCanvas(undefined) !== null;
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
        // BG.W-GLASS-SIGNAL-TRUTH (NF.3 mustFix #2) — WIRE THE AMBIENT BIAS ON. The
        // catch-light seam (material.css `--glass-specular-core`) reads the sampled hue
        // AT `--glass-ambient-strength` — "the companion write-strength knob the
        // observer's target owns". A real (non-`transparent`) modal hue engages the
        // bounded strength so the ambient catch-light actually READS where the observer
        // fires; a gray/null (`transparent`) sample keeps the 0% no-op floor. Without
        // this write the hue rides a frozen 0% strength (a hue written but never read —
        // the half-dead channel NF.3 forbids).
        el.style.setProperty(
            "--glass-ambient-strength",
            result.ambientHue === "transparent" ? "0%" : AMBIENT_STRENGTH_ENGAGED,
        );
        // BG.W-GLASS-SIGNAL-TRUTH (M8) — the WRITER-FIRED WITNESS. A dead/silently-
        // failed observer is otherwise INDISTINGUISHABLE from a calm backdrop (both
        // resolve the luma clamp's initial 0 → the calm floor, so the G2 "unreadable
        // over very light materials" defect silently reverts). Stamp `[data-backdrop-
        // sampled]` + the paired `--glass-backdrop-sampled: 1` on the FIRST real write
        // so a π/gate can RED a wired-but-never-written channel (the dead-observer≡calm-
        // backdrop mask). This never animates a layout property (the compositor-only
        // floor); it is a signal-truth stamp, set once per target.
        el.setAttribute("data-backdrop-sampled", "");
        el.style.setProperty("--glass-backdrop-sampled", "1");
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
        // STAND DOWN — a shared route observer covers this per-surface target; inherit its
        // `--glass-backdrop-*` via the cascade (zero readback — the 12→1 collapse).
        if (coveredByShared(el)) return;
        // Compose the stateless leaf samplers with the reusable downsample context (the
        // observer owns the canvas lifecycle) + the resolved live-field source.
        const ctx = getDownContext();
        const result = isLive()
            ? sampleAnimated(
                  el,
                  resolveSourceCanvas(options.backgroundCanvas),
                  ctx,
              ) ?? sampleStatic(el, ctx)
            : sampleStatic(el, ctx);
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
                // A covered per-surface observer stays parked (it inherits — never a loop).
                const el = target.value;
                if (el && coveredByShared(el)) return;
                if (wantsLiveLoop() && !prefersReduced) loop.resume();
            },
        },
        { rootMargin: "200px" },
    );

    // ── Resize-settle re-sample (the static page case re-samples on a layout change) ─
    const ro = useResizeObserver(target, () => sampleNow());

    // ── Arm/disarm the live loop on PRM flips (mirrors the substrate's live monitor) ─
    function applyMotionState(): void {
        prefersReduced = prmMql.matches;
        // A covered per-surface observer never runs the loop nor samples (it inherits the
        // shared route signal via the cascade — the 12→1 collapse).
        const el = target.value;
        if (el && coveredByShared(el)) {
            loop.stop();
            return;
        }
        if (prefersReduced) {
            loop.stop();
            sampleNow(); // one static frame under reduce (the substrate freezes too)
        } else if (wantsLiveLoop()) {
            // Arm on live INTENT — the loop's per-tick isLive() re-check picks up the
            // field canvas the instant it resolves (BG.W-GLASS-SIGNAL-TRUTH M8 runtime).
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
            // The SHARED route observer STAMPS the coverage marker so descendant docks
            // detect it + stand down (the demo also carries a static template marker so
            // the stamp is race-free from frame 0). A per-surface observer covered by a
            // shared ancestor stands down here — it inherits the route luma (no sample,
            // no loop); an uncovered surface self-samples (the honest floor).
            if (isShared) el.setAttribute(GLASS_BACKDROP_SHARED_ATTR, "");
            else if (coveredByShared(el)) return;
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
