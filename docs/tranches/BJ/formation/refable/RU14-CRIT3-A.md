# RU-14 CRIT3-A — ring round 3, seat A (F01-F30): fresh adversarial critique

- **Unit:** RU-14, ring round 3, seat A. Scope: `redress/DOSSIER-F01-F10.md`,
  `DOSSIER-F11-F20.md`, `DOSSIER-F21-F30.md` + sidecars `refable/REFABLE-RU-13-{F01-F10,
  F11-F20,F21-F30}.md`, as amended by the R3 fix seat (`RU14-FIXLOG-R3.md`, working-tree,
  uncommitted); ring history `RU14-CRIT1-A/B`, `RU14-CRIT2-A/B` read from disk.
- **modelId:** `claude-fable-5` (verbatim from this seat's system context).
- **Verification base:** commit HEAD `485891a2` (master) + the live working tree. The corpus
  files are working-tree modified (R3 edits, mtimes 13:47-13:54); a CONCURRENT session
  (REFABLE RU-03) modified `waves/BAND-DOC-TRUTH.md` + `BAND-A11Y.md` + `BAND-COLOCATION.md`
  in the working tree at 13:58 — AFTER the R3 fix pass — and that write is material to
  MAJOR-1 below. `src/`+`demo/` tip is `55f5170d` — tree parity with every prior pass holds.
  Judged doc surfaces re-pinned by commit: GF-DOCK/GF-AURORA last moved at `117b7f12`,
  SUPERFLUITY at `5c847780`, ASSEMBLY-CROSSWALK at `aded259b` — all unchanged since the pins
  the corpus cites.
- **Method:** fresh assume-wrong pass; I authored none of the corpus and none of the ring
  history. **~145 anchors re-verified this seat**: ~60 docs pins (SUPERFLUITY :227/:668-686,
  BAND-MATERIAL ×9, BAND-GATES :381-386, BAND-FM ×6, BAND-STORY ×8, BAND-REDUCTION ×5,
  PLAN :185-189, REGISTRY ×3, IOS27-CODEX :28, JUDGE/APPLYLOG greps, crosswalk ×10 incl.
  :56-62/:231-233/RU-06-grep-0, GF-DOCK :104-111/:319/:357/:211 + rail.vue-grep-0 +
  useDockShellProps-grep-0, GF-HANDMARK :208-211 + retired-gates-grep-0, GF-AURORA
  :163/:237/:314-315/:461 + Q-AURORA-QUARTET :13/:212/:214/:239, ledger F01/F04/F13/F23/F30,
  ASK-REDUCTION ×7); ~65 src/demo pins (every load-bearing F01-F30 cite incl. the WGSL
  3/5/6/7→`mediumKuwahara` body, 17 presets + SPEEDTEST, `rail.vue` sections + slice(0,4),
  `searchVariants.ts:10` + zero `.fuzzy-search--floating`, Skeleton 5s chain, overflow.css
  FITS/overflow branches + the false :65-66 comment, `useSelectionGroup.ts:185`, the
  progress 120ms/300ms pair, button/select 7px statics, alert 10px/1px chain, toast/dialog
  registers, timeline facade + 2,254 LOC + README :11-17, tags-input :8 incl. at `490cc46e`,
  4 `.tile.vue`, 73 modulepreloads, `PagerDots.vue:326` ≡ `DeckGooFilter.vue:26`
  byte-identical); 10 sibling-census re-runs read-only (words vite.config **line 218 exact** +
  ×5 imports, muster `App.vue:69` dynamic import, value.js ×0, speedtest PhaseTimeline `:49` +
  completion-seal ×0, sci-report ×2, atlas ≥2, instrument-chassis speedtest ×4 + muster ×5,
  fourier metric ×7); 8 commit existence/chronology checks; the FLIP F-3 greps reproduced
  EXACTLY (bare 257 lines / 260 occurrences; filtered 234 = 218 demo + 16 src).

## 1. R3 fixlog cure verification (all in-scope cures)

| fixlog row | verdict this seat |
|---|---|
| CRIT2-A MAJOR-1 (docket 7→10) | **LANDED** — rows 8-10 on disk (`DOSSIER-F11-F20.md:452-454`), count language coherent across all six files (residual "seven"s are all historical/legitimate), label note in the preamble. Row 8/9/10 evidence pins independently re-proven: C-G `:668-672` exact, value-mark grep 0, path split `:227` vs `:433/:476`; goo path data byte-identical, goo-deletion grep 0 in waves/, `BAND-FM:130-148` DeckPager-only; crosswalk `:56-62` unchanged, retired-gate grep 0, wave map `:208-211`, RU-06 grep 0 |
| CRIT2-A MINOR-1 (F27 cites) | **LANDED** — `:319`/`:357` true at HEAD (`GF-DOCK-PASS3` unchanged since `117b7f12`); dossier `:391-392,:554` + sidecar `:59,:140-142` carry them |
| CRIT2-A MINOR-2 (F25 census) | **LANDED** — `words/frontend/vite.config.ts:218` re-proven live this seat (the literal is on line 218 exactly); C-I form present; 6-live + 1-config + 2-doc coherent. One pin defect survives (MINOR-2 below) |
| CRIT2-A MINOR-3 (FLIP F-3 refile) | **LANDED mechanically** — refiled to FLIPS with the `--include` filter + routing row; every stated count reproduces exactly this seat. The truth-up's population framing is defective (MAJOR-2 below) |
| CRIT2-A MINOR-4 (path prefixes) | **LANDED** — `DOSSIER-F11-F20.md:222` + `DOSSIER-F21-F30.md:365,:377-378`; content re-proven (`:4` imports GlassTimeline, `:226` comment-only; `block:"nearest"` at `:185`) |
| CRIT2-B MAJOR-1/MAJOR-2 (rows 10/9 seated) | **LANDED** in this seat's files — both rows present with every evidence cell re-proven live |

**Refutations of the fixlog: zero.** Its "none of the judged surfaces moved" claim was true at
its write time; the RU-03 write at 13:58 postdates it.

## 2. Findings

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| R3A-1 | **MAJOR** | `redress/DOSSIER-F11-F20.md:451` (docket row 7) + `:222-224` (F16 body "still unnamed in BAND-DOC-TRUTH — lead routing owed") + `:424-425` (open-items line) + `refable/REFABLE-RU-13-F11-F20.md:78-79` | Docket row 7's state-at-HEAD ("zero `timeline` hits in `BAND-DOC-TRUTH.md`; route there or to the W5 stub") and its three companion texts are FALSE on the live tree: the routing has been CONSUMED | `waves/BAND-DOC-TRUTH.md:94` now carries row **T33** — `timeline/README.md` §Exports drift → truth-up, "REDUCTION W5's stub supersedes on arrival", provenance cell "FABLE-NEW (RU-13-F11-F20 routing; RU14-CRIT1/2 concur it was un-routed)". Written by the concurrent REFABLE RU-03 union (working-tree, mtime 13:58 > the R3 fix pass 13:47-13:54; last commit touching the file is `4ab12128`, so T33 is uncommitted). True at commit HEAD `485891a2`; false on the tree a J12+ lead would read. A race, not a fix-seat verification failure — but left as-is the docket directs the lead to route an already-routed item and its "three later unions landed without consuming any" framing is stale for row 7 | Convert row 7 to CONSUMED-BY-T33 (cite the RU-03 union + pending-commit status; residue shrinks to "confirm T33 survives the RU-03 commit"), and sweep the three companion mentions (`:222-224`, `:424-425`, sidecar `:78-79`) |
| R3A-2 | **MAJOR** | `refable/REFABLE-RU-13-F11-F20.md:64-73` (FLIP F-3) + `redress/DOSSIER-F11-F20.md:188-190` (F15 grand-typography line) | FLIP F-3 characterizes the band's standing 251 as "the 251-site `text-sm`/`text-xs` figure" and rules "the reproducible count is 234" — conflating two populations at one of its two cited sites. A lead executing the routing row ("re-pins the figure AND the stated method") would re-pin 251→234 and silently contract W6's chartered codemod reach | `BAND-MATERIAL.md:588-592` (re-read this seat) decomposes 251 as "the 218 demo + `src` ×19 + **the 9 arbitrary `text-[…]`** … This wave migrates all 251" — the arbitrary-`text-[…]` class is real at HEAD (14 raw / 11 excl. `text-[length:var…]` sites, grep this seat) and is INVISIBLE to the FLIP's stated `\btext-(sm|xs)\b` method. Like-for-like, the text-sm/xs slice moved 237 (218+19) → 234 (218+16); 234 is NOT the current value of what 251 charters. Riding defect, unflagged anywhere: the band's own decomposition sums to 246 ≠ 251 (`REGISTRY.md:236` frames 251 as "text-sm/text-xs (251 sites)" — the two band sites disagree with each other). CRIT1-A MINOR-2 and CRIT2-A MINOR-3 both endorsed the 251↔234 equivalence; neither caught the population split — new this pass | Amend FLIP F-3: state BAND-MATERIAL's own 218+19+9 decomposition; scope the 234 truth-up to the text-sm/xs slice only (237→234); add that the arbitrary-`text-[…]` class needs its own re-count at re-pin time and that 218+19+9 ≠ 251 means the lead re-DERIVES the W6 figure rather than substituting 234. Mirror the one-line fix in the dossier F15 parenthetical |
| R3A-3 | MINOR | `redress/DOSSIER-F01-F10.md:316` + `refable/REFABLE-RU-13-F01-F10.md:16,:43` | The "first-class mediums… no shared dispatch" comment is cited as bare `presets.ts:73-77` inside a row whose `presets.ts` is explicitly bound to `demo/stories/substrates/aurora/presets.ts` (`:310` pins the 17-preset roster there) — a cross-FILE ambiguity, not just a bare path | The comment lives at `src/components/aurora/constants/presets.ts:72-78` (re-read this seat: "…are all first-class mediums. Each authors its own shader body with no shared dispatch…"); the DEMO file's `:73-77` are OKLCH color stops. A reader checking the row's own established referent finds no comment and would wrongly score the claim fabricated. Same class as the twice-cured MINOR-4 bare paths; uncaught by CRIT1/CRIT2/CRIT3-SCOPED/R3 | Prefix `src/components/aurora/constants/` at all three sites |
| R3A-4 | MINOR | `redress/DOSSIER-F21-F30.md:280` + `refable/REFABLE-RU-13-F21-F30.md:143` + `RU14-FIXLOG-R3.md` (MINOR-2 row) | The R3-landed C-I pin `SUPERFLUITY.md:683-687` is off by one — it drops C-I's opening line and annexes a blank | C-I spans `SUPERFLUITY.md:682-686` (grep + block re-read this seat; CRIT1-A had `:682-686` correct — the wrong pin originates in CRIT2-A MINOR-2 and was propagated by the fix seat despite the fixlog's "block re-read this seat" claim) | `:683-687` → `:682-686` in both corpus sites (the fixlog is a log; correct forward) |
| R3A-5 | MINOR | `redress/DOSSIER-F01-F10.md:434` (F08 summary row) | "GF-AURORA W1-W5 under C-G/C-H" cites both colliding C-label vocabularies unpinned in one breath — C-G here is JUDGE-C-G (the F08 binding, `JUDGE.md:94`) while SUPERFLUITY-C-G is the F23 dispute; C-H is SUPERFLUITY-only | The docket preamble's own label note (seated R3, `DOSSIER-F11-F20.md:438-441`) rules that C-label cites pin doc + line; the F08 REDRESS body complies ("re-affirmed by RU-09 C-H", "SUPERFLUITY C-H's ~11-not-10") but the summary row predates the convention and a vocabulary-joining reader resolves its C-G to the WRONG ruling | Pin the row: "under JUDGE C-G (`JUDGE.md:94`) / SUPERFLUITY C-H (`:674-681`)" |

## 3. What re-proved clean (the ratified spine, this pass)

Every mechanism-layer OVERTURN/claim the ring rests on re-derived or re-pinned exact at the
current tree: the F04 `rail.vue:108-140` + `slice(0,4)` + `shape="rounded"` anchor (entries
roster `:31-40`, ONE `<Aurora>` at `:69`); the F17 chain (`search.vue:504` `variant="floating"`
→ `searchVariants.ts:10` `rounded-none` utilities-layer vs `.input-bar` `--radius-2xl` at
`components.css:12-16`, `.fuzzy-search--floating` grep 0, `FuzzySearch.vue:126-127`); the F24
chain (`Skeleton.vue:54` → `scheme-motion.css:107` 5s, `literals.css:24-34` skeleton on the
3s fast rung); the F27 chain (FITS both-visible `:50-59`, overflow branch `auto`+`visible`
`:64/:73`, the false "clip" comment `:65-66`, `useDockOverflowFit.ts:38-41` axis-conditional,
`useSelectionGroup.ts:185`); the F22 pair (120ms/+3 vs 300ms, wrap-to-0 `:29-32`); the F28
statics (both buttons default-secondary, secondary = `--glass-blur-resting`,
`--control-surface-blur` = quiet, no primary in frame); the F08 WGSL alias verbatim
(`aurora-mediums.wgsl.ts:387-403` routes 3/5/6/7 → `mediumKuwahara`; 17 `PRESETS` incl.
`SPEEDTEST`); the F16 facade (`GlassTimeline.vue:2-4` imports all three registers; `index.ts`
GlassTimeline+types only; README §Exports `:11-17` false; test `:4` GlassTimeline-only,
`:226` comment; family = 2,254 LOC; speedtest `:49` the one external import). All ten F11-F20
ledger pins (`:23-32`), F21-F30 (`:33-42`), F01-F10 (`:13-22`) exact. Every RULING-8/F17
premise site still stale as the docket claims (`BAND-MATERIAL.md:117-119`, `:698-700`,
`PLAN.md:185-189`, crosswalk `:227-229`); GF-DOCK still rail.vue-free; BAND-REDUCTION
`:33-37`/`:240` still say "the F04 shape"; FM-W3 gate (b) still token-residence-only
(`:74-76`); the stale F28 sentence still at `BAND-MATERIAL.md:233-236` beside the J6 re-aim
(`:258-262`). The screenshot inventory census (6 on disk / 4 absent for F01-F10; F11/F12/F15/
F17 + F21/F22/F27/F28 present) exact against `feedback/`. Sibling censuses all re-proved at
the stated figures. F16's A2 "~1500 LOC" nit dissolves on arithmetic (the five variant SFCs
sum 1,704 excl. facade/geometry/types — ballpark of the five-variant slice, not a
contradiction worth a row).

## 4. Disposition (PROPOSE only — the lead applies)

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-F01-F10 (+ sidecar) | 0 | 0 | 2 (R3A-3, R3A-5) | AMEND (pin fixes only) |
| DOSSIER-F11-F20 (+ sidecar) | 0 | 2 (R3A-1, R3A-2) | 0 | AMEND |
| DOSSIER-F21-F30 (+ sidecar) | 0 | 0 | 1 (R3A-4) | AMEND (one pin) |

Zero BLOCKERs: no row loses its owner, no JUDGE ruling is contradicted, all six R3 cures
verified LANDED, and both MAJORs are containable text amendments (one born of a cross-session
race, one a population-framing defect in an otherwise-exact truth-up). Consecutive-clean is
NOT met — two MAJORs plus three MINORs stand for a round-4 fix pass.

*End — RU-14 CRIT3-A. One file under `formation/refable/`; no `src/`/`demo/` edits, no commit.*
