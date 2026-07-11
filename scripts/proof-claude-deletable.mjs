#!/usr/bin/env node
// proof:claude-deletable — the CLAUDE.md-is-deletable precondition gate (BH.B5c).
// ============================================================================
// THE HARD B5c → B4f EDGE, gate-enforced. B4f (the absolute-last act) hard-deletes
// CLAUDE.md. It CANNOT run until every gate that reads CLAUDE.md has been re-homed
// onto its canon/design home (B5c), else the RELEASE-tagged doc-consistency reader
// THROWS ENOENT mid-`--run full` and aborts `git tag` with a raw stack trace (NOT a
// clean red gate) — the CUT-BATTERY-CRASH class this gate makes structurally
// impossible. Born-RED at HEAD (16 live CLAUDE-readers) → GREEN once B5c re-homes
// every one; then B4f may delete the file.
//
// THREE device-free pure-FS clauses (the census is comment-stripped + self-excluded,
// so a comment/regex CLAUDE mention — this gate's own detector strings, or a
// re-homed gate's history note — never counts; only a LIVE code reference does):
//
//   C-CRASH  — zero gates read CLAUDE.md over the 6 reader-alias forms
//              (readFileSync | safeRead | readRel | rd | read | readCanon)(…CLAUDE…).
//              Each such gate crashes (bare readFileSync) or silently false-fails
//              (guarded helper → "" / null) the moment the file is gone.
//   C-RGZERO — zero bare `readFileSync(…CLAUDE…)` sites AND zero `CLAUDE.md`/`CLAUDE_MD`
//              path-literal code references survive (the const-def form
//              `CLAUDE_MD: resolve(ROOT, "CLAUDE.md")` is a dead path after delete
//              even where the read is via a var, so it is flagged too).
//   C-HOMES  — auditCanonHomes("content") == [] AND auditDesignHomes() == [] : every
//              redistributed contract is content-COMPLETE at its new home (the
//              silent-loss fence — a contract must land real at its home BEFORE the
//              source is deleted; a skeleton stub / thin body / absent home REDs).
//
// SELF-PROVING: the pure detectors (classifyClaudeRefs) are fed synthetic sources
// every run — a synthetic reader-form source MUST flag, a synthetic path-const
// source MUST flag, and a clean (canon-re-homed) source MUST NOT. A detector that
// loses its bite REDs.
// ============================================================================

import { readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { stripComments } from "./lib/critical-path-walk.mjs";
import { auditCanonHomes } from "./lib/canon-doc.mjs";
import { auditDesignHomes } from "./lib/design-docs.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SCRIPTS = resolve(ROOT, "scripts");
const SELF_FILE = "proof-claude-deletable.mjs";
const ARTIFACT = gateArtifactPath("GLASS_UI_CLAUDE_DELETABLE_ARTIFACT", "BH-claude-deletable");

const rel = (p) => relative(ROOT, p);

// The 6 reader-alias forms (the PLAN census: `(readFileSync|safeRead|readRel|rd|read|
// readCanon)\([^)]*CLAUDE`). `read\(` matches the bare `read(`/`rd(` helper forms; the
// longer aliases anchor on their own name. readCanon takes a KEY (never a CLAUDE path),
// so a re-homed `readCanon("structure")` is NOT a match — only a CLAUDE-bearing arg is.
const READER_FORM = /\b(readFileSync|safeRead|readRel|rd|read|readCanon)\s*\([^)]*CLAUDE/;
// The bare-crasher form specifically (the C-RGZERO sub-report).
const BARE_READFILESYNC = /\breadFileSync\s*\([^)]*CLAUDE/;
// Any CLAUDE.md path literal or the CLAUDE_MD const identifier (the dead-path class).
const PATH_LITERAL = /(["']CLAUDE\.md["']|\bCLAUDE_MD\b)/;

/**
 * The PURE detector — fed a raw gate source, returns the CLAUDE-reference classes it
 * carries AFTER comment-strip. FS-free so a self-test can hand it synthetic bodies.
 *   { readerForm, bareReadFileSync, pathLiteral } — booleans.
 * A gate is a LIVE reader iff ANY is true.
 */
export function classifyClaudeRefs(src) {
    const code = stripComments(src);
    return {
        readerForm: READER_FORM.test(code),
        bareReadFileSync: BARE_READFILESYNC.test(code),
        pathLiteral: PATH_LITERAL.test(code),
    };
}

/** Any live CLAUDE reference (the union — a gate that must be re-homed before delete). */
export function readsClaude(src) {
    const c = classifyClaudeRefs(src);
    return c.readerForm || c.bareReadFileSync || c.pathLiteral;
}

function proofScripts() {
    return readdirSync(SCRIPTS)
        .filter((f) => /^proof-.*\.mjs$/.test(f) && f !== SELF_FILE)
        .sort();
}

// ── the self-test bite (runs EVERY invocation — a hollow detector REDs here) ──
function selfTest() {
    const fails = [];
    // A synthetic reader-form source (the guarded-helper class) MUST flag.
    if (!readsClaude(`const md = safeRead(resolve(ROOT, "CLAUDE.md"));`))
        fails.push("self-test: a reader-form CLAUDE read was NOT flagged");
    // A synthetic bare-readFileSync crasher MUST flag.
    if (!classifyClaudeRefs(`const x = readFileSync(CLAUDE_MD, "utf8");`).bareReadFileSync)
        fails.push("self-test: a bare readFileSync(CLAUDE_MD) was NOT flagged");
    // A synthetic const-def path literal (no direct read) MUST flag.
    if (!readsClaude(`const P = { CLAUDE_MD: resolve(ROOT, "CLAUDE.md") };`))
        fails.push("self-test: a CLAUDE.md path-const definition was NOT flagged");
    // A COMMENT-ONLY mention MUST NOT flag (the false-witness discipline).
    if (readsClaude(`// this gate used to read CLAUDE.md, now readCanon("structure")\nconst md = readCanon("structure");`))
        fails.push("self-test: a comment-only CLAUDE.md mention was FALSELY flagged");
    // A re-homed canon read MUST NOT flag.
    if (readsClaude(`const md = readCanon("dependencies", "soft");`))
        fails.push("self-test: a re-homed readCanon() was FALSELY flagged");
    return fails;
}

function run() {
    const violations = [];
    const facts = { readerFormReaders: [], bareReadFileSyncSites: [], pathLiteralReaders: [] };

    // ── the self-test bite FIRST (a hollow detector cannot green the gate) ──
    const selfFails = selfTest();
    for (const f of selfFails) violations.push(f);
    facts.selfTest = selfFails.length === 0 ? "pass" : "FAIL";

    // ── C-CRASH + C-RGZERO — the comment-stripped, self-excluded reader census ──
    for (const f of proofScripts()) {
        const src = readFileSync(resolve(SCRIPTS, f), "utf8");
        const c = classifyClaudeRefs(src);
        if (c.readerForm) facts.readerFormReaders.push(f);
        if (c.bareReadFileSync) facts.bareReadFileSyncSites.push(f);
        if (c.pathLiteral && !c.readerForm && !c.bareReadFileSync) facts.pathLiteralReaders.push(f);
    }
    for (const f of facts.readerFormReaders)
        violations.push(
            `[C-CRASH] scripts/${f} — reads CLAUDE.md over a reader-alias form; re-home it onto canon-doc.mjs/design-docs.mjs before B4f deletes the file (it would crash/false-fail on the delete).`,
        );
    for (const f of facts.bareReadFileSyncSites)
        violations.push(
            `[C-RGZERO] scripts/${f} — bare readFileSync(…CLAUDE…) THROWS ENOENT on the delete (the CUT-BATTERY-CRASH class); re-home via readCanon(…, "strict").`,
        );
    for (const f of facts.pathLiteralReaders)
        violations.push(
            `[C-RGZERO] scripts/${f} — carries a dead CLAUDE.md path literal / CLAUDE_MD const; drop the reference (nothing in gate CODE may name the deleted file).`,
        );

    // ── C-HOMES — the silent-loss fence: every home content-complete ──
    const canonMiss = auditCanonHomes("content");
    const designMiss = auditDesignHomes();
    facts.canonHomesIncomplete = canonMiss;
    facts.designHomesAbsent = designMiss;
    for (const m of canonMiss)
        violations.push(
            `[C-HOMES] docs canon home "${m.key}" (${m.rel}) is ${m.state} — the contract is not content-complete at its new home; a re-homed gate would read a stub/absent doc.`,
        );
    for (const m of designMiss)
        violations.push(
            `[C-HOMES] design home "${m.key}" (${m.rel}) is ABSENT — extract the design doc before re-pointing its readers.`,
        );

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:claude-deletable",
        facts,
        violations,
    });

    console.log(
        "proof:claude-deletable — CLAUDE.md is deletable: zero live gate readers + every contract content-complete at its new home (BH.B5c → B4f edge)",
    );
    console.log(`  self-test              : ${facts.selfTest}`);
    console.log(`  reader-form readers    : ${facts.readerFormReaders.length}`);
    console.log(`  bare readFileSync sites: ${facts.bareReadFileSyncSites.length}`);
    console.log(`  dead path-literal refs : ${facts.pathLiteralReaders.length}`);
    console.log(`  canon homes incomplete : ${canonMiss.length}`);
    console.log(`  design homes absent    : ${designMiss.length}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${rel(ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
