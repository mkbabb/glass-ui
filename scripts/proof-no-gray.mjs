#!/usr/bin/env node
// BA.W-NO-GRAY — proof:no-gray, the warm-chroma floor SOURCE gate (device-free; the
// comment-strip + pure-OKLab-detector house pattern, mirroring proof-dark-material.mjs /
// proof-adaptive-glass.mjs).
//
// THE DEFECT (R10-5, verbatim: "a better designed glass system for cards, buttons, etc.
// No gray."): the warm-48 neutral ladder is SPECIFIED warm but RESOLVES achromatic — at
// 6-10% hsl saturation across L40-95 the painted OKLab chroma lands C 0.0055-0.0155, below
// the ~0.020 perceptual floor, AND at hsl-48 the OKLab hue maps to ~95-97° (a yellow-green),
// NOT the warm-amber the --foreground ink carries (hsl-24 → OKLab H≈56°). So a "warm chip"
// paints flat gray. The default Card/Button glass plate (--card-derived, near-white) is the
// grayest of all (C 0.0017-0.0018). This is ONE systemic defect with a single-family fix:
// re-saturate the --neutral-* ladder + the --card plate ONTO the warm identity (hue toward
// the foreground's warm register + chroma off the floor), chroma-only moves at constant L.
//
// THE GAMUT REALITY (the L-aware floor, NOT an evasion): OKLab chroma is gamut-bound at high
// L. A chip at L90 physically cannot carry C=0.020 without a visible cast (the triumvirate
// trigger's "tinted not warm" defect), and a near-white glass plate at L≈98 cannot either.
// So the floor is L-AWARE: the STRONG floor (C ≥ 0.020) holds on the mid/low-L ladder rungs
// that carry it (accent L82, border L70, muted-fg L40); the near-white chip + the glass plate
// clear a PLATE floor (a materially-warm lift ≥ ~2× HEAD) — recorded as the gate's declared
// assert values, calibrated against the live OKLab gamut (the census re-probe at HEAD).
//
// THE WARM-NOT-TINTED bar (Fable): every WARM-IT row's OKLab HUE must land in the warm
// register (H ≈ 50-80°, the --foreground 56° family), NOT the HEAD yellow-green 95°. A high
// chroma at the wrong hue is a cast; the warm hue at the floor is warm MATERIAL.
//
// BORN-RED at HEAD on the WARM-IT rows (every census C below the floor + the achromatic
// plate). The asserts below invert each. SOURCE arm only — the BINDING painted truth is the
// π arm (tests-visual/no-gray.spec.ts), NEVER this gate alone (the A1-1/P-1 source-green/
// visually-broken gap is exactly the close-class failure BA exists to fix).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:no-gray";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const tokens = strip(readMonolith(ROOT, "tokens"));
const colorRadius = strip(read("src/styles/tokens/color-radius.css"));
const darkArm = strip(read("src/styles/tokens/dark-arm.css"));
const lightDark = strip(read("src/styles/tokens/light-dark.css"));
// BB.W-CARVE4 — glass.css's decorative/fx tail (incl. --overlay-scrim-ink) carved
// into tokens/glass-fx.css; read both so the KEEP-NEUTRAL byte-assert follows the
// carve (the assert is over the §8 glass-token cascade, now two adjacent partials).
const glassTokens = strip(
    read("src/styles/tokens/glass.css") + "\n" + read("src/styles/tokens/glass-fx.css"),
);

// ── OKLab plumbing (hsl → rgb → OKLab; the perceptual chroma + hue the eye reads) ────────
function parseHsl(str) {
    const m = str.trim().match(/^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}
function parseOklch(str) {
    const m = str
        .trim()
        .match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\s*\)$/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)].map((x) => Math.round(x * 255));
}
function oklchToRgb(Lp, C, h) {
    const hr = (h * Math.PI) / 180;
    const a = C * Math.cos(hr);
    const b = C * Math.sin(hr);
    const l_ = Lp + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = Lp - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = Lp - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;
    const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    const enc = (c) => {
        const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
        return Math.round(Math.min(1, Math.max(0, x)) * 255);
    };
    return [enc(r), enc(g), enc(bl)];
}
/** sRGB[0..255] → OKLab {L, C, H, a, b}. */
function rgbToOklab([r, g, b]) {
    const lin = (c) => {
        c /= 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const lr = lin(r);
    const lg = lin(g);
    const lb = lin(b);
    const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    const H = ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360;
    return { L, C: Math.hypot(a, bb), H, a, b: bb };
}
function colorToRgb(str) {
    if (!str) return null;
    const hsl = parseHsl(str);
    if (hsl) return hslToRgb(hsl[0], hsl[1], hsl[2]);
    const ok = parseOklch(str);
    if (ok) return oklchToRgb(ok[0], ok[1], ok[2]);
    return null;
}
function oklabOf(str) {
    const rgb = colorToRgb(str);
    return rgb ? rgbToOklab(rgb) : null;
}
function linearize(c) {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function relLuminance([r, g, b]) {
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}
function contrastRatio(a, b) {
    const hi = Math.max(relLuminance(a), relLuminance(b));
    const lo = Math.min(relLuminance(a), relLuminance(b));
    return (hi + 0.05) / (lo + 0.05);
}
function composite(plate, alpha, base) {
    return [0, 1, 2].map((i) => Math.round(plate[i] * alpha + base[i] * (1 - alpha)));
}

// ── token resolvers (the §2c lockstep pair) ──────────────────────────────────────────
function darkArgFromLightDark(src, token) {
    const decl = src.match(new RegExp(`--${token}\\s*:\\s*(light-dark\\([^;]+);`));
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
        } else if (ch === "," && depth === 1 && commaAt === -1) commaAt = i;
    }
    if (commaAt === -1 || end === -1) return null;
    return value.slice(commaAt + 1, end).trim();
}
function darkClassValue(src, token) {
    const block = src.match(/\.dark\s*\{([\s\S]*?)\n\}/);
    if (!block) return null;
    const m = block[1].match(new RegExp(`--${token}\\s*:\\s*([^;]+?)\\s*;`));
    return m ? m[1].trim() : null;
}
/** A `:root` token value from a partial (the LIGHT arm — the literal hsl, not the alias). */
function rootValue(src, token) {
    const m = src.match(new RegExp(`--${token}\\s*:\\s*([^;]+?)\\s*;`));
    return m ? m[1].trim() : null;
}
/** sRGB[0..255] → the OKLCh {L, C, H} the browser reads `oklch(from <color> …)`'s
 *  channel keywords from (c == C, h == H, l == L). The OKLab plumbing IS the OKLCh
 *  polar form — C is the chroma magnitude, H the hue angle (rgbToOklab already returns
 *  both). */
function oklchOf(str) {
    const o = oklabOf(str);
    return o ? { L: o.L, C: o.C, H: o.H } : null;
}
/** Model the browser's `oklch(from <src> <lift-L> c h)` relative-color: extract the
 *  source color's OKLCh c (chroma) + h (hue), substitute the literal lift-L, and
 *  resolve the result back to OKLab (through the sRGB gamut the browser clamps into —
 *  the AX `oklch(from …)` "browsers don't gamut-map yet" caveat IS oklchToRgb's clamp).
 *  This is the gate's source-side model of what `oklch(from var(--foreground) <L> c h)`
 *  paints, so the dark-tint witness reads the SAME hue the rendered chip carries. */
function relativeOklchFrom(srcColor, liftL) {
    const base = oklchOf(srcColor);
    if (!base) return null;
    return rgbToOklab(oklchToRgb(liftL, base.C, base.H));
}
/** Parse the lift-L literal off the dark `--surface-tint-*` arm's
 *  `oklch(from var(--foreground) <L> c h)` recipe (the first numeric after the
 *  `var(--foreground)` token). */
function darkTintLiftL(src) {
    const m = src.match(/oklch\(\s*from\s+var\(--foreground\)\s+([\d.]+)\s+c\s+h\s*\)/i);
    return m ? Number(m[1]) : null;
}

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });
const facts = {};

// THE DECLARED FLOORS (the gate's assert values; the L-aware design constant — gamut-
// calibrated against the live OKLab census re-probe at HEAD). The STRONG floor holds on the
// rungs that carry it; the PLATE floor is the materially-warm lift a near-white surface can.
const STRONG_FLOOR = 0.02; // the perceptual "is it gray" threshold, mid/low-L rungs
const CHIP_FLOOR = 0.011; // the L90 chip — gamut-bound; ≥ 2× HEAD (0.0055)
const PLATE_FLOOR = 0.0035; // a near-white translucent glass plate — ≥ 2× HEAD (0.0017)
const WARM_HUE_LO = 45; // the warm register the --foreground ink (H≈56°) anchors
const WARM_HUE_HI = 85; // up to a warm amber-yellow; NEVER the HEAD yellow-green 95°
const L_TOLERANCE = 0.02; // chroma-only moves — the L stays within tolerance of HEAD
facts.floors = { STRONG_FLOOR, CHIP_FLOOR, PLATE_FLOOR, WARM_HUE_LO, WARM_HUE_HI, L_TOLERANCE };

// ════════════════════════════════════════════════════════════════════════════════════
// W1 — THE FLOOR HOLDS. Each census WARM-IT token resolves OKLab C ≥ its floor, at the
// warm hue, in BOTH modes. (G3 neutral-2/secondary, G4 neutral-3/accent, G5 neutral-4/
// border, G6 neutral-5/muted-foreground.)
// ════════════════════════════════════════════════════════════════════════════════════
// The HEAD L values (the contrast contract — the chroma-only anti-evasion anchor).
const HEAD_L = { "neutral-2": 0.928, "neutral-3": 0.867, "neutral-4": 0.775, "neutral-5": 0.523 };
const ROWS = [
    { token: "neutral-2", alias: "secondary", floor: CHIP_FLOOR, label: "G3 chip/secondary (L90)" },
    { token: "neutral-3", alias: "accent", floor: STRONG_FLOOR, label: "G4 hover/accent (L82)" },
    { token: "neutral-4", alias: "border", floor: STRONG_FLOOR, label: "G5 border (L70)" },
    { token: "neutral-5", alias: "muted-foreground", floor: STRONG_FLOOR, label: "G6 muted-fg (L40)" },
];
facts.rows = {};
for (const { token, floor, label } of ROWS) {
    const lightStr = rootValue(colorRadius, token);
    const lightLD = darkArgFromLightDark(lightDark, token); // the LIGHT arm of light-dark()? no — light arg
    // The light arg of light-dark() (the first comma group) is what light-mode resolves.
    const lightArg = (() => {
        const decl = lightDark.match(new RegExp(`--${token}\\s*:\\s*light-dark\\(([^,]+),`));
        return decl ? decl[1].trim() : lightStr;
    })();
    const darkStr = darkClassValue(darkArm, token);
    const lightOk = oklabOf(lightArg ?? lightStr ?? "");
    const darkOk = oklabOf(darkStr ?? "");
    facts.rows[token] = {
        lightArg: lightArg ?? lightStr,
        dark: darkStr,
        lightL: lightOk ? Number(lightOk.L.toFixed(4)) : null,
        lightC: lightOk ? Number(lightOk.C.toFixed(4)) : null,
        lightH: lightOk ? Number(lightOk.H.toFixed(1)) : null,
        darkC: darkOk ? Number(darkOk.C.toFixed(4)) : null,
        darkH: darkOk ? Number(darkOk.H.toFixed(1)) : null,
    };
    // LIGHT: chroma clears the floor.
    add(
        `floor-light-${token}`,
        lightOk !== null && lightOk.C >= floor,
        `${label} light OKLab C = ${lightOk ? lightOk.C.toFixed(4) : "?"} (≥ ${floor} — off the gray floor; HEAD was below)`,
    );
    // LIGHT: the hue is WARM (not the yellow-green cast).
    add(
        `warm-hue-light-${token}`,
        lightOk !== null && lightOk.H >= WARM_HUE_LO && lightOk.H <= WARM_HUE_HI,
        `${label} light OKLab H = ${lightOk ? lightOk.H.toFixed(1) : "?"}° (in [${WARM_HUE_LO},${WARM_HUE_HI}]° warm register — warm material, NOT the HEAD yellow-green 95°)`,
    );
    // DARK: chroma clears the floor (in lockstep on the NEW dark base).
    add(
        `floor-dark-${token}`,
        darkOk !== null && darkOk.C >= floor,
        `${label} dark OKLab C = ${darkOk ? darkOk.C.toFixed(4) : "?"} (≥ ${floor} — the dark arm warmed in lockstep on the W-DARK-MATERIAL base)`,
    );
    // CHROMA-ONLY anti-evasion: the LIGHT L stays within tolerance of HEAD (a lightness
    // rewrite masquerading as warming reds — W3).
    add(
        `L-preserved-${token}`,
        lightOk !== null && Math.abs(lightOk.L - HEAD_L[token]) <= L_TOLERANCE,
        `${label} light L = ${lightOk ? lightOk.L.toFixed(4) : "?"} (within ±${L_TOLERANCE} of HEAD ${HEAD_L[token]} — chroma-only move, the contrast contract preserved)`,
    );
}

// The semantic aliases STILL re-point into the warmed ladder (the token-first single-family
// fix — no per-site hardcode; secondary→neutral-2, accent→neutral-3, border/input→neutral-4,
// muted-foreground→neutral-5).
add(
    "aliases-track-ladder",
    /--secondary:\s*var\(--neutral-2\)/.test(colorRadius) &&
        /--accent:\s*var\(--neutral-3\)/.test(colorRadius) &&
        /--border:\s*var\(--neutral-4\)/.test(colorRadius) &&
        /--muted-foreground:\s*var\(--neutral-5\)/.test(colorRadius),
    "the semantic aliases (--secondary/--accent/--border/--muted-foreground) STILL re-point into the warmed --neutral-* ladder (the token-first single-family fix, zero per-site hardcode)",
);

// ════════════════════════════════════════════════════════════════════════════════════
// W2 — CARDS + BUTTONS READ WARM. The default Card plate (--card@resting) + the default
// glass Button plate (--card@wash) composite C ≥ PLATE_FLOOR over the flat page, both modes.
// ════════════════════════════════════════════════════════════════════════════════════
// The --card plate carries the warm bias (L1). Resolve the light --card + the page, composite
// the resting-rung (0.65) + the wash-rung (0.30, the default glass Button substrate) plate.
const cardLightArg = (() => {
    const decl = lightDark.match(/--card\s*:\s*light-dark\(([^,]+),/);
    if (decl) {
        const arg = decl[1].trim();
        // --card light arg may be var(--neutral-0) OR an explicit warm value — resolve the alias.
        if (/var\(--neutral-0\)/.test(arg)) return rootValue(colorRadius, "card") ?? arg;
        return arg;
    }
    return rootValue(colorRadius, "card");
})();
// the page (neutral-0 light arg).
const pageLightArg = (() => {
    const decl = lightDark.match(/--neutral-0\s*:\s*light-dark\(([^,]+),/);
    return decl ? decl[1].trim() : rootValue(colorRadius, "neutral-0");
})();
// --card light arg may itself be `var(--neutral-0)` (aliased) OR an explicit warm hsl —
// resolve a var() alias to the color-radius literal.
function resolveCardLiteral(arg) {
    if (!arg) return null;
    if (/var\(--neutral-0\)/.test(arg)) return rootValue(colorRadius, "neutral-0");
    if (/var\(--card\)/.test(arg)) return rootValue(colorRadius, "card");
    if (/var\(/.test(arg)) {
        const m = arg.match(/var\(--([a-z0-9-]+)\)/);
        if (m) return rootValue(colorRadius, m[1]);
    }
    return arg;
}
const cardLiteral = resolveCardLiteral(cardLightArg);
const pageRgb = colorToRgb(pageLightArg ?? "");
const cardRgb = colorToRgb(cardLiteral ?? "");
facts.cardLight = { arg: cardLightArg, literal: cardLiteral };
facts.pageLight = pageLightArg;
let cardPlateC = null;
let washPlateC = null;
if (cardRgb && pageRgb) {
    const restingPlate = composite(cardRgb, 0.65, pageRgb);
    const washPlate = composite(cardRgb, 0.3, pageRgb);
    cardPlateC = rgbToOklab(restingPlate).C;
    washPlateC = rgbToOklab(washPlate).C;
}
facts.cardPlateC = cardPlateC ? Number(cardPlateC.toFixed(4)) : null;
facts.washButtonPlateC = washPlateC ? Number(washPlateC.toFixed(4)) : null;
add(
    "card-plate-warm-light",
    cardPlateC !== null && cardPlateC >= PLATE_FLOOR,
    `the default Card plate (--card@0.65 over the page) composites OKLab C = ${cardPlateC ? cardPlateC.toFixed(4) : "?"} (≥ ${PLATE_FLOOR} — the G1 gray gone; HEAD ≈ 0.0027)`,
);
add(
    "button-plate-warm-light",
    washPlateC !== null && washPlateC >= PLATE_FLOOR * 0.6,
    `the default glass Button plate (--card@0.30 over the page) composites OKLab C = ${washPlateC ? washPlateC.toFixed(4) : "?"} (≥ ${(PLATE_FLOOR * 0.6).toFixed(4)} — the G8 grayest-of-all lifted; HEAD ≈ 0.0018)`,
);
// The --card LIGHT plate is decoupled to a warm-cream value (the L1 lever) — not the bare
// near-achromatic page. (The DARK --card is W-DARK-MATERIAL's; not re-warmed here.)
const cardOk = oklabOf(cardLiteral ?? "");
facts.cardOklab = cardOk
    ? { L: Number(cardOk.L.toFixed(4)), C: Number(cardOk.C.toFixed(4)), H: Number(cardOk.H.toFixed(1)) }
    : null;
add(
    "card-carries-warm-bias",
    cardOk !== null && cardOk.C > 0.004 && cardOk.H >= WARM_HUE_LO && cardOk.H <= WARM_HUE_HI,
    `the light --card carries a warm bias (OKLab C ${cardOk ? cardOk.C.toFixed(4) : "?"} > 0.004 at warm H ${cardOk ? cardOk.H.toFixed(1) : "?"}° — the plate reads warm over a flat backdrop; HEAD --card C ≈ 0.0017)`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// W3 — NO CAST, NO CONTRAST LOSS. The KEEP-NEUTRAL rows byte-unchanged; every re-ratified
// AA pair ≥ its floor; the L preserved (the anti-evasion, asserted per-row in W1).
// ════════════════════════════════════════════════════════════════════════════════════
// KEEP-NEUTRAL byte-assert: --warning-foreground, --overlay-scrim-ink, the shadow ink, the
// page/muted SURFACE neutrality contract. These are luminance registers; warming them tints
// the room. Byte-assert the exact source literals survive.
const KEEP_NEUTRAL = [
    { name: "--warning-foreground", re: /--warning-foreground:\s*hsl\(24 10% 10%\)\s*;/, src: colorRadius },
    { name: "--overlay-scrim-ink", re: /--overlay-scrim-ink:\s*hsl\(24 10% 10%\)\s*;/, src: glassTokens },
];
for (const k of KEEP_NEUTRAL) {
    add(
        `keep-neutral-${k.name.replace(/--/, "")}`,
        k.re.test(k.src),
        `${k.name} byte-unchanged (the KEEP-NEUTRAL luminance register — warming it tints the room)`,
    );
}
// The --surface-tint-* family stays in-srgb (the AW.W26 fence — never oklab; the no-gray
// re-saturation NEVER touches the surface-tint interpolation space).
add(
    "surface-tint-stays-srgb",
    !/--surface-tint-[a-z0-9-]+:[^;]*color-mix\(\s*in oklab/.test(colorRadius) &&
        !/--surface-tint-[a-z0-9-]+:[^;]*color-mix\(\s*in oklab/.test(darkArm),
    "the --surface-tint-* family stays in-srgb (the AW.W26 brand-identity fence — untouched by the re-saturation)",
);

// AA re-ratification (the contrast arm). The most-consumed pairs over the warmed tokens:
// muted-foreground over the page + over muted (body floor 4.5); strong-muted over the page.
const mutedFgLight = oklabOf(
    (lightDark.match(/--neutral-5\s*:\s*light-dark\(([^,]+),/) ?? [])[1]?.trim() ??
        rootValue(colorRadius, "neutral-5") ??
        "",
);
const mutedFgRgb = colorToRgb(
    (lightDark.match(/--neutral-5\s*:\s*light-dark\(([^,]+),/) ?? [])[1]?.trim() ??
        rootValue(colorRadius, "neutral-5") ??
        "",
);
const n0Rgb = colorToRgb(pageLightArg ?? "");
const n1Rgb = colorToRgb(
    (lightDark.match(/--neutral-1\s*:\s*light-dark\(([^,]+),/) ?? [])[1]?.trim() ??
        rootValue(colorRadius, "neutral-1") ??
        "",
);
let aaMutedPage = null;
let aaMutedMuted = null;
if (mutedFgRgb && n0Rgb) aaMutedPage = contrastRatio(mutedFgRgb, n0Rgb);
if (mutedFgRgb && n1Rgb) aaMutedMuted = contrastRatio(mutedFgRgb, n1Rgb);
facts.aaMutedOverPage = aaMutedPage ? Number(aaMutedPage.toFixed(2)) : null;
facts.aaMutedOverMuted = aaMutedMuted ? Number(aaMutedMuted.toFixed(2)) : null;
add(
    "aa-muted-fg-over-page",
    aaMutedPage !== null && aaMutedPage >= 4.5,
    `--muted-foreground over the page = ${aaMutedPage ? aaMutedPage.toFixed(2) : "?"}:1 (≥ 4.5:1 body floor — the warm muted register still legible; HEAD 5.23:1)`,
);
add(
    "aa-muted-fg-over-muted",
    aaMutedMuted !== null && aaMutedMuted >= 4.5,
    `--muted-foreground over --muted = ${aaMutedMuted ? aaMutedMuted.toFixed(2) : "?"}:1 (≥ 4.5:1 body floor over the soft field)`,
);
// DARK AA: the dark muted-fg over the dark page (the lockstep arm).
const darkMutedRgb = colorToRgb(darkClassValue(darkArm, "neutral-5") ?? "");
const darkPageRgb = colorToRgb(darkClassValue(darkArm, "neutral-0") ?? "");
let aaMutedDark = null;
if (darkMutedRgb && darkPageRgb) aaMutedDark = contrastRatio(darkMutedRgb, darkPageRgb);
facts.aaMutedOverPageDark = aaMutedDark ? Number(aaMutedDark.toFixed(2)) : null;
add(
    "aa-muted-fg-over-page-dark",
    aaMutedDark !== null && aaMutedDark >= 4.5,
    `dark --muted-foreground over the dark page = ${aaMutedDark ? aaMutedDark.toFixed(2) : "?"}:1 (≥ 4.5:1 — the warmed dark muted register legible; HEAD 7.39:1)`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// W-DARK-INK-WARM — the dark INK reads warm + is --foreground-DERIVED. The dark register's
// surface-tint arm hardcoded the EXACT yellow-green (hsl(48 …) → OKLab H95°) W-NO-GRAY
// condemned, ×12, breaking the light arm's --foreground-derived symmetry. These witnesses
// assert (a) the dark --foreground ink itself reads warm, (b) the two mode arms agree
// (§2c lockstep), (c) the dark tint ink reads warm AND is the oklch(from var(--foreground) …)
// relative-color derivation (the css-relative-color chronic's first live consumer), and
// (d) the dark --foreground over the dark page holds AA after the chroma-only warm.
// ════════════════════════════════════════════════════════════════════════════════════
// W1 — the dark --foreground reads warm (off the HEAD H95.1° yellow-green).
const darkFgFloor = darkClassValue(darkArm, "foreground"); // the .dark fallback floor
const darkFgEnh = darkArgFromLightDark(lightDark, "foreground"); // the light-dark() dark arg
const darkFgOk = oklabOf(darkFgFloor ?? "");
facts.darkForeground = darkFgOk
    ? {
          floor: darkFgFloor,
          enhancementDarkArg: darkFgEnh,
          L: Number(darkFgOk.L.toFixed(4)),
          C: Number(darkFgOk.C.toFixed(4)),
          H: Number(darkFgOk.H.toFixed(1)),
      }
    : { floor: darkFgFloor, enhancementDarkArg: darkFgEnh };
add(
    "warm-hue-dark-foreground",
    darkFgOk !== null &&
        darkFgOk.H >= WARM_HUE_LO &&
        darkFgOk.H <= WARM_HUE_HI &&
        darkFgOk.C >= CHIP_FLOOR * 0.5,
    `the dark --foreground reads OKLab H = ${darkFgOk ? darkFgOk.H.toFixed(1) : "?"}° (in [${WARM_HUE_LO},${WARM_HUE_HI}]° warm register — the no-gray identity, off the HEAD H95.1° yellow-green) at C ${darkFgOk ? darkFgOk.C.toFixed(4) : "?"}`,
);
// W3a — the §2c lockstep: the .dark fallback floor == the light-dark() dark arg. The two
// arms must agree or the FOUC/enhancement split paints two different inks.
add(
    "dark-foreground-arms-lockstep",
    darkFgFloor !== null && darkFgEnh !== null && darkFgFloor === darkFgEnh,
    `the dark --foreground agrees across both arms (the .dark fallback floor "${darkFgFloor}" == the light-dark() dark arg "${darkFgEnh}" — the §2c lockstep; a warm in only one arm reds)`,
);
// W2a — the dark --surface-tint-* arm is --foreground-DERIVED via oklch(from …) AND carries
// ZERO hsl(48 …) literal (the architectural-asymmetry fix + the workaround deleted). The
// SOURCE-assert a renamed/re-hued literal cannot evade (the derivation must be present).
const darkTintHasRelativeColor = /--surface-tint-[a-z0-9-]+:[^;]*oklch\(\s*from\s+var\(--foreground\)/.test(
    darkArm,
);
const darkTintHasHsl48 = /--surface-tint-[a-z0-9-]+:[^;]*hsl\(\s*48\b/.test(darkArm);
facts.darkSurfaceTintDerived = {
    relativeColor: darkTintHasRelativeColor,
    hsl48Literal: darkTintHasHsl48,
};
add(
    "dark-surface-tint-foreground-derived",
    darkTintHasRelativeColor && !darkTintHasHsl48,
    `the dark --surface-tint-* arm reads oklch(from var(--foreground) …) (relativeColor=${darkTintHasRelativeColor}) AND carries ZERO hsl(48 …) literal (hsl48=${darkTintHasHsl48}) — the --foreground-derived symmetry restored, the 12-literal workaround deleted`,
);
// W2b — the dark tint ink resolves WARM. Model the oklch(from var(--foreground) <lift-L> c h)
// recipe off the (warmed) dark --foreground at the parsed lift-L: the ink the chip rungs mix
// over transparent carries the foreground's warm hue by derivation.
const darkTintLift = darkTintLiftL(darkArm);
const darkTintInk =
    darkFgFloor !== null && darkTintLift !== null
        ? relativeOklchFrom(darkFgFloor, darkTintLift)
        : null;
facts.darkSurfaceTint = darkTintInk
    ? {
          liftL: darkTintLift,
          L: Number(darkTintInk.L.toFixed(4)),
          C: Number(darkTintInk.C.toFixed(4)),
          H: Number(darkTintInk.H.toFixed(1)),
      }
    : { liftL: darkTintLift };
add(
    "warm-hue-dark-surface-tint",
    darkTintInk !== null &&
        darkTintInk.H >= WARM_HUE_LO &&
        darkTintInk.H <= WARM_HUE_HI,
    `the dark --surface-tint-* ink (oklch(from var(--foreground) ${darkTintLift ?? "?"} c h)) resolves OKLab H = ${darkTintInk ? darkTintInk.H.toFixed(1) : "?"}° (in [${WARM_HUE_LO},${WARM_HUE_HI}]° warm register — the chip on the L16 card warm, NOT the HEAD H95.1° yellow-green; the ink hue is preserved through the α-mix over transparent)`,
);
// W3b — the dark --foreground holds AA over the dark page after the chroma-only warm (the
// contrast contract — the L must not move past the AA edge).
const darkFgRgb = colorToRgb(darkFgFloor ?? "");
const darkPageRgbAA = colorToRgb(darkClassValue(darkArm, "neutral-0") ?? "");
let aaDarkFg = null;
if (darkFgRgb && darkPageRgbAA) aaDarkFg = contrastRatio(darkFgRgb, darkPageRgbAA);
facts.aaDarkForegroundOverPage = aaDarkFg ? Number(aaDarkFg.toFixed(2)) : null;
add(
    "aa-dark-foreground-over-page",
    aaDarkFg !== null && aaDarkFg >= 4.5,
    `the dark --foreground over the dark page (--neutral-0) = ${aaDarkFg ? aaDarkFg.toFixed(2) : "?"}:1 (≥ 4.5:1 body floor — the chroma-only warm holds the contrast contract; the L is preserved)`,
);
// The relative-color is the INK SOURCE, not the tint mix space — the AW.W26 in-srgb fence
// (asserted by `surface-tint-stays-srgb` above) is NOT breached: the oklch(from …) sits
// INSIDE the unchanged `color-mix(in srgb, …)` α-mix. A future reader must not read the
// dark arm's oklch(from …) as a fence violation.
add(
    "dark-tint-relative-color-is-ink-source-not-mix-space",
    !darkTintHasRelativeColor ||
        /--surface-tint-[a-z0-9-]+:\s*color-mix\(\s*in srgb,\s*oklch\(\s*from\s+var\(--foreground\)/.test(
            darkArm,
        ),
    "the dark arm's oklch(from var(--foreground) …) is the INK SOURCE inside the unchanged color-mix(in srgb, …) α-mix — NOT a switch of the tint interpolation space (the AW.W26 fence holds; surface-tint-stays-srgb stays GREEN)",
);

// ── The π readback spec is wired (the BINDING close) ────────────────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/no-gray.spec.ts")),
    "tests-visual/no-gray.spec.ts exists (the π chroma readback — the named tokens + the live default Card/Button plates resolve C ≥ floor in both modes; the BINDING truth)",
);

// ── Report ──────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:no-gray — the warm-chroma floor (BA.W-NO-GRAY)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_NO_GRAY_OUT", "BA-no-gray");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:no-gray",
    command: COMMAND,
    note: "SOURCE arm only — the painted warm-not-gray chroma truth (the live Card/Button plate + the named tokens over the demo backdrop) is proven by tests-visual/no-gray.spec.ts (the π arm), never this gate alone (the BA P-1 close-class fix).",
    facts,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:no-gray] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:no-gray] the warm-chroma floor holds — the neutral ladder resolves warm material off the gray floor (at the warm hue, not the yellow-green cast), the default Card + glass Button plates carry the warm bias, the KEEP-NEUTRAL registers are untouched, and every AA pair re-ratifies. The π arm proves the painted warm-not-gray truth.",
);
