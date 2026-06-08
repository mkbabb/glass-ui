#!/usr/bin/env node
// AV.W11 (AX.W59 design reconcile) — the slider-two-only cardinality +
// design gate (proof:slider-two-only).
//
// The reka-backed `<Slider>` ships EXACTLY two recipes — `standard` (the
// INTEGRATED-CYLINDER glass slider) and `spectrum` (the value.js
// gradient-track color slider with the track-height SQUIRCLE thumb). This
// gate freezes that cardinality AND the AX.W59 design contract. Four clauses:
//
//   (1) KEYSET — `sliderVariants` in index.ts lists exactly
//       ['standard','spectrum'].
//   (2) ORPHAN-SCAN — Slider.vue scoped CSS carries no `[data-variant="X"]`
//       selector for X ∉ keyset (no orphan removed-variant block).
//   (3) CYLINDER-CAP — the standard thumb is the integrated-cylinder LEADING
//       CAP, NOT a detached 50% circle (AX.W59 clean break off the prior
//       ROUNDED-KNOB clause): the base `.slider-thumb` resolves a pill radius
//       (`--radius-pill`/9999px — NOT 50%, the floating-circle tell),
//       `height: 100%` (track-height, so it reads as the fill's leading edge
//       not a floating disc), and declares no `border:` paint; AND the
//       `.slider-range` fill carries a `backdrop-filter` (the glass cylinder
//       material). The continuous cylinder pulled left/right.
//   (4) SQUIRCLE-SPECTRUM — the spectrum thumb is the track-height SQUIRCLE:
//       a `corner-shape: var(--corner-shape-thumb)` decl sits ONLY inside an
//       `@supports (corner-shape: superellipse(2))` gate (the Chrome-139 PE
//       tier — `var()` is not @supports-evaluable so the gate tests the
//       literal feature) over a `border-radius` round CONTRACT, with
//       `height: 100%` (full track height, not a floating circle).
//
// inv ε / bite-check: re-adding a removed variant key reddens (1); restoring a
// removed scoped block reddens (2); reverting the standard thumb to a 50%
// floating circle / stripping the fill `backdrop-filter` reddens (3); dropping
// the spectrum `corner-shape` decl, leaking it outside the `@supports` gate, or
// floating the squircle thumb off the track height reddens (4).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const EXPECTED_KEYS = ["standard", "spectrum"];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        INDEX: resolve(ROOT, "src/components/ui/slider/index.ts"),
        SFC: resolve(ROOT, "src/components/ui/slider/Slider.vue"),
        ARTIFACT: gateArtifactPath("GLASS_UI_SLIDER_TWO_ONLY_ARTIFACT", "AV-slider-two-only"),
    };
    return _cliPaths;
}

// Strip /* … */ + // comments so neither doc-prose nor a commented-out block
// can spoof a clause.
function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
}

// Parse the CVA `variant: { … }` keyset out of index.ts.
function parseVariantKeys(indexSrc) {
    const code = stripComments(indexSrc);
    const m = code.match(/variant\s*:\s*\{([\s\S]*?)\}/);
    if (!m) return null;
    const keys = [];
    const keyRe = /(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$-]*))\s*:/g;
    let k;
    while ((k = keyRe.exec(m[1]))) keys.push(k[1] ?? k[2] ?? k[3]);
    return keys;
}

function run() {
    const { ROOT, INDEX, SFC, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(INDEX) || !existsSync(SFC)) {
        violations.push("slider index.ts or Slider.vue missing");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:slider-two-only", facts, violations });
        console.log("proof:slider-two-only — FAIL (source files missing)");
        process.exit(1);
    }

    const indexSrc = readFileSync(INDEX, "utf8");
    const sfcSrc = readFileSync(SFC, "utf8");

    // (1) KEYSET
    const keys = parseVariantKeys(indexSrc);
    facts.variantKeys = keys;
    if (!keys) {
        violations.push("could not parse `variant: { … }` block in index.ts");
    } else {
        const extra = keys.filter((k) => !EXPECTED_KEYS.includes(k));
        const missing = EXPECTED_KEYS.filter((k) => !keys.includes(k));
        if (extra.length) violations.push(`unexpected variant key(s): ${extra.join(", ")} — keyset must be exactly [${EXPECTED_KEYS.join(",")}]`);
        if (missing.length) violations.push(`missing variant key(s): ${missing.join(", ")}`);
    }

    // (2) ORPHAN-SCAN — any [data-variant="X"] in the scoped CSS where X ∉ keyset.
    const css = stripComments(sfcSrc);
    const orphans = new Set();
    const dvRe = /\[data-variant=["']([^"']+)["']\]/g;
    let d;
    while ((d = dvRe.exec(css))) {
        if (!EXPECTED_KEYS.includes(d[1])) orphans.add(d[1]);
    }
    facts.orphanVariantSelectors = [...orphans];
    if (orphans.size) violations.push(`orphan [data-variant] block(s) for removed variant(s): ${[...orphans].join(", ")}`);

    // (3) CYLINDER-CAP — the base `.slider-thumb { … }` is the integrated leading
    //     cap (AX.W59 clean break off the 50%-circle ROUNDED-KNOB clause): a pill
    //     radius (NOT 50%), `height: 100%`, no `border:` paint; AND the
    //     `.slider-range` fill carries a `backdrop-filter` (the glass cylinder).
    const thumbMatch = css.match(/(^|\})\s*\.slider-thumb\s*\{([^}]*)\}/);
    facts.thumbBlockFound = Boolean(thumbMatch);
    if (!thumbMatch) {
        violations.push("base `.slider-thumb { … }` block not found");
    } else {
        const body = thumbMatch[2];
        const radius = (body.match(/border-radius\s*:\s*([^;]+);/) || [])[1]?.trim();
        facts.thumbBorderRadius = radius ?? null;
        // The integrated cap is a PILL (radius-pill / 9999px), NEVER a 50% circle
        // (the detached-floating-disc tell the AX.W59 redesign abrogates).
        const pill = /^9999px$/.test(radius ?? "") || /radius-pill/.test(radius ?? "");
        const isCircle = radius === "50%";
        if (isCircle) violations.push("standard .slider-thumb border-radius is 50% — the AX.W59 integrated cylinder uses a pill cap (var(--radius-pill)), NOT a floating circle");
        else if (!pill) violations.push(`standard .slider-thumb border-radius is "${radius}" — must be a pill radius (var(--radius-pill)/9999px) so the cap merges seamlessly into the fill cylinder`);

        // The cap is the FILL's leading edge: track-height (`height: 100%`),
        // never a fixed-px floating disc.
        const height = (body.match(/(?:^|[;{])\s*height\s*:\s*([^;]+);/) || [])[1]?.trim();
        facts.thumbHeight = height ?? null;
        if (height !== "100%") violations.push(`standard .slider-thumb height is "${height ?? "(none)"}" — must be 100% (the cap spans the track height as the cylinder's leading edge, not a floating disc)`);

        // A bare `border:` paint (excluding `border: none` / `border-radius`) is
        // the detached-disc tell. Capture the value and reject only a real paint.
        const borderRe = /(?:^|[;{])\s*border\s*:\s*([^;]+);/g;
        let hasBorderPaint = false;
        let b;
        while ((b = borderRe.exec(body))) {
            if (b[1].trim() !== "none") { hasBorderPaint = true; break; }
        }
        facts.thumbHasBorderPaint = hasBorderPaint;
        if (hasBorderPaint) violations.push("standard .slider-thumb declares a `border:` paint — the borderless integrated cap must not ring");
    }

    // The glass cylinder: the `.slider-range` fill carries the W52 material blur.
    const rangeMatch = css.match(/(^|\})\s*\.slider-range\s*\{([^}]*)\}/);
    const rangeBlur = rangeMatch ? /backdrop-filter\s*:/.test(rangeMatch[2]) : false;
    facts.rangeHasBackdropFilter = rangeBlur;
    if (!rangeMatch) violations.push("base `.slider-range { … }` block not found");
    else if (!rangeBlur) violations.push("standard .slider-range carries no `backdrop-filter` — the integrated cylinder fill must be glass material (AX.W59)");

    // (4) SQUIRCLE-SPECTRUM — the spectrum thumb is the track-height squircle:
    //     a `corner-shape: var(--corner-shape-thumb)` decl ONLY inside an
    //     `@supports (corner-shape: superellipse(2))` gate (the Chrome-139 PE
    //     tier) over a `border-radius` round fallback, with `height: 100%`.
    const cornerDecls = (css.match(/corner-shape\s*:/g) || []).length;
    const supportsBlock = css.match(/@supports\s*\(\s*corner-shape\s*:\s*superellipse\(2\)\s*\)\s*\{([\s\S]*?\}\s*)\}/);
    facts.cornerShapeDeclCount = cornerDecls;
    facts.supportsGatePresent = Boolean(supportsBlock);
    if (cornerDecls === 0) {
        violations.push("spectrum .slider-thumb declares no `corner-shape` — the track-height squircle is missing (AX.W59)");
    } else if (!supportsBlock) {
        violations.push("a `corner-shape` decl exists but no `@supports (corner-shape: superellipse(2))` gate wraps it — the squircle must be PE-gated over the round fallback");
    } else {
        // The corner-shape decl(s) must read the token, and live ONLY inside the gate.
        const gatedReadsToken = /corner-shape\s*:\s*var\(--corner-shape-thumb\)/.test(supportsBlock[1]);
        facts.squircleReadsToken = gatedReadsToken;
        if (!gatedReadsToken) violations.push("the @supports squircle gate must read `corner-shape: var(--corner-shape-thumb)` (the token axis, not a bare keyword)");
        // No corner-shape decl may leak OUTSIDE the @supports gate (a leak breaks
        // the round contract on a partial-support engine).
        const outside = css.replace(supportsBlock[0], "");
        if (/corner-shape\s*:/.test(outside)) violations.push("a `corner-shape` decl leaks OUTSIDE the @supports gate — the round fallback is the cross-engine contract");
    }
    // The spectrum thumb spans the FULL track height (not a floating circle).
    const spectrumThumb = css.match(/\[data-variant="spectrum"\]\s*\.slider-thumb\s*\{([^}]*)\}/);
    const spectrumHeight = spectrumThumb ? (spectrumThumb[1].match(/(?:^|[;{])\s*height\s*:\s*([^;]+);/) || [])[1]?.trim() : null;
    facts.spectrumThumbHeight = spectrumHeight ?? null;
    if (!spectrumThumb) violations.push("spectrum `.slider-thumb` block not found");
    else if (spectrumHeight !== "100%") violations.push(`spectrum .slider-thumb height is "${spectrumHeight ?? "(none)"}" — must be 100% (the squircle spans the track height, not a floating circle)`);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:slider-two-only", expectedKeys: EXPECTED_KEYS, facts, violations });

    console.log("proof:slider-two-only — exactly two slider recipes ship + the AX.W59 design contract");
    console.log(`  variant keys       : ${keys ? keys.join(", ") : "(unparsed)"}`);
    console.log(`  orphan selectors   : ${facts.orphanVariantSelectors.length ? facts.orphanVariantSelectors.join(", ") : "(none)"}`);
    console.log(`  std cap radius      : ${facts.thumbBorderRadius ?? "(none)"} (height ${facts.thumbHeight ?? "?"})`);
    console.log(`  std cap border paint: ${facts.thumbHasBorderPaint ?? "(n/a)"}`);
    console.log(`  range glass blur    : ${facts.rangeHasBackdropFilter}`);
    console.log(`  spectrum squircle   : ${facts.supportsGatePresent ? "@supports-gated" : "(missing)"} (height ${facts.spectrumThumbHeight ?? "?"})`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
