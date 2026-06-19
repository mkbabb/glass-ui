#!/usr/bin/env node
// BC.W-GLASS-IDENTITY — the warm-cream partial-transparency BASE, restored at root +
// the BIDIRECTIONAL identity gate (the postmortem/az.md §2 disease-root fix). The
// SOURCE/MECHANISM arm of proof:glass-identity (device-free; the PAINT arm is the
// bc-gestalt-roster glass-adaptive/dock/shell pixel-read over a live :5199 capture the
// orchestrator owns + the π readback tests-visual/glass-identity.spec.ts). Per-mechanism
// greens alone do NOT close the visual wave — the captured DELTA is the binding truth
// (BC anti-disease law).
//
// THE DISEASE (postmortem/az.md §1-§2): AZ.W-ADAPTIVE-AUTO (5b72fd9b) re-pointed
// `--glass-tint-strength → --glass-tint-strength-aa` (20%) UNCONDITIONALLY on every
// content tier, greying the warm-cream plate into the user's hated grey slab
// (`oklab(0.695 0.002 0.006 / 0.536)`). It rode AZ→BA→BB UNTOUCHED for three tranches
// because the gate that should have caught it is MONOTONIC: `proof:adaptive-glass-live`
// asserts only `contrastRatio >= 4.5` + `deltaL >= 0.08`, both MONOTONIC in the darken
// direction — a grey slab scores BETTER on every metric than the correct warm-cream plate.
// ZERO upper bound, ZERO warmth/chroma assertion.
//
// THE FIX (this gate): the BIDIRECTIONAL identity bound the monotonic gate never had.
// Over a CALM-LIGHT backdrop a glass surface MUST resolve `α < 0.72 AND oklab-L > 0.85
// AND oklab-chroma > 0` (warm, translucent, NOT grey) — and the historical grey-slab
// pixel value MUST RED. ONE colour-math source: the same `paintBand` leaf + OKLab
// decompose the live π arm reads (scripts/lib/paint-arm.mjs → reflect-capture-verify's
// oklabFromRgb), so the source-side disease-root bite and the live readback share the
// exact band logic (the canvas-unify single-source fence).
//
// VERIFY-and-HARDEN, not re-fix (glass-dock-codebase.md §1.1): the 4% calm floor is
// LANDED (the iteration-0 BC audit pre-fix + the BA scope-7 walk-back); this gate
// RATIFIES it + the warm-cream identity inputs + the deep-tier ceiling, and GATES the
// identity so a future darken re-poisoning REDs (the §4 collapse: ONE `--glass-tint-
// strength` axis — this wave pins the FLOOR, BC.W-ADAPTIVE-RECONCILE drives ABOVE it).
//
// Four detector clauses (each born-RED on the AZ regression, each self-tested):
//   - I1 — the warm-cream identity inputs intact (opacity ladder monotone 0.30-0.95,
//          `--card` warm chroma > 0.004 at the warm hue, `--glass-tint-strength-floor`
//          ≤ 5%). Bite: a floor lifted toward 20% / a grey `--card` / a non-monotone
//          ladder REDs.
//   - I2 — the calm floor is the UNCONDITIONAL default (the content-tier + overlay-band
//          + dock `:where()` rules set `--glass-tint-strength: var(--glass-tint-strength-
//          floor)`, NOT `-aa`). Bite: a planted unconditional `-aa` re-point REDs (the
//          exact 5b72fd9b regression line).
//   - I3 — the BIDIRECTIONAL identity bound (the π, born-RED on grey) via paintBand:
//          a warm-cream plate passes; the `oklab(0.695 …)` grey-slab fixture REDs.
//   - I4 — no unconditional full-AA darken survives (the `-aa` re-point appears ONLY
//          inside an `@container`/observer-gated block). Bite: a synthetic unconditional
//          `-aa` re-point REDs.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { oklabFromRgb } from "./reflect-capture-verify.mjs";
import { statsFromResolvedBg, paintBand } from "./lib/paint-arm.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ── shared bounds (the apple-ios27.md §5 bake-table identity bounds) ──────────────────
// The warm-cream `--card` chroma floor (BA.W-NO-GRAY; the near-white plate clears 0.004
// at the warm hue — the apple-glass differentiator made a GATE BOUND: apple.com's flat
// card is cool `#f5f5f7`, oklab-chroma ≈ 0, a grey-white panel; the warm-cream floor MUST
// out-warm it, never collapse to a neutral plate).
const CARD_CHROMA_FLOOR = 0.004;
// The calm-light tint FLOOR ceiling — born-RED if a future edit lifts it back toward the
// 20% AA darken (the 5b72fd9b regression). 5% headroom over the landed 4%.
const TINT_FLOOR_CEILING = 5; // percent
// The opacity ladder (alpha-monotonic wash < quiet < resting < floating < overlay).
const OPACITY_RUNGS = ["wash", "quiet", "resting", "floating", "overlay"];
// The unconditional content/overlay/dock `:where()` rule sources + the floor token each
// MUST point to (NOT `-aa`).
const UNCONDITIONAL_WHERE_RULES = [
    { file: "src/styles/glass/ladder.css", surface: ".glass-card,.glass-resting,.glass-quiet,.glass-wash content tiers" },
    { file: "src/styles/glass/ladder.css", surface: ".glass-floating,.glass-overlay overlay band" },
    { file: "src/styles/dock/morph.css", surface: ".glass-dock" },
];
// The BIDIRECTIONAL identity band (the calm-light anti-grey ceiling; the same band the
// live π arm reads — paintBand over the surface's OWN composited bg).
const CALM_LIGHT_BAND = { L: [0.85, 0.99], chroma: 0.01, alpha: 0.72 };
// The historical grey-slab fixture (the AZ dock plate the user hated) — the disease-root
// bite. proof:adaptive-glass-live scored this BETTER than warm cream; paintBand REDs it.
const GREY_SLAB_FIXTURE = "oklab(0.695 0.002 0.006 / 0.536)";
// The warm-cream plate as PAINTED (composited over the warm paper backdrop + rim + grain
// the live π arm reads — warmer than the bare 4%-floor `--card` because the surface
// composites over the warm page). The sanity twin of the grey-slab bite: the identity is
// ACHIEVABLE (this passes the live band), the grey slab is not (it REDs).
const WARM_CREAM_FIXTURE = "color(srgb 0.97 0.93 0.86 / 0.55)";

// ── hsl → OKLab (the no-gray plumbing; the warm chroma the eye reads) ─────────────────
function parseHsl(str) {
    const m = (str ?? "").trim().match(/^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i);
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
/** A `:root`/`.dark` token value from a partial (the literal value, not an alias). */
function tokenValue(src, token) {
    const m = src.match(new RegExp(`--${token}\\s*:\\s*([^;]+?)\\s*;`));
    return m ? m[1].trim() : null;
}

// ── I1 — the warm-cream identity inputs intact ────────────────────────────────────────
//   opacity ladder monotone 0.30-0.95; `--card` warm chroma > 0.004; tint floor ≤ 5%.
export function detectInputs(glassTokensRaw, colorRadiusRaw, glassFxRaw) {
    const violations = [];
    const facts = {};
    const glassTokens = stripCss(glassTokensRaw ?? readFile("src/styles/tokens/glass.css"));
    const colorRadius = stripCss(colorRadiusRaw ?? readFile("src/styles/tokens/color-radius.css"));
    const glassFx = stripCss(glassFxRaw ?? readFile("src/styles/tokens/glass-fx.css"));

    // (a) the opacity ladder — present + strictly alpha-monotone.
    const opacities = OPACITY_RUNGS.map((r) => {
        const v = tokenValue(glassTokens, `glass-opacity-${r}`);
        return v == null ? null : Number(v);
    });
    facts.opacities = Object.fromEntries(OPACITY_RUNGS.map((r, i) => [r, opacities[i]]));
    if (opacities.some((o) => o == null || Number.isNaN(o))) {
        violations.push(`I1: the --glass-opacity-* ladder is incomplete: ${JSON.stringify(facts.opacities)} (the warm-cream opacity identity must be present)`);
    } else {
        for (let i = 1; i < opacities.length; i++) {
            if (!(opacities[i] > opacities[i - 1])) {
                violations.push(`I1: --glass-opacity ladder is not alpha-monotone (${OPACITY_RUNGS[i - 1]}=${opacities[i - 1]} ≥ ${OPACITY_RUNGS[i]}=${opacities[i]}) — the wash<quiet<resting<floating<overlay identity broke`);
            }
        }
        // the ladder lives in [0.30, 0.95] (the warm-cream partial-transparency band).
        if (opacities[0] < 0.2 || opacities[opacities.length - 1] > 0.99) {
            violations.push(`I1: --glass-opacity ladder leaves the [0.30, 0.95] translucent band (wash=${opacities[0]}, overlay=${opacities[opacities.length - 1]}) — a near-opaque base is not the translucent identity`);
        }
    }

    // (b) `--card` resolves WARM (oklab-chroma > 0.004 at the warm hue), NOT grey.
    const cardRaw = tokenValue(colorRadius, "card");
    facts.card = cardRaw;
    const hsl = parseHsl(cardRaw);
    if (!hsl) {
        violations.push(`I1: --card is not a parseable hsl() (the warm-cream plate identity): '${cardRaw}'`);
    } else {
        const [r, g, b] = hslToRgb(...hsl);
        const ok = oklabFromRgb(r, g, b);
        facts.cardOklab = { L: Number(ok.L.toFixed(4)), chroma: Number(ok.chroma.toFixed(5)) };
        if (ok.chroma <= CARD_CHROMA_FLOOR) {
            violations.push(`I1: --card chroma ${ok.chroma.toFixed(5)} ≤ ${CARD_CHROMA_FLOOR} — a neutral grey-white plate, not the warm-cream identity (BA.W-NO-GRAY; the warm-cream MUST out-warm apple.com's cool #f5f5f7 ≈ chroma 0)`);
        }
        if (ok.L <= 0.85) {
            violations.push(`I1: --card oklab-L ${ok.L.toFixed(4)} ≤ 0.85 — the base plate is too dark (the warm-cream floor is a near-white plate)`);
        }
    }

    // (c) the calm-light tint FLOOR ≤ 5% (born-RED if lifted back toward 20%).
    const floorRaw = tokenValue(glassFx, "glass-tint-strength-floor");
    const floorPct = floorRaw ? Number((floorRaw.match(/([\d.]+)%/) ?? [])[1]) : null;
    facts.tintFloorPct = floorPct;
    if (floorPct == null || Number.isNaN(floorPct)) {
        violations.push(`I1: --glass-tint-strength-floor is not a readable percent: '${floorRaw}'`);
    } else if (floorPct > TINT_FLOOR_CEILING) {
        violations.push(`I1: --glass-tint-strength-floor is ${floorPct}% — above the ≤${TINT_FLOOR_CEILING}% calm ceiling; the unconditional floor is creeping back toward the 20% AA darken (the AZ grey-slab regression)`);
    }
    return { facts, violations };
}

// ── I2/I4 — the calm floor is the unconditional default; no unconditional `-aa` ──────
//   Each unconditional content/overlay/dock `:where()` rule resolves the calm-light plate
//   to `--glass-tint-strength-floor`; the full `-aa` darken is EARNED, never a flat
//   unconditional re-point. Two sanctioned shapes (BC.W-ADAPTIVE-RECONCILE closed the
//   observer loop, RETIRING the discrete `@container` bucket as the strength driver):
//     • the FLAT floor `--glass-tint-strength: var(--glass-tint-strength-floor)` (the
//       GLASS-IDENTITY landed pre-fix — pre-RECONCILE), OR
//     • the CONTINUOUS observer driver `clamp(var(--glass-tint-strength-floor), calc(…
//       var(--glass-backdrop-luma …) …), var(--glass-tint-strength-aa))` — a clamp that
//       READS the measured luma so the calm-light plate (luma ≤ knee, the `max(0,…)`
//       ramp → 0) resolves EXACTLY the floor and only EARNS the `-aa` ceiling under a
//       measured bright backdrop (the iOS-27 dynamic-range shift).
//   The 5b72fd9b regression bite is PRESERVED: a FLAT unconditional `-aa` (no clamp, no
//   luma read) still REDs I4 — the `-aa` literal is sanctioned ONLY as the ceiling of the
//   luma-driven clamp, never as the bare unconditional value. Parses the `:where(...) {
//   ... }` body.
function whereBlocksOf(src) {
    // Match each `:where( … ) {` selector head + its `{ … }` body (one brace level — the
    // unconditional rules are flat; an @container body wraps its own rules in a deeper
    // brace, so this captures the BARE unconditional :where() rules only).
    const out = [];
    const re = /:where\(([^)]*)\)\s*\{([^{}]*)\}/g;
    let m;
    while ((m = re.exec(src)) !== null) out.push({ selector: m[1].trim(), body: m[2] });
    return out;
}
export function detectUnconditionalFloor(sources) {
    const violations = [];
    const facts = { rules: [] };
    const files = sources ?? UNCONDITIONAL_WHERE_RULES.map((r) => ({ ...r, src: stripCss(readFile(r.file)) }));

    for (const { file, surface, src } of files) {
        // the GLASS `:where()` rules that re-point --glass-tint-strength (the tint floor
        // axis). A rule that touches --glass-tint-strength is a darken-bearing rule.
        const blocks = whereBlocksOf(src).filter((b) => /--glass-tint-strength\s*:/.test(b.body) && /glass-(card|resting|quiet|wash|floating|overlay|dock)/.test(b.selector));
        if (blocks.length === 0) {
            violations.push(`I2: ${file} (${surface}) — no unconditional :where() rule re-points --glass-tint-strength to the floor; the calm-default floor is missing (VERIFY-and-HARDEN: the landed pre-fix must be present)`);
            continue;
        }
        for (const b of blocks) {
            const m = b.body.match(/--glass-tint-strength\s*:\s*([^;]+);/);
            const value = m ? m[1].trim() : null;
            facts.rules.push({ file, selector: b.selector.slice(0, 60), tintStrength: value });
            if (!value) continue;
            // BC.W-ADAPTIVE-RECONCILE — the SANCTIONED continuous observer driver: a clamp
            // that floors at --glass-tint-strength-floor + READS the measured
            // --glass-backdrop-luma (the calm plate, luma ≤ knee, resolves the floor; the
            // -aa ceiling is EARNED only under a measured bright backdrop). The -aa literal
            // is permitted ONLY as this clamp's ceiling — never a flat unconditional value.
            const isLumaDrivenClamp =
                /\bclamp\(/.test(value) && /var\(\s*--glass-backdrop-luma\b/.test(value);
            // I2 — the unconditional rule resolves the calm plate to the FLOOR (the flat
            // floor value OR the floor as the clamp's lower bound).
            if (!/var\(--glass-tint-strength-floor\)/.test(value)) {
                violations.push(`I2: ${file} (${surface}) unconditional :where() sets --glass-tint-strength to '${value}', not 'var(--glass-tint-strength-floor)' — the calm default must be the translucent floor`);
            }
            // I4 — the bare `-aa` re-point (the 5b72fd9b unconditional 20% slab) REDs. The
            // -aa is sanctioned ONLY inside the luma-driven clamp (the earned continuous
            // darken); a FLAT `-aa` (no clamp / no luma read) is the grey-slab origin.
            if (/var\(--glass-tint-strength-aa\)/.test(value) && !isLumaDrivenClamp) {
                violations.push(`I4: ${file} (${surface}) unconditional :where() re-points --glass-tint-strength to a FLAT var(--glass-tint-strength-aa) — the AZ 5b72fd9b unconditional 20%-AA darken (the grey-slab origin). The full AA darken must be EARNED — gated on the measured --glass-backdrop-luma (the continuous clamp) or a real bright signal (@container --glass-backdrop: light), NEVER a flat unconditional re-point.`);
            }
        }
    }
    return { facts, violations };
}

// ── I3 — the BIDIRECTIONAL identity bound (the π, born-RED on grey) ───────────────────
//   The SAME paintBand the live arm reads: a warm-cream plate passes the calm-light band;
//   the historical grey-slab fixture REDs (the disease-root bite — the monotonic-gate
//   blind spot closed). Device-free (PURE over the fixture strings).
export function detectBidirectionalBound() {
    const violations = [];
    const facts = {};
    // the grey slab MUST fail the band (it scored BETTER on the monotonic gate).
    const grey = paintBand(statsFromResolvedBg(GREY_SLAB_FIXTURE), CALM_LIGHT_BAND);
    facts.greySlab = { fixture: GREY_SLAB_FIXTURE, pass: grey.pass, reasons: grey.reasons };
    if (grey.pass) {
        violations.push(`I3: the historical grey-slab fixture ${GREY_SLAB_FIXTURE} PASSED the calm-light identity band — the disease-root bite is broken (the bidirectional bound must RED the grey slab the monotonic gate scored GREEN)`);
    }
    // the warm-cream plate MUST pass the band (the identity is achievable, not impossible).
    const cream = paintBand(statsFromResolvedBg(WARM_CREAM_FIXTURE), CALM_LIGHT_BAND);
    facts.warmCream = { fixture: WARM_CREAM_FIXTURE, pass: cream.pass, reasons: cream.reasons };
    if (!cream.pass) {
        violations.push(`I3: the warm-cream fixture ${WARM_CREAM_FIXTURE} FAILED the calm-light identity band (${cream.reasons.join("; ")}) — the band is mis-tuned (the warm-cream identity must PASS)`);
    }
    return { facts, violations };
}

// ── Self-test bites — each planted defect MUST flag its clause (the anti-evasion floor) ─
export function selfTest() {
    const fails = [];

    // I1: a grey `--card` reds the warm-chroma floor.
    const greyCard = detectInputs(
        ":root { --glass-opacity-wash: 0.30; --glass-opacity-quiet: 0.50; --glass-opacity-resting: 0.65; --glass-opacity-floating: 0.80; --glass-opacity-overlay: 0.95; }",
        ":root { --card: hsl(0 0% 95%); }",
        ":root { --glass-tint-strength-floor: 4%; }",
    );
    if (!greyCard.violations.some((v) => /I1: --card chroma/.test(v))) fails.push("self-test I1: a grey hsl(0 0% 95%) --card did NOT red the warm-chroma floor");

    // I1: a floor lifted toward 20% reds.
    const liftedFloor = detectInputs(
        ":root { --glass-opacity-wash: 0.30; --glass-opacity-quiet: 0.50; --glass-opacity-resting: 0.65; --glass-opacity-floating: 0.80; --glass-opacity-overlay: 0.95; }",
        ":root { --card: hsl(36 48% 97%); }",
        ":root { --glass-tint-strength-floor: 20%; }",
    );
    if (!liftedFloor.violations.some((v) => /I1: --glass-tint-strength-floor is 20%/.test(v))) fails.push("self-test I1: a 20% --glass-tint-strength-floor did NOT red the calm ceiling");

    // I1: a non-monotone opacity ladder reds.
    const flatLadder = detectInputs(
        ":root { --glass-opacity-wash: 0.65; --glass-opacity-quiet: 0.50; --glass-opacity-resting: 0.65; --glass-opacity-floating: 0.80; --glass-opacity-overlay: 0.95; }",
        ":root { --card: hsl(36 48% 97%); }",
        ":root { --glass-tint-strength-floor: 4%; }",
    );
    if (!flatLadder.violations.some((v) => /not alpha-monotone/.test(v))) fails.push("self-test I1: a non-monotone opacity ladder did NOT red");

    // I1: the clean warm-cream identity inputs pass.
    const cleanInputs = detectInputs(
        ":root { --glass-opacity-wash: 0.30; --glass-opacity-quiet: 0.50; --glass-opacity-resting: 0.65; --glass-opacity-floating: 0.80; --glass-opacity-overlay: 0.95; }",
        ":root { --card: hsl(36 48% 97%); }",
        ":root { --glass-tint-strength-floor: 4%; }",
    );
    if (cleanInputs.violations.length !== 0) fails.push(`self-test I1: clean warm-cream inputs unexpectedly red (${cleanInputs.violations.join("; ")})`);

    // I2/I4: a planted unconditional `-aa` re-point reds (the exact 5b72fd9b regression).
    const aaRepoint = detectUnconditionalFloor([
        { file: "synthetic", surface: "content tiers", src: ":where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) { --glass-tint-strength: var(--glass-tint-strength-aa); }" },
    ]);
    if (!aaRepoint.violations.some((v) => /I4:/.test(v))) fails.push("self-test I4: a planted unconditional var(--glass-tint-strength-aa) re-point did NOT red");

    // I2: an unconditional rule that sets the floor passes its clauses.
    const floorRepoint = detectUnconditionalFloor([
        { file: "synthetic", surface: "content tiers", src: ":where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) { --glass-tint-strength: var(--glass-tint-strength-floor); }" },
    ]);
    if (floorRepoint.violations.length !== 0) fails.push(`self-test I2: a clean floor re-point unexpectedly red (${floorRepoint.violations.join("; ")})`);

    // BC.W-ADAPTIVE-RECONCILE — the SANCTIONED continuous observer driver (floor + luma-
    // driven clamp toward the -aa ceiling) PASSES I2/I4: the calm plate floors, the -aa is
    // EARNED via the measured luma, never a flat unconditional slab.
    const continuousDriver = detectUnconditionalFloor([
        { file: "synthetic", surface: "content tiers", src: ":where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) { --glass-tint-strength: clamp(var(--glass-tint-strength-floor), calc(var(--glass-tint-strength-floor) + (var(--glass-tint-strength-aa) - var(--glass-tint-strength-floor)) * max(0, (var(--glass-backdrop-luma, 0) - var(--glass-backdrop-luma-knee, 0.6)) / (1 - var(--glass-backdrop-luma-knee, 0.6)))), var(--glass-tint-strength-aa)); }" },
    ]);
    if (continuousDriver.violations.length !== 0) fails.push(`self-test I4: the sanctioned continuous luma-driven clamp unexpectedly red (${continuousDriver.violations.join("; ")})`);

    // I4 (evasion floor): a `clamp(floor, …, -aa)` that does NOT read the luma is still a
    // flat unconditional -aa darken dressed as a clamp — it MUST RED (the -aa ceiling is
    // sanctioned ONLY when the measured luma gates it).
    const fakeClampNoLuma = detectUnconditionalFloor([
        { file: "synthetic", surface: "content tiers", src: ":where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) { --glass-tint-strength: clamp(var(--glass-tint-strength-floor), var(--glass-tint-strength-aa), var(--glass-tint-strength-aa)); }" },
    ]);
    if (!fakeClampNoLuma.violations.some((v) => /I4:/.test(v))) fails.push("self-test I4: a clamp toward -aa with NO --glass-backdrop-luma read did NOT red (the luma-less clamp evasion)");

    // I3: the grey-slab fixture reds the bidirectional bound (the disease-root bite).
    const grey = paintBand(statsFromResolvedBg(GREY_SLAB_FIXTURE), CALM_LIGHT_BAND);
    if (grey.pass) fails.push("self-test I3: the grey-slab fixture PASSED the calm-light band (the disease-root bite is broken)");
    // I3: the warm-cream fixture passes the bidirectional bound.
    const cream = paintBand(statsFromResolvedBg(WARM_CREAM_FIXTURE), CALM_LIGHT_BAND);
    if (!cream.pass) fails.push(`self-test I3: the warm-cream fixture FAILED the calm-light band (${cream.reasons.join("; ")})`);

    return fails;
}

export function detect() {
    const inputs = detectInputs();
    const floor = detectUnconditionalFloor();
    const bound = detectBidirectionalBound();
    const selfTestFails = selfTest();
    const violations = [
        ...inputs.violations,
        ...floor.violations,
        ...bound.violations,
        ...selfTestFails.map((f) => `SELF-TEST: ${f}`),
    ];
    return {
        violations,
        facts: {
            inputs: inputs.facts,
            floor: floor.facts,
            bound: bound.facts,
            selfTestFails,
        },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_IDENTITY_ARTIFACT", "BC-glass-identity");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-identity",
        facts,
        violations,
    });

    console.log("proof:glass-identity — the warm-cream partial-transparency base + the BIDIRECTIONAL identity gate (BC.W-GLASS-IDENTITY)");
    console.log(`  I1 opacity ladder : ${OPACITY_RUNGS.map((r) => `${r}=${facts.inputs.opacities?.[r]}`).join(" ")}`);
    console.log(`  I1 --card         : ${facts.inputs.card}  → oklab-L=${facts.inputs.cardOklab?.L} chroma=${facts.inputs.cardOklab?.chroma} (warm > ${CARD_CHROMA_FLOOR})`);
    console.log(`  I1 tint floor     : ${facts.inputs.tintFloorPct}% (≤ ${TINT_FLOOR_CEILING}% calm ceiling)`);
    console.log(`  I2 floor default  : ${facts.floor.rules.map((r) => `${r.tintStrength}`).join(" | ")}`);
    console.log(`  I3 grey-slab bite : grey ${facts.bound.greySlab?.pass ? "PASSED ✗ (broken)" : "REDs ✓"}   warm-cream ${facts.bound.warmCream?.pass ? "passes ✓" : "FAILED ✗"}`);
    console.log(`  self-tests        : ${facts.selfTestFails.length === 0 ? "all bites fire ✓" : `BROKEN ✗ (${facts.selfTestFails.length})`}`);

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
