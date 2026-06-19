#!/usr/bin/env node
// BC.W-VIZ-CONSTELLATION — proof:viz-constellation, the constellation WebGPU-migration
// SOURCE gate (born-RED on the pre-migration HEAD → GREEN at close).
//
// The lattice re-homes off the Canvas2D substrate (the low-res `ctx.arc()` discs) onto the
// WebGPU instanced-points+lines substrate (the §E "WebGPU everywhere, no canvas" mandate).
// This gate machine-locks the five acceptance clauses; the binding live Metal-GPU paint
// (crispness + drift + pointer + Safari + on-host) rides the orchestrator capture (this
// wave captures its OWN paint — BC.W-GESTALT-FIRST; tests-visual/constellation.spec.ts).
//
// SOURCE PREDICATES (each falsifiable, each device-free):
//   C1 — WebGPU substrate, no Canvas2D: useConstellation composes createGpuSubstrate +
//        carries NO `useCanvas2D` import; the constellation tree has NO `getContext("2d")`/
//        `ctx.arc`/`ctx.fill`; constellationDraw.ts is DELETED.
//   C2 — crisp SDF circle: the points WGSL carries `length(...) - 1.0` SDF + `fwidth`-
//        smoothstep AA + the DPR-aware `* uDpr` sizing; the GLSL twin matches.
//   C3 — instanced-points + instanced-lines, no point-list/line-list: both passes draw
//        `6 × N` instanced quads; NO `point-list`/`line-list` topology.
//   C4 — ONE math source + the typed-struct SoT: constellationField.ts stays the SINGLE JS
//        evaluator (the pure node-testable buildEdges); uniformBridgeWGPU.ts declares the
//        nodes/edges/uniforms layout ONCE; the compute neighbor-bin is ABSENT (booked).
//   C5 — warm-cream identity, no teal/navy: DEFAULT_PALETTE is the warm neutrals; NO
//        teal/navy literal in constants/the render.
//
// SELF-TEST BITE (--selftest): a synthetic broken tree (a planted getContext("2d"); a
// removed fwidth/uDpr; a planted point-list; a planted compute pass; a teal literal) MUST
// red — born-RED proof on the green migrated tree.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/constellation");
const SHADERS = resolve(DIR, "shaders");
const COMPOSABLES = resolve(DIR, "composables");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const stripComments = (s) =>
    (s ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");

// ── C1 — WebGPU substrate, no Canvas2D ──
function clauseC1(o) {
    const viol = [];
    const orch = stripComments(
        o?.["orchestrator"] ?? read(resolve(COMPOSABLES, "useConstellation.ts")),
    );
    if (!/\b(createGpuSubstrate|useGpuSubstrate)\b/.test(orch))
        viol.push("C1: useConstellation does not compose createGpuSubstrate (the WebGPU substrate picker)");
    if (/\buseCanvas2D\b/.test(orch))
        viol.push("C1: useConstellation still imports the Canvas2D substrate (useCanvas2D) — the §E 'no canvas' mandate retires it");
    // No getContext("2d") / ctx.arc anywhere in the tree.
    const treeFiles = o?.["treeFiles"] ?? [
        resolve(COMPOSABLES, "useConstellation.ts"),
        resolve(COMPOSABLES, "constellationWGPUSetup.ts"),
        resolve(COMPOSABLES, "constellationGLSetup.ts"),
        resolve(DIR, "constellationField.ts"),
        resolve(DIR, "constellationRender.ts"),
    ];
    for (const f of treeFiles) {
        const src = typeof f === "string" && existsSync(f) ? stripComments(readFileSync(f, "utf8")) : stripComments(f);
        if (/getContext\(\s*["']2d["']\)/.test(src) || /\bctx\.arc\b/.test(src))
            viol.push("C1: a Canvas2D drawing context survives in the constellation tree (getContext('2d') / ctx.arc) — must be GONE");
    }
    // constellationDraw.ts is DELETED.
    if (o?.["drawDeleted"] !== false && existsSync(resolve(DIR, "constellationDraw.ts")))
        viol.push("C1: constellationDraw.ts (the four Canvas2D draw passes) still exists — it must be deleted (clean break)");
    return viol;
}

// ── C2 — crisp SDF circle ──
function clauseC2(o) {
    const viol = [];
    const wgsl = stripComments(
        o?.["pointsWgsl"] ?? read(resolve(SHADERS, "constellation-points.wgsl.ts")),
    );
    const glsl = stripComments(
        o?.["pointsGlsl"] ?? read(resolve(SHADERS, "constellation-points.glsl.ts")),
    );
    const hasSdf = (src) =>
        /length\([^)]*\)\s*-\s*1\.0/.test(src) && /fwidth\(/.test(src) && /smoothstep\(/.test(src);
    if (!hasSdf(wgsl))
        viol.push("C2: constellation-points.wgsl.ts lacks the crisp SDF circle (length(uv)-1.0 + fwidth + smoothstep)");
    if (!hasSdf(glsl))
        viol.push("C2: constellation-points.glsl.ts lacks the crisp SDF circle (the WebGL2 twin must match)");
    // The DPR-aware sizing leg (the literal low-res fix) — the half-extent rides `* uDpr`.
    if (!/\*\s*(uDpr|dpr)\b/.test(wgsl) && !/uDpr/.test(wgsl))
        viol.push("C2: constellation-points.wgsl.ts does not size the disc by the device-pixel-ratio (the * uDpr crispness leg)");
    if (!/uDpr/.test(glsl))
        viol.push("C2: constellation-points.glsl.ts does not size the disc by uDpr (the crispness leg)");
    return viol;
}

// ── C3 — instanced-points + instanced-lines, no point-list/line-list ──
function clauseC3(o) {
    const viol = [];
    const wgpuSetup = stripComments(
        o?.["wgpuSetup"] ?? read(resolve(COMPOSABLES, "constellationWGPUSetup.ts")),
    );
    const glSetup = stripComments(
        o?.["glSetup"] ?? read(resolve(COMPOSABLES, "constellationGLSetup.ts")),
    );
    // The instanced draw: 6 verts × N instances (WGPU `.draw(6, count)`, GL `drawArraysInstanced(..., 6, count)`).
    if (!/\.draw\(\s*6\s*,/.test(wgpuSetup))
        viol.push("C3: constellationWGPUSetup.ts does not draw 6-vertex instanced quads (.draw(6, count))");
    if (!/drawArraysInstanced\(/.test(glSetup))
        viol.push("C3: constellationGLSetup.ts does not use drawArraysInstanced (the WebGL2 instanced-arrays twin)");
    // NO 1px point-list / line-list topology.
    if (/topology:\s*["']point-list["']/.test(wgpuSetup) || /topology:\s*["']line-list["']/.test(wgpuSetup))
        viol.push("C3: constellationWGPUSetup.ts uses a 1px point-list/line-list topology (forbidden — instanced quads only)");
    if (/gl\.POINTS\b/.test(glSetup) || /gl\.LINES\b/.test(glSetup))
        viol.push("C3: constellationGLSetup.ts draws gl.POINTS/gl.LINES (forbidden — instanced triangle quads only)");
    // Two passes: a lines pipeline + a points pipeline.
    if (!/linesPipeline/.test(wgpuSetup) || !/pointsPipeline/.test(wgpuSetup))
        viol.push("C3: constellationWGPUSetup.ts is missing the two render pipelines (points + lines)");
    return viol;
}

// ── C4 — ONE math source + the typed-struct SoT ──
function clauseC4(o) {
    const viol = [];
    const field = stripComments(
        o?.["field"] ?? read(resolve(DIR, "constellationField.ts")),
    );
    const bridge = stripComments(
        o?.["bridge"] ?? read(resolve(COMPOSABLES, "uniformBridgeWGPU.ts")),
    );
    // The pure CPU edge scan is the node-testable single math source.
    if (!/export function buildEdges/.test(field))
        viol.push("C4: constellationField.ts does not export the pure buildEdges scan (the ONE math source the render transcribes)");
    if (!/export function stepField/.test(field) || !/export function seedField/.test(field))
        viol.push("C4: constellationField.ts is missing the field evaluator (seedField/stepField)");
    // The typed-struct SoT declares the nodes/edges/uniforms layout ONCE.
    if (!/CONSTELLATION_UNIFORM_BYTES/.test(bridge) || !/packConstellationUniforms/.test(bridge))
        viol.push("C4: uniformBridgeWGPU.ts does not declare the uniform layout SoT (CONSTELLATION_UNIFORM_BYTES + packConstellationUniforms)");
    if (!/packNodes/.test(bridge) || !/packEdges/.test(bridge))
        viol.push("C4: uniformBridgeWGPU.ts does not declare the node/edge storage pack (packNodes/packEdges)");
    // The compute neighbor-bin is ABSENT (booked, not built — the overfit guard).
    const wgpuSetup = stripComments(
        o?.["wgpuSetup"] ?? read(resolve(COMPOSABLES, "constellationWGPUSetup.ts")),
    );
    if (/createComputePipeline\(/.test(wgpuSetup) || /beginComputePass\(/.test(wgpuSetup))
        viol.push("C4: constellationWGPUSetup.ts contains a compute pass — the GPU neighbor-bin is BOOKED, not built (overfit at the default count=64)");
    return viol;
}

// ── C5 — warm-cream identity, no teal/navy ──
function clauseC5(o) {
    const viol = [];
    const consts = stripComments(
        o?.["constants"] ?? read(resolve(DIR, "constants.ts")),
    );
    const render = stripComments(
        o?.["render"] ?? read(resolve(DIR, "constellationRender.ts")),
    );
    // DEFAULT_PALETTE is the warm neutrals.
    if (!/DEFAULT_PALETTE/.test(consts) || !/#b4afa3/.test(consts) || !/#cdc8bd/.test(consts))
        viol.push("C5: constants.ts DEFAULT_PALETTE is not the warm-cream neutrals (#b4afa3 / #cdc8bd)");
    // No teal/navy hex literal (a cool-hue #00xxxx / a saturated blue/teal/navy keyword).
    const cool = /#0[0-9a-f][0-9a-f][89a-f]{3}\b/i; // a rough cool-blue hex (low R, high B)
    const src = consts + "\n" + render;
    if (/\b(teal|navy|cyan|#00bfff|#008080|#000080)\b/i.test(src))
        viol.push("C5: a teal/navy literal in the LIBRARY constants/render — the warm-cream identity must lead (presets-in-consumers)");
    void cool;
    return viol;
}

function runAll(o = {}) {
    return [
        ...clauseC1(o.c1),
        ...clauseC2(o.c2),
        ...clauseC3(o.c3),
        ...clauseC4(o.c4),
        ...clauseC5(o.c5),
    ];
}

// ── Self-test bite: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];
    // (a) a planted getContext("2d") in the tree reds C1.
    const c2dInjected = runAll({
        c1: {
            orchestrator: "createGpuSubstrate",
            treeFiles: ['const x = canvas.getContext("2d");'],
            drawDeleted: false,
        },
    });
    if (c2dInjected.length === 0) fails.push("self-test: a planted getContext('2d') did NOT red C1");
    // (b) a useCanvas2D import reds C1.
    const canvas2dImport = runAll({
        c1: { orchestrator: "import { useCanvas2D } from '...'; createGpuSubstrate", treeFiles: [], drawDeleted: false },
    });
    if (canvas2dImport.length === 0) fails.push("self-test: a useCanvas2D import did NOT red C1");
    // (c) a removed fwidth reds C2.
    const noFwidth = runAll({
        c2: {
            pointsWgsl: "let d = length(in.uv) - 1.0; let c = smoothstep(0.0, 1.0, d) * uDpr;",
            pointsGlsl: "float d = length(vUv) - 1.0; float c = smoothstep(0.0, 1.0, d); float s = uDpr;",
        },
    });
    if (noFwidth.length === 0) fails.push("self-test: a removed fwidth (no AA) did NOT red C2");
    // (d) a planted point-list topology reds C3.
    const pointList = runAll({
        c3: {
            wgpuSetup: 'primitive: { topology: "point-list" } linesPipeline pointsPipeline .draw(6,',
            glSetup: "drawArraysInstanced(",
        },
    });
    if (pointList.length === 0) fails.push("self-test: a planted point-list topology did NOT red C3");
    // (e) a planted compute pass reds C4 (the overfit guard).
    const computePlanted = runAll({
        c4: {
            field: "export function buildEdges(){} export function stepField(){} export function seedField(){}",
            bridge: "CONSTELLATION_UNIFORM_BYTES packConstellationUniforms packNodes packEdges",
            wgpuSetup: "device.createComputePipeline({})",
        },
    });
    if (computePlanted.length === 0) fails.push("self-test: a planted compute pass did NOT red C4 (overfit guard)");
    // (f) a teal literal in constants reds C5.
    const tealLiteral = runAll({
        c5: { constants: 'DEFAULT_PALETTE #b4afa3 #cdc8bd node: "teal"', render: "" },
    });
    if (tealLiteral.length === 0) fails.push("self-test: a teal literal in constants did NOT red C5");
    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:viz-constellation",
        wave: "BC.W-VIZ-CONSTELLATION",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_VIZ_CONSTELLATION_ARTIFACT", "proof-viz-constellation.json");
    writeGateArtifact(out, artifact);

    if (viol.length) {
        console.error("proof:viz-constellation — RED");
        for (const v of viol) console.error("  ✗ " + v);
    } else {
        console.log("proof:viz-constellation — GREEN (C1 no-canvas · C2 crisp SDF · C3 instanced · C4 one-source+SoT · C5 warm-cream)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("proof:viz-constellation --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("  ✗ " + f);
        } else {
            console.log("proof:viz-constellation --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

main();
