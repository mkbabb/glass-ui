#!/usr/bin/env node
// BB.W-AURORA-SWRASTER — the headless-safe aurora gate (proof:aurora-swraster).
//
// The born-RED→GREEN device-free SOURCE arm. At HEAD the aurora WedGES under a
// software rasterizer when a consumer pins mode:"webgl"/"capture": the
// software-raster signal was gated on "auto" ONLY (renderMode.ts — the forced arm
// bypassed isSoftwareWebGLRenderer entirely), the runtime armed the live GL2 surface
// un-probed (runtime.ts), and the CSS placeholder was a FLAT gradient
// (paletteToCssGradient) whose mean + spatial luminance diverge from the shader's
// nuclei-field composite — so a headless contrast capture certified the WRONG floor.
//
// Three falsifiable SOURCE witnesses (each born-RED at HEAD pre-wave), the
// comment-strip + pure-detector house pattern (mirrors proof-aurora-space-gamma.mjs
// / proof-card-padding.mjs):
//
//   W1 — THE SOFTWARE-RASTER SIGNAL IS UNIVERSAL, NOT "auto"-ONLY. resolveRenderMode
//        falls a forced mode:"webgl"/"capture" arm to "css" when the renderer is
//        software, via a guard that runs BEFORE the `mode !== "auto"` short-circuit
//        for any WebGL-arming mode. The forceWebGLUnderSoftwareRaster escape exists
//        AND defaults false (the guard is the safe default). The capable-device
//        pass-through is preserved (a null/hardware probe → the requested mode
//        unchanged). RED at HEAD: the probe is reached ONLY inside the "auto" branch.
//        Bite: an escape defaulting true, or the guard buried back in "auto", REDs.
//
//   W2 — THE WEDGE CATCH ROUTES TO THE PLACEHOLDER, NOT A HANG/THROW. The runtime
//        re-checks the SAME software-raster predicate (imported from renderMode.ts —
//        ONE detector, no second probe context) and, under a software renderer with
//        the escape off, NEVER creates the WebGL canvas (an inert handle; the
//        placeholder stays the surface, no onInitError fired). The onInitError
//        CONTRACT is preserved for GENUINE violations (the catch is software-raster-
//        SCOPED, not a blanket error-swallow). RED at HEAD: the arm path reaches
//        createWebGLCanvas un-guarded. Bite: a blanket try/swallow of ALL init
//        errors (no software-raster scope) REDs the contract-preservation clause.
//
//   W3 — THE FALLBACK GROUND IS FIELD-DERIVED, NOT THE FLAT GRADIENT. The
//        software-raster / capture ground (auroraFallbackGround) reads the NUCLEI
//        field (positions/radii/softmaxBeta — nucleiFieldStatic) AND reuses the
//        value.js oklchToLinear core (ONE color source — no re-implemented OKLCh
//        math) AND closes its CPU luminance math with the SAME linearToSrgb OETF
//        the proof:aurora-space-gamma pipeline locks. Aurora.vue threads it into the
//        placeholder on EVERY substrate (BI.W-E10-AURORA-ENTRANCE — the flat
//        paletteToCssGradient band is RETIRED from Aurora.vue; the palette-derived
//        ground is the capable-path frame-0 surface too). Bite: a
//        ground that only reads the flat palette stops (a re-skinned gradient, no
//        nuclei read) REDs the field-derivation clause; a re-implemented OKLCh
//        bake (no oklchToLinear reuse) REDs the one-color-source clause.
//
// + the self-test bite (the false-witness discipline) and the BINDING headless π
//   readback (tests-visual/aurora-swraster.spec.ts — the mean + per-quadrant
//   luminance within the certify band, the SwiftShader no-hang, both modes).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip block + line comments so a witness never matches commented prose (the
 *  URL-safe `//` strip — `(^|[^:])//` keeps a `://` in a URL intact). */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

const AURORA = "src/components/custom/aurora";

/**
 * Pure detector — given the source strings, return { facts, violations }.
 *
 * `sources` shape:
 *   renderMode  : constants/renderMode.ts (W1)
 *   runtime     : composables/runtime.ts (W2)
 *   ground      : composables/auroraFallbackGround.ts (W3 — the field ground)
 *   auroraVue   : Aurora.vue (W3 — the placeholder-seam thread)
 */
export function detectAuroraSwraster(sources) {
    const { renderMode, runtime, ground, auroraVue } = sources;
    const facts = {};
    const violations = [];

    const rm = stripComments(renderMode);
    const rt = stripComments(runtime);
    const gr = stripComments(ground);
    const av = stripComments(auroraVue);

    // ── W1 — the software-raster signal is UNIVERSAL, not "auto"-only ──────────
    facts.w1 = {};
    // The guard runs for any WebGL-arming mode: the predicate is consulted in a
    // condition that is NOT nested only inside an `if (mode !== "auto")`-gated
    // tail. We assert (a) the guard condition gates on `mode !== "css"` (so a
    // forced "webgl" reaches it) AND calls isSoftwareWebGLRenderer(), and (b) that
    // guard PRECEDES the `if (mode !== "auto") return mode;` short-circuit.
    const guardIdx = rm.search(
        /mode\s*!==\s*"css"[\s\S]{0,160}?isSoftwareWebGLRenderer\s*\(\s*\)/,
    );
    const autoShortCircuitIdx = rm.indexOf('if (mode !== "auto") return mode;');
    facts.w1.guardPresent = guardIdx >= 0;
    facts.w1.guardBeforeAutoShortCircuit =
        guardIdx >= 0 &&
        autoShortCircuitIdx >= 0 &&
        guardIdx < autoShortCircuitIdx;
    // The escape exists AND defaults false (the safe default). We assert the
    // option key exists in the signature region AND the guard reads
    // `!options.forceWebGLUnderSoftwareRaster` (so an unset escape engages the
    // guard); a `?? true` default or a guard that ignores the escape reds.
    facts.w1.escapeOptionDeclared =
        /forceWebGLUnderSoftwareRaster\??\s*:\s*boolean/.test(rm);
    facts.w1.escapeGuardsSafe =
        /!\s*options\.forceWebGLUnderSoftwareRaster/.test(rm);
    // Negative — no `forceWebGLUnderSoftwareRaster` is defaulted TRUE in renderMode.
    facts.w1.escapeNotDefaultTrue =
        !/forceWebGLUnderSoftwareRaster[^=\n]*=\s*true/.test(rm) &&
        !/forceWebGLUnderSoftwareRaster\s*\?\?\s*true/.test(rm);
    // The capable pass-through survives: the `if (mode !== "auto") return mode;`
    // short-circuit is still present (a hardware/null probe → requested mode
    // unchanged).
    facts.w1.capablePassThrough = autoShortCircuitIdx >= 0;
    facts.w1.ok =
        facts.w1.guardPresent &&
        facts.w1.guardBeforeAutoShortCircuit &&
        facts.w1.escapeOptionDeclared &&
        facts.w1.escapeGuardsSafe &&
        facts.w1.escapeNotDefaultTrue &&
        facts.w1.capablePassThrough;
    if (!facts.w1.ok) {
        violations.push(
            "W1: resolveRenderMode must universalize the software-raster guard — the isSoftwareWebGLRenderer() check runs for any WebGL-arming mode (gated `mode !== \"css\"`) BEFORE the `if (mode !== \"auto\") return mode;` short-circuit; the forceWebGLUnderSoftwareRaster escape must exist + default FALSE (the safe default); the capable pass-through preserved",
        );
    }

    // ── W2 — the wedge catch routes to the placeholder, not a hang/thrown default ─
    facts.w2 = {};
    // The runtime imports the SHARED predicate (ONE detector — no second probe).
    facts.w2.sharesDetector =
        /import\s*\{[^}]*isSoftwareWebGLRenderer[^}]*\}\s*from\s*["']\.\.\/constants\/renderMode["']/.test(
            rt,
        );
    // The wedge-blocked computation reads the predicate AND the escape (off-by-default).
    facts.w2.wedgeBlockedComputed =
        /wedgeBlocked\s*=[\s\S]{0,120}?!\s*options\.forceWebGLUnderSoftwareRaster[\s\S]{0,40}?isSoftwareWebGLRenderer\s*\(\s*\)/.test(
            rt,
        );
    // Under the block the GL/GPU substrate is NOT created — the substrate-constructor
    // call is on the FALSE arm of a `wedgeBlocked ? inertHandle : create…(…)` ternary
    // (an inert handle on the blocked arm). BB.W-VIZ-SUITE (W-AURORA-WGPU) re-points the
    // aurora substrate off the direct `createWebGLCanvas` onto the feature-detect picker
    // `createGpuSubstrate` (WebGPU-first / WebGL2-fallback) — the wedge-catch INTENT is
    // unchanged (the inert handle blocks the substrate under a software renderer), so the
    // regex accepts either constructor name on the FALSE arm.
    facts.w2.inertHandleOnBlock =
        /wedgeBlocked\s*\?\s*inertHandle\s*:\s*create(WebGLCanvas|GpuSubstrate)/.test(rt) &&
        /const\s+inertHandle\s*:/.test(rt);
    // The onInitError contract is preserved — the runtime still surfaces genuine
    // eager-path throws (the surfaceInitError/throw path is NOT removed). We assert
    // the runtime is NOT a blanket swallow: there is no `catch {}`/`catch (e) {}`
    // empty-swallow wrapping the arm, and the onInitError option survives.
    facts.w2.onInitErrorPreserved = /onInitError\?\s*:/.test(rt);
    // Negative — the catch is software-raster SCOPED, not a blanket swallow of ALL
    // init errors: there is no `try` wrapping the eager arm that swallows into an
    // empty catch (a blanket `catch {}` around `canvasHandle.arm()`).
    facts.w2.noBlanketSwallow =
        !/canvasHandle\.arm\(\);[\s\S]{0,40}?catch\s*(\([^)]*\))?\s*\{\s*\}/.test(
            rt,
        );
    facts.w2.ok =
        facts.w2.sharesDetector &&
        facts.w2.wedgeBlockedComputed &&
        facts.w2.inertHandleOnBlock &&
        facts.w2.onInitErrorPreserved &&
        facts.w2.noBlanketSwallow;
    if (!facts.w2.ok) {
        violations.push(
            "W2: the runtime wedge catch must reuse the SHARED isSoftwareWebGLRenderer predicate (no second probe), compute `wedgeBlocked = !forceWebGLUnderSoftwareRaster && isSoftwareWebGLRenderer()`, return the inert handle on the blocked arm (createWebGLCanvas never called), and PRESERVE the onInitError contract (no blanket error-swallow)",
        );
    }

    // ── W3 — the fallback ground is field-derived, not the flat gradient ───────
    facts.w3 = {};
    // The ground reads the NUCLEI field (positions/radii/softmaxBeta) — the
    // field-derivation clause (a flat-palette-only re-skin fails).
    facts.w3.readsNuclei =
        /nucleiFieldStatic/.test(gr) &&
        /softmaxBeta/.test(gr) &&
        /\.radius/.test(gr) &&
        /paletteBias/.test(gr) &&
        /config\.nuclei/.test(gr);
    // The luminance math reuses the value.js oklchToLinear core (ONE color source —
    // no re-implemented OKLCh→linear math).
    facts.w3.reusesColorCore =
        /import\s*\{[^}]*oklchToLinear[^}]*\}\s*from\s*["']\.\.\/\.\.\/\.\.\/\.\.\/composables\/color["']/.test(
            gr,
        ) && /oklchToLinear\(/.test(gr);
    // Negative — no re-implemented OKLCh matrix / Ottosson math inline (a forked
    // bake): the ground must not declare its own oklab→linear matrix.
    facts.w3.noForkedColorMath =
        !/LINEAR_SRGB_TO_LMS|LMS_TO_OKLAB|oklabToLinearSRGB\s*\(/.test(gr);
    // The CPU luminance math closes with the SAME linearToSrgb OETF the
    // proof:aurora-space-gamma pipeline locks (a gamma-mismatched ground reds the
    // one-color-source/linear-pipeline clause).
    facts.w3.linearToSrgbOetf =
        /function\s+linearToSrgb/.test(gr) &&
        /0\.0031308/.test(gr) &&
        /1\s*\/\s*2\.4/.test(gr);
    // The ground also mirrors the shader's PBR-Neutral tonemap (the mean-anchoring
    // transfer — without it the CPU mean drifts systematically).
    facts.w3.tonemapMirrored =
        /acesPbrNeutral/.test(gr) && /startCompression/.test(gr);
    // BI.W-E10-AURORA-ENTRANCE (§Disposition, terminal) — Aurora.vue threads the
    // field ground into the placeholder on EVERY substrate: the flat
    // `paletteToCssGradient` band is RETIRED from Aurora.vue (the capable path now
    // paints the palette-derived ground as its frame-0 surface too, not the "repulsive
    // gray" gradient). The `auroraFallbackGround` thread is REQUIRED; the flat-band
    // reference must be ABSENT (a re-introduction of the capable-path gradient REDs).
    facts.w3.threadedIntoPlaceholder =
        /auroraFallbackGround/.test(av) && !/paletteToCssGradient/.test(av);
    facts.w3.ok =
        facts.w3.readsNuclei &&
        facts.w3.reusesColorCore &&
        facts.w3.noForkedColorMath &&
        facts.w3.linearToSrgbOetf &&
        facts.w3.tonemapMirrored &&
        facts.w3.threadedIntoPlaceholder;
    if (!facts.w3.ok) {
        violations.push(
            "W3: the fallback ground (auroraFallbackGround.ts) must be FIELD-derived (reads config.nuclei + softmaxBeta via nucleiFieldStatic), reuse the value.js oklchToLinear core (no forked OKLCh math), close its CPU luminance with the SAME linearToSrgb OETF + the PBR-Neutral tonemap, and Aurora.vue must thread it into the placeholder on EVERY substrate (BI.W-E10-AURORA-ENTRANCE — the flat paletteToCssGradient band is RETIRED from Aurora.vue; the palette-derived ground is the capable-path frame-0 surface too)",
        );
    }

    return { facts, violations };
}

// ── The self-test bite: the false-witness discipline (each bite REDs its clause
//    through the PURE detector). ─────────────────────────────────────────────
function selfTest() {
    const goodRenderMode = `
      export interface ResolveRenderModeOptions { forceWebGLUnderSoftwareRaster?: boolean; }
      export function resolveRenderMode(mode, options = {}) {
        if (mode !== "css" && !options.forceWebGLUnderSoftwareRaster && isSoftwareWebGLRenderer()) {
          return "css";
        }
        if (mode !== "auto") return mode;
        return "webgl";
      }`;
    const goodRuntime = `
      import { isSoftwareWebGLRenderer } from "../constants/renderMode";
      onInitError?: (err) => void;
      const wedgeBlocked = !options.forceWebGLUnderSoftwareRaster && isSoftwareWebGLRenderer();
      const inertHandle: CanvasHandle = { arm: () => {} };
      const canvasHandle = wedgeBlocked ? inertHandle : createWebGLCanvas(canvas, {});`;
    const goodGround = `
      import { oklchToLinear } from "../../../../composables/color";
      function linearToSrgb(c) { return c <= 0.0031308 ? c*12.92 : 1.055*Math.pow(c,1/2.4)-0.055; }
      function acesPbrNeutral(c) { const startCompression = 0.76; return c; }
      export function nucleiFieldStatic(nuclei, softmaxBeta, x, y) { return { paletteId: 0, valueMod: 0 }; }
      export function sampleAuroraField(config, x, y) {
        const lin = config.palette.map(s => oklchToLinear(s));
        nucleiFieldStatic(config.nuclei, config.softmaxBeta, x, y);
        const r = nuclei => nuclei.radius; const pb = config.nuclei[0].paletteBias;
        return [0,0,0];
      }`;
    const goodAuroraVue = `
      import { auroraFallbackGround } from "./composables/auroraFallbackGround";
      const faithfulGround = computed(() => auroraFallbackGround(props.config));
      const placeholderBackgroundImage = computed(() => faithfulGround.value.backgroundImage);`;

    const base = {
        renderMode: goodRenderMode,
        runtime: goodRuntime,
        ground: goodGround,
        auroraVue: goodAuroraVue,
    };

    const bites = [];

    // Bite A — the escape defaulting TRUE reds W1 (the safe-default clause).
    {
        const bad = base.renderMode.replace(
            "forceWebGLUnderSoftwareRaster?: boolean;",
            "forceWebGLUnderSoftwareRaster?: boolean = true;",
        );
        const { facts } = detectAuroraSwraster({ ...base, renderMode: bad });
        bites.push({ name: "W1 escape-default-true reds", reds: !facts.w1.ok });
    }
    // Bite B — the guard buried back inside the "auto" tail (after the short-circuit) reds W1.
    {
        const bad = `
          export interface ResolveRenderModeOptions { forceWebGLUnderSoftwareRaster?: boolean; }
          export function resolveRenderMode(mode, options = {}) {
            if (mode !== "auto") return mode;
            if (!options.forceWebGLUnderSoftwareRaster && isSoftwareWebGLRenderer()) return "css";
            return "webgl";
          }`;
        const { facts } = detectAuroraSwraster({ ...base, renderMode: bad });
        bites.push({ name: "W1 guard-in-auto-tail reds", reds: !facts.w1.ok });
    }
    // Bite C — a blanket error-swallow around the arm reds W2.
    {
        const bad =
            goodRuntime + `\n canvasHandle.arm(); } catch {}\n`;
        const { facts } = detectAuroraSwraster({ ...base, runtime: bad });
        bites.push({ name: "W2 blanket-swallow reds", reds: !facts.w2.ok });
    }
    // Bite D — a flat-only ground (no nuclei read) reds W3.
    {
        const bad = `
          import { oklchToLinear } from "../../../../composables/color";
          function linearToSrgb(c) { return c <= 0.0031308 ? c : 1.055*Math.pow(c,1/2.4)-0.055; }
          function acesPbrNeutral(c) { const startCompression = 0.76; return c; }
          export function sampleAuroraField(config, x, y) {
            return oklchToLinear(config.palette[0]);
          }`;
        const { facts } = detectAuroraSwraster({ ...base, ground: bad });
        bites.push({ name: "W3 flat-only-ground reds", reds: !facts.w3.ok });
    }
    // Bite E — a forked OKLCh bake (an inline matrix, no oklchToLinear reuse) reds W3.
    {
        const bad = goodGround
            .replace(
                'import { oklchToLinear } from "../../../../composables/color";',
                "const LMS_TO_OKLAB = [];",
            )
            .replace(/oklchToLinear\([^)]*\)/g, "oklabToLinearSRGB(0,0,0)");
        const { facts } = detectAuroraSwraster({ ...base, ground: bad });
        bites.push({ name: "W3 forked-color-math reds", reds: !facts.w3.ok });
    }

    return bites;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_AURORA_SWRASTER_ARTIFACT",
        "BB-aurora-swraster",
    );

    const renderMode = safeRead(resolve(ROOT, AURORA, "constants/renderMode.ts"));
    const runtime = safeRead(resolve(ROOT, AURORA, "composables/runtime.ts"));
    const ground = safeRead(
        resolve(ROOT, AURORA, "composables/auroraFallbackGround.ts"),
    );
    const auroraVue = safeRead(resolve(ROOT, AURORA, "Aurora.vue"));

    const { facts, violations } = detectAuroraSwraster({
        renderMode,
        runtime,
        ground,
        auroraVue,
    });

    // The self-test bites.
    const bites = selfTest();
    const biteFailures = bites.filter((b) => !b.reds);
    facts.selfTest = { bites, allBite: biteFailures.length === 0 };
    if (!facts.selfTest.allBite) {
        violations.push(
            `SELF-TEST: bite(s) did not RED: ${biteFailures
                .map((b) => b.name)
                .join(", ")}`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:aurora-swraster",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:aurora-swraster — the headless-safe aurora guard + luminance-faithful fallback (BB.W-AURORA-SWRASTER)",
    );
    console.log(`  W1 software-raster signal universal (not auto-only): ${yn(facts.w1.ok)}`);
    console.log(`  W2 wedge catch → placeholder (no hang/blanket-swallow): ${yn(facts.w2.ok)}`);
    console.log(`  W3 fallback ground field-derived (one color source)  : ${yn(facts.w3.ok)}`);
    console.log(`  self-test bites RED                                   : ${yn(facts.selfTest.allBite)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
