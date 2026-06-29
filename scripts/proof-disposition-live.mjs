// proof:disposition-live — AX.W62 Gate 5: the deferral-trigger re-evaluation gate.
//
// "BOOK-with-named-trigger" / "ARCHIVED-on-2-consumer-gate" is an unconditional
// defer wearing a gate's clothing when the named trigger is prose no machine
// reads. This gate parses the disposition register and FAILS the close if a
// book/archived row's trigger now re-evaluates MET while the row is still
// booked — so a deferral with a met condition cannot ride forward un-checked
// (the native-drawer LATE-1: trigger met at AT, ignored; the AN ARCHIVED items
// LATE-3: never re-checked).
//
// A `min-consumers` trigger is MET when ≥ n DISTINCT present consumer repos
// (constellation.presentConsumers, self excluded) contain a line matching the
// grep pattern. Absent siblings are simply not counted (registry-default world).
//
// SELF-PROVING: the register carries a synthetic always-MET `selfTest` book row;
// the gate evaluates it every run and REDs loudly if its own detector fails to
// classify that row as a violation (acceptance is the RED-witness inverse). So
// the bite is demonstrated on every invocation, not just once.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { ROOT, CONSUMERS, resolveSibling } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:disposition-live";
const REGISTER = join(ROOT, "docs/tranches/AX/audit/DISPOSITION-REGISTER.json");
// AY.W-CARRY: the machine-readable BOOK-id manifest (the AT W0-L4 ledger's live set);
// the register-COMPLETENESS clause asserts every manifest id has a register row.
const MANIFEST = join(ROOT, "docs/tranches/AY/audit/deferred-ledger-manifest.json");
// AY.W-TRIAGE: the residual AX `planned`-wave disposition mirror; the phantom-owner
// clause asserts every ADDRESSED ayWave / DEFERS bookId / RETIRES rationale resolves.
const RESIDUAL = join(ROOT, "docs/tranches/AY/audit/residual-disposition.json");
const WAVES_DIR = join(ROOT, "docs/tranches/AY/waves");
const SRC_EXT = /\.(vue|ts|tsx|js|mjs|jsx|css)$/;
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".cache", "coverage"]);

function walk(dir, out = []) {
    let entries;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    } catch {
        return out;
    }
    for (const e of entries) {
        if (e.name.startsWith(".")) continue;
        const p = join(dir, e.name);
        if (e.isDirectory()) {
            if (SKIP_DIRS.has(e.name)) continue;
            walk(p, out);
        } else if (SRC_EXT.test(e.name)) {
            out.push(p);
        }
    }
    return out;
}

// Distinct present consumer repos (self excluded) whose source matches `pattern`.
const consumerFileCache = new Map();
function presentConsumerFiles(consumer) {
    if (consumerFileCache.has(consumer.id)) return consumerFileCache.get(consumer.id);
    const files = [];
    for (const root of consumer.roots ?? []) walk(root, files);
    consumerFileCache.set(consumer.id, files);
    return files;
}

function consumersMatching(pattern) {
    const re = new RegExp(pattern);
    const hits = [];
    for (const consumer of CONSUMERS) {
        if (consumer.self) continue;
        if (!resolveSibling(consumer).present) continue;
        const files = presentConsumerFiles(consumer);
        const matched = files.some((f) => {
            try {
                return re.test(readFileSync(f, "utf8"));
            } catch {
                return false;
            }
        });
        if (matched) hits.push(consumer.id);
    }
    return hits;
}

function triggerMet(trigger) {
    if (!trigger || trigger.kind !== "min-consumers") return { met: false, hits: [] };
    const hits = consumersMatching(trigger.grep);
    return { met: hits.length >= (trigger.n ?? 2), hits };
}

// ── Load + evaluate ───────────────────────────────────────────────────────────
if (!existsSync(REGISTER)) {
    console.error(`[proof:disposition-live] register not found: ${REGISTER}`);
    process.exit(1);
}
const reg = JSON.parse(readFileSync(REGISTER, "utf8"));

// ── Register-COMPLETENESS clause (AY.W-CARRY) ───────────────────────────────────
// The closure mechanism's own closure check: every BOOK id in the deferred-ledger
// manifest MUST have a register row (book/archived/retired). This is a PURE
// document cross-check — no siblings, no greps — so it runs BEFORE the sibling-
// present skip and fails the close on CI even with zero consumers on disk.
if (!existsSync(MANIFEST)) {
    console.error(`[proof:disposition-live] ledger manifest not found: ${MANIFEST}`);
    process.exit(1);
}
const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const registerIds = new Set((reg.items ?? []).map((i) => i.id));
const ledgerBookIds = manifest.bookIds ?? [];
const uncovered = ledgerBookIds.filter((id) => !registerIds.has(id));
const registerBookRows = (reg.items ?? []).filter(
    (i) =>
        i.disposition === "book" ||
        i.disposition === "archived" ||
        i.disposition === "retired",
).length;
console.log("proof:disposition-live — register-COMPLETENESS clause (AY.W-CARRY)");
console.log(`  ledger BOOK ids       : ${ledgerBookIds.length}`);
console.log(`  register book/arch/ret: ${registerBookRows}`);
console.log(`  uncovered (ledger→reg): ${uncovered.length}`);
if (uncovered.length > 0) {
    for (const id of uncovered)
        console.error(
            `  UNCOVERED   ${id} — named in the deferred-ledger manifest but absent from the register.`,
        );
    console.error(
        `\n[proof:disposition-live] ${uncovered.length} ledger BOOK id(s) have no register row — the register is not the ledger's mirror; onboard or retire each (AY.W-CARRY).`,
    );
    process.exit(1);
}

// ── Phantom-owner clause (AY.W-TRIAGE) ──────────────────────────────────────────
// Every residual AX `planned` wave carries a disposition; an ADDRESSED row that
// names an AY wave with NO spec file (phantom owner), a DEFERS row whose bookId is
// absent from the register (phantom defer), or a RETIRES row with an empty
// rationale (silent drop) REDs the close. PURE document cross-check — no siblings —
// so it runs BEFORE the sibling skip and gates CI with zero consumers.
let residualRows = 0;
let phantomCount = 0;
if (existsSync(RESIDUAL)) {
    const residual = JSON.parse(readFileSync(RESIDUAL, "utf8"));
    const specExists = (id) => existsSync(join(WAVES_DIR, `AY.${id}.md`));
    const phantoms = [];
    for (const r of residual.residuals ?? []) {
        if (r.disposition === "addressed") {
            // L.* rows are cross-repo: checked only when slides is on disk.
            if (r.repo === "slides" || /^L\./.test(r.ayWave ?? "")) continue;
            if (!r.ayWave || !specExists(r.ayWave))
                phantoms.push(
                    `${r.axWave} → ADDRESSED names ayWave "${r.ayWave}" with no spec in docs/tranches/AY/waves/`,
                );
        } else if (r.disposition === "defers") {
            if (!r.bookId || !registerIds.has(r.bookId))
                phantoms.push(
                    `${r.axWave} → DEFERS names bookId "${r.bookId}" absent from DISPOSITION-REGISTER.json`,
                );
        } else if (r.disposition === "retires") {
            if (!r.rationale || !r.rationale.trim())
                phantoms.push(
                    `${r.axWave} → RETIRES with empty rationale (a silent drop, not a recorded retirement)`,
                );
        } else {
            phantoms.push(
                `${r.axWave} → unknown disposition "${r.disposition}" (must be addressed/defers/retires)`,
            );
        }
    }
    residualRows = (residual.residuals ?? []).length;
    phantomCount = phantoms.length;
    console.log("proof:disposition-live — phantom-owner clause (AY.W-TRIAGE)");
    console.log(`  residual rows         : ${residualRows}`);
    console.log(`  phantom owners        : ${phantomCount}`);
    for (const p of phantoms) console.error(`  PHANTOM   ${p}`);
    if (phantomCount > 0) {
        console.error(
            `\n[proof:disposition-live] ${phantomCount} residual disposition(s) name a phantom owner — the AY wave / register row does not exist. Author it or correct the disposition (AY.W-TRIAGE).`,
        );
        process.exit(1);
    }
} else {
    console.error(
        `[proof:disposition-live] residual-disposition manifest not found: ${RESIDUAL}`,
    );
    process.exit(1);
}

// ── Decided-destination soundness clause (BB.W-DISPOSITION-RESTAMP) ─────────────
// BB §2 folds the chronic backlog by DECIDING each row — not re-booking. A row's
// decision is recorded as a `pendingResolvedBy` (a BB wave that BUILDS/MEETS it
// later) or a `resolvedBy` (the build LANDED) value naming a wave-spec by id. This
// clause is the machine arm of "every fold names a REAL destination": every such
// value MUST resolve to a wave-spec file on disk — a `pendingResolvedBy: "BB.W-PHANTOM"`
// pointing at a non-existent wave is the phantom-owner class for the new field and
// REDs the close. PURE document cross-check (no siblings) — it runs BEFORE the
// sibling-present skip and gates CI with zero consumers on disk.
//
// A destination value is "<LETTER>.<id>" (e.g. "BB.W-CSS-CRITICAL"). The wave-spec
// lives at docs/tranches/<LETTER>/waves/ in one of two filename forms (both ship in
// the BB tree): the qualified "<LETTER>.<id>.md" or the bare "<id>.md". Either form
// resolves the destination.
function waveSpecExists(value) {
    if (typeof value !== "string") return false;
    const dot = value.indexOf(".");
    if (dot <= 0) return false;
    const letter = value.slice(0, dot);
    const id = value.slice(dot + 1);
    if (!letter || !id) return false;
    const dir = join(ROOT, `docs/tranches/${letter}/waves`);
    return existsSync(join(dir, `${value}.md`)) || existsSync(join(dir, `${id}.md`));
}

// The acceptance-is-the-inverse self-test: a synthetic phantom-destination row the
// clause MUST classify as a violation every run (mirrors the always-MET selfTest).
const DECIDED_DESTINATION_SELFTEST = {
    id: "__decided_destination_selftest__",
    pendingResolvedBy: "BB.W-DOES-NOT-EXIST",
};

const phantomDestinations = [];
for (const item of reg.items ?? []) {
    for (const field of ["pendingResolvedBy", "resolvedBy"]) {
        const value = item[field];
        if (value && !waveSpecExists(value)) {
            phantomDestinations.push(
                `${item.id} → ${field} "${value}" names no wave-spec file in docs/tranches/<LETTER>/waves/`,
            );
        }
    }
}

// Self-test: the synthetic phantom destination MUST be detected as un-resolvable.
const selfTestPhantomDetected = !waveSpecExists(
    DECIDED_DESTINATION_SELFTEST.pendingResolvedBy,
);
if (!selfTestPhantomDetected) {
    console.error(
        "[proof:disposition-live] DECIDED-DESTINATION SELF-TEST FAILED — the synthetic phantom destination (BB.W-DOES-NOT-EXIST) resolved to a real wave-spec; the soundness detector is not load-bearing.",
    );
    process.exit(1);
}

console.log("proof:disposition-live — decided-destination soundness clause (BB.W-DISPOSITION-RESTAMP)");
console.log(`  rows with a decided dest: ${(reg.items ?? []).filter((i) => i.pendingResolvedBy || i.resolvedBy).length}`);
console.log(`  phantom destinations    : ${phantomDestinations.length}`);
console.log(`  self-test (bite proof)  : OK — synthetic phantom destination flagged`);
for (const p of phantomDestinations) console.error(`  PHANTOM-DEST   ${p}`);
if (phantomDestinations.length > 0) {
    console.error(
        `\n[proof:disposition-live] ${phantomDestinations.length} decided destination(s) name a non-existent wave-spec — every pendingResolvedBy/resolvedBy must resolve to a real docs/tranches/<L>/waves/<id>.md (BB.W-DISPOSITION-RESTAMP).`,
    );
    process.exit(1);
}

// ── Re-stamp-discharge clause (BG.W-DISPOSITION-RESTAMP) ────────────────────────
// "Re-stamp-without-decide REDs." A `pendingResolvedBy` is a promise that the
// close will FLIP pending→resolved when the build lands. The chronic it kills: BB
// minted `styles-critical-split.pendingResolvedBy = "BB.W-CSS-CRITICAL"` and the
// BB close never fired the flip, so the un-honored promise rode BB→BC→BD
// un-discharged ("sat STILL-OPEN"). This clause makes that impossible: a pending
// must be DISCHARGED (resolved:true) BY the time the register is re-stamped at a
// LATER tranche. So an un-resolved `pendingResolvedBy` whose own tranche is
// strictly BEFORE the register's latest re-stamp tranche is a stale, un-honored
// promise re-stamped forward without a decision — a re-stamp-without-decide — and
// REDs the close. A pending made AT the latest re-stamp tranche (a fresh promise
// this cycle) is allowed; it must discharge by the NEXT re-stamp. PURE document
// cross-check (no siblings) — runs BEFORE the sibling skip, gates CI with zero
// consumers on disk. The two-char tranche codes are lexicographically ordered by
// tranche (AX<AY<AZ<BA<BB<BC<BD<BE<BF<BG<BH), so a string compare IS a tranche
// compare.
function trancheOf(waveValue) {
    if (typeof waveValue !== "string") return null;
    const dot = waveValue.indexOf(".");
    if (dot <= 0) return null;
    return waveValue.slice(0, dot);
}

// The register's latest re-stamp tranche = max reStampedAt — the "current
// re-stamp cycle" the discharge discipline measures pendings against.
let latestRestamp = null;
for (const item of reg.items ?? []) {
    if (typeof item.reStampedAt === "string") {
        if (latestRestamp === null || item.reStampedAt > latestRestamp)
            latestRestamp = item.reStampedAt;
    }
}

// A pending is stale (a re-stamp-without-decide) iff it is un-resolved AND its own
// tranche is strictly before the latest re-stamp tranche.
function pendingIsStale(item, latest) {
    if (!item || item.resolved === true) return false;
    if (!item.pendingResolvedBy) return false;
    const t = trancheOf(item.pendingResolvedBy);
    if (t === null || latest === null) return false;
    return t < latest;
}

// Acceptance-is-the-inverse self-test: the comparator MUST flag a synthetic stale
// pending and MUST NOT flag a fresh / discharged / pending-less one. Proven every
// run — a regression that defangs the detector reds loudly here.
const RESTAMP_SELFTESTS = [
    { name: "stale-prior-tranche", item: { pendingResolvedBy: "AA.W-OLD", resolved: false }, latest: "BG", expect: true },
    { name: "fresh-this-cycle", item: { pendingResolvedBy: "BG.W-FRESH", resolved: false }, latest: "BG", expect: false },
    { name: "discharged-resolved", item: { pendingResolvedBy: "AA.W-OLD", resolved: true }, latest: "BG", expect: false },
    { name: "no-pending", item: { resolved: false }, latest: "BG", expect: false },
];
for (const t of RESTAMP_SELFTESTS) {
    if (pendingIsStale(t.item, t.latest) !== t.expect) {
        console.error(
            `[proof:disposition-live] RE-STAMP-DISCHARGE SELF-TEST FAILED (${t.name}) — the stale-pending detector is not load-bearing.`,
        );
        process.exit(1);
    }
}

const stalePendings = [];
for (const item of reg.items ?? []) {
    if (pendingIsStale(item, latestRestamp)) {
        stalePendings.push(
            `${item.id} → pendingResolvedBy "${item.pendingResolvedBy}" (tranche ${trancheOf(item.pendingResolvedBy)}) is un-discharged while the register is re-stamped to ${latestRestamp} — discharge it (resolved:true) or re-home the pending to a current-cycle wave.`,
        );
    }
}

console.log("proof:disposition-live — re-stamp-discharge clause (BG.W-DISPOSITION-RESTAMP)");
console.log(`  latest re-stamp tranche : ${latestRestamp ?? "(none)"}`);
console.log(
    `  open pendings           : ${(reg.items ?? []).filter((i) => i.pendingResolvedBy && !i.resolved).length}`,
);
console.log(`  stale (re-stamp-no-decide): ${stalePendings.length}`);
console.log(`  self-test (bite proof)  : OK — synthetic stale pending flagged, fresh/discharged pass`);
for (const p of stalePendings) console.error(`  RE-STAMP-NO-DECIDE   ${p}`);
if (stalePendings.length > 0) {
    console.error(
        `\n[proof:disposition-live] ${stalePendings.length} pending(s) re-stamped past their tranche un-discharged — a deferral promise must be honored (resolved) by the next re-stamp, never carried forward (BG.W-DISPOSITION-RESTAMP).`,
    );
    process.exit(1);
}

// Registry-default world (inv-θ): every trigger re-evaluates via a min-consumers
// grep over consumer SIBLINGS. A clean CI runner has no consumer sibling checked
// out, so (a) there is no booked deferral to re-evaluate and (b) the synthetic
// always-MET self-test (an n:1 grep for "@mkbabb/glass-ui" across present
// consumers) cannot meet — its "always" only holds where ≥1 consumer is on disk.
// So with zero siblings present this gate befittingly SKIPs, consistent with
// proof:resolution / proof:phantom-classes / proof:consumer-staleness. Locally
// (siblings present) the self-test meets and every booked row is re-evaluated.
const anySiblingPresent = CONSUMERS.some(
    (c) => !c.self && resolveSibling(c).present,
);
if (!anySiblingPresent) {
    writeGateArtifact(gateArtifactPath("GATE_DISPOSITION_LIVE_OUT", "AX-disposition-live"), {
        generatedAt: snapshotStamp(),
        status: "skipped",
        gate: "proof:disposition-live",
        command: COMMAND,
        // The completeness + phantom-owner clauses ALREADY ran (unconditional) and
        // passed; the skip is only of the sibling-walked trigger re-evaluation half.
        ledgerBookCount: ledgerBookIds.length,
        registerBookRows,
        uncovered,
        residualRows,
        phantomCount,
        phantomDestinations: phantomDestinations.length,
        latestRestamp,
        stalePendings: stalePendings.length,
        reason:
            "no consumer sibling present on this runner (registry-default) — the deferral-trigger re-evaluation walks siblings; nothing to check, and the min-consumers self-test cannot meet without a present consumer.",
    });
    console.log(
        "proof:disposition-live — SKIPPED (no consumer siblings present; registry-default runner).",
    );
    console.log(
        "  Every booked deferral's trigger re-evaluates against present consumers; with none checked out there is nothing to evaluate.",
    );
    process.exit(0);
}

const violations = [];

// (1) self-test — the detector MUST flag the synthetic always-MET book row.
const st = reg.selfTest;
const stEval = triggerMet(st?.trigger);
const stWouldFlag = st && st.disposition !== "resolved" && !st.resolved && stEval.met;
if (!stWouldFlag) {
    console.error(
        "[proof:disposition-live] SELF-TEST FAILED — the detector did not classify the synthetic always-MET book row as a violation. The gate is not load-bearing.",
    );
    process.exit(1);
}

// (2) real items — a book/archived row whose trigger re-evaluates MET while
//     unresolved is a live violation.
for (const item of reg.items ?? []) {
    const booked = item.disposition === "book" || item.disposition === "archived";
    if (!booked || item.resolved) continue;
    const ev = triggerMet(item.trigger);
    if (ev.met) {
        violations.push({ id: item.id, disposition: item.disposition, hits: ev.hits });
    }
}

console.log("proof:disposition-live — the deferral-trigger re-evaluation gate (AX.W62)");
console.log(`  register items        : ${(reg.items ?? []).length}`);
console.log(`  self-test (bite proof): OK — synthetic met-trigger row flagged`);
console.log(`  live violations       : ${violations.length}`);
for (const v of violations) {
    console.error(
        `  TRIGGER NOW MET   ${v.id} (${v.disposition}) — used by ${v.hits.join(", ")} (≥ threshold); re-evaluate the disposition (build it, or mark resolved).`,
    );
}

const pass = violations.length === 0;
const ARTIFACT = gateArtifactPath("GATE_DISPOSITION_LIVE_OUT", "AX-disposition-live");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:disposition-live",
    command: COMMAND,
    itemCount: (reg.items ?? []).length,
    selfTestFlagged: true,
    ledgerBookCount: ledgerBookIds.length,
    registerBookRows,
    uncovered,
    residualRows,
    phantomCount,
    phantomDestinations: phantomDestinations.length,
    latestRestamp,
    stalePendings: stalePendings.length,
    violations,
});

if (!pass) {
    console.error(
        `\n[proof:disposition-live] ${violations.length} booked deferral(s) with a now-MET trigger — the disposition must be re-evaluated, not carried forward.`,
    );
    process.exit(1);
}
console.log(
    "\n[proof:disposition-live] every booked deferral's trigger re-evaluates un-MET against the present constellation.",
);
