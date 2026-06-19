#!/usr/bin/env node
// BC.W-GOOBLOB-PLAIN — proof:gooblob-plain, the goo-blob STAGE-1 floor gate
// (born-RED on the bare tree → GREEN at close).
//
// The goo-blob's MATH is already SOTA (the IQ-2024 normalized polynomial/circular smin +
// the analytic-gradient surface field). The BB blob was BROKEN by (1) the substrate crash
// (the no-adapter throw — fixed in BC.W-WEBGPU-EVERYWHERE), (2) the Safari flash (fixed in
// BC.W-SAFARI-WEBGL), and (3) the STAGE-2-and-beyond monolith `fs_main` with no verifiable
// STAGE-1 floor. This wave is the ARCHITECTURE: a `uStage`-gated `fs_main` whose STAGE-1
// path is the minimal verifiable floor (SDF + smin + fwidth-AA + warm-cream fill — NO lit,
// NO iridescence, NO SSS, NO shadow). The SOTA smin/normal/noise math is BYTE-PRESERVED.
//
// THE CARDINAL SPLIT — this gate replaces the BB `proof:flow-field`-style "the FALLBACK
// FILE EXISTS" proxy (postmortem/bb.md §80, the purest gate-paint-blindness) with a REAL
// rendered-surface paint assert: S4/S5 read a real-GPU capture record and assert
// `meanLum > 0` on BOTH a WebGPU backend AND an adapter-less host, + the one-connected-
// silhouette at the merge phase. The capture itself is the ORCHESTRATOR's real-Metal job
// (the `["local"]` paint arm); CI proves the SOURCE FLOOR (the `["ci"]` --source arm).
//
// SOURCE PREDICATES (device-free, born-RED → GREEN):
//   S1 — the STAGE-1 floor EXISTS: `metaball.wgsl.ts` carries a `uStage`-gated stripped
//        path (the `uStage > 0.5` branch returns the fill BEFORE the lit/iridescence/SSS
//        blocks are reached); the GLSL fallback transcribes the SAME branch. A planted
//        always-lit STAGE-1 (the HEAD monolith with no `uStage` gate) reds.
//   S2 — the smin MATH is BYTE-PRESERVED: `sminQuadraticG`/`sminCircularG`/`sceneDistG`/
//        `surfaceNormalFromGrad` carry their exact SOTA bodies verbatim. A math edit reds.
//   S3 — the fwidth-AA edge + derivative-safety: the STAGE-1 path carries the
//        fragment-stage `fwidth(d)` AA site; no `fwidth`/`dpdx`/`dpdy` lives in any helper
//        a `vs_main` could reach (the dual-module WGSL-validation trap). The `uStage` lane
//        rides the spare `s7.w` the typed-struct SoT reserved (the bridge writes it off
//        `config.variant`). A planted shared-helper derivative call reds.
//
// PAINT PREDICATES (real-GPU capture, `["local"]`):
//   S4 — the on-host paint: the capture record asserts `meanLum > 0` on BOTH a WebGPU
//        backend AND an adapter-less host (the BC.W-WEBGPU-EVERYWHERE fallback fired). A
//        `meanLum 0` black-void render (D9') reds.
//   S5 — the meatball merges: the capture record asserts the body+satellite silhouette is
//        ONE connected component at the merge phase (the worst-case smin bridge paints one
//        neck, not two discs). A two-disc render reds.
//
// SELF-TEST BITE (--selftest): a planted no-gate monolith, a math edit, a shared-helper
// derivative, and a meanLum-0 capture all MUST red — born-RED proof on a green HEAD.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/goo-blob");
const WGSL = resolve(DIR, "shaders/metaball.wgsl.ts");
const FRAG = resolve(DIR, "shaders/metaball.frag.ts");
const UNIFORMS = resolve(DIR, "shaders/metaball-uniforms.glsl.ts");
const BRIDGE = resolve(DIR, "composables/uniformBridgeWGPU.ts");
const TYPES = resolve(DIR, "types.ts");
// The real-GPU paint record (the orchestrator's Metal capture; the BB gate-paint-blindness
// close). When absent OR a backend's meanLum is 0 OR the merge silhouette is two discs, the
// paint arm reds — never a "the file exists" green.
const PAINT_RECORD = resolve(
    ROOT,
    "docs/tranches/BC/audit/visual/W-GOOBLOB-PLAIN-paint.json",
);

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const stripJsComments = (s) =>
    (s ?? "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

// ── S1: the STAGE-1 uStage-gated stripped floor exists in BOTH backends ──
function clauseStage1(over = {}) {
    const viol = [];
    const wgsl = over.wgsl ?? read(WGSL) ?? "";
    const frag = over.frag ?? read(FRAG) ?? "";

    // The WGSL fs_main reads uStage off the spare s7.w lane and gates an early-return
    // fill-only branch BEFORE the lit/iridescence/SSS/surface-normal work.
    if (!/let\s+uStage\s*=\s*u\.s7\.w\s*;/.test(wgsl))
        viol.push("S1: metaball.wgsl fs_main does not read uStage off the s7.w lane");
    const wgslBranch = /if\s*\(\s*uStage\s*>\s*0\.5\s*\)\s*\{/.test(wgsl);
    if (!wgslBranch)
        viol.push("S1: metaball.wgsl has no `if (uStage > 0.5)` STAGE-1 branch (the no-gate monolith)");

    // The STAGE-1 branch must RETURN before the lit block (uLit) and the surface normal —
    // structurally: the `if (uStage > 0.5)` block + its `return` must precede the
    // `surfaceNormalFromGrad(` call and the `if (uLit > 0.5)` lit block in source order.
    const idxStage = wgsl.search(/if\s*\(\s*uStage\s*>\s*0\.5\s*\)/);
    const idxNormal = wgsl.search(/let\s+N\s*=\s*surfaceNormalFromGrad\(/);
    const idxLit = wgsl.search(/if\s*\(\s*uLit\s*>\s*0\.5\s*\)/);
    if (wgslBranch && idxStage >= 0) {
        // The stripped branch must contain its OWN return (the early-out) and sit BEFORE
        // the normal/lit work — so STAGE 1 never reaches the dressing.
        const branchBody = wgsl.slice(idxStage, idxNormal >= 0 ? idxNormal : wgsl.length);
        if (!/return\s+vec4<f32>\(\s*rgb1\s*\*\s*alpha\s*,\s*alpha\s*\)\s*;/.test(branchBody))
            viol.push("S1: the WGSL STAGE-1 branch does not return the premultiplied fill (no early-out)");
        if (idxNormal >= 0 && idxStage > idxNormal)
            viol.push("S1: the WGSL STAGE-1 branch sits AFTER the surface normal (the lit work is reached)");
        if (idxLit >= 0 && idxStage > idxLit)
            viol.push("S1: the WGSL STAGE-1 branch sits AFTER the lit block (the dressing is reached)");
    }
    // The STAGE-1 fill path must NOT reach the lit/iridescence/SSS — assert the branch body
    // carries no spec/rim/irid/sss identifiers (a planted always-lit STAGE-1 reds).
    if (wgslBranch && idxStage >= 0) {
        const branchBody = wgsl.slice(
            idxStage,
            wgsl.indexOf("\n", wgsl.indexOf("}", idxStage)),
        );
        if (/\b(spec|rimFres|iridHue|sss|highlight)\b/.test(branchBody))
            viol.push("S1: the WGSL STAGE-1 branch reaches a lit/iridescence/SSS term (not the flat floor)");
    }

    // The GLSL fallback transcribes the SAME branch.
    if (!/uniform\s+float\s+uStage\s*;/.test(over.uniforms ?? read(UNIFORMS) ?? ""))
        viol.push("S1: metaball-uniforms.glsl does not declare uStage");
    if (!/if\s*\(\s*uStage\s*>\s*0\.5\s*\)\s*\{/.test(frag))
        viol.push("S1: metaball.frag has no `if (uStage > 0.5)` STAGE-1 branch (the GLSL twin)");
    const fIdxStage = frag.search(/if\s*\(\s*uStage\s*>\s*0\.5\s*\)/);
    const fIdxNormal = frag.search(/vec3\s+N\s*=\s*surfaceNormalFromGrad\(/);
    if (fIdxStage >= 0 && fIdxNormal >= 0 && fIdxStage > fIdxNormal)
        viol.push("S1: the GLSL STAGE-1 branch sits AFTER the surface normal (the lit work is reached)");

    return viol;
}

// ── S2: the smin/normal/noise SOTA math is byte-preserved (verbatim) ──
// The canonical bodies (the IQ-2024 normalized polynomial/circular smin + the analytic
// surface field + the dome normal). A re-touch of any of these reds — the rebuild is
// ARCHITECTURE (the gated fs_main), never a math rewrite.
const MATH_VERBATIM = [
    // sminQuadraticG — the k*4.0 / h*h*k*0.25 IQ form.
    "let k = k0 * 4.0;\n  let h = max(k - abs(a.x - b.x), 0.0) / k;\n  let m = h * h * k * 0.25;",
    // sminCircularG — the k *= 1/(1-sqrt(0.5)) circular form.
    "let k = k0 * (1.0 / (1.0 - sqrt(0.5)));\n  let h = max(k - abs(a.x - b.x), 0.0) / k;\n  let m = k * 0.5 * (1.0 + h - sqrt(1.0 - h * (h - 2.0)));",
    // the value+gradient propagation (the IQ analytic-normal mix pattern).
    "let dist = min(a.x, b.x) - m;\n  let grad = mix(a.yz, b.yz, w);",
    // sdgCircle — the value+gradient circle.
    "let d = p - center;\n  let len = length(d);\n  var grad = vec2<f32>(0.0, 1.0);\n  if (len > 1e-6) { grad = d / len; }",
    // surfaceNormalFromGrad — the dome lift.
    "let interior = clamp(-d / max(bodyR, 1e-4), 0.0, 1.0);\n  let z = sqrt(max(0.0, 1.0 - (1.0 - interior) * (1.0 - interior)));",
];
function clauseMathPreserved(over = {}) {
    const viol = [];
    const wgsl = over.wgsl ?? read(WGSL) ?? "";
    for (const snippet of MATH_VERBATIM) {
        if (!wgsl.includes(snippet))
            viol.push(
                `S2: the SOTA smin/normal math is NOT byte-preserved (missing verbatim "${snippet.slice(0, 36).replace(/\n/g, " ")}…")`,
            );
    }
    return viol;
}

// ── S3: fwidth-AA + derivative-safety + the spare-lane SoT extend ──
function clauseFwidthAndLane(over = {}) {
    const viol = [];
    const wgsl = over.wgsl ?? read(WGSL) ?? "";
    const bridge = over.bridge ?? read(BRIDGE) ?? "";
    const types = over.types ?? read(TYPES) ?? "";

    // The fragment-stage fwidth(d) AA site (the crisp edge — NOT a blurry ring).
    if (!/let\s+aa\s*=\s*max\(\s*fwidth\(\s*d\s*\)\s*,\s*1e-6\s*\)\s*;/.test(wgsl))
        viol.push("S3: the fragment-stage fwidth(d) AA-edge site is missing (the crisp edge)");

    // Derivative-safety: every fwidth/dpdx/dpdy call must sit INSIDE fs_main, never a
    // helper a vs_main could reach (the dual-module WGSL-validation trap). Extract every
    // top-level `fn <name>(…)` body and assert no derivative call lives outside fs_main.
    const stripped = stripJsComments(wgsl);
    const fnRe = /fn\s+([A-Za-z_]\w*)\s*\([^)]*\)[^{]*\{/g;
    let m;
    const derivRe = /\b(fwidth|dpdx|dpdy|dpdxFine|dpdyFine|dpdxCoarse|dpdyCoarse)\s*\(/;
    while ((m = fnRe.exec(stripped))) {
        const name = m[1];
        // Find the matching close brace for this fn body.
        let depth = 1;
        let i = fnRe.lastIndex;
        for (; i < stripped.length && depth > 0; i++) {
            if (stripped[i] === "{") depth++;
            else if (stripped[i] === "}") depth--;
        }
        const body = stripped.slice(fnRe.lastIndex, i);
        if (name !== "fs_main" && derivRe.test(body))
            viol.push(
                `S3: a derivative call (fwidth/dpdx/dpdy) lives in helper fn ${name} — a vs_main-reachable helper trips the dual-module WGSL-validation trap`,
            );
    }

    // The SoT extend: uStage rides the spare s7.w lane (the bridge writes it off
    // config.variant — the typed-struct EXTEND, never a re-fork).
    if (!/f32\[OFF\.s7\s*\+\s*3\]\s*=\s*config\.variant\s*===\s*["']blob["']\s*\?\s*1\.0\s*:\s*0\.0\s*;/.test(bridge))
        viol.push("S3: the WGSL bridge does not write uStage off config.variant on the spare s7.w lane");

    // The variant axis exists with the STAGE-1 "blob" member + the default "meatball" (no
    // regression — the full lit pipeline stays the default; no `variant="legacy"` alias).
    if (!/BlobVariant\s*=\s*["']blob["']\s*\|\s*["']meatball["']/.test(types))
        viol.push("S3: the BlobVariant axis (blob | meatball) is not declared in types.ts");
    if (!/variant:\s*["']meatball["']/.test(types))
        viol.push("S3: BLOB_CONFIG_DEFAULTS.variant is not the default `meatball` (the no-regression floor)");
    if (/variant\s*[?:]?\s*[=:]?\s*["']legacy["']/.test(types))
        viol.push("S3: a `legacy` variant alias exists (clean break, no alias)");

    return viol;
}

// ── S4/S5: the REAL-GPU paint arm (the BB gate-paint-blindness close) ──
// Reads the orchestrator's Metal capture record. NEVER a "the file exists" green — the
// record must carry meanLum > 0 on BOTH a WebGPU AND an adapter-less host (S4) + a single
// connected silhouette at the merge phase (S5). Absent/zero/two-disc all RED.
function clausePaint(over = {}) {
    const viol = [];
    const raw = over.paint !== undefined ? over.paint : read(PAINT_RECORD);
    if (raw == null) {
        viol.push(
            "S4/S5: the real-GPU paint record (W-GOOBLOB-PLAIN-paint.json) is ABSENT — the orchestrator's Metal capture is the binding paint floor (pending-orchestrator-capture)",
        );
        return viol;
    }
    let rec = null;
    try {
        rec = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (e) {
        viol.push(`S4/S5: the paint record is not valid JSON — ${e.message}`);
        return viol;
    }
    // S4 — meanLum > 0 on BOTH backends (the WebGPU primary AND the adapter-less fallback).
    const backends = rec.backends ?? {};
    const webgpu = backends.webgpu ?? backends["webgpu-primary"];
    const adapterless = backends.adapterless ?? backends["webgl2-fallback"];
    for (const [label, b] of [
        ["webgpu", webgpu],
        ["adapter-less", adapterless],
    ]) {
        if (!b) {
            viol.push(`S4: the paint record has no ${label} backend capture (both hosts must paint)`);
            continue;
        }
        if (typeof b.meanLum !== "number" || !(b.meanLum > 0))
            viol.push(`S4: the ${label} backend meanLum is not > 0 (the black-void D9' render)`);
    }
    // S5 — the meatball merges: ONE connected component at the merge phase.
    if (rec.mergeConnectedComponents == null) {
        viol.push("S5: the paint record has no mergeConnectedComponents readback (the meatball assert)");
    } else if (rec.mergeConnectedComponents !== 1) {
        viol.push(
            `S5: the merge-phase silhouette is ${rec.mergeConnectedComponents} components (two discs — the smin band does not bridge the worst-case orbit)`,
        );
    }
    return viol;
}

function runSource(over = {}) {
    return [
        ...clauseStage1(over),
        ...clauseMathPreserved(over),
        ...clauseFwidthAndLane(over),
    ];
}
function runAll(over = {}) {
    return [...runSource(over), ...clausePaint(over)];
}

// ── Self-test bite ──
function selfTest() {
    const fails = [];
    const wgsl = read(WGSL) ?? "";
    const frag = read(FRAG) ?? "";

    // (a) the no-gate monolith — strip the uStage branch from the WGSL.
    const noGate = runSource({
        wgsl: wgsl.replace(/if\s*\(\s*uStage\s*>\s*0\.5\s*\)\s*\{[\s\S]*?\n  \}\n/, ""),
    });
    if (noGate.length === 0) fails.push("self-test: a no-gate WGSL monolith did NOT red (S1)");

    // (b) a math edit — corrupt the sminQuadraticG IQ form.
    const mathEdit = runSource({
        wgsl: wgsl.replace("let m = h * h * k * 0.25;", "let m = h * h * k * 0.30;"),
    });
    if (mathEdit.length === 0) fails.push("self-test: a smin math edit did NOT red (S2)");

    // (c) a shared-helper derivative call — plant fwidth() in a helper fn.
    const helperDeriv = runSource({
        wgsl: wgsl.replace(
            "fn breath(phase: f32) -> f32 {",
            "fn breath(phase: f32) -> f32 {\n  let bad = fwidth(phase);",
        ),
    });
    if (helperDeriv.length === 0)
        fails.push("self-test: a shared-helper fwidth() did NOT red (S3 dual-module trap)");

    // (d) the always-lit STAGE-1 — plant a spec term inside the branch.
    const alwaysLit = runSource({
        wgsl: wgsl.replace(
            "let okl1 = gamutClampOklch(oklch);",
            "let spec = 1.0;\n    let okl1 = gamutClampOklch(oklch);",
        ),
    });
    if (alwaysLit.length === 0) fails.push("self-test: an always-lit STAGE-1 branch did NOT red (S1 flat-floor)");

    // (e) a meanLum-0 black-void capture MUST red (S4 — the D9' disease-root bite).
    const blackVoid = clausePaint({
        paint: JSON.stringify({
            backends: { webgpu: { meanLum: 0 }, adapterless: { meanLum: 0.4 } },
            mergeConnectedComponents: 1,
        }),
    });
    if (blackVoid.length === 0) fails.push("self-test: a meanLum-0 capture did NOT red (S4 disease-root)");

    // (f) a two-disc merge MUST red (S5 — the does-not-meatball bite).
    const twoDisc = clausePaint({
        paint: JSON.stringify({
            backends: { webgpu: { meanLum: 0.4 }, adapterless: { meanLum: 0.4 } },
            mergeConnectedComponents: 2,
        }),
    });
    if (twoDisc.length === 0) fails.push("self-test: a two-disc merge capture did NOT red (S5 meatball)");

    // (g) a clean synthetic capture (both paint, one component) must PASS the paint arm.
    const clean = clausePaint({
        paint: JSON.stringify({
            backends: { webgpu: { meanLum: 0.42 }, adapterless: { meanLum: 0.39 } },
            mergeConnectedComponents: 1,
        }),
    });
    if (clean.length !== 0)
        fails.push("self-test: a clean synthetic capture FAILED the paint arm (false-RED)");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    // --source: the device-free CI arm (S1-S3 only); default includes the local paint arm.
    const sourceOnly = process.argv.includes("--source");
    const viol = sourceOnly ? runSource() : runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:gooblob-plain",
        wave: "BC.W-GOOBLOB-PLAIN",
        arm: sourceOnly ? "source" : "full",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_GOOBLOB_PLAIN_ARTIFACT", "proof-gooblob-plain.json");
    writeGateArtifact(out, artifact);

    if (viol.length) {
        console.error(`proof:gooblob-plain (${artifact.arm}) — RED`);
        for (const v of viol) console.error("  ✗ " + v);
    } else {
        console.log(`proof:gooblob-plain (${artifact.arm}) — GREEN`);
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("proof:gooblob-plain --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("  ✗ " + f);
        } else {
            console.log("proof:gooblob-plain --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

main();
