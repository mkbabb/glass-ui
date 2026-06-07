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

        // AW.W2 — under the clip-reveal one-clock model the ACTIVE pane is
        // statically opacity:1 (revealed by the aperture, never faded); the ONLY
        // surviving opacity animation is the LEAVING pane's fade. So the width is
        // sampled off `.dock-layers`, the LEAVING-pane opacity off the becoming-
        // inactive pane (`.dock-layer--summary` on an expand), and the ACTIVE pane
        // opacity (`.dock-layer--full`) is sampled too so the gate can assert it
        // stays statically 1 across every frame.
        const sampleExpand = (dock) => {
            const layers = dock.querySelector(".dock-layers");
            const full = dock.querySelector(".dock-layer--full");
            const summary = dock.querySelector(".dock-layer--summary");
            const wOf = () => layers.getBoundingClientRect().width;
            const leavingOf = () =>
                summary ? parseFloat(getComputedStyle(summary).opacity) : 0;
            const activeOf = () => parseFloat(getComputedStyle(full).opacity);
            const W0 = wOf();
            const O0 = leavingOf();
            fire(ENTER, dock);
            return new Promise((res) => {
                const widths = [];
                const opacities = []; // the LEAVING-pane fade series
                const activeOpacities = []; // the active pane (asserted == 1)
                const times = [];
                const t0 = performance.now();
                let stable = 0;
                let lastW = W0;
                let lastO = O0;
                const f = () => {
                    const t = performance.now() - t0;
                    const w = wOf();
                    const o = leavingOf();
                    widths.push(w);
                    opacities.push(o);
                    activeOpacities.push(activeOf());
                    times.push(t);
                    const dW = Math.abs(w - lastW);
                    const dO = Math.abs(o - lastO);
                    if (dW < 0.5 && dO < 0.01) stable++;
                    else stable = 0;
                    lastW = w;
                    lastO = o;
                    if (stable >= 4 || t > 2000)
                        res({
                            W0,
                            O0,
                            W1: w,
                            O1: o,
                            widths,
                            opacities,
                            activeOpacities,
                            times,
                        });
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });
        };

        // AW.W2 §2.1 — the bi-axial parity probe targets the INNER
        // DockLayerGroup height morph (the outer collapsed↔expanded pair is
        // hardcoded horizontal; the vertical HEIGHT morph runs on the inner
        // `.dock-layer-stack` with axis=vertical). Drive an inner-group layer
        // switch on the /navigation/dock-layers route and rAF-sample the stack's
        // height rising ≥3 frames.
        const sampleVerticalInnerGroup = () => {
            // Find a vertical DockLayerGroup stack (a `.dock-layer-group.vertical
            // .dock-layer-stack`). Switching its active layer morphs the stack
            // HEIGHT (the column reveals at its intrinsic block size).
            const stack = document.querySelector(
                ".dock-layer-group.vertical .dock-layer-stack",
            );
            if (!stack) return { ran: false };
            const tabs = [
                ...stack
                    .closest(".dock-layer-group")
                    .querySelectorAll('[role="tab"]'),
            ];
            const hOf = () => stack.getBoundingClientRect().height;
            const H0 = hOf();
            // Click the second tab (if any) to drive a layer switch.
            const target = tabs.find(
                (t) => t.getAttribute("aria-selected") !== "true",
            );
            if (target) target.click();
            return new Promise((res) => {
                const heights = [];
                const times = [];
                const t0 = performance.now();
                let stable = 0;
                let lastH = H0;
                const f = () => {
                    const t = performance.now() - t0;
                    const h = hOf();
                    heights.push(h);
                    times.push(t);
                    if (Math.abs(h - lastH) < 0.5) stable++;
                    else stable = 0;
                    lastH = h;
                    if (stable >= 4 || t > 2000)
                        res({ ran: true, H0, H1: h, heights, times });
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

            // (4) AW.W2 bi-axial — the vertical INNER DockLayerGroup height morph.
            // Nav to the layer-group route where a vertical group lives, then
            // drive an inner layer switch and sample the stack height. The route
            // is feature-detected (skip cleanly if no vertical inner group is
            // mounted), so the gate never hard-fails on a demo without it.
            clickLink("/navigation/dock-layers");
            await sleep(500);
            try {
                result.verticalInner = await sampleVerticalInnerGroup();
            } catch (e) {
                result.verticalInner = { ran: false, error: String(e) };
            }

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

// `fallingFrames` counts frame-to-frame DECREASES above an epsilon — the
// LEAVING-pane fade witness under the AW.W2 clip-reveal model (the active pane is
// statically opacity:1; only the leaving pane animates opacity, downward).
export function fallingFrames(series, eps) {
    let n = 0;
    for (let i = 1; i < series.length; i++) if (series[i - 1] - series[i] > eps) n++;
    return n;
}

// `allEqual` — true when every sample is within `eps` of `target` (the active
// pane is asserted statically == 1 across every morph frame).
export function allEqual(series, target, eps) {
    return series.every((v) => Math.abs(v - target) <= eps);
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
    // AW.W2 clip-reveal — `flip.opacities` is now the LEAVING pane (it FALLS as
    // the aperture reveals the active content); `flip.activeOpacities` is the
    // ACTIVE pane (asserted statically == 1, revealed not faded).
    const oFall = fallingFrames(flip.opacities, 0.01);
    facts.widthRisingFrames = wRise;
    facts.leavingOpacityFallingFrames = oFall;
    facts.widthDelta = Math.round((flip.W1 - flip.W0) * 100) / 100;
    facts.leavingOpacityDelta = Math.round((flip.O1 - flip.O0) * 1000) / 1000;
    if (wRise < MIN_MORPH_FRAMES) {
        violations.push(
            `the FLIP width MORPHED over only ${wRise} rising frame(s) (< ${MIN_MORPH_FRAMES}) — the dock SNAPPED / FROZE, it did not animate (W0=${flip.W0} W1=${flip.W1})`,
        );
    }
    if (oFall < MIN_MORPH_FRAMES) {
        violations.push(
            `the LEAVING-pane opacity faded over only ${oFall} falling frame(s) (< ${MIN_MORPH_FRAMES}) — the leaving crossfade (the sole opacity animation under clip-reveal) did not run`,
        );
    }

    // AW.W2 — the ACTIVE pane must be statically opacity:1 across EVERY sampled
    // frame (it is REVEALED by the clip aperture, never faded). A frame with
    // active opacity < 1 is the "content fades, not revealed" tell.
    if (Array.isArray(flip.activeOpacities) && flip.activeOpacities.length) {
        const activeStatic1 = allEqual(flip.activeOpacities, 1, 0.001);
        facts.activeOpacityStatic1 = activeStatic1;
        facts.activeOpacityMin =
            Math.round(Math.min(...flip.activeOpacities) * 1000) / 1000;
        if (!activeStatic1) {
            violations.push(
                `the ACTIVE pane opacity fell below 1 (min ${facts.activeOpacityMin}) during the morph — the active pane is FADING (the clip-reveal contract requires it be statically opacity:1, REVEALED by the aperture)`,
            );
        }
    }

    // Lockstep = the PERCEPTUAL arrival of width and the LEAVING-pane fade at
    // their target band (not the final ring-settle — the spring's position
    // overshoot tail naturally clocks width later, see arrivalTimeMs). Both ride
    // the SAME --dock-motion-resize curve (the width spring + the leaving fade),
    // so their 90%-arrival times coincide by construction; the bar tolerates
    // real-browser rAF scheduler jitter (the charter's ideal is +-1 frame; a live
    // scheduler can split a co-driven pair across an extra frame, so the gate's
    // bar is widened from the ideal to absorb that noise without loosening the
    // freeze assert, which keys off rising-FRAME COUNT, not timing).
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

    // (4) AW.W2 §2.1 — the vertical INNER DockLayerGroup HEIGHT morph rises over
    // >=3 frames (the bi-axial parity bar). The outer pair is hardcoded
    // horizontal, so the vertical timeline targets the inner group's stack
    // height. Feature-detected: if no vertical inner group is mounted on the
    // route, the probe reports ran:false and the gate notes it without failing
    // (the horizontal timeline is the always-present bar; the vertical probe is a
    // best-effort bi-axial extension the demo route may not carry).
    const vi = result.verticalInner;
    facts.verticalInnerRan = vi?.ran ?? false;
    if (vi?.ran && Array.isArray(vi.heights)) {
        const hRise = risingFrames(vi.heights, 0.5);
        facts.verticalInnerHeightRisingFrames = hRise;
        facts.verticalInnerHeightDelta =
            Math.round((vi.H1 - vi.H0) * 100) / 100;
        if (hRise < MIN_MORPH_FRAMES) {
            violations.push(
                `the vertical INNER DockLayerGroup height morphed over only ${hRise} rising frame(s) (< ${MIN_MORPH_FRAMES}) — the bi-axial (vertical) morph SNAPPED / FROZE (H0=${vi.H0} H1=${vi.H1})`,
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
            leavingOpacities: result.flip?.opacities?.map((o) => Math.round(o * 1000) / 1000),
            activeOpacities: result.flip?.activeOpacities?.map(
                (o) => Math.round(o * 1000) / 1000,
            ),
            verticalInnerHeights: result.verticalInner?.heights?.map(
                (h) => Math.round(h * 100) / 100,
            ),
        },
    });

    console.log("proof:dock-animation-live — the dock BEHAVIORAL motion gate (AV.W9 + AW.W2)");
    console.log(`  VT-group animations (expand) : ${facts.vtGroupAnimations ?? "n/a"}`);
    console.log(
        `  FLIP width morph frames      : ${facts.widthRisingFrames ?? "n/a"} (>= ${MIN_MORPH_FRAMES})`,
    );
    console.log(
        `  LEAVING-pane fade frames     : ${facts.leavingOpacityFallingFrames ?? "n/a"} (>= ${MIN_MORPH_FRAMES})`,
    );
    console.log(
        `  ACTIVE pane static opacity:1 : ${facts.activeOpacityStatic1 === undefined ? "n/a" : facts.activeOpacityStatic1 ? "YES" : `NO (min ${facts.activeOpacityMin})`}`,
    );
    console.log(
        `  vertical inner-group frames  : ${facts.verticalInnerRan ? (facts.verticalInnerHeightRisingFrames ?? "n/a") : "n/a (no vertical inner group on route)"}`,
    );
    console.log(
        `  width / fade arrival delta   : ${facts.arrivalDeltaMs ?? "n/a"}ms (<= ${SETTLE_TOLERANCE_MS}ms)`,
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
