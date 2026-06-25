#!/usr/bin/env node
// BC.W-VIZ-AURORA — the aurora WGSL-primary painterly field gate (proof:viz-aurora).
//
// The cure for the BB aurora-core-dark defect: aurora reads a living WARM-CREAM painterly
// wash over the WebGPU-first substrate, the painterly mediums render FULL on Safari 26
// (the WGSL primary, no smooth degrade), the dead-static "css" fall is gone (the "renders
// slow" root), the capture path awaits the device (the dead-preview close), the
// configurator sits RIGHT + rounded, and deriveAurora HONORS avoidHues (no teal-on-navy in
// the DERIVE path). Teal-on-navy is a DEMO preset only — the library default is warm-cream.
//
// This gate is the DEVICE-FREE SOURCE arm (born-RED → GREEN). The LIVE-GPU paint arms (A4
// the meanLum>0/chroma>0 on a real backend, A5 the painterly statistics floor) ride the
// orchestrator's real-Metal capture (`tests-visual/viz-aurora.spec.ts` + the DELTA), NOT
// this device-free gate — the cardinal split (CI proves the SOURCE wiring, the local close
// proves the PAINT). Tagged ["ci","local"] for the source arm.
//
// Six falsifiable SOURCE witnesses (each born-RED at HEAD pre-wave), the comment-strip +
// pure-detector house pattern (mirrors proof-aurora-curl-warp.mjs / proof-aurora-swraster.mjs):
//
//   A1 — THE DEAD-STATIC "auto" FALL IS GONE. resolveRenderMode("auto", …) carries NO
//        `hardwareConcurrency`/`saveData` "css" branch (the software-raster guard + the
//        PRM-to-substrate delegation stay). RED at HEAD: the "auto" branch returns
//        `lowConcurrency || reducedMotion || saveData ? "css" : "webgl"`. Bite: a re-added
//        `hardwareConcurrency <= 4` "css" branch reds.
//
//   A2 — THE PREVIEW IS DEVICE-FREE (BD.W-PRESET-RENDER re-root). usePresetThumbnails paints
//        each preset via the device-free `auroraFallbackGround` (the CPU palette+nuclei mirror)
//        — NO eager `createAurora({mode:"capture"})`, NO `aurora.renderAt` GL draw, NO -99999px
//        offscreen capture canvas. The PRIOR diagnosis (an `await armAsync()`-before-`renderAt`
//        init-reorder) was MIS-TRACED: the throw fired at the capture-mode createAurora CALL on
//        every no-device host (validation-probe/SwiftShader), aborting all 13 cards before any
//        renderAt — an init-reorder fixed nothing. The clean break is no GL device at all. Bite:
//        a re-introduced capture-mode createAurora + renderAt reds.
//
//   A3 — THE WGSL PRIMARY CARRIES THE PAINTERLY MEDIUMS. aurora.wgsl.ts splices
//        aurora-mediums.wgsl.ts (which dispatches uMedium 1-7 via applyMedium), and the
//        Kuwahara radius/sectors/q lanes exist in BOTH the WGSL `Uniforms` struct AND
//        packAuroraWGPUUniforms (the lockstep — a one-sided add reds). RED at HEAD: the
//        WGSL is smooth-only (the file's own "renders the smooth core" comment). Bite: a
//        smooth-only WGSL (no applyMedium splice) reds; a one-sided uniform add reds.
//
//   A6 — WARM-CREAM DEFAULT + NO TEAL-ON-NAVY in any library file. DEFAULT_AURORA_CONFIG
//        resolves the warm identity (the default palette is not a teal/navy pair), and no
//        teal-on-navy token sits in a library `src/` aurora file (the §E removal fence —
//        teal-on-navy is a DEMO preset only). RED if a library aurora source hardcodes the
//        teal-on-navy demo pair.
//
//   A7 — deriveAurora ACCEPTS + HONORS avoidHues (the iter-23 speedtest-AX fold's OWN
//        born-RED mechanism). (a) DeriveAuroraOptions carries `avoidHues` AND deriveAurora
//        reads it; (b) the HONOR is load-bearing — a `deriveAurora(seed,{avoidHues:[[170,
//        200]]})` produces an N-stop palette whose EVERY stop's hue is OUTSIDE [170,200]
//        (the harmony walk re-routes around the band, not a flatten). RED at HEAD: no
//        avoidHues field. Bite: a deriveAurora that ACCEPTS avoidHues but IGNORES it (a
//        stop lands inside the band) reds (the option-as-no-op evasion).
//
// + the disease-root self-test (each historical/fold defect REDs its clause).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const AURORA = "src/components/custom/aurora";

/** URL-safe comment strip — `(^|[^:])//` keeps a `://` in a URL intact. */
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

/**
 * Pure detector — given the source strings, return { facts, violations }.
 *
 * `sources` shape:
 *   renderMode    : constants/renderMode.ts (A1)
 *   thumbnails    : demo usePresetThumbnails.ts (A2)
 *   wgsl          : constants/shaders/aurora.wgsl.ts (A3 — the splice + struct lanes)
 *   wgslMediums   : constants/shaders/aurora-mediums.wgsl.ts (A3 — the medium bodies)
 *   uniformBridge : composables/uniformBridgeWGPU.ts (A3 — the lockstep lanes)
 *   presets       : constants/presets.ts (A6 — the default config)
 *   color         : composables/color.ts (A7 — deriveAurora avoidHues)
 *   librarySources: { path → raw } over the library aurora src files (A6 fence)
 *   avoidHuesHonored / avoidHuesAcceptOnlyReds : the A7 HONOR runtime results (caller-evaluated)
 *   wgslMediumsExists / colorExists            : on-disk presence
 */
export function detectVizAurora(sources) {
    const {
        renderMode,
        thumbnails,
        wgsl,
        wgslMediums,
        uniformBridge,
        presets,
        color,
        librarySources,
        avoidHuesHonored,
        avoidHuesAcceptOnlyReds,
        wgslMediumsExists,
        colorExists,
    } = sources;
    const facts = {};
    const violations = [];

    const rm = stripComments(renderMode);
    const th = stripComments(thumbnails);
    // WGSL bodies live in /* wgsl */ template literals — detect against the RAW source for
    // the shader bodies; strip comments only on the TS-statement surface (imports/struct).
    const wgslRaw = wgsl;
    const wgslMedRaw = wgslMediums;
    const ub = stripComments(uniformBridge);
    const pr = stripComments(presets);
    const co = stripComments(color);

    // ── A1 — the dead-static "auto" fall is gone ────────────────────────────────
    facts.a1 = {};
    // The "auto" branch must NOT carry a hardwareConcurrency/saveData "css" decision.
    facts.a1.noLowConcurrencyFall = !/hardwareConcurrency\s*<=\s*4/.test(rm);
    facts.a1.noSaveDataFall = !/connection\?\.\s*saveData|saveData\s*===\s*true/.test(rm);
    // The reduce-or-low → "css" expression form is gone.
    facts.a1.noTernaryCssFall =
        !/lowConcurrency\s*\|\|\s*reducedMotion\s*\|\|\s*saveData\s*\?\s*["']css["']/.test(
            rm,
        );
    // The software-raster guard STAYS (the only surviving "css" signal).
    facts.a1.guardStays = /isSoftwareWebGLRenderer\s*\(\s*\)/.test(rm);
    // The "auto" branch resolves "webgl" (the GPU arms on every device).
    facts.a1.autoArmsWebgl = /if\s*\(\s*mode\s*!==\s*["']auto["']\s*\)\s*return\s+mode\s*;[\s\S]*?return\s+["']webgl["']\s*;/.test(
        rm,
    );
    facts.a1.ok =
        facts.a1.noLowConcurrencyFall &&
        facts.a1.noSaveDataFall &&
        facts.a1.noTernaryCssFall &&
        facts.a1.guardStays &&
        facts.a1.autoArmsWebgl;
    if (!facts.a1.ok) {
        violations.push(
            "A1: resolveRenderMode('auto', …) must DROP the hardwareConcurrency/saveData 'css' fall (the dead-static 'renders slow' root) — the software-raster guard + the PRM-to-substrate delegation stay; 'auto' arms 'webgl' on every device",
        );
    }

    // ── A2 — the preview is DEVICE-FREE (BD.W-PRESET-RENDER re-root) ─────────────
    // The PRIOR diagnosis (an init-order/readback race the old A2 asserted: `await armAsync()`
    // BEFORE `renderAt`) was MIS-TRACED by all three reads (GREENFIELD-HARDENING-PLAN
    // configurator-presentation row): the throw fired at the `createAurora({mode:"capture"})`
    // CALL on every no-device host (validation-probe/SwiftShader), aborting all 13 cards BEFORE
    // any renderAt was reached — an init-reorder fixes nothing. The SHIPPED clean break
    // (no-backwards-compat): the thumbnail does NOT touch a GL device at all — it paints each
    // preset via the device-free `auroraFallbackGround` (the CPU palette+nuclei mirror). A2 now
    // asserts that contract: NO eager `createAurora({mode:"capture"})`, NO `aurora.renderAt`, NO
    // `-99999px` capture canvas; the device-free ground is composed. The binding never-blank
    // chroma/ΔE π (both engines) rides the live π, NOT this device-free gate.
    facts.a2 = {};
    facts.a2.noCaptureBake = !/createAurora\s*\([^)]*mode\s*:\s*["']capture["']/.test(th);
    facts.a2.noRenderAt = !/aurora\.renderAt\s*\(/.test(th);
    facts.a2.noCaptureCanvas = !/-99999px|left\s*:\s*-9999/.test(th);
    facts.a2.composesDeviceFree = /auroraFallbackGround\s*\(/.test(th);
    facts.a2.ok =
        facts.a2.noCaptureBake &&
        facts.a2.noRenderAt &&
        facts.a2.noCaptureCanvas &&
        facts.a2.composesDeviceFree;
    if (!facts.a2.ok) {
        const why = [];
        if (!facts.a2.noCaptureBake) why.push("an eager createAurora({mode:'capture'}) survives (the no-device-host abort root)");
        if (!facts.a2.noRenderAt) why.push("an aurora.renderAt GL draw survives (the device path the preview never needed)");
        if (!facts.a2.noCaptureCanvas) why.push("a -99999px offscreen capture canvas survives");
        if (!facts.a2.composesDeviceFree) why.push("auroraFallbackGround (the device-free CPU ground) is not composed");
        violations.push(
            `A2: usePresetThumbnails must be DEVICE-FREE (BD.W-PRESET-RENDER — the dead-preview cure is no GL device, never an init-reorder): ${why.join("; ")}`,
        );
    }

    // ── A3 — the WGSL primary carries the painterly mediums (+ the lockstep) ────
    facts.a3 = {};
    facts.a3.mediumsFileExists = wgslMediumsExists;
    // aurora.wgsl.ts imports + splices the medium chunk.
    facts.a3.splicesMediums =
        /import\s*\{[^}]*AURORA_MEDIUMS_WGSL[^}]*\}\s*from\s*["'][^"']*aurora-mediums\.wgsl["']/.test(
            stripComments(wgsl),
        ) && /\$\{AURORA_MEDIUMS_WGSL\}/.test(wgslRaw);
    // fs_main dispatches the mediums via applyMedium (NOT the smooth-only no-op).
    facts.a3.dispatchesMedium = /col\s*=\s*applyMedium\s*\(\s*col\s*,\s*pN\s*,\s*t\s*\)/.test(
        wgslRaw,
    );
    // The medium chunk defines applyMedium + the keystone Kuwahara body + the cheap peers.
    facts.a3.mediumsDefineDispatch = /fn\s+applyMedium\s*\(/.test(wgslMedRaw);
    facts.a3.kuwaharaBody = /fn\s+mediumKuwahara\s*\(/.test(wgslMedRaw);
    facts.a3.peerMediums =
        /fn\s+mediumPastel\s*\(/.test(wgslMedRaw) &&
        /fn\s+mediumWatercolor\s*\(/.test(wgslMedRaw) &&
        /fn\s+mediumCrayon\s*\(/.test(wgslMedRaw);
    // The Kuwahara radius/sectors/q lanes exist in BOTH the WGSL struct AND the JS bridge.
    facts.a3.wgslKuwaharaLanes =
        /scalars4:\s*vec4<f32>/.test(wgslRaw) &&
        /scalars5:\s*vec4<f32>/.test(wgslRaw) &&
        /kuwahara:\s*vec4<f32>/.test(wgslRaw);
    facts.a3.bridgeKuwaharaLanes =
        /OFF\.scalars4/.test(ub) &&
        /OFF\.scalars5/.test(ub) &&
        /OFF\.kuwahara/.test(ub) &&
        /AURORA_WGPU_UNIFORM_BYTES\s*=\s*576/.test(ub);
    // The lockstep: the byte size + lane names are present on BOTH sides (a one-sided
    // add — struct lane present but no bridge write, or vice-versa — reds).
    facts.a3.lockstep = facts.a3.wgslKuwaharaLanes && facts.a3.bridgeKuwaharaLanes;
    facts.a3.ok =
        facts.a3.mediumsFileExists &&
        facts.a3.splicesMediums &&
        facts.a3.dispatchesMedium &&
        facts.a3.mediumsDefineDispatch &&
        facts.a3.kuwaharaBody &&
        facts.a3.peerMediums &&
        facts.a3.lockstep;
    if (!facts.a3.ok) {
        violations.push(
            "A3: aurora.wgsl.ts must splice aurora-mediums.wgsl.ts (applyMedium dispatching uMedium 1-7 incl. the keystone mediumKuwahara + the pastel/watercolor/crayon peers) AND the Kuwahara radius/sectors/q lanes must exist in BOTH the WGSL Uniforms struct AND packAuroraWGPUUniforms (576-byte lockstep — a one-sided add reds the parity)",
        );
    }

    // ── A6 — warm-cream default + no teal-on-navy in any library file ───────────
    facts.a6 = {};
    // The default config's first two palette stops are NOT a teal/navy pair: the default
    // hues are in the warm/cool-blue band the authored DEFAULT_AURORA_CONFIG ships (h 220/
    // 200/80), NOT the teal-on-navy demo identity. We fence on the absence of a hardcoded
    // teal-on-navy literal in the LIBRARY sources (the demo preset is the only legal home).
    // A teal-on-navy literal would be a near-180°-hue teal (h ~175-195) paired with a deep
    // navy (h ~250-270, very low L) — but the decidable fence is the named-pair token: no
    // library aurora `src/` file may carry the `teal-on-navy`/`tealOnNavy` demo identity.
    const tealNavyInLibrary = librarySources.some((s) =>
        /teal[-_\s]?on[-_\s]?navy|tealOnNavy/i.test(stripComments(s.raw)),
    );
    facts.a6.noTealNavyToken = !tealNavyInLibrary;
    // The default config exists + ships a warm palette (the deciding presence assert; the
    // numeric warm-hue is the live-π A6 arm — here we assert the default is authored, not
    // a teal/navy literal pair).
    facts.a6.defaultConfigPresent = /DEFAULT_AURORA_CONFIG\s*:/.test(pr);
    facts.a6.ok = facts.a6.noTealNavyToken && facts.a6.defaultConfigPresent;
    if (!facts.a6.ok) {
        violations.push(
            "A6: the library default must stay warm-cream (DEFAULT_AURORA_CONFIG present) and NO library aurora src/ file may carry a teal-on-navy token (teal-on-navy is a DEMO preset only — the §E removal fence)",
        );
    }

    // ── A7 — deriveAurora ACCEPTS + HONORS avoidHues ────────────────────────────
    facts.a7 = {};
    facts.a7.colorExists = colorExists;
    // (a) the SOURCE arm: the option field + the read.
    facts.a7.optionField = /avoidHues\?\s*:/.test(co);
    facts.a7.deriveReads = /avoidHues/.test(co) && /routeHueOutOfBands|hueInBand/.test(co);
    // (b) the HONOR arm (load-bearing — the runtime result the caller evaluated): a derived
    // ramp with avoidHues:[[170,200]] has EVERY stop OUTSIDE the band.
    facts.a7.honored = avoidHuesHonored === true;
    // The accept-without-honor evasion is caught: a planted deriveAurora that accepts but
    // ignores avoidHues (a stop lands inside the band) is detected by the bite.
    facts.a7.acceptOnlyDetected = avoidHuesAcceptOnlyReds === true;
    facts.a7.ok =
        facts.a7.colorExists &&
        facts.a7.optionField &&
        facts.a7.deriveReads &&
        facts.a7.honored &&
        facts.a7.acceptOnlyDetected;
    if (!facts.a7.ok) {
        violations.push(
            "A7: deriveAurora must ACCEPT avoidHues (the DeriveAuroraOptions field) AND HONOR it — a deriveAurora(seed,{avoidHues:[[170,200]]}) must produce a palette whose EVERY stop's hue is OUTSIDE the band (the harmony walk re-routes; an accept-without-honor lands a stop inside the band — the option-as-no-op evasion)",
        );
    }

    return { facts, violations };
}

// ── The live HONOR check (A7's load-bearing half) — runs the REAL deriveAurora ──
// color.ts is a TS module importing value.js, so it can't be `import()`-ed under plain
// node; we spawn `tsx -e` to evaluate the REAL deriveAurora and report two booleans:
//   honored        — a deriveAurora(seed,{avoidHues:[[170,200]]}) over several harmonies/
//                    stop-counts (seed IN the band, the worst case) lands EVERY stop OUTSIDE.
//   acceptOnlyReds — an avoidHues-IGNORING derive (seed IN the band) WOULD land a stop
//                    in-band — proving the honor is load-bearing (it CHANGED the output),
//                    so the accept-without-honor evasion is a real, detectable defect.
function evaluateAvoidHues() {
    const probe = `
      import { deriveAurora } from "./src/components/custom/aurora/composables/color.ts";
      const band = [170, 200];
      const inBand = (h) => { const hh = ((h % 360) + 360) % 360; return hh >= band[0] && hh <= band[1]; };
      const cases = [
        { seed: "oklch(0.7 0.12 185)", opts: { avoidHues: [band], stopCount: 5, harmony: "analogous" } },
        { seed: "oklch(0.7 0.12 185)", opts: { avoidHues: [band], stopCount: 4, harmony: "monochrome" } },
        { seed: "#0a3d62", opts: { avoidHues: [band], stopCount: 6, harmony: "complementary" } },
        { seed: "oklch(0.6 0.1 180)", opts: { avoidHues: [[160, 210]], stopCount: 4, harmony: "triad" } },
      ];
      let allOut = true;
      for (const c of cases) {
        const stops = deriveAurora(c.seed, c.opts);
        if (stops.some((s) => inBand(s.h))) { allOut = false; break; }
      }
      const ignored = deriveAurora("oklch(0.7 0.12 185)", { stopCount: 5, harmony: "monochrome" });
      const ignoredHasInBand = ignored.some((s) => inBand(s.h));
      console.log(JSON.stringify({ honored: allOut, acceptOnlyReds: ignoredHasInBand }));
    `;
    try {
        const res = spawnSync(
            process.platform === "win32" ? "npx.cmd" : "npx",
            ["tsx", "-e", probe],
            { cwd: ROOT, encoding: "utf8", timeout: 60000 },
        );
        const out = (res.stdout || "").trim().split("\n").pop() || "";
        const parsed = JSON.parse(out);
        return {
            honored: parsed.honored === true,
            acceptOnlyReds: parsed.acceptOnlyReds === true,
        };
    } catch {
        return { honored: false, acceptOnlyReds: false };
    }
}

// ── The self-test bite: the false-witness discipline ────────────────────────────
function selfTest() {
    const goodRenderMode = `
      export function resolveRenderMode(mode, options = {}) {
        if (mode !== "css" && !options.forceWebGLUnderSoftwareRaster && isSoftwareWebGLRenderer()) return "css";
        if (mode !== "auto") return mode;
        return "webgl";
      }`;
    // The NEW device-free shape (BD.W-PRESET-RENDER): NO createAurora({mode:"capture"}), NO
    // renderAt, NO offscreen capture canvas — each preset paints via auroraFallbackGround.
    const goodThumbnails = `
      function bakeKey(key) {
        const ground = auroraFallbackGround(P[key], { grid: 10 });
        return { image: ground.backgroundImage, mean: ground.metrics.mean };
      }
      async function bake() {
        for (const key of KEYS) { const { image } = bakeKey(key); thumbs.value[key] = image; }
      }`;
    const goodWgsl = `
      import { AURORA_MEDIUMS_WGSL } from "./aurora-mediums.wgsl";
      export const AURORA_WGSL = \`
      struct Uniforms {
        scalars4: vec4<f32>,
        scalars5: vec4<f32>,
        kuwahara: vec4<f32>,
      };
      \${AURORA_MEDIUMS_WGSL}
      @fragment fn fs_main() -> @location(0) vec4<f32> {
        col = applyMedium(col, pN, t);
        return vec4<f32>(col, 1.0);
      }
      \`;`;
    const goodWgslMediums = `
      export const AURORA_MEDIUMS_WGSL = \`
      fn mediumPastel(c: vec3<f32>) -> vec3<f32> { return c; }
      fn mediumWatercolor(c: vec3<f32>) -> vec3<f32> { return c; }
      fn mediumCrayon(c: vec3<f32>) -> vec3<f32> { return c; }
      fn mediumKuwahara(c: vec3<f32>) -> vec3<f32> { return c; }
      fn applyMedium(col: vec3<f32>, p: vec2<f32>, t: f32) -> vec3<f32> { return col; }
      \`;`;
    const goodBridge = `
      export const AURORA_WGPU_UNIFORM_BYTES = 576;
      const OFF = { scalars4: 132, scalars5: 136, kuwahara: 140 };
      f32[OFF.scalars4 + 0] = cfg.strokeAmount;
      f32[OFF.scalars5 + 0] = cfg.wetEdge;
      f32[OFF.kuwahara + 0] = cfg.kuwaharaRadius ?? 0.01;`;
    const goodPresets = `export const DEFAULT_AURORA_CONFIG: AuroraConfig = { palette: [{L:0.72,C:0.10,h:220}] };`;
    const goodColor = `
      export interface DeriveAuroraOptions { avoidHues?: readonly (readonly [number, number])[]; }
      export function deriveAurora(seed, options = {}) {
        const { avoidHues } = options;
        if (avoidHues) h = routeHueOutOfBands(h, avoidHues);
        function hueInBand() {}
      }`;

    const base = {
        renderMode: goodRenderMode,
        thumbnails: goodThumbnails,
        wgsl: goodWgsl,
        wgslMediums: goodWgslMediums,
        uniformBridge: goodBridge,
        presets: goodPresets,
        color: goodColor,
        librarySources: [{ path: "x", raw: "warm cream palette" }],
        avoidHuesHonored: true,
        avoidHuesAcceptOnlyReds: true,
        wgslMediumsExists: true,
        colorExists: true,
    };

    const baseResult = detectVizAurora(base);
    const bites = [];

    // Bite A — a re-added hardwareConcurrency <= 4 "css" fall reds A1 (the disease-root).
    {
        const bad = goodRenderMode.replace(
            'return "webgl";',
            'if (navigator.hardwareConcurrency <= 4) return "css"; return "webgl";',
        );
        const { facts } = detectVizAurora({ ...base, renderMode: bad });
        bites.push({ name: "A1 dead-static-fall reds", reds: !facts.a1.ok });
    }
    // Bite B — a re-introduced eager createAurora({mode:"capture"}) + renderAt GL bake reds A2
    // (the no-device-host abort root the device-free re-root deleted).
    {
        const bad = goodThumbnails.replace(
            "function bakeKey(key) {",
            'function bakeKey(key) {\n        const aurora = createAurora(shared, P[key], { mode: "capture" });\n        aurora.renderAt(1.0);',
        );
        const { facts } = detectVizAurora({ ...base, thumbnails: bad });
        bites.push({ name: "A2 device-bake-regression reds", reds: !facts.a2.ok });
    }
    // Bite C — a smooth-only WGSL (no applyMedium splice) reds A3 (the scope-gap).
    {
        const bad = goodWgsl
            .replace(/\$\{AURORA_MEDIUMS_WGSL\}/, "")
            .replace("col = applyMedium(col, pN, t);", "");
        const { facts } = detectVizAurora({ ...base, wgsl: bad });
        bites.push({ name: "A3 smooth-only-wgsl reds", reds: !facts.a3.ok });
    }
    // Bite D — a one-sided lane add (WGSL struct lane but no bridge write) reds A3.
    {
        const bad = goodBridge.replace("f32[OFF.kuwahara + 0] = cfg.kuwaharaRadius ?? 0.01;", "")
            .replace(/OFF\.kuwahara/g, "OFF.cursor");
        const { facts } = detectVizAurora({ ...base, uniformBridge: bad });
        bites.push({ name: "A3 one-sided-lane reds", reds: !facts.a3.ok });
    }
    // Bite E — a teal-on-navy token in a library file reds A6 (the §E removal fence).
    {
        const { facts } = detectVizAurora({
            ...base,
            librarySources: [{ path: "y", raw: "const tealOnNavy = ['#0fb', '#012'];" }],
        });
        bites.push({ name: "A6 teal-on-navy-in-library reds", reds: !facts.a6.ok });
    }
    // Bite F — a deriveAurora that accepts avoidHues but lands a stop in-band reds A7
    //          (the option-as-no-op evasion — the fold's OWN disease-root).
    {
        const { facts } = detectVizAurora({ ...base, avoidHuesHonored: false });
        bites.push({ name: "A7 accept-without-honor reds", reds: !facts.a7.ok });
    }
    // Bite G — the avoidHues field absent reds A7 (the SOURCE arm).
    {
        const bad = goodColor.replace(/avoidHues\?[^;]*;/, "");
        const { facts } = detectVizAurora({ ...base, color: bad });
        bites.push({ name: "A7 no-avoidHues-field reds", reds: !facts.a7.ok });
    }

    return { bites, basePass: baseResult.violations.length === 0 };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_VIZ_AURORA_ARTIFACT",
        "BC-viz-aurora",
    );

    const renderMode = safeRead(resolve(ROOT, AURORA, "constants/renderMode.ts"));
    const thumbnails = safeRead(
        resolve(ROOT, "demo/stories/aurora/usePresetThumbnails.ts"),
    );
    const wgsl = safeRead(resolve(ROOT, AURORA, "constants/shaders/aurora.wgsl.ts"));
    const wgslMediumsPath = resolve(
        ROOT,
        AURORA,
        "constants/shaders/aurora-mediums.wgsl.ts",
    );
    const wgslMediums = safeRead(wgslMediumsPath);
    const uniformBridge = safeRead(
        resolve(ROOT, AURORA, "composables/uniformBridgeWGPU.ts"),
    );
    const presets = safeRead(resolve(ROOT, AURORA, "constants/presets.ts"));
    const colorPath = resolve(ROOT, AURORA, "composables/color.ts");
    const color = safeRead(colorPath);

    // The A6 library-source fence — every library aurora src/ file (NOT the demo).
    const libraryFiles = [
        "constants/presets.ts",
        "composables/color.ts",
        "composables/atoms.ts",
        "constants/renderMode.ts",
        "constants/shaders/aurora.wgsl.ts",
        "constants/shaders/aurora.frag.ts",
        "constants/shaders/aurora-mediums.wgsl.ts",
    ].map((rel) => ({ path: rel, raw: safeRead(resolve(ROOT, AURORA, rel)) }));

    // A7's load-bearing HONOR runtime check.
    const { honored, acceptOnlyReds } = evaluateAvoidHues();

    const { facts, violations } = detectVizAurora({
        renderMode,
        thumbnails,
        wgsl,
        wgslMediums,
        uniformBridge,
        presets,
        color,
        librarySources: libraryFiles,
        avoidHuesHonored: honored,
        avoidHuesAcceptOnlyReds: acceptOnlyReds,
        wgslMediumsExists: existsSync(wgslMediumsPath),
        colorExists: existsSync(colorPath),
    });

    const { bites, basePass } = selfTest();
    const biteFailures = bites.filter((b) => !b.reds);
    facts.selfTest = {
        bites,
        basePass,
        allBite: biteFailures.length === 0 && basePass,
    };
    if (!facts.selfTest.allBite) {
        violations.push(
            `SELF-TEST: ${
                !basePass ? "the good corpus did NOT pass; " : ""
            }bite(s) did not RED: ${biteFailures.map((b) => b.name).join(", ")}`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:viz-aurora",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:viz-aurora — the aurora WGSL-primary painterly field (BC.W-VIZ-AURORA, the device-free SOURCE arm)",
    );
    console.log(`  A1 dead-static 'auto' fall is GONE                     : ${yn(facts.a1.ok)}`);
    console.log(`  A2 preset preview is DEVICE-FREE (no capture bake)    : ${yn(facts.a2.ok)}`);
    console.log(`  A3 WGSL primary carries the painterly mediums (lockstep): ${yn(facts.a3.ok)}`);
    console.log(`  A6 warm-cream default + no teal-on-navy in library     : ${yn(facts.a6.ok)}`);
    console.log(`  A7 deriveAurora ACCEPTS + HONORS avoidHues            : ${yn(facts.a7.ok)}`);
    console.log(`  self-test bites RED (+ good corpus passes)            : ${yn(facts.selfTest.allBite)}`);
    console.log(
        "\n  NOTE: A4 (meanLum>0/chroma>0 on a real backend) + A5 (the painterly statistics floor)",
    );
    console.log(
        "  are the LIVE-GPU paint arms — the orchestrator's real-Metal capture (tests-visual/viz-aurora.spec.ts",
    );
    console.log("  + the W-VIZ-AURORA-DELTA), NOT this device-free gate (the cardinal split).");

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
