// Sub-tree barrel for the keyframes.js-FREE + vueuse-FREE motion leaves.
//
// AP.W3 R0G-7 — the engine-free core of the motion family. These leaves import
// `vue` only (verified leaf by leaf, W1.2 §A.1); none statically reaches
// `@mkbabb/keyframes.js` or `@vueuse/core`. The leaf `.ts` files live one level
// up in `composables/motion/`; this barrel re-points them onto the flat
// `@mkbabb/glass-ui/motion-core` subpath so a cheap-leaf import never walks the
// keyframes-bearing siblings' module-eval imports.
//
// `constants` is duplicate-exported here and on the keyframes-bearing `/motion`
// barrel — pure data (DAMPING, SNAP_THRESHOLD, RAFLoopTiming type), no heavy
// transitive, identical symbols. The bearing leaves read DAMPING/SNAP_THRESHOLD
// from `../constants`, so both surfaces ship it. Benign (W1.2 §A.2).
export * from "../constants";
export * from "../useStaggerReveal";
export * from "../useScrollProgress";
export * from "../useRAFLoop";
export * from "../useIntersectionPause"; // exports PausableRuntime too
export * from "../useStagger";
// AQ.W3 §6 — the INP-under-load lever. Keyframes-FREE + vueuse-FREE (pure
// native `scheduler.yield` + MessageChannel/setTimeout fallback), so it ships on
// the engine-free `/motion-core` surface alongside `useRAFLoop` (its companion
// for the chunked-work case) — NOT on the keyframes-bearing `/motion` barrel.
export * from "../useYieldToMain";
// AS.W3 §G4 — the `scheduler.postTask` priority lever, companion to
// `useYieldToMain` for the schedule-at-priority case. Keyframes-FREE +
// vueuse-FREE (native `scheduler.postTask` + `MessageChannel`/`setTimeout`
// fallback), so it ships on the engine-free `/motion-core` surface.
export * from "../usePrioritizedTask";
// AQ.W5 §Design 3 — the View-Transitions motion substrate (the cross-repo
// coupling contract muster J.W5 consumes). Dependency-free (no `vue`, no
// `@mkbabb/keyframes.js`, no `@vueuse/core`), so it ships on the engine-free
// `/motion-core` surface — and, being heavy-peer-free, it is also root-barrel
// safe (re-exported from the root barrel below for broad reach).
export * from "../useViewTransition";
// AV.W3 — the v-reveal entrance directive. Dependency-free (`vue` type-only —
// no `@mkbabb/keyframes.js`, no `@vueuse/core`), so it ships on the engine-free
// `/motion-core` surface AND is re-exported from the root barrel below.
export * from "../vReveal";
