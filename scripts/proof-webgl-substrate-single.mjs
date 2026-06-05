#!/usr/bin/env node
// AU.W6 — the webgl-substrate-single gate (proof:webgl-substrate-single, DEC-AT-1).
//
// ONE WebGL2 bootstrap, shared — aurora + the AU.W7 goo-blob both compose
// `useWebGLCanvas`; nothing else creates a `webgl2` context. AND the substrate is
// a TRANSPOSITION, not a disguised copy: it must NOT bake aurora's quad/attrs/DPR
// (C6 must-fix #4). This gate is the STATIC + structural half:
//
//   (a) SINGLE BOOTSTRAP — `getContext("webgl2", …)` appears in exactly ONE src
//       file: the substrate. A consumer calling it directly reddens it (it must go
//       through the substrate).
//   (b) NO BAKED AURORA CHOICES — the substrate file imports nothing aurora-
//       specific and hard-codes none of aurora's choices (the full-screen-triangle
//       quad `[-1, -1, 3`, a `devicePixelRatio` DPR policy, aurora uniform names).
//       Those live in the CONSUMER's `setup`/`resize`. Reddens if any is baked in.
//   (c) THE GENERIC SCHEDULING IS PRESENT — the 3-reason suspend model, the
//       demand-gate (`shouldContinue`), and the `webglcontextrestored` robustness
//       (the AU.W6 §1 absent piece) are in the substrate.
//   (d) THE CONSUMER-#2 USABILITY ASSERT exists (the non-aurora composition test).
//
// The PIXEL + SCHEDULING parity (aurora before/after) is verified out-of-band: the
// scheduling parity by aurora's behavioural vitest suite + the consumer-#2 test;
// the pixel parity by `profile:aurora`'s deterministic capture path (renderAt →
// readPixels) — the live-rAF path does not drive frames under headless Chrome, so
// the CAPTURE path is the GPU floor (the AU.W7 `proof:webgl-golden` promotes it).
//
// inv ε / bite-check: a 2nd `getContext("webgl2")` reddens (a); hard-coding
// aurora's DPR/quad in the substrate reddens (b).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        SUBSTRATE: resolve(ROOT, "src/composables/glass/webgl/useWebGLCanvas.ts"),
        CONSUMER2: resolve(ROOT, "src/composables/glass/webgl/__tests__/useWebGLCanvas.test.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_WEBGL_SUBSTRATE_SINGLE_ARTIFACT", "AU-webgl-substrate-single"),
    };
    return _cliPaths;
}

function stripComments(t) {
    return t.replace(/\/\*[\s\S]*?\*\//g, " ").split("\n").map((l) => { const i = l.indexOf("//"); return i === -1 ? l : l.slice(0, i); }).join("\n");
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

function run() {
    const { ROOT, SRC, SUBSTRATE, CONSUMER2, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(SUBSTRATE)) {
        violations.push("the substrate src/composables/glass/webgl/useWebGLCanvas.ts is absent");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:webgl-substrate-single", facts, violations });
        console.error("[proof:webgl-substrate-single] FAIL — substrate absent");
        process.exit(1);
    }

    // (a) single bootstrap
    const GL2_RE = /getContext\s*\(\s*["']webgl2["']/;
    const bootstraps = [];
    for (const file of walk(SRC)) {
        if (GL2_RE.test(stripComments(readFileSync(file, "utf8")))) bootstraps.push(file.slice(ROOT.length + 1));
    }
    facts.bootstraps = bootstraps;
    const onlySubstrate = bootstraps.length === 1 && resolve(ROOT, bootstraps[0]) === SUBSTRATE;
    if (!onlySubstrate) {
        violations.push(`webgl2 context is created in ${bootstraps.length} file(s) (${bootstraps.join(", ")}) — it must be ONE (the substrate); consumers compose useWebGLCanvas`);
    }

    // (b) no baked aurora choices in the substrate
    const sub = stripComments(readFileSync(SUBSTRATE, "utf8"));
    const baked = [];
    if (/custom\/aurora|from\s*["'][^"']*aurora/.test(sub)) baked.push("an aurora import");
    if (/-1\s*,\s*-1\s*,\s*3\b/.test(sub)) baked.push("aurora's full-screen-triangle quad literal");
    if (/devicePixelRatio/.test(sub)) baked.push("a devicePixelRatio DPR policy (the consumer's resize owns it)");
    if (/\buCursor\b|\buTime\b|uNuclei|uStop/.test(sub)) baked.push("aurora uniform names");
    facts.baked = baked;
    if (baked.length) violations.push(`the substrate BAKES consumer-#1 choices (${baked.join("; ")}) — a transposition must parameterize them (C6 #4)`);

    // (c) the generic scheduling + the new robustness are present
    const missing = [];
    for (const [needle, label] of [
        ['"tab-hidden"', "the tab-hidden suspend reason"],
        ['"off-screen"', "the off-screen suspend reason"],
        ['"manual"', "the manual suspend reason"],
        ["shouldContinue", "the demand-gate"],
        ["webglcontextrestored", "the context-restore robustness (the AU.W6 absent piece)"],
    ]) {
        if (!sub.includes(needle)) missing.push(label);
    }
    facts.missing = missing;
    if (missing.length) violations.push(`the substrate is missing: ${missing.join("; ")}`);

    // (d) the consumer-#2 usability assert exists
    facts.consumer2 = existsSync(CONSUMER2);
    if (!facts.consumer2) violations.push("the consumer-#2 usability assert (useWebGLCanvas.test.ts) is absent");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:webgl-substrate-single", facts, violations });

    console.log("proof:webgl-substrate-single — ONE WebGL2 bootstrap, no baked choices (AU.W6)");
    console.log(`  webgl2 bootstraps : ${bootstraps.length} (${onlySubstrate ? "substrate only ✓" : bootstraps.join(", ")})`);
    console.log(`  baked choices     : ${baked.length ? baked.join("; ") : "none ✓"}`);
    console.log(`  scheduling missing: ${missing.length ? missing.join("; ") : "none ✓"}`);
    console.log(`  consumer-#2 assert: ${facts.consumer2 ? "present ✓" : "ABSENT"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
