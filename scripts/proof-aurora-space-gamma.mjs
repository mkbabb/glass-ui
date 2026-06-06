#!/usr/bin/env node
// AV.W1 — the aurora color-space gate (proof:aurora-space-gamma).
//
// The sibling of proof:blob-space-gamma. Aurora's INPUT is a LINEAR LUT: the palette
// is baked CPU-side to linear sRGB (color.ts `oklchToLinear`, DESIGN.md), so the whole
// shader pipeline (palette interp, nuclei field, mediums, saturate3, ACES tonemap,
// grain) operates in LINEAR. That linear pipeline MUST close the seam with a
// `linearToSrgb()` OETF before `fragColor` — a linear-in path WITHOUT an OETF-out
// ships visibly ~2.2× too dark (linear 0.5 → ~0.215 instead of ~0.735). This is the
// exact A5/A2 darkening trap the blob fixed at AU.W7; aurora was the un-converged
// sibling. This gate forbids that too-dark state for aurora.
//
// bite-check: removing `col = linearToSrgb(col);` from aurora.frag.ts reddens the
// gate (the helper may still exist as a dead def — the gate asserts the CALL precedes
// the fragColor write, not merely that the helper is present).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        FRAG: resolve(ROOT, "src/components/custom/aurora/constants/shaders/aurora.frag.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_SPACE_GAMMA_ARTIFACT", "AV-aurora-space-gamma"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, FRAG, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(FRAG)) {
        violations.push("the aurora frag shader is absent");
    } else {
        const frag = readFileSync(FRAG, "utf8");

        // (1) the OETF helper / transfer is present.
        const hasOetf = /linearToSrgb|pow\([^)]*1\.0\s*\/\s*2\.4\)|pow\([^)]*1\.0\s*\/\s*2\.2\)|pow\([^)]*0\.4545/.test(frag);
        facts.hasOetf = hasOetf;
        if (!hasOetf) {
            violations.push("the aurora shader has NO `linearToSrgb()` OETF — its linear pipeline ships ~2.2× too dark (the A5/A2 darkening trap)");
        }

        // (2) the OETF CALL precedes the fragColor write (the seam closes before
        //     output, not after a dead helper). Match `col = linearToSrgb(col);`
        //     occurring before the final `fragColor = ` assignment.
        const fragColorIdx = frag.lastIndexOf("fragColor =");
        const oetfCall = /col\s*=\s*linearToSrgb\s*\(\s*col\s*\)/;
        const callMatch = oetfCall.exec(frag);
        const callBeforeOutput = callMatch && fragColorIdx >= 0 && callMatch.index < fragColorIdx;
        facts.oetfCallPresent = !!callMatch;
        facts.oetfCallBeforeFragColor = !!callBeforeOutput;
        if (!callBeforeOutput) {
            violations.push("`col = linearToSrgb(col);` does not precede the final `fragColor` write — the OETF must close the seam BEFORE output (a dead helper does not paint)");
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-space-gamma", facts, violations });

    console.log("proof:aurora-space-gamma — the linear-pipeline OETF seam (AV.W1)");
    console.log(`  OETF helper present   : ${facts.hasOetf ? "yes ✓" : "NO ✗"}`);
    console.log(`  OETF call → before out: ${facts.oetfCallBeforeFragColor ? "yes ✓" : "NO ✗"} (call present: ${facts.oetfCallPresent ? "yes" : "no"})`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
