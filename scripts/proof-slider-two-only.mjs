#!/usr/bin/env node
// AV.W11 — the slider-two-only cardinality gate (proof:slider-two-only).
//
// The reka-backed `<Slider>` ships EXACTLY two recipes — `standard` (the
// continuous rounded iOS knob) and `spectrum` (the gradient-track color
// slider). This gate freezes that cardinality and the continuous-knob
// contract. Three clauses:
//
//   (1) KEYSET — `sliderVariants` in index.ts lists exactly
//       ['standard','spectrum'] (born RED on HEAD's 6-key sprawl).
//   (2) ORPHAN-SCAN — Slider.vue scoped CSS carries no `[data-variant="X"]`
//       selector for X ∉ keyset (the four deleted variant blocks).
//   (3) ROUNDED-KNOB — the base `.slider-thumb` recipe resolves
//       `border-radius: 50%` (the continuous iOS knob) and declares no
//       `border:` paint (the detached bordered disc is gone).
//
// inv ε / bite-check: re-adding any deleted variant key reddens (1); restoring
// any deleted scoped block reddens (2); reverting the thumb to the pill/border
// recipe reddens (3).

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

    // (3) ROUNDED-KNOB — the base `.slider-thumb { … }` declares border-radius: 50%
    //     (or an equal-axis pill) and carries no `border:` paint.
    const thumbMatch = css.match(/(^|\})\s*\.slider-thumb\s*\{([^}]*)\}/);
    facts.thumbBlockFound = Boolean(thumbMatch);
    if (!thumbMatch) {
        violations.push("base `.slider-thumb { … }` block not found");
    } else {
        const body = thumbMatch[2];
        const radius = (body.match(/border-radius\s*:\s*([^;]+);/) || [])[1]?.trim();
        facts.thumbBorderRadius = radius ?? null;
        const rounded = radius === "50%" || /^9999px$/.test(radius ?? "") || /radius-pill/.test(radius ?? "");
        if (!rounded) violations.push(`standard .slider-thumb border-radius is "${radius}" — must be 50% (the continuous rounded knob)`);

        // A bare `border:` paint (excluding `border: none` / `border-radius`) is
        // the detached-disc tell. Capture the value and reject only a real paint.
        const borderRe = /(?:^|[;{])\s*border\s*:\s*([^;]+);/g;
        let hasBorderPaint = false;
        let b;
        while ((b = borderRe.exec(body))) {
            if (b[1].trim() !== "none") { hasBorderPaint = true; break; }
        }
        facts.thumbHasBorderPaint = hasBorderPaint;
        if (hasBorderPaint) violations.push("standard .slider-thumb declares a `border:` paint — the borderless continuous knob must not ring");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:slider-two-only", expectedKeys: EXPECTED_KEYS, facts, violations });

    console.log("proof:slider-two-only — exactly two slider recipes ship (AV.W11)");
    console.log(`  variant keys      : ${keys ? keys.join(", ") : "(unparsed)"}`);
    console.log(`  orphan selectors  : ${facts.orphanVariantSelectors.length ? facts.orphanVariantSelectors.join(", ") : "(none)"}`);
    console.log(`  thumb border-rad. : ${facts.thumbBorderRadius ?? "(none)"}`);
    console.log(`  thumb border paint: ${facts.thumbHasBorderPaint ?? "(n/a)"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
