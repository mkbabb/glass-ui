# FIXLOG-PASS1 — mechanical redress of the BJ dossiers per CRIT1-A + CRIT1-B

Mode: TRANCHE DEVELOPMENT. This log + the six dossiers under `formation/redress/` are the only
artifacts touched — no `src/`/`demo/` edits, no commit. One row per critic finding; every MINOR
applied in-place as the critic specifies; NOTEs applied only where they are a concrete correction
instruction, else skipped with a reason.

## CRIT1-A (F01–F30)

| # | finding (critic · item) | sev | action | dossier · section | one-line |
|---|--------------------------|-----|--------|-------------------|----------|
| 1 | CRIT1-A · F01 content-visibility anchor | MINOR | APPLIED | DOSSIER-F01-F10 · F01 TARGET | re-anchored the `content-visibility`/`contain-intrinsic-size` block `:37-45`→`:63-65`. |
| 2 | CRIT1-A · F04 rail.vue entries anchor + drifted claim | MINOR | APPLIED | DOSSIER-F01-F10 · F04 TARGET | `entries` `:29-39`→`:31-40`; scoped "matches exactly" to the sliced rendering (full eight-entry array does not match). |
| 3 | CRIT1-A · F05 postures anchors + D-F05 range | MINOR | APPLIED | DOSSIER-F01-F10 · F05 TARGET/REDRESS + D-F05 | re-anchored `:73/:78/:84/:88`→`:142/:147/:153/:157` and `:73-120`→`:142-189` (incl. inside D-F05 so it is appendable-as-written). |
| 4 | CRIT1-A · F10 sizing-config.css path | MINOR | APPLIED | DOSSIER-F01-F10 · F10 TARGET | re-filed `sizing-config.css:35` from `configurator/` to `src/styles/tokens/`; noted `configurator/styles.css:51` consumer. |
| 5 | CRIT1-A · F05 disagreement UNDERSOLD | NOTE | APPLIED | DOSSIER-F01-F10 · D-F05 | added the `GF-DOCK-PASS3.md:27` (charge C5) corroboration ("F05 is not dropped, it is split correctly") as strengthening evidence, per the critic directive "Add it to D-F05". |
| 6 | CRIT1-A · F13–F20 systematic ledger off-by-one | MINOR | APPLIED | DOSSIER-F11-F20 · F13–F20 INVENTORY | decremented all eight FEEDBACK-LEDGER anchors by one (F13 `:26`→`:25` … F20 `:33`→`:32`); verbatim quotes unchanged; verified vs disk (F13=line 25 … F20=line 32, F21=33 correct). |
| 7 | CRIT1-A · F11 BAND-STORY.md:552 mis-cite | MINOR | APPLIED | DOSSIER-F11-F20 · F11 REDRESS | dropped the false FSF quote at `:552`; re-anchored the cure to the G-CFG-3 owner at `../../waves/BAND-STORY.md:267`. |
| 8 | CRIT1-A · F19 alert anchors shifted | NOTE | APPLIED | DOSSIER-F11-F20 · F19 ISOLATION/TARGET | re-anchored BASE `index.ts:7`→`:8` and TONE `:9-18`→`:11-18` (concrete corrected anchors; substance disk-true). |
| 9 | CRIT1-A · F27 useDockOverflowFit partial-quote | MINOR | APPLIED | DOSSIER-F21-F30 · F27 TARGET + coverage | scoped the block-overflow measure to the `vertical` ternary branch; named `overflow.css` `overflow-y:visible` (+ recentre `block:'nearest'`) as the horizontal-host leak. |
| 10 | CRIT1-A · F24 keyframes anchor drift | NOTE | APPLIED | DOSSIER-F21-F30 · F24 TARGET | re-anchored `@keyframes skeleton-scan` `:51-57`→`:59-63` (block starts `:59`); `2.4s`@`:54` left dead-on. |

## CRIT1-B (F31–F50, A01–A17)

| # | finding (critic · item) | sev | action | dossier · section | one-line |
|---|--------------------------|-----|--------|-------------------|----------|
| 11 | CRIT1-B · F33 Δ-F33-1 option (b) mis-target | MINOR | APPLIED | DOSSIER-F31-F40 · Δ-F33-1 | dropped option (b) (`BI.W-ENGAGE-AFFORD` — a closed BI wave scoped to fine-value controls); option (a) `BJ.W-PAGER-DOT-MORPH` in BAND-FEEDBACK-MOTION is now the single proposal. |
| 12 | CRIT1-B · F35 retract-of-retract citation unread | NOTE | SKIPPED | — | pure observation: critic did not open `GF-HM:32-33`, flagged for completeness; no dossier change specified. |
| 13 | CRIT1-B · F33/F40 coverage-summary flavor | NOTE | SKIPPED | — | pure observation: "self-consistent convention, not a defect." |
| 14 | CRIT1-B · F45 STATUS OPEN-1a citation | MINOR | APPLIED | DOSSIER-F41-F50 · F45 REDRESS | corrected the OPEN-1a wiring — OPEN-1a is F09/F12/F17-only (`:135,165`); F45 is a `§D` bullet (`:110-115`) that Δ-F45-1 appends — aligning the status text with Δ-F45-1's own self-correction. |
| 15 | CRIT1-B · cross-dossier HEAD drift | NOTE | SKIPPED | — | observation ("cosmetic"): the three dossier headers legitimately record their differing authoring HEADs (the drift the critics rely on to explain anchor staleness); no single-edit directive, rewriting them would falsify the record. |
| 16 | CRIT1-B · F45 base-pill line drift | NOTE | SKIPPED | — | critic explicitly rules "Not a stale anchor" / within re-pin tolerance — a decline, not a correction. |
| 17 | CRIT1-B · A14 over-generous EXACT | MINOR | APPLIED | DOSSIER-A01-A17 · A14 (REDRESS/STATUS/coverage/tally) + new D-A14 | downgraded EXACT→PARTIAL for the un-dispositioned `paper-backdrop`; added mini-delta D-A14 routing it into the reduction ≥2-consumer census; retallied EXACT 12→11 / PARTIAL 4→5 / Deltas 5→6. |
| 18 | CRIT1-B · A11 severity framing (MISSING vs PARTIAL) | NOTE | SKIPPED | — | pure observation: "MISSING … is a defensible convention"; the D-A11 delta stands under either framing. |
| 19 | CRIT1-B · A02/A06/A08 unverified-by-me | NOTE | SKIPPED | — | critic completeness disclaimer (paths/claims not exhaustively disproven); no dossier change specified. |

## Counts

- APPLIED: 13 (10 MINOR + 3 NOTE — #5 F05-undersold, #8 F19 anchors, #10 F24 keyframes).
- SKIPPED: 6 (all NOTE — #12, #13, #15, #16, #18, #19).
- Total actionable findings itemized: 19 (10 MINOR + 9 NOTE).

## Reconciliation to the critics' summary tables (10 MINOR + 11 NOTE = 21)

MINOR reconciles exactly: 7 (CRIT1-A) + 3 (CRIT1-B) = 10, all applied.

NOTE: the summary tables declare 11 but the critique bodies enumerate only 9. The two-NOTE surplus is
un-itemized table bookkeeping — CRIT1-A's F01-F10 row lists 2 NOTE but the body enumerates 1 (the F05
UNDERSOLD note), and CRIT1-B's A01-A17 row lists 3 NOTE but the body enumerates 2 (A11 severity +
A02/A06/A08). No finding text exists for those two table entries, so there is nothing to apply or skip.
Thus 19 actionable findings + 2 un-itemized table entries = the 21 the tables declare.

*End — FIXLOG-PASS1. One log + six dossiers under `formation/redress/`; nothing else touched; no commit.*
