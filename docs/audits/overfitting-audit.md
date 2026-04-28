# Overfitting Audit — Sub-Agent Prompt

Reusable canned prompt for auditing one-use components, classes, `@utility` blocks, composables, and type interfaces across glass-ui and its consumers. Substitute `{SCOPE_PATHS}` and `{CONSUMER_PATHS}` per audit; dispatch read-only sub-agent.

Created: tranche C, sub-phase C.W0.A. Substrate for §Invariant 5 ("No silent overfitting") of the glass-ui tranche format.

---

## Prompt body (copy verbatim into sub-agent dispatch, after substitutions)

````markdown
You are a research sub-agent for an overfitting audit. **Read-only** — do not edit any tracked file, do not commit.

## Task

Enumerate every component, composable, CSS class, `@utility`, type interface, and exported symbol within `{SCOPE_PATHS}`, then count its import / class-reference sites across `{CONSUMER_PATHS}`. Output a single markdown table with one row per artefact and a `verdict` column.

## Method

1. **Enumerate artefacts** within `{SCOPE_PATHS}`:
   - Vue components: every `*.vue` file's default export.
   - TS exports: `rg '^export (type|interface|function|const|class) ' {SCOPE_PATHS}` — each named export is one row.
   - CSS classes: for each `*.css` file, list `^\.[a-z]` selectors and `@utility <name>` blocks.
   - Composables: every `useXxx` exported from `src/composables/`.

2. **Count usage sites** for each artefact:
   - JS imports: `rg "from ['\"](\.{1,2}/)*<symbol-or-relative-path>['\"]" {CONSUMER_PATHS}` — count distinct files.
   - Class references in Vue/HTML: `rg 'class[Name]?="[^"]*\b<class>\b' {CONSUMER_PATHS}` and `:class`-bound forms. Count distinct files.
   - `@utility` references: `rg '\b<utility-name>\b' --type css --type vue --type ts {CONSUMER_PATHS}`. Count distinct files.
   - For each count, paste the exact `rg` invocation in the row's rationale field — counts unverifiable by re-running grep are rejected.

3. **Verdict** per artefact:
   - **keep** — ≥ 2 distinct usage sites in `{CONSUMER_PATHS}` (demo + library + external consumers all count toward the threshold).
   - **library-orphan** — exported from `src/index.ts` but **0 distinct usage sites anywhere** (not src, not demo, not external consumers). The library ships a primitive nobody — including its own demo — uses. This is the strongest overfitting signal for a public-surface library. Triage: (a) delete it (per "no legacy code"), (b) wire a demo story that exercises it, or (c) document as "shipped for forward compatibility with a named consumer roadmap entry". Default action: triage → either (a) or (b); (c) requires a named justification.
   - **inline-and-remove** — exactly 1 usage site, AND the artefact is NOT exported from `src/index.ts`. Inline at the call site; remove the standalone abstraction. Apt for unnamed helper-shaped classes or single-use private composables that don't earn their abstraction.
   - **generalize** — exactly 1 usage site, AND the artefact has semantic value worth preserving (e.g., an `@utility` with a meaningful name like `text-mono-caption`, or a public-surface component with one consumer that should grow). Document the intended reuse path; don't inline.
   - **delete-unused** — 0 usage sites anywhere AND not in `src/index.ts`. Pure dead code; delete.
   - **demo-only-private** — 0 sites in `src/`, only used in `demo/`. Move under `demo/<area>/_internal/` if not already; document as private demo helper. Not a library candidate.

Verdict precedence when multiple apply: `delete-unused` > `library-orphan` > `inline-and-remove` > `generalize` > `demo-only-private` > `keep`. Library-orphan beats keep — auto-keep on public-surface re-export is a false negative.

## Output format

```
| artefact | kind | def-site | in-public-surface | sites-in-src | sites-in-demo | sites-in-consumers | total-sites | verdict | rationale (with rg invocation) |
```

`in-public-surface` is `yes`/`no` based on `rg "<symbol>" src/index.ts src/components/index.ts src/composables/index.ts` etc. — needed to distinguish `library-orphan` from `delete-unused`. `total-sites` is the sum of distinct files across the four count columns; the verdict is driven by total + public-surface, per §3.

Demands:
- Every entry's site count cites the exact `rg` invocation in the rationale field.
- Zero generic claims ("seems unused"). Every verdict cites grep output.
- Idiomatic gestalt judgement on `generalize` vs `inline-and-remove`: one-shot anonymous helpers are inline-and-remove; one-shot semantic utilities are generalize.

## Substitutions

- `{SCOPE_PATHS}` — paths to audit (e.g., `src/components/ src/composables/ src/styles/`).
- `{CONSUMER_PATHS}` — where to count usage (e.g., `src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/`).

## Forbidden

- Edits, commits, speculative claims, paraphrased grep output without showing the invocation.
- "Looks important, kept" — verdict requires runtime evidence (import count, not heuristic).
- Skipping consumers because they're slow to grep — read-only `rg` walks are cheap.

## Deliverable shape

Single markdown file: short prose preamble (≤ 200 words) explaining scope + method, then the table (table size unbounded — the table IS the deliverable). End with a **Verdict distribution** summary (count per verdict).
````

---

## Standard glass-ui invocation

For glass-ui tranches, the canonical fan-out is four parallel sub-agents on disjoint scopes:

| Agent | `{SCOPE_PATHS}` | `{CONSUMER_PATHS}` |
|---|---|---|
| 0a | `src/components/ui/` | `src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/` |
| 0b | `src/components/custom/` | (same) |
| 0c | `src/composables/` | (same) |
| 0d | `src/styles/` | (same) |

Each agent's deliverable lands at `docs/tranches/{LETTER}/audit/W0-overfitting-{0a..0d}.md`. The orchestrator merges the four tables into a single `W0-overfitting.md` with a unified verdict distribution at close.

## When to run

- Every tranche close, as part of the closing ceremony (verifies §Invariant 5).
- Before any major refactor that introduces new abstractions — establishes a baseline.
- On consumer-build smoke (C.W4 in tranche C) — flags newly-orphaned items.
