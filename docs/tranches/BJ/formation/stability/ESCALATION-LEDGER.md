# BJ — ESCALATION LEDGER (the rounds 7-12 discharge)

- **Verified model:** `claude-opus-4-8[1m]` (read verbatim from this seat's system context).
- **Seat:** ESCALATION-DISCHARGE, 2026-07-20. Mechanical, under the lead's class ruling.
- **Scope:** every `§ESCALATED` leg in `FIXLOG-STAB7.md` … `FIXLOG-STAB12.md`. STAB11 escalated
  nothing. **22 legs total; 4 were filed pre-discharged by the lead** (all four verified below — 3
  confirmed and skipped, 1 re-disposed because the stated rationale describes a different leg's
  subject matter), leaving the **18-leg working set** this pass disposed.

## The governing ruling (the lead's, not this seat's)

All of these legs are **one class**: a later cure aiming at a byte string an earlier cure in the
same set already consumed. **The earlier cure's landed text is RATIFIED in every case.** This pass
is SUBSTANCE-PRESERVATION, not re-application:

1. Does the skipped leg carry a **FACT** — a pin, a clause, a cross-reference — that is **not on
   disk in the landed text**?
2. If yes → **FOLD** it in as a marked addition (never a merge of two prose texts).
3. If no → **DISCHARGED-AS-REDUNDANT**, with the grep or read that proves the substance is present.
4. If the fact **contradicts** what landed rather than supplementing it → **ROUTED** to
   `TERMINAL-ROUTINGS.md`, because reconciling two accountings is a lead call on the merits.

**No cure text was re-applied. No two prose texts were merged. Which cure was "better" was never
litigated.** Nothing was minted: the one contradiction became a named routing for the execution
phase, per the standing NO-NEW-MINTING order.

**Freeze:** `ASK.md` and `ASK-REDUCTION.md` were **not opened for write** by this pass. Zero rows
renumbered, reworded, merged, or re-scoped. Pending owner rulings were left pending — none was
treated as a finding.

---

## Tally

| disposition | legs |
|---|---|
| **FOLDED** (a fact was preserved into the ratified text) | **3** — 2 from the working set + STAB8 E-2, re-disposed from the pre-discharged group |
| **DISCHARGED-AS-REDUNDANT** (substance proven already on disk) | **12** |
| **ROUTED** (substantive fork → `TERMINAL-ROUTINGS.md` R-6) | **4** |
| **VERIFIED PRE-DISCHARGED** by the lead (checked, not re-opened) | **3** |
| **total** | **22** |

The 18-leg working set splits **2 FOLDED · 12 DISCHARGED-AS-REDUNDANT · 4 ROUTED**.

Open escalations after this pass: **0.** Open *rulings* owed to the lead: **1** (R-6, an accounting
fork, not a defect).

---

## Pre-discharged by the lead — verified on disk, skipped

| leg | the lead's disposition | verification |
|---|---|---|
| STAB7 #12 (ledger H4) | cure 4 RATIFIED, three facts FOLDED | **CONFIRMED.** `LEAD-AMENDMENT-LEDGER.md:81` carries the `**[LEAD FOLD 2026-07-20 …]**` bracket with all three: the engage-bank pin **`224024c3`**, "the rim retune **may merge without a further paint gate** on the rim itself", and "the un-owned WebKit arm … IS ledger **K7's named non-goal**" — K7 itself present at `:125` |
| STAB7 #17 (disposition `:70-72`) | MOOTED by Addendum 3 | **CONFIRMED.** `coordination/ATLAS-Q-G-BATCH-DISPOSITION.md:80` = "Addendum 3 — TERMINAL: the deferral is lifted, the hold ends, G-CLOSE is UN-GATED"; `:66` stamps the prior block "Read Addendum 3 as terminal". The leg argued the phrasing of a gate that no longer exists |
| STAB8 E-1 (cure 6a, ledger I1) | MOOTED by Addendum 3 | **CONFIRMED.** Same basis — I1's G-CLOSE grounding is superseded wholesale by Addendum 3, so both candidate re-groundings are moot |
| STAB8 E-2 (cure 8, ledger H3) | filed as MOOTED by Addendum 3 | **RATIONALE DOES NOT FIT — leg re-disposed as FOLDED below.** E-2 is an H3/§R-4 text about the X2 §8.1/§8.2 register rulings; it phrases no gate and touches G-CLOSE nowhere. Verified `grep -n "DISSOLVED-PENDING\|DISSOLVED OUTRIGHT\|anti-taffy" LEAD-AMENDMENT-LEDGER.md` = **0** — the substance was genuinely absent. Handled under the general class ruling (fold the fact, ratify the landed text), which is additive and re-litigates nothing. Flagged here for the owner rather than dropped |

---

## The 18-leg working set

### FOLDED — 3

| # | leg | the fact that was NOT on disk | where it landed |
|---|---|---|---|
| 1 | **STAB8 E-2** — cure 8, `LEAD-AMENDMENT-LEDGER.md` row H3 | The §R-4 dispositions themselves. The ratified cure-4 text says only that the register rulings are "distributed across W-1/W-5/W-6"; it never states **what was ruled**. Verified real at `IOS27-MICRO/passes/PASS-3/CHARTER.md:94-115` §R-4 — a finer pin than the cell's own `:12-13`: §8.1 **DISSOLVED-PENDING** (no bound-compression register until F1 OG1's −21% re-grade; travel-squish fence stands), §8.2 **DISSOLVED OUTRIGHT** (MARKS C1 voided the springback bracket, C2 killed the 32-33% class at measured 1.3%/0.8% zero-seed per `MARKS.md:391-393`; the `[0,10%]` header fence stands whole; out-of-fence overshoot lives in the velocity-seeded displacement domain, never a timing function), and the one executable remainder — the refuted `scheme-spring.css:31` dock header — owned by **FINAL W-1** under the one-owner-per-file seam (independently corroborated on disk at `FINAL.md:32`) | `LEAD-AMENDMENT-LEDGER.md:80`, appended to the DISCHARGED cell as a dated `**[FOLD …]**` bracket — exactly the additive form cure 8's own author recommended ("not a re-replacement"). The DISCHARGED status and every word of cure 4's text are byte-untouched |
| 2 | **STAB9 #11** — duplicate of cure #1, `IOS27-MICRO/FINAL/FINAL.md:100` | The **FREEZE-TENSION** clause: an owner re-gate of G-CLOSE must re-ground **all four** seams in one stroke — this bracket, ledger I1, the `EXECUTION-PROGRESS.md` Veto/held row, and Addendum 3 — **never partially**. Proven absent: `grep -rn "never partial\|FREEZE-TENSION\|re-grounding must be total\|reverse re-grounding"` across `BJ/` and `IOS27-MICRO/FINAL/` (excluding `stability/`) = **0 hits**. Each of the four sites carries its own local "owner-reversible" clause; **none states that the reversal is atomic across them**, which is the whole content of the missing fact | `FINAL.md:100`, appended after the ratified STAB9 bracket. Cure #1's text is byte-untouched |
| 3 | **STAB10 #9** — duplicate landing, `EXECUTION-PROGRESS.md` PARKED list | Two facts, both absent from cure 4's landed bullet at `:87`: (i) **no other bullet covers W6/W7** — the ASK-gated bullet above does not reach them (their gate is not an `ASK.md` row at all) and P-EX2 reaches them only by band membership, which `TERMINAL-ROUTINGS.md` R-3 says a PARKED bullet un-schedules; (ii) the **grep-scale citation** — `ASK.md` = 27 rows, `ASK-REDUCTION.md` = §A1/§A2 · §B1-B5 · §C1-C4 · §D1. The landed bullet asserts "grep = 0 in both" but never states the scanned surface, so the negative result was unauditable | `EXECUTION-PROGRESS.md:99-107`, appended to the landed PARKED-UNROUTABLE bullet. Cure 4's text is byte-untouched; no second bullet was created, which is the defect STAB10 refused to author |

### DISCHARGED-AS-REDUNDANT — 12

| # | leg | proof the substance is on disk |
|---|---|---|
| 4 | **STAB9 #12** — dup of cure #2, `EXECUTION-PROGRESS.md:78` | `:78-86` carries the full "Veto/held: **NONE** as of 2026-07-20" row: `V-PERCH-PRIMITIVE` UN-PARKED, mailbox **RESUMED**, ruling of record Addendum 3, all six G-row destinations enumerated, owner-reversible clause intact. Both texts asserted this identical state. The leg's own paired-application condition ("both or neither") is satisfied — its partner pair #1/#2 landed together |
| 5 | **STAB10 #8** — dup of cure 6, ledger `:137` | `:137` reads `- **PROPOSED-ROUTED (J1 · J3 · J5 · K1 · K4 · K5 · K6).**` — J2 struck, with the STAB10 membership-correction bracket. Cure 8's only additional content was an *instruction* ("leave `:146-147` untouched"), not a fact; verified satisfied — `:146-147` is intact |
| 6 | COMP M-1 leg 3 — `BAND-GATES.md` §Design heading | Now `:278`: "**three gates, one wave (vitest-fs per the RULED OPEN-1; the refract arm is the one Playwright exception)**". The landed COHERENCE text already names the Playwright exception explicitly, which was the leg's substance |
| 7 | COMP M-2 leg 1 — `BAND-MATERIAL.md` "Seven waves:" | `grep -c "Seven waves:"` = **0**; `:48` reads "EIGHT waves (W8 minted 2026-07-20, STAB11 — the second shipped 7.0.0 defect)" |
| 8 | COMP M-2 leg 2 — a second Wave-8 roster row | Roster carries exactly one W8 row, `:59`, with the 0.0748-sharp / 0.0018-frosted evidence pair. A byte-exact application would have authored the duplicate |
| 9 | COMP M-2 leg 4 — `BAND-MATERIAL.md` in-scope summary | `:886` closes with "the WebKit `@supports` gate-lie replaced by a runtime latch, with the born-RED `refract-lens-never-sharper` lock flipped GREEN on the video-path capture (W8)" |
| 10 | COMP M-3 leg 1 — APOTHEOSIS `\| BAND-MATERIAL \| 7 \|` | Moot **and** superseded: the de-duplication pass replaced the count ledger with a pointer table. `:57` now reads `\| BAND-MATERIAL \| \`BAND-MATERIAL.md\` \| … \`BJ.W-REFRACT-LATCH\` owns the second shipped 7.0.0 defect \|`. The stale count no longer exists anywhere to be wrong |
| 11 | COMP M-3 leg 2 — APOTHEOSIS `\| **Total** \| **47** \|` | Same restructure: `grep -n "Total" APOTHEOSIS.md` = **0**. Wave counts now live once, in the band files |
| 12 | COMP M-3 leg 4 — a second MATERIAL W8 phase-2 clause | `grep -n "BJ.W-REFRACT-LATCH" APOTHEOSIS.md` = 2 hits (`:57` pointer row, `:112` phase 2) — one clause, correctly seated |
| 13 | COMP M-1 leg 4 — a second `(D) gate:refract-lens-never-sharper` clause | One (D) clause on disk, `:330-337`. The leg's own disambiguator was already self-refuted (STAB12 recorded that its stated identifying condition stopped holding once (D) landed) |
| 14 | COMP M-1 leg 6 — a second refract §Acceptance born-RED bullet | `grep -c "0.0748" BAND-GATES.md` = **2** — the (D) clause and the acceptance bullet, i.e. the intended pair, not a duplicate. The evidence numbers the leg carried are both present |
| 15 | COMP M-4 leg 1 — `EXECUTION-PROGRESS.md:61` P-EX2 | Cured by COH M-7 and then absorbed by the de-duplication pass: `:61` now schedules **by band membership** rather than by wave range, and names `BJ.W-REFRACT-LATCH` with its GATES-W3 edge. The leg's substance — W8 must appear in a phase — is on disk twice over |

### ROUTED — 4 (all one fork, → `TERMINAL-ROUTINGS.md` **R-6**)

These are the only escalated legs whose skipped text **contradicts** rather than supplements what
landed. Folding them would author the split-truth the STAB rounds existed to cure, so each is routed
whole. This is STAB12's ESCALATION NOTE 1, re-homed from a FIXLOG into the routing register.

| # | leg | the contradiction |
|---|---|---|
| 16 | COMP M-1 leg 8 — the keep pin | landed: keeps **≤51** with the refract gate counted **inside** the census base (`BAND-GATES.md:108`, `:359`, `:557`). The leg: keeps unchanged at **≤52**, gate **outside** the base |
| 17 | COMP M-1 leg 9 — the base definition | `:107` and `:537` both still read that Playwright pixel floors sit "**outside** the vitest base"; the landed arithmetic counts a gate its own (D) clause at `:338` calls "**NOT** vitest-fs — a Playwright/WebKit paint probe". Half-migrated accounting |
| 18 | COMP M-3 leg 3 — APOTHEOSIS standing-gate arithmetic | the same fork expressed as `GATES W3 (3)` with the keep pin absorbing the lock, vs `GATES W3 (2 vitest + 1 Playwright)` with the guard unaffected |
| 19 | COMP M-1 leg 5 — the instrument path | the leg names `tests/gates/refract-lens-never-sharper` (vitest dir); the landed §Work bullet at `:365-368` names `tests-visual/refract-lens-never-sharper.spec.ts` (Playwright dir) — `grep -c "tests/gates/refract-lens-never-sharper"` = **0**. The path follows whichever accounting the lead rules, so it cannot be settled independently |

**Why this is smaller than STAB12 feared.** STAB12 flagged the fork at five sites. The subsequent
de-duplication pass collapsed the second copy of the decomposition — `BAND-GATES.md:539` records
that the duplication "is how the ≤52-vs-≤51 and 2-vs-3 drifts propagated" — so the fork is now
**single-sited** at `BAND-GATES` W1 §Design. R-6 states both options and the coupled path sub-arm,
and requires them ruled **in one stroke**.

---

## Verification

- **Files edited by this pass — 4**, all documentation, all inside `docs/tranches/`:
  `BJ/formation/refable/LEAD-AMENDMENT-LEDGER.md` (H3 fold) ·
  `BJ/EXECUTION-PROGRESS.md` (PARKED fold) ·
  `IOS27-MICRO/FINAL/FINAL.md` (FREEZE-TENSION fold) ·
  `BJ/formation/stability/TERMINAL-ROUTINGS.md` (R-6) — plus this ledger.
- **Zero source files touched. Zero waves minted, moved, re-scoped, or renumbered. Zero gate
  definitions changed. Zero census figures moved** — R-6 is a routing, and it explicitly leaves the
  ≤51/≤52 pin exactly where the tie-break left it.
- **Every fold is additive**, appended after ratified text inside a dated bracket that names the leg
  it preserves. No ratified sentence was reworded or deleted; no two prose texts were merged.
- `ASK.md` / `ASK-REDUCTION.md`: **not opened for write.**
- The tree is left **uncommitted**, as ordered.
