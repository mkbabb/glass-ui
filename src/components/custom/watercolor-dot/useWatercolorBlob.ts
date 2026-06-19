import { ref, onUnmounted, watch, type Ref } from "vue";
import { mulberry32, hashString, randomRadii, radiiToCSS } from "./prng";

export interface UseWatercolorBlobOptions {
    /** Enable the rAF animation loop (drives a COMPOSITOR transform wobble). */
    animate?: boolean;
    /** Base cycle duration in ms (default 4000). */
    cycleDuration?: number;
    /** Border-radius range [lo, hi] as percentages (default [20, 80]). */
    range?: [number, number];
    /** Extra seed string mixed into the hash for unique shapes. */
    seed?: string;
}

/**
 * Per-channel wobble state — each of the transform channels (scaleX/scaleY/skewX/
 * skewY/rotate) animates independently with its own timing, producing organic
 * sub-perceptual motion the compositor handles WITHOUT re-rastering the SVG filter.
 */
interface ChannelState {
    from: number;
    to: number;
    startTime: number;
    duration: number;
    /** The peak amplitude this channel oscillates within (sub-perceptual). */
    amp: number;
}

// The transform-wobble channels. The amplitudes are deliberately SMALL — a soft
// organic breathing, never a taffy-pull (the §6 calm register). scale stays near 1,
// skew/rotate stay near-zero degrees, so the seeded silhouette reads STILL but alive.
const CHANNELS = ["scaleX", "scaleY", "skewX", "skewY", "rotate"] as const;
const CHANNEL_AMP: Record<(typeof CHANNELS)[number], number> = {
    scaleX: 0.045, // ±4.5% width
    scaleY: 0.045, // ±4.5% height
    skewX: 1.6, // ±1.6deg
    skewY: 1.6, // ±1.6deg
    rotate: 1.4, // ±1.4deg
};

/**
 * Drives a watercolor dot's organic blob shape. Deterministic given `color + seed`
 * (seeds the PRNG), so the same color reproduces the same shape across mounts. The
 * seeded `border-radius` silhouette is set ONCE (the dot's identity) and is STATIC —
 * the box never re-paints its radius per frame (the §H Safari fix: a per-frame
 * `border-radius` write under the SVG filter forces the filter graph to RE-RASTERIZE
 * every frame, which flashes Safari). In `animate` mode the liveness rides a seeded
 * COMPOSITOR `transform` wobble (scale/skew/rotate) the compositor handles WITHOUT
 * touching the cached filter — the HandMark static-filter idiom. `nudge()` retargets
 * the wobble for a quick jiggle on hover.
 */
export function useWatercolorBlob(
    color: Ref<string> | (() => string),
    options: UseWatercolorBlobOptions = {},
) {
    const { animate = false, cycleDuration = 4000, range = [20, 80], seed = "" } =
        options;

    const borderRadius = ref("");
    const hoverBorderRadius = ref("");
    // The seeded COMPOSITOR transform wobble (the animate-mode liveness; default
    // identity so a static dot reads untransformed).
    const transform = ref("none");

    const getColor = typeof color === "function" ? color : () => color.value;

    // Deterministic initial shape from color string + optional seed.
    const rng = mulberry32(hashString(getColor() + seed));
    const initial = randomRadii(rng, range[0], range[1]);
    borderRadius.value = radiiToCSS(initial);

    // Generate a second deterministic shape for hover state.
    const hoverShape = randomRadii(rng, range[0], range[1]);
    hoverBorderRadius.value = radiiToCSS(hoverShape);

    // No-op nudge for non-animated blobs.
    let nudge = () => {};

    // Re-seed when color changes (non-animated mode).
    if (!animate) {
        if (typeof color !== "function") {
            watch(color, (c) => {
                const r = mulberry32(hashString(c + seed));
                borderRadius.value = radiiToCSS(randomRadii(r, range[0], range[1]));
                hoverBorderRadius.value = radiiToCSS(randomRadii(r, range[0], range[1]));
            });
        }
        return { borderRadius, hoverBorderRadius, transform, nudge };
    }

    // --- Per-channel independent COMPOSITOR transform wobble ---
    // The seeded `border-radius` silhouette stays STATIC (`borderRadius.value` is
    // set once above); the liveness is a seeded transform the compositor accelerates,
    // so the SVG filter never re-rasterizes per frame (the §H Safari flash fix).

    const channels: ChannelState[] = [];
    for (let i = 0; i < CHANNELS.length; i++) {
        const name = CHANNELS[i] ?? "scaleX";
        const amp = CHANNEL_AMP[name];
        const durationMul = 0.5 + rng() * 1.3;
        const phaseOffset = rng();
        channels.push({
            from: 0,
            to: -1 + rng() * 2, // a normalized target in [-1, 1]; * amp at composeTransform
            startTime: -phaseOffset * cycleDuration * durationMul,
            duration: cycleDuration * durationMul,
            amp,
        });
    }

    let rafId: number | null = null;
    let lastNow = 0;
    const current = channels.map(() => 0);

    function composeTransform(): string {
        // Map each normalized channel value (* its amplitude) onto a CSS transform.
        // scaleX/scaleY are 1 + v*amp; skew/rotate are v*amp degrees.
        const sx = 1 + current[0]! * channels[0]!.amp;
        const sy = 1 + current[1]! * channels[1]!.amp;
        const kx = current[2]! * channels[2]!.amp;
        const ky = current[3]! * channels[3]!.amp;
        const rot = current[4]! * channels[4]!.amp;
        return `scale(${sx.toFixed(4)}, ${sy.toFixed(4)}) skew(${kx.toFixed(3)}deg, ${ky.toFixed(3)}deg) rotate(${rot.toFixed(3)}deg)`;
    }

    function tick(now: number) {
        lastNow = now;
        for (let i = 0; i < channels.length; i++) {
            const c = channels[i];
            if (!c) continue;
            let t = (now - c.startTime) / c.duration;

            if (t >= 1) {
                c.from = c.to;
                c.to = -1 + rng() * 2;
                c.duration = cycleDuration * (0.5 + rng() * 1.3);
                c.startTime = now;
                t = 0;
            }

            // Sinusoidal ease — smoother and more organic than quadratic.
            const ease = 0.5 - 0.5 * Math.cos(Math.PI * t);
            current[i] = c.from + ease * (c.to - c.from);
        }

        // The COMPOSITOR transform wobble — never a per-frame border-radius paint
        // under the filter (the §H Safari flash fix; the seeded silhouette is static).
        transform.value = composeTransform();
        rafId = requestAnimationFrame(tick);
    }

    /**
     * Nudge: immediately retarget all wobble channels to new positions with short
     * durations, creating a visible "jiggle" on the compositor transform.
     */
    nudge = () => {
        const now = lastNow || performance.now();
        for (let i = 0; i < channels.length; i++) {
            const c = channels[i];
            if (!c) continue;
            c.from = current[i] ?? c.from;
            c.to = -1 + rng() * 2;
            // Fast transition (25-50% of normal cycle).
            c.duration = cycleDuration * (0.25 + rng() * 0.25);
            c.startTime = now;
        }
    };

    rafId = requestAnimationFrame(tick);

    onUnmounted(() => {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    });

    return { borderRadius, hoverBorderRadius, transform, nudge };
}

export type WatercolorBlob = ReturnType<typeof useWatercolorBlob>;
