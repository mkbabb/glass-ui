# J Agent Dispatch Template

Use this template for J agents. Fill bracketed fields before dispatch.

```text
You are working in /Users/mkbabb/Programming/glass-ui on tranche J —
Gestalt Refinement + Vocabulary Convergence + Audit-Precept Hardening.

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
- docs/audits/style-audit.md (canonical 7-axis audit prompt)
- docs/audits/overfitting-audit.md
- docs/tranches/I/FINAL.md (I close summary — load-bearing for J's substrate baseline)
- docs/tranches/J/J.md
- docs/tranches/J/findings.md (user's 18 net-new findings — load-bearing input)
- docs/tranches/J/research/R{1..6}-*.md (6 research deliverables — load-bearing)
- docs/tranches/J/waves/[wave].md (your wave spec)
- (W1+ only) docs/tranches/J/audit/W0-reconciliation.md

Task:
[bounded lane task — cite the specific research-finding row(s) being addressed]

Ownership:
[exact files/directories per the wave spec File Bounds table]

Rules:
- You are not alone in the codebase. Do not revert or overwrite unrelated edits.
- Follow KISS: one path, no compatibility shims, no fallback exports, no
  legacy/deprecation barrels.
- **Per J invariant 2**: architectural transposition is the default — collapse
  at the canonical root and retire the original; no "wrap and rename."
- **Per J invariant 5**: the strengthened audit pattern (multi-viewport π +
  per-story consumption δ + visual-load-bearing-ness β) is BINDING for J
  close. Wave evidence must include rendered probes for visual artefacts.
- **Per J invariant 9**: presets in consumers (speedtest aurora preset goes
  in `demo/stories/aurora/presets.ts`, not library exports).
- **Per H invariant 3**: NEVER run `git stash`, `git stash pop`,
  `git checkout HEAD --`, `git reset`, or any other destructive git command
  as a recovery mechanism. If a build fails, revert your own edits via the
  Edit tool surgically.
- **Per W0 precept update (I + J)**: run `npm run typecheck` after each
  major file group, not just at the end.
- Tailwind-first: any new utilities expressed via @theme + @utility,
  never pasted.
- One style authority per family. Do not duplicate definitions.
- If scope reveals work outside this wave or ownership, stop and report
  the scope reveal — do not broaden silently.
- Storybook is the oracle. New / kept components require ≥1 in-repo
  story; per-story consumption sweep at close confirms canonical adoption.
- Bundle/CSS deltas are soft-fail gates per I invariant 8 (bound by J).
- Visual-load-bearing-ness: any visual artefact ships rendered evidence
  (Playwright screenshot, getComputedStyle, runtime contrast probe) — not
  just file:line citations.
- Evidence must be command-backed, source-backed, or runtime-backed.
  Label speculation.
- Styling changes must be visually isomorphic for unchanged sites unless
  the wave names a deliberate correction.

Output:
- Summary of findings or changes.
- Exact files changed, if any.
- Commands run and outcomes (cite the typecheck run after each file group).
- Rendered evidence for visual artefacts (screenshots, computed styles).
- Per-story consumption sweep results (for vocab-migration waves).
- Residual risks and scope reveals.
```

## Wave-specific reading

Each wave spec (`waves/W{0..7}.md`) names exact files, symbols, and commands. The 6 research deliverables (`research/R{1..6}-*.md`) are supporting context with diagnoses + proposed fixes — wave specs reference rather than restate.

## Implementation Dispatch Constraints

- W0 lane I (reconciliation audit) is read-only on src/, demo/, consumer trees; write-only on `docs/tranches/J/audit/`.
- W0 lane II (precept submodule update) is write-only on `docs/precepts/instructions/`.
- W1 single lane writes only `src/styles/{tokens,theme,utilities}.css` + `src/composables/utils/cssVar.ts` + new utility consumption sites flagged in W1.4.
- W2 splits Lane A (overlay) + Lane B (interactive); disjoint file bounds per W2.md.
- W3 splits 3 lanes (collapse, popover, overflow/blur/devtext); disjoint file bounds.
- W4 splits 3 lanes (Configurator primitive, aurora refit, blob+preset).
- W5 splits 4 lanes (slider, number-field, drag-feedback, story-chassis); Lane C depends on Lane A's slider edits (sequence).
- W6 splits 3 lanes (badge, fuzzy, clearCache+pager).
- W7 is orchestrator + 6 audit lanes (strengthened canonical pattern).

## Close discipline

- Per H invariant 10 + I invariant 10: orchestrator commits each wave's
  diff at wave close under `feat(tranche-j/wN): summary` (or
  `chore(...)` / `fix(...)` / `docs(...)` as appropriate).
- Per J invariant 5: the strengthened 6-agent post-close audit
  (α/β/γ/δ/ε/π — multi-viewport, per-story-consumption, visual-load-bearing-ness)
  runs BEFORE FINAL.md is final.
