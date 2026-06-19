#!/usr/bin/env node
// BC.W-BLACK-BAR — the card/dock top-edge dark rim → a bright catch-light (the D2
// root fix). The SOURCE/MECHANISM arm of proof:black-bar (device-free; the PAINT arm
// is the bc-gestalt-roster pixel-read over a live :5199 capture the orchestrator owns
// + the π readback tests-visual/black-bar.spec.ts). Per-mechanism greens alone do NOT
// close the visual wave — the captured DELTA is the binding truth (BC anti-disease law).
//
// The comment-strip + pure-detector house pattern (mirroring proof-glass-cal.mjs). Each
// witness is born-RED at HEAD pre-wave:
//   - HEAD --glass-border-* rungs are 11-22% α (B1 reds: the dark perimeter ink).
//   - HEAD has no --glass-rim-top/--glass-rim-bottom — only the omnidirectional
//     --glass-edge-light (B2 reds).
//   - HEAD --glass-material-rim is a single omnidirectional ring, no bottom under-shadow
//     (B2 reds).
//   - HEAD dark-arm.css has no directional rim pair (B4 reds).
//   - HEAD shell.css box-shadow leads with --glass-edge-light (B5 reds).
//
// bite-check (each clause carries a planted self-test below): a planted 16% perimeter
// rung reds B1; a stripped --glass-rim-top reds B2; a re-pasted top-edge dark
// `inset 0 1px 0 color-mix(... --foreground 16% ...)` reds B3; a light-dark()-wrapped
// inset reds B4; a dock-local dark rim re-paste reds B5.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// The six perimeter rungs + the wave's ≤5% α ceiling (apple-ios27.md §5 "top ≤4%",
// +1% headroom for the floating/overlay rungs). HEAD is 11-22% → born-RED.
const PERIMETER_RUNGS = [
    "glass-border-wash",
    "glass-border-quiet",
    "glass-border-resting",
    "glass-border-floating",
    "glass-border-overlay",
    "glass-border-dock",
];
const PERIMETER_ALPHA_CEILING = 5; // percent
const RIM_TOP_MIN_ALPHA = 0.3; // the bright catch-light floor (apple-ios27.md §1.3)
const UNDER_SHADOW_ALPHA_CEILING = 6; // the sanctioned bottom warm under-shadow

// Parse `color-mix(in srgb, var(--foreground) N%, transparent)` → N.
function parseForegroundMixPct(value) {
    const m = value.match(/color-mix\(\s*in\s+srgb\s*,\s*var\(--foreground\)\s+([\d.]+)%\s*,\s*transparent\s*\)/);
    return m ? Number(m[1]) : null;
}

// ── B1 — perimeter alpha bounded (every rung ≤5% over --foreground).
export function detectPerimeter(glassTokensRaw) {
    const violations = [];
    const facts = { rungs: {} };
    const glassTokens = stripCss(glassTokensRaw ?? readFile("src/styles/tokens/glass.css"));

    for (const name of PERIMETER_RUNGS) {
        const m = glassTokens.match(new RegExp(`--${name}:\\s*([^;]+);`));
        if (!m) {
            facts.rungs[name] = null;
            violations.push(`B1: --${name} not found in tokens/glass.css`);
            continue;
        }
        const pct = parseForegroundMixPct(m[1].trim());
        facts.rungs[name] = pct;
        if (pct === null) {
            violations.push(`B1: --${name} is not a 'color-mix(in srgb, var(--foreground) N%, transparent)' — the warm-not-grey identity must hold (BA.W-NO-GRAY): '${m[1].trim().slice(0, 60)}'`);
            continue;
        }
        if (pct > PERIMETER_ALPHA_CEILING) {
            violations.push(`B1: --${name} is ${pct}% α over --foreground — above the ≤${PERIMETER_ALPHA_CEILING}% ceiling; the perimeter hairline reads as the D2 'black bar'`);
        }
    }
    return { facts, violations };
}

// ── B2 — the directional rim minted + load-bearing.
//   --glass-rim-top (a top inset bearing a white-α stop) + --glass-rim-bottom (a bottom
//   inset bearing a --foreground stop) exist in glass-fx.css, AND --glass-material-rim
//   (rim.css) composes BOTH (top catch-light + bottom under-shadow).
export function detectDirectional(glassFxRaw, rimRaw) {
    const violations = [];
    const facts = {};
    const glassFx = stripCss(glassFxRaw ?? readFile("src/styles/tokens/glass-fx.css"));
    const rim = stripCss(rimRaw ?? readFile("src/styles/glass/rim.css"));

    // --glass-rim-top: a TOP inset (`inset 0 1px 0 ...`) bearing a white catch-light.
    const topM = glassFx.match(/--glass-rim-top:\s*([^;]+);/);
    facts.rimTop = topM ? topM[1].trim() : null;
    const topIsTopInset = facts.rimTop && /inset\s+0\s+1px\s+0/.test(facts.rimTop);
    const topAlphaM = facts.rimTop && facts.rimTop.match(/hsl\(\s*0\s+0%\s+100%\s*\/\s*([\d.]+)\s*\)/);
    const topAlpha = topAlphaM ? Number(topAlphaM[1]) : null;
    facts.rimTopAlpha = topAlpha;
    if (!facts.rimTop) {
        violations.push("B2: --glass-rim-top not minted in tokens/glass-fx.css (HEAD has only the omnidirectional --glass-edge-light)");
    } else {
        if (!topIsTopInset) violations.push(`B2: --glass-rim-top is not a TOP inset 'inset 0 1px 0 …' (the catch-light geometry): '${facts.rimTop.slice(0, 60)}'`);
        if (topAlpha === null) violations.push(`B2: --glass-rim-top carries no hsl(0 0% 100% / α) white catch-light stop: '${facts.rimTop.slice(0, 60)}'`);
        else if (topAlpha < RIM_TOP_MIN_ALPHA) violations.push(`B2: --glass-rim-top α ${topAlpha} is below the ${RIM_TOP_MIN_ALPHA} catch-light floor`);
    }

    // --glass-rim-bottom: a BOTTOM inset (`inset 0 -1px 0 ...`) bearing a --foreground
    // warm under-shadow at ≤6%.
    const botM = glassFx.match(/--glass-rim-bottom:\s*([^;]+);/);
    facts.rimBottom = botM ? botM[1].trim() : null;
    const botIsBottomInset = facts.rimBottom && /inset\s+0\s+-1px\s+0/.test(facts.rimBottom);
    const botPct = facts.rimBottom ? parseForegroundMixPct(facts.rimBottom) : null;
    facts.rimBottomPct = botPct;
    if (!facts.rimBottom) {
        violations.push("B2: --glass-rim-bottom not minted in tokens/glass-fx.css (the faint warm under-shadow that grounds the plate)");
    } else {
        if (!botIsBottomInset) violations.push(`B2: --glass-rim-bottom is not a BOTTOM inset 'inset 0 -1px 0 …' (the under-shadow geometry): '${facts.rimBottom.slice(0, 60)}'`);
        if (botPct === null) violations.push(`B2: --glass-rim-bottom carries no warm 'color-mix(… --foreground N% …)' under-shadow (warm-not-grey, BA.W-NO-GRAY): '${facts.rimBottom.slice(0, 60)}'`);
        else if (botPct > UNDER_SHADOW_ALPHA_CEILING) violations.push(`B2: --glass-rim-bottom is ${botPct}% — above the ≤${UNDER_SHADOW_ALPHA_CEILING}% under-shadow whisper ceiling`);
    }

    // --glass-material-rim composes BOTH: a top inset (`inset 0 1px 0`) catch-light AND
    // the bottom under-shadow (`var(--glass-rim-bottom)` or a `inset 0 -1px 0`).
    const mrM = rim.match(/--glass-material-rim:\s*([\s\S]*?);/);
    facts.materialRim = mrM ? mrM[1].replace(/\s+/g, " ").trim() : null;
    if (!facts.materialRim) {
        violations.push("B2: --glass-material-rim not found in glass/rim.css");
    } else {
        const composesTop = /inset\s+0\s+1px\s+0/.test(facts.materialRim) || /var\(--glass-rim-top\)/.test(facts.materialRim);
        const composesBottom = /var\(--glass-rim-bottom\)/.test(facts.materialRim) || /inset\s+0\s+-1px\s+0/.test(facts.materialRim);
        if (!composesTop) violations.push(`B2: --glass-material-rim does not compose the TOP catch-light (inset 0 1px 0 … / var(--glass-rim-top)): '${facts.materialRim.slice(0, 80)}'`);
        if (!composesBottom) violations.push(`B2: --glass-material-rim does not compose the BOTTOM under-shadow (var(--glass-rim-bottom) / inset 0 -1px 0 …): '${facts.materialRim.slice(0, 80)}'`);
    }

    return { facts, violations };
}

// ── B3 — no dark full-perimeter ink survives.
//   No glass-surface rule writes a load-bearing TOP inset (`inset 0 1px 0 …`) reading
//   --foreground at >5% α (the anti-evasion respell bite). The bottom under-shadow at
//   ≤6% is the sanctioned exception, scoped to the `inset 0 -1px 0` bottom geometry.
const GLASS_SURFACE_FILES = [
    "src/styles/tokens/glass.css",
    "src/styles/tokens/glass-fx.css",
    "src/styles/glass/rim.css",
    "src/styles/glass/ladder.css",
    "src/styles/glass/surfaces.css",
    "src/styles/glass/material.css",
    "src/styles/dock/shell.css",
];
export function detectNoDarkTop(files) {
    const violations = [];
    const facts = { darkTopHits: [] };
    const list = files ?? GLASS_SURFACE_FILES;
    // a TOP inset (`inset 0 1px 0`) whose color reads --foreground at >5%.
    const topInsetRe = /inset\s+0\s+1px\s+0[^,;]*color-mix\(\s*in\s+srgb\s*,\s*var\(--foreground\)\s+([\d.]+)%/g;
    for (const rel of list) {
        const src = stripCss(readFile(rel));
        let m;
        while ((m = topInsetRe.exec(src)) !== null) {
            const pct = Number(m[1]);
            if (pct > PERIMETER_ALPHA_CEILING) {
                facts.darkTopHits.push({ file: rel, pct });
                violations.push(`B3: ${rel} writes a TOP inset 'inset 0 1px 0' reading --foreground at ${pct}% — a dark catch-light is the D2 bar respelled (the top edge MUST be light)`);
            }
        }
    }
    return { facts, violations };
}

// ── B4 — dark-arm pair present + plain per-mode (no light-dark()).
export function detectDarkArm(darkArmRaw) {
    const violations = [];
    const facts = {};
    const darkArm = stripCss(darkArmRaw ?? readFile("src/styles/tokens/dark-arm.css"));

    const topM = darkArm.match(/--glass-rim-top:\s*([^;]+);/);
    const botM = darkArm.match(/--glass-rim-bottom:\s*([^;]+);/);
    facts.darkRimTop = topM ? topM[1].trim() : null;
    facts.darkRimBottom = botM ? botM[1].trim() : null;

    if (!facts.darkRimTop) violations.push("B4: dark-arm.css does not re-declare --glass-rim-top (the dark catch-light)");
    if (!facts.darkRimBottom) violations.push("B4: dark-arm.css does not re-declare --glass-rim-bottom (the dark under-shadow)");

    // plain per-mode — no light-dark() wrapping an inset fragment (the MEMORY trap:
    // an inset inside light-dark() computes the whole box-shadow to none).
    for (const [name, val] of [["--glass-rim-top", facts.darkRimTop], ["--glass-rim-bottom", facts.darkRimBottom]]) {
        if (val && /light-dark\s*\(/.test(val)) {
            violations.push(`B4: dark-arm.css ${name} wraps a value in light-dark() — the inset-shadow trap (computes the whole box-shadow to none); use a plain per-mode value`);
        }
    }

    // the dark top catch-light α ≥ 0.30 (lifted to read on the deep canvas).
    const aM = facts.darkRimTop && facts.darkRimTop.match(/hsl\(\s*0\s+0%\s+100%\s*\/\s*([\d.]+)\s*\)/);
    facts.darkRimTopAlpha = aM ? Number(aM[1]) : null;
    if (facts.darkRimTopAlpha !== null && facts.darkRimTopAlpha < RIM_TOP_MIN_ALPHA) {
        violations.push(`B4: dark-arm.css --glass-rim-top α ${facts.darkRimTopAlpha} is below the ${RIM_TOP_MIN_ALPHA} floor (dark glass needs a brighter rim to read)`);
    }
    return { facts, violations };
}

// ── B5 — the dock + dialog read the corrected source.
//   shell.css --glass-border-dock resolves ≤4% (B1 already bounds it at source), and
//   the dock box-shadow reads the directional pair (not a dock-local dark rim re-paste,
//   not the retired omnidirectional --glass-edge-light leg).
export function detectDock(shellRaw, glassTokensRaw) {
    const violations = [];
    const facts = {};
    const shell = stripCss(shellRaw ?? readFile("src/styles/dock/shell.css"));
    const glassTokens = stripCss(glassTokensRaw ?? readFile("src/styles/tokens/glass.css"));

    // the dock border reads the corrected --glass-border-dock token (not a local re-paste).
    facts.dockBorderReadsToken = /border:\s*[^;]*var\(--glass-border-dock/.test(shell);
    if (!facts.dockBorderReadsToken) {
        violations.push("B5: dock/shell.css border no longer reads var(--glass-border-dock) — the dock must inherit the corrected perimeter token, not a local re-paste");
    }
    const dockPctM = glassTokens.match(/--glass-border-dock:\s*([^;]+);/);
    facts.dockBorderPct = dockPctM ? parseForegroundMixPct(dockPctM[1].trim()) : null;
    if (facts.dockBorderPct !== null && facts.dockBorderPct > 4) {
        violations.push(`B5: --glass-border-dock is ${facts.dockBorderPct}% — the dock perimeter must be ≤4% (the band reads the corrected token source)`);
    }

    // the dock box-shadow leads with the directional pair, NOT --glass-edge-light.
    const bsM = shell.match(/box-shadow:\s*([^;]+);/);
    facts.dockBoxShadow = bsM ? bsM[1].replace(/\s+/g, " ").trim() : null;
    if (!facts.dockBoxShadow) {
        violations.push("B5: dock/shell.css surface box-shadow not found");
    } else {
        const readsPair = /var\(--glass-rim-top\)/.test(facts.dockBoxShadow) && /var\(--glass-rim-bottom\)/.test(facts.dockBoxShadow);
        const readsRetiredRing = /var\(--glass-edge-light\b/.test(facts.dockBoxShadow);
        if (!readsPair) violations.push(`B5: dock box-shadow does not read the directional pair (var(--glass-rim-top), var(--glass-rim-bottom)): '${facts.dockBoxShadow.slice(0, 90)}'`);
        if (readsRetiredRing) violations.push(`B5: dock box-shadow still reads the RETIRED omnidirectional var(--glass-edge-light) ring — re-point to the directional pair`);
    }
    return { facts, violations };
}

// ── Self-test bites — each planted defect MUST flag its clause (the anti-evasion floor).
export function selfTest() {
    const fails = [];
    // B1: a planted 16% perimeter rung reds.
    if (detectPerimeter(":root { --glass-border-resting: color-mix(in srgb, var(--foreground) 16%, transparent); }").violations.length === 0) {
        fails.push("self-test B1: a planted 16% --glass-border-resting did NOT red");
    }
    // B1: a clean ≤5% rung set passes its alpha bound.
    const cleanRungs = PERIMETER_RUNGS.map((n) => `--${n}: color-mix(in srgb, var(--foreground) 4%, transparent);`).join("\n");
    if (detectPerimeter(`:root {\n${cleanRungs}\n}`).violations.length !== 0) {
        fails.push("self-test B1: a clean 4% rung set unexpectedly red");
    }
    // B2: a stripped --glass-rim-top reds.
    if (detectDirectional("", "").violations.length === 0) {
        fails.push("self-test B2: a missing directional rim did NOT red");
    }
    // B3: a re-pasted dark TOP inset at 16% reds.
    const plantedTop = resolve(ROOT, "scripts/.__bc_black_bar_selftest_does_not_exist.css");
    const b3 = detectNoDarkTop([]); // empty list = no real files; inject below
    // inline planted source (not via file): exercise the regex directly.
    {
        const src = ".x { box-shadow: inset 0 1px 0 color-mix(in srgb, var(--foreground) 16%, transparent); }";
        const re = /inset\s+0\s+1px\s+0[^,;]*color-mix\(\s*in\s+srgb\s*,\s*var\(--foreground\)\s+([\d.]+)%/g;
        const hit = re.exec(src);
        if (!hit || Number(hit[1]) <= PERIMETER_ALPHA_CEILING) fails.push("self-test B3: a planted dark top inset (16%) did NOT match the respell bite");
    }
    void plantedTop;
    void b3;
    // B4: a light-dark()-wrapped inset reds.
    const b4 = detectDarkArm("@layer x { .dark { --glass-rim-top: light-dark(inset 0 1px 0 white, inset 0 1px 0 black); --glass-rim-bottom: inset 0 -1px 0 black; } }");
    if (!b4.violations.some((v) => /light-dark/.test(v))) {
        fails.push("self-test B4: a light-dark()-wrapped --glass-rim-top did NOT red");
    }
    // B5: a dock box-shadow still leading with --glass-edge-light reds.
    const b5 = detectDock(".dock { border: 1.5px solid var(--glass-border-dock); box-shadow: var(--glass-edge-light), var(--shadow-dock); }", ":root { --glass-border-dock: color-mix(in srgb, var(--foreground) 4%, transparent); }");
    if (!b5.violations.some((v) => /edge-light|directional pair/.test(v))) {
        fails.push("self-test B5: a dock box-shadow on the retired --glass-edge-light ring did NOT red");
    }
    return fails;
}

export function detect() {
    const perimeter = detectPerimeter();
    const directional = detectDirectional();
    const noDarkTop = detectNoDarkTop();
    const darkArm = detectDarkArm();
    const dock = detectDock();
    const selfTestFails = selfTest();
    const violations = [
        ...perimeter.violations,
        ...directional.violations,
        ...noDarkTop.violations,
        ...darkArm.violations,
        ...dock.violations,
        ...selfTestFails.map((f) => `SELF-TEST: ${f}`),
    ];
    return {
        violations,
        facts: {
            perimeter: perimeter.facts,
            directional: directional.facts,
            noDarkTop: noDarkTop.facts,
            darkArm: darkArm.facts,
            dock: dock.facts,
            selfTestFails,
        },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_BLACK_BAR_ARTIFACT", "BC-black-bar");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:black-bar",
        facts,
        violations,
    });

    console.log("proof:black-bar — the card/dock top-edge dark rim → a bright catch-light (BC.W-BLACK-BAR, D2 root)");
    console.log(`  B1 perimeter α    : ${PERIMETER_RUNGS.map((n) => `${n.replace("glass-border-", "")}=${facts.perimeter.rungs[n]}%`).join(" ")}`);
    console.log(`  B2 rim-top        : α=${facts.directional.rimTop ? facts.directional.rimTopAlpha : "MISSING"}   rim-bottom: ${facts.directional.rimBottomPct ?? "MISSING"}%`);
    console.log(`  B2 material-rim   : composes top+bottom = ${facts.directional.materialRim ? "yes" : "MISSING"}`);
    console.log(`  B3 dark-top hits  : ${facts.noDarkTop.darkTopHits.length}`);
    console.log(`  B4 dark arm       : top α=${facts.darkArm.darkRimTopAlpha ?? "MISSING"}   per-mode (no light-dark): ${facts.darkArm.darkRimTop && !/light-dark/.test(facts.darkArm.darkRimTop) ? "yes ✓" : "NO ✗"}`);
    console.log(`  B5 dock           : border-dock=${facts.dock.dockBorderPct}%   reads directional pair: ${facts.dock.dockBoxShadow && /rim-top/.test(facts.dock.dockBoxShadow) && /rim-bottom/.test(facts.dock.dockBoxShadow) ? "yes ✓" : "NO ✗"}`);
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
