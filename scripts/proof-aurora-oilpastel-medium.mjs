#!/usr/bin/env node
// AW.W4.4 — the genuine oil-pastel medium gate (proof:aurora-oilpastel-medium).
//
// mediumCrayon is reworked from a tooth-MULTIPLY textured gradient into a pigment-
// on-tooth DEPOSITION model with a broken SCUMBLE upper layer and a waxy BURNISH
// film. The first-class `oil-pastel` medium (uMedium==6) AND the legacy `crayon`
// peer (uMedium==4) share this single body. This gate asserts:
//
//   (1) THE REWORK — mediumCrayon carries the deposition (tooth-occlusion
//       `deposit`/`smoothstep(toothFloor...`), the scumble (a `scumble` broken-upper
//       pass at coverage < 1), and the waxy burnish film (a low-roughness specular
//       sheen growing with build-up). The old tooth-MULTIPLY (`col * lay`) is GONE.
//   (2) THE UNION + DISPATCH — `oil-pastel` is in the AuroraMedium union, MEDIUM_ID
//       maps it to 6, and main() dispatches uMedium==6 → mediumCrayon.
//   (3) THE ORIENTATION — the deposition streaks orient along the ETF (tensor) field
//       when uStrokeOrient==1; OKLCh broken color (brokenColorJitter) is present.
//   (4) THE BUDGET — `dist/aurora.js` stays inside the AW.W4.0 governor ceiling (the
//       `profile:budget` walk now INCLUDES dist/aurora.js — NOT the root-barrel
//       budget which never reaches the aurora chunk).
//
// bite-check: reverting mediumCrayon to the tooth-multiply (`col * lay`) → RED; OR
// growing the chunk past the registered aurora ceiling → the budget arm REDs.

import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";
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

// The aurora-chunk ceiling — MIRRORS the BUDGETS["dist/aurora.js"] entry the AW.W4.0
// governor preamble added to scripts/profile-bundle.mjs (the single source). This
// gate reads the BUILT chunk and asserts it stays inside that ceiling.
const AURORA_GZIP_CEIL = 38_000;
const AURORA_RAW_CEIL = 130_000;

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const A = resolve(ROOT, "src/components/custom/aurora");
    _cliPaths = {
        ROOT,
        MEDIUMS: resolve(A, "constants/shaders/mediums.glsl.ts"),
        PRESETS: resolve(A, "constants/presets.ts"),
        BRIDGE: resolve(A, "composables/uniformBridge.ts"),
        FRAG: resolve(A, "constants/shaders/aurora.frag.ts"),
        DIST: resolve(ROOT, "dist/aurora.js"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_OILPASTEL_MEDIUM_ARTIFACT", "AW-aurora-oilpastel-medium"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, MEDIUMS, PRESETS, BRIDGE, FRAG, DIST, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const read = (p) => (existsSync(p) ? stripComments(readFileSync(p, "utf8")) : null);
    const mediums = read(MEDIUMS);
    const presets = read(PRESETS);
    const bridge = read(BRIDGE);
    const frag = read(FRAG);
    if (!mediums || !presets || !bridge || !frag) {
        violations.push("a required aurora source is absent");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:aurora-oilpastel-medium", facts, violations });
        console.error("[proof:aurora-oilpastel-medium] FAIL — source absent");
        process.exit(1);
    }

    // Isolate the mediumCrayon body for the rework asserts.
    const crayonMatch = mediums.match(/vec3\s+mediumCrayon\s*\([\s\S]*?\n\}/);
    const crayonBody = crayonMatch ? crayonMatch[0] : "";

    // (1) the rework — deposition + scumble + waxy; the tooth-multiply is GONE.
    facts.hasDeposition = /deposit\b/.test(crayonBody) && /toothFloor/.test(crayonBody) && /smoothstep\s*\(\s*toothFloor/.test(crayonBody);
    facts.hasScumble = /scumble/.test(crayonBody) && /scumbleCoverage/.test(crayonBody);
    facts.hasWaxyFilm = /burnish/.test(crayonBody) && /sheen/.test(crayonBody) && /uLightColor/.test(crayonBody);
    facts.toothMultiplyGone = !/float\s+lay\s*=\s*1\.0\s*\+\s*tooth\s*\*\s*0\.32/.test(crayonBody) && !/result\s*=\s*col\s*\*\s*lay/.test(crayonBody);
    if (!facts.hasDeposition) violations.push("(1) mediumCrayon has no tooth-occlusion DEPOSITION (deposit/toothFloor/smoothstep)");
    if (!facts.hasScumble) violations.push("(1) mediumCrayon has no broken SCUMBLE upper-layer pass (coverage < 1)");
    if (!facts.hasWaxyFilm) violations.push("(1) mediumCrayon has no waxy BURNISH film (a specular sheen growing with build-up)");
    if (!facts.toothMultiplyGone) violations.push("(1) the old tooth-MULTIPLY (col * lay) is STILL present — the rework reverted (the bite)");

    // (2) the union + dispatch.
    facts.unionHasOilPastel = /AuroraMedium\s*=[\s\S]*?"oil-pastel"/.test(presets);
    facts.mediumIdMapsOilPastel = /MEDIUM_ID\s*=\s*\{[\s\S]*?"oil-pastel":\s*6/.test(bridge);
    facts.dispatchOilPastel = /else\s+if\s*\(\s*uMedium\s*==\s*6\s*\)\s*col\s*=\s*mediumCrayon\s*\(/.test(frag);
    if (!facts.unionHasOilPastel) violations.push("(2) AuroraMedium union does not include \"oil-pastel\"");
    if (!facts.mediumIdMapsOilPastel) violations.push("(2) MEDIUM_ID does not map \"oil-pastel\": 6");
    if (!facts.dispatchOilPastel) violations.push("(2) main() does not dispatch uMedium==6 → mediumCrayon");

    // (3) orientation + OKLCh broken color.
    facts.orientsAlongEtf = /uStrokeOrient\s*==\s*1/.test(crayonBody) && /structureTensorField\s*\(/.test(crayonBody);
    facts.okLchBrokenColor = /brokenColorJitter\s*\(/.test(crayonBody);
    if (!facts.orientsAlongEtf) violations.push("(3) the oil-pastel deposition does not orient along the ETF (tensor) field");
    if (!facts.okLchBrokenColor) violations.push("(3) the oil-pastel medium does not apply OKLCh broken color (brokenColorJitter)");

    // (4) the budget — the BUILT dist/aurora.js inside the governor ceiling.
    if (!existsSync(DIST)) {
        // Build it (the gate is self-sufficient; the §6 cadence also runs the build).
        try {
            execFileSync("npm", ["run", "iter-build"], { cwd: ROOT, stdio: "ignore" });
        } catch {
            // fail-explicit: a build failure surfaces as the absent-dist violation below.
        }
    }
    if (existsSync(DIST)) {
        const buf = readFileSync(DIST);
        const raw = buf.length;
        const gzip = gzipSync(buf).length;
        facts.auroraRaw = raw;
        facts.auroraGzip = gzip;
        facts.budgetInside = raw <= AURORA_RAW_CEIL && gzip <= AURORA_GZIP_CEIL;
        if (!facts.budgetInside) {
            violations.push(`(4) dist/aurora.js exceeds the AW.W4.0 governor ceiling (raw ${raw}/${AURORA_RAW_CEIL}, gzip ${gzip}/${AURORA_GZIP_CEIL}) — halt + the field-bake-hoist triumvirate`);
        }
    } else {
        facts.budgetInside = false;
        violations.push("(4) dist/aurora.js is absent — the build did not emit the chunk");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-oilpastel-medium", facts, violations });

    console.log("proof:aurora-oilpastel-medium — the genuine oil-pastel deposition+scumble+waxy (AW.W4.4)");
    console.log(`  (1) deposition+scumble+wax: ${facts.hasDeposition && facts.hasScumble && facts.hasWaxyFilm ? "yes ✓" : "NO ✗"} (tooth-multiply gone: ${facts.toothMultiplyGone ? "✓" : "✗"})`);
    console.log(`  (2) union + dispatch (6)  : ${facts.unionHasOilPastel && facts.mediumIdMapsOilPastel && facts.dispatchOilPastel ? "yes ✓" : "NO ✗"}`);
    console.log(`  (3) ETF orient + OKLCh    : ${facts.orientsAlongEtf && facts.okLchBrokenColor ? "yes ✓" : "NO ✗"}`);
    console.log(`  (4) dist/aurora.js budget : ${facts.budgetInside ? "inside ✓" : "OVER ✗"} (gzip ${facts.auroraGzip ?? "?"}/${AURORA_GZIP_CEIL})`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
