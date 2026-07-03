#!/usr/bin/env node
// proof:viz — THREE disjoint arms on ONE gate:
//   • BG.W-VIZ-RESIZE-ADOPT (V1-V5) — the viz-resize-UPLOAD-ONLY source gate
//     (born-RED on HEAD — every viz self-measured the backing → GREEN at the hard-adopt).
//   • BG.W-GOODOT-SETUP-SPLIT (G1-G3) — the F9 no-god-module setup-split source gate:
//     useGooDotMatrix.ts (508 at the BD base) drained its two `setupWGPU`/`setupGL` builders +
//     their per-frame two-pass draw into the colocated `gooDotFrame.ts` leaf (which CALLS the
//     `gooDotSetup.ts` one-time RESOURCE construction), keeping ONLY the sim + the SHARED
//     field-advance + the demand gate + the lifecycle handle. Born-RED on HEAD (the builders are
//     inline in the composable AND `gooDotFrame.ts` does not exist); GREEN at the carve. Bites:
//     an inline `function buildWGPUSetup(` reds G2, a re-folded `uploadBlobUniforms(` in the
//     composable reds G3, a `gooDotFrame.ts` missing the WGPU-builder export reds G1.
//   • BG.W-VIZ-PREVIEW-LIVE (P1-P4) — the per-STORY distinct-preview-still source gate:
//     the /substrates bento painted 11 IDENTICAL frozen aurora stills (every card shared
//     the ONE category `fieldStill`); the cure is a per-story dispatch off the colocated
//     `demo/stories/vizPreviewStill.ts` registry so per-card pixel-hash differs BY
//     CONSTRUCTION over ZERO live GL contexts (born-RED on HEAD — the registry + the
//     SectionPreviewCard import do not exist). The LIVE per-card-pixel-hash paint is the
//     orchestrator's real-device capture, NOT this gate (the cardinal source/paint split).
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
// BG.W-VIZ-PREVIEW-LIVE — the per-story preview-still surface (the SectionPreviewCard
// dispatch + its colocated distinct-still registry). The preview arm (P1-P4) shares
// this gate with the resize-upload-only arm (V1-V5); the two are disjoint file sets.
const CARD = resolve(ROOT, "demo/stories/SectionPreviewCard.vue");
const STILL = resolve(ROOT, "demo/stories/vizPreviewStill.ts");

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

    // ══ PREVIEW ARM (BG.W-VIZ-PREVIEW-LIVE) — 11 DISTINCT per-story preview stills ══
    // The /substrates bento painted 11 IDENTICAL frozen aurora stills (every card
    // shared the ONE category `fieldStill`). The cure is a per-STORY dispatch: the
    // card rasters its OWN distinct recognizable still (7 leaf-signature / 2 SDF-approx
    // / 2 glass-over-field) off the colocated registry — per-card pixel-hash differs by
    // construction, over ZERO live GL contexts (a still is a parked frame).
    const still = stripComments(
        over.__still !== undefined ? over.__still : (read(STILL) ?? ""),
    );
    const card = stripComments(
        over.__card !== undefined ? over.__card : (read(CARD) ?? ""),
    );

    // P1 — the per-story still registry exists with ≥11 route→descriptor entries.
    const entries = [
        ...still.matchAll(/"(\/substrates\/[a-z0-9-]+)"\s*:\s*\{([^}]*)\}/g),
    ];
    if (entries.length < 11)
        fails.push(
            `P1: the vizPreviewStill registry has ${entries.length} route entries (<11) — the per-story dispatch is absent (born-RED: on HEAD the module + registry do not exist)`,
        );

    // P2 — every descriptor is pairwise-DISTINCT. A shared (pattern,hue,seed) triple
    // → a shared generator + inputs → the SAME still → the shared-placeholder
    // regression the "per-card pixel-hash differs" bar forbids.
    const seen = new Map();
    for (const [, route, body] of entries) {
        const pat = (body.match(/pattern\s*:\s*"([a-z-]+)"/) || [])[1] ?? "";
        const hue = (body.match(/hue\s*:\s*(-?\d+)/) || [])[1] ?? "";
        const seed = (body.match(/seed\s*:\s*(-?\d+)/) || [])[1] ?? "";
        if (!pat)
            fails.push(`P2: ${route} declares no \`pattern\` — the generator is undefined`);
        const key = `${pat}|${hue}|${seed}`;
        if (seen.has(key))
            fails.push(
                `P2: ${route} shares the still descriptor \`${key}\` with ${seen.get(key)} — two cards would paint the SAME still`,
            );
        else seen.set(key, route);
    }

    // P3 — the card dispatches per-STORY off its route (imports + reads the registry),
    // NOT the shared per-category field smear.
    if (!/from\s+["']\.\/vizPreviewStill["']/.test(card))
        fails.push(
            "P3: SectionPreviewCard does not import `./vizPreviewStill` — the per-story dispatch is not wired (born-RED: the HEAD card renders only the shared category slot)",
        );
    if (!/vizPreviewStill\s*\(/.test(card))
        fails.push(
            "P3: SectionPreviewCard does not call `vizPreviewStill(...)` off its route — no per-story still is rendered",
        );

    // P4 — the still is DEVICE-FREE (a memoized Canvas2D raster → data URI, ZERO live
    // GL/WebGPU contexts — the ≤1-live-context budget; a still is a parked frame).
    if (
        /getContext\(\s*["'](?:webgl2?|webgpu)["']/.test(still) ||
        /createGpuSubstrate|requestAdapter/.test(still)
    )
        fails.push(
            "P4: vizPreviewStill arms a live GL/WebGPU context — a preview still must be a device-free Canvas2D raster (the ≤1-live-context budget)",
        );
    if (!/getContext\(\s*["']2d["']\s*\)/.test(still))
        fails.push(
            "P4: vizPreviewStill does not raster on a 2D canvas — the still must be the device-free auroraFallbackGround pattern",
        );
    if (!/new Map\b/.test(still) || !/toDataURL/.test(still))
        fails.push(
            "P4: vizPreviewStill is not a memoized data-URI raster (each story rasters ONCE — proto2 #6)",
        );

    // ══ GOO-DOT SETUP-SPLIT ARM (BG.W-GOODOT-SETUP-SPLIT) — the F9 no-god-module carve ══
    // useGooDotMatrix.ts (508 at the BD base) drained its two `setupWGPU`/`setupGL` builders +
    // their per-frame two-pass draw into the colocated `gooDotFrame.ts` leaf (which CALLS the
    // `gooDotSetup.ts` one-time RESOURCE construction). The composable keeps ONLY the sim + the
    // SHARED field-advance + the demand gate + the lifecycle handle. Born-RED on HEAD: the two
    // builders are inline in the composable AND `gooDotFrame.ts` does not exist.
    const GOODOT_COMPOSABLE = "goo-dot-matrix/composables/useGooDotMatrix.ts";
    const GOODOT_FRAME = "goo-dot-matrix/composables/gooDotFrame.ts";
    const gooComposable = files[GOODOT_COMPOSABLE] ?? "";
    const gooFrame = files[GOODOT_FRAME] ?? "";

    // G1 — the setup builders live in the colocated LEAF, exported (born-RED: absent on HEAD).
    if (
        !/export\s+function\s+buildGooDotWGPUSetup\s*\(/.test(gooFrame) ||
        !/export\s+function\s+buildGooDotGLSetup\s*\(/.test(gooFrame)
    )
        fails.push(
            "G1: the goo-dot setup builders (buildGooDotWGPUSetup/buildGooDotGLSetup) are not exported from gooDotFrame.ts — the F9 setup-split has not landed (born-RED: on HEAD both are inline in useGooDotMatrix.ts)",
        );

    // G2 — the composable defines NO inline setup builder AND composes the carved pair (born-RED:
    // on HEAD it defines `function buildWGPUSetup`/`function buildGLSetup` inline, imports neither).
    if (/\bfunction\s+build(WGPU|GL)Setup\s*\(/.test(gooComposable))
        fails.push(
            "G2: useGooDotMatrix.ts still defines an inline setup builder (`function buildWGPUSetup`/`function buildGLSetup`) — the setup must be carved into the gooDotFrame.ts leaf",
        );
    if (
        !/buildGooDotWGPUSetup/.test(gooComposable) ||
        !/buildGooDotGLSetup/.test(gooComposable)
    )
        fails.push(
            "G2: useGooDotMatrix.ts does not compose the carved builders (buildGooDotWGPUSetup/buildGooDotGLSetup) — the drain is not wired",
        );

    // G3 — the per-frame draw internals are OUT of the composable and IN the leaf (a DRAIN, not a
    // delete). Born-RED: on HEAD every draw-internal below lives in the composable.
    for (const tok of [
        /\bbeginRenderPass\b/,
        /\buploadBlobUniforms\s*\(/,
        /\bpackBlobWGPUUniforms\s*\(/,
        /\bcreateGooDot(?:WGPU|GL)Resources\s*\(/,
    ])
        if (tok.test(gooComposable))
            fails.push(
                `G3: useGooDotMatrix.ts still carries a per-frame draw internal (${tok.source}) — the draw belongs in the gooDotFrame.ts leaf`,
            );
    if (
        !/\bbeginRenderPass\b/.test(gooFrame) ||
        !/\buploadBlobUniforms\s*\(/.test(gooFrame) ||
        !/\bpackBlobWGPUUniforms\s*\(/.test(gooFrame)
    )
        fails.push(
            "G3: the gooDotFrame.ts leaf does not carry the per-frame draw (beginRenderPass / uploadBlobUniforms / packBlobWGPUUniforms) — the carve deleted the draw instead of re-homing it",
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

    // ── PREVIEW ARM bites (BG.W-VIZ-PREVIEW-LIVE) ──
    const validStill =
        'export const VIZ_PREVIEW_STILLS = {\n' +
        '  "/substrates/aurora": { pattern: "nuclei", hue: 58, seed: 101 },\n' +
        '};\nconst cache = new Map();\ncanvas.getContext("2d");\ncanvas.toDataURL("image/png");';

    // (f) two registry entries with the SAME (pattern,hue,seed) descriptor red P2.
    const f = runAll({
        __still:
            'export const VIZ_PREVIEW_STILLS = {\n' +
            '  "/substrates/aurora": { pattern: "nuclei", hue: 58, seed: 101 },\n' +
            '  "/substrates/blob": { pattern: "nuclei", hue: 58, seed: 101 },\n' +
            '};\nconst cache = new Map();\ncanvas.getContext("2d");\ncanvas.toDataURL("x");',
    });
    if (!f.some((v) => v.startsWith("P2")))
        fails.push("self-test: two cards sharing one still descriptor did NOT red P2");

    // (g) a registry under 11 entries reds P1 (the per-story dispatch incomplete).
    const g = runAll({ __still: validStill });
    if (!g.some((v) => v.startsWith("P1")))
        fails.push("self-test: a <11-entry preview registry did NOT red P1");

    // (h) a card that does not import the registry reds P3 (the shared-smear regression).
    const h = runAll({
        __card:
            "<script setup lang=\"ts\">const props = defineProps<{ to: string }>();</script>\n<template><div /></template>",
    });
    if (!h.some((v) => v.startsWith("P3")))
        fails.push("self-test: a card not importing vizPreviewStill did NOT red P3");

    // (i) a still that arms a live GL context reds P4 (the ≤1-live-context budget).
    const i = runAll({
        __still:
            'export const VIZ_PREVIEW_STILLS = {};\nconst cache = new Map();\ncanvas.getContext("webgl2");\ncanvas.toDataURL("x");',
    });
    if (!i.some((v) => v.startsWith("P4")))
        fails.push("self-test: a GL-arming preview still did NOT red P4");

    // ── GOO-DOT SETUP-SPLIT bites (BG.W-GOODOT-SETUP-SPLIT) ──
    const gooComposable = "goo-dot-matrix/composables/useGooDotMatrix.ts";
    const gooFrame = "goo-dot-matrix/composables/gooDotFrame.ts";

    // (j) a composable re-inlining `function buildWGPUSetup(` reds G2 (the drain undone).
    const j = runAll({
        [gooComposable]:
            "import { buildGooDotWGPUSetup, buildGooDotGLSetup } from './gooDotFrame';\nfunction buildWGPUSetup() { return () => {}; }",
    });
    if (!j.some((v) => v.startsWith("G2")))
        fails.push("self-test: a re-inlined `function buildWGPUSetup(` did NOT red G2");

    // (k) a composable that re-folds a per-frame draw internal (`uploadBlobUniforms(`) reds G3.
    const k = runAll({
        [gooComposable]:
            "import { buildGooDotWGPUSetup, buildGooDotGLSetup } from './gooDotFrame';\nfunction f(gl) { uploadBlobUniforms(gl, prog); }",
    });
    if (!k.some((v) => v.startsWith("G3")))
        fails.push("self-test: a re-folded `uploadBlobUniforms(` in the composable did NOT red G3");

    // (l) a leaf missing the buildGooDotWGPUSetup export reds G1 (the setup-split half-landed).
    const l = runAll({
        [gooFrame]: "export function buildGooDotGLSetup() { return () => {}; }",
    });
    if (!l.some((v) => v.startsWith("G1")))
        fails.push("self-test: a gooDotFrame.ts missing the WGPU-builder export did NOT red G1");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:viz",
        wave: "BG.W-VIZ-RESIZE-ADOPT + BG.W-VIZ-PREVIEW-LIVE + BG.W-GOODOT-SETUP-SPLIT",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_VIZ_ARTIFACT", "proof-viz.json");
    writeGateArtifact(out, artifact);

    console.log(
        "proof:viz — viz-resize-UPLOAD-ONLY (BG.W-VIZ-RESIZE-ADOPT) + per-story preview stills (BG.W-VIZ-PREVIEW-LIVE) + goo-dot setup-split (BG.W-GOODOT-SETUP-SPLIT)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log(
            "  GREEN (V1 one-sizer-gBCR · V2 no-self-measure · V3 no-self-size · V4 dprPolicy×9 · V5 leaf-routes · P1 registry≥11 · P2 pairwise-distinct · P3 card-dispatch · P4 device-free-memoized · G1 leaf-exports-builders · G2 composable-drained · G3 draw-in-leaf)",
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
