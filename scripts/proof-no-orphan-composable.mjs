#!/usr/bin/env node
// AV.W5.B — the no-orphan-composable structure-lock (proof:no-orphan-composable).
//
// L.W2 Lane A restructured `src/composables/` into named domain sub-trees: every
// composable LEAF lives in a sub-tree dir (`color/`, `dark/`, `keyboard/`,
// `reactive/`, `dom/`, `motion/`, `glass/`, `sortable/`, `sidebar/`, `context/`),
// and ONLY `index.ts` (the internal barrel) sits loose at the top level. W5 Lane B
// confirmed there is no genuinely-orphaned top-level composable to extract: the
// `isMac` platform-detection leaf is SINGLE-CONSUMER (keyboard-internal — used
// only inside `composables/keyboard/useKeyboardShortcuts.ts`), so per J inv 10 it
// is NOT speculatively hoisted to a one-consumer `platform/` sub-tree.
//
// This gate is the STRUCTURE-LOCK that keeps it that way: any NEW loose `.ts` at
// `src/composables/` top level (other than `index.ts`) is an orphan — a composable
// that escaped its domain sub-tree. The check is drift-proof by construction: it
// does NOT hardcode the sub-tree name allowlist (which would go stale every time a
// new domain sub-tree lands, as `context/` did at AV.W14); it asserts the
// structural invariant directly — at `src/composables/` depth-1, the only `.ts`
// file is `index.ts`; every other `.ts` lives one level deeper inside a sub-tree.
//
// House style mirrors proof-dock-opacity-lockstep.mjs: ESM .mjs, a pure exported
// detector, a byte-stable JSON artefact via gate-output, a human summary,
// process.exit(1) on any violation.
//
// Bite: drop a loose `useFoo.ts` at `src/composables/` top level → RED.

import { readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath(
    "GLASS_UI_NO_ORPHAN_COMPOSABLE_ARTIFACT",
    "AV-no-orphan-composable",
);

// The ONLY `.ts` permitted loose at `src/composables/` top level.
const ALLOWED_LOOSE = new Set(["index.ts"]);

/**
 * The pure detector. Inputs: the depth-1 entries of `src/composables/` as
 * `{ name, isDir }` records. Returns { facts, violations }.
 *
 * Invariant: at depth-1, every `.ts` file is `index.ts`; every other composable
 * leaf is nested one level deeper inside a named sub-tree dir.
 */
export function detectOrphans(entries) {
    const violations = [];
    const subTrees = entries.filter((e) => e.isDir).map((e) => e.name).sort();
    const looseTs = entries
        .filter((e) => !e.isDir && e.name.endsWith(".ts"))
        .map((e) => e.name)
        .sort();

    const orphans = looseTs.filter((n) => !ALLOWED_LOOSE.has(n));
    for (const o of orphans) {
        violations.push(
            `orphan composable at src/composables/ top level: ${o} — every composable leaf must live in a named domain sub-tree (only index.ts may sit loose)`,
        );
    }

    return {
        facts: { subTrees, looseTs, subTreeCount: subTrees.length },
        violations,
    };
}

function readEntries() {
    const dir = resolve(ROOT, "src/composables");
    return readdirSync(dir).map((name) => ({
        name,
        isDir: statSync(resolve(dir, name)).isDirectory(),
    }));
}

function run() {
    const { facts, violations } = detectOrphans(readEntries());
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:no-orphan-composable",
        facts,
        violations,
    });

    console.log(
        "proof:no-orphan-composable — the composables sub-tree structure-lock (AV.W5.B)",
    );
    console.log(`  domain sub-trees (${facts.subTreeCount}): ${facts.subTrees.join(", ")}`);
    console.log(`  loose .ts at top level    : ${facts.looseTs.join(", ") || "(none)"}`);
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
