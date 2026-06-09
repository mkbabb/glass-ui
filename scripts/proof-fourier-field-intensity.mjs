#!/usr/bin/env node
// AY.W-FF2 — proof:fourier-field-intensity (the STATIC source gate).
//
// Born-RED at the pre-edit HEAD (the flat `OUTLINE_PEAK_ALPHA = 0.24` + the
// `age*age` quadratic body survive — the `final` preset paints a faint corner
// stub). It drives the W43 SOTA intensity model GREEN with nine clauses, each a
// RED-witness inverse (the constellation-warp gate pattern). It asserts:
//
//   (1) OUTLINE_PEAK_ALPHA is ABSENT from FourierField.vue (the G1 source assert).
//   (2) VariantPreset carries all six bundle fields (peakAlpha, headGlowAlpha,
//       headGlowBlur, epicycleRatios, trailFadeExp, trailFloor) AND both PRESETS
//       entries populate them.
//   (3) headGlowAlpha > peakAlpha for BOTH presets (head-forward — the D4 invariant).
//   (4) trailFadeExp in [1, 2) for BOTH presets (soft, never quadratic — D2) and
//       trailFloor > 0 for both (the body survives).
//   (5) the render reads a CACHED color triple, NOT a per-frame colorResolver(/
//       cssToOklch(/oklchToGammaRgb( call inside the render( body (the D7 hoist).
//   (6) the `intensity` prop is on defineProps with a [0, 2] clamp.
//   (7) the render carries the dark/light blend fork (globalCompositeOperation set
//       from isDark) AND the amplitude-descending sort (.sort(( keyed on .amplitude).
//   (8) evalFourier is ABSENT from index.ts AND math.ts (the G4 source assert).
//   (9) SELF-PROVING — a synthetic pre-edit snapshot (the `OUTLINE_PEAK_ALPHA *
//       age * age` line) is evaluated every run; if the detector fails to flag it
//       the gate REDs (the bite is demonstrated each invocation).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const FIELD = resolve(ROOT, "src/components/custom/fourier-field/FourierField.vue");
const MATH = resolve(ROOT, "src/components/custom/fourier-field/math.ts");
const INDEX = resolve(ROOT, "src/components/custom/fourier-field/index.ts");

const REQUIRED_FIELDS = [
    "peakAlpha",
    "headGlowAlpha",
    "headGlowBlur",
    "epicycleRatios",
    "trailFadeExp",
    "trailFloor",
];

/**
 * Parse the two PRESETS object-literal entries (hero / final) out of the SFC and
 * read their numeric/object bundle fields. Returns `{ hero, final }` Maps of
 * `field → raw-value-text`. A simple brace-balanced slice of each named entry.
 */
function parsePresets(src) {
    const out = {};
    for (const name of ["hero", "final"]) {
        const re = new RegExp(`\\b${name}\\s*:\\s*\\{`);
        const m = re.exec(src);
        if (!m) {
            out[name] = null;
            continue;
        }
        let i = m.index + m[0].length - 1; // at the `{`
        let depth = 0;
        let start = i;
        for (; i < src.length; i++) {
            if (src[i] === "{") depth++;
            else if (src[i] === "}") {
                depth--;
                if (depth === 0) break;
            }
        }
        const body = src.slice(start + 1, i);
        const fields = new Map();
        // capture `key: <value>` up to the next `,` at brace-depth-0 within body —
        // good enough for the numeric + `{ circle: …, arm: … }` fields here.
        const fieldRe = /([a-zA-Z]+)\s*:\s*([^,\n]+(?:\{[^}]*\})?)/g;
        let fm;
        while ((fm = fieldRe.exec(body))) {
            fields.set(fm[1], fm[2].trim());
        }
        out[name] = fields;
    }
    return out;
}

/** Read a numeric bundle field from a preset's field map (NaN if absent). */
function num(fields, key) {
    if (!fields || !fields.has(key)) return NaN;
    const v = fields.get(key).match(/-?\d*\.?\d+/);
    return v ? Number(v[0]) : NaN;
}

/**
 * Brace-balanced body slice — from the `{` that follows the FIRST match of
 * `openRe` to its matching `}`. Returns "" if `openRe` does not match. Handles
 * nested braces (an inline `{ circle; arm }` interface field, the render arrow).
 */
function braceBalancedBody(src, openRe) {
    const m = openRe.exec(src);
    if (!m) return "";
    let i = m.index + m[0].length - 1; // at the `{`
    let depth = 0;
    const start = i;
    for (; i < src.length; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") {
            depth--;
            if (depth === 0) break;
        }
    }
    return src.slice(start + 1, i);
}

/** Extract the body of the `render(c, now) { … }` arrow inside `setup`. */
function renderBody(src) {
    return braceBalancedBody(src, /render\s*\(\s*c\s*,\s*now\s*\)\s*\{/);
}

/** The clause-9 detector: does the source carry the quadratic-decay defect line? */
function hasQuadraticDecayLine(text) {
    // `OUTLINE_PEAK_ALPHA * age * age` (any whitespace) — the exact pre-edit defect.
    return /OUTLINE_PEAK_ALPHA\s*\*\s*age\s*\*\s*age/.test(text);
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_FOURIER_FIELD_INTENSITY_ARTIFACT",
        "AY-fourier-field-intensity",
    );
    const violations = [];
    const facts = {};

    for (const [p, label] of [[FIELD, "FourierField.vue"], [MATH, "math.ts"], [INDEX, "index.ts"]]) {
        if (!existsSync(p)) violations.push(`${label} is absent`);
    }

    const field = existsSync(FIELD) ? readFileSync(FIELD, "utf8") : "";
    const math = existsSync(MATH) ? readFileSync(MATH, "utf8") : "";
    const index = existsSync(INDEX) ? readFileSync(INDEX, "utf8") : "";

    // ── (9) SELF-PROVING — the detector must flag the synthetic pre-edit line ──
    const SYNTHETIC = "c.globalAlpha = OUTLINE_PEAK_ALPHA * age * age;";
    const biteFlagged = hasQuadraticDecayLine(SYNTHETIC);
    facts.selfTestFlagged = biteFlagged;
    if (!biteFlagged) {
        console.error(
            "[proof:fourier-field-intensity] SELF-TEST FAILED — the quadratic-decay detector did not flag the synthetic pre-edit line. The gate is not load-bearing.",
        );
        process.exit(1);
    }

    // ── (1) OUTLINE_PEAK_ALPHA absent from FourierField.vue ──────────────────
    const hasConstant = /OUTLINE_PEAK_ALPHA/.test(field);
    facts.outlinePeakAlphaAbsent = !hasConstant;
    if (hasConstant)
        violations.push(
            "OUTLINE_PEAK_ALPHA still present in FourierField.vue (the flat ceiling was not replaced by the per-variant bundle — clean break required)",
        );
    // and the quadratic-decay body must be gone (D2)
    if (hasQuadraticDecayLine(field))
        violations.push(
            "the `OUTLINE_PEAK_ALPHA * age * age` quadratic body decay still present (the D2 defect — the trail body must use a SOFT age^trailFadeExp with a trailFloor)",
        );

    // ── (2) VariantPreset carries all six fields + both presets populate them ─
    const ifaceBody = braceBalancedBody(field, /interface\s+VariantPreset\s*\{/);
    const missingIface = REQUIRED_FIELDS.filter((f) => !new RegExp(`\\b${f}\\b`).test(ifaceBody));
    facts.bundleFieldsOnInterface = REQUIRED_FIELDS.filter((f) => !missingIface.includes(f));
    if (missingIface.length)
        violations.push(
            `VariantPreset is missing bundle field(s): ${missingIface.join(", ")} — the six fields (${REQUIRED_FIELDS.join(", ")}) are the intensity model`,
        );

    const presets = parsePresets(field);
    facts.presetsParsed = { hero: !!presets.hero, final: !!presets.final };
    for (const name of ["hero", "final"]) {
        const fields = presets[name];
        if (!fields) {
            violations.push(`could not parse the \`${name}\` PRESETS entry`);
            continue;
        }
        const miss = REQUIRED_FIELDS.filter((f) => !fields.has(f));
        if (miss.length)
            violations.push(`PRESETS.${name} does not populate: ${miss.join(", ")}`);
    }

    // ── (3) headGlowAlpha > peakAlpha for both presets (head-forward, D4) ─────
    // ── (4) trailFadeExp in [1,2) + trailFloor > 0 for both (D2 + survival) ──
    const presetReadings = {};
    for (const name of ["hero", "final"]) {
        const f = presets[name];
        if (!f) continue;
        const peakAlpha = num(f, "peakAlpha");
        const headGlowAlpha = num(f, "headGlowAlpha");
        const trailFadeExp = num(f, "trailFadeExp");
        const trailFloor = num(f, "trailFloor");
        presetReadings[name] = { peakAlpha, headGlowAlpha, trailFadeExp, trailFloor };

        if (!(headGlowAlpha > peakAlpha))
            violations.push(
                `PRESETS.${name}: headGlowAlpha (${headGlowAlpha}) must be > peakAlpha (${peakAlpha}) — the head glow is the STRONGEST layer (head-forward, D4)`,
            );
        if (!(trailFadeExp >= 1 && trailFadeExp < 2))
            violations.push(
                `PRESETS.${name}: trailFadeExp (${trailFadeExp}) must be in [1, 2) — soft persistence, never the quadratic that killed the body (D2)`,
            );
        if (!(trailFloor > 0))
            violations.push(
                `PRESETS.${name}: trailFloor (${trailFloor}) must be > 0 — the trail body must survive, never decay to 0`,
            );
    }
    facts.presetReadings = presetReadings;

    // ── (5) the render reads a CACHED triple, not a per-frame resolve ────────
    const body = renderBody(field);
    const perFrameResolve = /colorResolver\s*\(|cssToOklch\s*\(|oklchToGammaRgb\s*\(/.test(body);
    facts.renderHasNoPerFrameResolve = !perFrameResolve;
    if (perFrameResolve)
        violations.push(
            "the render() body still calls colorResolver(/cssToOklch(/oklchToGammaRgb( per frame — hoist the resolve into the color/dark watch and read the cached rgb strings (D7 zero-alloc)",
        );
    // and the resolve MUST live in refreshResolvedColor (the watch callback) —
    // the cached refs read in render.
    const cachesColor =
        /outlineRgb\.value\s*=/.test(field) && /epicycleRgb\.value\s*=/.test(field);
    facts.cachesColorInWatch = cachesColor;
    if (!cachesColor)
        violations.push(
            "no cached outlineRgb/epicycleRgb refs are assigned outside the render() body — the zero-alloc color hoist (D7) is not in place",
        );
    if (!/outlineRgb\.value/.test(body) || !/epicycleRgb\.value/.test(body))
        violations.push(
            "the render() body does not READ the cached outlineRgb.value/epicycleRgb.value strings",
        );

    // ── (6) the `intensity` prop on defineProps with a [0, 2] clamp ──────────
    const hasIntensityProp = /intensity\?\s*:\s*number/.test(field);
    const hasClamp = /Math\.max\s*\(\s*0\s*,\s*Math\.min\s*\(\s*2\s*,\s*intensity/.test(field);
    facts.intensityProp = hasIntensityProp;
    facts.intensityClamp = hasClamp;
    if (!hasIntensityProp)
        violations.push("no `intensity?: number` prop on defineProps (the loudness envelope is absent)");
    if (!hasClamp)
        violations.push(
            "the intensity prop is not clamped `Math.max(0, Math.min(2, intensity))` — the [0, 2] bound (D5 §2.2)",
        );

    // ── (7) the dark/light blend fork + the amplitude-descending sort ────────
    const hasBlendFork =
        /globalCompositeOperation\s*=\s*isDark\.value\s*\?\s*["']lighter["']/.test(body) ||
        /globalCompositeOperation\s*=\s*isDark\.value\s*\?/.test(body);
    facts.blendFork = hasBlendFork;
    if (!hasBlendFork)
        violations.push(
            "the render does not set globalCompositeOperation from isDark (the dark `lighter` / light `source-over` blend fork is absent)",
        );
    const hasSort = /\.sort\s*\(\s*\([^)]*\)\s*=>\s*[^.]*\.amplitude\s*-\s*[^.]*\.amplitude/.test(field);
    facts.amplitudeSort = hasSort;
    if (!hasSort)
        violations.push(
            "no amplitude-descending sort (`.sort((a, b) => b.amplitude - a.amplitude)`) — the R1 draw-pass refinement (D8) is absent",
        );

    // ── (8) evalFourier absent from index.ts AND math.ts ─────────────────────
    const evalInMath = /\bevalFourier\b/.test(math);
    const evalInIndex = /\bevalFourier\b/.test(index);
    facts.evalFourierAbsent = !evalInMath && !evalInIndex;
    if (evalInMath)
        violations.push("evalFourier still defined/referenced in math.ts (the dead export must be deleted, no alias)");
    if (evalInIndex)
        violations.push("evalFourier still re-exported in index.ts (the dead export must be removed)");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:fourier-field-intensity",
        facts,
        violations,
    });

    console.log(
        "proof:fourier-field-intensity — the W43 SOTA fourier-field intensity model gate (AY.W-FF2)",
    );
    console.log(`  OUTLINE_PEAK_ALPHA absent       : ${facts.outlinePeakAlphaAbsent ? "yes ✓" : "NO ✗"}`);
    console.log(`  six bundle fields populated     : ${(facts.bundleFieldsOnInterface ?? []).length}/6`);
    console.log(`  head-forward (glow > peak)      : ${presetReadings.hero && presetReadings.final ? "checked" : "n/a"}`);
    console.log(`  soft trailFadeExp + trailFloor  : checked`);
    console.log(`  render reads cached triple      : ${facts.renderHasNoPerFrameResolve && facts.cachesColorInWatch ? "yes ✓" : "NO ✗"}`);
    console.log(`  intensity prop + [0,2] clamp    : ${facts.intensityProp && facts.intensityClamp ? "yes ✓" : "NO ✗"}`);
    console.log(`  blend fork + amplitude sort     : ${facts.blendFork && facts.amplitudeSort ? "yes ✓" : "NO ✗"}`);
    console.log(`  evalFourier deleted             : ${facts.evalFourierAbsent ? "yes ✓" : "NO ✗"}`);
    console.log(`  self-test (bite proof)          : OK — the quadratic-decay synthetic line is flagged`);
    if (violations.length) {
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
