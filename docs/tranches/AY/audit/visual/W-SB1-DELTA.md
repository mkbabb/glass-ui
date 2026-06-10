# W-SB1 — storybook per-route KEEP/FIX/RETIRE + the §1.5 design-defect cohort — DELTA

**Wave:** AY.W-SB1 · **Status:** live-verified · **Verdict:** PASS (G1–G6 all green).

The component-deep route prune (header-ribbon + glass-panel RETIRED, native-top-layer FOLDED,
useTokenColor KEPT+BOOKED) + the per-route DESIGN defects (the broken front door, the
constellation zero-paint, the voice leaks, the headline mid-word wrap), fixed at the ROOT and
re-proven against PIXELS. Routes: `/foundations/intro`, `/compositions/hero`. Viewports:
**390×844 (REAL mobile)** + 1280×800. Schemes: {light, dark}. Device: Chrome-headless-new,
ANGLE→Metal, via `tests-visual/_sb1-capture.spec.ts` (the G6a/G6b/G6d runtime witnesses + the
own-surface capture sweep), against the live demo on `:5199`.

---

## G1 — route↔row equality preserved

`proof:no-orphan-demo-route` GREEN after the 3 row+SFC deletions (glass-panel, native-top-layer,
header-ribbon) + the native fold: **122 rows ↔ 122 files**, `danglingRows: []`, `orphanFiles: []`.
`proof:storybook-ia` GREEN (the EXPECTED_TREE fixture reconciled: substrates − glass-panel,
containers − native-top-layer, navigation − header-ribbon, compositions + dock-with-slider).
`proof:storybook-complete` GREEN (72 component exports, 286 demonstrated ids, 0 undemonstrated).

## G2 — `proof:component-orphan` born-RED→GREEN (the institutional fix)

NEW `scripts/proof-component-orphan.mjs` — every PUBLISHED `custom/<pkg>/` has ≥2 non-self
consumers OR a `docs/consumer-evidence/<artefact>.md`. **Born-RED at the pre-edit HEAD** (the
detector flags header-ribbon + glass-panel — both published, 0 non-self consumers, no evidence
doc; the bite witnessed via the exported `detectComponentOrphans` against the pre-retire input).
**GREEN after** the retire: **31 published packages, all clear the bar** (31 with ≥2 consumers, 2
ALSO evidence-doc-kept), 0 violations. Self-proving: the synthetic `__synthetic_orphan_probe__`
(0 consumers, no doc) is asserted-flaggable every run. Artefact: `.cache/gates/AY-component-orphan.json`.

## G3 — deletion-proofs (clean break)

```
rg "HeaderRibbon|header-ribbon" src/ demo/ ../slides/src ../speedtest/src   →  0 code hits
rg "GlassPanel"                 src/ demo/ ../slides/src ../speedtest/src   →  0 code hits
rg "\bglass-panel\b" src/components/ src/subpaths/ src/api/index.ts         →  0
test ! -d src/components/custom/header-ribbon && test ! -d .../glass-panel  →  both absent
test ! -f src/subpaths/header-ribbon.ts && .../glass-panel.ts              →  both absent
rg "HeaderRibbon|GlassPanelVariant|GlassPanelProps" src/api/index.ts        →  0
grep -c GlassPanel demo/stories/foundations/paper-glass.vue                 →  0 (re-expressed onto .glass-* rungs)
```

Casualties of the retire ALSO cleaned (no dangling): `scripts/proof-glass-panel-tiers.mjs`
(unwired gate, DELETED), `tests/components/custom/glass-panel/GlassPanel.test.ts` (DELETED),
`tests/public-surface.spec.ts` (the glass-panel subpath probe row + name removed),
`scripts/proof-package.mjs` (the `/glass-panel` consumer-probe import removed),
`tests/scripts/storybook-complete.detect.test.ts` (the HeaderRibbon synthetic fixture renamed).

## G4 — build + dts publication at the smaller surface

`npm run build` GREEN (vite emits, vue-tsc emits **60** subpath .d.ts — no header-ribbon /
glass-panel). `npm run typecheck` GREEN (exit 0, 0 errors — no dangling api seat ref).

> **G4 caveat (the SHARED-file blocker):** `verify-export-types` REDs on the dangling
> `package.json` `./header-ribbon` + `./glass-panel` exports + `typesVersions` (lines 94, 124,
> 322, 366) which point at dist files no longer emitted. `package.json` is an orchestrator-OWNED
> SHARED file this lane may not edit — the 4-entry deletion is REPORTED in `sharedFileDeltas`.
> verify-export-types GREENs once the orchestrator removes those 4 entries (the retire's
> package.json half).

## G5 — the KEEP evidence + the native fold

- `docs/consumer-evidence/use-token-color.md` AUTHORED — names the speedtest external consumer
  (`useMeterTokenColors.ts:19,36-37`) + the demo constellation/hero consumers; README row added.
  The 5 GlassPanel-cited filter-family rows RE-POINTED to the surviving `useGlassRenderer`.
- Native fold: `grep -c native-top-layer manifest.ts` → 0; `native-top-layer.vue` ABSENT;
  `grep -c GlassDialogNative dialog.vue` → 4; `grep -c :native hover-popover.vue` → 2 (the
  capability probes relocated under the primitives they augment — no demo capability lost).

## G6 — the §1.5 design defects, RUNTIME-witnessed (born-RED at HEAD)

### G6a — the front door NAVIGATES + the cards are glass (born-RED: `pathChanged:false`)

The 8 dead `:href="#/${cat.slug}"` hash-hrefs → `<RouterLink :to="/${cat.slug}">`; the
`categories` list re-derived from the live `manifest.ts` (no `Primitives`; all of Substrates /
Forms / Display / Dock / Data present); the `bg-card` opaque slabs → `.glass-resting` so the
aurora reads through.

**π readback (`:5199`, desktop1280):** front-door grid = **11 cards, ALL 11 `glass-resting`, 0
opaque `bg-card`**; the first three hrefs are real paths `/foundations`, `/substrates`, `/forms`
(manifest-derived). A live click on the `/substrates` card CHANGES `router path` → `/substrates`
(born-RED: the old hash-hrefs left the path UNCHANGED). Captures:
`W-SB1-intro-frontdoor-mobile390-light.png`, `W-SB1-intro-frontdoor-mobile390-dark.png`,
`W-SB1-intro-frontdoor-desktop1280-light.png`, `W-SB1-intro-frontdoor-desktop1280-dark.png`.

### G6b — the constellation hero PAINTS (born-RED: 0px host / 300×150 canvas)

The scoped-CSS host-positioning bug fixed in wave 1 (the `:where(.constellation)` specificity-0
root-layout rule, verified present at `Constellation.vue:603-607`) — the host no longer dictates
`position:relative; block-size:100%` that defeated the `.story-hero-bg` `position:absolute`
placement.

**π readback (`:5199`, desktop1280):** the `.story-hero-bg` constellation host = **block-size
899px** (was 0); the canvas backing = **1134×899** (was the 300×150 default); **1300 painted
non-blank lattice pixels** (was 0). Bite: re-imposing `position:relative; block-size:100%` on the
scoped `.constellation` root collapses the host to 0 again. Captures:
`W-SB1-hero-constellation-mobile390-light.png`, `W-SB1-hero-constellation-mobile390-dark.png`,
`W-SB1-hero-constellation-desktop1280-light.png`, `W-SB1-hero-constellation-desktop1280-dark.png`.
(The READ-THROUGH past the card is W-SB-STAGE's concern; G6b binds only SIZED + PAINTING.)

### G6c — no voice leakage (the meta-language GREEN pass)

`proof:story-language` GREEN — **0 meta-language hits** across 141 story SFCs (was 2: the
`dock/overview.vue` AT.W7 + `blob.vue` AX.W46 tranche-codes, scrubbed). The cited blurbs scrubbed:
the `manifest.ts` backtick + tranche-ID leaks (dock/rail GlassDock, metric-pill, surface-tints,
timeline, instrument-rail, form-validation, gate-pattern, etc. → plain prose); the
`constellation.vue` π-lane runbook (`__constellationRefit.resizeTo`, `holdWellAt`/`releaseWell`,
"the π lane") + the supernova spoiler label (`(DEMO-ONLY — not an engine prop)`) → story register;
`fourier-field.vue` lowercase worklog (`configuration BUNDLE…`) → prose; `buttons.vue`
`var(--foreground)`-spec-line → prose.

### G6d — the headline does NOT wrap mid-word (born-RED: "f / or")

The `hero.vue` typewriter headline: the italic ℱ-glyph `<span>` + seg2's leading `"or"` now ride
ONE `whitespace-nowrap` inline unit (the rest of seg2 flows normally; the static fallback arm
matched). **π readback (forced 420-width):** the `.whitespace-nowrap` unit wrapping the ℱ-glyph +
"or" has **exactly 1 client-rect row** (the f and or share a line) — in BOTH the animated and
static arms (born-RED: the break fell between the glyph and "or", "A design system f / or…").
Captures: `W-SB1-headline-nowrap-light.png`, `W-SB1-headline-nowrap-dark.png`.

---

## Per-route disposition table (the §1.1/§1.3 verdict ledger)

| route / artefact | verdict | evidence |
|---|---|---|
| `header-ribbon` | **RETIRE** | 0 non-self consumers; dir + subpath + api seat + story + manifest row GONE |
| `glass-panel` | **RETIRE** | demo-only (2 stories ≠ 2 binary consumers); dir + subpath + api seats GONE; paper-glass re-expressed onto `.glass-*` |
| `native-top-layer` | **FIX/FOLD** | the `<GlassDialogNative>` + `:native` probes folded into dialog + hover-popover; standalone route retired |
| `useTokenColor` | **KEEP+BOOK** | speedtest external consumer + demo; `use-token-color.md` authored |
| disco-glyph / glyph-face | CLOSED (AX.W19) | excised; no file, no route, no src |
| blob consolidation | CLOSED (AX.W18) | single `blob.vue` |
| slider zoo | CLOSED (AX.W59) | standard + spectrum only |
| `evalFourier` | OUT OF SCOPE | → AY.W-FF2 (not touched) |

## Captures (10 PNG, honest dimensions)

- `W-SB1-intro-frontdoor-mobile390-light.png` (390×844), `W-SB1-intro-frontdoor-mobile390-dark.png` (390×844)
- `W-SB1-intro-frontdoor-desktop1280-light.png` (1280×800), `W-SB1-intro-frontdoor-desktop1280-dark.png` (1280×800)
- `W-SB1-hero-constellation-mobile390-light.png` (390×844), `W-SB1-hero-constellation-mobile390-dark.png` (390×844)
- `W-SB1-hero-constellation-desktop1280-light.png` (1280×800), `W-SB1-hero-constellation-desktop1280-dark.png` (1280×800)
- `W-SB1-headline-nowrap-light.png` (322×204), `W-SB1-headline-nowrap-dark.png` (322×204)
