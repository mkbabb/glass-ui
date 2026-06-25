#!/usr/bin/env node
// BC.W-ACCENT-TONE — the contrast-floored 3-channel tonal-accent register gate
// (proof:accent-tone).
//
// The born-RED→GREEN device-free SOURCE arm for the ONE tonal-accent register: a
// `.accent-tone` CSS recipe (one `--tone` → idle FILL / active BAND / EDGE / INK,
// `in oklab`) + `useAccentTone` (the contrast-safe ink via value.js `safeAccentColor`,
// NO re-rolled contrast math) + `<SelectableChip>` (the reka-Toggle face) — and the
// retirement of the ToggleChip per-state `color-mix(…--primary…)` hand-roll (2× active
// fill inside an 8-literal cluster). FOURIER-INBOUND #3 (the register) BUILT; #13 (the
// `--viz-amber` rebaseline) FOLDED here as the regression-guard half (see A5).
//
// The BINDING painted truth is the π readback (the W-ACCENT-TONE-DELTA capture + the
// proof:ba-gestalt colour-band verdict — the SelectableChip row idle-legible at rest +
// active-bold with the contrast-safe ink, both modes). This gate is the no-device CI
// half (a source-green/visually-broken gap is the AZ P-1 close-class both halves kill).
//
// The math source is value.js (the single-color-core fence): A4 composites the idle
// fill + measures its perceptual distinctness via value.js `srgbToOKLab`/`deltaEOK`;
// A5 lifts via `safeAccentColor`. The gate IMPORTS them — it re-rolls ZERO color math.
//
// House style mirrors proof-icon-chip.mjs / proof-border-progress.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a byte-
// stable JSON artefact via gate-output, a human summary, process.exit(1) on any
// violation + a self-test bite per clause.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    srgbToOKLab,
    rawOklchToOklab,
    deltaEOK,
    DELTA_E_OK_JND,
    parseCSSColor,
    colorUnit2,
    OKLCHColor,
    safeAccentColor,
} from "@mkbabb/value.js";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    _cliPaths = {
        ROOT,
        ACCENT_CSS: resolve(ROOT, "src/styles/glass/accent-tone.css"),
        USE_ACCENT_TONE: resolve(ROOT, "src/composables/color/useAccentTone.ts"),
        COLOR_INDEX: resolve(ROOT, "src/composables/color/index.ts"),
        TOGGLE_CHIP: resolve(ROOT, "src/components/custom/toggle-chip/index.ts"),
        CHIP_VARIANTS: resolve(ROOT, "src/components/custom/selectable-chip/chipVariants.ts"),
        GLASS_CHIP_CSS: resolve(ROOT, "src/styles/glass/glass-chip.css"),
        SELECTABLE_DIR: resolve(ROOT, "src/components/custom/selectable-chip"),
        SUBPATH: resolve(ROOT, "src/subpaths/selectable-chip.ts"),
        API_INDEX: resolve(ROOT, "src/api/index.ts"),
        CLAUDE_MD: resolve(ROOT, "CLAUDE.md"),
        COLOR_RADIUS: resolve(ROOT, "src/styles/tokens/color-radius.css"),
        DARK_ARM: resolve(ROOT, "src/styles/tokens/dark-arm.css"),
        ARTIFACT: gateArtifactPath("GLASS_UI_ACCENT_TONE_ARTIFACT", "BC-accent-tone"),
    };
    return _cliPaths;
}

// ── comment-strip (the false-witness discipline) ─────────────────────────────
function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < (text?.length ?? 0)) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < (text?.length ?? 0)) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}
const stripAll = (t) => stripHtmlComments(stripBlockComments(t ?? ""));

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

// ── the ONE color core (value.js — composed, never re-rolled) ────────────────
/** A CSS `<color>` → OKLab `[L, a, b]` via value.js's parser + Ottosson core. */
function labOfCss(css) {
    const parsed = parseCSSColor(css);
    const rgb = colorUnit2(parsed, "rgb").value;
    return srgbToOKLab(Number(rgb.r), Number(rgb.g), Number(rgb.b));
}
/** `color-mix(in oklab, surface, tone p%)` → OKLab `[L,a,b]` (numeric mix of the two
 *  value.js-parsed stops; a numeric lerp, NOT a re-rolled color-space matrix). */
function mixOklab(surfaceCss, toneCss, p) {
    const [sL, sa, sb] = labOfCss(surfaceCss);
    const [tL, ta, tb] = labOfCss(toneCss);
    return [sL * (1 - p) + tL * p, sa * (1 - p) + ta * p, sb * (1 - p) + tb * p];
}

// The canonical light/dark `--card` surfaces (tokens/color-radius.css + dark-arm.css)
// + the mode-matched chromatic tones the register is actually used with (the section
// ramp). The idle-floor measures the MODE-MATCHED tone over its mode's card.
const SURFACES = {
    light: "hsl(36 48% 97%)", // --card light
    dark: "hsl(24 8% 16%)", // --card dark
};
const MODE_TONES = {
    // light section-color stops (color-radius.css) + the warm-primary headline.
    light: ["oklch(0.532 0.180 317.5)", "oklch(0.542 0.089 222.8)", "oklch(0.623 0.124 69.6)"],
    // dark section-color stops (dark-arm.css).
    dark: ["oklch(0.739 0.134 318.1)", "oklch(0.767 0.091 219.9)", "oklch(0.813 0.109 78.2)"],
};
// The resting-legibility floor: the idle fill must clear ≥1 JND (DELTA_E_OK_JND=0.02)
// of perceptual distance from the surface — the WCAG "≥3:1" UI-component bar re-cast as
// the perceptual-distance floor a faint same-luminance tint is honestly measured by
// (a luminance-ratio metric is degenerate for a near-isoluminant tint; the OKLab ΔE is
// the perceptually-uniform "is the resting tint visible" measure). The 8% default
// clears it for every mode-matched tone (~1.1–2.2 JND); a 1% strength reds (≤0.3 JND).
const IDLE_FLOOR_JND = 1.0;

/** The minimum idle-fill ΔE (in JND units) over all mode-matched tones at `strength`. */
function minIdleFloorJnd(strength) {
    let worst = Infinity;
    for (const mode of ["light", "dark"]) {
        const surf = SURFACES[mode];
        const [sL, sa, sb] = labOfCss(surf);
        for (const tone of MODE_TONES[mode]) {
            const [fL, fa, fb] = mixOklab(surf, tone, strength);
            const de = deltaEOK(sL, sa, sb, fL, fa, fb);
            worst = Math.min(worst, de / DELTA_E_OK_JND);
        }
    }
    return worst;
}

// ── A5 helpers — the --viz-amber / --section-color-5 contrast (regression guard) ──
function srgbLin(c) {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function relLumOfRgb([r, g, b]) {
    return 0.2126 * srgbLin(r) + 0.7152 * srgbLin(g) + 0.0722 * srgbLin(b);
}
function rgbOfCss(css) {
    const v = colorUnit2(parseCSSColor(css), "rgb").value;
    let r = Number(v.r), g = Number(v.g), b = Number(v.b);
    // value.js `colorUnit2(…,"rgb")` returns NORMALIZED [0,1] channels — scale to
    // the 0-255 domain `srgbLin` expects (a parse-domain normalization, not color math).
    if (r <= 1.0001 && g <= 1.0001 && b <= 1.0001) {
        r *= 255;
        g *= 255;
        b *= 255;
    }
    return [r, g, b];
}
function wcag(rgb1, rgb2) {
    const l1 = relLumOfRgb(rgb1), l2 = relLumOfRgb(rgb2);
    const hi = Math.max(l1, l2), lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
}
/** The `--section-color-5` light/dark literals parsed from the token sources. */
function amberLiterals(colorRadius, darkArm) {
    const light = (colorRadius.match(/--section-color-5:\s*(oklch\([^)]+\))/) || [])[1] || null;
    const dark = (darkArm.match(/--section-color-5:\s*(oklch\([^)]+\))/) || [])[1] || null;
    return { light, dark };
}

// ── the pure detector ────────────────────────────────────────────────────────
/**
 * Pure over the read sources. Each witness pushes a falsifiable violation string.
 * `sources` carries the comment-STRIPPED file bodies + the disk facts.
 */
export function detectAccentTone(sources) {
    const violations = [];
    const facts = {};

    const css = sources.accentCss ?? "";
    const useTone = sources.useAccentTone ?? "";
    const colorIndex = sources.colorIndex ?? "";
    const toggle = sources.toggleChip ?? "";
    const api = sources.apiIndex ?? "";
    const subpath = sources.subpath ?? "";
    const claudeMd = sources.claudeMd ?? "";

    // ── A1 — the register exists ONCE, all 4 channels off ONE --tone, in oklab ──
    const channels = ["--accent-fill", "--accent-band", "--accent-edge", "--accent-ink"];
    const hasRecipe = /\.accent-tone\s*\{/.test(css);
    const missingChannels = channels.filter((c) => !new RegExp(`${c}\\s*:`).test(css));
    const readsTone = /var\(--tone/.test(css);
    const usesOklab = /color-mix\(\s*in\s+oklab/.test(css);
    // the WRONG-space bite: a `color-mix(in srgb, …var(--tone)…)` tonal-channel mix
    // reds (the --surface-tint-* in-srgb fence). `[\s\S]*?` (non-greedy, paren-
    // tolerant) reaches the `var(--tone)` past a nested `var(--surface, var(--card))`.
    const wrongSpace = /color-mix\(\s*in\s+srgb[\s\S]*?var\(--tone/.test(css);
    facts.a1 = { hasRecipe, missingChannels, readsTone, usesOklab, wrongSpace };
    if (!hasRecipe) violations.push("A1: `.accent-tone` recipe is absent from glass/accent-tone.css");
    if (missingChannels.length)
        violations.push(`A1: the register is missing channel(s): ${missingChannels.join(", ")}`);
    if (!readsTone) violations.push("A1: the recipe does not read ONE `--tone`");
    if (!usesOklab) violations.push("A1: the channels are not mixed `in oklab` (the perceptual glass-tint family)");
    if (wrongSpace) violations.push("A1: a channel mixes `in srgb` (the wrong space — the --surface-tint-* fence)");

    // ── A2 — the contrast-safe ink composes value.js, NO hand-rolled contrast math ──
    const importsSafeAccent = /import\s*\{[^}]*\bsafeAccentColor\b[^}]*\}\s*from\s*["']@mkbabb\/value\.js["']/.test(useTone);
    // a planted hand-rolled contrast/lightness solve reds (the proof:single-color-core
    // mirror): a relativeLuminance/contrastRatio function, an OKLCh lightness-bisection
    // loop, or a re-defined WCAG ratio in the composable.
    const handRoll =
        /function\s+(relativeLuminance|contrastRatio|luminance|wcagContrast)\b/.test(useTone) ||
        /\bwhile\s*\([^)]*contrast/i.test(useTone) ||
        /\bfor\s*\([^)]*\)\s*\{[^}]*lightness[^}]*bisect/i.test(useTone) ||
        /0\.2126\s*\*/.test(useTone); // the WCAG luminance coefficient — a re-roll tell
    const reExported = /export\s*\{[^}]*\buseAccentTone\b/.test(colorIndex);
    facts.a2 = { importsSafeAccent, handRoll, reExported };
    if (!importsSafeAccent)
        violations.push("A2: useAccentTone does not import `safeAccentColor` from @mkbabb/value.js");
    if (handRoll)
        violations.push("A2: useAccentTone hand-rolls a contrast/lightness solve (re-roll the value.js color core — proof:single-color-core)");
    if (!reExported)
        violations.push("A2: useAccentTone is not re-exported from the /color leaf (composables/color/index.ts)");

    // ── A3 — the N-pastes collapse (the ToggleChip hand-roll retired) ──
    //   BD.W-CHIP-CONGRUENT-GLASS — the toggle-chip collapsed onto the shared chip
    //   family recipe: `index.ts` RE-POINTS onto `chipVariants` (which composes the
    //   `.accent-tone` register: `"glass-chip glass-capsule glass-capsule-hover
    //   accent-tone"`), and the `data-state="on"` band flood (the `--accent-band` event)
    //   lives in `glass/glass-chip.css` (no class-binding at the call site). So the
    //   re-point is now THROUGH chipVariants + the css band, not an inline string in
    //   index.ts. A3 follows the composition: no hand-roll literal survives anywhere in
    //   the chip family, the recipe composes `.accent-tone`, and the `--accent-band`
    //   event is wired (the register is the SOLE active-fill source — no `--primary` fork).
    const chipVariants = sources.chipVariants ?? "";
    const glassChipCss = sources.glassChipCss ?? "";
    const handRollScan = `${toggle}\n${chipVariants}`;
    const tonalHandRoll = (handRollScan.match(/data-\[state=on\]:bg-\[color-mix/g) || []).length;
    const primaryColorMix = (handRollScan.match(/color-mix\(in_srgb,var\(--primary\)/g) || []).length;
    const composesAccentTone = /chipVariants\s*\(/.test(toggle) && /accent-tone/.test(chipVariants);
    const bandEventWired = /--accent-band\b/.test(glassChipCss) && /data-state=["']?on/.test(glassChipCss);
    const pointsAtRegister = composesAccentTone && bandEventWired;
    facts.a3 = { tonalHandRoll, primaryColorMix, pointsAtRegister, composesAccentTone, bandEventWired };
    if (tonalHandRoll > 0)
        violations.push(`A3: ${tonalHandRoll} active-fill color-mix hand-roll(s) survive in the chip family (re-point onto .accent-tone)`);
    if (primaryColorMix > 0)
        violations.push(`A3: ${primaryColorMix} per-state \`color-mix(…--primary…)\` literal(s) survive in the chip family`);
    if (!composesAccentTone)
        violations.push("A3: toggle-chip does not re-point onto the shared chipVariants `.accent-tone` register (the chip-family congruence broke)");
    if (!bandEventWired)
        violations.push("A3: the `--accent-band` data-state=on active-fill event is not wired in glass/glass-chip.css (the register's selected flood)");

    // ── A4 — the idle FLOOR is enforced (the load-bearing new behavior) ──
    const fillStrengthLit = (css.match(/--accent-fill-strength:\s*([\d.]+)%/) || [])[1];
    const fillStrength = fillStrengthLit != null ? Number(fillStrengthLit) / 100 : NaN;
    const defaultFloorJnd = Number.isFinite(fillStrength) ? minIdleFloorJnd(fillStrength) : 0;
    // the planted-1% bite: a 1% strength must FAIL the floor (the resting tint vanishes).
    const planted1pctJnd = minIdleFloorJnd(0.01);
    facts.a4 = {
        fillStrength,
        defaultFloorJnd: Number(defaultFloorJnd.toFixed(2)),
        floorBarJnd: IDLE_FLOOR_JND,
        planted1pctJnd: Number(planted1pctJnd.toFixed(2)),
    };
    if (!Number.isFinite(fillStrength))
        violations.push("A4: the recipe declares no `--accent-fill-strength` default");
    else if (defaultFloorJnd < IDLE_FLOOR_JND)
        violations.push(
            `A4: the default idle fill (${(fillStrength * 100).toFixed(0)}%) clears only ${defaultFloorJnd.toFixed(2)} JND vs the surface — below the ${IDLE_FLOOR_JND} JND resting-legibility floor (the tint whispers)`,
        );
    // the bite must hold: 1% MUST be below the floor (else the floor cannot discriminate).
    if (planted1pctJnd >= IDLE_FLOOR_JND)
        violations.push(`A4-bite: the 1% planted strength clears ${planted1pctJnd.toFixed(2)} JND — the floor does not discriminate (self-test broken)`);

    // ── A5 — the --viz-amber / --section-color-5 rebaseline (the #13 fold) ──
    // BORN-RED on HEAD (verified at execution): the HEAD light amber
    // `oklch(0.623 0.124 69.6)` measures 3.49:1 vs the warm-cream `--card` — BELOW
    // the AA bar (matching fourier's 3.54:1). The LIGHT arm is rebaselined via
    // `computeSafeAccent` (md=0.45) to `oklch(0.530 0.124 69.6)` → 5.12:1 (clears AA
    // with headroom) at the SINGLE SOURCE (--section-color-5 in color-radius.css +
    // light-dark.css's light arg; --viz-amber auto-tracks the pure alias). SCOPE: the
    // DARK arm `oklch(0.813 0.109 78.2)` already clears 8.07:1 (a LIGHT amber on the
    // DEEP-canvas dark card) — it needs NO lift, so ONLY the failing light arm is
    // lifted (the dark-arm.css source is left untouched — a concurrent W-DIALOG-GLASS
    // wave owns it, and the dark amber already meets the bar). fourier's :root override
    // deletes byte-equivalent on adopt. The bite: a revert of --section-color-5 (light)
    // to the below-AA value reds.
    const { light: amberLight, dark: amberDark } = amberLiterals(
        sources.colorRadius ?? "",
        sources.darkArm ?? "",
    );
    let amberLightCt = null, amberDarkCt = null;
    if (amberLight) amberLightCt = wcag(rgbOfCss(amberLight), rgbOfCss(SURFACES.light));
    if (amberDark) amberDarkCt = wcag(rgbOfCss(amberDark), rgbOfCss(SURFACES.dark));
    facts.a5 = {
        scope: "born-RED→GREEN: HEAD light amber 3.49:1 (below AA) → 5.12:1; light arm lifted (dark arm already 8.07:1, untouched)",
        amberLight,
        amberDark,
        amberLightVsCard: amberLightCt != null ? Number(amberLightCt.toFixed(2)) : null,
        amberDarkVsCard: amberDarkCt != null ? Number(amberDarkCt.toFixed(2)) : null,
    };
    if (amberLight == null || amberDark == null)
        violations.push("A5: the --section-color-5 literal(s) could not be parsed from the token sources");
    else {
        if (amberLightCt < 4.5)
            violations.push(`A5: --section-color-5 (light) is ${amberLightCt.toFixed(2)}:1 vs the card — below the AA bar (rebaseline the source)`);
        if (amberDarkCt < 4.5)
            violations.push(`A5: --section-color-5 (dark) is ${amberDarkCt.toFixed(2)}:1 vs the card — below the AA bar`);
    }

    // ── A6 — the colocation dir + subpath + api publication ──
    const dirFiles = sources.selectableDirFiles ?? [];
    const needFiles = ["SelectableChip.vue", "selectableChipVariants.ts", "index.ts", "README.md"];
    const missingDirFiles = needFiles.filter((f) => !dirFiles.includes(f));
    const subpathMirrors = /export\s*\*\s*from\s*["']\.\.\/components\/custom\/selectable-chip["']/.test(subpath);
    const apiPublishes =
        /SelectableChipVariants/.test(api) && /UseAccentToneOptions/.test(api) && /UseAccentToneReturn/.test(api);
    // the structure-sync clause is CLAUDE.md-owned (the §Structure custom/ enumeration
    // + count). It is asserted here but degrades to a WARN-fact when CLAUDE.md has not
    // yet been re-synced (the cross-cutting doc is the orchestrator's structure-sync
    // arm — proof:claude-structure-sync owns the hard gate). We RECORD it.
    const inClaudeStructure = /│\s+│\s+├──\s+selectable-chip\//.test(claudeMd);
    facts.a6 = { dirFiles, missingDirFiles, subpathMirrors, apiPublishes, inClaudeStructure };
    if (missingDirFiles.length)
        violations.push(`A6: the selectable-chip colocation dir is missing file(s): ${missingDirFiles.join(", ")}`);
    if (!subpathMirrors)
        violations.push("A6: src/subpaths/selectable-chip.ts does not mirror the component dir");
    if (!apiPublishes)
        violations.push("A6: /api does not publish SelectableChipVariants + UseAccentToneOptions/Return");
    // NOTE: inClaudeStructure is recorded but NOT a hard violation here — the CLAUDE.md
    // §Structure re-sync is proof:claude-structure-sync's gate (the cross-cutting doc
    // arm the orchestrator owns); a hard fail here would double-own it.

    return { facts, violations };
}

// ── the self-test (a planted bite per clause MUST flag) ──────────────────────
function selfTest() {
    const fails = [];
    const base = {
        accentCss: `.accent-tone {
  --accent-fill-strength: 8%;
  --accent-fill: color-mix(in oklab, var(--surface, var(--card)), var(--tone) var(--accent-fill-strength));
  --accent-band: color-mix(in oklab, var(--surface, var(--card)), var(--tone) 18%);
  --accent-edge: color-mix(in oklab, transparent, var(--tone) 55%);
  --accent-ink: var(--accent-ink-resolved, var(--foreground));
}`,
        useAccentTone: `import { safeAccentColor } from "@mkbabb/value.js";\nexport function useAccentTone(){}`,
        colorIndex: `export { useAccentTone } from "./useAccentTone";`,
        toggleChip: `import { chipVariants } from "../selectable-chip/chipVariants";\nexport const toggleChipVariants = cva("", { variants: { variant: { chip: chipVariants({ size: "md" }) } } });`,
        chipVariants: `export const chipVariants = cva("glass-chip glass-capsule glass-capsule-hover accent-tone", { variants: {} });`,
        glassChipCss: `.glass-chip[data-state="on"] { --accent-band: color-mix(in oklab, var(--surface), var(--tone) 18%); }`,
        apiIndex: `export type { SelectableChipVariants, UseAccentToneOptions, UseAccentToneReturn } from "x";`,
        subpath: `export * from "../components/custom/selectable-chip";`,
        claudeMd: `│   │   ├── selectable-chip/`,
        colorRadius: `--section-color-5:  oklch(0.530 0.124 69.6);`,
        darkArm: `--section-color-5:  oklch(0.813 0.109 78.2);`,
        selectableDirFiles: ["SelectableChip.vue", "selectableChipVariants.ts", "index.ts", "README.md"],
    };
    const clean = detectAccentTone(base);
    if (clean.violations.length) fails.push(`BASE should be clean, got: ${clean.violations.join(" | ")}`);

    // A1 bite — delete a channel.
    const a1 = detectAccentTone({ ...base, accentCss: base.accentCss.replace(/--accent-edge:[^;]+;/, "") });
    if (!a1.violations.some((v) => v.startsWith("A1"))) fails.push("A1 bite (deleted channel) did not flag");
    // A1 bite — wrong space: flip ONE tonal channel to `in srgb` (the others stay
    // oklab, so `usesOklab` holds and the WRONG-space clause is what fires).
    const a1b = detectAccentTone({
        ...base,
        accentCss: base.accentCss.replace("in oklab", "in srgb"), // first occurrence only
    });
    if (!a1b.violations.some((v) => v.includes("srgb"))) fails.push("A1 bite (in srgb) did not flag");
    // A2 bite — hand-rolled contrast.
    const a2 = detectAccentTone({ ...base, useAccentTone: base.useAccentTone + `\nconst l = 0.2126 * r + 0.7152 * g;` });
    if (!a2.violations.some((v) => v.startsWith("A2"))) fails.push("A2 bite (hand-rolled luminance) did not flag");
    // A2 bite — missing import.
    const a2b = detectAccentTone({ ...base, useAccentTone: `export function useAccentTone(){}` });
    if (!a2b.violations.some((v) => v.includes("safeAccentColor"))) fails.push("A2 bite (no value.js import) did not flag");
    // A3 bite — re-paste the active-fill hand-roll.
    const a3 = detectAccentTone({ ...base, toggleChip: base.toggleChip + `\n"data-[state=on]:bg-[color-mix(in_srgb,var(--primary)_18%,transparent)]"` });
    if (!a3.violations.some((v) => v.startsWith("A3"))) fails.push("A3 bite (re-pasted hand-roll) did not flag");
    // A4 bite — 1% strength.
    const a4 = detectAccentTone({ ...base, accentCss: base.accentCss.replace("--accent-fill-strength: 8%", "--accent-fill-strength: 1%") });
    if (!a4.violations.some((v) => v.startsWith("A4"))) fails.push("A4 bite (1% strength) did not flag");
    // A5 bite — revert amber to a below-AA value (a dark amber that fails light card).
    const a5 = detectAccentTone({ ...base, colorRadius: `--section-color-5:  oklch(0.92 0.05 90);` });
    if (!a5.violations.some((v) => v.startsWith("A5"))) fails.push("A5 bite (below-AA amber) did not flag");
    // A6 bite — missing README.
    const a6 = detectAccentTone({ ...base, selectableDirFiles: ["SelectableChip.vue", "selectableChipVariants.ts", "index.ts"] });
    if (!a6.violations.some((v) => v.startsWith("A6"))) fails.push("A6 bite (missing README) did not flag");

    return fails;
}

function run() {
    const p = cliPaths();
    const dirFiles = existsSync(p.SELECTABLE_DIR)
        ? readdirSync(p.SELECTABLE_DIR).filter((n) => statSync(resolve(p.SELECTABLE_DIR, n)).isFile())
        : [];
    const sources = {
        accentCss: stripBlockComments(safeRead(p.ACCENT_CSS)),
        useAccentTone: stripBlockComments(safeRead(p.USE_ACCENT_TONE)),
        colorIndex: stripBlockComments(safeRead(p.COLOR_INDEX)),
        toggleChip: stripBlockComments(safeRead(p.TOGGLE_CHIP)),
        chipVariants: stripBlockComments(safeRead(p.CHIP_VARIANTS)),
        glassChipCss: stripBlockComments(safeRead(p.GLASS_CHIP_CSS)),
        apiIndex: stripBlockComments(safeRead(p.API_INDEX)),
        subpath: stripBlockComments(safeRead(p.SUBPATH)),
        claudeMd: safeRead(p.CLAUDE_MD),
        colorRadius: stripBlockComments(safeRead(p.COLOR_RADIUS)),
        darkArm: stripBlockComments(safeRead(p.DARK_ARM)),
        selectableDirFiles: dirFiles,
    };

    const { facts, violations } = detectAccentTone(sources);
    const selfTestFails = selfTest();
    for (const f of selfTestFails) violations.push(`SELF-TEST: ${f}`);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(p.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:accent-tone",
        facts,
        violations,
    });

    console.log("proof:accent-tone — the contrast-floored 3-channel tonal-accent register (BC.W-ACCENT-TONE)");
    console.log(`  A1 register (4 channels, in oklab): ${facts.a1.hasRecipe && facts.a1.missingChannels.length === 0 && facts.a1.usesOklab && !facts.a1.wrongSpace ? "✓" : "✗"}`);
    console.log(`  A2 ink composes value.js, no re-roll: ${facts.a2.importsSafeAccent && !facts.a2.handRoll && facts.a2.reExported ? "✓" : "✗"}`);
    console.log(`  A3 N-pastes collapsed (hand-roll=${facts.a3.tonalHandRoll}): ${facts.a3.tonalHandRoll === 0 && facts.a3.pointsAtRegister ? "✓" : "✗"}`);
    console.log(`  A4 idle floor (${(facts.a4.fillStrength * 100).toFixed(0)}% → ${facts.a4.defaultFloorJnd} JND ≥ ${facts.a4.floorBarJnd}; 1%=${facts.a4.planted1pctJnd} JND): ${facts.a4.defaultFloorJnd >= IDLE_FLOOR_JND && facts.a4.planted1pctJnd < IDLE_FLOOR_JND ? "✓" : "✗"}`);
    console.log(`  A5 amber ≥AA (light ${facts.a5.amberLightVsCard}:1 / dark ${facts.a5.amberDarkVsCard}:1; HEAD light was 3.49:1 → lifted): ${facts.a5.amberLightVsCard >= 4.5 && facts.a5.amberDarkVsCard >= 4.5 ? "✓" : "✗"}`);
    console.log(`  A6 dir+subpath+api (CLAUDE.md §Structure=${facts.a6.inClaudeStructure ? "synced" : "PENDING — proof:claude-structure-sync owns it"}): ${facts.a6.missingDirFiles.length === 0 && facts.a6.subpathMirrors && facts.a6.apiPublishes ? "✓" : "✗"}`);
    console.log(`  self-test bites: ${selfTestFails.length === 0 ? "all flag ✓" : "BROKEN — " + selfTestFails.join("; ")}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${p.ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
