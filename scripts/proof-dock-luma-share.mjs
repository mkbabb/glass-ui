#!/usr/bin/env node
// proof:dock-luma-share — BI.W-DOCK-LUMA-SHARE (PERF-6 / FAM-5 / SUFFUSION-MAP R12).
//
// The 12 per-dock `useGlassBackdropLuminance` observers doing a `drawImage(auroraCanvas)
// + getImageData` readback (32×32, ≤ 4 Hz) off the ONE shared DockStage aurora collapse
// to ONE shared observer per ROUTE. The luminance signal is a per-ROUTE property of the
// shared backdrop, not a per-DOCK one — N docks over the SAME aurora read the SAME luma
// (+ the SAME BE.W-AMBIENT-TINT ambient hue). The shared observer samples the field ONCE
// at the stage scope and writes `--glass-backdrop-luma` / `--glass-backdrop` /
// `--glass-ambient-*` there; all N docks INHERIT via the registered inheriting @property
// cascade. A per-surface dock observer STANDS DOWN when a shared route observer covers it
// (an ancestor carrying the `data-glass-backdrop-shared` marker) — it inherits the route
// luma instead of mounting its own readback loop.
//
// The mechanism is a DOM marker, NOT provide/inject: DockStage renders `<slot>` and the
// docks are slotted from overview.vue, so provide/inject does NOT cross that boundary
// (the slotted content's instance-parent is the slot OWNER, not DockStage). The marker
// rides the SAME DOM ancestry the inheriting custom property itself cascades over.
//
//   DL1 one-shared-observer-per-route —
//     (a) DockStage mounts the ONE `useGlassBackdropLuminance(..., { shared: true })`
//         over the stage field (the per-route observer).
//     (b) GlassDock mounts a per-SURFACE observer (NO `shared: true`) that stands down
//         under coverage.
//     (c) the composable carries the stand-down mechanism: the `shared` option stamps the
//         `data-glass-backdrop-shared` marker on its target; a per-surface observer reads
//         `.closest([data-glass-backdrop-shared])` and STANDS DOWN (inherits) when a
//         shared ancestor covers it.
//   DL2 single-readback-pass — the field readback is ONE `getImageData` pass; the
//       BE.W-AMBIENT-TINT ambient-hue histogram rides the SAME pixel loop (a FREE rider,
//       NO second `getImageData`, NO second sampling canvas, NO per-dock re-fork). The
//       spec's original "luminance-only" DL2 predates the landed BE.W-AMBIENT-TINT arm
//       (gated by proof:single-color-core / proof:glass ST); this gate binds the REAL
//       invariant that survived the merge — ONE readback pass per route, the ambient hue
//       a rider on it — NOT a retire of the landed ambient arm.
//   DL3 honest-floor — when NOT covered a per-surface observer self-samples (the
//       `sampleStatic` / `sampleNow` path is reachable) and never crashes (the SSR /
//       no-DOM no-op guard). A dock over an unknown backdrop with no shared observer
//       falls back to its own sample — the honest floor, not a crash.
//
// Device-free SOURCE detector over the observer + the sampler leaf + GlassDock.vue +
// DockStage.vue. Tags ["local","ci"]. The BINDING readback-COUNT PAINT (ONE
// `[data-backdrop-sampled]` witness per route, all N docks share the inherited luma, AA
// un-regressed) is the LOCAL π `tests-visual/dock-luma-share.spec.ts` — rides the
// W-PI-IN-CLOSE battery + the proof:ba-gestalt dock verdict; this gate proves the SOURCE
// mechanism born-RED→GREEN.
//
// Self-test bites (each planted defect MUST flag): a composable WITHOUT the coverage
// stand-down REDs DL1c; a DockStage WITHOUT `shared: true` REDs DL1a; a `sampleAnimated`
// with a SECOND `getImageData` (double readback) REDs DL2.
//
// Run: node scripts/proof-dock-luma-share.mjs

import { existsSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-luma-share";

const PATHS = {
    ROOT,
    OBSERVER: "src/composables/glass/useGlassBackdropLuminance.ts",
    SAMPLER: "src/composables/glass/backdropLuminanceSample.ts",
    GLASS_DOCK: "src/components/custom/dock/GlassDock.vue",
    DOCK_STAGE: "demo/stories/dock/DockStage.vue",
    ARTIFACT: gateArtifactPath(
        "GLASS_UI_DOCK_LUMA_SHARE_ARTIFACT",
        "dock-luma-share",
    ),
};

const SHARED_MARKER = "data-glass-backdrop-shared";

// ── text helpers ────────────────────────────────────────────────────────────────
const stripJs = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + m.slice(p.length).replace(/[^\n]/g, " "));
const stripVue = (s) =>
    stripJs(s).replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

/** Slice a named `function <name>(` body by brace-matching (comment-stripped code in). */
function sliceFunction(code, name) {
    const re = new RegExp(`function\\s+${name}\\s*\\(`);
    const m = re.exec(code);
    if (!m) return "";
    let i = code.indexOf("{", m.index);
    if (i < 0) return "";
    let depth = 0;
    for (let j = i; j < code.length; j++) {
        const c = code[j];
        if (c === "{") depth++;
        else if (c === "}") {
            depth--;
            if (depth === 0) return code.slice(i, j + 1);
        }
    }
    return code.slice(i);
}

// ── DL1 — one shared observer per route + docks stand down ─────────────────────────
function checkDL1({ observerCode, glassDockCode, dockStageCode }) {
    const violations = [];

    // (a) DockStage mounts the ONE shared observer.
    const stageObserver = /useGlassBackdropLuminance\s*\(/.test(dockStageCode);
    const stageShared = /shared\s*:\s*true/.test(dockStageCode);
    if (!stageObserver)
        violations.push(
            "DL1(a) — DockStage.vue does NOT mount `useGlassBackdropLuminance(...)`. The ONE shared per-route observer must live on the stage (the 12→1 collapse: N docks inherit its write).",
        );
    else if (!stageShared)
        violations.push(
            "DL1(a) — DockStage.vue mounts the observer but WITHOUT `shared: true`. The stage observer must be the SHARED route observer (it stamps the `data-glass-backdrop-shared` marker so descendant docks stand down + inherit).",
        );

    // (b) GlassDock mounts a per-SURFACE observer (NOT shared).
    const dockObserver = /useGlassBackdropLuminance\s*\(/.test(glassDockCode);
    const dockShared = /shared\s*:\s*true/.test(glassDockCode);
    if (!dockObserver)
        violations.push(
            "DL1(b) — GlassDock.vue does NOT mount `useGlassBackdropLuminance(...)`. The dock keeps a per-surface observer that stands down under a shared route observer (the honest floor when standalone).",
        );
    else if (dockShared)
        violations.push(
            "DL1(b) — GlassDock.vue passes `shared: true`. The dock is a per-SURFACE observer (it must NOT claim the shared route role — that role is the stage's; a dock claiming it would stamp the marker + suppress its siblings).",
        );

    // (c) the composable carries the stand-down mechanism.
    const markerDeclared = new RegExp(
        `GLASS_BACKDROP_SHARED_ATTR\\s*=\\s*["']${SHARED_MARKER}["']`,
    ).test(observerCode);
    const sharedOption = /shared\?\s*:\s*boolean/.test(observerCode);
    const stampsMarker =
        /setAttribute\(\s*GLASS_BACKDROP_SHARED_ATTR/.test(observerCode) ||
        new RegExp(`setAttribute\\(\\s*["']${SHARED_MARKER}["']`).test(observerCode);
    const coverageStandDown =
        /\.closest\(/.test(observerCode) &&
        new RegExp(SHARED_MARKER).test(observerCode);
    if (!markerDeclared)
        violations.push(
            `DL1(c) — the composable does NOT declare \`GLASS_BACKDROP_SHARED_ATTR = "${SHARED_MARKER}"\`. The shared-coverage marker must be a named, exported const (the π + a consumer reference it).`,
        );
    if (!sharedOption)
        violations.push(
            "DL1(c) — the composable options do NOT carry a `shared?: boolean` axis. The shared route observer marks itself via this option (default false = a per-surface observer that stands down under coverage).",
        );
    if (!stampsMarker)
        violations.push(
            `DL1(c) — the composable does NOT stamp the \`${SHARED_MARKER}\` marker on its target when \`shared\`. Without the stamp the descendant docks cannot detect coverage + never stand down (the 12→1 collapse fails).`,
        );
    if (!coverageStandDown)
        violations.push(
            `DL1(c) — the composable does NOT read \`.closest([${SHARED_MARKER}])\` to STAND DOWN a covered per-surface observer. A covered dock must inherit the route luma via the cascade, NOT mount its own drawImage+getImageData loop.`,
        );

    return {
        violations,
        facts: {
            dl1StageObserver: stageObserver,
            dl1StageShared: stageShared,
            dl1DockObserver: dockObserver,
            dl1DockSurface: dockObserver && !dockShared,
            dl1MarkerDeclared: markerDeclared,
            dl1SharedOption: sharedOption,
            dl1StampsMarker: stampsMarker,
            dl1CoverageStandDown: coverageStandDown,
        },
    };
}

// ── DL2 — single readback pass (ambient hue a FREE rider, no per-dock re-fork) ──────
function checkDL2({ samplerCode }) {
    const violations = [];
    const animated = sliceFunction(samplerCode, "sampleAnimated");
    // EXACTLY one field readback per animated sample — the `getImageData` inside
    // `sampleAnimated` (the 32×32 field read). A second `getImageData` in the field
    // path is a duplicate readback (the double-cost the shared model exists to kill).
    const readbacks = (animated.match(/\bgetImageData\s*\(/g) || []).length;
    if (readbacks !== 1)
        violations.push(
            `DL2 single-readback-pass — \`sampleAnimated\` has ${readbacks} \`getImageData\` call(s); expected EXACTLY 1 (the field readback). A second readback is a duplicate sampling pass — the per-frame cost the shared-observer model exists to eliminate.`,
        );
    // the ambient-hue histogram rides the SAME pixel loop as the luminance reduce —
    // `accumulateHuePixel` sits beside `relLuminance` inside the one field-read loop.
    const luminanceInPass = /relLuminance\s*\(/.test(animated);
    const ambientRidesPass = /accumulateHuePixel\s*\(/.test(animated);
    const oneLoop = (animated.match(/\bfor\s*\(/g) || []).length === 1;
    if (!(luminanceInPass && ambientRidesPass && oneLoop))
        violations.push(
            `DL2 single-readback-pass — the ambient-hue histogram must ride the SAME pixel loop as the luminance reduce (luma=${luminanceInPass}, ambientAccumulate=${ambientRidesPass}, oneLoop=${oneLoop}). The BE.W-AMBIENT-TINT hue is a FREE rider on the ONE readback, never a second pass/canvas.`,
        );
    return {
        violations,
        facts: {
            dl2Readbacks: readbacks,
            dl2AmbientRidesPass: luminanceInPass && ambientRidesPass && oneLoop,
        },
    };
}

// ── DL3 — the honest floor (self-sample reachable, never a crash) ──────────────────
function checkDL3({ observerCode }) {
    const violations = [];
    const ssrGuard = /typeof window === "undefined"/.test(observerCode);
    const selfSample =
        /sampleStatic\s*\(/.test(observerCode) && /function sampleNow/.test(observerCode);
    if (!ssrGuard)
        violations.push(
            "DL3 honest-floor — the composable lost its SSR / no-DOM no-op guard (`typeof window === \"undefined\"`). A dock in a non-browser scope must return a safe handle, never crash.",
        );
    if (!selfSample)
        violations.push(
            "DL3 honest-floor — the composable's self-sample path (`sampleStatic` via `sampleNow`) is gone. A per-surface observer with NO shared ancestor must fall back to its own single sample (the honest floor).",
        );
    return {
        violations,
        facts: { dl3SsrGuard: ssrGuard, dl3SelfSample: selfSample },
    };
}

// ── self-test — each planted defect MUST flag ──────────────────────────────────────
function selfTest() {
    const errors = [];

    // DL1c bite — a composable WITHOUT the coverage stand-down MUST flag.
    const b1 = checkDL1({
        observerCode:
            'const GLASS_BACKDROP_SHARED_ATTR = "data-glass-backdrop-shared";\nfunction f(o: {shared?: boolean}) { el.setAttribute(GLASS_BACKDROP_SHARED_ATTR, ""); }',
        glassDockCode: "useGlassBackdropLuminance(dockEl, { backgroundCanvas });",
        dockStageCode: "useGlassBackdropLuminance(stageEl, { shared: true });",
    });
    if (!b1.violations.some((v) => v.includes("DL1(c)") && /closest/.test(v)))
        errors.push(
            "DL1c self-test BROKE — a composable WITHOUT the `.closest(marker)` coverage stand-down was NOT flagged",
        );

    // DL1a bite — a DockStage WITHOUT `shared: true` MUST flag.
    const b2 = checkDL1({
        observerCode:
            'const GLASS_BACKDROP_SHARED_ATTR = "data-glass-backdrop-shared";\nfunction f(o: {shared?: boolean}) { el.closest("[data-glass-backdrop-shared]"); el.setAttribute(GLASS_BACKDROP_SHARED_ATTR, ""); }',
        glassDockCode: "useGlassBackdropLuminance(dockEl, { backgroundCanvas });",
        dockStageCode: "useGlassBackdropLuminance(stageEl, { backgroundCanvas });",
    });
    if (!b2.violations.some((v) => v.includes("DL1(a)")))
        errors.push(
            "DL1a self-test BROKE — a DockStage WITHOUT `shared: true` was NOT flagged",
        );

    // DL2 bite — a `sampleAnimated` with a SECOND `getImageData` MUST flag.
    const b3 = checkDL2({
        samplerCode:
            "function sampleAnimated(el, source, ctx) {\n  const data = ctx.getImageData(0,0,32,32).data;\n  const extra = ctx.getImageData(0,0,32,32).data;\n  for (let i=0;i<data.length;i+=4) { relLuminance(1,1,1); accumulateHuePixel(h,1,1,1,1); }\n  return null;\n}",
    });
    if (!b3.violations.some((v) => v.startsWith("DL2")))
        errors.push(
            "DL2 self-test BROKE — a `sampleAnimated` with a SECOND `getImageData` (double readback) was NOT flagged",
        );

    return { ok: errors.length === 0, errors };
}

function run() {
    const observerCode = stripJs(readRel(PATHS.OBSERVER));
    const samplerCode = stripJs(readRel(PATHS.SAMPLER));
    const glassDockCode = stripVue(readRel(PATHS.GLASS_DOCK));
    const dockStageCode = stripVue(readRel(PATHS.DOCK_STAGE));

    const dl1 = checkDL1({ observerCode, glassDockCode, dockStageCode });
    const dl2 = checkDL2({ samplerCode });
    const dl3 = checkDL3({ observerCode });
    const self = selfTest();

    const violations = [
        ...dl1.violations,
        ...dl2.violations,
        ...dl3.violations,
        ...self.errors,
    ];
    const facts = {
        ...dl1.facts,
        ...dl2.facts,
        ...dl3.facts,
        selfTest: self.ok,
    };
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(PATHS.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        note:
            "BI.W-DOCK-LUMA-SHARE — 12 per-dock backdrop-luminance observers → ONE shared per-route observer (PERF-6/FAM-5). DL1 one-shared-observer + dock stand-down · DL2 single-readback-pass (ambient hue a free rider) · DL3 honest-floor. The readback-COUNT PAINT (ONE witness/route, shared luma, AA un-regressed) is the LOCAL π tests-visual/dock-luma-share.spec.ts (W-PI-IN-CLOSE + proof:ba-gestalt dock verdict).",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log(
        "proof:dock-luma-share — 12 per-dock observers → ONE shared per-route observer (BI.W-DOCK-LUMA-SHARE)",
    );
    console.log(
        `  DL1 one-shared-observer  : stageShared=${facts.dl1StageShared} dockSurface=${facts.dl1DockSurface} marker=${facts.dl1MarkerDeclared} stamp=${facts.dl1StampsMarker} standDown=${facts.dl1CoverageStandDown} ${ok(dl1.violations.length === 0)}`,
    );
    console.log(
        `  DL2 single-readback-pass : readbacks=${facts.dl2Readbacks} ambientRidesPass=${facts.dl2AmbientRidesPass} ${ok(dl2.violations.length === 0)}`,
    );
    console.log(
        `  DL3 honest-floor         : ssrGuard=${facts.dl3SsrGuard} selfSample=${facts.dl3SelfSample} ${ok(dl3.violations.length === 0)}`,
    );
    console.log(`  self-test (bite proof)   : ${ok(self.ok)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${relative(PATHS.ROOT, PATHS.ARTIFACT)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { checkDL1, checkDL2, checkDL3, selfTest };
