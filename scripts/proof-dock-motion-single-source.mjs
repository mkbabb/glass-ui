#!/usr/bin/env node
// AU.W8 — the dock single-frame-origin gate (proof:dock-motion-single-source).
//
// The PERCEPTUAL sibling of the string-match proof:dock-opacity-lockstep. That
// gate proves both rules name the same easing token; it cannot see a frame-origin
// skew. The FLIP fallback (useLayerTransition.ts) historically swapped the layer
// refs SYNCHRONOUSLY (→ Vue paints classes → opacity fires ~T3-5ms) but deferred
// the width set through nextTick THEN rAF (~T7-10ms) — opacity ran one frame ahead
// of the width morph (the user's "dock shrinks before elements fade" report).
//
// The W8 fix (AU.W8.1) moves the ref swap INTO the rAF callback so class-apply
// and width-set share one frame ORIGIN. This STATIC gate asserts that structure
// (exact, flake-free).
//
// WHY STATIC, NOT A PLAYWRIGHT PROBE (ORCHESTRATOR DECISION, gate-fleet §1.2):
// glass-ui has ZERO playwright dependency and one MUST NOT be added for a single
// gate (KISS + payload + a real-browser rAF settle probe is sub-frame flaky —
// the same call proof:dock-opacity-lockstep + proof:dock-motion-parity made).
// The PERCEPTUAL settle-probe the charter sketched (container-width-stop frame ==
// child-opacity≤0.01 frame within ±1 frame) is validated DOWNSTREAM by the slides
// deck's Playwright dock validation (F arm), which consumes the published 3.3.0
// dock — exactly as proof:dock-opacity-lockstep delegated its perceptual half.
//
// The static gate asserts, by a comment-stripped scan of the FLIP fallback body:
//   SAME-FRAME    — the leavingLayer/currentLayer ref-swap AND the setDim width
//                   set are BOTH inside the width-driving requestAnimationFrame
//                   callback (one frame origin).
//   NO-SYNC-FORK  — no synchronous leavingLayer/currentLayer assignment precedes
//                   the FLIP fallback's nextTick( (the async fork's sync origin
//                   is gone). Scoped to the FLIP fallback section so the VT
//                   native path's own synchronous swap (correct there — it is one
//                   mutation inside startViewTransition) is not a false witness.
//   ONE-CLOCK     — the rAF callback is not split by a second requestAnimationFrame.
//
// House style mirrors proof-dock-opacity-lockstep.mjs: ESM .mjs, comment-strip
// first (false-witness discipline), a pure exported detector, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on any violation.
//
// SEVERITY: STRUCTURE (demoted at AV.W9.4). This is a cheap source-shape
// pre-check, NOT the source of truth for motion correctness — it cannot see a
// painted frame, so it could not catch the AU.W8b dual-driver freeze. The
// behavioral source of truth is now proof:dock-animation-live (the born-RED
// Playwright frame-sampling gate). This gate stays GREEN as a fast guard that the
// FLIP fallback's ref-swap + width-set still share one rAF origin.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        LAYER_TS: resolve(
            ROOT,
            "src/components/custom/dock/composables/useLayerTransition.ts",
        ),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOCK_MOTION_SINGLE_SOURCE_ARTIFACT",
            "AU-dock-motion-single-source",
        ),
    };
    return _cliPaths;
}

// Strip // line + /* block */ comments to blanks (preserve offsets/newlines) so
// a commented-out fork (or the doc-block sketch) is never a false witness.
function stripComments(src) {
    let out = "";
    let i = 0;
    const n = src.length;
    while (i < n) {
        if (src[i] === "/" && src[i + 1] === "*") {
            const end = src.indexOf("*/", i + 2);
            const stop = end === -1 ? n : end + 2;
            for (let j = i; j < stop; j++) out += src[j] === "\n" ? "\n" : " ";
            i = stop;
        } else if (src[i] === "/" && src[i + 1] === "/") {
            let j = i;
            while (j < n && src[j] !== "\n") {
                out += " ";
                j++;
            }
            i = j;
        } else {
            out += src[i];
            i++;
        }
    }
    return out;
}

// Slice the FLIP fallback section — everything AFTER the native-VT block returns.
// The VT path's own synchronous ref-swap (inside startViewTransition) is correct
// (one mutation, the browser owns the morph); the PRM fast-path's synchronous swap
// is likewise correct (no measure/pin/animate, it returns before any driver);
// only the FLIP fallback must defer its swap into the rAF. The fallback is ALWAYS
// the LAST transition path (VT → PRM → FLIP), and it opens with a
// `const id = ++transitionId;`, so anchor on the LAST `++transitionId` occurrence —
// robust to the VT block and the PRM fast-path each carrying their own bump.
function flipFallbackSection(src) {
    const marker = "++transitionId";
    const last = src.lastIndexOf(marker);
    // If there is no ++transitionId the structure changed — bail to a safe
    // whole-source scan (the SAME-FRAME check still holds the gate).
    if (last === -1) return null;
    return src.slice(last);
}

// Find the requestAnimationFrame(() => { … }) callback body that sets the width
// (contains `setDim(`), brace-balanced. Returns that {…} body, or null.
function rafWidthBody(src) {
    let from = 0;
    while (true) {
        const idx = src.indexOf("requestAnimationFrame", from);
        if (idx === -1) return null;
        const open = src.indexOf("{", idx);
        if (open === -1) return null;
        // Brace-match to find the callback body close.
        let depth = 0;
        let close = -1;
        for (let i = open; i < src.length; i++) {
            if (src[i] === "{") depth++;
            else if (src[i] === "}") {
                depth--;
                if (depth === 0) {
                    close = i;
                    break;
                }
            }
        }
        if (close === -1) return null;
        const body = src.slice(open + 1, close);
        if (/setDim\s*\(/.test(body)) return body;
        from = close + 1;
    }
}

// The pure detector. Takes the comment-stripped source, returns {facts,violations}.
export function detectSingleSource(src) {
    const violations = [];
    const facts = {};

    const body = rafWidthBody(src);
    if (body === null) {
        violations.push(
            "useLayerTransition.ts: the width-setting requestAnimationFrame callback (containing setDim) is missing",
        );
        facts.refSwapInRaf = false;
        facts.widthSetInRaf = false;
        facts.singleFrameOrigin = false;
        return { facts, violations };
    }

    // SAME-FRAME: both the layer ref swap AND the width set live in the rAF body.
    const refsInRaf =
        /leavingLayer\.value\s*=/.test(body) && /currentLayer\.value\s*=/.test(body);
    const setsWidthInRaf = /setDim\s*\(/.test(body);
    facts.refSwapInRaf = refsInRaf;
    facts.widthSetInRaf = setsWidthInRaf;
    if (!refsInRaf)
        violations.push(
            "the layer ref swap (leavingLayer/currentLayer) is NOT inside the width rAF callback — the frame ORIGIN is forked",
        );
    if (!setsWidthInRaf)
        violations.push(
            "the width set (setDim) is NOT inside the rAF callback — cannot prove single-frame origin",
        );

    // ONE-CLOCK: the width rAF callback is not split by a second rAF.
    if (/requestAnimationFrame\s*\(/.test(body)) {
        violations.push(
            "a nested requestAnimationFrame inside the width rAF callback — the swap and the width set must share ONE rAF clock",
        );
    }

    // NO-SYNC-FORK: no synchronous leavingLayer/currentLayer assignment precedes
    // the FLIP fallback's nextTick(. Scoped to the FLIP fallback section so the
    // VT native path's correct synchronous swap is not a false witness.
    const flip = flipFallbackSection(src);
    if (flip !== null) {
        const ntIdx = flip.indexOf("nextTick(");
        if (ntIdx !== -1) {
            const beforeNextTick = flip.slice(0, ntIdx);
            if (/(leavingLayer|currentLayer)\.value\s*=/.test(beforeNextTick)) {
                violations.push(
                    "a synchronous leavingLayer/currentLayer assignment precedes nextTick in the FLIP fallback — the async fork's sync origin survives",
                );
            }
        }
    }

    facts.singleFrameOrigin = violations.length === 0;
    return { facts, violations };
}

export function detectSource(src) {
    return detectSingleSource(stripComments(src ?? ""));
}

function run() {
    const { ROOT, LAYER_TS, ARTIFACT } = cliPaths();
    const { facts, violations } = detectSource(readFileSync(LAYER_TS, "utf8"));
    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "structure",
        sourceOfTruth: "proof:dock-animation-live",
        command: "npm run proof:dock-motion-single-source",
        facts,
        violations,
    });
    console.log(
        "proof:dock-motion-single-source — the dock single-frame-origin gate (AU.W8)",
    );
    console.log(`  ref swap inside width rAF : ${facts.refSwapInRaf ? "YES" : "NO"}`);
    console.log(`  width set inside rAF      : ${facts.widthSetInRaf ? "YES" : "NO"}`);
    console.log(
        `  single-frame origin       : ${facts.singleFrameOrigin ? "YES" : "NO"}`,
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
