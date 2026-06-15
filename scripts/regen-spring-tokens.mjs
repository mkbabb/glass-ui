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
import { fileURLToPath, pathToFileURL } from "node:url";
import { springLinearStops } from "@mkbabb/keyframes.js";
// AY.W-MOTION2 — the (response, ζ) pairs are SINGLE-SOURCED in
// `src/composables/motion/springPresets.ts` so the CSS `linear()` strings here
// and the `MOTION_CURVES` JS twins both derive from ONE table (the
// no-second-authority discipline this header names). Node imports the `.ts`
// directly (native type-stripping); the table is pure value.js-free data.
import { SPRING_PRESETS } from "../src/composables/motion/springPresets.ts";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
// AY.W-CSS1 — tokens.css was carved into thin @import root + tokens/* partials;
// the §2 EASING `--spring-*` regen block now lives in tokens/scheme-motion.css.
// Both the regen WRITE and the sync gate READ target the partial.
export const tokensPath = resolve(root, "src/styles/tokens/scheme-motion.css");

/** The shared (response, ζ) table — re-exported so the sync gate keeps its import. */
export const PRESETS = SPRING_PRESETS;

/**
 * 48 intermediate samples + 2 endpoints = 50 stops.
 *
 * Raised from 24 in AM-W2-α: the Path A retune drops `bouncy` to ζ=0.45,
 * which produces a sharper/earlier/higher first peak (analytic overshoot
 * 1 + exp(-ζπ/√(1-ζ²)) = 1.20535 at ~13.8% progress). At SAMPLE_COUNT=24
 * the uniform 4%-apart grid straddles that peak and clips it to ~1.1833 —
 * under-representing the overshoot by ~2pp, a faithfulness defect (the
 * `linear()` must represent the solver, not a clipped approximation).
 *
 * At 48 samples (~2% grid) both retuned peaks land within their targets:
 * bouncy 1.2048 (≈analytic 1.2054) and snappy 1.0680 (≈analytic 1.0681) —
 * verified empirically against the keyframes.js solver. The old comment's
 * claim that 24 was "stable past the first peak even at the bouncy floor"
 * was true only for the old ζ=0.65 bouncy; it is stale under Path A.
 */
const SAMPLE_COUNT = 48;

export function generateBlock() {
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

// BA.W-GLASS-CAL Unit 3 — the per-spring DURATION clock.
//
// The `--spring-<name>` `linear()` curve is NORMALIZED to 0..1 and discards the
// spring's settle time, so every CSS consumer that pairs it with a generic
// `--duration-*` clock (0.2/0.3/0.45s) re-times EVERY spring to the same wall
// clock regardless of which spring — snappy (response 0.35s) and smooth (0.5s)
// both ran 300ms, so the crisp snappy register dragged a dead sub-pixel tail
// while the JS `SpringProgress` path (settles by physics) felt right (the R10-2
// read). `--spring-<name>-duration` re-derives the spring's OWN settle UNDER each
// register, GENERATED from the (response, ζ) pair alone — never a hand value.
//
// The metric is the analytic 2%-band SETTLING TIME of the underdamped envelope
// `exp(-ζωₙt)` (ωₙ = 2π/response, the iOS/Apple `response` convention): the
// moment the residual travel decays below 2% of unit span — the sub-pixel "dead
// tail" horizon the spec names. `t_s = -ln(0.02) / (ζ·ωₙ)`. This re-times the
// clock under each register WITHOUT touching the §6 register canon (which spring
// fits which job): snappy/dock land crisp (~0.28–0.34s, BELOW the generic 0.3s),
// smooth at its gentle settle (~0.36s), bouncy keeps its emphatic ring read
// (~0.69s), gentle patient (~0.44s). Rounded to the nearest 10ms (sub-perceptual).
const SETTLE_BAND = 0.02;

/** The generated 2%-band envelope-settle duration in seconds for one preset. */
export function springSettleDurationSeconds(preset) {
    const omegaN = (2 * Math.PI) / preset.response;
    const zeta = preset.dampingFraction;
    const ts = -Math.log(SETTLE_BAND) / (zeta * omegaN);
    // round to nearest 10ms, token-clean
    return Math.round((ts * 1000) / 10) * 10 / 1000;
}

export function generateDurationBlock() {
    const lines = PRESETS.map((preset) => {
        const sec = springSettleDurationSeconds(preset);
        return `    --spring-${preset.name}-duration: ${sec}s;`;
    });
    return lines.join("\n");
}

export const BLOCK_START_MARKER =
    "    /* ═══════════════════════════════════════════════\n       §2  EASING — Spring curves via linear()";
export const SPRING_LINES_RE =
    /(    --spring-(?:smooth|snappy|bouncy|gentle|dock): linear\([^)]+\);\n?)+/m;
// BA.W-GLASS-CAL Unit 3 — the per-spring DURATION block. A SEPARATE contiguous
// block (immediately after the `linear()` easing block) so SPRING_LINES_RE keeps
// matching only the easing lines; this regex owns the duration lines.
export const SPRING_DURATION_LINES_RE =
    /(    --spring-(?:smooth|snappy|bouncy|gentle|dock)-duration: [\d.]+s;\n?)+/m;

export function main() {
    const source = readFileSync(tokensPath, "utf8");
    if (!source.includes(BLOCK_START_MARKER)) {
        throw new Error(
            `Could not find §2 EASING block header in ${tokensPath}. ` +
                `Did the marker comment change?`,
        );
    }
    if (!SPRING_LINES_RE.test(source)) {
        throw new Error(
            `Spring-token block matched nothing — the existing ` +
                `--spring-* lines may have moved out of the §2 EASING block.`,
        );
    }
    if (!SPRING_DURATION_LINES_RE.test(source)) {
        throw new Error(
            `Spring-DURATION block matched nothing — the existing ` +
                `--spring-*-duration lines may have moved or are missing from the §2 EASING block.`,
        );
    }

    const block = generateBlock() + "\n";
    const durationBlock = generateDurationBlock() + "\n";
    // The replacements are idempotent when the PRESETS table is unchanged — a
    // no-op rewrite is correct (the regen is also a sync-verifier), so we do NOT
    // throw on `next === source`; the match-presence checks above are the guard.
    const next = source
        .replace(SPRING_LINES_RE, block)
        .replace(SPRING_DURATION_LINES_RE, durationBlock);

    writeFileSync(tokensPath, next);

    console.log(
        `regen-spring-tokens: rewrote ${PRESETS.length} --spring-* tokens + ${PRESETS.length} --spring-*-duration clocks in`,
        tokensPath,
    );
    for (const preset of PRESETS) {
        console.log(
            `  --spring-${preset.name}: response=${preset.response}s, ζ=${preset.dampingFraction}, settle=${springSettleDurationSeconds(preset)}s (${preset.comment})`,
        );
    }
}

// Run only when invoked directly (the sync gate imports `generateBlock` etc.).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
