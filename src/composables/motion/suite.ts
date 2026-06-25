// AY.W-MOTION2 — the FULL @mkbabb/keyframes.js STATIC suite, re-exported verbatim
// through `/motion`. glass-ui is the distribution seam, not a fork: every symbol
// here resolves into the peer with NO wrapper, NO rename. A consumer reaches
// `NumericAnimation`, `Sequence`, the spring constructors, the player/orchestration
// types, AND `loadAnimationEngine` itself from ONE place (`@mkbabb/glass-ui/motion`)
// instead of adding a direct `@mkbabb/keyframes.js` dependency + a second vocabulary.
//
// STATIC / DYNAMIC split (load-bearing — keyframes.js `src/animation/index.ts`):
// this barrel re-exports ONLY the 5.x STATIC surface — the static runtime exports
// + the erased types + `loadAnimationEngine` ITSELF. It does NOT statically
// re-export the heavy `AnimationEngine` surface (`KeyframesAnimation`,
// `CSSKeyframesAnimation`, `AnimationGroup`, `presets`, `MotionPath`,
// `DrawSVG`, …) that 5.x deliberately gates behind `loadAnimationEngine()` (the
// package's value.js isolation boundary). Statically flattening those would drag
// the heavy engine graph onto `/motion`'s eager chunk. Consumers reach the engine
// the same way keyframes.js consumers do:
//
//   const engine = await loadAnimationEngine();  // re-exported below
//   new engine.KeyframesAnimation({ ... });
//
// The two-tier parity manifest (`scripts/proof-motion-suite.mjs` / gate
// `proof:motion-suite`) asserts: STATIC rows PRESENT in this dts; DYNAMIC rows
// REACHABLE THROUGH the loader and NOT present statically (a static DYNAMIC row is
// itself a RED — the isolation boundary must not flatten).

// ── STATIC runtime exports (31 — the 5.x light barrel) ────────────────────────
export {
    // Steppers / progress engines
    NumericAnimation,
    SpringProgress,
    SmoothProgress,
    Oscillator,
    // Sequencing + orchestration
    Sequence,
    Timeline,
    ManualTimeline,
    RAFPlayback,
    KeyframesScrollTimeline,
    createNativeTimeline,
    // Layout FLIP + shared-element
    flip,
    flipShared,
    ElementMorph,
    // Gesture
    drag,
    drag2D,
    Draggable,
    // Momentum / inertia
    decay,
    decayRest,
    reseatToSpring,
    probeVelocity,
    reducedMotionScale,
    waveformValue,
    warmEngine,
    // Stagger
    stagger,
    // Spring solver pair (the CSS↔JS curve bridge — MOTION_CURVES references these)
    springTimingFunction,
    springLinearStops,
    // Easing resolution (the value.js registry seam)
    toEasing,
    resolveEasing,
    // Errors
    AnimationOptionError,
    UnknownEasingError,
    // The HEAVY-tier loader itself (static — the engine members it returns are NOT)
    loadAnimationEngine,
} from "@mkbabb/keyframes.js";

// ── Erased types (re-exported for the typed surface) ──────────────────────────
export type {
    // Core easing
    Easing,
    TimingFunction,
    TimingFunctionNames,
    // Spring
    SpringProgressOptions,
    SpringFrameCallback,
    SpringSubscriber,
    SpringLinearStopsOptions,
    SpringTimingFunctionOptions,
    // Smooth / numeric
    SmoothProgressOptions,
    NumericAnimationOptions,
    NumericFrameCallback,
    // Sequence
    SequenceEntry,
    SequenceOptions,
    SequencePosition,
    // Timeline / playback
    TimelineOptions,
    NativeTimelineSpec,
    RAFPlaybackOptions,
    Tickable,
    // FLIP / morph
    FlipOptions,
    ElementMorphOptions,
    MorphRect,
    // Gesture / momentum
    DragOptions,
    DragAxis,
    DragSubscriber,
    DecayOptions,
    DecaySample,
    // Stagger
    StaggerFn,
    StaggerOptions,
    StaggerOrigin,
    // The HEAVY-tier engine surface (the type is static — the runtime is behind the loader)
    AnimationEngine,
    AnimationOptions,
    AnimationFrame,
    InputAnimationOptions,
    ResolvedKeyframes,
    Vars,
} from "@mkbabb/keyframes.js";
