# PT-6 — ADVERSARIAL CRITIQUE (Pass 1)

**Role:** adversarial-critique · **Target proto:** `pass-1-proto-PT-6.md` · **Date:** 2026-06-30 · **Branch:** tranche/BG · **HEAD:** `4c761b64`
**Verdict on the proto:** DIRECTIONALLY CORRECT on the three mechanisms, but the HEADLINE feasibility claim ("mid-tranche aggregates green-able after the trio re-tag") is **FALSE at HEAD**, and the §1/§3 coupling, the recommended catcher gate, and the CLAUDE.md doc-home each carry a concrete unresolved defect. Convergence ≈ 56%.

All findings below were re-derived by RUNNING the gates this pass, not by re-reading the proto.

---

## A · The §3 over-claim — `--run ci` is NOT green-able after the trio re-tag (the central crack)

The proto's §3 thesis: re-tag `proof:ba-gestalt` + `proof:ship-attestation` (+ planned `proof:close-sweep`) to `["release"]` and "`--run ci` and `--run local` are GREEN-able mid-tranche." Its own **check 5 hedges** this ("If `--run ci` still reds after the re-tag, enumerate the remaining red gates"), but the VERDICT presents it as settled. I ran the enumeration the proto deferred. The trio is **not exhaustive** — at least TWO more ci-tagged gates hard-exit `--run ci` at HEAD, independent of the trio:

| Gate | ci-tagged? | Status TODAY | Why the trio re-tag does not touch it |
|---|---|---|---|
| `proof:tag-parity` | yes (in `gatesFor('ci')`) | **RED (exit 1)** — `proof:category-card-warm` is a static src-scan gate silently `["local"]` | a wholly unrelated mis-tag; `--run ci` hard-exits here regardless of ba-gestalt |
| `proof:consumer-staleness` | yes | **RED (exit 1)** — "72 UN-ledgered stale glass-ui imports across the constellation" | a cross-repo/sibling-state class (mid-dev-normal, like the release-only oracles) the re-tag does not address |

`runMode` hard-exits at the FIRST red (`gates.mjs:2329-2336`), so `--run ci` halts at whichever of these falls earliest in manifest order — the trio re-tag changes nothing about that halt. **The proto's headline ("the per-push/dev aggregates green-able so the cadence has a real green signal") does not hold at HEAD.** I sampled only a handful of the ~300 ci gates; there may be more.

**What the proto must do:** either (a) actually run the full `--run ci` enumeration, classify EVERY structural/mid-dev red (`category-card-warm` mis-tag → promote/justify; `consumer-staleness` → is it a real bump-blocker to fix, or a sibling-absent class that should be release-only/justified like `peer-conformance`?), and fold each into the fix; OR (b) DOWNGRADE the §3 verdict from "aggregates green-able" to the truthful "the trio's born-RED **close-oracle poison** is removed from the per-push/dev sets; residual non-trio reds are a SEPARATE enumeration this fix does not close." As written, §3 promises a green CI badge it cannot deliver — which would re-incarnate the exact "the binding bar names an unmeetable aggregate" defect §3 is fixing.

> Knock-on: the proto's **check 3** ("`npm run proof:tag-parity` GREEN after the allowlist edits") is **unsatisfiable at HEAD** — tag-parity is already RED for `category-card-warm` (out of PT-6's scope). PT-6 must declare this an explicit precondition or check 3 is dead-on-arrival.

---

## B · §1+§3 are MORE coupled than §4 admits — the re-tag, landed first, RE-INTRODUCES the disease

§4's ordering note: *"The `ready()` fix and the per-band trigger are independent of the re-tag and can land first … the three re-tags → the re-emit → the doc reconciles."* This permits **§3 (re-tag) to land while §1-A (the per-band trigger) is still "the single residual judgement."** That sequence is unsafe:

- TODAY ba-gestalt is born-RED in every aggregate. It carries no *continuous* signal (a born-RED gate in a hard-exit `runMode` HALTS, it does not "carry signal continuously" — the proto itself says so), but it DOES sit as a permanent red reminder.
- After §3, ba-gestalt leaves the mid-tranche sets entirely. The continuous gestalt signal then depends **100% on the per-band `bg-paint.wf.js` trigger** — which §1 establishes **does not exist** ("there is no trigger binding it per-band").
- §6 offers, as the "conservative hold," **"a HALT-and-instruct checkpoint … the orchestrator to invoke"** the paint sweep. A HALT-and-instruct that a human can defer/skip **IS the BB single-terminal-reflect disease** — "nothing painted mid-build and the tranche shipped broken because the terminal sweep … never blocked the tag." Removing the red reminder (the re-tag) WITHOUT first binding a non-skippable per-band signal is **strictly worse** for disease detection than HEAD.

**The fix:** §3 must be GATED on §1-A landing as a **hard engine HALT** — the frontier cannot advance past a band boundary while that band's `[P]` waves are un-painted. "Auto-invoke vs HALT-and-instruct" is NOT a free residual judgement; only a mechanism that the engine ENFORCES (not the orchestrator remembers) satisfies the precept. Re-order §4 so the re-tag follows (or co-lands with) the bound trigger.

---

## C · §1-A and §2 are in direct tension — the BUILT-widen removes the backpressure the per-band HALT needs

The proto treats §2 (`ready()` BUILT-widen) and §1-A (per-band trigger) as independent. They fight:

- §2 explicitly lets "the build race **arbitrarily far ahead** … while paint accumulates **unboundedly**" (proto §1's own words). Before §2, a successor preconditioned on a `[P]` wave naturally STALLED at the paint boundary — a crude but real per-band backpressure.
- §1-A's per-band HALT must therefore be ADDED as new engine logic — it does NOT fall out of the post-§2 `ready()`/`composeBatch` loop (there is no band-boundary predicate in `bg-bh-execute.wf.js` today; `interleaveReady` gates BH-on-BG, not BG-band-on-paint). The proto names the unbounded race but never specifies the band-boundary HALT predicate that re-imposes the backpressure §2 deletes.

So the dependency chain is `§2 (race-ahead) → makes §1-A (per-band HALT) load-bearing AND harder → which §3 (re-tag) depends on for the disease-floor`. The legs are a chain, not three independent edits. §4's "can land first / independently" is wrong for §1-A relative to both §2 and §3.

---

## D · §2 is a safety TRADEOFF the proto frames as a pure win

The pre-fix stall is **conservative safety**: a successor never builds on un-painted source. The fix loop (verified: `bg-bh-execute.wf.js` paint-FAIL → `w.status='PENDING'` → "re-implements at root"; `engine-design.md` `fixLoop`) means a PAINT-PENDING wave whose paint LATER fails is **re-implemented at root** — so a successor built on its `[paint-pending]` source is built on **possibly-doomed source**. The proto's mitigation is a **soft process note** in the FIX-agent prompt ("note any successor whose source the re-implementation moves"). That is agent-judgement, not a structural guard, and its "bounded by per-band cadence" bound is only real IF §1-A is bound (loops back to B/C). The G7 auto-revoke re-shoots changed PAINT bytes at the cut, but it does not re-VALIDATE a successor's BUILD correctness against re-based predecessor source. PT-6 should state §2 as a deliberate "build-on-landed-source, paint-async" tradeoff with the rebase risk owned, not a pure correctness win.

---

## E · The recommended catcher gate creates a NEW friction-class of the same shape it fixes

§3's "standing catching gate": extend `proof:tag-parity` with a NEGATIVE clause — *"any gate whose note declares it born-RED-by-design … MUST NOT carry `ci` or `local`."* I tested this against the live manifest:

- `proof:visual-runner` carries **`["local","ci"]`** and its note **matches `/BORN-?RED/i` = true** ("BORN-RED by design (the suite ran nowhere)…").
- visual-runner is a LEGITIMATE ci gate — its born-RED is **reported-in-facts (exit 0)**, NOT a hard-exit poison (the proto's OWN check 5 relies on this: "`proof:visual-runner` … already exits 0 by reporting-in-facts, so it does not poison the aggregate").

A naive note-text negative clause would **FALSE-POSITIVE on visual-runner** — recreating exactly the "static classifier flags a legitimately-tagged gate" friction the whole PT-6 fix is unwinding. The clause MUST distinguish **born-RED-hard-exit-poison** (must be release-only) from **born-RED-reported-in-facts/exit-0** (ci-legitimate). The proto's wording does not; this refinement is a hard precondition of the catcher recommendation, not an optional polish.

---

## F · CLAUDE.md:20 is the wrong doc-home — it collides with BH's hard-delete + redistribution

The proto routes the §3 ba-gestalt tag-intent reconcile to `CLAUDE.md:20` ("CLAUDE.md is parent-tracked, correct home"). But **BH B4f hard-deletes CLAUDE.md** (`docs/tranches/BH/PLAN.md:28,93` — "Hard-delete, no replacement … the absolute last act after WS12"), and BG+BH cut **jointly as 5.0.0**. Two problems:

1. **Ephemeral churn:** the CLAUDE.md:20 edit is deleted by B4f at the joint cut — transiently correct during the BG window, but thrown away.
2. **Real loss risk:** BH B4b **redistributes CLAUDE.md's live contracts** before deletion (`PLAN.md:28` — "The live CONTRACTS still redistribute first"). The ba-gestalt `[local]→[release]` tag-INTENT is one such contract. If B4b's redistribution snapshot is taken against the OLD `[local]` text (or omits the tag-intent), the corrected `[release]` intent is LOST at the delete. PT-6's reconcile must target the **B4b redistribution home** (or coordinate the corrected text INTO B4b), not the `CLAUDE.md:20` line that evaporates. The proto's "correct home" claim does not reckon with the imminent deletion.

---

## G · Where the proto is SOLID (so the critique is proportionate)

- **Close-gating preservation is sound.** `gatesFor("full")` = `local ∪ ci ∪ release` (verified in source), a `["release"]` gate stays in `full`, and `release.yml` runs `--run full` — so the re-tag loses ZERO close coverage. This leg holds.
- **The stall diagnosis is real + live.** 3.1 (`3857b33`) and 3.6 (`cd9ce46`) are PAINT-PENDING NOW (`EXECUTION-PROGRESS.md:102,107`); `ready()` requires `=== 'DONE'`. The `BUILT={DONE,PAINT-PENDING}` widen is correct in spirit (modulo D's tradeoff framing). The `allDone`→`allBuilt` companion widen (`:87`) is correctly identified.
- **The decoupling has a real benefit.** `bg-paint.wf.js` IS on the tranche/BG frontier (8952 B, committed — not just a worktree), is generic (reads the live `[paint-pending]` set), and carries the `PipelineValidate` C-SAFARI once-before-fan-out keystone + a hard-STOP on a blocked Safari path. KEEP-decoupled is defensible; the in-cycle judge lacks the keystone.
- **The precedent exists.** `proof-tag-parity.mjs` records ay-final/az-reflect/ba-final/peer-conformance as release-only born-RED oracles "so the aggregates complete." NOTE the nuance the proto overstates: tag-parity's ba-gestalt allowlist entry (:97) is **stale PROSE** ("untagged so aggregates complete") — tag-parity does NOT currently RED on the live `[local,ci,release]` tag (it's green on that axis; the live RED is the unrelated `category-card-warm`). So "tag-parity already documents the contradiction" is half-true: the comment contradicts the tag, but nothing ENFORCES it — which is precisely why the catcher gate (E) is needed.

---

## H · Minor

- **Null-guard count.** `bg-paint.wf.js` has **4** un-guarded `await agent(` calls (`pp`, `pipe`, the `batched(...)` verdicts, `report`), not 3; `pp.waves` is also dereferenced in `batched` and the blocked-return `pp.waves.map`. PT-3 must guard all of them, not 3.

---

## Convergence: ≈56%

The skeleton (three mechanisms, close-gating preservation, the BUILT-widen, KEEP-decoupled) is right and source-grounded. But the **headline §3 feasibility ("aggregates green-able") is false at HEAD** (A), the **re-tag re-introduces the disease unless §1-A is a bound hard-HALT that §4 lets be deferred** (B/C), the **catcher gate false-positives on a legit gate** (E), and the **doc-home collides with BH's delete** (F). These are amendable, but they are substantial reworks of the proto's ordering and three of its sub-recommendations — not polish.
