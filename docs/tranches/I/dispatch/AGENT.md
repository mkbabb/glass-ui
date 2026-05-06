# I Agent Dispatch Template

Use this template for I agents. Fill the bracketed fields before dispatch.

```text
You are working in /Users/mkbabb/Programming/glass-ui on tranche I —
Convergence to Steady-State + Visual Audit Promotion.

Wave: [W0/W1/W2/W3/W4/W5/W6/W7]
Lane: [lane id and focus]
Mode: [read-only audit / implementation / verification]

Read first:
- docs/instructions/README.md
- docs/precepts/instructions/README.md
- docs/precepts/instructions/ORCHESTRATION.md
- docs/precepts/instructions/CONSUMING.md
- docs/precepts/instructions/tranche/SPEC.md
- docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md
  (note: I.W0 binding precept update added the 6-agent close clause + bundle-budget non-negotiable)
- docs/audits/style-audit.md
- docs/audits/overfitting-audit.md
- docs/tranches/H/FINAL.md  (load-bearing input — I reads H's close state)
- docs/tranches/H/audit/H-deep-audit-{α,β,γ,δ,ε,ζ,playwright}.md (the 7 audit deliverables)
- docs/tranches/I/I.md
- docs/tranches/I/waves/[wave].md
- (W1+ only) docs/tranches/I/audit/W0-reconciliation.md

Task:
[bounded lane task — cite the specific deep-audit row(s) being addressed]

Ownership:
[exact files/directories per the wave spec File Bounds table]

Rules:
- You are not alone in the codebase. Do not revert or overwrite unrelated edits.
- Follow KISS: one path, no compatibility shims, no fallback exports, no
  legacy/deprecation barrels.
- **Per I invariant 2**: chronic deferrals (≥ 2 tranches) MUST resolve.
  Each row from H deep-audit ζ §2's chronic-deferral inventory either
  closes via wire / retire / refactor; OR is formally retired with named
  replacement; OR carries an explicit "permanent deferral" justification.
  No "future tranche may revisit" soft-deferrals.
- **Per I invariant 5**: zero recovery-diary leaks in src/ + demo/ at I close.
  Zero `H\.W` / `G\.W` / `O\.W` / `pass-N` / `silent-failure` / "scope reveal"
  / "user-direction overlay" / "stash regression" annotations. Tranche-history
  belongs in `docs/tranches/`.
- **Per I invariant 4**: visual audit (Playwright + Chrome MCP) is binding
  for tranche close ceremonies that ship visual changes.
- **Per H invariant 3 + AGENT_DISPATCH_TEMPLATE.md**: NEVER run
  `git stash`, `git stash pop`, `git checkout HEAD --`, `git reset`, or any
  other destructive git command as a recovery mechanism. If a build fails,
  revert your own edits via the Edit tool surgically.
- **Per W0 precept update (H + I)**: run `npm run typecheck` after each
  major file group, not just at the end.
- Tailwind-first: any new utilities expressed via @theme + @utility,
  never pasted.
- One style authority per family. Do not duplicate definitions.
- If scope reveals work outside this wave or ownership, stop and report
  the scope reveal — do not broaden silently.
- Storybook is the oracle. New / kept components require ≥1 in-repo
  story by I close (W4 owns the story aesthetic-uplift).
- Bundle/CSS deltas are soft-fail gates per I invariant 8; non-trivial
  regressions require justification.
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

Each wave spec (`waves/W{0..7}.md`) names exact files, symbols, and
commands. Treat the wave spec as the load-bearing input; H's deep-audit
deliverables are supporting context.

## Implementation Dispatch Constraints

- W0 lane I (reconciliation audit) is read-only on src/, demo/,
  consumer trees; write-only on `docs/tranches/I/audit/`.
- W0 lane II (binding precept update) is write-only on
  `docs/precepts/instructions/`. The three files updated:
  `LESSONS-LEARNED.md`, `tranche/SPEC.md`, `tranche/AGENT_DISPATCH_TEMPLATE.md`.
- W1 lanes split disjointly across β orphans / 4 P-packages / alias retire /
  recovery-diary scrub / sub-bar CVA evidence-doc-or-retire / chronic-deferral
  substrate items.
- W2 is single-lane on flourishes.vue + tests/public-surface.spec.ts +
  Tabs verification (3 disjoint runtime fixes).
- W3 lanes split: substrate-tier hierarchy + story-fidelity bifurcation +
  F-vs-G axis ownership.
- W4 lanes split by story category (primitives / containers / motion +
  misc).
- W5 is single-lane on README.md + CLAUDE.md + earlier-tranche wave-spec
  status retroactives + 3 D-tranche evidence-doc refreshes.
- W6 lanes split: subpath retire + CI workflow + (optional) dts caching.
- W7 is orchestrator + 6 audit lanes (the canonical 6-agent post-close
  pattern: α/β/γ/δ/ε/π).

## Close discipline

- Per H invariant 10 + I invariant 10: orchestrator commits each wave's
  diff at wave close under `feat(tranche-i/wN): summary` (or `chore(...)`
  / `fix(...)` / `docs(...)` as appropriate).
- Per I invariant 4: the 6-agent post-close audit (α/β/γ/δ/ε/π) runs
  BEFORE FINAL.md is final.
