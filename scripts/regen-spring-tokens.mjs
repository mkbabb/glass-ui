#!/usr/bin/env node
// Regenerate the four `--spring-*` CSS tokens in `src/styles/tokens.css`
// from the SpringProgress solver published by `@mkbabb/keyframes.js`.
//
// Before this script landed (AL.W9-γ), the four tokens were hand-precomputed
// — there was no in-repo source of truth tying ζ=0.65 to the snappy stop list.
// Now the (response, dampingFraction) pairs are the source of truth and the
// `linear()` strings are derived: edit the PRESETS table below, re-run
// `node scripts/regen-spring-tokens.mjs`, commit.
//
// The script is idempotent — it locates the §2 EASING block in tokens.css by
// the spring-block marker comments and rewrites the four `--spring-*` lines
// in place. All other tokens are untouched.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { springLinearStops } from "@mkbabb/keyframes.js";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const tokensPath = resolve(root, "src/styles/tokens.css");

/**
 * iOS-canonical (response, dampingFraction) pairs for the four glass-ui
 * named springs. See `docs/audits/2026-05-26-AL-design-amend/X4-spring-engine.md`
 * §3 for the rationale. The names match speedtest CSS consumers (which
 * reach `var(--spring-smooth)` etc. directly), so they MUST stay stable
 * across regens — only the `(response, ζ)` and emitted stops change.
 */
const PRESETS = [
    {
        name: "smooth",
        response: 0.5,
        dampingFraction: 0.86,
        comment: "gentle settle, no overshoot",
    },
    {
        name: "snappy",
        response: 0.35,
        dampingFraction: 0.85,
        comment: "quick crisp, micro-overshoot",
    },
    {
        name: "bouncy",
        response: 0.5,
        dampingFraction: 0.65,
        comment: "emphatic overshoot ~7%",
    },
    {
        name: "gentle",
        response: 0.7,
        dampingFraction: 1.0,
        comment: "patient critically-damped",
    },
];

/**
 * 24 intermediate samples + 2 endpoints = 26 stops. Matches the sample
 * count used in keyframes.js's `springLinearStops` default; the curves
 * are stable past the first peak even at ζ=0.65 (the bouncy floor).
 */
const SAMPLE_COUNT = 24;

function generateBlock() {
    const lines = PRESETS.map((preset) => {
        const stops = springLinearStops({
            response: preset.response,
            dampingFraction: preset.dampingFraction,
            sampleCount: SAMPLE_COUNT,
        });
        return `    --spring-${preset.name}: ${stops};`;
    });
    return lines.join("\n");
}

const BLOCK_START_MARKER =
    "    /* ═══════════════════════════════════════════════\n       §2  EASING — Spring curves via linear()";
const SPRING_LINES_RE =
    /(    --spring-(?:smooth|snappy|bouncy|gentle): linear\([^)]+\);\n?)+/m;

function main() {
    const source = readFileSync(tokensPath, "utf8");
    if (!source.includes(BLOCK_START_MARKER)) {
        throw new Error(
            `Could not find §2 EASING block header in ${tokensPath}. ` +
                `Did the marker comment change?`,
        );
    }
    const block = generateBlock() + "\n";

    const next = source.replace(SPRING_LINES_RE, block);
    if (next === source) {
        throw new Error(
            `Spring-token replacement matched nothing — the existing ` +
                `--spring-* lines may have moved out of the §2 EASING block.`,
        );
    }
    writeFileSync(tokensPath, next);

    console.log(
        `regen-spring-tokens: rewrote ${PRESETS.length} --spring-* tokens in`,
        tokensPath,
    );
    for (const preset of PRESETS) {
        console.log(
            `  --spring-${preset.name}: response=${preset.response}s, ζ=${preset.dampingFraction} (${preset.comment})`,
        );
    }
}

main();
