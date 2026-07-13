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
// BI.W-SPRING-PARITY (FAM-18/M1) — the tempo-parity clause integrates the physical
// SpringProgress step response (JS_t90) and, in its self-test bite, re-samples a
// synthetic curve WITH vs WITHOUT `maxDuration` to prove the parity teeth are real.
import { SpringProgress, springLinearStops } from "@mkbabb/keyframes.js";
import {
    generateBlock,
    PRESETS,
    springSettleDurationSeconds,
    SPRING_LINES_RE,
    tokensPath,
} from "./regen-spring-tokens.mjs";
// AY.W-CSS1 — tokens.css carved into thin @import root + tokens/* partials. The
// `--spring-*` regen block lives in tokens/scheme-motion.css (regen `tokensPath`);
// the dock-spring (0.32, 0.7) prose lives in tokens/scale-paper.css. The
// comment-scan reads the FULL monolith so both are in scope.
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT_DIR = resolve(fileURLToPath(new URL("../", import.meta.url)));
// AY.W-COLOCATE (D3 cont.) — the CANONICAL DOCK_SPRING authority moved to the dock
// feature-dir constants home, `dock/constants.ts` (the colocation convention: the
// magic-number config lives in `constants.ts`, imported by BOTH the orchestrator
// `dockMorphContext.ts` AND the `useLayerTransition.ts` engine — no per-composable
// copy). The gate reads it THERE: a dev retuning the shipped morph spring touches
// ONE file, and the gate witnesses the real authority (not a vestigial proxy — the
// dead-witness class this lane closed first at useLayerTransition.ts, then here).
const DOCK_MORPH_CONTEXT_TS = resolve(
    ROOT_DIR,
    "src/components/custom/dock/constants.ts",
);

// BG.W-SPRING-REGISTER-TIDY — the single-source table + the ScrubberTimeline-LOCAL home.
const SPRING_PRESETS_TS = resolve(ROOT_DIR, "src/composables/motion/springPresets.ts");
const SCRUBBER_TIMELINE_VUE = resolve(
    ROOT_DIR,
    "src/components/custom/timeline/ScrubberTimeline.vue",
);
// The global register vocabulary is the canonical SEVEN (the six BD.W-ANIM-IOS27-TUNE
// registers + the BI.W-REGISTER-TABLE `transient` enter-transient row, a legitimate
// global register with ≥2 consumers: Toast + Notification via `--enter-transient-*`);
// the 3 per-component ScrubberTimeline registers (head/fill/press) still live
// per-component, NOT in the table. This bound catches per-component sprawl (the
// RETIRED_TIMELINE_NAMES) + any regrowth past the canonical count — a NEW global
// register bumps this count with its ≥2-consumer justification, never a silent add.
const CANONICAL_SPRING_COUNT = 7;
const RETIRED_TIMELINE_NAMES = ["timeline-head", "timeline-fill", "timeline-press"];

// BD.W-ANIM-IOS27-TUNE — the dock-spring const the band assert checks. Mirrors
// DOCK_SPRING in dock/constants.ts + the `dock` PRESETS row. RE-CALIBRATED to the
// iOS-27 weighty-gooey-inertial pole (0.68, 0.64) — slow inertial mass, a graceful
// un-pointed +7.3% settle (the "MORPH MORE on move" reference; the prior BD-interim
// (0.56, 0.58) pointed +11% retired below the ≤10% ceiling). DOCK_SPRING reads
// `springPreset("dock")` (the no-second-authority fence — ONE table row, the const
// derives), so the gate reads the (response, ζ) off the PRESETS row.
const DOCK_RESPONSE = 0.68;
const DOCK_DAMPING = 0.64;

// Analytic underdamped overshoot fraction: exp(-ζπ/√(1-ζ²)). For (response 0.32,
// ζ 0.7) → ~0.046 (≈+4.6%). The comment-match assert checks each quoted number is
// consistent with the const within tolerance.
function analyticOvershoot(zeta) {
    if (zeta >= 1) return 0;
    return Math.exp((-zeta * Math.PI) / Math.sqrt(1 - zeta * zeta));
}

function cliPaths() {
    return {
        ROOT: ROOT_DIR,
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_SPRING_TOKENS_SYNCED_ARTIFACT",
            "AV-spring-tokens-synced",
        ),
    };
}

// ── AW.W2 BAND assert — DOCK_SPRING and the `dock` PRESETS row carry the SAME
// (response, ζ) inside the iOS-control band, with the derived overshoot in range.
export function detectBand() {
    const violations = [];
    const facts = {};

    // AY.W-COLOCATE (D3 cont.) — the const in the CANONICAL `dock/constants.ts` (the
    // colocation home both the orchestrator AND `useLayerTransition.ts` import), NOT
    // a per-composable copy.
    // BD.W-DOCK-CORE — the no-second-authority fence: DOCK_SPRING now DERIVES from the
    // SPRING_PRESETS `dock` row via `springPreset("dock")` (a single source — the regen
    // CSS token, the JS twin, AND the dock const all flow from ONE table row). Accept
    // BOTH the new derive form AND the legacy literal form (back-compat for the gate).
    const morphSrc = readFileSync(DOCK_MORPH_CONTEXT_TS, "utf8");
    const literalMatch = morphSrc.match(
        /DOCK_SPRING\s*=\s*\{\s*response:\s*([\d.]+),\s*dampingFraction:\s*([\d.]+)/,
    );
    const deriveMatch =
        /DOCK_SPRING\s*=\s*\{[\s\S]{0,200}?springPreset\(\s*["']dock["']\s*\)\.response[\s\S]{0,120}?springPreset\(\s*["']dock["']\s*\)\.dampingFraction/.test(
            morphSrc,
        );
    if (!literalMatch && !deriveMatch) {
        violations.push(
            "dock/constants.ts: the `DOCK_SPRING` const was not found as either a literal `{ response, dampingFraction }` OR the `springPreset(\"dock\")` derive form (the canonical dock-spring authority)",
        );
        return { facts, violations };
    }

    // AY.W-MOTION2 — the `dock` SPRING_PRESETS row lives in the SINGLE-SOURCE module
    // `src/composables/motion/springPresets.ts` (the regen script, the MOTION_CURVES JS
    // twins, AND now the DOCK_SPRING derive all import it). The gate reads it there.
    const presetsSrc = readFileSync(
        resolve(ROOT_DIR, "src/composables/motion/springPresets.ts"),
        "utf8",
    );
    const presetMatch = presetsSrc.match(
        /name:\s*"dock",\s*response:\s*([\d.]+),\s*dampingFraction:\s*([\d.]+)/,
    );
    if (!presetMatch) {
        violations.push(
            "springPresets.ts: the `dock` SPRING_PRESETS row (response, dampingFraction) was not found",
        );
        return { facts, violations };
    }
    const presetResponse = Number.parseFloat(presetMatch[1]);
    const presetDamping = Number.parseFloat(presetMatch[2]);
    facts.presetResponse = presetResponse;
    facts.presetDamping = presetDamping;

    // The const's effective (response, ζ): the literal numbers if present, else the
    // PRESETS row (the derive form reads it transitively — ONE authority).
    const constResponse = literalMatch
        ? Number.parseFloat(literalMatch[1])
        : presetResponse;
    const constDamping = literalMatch
        ? Number.parseFloat(literalMatch[2])
        : presetDamping;
    facts.constResponse = constResponse;
    facts.constDamping = constDamping;
    facts.derivesFromTable = deriveMatch && !literalMatch;

    // SAME (response, ζ) across the const + the PRESETS row (trivially true on the
    // derive form; a literal that drifts from the row still reds).
    if (constResponse !== presetResponse || constDamping !== presetDamping) {
        violations.push(
            `DOCK_SPRING (${constResponse}, ${constDamping}) and the dock PRESETS row (${presetResponse}, ${presetDamping}) carry DIFFERENT (response, ζ) — the CSS token and the JS driver would drift`,
        );
    }

    // BD.W-ANIM-IOS27-TUNE — the iOS-27 weighty-gooey-inertial dock band: response ∈
    // [0.62, 0.74], ζ ∈ [0.58, 0.68], overshoot ∈ [0.05, 0.10]. (The (0.68, 0.64) curve
    // sits at overshoot ~0.073 (≈+7.3%) — the slow inertial mass with a graceful
    // un-pointed settle, BELOW the universal ≤10% ceiling. The band brackets the new
    // pole — a regression to the BD-interim tight (0.56, 0.58) pointed +11% breaches the
    // 0.10 ceiling, the prior (0.32, 0.7) near-critical snap +4.6% falls BELOW the 0.05
    // floor.)
    const overshoot = analyticOvershoot(constDamping);
    facts.derivedOvershoot = Math.round(overshoot * 10000) / 10000;
    // BI SU3 RECONCILE (judgment (a), user-delegated + orchestrator-ratified 2026-07-12):
    // the BD-era "weighty band" clamps ([0.62,0.74]/[0.58,0.68]/overshoot [0.05,0.10])
    // were VALUE bindings — exactly the class the SU3 ruling forbids (the gate binds the
    // MECHANISM, never a taste value; the value was re-ratified to the measured-iOS band
    // 0.30/z0.82 at the BI cut). The surviving asserts are the PHYSICAL floor (a spring
    // must be a spring) + the <=10% overshoot CEILING (the one recorded hard bound — a
    // dock that visibly rings past 10% is a defect in ANY register, not a taste choice).
    if (!(constResponse > 0 && constResponse <= 1.5)) {
        violations.push(
            `DOCK_SPRING response ${constResponse} is outside the physical floor (0, 1.5] — not a plausible dock spring`,
        );
    }
    if (!(constDamping > 0 && constDamping < 1)) {
        violations.push(
            `DOCK_SPRING ζ ${constDamping} is outside (0, 1) — the dock register is an underdamped spring by design`,
        );
    }
    if (overshoot > 0.1) {
        violations.push(
            `the derived overshoot exp(-ζπ/√(1-ζ²))=${facts.derivedOvershoot} exceeds the 10% hard ceiling (the recorded box-morph bound)`,
        );
    }

    return { facts, violations };
}

// ── AW.W2 COMMENT-MATCH assert — every quoted (response, ζ) / overshoot number
// in the dock-spring doc comments matches the const. AY.W-DOCK2 (D3) — the
// canonical authority moved to dockMorphContext.ts (the orchestrator jsdoc + the
// DOCK_SPRING const note), with tokens.css (the §2 EASING dock row + the
// --dock-resize-spring triple). The born-RED witness on HEAD was the stale
// `(0.5, 0.5)` / `+18.5%` text.
// BD.W-ANIM-IOS27-TUNE — the iOS-27 re-calibration makes the prior tight (0.32, 0.7)
// AND the BD-interim (0.56, 0.58) numbers the stale ones (a non-retrospective mention
// would be a doc that fell behind the landed curve). The +4.6%/+11% overshoot text is
// likewise stale (now ~+7.3%).
const STALE_PATTERNS = [
    { re: /response\s+0\.32\b/i, label: "response 0.32 (stale — should be 0.68)" },
    { re: /\(0\.32,\s*0\.7\)/, label: "(0.32, 0.7) (stale — should be (0.68, 0.64))" },
    { re: /\(0\.56,\s*0\.58\)/, label: "(0.56, 0.58) (stale — should be (0.68, 0.64))" },
    { re: /\+4\.6%/, label: "+4.6% overshoot (stale — should be ~+7.3%)" },
    { re: /\+18\.5%/, label: "+18.5% overshoot (stale — should be ~+7.3%)" },
];

// Lines that legitimately reference the OLD register as history ("off the prior
// +18.5% register") are allowed — they are explicitly retrospective. The assert
// flags a stale number only when it is NOT inside such a retrospective clause.
function isRetrospective(line) {
    return /prior|off the|was:|retune|playful|historical|former|previously|retired|near-critical|stale/i.test(
        line,
    );
}

export function detectComments() {
    const violations = [];
    const facts = { staleHits: [] };

    // The tokens target reads the FULL carved monolith (root + partials), not
    // just the regen partial, so the dock-spring prose in tokens/scale-paper.css
    // is in scope. `monolith: "tokens"` routes through readMonolith.
    const targets = [
        { path: DOCK_MORPH_CONTEXT_TS, label: "dock/constants.ts" },
        { monolith: "tokens", label: "tokens.css" },
    ];

    const readTarget = (t) =>
        t.monolith ? readMonolith(ROOT_DIR, t.monolith) : readFileSync(t.path, "utf8");

    for (const t of targets) {
        const { label } = t;
        const src = readTarget(t);
        const lines = src.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (isRetrospective(line)) continue;
            for (const { re, label: what } of STALE_PATTERNS) {
                if (re.test(line)) {
                    const hit = `${label}:${i + 1} — ${what}: "${line.trim().slice(0, 80)}"`;
                    facts.staleHits.push(hit);
                    violations.push(
                        `stale dock-spring doc-comment number — ${hit}`,
                    );
                }
            }
        }
    }

    // BD.W-ANIM-IOS27-TUNE — positive confirmation: the canonical (0.68, 0.64) appears
    // in the springPresets.ts dock row (so the table was actually updated, not just
    // emptied). The dock const DERIVES from it (no re-type in constants.ts); the tokens
    // prose carries the emitted curve. Check the presets row carries the new numbers.
    const presetsSrcCheck = readFileSync(
        resolve(ROOT_DIR, "src/composables/motion/springPresets.ts"),
        "utf8",
    );
    if (!/0\.68/.test(presetsSrcCheck) || !/0\.64/.test(presetsSrcCheck)) {
        violations.push(
            `springPresets.ts: the canonical dock-spring numbers (0.68, 0.64) are not both present in the dock PRESETS row — the table was not updated to the iOS-27 weighty curve`,
        );
    }
    // Legacy back-compat: if a target STILL carries the old (0.32, 0.7) prose (the
    // tokens monolith may not), skip the old positive check (it is now the stale form).
    for (const t of []) {
        const { label } = t;
        const src = readTarget(t);
        if (!/0\.32/.test(src) || !/0\.7\b/.test(src)) {
            violations.push(
                `${label}: the canonical dock-spring numbers (0.32, 0.7) are not both present — the doc comments were not updated to the landed curve`,
            );
        }
    }

    return { facts, violations };
}

// ── BG.W-SPRING-REGISTER-TIDY — the register-sprawl drain (born-RED on HEAD's 9-row
//    table + the 6 dead --spring-timeline-* CSS twins → GREEN once the 3 per-component
//    registers move to the ScrubberTimeline-LOCAL map). A PURE detector so the self-test
//    can inject synthetic states (a re-added timeline row / a re-added CSS twin / a
//    vanished local map) and assert each FLAGS — the teeth-are-real discipline.
export function detectRegisterTidy({ presetsSrc, css, scrubberSrc }) {
    const violations = [];
    const facts = {};

    // (a) the global SPRING_PRESETS table drained to the canonical SIX — no `timeline-*`
    //     ROW survives, no `timeline-*` member in the SpringPresetName TYPE union, and
    //     the table carries exactly the canonical count (not 9).
    const rowNames = [...presetsSrc.matchAll(/name:\s*"([a-z-]+)"/g)].map((m) => m[1]);
    facts.presetRowNames = rowNames;
    const strayRows = rowNames.filter((n) => RETIRED_TIMELINE_NAMES.includes(n));
    if (strayRows.length) {
        violations.push(
            `springPresets.ts: the global SPRING_PRESETS table still carries the per-component register row(s) [${strayRows.join(", ")}] — they MOVE to the ScrubberTimeline-LOCAL map (BG.W-SPRING-REGISTER-TIDY, table→${CANONICAL_SPRING_COUNT})`,
        );
    }
    if (/\|\s*"timeline-(?:head|fill|press)"/.test(presetsSrc)) {
        violations.push(
            "springPresets.ts: the SpringPresetName type union still NAMES a `timeline-*` member — the per-component register is drained off the global vocabulary",
        );
    }
    const rowCount = [...presetsSrc.matchAll(/dampingFraction:\s*[0-9]/g)].length;
    facts.globalRowCount = rowCount;
    if (rowCount > CANONICAL_SPRING_COUNT) {
        violations.push(
            `springPresets.ts: the global SPRING_PRESETS table has ${rowCount} rows (>${CANONICAL_SPRING_COUNT}) — it must drain back to the canonical ${CANONICAL_SPRING_COUNT} (per-component registers live per-component)`,
        );
    }

    // (b) the dead `--spring-timeline-*` CSS twins die — no `linear()` curve, no
    //     `-duration` clock (the JS half holds the (response, ζ); no CSS var() reader).
    const twins = [
        ...new Set([...css.matchAll(/--spring-timeline-[a-z-]+/g)].map((m) => m[0])),
    ];
    facts.deadTimelineTwins = twins;
    if (twins.length) {
        violations.push(
            `scheme-spring.css: ${twins.length} dead --spring-timeline-* CSS twin(s) survive [${twins.join(", ")}] — no CSS var() consumer reads them; the regen dropped them at table→${CANONICAL_SPRING_COUNT}`,
        );
    }

    // (c) the values MOVED, they did not vanish — the ScrubberTimeline-LOCAL map holds
    //     the 3 per-primitive spring defaults (the no-motion-delta bar) and NO LONGER
    //     re-sources them off the retired global rows.
    const hasLocalMap =
        /HEAD_SPRING\s*=\s*\{[^}]*response/.test(scrubberSrc) &&
        /FILL_SPRING\s*=\s*\{[^}]*response/.test(scrubberSrc) &&
        /PRESS_SPRING\s*=\s*\{[^}]*response/.test(scrubberSrc);
    facts.scrubberLocalMap = hasLocalMap;
    if (!hasLocalMap) {
        violations.push(
            "ScrubberTimeline.vue: the 3 per-component timeline spring defaults (HEAD/FILL/PRESS_SPRING) are not the LOCAL presets-in-consumers home — the values must MOVE here as local (response, ζ) literals, not vanish (no-motion-delta)",
        );
    }
    if (/springPreset\(\s*["']timeline-/.test(scrubberSrc)) {
        violations.push(
            "ScrubberTimeline.vue: still reads springPreset(\"timeline-*\") — the global row is retired; read the LOCAL map",
        );
    }

    return { violations, facts };
}

function detectRegisterTidyReal() {
    return detectRegisterTidy({
        presetsSrc: readFileSync(SPRING_PRESETS_TS, "utf8"),
        css: readFileSync(tokensPath, "utf8"),
        scrubberSrc: readFileSync(SCRUBBER_TIMELINE_VUE, "utf8"),
    });
}

// ── BI.W-SPRING-PARITY (FAM-18/M1) — the TEMPO-PARITY clause. ─────────────────
// Every CSS `transition` REPLAYS the emitted `--spring-<name>` linear() curve over
// the paired `--spring-<name>-duration` clock. If the curve was SAMPLED over a
// different horizon than that clock, the whole trajectory is compressed/stretched:
// HEAD sampled the curve over `springLinearStops`'s default `maxDuration = 4×response`
// (~1.9s for snappy) while the clock is the ~0.4s settle — a ~4.8× mismatch that
// front-loads the motion into the first ~10–16% of the clock (a ~50ms pop + a dead
// tail). This clause derives CSS_t90 (the time the SHIPPED linear() × its duration
// reaches 90% travel) and JS_t90 (the physical SpringProgress step response's 90%
// travel time) and asserts they agree within a small per-preset band. HEAD ships the
// compression → 6/6 flag (born-RED). At the parity fix (`maxDuration` == the settle
// clock) the two horizons are ONE, so CSS_t90 == JS_t90 by construction → 0/6.
//
// The three pre-existing arms (the committed-vs-generated drift, the AW.W2 dock BAND,
// and the register-tidy drain) are all tempo-BLIND (FAM-18-RV-b) — they compare token
// SHAPE, never the replayed trajectory. This clause is the ONLY guard on tempo.
const TEMPO_PARITY_BAND_MS = 25; // the fix lands all six ≤0.1ms; HEAD misses by 76–428ms
const TEMPO_RISE_LEVEL = 0.9; // the 90%-travel rise-time (t90) — the standard tempo landmark
const TEMPO_RISE_MAX_SECONDS = 5; // loop cap (all six presets cross 0.9 well under 0.8s)
const TEMPO_RISE_DT = 0.0002; // 0.2ms — sub-ms JS_t90 resolution

/** Parse `linear(0, 0.10 2.041%, …, 1)` → `[{ v, p }]` with `p` a 0..1 clock fraction. */
function parseLinearStops(decl) {
    const inner = decl.slice(decl.indexOf("(") + 1, decl.lastIndexOf(")"));
    const parts = inner.split(",").map((s) => s.trim());
    return parts.map((part, i) => {
        const toks = part.split(/\s+/);
        const v = Number.parseFloat(toks[0]);
        // A bare first stop is at 0%, a bare last stop is at 100%; the middle stops
        // carry an explicit `N%` position.
        const p =
            toks[1] && toks[1].endsWith("%")
                ? Number.parseFloat(toks[1]) / 100
                : i === 0
                  ? 0
                  : 1;
        return { v, p };
    });
}

/** First UPWARD crossing of `level` on the piecewise-linear stop list → clock fraction 0..1 (or null). */
function crossFraction(stops, level) {
    for (let i = 1; i < stops.length; i++) {
        const a = stops[i - 1];
        const b = stops[i];
        if (a.v < level && b.v >= level) {
            return a.p + ((level - a.v) / (b.v - a.v)) * (b.p - a.p);
        }
    }
    return null;
}

/** Physical time (seconds) the `SpringProgress(target=1)` step response first reaches `level`. */
function springRiseTimeSeconds(preset, level) {
    const spring = new SpringProgress({
        response: preset.response,
        dampingFraction: preset.dampingFraction,
    });
    spring.target = 1;
    let prev = spring.tickToTime(0);
    for (let t = TEMPO_RISE_DT; t < TEMPO_RISE_MAX_SECONDS; t += TEMPO_RISE_DT) {
        const x = spring.tickToTime(t);
        if (prev < level && x >= level) {
            return t - TEMPO_RISE_DT + ((level - prev) / (x - prev)) * TEMPO_RISE_DT;
        }
        prev = x;
    }
    return null;
}

/**
 * PURE tempo-parity detector — reads a CSS string + a presets table so the self-test
 * can inject a synthetic curve sampled WITHOUT `maxDuration` (the dropped-arg regression)
 * and assert it FLAGS, while the parity-fixed synthetic stays clean.
 */
export function detectTempoParity({ css, presets }) {
    const violations = [];
    const facts = { bandMs: TEMPO_PARITY_BAND_MS, perPreset: [] };

    for (const preset of presets) {
        const curveM = css.match(
            new RegExp(`--spring-${preset.name}:\\s*(linear\\([^;]+\\))`),
        );
        // BI.W-TEMPO — the raw settle seconds moved to the INTERNAL `-settle` token
        // (the public `-duration` is now the `calc(settle * --motion-tempo)` reader,
        // which a device-free gate cannot evaluate). Read the raw settle here — at the
        // 1.0 identity it equals the prior flat `-duration` value, so this clause is
        // byte-unchanged in effect (the G4 round-trip).
        const durM = css.match(
            new RegExp(`--spring-${preset.name}-settle:\\s*([\\d.]+)s`),
        );
        if (!curveM || !durM) {
            violations.push(
                `--spring-${preset.name}: the linear() curve and/or its -settle clock is missing — cannot verify tempo parity`,
            );
            continue;
        }
        const stops = parseLinearStops(curveM[1]);
        const durationSec = Number.parseFloat(durM[1]);
        const f90 = crossFraction(stops, TEMPO_RISE_LEVEL);
        const jsRise = springRiseTimeSeconds(preset, TEMPO_RISE_LEVEL);
        if (f90 == null || jsRise == null) {
            violations.push(
                `--spring-${preset.name}: the ${TEMPO_RISE_LEVEL * 100}%-travel crossing could not be located`,
            );
            continue;
        }
        const cssT90ms = f90 * durationSec * 1000;
        const jsT90ms = jsRise * 1000;
        const deltaMs = Math.abs(cssT90ms - jsT90ms);
        facts.perPreset.push({
            name: preset.name,
            cssT90ms: Math.round(cssT90ms * 10) / 10,
            jsT90ms: Math.round(jsT90ms * 10) / 10,
            deltaMs: Math.round(deltaMs * 10) / 10,
        });
        if (deltaMs > TEMPO_PARITY_BAND_MS) {
            violations.push(
                `--spring-${preset.name}: CSS_t90 ${cssT90ms.toFixed(1)}ms (the shipped linear() × its ${durationSec}s clock) vs physical JS_t90 ${jsT90ms.toFixed(1)}ms — Δ${deltaMs.toFixed(1)}ms exceeds the ±${TEMPO_PARITY_BAND_MS}ms tempo-parity band (FAM-18/M1: the curve and its --spring-*-duration clock are sampled over DIFFERENT horizons — re-run \`node scripts/regen-spring-tokens.mjs\`, which passes maxDuration = the settle clock so both share ONE span)`,
            );
        }
    }

    return { violations, facts };
}

function detectTempoParityReal() {
    return detectTempoParity({
        css: readFileSync(tokensPath, "utf8"),
        presets: PRESETS,
    });
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

    // AW.W2 — fold in the BAND + COMMENT-MATCH asserts (net-new; the gate only
    // did committed-vs-generated drift before).
    const band = detectBand();
    const comments = detectComments();
    // BG.W-SPRING-REGISTER-TIDY — the register-sprawl drain (table→6 + dead twins die +
    // the ScrubberTimeline-LOCAL move).
    const tidy = detectRegisterTidyReal();
    // BI.W-SPRING-PARITY (FAM-18/M1) — the tempo-parity clause (CSS_t90 vs JS_t90).
    const tempo = detectTempoParityReal();

    return {
        violations: [
            ...violations,
            ...band.violations,
            ...comments.violations,
            ...tidy.violations,
            ...tempo.violations,
        ],
        committed,
        generated,
        bandFacts: band.facts,
        commentFacts: comments.facts,
        tidyFacts: tidy.facts,
        tempoFacts: tempo.facts,
    };
}

// ── BG.W-SPRING-REGISTER-TIDY self-test — the register-tidy clause proves its own bite
//    every run: three synthetic regressions (a re-added timeline ROW, a re-added dead CSS
//    twin, a vanished LOCAL map) MUST each flag; a clean state MUST NOT.
function registerTidySelfTest() {
    const failures = [];
    const cleanPresets =
        'export type SpringPresetName = | "smooth" | "press";\n' +
        'export const SPRING_PRESETS = [{ name: "smooth", response: 0.58, dampingFraction: 0.8 }, { name: "press", response: 0.2, dampingFraction: 0.8 }];';
    const cleanCss = "  --spring-smooth: linear(0, 1);\n  --spring-press-duration: 0.16s;";
    const cleanScrubber =
        "const HEAD_SPRING = { response: 0.34, dampingFraction: 0.74 };\n" +
        "const FILL_SPRING = { response: 0.46, dampingFraction: 0.82 };\n" +
        "const PRESS_SPRING = { response: 0.22, dampingFraction: 0.7 };";

    // clean → no violations.
    if (
        detectRegisterTidy({ presetsSrc: cleanPresets, css: cleanCss, scrubberSrc: cleanScrubber })
            .violations.length !== 0
    )
        failures.push("self-test tidy: a CLEAN drained state false-flagged (over-reach)");

    // bite 1 — a re-added timeline ROW in the global table reds.
    const rowRegression = detectRegisterTidy({
        presetsSrc:
            cleanPresets +
            '\n{ name: "timeline-head", response: 0.34, dampingFraction: 0.74 };',
        css: cleanCss,
        scrubberSrc: cleanScrubber,
    });
    if (rowRegression.violations.length === 0)
        failures.push("self-test tidy bite-1: a re-added global `timeline-head` register row did NOT flag");

    // bite 2 — a re-added dead `--spring-timeline-*` CSS twin reds.
    const twinRegression = detectRegisterTidy({
        presetsSrc: cleanPresets,
        css: cleanCss + "\n  --spring-timeline-head: linear(0, 1);",
        scrubberSrc: cleanScrubber,
    });
    if (twinRegression.violations.length === 0)
        failures.push("self-test tidy bite-2: a re-added dead --spring-timeline-head CSS twin did NOT flag");

    // bite 3 — a ScrubberTimeline that re-sources off the retired global row (map gone) reds.
    const mapRegression = detectRegisterTidy({
        presetsSrc: cleanPresets,
        css: cleanCss,
        scrubberSrc: 'const HEAD_SPRING = springPreset("timeline-head");',
    });
    if (mapRegression.violations.length === 0)
        failures.push("self-test tidy bite-3: a vanished ScrubberTimeline-LOCAL map (springPreset(\"timeline-*\")) did NOT flag");

    return failures;
}

// ── BI.W-SPRING-PARITY self-test — the tempo-parity clause proves its own bite every
//    run: a synthetic regen that DROPS `maxDuration` (the default 4×response horizon)
//    MUST re-red the clause, and the parity-fixed synthetic (maxDuration == the settle
//    clock) MUST stay clean. A future regen that silently drops the arg cannot un-fix
//    parity without this self-test going red.
function tempoParitySelfTest() {
    const failures = [];
    // snappy — an unambiguously underdamped register where the horizon mismatch is loud.
    const sample = PRESETS.find((p) => p.name === "snappy") ?? PRESETS[0];
    const settle = springSettleDurationSeconds(sample);
    const SAMPLE_COUNT = 48; // mirrors regen-spring-tokens.mjs (fidelity only; not load-bearing here)
    const buildCss = (stops) =>
        `  --spring-${sample.name}: ${stops};\n  --spring-${sample.name}-settle: ${settle}s;`;

    // CLEAN: sampled over maxDuration = the settle clock (the parity fix) → in-band.
    const cleanStops = springLinearStops({
        response: sample.response,
        dampingFraction: sample.dampingFraction,
        sampleCount: SAMPLE_COUNT,
        maxDuration: settle,
    });
    if (
        detectTempoParity({ css: buildCss(cleanStops), presets: [sample] }).violations
            .length !== 0
    )
        failures.push(
            "self-test tempo: a parity-fixed synthetic (maxDuration == the settle clock) false-flagged (over-reach)",
        );

    // BITE: DROP maxDuration → the default 4×response horizon → the ~5× compression
    // re-appears → the clause MUST flag.
    const droppedStops = springLinearStops({
        response: sample.response,
        dampingFraction: sample.dampingFraction,
        sampleCount: SAMPLE_COUNT,
    });
    if (
        detectTempoParity({ css: buildCss(droppedStops), presets: [sample] }).violations
            .length === 0
    )
        failures.push(
            "self-test tempo bite: a synthetic regen that DROPPED maxDuration did NOT flag — the tempo-parity teeth are gone",
        );

    return failures;
}

function run() {
    const { ROOT, ARTIFACT } = cliPaths();
    const { violations, committed, generated, bandFacts, commentFacts, tidyFacts, tempoFacts } = detect();
    const selfTestFailures = [...registerTidySelfTest(), ...tempoParitySelfTest()];
    if (selfTestFailures.length) {
        for (const f of selfTestFailures) console.error(`proof:spring-tokens-synced — ${f}`);
        console.error(
            "proof:spring-tokens-synced — SELF-TEST FAILED: a clause's teeth are gone (register-tidy or tempo-parity); do not trust a GREEN.",
        );
        process.exit(1);
    }
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
            band: bandFacts,
            comments: commentFacts,
            registerTidy: tidyFacts,
            registerTidySelfTest: "OK — a re-added timeline row / dead CSS twin / vanished local map all flag",
            tempoParity: tempoFacts,
            tempoParitySelfTest: "OK — a synthetic regen that drops maxDuration re-reds the tempo-parity clause",
        },
        violations,
    });

    console.log("proof:spring-tokens-synced — committed --spring-* block matches the generator + the AW.W2 band/comment-match (AV.W14)");
    console.log(`  tokens: ${relative(ROOT, tokensPath)}`);
    if (bandFacts) {
        console.log(
            `  dock spring (const/preset): (${bandFacts.constResponse}, ${bandFacts.constDamping}) / (${bandFacts.presetResponse}, ${bandFacts.presetDamping})`,
        );
        console.log(`  derived overshoot         : ${bandFacts.derivedOvershoot}`);
    }
    if (commentFacts) {
        console.log(
            `  stale dock-spring comments: ${commentFacts.staleHits.length}`,
        );
    }
    if (tidyFacts) {
        console.log(
            `  register tidy (BG)        : global rows ${tidyFacts.globalRowCount} (canon ${CANONICAL_SPRING_COUNT}), dead --spring-timeline-* twins ${tidyFacts.deadTimelineTwins.length}, ScrubberTimeline local map ${tidyFacts.scrubberLocalMap ? "present ✓" : "MISSING ✗"}`,
        );
        console.log("  register tidy self-test   : OK (row / twin / local-map bites all flag)");
    }
    if (tempoFacts && tempoFacts.perPreset) {
        const worst = tempoFacts.perPreset.reduce(
            (m, r) => (r.deltaMs > m.deltaMs ? r : m),
            { deltaMs: -1, name: "—" },
        );
        const inBand = tempoFacts.perPreset.filter(
            (r) => r.deltaMs <= tempoFacts.bandMs,
        ).length;
        console.log(
            `  tempo parity (BI/M1)      : ${inBand}/${tempoFacts.perPreset.length} presets within ±${tempoFacts.bandMs}ms (CSS_t90 vs JS_t90); max Δt90 ${worst.deltaMs}ms (${worst.name})`,
        );
        console.log("  tempo parity self-test    : OK (a dropped-maxDuration regen re-reds)");
    }
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
