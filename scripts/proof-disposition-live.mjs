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
