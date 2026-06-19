// BB.B2 W-DOCKMORPH-CTA — useDockCtaReceive: the external-CTA-MORPHS-INTO-dock seam.
//
// THE MOVE (the iOS bloom-from-source INVERSE). An EXTERNAL CTA — a button/control
// OUTSIDE the dock — MORPHS INTO a dock control: it flies + reshapes from its own
// rect onto the target dock control's rect (a continuous compositor-flat morph), is
// absorbed, and the dock control takes over. Where `useLiquidReveal` blooms a surface
// FROM a trigger onto its OWN settled rect (the open), this seam morphs the CTA FROM
// its own rect TO a FOREIGN target (the dock control) — the complement: the CTA is
// consumed INTO the dock. CTA-rect → fly+reshape → land-on-dock-control → hand-off.
//
// THE LOAD-BEARING REUSE (no second engine — a CONSUMING seam beside W-DOCK-MORPH-
// FAMILY). This leaf composes the EXACT SAME kf substrate `useLiquidReveal` activates:
// `ElementMorph` (the compositor `translate()+scale()` rect-delta from
// `@mkbabb/keyframes.js`) + `springTimingFunction` (the typed `{fn,css}` spring curve
// sampled from the SAME `SPRING_PRESETS` row the `--spring-*` CSS tokens generate
// from — never a hand `(response, ζ)`). It owns NO hand-rolled rAF spring integrator
// and NO second physics core. It does NOT touch the dock morph orchestrator
// (`dockMorphContext`/`dockMorphMeasure`) NOR `DOCK_SPRING` (byte-fenced — the dock's
// own collapse/expand morph mechanism is W-DOCK-MORPH-FAMILY's; this seam morphs an
// EXTERNAL element ONTO a dock control, beside that mechanism).
//
// THE MORPH MECHANISM (the FORWARD play — the reveal's inverse). The CTA is rendered
// at its REAL rect. We construct `ElementMorph(ctaRect, dockControlRect)` — the delta
// CTA→target — and drive a spring FORWARD 0→1: at progress=0 the CTA is identity (its
// own rect); as the spring settles to 1 it flies + reshapes ONTO the dock control's
// rect (translate to the control's centre + scale to the control's size). The
// `transform-origin` is the CTA's own centre (it shrinks toward the dock as it flies),
// the canonical absorbed-into-the-dock feel. On settle the CTA is hidden and the dock
// control owns the spot (the consumer's `onReceived` hand-off — the CTA element is the
// morph vehicle, the dock control is the destination).
//
// THREE COUPLED CHANNELS on the spring clock: (a) `transform: translate()+scale()`
// (the fly+reshape — the SPATIAL channel, the spring overshoot at arrival); (b)
// `opacity 1→0` (the EFFECTS channel — the CTA fades as it is absorbed, so it does
// not double-paint over the dock control at the landing); (c) `filter: blur(0)→
// blur(--cta-receive-blur)` (the iOS light-bending congest — the CTA dissolves into
// the dock's glass on the SAME spring clock, a `filter` radius interp on the CTA's
// OWN pixels, NOT `backdrop-filter`).
//
// COMPOSITOR-ONLY. The leaf writes ONLY `transform`/`opacity`/`filter` — NEVER
// `width`/`height`/`top`/`left`/`padding`/`font-size` (the A'-3 lesson, enforced
// library-wide by W-MOTION-CANON's `proof:no-layout-animation`). The morph is a
// transform over the EXISTING footprints; no layout property is animated.
//
// PRM-SEATS BY CONSTRUCTION. Under `prefers-reduced-motion: reduce` the leaf SEATS
// deterministically — it SNAPS the CTA to opacity 0 (the dock control is already in
// place, so a snap-to-gone is the correct seat) in ONE synchronous step, zero
// transform/blur frames, then fires `onReceived` (the hand-off is not gated on the
// animation — the gesture still completes). Mirrors `useLiquidReveal.respectReduced
// Motion` + `useViewTransition`'s instant-under-reduce path.

import {
    ElementMorph,
    springTimingFunction,
    type Easing,
} from "@mkbabb/keyframes.js";
import { onScopeDispose, readonly, ref, type Ref } from "vue";
import { springPreset, type SpringPresetName } from "./springPresets";

/** The receive spring register — `snappy` (the crisp absorb default) or `bouncy`
 *  (the emphatic land-with-overshoot). A subset of the named `SPRING_PRESETS` rows,
 *  matching `useLiquidReveal`'s register so the two seams read as ONE family. */
export type DockCtaReceivePreset = Extract<SpringPresetName, "snappy" | "bouncy">;

export interface UseDockCtaReceiveOptions {
    /**
     * The target dock control the CTA morphs INTO — the destination rect (the
     * `<DockIconButton>`/dock control element). When null at receive time, the morph
     * is a no-op snap (no destination to fly to) and `onReceived` fires immediately.
     */
    dockControl: Ref<HTMLElement | null>;
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
    /**
     * Morph the CTA into the dock control. Idempotent per call — measures the CTA +
     * dock-control rects fresh, drives the spring 0→1 (fly+reshape+fade+congest). A
     * no-op if the CTA element is not yet mounted (no `onReceived`).
     */
    receive: () => void;
    /**
     * Clear the morph transform (restore the CTA to its own rect, opacity 1) — the
     * abort/reset seam. Cancels any in-flight morph; does NOT fire `onReceived`.
     */
    reset: () => void;
    /**
     * ARM the landing SEAT (BC.W-AX-DOCK-CTA-SEAT). Writes `data-cta-pending` on the
     * `dockControl` element so the seat partial (`src/styles/dock/cta-seat.css`) paints
     * a dim ghost AND reserves the resting control footprint (a STATIC `min-inline-size`
     * /`min-block-size` off `--dock-control-size`/`--dock-layer-height`) — the dock box
     * is already at the seated width, so it does NOT jump when the CTA lands. Idempotent.
     * A no-op when the `dockControl` is not yet mounted. Sets `pending.value = true`.
     */
    setPending: () => void;
    /**
     * CLEAR the seat. Removes `data-cta-pending` from the `dockControl`, so the seat
     * reveals its real content with the FLIP `transition: opacity` (the partial owns the
     * paint — a calm content fade, NOT the dock morph-stagger). Idempotent. The default
     * `onReceived` flow calls this on hand-off (the seat reveals as the CTA lands) unless
     * the consumer drives it manually. Sets `pending.value = false`.
     */
    clearPending: () => void;
    /** The reactive seat state — the consumer binds `:class`/`v-if` off it. */
    pending: Readonly<Ref<boolean>>;
}

function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/**
 * The external-CTA-into-dock-control morph. Composes the SAME kf `ElementMorph` +
 * `springTimingFunction` substrate `useLiquidReveal` activates, driven FORWARD (the
 * reveal's inverse): the CTA flies + reshapes from its own rect onto the dock
 * control's rect, fades + congests into the glass on the spring clock, then hands off.
 * Compositor-only + PRM-seats. See the module header for the REUSE + the FORWARD-play
 * mechanism + the channel split.
 *
 * @example
 * ```ts
 * const { receive, setPending, clearPending, pending, reset } = useDockCtaReceive(
 *   ctaRef,
 *   {
 *     dockControl: dockTargetRef,
 *     preset: "snappy",
 *     onReceived: () => (ctaConsumed.value = true),
 *   },
 * )
 * // ARM the seat (the dock control shows the dim ghost + reserves its footprint).
 * setPending()
 * // on the CTA click: morph it into the dock (the default hand-off clearPending()s,
 * // revealing the seated content with the opacity FLIP — no box jump).
 * function onCta() { receive() }
 * ```
 */
export function useDockCtaReceive(
    cta: Ref<HTMLElement | null>,
    options: UseDockCtaReceiveOptions,
): UseDockCtaReceiveReturn {
    const respectPRM = options.respectReducedMotion !== false;
    const blurEnd = options.blur ?? 4;

    // The spring curve — the typed {fn, css} pair from the SAME SPRING_PRESETS row the
    // --spring-<name> CSS tokens generate from (never a hand (response, ζ)). The same
    // sampling useLiquidReveal does, so the two seams read as ONE spring family.
    const presetName: DockCtaReceivePreset = options.preset ?? "snappy";
    const { response, dampingFraction } = springPreset(presetName);
    const easing: Easing = springTimingFunction({ response, dampingFraction });
    // The morph duration in ms — the spring's analytic settle horizon (response * 4,
    // the kf `springTimingFunction` default maxDuration). Mirrors the per-spring clock
    // without re-deriving a token (the W-GLASS-CAL fence — no second clock).
    const durationMs = response * 4 * 1000;

    let morph: ElementMorph | null = null;
    let raf = 0;
    let startTs = 0;

    // BC.W-AX-DOCK-CTA-SEAT — the landing-seat state. `setPending` arms the seat (the
    // dim ghost + the static resting-geometry reserve, both painted by the seat partial
    // off the `[data-cta-pending]` attribute), `clearPending` reveals the real content
    // with the partial's `transition: opacity` FLIP. The methods toggle a DATA ATTRIBUTE
    // — the seat partial owns the paint; the JS never animates a layout property (the
    // compositor-only floor extends to the seat).
    const pending = ref(false);

    function setPending(): void {
        const target = options.dockControl.value;
        if (!target) return; // no seat to arm — a no-op until the control mounts
        target.setAttribute("data-cta-pending", "");
        pending.value = true;
    }

    function clearPending(): void {
        pending.value = false;
        const target = options.dockControl.value;
        if (!target) return;
        target.removeAttribute("data-cta-pending");
    }

    function clearTransform(el: HTMLElement): void {
        el.style.transform = "";
        el.style.transformOrigin = "";
        el.style.opacity = "";
        el.style.filter = "";
    }

    function cancelRaf(): void {
        if (raf && typeof cancelAnimationFrame === "function") cancelAnimationFrame(raf);
        raf = 0;
    }

    function handOff(): void {
        // The seat REVEALS as the CTA lands — clearing `data-cta-pending` fires the
        // partial's `transition: opacity` FLIP (the dim ghost fades to the real content
        // on an already-sized box; no morph-stagger, no box jump). Idempotent, so a
        // consumer driving the seat manually is unaffected.
        clearPending();
        options.onReceived?.();
    }

    function receive(): void {
        const el = cta.value;
        if (!el) return;
        cancelRaf();

        const ctaRect = el.getBoundingClientRect();
        const targetEl = options.dockControl.value;

        // No dock control to fly to — snap the CTA to gone + hand off (the gesture
        // still completes; nowhere to morph).
        if (!targetEl) {
            el.style.opacity = "0";
            handOff();
            return;
        }
        const targetRect = targetEl.getBoundingClientRect();

        // PRM: SEAT deterministically — snap the CTA to opacity 0 in ONE step (the dock
        // control is already in place, so a snap-to-gone is the correct seat), zero
        // transform/blur frames, then hand off. Opacity is not a vestibular trigger;
        // translate/scale/blur are.
        if (respectPRM && prefersReducedMotion()) {
            clearTransform(el);
            el.style.opacity = "0";
            handOff();
            return;
        }

        // The FORWARD play: ElementMorph(cta → dockControl) gives the delta CTA→target.
        // At progress=0 the CTA is identity (its own rect); at progress=1 it is the
        // full delta (translated to the control's centre + scaled to its size). We
        // drive the spring 0→1 so it flies + reshapes ONTO the dock control — the
        // reveal's inverse (the reveal drives 1→0, blooming a surface onto its OWN
        // rect; this drives 0→1, morphing the CTA onto a FOREIGN target). The
        // transform-origin is the CTA's own centre (it shrinks toward the dock as it
        // flies — the absorbed feel).
        morph = new ElementMorph(
            {
                x: ctaRect.x,
                y: ctaRect.y,
                width: ctaRect.width,
                height: ctaRect.height,
            },
            {
                x: targetRect.x,
                y: targetRect.y,
                width: targetRect.width,
                height: targetRect.height,
            },
            { transformOrigin: "center center" },
        );

        // Drive the three coupled channels off ONE spring sample. The spring eases
        // 0→1 over the duration; the SPATIAL morph reads `eased` directly (CTA at its
        // rect → CTA on the dock control). The opacity + blur couple on the SAME eased
        // progress (fade out, congest in). Compositor-only — transform/opacity/filter
        // ONLY (never a layout property).
        startTs = 0;
        const step = (ts: number): void => {
            if (!morph || !cta.value) return;
            if (startTs === 0) startTs = ts;
            const t = Math.min(1, (ts - startTs) / durationMs);
            const eased = easing.fn(t); // the spring curve (overshoot at arrival)
            morph.apply(el, eased); // writes transform + transform-origin
            // The CTA FADES as it is absorbed (1→0) so it does not double-paint over
            // the dock control at the landing.
            el.style.opacity = String(Math.min(1, Math.max(0, 1 - eased)));
            // The decongest INVERSE — the CTA dissolves into the dock's glass (blur
            // grows 0→end on the CTA's OWN pixels, `filter` not `backdrop-filter`).
            const blurPx = blurEnd * Math.min(1, Math.max(0, eased));
            el.style.filter = `blur(${blurPx.toFixed(2)}px)`;
            if (t < 1 && typeof requestAnimationFrame === "function") {
                raf = requestAnimationFrame(step);
            } else {
                // Landed — the CTA is gone (opacity 0). Hand off; the consumer hides
                // the CTA + the dock control owns the spot.
                el.style.opacity = "0";
                morph = null;
                raf = 0;
                handOff();
            }
        };
        if (typeof requestAnimationFrame === "function") {
            raf = requestAnimationFrame(step);
        } else {
            // SSR / no-rAF — snap to gone + hand off.
            clearTransform(el);
            el.style.opacity = "0";
            handOff();
        }
    }

    function reset(): void {
        cancelRaf();
        morph = null;
        const el = cta.value;
        if (el) clearTransform(el);
    }

    onScopeDispose(() => {
        cancelRaf();
        morph = null;
    });

    return { receive, reset, setPending, clearPending, pending: readonly(pending) };
}
