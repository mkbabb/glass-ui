# D — Progress Log

Dated execution log for tranche D — Substrate-with-Consumer. Updated at every wave boundary per bbnf-lang SPEC §"Wave status updates at every boundary".

## 2026-04-29 — Tranche open

- Plan landed at `docs/tranches/D/D.md` (commit `9d6d156`); E.md folded F into a single tranche at commit `311c3ed`.
- Research wave artefacts at `docs/tranches/D/research/` (7 files; 6 parallel research agents A1-A6 dispatched 2026-04-28).
- Per-wave specs at `docs/tranches/D/waves/W{0..5}.md`.
- Sub-agent dispatch boilerplate at `docs/tranches/D/dispatch/AGENT.md`.
- Handoff document at `docs/tranches/D/HANDOFF.md` — orchestrator entry point.

## State at handoff

- `c-close` tag at commit `2b31920`.
- Master clean; typecheck + build clean.
- 5 D-tagged tasks tracked (W0 → W5) with sequential `blockedBy` chain.

## Wave statuses

- W0: planned
- W1: planned (blocked-by W0)
- W2: planned (blocked-by W1)
- W3: planned (blocked-by W2)
- W4: planned (blocked-by W3)
- W5: planned (blocked-by W4)

## Cross-tranche debt entering D

Per `docs/tranches/C/FINAL.md` and SYNTHESIS:

- 101 library-orphan candidates from C.W0.A (W0.A re-run expected to flip ~10-15 to `keep` due to known false negatives — sortable-list, timeline, infinite-scroll, plus composable re-export-chain hits).
- 21 current-consumer evidence candidates (typography + utilities; resolved at W3).
- 4 already-deleted items (D.W0/W2.E verifies cascade through `src/index.ts`).
- ~20 façade ui passthrough wrappers from A3 hunt (W0.C enumerates; W2.B deletes per re-grep).
- Sidebar composables wrongly nested at `src/components/custom/sidebar/composables/` (W0.D plans hoist; W2.C executes).
- Velocity gap (W4 ships Vitest + tsconfig.src + vite.iter + three-tier scripts).
- Reduced-motion CDP gap (forwarded to E.W4.B with direct Playwright).
- Kind-aware navigation pattern docs (carried to W3 current-consumer evidence as `flat-route-contract.md`).

## Wave-close entries

(Populated as waves close. See bbnf-lang SPEC §"Wave verification ledger" for required content per close.)

### W0 close (open)
### W1 close (open)
### W2 close (open)
### W3 close (open)
### W4 close (open)
### W5 close (open)
