# Tranche AV — UNION-COORDINATION (the binding cross-repo union contract)

The single map of the four-repo union: who owns what, where the duplications fold, what
glass-ui ships CORE versus what stays local, how the two sibling demos consume glass-ui,
and how the publish edges sequence around the 3.3.0 cut.

This is the AV-tranche companion to AU's CONSTELLATION-MAP. AU mapped the dependency DAG
and the 3.3.0 publish hinge. This doc maps the UNION: the de-duplication routing, the
CORE-vs-specific split, and the demos-consume-glass-ui asks. It is sourced from
`audit/union-digest.md` (the 32-agent ownership map) and `audit/conjoint-perfection-digest.md §4`
(the cross-repo coordination), both authored against HEAD (glass-ui 3.2.0, branch
`at-dock-convergence`, 2026-06-05/06).

It does NOT re-derive the aurora fix (`AV.md §0`) or the wave table (`AV.md §2`). It maps the
UNION EDGES. Where it cites a sibling, the line traces to that repo's live tranche docs.

---

## §1 — The ownership map

Four repos, one acyclic dependency chain: `value.js ← keyframes.js ← glass-ui ← slides`.
Each repo owns one domain and consumes only upstream of itself. fourier-analysis sits beside
the chain as the orchestrator and is not in the runtime import graph.

### value.js — color math + parsing

**Owns.** All color math — the Ottosson OKLab/OKLCh/sRGB conversions (`srgbToOKLab`,
`rawOklabToOklch`, `rawOklchToOklab`, `oklabToLinearSRGB`, `oklabToRgb255`, `gamutMapOKLab`,
`isInSRGBGamut`), the 15 color-space classes, gamut/contrast/interpolation helpers. All CSS
parsing (`parseCSSColor`, `parseCSSValueUnit`, `parseCSSValue`, `parseCSSTime`,
`parseCSSStylesheet`, `parseAnimationShorthand`). The `cssLinear()`/`linear()` CSS-easing
serializer (`src/easing.ts`). The canonical `clamp`/`lerp`/`scale` math (`src/math.ts`).

**Consumes.** `@mkbabb/parse-that` only. No `@mkbabb/*` sibling at runtime. (Its demo
dev-deps `file:../glass-ui` + `file:../keyframes.js`, but that is demo-only; production
value.js has no sibling edge.) value.js is the SINK — cohort-dependency-free.

**Must NOT import.** `@mkbabb/glass-ui` or `@mkbabb/keyframes.js`. The DAG invariant is
enforced from glass-ui's side by `proof:color-acyclic`.

### keyframes.js — the spring solver + the animation tiers

**Owns.** The spring solver and its serializers (`SpringProgress` analytic damped-harmonic
oscillator, `springLinearStops`, `springTimingFunction`). The LIGHT tier (`SmoothProgress`,
`NumericAnimation`, `stagger`, `flip`/`flipShared`, `drag`/`Draggable`, `decay`, `Sequence`,
`Timeline`, `ElementMorph`) — all value.js-free. The HEAVY tier (`Animation`,
`CSSKeyframesAnimation`, `AnimationGroup`) behind `loadAnimationEngine()` dynamic import. The
orchestration tier (the `stagger`/`flip`/`drag`/`Sequence` delay-distribution, FLIP, and
multi-step sequencing primitives glass-ui adopts in AV.W3).

**Consumes.** value.js as a true runtime dependency (parser/`ValueUnit`/color-space metadata
for the HEAVY tier). Re-declares `clamp`/`lerp`/`scale` in `src/animation/internal/leaves.ts`
deliberately, to keep value.js off the LIGHT-tier static graph.

**Must NOT import.** `@mkbabb/glass-ui`. value.js color/parsing math is never re-implemented;
the HEAVY/LIGHT split keeps value.js a dynamic-only edge for light consumers.

### glass-ui — the CORE UI primitives + the substrates + the adapters

**Owns.** The 41 `ui/` shadcn-vue base components + 36 `custom/` packages. The design-token
cascade (CSS). The substrates — `useWebGLCanvas` + `useGlassRenderer` (`/glass`),
`useCanvas2D` (AV.W8, gated), `useRAFLoop` + `useIntersectionPause` + `useScrollProgress` +
`useViewTransition` + `useStagger`/`useStaggerReveal` (`/motion-core`). The Vue-reactive motion
adapters over keyframes LIGHT (`useSpring`/`useSpringMount`/`useSpringPress`/
`useAnimatedNumber`/`useNumericTransition`, `/motion`). The `/color` leaf — the single
runtime-JS color hoist that imports value.js and composes `oklchToLinear`, `oklchToGammaRgb`,
`cssToOklch`, the `ColorResolver` seam + `defaultBlobColorResolver`. The `--spring-*` CSS
tokens baked from the keyframes solver at BUILD time via `scripts/regen-spring-tokens.mjs`.

**Consumes.** value.js (`/color` + aurora composables) and keyframes.js (`/motion` +
`regen-spring-tokens.mjs`), both as OPTIONAL peer dependencies reachable only via subpaths.

**Must NOT import.** Neither heavy peer onto the root barrel — the root barrel stays
vueuse-free AND keyframes-free AND value.js-free. No color math re-implemented
(`proof:single-color-core`); the `/color` leaf is a true leaf with no back-import
(`proof:color-acyclic`).

### slides — deck content + the til-briefing

**Owns.** Deck authoring (registry glob-discovery, `meta`/`content` contract), deck-runtime
(`useDeck`, `useDeckNav`, `deckKeys`, `useCountup`, `reveal` directive, `pagerWindow`,
`captureMode`, `useEdgeZones`), the `deckSpring` editorial spring setup, the til-briefing
`constellation.ts` Canvas-2D effect + its `drawAnomaly` skin, edge auth (HMAC middleware),
soft-gate (localStorage memo). All slide markup.

**Consumes.** glass-ui (`/dock`, `/button`, `/dialog`, `/dropdown-menu`, `/forms`,
`/controls`, `/motion-core`) + keyframes.js (dynamic import in `deckSpring`). No
`@mkbabb/value.js` edge; color is CSS-literal-only (`oklch()`/`color-mix()`).

**Must NOT import.** No back-edge anywhere — slides is the leaf consumer. The deck engine
(`useDeck`/`deckKeys`/`pagerWindow`) is held local pending a 2nd consumer for the eventual
`/deck` lift.

---

## §2 — The de-dup routing table (D1–D8)

Eight cross-repo duplications. Color (clean-boundary across all 7 color lanes), spring-math,
parsing, and core-UI-primitive lanes are clean — no folds. The duplications cluster in
animation/motion (stagger, FLIP, count-up, RAF, hand-rolled easing), CSS-token forks, and one
peerdep mismatch. Each fold deletes the copy and routes the consumer onto the canonical owner.

| # | Duplication | Canonical owner | The fold | Wave |
|---|---|---|---|---|
| **D1** | glass-ui `useStagger`/`useStaggerReveal` hand-roll the linear delay ramp (`initialDelayMs + idx * delayMs`); keyframes `stagger()` (LIGHT, value.js-free) already owns it | keyframes.js (`stagger`) | both composables compose `stagger()` for the ramp; keep only Vue reactivity + timer/IO lifecycle. CONDITIONAL — adopt IFF a consumer wants the non-linear `from`/`ease` reshaping (else BOOK; linear-only relocation churn is not warranted) | AV.W3 |
| **D2** | glass-ui `useGlassCarousel` FLIP + dock `useLayerTransition` FLIP fallback re-implement First-Last-Invert-Play; keyframes `flip()`/`flipShared()`/`ElementMorph` (LIGHT) own it | keyframes.js (`flip`/`ElementMorph`) | both migrate the measure/pin/invert mechanics onto `flip()`; each keeps its own driver (carousel = CSS transition + transitionend; layer = `SpringProgress`) | AV.W3 |
| **D3** | slides `useCountup` hand-rolls a rAF tick + ease-sample loop with no unmount disposal; glass-ui `useRAFLoop` owns the tick, `NumericAnimation` owns the tween | glass-ui (`useRAFLoop`/`NumericAnimation`) | lift `useCountup` to `/motion` re-expressed on `NumericAnimation` (fixes the leak via `onScopeDispose`); slides swaps the import, keeps the `[data-countup]` DOM-walk + snap editorial | AV.W3 + G.W2 |
| **D4** | slides `constellation.ts` runs its own rAF loop, re-checks `prefers-reduced-motion`, and tracks per-slide visibility via MutationObserver; glass-ui `useRAFLoop` + `useIntersectionPause` own all three | glass-ui (`useRAFLoop`/`useIntersectionPause`) | slides swaps the RAF/visibility machinery onto the two substrates + a reduced-motion seam. This makes slides the 2nd resolving consumer that unblocks AV.W8 `useCanvas2D` | G.W2 (unblocks AV.W8) |
| **D5** | slides forks glass-ui easing tokens (`--ease-out`/`--ease-standard` in deck.css, `--ease-deck-*` in deck-theme.css) byte-identical to glass-ui's `--ease-out-expo`/`--ease-standard`, which slides already imports via `/styles` | glass-ui (`--ease-out-expo`/`--ease-standard`) | slides deletes the 4 redeclarations, aliases the imported glass-ui tokens | G.W0 |
| **D6** | slides `deckSpring.ts` lazy-recomputes `springLinearStops({response:0.5, dampingFraction:0.85})` into `--spring-deck`; glass-ui already ships `--spring-smooth` (response 0.5, ζ 0.86, sub-percent identical) on the `/styles` root slides imports | glass-ui (`--spring-smooth`) / keyframes.js (the curve) | slides pins `--spring-deck: var(--spring-smooth)`, retires the CSS recompute half; keeps ONLY the JS `deckEase`/`springTimingFunction` swap for the count-up rAF | G.W0 |
| **D7** | glass-ui goo-blob hand-rolls `easeInOut`/`easeIn`/`easeOut` quadratics; slides `constellation.ts` hand-rolls `easeInOutQuad` | scope-dependent | goo-blob arm: hoist the three helpers to a component-scoped `goo-blob/easing.ts` (single-component use — the local module is the correct fold). slides arm: `easeInOutQuad` is editorial, documented in-place (rides the D4 constellation lift) | AV.W5 (blob) / G (editorial) |
| **D8** | glass-ui `devDependencies."@mkbabb/keyframes.js": "^2.2.0"` excludes v3, while `peerDependencies` allows `^2.2.0 \|\| ^3.0.0`; dev/test validate against v2.2.0, downstream dedupes to v3.0.0 | glass-ui | glass-ui harmonizes the devDependency to `^2.2.0 \|\| ^3.0.0` so dev/test runs the same version downstream resolves | AV.W0 |

**Color minor-fold (discipline, not a duplication).** slides has 6 two-color
`color-mix(in srgb, ...)` sites + glass-ui has 1 (`glass.css:258`) that should use `in oklab`
per CSS guidance. Alpha-only `token N%, transparent` mixes (118 glass-ui + 84 slides) are
benign and stay. glass-ui sites land AV.W7; slides sites land G.W3.

---

## §3 — The CORE-vs-specific split

### glass-ui CORE — shipped, multi-consumer, the ≥2-consumer bar met

Consumed by slides + the value.js demo + the keyframes.js demo:

- **Dock family.** `GlassDock`, `DockLayer`, `DockLayerGroup`, `DockIconButton`,
  `DockSelectTrigger`, `DockDropdownTrigger`, `useDockState`, `useLayerTransition`. Three
  resolving consumers (slides DeckView, keyframes TopDock, value.js Dock). glass-ui ships ONLY
  the base `GlassDock`; the role names (`ChromeDock`/`TransportDock`/`CanvasDock`/`ToolDock`)
  are consumer-side renames, NOT shipped components (the README's no-`<Role>Dock`-component
  rule).
- **Base UI primitives.** Button, Card, Dialog, Sheet, Tabs, Select, Slider, Input (via
  `/forms`), Badge, Alert, Tooltip, Popover, DropdownMenu, Switch, Label, and the rest. The
  value.js demo re-exports 20–24 unchanged; keyframes + slides import directly.
- **`/motion-core`.** `useRAFLoop`, `useIntersectionPause`, `useScrollProgress`, `useStagger`,
  `startViewTransition`, `supportsViewTransitions`. keyframes demo + slides (post-folds)
  consume.
- **`/color` leaf.** `ColorResolver` + `defaultBlobColorResolver` +
  `oklchToLinear`/`oklchToGammaRgb`/`cssToOklch`. aurora + goo-blob consume internally; the
  value.js demo injects its own resolver.
- **controls / dark / keyboard / labeled-field / glass-panel.** DarkModeToggle,
  `useGlobalDark`, the keyboard registry, the LabeledField family. All three demos consume.

### Lifts IN to glass-ui (the deck-engine lift, gated)

The deck engine splits cleanly: the geometry-free substrate lifts; the editorial
orchestration stays. The lift is BLOCKED on the ≥2-consumer gate — consumer #1 is the slides
til-briefing (shipped); consumer #2 is the glass-ui demo `deck.vue` story (a named hard
deliverable, NOT yet authored; the `_fixture` dev deck does not count).

- **Lifts clean:** `useDeck` (headless reactive stepper, no DOM, vueuse/keyframes-free),
  `deckKeys` → `useDeckKeyboard` (pure keyboard handler), `pagerWindow` (windowing contract).
- **Lifts with a rewrite:** `DeckPager.vue` (token seams, derived-fit formula),
  `DeckSlide.vue` (declarative `[data-state]` host).
- **Future substrate (AV.W8, gated on D4):** `useCanvas2D` (composes `useRAFLoop` +
  `useIntersectionPause` + reduced-motion) + the `Constellation` procedural primitive
  (proximity-graph lattice + neutral render passes) WITHOUT the slides ANOMALY skin.

### Stays slides-specific (editorial, must NOT lift)

- `DeckView` (presentation orchestration: 16:9 stage, NCSU-red, hash-sync, capture modes,
  dock chrome) — overfit to slides identity.
- `useDeckNav`, `useCountup`'s DOM-walk + snap, `captureMode` (PPTX/PDF/mobile flags),
  `useEdgeZones`, `reveal`, the `deckSpring` JS half.
- `constellation.ts` `drawAnomaly` skin (red pulsing ring, resolved checkmark, dashed
  til-briefing label) — the editorial layer wrapping the pinned-node slot.
- HMAC edge auth + soft-gate, the deck-discovery glob, all slide markup +
  til-briefing/feedback-coder content.

### Stays in the demos (domain-specific, correctly NOT glass-ui)

- value.js demo: color-picker, palette-browser, gradient editor, mix,
  image-palette-extractor (color-domain logic).
- keyframes.js demo: the animation-controls suite (timing panel, keyframe editor, timeline
  scrubber, easing-curve canvas, playback ribbon) — animation-domain composites. A recorded
  leverage gap eligible for a future `glass-ui/custom/animation-controls` family in a separate
  keyframes-demo phase, not part of this union close.

---

## §4 — The demos-consume-glass-ui plan (name-forward, inv-16)

Both demos already consume glass-ui idiomatically for top-level chrome (dock, dialogs, forms,
tabs). The coordination is name-forward: glass-ui supplies and documents the seams; each demo
adopts them. These migrations are SIBLING-OWNED — the value.js and keyframes.js sessions
execute against the published or file-linked glass-ui; glass-ui writes no sibling source
(inv-16). No demo-side code is forced now; the coordination records the muster.

### What glass-ui supplies (exports + documents)

1. **`/dock` composable + injection contract.** Export `useDockState` + `useLayerTransition`
   + a documented `DockLayerContext` (`{ expandMs, collapseDelay, isOpen, isExpanded }`) and
   the `keepOpen`/`release`/`expand` imperative contract, so the value.js demo wires reactive
   dock state instead of bare template refs.
2. **`/color` resolver seam.** Document `ColorResolver` + `defaultBlobColorResolver` as the
   canonical injection point so the value.js demo injects its own resolver into GooBlob
   instead of maintaining a local goo-blob copy.
3. **`/motion-core` count-up/tick path.** `startViewTransition` + `supportsViewTransitions`
   already ship (keyframes demo consumes for scene swaps). Document
   `useRAFLoop`/`useAnimatedNumber`/`AnimatedDigit` as the canonical count-up/tick path so no
   future consumer hand-rolls rAF.
4. **`/keyboard` full surface.** `useKeyboardShortcuts`, `registerShortcut`,
   `useRegisteredShortcuts`, `formatCombo`, `formatComboParts`. The keyframes demo currently
   uses only `registerShortcut`.
5. **`/api` discovery-layer completion.** Promote the root-barrel-stable composables + option
   types absent from the discovery layer (forcing two-import patterns today): functions
   `useTouchGate`, `useResizeObserver`, `useTokenColor`, `useInterval`, `useTimer`,
   `copyToClipboard`; option/return types `UseIntervalOptions`/`Controls`,
   `UseTimerOptions`/`Controls`, `UseResizeObserverOptions`, `UseTokenColorOptions`,
   `TouchGateReturn`, `GlassFilterState`, `GlassTier`, `SortableId`, `UseSortableReturn`,
   `SortableContainerBinding`, and the rest named in `union-digest §4`.

### The concrete name-forward asks

**value.js demo (value.js M session executes):**
- Migrate `@/components/custom/watercolor-dot` → `@mkbabb/glass-ui/watercolor-dot` (glass-ui
  owns the PRNG-seeded internalized-filter primitive; the local copy is 107 LOC vs glass-ui's
  180-LOC version).
- Migrate `@/components/custom/goo-blob` → `@mkbabb/glass-ui/goo-blob` + inject a
  `ColorResolver` from `/color` (the local `types.ts` is line-for-line identical to
  glass-ui's).
- Adopt `/dock`'s `useDockState` + `DockLayerContext` instead of direct `GlassDock` ref
  imperatives.
- Keep all color-domain custom components (color-picker, palette-browser, gradient, mix) —
  correctly demo-owned.

**keyframes.js demo (keyframes session executes):**
- Adopt the full `/keyboard` surface (`formatCombo` + `useRegisteredShortcuts`) for the editor
  keybinding UI.
- Continue consuming `/motion-core` (`startViewTransition`); keep avoiding `/motion`
  (keyframes-bearing) for non-animation chrome so the engine stays out of the eager graph.
- Keep the animation-controls suite local — eligible for a future `animation-controls` family
  in a separate phase.

**Both demos** register as resolving consumers for `/deck` (consumer #1, blocked on the
glass-ui demo story) + `useCanvas2D` Constellation (consumer #2, blocked on slides G.W2).

---

## §5 — The publish / coordination edges post-3.3.0

Every cross-repo unblock fans out from a single artifact: `@mkbabb/glass-ui` `3.3.0` on npm.
The real check is `npm view @mkbabb/glass-ui version ≥ 3.3.0` — the published package, never a
sibling branch pin. This is the E1 root hinge. AV stages to READY-TO-PUBLISH; the publish is
USER-DOMAIN (confirm-first).

### The publish spine

```
value.js 0.11.0  →  glass-ui 3.3.0 (peer bump)  →  { keyframes D.W5 ∥ slides G.W1 ∥ value.js M.W7 }
   (E-valuepeer)        (E1 root hinge)
```

- **E1 hinge — glass-ui 3.3.0 → npm.** AV.W0–W1 are AT-disjoint and stage before the publish.
  AV.W6 closes (the LAST wave): stages the changeset (NOT auto-published), greens the gate
  matrix, carries the value.js peer-bump line. The publish unblocks keyframes D.W5, slides
  G.W1, value.js M.W7 — all in parallel.
- **value.js 0.11.0 (E-valuepeer) — publishes BEFORE the cut.** The 3.3.0 cut bumps its
  `@mkbabb/value.js` peer + devDep `^0.10.0 → ^0.11.0`; the `^0.10.0` range excludes 0.11.0,
  so value.js must publish `0.11.0` first (or concurrent) for the manifest to resolve. The
  blob-color contract is already proved bit-identical (8/8, ~2e-16), so the runtime edge is
  settled — only the SemVer-range line is the knot. value.js-owned (M tranche, user-domain).
- **keyframes D.W5 — consumes the published dock.** Gated on E1. Renames TopDock→ChromeDock +
  AnimationMenuBar→TransportDock LOCALLY (composing the published primitives), bumps the
  glass-ui pin to `^3.3.0`, validates `proof:dock-vocabulary`. keyframes is READ-ONLY upstream
  for the dock fix — no keyframes change is required.
- **slides G.W1 — the pin-bump.** Gated on E1. Pin `^3.2.0 → ^3.3.0`, the dock-motion fix
  lands downstream (zero slides-side code beyond the bump), run the binding-verify sweep +
  `deck.spec.ts` e2e, deploy to Cloudflare Pages.
- **value.js M.W7 — blob extirpation.** Gated on E1. Bumps the glass-ui demo-dep `→ ^3.3.0`,
  extirpates the two bespoke blob facilities onto `/goo-blob` + `/watercolor-dot` + the
  injected `ColorResolver`, cuts v1.0.0.
- **fourier (the hub) — orchestrates, writes no sibling source.** Hosts the RUN-BOARD, drives
  the dependency-order unblocks; edits no sibling source (inv-16 airtight).

### inv-16 write-boundaries

Each session writes ONLY its own repo's source + its own tranche docs. No session writes a
sibling's source. The cross-repo edges are PUBLISHED-SURFACE edges (npm artifacts), never
branch pins or direct edits.

| session | writes | reads (consumes) | NEVER writes |
|---|---|---|---|
| **glass-ui (AV)** | glass-ui `src/` + `docs/tranches/AV/` | keyframes published LIGHT (`^3.0.0`); value.js published (`^0.11.0`) | keyframes, slides, value.js, fourier source |
| **keyframes.js (D)** | keyframes `src/` + `docs/tranches/D/` | glass-ui published `^3.3.0` (D.W5, post-E1) | glass-ui, slides, value.js source |
| **slides (G)** | slides `src/` + `docs/tranches/G/` | glass-ui published `^3.3.0`; keyframes published `^3.0.0` | glass-ui, keyframes, value.js source |
| **value.js (M)** | value.js `src/` + `docs/tranches/M/` | glass-ui published `^3.3.0` (demo) | glass-ui, keyframes, slides source |
| **fourier** (hub) | `docs/constellation/**` ONLY | all sibling tranche docs (read-only) | EVERY sibling's source |

---

## §6 — The fourier-analysis ancillary note

fourier-analysis is the hub. It owns ONLY `docs/constellation/**` — the SOTA-crosswalk
(Baseline-dated binding authority), the adoption-asks ledger, the orchestration manifest. It
writes no sibling source (inv-16 airtight). The SOTA-crosswalk is the glass-ui/slides gospel:
every AV fold cites its section, and the highest-value adopts (IGN dither, content-visibility
RAF-pause, the reduced-motion substrate lift + WCAG pause toggle, dock velocity-continuity,
contain+blur-budget+spring-convergence) are grounded in real gaps verified against HEAD.

### What the AV/G/keyframes constellation owes the hub

- **AV** owes the hub a green CI run id at each DONE (inv-27 green-means-green) and the
  READY-TO-PUBLISH signal that flips the E1 gate from staged to publishable. Every AV fold
  cites its SOTA-crosswalk section as binding authority.
- **G (slides)** owes the hub the G.W2 constellation RAF-swap landing at HEAD — the horn
  signal that flips the AV.W8 `useCanvas2D` ≥2-consumer gate (slides = consumer #2).
- **keyframes (D)** owes the hub the D.W5 dock-vocabulary validation against the published
  3.3.0 surface, confirming the consumer-side rename composes the base primitives without a
  back-import.

Horn signals propagate bidirectionally: the ≥2-consumer gate (AV.W8 / `/deck`) and the E1
publish gate are both watched on the RUN-BOARD. The hub coordinates the dependency-order
unblocks; it never schedules a reciprocal edge (E1b) as a blocker — that edge is named and
watched, not scheduled, and may never fire.

---

**UNION HEADLINE.** Color and spring math are single-sourced and DAG-clean across all four
repos; the remaining work is eight surgical folds that route keyframes.js's `stagger`/`flip`/RAF
orchestration tier and glass-ui's `--spring-*`/`--ease-*` tokens through the consumers that
currently fork them, plus the two demos adopting glass-ui CORE name-forward — all gated on the
two ≥2-consumer substrate lifts (`/deck`, `useCanvas2D`) and the single 3.3.0 publish hinge the
three downstream repos turn on.
