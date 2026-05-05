# H Agent Dispatch Template

Use this template for H agents. Fill the bracketed fields before dispatch.

```text
You are working in /Users/mkbabb/Programming/glass-ui on tranche H —
Surface Trim, Honest Wiring, and Process Hardening.

Wave: [W0/W1/W2/W3/W4/W5/W6]
Lane: [lane id and focus]
Mode: [read-only audit / implementation / verification]

Read first:
- docs/instructions/README.md
- docs/precepts/instructions/README.md
- docs/precepts/instructions/ORCHESTRATION.md
- docs/precepts/instructions/CONSUMING.md
- docs/precepts/instructions/tranche/SPEC.md
- docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md
  (note: H.W0 binding precept update added two non-negotiable clauses to this file)
- docs/audits/style-audit.md
- docs/audits/overfitting-audit.md
- docs/tranches/G/G-FINAL-II.md  (the load-bearing input — H reads G's audit findings)
- docs/tranches/G/audit/G-audit-{α,β,γ,δ}-*.md
- docs/tranches/H/H.md
- docs/tranches/H/waves/[wave].md
- (W1+ only) docs/tranches/H/audit/W0-reconciliation.md

Task:
[bounded lane task — cite the specific G audit row(s) being addressed]

Ownership:
[exact files/directories per the wave spec File Bounds table]

Rules:
- You are not alone in the codebase. Do not revert or overwrite unrelated edits.
- Follow KISS: one path, no compatibility shims, no fallback exports, no
  legacy/deprecation barrels.
- **Per H invariant 2**: every G-shipped artefact must wire (≥2 in-repo sites)
  OR retire (clean break) OR carry a `docs/consumer-evidence/<artefact>.md`
  evidence doc with fresh-grep proof against a named consumer follow-up
  tranche. No projection-only keeps.
- **Per H invariant 3 + AGENT_DISPATCH_TEMPLATE.md (post-W0)**: NEVER run
  `git stash`, `git stash pop`, `git checkout HEAD --`, `git reset`, or any
  other destructive git command as a recovery mechanism. If a build fails,
  revert your own edits via the Edit tool surgically.
- **Per W0 precept update**: run `npm run typecheck` after each major file
  group, not just at the end. Stalls leave disk in a more recoverable
  state when verification is incremental.
- Tailwind-first: any new utilities (only Slider variant in W3) are
  expressed via @theme + @utility, never pasted.
- One style authority per family. Do not duplicate definitions.
- If scope reveals work outside this wave or ownership, stop and report
  the scope reveal — do not broaden silently.
- Storybook is the oracle. New / kept components require ≥1 in-repo
  story by H close (W4 owns the gap-fill).
- Bundle/CSS deltas are measurements; not hard gates unless the wave spec
  says so.
- Evidence must be command-backed, source-backed, or runtime-backed.
  Label speculation.
- Styling changes must be visually isomorphic for unchanged sites unless
  the wave names a deliberate correction.

Output:
- Summary of findings or changes.
- Exact files changed, if any.
- Commands run and outcomes (cite the typecheck run after each file group).
- Residual risks and scope reveals.
```

## Wave-specific reading

Each wave spec (`waves/W{0..6}.md`) names exact files, symbols, and
commands. Treat the wave spec as the load-bearing input; G's audit
findings are supporting context.

## Implementation Dispatch Constraints

- W0 lane I (reconciliation audit) is read-only on src/, demo/,
  consumer trees; write-only on `docs/tranches/H/audit/`.
- W0 lane II (binding precept update) is write-only on
  `docs/precepts/instructions/`. The four files updated:
  `LESSONS-LEARNED.md`, `tranche/SPEC.md`, `ORCHESTRATION.md`,
  `tranche/AGENT_DISPATCH_TEMPLATE.md`.
- W1 lanes split disjointly across `src/components/custom/`,
  `src/composables/`, `src/components/ui/`, `src/styles/`, `src/tokens.ts`.
- W2 is single-lane on `DESIGN.md` only.
- W3 lanes split: `src/components/custom/dock/` (Lane I) and
  `src/components/ui/slider/` (Lane II); disjoint.
- W4 lanes split by story category.
- W5 is single-lane on `scripts/stress/` + `.github/workflows/` +
  one-line `demo/stories/_internal/blob-stress.vue` extension.
- W6 is orchestrator + 4 audit lanes (the new binding 4-agent post-close
  pattern).

## Close discipline

- Per H invariant 10 + W0 ORCHESTRATION.md update: orchestrator commits
  each wave's diff at wave close under
  `feat(tranche-h/wN): summary` (or `chore(...)` for docs-only waves).
- Per H invariant 4: post-close audit (W6) runs BEFORE FINAL.md is final.
