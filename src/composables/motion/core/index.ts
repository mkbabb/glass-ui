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
// BD.W-GOO-CAROUSEL-DECK — the ONE goo-morph engine (the de-dup of the pager WORM):
// a two-edge stretch→merge→pinch→settle driver consumed by the pager dot (worm scale),
// the carousel slide PLATE, and the deck slide PLATE — ONE engine, per-consumer tokens.
// Composes `useLiquidFlex` + Vue only (engine-FREE + vueuse-FREE), so it ships on the
// `/motion-core` surface AND the root barrel (the `useLiquidFlex` precedent). ≥2
// consumers: PagerDots (worm) + CarouselContent (slide plate) + the deck demo.
export * from "../useGooMorph";
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
// BC.W-SCROLL-TRIGGER — useScrollTrigger: the ONE scroll reader (continuous 0..1
// progress off the SAME rAF read + discrete onCross/onEnter/onLeave trigger-point
// events, direction + per-second velocity + the flip-delta debounce). Composes the
// shared `createScrollReader` rAF-coalesced core (the no-fourth-listener fence — the
// ToC `useScrollTracker` re-points onto the same leaf). Dual-path single-writer: the
// continuous ramp is `supportsScrollTimeline()`-gated (the native `--scroll-t` recipe
// owns it on a supporting engine), the discrete crossing events run the JS tick on
// EVERY engine (events can't ride a CSS timeline). Imports `vue` only — engine-FREE +
// vueuse-FREE, so it ships on the engine-free `/motion-core` surface (the
// `usePointerVelocityField`/`useScrollProgress` precedent). NOT on the keyframes-
// bearing `/motion` barrel; the dock-search consumer reaches it here. The CONTINUOUS
// `useScrollProgress` + the ToC `useScrollTracker` STAY (this wave threads them).
export * from "../useScrollTrigger";
// BC.W-SCROLL-CHROME — useScrollChrome: the floating-chrome COLLAPSE-STATE machine
// (shrink-on-down / expand-on-up / velocity-flick / snap-to-nearest-on-stop), a THIN
// machine OVER useScrollTrigger (the ONE reader — no second listener). PERSISTENT by
// default (collapseOnScroll: false — the iOS-27 lesson). It ramps a 0..1 collapseT off
// the reader's direction + a px range, snaps to a discrete endpoint on scroll-stop, and
// writes the `--chrome-collapse-t` custom the .scroll-chrome recipe reads for the
// compositor shrink/quiet. Imports `vue` only — engine-FREE + vueuse-FREE, so it ships on
// the engine-free /motion-core surface (the useScrollTrigger precedent). The dock-search
// consumer (BC.W-DOCK-SEARCH) + the demo scroll-system header reach it here.
export * from "../useScrollChrome";
// BE.W-HAPTIC-COUPLE — useHaptic: the library's ONE haptic primitive (a thin,
// feature-detected navigator.vibrate wrapper with a bounded named-pattern register
// coupled to the platform's confirm-moments). Imports `vue` ONLY — engine-FREE +
// vueuse-FREE — so it ships on the engine-free /motion-core surface (and reaches the
// root barrel through it, the useLiquidFlex/usePointerVelocityField precedent). A
// keyframes/vueuse import would force the heavy peer onto /motion-core (the SCC-trap,
// H1-fenced). It lives IN core/ (the only leaf that does — the spec's home) so it is
// exported by its local path, not the sibling-up `../` form.
export * from "./useHaptic";
// BD.W-MOTION-WEIGHT — the consumer-side velocity→weight write home + the
// site-local effective-cap derivation (the spike-corrected mechanism: derive the
// cap AT the consuming element off the live `--motion-weight`, NEVER a :root calc
// token). Engine-FREE + vueuse-FREE (no `vue`, no `@mkbabb/keyframes.js`) — ships
// on the `/motion-core` surface alongside the squish primitives it serves. The
// `--stretch` write-sites (useDockOrientationMorph/useTabIndicator/useTabDragMorph/
// useLiquidPress) read the cap through `effectiveCap` + fold the velocity boost via
// `writeVelocityWeight`.
export * from "./writeVelocityWeight";
