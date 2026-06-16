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

---

## The atlas adopt section (W-CLOSE scope 12d — beside the slides + value.js books)

The Connectivity Atlas holds `^3.12.0` (the d6 fork lineage) until this cut. On the 4.0.0 publish:

1. **Re-pin EXACT to `4.0.0`** (not `^` — the d6-bifurcation trap is the reason the pin is exact;
   `npm install`).
2. **The G2b ~30-call-site migration consumes the A-list table** (above): `onFlipSettled` /
   `PAPER_WASH_GROUND` / `data-allow-motion` are no-call-site-change (byte-identical capability);
   `navigate` is a one-line rename (drop the `useRouteTransition()` destructure); `MetricBadge`
   `amount`→`value` is a one-line rename; the `/handmark` family adopts per W-HANDMARK's notes; the
   silver `variant="structure"` is a NEW additive adopt where the atlas wants the milled-metal register.
3. **The atlas's R-LETTER G2a closes on our publish** — the atlas was the live consumer the AZ
   "stale-lineage" prune read mainline-only (the fork had a live registry consumer); 4.0.0 is the
   reconciliation that returns the A-list by new shape.

## THE FORK-CLOSE PROTOCOL (orchestrator-owned — agents NEVER git; emit the EXACT sequence, do NOT run)

After the 4.0.0 fold commits land + push, the orchestrator runs (the d6 retirement, BA invariant 11):

```sh
# 1. ARCHIVE-TAG the fork lineage BEFORE the branch retires (the 9-commit lineage + its
#    registry-publish correspondence survives as a permanent annotated ref).
git tag -a d6-lineage-archive 2755ebbd \
  -m "d6 fork lineage (feat/d6-library-3.10, 9 commits, 3.11.0-3.12.0); capabilities folded at 4.0.0 by new shape (see CHANGELOG 4.0.0 + W-ATLAS-RECONCILE-cut-notes.md). Archived before branch deletion."
git push origin d6-lineage-archive

# 2. DELETE the branch ref (local + remote) once the archive tag lands + the fold commits are pushed.
git branch -D feat/d6-library-3.10
git push origin --delete feat/d6-library-3.10
# (+ remove the worktree if one exists: `git worktree remove <path>/glass-ui-d6`)

# 3. DEPRECATE the dead-end fork versions on npm (mirrors the existing 3.10.0 deprecation;
#    closes the silent-cross-the-bifurcation `npm update` trap).
npm deprecate "@mkbabb/glass-ui@>=3.11.0 <=3.12.0" \
  "d6 fork lineage; superseded by 4.0.0 which folds these capabilities by new shape — see CHANGELOG 4.0.0 + the A-list migration table"
```

The cut notes NAME the retirement: "the d6 lineage (`feat/d6-library-3.10`, archived as
`d6-lineage-archive`) retires; its capabilities return at 4.0.0 by new shape (see the A-list
table); the 3.11.x/3.12.0 registry publishes stay live but are deprecated — pin 4.0.0."
