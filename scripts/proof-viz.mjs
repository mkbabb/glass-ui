#!/usr/bin/env node
// proof:viz — FIVE disjoint arms on ONE gate:
//   • BG.W-DOTFLOW-REBUILD (SP1) — the shader-PI-scope compile-death arm: a viz shader that
//     INTERPOLATES the shared OKLCH_MATRICES chunk (whose `oklabToOklch` folds the hue on 2·PI)
//     MUST declare `PI` BEFORE the splice; a missing PI is a device-free COMPILE FAILURE that
//     leaves the fullscreen-fragment pass never-drawing → the wrapper's warm-near-black CSS floor
//     shows as a DEAD plate (the W-DOTFLOW-REBUILD paint-DELTA: flat ~6-luma, motion 0, both
//     engines). Born-RED on HEAD (flow-field.{glsl,wgsl}.ts splice the matrices with no PI) →
//     GREEN when PI lands before each splice. The headless-green/visually-broken gap the source
//     structure gates S1-S6 could not catch (ψ round-trips, yet neither backend DRAWS).
//   • BG.W-VIZ-RESIZE-ADOPT (V1-V5) — the viz-resize-UPLOAD-ONLY source gate
//     (born-RED on HEAD — every viz self-measured the backing → GREEN at the hard-adopt).
//   (BG.W-GOODOT-SETUP-SPLIT G1-G3 RETIRED at BG.W-GOODOT-PRUNE — the goo-dot-matrix viz
//     is DEFINITION-ABSENT (0 external consumers); the setup-split carve is superseded by
//     the whole-dir deletion. The DEFINITION-ABSENT survivor tooth lives in proof:viz-hybrid.)
//   • BG.W-VIZ-PREVIEW-LIVE (P1-P4) — the per-STORY distinct-preview-still source gate:
//     the /substrates bento painted 11 IDENTICAL frozen aurora stills (every card shared
//     the ONE category `fieldStill`); the cure is a per-story dispatch off the colocated
//     `demo/chassis/landing/vizPreviewStill.ts` registry so per-card pixel-hash differs BY
//     CONSTRUCTION over ZERO live GL contexts (born-RED on HEAD — the registry + the
//     SectionPreviewCard import do not exist). The LIVE per-card-pixel-hash paint is the
//     orchestrator's real-device capture, NOT this gate (the cardinal source/paint split).
//   • BG.W-VIZ-REVEAL-BLOOM (R1-R8) — the one-shot cold-first-VISIBLE entrance-bloom
//     source gate. A procedural-viz CANVAS blooms into being: `@keyframes
//     substrate-reveal-bloom` (viz-reveal.css) ramps `filter: brightness()/saturate()`
//     from a dim floor, OVERSHOOTS past 1.0 on the `--ease-cartoon-punch` linear() curve
//     (the EFFECTS-channel sanctioned overshoot — opacity clamps at 1.0, only
//     filter:brightness can exceed the settle), then settles to the canvas's own
//     no-resting-filter rest. The LEAF (createCanvasLifecycle.ts) sets a one-shot
//     `data-substrate-reveal` attr at FIRST-VISIBLE (a dedicated one-shot IO — never at
//     arm(), which a content-skipped viz would burn invisibly), `revealFired`-guarded
//     (zero second bloom). Born-RED on HEAD: the keyframe + `--substrate-reveal-duration`
//     token do NOT exist, the leaf writes the DEAD `--substrate-reveal-t` scalar the
//     never-landed shader was to read, and no viz opts in. useVizChoreography.ts stays
//     DEFINITION-ABSENT. The deterministic brightness-overshoot PAINT rides the
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
// BG.W-COLOCATE — the ONE sizer (`sizeBacking`, V1/V5) is carved into `backingSize.ts`
// and the reveal-bloom attr mechanism (`data-substrate-reveal`/`armRevealBloom`, R5/R6)
// into `visibility.ts`; the scheduler composes both. The V1/V5/R5/R6 leaf reads use the
// UNION so they follow the carve into the leaves (the "asserts follow the composition"
// precedent). `sizeAndUpload`'s `sizeBacking(canvas, dprPolicy)` call (V5) stays in the
// scheduler; the union is a superset so the call still resolves.
const BACKING_LEAF = resolve(
    ROOT,
    "src/composables/glass/webgl/backingSize.ts",
);
const VISIBILITY_LEAF = resolve(
    ROOT,
    "src/composables/glass/webgl/visibility.ts",
);
// BG.W-VIZ-PREVIEW-LIVE — the per-story preview-still surface (the SectionPreviewCard
// dispatch + its colocated distinct-still registry). The preview arm (P1-P4) shares
// this gate with the resize-upload-only arm (V1-V5); the two are disjoint file sets.
const CARD = resolve(ROOT, "demo/chassis/landing/SectionPreviewCard.vue");
const STILL = resolve(ROOT, "demo/chassis/landing/vizPreviewStill.ts");
// BG.W-VIZ-REVEAL-BLOOM — the one-shot cold-first-VISIBLE entrance bloom (R1-R8).
// The CSS-filter recipe + its minted duration token + the LEAF attr mechanism +
// the aurora opt-in anchor + the useVizChoreography DEFINITION-ABSENT verify.
const REVEAL_CSS = resolve(ROOT, "src/styles/viz-reveal.css");
const MOTION_CSS = resolve(ROOT, "src/styles/tokens/scheme-motion.css");
const VIZ_CHOREO = resolve(ROOT, "src/composables/glass/useVizChoreography.ts");
// The reference/paint-anchor viz that must opt into the bloom (R7).
const AURORA_REVEAL_ANCHOR = "aurora/composables/runtime.ts";

// BG.W-FOURIER-BEAUTY (F9.R7) — the fourier-field visual-excellence arm (FB1-FB3). The
// shaders/constants/math/bridge/composable are `.ts` under fourier-field/ (in the `files`
// map); the SFC is `.vue` (read by path). The FB arm reads these by their rel keys +
// this path.
const FF_SFC = resolve(ROOT, "src/components/custom/fourier-field/FourierField.vue");
// The fourier-field file rel-keys inside the `files` map (relative to CUSTOM).
const FF_CONSTANTS = "fourier-field/constants.ts";
const FF_MATH = "fourier-field/math.ts";
const FF_BRIDGE = "fourier-field/composables/uniformBridgeWGPU.ts";
const FF_COMPOSABLE = "fourier-field/composables/useFourierField.ts";
const FF_GLSL = "fourier-field/shaders/fourier-field.glsl.ts";
const FF_WGSL = "fourier-field/shaders/fourier-field.render.wgsl.ts";

// The 8 procedural viz whose resize/render is HARD-ADOPTED upload-only.
// (goo-dot-matrix RETIRED at BG.W-GOODOT-PRUNE — 0 external consumers; the hybrid's
// two halves survive it: goo-blob FIELD donor + dot-matrix RENDER.)
const VIZ_DIRS = [
    "aurora",
    "goo-blob",
    "dot-matrix",
    "dot-flow-field",
    "fourier-field",
    "constellation",
    "concentric",
    "liquid-grid",
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

/**
 * The FIRST numeric literal bound to `name` across the forms the FB arm reads — the GLSL
 * `#define name 0.4`, the WGSL `const name: f32 = 0.4`, the TS `const name = 0.4`, and the TS
 * object-property `name: 5`. The optional `: <type>` annotation (WGSL `f32`, TS `number`) is
 * skipped by a LETTER-led type token so the `32` in `f32` is not mis-captured. Returns `null`
 * if `name` is never bound to a literal (a derived `= a / b` expression yields no first-bind
 * literal — the FB arm asserts the DERIVATION structure separately). Used to cross-check the
 * shader-mirrored `RIBBON_TAIL_FRAC` equals the TS constant.
 */
function firstNum(src, name) {
    const def = src.match(new RegExp("#define\\s+" + name + "\\b\\s+(-?[0-9]+(?:\\.[0-9]+)?)"));
    if (def) return Number(def[1]);
    const m = src.match(
        new RegExp(
            name + "\\b\\s*(?::\\s*[A-Za-z][\\w<>]*)?\\s*[:=]\\s*(-?[0-9]+(?:\\.[0-9]+)?)",
        ),
    );
    return m ? Number(m[1]) : null;
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
        over.__leaf !== undefined
            ? over.__leaf
            : `${read(LEAF) ?? ""}\n${read(BACKING_LEAF) ?? ""}\n${read(VISIBILITY_LEAF) ?? ""}`,
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
    if (entries.length < 10)
        fails.push(
            `P1: the vizPreviewStill registry has ${entries.length} route entries (<10) — the per-story dispatch is absent (born-RED: on HEAD the module + registry do not exist; goo-dot RETIRED at BG.W-GOODOT-PRUNE, 11→10 substrates)`,
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

    // ══ REVEAL-BLOOM ARM (BG.W-VIZ-REVEAL-BLOOM) — the one-shot cold-first-VISIBLE ══
    // procedural-viz entrance. A CSS @keyframes ramps `filter: brightness()` from a dim
    // floor, OVERSHOOTS past 1.0 via the --ease-cartoon-punch linear() curve (the
    // EFFECTS-channel sanctioned overshoot — opacity clamps at 1.0, only filter:brightness
    // can exceed the settle), then settles to the canvas's own no-resting-filter rest. The
    // LEAF sets a one-shot `data-substrate-reveal` attr at FIRST-VISIBLE (a dedicated IO),
    // never at arm(). Born-RED on HEAD: the keyframe + the token do NOT exist, the leaf
    // writes the DEAD `--substrate-reveal-t` scalar the never-landed shader was to read,
    // and no viz opts in.
    const revealCss = stripComments(
        over.__reveal !== undefined ? over.__reveal : (read(REVEAL_CSS) ?? ""),
    );
    const motionCss = stripComments(
        over.__motion !== undefined ? over.__motion : (read(MOTION_CSS) ?? ""),
    );
    const choreoExists =
        over.__choreo !== undefined ? over.__choreo : existsSync(VIZ_CHOREO);

    // R1 — the @keyframes substrate-reveal-bloom animates `filter: brightness()`.
    if (!/@keyframes\s+substrate-reveal-bloom\b/.test(revealCss))
        fails.push(
            "R1: `@keyframes substrate-reveal-bloom` is absent from viz-reveal.css — the reveal recipe does not exist (born-RED on HEAD)",
        );
    else if (!/filter\s*:\s*brightness\s*\(/.test(revealCss))
        fails.push(
            "R1: `@keyframes substrate-reveal-bloom` does not animate `filter: brightness()` — only filter:brightness can overshoot past the 1.0 settle (opacity clamps at 1.0)",
        );

    // R2 — the recipe targets the CANVAS (goo-blob's resting drop-shadow lives on its
    //      WRAPPER; a host-target would collide) AND rides --ease-cartoon-punch (the ONLY
    //      curve that carries brightness past 1.0).
    if (!/canvas\[data-substrate-reveal\]/.test(revealCss))
        fails.push(
            "R2: the reveal recipe does not target `canvas[data-substrate-reveal]` — it must target the CANVAS, not a `.viz-canvas-host` wrapper (the goo-blob wrapper drop-shadow collision)",
        );
    if (!/var\(--ease-cartoon-punch\)/.test(revealCss))
        fails.push(
            "R2: the reveal `animation` does not ride `var(--ease-cartoon-punch)` — the overshoot past 1.0 comes ONLY from that linear() curve; a plain ease cannot bloom",
        );

    // R3 — the duration is the minted token (token-first), read as a var() (not inline `Nms`).
    if (!/--substrate-reveal-duration\s*:/.test(motionCss))
        fails.push(
            "R3: `--substrate-reveal-duration` is not minted in scheme-motion.css — the entrance rate must be ONE consumer knob, not an inline literal",
        );
    if (!/var\(--substrate-reveal-duration\)/.test(revealCss))
        fails.push(
            "R3: the reveal `animation` does not read `var(--substrate-reveal-duration)` — the duration must be the token, not an inline `ms`",
        );

    // R4 — the animation is PRM-gated: no `animation:` may sit BEFORE the
    //      no-preference gate (an unconditional bloom runs under reduce).
    {
        const prmIdx = revealCss.search(
            /@media\s*\(\s*prefers-reduced-motion\s*:\s*no-preference\s*\)/,
        );
        const animMatches = [...revealCss.matchAll(/animation\s*:/g)];
        if (prmIdx < 0)
            fails.push(
                "R4: no `@media (prefers-reduced-motion: no-preference)` gate around the reveal — PRM must snap the field to instant-settled (no luminance ramp)",
            );
        if (animMatches.length === 0)
            fails.push(
                "R4: the reveal recipe declares no `animation:` — the bloom never runs",
            );
        else if (prmIdx >= 0 && animMatches.some((m) => m.index < prmIdx))
            fails.push(
                "R4: an `animation:` sits BEFORE the no-preference gate (unconditional) — the bloom must NOT run under `prefers-reduced-motion: reduce`",
            );
    }

    // R5 — the LEAF drives the one-shot via the `data-substrate-reveal` ATTRIBUTE and does
    //      NOT write the DEAD `--substrate-reveal-t` scalar (the never-landed shader read).
    if (!/data-substrate-reveal/.test(leaf))
        fails.push(
            "R5: createCanvasLifecycle.ts does not set the `data-substrate-reveal` attr — the reveal has not migrated to the CSS-filter attr path (born-RED: on HEAD the leaf writes the dead scalar)",
        );
    if (/--substrate-reveal-t\b/.test(leaf))
        fails.push(
            "R5: createCanvasLifecycle.ts still writes the DEAD `--substrate-reveal-t` scalar — no shader ever read it (the no-op mechanism); the attr path is the SOLE reveal source",
        );

    // R6 — the leaf fires at FIRST-VISIBLE, not at arm(): the reveal path composes a
    //      dedicated one-shot IntersectionObserver (`revealIo`) + the `revealFired` guard.
    if (!/armRevealBloom/.test(leaf))
        fails.push(
            "R6: createCanvasLifecycle.ts has no `armRevealBloom` — the first-visible reveal gate is absent (a bloom fired at arm() burns its one-shot on a content-skipped invisible paint)",
        );
    if (!/revealIo\b/.test(leaf))
        fails.push(
            "R6: the reveal path has no dedicated one-shot `revealIo` IntersectionObserver — the bloom must gate on the FIRST-VISIBLE transition, not fire at arm()",
        );
    if (!/revealFired\b/.test(leaf))
        fails.push(
            "R6: the reveal has no `revealFired` one-shot guard — an IO/CV re-reveal would fire a second bloom on scroll-off-and-back",
        );

    // R7 — the reference/paint-anchor viz (aurora) OPTS IN (`revealBloom: true`), so the
    //      mechanism is ENGAGED, not shipped-but-unconsumed shelf-ware.
    const auroraSrc = files[AURORA_REVEAL_ANCHOR] ?? "";
    if (!/revealBloom\s*:\s*true/.test(auroraSrc))
        fails.push(
            "R7: the aurora runtime (the reference/paint-anchor viz) does not pass `revealBloom: true` — the entrance bloom is shipped-but-unconsumed shelf-ware (born-RED: on HEAD no viz opts in)",
        );

    // R8 — useVizChoreography.ts is DEFINITION-ABSENT (the wave's explicit verify — the dead
    //      viz-entrance-choreography leaf, deleted at BG.W-DEAD-COMPOSABLE-CUT; the reveal-
    //      bloom is the CSS-filter successor, NOT a re-mint).
    if (choreoExists)
        fails.push(
            "R8: src/composables/glass/useVizChoreography.ts EXISTS — the dead viz-entrance-choreography leaf must stay DEFINITION-ABSENT (the CSS-filter reveal-bloom is its successor)",
        );

    // ══ SHADER-PI-SCOPE ARM (BG.W-DOTFLOW-REBUILD) — the splices-OKLCH-but-no-PI compile-death ══
    // The dot-flow-field fullscreen-fragment shaders INTERPOLATE the shared OKLCH_MATRICES chunk
    // (`${OKLCH_MATRICES_GLSL}` / `${OKLCH_MATRICES_WGSL}`), which inherits the chunk's
    // `oklabToOklch` — and that folds the hue on `2·PI`. So each ASSEMBLED dot-flow shader MUST
    // declare `PI` IN-FILE, BEFORE the splice (procedural-color.{glsl,wgsl}.ts record it verbatim:
    // "the consumer splices the matrices chunk + defines PI first"). A missing `PI` is a
    // DEVICE-FREE COMPILE FAILURE: the WHOLE program never links (undeclared identifier), the
    // fullscreen-fragment pass never draws, and the wrapper's warm-near-black CSS floor shows as a
    // DEAD plate — the W-DOTFLOW-REBUILD paint-DELTA verbatim (flat ~6-luma, motion 0, pointer 0,
    // BOTH engines, BOTH modes; the headless-green/visually-broken gap the source structure gates
    // S1-S6 could not see, since ψ round-trips fine yet NEITHER backend DRAWS). Born-RED on HEAD:
    // flow-field.{glsl,wgsl}.ts splice the matrices but define no PI → GREEN when `#define PI` /
    // `const PI` lands before each splice.
    //
    // SCOPED to the dot-flow-field shaders (`dot-flow-field/shaders/`): they define their uniforms
    // INLINE and splice ONLY OETF + OKLCH, so an IN-FILE PI-before-splice is the exact contract.
    // The general library case is NOT this check — a sibling viz shader may legitimately inherit PI
    // from a spliced sub-chunk (metaball.frag.ts pulls PI from `${METABALL_UNIFORMS_GLSL}`), so a
    // blanket "literal PI in-file" assert would FALSE-RED that honest pattern.
    const PI_GLSL = /#define\s+PI\b|const\s+float\s+PI\b/;
    const PI_WGSL = /const\s+PI\s*[:=]/;
    for (const [rel, src] of Object.entries(files)) {
        if (!rel.startsWith("dot-flow-field/shaders/")) continue;
        const glSplice = src.indexOf("${OKLCH_MATRICES_GLSL}");
        if (glSplice >= 0) {
            const m = src.match(PI_GLSL);
            const piIdx = m ? src.indexOf(m[0]) : -1;
            if (piIdx < 0 || piIdx > glSplice)
                fails.push(
                    `SP1: ${rel} splices \${OKLCH_MATRICES_GLSL} but declares no \`#define PI\`/\`const float PI\` BEFORE it — the chunk's oklabToOklch references PI, so the whole GLSL program fails to COMPILE and the fragment never draws (the dead-plate paint-DELTA class)`,
                );
        }
        const wgSplice = src.indexOf("${OKLCH_MATRICES_WGSL}");
        if (wgSplice >= 0) {
            const m = src.match(PI_WGSL);
            const piIdx = m ? src.indexOf(m[0]) : -1;
            if (piIdx < 0 || piIdx > wgSplice)
                fails.push(
                    `SP1: ${rel} splices \${OKLCH_MATRICES_WGSL} but declares no \`const PI\` BEFORE it — the chunk's oklabToOklch references PI, so the WGSL module fails to CREATE and the fragment paints nothing (the dead-plate paint-DELTA class)`,
                );
        }
    }

    // ══ FOURIER-BEAUTY ARM (BG.W-FOURIER-BEAUTY / F9.R7) — the fourier-field visual pass ══
    // The de-migrated fourier-field renders "correctly" (6.3's floor) but reads BORING with
    // ABYSMAL mouse tracking + a thin hairline stroke. This arm locks the THREE excellence
    // deliverables device-free (the BEAUTY gestalt rides the paint judge, the cardinal split):
    //   FB1 — the THICK luminous RIBBON: a head→tail TAPERED stroke (RIBBON_TAIL_FRAC, MIRRORED
    //         into BOTH shaders + cross-checked equal) + a soft UNDER-GLOW layer + the mid-body
    //         ≥2.5px CSS floor (RIBBON_HEAD_FLOOR_PX derived from RIBBON_MID_FLOOR_PX, applied
    //         in trailWidthToModel). Born-RED: HEAD paints a uniform hairline (halfW), no taper.
    //   FB2 — BEAUTIFUL closed figures: makeHarmonicFigure + a ≥4-entry FOURIER_FIGURES catalogue
    //         of INTEGER-index recipes (integer indices → the sum CLOSES by construction) + the
    //         SFC source→figure dispatch. Born-RED: HEAD has only the random elliptic scribble.
    //   FB3 — REAL pointer tracking: getPointerLean reads the critically-damped smoothedPosition
    //         in the CORRECT coord space (fit scale + backing aspect), bounded by FOLLOW_REACH
    //         (the 0.12 FOLLOW_LEAN whisper RETIRED), no headT=pointer snap, no second rAF.
    //         Born-RED: HEAD has the FOLLOW_LEAN whisper (wrong frame + wrong y sign).
    {
        const consts = files[FF_CONSTANTS] ?? "";
        const math = files[FF_MATH] ?? "";
        const bridge = files[FF_BRIDGE] ?? "";
        const composable = files[FF_COMPOSABLE] ?? "";
        const glsl = files[FF_GLSL] ?? "";
        const wgsl = files[FF_WGSL] ?? "";
        const sfc = stripComments(
            over.__ffsfc !== undefined ? over.__ffsfc : (read(FF_SFC) ?? ""),
        );

        // ── FB1 — the thick tapered ribbon + under-glow + mid-body floor ──
        const tailFrac = firstNum(consts, "RIBBON_TAIL_FRAC");
        const midFloor = firstNum(consts, "RIBBON_MID_FLOOR_PX");
        if (tailFrac === null || tailFrac <= 0 || tailFrac >= 1)
            fails.push(
                "FB1: constants.ts declares no valid `RIBBON_TAIL_FRAC` (0..1) — the ribbon taper register is absent (born-RED: HEAD paints a uniform-width stroke)",
            );
        if (midFloor === null || midFloor < 2.5)
            fails.push(
                "FB1: `RIBBON_MID_FLOOR_PX` is absent or < 2.5 — the mid-body must clear ≥2.5px CSS (never a 1px hairline polyline)",
            );
        if (!/RIBBON_MID_TAPER_FRAC\s*=\s*RIBBON_TAIL_FRAC\s*\+\s*\(1\s*-\s*RIBBON_TAIL_FRAC\)\s*\*\s*0\.5/.test(consts))
            fails.push(
                "FB1: `RIBBON_MID_TAPER_FRAC` is not derived `RIBBON_TAIL_FRAC + (1 - RIBBON_TAIL_FRAC) * 0.5` — the mid-taper must track the tail frac",
            );
        if (!/RIBBON_HEAD_FLOOR_PX\s*=\s*RIBBON_MID_FLOOR_PX\s*\/\s*RIBBON_MID_TAPER_FRAC/.test(consts))
            fails.push(
                "FB1: `RIBBON_HEAD_FLOOR_PX` is not derived `RIBBON_MID_FLOOR_PX / RIBBON_MID_TAPER_FRAC` — the head floor must guarantee the mid-body clears the CSS floor by construction",
            );
        // The floor is APPLIED in trailWidthToModel (both setups call it — the DRY single site).
        if (!/RIBBON_HEAD_FLOOR_PX/.test(bridge) || !/Math\.max\(\s*trailWidthPx\s*,\s*RIBBON_HEAD_FLOOR_PX\s*\)/.test(bridge))
            fails.push(
                "FB1: trailWidthToModel does not clamp `Math.max(trailWidthPx, RIBBON_HEAD_FLOOR_PX)` — the mid-body floor is not applied (a `trailWidth: 1` would paint a hairline)",
            );
        // The default config is a THICK ribbon head.
        const defW = firstNum(consts, "trailWidth");
        if (defW === null || defW < 4)
            fails.push(
                `FB1: DEFAULT_FOURIER_CONFIG.trailWidth is ${defW ?? "absent"} (<4) — the default is not a THICK luminous ribbon`,
            );
        // BOTH shader twins carry the taper + under-glow, MIRRORING the TS tail frac.
        for (const [label, src] of [["GLSL", glsl], ["WGSL render", wgsl]]) {
            const shaderTail = firstNum(src, "RIBBON_TAIL_FRAC");
            if (shaderTail === null)
                fails.push(
                    `FB1: the ${label} shader declares no \`RIBBON_TAIL_FRAC\` — the head→tail taper is absent (born-RED: HEAD paints a uniform \`halfW\` stroke)`,
                );
            else if (tailFrac !== null && Math.abs(shaderTail - tailFrac) > 1e-6)
                fails.push(
                    `FB1: the ${label} shader's RIBBON_TAIL_FRAC (${shaderTail}) DRIFTS from constants.ts (${tailFrac}) — the mid-body floor guarantee breaks if the taper diverges`,
                );
            if (!/ribbonHalf\s*=\s*halfW\s*\*\s*\(\s*RIBBON_TAIL_FRAC/.test(src))
                fails.push(
                    `FB1: the ${label} shader has no age-scaled \`ribbonHalf = halfW * (RIBBON_TAIL_FRAC + …)\` taper — the stroke is a uniform hairline, not a tapered ribbon`,
                );
            if (!/RIBBON_UNDERGLOW_SCALE/.test(src) || !/RIBBON_UNDERGLOW_ALPHA/.test(src) || !/glowHalf\s*=\s*ribbonHalf\s*\*\s*RIBBON_UNDERGLOW_SCALE/.test(src))
                fails.push(
                    `FB1: the ${label} shader paints no soft UNDER-GLOW (\`glowHalf = ribbonHalf * RIBBON_UNDERGLOW_SCALE\`) — the luminous ribbon halo is absent`,
                );
        }

        // ── FB2 — the beautiful closed-figure family ──
        if (!/export function makeHarmonicFigure\b/.test(math))
            fails.push(
                "FB2: math.ts exports no `makeHarmonicFigure` — the coefficient-driven closed-figure primitive is absent (born-RED: HEAD has only the random elliptic scribble)",
            );
        const figBlock = (math.match(/FOURIER_FIGURES[\s\S]*?\n\};/) || [""])[0];
        const figEntries = [...figBlock.matchAll(/(\w[\w-]*)\s*:\s*\[/g)].map((m) => m[1]);
        if (!/export const FOURIER_FIGURES\b/.test(math) || figEntries.length < 4)
            fails.push(
                `FB2: FOURIER_FIGURES has ${figEntries.length} recipes (<4) — the deliberate-figure family (fourier flowers / closed epicycles) is incomplete`,
            );
        // Every phasor index is an INTEGER (a non-integer index would NOT close — a scribble).
        if (/index\s*:\s*-?\d+\.\d/.test(figBlock))
            fails.push(
                "FB2: a FOURIER_FIGURES recipe carries a NON-INTEGER `index` — an integer index is the period-1 closure fence (a fractional index draws an OPEN scribble)",
            );
        // The SFC dispatches a `source` naming a figure → the figure spectrum.
        if (!/makeHarmonicFigure\s*\(/.test(sfc) || !/FOURIER_FIGURES\[/.test(sfc))
            fails.push(
                "FB2: FourierField.vue does not dispatch `source` → `makeHarmonicFigure(FOURIER_FIGURES[…])` — a curated figure is unreachable via config",
            );

        // ── FB3 — the real critically-damped follow (no snap, no second rAF) ──
        if (!/export const FOLLOW_REACH\b/.test(consts))
            fails.push(
                "FB3: constants.ts declares no `FOLLOW_REACH` — the real follow depth is absent (born-RED: HEAD carries the 0.12 FOLLOW_LEAN whisper)",
            );
        if (/FOLLOW_LEAN\b/.test(consts) || /FOLLOW_LEAN\b/.test(composable))
            fails.push(
                "FB3: the retired `FOLLOW_LEAN` whisper survives — the clean break requires it GONE (the 12% pan that never reached the cursor)",
            );
        // getPointerLean reads the critically-damped smoothed pointer in the CORRECT coord
        // space (the fit scale + the BACKING aspect — dpr/scroll-safe), bounded by FOLLOW_REACH.
        for (const [tok, why] of [
            ["FOLLOW_REACH", "the bounded reach"],
            ["smoothedPosition", "the critically-damped pointer (no snap by construction)"],
            ["ensureFit().scale", "the fit scale (correct model→clip space)"],
            ["canvas.width", "the BACKING aspect (dpr/scroll-safe box↔backing mapping)"],
        ]) {
            if (!composable.includes(tok))
                fails.push(
                    `FB3: getPointerLean does not read \`${tok}\` — ${why} is missing from the follow`,
                );
        }
        // The retired headT=pointer SNAP class stays dead (a direct headT set from a pointer coord).
        if (/headT\s*=\s*[^;\n]*\b(pointer|position\.value\.x|sp\.x)\b/.test(composable))
            fails.push(
                "FB3: a `headT = <pointer coord>` SNAP survives in useFourierField.ts — the teleport class stays dead (the velocity SCRUB integrates headT, it never snaps to an absolute pointer position)",
            );
        // NO second rAF (the one-loop discipline — the field is fed by the ONE onFrame tick).
        if (/requestAnimationFrame\s*\(/.test(composable))
            fails.push(
                "FB3: useFourierField.ts owns a `requestAnimationFrame` — the viz renderer owns the ONE loop; the follow is fed by onFrame's `pointer.tick` (a second rAF breaks proof:offscreen-pause)",
            );
        if (!/pointer\.tick\s*\(/.test(composable))
            fails.push(
                "FB3: useFourierField.ts does not feed `pointer.tick(...)` from onFrame — the shared field (+ its tick(0) PRM freeze) is not advanced",
            );
    }

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

    // ── REVEAL-BLOOM bites (BG.W-VIZ-REVEAL-BLOOM) ──
    // A valid reveal recipe the bites break ONE witness at a time.
    const validReveal =
        "@keyframes substrate-reveal-bloom { from { filter: brightness(0.4); } to { filter: brightness(1); } }\n" +
        "@media (prefers-reduced-motion: no-preference) { canvas[data-substrate-reveal] { animation: substrate-reveal-bloom var(--substrate-reveal-duration) var(--ease-cartoon-punch); } }";

    // (m) a reveal css with NO @keyframes reds R1.
    const m = runAll({
        __reveal:
            "@media (prefers-reduced-motion: no-preference) { canvas[data-substrate-reveal] { animation: foo var(--substrate-reveal-duration) var(--ease-cartoon-punch); } }",
    });
    if (!m.some((v) => v.startsWith("R1")))
        fails.push("self-test: a reveal css with no @keyframes did NOT red R1");

    // (n) a reveal recipe targeting a HOST (not the canvas) reds R2 (the goo-blob collision).
    const n = runAll({
        __reveal: validReveal.replace(
            "canvas[data-substrate-reveal]",
            ".viz-canvas-host[data-substrate-reveal]",
        ),
    });
    if (!n.some((v) => v.startsWith("R2")))
        fails.push("self-test: a reveal recipe targeting a host (not the canvas) did NOT red R2");

    // (o) an INLINE-duration reveal recipe (no var(--substrate-reveal-duration)) reds R3.
    const o = runAll({
        __reveal: validReveal.replace(
            "var(--substrate-reveal-duration)",
            "1100ms",
        ),
    });
    if (!o.some((v) => v.startsWith("R3")))
        fails.push("self-test: an inline-duration reveal recipe did NOT red R3");

    // (p) an unconditional `animation:` BEFORE the PRM gate reds R4.
    const p = runAll({
        __reveal:
            "@keyframes substrate-reveal-bloom { from { filter: brightness(0.4); } to { filter: brightness(1); } }\n" +
            "canvas[data-substrate-reveal] { animation: substrate-reveal-bloom var(--substrate-reveal-duration) var(--ease-cartoon-punch); }\n" +
            "@media (prefers-reduced-motion: no-preference) { canvas { color: red; } }",
    });
    if (!p.some((v) => v.startsWith("R4")))
        fails.push("self-test: an unconditional reveal animation before the PRM gate did NOT red R4");

    // (q) a leaf writing the DEAD `--substrate-reveal-t` scalar reds R5.
    const q = runAll({ __leaf: "canvas.style.setProperty('--substrate-reveal-t','1');" });
    if (!q.some((v) => v.startsWith("R5")))
        fails.push("self-test: a leaf writing the dead --substrate-reveal-t scalar did NOT red R5");

    // (r) a leaf with the attr but NO armRevealBloom/revealIo reds R6 (fire-at-first-visible gone).
    const r = runAll({ __leaf: "canvas.setAttribute('data-substrate-reveal','');" });
    if (!r.some((v) => v.startsWith("R6")))
        fails.push("self-test: a leaf with no armRevealBloom/revealIo did NOT red R6");

    // (s) the aurora anchor with NO `revealBloom: true` reds R7 (shipped-but-unconsumed).
    const s = runAll({
        [AURORA_REVEAL_ANCHOR]:
            "handle = createGpuSubstrate(canvas, { dprPolicy: resolveBudgetDpr });",
    });
    if (!s.some((v) => v.startsWith("R7")))
        fails.push("self-test: the aurora anchor with no revealBloom:true did NOT red R7");

    // (t) a PRESENT useVizChoreography.ts reds R8 (the dead leaf must stay DEFINITION-ABSENT).
    const t = runAll({ __choreo: true });
    if (!t.some((v) => v.startsWith("R8")))
        fails.push("self-test: a present useVizChoreography.ts did NOT red R8");

    // ── SHADER-PI-SCOPE bites (BG.W-DOTFLOW-REBUILD) ──
    const shaderAnchor = "dot-flow-field/shaders/_probe.glsl.ts";
    const wgslAnchor = "dot-flow-field/shaders/_probe.wgsl.ts";

    // (u) a GLSL shader that splices ${OKLCH_MATRICES_GLSL} with NO PI define reds SP1.
    const u = runAll({
        [shaderAnchor]:
            "export const S = `#version 300 es\n${OETF_GLSL}\n${OKLCH_MATRICES_GLSL}\nvoid main(){}`;",
    });
    if (!u.some((v) => v.startsWith("SP1") && v.includes(shaderAnchor)))
        fails.push(
            "self-test: a GLSL shader splicing OKLCH_MATRICES with no PI define did NOT red SP1",
        );

    // (v) the SAME with a `#define PI` BEFORE the splice does NOT red SP1 (the honest survivor).
    const v = runAll({
        [shaderAnchor]:
            "export const S = `#version 300 es\n#define PI 3.14159\n${OKLCH_MATRICES_GLSL}\nvoid main(){}`;",
    });
    if (v.some((x) => x.startsWith("SP1") && x.includes(shaderAnchor)))
        fails.push(
            "self-test: a GLSL shader defining PI before the splice WRONGLY red SP1 (a false-red on the honest survivor)",
        );

    // (w) a WGSL shader splicing ${OKLCH_MATRICES_WGSL} with NO const PI reds SP1.
    const w = runAll({
        [wgslAnchor]:
            "export const S = `${OETF_WGSL}\n${OKLCH_MATRICES_WGSL}\n@fragment fn fs(){}`;",
    });
    if (!w.some((x) => x.startsWith("SP1") && x.includes(wgslAnchor)))
        fails.push(
            "self-test: a WGSL shader splicing OKLCH_MATRICES with no const PI did NOT red SP1",
        );

    // ── FOURIER-BEAUTY bites (BG.W-FOURIER-BEAUTY / F9.R7) ──
    // A valid follow body the FB3 bites break ONE witness at a time (satisfies FOLLOW_REACH +
    // smoothedPosition + ensureFit().scale + canvas.width + pointer.tick, no rAF, no snap).
    const validFF =
        "import { SCRUB_GAIN, FOLLOW_REACH } from '../constants';\n" +
        "const sp = pointer.smoothedPosition.value;\n" +
        "const scale = Math.max(ensureFit().scale, 1e-6);\n" +
        "const asp = canvas.width / canvas.height;\n" +
        "pointer.tick(deltaMs);\n" +
        "headT = (headT + rate * dt) % 1;\n";

    // (fb1) a planted uniform-HAIRLINE shader (no taper/under-glow) reds FB1.
    const fbHairline = runAll({
        [FF_GLSL]:
            "export const S = `#version 300 es\nfloat cover = 1.0 - smoothstep(halfW, halfW + aa, d);`;",
    });
    if (!fbHairline.some((v) => v.startsWith("FB1")))
        fails.push("self-test: a planted uniform-hairline shader (no taper) did NOT red FB1");

    // (fb2) a trailWidthToModel with NO RIBBON_HEAD_FLOOR_PX clamp reds FB1 (mid-body floor gone).
    const fbNoFloor = runAll({
        [FF_BRIDGE]:
            "export function trailWidthToModel(trailWidthPx, scale, canvasCssMin){ return trailWidthPx / scale; }",
    });
    if (!fbNoFloor.some((v) => v.startsWith("FB1")))
        fails.push("self-test: a trailWidthToModel with no mid-body floor clamp did NOT red FB1");

    // (fb3) a <4-entry FOURIER_FIGURES catalogue reds FB2.
    const fbFewFigs = runAll({
        [FF_MATH]:
            "export function makeHarmonicFigure(){}\nexport const FOURIER_FIGURES = {\n  a: [{ index: 1, mag: 0.7, phase: 0 }],\n  b: [{ index: 2, mag: 0.5, phase: 0 }],\n};",
    });
    if (!fbFewFigs.some((v) => v.startsWith("FB2")))
        fails.push("self-test: a <4-entry FOURIER_FIGURES did NOT red FB2");

    // (fb4) a NON-INTEGER figure index reds FB2 (the closure fence).
    const fbFracIdx = runAll({
        [FF_MATH]:
            "export function makeHarmonicFigure(){}\nexport const FOURIER_FIGURES = {\n  a: [{ index: 1, mag: 0.7, phase: 0 }],\n  b: [{ index: 2, mag: 0.5, phase: 0 }],\n  c: [{ index: 3, mag: 0.4, phase: 0 }],\n  d: [{ index: 1.5, mag: 0.3, phase: 0 }],\n};",
    });
    if (!fbFracIdx.some((v) => v.startsWith("FB2")))
        fails.push("self-test: a non-integer figure index did NOT red FB2");

    // (fb5) a planted headT=pointer SNAP regression reds FB3 (the teleport class stays dead).
    const fbSnap = runAll({
        [FF_COMPOSABLE]: validFF + "headT = pointer.position.value.x;\n",
    });
    if (!fbSnap.some((v) => v.startsWith("FB3")))
        fails.push("self-test: a planted headT=pointer snap did NOT red FB3");

    // (fb6) a planted SECOND requestAnimationFrame reds FB3 (the one-loop discipline).
    const fbRaf = runAll({ [FF_COMPOSABLE]: validFF + "requestAnimationFrame(loop);\n" });
    if (!fbRaf.some((v) => v.startsWith("FB3")))
        fails.push("self-test: a planted second requestAnimationFrame did NOT red FB3");

    // (fb7) a surviving FOLLOW_LEAN whisper reds FB3 (the clean break requires it GONE).
    const fbWhisper = runAll({ [FF_COMPOSABLE]: validFF + "const l = FOLLOW_LEAN * sp.x;\n" });
    if (!fbWhisper.some((v) => v.startsWith("FB3")))
        fails.push("self-test: a surviving FOLLOW_LEAN whisper did NOT red FB3");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:viz",
        wave: "BG.W-VIZ-RESIZE-ADOPT + BG.W-VIZ-PREVIEW-LIVE + BG.W-VIZ-REVEAL-BLOOM + BG.W-DOTFLOW-REBUILD + BG.W-FOURIER-BEAUTY",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_VIZ_ARTIFACT", "proof-viz.json");
    writeGateArtifact(out, artifact);

    console.log(
        "proof:viz — viz-resize-UPLOAD-ONLY (BG.W-VIZ-RESIZE-ADOPT) + per-story preview stills (BG.W-VIZ-PREVIEW-LIVE) + reveal-bloom (BG.W-VIZ-REVEAL-BLOOM) + shader-PI-scope (BG.W-DOTFLOW-REBUILD) + fourier-beauty (BG.W-FOURIER-BEAUTY)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log(
            "  GREEN (V1 one-sizer-gBCR · V2 no-self-measure · V3 no-self-size · V4 dprPolicy×8 · V5 leaf-routes · P1 registry≥10 · P2 pairwise-distinct · P3 card-dispatch · P4 device-free-memoized · R1 keyframe-filter-brightness · R2 canvas-target+cartoon-punch · R3 duration-token · R4 PRM-gated · R5 attr-not-dead-scalar · R6 first-visible-IO · R7 aurora-opts-in · R8 viz-choreography-absent · SP1 shader-PI-before-OKLCH-splice · FB1 thick-tapered-ribbon+underglow+midfloor · FB2 beautiful-closed-figures · FB3 real-damped-follow-no-snap-no-2nd-rAF)",
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
