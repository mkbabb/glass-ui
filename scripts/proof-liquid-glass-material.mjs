#!/usr/bin/env node
// AX.W52 D19 — proof:liquid-glass-material, the liquid-glass material-CORE gate
// (the bloom-kill + edge-strengthening arm).
//
// The D19 defect: the moving-specular `.glass-material::before` painted a LARGE
// centred warm-cream disc (`circle at X Y, … transparent 55%`, masked to 75%) with
// `mix-blend-mode: screen` — a whole-surface wash that lifted small tiles toward
// white on hover (the "muddy, not glassy" speedtest card). W52 DELETES the disc →
// a BOUNDED `circle var(--glass-specular-size,36%)` plus-lighter edge gleam, REDUCES
// the intensity cohort, TAMES the floating/overlay saturate, and re-tunes the
// fixed-anchor curvature overlay onto warm-cream with a softened dark arm.
//
// This is a device-free SOURCE + token-resolution arm (the PAINTED render is proven
// by the W00 π live audit, NEVER a text gate alone — the cardinal AX lesson: W09
// shipped headless-green over a still-blooming live surface). The SAFARI `-webkit-
// backdrop-filter` clause reads the BUILT `dist/glass-ui.css` (the autoprefixer emit)
// — the single most important Safari check; absent it, every Safari glass surface
// paints flat.
//
// Bite-checks (the born-RED witnesses this gate inverts):
//   • re-introduce the unbounded `circle at X Y, … transparent 55%` on the ::before
//     background → RED (no `circle var(--glass-specular-size`).
//   • re-introduce `mix-blend-mode: screen` on the ::before → RED.
//   • drop the `--glass-specular-size` mint → RED.
//   • bump the cohort hover above 0.10 / active above 0.16 (dark 0.08/0.12) → RED.
//   • bump the floating/overlay saturate above 1.2 → RED.
//   • re-pure-white the curvature overlay or re-byte-identical the dark arm → RED.
//   • drive the intensity through a per-stop hsl() alpha (the Chromium trap) → RED.
//   • strip `-webkit-backdrop-filter` from dist → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — the central stylesheets are thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

/** Strip line + block comments so a clause cannot be satisfied by a comment. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/**
 * Extract the body of the FIRST rule whose selector list contains `anchorSelector`
 * and whose body carries `bodyNeedle`. Returns the raw body text (between braces).
 */
function ruleBodyContaining(src, anchorSelector, bodyNeedle) {
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = ruleRe.exec(src))) {
        if (m[1].includes(anchorSelector) && m[2].includes(bodyNeedle)) {
            return m[2];
        }
    }
    return null;
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        GLASS: resolve(ROOT, "src/styles/glass.css"),
        TOKENS: resolve(ROOT, "src/styles/tokens.css"),
        DOCK_CONTROLS: resolve(ROOT, "src/styles/dock-controls.css"),
        CARD: resolve(ROOT, "src/components/ui/card/Card.vue"),
        // The Safari `-webkit-backdrop-filter` autoprefix ships in the per-file
        // `/styles` cascade (`dist/styles/glass.css` — the load-bearing glass-surface
        // file a consumer @imports) AND the folded SFC bundle (`dist/glass-ui.css`).
        // The gate accepts either (the prefix present in EITHER built artefact).
        DIST_GLASS: resolve(ROOT, "dist/styles/glass.css"),
        DIST: resolve(ROOT, "dist/glass-ui.css"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_LIQUID_GLASS_MATERIAL_ARTIFACT",
            "AX-liquid-glass-material",
        ),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, GLASS, TOKENS, DOCK_CONTROLS, CARD, DIST_GLASS, DIST, ARTIFACT } =
        cliPaths();
    const violations = [];
    const facts = {};

    // ── 1. The moving-specular ::before is a BOUNDED gleam, not a full-plate disc.
    if (!existsSync(GLASS)) {
        violations.push("glass.css is absent");
    } else {
        const css = stripComments(readMonolith(ROOT, "glass"));
        // The ::before body carrying the masked-radial moving-specular recipe.
        const body = ruleBodyContaining(
            css,
            ".glass-material::before",
            "mix-blend-mode",
        );
        facts.specularBodyFound = Boolean(body);
        if (!body) {
            violations.push(
                "no `.glass-material::before` rule carrying a `mix-blend-mode` specular body — the moving-specular source is absent",
            );
        } else {
            // BOUNDED: the background gleam declares an EXPLICIT radius bound by
            // `--glass-specular-size` (a `circle <size> at …`), NOT the implicit
            // full-plate `circle at …`.
            facts.gleamBounded = /circle\s+var\(\s*--glass-specular-size/.test(body);
            if (!facts.gleamBounded) {
                violations.push(
                    "the `.glass-material::before` gleam is not bounded by `circle var(--glass-specular-size,…)` — it is the unbounded full-plate disc (AX.W52)",
                );
            }
            // The mask is ALSO bound to the gleam size (two radials: background +
            // mask both read --glass-specular-size).
            const sizeReads = (
                body.match(/circle\s+var\(\s*--glass-specular-size/g) || []
            ).length;
            facts.gleamSizeReadCount = sizeReads;
            if (sizeReads < 2) {
                violations.push(
                    `the gleam reads --glass-specular-size in ${sizeReads} place(s); both the background AND the mask must be bounded (AX.W52)`,
                );
            }
            // The legacy unbounded `circle at …, … transparent 55%` is GONE.
            facts.unboundedDiscPresent = /circle\s+at\s+var\(--specular-x/.test(body);
            if (facts.unboundedDiscPresent) {
                violations.push(
                    "the legacy unbounded `circle at var(--specular-x …)` disc is still present on the ::before background — the central wash is not deleted (AX.W52)",
                );
            }
            // The blend is `plus-lighter`, NOT `screen`.
            facts.blendPlusLighter = /mix-blend-mode:\s*plus-lighter/.test(body);
            facts.blendScreenPresent = /mix-blend-mode:\s*screen/.test(body);
            if (!facts.blendPlusLighter || facts.blendScreenPresent) {
                violations.push(
                    "the `.glass-material::before` blend is not `plus-lighter` (or `screen` survives) — `screen` over-whites the whole tile (AX.W52)",
                );
            }
            // The intensity drives layer `opacity`, NOT a per-stop hsl() alpha (the
            // Chromium `@property`-var-in-hsl-alpha=0 trap). Assert the body carries
            // `opacity: var(--specular-intensity…` and NOT a `--specular-intensity`
            // nested inside an hsl() alpha stop.
            facts.intensityDrivesOpacity =
                /opacity:\s*var\(\s*--specular-intensity/.test(body);
            facts.intensityInHslAlpha =
                /hsl\([^)]*var\(\s*--specular-intensity[^)]*\)/.test(body);
            if (!facts.intensityDrivesOpacity || facts.intensityInHslAlpha) {
                violations.push(
                    "the specular intensity does not drive layer `opacity` (or nests a var() in an hsl() alpha) — the Chromium `@property`-in-hsl-alpha=0 trap (AX.W52)",
                );
            }
        }
    }

    // ── 2. tokens.css — the size mint, the reduced cohort, the tamed saturate, the
    // warm-cream curvature + softened dark arm.
    if (!existsSync(TOKENS)) {
        violations.push("tokens.css is absent");
    } else {
        const tok = stripComments(readMonolith(ROOT, "tokens"));

        // 2a. `--glass-specular-size` minted.
        facts.specularSizeMinted = /--glass-specular-size\s*:/.test(tok);
        if (!facts.specularSizeMinted) {
            violations.push(
                "--glass-specular-size is not minted in tokens.css — the gleam-geometry bound knob is absent (AX.W52)",
            );
        }

        // 2b. The intensity cohort at/below the W52 ceiling (light hover ≤ 0.10 /
        // active ≤ 0.16; dark hover ≤ 0.08 / active ≤ 0.12; rest 0).
        const num = (re) => {
            const m = tok.match(re);
            return m ? Number(m[1]) : NaN;
        };
        // The `:root` block that actually carries the specular cohort (there are
        // many `:root` blocks in tokens.css; a naive first-match misses it).
        const rootBlock =
            (tok.match(/:root\s*\{[^}]*\}/g) || []).find((b) =>
                /--glass-specular-intensity-rest/.test(b),
            ) ?? "";
        const darkBlock =
            tok.match(
                /\.dark\s*\{[^}]*--glass-specular-intensity-hover[^}]*\}/,
            )?.[0] ?? "";
        const fromBlock = (block, re) => {
            const m = block.match(re);
            return m ? Number(m[1]) : NaN;
        };
        const hoverV = fromBlock(
            rootBlock,
            /--glass-specular-intensity-hover\s*:\s*([\d.]+)/,
        );
        const activeV = fromBlock(
            rootBlock,
            /--glass-specular-intensity-active\s*:\s*([\d.]+)/,
        );
        const darkHoverV = (() => {
            const m = darkBlock.match(
                /--glass-specular-intensity-hover\s*:\s*([\d.]+)/,
            );
            return m ? Number(m[1]) : NaN;
        })();
        const darkActiveV = (() => {
            const m = darkBlock.match(
                /--glass-specular-intensity-active\s*:\s*([\d.]+)/,
            );
            return m ? Number(m[1]) : NaN;
        })();
        facts.cohortHover = hoverV;
        facts.cohortActive = activeV;
        facts.cohortDarkHover = darkHoverV;
        facts.cohortDarkActive = darkActiveV;
        if (!(hoverV <= 0.1)) {
            violations.push(
                `the light hover rung ${hoverV} exceeds the W52 ceiling 0.10 — the gleam still blooms on hover (AX.W52)`,
            );
        }
        if (!(activeV <= 0.16)) {
            violations.push(
                `the light active rung ${activeV} exceeds the W52 ceiling 0.16 (AX.W52)`,
            );
        }
        if (!(darkHoverV <= 0.08)) {
            violations.push(
                `the dark hover rung ${darkHoverV} exceeds the W52 ceiling 0.08 (AX.W52)`,
            );
        }
        if (!(darkActiveV <= 0.12)) {
            violations.push(
                `the dark active rung ${darkActiveV} exceeds the W52 ceiling 0.12 (AX.W52)`,
            );
        }
        // rest stays 0 (the clean static plate).
        const restM = rootBlock.match(
            /--glass-specular-intensity-rest\s*:\s*([\d.]+)/,
        );
        facts.cohortRest = restM ? Number(restM[1]) : NaN;
        if (!(facts.cohortRest === 0)) {
            violations.push(
                `the rest rung ${facts.cohortRest} is not 0 — the static plate is not clean (AX.W52)`,
            );
        }

        // 2c. The floating/overlay saturate ≤ 1.2 (the tamed backdrop juice).
        //   BC.W-GLASS-LEGIBILITY-MEASURED (the speedtest-AX BC-W10 fold) — the per-rung
        //   saturate is now READ THROUGH the named --glass-saturate-{tier} knob; resolve
        //   BOTH a literal `saturate(N)` AND the `saturate(var(--glass-saturate-{tier}))`
        //   substitution (the token default IS the tamed value the AX.W52 bound asserts).
        const satOf = (tier) => {
            const composed = (tok.match(new RegExp(`--glass-blur-${tier}:[^;]*`)) || [""])[0];
            const lit = composed.match(/saturate\(\s*([\d.]+)\s*\)/);
            if (lit) return Number(lit[1]);
            const named = composed.match(/saturate\(\s*var\(\s*--glass-saturate-(\w+)\s*\)\s*\)/);
            if (named) {
                const m = tok.match(new RegExp(`--glass-saturate-${named[1]}:\\s*([\\d.]+)`));
                return m ? Number(m[1]) : NaN;
            }
            return NaN;
        };
        const floatSat = satOf("floating");
        const overlaySat = satOf("overlay");
        facts.floatingSaturate = floatSat;
        facts.overlaySaturate = overlaySat;
        if (!(floatSat <= 1.2)) {
            violations.push(
                `--glass-blur-floating saturate ${floatSat} exceeds 1.2 — the backdrop is over-juiced (AX.W52)`,
            );
        }
        if (!(overlaySat <= 1.2)) {
            violations.push(
                `--glass-blur-overlay saturate ${overlaySat} exceeds 1.2 — the backdrop is over-juiced (AX.W52)`,
            );
        }

        // 2d. The curvature overlay is WARM-CREAM (not pure-white) + routed through
        // the `--glass-curvature-intensity` knob, and the dark arm is SOFTER (a
        // lower intensity), not byte-identical.
        facts.curvatureIntensityMinted =
            /--glass-curvature-intensity\s*:/.test(tok);
        const curvatureDecl =
            tok.match(/--glass-curvature-overlay\s*:\s*radial-gradient\([^;]*\);/)?.[0] ??
            "";
        facts.curvaturePureWhite = /hsl\(\s*0\s+0%\s+100%/.test(curvatureDecl);
        facts.curvatureWarmCream =
            /hsl\(\s*40\s+\d+%\s+9[0-9]%/.test(curvatureDecl) &&
            /var\(\s*--glass-curvature-intensity/.test(curvatureDecl);
        if (!facts.curvatureIntensityMinted) {
            violations.push(
                "--glass-curvature-intensity is not minted — the curvature strength is not on the single overridable axis (AX.W52)",
            );
        }
        if (facts.curvaturePureWhite || !facts.curvatureWarmCream) {
            violations.push(
                "the `--glass-curvature-overlay` is pure-white or not warm-cream-on-intensity-token — the fixed-anchor wash is not re-tuned (AX.W52)",
            );
        }
        // The `.dark` arm re-tunes `--glass-curvature-intensity` to a LOWER value
        // than the `:root` default (genuinely softer, not byte-identical). The
        // curvature intensity lives in the §8-glassmorphism `:root` block, distinct
        // from the specular-cohort `:root` block above.
        const curvRootBlock =
            (tok.match(/:root\s*\{[^}]*\}/g) || []).find((b) =>
                /--glass-curvature-intensity/.test(b),
            ) ?? "";
        const rootCurvM = curvRootBlock.match(
            /--glass-curvature-intensity\s*:\s*([\d.]+)/,
        );
        const darkCurvBlock =
            tok.match(
                /\.dark\s*\{[^}]*--glass-curvature-intensity[^}]*\}/,
            )?.[0] ?? "";
        const darkCurvM = darkCurvBlock.match(
            /--glass-curvature-intensity\s*:\s*([\d.]+)/,
        );
        const rootCurv = rootCurvM ? Number(rootCurvM[1]) : NaN;
        const darkCurv = darkCurvM ? Number(darkCurvM[1]) : NaN;
        facts.curvatureRootIntensity = rootCurv;
        facts.curvatureDarkIntensity = darkCurv;
        if (!(darkCurv < rootCurv)) {
            violations.push(
                `the curvature dark arm (${darkCurv}) is not softer than the light arm (${rootCurv}) — the unsoftened-dark defect survives (AX.W52)`,
            );
        }
        // The byte-identical pure-white dark re-declaration is GONE.
        facts.curvatureDarkPureWhiteRedecl =
            /\.dark[\s\S]*?--glass-curvature-overlay\s*:\s*radial-gradient\([^;]*hsl\(\s*0\s+0%\s+100%/.test(
                tok,
            );
        if (facts.curvatureDarkPureWhiteRedecl) {
            violations.push(
                "the `.dark` arm still re-declares a pure-white `--glass-curvature-overlay` — the byte-identical dark defect is not retired (AX.W52)",
            );
        }
    }

    // ── 3. The dock corner radials demoted off the hard corner.
    // AZ.W-CARVE — dock-controls.css drained into dock-controls/*.css partials;
    // readMonolith concatenates root + the five family partials so the
    // hard-corner-radial deletion-proof covers the carved content (the primary
    // tier hover radial lives in dock-controls/tab-button.css).
    if (existsSync(DOCK_CONTROLS)) {
        const dock = stripComments(readMonolith(ROOT, "dock-controls"));
        // The `ellipse at 30% 30%` hard top-left corner radials (the dock primary
        // hover + the rest phase-halo) are GONE.
        facts.dockHardCornerRadialPresent = /ellipse\s+at\s+30%\s+30%/.test(dock);
        if (facts.dockHardCornerRadialPresent) {
            violations.push(
                "the dock primary `ellipse at 30% 30%` hard-corner phase radial survives — the corner bloom is not demoted (AX.W52)",
            );
        }
        // The 18% phase-color mix is toned down (no `--phase-color … 18%` corner
        // radial remains on the dock primary tier).
        facts.dockEighteenPercentMix =
            /var\(--phase-color[^)]*\)\s*18%/.test(dock);
        if (facts.dockEighteenPercentMix) {
            violations.push(
                "the dock primary phase radial still mixes --phase-color at 18% — the corner glow is not toned down (AX.W52)",
            );
        }
    }

    // ── 4. The Card `specular="full"` rung re-derived DOWN (hover ≤ 0.18, active
    // ≤ 0.26, rest ≤ 0.04) — even the brightest opt-in is a gleam not a screen.
    if (existsSync(CARD)) {
        const card = readFileSync(CARD, "utf8");
        const fullHover = card.match(
            /--glass-specular-intensity-hover["']\s*:\s*["']([\d.]+)["']/,
        );
        const fullActive = card.match(
            /--glass-specular-intensity-active["']\s*:\s*["']([\d.]+)["']/,
        );
        const fhV = fullHover ? Number(fullHover[1]) : NaN;
        const faV = fullActive ? Number(fullActive[1]) : NaN;
        facts.cardFullHover = fhV;
        facts.cardFullActive = faV;
        if (!(fhV <= 0.18)) {
            violations.push(
                `the Card specular="full" hover override ${fhV} exceeds 0.18 — the brightest opt-in is still a screen (AX.W52)`,
            );
        }
        if (!(faV <= 0.26)) {
            violations.push(
                `the Card specular="full" active override ${faV} exceeds 0.26 (AX.W52)`,
            );
        }
    }

    // ── 5. Safari — `-webkit-backdrop-filter` ships in the BUILT dist (the
    // autoprefixer emit; absent it every Safari glass surface paints flat). Read the
    // built dist; if it is absent (a clean tree pre-build) record an EXPLICIT
    // device-absent SKIP for THIS clause only — the source arm above still bites on
    // every runner.
    const distFiles = [DIST_GLASS, DIST].filter((p) => existsSync(p));
    if (distFiles.length === 0) {
        facts.distPresent = false;
        facts.webkitBackdropFilterInDist = "skipped-dist-absent";
    } else {
        facts.distPresent = true;
        facts.webkitBackdropFilterInDist = distFiles.some((p) =>
            /-webkit-backdrop-filter/.test(readFileSync(p, "utf8")),
        );
        if (!facts.webkitBackdropFilterInDist) {
            violations.push(
                "neither dist/styles/glass.css nor dist/glass-ui.css carries `-webkit-backdrop-filter` — every Safari glass surface paints flat (the browserslist target dropped Safari) (AX.W52)",
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:liquid-glass-material",
        facts,
        violations,
    });

    console.log(
        "proof:liquid-glass-material — the central screen-disc DELETED → a bounded plus-lighter edge gleam; the cohort + saturate + fixed-anchor radials tamed (AX.W52 D19)",
    );
    console.log(
        `  bounded gleam       : circle var(--glass-specular-size)=${facts.gleamBounded ? "✓" : "✗"} (reads=${facts.gleamSizeReadCount ?? "?"})  legacy-disc=${facts.unboundedDiscPresent ? "PRESENT ✗" : "gone ✓"}`,
    );
    console.log(
        `  blend               : plus-lighter=${facts.blendPlusLighter ? "✓" : "✗"}  screen=${facts.blendScreenPresent ? "PRESENT ✗" : "gone ✓"}  intensity→opacity=${facts.intensityDrivesOpacity ? "✓" : "✗"}  hsl-alpha-trap=${facts.intensityInHslAlpha ? "PRESENT ✗" : "clear ✓"}`,
    );
    console.log(
        `  cohort              : hover=${facts.cohortHover ?? "?"} active=${facts.cohortActive ?? "?"} (dark ${facts.cohortDarkHover ?? "?"}/${facts.cohortDarkActive ?? "?"}; rest=${facts.cohortRest ?? "?"})  size-minted=${facts.specularSizeMinted ? "✓" : "✗"}`,
    );
    console.log(
        `  saturate            : floating=${facts.floatingSaturate ?? "?"} overlay=${facts.overlaySaturate ?? "?"} (≤1.2)`,
    );
    console.log(
        `  curvature           : warm-cream=${facts.curvatureWarmCream ? "✓" : "✗"} pure-white=${facts.curvaturePureWhite ? "PRESENT ✗" : "gone ✓"}  intensity light=${facts.curvatureRootIntensity ?? "?"}→dark=${facts.curvatureDarkIntensity ?? "?"} (softer)`,
    );
    console.log(
        `  dock corner radials : hard-30%30%=${facts.dockHardCornerRadialPresent ? "PRESENT ✗" : "gone ✓"}  18%-mix=${facts.dockEighteenPercentMix ? "PRESENT ✗" : "gone ✓"}`,
    );
    console.log(
        `  Card full re-derive : hover=${facts.cardFullHover ?? "?"} active=${facts.cardFullActive ?? "?"} (≤0.18/0.26)`,
    );
    console.log(
        `  Safari prefix       : -webkit-backdrop-filter in dist=${facts.webkitBackdropFilterInDist}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
