#!/usr/bin/env node
// AV.W12 — the no-legacy-commentary gate (proof:no-legacy-commentary).
//
// The two PRODUCTION re-export barrels — `src/api/index.ts` (the /api discovery
// layer) and `src/index.ts` (the root barrel) — must carry ONLY their live
// scope criteria + cherry-pick rationale, NOT per-version tranche archaeology.
// At W12-open `src/api/index.ts` carried 39 `\b[A-Z]{1,2}\.W\d` tranche-letter
// refs + a 100+-line per-version surface-count tally; this gate REDDENS on any
// such archaeology and greens once the audit trail is moved to CHANGELOG.md.
//
// What is FORBIDDEN in either body:
//   - a tranche-letter ref: `\b[A-Z]{1,2}\.W\d` (M.W2, O.W4, AU.W9, …);
//   - the bare word `tranche`;
//   - a version-archaeology literal `vN.N.N` (v1.0.5, v1.7.0, …).
//
// The match is on the WHOLE file (these two barrels have no license header to
// except). A live forward reference — e.g. naming `@mkbabb/glass-ui/motion-core`
// — is NOT a tranche-letter / version string and stays green.
//
// inv ε / bite-check: re-inject a single `M.W2` ref or a `v1.7.0` literal into
// either barrel → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// The two production re-export barrels under audit.
const TARGETS = ["src/api/index.ts", "src/index.ts"];

// Forbidden archaeology patterns (named so the violation is actionable).
const PATTERNS = [
    { name: "tranche-letter-ref", re: /\b[A-Z]{1,2}\.W\d/ },
    { name: "tranche-word", re: /\btranche\b/i },
    { name: "version-archaeology", re: /\bv\d+\.\d+\.\d+\b/ },
];

function scanFile(absPath, relPath) {
    const src = readFileSync(absPath, "utf8");
    const lines = src.split("\n");
    const hits = [];
    for (let i = 0; i < lines.length; i++) {
        for (const { name, re } of PATTERNS) {
            const m = lines[i].match(re);
            if (m) {
                hits.push({
                    file: relPath,
                    line: i + 1,
                    pattern: name,
                    match: m[0],
                    text: lines[i].trim(),
                });
            }
        }
    }
    return hits;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_NO_LEGACY_COMMENTARY_ARTIFACT",
        "AV-no-legacy-commentary",
    );
    const violations = [];
    const facts = { targets: TARGETS, hits: [] };

    for (const rel of TARGETS) {
        const abs = resolve(ROOT, rel);
        if (!existsSync(abs)) {
            violations.push(`target barrel is absent: ${rel}`);
            continue;
        }
        const hits = scanFile(abs, rel);
        facts.hits.push(...hits);
        for (const h of hits) {
            violations.push(
                `${h.file}:${h.line} — ${h.pattern} "${h.match}" :: ${h.text}`,
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:no-legacy-commentary",
        facts,
        violations,
    });

    console.log(
        "proof:no-legacy-commentary — the api+root barrels carry no tranche/version archaeology (AV.W12)",
    );
    for (const rel of TARGETS) {
        const n = facts.hits.filter((h) => h.file === rel).length;
        console.log(`  ${rel.padEnd(20)} : ${n === 0 ? "clean ✓" : `${n} hit(s)`}`);
    }
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
