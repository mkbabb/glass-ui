#!/usr/bin/env node
// W-AUR-VANGOGH-REBUILD — the FIRST-CLASS van-Gogh medium gate (proof:aurora-vangogh-preset).
//
// RE-TUNED (AY.W-AUR-VANGOGH-REBUILD), NOT lowered. The AX.W13 gate asserted the
// van-Gogh medium against the StrokeProfile/profileFor MECHANISM (a vangogh case in the
// shared oil-cascade `profileFor`, energyGrade as a profile field). That mechanism IS
// the marble: routing van-Gogh through the shared oil cascade — four dense layers of
// long-thin tensor-oriented strokes — merged the dabs into continuous "marbled
// flow-bands" (the user's binding B20 verdict: "looks NOTHING like a van Gogh brush
// stroke") AND ran at ~4fps (the per-cell 8-tap structure tensor x 4 layers x 9 cells).
// The rebuild makes van-Gogh a DEDICATED atomic-dab body (mediumVangogh + vangoghDab),
// disjoint from the oil cascade — a STRONGER first-class proof than the prior
// profile-in-a-shared-cascade. The gate's BEHAVIORAL BARS are UNCHANGED (every bar is
// kept or strengthened); only the MECHANISM the regexes bind to is re-pointed from the
// retired profile path to the dedicated-dab body. No bar is relaxed:
//
//   (1) UNION + ID + DISPATCH — `AuroraMedium` (presets.ts) includes "vangogh";
//       MEDIUM_ID maps vangogh:5; main() dispatches uMedium==5 → mediumVangogh. (unchanged)
//   (2) NOT-A-PASSTHROUGH — `mediumVangogh` is NOT `return mediumOil(...)` AND NOT a
//       `return paintStrokeMedium(...)` route through the shared oil cascade; it composes
//       its OWN dedicated `vangoghDab` atomic-dab placement (a strictly stronger
//       first-class bar — its own body, not a profile slot in the oil cascade).
//   (3) DISTINCT COMMA/CRESCENT DAB — vangoghDab realizes the asymmetric comma DIRECTLY
//       in its analytic SDF (a rounded loaded HEAD + a dragged thin TAIL + a bowed crescent
//       spine), the dedicated clean dab that replaced the oil curvedStroke shapeType-4 path
//       (whose fwidth-AA skirt seamed into thin lines over the open van-Gogh ground).
//   (4) ATOMIC PLACEMENT + FULL-HEIGHT IMPASTO — the dab body places via SPARSE density
//       gates (visible inter-dab ground) AND deposits with a full-height impasto crown
//       (paintOver's impastoFloor arg = 1.0) so each dab catches its own glint.
//   (5) VISIBLE GROUND + OKLCh PIGMENT SHIMMER — the dab body darkens the bare ground
//       between dabs (the separability-over-underpainting that the retired energyGrade
//       cascade existed to serve) AND carries the per-dab OKLCh broken-color jitter
//       (brokenColorJitter — the pigment-true atom shimmer).
//
// bite-check: revert mediumVangogh to `return mediumOil(...)` or `return
// paintStrokeMedium(...)` → (2) REDs; drop the head/tail comma taper or the bowed spine →
// (3) REDs; raise the dab density past the sparse floor or drop the ground darken → (4)/(5) RED.

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
        // The dedicated van-Gogh dab body (mediumVangogh + vangoghDab) is carved
        // into a co-located sibling that mediums.glsl.ts splices into POST_BRUSH;
        // read it alongside MEDIUMS so the dab-body assertions follow the chunk.
        VANGOGH: resolve(A, "constants/shaders/vangogh-medium.glsl.ts"),
        BRUSH: resolve(A, "constants/shaders/brush.glsl.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_VANGOGH_PRESET_ARTIFACT", "AX-aurora-vangogh-preset"),
    };
    return _cliPaths;
}

// Isolate the body of a `<retType> <name>(...)` GLSL function (best-effort brace match).
// retType defaults to vec3 (the medium bodies); pass "StrokeHit" for vangoghDab.
function fnBody(src, name, retType = "vec3") {
    const m = src.match(new RegExp(`${retType}\\s+${name}\\s*\\([^)]*\\)\\s*\\{`));
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

// Isolate the body of the `mediumVangogh` + `vangoghDab` dedicated dab functions (the
// rebuilt van-Gogh medium). The two together carry the placement + deposition the gate
// asserts against (the retired profileFor(MEDIUM_VANGOGH) case is gone).
function vangoghDabSource(src) {
    return fnBody(src, "mediumVangogh") + "\n" + fnBody(src, "vangoghDab", "StrokeHit");
}

function run() {
    const { ROOT, PRESETS, BRIDGE, FRAG, MEDIUMS, VANGOGH, BRUSH, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const read = (p) => (existsSync(p) ? stripComments(readFileSync(p, "utf8")) : null);
    const presets = read(PRESETS);
    const bridge = read(BRIDGE);
    const frag = read(FRAG);
    // The mediums GLSL source the dab-body assertions scan = the mediums root +
    // the carved van-Gogh sibling (mediumVangogh + vangoghDab live there now).
    const mediumsRoot = read(MEDIUMS);
    const vangogh = read(VANGOGH);
    const mediums = mediumsRoot != null ? mediumsRoot + "\n" + (vangogh ?? "") : null;
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

    // (2) NOT-a-passthrough — mediumVangogh is a DEDICATED dab body, not `return
    //     mediumOil(...)` and not a `return paintStrokeMedium(...)` route through the
    //     shared oil cascade; it composes its own `vangoghDab` placement.
    const vangoghBody = fnBody(mediums, "mediumVangogh");
    const dabBody = fnBody(mediums, "vangoghDab", "StrokeHit");
    facts.mediumVangoghDefined = vangoghBody.length > 0;
    facts.notOilPassthrough = facts.mediumVangoghDefined && !/return\s+mediumOil\s*\(/.test(vangoghBody);
    facts.notCascadeRoute = facts.mediumVangoghDefined && !/return\s+paintStrokeMedium\s*\(/.test(vangoghBody);
    facts.composesDedicatedDab = dabBody.length > 0 && /vangoghDab\s*\(/.test(vangoghBody);
    if (!facts.mediumVangoghDefined) violations.push("(2) mediumVangogh() is not defined");
    if (!facts.notOilPassthrough) violations.push("(2) mediumVangogh is a `return mediumOil(...)` PASSTHROUGH — it must be a dedicated dab body");
    if (!facts.notCascadeRoute) violations.push("(2) mediumVangogh routes through the shared oil cascade (`return paintStrokeMedium(...)`) — the marble path; it must be its own dedicated dab body");
    if (!facts.composesDedicatedDab) violations.push("(2) mediumVangogh does not compose its dedicated `vangoghDab` atomic-dab placement");

    const vSrc = vangoghDabSource(mediums);

    // (3) distinct comma/crescent dab — vangoghDab realizes the ASYMMETRIC comma taper
    //     DIRECTLY in its analytic SDF: a rounded loaded HEAD + a dragged thin TAIL (the
    //     head/tail clamp) and a bowed spine (the crescent CURVE). The dedicated analytic
    //     dab replaces the oil curvedStroke shapeType-4 path (whose fwidth-AA skirt seamed
    //     into thin lines over the open ground); the comma is now intrinsic to the dab.
    facts.commaHeadTail = /\bhead\b[\s\S]*?\btail\b/.test(dabBody) && /smoothstep/.test(dabBody);
    facts.commaCurve = /spine\s*=/.test(dabBody) || /bow/.test(dabBody);
    facts.commaShapeInDab = facts.commaHeadTail && facts.commaCurve;
    if (!facts.commaHeadTail) violations.push("(3) vangoghDab does not taper as a comma (a rounded loaded head + a dragged thin tail)");
    if (!facts.commaCurve) violations.push("(3) vangoghDab does not bow the dab spine into a crescent curve");

    // (4) atomic placement (sparse density gate) + full-height impasto crown. The dab
    //     gates on `hash21(...) > density` with density floats < 0.6 (visible gaps); the
    //     paintOver impastoFloor arg is 1.0 (each dab catches its full-height glint).
    // Paren-aware top-level comma split (a vec2(-5.1, 8.4) arg carries an inner comma).
    const splitTopLevel = (s) => {
        const out = [];
        let depth = 0;
        let cur = "";
        for (const ch of s) {
            if (ch === "(") depth++;
            else if (ch === ")") depth--;
            if (ch === "," && depth === 0) { out.push(cur); cur = ""; }
            else cur += ch;
        }
        out.push(cur);
        return out;
    };
    const densGates = [...vSrc.matchAll(/vangoghDab\s*\(([\s\S]*?)\)\s*;/g)]
        .map((m) => splitTopLevel(m[1]));
    // density is the 5th vangoghDab arg (p, cellSize, lenMul, widMul, density, ...).
    facts.sparseDensity = densGates.length > 0 && densGates.every((args) => {
        const d = parseFloat((args[4] ?? "").trim());
        return Number.isFinite(d) && d < 0.6;
    }) && /hash21\([^)]*\)\s*>\s*density/.test(dabBody);
    facts.fullHeightImpasto = /paintOver\s*\([\s\S]*?,\s*1\.0\s*(?:\/\*[^*]*\*\/)?\s*\)\s*;/.test(vangoghBody);
    if (!facts.sparseDensity) violations.push("(4) the vangogh dab placement is not SPARSE (every vangoghDab density arg must be < 0.6, gated `hash21 > density` — the visible inter-dab gaps)");
    if (!facts.fullHeightImpasto) violations.push("(4) the vangogh dab deposit has no full-height impasto crown (paintOver impastoFloor arg must be 1.0)");

    // (5) visible ground darken (separability over underpainting — what the retired
    //     energyGrade cascade existed to serve) + the per-dab OKLCh pigment jitter.
    facts.visibleGround = /result\s*\*=\s*mix\s*\(\s*0\.[0-9]+\s*,\s*1\.0\s*,\s*smoothstep/.test(vangoghBody);
    facts.okLchJitter = /brokenColorJitter\s*\(/.test(dabBody);
    if (!facts.visibleGround) violations.push("(5) mediumVangogh does not darken the bare ground between dabs (the visible Starry-Night underpainting — `result *= mix(<floor>, 1.0, smoothstep(...))`)");
    if (!facts.okLchJitter) violations.push("(5) the per-dab OKLCh pigment jitter (brokenColorJitter) is absent from vangoghDab");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-vangogh-preset", facts, violations });

    console.log("proof:aurora-vangogh-preset — the FIRST-CLASS van-Gogh DEDICATED-DAB medium (W-AUR-VANGOGH-REBUILD)");
    console.log(`  (1) union + id + dispatch  : ${facts.unionVangogh && facts.mediumIdVangogh && facts.dispatchVangogh ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) dedicated dab body     : ${facts.notOilPassthrough && facts.notCascadeRoute && facts.composesDedicatedDab ? "yes ✓" : "NO ✗ (passthrough / cascade route)"}`);
    console.log(`  (3) comma/crescent dab     : ${facts.commaShapeInDab ? "yes ✓" : "NO ✗"}`);
    console.log(`  (4) sparse + full impasto  : ${facts.sparseDensity && facts.fullHeightImpasto ? "yes ✓" : "NO ✗"}`);
    console.log(`  (5) visible ground + jitter: ${facts.visibleGround && facts.okLchJitter ? "yes ✓" : "NO ✗"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
