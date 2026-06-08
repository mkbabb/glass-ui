#!/usr/bin/env node
// AX.W23 — the carousel glass-atoms gate (proof:carousel-glass-atoms).
//
// The carousel position-dot rail was authored for an OPAQUE light card and never
// re-derived for the translucent DARK surface every dark-mode consumer (and the
// carousel's own story) places it on: the inactive dot painted `bg-muted-medium`
// (invisible on a dark card), and the active emphasis rode the dead
// `scale-[var(--scale-hover)]` Tailwind-v4 var-in-arbitrary class (it emits NO
// CSS — `transform:none`). AX.W23 re-authored the rail; the AW.W30 chrome restyle
// (shell `.glass-wash`/`.glass-material`, item four-state) was folded in.
//
// This gate is a RENDER assertion (not a source-string scan): it reads the
// EMITTED `dist/glass-ui.css` — the actual painted recipe — and computes the
// real WCAG 1.4.11 contrast of the inactive dot against the composited
// translucent dark card surface. Four clauses:
//
//   (A) DOT-CONTRAST — the inactive `.carousel-dot::before` background is a
//       `color-mix(in srgb, var(--foreground) N%, transparent)` whose RESOLVED
//       color clears ≥3:1 (WCAG 1.4.11 non-text) against the composited
//       `bg-card/30`-over-page surface in BOTH the dark AND the light scheme.
//       (born-RED on HEAD's `bg-muted-medium`, which resolves ~1.2:1 on a dark
//       card.)
//   (B) NO-DEAD-CLASS — CarouselDots.vue carries NO `scale-[var(--…)]`
//       var-in-arbitrary class (the non-emit), AND the active emphasis emits a
//       REAL scoped rule: an emitted `.carousel-dot[data-active]::before` with a
//       `width:` or `height:` morph in dist/glass-ui.css.
//   (C) FOUR-STATE — GlassCarouselItem.vue carries the interactive four-state
//       contract: `data-state` + `aria-pressed` (the state attrs), `.focus-ring`
//       (the focus cue), `.tap-squish` (the press-spring).
//   (D) CHROME-SUBSTRATE — GlassCarousel.vue composes a `.glass-material` band
//       member (`glass-wash`/`glass-quiet`/`glass-resting`/`glass-floating`/
//       `glass-overlay`/`glass-material`) — the specular/rim substrate, not the
//       prior flat on-hover-only `--glass-shadow-wash` pill.
//
// inv ε / bite-check: revert the inactive dot to `bg-muted-medium` (or any rung
// resolving <3:1) → (A) RED; re-add `scale-[var(--x)]` or drop the
// `[data-active]::before` morph → (B) RED; drop a four-state attr → (C) RED;
// strip the `.glass-*` band class off the shell → (D) RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// WCAG 1.4.11 non-text contrast floor.
const CONTRAST_FLOOR = 3.0;

// The `.glass-material` band members (glass.css selector group) any of which
// brings the specular/rim substrate (clause D).
const GLASS_BAND_CLASSES = [
    "glass-material",
    "glass-wash",
    "glass-quiet",
    "glass-resting",
    "glass-floating",
    "glass-overlay",
    "glass-card",
];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        DOTS: resolve(ROOT, "src/components/ui/carousel/CarouselDots.vue"),
        ITEM: resolve(ROOT, "src/components/custom/glass-carousel/GlassCarouselItem.vue"),
        SHELL: resolve(ROOT, "src/components/custom/glass-carousel/GlassCarousel.vue"),
        CSS: resolve(ROOT, "dist/glass-ui.css"),
        ARTIFACT: gateArtifactPath("GLASS_UI_CAROUSEL_GLASS_ATOMS_ARTIFACT", "AX-carousel-glass-atoms"),
    };
    return _cliPaths;
}

// ── color math (sRGB / WCAG) ─────────────────────────────────────────────────
function hsl(h, s, l) {
    s /= 100; l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)];
}
function lin(c) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function relLum([r, g, b]) { return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); }
function contrast(a, b) {
    const L1 = relLum(a), L2 = relLum(b);
    const hi = Math.max(L1, L2), lo = Math.min(L1, L2);
    return (hi + 0.05) / (lo + 0.05);
}
// Alpha-composite `fg` at opacity `a` over `bg` (WCAG composites in sRGB).
function over(fg, a, bg) { return fg.map((c, i) => a * c + (1 - a) * bg[i]); }

// The two scheme contexts the rail must clear. The composited surface is the
// `bg-card/30` translucent card the carousel story + every consumer places the
// dots on, over the page background. Foreground is the surface-tint base (it
// flips light↔dark, so the SAME N% rung re-tints by construction).
//   dark:  page hsl(24 8% 6%), card hsl(24 8% 10%), foreground hsl(48 10% 90%)
//   light: page/card hsl(48 12% 98%), foreground hsl(24 10% 10%)
function schemeContexts() {
    const darkPage = hsl(24, 8, 6);
    const darkCard = hsl(24, 8, 10);
    const darkFg = hsl(48, 10, 90);
    const lightPage = hsl(48, 12, 98);
    const lightCard = hsl(48, 12, 98);
    const lightFg = hsl(24, 10, 10);
    return {
        dark: { fg: darkFg, surface: over(darkCard, 0.30, darkPage) },
        light: { fg: lightFg, surface: over(lightCard, 0.30, lightPage) },
    };
}

// Strip /* … */ comments so doc-prose can't spoof a clause.
function stripCssComments(src) { return src.replace(/\/\*[\s\S]*?\*\//g, ""); }
function stripVueComments(src) {
    return src.replace(/<!--[\s\S]*?-->/g, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
}

function run() {
    const { ROOT, DOTS, ITEM, SHELL, CSS, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    for (const [label, p] of [["CarouselDots.vue", DOTS], ["GlassCarouselItem.vue", ITEM], ["GlassCarousel.vue", SHELL]]) {
        if (!existsSync(p)) violations.push(`${label} missing at ${p.slice(ROOT.length + 1)}`);
    }
    if (!existsSync(CSS)) {
        violations.push("dist/glass-ui.css missing — run `npm run build` before this gate (render assertion reads the emitted CSS)");
    }
    if (violations.length) {
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:carousel-glass-atoms", facts, violations });
        console.log("proof:carousel-glass-atoms — FAIL (prerequisite missing)");
        for (const v of violations) console.log(`  ✗ ${v}`);
        process.exit(1);
    }

    const css = stripCssComments(readFileSync(CSS, "utf8"));
    const dotsSrc = readFileSync(DOTS, "utf8");
    const itemSrc = readFileSync(ITEM, "utf8");
    const shellSrc = readFileSync(SHELL, "utf8");

    // ── (A) DOT-CONTRAST — read the emitted inactive-dot recipe + resolve ────────
    // Match the `.carousel-dot::before` base rule (the inactive resting fill) in
    // the emitted CSS (scoped hash tolerated). Extract its color-mix α.
    const beforeRule = css.match(/\.carousel-dot(?:\[[^\]]*\])?\s*:{1,2}before\s*\{([^}]*background\s*:\s*color-mix\(in srgb,\s*var\(--foreground\)\s*(\d+)%[^}]*)\}/i);
    if (!beforeRule) {
        violations.push("could not find the emitted `.carousel-dot::before` background color-mix(in srgb, var(--foreground) N%) rule in dist/glass-ui.css — the inactive dot must paint a foreground-tint (NOT bg-muted-medium)");
    } else {
        const alpha = Number(beforeRule[2]);
        facts.inactiveDotAlphaPct = alpha;
        const ctx = schemeContexts();
        const results = {};
        let allPass = true;
        for (const [scheme, { fg, surface }] of Object.entries(ctx)) {
            const dot = over(fg, alpha / 100, surface);
            const c = contrast(dot, surface);
            results[scheme] = Number(c.toFixed(3));
            if (c < CONTRAST_FLOOR) allPass = false;
        }
        facts.inactiveDotContrast = results;
        if (!allPass) {
            violations.push(`inactive dot (foreground ${alpha}%) contrast below ${CONTRAST_FLOOR}:1 — dark ${results.dark}, light ${results.light} (must clear ${CONTRAST_FLOOR}:1 in BOTH schemes on the translucent dark card)`);
        }
    }

    // bg-muted-medium guard — the retired opaque-light-card token.
    if (/bg-muted-medium/.test(stripVueComments(dotsSrc))) {
        violations.push("CarouselDots.vue still references `bg-muted-medium` — the inactive dot must paint a foreground-tint that clears ≥3:1 on a dark card");
    }

    // ── (B) NO-DEAD-CLASS — no scale-[var(--…)] non-emit; real morph emitted ────
    const dotsCode = stripVueComments(dotsSrc);
    const deadArbitrary = dotsCode.match(/(?:scale|translate|rotate|shadow)-\[var\(--[^\])]+\)\]/);
    facts.deadArbitraryClass = deadArbitrary ? deadArbitrary[0] : null;
    if (deadArbitrary) {
        violations.push(`CarouselDots.vue carries the var-in-arbitrary non-emit class \`${deadArbitrary[0]}\` — it emits NO CSS; drive the morph through a scoped [data-active] rule instead`);
    }
    // The active emphasis must emit a REAL morph (width or height) in a scoped
    // [data-active]::before rule in the emitted CSS.
    const activeMorph = css.match(/\.carousel-dot\[data-active\](?:\[[^\]]*\])?\s*:{1,2}before\s*\{([^}]*(?:width|height)\s*:[^}]*)\}/i);
    facts.activeMorphEmitted = Boolean(activeMorph);
    if (!activeMorph) {
        violations.push("no emitted `.carousel-dot[data-active]::before { width|height: … }` morph in dist/glass-ui.css — the active emphasis must be a REAL emitted morph, not a dead arbitrary class");
    }

    // ── (C) FOUR-STATE — GlassCarouselItem interactive contract ─────────────────
    const itemCode = stripVueComments(itemSrc);
    const fourState = {
        "data-state": /data-state\b/.test(itemCode),
        "aria-pressed": /aria-pressed\b/.test(itemCode),
        "focus-ring": /\bfocus-ring\b/.test(itemCode),
        "tap-squish": /\btap-squish\b/.test(itemCode),
    };
    facts.itemFourState = fourState;
    for (const [attr, present] of Object.entries(fourState)) {
        if (!present) violations.push(`GlassCarouselItem.vue is missing the four-state contract member \`${attr}\``);
    }

    // ── (D) CHROME-SUBSTRATE — shell composes a glass-material band member ───────
    const shellCode = stripVueComments(shellSrc);
    const bandClass = GLASS_BAND_CLASSES.find((c) => new RegExp(`['"\\s]${c}['"\\s]`).test(shellCode));
    facts.shellBandClass = bandClass ?? null;
    if (!bandClass) {
        violations.push(`GlassCarousel.vue shell composes no .glass-material band member (${GLASS_BAND_CLASSES.join("/")}) — it must sit on the specular/rim substrate, not a flat on-hover-only pill`);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:carousel-glass-atoms",
        contrastFloor: CONTRAST_FLOOR,
        facts,
        violations,
    });

    console.log("proof:carousel-glass-atoms — the carousel dot rail + chrome render assertion (AX.W23)");
    console.log(`  inactive dot α    : ${facts.inactiveDotAlphaPct ?? "(unfound)"}%`);
    console.log(`  dot contrast      : dark ${facts.inactiveDotContrast?.dark ?? "?"}  light ${facts.inactiveDotContrast?.light ?? "?"} (floor ${CONTRAST_FLOOR}:1)`);
    console.log(`  dead arbitrary    : ${facts.deadArbitraryClass ?? "(none)"}`);
    console.log(`  active morph emit : ${facts.activeMorphEmitted ? "yes" : "NO"}`);
    console.log(`  item four-state   : ${Object.entries(facts.itemFourState ?? {}).map(([k, v]) => `${k}=${v ? "✓" : "✗"}`).join(" ")}`);
    console.log(`  shell band class  : ${facts.shellBandClass ?? "(none)"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
