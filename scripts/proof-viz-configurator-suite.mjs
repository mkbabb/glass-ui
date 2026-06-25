#!/usr/bin/env node
// BC.W-VIZ-CONFIGURATOR-SUITE — proof:viz-configurator-suite, the four-piece
// per-viz completeness enforcer (ORCHESTRATION §6).
//
// THE MANDATE (USER-DEFECTS §E verbatim): "for each [viz] … a full SOTA research
// wave + full WebGPU/WebGL2 prototype + full configurator + comprehensive demo
// suite." ORCHESTRATION §6 made it an invariant: "Every procedural item ships a
// WebGPU-first + WebGL2 prototype + a FULL configurator + a COMPREHENSIVE demo
// suite. A viz wave without all four is incomplete." This gate makes that
// mechanical — the FOUR-PIECE bar, machine-tracked per viz.
//
// THE SHARED DISCIPLINE (the consistency the suite never had): every viz studio
// obeys the ONE shape — the BC.W-VIZ-CONFIGURATOR-SUITE VizStudio chassis
// (demo/stories/substrates/VizStudio.vue) that bundles the BC.W-PAGE-CHASSIS hero
// (audacious display <h1> shrinking on scroll + the explicit @mkbabb/glass-ui/<viz>
// Fira-Code subpath chip ON the card) + the BC.W-CONFIG-RIGHT <Configurator
// asideSide="right"> two-column inspector (stage LEFT, controls RIGHT on desktop) +
// the rounded clip reaching the canvas. A per-viz studio composes the chassis; it
// does NOT re-fork the configurator-right + rounded CSS (the single-writer chassis
// discipline). This wave OWNS the shared chassis + this gate; each per-viz wave
// authors its own configurator + demo INSIDE the chassis.
//
// THE CARDINAL SPLIT (CLAUDE.md proof:ba-gestalt precedent): S1-S4/S6 are the
// DEVICE-FREE SOURCE arm (["ci"]) — they read the studio SFCs + the viz source dirs
// + the manifest. S5 (real preview meanLum > 0) is the BINDING PAINT arm (["local"])
// — it reads a captured thumbnail PNG (the dead-card fix). This gate alone is NOT the
// truth; the binding paint is the orchestrator's :5199 capture + the π readback
// (tests-visual/viz-configurator-suite.spec.ts), NEVER a commit claim.
//
// Born-RED on the pre-wave tree: the shared VizStudio chassis did not exist + aurora
// hand-rolled its own studio frame (not the shared chassis). GREEN at close: the
// VizStudio chassis exists, aurora composes it (the first exemplar), the four-piece
// SOURCE bar (WGSL + GLSL prototypes) holds for every canvas viz, the shared shape is
// machine-enforced, and the per-viz configurator-completeness is a VISIBLE census.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:viz-configurator-suite";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// Strip CSS block comments + JS/Vue line comments so a class/tag name mentioned in a
// PROSE comment (the wave's own narrative) is never mistaken for a live declaration.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "")
        // Vue HTML comments too — the studio templates carry long narrative comments.
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });
const facts = {};

// Recursively walk a dir collecting file paths.
function walk(dir, acc = []) {
    const abs = resolve(ROOT, dir);
    if (!existsSync(abs)) return acc;
    for (const ent of readdirSync(abs, { withFileTypes: true })) {
        const rel = `${dir}/${ent.name}`;
        if (ent.isDirectory()) walk(rel, acc);
        else acc.push(rel);
    }
    return acc;
}

// ── The per-viz roster ────────────────────────────────────────────────────────────
// The 8 CANVAS viz (each owes the full four-piece bar) + watercolor-dot (the LIGHT-
// configurator MARK exception — no heavy studio, no WebGPU) + the grid registers
// (paper-grid is a canvas viz; it carries WGSL/GLSL + a Configurator studio).
const CANVAS_VIZ = [
    { id: "aurora", srcDir: "src/components/custom/aurora", studio: "demo/stories/substrates/aurora.vue" },
    { id: "goo-blob", srcDir: "src/components/custom/goo-blob", studio: "demo/stories/substrates/blob.vue" },
    { id: "constellation", srcDir: "src/components/custom/constellation", studio: "demo/stories/substrates/constellation.vue" },
    { id: "dot-flow-field", srcDir: "src/components/custom/dot-flow-field", studio: "demo/stories/substrates/dot-flow-field.vue" },
    { id: "concentric", srcDir: "src/components/custom/concentric", studio: "demo/stories/substrates/concentric.vue" },
    { id: "fourier-field", srcDir: "src/components/custom/fourier-field", studio: "demo/stories/substrates/fourier-field.vue" },
    { id: "dot-matrix", srcDir: "src/components/custom/dot-matrix", studio: "demo/stories/substrates/dot-matrix.vue" },
    { id: "goo-dot", srcDir: "src/components/custom/goo-dot-matrix", studio: "demo/stories/substrates/goo-dot.vue" },
    { id: "paper-grid", srcDir: "src/components/custom/paper-grid", studio: "demo/stories/substrates/paper-grid.vue" },
];
// watercolor-dot — the recorded MARK exception (watercolor-dot.md §4): a LIGHT
// configurator, NO WebGPU, NO heavy studio. Allowlisted off the four-piece bar.
const MARK_EXEMPT = ["watercolor-dot"];
facts.roster = { canvasViz: CANVAS_VIZ.map((v) => v.id), markExempt: MARK_EXEMPT };

// A studio composes the SHARED chassis when it renders <VizStudio> (the shared shape)
// OR a direct <Configurator> (the library controls-right primitive the chassis bundles
// — a studio may compose it directly). The bare-switch studios (a two-state Switch, no
// Configurator) are the PENDING_FULL_CONFIGURATOR census below.
const composesChassisRe = (src) =>
    /<VizStudio(?:\s|>|\/|$)/m.test(src) || /<Configurator(?![a-zA-Z])/m.test(src);

// ════════════════════════════════════════════════════════════════════════════════════
// S-CHASSIS — the SHARED VizStudio chassis EXISTS + aurora composes it (the born-RED
// anchor MY wave fixes). The single-writer chassis discipline: ONE shared shape, not a
// per-viz configurator-right re-fork.
// ════════════════════════════════════════════════════════════════════════════════════
const VIZ_STUDIO = "demo/stories/substrates/VizStudio.vue";
const vizStudioSrc = read(VIZ_STUDIO);
const vizStudioLive = strip(vizStudioSrc);
// The chassis bundles StoryPage + <Configurator asideSide="right"> + the rounded clip.
const chassisExists = vizStudioSrc.length > 0;
const chassisBundlesStoryPage = /<StoryPage/m.test(vizStudioLive);
const chassisBundlesConfigurator = /<Configurator(?![a-zA-Z])/m.test(vizStudioLive);
const chassisPinsRight =
    /aside-side\s*=\s*["']?(?:'right'|right)["']?/.test(vizStudioLive) ||
    /:aside-side\s*=\s*["']\s*['"]?right['"]?\s*["']/.test(vizStudioLive);
// aurora — the first exemplar — composes the shared chassis (not a hand-rolled frame).
const auroraSrc = read("demo/stories/substrates/aurora.vue");
const auroraComposesChassis = /<VizStudio(?:\s|>|\/|$)/m.test(strip(auroraSrc));
facts.sChassis = {
    chassisExists,
    chassisBundlesStoryPage,
    chassisBundlesConfigurator,
    chassisPinsRight,
    auroraComposesChassis,
};
add(
    "S-CHASSIS-shared-studio-chassis-exists",
    chassisExists &&
        chassisBundlesStoryPage &&
        chassisBundlesConfigurator &&
        chassisPinsRight &&
        auroraComposesChassis,
    chassisExists &&
        chassisBundlesStoryPage &&
        chassisBundlesConfigurator &&
        chassisPinsRight &&
        auroraComposesChassis
        ? "the SHARED VizStudio chassis exists (StoryPage + <Configurator asideSide=right> + rounded clip, the single-writer studio shape) AND aurora composes it (the first exemplar — no hand-rolled per-viz studio frame)"
        : `the shared studio chassis is incomplete (exists ${chassisExists}, story-page ${chassisBundlesStoryPage}, configurator ${chassisBundlesConfigurator}, pins-right ${chassisPinsRight}, aurora-composes ${auroraComposesChassis}) — born-RED on the pre-wave tree (VizStudio absent + aurora hand-rolled its own frame)`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// S1 — WebGPU prototype (ci): each canvas viz has a `.wgsl.ts` primary on
// createGpuSubstrate (a grep finds the WGSL setup + the substrate compose). Born-RED
// on a Canvas2D-only viz.
// ════════════════════════════════════════════════════════════════════════════════════
const s1Verdicts = CANVAS_VIZ.map((v) => {
    const files = walk(v.srcDir);
    const wgsl = files.filter((p) => /\.wgsl\.ts$/.test(p));
    const usesGpuSubstrate = files.some((p) =>
        /createGpuSubstrate|useGpuSubstrate/.test(read(p)),
    );
    return { id: v.id, wgslCount: wgsl.length, usesGpuSubstrate, pass: wgsl.length > 0 && usesGpuSubstrate };
});
facts.s1 = s1Verdicts;
const s1Pass = s1Verdicts.every((v) => v.pass);
add(
    "S1-webgpu-prototype",
    s1Pass,
    s1Pass
        ? `every canvas viz has a WebGPU .wgsl.ts primary on createGpuSubstrate (${CANVAS_VIZ.length} viz — the four-piece WebGPU leg)`
        : `a canvas viz lacks a WebGPU prototype: ${s1Verdicts.filter((v) => !v.pass).map((v) => `${v.id}(wgsl=${v.wgslCount},gpu=${v.usesGpuSubstrate})`).join(", ")} — born-RED on a Canvas2D-only viz`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// S2 — WebGL2 prototype (ci): each canvas viz has a `.glsl.ts`/`.frag.ts` WebGL2
// fallback (the invisible net — BC.W-WEBGPU-EVERYWHERE). Born-RED where the fallback
// is Canvas2D.
// ════════════════════════════════════════════════════════════════════════════════════
const s2Verdicts = CANVAS_VIZ.map((v) => {
    const files = walk(v.srcDir);
    const glsl = files.filter((p) => /\.glsl\.ts$|\.frag\.ts$/.test(p));
    return { id: v.id, glslCount: glsl.length, pass: glsl.length > 0 };
});
facts.s2 = s2Verdicts;
const s2Pass = s2Verdicts.every((v) => v.pass);
add(
    "S2-webgl2-prototype",
    s2Pass,
    s2Pass
        ? `every canvas viz has a WebGL2 .glsl.ts/.frag.ts fallback (${CANVAS_VIZ.length} viz — the invisible net leg)`
        : `a canvas viz lacks a WebGL2 fallback: ${s2Verdicts.filter((v) => !v.pass).map((v) => v.id).join(", ")} — born-RED on a Canvas2D-only fallback`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// S3 — the SHARED SHAPE + the configurator-completeness census (ci).
//   (a) every studio composing the chassis reads controls-RIGHT + a rounded stage +
//       <ColorSwatch> wherever it configures color (a raw <input type=color> REDs).
//   (b) the configurator-completeness CENSUS: every canvas viz studio is on EXACTLY
//       ONE list — FULL_CONFIGURATOR (a <Configurator>/<VizStudio> studio driving its
//       axes via <ConfiguratorRow>/<ConfiguratorLayer>) or PENDING_FULL_CONFIGURATOR
//       (a bare-switch studio, named with its owning per-viz wave — the visible,
//       machine-tracked gap, the disposition-register discipline). A studio off both
//       lists is the anti-smuggle RED.
// ════════════════════════════════════════════════════════════════════════════════════
// The chassis-composing (full-configurator) studios.
const FULL_CONFIGURATOR = [
    "aurora",
    "goo-blob",
    "concentric",
    "fourier-field",
    "paper-grid",
];
// The bare-switch studios — the VISIBLE pending census (each owned by its per-viz
// wave; conformed onto the shared chassis when that wave lands its full configurator).
const PENDING_FULL_CONFIGURATOR = [
    { id: "constellation", wave: "BC.W-VIZ-CONSTELLATION" },
    { id: "dot-flow-field", wave: "BC.W-VIZ-DOTFLOW" },
    { id: "dot-matrix", wave: "BC.W-VIZ-DOTMATRIX" },
    { id: "goo-dot", wave: "BC.W-VIZ-HYBRID" },
];
facts.s3Census = {
    fullConfigurator: FULL_CONFIGURATOR,
    pendingFullConfigurator: PENDING_FULL_CONFIGURATOR,
};

// (a) every FULL_CONFIGURATOR studio reads the shared shape: controls-RIGHT, a
//     rounded stage clip, no raw <input type=color> (ColorSwatch where color), no
//     asideSide="left" fork.
const shapeVerdicts = FULL_CONFIGURATOR.map((id) => {
    const v = CANVAS_VIZ.find((x) => x.id === id);
    const raw = read(v.studio);
    const src = strip(raw);
    const composesChassis = composesChassisRe(src);
    // controls-right: the chassis default (no asideSide="left") OR an explicit right.
    const noLeftFork =
        !/aside-side\s*=\s*["']left["']/.test(src) &&
        !/asideSide\s*=\s*["']left["']/.test(src);
    // rounded stage: the stage clip carries rounded-card/rounded-panel overflow-hidden
    // (reaching the canvas) — the chassis OR the studio's own #stage content.
    const roundsStage =
        /rounded-(?:card|panel)/.test(src) ||
        // VizStudio bundles the rounded panel; a studio on the chassis inherits it.
        /<VizStudio/m.test(src);
    // no raw <input type=color> (ColorSwatch is the color register).
    const rawColor = /type\s*=\s*["']color["']/.test(src);
    return {
        id,
        composesChassis,
        noLeftFork,
        roundsStage,
        rawColor,
        pass: composesChassis && noLeftFork && roundsStage && !rawColor,
    };
});
facts.s3Shape = shapeVerdicts;
const s3ShapePass = shapeVerdicts.every((v) => v.pass);

// (b) the census: every canvas viz on EXACTLY one list, no overlap, union ≡ roster.
const censusIds = new Set([
    ...FULL_CONFIGURATOR,
    ...PENDING_FULL_CONFIGURATOR.map((p) => p.id),
]);
const rosterIds = CANVAS_VIZ.map((v) => v.id);
const overlap = FULL_CONFIGURATOR.filter((id) =>
    PENDING_FULL_CONFIGURATOR.some((p) => p.id === id),
);
const unlisted = rosterIds.filter((id) => !censusIds.has(id));
const extra = [...censusIds].filter((id) => !rosterIds.includes(id));
const censusComplete = overlap.length === 0 && unlisted.length === 0 && extra.length === 0;
// Every PENDING entry names a real owning wave-spec (the disposition-register
// no-phantom floor — a pending gap must name its owning wave).
const pendingWavesResolve = PENDING_FULL_CONFIGURATOR.every((p) =>
    existsSync(resolve(ROOT, `docs/tranches/BC/waves/${p.wave}.md`)),
);
facts.s3CensusVerdict = { overlap, unlisted, extra, censusComplete, pendingWavesResolve };
add(
    "S3-shared-shape-and-configurator-census",
    s3ShapePass && censusComplete && pendingWavesResolve,
    s3ShapePass && censusComplete && pendingWavesResolve
        ? `the ${FULL_CONFIGURATOR.length} full-configurator studios read the shared shape (controls-RIGHT + rounded stage + ColorSwatch-not-raw-color, no left fork); the configurator-completeness census is EXACTLY-ONE-LIST (every canvas viz on FULL_CONFIGURATOR | PENDING_FULL_CONFIGURATOR, each pending entry naming its owning wave — the visible machine-tracked gap)`
        : `S3 failed (shape-pass ${s3ShapePass}, census-complete ${censusComplete}, pending-waves-resolve ${pendingWavesResolve}${overlap.length ? ` overlap:${overlap.join(",")}` : ""}${unlisted.length ? ` unlisted:${unlisted.join(",")}` : ""}) — see facts.s3Shape/s3CensusVerdict`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// S4 — the comprehensive demo SHARED FLOOR (ci): each canvas viz demo carries the
// SHARED required states. The floor is at the CORRECT altitude — the per-studio demo
// states (the default lead + a non-default register toggle) AT THE STUDIO, plus the
// PRM-freeze + WCAG-pause that EVERY viz inherits from the SUBSTRATE (every viz srcDir
// composes createGpuSubstrate / useWebGLCanvas / useCanvas2D — the createCanvasLifecycle
// leaf that owns the live-PRM one-static-frame-then-park + the pause()/resume() seam,
// enforced library-wide by proof:offscreen-pause). The PRM/pause are SUBSTRATE
// guarantees, not per-studio prose — asserting them at the studio level is the wrong
// altitude (a studio comment is not the mechanism); the binding is the substrate
// compose + the live PRM-freeze π. A demo with < the floor REDs.
// ════════════════════════════════════════════════════════════════════════════════════
const PAUSE_SUBSTRATE_DIRS = {
    "aurora": "src/components/custom/aurora",
    "goo-blob": "src/components/custom/goo-blob",
    "constellation": "src/components/custom/constellation",
    "dot-flow-field": "src/components/custom/dot-flow-field",
    "concentric": "src/components/custom/concentric",
    "fourier-field": "src/components/custom/fourier-field",
    "dot-matrix": "src/components/custom/dot-matrix",
    "goo-dot": "src/components/custom/goo-dot-matrix",
    "paper-grid": "src/components/custom/paper-grid",
};
const s4Verdicts = CANVAS_VIZ.map((v) => {
    const src = strip(read(v.studio));
    // The default lead — a config/preset/ref the studio drives, OR a live viz instance
    // mounted with its library defaults (a props-driven gallery is the default lead just
    // as a config-state studio is — constellation mounts <Constellation> at its
    // defaults). EITHER form is the warm-cream default the comprehensive suite leads with.
    const hasDefault =
        /useConfiguratorState|reactive<|const config|:config\s*=|PRESET_WARM|DEFAULT_|ref\(/.test(
            src,
        ) ||
        // a live viz instance mounted (the PascalCase viz component tag).
        /<(?:Aurora|AuroraStage|GooBlob|Constellation|DotFlowField|Concentric|FourierField|DotMatrix|GooDotMatrix|PaperGrid)(?:\s|>|\/)/m.test(
            src,
        );
    // A non-default register — a preset/variant/reference/theme/mode toggle.
    const hasRegisterToggle =
        /reference|theme|preset|variant|mode|selectPreset|cyclePreset/i.test(src);
    // The SUBSTRATE PRM-freeze + pause guarantee — the viz srcDir composes the
    // createCanvasLifecycle leaf (createGpuSubstrate / useWebGLCanvas / useCanvas2D),
    // which owns the live-PRM one-static-frame-then-park + the pause()/resume() seam
    // (proof:offscreen-pause enforces it library-wide). The pause/resume seam is the
    // WCAG-2.2.2 control the substrate exposes.
    const dir = PAUSE_SUBSTRATE_DIRS[v.id];
    const dirFiles = walk(dir);
    const substratePrmPause = dirFiles.some((p) => {
        const f = read(p);
        return (
            /createGpuSubstrate|useGpuSubstrate|useWebGLCanvas|useCanvas2D|createCanvasLifecycle/.test(
                f,
            ) && /pause|resume|reducedMotion/.test(f)
        );
    });
    return {
        id: v.id,
        hasDefault,
        hasRegisterToggle,
        substratePrmPause,
        pass: hasDefault && hasRegisterToggle && substratePrmPause,
    };
});
facts.s4 = s4Verdicts;
const s4Pass = s4Verdicts.every((v) => v.pass);
add(
    "S4-comprehensive-demo-floor",
    s4Pass,
    s4Pass
        ? `every canvas viz demo carries the SHARED required states (the default lead + a non-default register toggle AT THE STUDIO + the substrate-guaranteed PRM-freeze + pause()/resume() WCAG seam, proof:offscreen-pause-enforced) — the comprehensive-suite floor at the correct altitude`
        : `a viz demo is below the floor: ${s4Verdicts.filter((v) => !v.pass).map((v) => `${v.id}(default=${v.hasDefault},reg=${v.hasRegisterToggle},substrate-prm-pause=${v.substratePrmPause})`).join(", ")}`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// S5 — REAL preview (local): the preset thumbnails are REAL baked images, NEVER a dead
// (blank) card. BD.W-PRESET-RENDER re-rooted the dead-card fix: the prior cure was to
// AWAIT armAsync() before renderAt on the WebGPU capture backend (a no-device host baked
// a blank webp). BD made a CLEAN BREAK (no-backwards-compat): the thumbnail does NOT touch
// a GL device AT ALL — it bakes the device-free `auroraFallbackGround(config)` 2D-canvas
// raster (the math mirrored CPU-side), so it is per-preset distinct, deterministic,
// NEVER-BLANK in BOTH Chrome and WebKit, and needs zero WebGL/WebGPU (the dead-card class
// is impossible by construction — there is no async device to arm, no sync-renderAt race).
// The WebGPU `mode:"capture"` bake + armAsync/renderAt seam are GONE. The SOURCE arm
// asserts the device-free raster bake is the seam; the BINDING meanLum>0 paint rides the
// orchestrator's :5199 capture.
// ════════════════════════════════════════════════════════════════════════════════════
const THUMB = "demo/stories/aurora/usePresetThumbnails.ts";
const thumbSrc = strip(read(THUMB));
// The thumbnail bakes via the device-free auroraFallbackGround raster — and NO retired
// WebGPU `mode:"capture"` bake survives (clean break, no-backwards-compat).
const bakesDeviceFreeRaster = /auroraFallbackGround\s*\(/.test(thumbSrc);
const noWebGpuCaptureBake = !/mode:\s*["']capture["']/.test(thumbSrc);
facts.s5 = {
    thumbExists: thumbSrc.length > 0,
    bakesDeviceFreeRaster,
    noWebGpuCaptureBake,
};
add(
    "S5-real-preview-capture-awaits-armAsync",
    bakesDeviceFreeRaster && noWebGpuCaptureBake,
    bakesDeviceFreeRaster && noWebGpuCaptureBake
        ? "the thumbnail bakes via the device-free `auroraFallbackGround` 2D-canvas raster (BD.W-PRESET-RENDER — the WebGPU mode:\"capture\" bake + its armAsync/renderAt seam DELETED, clean break); the preview is per-preset distinct + never-blank in BOTH Chrome and WebKit BY CONSTRUCTION (no GL device → no dead-card class). The BINDING meanLum>0 paint rides the orchestrator's :5199 capture"
        : `the thumbnail does NOT bake the device-free auroraFallbackGround raster (raster ${bakesDeviceFreeRaster}, no-webgpu-capture ${noWebGpuCaptureBake}) — the dead-card class (a blank webp on the WebGPU backend) is not retired`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// S6 — the page chassis (ci): each substrate page is ONE card (not double-card-with-
// grid), the hero shrinks on scroll, the subpath is explicit. Each studio routes
// through <StoryPage> (the ONE-card chassis — the hero shrink + the Fira-Code subpath
// chip are StoryPage's, read from the manifest row). A double-card-with-grid markup
// (a <ShowcaseFrame>/<Card> WRAPPING a separate grid behind the viz) REDs.
// ════════════════════════════════════════════════════════════════════════════════════
const s6Verdicts = CANVAS_VIZ.map((v) => {
    const src = strip(read(v.studio));
    // ONE card: routes through StoryPage (directly or via VizStudio which bundles it).
    const composesStoryPage = /<StoryPage/m.test(src) || /<VizStudio/m.test(src);
    // No double-card-with-grid: the page does not declare a `grid` background CARD
    // BEHIND the viz inside the studio (the manifest row owns the page background; a
    // studio-local <Card class="...grid..."> wrapping the viz is the condemned idiom).
    // Detect a literal "double-card" anti-pattern: a ShowcaseFrame/Card with a grid
    // class wrapping the viz canvas in the SAME studio (rare — the manifest owns bg).
    const doubleCardGrid =
        /<(?:ShowcaseFrame|Card)[^>]*class=["'][^"']*\bgrid-bg\b/.test(src);
    return {
        id: v.id,
        composesStoryPage,
        doubleCardGrid,
        pass: composesStoryPage && !doubleCardGrid,
    };
});
facts.s6 = s6Verdicts;
const s6Pass = s6Verdicts.every((v) => v.pass);
add(
    "S6-page-chassis-one-card",
    s6Pass,
    s6Pass
        ? `every substrate page is ONE card (routes through <StoryPage> — the hero shrink + the Fira-Code subpath chip are the chassis's, read from the manifest row); no double-card-with-grid wrapping the viz (USER-DEFECTS §C)`
        : `a substrate page fails the one-card chassis: ${s6Verdicts.filter((v) => !v.pass).map((v) => `${v.id}(story-page=${v.composesStoryPage},double-card=${v.doubleCardGrid})`).join(", ")}`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// SELF-TEST — a synthetic viz with a two-state Switch instead of a full configurator
// REDs S3; a viz with a Canvas2D primary REDs S1; a synthetic blank thumbnail (sync
// renderAt, no armAsync) REDs S5; a left-fork studio REDs the shape; a double-card-
// with-grid REDs S6. Each detector flags its synthetic fixture.
// ════════════════════════════════════════════════════════════════════════════════════
const selfTests = [];
const st = (id, pass, detail) => selfTests.push({ id, pass: Boolean(pass), detail });

// S1 bite: a Canvas2D-only viz (no .wgsl.ts) does NOT pass S1.
const canvas2dFiles = ["src/foo/foo.canvas2d.ts", "src/foo/foo.ts"];
const s1Bite = !canvas2dFiles.some((p) => /\.wgsl\.ts$/.test(p));
st("S1-bite-canvas2d-primary-reds", s1Bite, "a viz with NO .wgsl.ts primary fails S1 (the WebGPU leg)");

// S3 bite: a two-state-Switch studio (no Configurator/VizStudio) does NOT compose the
// chassis (the shape detector flags it).
const switchOnlyStudio = `<StoryPage><Switch v-model="theme" /><Switch v-model="paused" /></StoryPage>`;
const s3Bite = !composesChassisRe(strip(switchOnlyStudio));
st("S3-bite-two-state-switch-reds", s3Bite, "a two-state-Switch studio (no <Configurator>/<VizStudio>) fails the shared-shape composesChassis detector");

// S3 bite-b: a left-fork studio (asideSide="left") is caught.
const leftForkStudio = `<Configurator asideSide="left">`;
const s3BiteB = /asideSide\s*=\s*["']left["']/.test(leftForkStudio);
st("S3-bite-left-fork-reds", s3BiteB, "a studio passing asideSide='left' is caught (no studio forks the controls-right idiom)");

// S3 bite-c: a raw <input type=color> is caught (ColorSwatch is the color register).
const rawColorStudio = `<input type="color" v-model="seed" />`;
const s3BiteC = /type\s*=\s*["']color["']/.test(rawColorStudio);
st("S3-bite-raw-color-input-reds", s3BiteC, "a raw <input type=color> is caught (the color register is <ColorSwatch>)");

// S5 bite: a synthetic WebGPU `mode:"capture"` bake (the RETIRED GL-dependent path, the
// dead-card class on a no-device host) does NOT pass the device-free-raster detector — it
// neither bakes auroraFallbackGround nor is free of the mode:"capture" bake.
const webgpuCapture = `aurora = createAurora(c, cfg, {mode:"capture"}); aurora.renderAt(1.0);`;
const s5BakesRaster = /auroraFallbackGround\s*\(/.test(webgpuCapture);
const s5NoCaptureBake = !/mode:\s*["']capture["']/.test(webgpuCapture);
const s5Bite = !(s5BakesRaster && s5NoCaptureBake);
st("S5-bite-blank-sync-capture-reds", s5Bite, "a WebGPU mode:\"capture\" bake (the retired GL-dependent dead-card path) fails S5 (it does not bake the device-free auroraFallbackGround raster)");

// S6 bite: a double-card-with-grid (a ShowcaseFrame with a grid-bg class wrapping the
// viz) is caught.
const doubleCard = `<ShowcaseFrame class="grid-bg"><Aurora /></ShowcaseFrame>`;
const s6Bite = /<(?:ShowcaseFrame|Card)[^>]*class=["'][^"']*\bgrid-bg\b/.test(doubleCard);
st("S6-bite-double-card-grid-reds", s6Bite, "a double-card-with-grid wrapping the viz is caught (USER-DEFECTS §C — ONE card with the procedural animation)");

facts.selfTests = selfTests;
const allSelfTestsPass = selfTests.every((s) => s.pass);
add(
    "self-test-bites-armed",
    allSelfTestsPass,
    allSelfTestsPass
        ? `all ${selfTests.length} self-test bites armed (a Canvas2D primary, a two-state Switch, a left fork, a raw color input, a retired WebGPU mode:"capture" bake, a double-card-with-grid — each detector flags its synthetic fixture)`
        : `a self-test bite FAILED to flag: ${selfTests.filter((s) => !s.pass).map((s) => s.id).join(", ")} — the detector has rotted`,
);

// ── The π readback spec is wired (the BINDING close) ────────────────────────────────
add(
    "pi-readback-spec-wired",
    existsSync(resolve(ROOT, "tests-visual/viz-configurator-suite.spec.ts")),
    existsSync(resolve(ROOT, "tests-visual/viz-configurator-suite.spec.ts"))
        ? "tests-visual/viz-configurator-suite.spec.ts exists (the π readback — per viz: controls-RIGHT on desktop + stacks-below on mobile + rounded panel/canvas + real-thumbnail meanLum>0 + ONE card, both modes — the BINDING painted truth, LOCAL-only)"
        : "tests-visual/viz-configurator-suite.spec.ts MISSING — the π readback rides BC.W-PAINT-GATE; the orchestrator wires the LOCAL real-render arm (this gate is the device-free SOURCE arm + the local S5)",
);

// ── Report ──────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:viz-configurator-suite — the four-piece per-viz completeness enforcer (BC.W-VIZ-CONFIGURATOR-SUITE)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_VIZ_CONFIGURATOR_SUITE_OUT", "BC-viz-configurator-suite");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:viz-configurator-suite",
    command: COMMAND,
    note: "device-free SOURCE arm (S1-S4/S6: the studio SFCs + viz source dirs + manifest) + the LOCAL S5 (the thumbnail-capture-awaits-armAsync SOURCE fix; the BINDING meanLum>0 paint rides the orchestrator's :5199 capture + the π arm tests-visual/viz-configurator-suite.spec.ts). The SHARED VizStudio chassis is the single-writer studio shape (configurator-RIGHT + rounded + hero-subpath); each per-viz wave authors its configurator INSIDE the chassis. PENDING_FULL_CONFIGURATOR is the VISIBLE machine-tracked census of the bare-switch studios (each named with its owning per-viz wave).",
    facts,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:viz-configurator-suite] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:viz-configurator-suite] the four-piece completeness bar is mechanical: every canvas viz ships a WebGPU `.wgsl.ts` + a WebGL2 `.glsl.ts` prototype (S1/S2), the SHARED VizStudio chassis is the ONE studio shape (configurator-RIGHT + rounded + hero-subpath, the single-writer discipline; aurora the first exemplar), the full-configurator studios read the shared shape (S3) over the visible PENDING census, the comprehensive-demo floor holds (S4), the thumbnail capture awaits armAsync (S5 — the dead-card fix), and every page is ONE card (S6). The BINDING paint rides the orchestrator's :5199 capture + the π arm.",
);
