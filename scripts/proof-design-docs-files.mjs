#!/usr/bin/env node
// proof:design-docs-files — BH.B4c-precept-extract-files: the design-doc extraction-files lock.
//
// BH carves the 4 glass-ui design docs (design-idioms · motion-canon · tunable-anim ·
// affordance-map) out of the `docs/precepts` SUBMODULE into a first-class repo home
// `docs/design/`. This wave is the FILES arm of B4c — it ESTABLISHES the new home (a
// verbatim copy; the DOCK_SPRING freshening 0.32/0.7→0.68/0.64 is the separate B4c-extraction
// [WSn] wave, and the 10 precept-reader gate re-points are the B4c-gate-repoints [WS12] wave).
// This gate is the standing guard that the home LANDED and STAYS landed: a future doc-slim /
// CLAUDE-delete / gate-rehome wave cannot silently drop a design doc out of docs/design/.
//
// CLAUSES (F1-F2):
//   F1  EXTRACTED — each of the 4 design docs RESOLVES on disk in docs/design/ (exists AND
//       is non-trivially-sized, so an empty stub or a 0-byte placeholder REDs). Born-RED on
//       HEAD: docs/design/ does not exist, so all 4 are MISSING.
//   F2  IDENTITY — each extracted doc carries its expected H1 identity token, so a wrong /
//       truncated / stub file (right path, wrong content) REDs. The identity tokens are the
//       stable title words the later freshening (numeric-value-only) never rewrites.
//
// The foreign-tree fence (the files arm COPIES, never MOVES the submodule source) is the
// orchestrator's patch-scope guarantee — this gate locks the OUTCOME (the home exists), not
// the submodule lifecycle (the upstream by-name-ask delete lands in mkbabb/precepts, not here).
//
// SELF-TEST (born-RED→GREEN): `node scripts/proof-design-docs-files.mjs --self-test` feeds the
// pure detector synthetic fixtures — a missing doc (F1 RED), an empty stub (F1 RED), a
// wrong-identity doc (F2 RED) — each MUST flag, AND the real on-disk tree must be clean.
//
// House style mirrors proof-tunable-anim.mjs / proof-affordance-map.mjs: ESM .mjs, a pure
// exported detector over an injected fileMap (so --self-test runs with no disk), a human
// summary, exit(1) on any violation.

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

// The 4 design docs carved into docs/design/ + their stable H1 identity token.
export const DESIGN_DOCS = [
    { name: "design-idioms", title: "Design Idioms" },
    { name: "motion-canon", title: "motion canon" },
    { name: "tunable-anim", title: "tunable-anim" },
    { name: "affordance-map", title: "affordance-map" },
];

// A non-trivial doc floor — a real extracted design doc is kilobytes; a stub/placeholder is not.
const MIN_BYTES = 1024;

/**
 * Pure detector: given `read(path) -> string|null`, return the list of violations.
 * The real run injects a disk reader; --self-test injects a synthetic fixture map.
 */
export function auditDesignDocsFiles(read) {
    const violations = [];
    for (const doc of DESIGN_DOCS) {
        const path = `docs/design/${doc.name}.md`;
        const content = read(path);
        if (content == null) {
            violations.push(`F1 ${path} MISSING — the extraction-files home is incomplete.`);
            continue;
        }
        if (content.length < MIN_BYTES) {
            violations.push(
                `F1 ${path} too small (${content.length}B < ${MIN_BYTES}B) — an empty stub is not the extracted doc.`,
            );
        }
        const h1 = (content.split("\n", 1)[0] || "").trim();
        if (!h1.startsWith("#") || !h1.includes(doc.title)) {
            violations.push(
                `F2 ${path} H1 missing identity "${doc.title}" (got "${h1.slice(0, 64)}") — wrong/truncated content.`,
            );
        }
    }
    return violations;
}

function diskRead(relPath) {
    const abs = join(ROOT, relPath);
    return existsSync(abs) ? readFileSync(abs, "utf8") : null;
}

function selfTest() {
    const real = "# affordance-map — the interaction-affordance idiom\n" + "x".repeat(2048);
    const bites = [
        {
            label: "missing doc → F1",
            map: { "docs/design/tunable-anim.md": real }, // the other 3 absent
            expect: (v) => v.some((m) => m.startsWith("F1") && m.includes("MISSING")),
        },
        {
            label: "empty stub → F1",
            map: {
                "docs/design/design-idioms.md": "# Design Idioms — the localized home\n",
                "docs/design/motion-canon.md": "# The motion canon\n" + "y".repeat(2048),
                "docs/design/tunable-anim.md": "# tunable-anim registry\n" + "y".repeat(2048),
                "docs/design/affordance-map.md": "# affordance-map idiom\n" + "y".repeat(2048),
            },
            expect: (v) => v.some((m) => m.startsWith("F1") && m.includes("too small")),
        },
        {
            label: "wrong identity → F2",
            map: {
                "docs/design/design-idioms.md": "# Some Other Doc\n" + "z".repeat(2048),
                "docs/design/motion-canon.md": "# The motion canon\n" + "z".repeat(2048),
                "docs/design/tunable-anim.md": "# tunable-anim registry\n" + "z".repeat(2048),
                "docs/design/affordance-map.md": "# affordance-map idiom\n" + "z".repeat(2048),
            },
            expect: (v) => v.some((m) => m.startsWith("F2")),
        },
    ];
    let ok = true;
    for (const bite of bites) {
        const v = auditDesignDocsFiles((p) => bite.map[p] ?? null);
        const flagged = bite.expect(v);
        console.log(`  ${flagged ? "PASS" : "FAIL"}  self-test bite: ${bite.label}`);
        if (!flagged) ok = false;
    }
    // GREEN-after: the real on-disk tree must be clean.
    const realViolations = auditDesignDocsFiles(diskRead);
    const realClean = realViolations.length === 0;
    console.log(`  ${realClean ? "PASS" : "FAIL"}  self-test: the real docs/design/ tree is clean`);
    if (!realClean) {
        ok = false;
        for (const m of realViolations) console.log(`        ${m}`);
    }
    return ok;
}

function main() {
    if (process.argv.includes("--self-test")) {
        console.log("proof:design-docs-files — self-test (born-RED→GREEN bites)");
        const ok = selfTest();
        console.log(ok ? "\nproof:design-docs-files self-test GREEN" : "\nproof:design-docs-files self-test RED");
        process.exit(ok ? 0 : 1);
    }
    const violations = auditDesignDocsFiles(diskRead);
    if (violations.length) {
        console.log("proof:design-docs-files RED — the design-doc extraction home is incomplete:");
        for (const m of violations) console.log(`  ✗ ${m}`);
        process.exit(1);
    }
    console.log(
        `proof:design-docs-files GREEN — all ${DESIGN_DOCS.length} design docs resolve in docs/design/ (${DESIGN_DOCS
            .map((d) => d.name)
            .join(" · ")}).`,
    );
    process.exit(0);
}

// Guard the top-level run behind the entry-module check (the house import.meta.url idiom) so
// importing the pure detector for the self-test / a sibling never runs the gate.
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
