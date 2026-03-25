import { ref, onUnmounted, watch, type Ref } from "vue";
import { mulberry32, hashString, randomRadii, radiiToCSS } from "./prng";

export interface UseWatercolorBlobOptions {
    /** Enable rAF animation loop */
    animate?: boolean;
    /** Base cycle duration in ms (default 4000) */
    cycleDuration?: number;
    /** Border-radius range [lo, hi] as percentages (default [20, 80]) */
    range?: [number, number];
    /** Extra seed string mixed into the hash for unique shapes */
    seed?: string;
}

/**
 * Per-vertex animation state — each of the 8 border-radius values
 * animates independently with its own timing, producing organic motion.
 */
interface VertexState {
    from: number;
    to: number;
    startTime: number;
    duration: number;
}

export function useWatercolorBlob(
    color: Ref<string> | (() => string),
    options: UseWatercolorBlobOptions = {},
) {
    const {
        animate = false,
        cycleDuration = 4000,
        range = [20, 80],
        seed = "",
    } = options;

    const borderRadius = ref("");
    const hoverBorderRadius = ref("");

    const getColor = typeof color === "function" ? color : () => color.value;

    // Deterministic initial shape from color string + optional seed
    const rng = mulberry32(hashString(getColor() + seed));
    const initial = randomRadii(rng, range[0], range[1]);
    borderRadius.value = radiiToCSS(initial);

    // Generate a second deterministic shape for hover state
    const hoverShape = randomRadii(rng, range[0], range[1]);
    hoverBorderRadius.value = radiiToCSS(hoverShape);

    // No-op nudge for non-animated blobs
    let nudge = () => {};

    // Re-seed when color changes (non-animated mode)
    if (!animate) {
        if (typeof color !== "function") {
            watch(color, (c) => {
                const r = mulberry32(hashString(c + seed));
                borderRadius.value = radiiToCSS(randomRadii(r, range[0], range[1]));
                hoverBorderRadius.value = radiiToCSS(randomRadii(r, range[0], range[1]));
            });
        }
        return { borderRadius, hoverBorderRadius, nudge };
    }

    // --- Per-vertex independent animation ---

    const [lo, hi] = range;
    const current = [...initial];

    // Each vertex gets its own timing with wide variance
    const vertices: VertexState[] = [];
    for (let i = 0; i < 8; i++) {
        const durationMul = 0.5 + rng() * 1.3;
        const phaseOffset = rng();
        vertices.push({
            from: initial[i],
            to: lo + rng() * (hi - lo),
            startTime: -phaseOffset * cycleDuration * durationMul,
            duration: cycleDuration * durationMul,
        });
    }

    let rafId: number | null = null;
    let lastNow = 0;

    function tick(now: number) {
        lastNow = now;
        for (let i = 0; i < 8; i++) {
            const v = vertices[i];
            let t = (now - v.startTime) / v.duration;

            if (t >= 1) {
                v.from = v.to;
                v.to = lo + rng() * (hi - lo);
                v.duration = cycleDuration * (0.5 + rng() * 1.3);
                v.startTime = now;
                t = 0;
            }

            // Sinusoidal ease — smoother and more organic than quadratic
            const ease = 0.5 - 0.5 * Math.cos(Math.PI * t);
            current[i] = v.from + ease * (v.to - v.from);
        }

        borderRadius.value = radiiToCSS(current);
        rafId = requestAnimationFrame(tick);
    }

    /**
     * Nudge: immediately retarget all vertices to new random positions
     * with short durations, creating a visible "jiggle" effect.
     */
    nudge = () => {
        const now = lastNow || performance.now();
        for (let i = 0; i < 8; i++) {
            const v = vertices[i];
            v.from = current[i];
            v.to = lo + rng() * (hi - lo);
            // Fast transition (25-50% of normal cycle)
            v.duration = cycleDuration * (0.25 + rng() * 0.25);
            v.startTime = now;
        }
    };

    rafId = requestAnimationFrame(tick);

    onUnmounted(() => {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    });

    return { borderRadius, hoverBorderRadius, nudge };
}
