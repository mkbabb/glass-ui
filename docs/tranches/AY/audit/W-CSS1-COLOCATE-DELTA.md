# AY.W-CSS1 + AY.W-COLOCATE — verification DELTA

Lane W-COLOCATE-CSS1. Executed on the shared `tranche/AY` worktree (parallel
lanes active: W-GOD1 carving constellation/goo-blob, W-LEG1 authoring the
var-in-arbitrary guard). The CSS arm (W-CSS1) is complete; the colocation arm
(W-COLOCATE) is delivered up to its W-GOD1 dependency.

## W-CSS1 — the CSS monolith carve (cascade-order-safe)

### Carved partials (each < 500, cohesion-aware)

- `src/styles/tokens.css` (2356) → thin @import root over
  `tokens/{scheme-motion(334), color-radius(250), shadow(105), glass(413),
  offsets-sizing(406), scale-paper(361), light-dark(158), dark-arm(194),
  property-regs(169)}.css`. The master `:root` splits at §-section seams into
  adjacent `:root{}` blocks (cascade-isomorphic); light-dark/dark-arm/property-regs
  keep source order.
- `src/styles/glass.css` (1219) → thin @import root over
  `glass/{material(238), ladder(304), surfaces(306), progress-rail(78),
  squircle(46), a11y-fallback(245)}.css`. The base `@layer components` ladder
  splits into three adjacent same-layer blocks; the squircle @supports + a11y
  overrides stay AFTER the base.
- `src/styles/utilities.css` (1230) → thin @import root over
  `utilities/{animate(26), base(365), components(317), btn(399),
  a11y-overrides(140)}.css`.

### The no-delta proof (the cardinal DELTA)

The `@import`-resolved cascade was canonicalized (strip comments, collapse
whitespace, FUSE adjacent same-context `:root{}`/`@layer components{}` blocks)
BEFORE and AFTER all three carves + the index.css comment edit:

- baseline canonical: 148676 bytes, 3163 declarations
- final canonical: 148676 bytes, 3163 declarations
- **declaration-stream diff: 0 lines** — the carve is a pure structural
  re-`@import` with ZERO rule delta.

`npm run build` GREEN (the dist `/styles` cascade fans out the carved partials
via cpSync; `dist/styles/{tokens,glass,utilities}/*` emitted).

### The `.css`-aware god-module gate (O1)

`scripts/proof-no-god-module.mjs` collector extended to walk `.css` (line ~92);
`scripts/read-css-monoliths.mjs` (NEW) is the per-monolith ordered partial-list
authority (TOKENS/GLASS/UTILITIES_PARTIAL_ORDER) + the import-order assertion +
the `readMonolith()` concatenation reader (the read-dock-css.mjs precedent).
Gate facts now carry `cssMonoliths[].importOrderPreserved`. The two over-bound
CENTRAL sheets out of carve scope — `dock-controls.css` (621), `theme.css`
(530) — are ratchet-grandfathered (BOOK(AY.W-CSS1)). Bite verified: a reordered
`@import` reds the gate.

### The var-in-arbitrary conversions (O6)

47 class-1 bare `<util>-[var(--x)]` (utility-prefix, no fallback) → `<util>-(--x)`
shorthand across 18 CVA/SFC files (+2 comment-prose rewords). The keeps preserved:
19 arbitrary-property `[prop:var(--x)]`, 7 typed `[length:var(--x)]`, 5
fallback-bearing `[var(--x, fb)]`. The 4 variant-modified
`[&...]:size-[var(--ui-glyph)]` → `:size-(--ui-glyph)` (proven byte-equivalent
compile). `proof:var-in-arbitrary-guard` (W-LEG1) born-GREEN: 0 violations.

### Adjacent gates repointed to the carved monoliths

The carve broke ~20 gates that `readFileSync("src/styles/{tokens,glass,
utilities}.css")` directly (they found the thin root). Repointed to
`readMonolith()`: glass-level, glass-cohesion, adaptive-glass, shadow-contract,
squircle-language (dock arm → readDockCss), tailwind-v4-idiom, spring-tokens-synced
(+ regen-spring-tokens.mjs tokensPath → tokens/scheme-motion.css), liquid-glass-tokens,
liquid-glass-material, affordance-contrast, animation-coherence, constellation-tokens,
dark-semantic-contrast, demo-radial-calm, input-invalid-aria, forced-colors-skin.
The syntax-assertion gates broadened to accept BOTH the `(--x)` shorthand and the
`[var(--x)]` arbitrary form: ui-scale, dropdown-type-scale, primitive-affordance,
reka-binding-idiom (+ tests/components/ui/reka-binding-idiom.test.ts).

ALL repointed gates GREEN. `verify-export-types` GREEN (zero public-surface delta).

## W-COLOCATE — the colocation convention + the idiom home

- `docs/precepts/design-idioms.md` (NEW, ~10.5 KB) — the localized idiom HOME:
  the @theme home (theme.css), the @utility cohesion-domain map (the 7 files),
  the @apply discipline, the cohesion-aware @import-partial rule (the dock.css/
  W-CSS1 precedent), the var-in-arbitrary rule, the colocation convention's CSS half.
- Cited by `CONTRIBUTING.md` §Conventions + `src/styles/index.css` cascade header
  + `CLAUDE.md` §Structure.
- `src/components/custom/tabs/README.md` (NEW) — to the bar of the other three.
- `scripts/proof-colocation.mjs` (NEW) — the convention gate. Born-RED on the
  in-flight tree (constants.ts extraction + constellation composables/ relocation
  pending W-GOD1/W-BLOB2 — those lanes are actively editing the same composables).
  The idiom-home clause is GREEN (doc>1KB, both citations present).

## Pre-existing reds (NOT this lane)

- `proof:glass-material-sota` / `glass-material-unified` — expect a stale
  `@supports(corner-shape:squircle)` block; HEAD uses `superellipse(2)` (AX.W56
  retired the keyword). Already RED at HEAD, confirmed.
- `proof:deck-progress-rail` — DeckProgress.vue + its demo route absent.
- `proof:no-god-module` / `proof:constellation-tokens` transient RED — the active
  W-GOD1 lane is mid-carve of Constellation.vue (620 > 616) + readPalette.
- The dock / tabs π live arms need the orchestrator's browser readback.

## Shared-file deltas (orchestrator reconcile — NOT edited by this lane)

- `scripts/gates.mjs` + `package.json` — register `proof:colocation`
  (tags:["local","ci"]). `proof:no-god-module` is already CI-tagged (W-GOD1).
- `.github/workflows/ci.yml` — re-emit via `gates:emit-ci` so `proof:colocation`
  appears.
- `docs/precepts/` is a SUBMODULE — `design-idioms.md` lands in the submodule tree.
