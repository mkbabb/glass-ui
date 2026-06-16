#!/usr/bin/env node
// BA.W-GLASS-CAL — the blur dial-back + the disco retirement (proof:glass-cal).
//
// The comment-strip + pure-detector house pattern (mirroring proof-dock-unify.mjs
// / proof-goo-redress.mjs). Each witness is RED at HEAD pre-wave; the π gestalt
// readback (tests-visual + the W-GLASS-CAL-DELTA) is the BINDING visual truth —
// per-mechanism greens alone do NOT close this visual wave (BA inv-4).
//
// TWO ARMS:
//
//   BLUR — the six `--glass-blur-*-radius` primitives dialed back ~15-20% UNIFORMLY
//   (the user's "a hair too much" over-diffusion) + the @2dppx overlay restore
//   pulled, while the `--glass-level` opacity axis + the per-rung saturate()/
//   brightness() companions stay UNTOUCHED (the radius axis ONLY — the anti-overreach
//   wrong-axis assert). The dark-recipe saturate/brightness companions
//   (W-DARK-MATERIAL, dark-arm.css) preserved.
//
//   DISCO — the `btn-audacious`/`btn-audacious-gold` recipe family + the
//   `sparkle-sweep`/`btn-gold-bg-sweep` keyframes + the `--duration-sparkle`/
//   `--glass-grain-opacity-disco` knobs are GONE; no `btn-audacious` class survives
//   on any consumer; the dock-tab PRIMARY phase-grain collapsed onto the calm glass
//   register; toggle-chip reads the §6 tokens (no `duration-150`/raw `ease-out`). The
//   FENCED-OUT good pops (`.gold-shimmer`, the specular registers) STAY.
//
//   SPRING CLOCK (Unit 3) — the per-spring `--spring-<name>-duration` vocabulary is
//   minted from the (response, ζ) PRESETS table (generated, never hand) AND no
//   `--spring-*` easing rides a generic `--duration-*` clock in the swept src/styles
//   files (the anti-recurrence floor).
//
// bite-check: revert any radius to its pre-wave value → B1 reddens; re-introduce
// `@utility btn-audacious` → D1 reddens; restore the dock phase-grain → D3 reddens;
// drop a `--spring-*-duration` token → S1 reddens.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execSync } from "node:child_process";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

// Strip BOTH block (`/* */`) and line (`//`) comments — for .vue/.ts/.css sources
// where a retirement-NOTE comment legitimately names a retired token in prose. A
// line `//` is only stripped when it is not inside a string (conservative — we run
// it over already-quote-aware class scans, so a `//` in a URL is a non-issue here).
function stripAllComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:'"`])\/\/[^\n]*/g, "$1");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// The six radius primitives + their pre-wave (HEAD) values + the AV.W7-F2 band.
const PRE_WAVE_RADII = {
    "glass-blur-wash-radius": 1,
    "glass-blur-quiet-radius": 10,
    "glass-blur-resting-radius": 12,
    "glass-blur-floating-radius": 16,
    "glass-blur-overlay-radius": 15,
    "glass-blur-dock-radius": 11,
};
const BAND_LO = 8;
const BAND_HI = 15;
const PRE_WAVE_2DPPX = 24; // the high-resolution overlay restore at HEAD

const SPRING_NAMES = ["smooth", "snappy", "bouncy", "gentle", "dock"];

// The src/styles files Unit 3 OWNS/swept (the anti-recurrence scope). The fenced
// sites (segmented-tabs → W-TABS indicator clock; configurator → W-CONFIG-CHASSIS;
// the DarkModeToggle deliberately-authored literals) are NOT in this scope.
const SWEPT_FILES = [
    "src/styles/transitions.css",
    "src/styles/animations.css",
    "src/styles/view-transition.css",
    "src/styles/glass/surfaces.css",
    "src/styles/utilities/btn.css",
    "src/styles/typography/utilities.css",
    "src/styles/dock.css",
    "src/styles/tokens/scale-paper.css",
];

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

function parseRadius(src, name) {
    const m = src.match(new RegExp(`--${name}:\\s*([\\d.]+)px`));
    return m ? Number(m[1]) : null;
}

export function detectBlur() {
    const violations = [];
    const facts = { radii: {}, twodppx: null, companions: {} };

    const glassTokens = stripCss(readFile("src/styles/tokens/glass.css"));

    // ── B1 — the six radii calibrated (strictly below pre-wave, in-band, wash=1).
    for (const [name, pre] of Object.entries(PRE_WAVE_RADII)) {
        const v = parseRadius(glassTokens, name);
        facts.radii[name] = v;
        if (v === null) {
            violations.push(`B1: --${name} not found in tokens/glass.css`);
            continue;
        }
        if (name === "glass-blur-wash-radius") {
            // wash stays 1px (sub-perceptual, unchanged).
            if (v !== 1) violations.push(`B1: --${name} is ${v}px (must stay 1px — sub-perceptual, unchanged)`);
            continue;
        }
        if (v >= pre) {
            violations.push(`B1: --${name} is ${v}px — NOT below its pre-wave ${pre}px (the dial-back did not land)`);
        }
        if (v < BAND_LO || v > BAND_HI) {
            violations.push(`B1: --${name} ${v}px is outside the AV.W7-F2 [${BAND_LO}, ${BAND_HI}]px band`);
        }
    }

    // ── B2 — the @2dppx overlay restore pulled below 24px, in-band.
    const ldark = stripCss(readFile("src/styles/tokens/light-dark.css"));
    const m2 = ldark.match(/@media\s*\(min-resolution:\s*2dppx\)[\s\S]*?--glass-blur-overlay-radius:\s*([\d.]+)px/);
    const v2 = m2 ? Number(m2[1]) : null;
    facts.twodppx = v2;
    if (v2 === null) {
        violations.push("B2: the @2dppx --glass-blur-overlay-radius restore not found in tokens/light-dark.css");
    } else if (v2 >= PRE_WAVE_2DPPX) {
        violations.push(`B2: the @2dppx overlay restore is ${v2}px — NOT below its pre-wave ${PRE_WAVE_2DPPX}px (not pulled)`);
    }

    // ── B3 — the wrong axis untouched (anti-overreach). The base composed tokens
    //   keep their saturate()/brightness() companions + --glass-level scaling; the
    //   dark-arm.css companions keep their dark saturate/brightness values.
    const expectCompanions = [
        { tok: "glass-blur-wash", re: /--glass-blur-wash:\s*blur\(calc\(var\(--glass-blur-wash-radius\) \* var\(--glass-level\)\)\) saturate\(1\.05\)/ },
        { tok: "glass-blur-quiet", re: /--glass-blur-quiet:\s*blur\(calc\(var\(--glass-blur-quiet-radius\) \* var\(--glass-level\)\)\) saturate\(1\.05\) brightness\(1\.02\)/ },
        { tok: "glass-blur-resting", re: /--glass-blur-resting:\s*blur\(calc\(var\(--glass-blur-resting-radius\) \* var\(--glass-level\)\)\) saturate\(1\.05\)/ },
        { tok: "glass-blur-floating", re: /--glass-blur-floating:\s*blur\(calc\(var\(--glass-blur-floating-radius\) \* var\(--glass-level\)\)\) saturate\(1\.18\)/ },
        { tok: "glass-blur-overlay", re: /--glass-blur-overlay:\s*blur\(calc\(var\(--glass-blur-overlay-radius\) \* var\(--glass-level\)\)\) saturate\(1\.2\)/ },
    ];
    for (const { tok, re } of expectCompanions) {
        const ok = re.test(glassTokens);
        facts.companions[tok] = ok;
        if (!ok) {
            violations.push(`B3: the composed --${tok} token's saturate()/brightness() companion + --glass-level scaling drifted (the dial-back must touch the RADIUS axis ONLY)`);
        }
    }
    // The dark-arm companions (W-DARK-MATERIAL) preserved — radius-only.
    const darkArm = stripCss(readFile("src/styles/tokens/dark-arm.css"));
    const darkCompanionOk = /--glass-blur-dock:\s*blur\(calc\(var\(--glass-blur-dock-radius\) \* var\(--glass-level\)\)\) saturate\(1\.30\) brightness\(1\.12\)/.test(darkArm);
    facts.companions.darkArm = darkCompanionOk;
    if (!darkCompanionOk) {
        violations.push("B3: the W-DARK-MATERIAL dark blur companions (dark-arm.css saturate/brightness) drifted — the radius pull must preserve them (radius-only)");
    }

    return { facts, violations };
}

export function detectDisco() {
    const violations = [];
    const facts = {};

    // ── D1 — the recipe family is GONE from src/styles (positive absence).
    const utilities = stripCss(readMonolith(ROOT, "utilities"));
    const tokens = stripCss(readMonolith(ROOT, "tokens"));
    const animations = stripCss(readFile("src/styles/animations.css"));
    const glassMono = stripCss(readMonolith(ROOT, "glass"));

    const gone = [
        { what: "@utility btn-audacious", re: /@utility\s+btn-audacious\b/, src: utilities },
        { what: "@utility btn-audacious-gold", re: /@utility\s+btn-audacious-gold\b/, src: utilities },
        { what: "@keyframes sparkle-sweep", re: /@keyframes\s+sparkle-sweep\b/, src: animations },
        { what: "@keyframes btn-gold-bg-sweep", re: /@keyframes\s+btn-gold-bg-sweep\b/, src: utilities },
        { what: "--duration-sparkle declaration", re: /--duration-sparkle\s*:/, src: tokens },
        { what: "--glass-grain-opacity-disco declaration", re: /--glass-grain-opacity-disco\s*:/, src: glassMono },
    ];
    facts.recipeFamilyPresent = [];
    for (const { what, re, src } of gone) {
        if (re.test(src)) {
            facts.recipeFamilyPresent.push(what);
            violations.push(`D1: '${what}' STILL EXISTS in src/styles — the disco recipe family must be RETIRED (clean break)`);
        }
    }

    // ── D2 — no consumer carries the btn-audacious/-gold class (src/ + demo/).
    //   We enumerate every .vue/.ts/.css under src/ + demo/, strip ALL comments (so a
    //   retirement-NOTE that names the retired token in prose is not a false hit), and
    //   flag a `btn-audacious` token that survives in NON-comment code (a CVA class
    //   string, a class= attribute, a literal). The `@utility btn-audacious`
    //   declaration is D1's concern and excluded here.
    const consumerHits = [];
    const files = execSync(
        `find ${resolve(ROOT, "src")} ${resolve(ROOT, "demo")} -type f \\( -name "*.vue" -o -name "*.ts" -o -name "*.css" \\) 2>/dev/null || true`,
        { encoding: "utf8" },
    )
        .split("\n")
        .filter(Boolean)
        // the gate scripts + this file itself reference the token in prose; never scan scripts/
        .filter((f) => !/\/scripts\//.test(f));
    for (const f of files) {
        const code = stripAllComments(readFileSync(f, "utf8"));
        // a surviving btn-audacious that is NOT an `@utility` declaration (D1's bite).
        const withoutUtilityDecl = code.replace(/@utility\s+btn-audacious[a-z-]*\s*\{/g, "");
        if (/\bbtn-audacious\b/.test(withoutUtilityDecl)) {
            consumerHits.push(f.slice(ROOT.length + 1));
        }
    }
    facts.consumerClassHits = consumerHits;
    if (consumerHits.length) {
        violations.push(`D2: ${consumerHits.length} live btn-audacious consumer(s) survive in non-comment code — every consumer must collapse onto the calm register: ${consumerHits.slice(0, 3).join(", ")}`);
    }

    // ── D3 — the dock primary tier collapsed (no grain hover, no phase-halo).
    const tabButton = stripCss(readFile("src/styles/dock-controls/tab-button.css"));
    const primaryBlock = tabButton.match(/\.dock-tab-button\[data-tier="primary"\]\s*\{([\s\S]*?)\n\s{4}\}/);
    const primaryBody = primaryBlock ? primaryBlock[1] : tabButton;
    facts.dockGrainGone =
        !/--glass-grain-opacity-disco/.test(tabButton) &&
        !/--paper-clean-texture/.test(tabButton) &&
        !/\[data-phase\][^{]*::before/.test(tabButton);
    if (!facts.dockGrainGone) {
        violations.push("D3: the dock-tab primary tier still composes the disco grain (--glass-grain-opacity-disco / --paper-clean-texture / the [data-phase]::before halo) — it must collapse onto the plain glass hover register");
    }
    // The DockTabButton.vue auto-attach removed.
    const dockTabVue = readFile("src/components/custom/dock/DockTabButton.vue");
    facts.autoAttachRemoved = !/&&\s*"btn-audacious"|isPrimaryTier[\s\S]*?btn-audacious/.test(dockTabVue);
    if (!facts.autoAttachRemoved) {
        violations.push("D3: DockTabButton.vue still auto-attaches `btn-audacious` on data-tier=primary — remove it (the utility is gone)");
    }

    // ── D4 — the toggle-chip on §6 (no duration-150 / raw ease-out; a scale leg).
    //   Comment-stripped so the retirement-NOTE that names the OLD `duration-150
    //   ease-out` register in prose is not a false hit.
    const chip = stripAllComments(readFile("src/components/custom/toggle-chip/index.ts"));
    facts.chipNoFastSnap = !/duration-150/.test(chip) && !/\bease-out\b/.test(chip);
    facts.chipScaleLeg = /scale-\(--scale-hover-btn\)|scale_var\(--spring-smooth/.test(chip) || /--spring-smooth/.test(chip);
    if (!facts.chipNoFastSnap) {
        violations.push("D4: toggle-chip still carries `duration-150` or a raw `ease-out` literal — it must read the §6 --duration-fast/--ease-standard register");
    }
    if (!facts.chipScaleLeg) {
        violations.push("D4: toggle-chip carries no §6 scale lift (a `--spring-smooth` scale leg + a hover scale) — it color-snaps flat instead of lifting like its neighbors");
    }

    // ── D5 — the FENCE held (anti-overreach): the good pops STAY.
    const base = stripCss(readMonolith(ROOT, "utilities"));
    facts.goldShimmerStays = /\.gold-shimmer\b/.test(base) && /background-clip:\s*text/.test(base);
    facts.specularStays = /--glass-specular\s*:/.test(stripCss(readMonolith(ROOT, "tokens"))) || /--glass-specular\s*:/.test(stripCss(readMonolith(ROOT, "glass")));
    if (!facts.goldShimmerStays) {
        violations.push("D5: `.gold-shimmer` static text gradient (the FENCED-OUT good pop) was over-pruned — it must STAY");
    }
    if (!facts.specularStays) {
        violations.push("D5: the `--glass-specular` register (the FENCED-OUT liquid-glass catch-light) was over-pruned — it must STAY");
    }

    return { facts, violations };
}

export function detectSpringClock() {
    const violations = [];
    const facts = { durations: {}, swept: {} };

    // ── S1 — the per-spring --spring-<name>-duration vocabulary is minted.
    const schemeMotion = stripCss(readFile("src/styles/tokens/scheme-motion.css"));
    for (const name of SPRING_NAMES) {
        const m = schemeMotion.match(new RegExp(`--spring-${name}-duration:\\s*([\\d.]+)s`));
        facts.durations[name] = m ? Number(m[1]) : null;
        if (!m) {
            violations.push(`S1: --spring-${name}-duration not minted in tokens/scheme-motion.css (the generated per-spring clock)`);
        }
    }

    // ── S2 — no --spring-* easing rides a generic --duration-* clock in the swept
    //   files (the anti-recurrence floor). A transition/animation leg pairing a
    //   `var(--spring-<name>)` with a `var(--duration-*)` is the off-clock pattern.
    for (const rel of SWEPT_FILES) {
        const src = stripCss(readFile(rel));
        const offClock = [];
        const declRe = /\b(?:transition|animation)\s*:\s*([^;}]+)[;}]/gi;
        let m;
        while ((m = declRe.exec(src)) !== null) {
            const leg = m[1];
            // a single transition value list may carry multiple comma legs; split.
            for (const seg of leg.split(",")) {
                const hasSpring = /var\(\s*--spring-(?:smooth|snappy|bouncy|gentle|dock)\)/.test(seg);
                const hasGenericDur = /var\(\s*--duration-(?:instant|fast|normal|slow|panel|xl|xxl)\)/.test(seg);
                if (hasSpring && hasGenericDur) offClock.push(seg.trim().slice(0, 70));
            }
        }
        // Also catch the split-longhand form: transition-duration: var(--duration-*)
        // paired with transition-timing-function: var(--spring-*) in the SAME rule.
        // (Conservative: only count when both longhands sit adjacent.)
        const splitRe = /transition-duration:\s*var\(\s*--duration-(?:instant|fast|normal|slow|panel|xl|xxl)\)\s*;\s*transition-timing-function:\s*var\(\s*--spring-(?:smooth|snappy|bouncy|gentle|dock)\)/g;
        if (splitRe.test(src)) offClock.push("(split-longhand generic-duration + spring-timing)");
        facts.swept[rel] = offClock;
        if (offClock.length) {
            violations.push(`S2: ${rel} still pairs a --spring-* easing with a generic --duration-* clock (${offClock.length} leg): ${offClock[0]} — re-point to the matching --spring-<name>-duration`);
        }
    }

    return { facts, violations };
}

export function detect() {
    const blur = detectBlur();
    const disco = detectDisco();
    const spring = detectSpringClock();
    return {
        violations: [...blur.violations, ...disco.violations, ...spring.violations],
        facts: { blur: blur.facts, disco: disco.facts, spring: spring.facts },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_CAL_ARTIFACT", "BA-glass-cal");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-cal",
        facts,
        violations,
    });

    console.log("proof:glass-cal — the blur ladder dialed back + the disco retired + the per-spring clock minted (BA.W-GLASS-CAL)");
    console.log(`  blur radii        : ${Object.entries(facts.blur.radii).map(([k, v]) => `${k.replace("glass-blur-", "").replace("-radius", "")}=${v}`).join(" ")}`);
    console.log(`  @2dppx restore    : ${facts.blur.twodppx}px   companions intact: ${Object.values(facts.blur.companions).every(Boolean) ? "yes ✓" : "NO ✗"}`);
    console.log(`  disco recipe gone : ${facts.disco.recipeFamilyPresent.length === 0 ? "yes ✓" : `NO ✗ (${facts.disco.recipeFamilyPresent.join(", ")})`}`);
    console.log(`  consumer classes  : ${facts.disco.consumerClassHits.length} live`);
    console.log(`  dock grain gone   : ${facts.disco.dockGrainGone ? "yes ✓" : "NO ✗"}   chip §6: ${facts.disco.chipNoFastSnap && facts.disco.chipScaleLeg ? "yes ✓" : "NO ✗"}`);
    console.log(`  fence held        : gold-shimmer=${facts.disco.goldShimmerStays ? "✓" : "✗"} specular=${facts.disco.specularStays ? "✓" : "✗"}`);
    console.log(`  spring clocks     : ${Object.entries(facts.spring.durations).map(([k, v]) => `${k}=${v}s`).join(" ")}`);
    console.log(`  off-clock springs : ${Object.values(facts.spring.swept).reduce((n, a) => n + a.length, 0)} in swept files`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
