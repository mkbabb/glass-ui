// BC.W-AX-DOCK-COCKPIT — proof:dock-cockpit, the `cockpit` dock-preset gate
// (born-RED at HEAD, driven GREEN by the wave). Device-free SOURCE/STRUCTURE arm.
//
// THE ASK (speedtest-AX intake BC-W4 / the dock-oversize chronic A-9). The dock
// control + label read too LARGE on the speedtest cockpit surface. The root: no
// tight FIXED preset (the density picks LOOSEN the geometry — `spacious` is 2.75rem
// but with the LOOSEST chrome) + the label reads a FIXED `--type-subheading` rung
// (oversize on a tight pill). The fix (this wave): a NAMED `[data-preset="cockpit"]`
// geometry register (a FIXED 2.75rem control floor + COMPACT-tight chrome) + the
// `--dock-label-ratio` knob (the label tracks the control height by proportion, so a
// tighter control carries a proportionally tighter label).
//
// FIVE falsifiable witnesses (each born-RED at HEAD pre-wave, driven GREEN here) +
// a self-test bite per clause:
//
//   K1 — the `[data-preset="cockpit"]` block EXISTS + floors at a FIXED 2.75rem.
//        The block sets `--dock-control-size` AND `--dock-layer-height` to
//        `max(calc(2.75rem * var(--dock-scale)), var(--dock-control-floor …))` — the
//        Q6 FIXED value, NOT a `clamp(2.5rem, …, 3rem)` range. RED at HEAD: no
//        `[data-preset="cockpit"]` at all.
//   K2 — the cockpit is TIGHT (compact chrome), not spacious. The cockpit
//        padding/gap/tile-pad resolve the COMPACT-rung literals (NOT the spacious
//        loosening). A cockpit that reads the spacious `0.5rem`/`0.75rem` loose pad
//        REDs (the A-9 chronic is "too large", a loose cockpit re-opens it).
//   K3 — `--dock-label-ratio` mints + the `dock-label` font-size tracks the control.
//        The token is declared (sizing.css); the `@utility dock-label` font-size reads
//        `calc(var(--dock-control-size …) * var(--dock-label-ratio))` (NOT the bare
//        fixed `--type-subheading` — a fixed-rung label that ignores the control height
//        REDs, the oversize-label root); the `--dock-label-size` explicit-knob override
//        STILL wins (the audacious-mobile carve precedent preserved).
//   K4 — the bare default is byte-near-identical. The `:root --dock-label-ratio`
//        default reproduces `--type-subheading` at the comfortable `2.5rem` control
//        (ratio × 2.5rem ≈ subheading within a tight band); the cockpit is OPT-IN
//        (the control floor is the comfortable 2.5rem with no preset). A
//        cockpit-as-default (the cockpit control on `:root`/`.glass-dock` bare) REDs.
//   K5 — the 44px floor + `--dock-scale` thread. The cockpit control-size rides
//        `* var(--dock-scale)` AND the `max(…, var(--dock-control-floor …))` clamp
//        (the WCAG-2.5.5 floor never dropped on coarse pointer). A cockpit floor
//        missing the scale thread OR the floor clamp REDs.
//
// The π binding readback (the cardinal-lesson DELTA) lives in tests-visual/
// dock-cockpit.spec.ts + the captured DELTA at docs/tranches/BC/audit/visual/
// W-AX-DOCK-COCKPIT-DELTA.md — a LOCAL real-render of a comfortable dock vs a
// `[data-preset="cockpit"]` dock (the cockpit control ≈ 2.75rem, the label ≈
// control × ratio measurably tighter, the bare default byte-near-identical, the
// `--dock-label-ratio` cascade, the 44px floor on coarse pointer). The device-free
// K1-K5 source arm runs on EVERY runner; the π readback is the binding visual truth
// (a source-green/visually-broken render does NOT close). House style mirrors
// proof-dock-plate-clearance.mjs / proof-dock-arbitrary.mjs.

import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

const COMMAND = "npm run proof:dock-cockpit";
const PX_PER_REM = 16;

// The Q6 fixed cockpit control floor (rem) + the comfortable default control (rem)
// + the HEAD subheading rung the default ratio must reproduce.
const COCKPIT_REM = 2.75;
const COMFORTABLE_REM = 2.5;
const SUBHEADING_REM = 1.272; // typography/scale.css `--type-subheading: 1.272rem`
// The K4 byte-near-identical band: the default ratio × comfortable control must land
// within this many px of the subheading rung (a tight band — the ratio is calibrated
// to reproduce it; a drift beyond this is a visible default change, the MIGRATION row
// the fence forbids).
const DEFAULT_LABEL_TOLERANCE_PX = 0.6;

// ── Strip CSS block comments (false-witness discipline) ─────────────────────────
function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Pull the body `{ … }` of the FIRST rule whose selector matches `selectorRe` from a
// comment-stripped CSS string. Returns "" when no such rule.
function ruleBody(css, selectorRe) {
    const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
    for (const b of blocks) {
        if (selectorRe.test(b[1].trim())) return b[2];
    }
    return "";
}

// Parse the FIRST `<n>rem`/`<n>px` length the value mentions → px. NaN otherwise.
function firstLenToPx(value) {
    if (value == null) return NaN;
    let m = String(value).match(/([\d.]+)rem/);
    if (m) return Number.parseFloat(m[1]) * PX_PER_REM;
    m = String(value).match(/([\d.]+)px/);
    if (m) return Number.parseFloat(m[1]);
    return NaN;
}

// ── K1 — the cockpit block exists + floors at a FIXED 2.75rem (Q6) ──────────────
// PURE over the comment-stripped density CSS. The cockpit `--dock-control-size` AND
// `--dock-layer-height` must be `max(calc(2.75rem * var(--dock-scale)), …floor…)` —
// the Q6 fixed base, NOT a `clamp()` range.
export function detectK1(densityCss) {
    const violations = [];
    const facts = {};
    const css = stripBlockComments(densityCss);

    const body = ruleBody(css, /\.glass-dock\[data-preset="cockpit"\]/);
    facts.blockExists = body.length > 0;
    if (!facts.blockExists) {
        violations.push(
            'K1: no `.glass-dock[data-preset="cockpit"]` block in dock/density.css — the cockpit geometry preset is absent (the dock-oversize chronic A-9 has no named tight register)',
        );
        return { facts, violations };
    }

    // Both axes set the FIXED 2.75rem base (a `2.75rem` literal inside the calc).
    const controlDecl = (body.match(/--dock-control-size\s*:([^;]+);/) || [])[1] || "";
    const layerDecl = (body.match(/--dock-layer-height\s*:([^;]+);/) || [])[1] || "";
    facts.controlDecl = controlDecl.replace(/\s+/g, " ").trim();
    facts.layerDecl = layerDecl.replace(/\s+/g, " ").trim();

    const isFixed275 = (decl) =>
        /2\.75rem/.test(decl) && !/clamp\(/.test(decl) && /calc\(/.test(decl);
    facts.controlFixed275 = isFixed275(controlDecl);
    facts.layerFixed275 = isFixed275(layerDecl);
    // The Q6 fixed-value assert: a `clamp(2.5rem, …, 3rem)` range REDs.
    const controlRange = /clamp\(/.test(controlDecl);
    const layerRange = /clamp\(/.test(layerDecl);
    facts.controlIsRange = controlRange;
    facts.layerIsRange = layerRange;

    if (!facts.controlFixed275)
        violations.push(
            `K1: the cockpit \`--dock-control-size\` is not a FIXED 2.75rem (Q6) calc — got \`${facts.controlDecl || "(absent)"}\` (a clamp-range floor reds the Q6 fixed-value assert)`,
        );
    if (!facts.layerFixed275)
        violations.push(
            `K1: the cockpit \`--dock-layer-height\` is not a FIXED 2.75rem (Q6) calc — got \`${facts.layerDecl || "(absent)"}\` (the control height must lockstep the control size)`,
        );
    if (controlRange || layerRange)
        violations.push(
            "K1: the cockpit control floor uses a `clamp()` RANGE — Q6 ratifies a FIXED 2.75rem value, not a range register",
        );

    facts.cockpitBody = body;
    return { facts, violations };
}
// K1 self-test bite — a `clamp(2.5rem, …, 3rem)` range MUST NOT satisfy the
// fixed-value detector; the `max(calc(2.75rem * …), …)` fixed floor MUST.
function detectK1SelfTest() {
    const RANGE = `--dock-control-size: clamp(2.5rem, 4vw, 3rem);`;
    const FIXED = `--dock-control-size: max(calc(2.75rem * var(--dock-scale)), var(--dock-control-floor, 0px));`;
    const fixed = (s) => {
        const d = (s.match(/--dock-control-size\s*:([^;]+);/) || [])[1] || "";
        return /2\.75rem/.test(d) && !/clamp\(/.test(d) && /calc\(/.test(d);
    };
    return fixed(RANGE) === false && fixed(FIXED) === true;
}

// ── K2 — the cockpit is TIGHT (compact chrome), not spacious ────────────────────
// The cockpit padding/gap resolve the COMPACT-rung literals, NOT the spacious
// loosening (a loose cockpit re-opens the A-9 oversize chronic). We assert the
// cockpit padding-block + gap read the compact bases (0.25rem) and STRICTLY less
// than the spacious bases (0.5rem).
export function detectK2(densityCss) {
    const violations = [];
    const facts = {};
    const css = stripBlockComments(densityCss);
    const body = ruleBody(css, /\.glass-dock\[data-preset="cockpit"\]/);
    if (!body) {
        violations.push("K2: no cockpit block to inspect chrome (see K1)");
        return { facts, violations };
    }

    const padBlock = firstLenToPx((body.match(/--dock-padding-block\s*:([^;]+);/) || [])[1] || "");
    const padInline = firstLenToPx((body.match(/--dock-padding-inline\s*:([^;]+);/) || [])[1] || "");
    const gap = firstLenToPx((body.match(/--dock-layer-gap\s*:([^;]+);/) || [])[1] || "");
    facts.padBlockPx = padBlock;
    facts.padInlinePx = padInline;
    facts.gapPx = gap;

    // The spacious loose bases (px) the cockpit must beat: padding-block 0.5rem,
    // padding-inline 0.75rem, gap 0.5rem.
    const SPACIOUS_PAD_BLOCK = 0.5 * PX_PER_REM;
    const SPACIOUS_PAD_INLINE = 0.75 * PX_PER_REM;
    const SPACIOUS_GAP = 0.5 * PX_PER_REM;

    const padBlockTight = Number.isFinite(padBlock) && padBlock < SPACIOUS_PAD_BLOCK;
    const padInlineTight = Number.isFinite(padInline) && padInline < SPACIOUS_PAD_INLINE;
    const gapTight = Number.isFinite(gap) && gap < SPACIOUS_GAP;
    facts.padBlockTight = padBlockTight;
    facts.padInlineTight = padInlineTight;
    facts.gapTight = gapTight;

    if (!padBlockTight)
        violations.push(
            `K2: the cockpit \`--dock-padding-block\` (${Number.isFinite(padBlock) ? `${padBlock}px` : "absent"}) is not TIGHTER than the spacious ${SPACIOUS_PAD_BLOCK}px — a loose cockpit re-opens the A-9 oversize chronic`,
        );
    if (!padInlineTight)
        violations.push(
            `K2: the cockpit \`--dock-padding-inline\` (${Number.isFinite(padInline) ? `${padInline}px` : "absent"}) is not TIGHTER than the spacious ${SPACIOUS_PAD_INLINE}px`,
        );
    if (!gapTight)
        violations.push(
            `K2: the cockpit \`--dock-layer-gap\` (${Number.isFinite(gap) ? `${gap}px` : "absent"}) is not TIGHTER than the spacious ${SPACIOUS_GAP}px — the cockpit is a DENSE strip, not the spacious loosening`,
        );

    return { facts, violations };
}
// K2 self-test bite — a cockpit with the spacious-loose padding MUST flag; the
// compact-tight padding MUST pass.
function detectK2SelfTest() {
    const LOOSE = `.glass-dock[data-preset="cockpit"] { --dock-padding-block: calc(0.5rem * var(--dock-scale)); }`;
    const TIGHT = `.glass-dock[data-preset="cockpit"] { --dock-padding-block: calc(0.25rem * var(--dock-scale)); }`;
    const tight = (s) => {
        const body = ruleBody(s, /\.glass-dock\[data-preset="cockpit"\]/);
        const pb = firstLenToPx((body.match(/--dock-padding-block\s*:([^;]+);/) || [])[1] || "");
        return Number.isFinite(pb) && pb < 0.5 * PX_PER_REM;
    };
    return tight(LOOSE) === false && tight(TIGHT) === true;
}

// ── K3 — `--dock-label-ratio` mints + the label tracks the control ──────────────
// The token is declared (tokens monolith); the `@utility dock-label` font-size reads
// `calc(var(--dock-control-size …) * var(--dock-label-ratio))` (NOT the bare fixed
// `--type-subheading`); the `--dock-label-size` explicit knob STILL wins.
export function detectK3(tokensCss, typographyCss) {
    const violations = [];
    const facts = {};
    const tokens = stripBlockComments(tokensCss);
    const typography = stripBlockComments(typographyCss);

    facts.ratioMinted = /--dock-label-ratio\s*:/.test(tokens);
    if (!facts.ratioMinted)
        violations.push(
            "K3: `--dock-label-ratio` is not declared (tokens/sizing.css) — the label has no proportion knob (the oversize-label root unfixed)",
        );

    // The `@utility dock-label { font-size: … }` declaration.
    const labelBody = ruleBody(typography, /@utility\s+dock-label/);
    const fontSize = (labelBody.match(/font-size\s*:([^;]+);/) || [])[1] || "";
    facts.dockLabelFontSize = fontSize.replace(/\s+/g, " ").trim();

    // The font-size reads `calc(... --dock-control-size ... * ... --dock-label-ratio ...)`.
    facts.labelTracksControl =
        /--dock-control-size/.test(fontSize) && /--dock-label-ratio/.test(fontSize) && /calc\(/.test(fontSize);
    // The `--dock-label-size` explicit knob STILL wins (it is the OUTER var fallback).
    facts.explicitKnobWins = /var\(\s*--dock-label-size\s*,/.test(fontSize);
    // The fixed-rung root must be GONE as the bare value — a font-size of bare
    // `var(--dock-label-size, var(--type-subheading))` (ignoring the control height)
    // is the oversize-label defect this clause forbids.
    facts.fixedRungFallbackGone =
        !/var\(\s*--dock-label-size\s*,\s*var\(\s*--type-subheading\s*\)\s*\)/.test(fontSize);

    if (!facts.labelTracksControl)
        violations.push(
            `K3: the \`dock-label\` font-size does not track the control by ratio (\`calc(var(--dock-control-size) * var(--dock-label-ratio))\`) — got \`${facts.dockLabelFontSize || "(absent)"}\` (a fixed-rung label that ignores the control height is the oversize-label root)`,
        );
    if (!facts.explicitKnobWins)
        violations.push(
            "K3: the `--dock-label-size` explicit knob no longer wins (`var(--dock-label-size, …)`) — the audacious-mobile carve precedent must be preserved (the ratio is the FALLBACK, not a clean break)",
        );
    if (!facts.fixedRungFallbackGone)
        violations.push(
            "K3: the `dock-label` font-size still falls to the bare fixed `--type-subheading` rung (ignoring the control height) — the oversize-label root is unfixed",
        );

    return { facts, violations };
}
// K3 self-test bite — the HEAD bare fixed-rung font-size MUST flag (no ratio); the
// ratio-tracking font-size MUST pass.
function detectK3SelfTest() {
    const FIXED = `@utility dock-label { font-size: var(--dock-label-size, var(--type-subheading)); }`;
    const RATIO = `@utility dock-label { font-size: var(--dock-label-size, calc(var(--dock-control-size, 2.5rem) * var(--dock-label-ratio))); }`;
    const tracks = (s) => {
        const body = ruleBody(s, /@utility\s+dock-label/);
        const fs = (body.match(/font-size\s*:([^;]+);/) || [])[1] || "";
        return /--dock-control-size/.test(fs) && /--dock-label-ratio/.test(fs) && /calc\(/.test(fs);
    };
    return tracks(FIXED) === false && tracks(RATIO) === true;
}

// ── K4 — the bare default is byte-near-identical ────────────────────────────────
// The `:root --dock-label-ratio` default × the comfortable 2.5rem control reproduces
// `--type-subheading` (within DEFAULT_LABEL_TOLERANCE_PX); the cockpit is OPT-IN (the
// cockpit control floor is NOT set on `:root`/a bare `.glass-dock`).
export function detectK4(tokensCss, densityCss) {
    const violations = [];
    const facts = {};
    const tokens = stripBlockComments(tokensCss);
    const density = stripBlockComments(densityCss);

    // The `:root` default ratio value.
    const ratioRaw = (tokens.match(/--dock-label-ratio\s*:\s*([\d.]+)\s*;/) || [])[1];
    const ratio = ratioRaw ? Number.parseFloat(ratioRaw) : NaN;
    facts.rootRatio = Number.isNaN(ratio) ? null : ratio;

    if (Number.isNaN(ratio)) {
        violations.push(
            "K4: the `:root --dock-label-ratio` default is not a bare numeric literal — cannot prove it reproduces the subheading rung",
        );
    } else {
        const reproducedPx = ratio * COMFORTABLE_REM * PX_PER_REM;
        const subheadingPx = SUBHEADING_REM * PX_PER_REM;
        const deltaPx = Math.abs(reproducedPx - subheadingPx);
        facts.reproducedLabelPx = round(reproducedPx);
        facts.subheadingPx = round(subheadingPx);
        facts.deltaPx = round(deltaPx);
        facts.byteNearIdentical = deltaPx <= DEFAULT_LABEL_TOLERANCE_PX;
        if (!facts.byteNearIdentical)
            violations.push(
                `K4: the default ratio ${ratio} × comfortable ${COMFORTABLE_REM}rem = ${round(reproducedPx)}px diverges from the subheading ${round(subheadingPx)}px by ${round(deltaPx)}px (> ${DEFAULT_LABEL_TOLERANCE_PX}px) — the bare default is NOT byte-near-identical (a MIGRATION row the fence forbids)`,
            );
    }

    // The cockpit is OPT-IN: the 2.75rem cockpit floor must NOT be set on a bare
    // `:root` or `.glass-dock` (only inside the `[data-preset="cockpit"]` block). We
    // confirm no `:root`/bare-`.glass-dock` rule sets `--dock-control-size` to the
    // cockpit fixed floor. (The density rungs set it on `[data-density]` selectors,
    // which is correct — the default render picks the comfortable rung.)
    const rootBody = ruleBody(density, /^:root$/m);
    const bareDockBody = ruleBody(density, /^\.glass-dock$/m);
    const cockpitOnRoot = /--dock-control-size\s*:[^;]*2\.75rem/.test(rootBody);
    const cockpitOnBareDock = /--dock-control-size\s*:[^;]*2\.75rem/.test(bareDockBody);
    facts.cockpitNotDefault = !cockpitOnRoot && !cockpitOnBareDock;
    if (!facts.cockpitNotDefault)
        violations.push(
            "K4: the cockpit 2.75rem control floor is set on `:root`/bare `.glass-dock` (not the `[data-preset]` scope) — the cockpit is OPT-IN, never the default",
        );

    return { facts, violations };
}
// K4 self-test bite — a default ratio that blows the subheading band MUST flag; the
// calibrated default MUST pass.
function detectK4SelfTest() {
    const reproduces = (ratio) => {
        const deltaPx = Math.abs(ratio * COMFORTABLE_REM * PX_PER_REM - SUBHEADING_REM * PX_PER_REM);
        return deltaPx <= DEFAULT_LABEL_TOLERANCE_PX;
    };
    return reproduces(0.8) === false && reproduces(0.5088) === true;
}

// ── K5 — the 44px floor + `--dock-scale` thread ─────────────────────────────────
// The cockpit control-size rides `* var(--dock-scale)` AND the `max(…,
// var(--dock-control-floor …))` clamp — the WCAG-2.5.5 touch target never drops below
// the floor on coarse pointer.
export function detectK5(densityCss) {
    const violations = [];
    const facts = {};
    const css = stripBlockComments(densityCss);
    const body = ruleBody(css, /\.glass-dock\[data-preset="cockpit"\]/);
    if (!body) {
        violations.push("K5: no cockpit block to inspect the scale/floor thread (see K1)");
        return { facts, violations };
    }

    const controlDecl = (body.match(/--dock-control-size\s*:([^;]+);/) || [])[1] || "";
    facts.controlDecl = controlDecl.replace(/\s+/g, " ").trim();
    facts.ridesScale = /var\(\s*--dock-scale\s*\)/.test(controlDecl);
    facts.hasFloorClamp =
        /max\(/.test(controlDecl) && /var\(\s*--dock-control-floor/.test(controlDecl);

    if (!facts.ridesScale)
        violations.push(
            "K5: the cockpit `--dock-control-size` does not ride `* var(--dock-scale)` — the cockpit is off the coarse-pointer scale thread (the dense chrome cannot scale with touch)",
        );
    if (!facts.hasFloorClamp)
        violations.push(
            "K5: the cockpit `--dock-control-size` is not floored by `max(…, var(--dock-control-floor …))` — the WCAG-2.5.5 44px touch target could drop sub-floor on coarse pointer",
        );

    return { facts, violations };
}
// K5 self-test bite — a cockpit floor missing the scale thread OR the floor clamp
// MUST flag; the fully-threaded floor MUST pass.
function detectK5SelfTest() {
    const NO_SCALE = `--dock-control-size: max(2.75rem, var(--dock-control-floor, 0px));`;
    const NO_FLOOR = `--dock-control-size: calc(2.75rem * var(--dock-scale));`;
    const FULL = `--dock-control-size: max(calc(2.75rem * var(--dock-scale)), var(--dock-control-floor, 0px));`;
    const ok = (decl) =>
        /var\(\s*--dock-scale\s*\)/.test(decl) &&
        /max\(/.test(decl) &&
        /var\(\s*--dock-control-floor/.test(decl);
    return ok(NO_SCALE) === false && ok(NO_FLOOR) === false && ok(FULL) === true;
}

function round(n) {
    return Math.round(n * 100) / 100;
}

// ── compose ──
export function detect({ densityCss, tokensCss, typographyCss }) {
    const k1 = detectK1(densityCss);
    const k2 = detectK2(densityCss);
    const k3 = detectK3(tokensCss, typographyCss);
    const k4 = detectK4(tokensCss, densityCss);
    const k5 = detectK5(densityCss);

    const selfTests = {
        k1: detectK1SelfTest(),
        k2: detectK2SelfTest(),
        k3: detectK3SelfTest(),
        k4: detectK4SelfTest(),
        k5: detectK5SelfTest(),
    };
    const selfTestViolations = [];
    for (const [k, ok] of Object.entries(selfTests)) {
        if (!ok)
            selfTestViolations.push(
                `${k.toUpperCase()} self-test bite BROKE — the detector does not bite its planted ${k} fixture`,
            );
    }

    const violations = [
        ...k1.violations,
        ...k2.violations,
        ...k3.violations,
        ...k4.violations,
        ...k5.violations,
        ...selfTestViolations,
    ];
    return {
        violations,
        facts: {
            k1: k1.facts,
            k2: k2.facts,
            k3: k3.facts,
            k4: k4.facts,
            k5: k5.facts,
            selfTests,
        },
    };
}

function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_COCKPIT_ARTIFACT", "BC-dock-cockpit");

    const densityCss = readFileSync(resolve(ROOT, "src/styles/dock/density.css"), "utf8");
    const tokensCss = readMonolith(ROOT, "tokens"); // offsets + sizing partials (the --dock-label-ratio home)
    const typographyCss = readMonolith(ROOT, "typography"); // scale + semantic (the @utility dock-label home)

    const { violations, facts } = detect({ densityCss, tokensCss, typographyCss });
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts,
        violations,
    });

    printSummary({ status, facts, violations });
    process.exit(status === "pass" ? 0 : 1);
}

function printSummary({ status, facts, violations }) {
    console.log(
        "proof:dock-cockpit — the `cockpit` dock-preset gate (BC.W-AX-DOCK-COCKPIT)",
    );
    console.log(
        `  K1 fixed 2.75rem (Q6) : blockExists=${facts.k1.blockExists} control=${facts.k1.controlFixed275} layer=${facts.k1.layerFixed275} isRange=${facts.k1.controlIsRange || facts.k1.layerIsRange}`,
    );
    console.log(
        `  K2 cockpit is tight   : padBlock=${facts.k2.padBlockTight} padInline=${facts.k2.padInlineTight} gap=${facts.k2.gapTight} (${facts.k2.padBlockPx}/${facts.k2.padInlinePx}/${facts.k2.gapPx}px)`,
    );
    console.log(
        `  K3 label tracks ratio : ratioMinted=${facts.k3.ratioMinted} tracksControl=${facts.k3.labelTracksControl} explicitKnobWins=${facts.k3.explicitKnobWins} fixedRungGone=${facts.k3.fixedRungFallbackGone}`,
    );
    console.log(
        `  K4 default identical  : rootRatio=${facts.k4.rootRatio} label=${facts.k4.reproducedLabelPx}px vs subheading=${facts.k4.subheadingPx}px (Δ${facts.k4.deltaPx}px) cockpitNotDefault=${facts.k4.cockpitNotDefault}`,
    );
    console.log(
        `  K5 floor + scale      : ridesScale=${facts.k5.ridesScale} floorClamp=${facts.k5.hasFloorClamp}`,
    );
    console.log(
        `  self-tests            : ${Object.entries(facts.selfTests).map(([k, v]) => `${k}=${v ? "OK" : "BROKE"}`).join(" ")}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
