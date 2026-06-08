#!/usr/bin/env node
// AX.W13 — the OKLab stroke OVER-composite + within-stroke OKLCh broken color gate
// (proof:aurora-stroke-composite). NEW, born-RED.
//
// At HEAD `paintOver` composites overlapping strokes via a bare linear-RGB
// `mix(col, c, alpha)` (the muddy-midtone grey defect re-entering at the compositing
// layer — slice 8 F2), and the within-stroke streak modulation is value-only
// (`c *= 1.0 + streak*streakAmp` — slice 8 F5). This gate asserts both moved into
// OKLab/OKLCh on the painterly stroke mediums, single-sourced from the shared
// procedural-color chunk:
//
//   (1) OKLab OVER-COMPOSITE — paintOver composites in OKLab on the painterly stroke
//       mediums (a paintOverOklab helper lerping L,a,b via oklabToLinearSrgb +
//       linOklab), NOT a bare linear mix() on every medium. The painterly-stroke gate
//       (isPainterlyStroke / uMedium == 3|5|6) selects the OKLab branch.
//   (2) WITHIN-STROKE OKLCh — the within-stroke modulation perturbs HUE + CHROMA in
//       OKLCh (oklabToOklch → perturb .z hue + .y chroma → oklchToOklab), gated to the
//       painterly stroke mediums + uBrokenColor — NOT the value-only `c *= 1+streak`.
//   (3) SINGLE-SOURCE MATRICES — the OKLab/OKLCh fns paintOver consumes
//       (linOklab / oklabToOklch / oklchToOklab / oklabToLinearSrgb) resolve from the
//       shared procedural-color chunk (OKLCH_MATRICES_GLSL spliced in aurora.frag.ts) +
//       the aurora color-utils block — no duplicate inline color math in brush.glsl.ts.
//   (4) SMOOTH-POLE STAYS LINEAR — the OKLab branch is GATED (the smooth/atmospheric
//       pole keeps the linear mix for cost — paintOver still carries a `mix(col, c,
//       alpha)` fallback for the non-painterly path).
//
// bite-check: revert paintOver to a bare `col = mix(col, c, alpha)` for every medium
// → (1) REDs; revert the within-stroke modulation to value-only → (2) REDs; inline a
// duplicate OKLab matrix in brush.glsl.ts → (3) REDs.

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

// Isolate a `void <name>(...) { … }` GLSL function body (best-effort brace match).
function voidFnBody(src, name) {
    const m = src.match(new RegExp(`void\\s+${name}\\s*\\([^)]*\\)\\s*\\{`));
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

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const A = resolve(ROOT, "src/components/custom/aurora");
    _cliPaths = {
        ROOT,
        BRUSH: resolve(A, "constants/shaders/brush.glsl.ts"),
        FRAG: resolve(A, "constants/shaders/aurora.frag.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_STROKE_COMPOSITE_ARTIFACT", "AX-aurora-stroke-composite"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, BRUSH, FRAG, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const read = (p) => (existsSync(p) ? stripComments(readFileSync(p, "utf8")) : null);
    const brush = read(BRUSH);
    const frag = read(FRAG);
    if (!brush || !frag) {
        violations.push("a required aurora source is absent");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:aurora-stroke-composite", facts, violations });
        console.error("[proof:aurora-stroke-composite] FAIL — source absent");
        process.exit(1);
    }

    const paintOverBody = voidFnBody(brush, "paintOver");
    facts.paintOverDefined = paintOverBody.length > 0;
    if (!facts.paintOverDefined) {
        violations.push("paintOver() is not defined in brush.glsl.ts");
    }

    // (1) OKLab OVER-composite on the painterly stroke mediums.
    facts.oklabHelper = /vec3\s+paintOverOklab\s*\([\s\S]*?mix\s*\([\s\S]*?\)\s*\)?/.test(brush) &&
        /oklabToLinearSrgb\s*\(/.test(brush) && /linOklab\s*\(/.test(brush);
    facts.painterlyGate = /isPainterlyStroke\s*\(/.test(brush) &&
        /uMedium\s*==\s*3\s*\|\|\s*uMedium\s*==\s*5\s*\|\|\s*uMedium\s*==\s*6/.test(brush);
    facts.oklabCompositeSelected = /isPainterlyStroke\s*\(\s*\)\s*\?\s*paintOverOklab\s*\(/.test(paintOverBody);
    if (!facts.oklabHelper) violations.push("(1) no paintOverOklab helper (an OKLab L,a,b lerp via linOklab/oklabToLinearSrgb)");
    if (!facts.painterlyGate) violations.push("(1) no painterly-stroke gate (isPainterlyStroke = uMedium 3|5|6 — the painterly stroke mediums)");
    if (!facts.oklabCompositeSelected) violations.push("(1) paintOver's OVER-composite is not OKLab on the painterly mediums (the bare linear mix RED witness)");

    // (2) within-stroke OKLCh hue/chroma modulation (not value-only).
    facts.withinStrokeOklch = /oklabToOklch\s*\(\s*linOklab\s*\(/.test(paintOverBody) &&
        /oklchToOklab\s*\(/.test(paintOverBody);
    // hue (.z) + chroma (.y) both perturbed.
    facts.huePerturb = /lch\.z\s*\+=/.test(paintOverBody);
    facts.chromaPerturb = /lch\.y\s*=/.test(paintOverBody);
    facts.brokenColorGated = /uBrokenColor\s*>\s*0/.test(paintOverBody);
    if (!facts.withinStrokeOklch) violations.push("(2) the within-stroke modulation does not round-trip OKLCh (oklabToOklch/oklchToOklab) — it is still value-only");
    if (!(facts.huePerturb && facts.chromaPerturb)) violations.push("(2) the within-stroke OKLCh modulation does not perturb BOTH hue (.z) and chroma (.y)");
    if (!facts.brokenColorGated) violations.push("(2) the within-stroke OKLCh broken color is not gated by uBrokenColor");

    // (3) single-source matrices — the OKLab fns come from the shared procedural-color
    //     chunk splice (OKLCH_MATRICES_GLSL) + the aurora color-utils block (linOklab);
    //     brush.glsl.ts does NOT re-declare an Ottosson matrix inline.
    facts.fragSplicesMatrices = /\$\{\s*OKLCH_MATRICES_GLSL\s*\}/.test(frag);
    facts.linOklabInFrag = /vec3\s+linOklab\s*\(/.test(frag);
    facts.noInlineMatrixInBrush = !/mat3\s+(LMS_TO_OKLAB|OKLAB_TO_LMS|LINEAR_SRGB_TO_LMS|LMS_TO_LINEAR_SRGB)\s*=/.test(brush);
    if (!facts.fragSplicesMatrices) violations.push("(3) aurora.frag.ts does not splice the shared OKLCH_MATRICES_GLSL chunk");
    if (!facts.linOklabInFrag) violations.push("(3) the aurora color-utils linOklab (the shared-chunk consumer) is absent");
    if (!facts.noInlineMatrixInBrush) violations.push("(3) brush.glsl.ts re-declares an Ottosson matrix inline (duplicate color math — not single-sourced)");

    // (4) the smooth pole keeps the cheap linear mix (the OKLab branch is GATED).
    facts.linearFallbackKept = /:\s*mix\s*\(\s*col\s*,\s*c\s*,\s*alpha\s*\)/.test(paintOverBody);
    if (!facts.linearFallbackKept) violations.push("(4) paintOver dropped the linear-mix fallback for the non-painterly path (the cost-gate — the smooth pole must keep the cheap mix)");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-stroke-composite", facts, violations });

    console.log("proof:aurora-stroke-composite — OKLab paintOver + within-stroke OKLCh (AX.W13)");
    console.log(`  (1) OKLab OVER-composite    : ${facts.oklabHelper && facts.painterlyGate && facts.oklabCompositeSelected ? "yes ✓" : "NO ✗ (bare linear mix)"}`);
    console.log(`  (2) within-stroke OKLCh     : ${facts.withinStrokeOklch && facts.huePerturb && facts.chromaPerturb && facts.brokenColorGated ? "yes ✓" : "NO ✗ (value-only)"}`);
    console.log(`  (3) single-source matrices  : ${facts.fragSplicesMatrices && facts.linOklabInFrag && facts.noInlineMatrixInBrush ? "yes ✓" : "NO ✗"}`);
    console.log(`  (4) smooth pole stays linear: ${facts.linearFallbackKept ? "yes ✓" : "NO ✗"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
