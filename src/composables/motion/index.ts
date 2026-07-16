// Sub-tree barrel for the keyframes.js-BEARING motion composables.
//
// AP.W3 R0G-7 — re-pointed to the bearing set only. The keyframes-FREE leaves
// (useStaggerReveal, useScrollProgress, useRAFLoop, useIntersectionPause,
// constants) carved out to the flat `@mkbabb/glass-ui/motion-core`
// sibling subpath (`composables/motion/core/index.ts`); the keyframes-free but
// vueuse-bearing `installDarkModeSync` relocated to `composables/dark/`. This
// barrel ships ONLY the leaves whose module-eval reaches `@mkbabb/keyframes.js`
// (directly or transitively) so a `/motion-core` import stays engine-free.
//
// `constants` stays here too — it is keyframes-free (so it also ships on
// `/motion-core`), but the bearing leaves read DAMPING/SNAP_THRESHOLD from it.
// Duplicate-exporting a pure-data module from two entries is benign (W1.2 §A.2).
//
// NO alias for the relocated free leaves / installDarkModeSync (inv 47);
// consumers rename per call site (see MIGRATION.md / CHANGELOG.md).
export * from "./constants";
export * from "./useSpring";
export * from "./useSpringMount";
// BB.W-PRESS-UNIFY — the ONE interruptible, coupled spring-press. Composes the
// private spring driver (the velocity-continuous re-seat) + `useLiquidFlex`
// (the volume-preserving reciprocal squish) + a `--press-t` drive write into one
// `pressStyle` object. Bound on ≥2 binaries (Button + Card + dock control — the
// J-inv-10 dead-primitive flag cleared). Keyframes-bearing →
// ships on `/motion` ONLY, never the root barrel (the SCC-trap discipline).
export * from "./useLiquidPress";
// BB.W-DRAG-MORPH — the pull/drag-to-morph-squish primitive. Composes the
// UNCONSUMED kf `Draggable` (pointer-capture follow + velocity-window + snap-aware
// fling) + `SpringProgress` + `useLiquidFlex` `"tanh"` velocity-squish into ONE
// gesture. Statically reaches `@mkbabb/keyframes.js` (via `Draggable`), so it rides
// the heavy-peer `/motion` barrel — NOT `/motion-core`.
export * from "./useDragMorph";
// BG.W-MOTION-SPINE — the ONE compositor FLIP/morph runner (`useElementMorph` +
// `asElement` + `lockSpatialTransition`). One NumericAnimation owns playback,
// interruption, PRM seating and the coupled transform/effect channels. Reveal, CTA,
// bloom and drag declare endpoints/configuration rather than minting runners.
// Keyframes-bearing → the heavy-peer `/motion` barrel, NOT /motion-core.
export * from "./useElementMorph";
// BB.W-LIQUID-REVEAL — the iOS-27 bloom-from-source-rect open primitive. Now a THIN
// wrapper over `useElementMorph` (BG.W-MOTION-SPINE): an explicit source→surface FLIP
// blooming FROM the trigger (scale+fade+filter-blur-settle), compositor-only + PRM-snap.
// The CSS `.glass-reveal` recipe is the zero-JS floor the ≥8 overlays compose; this leaf
// is the source-rect REFINEMENT (the dialog-from-button, the dock-from-pill).
export * from "./useLiquidReveal";
// BB.B2 W-DOCKMORPH-CTA — the external-CTA-MORPHS-INTO-dock seam. Composes the SAME
// kf `ElementMorph` + `springTimingFunction` substrate useLiquidReveal activates,
// driven FORWARD (the reveal's inverse): an EXTERNAL CTA flies + reshapes from its
// own rect ONTO a dock control's rect, fades + congests into the glass, then hands
// off. A CONSUMING seam BESIDE W-DOCK-MORPH-FAMILY (no useDockMorph/DOCK_SPRING
// edit). Keyframes-bearing → `/motion` ONLY, never the root barrel (the SCC-trap
// discipline). Compositor-only + PRM-seats.
export * from "./useDockCtaReceive";
// BE.W-BLOOM-UP — the shared-element FLIP where source≠dest (the search-pill→Places-
// sheet, the album-card→fullscreen bloom). Composes the SAME kf `ElementMorph` +
// `springTimingFunction` substrate useLiquidReveal activates (driven 1→0 — the dest
// blooms FROM a SEPARATE source's rect onto its OWN full settled rect, NEVER a box-
// scale that crushes content) PLUS a 4TH COLOR channel on the destination FIELD (the
// field warms to the source's album hue via the registered @property --glass-ambient-
// hue/-strength on the spring curve — the f_009→f_010 iOS field-warm). Keyframes-
// bearing → `/motion` ONLY, never the root barrel (the SCC-trap discipline).
// Compositor-only on the surface + Safari-safe + PRM-snap.
export * from "./useBloomUp";
export * from "./useNumericTransition";
export * from "./useAnimatedNumber";
// AW.W19/Item-5 (extended) — useAnimatedNumberMap re-instated: removed at the AV
// cbbaeb0 orphan sweep, but it has ≥2 LIVE external consumers over /motion
// (muster ×3: ssr-entry/useReRank/RankedVerdict; speedtest ×2 numeric readouts)
// — the same internal-only-rg blind spot that
// mis-pruned the /dom leaves. Keyframes-bearing (composes useAnimatedNumber).
export * from "./useAnimatedNumberMap";
// AV.W3 — the editorial count-up animator. Rides the keyframes LIGHT
// `NumericAnimation` engine (value.js-free callable easing) → keyframes-BEARING,
// so it ships ONLY here (`/motion`), NOT on `/motion-core` and NOT on the root.
export * from "./useCountup";

// The semantic spring register is Glass-owned pure data. Engine primitives stay
// at their authority: consumers import them directly from @mkbabb/keyframes.js.
export {
    SPRING_PRESETS,
    springPreset,
    type SpringPresetRow,
    type SpringPresetName,
} from "./springPresets";
