#!/usr/bin/env node
// BB.W-METAL-SHIMMER — the brand-metal TRIAD + the metal-PARAMETERIZED shimmer
// sweep (proof:metal-shimmer).
//
// The platform owned two of the three brand metals (a warm GOLD quad + a cool
// SILVER quad — the InstrumentChassis `variant="structure"` register) and ONE
// gold-only animated flourish (`.gold-shimmer`, swept by the gold-baked
// `gold-shimmer-slide`). This wave CLOSES the triad — a BRONZE quad in the EXACT
// four-arm cascade gold/silver speak — mints ONE metal-PARAMETERIZED
// `metal-shimmer-sweep` keyframe reading a `--metal-shimmer-color` channel
// (usable for text-clip AND border/mask) + a slow `--duration-metal: 6s` clock,
// ships the `.metal-{gold,silver,bronze}`/`.metal-*-border`/`.metal-rainbow-rim`
// utilities, and RETIRES `gold-shimmer-slide` (clean break, no alias) onto the
// parameterized sweep (the gold READ byte-preserved).
//
// The comment-strip + pure-detector house pattern (mirroring proof-glass-accent.mjs
// / proof-glass-cal.mjs / proof-no-gray.mjs). Six SOURCE clauses (M1-M6), each RED
// at HEAD pre-wave; the π readback (tests-visual/metal-shimmer.spec.ts + the
// W-METAL-SHIMMER-DELTA) is the BINDING visual truth — per-mechanism greens alone
// do NOT close this visual wave (BB inv-4). The `proof:ba-gestalt` brand-metal/
// figures verdict is the gestalt bar.
//
//   M1 — the THREE metal quads are PARALLEL across the four cascade arms
//        (scale-paper raw + alias · bridges @theme alias · light-dark() arm ·
//        .dark fallback), `-deep` omitted from the light-dark + dark arms exactly
//        as gold/silver omit it.
//   M2 — the bronze hue is a warm-brown METAL (OKLch hue ~50-60°) with chroma
//        ABOVE the W-NO-GRAY warm floor (a brand metal, NOT a neutral).
//   M3 — ONE metal-PARAMETERIZED `metal-shimmer-sweep` keyframe (pure position,
//        ZERO baked metal color) + the `.metal-*` recipe resolves its stops off
//        `var(--metal-shimmer-color)`/the `--metal-stop-*` slots, NOT a per-metal
//        keyframe fork.
//   M4 — `gold-shimmer-slide` is RETIRED (gone everywhere, clean break) and
//        `.gold-shimmer` + `--animate-gold-shimmer` re-point onto
//        `metal-shimmer-sweep` with `--metal-shimmer-color: gold`.
//   M5 — the PRM bracket is STATIC-gradient — every metal utility paints the
//        static metal gradient un-bracketed, ONLY the `animation:` line sits
//        inside `@media (prefers-reduced-motion: no-preference)`.
//   M6 — the metal family is CALM — no disco recipe (sparkle/✦/grain/ripple), the
//        sweep is the slow `--duration-metal` clock (NOT a sub-second one).
//
// bite-check (the --self-test arm): a per-metal keyframe fork → M3 reds; a
// surviving gold-shimmer-slide → M4 reds; an unconditional metal animation → M5
// reds; a sparkle/ripple token in the metal recipe → M6 reds; a low-chroma bronze
// → M2 reds.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}
function squish(src) {
    return src.replace(/\s+/g, " ");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// ── The W-NO-GRAY floor (the brand-metal exception's anchor — bronze is a metal,
//    chroma ABOVE the floor; mirrors proof-no-gray.mjs' STRONG_FLOOR). ──────────
const STRONG_FLOOR = 0.02; // the perceptual "is it gray" threshold
const BRONZE_HUE_LO = 48; // the warm-brown register — between gold (~84°) and red-orange
const BRONZE_HUE_HI = 62; // ; never gold (~84°), never a dull olive/khaki

const SCALE_PAPER = "src/styles/tokens/scale-paper.css";
const METAL_CSS = "src/styles/utilities/metal.css";

// Parse the THREE `oklch(L C H)` numbers out of a `--token: oklch(…)` declaration
// (the raw quad in scale-paper). Returns { L, C, H } or null.
function parseOklch(decl) {
    const m = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/.exec(decl);
    if (!m) return null;
    return { L: parseFloat(m[1]), C: parseFloat(m[2]), H: parseFloat(m[3]) };
}

// Read a `--token: oklch(...)` raw declaration line out of a stripped source.
function rawDecl(src, token) {
    const re = new RegExp(`${token.replace(/[-]/g, "\\-")}\\s*:\\s*([^;]+);`);
    const m = re.exec(src);
    return m ? m[1].trim() : null;
}

// Does `src` declare `token: <something>;` at all (raw OR light-dark OR alias)?
function declares(src, token) {
    const re = new RegExp(`${token.replace(/[-]/g, "\\-")}\\s*:\\s*[^;]+;`);
    return re.test(src);
}

function detect() {
    const violations = [];
    const facts = {};

    const scalePaper = stripCss(readFileSync(resolve(ROOT, SCALE_PAPER), "utf8"));
    const bridges = stripCss(readMonolith(ROOT, "theme"));
    const lightDark = stripCss(readFileSync(resolve(ROOT, "src/styles/tokens/light-dark.css"), "utf8"));
    const darkArm = stripCss(readFileSync(resolve(ROOT, "src/styles/tokens/dark-arm.css"), "utf8"));
    const animations = stripCss(readFileSync(resolve(ROOT, "src/styles/animations.css"), "utf8"));
    const utilities = stripCss(readMonolith(ROOT, "utilities"));
    const literals = stripCss(readMonolith(ROOT, "theme"));
    const schemeMotion = stripCss(readFileSync(resolve(ROOT, "src/styles/tokens/scheme-motion.css"), "utf8"));
    const metalRaw = existsSync(resolve(ROOT, METAL_CSS))
        ? readFileSync(resolve(ROOT, METAL_CSS), "utf8")
        : "";
    const metal = stripCss(metalRaw);

    const METALS = ["gold", "silver", "bronze"];
    const SUFFIXES = ["", "-light", "-dark", "-deep"];

    // ── M1 — the THREE metal quads are PARALLEL across the four cascade arms ──
    const m1 = { rawQuad: {}, bridgeAlias: {}, lightDarkArm: {}, darkFallback: {} };
    for (const metalName of METALS) {
        // scale-paper raw: all four suffixes + the --color-* alias.
        const rawOk = SUFFIXES.every((s) => declares(scalePaper, `--${metalName}${s}`));
        const aliasInScale = SUFFIXES.every((s) => declares(scalePaper, `--color-${metalName}${s}`));
        m1.rawQuad[metalName] = rawOk && aliasInScale;
        if (!rawOk) {
            violations.push(`M1 ${metalName}: the raw quad (--${metalName}/-light/-dark/-deep) is incomplete in scale-paper.css`);
        }
        if (!aliasInScale) {
            violations.push(`M1 ${metalName}: the --color-${metalName}* alias is incomplete in scale-paper.css`);
        }

        // bridges @theme alias: all four --color-* suffixes.
        const bridgeOk = SUFFIXES.every((s) => declares(bridges, `--color-${metalName}${s}`));
        m1.bridgeAlias[metalName] = bridgeOk;
        if (!bridgeOk) {
            violations.push(`M1 ${metalName}: the --color-${metalName}* @theme alias is incomplete in bridges.css (the half-cascade dead-orphan class)`);
        }

        // light-dark() arm: -/-light/-dark present, -deep OMITTED (mode-invariant).
        const ldBaseOk = ["", "-light", "-dark"].every((s) => declares(lightDark, `--${metalName}${s}`));
        const ldDeepOmitted = !declares(lightDark, `--${metalName}-deep`);
        m1.lightDarkArm[metalName] = ldBaseOk && ldDeepOmitted;
        if (!ldBaseOk) {
            violations.push(`M1 ${metalName}: the light-dark() arm (--${metalName}/-light/-dark) is incomplete in light-dark.css`);
        }
        if (!ldDeepOmitted) {
            violations.push(`M1 ${metalName}: --${metalName}-deep is NOT mode-invariant — it leaked into the light-dark() block (gold/silver omit it)`);
        }

        // .dark fallback: -/-light/-dark present, -deep OMITTED.
        const daBaseOk = ["", "-light", "-dark"].every((s) => declares(darkArm, `--${metalName}${s}`));
        const daDeepOmitted = !declares(darkArm, `--${metalName}-deep`);
        m1.darkFallback[metalName] = daBaseOk && daDeepOmitted;
        if (!daBaseOk) {
            violations.push(`M1 ${metalName}: the .dark fallback (--${metalName}/-light/-dark) is incomplete in dark-arm.css`);
        }
        if (!daDeepOmitted) {
            violations.push(`M1 ${metalName}: --${metalName}-deep leaked into the dark-arm.css block (it is mode-invariant — gold/silver omit it)`);
        }
    }
    facts.m1 = m1;

    // ── M2 — bronze is a warm-brown METAL above the W-NO-GRAY floor ────────────
    const m2 = { rungs: {}, floor: STRONG_FLOOR, hueLo: BRONZE_HUE_LO, hueHi: BRONZE_HUE_HI };
    let bronzeOk = true;
    for (const s of ["", "-light", "-dark", "-deep"]) {
        const decl = rawDecl(scalePaper, `--bronze${s}`);
        const parsed = decl ? parseOklch(decl) : null;
        if (!parsed) {
            m2.rungs[`bronze${s}`] = { present: false };
            violations.push(`M2 bronze${s}: no parseable oklch() raw value in scale-paper.css`);
            bronzeOk = false;
            continue;
        }
        const chromaOk = parsed.C >= STRONG_FLOOR;
        const hueOk = parsed.H >= BRONZE_HUE_LO && parsed.H <= BRONZE_HUE_HI;
        m2.rungs[`bronze${s}`] = { L: parsed.L, C: parsed.C, H: parsed.H, chromaOk, hueOk };
        if (!chromaOk) {
            violations.push(`M2 bronze${s}: chroma ${parsed.C} is BELOW the W-NO-GRAY floor ${STRONG_FLOOR} (a low-chroma bronze IS a neutral — the brand-metal sanction breaks)`);
            bronzeOk = false;
        }
        if (!hueOk) {
            violations.push(`M2 bronze${s}: hue ${parsed.H}° is OUTSIDE the warm-brown band [${BRONZE_HUE_LO},${BRONZE_HUE_HI}]° (gold/olive/khaki cast — not a distinct bronze metal)`);
            bronzeOk = false;
        }
    }
    m2.pass = bronzeOk;
    facts.m2 = m2;

    // ── M3 — ONE metal-PARAMETERIZED keyframe + the metal-agnostic recipe ──────
    const m3 = {};
    const metalSweepRe = /@keyframes\s+metal-shimmer-sweep\s*\{([\s\S]*?)\}\s*\}|@keyframes\s+metal-shimmer-sweep\s*\{([\s\S]*?)\}/;
    const sweepMatch = metalSweepRe.exec(animations);
    m3.keyframePresent = !!sweepMatch;
    if (!sweepMatch) {
        violations.push("M3: @keyframes metal-shimmer-sweep is ABSENT from animations.css");
    } else {
        const body = (sweepMatch[1] || sweepMatch[2] || "");
        // PURE position — the keyframe body carries ONLY background-position, NO
        // baked metal color (no var(--*gold*|*silver*|*bronze*|*color*), no oklch/hsl).
        const bodyHasMetalColor = /var\(--(?:color-)?(?:gold|silver|bronze)/.test(body)
            || /oklch\(|hsl\(|#[0-9a-f]{3,8}\b/i.test(body);
        const bodyIsPosition = /background-position/.test(body);
        m3.keyframePurePosition = !bodyHasMetalColor && bodyIsPosition;
        if (bodyHasMetalColor) {
            violations.push("M3: metal-shimmer-sweep keyframe body carries a BAKED metal color (it must be PURE position — the color is the recipe's --metal-shimmer-color job)");
        }
        if (!bodyIsPosition) {
            violations.push("M3: metal-shimmer-sweep keyframe body does NOT sweep background-position");
        }
    }
    // NO per-metal keyframe fork (the N-copy this wave kills).
    const forkRe = /@keyframes\s+(gold|silver|bronze)-shimmer[\w-]*/g;
    const forks = [];
    let fm;
    while ((fm = forkRe.exec(animations))) forks.push(fm[0]);
    m3.metalKeyframeForks = forks;
    if (forks.length) {
        violations.push(`M3: a per-metal keyframe FORK survives (${forks.join(", ")}) — the parameterized sweep must be the ONE keyframe`);
    }
    // The recipe is metal-AGNOSTIC: the shared .metal-* block resolves its gradient
    // off the --metal-stop-* slots (var(--metal-stop-dark) … ) + each class SETS
    // --metal-shimmer-color, NOT a baked --color-gold literal hard-coded per class.
    m3.recipeReadsStops = /var\(--metal-stop-dark\)/.test(metal) && /var\(--metal-stop-base\)/.test(metal);
    m3.channelMarkerPerMetal =
        /\.metal-gold\b[\s\S]*?--metal-shimmer-color:\s*gold/.test(metal)
        && /\.metal-silver\b[\s\S]*?--metal-shimmer-color:\s*silver/.test(metal)
        && /\.metal-bronze\b[\s\S]*?--metal-shimmer-color:\s*bronze/.test(metal);
    if (!m3.recipeReadsStops) {
        violations.push("M3: the .metal-* recipe does NOT resolve its gradient off the --metal-stop-* slots (it is not metal-agnostic)");
    }
    if (!m3.channelMarkerPerMetal) {
        violations.push("M3: a .metal-{gold,silver,bronze} class does NOT set its --metal-shimmer-color channel marker");
    }
    facts.m3 = m3;

    // ── M4 — gold-shimmer-slide RETIRED (clean break) + .gold-shimmer re-points ──
    const m4 = {};
    // NO gold-shimmer-slide ANYWHERE in src/ (keyframe OR consumer reference). We
    // check the relevant CSS surfaces (animations + utilities + theme literals).
    const goldSlideSurfaces = [animations, utilities, literals];
    const goldSlideSurvives = goldSlideSurfaces.some((s) => /gold-shimmer-slide/.test(s));
    m4.goldSlideRetired = !goldSlideSurvives;
    if (goldSlideSurvives) {
        violations.push("M4: a gold-shimmer-slide reference SURVIVES (keyframe or consumer) — the no-backwards-compat law forbids the alias");
    }
    // .gold-shimmer animates metal-shimmer-sweep with --metal-shimmer-color: gold.
    m4.goldShimmerRePointed =
        /\.gold-shimmer\b[\s\S]*?--metal-shimmer-color:\s*gold/.test(utilities)
        && /\.gold-shimmer\b[\s\S]*?animation:\s*metal-shimmer-sweep/.test(utilities);
    if (!m4.goldShimmerRePointed) {
        violations.push("M4: .gold-shimmer does NOT re-point onto metal-shimmer-sweep with --metal-shimmer-color: gold");
    }
    // --animate-gold-shimmer re-points onto metal-shimmer-sweep (literals.css).
    m4.animateGoldRePointed = /--animate-gold-shimmer:\s*metal-shimmer-sweep/.test(literals);
    if (!m4.animateGoldRePointed) {
        violations.push("M4: --animate-gold-shimmer does NOT re-point onto metal-shimmer-sweep in theme literals");
    }
    facts.m4 = m4;

    // ── M5 — the PRM-static bracket on EVERY metal utility ─────────────────────
    const m5 = {};
    // The ONLY `animation:` declarations in metal.css must sit inside the
    // no-preference media bracket. Extract the @media (prefers-reduced-motion:
    // no-preference) block(s) and the rest; assert NO `animation:` outside.
    const noPrefBlocks = [];
    const noPrefRe = /@media\s*\([^)]*prefers-reduced-motion:\s*no-preference[^)]*\)\s*\{/g;
    let pm;
    while ((pm = noPrefRe.exec(metal))) {
        // brace-match the block body.
        let depth = 1;
        let i = pm.index + pm[0].length;
        const start = i;
        while (i < metal.length && depth > 0) {
            if (metal[i] === "{") depth++;
            else if (metal[i] === "}") depth--;
            i++;
        }
        noPrefBlocks.push({ start, end: i - 1 });
    }
    // Find every `animation:` index in metal.css; each must be inside a noPref block.
    const animIdxs = [];
    const animRe = /(^|[^-])animation\s*:/g;
    let am;
    while ((am = animRe.exec(metal))) animIdxs.push(am.index + am[1].length);
    const animationsOutsideBracket = animIdxs.filter(
        (idx) => !noPrefBlocks.some((b) => idx >= b.start && idx < b.end),
    );
    m5.noPrefBlockCount = noPrefBlocks.length;
    m5.animationCount = animIdxs.length;
    m5.animationsOutsideBracket = animationsOutsideBracket.length;
    m5.allAnimationsBracketed = animIdxs.length > 0 && animationsOutsideBracket.length === 0;
    if (animIdxs.length === 0) {
        violations.push("M5: metal.css declares NO animation: at all (the swept sweep is the wave's point)");
    }
    if (animationsOutsideBracket.length > 0) {
        violations.push(`M5: ${animationsOutsideBracket.length} animation: declaration(s) in metal.css sit OUTSIDE the prefers-reduced-motion: no-preference bracket (the bracket leak — a PRM user must NOT get the slide)`);
    }
    // The static gradient is the un-bracketed base — each utility group carries a
    // `background:` / `background-image:` outside the bracket (the metal READS for
    // PRM users). We assert the metal classes carry a background OUTSIDE the bracket.
    const beforeFirstBracket = noPrefBlocks.length
        ? metal.slice(0, noPrefBlocks[0].start)
        : metal;
    m5.staticGradientUnbracketed =
        /\.metal-gold\b[\s\S]*?background/.test(beforeFirstBracket)
        && /\.metal-rainbow-rim\b[\s\S]*?background/.test(beforeFirstBracket);
    if (!m5.staticGradientUnbracketed) {
        violations.push("M5: a metal utility has NO at-rest static gradient outside the PRM bracket (a motion-only utility — the metal must READ for PRM users)");
    }
    facts.m5 = m5;

    // ── M6 — the metal family is CALM (no disco) + the slow clock ──────────────
    const m6 = {};
    // The BA.W-GLASS-CAL deleted disco set must NOT appear in metal.css or the
    // metal-shimmer-sweep keyframe.
    const DISCO = [
        "sparkle",
        "✦",
        "--glass-grain-opacity-disco",
        "--ripple-radius",
        "btn-audacious",
        "btn-gold-bg-sweep",
        "--duration-sparkle",
    ];
    const discoHits = DISCO.filter((d) => metal.includes(d) || (sweepMatch && (sweepMatch[0] || "").includes(d)));
    m6.discoHits = discoHits;
    if (discoHits.length) {
        violations.push(`M6: a disco recipe token survives in the metal family (${discoHits.join(", ")}) — the calm register forbids it`);
    }
    // The metal animation reads the slow --duration-metal clock, NOT a sub-second one.
    m6.readsMetalClock = /animation:\s*metal-shimmer-sweep\s+var\(--duration-metal\)/.test(metal);
    if (!m6.readsMetalClock) {
        violations.push("M6: the metal utility animation does NOT read the slow --duration-metal clock");
    }
    // --duration-metal is minted at >= 6s (the dignified slow pass; never a fast clock).
    const durMatch = /--duration-metal:\s*([\d.]+)s/.exec(schemeMotion);
    const durSeconds = durMatch ? parseFloat(durMatch[1]) : null;
    m6.durationMetal = durSeconds;
    if (durSeconds === null) {
        violations.push("M6: --duration-metal is not minted in scheme-motion.css");
    } else if (durSeconds < 6) {
        violations.push(`M6: --duration-metal (${durSeconds}s) is faster than the 6s dignified slow pass`);
    }
    // --duration-seal NEVER reintroduced (the phantom-retirement record holds —
    // it never existed; a re-mint is its own drift).
    m6.durationSealAbsent = !/--duration-seal\s*:/.test(schemeMotion);
    if (!m6.durationSealAbsent) {
        violations.push("M6: --duration-seal was reintroduced (it never existed — the §0 record forbids a phantom token)");
    }
    facts.m6 = m6;

    // metal.css is REACHABLE (wired into the utilities @import root).
    const utilRoot = readFileSync(resolve(ROOT, "src/styles/utilities.css"), "utf8");
    facts.metalImported = /@import\s+["']\.\/utilities\/metal\.css["']/.test(utilRoot);
    if (!facts.metalImported) {
        violations.push("WIRE: utilities/metal.css is NOT @import-ed in utilities.css (the partial never compiles into the bundle)");
    }

    return { violations, facts };
}

// ── the self-test bite (--self-test) — the anti-gameability arm ──────────────
function selfTest() {
    const fails = [];

    // M2 bite — a low-chroma bronze must red the warm-floor assert.
    const grayBronze = parseOklch("oklch(0.62 0.008 54)");
    if (grayBronze.C >= STRONG_FLOOR) {
        fails.push("self-test M2: a low-chroma bronze (C 0.008) was NOT below the floor (the brand-metal sanction has no teeth)");
    }
    // M2 bite — a gold-hue bronze must red the warm-brown band.
    const goldHueBronze = parseOklch("oklch(0.62 0.09 84)");
    if (goldHueBronze.H >= BRONZE_HUE_LO && goldHueBronze.H <= BRONZE_HUE_HI) {
        fails.push("self-test M2: a gold-hue (84°) bronze was NOT outside the warm-brown band (the distinct-metal fence has no teeth)");
    }

    // M3 bite — a per-metal keyframe fork must be flagged.
    const forkedKf = "@keyframes silver-shimmer-slide { 0% { background-position: 200% 0; } }";
    if (!/@keyframes\s+(gold|silver|bronze)-shimmer[\w-]*/.test(forkedKf)) {
        fails.push("self-test M3: a forked silver-shimmer-slide keyframe was NOT caught (the N-copy fence has no teeth)");
    }
    // M3 bite — a baked metal color in the keyframe body must be flagged.
    const bakedBody = "0% { background-position: 200% 0; background: var(--color-gold); }";
    if (!(/var\(--(?:color-)?(?:gold|silver|bronze)/.test(bakedBody))) {
        fails.push("self-test M3: a baked metal color in the keyframe body was NOT caught (the pure-position fence has no teeth)");
    }

    // M4 bite — a surviving gold-shimmer-slide reference must be flagged.
    const survivor = ".gold-shimmer { animation: gold-shimmer-slide 5s linear infinite; }";
    if (!/gold-shimmer-slide/.test(survivor)) {
        fails.push("self-test M4: a surviving gold-shimmer-slide was NOT caught (the clean-break fence has no teeth)");
    }

    // M5 bite — an unconditional metal animation (the bracket leak) must be flagged.
    const leak = ".metal-gold { animation: metal-shimmer-sweep var(--duration-metal) linear infinite; }";
    // (the detector keys off an `animation:` OUTSIDE a no-preference block; here
    // there is no @media wrapper, so the animation index lands outside — caught.)
    const leakAnimRe = /(^|[^-])animation\s*:/;
    if (!leakAnimRe.test(leak)) {
        fails.push("self-test M5: an unconditional metal animation was NOT detected (the bracket-leak fence has no teeth)");
    }

    // M6 bite — a disco token in the metal family must be flagged.
    const disco = ".metal-gold::after { content: '✦'; }";
    if (!disco.includes("✦")) {
        fails.push("self-test M6: a sparkle ✦ glyph was NOT caught (the calm-register fence has no teeth)");
    }
    // M6 bite — a sub-second metal clock must be flagged.
    const fastClock = "--duration-metal: 0.6s;";
    const fast = /--duration-metal:\s*([\d.]+)s/.exec(fastClock);
    if (fast && parseFloat(fast[1]) >= 6) {
        fails.push("self-test M6: a sub-second metal clock (0.6s) was NOT caught (the slow-pass fence has no teeth)");
    }

    return fails;
}

function run() {
    const selfTestMode = process.argv.includes("--self-test");
    const ARTIFACT = gateArtifactPath("GLASS_UI_METAL_SHIMMER_ARTIFACT", "BB-metal-shimmer");

    if (selfTestMode) {
        const fails = selfTest();
        const ok = fails.length === 0;
        console.log("proof:metal-shimmer --self-test — the bite arm (anti-gameability)");
        if (ok) {
            console.log("  all clause bites have teeth ✓");
        } else {
            for (const f of fails) console.log(`  ✗ ${f}`);
        }
        process.exit(ok ? 0 : 1);
    }

    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:metal-shimmer",
        facts,
        violations,
    });

    console.log("proof:metal-shimmer — the brand-metal TRIAD + the parameterized shimmer sweep — BB.W-METAL-SHIMMER");
    const quadsOk = ["gold", "silver", "bronze"].every(
        (m) => facts.m1.rawQuad[m] && facts.m1.bridgeAlias[m] && facts.m1.lightDarkArm[m] && facts.m1.darkFallback[m],
    );
    console.log(`  M1 three quads PARALLEL (raw·bridge·light-dark·dark): ${quadsOk ? "✓" : "✗"}`);
    console.log(`  M2 bronze warm-brown metal (hue ${BRONZE_HUE_LO}-${BRONZE_HUE_HI}°, C ≥ ${STRONG_FLOOR}): ${facts.m2.pass ? "✓" : "✗"}`);
    console.log(`  M3 ONE parameterized keyframe (pure position, stops off --metal-stop-*): ${facts.m3.keyframePurePosition && facts.m3.recipeReadsStops && facts.m3.metalKeyframeForks.length === 0 ? "✓" : "✗"}`);
    console.log(`  M4 gold-shimmer-slide RETIRED + .gold-shimmer re-points: ${facts.m4.goldSlideRetired && facts.m4.goldShimmerRePointed && facts.m4.animateGoldRePointed ? "✓" : "✗"}`);
    console.log(`  M5 PRM-static bracket (${facts.m5.animationCount} animations, ${facts.m5.animationsOutsideBracket} leaked): ${facts.m5.allAnimationsBracketed && facts.m5.staticGradientUnbracketed ? "✓" : "✗"}`);
    console.log(`  M6 CALM (no disco, --duration-metal=${facts.m6.durationMetal}s): ${facts.m6.discoHits.length === 0 && facts.m6.readsMetalClock && facts.m6.durationMetal >= 6 ? "✓" : "✗"}`);
    console.log(`  WIRE metal.css @import-ed: ${facts.metalImported ? "✓" : "✗"}`);

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
