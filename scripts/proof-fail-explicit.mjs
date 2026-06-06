#!/usr/bin/env node
// AV.W12 — the fail-explicit gate (proof:fail-explicit).
//
// The user mandate verbatim: "excise the code entirely, or fail explicitly: no
// silent or graceful handling unless befitting." This gate makes that binary in
// `src/`:
//
//   1. EVERY `catch (…) {…}` / `catch {…}` body must either RE-THROW (or
//      otherwise re-raise via a `throw`) OR carry a `// fail-explicit: <reason>`
//      sentinel (in the block body or the 4 lines immediately above the catch).
//      A bare empty / silent swallow with neither REDDENS the gate.
//   2. NO `?? reactive(` masking-default synthesis anywhere — the GooBlob class
//      of "synthesize a stand-in for an absent REQUIRED dependency". No exemption.
//   3. NO `?? new ` default-synthesis UNLESS the line (or the 2 lines above)
//      carries a `// fail-explicit:` sentinel naming it as a legitimate optional
//      (e.g. an explicitly-optional reuse buffer, not a required dependency).
//
// Born-RED at HEAD: the un-annotated sortable/clipboard/useGlobalDark swallows +
// the GooBlob `?? reactive(` synthesis all reddened it before W12.
//
// inv ε / bite-check: strip a `// fail-explicit:` sentinel off any befitting
// catch, or re-inject `?? reactive(BLOB_CONFIG_DEFAULTS)` → RED.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");

const SENTINEL = "fail-explicit:";

function walk(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        if (n === "node_modules" || n === "__tests__") continue;
        const p = join(dir, n);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, acc);
        else if (/\.(ts|tsx|vue)$/.test(n) && !/\.test\.|\.spec\./.test(n)) {
            acc.push(p);
        }
    }
    return acc;
}

/**
 * From the opening brace at `src[braceIdx]` ('{'), return the index just past
 * the matching close brace. Naive brace counter — sufficient for catch bodies
 * (string/comment braces inside a catch body are vanishingly rare and would, at
 * worst, widen the scanned window, never narrow it past the real close).
 */
function matchBrace(src, braceIdx) {
    let depth = 0;
    for (let i = braceIdx; i < src.length; i++) {
        const c = src[i];
        if (c === "{") depth++;
        else if (c === "}") {
            depth--;
            if (depth === 0) return i + 1;
        }
    }
    return src.length;
}

function lineNumberAt(src, idx) {
    let line = 1;
    for (let i = 0; i < idx && i < src.length; i++) {
        if (src[i] === "\n") line++;
    }
    return line;
}

/**
 * The N lines above through the 1-based `line` itself (joined). Inclusive of the
 * line so a same-line trailing sentinel is seen; the window above absorbs a
 * multi-line sentinel comment block sitting on top of the catch / default.
 */
function sentinelWindow(lines, line, n) {
    const start = Math.max(0, line - 1 - n);
    return lines.slice(start, line).join("\n");
}

function scanCatches(src, lines, relPath, violations) {
    // Match `catch (...) {` and `catch {` — capture the index of the opening
    // brace so we can brace-match the body.
    const re = /\bcatch\s*(?:\([^)]*\))?\s*\{/g;
    let m;
    while ((m = re.exec(src)) !== null) {
        const braceIdx = src.indexOf("{", m.index);
        if (braceIdx === -1) continue;
        const end = matchBrace(src, braceIdx);
        const body = src.slice(braceIdx, end);
        const line = lineNumberAt(src, m.index);

        const hasThrow = /\bthrow\b/.test(body);
        const sentinelInBody = body.includes(SENTINEL);
        // Window: the catch line itself + 6 lines above (absorbs a multi-line
        // befitting-sentinel comment block sitting on top of the catch).
        const sentinelNear = sentinelWindow(lines, line, 6).includes(SENTINEL);

        if (!hasThrow && !sentinelInBody && !sentinelNear) {
            violations.push(
                `${relPath}:${line} — silent catch: no throw / re-raise and no ` +
                    `'// fail-explicit:' sentinel. EXCISE it, re-throw, or annotate ` +
                    `the befitting swallow with a surfaced flag.`,
            );
        }
    }
}

function scanMaskingDefaults(src, lines, relPath, violations) {
    for (let i = 0; i < lines.length; i++) {
        const ln = lines[i];
        // (2) `?? reactive(` — the masking default-synthesis, no exemption.
        if (/\?\?\s*reactive\(/.test(ln)) {
            violations.push(
                `${relPath}:${i + 1} — masking default '?? reactive(': synthesizes ` +
                    `a stand-in for an absent required dependency. Throw on the ` +
                    `absent dependency instead. :: ${ln.trim()}`,
            );
        }
        // (3) `?? new ` — allowed only with a sentinel naming the legit optional.
        if (/\?\?\s*new\s/.test(ln)) {
            const window = sentinelWindow(lines, i + 1, 4);
            if (!window.includes(SENTINEL)) {
                violations.push(
                    `${relPath}:${i + 1} — default-synthesis '?? new ' without a ` +
                        `'// fail-explicit:' sentinel. If it is a required dependency, ` +
                        `throw; if a legitimate optional (e.g. an out-buffer), annotate. ` +
                        `:: ${ln.trim()}`,
                );
            }
        }
    }
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_FAIL_EXPLICIT_ARTIFACT",
        "AV-fail-explicit",
    );
    const violations = [];
    const files = walk(SRC);

    for (const abs of files) {
        const rel = abs.slice(ROOT.length + 1);
        const src = readFileSync(abs, "utf8");
        const lines = src.split("\n");
        scanCatches(src, lines, rel, violations);
        scanMaskingDefaults(src, lines, rel, violations);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:fail-explicit",
        facts: { filesScanned: files.length },
        violations,
    });

    console.log(
        "proof:fail-explicit — no silent swallow / masking default in src/ (AV.W12)",
    );
    console.log(`  files scanned : ${files.length}`);
    console.log(`  violations    : ${violations.length}`);
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
