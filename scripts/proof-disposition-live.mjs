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
