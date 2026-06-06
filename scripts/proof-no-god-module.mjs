#!/usr/bin/env node
// AV.W13 — the no-god-module line-bound gate (proof:no-god-module).
//
// Born-RED at open (aurora.frag.ts was 819 lines). The god-module decomposition
// splits the five named targets into cohesive sub-modules; this gate forbids the
// regression: NO `src/` `.ts`/`.vue` file may exceed 500 lines. It WARNS at 300
// (the early-signal band — a file past 300 is approaching the bound and should be
// watched) and BITES (RED) the instant a file grows past 500.
//
// Excludes: `__tests__/` directories (test fixtures legitimately run long) and any
// concatenated build output (the gate walks `src/` source only, never `dist/`).
//
// bite-check: a 501-line src/*.ts (or *.vue) → RED.

import { readdirSync, readFileSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const HARD_LIMIT = 500;
const WARN_LIMIT = 300;

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_NO_GOD_MODULE_ARTIFACT",
            "AV-no-god-module",
        ),
    };
    return _cliPaths;
}

/** Recursively collect `.ts`/`.vue` files under `dir`, skipping `__tests__/`. */
function collect(dir, acc) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "__tests__") continue;
            if (entry.name === "node_modules") continue;
            collect(full, acc);
        } else if (entry.isFile()) {
            if (entry.name.endsWith(".ts") || entry.name.endsWith(".vue")) {
                acc.push(full);
            }
        }
    }
    return acc;
}

/** Line count = number of newline-delimited lines (matches `wc -l` + final line). */
function lineCount(file) {
    const text = readFileSync(file, "utf8");
    if (text.length === 0) return 0;
    // wc -l counts trailing-newline-terminated lines; mirror it (split on "\n"
    // and drop a trailing empty segment from a final newline).
    const parts = text.split("\n");
    if (parts[parts.length - 1] === "") parts.pop();
    return parts.length;
}

function run() {
    const { ROOT, SRC, ARTIFACT } = cliPaths();

    let files;
    try {
        files = collect(SRC, []);
    } catch {
        // fail-explicit: a missing src/ is a hard failure, not a silent skip.
        console.error("proof:no-god-module — src/ is absent");
        process.exit(1);
    }

    const measured = files
        .map((f) => ({
            path: relative(ROOT, f).split(sep).join("/"),
            lines: lineCount(f),
        }))
        .sort((a, b) => b.lines - a.lines);

    const violations = measured.filter((m) => m.lines > HARD_LIMIT);
    const warnings = measured.filter(
        (m) => m.lines > WARN_LIMIT && m.lines <= HARD_LIMIT,
    );

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:no-god-module",
        facts: {
            scanned: measured.length,
            hardLimit: HARD_LIMIT,
            warnLimit: WARN_LIMIT,
            largest: measured.slice(0, 10),
        },
        violations: violations.map(
            (v) => `${v.path} is ${v.lines} lines (> ${HARD_LIMIT})`,
        ),
    });

    console.log("proof:no-god-module — no src/ .ts/.vue file > 500 lines (AV.W13)");
    console.log(
        `  scanned ${measured.length} files; hard limit ${HARD_LIMIT}, warn ${WARN_LIMIT}`,
    );
    const top = measured.slice(0, 8);
    console.log("  largest files:");
    for (const m of top) {
        const tag =
            m.lines > HARD_LIMIT ? "✗ OVER" : m.lines > WARN_LIMIT ? "• warn" : "✓ ok";
        console.log(`    ${String(m.lines).padStart(4)}  ${tag}  ${m.path}`);
    }
    if (warnings.length) {
        console.log(
            `\n  ${warnings.length} file(s) in the 301–500 warn band (watch, not RED).`,
        );
    }
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations)
            console.log(`  ✗ ${v.path} is ${v.lines} lines (> ${HARD_LIMIT})`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
