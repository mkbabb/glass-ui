#!/usr/bin/env node
// AV.W14 — the spring-token build-pipeline sync gate (proof:spring-tokens-synced).
//
// `regen-spring-tokens.mjs` mutates `src/styles/tokens.css` in place, deriving
// the four `--spring-*` `linear()` stop-sets from the keyframes.js SpringProgress
// solver. It is NOT wired into `npm run build` (the build stays the two-arm
// `vite build` + `vue-tsc` emit-types per CLAUDE.md), so a dev who edits the
// PRESETS table but forgets to re-run the generator could ship a drifted token
// block. This gate is the orchestration guarantee: it runs the generator's pure
// `generateBlock()` to a buffer and diffs against the committed `--spring-*`
// block — fail-closed with a "run the generator + commit" message on any drift.
//
// bite-check: hand-edit one `--spring-*` value in tokens.css → RED; re-run
// `node scripts/regen-spring-tokens.mjs` + commit → green.

import { readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import {
    generateBlock,
    SPRING_LINES_RE,
    tokensPath,
} from "./regen-spring-tokens.mjs";

function cliPaths() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    return {
        ROOT,
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_SPRING_TOKENS_SYNCED_ARTIFACT",
            "AV-spring-tokens-synced",
        ),
    };
}

export function detect() {
    const source = readFileSync(tokensPath, "utf8");
    const committedMatch = source.match(SPRING_LINES_RE);
    const violations = [];

    if (!committedMatch) {
        violations.push(
            "the committed --spring-* block was not found in tokens.css — the §2 EASING marker / line shape moved",
        );
        return { violations, committed: null, generated: null };
    }

    // The committed block (verbatim) vs the generator output (+ a trailing
    // newline, matching regen-spring-tokens's `generateBlock() + "\n"`).
    const committed = committedMatch[0];
    const generated = generateBlock() + "\n";

    if (committed !== generated) {
        violations.push(
            "the committed --spring-* block is DRIFTED from the generator output — run `node scripts/regen-spring-tokens.mjs` and commit",
        );
    }

    return { violations, committed, generated };
}

function run() {
    const { ROOT, ARTIFACT } = cliPaths();
    const { violations, committed, generated } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    // First diverging line (for a human-actionable artefact, not the whole block).
    let firstDiff = null;
    if (committed && generated && committed !== generated) {
        const c = committed.split("\n");
        const g = generated.split("\n");
        for (let i = 0; i < Math.max(c.length, g.length); i++) {
            if (c[i] !== g[i]) {
                firstDiff = { line: i + 1, committed: c[i] ?? "", generated: g[i] ?? "" };
                break;
            }
        }
    }

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:spring-tokens-synced",
        facts: {
            tokensPath: relative(ROOT, tokensPath),
            synced: violations.length === 0,
            firstDiff,
        },
        violations,
    });

    console.log("proof:spring-tokens-synced — committed --spring-* block matches the generator (AV.W14)");
    console.log(`  tokens: ${relative(ROOT, tokensPath)}`);
    if (firstDiff) {
        console.log(`  first divergence at block line ${firstDiff.line}:`);
        console.log(`    committed: ${firstDiff.committed.slice(0, 80)}…`);
        console.log(`    generated: ${firstDiff.generated.slice(0, 80)}…`);
    }
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
