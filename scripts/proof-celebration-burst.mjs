#!/usr/bin/env node
// BE.W-CELEBRATE-BURST — useCelebrationBurst (proof:celebration-burst).
//
// The born-RED→GREEN device-free SOURCE arm for the library's ONE EARNED-moment
// celebration primitive — a one-shot radial bloom of N warm-cream glass PETALS. The
// BINDING paint is the π readback (tests-visual/celebration-burst.spec.ts — the petal
// frame-series with the warm-cream glass fill, the terminal petals-gone + cascade-settled,
// the PRM single-paint, BOTH modes) + the W-CELEBRATE-BURST roster row; this gate is the
// no-device CI half. A NAMED clause-owner UNDER proof:jubilance. It locks:
//
//   CB1 — EXISTS ONCE + PUBLISHED. useCelebrationBurst.ts exists, exports `burst`, is
//         barrel-exported on /motion ONLY (NOT the root barrel — assert ABSENT from
//         src/index.ts, the SCC-trap), the .glass-celebration-petal recipe exists in
//         jubilance.css imported by index.css, and the api types are published.
//   CB2 — COMPOSES-THE-SUBSTRATE, NO-FORK. The source imports springTimingFunction +
//         springPreset (the SHIPPED kf + SPRING_PRESETS substrate) and owns NO hand-rolled
//         (response, ζ) literal and NO second rAF spring integrator (the useLiquidReveal
//         reuse discipline).
//   CB3 — COMPOSITOR-ONLY. The rAF step writes ONLY transform/opacity/filter — a
//         width/height/top/left/padding/inline-size write in the petal loop REDS (the
//         proof:no-layout-animation reflow set, mirrored). The recipe carries no
//         layout-animating transition.
//   CB4 — WARM-CREAM IDENTITY. The petal background is the color-mix(in oklab,
//         var(--glass-bg-*), var(--glass-tint-source) …) glass seam — a saturated
//         bg-<hue>/raw-Tailwind confetti color OR a disco ✦/sparkle-sweep revival REDS.
//   CB5 — PRM-STATIC. The burst() body has a prefersReducedMotion() branch that spawns
//         zero drifting petals + fires only the terminal cascade (mirrors useLiquidReveal).
//
// House style mirrors proof-completion-seal.mjs: ESM .mjs, comment-strip first (the
// false-witness discipline), a pure exported detector, a byte-stable JSON artefact, a
// human summary, process.exit(1) on any violation. The CB6 self-test bites prove the PURE
// detector flags a layout-animating petal-loop / a saturated petal fill / a sparkle-sweep
// revival / a missing PRM branch / a root-barrel export.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function cliPaths() {
    return {
        ROOT,
        BURST: resolve(ROOT, "src/composables/motion/useCelebrationBurst.ts"),
        MOTION_BARREL: resolve(ROOT, "src/composables/motion/index.ts"),
        ROOT_BARREL: resolve(ROOT, "src/index.ts"),
        API_TYPES: resolve(ROOT, "src/api/types-extra.ts"),
        CSS: resolve(ROOT, "src/styles/jubilance.css"),
        INDEX_CSS: resolve(ROOT, "src/styles/index.css"),
        EVIDENCE: resolve(ROOT, "docs/consumer-evidence/use-celebration-burst.md"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_CELEBRATION_BURST_ARTIFACT",
            "BE-celebration-burst",
        ),
    };
}

// ── comment-strip (the false-witness discipline) ────────────────────────────
function stripBlockComments(t) {
    return t.replace(/\/\*[\s\S]*?\*\//g, " ");
}
function stripLineComments(t) {
    return t
        .split("\n")
        .map((l) => {
            const m = l.match(/(^|[^:])\/\//);
            if (!m) return l;
            return l.slice(0, l.indexOf("//", m.index));
        })
        .join("\n");
}
function stripTs(t) {
    return stripLineComments(stripBlockComments(t));
}
function stripCss(t) {
    return stripBlockComments(t);
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

/**
 * Extract the rAF step body (the per-frame loop) from the (comment-stripped) source so
 * CB3 can scan ONLY the per-frame writes for layout properties. Heuristic: the body of the
 * `step = (ts) => { … }` arrow, brace-matched. Returns "" if absent.
 */
function stepBody(src) {
    const start = src.search(/const\s+step\s*=\s*\([^)]*\)\s*(?::\s*\w+\s*)?=>\s*\{/);
    if (start < 0) return "";
    const open = src.indexOf("{", start);
    if (open < 0) return "";
    let depth = 0;
    for (let i = open; i < src.length; i++) {
        const c = src[i];
        if (c === "{") depth++;
        else if (c === "}") {
            depth--;
            if (depth === 0) return src.slice(open + 1, i);
        }
    }
    return "";
}

/**
 * THE PURE DETECTOR — takes file CONTENTS (so the self-test can plant synthetic inputs)
 * and returns { facts, violations }. No disk read inside (the caller reads).
 */
export function detectCelebrationBurst(inputs) {
    const {
        burst = "",
        motionBarrel = "",
        rootBarrel = "",
        apiTypes = "",
        css = "",
        indexCss = "",
        burstExists = false,
        evidenceExists = false,
        evidence = "",
    } = inputs;

    const violations = [];
    const facts = { cb1: {}, cb2: {}, cb3: {}, cb4: {}, cb5: {} };

    const src = stripTs(burst);
    const cssStripped = stripCss(css);

    // ── CB1 — exists once + published on /motion ONLY (the SCC-trap) ──────────
    const exportsBurst = /export\s+function\s+useCelebrationBurst\b/.test(src);
    const motionBarrelExports = /export \* from ["']\.\/useCelebrationBurst["']/.test(
        stripTs(motionBarrel),
    );
    // The SCC-trap bite: the composable must NOT be on the root barrel (keyframes-bearing).
    const onRootBarrel = /useCelebrationBurst/.test(stripTs(rootBarrel));
    const apiPublishes = /CelebrationBurst(Preset|Options|Return)|UseCelebrationBurst/.test(
        stripTs(apiTypes),
    );
    const recipeExists = /\.glass-celebration-petal/.test(cssStripped);
    const partialImported = /@import\s+["']\.\/jubilance\.css["']/.test(
        stripCss(indexCss),
    );
    facts.cb1 = {
        burstExists,
        exportsBurst,
        motionBarrelExports,
        notOnRootBarrel: !onRootBarrel,
        apiPublishes,
        recipeExists,
        partialImported,
    };
    if (!burstExists)
        violations.push("CB1: composables/motion/useCelebrationBurst.ts does not exist");
    if (!exportsBurst)
        violations.push("CB1: useCelebrationBurst.ts does not export `function useCelebrationBurst`");
    if (!motionBarrelExports)
        violations.push(
            "CB1: composables/motion/index.ts does not export ./useCelebrationBurst (the /motion barrel)",
        );
    if (onRootBarrel)
        violations.push(
            "CB1: useCelebrationBurst is on the ROOT barrel (src/index.ts) — the SCC-trap (keyframes-bearing, /motion ONLY)",
        );
    if (!apiPublishes)
        violations.push(
            "CB1: src/api/types-extra.ts does not publish the CelebrationBurst* types (the discovery layer)",
        );
    if (!recipeExists)
        violations.push("CB1: jubilance.css does not declare .glass-celebration-petal");
    if (!partialImported)
        violations.push("CB1: src/styles/index.css does not @import ./jubilance.css");

    // ── CB2 — composes the kf substrate, no fork ──────────────────────────────
    const importsSpringTiming = /springTimingFunction/.test(src);
    const importsSpringPreset = /springPreset/.test(src);
    // The no-fork bites: NO hand-rolled (response, ζ) literal in the source (a bare
    // `response: 0.5, dampingFraction: …` declaration is the fork — the preset row is the
    // ONLY source), NO second rAF spring integrator (a hand spring step besides the
    // springTimingFunction sample).
    const handRolledSpring =
        /response\s*:\s*[0-9.]+\s*,\s*dampingFraction\s*:\s*[0-9.]+/.test(src);
    facts.cb2 = {
        importsSpringTiming,
        importsSpringPreset,
        noHandRolledSpring: !handRolledSpring,
    };
    if (!importsSpringTiming)
        violations.push(
            "CB2: does not compose springTimingFunction (the SHIPPED kf substrate — no second spring engine)",
        );
    if (!importsSpringPreset)
        violations.push(
            "CB2: does not read springPreset (the SPRING_PRESETS row — no hand (response, ζ))",
        );
    if (handRolledSpring)
        violations.push(
            "CB2: a hand-rolled (response, ζ) literal — the spring MUST read the SPRING_PRESETS row (the no-fork fence)",
        );

    // ── CB3 — compositor-only (the rAF step writes only transform/opacity/filter) ──
    const step = stepBody(src);
    const LAYOUT_RE =
        /\.style\.(?:width|height|top|left|right|bottom|padding|margin|inlineSize|blockSize|inset|gridTemplate)|setProperty\(\s*["'](?:width|height|top|left|right|bottom|padding|margin|inline-size|block-size|inset|grid-template-[a-z]+)["']/;
    const stepWritesLayout = LAYOUT_RE.test(step);
    const stepWritesCompositor =
        /\.style\.transform\b/.test(step) &&
        /\.style\.opacity\b/.test(step) &&
        /\.style\.filter\b/.test(step);
    const recipeLayoutTransition =
        /transition\s*:[^;]*(?:width|height|padding|margin|inline-size|block-size|inset)/.test(
            cssStripped,
        );
    facts.cb3 = {
        stepWritesCompositor,
        noStepLayoutWrite: !stepWritesLayout,
        noRecipeLayoutTransition: !recipeLayoutTransition,
    };
    if (!stepWritesCompositor)
        violations.push(
            "CB3: the rAF step does not write transform + opacity + filter (the three coupled compositor channels)",
        );
    if (stepWritesLayout)
        violations.push(
            "CB3: the rAF step animates a LAYOUT property (width/height/top/left/padding/inset…) — must be transform/opacity/filter ONLY (proof:no-layout-animation)",
        );
    if (recipeLayoutTransition)
        violations.push(
            "CB3: .glass-celebration-petal carries a layout-animating transition (the recipe must be compositor-only)",
        );

    // ── CB4 — warm-cream identity (the glass-seam petal, no confetti/disco) ────
    const petalBlock =
        cssStripped.match(/\.glass-celebration-petal\s*\{[\s\S]*?\n\s*\}/)?.[0] ?? "";
    const usesGlassSeam =
        /color-mix\(\s*in oklab\s*,\s*var\(--glass-bg-/.test(petalBlock) &&
        /var\(--glass-tint-source/.test(petalBlock);
    // The disco/confetti bites: a saturated bg-<hue> / raw-Tailwind / a sparkle-sweep /
    // ✦ glyph revival in the petal recipe OR the composable reds.
    const hasSaturatedFill =
        /background\s*:\s*(?:hsl|rgb)\(/.test(petalBlock) ||
        /bg-(?:emerald|red|blue|green|amber|pink|purple|indigo|cyan|teal)-\d/.test(
            cssStripped,
        );
    const hasDiscoRevival =
        /sparkle-sweep/.test(cssStripped) ||
        /sparkle-sweep/.test(src) ||
        /✦/.test(cssStripped) ||
        /✦/.test(src);
    facts.cb4 = {
        usesGlassSeam,
        noSaturatedFill: !hasSaturatedFill,
        noDiscoRevival: !hasDiscoRevival,
    };
    if (!usesGlassSeam)
        violations.push(
            "CB4: the petal background is NOT the color-mix(in oklab, var(--glass-bg-*), var(--glass-tint-source) …) glass seam (the warm-cream identity)",
        );
    if (hasSaturatedFill)
        violations.push(
            "CB4: a saturated petal fill (a raw hsl/rgb background OR a bg-<hue> confetti color) — the petal must read the surface's own glass",
        );
    if (hasDiscoRevival)
        violations.push(
            "CB4: a disco revival (sparkle-sweep / ✦) — the §6 calm register fence (the petal is calm frosted glass)",
        );

    // ── CB5 — PRM-static (the burst() spawns no drifting petals under reduce) ──
    const hasPrmBranch = /prefersReducedMotion\(\)/.test(src);
    // The PRM branch must fire the cascade + return BEFORE the petal spawn (the snap path).
    const prmFiresCascadeAndReturns =
        /if\s*\([^)]*prefersReducedMotion\(\)[^)]*\)\s*\{[\s\S]*?(?:fireSettleCascade|onSettled)[\s\S]*?return;/.test(
            src,
        );
    facts.cb5 = { hasPrmBranch, prmFiresCascadeAndReturns };
    if (!hasPrmBranch)
        violations.push(
            "CB5: burst() has no prefersReducedMotion() branch (the PRM-static vestibular floor)",
        );
    if (!prmFiresCascadeAndReturns)
        violations.push(
            "CB5: the PRM branch does not fire the terminal cascade + return before the petal spawn (it must confirm terminal-only — no drifting petals under reduce)",
        );

    // ── consumer-evidence (the ≥2-consumer bar) ───────────────────────────────
    const evidenceNamesTwo =
        evidenceExists &&
        (evidence.match(/merge-splash|fission|now-playing|completion|personal-best/gi) ||
            [])
            .length >= 2;
    facts.cb1.evidenceNamesTwo = evidenceNamesTwo;
    if (!evidenceExists)
        violations.push(
            "CB1: docs/consumer-evidence/use-celebration-burst.md is absent (the ≥2-consumer bar)",
        );
    else if (!evidenceNamesTwo)
        violations.push(
            "CB1: use-celebration-burst.md names < 2 sited FLOOR uses (the J-inv-10 bar)",
        );

    return { facts, violations };
}

// ── CB6 self-test: the false-witness bites (each planted defect must RED) ─────
function selfTest() {
    const good = {
        burst: `import { springTimingFunction } from "@mkbabb/keyframes.js";
        import { springPreset } from "./springPresets";
        export function useCelebrationBurst(origin, options = {}) {
            const { response, dampingFraction } = springPreset(options.preset ?? "bouncy");
            const easing = springTimingFunction({ response, dampingFraction });
            function fireSettleCascade(d) {}
            function burst() {
                if (prefersReducedMotion()) { fireSettleCascade(options.destination?.value ?? null); options.onSettled?.(); return; }
                const step = (ts) => {
                    p.style.transform = "translate(0,0)";
                    p.style.opacity = "1";
                    p.style.filter = "blur(0)";
                };
                requestAnimationFrame(step);
            }
            return { burst };
        }`,
        motionBarrel: `export * from "./useCelebrationBurst";`,
        rootBarrel: `export { Button } from "./components/ui/button";`,
        apiTypes: `export type { CelebrationBurstPreset, UseCelebrationBurstOptions, UseCelebrationBurstReturn } from "../composables/motion/useCelebrationBurst";`,
        css: `.glass-celebration-petal {
            background: color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength));
            border-radius: var(--radius-pill);
        }`,
        indexCss: `@import "./jubilance.css";`,
        evidence: `#1 the dock fission merge-splash gold-coalesce. #2 the now-playing pill completion confirm. #3 personal-best.`,
        burstExists: true,
        evidenceExists: true,
    };
    const baseGreen = detectCelebrationBurst(good).violations.length === 0;

    const bites = [];
    // Bite A — a petal-loop writing a layout property reds CB3.
    bites.push({
        name: "layout-animating-petal-loop",
        red:
            detectCelebrationBurst({
                ...good,
                burst: good.burst.replace(
                    'p.style.transform = "translate(0,0)";',
                    'p.style.width = "10px";',
                ),
            }).violations.length > 0,
    });
    // Bite B — a saturated petal fill reds CB4.
    bites.push({
        name: "saturated-petal-fill",
        red:
            detectCelebrationBurst({
                ...good,
                css: good.css.replace(
                    /background:[^;]*;/,
                    "background: hsl(140 80% 50%);",
                ),
            }).violations.length > 0,
    });
    // Bite C — a sparkle-sweep disco revival reds CB4.
    bites.push({
        name: "sparkle-sweep-revival",
        red:
            detectCelebrationBurst({
                ...good,
                css: good.css + "\n.glass-celebration-petal { animation: sparkle-sweep 1s; }",
            }).violations.length > 0,
    });
    // Bite D — a burst missing the PRM branch reds CB5.
    bites.push({
        name: "no-prm-branch",
        red:
            detectCelebrationBurst({
                ...good,
                burst: good.burst.replace(
                    /if \(prefersReducedMotion\(\)\) \{[^}]*\}/,
                    "",
                ),
            }).violations.length > 0,
    });
    // Bite E — the composable barrel-exported from the ROOT barrel reds CB1 (SCC-trap).
    bites.push({
        name: "on-root-barrel",
        red:
            detectCelebrationBurst({
                ...good,
                rootBarrel:
                    good.rootBarrel +
                    `\nexport { useCelebrationBurst } from "./composables/motion/useCelebrationBurst";`,
            }).violations.length > 0,
    });
    // Bite F — a hand-rolled (response, ζ) object literal reds CB2 (the no-fork fence — a
    // fork passes a bespoke { response, dampingFraction } to springTimingFunction instead
    // of reading the SPRING_PRESETS row).
    bites.push({
        name: "hand-rolled-spring",
        red:
            detectCelebrationBurst({
                ...good,
                burst: good.burst.replace(
                    "const easing = springTimingFunction({ response, dampingFraction });",
                    "const easing = springTimingFunction({ response: 0.5, dampingFraction: 0.55 });",
                ),
            }).violations.length > 0,
    });

    return { baseGreen, bites };
}

function readInputs(P) {
    return {
        burst: read(P.BURST),
        motionBarrel: read(P.MOTION_BARREL),
        rootBarrel: read(P.ROOT_BARREL),
        apiTypes: read(P.API_TYPES),
        css: read(P.CSS),
        indexCss: read(P.INDEX_CSS),
        evidence: read(P.EVIDENCE),
        burstExists: existsSync(P.BURST),
        evidenceExists: existsSync(P.EVIDENCE),
    };
}

function run() {
    const P = cliPaths();
    const inputs = readInputs(P);
    const { facts, violations } = detectCelebrationBurst(inputs);

    const st = selfTest();
    const biteFailures = st.bites.filter((b) => !b.red).map((b) => b.name);
    if (!st.baseGreen)
        violations.push(
            "CB6: the self-test GOOD corpus did not green (detector over-strict)",
        );
    if (biteFailures.length > 0)
        violations.push(`CB6: self-test bite(s) did not RED: ${biteFailures.join(", ")}`);
    facts.cb6 = {
        baseGreen: st.baseGreen,
        allBite: biteFailures.length === 0,
        bites: st.bites,
    };

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        gate: "proof:celebration-burst",
        stamp: snapshotStamp(),
        status,
        facts,
        violations,
    });

    const yn = (b) => (b ? "✓" : "✗");
    console.log(
        "proof:celebration-burst — the one-shot earned glass-petal radial bloom (BE.W-CELEBRATE-BURST)",
    );
    console.log(
        `  CB1 exists + /motion-only + published: ${yn(
            facts.cb1.burstExists &&
                facts.cb1.exportsBurst &&
                facts.cb1.motionBarrelExports &&
                facts.cb1.notOnRootBarrel &&
                facts.cb1.apiPublishes &&
                facts.cb1.recipeExists &&
                facts.cb1.partialImported &&
                facts.cb1.evidenceNamesTwo,
        )}`,
    );
    console.log(
        `  CB2 composes kf substrate, no fork   : ${yn(
            facts.cb2.importsSpringTiming &&
                facts.cb2.importsSpringPreset &&
                facts.cb2.noHandRolledSpring,
        )}`,
    );
    console.log(
        `  CB3 compositor-only (no layout)      : ${yn(
            facts.cb3.stepWritesCompositor &&
                facts.cb3.noStepLayoutWrite &&
                facts.cb3.noRecipeLayoutTransition,
        )}`,
    );
    console.log(
        `  CB4 warm-cream identity, no disco    : ${yn(
            facts.cb4.usesGlassSeam &&
                facts.cb4.noSaturatedFill &&
                facts.cb4.noDiscoRevival,
        )}`,
    );
    console.log(
        `  CB5 PRM-static (terminal-only)       : ${yn(
            facts.cb5.hasPrmBranch && facts.cb5.prmFiresCascadeAndReturns,
        )}`,
    );
    console.log(
        `  CB6 self-test bites RED              : ${yn(
            facts.cb6.allBite && facts.cb6.baseGreen,
        )}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            P.ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
