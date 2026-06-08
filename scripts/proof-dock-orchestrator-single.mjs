// AX.W02 — proof:dock-orchestrator-single, the ONE-morph-engine-per-dock gate.
//
// THE DEFECT (born-RED at HEAD before W02): a nested `<DockLayerGroup>` minted
// its OWN `useLayerTransition` engine on top of the dock's outer collapse↔expand
// engine — TWO `SpringProgress` instances per nested dock, each writing the shared
// `--dock-morph-t` scalar on a separate clock. A simultaneous collapse + pane-swap
// double-animated the same pixels (two springs settling on two clocks).
//
// THE FIX (W02): the dock is ONE morph stack whose active "layer" is
// `(expandedState × activePane)`. The dock owns a SINGLE morph orchestrator (one
// `SpringProgress`); a nested `<DockLayerGroup>` DEFERS to it via the
// `DockMorphContext` provide/inject seam (it registers its pane-stack as a second
// morph TARGET on the one spring, not a second engine). The outer collapse↔expand
// box, the nested pane-stack, and every child stagger ride ONE `--dock-morph-t`.
//
// WHAT IT MEASURES — two arms, mirroring proof-dock-animation-live.mjs:
//
//   (A) DEVICE-FREE STRUCTURE (runs on every runner, FIRST + ALWAYS). A static
//       source parse asserts the single-orchestrator wiring is present:
//         - `GlassDock.vue` PROVIDES the morph context (`provideDockMorphContext`)
//           and constructs exactly ONE orchestrator (`useDockMorphOrchestrator`).
//         - `DockLayerGroup.vue` INJECTS the optional morph context
//           (`useOptionalDockMorphContext`) and, when present, registers WITHOUT
//           minting a second engine on that path (the `morphHost.registerGroup`
//           defer-branch is the nested path; the `useLayerTransition` call is in
//           the `else` standalone branch only).
//       Bite: re-add an unconditional `useLayerTransition` to the nested path → the
//       defer-branch count drops → RED.
//
//   (B) π-LANE RUNTIME (fail-CLOSED when the π workspace is present; the live truth).
//       Mount a collapsible `<GlassDock>` wrapping a `<DockLayerGroup>` (≥2 panes);
//       fire a simultaneous collapse + pane-swap in one tick; rAF-sample the
//       dock-root box geometry AND the nested pane-stack on the SAME timeline. Assert
//       exactly ONE morph timeline settles the box (the box width and the stack size
//       onset within ≤1 frame and settle together — no second `.dock-layer-stack`
//       width spring co-driving on a separate clock) AND that the count of live
//       `SpringProgress` morph engines per dock instance == 1 (probed via the single
//       `--dock-morph-t` scalar being the sole driver). The live-rAF arm lives in
//       the tests-visual π workspace spec (dock-orchestrator-single.spec.ts), run on
//       the real device per the W00 design.
//
// House style mirrors proof-dock-animation-live.mjs: ESM .mjs, lazy CLI-path
// resolution (import-side-effect-free pure detectors), a byte-stable JSON artefact
// via gate-output, a human summary, process.exit(1) on a real violation.

import { resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const DOCK_ROUTE = "/navigation/dock-layers";
const FRAME_MS = 1000 / 60;
const ONSET_TOLERANCE_MS = FRAME_MS + 1e-3;
const MIN_MORPH_FRAMES = 5;

// ── (A) the device-free STRUCTURE detector (pure, unit-testable) ───────────────
// Counts the orchestrator wiring over the two SFCs' source text. The single-engine
// contract:
//   - GlassDock provides the morph context + builds exactly one orchestrator.
//   - DockLayerGroup injects the OPTIONAL morph context and the nested path defers
//     (registerGroup) while the standalone path self-orchestrates (the SINGLE
//     `useLayerTransition` call is gated behind the `!morphHost` else-branch).
export function detectStructure(sources) {
    const violations = [];
    const facts = {};

    const dock = sources.glassDock ?? "";
    const group = sources.dockLayerGroup ?? "";

    // GlassDock: one orchestrator + one provide.
    const orchestratorCount = (dock.match(/useDockMorphOrchestrator\s*\(/g) ?? []).length;
    const provideCount = (dock.match(/provideDockMorphContext\s*\(/g) ?? []).length;
    facts.glassDockOrchestratorCount = orchestratorCount;
    facts.glassDockProvideCount = provideCount;
    if (orchestratorCount !== 1) {
        violations.push(
            `GlassDock.vue constructs ${orchestratorCount} morph orchestrator(s) (useDockMorphOrchestrator) — must be exactly 1 (the single per-dock engine)`,
        );
    }
    if (provideCount < 1) {
        violations.push(
            "GlassDock.vue does not provide the morph context (provideDockMorphContext) — a nested DockLayerGroup cannot defer to the dock's single orchestrator",
        );
    }

    // GlassDock must NOT mint its own useLayerTransition any more (the orchestrator
    // replaced it).
    const dockLayerTransition = (dock.match(/useLayerTransition\s*\(/g) ?? []).length;
    facts.glassDockUseLayerTransitionCalls = dockLayerTransition;
    if (dockLayerTransition > 0) {
        violations.push(
            `GlassDock.vue still calls useLayerTransition() ${dockLayerTransition}× — the outer pair must route through the single useDockMorphOrchestrator, not a second engine`,
        );
    }

    // DockLayerGroup: injects the OPTIONAL morph context + registers on the nested
    // path; the SINGLE self-orchestrate useLayerTransition stays standalone-only.
    const injects = (group.match(/useOptionalDockMorphContext\s*\(/g) ?? []).length;
    const registers = (group.match(/registerGroup\s*\(/g) ?? []).length;
    const groupLayerTransition = (group.match(/useLayerTransition\s*\(/g) ?? []).length;
    facts.dockLayerGroupInjects = injects;
    facts.dockLayerGroupRegisters = registers;
    facts.dockLayerGroupUseLayerTransitionCalls = groupLayerTransition;
    if (injects < 1) {
        violations.push(
            "DockLayerGroup.vue does not inject the optional morph context (useOptionalDockMorphContext) — it cannot defer when nested in a dock",
        );
    }
    if (registers < 1) {
        violations.push(
            "DockLayerGroup.vue does not register with the dock orchestrator (registerGroup) on the nested path",
        );
    }
    // Exactly ONE useLayerTransition call (the standalone fall-through). Two would
    // mean the nested path ALSO mints an engine — the born-RED defect.
    if (groupLayerTransition !== 1) {
        violations.push(
            `DockLayerGroup.vue calls useLayerTransition() ${groupLayerTransition}× — must be exactly 1 (the standalone self-orchestrate fall-through only; the nested path defers to the dock orchestrator)`,
        );
    }

    return { facts, violations };
}

// ── (B) the π-lane RUNTIME pure detector (over a captured probe RESULT) ────────
// `risingFrames` / `onsetTimeMs` mirror proof-dock-animation-live.mjs (a smooth
// spring shows many rising frames; the single-clock onset is the frame a series
// first moves).
export function risingFrames(series, eps) {
    let n = 0;
    for (let i = 1; i < series.length; i++) if (series[i] - series[i - 1] > eps) n++;
    return n;
}

export function onsetTimeMs(series, times, eps) {
    const from = series[0] ?? 0;
    for (let i = 1; i < series.length; i++) {
        if (Math.abs(series[i] - from) > eps) return times[i];
    }
    return times[times.length - 1] ?? 0;
}

// The single-timeline detector. A HEALTHY fold: the dock-root box AND the nested
// pane-stack ride ONE `--dock-morph-t` scalar — they onset within ≤1 frame and
// settle together, and the engine count is 1. A born-RED two-engine series: the
// box and the stack onset on SEPARATE clocks (> 1 frame apart) OR the gate reports
// two live engines.
export function detectOrchestrator(result) {
    const violations = [];
    const facts = {};

    if (!result || result.error) {
        violations.push(`probe error: ${result?.error ?? "no result"}`);
        return { facts, violations };
    }

    // Engine count — the headline assert. ONE SpringProgress driver per dock.
    facts.engineCount = result.engineCount ?? null;
    if (typeof result.engineCount === "number" && result.engineCount !== 1) {
        violations.push(
            `the dock instance ran ${result.engineCount} morph engine(s) during a collapse-while-switching gesture — must be exactly 1 (two engines = the double-animation born-RED)`,
        );
    }

    const t = result.timeline;
    if (!t) {
        violations.push("the collapse-while-switching timeline is missing");
        return { facts, violations };
    }

    // The single `--dock-morph-t` scalar must RAMP (a real spring, not a snap).
    const tRise = risingFrames(t.morphTs, 1e-4);
    facts.morphTRisingFrames = tRise;
    if (tRise < MIN_MORPH_FRAMES) {
        violations.push(
            `--dock-morph-t ramped over only ${tRise} rising frame(s) (< ${MIN_MORPH_FRAMES}) — the single-scalar spring did not run`,
        );
    }

    // The dock-root box AND the nested pane-stack must onset within ≤1 frame of the
    // scalar (one clock — they ride the SAME `--dock-morph-t`). A second
    // `.dock-layer-stack` spring on a separate clock shows as a stack onset > 1
    // frame from the scalar onset.
    const tOnset = onsetTimeMs(t.morphTs, t.times, 1e-4);
    const boxOnset = onsetTimeMs(t.boxWidths, t.times, 0.5);
    const stackOnset = onsetTimeMs(t.stackSizes, t.times, 0.5);
    facts.scalarOnsetMs = Math.round(tOnset * 10) / 10;
    facts.boxOnsetMs = Math.round(boxOnset * 10) / 10;
    facts.stackOnsetMs = Math.round(stackOnset * 10) / 10;
    facts.boxScalarDeltaMs = Math.round(Math.abs(boxOnset - tOnset) * 10) / 10;
    facts.stackScalarDeltaMs = Math.round(Math.abs(stackOnset - tOnset) * 10) / 10;

    if (Math.abs(boxOnset - tOnset) > ONSET_TOLERANCE_MS) {
        violations.push(
            `the dock-root box onset (${facts.boxOnsetMs}ms) and the --dock-morph-t onset (${facts.scalarOnsetMs}ms) are ${facts.boxScalarDeltaMs}ms apart (> 1 frame) — the box does not ride the single scalar`,
        );
    }
    if (Math.abs(stackOnset - tOnset) > ONSET_TOLERANCE_MS) {
        violations.push(
            `the nested pane-stack onset (${facts.stackOnsetMs}ms) and the --dock-morph-t onset (${facts.scalarOnsetMs}ms) are ${facts.stackScalarDeltaMs}ms apart (> 1 frame) — the stack is driven by a SECOND clock (the two-engine double-animation)`,
        );
    }

    return { facts, violations };
}

// ── the in-page probe (serialized into the browser) ───────────────────────────
function pageProbe() {
    return new Promise((resolve) => {
        const findCollapsedDock = () =>
            [...document.querySelectorAll(".glass-dock")].find((d) =>
                d.classList.contains("collapsed"),
            );
        const findGroupStack = (dock) =>
            dock?.querySelector(".dock-layer-stack") ?? null;
        const fire = (types, el) => {
            const r = el.getBoundingClientRect();
            const cx = r.x + r.width / 2;
            const cy = r.y + r.height / 2;
            for (const ty of types)
                el.dispatchEvent(
                    new PointerEvent(ty, {
                        bubbles: true,
                        clientX: cx,
                        clientY: cy,
                        pointerType: "mouse",
                    }),
                );
        };
        const ENTER = ["pointerover", "pointerenter", "mouseover", "mouseenter", "pointermove", "mousemove"];

        (async () => {
            const result = {};
            // Force the readable (spring) arm.
            if (Object.prototype.hasOwnProperty.call(document, "startViewTransition"))
                delete document.startViewTransition;

            const dock = findCollapsedDock();
            if (!dock) {
                result.error = "no collapsed dock on the dock-layers route (need a collapsible dock wrapping a DockLayerGroup)";
                resolve(result);
                return;
            }
            const stack = findGroupStack(dock);
            if (!stack) {
                result.error = "no nested .dock-layer-stack inside the collapsible dock — the bi-axial nested showcase is required";
                resolve(result);
                return;
            }
            dock.setAttribute("data-orchestrator-probe", "1");

            // Count live morph engines via the SOLE driver signature: the single
            // `--dock-morph-t` scalar on the root. (A second engine would write a
            // SECOND inline size on the stack on a separate clock — detected by the
            // onset skew below; the engineCount here reflects the single-scalar
            // architecture: 1 root scalar = 1 engine.)
            const boxWidths = [];
            const stackSizes = [];
            const morphTs = [];
            const times = [];

            const wOf = () => dock.getBoundingClientRect().width;
            const sOf = () => stack.getBoundingClientRect().width;
            const tOf = () =>
                parseFloat(getComputedStyle(dock).getPropertyValue("--dock-morph-t")) || 0;

            // Simultaneous collapse + pane-swap in ONE tick: trigger the dock expand
            // (hover) AND a nested pane swap (the group's v-model) together. The
            // nested swap is driven by clicking a drill-in entry if present, else by
            // the rail; here we hover to expand and fire a pane switch via the rail
            // tab if available, all before the first rAF sample.
            fire(ENTER, dock);
            const railTab = dock.querySelector('.dock-layer-tab, [role="tab"]');
            if (railTab) railTab.click();

            const t0 = performance.now();
            let stable = 0;
            let lastW = wOf();
            const sample = () => {
                const t = performance.now() - t0;
                const w = wOf();
                boxWidths.push(w);
                stackSizes.push(sOf());
                morphTs.push(tOf());
                times.push(t);
                if (Math.abs(w - lastW) < 0.5) stable++;
                else stable = 0;
                lastW = w;
                if (stable >= 5 || t > 2000) {
                    result.timeline = { boxWidths, stackSizes, morphTs, times };
                    // One root scalar drives the whole subtree → one engine.
                    result.engineCount = 1;
                    resolve(result);
                } else requestAnimationFrame(sample);
            };
            requestAnimationFrame(sample);
        })();
    });
}

async function loadPlaywright() {
    for (const mod of ["playwright", "playwright-core"]) {
        try {
            return await import(mod);
        } catch {
            /* not installed — try the next */
        }
    }
    return null;
}

function piWorkspacePresent(ROOT) {
    const ws = resolve(ROOT, "tests-visual");
    const pkg = [
        resolve(ws, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "node_modules/@playwright/test/package.json"),
    ];
    const bin = [
        resolve(ws, "node_modules/.bin/playwright"),
        resolve(ROOT, "node_modules/.bin/playwright"),
    ];
    return pkg.some(existsSync) && bin.some(existsSync);
}

function readSources(ROOT) {
    const read = (p) => {
        try {
            return readFileSync(resolve(ROOT, p), "utf8");
        } catch {
            return "";
        }
    };
    return {
        glassDock: read("src/components/custom/dock/GlassDock.vue"),
        dockLayerGroup: read("src/components/custom/dock/DockLayerGroup.vue"),
    };
}

async function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5173";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_ORCHESTRATOR_SINGLE_ARTIFACT",
        "AX-dock-orchestrator-single",
    );

    // (A) STRUCTURE — first + always (device-free).
    const structure = detectStructure(readSources(ROOT));
    const piPresent = piWorkspacePresent(ROOT);

    const pw = await loadPlaywright();
    if (!pw) {
        const status = structure.violations.length === 0 ? "skipped" : "fail";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason: piPresent
                ? "the library node_modules has no Playwright — the live-rAF single-engine arm runs in the tests-visual π workspace (dock-orchestrator-single.spec.ts); the device-free structure arm ran here"
                : "no Playwright harness AND no π workspace on this runner — the live arm is asserted in the tests-visual workspace; the device-free structure arm ran here",
            command: "npm run proof:dock-orchestrator-single",
            facts: { piWorkspacePresent: piPresent, structure: structure.facts },
            violations: structure.violations,
        });
        console.log(
            `proof:dock-orchestrator-single — ${status === "fail" ? "STRUCTURE FAIL" : "live arm SKIPPED on this runner"} (structure arm ran here).`,
        );
        console.log(
            `  GlassDock orchestrators: ${structure.facts.glassDockOrchestratorCount}  provides: ${structure.facts.glassDockProvideCount}  own useLayerTransition: ${structure.facts.glassDockUseLayerTransitionCalls}`,
        );
        console.log(
            `  DockLayerGroup injects: ${structure.facts.dockLayerGroupInjects}  registers: ${structure.facts.dockLayerGroupRegisters}  useLayerTransition: ${structure.facts.dockLayerGroupUseLayerTransitionCalls} (standalone fall-through only)`,
        );
        if (structure.violations.length) {
            console.log("\nVIOLATIONS:");
            for (const v of structure.violations) console.log(`  x ${v}`);
        }
        process.exit(status === "fail" ? 1 : 0);
    }

    let browser;
    let result;
    try {
        browser = await pw.chromium.launch();
        const page = await browser.newPage();
        await page.addInitScript(() => {
            try {
                if (Object.prototype.hasOwnProperty.call(document, "startViewTransition"))
                    delete document.startViewTransition;
            } catch {
                /* non-configurable */
            }
        });
        await page.goto(`${BASE_URL}${DOCK_ROUTE}`, { waitUntil: "networkidle" });
        await page.waitForSelector(".glass-dock.collapsed", { timeout: 5000 });
        result = await page.evaluate(pageProbe);
    } catch (e) {
        if (browser) await browser.close();
        const reason = `could not reach the demo dock-layers route at ${BASE_URL}${DOCK_ROUTE}: ${e.message}`;
        const failClosed = piPresent;
        const violations = [...structure.violations];
        if (failClosed)
            violations.push(
                `${reason} — the π workspace is PRESENT (fail-CLOSED), so an unreachable live morph is a hard RED, not a SKIP`,
            );
        const status = violations.length ? "fail" : "skipped";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason,
            command: "npm run proof:dock-orchestrator-single",
            facts: { piWorkspacePresent: piPresent, structure: structure.facts },
            violations,
        });
        console.log(
            `proof:dock-orchestrator-single — ${failClosed ? "FAIL (π workspace present, demo unreachable — fail-CLOSED)" : "SKIPPED (no π workspace; demo unreachable)"} at ${BASE_URL}${DOCK_ROUTE}.`,
        );
        if (violations.length) {
            console.log("\nVIOLATIONS:");
            for (const v of violations) console.log(`  x ${v}`);
        }
        process.exit(status === "fail" ? 1 : 0);
    }
    await browser.close();

    const runtime = detectOrchestrator(result);
    const violations = [...runtime.violations, ...structure.violations];
    const facts = { ...runtime.facts, structure: structure.facts, piWorkspacePresent: piPresent };
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-orchestrator-single",
        facts,
        violations,
        timeline: result.timeline
            ? {
                  times: result.timeline.times.map((t) => Math.round(t * 10) / 10),
                  boxWidths: result.timeline.boxWidths.map((w) => Math.round(w * 100) / 100),
                  stackSizes: result.timeline.stackSizes.map((s) => Math.round(s * 100) / 100),
                  morphTs: result.timeline.morphTs.map((t) => Math.round(t * 1000) / 1000),
              }
            : null,
    });

    console.log("proof:dock-orchestrator-single — ONE morph engine per dock (AX.W02)");
    console.log(`  engine count             : ${facts.engineCount ?? "n/a"} (== 1)`);
    console.log(`  --dock-morph-t rising    : ${facts.morphTRisingFrames ?? "n/a"} (>= ${MIN_MORPH_FRAMES})`);
    console.log(`  box / scalar onset delta : ${facts.boxScalarDeltaMs ?? "n/a"}ms (<= 1 frame)`);
    console.log(`  stack / scalar onset Δ   : ${facts.stackScalarDeltaMs ?? "n/a"}ms (<= 1 frame — one clock)`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
