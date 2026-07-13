// BB.B2 W-DOCKMORPH-CTA — useDockCtaReceive: the external-CTA-MORPHS-INTO-dock seam.
//
// An EXTERNAL CTA — a button/control OUTSIDE the dock — MORPHS INTO a dock control: it
// flies + reshapes from its own rect onto the target dock control's rect (a continuous
// compositor-flat morph), is absorbed (fades + congests into the glass), and the dock
// control takes over. Where `useLiquidReveal` blooms a surface FROM a trigger onto its OWN
// settled rect (the open), this morphs the CTA FROM its own rect TO a FOREIGN target: the
// reveal's inverse. CTA-rect → fly+reshape → land-on-dock-control → hand-off.
//
// BG.W-MOTION-SPINE — this is now a THIN wrapper over `useElementMorph` (the ONE compositor
// FLIP runner). It owns NO rAF loop, NO `ElementMorph`, NO spring sample — it declares the
// morph as a FORWARD play (`direction: "out"`, `to: dockControl`, center origin) with the
// opacity + blur channels and the runner's `onSettled` hand-off. A CONSUMING seam BESIDE
// W-DOCK-MORPH-FAMILY — it does NOT touch `dockMorphContext`/`dockMorphMeasure`/`DOCK_SPRING`
// (the dock's own collapse/expand morph is W-DOCK-MORPH-FAMILY's; this morphs an EXTERNAL
// element onto a dock control beside it). Keyframes-bearing (via the runner) → `/motion`
// ONLY, never the root barrel (the SCC-trap discipline).
//
// THE LANDING SEAT (BC.W-AX-DOCK-CTA-SEAT). `setPending`/`clearPending` toggle a
// `[data-cta-pending]` attribute on the dock control — the seat partial
// (`src/styles/dock/cta-seat.css`) paints a dim ghost + reserves the resting footprint
// (a STATIC `min-inline-size`/`min-block-size`) so the dock box NEVER jumps when the CTA
// lands, and reveals the real content with a plain `transition: opacity` FLIP. The seat
// writes are DATA-ATTRIBUTE writes (never a layout animation — the compositor-only floor
// extends to the seat); they stay wrapper-local (they are not motion — the runner drives
// the morph, the seat is a static reserve + a content fade).

import {
    readonly,
    ref,
    type ComponentPublicInstance,
    type Ref,
} from "vue";
import {
    asElement,
    prefersReducedMotion,
    useElementMorph,
    type ElementMorphPreset,
} from "./useElementMorph";

/** The receive spring register — `snappy` (the crisp absorb default) or `bouncy` (the
 *  emphatic land-with-overshoot). Matches `useLiquidReveal`'s register so the two seams
 *  read as ONE family. */
export type DockCtaReceivePreset = ElementMorphPreset;

export interface UseDockCtaReceiveOptions {
    /**
     * The dock control the CTA flies onto — a templateRef to the control ELEMENT or to a
     * component (e.g. `<DockControl>`), whose root element is resolved via `.$el`. When
     * null at receive time, the morph is a no-op snap (nowhere to fly) and `onReceived`
     * fires immediately.
     */
    dockControl: Ref<HTMLElement | ComponentPublicInstance | null>;
    /** The spring register (default `snappy`). */
    preset?: DockCtaReceivePreset;
    /** The ending congest blur radius in px (the CTA dissolves into the glass). Default 4. */
    blur?: number;
    /** Honor `prefers-reduced-motion: reduce` (snap to gone, then hand off). Default true. */
    respectReducedMotion?: boolean;
    /**
     * Fired ONCE when the CTA has landed on the dock control (the hand-off seam) — the
     * consumer hides the CTA + activates the dock control here. Fires on the animation
     * settle AND on the PRM/no-target snap (the gesture always completes).
     */
    onReceived?: () => void;
}

export interface UseDockCtaReceiveReturn {
    /** Morph the CTA into the dock control (drives the FORWARD play). A no-op if the CTA
     *  element is not yet mounted (no `onReceived`). */
    receive: () => void;
    /** Clear the morph transform (restore the CTA to its own rect, opacity 1) — the
     *  abort/reset seam. Does NOT fire `onReceived`. */
    reset: () => void;
    /** ARM the landing seat — write `data-cta-pending` on the dock control (the seat
     *  reserves its resting footprint + shows a dim ghost). Idempotent. */
    setPending: () => void;
    /** CLEAR the seat — remove `data-cta-pending`, so the seat reveals its real content
     *  with the `transition: opacity` FLIP. Idempotent. */
    clearPending: () => void;
    /** The reactive seat state — the consumer binds `:class`/`v-if` off it. */
    pending: Readonly<Ref<boolean>>;
}

/**
 * The external-CTA-into-dock-control morph. A ≤20-line adapter over `useElementMorph` —
 * declares the receive as a `direction: "out"` FORWARD play flying ONTO the dock control,
 * opacity + blur coupled, the runner's `onSettled` firing the seat clear + `onReceived`.
 * The seat writes (`setPending`/`clearPending`) stay wrapper-local (data-attr, not motion).
 *
 * @example
 * ```ts
 * const { receive, setPending, pending } = useDockCtaReceive(ctaRef, {
 *   dockControl: dockTargetRef, onReceived: () => (ctaConsumed.value = true),
 * })
 * setPending()          // arm the seat (dim ghost + footprint reserve)
 * function onCta() { receive() }  // morph the CTA in; the default hand-off clearPending()s
 * ```
 */
export function useDockCtaReceive(
    cta: Ref<HTMLElement | ComponentPublicInstance | null>,
    options: UseDockCtaReceiveOptions,
): UseDockCtaReceiveReturn {
    const respectPRM = options.respectReducedMotion !== false;
    const pending = ref(false);

    function setPending(): void {
        const target = asElement(options.dockControl.value);
        if (!target) return; // no seat to arm — a no-op until the control mounts
        target.setAttribute("data-cta-pending", "");
        pending.value = true;
    }
    function clearPending(): void {
        pending.value = false;
        const target = asElement(options.dockControl.value);
        if (target) target.removeAttribute("data-cta-pending");
    }
    function handOff(): void {
        // The seat REVEALS as the CTA lands — clearing `data-cta-pending` fires the
        // partial's `transition: opacity` FLIP on an already-sized box (no jump).
        clearPending();
        options.onReceived?.();
    }

    const engine = useElementMorph(cta, {
        direction: "out",
        to: options.dockControl,
        origin: "center",
        preset: options.preset ?? "snappy",
        respectReducedMotion: options.respectReducedMotion,
        channels: { opacity: true, blur: options.blur ?? 4 },
        onSettled: handOff,
    });

    function receive(): void {
        const el = asElement(cta.value);
        if (!el) return;
        // No dock control to fly to — snap the CTA gone + hand off (the gesture completes).
        if (!asElement(options.dockControl.value)) {
            el.style.opacity = "0";
            handOff();
            return;
        }
        // PRM: SEAT deterministically — snap the CTA to opacity 0 in ONE step (the dock
        // control is already in place, so snap-to-gone is the correct seat), zero transform/
        // blur frames, then hand off. Opacity is not a vestibular trigger; translate/scale/
        // blur are. The animated path (below) is the runner's; this cta-specific terminal
        // seat is symmetric with the no-target path above, so the wrapper owns it.
        if (respectPRM && prefersReducedMotion()) {
            engine.clear(el);
            el.style.opacity = "0";
            handOff();
            return;
        }
        engine.play();
    }

    function reset(): void {
        engine.cancel();
        engine.clear(asElement(cta.value));
    }

    return {
        receive,
        reset,
        setPending,
        clearPending,
        pending: readonly(pending),
    };
}
