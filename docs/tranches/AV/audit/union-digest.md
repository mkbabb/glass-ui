# Cross-repo union audit synthesis (32-agent)

The value.js/keyframes.js/glass-ui/slides ownership map, de-duplication, and demos-consume-glass-ui plan.

All claims verified. The `--spring-smooth` preset is `response=0.5, ζ=0.86` and the deck spring is `response=0.5, dampingFraction=0.85` — within sub-percent, confirming the deckSpring CSS-half recompute is redundant. The goo-blob hand-rolled `easeInOut`/`easeIn`/`easeOut` are present. I have everything needed to produce the perfected union plan.

---

# THE PERFECTED UNION PLAN

## (1) THE OWNERSHIP MAP

Four repos, one acyclic dependency chain: `value.js ← keyframes.js ← glass-ui ← slides`. Each repo owns one domain and consumes only upstream of itself.

### value.js — color + parsing
**Owns:** All color math (the Ottosson OKLab/OKLCh/sRGB conversions: `srgbToOKLab`, `rawOklabToOklch`, `rawOklchToOklab`, `oklabToLinearSRGB`, `oklabToRgb255`, `gamutMapOKLab`, `isInSRGBGamut`), the 15 color-space classes, gamut/contrast/interpolation helpers. All CSS parsing (`parseCSSColor`, `parseCSSValueUnit`, `parseCSSValue`, `parseCSSTime`, `parseCSSStylesheet`, `parseAnimationShorthand`). The `cssLinear()`/`linear()` CSS-easing serializer (`src/easing.ts`). The canonical `clamp`/`lerp`/`scale` math (`src/math.ts`).
**Consumes:** `@mkbabb/parse-that` only. No `@mkbabb/*` sibling at runtime. (Its demo dev-deps `file:../glass-ui` + `file:../keyframes.js`, but that is demo-only; production value.js has no sibling edge.)
**Boundary rule:** value.js must NOT import `@mkbabb/glass-ui` (DAG invariant, enforced by `proof:color-acyclic` from glass-ui's side).

### keyframes.js — animation
**Owns:** The spring solver and its serializers (`SpringProgress` analytic damped-harmonic-oscillator, `springLinearStops`, `springTimingFunction`). The LIGHT engines (`SmoothProgress`, `NumericAnimation`, `stagger`, `flip`/`flipShared`, `drag`/`Draggable`, `decay`, `Sequence`, `Timeline`, `ElementMorph`) — all value.js-free. The HEAVY engines (`Animation`, `CSSKeyframesAnimation`, `AnimationGroup`) behind `loadAnimationEngine()` dynamic import. Timing-function parsing (cubic-bezier/steps/linear) as a domain-specific easing-contract concern, distinct from value.js value-unit parsing.
**Consumes:** value.js as a true runtime dependency (parser/`ValueUnit`/color-space metadata for the HEAVY engine). Re-declares `TimingFunction` type for parity (no runtime edge; acceptable under `verbatimModuleSyntax`). Re-declares `clamp`/`lerp`/`scale` in `src/animation/internal/leaves.ts` deliberately, to keep value.js off the LIGHT-engine static graph.
**Boundary rule:** value.js color/parsing math is never re-implemented; the HEAVY/LIGHT split keeps value.js a dynamic-only edge for light consumers.

### glass-ui — CORE UI primitives + substrates
**Owns:** The 41 `ui/` shadcn-vue base components + 36 `custom/` packages. The design-token cascade (CSS). The modern-web substrates: `useWebGLCanvas` + `useGlassRenderer` (`/glass`), `useRAFLoop` + `useIntersectionPause` + `useScrollProgress` + `useViewTransition` + `useStagger`/`useStaggerReveal` (`/motion-core`), `useYieldToMain` + `usePrioritizedTask`. The Vue-reactive wrappers over keyframes LIGHT engines: `useSpring`/`useSpringMount`/`useSpringPress`/`useAnimatedNumber`/`useNumericTransition` (`/motion`). The `/color` leaf — the single runtime-JS color hoist that imports value.js and composes `oklchToLinear` (aurora's linear bake), `oklchToGammaRgb` (blob's gamma exit), `cssToOklch`, the `ColorResolver` seam + `defaultBlobColorResolver`. The `--spring-*` CSS tokens GENERATED from keyframes via `scripts/regen-spring-tokens.mjs`.
**Consumes:** value.js (`/color` + aurora composables) and keyframes.js (`/motion` + `regen-spring-tokens.mjs`), both as **optional** peer dependencies reachable only via subpaths. The root barrel is vueuse-free AND keyframes-free AND value.js-free.
**Boundary rule:** no color math re-implemented (`proof:single-color-core`); the `/color` leaf is a true leaf with no back-import (`proof:color-acyclic`); heavy peers reach consumers only through `/motion`, `/color`, `/forms`, `/dark`, `/keyboard`, `/carousel` subpaths.

### slides — deck content
**Owns:** Deck authoring (registry glob-discovery, `meta`/`content` contract), deck-runtime (`useDeck`, `useDeckNav`, `deckKeys`, `useCountup`, `reveal` directive, `pagerWindow`, `captureMode`, `useEdgeZones`), the `deckSpring` editorial spring setup, the til-briefing `constellation.ts` Canvas-2D effect + its `drawAnomaly` skin, edge auth (HMAC middleware), soft-gate (localStorage memo). All slide markup.
**Consumes:** glass-ui (`/dock`, `/button`, `/dialog`, `/dropdown-menu`, `/forms`, `/controls`, `/motion-core`) + keyframes.js (dynamic import in `deckSpring`). No `@mkbabb/value.js` edge; color is CSS-literal-only (`oklch()`/`color-mix()`).
**Boundary rule:** consumes published glass-ui surfaces idiomatically; owns only editorial content. The deck engine (`useDeck`/`deckKeys`/`pagerWindow`) is held local pending a 2nd consumer for the eventual `/deck` lift.

---

## (2) THE DE-DUPLICATION LEDGER

Eight cross-repo duplications. Color (verdict `clean-boundary` across all 7 color lanes), spring-math, parsing, and core-UI-primitive lanes are clean — no folds. The duplications cluster in animation/motion (stagger, FLIP, count-up, RAF, hand-rolled easing), CSS-token forks, and one peerdep mismatch.

| # | Duplication | Canonical owner | The fold (deletes the copy) | Verified |
|---|---|---|---|---|
| **D1** | glass-ui `useStagger` (`useStagger.ts:135` hand-rolls `initialDelayMs + idx * delayMs` setTimeout cascade) + `useStaggerReveal` (`staggerMs * idx` per-index delay) re-implement the delay-distribution ramp. keyframes.js `stagger()` (exported `index.ts:62`, value.js-free LIGHT tier) already does this. Zero imports of keyframes `stagger` exist in glass-ui src. | keyframes.js (`stagger`) | glass-ui refactors both composables to compose keyframes `stagger()` for the ramp; keeps only Vue reactivity + timer-lifecycle (useStagger) and IntersectionObserver gate + view-timeline fallback (useStaggerReveal). | ✓ confirmed: keyframes exports `stagger`, glass-ui imports it nowhere, hand-rolls the ramp |
| **D2** | glass-ui `useGlassCarousel` (FLIP measure/pin/swap/animate, lines 122-207) + dock `useLayerTransition` FLIP fallback (lines 178-269) re-implement the First-Last-Invert-Play sequence. keyframes.js `flip()`/`flipShared()` (`flip.ts`, LIGHT, value.js-free) own it. | keyframes.js (`flip`/`ElementMorph`) | glass-ui migrates both FLIP fallbacks to `flip()` with a mutation callback + `ElementMorph` orchestration; retires the hand-rolled measure/pin/invert. (SpringProgress morph driver stays — that's the spring tier, correctly owned.) | per audit (k-orchestration-tier) |
| **D3** | slides `useCountup` (`useCountup.ts:30-55`) hand-rolls a rAF tick + ease-sampling loop over `[data-countup]` DOM. glass-ui `useRAFLoop` (`/motion-core`) owns the tick substrate; `useAnimatedNumber` owns the number tween. | glass-ui (`useRAFLoop`) | slides folds the rAF tick + ease-sampling core onto `useRAFLoop`; keeps the `[data-countup]` DOM-walk + export/reduced-motion snap as editorial. | per audit (sl-glassui-consumption, mwg-install-a) |
| **D4** | slides `constellation.ts` runs its own `requestAnimationFrame` loop (lines 448-461), re-checks `prefers-reduced-motion` (line 393), and per-slide visibility via MutationObserver (lines 463-476). glass-ui `useRAFLoop` + `useIntersectionPause` own all three. | glass-ui (`useRAFLoop`/`useIntersectionPause`) | slides G.W2 swap: constellation RAF → `useRAFLoop` + `useIntersectionPause` + reduced-motion seam. This makes the slides constellation the **2nd resolving consumer** that unblocks AV.W8 `useCanvas2D` (the ≥2-consumer gate). | per audit (gu-substrates, sl-constellation) |
| **D5** | slides forks glass-ui's easing tokens: `--ease-out: cubic-bezier(0.16,1,0.3,1)` + `--ease-standard: cubic-bezier(0.4,0,0.2,1)` (deck.css:141-142) + `--ease-deck-out`/`--ease-deck-standard` (deck-theme.css:59-60) — byte-identical to glass-ui's `--ease-out-expo`/`--ease-standard`, which slides already imports via `@import "@mkbabb/glass-ui/styles"`. | glass-ui (`--ease-out-expo`/`--ease-standard`) | slides deletes the 4 redeclarations, aliases the imported glass-ui tokens. | ✓ confirmed: forks exist at the cited lines |
| **D6** | slides `deckSpring.ts` lazy-recomputes `springLinearStops({response:0.5, dampingFraction:0.85})` into `--spring-deck`. glass-ui already ships `--spring-smooth` = `springLinearStops({response:0.5, ζ=0.86})` (sub-percent identical) on the `/styles` root slides imports. | glass-ui (`--spring-smooth` token) / keyframes.js (the curve) | slides retires the CSS half: pin `--spring-deck: var(--spring-smooth)`; keep ONLY the JS `deckEase`/`springTimingFunction` swap for the count-up rAF (no token equivalent). | ✓ confirmed: deck=0.85, smooth=0.86; deckSpring recomputes |
| **D7** | glass-ui goo-blob hand-rolls `easeInOut` (`useBlobMood.ts:97`), `easeIn`/`easeOut` (`useBlobSatellites.ts:18-24`) quadratic forms. slides `constellation.ts:181` hand-rolls `easeInOutQuad`. | scope-dependent | goo-blob: hoist the three helpers to a `goo-blob/easing.ts` module (component-scoped) OR consume keyframes if reused elsewhere — current use is single-component, so the local module is the correct fold. slides `easeInOutQuad`: editorial, document in-place (rides D4's constellation lift). watercolor-dot sinusoidal ease: component-local, no fold. | ✓ confirmed: all three hand-rolled forms present |
| **D8** | glass-ui `devDependencies."@mkbabb/keyframes.js": "^2.2.0"` excludes v3, while `peerDependencies` allows `^2.2.0 \|\| ^3.0.0`. Dev/test validate against v2.2.0; downstream (slides) dedupes to v3.0.0. | glass-ui | glass-ui updates the devDependency to `^2.2.0 \|\| ^3.0.0` to harmonize with the peer range, so dev/test runs against the same version downstream resolves. | ✓ confirmed: devDep line 622 = `^2.2.0`; peer line 591 = `^2.2.0 \|\| ^3.0.0` |

Color minor-fold (not a duplication, a color-space discipline): slides has 6 two-color `color-mix(in srgb, ...)` sites + glass-ui has 1 (`glass.css:258`) that should use `in oklab` per CSS guidance. Alpha-only `token N%, transparent` mixes (118 glass-ui + 84 slides) are benign and stay.

---

## (3) THE CORE-vs-SPECIFIC SPLIT

### glass-ui CORE (consumed by slides + value.js demo + keyframes.js demo)
These are shipped, multi-consumer primitives — the ≥2-consumer bar is met:
- **Dock family** — `GlassDock`, `DockLayer`, `DockLayerGroup`, `DockIconButton`, `DockSelectTrigger`, `DockDropdownTrigger`, `useDockState`, `useLayerTransition`. Consumed by all three (slides DeckView, keyframes TopDock, value.js Dock). glass-ui ships ONLY the base `GlassDock`; the role names (`ChromeDock`/`TransportDock`/`CanvasDock`/`ToolDock`) are consumer-side renames, NOT shipped components (the README's "no `<Role>Dock` component" rule).
- **Base UI primitives** — Button, Card, Dialog, Sheet, Tabs, Select, Slider, Input (via `/forms`), Badge, Alert, Tooltip, Popover, DropdownMenu, Switch, Label, etc. value.js demo re-exports 20-24 unchanged; keyframes + slides import directly.
- **`/motion-core`** — `useRAFLoop`, `useIntersectionPause`, `useScrollProgress`, `useStagger`, `startViewTransition`, `supportsViewTransitions`. keyframes demo + slides (post-folds) consume.
- **`/color` leaf** — `ColorResolver` + `defaultBlobColorResolver` + `oklchToLinear`/`oklchToGammaRgb`/`cssToOklch`. aurora + goo-blob consume internally; value.js demo can inject its own resolver.
- **Controls/dark/keyboard/labeled-field/glass-panel** — DarkModeToggle, `useGlobalDark`, keyboard registry, LabeledField family. All three demos consume.

### Moves IN to glass-ui from slides (deck-engine lift, gated)
The deck engine splits cleanly. The geometry-free substrate lifts; the editorial orchestration stays. **The lift is BLOCKED on the ≥2-consumer gate** — consumer #1 is slides til-briefing (shipped); consumer #2 is the glass-ui demo `deck.vue` story (a named hard deliverable, NOT yet authored; the `_fixture` dev deck does not count).
- **Lifts (move-clean):** `useDeck` (headless reactive stepper, no DOM, vueuse/keyframes-free), `deckKeys` → `useDeckKeyboard` (pure keyboard handler), `pagerWindow` (windowing contract).
- **Lifts (needs rewrite on lift):** `DeckPager.vue` (token seams `--deck-pager-active`, derived-fit formula), `DeckSlide.vue` (declarative `[data-state]` host).
- **Future substrate (AV.W8, also gated on D4):** `useCanvas2D` (composes `useRAFLoop` + `useIntersectionPause` + reduced-motion) + the `Constellation` procedural primitive (proximity-graph lattice + 4 neutral render passes: edges, nodes, pointer-web, ripples).

### Stays slides-specific (editorial, must NOT lift)
- `DeckView` (320 LOC presentation orchestration: 16:9 stage, NCSU-red, hash-sync, capture modes, dock chrome) — overfit to slides identity.
- `useDeckNav` (input glue), `useCountup` (explicitly carved as editorial; reaches live slide DOM), `captureMode` (PPTX/PDF/mobile still-capture flags), `useEdgeZones`, `reveal` directive, `deckSpring` JS-half.
- `constellation.ts` `drawAnomaly` skin (red pulsing ring, resolved checkmark, dashed til-briefing label) — the editorial layer wrapping the pinned-node SLOT.
- HMAC edge auth + soft-gate.
- All slide markup + til-briefing/feedback-coder content.

### Stays in the demos (domain-specific, correctly NOT glass-ui)
- value.js demo: color-picker, palette-browser, gradient editor, mix, image-palette-extractor (color-domain logic).
- keyframes.js demo: animation-controls suite (timing panel, keyframe editor, timeline scrubber, easing-curve canvas, playback ribbon) — animation-domain composites. These are a recorded **leverage gap** (350+ LOC each, keyframes-engine-aware) eligible for a future `glass-ui/custom/animation-controls` family, but that is a separate keyframes-demo migration phase, not part of this union close.

---

## (4) THE DEMOS-CONSUME-GLASS-UI PLAN (name-forward coordination)

Both demos already consume glass-ui idiomatically for top-level chrome (dock, dialogs, forms, tabs). The coordination is name-forward: glass-ui supplies/exports the seams, each demo adopts them. No demo currently duplicates a glass-ui UI primitive except two custom-component cases in value.js.

### What glass-ui supplies (exports/documents)
1. **`/dock` composable + injection contract** — export `useDockState` + `useLayerTransition` + a documented `DockLayerContext` (`{ expandMs, collapseDelay, isOpen, isExpanded }`) and the `keepOpen`/`release`/`expand` imperative contract, so value.js demo can wire reactive dock state instead of bare template refs.
2. **`/color` resolver seam** — document `ColorResolver` + `defaultBlobColorResolver` as the canonical injection point; value.js demo injects its own resolver into GooBlob instead of maintaining a local goo-blob copy.
3. **`/motion-core` View-Transitions substrate** — already exports `startViewTransition` + `supportsViewTransitions`; keyframes demo already consumes for scene swaps. Document `useRAFLoop`/`useAnimatedNumber`/`AnimatedDigit` as the canonical count-up/tick path so no future consumer hand-rolls rAF.
4. **`/keyboard` full surface** — `useKeyboardShortcuts`, `registerShortcut`, `useRegisteredShortcuts`, `formatCombo`, `formatComboParts`. keyframes demo currently uses only `registerShortcut`.
5. **`/api` discovery completeness** — add the missing root-barrel composables + option types to the `/api` layer (recorded leverage gap, see below).

### What value.js demo adopts
- **Migrate `@/components/custom/watercolor-dot` → `@mkbabb/glass-ui/watercolor-dot`** (glass-ui owns the PRNG-seeded internalized-filter primitive; the local copy is 107 LOC vs glass-ui's 180-LOC internalized version).
- **Migrate `@/components/custom/goo-blob` → `@mkbabb/glass-ui/goo-blob`** + inject a `ColorResolver` from `/color` (types.ts is line-for-line identical to glass-ui's).
- **Adopt `/dock`'s `useDockState` + `DockLayerContext`** instead of direct `GlassDock` ref imperatives.
- Keep all color-domain custom components (color-picker, palette-browser, gradient, mix) — correctly demo-owned.
- The `/api`-routed-through-subpath imports (`copyToClipboard`, `useTouchGate`) work today; `/api` completion makes them discoverable (no behavior change).

### What keyframes.js demo adopts
- **Adopt the full `/keyboard` surface** (`formatCombo` + `useRegisteredShortcuts`) for the editor keybinding UI.
- Continue consuming `/motion-core` (`startViewTransition`) — already correct; the demo correctly avoids `/motion` (keyframes-bearing) for non-animation chrome to keep the engine out of the eager graph.
- Keep the animation-controls suite local (domain composites) — eligible for a future `glass-ui/custom/animation-controls` family in a separate phase.

### `/api` discovery-layer completion (glass-ui leverage-gap fold)
Add to `/api/index.ts` (these are root-barrel-stable but absent from the discovery layer, forcing two-import patterns):
- Functions: `useTouchGate`, `useResizeObserver`, `useTokenColor`, `useInterval`, `useTimer`, `copyToClipboard`.
- Option/return types: `UseIntervalOptions`/`Controls`, `UseTimerOptions`/`Controls`, `UseResizeObserverOptions`, `UseTokenColorOptions`, `TouchGateReturn`, `UseBreakpointControls`, `UseViewportReady*`, `UseIdleReady*`, `UseTextHighlightControls`, `GlassFilterState`, `GlassTier`, `SortableId`, `UseSortableReturn`, `SortableContainerBinding`.

---

## (5) THE FOLD ROUTING

### Lands in AV (glass-ui checkout, glass-ui CI)
- **D1** — refactor `useStagger` + `useStaggerReveal` onto keyframes `stagger()`.
- **D2** — migrate `useGlassCarousel` + `useLayerTransition` FLIP fallbacks onto keyframes `flip()`/`ElementMorph`.
- **D7 (goo-blob arm)** — hoist `easeInOut`/`easeIn`/`easeOut` to `goo-blob/easing.ts`.
- **D8** — harmonize keyframes.js devDependency range to `^2.2.0 || ^3.0.0`.
- **Color discipline** — `glass.css:258` two-color srgb mix → `in oklab`; add CLAUDE.md note that `in srgb` is sanctioned only for alpha-only derivations.
- **`/api` completion** — add the missing composables + option types (above).
- **Dock-forward waves** — the 7 dock waves (touch-gate, `useDockPopupMutex`, safe-area tokens, `@expand`/`@collapse` events, a11y contract, `useLayerTransition` + `layerProps`, `clampLabel` + `DockBadge`).
- **`/deck` lift (gated on consumer #2)** — git-mv `useDeck`/`deckKeys`/`pagerWindow`, rewrite `DeckPager`/`DeckSlide`. BLOCKED until the glass-ui demo `deck.vue` story lands.
- **AV.W8 (gated on G.W2)** — `useCanvas2D` substrate + `Constellation` primitive. BLOCKED until slides constellation resolves at HEAD (the 2nd consumer).

### Lands in G (slides checkout, slides CI)
- **D3** — fold `useCountup` rAF core onto `useRAFLoop`; keep DOM-walk + snap editorial.
- **D4 (G.W2)** — swap constellation RAF → `useRAFLoop` + `useIntersectionPause` + reduced-motion seam. (This is the unblock trigger for AV.W8.)
- **D5** — delete the 4 easing-token redeclarations; alias glass-ui's `--ease-out-expo`/`--ease-standard`.
- **D6** — pin `--spring-deck: var(--spring-smooth)`; retire deckSpring's CSS half; keep the JS `deckEase` swap.
- **D7 (slides arm)** — document `constellation.ts:181` `easeInOutQuad` in-place as editorial (rides the D4 constellation lift).
- **FOUC fix** — `index.html:6` `content="light"` → `content="light dark"` to match the dark-rendered deck.
- **Color discipline** — 6 two-color `color-mix(in srgb)` sites (feedback-coder Slide05 gradient, HomeView border, DeckSettings icon tint) → `in oklab`.
- **Consumer #2 authoring** — the glass-ui demo `deck.vue` story is a glass-ui (AV) deliverable, but slides records the gate + trigger in G.W3.

### Name-forward coordination (value.js / keyframes.js sessions)
- **value.js demo** — migrate watercolor-dot + goo-blob to glass-ui subpaths; inject `ColorResolver`; adopt `useDockState`. (value.js session, against published/file-linked glass-ui.)
- **keyframes.js demo** — adopt full `/keyboard` surface. (keyframes session.)
- **value.js (lib)** — clarify `src/index.ts:114` comment: the 51 private converters stay internal; the ~9 Ottosson primitives + `colorUnit2` + `parseCSSColor` ARE stable public API. Document glass-ui + keyframes.js as downstream consumers + the DAG no-back-import invariant.
- **keyframes.js (lib)** — no folds; `stagger`/`flip`/`Sequence` are the canonical orchestration tier glass-ui now adopts (D1/D2). Confirm `Sequence` is documented as the multi-step orchestration primitive for future row-cascade/tile-reveal patterns.
- **Cross-repo ledger** — record the canonical spring chain (`value.js cssLinear` → `keyframes.js springLinearStops`/`springTimingFunction` → `glass-ui --spring-* regen tokens` → `slides consumes`) and the invariant: no leaf may redeclare an easing/spring already on glass-ui's `/styles` root.

---

## (6) MODERN-WEB-GUIDANCE ITEMS + BASELINE DISCIPLINES

`modern-web-guidance` installs as a Claude skill into the agent env (it does NOT write per-repo files), so the guidance body is the curated discipline list below. The union-decisive items mapped to owners + Baseline status:

| Guidance item | Baseline | Owner | Union state |
|---|---|---|---|
| **physics-based-easing** (CSS `linear()` = serialized spring) | Widely Available 2023-12-11 | keyframes.js (solver) → glass-ui (`--spring-*` tokens) | Clean at the seam; D6 closes the slides recompute |
| **same-document transitions** (View Transitions) | Newly Available 2025-10-14 | glass-ui (`useViewTransition`, dock crossfade consumer) | Leverage gap: slides drives slide-nav via `[data-state]` cross-fade, never `startViewTransition`. Fold: slides wraps slide-index mutation in `startViewTransition` (with `supportsViewTransitions` guard + PRM + post-finished focus) |
| **scroll-driven** (scroll()/view() timelines) | Newly Available | glass-ui (`scroll-driven.css`, `[data-scroll-reveal]`) | Leverage gap: slides hand-rolls `[data-reveal]` `@keyframes rise/fade`. Fold: adopt `[data-scroll-reveal]` view()-timeline (@supports-gated, monotone fallback retained) |
| **animate-element-entry-exit** (`@starting-style`) | Widely Available 2024-08-06 | glass-ui (`.glass-top-layer` recipes) | Substrate clean; slides reveals can ride it |
| **dark-mode / FOUC** (`color-scheme` meta MANDATORY) | Baseline | glass-ui (`color-scheme: light dark` root) | Slides FOUC gap (D5-adjacent): `content="light"` over dark deck. Fold: `light dark` |
| **css §8** (oklch/oklab `color-mix`) | Baseline | value.js + glass-ui | 6 slides + 1 glass-ui two-color srgb mixes → oklab |
| **apply-webgl-shaders** | Newly Available | glass-ui (`useWebGLCanvas`/`useGlassRenderer`) | Clean; slides constellation is Canvas-2D editorial, correctly local |
| **reduce-style-repetition** (typed `@property`) | Newly Available | glass-ui (tokens.css §18) | Clean; deliberately no `<color>` @property (would resolve once, break color-scheme re-resolution) — the reference for any slides adoption |
| **prefers-reduced-motion** | Baseline | shared | Union-wide compliant (glass-ui 11 stylesheets + slides 14 sites). No fold |

### Baseline-grounded union disciplines (binding)
1. **One color math source** — value.js. No `.ts`/`.vue` re-declaration of the 9 Ottosson primitives (`proof:single-color-core`); CSS token tier exempt.
2. **Color DAG is acyclic** — the `/color` leaf imports value.js and nothing imports a glass-ui component back; value.js never imports glass-ui (`proof:color-acyclic`).
3. **One spring/easing source** — `value.js cssLinear` → `keyframes.js springLinearStops/springTimingFunction` → `glass-ui --spring-* regen tokens` → consumers. No leaf redeclares an easing/spring already on glass-ui's `/styles` root.
4. **One animation orchestration tier** — keyframes LIGHT (`stagger`/`flip`/`Sequence`/`drag`) owns delay distribution + FLIP + multi-step sequencing; glass-ui composables own only Vue reactivity + lifecycle.
5. **Heavy peers are subpath-isolated** — root barrel is vueuse-free + keyframes-free + value.js-free; heavy peers reach consumers only via `/motion`, `/color`, `/forms`, `/dark`, `/keyboard`, `/carousel`.
6. **FOUC + reduced-motion are mandatory** — every consumer declares the schemes it renders (`color-scheme` meta) and guards motion with `prefers-reduced-motion: reduce`.
7. **Two-color mixes use `in oklab`/`in oklch`** — `in srgb` sanctioned only for alpha-only `token N%, transparent` derivations.
8. **Substrate ships only at ≥2 consumers** — `/deck` and `useCanvas2D` are specced but GATED until consumer #2 (the glass-ui demo `deck.vue` story / the slides constellation RAF-swap) resolves at HEAD.

---

**UNION HEADLINE:** Color and spring math are single-sourced and DAG-clean across all four repos; the remaining work is eight surgical folds that route keyframes.js's `stagger`/`flip`/RAF orchestration tier and glass-ui's `--spring-*`/`--ease-*` tokens through the consumers that currently fork them, gated on the two ≥2-consumer substrate lifts (`/deck`, `useCanvas2D`).
