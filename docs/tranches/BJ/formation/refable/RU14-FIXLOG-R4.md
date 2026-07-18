# RU-14 FIXLOG — ring round 4 (cures for CRIT3-A + CRIT3-B)

- **Seat:** RU-14 ring round 4 FIX. **modelId:** `claude-fable-5` (verbatim from this seat's
  system context).
- **Inputs:** `RU14-CRIT3-A.md` (R3A-1..R3A-5) + `RU14-CRIT3-B.md` (CRIT3B-1..CRIT3B-5) — ten
  findings total: 3 MAJOR, 7 MINOR. Zero findings left silently unaddressed.
- **Verification base:** commit HEAD `485891a2` (master) + the live working tree. Material
  state re-proven this seat before any edit: `waves/BAND-DOC-TRUTH.md` is STILL uncommitted
  working-tree `M` (last commit touching it `4ab12128`, which has zero `timeline` hits and
  zero `DECIDED-rows` hits); T33 live at `:94`, T40 at `:121`, the PROCEDURAL-SUITE routing at
  `:133-134`. `BAND-REDUCTION.md` PROCEDURAL-SUITE grep = 0 (routed-but-not-chartered).
  Evidence re-proven per finding below — every cite re-run on disk, none taken from the
  critiques on faith.
- **Write fence honored:** edits touched ONLY `redress/DOSSIER-*.md`, `refable/REFABLE-RU-13-*.md`,
  and this fixlog. No `src/`/`demo/`/`waves/`/greenfield/JUDGE edits, no commit.

## Cure table

| finding | severity | summary | verdict | edit / evidence |
|---------|----------|---------|---------|-----------------|
| R3A-1 | MAJOR | Docket row 7 + 3 companion texts direct the lead to route the timeline-README truth-up, but the concurrent RU-03 union already seated it as T33 | **CURED** | Evidence re-proven: T33 at working-tree `BAND-DOC-TRUTH.md:94` (uncommitted; `git show 4ab12128` timeline grep = 0). Row 7 converted to CONSUMED-BY-T33 with the uncommitted status + "confirm T33 survives the RU-03 commit" residue (`DOSSIER-F11-F20.md:457`); the preamble's three-unions framing now names the fourth (`:436-439`); the F16 body parenthetical (`:223-225`) and open-items line (`:428-429`) sweep with it; sidecar "Riding with it" text (`REFABLE-RU-13-F11-F20.md:86-89`) + the F16 verdict-table row (`:29`, a fourth companion mention found this seat) + R4 addendum (`:133-141`) |
| R3A-2 | MAJOR | FLIP F-3 conflates two populations: 251 (the W6 charter reach, incl. 9 arbitrary `text-[…]`) vs 234 (the text-sm/xs slice); a lead executing the routing row would contract the codemod | **CURED** | Evidence re-proven: filtered grep = 234 (218 demo + 16 src) exact; arbitrary `text-[` = 14 raw / 11 excl. `text-[length:var…]`; `BAND-MATERIAL.md:588-592` decomposes 251 as 218+19+9 (sum 246); `REGISTRY.md:236` frames 251 as "text-sm/text-xs (251 sites)". FLIP F-3 rewritten (`REFABLE-RU-13-F11-F20.md:64-82`): the 218+19+9 decomposition stated, the 234 truth-up scoped to the slice (237→234), the arbitrary-`text-[…]` re-count owed, 246 ≠ 251 + the two-band-site disagreement named, the routing row now says re-DERIVE (never substitute 234). Dossier F15 parenthetical mirrors (`DOSSIER-F11-F20.md:184-188`); R4 addendum (`:141-146` of the sidecar) |
| CRIT3B-1 | MAJOR | A11's "every 'breath' grep hit in `src/` is a padding metaphor, not motion" is false at HEAD (108 hits, dozens motion registers) and contradicts the row's own check line | **CURED** | Evidence re-proven: `grep -rin breath src/` = 108; `button/` = 0; motion hits confirmed (aurora `breathDepth`/`breathPeriod`/`still\|breathing\|drifting` in `atoms.ts:195,:314-315`, the waveField swell `waveField.ts:352`, `useWatercolorBlob.ts:38`, blob/LiquidGrid). Parenthetical rewritten honest-scope in the dossier CORRELATION (`DOSSIER-A01-A17.md:265-270`) + the sidecar ratified-table A11 row (`REFABLE-RU-13-A01-A17.md:48`) + R4 addendum (`:142-153`). No verdict movement — the A11 substance (inert atoms, J1) stands |
| R3A-3 | MINOR | The "first-class mediums… no shared dispatch" comment cited as bare `presets.ts:73-77` inside rows whose `presets.ts` referent is the DEMO roster — cross-file ambiguity | **CURED** | Evidence re-proven: the comment lives at `src/components/aurora/constants/presets.ts:73-78` (six comment lines, re-read; the demo file's `:73-77` are OKLCH stops). Full-pathed at all three sites: `DOSSIER-F01-F10.md:316-318`, `REFABLE-RU-13-F01-F10.md:16-18` (boundary moment), `:44` (F08 row); span corrected :73-77 → :73-78; R4 addendum (`:165-173`) |
| R3A-4 | MINOR | The R3-landed C-I pin `SUPERFLUITY.md:683-687` is off by one (drops the opening line, annexes a blank) | **CURED** | Evidence re-proven: C-I spans `superfluity/SUPERFLUITY.md:682-686` (opening "**C-I. F25's relay census…**" at `:682`; `:687` blank). Corrected `:683-687` → `:682-686` at `DOSSIER-F21-F30.md:279` + `REFABLE-RU-13-F21-F30.md:143`; R4 addendum (`:151-157`). The R3 fixlog and ring files are logs — corrected forward only, per the finding's own instruction |
| R3A-5 | MINOR | F08 summary row cites "under C-G/C-H" unpinned across the colliding JUDGE/SUPERFLUITY C-label vocabularies | **CURED** | Evidence re-proven: JUDGE-C-G (the F08 binding) at `JUDGE.md:94`; SUPERFLUITY-C-G (the F23 dispute) at `:668-672`; C-H at `:674+`. Row now reads "under JUDGE C-G (`JUDGE.md:94`) / SUPERFLUITY C-H (`SUPERFLUITY.md:674-681`)" (`DOSSIER-F01-F10.md:435`), complying with the docket label note; mirrored in the F01-F10 R4 addendum |
| CRIT3B-2 | MINOR | F37 TARGET pins `HandMark.vue:291`/`:292` for `pathLength`/`vector-effect` — off by one | **CURED** | Evidence re-proven: `pathLength="1"` at `HandMark.vue:290`, `vector-effect="non-scaling-stroke"` at `:291` (file unchanged since `55f5170d`). Re-pinned at `DOSSIER-F31-F40.md:397-399`; the sidecar F37 row carries no line pins for the pair (verified — no edit owed there); R4 addendum in `REFABLE-RU-13-F31-F40.md:122-129` |
| CRIT3B-3 | MINOR | A13's `presets.ts:73-77` cite resolves to the wrong file in context (the same row pins the demo roster at `:685-703`) | **CURED** | Same evidence as R3A-3. Full-pathed to `src/components/aurora/constants/presets.ts:73-78` at `DOSSIER-A01-A17.md:323-324`; recorded in the A01-A17 R4 addendum |
| CRIT3B-4 | MINOR | A14/N2/FLIP-2's "owned by NO wave (zero hits in `waves/`)" falsified in flight by the uncommitted `BAND-DOC-TRUTH.md:133-134` routing | **CURED (in-flight rider — not a CONSUMED stamp)** | The critique's cure was conditioned on the RU-03 commit, which has NOT happened (re-proven: `BAND-DOC-TRUTH.md` still uncommitted `M`). But the same working-tree-operative reasoning the ring accepted for R3A-1 applies: the grep-zero claim is already false on the tree a lead would read. Landed a dated RU-14 R4 rider in the dossier A14 NEW-FINDING paragraph (`DOSSIER-A01-A17.md:358-364`: routing quoted, UNCOMMITTED status, routed-but-not-yet-CHARTERED — `BAND-REDUCTION.md` PROCEDURAL-SUITE grep = 0 re-run this seat, residue = the W3 charter line + commit survival) + the sidecar R4 addendum (`REFABLE-RU-13-A01-A17.md:154-160`). FLIP-2 itself NOT stamped CONSUMED — that stamp waits on the commit, exactly as the finding orders |
| CRIT3B-5 | MINOR | The A09 R3 rider's "grep-zero in PLAN and all nine bands" rots on the T40 commit | **CURED (same vehicle as CRIT3B-4)** | Re-proven: `grep -rn "DECIDED-rows" waves/` now hits `BAND-DOC-TRUTH.md:121` (T40, uncommitted) — the bare grep-zero is already false on the working tree. Rider softened to the charter-sense formulation the finding prescribes ("no band CHARTERS the wave — … row T40 … tracks the `:5` phrase itself, deferring its disposition to FLIP-1"), with the uncommitted status named (`DOSSIER-A01-A17.md:235-238`). The sidecar §FLIPS formulation ("all nine band files carry NO such wave") already used the charter sense and stands unedited (`REFABLE-RU-13-A01-A17.md:94-96`); recorded in the R4 addendum (`:161-168`) |

**Refutations: ZERO.** Every finding's evidence re-proved exact on disk this seat — including
the two greps the critiques flagged as falsified-in-flight (both still uncommitted, both
re-confirmed) and the three counts (108 breath / 234 filtered / 14-11 arbitrary).

## Dispositions beyond the cures

- **CRIT3B-4/CRIT3B-5 residual (DEFER-with-owner):** the terminal CONSUMED stamp on FLIP-2 and
  the final form of the A09 rider land when the RU-03 `BAND-DOC-TRUTH.md` edit COMMITS; owner =
  whichever seat commits the RU-03 union (the in-flight riders landed this round make the
  closure non-silent either way, and both texts are already true in both commit states).
- **R3A-1 residual (DEFER-with-owner):** "confirm T33 survives the RU-03 commit" — same owner,
  recorded in row 7's state cell and both sidecar addenda.
- The R3 fixlog's stale `:683-687` and the ring files' repetitions of the wrong HandMark pins
  are LOGS — left as written per the standing corrected-forward convention (R3A-4's own cure
  text).

## Corpus state after R4

| artifact | R4 findings | state |
|---|---|---|
| DOSSIER-F01-F10 (+ sidecar) | 2 MINOR (R3A-3, R3A-5) | both CURED |
| DOSSIER-F11-F20 (+ sidecar) | 2 MAJOR (R3A-1, R3A-2) | both CURED |
| DOSSIER-F21-F30 (+ sidecar) | 1 MINOR (R3A-4) | CURED |
| DOSSIER-F31-F40 (+ sidecar) | 1 MINOR (CRIT3B-2) | CURED |
| DOSSIER-F41-F50 (+ sidecar) | 0 | CLEAN (second consecutive clean at CRIT3-B) — untouched |
| DOSSIER-A01-A17 (+ sidecar) | 1 MAJOR + 3 MINOR (CRIT3B-1/3/4/5) | all CURED |

*End — RU-14 R4 fix seat. Files touched: the five affected dossiers, their five sidecars, this
fixlog. No commit; no edits outside the fence.*
