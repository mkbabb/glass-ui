#!/usr/bin/env node
// BC.W-AX-METRIC-HOVER — the metric-badge hover VALUE-LIFT gate (proof:metric-hover).
//
// The born-RED→GREEN device-free SOURCE arm for the speedtest-AX intake BC-W7: a
// SMALL value-lift on the EXISTING `.metric-badge:hover` slots (components.css). At
// HEAD the hover scales `1.02` with a soft `0 2px 10px …` shadow and does NOT nudge
// up (no translate). This wave lifts the badge into a tactile VALUE-LIFT — it nudges
// UP (`--metric-badge-hover-translate: -2px`), scales a hair more (`1.02 → 1.04`),
// and casts the cartoon-sticker offset-stamp shadow (`--shadow-cartoon-sm`) — so a
// metric pill reads as a tactile, liftable affordance, not a static plate.
//
// Four falsifiable clauses (each born-RED at HEAD pre-wave; GREEN after the three
// edits on the existing rule), plus the binding π readback (tests-visual/
// metric-hover.spec.ts — the painted truth: the hover translateY ≈ -2px, scale 1.04,
// the cartoon shadow; the `--metric-badge-hover-translate: 0` override keeps it flat;
// the cartoon shadow re-tints under `.dark`, both modes):
//
//   MH1 — THE TRANSLATE SLOT (-2px rise). `.metric-badge:hover` writes
//         `translate: 0 var(--metric-badge-hover-translate, -2px)` — the value-lift
//         rise + the slot a consumer retunes/zeroes. Born-RED: no translate at HEAD.
//   MH2 — THE SCALE DEFAULT IS LIFTED TO 1.04. `--metric-badge-hover-scale` defaults
//         `1.04` (NOT the HEAD `1.02`). Born-RED on the HEAD `1.02`.
//   MH3 — THE SHADOW DEFAULT IS --shadow-cartoon-sm. `--metric-badge-hover-shadow`
//         defaults to `var(--shadow-cartoon-sm)` (the cartoon-sticker offset — NOT the
//         HEAD soft `0 2px 10px …`). Born-RED on the soft shadow.
//   MH4 — COMPOSITOR-ONLY + TOKEN-FIRST. The lift legs are `translate`/`scale`/
//         `box-shadow` (NO layout property — the proof:no-layout-animation mirror); and
//         every lift value reads a `--metric-badge-hover-*` slot (a consumer zeroes/
//         retunes from :root). + a self-test bite per clause (a layout-property lift
//         reds; a hardcoded -2px/1.04/cartoon-shadow with NO slot reds — the token-first
//         floor; the false-witness discipline).
//
// House style mirrors proof-card-padding.mjs / proof-no-layout-animation.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure detector, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on any violation. The
// binding PAINTED truth is the π arm (the captured value-lift, both modes), never this
// gate alone.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMPONENTS_CSS = resolve(ROOT, "src/styles/utilities/components.css");
const ARTIFACT = gateArtifactPath("GATE_METRIC_HOVER_OUT", "BC-metric-hover");
const COMMAND = "npm run proof:metric-hover";

/** Strip CSS block + line comments so a witness never matches commented prose. */
function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

// ── Extract the body of a single CSS rule by selector (the FIRST match) from a
//    comment-stripped source. Balanced-brace scan so a nested var() fallback never
//    truncates the block. ──
function ruleBody(source, selector) {
    const idx = source.indexOf(selector);
    if (idx === -1) return null;
    const open = source.indexOf("{", idx + selector.length);
    if (open === -1) return null;
    let depth = 1;
    let i = open + 1;
    while (depth > 0 && i < source.length) {
        const ch = source[i];
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
        i++;
    }
    return source.slice(open + 1, i - 1);
}

// ── The reflow set (layout-triggering — FORBIDDEN as a lift leg; the
//    proof:no-layout-animation mirror, the same partition). The lift may ride ONLY
//    `translate`/`scale`/`box-shadow` (transform + paint channels). ──
const REFLOW_PROPS = [
    "padding",
    "margin",
    "font-size",
    "width",
    "min-width",
    "max-width",
    "inline-size",
    "block-size",
    "height",
    "min-height",
    "max-height",
    "top",
    "left",
    "right",
    "bottom",
    "inset",
    "line-height",
    "gap",
];
const isReflowProp = (prop) => {
    const p = prop.toLowerCase();
    return REFLOW_PROPS.some((r) => p === r || p.startsWith(`${r}-`));
};

// ── The detectors (pure — graded over a comment-stripped `.metric-badge:hover`
//    rule body so the synthetic self-test bites can drive them too). ──

/** MH1 — the translate slot writes `translate: 0 var(--metric-badge-hover-translate, -2px)`. */
function hasTranslateSlot(body) {
    return /translate\s*:\s*0\s+var\(\s*--metric-badge-hover-translate\s*,\s*-2px\s*\)/.test(body);
}

/** MH2 — the scale default reads the slot AND defaults to 1.04 (NOT 1.02). */
function scaleDefault(body) {
    const m = /scale\s*:\s*var\(\s*--metric-badge-hover-scale\s*,\s*([\d.]+)\s*\)/.exec(body);
    return m ? m[1] : null;
}

/** MH3 — the shadow default reads the slot AND defaults to var(--shadow-cartoon-sm). */
function shadowDefaultIsCartoon(body) {
    // the slot is read; the fallback's FIRST token is var(--shadow-cartoon-sm) (the
    // cartoon-sticker offset), NOT the soft `0 2px 10px` literal.
    const m = /box-shadow\s*:\s*var\(\s*--metric-badge-hover-shadow\s*,\s*([\s\S]*?)\)\s*;/.exec(body);
    if (!m) return { ok: false, soft: false };
    const fallback = m[1];
    const cartoon = /var\(\s*--shadow-cartoon-sm\s*\)/.test(fallback);
    const soft = /\b0\s+2px\s+10px\b/.test(fallback);
    return { ok: cartoon && !soft, soft };
}

/** MH4 — no lift leg animates a layout property + every lift leg reads a slot. */
function compositorAndTokenFirst(body) {
    // The three lift legs by property name → the value text.
    const legs = [];
    const re = /(^|[;{])\s*([a-zA-Z-]+)\s*:\s*([^;]+)/g;
    let m;
    while ((m = re.exec(body)) !== null) {
        legs.push({ prop: m[2].trim(), value: m[3].trim() });
    }
    // compositor-only: NO reflow-set property declared on the hover rule.
    const layoutLeg = legs.find((l) => isReflowProp(l.prop));
    // token-first: each of the THREE lift legs (translate/scale/box-shadow) reads a
    // --metric-badge-hover-* slot (no hardcoded magic literal off a slot).
    const liftProps = ["translate", "scale", "box-shadow"];
    const liftLegs = legs.filter((l) => liftProps.includes(l.prop.toLowerCase()));
    const everyLiftReadsSlot = liftLegs.length === 3 &&
        liftLegs.every((l) => /var\(\s*--metric-badge-hover-(translate|scale|shadow)\b/.test(l.value));
    return {
        compositorOnly: !layoutLeg,
        layoutLeg: layoutLeg ? `${layoutLeg.prop}` : null,
        tokenFirst: everyLiftReadsSlot,
        liftLegCount: liftLegs.length,
    };
}

// ── The self-test bites (the false-witness discipline — each synthetic violation
//    MUST be flagged by the very same detector, proven every run). ──
function selfTest() {
    const bites = [];

    // A layout-property lift (a `height` leg) MUST red MH4's compositor check.
    const layoutLift = `border-color: x; box-shadow: var(--metric-badge-hover-shadow, var(--shadow-cartoon-sm), var(--glass-highlight)); translate: 0 var(--metric-badge-hover-translate, -2px); scale: var(--metric-badge-hover-scale, 1.04); height: 40px;`;
    bites.push({
        name: "layout-property lift reds MH4",
        reds: compositorAndTokenFirst(layoutLift).compositorOnly === false,
    });

    // A hardcoded -2px translate with NO slot MUST red MH1 (the slot floor) AND MH4's
    // token-first check.
    const hardTranslate = `translate: 0 -2px; scale: var(--metric-badge-hover-scale, 1.04); box-shadow: var(--metric-badge-hover-shadow, var(--shadow-cartoon-sm), var(--glass-highlight));`;
    bites.push({
        name: "hardcoded -2px (no slot) reds MH1+MH4",
        reds: !hasTranslateSlot(hardTranslate) && compositorAndTokenFirst(hardTranslate).tokenFirst === false,
    });

    // The HEAD scale 1.02 MUST red MH2 (the lift is to 1.04).
    const headScale = `scale: var(--metric-badge-hover-scale, 1.02);`;
    bites.push({
        name: "HEAD scale 1.02 reds MH2",
        reds: scaleDefault(headScale) === "1.02" && scaleDefault(headScale) !== "1.04",
    });

    // The HEAD soft shadow MUST red MH3 (the lift re-points to the cartoon shadow).
    const headShadow = `box-shadow: var(--metric-badge-hover-shadow, 0 2px 10px color-mix(in srgb, var(--shadow-color) 12%, transparent), var(--glass-highlight));`;
    bites.push({
        name: "HEAD soft shadow reds MH3",
        reds: shadowDefaultIsCartoon(headShadow).ok === false,
    });

    // The GOOD shape MUST pass all four detectors (the no-false-positive floor).
    const good = `border-color: var(--metric-badge-hover-border, var(--glass-border-resting)); background: var(--metric-badge-hover-bg, var(--glass-bg-resting)); box-shadow: var(--metric-badge-hover-shadow, var(--shadow-cartoon-sm), var(--glass-highlight)); translate: 0 var(--metric-badge-hover-translate, -2px); scale: var(--metric-badge-hover-scale, 1.04);`;
    const goodMH4 = compositorAndTokenFirst(good);
    bites.push({
        name: "the good value-lift shape passes all four (no false positive)",
        reds:
            hasTranslateSlot(good) &&
            scaleDefault(good) === "1.04" &&
            shadowDefaultIsCartoon(good).ok &&
            goodMH4.compositorOnly &&
            goodMH4.tokenFirst,
    });

    return bites;
}

function run() {
    const raw = safeRead(COMPONENTS_CSS);
    const source = stripComments(raw);
    const body = ruleBody(source, ".metric-badge:hover");

    const violations = [];
    const facts = {};

    if (body == null) {
        violations.push("`.metric-badge:hover` rule not found in components.css");
        facts.ruleFound = false;
    } else {
        facts.ruleFound = true;

        // MH1 — the translate slot, -2px.
        const mh1 = hasTranslateSlot(body);
        facts.mh1 = { ok: mh1 };
        if (!mh1) {
            violations.push(
                "MH1: `.metric-badge:hover` does NOT write `translate: 0 var(--metric-badge-hover-translate, -2px)` (the value-lift rise + the slot)",
            );
        }

        // MH2 — the scale default lifted to 1.04.
        const sd = scaleDefault(body);
        facts.mh2 = { ok: sd === "1.04", scaleDefault: sd };
        if (sd !== "1.04") {
            violations.push(
                `MH2: --metric-badge-hover-scale defaults '${sd ?? "<missing>"}', expected '1.04' (the lift; the HEAD 1.02 is a clean break)`,
            );
        }

        // MH3 — the shadow default is --shadow-cartoon-sm.
        const sh = shadowDefaultIsCartoon(body);
        facts.mh3 = { ok: sh.ok, hadSoftShadow: sh.soft };
        if (!sh.ok) {
            violations.push(
                `MH3: --metric-badge-hover-shadow default is NOT var(--shadow-cartoon-sm)${sh.soft ? " (still the soft `0 2px 10px` shadow)" : ""}`,
            );
        }

        // MH4 — compositor-only + token-first.
        const mh4 = compositorAndTokenFirst(body);
        facts.mh4 = mh4;
        if (!mh4.compositorOnly) {
            violations.push(
                `MH4: the hover rule animates a LAYOUT property (\`${mh4.layoutLeg}\`) — the lift must ride translate/scale/box-shadow only (proof:no-layout-animation mirror)`,
            );
        }
        if (!mh4.tokenFirst) {
            violations.push(
                `MH4: not every lift leg reads a --metric-badge-hover-* slot (${mh4.liftLegCount}/3 lift legs found, token-first floor) — a consumer must be able to zero/retune from :root`,
            );
        }
    }

    // MH4 self-test bites.
    const bites = selfTest();
    const biteFailures = bites.filter((b) => !b.reds);
    facts.selfTest = { bites, allBite: biteFailures.length === 0 };
    if (!facts.selfTest.allBite) {
        violations.push(
            `self-test bite(s) did not RED: ${biteFailures.map((b) => b.name).join(", ")}`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        gate: "proof:metric-hover",
        command: COMMAND,
        note: "BC.W-AX-METRIC-HOVER — the metric-badge hover VALUE-LIFT (translate -2px + scale 1.04 + --shadow-cartoon-sm), the speedtest-AX BC-W7 intake. Device-free SOURCE arm; the BINDING painted truth is the π arm tests-visual/metric-hover.spec.ts (the captured value-lift, both modes), never this gate alone.",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log("proof:metric-hover — the metric-badge hover VALUE-LIFT (BC.W-AX-METRIC-HOVER)");
    console.log(`  MH1 translate slot (-2px rise)              : ${yn(facts.mh1?.ok)}`);
    console.log(`  MH2 scale default lifted to 1.04            : ${yn(facts.mh2?.ok)}  (${facts.mh2?.scaleDefault ?? "—"})`);
    console.log(`  MH3 shadow default = --shadow-cartoon-sm    : ${yn(facts.mh3?.ok)}`);
    console.log(`  MH4 compositor-only + token-first           : ${yn(facts.mh4?.compositorOnly && facts.mh4?.tokenFirst)}`);
    console.log(`  self-test bites RED                         : ${yn(facts.selfTest.allBite)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { compositorAndTokenFirst, hasTranslateSlot, ruleBody, scaleDefault, selfTest, shadowDefaultIsCartoon };
