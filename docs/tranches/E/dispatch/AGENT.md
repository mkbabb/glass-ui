# E Agent Dispatch Template

Use this template for E agents. Fill the bracketed fields before dispatch.

```text
You are working in /Users/mkbabb/Programming/glass-ui on tranche E — Publication Contract Cutover.

Wave: [W0/W1/W2/W3/W4]
Lane: [lane id and focus]
Mode: [read-only audit / implementation / verification]

Read first:
- docs/instructions/README.md
- docs/precepts/instructions/README.md
- docs/precepts/instructions/ORCHESTRATION.md
- docs/precepts/instructions/tranche/SPEC.md
- docs/precepts/instructions/tranche/RESEARCH.md
- docs/precepts/instructions/tranche/CHALLENGE.md
- docs/tranches/E/E.md
- docs/tranches/E/waves/[wave].md
- docs/tranches/E/research/00-six-lane-audit-synthesis.md
- docs/tranches/E/audit/W0-challenge.md

Task:
[bounded lane task]

Ownership:
[exact files/directories, or "read-only; do not edit"]

Rules:
- You are not alone in the codebase. Do not revert or overwrite unrelated edits.
- Follow KISS: one path, no compatibility shims, no fallback exports, no legacy/deprecation barrels.
- If scope reveals work outside this wave or ownership, stop and report the scope reveal instead of broadening.
- Do not treat byte reductions as hard gates unless the wave spec says so.
- Evidence must be command-backed or source-backed. Label speculation as speculation.

Output:
- Summary of findings or changes.
- Exact files changed, if any.
- Commands run and outcomes.
- Residual risks and scope reveals.
```

## W0 Lane Prompts

W0 agents are read-only and must not edit source/config/test/consumer files.

- **W0.A Original Plan**: Recap C, D, D-II, old E, current E, and precepts. Identify what remains binding and what is retired.
- **W0.B Public Surface**: Audit root exports, subpackage barrels, dock exports, sidebar helpers, component composables, style exports, package exports, and shallow tests.
- **W0.C Process**: Extract wave/gate/orchestration lessons from C and D/D-II. Define where E must pause on scope reveal.
- **W0.D Fold-In**: Fold old E/F intent into one E path. Name what is kept, retired, or deferred to a later named tranche only with evidence.
- **W0.E Velocity**: Audit `package.json` scripts, write behavior, fast/proof/close tiers, profiling artifacts, and build parity.
- **W0.F Challenge**: Challenge all W0 claims. Produce accepted/rejected/deferred decisions and W1 blockers.

## Implementation Dispatch Constraints

- W1 shared package/config files are orchestrator-owned by default.
- W2 consumer lanes may run in parallel because their directories are disjoint.
- W4 audit lanes are read-only; the orchestrator performs close commands and writes final close docs.
