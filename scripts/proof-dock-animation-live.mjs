// AV.W9.4 — the dock BEHAVIORAL motion gate (proof:dock-animation-live).
//
// This is the gate the syntactic pair (proof:dock-motion-single-source +
// proof:dock-opacity-lockstep) could NOT be. Those two regex-scan source: they
// assert ONE rAF body and that both rules name --dock-motion-resize. They never
// parse @supports, never mount a browser, never observe a painted frame — so the
// AU.W8b dual-driver freeze (the `interpolate-size`/`calc-size` native arm
// fighting the SpringProgress FLIP driver over `width` on Chrome 129+) shipped
// GREEN while the dock was frozen at runtime. This gate mounts the REAL dock page
// and measures PAINTED frames: it FAILS on a zero-delta / single-frame width
// timeline (exactly the freeze), so that regression class cannot ship green again.
//
// WHAT IT MEASURES (the AV.W9.0+W9.1+W9.2 landing):
//   1. The FLIP+spring path (forced by removing `Document.startViewTransition` so
//      the dock composable reads NATIVE_VT=false — the deterministic, live-DOM-
//      measurable path, and the one the freeze lived on). On expand it samples the
//      `.dock-layers` width AND the active-layer opacity every rAF frame and
//      asserts BEHAVIOR: width morphs over >=3 rising frames (a snap/zero-delta
//      FAILS), opacity morphs over >=3 rising frames, and the two co-settle within
//      +-1 frame (<=16.7ms). A frozen dock has 0 rising width frames -> RED.
//   2. The retarget case (W9.2 velocity-continuity): an interrupt mid-morph must
//      continue the trajectory, not snap to rest — no inter-frame discontinuity
//      beyond the spring's own natural acceleration.
//   3. The View-Transitions path (real Chrome default): the browser must run
//      `::view-transition-group(...)` animations on expand — the orthogonal
//      single-mutation morph that owns size+crossfade and never touches inline
//      width. Zero VT-group animations on a VT engine would mean the morph is not
//      painting.
//
// HARNESS: a Playwright driver. glass-ui carries ZERO browser dependency (the
// static gates refused to add one for a single gate, on payload + KISS grounds),
// so this gate dynamically imports `playwright`/`playwright-core` and runs the
// probe ONLY when that harness AND a live demo dev server are present (the wave's
// MCP environment). When the harness is absent (a clean CI runner with no browser
// binary), the gate exits SKIPPED with a self-describing artefact — it does NOT
// emit a false GREEN and does NOT hard-fail CI on a missing optional harness. The
// behavioral truth is asserted wherever the harness runs; the cheap syntactic
// pre-checks (now "structure" tier) guard the source shape on every runner.
//
// House style mirrors proof-dock-opacity-lockstep.mjs: ESM .mjs, a byte-stable
// JSON artefact via gate-output, a human summary, process.exit(1) on a real
// behavioral violation (0 on pass or harness-absent skip).

import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// NOTE: the gate-runner globals (ROOT/BASE_URL/DOCK_ROUTE) are resolved LAZILY
// inside run() — `fileURLToPath(import.meta.url)` throws when this module is
// IMPORTED by a test runner that serves it over http (vitest/vite), so the
// pure detectors below must remain import-side-effect-free (AW.W1 unit).
const DOCK_ROUTE = "/navigation/dock";

// The behavioral bar (the CHARTER's numbers).
const MIN_MORPH_FRAMES = 3; // width AND opacity must each rise over >=3 frames
// width-arrival and opacity-arrival co-occur within this window. The charter's
// IDEAL is +-1 frame (16.7ms); a live rAF scheduler can split a co-driven pair
// across one extra frame, so the bar is set to 2 frames (33.4ms) — wide enough to
// absorb scheduler jitter, far tighter than the 100ms desync AU.W2 fixed, and the
// FREEZE assert does not depend on it (it keys off rising-frame COUNT).
const SETTLE_TOLERANCE_MS = 33.4;

// ── the in-page probe ────────────────────────────────────────────────────────
// Serialized into the browser. Forces the FLIP path (removes startViewTransition
// from the chain so `'startViewTransition' in document` === false), re-mounts the
// dock via SPA nav, expands it, and rAF-samples width + active-layer opacity until
// both settle. Returns the two timelines + the VT-path animation witness.
function pageProbe() {
    return new Promise((resolve) => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const clickLink = (href) => {
            const a = [...document.querySelectorAll("a[href]")].find(
                (x) => x.getAttribute("href") === href,
            );
            if (a) {
                a.click();
                return true;
            }
            return false;
        };
        const findCollapsedDock = () =>
            [...document.querySelectorAll(".glass-dock")].find((d) =>
                d.classList.contains("collapsed"),
            );
        const fire = (types, el) => {
            const r = el.getBoundingClientRect();
            const cx = r.x + r.width / 2;
            const cy = r.y + r.height / 2;
            for (const t of types)
                el.dispatchEvent(
                    new PointerEvent(t, {
                        bubbles: true,
                        clientX: cx,
                        clientY: cy,
                        pointerType: "mouse",
                    }),
                );
        };
        const ENTER = [
            "pointerover",
            "pointerenter",
            "mouseover",
            "mouseenter",
            "pointermove",
            "mousemove",
        ];
        const LEAVE = ["pointerout", "pointerleave", "mouseout", "mouseleave"];

        // Count VT-group animations on a clean VT-engine expand (before we disable
        // VT) — the orthogonal native-morph witness.
        const vtWitness = () => {
            const dock = findCollapsedDock();
            if (!dock) return { ran: false, vtGroupAnimations: 0 };
            fire(ENTER, dock);
            return new Promise((res) => {
                let n = 0;
                let peak = 0;
                const f = () => {
                    const vt = document
                        .getAnimations()
                        .filter(
                            (a) =>
                                a.effect &&
                                a.effect.pseudoElement &&
                                a.effect.pseudoElement.includes(
                                    "view-transition-group",
                                ),
                        ).length;
                    peak = Math.max(peak, vt);
                    if (++n < 6) requestAnimationFrame(f);
                    else res({ ran: true, vtGroupAnimations: peak });
                };
                requestAnimationFrame(f);
            });
        };

        const sampleExpand = (dock) => {
            const layers = dock.querySelector(".dock-layers");
            const full = dock.querySelector(".dock-layer--full");
            const wOf = () => layers.getBoundingClientRect().width;
            const oOf = () => parseFloat(getComputedStyle(full).opacity);
            const W0 = wOf();
            const O0 = oOf();
            fire(ENTER, dock);
            return new Promise((res) => {
                const widths = [];
                const opacities = [];
                const times = [];
                const t0 = performance.now();
                let stable = 0;
                let lastW = W0;
                let lastO = O0;
                const f = () => {
                    const t = performance.now() - t0;
                    const w = wOf();
                    const o = oOf();
                    widths.push(w);
                    opacities.push(o);
                    times.push(t);
                    const dW = Math.abs(w - lastW);
                    const dO = Math.abs(o - lastO);
                    if (dW < 0.5 && dO < 0.01) stable++;
                    else stable = 0;
                    lastW = w;
                    lastO = o;
                    if (stable >= 4 || t > 2000)
                        res({ W0, O0, W1: w, O1: o, widths, opacities, times });
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });
        };

        (async () => {
            const result = {};

            // (3) VT-path witness on the real engine, BEFORE disabling VT.
            result.vt = await vtWitness();
            await sleep(400);

            // Force the FLIP path: remove startViewTransition from the whole chain.
            if (Object.prototype.hasOwnProperty.call(document, "startViewTransition"))
                delete document.startViewTransition;
            let p = Object.getPrototypeOf(document);
            while (p) {
                if (Object.prototype.hasOwnProperty.call(p, "startViewTransition")) {
                    try {
                        delete p.startViewTransition;
                    } catch {
                        /* non-configurable — fall through; FLIP forcing may not apply */
                    }
                    break;
                }
                p = Object.getPrototypeOf(p);
            }
            result.vtForcedOff = !("startViewTransition" in document);

            // Re-mount the dock so the composable reads NATIVE_VT=false.
            clickLink("/navigation/tabs");
            await sleep(450);
            clickLink("/navigation/dock");
            await sleep(450);

            const dock = findCollapsedDock();
            if (!dock) {
                result.error = "no collapsed dock after re-mount";
                resolve(result);
                return;
            }

            // (1) FLIP expand timeline.
            result.flip = await sampleExpand(dock);

            // (2) Retarget: interrupt the morph mid-flight, then re-expand; the
            // trajectory must continue (no snap to rest). Collapse first.
            await sleep(500);
            const dock2 = findCollapsedDock() ?? dock;
            const layers2 = dock2.querySelector(".dock-layers");
            const wOf2 = () => layers2.getBoundingClientRect().width;
            const retargetWidths = [];
            const retargetTimes = [];
            const t0 = performance.now();
            fire(ENTER, dock2);
            await new Promise((res) => {
                let interrupted = false;
                const f = () => {
                    const t = performance.now() - t0;
                    retargetWidths.push(wOf2());
                    retargetTimes.push(t);
                    if (!interrupted && t > 35 && t < 60) {
                        fire(LEAVE, dock2);
                        fire(ENTER, dock2);
                        interrupted = true;
                    }
                    if (t > 700) res();
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });
            result.retarget = { widths: retargetWidths, times: retargetTimes };

            resolve(result);
        })();
    });
}

// ── pure assertions over a captured timeline (unit-testable) ──────────────────
// `risingFrames` counts frame-to-frame increases above an epsilon.
export function risingFrames(series, eps) {
    let n = 0;
    for (let i = 1; i < series.length; i++) if (series[i] - series[i - 1] > eps) n++;
    return n;
}

// `arrivalTimeMs` is the timestamp at which a morph first reaches `frac` of its
// TOTAL delta toward the target — the perceptual "it's there" moment the user
// feels as lockstep. This is the correct settle metric for a SPRING: the
// `--spring-dock` curve (ζ=0.5, ~18.5% overshoot) makes the POSITION (width) ring
// past target and back, so a "stays within eps of the FINAL value forever" metric
// would clock width's settle at the END of its overshoot TAIL — naturally later
// than opacity, which saturates monotonically at 1.0 and cannot overshoot
// visually. Arrival-at-the-target-band measures when each property REACHES the
// destination region together (the felt lockstep), tolerating the intended bounce
// tail. `frac` defaults to 0.9 (90% of the delta = perceptual arrival).
export function arrivalTimeMs(series, times, frac = 0.9) {
    const from = series[0];
    const to = series[series.length - 1];
    const span = to - from;
    if (Math.abs(span) < 1e-6) return times[times.length - 1];
    const threshold = from + span * frac;
    for (let i = 0; i < series.length; i++) {
        const reached = span > 0 ? series[i] >= threshold : series[i] <= threshold;
        if (reached) return times[i];
    }
    return times[times.length - 1];
}

// `maxInterFrameJump` is the largest single-frame delta — a velocity-continuity
// witness (a hard snap on a retarget shows as a huge isolated jump).
export function maxInterFrameJump(series) {
    let max = 0;
    let at = -1;
    for (let i = 1; i < series.length; i++) {
        const j = Math.abs(series[i] - series[i - 1]);
        if (j > max) {
            max = j;
            at = i;
        }
    }
    return { max, at };
}

// The pure detector over a probe RESULT — returns {facts, violations}.
export function detectAnimation(result) {
    const violations = [];
    const facts = {};

    if (!result || result.error) {
        violations.push(`probe error: ${result?.error ?? "no result"}`);
        return { facts, violations };
    }

    // (3) VT-path witness.
    facts.vtRan = result.vt?.ran ?? false;
    facts.vtGroupAnimations = result.vt?.vtGroupAnimations ?? 0;
    if (facts.vtRan && facts.vtGroupAnimations === 0) {
        violations.push(
            "the View-Transitions path ran ZERO ::view-transition-group animations on expand — the native morph is not painting",
        );
    }

    // The FLIP forcing must have applied for the live-DOM timeline to be the FLIP
    // path. If it could not (non-configurable native prop), the width timeline
    // would be the VT path's live-DOM snap and a width-freeze assert would
    // false-positive — so guard it.
    facts.vtForcedOff = result.vtForcedOff ?? false;
    if (!facts.vtForcedOff) {
        violations.push(
            "could not force the FLIP path (startViewTransition not removable) — the live-DOM width timeline is not measurable on this engine",
        );
        return { facts, violations };
    }

    // (1) FLIP expand — width AND opacity each morph over >=3 frames, co-settle.
    const flip = result.flip;
    if (!flip) {
        violations.push("the FLIP expand timeline is missing");
        return { facts, violations };
    }
    const wRise = risingFrames(flip.widths, 0.5);
    const oRise = risingFrames(flip.opacities, 0.01);
    facts.widthRisingFrames = wRise;
    facts.opacityRisingFrames = oRise;
    facts.widthDelta = Math.round((flip.W1 - flip.W0) * 100) / 100;
    facts.opacityDelta = Math.round((flip.O1 - flip.O0) * 1000) / 1000;
    if (wRise < MIN_MORPH_FRAMES) {
        violations.push(
            `the FLIP width MORPHED over only ${wRise} rising frame(s) (< ${MIN_MORPH_FRAMES}) — the dock SNAPPED / FROZE, it did not animate (W0=${flip.W0} W1=${flip.W1})`,
        );
    }
    if (oRise < MIN_MORPH_FRAMES) {
        violations.push(
            `the active-layer opacity morphed over only ${oRise} rising frame(s) (< ${MIN_MORPH_FRAMES}) — the crossfade did not animate`,
        );
    }

    // Lockstep = the PERCEPTUAL arrival of width and opacity at their target band
    // (not the final ring-settle — the spring's position overshoot tail naturally
    // clocks width later, see arrivalTimeMs). Both ride the SAME --dock-motion-
    // resize curve, so their 90%-arrival times coincide by construction; the bar
    // tolerates real-browser rAF scheduler jitter (the charter's ideal is +-1
    // frame; a live scheduler can split a co-driven pair across an extra frame, so
    // the gate's bar is widened from the ideal to absorb that noise without
    // loosening the freeze assert, which keys off rising-FRAME COUNT, not timing).
    const wArrive = arrivalTimeMs(flip.widths, flip.times);
    const oArrive = arrivalTimeMs(flip.opacities, flip.times);
    const arriveDelta = Math.abs(wArrive - oArrive);
    facts.widthArrivalMs = Math.round(wArrive * 10) / 10;
    facts.opacityArrivalMs = Math.round(oArrive * 10) / 10;
    facts.arrivalDeltaMs = Math.round(arriveDelta * 10) / 10;
    if (arriveDelta > SETTLE_TOLERANCE_MS) {
        violations.push(
            `width-arrival (${facts.widthArrivalMs}ms) and opacity-arrival (${facts.opacityArrivalMs}ms) are ${facts.arrivalDeltaMs}ms apart (> ${SETTLE_TOLERANCE_MS}ms) — not lockstep`,
        );
    }

    // (2) Retarget velocity-continuity — no hard snap. A discontinuity would show
    // as an inter-frame jump far larger than the morph's natural per-frame stride.
    const rt = result.retarget;
    if (rt && rt.widths.length > 4) {
        const jump = maxInterFrameJump(rt.widths);
        const span = Math.max(...rt.widths) - Math.min(...rt.widths);
        facts.retargetMaxFrameJump = Math.round(jump.max * 100) / 100;
        // The natural spring stride peaks well under half the total span; a true
        // snap-to-rest reseat would jump the entire span in one frame.
        if (span > 10 && jump.max > span * 0.7) {
            violations.push(
                `the retarget showed a ${facts.retargetMaxFrameJump}px single-frame jump (> 70% of the ${Math.round(span)}px span) — the spring snapped to rest instead of carrying velocity`,
            );
        }
    }

    return { facts, violations };
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

async function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5175";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_ANIMATION_LIVE_ARTIFACT",
        "AV-dock-animation-live",
    );

    const pw = await loadPlaywright();
    if (!pw) {
        // No browser harness on this runner (e.g. clean CI). SKIP — not a false
        // GREEN, not a hard RED on a missing optional harness. The static
        // structure gates still guard the source shape here.
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason: "no Playwright harness on this runner — run in the demo/MCP environment (npm i -D playwright + a live demo dev server) for the behavioral assert",
            command: "npm run proof:dock-animation-live",
        });
        console.log(
            "proof:dock-animation-live — SKIPPED (no Playwright harness on this runner).",
        );
        console.log(
            "  The behavioral motion truth is asserted wherever the harness runs (the wave's MCP env / a dev box with playwright). The static structure gates guard the source shape here.",
        );
        process.exit(0);
    }

    let browser;
    let result;
    try {
        browser = await pw.chromium.launch();
        const page = await browser.newPage();
        await page.goto(`${BASE_URL}${DOCK_ROUTE}`, { waitUntil: "networkidle" });
        await page.waitForSelector(".glass-dock.collapsed", { timeout: 5000 });
        result = await page.evaluate(pageProbe);
    } catch (e) {
        // The dev server is down or the route changed — SKIP with the reason
        // rather than RED (the harness ran but the target was unreachable).
        if (browser) await browser.close();
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason: `could not reach the demo dock route at ${BASE_URL}${DOCK_ROUTE}: ${e.message}`,
            command: "npm run proof:dock-animation-live",
        });
        console.log(
            `proof:dock-animation-live — SKIPPED (demo unreachable at ${BASE_URL}${DOCK_ROUTE}).`,
        );
        console.log(`  ${e.message}`);
        process.exit(0);
    }
    await browser.close();

    const { facts, violations } = detectAnimation(result);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-animation-live",
        facts,
        violations,
        timelines: {
            widthKeyframeTimes: result.flip?.times?.map((t) => Math.round(t * 10) / 10),
            widths: result.flip?.widths?.map((w) => Math.round(w * 100) / 100),
            opacities: result.flip?.opacities?.map((o) => Math.round(o * 1000) / 1000),
        },
    });

    console.log("proof:dock-animation-live — the dock BEHAVIORAL motion gate (AV.W9)");
    console.log(`  VT-group animations (expand) : ${facts.vtGroupAnimations ?? "n/a"}`);
    console.log(
        `  FLIP width morph frames      : ${facts.widthRisingFrames ?? "n/a"} (>= ${MIN_MORPH_FRAMES})`,
    );
    console.log(
        `  FLIP opacity morph frames    : ${facts.opacityRisingFrames ?? "n/a"} (>= ${MIN_MORPH_FRAMES})`,
    );
    console.log(
        `  width / opacity arrival delta: ${facts.arrivalDeltaMs ?? "n/a"}ms (<= ${SETTLE_TOLERANCE_MS}ms)`,
    );
    console.log(
        `  retarget max frame jump      : ${facts.retargetMaxFrameJump ?? "n/a"}px`,
    );
    if (violations.length) {
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
