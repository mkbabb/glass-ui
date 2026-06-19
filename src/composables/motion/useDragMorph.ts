// BB.W-DRAG-MORPH — useDragMorph: the pull/drag-to-morph-squish primitive.
//
// The headline iOS-27 move: you can GRAB the live chrome and PULL it. A draggable
// indicator stops being a click-target that glides on selection and becomes a
// PHYSICAL lozenge — it follows the finger ~1:1, STRETCHES along the travel axis by
// drag VELOCITY (a volume-preserving gel-squish, capped LOW so it swells, never
// taffy-pulls), and on release FLINGS velocity-continuously to the NEAREST slot,
// settling with a small ζ<1 overshoot. The motion is grab → follow → squish →
// fling-snap.
//
// THE LOAD-BEARING REUSE (no second engine). glass-ui peer-depends on
// `@mkbabb/keyframes.js`, whose `Draggable` class ships UNCONSUMED at HEAD: it owns
// the complete pointer-capture follow (a `SpringProgress.target` write per
// `pointermove`), a velocity-windowed sample buffer (robust to a jittery last
// frame), and on release a fling that re-seats the spring from `(value,
// releaseVelocity)` — the C¹-continuous interruptible fling. This composable WIRES
// that substrate; it owns NO hand-rolled pointer-velocity sampler and NO parallel
// rAF spring integrator (the D1/D2 fence).
//
// THE SNAP-RESOLUTION INTERIM (the named-successor book). The kf source `Draggable`
// carries a `snap` option (it projects `decayRest` + re-targets the nearest declared
// target itself), but the PUBLISHED dist `DragOptions` at HEAD does NOT yet expose
// `snap`/`bounds`. Per the wave's foreign-tree fence, glass-ui does NOT re-fork the
// pointer-velocity engine; the interim wires the PUBLISHED surface — the free fling
// (`spring.reset(value, releaseVelocity)`) + the SHIPPED `decayRest` projection +
// the `spring.target` re-target — and resolves the nearest snap HERE. When the kf
// `snap` option ships on dist, this collapses onto it (a by-name kf coordination
// ask, NOT a glass-ui fork). The snap math is IDENTICAL to kf's `handleUp` snap arm.
// The squish rides the SHARED `useLiquidFlex` `"tanh"` velocity register (the
// metaball/morph-showcase law), capped at the live `--tab-indicator-max-stretch`
// getter (≤1.08, the anti-taffy-pull bar). The spring is the iOS-canonical drag
// register — the `snappy` SPRING_PRESETS row (response 0.35 / ζ 0.65, the CONTROL
// register; brackets the audit-confirmed 0.3/0.6) — NEVER a new clock (the
// W-GLASS-CAL spring fence holds; `useDragMorph` reuses a preset, never invents one).
//
// COMPOSITOR-ONLY. The follow maps the spring's live position onto a
// `transform: translate` on the morph axis — NEVER `inline-size`/`left`/`top`/
// `width` (W-MOTION-CANON's `proof:no-layout-animation` owns the library-wide
// enforcement; this primitive's transform is compositor-safe by construction). The
// gesture is `transform` over the EXISTING settled footprint; the glass plate is
// untouched (the lozenge deforms, the warm-cream identity does not).
//
// ONE REGISTRY. The primitive owns NO model. On settle the nearest-snap fires a
// consumer-wired `onSnap(value)` callback (guarded single-commit) the consumer
// writes to ITS `v-model` — the single source of truth (the one-registry
// discipline; no shadow state).
//
// PRM-SAFE BY CONSTRUCTION. Under `prefers-reduced-motion: reduce` the gesture STILL
// FUNCTIONS (the drag follows, the snap commits) but the SQUISH is OFF (no `--stretch`
// write — the `useTabIndicator` PRM early-return precedent) and the release is an
// INSTANT nearest-snap (the `SpringProgress.respectReducedMotion` policy snaps to
// target with zero in-between frames). The physics is off; the gesture works.

import { Draggable, SpringProgress, decayRest } from "@mkbabb/keyframes.js";
import {
    computed,
    onScopeDispose,
    readonly,
    ref,
    type ComputedRef,
    type Ref,
} from "vue";
import { useLiquidFlex } from "./useLiquidFlex";
import { springPreset } from "./springPresets";

/** The morph axis — `"x"` tracks the inline (horizontal) travel, `"y"` the block. */
export type DragMorphAxis = "x" | "y";

/**
 * One snap target on the drag axis. `value` is the consumer's domain value (the
 * tab/layer id) committed via `onSnap`; `center` is the target's center coordinate
 * in the SAME px space the drag tracks (the element's offset-axis center).
 */
export interface DragMorphSnapTarget<V = string> {
    value: V;
    center: number;
}

export interface UseDragMorphParams<V = string> {
    /** The draggable element ref (the indicator/handle the gesture captures). */
    el: Ref<HTMLElement | null>;
    /** The morph axis (`"x"` horizontal · `"y"` vertical). May be a getter. */
    axis: DragMorphAxis | (() => DragMorphAxis);
    /**
     * The ordered snap targets, resolved off the consumer's geometry (the
     * center-anchored button/layer centers). May be a getter so a re-measure
     * (a resize, an option change) re-resolves them without reconstruction.
     */
    snapTargets: readonly DragMorphSnapTarget<V>[] | (() => readonly DragMorphSnapTarget<V>[]);
    /**
     * The live cap getter for the squish (`--tab-indicator-max-stretch`, ≤1.08).
     * Defaults to the shared 1.08 fence; a getter re-reads the cascade override.
     */
    maxStretch?: () => number;
    /**
     * Fired ONCE on settle at the nearest snap with the committed value. The
     * consumer writes its `v-model` here — the single source of truth.
     */
    onSnap: (value: V) => void;
    /** Honor `prefers-reduced-motion: reduce` (squish off, instant snap). Default true. */
    respectReducedMotion?: boolean;
}

export interface UseDragMorphReturn {
    /** True while a pointer gesture is in progress (down, not yet settled). */
    dragging: Readonly<Ref<boolean>>;
    /** The live drag position on the morph axis (px), for diagnostics/tests. */
    position: Readonly<Ref<number>>;
    /** The live squish scalar (≥1, capped at the live cap). 1 at rest / under PRM. */
    stretch: Readonly<Ref<number>>;
    /** The `transform: translate` style the consumer binds on the morph element. */
    dragStyle: ComputedRef<Record<string, string>>;
    /**
     * Re-resolve the snap centers + axis (kf reads `snap` at construction, so a
     * geometry change — a resize, an option change, an orientation flip — calls
     * this to rebuild the `Draggable` over the SAME reused spring). Idempotent;
     * a no-op while a gesture is in flight (the rebuild waits for settle).
     */
    refresh: () => void;
    /** Tear down — detach the `Draggable`, dispose the spring + watchers. */
    detach: () => void;
}

function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/**
 * The abstract pull/drag-to-morph-squish gesture. Composes kf `Draggable`
 * (pointer-capture follow + velocity + snap-aware fling) + `SpringProgress` (the
 * physics core) + `useLiquidFlex` (`"tanh"` velocity-squish) into ONE gesture with
 * a consumer-wired single-commit `onSnap`. See the module header for the REUSE +
 * compositor-only + PRM rationale.
 *
 * @example
 * ```ts
 * const { dragging, stretch, dragStyle, detach } = useDragMorph({
 *   el: indicatorRef,
 *   axis: () => (isVertical.value ? "y" : "x"),
 *   snapTargets: () => buttonRefs.value.map((b, i) => ({
 *     value: options.value[i].value,
 *     center: b.offsetLeft + b.offsetWidth / 2,
 *   })),
 *   maxStretch: () => readCap(),
 *   onSnap: (v) => { model.value = v },
 * })
 * ```
 */
export function useDragMorph<V = string>(
    params: UseDragMorphParams<V>,
): UseDragMorphReturn {
    const axisOf = (): DragMorphAxis =>
        typeof params.axis === "function" ? params.axis() : params.axis;
    const targetsOf = (): readonly DragMorphSnapTarget<V>[] =>
        typeof params.snapTargets === "function"
            ? params.snapTargets()
            : params.snapTargets;
    const respectPRM = params.respectReducedMotion !== false;

    const dragging = ref(false);
    const position = ref(0);

    // The spring physics core — the iOS-canonical drag register (the `snappy`
    // CONTROL preset, response 0.35 / ζ 0.65). A SPRING_PRESETS row, NEVER a new
    // clock (the W-GLASS-CAL fence). `respectReducedMotion` snaps to target with
    // zero in-between frames under PRM (the instant-snap half).
    const { response, dampingFraction } = springPreset("snappy");
    // The gesture spring is LAZY — created on the first `reattach` that finds a real
    // element (the dock `ensureSpring` precedent). A `useDragMorph` host that never
    // mounts a draggable element (a `DockLayerGroup` with `draggable:false`/
    // `showRail:false`) mints ZERO SpringProgress, so the gesture spring never counts
    // against the one-morph-engine-per-dock invariant (proof:dock-orchestrator-single).
    // `ensureSpring` also arms the per-frame mirror (`subscribe`) + the rAF lifecycle
    // (`play`) — both deferred to first gesture-arm, NOT setup.
    let spring: SpringProgress | null = null;
    let unsubscribe: (() => void) | null = null;
    function ensureSpring(): SpringProgress {
        if (spring) return spring;
        const s = new SpringProgress({
            response,
            dampingFraction,
            respectReducedMotion: respectPRM,
        });
        spring = s;
        unsubscribe = s.subscribe((v: number) => {
            position.value = v;
            // Drive the squish off the NORMALIZED live position (the "tanh" law).
            // PRM-gated — no deform.
            if (!(respectPRM && prefersReducedMotion())) {
                liquid.drive(normalizedPosition(v));
            }
            // Fire the single commit when the post-release fling settles — ONLY after
            // a real gesture (not the settled-on-mount emit).
            if (hasGestured && !dragging.value && s.settled && !committed) {
                const value = nearestValue(v);
                if (value != null) {
                    committed = true;
                    hasGestured = false;
                    params.onSnap(value);
                }
            }
        });
        // Arm the engine's managed rAF lifecycle (the no-op keeps the auto-resume
        // gate non-null — the useSpring precedent; state read through `subscribe`).
        s.play(() => {});
        return s;
    }

    // The squish — the SHARED `useLiquidFlex` `"tanh"` velocity register (the
    // metaball/morph-showcase law), capped LOW at the live getter. Driven via
    // `drive(t)` off the live NORMALIZED drag position so the |Δt| derivative is
    // the squish travel (a fast pull swells the plate, a slow drag barely moves
    // it). NOT the `squish(frac)` linear-fraction click path (the D2 fence).
    const liquid = useLiquidFlex({
        from: 0,
        to: 1,
        axis: "width",
        squishLaw: "tanh",
        maxStretch: params.maxStretch ?? (() => 1.08),
    });

    // The squish reads 1 under PRM (no deform) — the `useTabIndicator` PRM
    // early-return precedent transposed onto the live read.
    const stretch = computed(() =>
        respectPRM && prefersReducedMotion() ? 1 : liquid.stretch.value,
    );

    // The follow maps the spring position onto a compositor `translate` on the
    // morph axis. The drag is an OFFSET from the settled footprint: the spring
    // tracks the pointer-coordinate domain, so the rendered translate is the
    // delta from the grab origin. NEVER `inline-size`/`left`/`top` (compositor-only).
    const dragOrigin = ref(0);
    const dragStyle = computed<Record<string, string>>(() => {
        if (!dragging.value && (spring?.settled ?? true))
            return {} as Record<string, string>;
        const delta = position.value - dragOrigin.value;
        return {
            translate: axisOf() === "y" ? `0 ${delta}px` : `${delta}px 0`,
        };
    });

    // The normalized travel domain for the squish — the span across the first/last
    // snap centers. `drive(t)` wants 0→1, so map the live position onto that span.
    function normalizedPosition(p: number): number {
        const targets = targetsOf();
        if (targets.length < 2) return 0;
        const first = targets[0]!.center;
        const last = targets[targets.length - 1]!.center;
        const span = last - first;
        if (span === 0) return 0;
        const n = (p - first) / span;
        return n < 0 ? 0 : n > 1 ? 1 : n;
    }

    // The nearest snap target to a coordinate — the kf `handleUp` `nearestSnap`
    // math (closest center; ties → the first). Resolves either the committed VALUE
    // (off the settled spring position) or the retarget CENTER (off the projected
    // release rest).
    function nearestTarget(coord: number): DragMorphSnapTarget<V> | null {
        const targets = targetsOf();
        if (targets.length === 0) return null;
        let best = targets[0]!;
        let bestDist = Math.abs(coord - best.center);
        for (let i = 1; i < targets.length; i++) {
            const t = targets[i]!;
            const d = Math.abs(coord - t.center);
            if (d < bestDist) {
                best = t;
                bestDist = d;
            }
        }
        return best;
    }
    const nearestValue = (coord: number): V | null =>
        nearestTarget(coord)?.value ?? null;

    // CONSUME(kf snap): BC.W-LIQUID-TAB — when keyframes.js republishes past 4.3.0
    // with the `snap`+`bounds`+`rubberBand` `DragOptions` (booked by name in
    // docs/tranches/BC/coordination/asks-and-consumes.md; machine-verified ABSENT on
    // the published 4.3.0 `DragOptions`), the ~12-line published-surface
    // `decayRest`+`nearestTarget`+`spring.target` re-roll BELOW collapses onto the
    // native kf `snap` option AND the pull gains the iOS `rubberBand` overscroll for
    // free. A cheap by-name kf ask — NO peer-spine widen (glass-ui's spine is
    // `^4.0.0`); glass-ui edits ZERO kf tree (the foreign-tree fence, inv-26).
    //
    // The snap RE-TARGET on release (the published-surface interim, IDENTICAL to
    // kf's `handleUp` snap arm). The kf `Draggable` re-seats the spring from
    // `(value, releaseVelocity)` on its own pointerup (the free fling). We then
    // PROJECT the frictional resting point the fling would coast to (`decayRest`,
    // the SHIPPED closed-form glide — same DEFAULT_DECAY_K=5 as kf), pick the
    // nearest snap center, and set `spring.target` to it. `spring.target` re-seats
    // from the current `(x, v)` so the retarget is C¹-continuous (a flick PAST a
    // midpoint snaps forward via the velocity-projected rest; a slow drag short of
    // it snaps back). A mid-fling re-grab re-enters the gesture (the next
    // pointerdown re-seats the spring at the grab point) — interruptible by
    // construction.
    const DECAY_K = 5;
    function commitSnapOnRelease(): void {
        if (!spring) return;
        const projected = decayRest({
            initial: spring.value,
            velocity: spring.velocity,
            friction: DECAY_K,
        });
        const target = nearestTarget(projected);
        if (target) spring.target = target.center;
    }

    // Single-commit guard — the spring can emit several near-settled frames; the
    // commit fires ONCE per gesture (the one-registry discipline forbids a
    // re-fired model write). `hasGestured` arms the commit ONLY after a real
    // pointerdown→release — without it the spring's settled-on-mount emit would
    // commit `onSnap` spuriously (the mount is settled + not dragging).
    let committed = false;
    let hasGestured = false;

    // The kf Draggable — the pointer-capture follow + velocity-window + the C¹
    // fling (the load-bearing reuse, no re-fork of the pointer-velocity engine). We
    // hand it OUR spring so the physics core is the single source of truth. The
    // nearest-snap RE-TARGET on release lives in `commitSnapOnRelease` (the
    // published-surface interim, see the header) — kf flings free, we project +
    // retarget.
    let draggable: Draggable | null = null;

    // (The per-frame mirror `subscribe` + the rAF `play` arm live in `ensureSpring`
    // above — deferred to the first gesture-arm, not setup.)

    let detachDrag: (() => void) | null = null;

    // Re-attach the drag whenever the element appears (the indicator mounts after
    // the first paint). Re-resolve the axis on attach so an orientation flip
    // re-binds the correct pointer axis.
    function reattach(): void {
        detachDrag?.();
        detachDrag = null;
        draggable?.detach();
        const node = params.el.value;
        if (!node) return;
        // (Re)build the Draggable over OUR reused spring (the physics core stays the
        // single source of truth across rebuilds; a rebuild re-resolves the axis on
        // an orientation flip). The snap centers are read live on release
        // (`commitSnapOnRelease`), so the rebuild carries no stale snap state.
        draggable = new Draggable({ spring: ensureSpring(), axis: axisOf() });
        node.addEventListener("pointerdown", onPointerDownCapture);
        detachDrag = draggable.attach(node);
    }

    function onPointerDownCapture(): void {
        dragging.value = true;
        committed = false;
        hasGestured = true;
        dragOrigin.value = ensureSpring().value;
        // While dragging, the squish is live; on settle the watcher releases it
        // to 1 via the normalized-position drive (the travel decays to 0).
    }

    function onPointerUpCapture(): void {
        if (!dragging.value) return;
        // The kf Draggable already re-seated the spring from `(value,
        // releaseVelocity)` on its own pointerup (the free fling). Flip the flag
        // (so the settle watcher arms the single commit) and RE-TARGET to the
        // nearest snap (the published-surface interim).
        dragging.value = false;
        commitSnapOnRelease();
    }

    // The kf Draggable owns the per-gesture pointermove/up; we mirror dragging
    // state off pointerdown (captured above) + a window-level pointerup so the
    // flag clears even when the release lands outside the element (pointer
    // capture delivers it to the element, but a defensive window listener keeps
    // the flag honest).
    function bindWindowUp(): void {
        if (typeof window === "undefined") return;
        window.addEventListener("pointerup", onPointerUpCapture);
        window.addEventListener("pointercancel", onPointerUpCapture);
    }
    function unbindWindowUp(): void {
        if (typeof window === "undefined") return;
        window.removeEventListener("pointerup", onPointerUpCapture);
        window.removeEventListener("pointercancel", onPointerUpCapture);
    }

    // Re-resolve the geometry on demand (the consumer's resize/option watcher) —
    // a no-op mid-gesture (the rebuild would detach the live pointer listeners);
    // the next settle picks up the fresh centers via reattach on the following
    // grab anyway.
    function refresh(): void {
        if (dragging.value) return;
        reattach();
    }

    reattach();
    bindWindowUp();

    function detach(): void {
        const node = params.el.value;
        node?.removeEventListener("pointerdown", onPointerDownCapture);
        detachDrag?.();
        detachDrag = null;
        unbindWindowUp();
        unsubscribe?.();
        draggable?.dispose();
        draggable = null;
    }

    onScopeDispose(detach);

    return {
        dragging: readonly(dragging),
        position: readonly(position),
        stretch: readonly(stretch) as Readonly<Ref<number>>,
        dragStyle,
        refresh,
        detach,
    };
}
