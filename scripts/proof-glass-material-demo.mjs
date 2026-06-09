#!/usr/bin/env node
// AX.W48 — proof:glass-material-demo, the demo-route SOURCE-STRUCTURE falsifier:
// the glass-material story BINDS the shipped material seams it narrates (device-
// free SOURCE arm + a fail-CLOSED π render arm).
//
// THE DEFECT (D8 — `/substrates/glass-material` totally broken): the story stages a
// showcase for behaviours the demo itself fails to enable, against a recipe W09
// (`93696b3`) deliberately made dormant-at-rest. The library `.glass-material`
// grammar is SOUND (W09/W20/W25b own + freeze it; proof:glass-material-unified +
// proof:glass-material-sota assert the RECIPE and PASS green over this broken demo —
// they never scan glass-material.vue). This gate is the demo-route twin: it parses
// the SFC and asserts the four bindings the story narrates are actually present.
//
// HOUSE STYLE mirrors proof-squircle-language.mjs (the demo-route SFC contract gate):
// ESM .mjs, comment-strip first (false-witness discipline — a binding in a `<!-- -->`
// or `/* */` comment is not a real binding), a pure exported detector, a byte-stable
// JSON artefact via gate-output, a human summary, process.exit(1) on any violation.
// The π render arm mirrors proof-squircle-language.mjs's piArm: fail-CLOSED when the
// tests-visual Playwright workspace is present (a dead-plates / inert-tint readback
// exits NON-ZERO), befitting-silent SKIP only on genuine device/workspace absence.
//
// THE SOURCE ASSERTS (device-free, run + hard-RED on every runner):
//   (a) SPECULAR-SEAM-COMPOSED — the SFC imports + calls `useSpecularTracking` AND
//       binds a `@pointermove` (+ a `:style` specular write) on a headline plate (the
//       shipped DRY seam is COMPOSED, not narrated). The unwired HEAD state writes no
//       --mouse-x and reads as dead flat plates.
//   (b) TINT-BITES — wherever the SFC writes `--glass-tint-source` it writes a NON-
//       zero `--glass-tint-strength` companion (the color-mix(in oklab, …) is no
//       longer a 0% no-op), inside the ≤30% house ceiling (glass.css:204).
//   (c) GLASS-BTN-RETIRED — ZERO `glass-btn` token in the SFC (a DELETION-PROOF — the
//       abused icon-button coerced wide with !important is gone) AND ≥1
//       `<Button variant="glass">` (the idiomatic component replacement).
//   (d) RIM-CONTRAST-DEVICE — a rim on/off (or dark-plate) contrast device is staged
//       so the deliberately-subtle 0.75px 18%-α `--glass-edge-light` ring is legible
//       AS a feature (the W09 "subtle by design" intent), not an unverifiable claim.

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SFC: resolve(ROOT, "demo/stories/substrates/glass-material.vue"),
        WORKSPACE: resolve(ROOT, "tests-visual"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_GLASS_MATERIAL_DEMO_ARTIFACT",
            "AX-glass-material-demo",
        ),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

// Strip /* */ block comments AND <!-- --> HTML comments so a binding that only
// appears inside a comment is NOT counted as a real binding (the false-witness
// discipline — the SFC blurb prose narrating a seam must not satisfy the gate).
function stripComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (
            text[i] === "<" &&
            text[i + 1] === "!" &&
            text[i + 2] === "-" &&
            text[i + 3] === "-"
        ) {
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

/**
 * The pure detector. Takes the comment-stripped SFC source; returns
 * {facts, violations}. The four SOURCE asserts run over the stripped text.
 */
export function detectGlassMaterialDemo({ sfc }) {
    const violations = [];
    const facts = {};

    // ── (a) SPECULAR-SEAM-COMPOSED ───────────────────────────────────────
    // The shipped DRY seam (useSpecularTracking) is imported + called + bound on
    // a plate (@pointermove + a :style specular write). An unwired surface writes
    // no --mouse-x and reads as a dead flat plate (the recipe's rest rung is 0).
    const importsSeam = /\buseSpecularTracking\b/.test(sfc) && /\bimport\b/.test(sfc);
    const callsSeam = /\buseSpecularTracking\s*\(/.test(sfc);
    const bindsPointerMove =
        /@pointermove\s*=|v-on:pointermove\s*=|onPointermove\s*=/.test(sfc);
    const bindsSpecularStyle = /:style\s*=\s*"[^"]*specularStyle[^"]*"/.test(sfc);
    facts.importsSeam = importsSeam;
    facts.callsSeam = callsSeam;
    facts.bindsPointerMove = bindsPointerMove;
    facts.bindsSpecularStyle = bindsSpecularStyle;
    if (!importsSeam)
        violations.push(
            "SPECULAR-SEAM-COMPOSED: the SFC does not import `useSpecularTracking` (the shipped DRY moving-specular seam — the headline catch-light must compose it, not narrate it)",
        );
    if (!callsSeam)
        violations.push(
            "SPECULAR-SEAM-COMPOSED: the SFC imports but never CALLS `useSpecularTracking()` (no specularStyle/onPointerMove is produced)",
        );
    if (!bindsPointerMove)
        violations.push(
            "SPECULAR-SEAM-COMPOSED: no `@pointermove` binding on a headline plate (the seam's position write is never fed — the catch-light cannot track the pointer)",
        );
    if (!bindsSpecularStyle)
        violations.push(
            "SPECULAR-SEAM-COMPOSED: no `:style=\"…specularStyle…\"` binding on a headline plate (the seam's --mouse-x/--mouse-y write never lands on a host)",
        );

    // ── (b) TINT-BITES ───────────────────────────────────────────────────
    // Wherever the SFC writes --glass-tint-source it writes a NON-zero
    // --glass-tint-strength companion (the color-mix is no longer a 0% no-op),
    // inside the ≤30% house ceiling.
    const writesTintSource = /--glass-tint-source/.test(sfc);
    const writesTintStrength = /--glass-tint-strength/.test(sfc);
    facts.writesTintSource = writesTintSource;
    facts.writesTintStrength = writesTintStrength;
    if (!writesTintSource)
        violations.push(
            "TINT-BITES: the SFC writes no `--glass-tint-source` (the adaptive-tint demo has no source to bias toward)",
        );
    if (!writesTintStrength)
        violations.push(
            "TINT-BITES: the SFC writes no `--glass-tint-strength` companion — at the default 0% the `color-mix(in oklab, …)` is inert, so the tint demo demonstrates the OPPOSITE of working",
        );
    // The strength must reach a NON-zero value AND stay ≤30% (the house ceiling).
    // Collect every numeric percentage that FEEDS --glass-tint-strength, across the
    // two idiomatic shapes: (1) a LITERAL `--glass-tint-strength: 22%` declaration,
    // and (2) the data-driven binding — a `strength: "22%"` model row the template
    // binds `--glass-tint-strength` to (`'--glass-tint-strength': tint.strength`).
    // Both feed the same knob; either must reach a non-zero ≤30% value.
    const bindsStrengthModel =
        /--glass-tint-strength['"]?\s*:\s*[A-Za-z_$][\w.$]*\b/.test(sfc);
    const strengthVals = [
        ...sfc.matchAll(/--glass-tint-strength['"]?\s*:\s*['"]?\s*([0-9.]+)%/g),
        // The `strength: "NN%"` model rows (the bound source) — only counted when
        // the template actually binds the strength knob to a variable (so a stray
        // `strength` key elsewhere never false-satisfies).
        ...(bindsStrengthModel
            ? sfc.matchAll(/\bstrength\s*:\s*['"]\s*([0-9.]+)%/g)
            : []),
    ].map((m) => Number(m[1]));
    facts.tintStrengthValues = strengthVals;
    const hasNonZeroStrength = strengthVals.some((v) => v > 0);
    const overCeiling = strengthVals.filter((v) => v > 30);
    facts.tintHasNonZeroStrength = hasNonZeroStrength;
    facts.tintOverCeiling = overCeiling;
    if (writesTintStrength && !hasNonZeroStrength)
        violations.push(
            "TINT-BITES: every `--glass-tint-strength` write resolves 0% — the mix stays a no-op; a sampled hue must drive a NON-zero strength so the surface visibly biases",
        );
    if (overCeiling.length > 0)
        violations.push(
            `TINT-BITES: a --glass-tint-strength write exceeds the ≤30% house ceiling (glass.css:204): ${overCeiling.join(", ")}%`,
        );

    // ── (c) GLASS-BTN-RETIRED ────────────────────────────────────────────
    // ZERO `glass-btn` token (the abused circular icon-button coerced wide with
    // !important is GONE) AND ≥1 `<Button variant="glass">` (the idiomatic
    // four-state component replacement).
    const glassBtnHits = [...sfc.matchAll(/\bglass-btn\b/g)].length;
    const buttonGlassVariant =
        /<Button[^>]*\bvariant\s*=\s*"glass"/.test(sfc) ||
        /<Button[^>]*\bvariant\s*=\s*'glass'/.test(sfc);
    facts.glassBtnHits = glassBtnHits;
    facts.hasButtonGlassVariant = buttonGlassVariant;
    if (glassBtnHits > 0)
        violations.push(
            `GLASS-BTN-RETIRED: the SFC still carries the abused \`glass-btn\` token ${glassBtnHits}× — .glass-btn is a 2.5rem CIRCULAR icon button; coercing it wide with !important reads as a broken control. Use <Button variant="glass"> where a button is wanted`,
        );
    if (!buttonGlassVariant)
        violations.push(
            'GLASS-BTN-RETIRED: no `<Button variant="glass">` — the tint-sample selector must use the real root-barrel glass Button (the four-state interactive contract), not a static .glass-btn class coerced into a control shape',
        );

    // ── (d) RIM-CONTRAST-DEVICE ──────────────────────────────────────────
    // A rim on/off (or dark-plate) contrast device makes the deliberately-subtle
    // 0.75px 18%-α `--glass-edge-light` ring legible AS a feature. The device is a
    // demo-content arrangement marked with the canonical data-attr the SFC carries
    // (`data-rim-device`) so the gate has a stable, intent-true anchor (NOT a
    // brittle scan of free prose).
    const hasRimDevice = /data-rim-device\b/.test(sfc);
    // A bona-fide on/off pairing carries both an enabled and a suppressed plate.
    const rimOn = /data-rim-device\s*=\s*"on"/.test(sfc);
    const rimOff = /data-rim-device\s*=\s*"off"/.test(sfc);
    facts.hasRimDevice = hasRimDevice;
    facts.rimOn = rimOn;
    facts.rimOff = rimOff;
    if (!hasRimDevice)
        violations.push(
            "RIM-CONTRAST-DEVICE: no `data-rim-device` contrast device staged — the deliberately-subtle 0.75px 18%-α --glass-edge-light rim is invisible without a rim-on/rim-off (or dark-plate) side-by-side, so the claim is unverifiable on screen",
        );
    else if (!(rimOn && rimOff))
        violations.push(
            'RIM-CONTRAST-DEVICE: the device must stage BOTH `data-rim-device="on"` AND `data-rim-device="off"` plates (the on/off pairing that makes the subtle ring legible)',
        );

    facts.sourceClean = violations.length === 0;
    return { facts, violations };
}

export function detectSource(sources) {
    return detectGlassMaterialDemo({ sfc: stripComments(sources.sfc ?? "") });
}

// ── The π render arm (fail-CLOSED Playwright moving-specular + biting-tint) ──
// Mirrors proof-squircle-language.mjs's piArm: when the tests-visual workspace
// resolves a Playwright runner + the spec, the live readback runs and a dead-
// plates / inert-tint render exits NON-ZERO; on genuine workspace/binary absence
// it befitting-silent SKIPs. The spec is tests-visual/glass-material-demo.spec.ts
// (hover a headline plate → --mouse-x writes + a position-tracking ::before paint;
// click a tint sample → the plate background measurably shifts).
function piArm(WORKSPACE) {
    const PW_BIN = [
        resolve(WORKSPACE, "node_modules/.bin/playwright"),
        resolve(WORKSPACE, "../node_modules/.bin/playwright"),
    ].find(existsSync);
    const SPEC = resolve(WORKSPACE, "glass-material-demo.spec.ts");
    if (!PW_BIN || !existsSync(SPEC)) {
        return {
            ran: false,
            status: "skip",
            note: "π render arm SKIPPED — tests-visual Playwright workspace/spec absent (befitting-silent device absence; the orchestrator drives the chrome-devtools-mcp moving-specular + biting-tint readback per the cardinal lesson)",
        };
    }
    const res = spawnSync(PW_BIN, ["test", "glass-material-demo.spec.ts"], {
        cwd: WORKSPACE,
        encoding: "utf8",
        stdio: "pipe",
    });
    const ran = res.status !== null;
    return {
        ran,
        status: res.status === 0 ? "pass" : "fail",
        note:
            res.status === 0
                ? "π render arm GREEN — the catch-light tracks the pointer (live --mouse-x write + a non-flat ::before) and the tint click biases the plate background"
                : `π render arm RED — dead-plates / inert-tint readback (exit ${res.status})`,
        output: (res.stdout ?? "") + (res.stderr ?? ""),
    };
}

function run() {
    const { ROOT, SFC, WORKSPACE, ARTIFACT } = cliPaths();
    const { facts, violations } = detectSource({
        sfc: readFileSync(SFC, "utf8"),
    });

    const pi = piArm(WORKSPACE);
    // fail-CLOSED: a PRESENT π arm that REDs fails the gate.
    const piFailedClosed = pi.ran && pi.status === "fail";
    const status = violations.length === 0 && !piFailedClosed ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:glass-material-demo",
        facts,
        violations,
        piArm: { ran: pi.ran, status: pi.status, note: pi.note },
    });

    console.log(
        "proof:glass-material-demo — the glass-material story binds the shipped material seams (AX.W48 D8)",
    );
    console.log(
        `  specular seam composed    : ${
            facts.importsSeam &&
            facts.callsSeam &&
            facts.bindsPointerMove &&
            facts.bindsSpecularStyle
                ? "YES"
                : "NO"
        }`,
    );
    console.log(
        `  tint bites (non-zero ≤30%): ${
            facts.writesTintStrength && facts.tintHasNonZeroStrength && facts.tintOverCeiling.length === 0
                ? "YES"
                : "NO"
        }`,
    );
    console.log(
        `  glass-btn retired (0 hits): ${facts.glassBtnHits === 0 ? "YES" : `NO (${facts.glassBtnHits} left)`}`,
    );
    console.log(
        `  Button variant="glass"    : ${facts.hasButtonGlassVariant ? "YES" : "NO"}`,
    );
    console.log(
        `  rim on/off contrast device: ${facts.hasRimDevice && facts.rimOn && facts.rimOff ? "YES" : "NO"}`,
    );
    console.log(`  π render arm              : ${pi.status.toUpperCase()} — ${pi.note}`);
    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
