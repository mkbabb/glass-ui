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
// AW.W19/Item-5 (extended) — useStagger re-instated: removed at the AV cbbaeb0
// orphan sweep, but it has ≥2 LIVE external consumers over /motion-core (muster
// ×2: useVerdictMoment; speedtest ×3: motion.ts/SpeedtestResults/ResultStack) —
// a DISTINCT API from useStaggerReveal. vue-only (engine-free + vueuse-free), so
// it ships on the engine-free /motion-core surface, the same blind-spot class as
// the /dom + useAnimatedNumberMap mis-prunes.
export * from "../useStagger";
export * from "../useScrollProgress";
export * from "../useRAFLoop";
export * from "../useIntersectionPause"; // exports PausableRuntime too
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
// AX.W37 — the named CSS Custom Highlight composable (CSS.highlights registry +
// ::highlight(<name>) Range paint, no <mark> DOM mutation). RE-HOMED here from
// `/dom`: text-highlight is a motion/decoration concern, not a DOM-observer one,
// and its named consumers (fourier equation vars, words search marks, glass-ui
// FuzzySearch) pin the keyframes-FREE+vueuse-FREE `/motion-core` surface. It
// imports `vue` `getCurrentScope`/`onScopeDispose` only — engine-free +
// vueuse-free, so it ships here. CLEAN MOVE (no `/dom` re-export survives).
export * from "../useTextHighlight";
// AZ.W-MORPH-SHOWCASE (W-LIQUID fold) — the shared amorphous flex+squish primitive.
// PURE projection of a caller-driven normalized scalar onto a size span + a
// volume-preserving squish (the reconcile of the tabs-indicator reciprocal-stretch +
// the metaball `sa`/`1/sa` squash). Owns no spring/rAF/element — imports `vue` only,
// so it is engine-FREE + vueuse-FREE and ships on the `/motion-core` surface AND the
// root barrel. ≥2 consumers: useDockOrientationMorph + the tabs-indicator squish.
export * from "../useLiquidFlex";
// BB.B4 (W-VIZ-POINTER) — the shared viz-pointer-physics field (pointer position +
// derived velocity + the ACCEL term), fed by the renderer's frame `tick` (NO own
// rAF), frozen under PRM (`tick(0)`). Imports `vue` only — engine-FREE + vueuse-FREE,
// so it ships on the `/motion-core` surface AND the root barrel. The booked binary
// consumers are the born-WebGPU viz (W-FLOWFIELD + W-CONCENTRIC) — see
// docs/consumer-evidence/use-pointer-velocity-field.md.
export * from "../usePointerVelocityField";
// BC.W-SPLIT-CHARS — the per-glyph split partner the shipped `.char-stagger` CSS
// recipe (typography/utilities.css) has been waiting for. It reads a target's
// `textContent`, mints `.char` spans + the `--char-index`/`--char-total` customs
// the recipe reads, sets `aria-label` to the full text + `aria-hidden` on every
// glyph (the load-bearing a11y fact), and `Intl.Segmenter` grapheme mode is
// emoji/ZWJ safe. Imports `vue` only — engine-FREE + vueuse-FREE, so it ships on
// the `/motion-core` surface AND the root barrel (the `vReveal` precedent). The
// `<SplitChars>` component face composes it (root barrel + /motion-core).
export * from "../useCharStagger";
