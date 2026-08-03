// Sample the painted field beneath glass and adapt its tint for legibility. Static
// surfaces use an `elementsFromPoint` stack walk; live surfaces downsample a known
// background canvas because browsers do not expose composited backdrop-filter pixels.
// The observer writes WCAG luminance, a light/dark bucket, and a bounded ambient hue.
// Live sampling is capped at 4 Hz, pauses offscreen or when hidden, and collapses to
// one sample under reduced motion. Static surfaces sample at mount and resize settle.

import { onScopeDispose, readonly, ref, watch, type Ref } from "vue";
import { useRAFLoop, type RAFLoopControls } from "../motion/core/useRAFLoop";
import { useReducedMotion } from "../motion/core/useReducedMotion";
import { useIntersectionPause } from "../motion/core/useIntersectionPause";
import { useResizeObserver } from "../dom/useResizeObserver";
// Stateless sampling and OKLab reduction live in the colocated leaf; this module
// owns reactive wiring, canvas reuse, and the custom-property writes.
import {
    sampleStatic,
    sampleAnimated,
    resolveSourceCanvas,
    resolveUnderlayRgb,
    SAMPLE_DOWNSAMPLE,
    type SampleResult,
    type BackgroundCanvasSource,
} from "./backdropLuminanceSample";

/** The discrete backdrop bucket derived and written by the observer. */
export type GlassBackdropBucket = "light" | "dark";

export interface UseGlassBackdropLuminanceOptions {
    /**
     * The KNOWN background-layer source for the ANIMATED case — an HTMLCanvasElement
     * (or a getter, a CSS selector resolved against the document). When present, the
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
     * Default 250 (4 Hz) and bounded to at least 250ms.
     */
    minSampleIntervalMs?: number;
    /**
     * Write the discrete `--glass-backdrop` bucket too (re-engages the @container +
     * self-engage machinery). Default true. When false, only the numeric
     * `--glass-backdrop-luma` is written (a continuous-strength consumer).
     */
    writeBucket?: boolean;
    /**
     * mark this as the SHARED per-ROUTE observer. It stamps
     * `GLASS_BACKDROP_SHARED_ATTR` on its target (the route/stage scope) so descendant
     * glass surfaces (docks) DETECT the coverage and STAND DOWN — inheriting the route's
     * `--glass-backdrop-luma`, `--glass-backdrop`, `--glass-ambient-*` via the cascade
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
    /**
     * The observer's explicit sample provenance. A live request is never represented
     * as a static sample: a missing or unreadable canvas reports `unavailable`.
     */
    readonly sample: Readonly<Ref<GlassBackdropSample>>;
    /** Force one sample now (bypasses the throttle — used on mount + resize-settle). */
    sampleNow: () => void;
    /** Stop the loop + detach every observer/listener. */
    dispose: () => void;
}

export type GlassBackdropSample =
    | {
          state: "pending";
          mode: "live" | "static";
          source: "canvas" | "elements";
      }
    | {
          state: "sampled";
          mode: "live" | "static";
          source: "canvas" | "elements";
          luma: number;
          ambientHue: string;
          sampledAt: number;
          targetRect: GlassBackdropTargetRect;
      }
    | {
          state: "unavailable";
          mode: "live" | "static";
          source: "canvas" | "elements";
          reason: "source-unavailable" | "sample-unavailable";
          sampledAt: number;
          targetRect: GlassBackdropTargetRect;
      };

export interface GlassBackdropTargetRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Shared-coverage marker. A route observer stamps this on its target; descendant
 * surface observers stand down and inherit its custom properties. A DOM marker is
 * required because provide/inject does not follow the rendered slot ancestry that
 * the custom properties use.
 */
export const GLASS_BACKDROP_SHARED_ATTR = "data-glass-backdrop-shared";
// The bounded ambient-bias strength the observer WRITES when it samples a real (non-
// transparent) modal hue — the companion write-strength knob material.css names "the
// observer's target owns". At 8%, it remains below the 20% tint-strength bound.
// A transparent gray/null sample keeps the 0% identity.
const AMBIENT_STRENGTH_ENGAGED = "8%";

/**
 * The sampled-luminance observer. Wire it on a glass surface (the dock root, a
 * content-glass panel) to write a dynamic backdrop-luminance signal that refines the
 * declarative bucket. Default on for Dock; a dark-substrate consumer
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
    // Bound the sampling cadence to 4 Hz.
    const sampleIntervalMs = Math.max(250, minSampleIntervalMs);

    // A shared route observer runs one readback. Descendant surface observers inherit
    // its values; standalone surface observers sample themselves.
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
    const sample = ref<GlassBackdropSample>({
        state: "pending",
        mode: options.live === true ? "live" : "static",
        source: options.live === true ? "canvas" : "elements",
    });

    // SSR, no-DOM: a pure no-op handle (the static surfaces never need this; the
    // composable is safe to call in a non-browser scope).
    if (typeof window === "undefined") {
        return {
            luma: readonly(luma) as Readonly<Ref<number | null>>,
            bucket: readonly(bucket) as Readonly<Ref<GlassBackdropBucket | null>>,
            sample: readonly(sample) as Readonly<Ref<GlassBackdropSample>>,
            sampleNow: () => {},
            dispose: () => {},
        };
    }

    const prefersReduced = useReducedMotion();

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
     * Does the config intend the live loop? The loop must arm before a provided source
     * resolves: field canvases commonly mount one beat after their consumer. Each tick
     * re-resolves the source, so a live request is either sampled from that canvas or
     * reported unavailable; it never becomes a static sample.
     */
    function wantsLiveLoop(): boolean {
        if (options.live !== undefined) return options.live;
        if (target.value?.dataset.glassSample === "live") return true;
        // A CONFIGURED source — even one that resolves null THIS instant (the field
        // canvas not yet mounted) — is live intent. `!= null` admits a getter,         // canvas, selector but not an explicit `backgroundCanvas: null` (no source).
        if (options.backgroundCanvas != null) return true;
        // No explicit source: a discoverable shell field canvas IS the live signal.
        return resolveSourceCanvas(undefined) !== null;
    }

    function targetRect(el: HTMLElement): GlassBackdropTargetRect {
        const rect = el.getBoundingClientRect();
        return {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
        };
    }

    /** Write the derived signal onto the target's inline style. */
    function write(
        result: SampleResult,
        el: HTMLElement,
        mode: "live" | "static",
        sampledAt: number,
    ): void {
        const value = result.luma;
        luma.value = value;
        const next: GlassBackdropBucket = value >= lightThreshold ? "light" : "dark";
        bucket.value = next;
        sample.value = {
            state: "sampled",
            mode,
            source: mode === "live" ? "canvas" : "elements",
            luma: value,
            ambientHue: result.ambientHue,
            sampledAt,
            targetRect: targetRect(el),
        };
        el.style.setProperty("--glass-backdrop-luma", value.toFixed(3));
        // DEAD-PENDING-#22∥#68: the ambient channel below has ZERO paint readers at HEAD (its
        // only one was the specular ambient endpoint); #22∥#68 owns deleting the writers.
        // the ambient hue (a complete `oklch()` at a FIXED
        // sub-perceptual chroma, or `transparent` for a gray null) the plate's tint
        // cascade biases toward at the opt-in `--glass-ambient-strength`. A gray backdrop
        // writes `transparent` — the room tints nothing (the correct null identity).
        el.style.setProperty("--glass-ambient-hue", result.ambientHue);
        // A real modal hue engages the bounded catch-light bias; a gray or null
        // sample keeps the zero-strength identity.
        el.style.setProperty(
            "--glass-ambient-strength",
            result.ambientHue === "transparent" ? "0%" : AMBIENT_STRENGTH_ENGAGED,
        );
        // Stamp the first successful write so consumers can distinguish an unsampled
        // observer from a genuinely calm backdrop. This never affects layout.
        el.setAttribute("data-backdrop-sampled", "");
        el.setAttribute("data-backdrop-sample-state", "sampled");
        el.setAttribute(
            "data-backdrop-sample-source",
            mode === "live" ? "canvas" : "elements",
        );
        el.removeAttribute("data-backdrop-sample-reason");
        el.style.setProperty("--glass-backdrop-sampled", "1");
        if (writeBucket) {
            el.style.setProperty("--glass-backdrop", next);
        }
    }

    function writeUnavailable(
        el: HTMLElement,
        mode: "live" | "static",
        reason: "source-unavailable" | "sample-unavailable",
        sampledAt: number,
    ): void {
        luma.value = null;
        bucket.value = null;
        sample.value = {
            state: "unavailable",
            mode,
            source: mode === "live" ? "canvas" : "elements",
            reason,
            sampledAt,
            targetRect: targetRect(el),
        };
        el.style.removeProperty("--glass-backdrop-luma");
        el.style.removeProperty("--glass-ambient-hue");
        el.style.removeProperty("--glass-ambient-strength");
        el.style.removeProperty("--glass-backdrop-sampled");
        if (writeBucket) el.style.removeProperty("--glass-backdrop");
        el.removeAttribute("data-backdrop-sampled");
        el.setAttribute("data-backdrop-sample-state", "unavailable");
        el.setAttribute(
            "data-backdrop-sample-source",
            mode === "live" ? "canvas" : "elements",
        );
        el.setAttribute("data-backdrop-sample-reason", reason);
    }

    let lastSampleAt = 0;

    /** One sample now (bypasses the throttle — mount + resize-settle path). */
    function sampleNow(): void {
        const el = target.value;
        if (!el) return;
        // STAND DOWN — a shared route observer covers this per-surface target; inherit its
        // `--glass-backdrop-*` via the cascade (zero readback — the 12→1 collapse).
        if (coveredByShared(el)) return;
        // Live intent has one source of truth: an unavailable canvas is surfaced as
        // unavailable, never substituted with the static stack-walk/default signal.
        const ctx = getDownContext();
        const mode = wantsLiveLoop() ? "live" : "static";
        const source =
            mode === "live" ? resolveSourceCanvas(options.backgroundCanvas) : null;
        // The animated field is TRANSLUCENT: composite it over the REAL opaque page
        // beneath the surface (the same stack the static sampler reads) so a dark page
        // and a light page under the same field resolve to distinct luma.
        const result =
            mode === "live"
                ? sampleAnimated(el, source, ctx, resolveUnderlayRgb(el, ctx))
                : sampleStatic(el, ctx);
        const sampledAt = Date.now();
        if (result) write(result, el, mode, sampledAt);
        else
            writeUnavailable(
                el,
                mode,
                mode === "live" && !source
                    ? "source-unavailable"
                    : "sample-unavailable",
                sampledAt,
            );
        lastSampleAt =
            typeof performance !== "undefined" ? performance.now() : sampledAt;
    }

    // ── The rAF loop — THROTTLED to ≤ 4 Hz, only ticks while live + not reduced ──────
    const loop: RAFLoopControls = useRAFLoop(
        ({ now }) => {
            if (prefersReduced.value) return; // PRM → one static sample, then park
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
                if (wantsLiveLoop() && !prefersReduced.value) loop.resume();
            },
        },
        { rootMargin: "200px" },
    );

    // ── Resize-settle re-sample (the static page case re-samples on a layout change) ─
    const ro = useResizeObserver(target, () => sampleNow());

    // ── Arm/disarm the live loop on PRM flips (mirrors the substrate's live monitor) ─
    function applyMotionState(): void {
        // A covered per-surface observer never runs the loop nor samples (it inherits the
        // shared route signal via the cascade — the 12→1 collapse).
        const el = target.value;
        if (el && coveredByShared(el)) {
            loop.stop();
            return;
        }
        if (prefersReduced.value) {
            loop.stop();
            sampleNow(); // one static frame under reduce (the substrate freezes too)
        } else if (wantsLiveLoop()) {
            // Each tick re-resolves the requested field canvas as it mounts.
            loop.start();
        }
    }
    const stopMotionWatch = watch(prefersReduced, applyMotionState, { flush: "sync" });

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
        stopMotionWatch();
        loop.dispose();
        io.dispose();
        ro.stop();
        downCanvas = null;
        downCtx = null;
    }

    onScopeDispose(dispose);

    return {
        luma: readonly(luma) as Readonly<Ref<number | null>>,
        bucket: readonly(bucket) as Readonly<Ref<GlassBackdropBucket | null>>,
        sample: readonly(sample) as Readonly<Ref<GlassBackdropSample>>,
        sampleNow,
        dispose,
    };
}
