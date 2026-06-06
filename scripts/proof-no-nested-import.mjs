#!/usr/bin/env node
// AV.W14 — the nested-import structure-lock (proof:no-nested-import).
//
// At HEAD the runtime nested-import count is ZERO (the digest confirmed no true
// dynamic `import()` nesting in src/). This gate KEEPS it zero: no `import(` or
// `require(` may appear inside a `src/` function body (a runtime-position
// dynamic import) UNLESS the line carries a `// lazy-boundary:` sentinel naming
// a deliberate, befitting lazy split (the keyframes HEAVY-tier
// `loadAnimationEngine()` await-import is the one allowlisted seam shape — a
// value.js-free lazy split, not a workaround).
//
// It ALSO flags inline TYPE-position dynamic imports — `import("vue").Foo` in a
// type annotation — which should be a top-level `import type` instead. The
// `useSidebarState.ts:46` `import("vue").ComputedRef` was the one such finding;
// it is hoisted, so this assert is a structure-lock too.
//
// bite-check: add a nested `await import("./foo")` without the sentinel → RED;
// add it WITH a `// lazy-boundary:` sentinel on the line → green.

import { readdirSync, readFileSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function cliPaths() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    return {
        ROOT,
        SRC: resolve(ROOT, "src"),
        ARTIFACT: gateArtifactPath("GLASS_UI_NO_NESTED_IMPORT_ARTIFACT", "AV-no-nested-import"),
    };
}

function collect(dir, acc) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "__tests__" || entry.name === "node_modules") continue;
            collect(full, acc);
        } else if (entry.isFile()) {
            if (entry.name.endsWith(".ts") || entry.name.endsWith(".vue")) acc.push(full);
        }
    }
    return acc;
}

// A top-level static `import … from "…"` is fine; the dynamic forms we hunt are
// `import(` and `require(` as a CALL (runtime), and `import("…")` in a TYPE
// position. A line-level scan suffices: a static import statement begins with
// the `import` keyword and never has an open-paren immediately after `import`.
const DYNAMIC_IMPORT_CALL = /(?<![A-Za-z0-9_$.])import\s*\(/; // import(  — the call form
const REQUIRE_CALL = /(?<![A-Za-z0-9_$.])require\s*\(/;
const TYPE_POSITION_IMPORT = /:\s*import\s*\(\s*["'`]/; // `: import("…")` in a type annotation
const LAZY_SENTINEL = /\/\/\s*lazy-boundary:/;

export function detect(ROOT, SRC) {
    const files = collect(SRC, []);
    const runtimeViolations = [];
    const typeViolations = [];
    const allowlisted = [];

    for (const f of files) {
        const rel = relative(ROOT, f).split(sep).join("/");
        const raw = readFileSync(f, "utf8");
        // Strip block comments globally, then per-line strip the `//` tail (but
        // KEEP the // tail visible for the sentinel test, which runs on the raw
        // line). So we scan a comment-free CODE line for the import calls, and
        // the raw line for the sentinel.
        const codeNoBlock = raw.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
        const rawLines = raw.split("\n");
        const codeLines = codeNoBlock.split("\n");
        codeLines.forEach((codeLine, idx) => {
            const lineNo = idx + 1;
            const rawLine = rawLines[idx] ?? "";
            // Drop the `//` line-comment tail from the CODE line before matching
            // import calls (prose like "leaf import (…)" is not a dynamic import).
            const code = codeLine.replace(/\/\/.*$/, "");
            const hasSentinel = LAZY_SENTINEL.test(rawLine);
            // Type-position dynamic import — always a finding (hoist it).
            if (TYPE_POSITION_IMPORT.test(code)) {
                typeViolations.push(`${rel}:${lineNo} inline type-position import("…") — hoist to a top-level import type`);
                return;
            }
            const isDynamicCall = DYNAMIC_IMPORT_CALL.test(code) || REQUIRE_CALL.test(code);
            if (!isDynamicCall) return;
            if (hasSentinel) {
                allowlisted.push(`${rel}:${lineNo} (lazy-boundary sentinel)`);
            } else {
                runtimeViolations.push(`${rel}:${lineNo} nested import()/require() without a // lazy-boundary: sentinel`);
            }
        });
    }

    return { runtimeViolations, typeViolations, allowlisted };
}

function run() {
    const { ROOT, SRC, ARTIFACT } = cliPaths();
    const { runtimeViolations, typeViolations, allowlisted } = detect(ROOT, SRC);
    const violations = [...runtimeViolations, ...typeViolations];
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:no-nested-import",
        facts: { allowlisted, runtimeViolations, typeViolations },
        violations,
    });

    console.log("proof:no-nested-import — zero runtime nested import()/require() in src/ (AV.W14)");
    console.log(`  allowlisted lazy boundaries: ${allowlisted.length ? allowlisted.join(", ") : "none"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
