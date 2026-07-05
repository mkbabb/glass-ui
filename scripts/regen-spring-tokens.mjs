#!/usr/bin/env node
// Regenerate the `--spring-*` CSS tokens in `src/styles/tokens.css` from the
// SpringProgress solver published by `@mkbabb/keyframes.js`.
//
// Before this script landed (AL.W9-γ), the tokens were hand-precomputed — there
// was no in-repo source of truth tying ζ to the snappy stop list. Now the
// (response, dampingFraction) pairs in `springPresets.ts` are the source of truth
// and the `linear()` strings are derived: edit the PRESETS table, re-run
// `node scripts/regen-spring-tokens.mjs`, commit. (BC.W-SPRING-EASE eased `snappy`
// + `bouncy` and minted the `press` row off that ONE table — the count is the
// table's length, never hardcoded.)
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
// BD.W-CUT then carved scheme-motion.css's §2 EASING block (the spring linear()
// curves + per-spring duration clocks + goo-flow curves + bezier cores/aliases)
// into the adjacent tokens/scheme-spring.css partial to hold the 500-line bound.
// The §2 EASING marker block + every `--spring-*` line moved there verbatim, so
// the regen WRITE and the sync gate READ both now target scheme-spring.css.
export const tokensPath = resolve(root, "src/styles/tokens/scheme-spring.css");

/** The shared (response, ζ) table — re-exported so the sync gate keeps its import. */
export const PRESETS = SPRING_PRESETS;

/**
 * 48 intermediate samples + 2 endpoints = 50 stops.
 *
 * Raised from 24 in AM-W2-α: a lower-ζ spring produces a sharper/earlier/higher
 * first peak, and a coarse uniform grid straddles + clips it (under-representing
 * the overshoot — a faithfulness defect, since the `linear()` must represent the
 * solver, not a clipped approximation). At 48 samples (~2% grid) the steepest
 * retuned peak (BC.W-SPRING-EASE `bouncy` ζ=0.55, analytic overshoot
 * 1 + exp(-ζπ/√(1-ζ²)) = 1.1263) lands within its target — verified empirically
 * against the keyframes.js solver. (The eased `snappy` ζ=0.78 + the minted `press`
 * ζ=0.86 are gentler still; 48 over-samples them comfortably.)
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

// BG.W-LIQUID-WEIGHT-DEFAULT (F5.2) — the interactive-spatial transition DEFAULT.
//
// `--transition-liquid-spatial` is the curve the base interactive-atom recipes
// (`.interactive-item` / `.tap-squish` / the `btn-interactive` @utility) read on their
// SPATIAL (scale/translate/rotate) leg, so weight is a property of the transition
// VOCABULARY — not a per-site `--motion-weight` checklist. It is spring-DERIVED: an
// alias to the canon interactive scale register (the §6 motion canon's ONE
// button/interactive scale spring). GENERATING it HERE records the "which spring is
// the interactive-spatial default" mapping in the ONE motion-token source (drift-proof,
// the exemplar pattern) — a hand-edit to some off-register value is restored on re-run.
// The `.motion-calm` opt-out (scheme-motion.css) + the PRM carve re-alias it to the
// no-overshoot bezier; the EFFECTS legs keep their own `--ease-standard` (P1 split).
export const INTERACTIVE_SPATIAL_SPRING = "smooth";

export function generateInteractiveSpatialBlock() {
    return `    --transition-liquid-spatial: var(--spring-${INTERACTIVE_SPATIAL_SPRING});`;
}

export const BLOCK_START_MARKER =
    "    /* ═══════════════════════════════════════════════\n       §2  EASING — Spring curves via linear()";
// The regex enumerates the SAME six names the PRESETS table carries — a name added to
// the table must be added here (the gen WRITE + the sync gate READ both anchor on this
// alternation). BG.W-SPRING-REGISTER-TIDY drained the three per-component `timeline-*`
// rows OUT of the global table (table→6, presets-in-consumers → ScrubberTimeline-local),
// so the dead `--spring-timeline-*` CSS twins die and the alternation narrows to the 6.
export const SPRING_LINES_RE =
    /(    --spring-(?:smooth|snappy|bouncy|gentle|dock|press): linear\([^)]+\);\n?)+/m;
// BA.W-GLASS-CAL Unit 3 — the per-spring DURATION block. A SEPARATE contiguous
// block (immediately after the `linear()` easing block) so SPRING_LINES_RE keeps
// matching only the easing lines; this regex owns the duration lines.
export const SPRING_DURATION_LINES_RE =
    /(    --spring-(?:smooth|snappy|bouncy|gentle|dock|press)-duration: [\d.]+s;\n?)+/m;
// BG.W-LIQUID-WEIGHT-DEFAULT (F5.2) — the ONE `--transition-liquid-spatial` line the
// gen WRITE + the drift-check READ both anchor on. It resolves to a `--spring-*`
// register (the interactive-spatial default is a spring alias — the gate asserts it is
// never a bare `--ease-*` bezier).
export const INTERACTIVE_SPATIAL_LINE_RE =
    /    --transition-liquid-spatial: var\(--spring-[a-z]+\);\n?/m;

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
    if (!INTERACTIVE_SPATIAL_LINE_RE.test(source)) {
        throw new Error(
            `--transition-liquid-spatial line matched nothing — the interactive-spatial ` +
                `default (BG.W-LIQUID-WEIGHT-DEFAULT) may have moved or is missing from scheme-spring.css.`,
        );
    }

    const block = generateBlock() + "\n";
    const durationBlock = generateDurationBlock() + "\n";
    const interactiveSpatialBlock = generateInteractiveSpatialBlock() + "\n";
    // The replacements are idempotent when the PRESETS table is unchanged — a
    // no-op rewrite is correct (the regen is also a sync-verifier), so we do NOT
    // throw on `next === source`; the match-presence checks above are the guard.
    const next = source
        .replace(SPRING_LINES_RE, block)
        .replace(SPRING_DURATION_LINES_RE, durationBlock)
        .replace(INTERACTIVE_SPATIAL_LINE_RE, interactiveSpatialBlock);

    writeFileSync(tokensPath, next);

    console.log(
        `regen-spring-tokens: rewrote ${PRESETS.length} --spring-* tokens + ${PRESETS.length} --spring-*-duration clocks + the --transition-liquid-spatial default in`,
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
