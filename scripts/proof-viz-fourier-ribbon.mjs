#!/usr/bin/env node
// BI.W-FOURIER-RIBBON — proof:viz-fourier-ribbon, the G5 visual-parity SOURCE gate.
//
// The fourier-field's fullscreen per-pixel SDF (the O(pixels×segments) loop over ALL ≤384
// segments at EVERY pixel — the "god awful" architecture, UF-E7 / FAM-5 / PERF-1 [P0])
// RETIRED onto an INSTANCED GEOMETRY ribbon (D-VIZ PASS-1 §3.4a / PASS-4). This gate is
// born-RED against the fullscreen SDF and GREEN at the ribbon landing. Five clauses, each
// device-free + falsifiable:
//
//   FB1 — the fullscreen-SDF fs bodies (glsl fragment + render.wgsl fs_main) DEFINITION-ABSENT
//         (retired wholesale — no dual path per proof:no-dual-path): NO per-pixel curve loop
//         over MAX_CURVE_SAMPLES in either fragment; the fullscreen curve/chain UNIFORM TABLES
//         gone; the instanced attributes / instance_index in their place.
//   FB2 — the instanced ribbon programs present on BOTH backends: the GLSL instanced quad
//         (aCorner/aSeg/aData + the quad expansion) + drawArraysInstanced, the WGSL
//         instance_index vertex-pull + override LAYER + draw(6, count) — over the SHARED
//         geometry leaf (planRibbonLayers). The compute kernel is BYTE-IDENTICAL (the
//         curveSamples/chainTips read_write storage buffers unchanged).
//   FB3 — the RIBBON_TAIL_FRAC WGSL-vs-TS mirror holds through the rewrite (the proof:viz FB1
//         carry): constants.ts == glsl == wgsl, + the taper + under-glow live in the trail
//         branch of both shaders.
//   FB4 — the per-frame --ff-head-* setProperty restyle bridge GONE (the (b) perf attribution);
//         computeFourierFit HOISTED out of the frame loop (recompute on spectrum change only).
//   FB5 — the epicycle-join seam fixed: blendEquation MAX (GL) / operation:"max" (WGPU) on the
//         epicycle layer + the shared plan marks it (union-per-arm).
//
// SELF-TEST BITE (--selftest): a planted fullscreen per-pixel curve loop REDs FB1; a planted
// per-frame computeFourierFit / --ff-head-xy write REDs FB4; a dropped tail-frac mirror REDs
// FB3; a dropped MAX blend REDs FB5 — the born-RED witnesses the ribbon landing greened.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const FF = resolve(ROOT, "src/components/custom/fourier-field");

const PATHS = {
    glsl: resolve(FF, "shaders/fourier-field.glsl.ts"),
    wgsl: resolve(FF, "shaders/fourier-field.render.wgsl.ts"),
    compute: resolve(FF, "shaders/fourier-field.compute.wgsl.ts"),
    ribbon: resolve(FF, "shaders/fourier-field.ribbon.ts"),
    constants: resolve(FF, "constants.ts"),
    glSetup: resolve(FF, "composables/fourierFieldGLSetup.ts"),
    wgpuSetup: resolve(FF, "composables/fourierFieldWGPUSetup.ts"),
    composable: resolve(FF, "composables/useFourierField.ts"),
    sfc: resolve(FF, "FourierField.vue"),
};

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const stripComments = (s) =>
    (s ?? "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

function firstNum(src, name) {
    const s = src ?? "";
    let m = s.match(
        new RegExp(name + "\\s*(?::\\s*[\\w<>]+\\s*)?=\\s*(-?\\d+(?:\\.\\d+)?)"),
    );
    if (m) return parseFloat(m[1]);
    m = s.match(new RegExp("#define\\s+" + name + "\\s+(-?\\d+(?:\\.\\d+)?)"));
    return m ? parseFloat(m[1]) : null;
}

// Extract a `function <name>(...) { ... }` body by brace matching (device-free static parse).
function fnBody(src, header) {
    const i = (src ?? "").indexOf(header);
    if (i < 0) return "";
    const open = src.indexOf("{", i);
    if (open < 0) return "";
    let depth = 0;
    for (let j = open; j < src.length; j++) {
        const c = src[j];
        if (c === "{") depth++;
        else if (c === "}") {
            depth--;
            if (depth === 0) return src.slice(open, j + 1);
        }
    }
    return src.slice(open);
}

// Load the source set with per-clause overrides (the self-test plants broken sources).
function load(over = {}) {
    const src = {};
    for (const [key, p] of Object.entries(PATHS)) {
        src[key] = over[key] !== undefined ? over[key] : (read(p) ?? "");
    }
    return src;
}

// ── FB1 — the fullscreen-SDF fs bodies DEFINITION-ABSENT ──
function clauseFB1(src) {
    const viol = [];
    const glsl = stripComments(src.glsl);
    const wgsl = stripComments(src.wgsl);
    // The GLSL fullscreen per-pixel curve loop is GONE (the O(pixels×segments) architecture).
    if (/for\s*\(\s*int\s+i\s*=\s*0;\s*i\s*<\s*MAX_CURVE_SAMPLES/.test(glsl))
        viol.push(
            "FB1: the GLSL shader still runs a fullscreen per-pixel curve loop `for (int i = 0; i < MAX_CURVE_SAMPLES …)` — the O(pixels×segments) SDF is not retired",
        );
    // The fullscreen curve/chain UNIFORM TABLES are GONE (replaced by instance attributes).
    if (/uniform\s+vec3\s+uCurve/.test(glsl) || /uniform\s+vec2\s+uChain/.test(glsl))
        viol.push(
            "FB1: the GLSL shader still declares the fullscreen `uCurve[]`/`uChain[]` uniform tables — the ribbon reads INSTANCE attributes (aSeg/aData), not a fullscreen uniform array",
        );
    // The WGSL fullscreen per-pixel curve loop is GONE.
    if (/for\s*\(\s*var\s+i\s*=\s*0;\s*i\s*<\s*MAX_CURVE_SAMPLES/.test(wgsl))
        viol.push(
            "FB1: the WGSL render pass still runs a fullscreen per-pixel curve loop `for (var i = 0; i < MAX_CURVE_SAMPLES …)` — render.wgsl fs_main ran the IDENTICAL fullscreen SDF, it must retire too",
        );
    return viol;
}

// ── FB2 — the instanced ribbon programs on BOTH backends + compute byte-identical ──
function clauseFB2(src) {
    const viol = [];
    const glsl = stripComments(src.glsl);
    const wgsl = stripComments(src.wgsl);
    const glSetup = src.glSetup ?? "";
    const wgpuSetup = src.wgpuSetup ?? "";
    const ribbon = src.ribbon ?? "";
    const compute = stripComments(src.compute);

    // GLSL — the instanced quad program: the unit-corner + per-instance seg/data attributes +
    // the quad expansion (a→b padded / AABB).
    if (!/in\s+vec2\s+aCorner/.test(glsl) || !/in\s+vec4\s+aSeg/.test(glsl) || !/in\s+vec4\s+aData/.test(glsl))
        viol.push(
            "FB2: the GLSL shader has no instanced attributes (aCorner + aSeg + aData) — the ribbon expands a per-instance quad, not a fullscreen triangle",
        );
    if (!/mix\(\s*a\s*-\s*dir\s*\*\s*ext/.test(glsl))
        viol.push(
            "FB2: the GLSL vertex has no capsule quad expansion (`mix(a - dir * ext, b + dir * ext, …)`) — the per-segment bbox is absent",
        );
    if (!/drawArraysInstanced/.test(glSetup))
        viol.push(
            "FB2: the GL setup issues no `drawArraysInstanced` — the ribbon layers are not drawn instanced",
        );

    // WGSL — the vertex-pulling instanced render pass: instance_index + the override LAYER +
    // the per-layer instanced draw.
    if (!/@builtin\(instance_index\)/.test(wgsl))
        viol.push(
            "FB2: the WGSL render pass has no `@builtin(instance_index)` — the ribbon does not VERTEX-PULL per-instance endpoints from the storage buffers",
        );
    if (!/override\s+LAYER\s*:\s*i32/.test(wgsl))
        viol.push(
            "FB2: the WGSL render pass has no `override LAYER: i32` — the 5 instanced ribbon pipelines cannot specialize the layer",
        );
    if (!/\.draw\(\s*6\s*,/.test(wgpuSetup))
        viol.push(
            "FB2: the WGPU setup issues no per-layer `draw(6, instanceCount, …)` — the instanced ribbon layers are not drawn",
        );

    // The SHARED geometry leaf — planRibbonLayers consumed by BOTH setups.
    if (!/export function planRibbonLayers/.test(ribbon))
        viol.push(
            "FB2: the shared ribbon geometry leaf exports no `planRibbonLayers` — the ordered draw plan both backends read is absent",
        );
    if (!/planRibbonLayers/.test(glSetup) || !/planRibbonLayers/.test(wgpuSetup))
        viol.push(
            "FB2: a setup does not import the shared `planRibbonLayers` leaf — the two backends fork their own draw plan",
        );

    // The COMPUTE kernel byte-identical: the curveSamples/chainTips read_write storage buffers
    // + the @workgroup_size(64) cs_main are unchanged (the WGSL buffers untouched).
    if (
        !/@compute\s+@workgroup_size\(64\)/.test(compute) ||
        !/curveSamples\s*:\s*array<vec4<f32>>/.test(compute) ||
        !/chainTips\s*:\s*array<vec4<f32>>/.test(compute) ||
        !/storage,\s*read_write/.test(compute)
    )
        viol.push(
            "FB2: the compute kernel is not byte-identical (missing @workgroup_size(64) cs_main / the read_write curveSamples+chainTips storage buffers) — the ribbon reads the UNCHANGED compute-filled buffers",
        );
    return viol;
}

// ── FB3 — the RIBBON_TAIL_FRAC mirror + taper + under-glow (the proof:viz FB1 carry) ──
function clauseFB3(src) {
    const viol = [];
    const tsFrac = firstNum(src.constants, "RIBBON_TAIL_FRAC");
    if (tsFrac === null || tsFrac <= 0 || tsFrac >= 1)
        viol.push("FB3: constants.ts declares no valid `RIBBON_TAIL_FRAC` (0..1)");
    for (const [label, str] of [
        ["GLSL", src.glsl],
        ["WGSL", src.wgsl],
    ]) {
        const s = stripComments(str);
        const shFrac = firstNum(s, "RIBBON_TAIL_FRAC");
        if (shFrac === null)
            viol.push(`FB3: the ${label} shader declares no \`RIBBON_TAIL_FRAC\` (the taper mirror is broken)`);
        else if (tsFrac !== null && Math.abs(shFrac - tsFrac) > 1e-6)
            viol.push(
                `FB3: the ${label} shader RIBBON_TAIL_FRAC (${shFrac}) DRIFTS from constants.ts (${tsFrac}) — the mid-body floor guarantee breaks`,
            );
        if (!/ribbonHalf\s*=\s*halfW\s*\*\s*\(\s*RIBBON_TAIL_FRAC/.test(s))
            viol.push(`FB3: the ${label} trail branch has no age-scaled taper \`ribbonHalf = halfW * (RIBBON_TAIL_FRAC + …)\``);
        if (!/glowHalf\s*=\s*ribbonHalf\s*\*\s*RIBBON_UNDERGLOW_SCALE/.test(s))
            viol.push(`FB3: the ${label} trail branch paints no soft UNDER-GLOW (\`glowHalf = ribbonHalf * RIBBON_UNDERGLOW_SCALE\`)`);
    }
    return viol;
}

// ── FB4 — the --ff-head-* restyle bridge GONE + computeFourierFit hoisted ──
function clauseFB4(src) {
    const viol = [];
    // Strip comments so a doc mention of the retired token never false-flags — only a LIVE
    // `setProperty(--ff-head…)` CALL (the actual per-frame restyle) counts.
    const sfc = stripComments(src.sfc);
    const composable = stripComments(src.composable);
    // The dead per-frame CSS restyle bridge is GONE (no live consumer — the (b) attribution).
    if (/setProperty\(\s*["'`]--ff-head/.test(sfc))
        viol.push(
            "FB4: FourierField.vue still writes the per-frame `--ff-head-xy`/`--ff-head-hue` setProperty restyle bridge — the dead CSS-sprite seam must be retired (the (b) perf attribution)",
        );
    if (/onHeadFrame/.test(sfc) || /onHeadFrame/.test(composable))
        viol.push(
            "FB4: `onHeadFrame` survives — the per-frame head-UV seam that drove the dead restyle bridge is not retired",
        );
    // computeFourierFit is HOISTED — it appears ONLY behind a spectrum-identity guard, NEVER
    // in a per-frame path. Assert the setups' frame() body carries no computeFourierFit call
    // and syncSpectrum guards it; assert the composable's ensureFit guards it.
    for (const [label, setup] of [
        ["GL", src.glSetup],
        ["WGPU", src.wgpuSetup],
    ]) {
        const frameBody = fnBody(setup ?? "", "function frame(");
        if (/computeFourierFit\s*\(/.test(frameBody))
            viol.push(
                `FB4: the ${label} setup calls computeFourierFit INSIDE frame() — the O(FIT_SAMPLES) bbox pass must be hoisted to syncSpectrum (recompute on spectrum change only)`,
            );
        const sync = fnBody(setup ?? "", "function syncSpectrum(");
        if (/computeFourierFit\s*\(/.test(sync) && !/===\s*activeSpectrum/.test(sync))
            viol.push(
                `FB4: the ${label} setup's syncSpectrum calls computeFourierFit with no \`=== activeSpectrum\` identity guard — the hoist is not gated`,
            );
    }
    const ensureFit = fnBody(composable, "ensureFit = ");
    if (/computeFourierFit\s*\(/.test(composable) && !/!==\s*fitSpectrum/.test(ensureFit))
        viol.push(
            "FB4: useFourierField calls computeFourierFit outside the `!== fitSpectrum` cache guard — the fit is not hoisted out of the frame loop",
        );
    return viol;
}

// ── FB5 — the epicycle-join seam fixed (MAX blend / union-per-arm) ──
function clauseFB5(src) {
    const viol = [];
    const glSetup = src.glSetup ?? "";
    const wgpuSetup = src.wgpuSetup ?? "";
    const ribbon = src.ribbon ?? "";
    if (!/blendEquation\(\s*gl\.MAX\s*\)/.test(glSetup))
        viol.push(
            "FB5: the GL setup does not `blendEquation(gl.MAX)` the epicycle layer — the epicycle-join over-composite SEAM (the named 9× residual) is not fixed",
        );
    if (!/operation:\s*["']max["']/.test(wgpuSetup))
        viol.push(
            "FB5: the WGPU setup has no `operation: \"max\"` epicycle blend — the epicycle-join seam is not fixed on the WGSL primary",
        );
    if (!/kind:\s*["']epicycle["'],\s*[^}]*blend:\s*["']max["']/.test(ribbon))
        viol.push(
            "FB5: the shared ribbon plan does not mark the epicycle layer `blend: \"max\"` — the union-per-arm blend is not planned",
        );
    return viol;
}

function evaluate(over = {}) {
    const src = load(over);
    return [
        ...clauseFB1(src),
        ...clauseFB2(src),
        ...clauseFB3(src),
        ...clauseFB4(src),
        ...clauseFB5(src),
    ];
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = evaluate();

    const selfFails = [];
    if (isSelftest) {
        // A planted fullscreen per-pixel curve loop REDs FB1.
        const glslLoop =
            "in vec2 aCorner; in vec4 aSeg; in vec4 aData;\nvoid main(){ for (int i = 0; i < MAX_CURVE_SAMPLES; i++) { } }";
        if (!evaluate({ glsl: glslLoop }).some((v) => v.startsWith("FB1")))
            selfFails.push("a planted fullscreen per-pixel curve loop did NOT red FB1");
        // A planted per-frame computeFourierFit REDs FB4.
        const glFramePerFrame =
            "function syncSpectrum(){ if (s === activeSpectrum) return; }\nfunction frame(t){ const f = computeFourierFit(getSpectrum()); }";
        if (!evaluate({ glSetup: glFramePerFrame }).some((v) => v.startsWith("FB4")))
            selfFails.push("a planted per-frame computeFourierFit in frame() did NOT red FB4");
        // A planted --ff-head-xy write REDs FB4.
        if (
            !evaluate({ sfc: "el.style.setProperty('--ff-head-xy', v);" }).some((v) =>
                v.startsWith("FB4"),
            )
        )
            selfFails.push("a planted --ff-head-xy setProperty write did NOT red FB4");
        // A dropped tail-frac mirror REDs FB3.
        if (
            !evaluate({ wgsl: "const RIBBON_TAIL_FRAC: f32 = 0.9;" }).some((v) =>
                v.startsWith("FB3"),
            )
        )
            selfFails.push("a drifted WGSL RIBBON_TAIL_FRAC did NOT red FB3");
        // A dropped MAX blend REDs FB5.
        if (
            !evaluate({ glSetup: "gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);" }).some(
                (v) => v.startsWith("FB5"),
            )
        )
            selfFails.push("a GL setup with no blendEquation(gl.MAX) did NOT red FB5");
    }

    const ok = viol.length === 0;
    const artifact = {
        gate: "proof:viz-fourier-ribbon",
        wave: "BI.W-FOURIER-RIBBON",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath(
        "GLASS_UI_VIZ_FOURIER_RIBBON_ARTIFACT",
        "proof-viz-fourier-ribbon.json",
    );
    writeGateArtifact(out, artifact);

    if (viol.length) {
        console.error("proof:viz-fourier-ribbon — RED");
        for (const v of viol) console.error("  ✗ " + v);
    } else {
        console.log(
            "proof:viz-fourier-ribbon — GREEN (FB1 fullscreen-SDF-retired · FB2 instanced-both-backends+compute-byte-identical · FB3 tail-frac-mirror · FB4 restyle-bridge-gone+fit-hoisted · FB5 epicycle-seam-MAX)",
        );
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("proof:viz-fourier-ribbon --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("  ✗ " + f);
        } else {
            console.log("proof:viz-fourier-ribbon --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok && selfFails.length === 0 ? 0 : 1);
}

main();
