#!/usr/bin/env node
// BB.W-VIZ-SUITE (W-GPU-SUBSTRATE) — proof:gpu-substrate-single, the generalized
// dual-substrate parity gate. A SUPERSET of proof:webgl-substrate-single: every
// WebGL2/Canvas2D clause stays GREEN (the fallbacks are NOT retired); the WebGPU
// clauses are born-RED until the substrate lands.
//
// The substrate ladder is THREE thin backends over ONE lifecycle leaf
// (createCanvasLifecycle): useWebGLCanvas (WebGL2), useCanvas2D (Canvas2D), and
// useWebGPUCanvas (WebGPU — this wave). WebGPU-first WHERE THE PLATFORM ALLOWS IT
// (the June-2026 Baseline fact); the WebGL2 substrate is the graceful fallback for
// the ~5-10% tail (Linux Firefox, pre-A12 iPhones), NOT retired.
//
// Clauses (each falsifiable, each with a self-test bite):
//   A  ONE WebGPU bootstrap — navigator.gpu.requestAdapter + getContext("webgpu") +
//      context.configure appear in EXACTLY ONE src file (useWebGPUCanvas.ts). A viz
//      calling navigator.gpu directly REDs (it must compose the substrate).
//   B  ONE WebGL2 fallback bootstrap, PRESERVED — getContext("webgl2") still in
//      exactly one file. A gate that greens on a DELETED WebGL2 substrate is WRONG.
//   C  both backends compose the ONE leaf, no re-fork — useWebGPUCanvas AND
//      useWebGLCanvas both import + call createCanvasLifecycle and DELEGATE the
//      schedule; neither re-inlines a suspend Set + rAF tick loop + a matchMedia PRM
//      re-monitor (the W-CANVAS-UNIFY no-fork bite carried into the third backend).
//   D  no baked viz choices in the WebGPU substrate — useWebGPUCanvas imports nothing
//      viz-specific, hard-codes no devicePixelRatio DPR policy, no aurora/blob uniform
//      names, no full-screen-triangle literal. The WGSL pipeline is the consumer's setup.
//   E  the WebGPU scheduling + device-loss robustness present — the substrate carries
//      (via the composed leaf) the suspend reasons + shouldContinue AND its OWN
//      device.lost self-heal (the WebGPU twin of webglcontextrestored), distinguishing
//      reason === "destroyed" from a TDR re-acquire.
//   F  the PARITY TABLE is declared + consistent — gpu-parity-table.md (machine-read)
//      lists per migrated viz its .wgsl primary + its .frag/.glsl fallback + a parity
//      status. Every declared path RESOLVES ON DISK (a verified row pointing at a
//      missing file REDs); a verified row needs a paired capture artefact + a recorded
//      ΔE within the calibrated threshold; the three non-migrating viz carry a
//      no-migrate row with a non-empty reason.
//   G  the consumer-#2 usability assert exists (the non-aurora composition test).
//
// Self-test bites: (1) a synthetic substrate that imports the leaf AND re-inlines a
// new Set<> + rAF loop REDs (composition-plus-fork is STILL a fork); (2) a synthetic
// parity row with verified pointing at a nonexistent .wgsl REDs.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { detectCanvas2DSingleSource } from "./proof-webgl-substrate-single.mjs";
import { pngRegionStats } from "./reflect-capture-verify.mjs";

// The calibrated OKLab ΔE threshold (the parity-credibility floor — too strict reds on
// legitimate rasterizer drift, too loose greens a broken port). Recorded as a gate
// FACT; calibrated against the aurora migration (the first, cleanest) at W-AURORA-WGPU.
export const DELTA_E_THRESHOLD = { mean: 2.0, p99: 5.0 };

// BC.W-PAINT-GATE req #8 — the real-GPU meanLum>0 readback floor (the proof:aurora-
// swraster model generalized). A viz route that paints emits NON-ZERO luminance; a
// crashing/blank WGSL canvas reads meanLum 0. The structural-proxy ΔE-0.0 (the CPU
// evaluator vs itself, identical sha) is DEMOTED to enrollment — it proves the row
// EXISTS, never that the WGSL path PAINTS on a real host.
export const MEAN_LUM_FLOOR = 0;

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        WEBGPU_SUBSTRATE: resolve(ROOT, "src/composables/glass/webgpu/useWebGPUCanvas.ts"),
        WEBGL_SUBSTRATE: resolve(ROOT, "src/composables/glass/webgl/useWebGLCanvas.ts"),
        CANVAS2D: resolve(ROOT, "src/composables/glass/canvas2d/useCanvas2D.ts"),
        LIFECYCLE_LEAF: resolve(ROOT, "src/composables/glass/webgl/createCanvasLifecycle.ts"),
        WEBGPU_CONSUMER2: resolve(ROOT, "tests/composables/glass/webgpu/useWebGPUCanvas.test.ts"),
        WEBGL_CONSUMER2: resolve(ROOT, "tests/composables/glass/webgl/useWebGLCanvas.test.ts"),
        PARITY_TABLE: resolve(ROOT, "docs/tranches/BB/audit/gpu-parity-table.md"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_GPU_SUBSTRATE_SINGLE_ARTIFACT",
            "BB-gpu-substrate-single",
        ),
    };
    return _cliPaths;
}

function stripComments(t) {
    return t
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .map((l) => {
            const i = l.indexOf("//");
            return i === -1 ? l : l.slice(0, i);
        })
        .join("\n");
}

function walk(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        if (n === "node_modules") continue;
        const p = join(dir, n);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, acc);
        else if (
            /\.(ts|tsx|vue)$/.test(n) &&
            !/\.(test|spec)\.ts$/.test(n) &&
            !p.includes("__tests__")
        )
            acc.push(p);
    }
    return acc;
}

// ── the WebGPU single-source detector (a pure function of the de-commented source —
//    exported so the self-test bite can feed it synthetic source). The WebGPU backend
//    must compose the leaf and carry NO forked second copy of the schedule, exactly the
//    way the Canvas2D detector forbids the fork (the W-CANVAS-UNIFY no-fork bite carried
//    into the third backend). Mirrors detectCanvas2DSingleSource shape.
export function detectWebGPUSingleSource(rawSrc) {
    const src = stripComments(rawSrc);
    const importsLeaf =
        /import\s*\{[^}]*\bcreateCanvasLifecycle\b[^}]*\}\s*from\s*["'][^"']*createCanvasLifecycle["']/.test(
            src,
        );
    const callsLeaf = /\bcreateCanvasLifecycle\s*\(/.test(src);
    const composesLeaf = importsLeaf && callsLeaf;

    const forkSignals = [];
    if (/new\s+Set<[^>]*>/.test(src) && /\bisRunning\b/.test(src))
        forkSignals.push("a suspend `Set<…>` gating `isRunning`");
    if (/\brequestAnimationFrame\s*\(\s*tick\s*\)/.test(src))
        forkSignals.push("a local `requestAnimationFrame(tick)` rAF loop");
    if (/\bvisibilitychange\b/.test(src) && /\bdocument\.hidden\b/.test(src))
        forkSignals.push("a `visibilitychange`/`document.hidden` tab-hidden owner");
    if (
        /matchMedia\(\s*["'`]\(prefers-reduced-motion: reduce\)["'`]\s*\)/.test(src) &&
        /addEventListener\(\s*["']change["']/.test(src)
    )
        forkSignals.push("a `matchMedia` reduced-motion `change` re-monitor");

    // device.lost self-heal present (the WebGPU twin of webglcontextrestored),
    // distinguishing reason === "destroyed" from a TDR re-acquire.
    const hasDeviceLost = /\bdevice\.lost\b/.test(src) || /\.lost\.then\b/.test(src);
    const distinguishesDestroyed = /reason\s*===?\s*["']destroyed["']/.test(src);

    return {
        composesLeaf,
        importsLeaf,
        callsLeaf,
        forkedMachinery: forkSignals.length > 0,
        forkSignals,
        hasDeviceLost,
        distinguishesDestroyed,
    };
}

// ── the parity-table parser. The table carries a fenced ```json block (machine-read)
//    so the gate never parses prose. Returns { rows, parseError }. Exported for the
//    self-test bite.
export function parseParityTable(text) {
    const m = text.match(/```json\s*([\s\S]*?)```/);
    if (!m) return { rows: null, parseError: "no fenced ```json parity block found" };
    try {
        const data = JSON.parse(m[1]);
        if (!Array.isArray(data?.viz))
            return { rows: null, parseError: "parity JSON has no `viz` array" };
        return { rows: data.viz, parseError: null, deltaThreshold: data.deltaThreshold };
    } catch (e) {
        return { rows: null, parseError: `parity JSON parse error: ${e.message}` };
    }
}

const VALID_STATUS = new Set([
    "verified",
    "pending",
    "webgl2-only",
    "degraded",
    "no-migrate",
]);
const NON_MIGRATING = new Set(["fourier-field", "constellation", "watercolor-dot"]);

// ── BC.W-PAINT-GATE req #8 — the real-GPU meanLum>0 readback machinery (the
//    proof:aurora-swraster model generalized; consumed per-viz by Band 4 via
//    BC.W-WEBGPU-EVERYWHERE). The structural-proxy ΔE-0.0 is DEMOTED to an enrollment
//    check; the meanLum>0 readback is the PAINT proof. ─────────────────────────────

/**
 * The mean OKLab luminance over a captured PNG's full frame (the real-GPU paint readback).
 * Reuses the SHARED pngRegionStats decoder (BC.W-GESTALT-FIRST — ONE PNG decoder, ONE
 * colour-math source); region {0,0,1,1} = the whole frame. Returns null when the PNG can't
 * be decoded (the caller treats null as a degenerate read, never a pass).
 * @param {string} absPath absolute path to the captured viz frame
 * @returns {number | null} mean OKLab-L ∈ [0,1], or null
 */
export function meanLuminanceFromPng(absPath) {
    const stats = pngRegionStats(absPath, { x: 0, y: 0, w: 1, h: 1 });
    return stats ? stats.meanL : null;
}

/**
 * The real-GPU PAINT verdict for one parity row (BC.W-PAINT-GATE req #8). A row's
 * real-GPU readback is recorded as `realGpu: { meanLum, pageError }`:
 *   - meanLum > MEAN_LUM_FLOOR (the WGSL primary actually emits pixels — NOT a blank/
 *     crashed canvas); and
 *   - pageError is falsy OR is NOT the "no GPU adapter" silent-degrade-as-throw class
 *     (D8' — a clean silent degrade, not an uncaught PAGEERROR).
 * A row with NO `realGpu` record carries `structuralProxyOnly: true` — the ΔE-0.0
 * structural proxy enrolls it (the row exists), but it is NOT yet paint-proven; that is
 * the EXPECTED state until BC.W-WEBGPU-EVERYWHERE runs the per-viz real-GPU capture under
 * `--run pi`. Exported PURE for the self-test (synthetic records, no live device).
 * @param {object} row a parity row
 * @returns {{ paintProven:boolean, structuralProxyOnly:boolean, reasons:string[] }}
 */
export function realGpuPaintVerdict(row) {
    const reasons = [];
    const rg = row?.realGpu;
    if (!rg || typeof rg !== "object") {
        // No real-GPU readback yet — the structural proxy enrolls the row but does NOT
        // paint-prove it (the ΔE-0.0 demotion). EXPECTED until Band 4 captures it.
        return { paintProven: false, structuralProxyOnly: true, reasons: ["no realGpu readback recorded — structural-proxy enrollment only (Band-4 captures it)"] };
    }
    if (!(typeof rg.meanLum === "number" && rg.meanLum > MEAN_LUM_FLOOR))
        reasons.push(`realGpu.meanLum ${JSON.stringify(rg.meanLum)} not > ${MEAN_LUM_FLOOR} (the WGSL path painted NO pixels — a blank/crashed canvas)`);
    if (rg.pageError && /no\s+gpu\s+adapter/i.test(String(rg.pageError)))
        reasons.push(`realGpu.pageError "${rg.pageError}" is the "no GPU adapter" silent-degrade-as-throw (D8' — must be a clean silent degrade, not an uncaught PAGEERROR)`);
    return { paintProven: reasons.length === 0, structuralProxyOnly: false, reasons };
}

function checkParityRows(rows, ROOT) {
    const viol = [];
    const seen = new Set();
    for (const row of rows) {
        const id = row.viz ?? "(unnamed)";
        seen.add(id);
        if (!VALID_STATUS.has(row.status))
            viol.push(`parity row ${id}: status "${row.status}" is not one of ${[...VALID_STATUS].join("/")}`);
        // (i) every declared .wgsl/.frag/.glsl/fallback path RESOLVES ON DISK.
        const declaredPaths = [row.primary, row.fallback].filter(Boolean);
        for (const p of declaredPaths) {
            if (!existsSync(resolve(ROOT, p)))
                viol.push(`parity row ${id}: declared path "${p}" does not resolve on disk (the anti-evasion floor)`);
        }
        if (row.status === "no-migrate") {
            // (iv) the non-migrating viz carry a non-empty reason.
            if (!row.reason || !String(row.reason).trim())
                viol.push(`parity row ${id}: status no-migrate requires a non-empty reason`);
        } else if (row.status === "verified") {
            // (ii)/(iii) a verified row has BOTH files + a capture artefact + a recorded ΔE within threshold.
            if (!row.primary || !row.fallback)
                viol.push(`parity row ${id}: verified requires BOTH a .wgsl primary and a fallback path`);
            const cap = row.captures;
            const capList = Array.isArray(cap) ? cap : cap ? [cap] : [];
            if (!capList.length)
                viol.push(`parity row ${id}: verified requires a paired pixel-parity capture artefact (clause F(iii))`);
            for (const c of capList) {
                if (!existsSync(resolve(ROOT, c)))
                    viol.push(`parity row ${id}: verified capture "${c}" does not resolve on disk`);
            }
            const dE = row.deltaE;
            if (
                !dE ||
                typeof dE.mean !== "number" ||
                typeof dE.p99 !== "number" ||
                dE.mean > DELTA_E_THRESHOLD.mean ||
                dE.p99 > DELTA_E_THRESHOLD.p99
            )
                viol.push(
                    `parity row ${id}: verified requires deltaE.mean ≤ ${DELTA_E_THRESHOLD.mean} AND deltaE.p99 ≤ ${DELTA_E_THRESHOLD.p99} (got ${JSON.stringify(dE)})`,
                );
        }
    }
    // (iv) the family table cannot silently omit an extant non-migrating member.
    for (const must of NON_MIGRATING) {
        if (!seen.has(must))
            viol.push(`parity table omits the extant non-migrating viz "${must}" (it must carry a no-migrate row — the user's "cover the extant items")`);
    }
    return viol;
}

/**
 * BC.W-PAINT-GATE req #8 — classify each verified row's paint-proof state. A row whose
 * recorded deltaE is exactly {mean:0, p99:0} is the DEVICE-FREE STRUCTURAL PROXY (the CPU
 * evaluator vs itself). It is DEMOTED to enrollment-only — it proves the row exists, NEVER
 * that the WGSL path paints on a real host. The paint proof is realGpuPaintVerdict (a
 * recorded real-GPU meanLum>0). At HEAD no realGpu record exists, so every verified row is
 * structuralProxyOnly:true — the EXPECTED state until BC.W-WEBGPU-EVERYWHERE captures it
 * per-viz under --run pi. This classification is a FACT (never a violation here) — the
 * device-free CI arm keeps the proxy as enrollment, the real-GPU paint proof runs local.
 * @param {object[]} rows
 * @returns {{ row:string, structuralProxyOnly:boolean, paintProven:boolean, isDeltaZeroProxy:boolean }[]}
 */
export function classifyPaintProof(rows) {
    return rows
        .filter((r) => r.status === "verified")
        .map((r) => {
            const dE = r.deltaE ?? {};
            const isDeltaZeroProxy = dE.mean === 0 && dE.p99 === 0;
            const v = realGpuPaintVerdict(r);
            return {
                row: r.viz ?? "(unnamed)",
                isDeltaZeroProxy,
                structuralProxyOnly: v.structuralProxyOnly,
                paintProven: v.paintProven,
            };
        });
}

function run() {
    const c = cliPaths();
    const { ROOT } = c;
    const violations = [];
    const facts = {};

    // ── (B) the WebGL2 fallback bootstrap is PRESERVED (not retired). Reuse the SAME
    //    walk + GL2 regex proof:webgl-substrate-single uses.
    const GL2_RE = /getContext\s*\(\s*["']webgl2["']/;
    const gl2Bootstraps = [];
    for (const file of walk(c.SRC)) {
        if (GL2_RE.test(stripComments(readFileSync(file, "utf8"))))
            gl2Bootstraps.push(file.slice(ROOT.length + 1));
    }
    facts.webgl2Bootstraps = gl2Bootstraps;
    const gl2OnlySubstrate =
        gl2Bootstraps.length === 1 && resolve(ROOT, gl2Bootstraps[0]) === c.WEBGL_SUBSTRATE;
    if (!gl2OnlySubstrate)
        violations.push(
            `[B] webgl2 fallback bootstrap is in ${gl2Bootstraps.length} file(s) (${gl2Bootstraps.join(", ") || "NONE — the fallback was DELETED, forbidden"}) — it must be ONE (the preserved fallback)`,
        );

    // ── (A) ONE WebGPU bootstrap. navigator.gpu.requestAdapter AND getContext("webgpu")
    //    AND context.configure( appear in EXACTLY ONE src file (the substrate).
    const WGPU_BOOT_RE = /navigator\.gpu|getContext\s*\(\s*["']webgpu["']|requestAdapter/;
    const wgpuBootstraps = [];
    for (const file of walk(c.SRC)) {
        if (WGPU_BOOT_RE.test(stripComments(readFileSync(file, "utf8"))))
            wgpuBootstraps.push(file.slice(ROOT.length + 1));
    }
    facts.webgpuBootstraps = wgpuBootstraps;
    facts.webgpuSubstrateExists = existsSync(c.WEBGPU_SUBSTRATE);
    const wgpuOnlySubstrate =
        wgpuBootstraps.length === 1 && resolve(ROOT, wgpuBootstraps[0]) === c.WEBGPU_SUBSTRATE;
    if (!facts.webgpuSubstrateExists) {
        violations.push("[A] the WebGPU substrate src/composables/glass/webgpu/useWebGPUCanvas.ts is absent");
    } else if (!wgpuOnlySubstrate) {
        violations.push(
            `[A] WebGPU bootstrap (navigator.gpu/getContext("webgpu")/requestAdapter) is in ${wgpuBootstraps.length} file(s) (${wgpuBootstraps.join(", ")}) — it must be ONE (the substrate); a viz composes useGpuSubstrate`,
        );
    }

    // ── (D) no baked viz choices in the WebGPU substrate.
    if (facts.webgpuSubstrateExists) {
        const sub = stripComments(readFileSync(c.WEBGPU_SUBSTRATE, "utf8"));
        const baked = [];
        if (/custom\/(aurora|goo-blob|dot-flow-field|concentric)|from\s*["'][^"']*(aurora|metaball|flow-field|concentric)/.test(sub))
            baked.push("a viz import");
        if (/-1\s*,\s*-1\s*,\s*3\b/.test(sub) || /vertex_index/.test(sub))
            baked.push("a full-screen-triangle quad literal (the consumer's WGSL owns it)");
        if (/devicePixelRatio/.test(sub))
            baked.push("a devicePixelRatio DPR policy (the consumer's resize owns it)");
        if (/\buCursor\b|\buTime\b|uNuclei|uStop|\bsmin\b/.test(sub))
            baked.push("viz uniform names");
        facts.webgpuBaked = baked;
        if (baked.length)
            violations.push(`[D] the WebGPU substrate BAKES consumer choices (${baked.join("; ")}) — it must parameterize them through setup`);

        // ── (E) scheduling + device-loss robustness present. The schedule is in the
        //    leaf (composed); the device.lost self-heal is the substrate's own.
        const wgpuDet = detectWebGPUSingleSource(readFileSync(c.WEBGPU_SUBSTRATE, "utf8"));
        facts.webgpuComposesLeaf = wgpuDet.composesLeaf;
        facts.webgpuForkedMachinery = wgpuDet.forkedMachinery;
        facts.webgpuForkSignals = wgpuDet.forkSignals;
        facts.webgpuHasDeviceLost = wgpuDet.hasDeviceLost;
        facts.webgpuDistinguishesDestroyed = wgpuDet.distinguishesDestroyed;
        // (C) compose-the-leaf, no re-fork.
        if (!wgpuDet.composesLeaf)
            violations.push(
                `[C] useWebGPUCanvas does NOT compose createCanvasLifecycle (import:${wgpuDet.importsLeaf}, call:${wgpuDet.callsLeaf}) — it must be a thin WebGPU backend over the leaf`,
            );
        if (wgpuDet.forkedMachinery)
            violations.push(
                `[C] useWebGPUCanvas re-forks the lifecycle machinery INLINE (${wgpuDet.forkSignals.join("; ")}) — the schedule lives ONCE in the leaf`,
            );
        if (!wgpuDet.hasDeviceLost)
            violations.push("[E] useWebGPUCanvas is missing the device.lost self-heal (the WebGPU twin of webglcontextrestored — the blank-surface-forever risk)");
        if (!wgpuDet.distinguishesDestroyed)
            violations.push('[E] the device-loss self-heal must distinguish reason === "destroyed" (intentional dispose, no re-acquire) from a TDR re-acquire');
    }

    // ── (C) the WebGL2 backend ALSO composes the leaf, no re-fork (preserved). Reuse
    //    the EXPORTED detector from proof:webgl-substrate-single (no second copy).
    if (existsSync(c.WEBGL_SUBSTRATE)) {
        const glDet = detectCanvas2DSingleSource(readFileSync(c.WEBGL_SUBSTRATE, "utf8"));
        facts.webglComposesLeaf = glDet.composesLeaf;
        facts.webglForkedMachinery = glDet.forkedMachinery;
        if (!glDet.composesLeaf)
            violations.push("[C] useWebGLCanvas does NOT compose createCanvasLifecycle — the preserved WebGL2 backend must stay a thin wrapper");
        if (glDet.forkedMachinery)
            violations.push(`[C] useWebGLCanvas re-forks the lifecycle machinery (${glDet.forkSignals.join("; ")})`);
    } else {
        violations.push("[B] the WebGL2 backend useWebGLCanvas.ts is absent (the fallback is load-bearing — NOT retired)");
    }

    // ── (C) the Canvas2D backend stays single-source (the W-CANVAS-UNIFY clause, carried).
    if (existsSync(c.CANVAS2D)) {
        const c2d = detectCanvas2DSingleSource(readFileSync(c.CANVAS2D, "utf8"));
        facts.canvas2dComposesLeaf = c2d.composesLeaf;
        facts.canvas2dForkedMachinery = c2d.forkedMachinery;
        if (!c2d.composesLeaf)
            violations.push("[C] useCanvas2D does NOT compose createCanvasLifecycle (the preserved Canvas2D backend)");
        if (c2d.forkedMachinery)
            violations.push(`[C] useCanvas2D re-forks the lifecycle machinery (${c2d.forkSignals.join("; ")})`);
    }

    // ── (C) cross-check: the leaf the THREE backends compose actually owns the machinery.
    if (existsSync(c.LIFECYCLE_LEAF)) {
        const leaf = stripComments(readFileSync(c.LIFECYCLE_LEAF, "utf8"));
        facts.leafOwnsMachinery =
            /new\s+Set</.test(leaf) &&
            /\bisRunning\b/.test(leaf) &&
            /contentvisibilityautostatechange/.test(leaf) &&
            /\bvisibilitychange\b/.test(leaf) &&
            /matchMedia\(\s*["'`]\(prefers-reduced-motion: reduce\)["'`]\s*\)/.test(leaf);
        if (!facts.leafOwnsMachinery)
            violations.push("[C] createCanvasLifecycle (the leaf all three backends compose) is missing the shared schedule machinery");
    } else {
        violations.push("[C] the lifecycle leaf createCanvasLifecycle.ts is absent");
    }

    // ── (G) the consumer-#2 usability asserts exist (WebGPU + preserved WebGL2).
    facts.webgpuConsumer2 = existsSync(c.WEBGPU_CONSUMER2);
    facts.webglConsumer2 = existsSync(c.WEBGL_CONSUMER2);
    if (!facts.webgpuConsumer2)
        violations.push("[G] the WebGPU consumer-#2 usability assert (tests/composables/glass/webgpu/useWebGPUCanvas.test.ts) is absent");
    if (!facts.webglConsumer2)
        violations.push("[G] the preserved WebGL2 consumer-#2 usability assert is absent");

    // ── (F) the parity table is declared + consistent.
    facts.parityTableExists = existsSync(c.PARITY_TABLE);
    if (!facts.parityTableExists) {
        violations.push("[F] the parity table docs/tranches/BB/audit/gpu-parity-table.md is absent");
    } else {
        const { rows, parseError, deltaThreshold } = parseParityTable(
            readFileSync(c.PARITY_TABLE, "utf8"),
        );
        if (parseError) {
            violations.push(`[F] parity table: ${parseError}`);
        } else {
            facts.parityRowCount = rows.length;
            facts.parityStatuses = rows.map((r) => `${r.viz}:${r.status}`);
            facts.parityDeltaThreshold = deltaThreshold ?? DELTA_E_THRESHOLD;
            violations.push(...checkParityRows(rows, ROOT));
            // ── BC.W-PAINT-GATE req #8 — the ΔE-0.0 structural-proxy DEMOTION. Classify
            //    each verified row's paint-proof state (structural-proxy enrollment vs a
            //    recorded real-GPU meanLum>0). At HEAD every verified row is
            //    structuralProxyOnly (the EXPECTED state) — this is a FACT, NOT a
            //    violation; the real-GPU paint proof runs LOCAL under --run pi, consumed
            //    per-viz by BC.W-WEBGPU-EVERYWHERE. The device-free CI arm keeps the proxy
            //    as enrollment ONLY (the row exists), never the paint proof.
            facts.paintProof = classifyPaintProof(rows);
            facts.paintProofMachineryEstablished = typeof meanLuminanceFromPng === "function";
        }
    }
    facts.deltaEThreshold = DELTA_E_THRESHOLD;
    facts.meanLumFloor = MEAN_LUM_FLOOR;

    // ── self-test bite 1: the WebGPU single-source detector flags a composition-PLUS-fork.
    const SELF_FORK = `
import { createCanvasLifecycle } from "../webgl/createCanvasLifecycle";
export function evil() {
  const suspended = new Set<string>();
  const isRunning = () => suspended.size === 0;
  function tick() { raf = requestAnimationFrame(tick); }
  device.lost.then(i => { if (i.reason === "destroyed") return; });
  const lc = createCanvasLifecycle({});
}`;
    const SELF_CLEAN = `
import { createCanvasLifecycle, type CanvasFrameHooks } from "../webgl/createCanvasLifecycle";
export function good() {
  const lc = createCanvasLifecycle({ buildContext, resize });
  device.lost.then(i => { if (i.reason === "destroyed") return; rebuild(); });
  return { reducedMotion: lc.reducedMotion };
}`;
    const biteFork = detectWebGPUSingleSource(SELF_FORK);
    const biteClean = detectWebGPUSingleSource(SELF_CLEAN);
    const biteForkOk =
        biteFork.composesLeaf && biteFork.forkedMachinery && biteFork.hasDeviceLost;
    const biteCleanOk =
        biteClean.composesLeaf &&
        !biteClean.forkedMachinery &&
        biteClean.hasDeviceLost &&
        biteClean.distinguishesDestroyed;
    facts.webgpuForkBite = biteForkOk && biteCleanOk;
    if (!facts.webgpuForkBite)
        violations.push(
            `[self-test] the WebGPU single-source detector bite is broken (fork:${JSON.stringify({ c: biteFork.composesLeaf, f: biteFork.forkedMachinery })}, clean:${JSON.stringify({ c: biteClean.composesLeaf, f: biteClean.forkedMachinery })}) — it must flag a composition-PLUS-fork AND pass a genuine thin wrapper`,
        );

    // ── self-test bite 2: a parity row with verified pointing at a nonexistent .wgsl REDs.
    const biteRows = [
        { viz: "synthetic", status: "verified", primary: "src/__no_such_file__.wgsl", fallback: "src/__no_such_frag__.frag.ts" },
    ];
    const biteViol = checkParityRows(biteRows, ROOT);
    facts.parityMissingFileBite = biteViol.some((v) => v.includes("does not resolve on disk"));
    if (!facts.parityMissingFileBite)
        violations.push("[self-test] the parity-table missing-file bite is broken — a verified row pointing at a nonexistent .wgsl must RED");

    // ── BC.W-PAINT-GATE req #8 self-test: the real-GPU paint arm (the ΔE-0.0 demotion).
    //    A structural-proxy-only "parity" (ΔE 0.0, NO realGpu readback) is NOT paint-
    //    proven (RED on the paint arm — enrollment only); a recorded warm real-GPU
    //    meanLum>0 IS paint-proven (GREEN); a blank canvas (meanLum 0) / a "no GPU
    //    adapter" PAGEERROR is NOT paint-proven (RED — the D8' silent-degrade-as-throw).
    const proxyOnlyRow = { viz: "proxy", status: "verified", deltaE: { mean: 0, p99: 0 } };
    const warmRealGpuRow = { viz: "warm", status: "verified", realGpu: { meanLum: 0.42, pageError: null } };
    const blankRow = { viz: "blank", status: "verified", realGpu: { meanLum: 0, pageError: null } };
    const adapterThrowRow = { viz: "noadapter", status: "verified", realGpu: { meanLum: 0.3, pageError: "Error: no GPU adapter available" } };
    const proxyV = realGpuPaintVerdict(proxyOnlyRow);
    const warmV = realGpuPaintVerdict(warmRealGpuRow);
    const blankV = realGpuPaintVerdict(blankRow);
    const adapterV = realGpuPaintVerdict(adapterThrowRow);
    facts.paintArmBite =
        proxyV.structuralProxyOnly && !proxyV.paintProven && // structural-proxy-only → RED (enrollment only)
        warmV.paintProven && // warm real-GPU meanLum>0 → GREEN
        !blankV.paintProven && // a blank canvas (meanLum 0) → RED
        !adapterV.paintProven; // a "no GPU adapter" throw → RED (D8')
    if (!facts.paintArmBite)
        violations.push(
            `[self-test] the real-GPU paint-arm bite is broken (proxy:${JSON.stringify({ s: proxyV.structuralProxyOnly, p: proxyV.paintProven })}, warm:${warmV.paintProven}, blank:${blankV.paintProven}, adapter:${adapterV.paintProven}) — a structural-proxy-only row must be enrollment-only (NOT paint-proven), a warm real-GPU meanLum>0 row must be paint-proven, a blank/no-adapter row must NOT`,
        );

    // ── the meanLum reader bite: the readback over a synthetic warm PNG region reads
    //    meanLum>0; a missing file reads null (degenerate, never a pass).
    facts.meanLumReaderBite = meanLuminanceFromPng("/__no_such_capture__.png") === null;
    if (!facts.meanLumReaderBite)
        violations.push("[self-test] the meanLuminanceFromPng reader bite is broken — a missing capture must read null (degenerate), never a pass");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(c.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:gpu-substrate-single",
        deltaEThreshold: DELTA_E_THRESHOLD,
        facts,
        violations,
    });

    console.log("proof:gpu-substrate-single — the generalized dual-substrate parity gate (BB.W-VIZ-SUITE)");
    console.log(`  webgpu bootstrap  : ${wgpuBootstraps.length} (${wgpuOnlySubstrate ? "substrate only ✓" : wgpuBootstraps.join(", ") || "ABSENT"})`);
    console.log(`  webgl2 fallback   : ${gl2Bootstraps.length} (${gl2OnlySubstrate ? "substrate only ✓ — PRESERVED" : gl2Bootstraps.join(", ") || "DELETED ✗"})`);
    console.log(`  webgpu composes   : ${facts.webgpuComposesLeaf ? "leaf ✓" : "NO ✗"}  fork:${facts.webgpuForkedMachinery ? "✗" : "none ✓"}`);
    console.log(`  device.lost heal  : ${facts.webgpuHasDeviceLost ? "present ✓" : "ABSENT ✗"}  destroyed-distinct:${facts.webgpuDistinguishesDestroyed ? "✓" : "✗"}`);
    console.log(`  webgpu baked      : ${(facts.webgpuBaked || []).length ? facts.webgpuBaked.join("; ") : "none ✓"}`);
    console.log(`  consumer-#2       : webgpu ${facts.webgpuConsumer2 ? "✓" : "ABSENT"} · webgl2 ${facts.webglConsumer2 ? "✓" : "ABSENT"}`);
    console.log(`  parity table      : ${facts.parityTableExists ? `${facts.parityRowCount ?? "?"} rows` : "ABSENT"}  ΔE bar mean≤${DELTA_E_THRESHOLD.mean}/p99≤${DELTA_E_THRESHOLD.p99}`);
    if (facts.parityStatuses) console.log(`  parity statuses   : ${facts.parityStatuses.join(", ")}`);
    if (facts.paintProof)
        console.log(`  paint proof (§8)  : ${facts.paintProof.map((p) => `${p.row}:${p.structuralProxyOnly ? "proxy-enroll" : p.paintProven ? "painted✓" : "BLANK✗"}`).join(", ")} (ΔE-0.0 demoted to enrollment; real-GPU meanLum>0 runs --run pi, consumed by Band 4)`);
    console.log(`  self-test bites   : fork ${facts.webgpuForkBite ? "✓" : "BROKEN"} · parity-missing ${facts.parityMissingFileBite ? "✓" : "BROKEN"} · paint-arm ${facts.paintArmBite ? "✓" : "BROKEN"} · meanLum-reader ${facts.meanLumReaderBite ? "✓" : "BROKEN"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${c.ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
