# STAB1 — stability critique, pass 1, COHERENCE lens (fresh Fable seat, wrote none of it)

Scope: the two capstones — `docs/tranches/BJ/PLAN.md` + `docs/tranches/BJ/ASK.md` — held against the
corpus they synthesize (the nine `waves/BAND-*.md`, `ASK-REDUCTION.md`, `formation/redress/{JUDGE,APPLYLOG}.md`,
`formation/superfluity/SUPERFLUITY.md`, `formation/ASSEMBLY-CROSSWALK.md`, the four `formation/greenfields/GF-*-PASS3.md`,
`formation/perfection/*`, `formation/REGISTRY.md`). Lens = COHERENCE only. I assumed faults and hunted them.
TRANCHE-DEVELOPMENT: this is the only file written; no source, no commits.

Method: read all 9 band files + both capstones + JUDGE/APPLYLOG/SUPERFLUITY/CROSSWALK/REGISTRY + all four
GF-PASS3 in full; verified EVERY ordering law in PLAN §1 against the band texts; spot-verified 14 ASK rows
against their cited sources; checked all 26 ASK roll-up lines against the body; verified ≥15 citations on disk.

---

## Verdicts

- **PLAN.md — AMEND(3)** — 2 MAJOR + 1 MINOR.
- **ASK.md — AMEND(1)** — 1 MINOR. (Internally clean: 26 rows numbered continuously, roll-up matches body,
  every recommendation carries a position, every §4 binding path names a real wave.)

Finding counts: **BLOCKER 0 · MAJOR 2 · MINOR 2 · NOTE 3.**

---

## What checked out (so the amends are not mistaken for a failed capstone)

- **All 11 PLAN §1 ordering laws are faithful to the band texts.** Family-A-first (GATES W1/W2); type-codemod
  = MATERIAL W6 flipping GATES W4, both in one cut (RULING 2 / OPEN-B); raw-literal repoints flip GATES W3
  (MATERIAL W1/W2 sites); Alert after Material W1/W2 (FEEDBACK-MOTION ordering line); TRACK-DRY naming
  independent of timeline (C-C, verified in JUDGE + BAND-MATERIAL W4); idle-breath compositor-only beside
  PERF W2 (J1, rAF-delta 0); DeckPager cut before/with PAGER-DOT-MORPH (J3, FM W6); graded-backdrop verdict
  gates GATES W1 kill (BAND-GATES ruling 7); PERF cedes above-fold to STORY W5 + PERF W4 owns F07 (lead seam
  ruling); greenfields inherit reduction cuts; cross-repo relays land before breaking waves. Each reproduces.
- **The sidebar-8.0.0 tension is stated correctly.** PLAN §0 + §2 (COLOCATION W2) put the `./sidebar`
  export-map break on **8.0.0 per the FABLE-COLOCATION perfection fold**, overriding the stale W2-body "ride
  7.0.0 if the window is open" lean. Governed and correct.
- **A08 per-wave challenge law is present and unambiguous** (PLAN §3: "every wave closes with a challenge
  pass run by two fresh critics … A08 adopted as a PLAN-level law per JUDGE.md J11") — traced JUDGE J11 →
  APPLYLOG DEFERRED-TO-PLAN → PLAN §3. Clean.
- **Live-π disciplines all stated where PLAN claims** (PLAN §3): no-getContext/context-steal, localhost-not-
  127.0.0.1, oklab per-band, pipe-trap (read pi-report not piped exit), seat-singleton. Match the memories.
- **Disposition counts match the crosswalk exactly** (PLAN §6 "50 LANDED / 5 DECIDED / 3 CLEARED / 10 ASK /
  0 ORPHAN / 0 pending" = ASSEMBLY-CROSSWALK reconciled tally). SUPERFLUITY "5 KEEP-DISTINCT / 4 COLLAPSE /
  2 MERGE-INTO" cited verbatim-correct. APPLYLOG accounts for all 26 rulings (11+7+2+6).
- **GF wave lists + convergence % match the PASS3 files**: DOCK 9 waves/62%, HANDMARK 8/68%, AURORA 8/58%
  (17→10 firm, terminal set {}), BLOB 10/60%. Every wave title reproduces.
- **All 26 ASK roll-up lines match their body sections**; ASK-14..17 = the 4 dock rows, ASK-18/19 = Q-HM-1/2,
  ASK-20 = aurora crayon, ASK-21/22 = blob, all confirmed against the GF-PASS3 §-anchors they cite.

---

## Findings

### MAJOR-1 — PLAN §6 says "10 ASK rows … the only ones reserved for the user … assembled in ASK.md"; ASK.md carries 26. (capstone-vs-capstone)

- **Claim (PLAN.md:315-316):** "The 10 ASK rows are the only ones reserved for the user — assembled in
  `ASK.md`, the sole document the user must rule on."
- **Disk truth:** `ASK.md` contains **26** numbered rows (ASK-1..ASK-26; `grep -c '^\*\*ASK-'` = 26,
  roll-up `grep -c '^| ASK-'` = 26). ASK.md's own roll-up calls itself "the entire user-reserved surface of
  BJ" = family-C purge + 4 greenfield identity calls + 2 material/story judgments. The "10" is only the
  feedback-ledger ASK subset (F18/F25/F26/F30/F32/F33/F42/F43/F44/F45, the crosswalk's "10 ASK"). The other
  16 rows (timeline ASK-7, greenfield ASK-14..22, dot-flow ASK-23, pixel-floor ASK-24, alert ASK-25,
  graded-backdrop ASK-26, DataTable/FourierField/Constellation/easing/WatercolorDot ASK-8..12) are equally
  user-reserved and equally in ASK.md.
- **Why it's a coherence fault:** PLAN §6 is the pointer a reader uses to size the user gate. It asserts the
  gate is 10 rows in ASK.md; the gate is 26. "The only ones reserved for the user" is false as written. PLAN
  never states the true 26 total anywhere.
- **Required fix:** reword PLAN §6 to "the 10 feedback-ledger ASK rows are carried into the 26-row unified
  `ASK.md`" (or drop "the only ones"). No content change to ASK.md.

### MAJOR-2 — HandMark terminal surface: BAND-REDUCTION says 19→~8 keeping appear/box/drawMs; PLAN + the greenfield say 19→~5 deleting them. (intra-corpus contradiction PLAN papered over)

- **Claim (PLAN.md:84 §1 ordering-law-10, and :232 §2 GF-HANDMARK):** "HandMark 19→~5 surface" /
  "SURFACE+DEMO-DE-JARGON (19→~5 props)".
- **Disk truth:** `waves/BAND-REDUCTION.md:156,159` states "HandMark — **19 → ~8**" with the explicit
  keep-list `brush, shape, color, seed, animation, **appear, box, drawMs**` (≈8) and "the family-G HandMark
  greenfield … **MUST land at this surface**." `GF-HANDMARK-PASS3.md` §8 + W6 delete **13**, keep **~5** —
  and the deleted 13 include exactly `appear`, `drawMs`, and the `box` shape (retired at §4/§7.2). So the two
  binding docs name the SAME props with opposite fates (BAND-REDUCTION keeps appear/box/drawMs; greenfield
  deletes them). PLAN silently adopts the greenfield's ~5 without reconciling the ~8.
- **Why it's a coherence fault:** an executor working from BAND-REDUCTION builds an 8-prop HandMark keeping
  box/appear/drawMs; one working from PLAN/greenfield builds a 5-prop HandMark deleting them. The greenfield
  is the later, delivery-owning doc and should govern, but BAND-REDUCTION's stated MUST-land target was never
  reconciled to it, and PLAN doesn't flag the supersession.
- **Required fix:** update BAND-REDUCTION.md:156-160 to the greenfield's ~5 keep-list (dropping appear/box/
  drawMs), or add a one-line PLAN/BAND-REDUCTION note that the greenfield's ~5 supersedes the ~8 target.

### MINOR-1 — ASK-7 (timeline) cites "ASK-REDUCTION.md (Wave 5 stub)"; ASK-REDUCTION.md has no timeline row and no Wave-5 stub. (ghost reference)

- **Claim (ASK.md:79, ASK-7 evidence):** "Evidence: `ASK-REDUCTION.md` (Wave 5 stub); `SUPERFLUITY.md` §4
  (F16); `BAND-REDUCTION.md` W5."
- **Disk truth:** `grep -ni 'timeline|wave 5|F16' ASK-REDUCTION.md` = **0 hits**. ASK-REDUCTION §C is C1
  deck / C2 confirm-dialog / C3 reveal-scroll / C4 tempo — no timeline. The "Wave 5 stub" lives in
  `BAND-REDUCTION.md` W5 (correctly also cited). ASK-7's real sources are SUPERFLUITY §4 (F16) + BAND-
  REDUCTION W5 (both cited and valid); the ASK-REDUCTION pointer is a ghost.
- **Required fix:** delete "`ASK-REDUCTION.md` (Wave 5 stub)" from ASK-7's evidence line (the other two
  citations already carry it).

### MINOR-2 — PLAN §0 cites REGISTRY.md:16-18 for "7.0.0 shipped with provenance"; those lines say the dating is authorized, not that it shipped with provenance. (imprecise citation)

- **Claim (PLAN.md:22-23 §0):** "7.0.0 shipped with provenance (`REGISTRY.md:16-18`)."
- **Disk truth:** `REGISTRY.md:16-18` reads: `chronic:green-over-red-release-dating` +
  `plan:premature-version-finalization` — **RETIRED (user order)** … "First, publish 7.0.0" resolved
  Decision-0 CUT-NOW … "The dating is authorized." It supports the version posture (dating authorized, no
  re-litigation) but says nothing about provenance or that the tag actually shipped — that fact is from the
  glassui-700-published memory, not these lines.
- **Required fix:** cite the provenance source separately, or reword to "the release-dating is authorized
  (`REGISTRY.md:16-18`)."

---

## Notes (corpus-hygiene; not counted against either capstone)

- **NOTE-1 — COLOCATION band body says 5 dead barrels; the binding fold + PLAN say 4.** `BAND-COLOCATION.md`
  Purge D + G-BARREL-REACH enumerate 5 barrels (incl. `glass/wave/index.ts`); the ADOPTED-BINDING
  FABLE-COLOCATION fold says "Purge D = exactly four barrels" (glass/wave DELETES with liquid-grid). PLAN §2
  correctly cites "four … per the FABLE-COLOCATION fold." No capstone fault — the band body is stale
  post-fold; an executor reading the un-updated Purge D list would purge one extra barrel.
- **NOTE-2 — ASSEMBLY-CROSSWALK "ASK-CONSOLIDATED, every user-ASK row deduplicated" lists ~23-24; ASK.md
  has 26.** The crosswalk's dedup predates final assembly and omits timeline (ASK-7), alert status-tint
  (ASK-25), and graded-backdrop (ASK-26). ASK.md is the more-complete capstone (no dropped decision); the
  crosswalk's "every user-ASK row" claim is stale relative to ASK.md.
- **NOTE-3 — ASK-14 (dock fission) carries no lean ("parked both ways — you rule").** Hunt item #4 flags
  "no 'you decide' without a position," but ASK-14 is the one genuinely USER-GATED row (Q051 r1); both PASS3
  and CHRONIC deliberately park it both ways. Governed and acceptable; recorded for completeness.

---

## Register (evidence anchors, one line each)

| # | sev | site | disk truth |
|---|-----|------|-----------|
| MAJOR-1 | MAJOR | PLAN.md:315-316 | ASK.md = 26 rows (grep 26/26), not 10; "only ones reserved" false |
| MAJOR-2 | MAJOR | PLAN.md:84,232 vs BAND-REDUCTION.md:156,159 | ~5 (delete appear/box/drawMs) vs ~8 (keep them) |
| MINOR-1 | MINOR | ASK.md:79 (ASK-7 evidence) | ASK-REDUCTION.md has 0 timeline/Wave-5 hits |
| MINOR-2 | MINOR | PLAN.md:22-23 | REGISTRY.md:16-18 = dating authorized, not provenance-shipped |
| NOTE-1 | NOTE | BAND-COLOCATION Purge D vs fold | body 5 barrels, fold+PLAN 4 |
| NOTE-2 | NOTE | ASSEMBLY-CROSSWALK ASK-CONSOLIDATED | ~23-24 listed vs 26 in ASK.md |
| NOTE-3 | NOTE | ASK.md:130-135 (ASK-14) | no lean — governed USER-GATED exception |

Single worst finding: **MAJOR-1** — PLAN §6 tells the reader the user gate is 10 rows "assembled in ASK.md,
the sole document the user must rule on," while ASK.md is a 26-row checklist; a clean capstone-vs-capstone
count contradiction with no governing override to resolve it.
