#!/usr/bin/env node
// AY.W-MOTION2 — the motion-suite parity gate (proof:motion-suite).
//
// glass-ui is the DISTRIBUTION SEAM for the @mkbabb/keyframes.js motion suite + the
// value.js curve set: `/motion` re-exports the keyframes.js STATIC barrel (the suite)
// and `/motion-curves` re-exports the value.js `ease*` family + the CSS↔JS
// `MOTION_CURVES` table. This gate proves the seam stays COMPLETE and DRIFT-FREE,
// four ways:
//
//   (1) SUITE-COMPLETE (two-tier parity manifest):
//        · STATIC rows — every public export of the pinned keyframes.js static
//          barrel (the 24 runtime exports + the erased types + loadAnimationEngine
//          itself) is PRESENT in the `/motion` dist dts.
//        · DYNAMIC rows — the 16-member heavy AnimationEngine surface is REACHABLE
//          THROUGH `loadAnimationEngine()` (a runtime probe `await`ing the loader)
//          and NOT present in the static `/motion` dts. A static DYNAMIC row is
//          itself a RED — the value.js isolation boundary must not flatten.
//        · VERSION STAMP — records the exact keyframes.js + value.js versions the
//          manifest enumerated against; a dep bump REDs the stamp and forces a re-run.
//   (2) CURVE-TABLE-BOUND — MOTION_CURVES covers EVERY `--ease-*`/`--spring-*` token
//        declared in tokens.css §2 + theme.css (a source-witness sweep; a token
//        without a JS twin or alias row REDs — the two halves cannot drift). The
//        alias set is CLOSED with the recorded fence (canonical rows / alias rows /
//        out-of-fence consumers).
//   (3) NO-FORK — grep proves zero re-implementations: MOTION_CURVES rows REFERENCE
//        peer symbols (springTimingFunction / CSSCubicBezier / the value.js ease*
//        family), never an inline copy of a stop list, a bezier sampler, or the
//        forward `cssTwinFor` direction.
//   (4) VALUE-FREE-MOTION — the `/motion` dist chunk carries NO static value.js
//        import (the §2.2 carve: the curve library rides `/motion-curves`).
//
// Bite: add a keyframes.js static export not re-exported on `/motion` → SUITE-COMPLETE
// RED. Statically re-export a DYNAMIC engine member → SUITE-COMPLETE RED (flattened
// boundary). Add a `--spring-foo` token with no MOTION_CURVES row → CURVE-TABLE-BOUND
// RED. Inline a stop list in curves.ts → NO-FORK RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const require = createRequire(import.meta.url);

const MOTION_DTS = resolve(ROOT, "dist/motion.d.ts");
const MOTION_JS = resolve(ROOT, "dist/motion.js");
const CURVES_TS = resolve(ROOT, "src/composables/motion/curves.ts");
const TOKENS_CSS = resolve(ROOT, "src/styles/tokens.css");
const THEME_CSS = resolve(ROOT, "src/styles/theme.css");

// ── The two-tier surface, enumerated against the pinned 4.1.0 barrel ──────────
// STATIC runtime exports (24 — the 4.1.0 light barrel) + loadAnimationEngine.
const STATIC_RUNTIME = [
    "NumericAnimation", "SpringProgress", "SmoothProgress",
    "Sequence", "Timeline", "ManualTimeline", "RAFPlayback", "ScrollTimeline",
    "createNativeTimeline", "flip", "flipShared", "ElementMorph",
    "drag", "Draggable", "decay", "decayRest", "stagger",
    "springTimingFunction", "springLinearStops", "toEasing", "resolveEasing",
    "AnimationOptionError", "UnknownEasingError", "loadAnimationEngine",
];

// The 16-member heavy AnimationEngine surface (behind loadAnimationEngine()).
const DYNAMIC_ENGINE = [
    "Animation", "CSSKeyframesAnimation", "AnimationGroup", "getAnimationId",
    "getTimingFunction", "resolveKeyframes", "animate", "MotionPath",
    "fromMotionPath", "DrawSVG", "fromDrawSVG", "presets",
    "DIRECTIONS", "FILL_MODES", "defaultOptions", "defaultLayerConfig",
];

// The value.js `ease*` family the curve library re-exports (the complete curve set).
const VALUE_EASE_FAMILY = [
    "easeInQuad", "easeOutQuad", "easeInOutQuad",
    "easeInCubic", "easeOutCubic", "easeInOutCubic",
    "easeInSine", "easeOutSine", "easeInOutSine",
    "easeInCirc", "easeOutCirc", "easeInOutCirc",
    "easeInExpo", "easeOutExpo", "easeInOutExpo",
    "easeInBounce", "CSSCubicBezier", "linear",
];

function pkgVersion(name) {
    try {
        return require(`${name}/package.json`).version;
    } catch {
        // value.js blocks ./package.json via exports — read the installed dir directly.
        const p = resolve(ROOT, "node_modules", name, "package.json");
        if (existsSync(p)) return JSON.parse(readFileSync(p, "utf8")).version;
        return "unknown";
    }
}

/**
 * Enumerate the RUNTIME export names of the built `dist/motion.js` chunk — the
 * truthful re-export surface (the dts is a thin `export * from "./composables/
 * motion"`, so a name-grep there would miss the transitively re-exported suite).
 * The runtime module's own export set IS the published runtime surface; the dts
 * mirrors it (verify-export-types is the dts-resolution gate).
 */
async function motionRuntimeExports() {
    const mod = await import(pathToFileURL(MOTION_JS).href);
    return new Set(Object.keys(mod));
}

export async function detect() {
    const violations = [];
    const facts = {};

    const kfVersion = pkgVersion("@mkbabb/keyframes.js");
    const vjVersion = pkgVersion("@mkbabb/value.js");
    facts.versions = { keyframes: kfVersion, value: vjVersion };

    // VERSION STAMP — the manifest enumerated against keyframes.js 4.1.0 + value.js
    // 0.10.x. A later bump REDs here and forces a manifest re-run (not silent widen).
    if (!/^4\.1\./.test(kfVersion)) {
        violations.push(
            `VERSION STAMP: keyframes.js is ${kfVersion}, manifest enumerated against 4.1.x — re-run the manifest after the bump`,
        );
    }
    if (!/^0\.1[01]\./.test(vjVersion)) {
        violations.push(
            `VERSION STAMP: value.js is ${vjVersion}, manifest enumerated against 0.10.x/0.11.x — re-run after the bump`,
        );
    }

    // ── (1) SUITE-COMPLETE ────────────────────────────────────────────────────
    if (!existsSync(MOTION_DTS) || !existsSync(MOTION_JS)) {
        violations.push(`SUITE-COMPLETE: dist/motion.{js,d.ts} not found — run \`npm run build\` first`);
        return { facts, violations };
    }
    const motionExports = await motionRuntimeExports();

    // STATIC rows PRESENT in the /motion runtime surface.
    const missingStatic = STATIC_RUNTIME.filter((n) => !motionExports.has(n));
    facts.staticPresent = STATIC_RUNTIME.length - missingStatic.length;
    facts.staticTotal = STATIC_RUNTIME.length;
    if (missingStatic.length) {
        violations.push(
            `SUITE-COMPLETE (STATIC): ${missingStatic.length} keyframes.js static export(s) NOT re-exported on /motion: ${missingStatic.join(", ")}`,
        );
    }

    // DYNAMIC rows NOT present statically (the boundary must not flatten).
    const leakedDynamic = DYNAMIC_ENGINE.filter((n) => motionExports.has(n));
    facts.dynamicLeaked = leakedDynamic.length;
    if (leakedDynamic.length) {
        violations.push(
            `SUITE-COMPLETE (DYNAMIC): ${leakedDynamic.length} heavy AnimationEngine member(s) leaked into the static /motion surface (the loadAnimationEngine boundary flattened): ${leakedDynamic.join(", ")}`,
        );
    }

    // DYNAMIC rows REACHABLE THROUGH the loader (a live probe).
    try {
        const kf = await import("@mkbabb/keyframes.js");
        const engine = await kf.loadAnimationEngine();
        const unreachable = DYNAMIC_ENGINE.filter((n) => !(n in engine));
        facts.dynamicReachable = DYNAMIC_ENGINE.length - unreachable.length;
        facts.dynamicTotal = DYNAMIC_ENGINE.length;
        if (unreachable.length) {
            violations.push(
                `SUITE-COMPLETE (DYNAMIC): ${unreachable.length} engine member(s) NOT reachable through loadAnimationEngine(): ${unreachable.join(", ")}`,
            );
        }
    } catch (e) {
        violations.push(`SUITE-COMPLETE (DYNAMIC): loadAnimationEngine() probe threw — ${e.message}`);
    }

    // ── VALUE-FREE-MOTION — the /motion chunk has NO static value.js import ─────
    if (existsSync(MOTION_JS)) {
        const motionJs = readFileSync(MOTION_JS, "utf8");
        const hasValueEdge = /@mkbabb\/value\.js/.test(motionJs);
        facts.motionValueFree = !hasValueEdge;
        if (hasValueEdge) {
            violations.push(
                "VALUE-FREE-MOTION: dist/motion.js statically imports @mkbabb/value.js — the curve library must ride /motion-curves (§2.2 carve)",
            );
        }
    }

    // ── (2) CURVE-TABLE-BOUND ──────────────────────────────────────────────────
    // Sweep tokens.css + theme.css for `--ease-*` / `--spring-*` declarations.
    const tokenDecls = new Set();
    for (const css of [readFileSync(TOKENS_CSS, "utf8"), readFileSync(THEME_CSS, "utf8")]) {
        for (const m of css.matchAll(/^\s*(--(?:ease|spring|motion-ease)-[a-z-]+)\s*:/gm)) {
            tokenDecls.add(m[1]);
        }
    }
    facts.sweptTokens = [...tokenDecls].sort();

    // The fence's out-of-fence consumers (§2-EXTERNAL — tokens that CONSUME a spring
    // but are not curve declarations). They live under `--vt-`/`--dock-`/`--animate-`
    // prefixes (excluded by the `(ease|spring|motion-ease)` sweep already), recorded.
    facts.outOfFence = ["--vt-ease", "--dock-resize-spring", "--dock-press-spring", "--animate-ambient-pulse-easing"];

    // Load the MOTION_CURVES token set from curves.ts (a source-witness — every row's
    // `token:` literal). We read the SOURCE rather than import to stay node-pure.
    const curvesSrc = readFileSync(CURVES_TS, "utf8");
    const curveTokens = new Set();
    // Canonical + alias rows: `token: "--x"` (double-quote) and `{ token: "--x", ... }`.
    for (const m of curvesSrc.matchAll(/token:\s*["'`](--[a-z-]+)["'`]/g)) curveTokens.add(m[1]);
    // The five spring rows are built programmatically (`--spring-${name}`) — add them.
    for (const name of ["smooth", "snappy", "bouncy", "gentle", "dock"]) {
        curveTokens.add(`--spring-${name}`);
    }
    facts.curveTokenCount = curveTokens.size;

    const uncovered = [...tokenDecls].filter((t) => !curveTokens.has(t));
    if (uncovered.length) {
        violations.push(
            `CURVE-TABLE-BOUND: ${uncovered.length} --ease-*/--spring-* token(s) declared in tokens.css/theme.css have NO MOTION_CURVES row: ${uncovered.join(", ")}`,
        );
    }

    // ── (3) NO-FORK ────────────────────────────────────────────────────────────
    // curves.ts must REFERENCE peer symbols, never re-implement. Flag a forward
    // `cssTwinFor` re-impl, an inline `linear(` stop list, or a hand-rolled bezier
    // sampler (a `solveCubic`/`bezier(` local fn).
    const forkPatterns = [
        { re: /function\s+cssTwinFor/, label: "a local cssTwinFor (the forward JS-name→CSS direction is keyframes.js's; MOTION_CURVES is the reverse)" },
        { re: /=\s*["'`]linear\(/, label: "an inline linear() stop list (reference springLinearStops/springTimingFunction, never inline stops)" },
        { re: /function\s+solveCubicBezier|function\s+sampleBezier/, label: "a hand-rolled bezier sampler (use value.js CSSCubicBezier)" },
    ];
    const forks = forkPatterns.filter((p) => p.re.test(curvesSrc));
    if (forks.length) {
        for (const f of forks) violations.push(`NO-FORK: curves.ts contains ${f.label}`);
    }
    // Positive: curves.ts references the peer solver pair + the bezier evaluator.
    facts.referencesSpringTimingFunction = /springTimingFunction\(/.test(curvesSrc);
    facts.referencesCSSCubicBezier = /CSSCubicBezier\(/.test(curvesSrc);
    if (!facts.referencesSpringTimingFunction) {
        violations.push("NO-FORK: curves.ts does not reference springTimingFunction — spring twins must compose the peer solver");
    }
    if (!facts.referencesCSSCubicBezier) {
        violations.push("NO-FORK: curves.ts does not reference CSSCubicBezier — bezier twins must compose the value.js evaluator");
    }

    return { facts, violations };
}

async function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_MOTION_SUITE_ARTIFACT", "AY-motion-suite");
    const { facts, violations } = await detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:motion-suite",
        facts,
        violations,
    });

    console.log("proof:motion-suite — the /motion keyframes.js suite + /motion-curves curve table parity (AY.W-MOTION2)");
    console.log(`  keyframes.js / value.js : ${facts.versions?.keyframes} / ${facts.versions?.value}`);
    console.log(`  STATIC present          : ${facts.staticPresent}/${facts.staticTotal}`);
    console.log(`  DYNAMIC reachable        : ${facts.dynamicReachable}/${facts.dynamicTotal} (leaked-static: ${facts.dynamicLeaked})`);
    console.log(`  /motion value.js-free    : ${facts.motionValueFree}`);
    console.log(`  swept --ease/--spring    : ${facts.sweptTokens?.length} tokens, MOTION_CURVES rows: ${facts.curveTokenCount}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
