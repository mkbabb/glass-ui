#!/usr/bin/env node
// PROTOTYPE (BH round-2 spec-structure G3) — proof:depth (T2).
//
// STRUCTURE-SPEC §1.3 T2: within one component root the tree is
//     root → {segment dir} → file
// A segment dir (composables/ shaders/ skeleton/ styles/ sections/ constants/
// utils/ config/) holds FILES, not other segment dirs. A nested SUB-COMPONENT
// (a child dir carrying its OWN index.ts) is a NEW component root that RESETS the
// local budget — how recursion (edict 3) stays legal without unbounded depth.
// A global sanity cap (≤ SANITY_CAP dirs below the NEAREST feature/component
// root) catches runaway recursion.
//
// TWO clauses:
//   D1 — no segment-dir under a segment-dir (unless the inner is a component
//        root, i.e. carries an index.ts → recursion reset).
//   D2 — the sanity cap: depth below the nearest index.ts-bearing ancestor
//        ≤ SANITY_CAP.
//
// The pure evaluateDir() runs over an INJECTED descriptor so the self-test can
// feed synthetic dir shapes.

import { existsSync, readdirSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

function resolveRoot() {
    const arg = process.argv.find((a) => a.startsWith("--root="));
    if (arg) return resolve(arg.slice("--root=".length));
    return resolve(fileURLToPath(new URL("../../", import.meta.url)));
}
const ROOT = resolveRoot();
const SRC = resolve(ROOT, "src");
const rel = (p) => relative(ROOT, p).split(sep).join("/");

const SEGMENT_DIRS = new Set([
    "composables", "shaders", "skeleton", "styles", "sections", "constants", "utils", "config",
]);
const SANITY_CAP = 5;

/**
 * The PURE per-dir adjudicator over an INJECTED descriptor:
 *   { name, isSegment, parentIsSegment, isComponentRoot,
 *     depthBelowNearestRoot }
 * Returns the violation strings for this dir (empty when legal).
 */
export function evaluateDir(d) {
    const out = [];
    // D1 — a segment dir directly under another segment dir, and NOT itself a
    //      component root (index.ts → recursion reset), is over-nesting.
    if (d.isSegment && d.parentIsSegment && !d.isComponentRoot) {
        out.push(
            `${d.rel ?? d.name} — a segment dir ("${d.name}") nests directly under another segment dir; a segment holds FILES, not segment dirs (add an index.ts to make it a recursion-reset sub-component, or lift it to the component root)`,
        );
    }
    // D2 — the sanity cap below the nearest component root.
    if (d.depthBelowNearestRoot > SANITY_CAP) {
        out.push(
            `${d.rel ?? d.name} — ${d.depthBelowNearestRoot} dirs below the nearest component root (cap ${SANITY_CAP}); runaway recursion needs a recorded rationale`,
        );
    }
    return out;
}

// ── The live-tree walker.
function isComponentRoot(dir) {
    return existsSync(resolve(dir, "index.ts")) || existsSync(resolve(dir, "index.vue"));
}

function walk(dir, nearestRootDepthStack, acc) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (!e.isDirectory()) continue;
        if (e.name === "__tests__" || e.name === "node_modules") continue;
        const full = resolve(dir, e.name);
        const parentName = dir.split(sep).pop();
        const thisIsRoot = isComponentRoot(full);
        // depth below nearest root: reset to 0 at a component root, else +1.
        const depthBelow = thisIsRoot ? 0 : nearestRootDepthStack + 1;
        acc.push({
            dir: full,
            rel: rel(full),
            name: e.name,
            isSegment: SEGMENT_DIRS.has(e.name),
            parentIsSegment: SEGMENT_DIRS.has(parentName),
            isComponentRoot: thisIsRoot,
            depthBelowNearestRoot: depthBelow,
        });
        walk(full, depthBelow, acc);
    }
    return acc;
}

function selfTest() {
    const fails = [];
    const check = (d, shouldFlag, name) => {
        const v = evaluateDir(d);
        if (shouldFlag && v.length === 0) fails.push(`[SELF-TEST] expected FLAG but passed: ${name}`);
        if (!shouldFlag && v.length !== 0) fails.push(`[SELF-TEST] expected PASS but flagged (${v[0]}): ${name}`);
    };
    // D1 — segment under segment REDs (aurora/constants/shaders).
    check(
        { name: "shaders", isSegment: true, parentIsSegment: true, isComponentRoot: false, depthBelowNearestRoot: 2 },
        true, "shaders/ under constants/ (segment-under-segment)",
    );
    // D1-fence — a segment dir DIRECTLY under a component root PASSES.
    check(
        { name: "composables", isSegment: true, parentIsSegment: false, isComponentRoot: false, depthBelowNearestRoot: 1 },
        false, "composables/ under a component root",
    );
    // D1-reset — a segment-named dir that IS a component root (index.ts) PASSES
    //            even under a segment parent (recursion reset).
    check(
        { name: "sections", isSegment: true, parentIsSegment: true, isComponentRoot: true, depthBelowNearestRoot: 0 },
        false, "a sub-component with index.ts under a segment (recursion reset)",
    );
    // D2 — the sanity cap.
    check(
        { name: "deep", isSegment: false, parentIsSegment: false, isComponentRoot: false, depthBelowNearestRoot: 6 },
        true, "6 dirs below the nearest component root (over the sanity cap)",
    );
    // D2-fence — at the cap PASSES.
    check(
        { name: "ok", isSegment: false, parentIsSegment: false, isComponentRoot: false, depthBelowNearestRoot: 5 },
        false, "exactly at the sanity cap",
    );
    return fails;
}

function run() {
    const dirs = walk(resolve(SRC, "components"), 0, []);
    const violations = [];
    const flagged = [];
    for (const d of dirs) {
        const v = evaluateDir(d);
        if (v.length) { flagged.push(d); violations.push(...v); }
    }
    const selfFails = selfTest();
    violations.push(...selfFails);

    console.log("PROTO proof:depth — T2 (segment-under-segment + sanity cap)");
    console.log(`  scanned ${dirs.length} dirs under src/components (root=${rel(SRC)})`);
    console.log(`  segment-under-segment flags: ${flagged.filter((d) => d.isSegment && d.parentIsSegment && !d.isComponentRoot).length}`);
    for (const d of flagged) console.log(`    ✗ ${d.rel} (depth ${d.depthBelowNearestRoot} below nearest root)`);
    console.log(`  self-test bites: ${selfFails.length === 0 ? "5/5 handled ✓" : selfFails.length + " FAILED"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    const status = violations.length === 0 ? "PASS" : "FAIL";
    console.log(`\n  status: ${status}`);
    process.exit(violations.length === 0 ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
