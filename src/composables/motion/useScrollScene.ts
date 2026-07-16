// useScrollScene — the keyframes.js liquid-weight scroll SPINE (BD.W-SCROLL-LIQUID-ENGINE).
//
// ONE seam unioning the SHIPPED `createScrollReader` (the rAF-coalesced read core — no
// fourth listener) + the keyframes.js synchronous physics primitives `SmoothProgress`
// (scrub inertia) + `SpringProgress` (snap overshoot/settle). It writes a spring-damped
// 0..1 progress to a CSS custom property AND a reactive ref so every felt scroll axis (the
// pin, the progress bar, the chrome collapse) carries the SAME liquid weight on EVERY
// engine — no native `scroll()`/`view()` timeline, no `currentTime: null` deadness.
//
// WHY the synchronous primitives, not `createScrollScene`: `ScrollScene`/
// `createScrollScene` resolve to `undefined` at the installed `@mkbabb/keyframes.js@4.3.0`
// (they live only in a lazily `import()`-ed heavy-engine chunk). `ScrollScene` is itself a
// thin composition of `SmoothProgress` + `SpringProgress` + a parsed range; those three ARE
// synchronously exported, so this composable builds that exact factoring directly — zero
// async load, zero net dep, the same physics. A future kf that statically exports
// `createScrollScene` swaps the internals behind this unchanged signature.
//
// NO perpetual rAF: `SmoothProgress`/`SpringProgress` `.play()` runs only while unsettled
// and auto-parks at rest (the no-momentum-loop fence). The reader writes a fresh target on
// each coalesced scroll tick; the smoother converges to it AFTER the finger lifts — the
// liquid-weight signature.
//
// KEYFRAMES-BEARING → ships on `/motion`, NEVER `/motion-core` (the SCC-trap discipline).

import { SmoothProgress, SpringProgress } from "@mkbabb/keyframes.js";
import {
    getCurrentScope,
    onMounted,
    onScopeDispose,
    readonly,
    ref,
    toValue,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import { createScrollReader, type ScrollReader, type ScrollSource } from "./scrollReader";
import { useReducedMotion } from "./useReducedMotion";

/** The smoother register — a pure-lag low-pass (`SmoothProgress`) or an overshooting
 *  spring (`SpringProgress`). The FELT reveal wants the spring (it overshoots, then
 *  settles — the cartoon slam); the pure-lag legs (a progress number) want the smooth. */
export type ScrollSceneRegister = "smooth" | "spring";

export interface UseScrollSceneOptions {
    /**
     * The scroll source — an element with its own scroll port (the demo passes
     * `main.demo-main-scroller`), the Window, or null. Resolved by `createScrollReader`:
     * an HTMLElement listens on itself, else the document/window. Passed EXPLICITLY (the
     * reader does NOT auto-discover a scroller).
     */
    source: MaybeRefOrGetter<ScrollSource>;
    /**
     * Map a fresh reader read to the raw 0..1 target this scene tracks. Default: the
     * reader's own `position()/extent()` extent-relative progress. A pin passes a custom
     * mapper keyed off a per-tick `getBoundingClientRect` (the pin-slice ratio).
     */
    map?: (reader: ScrollReader) => number;
    /**
     * The liquid-weight scrub ∈ [0, 1] — how much lag the scroll carries. 0 = a 1:1 snap
     * (no weight); higher = heavier drift. Defaults to 1/φ ≈ 0.618 (the golden
     * liquid-weight rest); a call site overrides per scene. PRM → 0. Mapped to the engine
     * damping by `scrubToDamping` (a STATED function, no magic affine constants).
     */
    scrub?: number;
    /** The smoother register (default `smooth` — the pure-lag low-pass). */
    register?: ScrollSceneRegister;
    /**
     * For the `spring` register: the damping ratio ζ. < 1 overshoots (the felt slam),
     * 0.85 ≈ the `--spring-gentle` identity. Default 0.85. Ignored for `smooth`.
     */
    dampingFraction?: number;
    /** The element the damped value is written onto as a custom property (when bound). */
    bindEl?: MaybeRefOrGetter<HTMLElement | null>;
    /** The custom property name to write the damped 0..1 onto (e.g. `--pin-t`). */
    property?: string;
    /** Honor `prefers-reduced-motion: reduce` (scrub → 0, snap 1:1). Default true. */
    respectReducedMotion?: boolean;
}

export interface UseScrollSceneReturn {
    /** The spring-damped 0..1 progress (reactive). The single writer of every felt axis. */
    progress: Readonly<Ref<number>>;
    /** Force a coalesced re-read + re-target now (post-resize / layout shift). */
    recalculate: () => void;
    /** Detach the reader + stop the smoother. */
    dispose: () => void;
}

function clamp01(v: number): number {
    return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * The scrub → damping map — a STATED function, no free affine constants. `scrub` is a
 * normalized lag ∈ [0, 1] (the scrub param; 0 = no weight, 1 = maximum drift).
 * `SmoothProgress.damping` ∈ (0, 1] is "higher = faster convergence", i.e. LESS lag — the
 * inverse polarity. So damping = 1 − scrub·(1 − floor): scrub 0 → damping 1 (instant catch-
 * up, no felt lag); scrub 1 → damping = floor (heaviest drift). The floor keeps the loop
 * from never settling (a damping of 0 stalls). One justified mapping, both engines read it.
 */
function scrubToDamping(scrub: number): number {
    const s = clamp01(scrub);
    const FLOOR = 0.08; // the heaviest-drift damping — still converges (no stall)
    return 1 - s * (1 - FLOOR);
}

/**
 * The liquid-weight scroll spine. Composes the ONE `createScrollReader` + a keyframes.js
 * smoother (`SmoothProgress` / `SpringProgress`); on each coalesced scroll tick it sets the
 * smoother target to the mapped raw progress; the smoother converges with inertia and keeps
 * moving after scroll stops (the liquid weight). Writes the damped 0..1 to `progress` + the
 * optional `property` on `bindEl`.
 *
 * @example
 * ```ts
 * const { progress } = useScrollScene({
 *   source: () => document.querySelector<HTMLElement>("main.demo-main-scroller"),
 *   scrub: 0.618,
 *   bindEl: stageRef,
 *   property: "--scroll-t",
 * })
 * ```
 */
export function useScrollScene(options: UseScrollSceneOptions): UseScrollSceneReturn {
    const {
        scrub = 0.618,
        register = "smooth",
        dampingFraction = 0.85,
        property,
        respectReducedMotion = true,
    } = options;

    const reduced = respectReducedMotion ? useReducedMotion() : ref(false);

    const progress = ref(0);

    // The engine — a low-pass smoother (pure lag) or a spring (overshoot + settle). Both
    // expose `.play(onFrame)` (rAF auto-park) but DIFFERENT target/value surfaces:
    // SmoothProgress.setTarget()/.current ; SpringProgress.target=… /.value.
    const smoother =
        register === "spring"
            ? new SpringProgress({
                  response: 0.5,
                  dampingFraction,
                  initial: 0,
                  respectReducedMotion: false,
              })
            : new SmoothProgress({
                  damping: scrubToDamping(scrub),
                  initial: 0,
                  clamp: true,
                  respectReducedMotion: false,
              });

    function setTarget(t: number): void {
        const clamped = clamp01(t);
        if (smoother instanceof SpringProgress) smoother.target = clamped;
        else smoother.setTarget(clamped);
    }

    // The per-frame emit — write the damped value to the ref + the bound custom property.
    function emit(value: number): void {
        const v = clamp01(value);
        progress.value = v;
        if (property) {
            const el = toValue(options.bindEl) ?? null;
            el?.style.setProperty(property, String(v));
        }
    }

    // Arm the engine's managed rAF: it ticks only while unsettled, auto-parks at rest.
    smoother.play(emit);

    let reader: ScrollReader | null = null;

    function mapRaw(r: ScrollReader): number {
        if (options.map) return clamp01(options.map(r));
        const extent = r.extent();
        return extent > 0 ? clamp01(r.position() / extent) : 0;
    }

    function onTick(r: ScrollReader): void {
        const raw = mapRaw(r);
        // PRM (or scrub 0) → 1:1 snap, no interpolated drift (the vestibular floor).
        if (reduced.value) {
            setTarget(raw);
            smoother.snap();
            emit(raw);
            return;
        }
        setTarget(raw);
    }

    function attach(): void {
        reader = createScrollReader(toValue(options.source), onTick);
        // One correct initial value on mount (before the first scroll burst).
        reader.schedule();
    }

    function recalculate(): void {
        reader?.schedule();
    }

    function dispose(): void {
        reader?.stop();
        reader = null;
        smoother.stop();
        stopReducedMotionWatch();
    }

    const stopReducedMotionWatch = watch(
        reduced,
        (next) => {
            if (!next || !reader) return;
            const raw = mapRaw(reader);
            setTarget(raw);
            smoother.snap();
            emit(raw);
        },
        { flush: "sync" },
    );

    onMounted(attach);
    if (getCurrentScope()) onScopeDispose(dispose);

    return { progress: readonly(progress), recalculate, dispose };
}
