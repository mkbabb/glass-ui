#!/usr/bin/env node
// AV.W17 → AW.W19 — the speedtest-boundary gate (proof:speedtest-boundary).
//
// The speedtest-origin composable set is the eight composables that were
// promoted into glass-ui from the speedtest app. AV.W17 ledgered each against a
// HEAD consumer-grep: the ≥2-consumer bar (NOT the origin) decides ownership. A
// speedtest-origin primitive glass-ui genuinely consumes (or exports as a
// documented public primitive) STAYS as CORE.
//
// AW.W19/Item-5 REVERSED the AV.W17 "move-orphan-out" boundary: the five
// composables AV.W17 had pruned (useBreakpoint / useIdleReady / useViewportReady
// / useStagger / useAnimatedNumberMap) were RE-INSTATED as documented public
// /dom + /motion primitives (the AV prune mis-judged real downstream consumers —
// value.js's demo imports useBreakpoint; speedtest consumes useIdleReady /
// useViewportReady; useStagger is a distinct API from useStaggerReveal). So the
// ledger now classes all eight speedtest-origin composables STAY-as-CORE: this
// gate is the grounding-lock that keeps every one of them present + barrel-
// exported (the AW.W19 surface decision), no longer a one-way move-out boundary.
//
// Bite:
//   - delete any of the eight STAY primitives (the 3 always-core + the 5
//     AW.W19-re-instated) or drop its barrel export → RED (a grounded public
//     CORE primitive lost its surface).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath(
    "GLASS_UI_SPEEDTEST_BOUNDARY_ARTIFACT",
    "AV-speedtest-boundary",
);

// The speedtest-origin ledger (AV.W17 §A). Each entry names the leaf module
// (relative to src/composables/), the barrel that (de)registers it, and the
// disposition. STAY → the leaf + barrel export MUST be present. MOVED → the leaf
// MUST be absent AND no barrel may re-export it (it returned to the speedtest
// owner, name-forward).
const LEDGER = [
    // STAY-as-CORE — grounded by a genuine internal consumer or a documented
    // public-export.
    { name: "useYieldToMain", leaf: "motion/useYieldToMain.ts", barrel: "motion/core/index.ts", token: "useYieldToMain", disposition: "stay" },
    { name: "usePrioritizedTask", leaf: "motion/usePrioritizedTask.ts", barrel: "motion/core/index.ts", token: "usePrioritizedTask", disposition: "stay" },
    { name: "useViewTransition", leaf: "motion/useViewTransition.ts", barrel: "motion/core/index.ts", token: "useViewTransition", disposition: "stay" },
    // RE-INSTATED as CORE (AW.W19/Item-5 + the extended commit) — the AV.W17
    // "move-orphan-out" boundary was REVERSED: these five are now documented
    // public primitives (value.js's demo imports useBreakpoint; speedtest
    // consumes useIdleReady/useViewportReady via /dom; useStagger is a distinct
    // API from useStaggerReveal; useAnimatedNumberMap rides /motion). Their leaf
    // + barrel export are the grounded surface — dropping any of them now REDs.
    { name: "useBreakpoint", leaf: "dom/useBreakpoint.ts", barrel: "dom/index.ts", token: "useBreakpoint", disposition: "stay" },
    { name: "useIdleReady", leaf: "dom/useIdleReady.ts", barrel: "dom/index.ts", token: "useIdleReady", disposition: "stay" },
    { name: "useViewportReady", leaf: "dom/useViewportReady.ts", barrel: "dom/index.ts", token: "useViewportReady", disposition: "stay" },
    { name: "useStagger", leaf: "motion/useStagger.ts", barrel: "motion/core/index.ts", token: "useStagger", disposition: "stay" },
    { name: "useAnimatedNumberMap", leaf: "motion/useAnimatedNumberMap.ts", barrel: "motion/index.ts", token: "useAnimatedNumberMap", disposition: "stay" },
];

/**
 * The pure detector. `fs` injects `{ existsSync, readBarrel }` so the check is
 * testable without disk. Returns `{ facts, violations }`.
 *
 * A barrel re-export is detected by the `export * from "./<token>"` /
 * `export * from "../<token>"` line (the house barrel shape). A MOVED leaf must
 * be absent AND unreferenced by its barrel; a STAY leaf must be present AND
 * re-exported.
 */
export function detectBoundary(ledger, fs) {
    const violations = [];
    const facts = { stay: [], moved: [] };

    for (const entry of ledger) {
        const leafPresent = fs.existsSync(entry.leaf);
        const barrelSrc = fs.readBarrel(entry.barrel);
        // The barrel-export line for this leaf, in either sub-tree-relative form.
        const leafBase = entry.leaf.split("/").pop().replace(/\.ts$/, "");
        const exportRe = new RegExp(
            `export\\s+\\*\\s+from\\s+["'][./]*${leafBase}["']`,
        );
        const barrelExports = exportRe.test(barrelSrc);

        if (entry.disposition === "stay") {
            facts.stay.push(entry.name);
            if (!leafPresent) {
                violations.push(
                    `STAY primitive ${entry.name} lost its leaf (${entry.leaf}) — a grounded CORE primitive must stay present`,
                );
            }
            if (!barrelExports) {
                violations.push(
                    `STAY primitive ${entry.name} is no longer re-exported by ${entry.barrel} — it lost its public CORE surface`,
                );
            }
        } else {
            facts.moved.push(entry.name);
            if (leafPresent) {
                violations.push(
                    `MOVED orphan ${entry.name} is back at ${entry.leaf} — a speedtest-specific orphan returned to the CORE surface (it belongs to the speedtest owner; inv-16 name-forward)`,
                );
            }
            if (barrelExports) {
                violations.push(
                    `MOVED orphan ${entry.name} is re-exported by ${entry.barrel} — drop the barrel line (the leaf moved back to the speedtest owner)`,
                );
            }
        }
    }

    return { facts, violations };
}

function diskFs() {
    const base = resolve(ROOT, "src/composables");
    return {
        existsSync: (rel) => existsSync(resolve(base, rel)),
        readBarrel: (rel) => {
            const p = resolve(base, rel);
            return existsSync(p) ? readFileSync(p, "utf8") : "";
        },
    };
}

function run() {
    const { facts, violations } = detectBoundary(LEDGER, diskFs());
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:speedtest-boundary",
        facts,
        violations,
    });

    console.log(
        "proof:speedtest-boundary — the speedtest-origin ownership lock (AV.W17)",
    );
    console.log(`  STAY-as-CORE  (${facts.stay.length}): ${facts.stay.join(", ")}`);
    console.log(`  MOVED→speedtest (${facts.moved.length}): ${facts.moved.join(", ")}`);
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
