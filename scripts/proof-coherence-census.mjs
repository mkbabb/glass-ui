// proof:meta · coherence-census — the WS12 coherence/congruence AUDIT-OF-RECORD gate
// (BG.W-COHERENCE-CENSUS-GATE, F8 capstone 17.1+17.2).
//
// WS12 audits the WHOLE surface for CONGRUENCE (WS1–WS11 each converged a DOMAIN in
// isolation). The audit-of-record is `docs/tranches/BG/audit/WS12-CENSUS.md` — the
// per-arm verdict roster (A1 technicolor-gamut ceiling · A3b tier ladder [dock
// EXCLUDED] · A6 glass-key spine read · A7 concentricity allowlist · the DRY
// fork-collapse map · the RATCHET ∅-drain close precondition · M1-RECARVE the
// post-WS9 ≤500 re-check). This gate makes the census MACHINE-CHECKED — a census may
// not be a prose-only claim: every arm carries a recorded verdict, and the two
// machine arms (M1-RECARVE + the HEAD anchors) are cross-checked against the LIVE
// source tree, so a stale/false audit REDs.
//
// It is a CLAUSE of the growing `proof:meta` family gate (R3 close taxonomy —
// proof:build machine · proof:meta plan/ledger/process · proof:warm-identity paint;
// there is NO proof:close). proof-meta.mjs imports `coherenceCensus` into its
// CLAUSES set + folds `coherenceCensusSelfBites()` into its self-test. The clause
// logic lives HERE (out of the already-full proof-meta.mjs runner) so the census
// audit is DRY-carved into its own leaf, the deferred-ledger-terminal precedent.
//
// ── The two machine arms (no prose-only) ──────────────────────────────────────
//
//   M1-RECARVE (COHERENCE FOLD G7 M1-2). The post-WS9 ≤500 re-check of the four
//   NAMED carve targets — ladder.css / shell.css / the G4-carved leaves
//   (grain-overlay.css / shell-regions.css). The census records each file's
//   measured line count + an over/OK verdict + (when OVER) a re-carve owner. The
//   gate reads each file's LIVE line count (the no-god-module wc-l method) and
//   asserts: the verdict is SOUND (OVER iff live > 500), the recorded count is on
//   the correct side of the 500 bound (a bound-crossing carve => re-freshen), and
//   an OVER file NAMES its re-carve drain (the ∅-drain close precondition holds at
//   HEAD-of-WS12, not only at the G4 carve). A ≤500 file the census records OVER is
//   a stale audit; a >500 file the census records OK is a prose-only ≤500 claim.
//
//   HEAD anchors. Every EXISTS/ABSENT anchor the census cites (the A7 concentricity
//   allowlist, the DRY fork-collapse DEFINITION-ABSENT map) must RESOLVE against
//   disk — an EXISTS path present, an ABSENT path gone. The census must carry at
//   least one of each (a census with no HEAD evidence is prose-only). Anchor paths
//   are repo-relative (a `..`/absolute path REDs — the foreign-tree fence).
//
// SELF-TEST: `node scripts/proof-coherence-census.mjs --self-test` feeds the PURE
// detector synthetic census fixtures — a clean doc (no flag), a dropped arm, a
// verdict-less arm, a stale-bucket M1 row, a verdict-unsound M1 row, an omitted M1
// file, an OVER row with no re-carve owner, a missing EXISTS anchor, a present
// ABSENT anchor, an escaping anchor path — each planted defect MUST flag, and the
// REAL census must be clean (the GREEN-after proof). Acceptance is the RED-witness
// inverse.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact } from "./gate-output.mjs";

const CENSUS = join(ROOT, "docs/tranches/BG/audit/WS12-CENSUS.md");
const rel = (p) => p.replace(ROOT + "/", "");

// The seven WS12 audit arms — the census must carry a verdict-bearing section for
// each (the audit-of-record completeness floor).
export const REQUIRED_ARMS = Object.freeze([
    "A1",
    "A3b",
    "A6",
    "A7",
    "DRY-FORK-COLLAPSE",
    "RATCHET",
    "M1-RECARVE",
]);

// The four NAMED post-WS9 ≤500 carve targets (COHERENCE FOLD G7 M1-2). ladder.css /
// shell.css are the two the carve-chain re-grows; grain-overlay.css /
// shell-regions.css are the G4-carved leaves.
export const M1_WATCH_FILES = Object.freeze([
    "src/styles/glass/ladder.css",
    "src/styles/dock/shell.css",
    "src/styles/glass/grain-overlay.css",
    "src/styles/dock/shell-regions.css",
]);

const HARD_LIMIT = 500;

// The wc-l line count — the SAME method proof:no-god-module counts by (drop a single
// trailing empty from the final newline), so a census count matches the ratchet's.
export function countLines(text) {
    if (text.length === 0) return 0;
    const parts = text.split("\n");
    if (parts[parts.length - 1] === "") parts.pop();
    return parts.length;
}

// ── PURE parsers (operate on a census STRING — self-testable, fs-free) ─────────

/** armId → the section body (lines after its `### <armId> …` heading up to the next
 * `### ` heading). */
export function sectionMap(text) {
    const out = new Map();
    let cur = null;
    for (const line of text.split("\n")) {
        const h = line.match(/^###\s+(\S+)/);
        if (h) {
            cur = h[1];
            out.set(cur, []);
            continue;
        }
        if (cur) out.get(cur).push(line);
    }
    for (const [k, v] of out) out.set(k, v.join("\n"));
    return out;
}

/** The M1-RECARVE watch rows — every markdown table row whose first cell is a
 * `src/` path. `{ file, lines: number|null, verdict, recarve }`. */
export function parseWatchTable(text) {
    const rows = [];
    for (const line of text.split("\n")) {
        if (!line.trim().startsWith("|")) continue;
        const cells = line
            .split("|")
            .map((c) => c.trim())
            .filter((_c, i, arr) => i !== 0 && i !== arr.length - 1);
        if (cells.length < 3) continue;
        if (!cells[0].startsWith("src/")) continue;
        const n = parseInt(cells[1], 10);
        rows.push({
            file: cells[0],
            lines: Number.isNaN(n) ? null : n,
            verdict: (cells[2] || "").toUpperCase(),
            recarve: cells[3] || "",
        });
    }
    return rows;
}

/** Every `- EXISTS: <path>` / `- ABSENT: <path>` HEAD anchor. */
export function parseAnchors(text) {
    const out = [];
    for (const line of text.split("\n")) {
        const m = line.match(/^\s*[-*]\s*(EXISTS|ABSENT)\s*:\s*(\S+)/i);
        if (m) out.push({ kind: m[1].toUpperCase(), path: m[2] });
    }
    return out;
}

const isBlankRecarve = (s) => !s || !s.replace(/[—–-]/g, "").trim();

// ── The PURE detector — injected liveCount + exists so the self-test feeds
//    synthetic values without touching disk. ───────────────────────────────────
/**
 * @param {{ censusText: string, liveCount: (p:string)=>number|null, exists: (p:string)=>boolean }} io
 * @returns {string[]}
 */
export function coherenceCensusCheck({ censusText, liveCount, exists }) {
    const failures = [];
    if (!censusText || !censusText.trim()) {
        failures.push("WS12-CENSUS.md is empty — the WS12 coherence audit-of-record is absent.");
        return failures;
    }

    // ── arm 1: audit-of-record completeness — every arm named + verdict-bearing ──
    const sections = sectionMap(censusText);
    for (const arm of REQUIRED_ARMS) {
        const sec = sections.get(arm);
        if (sec === undefined) {
            failures.push(
                `census arm "${arm}" is absent — the WS12 audit-of-record must carry every arm (${REQUIRED_ARMS.join("/")}).`,
            );
            continue;
        }
        if (!/\bVerdict\s*:/i.test(sec))
            failures.push(
                `census arm "${arm}" carries no \`Verdict:\` — a bare heading is a prose-only claim (every arm owes a recorded verdict).`,
            );
    }

    // ── arm 2: M1-RECARVE freshness + soundness (machine-checked vs HEAD) ────────
    const byFile = new Map(parseWatchTable(censusText).map((r) => [r.file, r]));
    for (const file of M1_WATCH_FILES) {
        const rowM = byFile.get(file);
        if (!rowM) {
            failures.push(
                `M1-RECARVE watch table omits "${file}" — the post-WS9 ≤500 re-check must cover every named carve target.`,
            );
            continue;
        }
        const live = liveCount(file);
        if (live === null) {
            failures.push(
                `M1-RECARVE watch file "${file}" is absent on disk — a watched carve target vanished (verify the carve, re-home the row).`,
            );
            continue;
        }
        const over = live > HARD_LIMIT;
        if (rowM.lines === null)
            failures.push(
                `M1-RECARVE row "${file}" records no numeric line count — the audit-of-record must record the measured count.`,
            );
        else if (rowM.lines > HARD_LIMIT !== over)
            failures.push(
                `M1-RECARVE row "${file}" records ${rowM.lines} lines but HEAD measures ${live} — the count crossed the ${HARD_LIMIT} bound (stale audit; re-freshen against HEAD).`,
            );
        if (over && rowM.verdict !== "OVER")
            failures.push(
                `M1-RECARVE row "${file}" measures ${live} > ${HARD_LIMIT} at HEAD but its verdict is "${rowM.verdict}" (expected OVER) — a prose-only ≤${HARD_LIMIT} claim over a god-module.`,
            );
        if (!over && rowM.verdict === "OVER")
            failures.push(
                `M1-RECARVE row "${file}" measures ${live} ≤ ${HARD_LIMIT} at HEAD but is recorded OVER — the drain landed; flip the verdict to OK (stale audit).`,
            );
        if (over && isBlankRecarve(rowM.recarve))
            failures.push(
                `M1-RECARVE row "${file}" is OVER ${HARD_LIMIT} but names no re-carve owner — a post-WS9 re-growth must NAME its drain (the ∅-drain close precondition).`,
            );
    }

    // ── arm 3: HEAD anchor soundness — no prose-only presence/absence claim ──────
    const anchors = parseAnchors(censusText);
    if (!anchors.some((a) => a.kind === "EXISTS") || !anchors.some((a) => a.kind === "ABSENT"))
        failures.push(
            "the census carries no EXISTS+ABSENT HEAD anchors — the A7/DRY arms must cite machine-checkable file evidence (a prose-only census is forbidden).",
        );
    for (const a of anchors) {
        if (a.path.includes("..") || a.path.startsWith("/") || a.path.startsWith("~")) {
            failures.push(
                `census anchor path "${a.path}" escapes the repo tree — anchors are repo-relative (the foreign-tree fence).`,
            );
            continue;
        }
        const present = exists(a.path);
        if (a.kind === "EXISTS" && !present)
            failures.push(`census EXISTS anchor "${a.path}" is absent on disk — a prose-only presence claim.`);
        if (a.kind === "ABSENT" && present)
            failures.push(
                `census ABSENT anchor "${a.path}" is present on disk — a claimed fork-collapse / DEFINITION-ABSENT that still exists.`,
            );
    }

    return failures;
}

// ── The clause (the proof:meta family member) ─────────────────────────────────
export function coherenceCensus() {
    if (!existsSync(CENSUS))
        return {
            clause: "coherence-census",
            visualCount: 0,
            failures: [`WS12-CENSUS.md absent — ${rel(CENSUS)} (the WS12 coherence audit-of-record must exist).`],
        };
    const censusText = readFileSync(CENSUS, "utf8");
    const liveCount = (p) => {
        const abs = join(ROOT, p);
        return existsSync(abs) ? countLines(readFileSync(abs, "utf8")) : null;
    };
    const exists = (p) => existsSync(join(ROOT, p));
    return {
        clause: "coherence-census",
        visualCount: 0,
        failures: coherenceCensusCheck({ censusText, liveCount, exists }),
    };
}

// ── SELF-TEST fixtures (fully synthetic — a fixed live/fs world) ───────────────
const SYNTH_LIVE = {
    "src/styles/glass/ladder.css": 510, // OVER
    "src/styles/dock/shell.css": 524, // OVER
    "src/styles/glass/grain-overlay.css": 79, // OK
    "src/styles/dock/shell-regions.css": 73, // OK
};
const SYNTH_FS = new Set(["src/present-a", "src/present-b"]); // ABSENT paths are simply out of the set
const synthLive = (p) => (p in SYNTH_LIVE ? SYNTH_LIVE[p] : null);
const synthExists = (p) => SYNTH_FS.has(p);

const ARM = (id, verdict = "recorded") => `### ${id} — synthetic arm\nVerdict: ${verdict}\n`;
const WATCH_ROW = (file, lines, verdict, recarve) => `| ${file} | ${lines} | ${verdict} | ${recarve} |`;

/** Build a synthetic census that is CLEAN under the fixed synthetic world, then let
 * a mutator inject a single defect. */
function synthCensus(mutate = {}) {
    const arms = { A1: ARM("A1"), A3b: ARM("A3b"), A6: ARM("A6"), A7: "", "DRY-FORK-COLLAPSE": "", RATCHET: ARM("RATCHET"), "M1-RECARVE": "" };
    // A7 + DRY carry the HEAD anchors.
    arms.A7 = `### A7 — synthetic arm\nVerdict: recorded\nAnchors:\n- EXISTS: src/present-a\n`;
    arms["DRY-FORK-COLLAPSE"] = `### DRY-FORK-COLLAPSE — synthetic arm\nVerdict: recorded\nAnchors:\n- ABSENT: src/absent-a\n- EXISTS: src/present-b\n`;
    // M1 watch table.
    const rows = [
        WATCH_ROW("src/styles/glass/ladder.css", 510, "OVER", "19.1 drain"),
        WATCH_ROW("src/styles/dock/shell.css", 524, "OVER", "19.1 drain"),
        WATCH_ROW("src/styles/glass/grain-overlay.css", 79, "OK", "—"),
        WATCH_ROW("src/styles/dock/shell-regions.css", 73, "OK", "—"),
    ];
    if (mutate.dropArm) delete arms[mutate.dropArm];
    if (mutate.verdictLessArm) arms[mutate.verdictLessArm] = `### ${mutate.verdictLessArm} — synthetic arm\n(no verdict here)\n`;
    if (mutate.staleBucket) rows[0] = WATCH_ROW("src/styles/glass/ladder.css", 300, "OVER", "19.1 drain"); // recorded 300 but live 510
    if (mutate.unsoundVerdict) rows[0] = WATCH_ROW("src/styles/glass/ladder.css", 510, "OK", "—"); // live OVER, recorded OK
    if (mutate.omitFile) rows.splice(1, 1); // drop shell.css
    if (mutate.overNoRecarve) rows[1] = WATCH_ROW("src/styles/dock/shell.css", 524, "OVER", "—"); // OVER, blank owner
    if (mutate.missingExists) arms.A7 += "- EXISTS: src/absent-x\n"; // EXISTS path not in fs
    if (mutate.presentAbsent) arms["DRY-FORK-COLLAPSE"] += "- ABSENT: src/present-a\n"; // ABSENT path present in fs
    if (mutate.escapePath) arms.A7 += "- EXISTS: ../outside/thing\n"; // escapes the tree
    const table = "| file | lines | verdict | re-carve |\n|---|---|---|---|\n" + rows.join("\n") + "\n";
    arms["M1-RECARVE"] = `### M1-RECARVE — synthetic arm\nVerdict: recorded\n${table}`;
    const armText = REQUIRED_ARMS.map((id) => arms[id]).filter(Boolean).join("\n");
    return `# WS12-CENSUS (synthetic)\n\n## Arms\n${armText}\n`;
}

const run = (mutate) => coherenceCensusCheck({ censusText: synthCensus(mutate), liveCount: synthLive, exists: synthExists });

/** The self-test bites — `[name, ok]` pairs the proof:meta self-test folds in. */
export function coherenceCensusSelfBites() {
    return [
        ["clean synthetic census → no failure", run({}).length === 0],
        ["dropped arm (A6) → FLAG", run({ dropArm: "A6" }).some((f) => f.includes('"A6"'))],
        ["verdict-less arm (A3b) → FLAG", run({ verdictLessArm: "A3b" }).some((f) => f.includes("no `Verdict:`"))],
        ["stale M1 bucket (300 vs live 510) → FLAG", run({ staleBucket: true }).some((f) => f.includes("crossed the 500 bound"))],
        ["unsound M1 verdict (OK over live 510) → FLAG", run({ unsoundVerdict: true }).some((f) => f.includes("expected OVER"))],
        ["omitted M1 file (shell.css) → FLAG", run({ omitFile: true }).some((f) => f.includes("omits"))],
        ["OVER with no re-carve owner → FLAG", run({ overNoRecarve: true }).some((f) => f.includes("no re-carve owner"))],
        ["missing EXISTS anchor → FLAG", run({ missingExists: true }).some((f) => f.includes("absent on disk"))],
        ["present ABSENT anchor → FLAG", run({ presentAbsent: true }).some((f) => f.includes("present on disk"))],
        ["escaping anchor path → FLAG", run({ escapePath: true }).some((f) => f.includes("escapes the repo tree"))],
    ];
}

// ── main (direct invocation — the clause also rides proof:meta) ────────────────
const isMain = process.argv[1] && process.argv[1].endsWith("proof-coherence-census.mjs");
if (isMain) {
    if (process.argv.includes("--self-test")) {
        const bites = coherenceCensusSelfBites();
        console.log(`proof:meta · coherence-census — SELF-TEST (${bites.length} bites)`);
        let allOk = true;
        for (const [name, ok] of bites) {
            console.log(`  ${ok ? "OK    " : "MISS  "}  ${name}`);
            if (!ok) allOk = false;
        }
        const real = coherenceCensus().failures;
        console.log(`  real coherence-census failures : ${real.length}`);
        for (const f of real.slice(0, 25)) console.error(`    ${f}`);
        if (!allOk) {
            console.error("\n[coherence-census] SELF-TEST FAILED — a synthetic fixture behaved wrong; the detector is not load-bearing.");
            process.exit(1);
        }
        if (real.length > 0) {
            console.error("\n[coherence-census] SELF-TEST FAILED — the REAL census is not clean (the GREEN-after state must pass).");
            process.exit(1);
        }
        console.log("\n[coherence-census] SELF-TEST GREEN — every planted defect flags + the real census is clean.");
        process.exit(0);
    }
    const { failures } = coherenceCensus();
    console.log("proof:meta · coherence-census — the WS12 coherence/congruence audit-of-record");
    console.log(`  arms                   : ${REQUIRED_ARMS.join(", ")}`);
    console.log(`  M1-RECARVE watch files : ${M1_WATCH_FILES.length}`);
    console.log(`  failures               : ${failures.length}`);
    for (const f of failures) console.error(`  ${f}`);
    writeGateArtifact(gateArtifactPath("GLASS_UI_COHERENCE_CENSUS_ARTIFACT", "coherence-census"), {
        arms: REQUIRED_ARMS,
        failures,
        ok: failures.length === 0,
    });
    if (failures.length > 0) {
        console.error(`\n[coherence-census] ${failures.length} violation(s) — the WS12 audit-of-record is incomplete or has drifted from HEAD.`);
        process.exit(1);
    }
    console.log("\n[coherence-census] the WS12 audit-of-record is complete + fresh against HEAD.");
    process.exit(0);
}
