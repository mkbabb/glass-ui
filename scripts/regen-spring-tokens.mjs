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
// AY.W-MOTION2 — the (response, ζ) pairs are SINGLE-SOURCED in
// `src/composables/motion/springPresets.ts` so the CSS `linear()` strings here
// and the `MOTION_CURVES` JS twins both derive from ONE table (the
// no-second-authority discipline this header names). Node imports the `.ts`
// directly (native type-stripping); the table is pure value.js-free data.
import { SPRING_PRESETS } from "../src/composables/motion/springPresets.ts";
import {
    springProjection,
    springSettleDurationSeconds,
} from "../src/composables/motion/springProjection.ts";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
// AY.W-CSS1 — tokens.css was carved into thin @import root + tokens/* partials;
// BD.W-CUT then carved scheme-motion.css's §2 EASING block (the spring linear()
// curves + per-spring duration clocks + goo-flow curves + bezier cores/aliases)
// into the adjacent tokens/scheme-spring.css partial to hold the 500-line bound.
// The §2 EASING marker block + every `--spring-*` line moved there verbatim, so
// the regen WRITE and the sync gate READ both now target scheme-spring.css.
export const tokensPath = resolve(root, "src/styles/tokens/scheme-spring.css");

/** The shared (response, ζ) table — re-exported so the sync gate keeps its import. */
export const PRESETS = SPRING_PRESETS;

export function generateBlock() {
    const lines = PRESETS.map((preset) => {
        // BI.W-SPRING-PARITY (FAM-18/M1) — the linear() sample horizon MUST equal
        // the paired `--spring-<name>-duration` clock (the SAME 2%-settle seconds),
        // or the CSS `transition` replays a curve normalized over the wrong span.
        // Default `maxDuration` is `4 × response` (~1.9s for snappy) while the
        // duration token is the ~0.4s settle — a ~4.8× mismatch that front-loads
        // the whole trajectory into the first ~10–16% of the clock (the measured
        // ~5× CSS-vs-JS t90 compression). Passing the settle seconds here re-times
        // the curve so CSS_t90 == JS SpringProgress t90 (<1ms, all presets).
        const { stops } = springProjection(preset);
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
// The metric is the 2%-band SETTLING TIME — the moment the residual travel decays
// below 2% of unit span and STAYS there (the sub-pixel "dead tail" horizon the spec
// names). BI.W-SPRING-PARITY (FAM-18/M1, RV-c rider) — this is the TRUE NUMERIC
// settle (tick the SpringProgress step response until |1−x| last exits ±2%), NOT the
// analytic underdamped-envelope approximation `-ln(0.02)/(ζ·ωₙ)`. Two reasons the
// numeric metric is load-bearing now:
//   1. It is the horizon `generateBlock()` feeds `springLinearStops` as `maxDuration`,
//      so the linear() curve and this clock share ONE span — the parity fix.
//   2. The analytic envelope formula UNDERESTIMATES near-critical/critical ζ (gentle
//      ζ=1.0 carries the (1+ωₙt)e^(−ωₙt) polynomial tail the pure exponential misses):
//      analytic gentle 0.51s vs numeric 0.76s. Sampling the linear() over the short
//      analytic span left gentle's penultimate stop at 0.895 → a visible 10.5% endpoint
//      snap; the numeric span lands it at ~0.978 (sub-perceptual, inside the 2% band).
// Rounded to the nearest 10ms (sub-perceptual, token-clean).
// BI.W-TEMPO — the `-settle`/reader SPLIT (M11). The raw analytic 2%-settle is
// emitted under the RENAMED INTERNAL token `--spring-<name>-settle`; the PUBLIC name
// `--spring-<name>-duration` is preserved as a generated READER that co-scales it by
// the global `--motion-tempo` axis: `duration: calc(var(--<name>-settle) *
// var(--motion-tempo))`. So all ~30 consumer sites + the `--tab-indicator-duration` /
// `--dock-motion-resize` aliases inherit tempo with ZERO edits (the G4 round-trip —
// NOT a clean-break rename; the public name stays the reader, `-settle` is internal).
// At the `--motion-tempo: 1` identity default the reader resolves `settle * 1`,
// byte-identical to the prior flat `-duration` value (the no-op-at-rest floor).
export function generateDurationBlock() {
    const settleLines = PRESETS.map((preset) => {
        const sec = springSettleDurationSeconds(preset);
        return `    --spring-${preset.name}-settle: ${sec}s;`;
    });
    const readerLines = PRESETS.map(
        (preset) =>
            `    --spring-${preset.name}-duration: calc(var(--spring-${preset.name}-settle) * var(--motion-tempo));`,
    );
    return [...settleLines, ...readerLines].join("\n");
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
// BI.W-REGISTER-TABLE — the `transient` (0.62, 0.90) enter-transient register joins
// the six-name alternation (the Toast + Notification CENTER-SEED bloom, MOTION-LADDER
// M5). BI.W-TABS-FACTOR — the `eyeglass` (0.36, 0.64) iOS-27 tab-pill LOUPE register
// joins it too (ratified judgment (e), POST-M1). A name added to the PRESETS table must
// be added to BOTH alternations here (the gen WRITE + the sync gate READ both anchor on
// them).
export const SPRING_LINES_RE =
    /(    --spring-(?:smooth|snappy|bouncy|gentle|dock|press|transient|eyeglass): linear\([^)]+\);\n?)+/m;
// BA.W-GLASS-CAL Unit 3 · BI.W-TEMPO — the per-spring DURATION block. A SEPARATE
// contiguous block (immediately after the `linear()` easing block) so SPRING_LINES_RE
// keeps matching only the easing lines; this regex owns BOTH the raw `-settle` lines
// AND the `-duration: calc(…)` reader lines (the BI.W-TEMPO split). The value clause
// is `[^;\n]+` so it matches a flat `0.35s` (pre-split) OR a `calc(…)` reader (post-
// split) — the one-time conversion + idempotent re-runs both match.
export const SPRING_DURATION_LINES_RE =
    /(    --spring-(?:smooth|snappy|bouncy|gentle|dock|press|transient|eyeglass)-(?:settle|duration): [^;\n]+;\n?)+/m;
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
        `regen-spring-tokens: rewrote ${PRESETS.length} --spring-* curves + ${PRESETS.length} --spring-*-settle clocks + ${PRESETS.length} tempo-scaled --spring-*-duration readers + the --transition-liquid-spatial default in`,
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
