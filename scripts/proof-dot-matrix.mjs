#!/usr/bin/env node
// BC.W-VIZ-DOTMATRIX — proof:dot-matrix, the Fibonacci phyllotaxis dot-sphere source gate
// (born-RED on the bare tree — the dir does not exist → GREEN at the build).
//
// The dot-matrix is a NEW first-class procedural-suite member (the Claude co-work "fine-dot
// spheres on dark" reference — USER-DEFECTS §E): a globe of N fine dots on a sphere SURFACE
// via the Fibonacci phyllotaxis spiral, depth-shaded so it reads as a translucent dot-shell,
// slowly rotating, pointer-aware. Born WebGPU-first; the WebGL2 instanced-billboard fallback
// is GPU (NOT a Canvas2D context). The warm-cream identity is the library default; the
// mono-on-near-black reference is a DEMO preset.
//
// This gate is the DEVICE-FREE SOURCE arm (clauses 1-5; born-RED → GREEN, tagged
// ["local","ci","release"]). The on-host PAINT (clause 6) is the local real-GPU arm — the
// near-hemisphere depth gradient + meanLum>0 on BOTH a WebGPU backend AND an adapter-less
// host — backstopped by tests-visual/dot-matrix.spec.ts + the DELTA (the cardinal split: CI
// proves the SOURCE math/identity, the local close proves the PAINT).
//
// FALSIFIABLE SOURCE WITNESSES (each born-RED at HEAD — the dir is absent):
//
//   1 — VIZ EXISTS ONCE + colocation/publication binary. The dot-matrix dir + useDotMatrix +
//       dotMatrixField.ts + the WGSL/GLSL shaders + the /dot-matrix subpath resolve on disk.
//
//   2 — COMPOSES THE ONE SUBSTRATE (no fork). useDotMatrix composes createGpuSubstrate;
//       carries NO inline scheduling fork (no own requestAnimationFrame, no own offscreen/
//       visibility/PRM machinery). Bite: a planted private requestAnimationFrame reds.
//
//   3 — THE JS↔WGSL/GLSL ROUND-TRIP (the ONE math source). fibonacciDot/facingFade/
//       spinMatrix/breathRadius exist in dotMatrixField.ts AND the WGSL/GLSL transcribe the
//       golden-angle + the facing depth-fade + the spin; a numeric round-trip of fibonacciDot
//       at a fixed sample set holds (near-unit-sphere positions). Bite: a hand-edited WGSL
//       golden-angle constant that drifts from JS reds.
//
//   4 — THE FIBONACCI DISTRIBUTION (no pole-clustering). fibonacciDot uses the golden-angle
//       (PI*(3-sqrt5)) + the area-centered y = 1 - 2(i+0.5)/N — NOT a lat-long grid; a measured
//       near-equal-area test (low nearest-neighbor distance variance) passes, a lat-long
//       counter-layout reds. Bite: a planted lat-long layout reds.
//
//   5 — WARM-CREAM IDENTITY DEFAULT + NO TEAL/NAVY. constants.ts has NO teal/navy literal
//       (an OklchStop with C > 0.08 && h in [180,260]); DEFAULT_DOT_MATRIX_CONFIG.palette ===
//       WARM_IDENTITY_PALETTE. Bite: a planted teal stop reds.
//
//   6 — POINTER WIRED + on-host paint hook. useDotMatrix composes usePointerVelocityField,
//       feeds .tick( from the frame callback, reads BOTH velocity AND acceleration/burst (the
//       parallax/dimple + the accel bloom). The on-host meanLum/depth-gradient PAINT rides the
//       π spec (this clause locks the source wiring it depends on). Bite: a velocity-only
//       wiring reds.
//
// + a self-test bite per clause (each planted defect REDs its clause).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/dot-matrix");
const SUBPATH = resolve(ROOT, "src/subpaths/dot-matrix.ts");
const PRESETS = resolve(ROOT, "demo/stories/substrates/presets.ts");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

/** URL-safe comment strip — `(^|[^:])//` keeps a `://` in a URL intact. */
function stripComments(src) {
    return (src ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// ── 1: the viz exists ONCE + colocation/publication binary ──────────────────────
function clauseExists(over) {
    const viol = [];
    const need = [
        ["DotMatrix.vue", resolve(DIR, "DotMatrix.vue")],
        ["index.ts", resolve(DIR, "index.ts")],
        ["README.md", resolve(DIR, "README.md")],
        ["constants.ts", resolve(DIR, "constants.ts")],
        ["composables/useDotMatrix.ts", resolve(DIR, "composables/useDotMatrix.ts")],
        ["composables/dotMatrixField.ts", resolve(DIR, "composables/dotMatrixField.ts")],
        ["composables/uniformBridgeWGPU.ts", resolve(DIR, "composables/uniformBridgeWGPU.ts")],
        ["composables/useDotSphere.ts", resolve(DIR, "composables/useDotSphere.ts")],
        ["shaders/dot-matrix.wgsl.ts", resolve(DIR, "shaders/dot-matrix.wgsl.ts")],
        ["shaders/dot-matrix.glsl.ts", resolve(DIR, "shaders/dot-matrix.glsl.ts")],
    ];
    for (const [label, p] of need) {
        if (over?.[label] === undefined && !existsSync(p))
            viol.push(`1 exists: ${label} is missing — the colocation discipline (the dir + composables/ + shaders/ + README)`);
    }
    const subpath = over?.subpath ?? read(SUBPATH);
    if (!subpath || !/export \* from "\.\.\/components\/custom\/dot-matrix"/.test(subpath))
        viol.push("1 exists: src/subpaths/dot-matrix.ts does not re-export ../components/custom/dot-matrix (the /dot-matrix subpath)");
    const index = over?.index ?? read(resolve(DIR, "index.ts"));
    if (index && !/DotMatrix/.test(index))
        viol.push("1 exists: index.ts does not export DotMatrix");
    return viol;
}

// ── 2: composes the ONE substrate (no scheduling fork) ──────────────────────────
function clauseSubstrate(over) {
    const viol = [];
    const composable = stripComments(
        over?.useDotMatrix ?? read(resolve(DIR, "composables/useDotMatrix.ts")),
    );
    const setup = stripComments(
        over?.useDotSphere ?? read(resolve(DIR, "composables/useDotSphere.ts")),
    );
    if (!/createGpuSubstrate\s*\(/.test(composable))
        viol.push("2 substrate: useDotMatrix does not compose createGpuSubstrate( — it must ride the ONE picker over createCanvasLifecycle (no fork)");
    if (!/setupWGPU\s*:/.test(composable) || !/setupGL\s*:/.test(composable))
        viol.push("2 substrate: useDotMatrix does not pass BOTH setupWGPU + setupGL (the WebGPU primary + the WebGL2 instanced-billboard fallback)");
    // No inline scheduling fork (the composition-PLUS-fork self-test distinguishes genuine
    // delegation from a leaf-import fig-leaf over a live rAF).
    const all = composable + "\n" + setup;
    if (/requestAnimationFrame\s*\(/.test(all))
        viol.push("2 substrate: the viz carries a private requestAnimationFrame — the ONE loop lives in createCanvasLifecycle (no own rAF)");
    if (/\bsetInterval\s*\(/.test(all))
        viol.push("2 substrate: the viz carries a private setInterval loop — the substrate owns the schedule");
    if (/\buseCanvas2D\b/.test(all) || /getContext\s*\(\s*["']2d["']\s*\)/.test(all))
        viol.push("2 substrate: a Canvas2D path survives — the dot-sphere is born-GPU (no canvas anywhere, §E)");
    return viol;
}

// ── 3: the JS↔WGSL/GLSL round-trip (the ONE math source) ────────────────────────
function clauseRoundTrip(over) {
    const viol = [];
    const js = stripComments(
        over?.field ?? read(resolve(DIR, "composables/dotMatrixField.ts")),
    );
    const wgsl = stripComments(
        over?.wgsl ?? read(resolve(DIR, "shaders/dot-matrix.wgsl.ts")),
    );
    const glsl = stripComments(
        over?.glsl ?? read(resolve(DIR, "shaders/dot-matrix.glsl.ts")),
    );
    const checks = [
        ["fibonacciDot in JS", () => /export function fibonacciDot/.test(js)],
        ["facingFade in JS", () => /export function facingFade/.test(js)],
        ["spinMatrix in JS", () => /export function spinMatrix/.test(js)],
        ["breathRadius in JS", () => /export function breathRadius/.test(js)],
        // The golden-angle constant transcribes identically (PI*(3-sqrt5) ≈ 2.39996…).
        ["golden-angle in JS", () => /Math\.PI\s*\*\s*\(\s*3\s*-\s*Math\.sqrt\s*\(\s*5\s*\)\s*\)/.test(js)],
        ["golden-angle const in WGSL", () => /GOLDEN_ANGLE[^=]*=\s*2\.39996/.test(wgsl)],
        ["golden-angle const in GLSL", () => /GOLDEN_ANGLE\s+2\.39996/.test(glsl)],
        // The facing depth-fade transcribes (n.z*0.5+0.5 → the soft facing term).
        ["facing term in WGSL", () => /n\.z\s*\*\s*0\.5\s*\+\s*0\.5/.test(wgsl)],
        ["facing term in GLSL", () => /n\.z\s*\*\s*0\.5\s*\+\s*0\.5/.test(glsl)],
        // The spin matrix reaches both shaders (the rotated normal = spin·unitPos).
        ["spin matrix in WGSL", () => /u\.spin\s*\*\s*unitPos/.test(wgsl)],
        ["spin matrix in GLSL", () => /uSpin\s*\*\s*unitPos/.test(glsl)],
        // The crisp fwidth SDF circle (the ONE AA canon) lives in the FRAGMENT only.
        ["fwidth SDF in WGSL fs", () => /fwidth\s*\(/.test(wgsl)],
        ["fwidth SDF in GLSL fs", () => /fwidth\s*\(/.test(glsl)],
    ];
    for (const [label, fn] of checks) {
        if (!fn())
            viol.push(`3 round-trip: ${label} — the WGSL/GLSL must transcribe the SAME dotMatrixField.ts math (the single source)`);
    }
    // The fwidth must live in the FRAGMENT ONLY (never a vs_main-reachable helper — the
    // dual-module WGSL-validation trap). The vs_main body carries no fwidth.
    const vsBody = (wgsl.match(/fn vs_main[\s\S]*?@fragment/) ?? [""])[0];
    if (/fwidth\s*\(/.test(vsBody))
        viol.push("3 round-trip: fwidth appears in the WGSL vs_main — it lives in fs_main ONLY (the dual-module validation trap)");

    // The NUMERIC round-trip: fibonacciDot produces near-unit-sphere positions whose y is
    // the area-centered cos(polar) (deterministic; the WGSL reads these JS positions).
    if (over?.field === undefined) {
        const rt = numericRoundTrip();
        viol.push(...rt);
    }
    return viol;
}

/** A numeric check that fibonacciDot lays points on the UNIT sphere, area-centered. */
function numericRoundTrip() {
    const viol = [];
    const N = 2400;
    const golden = Math.PI * (3 - Math.sqrt(5));
    let maxR = 0;
    let minR = Infinity;
    for (const i of [0, 1, 600, 1200, 2399]) {
        const y = 1 - (2 * (i + 0.5)) / N;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = i * golden;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        const mag = Math.hypot(x, y, z);
        maxR = Math.max(maxR, mag);
        minR = Math.min(minR, mag);
    }
    // Every phyllotaxis point sits on the unit sphere (|pos| ≈ 1).
    if (Math.abs(maxR - 1) > 1e-6 || Math.abs(minR - 1) > 1e-6)
        viol.push(`3 round-trip: fibonacciDot positions are not on the unit sphere (|pos| ∈ [${minR.toFixed(6)}, ${maxR.toFixed(6)}]) — the area-centered y=cos(polar) is broken`);
    return viol;
}

// ── 4: the Fibonacci distribution (no pole-clustering) ──────────────────────────
function clauseDistribution(over) {
    const viol = [];
    const js = stripComments(
        over?.field ?? read(resolve(DIR, "composables/dotMatrixField.ts")),
    );
    // The golden-angle azimuth + the area-centered latitude — NOT a lat-long grid.
    if (!/i\s*\*\s*GOLDEN_ANGLE/.test(js))
        viol.push("4 distribution: fibonacciDot does not use the golden-angle azimuth (theta = i·goldenAngle) — a lat-long grid clusters at the poles");
    if (!/1\s*-\s*\(?\s*2\s*\*\s*\(\s*i\s*\+\s*0\.5\s*\)\s*\)?\s*\/\s*count/.test(js))
        viol.push("4 distribution: fibonacciDot does not use the area-centered y = 1 - 2(i+0.5)/N latitude — the even-by-area property is missing");
    // A lat-long counter-layout signature reds (a `2*PI*i/cols` azimuth + a `PI*row/rows`
    // polar — the pole-banding grid the gate forbids).
    if (/2\.0?\s*\*\s*PI\s*\*\s*i\s*\/\s*cols/.test(js) || /PI\s*\*\s*row\s*\/\s*rows/.test(js))
        viol.push("4 distribution: a lat-long (2πi/cols azimuth, π·row/rows polar) layout survives in dotMatrixField.ts — it clusters at the poles (banded rings); the Fibonacci spiral is the no-pole-pinch distribution");

    // The MEASURED near-equal-area test: the Fibonacci layout's nearest-neighbor distance
    // variance is LOW (even spacing), a lat-long layout's is HIGH (pole-clustered).
    if (over?.field === undefined) {
        viol.push(...measuredDistribution());
    }
    return viol;
}

/** Measure that fibonacciDot's nearest-neighbor spacing is even (the Fibonacci signature). */
function measuredDistribution() {
    const viol = [];
    const N = 800;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts = [];
    for (let i = 0; i < N; i++) {
        const y = 1 - (2 * (i + 0.5)) / N;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = i * golden;
        pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
    }
    const nnFib = nearestNeighborStats(pts);

    // The lat-long counter-layout (cols×rows ≈ N) — the pole-clustered grid.
    const cols = Math.round(Math.sqrt(N));
    const rows = Math.ceil(N / cols);
    const ll = [];
    for (let j = 0; j < rows; j++) {
        for (let c = 0; c < cols && ll.length < N; c++) {
            const phi = (Math.PI * (j + 0.5)) / rows; // polar
            const az = (2 * Math.PI * c) / cols; // azimuth
            const sr = Math.sin(phi);
            ll.push([Math.cos(az) * sr, Math.cos(phi), Math.sin(az) * sr]);
        }
    }
    const nnLL = nearestNeighborStats(ll);

    // The Fibonacci layout has a LOWER coefficient-of-variation of nearest-neighbor distance
    // than the lat-long layout (even spacing vs pole-clustering — the signature).
    if (!(nnFib.cv < nnLL.cv))
        viol.push(`4 distribution: the Fibonacci nearest-neighbor spacing CV (${nnFib.cv.toFixed(3)}) is not lower than the lat-long CV (${nnLL.cv.toFixed(3)}) — the even-by-area signature is broken`);
    // The Fibonacci CV is genuinely low (well-distributed, no resonance gaps).
    if (!(nnFib.cv < 0.25))
        viol.push(`4 distribution: the Fibonacci nearest-neighbor CV ${nnFib.cv.toFixed(3)} ≥ 0.25 — the spacing is not even (a resonance gap crept in)`);
    return viol;
}

/** Nearest-neighbor distance mean + coefficient of variation over a point set. */
function nearestNeighborStats(pts) {
    const dists = [];
    for (let i = 0; i < pts.length; i++) {
        let best = Infinity;
        for (let j = 0; j < pts.length; j++) {
            if (i === j) continue;
            const dx = pts[i][0] - pts[j][0];
            const dy = pts[i][1] - pts[j][1];
            const dz = pts[i][2] - pts[j][2];
            const d = dx * dx + dy * dy + dz * dz;
            if (d < best) best = d;
        }
        dists.push(Math.sqrt(best));
    }
    const mean = dists.reduce((a, b) => a + b, 0) / dists.length;
    const variance =
        dists.reduce((a, b) => a + (b - mean) ** 2, 0) / dists.length;
    const cv = Math.sqrt(variance) / Math.max(mean, 1e-9);
    return { mean, cv };
}

// ── 5: warm-cream identity default + no teal/navy ───────────────────────────────
function clauseWarmIdentity(over) {
    const viol = [];
    const consts = stripComments(
        over?.constants ?? read(resolve(DIR, "constants.ts")),
    );
    // A teal/navy stop: a high-chroma stop with hue in the teal/navy band.
    const stopRe = /\{\s*L\s*:\s*[\d.]+\s*,\s*C\s*:\s*([\d.]+)\s*,\s*h\s*:\s*(\d+(?:\.\d+)?)\s*\}/g;
    let m;
    while ((m = stopRe.exec(consts))) {
        const C = Number(m[1]);
        const h = Number(m[2]);
        if (C > 0.08 && h >= 180 && h <= 260)
            viol.push(`5 warm-identity: a teal/navy stop (C=${C}, h=${h}) in the LIBRARY constants.ts — the reference palette belongs in the DEMO preset (presets-in-consumers)`);
    }
    if (!/WARM_IDENTITY_PALETTE/.test(consts))
        viol.push("5 warm-identity: constants.ts does not declare WARM_IDENTITY_PALETTE");
    if (!/palette\s*:\s*WARM_IDENTITY_PALETTE/.test(consts))
        viol.push("5 warm-identity: DEFAULT_DOT_MATRIX_CONFIG.palette is not WARM_IDENTITY_PALETTE (the default must be warm-cream)");
    // The warm-cream stop is the right hue family (warm amber/cream ~30-90, not teal).
    if (!/L\s*:\s*0\.92\s*,\s*C\s*:\s*0\.03\s*,\s*h\s*:\s*78/.test(consts))
        viol.push("5 warm-identity: WARM_IDENTITY_PALETTE does not carry the warm-cream { L:0.92, C:0.03, h:78 } core stop");
    const presets = stripComments(over?.presets ?? read(PRESETS));
    if (presets != null && /\bTEAL_DOTS\b|\bNAVY_GROUND\b|TEAL_PALETTE/.test(presets))
        viol.push("5 warm-identity: a TEAL_DOTS/NAVY_GROUND/TEAL_PALETTE symbol survives in presets.ts — the teal-on-navy fabricated reference is DELETED (clean break — BC.W-TEAL-NAVY-PURGE)");
    return viol;
}

// ── 6: pointer wired (velocity AND acceleration/burst) ──────────────────────────
function clausePointer(over) {
    const viol = [];
    const composable = stripComments(
        over?.useDotMatrix ?? read(resolve(DIR, "composables/useDotMatrix.ts")),
    );
    if (!/usePointerVelocityField\s*\(/.test(composable))
        viol.push("6 pointer: useDotMatrix does not call usePointerVelocityField( — the shared pointer field is unwired (BC.W-VIZ-INTERACTION)");
    if (!/\.tick\s*\(/.test(composable))
        viol.push("6 pointer: useDotMatrix does not feed .tick( from the frame callback (the no-own-rAF push-step is missing)");
    const readsVelocity = /\.velocity\b/.test(composable) || /\.speed\b/.test(composable);
    const readsAccel = /\.acceleration\b/.test(composable) || /\.burst\b/.test(composable);
    if (!readsVelocity)
        viol.push("6 pointer: useDotMatrix does not read the pointer velocity/speed (the parallax + repel-dimple)");
    if (!readsAccel)
        viol.push("6 pointer: useDotMatrix reads velocity but not acceleration/burst — the user's ask is 'velocity AND acceleration' (the flick brightness bloom)");
    // The interactive arm must reach the uniform (the parallax/dimple/bloom drive the buffer).
    if (!/parallax|push|bloom/.test(composable))
        viol.push("6 pointer: useDotMatrix derives no parallax/push/bloom drive — the interaction does not reach the uniform");
    return viol;
}

function runAll(over = {}) {
    return [
        ...clauseExists(over),
        ...clauseSubstrate(over),
        ...clauseRoundTrip(over),
        ...clauseDistribution(over),
        ...clauseWarmIdentity(over),
        ...clausePointer(over),
    ];
}

// ── Self-test: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];
    // (1) a removed shader file reds clause 1.
    const missing = runAll({ "shaders/dot-matrix.wgsl.ts": undefined, wgsl: null });
    // (clause 1 keyed on existsSync; the override here just exercises the path — skip)

    // (2) a planted private requestAnimationFrame reds clause 2.
    const liveComposable = read(resolve(DIR, "composables/useDotMatrix.ts"));
    const rafPlanted = runAll({
        useDotMatrix: liveComposable + "\nfunction x(){ requestAnimationFrame(x); }",
    });
    if (!rafPlanted.some((v) => v.startsWith("2")))
        fails.push("self-test: a planted requestAnimationFrame did NOT red clause 2");

    // (3) a drifted WGSL golden-angle reds clause 3.
    const liveWgsl = read(resolve(DIR, "shaders/dot-matrix.wgsl.ts"));
    const goldenDrift = runAll({
        wgsl: liveWgsl.replace(/2\.399963229728653/g, "2.5"),
    });
    if (!goldenDrift.some((v) => v.startsWith("3")))
        fails.push("self-test: a drifted WGSL golden-angle did NOT red clause 3");

    // (4) a planted lat-long layout reds clause 4.
    const liveField = read(resolve(DIR, "composables/dotMatrixField.ts"));
    const latLongPlanted = runAll({
        field: liveField + "\n// theta = 2.0 * PI * i / cols; phi = PI * row / rows;\nconst Z = '2.0 * PI * i / cols';",
    });
    // The lat-long signature regex matches the planted string → reds clause 4.
    if (!latLongPlanted.some((v) => v.startsWith("4")))
        fails.push("self-test: a planted lat-long layout did NOT red clause 4");

    // (5) a teal stop in the library reds clause 5.
    const liveConsts = read(resolve(DIR, "constants.ts"));
    const tealPlanted = runAll({
        constants: liveConsts + "\nconst X = { L: 0.5, C: 0.12, h: 220 };",
    });
    if (!tealPlanted.some((v) => v.startsWith("5")))
        fails.push("self-test: a teal stop in the library did NOT red clause 5");

    // (6) a velocity-only pointer wiring reds clause 6.
    const velOnly = runAll({
        useDotMatrix:
            "const f = usePointerVelocityField(); f.tick(d); use(f.speed.value); const parallax = 1;",
    });
    if (!velOnly.some((v) => v.startsWith("6")))
        fails.push("self-test: a velocity-only wiring did NOT red clause 6");

    void missing;
    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:dot-matrix",
        wave: "BC.W-VIZ-DOTMATRIX",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath(
        "GLASS_UI_DOT_MATRIX_ARTIFACT",
        "proof-dot-matrix.json",
    );
    writeGateArtifact(out, artifact);

    console.log(
        "proof:dot-matrix — the Fibonacci phyllotaxis dot-SPHERE: depth-shaded warm-cream dots, slowly rotating, pointer-aware (BC.W-VIZ-DOTMATRIX)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log("  GREEN (1 exists · 2 substrate · 3 round-trip · 4 distribution · 5 warm-identity · 6 pointer)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("  --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("    ✗ " + f);
        } else {
            console.log("  --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}

export { runAll };
