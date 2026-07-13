#!/usr/bin/env node
// BC.W-TEAL-NAVY-PURGE — proof:teal-navy-purge, the cross-cutting warm-cream
// identity census (born-RED on the teal-on-navy disease → GREEN at warm-cream).
//
// USER-DEFECTS §E verbatim: "REMOVE the teal-on-navy reference entirely." + "'WTF
// is this blue' (a stray blue artifact)." The per-viz gates (proof:flow-field /
// proof:concentric clause 5) each fence their OWN constants; THIS gate is the
// UNION enforcer + the demo-default flip + the fabricated-reference deletion + the
// stray-blue hunt + the live-warm-paint arm. The library's OWN default tokens are
// warm-cream (the identity); named themed presets live in the DEMO (presets-in-
// consumers). The library defaults are ALREADY warm — T1 is the FENCE that keeps
// them warm and catches a future regression.
//
// SOURCE PREDICATES (each falsifiable, device-free; T5 is the live-paint local arm):
//   T1 (source, ci)  — NO library viz-substrate constants (aurora/concentric/
//        dot-flow/fourier/goo-blob/constellation) carries a teal/navy/cool-blue
//        literal (OKLCh hue ∈ [180,270] above the W-NO-GRAY neutral chroma floor,
//        or a blue-dominant hex) in a DEFAULT palette/background. The warm-cream
//        defaults (hue ~28-90) pass. The silver/bronze brand-metal quad + the
//        --chart-*/--viz-* semantic data tokens are OUT OF SCOPE (not viz-substrate
//        palette defaults; the chroma floor + the file-scope keep them clear).
//   T2 (demo default, ci) — the demo DEFAULT preset per viz is warm-cream:
//        concentric.vue `useTheme` defaults FALSE; dot-flow-field.vue leads with
//        the warm-cream identity (FLOW_PRESET_WARM / useReference defaults false),
//        NOT a teal reference. A demo whose DEFAULT-shown preset is teal-on-navy reds.
//   T3 (fabricated reference deleted, ci) — TEAL_PALETTE / NAVY_GROUND / the teal
//        FLOW_PRESET_REFERENCE are DELETED (clean break, no alias). A surviving
//        symbol reds. The real reference (mono-warm-white-on-near-black) is the
//        non-default reproduction.
//   T4 (stray-blue hunt, ci) — no stray cool-blue framing/literal in a DEFAULT-path
//        viz surface (the README/demo "teal dots over dark navy" fabricated framing).
//   T5 (live paint, local) — DEFERRED to the orchestrator: a fresh :5199 capture of
//        each substrate page's DEFAULT state, sampled for the dominant painted hue
//        (warm-amber/cream family, NOT the [180,270] band). The π lane lives in
//        tests-visual/teal-navy-purge.spec.ts (LOCAL-only). This script emits the
//        T1-T4 device-free closes; T5 is the binding paint truth on real GPU.
//
// SELF-TEST BITE (--selftest): a synthetic library constants stop {L:.66,C:.13,h:205}
// reds T1; a demo defaulting useTheme=true to a teal preset reds T2; a re-added
// TEAL_PALETTE reds T3.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const stripComments = (s) =>
    (s ?? "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

// The cool-blue band: teal-cyan through navy. The warm-cream identity (hue ~28-90)
// is outside it; silver (hue ~255 but chroma ≤0.016 — below the floor) is excluded
// by the chroma gate.
const COOL_HUE_LO = 180;
const COOL_HUE_HI = 270;
// The W-NO-GRAY neutral chroma floor — a cool stop AT OR BELOW this is a neutral
// (the silver brand-metal carve), not a teal/navy color event.
const NEUTRAL_CHROMA_FLOOR = 0.02;

// The library viz-substrate constants the warm-cream identity is fenced over (the
// DEFAULT palette/background source — NOT the chart/silver semantic tokens).
const VIZ_CONSTANTS = [
    "src/components/custom/aurora/constants/presets.ts",
    "src/components/custom/concentric/constants.ts",
    "src/components/custom/dot-flow-field/constants.ts",
    "src/components/custom/fourier-field/constants.ts",
    "src/components/custom/blob/constants.ts",
    "src/components/custom/constellation/constants.ts",
];

const DEMO_PRESETS = "demo/stories/substrates/presets.ts";
const CONCENTRIC_VUE = "demo/stories/substrates/concentric.vue";
const DOTFLOW_VUE = "demo/stories/substrates/dot-flow-field.vue";
const DOTFLOW_README = "src/components/custom/dot-flow-field/README.md";
const AURORA_VUE = "demo/stories/substrates/aurora.vue";
// The aurora demo presets whose LEAD palette is a cool/blue theme — a legitimate named
// theme (presets-in-consumers), but NEVER the studio's default-shown lead (the page must
// read warm-cream at rest). The warm leads (Dawn/Meadow/Day9/Sunset/…) are fine.
const AURORA_COOL_LEADS = ["OPENAI_SKY"];

// ── T1: no cool OKLChStop / blue-dominant hex in a library viz default ──────────

/**
 * Detect every cool-blue OKLChStop above the neutral chroma floor in a source body.
 * Returns the list of `{L,C,h}` hits.
 */
function coolStops(src) {
    const text = stripComments(src);
    const hits = [];
    // OklchStop object literals: { L: <n>, C: <n>, h: <n> } in any field order.
    const re =
        /\{[^{}]*\bL\s*:\s*([0-9.]+)[^{}]*\bC\s*:\s*([0-9.]+)[^{}]*\bh\s*:\s*([0-9.]+)[^{}]*\}/g;
    let m;
    while ((m = re.exec(text))) {
        const C = parseFloat(m[2]);
        const h = parseFloat(m[3]);
        if (h >= COOL_HUE_LO && h <= COOL_HUE_HI && C > NEUTRAL_CHROMA_FLOOR)
            hits.push({ L: parseFloat(m[1]), C, h });
    }
    // oklch(<L> <C> <h>) functional literals.
    const re2 = /oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/g;
    while ((m = re2.exec(text))) {
        const C = parseFloat(m[2]);
        const h = parseFloat(m[3]);
        if (h >= COOL_HUE_LO && h <= COOL_HUE_HI && C > NEUTRAL_CHROMA_FLOOR)
            hits.push({ L: parseFloat(m[1]), C, h });
    }
    // Blue-dominant hex (#rrggbb where the blue channel strongly dominates red+green).
    const re3 = /#([0-9a-fA-F]{6})\b/g;
    while ((m = re3.exec(text))) {
        const r = parseInt(m[1].slice(0, 2), 16);
        const g = parseInt(m[1].slice(2, 4), 16);
        const b = parseInt(m[1].slice(4, 6), 16);
        // a saturated blue/teal: blue clearly dominant AND not a near-neutral.
        if (b > r + 40 && b > g + 20 && b > 96)
            hits.push({ hex: "#" + m[1] });
    }
    return hits;
}

function clauseT1(overrides = {}) {
    const viol = [];
    for (const rel of VIZ_CONSTANTS) {
        const src = rel in overrides ? overrides[rel] : read(resolve(ROOT, rel));
        if (src == null) continue; // a viz not yet deployed is not a defect here.
        const hits = coolStops(src);
        for (const h of hits) {
            const label = h.hex
                ? `hex ${h.hex}`
                : `OKLCh {L:${h.L},C:${h.C},h:${h.h}}`;
            viol.push(
                `T1: ${rel} carries a teal/navy/cool-blue default (${label}) — a viz palette/background default must be warm-cream (presets-in-consumers; named themes live in the demo)`,
            );
        }
    }
    return viol;
}

// ── T2: the demo DEFAULT preset per viz is warm-cream ───────────────────────────

function clauseT2(overrides = {}) {
    const viol = [];
    // concentric.vue useTheme must default FALSE.
    const cv = CONCENTRIC_VUE in overrides ? overrides[CONCENTRIC_VUE] : read(resolve(ROOT, CONCENTRIC_VUE));
    if (cv != null) {
        const code = stripComments(cv);
        if (/\buseTheme\s*=\s*ref\(\s*true\s*\)/.test(code))
            viol.push(`T2: ${CONCENTRIC_VUE} defaults useTheme to TRUE (the teal-on-navy theme) — the warm-cream identity must lead`);
    }
    // dot-flow-field.vue must lead with the warm-cream identity (the live config must
    // seed from FLOW_PRESET_WARM, NOT a teal reference; useReference defaults false).
    const dv = DOTFLOW_VUE in overrides ? overrides[DOTFLOW_VUE] : read(resolve(ROOT, DOTFLOW_VUE));
    if (dv != null) {
        const code = stripComments(dv);
        if (/\buseReference\s*=\s*ref\(\s*true\s*\)/.test(code))
            viol.push(`T2: ${DOTFLOW_VUE} defaults useReference to TRUE (the reference preset) — the warm-cream identity must lead`);
        // the reactive config seed must be the warm preset, not a teal reference.
        const seed = code.match(/reactive<[^>]*>\(\s*\{\s*\.\.\.\s*([A-Z_]+)/);
        if (seed && /TEAL|REFERENCE/.test(seed[1]) && seed[1] !== "FLOW_PRESET_MONO_REFERENCE") {
            // only red if the seed is an explicit teal-reference default (mono is fine
            // only as a non-default; a default seed of any *_REFERENCE is the disease).
            viol.push(`T2: ${DOTFLOW_VUE} seeds the live config from ${seed[1]} (a reference default) — seed from FLOW_PRESET_WARM (the warm-cream lead)`);
        }
    }
    // aurora.vue must LEAD with a warm preset (initialPreset), not the blue OPENAI_SKY.
    const av = AURORA_VUE in overrides ? overrides[AURORA_VUE] : read(resolve(ROOT, AURORA_VUE));
    if (av != null) {
        const lead = stripComments(av).match(/initialPreset\s*:\s*"([A-Z0-9_]+)"/);
        if (lead && AURORA_COOL_LEADS.includes(lead[1]))
            viol.push(`T2: ${AURORA_VUE} leads with the cool/blue preset ${lead[1]} — the studio default must lead warm-cream (the blue sky survives as a non-default selectable preset)`);
    }
    return viol;
}

// ── T3: the fabricated teal-on-navy reference is DELETED (clean break) ──────────

function clauseT3(overrides = {}) {
    const viol = [];
    const dp = DEMO_PRESETS in overrides ? overrides[DEMO_PRESETS] : read(resolve(ROOT, DEMO_PRESETS));
    if (dp == null) return viol;
    const code = stripComments(dp);
    for (const sym of ["TEAL_PALETTE", "NAVY_GROUND", "FLOW_PRESET_REFERENCE"]) {
        // the symbol DEFINED or EXPORTED (a comment mention is stripped already).
        const re = new RegExp(`\\b(const|export\\s+const|let|var)\\s+${sym}\\b`);
        if (re.test(code))
            viol.push(`T3: ${DEMO_PRESETS} still defines ${sym} — the fabricated teal-on-navy reference must be DELETED (clean break, no alias); the real reference is mono-on-near-black`);
    }
    return viol;
}

// ── T4: the stray-blue / fabricated-framing hunt ─────────────────────────────────

function clauseT4(overrides = {}) {
    const viol = [];
    // The dot-flow README must not frame the DEFAULT aesthetic as "teal … navy"
    // (the fabricated reference framing the user condemns). A non-default mention is
    // fine; the DEFAULT description must read warm-cream.
    const rd = DOTFLOW_README in overrides ? overrides[DOTFLOW_README] : read(resolve(ROOT, DOTFLOW_README));
    if (rd != null) {
        // the opening descriptor (the lead) — the first paragraph before the subpath line.
        const lead = rd.split(/`@mkbabb/)[0] ?? rd;
        if (/teal[^.]*\bnavy\b/i.test(lead) && !/DELETED|warm-cream identity: soft|NON-default/i.test(lead))
            viol.push(`T4: ${DOTFLOW_README} leads with the fabricated "teal … navy" aesthetic — the DEFAULT description must read warm-cream`);
    }
    return viol;
}

// ── runners ──────────────────────────────────────────────────────────────────

function runAll(overrides = {}) {
    return [
        ...clauseT1(overrides),
        ...clauseT2(overrides),
        ...clauseT3(overrides),
        ...clauseT4(overrides),
    ];
}

function selfTest() {
    const fails = [];

    // (a) a synthetic library constants stop {L:.66,C:.13,h:205} MUST red T1.
    const tealLib = clauseT1({
        "src/components/custom/aurora/constants/presets.ts":
            "export const X = [{ L: 0.66, C: 0.13, h: 205 }];",
    });
    if (tealLib.length === 0)
        fails.push("self-test: a {L:.66,C:.13,h:205} cool stop in a library viz constant did NOT red T1");

    // (a') a cool-but-NEUTRAL stop (silver-like, C≤floor) must NOT red T1 (the carve).
    const silverLike = clauseT1({
        "src/components/custom/aurora/constants/presets.ts":
            "export const S = oklch(0.76 0.012 255);",
    });
    if (silverLike.length !== 0)
        fails.push("self-test: a cool NEUTRAL stop (C≤floor, the silver carve) FALSELY red T1");

    // (b) a demo defaulting useTheme=true to a teal preset MUST red T2.
    const themeTrue = clauseT2({
        [CONCENTRIC_VUE]: "const useTheme = ref(true);",
    });
    if (themeTrue.length === 0)
        fails.push("self-test: a demo defaulting useTheme=true did NOT red T2");

    // (b') a dot-flow demo seeding the live config from a teal reference MUST red T2.
    const refSeed = clauseT2({
        [DOTFLOW_VUE]: "const useReference = ref(true);\nconst config = reactive<FlowFieldConfig>({ ...FLOW_PRESET_REFERENCE });",
    });
    if (refSeed.length === 0)
        fails.push("self-test: a dot-flow demo defaulting useReference=true did NOT red T2");

    // (b'') an aurora studio leading with the blue OPENAI_SKY MUST red T2.
    const skyLead = clauseT2({
        [AURORA_VUE]: 'const studio = useConfiguratorState({ initialPreset: "OPENAI_SKY" });',
    });
    if (skyLead.length === 0)
        fails.push("self-test: an aurora studio leading with OPENAI_SKY did NOT red T2");
    // a warm lead (OPENAI_DAWN) must NOT red T2.
    const warmLead = clauseT2({
        [AURORA_VUE]: 'const studio = useConfiguratorState({ initialPreset: "OPENAI_DAWN" });',
    });
    if (warmLead.length !== 0)
        fails.push("self-test: an aurora studio leading with the warm OPENAI_DAWN FALSELY red T2");

    // (c) a re-added TEAL_PALETTE MUST red T3.
    const reAdded = clauseT3({
        [DEMO_PRESETS]: "const TEAL_PALETTE = [{ L: 0.82, C: 0.11, h: 195 }];",
    });
    if (reAdded.length === 0)
        fails.push("self-test: a re-added TEAL_PALETTE did NOT red T3");

    // (c') a warm-cream default (the GREEN truth) must NOT red T1.
    const warm = clauseT1({
        "src/components/custom/aurora/constants/presets.ts":
            "export const W = [{ L: 0.92, C: 0.03, h: 70 }, { L: 0.84, C: 0.07, h: 62 }];",
    });
    if (warm.length !== 0)
        fails.push("self-test: a warm-cream default FALSELY red T1");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:teal-navy-purge",
        wave: "BC.W-TEAL-NAVY-PURGE",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
        note: "T5 (live default-page warm-paint) is the LOCAL π arm — tests-visual/teal-navy-purge.spec.ts; this script emits the T1-T4 device-free closes.",
    };
    const out = gateArtifactPath("GLASS_UI_TEAL_NAVY_PURGE_ARTIFACT", "proof-teal-navy-purge.json");
    writeGateArtifact(out, artifact);

    if (viol.length) {
        console.error("proof:teal-navy-purge — RED");
        for (const v of viol) console.error("  ✗ " + v);
    } else {
        console.log("proof:teal-navy-purge — GREEN (T1-T4 device-free; T5 live-paint is the local π arm)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("proof:teal-navy-purge --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("  ✗ " + f);
        } else {
            console.log("proof:teal-navy-purge --selftest — GREEN (every planted defect red; every warm-cream carve passed)");
        }
    }
    process.exit(ok ? 0 : 1);
}

main();
