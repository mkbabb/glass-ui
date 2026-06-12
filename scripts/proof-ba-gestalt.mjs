#!/usr/bin/env node
// BA.W-GESTALT-GATE — proof:ba-gestalt, the holistic per-surface acceptance gate.
//
// THE P-1 CLOSE-CLASS FIX (precepts-conformance.md:42-86). AZ closed `complete` on a
// 9-surface per-mechanism PASS matrix (AZ/FINAL.md:119-131) the user re-opened the SAME
// DAY (R8) on ≥7 surfaces — the 6th consecutive re-opening round (R3→R8). A per-mechanism
// π verifies the LOCAL mechanism the fleet root-caused in isolation (a pixel ΔL, an
// `h1Overlap:false`) but cannot verify the GESTALT the user reads ("totally mis-aligned"
// is a placement/relationship judgement, not a contrast delta). This gate is the
// structural answer: a per-surface roster ABOVE the per-mechanism π readback, each surface
// owed a whole-page capture in BOTH modes over its real backdrop plus a recorded gestalt
// VERDICT, born-RED against the R8 state so the mechanism-green/page-wrong gap cannot
// recur by construction.
//
// This is a PURE source/docs detector (no Playwright at THIS gate — the gate reads the
// roster ledger's recorded verdicts + asserts the declared capture paths resolve on disk;
// the LIVE capture is W-REFLECT2's job). It reads the roster LEDGER at
// docs/tranches/BA/audit/reflect/ba-gestalt-roster.md and asserts:
//   (a) COMPLETENESS — every one of the EIGHT named W-REFLECT2 surfaces is present
//       (a dropped surface reds — a future agent cannot quietly omit a hard surface).
//   (b) WELL-FORMED — every row carries both mode capture paths + a verdict ∈ {FAIL,PASS}
//       + a ground anchor (a renamed/dropped column or an out-of-set verdict reds).
//   (c) OPERATIVE-PASS — the gate is `ok` IFF every verdict is PASS AND every declared
//       capture path RESOLVES ON DISK as a non-empty file (the anti-evasion floor — a
//       PASS with a missing/zero-byte capture is the close-class lie the AZ matrix told,
//       mechanically forbidden).
//
// BORN-RED at HEAD: every verdict is FAIL, anchored to its R8 ground capture; there is no
// PASS replacement. The gate is tagged ["local"] (RED-by-design until W-REFLECT2 flips the
// verdicts — it must NOT block ci/release while the tranche is mid-flight). W-REFLECT2
// (Batch 7) is the single authorized verdict-flipper + the wave that PROMOTES the gate to
// the operative close set when the verdicts go GREEN (W-GESTALT-GATE G3 defers that).
//
// bite-check: flip a verdict to PASS with no on-disk capture → RED (anti-evasion);
// delete a roster surface → RED (completeness); a verdict outside {FAIL,PASS} → RED.

import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:ba-gestalt";
const ROSTER = resolve(ROOT, "docs/tranches/BA/audit/reflect/ba-gestalt-roster.md");

// The EIGHT named W-REFLECT2 acceptance surfaces (the completeness set). A roster that
// drops one reds the completeness assert; an extra surface is allowed (a future split).
const REQUIRED_SURFACES = [
    "dock",
    "configurators-goo",
    "aurora",
    "glass-feedback",
    "shell",
    "motion-fourier",
    "dark-register",
    "cross-repo",
];

const VALID_VERDICTS = new Set(["FAIL", "PASS"]);
const COLUMNS = ["surface", "routes", "capture-light", "capture-dark", "verdict", "ground-anchor"];

/**
 * Parse the ROSTER markdown table. Strips HTML comments first (so the schema doc-block
 * + the per-cell explanatory prose can name a column without tripping the parse). Returns
 * the data rows (header + separator dropped) as objects keyed by COLUMNS.
 */
function parseRoster(src) {
    // Drop HTML comments (the doc-block header + any inline notes).
    const noComments = src.replace(/<!--[\s\S]*?-->/g, "");
    const rows = [];
    let inTable = false;
    for (const raw of noComments.split("\n")) {
        const line = raw.trim();
        if (!line.startsWith("|")) {
            // A blank/non-pipe line after the table ends it (so a later prose table,
            // if any, never bleeds in).
            if (inTable && line === "") inTable = false;
            continue;
        }
        const cells = line
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim());
        // The header row carries "surface" in cell 0; the separator row is all dashes.
        const isSeparator = cells.every((c) => /^:?-+:?$/.test(c));
        if (isSeparator) {
            inTable = true;
            continue;
        }
        if (cells[0] === "surface") {
            // header — confirm the column schema is intact + the table is starting
            inTable = true;
            rows.push({ __header: cells });
            continue;
        }
        if (!inTable) continue;
        if (cells.length < COLUMNS.length) {
            rows.push({ __malformed: cells });
            continue;
        }
        const row = {};
        COLUMNS.forEach((col, i) => (row[col] = cells[i]));
        rows.push(row);
    }
    return rows;
}

function detect() {
    const violations = [];
    const facts = {};

    if (!existsSync(ROSTER)) {
        violations.push(
            `[ROSTER-PRESENT] the roster ledger is absent at ${relative(ROOT, ROSTER)} — proof:ba-gestalt has no contract to read`,
        );
        return { facts: { rosterPresent: false }, violations };
    }
    facts.rosterPresent = true;

    const parsed = parseRoster(readFileSync(ROSTER, "utf8"));
    const header = parsed.find((r) => r.__header)?.__header;
    const malformed = parsed.filter((r) => r.__malformed);
    const data = parsed.filter((r) => !r.__header && !r.__malformed);

    // ── COLUMN-SCHEMA ───────────────────────────────────────────────────────
    // The header must carry the exact COLUMNS in order (a rename/reorder reds —
    // the roster's shape is the binding contract W-REFLECT2 drives).
    const headerOk = header && COLUMNS.every((c, i) => header[i] === c);
    facts.headerColumns = header ?? null;
    if (!headerOk)
        violations.push(
            `[COLUMN-SCHEMA] the roster header is not the canonical column set [${COLUMNS.join(", ")}] (got ${JSON.stringify(header)}) — a renamed/dropped column breaks the W-REFLECT2 contract`,
        );

    // ── MALFORMED-ROWS ──────────────────────────────────────────────────────
    facts.malformedRows = malformed.length;
    for (const m of malformed)
        violations.push(
            `[WELL-FORMED] a roster row has fewer than ${COLUMNS.length} cells: ${JSON.stringify(m.__malformed)}`,
        );

    // ── COMPLETENESS — every required surface present ───────────────────────
    const present = new Set(data.map((r) => r.surface));
    facts.surfaces = [...present];
    const missing = REQUIRED_SURFACES.filter((s) => !present.has(s));
    facts.missingSurfaces = missing;
    for (const s of missing)
        violations.push(
            `[COMPLETENESS] the roster is missing the required surface "${s}" — the full W-REFLECT2 set must be enumerated (a dropped surface cannot be silently omitted)`,
        );

    // ── WELL-FORMED + OPERATIVE — per-row checks ────────────────────────────
    const surfaceVerdicts = {};
    let allPass = data.length > 0 && missing.length === 0;
    for (const row of data) {
        const { surface, verdict } = row;
        surfaceVerdicts[surface] = verdict;

        // verdict ∈ {FAIL, PASS}
        if (!VALID_VERDICTS.has(verdict)) {
            violations.push(
                `[WELL-FORMED] surface "${surface}" has verdict "${verdict}" — must be one of {FAIL, PASS}`,
            );
            allPass = false;
            continue;
        }

        // both mode capture paths declared (non-empty)
        const lightDeclared = row["capture-light"] && row["capture-light"].length > 0;
        const darkDeclared = row["capture-dark"] && row["capture-dark"].length > 0;
        if (!lightDeclared || !darkDeclared) {
            violations.push(
                `[WELL-FORMED] surface "${surface}" lacks a ${!lightDeclared ? "capture-light" : "capture-dark"} path — both mode captures must be declared`,
            );
            allPass = false;
        }
        // ground anchor declared (the FAIL baseline a flip is audited against)
        if (!row["ground-anchor"] || row["ground-anchor"].length === 0) {
            violations.push(
                `[WELL-FORMED] surface "${surface}" lacks a ground-anchor — the R8 FAIL baseline a flip clears`,
            );
            allPass = false;
        }

        // The anti-evasion floor: a PASS verdict requires BOTH declared capture
        // paths to RESOLVE ON DISK as non-empty files (a PASS with a missing or
        // zero-byte capture is the close-class lie, mechanically forbidden).
        if (verdict === "PASS") {
            for (const col of ["capture-light", "capture-dark"]) {
                const p = row[col];
                if (!p) continue;
                const abs = resolve(ROOT, p);
                const resolves = existsSync(abs) && statSync(abs).size > 0;
                if (!resolves) {
                    violations.push(
                        `[ANTI-EVASION] surface "${surface}" is PASS but its ${col} capture "${p}" does not resolve on disk as a non-empty file — a PASS verdict demands a real whole-page capture (the AZ capture-less-PASS lie is forbidden)`,
                    );
                    allPass = false;
                }
            }
        } else {
            // FAIL — the operative state can never be ok with an open FAIL.
            allPass = false;
        }
    }

    facts.verdicts = surfaceVerdicts;
    facts.failCount = data.filter((r) => r.verdict === "FAIL").length;
    facts.passCount = data.filter((r) => r.verdict === "PASS").length;
    facts.operativePass = allPass && violations.length === 0;

    // The OPERATIVE result: ok IFF every verdict is PASS (with a resolving capture
    // pair) AND no structural violation. Born-RED: every verdict is FAIL → not ok.
    if (!facts.operativePass && violations.length === 0) {
        // No structural violation, but at least one FAIL verdict — the born-RED
        // expected state. Record it as the operative-fail (not a malformedness).
        violations.push(
            `[OPERATIVE] ${facts.failCount} of ${data.length} roster surfaces hold an open FAIL verdict — the gestalt acceptance bar is not met (W-REFLECT2 flips each to PASS with a fresh on-disk capture pair)`,
        );
    }

    return { facts, violations };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_BA_GESTALT_ARTIFACT", "BA-gestalt");
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:ba-gestalt",
        command: COMMAND,
        facts,
        violations,
    });

    console.log("proof:ba-gestalt — the holistic per-surface acceptance roster (P-1 close-class fix, BA.W-GESTALT-GATE)");
    console.log(`  roster ledger        : ${facts.rosterPresent ? relative(ROOT, ROSTER) : "ABSENT"}`);
    if (facts.rosterPresent) {
        console.log(`  surfaces present     : ${(facts.surfaces ?? []).length} (${(facts.surfaces ?? []).join(", ")})`);
        if (facts.missingSurfaces?.length)
            console.log(`  MISSING surfaces     : ${facts.missingSurfaces.join(", ")}`);
        console.log(`  verdicts             : ${facts.passCount ?? 0} PASS / ${facts.failCount ?? 0} FAIL`);
        if (facts.verdicts)
            for (const [s, v] of Object.entries(facts.verdicts))
                console.log(`    ${v === "PASS" ? "✓" : "✗"} ${s.padEnd(20)} ${v}`);
        console.log(`  operative result     : ${facts.operativePass ? "PASS (8/8 gestalt verdicts hold)" : "FAIL (born-RED until W-REFLECT2 flips the verdicts)"}`);
    }
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
