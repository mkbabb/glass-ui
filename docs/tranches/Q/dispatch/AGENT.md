# Q tranche — agent dispatch template

Extends P's dispatch template (`docs/tranches/P/dispatch/AGENT.md`) with Q-tranche specifics.

## Hardened agent git clause (binding non-negotiable; inherited)

NO mutating git. Forbidden subset for agents:

- `git add` / `git stash` (any form) / `git commit` / `git commit --amend`
- `git checkout <branch>` / `git checkout <path>`
- `git reset` / `git restore` / `git mv` / `git rebase` / `git merge` / `git cherry-pick` / `git revert`
- `git push` / `git pull` / `git fetch --prune`

**Allowed (read-only)**: `git log`, `git diff`, `git show`, `git status`, `git reflog`, `git tag -l`, `git branch -l`, `git remote -v`, `git config --get`, `git ls-tree`, `git ls-files`, `git stash list` (audit-only).

The orchestrator owns the index, the working-tree mutation discipline, and all push operations in every repo. `scripts/audit-stash-list.mjs` (shipped P.W2) is the tooling-side fail-closed enforcement — every Q-wave close gate matrix invokes `npm run audit:stash`.

## ZERO DEFERRAL (inherited P invariant 28; binding)

Every item in the Q inheritance ledger (per `findings.md §4`) lands in Q, retires formally with rationale, or is explicitly archived with permanent-out-of-scope justification. The PERMANENT-DEFER classification does not exist in Q's lexicon. Per close-honesty: every FINAL.md claim grounded in commit + artefact.

## Post-P shadow-cohort retrospective dispatch (Q headline)

Per invariant 29 (AB+1 retrospective discipline; codified P.W6) — and the 4th K-invariant-3 recurrence happened AFTER that codification. The 7-commit post-P cohort (`9f774b4..d244dd5`) requires a retrospective plan folder. Q.Rε scopes it; a Q wave authors it. The Q tranche additionally investigates WHY codification did not prevent the recurrence (codification is necessary-but-not-sufficient).

## Consumer-breakage forensics posture (Q HEADLINE)

The Q tranche opens on a functional-regression report. Agents auditing the breakage MUST attribute root cause to a specific commit + file + line — not "the dock looks off" but "commit `099d51e` removed the `.dock-edge-fade` rule that `dock.css:N` depended on". Visual evidence (Qζ Playwright screenshots) pairs with static attribution (Qα).

## Visual-runtime probe RE-ACTIVATED (Playwright)

The π lane was archived 3× as tooling-unavailable. Playwright tools are online. Q.Rζ runs the live probe; if the Q tranche confirms the tooling is stable, the π lane RETIRES from "archived" to "binding canonical close-ceremony lane" — a precept advance candidate for Q close.

## Worktree isolation

Per P dispatch: heavy/risky/cross-cutting → worktree; bounds-disjoint → shared. Round-1 + round-2 audits are READ-ONLY → shared tree, no worktree.

## Cross-repo dispatch authorization

Q inherits P's MULTI-WRITER expanded scope. The consumer-breakage remediation will require cross-repo writes to value.js + keyframes.js (+ possibly others). Per-repo lanes; NEVER bundled. The orchestrator owns consumer-repo commits + pushes.

## Proof doc requirement

Every dispatched agent authors a proof doc at `docs/tranches/Q/{research,audit}/<lane>-<title>.md`. Mandatory sections per the P template.

## HARD CAPs

- Research/audit: 25-35 min (HEADLINE lanes Qα + Qε get 35; Qζ live-probe gets 40).
- Implementation: 30 min (when implementation lanes dispatch at a later wave).
- Doc-only: 20 min.

## Operational constraints for Q-wave implementation agents (when dispatched)

Per the P.W2-W6 lessons:
- NO `git stash` (the audit script fails the wave close if any agent stashes).
- NO `npm run build` mid-task when sibling agents run in parallel (build mutates `dist/`).
- Validate with `npm run typecheck` + `npm test` only; orchestrator runs the full gate matrix at wave close.
