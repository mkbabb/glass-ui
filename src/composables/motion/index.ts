// Sub-tree barrel for the keyframes.js-BEARING motion composables.
//
// This entry exposes only the keyframes-bearing set. The keyframes-free leaves
// (useStaggerReveal, useScrollProgress, useRAFLoop, useIntersectionPause,
// constants) carved out to the flat `@mkbabb/glass-ui/motion-core`
// sibling subpath (`composables/motion/core/index.ts`); the keyframes-free but
// vueuse-bearing `installDarkModeSync` relocated to `composables/dark/`. This
// barrel ships ONLY the leaves whose module-eval reaches `@mkbabb/keyframes.js`
// (directly or transitively) so a `/motion-core` import stays engine-free.
//
// `constants` stays on this public surface too — it is keyframes-free (so it also
// ships on `/motion-core`), but the bearing leaves read DAMPING/SNAP_THRESHOLD
// directly from its `core/` owner.
// Duplicate-exporting a pure-data module from two entries is benign.
//
// No alias remains for the relocated free leaves or `installDarkModeSync`;
// consumers rename per call site (see MIGRATION.md / CHANGELOG.md).
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
// Shared-element FLIP where source≠destination (the search-pill→Places-
// sheet, the album-card→fullscreen bloom). Composes the SAME kf `ElementMorph` +
// `springTimingFunction` substrate useLiquidReveal activates (driven 1→0 — the dest
// blooms FROM a SEPARATE source's rect onto its OWN full settled rect, NEVER a box-
// scale that crushes content) PLUS a 4TH COLOR channel on the destination FIELD (the
// field warms to the source's album hue via the registered @property --glass-ambient-
// hue/-strength on the spring curve). Keyframes-
// bearing → `/motion` ONLY, never the root barrel (the SCC-trap discipline).
// Compositor-only on the surface + Safari-safe + PRM-snap.
export * from "./reveal/useBloomUp";
export * from "./number/useNumericTransition";
export * from "./number/useAnimatedNumber";
// `useAnimatedNumberMap` is distinct from the scalar helper and has external
// consumers in downstream apps. It is keyframes-bearing because it composes
// `useAnimatedNumber`.
export * from "./number/useAnimatedNumberMap";
// Editorial count-up animator. Rides the keyframes LIGHT
// `NumericAnimation` engine (value.js-free callable easing) → keyframes-BEARING,
// so it ships ONLY here (`/motion`), NOT on `/motion-core` and NOT on the root.
export * from "./number/useCountup";

// The semantic spring register is Glass-owned pure data. Engine primitives stay
// at their authority: consumers import them directly from @mkbabb/keyframes.js.
export {
    SPRING_PRESETS,
    springPreset,
    type SpringPresetRow,
    type SpringPresetName,
} from "./spring/springPresets";
