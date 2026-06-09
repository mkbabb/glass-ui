#!/usr/bin/env node
// AX.W44 — proof:dark-semantic-contrast (Arm A), the dark-mode semantic-token
// contrast ORACLE over the parsed tokens.css cascade (device-free SOURCE/STRUCTURE).
//
// D10's root cause: the dark `--destructive` shipped as the unmodified shadcn-vue
// stock PLATE value `hsl(0 62.8% 30.6%)` (L≈30.6 — calibrated as a saturated plate
// under a light foreground), but glass-ui's Alert destructive variant uses
// `--destructive` AS INK over a card (`alert/index.ts` `text-destructive`). At HEAD
// the resolved dark `--destructive` is 1.75:1 over `--card` (far under the 4.5 body
// floor) and 1.91:1 vs the dark page (under the 3.0 non-text graphic floor) — the
// user's illegible "Session expired" Alert. NO gate guarded it.
//
// This gate PARSES tokens.css, RESOLVES the dark `--destructive` from BOTH the
// `light-dark()` enhancement arm AND the `.dark` class fallback floor (asserting the
// two carry the SAME dark value — the §2c lockstep), RESOLVES the dark `--card` and
// the dark page, COMPUTES the WCAG 2.1 sRGB-relative-luminance contrast (the
// canonical hsl→rgb→linearize→luminance→ratio formula, NO external dep), and ASSERTS:
//   • dark `--destructive` (ink role)  vs `--card` ≥ 4.6:1   (the Alert ink floor)
//   • dark `--destructive` (plate role) vs the page ≥ 5.0:1   (the Toast/Badge plate)
// Under the two-token split it asserts `--destructive-text` ≥4.6 over card AND
// `--destructive` ≥5 vs page.
//
// It also SWEEPS the sibling reds (`--like`/`--delete`/`--accent-red`): for each, if
// a `text-[var(--X)]`-over-card consumer EXISTS in src/ (grep), assert ≥4.5 over
// `--card`; else RECORD the disposition `plate/icon-role, no text-over-card consumer`
// (the recorded disposition — not a forced fix).
//
// This is a SOURCE-RESOLUTION + COMPUTE gate (it resolves the token cascade and
// computes a number — a precept-valid artefact form, NOT "grep found a string for
// runtime behaviour"). BORN-RED at HEAD (1.75 over card / 1.91 vs page); GREEN after
// the lift.
//
// bite-check: revert the dark arm to `hsl(0 62.8% 30.6%)` → the gate reddens; desync
// the light-dark() dark arg from the `.dark` floor → the lockstep clause reddens.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const TOKENS = resolve(ROOT, "src/styles/tokens.css");
const SRC_DIR = resolve(ROOT, "src");
const COMMAND = "npm run proof:dark-semantic-contrast";

// The WCAG floors.
const INK_FLOOR = 4.6; // body-text ink over --card (the 4.5 floor + headroom)
const PLATE_FLOOR = 5.0; // saturated plate vs the dark page (the 3.0 graphic floor + headroom)
const SIBLING_INK_FLOOR = 4.5; // a sibling red, IF a text-over-card consumer exists

// ── WCAG 2.1 sRGB contrast (hsl → rgb → linearize → relative luminance → ratio) ──

/** Parse an `hsl(H S% L%)` (space-separated, no commas) into [h,s,l] numbers. */
function parseHsl(str) {
    const m = str
        .trim()
        .match(/^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i);
    if (!m) return null;
    return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/** hsl([0..360], [0..100], [0..100]) → rgb [0..255]×3 (the canonical conversion). */
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)].map((x) => Math.round(x * 255));
}

/** sRGB channel [0..255] → linear-light [0..1] (the WCAG 2.1 linearization). */
function linearize(c) {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance from an rgb triple. */
function relLuminance([r, g, b]) {
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** WCAG 2.1 contrast ratio between two rgb triples. */
function contrastRatio(rgbA, rgbB) {
    const lA = relLuminance(rgbA);
    const lB = relLuminance(rgbB);
    const hi = Math.max(lA, lB);
    const lo = Math.min(lA, lB);
    return (hi + 0.05) / (lo + 0.05);
}

/** hsl(...) string → rgb (null if not a plain space-separated hsl color). */
function hslStrToRgb(str) {
    const hsl = parseHsl(str);
    return hsl ? hslToRgb(hsl[0], hsl[1], hsl[2]) : null;
}

// ── tokens.css resolvers ──────────────────────────────────────────────────────

/**
 * Resolve the DARK half of a `light-dark(light, dark)` declaration for a token.
 * Returns the raw dark arg string (e.g. "hsl(0 80% 60%)"). The args may themselves
 * carry nested parens (`hsl(...)`, `var(...)`), so we capture the whole declaration
 * up to the `;` then balance-scan the `light-dark(...)` body and split on the
 * top-level comma (a naive `[^,]`/`[^)]` regex breaks on the inner `hsl(...)`).
 */
function darkArgFromLightDark(src, token) {
    // Match the `light-dark()` declaration specifically (the token also has a plain
    // light `:root` declaration earlier in the file — match the light-dark form).
    const decl = src.match(
        new RegExp(`--${token}\\s*:\\s*(light-dark\\([^;]+);`),
    );
    if (!decl) return null;
    const value = decl[1].trim();
    const open = value.indexOf("light-dark(");
    if (open === -1) return null;
    let depth = 0;
    let commaAt = -1;
    let end = -1;
    for (let i = open + "light-dark(".length - 1; i < value.length; i++) {
        const ch = value[i];
        if (ch === "(") depth++;
        else if (ch === ")") {
            depth--;
            if (depth === 0) {
                end = i;
                break;
            }
        } else if (ch === "," && depth === 1 && commaAt === -1) {
            commaAt = i;
        }
    }
    if (commaAt === -1 || end === -1) return null;
    return value.slice(commaAt + 1, end).trim();
}

/**
 * Resolve a token's value from the `.dark` class fallback block. We scope to the
 * `.dark {` block so the light :root declaration of the same token is not matched.
 */
function darkClassValue(src, token) {
    const block = src.match(/\.dark\s*\{([\s\S]*?)\n\}/);
    if (!block) return null;
    const re = new RegExp(`--${token}\\s*:\\s*([^;]+?)\\s*;`);
    const m = block[1].match(re);
    return m ? m[1].trim() : null;
}

/** Grep src/ for a `text-[var(--X)]`-over-card consumer of a sibling red. */
function hasTextVarConsumer(token) {
    const needle = `text-[var(--${token})]`;
    const stack = [SRC_DIR];
    while (stack.length) {
        const dir = stack.pop();
        for (const ent of readdirSync(dir, { withFileTypes: true })) {
            const p = resolve(dir, ent.name);
            if (ent.isDirectory()) {
                stack.push(p);
            } else if (/\.(vue|ts|css)$/.test(ent.name)) {
                if (readFileSync(p, "utf8").includes(needle)) return true;
            }
        }
    }
    return false;
}

export function detect() {
    const violations = [];
    const facts = {};

    if (!existsSync(TOKENS)) {
        return { facts, violations: ["src/styles/tokens.css is absent"] };
    }
    const src = readFileSync(TOKENS, "utf8");

    // ── 1. Resolve the dark --destructive from BOTH arms + assert the §2c lockstep.
    const ldArg = darkArgFromLightDark(src, "destructive");
    const classVal = darkClassValue(src, "destructive");
    facts.lightDarkDarkArg = ldArg;
    facts.darkClassValue = classVal;

    if (!ldArg) {
        violations.push(
            "could not resolve the dark arg of the `--destructive` light-dark() enhancement arm",
        );
    }
    if (!classVal) {
        violations.push(
            "could not resolve `--destructive` from the .dark class fallback block",
        );
    }
    // The lockstep: the two arms MUST carry the SAME dark value (else a
    // @supports-split engine sees a different red than a class-toggle one).
    if (ldArg && classVal) {
        facts.lockstep = ldArg === classVal;
        if (!facts.lockstep) {
            violations.push(
                `§2c lockstep BROKEN: the light-dark() dark arg "${ldArg}" ≠ the .dark floor "${classVal}" — a @supports-split engine and a class-toggle engine would paint DIFFERENT dark reds`,
            );
        }
    }

    // Two-token detection: if `--destructive-text` exists in the dark arms, the ink
    // assertion runs against IT and `--destructive` keeps the plate role.
    const inkLdArg = darkArgFromLightDark(src, "destructive-text");
    const inkClassVal = darkClassValue(src, "destructive-text");
    const twoToken = !!(inkLdArg || inkClassVal);
    facts.twoTokenSplit = twoToken;

    // ── 2. Resolve the dark --card + the dark page (--background / neutral-0).
    // The dark --card folds onto `light-dark(var(--neutral-0), hsl(24 8% 10%))`; the
    // .dark floor declares `--card: hsl(24 8% 10%)`. The page is the dark
    // `--neutral-0` / `--background` (`hsl(24 8% 6%)`).
    const cardDark =
        darkClassValue(src, "card") ?? darkArgFromLightDark(src, "card");
    const pageDark =
        darkClassValue(src, "neutral-0") ?? darkArgFromLightDark(src, "neutral-0");
    facts.cardDark = cardDark;
    facts.pageDark = pageDark;

    const cardRgb = cardDark ? hslStrToRgb(cardDark) : null;
    const pageRgb = pageDark ? hslStrToRgb(pageDark) : null;
    if (!cardRgb) {
        violations.push(
            `could not resolve the dark --card to a plain hsl() color (got "${cardDark}")`,
        );
    }
    if (!pageRgb) {
        violations.push(
            `could not resolve the dark page (--neutral-0/--background) to a plain hsl() color (got "${pageDark}")`,
        );
    }

    // ── 3. Compute + assert the contrast floors.
    // The INK role: --destructive-text (two-token) else --destructive, over --card.
    const inkVal = twoToken ? (inkClassVal ?? inkLdArg) : classVal;
    // The PLATE role: --destructive (always), vs the page.
    const plateVal = classVal;

    const inkRgb = inkVal ? hslStrToRgb(inkVal) : null;
    const plateRgb = plateVal ? hslStrToRgb(plateVal) : null;

    if (inkRgb && cardRgb) {
        const r = contrastRatio(inkRgb, cardRgb);
        facts.inkOverCard = Number(r.toFixed(2));
        facts.inkToken = twoToken ? "--destructive-text" : "--destructive";
        if (r < INK_FLOOR) {
            violations.push(
                `the dark ${facts.inkToken} (ink role) is ${r.toFixed(2)}:1 over --card — under the ${INK_FLOOR}:1 body floor (the illegible "Session expired" Alert title; lift the dark red)`,
            );
        }
    } else if (inkVal) {
        facts.inkToken = twoToken ? "--destructive-text" : "--destructive";
        violations.push(
            `could not resolve the dark ${facts.inkToken} ink value to a plain hsl() color (got "${inkVal}") — the WCAG compute needs a concrete color`,
        );
    }

    if (plateRgb && pageRgb) {
        const r = contrastRatio(plateRgb, pageRgb);
        facts.plateVsPage = Number(r.toFixed(2));
        if (r < PLATE_FLOOR) {
            violations.push(
                `the dark --destructive (plate role) is ${r.toFixed(2)}:1 vs the page — under the ${PLATE_FLOOR}:1 plate target (the muddy dark rectangle off the page; lift the dark red)`,
            );
        }
    }

    // ── 4. Sibling-red sweep (--like / --delete / --accent-red): assert ≥4.5 over
    // --card ONLY if a text-[var(--X)]-over-card consumer exists; else record the
    // plate/icon disposition (not a forced fix).
    const siblings = ["like", "delete", "accent-red"];
    facts.siblings = {};
    for (const token of siblings) {
        const hasConsumer = hasTextVarConsumer(token);
        const value = darkClassValue(src, token);
        const entry = {
            value,
            textOverCardConsumer: hasConsumer,
            disposition: hasConsumer
                ? "text-over-card consumer EXISTS — AA-asserted"
                : "plate/icon-role, no text-over-card consumer (recorded disposition)",
        };
        if (hasConsumer) {
            const rgb = value ? hslStrToRgb(value) : null;
            if (rgb && cardRgb) {
                const r = contrastRatio(rgb, cardRgb);
                entry.ratioOverCard = Number(r.toFixed(2));
                if (r < SIBLING_INK_FLOOR) {
                    violations.push(
                        `the dark --${token} has a text-[var(--${token})]-over-card consumer but is ${r.toFixed(2)}:1 over --card — under the ${SIBLING_INK_FLOOR}:1 floor`,
                    );
                }
            } else {
                // oklch / non-plain-hsl sibling with a text-over-card consumer — the
                // WCAG compute needs an sRGB color; flag so it is not silently passed.
                entry.ratioOverCard = null;
                violations.push(
                    `the dark --${token} has a text-[var(--${token})]-over-card consumer but is not a plain hsl() color (got "${value}") — cannot WCAG-verify; convert it or remove the over-card consumer`,
                );
            }
        }
        facts.siblings[token] = entry;
    }

    return { facts, violations };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DARK_SEMANTIC_CONTRAST_ARTIFACT",
        "AX-dark-semantic-contrast",
    );
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts,
        violations,
    });

    console.log(
        "proof:dark-semantic-contrast — the dark `--destructive` clears the ink + plate WCAG floors (AX.W44, Arm A)",
    );
    console.log(`  light-dark() dark arg : ${facts.lightDarkDarkArg}`);
    console.log(`  .dark class floor     : ${facts.darkClassValue}`);
    console.log(`  §2c lockstep          : ${facts.lockstep ? "yes ✓" : "NO ✗"}`);
    console.log(`  two-token split       : ${facts.twoTokenSplit ? "yes" : "no (single-token path)"}`);
    console.log(
        `  ${facts.inkToken ?? "--destructive"} over --card : ${facts.inkOverCard}:1 (floor ${INK_FLOOR})`,
    );
    console.log(`  --destructive vs page : ${facts.plateVsPage}:1 (floor ${PLATE_FLOOR})`);
    for (const [t, e] of Object.entries(facts.siblings ?? {})) {
        console.log(`  sibling --${t.padEnd(11)}: ${e.disposition}`);
    }
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
