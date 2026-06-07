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
//      concrete color via computed style in `GooBlob.vue` BEFORE the resolver
//      sees it.
//
// This is a SEAM assertion (a pure read-and-detect over source) — happy-dom
// resolves neither scoped-CSS contrast nor a WebGL2 frame loop, so the live
// contrast/console-clean probes are not headless-assertable. The companion unit
// (tests/components/custom/goo-blob/resolveColor.test.ts) exercises the
// var()→concrete resolution; the browser contrast verification is the
// orchestrator's. This gate locks the SOURCE invariants: the four token swaps
// landed AND no NEW token / variant / resolver API was minted.
//
// bite-check: revert any one token swap → its clause reddens; re-introduce a
// bare `var(--` into the goo-blob resolver call path → clause 4 reddens.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

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
        GLASS: resolve(ROOT, "src/styles/glass.css"),
        SLIDER: resolve(ROOT, "src/components/ui/slider/Slider.vue"),
        GOOBLOB: resolve(ROOT, "src/components/custom/goo-blob/GooBlob.vue"),
        TOKENS: resolve(ROOT, "src/styles/tokens.css"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_AFFORDANCE_CONTRAST_ARTIFACT",
            "AW-affordance-contrast",
        ),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, BUTTON, GLASS, SLIDER, GOOBLOB, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // ── 1. gold-audacious rest text reads in light mode.
    if (!existsSync(BUTTON)) {
        violations.push("button/index.ts is absent");
    } else {
        const src = stripComments(readFileSync(BUTTON, "utf8"));
        const gold = src.match(/'gold-audacious':\s*\n?\s*'([^']*)'/);
        const goldStr = gold ? gold[1] : "";
        facts.goldRestForeground =
            /\btext-foreground\b/.test(goldStr) && !/(^|\s)text-white(\s|$)/.test(goldStr);
        facts.goldHoverLight = /hover:text-white/.test(goldStr);
        if (!facts.goldRestForeground) {
            violations.push(
                "gold-audacious rest text is not the warm-ink `text-foreground` — white-on-cream was sub-legible (it must reserve light text for hover/active)",
            );
        }
        if (!facts.goldHoverLight) {
            violations.push(
                "gold-audacious does not lift to light text on hover — the saturated state should clear contrast with `hover:text-white`",
            );
        }
        // No NEW CVA variant key minted.
        facts.noNewVariantKey = !/'gold-audacious-[a-z]+':/.test(src);
        if (!facts.noNewVariantKey) {
            violations.push("a new gold-audacious-* CVA variant key was minted (forbidden — token swap only)");
        }
    }

    // ── 2. input/select resting border clears the 8%α floor.
    let glassSrc = "";
    if (!existsSync(GLASS)) {
        violations.push("glass.css is absent");
    } else {
        glassSrc = stripComments(readFileSync(GLASS, "utf8"));
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
        const bg = rangeBlock.match(/background:\s*var\(--slider-range-bg,\s*var\((--[a-z0-9-]+)\)\)/);
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
        violations.push("GooBlob.vue is absent");
    } else {
        const src = stripComments(readFileSync(GOOBLOB, "utf8"));
        // The component resolves a var() color via computed style BEFORE the
        // renderer/resolver sees it (the `getComputedStyle(...).color` read).
        facts.resolvesViaComputedStyle =
            /getComputedStyle\([^)]*\)\.color/.test(src) &&
            /var\(/.test(src) &&
            /resolvedColor/.test(src);
        if (!facts.resolvesViaComputedStyle) {
            violations.push(
                "GooBlob.vue does not resolve a var() color to a concrete value via computed style — the per-frame value.js throw is not killed",
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
        "proof:affordance-contrast — the three cream affordances read at rest + the goo-blob var() throw is killed (AW.W13)",
    );
    console.log(`  gold-audacious rest=foreground  : ${facts.goldRestForeground ? "yes ✓" : "NO ✗"}`);
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
