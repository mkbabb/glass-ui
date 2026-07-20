# STAB9 — COHERENCE lens (BJ formation-close gate, round 9)

- **Verified model:** `claude-fable-5` — read verbatim from this seat's system context ("The exact
  model ID is claude-fable-5").
- **Date:** 2026-07-20. **Read at committed HEAD `0b4c5840`** — *"docs(BJ): lead adjudication — the
  G-CLOSE gate falls, the Q mailbox resumes, and the four STAB escalations close"*. **Working tree
  CLEAN** (`git status --short` = empty). This is stated because it is load-bearing: the sibling
  COMPLETENESS seat of this round read `c870d344` **plus an uncommitted STAB8 fix set**; the lead
  adjudication commit landed *after* that read and moved three facts this lens must judge at their
  post-adjudication state.
- **Posture:** the corpus was assumed incoherent until proven otherwise. Read in full before
  judging: all nine `waves/BAND-*.md` + `waves/APOTHEOSIS.md` · `PLAN.md` · `ASK.md` ·
  `ASK-REDUCTION.md` · `formation/refable/LEAD-AMENDMENT-LEDGER.md` (incl. §J1-J5, §K1-K8, §C6/C7
  and the terminal-order clause) · `REFABLE-RU-20.md` / `REFABLE-RU-29.md` /
  `REFABLE-RU-26-DESIGNSYNC.md` · `formation/redress/JUDGE.md` ·
  `coordination/ATLAS-Q-G-BATCH-DISPOSITION.md` (all three addenda + the 07-20 inbound) ·
  `../IOS27-MICRO/FINAL/FINAL.md` + `W0-PAINT-LEDGER.md`, with `EXECUTION-PROGRESS.md` as cursor
  context and `STAB7-*`/`STAB8-*`/`FIXLOG-STAB7`/`FIXLOG-STAB8` read only to avoid re-reporting
  cured items. Every anchor in a finding was re-proven on disk this seat.
- **Read-only:** this seat edited nothing. Every cure below is apply-ready verbatim.

## Fences honored

- **`ASK.md` is untouched.** No cure renumbers, rewords, merges, or re-scopes any row ID, question,
  or recommendation. `grep STAB9 ASK.md` will return 0 after the fixer runs — no cure targets that
  file. Rows pending a USER ruling (ASK-14/20/21/22/25/26/27 et al.) are pending BY DESIGN and are
  not findings.
- **The held/vetoed fence, and its one honest exception.** The charter states that routings
  referencing the atlas Q mailbox as MARKED-HELD and G-CLOSE as veto-gated are correct, not
  defects. That instruction was written against the pre-adjudication tree. **At the HEAD this seat
  read, the terminal ruling is `ATLAS-Q-G-BATCH-DISPOSITION.md` Addendum 3** (2026-07-20: the hold
  ENDS, G-CLOSE is UN-GATED), carried into `LEAD-AMENDMENT-LEDGER.md` I1 ("**RESUMED 2026-07-20**
  … supersedes the 07-19 MARKED-HELD"), `FINAL.md:66-74`, and `EXECUTION-PROGRESS.md:46-53`.
  **M-1 and M-2 do not dispute the status in either direction.** Each reports a file that asserts
  BOTH states at once — a within-file contradiction that is a defect under any reading of which
  status is correct. Both cures are dated brackets pointing at the ruling of record; neither lifts,
  re-gates, or re-scopes anything. If the owner re-gates G-CLOSE tomorrow, both cures stay true.

## Cross-lens note — one finding deliberately NOT re-reported

The round-8 cure collision on ledger row **C7** (cure 5's status cell says `PROPOSED-ROUTED → the
A02/A17 dossier annotation batch`; cure 9's inserted clause files the same row under
`**PENDING (C7)**` and routes it to the RU-01 capstone seat — `LEAD-AMENDMENT-LEDGER.md:94` vs
`:148-151`, the collision self-recorded at `FIXLOG-STAB8.md:98-102`) is real, is contradiction-
shaped, and this seat confirmed it on disk. **It is already owned as `STAB9-COMPLETENESS.md` F1.**
Re-reporting it here with a second cure text would manufacture exactly the two-cures-one-anchor
class that forced both of round 8's escalations (E-1, E-2). One row, one cure, the completeness
seat's. No verdict weight is taken for it here.

Likewise not re-reported: the charter's two flagged items are **already cured on disk** and are
recorded as clean, not as defects — the `OPEN-FM-1` label collision is stamped CLOSED at
`BAND-FEEDBACK-MOTION.md:342-346` (RU-14 R5 renamed the dossier label `OPEN-FM-3a`, `dcb2832a`,
live at `DOSSIER-F11-F20.md:412-414`; ledger C3 REFUTED-as-pre-satisfied), and the CRIT8B-1 residue
is OWNED as ledger row C7 (`LEAD-AMENDMENT-LEDGER.md:94`), its disposition stamped in C6 itself.
`grep -rn 'OPEN-FM-1'` over the corpus returns only the band's own W2 loop/indeterminate question
and the historical ring records that disambiguate it. No collision remains.

---

## VERDICT: **NOT CLEAN — 3 material findings**

The trio-falsification sweep comes back **clean**: no band, ledger row, or FINAL row still asserts
the pre-trio state of the three landed facts. V-A95 reads RETIRE-OR-CONFIRM with the four
non-reproductions named at `PLAN.md:17` and `:358-369` (the one stale `REGISTRY.md:146` wording is
explicitly bracketed as riding the next re-stamp — named, not silent); the chip/glass-atom orphan
reads as the one carried 7.0.0 defect with MATERIAL W7 owning the fix in all five places it appears
(`PLAN.md:17/:220/:370`, `BAND-GATES.md:307-316`, `BAND-MATERIAL.md:58/:730-758`); the RU-26
LIVE-DEFER lift is carried at ledger H4 and `EXECUTION-PROGRESS.md:90-91` with no surviving
"opus-presumed" claim on the pass-2 taste half. The W-0 6 PASS / 1 DEFER roll-up contradicts nothing
in the BJ corpus. The 47-wave arithmetic still reconciles against `APOTHEOSIS.md` §2.

What fails is **three stale assertions that survived their own supersession** — two of them inside
files whose *other* paragraphs already carry the correcting ruling, one of them a round-8 cure
applied to only one of the two documents that carried the defect.

| # | file:line | class | defect |
|---|-----------|-------|--------|
| M-1 | `docs/tranches/IOS27-MICRO/FINAL/FINAL.md:100` | contradiction — within-file, superseded state | the seam-to-BJ line says the Q mailbox "stays MARKED-HELD" while `:66-74` of the same file un-gates the wave that hold parked |
| M-2 | `docs/tranches/BJ/EXECUTION-PROGRESS.md:78-79` | contradiction — within-file, superseded state | the PARKED-rows list parks `V-PERCH-PRIMITIVE` on a veto that `:46-53` of the same file records as fallen |
| M-3 | `docs/tranches/BJ/ASK-REDUCTION.md:256` | half-applied amendment | the A13 phantom-ASK residue: STAB8 cure 10 killed the never-minted ASK row in the band file and left the ASK source-of-record still calling it an ask |

---

## Material findings

### M-1 · `docs/tranches/IOS27-MICRO/FINAL/FINAL.md:100`

**Defect.** The "seam to BJ" section closes: *"The atlas Q mailbox stays MARKED-HELD; nothing here
executes a G-row."* Sixty lines earlier, the **same file** carries the opposite as a dated,
bracketed ruling — `:66-74`: *"**V-PERCH-PRIMITIVE … is UN-GATED** [2026-07-20, lead — the G-CLOSE
gate FELL: both grounds are gone … Ruling of record: `coordination/ATLAS-Q-G-BATCH-DISPOSITION.md`
Addendum 3]"*. Both statements are live at HEAD. The lead adjudication commit (`0b4c5840`) stamped
W-5 and never swept the seam paragraph, so FINAL.md — the document `EXECUTION-PROGRESS.md:13` names
as the micro-tranche's spec of record — tells an executor reading top-down that the close primitive
is scheduled on merit, and an executor reading the seam that the mailbox is frozen. G-CLOSE is the
row `V-PERCH-PRIMITIVE` *is*: the two sentences are about the same wave. This is not a status
dispute (Addendum 3 is unambiguous and is cited by the file itself) — it is one file asserting a
proposition and its negation.

**CURE** — replace line 100 of `docs/tranches/IOS27-MICRO/FINAL/FINAL.md` (the line reading
`sidecars. The atlas Q mailbox stays MARKED-HELD; nothing here executes a G-row.`) with exactly:

```
sidecars. **[Truth-up 2026-07-20, STAB9 — the prior sentence read "the atlas Q mailbox stays MARKED-HELD; nothing here executes a G-row", which this file's own W-5 bracket (`:66-74`) had already superseded.** Terminal state per `coordination/ATLAS-Q-G-BATCH-DISPOSITION.md` **Addendum 3** (2026-07-20, verified on disk at `.p-totality/sci` `6c4bbc06` + `109f5573`): the Q mailbox hold has ENDED and **G-CLOSE is UN-GATED** — the six G-rows resume as scheduled band annotations at OUR batch points, and `V-PERCH-PRIMITIVE` (W-5) is UN-PARKED on its merits. Nothing here executes a G-row *ahead of* its owning band's batch point; that sequencing note is what survives. Owner-reversible: if G-CLOSE re-gates, W-5 re-parks unchanged.**]**
```

### M-2 · `docs/tranches/BJ/EXECUTION-PROGRESS.md:78-79`

**Defect.** The `## PARKED rows` list carries: *"**Veto/held:** V-PERCH-PRIMITIVE (FINAL W-5) — the
G-CLOSE veto STANDS · the atlas Q G-rows — mailbox MARKED-HELD."* The **same file** at `:46-53`
carries the heading *"**Q MAILBOX RESUMED · G-CLOSE UN-GATED (2026-07-20, lead — disposition
Addendum 3)**"* and states `V-PERCH-PRIMITIVE` (FINAL W-5) *"is UN-PARKED"* by name. STAB8's cure
6b trued `:44` (`FIXLOG-STAB8.md:25`) and the lead adjudication replaced that block wholesale with
the RESUMED text — but neither pass swept the PARKED-rows entry thirty lines below, which is the
list an executor actually reads to know what may launch. The cursor's own preamble (`:14-15`) says
*"This file is the CURSOR — status only, never a second spec"*; a cursor that parks a wave its own
ruling section un-parked is a second spec, and a wrong one. The failure mode is concrete: P-EX3
queues FINAL W-1..W-7, an executor checks PARKED rows before launching W-5, and holds a wave the
owner released.

**CURE** — replace lines 78-79 of `docs/tranches/BJ/EXECUTION-PROGRESS.md` (the two lines from
`- **Veto/held:** V-PERCH-PRIMITIVE (FINAL W-5) — the G-CLOSE veto STANDS · the atlas Q G-rows`
through `  — mailbox MARKED-HELD.`) with exactly:

```
- **Veto/held: NONE as of 2026-07-20 (STAB9 truth-up — this row previously read "V-PERCH-PRIMITIVE
  (FINAL W-5) — the G-CLOSE veto STANDS · the atlas Q G-rows — mailbox MARKED-HELD", contradicting
  this file's own §Sibling-coordination ruling at `:46-53`).** `V-PERCH-PRIMITIVE` (FINAL W-5) is
  **UN-PARKED** and the atlas Q mailbox is **RESUMED** — ruling of record
  `coordination/ATLAS-Q-G-BATCH-DISPOSITION.md` **Addendum 3**. The six G-rows are not parked work;
  they are scheduled band annotations that land at their destination band's batch point (G-1→A11Y ·
  G-2/G-3→MATERIAL · G-4→PERF · G-5→tabs-register · G-CLOSE→FINAL W-5). Owner-reversible: if the
  owner re-gates G-CLOSE, W-5 re-parks here unchanged and the built basis (V-PERCH, the 341-green
  battery, the MARKS-E apex formula) is untouched either way.
```

### M-3 · `docs/tranches/BJ/ASK-REDUCTION.md:256`

**Defect.** The §C3 RE-ISSUED per-symbol table ends: *"`useTextHighlight` is its own cut-or-bind ask
(A13; default DELETE)."* STAB8 proved on disk that **no such ask exists** — A13 has no row in
`ASK.md` (27 rows, none carries it) and none in `ASK-REDUCTION.md`'s own §A1/§A2/§B1-B5/§C1-C4/§D1 —
and cured it in the band file: `BAND-REDUCTION.md:346-354` now reads *"the 'ASK row' label routed to
a row that was never minted … This wave therefore EXECUTES the stated default … **DELETE
`useTextHighlight` + its root-barrel export line**"*, with the adoption list at `:781` re-stamped
*"A13 (useTextHighlight — W3 DELETE by default; no ASK row was ever minted, STAB8)"*. The cure
landed on three anchors in `BAND-REDUCTION.md` (`FIXLOG-STAB8.md:28-30`, legs 10a/10b/10c) and on
**none** in `ASK-REDUCTION.md` — yet `ASK-REDUCTION.md` is the document `ASK.md:14` names as a
source of record, and §C3 is a live ratification row the owner is being asked to mark. An owner
ratifying §C3 as written ratifies a table that says one of its symbols awaits a separate ask; an
executor reading §C3 parks the delete waiting for a ruling that can never arrive, because the row it
waits on was never minted. This is the identical phantom-ASK-gate class round 8 cured (its F5) and
round 9's completeness lens found recurring at whole-wave grain (its F3/F4/F5) — surviving here on
the one side the fixer's anchors did not reach. `ASK-REDUCTION.md` is not under the `ASK.md` freeze
and already carries a STAB8 bracket of exactly this shape at `:249-253` (cure 1c), so the precedent
and the idiom are established.

**CURE** — replace line 256 of `docs/tranches/BJ/ASK-REDUCTION.md` (the line reading
`  reveal adapter). `useTextHighlight` is its own cut-or-bind ask (A13; default DELETE).`) with
exactly:

```
  reveal adapter). **`useTextHighlight` (A13) is NOT an ask — [STAB8/STAB9 truth-up 2026-07-20]:**
  the "its own cut-or-bind ask" label routed to a row that was **never minted** (A13 has no row in
  `ASK.md` — 27 rows, none carries it — and none in this file's §A1/§A2/§B1-B5/§C1-C4/§D1), so the
  symbol never reached a user surface. Under the owner's standing no-deferrals order
  `BAND-REDUCTION` W3 **EXECUTES the stated default: DELETE `useTextHighlight` + its root-barrel
  export line** (`src/index.ts:191-194`), recording the dock-search match-mark bind site as the
  named alternative the owner may call at any time before the cut. Proof is W3's existing
  zero-importer scan; no new gate is minted. Ratifying §C3 neither gates nor unblocks this symbol —
  the band file carries the same truth-up at `waves/BAND-REDUCTION.md:346-354` and `:781`.
```

---

## Cosmetic (wording / pin-drift only — these do NOT count toward the verdict)

1. `PLAN.md:163` — the STAB8 W5 correction pins the six-SFC timeline scope to
   `BAND-REDUCTION.md:518-522`; at HEAD those lines are **Wave 4's** §π/DELTA + §Non-goals. The
   enumeration actually lives at `:535-539` and `G-SIX-NAMED` at `:566`. The substance (six file
   names + 1936/2254) is inline in PLAN, so nothing is lost — but the pin lands on the wrong wave.
   Re-pin `:518-522` → `:535-539` and the gate cite → `:566`. (Same class as STAB8 cosmetic 5.)
2. `PLAN.md:141-157`, `:167-184`, `:246-260` — the §2 rosters remain truncated: FAMILY C shows
   W1-W5 of 9, FAMILY D W1-W6 of 7, FAMILY G/FM W1-W6 of 7. FM at least names W7
   (`BJ.W-SHEET-MOTION-DEBT`) in its section header; **FAMILY D names `BJ.W-STORY-TRANSITIONS`
   nowhere in PLAN at all**, though `APOTHEOSIS.md` §3 phase 4 sequences "STORY W7" by name and
   `BAND-STORY.md:57` charters it. Fenced by the §2 SUPERSESSION LAW and judged cosmetic at STAB8
   (its cosmetic 2), carried unchanged; the one-line "roster excerpt, not exhaustive — the band file
   is the roster" note under the SUPERSESSION LAW paragraph still closes all three at once.
3. `PLAN.md:131-133` — FAMILY H W1 states `G-BARREL-REACH` reds on **four** zero-importer barrels;
   `BAND-COLOCATION.md:25-28` carries **five** at HEAD (1e greens four, 1a greens the fifth behind
   REDUCTION W3). Same SUPERSESSION fence; carried from STAB8 cosmetic 1. A `[four→five; band file
   governs]` bracket is the cheapest close, and it is a *born-RED count* — the one class APOTHEOSIS
   §4 invariant 2 polices.
4. `PLAN.md:403` (§7 close definition) — still phrases the obligation "V-A95 re-repro-or-close", the
   pre-trio framing. Compatible with the cured §5 RETIRE-OR-CONFIRM disposition (a confirm-then-
   retire *is* a close), so not a contradiction; "V-A95 retire-or-confirm at GF-AURORA W6" would
   read consistently with `:358-369`. Carried from STAB8 cosmetic 3.
5. `ASK-REDUCTION.md:321` (roll-up C3) says the re-issue carries "**3 deletes**"; `ASK.md:303` says
   "**2 deletes**". Both resolve against the same enumerated body (`:246-247` — `useBloomUp` +
   `bloomUpField`, and `useStaggerReveal`: 3 symbols in 2 delete decisions), so neither misstates
   scope. **No `ASK.md` edit is proposed** (frozen); if anything moves it is `ASK-REDUCTION.md:321`
   → "2 delete decisions (3 symbols)". Carried from STAB8 cosmetic 4.
6. `waves/BAND-DOC-TRUTH.md:78` — T14 still pins `useDockShellProps.ts:117`; at HEAD `:117` is
   `viewTransitionName?: string;` and the "default 2000" JSDoc is at `:118`. The row's acceptance is
   grep-per-stale-string so the sweep is unaffected. Third round carried (STAB7 → STAB8 → here);
   re-pin `:117` → `:118`.
7. `ASK.md:263` — ASK-27's evidence pin reads `BAND-FEEDBACK-MOTION.md … (:336-344, :189-250)`. The
   OPEN-FM-3 bullet now runs `:336-346` after the label-collision CLOSED bracket was appended inside
   it; the W5 pin `:189-250` is exact. The pin still lands on the right bullet. **No cure proposed —
   `ASK.md` is frozen and this is a two-line tail drift, not a wrong target.** Recorded only so a
   later reader does not mistake it for rot.
8. `formation/refable/LEAD-AMENDMENT-LEDGER.md:93` (row C6) — the cell carries both *"the noted
   CRIT8B-1 RESIDUE stands un-owned"* (inside the dated 2026-07-19 `lead:vf` verification record)
   and, later in the same cell, *"RESIDUE DISPOSED 2026-07-20 — it is OWNED as ledger row **C7**"*.
   Chronologically coherent, but it reads as self-contradictory on a skim of a long cell. If the
   capstone seat is editing nearby, prefixing the earlier clause with `[as of 2026-07-19]` closes
   it. No substance moves.
9. `REFABLE-RU-20.md:18` and `REFABLE-RU-29.md:22` both record the instrument as
   `127.0.0.1:5199`, against PLAN §3's live-π discipline ("serve on **localhost, not
   127.0.0.1**"). These are banked session records of what was done, not specs, and no verdict in
   either sidecar turns on the host — but the next browser seat should be pointed at `localhost` so
   the discipline line and the practice stop diverging. No edit proposed to either sidecar
   (append-only history).

---

## Method note

Every anchor in a material finding was re-proven on disk this seat at `0b4c5840` with a clean tree:
`FINAL.md:100` and `:66-74` both live in one file; `EXECUTION-PROGRESS.md:78-79` and `:46-53` both
live in one file; `ASK-REDUCTION.md:256` live and un-bracketed, against `BAND-REDUCTION.md:346-354`
+ `:781` carrying the cure, with `grep -in 'useTextHighlight\|A13' ASK.md` = **0** confirming the
never-minted row. Also re-proven: `ATLAS-Q-G-BATCH-DISPOSITION.md:80-117` (Addendum 3 terminal),
`LEAD-AMENDMENT-LEDGER.md:87` (I1 RESUMED, superseding the 07-19 MARKED-HELD), `:94` (C7
PROPOSED-ROUTED) vs `:148-151` (the PENDING (C7) clause) — the collision left to the completeness
seat, `BAND-FEEDBACK-MOTION.md:342-346` (label collision CLOSED), `BAND-REDUCTION.md:535-539` +
`:566` (the six-SFC scope + G-SIX-NAMED, against `PLAN.md:163`'s pin), `BAND-GATES.md:60-175` (W1's
subhead set — confirming the ledger's "no §Method notes section exists" premise for J5/K1 holds),
and the trio-falsification sweep across `PLAN.md`, all nine band files, `FINAL.md` and
`W0-PAINT-LEDGER.md`. No file was modified.
