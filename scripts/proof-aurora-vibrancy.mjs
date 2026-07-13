#!/usr/bin/env node
// BI.W-AURORA-VIBRANCY — proof:aurora-vibrancy.
//
// The vibrancy contract: the library's OWN default aurora field is warm-VIVID (not warm-
// pale), the setting-sun pink note is DEMO-LOCAL (presets-in-consumers — no pink hue in a
// library token), the vibrancy lift stays bounded within the AA/APCA bright-bucket
// headroom, the GAP-L2 dark-scheme luminance band [0.18, 0.42] is REACHABLE, and the
// studio canvas grew (UF-E4).
//
// Device-free SOURCE/STRUCTURE arms (the TypeScript object literals ARE the artefacts —
// the precept-valid form for palette content) + one live deriveAurora dark-leg probe
// (spawned tsx, color.ts imports value.js). The binding composited AA/vividness readback
// is the π-lane spec tests-visual/aurora-vibrancy.spec.ts.
//
//   AV1 — the pale LIBRARY presets clear the warm-chroma floor: DEFAULT_AURORA_CONFIG's
//         palette has mean OKLab C ≥ 0.13, a real hue SPREAD (a second warm accent hue,
//         not a monochrome ramp), and every hue is WARM (no teal/navy).
//   AV2 — the setting-sun/dusk/vivid presets are DEMO-LOCAL (in demo/), and NO pink hue
//         (a saturated stop in the rose/pink band) enters a LIBRARY src/ palette (the
//         presets-in-consumers fence).
//   AV3 — the vibrancy lift is BOUNDED within the AA headroom: the runtime chroma floor
//         VIVID_TARGET stays ≤ the bright-bucket ceiling, and the default palette's mean L
//         stays high enough that the darken keeps content legible (the π owns the binding
//         AA number).
//   AV4 — the studio canvas layout bump is present (VizStudio + aurora height envelope
//         grew past 720px; AuroraStage carries a min-height floor).
//   GAP-L2 — the atoms door (lightnessScheme/lBand/chromaVariance/counterpoint/hueSpread)
//         exists AND a scheme:"dark" derived field composites INTO [0.18, 0.42] (the
//         O-26 dark-leg: dark cocoa cards no longer float on a bright salmon field).
//
// bite-check: a planted setting-sun pink hue in the LIBRARY palette REDs AV2; a planted
// pale palette (mean C < 0.13) REDs AV1; a raised DERIVE_L_BAND_DARK apex REDs GAP-L2.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const LIB_PRESETS = resolve(ROOT, "src/components/custom/aurora/constants/presets.ts");
const LIB_ATOMS = resolve(ROOT, "src/components/custom/aurora/composables/atoms.ts");
const DEMO_PRESETS = resolve(ROOT, "demo/stories/substrates/aurora/presets.ts");
const VIZ_STUDIO = resolve(ROOT, "demo/stories/substrates/VizStudio.vue");
const AURORA_VUE = resolve(ROOT, "demo/stories/substrates/aurora.vue");
const AURORA_STAGE = resolve(ROOT, "demo/stories/substrates/aurora/AuroraStage.vue");

const ARTIFACT = gateArtifactPath(
    "GLASS_UI_AURORA_VIBRANCY_ARTIFACT",
    "BI-aurora-vibrancy",
);

// ── the warm-chroma floor + hue bands ───────────────────────────────────────────
const CHROMA_FLOOR = 0.13; // AV1 — mean OKLab C of the default library palette
const HUE_SPREAD_MIN = 28; // AV1 — a real second warm accent (not a monochrome ramp)
const COOL_BAND = [150, 300]; // teal/cyan/blue/violet — no library stop may land here
const PINK_BAND = [[335, 360], [0, 20]]; // the setting-sun rose note — DEMO-LOCAL only
const PINK_CHROMA = 0.10; // a saturated pink (below this the hue is a warm whisper, not a note)
const VIVID_TARGET_CEILING = 0.20; // AV3 — the bright-bucket AA headroom bound
const DARK_BAND = [0.18, 0.42]; // GAP-L2 — the reachable luminous-dark leg
const STUDIO_HEIGHT_PRIOR = 720; // AV4 — the pre-BI cap; the bump must exceed it

const wrap360 = (h) => ((h % 360) + 360) % 360;
const inBand = (h, [s, e]) => {
    const hh = wrap360(h);
    return s <= e ? hh >= s && hh <= e : hh >= s || hh <= e;
};
const hueDist = (a, b) => {
    const d = Math.abs(wrap360(a) - wrap360(b)) % 360;
    return d > 180 ? 360 - d : d;
};

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : null;
}

/** Extract every `{ L: n, C: n, h: n }` stop literal from a source string. */
function parseStops(src) {
    const stops = [];
    for (const m of src.matchAll(
        /\{\s*L:\s*(-?[\d.]+),\s*C:\s*(-?[\d.]+),\s*h:\s*(-?[\d.]+)/g,
    )) {
        stops.push({ L: +m[1], C: +m[2], h: +m[3] });
    }
    return stops;
}

/** The DEFAULT_AURORA_CONFIG palette (the first `palette: [...]` after the symbol). */
function defaultPalette(src) {
    const at = src.indexOf("DEFAULT_AURORA_CONFIG");
    if (at < 0) return [];
    const tail = src.slice(at);
    const pm = tail.match(/palette:\s*\[([\s\S]*?)\]/);
    return pm ? parseStops(pm[1]) : [];
}

/** The maximum pairwise circular hue distance across a stop set. */
function hueSpread(stops) {
    let max = 0;
    for (let i = 0; i < stops.length; i++)
        for (let j = i + 1; j < stops.length; j++)
            max = Math.max(max, hueDist(stops[i].h, stops[j].h));
    return max;
}

// ── AV1 — the library default palette is warm-vivid + interesting ───────────────
function clauseAV1(libSrc) {
    const viol = [];
    const facts = {};
    const pal = defaultPalette(libSrc);
    facts.stops = pal.length;
    if (pal.length < 2) {
        viol.push("AV1: DEFAULT_AURORA_CONFIG palette not found / too short");
        return { viol, facts };
    }
    const meanC = pal.reduce((s, p) => s + p.C, 0) / pal.length;
    facts.meanChroma = +meanC.toFixed(4);
    if (meanC < CHROMA_FLOOR)
        viol.push(
            `AV1: DEFAULT_AURORA_CONFIG mean OKLab C ${meanC.toFixed(4)} < the warm-vivid floor ${CHROMA_FLOOR} (the pale default reads gray behind glass)`,
        );
    const spread = hueSpread(pal);
    facts.hueSpread = +spread.toFixed(1);
    if (spread < HUE_SPREAD_MIN)
        viol.push(
            `AV1: DEFAULT_AURORA_CONFIG hue spread ${spread.toFixed(1)}° < ${HUE_SPREAD_MIN}° (a monochrome ramp reads flat — no second warm accent hue)`,
        );
    const cool = pal.filter((p) => inBand(p.h, COOL_BAND) && p.C >= 0.02);
    facts.coolStops = cool.map((p) => p.h);
    if (cool.length > 0)
        viol.push(
            `AV1: DEFAULT_AURORA_CONFIG carries a teal/navy stop (hue in [${COOL_BAND}]): ${facts.coolStops} — the warm-floor law`,
        );
    return { viol, facts };
}

// ── AV2 — setting-sun DEMO-LOCAL; no pink hue in a library palette ──────────────
function clauseAV2(libSrc, demoSrc) {
    const viol = [];
    const facts = {};
    // (a) the demo presets exist.
    const demoKeys = ["SETTING_SUN", "DUSK", "VIVID_SETTING_SUN"];
    facts.demoPresets = demoKeys.filter((k) => new RegExp(`\\b${k}\\b`).test(demoSrc));
    for (const k of demoKeys)
        if (!facts.demoPresets.includes(k))
            viol.push(`AV2: the demo-local setting-sun preset ${k} is absent from ${DEMO_PRESETS.replace(ROOT, "")}`);
    // (b) NO saturated pink stop enters a LIBRARY palette (presets-in-consumers fence).
    const libStops = parseStops(libSrc);
    const pink = libStops.filter(
        (p) => p.C >= PINK_CHROMA && PINK_BAND.some((b) => inBand(p.h, b)),
    );
    facts.libPinkStops = pink.map((p) => `${p.h}@C${p.C}`);
    if (pink.length > 0)
        viol.push(
            `AV2: a LIBRARY src/ palette carries a saturated pink hue ${facts.libPinkStops} — the setting-sun pink note is DEMO-LOCAL (presets-in-consumers); no pink enters a library token`,
        );
    return { viol, facts };
}

// ── AV3 — the vibrancy lift stays within the AA/APCA bright-bucket headroom ──────
function clauseAV3(libSrc) {
    const viol = [];
    const facts = {};
    const vt = libSrc.match(/VIVID_TARGET\s*=\s*([\d.]+)/);
    facts.vividTarget = vt ? +vt[1] : null;
    if (facts.vividTarget === null)
        viol.push("AV3: VIVID_TARGET (the runtime chroma floor) not found");
    else if (facts.vividTarget > VIVID_TARGET_CEILING)
        viol.push(
            `AV3: VIVID_TARGET ${facts.vividTarget} > the AA bright-bucket ceiling ${VIVID_TARGET_CEILING} (an unbounded lift drops content-over-glass below AA)`,
        );
    // The default palette must keep a light apex so the bright-bucket darken has headroom
    // (a fully-dark default palette would defeat the light-field AA model). The π owns the
    // binding composited number; here we assert the apex L stays legibly light.
    const pal = defaultPalette(libSrc);
    const apexL = pal.length ? Math.max(...pal.map((p) => p.L)) : 0;
    facts.apexL = +apexL.toFixed(3);
    if (apexL < 0.8)
        viol.push(
            `AV3: DEFAULT_AURORA_CONFIG apex L ${apexL.toFixed(3)} < 0.8 — too dark a default field starves the bright-bucket AA headroom`,
        );
    return { viol, facts };
}

// ── AV4 — the studio canvas grew (UF-E4) ────────────────────────────────────────
function pxCap(src, re) {
    const m = src.match(re);
    if (!m) return null;
    const px = m[1].match(/(\d+)px/);
    return px ? +px[1] : null;
}

function clauseAV4(vizSrc, auroraSrc, stageSrc) {
    const viol = [];
    const facts = {};
    // VizStudio default heightClass — the `min(NNvh, NNNpx)` cap.
    const vizCap = pxCap(vizSrc, /heightClass:\s*"(h-\[min\([^"]*\)\])"/);
    facts.vizStudioCap = vizCap;
    if (vizCap === null || vizCap <= STUDIO_HEIGHT_PRIOR)
        viol.push(
            `AV4: VizStudio default heightClass cap ${vizCap} did not grow past ${STUDIO_HEIGHT_PRIOR}px (the studio canvas must be larger — UF-E4)`,
        );
    // aurora.vue explicit height-class.
    const auroraCap = pxCap(auroraSrc, /height-class="(h-\[min\([^"]*\)\])"/);
    facts.auroraStudioCap = auroraCap;
    if (auroraCap === null || auroraCap <= STUDIO_HEIGHT_PRIOR)
        viol.push(
            `AV4: aurora.vue height-class cap ${auroraCap} did not grow past ${STUDIO_HEIGHT_PRIOR}px`,
        );
    // AuroraStage min-height floor.
    facts.stageMinHeight = /min-h-\[/.test(stageSrc);
    if (!facts.stageMinHeight)
        viol.push("AV4: AuroraStage.vue carries no min-height floor (the core aurora space larger)");
    return { viol, facts };
}

// ── GAP-L2 — the atoms door + the reachable dark leg ─────────────────────────────
function clauseGapL2(atomsSrc) {
    const viol = [];
    const facts = {};
    // (a) the door fields exist on AuroraAtoms.
    const doorFields = ["lightnessScheme", "lBand", "chromaVariance", "chromaCounterpoint", "hueSpread"];
    facts.doorFields = doorFields.filter((f) => new RegExp(`\\b${f}\\??:`).test(atomsSrc));
    for (const f of doorFields)
        if (!facts.doorFields.includes(f))
            viol.push(`GAP-L2: the atoms COLOR door is missing the ${f} field`);
    // (b) the live dark-leg probe — a scheme:"dark" derived field composites INTO [0.18, 0.42].
    const probe = `
      import { deriveAurora } from "./src/components/custom/aurora/composables/color.ts";
      const seeds = ["#c9743a", "#e8d5c4", "#3a93b6", "oklch(0.7 0.15 40)", "#8800ff"];
      const means = [];
      let allIn = true;
      for (const s of seeds) {
        const stops = deriveAurora(s, { stopCount: 5, scheme: "dark" });
        const mean = stops.reduce((a, b) => a + b.L, 0) / stops.length;
        means.push(+mean.toFixed(3));
        if (mean < ${DARK_BAND[0]} || mean > ${DARK_BAND[1]}) allIn = false;
      }
      // the light default stays light (byte-identity for the unset scheme).
      const light = deriveAurora("#c9743a", { stopCount: 5 });
      const lightMean = light.reduce((a, b) => a + b.L, 0) / light.length;
      console.log(JSON.stringify({ allIn, means, lightMean: +lightMean.toFixed(3) }));
    `;
    let probeOk = false;
    try {
        const res = spawnSync(
            process.platform === "win32" ? "npx.cmd" : "npx",
            ["tsx", "-e", probe],
            { cwd: ROOT, encoding: "utf8", timeout: 90000 },
        );
        const out = (res.stdout || "").trim().split("\n").pop() || "";
        const parsed = JSON.parse(out);
        facts.darkMeans = parsed.means;
        facts.lightMean = parsed.lightMean;
        probeOk = parsed.allIn === true && parsed.lightMean > 0.5;
    } catch (e) {
        facts.probeError = String(e).slice(0, 160);
    }
    facts.darkLegReachable = probeOk;
    if (!probeOk)
        viol.push(
            `GAP-L2: a scheme:"dark" derived field does NOT composite into [${DARK_BAND}] (dark cocoa cards float on a bright salmon field) — means=${JSON.stringify(facts.darkMeans)}`,
        );
    return { viol, facts };
}

// ── self-test bites: the detector is not hollow ─────────────────────────────────
function selfTest() {
    const fails = [];
    // (1) a planted pale library palette (mean C < floor) REDs AV1.
    const pale = 'DEFAULT_AURORA_CONFIG: X = { palette: [ { L: 0.7, C: 0.06, h: 55 }, { L: 0.8, C: 0.05, h: 60 } ], };';
    if (clauseAV1(pale).viol.length === 0)
        fails.push("self-test: a pale library palette (mean C < 0.13) did NOT red AV1");
    // (2) a warm-vivid library palette does NOT red AV1 (no false-positive).
    const good = 'DEFAULT_AURORA_CONFIG: X = { palette: [ { L: 0.64, C: 0.17, h: 30 }, { L: 0.76, C: 0.15, h: 55 }, { L: 0.87, C: 0.13, h: 82 } ], };';
    if (clauseAV1(good).viol.length !== 0)
        fails.push("self-test: a warm-vivid library palette FALSELY red AV1");
    // (3) a planted setting-sun pink stop in a library palette REDs AV2.
    const pink = '{ L: 0.66, C: 0.145, h: 12 }';
    if (clauseAV2(pink, "SETTING_SUN DUSK VIVID_SETTING_SUN").viol.length === 0)
        fails.push("self-test: a planted setting-sun pink hue in a library palette did NOT red AV2");
    // (4) the real warm library palette (hues 30/55/82) does NOT red AV2's pink fence.
    const warm = '{ L: 0.64, C: 0.17, h: 30 } { L: 0.76, C: 0.15, h: 55 } { L: 0.87, C: 0.13, h: 82 }';
    const av2warm = clauseAV2(warm, "SETTING_SUN DUSK VIVID_SETTING_SUN");
    if (av2warm.facts.libPinkStops.length !== 0)
        fails.push("self-test: the warm library palette FALSELY tripped AV2's pink fence");
    // (5) a shrunk studio canvas (cap ≤ 720) REDs AV4.
    const small = clauseAV4('heightClass: "h-[min(78vh,720px)]"', 'height-class="h-[min(78vh,720px)]"', '<div class="min-h-[30rem]">');
    if (small.viol.length === 0)
        fails.push("self-test: a 720px studio canvas did NOT red AV4");
    return fails;
}

function main() {
    const libSrc = read(LIB_PRESETS);
    const atomsSrc = read(LIB_ATOMS);
    const demoSrc = read(DEMO_PRESETS);
    const vizSrc = read(VIZ_STUDIO);
    const auroraSrc = read(AURORA_VUE);
    const stageSrc = read(AURORA_STAGE);
    if (!libSrc || !atomsSrc || !demoSrc || !vizSrc || !auroraSrc || !stageSrc) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "fail",
            gate: "proof:aurora-vibrancy",
            violations: ["one or more aurora source files absent"],
        });
        console.error("[proof:aurora-vibrancy] FAIL — source absent");
        process.exit(1);
    }

    const av1 = clauseAV1(libSrc);
    const av2 = clauseAV2(libSrc, demoSrc);
    const av3 = clauseAV3(libSrc);
    const av4 = clauseAV4(vizSrc, auroraSrc, stageSrc);
    const gapL2 = clauseGapL2(atomsSrc);

    const violations = [...av1.viol, ...av2.viol, ...av3.viol, ...av4.viol, ...gapL2.viol];
    const selfFails = selfTest();
    violations.push(...selfFails);

    const facts = {
        av1: av1.facts,
        av2: av2.facts,
        av3: av3.facts,
        av4: av4.facts,
        gapL2: gapL2.facts,
        selfTestFails: selfFails.length,
    };

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:aurora-vibrancy",
        facts,
        violations,
    });

    if (violations.length) {
        console.error("[proof:aurora-vibrancy] FAIL\n  - " + violations.join("\n  - "));
        process.exit(1);
    }
    console.log(
        `[proof:aurora-vibrancy] PASS — default palette mean C=${facts.av1.meanChroma} spread=${facts.av1.hueSpread}°, setting-sun demo-local (no library pink), studio ${facts.av4.vizStudioCap}px, dark-leg means=${JSON.stringify(facts.gapL2.darkMeans)}`,
    );
}

main();
