#!/usr/bin/env node
// Tooling-side enforcement for the hardened agent git clause's stash sub-clause.
//
// History:
//   - K.W0 codified the hardened agent git clause (`docs/precepts/instructions/
//     tranche/AGENT_DISPATCH_TEMPLATE.md`): agents may NEVER run mutating git,
//     including `git stash` in any form. The orchestrator owns the index.
//   - N.W1 LL entry first documented the stash anti-pattern; M + N + O each
//     recorded a recurrence (5 LL entries through 2026-05-14).
//   - O.W0 Lane B codified invariant 27: "tooling-side stash enforcement —
//     the next recurrence triggers a fail-closed script". The script
//     itself was named-destination P.W6 close ι sweep.
//   - P.W2 surfaced the 6th AND 7th recurrences (Lane C + Lane D both ran
//     `git stash push` + `git stash pop` for build isolation), triggering
//     this script's authorship at W2 close per P invariant 28 (zero deferral
//     — author the enforcement when the trigger fires, not at W6).
//
// Contract:
//   - Exit 0 when `git stash list` returns zero entries.
//   - Exit non-zero when the stash stack is non-empty.
//   - Wave-spec gate matrices (W close steps) invoke this script after
//     `npm test` and before the version bump + tag.
//   - The P.W6 close ι sweep continues to be the canonical auditor across
//     consumer repos + the precept submodule; this glass-ui-side script is
//     the local gate.
//
// Output is intentionally terse — the script is a gate, not a report.
//
// CI: a follow-on wave (or P.W4 Lane B's CI proof:* subset) may wire this
// into `.github/workflows/ci.yml` after we confirm local stability.

import { execFileSync } from "node:child_process";

function getStashList() {
    try {
        return execFileSync("git", ["stash", "list"], { encoding: "utf8" }).trim();
    } catch (err) {
        // Outside a git repo or git failed to run — fail closed: the
        // canonical wave-close gate must not silently skip enforcement.
        console.error("[audit-stash-list] git stash list failed:", err.message);
        process.exit(2);
    }
}

const list = getStashList();

if (list === "") {
    console.log("[audit-stash-list] clean (zero stash entries)");
    process.exit(0);
}

console.error("[audit-stash-list] FAIL — non-empty stash stack:\n");
console.error(list);
console.error("\n");
console.error(
    "The hardened agent git clause forbids `git stash` in any form. The",
);
console.error(
    "orchestrator owns the index. If you encountered this gate at a wave",
);
console.error(
    "close, inspect the stash contents (`git stash show stash@{0} -p`),",
);
console.error(
    "fold the changes into the wave commit, then `git stash drop` to clear",
);
console.error(
    "the stack. If the stash is intentional + user-authorized, document the",
);
console.error(
    "authorization at the wave's audit proof and re-run with",
);
console.error(
    "`AUDIT_STASH_LIST_BYPASS=1` (one-shot bypass; never wire into CI).",
);
console.error("");
console.error(
    "History: 5 LL entries through O close + 2 P.W2 recurrences (Lane C +",
);
console.error(
    "Lane D) triggered this gate's authorship.",
);

if (process.env.AUDIT_STASH_LIST_BYPASS === "1") {
    console.error(
        "[audit-stash-list] AUDIT_STASH_LIST_BYPASS=1 set — proceeding under user authorization",
    );
    process.exit(0);
}

process.exit(1);
