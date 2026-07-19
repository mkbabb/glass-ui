# RU-14 FIXLOG — ring round 6 fix seat (2026-07-19)

- **Seat:** RU-14 ring round 6 FIX. **modelId:** `claude-fable-5` (verbatim from this seat's
  system context).
- **Inputs:** `RU14-CRIT5-A.md` (R5A-1..R5A-7) + `RU14-CRIT5-B.md` (CRIT5B-1..CRIT5B-5) — 12
  findings total: 4 MAJOR (R5A-1, R5A-2, CRIT5B-1, CRIT5B-2), 8 MINOR. Every finding
  re-verified against the repo before cure; none refuted — 12/12 CONFIRMED, 12/12 CURED.
- **Verification base:** HEAD `4daf5c02` (master), worktree clean under the corpus. The R5
  corpus edits the CRIT5 seats judged as working-tree-only are now COMMITTED (the
  `7aec864d..HEAD` docs diff is exactly the six dossiers + six sidecars + CRIT5 pair + R5
  fixlog). The nine-band `waves/` layer is byte-identical to the CRIT5 base
  (`git diff --stat 7aec864d..HEAD -- docs/tranches/BJ/waves/` = EMPTY) and `src/`+`demo/`
  parity holds (same diff = EMPTY) — every pin below was re-proven against the same bytes the
  critics saw.
- **Write fence honored:** DOSSIER-*.md + REFABLE-RU-13-*.md + this fixlog only. Two cures
  asked for corrections to `RU14-FIXLOG-R5.md` (the R4A-6 CURED-incomplete row; the false
  "re-proven verbatim" certification) — that file is OUTSIDE this seat's fence, so both
  corrections are recorded here (rows R5A-1 and CRIT5B-1) instead of edited there.

## Rows

| finding | severity | verdict | cure landed / evidence | pins |
|---|---|---|---|---|
| **R5A-1** — F29's AMEND-D-2 cite dead (`FSF:274-280` is AMEND-D-9 prose; AMEND-D-2 at `:398`); the R5 fixlog billed R4A-6 CURED while this CRIT4-A-itemized re-anchor never landed | MAJOR | **CURED** | Verified: `FABLE-STORY-FRAMEWORK.md:274-280` ends "(AMEND-D-9.)"; the AMEND-D-2 block heads at `:398`. F29 body re-anchored to `:398` with the R6 annotation; the R5 sweep's F29 row extended with the FSF re-anchor. **Fixlog correction recorded here (R5 fixlog outside fence): R4A-6 was CURED-less-one — the itemized F29 FSF pin was missed; completion landed this round.** | `DOSSIER-F21-F30.md:490-493` (body), `:626-628` (sweep row); sidecar `REFABLE-RU-13-F21-F30.md:190+` (R6 addendum); evidence `FABLE-STORY-FRAMEWORK.md:398`, `:270-280` |
| **R5A-2** — F10 REDRESS carries the stale "251-site codemod"; the band's standing figure is 234 (+9 arbitraries); F01-F10 contained zero mention of 234 | MAJOR | **CURED** | Verified: `BAND-GATES.md:376-381` ("THE FIGURE … 234 sites = 218 demo + 16 src … the previously standing 251 figure is STALE") + `BAND-MATERIAL.md:665-666`. F10 clause rewritten to "the 234-site (+9 arbitrary) codemod … per FLIP F-3's consumption" with both pins; sidecar R6 addendum notes the correction | `DOSSIER-F01-F10.md:426-429`; sidecar `REFABLE-RU-13-F01-F10.md:198+`; evidence `BAND-GATES.md:376-379`, `BAND-MATERIAL.md:665-666` |
| **CRIT5B-1** — the A14 "verbatim" quote of `BAND-REDUCTION.md:279` is fabricated ("mechanical bundle" — the CRIT4-B paraphrase propagated by the R5 seat under a "re-proven verbatim" certification) | MAJOR | **CURED** | Verified: on-disk `BAND-REDUCTION.md:278-280` reads "truth-up joins THIS wave's **delete scope** — the retained-suite doc must not list a deleted member"; "mechanical bundle" greps zero in `waves/`. Quote re-taken verbatim at BOTH sites, pin widened `:279` → `:279-280` (the quote spans the wrap), each site annotated with the paraphrase provenance. **The false R5 "re-proven verbatim" certification (`RU14-FIXLOG-R5.md:39`) is hereby recorded as impeached for this one pin — the R5 fixlog is outside this seat's fence, so the record lives here and in the A-sidecar R6 addendum.** Substantive CONSUMED-BY-RU-03 stamp untouched (it was never in doubt) | `DOSSIER-A01-A17.md:376-381`; `REFABLE-RU-13-A01-A17.md:103-107` (FLIP-2 bracket), `:212+` (R6 addendum); evidence `BAND-REDUCTION.md:278-280` |
| **CRIT5B-2** — the RU-09 C-F census stated as settled ground ("useStagger … all zero-caller") though the committed union OVERTURNS the useStagger leg (speedtest live-imports ×2, RESOLVED KEEP); the §C3-refresh directives pointed at the RU-09 verdicts raw | MAJOR | **CURED** | Verified: `BAND-REDUCTION.md:299-304` ("useStagger — RESOLVED KEEP … RU-09 R6's DELETE-useStagger leg is OVERTURNED … A9 escape clause fires"), `:52-54` (the consumer-truth lesson names this exact error), `:88-93` (§C3 re-issues "with the corrected censuses"). Dated R6 riders at all four charged sites: the F32 post-JUDGE rider + F32 summary row (F31-F40), the F42 REDRESS (F41-F50), both sidecar mirrors; the zero-caller roster shrunk to useStaggerReveal/useBloomUp/useTextHighlight everywhere; the §C3-refresh directives re-pointed to the union-corrected census (ledger E2 vehicle). No ownership/coverage movement — §C3 stays owner, W9 stays §C3-gated | `DOSSIER-F31-F40.md:160-172` (rider), `:589` (summary row); `DOSSIER-F41-F50.md:117-128`; `REFABLE-RU-13-F31-F40.md:116-120`, `:170+`; `REFABLE-RU-13-F41-F50.md:97-100`, `:133+`; evidence `BAND-REDUCTION.md:299-304`, `:52-54`, `:88-93` |
| R5A-3 — F17's FLIP-recorded premise pins dead (`BAND-MATERIAL:117-119` now SQUIRCLE-GATE; `:698-700` now W6 codemod prose; `PLAN.md:187` vs `:195` cited simultaneously); no F17 row in the R5 sweep | MINOR | **CURED** | Verified: `BAND-MATERIAL.md:117-119` = the `proof:squircle-language` item; `:696-700` = W6 codemod prose; `PLAN.md:187` = the ceded above-fold edit, `:195-196` = the premise; applied state at `BAND-MATERIAL.md:822-824` + `:135`. F17 row added to the R5/R6 sweep with all re-anchors; the dossier's FLIP-recorded sentence and the sidecar FLIP F-1 pin list bracketed with the docket-row-2 SPLIT-CONSUMED read-through. No verdict movement | `DOSSIER-F11-F20.md:500-507` (sweep row), `:303-306` (body bracket); `REFABLE-RU-13-F11-F20.md:44-48` (FLIP F-1 bracket), `:192+` (R6 addendum) |
| R5A-4 — the F04 mislabel asserted in live present tense at two body sites though the union relabeled the probe (D2-4 CONSUMED) | MINOR | **CURED** | Verified: `grep "F04 shape" BAND-REDUCTION.md` = 0; `G-CARD-DEFAULT-PAINT` at `:237`. Dossier bullet past-tensed ("mislabeled … WAS wrong") + R6 consumption bracket; sidecar §FLIPS FLIP-2 paragraph headed with a CONSUMED bracket ("historical text below") | `DOSSIER-F01-F10.md:193-198`; `REFABLE-RU-13-F01-F10.md:79-83` |
| R5A-5 — three REGISTRY spans drifted after the B1/B2 re-stamps (`:322-326`/`:291-294`/`:295-297` no longer carry the claimed content) | MINOR | **CURED** | Verified at HEAD: F02-CLEARED = `REGISTRY.md:293-296`, F06 white-flash = `:297-299`, idle-rAF ~40k RunTasks = `:327-329` (`:322-326` is the cold-LCP paragraph). All three re-pinned in the dossier AND the sidecar mirror rows (six sites) | `DOSSIER-F01-F10.md:51`, `:93`, `:260`; `REFABLE-RU-13-F01-F10.md:38`, `:39`, `:42` |
| R5A-6 — "per ledger C5" cited for rows C5 does not enumerate (C5 on disk = docket rows 5+9 only) | MINOR | **CURED** | Verified: `LEAD-AMENDMENT-LEDGER.md:35` enumerates "docket rows 5 … + 9" only. All charged sites re-worded to the posture/vehicle form with the enumeration disclosed and the remaining stamps named lead-owed: the F11-F20 docket preamble + row-4/row-8 cells, the F01-F10 D2-4 close, the F21-F30 row-8 paragraph + F23 summary cell. The row-5 cites (D2-5) left untouched — row 5 IS enumerated | `DOSSIER-F11-F20.md:459-462`, `:474`, `:478`; `DOSSIER-F01-F10.md:470-472`; `DOSSIER-F21-F30.md:190-192`, `:542`; evidence `LEAD-AMENDMENT-LEDGER.md:35` |
| R5A-7a — the F09 clause imports the stale F17 posture ("alongside F12/F17/F45") | MINOR | **CURED** | Verified: the band's applied J5 class = F12 + F45 + F48-rounding with F17 flipped OUT (`BAND-MATERIAL.md:135`, `:146-149`); `JUDGE.md:38` still reads F09/F12/F17 (kept valid as a ruling quote). Clause rewritten: "alongside F12/F45 — the ruling's original list also named F17, but the union flipped F17 OUT to a BORN-RED FIX" | `DOSSIER-F01-F10.md:387-390`; evidence `BAND-MATERIAL.md:135` |
| R5A-7b — the F15 sweep entry says "moved" with no destination | MINOR | **CURED** | Verified: the §D F15 row at `BAND-MATERIAL.md:131` and the born-RED at `:170` ("F15 reset RED at HEAD… GREEN on the library `<Button>` swap"). Entry completed with both destinations | `DOSSIER-F11-F20.md:494-497`; evidence `BAND-MATERIAL.md:131`, `:170` |
| CRIT5B-3 — the F47 GF-DOCK "quote" is a paraphrase in quotation marks ("recentre" appears nowhere in the file) | MINOR | **CURED** | Verified: the on-disk G-REACH RED (`GF-DOCK-PASS3.md:369-372`) reads "`BottomDock` routes through `goTo()` with no recenter (F47b); recenter-on-select only exists in `useSelectionGroup` rails". Sentence re-taken verbatim with the pin added | `DOSSIER-F41-F50.md:398-401`; evidence `GF-DOCK-PASS3.md:369-372` |
| CRIT5B-4 — the F41 copy-canon cite pinned `FABLE:257-258` for content spanning `:256-259` | MINOR | **CURED** | Verified: the head words at `FSF:256`, "Fix: a neutral demo string" closing at `:259`. Re-pinned `:256-259` in the dossier; the sidecar F41 cell's mirrored ":257-258" also corrected (same off-by-one, same cure class) | `DOSSIER-F41-F50.md:68`; `REFABLE-RU-13-F41-F50.md:32`; evidence `FABLE-STORY-FRAMEWORK.md:255-260` |
| CRIT5B-5 — the F36/F37/F38 sidecar basis cells verify against the pre-RU-06 GF-HM charter un-bracketed; `GF-HM:377-386` is beyond the 265-line rewrite; the dossier F38 body carries the same dead pin | MINOR | **CURED** | Verified: `GF-HANDMARK-PASS3.md` = 265 lines; the user ruling at `:16-17`; the wave map W0-W5 at `:207-212` (W2 THE-SURFACE / W3 THE-CHOREOGRAPHY / W5 CONSUMER+FINAL). Read-through bracket added above the Per-row verdicts table (covers the three cells + defuses the R5 "byte-stable" endorsement read); the dossier's F38 body pin re-anchored `:377-386` → `:16-17` | `REFABLE-RU-13-F31-F40.md:20-26`; `DOSSIER-F31-F40.md:478-479`; evidence `GF-HANDMARK-PASS3.md` (265 lines), `:16-17`, `:207-212` |

## Dispositions beyond the rows

- **Zero refutations.** Every CRIT5 finding re-proved true on disk at `4daf5c02` before its cure
  was applied; no finding was wrong, none deferred.
- **Two out-of-fence corrections recorded here** (both owed to `RU14-FIXLOG-R5.md`, which this
  seat may not edit): (1) R4A-6 was CURED-incomplete — the F29 FSF re-anchor completion landed
  this round (row R5A-1); (2) the CRIT4B2-3 "both re-proven verbatim" certification was FALSE
  for the `BAND-REDUCTION.md:279` quote (row CRIT5B-1).
- **Not touched (correctly out of scope):** `JUDGE.md:38`'s original F09/F12/F17 text (a ruling
  quote — stays); the ledger C5 row itself (widening C5 is the lead's call; the corpus now cites
  it precisely instead); `ASK-REDUCTION.md` §C1/§C3 texts (ledger E2, lead-owed); the
  `PLAN.md:195` + `crosswalk:227-229` false-premise residue (docket row 2 residue, J12+);
  `RU14-CRIT5-A/B.md` (ring history, immutable).

## Sidecar mirrors

Six "RU-14 R6 addendum (2026-07-19)" blocks landed: `REFABLE-RU-13-F01-F10.md:198+`,
`REFABLE-RU-13-F11-F20.md:192+`, `REFABLE-RU-13-F21-F30.md:190+`, `REFABLE-RU-13-F31-F40.md:170+`,
`REFABLE-RU-13-F41-F50.md:133+`, `REFABLE-RU-13-A01-A17.md:212+`.

**Tally: 4/4 MAJOR CURED · 8/8 MINOR CURED · 0 REFUTED · 0 DEFERRED.** All 12 findings share the
cure species the CRIT5 seats predicted: quote fidelity, pin currency, and consumption tense
against the committed union — no ownership, coverage, or verdict moved anywhere. The corpus is
ready for a round-6 critique pass toward the two-consecutive-clean bar.

*End — RU-14 ring round 6 fix seat. Edits confined to the six dossiers, six sidecars, and this
fixlog; no `src/`/`demo/`/`waves/` edits, no commit.*
