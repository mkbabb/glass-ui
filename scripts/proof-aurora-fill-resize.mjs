#!/usr/bin/env node
// The aurora fill-resize gate (proof:aurora-fill-resize).
//
// A WebGL2 aurora surface inside a `content-visibility:auto` ancestor can
// paint a BLACK BAR over part of its box. The mechanism is a size-measurement
// race:
//
//   1. `.aurora-root` carries `content-visibility:auto`. While its subtree is in
//      the skipped state (offscreen, or the transient pre-first-paint window) a
//      descendant canvas reports `clientWidth`/`clientHeight` 0 — the subtree is
//      not laid out.
//   2. The deferred-arm path calls the runtime `resize()` inside that window. A
//      resize that reads `clientHeight` then sizes the backing buffer to a 1px
//      sliver (the `Math.max(1, …)` floor), which stretches across the displayed
//      box — the rest reads as a black band over the dark surface beneath.
//   3. `contain-intrinsic-size: <…> none` lets the skipped block axis collapse to
//      zero, so even the layout box (and the IntersectionObserver arm target)
//      degenerates before first paint.
//
// The fix has three load-bearing seams, each assertable statically (a live-frame
// assertion would need a headless RAF/GL context — the §3a redress clause: that
// is a plan defect, so this is a SEAM gate over the source):
//
//   A. The aurora runtime (WebGL2 `runtime.ts`) measures the laid-out box via
//      `getBoundingClientRect()`, NOT `clientWidth`/`clientHeight` — the bounding
//      rect reflects the real border-box across a content-visibility skip.
//   B. `Aurora.vue`'s `.aurora-root` `contain-intrinsic-size` carries a non-zero
//      block fallback (no `none`), so a skipped/never-rendered aurora reserves
//      its box instead of collapsing.
//   C. The shared lifecycle re-measures on WAKE: `resume()` calls the consumer
//      `resize()` before resuming the loop, so a surface that changed box while
//      content-skipped re-syncs its buffer (the ResizeObserver does not fire for
//      a skipped subtree).
//
// bite-check: revert any runtime resize to `canvas.clientWidth`/`clientHeight`
// → clause A reddens; set the block intrinsic-size fallback back to `none` →
// clause B reddens; drop the `resize()` call from `resume()` → clause C reddens.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

/** Strip line + block comments so a clause cannot be satisfied by a comment. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

let _paths = null;
function paths() {
    if (_paths) return _paths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _paths = {
        ROOT,
        WEBGL_RUNTIME: resolve(
            ROOT,
            "src/components/custom/aurora/composables/runtime.ts",
        ),
        AURORA_SFC: resolve(ROOT, "src/components/custom/aurora/Aurora.vue"),
        LIFECYCLE: resolve(
            ROOT,
            "src/composables/glass/webgl/createCanvasLifecycle.ts",
        ),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_AURORA_FILL_RESIZE_ARTIFACT",
            "AX-aurora-fill-resize",
        ),
    };
    return _paths;
}

/**
 * A runtime's `resize()` must measure the laid-out box via getBoundingClientRect
 * and must NOT read the skip-degenerate `canvas.clientWidth`/`clientHeight`.
 */
function resizeMeasuresBoundingRect(label, path, violations) {
    if (!existsSync(path)) {
        violations.push(`the ${label} runtime is absent`);
        return false;
    }
    const src = stripComments(readFileSync(path, "utf8"));
    // Isolate the resize body so an unrelated clientWidth read elsewhere does not
    // false-fail (and a bounding-rect read elsewhere does not false-pass).
    const m = src.match(/function resize\([^)]*\)\s*(?::\s*\w+\s*)?\{([\s\S]*?)\n {12,16}\}/);
    const body = m ? m[1] : src;
    const usesBoundingRect = /\.getBoundingClientRect\(\)/.test(body);
    const usesClientDims = /canvas\.client(?:Width|Height)/.test(body);
    const ok = usesBoundingRect && !usesClientDims;
    if (!usesBoundingRect) {
        violations.push(
            `the ${label} resize() does not measure the box via getBoundingClientRect() — a content-skipped subtree reports a zero client size and the buffer sizes to a sliver (black bar)`,
        );
    }
    if (usesClientDims) {
        violations.push(
            `the ${label} resize() still reads canvas.clientWidth/clientHeight — these read 0 under a content-visibility skip; use getBoundingClientRect()`,
        );
    }
    return ok;
}

function run() {
    const { ROOT, WEBGL_RUNTIME, AURORA_SFC, LIFECYCLE, ARTIFACT } = paths();
    const violations = [];
    const facts = {};

    // ── A — the runtime measures the box via getBoundingClientRect.
    facts.webglResizeMeasuresBox = resizeMeasuresBoundingRect(
        "WebGL2",
        WEBGL_RUNTIME,
        violations,
    );

    // ── B — the aurora-root reserves a non-zero block axis (no `none` block
    //         fallback) so a skipped/never-rendered aurora does not collapse.
    if (!existsSync(AURORA_SFC)) {
        violations.push("Aurora.vue is absent");
        facts.intrinsicSizeReservesBlock = false;
    } else {
        const sfc = stripComments(readFileSync(AURORA_SFC, "utf8"));
        const cisMatch = sfc.match(/contain-intrinsic-size:\s*([^;]+);/);
        facts.containIntrinsicSize = cisMatch ? cisMatch[1].trim() : null;
        // The block-axis fallback is the LAST token. It must be a non-zero length
        // (e.g. `auto 600px`), never `none` and never a bare `auto` with a `none`
        // companion. We reject any `none` in the declaration.
        facts.intrinsicSizeReservesBlock =
            !!cisMatch && !/\bnone\b/.test(cisMatch[1]);
        if (!cisMatch) {
            violations.push(
                "Aurora.vue's .aurora-root has no `contain-intrinsic-size` — under content-visibility:auto a skipped aurora collapses to zero height (black bar)",
            );
        } else if (!facts.intrinsicSizeReservesBlock) {
            violations.push(
                `Aurora.vue's contain-intrinsic-size is "${cisMatch[1].trim()}" — a \`none\` axis lets the skipped block collapse; give the block axis a non-zero length fallback`,
            );
        }
    }

    // ── C — the lifecycle re-measures on wake (resume() calls resize()).
    if (!existsSync(LIFECYCLE)) {
        violations.push("the createCanvasLifecycle core is absent");
        facts.resumeReMeasures = false;
    } else {
        const lc = stripComments(readFileSync(LIFECYCLE, "utf8"));
        const resumeBody = lc.match(/function resume\([^)]*\)[^{]*\{([\s\S]*?)\n {4}\}/);
        facts.resumeReMeasures = !!resumeBody && /\bresize\(\)/.test(resumeBody[1]);
        if (!facts.resumeReMeasures) {
            violations.push(
                "createCanvasLifecycle resume() does not call resize() — a surface that changed box while content-skipped keeps a stale buffer (black bar) when it re-shows; the ResizeObserver does not fire for a skipped subtree",
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:aurora-fill-resize",
        facts,
        violations,
    });

    console.log(
        "proof:aurora-fill-resize — the aurora surface always fills its box (no content-skip black bar)",
    );
    console.log(
        `  A box-measured resize : WebGL2 ${facts.webglResizeMeasuresBox ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  B block axis reserved : ${facts.intrinsicSizeReservesBlock ? "yes ✓" : "NO ✗"}   (contain-intrinsic-size: ${facts.containIntrinsicSize ?? "—"})`,
    );
    console.log(
        `  C wake re-measures    : ${facts.resumeReMeasures ? "yes ✓" : "NO ✗"}`,
    );
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
