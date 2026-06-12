# BA.W-ATLAS-RECONCILE — the d6-lineage A/B fold (the settle seam, the suppression carve, the ground profile, the route transition, the reflow fix, the silver quad)

**Name**: W-ATLAS-RECONCILE - the atlas letter's A/B registers folded need-shaped
**Opens after**: BA Batch 2 open (runs ‖ W-CONFIG-CHASSIS ‖ W-GOO-REDRESS ‖ W-DOCK-GEOMETRY ‖ W-FADING-SCROLL — disjoint bounds: this wave owns `composables/dark/*`, `controls/DarkModeToggle.vue`, the a11y-suppression styles, the aurora ground constant, `composables/motion/useViewTransition.ts`, and the silver/chassis pair; no Batch-2 sibling writes them)
**Agents**: 2 parallel (.1 the dark band: settle seam + reflow deletion + suppression carve + test port ‖ .2 the motion/aurora/silver band: route transition + ground profile + the silver quad)
**Hard gate**: `proof:atlas-ab` (born-RED) — the settle seam exists and fires post-flip post-paint, the forced reflow is GONE, the suppression kills the storm WITHOUT gagging the toggle (the ported 251-line test green), `PAPER_WASH_GROUND` named, the async route-transition need met on the ONE VT substrate — plus the π icon-morph-during-flip readback + the cut-notes BY-NAME obligations staged.
**Status**: SPEC

## Goal criterion

The atlas's A/B registers are met need-shaped on mainline: a consumer can subscribe
ONE post-flip post-paint moment, the theme flip costs no forced reflow and never gags
the toggle's own icon morph, the aurora ground profile and the route-transition idiom
have homes, and every d6 fix is folded or provably subsumed BY NAME — so the atlas's
G2b migration has a stable, honest target and the d6 fork can close.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD + re-show every fork cite before any edit)

Grounding: `coordination/ATLAS-LETTER-2026-06-12.md` (the binding letter) +
`audit/fleet/atlas-ab-census.md` (the per-item fork-vs-HEAD census — read it WHOLE).
The fork is `feat/d6-library-3.10` (tip `2755ebbd`); inspect via `git show
2755ebbd:<path>` — NEVER checkout. The letter's discipline binds: NEED-shaped, zero
legacy shims, zero compat re-exports.

| item | the fork artefact | master HEAD | the verdict (census) |
|---|---|---|---|
| A-1 settle | `useGlobalDark.ts` `onFlipSettled` + `DarkFlipSettledCallback` (~+90 LOC; rAF-coalesced, burst-safe; NOT VT-based) | ABSENT | [S1] ADOPT verbatim — not VT-subsumable (a flip is a class swap: no DOM mutation to snapshot) |
| A-3/B-3 carve | `2755ebbd`: the `data-allow-motion` carve + transition LONGHANDS + the 251-LOC 6-assert born-RED `DarkModeToggle.icon-morph.test.ts` | DEFECT LIVE — `a11y-overrides.css:20-24` blanket `*` suppression, no carve; the toggle uses the `transition:` shorthand | [S1] RE-LAND on the split `a11y-overrides.css`; PORT the test re-anchored (utilities.css → utilities/a11y-overrides.css) |
| A-4a ground | `presets.ts:330` `PAPER_WASH_GROUND` const-partial (11 deposition dials, `satisfies Partial<AuroraConfig>`) | ABSENT const; ALL keys + the `crayon` medium EXIST at HEAD | [S2] ADOPT verbatim — zero shader work |
| A-4b route | `useRouteTransition.ts` (174 LOC async-nav VT wrapper + JS-level PRM/unsupported fallback + `transitioned`) | `startViewTransition` SYNC-only, no async update, no JS PRM path — DISTINCT need | [S2] RE-LAND need-shaped: EXTEND `useViewTransition` (async update fn + PRM instant-path), a thin `navigate` helper over it — NO parallel wrapper |
| A-5 amount→value | — | DONE at AZ (`MetricBadge.vue:11`; MIGRATION.md:52) | NO WORK — the atlas migrates |
| B-1 measure anchors | `749d45ad` IN the fork tip's HandMark | ABSENT (rides the family) | folds via W-HANDMARK's port — named in the cut notes HERE |
| B-2 reflow | `fee5e3cd` removed the `void offsetHeight` flush | **STILL CARRIES** `useGlobalDark.ts:74-75` (~40ms/flip, the atlas E9b.1 profile) | [S1] surgical 2-line re-land — independent of any merge; same file as A-1 |
| C-3 silver | — (gold round-trip is fork item 2d, unclaimed) | gold quad full (`scale-paper.css:78-88` → bridges → both dark arms); silver NOWHERE in src | conditional ship-or-BOOK (below) |

E-arc UNCLAIMED items (2d gold-roundtrip, 2e expand single-surface — master DIVERGENT
with the Teleport blank-canvas defect, 2h control-glass): NOT folded (the letter does
not claim them); listed for the lineage map; 2e's divergence is flagged to the
DISPOSITION register, not silently dropped.

## Scope

1. **A-1 + B-2 (one file, one commit): the settle seam + the reflow deletion.** Adopt
   the fork's `onFlipSettled`/`DarkFlipSettledCallback` into `composables/dark/`
   (rAF-coalesced post-flip post-paint; burst-safe) AND delete the
   `void offsetHeight` forced reflow per `fee5e3cd` (the no-transition class and the
   scheme toggle share one style recalc). The seam exports on `/dark` (the
   vueuse-bearing subpath — the root-barrel SCC fence holds).
2. **A-3/B-3: the suppression carve + the test port.** Re-land the
   `data-allow-motion` carve on HEAD's `a11y-overrides.css` blanket suppression (the
   storm dies; a `[data-allow-motion]` subtree keeps its transitions) + the
   DarkModeToggle longhand split + the icon-morph survives; PORT the 251-line
   6-assert test re-anchored to the HEAD paths. The π: a live flip shows the icon
   morph RUNNING while sibling surfaces stay storm-free.
3. **A-4a: `PAPER_WASH_GROUND`** adopted verbatim into the aurora presets (the named
   ground profile; `satisfies Partial<AuroraConfig>` holds at HEAD).
4. **A-4b: the async route-transition need on ONE substrate.** Extend
   `useViewTransition` with the async-update + JS-level PRM/unsupported instant-path
   the fork's wrapper carried; ship a thin `navigate(fn)` helper over it. NO parallel
   `useRouteTransition` wrapper (need-shaped, one VT substrate).
5. **C-3: the silver structure quad — conditional ship-or-BOOK (the ≥2-consumer
   truth, honest).** Mint `--silver/-light/-dark/-deep` mirroring gold's exact
   cascade (scale-paper → bridges → both dark arms; cool near-achromatic oklch —
   a NAMED deliberate cool-neutral identity, coordinated with W-NO-GRAY's
   warm-chroma floor as its one sanctioned exception) ONLY IF the in-repo consumer
   #2 lands with it: the instrument-chassis silver structure variant (+ its demo
   row). If the chassis variant does not earn its design fit in the wave, the quad
   is NOT shipped — it records a DISPOSITION BOOK row (atlas = consumer 1, the
   trigger named) at W-CLOSE. The agent records which arm held in PROGRESS.
6. **The cut-notes obligations staged** (consumed by W-CLOSE): the B-list
   fold-or-subsume table BY NAME (749d45ad → folds via W-HANDMARK; fee5e3cd →
   re-landed here; 2755ebbd → re-landed here + test ported) + the A-list
   old→new-shape migration table (for the atlas G2b ~30-call-site migration).

## Triumvirate Dispatch

- **The settle seam's shape fails a consumer need** (the atlas's palette-memo/chart-
  retint/aurora-rederivation subscription cannot ride the adopted callback): that is
  the letter's A-1 going lossy — triumvirate on the seam shape (promise vs event vs
  callback), never ship a partial seam.
- **The carve re-land cannot keep both arms** (storm-dead AND morph-running) after
  two iterations: the suppression architecture is the suspect (the blanket `*` vs
  the longhand split) — triumvirate; the ported test is the arbiter, do not weaken
  an assert.
- **The silver design-fit fails**: NOT a triumvirate — the conditional BOOK arm is
  the specced exit (record + move on).
- **Diagnostic loop**: three iterations on any flip-timing defect → halt (the
  rAF-coalescing vs the style-recalc ordering is the suspect class).

## File Bounds

| File | Access |
|---|---|
| `src/composables/dark/useGlobalDark.ts` (+ the dark barrel) | modify (A-1 adopt + B-2 reflow deletion) |
| `src/components/custom/controls/DarkModeToggle.vue` | modify (the longhand split + `data-allow-motion`) |
| `src/styles/utilities/a11y-overrides.css` | modify (the carve on the blanket suppression) |
| `tests/components/custom/controls/DarkModeToggle.icon-morph.test.ts` | create (the 251-line port, re-anchored) |
| `src/components/custom/aurora/constants/presets.ts` | modify (PAPER_WASH_GROUND) |
| `src/composables/motion/useViewTransition.ts` | modify (the async + PRM extension + `navigate`) |
| `src/styles/tokens/scale-paper.css` + the bridges + both dark arms | modify (C-3 conditional — the silver quad) |
| `src/styles/instrument-chassis.css` + `src/components/custom/instrument-chassis/*` + its demo story | modify (C-3 conditional — the silver variant consumer #2) |
| `src/api/index.ts` | modify (the new public symbols) |
| `scripts/proof-atlas-ab.mjs` + `tests-visual/atlas-flip.spec.ts` | create |
| `package.json` + `scripts/gates.mjs` | modify (append-own-row) |
| `MIGRATION.md` + `CLAUDE.md` | modify (the A-list new-shape rows; the settle/carve canon) |
| `docs/tranches/BA/audit/visual/W-ATLAS-RECONCILE-DELTA.md` | create |

Do NOT touch: `custom/handmark/` + `/underline` (W-HANDMARK owns the A-2/C-1/C-2
family port + fold); the gear PresetEditor's dark ROW (W-CONFIG-CHASSIS, same batch —
that wave binds the demo control to `useGlobalDark`; THIS wave changes the library
seam under it — the binding survives by construction, the coordination is declared);
the fork branch itself (read-only `git show`; the fork-close protocol is W-CLOSE's,
orchestrator-owned); the spring/blur calibrations (W-GLASS-CAL); GL shaders beyond
the named presets constant; ppmycota purple; slides M docs.

### Disjointness

Two agent units parallel with disjoint paths (.1 dark band: useGlobalDark/
DarkModeToggle/a11y-overrides/the test ‖ .2 motion/aurora/silver: useViewTransition/
presets/scale-paper/chassis). Across Batch 2: no sibling writes any of these paths
(verified against the DAG §3 table — W-CONFIG-CHASSIS's `demo/configurator/*` and
this wave's `src/components/custom/controls/*` are different trees).

## Hard Gate

`proof:atlas-ab` (born-RED) + the ported test + the π (`tests-visual/atlas-flip.spec.ts`):

1. **W1 — the settle seam.** Source: `onFlipSettled` exported on `/dark`; π: a
   subscriber fires exactly ONCE per flip, AFTER the painted colors change
   (post-paint ordering assert), and a 3-flip burst coalesces. RED at HEAD (absent).
2. **W2 — the reflow is gone.** Source: no `void …offsetHeight`-class forced-layout
   read in the flip path. RED at HEAD (`useGlobalDark.ts:74-75`).
3. **W3 — the carve, both arms.** The ported 251-line test GREEN (6 asserts) + the
   π: during a live flip the DarkModeToggle icon morph runs (non-zero animated
   delta on the toggle glyph) while a sibling glass card shows NO transition storm.
   RED at HEAD (the blanket suppression gags the toggle).
4. **W4 — the ground + the route need.** `PAPER_WASH_GROUND` exported + satisfies
   the config type; `useViewTransition` accepts an async update + resolves the PRM
   instant-path (unit-tested); NO `useRouteTransition` parallel wrapper exists
   (grep-negative — the need-shaped fence).
5. **W5 — the silver conditional, honest.** EITHER the quad + the chassis consumer
   #2 + demo ship together (the cascade mirror asserted; the cool-neutral identity
   recorded as W-NO-GRAY's named exception) OR the DISPOSITION BOOK row exists with
   the atlas trigger named. A quad without consumer #2 reds.
6. **W6 — the cut-notes staging.** The B-list BY-NAME table + the A-list
   old→new-shape table exist (the W-CLOSE consume surface).
7. **The gestalt verdict (BA invariant 4)**: the flip experience judged whole — a
   live mode flip on the demo shell reads calm (no storm) with the toggle's morph
   alive; recorded at W-REFLECT2.

## Commit Plan

- unit 1: `feat(dark)!: the post-flip settle seam (onFlipSettled, d6 9467bd16 adopt) + the forced-reflow deletion (fee5e3cd re-land) + the data-allow-motion carve with the ported icon-morph test (2755ebbd re-land) (BA.W-ATLAS-RECONCILE)`
- unit 2: `feat(motion,aurora): async VT + PRM instant-path on useViewTransition + navigate; PAPER_WASH_GROUND; the silver structure quad conditional (BA.W-ATLAS-RECONCILE)`
