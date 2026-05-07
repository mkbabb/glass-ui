# K Agent Dispatch Template

Use this template for K agents. Fill bracketed fields before dispatch.

```text
You are working in /Users/mkbabb/Programming/glass-ui on tranche K —
Convergence Closeout + Dispatch Precept Hardening + Audacious Extraction.

Wave: [W0/W1/W2/W3/W4/W5/W6/W7/W8]
Lane: [lane id and focus]
Mode: [read-only audit / implementation / verification]
Isolation: [worktree (REQUIRED for parallel multi-agent shared-file waves) / shared (single-agent or read-only)]

Read first:
- docs/instructions/README.md
- docs/precepts/instructions/README.md
- docs/precepts/instructions/ORCHESTRATION.md
- docs/precepts/instructions/CONSUMING.md
- docs/precepts/instructions/tranche/SPEC.md
- docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md
- docs/precepts/instructions/LESSONS-LEARNED.md
- docs/tranches/J/FINAL.md (J close summary — load-bearing for K's substrate baseline)
- docs/tranches/K/K.md
- docs/tranches/K/findings.md (user directives — load-bearing input)
- docs/tranches/K/research/R{α,β,γ,δ,ε,ζ}-*.md (6 research deliverables — load-bearing)
- docs/tranches/K/waves/[wave].md (your wave spec)
- (W1+ only) docs/tranches/K/audit/W0-reconciliation.md

Task:
[bounded lane task — cite the specific research-finding row(s) being addressed]

Ownership:
[exact files/directories per the wave spec File Bounds table]

Rules (HARDENED for K — reading these is mandatory):

## Git discipline (binding non-negotiable per K invariant 4)

- **NEVER run any working-tree-mutating git subcommand for ANY reason.**
  Forbidden subset: `git add` / `git commit` / `git stash` / `git stash pop` /
  `git checkout HEAD --` / `git checkout <branch>` / `git reset` / `git restore` /
  `git rm` / `git mv` / `git rebase` / `git merge` / `git pull` / `git fetch`
  with mutation flags / `git branch -D` / `git tag -d` / etc.
- **Read-only git permitted**: `git status` / `git log` / `git diff` /
  `git show` / `git ls-tree` / `git rev-parse` / `git config --get`.
- The 2 J `git stash` violations recurred under the prior precept's
  "as recovery mechanism" loophole. K closes the loophole — there is no
  permitted use case for a mutating git subcommand inside an agent prompt.
- **If you find yourself reaching for any forbidden subcommand, halt and
  report to orchestrator instead.** The orchestrator owns the index, the
  branch, the working-tree state. You own only the file edits in your
  bounded scope.
- **No `cd <dir> && git <cmd>` patterns.** If you must operate inside
  a subdirectory, use `git -C <dir> <cmd>` so the shell pwd remains
  hygienic. (Working directory persists across Bash calls; `cd` drift
  caused at least one J incident.)

## File-bounds discipline

- You are not alone in the codebase (unless you have an isolated worktree).
  Do not revert or overwrite unrelated edits.
- If your wave dispatched with `Isolation: worktree`, you are operating in
  an isolated git worktree; the orchestrator will integrate your branch at
  wave close. Your own working tree is private.
- If your wave dispatched with `Isolation: shared`, treat every shared
  file as race-prone. Re-read just before editing; flag scope reveals
  immediately.

## KISS + gestalt rules (binding K invariants)

- Follow KISS: one path, no compatibility shims, no fallback exports, no
  legacy/deprecation barrels.
- **Per K invariant 5**: substrate-without-consumer is binary at K close.
  If you ship substrate, it has ≥ 2 consumers OR a formal-retire rationale.
  No "preemptive" substrate.
- **Per K invariant 6**: architectural transposition is the default —
  collapse at the canonical root and retire the original; no "wrap and
  rename." K headline = audacious primary-CTA extraction (W6).
- **Per K invariant 7**: vocab convergence is gestalt sweep, not leaf
  migration. If you migrate one site, sweep all sites.
- **Per K invariant 8**: doc-drift is binary at close. If you change a
  primitive, update CLAUDE.md / README.md / DESIGN.md in the same wave.

## Audit-precept rules (binding from J W0 + K W0 amendments)

- **Per W0 precept update (J + K)**: run `npm run typecheck` after each
  major file group, not just at the end.
- **Per K W0 precept update**: visual-load-bearing-ness probes are
  mandatory for visual artefacts (Playwright screenshot, getComputedStyle
  reading, or runtime contrast probe — not just file:line citations).
- Tailwind-first: any new utilities expressed via `@theme` + `@utility`,
  never pasted raw class strings.
- One style authority per family. Do not duplicate definitions.
- If scope reveals work outside this wave or ownership, stop and report
  the scope reveal — do not broaden silently.
- Storybook is the oracle. New / kept components require ≥ 1 in-repo
  story; per-story consumption sweep at close confirms canonical adoption.
- Bundle/CSS deltas are HARD-fail gates per K invariant 9 (bundle-budget
  restored).
- Visual-load-bearing-ness: any visual artefact ships rendered evidence
  (Playwright screenshot, getComputedStyle, runtime contrast probe).
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
- Confirmation that NO mutating git subcommand was run during this dispatch.
```

## Wave-specific reading

Each wave spec (`waves/W{0..8}.md`) names exact files, symbols, and commands. The 6 research deliverables (`research/R{α,β,γ,δ,ε,ζ}-*.md`) are supporting context with diagnoses + proposed fixes — wave specs reference rather than restate.

## Implementation Dispatch Constraints

- **W0 lane I** (reconciliation audit) is read-only on src/, demo/, consumer trees; write-only on `docs/tranches/K/audit/`.
- **W0 lane II** (precept submodule update) is write-only on `docs/precepts/instructions/`.
- **W1 lane A** (silent-miss closeout — `hoverOpenDelay` + CartoonCard adoption): worktree-isolation REQUIRED; shares hover-popover/HoverPopover.vue + 8 demo stories.
- **W1 lane B** (Configurator unification gestalt completion): isolation OPTIONAL; bounds disjoint from Lane A.
- **W2 single lane** (substrate retire-or-wire): sequential decision wave.
- **W3 lane A + B** (vocab.γ second pass): worktree-isolation REQUIRED; both touch `src/styles/*` and `demo/stories/*`.
- **W4 lane A + B** (doc + tooling cohort): isolation OPTIONAL; bounds disjoint (Lane A = docs/, Lane B = scripts/ + .github/ + package.json).
- **W5 single lane** (mobile-viewport fitness): sequential.
- **W6 lane A + B** (audacious primary-CTA extraction + consumer migration): worktree-isolation REQUIRED.
- **W7 single lane** (drag-keep-open contract WIRE): sequential.
- **W8 orchestrator + 7 audit lanes** (strengthened canonical pattern with NEW ι integrity-sweep lane).

## Worktree integration protocol

When a wave dispatches with worktree-isolated lanes:

1. Orchestrator creates worktrees via the `Agent` tool's `isolation: "worktree"` param. Each agent operates on a private clone.
2. At wave close, each agent reports its branch + commit-equivalent (it should NOT have committed; it edits files in its private tree).
3. Orchestrator integrates by reading each agent's working-tree state (via the worktree path returned in the agent's report) and applying the changes via Edit/Read in the main repo. The agent's worktree is then cleaned up (auto-cleanup if no changes; explicit cleanup if changes integrated).
4. Orchestrator commits the integrated diff under `feat(tranche-k/wN): summary`.

This is the canonical pattern. Single-agent waves and read-only audit waves skip worktree creation.

## Close discipline

- Per H invariant 10 + I invariant 10: orchestrator commits each wave's
  diff at wave close under `feat(tranche-k/wN): summary` (or
  `chore(...)` / `fix(...)` / `docs(...)` as appropriate).
- Per K invariant 12: the strengthened **7-agent** post-close audit
  (α/β/γ/δ/ε/π/**ι** integrity-sweep) runs BEFORE FINAL.md is final.
