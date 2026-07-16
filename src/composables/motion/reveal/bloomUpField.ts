// Pure bloom-field resolution and write helpers. Rendering remains in useBloomUp.ts;
// this leaf owns only field-channel projection.
//
// The 4TH color channel of the iOS-27 shared-element bloom rides the DESTINATION FIELD (a
// DIFFERENT element from the blooming surface — the compositor-only floor de-risk): resolve
// the field container, resolve the source's dominant hue, and write the registered
// `@property --glass-ambient-hue`/`--glass-ambient-strength` customs onto it. These are pure
// functions over a DOM element + the PRM probe — they own no reactive state.

import type { Ref } from "vue";

/** The ambient-strength ceiling (sub-perceptual; never a flood). */
export const AMBIENT_STRENGTH_CEILING = 8;

/** The live reduced-motion probe (matchMedia, SSR-safe). */
export function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/** Clamp the ambient-strength target into the bounded warm-cream-identity band `[0, 8]`. */
export function clampStrength(n: number | undefined): number {
    const v = n ?? AMBIENT_STRENGTH_CEILING;
    if (!Number.isFinite(v)) return AMBIENT_STRENGTH_CEILING;
    return Math.min(AMBIENT_STRENGTH_CEILING, Math.max(0, v));
}

/**
 * Resolve the FIELD container the 4th color channel writes onto. Explicit `field` ref
 * wins; else walk up from `dest` to the nearest `[data-glass-field]` ancestor (the
 * field-marker contract); else `dest.parentElement`. The field is a DIFFERENT element
 * from the blooming surface — the compositor-only de-risk.
 */
export function resolveField(
    dest: HTMLElement,
    explicit: Ref<HTMLElement | null> | undefined,
): HTMLElement | null {
    if (explicit?.value) return explicit.value;
    let node: HTMLElement | null = dest.parentElement;
    while (node) {
        if (node.hasAttribute("data-glass-field")) return node;
        node = node.parentElement;
    }
    return dest.parentElement;
}

/**
 * Read the source's dominant hue — the explicit `fieldHue` OR the `--glass-ambient-hue`
 * computed off the source element (the AMBIENT-TINT source). Returns `null` for a
 * neutral/absent hue (the field tints nothing).
 */
export function resolveHue(
    source: HTMLElement | null,
    explicit: string | undefined,
): string | null {
    if (explicit && explicit.trim() && explicit.trim() !== "transparent") {
        return explicit.trim();
    }
    if (!source || typeof getComputedStyle !== "function") return null;
    const read = getComputedStyle(source).getPropertyValue("--glass-ambient-hue").trim();
    if (!read || read === "transparent") return null;
    return read;
}

/** Set the field's dominant hue (the 4th-channel hue, set ONCE — not animated). */
export function writeFieldHue(field: HTMLElement, hue: string): void {
    field.style.setProperty("--glass-ambient-hue", hue);
}

/** Write the field's ambient strength (the registered @property interpolates it). */
export function writeFieldStrength(field: HTMLElement, pct: number): void {
    field.style.setProperty("--glass-ambient-strength", `${pct.toFixed(3)}%`);
}

/**
 * Release the field bias back to the no-op floor (0%) and clear the hue so the field returns
 * to its un-biased `--glass-tint-ink` (the warm-cream identity).
 */
export function releaseField(field: HTMLElement | null): void {
    if (!field) return;
    field.style.setProperty("--glass-ambient-strength", "0%");
    field.style.removeProperty("--glass-ambient-hue");
}
