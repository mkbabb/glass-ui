#!/usr/bin/env node
// AV.W3 — the motion-composables consumer gate (proof:motion-composables-consumer).
//
// Each NEW motion composable lifted in W3 (`useCountup`, `vReveal`) must tally
// >=2 RESOLVING-at-HEAD in-repo consumers (the demo route + the test) so the
// lift is not overfit substrate. The slides DeckNav fork is the EVENTUAL
// cross-repo consumer (G.W1, post-publish): it is listed under `pending` and
// does NOT count toward >=2 until it resolves — mirrors proof:au-w9-consumers's
// "every cited consumer resolves at HEAD" rule (a pending cross-repo path must
// not false-green the in-repo >=2 bar).
//
// House style mirrors proof-au-w9-consumers.mjs: ESM .mjs, a pure exported
// detector (detectConsumers(tally, resolves)), an injected path-resolver, a
// byte-stable JSON artefact via gate-output, process.exit(1) on any violation.
//
// Bite: drop `demo/stories/motion/countup.vue` (or the test) from a tally item
// → that item falls under 2 resolving consumers → RED.

import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        TALLY: resolve(ROOT, "docs/tranches/AV/audit/W3-motion-consumers.json"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_AV_W3_MOTION_CONSUMERS_ARTIFACT",
            "AV-w3-motion-consumers",
        ),
    };
    return _cliPaths;
}

/**
 * Make a resolver bound to ROOT. A consumer string resolves IFF the path
 * exists: absolute paths (cross-repo) are checked as-is; relative paths
 * (in-repo) are resolved against ROOT.
 */
export function makeResolver(root) {
    return (consumer) =>
        existsSync(isAbsolute(consumer) ? consumer : resolve(root, consumer));
}

/**
 * The pure detector. For each item: assert >=2 RESOLVING in-repo `consumers`
 * (every cited counted consumer must resolve at HEAD); `pending` entries are
 * NOT counted and NOT required to resolve (the eventual cross-repo fork).
 */
export function detectConsumers(tally, resolves) {
    const violations = [];
    const items = Array.isArray(tally?.items) ? tally.items : [];
    const facts = { items: items.length, consumersChecked: 0, pendingListed: 0 };

    if (!Array.isArray(tally?.items)) {
        violations.push("the tally has no `items` array");
        return { facts, violations };
    }

    const seenIds = new Set();
    for (const it of items) {
        const id = it?.id;
        if (typeof id !== "string" || id.length === 0) {
            violations.push("a tally item has no string `id`");
            continue;
        }
        if (seenIds.has(id)) violations.push(`item '${id}' is declared more than once`);
        seenIds.add(id);

        const consumers = Array.isArray(it.consumers) ? it.consumers : [];
        const pending = Array.isArray(it.pending) ? it.pending : [];
        facts.pendingListed += pending.length;

        // Every counted consumer must resolve at HEAD.
        let resolving = 0;
        for (const c of consumers) {
            facts.consumersChecked++;
            if (typeof c !== "string" || c.length === 0) {
                violations.push(`item '${id}' has a non-string consumer entry`);
                continue;
            }
            if (resolves(c)) resolving++;
            else
                violations.push(
                    `item '${id}' cites consumer '${c}' that does not resolve at HEAD`,
                );
        }

        // The >=2 bar is over RESOLVING in-repo consumers (pending is excluded).
        if (resolving < 2) {
            violations.push(
                `item '${id}' has ${resolving} resolving consumer(s) — needs >=2 (pending cross-repo forks do not count)`,
            );
        }
    }

    facts.clean = violations.length === 0;
    return { facts, violations };
}

function run() {
    const { ROOT, TALLY, ARTIFACT } = cliPaths();
    const tally = JSON.parse(readFileSync(TALLY, "utf8"));
    const resolves = makeResolver(ROOT);
    const { facts, violations } = detectConsumers(tally, resolves);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:motion-composables-consumer",
        facts,
        violations,
    });

    console.log("proof:motion-composables-consumer — the W3 motion-lift consumer bar (AV.W3)");
    console.log(`  tally items            : ${facts.items}`);
    console.log(`  consumer paths checked : ${facts.consumersChecked}`);
    console.log(`  pending (not counted)  : ${facts.pendingListed}`);
    console.log(`  bar + resolution clean : ${facts.clean ? "YES" : "NO"}`);
    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
