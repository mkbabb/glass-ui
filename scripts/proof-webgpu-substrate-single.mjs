#!/usr/bin/env node
// AW.W7b — the WebGPU substrate-binary gate (proof:webgpu-substrate-single).
//
// The critique's must-fix: proof:webgl-substrate-single clause (a) regex is
// `getContext('webgl2')`, which a `navigator.gpu` backend NEVER matches — so it
// passes BY IRRELEVANCE, giving zero protection on the WebGPU path. This NEW sibling
// gate is the WebGPU analogue:
//
//   (1) SINGLE ACQUISITION — the `navigator.gpu` device acquisition is confined to
//       the sanctioned sites: `renderMode.ts` (the resolveRenderModeAsync probe —
//       requestAdapter/requestDevice) + `createGPUCanvas.ts` (the swapchain
//       configure — getPreferredCanvasFormat/getContext("webgpu")). NO OTHER src file
//       acquires a `navigator.gpu` device (a second backend creating a device behind
//       glass-ui's back).
//   (2) NO BAKED AURORA CHOICES — NO baked pass-count, tensor format (`rgba16float`),
//       or Kuwahara-sector-count literal appears in EITHER substrate file
//       (`createCanvasLifecycle.ts` / `createGPUCanvas.ts`). The generic N-pass seam
//       a consumer configures must NOT bake aurora's choices (the consumer-#1 leak).
//   (3) THE WGSL TWIN SPLICES THE SHARED CHUNK — aurora.wgsl.ts imports the shared
//       procedural-color chunk's WGSL exports rather than re-authoring the
//       OETF/matrices inline (a re-authored WGSL color core is the AV.W1 two-copy
//       divergence).
//
// bite-check: bake `passCount = 4` or `rgba16float` into createGPUCanvas.ts → clause 2
// REDs; add a 2nd `navigator.gpu` acquisition outside the sanctioned sites → clause 1
// REDs; re-author the WGSL OETF inline in aurora.wgsl.ts → clause 3 REDs.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
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
function walk(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        if (n === "node_modules") continue;
        const p = join(dir, n);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, acc);
        else if (/\.(ts|tsx|vue)$/.test(n) && !/\.(test|spec)\.ts$/.test(n) && !p.includes("__tests__")) acc.push(p);
    }
    return acc;
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        PROBE: resolve(ROOT, "src/components/custom/aurora/constants/renderMode.ts"),
        GPU: resolve(ROOT, "src/composables/glass/createGPUCanvas.ts"),
        LIFECYCLE: resolve(ROOT, "src/composables/glass/webgl/createCanvasLifecycle.ts"),
        WGSL: resolve(ROOT, "src/components/custom/aurora/constants/shaders/aurora.wgsl.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_WEBGPU_SUBSTRATE_SINGLE_ARTIFACT", "AW-webgpu-substrate-single"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, SRC, PROBE, GPU, LIFECYCLE, WGSL, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(GPU)) {
        violations.push("createGPUCanvas.ts (the WebGPU substrate sibling) is absent");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:webgpu-substrate-single", facts, violations });
        console.error("[proof:webgpu-substrate-single] FAIL — createGPUCanvas absent");
        process.exit(1);
    }

    // (1) the navigator.gpu acquisition sites are exactly the sanctioned set.
    const GPU_RE = /navigator\.gpu/;
    const sites = [];
    for (const file of walk(SRC)) {
        if (GPU_RE.test(stripComments(readFileSync(file, "utf8")))) sites.push(resolve(file));
    }
    facts.navigatorGpuSites = sites.map((s) => s.slice(ROOT.length + 1));
    const sanctioned = new Set([resolve(PROBE), resolve(GPU)]);
    const unsanctioned = sites.filter((s) => !sanctioned.has(s));
    facts.unsanctionedSites = unsanctioned.map((s) => s.slice(ROOT.length + 1));
    if (unsanctioned.length > 0) {
        violations.push(`(1) navigator.gpu is acquired in an UNSANCTIONED site (${facts.unsanctionedSites.join(", ")}) — the device acquisition must stay in renderMode.ts (the probe) + createGPUCanvas.ts (the swapchain); a second backend creating a device behind glass-ui's back REDs`);
    }
    // requestAdapter/requestDevice (the actual device acquisition) lives in the probe ONLY.
    const probeText = stripComments(readFileSync(PROBE, "utf8"));
    facts.probeAcquiresDevice = /requestAdapter\s*\(/.test(probeText) && /requestDevice\s*\(/.test(probeText);
    const gpuText = stripComments(readFileSync(GPU, "utf8"));
    facts.gpuCanvasNoRequestAdapter = !/requestAdapter\s*\(/.test(gpuText);
    if (!facts.probeAcquiresDevice) violations.push("(1) the probe (renderMode.ts) does not acquire the device via requestAdapter→requestDevice");
    if (!facts.gpuCanvasNoRequestAdapter) violations.push("(1) createGPUCanvas.ts calls requestAdapter — the acquisition must stay in the probe; createGPUCanvas consumes the passed device");

    // (2) no baked aurora pass-count / tensor format / Kuwahara-sector-count in EITHER substrate.
    function bakedChoices(label, path) {
        if (!existsSync(path)) {
            violations.push(`(2) the substrate file ${label} is absent`);
            return;
        }
        const src = stripComments(readFileSync(path, "utf8"));
        const baked = [];
        if (/passCount\s*=\s*\d/.test(src) || /\bpassCount:\s*\d/.test(src)) baked.push("a baked pass-count");
        if (/rgba16float|rgba16f\b/i.test(src)) baked.push("a baked rgba16float tensor format");
        if (/sectorCount\s*=\s*\d|kuwahara/i.test(src)) baked.push("a baked Kuwahara sector-count");
        if (/from\s*["'][^"']*aurora/.test(src)) baked.push("an aurora import (the substrate must stay consumer-agnostic)");
        if (baked.length) violations.push(`(2) ${label} BAKES consumer-#1 choices (${baked.join("; ")}) — the generic N-pass seam must not bake aurora's choices`);
        return baked;
    }
    facts.lifecycleBaked = bakedChoices("createCanvasLifecycle.ts", LIFECYCLE) ?? [];
    facts.gpuCanvasBaked = bakedChoices("createGPUCanvas.ts", GPU) ?? [];

    // (3) the WGSL twin splices the shared chunk (not re-authored).
    const wgsl = existsSync(WGSL) ? stripComments(readFileSync(WGSL, "utf8")) : null;
    facts.wgslSplicesChunk =
        !!wgsl &&
        /OETF_WGSL[\s\S]*?OKLCH_MATRICES_WGSL[\s\S]*?FBM_ROT_WGSL/.test(wgsl) &&
        /procedural-color\.glsl/.test(wgsl) &&
        !/mat3x3f\s*\(\s*0\.4122214708/.test(wgsl);
    if (!facts.wgslSplicesChunk) violations.push("(3) aurora.wgsl.ts does not SPLICE the shared procedural-color chunk's WGSL exports (it must import them, not re-author the OETF/matrices inline — the AV.W1 two-copy divergence)");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:webgpu-substrate-single", facts, violations });

    console.log("proof:webgpu-substrate-single — ONE WebGPU acquisition, no baked passes (AW.W7b)");
    console.log(`  (1) navigator.gpu sites   : ${facts.navigatorGpuSites.length} (${unsanctioned.length === 0 ? "sanctioned only ✓" : "UNSANCTIONED: " + facts.unsanctionedSites.join(", ")})`);
    console.log(`  (1) acquisition in probe  : ${facts.probeAcquiresDevice && facts.gpuCanvasNoRequestAdapter ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) no baked passes/format: ${facts.lifecycleBaked.length + facts.gpuCanvasBaked.length === 0 ? "yes ✓" : "NO ✗"}`);
    console.log(`  (3) WGSL splices the chunk: ${facts.wgslSplicesChunk ? "yes ✓" : "NO ✗"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
