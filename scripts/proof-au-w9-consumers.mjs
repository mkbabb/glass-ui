#!/usr/bin/env node
// AU.W9 — the W9-consumers overfitting-bar gate (proof:au-w9-consumers).
//
// The machine-checked overfitting discipline for the W9 lean-folds +
// slides-supply: each LANDED W9 FOLD (a prop / subpath / composable) maps to
// >=2 DISTINCT consumer contexts (repo/file/demo-story) OR carries a
// correctness/hygiene tag, and EVERY cited consumer RESOLVES at HEAD. BOOKed
// items are NOT tallied (their absent >=2 evidence must not false-green — the
// BOOK set lives in docs/tranches/AU/PROGRESS.md with named triggers).
//
// This is the same J-inv-10 ">=2 consumers XOR exported/tagged" bar the
// overfitting-audit precept enforces, made per-wave and machine-readable. The
// tally is docs/tranches/AU/audit/W9-consumers.json.
//
// The detector is PURE (detectConsumers(tally, resolves)); the resolver is
// injected so the gate is unit-testable and the resolution idiom (a path that
// exists at HEAD) mirrors proof:doc-consistency. In-repo consumer strings are
// relative to the glass-ui ROOT; cross-repo strings are absolute
// (/Users/mkbabb/Programming/<repo>/...). A cited path that does not resolve
// FAILS the gate.
//
// House style mirrors proof-dock-opacity-lockstep.mjs: ESM .mjs, a pure
// exported detector, a byte-stable JSON artefact via gate-output, a human
// summary, process.exit(1) on any violation.

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
        TALLY: resolve(ROOT, "docs/tranches/AU/audit/W9-consumers.json"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AU_W9_CONSUMERS_ARTIFACT", "AU-w9-consumers"),
    };
    return _cliPaths;
}

const VALID_TAGS = new Set(["correctness", "hygiene"]);

/**
 * Make a resolver bound to ROOT. A consumer string resolves IFF the path
 * exists: absolute paths (cross-repo) are checked as-is; relative paths
 * (in-repo) are resolved against ROOT. Mirrors the proof:doc-consistency
 * "cited path exists at HEAD" idiom.
 */
export function makeResolver(root) {
    return (consumer) =>
        existsSync(isAbsolute(consumer) ? consumer : resolve(root, consumer));
}

/**
 * The pure detector. Takes the parsed tally + a resolver, returns
 * {facts, violations}. For each item: assert consumers.length>=2 XOR a valid
 * tag (the overfitting bar); for each cited consumer, assert it resolves.
 */
export function detectConsumers(tally, resolves) {
    const violations = [];
    const items = Array.isArray(tally?.items) ? tally.items : [];
    const facts = { items: items.length, tagged: 0, barOnly: 0, consumersChecked: 0 };

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
        if (seenIds.has(id)) violations.push(`W9 item '${id}' is declared more than once`);
        seenIds.add(id);

        const consumers = Array.isArray(it.consumers) ? it.consumers : [];
        const hasBar = consumers.length >= 2;
        const hasTag = typeof it.tag === "string" && VALID_TAGS.has(it.tag);

        if (typeof it.tag === "string" && !VALID_TAGS.has(it.tag)) {
            violations.push(
                `W9 item '${id}' carries an unknown tag '${it.tag}' (must be correctness|hygiene)`,
            );
        }

        // The bar: >=2 consumers XOR a correctness/hygiene tag.
        if (!hasBar && !hasTag) {
            violations.push(
                `W9 item '${id}' has <2 consumers and no correctness/hygiene tag (the overfitting bar)`,
            );
        }
        if (hasTag) facts.tagged++;
        else if (hasBar) facts.barOnly++;

        // Every cited consumer must resolve at HEAD (whether or not a tag exists).
        for (const c of consumers) {
            facts.consumersChecked++;
            if (typeof c !== "string" || c.length === 0) {
                violations.push(`W9 item '${id}' has a non-string consumer entry`);
                continue;
            }
            if (!resolves(c)) {
                violations.push(`W9 item '${id}' cites consumer '${c}' that does not resolve at HEAD`);
            }
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
        command: "npm run proof:au-w9-consumers",
        facts,
        violations,
    });

    console.log("proof:au-w9-consumers — the W9 overfitting bar (AU.W9)");
    console.log(`  tally items           : ${facts.items}`);
    console.log(`  cleared via >=2 consumers : ${facts.barOnly}`);
    console.log(`  cleared via tag           : ${facts.tagged}`);
    console.log(`  consumer paths checked    : ${facts.consumersChecked}`);
    console.log(`  bar + resolution clean    : ${facts.clean ? "YES" : "NO"}`);
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
