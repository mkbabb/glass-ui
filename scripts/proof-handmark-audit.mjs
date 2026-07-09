#!/usr/bin/env node
// BG.W-HANDMARK-PERFECT — the HandMark AUDIT gate (proof:handmark-audit).
//
// The PHANTOM gate made real (SPEC §3 residual e): proof-handmark.mjs cited a
// "spacing-CV discriminator rides proof:handmark-audit" but the FILE DID NOT EXIST —
// the boil non-periodicity claim was unguarded. This mints it: the φ-incommensurate
// spacing-CV floor (the REAL boil-quality witness — the honest non-periodicity teeth),
// the aspect-correct viewBox derivation, and the hull se-guard, each born-RED at HEAD.
//
// Three falsifiable clauses + a self-test bite:
//
//   A1 — THE SPACING-CV FLOOR (the boil is genuinely non-periodic). It imports the REAL
//        `naturalUnderlinePoints` from the pencil-boil-FREE ./noise leaf (never a symbol
//        regex — the W-GATE-TRUTH-AUDIT discipline), samples the emitted point-set over
//        400 seeds, and asserts the MEDIAN inter-extremum spacing-CV ≥ 0.30. A pure
//        sinusoid (near-uniform extrema spacing) sits at CV ≈ 0 — well below the floor —
//        so the floor SEPARATES the φ-incommensurate value-noise from a spell-check
//        squiggle. (Node type-strips ./noise directly via a registerHooks resolve shim;
//        geometry.ts's top-level pencil-boil import is why the noise leaf exists.)
//   A2 — THE ASPECT-CORRECT viewBox (residual a). HandMark.vue derives the marking-space
//        HEIGHT from the MEASURED box px-aspect (`vbH = VB_W / boxAspect`) so
//        `preserveAspectRatio="none"` scales the wobble SHAPE uniformly (short-word humps
//        stop crushing flat); geometry.ts + useHandMark thread the `vbH` param. Source
//        presence — the binding px-aspect≈vb-aspect readback is the π.
//   A3 — THE HULL se-GUARD (residual b). ink.ts guards the hull body on `outline.length`
//        and falls back to a STROKED path on a degenerate near-point outline (so a tiny-
//        datum hull mark never vanishes). Source presence — the functional non-empty-path
//        proof is the hull-guard unit test + the box-mode π.
//
// self-test bite: a synthetic pure-sinusoid point-set MUST fall below the CV floor (the
// detector is not hollow); the real boil MUST clear it. A regression that re-introduces a
// periodic wobble (or drops the spacing-CV metric) re-reds A1.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { registerHooks } from "node:module";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const ARTIFACT = gateArtifactPath("GLASS_UI_HANDMARK_AUDIT_ARTIFACT", "BG-handmark-audit");
const rd = (p) => (existsSync(resolve(ROOT, p)) ? readFileSync(resolve(ROOT, p), "utf8") : "");

const HM = "src/components/custom/handmark";
const SPACING_CV_FLOOR = 0.3; // the φ-incommensurate non-periodicity floor (SPEC §3.e)
const SEEDS = 400;
const RES = 64; // the resampled read (the stable spacing-CV — the constants.ts note)

const violations = [];
const facts = {};

// ── the spacing-CV metric (inter-extremum spacing coefficient of variation) ──────────
// Local extrema = interior sign-flips of the discrete derivative; the gaps between
// consecutive extrema are the hump-to-hump spacings; CV = std/mean of those gaps. A
// φ-incommensurate value-noise has IRREGULAR gaps (high CV); a sinusoid has near-uniform
// gaps (CV ≈ 0).
function spacingCV(pts) {
    const ys = pts.map((p) => p[1]);
    const xs = pts.map((p) => p[0]);
    const ext = [];
    for (let i = 1; i < ys.length - 1; i++) {
        const d0 = ys[i] - ys[i - 1];
        const d1 = ys[i + 1] - ys[i];
        if (d0 === 0 && d1 === 0) continue;
        if ((d0 >= 0 && d1 < 0) || (d0 <= 0 && d1 > 0)) ext.push(xs[i]);
    }
    if (ext.length < 3) return null; // too few extrema to score
    const gaps = [];
    for (let i = 1; i < ext.length; i++) gaps.push(ext[i] - ext[i - 1]);
    const mean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    if (mean === 0) return null;
    const varr = gaps.reduce((a, b) => a + (b - mean) ** 2, 0) / gaps.length;
    return Math.sqrt(varr) / mean;
}

const median = (a) => {
    const s = [...a].sort((x, y) => x - y);
    return s.length ? s[Math.floor(s.length / 2)] : null;
};

// A pure sinusoid reference (the self-test bite target) — near-uniform extrema spacing.
function sinusoidPts(x1, y, x2, seed, segs) {
    const span = x2 - x1;
    const amp = span * 0.05;
    const humps = 2 + (seed % 3); // 2..4 humps (a clean spell-check squiggle)
    const pts = [];
    for (let i = 0; i <= segs; i++) {
        const t = i / segs;
        pts.push([x1 + span * t, y + amp * Math.sin(t * humps * Math.PI * 2)]);
    }
    return pts;
}

// ── A1 — the spacing-CV floor over the REAL boil voice ───────────────────────────────
// Register a resolve hook so node can strip-import the bundler-style extensionless
// imports the ./noise leaf uses (../../../utils/prng, ./constants).
registerHooks({
    resolve(spec, ctx, next) {
        if ((spec.startsWith("./") || spec.startsWith("../")) && !/\.[a-z]+$/i.test(spec)) {
            try {
                return next(spec + ".ts", ctx);
            } catch {
                /* fall through */
            }
            try {
                return next(spec + "/index.ts", ctx);
            } catch {
                /* fall through */
            }
        }
        return next(spec, ctx);
    },
});

let realMedianCV = null;
let sinusoidMedianCV = null;
const noisePath = resolve(ROOT, `${HM}/noise.ts`);
if (!existsSync(noisePath)) {
    violations.push(
        `A1: the pencil-boil-free ./noise leaf is ABSENT — proof:handmark-audit cannot sample the REAL naturalUnderlinePoints (mint src/components/custom/handmark/noise.ts)`,
    );
} else {
    try {
        const mod = await import(pathToFileURL(noisePath).href);
        const naturalUnderlinePoints = mod.naturalUnderlinePoints;
        if (typeof naturalUnderlinePoints !== "function") {
            violations.push("A1: ./noise must export `naturalUnderlinePoints` (the REAL boil voice)");
        } else {
            const realCVs = [];
            const sineCVs = [];
            for (let seed = 1; seed <= SEEDS; seed++) {
                const rc = spacingCV(naturalUnderlinePoints(4, 20, 96, seed, RES));
                if (rc != null) realCVs.push(rc);
                const sc = spacingCV(sinusoidPts(4, 20, 96, seed, RES));
                if (sc != null) sineCVs.push(sc);
            }
            realMedianCV = median(realCVs);
            sinusoidMedianCV = median(sineCVs);
            facts.spacingCvFloor = SPACING_CV_FLOOR;
            facts.realMedianCV = realMedianCV != null ? Number(realMedianCV.toFixed(4)) : null;
            facts.realSampled = realCVs.length;
            if (realMedianCV == null || realMedianCV < SPACING_CV_FLOOR) {
                violations.push(
                    `A1: the boil voice median spacing-CV ${realMedianCV?.toFixed(4)} < ${SPACING_CV_FLOOR} (the wobble reads periodic — a spell-check squiggle, not the φ-incommensurate hand line)`,
                );
            }
            // the self-test bite: the sinusoid MUST fall below the floor (the detector bites).
            facts.selfTestSinusoidMedianCV =
                sinusoidMedianCV != null ? Number(sinusoidMedianCV.toFixed(4)) : null;
            if (sinusoidMedianCV == null || sinusoidMedianCV >= SPACING_CV_FLOOR) {
                violations.push(
                    `A1 self-test: a pure sinusoid scored median spacing-CV ${sinusoidMedianCV?.toFixed(4)} ≥ ${SPACING_CV_FLOOR} — the discriminator is HOLLOW (it must separate periodic from φ-incommensurate)`,
                );
            }
        }
    } catch (e) {
        violations.push(`A1: could not import ./noise for the spacing-CV sample: ${String(e).split("\n")[0]}`);
    }
}

// ── A2 — the aspect-correct viewBox derivation ───────────────────────────────────────
const sfc = rd(`${HM}/HandMark.vue`);
const geometry = rd(`${HM}/geometry.ts`);
const core = rd(`${HM}/composables/useHandMark.ts`);
// the SFC derives vbH from the MEASURED box px-aspect (VB_W / boxAspect) + binds the
// viewBox off it; geometry.ts + useHandMark thread the vbH param.
const a2SfcDerives =
    /boxAspect/.test(sfc) &&
    /VB_W\s*\/\s*(?:a|boxAspect)/.test(sfc) &&
    /viewBox=.*\$\{\s*vbH\s*\}/.test(sfc);
const a2GeomThreads = /vbH\s*:\s*number\s*=\s*VB_H/.test(geometry) || /vbH\s*=\s*VB_H/.test(geometry);
const a2CoreThreads = /\bvbH\b/.test(core);
facts.a2SfcDerivesAspect = a2SfcDerives;
facts.a2GeomThreadsVbH = a2GeomThreads;
facts.a2CoreThreadsVbH = a2CoreThreads;
if (!a2SfcDerives)
    violations.push(
        "A2: HandMark.vue must derive the aspect-correct marking-space height (vbH = VB_W / boxAspect) from the MEASURED box px-aspect AND bind it into the viewBox",
    );
if (!a2GeomThreads)
    violations.push("A2: geometry.ts shapeGeom must thread the `vbH` param (default VB_H, text-mode only)");
if (!a2CoreThreads) violations.push("A2: useHandMark must thread `vbH` through the core input");

// ── A3 — the hull se-guard ───────────────────────────────────────────────────────────
const ink = rd(`${HM}/ink.ts`);
// the hull branch guards on outline.length (a degenerate near-point outline) AND falls
// back to a stroked path (fill→stroke) so a tiny-datum hull mark never renders empty.
const a3GuardsLen = /outline\.length\s*<\s*4/.test(ink);
const a3FallsBack =
    /getSvgPathFromStroke\(outline\)/.test(ink) &&
    /if\s*\(\s*outline\.length\s*<\s*4[\s\S]{0,80}?\)\s*\{[\s\S]{0,220}?stroke:\s*color/.test(ink);
facts.a3HullGuardsLength = a3GuardsLen;
facts.a3HullFallsBackToStroke = a3FallsBack;
if (!a3GuardsLen)
    violations.push("A3: ink.ts hull branch must guard on `outline.length < 4` (the degenerate near-point outline)");
if (!a3FallsBack)
    violations.push(
        "A3: ink.ts hull branch must FALL BACK to a stroked path (stroke: color) on the degenerate outline — a hull mark must never emit an empty `d`",
    );

// ── verdict ──────────────────────────────────────────────────────────────────────────
const pass = violations.length === 0;
const result = {
    gate: "proof:handmark-audit",
    pass,
    stamp: snapshotStamp(),
    facts,
    violations,
};
writeGateArtifact(ARTIFACT, result);

const tag = pass ? "PASS" : "FAIL";
console.log(`proof:handmark-audit — ${tag} (${violations.length} violation${violations.length === 1 ? "" : "s"})`);
if (!pass) {
    for (const v of violations) console.log(`  ✗ ${v}`);
    process.exit(1);
}
console.log(
    `  ✓ A1 spacing-CV median ${realMedianCV?.toFixed(3)} ≥ ${SPACING_CV_FLOOR} (sinusoid ${sinusoidMedianCV?.toFixed(3)} < floor — detector bites) · A2 aspect-correct viewBox · A3 hull se-guard`,
);
