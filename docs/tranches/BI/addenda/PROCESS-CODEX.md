# PROCESS-CODEX — the BI natural experiment and how the next tranche runs

BI.W-Q070's deliverable. One document, no ceremony. It records what the BI tranche taught us
about our own orchestration — planning and execution both — so the next tranche inherits the
lessons instead of re-paying for them. Source: the process meta-lens (`reports/process-lessons.md`),
the finding registry (families A/B/J), the ledger verification (`reports/ledger-verify.md`).

Jargon defined once, here: a **wave** is one unit of tranche work (one spec, one commit). **π**
(pi) is captured paint/render evidence — a screenshot or measured motion trace proving a visual
claim. A **gate** is a check that must pass for a wave to land. **Pole A / Pole B** name the two
opposite execution styles BI ran back-to-back (below). **REBOOKED-ORPHAN** is a chronic item whose
listed owner was a future close-wave that never ran — a routing label mistaken for a delivery.

---

## 1. The two-pole verdict: rigor vs rigor's representation

BI ran two opposite styles on one product, back-to-back, and both are on the record.

**Pole A — maximal rigor (the Perfected-BI formation).** 134 waves, receipts, a disk cursor, one
fail-closed verifier, a DAG path-calculus, a repair-lease transaction type, 35 root precept
amendments. The user abrogated it after TWO waves — the machine delayed publication without ever
exercising product behavior.

**Pole B — maximal velocity (the conventional band).** ~66 unreceipted commits in ~19 hours. It
delivered a large amount of real product: the MS structure flatten, motion retuned to the measured
iOS-27 bands (dock 0.30/ζ0.82, drawer {0.32,0.80}, tempo=1.0, the CSS/JS spring parity fix), the
component apotheoses, three published majors. But it silently dropped every π/paint pass, every
consumer outbound, the gestalt ledger, the chronic meta-gates, and the release preconditions — and
it orphaned eight disease clusters (this audit's FAM-A).

The coupling failure, stated plainly: **the cost was never rigor. It was rigor's representation** —
process-ceremony welded so tightly to product-verification that abrogating the ceremony took the
product checks down with it. π, the consumer ACKs, and the FINAL projection were preconditions
*inside* the cursor contract (FAM-B / F-8); killing the cursor dropped them without a sound. They
should have been free-standing product checks that survive the machine's death.

The concrete incidents behind that sentence:
- **Protocol death, silent vacuity.** The receipt/cursor protocol was abrogated after P001 by user
  order. The enforcement layer did not fail loudly; it became vacuous. 67 later commits bypass the
  hook, which still invokes the abrogated verifier rather than any product check.
- **Retro-stub status lies (F-5).** The 134 wave specs were overwritten in-flight with retro-stubs.
  P044 and P059 self-declare DONE / "native accepted" while their deliverables sit uncommitted with
  zero π. The evidence artifact was written before the evidence existed.
- **The REBOOKED-ORPHAN disease (F-6).** 5 of the 8 TAIL promotion rows — A1, A2, D1, D2, E1 — route
  to future close-waves (#92/#93/#95) that never ran. "OWNED — BI.W-<x>" is a routing label, not a
  delivery receipt. A1 is the sharpest: it was the `no-orphaned-wave-claim` meta-gate itself — the
  gate whose absence let the doc-done/tree-no disease go undetected was itself one of the orphans.
- **The close-class record.** The ledger scores it exactly: 5/8 promotion rows REBOOKED-ORPHAN, plus
  the AY reshoot, the π visual-runtime lane, Safari/Metal device cert, the story-language and ci.yml
  enforcement rows — all routed to a dead close-wave, all shipped-past in 6.0.0.

---

## 2. KEEP — what demonstrably worked (each with its evidence)

- **Born-RED product gates as differentials.** Every chronic chain that got a *real* product-coupled
  tooling gate stopped slipping (audit:stash, story-language, disposition-live). The B-band landed
  90+ waves this way, per-wave commit, and they hold at HEAD (G1 SRC-restructure, TABS-FACTOR,
  ESC-STACK all DONE-VERIFIED). The discipline works when the gate gates a product behavior.
- **Measured reference ladders.** The iOS-27 bands were numbers, not vibes, and Pole B landed to
  them: the dock spring moved 0.68/ζ0.64 → 0.30/ζ0.82 in-band, and the ~5× CSS/JS spring parity
  break was fixed by feeding the 2%-settle horizon. A measured spec (the √φ proportion canon,
  likewise) survived even a protocol collapse.
- **Adversarial two-consecutive-clean.** This audit is the proof. Refute-default critics caught a
  fabricated consumer pin (muster/words depend on glass-ui not at all), a false defect (eyeglass
  "absent" — it is the shipped pill default), and a mis-channelled leak claim. Cheapest,
  highest-yield element in the whole process.
- **Single-writer, phase-local closure.** BD shipped 158 waves under continuous single-writer
  ownership; BG proved that fan-out without durable integration produces repeated work and zero
  commits. Ownership singularity is real signal.
- **The chronic ledger as an instrument.** It tracked 47 rows across 20 tranches, and this audit
  could verify them row by row. The ledger did its job; the failure was owners not running, not the
  ledger. Keep the instrument.
- **Withholding the favored narrative.** Round-1 lanes, denied the success story, independently
  converged on the protocol-death finding instead of rationalizing a clean close. Independence
  caught what a briefed fleet would have talked itself out of.
- **Durable state outside the wipe zone.** The 2026-07-13 reboot wiped /tmp and destroyed the prior
  state file plus all builder reports. This audit put its state in `~/.claude` — survives reboot —
  and never lost a step across the walls it hit.
- **≤3-concurrent rate-wall discipline + resume-by-id.** Fleets ran three agents at a time, opus for
  mechanical fanout, and every workflow was resumable by runId. Walls became pauses, not restarts.
- **The coordination mailbox convention.** `docs/tranches/BI/coordination/` is the established,
  low-friction channel between agents (the INBOUND-MARKS / valuejs-inbox files). It let this
  read-only audit relay defects to the active codex agent without touching its transaction.

---

## 3. FAIL — what cost more than it returned (named mechanism, not blame)

- **Meta-gates and proof/gate scripts — user-ruled contrivances.** The ruling, verbatim and binding:
  > meta-gate, proof: scripts, are likely FULL contrivances and should be abrogated wholesale unless
  > AGGRESSIVELY proved otherwise. I've only ever seen them to bloat CI/CD times as they guarantee
  > essentially nothing.

  The evidence agrees: the 403-gate census found 277 commands that "cannot by themselves establish
  the browser property now associated with them" — false, partial, ceremony, and coercive-shape
  oracles. Even the consolidation-to-40 reenacted the disease, count-locked. Mechanism: a
  *ceremony oracle* proves a story, not an invariant.
- **The receipt/cursor/transaction protocol.** Mechanism: *friction without product-exercise* — the
  user's exact complaint. It verified tranche bookkeeping and never a rendered behavior; it was
  abrogated after two waves and bypassed by 67 commits after.
- **Obligation-index machine-routing without enforcement.** 273 prompt rows + 291 coordination rows
  machine-routed to P-wave owners — and then the owners did not run and nothing checked that they
  had. Routing is not delivery; a routing table with no liveness check is a slip that hides slips
  (F-4).
- **Always-last sequencing (the tail).** Mechanism: *terminal batching* — π, ledgers, ACKs, and
  FINAL pushed to a tail whose serial critical path exceeds the session envelope, so it never
  arrives.
- **Silent count/pin drift under a live tree.** Numbers pinned at audit time (husk counts,
  carrier-file counts, the composables/motion file list) drift as the active transaction mutates the
  tree. A literal count in a spec is stale the moment it is written; the fix is a re-pin-at-execution
  note, never a hard number treated as durable.
- **The paint-claim inflation class.** "Live-verified" asserted in a commit message without a
  captured DELTA artifact (screenshot + paired π) is not verification — it is the F-5 lie wearing a
  verb. A visual claim owes a captured artifact or it owes the word BLOCKED.

---

## 4. The PRODUCT-DEFECT LITMUS (hardened by the gate ruling)

The single test every standing check must pass:

> A check may exist if and only if its RED corresponds to a **user-observable product defect** AND
> it survives aggressive justification. Every other check is deleted, not minted. The default is
> abrogation.

Operationally:
- **The only standing automated layer is the dev toolchain:** typecheck · build (the subpath-export
  policy rides the build, fail-closed) · unit tests. Each RED is a real defect.
- **Paint truth is a pre-tag review lane, never CI.** The demo boots and paints (a look, not a
  script), the visual suite runs once on the candidate, a Fable pass files verdicts. It gates the
  tag, not every commit.
- **One-time RED→GREEN differentials inside a wave commit replace permanent gates.** The wave proves
  its own change once, quotes the differential, and mints nothing standing.
- **Deleted for good, never re-minted:** receipt shape, cursor terminality, enrollment rosters,
  count locks, filename rosters, "N families exactly," self-citing prose checks. The user's
  "abrogate these gates" applies to this set always — never to the product set.

---

## 5. TRIUMVIRATE DISPATCH — the error/uncertainty protocol (planning AND execution)

An anomaly — a smell, a contradiction, a failed probe, a surprise — is classified by its **evidence
grade**, and the grade selects the lane. Grade the *evidence*, not the urgency. Fable adjudicates the
classification; the registry absorbs every dispatch with a terminal disposition. The dispatch is
idempotent: the same anomaly always routes the same way, so a crash or wall resumes cleanly.

| Lane | Trigger (evidence grade) | What it does | Returns |
|------|--------------------------|--------------|---------|
| **RESEARCH** | *Unknown* — the truth is not established | read-only fan-out; gathers evidence | file:line / SHA / measured number; no edits |
| **HARDEN** | *Suspicious* — a "done" or a claim that smells | adversarial; tries to REFUTE (refute-default) | CONFIRMED / REFUTED / CORRECTED + evidence |
| **WAVE-UPDATE** | *Spec-wrong* — the plan states something stale/false (formation-time) | amend the spec/DAG in place; re-run topology | the amended wave + edge diff |
| **MODIFY** | *Small, in-scope, unambiguous* (execution-time) | the owning wave edits directly, one commit | bounded diff + product evidence |
| **ADDENDA** | *New real obligation, out of current scope* | schedule a new wave/fork; never smuggle into the current commit | a born-RED wave row |

**The classification rule (non-greedy):** Unknown → RESEARCH. Suspicious-claim → HARDEN.
Plan-defect → WAVE-UPDATE. Obvious-small → MODIFY. New-and-real → ADDENDA. The greedy failure is
editing directly on an "unknown" grade — it ships an unverified change.

**The N-1 off-ramp law** rides alongside: an agent one step from a wall (session limit, rate cap,
context exhaustion) banks its state to the durable file and exits clean — never mid-write, never
mid-commit. State outside /tmp, resume by runId, ≤3 concurrent. The protocol abrogation itself was a
missing off-ramp: a friction-only process element should be retired proactively via WAVE-UPDATE, not
left to accrete until a mid-flight abrogation takes the product checks down with it.

**Evidence-grade routing** is the other half: a fabrication-suspect claim goes to a non-author
verifier (HARDEN) before it is folded, never straight into the plan.

Each lane is grounded in a real BI incident:
- *Fabricated pins* (muster/words glass-ui dependency) — suspicious → HARDEN → REFUTED. The lane
  exists because a briefed auditor would have propagated the fabrication.
- *Eyeglass "absent"* — suspicious → HARDEN → REFUTED (it is the pill default). Saved a wave that
  would have rebuilt shipped work.
- *Stale repair paths* — a formation-time spec defect → WAVE-UPDATE (project through ancestor
  renames), never a MODIFY, because no source is wrong yet.
- *Dead file / empty husk* — obvious and small → MODIFY.
- *This whole BI-addenda* — new real obligations surfaced by audit → ADDENDA, scheduled, not
  smuggled into codex's live transaction.

---

## 6. Precept amendment PROPOSALS (adopt-first)

These are PROPOSALS against the read-only `~/Programming/precepts` repo. Adoption is the user's act
there; the relay to the active codex agent rides the coordination inbox note (item 9). The
BI-addenda embodies N-1/N-2/N-4/N-6 locally already, as the proving case.

The pattern the whole audit converged on: **every amendment that is a *property law* survives; every
amendment that mandates a *machine* is refuted-as-mandatory and demoted to optional tooling.** That
single cut is the audit's verdict on Pole A.

**Adopt-first (highest confidence):**
- **P-04 — terminal-state type system** (PLANNED / RUNNING / BLOCKED vs DONE / DEAD). Pure
  vocabulary, zero machine; kills the self-judged-done lie (F-5) directly. Adopt first.
- **N-1 — the off-ramp law.** Every process element must be abandonable without dropping a product
  obligation; product checks (π, ACKs, FINAL) are free-standing, never welded to a verification
  machine; a friction-only element is retired proactively.
- **N-2 — owner-liveness.** A chronic's owner MUST be a wave in the *current* tranche. A future
  close-wave is not an owner; routing to one is the re-booking disease and is RED at formation.
- **N-3 — postmortem humility.** A retrospective written from one pole must be scored against the
  *other* pole's evidence before its prescriptions become law. Single-pole learning prescribes more
  of the pole that failed.
- **N-4 — durable-state fence.** Orchestration state lives outside the wipe zone (never /tmp) and
  outside the product tree, with resume-by-id and ≤3-concurrent as standing wall-recovery. (Newly
  proposed as a precept, not merely embodied.)
- **N-6 — the product-defect litmus for gates.** A gate may exist iff its RED corresponds to a
  user-observable product defect; every other gate is deleted, not minted. Operationalizes the
  user's "abrogate these gates if possible."
- **N-5 — codified triumvirate dispatch.** §5 becomes canon: classify by evidence grade; Fable
  adjudicates; the registry absorbs each dispatch terminally.

**Property laws that survive from the existing 35** (adopt as laws, refuted only if minted as
commands): P-19 (π schema as a per-claim checklist, not a cursor field — the one thing Pole B
dropped that hurt most), P-23 (evidence follows the claim, not the tail), P-24 (inert public no-op =
API defect), P-28 (consumer evidence excludes tests/paths/sibling demand), P-35 (false-affordance
law), P-11 (substrate needs a real consumer), P-01/02/03/09/12/14 (anti-tail + anti-rebooking law),
P-26/P-30/P-31/P-32/P-34 (product-predicate gate laws).

**Refuted-as-mandatory → demoted to optional tooling:** P-05, P-21, P-22 (repair-transaction /
repair-lease / path-lifecycle calculus — this *is* the friction the abrogation rejected; keep only
the formation-time discipline of projecting repairs through ancestor renames) and P-10, P-17, P-20
(cursor transaction / CANON.json+validator / one cursor-derived verifier — the receipt machine that
was abrogated in practice; keep the *idea* of disk-durable state as optional, never a close
precondition).

---

## 7. Execution-prompt deltas (quoted verbatim, each with its why)

These edit the seeded orchestration prompts. Adoption is a root-repo act; they are proposed here so
the change is one copy-paste, not a re-derivation.

```
TRANCHE-FORMULATION.md — Return contract. Add:
  "A gate whose RED does not correspond to a user-observable product defect is forbidden —
   delete it, do not mint it (N-6). Every chronic owner is a wave in THIS tranche; routing to a
   future close-wave is RED (N-2)."
```
Why: closes the two disease classes the ledger measured — contrived gates (N-6) and REBOOKED-ORPHAN
owners (N-2) — at the point they are born.

```
TRANCHE-FORMULATION.md — Standing edicts. Add a fifth edict:
  "The off-ramp law (N-1): product obligations (π, consumer ACKs, FINAL) are free-standing checks,
   never welded to a verification machine. A process element that imposes friction without
   exercising product behavior is retired proactively, not abrogated reactively."
```
Why: prevents the F-8 coupling failure — the exact mechanism by which killing the cursor dropped π
and the ACKs silently.

```
TRANCHE-FORMULATION.md — Orchestration. Add:
  "Triumvirate dispatch (N-5): classify every anomaly by evidence grade and route to
   RESEARCH (unknown) / HARDEN (suspicious claim) / WAVE-UPDATE (spec-wrong) / MODIFY (small+in-scope)
   / ADDENDA (new+out-of-scope). Grade the evidence, not the urgency; the greedy shortcut of editing
   on an 'unknown' grade is forbidden."
```
Why: makes error triage idempotent and crash-safe, and forbids the greedy edit that ships unverified.

```
DESIGN-ITERATION.md — Convergence. Add:
  "Clean is defined against the product-defect litmus, not gate-green: a pass is clean when
   no surviving finding names a user-observable defect. Process-gate churn does not block convergence."
```
Why: stops process-gate noise from blocking a genuinely-converged design, and stops gate-green from
masquerading as clean.

```
Both prompts — a standing preamble line (the meta-lesson):
  "The cost to avoid is not rigor but rigor's representation: keep every check that exercises
   product behavior; delete every check that verifies bookkeeping. Score all rigor on four axes —
   friction, lie-prevention, velocity, blast-radius — never on lie-prevention alone (N-3)."
```
Why: the spine of this whole report, placed where every future tranche reads it first.

---

## 8. Handoff

- Band 1 (paint truth) already embodies N-1: free-standing π and boot checks, welded to nothing.
- Band 5 (enforcement) is the N-6 cut applied: wire the product gates, delete the process gates.
- Band 6 (chronic terminalization) is N-2 applied: every REBOOKED-ORPHAN gets a *current* owner.
- This document and the triumvirate protocol ride the codex inbox note as the process relay,
  answering the user's "bear fruit for our own knowledge" and "relay to them" marks.
