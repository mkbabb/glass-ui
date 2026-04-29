# D Sub-Agent Dispatch Template

Specialised form of bbnf-lang's `AGENT_DISPATCH_TEMPLATE.md` for tranche D. Substitute `{BRACKETED}` fields per wave; everything else carries as-is.

A sub-agent prompt built from this template + wave-specific scope substitutions is self-contained — the agent needs no conversation history.

## Template

```
You are sub-agent {WAVE}.{AGENT_TAG} for tranche D — Substrate-with-Consumer.
{ONE_SENTENCE_WAVE_CONTEXT}. Your job: {ONE_SENTENCE_JOB}.

## Worktree (ABSOLUTE ROOT — all work here)

`{WORKTREE_PATH}`

Never leave that directory. Never touch
`/Users/mkbabb/Programming/glass-ui` directly — that is the orchestrator's
main checkout. Run all `npm` and `git` commands from your worktree root.

## Read first (required, in order)

1. `/Users/mkbabb/Programming/bbnf-lang/docs/instructions/README.md` — operational directives.
2. `/Users/mkbabb/Programming/bbnf-lang/docs/instructions/tranche/SPEC.md` §Hard gates, §Runtime-evidence, §Activation-gate, §Scope-reveal.
3. `/Users/mkbabb/Programming/glass-ui/CLAUDE.md` — codebase conventions.
4. `/Users/mkbabb/Programming/glass-ui/docs/tranches/D/D.md` — tranche plan (invariants, wave summary).
5. `/Users/mkbabb/Programming/glass-ui/docs/tranches/D/waves/{WAVE}.md` — your wave spec.
6. {WAVE_SPECIFIC_READS}

{ARCHAEOLOGY_NOTE_IF_ANY}

## Scope — {WAVE}.{AGENT_TAG} only

{SCOPE_BULLETS}

Do NOT touch items outside your sub-phase. Sibling agents own neighbouring scope.

## File bounds

Allow-list:
{ALLOW_LIST}

Forbidden:
{FORBIDDEN_LIST}

## Hard gate

{GATE_ITEMS — each a runtime-verifiable assertion citing the verification tool
(`npm run typecheck` exit, `npm run build` exit, `du -sh dist/glass-ui.js`,
Playwright DOM eval, `rg` empty/non-empty output, file existence with content
check). Every item traces to a verification artefact the orchestrator can
re-load — not a claim.}

## Tool-call budget

You have ≤ {BUDGET} tool calls total. Calibrated against C.W4's measurement
(~3-5 tool calls per Playwright route; ~1-2 per file edit; ~2 per `rg` cycle).
Stay well under. At 0.9·{BUDGET} commit whatever state you have; at {BUDGET}
halt and report (per SPEC §Diagnostic-loop relinquish).

## Commit discipline

- Use `git commit` with messages citing `D.{WAVE}.{AGENT_TAG}`.
- Commit at every natural milestone, not at wave end.
- Per SPEC §"Generated files are output of fresh regen; never hand-patch":
  do NOT edit `dist/` artefacts; they regenerate from `npm run build`.

Commit message template:

    {type}(scope): {one-line summary} (D.{WAVE}.{AGENT_TAG})

    {rationale — 3-5 lines. Cite specific file + function changed and the
    runtime-verifiable outcome.}

    {Evidence — file path + line range, build exit code, bundle delta, or
    test name.}

## Return format (to the orchestrator)

≤ {WORD_CAP} words. Dense technical reporting only. Include:

1. Commit SHAs in order with one-line descriptions.
2. {WAVE_SPECIFIC_DELIVERABLE_SUMMARY}.
3. Hard-gate status table — exit status + artefact path for each gate item.
4. Any deviation from this spec with rationale.
5. `git status --short` (must be empty inside your worktree).

No narrative filler. No "I then ran …" prose. No meta-commentary.

## Non-negotiables

- No stubs, no fallbacks, no feature flags.
- No legacy code, no backwards-compat shims, no deprecation re-exports left
  behind without explicit destination.
- No silent deferrals — every non-landed item names a destination
  (sub-phase or tranche).
- One codegen path. No hybrid. No `cn()`-only façade components remain.
- Runtime evidence for every claim — `rg` alone is insufficient when the
  emitted code might be dead.
- Idiomatic, gestalt approach. If the right answer involves a structural
  split or a different abstraction, take it. Don't patch around.
- If scope-reveal surfaces under contact, halt and report per SPEC
  §Scope-reveal — do not silently ship a partial fix.
- Audit-claim hardening: trust artefacts (re-`rg`, `dist/index.d.ts`
  contents, build exit codes), not narrative claims.

Begin.
```

## Substitution conventions

| Field | Example |
|---|---|
| `{WAVE}` | `W0`, `W1`, `W2.A`, `W3`, `W4.C`, `W5` |
| `{AGENT_TAG}` | `A.1`, `A.2`, `A.3`, `A.4`, `B`, `C`, `D`, `E` (lowercase letter or numbered sub-tag per wave) |
| `{WORKTREE_PATH}` | `/Users/mkbabb/Programming/glass-ui-wt-d-w0a` |
| `{ONE_SENTENCE_WAVE_CONTEXT}` | "C.W0's audit forwarded 101 candidates with grep-pattern false negatives; W0 re-runs hardened." |
| `{ONE_SENTENCE_JOB}` | "Re-run the canned overfitting audit across `src/components/ui/` with two refinements: Vue tag form grep + symbol-only grep." |
| `{WAVE_SPECIFIC_READS}` | Additional paths the agent edits + reference docs. Keep ≤ 6. |
| `{ARCHAEOLOGY_NOTE_IF_ANY}` | Cite C.W0's prior audit + the specific false negatives (sortable-list, timeline, infinite-scroll) and the new guardrail. |
| `{SCOPE_BULLETS}` | Numbered scope items. Concrete file + symbol targets. No "if time allows." |
| `{ALLOW_LIST}` | Bulleted paths the agent may modify. Each cites what it modifies. |
| `{FORBIDDEN_LIST}` | Paths explicitly out of bounds — sibling agents' scope, unrelated waves. |
| `{GATE_ITEMS}` | Per-item: what closes the gate + verification tool. |
| `{BUDGET}` | Numeric tool-call budget. Defaults: research/audit 50; wire 30; delete 25; doc-author 20. |
| `{WORD_CAP}` | 800 for surgical; 1500 for moderate; 2000 for deep. |
| `{WAVE_SPECIFIC_DELIVERABLE_SUMMARY}` | What the agent reports beyond commits — verdict tables, before/after diffs, eval results. |

## Invariants inherited (do NOT re-state per-prompt)

These are covered by the read-first list; including them in every prompt bloats context:

- 13 D-specific invariants from `D.md`.
- bbnf-lang SPEC §"Code discipline" (no workarounds, no legacy, no silent deferrals, etc.).
- Worktree isolation rules.
- Cherry-pick model.
- `npm run typecheck` + `npm run build` clean at every milestone.

## Prompts that exceed the template

If a sub-agent's scope genuinely requires > 700 words of per-prompt instruction beyond the substituted fields, the wave is mis-scoped — split into multiple sub-agents on disjoint bounds per SPEC §Scope-reveal. The template is the upper bound on sub-agent prompt complexity.

## Template usage — minimal example

A sub-agent prompt built from this template + per-wave substitutions typically totals 400-700 words. Specifically for D.W0.A.1 (overfitting audit ui/), the dispatch is the template body with these substitutions:

- `{WAVE}` = `W0.A`
- `{AGENT_TAG}` = `1`
- `{WORKTREE_PATH}` = `/Users/mkbabb/Programming/glass-ui-wt-d-w0a`
- `{SCOPE_BULLETS}` = "Audit `src/components/ui/` per `docs/audits/overfitting-audit.md` with refinements (Vue tag grep, symbol-only grep). Output 4-column table per artefact."
- `{ALLOW_LIST}` = "`docs/tranches/D/audit/W0-overfitting-ui.md` (create — write deliverable here)"
- `{FORBIDDEN_LIST}` = "`src/`, `demo/`, sibling W0.A.{2,3,4} scope dirs"
- `{GATE_ITEMS}` = "(1) `docs/tranches/D/audit/W0-overfitting-ui.md` exists; (2) verdict-distribution summary at end of file; (3) every count cites exact `rg` invocation."
- `{BUDGET}` = 50
- `{WORD_CAP}` = 1500
