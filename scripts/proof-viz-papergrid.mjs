#!/usr/bin/env node
// BG.W-GRID-AFFINE — proof:viz-papergrid, the liquid-grid per-viz grid SOURCE gate.
//
// REWRITTEN (not de-registered — the BG.W-VIZ-SUBSTRATE-DELETE discipline) from the BC
// per-cell-twist shape onto the F9.R4 affine law. Two things land in this gate:
//
//   A1 — THE AFFINE PERTURBATION LAW. The ripple warps the GRID COORDINATE with a SMOOTH
//        LOW-ORDER field (`waveFlow`, the shared `waveField` leaf — the SAME warp concentric
//        reads), locally affine at the cell scale so MAJOR gridlines BOW/SHEAR as ONE coherent
//        transformation of the sheet — a domain transform BEFORE grid evaluation, NO new
//        pass/buffer, NEVER a per-pixel/per-cell displacement. The retired per-cell `cellTwist`
//        (which twisted each box about its own center → a kinked crest-band) is GONE from the
//        liquid-grid shaders' CALLS; a re-introduced `cellTwist(` call in a liquid-grid shader
//        REDs (the "the lines shimmer with noise" regression bite).
//   A3 — THE RENAME (clean break, no alias — BA inv-7). /paper-grid → /liquid-grid,
//        PaperGrid → LiquidGrid, route /substrates/liquid-grid. The old paper-grid VIZ dir +
//        subpath are DEFINITION-ABSENT; no `PaperGrid`/`usePaperGrid`/`PaperGridConfig`/
//        `/paper-grid` viz alias export survives. The homonym dies on the VIZ side ONLY: the
//        STATIC `.paper-grid` card register (cards.css) + `--paper-grid-texture` (scale-paper.css)
//        are BYTE-UNTOUCHED (P7 — the static-register-survives fence).
//
// This gate is the DEVICE-FREE SOURCE arm (tagged ["local","ci","release"]). The LIVE-GPU gestalt
// paint (a single MAJOR gridline bowing as ONE smooth continuous curve, cells near-parallelogram,
// AA crisp at every DPR, both modes + WebKit) rides the orchestrator's real-Metal capture
// (tests-visual/liquid-grid.spec.ts + the DELTA), NOT this device-free gate — the cardinal split.
//
// FALSIFIABLE SOURCE WITNESSES (each born-RED on the pre-rename/pre-affine tree):
//
//   P1 — EXISTS ONCE on /liquid-grid + colocation + publication + the RENAME clean-break. The
//        colocation dir carries the SFC + useLiquidGrid + liquidGrid.ts + shaders/{liquid-grid.wgsl,
//        liquid-grid.glsl}.ts + uniformBridgeWGPU.ts + constants.ts + index.ts + README.md;
//        src/subpaths/liquid-grid.ts re-exports; /api gains LiquidGridConfig. The old paper-grid
//        VIZ dir + subpath are ABSENT; the index carries NO PaperGrid* alias export (clean break).
//   P2 — COMPOSES the substrate + the math is ONE source (createGpuSubstrate, no own rAF).
//   P3 — ONE math source round-trips JS↔WGSL↔GLSL (potentialFBM/waveFlow/cursorSwirl/gridCoverage/
//        sampleLiquidGrid; the retired cellTwist/curlWarp/cursorBulge CALLS are GONE from the JS).
//   P4 — THE AFFINE LAW: the warp IS the SMOOTH `waveFlow` (curlFBM-driven), evenly-spaced +
//        Golus-AA. The liquid-grid shaders INVOKE waveFlow and do NOT invoke cellTwist (the
//        per-cell-wobble bite); the spliced waveField leaf's warp calls curlFBM (divergence-free).
//   P5 — warm-cream identity default, no teal/navy in the LIBRARY constants.
//   P6 — the configurator + the demo + the suffusion register + the /substrates/liquid-grid route.
//   P7 — THE HOMONYM FENCE: the STATIC `.paper-grid` register (cards.css) + `--paper-grid-texture`
//        (scale-paper.css) survive BYTE-UNTOUCHED (the rename kills the VIZ homonym only).
//
// + a self-test bite per clause (each planted defect REDs its clause).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/liquid-grid");
const OLD_DIR = resolve(ROOT, "src/components/custom/paper-grid");
const SUBPATH = resolve(ROOT, "src/subpaths/liquid-grid.ts");
const OLD_SUBPATH = resolve(ROOT, "src/subpaths/paper-grid.ts");
const API = resolve(ROOT, "src/api/index.ts");
const FLOW_WGSL = resolve(ROOT, "src/composables/glass/webgl/shaders/flow.wgsl.ts");
const FLOW_GLSL = resolve(ROOT, "src/composables/glass/webgl/shaders/flow.glsl.ts");
const WAVE_WGSL = resolve(ROOT, "src/composables/glass/wave/waveField.wgsl.ts");
const WAVE_GLSL = resolve(ROOT, "src/composables/glass/wave/waveField.glsl.ts");
const WAVE_JS = resolve(ROOT, "src/composables/glass/wave/waveField.ts");
const DEMO = resolve(ROOT, "demo/stories/substrates/liquid-grid.vue");
const AURORA_HERO = resolve(ROOT, "demo/stories/aurora-hero.ts");
const STORY_HERO = resolve(ROOT, "demo/stories/StoryHero.vue");
const MANIFEST = resolve(ROOT, "demo/stories/manifest.ts");
const CARDS_CSS = resolve(ROOT, "src/styles/cards.css");
const SCALE_PAPER_CSS = resolve(ROOT, "src/styles/tokens/scale-paper.css");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

/** URL-safe comment strip — `(^|[^:])//` keeps a `://` in a URL intact. */
function stripComments(src) {
    return (src ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// ── P1: exists once + colocation + publication + the RENAME clean-break ────────────
function clauseExists(over) {
    const viol = [];
    const files = [
        ["LiquidGrid.vue", resolve(DIR, "LiquidGrid.vue")],
        ["composables/useLiquidGrid.ts", resolve(DIR, "composables/useLiquidGrid.ts")],
        ["composables/liquidGrid.ts", resolve(DIR, "composables/liquidGrid.ts")],
        ["composables/uniformBridgeWGPU.ts", resolve(DIR, "composables/uniformBridgeWGPU.ts")],
        ["shaders/liquid-grid.wgsl.ts", resolve(DIR, "shaders/liquid-grid.wgsl.ts")],
        ["shaders/liquid-grid.glsl.ts", resolve(DIR, "shaders/liquid-grid.glsl.ts")],
        ["constants.ts", resolve(DIR, "constants.ts")],
        ["index.ts", resolve(DIR, "index.ts")],
        ["README.md", resolve(DIR, "README.md")],
    ];
    for (const [label, p] of files) {
        if (!existsSync(p))
            viol.push(`P1 exists: ${label} is missing from the colocation dir (liquid-grid)`);
    }
    const subpath = over?.subpath ?? read(SUBPATH);
    if (!subpath || !/export \* from "\.\.\/components\/custom\/liquid-grid"/.test(subpath))
        viol.push(
            "P1 publication: src/subpaths/liquid-grid.ts does not re-export the package (the /liquid-grid subpath barrel is missing)",
        );
    const api = over?.api ?? read(API);
    if (!api || !/LiquidGridConfig/.test(api))
        viol.push("P1 publication: /api does not export the LiquidGridConfig discovery type");

    // The RENAME clean-break (no alias — BA inv-7). The old paper-grid VIZ dir + subpath are ABSENT.
    const oldDirPresent = over?.oldDirPresent ?? existsSync(OLD_DIR);
    if (oldDirPresent)
        viol.push(
            "P1 rename: the old src/components/custom/paper-grid VIZ dir is STILL PRESENT — the rename is a clean break (DEFINITION-ABSENT, no alias)",
        );
    const oldSubpathPresent = over?.oldSubpathPresent ?? existsSync(OLD_SUBPATH);
    if (oldSubpathPresent)
        viol.push(
            "P1 rename: src/subpaths/paper-grid.ts is STILL PRESENT — the /paper-grid viz subpath alias must be DEFINITION-ABSENT",
        );
    // No PaperGrid* alias export survives on the liquid-grid barrel (the clean-break fence).
    const index = over?.index ?? read(resolve(DIR, "index.ts"));
    if (index && /\bPaperGrid\b|\busePaperGrid\b|\bPaperGridConfig\b|\bsamplePaperGrid\b|DEFAULT_PAPER_GRID_CONFIG/.test(stripComments(index)))
        viol.push(
            "P1 rename: the liquid-grid index.ts re-exports a PaperGrid* alias symbol — the rename is a clean break, no back-compat alias",
        );
    if (api && /PaperGridConfig/.test(stripComments(api)))
        viol.push("P1 rename: /api still exports the retired PaperGridConfig alias (clean break, no alias)");
    return viol;
}

// ── P2: composes the substrate + the math is ONE source ───────────────────────────
function clauseSubstrate(over) {
    const viol = [];
    const use = stripComments(
        over?.useLiquidGrid ?? read(resolve(DIR, "composables/useLiquidGrid.ts")),
    );
    if (!/createGpuSubstrate\s*\(/.test(use))
        viol.push(
            "P2 substrate: useLiquidGrid does not compose createGpuSubstrate( — it must use the picker over the ONE lifecycle leaf (no navigator.gpu direct, no own rAF)",
        );
    if (/requestAnimationFrame\s*\(/.test(use))
        viol.push(
            "P2 substrate: useLiquidGrid forks a requestAnimationFrame loop — the renderer owns the loop (the no-own-rAF / one-loop discipline; proof:offscreen-pause intact)",
        );
    return viol;
}

// ── P3: one math source round-trips JS↔WGSL↔GLSL (re-pointed at the affine waveFlow) ─
function clauseRoundTrip(over) {
    const viol = [];
    const js = stripComments(over?.liquidGrid ?? read(resolve(DIR, "composables/liquidGrid.ts")));
    const wgsl = stripComments(over?.wgsl ?? read(resolve(DIR, "shaders/liquid-grid.wgsl.ts")));
    const glsl = stripComments(over?.glsl ?? read(resolve(DIR, "shaders/liquid-grid.glsl.ts")));
    // BG.W-GRID-AFFINE: the active warp is the SHARED `waveFlow` (smooth continuous sheet warp) +
    // `cursorSwirl`, both from the `waveField` leaf, SPLICED via WAVE_FIELD_{WGSL,GLSL}. The
    // round-trip witnesses are re-pointed at those + the liquid-grid-owned potentialFBM/gridCoverage/
    // sampleLiquidGrid. The binding numeric ΔE round-trip rides proof:wave-field's assertParity.
    const wgslHasWaveFn = (name) =>
        new RegExp(`\\b${name}\\s*\\(`).test(wgsl) || /WAVE_FIELD_WGSL/.test(wgsl);
    const glslHasWaveFn = (name) =>
        new RegExp(`\\b${name}\\s*\\(`).test(glsl) || /WAVE_FIELD_GLSL/.test(glsl);
    const checks = [
        ["potentialFBM in JS", () => /export function potentialFBM/.test(js)],
        ["waveFlow warp in JS", () => /\bwaveFlow\b/.test(js)],
        ["cursorSwirl warp in JS", () => /\bcursorSwirl\b/.test(js)],
        ["gridCoverage in JS", () => /export function gridCoverage/.test(js)],
        ["sampleLiquidGrid in JS", () => /export function sampleLiquidGrid/.test(js)],
        // the retired warps must NOT come back as CALLS (no-legacy fence).
        ["the retired curlWarp/cursorBulge/cellTwist/cellDriver CALLS are GONE in JS", () => !/\bcurlWarp\s*\(|\bcursorBulge\s*\(|\bcellTwist\s*\(|\bcellDriver\s*\(/.test(js)],
        ["potentialFBM in WGSL", () => /fn potentialFBM/.test(wgsl)],
        ["waveFlow warp in WGSL", () => wgslHasWaveFn("waveFlow")],
        ["cursorSwirl warp in WGSL", () => wgslHasWaveFn("cursorSwirl")],
        ["gridCoverage in WGSL", () => /fn gridCoverage/.test(wgsl)],
        ["potentialFBM in GLSL", () => /float potentialFBM/.test(glsl)],
        ["waveFlow warp in GLSL", () => glslHasWaveFn("waveFlow")],
        ["cursorSwirl warp in GLSL", () => glslHasWaveFn("cursorSwirl")],
        ["gridCoverage in GLSL", () => /float gridCoverage/.test(glsl)],
    ];
    for (const [label, fn] of checks) {
        if (!fn())
            viol.push(
                `P3 round-trip: ${label} — the WGSL/GLSL must transcribe the SAME liquidGrid.ts math (the single source)`,
            );
    }
    // The Moiré-suppression mix transcribes to BOTH shaders (the Golus de-aliasing line).
    if (!/mix\s*\(\s*grid2/.test(wgsl))
        viol.push(
            "P3 round-trip: liquid-grid.wgsl.ts has no Moiré-suppression mix(grid2, …) — the Golus de-aliasing line is missing (the 'evenly-spaced not Moiré' floor)",
        );
    if (!/mix\s*\(\s*grid2/.test(glsl))
        viol.push(
            "P3 round-trip: liquid-grid.glsl.ts has no Moiré-suppression mix(grid2, …) — the Golus de-aliasing line is missing",
        );
    return viol;
}

// ── P4: THE AFFINE LAW — the warp IS the smooth waveFlow (curlFBM), evenly-spaced + Golus-AA ─
function clauseAffineLaw(over) {
    const viol = [];
    const wgsl = stripComments(over?.wgsl ?? read(resolve(DIR, "shaders/liquid-grid.wgsl.ts")));
    const glsl = stripComments(over?.glsl ?? read(resolve(DIR, "shaders/liquid-grid.glsl.ts")));
    const rawWgsl = over?.wgsl ?? read(resolve(DIR, "shaders/liquid-grid.wgsl.ts"));
    const rawGlsl = over?.glsl ?? read(resolve(DIR, "shaders/liquid-grid.glsl.ts"));
    const flowWgsl = over?.flowWgsl ?? read(FLOW_WGSL);
    const flowGlsl = over?.flowGlsl ?? read(FLOW_GLSL);

    // flow.wgsl.ts EXISTS with the curl operator (the shared divergence-free curl chunk).
    if (!flowWgsl || !/CURL_FBM_WGSL/.test(flowWgsl) || !/fn curlFBM/.test(flowWgsl))
        viol.push(
            "P4 curl: src/composables/glass/webgl/shaders/flow.wgsl.ts does not export CURL_FBM_WGSL with a curlFBM operator (the shared curl chunk is missing)",
        );
    if (!flowGlsl || !/CURL_FBM_GLSL/.test(flowGlsl))
        viol.push("P4 curl: flow.glsl.ts no longer exports CURL_FBM_GLSL (the GLSL curl source)");

    // The shaders SPLICE the shared curl chunk (ONE curl source per backend).
    if (!/CURL_FBM_WGSL/.test(rawWgsl ?? "") || !/flow\.wgsl/.test(rawWgsl ?? ""))
        viol.push(
            "P4 curl: liquid-grid.wgsl.ts does not splice CURL_FBM_WGSL from flow.wgsl (ONE curl source per backend)",
        );
    if (!/CURL_FBM_GLSL/.test(rawGlsl ?? "") || !/flow\.glsl/.test(rawGlsl ?? ""))
        viol.push(
            "P4 curl: liquid-grid.glsl.ts does not splice CURL_FBM_GLSL from flow.glsl (ONE curl source per backend)",
        );

    // THE AFFINE LAW (A1). The shaders INVOKE the SMOOTH `waveFlow` sheet-warp (the SAME warp
    // concentric reads) and SPLICE the WAVE_FIELD leaf where waveFlow lives.
    if (!/\bwaveFlow\s*\(/.test(wgsl) || !/WAVE_FIELD_WGSL/.test(rawWgsl ?? ""))
        viol.push(
            "P4 affine: liquid-grid.wgsl.ts does not invoke the SHARED waveFlow sheet-warp from WAVE_FIELD_WGSL — the ripple must be the smooth continuous affine warp (major lines bow as ONE curve)",
        );
    if (!/\bwaveFlow\s*\(/.test(glsl) || !/WAVE_FIELD_GLSL/.test(rawGlsl ?? ""))
        viol.push(
            "P4 affine: liquid-grid.glsl.ts does not invoke the SHARED waveFlow sheet-warp from WAVE_FIELD_GLSL — the ripple must be the smooth continuous affine warp",
        );
    // THE PER-CELL-WOBBLE BITE. The retired per-cell `cellTwist` (a discontinuous per-box twist →
    // a kinked crest-band, "the lines shimmer with noise") must NOT be CALLED by the liquid-grid
    // shaders. `cellTwist` lives in the shared leaf as an unused primitive; a CALL in the shader
    // re-introduces the per-cell warp the affine law supersedes.
    if (/\bcellTwist\s*\(/.test(wgsl))
        viol.push(
            "P4 affine: liquid-grid.wgsl.ts CALLS cellTwist( — the retired per-cell discontinuous warp is GONE (the affine law wants the smooth waveFlow sheet warp, no per-cell kink)",
        );
    if (/\bcellTwist\s*\(/.test(glsl))
        viol.push(
            "P4 affine: liquid-grid.glsl.ts CALLS cellTwist( — the retired per-cell discontinuous warp is GONE (the affine law wants the smooth waveFlow sheet warp)",
        );

    // The spliced waveField leaf's waveFlow IS a curl warp (it calls curlFBM) — a re-derivation
    // to a raw fbm gradient in the leaf reds (the divergence-free guarantee).
    const waveWgsl = over?.waveWgsl ?? read(WAVE_WGSL);
    const waveGlsl = over?.waveGlsl ?? read(WAVE_GLSL);
    if (waveWgsl && !/curlFBM\s*\(/.test(stripComments(waveWgsl)))
        viol.push(
            "P4 curl: the WGSL waveField leaf does not call curlFBM( — the shared warp must be the divergence-free curl, NOT a raw fbm gradient",
        );
    if (waveGlsl && !/curlFBM\s*\(/.test(stripComments(waveGlsl)))
        viol.push(
            "P4 curl: the GLSL waveField leaf does not call curlFBM( — the shared warp must be the divergence-free curl",
        );

    // The Golus derivative-AA distance: dpdx/dpdy (WGSL) / dFdx/dFdy (GLSL) + the smoothstep stroke.
    if (!/dpdx\s*\(/.test(wgsl) || !/dpdy\s*\(/.test(wgsl))
        viol.push(
            "P4 golus: liquid-grid.wgsl.ts does not read the screen-space derivative dpdx/dpdy — the Ben Golus derivative-AA (the crisp-line / blur-kill) is missing",
        );
    if (!/dFdx\s*\(/.test(glsl) || !/dFdy\s*\(/.test(glsl))
        viol.push(
            "P4 golus: liquid-grid.glsl.ts does not read the screen-space derivative dFdx/dFdy — the Ben Golus derivative-AA is missing",
        );
    if (!/smoothstep\s*\(\s*drawWidth/.test(wgsl))
        viol.push(
            "P4 golus: the WGSL gridCoverage has no smoothstep(drawWidth ± lineAA) — the Golus stroke is missing",
        );
    return viol;
}

// ── P5: warm-cream identity default + no teal/navy ────────────────────────────────
function clauseWarmIdentity(over) {
    const viol = [];
    const consts = stripComments(over?.constants ?? read(resolve(DIR, "constants.ts")));
    const stopRe = /h\s*:\s*(\d+(?:\.\d+)?)/g;
    let m;
    while ((m = stopRe.exec(consts))) {
        const h = Number(m[1]);
        if (h >= 180 && h <= 280)
            viol.push(
                `P5 warm-identity: a teal/navy hue (h=${h}) in the LIBRARY constants.ts — the line ink + any reference palette belong in the DEMO preset (presets-in-consumers; BC.W-TEAL-NAVY-PURGE)`,
            );
    }
    if (!/WARM_IDENTITY_INK/.test(consts))
        viol.push("P5 warm-identity: constants.ts does not declare WARM_IDENTITY_INK (the warm --foreground ink default)");
    if (!/lineColor\s*:\s*WARM_IDENTITY_INK/.test(consts))
        viol.push(
            "P5 warm-identity: DEFAULT_LIQUID_GRID_CONFIG.lineColor is not WARM_IDENTITY_INK (the default ink must be warm-cream identity)",
        );
    if (!/background\s*:\s*["']transparent["']/.test(consts))
        viol.push(
            "P5 warm-identity: DEFAULT_LIQUID_GRID_CONFIG.background is not 'transparent' (the grid must suffuse over the page, not paint a ground)",
        );
    return viol;
}

// ── P6: the configurator + demo + suffusion register + the renamed route ──────────
function clauseDemo(over) {
    const viol = [];
    const demo = stripComments(over?.demo ?? read(DEMO));
    const hero = stripComments(over?.auroraHero ?? read(AURORA_HERO));
    const storyHero = stripComments(over?.storyHero ?? read(STORY_HERO));
    const manifest = stripComments(over?.manifest ?? read(MANIFEST));
    if (!demo)
        viol.push("P6 demo: demo/stories/substrates/liquid-grid.vue is missing (the demo page)");
    else {
        if (!/<Configurator\b/.test(demo))
            viol.push("P6 demo: the demo page has no <Configurator> (the controls-on-the-RIGHT shell)");
        if (!/<LiquidGrid\b/.test(demo))
            viol.push("P6 demo: the demo page does not mount <LiquidGrid>");
        if (!/\/liquid-grid/.test(demo))
            viol.push("P6 demo: the demo page title does not carry the explicit /liquid-grid subpath");
    }
    // The liquid-grid StoryBackgroundKind is the suffusion register (the §E site-wide bg).
    if (!hero || !/["']liquid-grid["']/.test(hero))
        viol.push(
            "P6 suffusion: the liquid-grid StoryBackgroundKind is not declared in aurora-hero.ts (the suffusion register — 'suffuse it throughout the site as a subtle background element')",
        );
    // The liquid-grid kind mounts FULL-BLEED (NOT boxed in .story-hero) — the bleed escape.
    if (storyHero != null && /liquid-grid/.test(storyHero) && !/bleed/.test(storyHero))
        viol.push(
            "P6 suffusion: the liquid-grid kind in StoryHero.vue is not mounted full-bleed (the .story-hero-bg--bleed escape)",
        );
    // The renamed route resolves in the story manifest (A3 — route /substrates/liquid-grid).
    if (manifest != null && !/substrates\/liquid-grid/.test(manifest))
        viol.push(
            "P6 route: demo/stories/manifest.ts does not carry the /substrates/liquid-grid route (the A3 rename)",
        );
    return viol;
}

// ── P7: THE HOMONYM FENCE — the STATIC .paper-grid register survives byte-untouched ─
function clauseHomonymFence(over) {
    const viol = [];
    const cards = over?.cardsCss ?? read(CARDS_CSS);
    const scalePaper = over?.scalePaperCss ?? read(SCALE_PAPER_CSS);
    // The rename kills the VIZ homonym ONLY — the STATIC geometric-paper card register stays.
    if (!cards || !/\.paper-grid\s*\{/.test(cards))
        viol.push(
            "P7 homonym: the STATIC .paper-grid card register is ABSENT from cards.css — the viz rename must NOT touch the static paper register (BYTE-UNTOUCHED)",
        );
    if (!scalePaper || !/--paper-grid-texture\s*:/.test(scalePaper))
        viol.push(
            "P7 homonym: --paper-grid-texture is ABSENT from tokens/scale-paper.css — the static geometric-paper token must survive the viz rename",
        );
    return viol;
}

// ── P8: THE LOCALLY-AFFINE FREQUENCY FLOOR — the warp is sampled ≪ the grid frequency ─
// The BG.W-GRID-AFFINE paint re-open (the "shimmers with noise" FAIL): the shared `waveFlow` leaf
// hardcoded a ~1-CELL curl-sampling frequency (`g * 0.6`/`* 1.1`) — right for concentric's
// unit-scale `p` but ~14× TOO HIGH for liquid-grid's cell-scale `g0` → the warp Jacobian varied
// strongly WITHIN each cell → the major lines crackled (56–86 curvature reversals) instead of
// bowing smoothly. The cure is a HOST-supplied `warpFreq` parameter: liquid-grid (cell-scale g0)
// passes a tiny frequency ≤ AFFINE_FREQ_CEIL so the warp is locally affine at the cell scale (the
// sheet bows as ONE smooth curve); concentric (unit-scale p) keeps its unit-scale 0.6. This clause
// encodes the fix as a device-free invariant (born-RED on the pre-fix hardcoded-0.6 leaf).
const AFFINE_FREQ_CEIL = 0.1;
function clauseAffineFreq(over) {
    const viol = [];
    const waveJs = stripComments(over?.waveJs ?? read(WAVE_JS));
    const waveGlsl = stripComments(over?.waveGlsl ?? read(WAVE_GLSL));
    const waveWgsl = stripComments(over?.waveWgsl ?? read(WAVE_WGSL));
    const glsl = stripComments(over?.glsl ?? read(resolve(DIR, "shaders/liquid-grid.glsl.ts")));
    const wgsl = stripComments(over?.wgsl ?? read(resolve(DIR, "shaders/liquid-grid.wgsl.ts")));
    const liquidGridJs = stripComments(
        over?.liquidGrid ?? read(resolve(DIR, "composables/liquidGrid.ts")),
    );

    // (1) the shared waveFlow SIGNATURE carries a host-supplied `warpFreq` parameter in all three
    //     transcriptions (the frequency is host-parameterized, NOT a hardcoded cell-scale literal).
    //     Capture the params up to waveFlow's OWN close (the lazy `)` stops at the sig close, NOT a
    //     later `): Vec2 {` sibling like cursorSwirl — the anti-fool scoping).
    const jsSig = waveJs && waveJs.match(/export function waveFlow\(([\s\S]*?)\)\s*:\s*Vec2\s*\{/);
    if (waveJs && (!jsSig || !/\bwarpFreq\b/.test(jsSig[1])))
        viol.push(
            "P8 affine-freq: waveField.ts `waveFlow` signature has no `warpFreq` parameter — the curl-sampling frequency must be host-supplied (the locally-affine floor), not a hardcoded cell-scale literal",
        );
    const glslSig = waveGlsl && waveGlsl.match(/vec2 waveFlow\(([\s\S]*?)\)\s*\{/);
    if (waveGlsl && (!glslSig || !/\bwarpFreq\b/.test(glslSig[1])))
        viol.push("P8 affine-freq: the GLSL waveField leaf `waveFlow` signature has no `warpFreq` parameter");
    const wgslSig = waveWgsl && waveWgsl.match(/fn waveFlow\(([\s\S]*?)\)\s*->/);
    if (waveWgsl && (!wgslSig || !/\bwarpFreq\b/.test(wgslSig[1])))
        viol.push("P8 affine-freq: the WGSL waveField leaf `waveFlow` signature has no `warpFreq` parameter");

    // (2) the leaf body samples the curl at `warpFreq`, NOT the hardcoded cell-scale `g.* * 0.6`
    //     literal (the crackle source the FAIL localized).
    if (waveGlsl && /\bg\.[xy]\s*\*\s*0\.6\b/.test(waveGlsl))
        viol.push(
            "P8 affine-freq: the GLSL waveFlow still samples the curl at the hardcoded cell-scale `g * 0.6` — the crackle frequency (must read the host `warpFreq`)",
        );
    if (waveWgsl && /\bg\.[xy]\s*\*\s*0\.6\b/.test(waveWgsl))
        viol.push("P8 affine-freq: the WGSL waveFlow still samples the curl at the hardcoded `g * 0.6`");

    // (3) the liquid-grid shaders CALL waveFlow with a LOW warpFreq last-arg (≤ AFFINE_FREQ_CEIL):
    //     g0 is CELL-scale, so the affine floor demands an order-of-magnitude-below frequency.
    for (const [name, src] of [
        ["glsl", glsl],
        ["wgsl", wgsl],
    ]) {
        const call = (src ?? "").match(/\bwaveFlow\s*\(([^)]*)\)/);
        if (!call) {
            viol.push(
                `P8 affine-freq: liquid-grid.${name}.ts has no waveFlow(...) call to read the warpFreq from`,
            );
            continue;
        }
        const args = call[1].split(",").map((s) => s.trim());
        const last = args[args.length - 1];
        const freq = Number(last);
        if (!Number.isFinite(freq))
            viol.push(
                `P8 affine-freq: liquid-grid.${name}.ts waveFlow(...) last arg "${last}" is not a numeric warpFreq literal — the affine floor needs the sampling frequency AT the call site`,
            );
        else if (freq > AFFINE_FREQ_CEIL)
            viol.push(
                `P8 affine-freq: liquid-grid.${name}.ts samples the curl at warpFreq=${freq} > ${AFFINE_FREQ_CEIL} — the CELL-scale g0 needs an order-of-magnitude-below frequency (locally affine: major lines bow as ONE curve, no sub-cell crackle)`,
            );
    }

    // (4) the JS host declares LIQUID_GRID_WARP_FREQ (low) and FEEDS it to waveFlow — the JS↔shader
    //     round-trip on the affine frequency (one source, three transcriptions).
    if (liquidGridJs) {
        const decl = liquidGridJs.match(/LIQUID_GRID_WARP_FREQ\s*=\s*([\d.]+)/);
        if (!decl)
            viol.push(
                "P8 affine-freq: liquidGrid.ts does not declare LIQUID_GRID_WARP_FREQ (the named cell-scale affine frequency)",
            );
        else if (Number(decl[1]) > AFFINE_FREQ_CEIL)
            viol.push(
                `P8 affine-freq: LIQUID_GRID_WARP_FREQ=${decl[1]} > ${AFFINE_FREQ_CEIL} — the JS host must feed the same low affine frequency the shaders do`,
            );
        if (!/waveFlow\([^)]*LIQUID_GRID_WARP_FREQ/.test(liquidGridJs))
            viol.push(
                "P8 affine-freq: liquidGrid.ts sampleLiquidGrid does not pass LIQUID_GRID_WARP_FREQ to waveFlow (the JS↔shader affine-frequency round-trip)",
            );
    }
    return viol;
}

function runAll(over = {}) {
    return [
        ...clauseExists(over),
        ...clauseSubstrate(over),
        ...clauseRoundTrip(over),
        ...clauseAffineLaw(over),
        ...clauseWarmIdentity(over),
        ...clauseDemo(over),
        ...clauseHomonymFence(over),
        ...clauseAffineFreq(over),
    ];
}

// ── Self-test: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];
    const liveUse = read(resolve(DIR, "composables/useLiquidGrid.ts"));
    const liveWgsl = read(resolve(DIR, "shaders/liquid-grid.wgsl.ts"));
    const liveConsts = read(resolve(DIR, "constants.ts"));
    const liveHero = read(AURORA_HERO);
    const liveIndex = read(resolve(DIR, "index.ts"));
    const liveCards = read(CARDS_CSS);

    // (a) a missing /liquid-grid subpath barrel reds P1.
    const noSubpath = runAll({ subpath: "" });
    if (!noSubpath.some((v) => v.startsWith("P1")))
        fails.push("self-test: a missing /liquid-grid subpath barrel did NOT red P1");
    // (b) a forked rAF in useLiquidGrid reds P2.
    const raffed = runAll({ useLiquidGrid: (liveUse ?? "") + "\nfunction loop(){ requestAnimationFrame(loop); }" });
    if (!raffed.some((v) => v.startsWith("P2")))
        fails.push("self-test: a planted requestAnimationFrame in useLiquidGrid did NOT red P2");
    // (c) a dropped Moiré-suppression mix reds P3.
    const noMoire = runAll({ wgsl: (liveWgsl ?? "").replace(/grid2 = mix\(grid2[^;]*;/g, "") });
    if (!noMoire.some((v) => v.startsWith("P3")))
        fails.push("self-test: a dropped Moiré-suppression mix did NOT red P3");
    // (d) the SHARED waveField leaf re-derived to a raw fbm gradient (drops curlFBM) reds P4.
    const liveWaveWgsl = read(WAVE_WGSL);
    const noCurl = runAll({ waveWgsl: (liveWaveWgsl ?? "").replace(/curlFBM\(/g, "potentialGrad(") });
    if (!noCurl.some((v) => v.startsWith("P4")))
        fails.push("self-test: a waveField leaf dropping curlFBM (a raw fbm gradient) did NOT red P4");
    // (d2) THE PER-CELL-WOBBLE BITE — a liquid-grid shader re-introducing a cellTwist( call reds P4.
    const wobble = runAll({ wgsl: (liveWgsl ?? "").replace(/waveFlow\(/g, "cellTwist(") });
    if (!wobble.some((v) => v.startsWith("P4")))
        fails.push("self-test: a liquid-grid shader re-introducing a per-cell cellTwist( warp did NOT red P4 (the per-pixel-wobble bite)");
    // (e) a deleted flow.wgsl.ts reds P4.
    const noFlowWgsl = runAll({ flowWgsl: "" });
    if (!noFlowWgsl.some((v) => v.startsWith("P4")))
        fails.push("self-test: a deleted flow.wgsl.ts did NOT red P4");
    // (f) a teal hue in the library reds P5.
    const tealPlanted = runAll({ constants: (liveConsts ?? "") + "\nconst X = { L: 0.5, C: 0.12, h: 210 };" });
    if (!tealPlanted.some((v) => v.startsWith("P5")))
        fails.push("self-test: a teal hue in the library constants did NOT red P5");
    // (g) a removed liquid-grid background kind reds P6.
    const noKind = runAll({ auroraHero: (liveHero ?? "").replace(/liquid-grid/g, "grid") });
    if (!noKind.some((v) => v.startsWith("P6")))
        fails.push("self-test: a removed liquid-grid StoryBackgroundKind did NOT red P6");
    // (alias) a re-added PaperGrid alias export on the liquid-grid barrel reds P1.
    const aliased = runAll({ index: (liveIndex ?? "") + "\nexport { LiquidGrid as PaperGrid } from './LiquidGrid.vue';" });
    if (!aliased.some((v) => v.startsWith("P1")))
        fails.push("self-test: a re-added PaperGrid alias export did NOT red P1 (the clean-break fence)");
    // (old-dir) the old paper-grid VIZ dir re-appearing reds P1.
    const oldDir = runAll({ oldDirPresent: true });
    if (!oldDir.some((v) => v.startsWith("P1")))
        fails.push("self-test: a re-appearing old paper-grid VIZ dir did NOT red P1");
    // (static-register) removing the STATIC .paper-grid card register reds P7.
    const noStatic = runAll({ cardsCss: (liveCards ?? "").replace(/\.paper-grid\s*\{/g, ".other-thing {") });
    if (!noStatic.some((v) => v.startsWith("P7")))
        fails.push("self-test: removing the STATIC .paper-grid card register did NOT red P7 (the homonym fence)");
    // (affine-freq-a) a HIGH cell-scale warpFreq at the liquid-grid call site (the crackle
    // frequency the FAIL localized) reds P8.
    const liveGlsl = read(resolve(DIR, "shaders/liquid-grid.glsl.ts"));
    const hiFreq = runAll({
        glsl: (liveGlsl ?? "").replace(/(\bwaveFlow\s*\([^)]*,\s*)0\.03(\s*\))/, "$1" + "0.6" + "$2"),
    });
    if (!hiFreq.some((v) => v.startsWith("P8")))
        fails.push(
            "self-test: a HIGH cell-scale warpFreq (0.6) at the liquid-grid waveFlow call did NOT red P8 (the affine-frequency floor — the sub-cell crackle)",
        );
    // (affine-freq-b) the shared waveFlow leaf dropping its `warpFreq` parameter reds P8.
    const liveWaveJs = read(WAVE_JS);
    const noFreqParam = runAll({ waveJs: (liveWaveJs ?? "").replace(/,\s*warpFreq = 0\.6,/, ",") });
    if (!noFreqParam.some((v) => v.startsWith("P8")))
        fails.push(
            "self-test: the shared waveFlow leaf dropping its `warpFreq` parameter did NOT red P8 (host-supplied affine frequency)",
        );
    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:viz-papergrid",
        wave: "BG.W-GRID-AFFINE",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath(
        "GLASS_UI_VIZ_PAPERGRID_ARTIFACT",
        "proof-viz-papergrid.json",
    );
    writeGateArtifact(out, artifact);

    console.log(
        "proof:viz-papergrid — the liquid-grid: an affine sheet-warp (major lines bow as ONE curve) on the shared waveFlow field (BG.W-GRID-AFFINE)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log("  GREEN (P1 exists+rename · P2 substrate · P3 round-trip · P4 affine+curl+golus · P5 warm-identity · P6 demo+route · P7 homonym-fence · P8 affine-frequency-floor)");
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
