// proof:nda-decided — BB.W-NDA-DECIDE: the founding-chronic TERMINAL-decision lock.
//
// The disposition surface was built to kill ONE disease, named verbatim in
// proof-disposition-live.mjs's own docstring: "the native-drawer LATE-1:
// trigger met at AT, ignored". The `native-drawer-as-asChild` row (AT W0-L4
// ledger #8) rode BOOK'd five tranches (AT→AU→AV→AW→AX→AY→AZ→BA) — re-stamped
// un-MET every close, never DECIDED. BB §2's mandate is to DECIDE each chronic
// (build / retire / meet), never re-book. W-NDA-DECIDE fired that decision: the
// §0 evidence pass found NO host (GlassDialogNative pruned at AY 077fe58f), a
// 0-of-8-consumer trigger, no speedtest BB-ask, the need covered by
// <Drawer mode="live-behind"> — RETIRE-with-rationale.
//
// This gate LOCKS that terminal decision: the founding row MUST stay terminally
// `retired` with the full evidence shape, so a future planner cannot re-read the
// founding prose and re-book a watch on a ghost (the exact AY.W-NDA §1-D2 hazard
// the carry realized). A flip back to `book`, a blank rationale, an empty
// successor, a surviving `pendingResolvedBy`, or a `retiredBy` that names no real
// wave-spec — any of these REDs the lock.
//
// SELF-PROVING: the detector is run against a synthetic mutated copy of the row
// (flipped back to `book` + blank rationale) every invocation; the gate REDs
// loudly if its own detector fails to flag that mutation as a violation. The bite
// is demonstrated on every run, not just once.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:nda-decided";
const REGISTER = join(ROOT, "docs/tranches/AX/audit/DISPOSITION-REGISTER.json");
const WAVES_DIR = join(ROOT, "docs/tranches");
const FOUNDING_ID = "native-drawer-as-asChild";

// A decided destination (retiredBy/resolvedBy) must resolve to a real wave-spec
// on disk: docs/tranches/<LETTER>/waves/<id>.md. Mirrors the existing
// proof-disposition-live decided-destination clause's resolution rule.
function waveSpecExists(waveId) {
    if (typeof waveId !== "string" || !waveId.includes(".")) return false;
    const [letter] = waveId.split(".");
    return existsSync(join(WAVES_DIR, letter, "waves", `${waveId}.md`));
}

// THE LOCK PREDICATE — returns a list of violations for a given founding row.
// A terminal RETIRE (the evidence-decided branch) OR a terminal RESOLVE (the
// build contingency) is accepted; a `book`/`archived` row, a blank rationale, an
// empty successor (retire branch), a surviving pendingResolvedBy, or a
// retiredBy/resolvedBy naming no wave-spec is a violation.
function lockViolations(row) {
    const v = [];
    if (!row) {
        v.push(`founding row "${FOUNDING_ID}" is ABSENT from the register (the no-delete fence broke — a flip is in place, never a delete)`);
        return v;
    }
    const disp = row.disposition;
    const isRetired = disp === "retired";
    const isResolved = disp === "resolved";
    if (!isRetired && !isResolved)
        v.push(`disposition is "${disp}" — NOT terminal; the founding chronic re-books (must be "retired" [§A] or "resolved" [§B])`);

    // pendingResolvedBy MUST be discharged — a surviving pending is a perpetual carry.
    if (row.pendingResolvedBy)
        v.push(`pendingResolvedBy:"${row.pendingResolvedBy}" survives — the pending decision is unfired (must be discharged to a terminal retiredBy/resolvedBy)`);

    if (isRetired) {
        // The terminal RETIRE record (the evidence-decided branch).
        if (!row.retiredBy || !String(row.retiredBy).trim())
            v.push(`retired row carries no retiredBy — the terminal decision names no wave-spec`);
        else if (!waveSpecExists(row.retiredBy))
            v.push(`retiredBy:"${row.retiredBy}" names no real wave-spec (docs/tranches/<L>/waves/<id>.md)`);
        // Anti-silent-drop: a retired row MUST carry a non-empty rationale
        // (mirrors the RETIRES-empty-rationale phantom clause in proof:disposition-live).
        if (!row.rationale || !String(row.rationale).trim())
            v.push(`retired row carries a blank rationale — a silent drop, not a recorded retirement`);
        // A retire WITH a successor (the named living destination — never a silent drop).
        if (!row.successor || !String(row.successor).trim())
            v.push(`retired row carries no successor — a retirement must name its living destination`);
    }
    if (isResolved) {
        // The terminal BUILD record (the contingency the §0 evidence foreclosed).
        if (!row.resolvedBy || !String(row.resolvedBy).trim())
            v.push(`resolved row carries no resolvedBy — the build decision names no wave-spec`);
        else if (!waveSpecExists(row.resolvedBy))
            v.push(`resolvedBy:"${row.resolvedBy}" names no real wave-spec`);
        if (row.resolved !== true)
            v.push(`resolved row has resolved !== true (a resolved-by-build row is resolved)`);
    }
    return v;
}

const reg = JSON.parse(readFileSync(REGISTER, "utf8"));
const items = reg.items ?? [];
const founding = items.find((i) => i.id === FOUNDING_ID);

const violations = lockViolations(founding);

// SELF-TEST (the bite, run every invocation): mutate a synthetic copy of the
// founding row back to the disease state (book + blank rationale + surviving
// pending) and assert the detector flags it. If the synthetic mutation is NOT
// flagged, the lock is not load-bearing → RED loudly.
const SYNTH = {
    id: FOUNDING_ID,
    disposition: "book",
    rationale: "",
    successor: "",
    pendingResolvedBy: "BB.W-NDA-DECIDE",
};
const synthViolations = lockViolations(SYNTH);
const selfTestFlags = synthViolations.length > 0;
if (!selfTestFlags) {
    console.error(
        "[proof:nda-decided] SELF-TEST FAILED — the synthetic disease-state row (book + blank rationale + surviving pending) was NOT flagged; the lock detector is not load-bearing.",
    );
    process.exit(1);
}

// A second bite: a `retiredBy` naming a phantom wave-spec MUST be flagged.
const SYNTH_PHANTOM = {
    id: FOUNDING_ID,
    disposition: "retired",
    retiredBy: "BB.W-DOES-NOT-EXIST",
    rationale: "x",
    successor: "x",
};
if (lockViolations(SYNTH_PHANTOM).every((m) => !m.includes("no real wave-spec"))) {
    console.error(
        "[proof:nda-decided] SELF-TEST FAILED — a retiredBy naming a phantom wave-spec was NOT flagged; the destination-soundness bite is not load-bearing.",
    );
    process.exit(1);
}

const pass = violations.length === 0;

console.log("proof:nda-decided — the founding-chronic terminal-decision lock (BB.W-NDA-DECIDE)");
console.log(`  founding row          : ${FOUNDING_ID}`);
console.log(`  disposition           : ${founding ? founding.disposition : "ABSENT"}`);
console.log(`  retiredBy/resolvedBy  : ${founding ? founding.retiredBy ?? founding.resolvedBy ?? "—" : "—"}`);
console.log(`  pendingResolvedBy     : ${founding && founding.pendingResolvedBy ? founding.pendingResolvedBy : "(discharged)"}`);
console.log(`  rationale present     : ${founding && founding.rationale ? "yes" : "no"}`);
console.log(`  successor present     : ${founding && founding.successor ? "yes" : "no"}`);
console.log(`  self-test (bite proof): OK — synthetic disease-state + phantom-dest rows flagged`);
console.log(`  lock violations       : ${violations.length}`);
for (const m of violations) console.error(`  LOCK-VIOLATION   ${m}`);

const ARTIFACT = gateArtifactPath("GATE_NDA_DECIDED_OUT", "BB-nda-decided");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    command: COMMAND,
    status: pass ? "pass" : "fail",
    foundingId: FOUNDING_ID,
    disposition: founding ? founding.disposition : null,
    retiredBy: founding ? founding.retiredBy ?? null : null,
    resolvedBy: founding ? founding.resolvedBy ?? null : null,
    pendingResolvedBy: founding ? founding.pendingResolvedBy ?? null : null,
    selfTestFlagged: selfTestFlags,
    violations,
});

if (!pass) {
    console.error(
        `\n[proof:nda-decided] the founding chronic is NOT terminally decided — ${violations.length} lock violation(s). The native-drawer-as-asChild row must carry a TERMINAL disposition (retired/resolved) with the full evidence shape; a re-book is the disease this gate exists to end.`,
    );
    process.exit(1);
}
console.log("\n[proof:nda-decided] the founding chronic native-drawer-as-asChild is TERMINALLY decided — RETIRE-with-rationale, off the watch, no re-book.");
