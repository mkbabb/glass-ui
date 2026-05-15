# P tranche — agent dispatch template

Extends O's dispatch template (`docs/tranches/O/dispatch/AGENT.md`) with P-tranche specifics.

## Hardened agent git clause (binding non-negotiable; inherited; 6th-recurrence-window open)

NO mutating git. Forbidden subset:

- `git add` / `git stash` (any form; 6th-recurrence window open per N.W1 + the 5 documented LL entries through 2026-05-14) / `git commit` / `git commit --amend`
- `git checkout <branch>` / `git checkout <path>`
- `git reset` / `git restore` / `git mv` / `git rebase` / `git merge` / `git cherry-pick` / `git revert`
- `git push` / `git pull` / `git fetch --prune`

**Allowed (read-only)**: `git log`, `git diff`, `git show`, `git status`, `git reflog`, `git tag -l`, `git branch -l`, `git remote -v`, `git config --get`, `git ls-tree`, `git ls-files`, `git stash list` (audit-only).

The orchestrator owns the index, the working tree mutation discipline, and all push operations in every repo.

**6th-recurrence-window note**: precept LL ledger carries 5 codified entries through `2026-05-14`. The next recurrence triggers tooling-side enforcement (invariant 27 codified at O.W0 Lane B) — a `scripts/audit-stash-list.mjs` fail-closed step. P close ι lane MUST verify the audit script exists + is callable, OR author it as a wave deliverable.

## ZERO DEFERRAL (NEW @ P; binding)

P operates under a new binding constraint not present at K → L → M → N → O: every item in the inheritance ledger (per `findings.md §2`) lands in P, retires formally with rationale, or is explicitly archived with permanent-out-of-scope justification.

- "Deferral with named-destination" — the canonical close-path at prior tranches — is **retired at P**.
- "PERMANENT-DEFER" classifications inherited from L (PD-1 + PD-2) — investigated + dispositioned during P; no PD survives close.
- Cross-repo carry-forwards — addressed via MULTI-WRITER per-repo lanes OR formal user-directed hand-off (with user-authorized cross-repo write commit in the same wave).

Per close-honesty checklist: every FINAL.md claim grounded in commit + artefact; every "DEFERRED" status word REPLACED by ADDRESSED / RETIRED / ARCHIVED.

## AB+1 retrospective dispatch (NEW @ P W0 HEADLINE)

Per K invariant 3 third recurrence (V → AB → AB+1). The v1.5.0 → v1.7.0 cohort shipped under speedtest-AC-W6 driven commits without a glass-ui-side plan folder. P W0 HEADLINE absorbs the retrospective.

Naming decision deferred to Pζ synthesis: either `docs/tranches/AB+1/` (mirrors the K invariant 3 commit-attribution naming) OR a new letter-skip (e.g., `docs/tranches/AB-prime/` or `docs/tranches/<new-letter-pre-O>/`). The retrospective:

- Reconstructs per-wave thesis from the 8-commit source range.
- Cites every commit hash + author-date.
- Documents the bundle-budget delta (CSS 95.7% → ? post-AB+1; verify at retrospective open).
- Documents the v1.7.0 untagged state (orchestrator tags at P W0 close OR retrospective close).

## Audit-verdict spot-verification gate (N invariant 22; binding at P)

Codified at precept `tranche/SPEC.md` §"Audit-verdict spot-verification gate" via N.W0 Lane B (commit `b8af314`). Before authoring a wave-spec that absorbs a retire / delete-unused / inline-and-remove verdict, the orchestrator MUST spot-verify the cited items at HEAD per the gate's (a) / (b) / (c) clauses.

At P: applies to AB+1 retrospective ledger items AND any P-wave retire decisions.

## Wire-before-retire posture (N invariant 23; binding at P)

Under-wired primitives default to WIRE, not RETIRE. Per P ZERO-DEFERRAL constraint: every under-wired primitive either lands ≥ 2 consumers IN THE SAME P-WAVE that surfaces the issue, OR retires formally with rationale.

## Worktree-diff verification (orchestrator close-step)

At each wave close, the orchestrator runs `git -C <worktree-path> diff --stat` to verify changes landed in the worktree (not in main; per K W8 LESSONS-LEARNED #1 + O.W2 worktree.baseRef drift incident).

**Recurrent harness-CWD-drift mitigation** (from O.W5): bash session CWD may drift into agent worktrees between calls. Orchestrator integrates by `cp <absolute-worktree-path>/<file> <absolute-main-tree-path>/<file>` AND prefixes commands with `cd /Users/mkbabb/Programming/glass-ui &&` when CWD-state-sensitive.

**Worktree.baseRef discipline (NEW @ P per O.W2 incident)**: when dispatching mid-wave agents that consume an intermediate commit's substrate, the orchestrator MUST push the intermediate commit BEFORE dispatching OR explicitly set worktree.baseRef=head. The O.W2 Lane B + Lane C agents both branched from origin/master pre-intermediate-push; only Lane B verified canonical shape via `git show`. P prefers push-before-dispatch as the canonical pattern.

## Cross-repo dispatch authorization (P expanded scope)

**MULTI-WRITER mode**: cross-repo writes across multiple peer repos in the same wave dispatched as per-repo lanes; NEVER bundled.

**User-authorized scope expansion at P**: per "No more deferrals" directive, P-wave cross-repo writes are authorized for every CR-* item in the inheritance ledger:

- CR-1 + CR-4 (value.js fixes + adoption sweeps) — value.js's WIP branch sync (PD-3 absorb) may also unlock the master-branch push window per user signal.
- CR-2 (fourier-analysis) — 2 dock-key injects + 3 useClipboard parallels.
- CR-3 (keyframes.js) — HeaderRibbon adoption + scale-on-hover migration.
- CR-5 (bbnf-buddy) — 1-line :deep() retirement.
- CR-6 (speedtest) — AC tranche cohort coordination; status-review-then-action.

**DEFERRED-PUSH retired at P**: peer-repo writes that previously documented "no push" status as a defer-path now require explicit RETIRE or LAND. The orchestrator authors a user-authorization request inline in the wave dispatch when a cross-repo write surfaces.

## Bidirectional style-audit + overfitting-audit canonical (N invariant 21; binding at P)

The 7-axis bidirectional style audit + the overfitting audit are canonical at every tranche that ships substrate work. P ships retrospective + remediation + substrate work; both audits are binding research at P open.

The 6-agent round-1 backend audit (Pα through Pζ) + the 6-agent round-2 consumer audit (P11/a-f) together comprise the canonical N-invariant-21 audit for P.

## Worktree isolation OR shared (per wave-spec)

Same as N + O dispatch:

- **worktree**: heavy / risky / cross-cutting changes; the dispatch template names it explicitly.
- **shared**: bounds-disjoint lanes; same-tree.
- **optional**: agent decides.

## Side-effect script disclosure

If an agent runs a script with side-effects (build, format, test, package), disclose in proof doc.

## Read-size cap

Use Read with explicit `limit` + `offset` parameters when file > 500 lines.

## Proof doc requirement

Every dispatched agent authors a proof doc at `docs/tranches/P/{research,audit}/<lane>-<title>.md`. Mandatory sections same as O template.

## P-specific deliverable shape (research lanes)

Each research lane returns a deliverable per `tranche/RESEARCH.md` §"Agent Prompt Skeleton". For P: every recommendation MUST cite a concrete P-wave destination (zero deferral).

## HARD CAPs

- Research/audit: 25 min default.
- Implementation: 30 min default (when implementation lanes dispatch at a later wave).
- Doc-only: 20 min default.
- Pζ recap+chronic+defer-fold (the headline lane): 30 min (largest research deliverable).

Every dispatch prompt names the cap; the orchestrator monitors.
