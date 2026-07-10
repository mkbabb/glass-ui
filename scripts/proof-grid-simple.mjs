#!/usr/bin/env node
// BC.W-GRID-SIMPLE — the blurry in-card grid ABROGATED → ONE crisp, evenly-spaced,
// LARGER, full-bleed page grid (proof:grid-simple).
//
// The user condemned the grid background as "a blurry mess → TOTALLY ABROGATE it.
// It's a SIMPLE grid — like in keyframes.js. The grid is oddly spaced → consistent +
// larger, and NOT displayed in the card on pages like this" (USER-DEFECTS §E). The
// "blurry mess" is three concrete mechanisms: (A) the grid is CLIPPED inside the
// rounded `.story-hero` card (the `-z-10` mount); (B) the grid is BLURRED through the
// `wash`/`quiet` glass plate it reads through (`backdrop-filter: blur()` convolves the
// crisp lines); (C) the pitch is "oddly spaced" (28px demo / 32px library, neither
// rem-relative, `center center`-positioned so the lines drift off the device-pixel
// grid). The fix: ABROGATE the `--story-grid-*` 28px/center recipe + re-express ONE
// crisp `--grid-*` 1rem/5rem 3%/11% full-bleed page wash (the keyframes.js
// `EditorShell` magnitudes), de-clipped (the `.story-hero-bg--bleed` escape) + de-
// blurred (the page-background mount, NOT a wash card the grid reads through).
//
// Six falsifiable device-free SOURCE witnesses (each born-RED on HEAD pre-wave, GREEN
// at close), plus a per-clause self-test bite + the binding π readback
// (tests-visual/grid-simple.spec.ts — the crisp hairline scan, the full-bleed mount,
// both modes + WebKit, the orchestrator's live capture):
//
//   G1 — THE ABROGATION IS CLEAN (no alias). `--story-grid-size` /
//        `--story-grid-color` / `--story-grid-color-strong` are GONE from
//        story-hero.css (incl. the dark arm); `background-position: center center` is
//        GONE; the card-interior `.paper-grid` paint is abrogated or re-pointed onto
//        `--grid-*` with NO blur path on the element. RED at HEAD: all present.
//   G2 — ONE RHYTHM SOURCE, kf magnitudes. `--grid-pitch` (rem, 1rem), `--grid-major`
//        (5rem), `--grid-line` (3%), `--grid-line-major` (11%) exist ONCE in
//        scale-paper.css; the demo `.grid-bg` reads `--grid-*`; the library
//        `--paper-grid-texture-size` unifies onto `--grid-pitch` (no second 28/32px
//        pitch). The fine strength < the 10% floor (the "less busy" calibration); the
//        major ≥ 10% (the legibility floor). RED at HEAD: tokens absent + 32px pitch.
//   G3 — CRISP BY CONSTRUCTION. `.grid-bg` uses HARD color stops
//        (`var(--line) 0 1px, transparent 1px …`), `background-position: 0 0`, and
//        carries NO filter/backdrop-filter/opacity/transform on the grid element.
//        RED at HEAD: `.story-bg-grid` is `center center`.
//   G4 — NOT IN THE CARD (full-bleed). The static `grid`/`paper` backdrop mounts via
//        the `.story-hero-bg--bleed` (`position: fixed; inset: 0`) escape, NOT `-z-10`
//        inside the clipped `.story-hero`; the `cardTier → wash/quiet` drop is removed
//        for the static backdrops (the grid is not read through a blurred plate). RED
//        at HEAD: HEAD gates the bleed escape on `fullBleed` (live only).
//   G5 — WARM-CREAM IDENTITY, ONE line color, NO teal/navy. The line is
//        `color-mix(… --foreground N% …)`, re-tinting with the theme; NO teal/navy
//        literal in the grid recipe/tokens. RED at HEAD: held; guards a re-intro.
//   G6 — STATIC BY CONSTRUCTION, no GL. NO `src/components/custom/grid-simple/` dir,
//        NO shader/rAF/`<canvas>`/`usePointerVelocityField` in the grid path; it is a
//        pure CSS `background-image`. RED at HEAD: held; guards a re-intro.
//
// House style mirrors proof-eyebrow-union.mjs / proof-paper-grid.mjs: ESM .mjs,
// comment-strip first (the false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on any
// violation, + the per-clause self-test bites run from `run()`.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip /* *​/ block comments so a witness never matches commented prose. */
function stripBlockComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Strip <!-- --> + /* *​/ + // comments so a Vue/JS witness never matches prose. */
function stripVueComments(src) {
    return src
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

/** Match a CSS rule body `selector { … }` (one level, brace-balanced). */
function matchRuleBody(css, headRe) {
    const m = css.match(headRe);
    if (!m) return null;
    const start = m.index + m[0].length;
    let depth = 1;
    for (let i = start; i < css.length; i++) {
        const c = css[i];
        if (c === "{") depth++;
        else if (c === "}") {
            depth--;
            if (depth === 0) return css.slice(start, i);
        }
    }
    return null;
}

/** Parse a percentage out of a `color-mix(… var(--foreground) N% …)` ink value. */
function foregroundMixPct(value) {
    const m = value.match(/var\(\s*--foreground\s*\)\s*([\d.]+)%/);
    return m ? parseFloat(m[1]) : null;
}

const TEAL_NAVY_RE =
    /\b(?:teal|navy)\b|#0{2}[0-9a-f]{2}(?:[0-9a-f]{2})?\b/i;

/**
 * Pure detector — given the source strings, return { facts, violations }.
 *
 * @param {{ heroCss: string, scalePaperCss: string, cardsCss: string,
 *           storyHeroVue: string, hasGridDir: boolean }} sources
 */
export function detectGridSimple(sources) {
    const { heroCss, scalePaperCss, cardsCss, storyHeroVue, hasGridDir } = sources;
    const facts = {};
    const violations = [];

    const hero = stripBlockComments(heroCss);
    const scale = stripBlockComments(scalePaperCss);
    const cards = stripBlockComments(cardsCss);
    const vue = stripVueComments(storyHeroVue);

    // ── G1 — the abrogation is clean (no alias) ────────────────────────────────
    facts.g1 = {};
    facts.g1.noStoryGridSize = !/--story-grid-size\b/.test(hero);
    facts.g1.noStoryGridColor = !/--story-grid-color\b/.test(hero);
    facts.g1.noStoryGridColorStrong = !/--story-grid-color-strong\b/.test(hero);
    // No `background-position: center center` on a grid recipe (the alignment fix).
    facts.g1.noCenterCenter = !/background-position:\s*center\s+center/.test(hero);
    // The card-interior `.paper-grid` paint, if it survives, carries NO blur path on
    // the element (it is a host background-image, never a backdrop-filtered plate the
    // grid is read THROUGH — the de-blur discipline). An absent rule also passes
    // (abrogated entirely).
    const paperGridBody = matchRuleBody(cards, /\.paper-grid\s*\{/);
    facts.g1.paperGridNoBlurPath =
        paperGridBody === null ||
        (!/backdrop-filter/.test(paperGridBody) &&
            !/\bfilter\s*:/.test(paperGridBody) &&
            !/\bblur\s*\(/.test(paperGridBody));

    if (!facts.g1.noStoryGridSize)
        violations.push(
            "G1: `--story-grid-size` still present in story-hero.css — ABROGATE it (re-express as `--grid-pitch`/`--grid-major`)",
        );
    if (!facts.g1.noStoryGridColor)
        violations.push(
            "G1: `--story-grid-color` still present in story-hero.css (incl. the dark arm) — ABROGATE it (re-express as `--grid-line`)",
        );
    if (!facts.g1.noStoryGridColorStrong)
        violations.push(
            "G1: `--story-grid-color-strong` still present in story-hero.css — ABROGATE it (re-express as `--grid-line-major`)",
        );
    if (!facts.g1.noCenterCenter)
        violations.push(
            "G1: a grid recipe still uses `background-position: center center` — pin it to `0 0` (the device-pixel-alignment fix)",
        );
    if (!facts.g1.paperGridNoBlurPath)
        violations.push(
            "G1: the card-interior `.paper-grid` rule carries a blur path (backdrop-filter/filter/blur) — the grid must be a host background-image, NEVER a crisp grid read through a blurred plate",
        );

    // ── G2 — ONE rhythm source, kf magnitudes ──────────────────────────────────
    facts.g2 = {};
    const pitchMatch = scale.match(/--grid-pitch\s*:\s*([^;]+);/);
    const majorMatch = scale.match(/--grid-major\s*:\s*([^;]+);/);
    const lineMatch = scale.match(/--grid-line\s*:\s*([^;]+);/);
    const lineMajorMatch = scale.match(/--grid-line-major\s*:\s*([^;]+);/);
    facts.g2.declaresPitch = pitchMatch !== null;
    facts.g2.declaresMajor = majorMatch !== null;
    facts.g2.declaresLine = lineMatch !== null;
    facts.g2.declaresLineMajor = lineMajorMatch !== null;
    // The pitch is REM-relative (divides cleanly at DPR 1/2/3) — NOT an integer-px.
    // (`rem\b`, not `\brem\b` — there is no word boundary between the `1` and the
    // `rem` in `1rem`, so the leading `\b` would never match.)
    facts.g2.pitchIsRem = /[\d.]rem\b/.test(pitchMatch?.[1] ?? "");
    facts.g2.majorIsRem = /[\d.]rem\b/.test(majorMatch?.[1] ?? "");
    // The demo `.grid-bg` reads the shared `--grid-*` rhythm.
    const gridBgBody = matchRuleBody(hero, /\.grid-bg\s*\{/);
    facts.g2.demoReadsGridTokens =
        gridBgBody !== null &&
        /var\(\s*--grid-line(?:-major)?\s*\)/.test(gridBgBody) &&
        /var\(\s*--grid-(?:pitch|major)\s*\)/.test(gridBgBody);
    // The library card-interior pitch UNIFIES onto `--grid-pitch` — no surviving
    // 28px/32px literal pitch off `--grid-*` in the grid token family.
    const paperSizeMatch = scale.match(/--paper-grid-texture-size\s*:\s*([^;]+);/);
    facts.g2.paperSizeUnified = /var\(\s*--grid-pitch\s*\)/.test(
        paperSizeMatch?.[1] ?? "",
    );
    facts.g2.noStrayPitch =
        !/(?:^|[^-])--grid-pitch\s*:\s*(?:28|32)px/.test(scale) &&
        !/--paper-grid-texture-size\s*:\s*(?:28|32)px/.test(scale) &&
        !/--story-grid-size\b/.test(hero);
    // The strength calibration: fine < the 10% legibility floor (the "less busy"),
    // major ≥ 10% (held above the floor — the kf weight step).
    const finePct = foregroundMixPct(lineMatch?.[1] ?? "");
    const majorPct = foregroundMixPct(lineMajorMatch?.[1] ?? "");
    facts.g2.finePct = finePct;
    facts.g2.majorPct = majorPct;
    facts.g2.fineBelowFloor = finePct !== null && finePct < 10;
    facts.g2.majorAboveFloor = majorPct !== null && majorPct >= 10;

    if (
        !(
            facts.g2.declaresPitch &&
            facts.g2.declaresMajor &&
            facts.g2.declaresLine &&
            facts.g2.declaresLineMajor
        )
    )
        violations.push(
            "G2: scale-paper.css must declare the ONE `--grid-pitch`/`--grid-major`/`--grid-line`/`--grid-line-major` rhythm source",
        );
    if (!(facts.g2.pitchIsRem && facts.g2.majorIsRem))
        violations.push(
            "G2: `--grid-pitch`/`--grid-major` must be REM-relative (1rem/5rem — divides cleanly at DPR 1/2/3; an integer-px pitch lands on sub-pixel boundaries and softens the lines)",
        );
    if (!facts.g2.demoReadsGridTokens)
        violations.push(
            "G2: the demo `.grid-bg` recipe must READ the shared `--grid-*` tokens (one rhythm source, not a second pitch)",
        );
    if (!facts.g2.paperSizeUnified)
        violations.push(
            "G2: `--paper-grid-texture-size` must UNIFY onto `var(--grid-pitch)` (the two-parallel-28/32px-systems fix — ONE pitch)",
        );
    if (!facts.g2.noStrayPitch)
        violations.push(
            "G2: a parallel hardcoded 28px/32px grid pitch survives off `--grid-*` — unify onto the rem rhythm",
        );
    if (!facts.g2.fineBelowFloor)
        violations.push(
            "G2: the FINE strength (`--grid-line`) must be < the 10% legibility floor (the 3% 'less busy substrate' calibration)",
        );
    if (!facts.g2.majorAboveFloor)
        violations.push(
            "G2: the MAJOR strength (`--grid-line-major`) must be ≥ the 10% legibility floor (the 11% kf weight step held above the floor)",
        );

    // ── G3 — crisp by construction ─────────────────────────────────────────────
    facts.g3 = {};
    // Hard color stops `var(--line) 0 1px, transparent 1px …` (NOT a soft ramp).
    facts.g3.hardStops =
        gridBgBody !== null &&
        /var\(\s*--grid-line-major\s*\)\s+0\s+1px\s*,\s*transparent\s+1px/.test(
            gridBgBody,
        ) &&
        /var\(\s*--grid-line\s*\)\s+0\s+1px\s*,\s*transparent\s+1px/.test(gridBgBody);
    facts.g3.zeroOrigin =
        gridBgBody !== null && /background-position:\s*0\s+0/.test(gridBgBody);
    // NO filter/backdrop-filter/opacity/transform on the grid element.
    facts.g3.noFilter =
        gridBgBody !== null &&
        !/backdrop-filter/.test(gridBgBody) &&
        !/\bfilter\s*:/.test(gridBgBody) &&
        !/\bopacity\s*:/.test(gridBgBody) &&
        !/\btransform\s*:/.test(gridBgBody);

    if (!facts.g3.hardStops)
        violations.push(
            "G3: `.grid-bg` must use HARD color stops (`var(--line) 0 1px, transparent 1px …`) — a soft gradient ramp blurs the grid",
        );
    if (!facts.g3.zeroOrigin)
        violations.push(
            "G3: `.grid-bg` must set `background-position: 0 0` (the box-origin pixel alignment, NOT center center)",
        );
    if (!facts.g3.noFilter)
        violations.push(
            "G3: `.grid-bg` must carry NO filter/backdrop-filter/opacity/transform — one compositor-cached static raster",
        );

    // ── G4 — NOT in the card (full-bleed) ──────────────────────────────────────
    facts.g4 = {};
    // The bg-mount full-bleed condition INCLUDES the static backdrops (the static
    // grid/paper gets the `.story-hero-bg--bleed` escape the live substrates have).
    facts.g4.bgFullBleedIncludesStatic =
        /bgFullBleed\s*=\s*computed\(\s*\(\)\s*=>\s*fullBleed\.value\s*\|\|\s*staticBackdrop\.value/.test(
            vue,
        );
    // The static grid `<div>` mounts the `--bleed` modifier off `bgFullBleed`.
    facts.g4.gridMountsBleed =
        /grid-bg['"][\s\S]{0,80}?bgFullBleed\s*&&\s*['"]story-hero-bg--bleed/.test(
            vue,
        );
    // The `.story-hero-bg--bleed` escape is `position: fixed; inset: 0`.
    const bleedBody = matchRuleBody(hero, /\.story-hero-bg--bleed\s*\{/);
    facts.g4.bleedIsFixedInset0 =
        bleedBody !== null &&
        /position:\s*fixed/.test(bleedBody) &&
        /inset:\s*0/.test(bleedBody);
    // The `cardTier` wash/quiet drop is removed for the static backdrops (it gates
    // ONLY on `liveBackdrop`, NOT on `staticBackdrop`).
    const cardTierBody = vue.match(
        /cardTier\s*=\s*computed<CardTier>\(\(\)\s*=>\s*\{([\s\S]*?)\}\s*\);/,
    )?.[1];
    facts.g4.washDropLiveOnly =
        cardTierBody != null &&
        /if\s*\(\s*liveBackdrop\.value\s*\)/.test(cardTierBody) &&
        !/staticBackdrop\.value/.test(cardTierBody);

    if (!facts.g4.bgFullBleedIncludesStatic)
        violations.push(
            "G4: the background full-bleed condition must include the static backdrops (the grid escapes the clipped card — `bgFullBleed = fullBleed || staticBackdrop`)",
        );
    if (!facts.g4.gridMountsBleed)
        violations.push(
            "G4: the static grid `<div>` must mount the `.story-hero-bg--bleed` escape off `bgFullBleed` (NOT a `-z-10` boxed mount)",
        );
    if (!facts.g4.bleedIsFixedInset0)
        violations.push(
            "G4: `.story-hero-bg--bleed` must be `position: fixed; inset: 0` (the full-bleed page-background escape)",
        );
    if (!facts.g4.washDropLiveOnly)
        violations.push(
            "G4: the `cardTier` wash/quiet drop must gate on `liveBackdrop` ONLY (a static grid must NOT be read through a blurred `wash`/`quiet` card)",
        );

    // ── G5 — warm-cream identity, ONE line color, NO teal/navy ─────────────────
    facts.g5 = {};
    facts.g5.lineIsForegroundMix =
        /color-mix\([^)]*var\(\s*--foreground\s*\)/.test(lineMatch?.[1] ?? "") &&
        /color-mix\([^)]*var\(\s*--foreground\s*\)/.test(lineMajorMatch?.[1] ?? "");
    // No teal/navy literal in the grid token family OR the demo `.grid-bg` recipe.
    const gridTokenScope =
        (pitchMatch?.[1] ?? "") +
        (majorMatch?.[1] ?? "") +
        (lineMatch?.[1] ?? "") +
        (lineMajorMatch?.[1] ?? "") +
        (gridBgBody ?? "");
    facts.g5.noTealNavy = !TEAL_NAVY_RE.test(gridTokenScope);

    if (!facts.g5.lineIsForegroundMix)
        violations.push(
            "G5: the grid line ink must be a `color-mix(… var(--foreground) …)` form (re-tints with the theme; the warm-cream identity)",
        );
    if (!facts.g5.noTealNavy)
        violations.push(
            "G5: a teal/navy literal survives in the grid recipe/tokens — REMOVE the teal-on-navy reference entirely (ONE warm-ink line, NO color preset)",
        );

    // ── G6 — static by construction, no GL ─────────────────────────────────────
    facts.g6 = {};
    facts.g6.noGridDir = !hasGridDir;
    // NO shader/rAF/<canvas>/usePointerVelocityField in the grid recipe or its mount.
    const gridSurface = (gridBgBody ?? "") + " " + (vue.match(/grid-bg[\s\S]{0,200}/)?.[0] ?? "");
    facts.g6.noGl =
        !/requestAnimationFrame|<canvas|usePointerVelocityField|\.wgsl|\.glsl|@compute/.test(
            gridSurface,
        );

    if (!facts.g6.noGridDir)
        violations.push(
            "G6: a `src/components/custom/grid-simple/` dir exists — the grid is a pure CSS background, NOT a component/shader/kernel",
        );
    if (!facts.g6.noGl)
        violations.push(
            "G6: the grid path carries a GL/rAF/canvas/pointer-velocity surface — the grid is static by construction (a grid that does not animate has nothing to compute)",
        );

    return { facts, violations };
}

// ── The per-clause self-test bites: a synthetic GOOD corpus, each mutated to a
//    planted violation, asserted to RED its clause through the PURE detector. ──────
function selfTest() {
    const goodHero = `
        :root { /* abrogated — no --story-grid-* */ }
        .story-hero-bg--bleed { position: fixed; inset: 0; z-index: -5; }
        .grid-bg {
            background-color: var(--background);
            background-image:
                repeating-linear-gradient(to right, var(--grid-line-major) 0 1px, transparent 1px var(--grid-major)),
                repeating-linear-gradient(to bottom, var(--grid-line-major) 0 1px, transparent 1px var(--grid-major)),
                repeating-linear-gradient(to right, var(--grid-line) 0 1px, transparent 1px var(--grid-pitch)),
                repeating-linear-gradient(to bottom, var(--grid-line) 0 1px, transparent 1px var(--grid-pitch));
            background-position: 0 0;
        }
    `;
    const goodScale = `
        :root {
            --grid-pitch: 1rem;
            --grid-major: 5rem;
            --grid-line: color-mix(in srgb, var(--foreground) 3%, transparent);
            --grid-line-major: color-mix(in srgb, var(--foreground) 11%, transparent);
            --paper-grid-opacity: 0.08;
            --paper-grid-texture-size: var(--grid-pitch);
            --paper-grid-line: color-mix(in srgb, var(--foreground) calc(var(--paper-grid-opacity) * 100%), transparent);
        }
    `;
    const goodCards = `.paper-grid { background-image: var(--paper-grid-texture); background-blend-mode: multiply; }`;
    const goodVue = `
        const bgFullBleed = computed(() => fullBleed.value || staticBackdrop.value);
        const cardTier = computed<CardTier>(() => {
            if (liveBackdrop.value) return isHero.value ? "quiet" : "wash";
            return isHero.value ? "floating" : "resting";
        });
        // template:
        // <div :class="cn('story-hero-bg grid-bg', bgFullBleed && 'story-hero-bg--bleed')" />
    `;
    const base = {
        heroCss: goodHero,
        scalePaperCss: goodScale,
        cardsCss: goodCards,
        storyHeroVue:
            goodVue +
            `\n<div :class="cn('story-hero-bg grid-bg', bgFullBleed && 'story-hero-bg--bleed')" />`,
        hasGridDir: false,
    };

    // Sanity: the GOOD corpus is GREEN.
    const baseRun = detectGridSimple(base);

    const bites = [];

    // Bite G1 — a re-introduced `--story-grid-size` reds G1.
    bites.push({
        name: "G1: re-introduced --story-grid-size",
        red:
            detectGridSimple({
                ...base,
                heroCss: goodHero + "\n:root { --story-grid-size: 28px; }",
            }).violations.some((v) => v.startsWith("G1")),
    });
    // Bite G1b — a surviving `center center` on a grid recipe reds G1.
    bites.push({
        name: "G1: surviving center center",
        red:
            detectGridSimple({
                ...base,
                heroCss: goodHero.replace(
                    "background-position: 0 0;",
                    "background-position: center center;",
                ),
            }).violations.some((v) => v.startsWith("G1")),
    });
    // Bite G2 — a 32px library pitch off --grid-* reds G2.
    bites.push({
        name: "G2: stray 32px pitch",
        red:
            detectGridSimple({
                ...base,
                scalePaperCss: goodScale.replace(
                    "--paper-grid-texture-size: var(--grid-pitch);",
                    "--paper-grid-texture-size: 32px;",
                ),
            }).violations.some((v) => v.startsWith("G2")),
    });
    // Bite G2b — a fine strength ≥ the 10% floor reds G2.
    bites.push({
        name: "G2: fine strength at the floor",
        red:
            detectGridSimple({
                ...base,
                scalePaperCss: goodScale.replace(
                    "--grid-line: color-mix(in srgb, var(--foreground) 3%, transparent);",
                    "--grid-line: color-mix(in srgb, var(--foreground) 12%, transparent);",
                ),
            }).violations.some((v) => v.startsWith("G2")),
    });
    // Bite G2c — a major strength < the 10% floor reds G2.
    bites.push({
        name: "G2: major strength below the floor",
        red:
            detectGridSimple({
                ...base,
                scalePaperCss: goodScale.replace(
                    "--grid-line-major: color-mix(in srgb, var(--foreground) 11%, transparent);",
                    "--grid-line-major: color-mix(in srgb, var(--foreground) 8%, transparent);",
                ),
            }).violations.some((v) => v.startsWith("G2")),
    });
    // Bite G3 — a soft-ramp gradient stop (no `0 1px` hard stop) reds G3.
    bites.push({
        name: "G3: soft-ramp gradient",
        red:
            detectGridSimple({
                ...base,
                heroCss: goodHero.replace(
                    /var\(--grid-line-major\) 0 1px/g,
                    "var(--grid-line-major)",
                ),
            }).violations.some((v) => v.startsWith("G3")),
    });
    // Bite G3b — a backdrop-filter on the grid element reds G3.
    bites.push({
        name: "G3: backdrop-filter on grid",
        red:
            detectGridSimple({
                ...base,
                heroCss: goodHero.replace(
                    "background-position: 0 0;",
                    "background-position: 0 0; backdrop-filter: blur(8px);",
                ),
            }).violations.some((v) => v.startsWith("G3")),
    });
    // Bite G4 — a static grid mount NOT off bgFullBleed (live-only) reds G4.
    bites.push({
        name: "G4: bleed gated on fullBleed only",
        red:
            detectGridSimple({
                ...base,
                storyHeroVue: base.storyHeroVue.replace(
                    "const bgFullBleed = computed(() => fullBleed.value || staticBackdrop.value);",
                    "const bgFullBleed = computed(() => fullBleed.value);",
                ),
            }).violations.some((v) => v.startsWith("G4")),
    });
    // Bite G4b — a wash/quiet tier resolved over a static grid (staticBackdrop in
    // cardTier) reds G4.
    bites.push({
        name: "G4: wash drop over static backdrop",
        red:
            detectGridSimple({
                ...base,
                storyHeroVue: base.storyHeroVue.replace(
                    "if (liveBackdrop.value) return isHero.value ? \"quiet\" : \"wash\";",
                    "if (liveBackdrop.value || staticBackdrop.value) return isHero.value ? \"quiet\" : \"wash\";",
                ),
            }).violations.some((v) => v.startsWith("G4")),
    });
    // Bite G5 — a planted teal/navy grid-line literal reds G5.
    bites.push({
        name: "G5: teal/navy literal",
        red:
            detectGridSimple({
                ...base,
                scalePaperCss: goodScale.replace(
                    "--grid-line: color-mix(in srgb, var(--foreground) 3%, transparent);",
                    "--grid-line: teal;",
                ),
            }).violations.some((v) => v.startsWith("G5")),
    });
    // Bite G6 — a planted grid-simple component dir reds G6.
    bites.push({
        name: "G6: grid-simple component dir",
        red: detectGridSimple({ ...base, hasGridDir: true }).violations.some((v) =>
            v.startsWith("G6"),
        ),
    });
    // Bite G6b — a planted requestAnimationFrame in the grid recipe reds G6.
    bites.push({
        name: "G6: rAF in grid path",
        red:
            detectGridSimple({
                ...base,
                heroCss: goodHero.replace(
                    "background-position: 0 0;",
                    "background-position: 0 0; /* x */ requestAnimationFrame",
                ),
            }).violations.some((v) => v.startsWith("G6")),
    });

    return { baseGreen: baseRun.violations.length === 0, baseRun, bites };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_GRID_SIMPLE_ARTIFACT",
        "BC-grid-simple",
    );
    const heroCss = safeRead(resolve(ROOT, "demo/chassis/hero/story-hero.css"));
    const scalePaperCss = safeRead(resolve(ROOT, "src/styles/tokens/scale-paper.css"));
    const cardsCss = safeRead(resolve(ROOT, "src/styles/cards.css"));
    const storyHeroVue = safeRead(resolve(ROOT, "demo/chassis/hero/StoryHero.vue"));
    const hasGridDir = existsSync(
        resolve(ROOT, "src/components/custom/grid-simple"),
    );

    const { facts, violations } = detectGridSimple({
        heroCss,
        scalePaperCss,
        cardsCss,
        storyHeroVue,
        hasGridDir,
    });

    // The per-clause self-test bites — each planted violation MUST red its clause.
    const { baseGreen, bites } = selfTest();
    const biteFailures = [];
    if (!baseGreen)
        biteFailures.push("the synthetic GOOD corpus did not pass the detector");
    for (const b of bites) if (!b.red) biteFailures.push(b.name);
    facts.selfTest = {
        baseGreen,
        bites: bites.map((b) => ({ name: b.name, red: b.red })),
        allRed: biteFailures.length === 0,
    };
    if (biteFailures.length > 0)
        violations.push(
            `SELF-TEST: bite(s) did not RED their clause: ${biteFailures.join("; ")}`,
        );

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:grid-simple",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:grid-simple — the blurry in-card grid ABROGATED → ONE crisp full-bleed page grid (BC.W-GRID-SIMPLE)",
    );
    console.log(
        `  G1 abrogation clean (no alias)   : ${yn(
            facts.g1.noStoryGridSize &&
                facts.g1.noStoryGridColor &&
                facts.g1.noStoryGridColorStrong &&
                facts.g1.noCenterCenter &&
                facts.g1.paperGridNoBlurPath,
        )}`,
    );
    console.log(
        `  G2 ONE rhythm source (kf mags)   : ${yn(
            facts.g2.declaresPitch &&
                facts.g2.declaresMajor &&
                facts.g2.pitchIsRem &&
                facts.g2.demoReadsGridTokens &&
                facts.g2.paperSizeUnified &&
                facts.g2.noStrayPitch &&
                facts.g2.fineBelowFloor &&
                facts.g2.majorAboveFloor,
        )}  (fine ${facts.g2.finePct}% / major ${facts.g2.majorPct}%)`,
    );
    console.log(
        `  G3 crisp by construction         : ${yn(
            facts.g3.hardStops && facts.g3.zeroOrigin && facts.g3.noFilter,
        )}`,
    );
    console.log(
        `  G4 NOT in the card (full-bleed)  : ${yn(
            facts.g4.bgFullBleedIncludesStatic &&
                facts.g4.gridMountsBleed &&
                facts.g4.bleedIsFixedInset0 &&
                facts.g4.washDropLiveOnly,
        )}`,
    );
    console.log(
        `  G5 warm-ink line, no teal/navy   : ${yn(
            facts.g5.lineIsForegroundMix && facts.g5.noTealNavy,
        )}`,
    );
    console.log(
        `  G6 static by construction, no GL : ${yn(
            facts.g6.noGridDir && facts.g6.noGl,
        )}`,
    );
    console.log(
        `  self-test bites all RED          : ${yn(facts.selfTest.allRed)}  (${
            facts.selfTest.bites.length
        } bites)`,
    );

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
