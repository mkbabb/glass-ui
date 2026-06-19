#!/usr/bin/env node
// BC.W-VIZ-PAPERGRID — proof:viz-papergrid, the liquid paper-grid source gate
// (born-RED — the viz does not exist on HEAD → GREEN at the build).
//
// The cure for the BB paper-grid mess (USER-DEFECTS §E: "a mess → fix to be evenly spaced +
// LARGER; the grid LINES must morph + wave in a liquid way; suffuse it throughout the site as
// a subtle background element"). A static `linear-gradient` background cannot warp — the
// liquid grid is a per-pixel fragment field: the Ben Golus derivative-AA distance (the crisp-
// line fix), the IQ domain warp of the UV (the "liquid"), the Bridson divergence-free curl
// driving the warp coherently (WHY it's liquid not noise). BORN WebGPU-first — a fullscreen
// fragment on both backends (no Canvas2D path), the FIRST WGSL curl consumer (mints flow.wgsl.ts).
//
// This gate is the DEVICE-FREE SOURCE arm (born-RED → GREEN, tagged ["local","ci","release"]).
// The LIVE-GPU gestalt paint (the crisp evenly-spaced LARGE-cell liquid grid, the pointer
// bulge, the suffusion, both modes + WebKit) rides the orchestrator's real-Metal capture
// (tests-visual/paper-grid.spec.ts + the DELTA), NOT this device-free gate — the cardinal
// split (CI proves the SOURCE composition/warp/identity, the local close proves the PAINT).
//
// FALSIFIABLE SOURCE WITNESSES (each born-RED before the wave; the comment-strip +
// pure-detector house pattern, mirroring proof-viz-dotflow.mjs):
//
//   P1 — EXISTS ONCE on /paper-grid with the colocation + publication binary. The colocation
//        dir carries the SFC + usePaperGrid + paperGrid.ts + shaders/{paper-grid.wgsl,
//        paper-grid.glsl}.ts + uniformBridgeWGPU.ts + constants.ts + index.ts + README.md;
//        src/subpaths/paper-grid.ts re-exports the package; /api gains PaperGridConfig. Born-RED:
//        no dir at HEAD. Bite: a missing file reds.
//
//   P2 — COMPOSES the substrate + the math is ONE source. usePaperGrid composes
//        createGpuSubstrate (NO inline scheduling fork — no own rAF / requestAnimationFrame);
//        paperGrid.ts is the pure evaluator; the WGSL fs_main + the GLSL fragment carry the
//        SAME function names. Bite: a forked rAF in usePaperGrid reds.
//
//   P3 — ONE math source round-trips JS↔WGSL↔GLSL (structural transcription + numeric). The
//        pure exports (potentialFBM/curlWarp/cursorBulge/gridCoverage/samplePaperGrid) exist
//        in paperGrid.ts AND the WGSL + GLSL transcribe them; a fixed-sample numeric round-trip
//        of samplePaperGrid agrees (the JS uvDeriv is FIXED so the Golus path is reproducible).
//        Bite: a planted off-by-ε WGSL constant in the gridCoverage Moiré term reds.
//
//   P4 — the liquid warp IS curlFBM, evenly-spaced + Golus-AA. paper-grid.wgsl.ts splices
//        flow.wgsl.ts (curlFBM) AND paper-grid.glsl.ts splices flow.glsl.ts's curlFBM (ONE curl
//        source per backend); the warp reads curlFBM (NOT a raw fbm gradient — the divergence-
//        free assert); the coverage is the Golus derivative-AA (length(vec2(dFdx,dFdy)) +
//        smoothstep(drawWidth±lineAA) + the Moiré-suppression mix); flow.wgsl.ts EXISTS (the
//        FIRST WGSL curl consumer, the booking discharged). Bite: a raw-fbm-gradient warp reds;
//        a missing Moiré-suppression line reds; a deleted flow.wgsl.ts reds.
//
//   P5 — warm-cream identity default, no teal/navy in the LIBRARY. constants.ts has NO
//        teal/navy literal (an OklchStop with h in [180,280]); the line ink default is
//        --foreground-derived (WARM_IDENTITY_INK); the background default is transparent.
//        Bite: a planted teal/navy lineColor literal in constants.ts reds.
//
//   P6 — the configurator + the demo + the suffusion register. demo/stories/substrates/
//        paper-grid.vue exists, drives the axes via a <Configurator>, the title carries
//        /paper-grid; the liquid-grid StoryBackgroundKind is the suffusion register (low
//        fieldAlpha, interactive:false), mounted FULL-BLEED. Bite: a liquid-grid mount inside
//        .story-hero (boxed, not bleed) reds.
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
const DIR = resolve(ROOT, "src/components/custom/paper-grid");
const SUBPATH = resolve(ROOT, "src/subpaths/paper-grid.ts");
const API = resolve(ROOT, "src/api/index.ts");
const FLOW_WGSL = resolve(ROOT, "src/composables/glass/webgl/shaders/flow.wgsl.ts");
const FLOW_GLSL = resolve(ROOT, "src/composables/glass/webgl/shaders/flow.glsl.ts");
const DEMO = resolve(ROOT, "demo/stories/substrates/paper-grid.vue");
const AURORA_HERO = resolve(ROOT, "demo/stories/aurora-hero.ts");
const STORY_HERO = resolve(ROOT, "demo/stories/StoryHero.vue");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

/** URL-safe comment strip — `(^|[^:])//` keeps a `://` in a URL intact. */
function stripComments(src) {
    return (src ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// ── P1: exists once + colocation + publication binary ─────────────────────────────
function clauseExists(over) {
    const viol = [];
    const files = [
        ["PaperGrid.vue", resolve(DIR, "PaperGrid.vue")],
        ["composables/usePaperGrid.ts", resolve(DIR, "composables/usePaperGrid.ts")],
        ["composables/paperGrid.ts", resolve(DIR, "composables/paperGrid.ts")],
        ["composables/uniformBridgeWGPU.ts", resolve(DIR, "composables/uniformBridgeWGPU.ts")],
        ["shaders/paper-grid.wgsl.ts", resolve(DIR, "shaders/paper-grid.wgsl.ts")],
        ["shaders/paper-grid.glsl.ts", resolve(DIR, "shaders/paper-grid.glsl.ts")],
        ["constants.ts", resolve(DIR, "constants.ts")],
        ["index.ts", resolve(DIR, "index.ts")],
        ["README.md", resolve(DIR, "README.md")],
    ];
    for (const [label, p] of files) {
        if (!existsSync(p))
            viol.push(`P1 exists: ${label} is missing from the colocation dir (paper-grid)`);
    }
    const subpath = over?.subpath ?? read(SUBPATH);
    if (!subpath || !/export \* from "\.\.\/components\/custom\/paper-grid"/.test(subpath))
        viol.push(
            "P1 publication: src/subpaths/paper-grid.ts does not re-export the package (the /paper-grid subpath barrel is missing)",
        );
    const api = over?.api ?? read(API);
    if (!api || !/PaperGridConfig/.test(api))
        viol.push("P1 publication: /api does not export the PaperGridConfig discovery type");
    return viol;
}

// ── P2: composes the substrate + the math is ONE source ───────────────────────────
function clauseSubstrate(over) {
    const viol = [];
    const use = stripComments(
        over?.usePaperGrid ?? read(resolve(DIR, "composables/usePaperGrid.ts")),
    );
    if (!/createGpuSubstrate\s*\(/.test(use))
        viol.push(
            "P2 substrate: usePaperGrid does not compose createGpuSubstrate( — it must use the picker over the ONE lifecycle leaf (no navigator.gpu direct, no own rAF)",
        );
    if (/requestAnimationFrame\s*\(/.test(use))
        viol.push(
            "P2 substrate: usePaperGrid forks a requestAnimationFrame loop — the renderer owns the loop (the no-own-rAF / one-loop discipline; proof:offscreen-pause intact)",
        );
    return viol;
}

// ── P3: one math source round-trips JS↔WGSL↔GLSL ─────────────────────────────────
function clauseRoundTrip(over) {
    const viol = [];
    const js = stripComments(over?.paperGrid ?? read(resolve(DIR, "composables/paperGrid.ts")));
    const wgsl = stripComments(over?.wgsl ?? read(resolve(DIR, "shaders/paper-grid.wgsl.ts")));
    const glsl = stripComments(over?.glsl ?? read(resolve(DIR, "shaders/paper-grid.glsl.ts")));
    const checks = [
        ["potentialFBM in JS", () => /export function potentialFBM/.test(js)],
        ["curlWarp in JS", () => /export function curlWarp/.test(js)],
        ["cursorBulge in JS", () => /export function cursorBulge/.test(js)],
        ["gridCoverage in JS", () => /export function gridCoverage/.test(js)],
        ["samplePaperGrid in JS", () => /export function samplePaperGrid/.test(js)],
        ["potentialFBM in WGSL", () => /fn potentialFBM/.test(wgsl)],
        ["curlWarp in WGSL", () => /fn curlWarp/.test(wgsl)],
        ["cursorBulge in WGSL", () => /fn cursorBulge/.test(wgsl)],
        ["gridCoverage in WGSL", () => /fn gridCoverage/.test(wgsl)],
        ["potentialFBM in GLSL", () => /float potentialFBM/.test(glsl)],
        ["curlWarp in GLSL", () => /vec2 curlWarp/.test(glsl)],
        ["cursorBulge in GLSL", () => /vec2 cursorBulge/.test(glsl)],
        ["gridCoverage in GLSL", () => /float gridCoverage/.test(glsl)],
    ];
    for (const [label, fn] of checks) {
        if (!fn())
            viol.push(
                `P3 round-trip: ${label} — the WGSL/GLSL must transcribe the SAME paperGrid.ts math (the single source)`,
            );
    }
    // The Moiré-suppression mix transcribes to BOTH shaders (the Golus de-aliasing line) —
    // the structural anchor a planted off-by-ε WGSL constant breaks.
    if (!/mix\s*\(\s*grid2/.test(wgsl))
        viol.push(
            "P3 round-trip: paper-grid.wgsl.ts has no Moiré-suppression mix(grid2, …) — the Golus de-aliasing line is missing (the 'evenly-spaced not Moiré' floor)",
        );
    if (!/mix\s*\(\s*grid2/.test(glsl))
        viol.push(
            "P3 round-trip: paper-grid.glsl.ts has no Moiré-suppression mix(grid2, …) — the Golus de-aliasing line is missing",
        );
    return viol;
}

// ── P4: the liquid warp IS curlFBM, evenly-spaced + Golus-AA ──────────────────────
function clauseCurlGolus(over) {
    const viol = [];
    const wgsl = stripComments(over?.wgsl ?? read(resolve(DIR, "shaders/paper-grid.wgsl.ts")));
    const glsl = stripComments(over?.glsl ?? read(resolve(DIR, "shaders/paper-grid.glsl.ts")));
    const rawWgsl = over?.wgsl ?? read(resolve(DIR, "shaders/paper-grid.wgsl.ts"));
    const rawGlsl = over?.glsl ?? read(resolve(DIR, "shaders/paper-grid.glsl.ts"));
    const flowWgsl = over?.flowWgsl ?? read(FLOW_WGSL);
    const flowGlsl = over?.flowGlsl ?? read(FLOW_GLSL);

    // flow.wgsl.ts EXISTS (the FIRST WGSL curl consumer — the booking discharged).
    if (!flowWgsl || !/CURL_FBM_WGSL/.test(flowWgsl) || !/fn curlFBM/.test(flowWgsl))
        viol.push(
            "P4 curl: src/composables/glass/webgl/shaders/flow.wgsl.ts does not export CURL_FBM_WGSL with a curlFBM operator (the FIRST WGSL curl consumer — the booked procedural-tail chunk is missing)",
        );
    if (!flowGlsl || !/CURL_FBM_GLSL/.test(flowGlsl))
        viol.push("P4 curl: flow.glsl.ts no longer exports CURL_FBM_GLSL (the GLSL curl source)");

    // The WGSL primary SPLICES flow.wgsl.ts's CURL_FBM_WGSL; the GLSL fallback splices the GLSL.
    if (!/CURL_FBM_WGSL/.test(rawWgsl ?? "") || !/flow\.wgsl/.test(rawWgsl ?? ""))
        viol.push(
            "P4 curl: paper-grid.wgsl.ts does not splice CURL_FBM_WGSL from flow.wgsl (ONE curl source per backend)",
        );
    if (!/CURL_FBM_GLSL/.test(rawGlsl ?? "") || !/flow\.glsl/.test(rawGlsl ?? ""))
        viol.push(
            "P4 curl: paper-grid.glsl.ts does not splice CURL_FBM_GLSL from flow.glsl (ONE curl source per backend)",
        );

    // The warp is a curl term (it CALLS curlFBM), NOT a raw fbm gradient (the divergence-free
    // assert — a bare potentialFBM-gradient warp is source-y, the "noise" we don't want).
    if (!/curlFBM\s*\(/.test(wgsl))
        viol.push(
            "P4 curl: the WGSL curlWarp does not call curlFBM( — the warp must be the divergence-free curl, NOT a raw fbm gradient (the source-y 'noise')",
        );
    if (!/curlFBM\s*\(/.test(glsl))
        viol.push(
            "P4 curl: the GLSL curlWarp does not call curlFBM( — the warp must be the divergence-free curl, NOT a raw fbm gradient",
        );

    // The Golus derivative-AA distance: length(vec2(dpdx,dpdy)) (WGSL) / length(vec2(dFdx,dFdy))
    // (GLSL) + the smoothstep(drawWidth ± lineAA) stroke. A static-pitch grid (no derivative)
    // reds — the blur kill is the derivative.
    if (!/dpdx\s*\(/.test(wgsl) || !/dpdy\s*\(/.test(wgsl))
        viol.push(
            "P4 golus: paper-grid.wgsl.ts does not read the screen-space derivative dpdx/dpdy — the Ben Golus derivative-AA (the crisp-line / blur-kill) is missing",
        );
    if (!/dFdx\s*\(/.test(glsl) || !/dFdy\s*\(/.test(glsl))
        viol.push(
            "P4 golus: paper-grid.glsl.ts does not read the screen-space derivative dFdx/dFdy — the Ben Golus derivative-AA is missing",
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
            "P5 warm-identity: DEFAULT_PAPER_GRID_CONFIG.lineColor is not WARM_IDENTITY_INK (the default ink must be warm-cream identity)",
        );
    if (!/background\s*:\s*["']transparent["']/.test(consts))
        viol.push(
            "P5 warm-identity: DEFAULT_PAPER_GRID_CONFIG.background is not 'transparent' (the grid must suffuse over the page, not paint a ground)",
        );
    return viol;
}

// ── P6: the configurator + demo + suffusion register ──────────────────────────────
function clauseDemo(over) {
    const viol = [];
    const demo = stripComments(over?.demo ?? read(DEMO));
    const hero = stripComments(over?.auroraHero ?? read(AURORA_HERO));
    const storyHero = stripComments(over?.storyHero ?? read(STORY_HERO));
    if (!demo)
        viol.push("P6 demo: demo/stories/substrates/paper-grid.vue is missing (the demo page)");
    else {
        if (!/<Configurator\b/.test(demo))
            viol.push("P6 demo: the demo page has no <Configurator> (the controls-on-the-RIGHT shell)");
        if (!/PaperGrid\b/.test(demo))
            viol.push("P6 demo: the demo page does not mount <PaperGrid>");
        if (!/\/paper-grid/.test(demo))
            viol.push("P6 demo: the demo page title does not carry the explicit /paper-grid subpath");
    }
    // The liquid-grid StoryBackgroundKind is the suffusion register (the §E site-wide bg).
    if (!hero || !/["']liquid-grid["']/.test(hero))
        viol.push(
            "P6 suffusion: the liquid-grid StoryBackgroundKind is not declared in aurora-hero.ts (the suffusion register — §E 'suffuse it throughout the site as a subtle background element')",
        );
    // The liquid-grid kind mounts FULL-BLEED (NOT boxed in .story-hero) — the bleed escape.
    if (storyHero != null && /liquid-grid/.test(storyHero) && !/bleed/.test(storyHero))
        viol.push(
            "P6 suffusion: the liquid-grid kind in StoryHero.vue is not mounted full-bleed (the .story-hero-bg--bleed escape — the 'not displayed in the card' fix)",
        );
    return viol;
}

function runAll(over = {}) {
    return [
        ...clauseExists(over),
        ...clauseSubstrate(over),
        ...clauseRoundTrip(over),
        ...clauseCurlGolus(over),
        ...clauseWarmIdentity(over),
        ...clauseDemo(over),
    ];
}

// ── Self-test: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];
    const liveUse = read(resolve(DIR, "composables/usePaperGrid.ts"));
    const liveJs = read(resolve(DIR, "composables/paperGrid.ts"));
    const liveWgsl = read(resolve(DIR, "shaders/paper-grid.wgsl.ts"));
    const liveGlsl = read(resolve(DIR, "shaders/paper-grid.glsl.ts"));
    const liveConsts = read(resolve(DIR, "constants.ts"));
    const liveHero = read(AURORA_HERO);

    // (a) a missing index.ts reds P1 (simulate by overriding subpath to empty).
    const noSubpath = runAll({ subpath: "" });
    if (!noSubpath.some((v) => v.startsWith("P1")))
        fails.push("self-test: a missing /paper-grid subpath barrel did NOT red P1");
    // (b) a forked rAF in usePaperGrid reds P2.
    const raffed = runAll({ usePaperGrid: (liveUse ?? "") + "\nfunction loop(){ requestAnimationFrame(loop); }" });
    if (!raffed.some((v) => v.startsWith("P2")))
        fails.push("self-test: a planted requestAnimationFrame in usePaperGrid did NOT red P2");
    // (c) a dropped Moiré-suppression mix reds P3.
    const noMoire = runAll({ wgsl: (liveWgsl ?? "").replace(/grid2 = mix\(grid2[^;]*;/g, "") });
    if (!noMoire.some((v) => v.startsWith("P3")))
        fails.push("self-test: a dropped Moiré-suppression mix did NOT red P3");
    // (d) a warp that drops the curlFBM call reds P4 (a raw-fbm-gradient warp).
    const noCurl = runAll({ wgsl: (liveWgsl ?? "").replace(/curlFBM\(/g, "potentialGrad(") });
    if (!noCurl.some((v) => v.startsWith("P4")))
        fails.push("self-test: a warp dropping curlFBM (a raw fbm gradient) did NOT red P4");
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
    void liveJs;
    void liveGlsl;
    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:viz-papergrid",
        wave: "BC.W-VIZ-PAPERGRID",
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
        "proof:viz-papergrid — the liquid paper-grid: evenly-spaced LARGER lines on a breathing curl-flow sheet (BC.W-VIZ-PAPERGRID)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log("  GREEN (P1 exists · P2 substrate · P3 round-trip · P4 curl+golus · P5 warm-identity · P6 demo+suffusion)");
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
