#!/usr/bin/env node
// BB.W-DEEP-GLASS — the OPT-IN deep-glass tier (proof:glass-depth).
//
// The `--glass-depth` axis + the SEPARATE `--glass-blur-deep-*` family + the
// `.glass-deep` decoration + the `deep` CardTier rung — the maximal iOS-27
// Liquid-Glass register ABOVE the W-GLASS-CAL calm default (the Apple
// `saturate(1.8) blur(14-20px)` band, landed at the budget-clearing 16px /
// saturate 1.5). The calm content default is BYTE-UNCHANGED (the deep family is
// minted ALONGSIDE the calm ladder, which never reads it) — proof:glass-cal stays
// GREEN by construction.
//
// The comment-strip + pure-detector house pattern (mirroring proof-glass-accent.mjs
// / proof-glass-cal.mjs). Each of the five SOURCE clauses (D1-D5) is RED at HEAD
// pre-wave (zero --glass-depth / --glass-blur-deep-* / .glass-deep); the π readback
// (tests-visual/glass-depth.spec.ts + the W-DEEP-GLASS-DELTA) is the BINDING visual
// truth — per-mechanism greens alone do NOT close this visual wave (BB inv-4). The
// proof:ba-gestalt glass/CTA verdict is the gestalt bar.
//
//   D1 — `--glass-depth` is a typed INHERITING `<number>` @property AND the deep
//        recipe READS `var(--glass-depth)` (NOT a baked literal).
//   D2 — the deep tier is at the Apple range (radius ∈ [14,20], saturate ≥ 1.5) AND
//        STRICTLY DEEPER than the calm floating rung (13px / 1.18) on BOTH axes.
//   D3 — the calm content default is BYTE-UNCHANGED — every base
//        `--glass-blur-*-radius` primitive retains its W-GLASS-CAL value AND
//        proof:glass-cal is cross-asserted GREEN.
//   D4 — the deep tier COMPOSES `--glass-level` (the deep blur scales it) AND
//        `.glass-deep` rides a base rung (a token re-point, the `.glass-opaque`
//        precedent — NOT a competing full background/border/box-shadow recipe).
//   D5 — the deep tier is OPT-IN — the deep blur appears ONLY in the `.glass-deep`
//        rule (+ the `deep` CardTier branch), NEVER on a base tier rule / the Card
//        default.
//
// bite-check (the --self-test arm): hardcoding the deep magnitude (no var(--glass-
// depth)) reds D1; a deep radius ≤ 13px / saturate ≤ 1.18 reds D2; editing a base
// --glass-blur-floating-radius to 16px (the blind un-dial) reds D3; dropping
// var(--glass-level) from the deep blur (the parallel-recipe fork) reds D4;
// applying the deep blur to .glass-resting / defaulting <Card> to tier="deep" reds D5.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execSync } from "node:child_process";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// The calm floating ceiling the deep tier must sit STRICTLY ABOVE (the W-GLASS-CAL
// dial-back values). The deep tier reads these as its depth-0 floor.
const CALM_FLOATING_RADIUS = 13;
const CALM_FLOATING_SATURATE = 1.18;

// The Apple deep band the deep radius must land inside.
const APPLE_BAND = { min: 14, max: 20 };
const DEEP_SATURATE_FLOOR = 1.5;

// The W-GLASS-CAL frozen base radius primitives — D3 asserts each is byte-unchanged
// (a deep mint that edits a base primitive to "reach Apple" REVERTS the user call).
const FROZEN_BASE_RADII = {
    "glass-blur-wash-radius": 1,
    "glass-blur-quiet-radius": 8,
    "glass-blur-resting-radius": 10,
    "glass-blur-floating-radius": 13,
    "glass-blur-overlay-radius": 13,
    "glass-blur-dock-radius": 9,
};

function squish(src) {
    return src.replace(/\s+/g, " ");
}

// Parse a `--token: <px>;` integer/float radius declaration from a token source.
function readPxToken(src, token) {
    const m = new RegExp(`--${token}:\\s*([0-9.]+)px`).exec(src);
    return m ? parseFloat(m[1]) : null;
}

// ── D1 + D2: the --glass-depth axis + the Apple-range deep tokens ────────────
function detectAxis() {
    const violations = [];
    const facts = {};

    const tokens = stripCss(readMonolith(ROOT, "tokens"));
    const tokensSquished = squish(tokens);

    // D1 — the @property --glass-depth registration (typed inheriting <number>).
    const depthReg = /@property\s+--glass-depth\s*\{[^}]*\}/.exec(tokens)?.[0] ?? "";
    facts.depthRegistered = depthReg.length > 0;
    facts.depthSyntaxNumber = /syntax:\s*"<number>"/.test(depthReg);
    facts.depthInherits = /inherits:\s*true/.test(depthReg);
    if (!depthReg) {
        violations.push("D1: `@property --glass-depth` is not registered");
    } else {
        if (!facts.depthSyntaxNumber)
            violations.push('D1: `@property --glass-depth` syntax is not `"<number>"`');
        if (!facts.depthInherits)
            violations.push(
                "D1: `@property --glass-depth` is not `inherits: true` (the cascading-scalar idiom, the --glass-level twin)",
            );
    }

    // D1 — the deep recipe READS var(--glass-depth) (the axis is a genuine driver,
    // NOT a baked literal). Scan the deep radius + saturate LERP recipes.
    const deepActiveRadius =
        /--glass-blur-deep-active-radius:\s*([^;]+);/.exec(tokensSquished)?.[1] ?? "";
    const deepActiveSaturate =
        /--glass-saturate-deep-active:\s*([^;]+);/.exec(tokensSquished)?.[1] ?? "";
    facts.deepRadiusReadsDepth = /var\(--glass-depth\)/.test(deepActiveRadius);
    facts.deepSaturateReadsDepth = /var\(--glass-depth\)/.test(deepActiveSaturate);
    if (!deepActiveRadius) {
        violations.push(
            "D1: no `--glass-blur-deep-active-radius` recipe found (the deep radius family is unminted)",
        );
    } else if (!facts.deepRadiusReadsDepth) {
        violations.push(
            "D1: the deep radius recipe does not read `var(--glass-depth)` (a baked literal — the axis must DRIVE the deep blur, not a hardcoded magnitude)",
        );
    }
    if (!deepActiveSaturate) {
        violations.push(
            "D1: no `--glass-saturate-deep-active` recipe found (the deep saturate family is unminted)",
        );
    } else if (!facts.deepSaturateReadsDepth) {
        violations.push(
            "D1: the deep saturate recipe does not read `var(--glass-depth)` (a baked literal — the axis must DRIVE the deep saturate)",
        );
    }

    // D2 — the deep endpoints at the Apple range + STRICTLY deeper than calm floating.
    const deepRadius = readPxToken(tokens, "glass-blur-deep-radius");
    const deepSaturate = (() => {
        const m = /--glass-saturate-deep:\s*([0-9.]+)\b/.exec(tokens);
        return m ? parseFloat(m[1]) : null;
    })();
    facts.deepRadius = deepRadius;
    facts.deepSaturate = deepSaturate;
    facts.calmFloatingRadius = CALM_FLOATING_RADIUS;
    facts.calmFloatingSaturate = CALM_FLOATING_SATURATE;

    if (deepRadius === null) {
        violations.push("D2: `--glass-blur-deep-radius` is not declared (the deep endpoint is unminted)");
    } else {
        if (deepRadius <= CALM_FLOATING_RADIUS)
            violations.push(
                `D2: the deep radius ${deepRadius}px is NOT strictly deeper than the calm floating ${CALM_FLOATING_RADIUS}px (the "increased glassmorphism" is not realized)`,
            );
        if (deepRadius < APPLE_BAND.min || deepRadius > APPLE_BAND.max)
            violations.push(
                `D2: the deep radius ${deepRadius}px is outside the Apple band [${APPLE_BAND.min},${APPLE_BAND.max}]px`,
            );
    }
    if (deepSaturate === null) {
        violations.push("D2: `--glass-saturate-deep` is not declared (the deep saturate endpoint is unminted)");
    } else {
        if (deepSaturate <= CALM_FLOATING_SATURATE)
            violations.push(
                `D2: the deep saturate ${deepSaturate} is NOT strictly greater than the calm floating ${CALM_FLOATING_SATURATE}`,
            );
        if (deepSaturate < DEEP_SATURATE_FLOOR)
            violations.push(
                `D2: the deep saturate ${deepSaturate} is below the ${DEEP_SATURATE_FLOOR} floor (toward the Apple 1.8 light-concentration)`,
            );
    }

    // D3 — the calm content default is BYTE-UNCHANGED (every base primitive frozen).
    facts.frozenBaseRadii = {};
    let driftCount = 0;
    for (const [token, expected] of Object.entries(FROZEN_BASE_RADII)) {
        const actual = readPxToken(tokens, token);
        facts.frozenBaseRadii[token] = actual;
        if (actual !== expected) {
            driftCount += 1;
            violations.push(
                `D3: the base primitive --${token} = ${actual}px drifted off its W-GLASS-CAL frozen value ${expected}px (a blind un-dial REVERTS the calm-default user call)`,
            );
        }
    }
    facts.calmLadderByteUnchanged = driftCount === 0;
    // the deep family is a DISTINCT name the calm ladder never reads — assert the
    // calm composed --glass-blur-floating still composes the calm floating radius
    // (NOT the deep radius — a copy-paste that re-pointed it would be the bleed).
    const calmFloatingComposed =
        /--glass-blur-floating:\s*blur\(calc\(var\(--glass-blur-floating-radius\)\s*\*\s*var\(--glass-level\)\)\)\s*saturate\(1\.18\)/.test(
            tokensSquished,
        );
    facts.calmFloatingComposedIntact = calmFloatingComposed;
    if (!calmFloatingComposed)
        violations.push(
            "D3: the calm `--glass-blur-floating` composed token no longer reads `blur(calc(--glass-blur-floating-radius * --glass-level)) saturate(1.18)` (the calm-ladder composite was edited — the deep mint bled into the base)",
        );

    // D4 — the deep blur COMPOSES var(--glass-level) (the level seam reaches it; a
    // deep blur that drops the level scalar is a parallel recipe).
    facts.deepRadiusComposesLevel = /var\(--glass-level\)/.test(deepActiveRadius);
    const deepBlurComposed =
        /--glass-blur-deep:\s*blur\([^;]*var\(--glass-blur-deep-active-radius\)/.test(tokensSquished);
    facts.deepBlurComposed = deepBlurComposed;
    if (!facts.deepRadiusComposesLevel)
        violations.push(
            "D4: the deep radius recipe does not scale `var(--glass-level)` (the level seam — the opaque escape + a11y brackets — must reach the deep plate; a deep blur that drops the level scalar is a parallel recipe)",
        );
    if (!deepBlurComposed)
        violations.push(
            "D4: the composed `--glass-blur-deep` does not read `var(--glass-blur-deep-active-radius)` (the deep blur is not composed off the level-scaling deep radius)",
        );

    return { violations, facts };
}

// ── D4 + D5: the .glass-deep decoration + the OPT-IN discipline ──────────────
function detectClass() {
    const violations = [];
    const facts = {};

    const glass = stripCss(readMonolith(ROOT, "glass"));
    const glassSquished = squish(glass);

    // D4 — `.glass-deep` is a DECORATION (a token re-point ON a base rung, the
    // `.glass-opaque` precedent), NOT a competing full recipe. Assert it re-points
    // the floating blur token to the deep family AND does NOT re-declare a full
    // background/border/box-shadow block.
    const deepRule = /\.glass-deep\s*\{([^}]*)\}/.exec(glass)?.[1] ?? "";
    facts.deepRuleExists = deepRule.length > 0;
    facts.deepRePointsFloating = /--glass-blur-floating:\s*var\(--glass-blur-deep\)/.test(deepRule);
    // the no-parallel-recipe fence: .glass-deep must NOT carry a full background/
    // box-shadow recipe (it rides the base rung's). A `background:` or `box-shadow:`
    // declaration inside the .glass-deep block is the parallel-recipe fork.
    facts.deepNoParallelBackground = !/background\s*:/.test(deepRule);
    facts.deepNoParallelBoxShadow = !/box-shadow\s*:/.test(deepRule);

    if (!facts.deepRuleExists) {
        violations.push("D4/D5: no `.glass-deep` rule found (the opt-in deep decoration is unminted)");
    } else {
        if (!facts.deepRePointsFloating)
            violations.push(
                "D4: `.glass-deep` does not re-point `--glass-blur-floating: var(--glass-blur-deep)` (the token-substitution model, the `.glass-opaque` precedent — the deep blur must reach the rung via the token re-point, not a competing backdrop-filter)",
            );
        if (!facts.deepNoParallelBackground)
            violations.push(
                "D4: `.glass-deep` declares a `background:` (a parallel solid/blur recipe — it must DECORATE a base rung, not re-author the whole surface)",
            );
        if (!facts.deepNoParallelBoxShadow)
            violations.push(
                "D4: `.glass-deep` declares a `box-shadow:` (a parallel recipe — the deep tier rides the base rung's edge/rim/under-shadow)",
            );
    }

    // D5 — the deep tier is OPT-IN: the deep blur appears ONLY in `.glass-deep`,
    // NEVER on a base content-tier rule. Assert no base `.glass-{wash,quiet,resting,
    // floating,overlay,card}` rule re-points its blur to the deep family or composes
    // var(--glass-blur-deep) directly.
    const baseTierDeepLeak =
        /\.glass-(wash|quiet|resting|overlay|card)\s*\{[^}]*var\(--glass-blur-deep\)/.test(
            glassSquished,
        );
    facts.baseTierDeepLeak = baseTierDeepLeak;
    if (baseTierDeepLeak)
        violations.push(
            "D5: a base content-tier rule (.glass-wash/quiet/resting/overlay/card) reads the deep blur family — the deep tier must be OPT-IN behind `.glass-deep`, never the bare content default (this reverts the calm-default user call by another path)",
        );

    // D5 — the Card default is NOT `deep` + the `deep` resolver branch maps to a base
    // rung + the deep decoration (mirroring opaque).
    const cardFile = resolve(ROOT, "src/components/ui/card/Card.vue");
    const card = existsSync(cardFile) ? readFileSync(cardFile, "utf8") : "";
    const cardStripped = card.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
    facts.cardTierHasDeep = /CardTier[\s\S]*?\|\s*"deep"/.test(cardStripped);
    facts.cardDeepMapsBaseRung = /tier\s*===\s*'deep'[\s\S]{0,60}'glass-floating glass-deep'/.test(
        squish(cardStripped),
    );
    // the Card default must NOT be deep (the deep tier is reached only by explicit prop).
    const cardDefaultDeep = /tier\??\s*:\s*CardTier[\s\S]{0,40}default\s*:\s*['"]deep['"]/.test(
        squish(cardStripped),
    ) || /withDefaults\([\s\S]*?tier:\s*['"]deep['"]/.test(squish(cardStripped));
    facts.cardDefaultDeep = cardDefaultDeep;

    if (!facts.cardTierHasDeep)
        violations.push('D5: the `CardTier` union does not include `| "deep"` (the opt-in rung is unminted)');
    if (!facts.cardDeepMapsBaseRung)
        violations.push(
            "D5: the Card resolver does not map `deep → 'glass-floating glass-deep'` (a base rung + the deep decoration, mirroring opaque)",
        );
    if (cardDefaultDeep)
        violations.push(
            'D5: the Card `tier` default is `deep` — the deepest paint must NOT be the bare default (the deep tier is opt-in, reached only by an explicit prop)',
        );

    return { violations, facts };
}

// ── D3 cross-assert: proof:glass-cal stays GREEN ─────────────────────────────
function detectCalmCalGreen() {
    const violations = [];
    const facts = {};
    let calGreen = false;
    try {
        execSync("node scripts/proof-glass-cal.mjs", {
            cwd: ROOT,
            stdio: "pipe",
        });
        calGreen = true;
    } catch {
        calGreen = false;
    }
    facts.glassCalGreen = calGreen;
    if (!calGreen)
        violations.push(
            "D3: proof:glass-cal is RED — the deep mint regressed the calm ladder (the calm-default user call was reverted; the deep tier must be a SEPARATE family the calm ladder never reads)",
        );
    return { violations, facts };
}

export function detect() {
    const axis = detectAxis();
    const cls = detectClass();
    const cal = detectCalmCalGreen();
    return {
        violations: [...axis.violations, ...cls.violations, ...cal.violations],
        facts: { axis: axis.facts, class: cls.facts, cal: cal.facts },
    };
}

// ── the self-test bite (--self-test) — the anti-gameability arm ──────────────
function selfTest() {
    const fails = [];

    // D1 bite — a hardcoded deep magnitude (no var(--glass-depth)) must be caught.
    const bakedRecipe = "--glass-blur-deep-active-radius: calc(16px * var(--glass-level));";
    if (/var\(--glass-depth\)/.test(bakedRecipe))
        fails.push("self-test D1: a baked deep magnitude (no var(--glass-depth)) slipped the axis-driven assert");

    // D2 bite — a deep radius ≤ 13px (not deeper than calm floating) must red.
    const shallowRadius = 12;
    if (shallowRadius > CALM_FLOATING_RADIUS)
        fails.push("self-test D2: a ≤13px deep radius slipped the strictly-deeper assert");
    const shallowSaturate = 1.18;
    if (shallowSaturate > CALM_FLOATING_SATURATE)
        fails.push("self-test D2: a ≤1.18 deep saturate slipped the strictly-deeper assert");

    // D3 bite — a base --glass-blur-floating-radius edited to 16px (the blind un-dial)
    // must red the byte-unchanged assert.
    const unDialed = "--glass-blur-floating-radius: 16px;";
    const m = /--glass-blur-floating-radius:\s*([0-9.]+)px/.exec(unDialed);
    if (m && parseFloat(m[1]) === FROZEN_BASE_RADII["glass-blur-floating-radius"])
        fails.push("self-test D3: the blind un-dial (floating → 16px) slipped the frozen-value assert");

    // D4 bite — a deep blur that drops var(--glass-level) (the parallel-recipe fork) must red.
    const parallelRecipe = "--glass-blur-deep-active-radius: calc(16px * var(--glass-depth));";
    if (/var\(--glass-level\)/.test(parallelRecipe))
        fails.push("self-test D4: a deep blur dropping var(--glass-level) slipped the level-compose assert");

    // D4 bite — a .glass-deep that re-declares a full background recipe (a parallel
    // recipe) must red.
    const forkedDeep = ".glass-deep { background: var(--card); backdrop-filter: blur(16px); }";
    if (!/background\s*:/.test(forkedDeep))
        fails.push("self-test D4: a .glass-deep parallel `background:` recipe was NOT caught");

    // D5 bite — a base content tier reading the deep blur (the deepest-paint-default
    // revert) must red.
    const leakedBase = ".glass-resting { backdrop-filter: var(--glass-blur-deep); }";
    if (!/\.glass-(wash|quiet|resting|overlay|card)\s*\{[^}]*var\(--glass-blur-deep\)/.test(
        squish(leakedBase),
    ))
        fails.push("self-test D5: a base content-tier deep leak was NOT caught (the opt-in fence has no teeth)");

    return fails;
}

const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_DEPTH_ARTIFACT", "BB-glass-depth");

function run() {
    if (process.argv.includes("--self-test")) {
        const fails = selfTest();
        const ok = fails.length === 0;
        console.log("proof:glass-depth --self-test — the bite arm (anti-gameability)");
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
        gate: "proof:glass-depth",
        facts,
        violations,
    });

    console.log(
        "proof:glass-depth — the OPT-IN deep-glass tier (--glass-depth / --glass-blur-deep-* / .glass-deep / CardTier deep) — BB.W-DEEP-GLASS",
    );
    console.log(
        `  D1 axis     : @property --glass-depth=${facts.axis.depthRegistered ? "✓" : "✗"} (<number> inherit: ${facts.axis.depthSyntaxNumber && facts.axis.depthInherits ? "✓" : "✗"})   recipe reads depth: radius=${facts.axis.deepRadiusReadsDepth ? "✓" : "✗"} saturate=${facts.axis.deepSaturateReadsDepth ? "✓" : "✗"}`,
    );
    console.log(
        `  D2 range    : deep radius=${facts.axis.deepRadius}px (calm floating ${facts.axis.calmFloatingRadius}px, Apple [${APPLE_BAND.min},${APPLE_BAND.max}])   deep saturate=${facts.axis.deepSaturate} (calm ${facts.axis.calmFloatingSaturate}, floor ${DEEP_SATURATE_FLOOR})`,
    );
    console.log(
        `  D3 calm     : base radii byte-unchanged=${facts.axis.calmLadderByteUnchanged ? "✓" : "✗"}   calm floating composite intact=${facts.axis.calmFloatingComposedIntact ? "✓" : "✗"}   proof:glass-cal=${facts.cal.glassCalGreen ? "GREEN ✓" : "RED ✗"}`,
    );
    console.log(
        `  D4 compose  : deep radius scales --glass-level=${facts.axis.deepRadiusComposesLevel ? "✓" : "✗"}   .glass-deep re-points floating=${facts.class.deepRePointsFloating ? "✓" : "✗"}   no parallel recipe=${facts.class.deepNoParallelBackground && facts.class.deepNoParallelBoxShadow ? "✓" : "✗"}`,
    );
    console.log(
        `  D5 opt-in   : base-tier deep leak=${facts.class.baseTierDeepLeak ? "✗ LEAK" : "none ✓"}   CardTier deep=${facts.class.cardTierHasDeep ? "✓" : "✗"}   deep→base+decoration=${facts.class.cardDeepMapsBaseRung ? "✓" : "✗"}   Card default deep=${facts.class.cardDefaultDeep ? "✗" : "no ✓"}`,
    );

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
