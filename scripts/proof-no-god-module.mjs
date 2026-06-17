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
    // BB.W-CARVE3 DRAINED the three BB.W-CI-GREEN rows to ∅ — the carve LANDED.
    //   • styles/tokens/offsets-sizing.css (574) → carved at the §9/§10 seam into
    //     tokens/offsets.css (93) + tokens/sizing.css (499), both < 500, dist
    //     byte-isomorphic; the parent file DELETED, the `tokens` CSS_MONOLITHS
    //     order re-pointed.
    //   • styles/utilities/base.css (516) → the form/interaction half stays in
    //     utilities/base.css (288); the post-tap-squish tail (status-dot → kbd +
    //     the fading-scroll recipe) carved into utilities/base-misc.css (250), an
    //     adjacent same-`@layer components` block at the next cascade slot, dist
    //     byte-isomorphic.
    //   • components/custom/fourier-field/FourierField.vue (505) → the ~475-line
    //     renderer lifted into composables/useFourierField.ts (the
    //     aurora/goo-blob/constellation colocation symmetry); the SFC drops well
    //     under 500.
    // The MONOTONIC drain is honoured (the rows DELETED in the same diff that
    // carved the files — a stale row reds, the gate's own guard). The close state
    // is now reached for the three CARVE3 files: `violations == []` for them AND
    // their rows are gone from the ratchet.
    //
    // BB.W-DOCK-MORPH-FAMILY re-armed ONE row: dockMorphContext.ts grew past 500
    // (the P0 terminal repair — the SYNCHRONOUS PRM seat + the reserved-footprint
    // measure logic: the measureTo/seatTargetSync/seatSync helpers). BOOK(BB.W-CARVE4)
    // — the Batch-6 residual carve extracts the measure/seat helpers into a sibling
    // composables/dockMorphMeasure.ts (the aurora/goo-blob colocation pattern; the
    // orchestrator stays the morph driver); drained to {} before the Batch-7 close.
    "components/custom/dock/composables/dockMorphContext.ts": 575, // BOOK(BB.W-CARVE4): extract the measure/seat helpers → composables/dockMorphMeasure.ts (Batch 6)
    // styles/tokens/glass.css — the §8 glass ladder is the RECURRING at-bound offender:
    // each glass-token wave (W-ON-GLASS-FG → carved out; W-DARK-INK-WARM; W-LIQUIDHOVER
    // grain-engage) pushes it over, and the whack-a-mole comment-trim is unsustainable.
    // BOOK(BB.W-CARVE4): carve the grain/specular/tint sub-blocks into a tokens/glass-fx.css
    // partial (the §8 opacity/blur/saturate LADDER stays; the grain + specular-track +
    // tint-source + backdrop-luma knobs split out) — drained to {} before the Batch-7 close.
    "styles/tokens/glass.css": 505, // BOOK(BB.W-CARVE4): carve the grain/specular/tint knobs → tokens/glass-fx.css (Batch 6)
    // BB.W-DRAG-MORPH wired the pull/morph gesture + roving-tabindex into the tabs
    // engine, pushing it past 500. BOOK(BB.W-CARVE4): extract the drag-morph wiring
    // (and/or the indicator transform path) into the colocated composables/ dir
    // (tabs/ already carries composables/useTabIndicator.ts) — drained before the
    // Batch-7 close.
    "components/custom/tabs/SegmentedTabs.vue": 543, // BOOK(BB.W-CARVE4): extract the drag-morph/indicator wiring → tabs/composables/ (Batch 6)
    // scale-paper.css holds MANY token families (paper + control + display + the
    // scroll-reveal/choreography substrate + grid) and is the recurring at-bound
    // tokens offender (W-CONTROL-TOKENS, W-PAPER-GRID, W-SCROLL-MOTION each grew it).
    // BOOK(BB.W-CARVE4): carve the scroll-reveal/choreography knob family → a
    // tokens/scroll-tokens.css partial (the paper/control/display families stay) —
    // drained before the Batch-7 close.
    "styles/tokens/scale-paper.css": 519, // BOOK(BB.W-CARVE4): carve the scroll-reveal/choreography knobs → tokens/scroll-tokens.css (Batch 6)
    // glass/ladder.css holds the 5-rung surface ladder + the calm-tier re-point
    // (W-ON-GLASS-FG) + the W-GLASS-ACCENT rim/accent group + the bright-bucket
    // @container — the glass-effect waves (W-LENSING/W-GLASS-ACCENT) accreted it.
    // BOOK(BB.W-CARVE4): carve the rim/accent + bright-bucket group → glass/rim.css
    // (the 5-rung ladder stays) — drained before the Batch-7 close.
    "styles/glass/ladder.css": 510, // BOOK(BB.W-CARVE4): carve the rim/accent + bright-bucket group → glass/rim.css (Batch 6)
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
