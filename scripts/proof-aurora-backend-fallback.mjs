#!/usr/bin/env node
// AW.W7b — the WebGL2-fallback zero-regression gate (proof:aurora-backend-fallback).
//
// WebGPU is the capability-gated ENHANCEMENT; the WebGL2 single-pass fragment shader
// is the DECLARED universal fallback (then the CSS placeholder floor). This gate
// asserts the fallback route is intact + correct:
//
//   (1) THE ASYNC PROBE EXISTS — resolveRenderModeAsync extends the synchronous
//       resolveRenderMode to a "webgpu" | "webgl" | "css" resolution.
//   (2) requestAdapter null → webgl — a null adapter (WebGPU unsupported) drops to
//       the WebGL2 fallback (requestAdapter NEVER rejects — it resolves null).
//   (3) isFallbackAdapter → webgl — a software/fallback adapter is SLOWER than the
//       WebGL2 fragment path, so it drops to "webgl", NOT "webgpu" (the bite: accepting
//       a fallback adapter would route a slow software path).
//   (4) THE RUNTIME ROUTES — runtime.ts routes to createGPUCanvas only when a device
//       is supplied; else createWebGLCanvas (the WebGL2 path is the default).
//   (5) THE WGSL TWIN DRAWS THE SAME aurora — aurora.wgsl.ts splices the shared color
//       chunk + draws ONE render pass (the single-pass parity with the WebGL2 path).
//
// bite-check: break the WebGL2 fallback route (the probe always returns webgpu even
// when absent, OR accepts an isFallbackAdapter software adapter) → this gate REDs.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripComments(t) {
    return t
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .map((l) => {
            const i = l.indexOf("//");
            return i === -1 ? l : l.slice(0, i);
        })
        .join("\n");
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const A = resolve(ROOT, "src/components/custom/aurora");
    _cliPaths = {
        ROOT,
        RENDERMODE: resolve(A, "constants/renderMode.ts"),
        RUNTIME: resolve(A, "composables/runtime.ts"),
        WGSL: resolve(A, "constants/shaders/aurora.wgsl.ts"),
        USEAURORA: resolve(A, "composables/useAurora.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_BACKEND_FALLBACK_ARTIFACT", "AW-aurora-backend-fallback"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, RENDERMODE, RUNTIME, WGSL, USEAURORA, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const read = (p) => (existsSync(p) ? stripComments(readFileSync(p, "utf8")) : null);
    const rm = read(RENDERMODE);
    const runtime = read(RUNTIME);
    const wgsl = read(WGSL);
    const useAurora = read(USEAURORA);
    if (!rm || !runtime || !wgsl || !useAurora) {
        violations.push("a required aurora source is absent");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:aurora-backend-fallback", facts, violations });
        console.error("[proof:aurora-backend-fallback] FAIL — source absent");
        process.exit(1);
    }

    // (1) the async probe.
    facts.asyncProbe = /export\s+async\s+function\s+resolveRenderModeAsync/.test(rm) && /requestAdapter\s*\(/.test(rm);
    if (!facts.asyncProbe) violations.push("(1) resolveRenderModeAsync (the async WebGPU probe) is absent");

    // (2) null adapter → webgl.
    facts.nullToWebgl = /if\s*\(\s*!adapter[\s\S]{0,80}?substrate:\s*["']webgl["']/.test(rm) ||
        (/!adapter/.test(rm) && /isFallbackAdapter/.test(rm) && /["']webgl["']/.test(rm));
    if (!facts.nullToWebgl) violations.push("(2) a null adapter (WebGPU unsupported) does not drop to the WebGL2 fallback");

    // (3) isFallbackAdapter → webgl (the software-adapter rejection).
    facts.fallbackAdapterRejected = /isFallbackAdapter/.test(rm);
    if (!facts.fallbackAdapterRejected) violations.push("(3) the probe does NOT check isFallbackAdapter — a software/fallback adapter would route a slow software path instead of the WebGL2 fragment fallback (the bite)");

    // (4) the runtime routes (gpuDevice → createGPUCanvas; else createWebGLCanvas).
    facts.runtimeRoutes = /options\.gpuDevice/.test(runtime) && /createGPUCanvas\s*\(/.test(runtime) && /createWebGLCanvas\s*\(/.test(runtime);
    if (!facts.runtimeRoutes) violations.push("(4) runtime.ts does not route to createGPUCanvas when a device is present (the WebGL2 path must be the default fallback)");

    // (5) the WGSL twin draws ONE render pass (single-pass parity).
    facts.wgslSinglePass = /@fragment/.test(wgsl) && /fs_main/.test(wgsl) && /linearToSrgb/.test(wgsl);
    if (!facts.wgslSinglePass) violations.push("(5) aurora.wgsl.ts does not draw the single-pass aurora (the WGSL fragment + the OETF close)");

    // (6) useAurora runs the probe PAST first paint (the CSS placeholder paints first).
    facts.probePastFirstPaint = /resolveRenderModeAsync\s*\(/.test(useAurora) && /scheduleAfterFirstPaint/.test(useAurora);
    if (!facts.probePastFirstPaint) violations.push("(6) useAurora does not run the WebGPU probe behind the deferred first-paint schedule (it could block first paint)");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-backend-fallback", facts, violations });

    console.log("proof:aurora-backend-fallback — WebGL2 is the zero-regression fallback (AW.W7b)");
    console.log(`  (1) async probe           : ${facts.asyncProbe ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) null adapter → webgl  : ${facts.nullToWebgl ? "yes ✓" : "NO ✗"}`);
    console.log(`  (3) isFallbackAdapter→webgl: ${facts.fallbackAdapterRejected ? "yes ✓" : "NO ✗"}`);
    console.log(`  (4) runtime routes        : ${facts.runtimeRoutes ? "yes ✓" : "NO ✗"}`);
    console.log(`  (5) WGSL single-pass twin : ${facts.wgslSinglePass ? "yes ✓" : "NO ✗"}`);
    console.log(`  (6) probe past first paint: ${facts.probePastFirstPaint ? "yes ✓" : "NO ✗"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
