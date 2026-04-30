# D — Handoff Document

Single entry-point for any agent picking up tranche D execution. Read this top-to-bottom; everything you need is linked.

## Tranche state at handoff

- **Plan**: `docs/tranches/D/D.md` — 6 waves, 13 invariants, hard gates on runtime evidence
- **Research artefacts**: `docs/tranches/D/research/` (7 files; 6-agent research wave from 2026-04-28; SYNTHESIS.md is the entry point)
- **Per-wave specs**: `docs/tranches/D/waves/W{0..5}.md` — bbnf-lang WAVE_SPEC format; orchestrator's dispatch input
- **Sub-agent dispatch templates**: `docs/tranches/D/dispatch/AGENT.md` — the per-prompt boilerplate specialised for D
- **Progress log**: `docs/tranches/D/PROGRESS.md` — at handoff: all waves `planned`
- **Audit deliverables**: `docs/tranches/D/audit/` — empty at handoff; populated as W0-W5 sub-agents land deliverables
- **Predecessor close**: tag `c-close` at commit `2b31920` (master)
- **Successor plan**: `docs/tranches/E/E.md` — stays planned until D close

## Execution invocation

```
Begin tranche D — execute /Users/mkbabb/Programming/glass-ui/docs/tranches/D/D.md
indefatigably to close (tag d-close). Six waves, parallel agents on disjoint
file bounds per the wave schedule. Adhere to all invariants (1-13) and ground
rules. No deferrals. Master clean before each wave dispatch; cherry-pick model.
Hard close gate: re-audit actionable ≤ 5; bundle smaller than c-close;
npm run iter < 10 s wall.
```

(Or compactly: `exec D`.)

## Read-first reading order for the next orchestrator

1. **`/Users/mkbabb/Programming/glass-ui/docs/precepts/instructions/README.md`** — shared operational directives.
2. **`/Users/mkbabb/Programming/glass-ui/docs/precepts/instructions/tranche/SPEC.md`** — shared tranche spec.
3. **`/Users/mkbabb/Programming/glass-ui/docs/precepts/instructions/tranche/WAVE_SPEC.md`** — per-wave doc format; D's `waves/W{0..5}.md` follow this.
4. **`/Users/mkbabb/Programming/glass-ui/docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md`** — dispatch boilerplate; D's `dispatch/AGENT.md` is the specialised form.
5. **`/Users/mkbabb/Programming/glass-ui/docs/instructions/README.md`** — glass-ui local rules.
6. **`/Users/mkbabb/Programming/glass-ui/CLAUDE.md`** — codebase conventions for glass-ui specifically.
7. **`/Users/mkbabb/Programming/glass-ui/docs/tranches/C/FINAL.md`** — what C closed; D inherits from this.
8. **`/Users/mkbabb/Programming/glass-ui/docs/tranches/C/audit/W0-overfitting.md`** — the 108-actionable ledger D triages.
9. **`/Users/mkbabb/Programming/glass-ui/docs/tranches/D/research/SYNTHESIS.md`** — 6-agent findings, refined path forward, anti-patterns to bind against.
9. **`/Users/mkbabb/Programming/glass-ui/docs/tranches/D/D.md`** — D's plan in full.
10. **`/Users/mkbabb/Programming/glass-ui/docs/tranches/D/waves/W0.md`** — the first wave to dispatch.

## Pre-dispatch checklist (D.W0)

Before dispatching W0:

- [ ] `git status --short` empty (master clean).
- [ ] `git tag` includes `c-close`.
- [ ] `docs/tranches/D/D.md` on master — verified.
- [ ] `docs/tranches/D/waves/W0.md` on master — verified.
- [ ] `docs/tranches/D/dispatch/AGENT.md` on master — verified.
- [ ] `npm run typecheck` exit 0.
- [ ] `npm run build` exit 0.
- [ ] Worktrees pre-created via `git worktree add`:
  - `/Users/mkbabb/Programming/glass-ui-wt-d-w0a` (W0.A.1 — ui audit)
  - `/Users/mkbabb/Programming/glass-ui-wt-d-w0b` (W0.A.2 — custom audit)
  - `/Users/mkbabb/Programming/glass-ui-wt-d-w0c` (W0.A.3 — composables audit)
  - `/Users/mkbabb/Programming/glass-ui-wt-d-w0d` (W0.A.4 — styles audit)
  - `/Users/mkbabb/Programming/glass-ui-wt-d-w0e` (W0.B/C/D/E — orchestrator-side; can run in main worktree since deliverables are docs only)

## Worktree setup script (run before W0)

```bash
ROOT=/Users/mkbabb/Programming/glass-ui
PARENT=$(dirname "$ROOT")
for tag in w0a w0b w0c w0d; do
  git -C "$ROOT" worktree add --detach "$PARENT/glass-ui-wt-d-$tag" HEAD
done
```

(W0.B/C/D/E sub-phases write only to `docs/tranches/D/audit/` — orchestrator can run them inline from main without worktrees.)

## Per-wave invocation pattern (replicates across W0-W5)

For each wave:

1. Read `docs/tranches/D/waves/W<N>.md`.
2. Pre-create worktrees for the wave's parallel sub-agents.
3. For each sub-agent: build the prompt from `docs/tranches/D/dispatch/AGENT.md` template + wave-specific scope substitutions.
4. Dispatch in parallel via Agent tool (single message, multiple tool uses).
5. On completion notification: verify each agent's deliverable against the wave's hard-gate artefacts (re-grep, re-build, re-run).
6. Cherry-pick agent commits onto master (or write the deliverables directly when sub-agents return content rather than commits).
7. Update `docs/tranches/D/PROGRESS.md` with wave-close entry citing commit hashes.
8. Update `docs/tranches/D/D.md` wave-status table + `docs/tranches/D/waves/W<N>.md` `**Status**` line.
9. Master clean → next wave.

## Hard close (D.W5)

D closes when:

1. `docs/tranches/D/audit/W5-overfitting.md` actionable count ≤ 5.
2. `npm run typecheck` + `npm run build` clean.
3. `npm run iter` < 10 s wall.
4. `npm run iter-test` ~120-160 tests green.
5. `scripts/ay-close.sh` end-to-end exit 0.
6. Bundle strictly smaller than c-close (`du -sh dist/glass-ui.js`).
7. Three consumer builds clean.
8. `docs/tranches/D/FINAL.md` + `docs/tranches/D/audit/D-retro.md` committed.
9. `docs/consumer-evidence/` populated; canned prompt updated.
10. CLAUDE.md structure tree + counts synced.
11. `git tag d-close` placed.

## Failure modes and recovery

Per bbnf-lang SPEC §"Scope-reveal protocol":

- **Scope under-estimated mid-wave**: re-plan with more agents (split wave). Default — not escalation.
- **Agent budget exhausted (per C.W4 precedent)**: two-stage hand-off — close out the wave with a follow-on agent on the residual scope.
- **Audit-claim disagreement with grep**: re-grep is the artefact. Trust `rg` output. Refine the action.
- **Consumer build regression at W2**: restore the deleted symbol as `keep-as-wired-facade`; route to W2 follow-on commit. Single-symbol exception.
- **Diagnostic-loop (3+ iterations without commit)**: agent halts + reports state; orchestrator dispatches research+plan+redress triumvirate per SPEC §"Diagnostic-loop relinquish".
- **W5 actionable 5 < count ≤ 10**: declare D-II per SPEC §"Multi-pass tranche split". Open `docs/tranches/D-II/D-II.md` with named residual scope.
- **W5 actionable > 10**: halt + dispatch research+plan+redress; the verdict process itself was miscalibrated.

## Boundaries

- Modify `package.json` outside D.W4 (other waves leave it alone).
- Skip waves.
- Carry items silently (every carry-over names a destination tranche).
- Trust agent claims without re-grep.
- Run multiple cargo/npm invocations concurrently (one at a time per host).
- Polling sub-agent JSONL output (the harness notifies on completion).
- Touching the consumers' source trees outside E.W2.
- Editing files outside the orchestrator's allow-list per wave.

## Cross-tranche links

- Predecessor: `docs/tranches/C/` (closed at `c-close`).
- This tranche: `docs/tranches/D/`.
- Successor (planned, executes after D-close): `docs/tranches/E/E.md`.

When D closes, paste `exec E` into a fresh prompt to begin E.
