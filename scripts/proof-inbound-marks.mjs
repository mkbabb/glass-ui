#!/usr/bin/env node
// BI.W-INBOUND-MARKS — proof:inbound-marks, the inbound-completeness gate (device-free; NO π).
//
// THE ORDER (2026-07-12, user): "all inbound messages marked and heard, analyzed… hic et ubique."
// This gate is that order made structural — it locks the marks ledger
// (docs/tranches/BI/coordination/INBOUND-MARKS.md) against the LIVE coordination corpus so no
// inbound ask can ride UNOWNED and no NEW inbound file can land unmarked.
//
//   I1 — COMPLETENESS. Every inbox-class file under docs/tranches/{BG,BH,BI}/coordination/ (name
//        matches /inbox|INBOUND|COMMUNIQUE|ASKS|RIDER|GENESIS|TRIAGE|FIX-NOTES|outbound|consume/i,
//        plus every asks-and-consumes.md) carries a per-file section in the ledger, keyed by its
//        FULL relative path in a markdown heading (the BH/BI asks-and-consumes.md pair disambiguated
//        by path). The ledger file itself is EXCLUDED (it matches INBOUND but is the marks record).
//   I2 — TERMINAL GRAMMAR. Zero marks-table disposition cell carries UNOWNED / TBD / book — every
//        cell leads a terminal verb (DISCHARGED / OWNED / ANSWERED-BY-EXISTING / SUPERSEDED /
//        DECLINED-TERMINAL / CUT-FIXED). A double-sided check: the forbidden set MUST NOT match AND
//        a terminal verb MUST match (an empty or garbage cell fails both ways).
//   I3 — TARGET RESOLUTION. Every BI.W-<id> token named in a disposition cell resolves to
//        docs/tranches/BI/waves/BI.W-<id>.md, AND every OWNED-family row names either a resolvable
//        BI.W-* wave OR an asks-and-consumes.md roster row (the two sanctioned homes).
//   I4 — the STANDING LIVENESS CONTRACT (== I1): a NEW inbox-class coordination file landing WITHOUT
//        a marks section REDs the close. I1 IS I4 — the enumeration is live from disk, not a
//        frozen list, so a future inbound message auto-enrolls into the completeness floor.
//
// STRUCTURAL/coordination gate — NO π, NO proof:ba-gestalt (zero pixels). The born-RED→GREEN log
// + a ≥3-bite self-test (a planted unmarked inbox file → I1; a planted UNOWNED row → I2; a planted
// phantom wave target → I3; the real ledger → GREEN) is the binding truth.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:inbound-marks";

const LEDGER_REL = "docs/tranches/BI/coordination/INBOUND-MARKS.md";
const LEDGER_BASENAME = "INBOUND-MARKS.md";
const WAVES_DIR = "docs/tranches/BI/waves";
const COORD_DIRS = [
    "docs/tranches/BG/coordination",
    "docs/tranches/BH/coordination",
    "docs/tranches/BI/coordination",
];

// The inbox-class glob (I1/I4). asks-and-consumes.md is caught by both the ASKS token and the
// explicit basename clause below (belt-and-suspenders).
const INBOX_CLASS = /inbox|INBOUND|COMMUNIQUE|ASKS|RIDER|GENESIS|TRIAGE|FIX-NOTES|outbound|consume/i;
const isInboxClass = (name) => name === "asks-and-consumes.md" || INBOX_CLASS.test(name);

// I2 — the terminal grammar. \b-anchored so "UNOWNED" never satisfies the positive OWNED token.
const TERMINAL_VERB = /\b(DISCHARGED|OWNED|ANSWERED-BY-EXISTING|SUPERSEDED|DECLINED-TERMINAL|CUT-FIXED)\b/;
const FORBIDDEN_VERB = /\b(UNOWNED|TBD|booked?)\b/i;
// the OWNED family (I3 requires a resolvable target or a roster ref). Anchored to the LEADING verb
// of the disposition so a mid-cell "DEMO-OWNED" (a DECLINED row's rationale) never false-triggers.
const OWNED_FAMILY = /^OWNED\b/;
const ROSTER_REF = /roster row|asks-and-consumes/i;
const BI_WAVE_TOKEN = /\bBI\.W-[A-Z0-9]+(?:-[A-Z0-9]+)*/g;

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// ── enumerate the live inbox-class corpus (I1/I4 — from disk, never a frozen list) ────────────
function enumerateInboxFiles() {
    const out = [];
    for (const dir of COORD_DIRS) {
        const abs = resolve(ROOT, dir);
        if (!existsSync(abs)) continue;
        for (const name of readdirSync(abs).sort()) {
            if (!name.endsWith(".md")) continue;
            if (name === LEDGER_BASENAME) continue; // the ledger is not its own inbound file
            if (!isInboxClass(name)) continue;
            out.push(`${dir}/${name}`);
        }
    }
    return out;
}

// ── parse the marks-table data rows (skip headers + separators; 3-col `| id | ask | disp |`) ──
function parseDataRows(ledgerText) {
    const rows = [];
    const lines = ledgerText.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!/^\s*\|/.test(line)) continue; // not a table line
        if (/^\s*\|[\s|:-]+\|\s*$/.test(line)) continue; // |---| separator
        const parts = line.split("|");
        // strip the outer empties the leading/trailing pipes produce.
        if (parts.length && parts[0].trim() === "") parts.shift();
        if (parts.length && parts[parts.length - 1].trim() === "") parts.pop();
        const cells = parts.map((c) => c.trim());
        if (cells.length < 2) continue;
        const disposition = cells[cells.length - 1];
        const first = (cells[0] || "").toLowerCase();
        // skip the header row (`| ask-id | ask | disposition |`).
        if (first === "ask-id" || disposition.toLowerCase() === "disposition") continue;
        if (!disposition) continue;
        rows.push({ lineNo: i + 1, cells, disposition });
    }
    return rows;
}

// ── the three checks (pure — operate on passed-in objects so the self-test can feed fixtures) ──
function checkI1(ledgerText, inboxFiles) {
    const fails = [];
    // a per-file section = the full relative path appears in a markdown heading line.
    const headings = ledgerText.split("\n").filter((l) => /^#{1,6}\s/.test(l));
    const blob = headings.join("\n");
    for (const rel of inboxFiles) {
        if (!blob.includes(rel))
            fails.push({ clause: "I1", msg: `inbox-class file "${rel}" has NO per-file section heading in ${LEDGER_REL} (a NEW inbound message must carry a marks section — the standing liveness contract).` });
    }
    return fails;
}

function checkI2(rows) {
    const fails = [];
    for (const r of rows) {
        if (FORBIDDEN_VERB.test(r.disposition))
            fails.push({ clause: "I2", msg: `row @${r.lineNo} disposition "${r.disposition.slice(0, 60)}" carries a non-terminal verb (UNOWNED/TBD/book) — every disposition must be terminal.` });
        else if (!TERMINAL_VERB.test(r.disposition))
            fails.push({ clause: "I2", msg: `row @${r.lineNo} disposition "${r.disposition.slice(0, 60)}" names no terminal verb (DISCHARGED/OWNED/ANSWERED-BY-EXISTING/SUPERSEDED/DECLINED-TERMINAL/CUT-FIXED).` });
    }
    return fails;
}

function checkI3(rows, waveExists) {
    const fails = [];
    for (const r of rows) {
        const tokens = [...r.disposition.matchAll(BI_WAVE_TOKEN)].map((m) => m[0]);
        for (const t of tokens) {
            if (!waveExists(t))
                fails.push({ clause: "I3", msg: `row @${r.lineNo} names wave-target "${t}" but ${WAVES_DIR}/${t}.md does NOT resolve (a phantom wave target).` });
        }
        if (OWNED_FAMILY.test(r.disposition)) {
            const hasResolvableWave = tokens.some((t) => waveExists(t));
            const hasRoster = ROSTER_REF.test(r.disposition);
            if (!hasResolvableWave && !hasRoster)
                fails.push({ clause: "I3", msg: `row @${r.lineNo} is OWNED but names neither a resolvable BI.W-* wave nor an asks-and-consumes roster row — an OWNED ask must resolve to a named home.` });
        }
    }
    return fails;
}

const realWaveExists = (token) => existsSync(resolve(ROOT, WAVES_DIR, `${token}.md`));

function detect() {
    return existsSync(resolve(ROOT, LEDGER_REL));
}

// ── run (real) ───────────────────────────────────────────────────────────────────────────────
function runReal() {
    if (!detect()) {
        console.error(`[proof:inbound-marks] the marks ledger ${LEDGER_REL} is ABSENT (born-RED — the inbound corpus is unmarked).`);
        writeArtifact("fail", [{ clause: "I1", msg: `${LEDGER_REL} is absent` }], { inboxCount: 0, rowCount: 0 });
        process.exit(1);
    }
    const ledgerText = read(LEDGER_REL);
    const inboxFiles = enumerateInboxFiles();
    const rows = parseDataRows(ledgerText);

    const fails = [
        ...checkI1(ledgerText, inboxFiles),
        ...checkI2(rows),
        ...checkI3(rows, realWaveExists),
    ];

    // run the self-test bites inline (the sibling proof:crossrepo-asks:bi embeds its bites in the
    // main pass so CI exercises the detector every run).
    const bites = runBites(ledgerText, inboxFiles, rows);
    const biteFails = bites.filter((b) => !b.pass).map((b) => ({ clause: "self-test", msg: `bite "${b.id}" did not flag its planted defect` }));
    const all = [...fails, ...biteFails];

    console.log("proof:inbound-marks — the inbound-completeness gate (BI.W-INBOUND-MARKS)");
    console.log(`  inbox-class files : ${inboxFiles.length} (each with a marks section — I1/I4)`);
    console.log(`  marks-table rows  : ${rows.length}`);
    console.log(`  self-test bites   : ${bites.filter((b) => b.pass).length}/${bites.length} flag`);
    console.log(`  failures          : ${all.length}`);
    for (const f of all) console.error(`  [${f.clause}] ${f.msg}`);

    writeArtifact(all.length ? "fail" : "pass", all, { inboxCount: inboxFiles.length, rowCount: rows.length, bites: bites.map((b) => ({ id: b.id, pass: b.pass })) });

    if (all.length) {
        console.error(`\n[proof:inbound-marks] ${all.length} violation(s) — an inbound message rode unmarked, a disposition is non-terminal, or a wave-target is phantom.`);
        process.exit(1);
    }
    console.log(`\n[proof:inbound-marks] every one of the ${inboxFiles.length} inbox-class files is marked, all ${rows.length} disposition rows are terminal, and every wave-target resolves.`);
    process.exit(0);
}

// ── the self-test bites (≥3: I1 unmarked / I2 UNOWNED / I3 phantom + the real-clean positive) ──
function runBites(ledgerText, inboxFiles, rows) {
    const bites = [];

    // bite 1 (I1) — a planted synthetic inbox file with NO section flags I1.
    const synthFile = "docs/tranches/BI/coordination/SYNTH-INBOX-2026.md";
    const b1 = checkI1(ledgerText, [...inboxFiles, synthFile]);
    bites.push({ id: "planted-unmarked-inbox-file → I1", pass: b1.some((f) => f.clause === "I1" && f.msg.includes(synthFile)) });

    // bite 2 (I2) — a planted UNOWNED disposition row flags I2.
    const unownedRow = [{ lineNo: -1, cells: ["synth", "a synthetic ask", "UNOWNED — no home found"], disposition: "UNOWNED — no home found" }];
    bites.push({ id: "planted-UNOWNED-row → I2", pass: checkI2(unownedRow).some((f) => f.clause === "I2") });

    // bite 2b (I2) — a planted `book` disposition also flags I2.
    const bookRow = [{ lineNo: -1, cells: ["synth", "a synthetic ask", "book — deferred to a later wave"], disposition: "book — deferred to a later wave" }];
    bites.push({ id: "planted-book-row → I2", pass: checkI2(bookRow).some((f) => f.clause === "I2") });

    // bite 3 (I3) — a planted phantom OWNED wave-target flags I3.
    const phantomRow = [{ lineNo: -1, cells: ["synth", "a synthetic ask", "OWNED — BI.W-PHANTOM-DOES-NOT-EXIST"], disposition: "OWNED — BI.W-PHANTOM-DOES-NOT-EXIST" }];
    bites.push({ id: "planted-phantom-wave-target → I3", pass: checkI3(phantomRow, realWaveExists).some((f) => f.clause === "I3") });

    // bite 3b (I3) — an OWNED row naming no wave AND no roster flags I3.
    const homelessRow = [{ lineNo: -1, cells: ["synth", "a synthetic ask", "OWNED — somewhere, someday"], disposition: "OWNED — somewhere, someday" }];
    bites.push({ id: "planted-homeless-OWNED-row → I3", pass: checkI3(homelessRow, realWaveExists).some((f) => f.clause === "I3") });

    // bite 4 (positive) — the REAL ledger passes I1 + I2 + I3 with zero failures.
    const realFails = [...checkI1(ledgerText, inboxFiles), ...checkI2(rows), ...checkI3(rows, realWaveExists)];
    bites.push({ id: "real-ledger-clean (I1+I2+I3, 0 fail)", pass: realFails.length === 0 });

    return bites;
}

function writeArtifact(status, failures, extra) {
    const ARTIFACT = gateArtifactPath("GATE_INBOUND_MARKS", "BI-inbound-marks");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:inbound-marks",
        command: COMMAND,
        note: "STRUCTURAL/coordination gate — NO π. I1 every inbox-class file under docs/tranches/{BG,BH,BI}/coordination/ (glob + asks-and-consumes.md) carries a per-file marks section keyed by full relative path; I2 zero disposition cell carries UNOWNED/TBD/book (terminal grammar only); I3 every BI.W-* wave-target resolves + every OWNED row names a wave or roster row; I4 (== I1) a NEW inbox-class file lands unmarked → RED (the standing liveness contract). + a ≥3-bite self-test (unmarked-file / UNOWNED-row / phantom-target each flag; the real ledger is clean).",
        ledger: LEDGER_REL,
        ...extra,
        failures: failures.map((f) => ({ clause: f.clause, msg: f.msg })),
    });
}

// ── self-test (focused) ───────────────────────────────────────────────────────────────────────
function selfTest() {
    if (!detect()) {
        console.error(`[proof:inbound-marks] SELF-TEST cannot run — ${LEDGER_REL} absent.`);
        process.exit(1);
    }
    const ledgerText = read(LEDGER_REL);
    const inboxFiles = enumerateInboxFiles();
    const rows = parseDataRows(ledgerText);
    const bites = runBites(ledgerText, inboxFiles, rows);

    console.log("proof:inbound-marks — SELF-TEST (born-RED→GREEN)");
    let allFlag = true;
    for (const b of bites) {
        console.log(`  ${b.pass ? "FLAGGED/CLEAN" : "MISSED      "}  ${b.id}`);
        if (!b.pass) allFlag = false;
    }
    if (!allFlag) {
        console.error("\n[proof:inbound-marks] SELF-TEST FAILED — a bite did not flag its planted defect (or the real ledger is not clean); the detector is not load-bearing.");
        process.exit(1);
    }
    console.log(`\n[proof:inbound-marks] SELF-TEST GREEN — every bite flags born-RED and the real ledger passes I1+I2+I3.`);
    process.exit(0);
}

if (process.argv.includes("--self-test")) selfTest();
else runReal();
