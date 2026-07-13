#!/usr/bin/env node
// AW.W13 — the at-rest affordance gate (proof:affordance-contrast).
//
// Four too-timid cream affordances + one live runtime throw:
//   1. gold-audacious rest text was `text-white` over an 8%-gold-tint glass
//      substrate (near-cream in light mode) — white-on-cream was sub-legible.
//      The fix swaps rest text to the warm-ink `--foreground` and reserves light
//      text for the saturated hover/active state.
//   2. the `.input-pill` (+ Select-trigger mirror) resting border was
//      `--glass-border-wash` (~8%α), the field edge nearly vanishing on cream.
//      Lifted to a token clearing the 8% floor.
//   3. the standard slider `.slider-range` painted `--surface-tint-25` (a 25%
//      tint over the muted track — sub-visible on cream). Lifted to a
//      perceptible token so the filled range reads as progress.
//   4. the goo-blob `defaultBlobColorResolver` was handed a raw `var(--primary)`
//      token straight to value.js's `cssToOklch`, which cannot parse a `var()`
//      wrapper and THREW once per frame. The fix resolves the token to a
//      concrete color via computed style in `Blob.vue` BEFORE the resolver
//      sees it.
//
// This is a SEAM assertion (a pure read-and-detect over source) — happy-dom
// resolves neither scoped-CSS contrast nor a WebGL2 frame loop, so the live
// contrast/console-clean probes are not headless-assertable. The companion unit
// (tests/components/custom/blob/resolveColor.test.ts) exercises the
// var()→concrete resolution; the browser contrast verification is the
// orchestrator's. This gate locks the SOURCE invariants: the four token swaps
// landed AND no NEW token / variant / resolver API was minted.
//
// AY.W-PRIM-POLISH D1 — clause 1b EXTENDS this gate with the gold-CTA hover-plate
// arm: the `btn-audacious-gold` :hover backplate must carry a near-opaque (≥80%α)
// saturated-gold base layer so the white label clears ≥4.5:1 in LIGHT mode (was a
// 22-30% pale wash → 1.29:1 white-on-pale-gold). This SOURCE arm locks the recipe
// shape; the PAINTED-PIXEL ratio is the binding truth in the π twin
// `tests-visual/affordance-contrast-gold.spec.ts` (born-RED on the 1.29:1 state).
//
// bite-check: revert any one token swap → its clause reddens; re-introduce a
// bare `var(--` into the goo-blob resolver call path → clause 4 reddens; revert
// the gold hover plate to the pale ≤30% wash → clause 1b reddens.

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

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        BUTTON: resolve(ROOT, "src/components/ui/button/index.ts"),
        UTILITIES: resolve(ROOT, "src/styles/utilities.css"),
        GLASS: resolve(ROOT, "src/styles/glass.css"),
        SLIDER: resolve(ROOT, "src/components/ui/slider/Slider.vue"),
        GOOBLOB: resolve(ROOT, "src/components/custom/blob/Blob.vue"),
        TOKENS: resolve(ROOT, "src/styles/tokens.css"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_AFFORDANCE_CONTRAST_ARTIFACT",
            "AW-affordance-contrast",
        ),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, BUTTON, UTILITIES, GLASS, SLIDER, GOOBLOB, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // ── 1. gold-audacious rest text reads — the CALM register (BA.W-GLASS-CAL).
    //   The disco RETIRED (H2a): `gold-audacious` is no longer a saturated-sweep
    //   CTA that flips to white on hover; it is a CALM glass button with a STATIC
    //   warm-gold tint, the label warm-ink `--foreground` in BOTH rest and hover
    //   (the soft gold tint never deepens to a backplate that needs a white-label
    //   flip). So the legibility assertion DROPS onto the new register: the rest
    //   text is `text-foreground` (legible warm ink over the soft gold tint) AND it
    //   NEVER flips to `text-white` (there is no saturated state to clear with white
    //   — a `hover:text-white` would be illegible over the still-light gold tint).
    if (!existsSync(BUTTON)) {
        violations.push("button/index.ts is absent");
    } else {
        const src = stripComments(readFileSync(BUTTON, "utf8"));
        const gold = src.match(/'gold-audacious':\s*\n?\s*'([^']*)'/);
        const goldStr = gold ? gold[1] : "";
        facts.goldRestForeground =
            /\btext-foreground\b/.test(goldStr) && !/(^|\s)text-white(\s|$)/.test(goldStr);
        // The CALM register keeps the warm ink at EVERY state — no white flip.
        facts.goldNoWhiteFlip = !/text-white/.test(goldStr);
        // The static warm-gold tint is the calm register's identity: a --color-gold
        // background over the glass surface (replaces the retired animated sweep).
        facts.goldStaticTint = /--color-gold\b/.test(goldStr);
        // The variant composes the calm glass-first surface (no retired disco class).
        facts.goldCalmGlass =
            /\bbtn-glass\b/.test(goldStr) && !/btn-audacious/.test(goldStr);
        if (!facts.goldRestForeground) {
            violations.push(
                "gold-audacious rest text is not the warm-ink `text-foreground` — white-on-gold-tint-over-cream was sub-legible",
            );
        }
        if (!facts.goldNoWhiteFlip) {
            violations.push(
                "gold-audacious still flips to `text-white` — the CALM register (H2a) has no saturated backplate to clear, so a white label is illegible over the soft gold tint (the disco-sweep state retired)",
            );
        }
        if (!facts.goldStaticTint) {
            violations.push(
                "gold-audacious carries no static `--color-gold` tint — the calm register's gold identity (gold survives CALM, hinge H2a) is missing",
            );
        }
        if (!facts.goldCalmGlass) {
            violations.push(
                "gold-audacious is not the calm glass register (`btn-glass`, no retired `btn-audacious` class) — the disco recipe was not collapsed",
            );
        }
        // No NEW CVA variant key minted.
        facts.noNewVariantKey = !/'gold-audacious-[a-z]+':/.test(src);
        if (!facts.noNewVariantKey) {
            violations.push("a new gold-audacious-* CVA variant key was minted (forbidden — register collapse only)");
        }
    }

    // ── 1b. BA.W-GLASS-CAL (H2a) — the `btn-audacious-gold` disco utility is
    //   RETIRED. The prior arm asserted a deepened OPAQUE deep-gold HOVER backplate
    //   so a white label cleared ≥4.5:1 in light mode; with the calm register there
    //   is NO white label and NO saturated backplate, so the assertion DROPS (it is
    //   removed, not defeated). The new positive truth: the retired `@utility
    //   btn-audacious-gold` is GONE from utilities (the disco recipe family), and the
    //   calm gold register's legibility is carried by clause 1 (warm-ink at every
    //   state over the soft tint). This is the rebaselined no-hole assert.
    if (!existsSync(UTILITIES)) {
        violations.push("utilities.css is absent");
    } else {
        const src = stripComments(readMonolith(ROOT, "utilities"));
        facts.goldDiscoUtilityRetired = !/@utility\s+btn-audacious-gold\b/.test(src);
        if (!facts.goldDiscoUtilityRetired) {
            violations.push(
                "the `@utility btn-audacious-gold` disco recipe still exists — BA.W-GLASS-CAL (H2a) retires it; the calm gold register is a variant-class composition, not a disco utility",
            );
        }
    }

    // ── 2. input/select resting border clears the 8%α floor.
    let glassSrc = "";
    if (!existsSync(GLASS)) {
        violations.push("glass.css is absent");
    } else {
        glassSrc = stripComments(readMonolith(ROOT, "glass"));
        const inputRule = glassSrc.match(/\.input-pill\s*\{([^}]*)\}/);
        const inputBlock = inputRule ? inputRule[1] : "";
        const borderDecl = inputBlock.match(/border:\s*[\d.]+px\s+solid\s+var\((--[a-z0-9-]+)\)/);
        facts.inputBorderToken = borderDecl ? borderDecl[1] : null;
        // The lifted token must NOT be the 8%α `--glass-border-wash` floor.
        facts.inputBorderLifted =
            !!borderDecl && borderDecl[1] !== "--glass-border-wash";
        if (!facts.inputBorderLifted) {
            violations.push(
                `the .input-pill resting border is still the ~8%α floor (${facts.inputBorderToken}) — lift it above the legibility floor`,
            );
        }
        // The Select-trigger mirror lift.
        facts.selectTriggerLifted = /\.glass-wash\[role="combobox"\]\s*\{[^}]*border-color:\s*var\(/.test(
            glassSrc,
        );
        if (!facts.selectTriggerLifted) {
            violations.push(
                "the Select trigger (`.glass-wash[role=\"combobox\"]`) resting border was not lifted to mirror the input pill",
            );
        }
        // The invalid/focus rings still resolve --destructive / accent (recipe intact).
        facts.invalidRingIntact = /\.input-pill:where\([^)]*\)\s*\{[^}]*var\(--destructive\)/.test(
            glassSrc,
        );
        if (!facts.invalidRingIntact) {
            violations.push(
                "the .input-pill invalid-ring recipe no longer resolves var(--destructive) — the border lift regressed the ring",
            );
        }
    }

    // ── 3. standard slider track fills to the thumb.
    if (!existsSync(SLIDER)) {
        violations.push("Slider.vue is absent");
    } else {
        const src = stripComments(readFileSync(SLIDER, "utf8"));
        const rangeRule = src.match(/\.slider-range\s*\{([^}]*)\}/);
        const rangeBlock = rangeRule ? rangeRule[1] : "";
        // W-GLASS landed the liquid-glass fill — the range bg is now
        // `color-mix(in oklab, var(--slider-range-bg, var(--primary)) 88%, transparent)`
        // (the glass cylinder tint), not the bare `var(--slider-range-bg, var(…))`
        // the AW.W13 form asserted. The intent is unchanged: the fill's FALLBACK
        // rung must be perceptible, NOT the sub-visible `--surface-tint-25`.
        // Extract the inner fallback token from either form.
        const bg = rangeBlock.match(/--slider-range-bg,\s*var\((--[a-z0-9-]+)\)/);
        facts.sliderRangeFallback = bg ? bg[1] : null;
        // The fill must NOT be the sub-visible --surface-tint-25 over the muted track.
        facts.sliderRangeLifted = !!bg && bg[1] !== "--surface-tint-25";
        if (!facts.sliderRangeLifted) {
            violations.push(
                `the standard .slider-range fill is still the sub-visible ${facts.sliderRangeFallback} — lift it to a perceptible rung (e.g. --primary)`,
            );
        }
        // The spectrum range stays transparent (unchanged).
        facts.spectrumRangeTransparent =
            /\[data-variant="spectrum"\]\s*\.slider-range\s*\{[^}]*background:\s*transparent/.test(src);
        if (!facts.spectrumRangeTransparent) {
            violations.push(
                "the spectrum slider range is no longer transparent — the gradient-track fill mechanic regressed",
            );
        }
    }

    // ── 4. goo-blob no longer hands a bare var() to the resolver.
    if (!existsSync(GOOBLOB)) {
        violations.push("Blob.vue is absent");
    } else {
        const src = stripComments(readFileSync(GOOBLOB, "utf8"));
        // The component resolves a var() color to a concrete value BEFORE the
        // renderer/resolver sees it. The `getComputedStyle` cascade-read moved
        // into the shared `useTokenColor` composable (it now appears EXACTLY ONCE
        // in the codebase) — GooBlob consumes it as `tokenColors.resolve(color, el)`
        // into `resolvedColor`. The intent (no raw var() reaches value.js) is
        // unchanged; the read is via the composable seam, not a local literal.
        facts.resolvesViaComputedStyle =
            /tokenColors\.resolve\(/.test(src) &&
            /resolvedColor\.value\s*=\s*tokenColors\.resolve\(/.test(src);
        if (!facts.resolvesViaComputedStyle) {
            violations.push(
                "Blob.vue does not resolve a var() color to a concrete value via computed style — the per-frame value.js throw is not killed",
            );
        }
        // The renderer is fed the RESOLVED ref, not the raw `var()` color prop.
        facts.feedsResolvedColor = /color:\s*resolvedColor/.test(src);
        if (!facts.feedsResolvedColor) {
            violations.push(
                "the metaball renderer is not fed the resolved-color ref — a raw var() can still reach value.js",
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:affordance-contrast",
        facts,
        violations,
    });

    console.log(
        "proof:affordance-contrast — the cream affordances read at rest + the CALM gold CTA register (disco retired, BA.W-GLASS-CAL) + the goo-blob var() throw is killed (AW.W13 + AY.W-PRIM-POLISH D1)",
    );
    console.log(`  gold-audacious rest=foreground  : ${facts.goldRestForeground ? "yes ✓" : "NO ✗"}`);
    console.log(`  gold CTA calm (no white flip)   : ${facts.goldNoWhiteFlip ? "yes ✓" : "NO ✗"}   static-tint=${facts.goldStaticTint ? "✓" : "✗"} glass=${facts.goldCalmGlass ? "✓" : "✗"} disco-utility-retired=${facts.goldDiscoUtilityRetired ? "✓" : "✗"}`);
    console.log(`  input/select border lifted      : ${facts.inputBorderLifted && facts.selectTriggerLifted ? "yes ✓" : "NO ✗"}   (${facts.inputBorderToken})`);
    console.log(`  standard slider fill lifted      : ${facts.sliderRangeLifted ? "yes ✓" : "NO ✗"}   (${facts.sliderRangeFallback})`);
    console.log(`  goo-blob var() resolved pre-vjs : ${facts.resolvesViaComputedStyle && facts.feedsResolvedColor ? "yes ✓" : "NO ✗"}`);
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
