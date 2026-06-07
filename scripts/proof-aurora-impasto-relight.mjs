#!/usr/bin/env node
// AW.W4.2 — the impasto height→normal→relight gate (proof:aurora-impasto-relight).
//
// The faked fixed-RGB edge rim (the phantom upper-left light, the `vec3(0.18,0.15,
// 0.11)`-style add in paintOver) is RETIRED. Impasto is now a REAL accumulated
// paint-height field lit by a MOVABLE directional source (diffuse + Blinn specular,
// in LINEAR before aces()). This gate asserts:
//
//   (1) THE FIXED RIM IS GONE — the `vec3(0.18, 0.15, 0.11)` rim constant (and its
//       cooler-shadow kin) is ABSENT from brush.glsl.ts.
//   (2) THE HEIGHT→NORMAL→RELIGHT PATH IS PRESENT — paintOver accumulates an `inout
//       float height`; relightImpasto derives a normal from dFdx/dFdy(height) and
//       applies diffuse + Blinn specular from uLightDir/uLightColor.
//   (3) THE LIGHT IS THREADED — uLightDir/uLightColor are declared in the shader,
//       in UNIFORM_NAMES, and uploaded by the bridge (so a uLightDir sweep moves the
//       catch-light — the AW.W8 cursor-as-light axis consumes this seam).
//   (4) THE RELIGHT IS IN LINEAR BEFORE aces() — relightImpasto runs inside the
//       medium (before the main()'s aces()/linearToSrgb seam, which proof:aurora-
//       space-gamma locks).
//
// bite-check: restoring the fixed `vec3(0.18, 0.15, 0.11)` rim → RED.

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
    const SH = resolve(ROOT, "src/components/custom/aurora/constants/shaders");
    _cliPaths = {
        ROOT,
        BRUSH: resolve(SH, "brush.glsl.ts"),
        MEDIUMS: resolve(SH, "mediums.glsl.ts"),
        FRAG: resolve(SH, "aurora.frag.ts"),
        GLSETUP: resolve(ROOT, "src/components/custom/aurora/composables/glSetup.ts"),
        BRIDGE: resolve(ROOT, "src/components/custom/aurora/composables/uniformBridge.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_IMPASTO_RELIGHT_ARTIFACT", "AW-aurora-impasto-relight"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, BRUSH, MEDIUMS, FRAG, GLSETUP, BRIDGE, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const read = (p) => (existsSync(p) ? stripComments(readFileSync(p, "utf8")) : null);
    const brush = read(BRUSH);
    const mediums = read(MEDIUMS);
    const frag = read(FRAG);
    const glsetup = read(GLSETUP);
    const bridge = read(BRIDGE);
    if (!brush || !mediums || !frag || !glsetup || !bridge) {
        violations.push("a required aurora source is absent");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:aurora-impasto-relight", facts, violations });
        console.error("[proof:aurora-impasto-relight] FAIL — source absent");
        process.exit(1);
    }

    // (1) the fixed-RGB rim constant is GONE.
    const rimRe = /vec3\s*\(\s*0\.18\s*,\s*0\.15\s*,\s*0\.11\s*\)/;
    const shadowRimRe = /vec3\s*\(\s*0\.10\s*,\s*0\.09\s*,\s*0\.07\s*\)/;
    facts.fixedRimAbsent = !rimRe.test(brush) && !shadowRimRe.test(brush);
    if (!facts.fixedRimAbsent) {
        violations.push("the faked fixed-RGB impasto rim (vec3(0.18,0.15,0.11) / its cooler-shadow kin) is STILL in paintOver — it must be RETIRED, not flagged");
    }

    // (2) the height→normal→relight path.
    facts.paintOverAccumulatesHeight = /void\s+paintOver\s*\([^)]*inout\s+float\s+height/.test(brush) && /height\s*\+=/.test(brush);
    facts.relightDerivesNormal =
        /vec3\s+relightImpasto\s*\(/.test(brush) &&
        /dFdx\s*\(\s*h\s*\)/.test(brush) && /dFdy\s*\(\s*h\s*\)/.test(brush) &&
        /normalize\s*\(\s*vec3\s*\(/.test(brush);
    facts.relightAppliesDiffuseSpec =
        /dot\s*\(\s*N\s*,\s*L\s*\)/.test(brush) && /pow\s*\(\s*max\s*\(\s*dot\s*\(\s*N\s*,\s*H\s*\)/.test(brush) && /uLightColor/.test(brush);
    facts.mediumCallsRelight = /relightImpasto\s*\(/.test(mediums);
    if (!facts.paintOverAccumulatesHeight) violations.push("paintOver does not accumulate an `inout float height` (the per-stroke paint-height deposit)");
    if (!facts.relightDerivesNormal) violations.push("relightImpasto does not derive a normal from dFdx/dFdy(height)");
    if (!facts.relightAppliesDiffuseSpec) violations.push("relightImpasto does not apply diffuse (dot(N,L)) + Blinn specular (pow(dot(N,H))) modulated by uLightColor");
    if (!facts.mediumCallsRelight) violations.push("mediumOil does not call relightImpasto (the height is accumulated but never lit)");

    // (3) the light uniforms are threaded.
    facts.shaderDeclaresLight = /uniform\s+vec3\s+uLightDir/.test(frag) && /uniform\s+vec3\s+uLightColor/.test(frag);
    facts.lightInNamesArray = /"uLightDir"/.test(glsetup) && /"uLightColor"/.test(glsetup);
    facts.bridgeUploadsLight = /uLightDir\b/.test(bridge) && /uLightColor\b/.test(bridge);
    if (!facts.shaderDeclaresLight) violations.push("the shader does not declare `uniform vec3 uLightDir` + `uniform vec3 uLightColor`");
    if (!facts.lightInNamesArray) violations.push("uLightDir/uLightColor are not in glSetup's UNIFORM_NAMES (the location cache misses them)");
    if (!facts.bridgeUploadsLight) violations.push("the bridge does not upload uLightDir/uLightColor");

    // (4) the relight is in linear BEFORE aces() — the medium runs before main()'s
    // aces()/linearToSrgb seam, so a relight call inside a medium is in linear by
    // construction. Assert relightImpasto is NOT after a linearToSrgb in the same
    // function (a defensive belt; proof:aurora-space-gamma locks the main() seam).
    facts.relightBeforeOetf = !/linearToSrgb[\s\S]*relightImpasto/.test(mediums);
    if (!facts.relightBeforeOetf) violations.push("relightImpasto runs AFTER a linearToSrgb in the medium — the relight must be in LINEAR before the OETF");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-impasto-relight", facts, violations });

    console.log("proof:aurora-impasto-relight — the real impasto height→normal→relight (AW.W4.2)");
    console.log(`  fixed-RGB rim retired     : ${facts.fixedRimAbsent ? "yes ✓" : "NO ✗ (the phantom rim is back)"}`);
    console.log(`  paintOver accumulates height: ${facts.paintOverAccumulatesHeight ? "yes ✓" : "NO ✗"}`);
    console.log(`  relight derives normal    : ${facts.relightDerivesNormal ? "yes ✓" : "NO ✗"}`);
    console.log(`  diffuse + Blinn from light : ${facts.relightAppliesDiffuseSpec ? "yes ✓" : "NO ✗"}`);
    console.log(`  light uniforms threaded   : shader=${facts.shaderDeclaresLight ? "✓" : "✗"} names=${facts.lightInNamesArray ? "✓" : "✗"} bridge=${facts.bridgeUploadsLight ? "✓" : "✗"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
