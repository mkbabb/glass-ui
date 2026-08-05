/** Shared CPU-side ceilings for GPU surface work. Authored values are clamped at
 * upload so a configuration cannot exceed the frame or VRAM budget. */

/**
 * The device-pixel-ratio clamp. A retina/4K display reports `devicePixelRatio`
 * 2–3+; rendering a full-viewport `backdrop-filter`-adjacent WebGL surface at
 * 3× is ~2.25× the fill of 2× for no perceptible gain on a drift background.
 * Cap the backing-store resolution at 2× — the single biggest VRAM/fill lever
 * after offscreen parking. Consumed by Aurora and Blob backing-store sizing.
 */
const AV_DPR_MAX = 2;

/**
 * The Aurora decorative-wash DPR ceiling, distinct from the focal Blob's
 * {@link AV_DPR_MAX}. The aurora atmosphere is a
 * heavily-blurred drift background, not a sharp-silhouette creature: backing it at
 * full-viewport 2× (~2880×1800, ~21.8 MB native heap) is
 * visually indistinguishable from 1.5× on a drift wash (the per-pixel FBM is
 * already smoothed below the DPR-2 detail floor), so the 1.5× ceiling quarters the
 * GPU memory and composite raster cost without perceptible loss. The focal Blob
 * keeps {@link AV_DPR_MAX} = 2 because its silhouette is sharp; only Aurora
 * reads this sub-cap. This is the CPU-side backing-store DIMENSION only; it never
 * reaches the shader.
 */
const AV_AURORA_DPR_MAX = 1.5;

/**
 * The maximum palette colors a budget-safe field mixes per frame. Aurora's
 * shader caps palette stops at {@link MAX_STOPS} (8) for authoring range; this
 * is the PERF budget — 3–4 colors is the band where the per-pixel mix stays
 * cheap. Above this the gradient cost grows without perceptible richness.
 */
export const AV_MAX_COLORS = 4;

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
 * Resolve the backing-store DPR for the Aurora decorative wash at the
 * {@link AV_AURORA_DPR_MAX} ceiling. SSR-safe; returns `1` without `window`.
 * Focal Blob surfaces use {@link resolveBudgetDpr} instead.
 */
export function resolveAuroraWashDpr(): number {
    const raw = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    return Math.min(raw, AV_AURORA_DPR_MAX);
}
