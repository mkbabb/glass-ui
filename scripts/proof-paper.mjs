#!/usr/bin/env node
// BG.W-PAPER-TEXTURE-UNIFY — proof:paper, the ONE-warm-raster-tooth-primary LOCK
// (device-free SOURCE gate; the comment-strip + pure-detector house pattern,
// mirroring proof-paper-grid.mjs / proof-shadow-contract.mjs).
//
// THE DEFECT (KS-PAPER §1.1 — the SVG-noise path rejected TWICE, verbatim
// "disgusting metallic", recurred a third time at D-2): the paper tooth was a
// grey `feTurbulence` + `feColorMatrix saturate=0` speckle whose warmth was
// BORROWED from the substrate below (multiply). When the universal warm plane
// retired, the tooth desaturated below the C 0.02 warm floor and read metallic-
// gray. `feDiffuseLighting` (the lighting primitive) is structurally sheen-prone
// ("specular IS the metal").
//
// THE FIX this gate locks: `--paper-grain-tooth` is ONE warm RASTER tooth — a
// deterministic, engine-invariant, warm-ecru fiber weave (crossed `repeating-
// linear-gradient` fibers; every stop a warm-ecru/umber `oklch()`, C ≥ 0.02 at
// SOURCE) with NO lighting primitive (a raster cannot read metallic). The
// procedural `feTurbulence` survives ONLY as the demoted, `@supports`-gated
// `--paper-grain-relief` enhancement (warm-duotone, NO feDiffuseLighting), never
// load-bearing. The 6 paper consumers read the ONE warm tooth.
//
// SIX device-free arms (necessary-not-sufficient; the BINDING truth is the live
// π + the proof:ba-gestalt paper-band verdict — the no-double-warm CEILING + the
// no-squint std floor + the no-metallic gestalt ride the paint judge):
//   A — paper-texture-single: `--paper-grain-tooth` is the ONE tooth source; the
//       two paper.css utilities + cards.css `.paper-texture` read it; the cards
//       consumer MIGRATED off the grey `--paper-clean-texture` (the glass-grain
//       system keeps that disjoint name).
//   B — warm FLOOR at SOURCE: every `oklch()` stop in the primary tooth carries
//       C ≥ 0.020 (bake target ~0.045) AND a warm hue H ∈ [40°, 110°]; ≥3
//       distinct warm stops (a real weave, not a single flat wash); mean C ≥
//       0.020 (no grey stop dilutes it below the floor).
//   C — feTurbulence DEMOTED: the primary tooth value carries NO `feTurbulence`
//       and NO lighting primitive (`feDiffuseLighting`/`feSpecularLighting` —
//       the retired metallic mechanism); any `feTurbulence` in paper.css lives
//       ONLY inside an `@supports` block (the demoted enhancement), never at the
//       always-on top level.
//   D — the blend LAW: paper.css resolves `mix-blend-mode: multiply` (light) +
//       a `.dark` `mix-blend-mode: screen` arm; NEVER `overlay`/`soft-light`
//       (identity on the cream/ink poles — the self-cancelling defect).
//   E — the anti-pop layering: both utilities layer `var(--paper-grain-relief),
//       var(--paper-grain-tooth)` (two always-present layers) + `--paper-grain-
//       relief` defaults `none` at :root, re-defined INSIDE the `@supports`
//       block — the image is never `none → image` (design-idioms §12).
//   F — the register fence: paper.css NEVER touches `--glass-grain-opacity`
//       (0.025/0.045 — the calm glass whisper is BYTE-UNTOUCHED; paper is warm
//       material, glass is a neutral whisper).
//
// Born-RED at HEAD (the grey feTurbulence primary): arm B (no warm oklch), arm C
// (feTurbulence in the primary), arm A (cards reads `--paper-clean-texture`).
// House style mirrors proof-paper-grid.mjs: ESM .mjs, comment-strip first, a
// pure exported detector, a byte-stable JSON artefact, a human summary,
// process.exit(1) on any violation, + a SELF-TEST bite (--self-test).

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const WARM_FLOOR = 0.02; // BA.W-NO-GRAY warm-chroma floor at SOURCE
const WARM_HUE = [40, 110]; // the warm-ecru/umber band (OKLCh hue degrees)
const MIN_WARM_STOPS = 3; // a real fiber weave, not a single flat wash

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        PAPER_CSS: resolve(ROOT, "src/styles/paper.css"),
        CARDS_CSS: resolve(ROOT, "src/styles/cards.css"),
        ARTIFACT: gateArtifactPath("GLASS_UI_PAPER_ARTIFACT", "BG-paper"),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

// Blank `/* … */` block comments to spaces (preserving newlines) so a token in a
// prose comment never false-witnesses — the false-witness discipline.
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// The brace-balanced body ranges of every `@supports (...)` block — [open, close]
// index pairs into `css`, so a token's position can be tested for containment.
function supportsBlockRanges(css) {
    const ranges = [];
    const re = /@supports\b[^{]*\{/g;
    let m;
    while ((m = re.exec(css)) !== null) {
        const open = css.indexOf("{", m.index);
        if (open === -1) continue;
        let depth = 0;
        for (let i = open; i < css.length; i++) {
            if (css[i] === "{") depth++;
            else if (css[i] === "}") {
                depth--;
                if (depth === 0) {
                    ranges.push([open, i]);
                    re.lastIndex = i + 1;
                    break;
                }
            }
        }
    }
    return ranges;
}
const insideAny = (idx, ranges) => ranges.some(([a, b]) => idx > a && idx < b);

// Extract the `--paper-grain-tooth:` declaration VALUE (the primary tooth). The
// value spans multiple lines but carries no `;` inside its gradient parens, so
// the first `;` terminates it. Declared ONCE at the top-level :root.
function primaryToothValue(css) {
    const m = css.match(/--paper-grain-tooth\s*:\s*([\s\S]*?);/);
    return m ? m[1] : null;
}

// Every `oklch(L C H …)` triple in a value — chroma is the C channel directly
// (no matrix conversion; the value is already in OKLCh polar form).
function oklchStops(value) {
    const stops = [];
    const re = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/gi;
    let m;
    while ((m = re.exec(value)) !== null) {
        stops.push({ L: Number(m[1]), C: Number(m[2]), H: Number(m[3]) });
    }
    return stops;
}

/**
 * The pure detector. Takes comment-stripped sources, returns {facts, violations}.
 */
export function detectPaper({ paperCss, cardsCss }) {
    const violations = [];
    const facts = {};

    const toothValue = primaryToothValue(paperCss);
    facts.declaresTooth = toothValue !== null;

    // ── A — paper-texture-single + the cards migration ───────────────────
    if (toothValue === null) {
        violations.push(
            "A: paper.css declares no `--paper-grain-tooth` (the ONE warm raster tooth source is absent)",
        );
    }
    // Both paper.css utilities read the tooth.
    const underpaintReads = /paper-underpaint[\s\S]*?var\(\s*--paper-grain-tooth\s*\)/.test(
        paperCss,
    );
    const overlayReads =
        /paper-grain-overlay[\s\S]*?var\(\s*--paper-grain-tooth\s*\)/.test(paperCss);
    facts.aUtilitiesRead = underpaintReads && overlayReads;
    if (!underpaintReads)
        violations.push(
            "A: the `paper-underpaint` utility does not read `var(--paper-grain-tooth)`",
        );
    if (!overlayReads)
        violations.push(
            "A: the `paper-grain-overlay` utility does not read `var(--paper-grain-tooth)`",
        );

    // The cards `.paper-texture` consumer MIGRATED onto the warm tooth — it reads
    // `var(--paper-grain-tooth)` and NO LONGER reads the grey `--paper-clean-
    // texture` (which stays the disjoint GLASS-grain system's name).
    const paperTextureBody = matchRuleBody(cardsCss, /\.paper-texture\s*\{/);
    const cardsReadsTooth = paperTextureBody
        ? /var\(\s*--paper-grain-tooth\s*\)/.test(paperTextureBody)
        : false;
    const cardsReadsCleanTexture = paperTextureBody
        ? /var\(\s*--paper-clean-texture\s*\)/.test(paperTextureBody)
        : false;
    facts.aCardsMigrated = cardsReadsTooth && !cardsReadsCleanTexture;
    if (!paperTextureBody)
        violations.push(
            "A: cards.css has no `.paper-texture` rule (the paper consumer is absent)",
        );
    else {
        if (!cardsReadsTooth)
            violations.push(
                "A: cards.css `.paper-texture` does not read `var(--paper-grain-tooth)` (the paper consumer is not migrated onto the ONE warm tooth)",
            );
        if (cardsReadsCleanTexture)
            violations.push(
                "A: cards.css `.paper-texture` still reads `var(--paper-clean-texture)` (the grey whisper — a paper surface must read the WARM tooth; `--paper-clean-texture` stays the disjoint glass-grain name)",
            );
    }

    // ── B — warm FLOOR at SOURCE ──────────────────────────────────────────
    const stops = toothValue ? oklchStops(toothValue) : [];
    facts.bStopCount = stops.length;
    const belowFloor = stops.filter((s) => s.C < WARM_FLOOR);
    const outOfHue = stops.filter((s) => s.H < WARM_HUE[0] || s.H > WARM_HUE[1]);
    const meanC = stops.length
        ? stops.reduce((a, s) => a + s.C, 0) / stops.length
        : 0;
    facts.bMeanChroma = Number(meanC.toFixed(4));
    facts.bBelowFloor = belowFloor.length;
    facts.bOutOfHue = outOfHue.length;
    if (stops.length < MIN_WARM_STOPS)
        violations.push(
            `B: the tooth has ${stops.length} oklch stops (< ${MIN_WARM_STOPS}) — a warm raster tooth is a fiber WEAVE of warm-ecru/umber stops, not a flat wash (a grey feTurbulence primary has ZERO)`,
        );
    if (belowFloor.length > 0)
        violations.push(
            `B: ${belowFloor.length} tooth oklch stop(s) carry C < ${WARM_FLOOR} (the warm-chroma floor — a below-floor stop reads gray, the D-2 metallic-gray recurrence)`,
        );
    if (outOfHue.length > 0)
        violations.push(
            `B: ${outOfHue.length} tooth oklch stop(s) fall outside the warm hue band H ∈ [${WARM_HUE[0]}, ${WARM_HUE[1]}] (a warm tooth is warm-ecru, never a yellow-green cast)`,
        );
    if (stops.length && meanC < WARM_FLOOR)
        violations.push(
            `B: the tooth mean chroma ${meanC.toFixed(4)} < ${WARM_FLOOR} — the weave dilutes below the warm floor`,
        );

    // ── C — feTurbulence DEMOTED ──────────────────────────────────────────
    // The primary tooth value carries NO feTurbulence + NO lighting primitive.
    const toothHasTurb = toothValue ? /feTurbulence/i.test(toothValue) : false;
    const toothHasLighting = toothValue
        ? /fe(Diffuse|Specular)Lighting/i.test(toothValue)
        : false;
    facts.cPrimaryClean = !toothHasTurb && !toothHasLighting;
    if (toothHasTurb)
        violations.push(
            "C: the PRIMARY `--paper-grain-tooth` value contains `feTurbulence` — the procedural SVG-noise the user rejected TWICE cannot be the primary (it is demoted to the `@supports`-gated relief)",
        );
    if (toothHasLighting)
        violations.push(
            "C: the PRIMARY tooth contains `feDiffuseLighting`/`feSpecularLighting` — the metallic lighting primitive is RETIRED (specular IS the metal, KS-PAPER R2)",
        );

    // Any `feTurbulence` in paper.css lives ONLY inside an `@supports` block.
    const supportsRanges = supportsBlockRanges(paperCss);
    const turbRe = /feTurbulence/gi;
    let mt;
    let strayTurb = 0;
    let turbTotal = 0;
    while ((mt = turbRe.exec(paperCss)) !== null) {
        turbTotal++;
        if (!insideAny(mt.index, supportsRanges)) strayTurb++;
    }
    facts.cTurbTotal = turbTotal;
    facts.cTurbAllInSupports = strayTurb === 0;
    if (strayTurb > 0)
        violations.push(
            `C: ${strayTurb} \`feTurbulence\` occurrence(s) in paper.css sit OUTSIDE an \`@supports\` block — the procedural noise must be the DEMOTED, capability-gated enhancement, never always-on`,
        );

    // The lighting primitive must be ABSENT from paper.css entirely (retired).
    const lightingTotal = (paperCss.match(/fe(Diffuse|Specular)Lighting/gi) || []).length;
    facts.cLightingAbsent = lightingTotal === 0;
    if (lightingTotal > 0)
        violations.push(
            `C: ${lightingTotal} \`feDiffuse/SpecularLighting\` occurrence(s) in paper.css — the metallic lighting primitive is retired wholesale (the raster carries the tooth; the relief is a lighting-FREE warm-duotone noise)`,
        );

    // ── D — the blend LAW ─────────────────────────────────────────────────
    const hasMultiply = /mix-blend-mode\s*:\s*multiply/.test(paperCss);
    const hasScreen = /mix-blend-mode\s*:\s*screen/.test(paperCss);
    const hasBadBlend = /mix-blend-mode\s*:\s*(overlay|soft-light)/.test(paperCss);
    facts.dBlendLaw = hasMultiply && hasScreen && !hasBadBlend;
    if (!hasMultiply)
        violations.push(
            "D: paper.css does not resolve `mix-blend-mode: multiply` (the light arm — ink sinks into the pits)",
        );
    if (!hasScreen)
        violations.push(
            "D: paper.css does not resolve a `mix-blend-mode: screen` dark arm (fiber catches light off the ink)",
        );
    if (hasBadBlend)
        violations.push(
            "D: paper.css uses `mix-blend-mode: overlay`/`soft-light` — these collapse to IDENTITY on the cream/ink poles (the self-cancelling defect); the paper register is multiply/screen",
        );

    // ── E — the anti-pop layering ─────────────────────────────────────────
    // Both utilities layer `var(--paper-grain-relief), var(--paper-grain-tooth)`
    // (two always-present layers); `--paper-grain-relief` defaults `none` at
    // :root and is re-defined INSIDE the @supports block.
    const layered = (paperCss.match(
        /background-image\s*:\s*var\(\s*--paper-grain-relief\s*\)\s*,\s*var\(\s*--paper-grain-tooth\s*\)/g,
    ) || []).length;
    facts.eLayeredCount = layered;
    if (layered < 2)
        violations.push(
            "E: the two paper utilities do not both layer `var(--paper-grain-relief), var(--paper-grain-tooth)` (the anti-pop always-present layer; the relief must ride ABOVE the raster in ONE stack)",
        );
    const reliefDefaultNone = /--paper-grain-relief\s*:\s*none\b/.test(paperCss);
    // The relief is re-defined (to the feTurbulence url) inside an @supports body.
    const reliefRe = /--paper-grain-relief\s*:/g;
    let mr;
    let reliefInSupports = false;
    while ((mr = reliefRe.exec(paperCss)) !== null) {
        if (insideAny(mr.index, supportsRanges)) reliefInSupports = true;
    }
    facts.eReliefDefaultNone = reliefDefaultNone;
    facts.eReliefGated = reliefInSupports;
    if (!reliefDefaultNone)
        violations.push(
            "E: `--paper-grain-relief` does not default to `none` at :root (the enhancement must be DROPPED by default — the everywhere floor is the warm raster alone)",
        );
    if (!reliefInSupports)
        violations.push(
            "E: `--paper-grain-relief` is not re-defined inside an `@supports` block (the demoted enhancement must be capability-gated, not always engaged)",
        );

    // ── F — the register fence (glass whisper byte-untouched) ─────────────
    const touchesGlassGrain = /--glass-grain-opacity\s*:/.test(paperCss);
    facts.fGlassFenceHeld = !touchesGlassGrain;
    if (touchesGlassGrain)
        violations.push(
            "F: paper.css writes `--glass-grain-opacity` — the calm glass whisper (0.025/0.045) is BYTE-UNTOUCHED (the register fence: paper is warm material, glass is a neutral whisper)",
        );

    facts.a = facts.aUtilitiesRead && facts.aCardsMigrated && facts.declaresTooth;
    facts.b =
        stops.length >= MIN_WARM_STOPS &&
        belowFloor.length === 0 &&
        outOfHue.length === 0 &&
        meanC >= WARM_FLOOR;
    facts.c =
        facts.cPrimaryClean && facts.cTurbAllInSupports && facts.cLightingAbsent;
    facts.d = facts.dBlendLaw;
    facts.e = layered >= 2 && reliefDefaultNone && reliefInSupports;
    facts.f = facts.fGlassFenceHeld;

    return { facts, violations };
}

// Find the `{ … }` body of the first rule whose selector matches `selectorRe`
// (brace-balanced so a nested `&::after { … }` is captured).
function matchRuleBody(css, selectorRe) {
    const m = css.match(selectorRe);
    if (!m) return null;
    const open = css.indexOf("{", m.index);
    if (open === -1) return null;
    let depth = 0;
    for (let i = open; i < css.length; i++) {
        if (css[i] === "{") depth++;
        else if (css[i] === "}") {
            depth--;
            if (depth === 0) return css.slice(open + 1, i);
        }
    }
    return null;
}

export function detectSource(sources) {
    return detectPaper({
        paperCss: stripBlockComments(sources.paperCss ?? ""),
        cardsCss: stripBlockComments(sources.cardsCss ?? ""),
    });
}

function loadSources() {
    const { PAPER_CSS, CARDS_CSS } = cliPaths();
    return {
        paperCss: readFileSync(PAPER_CSS, "utf8"),
        cardsCss: readFileSync(CARDS_CSS, "utf8"),
    };
}

// ── SELF-TEST — prove each arm has teeth (the false-witness floor) ──────────
function selfTest() {
    const failures = [];
    const ASSERT = (name, cond) => {
        if (!cond) failures.push(name);
    };

    const goodPaper = `:root {
        --paper-grain-tooth:
            repeating-linear-gradient(28deg, oklch(0.9 0.045 84 / 0.5) 0, oklch(0.62 0.052 60 / 0.5) 1.4px, oklch(0.9 0.045 84 / 0.5) 2.8px),
            repeating-linear-gradient(-64deg, oklch(0.88 0.04 82 / 0.38) 0, oklch(0.6 0.05 58 / 0.38) 1.75px, oklch(0.88 0.04 82 / 0.38) 3.5px),
            repeating-linear-gradient(10deg, oklch(0.85 0.05 78 / 0.28) 0, oklch(0.7 0.055 66 / 0.28) 3.5px, oklch(0.85 0.05 78 / 0.28) 7px);
        --paper-grain-tile: 140px;
        --paper-grain-relief: none;
    }
    @supports (backdrop-filter: blur(1px)) {
        :root {
            --paper-grain-relief: url("data:image/svg+xml,...feTurbulence type='fractalNoise' feComponentTransfer...");
        }
    }
    @utility paper-underpaint {
        background-image: var(--paper-grain-relief), var(--paper-grain-tooth);
        mix-blend-mode: multiply;
    }
    .dark .paper-underpaint { mix-blend-mode: screen; }
    @utility paper-grain-overlay {
        &::after {
            background-image: var(--paper-grain-relief), var(--paper-grain-tooth);
            mix-blend-mode: multiply;
        }
    }
    .dark .paper-grain-overlay::after { mix-blend-mode: screen; }`;
    const goodCards = `.paper-texture {
        background-image: var(--paper-grain-tooth);
        background-size: var(--paper-grain-tile);
        background-blend-mode: multiply;
    }
    .dark .paper-texture { background-blend-mode: screen; }`;

    let r = detectSource({ paperCss: goodPaper, cardsCss: goodCards });
    ASSERT("sound fixture is green", r.violations.length === 0);

    // C bite — a feTurbulence PRIMARY REDs.
    const turbPrimary = goodPaper.replace(
        /--paper-grain-tooth:[\s\S]*?;/,
        "--paper-grain-tooth: url(\"data:image/svg+xml,...feTurbulence type='fractalNoise' feColorMatrix saturate=0...\");",
    );
    r = detectSource({ paperCss: turbPrimary, cardsCss: goodCards });
    ASSERT(
        "C bite reds a feTurbulence primary",
        r.violations.some((v) => v.startsWith("C: the PRIMARY")),
    );

    // B bite — a grey (below-floor chroma) tooth stop REDs.
    const greyTooth = goodPaper.replace(
        "oklch(0.9 0.045 84 / 0.5)",
        "oklch(0.9 0.004 84 / 0.5)",
    );
    r = detectSource({ paperCss: greyTooth, cardsCss: goodCards });
    ASSERT(
        "B bite reds a below-floor chroma stop",
        r.violations.some((v) => v.startsWith("B:") && v.includes("floor")),
    );

    // B bite 2 — a yellow-green hue REDs.
    const greenTooth = goodPaper.replace(
        "oklch(0.62 0.052 60 / 0.5)",
        "oklch(0.62 0.052 130 / 0.5)",
    );
    r = detectSource({ paperCss: greenTooth, cardsCss: goodCards });
    ASSERT(
        "B bite reds an out-of-hue stop",
        r.violations.some((v) => v.includes("warm hue band")),
    );

    // D bite — an overlay blend REDs.
    const overlayPaper = goodPaper.replace(
        "mix-blend-mode: multiply",
        "mix-blend-mode: overlay",
    );
    r = detectSource({ paperCss: overlayPaper, cardsCss: goodCards });
    ASSERT(
        "D bite reds an overlay blend",
        r.violations.some((v) => v.startsWith("D:") && v.includes("overlay")),
    );

    // A bite — cards reading the grey clean-texture REDs.
    const cleanCards = goodCards.replace(
        "var(--paper-grain-tooth)",
        "var(--paper-clean-texture)",
    );
    r = detectSource({ paperCss: goodPaper, cardsCss: cleanCards });
    ASSERT(
        "A bite reds cards reading --paper-clean-texture",
        r.violations.some((v) => v.includes("--paper-clean-texture")),
    );

    // C bite 2 — a feTurbulence OUTSIDE @supports (stray, always-on) REDs.
    const strayTurbPaper = goodPaper.replace(
        "--paper-grain-relief: none;",
        "--paper-grain-relief: url(\"data:image/svg+xml,...feTurbulence...\"); --paper-decoy: none;",
    );
    r = detectSource({ paperCss: strayTurbPaper, cardsCss: goodCards });
    ASSERT(
        "C bite reds a feTurbulence outside @supports",
        r.violations.some((v) => v.includes("OUTSIDE an `@supports`")),
    );

    // F bite — writing the glass whisper REDs.
    const glassFencePaper = goodPaper.replace(
        "--paper-grain-tile: 140px;",
        "--paper-grain-tile: 140px; --glass-grain-opacity: 0.1;",
    );
    r = detectSource({ paperCss: glassFencePaper, cardsCss: goodCards });
    ASSERT(
        "F bite reds a glass-whisper write",
        r.violations.some((v) => v.startsWith("F:")),
    );

    // E bite — a single-layer (relief dropped) background-image REDs.
    const noLayerPaper = goodPaper.replace(
        /background-image: var\(\s*--paper-grain-relief\s*\), var\(\s*--paper-grain-tooth\s*\)/g,
        "background-image: var(--paper-grain-tooth)",
    );
    r = detectSource({ paperCss: noLayerPaper, cardsCss: goodCards });
    ASSERT(
        "E bite reds a non-layered (relief-dropped) utility",
        r.violations.some((v) => v.startsWith("E:")),
    );

    if (failures.length > 0) {
        console.error("proof:paper SELF-TEST FAILED:");
        for (const f of failures) console.error(`  ✗ ${f}`);
        process.exit(1);
    }
    console.log("proof:paper SELF-TEST PASSED — all arms have teeth.");
    process.exit(0);
}

function run() {
    const { ROOT, ARTIFACT } = cliPaths();
    const { facts, violations } = detectSource(loadSources());
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "contract",
        command: "npm run proof:paper",
        facts,
        violations,
    });

    console.log(
        "proof:paper — ONE warm raster tooth PRIMARY (C≥0.02); feTurbulence demoted to @supports (BG.W-PAPER-TEXTURE-UNIFY)",
    );
    console.log(`  A tooth-single + cards migrated       : ${facts.a ? "YES" : "NO"}`);
    console.log(
        `  B warm floor at source (mean C ${facts.bMeanChroma}) : ${facts.b ? "YES" : "NO"}`,
    );
    console.log(`  C feTurbulence demoted, lighting retired : ${facts.c ? "YES" : "NO"}`);
    console.log(`  D blend law multiply/screen           : ${facts.d ? "YES" : "NO"}`);
    console.log(`  E anti-pop relief layering            : ${facts.e ? "YES" : "NO"}`);
    console.log(`  F glass-whisper register fence held   : ${facts.f ? "YES" : "NO"}`);
    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    if (process.argv.includes("--self-test")) selfTest();
    else run();
}
