#!/usr/bin/env node
// BG.W-AUR-METAL-FINISH — proof:aur-metal, the metal-as-a-MEDIUM source gate.
//
// The §3.2 GOLDEN bound: metal is a MUTUALLY-EXCLUSIVE medium (uMedium 8/9), NOT a
// finish axis. The field re-lights as warm folded metal — the luma HEIGHT field (the
// structure-tensor's already-computed gradient → the surface normal) catches an
// anisotropic two-term BRDF (a brushed streak along the coherent edge-tangent × a sharp
// crest), raked by a cursor-synthesized light that reads on BOTH backends (uCursor is
// in-struct — a phantom uLightDir read would be flat on the WGSL primary). The catch is
// the ACHROMATIC-WARM anchor (never a cold chrome-blue). ZERO new taps: the tensor
// re-plumbs its gradient out through the vec4 return's .w lane (packGrad/unpackGrad).
//
// A SOURCE/STRUCTURE parse — device-free, on the local + ci tag set. The binding runtime
// π (metal FOLDS — localContrast ≥ 0.020 AND ≥ 1.5× the smooth field's, read via the
// aurora runtime capture flip; the cursor-raked WGSL delta; the no-cold-catch paint)
// rides W-REFLECT3 + the proof:ba-gestalt aurora verdict.
//
// THE FIVE FALSIFIABLE WITNESSES:
//   M1 (a) — the medium-ladder widen. AuroraMedium gains "metal"|"metal-gradient";
//        MEDIUM_ID gains metal:8/"metal-gradient":9 (kuwahara STAYS 7); the dispatch
//        ladders in BOTH shader hosts route uMedium 8/9 mutually-exclusively.
//   M2 (b) — metal FOLDS (the source that produces the fold). The tensor re-plumb
//        (vec4 + packGrad, both backends), the mediumMetal + mediumMetalGradient bodies
//        (both backends), the TWO-TERM BRDF (streak × crest — a streak-only body fails),
//        the coherence gate, the height-normal from the unpacked gradient.
//   M3 (c) — the catch-light CROSSES to WGSL. The WGSL metal body reads u.cursor (the
//        in-struct cursor) and reads NO uLightDir-equivalent (uLightDir is .frag-only —
//        0 on the WGSL struct → flat). Self-test bite: a planted uLightDir read REDs.
//   M4 (d) — the GL fence. The GLSL metal arms are guarded else-if (the smooth default
//        uMedium==0 stays the unguarded fall-through — byte-unchanged); mediumKuwahara
//        + structureTensorField STAY grep-locked in mediums.glsl.ts; no new WGSL struct
//        lane (AURORA_WGPU_UNIFORM_BYTES stays 576 — the metal knobs ride cursor.z/.w).
//   M5 (e) — the warm-catch fence. METAL_CATCH_WARM is the achromatic-warm anchor
//        (r ≥ g ≥ b, r high) in BOTH backends; no cold-hue catch. Self-test bite: a
//        cold catch literal (b > r) REDs.
//   M6 (f) — the DEMO-SURFACING anti-drift lock (the paint-judge fix). The shipped
//        metal medium (uMedium 8/9) MUST be REACHABLE in the running studio — a paint
//        judge cannot verify a medium no surface renders (the born blocker: the studio
//        Medium picker used a truncated local map that stopped at oil-pastel, so
//        Metal/Brushed-Metal were un-surfaced). Two reach paths are locked: (1) the
//        studio Medium picker SINGLE-SOURCES off the canonical mediumOptions enum (it
//        can never drift behind the shipped ladder), and (2) a deterministic
//        &aurmedium=… capture-param forces the medium so BOTH engines render it with
//        ZERO interaction (off-screen Safari has none). A named warm-folded METAL preset
//        is the baseline the picker + capture path load. Self-test bites: a truncated
//        local picker REDs · dropping the &aurmedium force REDs.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const AURORA = resolve(ROOT, "src/components/custom/aurora");

const PATHS = {
    mediums: resolve(AURORA, "constants/shaders/mediums.glsl.ts"),
    // BG.W-AUR-METAL-FINISH — the metal bodies are carved into their own sibling (the
    // no-god-module bound); the grep-lock FOLLOWS the carve (the proof:aur-kuwahara /
    // proof:composable-return-types "asserts follow the composition into the leaf" precedent).
    metalMedium: resolve(AURORA, "constants/shaders/metal-medium.glsl.ts"),
    frag: resolve(AURORA, "constants/shaders/aurora.frag.ts"),
    wgslMediums: resolve(AURORA, "constants/shaders/aurora-mediums.wgsl.ts"),
    wgsl: resolve(AURORA, "constants/shaders/aurora.wgsl.ts"),
    presets: resolve(AURORA, "constants/presets.ts"),
    bridge: resolve(AURORA, "composables/uniformBridge.ts"),
    wgpuBridge: resolve(AURORA, "composables/uniformBridgeWGPU.ts"),
    glSetup: resolve(AURORA, "composables/glSetup.ts"),
    // M6 — the demo-surfacing reach paths (the paint-judge fix). The studio picker +
    // the deterministic capture path + the named metal baseline.
    demoOptions: resolve(ROOT, "demo/stories/substrates/aurora/config/options.ts"),
    demoComposition: resolve(ROOT, "demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue"),
    demoStudio: resolve(ROOT, "demo/stories/substrates/aurora.vue"),
    demoPresets: resolve(ROOT, "demo/stories/substrates/aurora/presets.ts"),
};

const ARTIFACT = gateArtifactPath("GLASS_UI_AUR_METAL_ARTIFACT", "BG-W-AUR-METAL-FINISH");

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Extract a `<ret> <name>(...) { ... }` GLSL body (brace-balanced from the first `{`).
function extractBody(src, sig) {
    const start = src.search(sig);
    if (start < 0) return "";
    const open = src.indexOf("{", start);
    if (open < 0) return "";
    let depth = 0;
    for (let i = open; i < src.length; i++) {
        const ch = src[i];
        if (ch === "{") depth++;
        else if (ch === "}") {
            depth--;
            if (depth === 0) return src.slice(open, i + 1);
        }
    }
    return "";
}

// The pure detector — takes a file-content map, returns { violations, facts }. Re-run
// over synthetic mutations by the self-test bites (the anti-evasion floor).
function detect(f) {
    const violations = [];
    const facts = {};

    // ── M1 (a) — the medium-ladder widen ─────────────────────────────────────────
    facts.m1UnionMetal = /\|\s*"metal"/.test(f.presets);
    facts.m1UnionMetalGradient = /\|\s*"metal-gradient"/.test(f.presets);
    facts.m1MediumId8 = /\bmetal:\s*8\b/.test(f.bridge);
    facts.m1MediumId9 = /"metal-gradient":\s*9\b/.test(f.bridge);
    facts.m1KuwaharaStays7 = /\bkuwahara:\s*7\b/.test(f.bridge);
    // GLSL dispatch — mutually-exclusive guarded else-if for both ids.
    facts.m1FragDispatch8 = /uMedium\s*==\s*8\)\s*col\s*=\s*mediumMetal\b/.test(f.frag);
    facts.m1FragDispatch9 = /uMedium\s*==\s*9\)\s*col\s*=\s*mediumMetalGradient\b/.test(f.frag);
    // WGSL dispatch — both ids route to their body inside applyMedium.
    facts.m1WgslDispatch8 = /medium\s*==\s*8\)\s*\{\s*return\s+mediumMetal\s*\(/.test(f.wgslMediums);
    facts.m1WgslDispatch9 = /medium\s*==\s*9\)\s*\{\s*return\s+mediumMetalGradient\s*\(/.test(f.wgslMediums);
    if (!facts.m1UnionMetal || !facts.m1UnionMetalGradient)
        violations.push('M1 — the AuroraMedium union is missing a "metal"/"metal-gradient" member');
    if (!facts.m1MediumId8 || !facts.m1MediumId9)
        violations.push("M1 — MEDIUM_ID is missing the metal:8 / \"metal-gradient\":9 slot");
    if (!facts.m1KuwaharaStays7)
        violations.push("M1 — kuwahara:7 no longer holds its slot (the metal widen must be additive — ids 8/9)");
    if (!facts.m1FragDispatch8 || !facts.m1FragDispatch9)
        violations.push("M1 — the aurora.frag main() has no uMedium==8→mediumMetal / uMedium==9→mediumMetalGradient dispatch");
    if (!facts.m1WgslDispatch8 || !facts.m1WgslDispatch9)
        violations.push("M1 — the WGSL applyMedium has no medium==8→mediumMetal / medium==9→mediumMetalGradient dispatch (a .frag-only metal is invisible on the WGSL primary)");

    // ── M2 (b) — metal FOLDS: the source that produces the 25× local contrast ──────
    // The gradient re-plumb: structureTensorField returns vec4 packing packGrad, BOTH backends.
    facts.m2GlslTensorVec4 = /vec4\s+structureTensorField\s*\(/.test(f.mediums)
        && /return\s+vec4\(dir,\s*A,\s*packGrad\(Gx,\s*Gy\)\)/.test(f.mediums);
    facts.m2WgslTensorVec4 = /fn\s+structureTensorField\([^)]*\)\s*->\s*vec4<f32>/.test(f.wgslMediums)
        && /return\s+vec4<f32>\(dir,\s*A,\s*packGrad\(Gx,\s*Gy\)\)/.test(f.wgslMediums);
    // packGrad/unpackGrad — GLSL carved to metal-medium.glsl.ts (spliced into PRE_BRUSH
    // before structureTensorField calls packGrad); WGSL inline in aurora-mediums.wgsl.ts.
    facts.m2PackGradGlsl = /float\s+packGrad\s*\(/.test(f.metalMedium) && /vec2\s+unpackGrad\s*\(/.test(f.metalMedium);
    facts.m2PackGradWgsl = /fn\s+packGrad\s*\(/.test(f.wgslMediums) && /fn\s+unpackGrad\s*\(/.test(f.wgslMediums);
    // The metal bodies exist in BOTH backends (GLSL carved to metal-medium.glsl.ts; the
    // grep-lock follows the carve). AND the mediums module SPLICES the metal sibling so
    // the metal is reachable in the assembled FRAGMENT_SRC (a dead carve REDs).
    facts.m2GlslBodies = /vec3\s+mediumMetal\s*\(/.test(f.metalMedium) && /vec3\s+mediumMetalGradient\s*\(/.test(f.metalMedium);
    facts.m2GlslSplice = /import\s*\{[^}]*AURORA_METAL_MEDIUM_GLSL[^}]*\}\s*from/.test(f.mediums)
        && /\+\s*AURORA_METAL_MEDIUM_GLSL/.test(f.mediums)
        && /\+\s*AURORA_METAL_PACK_GLSL/.test(f.mediums);
    facts.m2WgslBodies = /fn\s+mediumMetal\s*\(/.test(f.wgslMediums) && /fn\s+mediumMetalGradient\s*\(/.test(f.wgslMediums);
    // The TWO-TERM BRDF — the metalShade core carries BOTH the anisotropic streak AND the
    // sharp crest, multiplied. A streak-only body (the self-test bite) fails here.
    const glslShade = extractBody(f.metalMedium, /vec3\s+metalShade\s*\(/);
    const wgslShade = extractBody(f.wgslMediums, /fn\s+metalShade\s*\(/);
    const twoTerm = (body) =>
        /METAL_SHININESS_ANISO/.test(body) &&
        /METAL_SHININESS_CREST/.test(body) &&
        /streak\s*\*\s*crest/.test(body);
    facts.m2GlslTwoTerm = twoTerm(glslShade);
    facts.m2WgslTwoTerm = twoTerm(wgslShade);
    // The coherence gate + the height-normal from the unpacked gradient.
    const coherence = (body) => /smoothstep\(\s*0\.0\s*,\s*METAL_COHERENCE_FLOOR\s*,\s*A\s*\)/.test(body);
    const heightNormal = (body) =>
        /unpackGrad\(\s*stf\.w\s*\)/.test(body) && /normalize\(\s*vec3[^)]*grad\s*\*/.test(body);
    facts.m2GlslCoherence = coherence(glslShade);
    facts.m2WgslCoherence = coherence(wgslShade);
    facts.m2GlslHeightNormal = heightNormal(glslShade);
    facts.m2WgslHeightNormal = heightNormal(wgslShade);
    if (!facts.m2GlslTensorVec4 || !facts.m2WgslTensorVec4)
        violations.push("M2 — structureTensorField does not re-plumb the gradient (vec4 return packing packGrad(Gx,Gy)) in BOTH backends (the ZERO-new-taps re-plumb the metal normal reads)");
    if (!facts.m2PackGradGlsl || !facts.m2PackGradWgsl)
        violations.push("M2 — packGrad/unpackGrad is absent from a backend (the gradient re-plumb the metal normal reads)");
    if (!facts.m2GlslBodies || !facts.m2WgslBodies)
        violations.push("M2 — a mediumMetal/mediumMetalGradient body is absent from a backend (metal must DUAL-PORT — a frag-only metal is invisible on the WGSL primary)");
    if (!facts.m2GlslSplice)
        violations.push("M2 — mediums.glsl.ts does not splice AURORA_METAL_MEDIUM_GLSL (the carved metal bodies must join the assembled shader — a dead carve renders no metal)");
    if (!facts.m2GlslTwoTerm || !facts.m2WgslTwoTerm)
        violations.push("M2 — the metalShade BRDF is not TWO-TERM (streak × crest — the anisotropic streak AND the sharp crest) in BOTH backends; a streak-only body does not FOLD");
    if (!facts.m2GlslCoherence || !facts.m2WgslCoherence)
        violations.push("M2 — the metalShade coherence gate (smoothstep(0, METAL_COHERENCE_FLOOR, A)) is absent from a backend (the streak must gate on the field's edge coherence)");
    if (!facts.m2GlslHeightNormal || !facts.m2WgslHeightNormal)
        violations.push("M2 — the metalShade normal is not built from the unpacked gradient (unpackGrad(stf.w) → normalize(vec3(grad*…))) in a backend");

    // ── M3 (c) — the catch-light CROSSES to WGSL ─────────────────────────────────
    // The WGSL metal body reads the IN-STRUCT cursor (u.cursor) — the light crosses.
    facts.m3WgslReadsCursor = /u\.cursor(\.xy)?/.test(wgslShade);
    // The WGSL metal body reads NO uLightDir-equivalent (uLightDir is .frag-only — 0 on
    // the WGSL struct, which would render the metal flat). A phantom read is the disease.
    facts.m3WgslNoLightDir = !/\b(uLightDir|lightDir)\b/i.test(wgslShade);
    if (!facts.m3WgslReadsCursor)
        violations.push("M3 — the WGSL metalShade body does not read the in-struct cursor (u.cursor); the cursor-synth light must cross to WGSL");
    if (!facts.m3WgslNoLightDir)
        violations.push("M3 — the WGSL metalShade body reads a uLightDir-equivalent — uLightDir is .frag-only (0 on the WGSL struct → the metal renders FLAT on the WGSL primary)");

    // ── M4 (d) — the GL fence ─────────────────────────────────────────────────────
    // The GLSL metal arms are guarded else-if (the smooth default uMedium==0 stays the
    // unguarded fall-through — byte-unchanged). A head-position `if (uMedium == 8)` would
    // break the smooth-default fall-through.
    facts.m4GlslGuarded = /else\s+if\s*\(\s*uMedium\s*==\s*8\)/.test(f.frag)
        && /else\s+if\s*\(\s*uMedium\s*==\s*9\)/.test(f.frag);
    // mediumKuwahara + structureTensorField STAY grep-locked in mediums.glsl.ts.
    facts.m4KuwaharaGrepLock = /vec3\s+mediumKuwahara\s*\(/.test(f.mediums);
    facts.m4TensorGrepLock = /vec4\s+structureTensorField\s*\(/.test(f.mediums);
    // No new WGSL struct lane — the metal knobs ride the cursor.z/.w pad (the 576-byte
    // offset lockstep is preserved; a new lane would break the parity capture).
    facts.m4WgpuBytes576 = /AURORA_WGPU_UNIFORM_BYTES\s*=\s*576\b/.test(f.wgpuBridge);
    // The metal knobs pack the FREE cursor pad lanes (cursor.z/.w), not a new lane.
    facts.m4CursorPad = /OFF\.cursor\s*\+\s*2\]\s*=\s*cfg\.metalPolish/.test(f.wgpuBridge)
        && /OFF\.cursor\s*\+\s*3\]\s*=\s*cfg\.metalHeightScale/.test(f.wgpuBridge);
    if (!facts.m4GlslGuarded)
        violations.push("M4 — the GLSL metal arms are not guarded else-if (the smooth default uMedium==0 must stay the unguarded fall-through — DEFAULT byte-unchanged)");
    if (!facts.m4KuwaharaGrepLock || !facts.m4TensorGrepLock)
        violations.push("M4 — mediumKuwahara / structureTensorField no longer grep-locked in mediums.glsl.ts (the metal body lands BESIDE them, relocating nothing)");
    if (!facts.m4WgpuBytes576)
        violations.push("M4 — AURORA_WGPU_UNIFORM_BYTES drifted off 576 (the metal knobs ride the FREE cursor.z/.w pad — ZERO new struct lanes, the offset lockstep preserved)");
    if (!facts.m4CursorPad)
        violations.push("M4 — the metal knobs do not pack the free cursor.z/.w pad lanes (uMetalPolish→cursor.z, uMetalHeightScale→cursor.w)");

    // ── M5 (e) — the warm-catch fence ────────────────────────────────────────────
    // METAL_CATCH_WARM is the achromatic-warm anchor (r ≥ g ≥ b, r high) in BOTH backends.
    const warmOK = (src, re) => {
        const m = src.match(re);
        if (!m) return { present: false, warm: false };
        const r = parseFloat(m[1]), g = parseFloat(m[2]), b = parseFloat(m[3]);
        return { present: true, warm: r >= g && g >= b && r >= 0.95 };
    };
    const glslCatch = warmOK(f.metalMedium, /METAL_CATCH_WARM\s*=\s*vec3\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/);
    const wgslCatch = warmOK(f.wgslMediums, /METAL_CATCH_WARM[^=]*=\s*vec3<f32>\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/);
    facts.m5GlslWarm = glslCatch.warm;
    facts.m5WgslWarm = wgslCatch.warm;
    if (!glslCatch.present || !wgslCatch.present)
        violations.push("M5 — METAL_CATCH_WARM is absent from a backend (the metal catch must be the achromatic-warm anchor, not a per-body literal)");
    else if (!facts.m5GlslWarm || !facts.m5WgslWarm)
        violations.push("M5 — METAL_CATCH_WARM is not the achromatic-warm anchor (r ≥ g ≥ b, r high) — a cold chrome-blue catch is forbidden (the warm-cream identity)");

    // ── M6 (f) — the DEMO-SURFACING anti-drift lock ──────────────────────────────
    // The shipped metal medium must be REACHABLE in the running studio (a paint judge
    // cannot verify a medium no surface renders). (1) The picker SINGLE-SOURCES off the
    // canonical mediumOptions enum; (2) a &aurmedium=… capture-param forces the medium
    // for zero-interaction dual-engine capture; (3) a named warm-folded METAL preset is
    // the baseline. The canonical enum itself must carry the metal members.
    facts.m6EnumMetal = /value:\s*"metal"/.test(f.demoOptions);
    facts.m6EnumMetalGradient = /value:\s*"metal-gradient"/.test(f.demoOptions);
    facts.m6PickerImportsEnum = /import\s*\{[^}]*\bmediumOptions\b[^}]*\}\s*from/.test(f.demoComposition);
    facts.m6PickerDerivesFromEnum = /mediumOptions\s*\.\s*map\s*\(/.test(f.demoComposition);
    facts.m6CaptureParam = /route\.query\.aurmedium\b/.test(f.demoStudio)
        && /studio\.config\.medium\s*=/.test(f.demoStudio);
    facts.m6MetalPreset = /\bconst\s+METAL\s*=\s*cfg\(/.test(f.demoPresets)
        && /^\s*METAL,\s*$/m.test(f.demoPresets)
        && /METAL:\s*meta\(/.test(f.demoPresets);
    if (!facts.m6EnumMetal || !facts.m6EnumMetalGradient)
        violations.push("M6 — the canonical demo mediumOptions enum (config/options.ts) is missing a metal/metal-gradient value (the single-source the studio picker reads must carry the shipped mediums)");
    if (!facts.m6PickerImportsEnum || !facts.m6PickerDerivesFromEnum)
        violations.push("M6 — AuroraCompositionSection.vue does not single-source its medium picker off the canonical mediumOptions enum (a truncated local map hides the shipped metal medium — the studio can never reach it)");
    if (!facts.m6CaptureParam)
        violations.push("M6 — substrates/aurora.vue has no &aurmedium capture-param force (the deterministic dual-engine path — off-screen Safari has zero interaction, so a picker click alone cannot render metal for capture)");
    if (!facts.m6MetalPreset)
        violations.push("M6 — the warm-folded METAL preset is absent from presets.ts / PRESETS / PRESET_META (the deterministic named baseline the picker + capture path render)");

    return { violations, facts };
}

function main() {
    const files = {
        mediums: read(PATHS.mediums),
        metalMedium: read(PATHS.metalMedium),
        frag: read(PATHS.frag),
        wgslMediums: read(PATHS.wgslMediums),
        wgsl: read(PATHS.wgsl),
        presets: read(PATHS.presets),
        bridge: read(PATHS.bridge),
        wgpuBridge: read(PATHS.wgpuBridge),
        glSetup: read(PATHS.glSetup),
        demoOptions: read(PATHS.demoOptions),
        demoComposition: read(PATHS.demoComposition),
        demoStudio: read(PATHS.demoStudio),
        demoPresets: read(PATHS.demoPresets),
    };

    const { violations, facts } = detect(files);

    // ── Self-test bites (the anti-evasion floor) — each planted regression MUST flag ──
    const bites = [];

    // Bite 1 (M3) — a planted uLightDir read in the WGSL metal body REDs.
    {
        const bad = files.wgslMediums.replace(
            /let\s+L\s*=\s*normalize\(vec3<f32>\(\(u\.cursor\.xy/,
            "let L = normalize(vec3<f32>((u.lightDir.xy",
        );
        const r = detect({ ...files, wgslMediums: bad });
        bites.push({ name: "M3 planted-uLightDir-read reds", reds: r.violations.some((v) => v.startsWith("M3")) });
    }
    // Bite 2 (M2) — a streak-only metalShade (crest term dropped) REDs.
    {
        const bad = files.metalMedium
            .replace(/float\s+crest\s*=\s*pow\(clamp\(dot\(N,\s*H\)[^;]*;/, "float crest = 1.0;")
            .replace(/float\s+spec\s*=\s*streak\s*\*\s*crest;/, "float spec = streak;");
        const r = detect({ ...files, metalMedium: bad });
        bites.push({ name: "M2 streak-only-body reds", reds: r.violations.some((v) => v.startsWith("M2")) });
    }
    // Bite 3 (M5) — a cold-blue catch literal (b > r) REDs.
    {
        const bad = files.metalMedium.replace(
            /METAL_CATCH_WARM\s*=\s*vec3\([\d.,\s]*\);/,
            "METAL_CATCH_WARM       = vec3(0.85, 0.92, 1.0);",
        );
        const r = detect({ ...files, metalMedium: bad });
        bites.push({ name: "M5 cold-catch-literal reds", reds: r.violations.some((v) => v.startsWith("M5")) });
    }
    // Bite 4 (M1) — MEDIUM_ID dropping the metal:8 slot REDs.
    {
        const bad = files.bridge.replace(/\bmetal:\s*8,/, "");
        const r = detect({ ...files, bridge: bad });
        bites.push({ name: "M1 no-metal-slot reds", reds: r.violations.some((v) => v.startsWith("M1")) });
    }
    // Bite 5 (M1) — a frag-only metal (no WGSL dispatch) REDs (the dual-port floor).
    {
        const bad = files.wgslMediums
            .replace(/if\s*\(medium\s*==\s*8\)\s*\{\s*return\s+mediumMetal\(col,\s*p,\s*t\);\s*\}/, "")
            .replace(/if\s*\(medium\s*==\s*9\)\s*\{\s*return\s+mediumMetalGradient\(col,\s*p,\s*t\);\s*\}/, "");
        const r = detect({ ...files, wgslMediums: bad });
        bites.push({ name: "M1 frag-only-metal reds", reds: r.violations.some((v) => v.startsWith("M1")) });
    }
    // Bite 6 (M6) — a truncated local medium picker (the pre-fix drift that hid metal)
    // REDs: drop the mediumOptions single-source, revert to a hardcoded partial map.
    {
        const bad = files.demoComposition
            .replace(/import\s*\{[^}]*\bmediumOptions\b[^}]*\}\s*from[^;]*;/, "")
            .replace(
                /const\s+MEDIA\s*=[\s\S]*?as\s+Record<string,\s*AuroraMedium>;/,
                'const MEDIA: Record<string, AuroraMedium> = { Smooth: "smooth" };',
            );
        const r = detect({ ...files, demoComposition: bad });
        bites.push({ name: "M6 truncated-picker reds", reds: r.violations.some((v) => v.startsWith("M6")) });
    }
    // Bite 7 (M6) — dropping the &aurmedium capture-param force REDs (off-screen Safari
    // would have no deterministic path to render metal for capture).
    {
        const bad = files.demoStudio.replace(/route\.query\.aurmedium\b/, "route.query.disabled");
        const r = detect({ ...files, demoStudio: bad });
        bites.push({ name: "M6 no-capture-param reds", reds: r.violations.some((v) => v.startsWith("M6")) });
    }

    facts.selfTest = bites;
    const biteFailures = bites.filter((b) => !b.reds).map((b) => b.name);
    for (const nm of biteFailures) {
        violations.push(`SELF-TEST — the bite "${nm}" did NOT flag (the detector cannot prove it catches the regression it forbids)`);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:aur-metal",
        facts,
        violations,
    });

    if (violations.length) {
        console.error("[proof:aur-metal] FAIL\n  - " + violations.join("\n  - "));
        process.exit(1);
    }
    console.log(
        "[proof:aur-metal] PASS — metal DUAL-PORTS as the mutually-exclusive medium (uMedium 8/9); the tensor re-plumbs its gradient (ZERO new taps); the two-term BRDF FOLDS; the cursor-synth catch crosses to WGSL (no phantom uLightDir); the smooth default + kuwahara are byte-unchanged; the warm-catch fence holds; the studio surfaces the metal medium (picker single-sourced off the canonical enum + the deterministic &aurmedium capture path + the warm-folded METAL preset)",
    );
}

main();
