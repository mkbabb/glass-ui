// BG.W-MOTION-SPINE — useElementMorph: the ONE compositor FLIP/morph runner.
//
// Three leaves — useLiquidReveal (the bloom-from-source open), useDockCtaReceive (the
// external-CTA-into-dock morph), useBloomUp (the shared-element source≠dest bloom) —
// each shipped their OWN copy of the identical mechanism: measure the two rects, sample
// the spring from SPRING_PRESETS, construct `new ElementMorph`, run a `requestAnimation
// Frame` step loop writing transform/opacity/filter, snap under reduced-motion, clear on
// settle. That is the same rAF integrator + the same PRM branch + the same compositor-
// only invariant, THREE times (the DRY the SOTA fewer-sharper-primitives law forbids).
//
// This is the spine those three collapse onto: ONE `new ElementMorph`, ONE rAF `step()`,
// ONE PRM snap, ONE compositor-only invariant (transform/opacity/filter/`--*` only —
// NEVER width/height/top/left/padding, the A'-3 lesson `proof:no-layout-animation`
// enforces library-wide). The spring curve is sampled from the SAME `SPRING_PRESETS`
// table the `--spring-*` CSS tokens generate from (`springPreset(name)` → the analytic
// (response, ζ) → `springTimingFunction` — never a hand-authored curve), so the JS morph
// and the CSS recipes ride ONE spring family. The velocity-continuous re-seat is the kf
// `ElementMorph`'s own compositor delta; a `play()` mid-flight re-measures + retargets
// (never restarts a fresh transition from the current computed value — the iOS
// interruptible contract).
//
// TWO PLAY DIRECTIONS off the ONE `ElementMorph(from, to)` (apply(el,0)=from, apply(el,1)
// =to):
//   • direction "in"  — the FLIP INVERSION (arrive). Drives the morph 1→0: the surface
//     starts looking like `to` (small, offset to the source) and blooms FORWARD onto
//     `from` (its own settled rect). opacity fades IN, filter blur DECONGESTS to 0.
//     (useLiquidReveal / useBloomUp — `from` is "self", `to` is the trigger/source.)
//   • direction "out" — the FORWARD play (depart). Drives 0→1: the surface starts at
//     `from` (its own rect) and flies + reshapes ONTO `to`. opacity fades OUT, filter
//     blur CONGESTS to the target radius. (useDockCtaReceive — `from` is "self", `to` is
//     the dock control.)
// opacity = 1 − morphProgress and blur = radius · morphProgress in BOTH directions (the
// surface is most-transparent + most-congested at the small `to` end), so the channel
// math is direction-agnostic once `direction` fixes morphProgress.
//
// PRM-SAFE BY CONSTRUCTION. Under `prefers-reduced-motion: reduce` `play()` snaps to the
// terminal in ONE step — the spatial channels (transform/blur) never paint an in-between
// frame, the fade survives (opacity is not a vestibular trigger). `onSettled` still fires
// (the gesture always completes; the cta hand-off + the bloom field-land are not gated on
// the animation).
//
// THE DRIVER-LOCK SEAM (`lockSpatialTransition`). An engaged driver sets inline
// `transition-property: none` on its target so the rAF transform writes are not fought by
// the F5.2 liquid-weight `transition` default (or any Tailwind `transition*` utility); the
// lock releases on settle/cancel. Exported standalone for any other spatial driver.

import {
    ElementMorph,
    springTimingFunction,
    type Easing,
    type MorphRect,
} from "@mkbabb/keyframes.js";
import {
    onScopeDispose,
    readonly,
    ref,
    type ComponentPublicInstance,
    type Ref,
} from "vue";
import { springPreset, type SpringPresetName } from "./springPresets";

/** A morph endpoint — a templateRef to an element/component, or the literal `"self"`
 *  (the morphed surface's OWN settled rect). */
export type MorphEndpoint =
    | Ref<HTMLElement | ComponentPublicInstance | null>
    | "self";

/** The morph register — `snappy` (the quick app-open default) or `bouncy` (the emphatic
 *  large-surface bloom). A subset of the named `SPRING_PRESETS` rows shared by every
 *  bloom leaf so the family reads as ONE spring register. */
export type ElementMorphPreset = Extract<SpringPresetName, "snappy" | "bouncy">;

/** The declarative channel set the morph couples onto the spring clock. */
export interface MorphChannels {
    /** Fade the surface with the morph (opacity = 1 − morphProgress). Default `true`. */
    opacity?: boolean;
    /** The `filter: blur()` magnitude in px at the small `to` end (decongest/congest).
     *  Default `0` (no blur channel). */
    blur?: number;
}

export interface UseElementMorphOptions {
    /** The `apply(el,0)` endpoint. Default `"self"` (the surface's own settled rect). */
    from?: MorphEndpoint;
    /** The `apply(el,1)` endpoint (the foreign trigger/source/dock-control). A null-
     *  resolving ref degrades to a 92%-inset of the surface's own rect (the no-anchor
     *  self-scale fallback — still spring-clocked, never a flat zoom). */
    to?: MorphEndpoint;
    /** `"in"` = FLIP inversion 1→0 (arrive at `from`); `"out"` = forward 0→1 (depart to
     *  `to`). Default `"in"`. */
    direction?: "in" | "out";
    /** The coupled channels (opacity + blur). */
    channels?: MorphChannels;
    /** The spring register (default `snappy`). Sampled via `springPreset(name)`. */
    preset?: ElementMorphPreset;
    /** `transform-origin` resolution: anchor at `from`/`to` (relative to the surface),
     *  `"center"`, or a raw CSS string. Default `"to"`. */
    origin?: "from" | "to" | "center" | string;
    /** Honor `prefers-reduced-motion: reduce` (snap to terminal, fade survives). Default `true`. */
    respectReducedMotion?: boolean;
    /** Fired ONCE at the terminal (animation settle AND the PRM/SSR snap) — the hand-off
     *  seam (the cta seat clear + onReceived, the bloom field-land + onBloomed). */
    onSettled?: () => void;
    /** Fired each frame with the clamped [0,1] eased ARRIVAL progress — the extra-channel
     *  hook (the bloom field-strength ramp). Not called on the PRM/SSR snap; `onSettled`
     *  lands the terminal value there. */
    onFrame?: (progress: number) => void;
}

export interface UseElementMorphReturn {
    /** Measure `from`/`to` fresh + drive the morph. Interruptible — a mid-flight `play()`
     *  re-measures + retargets (never restarts from the current computed value). */
    play: () => void;
    /** Cancel any in-flight morph + release the transition lock (does NOT clear styles
     *  or fire `onSettled` — the abort seam). */
    cancel: () => void;
    /** Clear the inline morph styles (transform/origin/opacity/filter) — the reset seam. */
    clear: (el?: HTMLElement | null) => void;
    /** Statically seat the morph at a fixed [0,1] progress WITHOUT animating (the no-
     *  mount-flash prime — transform only, no rAF, no lock). */
    seat: (progress: number) => void;
    /** `true` while a morph is in flight. */
    playing: Readonly<Ref<boolean>>;
    /** The live eased ARRIVAL progress (0 at play start → 1 at settle). */
    progress: Readonly<Ref<number>>;
}

/**
 * Resolve a templateRef value to its root HTMLElement — accepts an element directly OR a
 * Vue component public instance (its `.$el`). Returns null for a fragment/text root or a
 * nullish ref. THIS is the [[glass-ui binding verification]] cure: a `ref` bound to a
 * COMPONENT resolves to the component public INSTANCE (no `getBoundingClientRect`/
 * `setAttribute`), so the morph silently no-ops / throws. Every bloom leaf imports this
 * ONE resolver (the α binding-verification fix) — a surface/trigger binds either an
 * element ref or a component ref without dying.
 */
export function asElement(
    v: HTMLElement | ComponentPublicInstance | null | undefined,
): HTMLElement | null {
    if (!v) return null;
    if (v instanceof HTMLElement) return v;
    const el = (v as ComponentPublicInstance).$el;
    return el instanceof HTMLElement ? el : null;
}

/** The 92%-inset self-scale fallback (a null-resolving anchor blooms from a small inset
 *  of the surface's own rect — never a flat zoom). */
export function insetSelf(r: MorphRect): MorphRect {
    return {
        x: r.x + r.width * 0.04,
        y: r.y + r.height * 0.04,
        width: r.width * 0.92,
        height: r.height * 0.92,
    };
}

/**
 * The driver-lock seam — set inline `transition-property: none` on `el` (beating the F5.2
 * liquid-weight `transition` default + any Tailwind `transition*` utility) so the rAF
 * transform writes are not fought; the returned release restores the prior value.
 */
export function lockSpatialTransition(el: HTMLElement): () => void {
    const prev = el.style.transitionProperty;
    el.style.transitionProperty = "none";
    return () => {
        el.style.transitionProperty = prev;
    };
}

/** The live reduced-motion probe (matchMedia, SSR-safe) — exported so a wrapper that owns
 *  a NON-animated terminal seat (the cta "snap gone + hand off") shares the ONE probe. */
export function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);
const toRect = (r: DOMRect | MorphRect): MorphRect => ({
    x: r.x,
    y: r.y,
    width: r.width,
    height: r.height,
});

/**
 * The ONE compositor FLIP/morph runner. Composes the kf `ElementMorph` +
 * `springTimingFunction` into a single interruptible, PRM-safe, compositor-only morph the
 * three bloom leaves collapse onto. See the module header for the two directions + the
 * channel math + the PRM snap + the driver-lock seam.
 *
 * @example
 * ```ts
 * const engine = useElementMorph(surfaceRef, {
 *   to: triggerRef, direction: "in", channels: { opacity: true, blur: 4 },
 * })
 * watch(open, (o) => (o ? engine.play() : engine.cancel()))
 * ```
 */
export function useElementMorph(
    surface: Ref<HTMLElement | ComponentPublicInstance | null>,
    options: UseElementMorphOptions = {},
): UseElementMorphReturn {
    const respectPRM = options.respectReducedMotion !== false;
    const direction = options.direction ?? "in";
    const opacityOn = options.channels?.opacity !== false;
    const blurPx = options.channels?.blur ?? 0;
    const originSpec = options.origin ?? "to";

    // The spring curve — the typed {fn} easing from the SAME SPRING_PRESETS row the
    // --spring-<name> CSS tokens generate from (never a hand (response, ζ)). The morph
    // duration is the spring's analytic settle horizon (response · 4, the kf
    // springTimingFunction default maxDuration), mirroring the per-spring clock without
    // re-deriving a token (the W-GLASS-CAL fence — no second clock).
    const { response, dampingFraction } = springPreset(options.preset ?? "snappy");
    const easing: Easing = springTimingFunction({ response, dampingFraction });
    const durationMs = response * 4 * 1000;

    const playing = ref(false);
    const progress = ref(0);

    let morph: ElementMorph | null = null;
    let raf = 0;
    let startTs = 0;
    let releaseLock: (() => void) | null = null;

    function cancelRaf(): void {
        if (raf && typeof cancelAnimationFrame === "function") cancelAnimationFrame(raf);
        raf = 0;
    }

    function clear(elMaybe?: HTMLElement | null): void {
        const el = elMaybe ?? asElement(surface.value);
        if (!el) return;
        el.style.transform = "";
        el.style.transformOrigin = "";
        el.style.opacity = "";
        el.style.filter = "";
    }

    function cancel(): void {
        cancelRaf();
        morph = null;
        releaseLock?.();
        releaseLock = null;
        playing.value = false;
    }

    // Resolve from/to rects + the transform-origin string against the live refs.
    function measure(el: HTMLElement): {
        from: MorphRect;
        to: MorphRect;
        origin: string;
    } {
        const selfRect = toRect(el.getBoundingClientRect());
        const resolve = (ep: MorphEndpoint | undefined): MorphRect => {
            if (ep === undefined || ep === "self") return selfRect;
            const target = asElement(ep.value);
            return target ? toRect(target.getBoundingClientRect()) : insetSelf(selfRect);
        };
        const from = resolve(options.from ?? "self");
        const to = resolve(options.to);
        let origin: string;
        if (originSpec === "center") origin = "center center";
        else if (originSpec === "from")
            origin = `${from.x - selfRect.x}px ${from.y - selfRect.y}px`;
        else if (originSpec === "to")
            origin = `${to.x - selfRect.x}px ${to.y - selfRect.y}px`;
        else origin = originSpec;
        return { from, to, origin };
    }

    // Write the coupled channels for a given eased progress.
    function paint(el: HTMLElement, eased: number): void {
        const morphProgress = direction === "in" ? 1 - eased : eased;
        morph?.apply(el, morphProgress);
        if (opacityOn) el.style.opacity = clamp01(1 - morphProgress).toFixed(4);
        if (blurPx > 0) {
            const b = blurPx * Math.max(0, morphProgress);
            el.style.filter = `blur(${b.toFixed(2)}px)`;
        }
    }

    // The generic terminal — clear the spatial channels, land opacity ("in" arrives
    // visible; "out" departs gone), fire onSettled (the extra hand-off/field-land).
    function terminal(el: HTMLElement): void {
        clear(el);
        if (opacityOn) el.style.opacity = direction === "in" ? "1" : "0";
        morph = null;
        raf = 0;
        releaseLock?.();
        releaseLock = null;
        progress.value = 1;
        playing.value = false;
        options.onSettled?.();
    }

    function seat(p: number): void {
        const el = asElement(surface.value);
        if (!el || raf) return; // never clobber an in-flight morph
        const m = measure(el);
        const seatMorph = new ElementMorph(m.from, m.to, { transformOrigin: m.origin });
        const morphProgress = direction === "in" ? 1 - p : p;
        seatMorph.apply(el, morphProgress);
    }

    function play(): void {
        const el = asElement(surface.value);
        if (!el) return;
        cancel();
        const m = measure(el);

        playing.value = true;
        progress.value = 0;

        // PRM: snap to the terminal in ONE step — zero spatial frames, the fade survives.
        if (respectPRM && prefersReducedMotion()) {
            terminal(el);
            return;
        }

        releaseLock = lockSpatialTransition(el);
        morph = new ElementMorph(m.from, m.to, { transformOrigin: m.origin });
        startTs = 0;
        const step = (ts: number): void => {
            if (!morph || !asElement(surface.value)) {
                cancel();
                return;
            }
            if (startTs === 0) startTs = ts;
            const t = Math.min(1, (ts - startTs) / durationMs);
            const eased = easing.fn(t);
            progress.value = clamp01(eased);
            paint(el, eased);
            options.onFrame?.(clamp01(eased));
            if (t < 1 && typeof requestAnimationFrame === "function") {
                raf = requestAnimationFrame(step);
            } else {
                terminal(el);
            }
        };
        if (typeof requestAnimationFrame === "function") {
            raf = requestAnimationFrame(step);
        } else {
            // SSR / no-rAF — snap to terminal + hand off.
            terminal(el);
        }
    }

    onScopeDispose(cancel);

    return {
        play,
        cancel,
        clear,
        seat,
        playing: readonly(playing),
        progress: readonly(progress),
    };
}
