#!/usr/bin/env node
// BI.W-GRAIN-WIRE — proof:demo-control-live, the story dead-control detector
// (born-RED at HEAD, driven GREEN by the wave).
//
// THE HEADLINE (UF-J2 — "this seems to do nothing"): the paper/glass settings demo
// carried appearance controls whose model was WRITTEN by a control (v-model /
// @update:checked) but READ NOWHERE — a slider/switch that promises a surface effect
// and delivers none is a lie the demo tells the user. This gate makes the class
// falsifiable and locks the fix.
//
// A control ref is LIVE iff, after masking its OWN control-model bindings (the
// v-model / :checked+@update read-back+write) and its declaration, the ref still
// appears somewhere — a `:style` / `:class` / `{{ }}` / other-prop binding, or a
// script `computed` / expression. If nothing survives the mask, the model is
// WRITE-ONLY (dead). The self-displaying value of a text `<input>` is intrinsic and
// out of scope; this gate enrolls the four settings appearance knobs whose whole
// point is a downstream surface effect.
//
// TWO FALSIFIABLE WITNESSES (each born-RED at HEAD pre-wave):
//
//   DCL1 — EVERY ENROLLED CONTROL REF IS READ OUTSIDE ITS OWN CONTROL. The four
//          settings appearance knobs (grain, paperGrain, cartoonShadow, reducedMotion)
//          each survive the control-binding mask. RED at HEAD: all four were bound to
//          a control and read nowhere else (no `:style`/`:class`/computed consumer).
//          BITE: a synthetic write-only Switch ref (read nowhere) MUST flag.
//   DCL2 — THE TWO NAMED UF-J2 CONTROLS RESOLVE TO REAL EFFECTS. `grain` writes
//          `--glass-grain-opacity` (derived from `grain.value`) and `paperGrain`
//          toggles the `.paper-grain-overlay` utility; the discovered half-wired
//          `density` completes to write the `--density-gap` its CardContent grids
//          already read. RED at HEAD: no `--glass-grain-opacity` write, no
//          `.paper-grain-overlay` toggle, no `--density-gap` write. BITE: a synthetic
//          settings body missing the `--glass-grain-opacity` write MUST flag.
//
// House style mirrors proof-esc-stack.mjs: ESM .mjs, comment-strip first (the
// false-witness discipline), a pure exported detector, a byte-stable JSON artefact
// via gate-output, a human summary, inline self-test bites (each synthetic evasion
// MUST flag — proven every run), process.exit(1) on any violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// The four enrolled appearance knobs — each a control whose whole job is a
// downstream surface effect (NOT a self-displaying input/select mock control).
const ENROLLED = ["grain", "paperGrain", "cartoonShadow", "reducedMotion"];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SETTINGS_VUE: resolve(ROOT, "demo/stories/compositions/settings.vue"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DEMO_CONTROL_LIVE_ARTIFACT",
            "BI-demo-control-live",
        ),
    };
    return _cliPaths;
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

// Strip TS/JS block + line comments (a commented-out binding must not satisfy or trip
// a witness — the false-witness discipline).
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
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

// Strip Vue SFC `<!-- … -->` HTML comments.
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
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

function stripAll(text) {
    return stripHtmlComments(stripBlockComments(text));
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Blank every occurrence of `re` in `text` (preserving length/newlines) so a later
// word-count sees the read-back/write bindings + declaration as absent.
function maskMatches(text, re) {
    let out = text;
    let m;
    re.lastIndex = 0;
    const spans = [];
    while ((m = re.exec(text))) {
        spans.push([m.index, m.index + m[0].length]);
        if (m.index === re.lastIndex) re.lastIndex++;
    }
    for (const [s, e] of spans) out = out.slice(0, s) + blankRange(out, s, e) + out.slice(e);
    return out;
}

/**
 * A control ref is WIRED iff — after blanking its declaration and its own
 * control-model bindings (v-model / :checked / :model-value / :pressed / :value /
 * :is-open read-backs + the @update handler that assigns it) — the identifier still
 * appears (a `:style`/`:class`/`{{ }}`/other-prop read, or a script expression). Pure.
 */
export function isControlWired(refName, strippedSfc) {
    const X = escapeRe(refName);
    let masked = strippedSfc;
    masked = maskMatches(masked, new RegExp(`\\b(?:const|let)\\s+${X}\\b`, "g"));
    masked = maskMatches(
        masked,
        new RegExp(`v-model(?::[\\w-]+)?\\s*=\\s*"${X}"`, "g"),
    );
    masked = maskMatches(
        masked,
        new RegExp(`:(?:checked|model-value|pressed|value|is-open)\\s*=\\s*"${X}"`, "g"),
    );
    masked = maskMatches(
        masked,
        new RegExp(`@update:[\\w-]+\\s*=\\s*"[^"]*\\b${X}\\s*=[^"]*"`, "g"),
    );
    // A genuine read is a STANDALONE JS identifier — NOT the same token embedded in a
    // hyphenated CSS name (e.g. `grain` inside `--paper-grain-opacity` /
    // `paper-grain-overlay` is a class/token substring, not a read of the ref). `\b`
    // treats `-` as a boundary, so widen the boundary to exclude `-`, `$`, word chars.
    return new RegExp(`(?<![\\w$-])${X}(?![\\w$-])`).test(masked);
}

// A control ref = a ref bound to a control-model in the template (the enrollment
// domain — the gate can only enroll refs that ARE control-bound).
export function isControlBound(refName, strippedSfc) {
    const X = escapeRe(refName);
    return (
        new RegExp(`v-model(?::[\\w-]+)?\\s*=\\s*"${X}"`).test(strippedSfc) ||
        new RegExp(`:(?:checked|model-value|pressed|value|is-open)\\s*=\\s*"${X}"`).test(
            strippedSfc,
        ) ||
        new RegExp(`@update:[\\w-]+\\s*=\\s*"[^"]*\\b${X}\\s*=`).test(strippedSfc)
    );
}

/**
 * The W-GRAIN-WIRE detector. Pure: takes the settings SFC (raw) + the enrolled set,
 * returns `{ facts, violations }`. Each witness pushes a falsifiable violation.
 */
export function detectDemoControlLive(sources) {
    const enrolled = sources.enrolled ?? ENROLLED;
    const stripped = stripAll(sources.settingsVue ?? "");
    const violations = [];

    // ── DCL1 — every enrolled control ref is read outside its own control ────────
    const dcl1 = {};
    for (const ref of enrolled) {
        const bound = isControlBound(ref, stripped);
        const wired = bound && isControlWired(ref, stripped);
        dcl1[ref] = { bound, wired };
        if (!bound) {
            violations.push(
                `DCL1: enrolled control ref \`${ref}\` is not bound to any control in settings.vue — the enrollment has no subject (a rename/removal must re-home the enrollment).`,
            );
        } else if (!wired) {
            violations.push(
                `DCL1: \`${ref}\` is WRITE-ONLY — bound to a control but read nowhere else (no :style/:class/computed consumer). The control promises a surface effect and delivers none (the UF-J2 class).`,
            );
        }
    }

    // ── DCL2 — the named UF-J2 controls resolve to real effects ──────────────────
    // grain → --glass-grain-opacity (derived from grain.value).
    const grainTokenWritten = /["']--glass-grain-opacity["']\s*:/.test(stripped);
    const grainDerives = /\bgrain\.value\b/.test(stripped);
    const grainWired = grainTokenWritten && grainDerives;
    // paperGrain → the .paper-grain-overlay utility, keyed on paperGrain.
    const paperOverlayToggled =
        /["']paper-grain-overlay["']\s*:\s*paperGrain\b/.test(stripped);
    // density (the discovered half-wired control) → the --density-gap its CardContent
    // grids already read, derived from density.value.
    const densityTokenWritten = /["']--density-gap["']\s*:/.test(stripped);
    const densityDerives = /\bdensity\.value\b/.test(stripped);
    const densityWired = densityTokenWritten && densityDerives;

    if (!grainWired) {
        violations.push(
            "DCL2: `grain` does not write `--glass-grain-opacity` derived from `grain.value` — the grain slider changes no grain density.",
        );
    }
    if (!paperOverlayToggled) {
        violations.push(
            "DCL2: `paperGrain` does not toggle the `.paper-grain-overlay` utility — the paper-underpaint switch toggles nothing.",
        );
    }
    if (!densityWired) {
        violations.push(
            "DCL2: `density` does not write `--density-gap` (derived from `density.value`) — the CardContent grids read the token but nothing sets it (the half-wired control).",
        );
    }

    const facts = {
        enrolled,
        dcl1,
        dcl2: {
            grainTokenWritten,
            grainDerives,
            grainWired,
            paperOverlayToggled,
            densityTokenWritten,
            densityDerives,
            densityWired,
        },
    };
    return { facts, violations };
}

// ── Self-test bites (the RED-witness inverses, proven every run) ─────────────────
// Bite DCL1: a synthetic write-only Switch ref (read nowhere) MUST flag.
function selfTestDcl1Bite() {
    const SYNTHETIC = [
        "<script setup>",
        "const deadKnob = ref(true)",
        "</scr" + "ipt>",
        "<template>",
        '  <Switch :checked="deadKnob" @update:checked="(v) => (deadKnob = v)" />',
        "</template>",
    ].join("\n");
    const { facts } = detectDemoControlLive({
        settingsVue: SYNTHETIC,
        enrolled: ["deadKnob"],
    });
    // bound but not wired — the write-only detector caught it.
    return facts.dcl1.deadKnob.bound === true && facts.dcl1.deadKnob.wired === false;
}

// Bite DCL1-inverse: a WIRED synthetic ref (read in :class) MUST NOT flag.
function selfTestDcl1LiveBite() {
    const SYNTHETIC = [
        "<script setup>",
        "const liveKnob = ref(true)",
        "</scr" + "ipt>",
        "<template>",
        '  <Switch :checked="liveKnob" @update:checked="(v) => (liveKnob = v)" />',
        '  <div :class="{ on: liveKnob }" />',
        "</template>",
    ].join("\n");
    const { facts } = detectDemoControlLive({
        settingsVue: SYNTHETIC,
        enrolled: ["liveKnob"],
    });
    return facts.dcl1.liveKnob.wired === true;
}

// Bite DCL2: a synthetic settings body missing the --glass-grain-opacity write MUST
// flag the grain witness.
function selfTestDcl2Bite() {
    const SYNTHETIC = [
        "<script setup>",
        "const grain = ref(3.5)",
        "</scr" + "ipt>",
        "<template>",
        '  <LabeledSlider v-model="grain" label="Grain" />',
        "</template>",
    ].join("\n");
    const { facts } = detectDemoControlLive({
        settingsVue: SYNTHETIC,
        enrolled: [],
    });
    return facts.dcl2.grainWired === false;
}

function run() {
    const P = cliPaths();
    const { ROOT } = P;

    const { facts, violations } = detectDemoControlLive({
        settingsVue: safeRead(P.SETTINGS_VUE),
    });

    const dcl1BiteTeeth = selfTestDcl1Bite();
    const dcl1LiveTeeth = selfTestDcl1LiveBite();
    const dcl2BiteTeeth = selfTestDcl2Bite();
    if (!dcl1BiteTeeth) {
        violations.push(
            "SELF-TEST: the DCL1 write-only bite did not flag the synthetic evasion — the gate's teeth are broken.",
        );
    }
    if (!dcl1LiveTeeth) {
        violations.push(
            "SELF-TEST: the DCL1 live-control bite false-flagged a genuinely wired ref — the detector over-reaches.",
        );
    }
    if (!dcl2BiteTeeth) {
        violations.push(
            "SELF-TEST: the DCL2 missing-token bite did not flag the synthetic evasion — the gate's teeth are broken.",
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:demo-control-live",
        facts,
        violations,
        selfTest: { dcl1BiteTeeth, dcl1LiveTeeth, dcl2BiteTeeth },
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:demo-control-live — the story dead-control detector (BI.W-GRAIN-WIRE)",
    );
    for (const ref of facts.enrolled) {
        const r = facts.dcl1[ref];
        console.log(
            `  DCL1 ${ref.padEnd(15)} wired : ${yn(r.bound && r.wired)}  (bound:${yn(r.bound)})`,
        );
    }
    console.log(
        `  DCL2 grain → --glass-grain-opacity      : ${yn(facts.dcl2.grainWired)}`,
    );
    console.log(
        `  DCL2 paperGrain → .paper-grain-overlay  : ${yn(facts.dcl2.paperOverlayToggled)}`,
    );
    console.log(
        `  DCL2 density → --density-gap (half-wire) : ${yn(facts.dcl2.densityWired)}`,
    );
    console.log(`  self-test DCL1 write-only bite teeth     : ${yn(dcl1BiteTeeth)}`);
    console.log(`  self-test DCL1 live-control bite teeth    : ${yn(dcl1LiveTeeth)}`);
    console.log(`  self-test DCL2 missing-token bite teeth   : ${yn(dcl2BiteTeeth)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
