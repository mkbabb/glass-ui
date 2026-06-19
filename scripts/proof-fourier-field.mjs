#!/usr/bin/env node
// BC.W-VIZ-FOURIER — proof:fourier-field, the fourier-field collapse+migration source gate
// (born-RED on the pre-migration HEAD → GREEN at close).
//
// The fourier surface was spread across THREE views on a Canvas2D renderer the §E mandate
// forbids. This wave COLLAPSES the duplication to ONE GPU view + MIGRATES off Canvas2D onto
// the WGSL-primary GPU substrate. This gate machine-locks the FIVE deliverables; the binding
// live-π / own-surface DELTA capture (the gestalt bar) rides this wave's close
// (tests-visual/fourier-field.spec.ts) on the real Metal GPU.
//
// SOURCE PREDICATES (each falsifiable, each device-free):
//   U1 — ONE view. The merged demo/stories/substrates/fourier-field.vue is the ONE view;
//        FourierStudioStage.vue + fourier-studio.vue are ABSENT (merged); manifest.ts has
//        exactly ONE non-background fourier story row; no ambient-companion re-embed
//        (<FourierField> appears at most ONCE in the merged view's interactive surface).
//   U2 — WGSL primary, no Canvas2D viz. useFourierField.ts carries NO useCanvas2D import +
//        NO getContext("2d"); it composes createGpuSubstrate with a setupWGPU + setupGL.
//   U3 — ONE math source round-trips. The WGSL compute kernel transcribes math.ts
//        partialSumAt (c += vec2(re·cos−im·sin, re·sin+im·cos)) + the chain-tip
//        (positionsAt); the spectrum is CPU-minted (makeEllipticSpectrum/dftFromPoints in
//        JS, NOT re-implemented in WGSL).
//   U4 — no variant enum. FourierField.vue carries NO `variant: "hero"|"final"` prop;
//        index.ts carries no FourierFieldVariant export on the props.
//   U5 — no teal demo default; warm-cream identity. The LIBRARY constants.ts has NO teal
//        oklch(... 195)-family hue; WARM_IDENTITY_PALETTE is the default; the merged view's
//        color presets carry no teal default.
//
// SELF-TEST BITE (--selftest): each planted defect (a re-added second fourier row, a
// useCanvas2D import, a WGSL-side spectrum mint, a re-added variant enum, a teal default)
// MUST red — the born-RED proof on the green migrated tree.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/fourier-field");
const MANIFEST = resolve(ROOT, "demo/stories/manifest.ts");
const MERGED_VIEW = resolve(ROOT, "demo/stories/substrates/fourier-field.vue");
const RETIRED_STAGE = resolve(ROOT, "demo/stories/substrates/FourierStudioStage.vue");
const RETIRED_STUDIO = resolve(ROOT, "demo/stories/substrates/fourier-studio.vue");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const stripComments = (s) =>
    (s ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/[^\n]*/g, "");

// ── U1 — ONE view ──
function clauseOneView(o = {}) {
    const viol = [];
    if (o.mergedAbsent === true || !existsSync(MERGED_VIEW))
        viol.push("U1: the merged demo/stories/substrates/fourier-field.vue is missing");
    if (o.stagePresent === true || existsSync(RETIRED_STAGE))
        viol.push("U1: FourierStudioStage.vue must be RETIRED (the Canvas2D stage is folded into the ONE view)");
    if (o.studioPresent === true || existsSync(RETIRED_STUDIO))
        viol.push("U1: fourier-studio.vue must be RETIRED (merged into the ONE fourier-field.vue view)");

    const manifest = stripComments(o.manifest ?? read(MANIFEST) ?? "");
    // Count non-background fourier STORY rows: s("substrates", "fourier-…", …). The
    // background:"fourier" ambient ROLE on other routes is NOT a story id, so it is not counted.
    const rowRe = /s\(\s*["']substrates["']\s*,\s*["'](fourier[\w-]*)["']/g;
    const rows = [];
    let m;
    while ((m = rowRe.exec(manifest))) rows.push(m[1]);
    if (rows.length !== 1)
        viol.push(`U1: manifest must have EXACTLY ONE fourier story row (found ${rows.length}: ${rows.join(", ") || "none"})`);
    if (rows.length === 1 && rows[0] !== "fourier-field")
        viol.push(`U1: the ONE fourier story row must be "fourier-field" (found "${rows[0]}")`);

    // No ambient-companion re-embed: the merged interactive view must mount <FourierField> at
    // most ONCE (the duplication the collapse kills — a second mount is the recessive companion).
    // Strip comments first (a <FourierField> mentioned in a doc comment is not a mount).
    const view = stripComments(o.mergedView ?? read(MERGED_VIEW) ?? "");
    const mounts = (view.match(/<FourierField[\s/>]/g) || []).length;
    if (mounts > 1)
        viol.push(`U1: the merged view mounts <FourierField> ${mounts}× — the ambient-companion re-embed is the duplication the collapse kills (mount ONCE)`);
    return viol;
}

// ── U2 — WGSL primary, no Canvas2D viz ──
function clauseWgslPrimary(o = {}) {
    const viol = [];
    const composable = stripComments(
        o.composable ?? read(resolve(DIR, "composables/useFourierField.ts")) ?? "",
    );
    if (/useCanvas2D/.test(composable))
        viol.push("U2: useFourierField.ts still imports/uses useCanvas2D — the Canvas2D renderer is RETIRED (WGSL primary mandate)");
    if (/getContext\(\s*["']2d["']/.test(composable))
        viol.push("U2: useFourierField.ts still calls getContext('2d') — no Canvas2D viz");
    if (!/createGpuSubstrate/.test(composable))
        viol.push("U2: useFourierField.ts does not compose createGpuSubstrate (the GPU substrate picker)");
    if (!/setupWGPU/.test(composable) || !/setupGL/.test(composable))
        viol.push("U2: useFourierField.ts must wire BOTH a setupWGPU (primary) and a setupGL (fallback)");
    return viol;
}

// ── U3 — ONE math source round-trips ──
function clauseRoundTrip(o = {}) {
    const viol = [];
    const compute = stripComments(
        o.compute ?? read(resolve(DIR, "shaders/fourier-field.compute.wgsl.ts")) ?? "",
    );
    const math = stripComments(o.math ?? read(resolve(DIR, "math.ts")) ?? "");
    const tokens = [
        ["partialSumAt in math.ts (JS)", () => /export function partialSumAt/.test(math)],
        ["positionsAt in math.ts (JS)", () => /export function positionsAt/.test(math)],
        ["partialSumAt transcribed in WGSL", () => /fn partialSumAt/.test(compute)],
        ["epicycle chain-tip transcribed in WGSL", () => /fn epicycleChainTip/.test(compute)],
        // the EXACT partial-sum recurrence c += vec2(re·cos − im·sin, re·sin + im·cos).
        [
            "WGSL partial-sum recurrence (re·cos−im·sin, re·sin+im·cos)",
            () =>
                /re\s*\*\s*cs\s*-\s*im\s*\*\s*sn\s*,\s*re\s*\*\s*sn\s*\+\s*im\s*\*\s*cs/.test(
                    compute,
                ),
        ],
        // angle = TAU · index · t (the math.ts 2π·index·t).
        ["WGSL angle = TAU·index·t", () => /TAU\s*\*\s*index\s*\*\s*t/.test(compute)],
    ];
    for (const [label, fn] of tokens) {
        if (!fn()) viol.push(`U3: ${label} — the WGSL must transcribe the SAME math.ts source (the ONE evaluator)`);
    }
    // The spectrum is CPU-minted, NOT minted in WGSL (no makeEllipticSpectrum/dftFromPoints in the kernel).
    if (/makeEllipticSpectrum|dftFromPoints/.test(compute))
        viol.push("U3: the WGSL compute kernel mints the spectrum — the spectrum is CPU-minted in JS; the WGSL only SUMS the uploaded phasor table");
    return viol;
}

// ── U4 — no variant enum ──
function clauseNoVariant(o = {}) {
    const viol = [];
    const sfc = stripComments(o.sfc ?? read(resolve(DIR, "FourierField.vue")) ?? "");
    if (/variant\s*\?\s*:\s*["']hero["']\s*\|\s*["']final["']/.test(sfc))
        viol.push('U4: FourierField.vue still carries the `variant?: "hero" | "final"` prop — RETIRED (folds into config presets)');
    if (/variant\s*:\s*["']hero["']\s*\|\s*["']final["']/.test(sfc))
        viol.push('U4: FourierField.vue still declares the `variant: "hero" | "final"` enum');
    const index = stripComments(o.index ?? read(resolve(DIR, "index.ts")) ?? "");
    if (/FourierFieldVariant/.test(index))
        viol.push("U4: index.ts still exports FourierFieldVariant — the variant enum is retired");
    return viol;
}

// ── U5 — no teal demo default; warm-cream identity ──
function clauseWarmIdentity(o = {}) {
    const viol = [];
    const consts = stripComments(o.constants ?? read(resolve(DIR, "constants.ts")) ?? "");
    // No teal/cool hue in the LIBRARY default config.
    const stopRe = /h\s*:\s*(\d+(?:\.\d+)?)/g;
    let m;
    while ((m = stopRe.exec(consts))) {
        const h = Number(m[1]);
        if (h >= 150 && h <= 280)
            viol.push(`U5: a teal/cool hue (h=${h}) in the LIBRARY constants.ts — the warm-cream identity is the default (presets-in-consumers)`);
    }
    if (!/WARM_IDENTITY_PALETTE/.test(consts))
        viol.push("U5: constants.ts does not declare WARM_IDENTITY_PALETTE (the warm default)");
    // No teal default in the merged demo view's color presets — a literal `oklch(... 195)` teal.
    const view = stripComments(o.mergedView ?? read(MERGED_VIEW) ?? "");
    if (/oklch\(\s*0?\.\d+\s+0?\.\d+\s+(?:19[0-9]|2[0-4][0-9])\b/.test(view))
        viol.push("U5: the merged demo view carries a literal teal/cool oklch(... 195-249) color default — RETIRE (clean break, W-TEAL-NAVY-PURGE)");
    return viol;
}

function runAll(o = {}) {
    return [
        ...clauseOneView(o.u1 ?? {}),
        ...clauseWgslPrimary(o.u2 ?? {}),
        ...clauseRoundTrip(o.u3 ?? {}),
        ...clauseNoVariant(o.u4 ?? {}),
        ...clauseWarmIdentity(o.u5 ?? {}),
    ];
}

// ── Self-test bites: each planted pre-migration defect MUST red ──
function selfTest() {
    const fails = [];
    // (a) a re-added second fourier story row.
    const twoRows = clauseOneView({
        manifest:
            's("substrates", "fourier-field", …)\ns("substrates", "fourier-studio", …)',
        stagePresent: false,
        studioPresent: false,
    });
    if (twoRows.length === 0) fails.push("self-test: a second fourier story row did NOT red");
    // (b) a useCanvas2D import.
    const canvas2d = clauseWgslPrimary({
        composable: 'import { useCanvas2D } from "x"; createGpuSubstrate setupWGPU setupGL',
    });
    if (canvas2d.length === 0) fails.push("self-test: a useCanvas2D import did NOT red");
    // (c) a WGSL-side spectrum mint.
    const wgslMint = clauseRoundTrip({
        compute:
            "fn partialSumAt(){} fn epicycleChainTip(){} re * cs - im * sn, re * sn + im * cs TAU * index * t\nfn makeEllipticSpectrum(){}",
        math: "export function partialSumAt(){} export function positionsAt(){}",
    });
    if (wgslMint.length === 0) fails.push("self-test: a WGSL-side spectrum mint did NOT red");
    // (d) a re-added variant enum.
    const variant = clauseNoVariant({ sfc: 'variant?: "hero" | "final";', index: "" });
    if (variant.length === 0) fails.push("self-test: a re-added variant enum did NOT red");
    // (e) a teal library default.
    const teal = clauseWarmIdentity({
        constants: "WARM_IDENTITY_PALETTE\nconst X = { L: 0.68, C: 0.12, h: 195 };",
        mergedView: "",
    });
    if (teal.length === 0) fails.push("self-test: a teal library default did NOT red");
    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:fourier-field",
        wave: "BC.W-VIZ-FOURIER",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_FOURIER_FIELD_ARTIFACT", "proof-fourier-field.json");
    writeGateArtifact(out, artifact);

    if (viol.length) {
        console.error("proof:fourier-field — RED");
        for (const v of viol) console.error("  ✗ " + v);
    } else {
        console.log("proof:fourier-field — GREEN (U1-U5 + the ONE math source round-trip)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("proof:fourier-field --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("  ✗ " + f);
        } else {
            console.log("proof:fourier-field --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

main();
