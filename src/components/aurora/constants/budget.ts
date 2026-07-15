/**
 * AV.W7 F6 — the WebGL-surface perf BUDGET constants (the named ceilings).
 *
 * Promotes the formerly-magic `Math.min(dpr, 2)` literal that lived inline in
 * the aurora + goo-blob `resize()` paths (the `2` was un-named in both) to ONE
 * named ceiling, and adds the consumer-preset budget caps the SOTA crosswalk
 * §2.F F6 calls for. A preset that exceeds a cap is CLAMPED at upload, so a
 * consumer cannot blow the frame/VRAM budget by over-authoring a config.
 *
 * Token-first (the wave precept): these are the CPU-side numeric ceilings.
 * They are NOT magic numbers scattered across runtimes — every WebGL surface
 * reads the same export, so a tuning change lands in one place.
 */

/**
 * The device-pixel-ratio clamp. A retina/4K display reports `devicePixelRatio`
 * 2–3+; rendering a full-viewport `backdrop-filter`-adjacent WebGL surface at
 * 3× is ~2.25× the fill of 2× for no perceptible gain on a drift background.
 * Cap the backing-store resolution at 2× — the single biggest VRAM/fill lever
 * after the offscreen-park. Consumed by aurora's + goo-blob's `resize()`.
 */
export const AV_DPR_MAX = 2;

/**
 * BB.W-PERF-PRODUCER A′-5 — the aurora decorative-WASH DPR ceiling, SUB-2× and
 * DISTINCT from the focal goo-blob's {@link AV_DPR_MAX}. The aurora atmosphere is a
 * heavily-blurred drift background, not a sharp-silhouette creature: backing it at
 * full-viewport 2× (the value.js LP1 trace: ~2880×1800, ~21.8 MB native heap) is
 * visually indistinguishable from 1.5× on a drift wash (the per-pixel FBM is
 * already smoothed below the DPR-2 detail floor), so the 1.5× ceiling quarters the
 * GPU memory + per-composite raster for no perceptible loss. The FOCAL goo-blob
 * KEEPS {@link AV_DPR_MAX} = 2 — its silhouette is sharp; only the aurora wash
 * reads this sub-cap. This is the CPU-side backing-store DIMENSION only; it never
 * reaches the shader (`aurora.frag` is byte-fenced — the GL fence is absolute).
 */
export const AV_AURORA_DPR_MAX = 1.5;

/**
 * The maximum animated metaball nuclei (the goo-blob body + its satellites, or
 * an aurora field's count). The goo-blob shader hard-caps satellites at 4; this
 * is the authored-config soft cap (body + ≤2 satellites is the budget-safe
 * register, ≤3 the ceiling). A preset above this is clamped at upload.
 */
export const AV_MAX_BLOBS = 3;

/**
 * The maximum palette colors a budget-safe field mixes per frame. Aurora's
 * shader caps palette stops at {@link MAX_STOPS} (8) for authoring range; this
 * is the PERF budget — 3–4 colors is the band where the per-pixel mix stays
 * cheap. Above this the gradient cost grows without perceptible richness.
 */
export const AV_MAX_COLORS = 4;

/**
 * The drift-loop duration band, in seconds. An animation that loops faster than
 * {@link AV_LOOP_DURATION_MIN_S} reads as nervous (and never lets the eye rest →
 * no battery reprieve); slower than {@link AV_LOOP_DURATION_MAX_S} reads as
 * static. The 8–15s band is the SOTA-named budget-safe drift window.
 */
export const AV_LOOP_DURATION_MIN_S = 8;
export const AV_LOOP_DURATION_MAX_S = 15;

/** Clamp a numeric value into an inclusive `[min, max]` band. */
export function clampBudget(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

/**
 * Resolve the budget-clamped backing-store DPR for a surface. SSR-safe (returns
 * `1` when `window` is absent). The single CPU-side reader of {@link AV_DPR_MAX}.
 */
export function resolveBudgetDpr(): number {
    const raw = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    return Math.min(raw, AV_DPR_MAX);
}

/**
 * BB.W-PERF-PRODUCER A′-5 — resolve the budget-clamped backing-store DPR for the
 * aurora decorative WASH, at the SUB-2× {@link AV_AURORA_DPR_MAX} ceiling (distinct
 * from {@link resolveBudgetDpr}'s focal 2×). SSR-safe (returns `1` when `window` is
 * absent). The single CPU-side reader is aurora's `runtime.ts` `resize()`; the
 * focal goo-blob keeps {@link resolveBudgetDpr}.
 */
export function resolveAuroraWashDpr(): number {
    const raw = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    return Math.min(raw, AV_AURORA_DPR_MAX);
}
