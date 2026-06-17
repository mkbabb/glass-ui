# W-CARVE4 DELTA — the ratchet-drain carve (RATCHET_BASELINES → ∅)

BB Batch-6 residual carve. The FINAL five `proof:no-god-module` ratchet rows DRAINED
to ∅ — the close-state requirement (`violations == []` AND `RATCHET_BASELINES == {}`).
A MECHANICAL, BYTE-ISOMORPHIC carve: every block RELOCATED into a sibling
partial/composable, ZERO value/token/selector/behaviour change. The three CSS carves
are dist-byte-identical (proved below); the two TS/Vue carves are pure relocations
behind the same public surface (typecheck + the 96 dock+tabs unit tests green).

## The per-file carve map

| # | drained file | old | new | new partial | partial lines | mechanism |
|---|---|---|---|---|---|---|
| 1 | `components/custom/dock/composables/dockMorphContext.ts` | 575 | 487 | `composables/dockMorphMeasure.ts` | 165 | the PURE geometry (`dimOf`/`morphAxisProp`/`getSize`/`clearMorphVars`) + the reserved-footprint `measureTo` + the SYNCHRONOUS PRM `seatTargetSync` + the BA-VJS-1 nested-ordering (`nestedTargetsWithin`/`forceNestedMaxContent`) extracted to a sibling leaf (the aurora→useAurora / goo-blob→useMetaballRenderer / fourier-field→useFourierField colocation pattern). The orchestrator stays the morph DRIVER (owns the `SpringProgress`, the targets Set, the per-frame `--dock-morph-t` write) + IMPORTS the helpers; the seat composes the orchestrator's settle callbacks via a `seatCallbacks` bundle. `DOCK_SPRING` byte-fenced (lives in `../constants`, untouched). |
| 2 | `styles/tokens/glass.css` | 505 | 194 | `tokens/glass-fx.css` | 333 | the decorative/fx tail (grain/specular/edge-light + the adaptive tint-source/backdrop-luma bucket + fringe/curvature/chart-palette + the per-tier shadow/spine/under-shadow/overlay-scrim) carved into an adjacent `:root{}` block @import-ed IMMEDIATELY AFTER glass.css. The §8 opacity/blur/saturate LADDER + composed bg/border + the control-REST register stay. |
| 3 | `components/custom/tabs/SegmentedTabs.vue` | 543 | 478 | `tabs/composables/useTabDragMorph.ts` | 131 | the BB.W-DRAG-MORPH wiring (the center-anchored snap targets + the `useDragMorph` call + the `--stretch` write + the option/axis refresh watchers) extracted into the colocated composable (the `useTabIndicator` sibling pattern). The SFC IMPORTS it + binds `drag.dragStyle`/`drag.dragging`/`dragEnabled` in its template; the click-selection path + the roving-tabindex keyboard contract + the `draggable` prop stay in the SFC. |
| 4 | `styles/tokens/scale-paper.css` | 551 | 437 | `tokens/scroll-tokens.css` | 123 | the §20 PLATFORM MOTION section (the scroll-driven/choreography `--scroll-*` knobs + TOP-LAYER + VIEW-TRANSITION + the dock-spring knobs) carved WHOLE at the §19/§20 seam (the file's last section — a contiguous tail carve, the CARVE3 offsets-sizing §9/§10 precedent). @import-ed IMMEDIATELY AFTER scale-paper.css. The paper/control/display/metal/timeline/metric/table families §11–§19 stay. |
| 5 | `styles/glass/ladder.css` | 510 | 433 | `glass/rim.css` | 100 | the AW.W22 unified rim + the BB.W-GLASS-ACCENT per-INSTANCE chromatic rim/accent group (the rim-ink + `--glass-material-rim` ring + the per-rung `--glass-border-accent` border, light + dark arms) carved into an adjacent `@layer components` block @import-ed IMMEDIATELY AFTER ladder.css (the SOLE writer of `--glass-material-rim`/`--glass-border-accent`, so cascade-order-invariant). The 5-rung ladder + the W55 bright-bucket `@container` + the calm-tier re-point + the contrast-color ink-flip + the opaque escape + the under-shadow modifier + the grain `::after` stay. |

Every drained file < 500 AND every new partial < 500. `RATCHET_BASELINES == {}`.

### The W55 bright-bucket KEPT in ladder.css (the byte-isomorphism judgment call)

The W-CARVE4 BOOK marker named "the rim/accent + bright-bucket group" as the carve
target. The rim/accent group moved cleanly (sole-writer, cascade-order-invariant). The
W55 bright-bucket `@container style(--glass-backdrop: light)` was assessed and KEPT in
ladder.css: relocating it past the `@supports (color: contrast-color(…))` block (which
contains a SECOND `@container` setting the same `--muted-foreground` at the SAME class
specificity 0,1,0) would INVERT their source-order tie on supporting engines — a
behaviour change. The BINDING byte-isomorphism bound overrides the marker's suggested
scope; the rim-group carve alone drains ladder.css to 433 (< 500). The marker's
parenthetical ("the calm-tier re-point stays IF it is part of the ladder") already
signals these stay-vs-move judgment calls are expected.

## The byte-isomorphism proof (the three CSS carves)

The shipped CSS bundles are BYTE-IDENTICAL to the HEAD baseline (the carved blocks are
just relocated `:root{}` / `@layer components` blocks at the same cascade slot; CSS
comments are stripped in the minified dist, so comment moves/trims are invisible):

```
HEAD baseline                                    post-carve
7775386b…  dist/glass-ui.css            →   7775386b…  dist/glass-ui.css      IDENTICAL
94fd53ce…  dist/styles/index.css        →   94fd53ce…  dist/styles/index.css  IDENTICAL
```

`diff` against the captured HEAD copies: zero bytes changed. The three new partials
(`glass-fx.css`/`scroll-tokens.css`/`rim.css`) emit into `dist/styles/tokens/` +
`dist/styles/glass/` and concatenate to the same bundle.

The two TS/Vue carves change zero public surface: `vue-tsc --noEmit` (lib + test
configs) clean; the build emits the same per-subpath chunks (`tabs.js`/`dock.js`); the
96 dock+tabs unit tests pass; the relocated symbols are package-private (no barrel/api
delta).

## The cascade-order arrays + the @import roots

`scripts/read-css-monoliths.mjs` (the import-order authority `proof:no-god-module`'s
`.css` arm reads):
- `tokens.order`: `glass.css` → **`glass-fx.css`** → `glass-deep.css` → `on-glass-fg.css` … `scale-paper.css` → **`scroll-tokens.css`** → `light-dark.css` …
- `glass.order`: `material.css` → `ladder.css` → **`rim.css`** → `surfaces.css` …

The thin @import roots (`tokens.css` / `glass.css`) @import the new partials at the
matching slots. `proof:no-god-module`'s import-order assertion is GREEN (the @import
order matches the recorded cascade order).

## Gate-follow re-points (the carve mechanism, the proof:webgl-substrate-single precedent)

Six device-free gates read a carved file/symbol BY NAME and were re-pointed to FOLLOW
the carve into the leaf (the "asserts follow the composition into the carved leaf"
precedent — never a behaviour change, just a read-path swap):

- `proof:dock-morph-family` F3 — reads dockMorphContext.ts + dockMorphMeasure.ts
  concatenation for the `seatTargetSync`/`measureTo`/nested-ordering composition. (The
  carved helpers dropped their `<T>` generics to keep the `function measureTo(` shape
  the gate regex matches — type-safe via `MorphMeasureTarget` + the orchestrator's
  `MorphTarget extends MorphMeasureTarget`.)
- `proof:dock-morph-insitu` M5 — reads the same concatenation for the BA-VJS-1
  `outerEl.contains` nested-ordering.
- `proof:drag-morph` D4 — the tabs `useDragMorph(` consumer now lives in
  useTabDragMorph.ts; the consumer-count check reads SFC ∪ composable (consumers: 2).
- `proof:no-gray` — reads glass.css + glass-fx.css for the `--overlay-scrim-ink`
  KEEP-NEUTRAL byte-assert.
- `proof:glass-cohesion` — reads glass.css + glass-fx.css for the
  `--glass-grain-engage-duration` W4 token-minted assert.
- `proof:scroll-motion` — reads scale-paper.css + scroll-tokens.css for the
  `--scroll-build-*/--scroll-cascade-*/--scroll-pin-*` minted assert.

All six GREEN post-re-point; their self-test bites retain teeth (the synthetic
fixtures still red).

## Gates

- REQUIRED: `proof:no-god-module` PASS (RATCHET_BASELINES drained to ∅) · `proof:gate-script-parity` PASS.
- `typecheck` clean · `build` green · CSS dist byte-identical.
- Device-free domain sweep GREEN: dock-morph-family, dock-morph-insitu,
  dock-orchestrator-single, drag-morph, tabs-std, no-gray, glass-cohesion,
  scroll-motion, dark-material, on-glass-fg, control-tokens, metal-shimmer, atlas-ab,
  spring-tokens-synced, glass-cal, no-dual-path, input-invalid-aria, suffuse, hierarchy,
  fading-scroll.

### Not-mine (pre-existing / environment)

- `profile:budget` RED — the BB-tranche accretion the orchestrator rebaselines at close
  (`aurora.js` gzip 100.9%, `tabs.js`/`motion.js` drift vs the AP baseline that predates
  the entire BB liquid-glass band, `easing.js`/`drawer.js`/`focus-scope.js` ABSENT from
  the baseline). The carve is a pure relocation (SFC→composable within the SAME `tabs`
  chunk; orchestrator→sibling within the SAME `dock` chunk) — zero net bytes added.
- The `:5199`-dependent LIVE-π gates (`dock-no-scale-pop` W3/W4, `dock-plate-clearance`,
  …) fail-CLOSED on `ERR_CONNECTION_REFUSED` without the demo server up — environmental,
  not the carve (their device-free source arms PASS).
