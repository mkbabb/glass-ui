#!/usr/bin/env node
// AX.W13 — the SPLIT oil-pastel / dry-crayon medium gate (proof:aurora-oilpastel-medium).
//
// RE-AUTHORED born-RED. The AW.W4.4 gate asserted the SHARED body — `uMedium==4` AND
// `uMedium==6` both dispatch `mediumCrayon` — and PASSED over exactly that shared
// dispatch (oil-pastel ≡ crayon textured gradient). A shared body PASSES the old text
// gate (the cardinal-lesson instance). This gate inverts: oil-pastel and crayon are
// SEPARATE dispatch bodies sharing the SUBSTRATE, not the body. It asserts:
//
//   (1) DISTINCT FUNCTION — `mediumOilPastel` is defined as its OWN function (a
//       deletion-proof: uMedium==6 no longer resolves to mediumCrayon).
//   (2) DIFFERENT-BODY DISPATCH — main() dispatches uMedium==4 → mediumCrayon AND
//       uMedium==6 → mediumOilPastel (DIFFERENT functions, not the same body twice).
//   (3) OIL-PASTEL IS STROKE-DEPOSITION — mediumOilPastel deposits via the brush
//       engine (paintStrokeMedium / its oil-pastel StrokeProfile), with a creamy soft
//       hardness; it does NOT re-author the dry tooth-multiply.
//   (4) DRY CRAYON SURVIVES — mediumCrayon stays the DRY tooth-multiply (no sheen, no
//       burnish film — that waxy gloss is oil-pastel's; a hard scumble + OKLCh broken
//       color + the structure-tensor orientation are the shared substrate it keeps).
//   (5) UNION + ID — oil-pastel is in the union + MEDIUM_ID:6; crayon is a first-class
//       AuroraMedium (+ MEDIUM_ID:4), NOT a strokeMode (the peer-route is removed).
//   (6) BUDGET — `dist/aurora.js` stays inside the AW.W4.0 governor ceiling.
//
// bite-check: re-point uMedium==6 back to mediumCrayon → (2) REDs; give mediumCrayon a
// burnish/sheen film → (4) REDs; restore the `strokeMode:"crayon"` peer-route → (5) REDs.

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

// The aurora gzip governor — aligned to the canonical profile:budget ceiling
// (profile-bundle.mjs BUDGETS `dist/aurora.js` gzip 54000 / raw 162000). The
// AW.W4.0 38 KB governor was raised at AY.W-CLOSE1 to 40_000 (the W-AUR-PAINTERLY
// §4.2 anisotropy lift), then to 50000 — the NINTH lift — for the BB aurora band,
// then to 54000 — the BC.W-VIZ-AURORA (T4) TENTH lift — for the WGSL painterly-medium
// port (aurora-mediums.wgsl.ts: the sampleBase/structureTensorField/flowField twins +
// pastel/watercolor/crayon + the KEYSTONE anisotropic-Kuwahara, so Safari 26 paints the
// FULL painterly register; measured gzip ≈52.3k / raw ≈158.7k). ONE ceiling, mirrored
// from the canonical profile:budget figure.
const AURORA_GZIP_CEIL = 54000;
const AURORA_RAW_CEIL = 162000;

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
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_OILPASTEL_MEDIUM_ARTIFACT", "AX-aurora-oilpastel-medium"),
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

    const oilPastelBody = fnBody(mediums, "mediumOilPastel");
    const crayonBody = fnBody(mediums, "mediumCrayon");

    // (1) mediumOilPastel is a DISTINCT function.
    facts.oilPastelDefined = /vec3\s+mediumOilPastel\s*\(/.test(mediums) && oilPastelBody.length > 0;
    if (!facts.oilPastelDefined) violations.push("(1) mediumOilPastel() is not a distinct function — uMedium==6 still resolves to mediumCrayon (the shared-body RED witness)");

    // (2) different-body dispatch — uMedium==4 → mediumCrayon, uMedium==6 → mediumOilPastel.
    facts.dispatch4Crayon = /else\s+if\s*\(\s*uMedium\s*==\s*4\s*\)\s*col\s*=\s*mediumCrayon\s*\(/.test(frag);
    facts.dispatch6OilPastel = /else\s+if\s*\(\s*uMedium\s*==\s*6\s*\)\s*col\s*=\s*mediumOilPastel\s*\(/.test(frag);
    facts.differentBodies = facts.dispatch4Crayon && facts.dispatch6OilPastel;
    if (!facts.dispatch4Crayon) violations.push("(2) main() does not dispatch uMedium==4 → mediumCrayon");
    if (!facts.dispatch6OilPastel) violations.push("(2) main() does not dispatch uMedium==6 → mediumOilPastel (it still points at mediumCrayon — the shared body)");

    // (3) oil-pastel is stroke-DEPOSITION via the shared brush engine + creamy hardness.
    facts.oilPastelDeposits = /paintStrokeMedium\s*\(/.test(oilPastelBody) || /paintStrokeLayers\s*\(/.test(oilPastelBody);
    facts.oilPastelProfile = /profileFor\s*\(\s*MEDIUM_OILPASTEL/.test(oilPastelBody);
    if (!facts.oilPastelDeposits) violations.push("(3) mediumOilPastel does not deposit strokes via the brush engine (paintStrokeMedium/paintStrokeLayers)");
    if (!facts.oilPastelProfile) violations.push("(3) mediumOilPastel does not compose an oil-pastel StrokeProfile (profileFor(MEDIUM_OILPASTEL, …))");

    // (4) dry crayon survives — tooth-multiply, NO sheen/burnish film.
    facts.crayonDefined = crayonBody.length > 0;
    facts.crayonToothMultiply = /tooth/.test(crayonBody) && /col\s*\*/.test(crayonBody) && /scumble/i.test(crayonBody);
    facts.crayonOkLchBroken = /brokenColorJitter\s*\(/.test(crayonBody);
    facts.crayonSharesSubstrate = /structureTensorField\s*\(/.test(crayonBody);
    // The waxy BURNISH/sheen film (the oil-pastel signature) is GONE from dry crayon.
    facts.crayonNoBurnish = !/burnish/.test(crayonBody) && !/sheen/.test(crayonBody);
    if (!facts.crayonDefined) violations.push("(4) mediumCrayon() is not defined");
    if (!facts.crayonToothMultiply) violations.push("(4) mediumCrayon is not the DRY tooth-multiply (a tooth-relief col-multiply + scumble)");
    if (!facts.crayonOkLchBroken) violations.push("(4) mediumCrayon dropped the OKLCh broken color (brokenColorJitter) — the shared substrate");
    if (!facts.crayonSharesSubstrate) violations.push("(4) mediumCrayon dropped the structure-tensor orientation — the shared substrate");
    if (!facts.crayonNoBurnish) violations.push("(4) mediumCrayon STILL carries a waxy burnish/sheen film — that is oil-pastel's signature, dry crayon has no sheen (the bite)");

    // (5) union + id — oil-pastel + crayon are first-class mediums; strokeMode:"crayon" removed.
    facts.unionOilPastel = /AuroraMedium\s*=[\s\S]*?"oil-pastel"/.test(presets);
    facts.unionCrayonMedium = /AuroraMedium\s*=[\s\S]*?"crayon"/.test(presets);
    facts.mediumIdOilPastel = /MEDIUM_ID\s*=\s*\{[\s\S]*?"oil-pastel":\s*6/.test(bridge);
    facts.mediumIdCrayon = /MEDIUM_ID\s*=\s*\{[\s\S]*?crayon:\s*4/.test(bridge);
    // The legacy strokeMode:"crayon" peer-route is REMOVED (clean break). The
    // `StrokeMode` union must carry NO "crayon" member — scoped to the type-decl
    // STATEMENT (`[^;]*?`, stopping at the `;` terminator) so the lazy match cannot
    // span the whole file forward to an unrelated legitimate `medium: "crayon"`
    // preset (BB.W-CI-GREEN — the AX.W13 source removal is shipped; the prior
    // `[\s\S]*?` whole-file span false-RED'd on the `PAPER_WASH_GROUND` `medium:
    // "crayon"` line; the tighten still BITES a re-added union member, single- or
    // multi-line, since a union runs to its `;`).
    facts.strokeModeCrayonGone = !/StrokeMode\s*=[^;]*?"crayon"/.test(presets) && !/strokeMode\s*===\s*"crayon"/.test(bridge);
    if (!facts.unionOilPastel) violations.push("(5) AuroraMedium union does not include \"oil-pastel\"");
    if (!facts.unionCrayonMedium) violations.push("(5) AuroraMedium union does not include first-class \"crayon\"");
    if (!facts.mediumIdOilPastel) violations.push("(5) MEDIUM_ID does not map \"oil-pastel\": 6");
    if (!facts.mediumIdCrayon) violations.push("(5) MEDIUM_ID does not map crayon: 4");
    if (!facts.strokeModeCrayonGone) violations.push("(5) the legacy strokeMode:\"crayon\" peer-route is STILL present (the special-case was not removed — the bite)");

    // (6) the budget — the BUILT dist/aurora.js inside the governor ceiling.
    if (!existsSync(DIST)) {
        try {
            execFileSync("npm", ["run", "iter-build"], { cwd: ROOT, stdio: "ignore" });
        } catch {
            /* fail-explicit: a build failure surfaces as the absent-dist violation below. */
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
            violations.push(`(6) dist/aurora.js exceeds the AW.W4.0 governor ceiling (raw ${raw}/${AURORA_RAW_CEIL}, gzip ${gzip}/${AURORA_GZIP_CEIL}) — halt + the field-bake-hoist triumvirate`);
        }
    } else {
        facts.budgetInside = false;
        violations.push("(6) dist/aurora.js is absent — the build did not emit the chunk");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-oilpastel-medium", facts, violations });

    console.log("proof:aurora-oilpastel-medium — the oil-pastel / dry-crayon SPLIT (AX.W13)");
    console.log(`  (1) mediumOilPastel distinct: ${facts.oilPastelDefined ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) 4->crayon, 6->oil-pastel: ${facts.differentBodies ? "yes ✓" : "NO ✗ (shared body)"}`);
    console.log(`  (3) oil-pastel deposition   : ${facts.oilPastelDeposits && facts.oilPastelProfile ? "yes ✓" : "NO ✗"}`);
    console.log(`  (4) dry crayon (no sheen)   : ${facts.crayonToothMultiply && facts.crayonNoBurnish && facts.crayonOkLchBroken ? "yes ✓" : "NO ✗"}`);
    console.log(`  (5) union + id + no peer     : ${facts.unionOilPastel && facts.unionCrayonMedium && facts.mediumIdOilPastel && facts.mediumIdCrayon && facts.strokeModeCrayonGone ? "yes ✓" : "NO ✗"}`);
    console.log(`  (6) dist/aurora.js budget   : ${facts.budgetInside ? "inside ✓" : "OVER ✗"} (gzip ${facts.auroraGzip ?? "?"}/${AURORA_GZIP_CEIL})`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
