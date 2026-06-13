# BA.W-ATLAS-RECONCILE — the cut-notes staging (the W-CLOSE consume surface)

The d6-lineage A/B fold's two BY-NAME tables, staged for W-CLOSE's cut notes +
the atlas's G2b ~30-call-site migration. Per the atlas letter register B ("the d6
fixes 3.13.0 dropped — fold or provably subsume, BY NAME in the cut notes, never
silently") + register A ("where you superseded an idiom, tell us the new shape and
we migrate").

Refs. Fork = `feat/d6-library-3.10` tip `2755ebbd`. Merge-base `87c2d384`.
Master HEAD = the BA-authoring tree (the published 3.13.0 is its lineage base).

---

## B-list — the d6 fixes 3.13.0 dropped: fold-or-subsume BY NAME

| d6 commit | the fix | master HEAD before BA | disposition |
|---|---|---|---|
| `749d45ad` (3.11.1) | the HandMark text-mode underline measure anchors (`document.createRange()` over slotted content; word-hug 112%→104%) | ABSENT (rides the hand-mark family) | **FOLDS VIA W-HANDMARK's port** — the measure-anchor render is IN the adopted `HandMark.vue` (not a standalone fold; W-HANDMARK owns the A-2/C-1/C-2 family port). NAMED here per register B. |
| `fee5e3cd` (3.11.2) | the `toggleDark` forced-reflow deletion (removed `void document.documentElement.offsetHeight`; ~40ms/flip, the atlas E9b.1 profile) | STILL CARRIED the reflow (`useGlobalDark.ts`) | **RE-LANDED HERE** (B-2). Surgical 2-line deletion + comment replacement in `src/composables/dark/useGlobalDark.ts`, landed with A-1 (same `toggleDark`). The `.no-transition` class + the scheme toggle land in the SAME style recalc, so the after-change computed style already carries `transition: none` — no transition can start, the flush was pure cost. |
| `2755ebbd` (3.12.0) | the icon-morph `data-allow-motion` carve + the 251-LOC 6-assert born-RED test | DEFECT LIVE — `utilities/a11y-overrides.css` blanket `*` suppression, no carve; the toggle used the `transition:` shorthand | **RE-LANDED HERE + TEST PORTED** (A-3/B-3). The `.no-transition` rule re-keyed to `:not([data-allow-motion])`, the PRM `[data-allow-motion]` absolute-snap added, the toggle's `<g>` carry `data-allow-motion` + longhand transitions. The 251-LOC test ported re-anchored (`src/styles/utilities.css` → `src/styles/utilities/a11y-overrides.css`; the AY partials carve moved the bytes). 6/6 GREEN; born-RED at HEAD (blanket kill + shorthand). |

E-arc UNCLAIMED items (the letter does NOT claim — listed for the lineage map, NOT
folded): `2d` gold-roundtrip (absent on master; latent gold-seal defect, flagged to
the C-cargo silver/gold wave), `2e` ExpandableContainer single-surface (master
DIVERGENT with the always-teleport blank-canvas defect; flagged to the DISPOSITION
register, NOT silently dropped), `2h` control-glass carves (absent; flagged to a
glass-register wave), `2f` rail-collapse (SUBSUMED by AZ.W-DOCK-TAXONOMY), `2i-bis`
popover-spring (partial on master; flagged W-GLASS-CAL.3).

---

## A-list — the superseded-idiom old→new-shape migration (the atlas G2b ~30 call sites)

| capability | the OLD (d6 fork) shape | the NEW (mainline) shape | migration |
|---|---|---|---|
| A-1 post-flip settle | `useGlobalDark().onFlipSettled(cb)` (fork) | **IDENTICAL** — `useGlobalDark().onFlipSettled(cb)` adopted verbatim; `DarkFlipSettledCallback = (isDark: boolean) => void` on `/dark` + `/api` | no call-site change — the seam is byte-identical to the fork's. |
| A-2 hand-mark family | `import { HandMark, InkMark, BRUSHES } from "@mkbabb/glass-ui/handmark"` (fork) | W-HANDMARK owns the re-land + the DEC-8 reconcile (the `/underline`→`/handmark` fold). The atlas migrates per W-HANDMARK's notes (NOT this wave). | see the W-HANDMARK cut notes. |
| A-3 flip suppression | the d6 carve (`data-allow-motion`) + the 6-assert test | **IDENTICAL CAPABILITY** — `data-allow-motion` is a general capability on mainline (the carve generalizes it to the suppression path). | no call-site change — any element declaring `data-allow-motion` keeps its motion through the flip. |
| A-4a ground profile | `import { PAPER_WASH_GROUND } from "@mkbabb/glass-ui/aurora"` (fork) | **IDENTICAL** — `PAPER_WASH_GROUND` adopted verbatim on the aurora barrel + `/api`. Spread it: `{ ...consumerBase, ...PAPER_WASH_GROUND }`. | no call-site change. |
| A-4b route transition | `const { navigate } = useRouteTransition(); await navigate(go)` (fork standalone wrapper) | `import { navigate } from "@mkbabb/glass-ui"` (or `/motion-core`); `await navigate(go, { types }).finished` — the thin convenience over the ONE `useViewTransition` substrate (NO `useRouteTransition` hook). | **ONE-LINE RENAME** per call site: drop the `useRouteTransition()` destructure; `navigate` is a direct named import. `supportsRouteTransitions()` mirrors `supportsViewTransitions()`. |
| A-5 MetricBadge | `<MetricBadge :amount="…">` | `<MetricBadge :value="…">` (done at AZ.W-METRIC-UNIFY; `MIGRATION.md:52`) | **ONE-LINE RENAME** `amount`→`value` per call site. The atlas acknowledged this is intentional. |
| C-3 silver | (absent on the fork — fork item 2d gold-roundtrip is the adjacent unclaimed) | `--silver` / `-light` / `-dark` / `-deep` quad (gold's mirror) + `--color-silver*` aliases + the `<InstrumentChassis variant="structure">` register. The atlas's structure surface is consumer #1. | NEW capability — the atlas adopts `variant="structure"` (or reads the `--color-silver*` tokens) where it wants the cool milled-metal register. |

---

## Semver (register D — feeds W-CLOSE)

The A-list breaks are MAJOR-grade (the atlas letter register D: "semver honesty on
the A-list breaks"). The `amount→value` (A-5, already shipped at AZ) and the
`/underline`→`/handmark` fold (A-2, W-HANDMARK) are the breaking call-site renames.
This wave's own additions (`onFlipSettled`, `PAPER_WASH_GROUND`, `navigate`,
`--silver*`, `variant="structure"`) are ADDITIVE (no break) — the forced-reflow
deletion + the carve are behaviour fixes, not API breaks. After the cut the d6
lineage retires and the fork closes (the W-CLOSE / orchestrator-owned fork-close
protocol); the lineage map from `636adeae` ships in the notes.
