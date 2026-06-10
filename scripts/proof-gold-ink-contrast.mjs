#!/usr/bin/env node
// D6.b — proof:gold-ink-contrast, the gilt-INK cream-law ② ORACLE.
//
// Mirrors `proof:dark-semantic-contrast` (the dark-mode contrast oracle): a
// SOURCE-RESOLUTION + COMPUTE gate that parses tokens.css, resolves a token from
// BOTH arms, computes a real number, and asserts a floor — NOT a name-grep.
//
// The gilt family adds `--gold-ink` (legible gold-toned TEXT) to the gold quad.
// Gold was minted as a PLATE hue (`--gold-dark` is a backplate color), so a raw
// `--gold-dark` ink does not clear the cream-law ② floor uniformly. `--gold-ink`
// is DERIVED, not guessed, to clear APCA |Lc| ≥ 45 against `--card` in BOTH arms
// (the C-AESTHETIC §1.4 cream-law ② gate). This gate proves the derivation:
//
//   • LIGHT: the `:root` `--gold-ink` oklch over the light `--card`
//     (`var(--neutral-0)` = hsl 48 12% 98% — warm cream) → |Lc| ≥ 45.
//   • DARK : the `.dark` `--gold-ink` oklch over the dark `--card`
//     (hsl 24 8% 10%) → |Lc| ≥ 45.
//
// The compute is self-contained (no external color dep, matching the
// dark-semantic gate's no-dep WCAG math): oklch → OKLab → linear sRGB → gamma
// sRGB, then APCA (the W3 SACAM 0.0.98G-4g constants) for the polarity-aware
// lightness contrast Lc. APCA (not WCAG 2.1) is the cream-law ② metric because
// warm mid-tones on warm paper are exactly where the two disagree.
//
// born-RED if `--gold-ink` is left at raw `--gold-dark` in either arm (the
// reason a NEW token was minted); GREEN at the derived values.
//
// bite-check: set the light `--gold-ink` to a pale `oklch(0.85 …)` → the light
// clause reddens (a pale gold ink vanishes on cream); set the dark `--gold-ink`
// to the deep `--gold-dark` → the dark clause reddens (a dark ink vanishes on
// the near-black plate).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const TOKENS = resolve(ROOT, "src/styles/tokens.css");
const COMMAND = "npm run proof:gold-ink-contrast";

const LC_FLOOR = 45; // cream-law ② — APCA |Lc| ≥ 45 for the gold ink over --card

// ── oklch(L C H) string → sRGB [0..255]×3 ──────────────────────────────────
function parseOklch(str) {
    const m = String(str).trim().match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/i);
    return m ? { L: +m[1], C: +m[2], H: +m[3] } : null;
}
function oklchToLinearSrgb({ L, C, H }) {
    const h = (H * Math.PI) / 180;
    const a = C * Math.cos(h);
    const b = C * Math.sin(h);
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;
    return [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
}
function lin2gamma(c) {
    c = Math.max(0, Math.min(1, c));
    return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
}
function oklchToRgb255(str) {
    const o = parseOklch(str);
    if (!o) return null;
    return oklchToLinearSrgb(o).map((x) => Math.round(lin2gamma(x) * 255));
}

// ── hsl(H S% L%) string → sRGB [0..255]×3 (the --card cream) ────────────────
function hslToRgb255(str) {
    const m = String(str).trim().match(/^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i);
    if (!m) return null;
    const h = +m[1];
    const s = +m[2] / 100;
    const l = +m[3] / 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)].map((x) => Math.round(x * 255));
}

// ── APCA (W3 SACAM 0.0.98G-4g) — polarity-aware lightness contrast Lc ───────
const MAIN_TRC = 2.4;
const R_CO = 0.2126729;
const G_CO = 0.7151522;
const B_CO = 0.072175;
const B_CLIP = 1.414;
const B_THRSH = 0.022;
const SCALE_BOW = 1.14;
const SCALE_WOB = 1.14;
const LO_BOW_OFFSET = 0.027;
const LO_WOB_OFFSET = 0.027;
const DELTA_Y_MIN = 0.0005;
const LO_CLIP = 0.1;

function screenLuminance([r, g, b]) {
    const lin = (c) => (c / 255) ** MAIN_TRC;
    return R_CO * lin(r) + G_CO * lin(g) + B_CO * lin(b);
}
/** APCA Lc for text rgb over background rgb (signed; negative = light-on-dark). */
function apcaLc(txt, bg) {
    let Ytxt = screenLuminance(txt);
    let Ybg = screenLuminance(bg);
    Ytxt = Ytxt > B_THRSH ? Ytxt : Ytxt + (B_THRSH - Ytxt) ** B_CLIP;
    Ybg = Ybg > B_THRSH ? Ybg : Ybg + (B_THRSH - Ybg) ** B_CLIP;
    if (Math.abs(Ybg - Ytxt) < DELTA_Y_MIN) return 0;
    let out;
    if (Ybg > Ytxt) {
        const sapc = (Ybg ** 0.56 - Ytxt ** 0.57) * SCALE_BOW;
        out = sapc < LO_CLIP ? 0 : sapc - LO_BOW_OFFSET;
    } else {
        const sapc = (Ybg ** 0.65 - Ytxt ** 0.62) * SCALE_WOB;
        out = sapc > -LO_CLIP ? 0 : sapc + LO_WOB_OFFSET;
    }
    return out * 100;
}

// ── tokens.css resolvers (the :root light arm + the .dark block) ────────────
/** Resolve a token from the FIRST `:root`/top-level light declaration. */
function lightValue(src, token) {
    // The light `--card` reads `var(--neutral-0)`; chase one var() hop.
    const re = new RegExp(`(?:^|\\n)\\s*--${token}\\s*:\\s*([^;]+?)\\s*;`);
    const m = src.match(re);
    return m ? m[1].trim() : null;
}
/** Resolve a token from the `.dark { … }` block (the dark arm floor). */
function darkValue(src, token) {
    const block = src.match(/\.dark\s*\{([\s\S]*?)\n\}/);
    if (!block) return null;
    const re = new RegExp(`--${token}\\s*:\\s*([^;]+?)\\s*;`);
    const m = block[1].match(re);
    return m ? m[1].trim() : null;
}
/** Chase a single `var(--x)` hop in the light arm (for `--card: var(--neutral-0)`). */
function resolveVarHop(src, value, arm) {
    const m = String(value).match(/^var\(\s*--([\w-]+)\s*\)$/);
    if (!m) return value;
    return arm === "dark" ? darkValue(src, m[1]) : lightValue(src, m[1]);
}

export function detect() {
    const violations = [];
    const facts = {};

    if (!existsSync(TOKENS)) {
        return { facts, violations: ["src/styles/tokens.css is absent"] };
    }
    const src = readFileSync(TOKENS, "utf8");

    // The two arms.
    const arms = [
        { name: "light", inkRaw: lightValue(src, "gold-ink"), cardRaw: lightValue(src, "card"), resolveArm: "light" },
        { name: "dark", inkRaw: darkValue(src, "gold-ink"), cardRaw: darkValue(src, "card"), resolveArm: "dark" },
    ];

    facts.arms = {};
    for (const arm of arms) {
        const inkRgb = arm.inkRaw ? oklchToRgb255(arm.inkRaw) : null;
        const cardResolved = resolveVarHop(src, arm.cardRaw, arm.resolveArm);
        const cardRgb = cardResolved ? hslToRgb255(cardResolved) : null;

        const entry = { ink: arm.inkRaw, card: cardResolved, inkRgb, cardRgb };

        if (!arm.inkRaw) {
            violations.push(`could not resolve the ${arm.name} \`--gold-ink\` token`);
        } else if (!inkRgb) {
            violations.push(`the ${arm.name} \`--gold-ink\` "${arm.inkRaw}" is not a plain oklch() color — the APCA compute needs a concrete color`);
        }
        if (!cardRgb) {
            violations.push(`could not resolve the ${arm.name} \`--card\` to a plain hsl() color (got "${cardResolved}")`);
        }

        if (inkRgb && cardRgb) {
            const lc = apcaLc(inkRgb, cardRgb);
            entry.lc = Number(lc.toFixed(1));
            entry.absLc = Number(Math.abs(lc).toFixed(1));
            if (Math.abs(lc) < LC_FLOOR) {
                violations.push(
                    `the ${arm.name} \`--gold-ink\` is |Lc| ${Math.abs(lc).toFixed(1)} over \`--card\` — under the cream-law ② floor (|Lc| ≥ ${LC_FLOOR}); deepen (light) / lift (dark) the ink`,
                );
            }
        }
        facts.arms[arm.name] = entry;
    }

    return { facts, violations };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_GOLD_INK_CONTRAST_ARTIFACT", "D6-gold-ink-contrast");
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:gold-ink-contrast",
        facts,
        violations,
    });

    console.log("proof:gold-ink-contrast — `--gold-ink` clears cream-law ② (APCA |Lc| ≥ 45) on `--card` both arms (D6.b)");
    for (const [name, e] of Object.entries(facts.arms ?? {})) {
        console.log(
            `  ${name.padEnd(5)}: gold-ink ${e.ink}  rgb ${JSON.stringify(e.inkRgb)}  vs --card ${e.card}  →  |Lc| ${e.absLc} (floor ${LC_FLOOR})`,
        );
    }
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
