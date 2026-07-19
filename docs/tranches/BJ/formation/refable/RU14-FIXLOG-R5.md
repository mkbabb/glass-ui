# RU-14 FIXLOG — ring round 5 fix seat

- **modelId:** `claude-fable-5` (verbatim from this seat's system context).
- **Charge:** cure every outstanding finding in `RU14-CRIT4-A.md` + `RU14-CRIT4-B.md`
  (majors AND minors); refute with pinned evidence where a finding is wrong; no silent drops.
- **Verification base:** HEAD `7aec864d` (master). The corpus and the nine-band layer are
  byte-identical to the CRIT4 seats' base `66294838` (`git diff --stat 66294838..HEAD --
  docs/tranches/BJ/waves/ docs/tranches/BJ/formation/redress/
  docs/tranches/BJ/formation/refable/REFABLE-RU-13-*
  docs/tranches/BJ/formation/refable/LEAD-AMENDMENT-LEDGER.md` = EMPTY; the two intervening
  commits are IOS27-MICRO + ring journaling). `src/`+`demo/` parity holds (`git diff --stat
  55f5170d..HEAD -- src/ demo/` = EMPTY). Every load-bearing evidence pin in both CRIT files
  was re-proven on disk this seat before its cure was applied (~45 direct re-reads: the
  BAND-REDUCTION/FM/MATERIAL/GATES/DOC-TRUTH/COLOCATION/STORY/PERF anchors, the four ledger
  rows A2/B1/B2/C3/C5/D1/E1/E2/H2, `REGISTRY.md:175/:236-238`, `PLAN.md:195`,
  `crosswalk:227-229`, `search.vue:504`, the count-greps "F04 shape"=0 / "F45 joins"=0 /
  value-mark=9, commit `1340a918` extant). **Zero findings refuted — both CRIT4 seats' claims
  all re-proved true at HEAD.**
- **Write fence honored:** edits land ONLY in the six `redress/DOSSIER-*.md`, the six
  `refable/REFABLE-RU-13-*.md` sidecars, and this fixlog. The named residues living in
  lead-owned files (PLAN/crosswalk/ASK/JUDGE/APPLYLOG/ledger/bands) are recorded as
  DEFER-with-owner, per the fence.

## Per-finding rows

| id | severity | summary | verdict | edit / evidence (file:line pins at post-fix state) |
|----|----------|---------|---------|-----------------------------------------------------|
| R4A-1 | MAJOR | JUDGE-2 docket bills ten live items; the committed union `1340a918` consumed five | **CURED** | `DOSSIER-F11-F20.md` docket preamble rewritten (the fourth union = the COMMITTED RU-03/04 nine-band union; the J12+ ask recounted: RULE rows 1/3/6/10 + the row-2/row-9 residues, RATIFY-AND-CLOSE the consumed rows per ledger C5); rows 2/4/5/7/8/9 state cells re-stamped SPLIT-CONSUMED / CONSUMED / CONSUMED / residue-discharged / CONSUMED / HALF-CONSUMED with committed pins (`BAND-REDUCTION.md:237` + "F04 shape" grep 0; `BAND-FEEDBACK-MOTION.md:134/:158-162`; `BAND-MATERIAL.md:29/:135/:503-510/:793/:822-824`; `BAND-FEEDBACK-MOTION.md:241/:250-251/:260-261` + `BAND-REDUCTION.md:638-648`). `DOSSIER-F01-F10.md` §JUDGE-2: D2-4 stamped CONSUMED-BY-UNION, D2-3 marked LIVE, preamble updated. `DOSSIER-F21-F30.md` §JUDGE-2: D2-5 + D2-F23 stamped CONSUMED, D2-6 LIVE; Δ-F24-1 carries the APPLIED-BY-UNION bracket. Sidecar mirrors: R5 addenda in all three F-range sidecars + bracket stamps on the F01-F10 "FLIP-1/FLIP-2 remain OPEN"/"still label" lines and the F21-F30 "remain OPEN" line. Rows 1/3/6/10 re-verified genuinely live this seat (F13 grep 0 in JUDGE+APPLYLOG; GF-DOCK rail.vue grep 0; `overflow.css:65-66` comment stands; crosswalk RU-06 grep 0) |
| R4A-2 | MAJOR | FLIP F-3 (251→234) framed as open routing while the union executed it | **CURED** | `REFABLE-RU-13-F11-F20.md` FLIP F-3 heading carries the CONSUMED-BY-UNION stamp (cites `BAND-GATES.md:376-379` naming the flip, `BAND-MATERIAL.md:666`, REGISTRY B2 re-stamp `5f8ee2e3`) + the REGISTRY "unfiltered" phrasing divergence carried as a lead note (251 = the 218+19+9 decomposition summing 246; unfiltered grep = 257 lines/260 occurrences); `DOSSIER-F11-F20.md` F15 parenthetical rewritten to the executed 234-figure state. Counts reproduced this seat: filtered `text-(sm\|xs)` = 234 per the band's stated method |
| R4A-3 | MAJOR | F23 COVERAGE DOWNGRADE's terminal conditions met on disk; dossier still directs a re-open | **CURED** | `DOSSIER-F21-F30.md` DOWNGRADE paragraph converted to CONSUMED-BY-UNION — EXACT-pending-J12-ratification (pins `BAND-MATERIAL.md:55/:474/:488-490/:503-510/:793`; value-mark grep = 9); summary-row coverage cell PARTIAL → EXACT-pending-ratification; D2-F23 folded into the consumed row-8 stamp; `REFABLE-RU-13-F21-F30.md` RU-14-addendum bracketed + R5 addendum |
| R4A-4 | MAJOR | F16 REDRESS binds five variants; the chartered scope is SIX (RU-12 A2-as-CHANGED) | **CURED** | `DOSSIER-F11-F20.md` F16 REDRESS re-scoped to ALL SIX with the enumeration + `ContinuousMarkers.vue` named; re-pinned `:508` (STUB → shape FILLED) + `:517-518`; the dead `:527` pin struck. Sidecar F16 row corrected ("A2 scope — R5: A2-as-CHANGED binds ALL SIX") |
| R4A-5 | MINOR | Row-7/T33 "UNCOMMITTED" clauses false at HEAD; pre-registered residue dischargeable | **CURED** | All five sites discharged with the `1340a918` pin (T33 survived, re-proven at `BAND-DOC-TRUTH.md:94`): dossier row-7 state cell, F16 body `:223-225`, open-items line, sidecar "Riding with it" text, sidecar R4-addendum (past-tensed "UNCOMMITTED at R4") |
| R4A-6 | MINOR | The nine-band rewrite moved essentially every BAND-*/FSF line pin in F01-F30 | **CURED** | "RU-14 R5 re-anchor sweep" sections appended to `DOSSIER-F11-F20.md` (F11-F16/F19/F20 pins) + `DOSSIER-F21-F30.md` (F21/F22/F23/F26/F28/F29); `DOSSIER-F01-F10.md` F03 FSF cite re-anchored in place to §8 finding 10 `:550-554` (G-COPY-2's anchor-by-section rule cited) and the F01 G-PRV roster corrected 1..4 → 1..5 (`BAND-STORY.md:462`); sidecar R5 addenda record the sweeps. Sample pins re-verified on disk this seat (STORY `:321/:323/:459/:461/:462/:527-529`, MATERIAL `:175/:203/:301/:336/:590-594`, FM `:82/:102/:119/:141/:165`, REDUCTION `:76-77/:287-290`, FSF `:398/:550-554`); the CRIT seat's parenthetical "(`:242` is now '### KISS / parsimony')" is imprecise (`BAND-STORY:242` is blank/"**Out:**" territory) but immaterial — the cure re-anchors to `:323`, which re-proved exact |
| R4A-7 | MINOR | F28 "falls when W2 runs" residue — the union already struck the sentence | **CURED** | `DOSSIER-F21-F30.md` F28 REDRESS + Δ-F28-1 residue line converted to DISCHARGED-BY-UNION (`BAND-MATERIAL.md:270` strike re-proven verbatim; fork-closed `:788`); sidecar near-flip note bracketed |
| R4A-8 | MINOR | Dossier F20 label `OPEN-FM-1` collides with the band's OPEN-FM-1 (W2 loop scope) | **CURED** | `DOSSIER-F11-F20.md` F20 REDRESS renamed to band `OPEN-FM-3a` (`BAND-FEEDBACK-MOTION.md:66` "the dossier's F20 ruling" re-proven; `:318` = the band's OPEN-FM-1) per ledger C3; the FM W1 gate cite re-pinned `:41-47` → `:82`; sidecar R5 addendum notes the row-33/LIVE-DEFER cells read through the rename |
| R4A-9 | MINOR | `search.vue:503` off by one at two sites | **CURED** | `:503` → `:504` at `DOSSIER-F11-F20.md` STATUS line + `REFABLE-RU-13-F11-F20.md` boundary moment; grep re-run this seat: `variant="floating"` at `demo/stories/data/search.vue:504` |
| CRIT4B2-1 | MAJOR | F33 "owned by NO wave" + the row-9 widening ask — already EXECUTED by the union | **CURED** | `DOSSIER-F31-F40.md` REDRESS re-pinned (W6 `:241`, docket self-cite `:250-251`, route `/navigation/carousel` per FM `:278`); coverage paragraph rewritten PARTIAL → EXACT-at-ownership with W8 `BJ.W-REDUCE-GOO-ENGINE` cut ownership (`BAND-REDUCTION.md:638-648`; FM `:260-261`; APOTHEOSIS MECH-04/D-05) and the E2 residue named; summary row + totals updated; sidecar consequence-mirror bracketed + R5 addendum. Coordinated with ledger C5/H2 (annotate, never re-open) |
| CRIT4B2-2 | MAJOR | F45 dead verbatim quote (BAND-MATERIAL:111-115) + the F17-flipped class drift | **CURED** | `DOSSIER-F41-F50.md` F45 REDRESS re-quoted in the unioned form (`BAND-MATERIAL.md:146-149` "F12 + F45 + F48-rounding — REGRESSION-GUARDS (J5 class, re-proven)") with the F17-flipped-born-RED carry (`:135/:52/:160`; `JUDGE.md:38` distinction stated); F48 REDRESS re-pinned (role row `:94`, W2 `:212+`, W3 `:340+` with OPEN-2a/2b/2c `:333-335` + OPEN-3a `:458`); Δ-F45-1 consumed-delta record re-quoted + the `:37-48`/`:47-49` two-grains note; sidecar F45 row bracketed + the full R5 re-anchor addendum ("F45 joins" grep 0 re-proven). No verdict movement — F45/F48 ownership + guard posture intact; the two-consecutive-clean standing re-based by the addendum |
| CRIT4B2-3 | MAJOR | A14/FLIP-2 "owned by NO wave / routed-but-not-CHARTERED / UNCOMMITTED" — every leg false at HEAD | **CURED** | `DOSSIER-A01-A17.md` A14 NEW-FINDING rewritten RESOLVED-BY-UNION (routing committed `BAND-DOC-TRUTH.md:133-134`; chartered `BAND-REDUCTION.md:279` + `:738`, both re-proven verbatim; `PROCEDURAL-SUITE.md:11/:57-59` live; the seven-targets frame retired via the SWEEP-NOW/TRIGGERED rosters `:48`/`:112`); summary row `:465` → OWNED (REDUCTION W3); sidecar FLIP-2 stamped CONSUMED-BY-RU-03 + N2 row bracketed + the R4-addendum residue marked FIRED-and-DISCHARGED |
| CRIT4B2-4 | MAJOR | A07's W2 "preconditioned on the family-B census" — recast by the union as unsatisfiable | **CURED** | `DOSSIER-A01-A17.md` A07 REDRESS carries the recast rider (`BAND-COLOCATION.md:260/:284-288/:326` — G-CONSUMER-ADDENDUM recast, census = CONTRACT RECORD "no longer a clearance bar"; ledger A2 APPLIED `dda87dcc`; the wait-forever trap named); summary row annotated; EXACT retained on the re-proven move-targets (`:38-39/:91/:102`); sidecar R5 addendum mirrors |
| CRIT4B2-5 | MINOR | A01/A11 owner stated unconditionally; the committed band gates W5 on OPEN-FM-3 | **CURED** | `DOSSIER-A01-A17.md` A01 redress bullet + A11 REDRESS + verdict annotated OWNED-AT-W5-GATED (OPEN-FM-3) with `BAND-FEEDBACK-MOTION.md:40/:53/:189` + ledger E1 PENDING; summary rows A01/A11 updated; sidecar rows 39/48 carry the R5 gate note. No re-verdict — ownership/J1/charter content survive |
| CRIT4B2-6 | MINOR | "UNCOMMITTED" riders stale + all five `REGISTRY.md:174` pins off by one | **CURED** | Dossier + sidecar `REGISTRY.md:174` → `:175` (sed, 5 sites; the B1 re-stamp `5f8ee2e3` shift noted in the R5 addendum; `:175` re-proven = the family-I charter line); the A09 R3-rider rewritten to the committed state (T40 survives verbatim at `BAND-DOC-TRUTH.md:121`, re-proven; `DECIDED-rows` grep across `waves/` = the one T40 hit); sidecar R4-addendum riders bracketed with the committed state; FLIP-1 confirmed still LIVE |
| CRIT4B2-7 | MINOR | Dozens of `waves/` pins + two structural rosters in F31-F50/A01-A17 predate the union | **CURED** | One dated "re-pinned to the `1340a918` union" addendum per sidecar, three files as prescribed: `REFABLE-RU-13-F31-F40.md` (F31/F32/F38/F40-F43 pin table + the W9 scroll-reveal partial consumption of N6 + the A17 PERF-pin survival), `REFABLE-RU-13-F41-F50.md` (the five BAND-MATERIAL re-pins + F41 `:633` no-wrap-now-canon + F46 `:410-465`/G-PRV `:459/:461`), `REFABLE-RU-13-A01-A17.md` (A05 nine-wave / A06 seven-wave rosters, A10 `:567-594`, A14 `:672-673`, N6 `:679`). No ownership moved beyond CRIT4B2-1..4's itemized cures — none re-verdicted |

## Dispositions (residues named, owners assigned — outside this seat's write fence)

- Docket row-2 residue → LEAD (J12+): `PLAN.md:195` + `crosswalk:227-229` still carry the false
  "F12/F17 already role-correct" premise (re-proven this seat); the dossier/sidecar layer now
  states it as the SPLIT-CONSUMED residue.
- Docket row-9 residue → LEAD (ledger E2, PENDING): the ASK §C1/§C3 recommendation-text refresh
  (`ASK-REDUCTION.md` untouched since `4ab12128`).
- The formal ratify-and-close of consumed docket rows 4/5/7/8/9 + D2-4 + D2-F23 → LEAD (ledger
  C5 vehicle; the corpus now instructs ratify-only, never re-apply).
- REGISTRY "the 251 was the unfiltered figure" phrasing divergence → LEAD note (carried in the
  FLIP F-3 stamp; not re-litigated, per the CRIT4-A cure spec).
- Refutations: **none** — all 16 findings verified true at HEAD before cure.

## Disposition summary

**16 findings (8 MAJOR + 8 MINOR): 16 CURED, 0 REFUTED, 0 silently dropped.** Four lead-side
residues recorded as DEFER-with-owner above (all pre-named by the CRIT seats and the ledger).
Files touched: the six `redress/DOSSIER-*.md` + the six `refable/REFABLE-RU-13-*.md` + this
fixlog. No `src/`/`demo/`/`waves/`/lead-file edits, no commit.

*End — RU-14 R5 fix seat. The ring re-critiques from here.*
