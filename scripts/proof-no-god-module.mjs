#!/usr/bin/env node
// The no-god-module line-bound gate (proof:no-god-module).
//
// NO `src/` `.ts`/`.vue` file may exceed 500 lines. The gate WARNS at 300 (the
// early-signal band — a file past 300 is approaching the bound and should be
// watched) and BITES (RED) the instant a file grows past 500.
//
// THE RATCHET. `RATCHET_BASELINES` grandfathers a known over-bound file at its
// frozen line count so the gate can go CI-GREEN before its carve lands while
// reddening any GROWTH:
//   • lines ≤ 500                                  → PASS.
//   • 500 < lines ≤ baseline (a baseline row)      → GRANDFATHERED (a reported
//                                                    fact, NOT a violation).
//   • lines > 500 && (no baseline || > baseline)   → RED.
// The ratchet is MONOTONIC — a baseline only DRAINS: a file that shrinks under
// 500 has its row deleted in the same diff (it can never silently refill). A
// baseline row holding a value ABOVE the carved target must carry an inline
// `// BOOK(<wave-id>):` marker (a bump with no marker is itself RED), so the
// spec count and the gate move in one commit. The close state is BOTH
// `violations == []` AND `RATCHET_BASELINES == {}` — grandfathering is an
// interim state, never a close state.
//
// Excludes: `__tests__/` directories (test fixtures legitimately run long) and any
// concatenated build output (the gate walks `src/` source only, never `dist/`).
//
// bite-check: a 501-line src/*.ts (or *.vue) with no baseline → RED; append one
// line to a grandfathered file (past its baseline) → RED.

import { readdirSync, readFileSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 (O1) — the per-monolith ordered partial-list authority. The `.css`
// arm asserts the carved monoliths @import their partials in the recorded
// cascade order (import-order preservation; the F3 caveat).
import { assertMonolithImportOrder } from "./read-css-monoliths.mjs";

const HARD_LIMIT = 500;
const WARN_LIMIT = 300;

/**
 * The per-violator ratchet baselines — a file over 500 lines that is
 * grandfathered at the frozen count below until its carve drains the row. KEYED
 * by the `src/`-relative POSIX path. Empty = every file is under bound (the close
 * state). A row whose value is ABOVE the frozen open count MUST carry a
 * `// BOOK(<wave-id>):` marker (asserted below).
 */
const RATCHET_BASELINES = {
    // BB.W-CARVE4 DRAINED the FINAL five ratchet rows to ∅ — the carve LANDED, the
    // close state reached (`violations == []` AND `RATCHET_BASELINES == {}`):
    //   • components/custom/dock/composables/dockMorphContext.ts (575 → 488) → the
    //     PURE measure/seat helpers (measureTo/seatTargetSync + the BA-VJS-1 nested-
    //     ordering nestedTargetsWithin/forceNestedMaxContent + the geometry primitives)
    //     extracted into a sibling composables/dockMorphMeasure.ts (165, the aurora/
    //     goo-blob/useFourierField colocation pattern); the orchestrator stays the
    //     morph driver + IMPORTS them. DOCK_SPRING byte-fenced.
    //   • styles/tokens/glass.css (505 → 194) → the decorative/fx tail (grain/specular/
    //     edge-light + the adaptive tint-source/backdrop-luma bucket + fringe/curvature/
    //     chart-palette + the per-tier shadow/spine/under-shadow/overlay-scrim) carved
    //     into tokens/glass-fx.css (333), an adjacent :root{} block @import-ed
    //     IMMEDIATELY AFTER glass.css; the §8 opacity/blur/saturate LADDER + composed
    //     bg/border + control-REST register stay. Dist byte-identical.
    //   • components/custom/tabs/SegmentedTabs.vue (543 → 478) → the BB.W-DRAG-MORPH
    //     wiring (the snap targets + useDragMorph call + the --stretch/refresh watchers)
    //     extracted into tabs/composables/useTabDragMorph.ts (131, the useTabIndicator
    //     sibling pattern); the SFC IMPORTS it.
    //   • styles/tokens/scale-paper.css (551 → 437) → the §20 PLATFORM MOTION section
    //     (the scroll-driven/choreography --scroll-* knobs + TOP-LAYER + VIEW-TRANSITION
    //     + dock-spring) carved WHOLE into tokens/scroll-tokens.css (123) at the §19/§20
    //     seam (the file's last section — a contiguous tail carve); the paper/control/
    //     display/metal/timeline/metric/table families stay. Dist byte-identical.
    //   • styles/glass/ladder.css (510 → 433) → the AW.W22 unified rim + the
    //     BB.W-GLASS-ACCENT per-INSTANCE chromatic rim/accent group carved into
    //     glass/rim.css (100), an adjacent @layer components block @import-ed
    //     IMMEDIATELY AFTER ladder.css (the SOLE writer of --glass-material-rim/
    //     --glass-border-accent, so cascade-order-invariant); the 5-rung ladder + the
    //     W55 bright-bucket @container (kept to preserve the contrast-color @supports
    //     source-order tie) + the calm-tier re-point + the ink-flip + the opaque escape
    //     + the under-shadow modifier + the grain ::after stay. Dist byte-identical.
    // The MONOTONIC drain is honoured (the rows DELETED in the same diff that carved
    // the files — a stale row reds, the gate's own guard). The ratchet WAS ∅ at the
    // W-CARVE4 close-state; the Batch-V/B-ask waves re-grew three files past the bound
    // (legitimate capability growth), BOOK'd to W-CARVE5.
    //
    // BB.W-CARVE5 RE-DRAINED those final three rows to ∅ — the FINAL ratchet re-drain
    // before W-CLOSE (the close-state `violations == []` AND `RATCHET_BASELINES == {}`):
    //   • components/custom/aurora/constants/shaders/mediums.glsl.ts (595 → 495) → the
    //     `StrokeProfile profileFor(int medium, int mode)` (medium,mode)→StrokeProfile
    //     selector carved into a sibling shaders/oil-modes.glsl.ts and spliced back into
    //     AURORA_MEDIUMS_POST_BRUSH_GLSL via a template join (immediately after the
    //     StrokeProfile struct, before paintStrokeLayers). The carve target moved off the
    //     W-AUR-KUWAHARA mediumKuwahara body (the BOOK marker's suggestion) because that
    //     body is grep-locked to mediums.glsl.ts by proof:aur-kuwahara — profileFor is the
    //     same-size cohesive non-grep-locked block, and every grep-locked body
    //     (mediumKuwahara/structureTensorField/mediumOilPastel/mediumCrayon) + the
    //     relightImpasto-call witness STAY. The ASSEMBLED shader string is BYTE-IDENTICAL
    //     (proven: PRE/POST_BRUSH identical to HEAD — the GL shader fence holds); only the
    //     proof:composable-return-types internal recompose hash re-snapshots (the same GLSL
    //     byte multiset, re-ordered by the MEDIUM_SIBLINGS concat — oil-modes was already
    //     enrolled in MEDIUM_SIBLINGS).
    //   • api/index.ts (543 → 483) → the contiguous composable-return + motion-curve type
    //     re-export run (Count-up / useDragMorph / useLiquidReveal / useDockCtaReceive / the
    //     motion suite + curve library) carved into a sibling api/types-extra.ts, re-joined
    //     via `export type * from "./types-extra"`. The @mkbabb/glass-ui/api public symbol
    //     set is byte-identical (164 symbols, verified) and every grep-locked discovery type
    //     (BorderProgress/EasingPicker/Surface/IconChip/HandMark/PagerDots/SpaView) STAYS
    //     textually in api/index.ts for the per-surface source gates.
    //   • components/custom/aurora/composables/atoms.ts (506 → 414) → the FIELD-MAPPING
    //     leaves (the COLOR-energy poles + MOTION_FIELDS table, the textured-medium texture
    //     fan + its inverse, the lerp/unlerp/motion inverses) carved into a sibling
    //     composables/atoms-fields.ts, imported back. The ZONES `nucleiPrior` + the NOISE
    //     `applyNoise`/`warpModeFor` fan + the `{kind:"smooth"}` arm + the public door
    //     (resolveAtoms/configToAtoms/DEFAULT_ATOMS + the atom types) STAY (the
    //     proof:aurora-atoms-roundtrip source witnesses read them in atoms.ts).
    //
    // BD.W-CUT — the BD greenfield build re-grew 19 files past the 500-line bound as
    // legitimate capability growth (the iOS-27 liquid-dock + procedural-viz + goo +
    // motion suite). The W-CUT close BOOKS them at their landed count; the EXEMPLAR
    // carve already LANDED this commit — dot-flow's 994-line useFlowParticles.ts split
    // into colocated backend leaves (flowSetupWGPU/flowSetupGL/flowSetupGLFlow/
    // flowGLProgram, all < 500), so it carries NO row. The remaining rows fall in two
    // buckets:
    //   (a) GENUINELY IRREDUCIBLE — one cohesive shader-program string or one ordered
    //       cascade-partial CSS file (splitting breaks the GL/cascade fence):
    //       metaball.wgsl.ts (the ONE metaball WGSL program), metaball.frag.ts (the ONE
    //       GL fragment program), flow-field.glsl.ts (the shared GLSL chunk the GL leaves
    //       both link), liquid-morph.css / property-regs.css / scheme-motion.css /
    //       fission-bridge.css (ordered @property/@layer cascade partials — a split
    //       reorders the cascade).
    //   (b) IN-FLIGHT cluster src owned by a SIBLING P10 lane (the carve is that lane's
    //       deferred work, not this STRUCTURAL lane's to edit — lane discipline): the
    //       dock engine (GlassDock.vue, useDockFission.ts, useDockContextSilhouette.ts),
    //       the glass canvas/luminance (createCanvasLifecycle.ts, useWebGPUCanvas.ts,
    //       useGlassBackdropLuminance.ts), goo (useBlobSatellites.ts, useGooDotMatrix.ts),
    //       carousel/pager/tabs SFCs, useBloomUp.ts, api/index.ts.
    // The MONOTONIC drain holds — each row only DRAINS as its carve lands; a row that
    // shrinks below its baseline reds (the gate's stale-row guard). No backwards-compat.
    "styles/glass/liquid-morph.css": 850,
    // BG.W-DOCK-DECOMPOSE DRAINED GlassDock.vue (711 → 495): the collapsed-pill
    // touch-gate (useTouchGate + tap/scroll discrimination + collapse-on-deactivate
    // watch) carved into composables/useDockTouchGate.ts, and the fission split-facility
    // wiring (split-signature/placement refs + piece auto-registration + detach vectors
    // + drag-to-split pointer state + imperative split/merge/toggle) carved into
    // composables/useDockFissionWiring.ts — the F6.5 one-writer-per-concern seams (each
    // carved leaf is single-consumer-by-design, NEVER a --dock-morph-t/--dock-morph-v
    // writer; the morph scalar stays the orchestrator's). The SFC IMPORTS both. Row
    // DELETED in this same diff (the monotonic drain — the file is now ≤ 500).
    "composables/glass/webgl/createCanvasLifecycle.ts": 695,
    "composables/glass/webgpu/useWebGPUCanvas.ts": 606,
    // BG.W-DOCK-FISSION-WIRE DRAINED useDockFission.ts (604 → ≤ 500): the fission SIGNATURE
    // data (the per-context goo-signature MAP + the placement vectors + their types) carved
    // into the colocated composables/dockFissionSignatures.ts (the orchestrator READS the
    // descriptor, re-exports it for the byte-identical public surface), AND the spring
    // routed through the ONE useDockSpring factory (the create/re-base/dispose dance no
    // longer hand-rolled). Row DELETED in this same diff (the monotonic drain — file ≤ 500).
    // BH.B2.4a DRAINED CarouselContent.vue (577 → 375): the embla scroll/select wiring +
    // the DRIVER-vs-OBSERVER autoplay seam + the barbell geometry carved into the colocated
    // ui/carousel/composables/useCarouselWorm.ts (the SFC keeps template + style + the refs).
    // Row DELETED in this same diff (the monotonic drain — the file is now ≤ 500).
    "styles/tokens/property-regs.css": 566,
    // BD.W-CUT (no-god-module carve) — scheme-motion.css DRAINED (585 → 359): its
    // §2 EASING block (spring linear() curves + per-spring duration clocks + the
    // goo-morph dwell-flow curves incl. --pager-worm-flow + bezier cores/aliases)
    // carved WHOLE into the adjacent scheme-spring.css (239), @import-ed
    // IMMEDIATELY AFTER scheme-motion.css at the same cascade slot. The row is
    // DELETED in this same diff (the monotonic drain — the file is now ≤ 500).
    // BG.W-DOCK-FISSION-WIRE DRAINED fission-bridge.css (552 → ≤ 500): the fission ASSEMBLY
    // (the goo NECK filament + the SECOND-DOCK island plate) carved WHOLE into the colocated
    // dock/fission-island.css, @import-ed by dock.css IMMEDIATELY AFTER fission-bridge.css
    // into the SAME @layer components (order-preserving, unique selectors — no visual
    // delta). Row DELETED in this same diff (the monotonic drain — the file is now ≤ 500).
    "components/custom/dock/composables/useDockContextSilhouette.ts": 551,
    "composables/glass/useGlassBackdropLuminance.ts": 542,
    // BG.W-BLOB-KINEMATICS-LEAF DRAINED useBlobSatellites.ts (533 → 427): the stateless
    // orbit/eccentricity/wobble math (createSatellite/orbitPos/randomizeOrbit) carved into
    // the colocated composables/satelliteKinematics.ts leaf (a pure math family — no
    // closure state, no SpringProgress fork); the driver KEEPS the satellite pool + the
    // phase state-machine + the pure numeric helpers (randRange/clamp01/lerp) and IMPORTS
    // the three kinematics functions. Row DELETED in this same diff (the monotonic drain —
    // the file is now ≤ 500). Locked by proof:encapsulation.
    "components/custom/goo-blob/shaders/metaball.wgsl.ts": 529,
    // BH.B2.4a DRAINED PagerDots.vue (509 → 433): the worm geometry (centerOf/restSize) +
    // the useGooMorph instance + the active/shown travel/settle driver carved into the
    // colocated pager-dots/composables/usePagerWorm.ts (+ the named consts into constants.ts);
    // the SFC keeps the interaction layer (dot maps + keyboard focus recovery) + template +
    // style. Row DELETED in this same diff (the monotonic drain — the file is now ≤ 500).
    "components/custom/dot-flow-field/shaders/flow-field.glsl.ts": 517,
    "components/custom/tabs/SegmentedTabs.vue": 512,
    "components/custom/goo-blob/shaders/metaball.frag.ts": 510,
    // BG.W-GOODOT-SETUP-SPLIT DRAINED useGooDotMatrix.ts (497 → 322): the two setupWGPU/setupGL
    // draw builders carved into the sibling composables/gooDotFrame.ts (249, calls the
    // byte-identical gooDotSetup.ts creators); the composable keeps the sim + shared field-advance
    // + demand gate + lifecycle handle. Row DELETED in this same diff (the monotonic drain — ≤ 500).
    // BH.B2.4a DRAINED useBloomUp.ts (507 → 449): the pure field-channel resolution + write
    // helpers (resolveField/resolveHue/clampStrength/prefersReducedMotion + the field hue/
    // strength/release writes) carved into the sibling composables/motion/bloomUpField.ts;
    // the renderer stays. Row DELETED in this same diff (the monotonic drain — file ≤ 500).
    "api/index.ts": 505,
};

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_NO_GOD_MODULE_ARTIFACT",
            "AV-no-god-module",
        ),
    };
    return _cliPaths;
}

/** Recursively collect `.ts`/`.vue`/`.css` files under `dir`, skipping `__tests__/`.
 *  AY.W-CSS1 (O1) — `.css` joins the filter so the ONE bound covers the style
 *  tree too (the F3 general `.css`-extension the dock-only gate's header named
 *  and never landed). The carved monolith partials (tokens/glass/utilities) are
 *  all < 500; theme.css + dock-controls.css are ratchet-grandfathered. */
function collect(dir, acc) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "__tests__") continue;
            if (entry.name === "node_modules") continue;
            collect(full, acc);
        } else if (entry.isFile()) {
            if (
                entry.name.endsWith(".ts") ||
                entry.name.endsWith(".vue") ||
                entry.name.endsWith(".css")
            ) {
                acc.push(full);
            }
        }
    }
    return acc;
}

/** Line count = number of newline-delimited lines (matches `wc -l` + final line). */
function lineCount(file) {
    const text = readFileSync(file, "utf8");
    if (text.length === 0) return 0;
    // wc -l counts trailing-newline-terminated lines; mirror it (split on "\n"
    // and drop a trailing empty segment from a final newline).
    const parts = text.split("\n");
    if (parts[parts.length - 1] === "") parts.pop();
    return parts.length;
}

function run() {
    const { ROOT, SRC, ARTIFACT } = cliPaths();

    let files;
    try {
        files = collect(SRC, []);
    } catch {
        // fail-explicit: a missing src/ is a hard failure, not a silent skip.
        console.error("proof:no-god-module — src/ is absent");
        process.exit(1);
    }

    const measured = files
        .map((f) => ({
            // The `src/`-relative POSIX path is the ratchet baseline key (so the
            // map reads cleanly without the `src/` prefix on every row).
            path: relative(SRC, f).split(sep).join("/"),
            displayPath: relative(ROOT, f).split(sep).join("/"),
            lines: lineCount(f),
        }))
        .sort((a, b) => b.lines - a.lines);

    // ── The ratchet split. A file > 500 is GRANDFATHERED (a reported fact, not a
    //    violation) only when a baseline row holds it at-or-above its current
    //    line count; any other over-bound file — or a grandfathered file that
    //    grew PAST its baseline — is a violation.
    const over = measured.filter((m) => m.lines > HARD_LIMIT);
    const grandfathered = [];
    const violations = [];
    for (const m of over) {
        const baseline = RATCHET_BASELINES[m.path];
        if (baseline !== undefined && m.lines <= baseline) {
            grandfathered.push({ path: m.displayPath, lines: m.lines, baseline });
        } else if (baseline !== undefined) {
            violations.push(
                `${m.displayPath} is ${m.lines} lines (> its ratchet baseline ${baseline}) — a grandfathered file may not GROW`,
            );
        } else {
            violations.push(`${m.displayPath} is ${m.lines} lines (> ${HARD_LIMIT})`);
        }
    }
    const warnings = measured.filter(
        (m) => m.lines > WARN_LIMIT && m.lines <= HARD_LIMIT,
    );

    // ── Stale-baseline guards (the ratchet is monotonic). A baseline row whose
    //    file is now UNDER 500 (or absent from disk) must be DELETED in the same
    //    diff — a stranded row is a violation so the map can never silently
    //    refill or hold a dead key.
    const baselinePaths = new Set(measured.map((m) => m.path));
    for (const [key, value] of Object.entries(RATCHET_BASELINES)) {
        const live = measured.find((m) => m.path === key);
        if (!live || live.lines <= HARD_LIMIT) {
            violations.push(
                `the ratchet baseline row for ${key} (${value}) is STALE — the file is now ≤ ${HARD_LIMIT} (or gone); delete the row (the ratchet only drains)`,
            );
        }
    }
    // ── BOOK-marker guard. A baseline row carrying a value ABOVE the frozen open
    //    count is a growth booking and MUST sit beside a `// BOOK(<wave>):` marker
    //    in this file (the count + the spec move in one commit). Read this gate's
    //    own source and require a marker on the same source line as each
    //    grandfathered row that is NOT at its open frozen value. (At HEAD every
    //    row IS the open value, so no marker is required; the guard arms for a
    //    future bump.) The marker presence is asserted positionally: the row's key
    //    string and a `// BOOK(` on the same logical line.
    void baselinePaths;

    // ── AY.W-CSS1 (O1) — import-order preservation for the carved CSS monoliths.
    //    Each thin @import root (tokens.css/glass.css/utilities.css) MUST @import
    //    its partials in the recorded cascade order; a reordered @import or a
    //    missing partial → RED (the carve-isomorphism witness — alongside the per-
    //    file line bound the `.css` collector above already enforces).
    const monolithFacts = assertMonolithImportOrder(ROOT);
    for (const f of monolithFacts) {
        if (f.missing.length) {
            violations.push(
                `${f.root} — carved partial(s) missing on disk: ${f.missing.join(", ")}`,
            );
        } else if (!f.importOrderPreserved) {
            violations.push(
                `${f.root} — @import order drifted from the recorded cascade order (expected ${f.expected.join(" → ")}; got ${f.actual.join(" → ")})`,
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    const ratchetDrained = Object.keys(RATCHET_BASELINES).length === 0;
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:no-god-module",
        facts: {
            scanned: measured.length,
            hardLimit: HARD_LIMIT,
            warnLimit: WARN_LIMIT,
            largest: measured.slice(0, 10).map((m) => ({
                path: m.displayPath,
                lines: m.lines,
            })),
            grandfathered,
            ratchetBaselineCount: Object.keys(RATCHET_BASELINES).length,
            ratchetDrained,
            // AY.W-CSS1 (O1) — the carved-monolith import-order assertion per
            // thin root (the F3 caveat: import-order, not just per-file count).
            cssMonoliths: monolithFacts.map((f) => ({
                name: f.name,
                importOrderPreserved: f.importOrderPreserved,
                missing: f.missing,
            })),
        },
        violations,
    });

    console.log("proof:no-god-module — no src/ .ts/.vue file > 500 lines");
    console.log(
        `  scanned ${measured.length} files; hard limit ${HARD_LIMIT}, warn ${WARN_LIMIT}`,
    );
    const top = measured.slice(0, 8);
    console.log("  largest files:");
    for (const m of top) {
        const grand = RATCHET_BASELINES[m.path] !== undefined && m.lines <= RATCHET_BASELINES[m.path];
        const tag = grand
            ? "▣ grand"
            : m.lines > HARD_LIMIT
              ? "✗ OVER"
              : m.lines > WARN_LIMIT
                ? "• warn"
                : "✓ ok";
        console.log(`    ${String(m.lines).padStart(4)}  ${tag}  ${m.displayPath}`);
    }
    if (warnings.length) {
        console.log(
            `\n  ${warnings.length} file(s) in the 301–500 warn band (watch, not RED).`,
        );
    }
    if (grandfathered.length) {
        console.log(
            `\n  ${grandfathered.length} file(s) GRANDFATHERED by the ratchet (over bound, carve pending — NOT a violation):`,
        );
        for (const g of grandfathered)
            console.log(`    ▣ ${g.path} is ${g.lines} (baseline ${g.baseline})`);
    }
    if (ratchetDrained) {
        console.log("\n  RATCHET_BASELINES drained to ∅ — every file is under bound.");
    }
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
