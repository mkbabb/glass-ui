#!/usr/bin/env node
// AW.W17 — proof:constellation-substrate-single.
//
// The Constellation lattice was GATED-NOT-LANDED at AV.W8 (1 consumer). It lands
// at AW.W17 with consumer #1 (the demo story) + consumer #2 (the slides deck,
// H.W10). This gate freezes the THREE invariants that keep the library surface
// clean of deck-domain content and the substrate single-source:
//
//   SUBSTRATE-EXISTS — `useCanvas2D.ts` exports `useCanvas2D` (AX.W37 renamed the
//     factory from the prior `create*` name; the `/canvas` subpath publishes it)
//     AND the Canvas2D substrate carries the same park/freeze machinery as
//     `useWebGLCanvas` (the suspend Set gating one isRunning, the content-
//     visibility offscreen hook, the tab-hidden owner, the LIVE reduced-motion
//     matchMedia `change` re-monitor). BB.W-CANVAS-UNIFY de-forked the substrate:
//     that machinery now lives ONCE in the shared `createCanvasLifecycle` leaf the
//     wrapper COMPOSES, so the machinery-presence asserts FOLLOW the composition —
//     they resolve against the leaf (read transitively through the wrapper's
//     import), not the inlined wrapper source. The `exportsFactory`/`hasDispose`/
//     composition asserts that genuinely read the wrapper STAY on the wrapper. The
//     clause's INTENT is unchanged ("the Canvas2D substrate carries the same
//     machinery as useWebGLCanvas"); only the LOCATION it reads moved from the
//     inlined fork to the shared leaf.
//   PRNG-SINGLE-SOURCE — `Constellation.vue` imports `mulberry32`/`hashString`
//     from `utils/prng` (the shipped single-source PRNG), NOT a private re-roll.
//   ANOMALY-IS-SKIN — NO `ncsu`/`anomaly`/`Fira Code`/`accentColor` literal lives
//     anywhere in `src/components/custom/constellation/*`. The branded NC-red
//     anomaly + dashed Fira-Code callout reach the canvas ONLY via the consumer's
//     `drawOverlay` injection.
//
// Born RED on HEAD before the substrate + component land. Bite: re-roll a private
// `mulberry32` in the constellation dir → PRNG clause reddens; paint an `anomaly`
// pass in `constellationField.ts` → ANOMALY clause reddens; drop the matchMedia
// re-monitor from the shared lifecycle leaf → SUBSTRATE clause reddens; sever the
// wrapper's composition of the leaf (drop the `createCanvasLifecycle` import) →
// SUBSTRATE clause reddens (the machinery is then unreachable through the wrapper).

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

/** Strip line + block comments so a clause cannot be satisfied by a comment. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/** Recursively walk a dir, yielding `.ts`/`.vue` file paths (the constellation tree has
 *  composables/ + shaders/ subdirs). */
function walkTree(dir) {
    const out = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) out.push(...walkTree(full));
        else if (/\.(ts|vue)$/.test(entry.name)) out.push(full);
    }
    return out;
}

function cliPaths() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    return {
        ROOT,
        // BC.W-VIZ-CONSTELLATION — the lattice re-homes off the Canvas2D substrate onto the
        // WebGPU instanced-points+lines substrate (the §E "WebGPU everywhere, no canvas"
        // mandate). The SUBSTRATE-EXISTS asserts re-point to the WebGPU leaf the orchestrator
        // composes (the proof:webgl-substrate-single "asserts follow the composition into the
        // carved leaf" precedent).
        SUBSTRATE: resolve(ROOT, "src/composables/glass/webgpu/useWebGPUCanvas.ts"),
        PICKER: resolve(ROOT, "src/composables/glass/webgpu/useGpuSubstrate.ts"),
        // The shared lifecycle leaf the WebGPU/WebGL2/Canvas2D backends all compose (the
        // schedule machinery lives ONCE there); the machinery-presence asserts follow the
        // composition into it.
        LIFECYCLE_LEAF: resolve(ROOT, "src/composables/glass/webgl/createCanvasLifecycle.ts"),
        COMPONENT: resolve(ROOT, "src/components/custom/constellation/Constellation.vue"),
        // The PRNG single-source seed lives in the render-loop ORCHESTRATOR, which
        // BA.W-CARVE2 lifted out of Constellation.vue's <script setup> into the
        // co-located useConstellation composable (the 576→105-line carve). The
        // prng-import witness reads BOTH (the SFC + its composable) so the
        // single-source check follows the seed to its post-carve home (BB.W-CI-GREEN
        // — the re-point follows the carve, the contract is identical: zero private
        // re-roll across the component + its conductor).
        ORCHESTRATOR: resolve(
            ROOT,
            "src/components/custom/constellation/composables/useConstellation.ts",
        ),
        DIR: resolve(ROOT, "src/components/custom/constellation"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_CONSTELLATION_ARTIFACT",
            "AW-constellation-substrate-single",
        ),
    };
}

function run() {
    const {
        ROOT,
        SUBSTRATE,
        PICKER,
        LIFECYCLE_LEAF,
        COMPONENT,
        ORCHESTRATOR,
        DIR,
        ARTIFACT,
    } = cliPaths();
    const violations = [];
    const facts = {};

    // ── SUBSTRATE-EXISTS (BC.W-VIZ-CONSTELLATION — re-pointed to the WebGPU leaf) ──
    // The lattice re-homes onto createGpuSubstrate (WebGPU instanced-points+lines primary,
    // the WebGL2 instanced-arrays twin fallback). The machinery-presence asserts (suspend
    // Set / content-visibility / tab-hidden / reduced-motion re-monitor) FOLLOW the
    // composition into the SHARED lifecycle leaf (the proof:webgl-substrate-single "asserts
    // follow the composition into the carved leaf" precedent); the WebGPU wrapper composes
    // that leaf + carries the device.lost self-heal.
    if (!existsSync(SUBSTRATE)) {
        violations.push("the useWebGPUCanvas substrate is absent");
        facts.substrateExists = false;
    } else {
        const sub = stripComments(readFileSync(SUBSTRATE, "utf8"));
        // BG.W-COLOCATE — the DOM-observer plumbing (content-visibility +
        // visibilitychange) is carved into the sibling `visibility.ts` leaf the scheduler
        // composes; the machinery-presence reads the UNION (createCanvasLifecycle ∪
        // visibility) so the assert follows the composition into the carved leaf.
        const visibilityPath =
            existsSync(LIFECYCLE_LEAF) &&
            LIFECYCLE_LEAF.replace("createCanvasLifecycle.ts", "visibility.ts");
        const visibilitySrc =
            visibilityPath && existsSync(visibilityPath)
                ? readFileSync(visibilityPath, "utf8")
                : "";
        const leaf =
            existsSync(LIFECYCLE_LEAF) &&
            stripComments(
                `${readFileSync(LIFECYCLE_LEAF, "utf8")}\n${visibilitySrc}`,
            );
        facts.substrateExists = true;
        facts.leafExists = Boolean(leaf);
        facts.pickerExists = existsSync(PICKER);

        // Wrapper-side: the public surface + its own teardown + the COMPOSITION.
        facts.exportsFactory = /export function createWebGPUCanvas/.test(sub);
        facts.hasDispose = /\bdispose\s*:/.test(sub) || /function dispose\b/.test(sub);
        facts.composesLeaf =
            /import\s*\{[^}]*\bcreateCanvasLifecycle\b[^}]*\}\s*from\s*["'][^"']*createCanvasLifecycle["']/.test(
                sub,
            ) && /\bcreateCanvasLifecycle\s*\(/.test(sub);
        facts.hasDeviceLost = /\b(dev|device)\.lost\b/.test(sub);

        // Machinery-presence: resolve against the LEAF the wrapper composes (the
        // single-source home). Gate the reads on the composition — unreachable machinery
        // (a severed import) is no machinery at all.
        const reachable = facts.composesLeaf && Boolean(leaf);
        facts.hasSuspendSet =
            reachable && /new Set</.test(leaf) && /isRunning\b/.test(leaf);
        facts.hasContentVisibility =
            reachable &&
            /contentvisibilityautostatechange/.test(leaf) &&
            /suspend\(\s*["']off-screen["']\s*\)/.test(leaf);
        facts.hasTabHidden =
            reachable &&
            /visibilitychange/.test(leaf) &&
            /document\.hidden/.test(leaf) &&
            /suspend\(\s*["']tab-hidden["']\s*\)/.test(leaf);
        facts.hasReducedMotionReMonitor =
            reachable &&
            /matchMedia\(\s*["'`]\(prefers-reduced-motion: reduce\)["'`]\s*\)/.test(leaf) &&
            /addEventListener\(\s*["']change["']/.test(leaf);

        if (!facts.exportsFactory)
            violations.push("useWebGPUCanvas does not export the `createWebGPUCanvas` factory");
        if (!facts.pickerExists)
            violations.push("the createGpuSubstrate picker (useGpuSubstrate.ts) is absent");
        if (!facts.composesLeaf)
            violations.push(
                "useWebGPUCanvas does not compose the shared `createCanvasLifecycle` leaf (no import + call) — the WebGPU substrate must be a thin backend over the single-source lifecycle",
            );
        if (!facts.hasDeviceLost)
            violations.push(
                "useWebGPUCanvas is missing the `device.lost` self-heal (the WebGPU blank-surface-forever risk)",
            );
        if (!facts.leafExists)
            violations.push(
                "the shared `createCanvasLifecycle` leaf (the lifecycle single source) is absent",
            );
        if (!facts.hasSuspendSet)
            violations.push(
                "the lifecycle has no suspend Set gating `isRunning()` reachable through the composed leaf (the demand-driven park model)",
            );
        if (!facts.hasContentVisibility)
            violations.push(
                "the lifecycle has no content-visibility offscreen-park reachable through the composed leaf (no `contentvisibilityautostatechange` → `suspend(\"off-screen\")`)",
            );
        if (!facts.hasTabHidden)
            violations.push(
                "the lifecycle does not park on `document.hidden` through the composed leaf (no `visibilitychange` → `suspend(\"tab-hidden\")`)",
            );
        if (!facts.hasReducedMotionReMonitor)
            violations.push(
                "the lifecycle does not LIVE-monitor `prefers-reduced-motion` through the composed leaf (no `matchMedia` `change` re-monitor)",
            );
    }

    // ── NO-CANVAS2D — the orchestrator composes the picker, never a 2D context ────
    // BC.W-VIZ-CONSTELLATION §E "no canvas anywhere": the migration RETIRES the Canvas2D
    // substrate + the four `ctx`-bound draw passes. The orchestrator must compose
    // createGpuSubstrate AND carry NO `useCanvas2D` import nor any `getContext("2d")`.
    if (existsSync(ORCHESTRATOR)) {
        const orch = stripComments(readFileSync(ORCHESTRATOR, "utf8"));
        facts.orchestratorComposesPicker =
            /\b(createGpuSubstrate|useGpuSubstrate)\b/.test(orch);
        facts.orchestratorNoCanvas2D =
            !/\buseCanvas2D\b/.test(orch) && !/getContext\(\s*["']2d["']\)/.test(orch);
        if (!facts.orchestratorComposesPicker)
            violations.push(
                "useConstellation does not compose createGpuSubstrate — the lattice must render on the WebGPU instanced substrate",
            );
        if (!facts.orchestratorNoCanvas2D)
            violations.push(
                "useConstellation still binds the Canvas2D substrate (a `useCanvas2D` import or a `getContext(\"2d\")` call) — the §E 'no canvas anywhere' mandate retires it",
            );
    }
    // The constellation tree carries NO `getContext("2d")` / `ctx.arc` / `ctx.fill`
    // anywhere (the four Canvas2D draw passes are deleted).
    {
        const twoDHits = [];
        if (existsSync(DIR)) {
            for (const file of walkTree(DIR)) {
                const src = stripComments(readFileSync(file, "utf8"));
                if (/getContext\(\s*["']2d["']\)/.test(src) || /\bctx\.arc\b/.test(src))
                    twoDHits.push(file.slice(ROOT.length + 1));
            }
        }
        facts.canvas2dAbsent = twoDHits.length === 0;
        facts.canvas2dHits = twoDHits;
        if (!facts.canvas2dAbsent)
            violations.push(
                `a Canvas2D drawing context survives in the constellation tree (must be GONE — WebGPU instanced render): ${twoDHits.join("; ")}`,
            );
    }

    // ── PRNG-SINGLE-SOURCE ────────────────────────────────────────────────────
    if (!existsSync(COMPONENT)) {
        violations.push("Constellation.vue is absent");
        facts.componentExists = false;
    } else {
        facts.componentExists = true;
        // The prng symbols must come FROM the shared utils/prng leaf — read across the
        // SFC + its render-loop orchestrator (the seed lives in useConstellation
        // post-BA.W-CARVE2; either home satisfies the single-source rule).
        const prngSources = [COMPONENT, ORCHESTRATOR]
            .filter(existsSync)
            .map((p) => stripComments(readFileSync(p, "utf8")))
            .join("\n");
        facts.prngImportFromShared =
            /import\s*\{[^}]*\b(mulberry32|hashString)\b[^}]*\}\s*from\s*["'][^"']*utils\/prng["']/.test(
                prngSources,
            );
        if (!facts.prngImportFromShared)
            violations.push(
                "Constellation does not import `mulberry32`/`hashString` from `utils/prng` (the single-source PRNG) — neither the SFC nor its useConstellation orchestrator pulls the shared leaf; a private re-roll is the regression",
            );
    }

    // ── ANOMALY-IS-SKIN — no deck-domain literal anywhere in the dir ──────────
    const FORBIDDEN = [/ncsu/i, /anomaly/i, /Fira Code/i, /accentColor/];
    const dirHits = [];
    if (existsSync(DIR)) {
        for (const file of readdirSync(DIR)) {
            // The README is allowed to NAME the seam (it documents "the anomaly is
            // a consumer overlay"); the source files must carry zero domain skin.
            if (!/\.(ts|vue)$/.test(file)) continue;
            const src = readFileSync(resolve(DIR, file), "utf8");
            for (const re of FORBIDDEN) {
                if (re.test(src)) dirHits.push(`${file} :: ${re}`);
            }
        }
    }
    facts.anomalySkinAbsent = dirHits.length === 0;
    facts.dirHits = dirHits;
    if (!facts.anomalySkinAbsent)
        violations.push(
            `deck-domain skin literal found in the constellation source (must live in a consumer drawOverlay): ${dirHits.join("; ")}`,
        );

    // ── the ONE math source carries the CPU edge SET scan (the render reads it) ────
    // BC.W-VIZ-CONSTELLATION: the four Canvas2D draw passes RETIRED; the engine exports the
    // pure CPU edge SET scan (`buildEdges`/`appendPointerWeb`) the WGSL/GLSL render
    // transcribes (the single-math-source bar — the WGSL renders, it does not re-derive).
    const ENGINE = resolve(DIR, "constellationField.ts");
    if (existsSync(ENGINE)) {
        const eng = stripComments(readFileSync(ENGINE, "utf8"));
        facts.hasEdgeScan =
            /export function buildEdges/.test(eng) &&
            /export function appendPointerWeb/.test(eng);
        if (!facts.hasEdgeScan)
            violations.push(
                "constellationField.ts does not export the CPU edge SET scan (buildEdges/appendPointerWeb) — the ONE math source the instanced render transcribes",
            );
    }
    // ── the WGSL primary + the WebGL2 GLSL twin instanced-render shaders exist ─────
    const SHADERS = [
        "shaders/constellation-points.wgsl.ts",
        "shaders/constellation-lines.wgsl.ts",
        "shaders/constellation-points.glsl.ts",
        "shaders/constellation-lines.glsl.ts",
    ];
    const missingShaders = SHADERS.filter((s) => !existsSync(resolve(DIR, s)));
    facts.shadersExist = missingShaders.length === 0;
    if (!facts.shadersExist)
        violations.push(
            `the WebGPU/WebGL2 instanced-render shaders are missing: ${missingShaders.join(", ")}`,
        );

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:constellation-substrate-single",
        facts,
        violations,
    });

    console.log(
        "proof:constellation-substrate-single — WebGPU instanced substrate + Constellation, single-source prng, anomaly-is-skin (BC.W-VIZ-CONSTELLATION re-point)",
    );
    console.log(`  SUBSTRATE-EXISTS  : ${facts.exportsFactory ? "yes ✓" : "NO ✗"}`);
    console.log(
        `  PRNG-SINGLE-SOURCE: ${facts.prngImportFromShared ? "yes ✓" : "NO ✗"}`,
    );
    console.log(`  ANOMALY-IS-SKIN   : ${facts.anomalySkinAbsent ? "yes ✓" : "NO ✗"}`);
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
