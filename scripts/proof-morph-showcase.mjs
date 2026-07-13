#!/usr/bin/env node
// AZ.W-MORPH-SHOWCASE — proof:morph-showcase, the V↔H dock-morph showcase gate.
//
// The born-RED → GREEN DEVICE-FREE static src-scan arm for the metaball-bridge
// morph (H4 arm a). It asserts the FIVE falsifiable structural witnesses; the
// captured visual/budget truth (the HG1 bidirectional frame-series, the HG3
// PRM-snap, the HG5 4×-throttle perf re-run) is the LOCAL-ONLY π half — it lives in
// docs/tranches/AZ/audit/visual/W-MORPH-SHOWCASE-DELTA.md, backstopped on CI by
// proof:live-verified-ledger, NEVER re-run server-side (SwiftShader cannot judge the
// liquid teardrop, and a 4×-throttle perf number is dev-box truth — the AY W-LIVE1
// split). So this .mjs carries tags ["local","ci","release"] (a static src-scan gate
// omitting `ci` REDs proof:tag-parity).
//
// The five clauses (each born-RED at the pre-wave HEAD, driven GREEN by this wave):
//
//   M1 — ONE `--dock-morph-t` scalar drives the morph. useDockOrientationMorph
//        writes EXACTLY `--dock-morph-t` (the dock's single morph scalar) on the
//        morph path; it mints NO second normalized clock token. RED at HEAD:
//        useDockOrientationMorph does not exist.
//   M2 — the topology limit is RESPECTED. Neither the morph composable nor the
//        bridge CSS interpolates a `clip-path` across the orientation flip (the
//        AX.W42 fold-7 NO-GO — a continuous mismatched-topology clip-path morph);
//        the reflow is OCCLUDED by the bridge (the bridge host + plates exist). RED
//        at HEAD: no bridge, and a clip-path morph would be the naive (wrong) attempt.
//   M3 — BIDIRECTIONALITY. The SAME scalar drives both directions — `toggle()`
//        re-targets the ONE spring 0↔1 (no separate forward/back clock). RED at HEAD:
//        absent.
//   M4 — `useLiquidFlex` (the W-LIQUID substrate) has ≥2 consumers. The
//        dock-orientation-morph + the tabs-indicator squish both import it. RED at
//        HEAD: useLiquidFlex does not exist (grep EMPTY).
//   M5 — the bridge clock is SCALAR-BOUND (the determinism clause). The bridge is the
//        CSS SVG-goo path: its animated axes are `f(var(--dock-morph-t))` /
//        `var(--stretch)` (the scalar + its derivative) and it carries NO
//        free-running CSS `animation`; the showcase mounts NO goo-blob on its
//        free-running `uTime`/pointer-`speed` channels. RED if the bridge mounts a
//        <GooBlob> (the free-running wall-clock path) or adds a `@keyframes`-driven
//        bridge animation.
//
// House style mirrors proof-dock-unify.mjs / proof-tabs-unified.mjs: comment-strip
// first (false-witness discipline), a pure exported detector, a byte-stable JSON
// artefact, a human summary, process.exit(1) on any violation.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:morph-showcase";

const LIQUID_FLEX = "src/composables/motion/useLiquidFlex.ts";
const ORIENTATION_MORPH =
    "src/components/custom/dock/composables/useDockOrientationMorph.ts";
const BRIDGE_CSS = "src/styles/dock/morph-bridge.css";
const SHOWCASE = "demo/stories/dock/morph-showcase.vue";
const GOO_FILTER = "src/components/custom/goo-filter/GooFilter.vue";

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ comments + <!-- html --> so a prose mention of a token
// in a comment is not mistaken for live code. Newlines preserved.
function stripComments(src) {
    return src
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

// Walk src/ + demo/ counting imports of useLiquidFlex (the M4 consumer census).
const SWEEP_EXT = /\.(vue|ts)$/;
const SWEEP_SKIP = new Set(["node_modules", "dist", ".git", ".claude"]);
function walk(dir, out = []) {
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (SWEEP_SKIP.has(entry.name)) continue;
            walk(join(dir, entry.name), out);
        } else if (entry.isFile() && SWEEP_EXT.test(entry.name)) {
            out.push(join(dir, entry.name));
        }
    }
    return out;
}

export function detect() {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
        return Boolean(ok);
    }

    const morphCode = stripComments(read(ORIENTATION_MORPH));
    const flexCode = stripComments(read(LIQUID_FLEX));
    const bridgeCss = stripComments(read(BRIDGE_CSS));
    const showcaseCode = stripComments(read(SHOWCASE));

    // ── M1 — ONE `--dock-morph-t` scalar drives the morph ──────────────────────
    const writesMorphT = /setProperty\(\s*["']--dock-morph-t["']/.test(morphCode);
    // No SECOND normalized clock token minted on the morph path — the only morph
    // scalar written is `--dock-morph-t`. A `--dock-morph-t2` / `--morph-t2` /
    // `--orientation-t` second clock would RED.
    const secondClock =
        /setProperty\(\s*["']--(?:dock-)?(?:morph-t-?2|orientation-t|flip-t|axis-t)["']/.test(
            morphCode,
        );
    assert(
        "M1 — useDockOrientationMorph writes the ONE --dock-morph-t scalar",
        writesMorphT,
    );
    assert("M1 — no second morph clock token is minted on the morph path", !secondClock);

    // ── M2 — the topology limit is respected ───────────────────────────────────
    // The morph composable + the bridge CSS interpolate NO `clip-path` across the
    // orientation flip (the AX.W42 fold-7 NO-GO). A `clip-path: …calc(var(--dock-
    // morph-t)…)` or a `transition: clip-path` on the morph path is the wrong arch.
    const morphClipInterp =
        /clip-path[^;]*var\(\s*--dock-morph-t/.test(morphCode + bridgeCss) ||
        /transition:[^;]*clip-path/.test(morphCode + bridgeCss);
    assert(
        "M2 — no clip-path interpolation across the orientation flip (topology limit)",
        !morphClipInterp,
    );
    // The reflow is OCCLUDED by the bridge — the bridge host + the two plates exist
    // (the goo merge that hides the column→row jump-cut).
    const bridgeOccludes =
        /\.dock-morph-bridge\b/.test(bridgeCss) &&
        /\.dock-morph-bridge-plate--vertical\b/.test(bridgeCss) &&
        /\.dock-morph-bridge-plate--horizontal\b/.test(bridgeCss);
    assert(
        "M2 — the reflow is occluded by the metaball bridge (two-plate goo merge)",
        bridgeOccludes,
    );

    // ── M3 — bidirectionality (the SAME scalar drives both directions) ──────────
    // `toggle()` flips orientation; `morphTo()` re-targets the ONE spring to 0 OR 1
    // (no separate forward/back clock). The spring re-base (interruptible) carries
    // both directions on one trajectory.
    const hasToggle = /\btoggle\s*\(\s*\)/.test(morphCode) || /\btoggle\b/.test(morphCode);
    const oneSpringBothWays =
        /spring\.target\s*=\s*targetT/.test(morphCode) &&
        /next === "horizontal" \? 1 : 0/.test(morphCode);
    assert("M3 — bidirectional toggle on the one scalar (toggle/morphTo)", hasToggle);
    assert(
        "M3 — the same spring re-targets 0↔1 for both directions (one trajectory)",
        oneSpringBothWays,
    );

    // ── M4 — useLiquidFlex has ≥2 consumers ─────────────────────────────────────
    const flexExists =
        existsSync(resolve(ROOT, LIQUID_FLEX)) &&
        /export function useLiquidFlex/.test(flexCode);
    assert("M4 — useLiquidFlex (the W-LIQUID substrate) is born", flexExists);
    const consumers = [];
    for (const root of ["src", "demo"]) {
        for (const file of walk(resolve(ROOT, root))) {
            const rel = file.slice(ROOT.length + 1);
            if (rel === LIQUID_FLEX) continue; // the definition is not a consumer
            const code = stripComments(readFileSync(file, "utf8"));
            if (/\buseLiquidFlex\b/.test(code)) consumers.push(rel);
        }
    }
    facts.liquidFlexConsumers = consumers;
    assert(
        `M4 — useLiquidFlex has ≥2 consumers (found ${consumers.length})`,
        consumers.length >= 2,
    );

    // ── M5 — the bridge clock is SCALAR-BOUND (not free-running) ────────────────
    // The bridge animated axes read `f(var(--dock-morph-t))` / `var(--stretch)` (the
    // scalar + its derivative); the bridge carries NO free-running CSS `animation`.
    const bridgeReadsScalar =
        /var\(\s*--dock-morph-t/.test(bridgeCss) && /var\(\s*--stretch/.test(bridgeCss);
    const bridgeHasCssAnimation = /\banimation\s*:/.test(bridgeCss);
    assert(
        "M5 — the bridge aspect/squish reads f(--dock-morph-t)/--stretch (scalar-bound)",
        bridgeReadsScalar,
    );
    assert("M5 — the bridge carries no free-running CSS animation", !bridgeHasCssAnimation);
    // The showcase mounts NO Blob (the free-running uTime/pointer-speed path the
    // M5 clause forbids — the CSS SVG-goo path was picked for exactly this reason).
    const mountsBlob = /<Blob\b/.test(showcaseCode);
    assert(
        "M5 — the showcase mounts no Blob (no free-running uTime/pointer-speed clock)",
        !mountsBlob,
    );
    // The deterministic SVG-goo bridge IS composed by the showcase. P7's M1 dedup hoisted
    // the inline <filter> into the ONE shell-root <GooFilter> mount; the showcase now
    // REFERENCES it as the REGULAR `filter: url(#dock-morph-goo)` (scalar-gated on
    // --dock-morph-t), and the unified GooFilter.vue carries the `dock-morph-goo` graph
    // (feColorMatrix). The witness follows the dedup: the showcase wires the goo by id +
    // the shared mount provides the deterministic graph.
    const referencesGoo = /url\(#dock-morph-goo\)/.test(showcaseCode);
    const gooFilterSrc = stripComments(
        existsSync(resolve(ROOT, GOO_FILTER))
            ? readFileSync(resolve(ROOT, GOO_FILTER), "utf8")
            : "",
    );
    const gooGraphPresent =
        /feColorMatrix/.test(gooFilterSrc) && /dock-morph-goo/.test(gooFilterSrc);
    assert(
        "M5 — the showcase references the deterministic SVG-goo bridge by id (filter: url(#dock-morph-goo))",
        referencesGoo,
    );
    assert(
        "M5 — the unified GooFilter.vue carries the deterministic dock-morph-goo graph (feColorMatrix)",
        gooGraphPresent,
    );

    return { facts, violations };
}

function run() {
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_MORPH_SHOWCASE_ARTIFACT",
        "AZ-morph-showcase",
    );
    writeGateArtifact(ARTIFACT, {
        stamp: snapshotStamp(),
        status,
        gate: "proof:morph-showcase",
        command: COMMAND,
        facts,
        violations,
    });

    console.log(
        "proof:morph-showcase — the V↔H liquid-glass dock-morph gate (AZ.W-MORPH-SHOWCASE)",
    );
    console.log(
        `  M1 one --dock-morph-t scalar (no 2nd clock) : ${facts["M1 — useDockOrientationMorph writes the ONE --dock-morph-t scalar"] && facts["M1 — no second morph clock token is minted on the morph path"] ? "YES" : "NO"}`,
    );
    console.log(
        `  M2 topology limit respected (occluded)      : ${facts["M2 — no clip-path interpolation across the orientation flip (topology limit)"] && facts["M2 — the reflow is occluded by the metaball bridge (two-plate goo merge)"] ? "YES" : "NO"}`,
    );
    console.log(
        `  M3 bidirectional on the one scalar          : ${facts["M3 — bidirectional toggle on the one scalar (toggle/morphTo)"] && facts["M3 — the same spring re-targets 0↔1 for both directions (one trajectory)"] ? "YES" : "NO"}`,
    );
    console.log(
        `  M4 useLiquidFlex ≥2 consumers               : ${facts[`M4 — useLiquidFlex has ≥2 consumers (found ${facts.liquidFlexConsumers?.length ?? "?"})`] ? "YES" : "NO"}  (${(facts.liquidFlexConsumers ?? []).map((c) => c.split("/").pop()).join(", ")})`,
    );
    console.log(
        `  M5 bridge clock scalar-bound (no free clock): ${facts["M5 — the bridge aspect/squish reads f(--dock-morph-t)/--stretch (scalar-bound)"] && facts["M5 — the bridge carries no free-running CSS animation"] && facts["M5 — the showcase mounts no Blob (no free-running uTime/pointer-speed clock)"] ? "YES" : "NO"}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
