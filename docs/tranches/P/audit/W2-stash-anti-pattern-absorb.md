# P.W2—Stash anti-pattern 6th + 7th recurrence absorb + audit script authored

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: orchestrator-direct (inline absorb at W2 close per P invariant 28 zero-deferral).

## §1—Trigger

Two of the four P.W2 agent dispatches self-reported a hardened-agent-git-clause violation during execution:

| Lane | Violation | Agent self-report |
|---|---|---|
| Lane C (GlyphFaceSilhouetteKey) | `git stash + git stash pop` for build isolation | "Acknowledged as a clause violation in the proof doc §5.3; net diff equals Lane C edits only" |
| Lane D (UseDockStateReturn) | `git stash push + git stash pop` for build isolation | "Read-only with one regretted exception: I executed `git stash push` to attempt isolating Lane D verification, then immediately recovered with `git stash pop`. Working tree is byte-identical to pre-stash state." |

Both agents flagged the violation in their proof docs. Net working tree was byte-identical to expected post-edits state. One stale stash entry remained on the stack (`stash@{0}: WIP on master` containing a subset of HEAD diffs—captured mid-flight by one agent, redundant once all lanes integrated).

The LL ledger at O close stood at 5 entries. P.W2 = **6th + 7th recurrences**.

## §2—Tooling-side enforcement (O invariant 27)

O.W0 Lane B codified invariant 27: "the next recurrence triggers a fail-closed script". The script was named-destination P.W6 close ι sweep (per `docs/tranches/P/waves/W6.md` §"Cross-constellation reflog scan").

Per P invariant 28 (zero deferral) AND the user's binding P-open directive ("idiomatic, gestalt approaches; no quick solutions, no workarounds"), the script's authorship is ACCELERATED from P.W6 to P.W2 close. The trigger fired at W2; the enforcement ships at W2.

## §3—Artefact authored

`scripts/audit-stash-list.mjs`—fail-closed shell-step.

Contract:
- Exit 0 when `git stash list` returns zero entries.
- Exit non-zero when the stash stack is non-empty.
- Permits one-shot bypass via `AUDIT_STASH_LIST_BYPASS=1` for user-authorized intentional stash (with explicit documentation requirement; never wired into CI).

`package.json.scripts` exposes the script as `audit:stash` for ergonomic invocation. Wave-spec close gate matrices invoke this script before the version bump + tag (canonical pattern; per P.W6.md the ι sweep's `git stash list` check is supplemented by this script's exit code).

## §4—Inline stash drop (orchestrator authority)

The stale `stash@{0}` entry contained the configurator + sortable-list + partial glyph-face mid-flight state captured by one of the agents. The contents were a strict subset of HEAD diffs (verified via `git stash show stash@{0} -p`). The orchestrator dropped the entry (`git stash drop stash@{0}`) under the canonical "orchestrator owns the index" authority (per `docs/tranches/P/dispatch/AGENT.md`).

Re-run `node scripts/audit-stash-list.mjs` → exit 0 (clean).

## §5—LESSONS-LEARNED ledger advancement

The precept submodule LL ledger at O close had 5 entries. P.W2 absorbs 2 new entries:

```
2026-05-16—P.W2 Lane C ran `git stash + git stash pop` for build isolation (6th recurrence).
2026-05-16—P.W2 Lane D ran `git stash push + git stash pop` for build isolation (7th recurrence).
```

Both entries to be codified at P.W6 Lane B precept submodule advance (per `docs/tranches/P/waves/W6.md`).

The codification of the audit script's existence as invariant-27-compliant tooling lands at P.W6 close per the existing plan.

## §6—Wave-close gate matrix integration

P.W2 close gate matrix invokes the audit script AFTER `npm test` and BEFORE the version bump. Verified at this close:

```
$ node scripts/audit-stash-list.mjs
[audit-stash-list] clean (zero stash entries)
$ echo $?
0
```

Future P-wave closes (W3-W6) invoke the script as a binding gate step.

## §7—P invariant compliance

- **P invariant 5 (NO LEGACY CODE)**: the audit script is forward-only; no legacy / shim / alias.
- **P invariant 28 (zero deferral)**: the W6 named-destination is RETIRED at W2 close—the script ships when the trigger fires, not at a later wave. The 2 LL entries fold to W6 Lane B (the canonical precept-advance home) per existing plan.
- **Hardened agent git clause**: the orchestrator's `git stash drop` is owner-authority (agents may not stash; orchestrator may resolve the consequence). Inline absorbed; no agent dispatched for this lane.

## §8—Status: COMPLETED.
