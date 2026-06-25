#!/usr/bin/env node
// BC.W-GOOBLOB-MEATBALL — proof:gooblob-meatball, the goo-blob STAGE-2 gate
// (born-RED on the pre-fix tree → GREEN at close).
//
// STAGE 2 dresses the BC.W-GOOBLOB-PLAIN floor into the full lit, shadowed, meatballing
// creature. The HEADLINE is the WGSL STRUCTURAL fix: at HEAD the metaball.wgsl `fwidth(N)`
// (the Toksvig normal-variance specular clamp) sat INSIDE the `if (uLit > 0.5)` branch,
// AFTER the per-fragment `alpha < 0.001` early-return — so WGSL uniformity analysis
// rejected the module, the WGSL primary never armed on Metal, and GooBlob fell to the
// WebGL2 net forever (paint floor met, but the rich WGSL path dead). STAGE 2 HOISTS the
// surface normal + its `fwidth(N)` into UNIFORM control flow at the top of fs_main (the
// SAME level the working `fwidth(d)` AA site sits at, before the early-returns), so the
// WGSL primary COMPILES + paints the full lit creature. STAGE 2 also mints the net-new 2D
// SDF soft-shadow march (T2), wires the accel/flick-burst leg via the shared
// usePointerVelocityField (T4), and homes the full configurator + comprehensive demo (T5/T6).
//
// SOURCE PREDICATES (device-free, born-RED → GREEN; the `--source` CI arm):
//   M1 — STAGE 1 is the floor (the gating intact): the lit + shadow blocks are GATED
//        behind uLit/uShadow; with both off (variant=blob) the render is flat. A planted
//        always-lit (no gate) reds.
//   M2 — the lit-glass math is byte-preserved: the Blinn-Phong/Fresnel/Toksvig block is
//        the SOTA HEAD body, re-enabled not re-authored. A lit-math edit reds.
//   M3 — the soft-shadow march exists + is fragment-safe: softShadow2D present (≤32 steps,
//        sceneDist re-used, uLightDir); uShadow/uShadowSoftness in BOTH the WGSL struct AND
//        uniformBridgeWGPU.ts (the lockstep); no fwidth/dpdx/dpdy in a vs_main-reachable
//        helper (the dual-module trap). The KEYSTONE: the WGSL fwidth(N) is HOISTED to
//        uniform control flow (before the alpha early-return + outside the uLit branch) —
//        the structural armer. A missing uShadowSoftness in the pack table reds; an
//        in-uLit-branch fwidth(N) reds.
//   M4 — the accel/flick-burst leg consumes the shared field: useMetaballRenderer feeds
//        usePointerVelocityField tick(deltaMs) from the frame loop (no new rAF); the accel
//        term is READ (not a stub). The ≥2-consumer evidence lists aurora + goo-blob.
//   M6 — the full configurator + comprehensive demo (device-free SOURCE arm): blob.vue
//        mounts a <Configurator> with controls-on-the-RIGHT (the chassis default) driving
//        the §6 axes as live <ConfiguratorRow>s incl. the STAGE-2 Surface (lit/shadow/
//        softness); the hero header is ABOVE the card (NOT in it); no raw <input type=color>;
//        a WCAG-2.2.2 <DockBackgroundToggle> + the STAGE-1 teaching contrast present.
//
// PAINT PREDICATES (real-GPU capture, the bare `["local"]` arm):
//   M5 — the on-host LIT paint (the gate-paint-blindness close): the capture asserts
//        meanLum > 0 AND a specular highlight (a local luminance peak on the dome) AND a
//        shadow band (a sub-ambient luminance region under the silhouette) on BOTH a
//        WebGPU backend AND an adapter-less host. A STAGE-1-flat render mislabeled meatball
//        (no specular/shadow) reds; a meanLum-0 black void reds.
//
// SELF-TEST BITE (--selftest): a planted no-gate always-lit, a lit-math edit, a shared-
// helper derivative, an in-uLit-branch fwidth(N), a missing uShadowSoftness pack lane, a
// raw <input type=color>, a header-inside-card, a STAGE-1-flat-mislabeled-meatball capture,
// and a meanLum-0 capture all MUST red — born-RED proof on the green tree.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/goo-blob");
const WGSL = resolve(DIR, "shaders/metaball.wgsl.ts");
const FRAG = resolve(DIR, "shaders/metaball.frag.ts");
const UNIFORMS = resolve(DIR, "shaders/metaball-uniforms.glsl.ts");
const BRIDGE = resolve(DIR, "composables/uniformBridgeWGPU.ts");
const UPLOAD = resolve(DIR, "composables/uploadBlobUniforms.ts");
const RENDERER = resolve(DIR, "composables/useMetaballRenderer.ts");
const TYPES = resolve(DIR, "types.ts");
const DEMO = resolve(ROOT, "demo/stories/substrates/blob.vue");
const EVIDENCE = resolve(ROOT, "docs/consumer-evidence/use-pointer-velocity-field.md");
// The real-GPU paint record (the orchestrator's Metal capture; the BB gate-paint-blindness
// close). When absent OR a backend's meanLum is 0 OR no specular/shadow, the paint arm reds.
const PAINT_RECORD = resolve(
    ROOT,
    "docs/tranches/BC/audit/visual/W-GOOBLOB-MEATBALL-paint.json",
);

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const stripJsComments = (s) =>
    (s ?? "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

// ── M1: STAGE 1 is the floor (the lit + shadow blocks GATED) ──
function clauseGatingIntact(over = {}) {
    const viol = [];
    const wgsl = over.wgsl ?? read(WGSL) ?? "";

    // The morphT-gated flat-floor early-return still strips the dressing (the STAGE-1
    // floor — RE-POINTED at BD.W-GOO-CAROUSEL-DECK: `uStage > 0.5` → `uMorphT <= 0.0`;
    // re-asserted here so STAGE 2 cannot break the floor).
    if (!/if\s*\(\s*uMorphT\s*<=\s*0\.0\s*\)\s*\{/.test(wgsl))
        viol.push("M1: the uMorphT flat-floor gate is GONE (the floor un-gated)");

    // The lit block is GATED behind uLit; the shadow block GATED behind uShadow.
    if (!/if\s*\(\s*uLit\s*>\s*0\.5\s*\)\s*\{/.test(wgsl))
        viol.push("M1: the lit-glass block is not gated behind `if (uLit > 0.5)` (an always-lit monolith)");
    if (!/if\s*\(\s*uShadow\s*>\s*0\.5\s*\)\s*\{/.test(wgsl))
        viol.push("M1: the soft-shadow block is not gated behind `if (uShadow > 0.5)` (an always-shadowed monolith)");

    // The STAGE-1 branch must RETURN before the lit/shadow work (it sits before the
    // surface-normal hoist + the uLit/uShadow branches). The hoisted N is uniform-flow
    // (it must precede the uStage return too — the STAGE-1 path simply never reads it).
    // Ordering is computed on the COMMENT-STRIPPED source so a comment mention of an
    // `if (uLit > 0.5)` reference (the BB-residual prose) never confuses the index.
    const wgslCode = stripJsComments(wgsl);
    const idxStage = wgslCode.search(/if\s*\(\s*uMorphT\s*<=\s*0\.0\s*\)/);
    const idxLit = wgslCode.search(/if\s*\(\s*uLit\s*>\s*0\.5\s*\)/);
    const idxShadow = wgslCode.search(/if\s*\(\s*uShadow\s*>\s*0\.5\s*\)/);
    if (idxStage >= 0 && idxLit >= 0 && idxStage > idxLit)
        viol.push("M1: the flat-floor branch sits AFTER the lit block (the dressing is reached on the flat floor)");
    if (idxStage >= 0 && idxShadow >= 0 && idxStage > idxShadow)
        viol.push("M1: the flat-floor branch sits AFTER the shadow block (the dressing is reached on the flat floor)");

    // The STAGE-1 branch body must not reach a lit/shadow term (a planted always-lit reds).
    if (idxStage >= 0) {
        const branchBody = wgslCode.slice(
            idxStage,
            wgslCode.indexOf("\n", wgslCode.indexOf("}", idxStage)),
        );
        if (/\b(spec|rimFres|iridHue|sss|highlight|softShadow2D|shadowDarken)\b/.test(branchBody))
            viol.push("M1: the STAGE-1 branch reaches a lit/shadow term (not the flat floor)");
    }

    // The bridge flips uLit/uShadow ON for any morph in progress (morphT > 0) — the
    // RE-POINTED per-variant flip (BD.W-GOO-CAROUSEL-DECK: `isMeatball` → `isDressed`;
    // morphT resolves from config.morphT or variant for back-compat). A pure blob
    // (morphT <= 0) early-returns before the lit/shadow work.
    const bridge = over.bridge ?? read(BRIDGE) ?? "";
    if (!/const\s+isDressed\s*=\s*morphT\s*>\s*0\s*;/.test(bridge))
        viol.push("M1: the WGSL bridge does not gate uLit/uShadow on morphT > 0 (the RE-POINTED dressing flip)");
    if (!/f32\[OFF\.s2\s*\+\s*3\]\s*=\s*isDressed\s*&&\s*cSurf\.lit/.test(bridge))
        viol.push("M1: the WGSL bridge does not flip uLit on isDressed && surface.lit");
    if (!/f32\[OFF\.res\s*\+\s*2\]\s*=\s*isDressed\s*&&\s*cSurf\.shadow/.test(bridge))
        viol.push("M1: the WGSL bridge does not flip uShadow on isDressed && surface.shadow");

    return viol;
}

// ── M2: the lit-glass SOTA math is byte-preserved (re-enabled, not re-authored) ──
const LIT_MATH_VERBATIM = [
    // The energy-conserving Blinn-Phong (the (shininess+2)/8 norm + the Toksvig widen).
    "let shininess = uSpecShininess / (1.0 + 24.0 * nVar);",
    "let energyNorm = (shininess + 2.0) / 8.0;",
    "let spec = pow(max(dot(N, H), 0.0), shininess) * uSpecStrength * energyNorm;",
    // The warm-cream specular OKLCh tint (not hardcoded white).
    "let warmCream = oklabToLinearSrgb(oklchToOklab(vec3<f32>(0.97, 0.03, radians(85.0))));",
    // The Fresnel/Schlick rim + the min-contrast guard.
    "let rimFres = pow(1.0 - max(dot(N, V), 0.0), uRimPower);",
    "let lack = clamp((0.22 - dL) / 0.22, 0.0, 1.0);",
    // The highlight cap (the sub-unity warm gleam).
    "var highlight = max(warmCream * spec, rimLin * rim);\n    highlight = min(highlight, vec3<f32>(0.85));",
    // The dome normal (the analytic surface normal SOTA body).
    "let interior = clamp(-d / max(bodyR, 1e-4), 0.0, 1.0);\n  let z = sqrt(max(0.0, 1.0 - (1.0 - interior) * (1.0 - interior)));",
];
function clauseLitMathPreserved(over = {}) {
    const viol = [];
    const wgsl = over.wgsl ?? read(WGSL) ?? "";
    for (const snippet of LIT_MATH_VERBATIM) {
        if (!wgsl.includes(snippet))
            viol.push(
                `M2: the SOTA lit-glass math is NOT byte-preserved (missing verbatim "${snippet.slice(0, 40).replace(/\n/g, " ")}…")`,
            );
    }
    return viol;
}

// ── M3: the soft-shadow march + the WGSL fwidth(N) HOIST (the structural armer) + the
//        derivative-safety + the typed-struct SoT lockstep ──
function clauseShadowAndHoist(over = {}) {
    const viol = [];
    const wgsl = over.wgsl ?? read(WGSL) ?? "";
    const frag = over.frag ?? read(FRAG) ?? "";
    const uniforms = over.uniforms ?? read(UNIFORMS) ?? "";
    const bridge = over.bridge ?? read(BRIDGE) ?? "";

    // (a) the softShadow2D march exists in BOTH backends (≤32 steps, sceneDist re-used,
    //     uLightDir-driven, the IQ rmshadows penumbra).
    if (!/fn\s+softShadow2D\s*\(/.test(wgsl))
        viol.push("M3: the WGSL softShadow2D 2D march is missing (the net-new shadow close)");
    if (!/float\s+softShadow2D\s*\(/.test(frag))
        viol.push("M3: the GLSL softShadow2D 2D march is missing (the WebGL2 twin)");
    // Re-uses the SAME sceneDistG field (NOT a separate field re-eval / FBO).
    if (!/sceneDistG\(\s*ro\s*\+\s*rd\s*\*\s*t\s*\)\.x/.test(wgsl))
        viol.push("M3: the WGSL soft-shadow march does not re-use sceneDistG().x (a separate field re-eval / FBO is forbidden)");
    // The step count is a cheap 16-32 loop (NOT an unbounded march).
    const wgslSteps = wgsl.match(/for\s*\(\s*var\s+i\s*=\s*0;\s*i\s*<\s*(\d+);[^)]*\)\s*\{\s*\n\s*if\s*\(\s*t\s*>=\s*maxt\s*\)/);
    if (!wgslSteps || Number(wgslSteps[1]) > 32 || Number(wgslSteps[1]) < 16)
        viol.push("M3: the WGSL soft-shadow march step count is not the cheap 16-32 band");

    // (b) THE KEYSTONE — the WGSL Toksvig normal-derivative is HOISTED to uniform control
    //     flow: the `let nVar = length(fwidth(Nh));` declaration (Nh the uniform-flow
    //     surface normal, byte-identical inputs to the lit block's own N) sits BEFORE the
    //     `alpha < 0.001` early-return AND BEFORE the `if (uLit > 0.5)` branch. An in-branch
    //     normal-derivative (the BB residual that never armed) reds. Indices on the
    //     COMMENT-STRIPPED source so a prose mention of `if (uLit > 0.5)` (the BB-residual
    //     note) never confuses it.
    const wgslNoComments = stripJsComments(wgsl);
    const idxNvar = wgslNoComments.search(/let\s+nVar\s*=\s*length\(fwidth\(N[a-z]?\)\)\s*;/);
    const idxAlphaReturn = wgslNoComments.search(/if\s*\(\s*alpha\s*<\s*0\.001\s*\)/);
    const idxLit = wgslNoComments.search(/if\s*\(\s*uLit\s*>\s*0\.5\s*\)/);
    if (idxNvar < 0)
        viol.push("M3: the WGSL `let nVar = length(fwidth(Nh));` hoist is missing (the structural armer)");
    else {
        if (idxAlphaReturn >= 0 && idxNvar > idxAlphaReturn)
            viol.push("M3: the WGSL normal-derivative is AFTER the `alpha < 0.001` early-return (non-uniform flow — the WGSL primary will not arm)");
        if (idxLit >= 0 && idxNvar > idxLit)
            viol.push("M3: the WGSL normal-derivative is INSIDE/AFTER the `if (uLit > 0.5)` branch (non-uniform flow — the BB residual, the WGSL primary will not arm)");
    }
    // There is EXACTLY ONE live fwidth() of a surface normal in the WGSL (the hoisted Nh
    // derivative) — a second live normal-derivative (e.g. a re-introduced in-branch one) reds.
    const fwidthNCount = (wgslNoComments.match(/fwidth\(\s*N[a-z]?\s*\)/g) || []).length;
    if (fwidthNCount !== 1)
        viol.push(`M3: the WGSL has ${fwidthNCount} live fwidth(normal) call sites — it must be EXACTLY ONE (the hoisted uniform-flow Nh site)`);

    // (c) derivative-safety: every fwidth/dpdx/dpdy call sits INSIDE fs_main, never a
    //     helper a vs_main could reach (the dual-module WGSL-validation trap).
    const fnRe = /fn\s+([A-Za-z_]\w*)\s*\([^)]*\)[^{]*\{/g;
    const derivRe = /\b(fwidth|dpdx|dpdy|dpdxFine|dpdyFine|dpdxCoarse|dpdyCoarse)\s*\(/;
    let m;
    while ((m = fnRe.exec(wgslNoComments))) {
        const name = m[1];
        let depth = 1;
        let i = fnRe.lastIndex;
        for (; i < wgslNoComments.length && depth > 0; i++) {
            if (wgslNoComments[i] === "{") depth++;
            else if (wgslNoComments[i] === "}") depth--;
        }
        const body = wgslNoComments.slice(fnRe.lastIndex, i);
        if (name !== "fs_main" && derivRe.test(body))
            viol.push(
                `M3: a derivative call (fwidth/dpdx/dpdy) lives in helper fn ${name} — a vs_main-reachable helper trips the dual-module WGSL-validation trap`,
            );
    }

    // (d) the typed-struct SoT lockstep: uShadow/uShadowSoftness in the WGSL struct (the
    //     res.z/res.w lanes), the GLSL uniforms, AND the bridge pack table. A missing
    //     pack-lane write = the parity-ΔE blowout.
    if (!/let\s+uShadow\s*=\s*u\.res\.z\s*;/.test(wgsl))
        viol.push("M3: the WGSL fs_main does not read uShadow off the res.z lane");
    if (!/let\s+uShadowSoftness\s*=\s*u\.res\.w\s*;/.test(wgsl))
        viol.push("M3: the WGSL fs_main does not read uShadowSoftness off the res.w lane");
    if (!/uniform\s+float\s+uShadow\s*;/.test(uniforms))
        viol.push("M3: metaball-uniforms.glsl does not declare uShadow (the GLSL lockstep)");
    if (!/uniform\s+float\s+uShadowSoftness\s*;/.test(uniforms))
        viol.push("M3: metaball-uniforms.glsl does not declare uShadowSoftness (the GLSL lockstep)");
    if (!/f32\[OFF\.res\s*\+\s*2\]\s*=\s*isDressed\s*&&\s*cSurf\.shadow/.test(bridge))
        viol.push("M3: the WGSL bridge does not pack uShadow into the res.z lane (the SoT lockstep)");
    if (!/f32\[OFF\.res\s*\+\s*3\]\s*=\s*cSurf\.shadowSoftness\s*;/.test(bridge))
        viol.push("M3: the WGSL bridge does not pack uShadowSoftness into the res.w lane (the parity-ΔE-blowout suspect)");

    return viol;
}

// ── M4: the accel/flick-burst leg consumes the shared usePointerVelocityField ──
function clauseSharedField(over = {}) {
    const viol = [];
    const renderer = over.renderer ?? read(RENDERER) ?? "";
    const evidence = over.evidence ?? read(EVIDENCE) ?? "";

    if (!/import\s*\{\s*usePointerVelocityField\s*\}/.test(renderer))
        viol.push("M4: useMetaballRenderer does not import usePointerVelocityField (the shared viz-pointer field)");
    if (!/usePointerVelocityField\s*\(\s*\)/.test(renderer))
        viol.push("M4: useMetaballRenderer does not compose usePointerVelocityField()");
    // Fed tick(deltaMs) from the SHARED resolveFrame loop (no new rAF).
    if (!/pointerField\.tick\(/.test(renderer))
        viol.push("M4: the pointer field is not FED tick(deltaMs) from the frame loop");
    // The ACCELERATION term is READ (not a stub) — the user's velocity-AND-acceleration ask.
    if (!/pointerField\.acceleration\.value/.test(renderer))
        viol.push("M4: the acceleration term is not READ (a velocity-only stub — the accel/flick-burst leg is the field's unique contribution)");
    // No new rAF in the renderer (the one-loop / proof:offscreen-pause discipline).
    if (/requestAnimationFrame\s*\(/.test(stripJsComments(renderer)))
        viol.push("M4: useMetaballRenderer introduces a requestAnimationFrame (a second rAF — proof:offscreen-pause forbids it; the field is FED from the substrate loop)");
    // The ≥2-consumer evidence lists aurora + goo-blob.
    if (!/aurora/i.test(evidence) || !/(goo-blob|gooblob|blob)/i.test(evidence))
        viol.push("M4: the use-pointer-velocity-field consumer evidence does not list aurora + goo-blob (the ≥2-consumer bar)");

    return viol;
}

// ── M6: the full configurator + comprehensive demo (device-free SOURCE arm) ──
function clauseDemo(over = {}) {
    const viol = [];
    const demo = over.demo ?? read(DEMO) ?? "";
    const demoNoComments = stripJsComments(demo);

    // A <Configurator> shell with the §6 axes as live <ConfiguratorRow>s (NOT a two-state
    // Switch surface). The chassis places controls on the RIGHT by default (BA.W-CONFIG-CHASSIS).
    if (!/<Configurator[\s>]/.test(demo))
        viol.push("M6: blob.vue does not mount a <Configurator> (the studio shell)");
    if (!/<ConfiguratorLayer\b/.test(demo) || !/<ConfiguratorRow\b/.test(demo))
        viol.push("M6: blob.vue does not drive §6 axes as <ConfiguratorLayer>/<ConfiguratorRow> (the live-row surface, NOT a two-state Switch)");
    // The STAGE-2 Surface section (lit/shadow/softness) is surfaced live.
    if (!/Surface \(STAGE 2\)/.test(demo) && !/studio\.config\.shadow/.test(demo))
        viol.push("M6: blob.vue does not surface the STAGE-2 Surface section (the lit/shadow/softness axes)");
    if (!/studio\.config\.shadowSoftness/.test(demo))
        viol.push("M6: blob.vue does not surface the shadow-softness live slider");

    // The hero header is ABOVE the card (NOT IN it — the §E "TWO headers IN the card" fix):
    // a <header> sits BEFORE the <StorySection>/<ShowcaseFrame>/<Configurator> card.
    const idxHeader = demo.search(/<header\b/);
    const idxCard = demo.search(/<StorySection\b/);
    if (idxHeader < 0)
        viol.push("M6: blob.vue has no <header> (the hero header above the card — the §E fix)");
    else if (idxCard >= 0 && idxHeader > idxCard)
        viol.push("M6: the hero <header> sits AFTER/inside the card (the §E 'TWO headers IN the card' defect — headers must be ON TOP)");

    // No raw <input type=color> slab (the base color picker is <ColorSwatch>/WatercolorDot —
    // never a raw color input slab; the BA.W-CONFIG-CHASSIS register).
    if (/<input[^>]*type\s*=\s*["']color["']/.test(demoNoComments))
        viol.push("M6: blob.vue uses a raw <input type=color> slab (the BA.W-CONFIG-CHASSIS register forbids it — use <ColorSwatch>)");

    // The WCAG-2.2.2 pause control + the STAGE-1 teaching contrast present.
    if (!/<DockBackgroundToggle\b/.test(demo))
        viol.push("M6: blob.vue has no <DockBackgroundToggle> (the WCAG-2.2.2 pause control)");
    if (!/variant\s*=\s*["']blob["']/.test(demo))
        viol.push("M6: blob.vue has no variant=\"blob\" STAGE-1 teaching contrast (the staged-build proof)");

    return viol;
}

// ── M5: the real-GPU LIT paint arm (the BB gate-paint-blindness close) ──
// Reads the orchestrator's Metal capture. NEVER a "the file exists" green — the record
// must carry meanLum > 0 AND a specular highlight AND a shadow band on BOTH backends. A
// STAGE-1-flat render mislabeled meatball (no specular/shadow) reds.
function clausePaint(over = {}) {
    const viol = [];
    const raw = over.paint !== undefined ? over.paint : read(PAINT_RECORD);
    if (raw == null) {
        viol.push(
            "M5: the real-GPU LIT paint record (W-GOOBLOB-MEATBALL-paint.json) is ABSENT — the orchestrator's Metal capture is the binding paint floor (pending-orchestrator-capture)",
        );
        return viol;
    }
    let rec = null;
    try {
        rec = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (e) {
        viol.push(`M5: the paint record is not valid JSON — ${e.message}`);
        return viol;
    }
    const backends = rec.backends ?? {};
    const webgpu = backends.webgpu ?? backends["webgpu-primary"];
    const adapterless = backends.adapterless ?? backends["webgl2-fallback"];
    for (const [label, b] of [
        ["webgpu", webgpu],
        ["adapter-less", adapterless],
    ]) {
        if (!b) {
            viol.push(`M5: the paint record has no ${label} backend capture (both hosts must paint the LIT creature)`);
            continue;
        }
        if (typeof b.meanLum !== "number" || !(b.meanLum > 0))
            viol.push(`M5: the ${label} backend meanLum is not > 0 (the black-void render)`);
        // The specular highlight — a local luminance peak on the dome (≥1.3× the body mean).
        if (typeof b.specularPeakRatio !== "number" || !(b.specularPeakRatio >= 1.3))
            viol.push(`M5: the ${label} backend has no specular highlight (specularPeakRatio < 1.3 — the lit dressing did not paint; a STAGE-1-flat render mislabeled meatball)`);
        // The shadow band — a sub-ambient luminance region under the silhouette.
        if (b.shadowBandPresent !== true)
            viol.push(`M5: the ${label} backend has no shadow band (shadowBandPresent !== true — the soft-shadow march did not paint)`);
    }
    return viol;
}

function runSource(over = {}) {
    return [
        ...clauseGatingIntact(over),
        ...clauseLitMathPreserved(over),
        ...clauseShadowAndHoist(over),
        ...clauseSharedField(over),
        ...clauseDemo(over),
    ];
}
function runAll(over = {}) {
    return [...runSource(over), ...clausePaint(over)];
}

// ── Self-test bite ──
function selfTest() {
    const fails = [];
    const wgsl = read(WGSL) ?? "";
    const bridge = read(BRIDGE) ?? "";
    const demo = read(DEMO) ?? "";

    // (a) a no-gate always-lit STAGE-1 — plant a spec term inside the uStage branch.
    const alwaysLit = clauseGatingIntact({
        wgsl: wgsl.replace(
            "let okl1 = gamutClampOklch(oklch);",
            "let spec = 1.0;\n    let okl1 = gamutClampOklch(oklch);",
        ),
    });
    if (alwaysLit.length === 0) fails.push("self-test: an always-lit STAGE-1 branch did NOT red (M1)");

    // (b) a lit-math edit — corrupt the energy-norm.
    const mathEdit = clauseLitMathPreserved({
        wgsl: wgsl.replace("let energyNorm = (shininess + 2.0) / 8.0;", "let energyNorm = (shininess + 2.0) / 7.0;"),
    });
    if (mathEdit.length === 0) fails.push("self-test: a lit-math edit did NOT red (M2)");

    // (c) the IN-BRANCH normal-derivative (the BB residual) — move the hoisted nVar back
    //     inside the uLit branch (the exact non-uniform-flow defect that never armed).
    const inBranch = clauseShadowAndHoist({
        wgsl: wgsl
            .replace("  let nVar = length(fwidth(Nh));\n", "")
            .replace(
                "    let shininess = uSpecShininess / (1.0 + 24.0 * nVar);",
                "    let nVar = length(fwidth(N));\n    let shininess = uSpecShininess / (1.0 + 24.0 * nVar);",
            ),
    });
    if (inBranch.length === 0) fails.push("self-test: an in-uLit-branch normal-derivative did NOT red (M3 — the WGSL-won't-arm residual)");

    // (d) a shared-helper derivative call — plant fwidth() in a helper fn.
    const helperDeriv = clauseShadowAndHoist({
        wgsl: wgsl.replace(
            "fn breath(phase: f32) -> f32 {",
            "fn breath(phase: f32) -> f32 {\n  let bad = fwidth(phase);",
        ),
    });
    if (helperDeriv.length === 0)
        fails.push("self-test: a shared-helper fwidth() did NOT red (M3 dual-module trap)");

    // (e) a missing uShadowSoftness pack lane MUST red (the parity-ΔE blowout).
    const missingLane = clauseShadowAndHoist({
        bridge: bridge.replace(/f32\[OFF\.res \+ 3\] = cSurf\.shadowSoftness;/, "f32[OFF.res + 3] = 0;"),
    });
    if (missingLane.length === 0) fails.push("self-test: a missing uShadowSoftness pack lane did NOT red (M3 SoT lockstep)");

    // (f) a raw <input type=color> in the demo MUST red.
    const rawColor = clauseDemo({
        demo: demo.replace("</template>", '<input type="color" />\n</template>'),
    });
    if (rawColor.length === 0) fails.push("self-test: a raw <input type=color> did NOT red (M6)");

    // (g) a STAGE-1-flat render mislabeled meatball MUST red (M5 — no specular/shadow).
    const flatMislabel = clausePaint({
        paint: JSON.stringify({
            backends: {
                webgpu: { meanLum: 0.4, specularPeakRatio: 1.0, shadowBandPresent: false },
                adapterless: { meanLum: 0.4, specularPeakRatio: 1.5, shadowBandPresent: true },
            },
        }),
    });
    if (flatMislabel.length === 0) fails.push("self-test: a STAGE-1-flat mislabeled-meatball capture did NOT red (M5)");

    // (h) a meanLum-0 black-void capture MUST red.
    const blackVoid = clausePaint({
        paint: JSON.stringify({
            backends: {
                webgpu: { meanLum: 0, specularPeakRatio: 1.5, shadowBandPresent: true },
                adapterless: { meanLum: 0.4, specularPeakRatio: 1.5, shadowBandPresent: true },
            },
        }),
    });
    if (blackVoid.length === 0) fails.push("self-test: a meanLum-0 capture did NOT red (M5)");

    // (i) a clean synthetic LIT capture (both paint, specular + shadow) must PASS the paint arm.
    const clean = clausePaint({
        paint: JSON.stringify({
            backends: {
                webgpu: { meanLum: 0.42, specularPeakRatio: 1.6, shadowBandPresent: true },
                adapterless: { meanLum: 0.39, specularPeakRatio: 1.5, shadowBandPresent: true },
            },
        }),
    });
    if (clean.length !== 0)
        fails.push("self-test: a clean synthetic LIT capture FAILED the paint arm (false-RED)");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const sourceOnly = process.argv.includes("--source");
    const viol = sourceOnly ? runSource() : runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:gooblob-meatball",
        wave: "BC.W-GOOBLOB-MEATBALL",
        arm: sourceOnly ? "source" : "full",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_GOOBLOB_MEATBALL_ARTIFACT", "proof-gooblob-meatball.json");
    writeGateArtifact(out, artifact);

    if (viol.length) {
        console.error(`proof:gooblob-meatball (${artifact.arm}) — RED`);
        for (const v of viol) console.error("  ✗ " + v);
    } else {
        console.log(`proof:gooblob-meatball (${artifact.arm}) — GREEN`);
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("proof:gooblob-meatball --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("  ✗ " + f);
        } else {
            console.log("proof:gooblob-meatball --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

main();
