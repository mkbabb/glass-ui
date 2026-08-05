// Sub-tree barrel for the keyframes.js-FREE + vueuse-FREE motion leaves.
//
// The engine-free core of the motion family. These leaves import `vue` only; none
// statically reaches `@mkbabb/keyframes.js` or `@vueuse/core`. Source leaves live in
// their semantic domains under `composables/motion/`; this barrel exposes the flat
// `@mkbabb/glass-ui/motion-core` subpath so a cheap-leaf import never walks the
// keyframes-bearing siblings' module-eval imports. Leaves stay in their semantic
// domains; this file is the package-entry owner, not a source-convenience barrel.
//
// `constants` is duplicate-exported here and on the keyframes-bearing `/motion`
// barrel — pure data (DAMPING, SNAP_THRESHOLD, RAFLoopTiming type), no heavy
// transitive, identical symbols. Bearing leaves import DAMPING/SNAP_THRESHOLD
// directly from this domain, so both surfaces ship it.
export * from "./constants";
// useStagger has external consumers — ×3, re-measured on the §1.1 walk at BK #19:
// speedtest `useResultReveal.ts:36` + `ResultStack.vue:171`, muster
// `useVerdictMoment.ts:60`, all off `/motion-core`. It is Vue-only, engine-free,
// and vueuse-free, so it ships on /motion-core.
export * from "../reveal/useStagger";
export * from "../scroll/useScrollProgress";
export * from "./useRAFLoop";
export * from "./useReducedMotion";
export * from "./useIntersectionPause"; // exports PausableRuntime too
// INP-under-load lever. Keyframes-free + vueuse-free (pure
// native `scheduler.yield` + MessageChannel/setTimeout fallback), so it ships on
// the engine-free `/motion-core` surface alongside `useRAFLoop` (its companion
// for the chunked-work case) — NOT on the keyframes-bearing `/motion` barrel.
export * from "./useYieldToMain";
// View-Transitions motion substrate. Dependency-free (no `vue`, no
// `@mkbabb/keyframes.js`, no `@vueuse/core`), so it ships on the engine-free
// `/motion-core` surface — and, being heavy-peer-free, it is also root-barrel
// safe (re-exported from the root barrel below for broad reach).
export * from "./useViewTransition";
// The typed ROUTE grammar over that substrate — `routeGrammar` (the table) +
// `routeTransition` (the mutation owner that names the ONE participating window and
// types the transition). Same dependency profile as the substrate it wraps: no `vue`,
// no `@mkbabb/keyframes.js`, no `@vueuse/core`, and no router — so it ships on the
// engine-free `/motion-core` surface beside it. The paired CSS is the grammar block in
// `src/styles/view-transition.css` + the `--route-*` registers.
export * from "../route/routeGrammar";
export * from "../route/useRouteTransition";
// v-reveal entrance directive. Dependency-free (`vue` type-only —
// no `@mkbabb/keyframes.js`, no `@vueuse/core`), so it ships on the engine-free
// `/motion-core` surface AND is re-exported from the root barrel below.
export * from "../reveal/vReveal";
// Shared amorphous flex+squish primitive.
// PURE projection of a caller-driven normalized scalar onto a size span + a
// volume-preserving squish (the reconcile of the tabs-indicator reciprocal-stretch +
// the metaball `sa`/`1/sa` squash). Owns no spring/rAF/element — imports `vue` only,
// so it is engine-FREE + vueuse-FREE and ships on the `/motion-core` surface AND the
// root barrel. ≥2 consumers: useSelectionIndicator (the tabs-indicator squish),
// useLiquidPress, useDragMorph, usePagerWorm (the pager-dots worm), and ScrubberTimeline.
export * from "../spring/useLiquidFlex";
// Shared viz-pointer-physics field (pointer position +
// derived velocity + the ACCEL term), fed by the renderer's frame `tick` (NO own
// rAF), frozen under PRM (`tick(0)`). Imports `vue` only — engine-FREE + vueuse-FREE,
// so it ships on the `/motion-core` surface and the root barrel.
export * from "../pointer/usePointerVelocityField";
// Route pointer broadcaster (Layer 0.5) + four pure per-viz
// pointer-field mappings (Layer 1). `useRoutePointer` is the ONE capture-phase window
// listener a full-bleed `pointer-events:none` background viz reads (it cannot listen for
// itself); the mappings project the field readout onto each viz's inputs. Both import
// `vue` only (the mappings are pure type-only) — engine-FREE + vueuse-FREE, so they ship
// on the `/motion-core` surface AND the root barrel (the usePointerVelocityField precedent).
export * from "../pointer/useRoutePointer";
export * from "../pointer/pointerFieldMappings";
// useScrollTrigger is the single scroll reader (continuous 0..1
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
// `useScrollProgress` + the ToC `useScrollTracker` remain separate consumers.
export * from "../scroll/useScrollTrigger";
// useScrollChrome is the floating-chrome collapse-state machine
// (shrink-on-down / expand-on-up / velocity-flick / snap-to-nearest-on-stop), a THIN
// machine OVER useScrollTrigger (the ONE reader — no second listener). PERSISTENT by
// default (collapseOnScroll: false — the iOS-27 lesson). It ramps a 0..1 collapseT off
// the reader's direction + a px range, snaps to a discrete endpoint on scroll-stop, and
// writes the `--chrome-collapse-t` custom the .scroll-chrome recipe reads for the
// compositor shrink/quiet. Imports `vue` only — engine-FREE + vueuse-FREE, so it ships on
// the engine-free /motion-core surface (the useScrollTrigger precedent). The dock-search
// consumer and demo scroll-system header reach it here.
export * from "../scroll/useScrollChrome";
// Consumer-side velocity→weight writer +
// site-local effective-cap derivation (the spike-corrected mechanism: derive the
// cap AT the consuming element off the live `--motion-weight`, NEVER a :root calc
// token). Engine-FREE + vueuse-FREE (no `vue`, no `@mkbabb/keyframes.js`) — ships
// on the `/motion-core` surface alongside the squish primitives it serves. The
// `--stretch` write-sites (useSelectionIndicator/useTabDragMorph/useLiquidPress)
// read the cap through `effectiveCap` + fold the velocity boost via
// `writeVelocityWeight`.
export * from "./writeVelocityWeight";
// Single traveling-indicator writer + headless
// selection engine (the dock IS SegmentedTabs/ToggleGroup wearing chrome). Both
// import `vue` only (via `useLiquidFlex`/`writeVelocityWeight`/`useTabRovingFocus`,
// all engine-FREE + vueuse-FREE), so they ship on the `/motion-core` surface. The
// CSS-anchor dual path retired — `useSelectionIndicator` is Safari-identical by
// construction; `useSelectionGroup` composes the roving machine + the indicator +
// the scrollIntoView recenter, reka-free.
export * from "../morph/useSelectionIndicator";
export * from "../morph/useSelectionGroup";
