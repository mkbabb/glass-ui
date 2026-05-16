# O tranche—agent dispatch template

Extends N's dispatch template (`docs/tranches/N/dispatch/AGENT.md`) with O-tranche specifics.

## Hardened agent git clause (binding non-negotiable; inherited; 6th-recurrence-window open)

NO mutating git. Forbidden subset:

- `git add` / `git stash` (any form; 6th-recurrence after N.W1 Lane C self-disclosed) / `git commit` / `git commit --amend`
- `git checkout <branch>` / `git checkout <path>` (file-level enumerated per M.Rδ P1)
- `git reset` / `git restore` / `git mv` / `git rebase` / `git merge` / `git cherry-pick` / `git revert`
- `git push` / `git pull` / `git fetch --prune`

**Allowed (read-only)**: `git log`, `git diff`, `git show`, `git status`, `git reflog`, `git tag -l`, `git branch -l`, `git remote -v`, `git config --get`, `git ls-tree`, `git ls-files`.

The orchestrator owns the index, the working tree mutation discipline, and all push operations in every repo.

**6th-recurrence-window note**: precept LL ledger now carries 4 codified entries (`2026-05-04`, `-06`, `-09`, `-12`) on the stash anti-pattern. N.W1 Lane C self-disclosed a 5th occurrence (clean round-trip; documented). If a 6th occurs at O dispatch, codify a 5th LL entry—the prose ladder is no longer sufficient; future enforcement may need tooling-side (pre-commit hook or harness-level block).

## Repo-relative paths in worktrees (binding per K W8 LESSONS-LEARNED #1)

When operating in a worktree (`isolation: "worktree"`), agents MUST use repo-relative paths (`src/...`, `demo/...`, `docs/...`). Cross-repo READ-only operations may use absolute paths.

## Audit-verdict spot-verification gate (N invariant 22; binding at O)

Codified at precept `tranche/SPEC.md` §"Audit-verdict spot-verification gate" via N.W0 Lane B (commit `b8af314`). Before authoring a wave-spec that absorbs an audit's retire / delete-unused / inline-and-remove verdict, the orchestrator MUST spot-verify the cited items at HEAD. The N tranche caught 6 false-positives via this gate (`useGlassAlpha` hallucination; J-6 tokens FP; `useTouchGate` undercounted consumer; viewport-meta already in place; text-micro utility already in place; dock-blur audit already at floor). Each one would have led to misguided retirement OR scope creep at a prior tranche.

At O: every research-agent verdict that proposes a removal / inline / migration MUST cite spot-verified evidence (file path, rg invocation, line-level reference). The orchestrator independently re-verifies at synthesis time before authoring the wave-spec.

## Wire-before-retire posture (N invariant 23; binding at O)

Codified at precept `instructions/README.md §"Edicts"` via N.W0 Lane B (commit `b8af314`). Under-wired primitives default to WIRE, not RETIRE. Retirement requires explicit "no proper wiring target exists" rationale recorded in the prune / wire ledger.

At O: legacy-code audit findings are still candidates for excision (per directive O1)—but if the audited surface is _under-wired_ rather than _legacy_, the disposition is WIRE, not RETIRE. The two failure modes are distinct: legacy = obsolete code path requiring active maintenance burden; under-wired = useful-shaped substrate with low consumer count. Per the N precedent (useTouchGate caught as undercounted, not legacy), the audit MUST distinguish.

## Worktree-diff verification (orchestrator close-step)

At each wave close, the orchestrator runs `git -C <worktree-path> diff --stat` to verify changes landed in the worktree (not in main; per K W8 LESSONS-LEARNED #1 + N.W4 ι sweep recurrent harness-CWD-drift pattern).

**Recurrent harness-CWD-drift note** (from N.W4): bash session CWD can drift into agent worktrees between calls. Mitigation: orchestrator integrates by `cp <absolute-worktree-path>/<file> <absolute-main-tree-path>/<file>` to avoid relative-path resolution against the wrong tree. The `cp` from worktree to main is the canonical integration step.

## Cross-repo dispatch authorization (N-inherited)

**MULTI-WRITER mode**: cross-repo writes across multiple peer repos in the same wave dispatched as per-repo lanes; NEVER bundled.

**DEFERRED-PUSH**: peer-repo writes that cannot push (e.g., user WIP branch) documented in CONSTELLATION.md §6 + escalated to user.

**Cross-repo push asymmetry note** (from N.W0 A5): a master-branch push to a peer repo may piggyback the user's intermediate-state commits if origin is behind. Per LL `2026-05-11 Cross-Repo Annotation Push Asymmetry`, the orchestrator commits cross-repo ONLY when (a) the action is user-authorized OR (b) the action falls within explicit cross-repo dispatch scope AND the receiving repo has an in-flight tranche AND the annotation is purely additive. The push-or-handoff disposition is ALWAYS documented in the originating FINAL.md cross-tranche-debt section.

## Bidirectional style-audit + overfitting-audit canonical (N invariant 21; binding at O)

Codified at precept `tranche/RESEARCH.md` §"Canonical Angles" angles 7+8 via N.W0 Lane B. The 7-axis bidirectional style audit (`docs/audits/style-audit.md`) + the overfitting audit (`docs/audits/overfitting-audit.md`) are canonical at every tranche that ships substrate work. O ships substrate work (refactor + architectural transpositions); both audits are binding research at O open.

The O.W0 6-agent backend audit + the round-2 6-agent consumer audit together comprise the N invariant 21 canon for this tranche.

## Worktree isolation OR shared (per wave-spec)

Same as N dispatch:

- **worktree**: heavy / risky / cross-cutting changes; the dispatch template names it explicitly.
- **shared**: bounds-disjoint lanes; same-tree.
- **optional**: agent decides.

## Side-effect script disclosure (inherited)

If an agent runs a script with side-effects (build, format, test, package), disclose in proof doc.

## Read-size cap (inherited)

Use Read with explicit `limit` + `offset` parameters when file > 500 lines. (The 500-line guidance is the same threshold as O's god-module discipline; reading a 500-line file is the audit signal that the file is a split candidate.)

## Proof doc requirement (binding)

Every dispatched agent authors a proof doc at `docs/tranches/O/audit/<round>-<lane>-<title>-proof.md`. Mandatory sections:

- § Disposition (per-finding verdict + spot-verified evidence path)
- § File changes summary (applies to implementation lanes only; research lanes return audit deliverable)
- § Verification (typecheck / test / build status; or for research: read-command + rg invocations cited)
- § Open questions for orchestrator
- § Worktree diff verification output (or: "this lane is read-only—no diff")

## O-specific deliverable shape (research lanes)

Each backend-audit research lane returns a deliverable per `tranche/RESEARCH.md` §"Agent Prompt Skeleton":

1. Angle summary
2. Evidence (paths, commands, output files, prior tranche docs)
3. Findings (separated: facts vs. hypotheses)
4. Proposed plan implications (which O.W* wave absorbs)
5. Risks and unknowns

No vague advice; no speculative performance claims. Every finding cites a path or rg invocation.

## HARD CAP

- Research/audit: 25 min default.
- Implementation: 30 min default (when implementation lanes dispatch at a later wave).
- Doc-only: 20 min default.

Every dispatch prompt names the cap; the orchestrator monitors.
