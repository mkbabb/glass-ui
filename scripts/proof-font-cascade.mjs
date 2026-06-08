#!/usr/bin/env node
// AX.W22 — the font-cascade gate (proof:font-cascade).
//
// The library DEFAULT body/display register must EQUAL the register the demo
// and consumers actually paint — Plus Jakarta Sans (text/display) + Fira Code
// (mono), with NO preset opt-out and NO body-defaults-to-a-non-shipped-serif.
// Before this gate the default pointed `--font-stack-display` / the body
// register at Fraunces / Computer Modern — faces with NO shipped `@font-face`,
// so the cascade fell through to a system serif (Georgia) that no live surface
// renders, while a `data-typography-preset="brand-uniform-sans"` escape-hatch
// bolted the brand register back on. The two prior static font gates were blind
// to this: a name-legality check tolerates Georgia, and a woff2-axis check only
// reads the binary — neither asserts which face the CASCADE resolves.
//
// This gate has two arms:
//
//   SOURCE / STRUCTURE (device-free — hard-REDs on EVERY runner):
//     1. The default body register reads `--font-text` (the brand text token),
//        NOT a `--font-serif` that points at a non-shipped face.
//     2. `--font-stack-text` + `--font-stack-display` name the SHIPPED brand
//        face (Plus Jakarta Sans) as their first family — the default IS the
//        rendered register.
//     3. NO `data-typography-preset` opt-out re-points the default away from the
//        brand register (the escape-hatch is collapsed).
//     4. Every NAMED family across the `--font-stack-*` tokens, the demo
//        configurator FONT_OPTIONS / DEFAULT_CONFIG.font, and the demo presets
//        resolves to a SHIPPED `@font-face` OR a generic/system keyword (the
//        necessary-only font-canon static pre-check, folded in). A reference to
//        a non-shipped named face → RED (it paints inert).
//     5. `.cm-serif` survives on the distinct `--font-serif` math register and
//        that register is NOT Fraunces / not the brand text face.
//
//   π-LANE LIVE (fail-CLOSED — runs IFF the tests-visual workspace is present):
//     loads the demo, awaits `document.fonts.ready`, reads `getComputedStyle`
//     on `body` / `.text-display-*` / `.fira-code` / `.text-admin-label`, and
//     asserts the resolved first-loaded face matches the intended register via a
//     canvas glyph-width fingerprint (the real face vs a metric-matched
//     fallback). The orchestrator runs this arm on the real Metal device — this
//     script DELEGATES to `tests-visual/font-cascade.spec.ts` when present and
//     hard-REDs if the workspace exists but the spec is missing.
//
// inv ε / bite-check: point `--font-stack-display` at a non-shipped face
// (Fraunces) → RED; point the body register at a `--font-serif` that names a
// non-shipped face → RED; re-add a `data-typography-preset` opt-out → RED;
// re-add a non-shipped face to FONT_OPTIONS → RED. The reconciled brand-default
// register → GREEN.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

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

// Platform-native faces that exist on the host OS by name — paintable without a
// web-font. A tight allowlist so a stale brand face cannot hide here.
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

// The shipped brand face the default register MUST name. The whole point of the
// wave: the default IS this rendered register.
const BRAND_TEXT_FACE = "plus jakarta sans";

// Faces that are categorically off-canon for the DEFAULT register — the inert
// substrate this wave excised. A default that names one is the born-RED defect.
const OFF_CANON_DEFAULT = new Set([
    "fraunces",
    "computer modern serif",
    "latin modern roman",
    "cmu serif",
]);

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        TOKENS: resolve(ROOT, "src/styles/tokens.css"),
        THEME: resolve(ROOT, "src/styles/theme.css"),
        TYPOGRAPHY: resolve(ROOT, "src/styles/typography.css"),
        FONTS_LIB: resolve(ROOT, "src/styles/fonts.css"),
        FONTS_DEMO: resolve(ROOT, "demo/demo.css"),
        DEFAULTS: resolve(ROOT, "demo/configurator/preset-editor/defaults.ts"),
        NEUTRAL: resolve(ROOT, "demo/presets/neutral.css"),
        INDEX_HTML: resolve(ROOT, "index.html"),
        // The π-lane workspace + its font-cascade spec (live arm; fail-closed).
        VISUAL_DIR: resolve(ROOT, "tests-visual"),
        VISUAL_SPEC: resolve(ROOT, "tests-visual/font-cascade.spec.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_FONT_CASCADE_ARTIFACT",
            "AX-font-cascade",
        ),
    };
    return _cliPaths;
}

/** Lowercase + trim a family token (strip surrounding quotes). */
export function norm(name) {
    return name.trim().replace(/^["']|["']$/g, "").toLowerCase();
}

/** Split a font-family stack into its component family tokens. */
export function splitStack(stack) {
    return stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
}

/** The value of a `--token: …;` declaration in a CSS body, or null. */
export function tokenValue(css, token) {
    const re = new RegExp(`${token}\\s*:\\s*([^;]+);`);
    const m = css.match(re);
    return m ? m[1].trim() : null;
}

/**
 * Every `@font-face { font-family: "X" }` family name across the CSS sources.
 * Pure — the parse set is injected.
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

/** Every `--font-stack-*: …;` value in tokens.css. */
export function tokenStacks(css) {
    const out = [];
    for (const m of css.matchAll(/--font-stack-[a-z]+\s*:\s*([^;]+);/g)) {
        out.push({ site: `tokens.css ${m[0].split(":")[0].trim()}`, stack: m[1] });
    }
    return out;
}

/** Every quoted `stack: "…"` + DEFAULT_CONFIG.font slot in defaults.ts. */
export function defaultsStacks(src) {
    const out = [];
    for (const m of src.matchAll(/stack:\s*(['"])([\s\S]*?)\1/g)) {
        out.push({ site: "defaults.ts FONT_OPTIONS", stack: m[2] });
    }
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

/** Every `--font-{text,serif,sans,display,mono}: …;` value in a preset CSS. */
export function presetFontVars(css, label) {
    const out = [];
    for (const m of css.matchAll(
        /--font-(?:text|serif|sans|display|mono)\s*:\s*([^;]+);/g,
    )) {
        out.push({ site: `${label} ${m[0].split(":")[0].trim()}`, stack: m[1] });
    }
    return out;
}

// ── Default-register detectors (the W22 reconciliation core) ──────────────────

/**
 * The font-family the `body {}` rule reads, normalized to its token name
 * (e.g. `var(--font-text)` → `--font-text`). Pure.
 */
export function bodyFontToken(typography) {
    const m = typography.match(/\bbody\s*\{[^}]*?font-family\s*:\s*([^;]+);/s);
    if (!m) return null;
    const v = m[1].trim();
    const tok = v.match(/var\(\s*(--[a-z-]+)\s*\)/);
    return tok ? tok[1] : v;
}

/**
 * Assert the DEFAULT register IS the brand rendered register. Pure detector
 * over the token + body sources — returns the violation list.
 */
export function assertDefaultRegister({ tokens, typography, indexHtml }) {
    const violations = [];

    // (1) body reads the brand text register.
    const bodyTok = bodyFontToken(typography);
    if (bodyTok !== "--font-text") {
        violations.push(
            `body{} reads ${bodyTok ?? "(none)"} — the default body register must be --font-text (the brand text token), not a serif register a live surface does not render`,
        );
    }

    // (2) the default text + display tokens name the shipped brand face first.
    for (const tok of ["--font-stack-text", "--font-stack-display"]) {
        const val = tokenValue(tokens, tok);
        if (!val) {
            violations.push(`${tok} is not declared in tokens.css`);
            continue;
        }
        const first = norm(splitStack(val)[0] ?? "");
        if (first !== BRAND_TEXT_FACE) {
            violations.push(
                `${tok} first family is "${first}" — the default register must lead with the shipped brand face "${BRAND_TEXT_FACE}" (default == rendered)`,
            );
        }
        for (const token of splitStack(val)) {
            if (OFF_CANON_DEFAULT.has(norm(token))) {
                violations.push(
                    `${tok} names off-canon "${token}" — an inert face no live surface renders (the excised substrate)`,
                );
            }
        }
    }

    // (3) no data-typography-preset escape-hatch re-points the default.
    if (/data-typography-preset/.test(typography)) {
        violations.push(
            "typography.css carries a `data-typography-preset` opt-out — the escape-hatch must be collapsed once the default IS the brand register",
        );
    }
    if (/data-typography-preset/.test(indexHtml)) {
        violations.push(
            "index.html carries a `data-typography-preset` attr — the demo must render the real default with no override",
        );
    }

    return violations;
}

/**
 * Assert `.cm-serif` survives on a distinct serif register that is NOT the
 * brand text face nor an off-canon excised face. Pure.
 */
export function assertMathVoice({ tokens, typography }) {
    const violations = [];
    const cm = typography.match(/@utility\s+cm-serif\s*\{([^}]*)\}/);
    if (!cm) {
        violations.push(".cm-serif utility was collateral-deleted — it is the distinct math/serif voice and must survive the excise");
        return violations;
    }
    const fam = cm[1].match(/font-family\s*:\s*([^;]+);/);
    const famTok = fam ? fam[1].trim() : null;
    if (famTok !== "var(--font-serif)") {
        violations.push(`.cm-serif reads ${famTok ?? "(none)"} — it must ride the distinct --font-serif math register`);
    }
    const serif = tokenValue(tokens, "--font-stack-serif");
    if (serif) {
        const first = norm(splitStack(serif)[0] ?? "");
        if (first === BRAND_TEXT_FACE) {
            violations.push("--font-stack-serif leads with the brand text face — the math voice must stay a DISTINCT serif");
        }
        for (const token of splitStack(serif)) {
            if (OFF_CANON_DEFAULT.has(norm(token))) {
                violations.push(`--font-stack-serif names off-canon "${token}" — the excised substrate cannot survive on the math register`);
            }
        }
    }
    return violations;
}

function runSourceArm() {
    const P = cliPaths();
    const facts = {};
    const violations = [];

    const tokens = readFileSync(P.TOKENS, "utf8");
    const typography = readFileSync(P.TYPOGRAPHY, "utf8");
    const indexHtml = existsSync(P.INDEX_HTML) ? readFileSync(P.INDEX_HTML, "utf8") : "";

    // Shipped-face set: every @font-face family across the binary + fallback +
    // demo CSS.
    const shipped = deriveShipped([
        readFileSync(P.FONTS_LIB, "utf8"),
        readFileSync(P.FONTS_DEMO, "utf8"),
        typography,
    ]);
    facts.shipped = [...shipped].sort();

    // (1)–(3) the default-register reconciliation.
    violations.push(...assertDefaultRegister({ tokens, typography, indexHtml }));
    // (5) the .cm-serif math-voice survival.
    violations.push(...assertMathVoice({ tokens, typography }));

    // (4) the necessary-only canon pre-check across every named reference.
    const stacks = [
        ...tokenStacks(tokens),
        ...defaultsStacks(readFileSync(P.DEFAULTS, "utf8")),
        ...presetFontVars(readFileSync(P.NEUTRAL, "utf8"), "neutral.css"),
    ];
    facts.referenceCount = stacks.length;
    violations.push(...assertReferences(stacks, shipped));

    facts.bodyToken = bodyFontToken(typography);
    facts.defaultText = tokenValue(tokens, "--font-stack-text");
    facts.defaultDisplay = tokenValue(tokens, "--font-stack-display");
    facts.mathSerif = tokenValue(tokens, "--font-stack-serif");

    return { facts, violations };
}

// ── π-lane live arm (fail-CLOSED) ────────────────────────────────────────────

/**
 * The live arm is BINDING only when the tests-visual workspace is present (the
 * orchestrator runs it on the real device). Absent the workspace, the
 * device-free source arm is the binding gate and the live arm is reported
 * `skipped` (no browser binary on this runner). If the workspace EXISTS but the
 * font-cascade spec is missing, that is a fail-CLOSED RED — the lane was scoped
 * without its consumer.
 */
function liveArmStatus() {
    const P = cliPaths();
    if (!existsSync(P.VISUAL_DIR)) {
        return {
            status: "skipped",
            note: "no tests-visual workspace on this runner — the device-free source arm is binding; orchestrator runs the live arm on the Metal device",
        };
    }
    if (!existsSync(P.VISUAL_SPEC)) {
        return {
            status: "fail",
            note: "tests-visual workspace present but tests-visual/font-cascade.spec.ts is MISSING — the π-lane font-cascade consumer was not authored (fail-closed)",
        };
    }
    return {
        status: "present",
        note: "tests-visual/font-cascade.spec.ts present — orchestrator executes it on the Metal device (live getComputedStyle + canvas width-fingerprint)",
    };
}

function run() {
    const P = cliPaths();
    const { facts, violations } = runSourceArm();
    const live = liveArmStatus();
    facts.liveArm = live;

    // The live arm RED (workspace present but spec missing) folds into the gate.
    const allViolations = [...violations];
    if (live.status === "fail") allViolations.push(`π-lane: ${live.note}`);

    const status = allViolations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:font-cascade",
        facts,
        violations: allViolations,
    });

    console.log("proof:font-cascade — the library DEFAULT font register IS the rendered register (AX.W22)");
    console.log(`  body token     : ${facts.bodyToken}`);
    console.log(`  default text   : ${facts.defaultText}`);
    console.log(`  default display: ${facts.defaultDisplay}`);
    console.log(`  math serif     : ${facts.mathSerif}`);
    console.log(`  shipped faces  : ${facts.shipped.join(", ")}`);
    console.log(`  references     : ${facts.referenceCount}`);
    console.log(`  live arm       : ${live.status} — ${live.note}`);
    if (allViolations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of allViolations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
