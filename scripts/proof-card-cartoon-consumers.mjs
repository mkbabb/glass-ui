#!/usr/bin/env node
// AV.W4.C — the Card surface="cartoon" consumer-muster gate
// (proof:card-cartoon-consumers).
//
// The J-inv-10 ≥2-consumer bar for the `surface="cartoon"` path, made
// machine-readable. The dark-arm lift is token-adaptive BY CONSTRUCTION (the
// `cartoon-surface` utility reads only `var(--shadow-cartoon-{md,lg})`, which
// ride `color-mix(... var(--shadow-color) ...)`, and `--shadow-color →
// --foreground` flips under `.dark` — no hardcoded light literal leaks). This
// gate LOCKS that the path keeps ≥2 distinct consumer contexts so the
// decoration is not substrate-without-consumer.
//
// Each cited consumer must RESOLVE at HEAD (a path that does not exist FAILS).
// The detector + resolver shape mirrors proof-au-w9-consumers.mjs; the tally is
// docs/tranches/AV/audit/W4-cartoon-consumers.json.
//
// House style mirrors proof-dock-opacity-lockstep.mjs / proof-au-w9-consumers.mjs:
// ESM .mjs, a pure exported detector, a byte-stable JSON artefact via
// gate-output, a human summary, process.exit(1) on any violation.

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
        TALLY: resolve(ROOT, "docs/tranches/AV/audit/W4-cartoon-consumers.json"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_CARD_CARTOON_CONSUMERS_ARTIFACT",
            "AV-card-cartoon-consumers",
        ),
    };
    return _cliPaths;
}

/**
 * Make a resolver bound to ROOT. A consumer string resolves IFF the path
 * exists: absolute (cross-repo) checked as-is; relative (in-repo) resolved
 * against ROOT. Mirrors the proof:au-w9-consumers idiom.
 */
export function makeResolver(root) {
    return (consumer) =>
        existsSync(isAbsolute(consumer) ? consumer : resolve(root, consumer));
}

/**
 * The pure detector. Takes the parsed tally + a resolver, returns
 * {facts, violations}. Asserts the muster has ≥2 distinct consumer contexts
 * AND every cited consumer resolves at HEAD.
 */
export function detectCartoonConsumers(tally, resolves) {
    const violations = [];
    const consumers = Array.isArray(tally?.consumers) ? tally.consumers : [];
    const facts = { consumers: consumers.length, resolved: 0, distinct: 0 };

    if (!Array.isArray(tally?.consumers)) {
        violations.push("the tally has no `consumers` array");
        return { facts, violations };
    }

    const seenPaths = new Set();
    for (const c of consumers) {
        const path = typeof c === "string" ? c : c?.path;
        if (typeof path !== "string" || path.length === 0) {
            violations.push("a tally consumer has no string `path`");
            continue;
        }
        if (seenPaths.has(path)) {
            violations.push(`consumer '${path}' is declared more than once`);
        } else {
            seenPaths.add(path);
        }
        if (!resolves(path)) {
            violations.push(`consumer '${path}' does not resolve at HEAD`);
        } else {
            facts.resolved++;
        }
    }
    facts.distinct = seenPaths.size;

    // The bar: ≥2 DISTINCT resolving consumer contexts.
    if (facts.resolved < 2) {
        violations.push(
            `the surface="cartoon" path has ${facts.resolved} resolving consumer(s) (<2 — the J-inv-10 overfitting bar; the decoration would be substrate-without-consumer)`,
        );
    }

    facts.clean = violations.length === 0;
    return { facts, violations };
}

function run() {
    const { ROOT, TALLY, ARTIFACT } = cliPaths();
    const tally = JSON.parse(readFileSync(TALLY, "utf8"));
    const resolves = makeResolver(ROOT);
    const { facts, violations } = detectCartoonConsumers(tally, resolves);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:card-cartoon-consumers",
        facts,
        violations,
    });

    console.log(
        "proof:card-cartoon-consumers — the surface=cartoon ≥2-consumer muster (AV.W4)",
    );
    console.log(`  cited consumers       : ${facts.consumers}`);
    console.log(`  distinct paths        : ${facts.distinct}`);
    console.log(`  resolving at HEAD     : ${facts.resolved}`);
    console.log(`  ≥2-consumer bar clean : ${facts.clean ? "YES" : "NO"}`);
    if (violations.length > 0) {
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
