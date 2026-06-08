#!/usr/bin/env node
// AX.W13 — the FIRST-CLASS van-Gogh medium gate (proof:aurora-vangogh-preset).
//
// RE-AUTHORED born-RED. The AW.W4.3 gate asserted the OPPOSITE — the `uMedium==5`
// energy-grade switch buried in bestOil — and PASSED over a `mediumVangogh` that was
// literally `return mediumOil(...)` (a passthrough; van-Gogh ≡ energy-graded oil). A
// passthrough + a buried branch both PASS the old text gate (the cardinal-lesson
// instance). This gate inverts: van-Gogh must be a FIRST-CLASS body composing its OWN
// vangogh StrokeProfile, and the energy grade must be a PROFILE field, not a buried
// dispatch branch. It asserts:
//
//   (1) UNION + ID + DISPATCH — `AuroraMedium` (presets.ts) includes "vangogh";
//       MEDIUM_ID maps vangogh:5; main() dispatches uMedium==5 → mediumVangogh.
//   (2) NOT-A-PASSTHROUGH — `mediumVangogh`'s body is NOT `return mediumOil(...)`; it
//       fetches a vangogh StrokeProfile (profileFor(MEDIUM_VANGOGH, …)).
//   (3) DISTINCT COMMA/CRESCENT PROFILE — profileFor authors a MEDIUM_VANGOGH case
//       setting shapeType=4 (the comma/crescent strokeShape); strokeShape(type==4)
//       exists in brush.glsl.ts (the asymmetric-taper SDF).
//   (4) ATOMIC PLACEMENT + FULL-HEIGHT IMPASTO — the vangogh profile carries SPARSE
//       density gates (lower than oil's, the visible inter-stroke gaps) AND a
//       full-height impasto crown (impastoFloor=1.0).
//   (5) ENERGY-GRADE-AS-PROFILE-FIELD — the StrokeProfile carries an `energyGrade`
//       field, the vangogh case sets energyGrade=1.0, bestOil energy-grades off the
//       `energyGrade` PARAMETER (not a buried `uMedium==5` branch), and the per-stroke
//       OKLCh pigment jitter (brokenColorJitter) is present.
//
// bite-check: revert mediumVangogh to `return mediumOil(...)` → (2) REDs; move the
// energy grade back to a buried `if (uMedium == 5)` in bestOil → (5) REDs.

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
        PRESETS: resolve(A, "constants/presets.ts"),
        BRIDGE: resolve(A, "composables/uniformBridge.ts"),
        FRAG: resolve(A, "constants/shaders/aurora.frag.ts"),
        MEDIUMS: resolve(A, "constants/shaders/mediums.glsl.ts"),
        BRUSH: resolve(A, "constants/shaders/brush.glsl.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_VANGOGH_PRESET_ARTIFACT", "AX-aurora-vangogh-preset"),
    };
    return _cliPaths;
}

// Isolate the body of a `vec3 <name>(...)` GLSL function (best-effort brace match).
function fnBody(src, name) {
    const m = src.match(new RegExp(`vec3\\s+${name}\\s*\\([^)]*\\)\\s*\\{`));
    if (!m) return "";
    let i = m.index + m[0].length;
    let depth = 1;
    const start = i;
    for (; i < src.length && depth > 0; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") depth--;
    }
    return src.slice(start, i - 1);
}

// Isolate the MEDIUM_VANGOGH case-block inside profileFor (the `if (medium ==
// MEDIUM_VANGOGH) { … return prof; }` arm).
function vangoghProfileBlock(src) {
    const m = src.match(/if\s*\(\s*medium\s*==\s*MEDIUM_VANGOGH\s*\)\s*\{/);
    if (!m) return "";
    let i = m.index + m[0].length;
    let depth = 1;
    const start = i;
    for (; i < src.length && depth > 0; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") depth--;
    }
    return src.slice(start, i - 1);
}

function run() {
    const { ROOT, PRESETS, BRIDGE, FRAG, MEDIUMS, BRUSH, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const read = (p) => (existsSync(p) ? stripComments(readFileSync(p, "utf8")) : null);
    const presets = read(PRESETS);
    const bridge = read(BRIDGE);
    const frag = read(FRAG);
    const mediums = read(MEDIUMS);
    const brush = read(BRUSH);
    if (!presets || !bridge || !frag || !mediums || !brush) {
        violations.push("a required aurora source is absent");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:aurora-vangogh-preset", facts, violations });
        console.error("[proof:aurora-vangogh-preset] FAIL — source absent");
        process.exit(1);
    }

    // (1) union + id + dispatch.
    facts.unionVangogh = /AuroraMedium\s*=[\s\S]*?"vangogh"/.test(presets);
    facts.mediumIdVangogh = /MEDIUM_ID\s*=\s*\{[\s\S]*?vangogh:\s*5/.test(bridge);
    facts.dispatchVangogh = /else\s+if\s*\(\s*uMedium\s*==\s*5\s*\)\s*col\s*=\s*mediumVangogh\s*\(/.test(frag);
    if (!facts.unionVangogh) violations.push("(1) AuroraMedium union does not include \"vangogh\"");
    if (!facts.mediumIdVangogh) violations.push("(1) MEDIUM_ID does not map vangogh: 5");
    if (!facts.dispatchVangogh) violations.push("(1) main() has no `else if (uMedium == 5) col = mediumVangogh(...)` dispatch");

    // (2) NOT-a-passthrough — mediumVangogh is a first-class body, not `return mediumOil(...)`.
    const vangoghBody = fnBody(mediums, "mediumVangogh");
    facts.mediumVangoghDefined = vangoghBody.length > 0;
    facts.notPassthrough = facts.mediumVangoghDefined && !/return\s+mediumOil\s*\(/.test(vangoghBody);
    facts.composesVangoghProfile = /profileFor\s*\(\s*MEDIUM_VANGOGH/.test(vangoghBody);
    if (!facts.mediumVangoghDefined) violations.push("(2) mediumVangogh() is not defined");
    if (!facts.notPassthrough) violations.push("(2) mediumVangogh is a `return mediumOil(...)` PASSTHROUGH — it must be a first-class body (the headline RED witness)");
    if (!facts.composesVangoghProfile) violations.push("(2) mediumVangogh does not compose a vangogh StrokeProfile (profileFor(MEDIUM_VANGOGH, …))");

    // (3) distinct comma/crescent profile — shapeType=4 in the vangogh case + the
    //     strokeShape(type==4) comma SDF in brush.glsl.ts.
    const vProf = vangoghProfileBlock(mediums);
    facts.vangoghProfileBlock = vProf.length > 0;
    facts.commaShapeInProfile = /shapeType\s*=\s*4/.test(vProf);
    facts.commaShapeSdf = /(else\s+if|if)\s*\(\s*type\s*==\s*4\s*\)/.test(brush);
    if (!facts.vangoghProfileBlock) violations.push("(3) profileFor has no `if (medium == MEDIUM_VANGOGH)` case (the profile is not authored)");
    if (!facts.commaShapeInProfile) violations.push("(3) the vangogh profile does not set shapeType=4 (the comma/crescent dab)");
    if (!facts.commaShapeSdf) violations.push("(3) strokeShape has no type==4 (comma/crescent) SDF arm in brush.glsl.ts");

    // (4) atomic placement (sparse density) + full-height impasto crown.
    facts.sparseDensity = /densityBig\s*=\s*0\.4/.test(vProf) || /densityBig\s*=\s*0\.3/.test(vProf);
    facts.fullHeightImpasto = /impastoFloor\s*=\s*1\.0/.test(vProf);
    if (!facts.sparseDensity) violations.push("(4) the vangogh profile is not SPARSE (densityBig must be lower than oil's 0.65 — the visible inter-stroke gaps)");
    if (!facts.fullHeightImpasto) violations.push("(4) the vangogh profile has no full-height impasto crown (impastoFloor=1.0 — each atomic dab catches its own glint)");

    // (5) energy-grade-AS-PROFILE-FIELD (un-buried from bestOil) + OKLCh jitter.
    facts.energyGradeField = /struct\s+StrokeProfile\s*\{[\s\S]*?energyGrade/.test(mediums);
    facts.vangoghSetsEnergyGrade = /energyGrade\s*=\s*1\.0/.test(vProf);
    facts.bestOilTakesEnergyParam = /float\s+energyGrade\s*\)/.test(brush) && /energyGrade\s*>\s*0/.test(brush);
    // The buried `if (uMedium == 5)` energy branch is GONE from bestOil (the un-bury proof).
    facts.energyNotBuried = !/if\s*\(\s*uMedium\s*==\s*5\s*\)\s*\{[\s\S]*?energy\s*=/.test(brush);
    facts.okLchJitter = /brokenColorJitter\s*\(/.test(brush);
    if (!facts.energyGradeField) violations.push("(5) StrokeProfile has no `energyGrade` field — the energy grade is not a profile field");
    if (!facts.vangoghSetsEnergyGrade) violations.push("(5) the vangogh profile does not set energyGrade=1.0 (the Starry-Night cascade as a profile field)");
    if (!facts.bestOilTakesEnergyParam) violations.push("(5) bestOil does not energy-grade off the `energyGrade` PARAMETER (the grade is still hardcoded)");
    if (!facts.energyNotBuried) violations.push("(5) bestOil STILL has a buried `if (uMedium == 5)` energy branch — the energy grade is not un-buried into the profile (the bite)");
    if (!facts.okLchJitter) violations.push("(5) the per-stroke OKLCh pigment jitter (brokenColorJitter) is absent");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-vangogh-preset", facts, violations });

    console.log("proof:aurora-vangogh-preset — the FIRST-CLASS van-Gogh medium (AX.W13)");
    console.log(`  (1) union + id + dispatch  : ${facts.unionVangogh && facts.mediumIdVangogh && facts.dispatchVangogh ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) NOT a passthrough      : ${facts.notPassthrough && facts.composesVangoghProfile ? "yes ✓" : "NO ✗ (return mediumOil(...))"}`);
    console.log(`  (3) comma/crescent profile : ${facts.commaShapeInProfile && facts.commaShapeSdf ? "yes ✓" : "NO ✗"}`);
    console.log(`  (4) sparse + full impasto  : ${facts.sparseDensity && facts.fullHeightImpasto ? "yes ✓" : "NO ✗"}`);
    console.log(`  (5) energy-grade = profile : ${facts.energyGradeField && facts.vangoghSetsEnergyGrade && facts.bestOilTakesEnergyParam && facts.energyNotBuried && facts.okLchJitter ? "yes ✓" : "NO ✗ (buried in bestOil)"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
