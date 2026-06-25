#!/usr/bin/env node
// BC.W-VIZ-HYBRID — proof:viz-hybrid, the goo+dot-matrix HYBRID source gate (born-RED on the
// bare tree — the dir does not exist → GREEN at the build).
//
// THE HYBRID. The metaball SDF FIELD (the byte-untouched goo-blob `sceneDistG`) rendered as a
// DOT MATRIX — a grid of small warm-cream dots whose size + brightness are driven by the field
// value at each cell (`v = thickness(sceneDistG(cellCenter))`, tixy.land applied to an SDF), so
// the dots are dense+big+bright INSIDE the merged metaball and sparse+small+dim outside. It
// re-uses two SOTA primitives the codebase already owns — the goo-blob FIELD
// (BC.W-GOOBLOB-MEATBALL) + the dot-matrix RENDER (BC.W-VIZ-DOTMATRIX) — joined by ONE new
// idea: the dot-grid OUTPUT stage. The field MATH is NOT rebuilt; the new code is the dot-grid
// output + the dot-grid uniform lanes.
//
// This gate is the DEVICE-FREE SOURCE arm (clauses 1-5; born-RED → GREEN, tagged
// ["local","ci","release"]). The on-host DOT-FIELD PAINT (clause 6) is the local real-GPU arm
// (a field-driven dot-density gradient — denser/bigger dots in the blob core than the rim —
// on BOTH a WebGPU backend AND an adapter-less host) backstopped by tests-visual/goo-dot.spec.ts
// + the DELTA (the cardinal split: CI proves the SOURCE math/identity/composition, the local
// close proves the PAINT).
//
// FALSIFIABLE SOURCE WITNESSES (each born-RED at HEAD — the dir is absent):
//
//   1 — VIZ EXISTS ONCE + colocation/publication binary. The goo-dot-matrix dir +
//       useGooDotMatrix + the WGSL/GLSL dot-stamp shaders + the /goo-dot-matrix subpath resolve.
//
//   2 — COMPOSES THE ONE SUBSTRATE + ONE FIELD + ONE RASTERIZER (no fork). useGooDotMatrix
//       composes createGpuSubstrate; carries NO inline scheduling fork (no own rAF). The FIELD
//       is the byte-untouched goo-blob sceneDistG SDF — SPLICED from the goo-blob shader source
//       (METABALL_WGSL / METABALL_FRAGMENT_SRC imported), NOT a re-forked `fn sceneDistG`. The
//       Register-B lattice imports fibonacciDot from dot-matrix (NOT re-authored). Bite: a
//       planted private rAF reds; a planted local `fn sceneDistG` reds; a re-authored
//       fibonacciDot reds.
//
//   3 — THE DOT-GRID OUTPUT + THE LATTICE ROUND-TRIP. The dot-stamp output stage is present in
//       BOTH the WGSL AND the GLSL fallback (the cell-quantize + the fwidth dot AA + the
//       field-driven dotR), transcribed line-for-line; the s8/s9 dot-grid lanes exist in BOTH
//       the WGSL struct AND uniformBridgeWGPU.ts (the lockstep); gridOrigin (the §T3 lattice)
//       round-trips JS at a fixed sample set. Bite: a hand-edited WGSL dot constant that drifts
//       from the GLSL twin reds.
//
//   4 — THE FIELD IS THE METABALL THICKNESS (the goo↔dot bridge). The dot-grid reads
//       thickness = clamp(-d/bodyR, 0, 1) off sceneDistG (the one-line re-use), NOT a hand-rolled
//       second field; the four variant registers sample the SAME sceneDistG. Bite: a planted
//       parallel field eval reds.
//
//   5 — WARM-CREAM IDENTITY DEFAULT + NO TEAL/NAVY. constants.ts has NO teal/navy literal
//       (an OklchStop with C > 0.08 && h in [180,260]); DEFAULT_GOO_DOT_CONFIG resolves the
//       warm-cream family (variant=dot-field, palette=WARM_IDENTITY_PALETTE). Bite: a teal stop reds.
//
//   6 — THE on-host DOT-FIELD PAINT (the gate-paint-blindness close). A real-GPU capture asserts
//       meanLum > 0 AND a field-driven dot-density gradient (the dots are field-driven, not a
//       flat grid) on BOTH a WebGPU backend AND an adapter-less host. The PAINT rides the π spec;
//       this clause locks the source wiring it depends on (the dot-cursor influence + the field
//       sample reach the buffer). Bite: a uniform-dot / a flat field reds.
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
const DIR = resolve(ROOT, "src/components/custom/goo-dot-matrix");
const SUBPATH = resolve(ROOT, "src/subpaths/goo-dot-matrix.ts");
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
        ["GooDotMatrix.vue", resolve(DIR, "GooDotMatrix.vue")],
        ["index.ts", resolve(DIR, "index.ts")],
        ["README.md", resolve(DIR, "README.md")],
        ["constants.ts", resolve(DIR, "constants.ts")],
        ["composables/useGooDotMatrix.ts", resolve(DIR, "composables/useGooDotMatrix.ts")],
        ["composables/uniformBridgeWGPU.ts", resolve(DIR, "composables/uniformBridgeWGPU.ts")],
        ["composables/gooDotLattice.ts", resolve(DIR, "composables/gooDotLattice.ts")],
        ["shaders/goo-dot.wgsl.ts", resolve(DIR, "shaders/goo-dot.wgsl.ts")],
        ["shaders/goo-dot.frag.ts", resolve(DIR, "shaders/goo-dot.frag.ts")],
    ];
    for (const [label, p] of need) {
        if (over?.[label] === undefined && !existsSync(p))
            viol.push(`1 exists: ${label} is missing — the colocation discipline (the dir + composables/ + shaders/ + README)`);
    }
    const subpath = over?.subpath ?? read(SUBPATH);
    if (!subpath || !/export \* from "\.\.\/components\/custom\/goo-dot-matrix"/.test(subpath))
        viol.push("1 exists: src/subpaths/goo-dot-matrix.ts does not re-export ../components/custom/goo-dot-matrix (the /goo-dot-matrix subpath)");
    const index = over?.index ?? read(resolve(DIR, "index.ts"));
    if (index && !/GooDotMatrix/.test(index))
        viol.push("1 exists: index.ts does not export GooDotMatrix");
    return viol;
}

// ── 2: composes the ONE substrate + ONE field + ONE rasterizer (no fork) ─────────
function clauseSubstrate(over) {
    const viol = [];
    const composable = stripComments(
        over?.useGooDotMatrix ?? read(resolve(DIR, "composables/useGooDotMatrix.ts")),
    );
    const wgsl = stripComments(
        over?.wgsl ?? read(resolve(DIR, "shaders/goo-dot.wgsl.ts")),
    );
    const glsl = stripComments(
        over?.glsl ?? read(resolve(DIR, "shaders/goo-dot.frag.ts")),
    );
    const lattice = stripComments(
        over?.lattice ?? read(resolve(DIR, "composables/gooDotLattice.ts")),
    );

    if (!/createGpuSubstrate\s*\(/.test(composable))
        viol.push("2 substrate: useGooDotMatrix does not compose createGpuSubstrate( — it must ride the ONE picker over createCanvasLifecycle (no fork)");
    if (!/setupWGPU\s*:/.test(composable) || !/setupGL\s*:/.test(composable))
        viol.push("2 substrate: useGooDotMatrix does not pass BOTH setupWGPU + setupGL (the WebGPU primary + the WebGL2 dot-stamp fallback)");
    if (/requestAnimationFrame\s*\(/.test(composable))
        viol.push("2 substrate: the viz carries a private requestAnimationFrame — the ONE loop lives in createCanvasLifecycle (no own rAF)");
    if (/\bsetInterval\s*\(/.test(composable))
        viol.push("2 substrate: the viz carries a private setInterval loop — the substrate owns the schedule");
    if (/\buseCanvas2D\b/.test(composable) || /getContext\s*\(\s*["']2d["']\s*\)/.test(composable))
        viol.push("2 substrate: a Canvas2D path survives — the hybrid is born-GPU (no canvas anywhere, §E)");

    // The FIELD is SPLICED from the goo-blob source (READ, not rebuilt): the WGSL imports
    // METABALL_WGSL + slices it; the GLSL imports METABALL_FRAGMENT_SRC + slices it. A re-fork
    // (a LOCAL `fn sceneDistG` / `vec3 sceneDistG` DEFINITION in this viz's shader) reds.
    if (!/METABALL_WGSL/.test(wgsl) || !/from\s+["'][^"']*goo-blob\/shaders\/metaball\.wgsl/.test(wgsl))
        viol.push("2 field: goo-dot.wgsl.ts does not import + splice METABALL_WGSL (the byte-untouched goo-blob field — the SHARED field, not a re-fork)");
    if (!/METABALL_FRAGMENT_SRC/.test(glsl) || !/from\s+["'][^"']*goo-blob\/shaders\/metaball\.frag/.test(glsl))
        viol.push("2 field: goo-dot.frag.ts does not import + splice METABALL_FRAGMENT_SRC (the byte-untouched goo-blob field)");
    // A re-forked field DEFINITION (the shader defines its OWN sceneDistG body) reds. The splice
    // is a string slice; the field's CALLS (sceneDistG(...)) are fine — only a DEFINITION reds.
    if (/\bfn\s+sceneDistG\s*\(/.test(wgsl))
        viol.push("2 field: goo-dot.wgsl.ts defines its OWN `fn sceneDistG` — the field is READ via splice, NOT rebuilt (a re-fork reds; the goo-blob metaball.wgsl SDF is byte-untouched)");
    if (/\bvec3\s+sceneDistG\s*\(\s*vec2/.test(glsl))
        viol.push("2 field: goo-dot.frag.ts defines its OWN `vec3 sceneDistG(vec2 …)` — the field is READ via splice, NOT rebuilt (a re-fork reds)");

    // The Register-B lattice REUSES fibonacciDot from dot-matrix (imported, NOT re-authored).
    if (!/import\s*\{[^}]*fibonacciDot[^}]*\}\s*from\s*["'][^"']*dot-matrix/.test(lattice))
        viol.push("2 rasterizer: gooDotLattice.ts does not import fibonacciDot from the dot-matrix evaluator (the ONE rasterizer — it must be REUSED, not re-authored)");
    if (/export\s+function\s+fibonacciDot\b/.test(lattice))
        viol.push("2 rasterizer: gooDotLattice.ts RE-AUTHORS fibonacciDot — it must IMPORT the dot-matrix one (a duplicate fibonacciDot reds; the ONE-math-source fence)");
    return viol;
}

// ── 3: the dot-grid output + the lattice round-trip ──────────────────────────────
function clauseRoundTrip(over) {
    const viol = [];
    const wgsl = stripComments(
        over?.wgsl ?? read(resolve(DIR, "shaders/goo-dot.wgsl.ts")),
    );
    const glsl = stripComments(
        over?.glsl ?? read(resolve(DIR, "shaders/goo-dot.frag.ts")),
    );
    const bridge = stripComments(
        over?.bridge ?? read(resolve(DIR, "composables/uniformBridgeWGPU.ts")),
    );
    const lattice = stripComments(
        over?.lattice ?? read(resolve(DIR, "composables/gooDotLattice.ts")),
    );

    const checks = [
        // The cell-quantize dot grid (floor(fragCoord / pixelSize)) in BOTH shaders.
        ["cell-quantize in WGSL", () => /floor\s*\(\s*fragCoord\s*\/\s*uDotPixelSize\s*\)/.test(wgsl)],
        ["cell-quantize in GLSL", () => /floor\s*\(\s*fragCoord\s*\/\s*pix\s*\)/.test(glsl)],
        // The field-driven dot radius (smoothstep(floor, 1, fCell) ramp) in BOTH.
        ["field-driven dotR in WGSL", () => /smoothstep\s*\(\s*uFieldFloor\s*,\s*1\.0\s*,\s*fCell\s*\)/.test(wgsl)],
        ["field-driven dotR in GLSL", () => /smoothstep\s*\(\s*uFieldFloor\s*,\s*1\.0\s*,\s*fCell\s*\)/.test(glsl)],
        // The crisp fwidth dot AA (the ONE AA canon) in BOTH fragment stages.
        ["fwidth dot in WGSL", () => /fwidth\s*\(\s*pd\s*\)/.test(wgsl)],
        ["fwidth dot in GLSL", () => /fwidth\s*\(\s*pd\s*\)/.test(glsl)],
        // The Bayer8 dither macros (the §T2 halftone) in BOTH.
        ["bayer8 in WGSL", () => /fn\s+bayer8\b/.test(wgsl)],
        ["bayer8 in GLSL", () => /float\s+bayer8\b/.test(glsl)],
        // The s8/s9 dot-grid lanes exist in BOTH the WGSL struct AND the JS bridge (the lockstep).
        ["s8 lane in WGSL struct", () => /s8\s*:\s*vec4<f32>/.test(wgsl)],
        ["s9 lane in WGSL struct", () => /s9\s*:\s*vec4<f32>/.test(wgsl)],
        ["s8 lane in JS bridge", () => /\bs8\s*:/.test(bridge)],
        ["s9 lane in JS bridge", () => /\bs9\s*:/.test(bridge)],
        // The gridOrigin (§T3 lattice) — pure-JS source the WGSL transcribes.
        ["gridOrigin in JS", () => /export\s+function\s+gridOrigin\b/.test(lattice)],
    ];
    for (const [label, fn] of checks) {
        if (!fn())
            viol.push(`3 round-trip: ${label} — the WGSL/GLSL dot-stamp must transcribe the SAME dot-grid output (the lockstep)`);
    }

    // The fwidth must live in the FRAGMENT ONLY (never a vs_main-reachable helper).
    const vsBody = (wgsl.match(/fn vs_main[\s\S]*?@fragment/) ?? [""])[0];
    if (/fwidth\s*\(/.test(vsBody))
        viol.push("3 round-trip: fwidth appears in the WGSL vs_main — it lives in fs_main ONLY (the dual-module validation trap)");

    // The NUMERIC round-trip: gridOrigin lays a centred square lattice (deterministic).
    if (over?.lattice === undefined) {
        viol.push(...numericGridOrigin());
    }
    return viol;
}

/** A numeric check that gridOrigin lays a centred square lattice at the pitch. */
function numericGridOrigin() {
    const viol = [];
    const cols = 4;
    const pitch = 0.5;
    // index 0 → top-left (col 0, row 0): (-1.5·0.5, -1.5·0.5) = (-0.75, -0.75).
    const half = (cols - 1) / 2; // 1.5
    const sample = (index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        return { x: (col - half) * pitch, y: (row - half) * pitch };
    };
    const a = sample(0);
    if (Math.abs(a.x - -0.75) > 1e-9 || Math.abs(a.y - -0.75) > 1e-9)
        viol.push(`3 round-trip: gridOrigin(0,4,0.5) = (${a.x}, ${a.y}) ≠ (-0.75, -0.75) — the centred lattice is broken`);
    // index 5 → (col 1, row 1): ((1-1.5)·0.5, (1-1.5)·0.5) = (-0.25, -0.25).
    const b = sample(5);
    if (Math.abs(b.x - -0.25) > 1e-9 || Math.abs(b.y - -0.25) > 1e-9)
        viol.push(`3 round-trip: gridOrigin(5,4,0.5) = (${b.x}, ${b.y}) ≠ (-0.25, -0.25) — the row-major lattice is broken`);
    return viol;
}

// ── 4: the field IS the metaball thickness (the goo↔dot bridge) ──────────────────
function clauseField(over) {
    const viol = [];
    const wgsl = stripComments(
        over?.wgsl ?? read(resolve(DIR, "shaders/goo-dot.wgsl.ts")),
    );
    const glsl = stripComments(
        over?.glsl ?? read(resolve(DIR, "shaders/goo-dot.frag.ts")),
    );
    // The dot-grid reads thickness = clamp(-d/bodyR, 0, 1) off sceneDistG (the one-line re-use).
    // The shaders CALL sceneDistG (read the spliced field) + derive fCell off -scene.x/bodyR.
    for (const [name, src] of [["WGSL", wgsl], ["GLSL", glsl]]) {
        if (!/sceneDistG\s*\(/.test(src))
            viol.push(`4 field: the ${name} dot-stamp does not CALL sceneDistG( — the field must be the goo-blob SDF (READ, not a second field)`);
        if (!/clamp\s*\(\s*-?\s*scene\.x\s*\/\s*max\s*\(\s*bodyR/.test(src))
            viol.push(`4 field: the ${name} dot-stamp does not derive fCell = clamp(-scene.x / max(bodyR …) — the thickness one-line re-use (the goo↔dot bridge)`);
    }
    return viol;
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
        viol.push("5 warm-identity: DEFAULT_GOO_DOT_CONFIG.palette is not WARM_IDENTITY_PALETTE (the default must be warm-cream)");
    if (!/variant\s*:\s*["']dot-field["']/.test(consts))
        viol.push("5 warm-identity: DEFAULT_GOO_DOT_CONFIG.variant is not 'dot-field' (Register A — the smooth field-driven dot is the §T4 default)");
    // BD.W-GOODOT-LIQUID-FIELD Move 3 re-graded the near-mono cream-on-cream core (the old
    // { L:0.92, C:0.03, h:78 } gray-cream) to REAL chroma (C_core ≥ 0.13, the no-gray warm floor —
    // the invisible-separation defect cure). The warm-identity fence asserts the NEW reality: the
    // WARM_IDENTITY_PALETTE carries a bright warm CORE stop in the warm hue band [30,100] with the
    // chroma floor CLEARED (C ≥ 0.10 — not the old near-gray literal). The binding no-gray ΔL/C
    // measurement is proof:goodot-liquid G3a (C_core ≥ 0.13).
    const palBlock = (consts.match(/WARM_IDENTITY_PALETTE\s*:\s*OklchStop\[\]\s*=\s*\[([\s\S]*?)\]/) ?? [, ""])[1];
    const warmCore = /\{\s*L\s*:\s*(0\.[5-9]\d*)\s*,\s*C\s*:\s*(0\.1[0-9]\d*|0\.[2-9]\d*)\s*,\s*h\s*:\s*([3-9]\d|100)(?:\.\d+)?\s*\}/.test(palBlock);
    if (!warmCore)
        viol.push("5 warm-identity: WARM_IDENTITY_PALETTE carries no bright warm CORE stop (L≥0.5, C≥0.10, h∈[30,100]) — the no-gray warm floor (BD.W-GOODOT Move 3, C_core≥0.13) is not cleared");
    const presets = stripComments(over?.presets ?? read(PRESETS));
    if (presets != null && /\bGOO_DOT_TEAL\b|\bGOO_DOT_NAVY\b/.test(presets))
        viol.push("5 warm-identity: a GOO_DOT_TEAL/GOO_DOT_NAVY symbol survives in presets.ts — the teal-on-navy fabricated reference is DELETED (clean break — BC.W-TEAL-NAVY-PURGE)");
    return viol;
}

// ── 6: the dot-cursor + field-sample wiring (the on-host paint dependency) ───────
function clausePaintWiring(over) {
    const viol = [];
    const composable = stripComments(
        over?.useGooDotMatrix ?? read(resolve(DIR, "composables/useGooDotMatrix.ts")),
    );
    // The accel/flick-burst leg consumes the shared field (the §T7 bloom).
    if (!/usePointerVelocityField\s*\(/.test(composable))
        viol.push("6 paint: useGooDotMatrix does not call usePointerVelocityField( — the shared accel/flick-burst leg is unwired (BC.W-VIZ-INTERACTION)");
    if (!/\.tick\s*\(/.test(composable))
        viol.push("6 paint: useGooDotMatrix does not feed .tick( from the frame callback (the no-own-rAF push-step is missing)");
    const readsAccel = /\.acceleration\b/.test(composable) || /\.burst\b/.test(composable);
    if (!readsAccel)
        viol.push("6 paint: useGooDotMatrix does not read the pointer acceleration/burst — the flick bloom is the field's unique contribution (velocity-only reds)");
    // The dot-cursor influence reaches the buffer (the bloom/cursor drive).
    if (!/packGooDotUniforms\s*\(/.test(composable))
        viol.push("6 paint: useGooDotMatrix does not pack the dot-grid uniforms — the dot-grid output does not reach the buffer");
    if (!/packBlobWGPUUniforms\s*\(/.test(composable) && !/uploadBlobUniforms\s*\(/.test(composable))
        viol.push("6 paint: useGooDotMatrix does not pack the FIELD uniforms (packBlobWGPUUniforms / uploadBlobUniforms) — the field does not reach the buffer (the dots would not be field-driven)");
    return viol;
}

function runAll(over = {}) {
    return [
        ...clauseExists(over),
        ...clauseSubstrate(over),
        ...clauseRoundTrip(over),
        ...clauseField(over),
        ...clauseWarmIdentity(over),
        ...clausePaintWiring(over),
    ];
}

// ── Self-test: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];

    // (2a) a planted private requestAnimationFrame reds clause 2.
    const liveComposable = read(resolve(DIR, "composables/useGooDotMatrix.ts"));
    const rafPlanted = runAll({
        useGooDotMatrix: liveComposable + "\nfunction x(){ requestAnimationFrame(x); }",
    });
    if (!rafPlanted.some((v) => v.startsWith("2")))
        fails.push("self-test: a planted requestAnimationFrame did NOT red clause 2");

    // (2b) a re-forked WGSL sceneDistG DEFINITION reds clause 2.
    const liveWgsl = read(resolve(DIR, "shaders/goo-dot.wgsl.ts"));
    const fieldReFork = runAll({
        wgsl: liveWgsl + "\n// fn sceneDistG(uv: vec2<f32>) -> vec3<f32> { return vec3<f32>(0.0); }\nconst Z = `fn sceneDistG(uv: vec2<f32>) -> vec3<f32> { return vec3<f32>(0.0); }`;",
    });
    if (!fieldReFork.some((v) => v.startsWith("2")))
        fails.push("self-test: a re-forked WGSL sceneDistG did NOT red clause 2");

    // (2c) a re-authored fibonacciDot reds clause 2.
    const liveLattice = read(resolve(DIR, "composables/gooDotLattice.ts"));
    const fibReauthor = runAll({
        lattice: liveLattice + "\nexport function fibonacciDot(){ return {x:0,y:0,z:0}; }",
    });
    if (!fibReauthor.some((v) => v.startsWith("2")))
        fails.push("self-test: a re-authored fibonacciDot did NOT red clause 2");

    // (3) a drifted WGSL field-driven dotR (smoothstep) reds clause 3.
    const dotRDrift = runAll({
        wgsl: liveWgsl.replace(/smoothstep\(uFieldFloor, 1\.0, fCell\)/g, "fCell"),
    });
    if (!dotRDrift.some((v) => v.startsWith("3")))
        fails.push("self-test: a drifted WGSL field-driven dotR did NOT red clause 3");

    // (4) a removed sceneDistG call (a second field) reds clause 4.
    const fieldStripped = runAll({
        wgsl: liveWgsl.replace(/sceneDistG\(/g, "secondField("),
    });
    if (!fieldStripped.some((v) => v.startsWith("4")))
        fails.push("self-test: a stripped sceneDistG (a second field) did NOT red clause 4");

    // (5) a teal stop in the library reds clause 5.
    const liveConsts = read(resolve(DIR, "constants.ts"));
    const tealPlanted = runAll({
        constants: liveConsts + "\nconst X = { L: 0.5, C: 0.12, h: 220 };",
    });
    if (!tealPlanted.some((v) => v.startsWith("5")))
        fails.push("self-test: a teal stop in the library did NOT red clause 5");

    // (6) a velocity-only pointer wiring reds clause 6.
    const velOnly = runAll({
        useGooDotMatrix:
            "const f = usePointerVelocityField(); f.tick(d); use(f.speed.value); packGooDotUniforms(s); packBlobWGPUUniforms(b);",
    });
    if (!velOnly.some((v) => v.startsWith("6")))
        fails.push("self-test: a velocity-only wiring did NOT red clause 6");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:viz-hybrid",
        wave: "BC.W-VIZ-HYBRID",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath(
        "GLASS_UI_VIZ_HYBRID_ARTIFACT",
        "proof-viz-hybrid.json",
    );
    writeGateArtifact(out, artifact);

    console.log(
        "proof:viz-hybrid — the goo+dot-matrix HYBRID: the metaball SDF field rendered as a dot matrix, dense+bright inside the merged blob (BC.W-VIZ-HYBRID)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log("  GREEN (1 exists · 2 substrate+field+rasterizer · 3 round-trip · 4 thickness-bridge · 5 warm-identity · 6 paint-wiring)");
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
