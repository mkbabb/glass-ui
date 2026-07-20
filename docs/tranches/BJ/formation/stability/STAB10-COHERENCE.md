# STAB10 — COHERENCE lens (BJ formation-close gate, round 10)

- **Verified model:** `claude-fable-5` — read verbatim from this seat's system context ("The exact
  model ID is claude-fable-5").
- **Date:** 2026-07-20. **Read at committed HEAD `0b4c5840`** — *"docs(BJ): lead adjudication — the
  G-CLOSE gate falls, the Q mailbox resumes, and the four STAB escalations close"* — **plus the
  uncommitted STAB9 fix set** (`git status`: `ASK.md` · `ASK-REDUCTION.md` · `EXECUTION-PROGRESS.md` ·
  `PLAN.md` · `LEAD-AMENDMENT-LEDGER.md` · `BAND-REDUCTION.md` · `IOS27-MICRO/FINAL/FINAL.md` modified,
  exactly the seven files `FIXLOG-STAB9.md:131-135` names). This is load-bearing: this round judges the
  **post-STAB9-cure** corpus, and four of the six findings below are the un-swept halves of round-9
  cures.
- **Posture:** the corpus was assumed incoherent until proven otherwise. Read in full before judging:
  all nine `waves/BAND-*.md` + `waves/APOTHEOSIS.md` · `PLAN.md` · `ASK.md` · `ASK-REDUCTION.md` ·
  `formation/refable/LEAD-AMENDMENT-LEDGER.md` (incl. §I1, §J1-J5, §K1-K8, §C6/C7 and the terminal-order
  clause) · `REFABLE-RU-20.md` / `REFABLE-RU-29.md` / `REFABLE-RU-26-DESIGNSYNC.md` ·
  `formation/redress/JUDGE.md` · `coordination/ATLAS-Q-G-BATCH-DISPOSITION.md` (all three addenda + the
  07-20 inbound) · `../IOS27-MICRO/FINAL/FINAL.md` + `W0-PAINT-LEDGER.md`, with
  `formation/REGISTRY.md`, `formation/ASSEMBLY-CROSSWALK.md`, `EXECUTION-PROGRESS.md` and
  `formation/greenfields/GF-AURORA-PASS3.md` pulled in as the cross-reference targets the corpus names,
  and `STAB9-*` / `FIXLOG-STAB9` read only to avoid re-reporting cured items. Every anchor in a finding
  was re-proven on disk this seat; four were re-proven against `src/`.
- **Read-only:** this seat edited nothing. Every cure below is apply-ready verbatim.

## Fences honored

- **`ASK.md` is untouched.** No cure targets that file — `grep STAB10 ASK.md` returns 0 after the fixer
  runs. No row ID, question, or recommendation is renumbered, reworded, merged, or re-scoped anywhere.
  Rows pending a USER ruling (ASK-1/4/6/13/14/20/21/22/25/26/27 et al.) are pending BY DESIGN and are
  not findings. M-3's cure changes a *crosswalk* table's framing, never an ASK row; M-4's cure
  explicitly instructs that any new REDUCTION-W6/W7 row be MINTED as a new row, never a re-scope.
- **The held/vetoed fence.** The charter states that routings citing the atlas Q mailbox as MARKED-HELD
  and G-CLOSE as veto-gated are correct, not defects. That instruction predates the tree this seat read.
  **No finding below disputes the status in either direction.** M-1 reports a wave missing from an
  execution queue; it is true and apply-ready whether G-CLOSE stands or falls (if the owner re-gates,
  W-5 re-parks under the PARKED row, which is where the cure puts the reversibility clause). The
  chronologically-layered held/veto text in `ATLAS-Q-G-BATCH-DISPOSITION.md:16/:67/:71-76` and
  `atlas-outbound-2026-07-19-q-g-batch.md:25` is dated era-record correctly superseded in place by
  Addendum 3 — clean, not a defect.

## The charter's two flagged items — both verified ALREADY CURED, recorded as clean

- **OPEN-FM-1 label collision — CLOSED on disk, no cure owed.** `BAND-FEEDBACK-MOTION.md:342-346`
  carries the dated CLOSED bracket; RU-14 R5 renamed the dossier-side label to `OPEN-FM-3a` in-ring
  (`dcb2832a`, live at `DOSSIER-F11-F20.md:412-414`); ledger **C3** is REFUTED-as-pre-satisfied with the
  refutation itself lead-verified. Re-proven this seat: `grep -rn 'OPEN-FM-1'` over the corpus returns
  only the band's own W2 loop/indeterminate-scope question (`:328-330`) and historical ring records that
  disambiguate it, and the band's `OPEN-FM-3a` (`:66`, `:340-341`) is one label for one question. No
  collision remains, and `BAND-DOC-TRUTH` carries no target for it (correctly — none is owed).
- **CRIT8B-1 RESIDUE in ledger C6 — OWNED, no cure owed.** C6's cell (`:93`) closes *"RESIDUE DISPOSED
  2026-07-20 — it is OWNED as ledger row **C7** below"*, and C7 exists (`:94`) with the STAB9 cure
  applied: class `PENDING`, destination the RU-01 capstone seat, annotation batch named
  (`DOSSIER-A01-A17.md:79-91` + `REFABLE-RU-13-A01-A17.md:40`/`:229-241`), doc-truth bracket only, no
  verdict movement — matching the terminal-order clause at `:152-155`. The un-owned state the charter
  flagged is gone.

## The trio-falsification sweep

Swept `PLAN.md`, all nine band files, `APOTHEOSIS.md`, the ledger, `REGISTRY.md`,
`ASSEMBLY-CROSSWALK.md`, `EXECUTION-PROGRESS.md`, `FINAL.md` and `W0-PAINT-LEDGER.md` for rows still
asserting the pre-trio state:

- **W-0 6 PASS / 1 DEFER / 0 FAIL** — contradicts nothing in the BJ corpus; `EXECUTION-PROGRESS.md:13-14`
  carries the tally correctly, and the row-7 DEFER's sub-parts are owned by name at `FINAL.md:88-93`.
- **RU-20 16/16 + chip-CSS the one shipped defect** — the chip/glass-atom orphan reads as the single
  carried 7.0.0 defect with MATERIAL W7 owning the fix in every place it appears (`PLAN.md:17/:220/:370`,
  `BAND-GATES.md:307-316/:341/:462`, `BAND-MATERIAL.md:58/:730-758`, `BAND-REDUCTION.md:80`,
  `BAND-COLOCATION.md:211-215`, `REGISTRY.md:26-28/:147`). K3 VERIFIED-PRESENT and K4's gate-(c) widening
  is PROPOSED-ROUTED with a named firing event. Clean.
- **RU-26 6/6 UPHELD + LIVE-DEFER LIFTED** — carried at ledger **H4** and `EXECUTION-PROGRESS.md:97-98`;
  no surviving "opus-presumed" claim on the pass-2 taste half anywhere (`grep` over the corpus returns
  only the unrelated greenfield paint LIVE-DEFERs, which are a different obligation). K7's WebKit arm is
  a NAMED NON-GOAL, cross-referenced from H4 so no downstream row re-mints it. Clean.
- **V-A95 3rd/4th non-reproduction** — clean in `PLAN.md`, `GF-AURORA-PASS3.md` (§3.7/W6/§rider), the
  ledger and `EXECUTION-PROGRESS.md:99-100`. **One row still asserts the pre-trio state: `REGISTRY.md:146`
  — finding M-2.** `PLAN.md:369` knows it and defers it to a vehicle that does not exist.

The 47-wave arithmetic reconciles (5+3+1+7+4+7+4+9+7 = 47, `APOTHEOSIS.md` §2). PLAN §6's reconciled
counts (50/5/3/10/0/0 = 67) match `ASSEMBLY-CROSSWALK.md:252-254`. `PLAN.md:391`'s 27-row figure matches
`grep -c '^\*\*ASK-' ASK.md` = 27. The `springPresets.ts` anchors behind DOC-TRUTH T1/T2/T9 (`:95-99`
dock 0.3/0.82, `:109-113` transient 0.62/0.90) and the F17 anchor (`searchVariants.ts:9-10` `rounded-none`
on bare/floating) were re-proven against `src/` and hold exactly.

---

## VERDICT: **NOT CLEAN — 6 material findings**

Nothing in the corpus's *substance* moved this round: no wave lost its owner, no born-RED posture went
dishonest, no user ruling was pre-decided, no trio fact was mis-stated except the one registry line. What
fails is **mechanical**, and it is one shape repeated: **a cure landed on the anchor it was written for
and not on the sibling anchor that carried the same defect.** Four of the six are the un-swept halves of
round-9 cures (M-1, M-5, M-6, and M-4's whole class); one is an un-swept half of the 07-19 lead
amendment pass (M-3); one is an un-swept half of ledger row B1's own edit region (M-2).

| # | file:line | class | defect |
|---|-----------|-------|--------|
| M-1 | `docs/tranches/BJ/EXECUTION-PROGRESS.md:62` | half-applied amendment — whole wave dropped from the queue | P-EX3 enumerates FINAL W-1/2/3/4/6/7 and omits **W-5**, the one wave the 07-20 un-park released |
| M-2 | `docs/tranches/BJ/formation/REGISTRY.md:146-147` | stale row asserting the pre-trio state | V-A95 reads "(ACTIVE RED, carried)" against four non-reproductions, contradicting the same file's `:315-322` |
| M-3 | `docs/tranches/BJ/formation/ASSEMBLY-CROSSWALK.md:155-170` | half-applied amendment — superseded recommendations on a ruling-adjacent surface | ASK-CONSOLIDATED still prints the pre-E2 recommendations for A1/C1/C3/D1, all four STRUCK in the live ASK documents |
| M-4 | `docs/tranches/BJ/EXECUTION-PROGRESS.md:69-88` | dangling state — no cursor row | `BAND-REDUCTION` W6 + W7 are PARKED-UNROUTABLE pending lead action, recorded in no PARKED register |
| M-5 | `docs/tranches/BJ/waves/BAND-REDUCTION.md:688` | half-applied amendment — stale cite | W8's gate row still names "(A2)", the exact cite the same wave's Status line brackets as a collision |
| M-6 | `docs/tranches/BJ/formation/refable/LEAD-AMENDMENT-LEDGER.md:137` | half-applied amendment — false class membership | the PROPOSED-ROUTED enumeration still lists **J2**, re-classed VERIFIED-PRESENT by STAB9 cure 5 |

---

## Material findings

### M-1 · `docs/tranches/BJ/EXECUTION-PROGRESS.md:62` — FINAL **W-5** is queued by no phase

**Defect.** The P-EX3 phase row enumerates the IOS27-MICRO FINAL waves individually — *"W-1
registers/tokens · W-2 SPINE-CONDUCTOR · W-3 F4-R1..12 · W-4 F5-R1..11 · W-6 engagement/breath · W-7
remainders"* — and **skips W-5**. W-5 is `FINAL.md:55-74`, THE NOVELTY ADOPTIONS: the tier-1 set
(V-CONST · V-TIMELINE · V-BLACKDOCK · V-PERCH · V-VAPOR · V-ALENS · R-MOMENTUM · **R-TABTOGGLE/R-TABS/
R-SLIDER, the owner's named frosted-glass cures** · R-EFFERVESCE), tier-2 (V-WAVE · V-DOTREL), the
pass-4-born pair (V-MORPHDOCK · V-THINKFIELD) and PROTO-ASSEMBLY's three organs.

The omission was *lawful* until 2026-07-20: W-5 was parked, and `:78-79` used to say so. STAB9's cure 2
replaced that PARKED row with **"Veto/held: NONE as of 2026-07-20 … `V-PERCH-PRIMITIVE` (FINAL W-5) is
**UN-PARKED**"** — and did not touch the phase ledger thirty lines above, which is the list that actually
schedules work. So the cursor now un-parks a wave in one section and queues every FINAL wave *except*
that one in the other. STAB9's own cure text asserts *"P-EX3 queues FINAL W-1..W-7"*; on disk it does
not, and never did.

The failure is a silent drop of a whole wave, which is the one class this corpus's charter forbids
outright: an executor opening P-EX3 launches six FINAL waves, and the seventh — carrying the owner's
personally-named frosted-glass tab/slider cures and the un-gated close primitive — is in no phase, on no
parked list, and therefore in nobody's hands. `FINAL.md:102-104` hands W-0..W-**7** to the execution
phase; this cursor receives six of them.

**CURE** — replace line 62 of `docs/tranches/BJ/EXECUTION-PROGRESS.md` (the single line beginning
`| P-EX3 | IOS27-MICRO FINAL: W-1 registers/tokens (early, unblocked)`) with exactly:

```
| P-EX3 | IOS27-MICRO FINAL: W-1 registers/tokens (early, unblocked) · W-2 SPINE-CONDUCTOR (GF-DOCK first consumer) · W-3 F4-R1..12 · W-4 F5-R1..11 · **W-5 NOVELTY ADOPTIONS** (tier-1 V-CONST/V-TIMELINE/V-BLACKDOCK/V-PERCH/V-VAPOR/V-ALENS/R-MOMENTUM/R-TABTOGGLE/R-TABS/R-SLIDER/R-EFFERVESCE · tier-2 V-WAVE/V-DOTREL · the pass-4-born V-MORPHDOCK/V-THINKFIELD · PROTO-ASSEMBLY's three organs; **`V-PERCH-PRIMITIVE` is UN-PARKED** per `coordination/ATLAS-Q-G-BATCH-DISPOSITION.md` Addendum 3 — owner-reversible, and on a re-gate only that ONE row re-parks while the rest of W-5 stands. [Queued 2026-07-20, STAB10: this row previously omitted W-5 entirely — the un-park landed in §PARKED rows and was never swept into the phase that schedules work.]) · W-6 engagement/breath · W-7 remainders + the W-0 row-7 re-drain when its preconditions land | QUEUED |
```

### M-2 · `docs/tranches/BJ/formation/REGISTRY.md:146-147` — V-A95 still stamped ACTIVE RED

**Defect.** Family G's member list reads *"V-A95 aurora reverse-drag slab (**ACTIVE RED, carried**)"*.
Three things falsify it at HEAD, one of them inside the same file:

1. `REGISTRY.md:315-322` — the file's own Round-3a fold, item 4: *"**V-A95 NOT REPRODUCED on live
   WebGPU**"*, with the context-steal confound named and the disposition inverted to *"close V-A95 if it
   does not reproduce."*
2. `PLAN.md:17` — *"**V-A95 is NOT a born-RED row**"*, and `:358-369` — *"RETIRE-OR-CONFIRM
   (downgraded; NOT an active RED) … FAILED TO REPRODUCE four independent times"* (round-3-live 3/3 ·
   `REFABLE-RU-20.md` R3A-4 · `REFABLE-RU-29.md` A2).
3. `GF-AURORA-PASS3.md:248-257/:316/:401` — the rider is *"downgraded — no longer an active-RED cure
   hunt."*

This is the charter's named hunt class (*a row still asserting the pre-trio state*) and it is **not**
covered by a "named, not silent" defence. `PLAN.md:369` defers the wording to *"the next registry
re-stamp"* — and no such re-stamp is scheduled anywhere. Ledger §B is exactly two rows, B1 and B2, both
APPLIED and closed; the terminal-order clause (`:133-157`) enumerates the only three classes that may
survive the close un-applied (PROPOSED-ROUTED, PENDING, WAITING) and this belongs to none of them. By
that clause's own words the correction *"closes against silence."*

Worse, B1's edit landed on the **adjacent clause** — the `deadcode:css-partial-orphaned` attribution on
`:147`, immediately after the V-A95 clause — so the lead pass had this exact text under its cursor and
swept one clause of the two.

The concrete failure: `REGISTRY.md` is the formation canon a fresh band or execution seat reads for
family membership. It tells that seat that BJ carries **two** live defects into execution, and PLAN
tells it there is exactly **one** — and the second is precisely the cure hunt PLAN forbids ("never a cure
hunt"), against a defect four instruments could not reproduce.

**CURE** — replace lines 146-147 of `docs/tranches/BJ/formation/REGISTRY.md` (the two consecutive lines
from `reference the OLD value.js implementation) · V-A95 aurora reverse-drag slab (ACTIVE RED,` through
`carried) · deadcode:css-partial-orphaned (chip/glass-atom dead in dist — born-RED fix; OWNER RE-STAMPED`)
with exactly:

```
reference the OLD value.js implementation) · V-A95 aurora reverse-drag slab (~~ACTIVE RED, carried~~ →
**RETIRE-OR-CONFIRM — NOT an active RED. Re-stamped 2026-07-20, STAB10**, against the landed browser
trio: FOUR independent non-reproductions on live WebGPU under the no-`getContext` discipline
(round-3-live 3/3 reverse-drag variants · `refable/REFABLE-RU-20.md` R3A-4 "CLEARED on live WebGPU;
original claim likely a context-steal artifact" · `refable/REFABLE-RU-29.md` A2 "5 forward/reverse stroke
pairs + 2 rapid reverse pairs recompose the field — no black slab ever"), consistent with this file's own
Round-3a fold item 4 at `:315-322` and with `PLAN.md:17` + `:358-369`. Standing disposition:
retire-as-instrumentation-artifact, twice-instrumented; **GF-AURORA W6 owns ONE clean confirm** on the
real in-app Chrome arm AFTER the mode waves land, then retires the defect record and audits the
`isolation: isolate` cure for cargo — **never a cure hunt**. BJ therefore carries exactly ONE known
7.0.0 defect (the chip/glass-atom orphan below), not two. This bracket IS the "next registry re-stamp"
that `PLAN.md:369` deferred the wording to; the deferral is hereby DISCHARGED and names no further
firing event) · deadcode:css-partial-orphaned (chip/glass-atom dead in dist — born-RED fix; OWNER RE-STAMPED
```

### M-3 · `docs/tranches/BJ/formation/ASSEMBLY-CROSSWALK.md:155-170` — ASK-CONSOLIDATED prints four struck recommendations

**Defect.** The `### From ../ASK-REDUCTION.md` table (`:155-170`) carries the **pre-E2** recommendation
column, verbatim, with no supersession marker:

- `:159` **A1** — *"RATIFY SHARED-KEEP (3-4-repo census stands; the removal instinct is the disease)"*.
  Struck. `ASK.md` ASK-1 and `ASK-REDUCTION.md` §A1 both carry the dated RE-ISSUED block: **chassis
  DELETE** (contract-phantom against the 7.0.0 contract) + **metric DELETE-with-relay**, COLLAPSE-FAMILY
  the fired-clause alternative.
- `:166` **C1** — *"keep deck … + carousel as the visual component"*. Struck. The corrected
  recommendation is **carousel DELETE-with-relay** (words named, embla peer removed).
- `:168` **C3** — *"consolidate to the ≥2-consumer keeps (fading-scroll); likely collapse reveal+scroll
  into one page"*. Struck. The corrected recommendation is the per-symbol table (useStagger **KEEP** —
  the census that line invited has already fired; `useLiquidReveal`→`morph/`; `useScrollPin` demo-local
  with `springProjection` FENCED OUT; `useScrollScene` conditional-keep).
- `:170` **D1** — *"empties the `scene` type → taxonomy is 6"*. Superseded by the 2026-07-20 arithmetic
  truth-up in both live documents: under the adopted SIX-type fold it is **FIVE** if pruned, **SIX** if
  kept.

Ledger **E2** (`:53`) records where the re-issue landed: *"three RE-ISSUED blocks in `ASK-REDUCTION.md` …
+ matching SUPERSEDES riders on `ASK.md` ASK-1/4/6 + both roll-ups."* Four surfaces swept; this fifth one
— which reprints the same recommendations in a table headed *"every user-ASK row, deduplicated"* — was
not in the batch.

Why this is material and not bookkeeping: `PLAN.md:386-396` names this crosswalk *"the authoritative
accounting"*, and `ASK.md` itself cites `ASSEMBLY-CROSSWALK.md` ASK-CONSOLIDATED as the evidence pointer
for **ASK-23** (`:209`) and **ASK-24** (`:218`). An owner or lead who follows an ASK evidence pointer into
this section lands on a table that recommends **RATIFY SHARED-KEEP** — the precise recommendation E2
struck for being built on a census RU-09 proved phantom, on the corpus's own flagship third-asked row.
The E2 discipline was explicitly *"re-issued with the corrected censuses **BEFORE the user rules**"*; a
struck recommendation surviving on a surface the ASK points at defeats that discipline at the last step.

The cure is a single dated block under the section heading — no row in the table is rewritten, so the
deduplication record and the question column stay intact as history.

**CURE** — replace line 155 of `docs/tranches/BJ/formation/ASSEMBLY-CROSSWALK.md` (the single line
reading ``### From `../ASK-REDUCTION.md` ``) with exactly:

```
### From `../ASK-REDUCTION.md`

**[SUPERSESSION 2026-07-20, STAB10 — the recommendation column below is the PRE-E2 text; read the live
documents, never this table, for any recommendation.** Lead amendment ledger **E2**
(`refable/LEAD-AMENDMENT-LEDGER.md:53`, RU-04 judge §5.5) RE-ISSUED four of these rows with corrected
censuses *before the owner rules*; the live ruling surfaces are `../ASK.md` + `../ASK-REDUCTION.md` and
this crosswalk is neither. The four: **A1** ~~"RATIFY SHARED-KEEP"~~ → **chassis DELETE**
(usage is contract-phantom against the 7.0.0 contract) + **metric DELETE-with-relay**, with
COLLAPSE-FAMILY as the fired-clause alternative (keyframes.js the one current-contract `/metric`
consumer) — `ASK.md` ASK-1 / `ASK-REDUCTION.md` §A1. **C1** ~~"carousel as the visual component"~~ →
deck-keep (headless `useDeck`, atlas ×2) + **carousel DELETE-with-relay**, embla peer removed, the relay
NAMES words — ASK-6 / §C1. **C3** ~~"consolidate to the ≥2-consumer keeps"~~ → the per-symbol table:
`useStagger` **KEEP** (speedtest ×2 — the escape clause already fired), `useBloomUp`+`bloomUpField` and
`useStaggerReveal` DELETE, `useLiquidReveal` RELOCATES to `morph/`, `useScrollPin` goes demo-local with
`springProjection` **FENCED OUT** and staying in `src/`, `useScrollScene` conditional-keep — ASK-4 / §C3.
**D1** ~~"taxonomy is 6"~~ → under the adopted SIX-type fold (`../waves/BAND-STORY.md:104-110`,
`../PLAN.md:168-169`) pruning makes the taxonomy **FIVE** and keeping a composition page makes it
**SIX**; the stake is unchanged (an empty `scene` is not minted). The QUESTION column and every
greenfield row below are unchanged and remain accurate. This table stays as the deduplication record; it
is not a ruling surface.**]**
```

### M-4 · `docs/tranches/BJ/EXECUTION-PROGRESS.md:69-88` — two PARKED-UNROUTABLE waves appear in no PARKED register

**Defect.** `BAND-REDUCTION` **W6** (`BJ.W-REDUCE-FEEDBACK-MARK`, `:577`) and **W7**
(`BJ.W-REDUCE-OVERLAY-SURFACE`, `:614`) each carry, on disk, the status *"UNION — ASK-GATED ON AN
UNMINTED ROW … Until then this wave is **PARKED-UNROUTABLE**, not merely ASK-gated"*, with lead/owner
action explicitly owed: their gates cite "ASK A3"/"ASK A4", which are RU-09's **internal** numbering
(`REFABLE-RU-03-REDUCTION.md:61-62`) and appear in neither `ASK.md` nor `ASK-REDUCTION.md` (grep = 0).
Both waves' scope item (2) is a public-surface break — the `./pulse` subpath delete, and a public-API
`DrawerDirection` narrowing — so neither may execute on a formation-side call.

That state exists in exactly two places: the band file, and `FIXLOG-STAB9.md:143-147` ("Standing action
owed to the lead/owner"). A fixlog is a record of one round's edits, not a durable register. The **cursor**
— the document whose own preamble (`:14-15`) says *"This file is the CURSOR — status only"* and whose
`## PARKED rows` section (`:67-88`) is the list an executor checks before launching — carries an
ASK-gated bullet enumerating fifteen blocked items by row, a Veto/held bullet, and a Conditional bullet,
and **names neither W6 nor W7**. Nor does any phase row: P-EX2 lists *"REDUCTION W1/W2 + W3's non-ASK
slices + W5"*, so the two waves are absent from the queue and absent from the parked list at once.

This is the same shape as M-1 from the other direction. STAB9's cures 7 and 8 minted a genuinely new
blocked-state class and the fixer correctly flagged that it names lead action still owed — but the class
was never written into the register that governs launching. Concretely: the lead reads the cursor to know
what is owed and sees nothing owed; an executor reads the cursor to know what is blocked and sees these
two waves nowhere, so the only thing standing between the tranche and an unratified public-surface break
is whether that executor happens to open the band file first.

**CURE** — replace lines 87-88 of `docs/tranches/BJ/EXECUTION-PROGRESS.md` (the two lines from
`- **Conditional:** ASK-24 CI-GPU fallback (fires only if the SwiftShader probe fails) ·` through
`  device-capture lane (D-2 non-goal unless the owner supplies one).`) with exactly:

```
- **PARKED-UNROUTABLE — lead/owner action owed before the wave can even park (added 2026-07-20, STAB10;
  the state existed only in the band file and in `formation/stability/FIXLOG-STAB9.md:143-147`, never in
  this cursor):** `BAND-REDUCTION` **W6** (`BJ.W-REDUCE-FEEDBACK-MARK`, pulse→StatusDot —
  `waves/BAND-REDUCTION.md:577`) and **W7** (`BJ.W-REDUCE-OVERLAY-SURFACE`, the `DrawerDirection`
  narrowing — `:614`). Both were gated on "ASK A3"/"ASK A4", which are RU-09's INTERNAL ask numbering
  (`formation/refable/REFABLE-RU-03-REDUCTION.md:61-62`) and exist in NEITHER `ASK.md` NOR
  `ASK-REDUCTION.md` (grep = 0 in both). Each wave's scope item (2) is a public-surface break — the
  `./pulse` subpath + dist + typesVersions delete (W6) and a public-API type narrowing (W7) — so neither
  may execute on a formation-side call. **The lead must either MINT the ratification row into `ASK.md`
  (a NEW row — never a renumber, reword, merge, or re-scope of an existing row, per the standing ASK
  freeze) or record a lead-decided disposition, with rationale, in the band file.** Until one of those
  lands, these two waves belong to no phase and launch under no seat.
- **Conditional:** ASK-24 CI-GPU fallback (fires only if the SwiftShader probe fails) ·
  device-capture lane (D-2 non-goal unless the owner supplies one).
```

### M-5 · `docs/tranches/BJ/waves/BAND-REDUCTION.md:688` — W8's gate names the cite its own Status line brackets as wrong

**Defect.** Wave 8's acceptance table opens `| G-ASK-RESOLVED (A2) | precondition | the family collapse
ratified. |`. Thirty lines above, the same wave's Status line (`:657`) was cured by STAB9 to
*"**ASK-6-gated** (`ASK-REDUCTION.md` §C1, whose re-issued recommendation names this wave: 'DeckPager cut
rides REDUCTION W8'); [cite corrected 2026-07-20, STAB9 — the prior '**ASK A2**' was RU-09's internal
numbering and **collided with `ASK-REDUCTION.md` §A2, completion-seal**]"*.

So the wave declares, in its own header, that "(A2)" is a wrong and actively colliding cite — and then
prints "(A2)" as the identifier of its blocking precondition. The cure swept the Status line and not the
gate row.

The mis-route is not hypothetical, because §A2 is a **live and separately-recommended** row: ASK-2 /
§A2 is completion-seal, whose standing recommendation is **KEEP public** (2 external repos). A seat
checking `G-ASK-RESOLVED (A2)` against §A2 finds a ruling that has nothing to do with the goo-engine
collapse, and can mark the precondition of a delete wave — one that retires `DeckPager.vue`, deletes
three demo modules, ~200 lines of story CSS and a private test — satisfied by a ruling about an unrelated
public subpath. The gate row is the only place the precondition is machine-checkable, which is exactly
why it is the wrong place to leave the collided label.

**CURE** — replace line 688 of `docs/tranches/BJ/waves/BAND-REDUCTION.md` (the single line reading
`| G-ASK-RESOLVED (A2) | precondition | the family collapse ratified. |`) with exactly:

```
| G-ASK-RESOLVED (**ASK-6**) | precondition | the family collapse ratified — the ratification row is `ASK.md` **ASK-6** / `ASK-REDUCTION.md` **§C1** (deck-keep as the headless `useDeck` engine + carousel DELETE-with-relay), whose re-issued recommendation names this wave by name ("the DeckPager cut rides REDUCTION W8"). [Cite corrected 2026-07-20, STAB10: the prior "(A2)" was RU-09's internal numbering and collided with `ASK-REDUCTION.md` §A2 / `ASK.md` ASK-2 — completion-seal, a live row recommending KEEP. This wave's Status line (`:657`) already carried that correction; the gate row was the un-swept half.] |
```

### M-6 · `docs/tranches/BJ/formation/refable/LEAD-AMENDMENT-LEDGER.md:137` — J2 still enumerated in a class it was removed from

**Defect.** The terminal-order clause opens its first class as **"PROPOSED-ROUTED (J1 · J2 · J3 · J5 · K1
· K4 · K5 · K6)"** and closes it with a hard rule: *"A destination band that closes without carrying its
annotation is a silent drop."*

J2 is no longer in that class. STAB9's cure 5 replaced J2's status cell (`:105`) with
**`VERIFIED-PRESENT (no amendment owed; re-pointed 2026-07-20, STAB9)`**, re-pointing it to the born-RED
row that already owns it (`BAND-FEEDBACK-MOTION` W7(d) SHEET-PAINT-HOLES, `:314-320`), recording RU-29 N5
as a second instrument rather than a new row, and ending *"**NOT routed to BAND-STORY.**"* The clause body
even carries the carve-out — *"**J2 does not land in BAND-STORY at all — see its own row**"* — but the
membership list at the head of the same bullet was never edited.

The result is a self-contradicting class in the document that governs what the close may bank on. It cuts
both ways and both ways are wrong: read the enumeration and J2 owes an annotation in a destination it is
forbidden to have — so the close's silent-drop check fires a false positive against `BAND-STORY`, or a
landing seat "fixes" it by filing J2 into `BAND-STORY` W1's demo-coverage section, double-owning a defect
`BAND-FEEDBACK-MOTION` W7(d) already carries born-RED. Cure 5 existed precisely to kill that double
ownership ("One defect, one owner", `FIXLOG-STAB9.md:45`); the un-swept enumeration re-opens the door it
closed.

**CURE** — replace line 137 of `docs/tranches/BJ/formation/refable/LEAD-AMENDMENT-LEDGER.md` (the single
line reading `- **PROPOSED-ROUTED (J1 · J2 · J3 · J5 · K1 · K4 · K5 · K6).** Each lands as an annotation in its`)
with exactly:

```
- **PROPOSED-ROUTED (J1 · J3 · J5 · K1 · K4 · K5 · K6).** [Membership corrected 2026-07-20, STAB10 —
  **J2 is NOT in this class.** It was re-classed `VERIFIED-PRESENT (no amendment owed)` on 2026-07-20
  (STAB9 cure 5; its row at `:105`) because `BAND-FEEDBACK-MOTION` W7(d) SHEET-PAINT-HOLES already owns
  it born-RED and RU-29 N5 is a second instrument on that census, not a new row — the row ends "NOT
  routed to BAND-STORY." Leaving J2 enumerated here pointed this class's own closing rule ("a
  destination band that closes without carrying its annotation is a silent drop") at a row with no
  destination and no annotation owed, which either false-fires the close check against `BAND-STORY` or
  invites a landing seat to file J2 there and re-create the double ownership cure 5 removed. The J2
  carve-out sentence below is retained as the pointer.] Each lands as an annotation in its
```

---

## Cosmetic (wording / pin-drift only — these do NOT count toward the verdict)

1. **A carried cosmetic REFUTED — do not apply it.** `STAB9-COHERENCE.md` cosmetic 6 (carried from STAB7
   and STAB8) asks the fixer to re-pin `waves/BAND-DOC-TRUTH.md:78` T14 from `useDockShellProps.ts:117`
   → `:118`. **T14's pin is CORRECT at HEAD.** Re-proven on `src/` this seat:
   `useDockShellProps.ts:115` = `viewTransitionName?: string;`, `:116` = `/**`, **`:117` = the
   `Idle-collapse delay in ms (default 2000)` JSDoc line**, `:119` = `collapseDelay?: number;`.
   Applying the carried re-pin would move a correct pin onto the closing `*/`. Recorded here so the
   three-round drift claim stops, and struck from the carry list.
2. `ASK-REDUCTION.md:321` (roll-up C3) says the re-issue carries "**3 deletes**"; `ASK.md:303` says
   "**2 deletes**". Both resolve against the same enumerated body (`:246-247` — `useBloomUp` +
   `bloomUpField`, and `useStaggerReveal`: 3 symbols in 2 delete decisions), so neither misstates scope.
   No `ASK.md` edit is proposed (frozen); if anything moves it is `ASK-REDUCTION.md:321` → "2 delete
   decisions (3 symbols)". Carried from STAB8/STAB9 unchanged.
3. `waves/BAND-REDUCTION.md:767` — the Still-OPEN roll-up still uses RU-09's internal letters
   ("pulse merge (A3), drawer narrowing (A4), goo collapse (A2)") beside real §-cites. W6/W7's letters
   are self-disambiguated by the ESCALATION blocks in their own waves; W8's is cured by M-5. A future
   sweep may harmonize the roll-up to `ASK.md`/§ ids; nothing misroutes today.
4. `waves/BAND-REDUCTION.md:579` (`Depends on: ASK A3`), `:616` (`ASK A4`), `:635` (`ASK A4`), `:606`
   and `:648` (`G-ASK-RESOLVED (A3)/(A4)`) — same internal-letter idiom. Left uncured deliberately:
   both waves are PARKED-UNROUTABLE precisely *because* those labels name nothing, their own Status
   blocks say so in full, and the labels must be re-pointed as one batch when the lead mints or decides
   (M-4). Curing the labels before the ruling would paper over the escalation.
5. `PLAN.md:163` — the STAB8 W5 correction pins the six-SFC timeline scope to `BAND-REDUCTION.md:518-522`;
   re-proven this seat, `:518-522` is **Wave 4's** §Non-goals, the six-SFC enumeration lives at
   `:535-539`, and `G-SIX-NAMED` at `:566`. The substance is inline in PLAN so nothing is lost. Carried
   from STAB9 cosmetic 1 (verified, still true).
6. `PLAN.md:141-157`, `:167-184`, `:246-260` — the §2 rosters remain excerpts: FAMILY C shows W1-W5 of 9,
   FAMILY D W1-W6 of 7, FAMILY G/FM W1-W6 of 7, and `BJ.W-STORY-TRANSITIONS` (STORY W7) is named nowhere
   in PLAN though `APOTHEOSIS.md` §3 phase 4 sequences it and `BAND-STORY.md:57` charters it. Fenced by
   the §2 SUPERSESSION LAW; a one-line "roster excerpt, not exhaustive" note under that law closes all
   four at once. Carried from STAB8/STAB9.
7. `PLAN.md:131-133` — FAMILY H W1 says `G-BARREL-REACH` reds on **four** zero-importer barrels;
   `BAND-COLOCATION.md:25-28` carries **five**. Same SUPERSESSION fence; it is a born-RED count, so a
   `[four→five; band file governs]` bracket is the cheapest close. Carried from STAB8/STAB9.
8. `PLAN.md:403` (§7 close definition) still phrases the obligation "V-A95 re-repro-or-close" — the
   pre-trio framing. Compatible with the cured §5 RETIRE-OR-CONFIRM disposition (a confirm-then-retire
   *is* a close), so not a contradiction. Carried from STAB8/STAB9.
9. `formation/refable/LEAD-AMENDMENT-LEDGER.md:93` (row C6) — the cell carries both "the noted CRIT8B-1
   RESIDUE stands un-owned" (inside the dated 2026-07-19 `lead:vf` record) and, later in the same cell,
   "RESIDUE DISPOSED 2026-07-20 — it is OWNED as ledger row **C7**". Chronologically coherent; prefixing
   the earlier clause with `[as of 2026-07-19]` closes the skim-read. Carried from STAB9.
10. `formation/ASSEMBLY-CROSSWALK.md:194-196` (Notable ambiguities) still reads *"there is literally zero
    wave text for these five. Draft one band before execution."* — superseded by the same file's Lead
    reconciliation item 1 (`:213-217`, ORPHANS 5 → 0, `BAND-FEEDBACK-MOTION` drafted). The reconciliation
    header claims to supersede "the counts above"; the ambiguity prose survives on that narrow wording. A
    reader reaching the reconciliation is not misled. (M-3 covers the section of this file that no later
    block reaches.)
11. `APOTHEOSIS.md` §3 phase 1 — *"REDUCTION W4/W6/W7/W9 as their ASK rulings land"*: W6/W7's rulings were
    never minted (M-4). Fenced by the capstone's own "where a band file and this capstone conflict, the
    band file is the spec; this file is the map" clause. Re-point at the same batch as M-4's ruling.
12. `waves/BAND-FEEDBACK-MOTION.md:333` pins Alert's tone arms at `alert/index.ts:10-19`; `ASK.md:231`
    pins `:9-19`. On disk the `TONE` object opens at `:9` and the arms run `:10-18`. Both land on the
    right construct; `ASK.md` is frozen and no cure is proposed.
13. `REFABLE-RU-20.md:18` and `REFABLE-RU-29.md:22` record the instrument as `127.0.0.1:5199`, against
    PLAN §3's live-π discipline ("serve on **localhost**, not 127.0.0.1"). Banked session history,
    append-only, no verdict turns on the host — but the next browser seat should be pointed at
    `localhost` so discipline and practice stop diverging. Carried from STAB9.
14. `formation/ASSEMBLY-CROSSWALK.md:5` "the eight band specs" vs nine on disk — already owned as
    `BAND-DOC-TRUTH` **T39**; not a finding.

---

## Method note

Every anchor in a material finding was re-proven on disk this seat, at `0b4c5840` plus the STAB9 fix set:
`EXECUTION-PROGRESS.md:62` read whole against `FINAL.md:55-74` and `:102-104` (W-5 absent from the phase
row, present in the FINAL set); `REGISTRY.md:146-147` read against `:315-322` in the same file, against
`PLAN.md:17`/`:358-369`, `GF-AURORA-PASS3.md:248-257`/`:316`/`:401`, and against ledger §B (rows B1+B2
only, both APPLIED — no scheduled re-stamp); `ASSEMBLY-CROSSWALK.md:155/:159/:166/:168/:170` diffed
against the RE-ISSUED blocks at `ASK-REDUCTION.md:47-73`/`:188-203`/`:238-264` and the SUPERSEDES riders
at `ASK.md:24-31`/`:54-59`/`:70-76`/`:130`, with ledger E2 (`:53`) read for the batch's stated scope;
`BAND-REDUCTION.md:577`/`:614`/`:657`/`:688` read whole against `EXECUTION-PROGRESS.md:67-88` and
`FIXLOG-STAB9.md:53-72`/`:143-147`; `LEAD-AMENDMENT-LEDGER.md:137` read against `:105` (J2's cured cell)
and `:146` (the carve-out sentence). Four anchors were re-proven against `src/`:
`springPresets.ts:95-99`/`:109-113` (dock 0.3/ζ0.82, transient 0.62/ζ0.90 — DOC-TRUTH T1/T2/T9 correct),
`searchVariants.ts:9-10` (`rounded-none` on bare/floating — F17's born-RED premise holds),
`alert/index.ts:7-19` (BASE `rounded-lg` at `:8`, TONE `:9-19`), and `useDockShellProps.ts:115-119`
(refuting cosmetic 1's carried re-pin). Also re-proven: `BAND-FEEDBACK-MOTION.md:342-346` (OPEN-FM-1
CLOSED) with a corpus-wide `OPEN-FM-1` grep, ledger `:93-94` (C6/C7 residue owned),
`ATLAS-Q-G-BATCH-DISPOSITION.md:80-117` (Addendum 3 terminal), and the 47-wave / 67-row / 27-row
arithmetic. **No file was modified.**
