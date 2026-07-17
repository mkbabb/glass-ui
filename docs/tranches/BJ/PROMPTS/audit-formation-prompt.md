# Tranche formulation: the post-tranche audit and next-tranche development prompt

Saved verbatim from the user's 2026-07-17 order. This is the standing charter for the BJ
formation and for every post-tranche audit hereafter.

---

This is NOT an implementation phase. Tranche development only. No source edits land from this prompt. The deliverable is the next tranche, fully formed: plan folder, wave specs, gates, dispositions.

## Mission

DEEPLY audit our original plan and the waves thereof, alongside all changes made hitherto, with 32 agents. Devise the path forward: audit the landed changes and the remaining plan; recapitulate our original prompts, plans, and precepts; verify every one has been addressed or carries an explicit ledger row with an owner. Form the next tranche from what the audit surfaces.

## Standing edicts

- NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product; architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable.
- NO legacy code. Clean breaks: no aliases, no migration shims, no dual paths, no masking fallbacks.
- Delineate every chronically deferred item and every deferred item and fold them into this tranche as DECIDED rows: build, fold, or retire with rationale. Re-booking is forbidden. A chronic that has ridden two or more closes un-decided is a disease row, and deciding it is a wave of its own.
- Recap ALL of our prompts and requests hitherto and ensure they've been addressed. An unaddressed ask becomes a registry row with an owning wave. Silent drops are forbidden.

## Orchestration

Treat the 32 agents as a steerable budget. Assignment follows the registry, round over round; leave no lens permanently staffed.

- Open with a genuinely diverse portfolio of audit lenses: plan-vs-landed diff, gate soundness (can each gate actually fail?), gestalt read against per-mechanism PASS, the chronic and disposition ledgers, prompt-recap completeness, consumer truth (import graph and registry both), performance, accessibility, doc and canon drift, dead-code and dual-path census, cross-repo asks and consumes.
- Withhold the tranche's favored success narrative from most auditors. Independence in the early rounds keeps the fleet from converging on a confirmation of the close.
- Maintain an explicit registry of finding families, grouped by the underlying defect mechanism. Two findings that share a mechanism share a family, however differently worded. When many auditors converge on one family, redirect the excess toward underexplored lenses.
- Audit adversarially throughout. Check every "done" claim against the known close-class lies: green-over-broken, vacuous-green gates, declared captures missing on disk, masked fallbacks, alias smuggling, re-booked chronics, per-mechanism green over gestalt broken.
- Require concrete deliverables: file:line evidence, a failing probe, a reproduction, a named defect row. Reject status reports, vague optimism, and any claim that an unverified global property is "routine."
- Decompose any finding equivalent in strength to "redo the tranche" into wave-shaped rows; only at that grain can it be scheduled.
- The root agent repeatedly synthesizes, challenges, redirects, and launches new rounds. Do not stop after the first sweep. The registry is stable when two consecutive passes surface nothing new.

## Model routing and concurrency

The core model (Fable) owns orchestration, synthesis, adjudication, and every cognitively complex call; ALL design routes through Fable and the frontend design plugin (DesignSync). Opus and Sonnet take the workflow fanout and the mechanical sweeps, and every fanout spawn declares its model explicitly rather than inheriting the session's. Dispatch in batches of three concurrent agents to stay under the rate wall.

## Partial progress

Track partial progress in the registry; discard nothing. Folding is a decision. Every partial, banked, or abandoned item receives a terminal disposition: folded into a named wave, banked with a named re-trigger, or retired with rationale. Counting a partial as done is the close-class lie, and it is forbidden.

## Return contract

Return only when the next tranche is fully formed: plan folder; wave specs with acceptance gates, born RED wherever the defect is live; π and DELTA obligations for every visual claim; a disposition for every chronic, every deferred item, and every prompt-recap row. An inventory of problems without the tranche that resolves them is an incomplete return. If a genuine blocker prevents full formation, return the strongest rigorously converged tranche core and its exact remaining gap.
