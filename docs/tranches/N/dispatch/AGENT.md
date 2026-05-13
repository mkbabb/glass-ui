# N tranche — agent dispatch template

Extends M's dispatch template (`docs/tranches/M/dispatch/AGENT.md`) with N-tranche specifics.

## Hardened agent git clause (binding non-negotiable; inherited from M)

NO mutating git. Forbidden subset:
- `git add` / `git stash` (any form; 4th-recurrence enforcement per M.W4 LESSONS-LEARNED) / `git commit` / `git commit --amend`
- `git checkout <branch>` / `git checkout <path>` (file-level enumerated per M.Rδ P1)
- `git reset` / `git restore` / `git mv` / `git rebase` / `git merge` / `git cherry-pick` / `git revert`
- `git push` / `git pull` / `git fetch --prune`

**Allowed (read-only)**: `git log`, `git diff`, `git show`, `git status`, `git reflog`, `git tag -l`, `git branch -l`, `git remote -v`, `git config --get`, `git ls-tree`, `git ls-files`.

The orchestrator owns the index, the working tree mutation discipline, and all push operations in every repo.

## Repo-relative paths in worktrees (binding per K W8 LESSONS-LEARNED #1)

When operating in a worktree (`isolation: "worktree"`), agents MUST use repo-relative paths (`src/...`, `demo/...`, `docs/...`). Cross-repo READ-only operations may use absolute paths.

## Worktree-diff verification (orchestrator close-step)

At each wave close, the orchestrator runs `git -C <worktree-path> diff --stat` to verify changes landed in the worktree (not in main).

## Cross-repo dispatch authorization (M-inherited)

**MULTI-WRITER mode**: cross-repo writes across multiple peer repos in the same wave dispatched as per-repo lanes; NEVER bundled.

**DEFERRED-PUSH**: peer-repo writes that cannot push (e.g., user WIP branch) documented in CONSTELLATION.md §6 + escalated to user.

## Bidirectional style-audit canonical (N-new per invariant 21)

Tranche-open research includes a 7-axis bidirectional style audit per `docs/audits/style-audit.md`. The audit fans out as parallel read-only sub-agents over disjoint slices; orchestrator merges per-agent reports into one. This was executed at N open (Rγ self-audit + Rδ consumer-audit deliverables).

At N.W4 close, a 6-agent consumer post-migration audit (per N11) re-runs the style audit on every consumer in light of N substrate work.

## Mobile-density expectations (N-new per invariant 22)

Any agent introducing or modifying a configurator or chrome surface must verify mobile density at 3 viewports (375 / 1024 / 1440). Existing M.W4 π lane methodology applies.

## Worktree isolation OR shared (per wave-spec)

Same as M dispatch:
- **worktree**: heavy / risky / cross-cutting changes
- **shared**: bounds-disjoint lanes
- **optional**: agent decides

## Side-effect script disclosure (inherited)

If an agent runs a script with side-effects, disclose in proof doc.

## Read-size cap (inherited)

Use Read with explicit `limit` + `offset` parameters when file > 500 lines.

## Proof doc requirement (binding)

Every dispatched agent authors a proof doc at `docs/tranches/N/audit/W{N}-<lane>-<title>-proof.md`. Mandatory sections:
- § Disposition
- § File changes summary
- § Verification (typecheck / test / build status)
- § Open questions for orchestrator
- § Worktree diff verification output

## Style-audit deliverables (N-specific)

When applying the 7-axis style audit (Rγ self / Rδ consumer / N.W4 N11 consumer-audit), the deliverable shape per `docs/audits/style-audit.md` is binding:
1. Preamble (scope, target, glass-ui revision)
2. Drift findings grouped by axis
3. Glass-ui gaps section
4. Union candidates section
5. Closing tally
