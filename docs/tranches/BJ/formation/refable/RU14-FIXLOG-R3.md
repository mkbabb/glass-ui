# RU-14 FIXLOG — ring round 3 (2026-07-18, fix seat claude-fable-5)

- **Charge:** land cures for every outstanding finding in `RU14-CRIT2-A.md` + `RU14-CRIT2-B.md`
  (pass 2, both seats); refute with pinned evidence where a finding is wrong; no silent
  residue.
- **Verification base:** HEAD `485891a2` (master; moved from the critiques' `44914b74` — the
  delta is IOS27-MICRO + refable adds, none of the judged surfaces; every anchor cited below
  was re-proven on the working tree this seat, and `greenfields/`, `superfluity/`,
  `ASSEMBLY-CROSSWALK.md`, `src/`, `demo/` carry zero working-tree modifications).
- **Write fence respected:** edits land ONLY in `redress/DOSSIER-*.md`,
  `refable/REFABLE-RU-13-*.md`, and this file. The concurrent IOS27-MICRO working-tree
  modifications are another session's — untouched.
- **Refutations: zero.** Every finding in both critiques re-verified TRUE on disk before its
  cure was applied (evidence column below).

## CRIT2-A (seat A, F01-F30)

| finding | verdict | edit / evidence | pins |
|---|---|---|---|
| **MAJOR-1** — docket billed seven while the pass minted an eighth (D2-F23 rowless in the consolidation); the C-label crosswalk item docketed nowhere | **CURED** | D2-F23 seated as consolidated row 8; the JUDGE/SUPERFLUITY C-label collision note added to the docket preamble; count language updated seven→ten everywhere it was fixed at seven. Pre-edit re-proof: C-G at `superfluity/SUPERFLUITY.md:668-672`, the split paths at `SUPERFLUITY.md:227` vs `BAND-MATERIAL.md:433/:476` | `DOSSIER-F11-F20.md:429-441` (heading + preamble + label note), `:452` (row 8); `DOSSIER-F01-F10.md:448,:457-461`; `DOSSIER-F21-F30.md:589-590` + the D2-F23 bullet ("consolidated as row 8"); sidecars `REFABLE-RU-13-F01-F10.md:156-162`, `REFABLE-RU-13-F11-F20.md:96-104,:106-114`, `REFABLE-RU-13-F21-F30.md:135-139` |
| **MINOR-1** — F27's "refreshed" GF-DOCK cites stale again under 117b7f12 (`:304`/`:336-337`) | **CURED** | `:304`→`:319`, `:336-337`→`:357` in the F27 REDRESS + the TRUE-RUN tally line + the sidecar F27 row. Pre-edit re-proof: W2 roster row at `GF-DOCK-PASS3.md:319`, `G-NO-BLOCK-SCROLL` at `:357`, §4.1 `:104-111` exact; `:304` mid-sentence prose, `:336-337` a table header | `DOSSIER-F21-F30.md:391-392,:554`; `REFABLE-RU-13-F21-F30.md:59` (F27 row), `:140-142` (R3 addendum) |
| **MINOR-2** — F25 census grain: `vite.config.ts:218` absent from TARGET; C-I precision missing (pass-1 MINOR-1 carry) | **CURED** | TARGET roster gains `words/frontend/vite.config.ts:218` (the `optimizeDeps.include` subpath literal — block re-read this seat) + the C-I form (value.js ×0 already migrated, `AdminUsersPanel.vue` the exemplar; muster a `defineAsyncComponent` dynamic import); corrected figure 6-live + 1-config + 2-doc, and the REDRESS's stale "8 external consumers" phrase re-scoped to match | `DOSSIER-F21-F30.md:274-285` (TARGET), `:293-295` (REDRESS); C-I at `SUPERFLUITY.md:683-687`; the literal live at `words/frontend/vite.config.ts:218` | 
| **MINOR-3** — 251→234 truth-up mis-filed FABLE-NEW not FLIPS; derivation not reproducible as stated (pass-1 MINOR-2 carry) | **CURED** | Refiled as **FLIP F-3** with the load-bearing `--include="*.vue" --include="*.ts"` filter stated and a routing row (BAND-MATERIAL W6 + coupled BAND-GATES W4, re-pin at J12+/wave time); F15 row + counts line adjusted (FABLE-NEW 3→2). Pre-edit re-proof: bare grep = 257 lines / 260 occurrences at HEAD; filtered = 234 = 218 demo + 16 src exactly | `REFABLE-RU-13-F11-F20.md:28` (F15 row), `:35-39` (counts), `:64-74` (FLIP F-3), `:115-117` (R3 addendum); the 251 figure standing at `waves/BAND-MATERIAL.md:40/:588-592` + `waves/BAND-GATES.md:381-386` |
| **MINOR-4** — bare paths: F16's test cite + F27's `useSelectionGroup.ts` (pass-1 MINOR-4 carry + sibling) | **CURED** | Both prefixed. Pre-edit re-proof: `tests/components/custom/timeline/continuous-structural-split.test.ts:4` imports GlassTimeline; `src/composables/motion/morph/useSelectionGroup.ts:185` `block: "nearest"` | `DOSSIER-F11-F20.md:222`; `DOSSIER-F21-F30.md:365,:377-378` (both F27 sites, with the not-under-`dock/` note) |

## CRIT2-B (seat B, F31-F50 + A01-A17)

| finding | verdict | edit / evidence | pins |
|---|---|---|---|
| **MAJOR-1** — the RU14-1 crosswalk half uncured AND unowned (`ASSEMBLY-CROSSWALK.md:56-62` retired GF-HANDMARK names; deferral recorded nowhere) | **CURED-AS-FENCED + DEFER-with-owner** | The deferral is now OWNED: docket row 10 charges the lead with the rows-:56-62 read-through-RU-06 stamp (or a §Judgment-corrections item); the crosswalk edit itself stays lead-side — `ASSEMBLY-CROSSWALK.md` is outside this seat's write fence too, and the fence held. Pre-edit re-proof: rows :56-62 unchanged at HEAD (F36 `G-CONTAIN`, F37 `G-DRAW-CONNECTED`, F38 "7→3 brushes", F39 `G-RING-LAYER`, F40 "W6 G-NO-JARGON"); `G-CONTAIN|G-DRAW-CONNECTED|G-RING-LAYER` grep = 0 in `GF-HANDMARK-PASS3.md`; the live map W1 THE-VOICE…W4 THE-STORY at `:208-211`; §Judgment corrections `:237-249` carries no RU-06 item | `DOSSIER-F11-F20.md:454` (row 10); `REFABLE-RU-13-F31-F40.md:112-116` (R3 addendum) |
| **MAJOR-2** — F33's ask claims a docket seat that does not exist (both texts point at a seven-item docket with no F33 row) | **CURED** | Docket row 9 seated (the goo-clone migration: `useDeckGoo.ts` + `gooBarbellGeometry.ts` + `DeckGooFilter.vue` + goo CSS + test, + the ASK §C1/§C3 recommendation refresh); both F33 texts now pin "row 9, seated RU-14 R3" — the pointer is true. Pre-edit re-proof: the docket enumerated exactly seven rows, none F33 | `DOSSIER-F11-F20.md:453` (row 9); `DOSSIER-F31-F40.md:242-245` (F33 REDRESS pin); `REFABLE-RU-13-F31-F40.md:100-102` (pin), `:108-111` (R3 addendum) |
| **MINOR-3** — restated totals drop a row (8+1=9 ≠ 10 table rows) | **CURED** | "EXACT 8" → "EXACT 9" (re-tallied R3). Pre-edit re-proof: the coverage table carries ten rows — nine EXACT-flavored (F31, F32-decision, F34-F40) + one PARTIAL (F33), matching the F41-F50 dossier's flavor convention | `DOSSIER-F31-F40.md:585` |
| **MINOR-4** — A05 "68 dirs" conflates entries with directories | **CURED** | "66 component dirs at HEAD — 68 entries counting the 2 files (`PROCEDURAL-SUITE.md` + `index.ts`); counting base stated per RF-1"; summary row updated to match. Pre-edit re-proof this seat: `ls src/components | wc -l` = 68; `find -maxdepth 1 -type d` = 67 incl. the root → 66 subdirs; the 2 files enumerated | `DOSSIER-A01-A17.md:128-130` (CORRELATION), `:447` (A05 summary row); R3 addendum `REFABLE-RU-13-A01-A17.md:139-140` |
| **MINOR-5** — RU14-7 open: A09/A16 vs RF-5 divergence uncross-referenced (fam-I double-disposition; A16 read wider than OW-1 allows) | **CURED (cross-refs + riders) + DEFER-with-owner (the ruling)** | A09 gains the "reconcile with RF-5" rider (OW-3/R-5's opposite terminal record — CHRONIC-ADJUDICATION.md formation-terminal vs FLIP-1's charter-or-distribute ask — named as ONE lead decision); A16 gains the OW-1 scope-limit rider (COUNTS line false at `ASSEMBLY-CROSSWALK.md:231-233`: 50+5+3+10 = 68 ≠ 67, honest partition 50/5/2/10; A16's zero-silent-drop/67-row/0-orphan substance survives). The reconciling ruling itself and the COUNTS re-tally stay lead-side (RF-5 R-5/R-1's pending edits) — now explicitly recorded in both artifacts, no longer silent. Pre-edit re-proof: "RF-5" grep = 0 across all three seat-B dossiers; the COUNTS line unchanged on disk | `DOSSIER-A01-A17.md:234-240` (A09 rider), `:406-411` (A16 rider); `REFABLE-RU-13-A01-A17.md:127-140` (R3 addendum) |
| **MINOR-6** — RU14-8 open: bare `useHandMark.ts` cites (header list + F34/F37 targets) | **CURED** | Header list → `composables/useHandMark.ts` (siblings are all `src/components/handmark/`-rooted); both target cites → the full `src/components/handmark/composables/useHandMark.ts:113`. Pre-edit re-proof: the file lives there; `:113` is the `natural: props.natural ?? props.brush === "boil"` line exactly | `DOSSIER-F31-F40.md:22,:270,:402` |

## Residue for the lead (all owned, none silent)

The consolidated JUDGE-2 docket (`DOSSIER-F11-F20.md:429-454`) is now the single vehicle: ten
rows + the C-label preamble note. Lead-side edits it charges: JUDGE.md/APPLYLOG (J12+ pass),
the band/greenfield premise fixes (rows 1-7), the crosswalk rows :56-62 stamp (row 10), the
BAND-MATERIAL/BAND-GATES 251→234 re-pin (sidecar FLIP F-3 routing), the RF-5 R-1 COUNTS
re-tally + R-5/FLIP-1 reconciliation (the A-dossier riders). Consecutive-clean at the ring
layer requires a fresh pass over these fixes; this log claims cures landed, not CLEAN.

*End — RU-14 R3 fixlog. Ten corpus files edited + this log; no `src/`/`demo/` edits, no commit.*
