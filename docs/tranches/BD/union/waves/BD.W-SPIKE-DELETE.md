# BD.W-SPIKE-DELETE — delete the `useLiquidMorph` BE-spike + relocate `liquid-morph.css` to `demo/`, `proof:no-dual-path` GREEN

**Band 1 (CONSOLIDATE) · depends: W-FLIP-SPINE (T1 — the spine is FOLDED before the spike is cut, so no live consumer is stranded onto a mid-fold runner)** — the W-PRUNE-CONSOLIDATE clean cut (`UNIFIED-ROSTER.md:29`). Sequenced T1 between FLIP-SPINE (the runner fold) and VH-COMPOSE (which composes the SHIPPED V↔H morph the spike facsimile'd).

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build DELETES `src/composables/motion/useLiquidMorph.ts`, MOVES `src/styles/glass/liquid-morph.css` → `demo/`, re-points 4 demo references + the barrel + the manifest, and is user-gated. The spec is in scope now.

## The defect / the ask (Pass-D code-grounded — `PASSD-FOLD §HONEST CLEAN`, `EXECUTION-DAG.md:20,196`)

`useLiquidMorph` is the BE-prototype "GENERALIZED liquid framework" SPIKE (`src/composables/motion/useLiquidMorph.ts:1-9` header: "BE.W-LIQUID-MORPH (WAVE-1) — useLiquidMorph: the GENERALIZED liquid framework … the generalization of the dock's V<->H morph"). Traced at HEAD it is a **462-line net-new engine with ZERO real `src/` consumer**:

- **0 src consumers.** The grep for `useLiquidMorph`/`LiquidMorph`/`RADIAL_SPLIT`/`DIRECTED_SPLIT`/`LiquidMorphSignature` across `src/` returns ONLY the file's own definition. It is NOT barreled (no `composables/motion/index.ts` re-export, no `/motion` subpath line). It is published-nowhere, consumed-nowhere shelf-ware — the `J-inv-10` substrate-without-consumer-binary bar FAILED.
- **The only "consumers" are demo STRING-name labels, not code.** The four `liquid-morph` references in `demo/` are all the `liquid-morph.css` STYLESHEET, never the composable: `demo/demo.css:119` (`@import "../src/styles/glass/liquid-morph.css"`), `demo/stories/manifest.ts` (a story description string naming "One generalized useLiquidMorph engine" — PROSE), `demo/stories/dock/DockExampleTile.vue:20,112` (a comment naming the `.liquid-stage` CSS precedent), `demo/stories/dock/examples/Spotlight.vue:33` (a `{ title: "liquid-morph.css" }` icon-grid LABEL). NONE import `useLiquidMorph`. The composable has literally zero runtime call-site, demo or src.
- **It is SUPERSEDED by the SHIPPED V↔H morph.** Its stated charter ("the generalization of the dock's V<->H morph") is the BE attempt at what `useDockOrientationMorph` (the SHIPPED, barreled, demo-consumed driver — `src/components/custom/dock/composables/useDockOrientationMorph.ts`, consumed by `demo/stories/dock/morph-showcase.vue:56` + `demo/layout/AppShell.vue:94`) already does as a REAL component path. `W-VH-COMPOSE` (the next T1 wave) composes THAT shipped morph; the spike's facsimile is the dual path `proof:no-dual-path` forbids. Keeping a 462-line generalized-morph engine BESIDE the shipped per-component morph is the exact dual-MECHANISM shelf-ware the SOTA fewer-sharper-primitives lesson kills.

The ask is the W-PRUNE-CONSOLIDATE clean break: DELETE the spike (no alias, no dual path — the no-backwards-compat law); MOVE its CSS half out of `src/styles/` into `demo/` (it is a demo-stage decoration, not a library register); re-point the four demo references; `proof:no-dual-path` GREEN.

## The mechanism

ONE deletion + ONE relocation + four re-points + the gate.

### 1. Delete `src/composables/motion/useLiquidMorph.ts` (clean break)

The 462-line spike file is REMOVED. It is not barreled and has no `/motion` subpath line, so the deletion strands nothing (no public-surface retirement — it was never published). The `RADIAL_SPLIT`/`DIRECTED_SPLIT` exported signatures + the `LiquidMorphMode`/`LiquidMorphVector`/`LiquidMorphSignature` types go with it (zero importer). NO `useLiquidMorph` alias survives.

### 2. Relocate `liquid-morph.css` → `demo/`

`src/styles/glass/liquid-morph.css` (the `.liquid-stage`/`.liquid-morph` demo-stage decoration the spike's CSS half) MOVES to `demo/` (e.g. `demo/liquid-morph.css`) — it decorates DEMO surfaces (the `DockExampleTile`/`Spotlight` stage tiles), not a library glass register. The `demo/demo.css:119` `@import` re-points to the new path; the `read-css-monoliths` glass.order ledger (if it enrolls `liquid-morph.css`) drops the entry (the file leaves `src/styles/glass/`). The four demo references (`demo.css` import, `manifest.ts` prose, `DockExampleTile.vue` comment, `Spotlight.vue` label) re-point/re-word to the demo-local path; the manifest story description drops the "generalized useLiquidMorph engine" prose (the spike is gone — the story now describes `useDockOrientationMorph` + `<DockStack mode="facets">`, the SHIPPED path).

### 3. `proof:no-dual-path` — the spike removal is recorded as a CLEAN cut

`scripts/proof-no-dual-path.mjs` (`SUPERSEDED_SET`, `tags: ["local","ci","release"]`) gains the `useLiquidMorph` row: a SUPERSEDED mechanism that must be ABSENT once its successor (`useDockOrientationMorph` + the union bloom spine `useElementBloom`) lands. The gate asserts `src/composables/motion/useLiquidMorph.ts` is DEFINITION-ABSENT, no `useLiquidMorph` import survives in `src/`, and no `src/styles/**/liquid-morph.css` survives (the CSS relocated to `demo/`). The symmetric-closure: a re-introduced `useLiquidMorph` def OR a surviving `src/` import OR the CSS back in `src/styles/` REDs (the dual-path is barred both ways — a half-delete leaving the import is as RED as a re-mint).

## The gate — `proof:no-dual-path` extended (born-RED → GREEN; DEFINITION-ABSENT byte-assert, never presence-regex)

`scripts/proof-no-dual-path.mjs` (extend-in-place, no new key — the `SUPERSEDED_SET` discipline), comment-stripped detector exported for the bites.

- **N1 — `useLiquidMorph.ts` is DEFINITION-ABSENT.** The detector asserts `existsSync("src/composables/motion/useLiquidMorph.ts")` is FALSE. A surviving file REDs (the spike not cut). **Born-RED at HEAD** (the file exists at 462 lines).
- **N2 — no surviving `useLiquidMorph` import in `src/`.** The detector scans `src/**/*.{ts,vue}` (comment-stripped) for a LIVE `import … useLiquidMorph`/`from "./useLiquidMorph"`/`useLiquidMorph(` call-expression and asserts ZERO. A half-delete leaving an importer REDs (the broken-reference symmetric closure — the W-PRUNE-CONSOLIDATE D1 SYMMETRIC-closure precedent: a dormant stub OR a broken reference both RED).
- **N3 — no `liquid-morph.css` survives under `src/styles/`.** The detector asserts no `src/styles/**/liquid-morph.css` exists (it relocated to `demo/`). A surviving `src/styles/glass/liquid-morph.css` REDs (the CSS half not relocated). The demo-local `demo/liquid-morph.css` is NOT scanned (the gate scopes to `src/styles/`).
- **N4 — `useDockOrientationMorph` (the successor) PERSISTS.** The detector asserts `src/components/custom/dock/composables/useDockOrientationMorph.ts` exists AND is barreled (`dock/composables/index.ts`) — the spike's successor is the SHIPPED morph, not a vacuum. An over-cut that also deleted the real morph REDs (the no-over-cut fence — deleting the successor BESIDE the spike is forbidden).

**Self-test bites (each planted defect MUST red — sized to clear its own clause):**
- (a) a re-added synthetic `src/composables/motion/useLiquidMorph.ts` stub → N1 RED.
- (b) a re-added `import { useLiquidMorph } from "./useLiquidMorph"` in a live `src/` SFC → N2 RED.
- (b2) a comment-string `// the retired useLiquidMorph spike` planted in `src/` → N2 must NOT red (the comment-aware false-RED bite).
- (c) a re-added `src/styles/glass/liquid-morph.css` → N3 RED.
- (d) a deleted `useDockOrientationMorph.ts` (the over-cut) → N4 RED.

**What reds on the pre-fix tree (born-RED by construction):** N1 (`useLiquidMorph.ts` exists), N3 (`src/styles/glass/liquid-morph.css` exists). GREEN only after the deletion + the relocation land.

## The binding π — NONE owed (zero pixels)

A SPIKE deletion with ZERO src consumer changes NO library render (it was never on any live surface — only demo string-labels referenced its CSS name). The CSS relocation moves a DEMO-stage decoration that paints the same demo tiles from a new path (byte-identical rules, demo-local). So this wave carries **NO `proof:ba-gestalt` verdict and NO π** (BB inv-4 — a dead-code cut + a demo-file move paints no new surface). The demo stages that READ the relocated `.liquid-stage` (DockExampleTile/Spotlight) read byte-identical CSS; the union demo π sweep (`W-PI-AUTHOR`) confirms no demo-stage regression as a free rider, not a new verdict here.

## Fences

- **Clean break — no alias, no dual path.** `useLiquidMorph` is ABSENT once `useDockOrientationMorph` + the bloom spine are the live path (the no-backwards-compat law, `EXECUTION-DAG.md:196`). No `useLiquidMorph` re-export survives (N1/N2).
- **The CSS is a DEMO decoration, not a library register.** `liquid-morph.css` decorates demo-stage tiles (`.liquid-stage`), not a glass tier — it belongs in `demo/`, off the `src/styles/` cascade (N3). The library's `proof:precept-current` home-map drops any `liquid-morph.css` row (it is no longer a `src/styles/` recipe).
- **The successor is the SHIPPED morph — never a vacuum.** The spike's charter ("generalize the dock V↔H morph") is met by `useDockOrientationMorph` (SHIPPED, barreled, demo-consumed) + the bloom spine (`useElementBloom`, T1). N4 asserts the successor persists; deleting it BESIDE the spike is the forbidden over-cut.
- **DEFINITION-ABSENT byte-assert, never presence-regex.** N1/N3 are `existsSync(…) === false` file-absence asserts; N2 is a comment-stripped import scan. A presence check (`/useLiquidMorph/.test()`) would false-RED on a comment-string mention (the b2 bite) — the detector comment-strips first.

## Disposition links

- **`PASSD-FOLD §HONEST CLEAN` + `EXECUTION-DAG.md:20`** ("delete the useLiquidMorph spike; relocate liquid-morph.css → demo/; proof:no-dual-path") → BUILT (the deletion + relocation + the `SUPERSEDED_SET` row; N1-N4). CLOSED at the spec level (the build user-gated).
- **`EXECUTION-DAG.md:196` clean-break invariant** ("A superseded mechanism is ABSENT once its successor lands — `W-SPIKE-DELETE` … no alias, no dual path") → BUILT (N1/N2 the clean cut). CLOSED.
- **depends: `W-FLIP-SPINE` (T1)** — the bloom spine `useElementBloom` is the consolidated runner the deleted spike's `useLiquidReveal` compose-target folds onto; the spine lands FIRST so the cut strands nothing. Backward.
- **PREREQUISITE FOR** `W-VH-COMPOSE` (T1 next — composes the SHIPPED `useDockOrientationMorph` the spike facsimile'd; the spike must be gone before the real morph is wired so no dual V↔H path survives). Forward.
