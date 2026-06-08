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

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
export const tokensPath = resolve(root, "src/styles/tokens.css");

/**
 * iOS-canonical (response, dampingFraction) pairs for the five glass-ui named
 * springs. See `docs/audits/2026-05-26-AL-design-amend/X4-spring-engine.md` §3
 * for the rationale. The names match speedtest CSS consumers (which reach
 * `var(--spring-smooth)` etc. directly), so they MUST stay stable across regens
 * — only the `(response, ζ)` and emitted stops change.
 *
 * GOVERNED iOS-SPRING VOCABULARY (AX.W05). This is the SINGLE source of the
 * register vocabulary — the legacy `--ease-apple-spring` cubic-bezier was a
 * second authority and is EXCISED. Each preset's `comment` names the
 * surface-class that rides it (the doc-table derives from this one table):
 *
 *   SETTLE  → --spring-smooth   — patient entrances, fades, scale-ins (no overshoot read).
 *   CONTROL → --spring-snappy   — crisp position morphs: tab underline glide,
 *                                 progress fill, the continuous-marker pop, the
 *                                 generic crisp settle. The SOTA restraint rule:
 *                                 structural UI morphs ride control, never bouncy.
 *   PLAYFUL → --spring-bouncy   — deliberate emphatic one-shots ONLY: the bouncy
 *                                 toggle press, dialog/success entrances, the VT
 *                                 default. The largest governed overshoot.
 *   GENTLE  → --spring-gentle   — critically-damped slow settles (the patient end
 *                                 of the ladder); reached via the --ease-spring-gentle
 *                                 @theme alias (a documented public register).
 *   DOCK    → --spring-dock     — the dock expand/collapse morph AND everything
 *                                 inside it: the in-dock keepDockOpen Slider thumb
 *                                 (--slider-thumb-spring defaults here) breathes on
 *                                 the SAME curve as the dock it lives in. W01 owns
 *                                 the curve; W05 governs the register around it.
 */
const PRESETS = [
    {
        name: "smooth",
        response: 0.5,
        dampingFraction: 0.86,
        comment: "SETTLE register — entrances/fades/scale-ins, no overshoot read",
    },
    {
        name: "snappy",
        response: 0.35,
        dampingFraction: 0.65,
        comment: "CONTROL register — crisp position morphs (tab underline, progress fill, marker pop), overshoot ~+6.8%",
    },
    {
        name: "bouncy",
        response: 0.5,
        dampingFraction: 0.45,
        comment: "PLAYFUL register — emphatic one-shots only (bouncy toggle, dialog/success entrance, VT default), overshoot ~+20.5%",
    },
    {
        name: "gentle",
        response: 0.7,
        dampingFraction: 1.0,
        comment: "GENTLE register — patient critically-damped settle, reached via the --ease-spring-gentle @theme alias",
    },
    {
        name: "dock",
        response: 0.32,
        dampingFraction: 0.7,
        comment: "DOCK register — dock expand/collapse morph + the in-dock Slider thumb, iOS-control settled, overshoot ~+4.6% (AW.W2 retune off the +18.5% playful register)",
    },
];

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

export const BLOCK_START_MARKER =
    "    /* ═══════════════════════════════════════════════\n       §2  EASING — Spring curves via linear()";
export const SPRING_LINES_RE =
    /(    --spring-(?:smooth|snappy|bouncy|gentle|dock): linear\([^)]+\);\n?)+/m;

export function main() {
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

// Run only when invoked directly (the sync gate imports `generateBlock` etc.).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
