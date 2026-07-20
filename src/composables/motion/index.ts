// Sub-tree barrel for the keyframes.js-BEARING motion composables.
//
// This entry exposes only the keyframes-bearing set. The keyframes-free leaves
// (useScrollProgress, useRAFLoop, useIntersectionPause,
// constants) live on the flat `@mkbabb/glass-ui/motion-core`
// sibling subpath (`composables/motion/core/index.ts`); the keyframes-free but
// vueuse-bearing `installDarkModeSync` lives on `composables/dark/`. This
// barrel ships ONLY the leaves whose module-eval reaches `@mkbabb/keyframes.js`
// (directly or transitively) so a `/motion-core` import stays engine-free.
//
// `constants` stays on this public surface too — it is keyframes-free (so it also
// ships on `/motion-core`), but the bearing leaves read DAMPING/SNAP_THRESHOLD
// directly from its `core/` owner.
// Duplicate-exporting a pure-data module from two entries is benign.
//
// No back-compat aliases: each free leaf and `installDarkModeSync` ships from
// exactly ONE entry.
export * from "./core/constants";
export * from "./spring/useSpring";
export * from "./spring/useSpringMount";
// Single interruptible, coupled spring-press. Composes the
// private spring driver (the velocity-continuous re-seat) + `useLiquidFlex`
// (the volume-preserving reciprocal squish) + a `--press-t` drive write into one
// `pressStyle` object. Button, Card, and dock controls consume it. Keyframes-bearing →
// ships on `/motion` ONLY, never the root barrel (the SCC-trap discipline).
export * from "./spring/useLiquidPress";
// Pull/drag-to-morph-squish primitive. Composes the
// UNCONSUMED kf `Draggable` (pointer-capture follow + velocity-window + snap-aware
// fling) + `SpringProgress` + `useLiquidFlex` `"tanh"` velocity-squish into ONE
// gesture. Statically reaches `@mkbabb/keyframes.js` (via `Draggable`), so it rides
// the heavy-peer `/motion` barrel — NOT `/motion-core`.
export * from "./morph/useDragMorph";
// Single compositor FLIP/morph runner (`useElementMorph` +
// `asElement` + `lockSpatialTransition`). One NumericAnimation owns playback,
// interruption, PRM seating and the coupled transform/effect channels. Reveal, CTA,
// bloom and drag declare endpoints/configuration rather than minting runners.
// Keyframes-bearing → the heavy-peer `/motion` barrel, NOT /motion-core.
export * from "./morph/useElementMorph";
// iOS-style bloom-from-source-rect open primitive. A thin wrapper over
// `useElementMorph`: an explicit source→surface FLIP
// blooming FROM the trigger (scale+fade+filter-blur-settle), compositor-only + PRM-snap.
// The CSS `.glass-reveal` recipe is the zero-JS floor the ≥8 overlays compose; this leaf
// is the source-rect REFINEMENT (the dialog-from-button, the dock-from-pill).
export * from "./reveal/useLiquidReveal";
// External-CTA-to-dock morph. Composes the same
// kf `ElementMorph` + `springTimingFunction` substrate useLiquidReveal activates,
// driven FORWARD (the reveal's inverse): an EXTERNAL CTA flies + reshapes from its
// own rect ONTO a dock control's rect, fades + congests into the glass, then hands
// off beside the dock morph family without changing `useDockMorph` or `DOCK_SPRING`.
// Keyframes-bearing → `/motion` ONLY, never the root barrel (the SCC-trap
// discipline). Compositor-only + PRM-seats.
export * from "./morph/useDockCtaReceive";
export * from "./number/useAnimatedNumber";
// `useAnimatedNumberMap` is distinct from the scalar helper and has external
// consumers in downstream apps (speedtest `useMetricResult`, muster
// `RankedVerdict`). It is keyframes-bearing because it composes `useAnimatedNumber`.
export * from "./number/useAnimatedNumberMap";

// The semantic spring register is Glass-owned pure data. Engine primitives stay
// at their authority: consumers import them directly from @mkbabb/keyframes.js.
export {
    SPRING_PRESETS,
    springPreset,
    type SpringPresetRow,
    type SpringPresetName,
} from "./spring/springPresets";

// The engagement-envelope register is the spring table's companion authority: springs
// own geometry, envelopes own the light and medium channels. It ships HERE, beside
// `springPreset`, because the two are read together — a surface picks a spring for its
// rect and an envelope for its light in the same breath, and splitting them across
// entries invites a call site to invent the constant it cannot find.
export {
    ENGAGE_ENVELOPES,
    ENGAGE_ATTACK_CLASS,
    ACKNOWLEDGE_WINDOW_MS,
    engageEnvelope,
    engageAttackT90Ms,
    type EngageEnvelopeRow,
    type EngageRole,
} from "./engage/engageEnvelopes";
