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
    // W-CARVE4 close-state; the Batch-V/B-ask waves below re-grew three files past the
    // bound (legitimate capability growth), BOOK'd to W-CARVE5 — the final carve that
    // re-drains the ratchet to ∅ BEFORE W-CLOSE (the close-state is the FINAL bar).
    // BOOK(BB.W-CARVE5): W-AUR-KUWAHARA grew the aurora mediums GLSL (the kuwahara
    // medium body) — split the medium bodies into a partial preserving the recompose hash.
    "components/custom/aurora/constants/shaders/mediums.glsl.ts": 595,
    // BOOK(BB.W-CARVE5): the BB api publications (border-progress/dock-cta/spa-view/
    // dot-flow-field/concentric type re-exports) grew the discovery barrel — split into
    // api sub-modules (the curated-barrel precedent) preserving the public surface.
    "api/index.ts": 543,
    // BOOK(BB.W-CARVE5): B1-frag (the warpMode:"curl" branch + warpModeFor) grew the
    // aurora NOISE atom fan-out — split the warp/medium atom helpers into a sibling.
    "components/custom/aurora/composables/atoms.ts": 506,
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
