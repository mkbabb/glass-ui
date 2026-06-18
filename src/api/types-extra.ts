// @mkbabb/glass-ui/api — type-publication extension module (BB.W-CARVE5 carve).
//
// The composable-return + motion-curve type re-exports carved out of api/index.ts
// to hold the discovery barrel under the no-god-module bound. PURE re-exports from
// each canonical home (never declares its own types) — re-joined into the
// @mkbabb/glass-ui/api surface by api/index.ts via `export type * from`, so the
// published subpath symbol set is byte-identical. NO grep-locked discovery types
// (BorderProgress/EasingPicker/Surface/IconChip/HandMark/PagerDots/SpaView) live
// here — those stay textually in api/index.ts for the per-surface source gates.

// ── Count-up animator ────────────────────────────────────────────────────────
// `Countup` — the `{ runActive, settle, cancel }` control shape `useCountup`
// returns; `UseCountupOptions` — its `{ easeFn, skip }` options. `useCountup`
// is keyframes-bearing (it rides `NumericAnimation`), so the composable itself
// ships ONLY on `@mkbabb/glass-ui/motion`, not the root barrel.
export type { Countup, UseCountupOptions } from "../composables/motion/useCountup";

// ── useDragMorph — the pull/drag-to-morph-squish primitive (BB.W-DRAG-MORPH) ──
// `DragMorphAxis` — the morph axis ("x"|"y"); `DragMorphSnapTarget<V>` — one snap
// target ({ value, center }); `UseDragMorphParams<V>`/`UseDragMorphReturn` — the
// gesture's params/return. `useDragMorph` is keyframes-bearing (it wires the kf
// `Draggable`), so the composable ships ONLY on `@mkbabb/glass-ui/motion`, not the root.
export type {
    DragMorphAxis,
    DragMorphSnapTarget,
    UseDragMorphParams,
    UseDragMorphReturn,
} from "../composables/motion/useDragMorph";

// ── useLiquidReveal — the iOS-27 bloom-from-source-rect open (BB.W-LIQUID-REVEAL) ──
// `LiquidRevealPreset` — the spring register ("snappy"|"bouncy"); `UseLiquidRevealOptions`
// — the leaf's options ({ trigger, preset, blur, respectReducedMotion });
// `UseLiquidRevealReturn` — the { reveal, conceal } pair. `useLiquidReveal` is
// keyframes-bearing (it composes the kf ElementMorph + springTimingFunction), so the
// composable ships ONLY on `@mkbabb/glass-ui/motion`, not the root.
export type {
    LiquidRevealPreset,
    UseLiquidRevealOptions,
    UseLiquidRevealReturn,
} from "../composables/motion/useLiquidReveal";

// ── useDockCtaReceive — the external-CTA-morphs-into-dock receive seam (BB.B2 W-DOCKMORPH-CTA) ──
// `DockCtaReceivePreset` — the spring register ("snappy"|"bouncy", matching useLiquidReveal so
// the two seams read as ONE family); `UseDockCtaReceiveOptions` — the leaf's options
// ({ dockControl, preset, blur, respectReducedMotion, onReceived }); `UseDockCtaReceiveReturn`
// — the { receive, reset } pair. useDockCtaReceive composes the SAME kf ElementMorph +
// springTimingFunction substrate useLiquidReveal activates (driven FORWARD — the reveal's
// inverse), a CONSUMING seam beside W-DOCK-MORPH-FAMILY (no dockMorphContext/DOCK_SPRING edit).
// Keyframes-bearing → ships ONLY on `@mkbabb/glass-ui/motion`, never the root.
export type {
    DockCtaReceivePreset,
    UseDockCtaReceiveOptions,
    UseDockCtaReceiveReturn,
} from "../composables/motion/useDockCtaReceive";

// ── Motion suite + curve library (AY.W-MOTION2) ───────────────────────────────
// `/motion` is the distribution seam for the @mkbabb/keyframes.js STATIC suite
// (NumericAnimation, Sequence, the spring/FLIP/gesture/stagger constructors,
// loadAnimationEngine itself) — re-exported verbatim; the DYNAMIC engine surface
// stays behind `loadAnimationEngine()`. The complete curve library + the CSS↔JS
// `MOTION_CURVES` table ship on the value.js-bearing flat sibling `/motion-curves`
// (the §2.2 carve — value.js is a ~124 KB peer kept OFF /motion's eager graph).
// The shared (response, ζ) `SPRING_PRESETS` table is value.js-free pure data on both.
//
// `Easing`/`TimingFunction` — the keyframes.js callable-easing shapes a consumer
// passes to a `NumericAnimation`/`SpringProgress`. `MotionCurve` — one row of the
// CSS↔JS table (`{ token, kind, js, canonical?, note }`). `SpringPresetRow`/
// `SpringPresetName` — the shared spring-preset table types.
export type { Easing, TimingFunction } from "../composables/motion/suite";
export type {
    MotionCurve,
    MotionCurveKind,
    CurveFn,
    SpringPresetRow,
    SpringPresetName,
} from "../composables/motion/curves";
