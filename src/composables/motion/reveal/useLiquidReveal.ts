// useLiquidReveal — the iOS-style bloom-from-source-rect open.
//
// A top-layer surface (a dialog from its button, the dock from its collapsed pill)
// MATERIALIZES as glass coalescing — it SCALES + FADES + DECONGESTS (a filter blur(4px)→0
// "light-bending modulation") FROM its trigger's rect onto its own settled rect, on a
// `bloom` spring — big, patient, dead-landing. It blooms FROM the source; it
// never flies in on a flat fixed-bezier zoom-95.
//
// This is a thin wrapper over `useElementMorph` (the one compositor
// FLIP runner). It owns NO rAF loop, NO geometry fallback, NO spring sample — it declares
// the trigger as source and the surface as destination, with
// the opacity + blur channels, and the runner drives it. The reveal is the surface arriving
// at its OWN settled rect FROM the trigger; the CSS `.glass-reveal` recipe is the zero-JS
// everywhere floor, this leaf is the source-rect REFINEMENT (the dialog-from-button, the
// dock-from-pill). Keyframes-bearing (via the runner) → `/motion` ONLY, never the root
// barrel (the SCC-trap discipline).

import { type ComponentPublicInstance, type Ref } from "vue";
import { asElement } from "../core/asElement";
import { useElementMorph, type ElementMorphPreset } from "../morph/useElementMorph";

/** The reveal spring register — `bloom` (the room-sized growth, the default: a surface
 *  expanding to fill a sheet or a screen IS this row's one job) or `panel` (the emphatic
 *  fired deploy, the one row that rebounds). */
export type LiquidRevealPreset = Extract<ElementMorphPreset, "bloom" | "panel">;

export interface UseLiquidRevealOptions {
    /**
     * The trigger element the surface blooms FROM — the source rect (the button, the
     * collapsed dock pill). A templateRef to the trigger ELEMENT or to a COMPONENT (e.g.
     * `<Button>`), whose root element is resolved via `.$el` (the binding-verification
     * cure). When null at reveal time, the explicit-endpoint episode completes
     * immediately; no invented geometry substitutes for a missing trigger.
     */
    trigger?: Ref<HTMLElement | ComponentPublicInstance | null>;
    /** The spring register (default `bloom`). */
    preset?: LiquidRevealPreset;
    /** The starting filter-blur radius in px (the decongest start). Default 4. */
    blur?: number;
    /** Honor `prefers-reduced-motion: reduce` (snap to settled, fade only). Default true. */
    respectReducedMotion?: boolean;
}

export interface UseLiquidRevealReturn {
    /** Bloom the surface open from the trigger's rect (drives the FLIP inversion). A no-op
     *  if the surface element is not yet mounted. */
    reveal: () => void;
    /** Clear the bloom transform/blur — the CSS recipe's `--ease-out` exit owns the close. */
    conceal: () => void;
}

/**
 * The iOS-27 source-rect bloom. A ≤20-line adapter over `useElementMorph` — declares the
 * reveal as an explicit trigger→surface episode, with opacity + blur
 * coupled. See `useElementMorph` for managed playback, PRM, and compositor writes.
 *
 * @example
 * ```ts
 * const { reveal, conceal } = useLiquidReveal(surfaceRef, { trigger: triggerRef, preset: "panel" })
 * watch(open, (o) => (o ? reveal() : conceal()))
 * ```
 */
export function useLiquidReveal(
    surface: Ref<HTMLElement | ComponentPublicInstance | null>,
    options: UseLiquidRevealOptions = {},
): UseLiquidRevealReturn {
    const engine = useElementMorph(surface, {
        source: options.trigger ?? "self",
        destination: "self",
        preset: options.preset ?? "bloom",
        respectReducedMotion: options.respectReducedMotion,
        channels: { opacity: true, blur: options.blur ?? 4 },
    });

    return {
        reveal: engine.play,
        conceal() {
            engine.cancel();
            engine.clear(asElement(surface.value));
        },
    };
}
