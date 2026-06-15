import type { Component, FunctionalComponent, HTMLAttributes } from "vue";

/**
 * Permissive icon type — Vue's `Component` ships across multiple structurally
 * incompatible shapes (the @lucide/vue v1 functional-component form is one), so
 * we accept the union a `<component :is>` render expression handles. Mirrors the
 * `MetricCell` `IconLike` precedent (the AZ `isComponent` allowance).
 */
export type IconChipIcon = Component | FunctionalComponent | object;

/** A 0..12 index into the `--section-color-N` 13-stop ramp. */
export type IconChipSection = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * A complete token colour for the chip event (e.g. `var(--chart-download)`,
 * `var(--tier-featured)`) — the MetricCell-`iconColor` reconcile path. NEVER a
 * demo-local literal hue (ppmycota purple stays out of the library — the chip
 * `tone` arm takes a token).
 */
export type IconChipTone = string;

export interface IconChipProps {
    /**
     * The lucide glyph (functional-component form per the AZ `isComponent`
     * precedent). Rendered via `<component :is>`.
     */
    icon: IconChipIcon;
    /**
     * The `--section-color-N` ramp index (0..12) — the section arm. XOR `tone`.
     * When both are set, `tone` wins (the explicit complete-token override).
     * Typed `number` for data-driven consumers (a `v-for` over a descriptor list
     * with a `section: number` field); the 0..12 canonical range is the
     * `IconChipSection` union the discovery layer publishes.
     */
    section?: number;
    /**
     * A complete token colour (the tone arm — the MetricCell-`iconColor`
     * reconcile). XOR `section`.
     */
    tone?: IconChipTone;
    /**
     * The chip diameter in px — the FLOOR is `glyphSize × --icon-chip-glyph-ratio`
     * so the plate can never paint under the glyph (the d2 proportion, structural).
     * Default `48` (the reference register, 48/22 ≈ 2.18).
     */
    size?: number;
    /** The lucide glyph pixel size. Default `22` (the reference register). */
    glyphSize?: number;
    /** The lucide glyph stroke width. Default `1.75` (the reference register). */
    strokeWidth?: number;
    /**
     * The NO-PLATE register — render the full-chroma glyph with NO backplate
     * (the MetricCell leading-glyph tint). The chip≤glyph floor is moot (no plate).
     */
    bare?: boolean;
    /**
     * Duotone fill — a low-alpha fill of the same hue UNDER the full-chroma
     * stroke (the iOS/Material "filled-tonal" move). Mono-hue (proportion-safe,
     * never a second hue). Default `false`.
     */
    duotone?: boolean;
    /**
     * The chip's own smooth-glass hover register (the backplate mix lifts, a soft
     * glow ring appears, the stroke firms) — on the §6 easing doctrine, PRM-gated,
     * disco-FREE. Default `false`.
     */
    bloom?: boolean;
    /**
     * Entrance choreography — composes the shipped `vReveal` directive. A numeric
     * value is the `--d` stagger index; `true` is index 0. PRM-gated by `vReveal`'s
     * construction. Default `false`.
     */
    reveal?: boolean | number;
    /** Pass-through class on the chip root. */
    class?: HTMLAttributes["class"];
}
