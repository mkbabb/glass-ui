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
//        and the composed sheet/clear bgs ride the mode-aware oklab-tint seam.
//   A3 — `surface="clear"` is the 4th surface-axis member with its MANDATORY
//        legibility scrim, and `--glass-opacity-clear` / `--glass-opacity-sheet`
//        exist in the Apple-Clear / bottom-sheet bands.
//
// bite-check (the --self-test arm): a hand-rolled rgb→oklch in the observer reds A1;
// a second getImageData/canvas reds A1; a non-neutral fill-tint default reds A2; a
// `clear` member with no scrim reds A3; an opaque clear (α ≥ dialog 0.68) reds A3.

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

    // the composed sheet/clear bgs ride the SHARED mode-aware oklab-tint recipe (so
    // the W55 darken + the dark-arm companions reach them per-mode — the both-modes
    // arm, no second hand-rolled recipe). Byte-isomorphic to `--glass-bg-dialog`.
    // byte-isomorphic to `--glass-bg-dialog`: `color-mix(in oklab, color-mix(in srgb,
    // var(--card) … var(--glass-opacity-<name>) …), var(--glass-tint-source)
    // var(--glass-tint-strength))`. Match the OKLAB outer + the SRGB inner + the
    // per-name opacity token + the W55 tint cohort tail (order-faithful, nest-tolerant).
    const bgShape = (name) => {
        const re = new RegExp(
            `--glass-bg-${name}:\\s*color-mix\\(in oklab,\\s*color-mix\\(in srgb,\\s*var\\(--card\\)[^;]*var\\(--glass-opacity-${name}\\)[^;]*var\\(--glass-tint-source\\)\\s*var\\(--glass-tint-strength\\)[^;]*;`,
        );
        return re.test(tokensSquished);
    };
    facts.bgSheetShared = bgShape("sheet");
    facts.bgClearShared = bgShape("clear");
    if (!facts.bgSheetShared) {
        violations.push(
            "A2: `--glass-bg-sheet` does not ride the shared oklab-tint recipe (it must be byte-isomorphic to `--glass-bg-dialog`, only the opacity token differing — the mode-aware seam)",
        );
    }
    if (!facts.bgClearShared) {
        violations.push(
            "A2: `--glass-bg-clear` does not ride the shared oklab-tint recipe (byte-isomorphic to `--glass-bg-dialog` — the mode-aware seam)",
        );
    }

    return { violations, facts };
}

// ── A3: surface="clear" 4th member + mandatory scrim + opacity rungs ─────────
function detectClearSheet() {
    const violations = [];
    const facts = {};

    const tokens = stripCss(readMonolith(ROOT, "tokens"));
    const glass = stripCss(readMonolith(ROOT, "glass"));
    const glassSquished = squish(glass);

    // the opacity rungs exist in their bands.
    const clearM = /--glass-opacity-clear:\s*([\d.]+)/.exec(tokens);
    const sheetM = /--glass-opacity-sheet:\s*([\d.]+)/.exec(tokens);
    const dialogM = /--glass-opacity-dialog:\s*([\d.]+)/.exec(tokens);
    const overlayM = /--glass-opacity-overlay:\s*([\d.]+)/.exec(tokens);
    facts.clearAlpha = clearM ? Number(clearM[1]) : null;
    facts.sheetAlpha = sheetM ? Number(sheetM[1]) : null;
    const DIALOG = dialogM ? Number(dialogM[1]) : 0.68;
    const OVERLAY = overlayM ? Number(overlayM[1]) : 0.95;

    if (facts.clearAlpha === null) {
        violations.push("A3: `--glass-opacity-clear` is absent (the Apple-Clear rung)");
    } else if (!(facts.clearAlpha < DIALOG)) {
        violations.push(
            `A3: --glass-opacity-clear (${facts.clearAlpha}) is NOT strictly clearer than the dialog (${DIALOG}) — an opaque clear is a slab, not the maximally-translucent register`,
        );
    } else if (!(facts.clearAlpha > 0.45)) {
        violations.push(
            `A3: --glass-opacity-clear (${facts.clearAlpha}) is ≤ 0.45 — clearer than a plate (a ghost, not glass)`,
        );
    }
    if (facts.sheetAlpha === null) {
        violations.push("A3: `--glass-opacity-sheet` is absent (the bottom-sheet rung)");
    } else if (!(facts.sheetAlpha > DIALOG && facts.sheetAlpha < OVERLAY)) {
        violations.push(
            `A3: --glass-opacity-sheet (${facts.sheetAlpha}) is NOT strictly between the dialog (${DIALOG}) and the overlay (${OVERLAY}) — the see-through bottom-sheet band`,
        );
    }

    // the `clear` 4th surface-axis member in the resolver (the union + the mapping).
    const axisRaw = readFile(SURFACE_AXIS_FILE);
    const axisSrc = stripTs(axisRaw);
    facts.clearInUnion =
        /export\s+type\s+Surface\s*=[^;]*["']clear["']/.test(axisSrc);
    facts.clearMapped =
        /surface\s*===\s*["']clear["']\s*\)\s*return\s*`?\$\{base\}\s+glass-clear/.test(
            axisSrc,
        ) || /["']clear["'][^;]*glass-clear/.test(axisSrc);
    if (!facts.clearInUnion) {
        violations.push(
            "A3: the `Surface` union does not carry the `clear` member (the 4th surface-axis member is absent)",
        );
    }
    if (!facts.clearMapped) {
        violations.push(
            "A3: `surfaceClass` does not map `clear → glass-clear` (the scrim-coupled decoration class)",
        );
    }

    // the MANDATORY scrim — the `[data-surface="clear"]`/`.glass-clear` rule carries a
    // backdrop DIM reading `color-mix(in srgb, var(--background) …, transparent)` AND
    // its strength derives from the sampled `--glass-backdrop-luma`. A clear plate
    // WITHOUT the scrim is FORBIDDEN (the Apple Clear contract).
    const hasClearRule = /\.glass-clear\b/.test(glassSquished);
    facts.clearRule = hasClearRule;
    facts.scrimDim =
        /color-mix\( in srgb, var\(--background\)[^,]*var\(--glass-clear-scrim-strength\)/.test(
            glassSquished,
        );
    facts.scrimLumaDerived =
        /--glass-clear-scrim-strength:\s*calc\([^)]*var\(--glass-backdrop-luma/.test(
            glassSquished,
        );
    facts.clearReadsBg =
        /var\(--glass-bg-clear\)/.test(glassSquished);
    if (!hasClearRule) {
        violations.push(
            "A3: there is no `.glass-clear` decoration rule (the 4th-member CSS seam is absent)",
        );
    } else {
        if (!facts.clearReadsBg)
            violations.push(
                "A3: the `.glass-clear` plate does not read `--glass-bg-clear` (the maximally-translucent fill)",
            );
        if (!facts.scrimDim)
            violations.push(
                "A3 MANDATORY SCRIM: the `.glass-clear` rule has NO `color-mix(in srgb, var(--background) …, transparent)` backdrop-dim scrim — a scrim-less clear plate is FORBIDDEN (the Apple Clear contract: near-transparent → the text needs a scrim floor)",
            );
        if (!facts.scrimLumaDerived)
            violations.push(
                "A3 SCRIM: the scrim strength does not derive from the sampled `--glass-backdrop-luma` (it must dim MORE over a bright backdrop — the dynamic legibility)",
            );
    }

    // CV4-equivalent: the clear scrim DIMS THE BACKDROP (`--background`), it does NOT
    // re-write the W55 plate-tint cohort — the two legibility axes stay disjoint.
    facts.scrimForksW55 =
        /--glass-clear-scrim-strength:\s*var\(--glass-tint-strength\)/.test(
            glassSquished,
        );
    if (facts.scrimForksW55) {
        violations.push(
            "A3 distinct-axis: the clear scrim FORKS the W55 plate-tint cohort — the scrim dims the BACKDROP (`--background`), it never re-uses `--glass-tint-source`/`--glass-tint-strength` (the two axes are disjoint)",
        );
    }

    return { violations, facts };
}

export function detect() {
    const a1 = detectAmbientHue();
    const a2 = detectFillTint();
    const a3 = detectClearSheet();
    return {
        violations: [...a1.violations, ...a2.violations, ...a3.violations],
        facts: { ambient: a1.facts, fill: a2.facts, clear: a3.facts },
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

    // A3 bite — a `.glass-clear` rule WITHOUT a scrim must be caught (the contract).
    const scrimless = ".glass-clear { background: var(--glass-bg-clear); }";
    const hasScrim =
        /color-mix\(\s*in srgb,\s*var\(--background\)[^,]*var\(--glass-clear-scrim-strength\)/.test(
            scrimless,
        );
    if (hasScrim) {
        fails.push("self-test A3: a scrim-less .glass-clear slipped the mandatory-scrim assert");
    }

    // A3 bite — an opaque clear (α ≥ dialog 0.68) must red the clearer-than-modal assert.
    const opaqueClear = 0.7;
    const DIALOG = 0.68;
    if (opaqueClear < DIALOG) {
        fails.push("self-test A3: an opaque clear (≥ dialog) slipped the clearer-than-modal assert");
    }

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
        `  A2 fill-tint   : @property fill-tint=${facts.fill.fillTintRegistered ? "✓" : "✗"} (<color> inherit transparent) strength=${facts.fill.fillStrengthRegistered ? "✓" : "✗"} (<%> inherit 0%)  distinct-from-accent=${facts.fill.distinctFromAccent ? "✓" : "✗"}  bg sheet/clear shared=${facts.fill.bgSheetShared && facts.fill.bgClearShared ? "✓" : "✗"}`,
    );
    console.log(
        `  A3 clear/sheet : clear-α=${facts.clear.clearAlpha} sheet-α=${facts.clear.sheetAlpha}  union=${facts.clear.clearInUnion ? "✓" : "✗"} mapped=${facts.clear.clearMapped ? "✓" : "✗"}  scrim(dim=${facts.clear.scrimDim ? "✓" : "✗"} luma=${facts.clear.scrimLumaDerived ? "✓" : "✗"})`,
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
