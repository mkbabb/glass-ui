# M tranche — agent dispatch template

Extends L's dispatch template (`docs/tranches/L/dispatch/AGENT.md`) with M-tranche specifics.

## Hardened agent git clause (binding non-negotiable; extended at M)

NO mutating git. Forbidden subset (extended per M.Rδ P1):
- `git add`
- `git stash` / `git stash pop` / `git stash drop` (per K W8 LESSONS-LEARNED #2)
- `git commit` / `git commit --amend`
- `git checkout <path>` (NEW at M per L W1 Lane B self-disclosed incident — extends to file-level checkout, not just branch-switch)
- `git checkout <branch>` (forbidden)
- `git reset` (any mode)
- `git restore` (any flag)
- `git mv`
- `git rebase` / `git rebase --abort`
- `git merge` / `git merge --abort`
- `git cherry-pick` / `git revert`
- `git push` / `git push --force` / `git push origin <tag>`
- `git pull` / `git fetch --prune`

**Allowed (read-only)**: `git log`, `git diff`, `git show`, `git status`, `git reflog`, `git tag -l`, `git branch -l`, `git remote -v`, `git config --get`, `git ls-tree`, `git ls-files`.

The orchestrator owns the index, the working tree mutation discipline, and all push operations.

## Repo-relative paths (binding per K W8 LESSONS-LEARNED #1)

When operating in a worktree (`isolation: "worktree"`), agents MUST use repo-relative paths:
- `src/...`, `demo/...`, `docs/...`
- NEVER absolute paths like `/Users/mkbabb/Programming/glass-ui/...`

EXCEPTION at M: cross-repo READ-only operations may use absolute paths (the agent reads files in peer repos like `/Users/mkbabb/Programming/speedtest/src/...`). Read-only ONLY. WRITE operations on cross-repo files require explicit orchestrator-side authorization; agents do not write to peer repos by default.

## Worktree diff verification (orchestrator close-step)

At each wave close, the orchestrator runs `git -C <worktree-path> diff --stat` to verify changes landed in the worktree (not in the main tree). New at M: also runs `git -C <peer-repo> status --short` for every cross-repo lane to verify peer-repo writes are scoped to the dispatched bounds.

## Cross-repo dispatch authorization (M-new)

Per M.Rδ P3 (cross-repo commit policy extension):

- **MULTI-WRITER mode**: when a tranche authorizes orchestrator-side writes across multiple peer repos (e.g., M.W0 retired-subpath fix across words + fourier-analysis + bbnf-buddy), each peer-repo edit is dispatched as its own lane OR delegated to the orchestrator's main thread, NEVER bundled into a single mega-agent.
- **CONSTELLATION-SCAN mode**: read-only constellation surveys (like Rβ §C or Rε §A) are agent-dispatched but read-only.
- **DEFERRED-PUSH**: if a peer-repo write cannot push (e.g., precept submodule REAUDIT divergence), document in CONSTELLATION.md §6 and escalate to user.

## Single-human-multi-orchestrator pattern (M-new per M.Rδ P7)

The user holds multiple orchestrator roles simultaneously (L orchestrator + Y orchestrator + bbnf-lang orchestrator + ...). Each tranche's plan documents which role makes which decision; the user retains the cross-tranche supervisory role. At M:
- M orchestrator = glass-ui-side tranche owner
- Y orchestrator = speedtest-side tranche owner (also user)
- bbnf-lang orchestrator = bbnf-lang-side (also user)
- All defer to user at cross-tranche conflicts.

Inside dispatch prompts, agents address "M orchestrator" (this tranche's role) and route cross-tranche concerns through the user.

## Worktree isolation OR shared (per wave-spec)

Each wave spec declares `isolation: worktree | shared | optional`:
- **worktree**: heavy / risky / cross-cutting changes; orchestrator integrates at close.
- **shared**: bounds-disjoint lanes can share the main tree (faster integration; risk: parallel-edit races).
- **optional**: agent decides based on its scope.

## Side-effect script disclosure (M.Rδ P5 — NEW)

If an agent runs a script with side-effects (e.g., `npm run proof:package` which may write artifacts), the agent MUST disclose this in its proof doc + verify no out-of-bounds state was left behind. Mitigates the K W6 absolute-path circumvention class.

## Read-size cap

Agents that read a file should use Read with explicit `limit` and `offset` parameters when file > 500 lines. Avoid Read-without-limit on large files (LESSONS-LEARNED context).

## Proof doc requirement (binding)

Every dispatched agent authors a proof doc at `docs/tranches/M/audit/W{N}-<lane>-<title>-proof.md`. Mandatory sections:
- § Disposition (what was done)
- § File changes summary
- § Verification (typecheck / test / build status)
- § Open questions for orchestrator
- § Worktree diff verification output (the `git status --short` end-of-task output)
