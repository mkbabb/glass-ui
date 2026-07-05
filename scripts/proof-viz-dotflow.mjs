#!/usr/bin/env node
// BG.W-DOTFLOW-REBUILD — proof:viz-dotflow, the STREAMLINE dot-flow-field SOURCE gate
// (born-RED on the pre-rebuild tree → GREEN at the first-principles streamline rebuild).
//
// THE REBUILD (USER 07-05 — "a TOTAL MESS, completely unusable"; the flood-control constant-tune
// on the mote/trail architecture did NOT satisfy — no streamlines read, Safari dead-black,
// Chrome white-out). The free-advected-mote + additive-trail-flood architecture
// (BD.W-DOTFLOW-AURORA-CURRENT) is RETIRED WHOLE (compute pass, storage particles, two-pass
// trail ping-pong — W-PRUNE-CONSOLIDATE, no dual path). The frame is rebuilt to the IMG_1836
// reference: discrete dots strung along EVENLY-SPACED SMOOTH STREAMLINES of a curl-warped stream
// function — the iso-contours (Bridson 2007: v = ∇⊥ψ → the streamlines ARE ψ's level curves;
// Jobard–Lefer 1997: even spacing = even Δ level step), beaded at the crossings with a drifting
// transverse bead-line, over a deep warm floor. ONE fullscreen-fragment pass (the aurora.wgsl
// shape — paints identically on WebKit-WebGPU + Chrome/Metal; no compute, no trail, no white-out).
//
// This is the DEVICE-FREE SOURCE arm (born-RED → GREEN, tagged ["local","ci","release"]). The
// binding live-GPU gestalt paint (the traceable evenly-spaced beaded streamlines, both engines
// both modes) is the paint judge's dual-engine re-judge — NOT this device-free gate (the
// cardinal split: CI proves the SOURCE architecture, the local close proves the PAINT).
//
// SOURCE WITNESSES (each falsifiable; the comment-strip + pure-detector house pattern):
//   S1 — the mote/trail/compute architecture is RETIRED (ABSENT). The compute/render/trail-fork
//        files are DEFINITION-ABSENT; the constants carry no mote/trail/vortex schema; the WGSL
//        carries no @compute/cs_flow/trail; the GLSL carries no state-texture/trail/point-sprite.
//   S2 — the STREAMLINE field is present. flowField.ts exports sampleStreamField/StreamFieldParams
//        /curlFBM; both shaders declare the fragment sampleStreamField + the fullscreen pass.
//   S3 — the ONE math source transcribes (JS↔WGSL↔GLSL) + the iso-contour beaded render. The
//        stream field (ramp + 2 undulations + curl-warp + pointer bend) + the shared curl basis
//        transcribe in all three; both shaders render the even iso-contour + the bead crossing.
//   S4 — fullscreen fragment, NO compute / NO instanced billboards. The WGPU setup draws the
//        3-vertex triangle with no compute pass / no storage-particle buffer; the GL setup draws
//        the fullscreen triangle with no trail FBO / no point-sprite.
//   S5 — warm-identity default + NO teal/navy in the LIBRARY constants (the palette fence).
//   S6 — the pointer BENDS the streamlines (velocity AND accel/burst — the user's ask).
//
// + a self-test bite per clause (each planted defect REDs its clause) + a BORN-RED anchor bite
//   (synthetic HEAD-like mote/trail/compute source REDs — the gate would have RED at HEAD).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/dot-flow-field");
const PRESETS = resolve(ROOT, "demo/stories/substrates/presets.ts");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

/** URL-safe comment strip — `(^|[^:])//` keeps a `://` in a URL intact. */
function stripComments(src) {
    return (src ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// Extract a function's brace-balanced body by name (WGSL `fn NAME(...)` / GLSL `float NAME(...)`).
function extractFnBody(src, sigRe) {
    const m = sigRe.exec(src ?? "");
    if (!m) return "";
    let i = (src ?? "").indexOf("{", m.index);
    if (i < 0) return "";
    let depth = 0;
    const start = i;
    for (; i < src.length; i++) {
        const c = src[i];
        if (c === "{") depth++;
        else if (c === "}") {
            depth--;
            if (depth === 0) return src.slice(start, i + 1);
        }
    }
    return src.slice(start);
}

const files = (over) => ({
    flowField: stripComments(over?.flowField ?? read(resolve(DIR, "composables/flowField.ts"))),
    wgsl: stripComments(over?.wgsl ?? read(resolve(DIR, "shaders/flow-field.wgsl.ts"))),
    glsl: stripComments(over?.glsl ?? read(resolve(DIR, "shaders/flow-field.glsl.ts"))),
    constants: stripComments(over?.constants ?? read(resolve(DIR, "constants.ts"))),
    setupWgpu: stripComments(over?.setupWgpu ?? read(resolve(DIR, "composables/flowSetupWGPU.ts"))),
    setupGl: stripComments(over?.setupGl ?? read(resolve(DIR, "composables/flowSetupGL.ts"))),
    useDotFlowField: stripComments(
        over?.useDotFlowField ?? read(resolve(DIR, "composables/useDotFlowField.ts")),
    ),
    bridge: stripComments(over?.bridge ?? read(resolve(DIR, "composables/uniformBridgeWGPU.ts"))),
    presets: stripComments(over?.presets ?? read(PRESETS)),
});

// ── S1: the mote/trail/compute architecture is RETIRED (ABSENT) ──────────────────
const RETIRED_FILES = [
    "shaders/flow-field.compute.wgsl.ts",
    "shaders/flow-field.render.wgsl.ts",
    "composables/flowSetupGLFlow.ts",
    "composables/useFlowParticles.ts",
];
function clauseRetired(over) {
    const viol = [];
    // The retired files are DEFINITION-ABSENT (born-RED — they existed at HEAD). The
    // self-test cannot re-create them, so this is a pure structural lock; the CONSTRUCT
    // witnesses below carry the override-driven born-RED anchor.
    if (!over) {
        for (const rel of RETIRED_FILES)
            if (existsSync(resolve(DIR, rel)))
                viol.push(
                    `S1 retired: ${rel} SURVIVES — the mote/trail/compute architecture is retired WHOLE (W-PRUNE-CONSOLIDATE, no dual path)`,
                );
    }
    const f = files(over);
    // the constants carry NO mote/trail/vortex schema (a clean break to the streamline shape).
    for (const [field, label] of [
        [/\bmode\s*:\s*["']flow["']/, "mode:'flow' discriminator"],
        [/\bparticleCount\s*:/, "particleCount"],
        [/\btrailHalfLife\s*:/, "trailHalfLife"],
        [/\bvortex(Radius|Spin)\s*:/, "vortex*"],
    ]) {
        if (field.test(f.constants))
            viol.push(
                `S1 retired: constants.ts still carries the mote/trail ${label} — the streamline schema retires it`,
            );
    }
    // the WGSL carries no @compute / cs_flow / trail present-composite.
    if (/@compute\b/.test(f.wgsl) || /\bcs_flow\b/.test(f.wgsl) || /FLOW_FIELD_TRAIL_WGSL/.test(f.wgsl))
        viol.push(
            "S1 retired: the WGSL still carries a @compute / cs_flow / trail pass — the streamline render is ONE fullscreen fragment, no compute, no trail",
        );
    // the GLSL carries no state-texture GPGPU / trail FBO / point-sprite mote pass.
    for (const [re, label] of [
        [/FLOW_FIELD_STATE_GLSL/, "FLOW_FIELD_STATE_GLSL (state-texture GPGPU advect)"],
        [/FLOW_FIELD_TRAIL_FRAG_GLSL/, "FLOW_FIELD_TRAIL_FRAG_GLSL (trail FBO)"],
        [/FLOW_FIELD_POINT_VERT_GLSL/, "FLOW_FIELD_POINT_VERT_GLSL (point-sprite mote)"],
    ]) {
        if (re.test(f.glsl))
            viol.push(`S1 retired: the GLSL still exports ${label} — the mote/trail channel retires`);
    }
    return viol;
}

// ── S2: the STREAMLINE field is present ──────────────────────────────────────────
function clausePresent(over) {
    const viol = [];
    const f = files(over);
    if (!/export function sampleStreamField/.test(f.flowField))
        viol.push("S2 present: flowField.ts does not export sampleStreamField (the ONE stream-field math source)");
    if (!/export interface StreamFieldParams/.test(f.flowField))
        viol.push("S2 present: flowField.ts does not export the StreamFieldParams derived-scalar interface");
    if (!/export function curlFBM/.test(f.flowField))
        viol.push("S2 present: flowField.ts does not export the shared curlFBM operator (the Bridson curl-noise domain warp)");
    if (!/fn sampleStreamField/.test(f.wgsl) || !/fn fs_main/.test(f.wgsl) || !/fn vs_main/.test(f.wgsl))
        viol.push("S2 present: the WGSL flow-field pass is missing sampleStreamField / fs_main / vs_main (the fullscreen streamline fragment)");
    if (!/float sampleStreamField/.test(f.glsl) || !/FLOW_FIELD_FRAG_GLSL/.test(f.glsl))
        viol.push("S2 present: the GLSL flow-field pass is missing sampleStreamField / FLOW_FIELD_FRAG_GLSL (the fullscreen streamline fragment)");
    return viol;
}

// ── S3: ONE math source transcribes + the iso-contour beaded render ──────────────
function clauseRoundTrip(over) {
    const viol = [];
    const f = files(over);
    // the stream field transcribes (ramp + 2 undulations + curl-warp + pointer bend) in all three.
    const jsBody = extractFnBody(f.flowField, /export function sampleStreamField\s*\(/);
    const wgslBody = extractFnBody(f.wgsl, /fn sampleStreamField\s*\(/);
    const glslBody = extractFnBody(f.glsl, /float sampleStreamField\s*\(/);
    const fieldChecks = [
        ["ramp · wy (JS)", () => /flowSlope\s*\*\s*wy/.test(jsBody)],
        ["ramp · wy (WGSL)", () => /v0\.w\s*\*\s*wy/.test(wgslBody)],
        ["ramp · wy (GLSL)", () => /uFlowSlope\s*\*\s*wy/.test(glslBody)],
        ["curl-warp domain (JS)", () => /curlFBM\(/.test(jsBody)],
        ["curl-warp domain (WGSL)", () => /curlFBM\(/.test(wgslBody)],
        ["curl-warp domain (GLSL)", () => /curlFBM\(/.test(glslBody)],
        ["two undulations sin×2 (JS)", () => (jsBody.match(/Math\.sin\(/g) || []).length >= 2],
        ["two undulations sin×2 (WGSL)", () => (wgslBody.match(/\bsin\(/g) || []).length >= 2],
        ["two undulations sin×2 (GLSL)", () => (glslBody.match(/\bsin\(/g) || []).length >= 2],
        ["pointer bend (JS)", () => /pointerActive\s*>\s*0\.5/.test(jsBody)],
        ["pointer bend (WGSL)", () => /v7\.x\s*>\s*0\.5/.test(wgslBody)],
        ["pointer bend (GLSL)", () => /uPointerActive\s*>\s*0\.5/.test(glslBody)],
    ];
    for (const [label, fn] of fieldChecks) {
        if (!fn())
            viol.push(`S3 round-trip: ${label} — the WGSL/GLSL must transcribe the SAME sampleStreamField math (the single source)`);
    }
    // the shared curl basis transcribes (hash21/valueNoise/potentialFBM) in all three.
    for (const [label, src, re] of [
        ["hash21 JS", f.flowField, /function hash21/],
        ["valueNoise JS", f.flowField, /function valueNoise/],
        ["potentialFBM JS", f.flowField, /function potentialFBM/],
        ["hash21 WGSL", f.wgsl, /fn hash21/],
        ["potentialFBM WGSL", f.wgsl, /fn potentialFBM/],
        ["hash21 GLSL", f.glsl, /float hash21/],
        ["potentialFBM GLSL", f.glsl, /float potentialFBM/],
    ]) {
        if (!re.test(src))
            viol.push(`S3 round-trip: ${label} — the shared curl-noise basis must transcribe across all three paths`);
    }
    // the iso-contour beaded render (even contour + the bead-crossing dot) in both shaders.
    for (const [label, src] of [["WGSL", f.wgsl], ["GLSL", f.glsl]]) {
        if (!/round\(hp\)/.test(src))
            viol.push(`S3 round-trip: the ${label} render has no even-Δ iso-contour (round(hp)) — the streamline spacing is the Jobard–Lefer even level step`);
        if (!/sqrt\(dContour\s*\*\s*dContour\s*\+\s*dBead\s*\*\s*dBead\)/.test(src))
            viol.push(`S3 round-trip: the ${label} render has no bead crossing (sqrt(dContour²+dBead²)) — the dots bead at the streamline∩bead intersection`);
        if (!/(beadSlope|uBeadSlope)/.test(src) || !/(v5\.y|uBeadDrift)/.test(src))
            viol.push(`S3 round-trip: the ${label} render has no drifting bead phase (beadSlope − time·beadDrift) — the dots must march ALONG their own line`);
    }
    return viol;
}

// ── S4: fullscreen fragment, NO compute / NO instanced billboards ────────────────
function clauseFullscreenFragment(over) {
    const viol = [];
    const f = files(over);
    // the WGPU setup draws the 3-vertex fullscreen triangle, no compute, no storage particles.
    if (!/\.draw\(\s*3\b/.test(f.setupWgpu))
        viol.push("S4 fragment: flowSetupWGPU.ts does not draw the 3-vertex fullscreen triangle (draw(3, …))");
    for (const [re, label] of [
        [/createComputePipeline/, "createComputePipeline"],
        [/dispatchWorkgroups/, "dispatchWorkgroups"],
        [/beginComputePass/, "beginComputePass"],
        [/read-only-storage/, "a read-only-storage particle buffer"],
    ]) {
        if (re.test(f.setupWgpu))
            viol.push(`S4 fragment: flowSetupWGPU.ts still carries ${label} — the streamline render is ONE fullscreen fragment, no compute, no storage particles`);
    }
    // the GL setup draws the fullscreen triangle, no trail FBO, no point-sprite.
    if (!/drawArrays\(\s*gl\.TRIANGLES\s*,\s*0\s*,\s*3\s*\)/.test(f.setupGl))
        viol.push("S4 fragment: flowSetupGL.ts does not draw the fullscreen triangle (drawArrays(TRIANGLES, 0, 3))");
    for (const [re, label] of [
        [/createFramebuffer/, "a trail FBO (createFramebuffer)"],
        [/gl\.POINTS/, "a point-sprite mote draw (gl.POINTS)"],
        [/FLOW_FIELD_STATE_GLSL/, "the state-texture GPGPU pass"],
    ]) {
        if (re.test(f.setupGl))
            viol.push(`S4 fragment: flowSetupGL.ts still carries ${label} — the streamline render is ONE fullscreen fragment, no trail, no motes`);
    }
    return viol;
}

// ── S5: warm-identity default + NO teal/navy in the LIBRARY constants ────────────
function clauseWarmIdentity(over) {
    const viol = [];
    const f = files(over);
    const stopRe = /h\s*:\s*(\d+(?:\.\d+)?)/g;
    let m;
    while ((m = stopRe.exec(f.constants))) {
        const h = Number(m[1]);
        if (h >= 180 && h <= 280)
            viol.push(
                `S5 warm-identity: a teal/navy hue (h=${h}) in the LIBRARY constants.ts — the reference skin belongs in the DEMO preset (presets-in-consumers)`,
            );
    }
    if (!/WARM_IDENTITY_PALETTE/.test(f.constants))
        viol.push("S5 warm-identity: constants.ts does not declare WARM_IDENTITY_PALETTE");
    if (!/palette\s*:\s*WARM_IDENTITY_PALETTE/.test(f.constants))
        viol.push("S5 warm-identity: DEFAULT_FLOW_CONFIG.palette is not WARM_IDENTITY_PALETTE (the default must be warm-cream)");
    if (!/floor\s*:\s*WARM_NEAR_BLACK_FLOOR/.test(f.constants))
        viol.push("S5 warm-identity: DEFAULT_FLOW_CONFIG.floor is not WARM_NEAR_BLACK_FLOOR (the default ground must be a warm near-black, not navy)");
    return viol;
}

// ── S6: the pointer BENDS the streamlines (velocity AND accel/burst) ─────────────
function clausePointer(over) {
    const viol = [];
    const f = files(over);
    const c = f.useDotFlowField;
    if (!/usePointerVelocityField\s*\(/.test(c))
        viol.push("S6 pointer: useDotFlowField does not compose usePointerVelocityField( — the shared pointer field is unwired");
    if (!/\.tick\s*\(/.test(c))
        viol.push("S6 pointer: useDotFlowField does not feed .tick( from the frame callback (the no-own-rAF push-step is missing)");
    const readsVelocity = /\.velocity\b/.test(c) || /\.speed\b/.test(c);
    const readsAccel = /\.acceleration\b/.test(c) || /\.burst\b/.test(c);
    if (!readsVelocity)
        viol.push("S6 pointer: useDotFlowField does not read the pointer velocity/speed");
    if (!readsAccel)
        viol.push("S6 pointer: useDotFlowField reads velocity but not acceleration/burst — the ask is 'velocity AND acceleration' (the flick burst)");
    if (!/pointerStrength/.test(c) || !/(active|pointer\.active)/.test(c))
        viol.push("S6 pointer: useDotFlowField does not derive the velocity-scaled bend strength / active gate (the streamline bend seam)");
    return viol;
}

function runAll(over = null) {
    return [
        ...clauseRetired(over),
        ...clausePresent(over),
        ...clauseRoundTrip(over),
        ...clauseFullscreenFragment(over),
        ...clauseWarmIdentity(over),
        ...clausePointer(over),
    ];
}

// ── Self-test: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];
    const base = {
        flowField: read(resolve(DIR, "composables/flowField.ts")),
        wgsl: read(resolve(DIR, "shaders/flow-field.wgsl.ts")),
        glsl: read(resolve(DIR, "shaders/flow-field.glsl.ts")),
        constants: read(resolve(DIR, "constants.ts")),
        setupWgpu: read(resolve(DIR, "composables/flowSetupWGPU.ts")),
        setupGl: read(resolve(DIR, "composables/flowSetupGL.ts")),
        useDotFlowField: read(resolve(DIR, "composables/useDotFlowField.ts")),
        bridge: read(resolve(DIR, "composables/uniformBridgeWGPU.ts")),
        presets: read(PRESETS),
    };
    const bite = (over, prefix, label) => {
        if (!runAll({ ...base, ...over }).some((v) => v.startsWith(prefix)))
            fails.push(`self-test: ${label} did NOT red ${prefix}`);
    };
    // (a) the clean tree passes with an `over` snapshot (proves the override path is sound).
    if (runAll({ ...base }).length)
        fails.push("self-test: the clean override snapshot unexpectedly RED (the override path is broken)");
    // (b) a re-introduced @compute / cs_flow in the WGSL reds S1.
    bite({ wgsl: base.wgsl + "\n@compute @workgroup_size(64) fn cs_flow() {}" }, "S1", "a planted @compute cs_flow");
    // (c) a re-introduced particleCount mote field in constants reds S1.
    bite({ constants: base.constants + "\nexport const X = { particleCount: 12000 };" }, "S1", "a planted particleCount mote field");
    // (d) removing sampleStreamField from the WGSL reds S2.
    bite({ wgsl: base.wgsl.replace(/fn sampleStreamField/g, "fn disabledStreamField") }, "S2", "a WGSL missing sampleStreamField");
    // (e) removing the curlFBM warp call from the WGSL field reds S3.
    bite({ wgsl: base.wgsl.replace(/let c = curlFBM\(/, "let c = vec2<f32>(0.0, 0.0); let _x = notCurl(") }, "S3", "a WGSL field without the curlFBM warp");
    // (f) removing the bead crossing from the GLSL render reds S3.
    bite({ glsl: base.glsl.replace(/sqrt\(dContour \* dContour \+ dBead \* dBead\)/, "dContour") }, "S3", "a GLSL render without the bead crossing");
    // (g) a re-introduced dispatchWorkgroups in the WGPU setup reds S4.
    bite({ setupWgpu: base.setupWgpu + "\nfunction z(){ pass.dispatchWorkgroups(1); }" }, "S4", "a planted dispatchWorkgroups");
    // (h) a teal stop in the library constants reds S5.
    bite({ constants: base.constants + "\nexport const T = { L: 0.7, C: 0.12, h: 205 };" }, "S5", "a teal hue in the library constants");
    // (i) a velocity-only pointer wiring reds S6.
    bite({ useDotFlowField: "const f = usePointerVelocityField(); f.tick(d); use(f.velocity.value); const pointerStrength = 1; const active = 1;" }, "S6", "a velocity-only pointer wiring");
    // (j) the BORN-RED anchor — synthetic HEAD-like mote/trail/compute source REDs (the gate
    //     would have been RED at HEAD; the paint judge confirmed the pre-rebuild architecture).
    const headLike = runAll({
        flowField: "export function sampleVelocity() {}\nfunction pointerVortex() {}",
        wgsl: "@compute @workgroup_size(64)\nfn cs_flow() {}\nconst FLOW_FIELD_TRAIL_WGSL = '';",
        glsl: "export const FLOW_FIELD_STATE_GLSL = '';\nexport const FLOW_FIELD_TRAIL_FRAG_GLSL = '';\nexport const FLOW_FIELD_POINT_VERT_GLSL = '';",
        constants: "export const DEFAULT_FLOW_CONFIG = { mode: 'flow', particleCount: 12000, trailHalfLife: 0.3, vortexRadius: 0.3 };",
        setupWgpu: "device.createComputePipeline(); cpass.dispatchWorkgroups(1); pass.draw(6, count);",
        setupGl: "const fbo = gl.createFramebuffer(); gl.drawArrays(gl.POINTS, 0, count);",
        useDotFlowField: "const f = usePointerVelocityField(); f.tick(d);",
        bridge: base.bridge,
        presets: base.presets,
    });
    // the HEAD-like source must RED S1 (retired-construct present) AND S2 (streamline absent).
    if (!headLike.some((v) => v.startsWith("S1")) || !headLike.some((v) => v.startsWith("S2")))
        fails.push("self-test: the BORN-RED anchor (synthetic HEAD-like mote/trail/compute source) did NOT red S1+S2");
    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:viz-dotflow",
        wave: "BG.W-DOTFLOW-REBUILD",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_VIZ_DOTFLOW_ARTIFACT", "proof-viz-dotflow.json");
    writeGateArtifact(out, artifact);

    console.log(
        "proof:viz-dotflow — the dot-flow-field: evenly-spaced beaded STREAMLINES over a curl-warped field (BG.W-DOTFLOW-REBUILD)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log(
            "  GREEN (S1 retired · S2 present · S3 round-trip · S4 fullscreen-fragment · S5 warm-identity · S6 pointer)",
        );
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
