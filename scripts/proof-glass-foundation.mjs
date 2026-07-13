#!/usr/bin/env node
// BE.W5 — the glass-material FOUNDATION tokens (proof:glass-foundation).
//
// The Tier-0 foundation the BE liquid-dock band depends on. Four token families,
// built in dependency order, ADDITIVELY (every existing token + consumer byte-
// untouched). The comment-strip + pure-detector house pattern (mirroring
// proof-glass-accent.mjs / proof-no-gray.mjs). Each clause is RED at HEAD pre-wave
// (the four families ABSENT) → GREEN at the build. The BINDING visual truth rides
// the downstream BE.W-* visual waves' π readbacks + the proof:ba-gestalt verdicts;
// this gate is the device-free FOUNDATION (the tokens + the seams the dock waves
// consume).
//
//   A1 — `--glass-ambient-hue` is WRITTEN by the luminance observer as a FREE rider
//        over the EXISTING getImageData loop (no second canvas / getImageData /
//        pass) via value.js's color primitives (NOT a hand-rolled rgb→oklch matrix —
//        the proof:single-color-core fence), with the gray-null identity.
//   A2 — the `--glass-fill-tint` / `--glass-fill-strength` per-instance PLATE-FILL
//        axis is @property-registered (the typed no-op floor — transparent / 0%,
//        the both-modes neutral identity) DISTINCT from the rim `--glass-accent`,
//        and the composed sheet bg rides the mode-aware oklab-tint seam.
//   A3 — the `--glass-opacity-sheet` bottom-sheet rung exists in its band (strictly
//        between the dialog and the overlay — the see-through bottom-sheet register).
//
// (BI.W-CLEAR-FOLD — the `surface="clear"` 4th member + its mandatory scrim + the
// `--glass-opacity-clear`/`--glass-bg-clear` rungs were RETIRED as dead substrate
// (0 consumers, J-inv-10). The A3 clear arm + the A2 `bgClearShared` sub-check +
// the two clear self-test bites are STRUCTURALLY COUPLED to that member and die
// WITH it — the coupled retirement (the scrim was coupled to the member; both go).
// proof:surface-axis W9 is the successor member-consumption fence.)
//
// bite-check (the --self-test arm): a hand-rolled rgb→oklch in the observer reds A1;
// a second getImageData/canvas reds A1; a non-neutral fill-tint default reds A2.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const OBSERVER_FILE = "src/composables/glass/useGlassBackdropLuminance.ts";
// BG.W-COLOCATE — the ambient-hue histogram (the value.js color source + the
// accumulate/resolve math + the gray-null identity) carved into this colocated leaf
// (ratchet-drain #9); the value.js-import + gray-null A1 checks FOLLOW the carve into
// the leaf (the "asserts follow the composition into the carved leaf" precedent).
// BI.W-ENCAP-REDRAIN — the observer then carved its SAMPLING loop (the elementsFromPoint
// stack-walk + the downsampled getImageData field reader + the accumulate/resolve CALL)
// into backdropLuminanceSample.ts; the observer keeps ONLY the reusable downsample
// canvas (getDownContext createElement) + the writes. So the FREE-RIDER fence
// (getImageData count) + the accumulate/resolve CALL now FOLLOW the sampler into the
// sample leaf — read against the union (observer ∪ sample leaf); the setProperty write
// stays pinned to the observer's own source.
const HISTOGRAM_LEAF_FILE = "src/composables/glass/ambientHueHistogram.ts";
const SAMPLE_LEAF_FILE = "src/composables/glass/backdropLuminanceSample.ts";
const SURFACE_AXIS_FILE = "src/components/ui/_shared/useSurfaceAxis.ts";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, " ");
}

// Strip TS comments (block + line) so a misuse named in a doc comment never trips a
// detector — the pure-source idiom.
function stripTs(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .map((l) => {
            const i = l.indexOf("//");
            return i === -1 ? l : l.slice(0, i);
        })
        .join("\n");
}

function squish(src) {
    return src.replace(/\s+/g, " ");
}

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ── A1: the ambient-hue free rider in the luminance observer ─────────────────
function detectAmbientHue() {
    const violations = [];
    const facts = {};

    const raw = readFile(OBSERVER_FILE);
    const src = stripTs(raw);
    facts.observerExists = raw.length > 0;
    if (!facts.observerExists) {
        violations.push(`A1: the observer file ${OBSERVER_FILE} is absent`);
        return { violations, facts };
    }
    // The histogram math (value.js source + accumulate/resolve + gray-null) lives in
    // the ambientHueHistogram leaf; the SAMPLING loop (getImageData/canvas + the
    // accumulate/resolve CALL) lives in the backdropLuminanceSample leaf (BI.W-ENCAP-
    // REDRAIN); the observer COMPOSES both. The value.js-import + gray-null checks read
    // (observer ∪ both leaves); the FREE-RIDER fence (getImageData ONE-pass) + the
    // accumulate/resolve CALL FOLLOW the sampler into (observer ∪ sample leaf); ONLY the
    // setProperty write stays pinned to the observer's own source.
    const histogramLeaf = stripTs(readFile(HISTOGRAM_LEAF_FILE));
    const sampleLeaf = stripTs(readFile(SAMPLE_LEAF_FILE));
    const srcWithLeaf = `${src}\n${histogramLeaf}\n${sampleLeaf}`;
    // the FREE-RIDER + sampling checks follow the loop into the sample leaf.
    const srcWithSampler = `${src}\n${sampleLeaf}`;

    // the token is WRITTEN onto the target (the setProperty call).
    facts.writesAmbientHue =
        /setProperty\(\s*["']--glass-ambient-hue["']/.test(src);
    if (!facts.writesAmbientHue) {
        violations.push(
            "A1: the observer does not `setProperty('--glass-ambient-hue', …)` — the sampled hue is never written onto the target",
        );
    }

    // the color math routes through value.js's primitives (the cssToOklch composition
    // path) — NOT a hand-rolled rgb→oklch matrix. The exact primitives are imported.
    facts.importsValueJsPrimitives =
        /import\s*\{[^}]*\b(srgbToOKLab|rawOklabToOklch)\b[^}]*\}\s*from\s*["']@mkbabb\/value\.js["']/.test(
            srcWithLeaf,
        );
    if (!facts.importsValueJsPrimitives) {
        violations.push(
            "A1: the observer does not import value.js's `srgbToOKLab`/`rawOklabToOklch` — the sRGB→OKLCh math must route through the ONE value.js source (proof:single-color-core), not a hand-rolled matrix",
        );
    }

    // a hand-rolled rgb→oklch matrix in the observer is the defect — the anti-evasion
    // bite: a local re-definition of the guarded primitive.
    facts.handRolledMatrix =
        /\b(function|const)\s+(srgbToOKLab|rawOklabToOklch|oklabToOklch)\b/.test(
            srcWithLeaf,
        );
    if (facts.handRolledMatrix) {
        violations.push(
            "A1: the observer hand-rolls an sRGB→OKLCh primitive (a local `function`/`const srgbToOKLab`…) — the math is value.js's, never re-defined",
        );
    }

    // the FREE-RIDER fence: the histogram rides the EXISTING getImageData pass — there
    // is exactly ONE getImageData call (the existing one) and ONE createElement
    // canvas (the existing downsample). A second of either is the second-pass defect.
    const getImageDataCount = (
        srcWithSampler.match(/\.getImageData\s*\(/g) || []
    ).length;
    const createCanvasCount = (
        srcWithSampler.match(/createElement\(\s*["']canvas["']\s*\)/g) || []
    ).length;
    facts.getImageDataCount = getImageDataCount;
    facts.createCanvasCount = createCanvasCount;
    if (getImageDataCount > 1) {
        violations.push(
            `A1: ${getImageDataCount} getImageData call-sites (the hue histogram must be a FREE rider over the EXISTING ONE pass — a second getImageData is the no-2nd-pass-fence defect)`,
        );
    }
    if (createCanvasCount > 1) {
        violations.push(
            `A1: ${createCanvasCount} createElement('canvas') sites (the histogram reuses the EXISTING downsample canvas — a second canvas is the no-2nd-pass-fence defect)`,
        );
    }

    // the histogram is accumulated INSIDE the existing per-pixel loop (the free rider)
    // — the per-pixel accumulate helper is called, and chroma×alpha weighting +
    // gray-null are present (the correct null identity: a gray room tints nothing).
    facts.accumulatesHistogram = /accumulateHuePixel\s*\(/.test(srcWithSampler);
    facts.resolvesAmbientHue = /resolveAmbientHue\s*\(/.test(srcWithSampler);
    facts.grayNullIdentity = /["']transparent["']/.test(srcWithLeaf);
    if (!facts.accumulatesHistogram || !facts.resolvesAmbientHue) {
        violations.push(
            "A1: the hue histogram helpers (accumulateHuePixel / resolveAmbientHue) are not present — the free-rider accumulation + the modal-hue resolve are missing",
        );
    }
    if (!facts.grayNullIdentity) {
        violations.push(
            "A1: no `transparent` gray-null identity in the observer — a gray backdrop (zero chroma mass) must write NO hue (the room-tints-nothing identity)",
        );
    }

    return { violations, facts };
}

// ── A2: the per-instance plate-FILL tint axis (@property regs + sheet/clear bg) ─
function detectFillTint() {
    const violations = [];
    const facts = {};

    const tokens = stripCss(readMonolith(ROOT, "tokens"));
    const tokensSquished = squish(tokens);

    // the @property registrations (the typed no-op floor — the both-modes neutral
    // identity: a per-instance axis whose default is mode-invariant).
    const fillTintReg =
        /@property\s+--glass-fill-tint\s*\{[^}]*\}/.exec(tokens)?.[0] ?? "";
    const fillStrengthReg =
        /@property\s+--glass-fill-strength\s*\{[^}]*\}/.exec(tokens)?.[0] ?? "";
    facts.fillTintRegistered = fillTintReg.length > 0;
    facts.fillStrengthRegistered = fillStrengthReg.length > 0;
    facts.fillTintSyntaxColor = /syntax:\s*"<color>"/.test(fillTintReg);
    facts.fillTintInherits = /inherits:\s*true/.test(fillTintReg);
    facts.fillTintNeutralIdentity = /initial-value:\s*transparent\b/.test(fillTintReg);
    facts.fillStrengthSyntaxPct = /syntax:\s*"<percentage>"/.test(fillStrengthReg);
    facts.fillStrengthInherits = /inherits:\s*true/.test(fillStrengthReg);
    facts.fillStrengthZeroDefault = /initial-value:\s*0%/.test(fillStrengthReg);

    if (!fillTintReg) {
        violations.push("A2: `@property --glass-fill-tint` is not registered");
    } else {
        if (!facts.fillTintSyntaxColor)
            violations.push('A2: `@property --glass-fill-tint` syntax is not `"<color>"`');
        if (!facts.fillTintInherits)
            violations.push("A2: `@property --glass-fill-tint` is not `inherits: true` (the cascading per-instance idiom)");
        if (!facts.fillTintNeutralIdentity)
            violations.push(
                "A2: `@property --glass-fill-tint` initial-value is not the NEUTRAL identity `transparent` — an unset surface would carry a fill hue (the both-modes no-op floor breaks)",
            );
    }
    if (!fillStrengthReg) {
        violations.push("A2: `@property --glass-fill-strength` is not registered");
    } else {
        if (!facts.fillStrengthSyntaxPct)
            violations.push('A2: `@property --glass-fill-strength` syntax is not `"<percentage>"`');
        if (!facts.fillStrengthInherits)
            violations.push("A2: `@property --glass-fill-strength` is not `inherits: true`");
        if (!facts.fillStrengthZeroDefault)
            violations.push(
                "A2: `@property --glass-fill-strength` initial-value is not `0%` — an unset surface would tint (the no-op floor breaks)",
            );
    }

    // DISTINCT-not-fork: the fill axis is the PLATE-FILL (distinct from the rim
    // `--glass-accent`). The two @property axes must both exist + be different names.
    facts.distinctFromAccent =
        /@property\s+--glass-accent\b/.test(tokens) &&
        facts.fillTintRegistered &&
        !/--glass-fill-tint\s*:\s*var\(--glass-accent\)/.test(tokens);
    if (!facts.distinctFromAccent && facts.fillTintRegistered) {
        violations.push(
            "A2: `--glass-fill-tint` aliases the rim `--glass-accent` (the two axes are DISTINCT — fill tints the plate BODY, accent tints the RIM)",
        );
    }

    // the composed sheet bg rides the SHARED mode-aware oklab-tint recipe (so the W55
    // darken + the dark-arm companions reach it per-mode — the both-modes arm, no
    // second hand-rolled recipe). Byte-isomorphic to `--glass-bg-dialog`: `color-mix(in
    // oklab, color-mix(in srgb, var(--card) … var(--glass-opacity-<name>) …),
    // var(--glass-tint-source) var(--glass-tint-strength))`. Match the OKLAB outer + the
    // SRGB inner + the per-name opacity token + the W55 tint cohort tail (order-faithful,
    // nest-tolerant). (BI.W-CLEAR-FOLD — the `clear` bg sub-check died with the member.)
    const bgShape = (name) => {
        const re = new RegExp(
            `--glass-bg-${name}:\\s*color-mix\\(in oklab,\\s*color-mix\\(in srgb,\\s*var\\(--card\\)[^;]*var\\(--glass-opacity-${name}\\)[^;]*var\\(--glass-tint-source\\)\\s*var\\(--glass-tint-strength\\)[^;]*;`,
        );
        return re.test(tokensSquished);
    };
    facts.bgSheetShared = bgShape("sheet");
    if (!facts.bgSheetShared) {
        violations.push(
            "A2: `--glass-bg-sheet` does not ride the shared oklab-tint recipe (it must be byte-isomorphic to `--glass-bg-dialog`, only the opacity token differing — the mode-aware seam)",
        );
    }

    return { violations, facts };
}

// ── A3: the --glass-opacity-sheet bottom-sheet rung ──────────────────────────
// (BI.W-CLEAR-FOLD — the `surface="clear"` 4th member + its mandatory scrim + the
// `--glass-opacity-clear` rung + the `--glass-bg-clear` fill were RETIRED as dead
// substrate (0 consumers, J-inv-10). The clear alpha / union / mapping / scrim
// assertions were STRUCTURALLY COUPLED to that member and die WITH it — the coupled
// retirement. proof:surface-axis W9 is the successor member-consumption fence. Only
// the SHEET rung survives here — it is a live surviving surface.)
function detectSheetRung() {
    const violations = [];
    const facts = {};

    const tokens = stripCss(readMonolith(ROOT, "tokens"));

    // the sheet opacity rung exists in its band (strictly between dialog and overlay).
    const sheetM = /--glass-opacity-sheet:\s*([\d.]+)/.exec(tokens);
    const dialogM = /--glass-opacity-dialog:\s*([\d.]+)/.exec(tokens);
    const overlayM = /--glass-opacity-overlay:\s*([\d.]+)/.exec(tokens);
    facts.sheetAlpha = sheetM ? Number(sheetM[1]) : null;
    const DIALOG = dialogM ? Number(dialogM[1]) : 0.68;
    const OVERLAY = overlayM ? Number(overlayM[1]) : 0.95;

    if (facts.sheetAlpha === null) {
        violations.push("A3: `--glass-opacity-sheet` is absent (the bottom-sheet rung)");
    } else if (!(facts.sheetAlpha > DIALOG && facts.sheetAlpha < OVERLAY)) {
        violations.push(
            `A3: --glass-opacity-sheet (${facts.sheetAlpha}) is NOT strictly between the dialog (${DIALOG}) and the overlay (${OVERLAY}) — the see-through bottom-sheet band`,
        );
    }

    return { violations, facts };
}

export function detect() {
    const a1 = detectAmbientHue();
    const a2 = detectFillTint();
    const a3 = detectSheetRung();
    return {
        violations: [...a1.violations, ...a2.violations, ...a3.violations],
        facts: { ambient: a1.facts, fill: a2.facts, sheet: a3.facts },
    };
}

// ── the self-test bite (--self-test) — the anti-gameability arm ──────────────
function selfTest() {
    const fails = [];

    // A1 bite — a hand-rolled rgb→oklch primitive in the observer must be flagged.
    const handRolled = "const srgbToOKLab = (r,g,b) => [r,g,b];";
    if (!/\b(function|const)\s+(srgbToOKLab|rawOklabToOklch|oklabToOklch)\b/.test(handRolled)) {
        fails.push("self-test A1: a hand-rolled srgbToOKLab was NOT caught (the single-color-core fence has no teeth)");
    }

    // A1 bite — a second getImageData call must red the no-2nd-pass fence.
    const twoPass = "ctx.getImageData(0,0,1,1); ctx2.getImageData(0,0,1,1);";
    const c = (twoPass.match(/\.getImageData\s*\(/g) || []).length;
    if (!(c > 1)) {
        fails.push("self-test A1: a second getImageData was NOT counted (the free-rider fence has no teeth)");
    }

    // A2 bite — a non-neutral fill-tint default must red the no-op floor.
    const badFillReg =
        '@property --glass-fill-tint { syntax: "<color>"; inherits: true; initial-value: oklch(0.6 0.2 145); }';
    if (/initial-value:\s*transparent\b/.test(badFillReg)) {
        fails.push("self-test A2: a non-neutral fill-tint default slipped the transparent-identity assert");
    }

    // A3 bite — the sheet rung must sit strictly between dialog and overlay.
    const badSheet = 0.99;
    const DIALOG = 0.68;
    const OVERLAY = 0.95;
    if (badSheet > DIALOG && badSheet < OVERLAY) {
        fails.push("self-test A3: an out-of-band sheet alpha slipped the dialog<sheet<overlay assert");
    }

    // (BI.W-CLEAR-FOLD — the two A3 clear self-test bites (a scrim-less .glass-clear;
    // an opaque clear ≥ dialog) were STRUCTURALLY COUPLED to the retired `clear` member
    // and die WITH it — the coupled retirement. proof:surface-axis W9's self-test bites
    // are the successor (a re-added dead member + a surviving --glass-bg-clear rung).)

    return fails;
}

function run() {
    const selfTestMode = process.argv.includes("--self-test");
    const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_FOUNDATION_ARTIFACT", "BE-glass-foundation");

    if (selfTestMode) {
        const fails = selfTest();
        const ok = fails.length === 0;
        console.log("proof:glass-foundation --self-test — the bite arm (anti-gameability)");
        if (ok) {
            console.log("  all clause bites have teeth ✓");
        } else {
            for (const f of fails) console.log(`  ✗ ${f}`);
        }
        process.exit(ok ? 0 : 1);
    }

    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-foundation",
        facts,
        violations,
    });

    console.log(
        "proof:glass-foundation — the BE Tier-0 glass-material foundation tokens — BE.W5",
    );
    console.log(
        `  A1 ambient-hue : writes=${facts.ambient.writesAmbientHue ? "✓" : "✗"}  value.js-math=${facts.ambient.importsValueJsPrimitives ? "✓" : "✗"}  free-rider(getImageData=${facts.ambient.getImageDataCount}/canvas=${facts.ambient.createCanvasCount})  gray-null=${facts.ambient.grayNullIdentity ? "✓" : "✗"}`,
    );
    console.log(
        `  A2 fill-tint   : @property fill-tint=${facts.fill.fillTintRegistered ? "✓" : "✗"} (<color> inherit transparent) strength=${facts.fill.fillStrengthRegistered ? "✓" : "✗"} (<%> inherit 0%)  distinct-from-accent=${facts.fill.distinctFromAccent ? "✓" : "✗"}  bg sheet shared=${facts.fill.bgSheetShared ? "✓" : "✗"}`,
    );
    console.log(
        `  A3 sheet rung  : sheet-α=${facts.sheet.sheetAlpha}  (in dialog<sheet<overlay band)`,
    );

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
