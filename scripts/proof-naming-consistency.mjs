#!/usr/bin/env node
// AW.W31.c — the naming-consistency doc-lint (proof:naming-consistency).
//
// A thin doc-lint that freezes the tranche's naming CONVENTION (the spec §6
// gate 3 / the Lane-5 naming-verbiage fold). It renames NO shipped src/ symbol
// (no-legacy bars an alias — the PascalCase-SFC-in-kebab-dir shipped names stay);
// it normalizes the DIVERGENT DOCS and asserts three machine-checkable facts:
//
//   (a) HEADER STYLE — every `docs/tranches/AW/waves/AW.W<N>-*.md` first line
//       matches the canonical `# AW.W<N> - <Title>` form: the SEPARATOR between
//       the wave id and the title is ` - ` (hyphen-space), NOT ` — ` (en-dash).
//       (An en-dash LATER in the title body — e.g. `Lighthouse audit — glass-ui
//       demo` — is fine; only the id↔title separator is the convention anchor.)
//       The five aurora headers (W4-W8) + W27 carried the en-dash separator at
//       HEAD — the born-RED witnesses.
//
//   (b) CHARTER↔FILE MATCH — for each W<N> the charter §2 wave-table cites the
//       wave file by `waves/AW.W<N>-*.md`; the gate asserts the charter
//       references a file that EXISTS (no off-by-one verbiage drift to a phantom
//       wave file). A KISS structural check — not a fuzzy title-string diff.
//
//   (c) NO PHANTOM TOKEN-FAMILY — no `src/**` source nor any OTHER AW wave doc
//       HEDGES the phantom `--glass-edge-light-{wash..overlay}` per-rung family
//       as-if-it-exists. The rim is UNIFORM (`--glass-edge-light` +
//       `--glass-edge-light-dark`) across rungs by design. The grep scope
//       EXCLUDES this wave file (AW.W31 NAMES the phantom to REJECT it — the
//       canonical exemption) and exempts a rejection-context line (a line that
//       says the family does NOT exist / is rejected / phantom), so a
//       NAMED-to-reject mention is compliant while a HEDGE-as-if-it-exists fails.
//
// House style mirrors the repo's .mjs gates: ESM, a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, exit(1) on any
// violation.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const WAVES_DIR = "docs/tranches/AW/waves";
const CHARTER = "docs/tranches/AW/AW.md";

// This wave file is the canonical phantom-rejection exemption (it NAMES the
// family to reject it). Excluded from the phantom-citation scan.
const SELF = "AW.W31-animation-designmd.md";

// The phantom per-rung edge-light family hedge.
const PHANTOM_RE =
    /--glass-edge-light-\{[^}]*\}|--glass-edge-light-(?:wash|quiet|resting|floating|overlay)\b/;

// A line is a REJECTION context (compliant) if it frames the phantom as
// non-existent / struck / rejected / a hedge to remove — distinct from a HEDGE
// that treats it as a real token to consume.
const REJECTION_RE =
    /\b(phantom|proposed|does not exist|doesn't exist|non-existent|nonexistent|strike|struck|reject|rejected|hedge|NOT exist|no per-rung|not mint|would be a new|speculative|triumvirate trigger)\b/i;

// ── (a) header style ─────────────────────────────────────────────────────────
// The canonical separator after `# AW.W<N>` is ` - ` (hyphen-space). Match the
// id, then require the hyphen-space; an en-dash separator (` — `) fails.
const HEADER_OK_RE = /^# AW\.W\d+[a-z]? - \S/;
const HEADER_ID_RE = /^# (AW\.W\d+[a-z]?)\b/;

export function detectHeaderStyle(read, listWaves) {
    const violations = [];
    let waveCount = 0;
    for (const file of listWaves()) {
        const rel = `${WAVES_DIR}/${file}`;
        const first = read(rel).split("\n", 1)[0] ?? "";
        // Only lint wave-spec files that open with an `# AW.W<N>` header.
        if (!HEADER_ID_RE.test(first)) continue;
        waveCount++;
        if (!HEADER_OK_RE.test(first)) {
            violations.push(
                `${rel}: header '${first}' does not match the canonical '# AW.W<N> - <Title>' form (the id↔title separator must be ' - ' hyphen-space, not ' — ' en-dash)`,
            );
        }
    }
    return { violations, waveCount };
}

// ── (b) charter ↔ file existence ─────────────────────────────────────────────
// Every `waves/AW.W<N>-*.md` the charter cites must EXIST.
const CHARTER_CITE_RE = /waves\/(AW\.W\d+[a-z]?-[a-z0-9-]+\.md)/g;

export function detectCharterMatch(read, fileExists) {
    const violations = [];
    const charter = read(CHARTER);
    const cited = new Set();
    let m;
    CHARTER_CITE_RE.lastIndex = 0;
    while ((m = CHARTER_CITE_RE.exec(charter)) !== null) cited.add(m[1]);
    for (const file of cited) {
        if (!fileExists(`${WAVES_DIR}/${file}`)) {
            violations.push(
                `${CHARTER}: cites 'waves/${file}' which does not exist (off-by-one wave-file verbiage drift)`,
            );
        }
    }
    return { violations, citedCount: cited.size };
}

// ── (c) phantom token-family ─────────────────────────────────────────────────
export function detectPhantom(read, listAllDocs, listSrc) {
    const violations = [];
    let scanned = 0;
    const scan = (rel) => {
        const src = read(rel);
        scanned++;
        const lines = src.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (PHANTOM_RE.test(line) && !REJECTION_RE.test(line)) {
                violations.push(
                    `${rel}:${i + 1}: hedges the phantom '--glass-edge-light-{…}' per-rung family as-if-it-exists — the rim is uniform across rungs by design (strike the hedge or frame it as a rejection)`,
                );
            }
        }
    };
    for (const rel of listAllDocs()) {
        if (basename(rel) === SELF) continue; // the canonical rejection exemption
        scan(rel);
    }
    for (const rel of listSrc()) scan(rel);
    return { violations, scanned };
}

export function detectAll(io) {
    const violations = [];
    const facts = {};

    const h = detectHeaderStyle(io.read, io.listWaves);
    facts.waveHeaders = h.waveCount;
    violations.push(...h.violations);

    const c = detectCharterMatch(io.read, io.fileExists);
    facts.charterCitations = c.citedCount;
    violations.push(...c.violations);

    const p = detectPhantom(io.read, io.listAllDocs, io.listSrc);
    facts.docsScanned = p.scanned;
    violations.push(...p.violations);

    facts.consistent = violations.length === 0;
    return { facts, violations };
}

// ── IO ───────────────────────────────────────────────────────────────────────
function read(rel) {
    return readFileSync(resolve(ROOT, rel), "utf8");
}
function fileExists(rel) {
    return existsSync(resolve(ROOT, rel));
}
function listWaves() {
    return readdirSync(resolve(ROOT, WAVES_DIR)).filter((f) => f.endsWith(".md"));
}
function listAllDocs() {
    // Every AW doc (waves + audit + charter) — the "other wave doc" scope for (c).
    const out = [];
    const walk = (relDir) => {
        for (const e of readdirSync(resolve(ROOT, relDir), { withFileTypes: true })) {
            const rel = `${relDir}/${e.name}`;
            if (e.isDirectory()) walk(rel);
            else if (e.name.endsWith(".md")) out.push(rel);
        }
    };
    walk("docs/tranches/AW");
    return out;
}
function listSrc() {
    // src/** — but the phantom token family is CSS/TS authored; scan the style +
    // composable surfaces (a fast, targeted walk; the rim token lives in CSS).
    const out = [];
    const exts = [".css", ".ts", ".vue"];
    const walk = (relDir) => {
        for (const e of readdirSync(resolve(ROOT, relDir), { withFileTypes: true })) {
            if (e.name === "node_modules") continue;
            const rel = `${relDir}/${e.name}`;
            if (e.isDirectory()) walk(rel);
            else if (exts.some((x) => e.name.endsWith(x))) out.push(rel);
        }
    };
    walk("src");
    return out;
}

function run() {
    const { facts, violations } = detectAll({
        read,
        fileExists,
        listWaves,
        listAllDocs,
        listSrc,
    });
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_NAMING_CONSISTENCY_ARTIFACT",
        "AW-naming-consistency",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:naming-consistency",
        facts,
        violations,
    });
    console.log("proof:naming-consistency — the naming doc-lint (AW.W31.c)");
    console.log(`  wave headers linted        : ${facts.waveHeaders}`);
    console.log(`  charter wave-file citations : ${facts.charterCitations}`);
    console.log(`  docs/src scanned (phantom) : ${facts.docsScanned}`);
    console.log(`  naming consistent          : ${facts.consistent ? "YES" : "NO"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
