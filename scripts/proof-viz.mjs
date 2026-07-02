#!/usr/bin/env node
// BG.W-VIZ-RESIZE-ADOPT — proof:viz, the viz-resize-UPLOAD-ONLY source gate
// (born-RED on HEAD — every viz self-measured the backing → GREEN at the hard-adopt).
//
// The cure for the substrate-plumbing chronic (the un-adopted leaf sizer): the ONE
// backing-store sizer `sizeBacking` (createCanvasLifecycle.ts) MEASURES the LAID-OUT box
// (getBoundingClientRect, never clientWidth — which reads 0 under a content-visibility skip)
// and sizes the backing to `round(gBCR × dpr)`; every procedural viz's `resize`/`render`
// closure is UPLOAD-ONLY (it uploads the leaf-sized viewport/uniforms, it does NOT re-derive
// a wrong box). Before this wave each of the 9 viz self-measured `canvas.clientWidth || 320`
// and self-SET `canvas.width` in its own closure (the three incompatible conventions the
// DELTA-ASSAY reproduced as the live 300×150 stuck-canvas), NONE threaded `dprPolicy`.
//
// This is the DEVICE-FREE SOURCE arm (born-RED → GREEN, tagged ["local","ci","release"]).
// The LIVE-GPU paint (per-viz backing == round(gBCR × dpr) AND meanByte > floor at the
// SPA-nav window, on Chrome AND Safari) rides the orchestrator's real-Metal capture, NOT
// this gate — the cardinal split (CI proves the SOURCE upload-only shape, the local close
// proves the PAINT).
//
// FALSIFIABLE SOURCE WITNESSES (each born-RED before the wave; the comment-strip +
// pure-detector house pattern, mirroring proof-viz-dotflow.mjs / proof-viz-papergrid.mjs):
//
//   V1 — the ONE sizer is `sizeBacking` in the leaf, backing == round(gBCR × dpr). The leaf
//        `createCanvasLifecycle.ts` reads `canvas.getBoundingClientRect()` (gBCR, NOT
//        clientWidth) and computes `Math.round(box.w * dpr)` / `Math.round(box.h * dpr)`.
//        Bite: a `sizeBacking` reading `clientWidth` (not gBCR) reds.
//
//   V2 — NO viz self-measures the box. No `clientWidth ||` / `clientHeight ||` fallback
//        survives in ANY of the 9 viz composables (the `grep "clientWidth ||" custom = 0`
//        bar). Bite: a planted `canvas.clientWidth || 320` in a viz reds.
//
//   V3 — NO viz SELF-SIZES the substrate backing. No `canvas.width =` / `canvas.height =`
//        assignment survives in a viz composable — the LEAF owns sizing (the upload-only
//        floor). EXEMPT: `auroraFallbackGround.ts` (a one-shot OFFSCREEN 2D-canvas raster for
//        the CSS placeholder ground — it creates its OWN throwaway `document.createElement`
//        canvas, never the live substrate). Bite: a planted `canvas.width = w` in a viz reds;
//        the exempt offscreen raster does NOT red (the exemption is filename-scoped).
//
//   V4 — every viz THREADS `dprPolicy`. Every file that CALLS `createGpuSubstrate(canvas`
//        (the 9 viz orchestrators) also passes `dprPolicy:` (the leaf then owns measurement).
//        Bite: a `createGpuSubstrate(canvas` call with NO `dprPolicy:` reds.
//
//   V5 — the leaf routes sizing through the ONE sizer. `sizeAndUpload` calls
//        `sizeBacking(canvas, dprPolicy)` and hands the live `BackingSize` to
//        `options.resize(s)` (the G1 inversion). Bite: a `sizeAndUpload` that skips
//        `sizeBacking` reds.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const CUSTOM = resolve(ROOT, "src/components/custom");
const LEAF = resolve(
    ROOT,
    "src/composables/glass/webgl/createCanvasLifecycle.ts",
);

// The 9 procedural viz whose resize/render is HARD-ADOPTED upload-only.
const VIZ_DIRS = [
    "aurora",
    "goo-blob",
    "dot-matrix",
    "goo-dot-matrix",
    "dot-flow-field",
    "fourier-field",
    "constellation",
    "concentric",
    "paper-grid",
];

// V3 exemption: the offscreen 2D-canvas raster for the CSS placeholder ground. It creates a
// THROWAWAY `document.createElement("canvas")` and sets its width/height for a one-shot
// CPU raster — it is NOT the live substrate backing the leaf sizes.
const SELF_SIZE_EXEMPT = new Set([
    "aurora/composables/auroraFallbackGround.ts",
]);

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

/** URL-safe comment strip — `(^|[^:])//` keeps a `://` in a URL intact. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/** Recursively collect every `.ts` under `dir` (relative to CUSTOM). */
function walkTs(dir) {
    const out = [];
    if (!existsSync(dir)) return out;
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) out.push(...walkTs(p));
        else if (name.endsWith(".ts")) out.push(p);
    }
    return out;
}

/**
 * Collect the live viz-composable file map (relPath → comment-stripped content). The
 * `overrides` map (self-test) can REPLACE a rel-path's content or ADD a synthetic viz file.
 */
function vizFiles(overrides = {}) {
    const map = {};
    for (const d of VIZ_DIRS) {
        for (const abs of walkTs(resolve(CUSTOM, d))) {
            const rel = relative(CUSTOM, abs).split("\\").join("/");
            map[rel] = stripComments(read(abs) ?? "");
        }
    }
    for (const [rel, content] of Object.entries(overrides)) {
        map[rel] = content === null ? undefined : stripComments(content);
    }
    for (const k of Object.keys(map)) if (map[k] === undefined) delete map[k];
    return map;
}

function runAll(over = {}) {
    const fails = [];
    const leaf = stripComments(
        over.__leaf !== undefined ? over.__leaf : (read(LEAF) ?? ""),
    );
    const files = vizFiles(
        Object.fromEntries(
            Object.entries(over).filter(([k]) => !k.startsWith("__")),
        ),
    );

    // ── V1 — the ONE sizer measures gBCR + backing == round(gBCR × dpr) ──
    if (!/function\s+sizeBacking\s*\(/.test(leaf))
        fails.push("V1: the leaf sizer `sizeBacking` is absent");
    if (!/canvas\.getBoundingClientRect\s*\(/.test(leaf))
        fails.push(
            "V1: `sizeBacking` does not measure gBCR (getBoundingClientRect) — a clientWidth self-measure reads 0 under a content-visibility skip",
        );
    if (
        !/Math\.round\(\s*box\.w\s*\*\s*dpr\s*\)/.test(leaf) ||
        !/Math\.round\(\s*box\.h\s*\*\s*dpr\s*\)/.test(leaf)
    )
        fails.push(
            "V1: the backing is not `round(box × dpr)` (the backing == round(gBCR × dpr) contract)",
        );

    // ── V2 / V3 — no viz self-measures or self-sizes the backing ──
    for (const [rel, src] of Object.entries(files)) {
        if (/\bclient(Width|Height)\s*\|\|/.test(src))
            fails.push(
                `V2: ${rel} self-measures the box (\`clientWidth ||\`/\`clientHeight ||\`) — the leaf owns measurement`,
            );
        if (!SELF_SIZE_EXEMPT.has(rel) && /\bcanvas\.(width|height)\s*=/.test(src))
            fails.push(
                `V3: ${rel} self-sizes the substrate backing (\`canvas.width =\`/\`canvas.height =\`) — the leaf owns sizing (upload-only floor)`,
            );
    }

    // ── V4 — every createGpuSubstrate(canvas) call-site threads dprPolicy ──
    let callSites = 0;
    for (const [rel, src] of Object.entries(files)) {
        if (/createGpuSubstrate\s*\(\s*canvas/.test(src)) {
            callSites++;
            if (!/dprPolicy\s*:/.test(src))
                fails.push(
                    `V4: ${rel} calls createGpuSubstrate but threads NO \`dprPolicy\` — the leaf cannot own measurement`,
                );
        }
    }
    if (callSites < VIZ_DIRS.length)
        fails.push(
            `V4: only ${callSites}/${VIZ_DIRS.length} viz thread the leaf sizer (expected one createGpuSubstrate(canvas) call-site per viz)`,
        );

    // ── V5 — the leaf routes sizing through the ONE sizer ──
    if (!/sizeBacking\s*\(\s*canvas\s*,\s*dprPolicy\s*\)/.test(leaf))
        fails.push(
            "V5: `sizeAndUpload` does not route through `sizeBacking(canvas, dprPolicy)` (the G1 inversion)",
        );
    if (!/options\.resize\s*\(\s*s\s*\)/.test(leaf))
        fails.push(
            "V5: the leaf does not hand the live `BackingSize` to `options.resize(s)`",
        );

    return fails;
}

function selfTest() {
    const fails = [];
    const anchor = "dot-flow-field/composables/_probe.ts";
    const withCall =
        "handle = createGpuSubstrate(canvas, { dprPolicy: resolveBudgetDpr });";

    // (a) a `clientWidth ||` self-measure in a viz reds V2.
    const a = runAll({
        [anchor]:
            withCall + "\nfunction resize() { const w = canvas.clientWidth || 320; }",
    });
    if (!a.some((v) => v.startsWith("V2")))
        fails.push("self-test: a planted `clientWidth || 320` did NOT red V2");

    // (b) a `canvas.width =` self-size in a viz reds V3.
    const b = runAll({
        [anchor]: withCall + "\nfunction resize() { canvas.width = 640; }",
    });
    if (!b.some((v) => v.startsWith("V3")))
        fails.push("self-test: a planted `canvas.width = 640` did NOT red V3");

    // (c) the exempt offscreen raster (`canvas.width = grid`) does NOT red V3 (scoped exemption).
    const exemptContent =
        "const canvas = document.createElement('canvas');\ncanvas.width = grid;\ncanvas.height = grid;";
    const c = runAll({
        "aurora/composables/auroraFallbackGround.ts": exemptContent,
    });
    if (c.some((v) => v.startsWith("V3") && v.includes("auroraFallbackGround")))
        fails.push(
            "self-test: the exempt offscreen raster WRONGLY red V3 (the exemption is not scoped)",
        );

    // (d) a createGpuSubstrate(canvas) call WITHOUT dprPolicy reds V4.
    const d = runAll({
        [anchor]: "handle = createGpuSubstrate(canvas, { setupGL });",
    });
    if (!d.some((v) => v.startsWith("V4")))
        fails.push("self-test: a dprPolicy-less createGpuSubstrate did NOT red V4");

    // (e) a leaf `sizeBacking` reading `clientWidth` (not gBCR) reds V1.
    const e = runAll({
        __leaf:
            "function sizeBacking(canvas, dprPolicy) { const w = canvas.clientWidth || 1; canvas.width = w; }\nsizeBacking(canvas, dprPolicy);\noptions.resize(s);",
    });
    if (!e.some((v) => v.startsWith("V1")))
        fails.push("self-test: a clientWidth-measuring sizeBacking did NOT red V1");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:viz",
        wave: "BG.W-VIZ-RESIZE-ADOPT",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_VIZ_ARTIFACT", "proof-viz.json");
    writeGateArtifact(out, artifact);

    console.log(
        "proof:viz — viz-resize-UPLOAD-ONLY: the leaf owns backing==round(gBCR × dpr); every viz uploads, none self-measures (BG.W-VIZ-RESIZE-ADOPT)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log(
            "  GREEN (V1 one-sizer-gBCR · V2 no-self-measure · V3 no-self-size · V4 dprPolicy×9 · V5 leaf-routes)",
        );
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("  --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("    ✗ " + f);
        } else {
            console.log("  --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
