import { computed, toRef, type ComputedRef, type MaybeRefOrGetter } from "vue";

export interface UseContrastSafeAccentInput {
    h: number;
    s: number;
    l: number;
}

export interface UseContrastSafeAccentOptions {
    /** Minimum WCAG L* contrast ratio (0..21 conceptual; 4.5 = AA body). */
    minContrastL?: number;
    /** L* of the substrate the accent will sit on. Default 95 (warm cream). */
    backgroundL?: number;
}

/**
 * Clamp an HSL accent's lightness so it meets a minimum WCAG L* contrast
 * against the substrate. Returns the clamped HSL triple. Single-purpose:
 * does NOT re-encode hue/saturation; only nudges L*.
 *
 * Approximation: linear difference of L*; consumers needing hue-shift,
 * color-mixing, or APCA must layer their own composable on top. Keeping
 * this shape-only matches `feedback_no_backwards_compat`'s "no compat
 * shims" rule — color-math libraries stay in consumer presets.
 */
export function useContrastSafeAccent(
    accent: MaybeRefOrGetter<UseContrastSafeAccentInput>,
    options?: UseContrastSafeAccentOptions,
): ComputedRef<UseContrastSafeAccentInput> {
    const accentRef = toRef(accent);
    return computed(() => {
        const a = accentRef.value;
        const minL = options?.minContrastL ?? 4.5;
        const bg = options?.backgroundL ?? 95;
        // Approximate L* contrast: difference in L scaled to a 0..21 ratio.
        // Real WCAG uses relative luminance; this linear approximation is
        // suitable for accent-color clamping where inputs are already
        // perceptually uniform HSL.
        const ratio = Math.abs(bg - a.l) / 5;
        if (ratio >= minL) return a;
        const target =
            bg > a.l ? Math.max(0, bg - minL * 5) : Math.min(100, bg + minL * 5);
        return { ...a, l: target };
    });
}
