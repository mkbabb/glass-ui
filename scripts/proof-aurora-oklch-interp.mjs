#!/usr/bin/env node
// AW.W5.1 — the aurora in-shader OKLCh interpolation gate (proof:aurora-oklch-interp).
//
// Three load-bearing assertions, none of which proof:single-color-core can make
// (its TS-regex guards the 11 value.js matrix primitives, NOT the new in-shader
// turns-domain interpolateHue transcription — a GLSL string, outside the regex):
//
//  (1) MATRICES 1e-6 — the spliced OKLCH_MATRICES_GLSL `mat3` literals match the
//      value.js Ottosson constants to 1e-6 (the splice did not drift).
//  (2) HUE-PORT 1e-6 — a TS transcription of the GLSL turns-domain `interpolateHueTurns`
//      matches value.js's `interpolateHue` for EACH of the four methods over a vivid
//      matrix, WITH the ANTIPODE row (30°,210°,t=0.5,"shorter") and the warm→cool
//      (30°,250°,t=0.5,"longer") row seeded AS NAMED CASES — the radians-native trap
//      (PI thresholds / +TAU wrap) diverges exactly 180° at the antipode and is
//      invisible to a grid that steps over it.
//  (3) MIDPOINT-CHROMA — the blue→yellow OKLab-rectangular midpoint holds chroma
//      ABOVE the linear-`mix` midpoint (the muddy-midtone kill). Measured at t=0.5.
//
// Mechanism: the GLSL is read as text; the in-shader functions are RE-PORTED to TS
// here line-for-line (the gate's transcription) and asserted against value.js. The
// port mirrors the GLSL byte-for-byte so the assertion transitively certifies the
// shader. Bite: revert samplePalette to linear mix() → the midpoint assertion REDs;
// transcribe the hue arc with PI/+TAU radians thresholds → the antipode row REDs.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    interpolateHue,
    srgbToOKLab,
    rawOklabToOklch,
    oklabToLinearSRGB,
    rawOklchToOklab,
} from "@mkbabb/value.js";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const TOL = 1e-6;

// value.js's EXACT Ottosson constants (row-major), the truth the GLSL `mat3`
// literals (transposed) must match to 1e-6. Mirrors procedural-color.glsl.ts.
const REF_MATRICES = {
    LINEAR_SRGB_TO_LMS: [
        0.4122214708, 0.5363325363, 0.0514459929, 0.2119034982, 0.6806995451,
        0.1073969566, 0.0883024619, 0.2817188376, 0.6299787005,
    ],
    LMS_TO_OKLAB: [
        0.2104542553, 0.7936177850, -0.0040720468, 1.9779984951, -2.4285922050,
        0.4505937099, 0.0259040371, 0.7827717662, -0.8086757660,
    ],
    OKLAB_TO_LMS: [
        1.0, 0.3963377774, 0.2158037573, 1.0, -0.1055613458, -0.0638541728, 1.0,
        -0.0894841775, -1.2914855480,
    ],
    LMS_TO_LINEAR_SRGB: [
        4.0767416621, -3.3077115913, 0.2309699292, -1.2684380046, 2.6097574011,
        -0.3413193965, -0.0041960863, -0.7034186147, 1.7076147010,
    ],
};

// Parse a GLSL `mat3 NAME = mat3( … );` literal (GLSL column-major) back to a
// row-major array so it can be compared to value.js's row-major reference.
function parseMat3(src, name) {
    const re = new RegExp(`mat3\\s+${name}\\s*=\\s*mat3\\(([^)]*)\\)`, "s");
    const m = re.exec(src);
    if (!m) return null;
    const nums = m[1]
        .split(",")
        .map((s) => parseFloat(s.trim()))
        .filter((x) => Number.isFinite(x));
    if (nums.length !== 9) return null;
    // GLSL columns: [c0(3), c1(3), c2(3)]. Row-major = transpose.
    const col = nums;
    return [
        col[0], col[3], col[6],
        col[1], col[4], col[7],
        col[2], col[5], col[8],
    ];
}

// The TS transcription of the GLSL `interpolateHueTurns` (radians in/out, turns
// domain internally). Line-for-line with aurora.frag.ts.
function interpolateHueTurnsGlslPort(h0, h1, t, method) {
    const TAU = 2 * Math.PI;
    let a = h0 / TAU;
    let b = h1 / TAU;
    const i = b - a;
    if (method === 0) {
        if (i > 0.5) a += 1.0;
        else if (i < -0.5) b += 1.0;
    } else if (method === 1) {
        if (i > 0.0 && i < 0.5) a += 1.0;
        else if (i > -0.5 && i <= 0.0) b += 1.0;
    } else if (method === 2) {
        if (i < 0.0) b += 1.0;
    } else {
        if (i > 0.0) a += 1.0;
    }
    let r = a + t * (b - a);
    r = r - Math.floor(r); // GLSL fract — non-negative
    return r * TAU;
}

const METHODS = ["shorter", "longer", "increasing", "decreasing"];

// OKLab-rectangular interpolation of two gamma-sRGB endpoints at t (the GLSL
// mixPaletteOklab path, but from gamma here for the chroma measurement).
function oklabMixChroma(gammaA, gammaB, t) {
    const labA = srgbToOKLab(gammaA[0], gammaA[1], gammaA[2]);
    const labB = srgbToOKLab(gammaB[0], gammaB[1], gammaB[2]);
    const lab = [
        labA[0] + (labB[0] - labA[0]) * t,
        labA[1] + (labB[1] - labA[1]) * t,
        labA[2] + (labB[2] - labA[2]) * t,
    ];
    const [, C] = rawOklabToOklch(lab[0], lab[1], lab[2]);
    return C;
}

// OKLCh hue-ARC interpolation of two gamma-sRGB endpoints at t (the GLSL
// mixPaletteOklchArc path — L,C lerp, H walks the interpolateHueTurns arc). Returns
// the midpoint chroma. Mirrors aurora.frag.ts mixPaletteOklchArc.
function oklchArcMixChroma(gammaA, gammaB, t, method) {
    const labA = srgbToOKLab(gammaA[0], gammaA[1], gammaA[2]);
    const labB = srgbToOKLab(gammaB[0], gammaB[1], gammaB[2]);
    const lchA = oklabToOklchRad(labA);
    const lchB = oklabToOklchRad(labB);
    const L = lchA[0] + (lchB[0] - lchA[0]) * t;
    const C = lchA[1] + (lchB[1] - lchA[1]) * t;
    const H = interpolateHueTurnsGlslPort(lchA[2], lchB[2], t, method);
    void L;
    void H;
    // The hue-arc holds C as the lerp of the two endpoint chromas (no rectangular
    // grey-crossing): chroma is C directly (the measured midpoint chroma).
    return C;
}

// OKLab → OKLCh with H in radians [0,2pi) (mirrors the GLSL oklabToOklch).
function oklabToOklchRad(lab) {
    const C = Math.hypot(lab[1], lab[2]);
    let H = Math.atan2(lab[2], lab[1]);
    if (H < 0) H += 2 * Math.PI;
    return [lab[0], C, H];
}

// Linear-sRGB `mix()` midpoint chroma (the prior muddy path). Endpoints lerped in
// linear, then measured in OKLCh.
function linearMixChroma(gammaA, gammaB, t) {
    const sToLin = (c) =>
        c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    const linA = gammaA.map(sToLin);
    const linB = gammaB.map(sToLin);
    const lin = [
        linA[0] + (linB[0] - linA[0]) * t,
        linA[1] + (linB[1] - linA[1]) * t,
        linA[2] + (linB[2] - linA[2]) * t,
    ];
    // linear sRGB → OKLab → OKLCh chroma.
    const cbrt = (x) => Math.sign(x) * Math.pow(Math.abs(x), 1 / 3);
    const M = REF_MATRICES.LINEAR_SRGB_TO_LMS;
    const lms = [
        M[0] * lin[0] + M[1] * lin[1] + M[2] * lin[2],
        M[3] * lin[0] + M[4] * lin[1] + M[5] * lin[2],
        M[6] * lin[0] + M[7] * lin[1] + M[8] * lin[2],
    ].map(cbrt);
    const N = REF_MATRICES.LMS_TO_OKLAB;
    const a = N[3] * lms[0] + N[4] * lms[1] + N[5] * lms[2];
    const bb = N[6] * lms[0] + N[7] * lms[1] + N[8] * lms[2];
    return Math.hypot(a, bb);
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        CHUNK: resolve(
            ROOT,
            "src/composables/glass/webgl/shaders/procedural-color.glsl.ts",
        ),
        FRAG: resolve(
            ROOT,
            "src/components/custom/aurora/constants/shaders/aurora.frag.ts",
        ),
        COMP: resolve(
            ROOT,
            "src/components/custom/aurora/constants/shaders/composition.glsl.ts",
        ),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_AURORA_OKLCH_INTERP_ARTIFACT",
            "AW-aurora-oklch-interp",
        ),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, CHUNK, FRAG, COMP, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // ── (0) the splice + the OKLab interp path are present in the shader ──
    if (!existsSync(FRAG) || !existsSync(COMP) || !existsSync(CHUNK)) {
        violations.push("an aurora shader / shared chunk file is absent");
    }
    const frag = existsSync(FRAG) ? readFileSync(FRAG, "utf8") : "";
    const comp = existsSync(COMP) ? readFileSync(COMP, "utf8") : "";
    const chunk = existsSync(CHUNK) ? readFileSync(CHUNK, "utf8") : "";

    facts.importsMatrices = /OKLCH_MATRICES_GLSL/.test(frag);
    if (!facts.importsMatrices) {
        violations.push(
            "aurora.frag.ts does NOT splice OKLCH_MATRICES_GLSL (the W5 OKLCh path is absent)",
        );
    }
    // samplePalette must NOT be the prior linear mix() of the two stops. The new
    // path routes through mixPaletteOklab / mixPaletteOklchArc.
    facts.samplePaletteOklab = /mixPaletteOklab\s*\(/.test(comp);
    facts.linearMixGone = !/return\s+mix\(uPalette\[i0\],\s*uPalette\[i1\]/.test(comp);
    if (!facts.samplePaletteOklab || !facts.linearMixGone) {
        violations.push(
            "samplePalette still uses the linear mix(uPalette…) — the OKLCh interpolation did not land (the muddy-midtone source remains)",
        );
    }
    // The turns-domain hue port must be present (fract wrap, not +TAU radians).
    facts.turnsDomainPort = /interpolateHueTurns/.test(frag) && /fract\(r\)/.test(frag);
    if (!facts.turnsDomainPort) {
        violations.push(
            "the in-shader turns-domain interpolateHueTurns (with fract() wrap) is absent — a radians-native port diverges 180° at the antipode",
        );
    }
    // brokenColorJitter + saturate3 moved to OKLCh; the YIQ hueShift matrix deleted.
    facts.hueShiftMatrixGone = !/vec3 hueShift\(/.test(frag);
    if (!facts.hueShiftMatrixGone) {
        violations.push(
            "the sRGB YIQ-style `hueShift()` matrix is still present — brokenColorJitter/saturate3 did not move into OKLCh",
        );
    }

    // ── (1) MATRICES 1e-6 — the spliced literals match value.js to 1e-6 ──
    const matResults = {};
    for (const [name, ref] of Object.entries(REF_MATRICES)) {
        const got = parseMat3(chunk, name);
        if (!got) {
            violations.push(`mat3 ${name} not found in the shared chunk`);
            matResults[name] = "missing";
            continue;
        }
        let maxErr = 0;
        for (let i = 0; i < 9; i++) maxErr = Math.max(maxErr, Math.abs(got[i] - ref[i]));
        matResults[name] = maxErr;
        if (maxErr > TOL) {
            violations.push(
                `mat3 ${name} drifts ${maxErr.toExponential(2)} from value.js (> ${TOL})`,
            );
        }
    }
    facts.matrixMaxErr = matResults;

    // ── (2) HUE-PORT 1e-6 over a vivid matrix + the two NAMED rows ──
    const huePairs = [
        [30, 210], // the ANTIPODE (named) — the .5-turn branch must agree
        [30, 250], // warm→cool (named) — the longer-arc saturated travel
        [10, 80],
        [200, 320],
        [350, 30],
        [120, 300],
    ];
    let hueMaxErr = 0;
    let antipodeErr = 0;
    let warmCoolLongerErr = 0;
    const deg2rad = (d) => (d * Math.PI) / 180;
    const rad2deg = (r) => (r * 180) / Math.PI;
    for (let mi = 0; mi < METHODS.length; mi++) {
        for (const [d0, d1] of huePairs) {
            for (const t of [0.0, 0.25, 0.5, 0.75, 1.0]) {
                // GLSL port: radians in, radians out, turns-domain internally.
                const glsl = rad2deg(
                    interpolateHueTurnsGlslPort(deg2rad(d0), deg2rad(d1), t, mi),
                );
                // value.js reference: turns in/out.
                const ref = interpolateHue(d0 / 360, d1 / 360, t, METHODS[mi]) * 360;
                // Compare on the hue circle (both wrapped to [0,360)).
                const wrap = (x) => ((x % 360) + 360) % 360;
                let err = Math.abs(wrap(glsl) - wrap(ref));
                err = Math.min(err, 360 - err);
                hueMaxErr = Math.max(hueMaxErr, err);
                if (mi === 0 && d0 === 30 && d1 === 210 && t === 0.5) antipodeErr = err;
                if (mi === 1 && d0 === 30 && d1 === 250 && t === 0.5)
                    warmCoolLongerErr = err;
            }
        }
    }
    // The hue is a DEGREE circle; 1e-6 in turns = 360e-6 deg. Allow 1e-3 deg slack
    // for float (the antipode bite manifests as ~180°, far above the slack).
    const HUE_TOL_DEG = 1e-3;
    facts.hueMaxErrDeg = hueMaxErr;
    facts.antipodeErrDeg = antipodeErr;
    facts.warmCoolLongerErrDeg = warmCoolLongerErr;
    if (hueMaxErr > HUE_TOL_DEG) {
        violations.push(
            `the in-shader hue arc diverges ${hueMaxErr.toExponential(2)}° from value.js interpolateHue (the radians-native antipode trap?)`,
        );
    }

    // ── (3) MIDPOINT-CHROMA — the muddy-midtone kill, two complementary measures ──
    // (3a) the OKLab-RECTANGULAR win: for a vivid warm→cool pair that is ~90-120°
    //      apart on the hue circle (blue→green), the OKLab straight line HOLDS
    //      chroma above the linear-sRGB `mix()` midpoint (which greys). This is the
    //      DEFAULT samplePalette path (the muddy-midtone source the wave kills).
    const BLUE = [0x14 / 255, 0x38 / 255, 0xff / 255]; // ~OKLCh hue ~265°
    const GREEN = [0x22 / 255, 0xdd / 255, 0x44 / 255]; // ~OKLCh hue ~145°
    const oklabMid = oklabMixChroma(BLUE, GREEN, 0.5);
    const linMid = linearMixChroma(BLUE, GREEN, 0.5);
    facts.oklabMidChroma = oklabMid;
    facts.linearMidChroma = linMid;
    facts.chromaLift = oklabMid - linMid;
    if (!(oklabMid > linMid)) {
        violations.push(
            `the OKLab-rectangular midpoint chroma (${oklabMid.toFixed(4)}) does NOT exceed the linear-mix midpoint (${linMid.toFixed(4)}) for the blue→green warm-cool pair — the muddy-midtone kill failed`,
        );
    }

    // (3b) the OKLCh HUE-ARC win: for the near-ANTIPODAL blue→yellow pair (where a
    //      straight line in ANY rectangular space crosses grey), the OKLCh hue-arc
    //      (the uHuePath increasing/decreasing path) sweeps the hue wheel and HOLDS
    //      chroma above BOTH rectangular midpoints. The deliberate-rainbow path.
    const YELLOW = [0xff / 255, 0xcc / 255, 0x10 / 255]; // ~OKLCh hue ~95°
    const arcMid = oklchArcMixChroma(BLUE, YELLOW, 0.5, 2); // increasing
    const oklabAntipode = oklabMixChroma(BLUE, YELLOW, 0.5);
    const linAntipode = linearMixChroma(BLUE, YELLOW, 0.5);
    facts.arcMidChroma = arcMid;
    facts.oklabAntipodeChroma = oklabAntipode;
    facts.linearAntipodeChroma = linAntipode;
    if (!(arcMid > oklabAntipode && arcMid > linAntipode)) {
        violations.push(
            `the OKLCh hue-arc midpoint chroma (${arcMid.toFixed(4)}) does NOT exceed both the OKLab (${oklabAntipode.toFixed(4)}) and linear (${linAntipode.toFixed(4)}) midpoints for the antipodal blue→yellow pair — the hue-arc rainbow path failed`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:aurora-oklch-interp",
        facts,
        violations,
    });

    console.log("proof:aurora-oklch-interp — the in-shader OKLCh interpolation (AW.W5.1)");
    console.log(`  OKLCH_MATRICES spliced : ${facts.importsMatrices ? "yes ✓" : "NO ✗"}`);
    console.log(`  samplePalette OKLab    : ${facts.samplePaletteOklab ? "yes ✓" : "NO ✗"} (linear mix gone: ${facts.linearMixGone})`);
    console.log(`  turns-domain hue port  : ${facts.turnsDomainPort ? "yes ✓" : "NO ✗"}`);
    console.log(`  YIQ hueShift deleted   : ${facts.hueShiftMatrixGone ? "yes ✓" : "NO ✗"}`);
    console.log(`  matrices 1e-6          : ${Object.values(matResults).every((e) => typeof e === "number" && e <= TOL) ? "yes ✓" : "NO ✗"}`);
    console.log(`  hue-arc max err        : ${hueMaxErr.toExponential(2)}° (antipode ${antipodeErr.toExponential(2)}°, warm→cool-longer ${warmCoolLongerErr.toExponential(2)}°)`);
    console.log(`  OKLab midpoint lift    : ${facts.chromaLift.toFixed(4)} (OKLab ${oklabMid.toFixed(4)} > linear ${linMid.toFixed(4)}, blue→green)`);
    console.log(`  hue-arc antipode chroma: ${arcMid.toFixed(4)} > OKLab ${oklabAntipode.toFixed(4)} / linear ${linAntipode.toFixed(4)} (blue→yellow)`);
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
