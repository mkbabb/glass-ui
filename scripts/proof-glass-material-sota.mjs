#!/usr/bin/env node
// AW.W23 — the gated Baseline-2025 glass SOTA folds gate (proof:glass-material-sota).
//
// Four UNUSED Baseline-2025 capabilities ship as out-of-box library assets,
// each `@supports`/token-gated over a working fallback:
//   1. the #glass-refract convex-lens SVG filter (shipped asset), gated
//      @supports(backdrop-filter:url()), re-homed off the W22-folded compound;
//   2. corner-shape:squircle PE, gated @supports(corner-shape:squircle), with a
//      border-radius round fallback;
//   3. the chromatic edge-dispersion fringe, gated on
//      prefers-reduced-transparency:no-preference + warm-biased;
//   4. the --glass-tint-source adaptive tint, color-mix(in oklab) ≤30%,
//      defaulting to warm-white zero delta (NO oklch(from …) lightness-shift).
//
// Born RED on HEAD — none of the four assets existed.
//
// bite-check: un-gate any fold (move a corner-shape decl outside @supports,
// drop the #glass-refract node, set the default tint strength non-zero) → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — the central stylesheets are thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/**
 * Extract the brace-balanced body of the FIRST at-rule whose header matches
 * `headerRe` (the regex must include the opening `{`). Returns the inner text,
 * or null if no match.
 */
function balancedBlock(src, headerRe) {
    const m = src.match(headerRe);
    if (!m) return null;
    let i = m.index + m[0].length;
    let depth = 1;
    const start = i;
    for (; i < src.length && depth > 0; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") depth--;
    }
    return src.slice(start, i - 1);
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        REFRACT: resolve(ROOT, "src/styles/glass-refract.css"),
        GLASS: resolve(ROOT, "src/styles/glass.css"),
        SPECULAR: resolve(ROOT, "src/styles/glass-specular-track.css"),
        TOKENS: resolve(ROOT, "src/styles/tokens.css"),
        INDEX: resolve(ROOT, "src/styles/index.css"),
        STORY: resolve(ROOT, "demo/stories/substrates/glass-material.vue"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_GLASS_MATERIAL_SOTA_ARTIFACT",
            "AW-glass-material-sota",
        ),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, REFRACT, GLASS, SPECULAR, TOKENS, INDEX, STORY, ARTIFACT } =
        cliPaths();
    const violations = [];
    const facts = {};

    // ── 1. Refraction asset ships out-of-box AND the consuming selector
    // resolves off the W22-folded compound.
    if (!existsSync(REFRACT)) {
        violations.push("glass-refract.css is absent — the #glass-refract asset does not ship");
    } else {
        const refractRaw = readFileSync(REFRACT, "utf8");
        const refract = stripComments(refractRaw);

        // (a) the filter node ships — feImage → feDisplacementMap → feImage +
        // feBlend mode=screen (URL-encoded inside the data-URI, so check the
        // encoded primitive names). The filter ID `#glass-refract` is KEPT
        // (BB.W-LENSING renamed only the OPT-IN CLASS to `.glass-lens` — the
        // refraction-axis token + the filter-graph id names stay). The data-URI
        // single-quotes encode as `%27`, so `mode=%27screen` is the SHIPPED form
        // (the literal `mode='screen` alternation was the stale-encoding drift).
        const hasFilterNode =
            /id=['"]?glass-refract|id='glass-refract|id%3D%2522glass-refract|id%3D'glass-refract|id=%27glass-refract/.test(
                refractRaw,
            ) &&
            /feImage/.test(refractRaw) &&
            /feDisplacementMap/.test(refractRaw) &&
            /feBlend[^>]*mode=['"]?screen|mode%3D%2522screen|mode='screen|mode=%27screen/.test(
                refractRaw,
            );
        facts.refractFilterNodeShips = hasFilterNode;
        if (!hasFilterNode) {
            violations.push(
                "the #glass-refract filter graph (feImage → feDisplacementMap → feBlend mode=screen) does not ship in glass-refract.css",
            );
        }

        // (b) the consuming selector is re-homed onto .glass-material.glass-lens
        // (or standalone .glass-lens), with NO surviving compound on the
        // folded .glass-specular-track class. BB.W-LENSING RENAMED the opt-in
        // class `.glass-refract` → `.glass-lens` (clean break, no alias — the
        // filter-id `#glass-refract` + the `--glass-refract` magnitude axis name
        // are KEPT). The re-home asserts the renamed `.glass-lens` class; the
        // clean-break bite asserts the OLD `.glass-refract` CLASS selector is GONE
        // (a `.glass-refract` rule re-introducing the retired class reds —
        // distinct from the kept filter-id `#glass-refract` / token `--glass-refract`,
        // which the `.` / `-` boundary excludes).
        const reHomed =
            /\.glass-material\.glass-lens|\.glass-lens\b/.test(refract);
        const staleCompound = /\.glass-specular-track\.glass-(refract|lens)/.test(refract);
        // The retired opt-in CLASS selector — a class token, NOT the kept
        // `#glass-refract` filter id nor the `--glass-refract` token (the regex
        // requires a `.` immediately before `glass-refract` + a word boundary
        // after, which `#`/`--`/`/` references never satisfy).
        const staleClass = /\.glass-refract\b/.test(refract);
        facts.refractReHomed = reHomed;
        facts.refractStaleCompound = staleCompound;
        facts.refractStaleClass = staleClass;
        if (!reHomed) {
            violations.push(
                "the refraction backdrop-filter is not bound to a re-homed selector (.glass-material.glass-lens or standalone .glass-lens — BB.W-LENSING rename)",
            );
        }
        if (staleClass) {
            violations.push(
                "the retired `.glass-refract` opt-in CLASS selector survives — BB.W-LENSING renamed it to `.glass-lens` (clean break, no alias)",
            );
        }
        if (staleCompound) {
            violations.push(
                "a refraction rule still keys on the W22-folded compound .glass-specular-track.glass-{refract,lens} — decouple it",
            );
        }

        // ── 2. Refraction stays gated; blur stays substrate. The url(#glass-refract)
        // / data-URI backdrop-filter decl sits ONLY inside @supports(backdrop-filter:url()).
        const supportsArm = refract.match(
            /@supports\s*\(backdrop-filter:\s*url\([^)]*\)\)\s*\{([\s\S]*?)\n\}/,
        );
        const backdropDeclInGate =
            supportsArm && /backdrop-filter:[^;]*glass-refract/.test(supportsArm[1]);
        // Any refraction backdrop-filter decl OUTSIDE the @supports arm is a leak.
        const gatedBody = supportsArm ? supportsArm[1] : "";
        const allRefractDecls = (
            refract.match(/backdrop-filter:[^;]*glass-refract/g) || []
        ).length;
        const gatedRefractDecls = (
            gatedBody.match(/backdrop-filter:[^;]*glass-refract/g) || []
        ).length;
        facts.refractGated = Boolean(backdropDeclInGate);
        facts.refractLeak = allRefractDecls > gatedRefractDecls;
        if (!backdropDeclInGate) {
            violations.push(
                "the refraction backdrop-filter decl is not inside @supports(backdrop-filter:url()) — refraction must stay gated",
            );
        }
        if (allRefractDecls > gatedRefractDecls) {
            violations.push(
                "a refraction backdrop-filter decl leaks OUTSIDE the @supports gate — blur must stay the un-gated substrate",
            );
        }
    }

    // glass-specular-track.css must NOT carry the stale compound either (under
    // either the retired `.glass-refract` or the renamed `.glass-lens` class).
    if (existsSync(SPECULAR)) {
        const spec = stripComments(readFileSync(SPECULAR, "utf8"));
        if (/\.glass-specular-track\.glass-(refract|lens)/.test(spec)) {
            violations.push(
                "glass-specular-track.css still binds the stale .glass-specular-track.glass-{refract,lens} compound",
            );
        }
    }

    // glass-refract.css must be in the cascade.
    if (existsSync(INDEX)) {
        const idx = readFileSync(INDEX, "utf8");
        facts.refractInCascade = /@import\s+["']\.\/glass-refract\.css["']/.test(idx);
        if (!facts.refractInCascade) {
            violations.push(
                "glass-refract.css is not imported in the index.css cascade",
            );
        }
    }

    // ── 3. Squircle PE gated with a round fallback.
    if (existsSync(GLASS)) {
        const css = stripComments(readMonolith(ROOT, "glass"));
        // AX.W56 ships the SPEC keyword form: the @supports condition tests the
        // LITERAL superellipse(2) (a var() is not evaluable in @supports), and the
        // gated decls read the tokenized var(--corner-shape-<surface>) axis. The
        // deprecated corner-shape:squircle keyword is gone — a clean break.
        const squircleBody = balancedBlock(
            css,
            /@supports\s*\(corner-shape:\s*superellipse\(\d+\)\)\s*\{/,
        );
        // Count DECLARATIONS only (trailing `;`) so the `@supports` HEADER token
        // is not miscounted as a leaked declaration.
        const allCornerShape = (css.match(/corner-shape:\s*(?:var\(--corner-shape-[\w-]+\)|superellipse\([^)]*\))\s*;/g) || []).length;
        const gatedCornerShape = squircleBody
            ? (squircleBody.match(/corner-shape:\s*(?:var\(--corner-shape-[\w-]+\)|superellipse\([^)]*\))\s*;/g) || []).length
            : 0;
        facts.squircleGated = Boolean(squircleBody) && gatedCornerShape > 0;
        facts.squircleLeak = allCornerShape > gatedCornerShape;
        if (!facts.squircleGated) {
            violations.push(
                "no @supports(corner-shape:superellipse(k)) block carrying a corner-shape decl — the squircle PE is absent",
            );
        }
        if (facts.squircleLeak) {
            violations.push(
                "a corner-shape decl sits OUTSIDE the @supports(corner-shape:superellipse) block — the round border-radius fallback would break on a partial-support engine",
            );
        }

        // ── 4. Chromatic fringe gated on transparency preference + composes over
        // the W22 rim (does not replace it).
        const fringeArm = css.match(
            /@media\s*\(prefers-reduced-transparency:\s*no-preference\)\s*\{([\s\S]*?glass-edge-dispersion[\s\S]*?)\n\s*\}/,
        );
        facts.fringeGatedNoPreference = Boolean(fringeArm);
        facts.fringeComposesRim =
            fringeArm && /var\(--glass-material-rim\)/.test(fringeArm[1]);
        if (!fringeArm) {
            violations.push(
                "the chromatic fringe (--glass-edge-dispersion) is not gated under prefers-reduced-transparency:no-preference",
            );
        } else if (!facts.fringeComposesRim) {
            violations.push(
                "the chromatic fringe does not compose OVER the W22 rim (var(--glass-material-rim)) — it must add to, not replace it",
            );
        }
    }

    // ── 5. Adaptive tint defaults to zero delta + no oklch lightness-shift.
    if (existsSync(TOKENS)) {
        const tok = stripComments(readMonolith(ROOT, "tokens"));
        facts.tintSourceDefined = /--glass-tint-source:/.test(tok);
        // The default strength must be 0% (zero delta) at the root.
        const strengthMatch = tok.match(/--glass-tint-strength:\s*([^;]+);/);
        facts.tintStrengthDefault = strengthMatch ? strengthMatch[1].trim() : null;
        const zeroDelta = facts.tintStrengthDefault === "0%";
        if (!facts.tintSourceDefined) {
            violations.push("--glass-tint-source is not defined in tokens.css");
        }
        if (!zeroDelta) {
            violations.push(
                `--glass-tint-strength defaults to '${facts.tintStrengthDefault}' (must be 0% for zero-delta default)`,
            );
        }
        // The fringe tokens exist.
        facts.fringeTokensDefined =
            /--glass-fringe-warm:/.test(tok) && /--glass-fringe-cool:/.test(tok);
        if (!facts.fringeTokensDefined) {
            violations.push("the --glass-fringe-warm/--glass-fringe-cool tokens are absent");
        }
        // The warm fringe is warm-biased (hue in the warm band, not iOS-blue ~230
        // — the warm channel hue must be < 120).
        // oklch(L C H / A) — capture the 3rd component (the hue).
        const warmMatch = tok.match(
            /--glass-fringe-warm:\s*oklch\(\s*[\d.]+\s+[\d.]+\s+([\d.]+)/,
        );
        facts.fringeWarmHue = warmMatch ? Number(warmMatch[1]) : null;
        if (facts.fringeWarmHue != null && facts.fringeWarmHue > 120) {
            violations.push(
                `the warm fringe hue is ${facts.fringeWarmHue} (must be warm-biased, <120; not iOS-blue)`,
            );
        }
    }

    // The oklab-tint recipe is used in glass.css; NO oklch(from … l …) lightness-shift.
    if (existsSync(GLASS)) {
        const css = stripComments(readMonolith(ROOT, "glass"));
        facts.usesOklabTint = /color-mix\(in oklab,[\s\S]*?--glass-tint-source/.test(css);
        const lightnessShift = /oklch\(\s*from[^)]*\sl\s/.test(css);
        facts.oklchLightnessShift = lightnessShift;
        if (!facts.usesOklabTint) {
            violations.push(
                "the glass rungs do not compose the color-mix(in oklab, …, var(--glass-tint-source) …) adaptive-tint recipe",
            );
        }
        if (lightnessShift) {
            violations.push(
                "an oklch(from … l …) lightness-shift is used for tint — the mwg gamut-map caveat forbids it (use color-mix in oklab)",
            );
        }
    }

    // ── 6. Demo exercises the four folds.
    if (!existsSync(STORY)) {
        violations.push("the glass-material story is absent");
    } else {
        const story = readFileSync(STORY, "utf8");
        const exercises = {
            // BB.W-LENSING — the story composes the renamed `.glass-lens` opt-in
            // class (the `#glass-refract` filter id it references is kept).
            refract: /glass-lens/.test(story),
            squircle: /squircle/.test(story) && /glass-(card|btn)/.test(story),
            chromatic: /glass-chromatic/.test(story),
            tint: /--glass-tint-source/.test(story),
        };
        facts.storyExercises = exercises;
        for (const [fold, ok] of Object.entries(exercises)) {
            if (!ok) {
                violations.push(`the glass-material story does not exercise the ${fold} fold`);
            }
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-material-sota",
        facts,
        violations,
    });

    console.log(
        "proof:glass-material-sota — four gated Baseline-2025 glass folds ship as out-of-box assets (AW.W23)",
    );
    console.log(
        `  refraction asset    : node ${facts.refractFilterNodeShips ? "ships ✓" : "ABSENT ✗"}   re-homed ${facts.refractReHomed ? "✓" : "✗"}   gated ${facts.refractGated ? "✓" : "✗"}`,
    );
    console.log(
        `  squircle PE         : gated ${facts.squircleGated ? "✓" : "✗"}   leak ${facts.squircleLeak ? "YES ✗" : "no ✓"}`,
    );
    console.log(
        `  chromatic fringe    : gated-no-preference ${facts.fringeGatedNoPreference ? "✓" : "✗"}   composes-rim ${facts.fringeComposesRim ? "✓" : "✗"}   warm-hue ${facts.fringeWarmHue}`,
    );
    console.log(
        `  adaptive tint       : default strength ${facts.tintStrengthDefault}   oklab ${facts.usesOklabTint ? "✓" : "✗"}   no-lightness-shift ${facts.oklchLightnessShift ? "✗" : "✓"}`,
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
