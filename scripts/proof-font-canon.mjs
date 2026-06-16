#!/usr/bin/env node
// AV.W10 · AX.W22 — the font-canon gate (proof:font-canon), demoted to a
// NECESSARY-only static pre-check (the SUFFICIENT live-cascade truth is
// proof:font-cascade-live; a NAMED face being legal here does not prove it
// PAINTS — that gap is exactly what the live gate closes).
//
// This gate freezes the canon: every NAMED face referenced in
//   - the demo tables (defaults.ts FONT_OPTIONS stacks + DEFAULT_CONFIG.font)
//   - the demo presets (demo/presets/*.css --font-* declarations)
//   - the library `--font-stack-*` tokens (tokens.css)
// must be either a SHIPPED face (declared as a `@font-face` font-family in
// src/styles/fonts.css, demo/demo.css, or src/styles/typography.css's
// calibrated fallback faces) OR a generic/system keyword (serif, sans-serif,
// monospace, system-ui, ui-monospace, -apple-system, …). A reference to a
// non-shipped named face → RED. A `var(--font-stack-*)` chain reference is
// skipped: it resolves through the cascade to another token (the AX.W22
// single-source consolidation — --font-stack-display/-sans alias the canonical
// --font-stack-text), and that aliased token's own stack is checked.
//
// inv ε / bite-check: re-add a non-shipped named face (e.g. "Fraunces") to
// FONT_OPTIONS → RED; point `--font-stack-text` at a non-shipped named face →
// RED; a generic keyword, a shipped face, or a var() chain → GREEN.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// BA.W-CARVE2 — typography.css is now a thin @import root over typography/*.css
// partials (the @font-face fallback faces live in scale.css); readMonolith
// concatenates root + partials in cascade order so the shipped-face derive holds.
import { readMonolith } from "./read-css-monoliths.mjs";

// Generic CSS font keywords + platform-native stack keywords that need no face.
const GENERIC = new Set([
    "serif",
    "sans-serif",
    "monospace",
    "cursive",
    "fantasy",
    "system-ui",
    "ui-serif",
    "ui-sans-serif",
    "ui-monospace",
    "ui-rounded",
    "-apple-system",
    "blinkmacsystemfont",
    "inherit",
    "initial",
    "unset",
]);

// Platform-native faces that exist on the host OS by name — they are not
// glass-ui binaries but they are genuinely paintable (no web-font needed). Kept
// to a tight, conventional allowlist so a stale brand face cannot hide here.
const SYSTEM_NAMED = new Set([
    "sf mono",
    "cascadia code",
    "fira mono",
    "georgia",
    "times new roman",
    "menlo",
    "consolas",
    "arial",
    "arial nova",
    "helvetica neue",
    "helvetica",
]);

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        // The two files that carry font BINARIES (@font-face src: url(…)).
        FONTS_LIB: resolve(ROOT, "src/styles/fonts.css"),
        FONTS_DEMO: resolve(ROOT, "demo/demo.css"),
        // The calibrated `local()` fallback faces (no binary, but a real face name).
        TYPOGRAPHY: resolve(ROOT, "src/styles/typography.css"),
        // Reference sites the canon must hold across.
        DEFAULTS: resolve(ROOT, "demo/configurator/preset-editor/defaults.ts"),
        NEUTRAL: resolve(ROOT, "demo/presets/neutral.css"),
        TOKENS: resolve(ROOT, "src/styles/tokens.css"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_FONT_CANON_ARTIFACT",
            "AV-font-canon",
        ),
    };
    return _cliPaths;
}

/** Lowercase + trim a family token (strip surrounding quotes). */
function norm(name) {
    return name.trim().replace(/^["']|["']$/g, "").toLowerCase();
}

/**
 * Derive the shipped face set: every `@font-face { font-family: "X" }` family
 * name across the injected CSS sources. Pure — the parse set is injected.
 */
export function deriveShipped(cssSources) {
    const shipped = new Set();
    for (const css of cssSources) {
        for (const block of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
            const fam = block[1].match(/font-family\s*:\s*["']([^"']+)["']/);
            if (fam) shipped.add(norm(fam[1]));
        }
    }
    return shipped;
}

/** Split a font-family stack into its component family tokens. */
function splitStack(stack) {
    return stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
}

/**
 * Assert every named family in `stacks` resolves to a shipped face or a
 * generic/system keyword. Pure detector — returns the violation list.
 *
 * @param {{site:string, stack:string}[]} stacks the references to check
 * @param {Set<string>} shipped the derived shipped face set
 */
export function assertReferences(stacks, shipped) {
    const violations = [];
    for (const { site, stack } of stacks) {
        for (const token of splitStack(stack)) {
            const n = norm(token);
            if (!n) continue;
            // A `var(--font-stack-*)` chain reference resolves through the
            // cascade to another token's value (the single-source consolidation:
            // --font-stack-display/-sans alias --font-stack-text). It names no
            // literal face — the canon holds on the aliased token's own stack,
            // which is itself checked. Skip it (NOT an inert literal).
            if (n.startsWith("var(")) continue;
            if (GENERIC.has(n)) continue;
            if (SYSTEM_NAMED.has(n)) continue;
            if (shipped.has(n)) continue;
            violations.push(
                `${site}: "${token}" is neither a shipped @font-face family nor a generic/system keyword (it paints inert)`,
            );
        }
    }
    return violations;
}

// ── Reference extractors (one per source kind) ───────────────────────────────

/** Every quoted `stack: "…"` value in FONT_OPTIONS + DEFAULT_CONFIG.font. */
function defaultsStacks(src) {
    const out = [];
    // FONT_OPTIONS rows + DEFAULT_CONFIG.font slots both use `stack:`/slot: "…".
    // Capture every single-quoted multi-family string that contains a comma OR a
    // quoted family (i.e. a font stack), keyed by a coarse site label.
    for (const m of src.matchAll(/stack:\s*(['"])([\s\S]*?)\1/g)) {
        out.push({ site: "defaults.ts FONT_OPTIONS", stack: m[2] });
    }
    // DEFAULT_CONFIG.font: { serif: '…', sans: '…', display: '…', mono: '…' }
    const fontBlock = src.match(/font:\s*\{([\s\S]*?)\}/);
    if (fontBlock) {
        for (const m of fontBlock[1].matchAll(
            /(serif|sans|display|mono)\s*:\s*(['"])([\s\S]*?)\2/g,
        )) {
            out.push({ site: `defaults.ts DEFAULT_CONFIG.font.${m[1]}`, stack: m[3] });
        }
    }
    return out;
}

/** Every `--font-{serif,sans,display,mono}: …;` value in a preset CSS. */
function presetFontVars(css, label) {
    const out = [];
    for (const m of css.matchAll(
        /--font-(?:serif|sans|display|mono)\s*:\s*([^;]+);/g,
    )) {
        out.push({ site: `${label} ${m[0].split(":")[0].trim()}`, stack: m[1] });
    }
    return out;
}

/** Every `--font-stack-*: …;` value in tokens.css. */
function tokenStacks(css) {
    const out = [];
    for (const m of css.matchAll(/--font-stack-[a-z]+\s*:\s*([^;]+);/g)) {
        out.push({ site: `tokens.css ${m[0].split(":")[0].trim()}`, stack: m[1] });
    }
    return out;
}

function run() {
    const P = cliPaths();
    const facts = {};

    const libFonts = readFileSync(P.FONTS_LIB, "utf8");
    const demoFonts = readFileSync(P.FONTS_DEMO, "utf8");
    const typography = readMonolith(P.ROOT, "typography");
    const shipped = deriveShipped([libFonts, demoFonts, typography]);
    facts.shipped = [...shipped].sort();

    const stacks = [
        ...defaultsStacks(readFileSync(P.DEFAULTS, "utf8")),
        ...presetFontVars(readFileSync(P.NEUTRAL, "utf8"), "neutral.css"),
        ...tokenStacks(readFileSync(P.TOKENS, "utf8")),
    ];
    facts.referenceCount = stacks.length;

    const violations = assertReferences(stacks, shipped);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:font-canon",
        facts,
        violations,
    });

    console.log("proof:font-canon — every font reference names a shipped face or a generic keyword (AV.W10)");
    console.log(`  shipped faces : ${facts.shipped.join(", ")}`);
    console.log(`  references    : ${facts.referenceCount}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
