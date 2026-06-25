// BB.W-LIQUID-REVEAL — useLiquidReveal: the iOS-27 bloom-from-source-rect open.
//
// THE HEADLINE iOS-27 MOVE: a top-layer surface (a dialog from its button, the dock
// from its collapsed pill) MATERIALIZES as glass coalescing — it SCALES + FADES +
// DECONGESTS (a backdrop blur(4px)→0 "light-bending modulation") FROM its trigger's
// rect onto its own settled rect, on a snappy/bouncy spring with the canonical iOS
// overshoot. It blooms FROM the source; it never flies in on a flat fixed-bezier
// zoom-95.
//
// THE LOAD-BEARING REUSE (no second engine). glass-ui peer-depends on
// `@mkbabb/keyframes.js`, whose `ElementMorph` + `flipShared` + `springTimingFunction`
// ship UNCONSUMED at HEAD (re-exported through the `/motion` surface, `suite.ts`, with
// ZERO glass-ui consumer — the J-inv-10 substrate-without-consumer state). This leaf
// is the ACTIVATING consumer: `ElementMorph` morphs the surface between its settled
// rect and the trigger's rect via a compositor `translate()+scale()` delta;
// `springTimingFunction({response, dampingFraction})` returns the typed `{fn, css}`
// pair — ONE spring curve usable as the JS easing the morph plays on, sampled from the
// SAME `SPRING_PRESETS` table the `--spring-*` CSS tokens generate from (never a hand
// `(response, ζ)`). The leaf owns NO hand-rolled rAF spring integrator and NO second
// pointer/velocity engine (the reuse is the wired substrate, not a re-fork).
//
// THE BLOOM MECHANISM (the FLIP inversion). The surface is rendered at its SETTLED
// rect (reka portals it, the popper anchors it — its real position). We construct
// `ElementMorph(settledRect, triggerRect)` — the delta settled→trigger — and drive a
// spring from 1 (looks like the trigger: small, offset to the source) DOWN to 0
// (identity: the settled rect). At spring=1 the surface appears AT the trigger's
// origin scaled to its size; as the spring settles to 0 it blooms FORWARD onto its
// own rect. The `transform-origin` is anchored at the trigger so the scale grows FROM
// the source point (the control-centre/app-open feel), NOT a center-scale. We do NOT
// use `flipShared`'s forward play here (that morphs a→b's rect in place, the wrong
// direction for a reveal), but we DO compose the SAME `ElementMorph` core + the SAME
// `springTimingFunction` curve — the kf substrate, sampled to drive the inversion.
//
// THREE COUPLED CHANNELS on the spring clock: (a) `transform: translate()+scale()`
// (the bloom — the SPATIAL channel, the spring overshoot); (b) `opacity 0→1` (the
// EFFECTS channel, no-overshoot, coupled so scale+fade read as ONE continuous layer);
// (c) `filter: blur(--liquid-reveal-blur)→blur(0)` (the iOS light-bending decongest —
// a `filter` radius interp on the surface's OWN pixels, COMPOSITOR-safe, NOT a layout
// prop; `filter` not `backdrop-filter` so the resting glass-tier plate blur the surface
// carries at rest is never clobbered).
//
// COMPOSITOR-ONLY. The leaf writes ONLY `transform`/`opacity`/`filter` — NEVER
// `width`/`height`/`top`/`left`/`padding` (the A'-3 lesson, enforced library-wide by
// W-MOTION-CANON's `proof:no-layout-animation`). The bloom is a transform over the
// EXISTING settled footprint; the glass plate is untouched.
//
// PRM-SAFE BY CONSTRUCTION. Under `prefers-reduced-motion: reduce` the leaf SNAPS the
// surface to its settled rect (identity transform) with opacity 1 in ONE synchronous
// step — zero transform/blur frames, the fade survives (mirrors
// `useSpringMount.respectReducedMotion` + `useViewTransition`'s instant-under-reduce
// path). Opacity is not a vestibular trigger; scale/translate/blur are.

import {
    ElementMorph,
    springTimingFunction,
    type Easing,
} from "@mkbabb/keyframes.js";
import {
    onScopeDispose,
    type ComponentPublicInstance,
    type Ref,
} from "vue";
import { springPreset, type SpringPresetName } from "./springPresets";

/**
 * Resolve a templateRef value to its root HTMLElement — accepts an element directly OR
 * a Vue component public instance (its `.$el`). Returns null for a fragment/text root or
 * a nullish ref. THIS is the [[glass-ui binding verification]] cure: a `ref` bound to a
 * COMPONENT (e.g. `<Button>`, a reka portal `<Dialog>`) resolves to the component public
 * INSTANCE, which has no `getBoundingClientRect` — so the bloom silently no-ops / throws.
 * Resolving `.$el` lets the surface/trigger bind either an element ref or a component ref
 * without dying (the cta-receive `asElement` precedent). The same resolver `useDockCta
 * Receive` ships, kept byte-shape so the bloom family reads as ONE.
 */
function asElement(
    v: HTMLElement | ComponentPublicInstance | null | undefined,
): HTMLElement | null {
    if (!v) return null;
    if (v instanceof HTMLElement) return v;
    const el = (v as ComponentPublicInstance).$el;
    return el instanceof HTMLElement ? el : null;
}

/** The reveal spring register — `snappy` (the quick app-open default) or `bouncy`
 *  (the emphatic large-dialog bloom). A subset of the named `SPRING_PRESETS` rows. */
export type LiquidRevealPreset = Extract<SpringPresetName, "snappy" | "bouncy">;

export interface UseLiquidRevealOptions {
    /**
     * The trigger element the surface blooms FROM — the source rect (the button, the
     * collapsed dock pill). A templateRef to the trigger ELEMENT or to a COMPONENT (e.g.
     * `<Button>`), whose root element is resolved via `.$el` — the binding-verification
     * cure: a `ref` on a component is the public instance (no `getBoundingClientRect`),
     * which silently no-oped the bloom. When null at reveal time, the bloom degrades to a
     * center-anchored scale-from-self (the no-trigger fallback — still spring-clocked,
     * never the flat bezier zoom).
     */
    trigger?: Ref<HTMLElement | ComponentPublicInstance | null>;
    /** The spring register (default `snappy`). */
    preset?: LiquidRevealPreset;
    /** The starting backdrop-blur radius in px (the decongest start). Default 4. */
    blur?: number;
    /** Honor `prefers-reduced-motion: reduce` (snap to settled, fade only). Default true. */
    respectReducedMotion?: boolean;
}

export interface UseLiquidRevealReturn {
    /**
     * Bloom the surface open from the trigger's rect. Idempotent per call — measures
     * the trigger + settled rects fresh, drives the inversion spring 1→0. A no-op if
     * the surface element is not yet mounted.
     */
    reveal: () => void;
    /**
     * Snap the surface to its settled identity (clear the bloom transform/blur). The
     * EXIT is the CSS recipe's `--ease-out` no-overshoot leg (a closing surface must
     * not overshoot past gone) — this leaf clears the enter transform so the recipe's
     * exit owns the close.
     */
    conceal: () => void;
}

function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/**
 * The iOS-27 source-rect bloom. Composes the dormant kf `ElementMorph` +
 * `springTimingFunction` into the three-channel liquid open (scale+fade+blur-settle
 * from the trigger's origin), compositor-only + PRM-snap. See the module header for
 * the REUSE + bloom-mechanism (FLIP inversion) + the channel split.
 *
 * @example
 * ```ts
 * const { reveal, conceal } = useLiquidReveal(surfaceRef, {
 *   trigger: triggerRef,
 *   preset: "bouncy",
 * })
 * watch(open, (o) => (o ? reveal() : conceal()))
 * ```
 */
export function useLiquidReveal(
    surface: Ref<HTMLElement | ComponentPublicInstance | null>,
    options: UseLiquidRevealOptions = {},
): UseLiquidRevealReturn {
    const respectPRM = options.respectReducedMotion !== false;
    const blurStart = options.blur ?? 4;

    // The spring curve — the typed {fn, css} pair from the SAME SPRING_PRESETS row the
    // --spring-<name> CSS tokens generate from (never a hand (response, ζ)). `.fn` is
    // the callable easing the ElementMorph plays on; the matching `--spring-<name>-
    // duration` CSS clock is the recipe's wall clock (the JS leaf reuses the analytic
    // settle implicitly via the spring sample, the W-GLASS-CAL fence held).
    const presetName: LiquidRevealPreset = options.preset ?? "snappy";
    const { response, dampingFraction } = springPreset(presetName);
    const easing: Easing = springTimingFunction({ response, dampingFraction });
    // The morph duration in ms — the spring's analytic settle horizon (response * 4,
    // the kf `springTimingFunction` default maxDuration). Mirrors the per-spring clock
    // without re-deriving a token.
    const durationMs = response * 4 * 1000;

    let morph: ElementMorph | null = null;
    let raf = 0;
    let startTs = 0;

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

    function reveal(): void {
        const el = asElement(surface.value);
        if (!el) return;
        cancelRaf();

        // The settled rect (the surface's real, painted position). The trigger rect
        // (the source) — when no trigger is bound, the bloom degrades to a center-
        // anchored self-scale (a small inset rect), still spring-clocked.
        const settled = el.getBoundingClientRect();
        const triggerEl = asElement(options.trigger?.value);
        const triggerRect = triggerEl
            ? triggerEl.getBoundingClientRect()
            : // No trigger: bloom from a 92%-inset of the surface's own center (the
              // self-scale fallback — never a flat zoom, still a spring scale-in).
              {
                  x: settled.x + settled.width * 0.04,
                  y: settled.y + settled.height * 0.04,
                  width: settled.width * 0.92,
                  height: settled.height * 0.92,
              };

        // The transform-origin anchored at the trigger's top-left relative to the
        // surface, so the scale grows FROM the source point (not center).
        const originX = triggerRect.x - settled.x;
        const originY = triggerRect.y - settled.y;
        const transformOrigin = `${originX}px ${originY}px`;

        // PRM: snap to settled identity with opacity 1 in ONE step — zero transform/
        // blur frames, the fade survives (the recipe's CSS fade leg owns the ramp; the
        // JS leaf simply does not drive the spatial channels).
        if (respectPRM && prefersReducedMotion()) {
            clearTransform(el);
            el.style.opacity = "1";
            return;
        }

        // The FLIP inversion: ElementMorph(settled → trigger) gives the delta
        // settled→source. At progress=1 the surface looks like the trigger (small,
        // offset to the source); at progress=0 it is identity (its settled rect). We
        // drive the spring inversion 1→0 so it blooms FORWARD onto its own rect.
        morph = new ElementMorph(
            { x: settled.x, y: settled.y, width: settled.width, height: settled.height },
            {
                x: triggerRect.x,
                y: triggerRect.y,
                width: triggerRect.width,
                height: triggerRect.height,
            },
            { transformOrigin },
        );

        // Drive the three coupled channels off ONE spring sample. The spring eases
        // 0→1 over the duration; the SPATIAL inversion reads (1 - eased) so the
        // surface starts at the trigger (eased=0 → inv=1) and blooms to settled
        // (eased=1 → inv=0). The opacity + blur couple on the SAME normalized eased
        // progress (fade in, decongest out). Compositor-only — transform/opacity/
        // filter ONLY (never a layout property).
        startTs = 0;
        const step = (ts: number): void => {
            if (!morph || !surface.value) return;
            if (startTs === 0) startTs = ts;
            const t = Math.min(1, (ts - startTs) / durationMs);
            const eased = easing.fn(t); // the spring curve (overshoot interior)
            const inv = 1 - eased; // 1 at trigger → 0 at settled
            morph.apply(el, inv); // writes transform + transform-origin
            el.style.opacity = String(Math.min(1, Math.max(0, eased)));
            const blurPx = blurStart * inv;
            // The decongest on the surface's OWN pixels (`filter`), so the resting
            // glass-tier `backdrop-filter` plate blur is never clobbered.
            el.style.filter = `blur(${blurPx.toFixed(2)}px)`;
            if (t < 1 && typeof requestAnimationFrame === "function") {
                raf = requestAnimationFrame(step);
            } else {
                // Settled — clear the inline transform so the CSS recipe/layout owns
                // the resting frame (no stale transform pinned on the surface).
                clearTransform(el);
                el.style.opacity = "1";
                morph = null;
                raf = 0;
            }
        };
        if (typeof requestAnimationFrame === "function") {
            raf = requestAnimationFrame(step);
        } else {
            // SSR / no-rAF — snap to settled.
            clearTransform(el);
            el.style.opacity = "1";
        }
    }

    function conceal(): void {
        cancelRaf();
        morph = null;
        const el = asElement(surface.value);
        if (el) clearTransform(el);
    }

    onScopeDispose(() => {
        cancelRaf();
        morph = null;
    });

    return { reveal, conceal };
}
