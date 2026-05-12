# L Agent Dispatch Template

Use this template for L agents. Fill bracketed fields before dispatch.

```text
You are working in /Users/mkbabb/Programming/glass-ui on tranche L —
v1.0 Cohort: SCC Trap Closure + Modularization + Public-surface Discovery.

Wave: [W0/W1/W2/W3/W4/W5/W6/W7/W8]
Lane: [lane id and focus]
Mode: [read-only audit / implementation / verification]
Isolation: [worktree (REQUIRED for parallel multi-agent shared-file waves; agent prompts MUST use repo-relative paths per K W8 LESSONS-LEARNED 2026-05-09 #1) / shared (single-agent or read-only)]

Read first:
- docs/instructions/README.md
- docs/precepts/instructions/README.md
- docs/precepts/instructions/ORCHESTRATION.md
- docs/precepts/instructions/CONSUMING.md
- docs/precepts/instructions/tranche/SPEC.md
- docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md
- docs/precepts/instructions/LESSONS-LEARNED.md (incl. K W8 2026-05-09 #1 + #2)
- docs/tranches/K/FINAL.md (K close summary — load-bearing for L's substrate baseline)
- docs/tranches/L/L.md
- docs/tranches/L/findings.md (user directives — load-bearing input)
- docs/tranches/L/research/R{α,β,γ,δ,ε,ζ}-*.md (6 research deliverables — load-bearing)
- docs/tranches/L/waves/[wave].md (your wave spec)
- (W1+ only) docs/tranches/L/audit/W0-reconciliation.md
- (W1+ only) docs/tranches/L/coordination/speedtest-Y.md

Task:
[bounded lane task — cite the specific research-finding row(s) being addressed]

Ownership:
[exact files/directories per the wave spec File Bounds table; use repo-relative paths if isolation=worktree]

Rules (HARDENED for L — reading these is mandatory):

## Git discipline (binding non-negotiable per K invariant 7 + K W8 LESSONS-LEARNED 2026-05-09 #2)

- **NEVER run any working-tree-mutating git subcommand for ANY reason, INCLUDING state-probe.**
  Forbidden subset: `git add` / `git commit` / `git stash` / `git stash pop` /
  `git checkout HEAD --` / `git checkout <branch>` / `git reset` / `git restore` /
  `git rm` / `git mv` / `git rebase` / `git merge` / `git pull` / `git fetch`
  with mutation flags / `git branch -D` / `git tag -d` / `git push` / etc.
- **Read-only git permitted**: `git status` / `git log` / `git diff` /
  `git show` / `git ls-tree` / `git rev-parse` / `git config --get`.
- K W8 LESSONS-LEARNED #2 closed the state-probe loophole that K W3 Lane A
  navigated through. If you need to compare against the committed shape:
  use `git show HEAD:<path>` (read-only) or `git diff --no-index <a> <b>`
  for arbitrary file comparison. NEVER `git stash`.
- **If you find yourself reaching for any forbidden subcommand, halt and
  report to orchestrator instead.**
- **No `cd <dir> && git <cmd>` patterns.** If you must operate inside
  a subdirectory, use `git -C <dir> <cmd>`.

## Worktree-isolation discipline (binding per K W8 LESSONS-LEARNED 2026-05-09 #1)

- If your dispatch declared `Isolation: worktree`, your edit paths MUST be
  **repo-relative** (`src/styles/dock.css`, NOT `/Users/.../glass-ui/src/styles/dock.css`).
- Absolute paths leak to the orchestrator's main tree and circumvent
  isolation (the K W6 anomaly that K W8 codified).
- The Agent tool sets the worktree as the working directory; relative
  paths resolve into the worktree.
- Your worktree's branch is yours; the orchestrator integrates at close.

## File-bounds discipline

- You are not alone in the codebase (unless you have an isolated worktree).
  Do not revert or overwrite unrelated edits.
- If your wave dispatched with `Isolation: shared`, treat every shared
  file as race-prone. Re-read just before editing; flag scope reveals
  immediately.

## KISS + gestalt rules (binding L invariants)

- Follow KISS: one path, no compatibility shims, no fallback exports, no
  legacy/deprecation barrels EXCEPT where the migration guide commits to
  a temporary alias (rare; v1.0 prefers clean breaks).
- **Per L invariant 8**: substrate-without-consumer is binary at L close.
- **Per L invariant 9**: architectural transposition is the default —
  collapse at the canonical root and retire the original.
- **Per L invariant 10**: vocab convergence is gestalt sweep, not leaf
  migration.
- **Per L invariant 11**: doc-drift is binary at close. CHANGELOG.md +
  MIGRATION.md update in the same wave that breaks API.

## Subpath publication discipline (binding per L invariant 18)

- For any wave that creates or modifies a subpath (`package.json` `exports`),
  the synthetic-consumer typecheck probe MUST PASS before close:
  - `node -e 'import("@mkbabb/glass-ui/<subpath>")'` resolves at runtime.
  - A scratch `import { X } from "@mkbabb/glass-ui/<subpath>"` typechecks
    via `tsc --noEmit` from a consumer-shaped context.
- `dist/<subpath>.d.ts` must NOT re-export `'../src/...'` paths (the K.WS
  bug). The dts emission MUST be self-contained within dist/.

## Cross-repo coordination (binding per L invariant 17)

- L does not write to speedtest source during L flight.
- L may READ speedtest worktrees (especially `y-a3-glass-ui`) for context.
- The v0.9.4 patch + v1.0 release are the only authorized cross-repo touchpoints.
- All cross-repo decisions trace to `docs/tranches/L/coordination/speedtest-Y.md`.

## Audit-precept rules (binding from K W0 + K W8 amendments)

- Run `npm run typecheck` after each major file group, not just at the end.
- Run `NODE_OPTIONS=--max-old-space-size=8192 npm run build` (heap knob
  documented at v0.9.2; required for vite-plugin-dts pipeline).
- Visual-load-bearing-ness probes mandatory for visual artefacts.
- Tailwind-first: any new utilities via `@theme` + `@utility`.
- One style authority per family.
- Storybook is the oracle.
- Bundle/CSS deltas are HARD-fail gates per L invariant 12.

Output:
- Summary of findings or changes.
- Exact files changed, if any.
- Commands run and outcomes (cite the typecheck run after each file group).
- Rendered evidence for visual artefacts.
- Per-story consumption sweep results (for vocab-migration waves).
- Subpath publication probe results (for waves touching package.json exports).
- Residual risks and scope reveals.
- Confirmation that NO mutating git subcommand was run during this dispatch.
```

## Wave-specific reading

Each wave spec (`waves/W{0..8}.md`) names exact files, symbols, and commands. The 6 research deliverables (`research/R{α,β,γ,δ,ε,ζ}-*.md`) are supporting context with diagnoses + proposed fixes — wave specs reference rather than restate.

## Implementation Dispatch Constraints

- **W0 Lane I** (reconciliation audit) is read-only on src/, demo/, consumer trees; write-only on `docs/tranches/L/audit/`.
- **W0 Lane II** (precept submodule update) is write-only on `docs/precepts/instructions/`.
- **W0 Lane III** (subpath typing-gap P0 + v0.9.4 patch): write on `src/composables/dark.ts` + `src/composables/keyboard.ts` (re-author so dts emission is self-contained), `vite.library.ts`, `package.json` (version bump 0.9.3 → 0.9.4 + exports verify). Orchestrator handles tag + push.
- **W1 Lane A** (root barrel curation): isolation REQUIRED; writes `src/index.ts` only.
- **W1 Lane B** (`src/api/` authoring): isolation REQUIRED; writes NEW `src/api/index.ts` + types + constants barrel.
- **W1 Lane C** (subpath flatten): isolation REQUIRED; touches `src/dark.ts` + `src/keyboard.ts` + new `src/carousel.ts` + `package.json` exports.
- **W2 Lane A** (composables/ restructure): isolation REQUIRED.
- **W2 Lane B** (sibling cohesion + import shape): isolation REQUIRED.
- **W3 Lane A** (composable wire-or-retire): isolation OPTIONAL; bounds disjoint from Lane B.
- **W3 Lane B** (primitive wire-or-retire): isolation OPTIONAL.
- **W4 single lane** (mobile-viewport finishing): sequential.
- **W5 Lane A** (doc walk): shared.
- **W5 Lane B** (migration guide + production-demo-build decision): shared (bounds disjoint).
- **W6 single lane** (Lighthouse P2 completion): sequential.
- **W7 Lane A** (keyframes lift): isolation OPTIONAL.
- **W7 Lane B** (aurora chrome Option-A): isolation OPTIONAL.
- **W8 orchestrator + 7 audit lanes** (strengthened canonical pattern with ι integrity-sweep).

## Worktree integration protocol

Per K W8 LESSONS-LEARNED 2026-05-09 #1: agent prompts use REPO-RELATIVE paths. Integration:

1. Orchestrator creates worktrees via `Agent isolation: "worktree"`. Each agent operates on a private clone.
2. At wave close, each agent reports its branch + worktree path.
3. Orchestrator verifies `git -C <worktree-path> diff --stat` shows changes ARE in the worktree (not main).
4. Orchestrator integrates by reading the worktree's working-tree state and applying via Edit/Read in main. The agent's worktree is auto-cleaned.
5. Orchestrator commits the integrated diff under `feat(tranche-l/wN): summary`.

## Close discipline

- Per L invariant 12 + L W0 precept-update: orchestrator commits each
  wave's diff at wave close under `feat(tranche-l/wN): summary`.
- Per L invariant 15: the strengthened **7-agent** post-close audit
  (α/β/γ/δ/ε/π/**ι** integrity-sweep) runs BEFORE FINAL.md is final.
- Per L invariant 16: v1.0 cohort identity requires the migration
  guide ship as a binding deliverable.
