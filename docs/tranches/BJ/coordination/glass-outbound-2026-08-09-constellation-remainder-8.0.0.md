# glass-ui → the constellation remainder — 8.0.0 addenda (BK #76 W-CONSUMER-BAND)

**From** glass-ui BK Φ6/7 row #76 (W-CONSUMER-BAND) · **date** 2026-08-09 · **spec of
record** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:226` (row 76)
+ `:399` §C — full ledger **CWT-3 §4**, cited, never restated · **precedent** the #85
outbound form. One page for the §C-only repos: **bbnf-buddy · bbnf-lang · sci-report ·
parse-that · latex-paper · oscilloscope**. Consumer-updates ruling throughout; **no
edits were made in any of these trees**; the muster extras stay in muster's own
addendum, cited at TR:414.

---

## 1 · bbnf-buddy

`master` · dirty 0 · no `docs/tranches/` (docs/ holds `grand-audit-2026-06-02.md` only)
· `package.json:21` `"@mkbabb/glass-ui": "^3.9.0"`.

**grain — REMOVED whole-library (7 prop edges on glass-ui `<Card>`)** — delete the
attribute (`MIGRATION.md:440`); under `vueCompilerOptions.checkUnknownProps` a retained
`<Card grain>` is a hard typecheck error, without the flag a silent no-op:

- `src/editor/components/SelectionInfo.vue:176` — `<Card tier="wash" :shadow="false" :grain="false" …>`
- `src/editor/components/BodyEditor.vue:37` — `<Card tier="wash" :shadow="false" :grain="false" class="p-0">`
- `src/editor/components/LayersPanel.vue:151` — `:grain="false"`
- `src/editor/components/EditorPanel.vue:102` — `:grain="false"`
- `src/editor/components/BehaviorsEditor.vue:102` — `<Card tier="wash" :shadow="false" :grain="false" class="p-0">`
- `src/editor/components/animation/AnimationWorkspace.vue:160` — `:grain="false"`
- `src/editor/components/OffsetEditor/OffsetEditor.vue:165` — `<Card tier="wash" :shadow="false" :grain="false" class="p-0">`

Homonym qualified OUT: `src/stores/skeleton/index.ts:16` ("fine-grained", prose).

**ToggleChip ×2 (⊕² — the third ToggleChip repo, missed by both W-CHIP arms, TR:412)**:

- `src/components/EmotionStateSelect.vue:15` — `import { ToggleChip } from "@mkbabb/glass-ui/toggle-chip";`
- `src/editor/components/OffsetEditor/OffsetPicker.vue:19` — same

`./toggle-chip` was folded onto the one `<Chip>` family at **5.0.0** (`MIGRATION.md:992`);
the door is `./chip`. Template usages (`EmotionStateSelect.vue:120/137`,
`OffsetPicker.vue:73-107`) are downstream of the two import seams;
`EmotionStateSelect.vue:216` documents the Q.Rh-1 `cell`-variant substrate gap.

Peer: `vue-component-type-helpers ^3.0.3` lands at the adopt. Sum check (cluster D,
quoted): "7+2 = pinned 7+2 ✓".

## 2 · bbnf-lang

`master` · dirty 243 · tranches through Z + BA + BC (+ `sk-v24`/archive/meta-audit;
newest-modified `sk-v24`) · `playground/package.json:13` `"@mkbabb/glass-ui": "^3.0.0"`
— **STALE-MAJOR pin** against the 8.0.0 ecosystem.

Cluster D's measured surface: **26 module-import edges + 1 manifest pin** (no pinned
per-class total exists for a §C-only repo; count stated as measured). Subpath spread:
tooltip ×11 · select ×3 · dock ×3 · dialog ×2 · search ×2 · sidebar ×2 · card ×1 ·
controls ×1 · dark ×1 · slider ×1. Full file:line list at cluster D's return, banked in
the row RECORD (`docs/tranches/BK/execution/2026-08-09-row76-consumer-band/RECORD.md`).

At 8.0.0 exactly **one** of those subpaths breaks by name:

- `playground/src/components/layout/NavBar.vue:6` — `import { DarkModeToggle } from "@mkbabb/glass-ui/controls";`
  → **`./dark-mode-toggle`** (`./controls` absent from the 8.0.0 map).

Everything else in the spread survives by name (symbol drift across five majors is the
adopt's own sweep — the stale pin is the row). Batch classes all zero here: forms 0 ·
dropdown-menu 0 · sheet 0 · api 0 · grain 0 · specular 0 · TagsInput 0. Peer lands at
the adopt.

## 3 · sci-report (metric-family) — with the census CORRECTION

Two checkouts, one tree: `/Users/mkbabb/Programming/sci-report` (`master`) ≡
`/Users/mkbabb/Programming/.p-totality/sci` (`p/totality`) — **IDENTICAL HEAD
`735ce1c8` 2026-08-03**, dirty 0 both · tranches F, O (live **O**) ·
`dashboards/package.json:17` `"@mkbabb/glass-ui": "7.0.0"`.

**The metric-family row, measured at this fresh census: DISCHARGED ON DISK.** The §C
cell (TR:411) carries "✦³ metric → the family-apotheosis MIGRATION … ON-7.x BLOCKING".
The 2026-08-09 walk finds **zero** `metric-badge`/`metric-cell`/`metric-stack` imports
in either checkout; the ONE live metric edge is already the family door:

- `dashboards/ecf/story/points/01-window-arc/Point.vue:23` — `import { Metric } from "@mkbabb/glass-ui/metric";`

Per the row's own standing law (⊕² the universe is GENERATED, S-10; a fresh census
supersedes a remembered cell), the BLOCKING migration row is recorded **complete at HEAD
`735ce1c8`** — the residue, if any, is the stale `.vite/deps` cache — and one LIVE-SOURCE residue the verify pass surfaced: `Point.vue:404` (both checkouts) carries a scoped `:deep(.metric-badge__label)` selector that is DEAD at 8.0.0 (zero metric-badge classnames in glass-ui src); it rides sci's adopt addendum mentioning
`metric-badge`, which a reinstall clears.

**grain 0 — the homonym IS the finding.** Every sci "grain" hit is either atlas's own
Glyph/EntityIcon grain API (sci composes `@mkbabb/atlas`) or sci's data-granularity
vocabulary — none is glass-ui's removed prop. The fresh table (detector: `grep -rn
grain dashboards --include='*.vue' --include='*.ts'`, node_modules excluded; the
scout's 11 was an attribute-shaped detector — both stated, neither bare):

- live attribute writes on atlas components ×3: `usf/features/retention/RankedStrip.vue:554`
  (`grain="state"` on `<Glyph>`) · `usf/features/balance/BreakEvenScatter.vue:795`
  (`grain="state"`) · `sci/features/map/SchoolMap.vue:759` (`grain="school"` on `<EntityIcon>`)
- comment lines naming the same API ×7: `RankedStrip.vue:236/:532` ·
  `NetRetentionMap.vue:292/:327` · `BreakEvenScatter.vue:338` · `SchoolMap.vue:322/:735`
  · plus `useRankedStripOption.ts:129`, `DistrictChoropleth.vue:468`
- data-granularity prose (sci's own noun): `usf/meta.ts:5` · `usf/provenance-appendix.ts:48`
  (`grainNoun`) · `promotedFilter.ts:4/:6/:17/:19/:24/:28` · `usf/features/sourceScope.ts:4-12`
  · `PlateProvenance.vue:14`

Zero glass-ui grain edges ✓ (pinned "sci 0").

**Batch classes**: forms 0 · dropdown-menu 0 · sheet 0 · dead `./api` 0 · TagsInput 0 ·
specular 0. Subpath spread (fresh): button ×7 · toggle-group ×6 · slider ×4 · tabs ×2 ·
surface ×2 · completion-seal ×2 · badge ×2 · motion-core ×1 · metric ×1 · drawer ×1 ·
dark-mode-toggle ×1 · card ×1.

**Export-map-diff findings at the fresh census (stated + routed, owners ruled)**:

- `./completion-seal` absent from 8.0.0 — `dashboards/home/gallery/GalleryView.vue:19` +
  `dashboards/home/gallery/CategoryHomeView.vue:4`. RULED: re-point to **`@mkbabb/atlas`**
  via the peer cascade (TR:411 + ⊕⁴ DECK-RELOCATION §1).
- `./drawer` absent from 8.0.0 — `dashboards/speedtest/features/readout/SpeedtestReadoutSheet.vue:38`.
  Successor shape: `<Dialog>` (from `./dialog`) around `<SheetContent side :detents>`
  (from `./sheet`); `MIGRATION.md:592` + `src/index.ts:302-309`.

Peer lands at the adopt. The 11-wrap-overrides, badge `surface`, bidsheet rows —
**TERMINAL-ROSTER.md:411 + CWT-3 §4**, cited whole.

## 4 · parse-that — text-only, holds

`master` · dirty 31 · tranches A/B/T/U. Five references, **all documentation prose, zero
code edges** (matches §C "parse-that (5, text-only)"):
`docs/precepts/cross-repo-dev-resolution.md:3` ·
`docs/precepts/instructions/LESSONS-LEARNED.md:493` ·
`docs/tranches/T/prototypes/major/common/evidence/PT0-W0-AUTHOR.md:133` ·
`…/common/pins.config.json:98` · `…/common/receipts/pins.json:1`. No action.

## 5 · latex-paper — text-only, holds

`master` · dirty 18 · live tranche **VIRT**. Every reference lives under
`docs/tranches/VIRT/**` (~28 grep lines at this walk; §C's ref-count 11 was a different
detector — both stated, neither bare): **zero code edges**. The VIRT corpus specs a
hypothetical `@mkbabb/glass-ui/virtual` subpath — absent from the 8.0.0 map, zero
consumers anywhere; a record line only. No action.

## 6 · oscilloscope — the negative control HOLDS

`master` · dirty 9 · HEAD `a44bc00` (2023-01-09). **Zero** `@mkbabb/glass-ui`
references (node_modules/lock excluded). The ledger's 1-negative-control invariant
reproduces ✓.

## Owed back to glass-ui

Nothing blocking from any repo on this page; breaks beyond these rows reply on this
thread → #76's routed table.
