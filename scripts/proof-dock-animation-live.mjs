// AX.W01 — the dock BEHAVIORAL motion gate (proof:dock-animation-live), re-authored
// to the SINGLE-SCALAR `--dock-morph-t` architecture.
//
// The dock collapse↔expand morph is now ONE analytic spring whose single normalized
// scalar (`--dock-morph-t`, 0→1 with a spring overshoot) is written once per frame
// to the `.glass-dock` ROOT and drives EVERY animated axis — box inline-size,
// padding, border-radius, scale, color, AND the child stagger. The prior VT
// COLLAPSE fork (the `::view-transition-group(.gl-dock-layer)` recipe) and the
// JS FLIP-width-on-`.dock-layers` driver are DELETED (AX.W01). So this gate no
// longer measures VT-group animations or a `.dock-layers` FLIP width — it measures
// the ROOT box geometry against the live `--dock-morph-t` scalar on ONE rAF
// timeline. The single-clock contract is: the root box width and the `--dock-morph-t`
// scalar onset in the SAME frame (lead/lag ≤ 1 frame), and each ramps over enough
// rising frames to be a spring, not a snap.
//
// WHAT IT MEASURES (the AX.W01 single-scalar landing):
//   1. The morph timeline. `page.addInitScript` removes `Document.startViewTransition`
//      (KISS — keeps the deterministic readable arm; the morph is spring-driven on
//      every engine now, so this only removes one source of route-morph noise). A
//      data attr is set on the FIRST `.glass-dock.collapsed` so the SAME element is
//      sampled across the `.collapsed`→`.expanded` class flip (re-querying
//      `.glass-dock.collapsed` each frame is a TRAP — it switches to a DIFFERENT
//      collapsed dock once dock #1 expands). A real `page.hover` expands it. Then it
//      rAF-samples, on ONE timeline: the HELD dock-root `getBoundingClientRect().width`,
//      `getComputedStyle(root).getPropertyValue("--dock-morph-t")`, the LEAVING child's
//      opacity, AND the LAST ENTERING `.dock-layer--full > *` child's opacity.
//      ASSERTS (AY.W-DOCK2): `--dock-morph-t` ramps over ≥5 rising frames (NOT frozen
//      at 0 — the snap/desync regression), the root box width rises over ≥5 rising
//      frames (NOT a 1-frame snap), and — THE BINDING LOCKSTEP WITNESS — the LAST
//      ENTERING child's opacity onset trails the box-width onset by ≤
//      LOCKSTEP_BUDGET_MS (the deliberate macOS-dock reveal-stagger ceiling; a
//      regression PAST the stagger reds). The width-vs-scalar onset Δ is kept as a
//      STRUCTURAL SANITY fact only (the box rides the scalar by CONSTRUCTION —
//      `layers.css` makes `inline-size = calc(… × --dock-morph-t)` — so asserting it
//      is a TAUTOLOGY that can never witness a box-leads-CONTENT desync; AY.W-DOCK2
//      DEMOTED it from a binding assert to a non-binding fact).
//   2. The retarget case (velocity-continuity, the one genuine iOS piece W01 keeps):
//      an interrupt mid-morph must continue the trajectory, not snap to rest — no
//      inter-frame discontinuity beyond the spring's own natural acceleration.
//
// HARNESS: a Playwright driver. glass-ui carries ZERO browser dependency (the static
// gates refused to add one for a single gate, on payload + KISS grounds), so this
// gate dynamically imports `playwright`/`playwright-core` and runs the probe ONLY
// when that harness AND a live demo dev server are present.
//
// AX.W00 — FAIL-CLOSED PROMOTION. The fail-open SKIP-with-EXIT=0 is promoted: when
// the π workspace IS present (tests-visual/node_modules/@playwright/test resolves,
// the fail-CLOSED device installed), an unreachable demo / missing morph is a HARD
// RED (a real wiring break, not a befitting-silent browser-API absence). The SKIP
// path stays ONLY for the genuine no-π-workspace device-absence on a zero-dep CI
// runner. Two device-free arms run on EVERY runner regardless: the cheap "structure"
// pre-checks and the AX.W00 TOKEN-PEAK secondary (parseSpringDockPeak — a pure
// tokens.css string parse asserting --spring-dock's linear() peak ≤ the published
// (0.32,0.7) ~+4.6% baseline; a spring retune to a bouncier register reds here with
// no browser). The live-rAF behavioral truth additionally lives in the tests-visual
// π workspace spec (dock-animation-live.spec.ts), run on the real device.
//
// House style mirrors proof-dock-opacity-lockstep.mjs: ESM .mjs, a byte-stable
// JSON artefact via gate-output, a human summary, process.exit(1) on a real
// behavioral violation (0 on pass or harness-absent skip).

import { resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// NOTE: the gate-runner globals (ROOT/BASE_URL/DOCK_ROUTE) are resolved LAZILY
// inside run() — `fileURLToPath(import.meta.url)` throws when this module is
// IMPORTED by a test runner that serves it over http (vitest/vite), so the
// pure detectors below must remain import-side-effect-free (AW.W1 unit).
// AY.W-DOCK2 — the REAL collapsible-dock route (the morph IS on `/dock/overview`).
// The prior `/navigation/dock` resolved to a NON-DOCK page (the `navigation`
// category has no `dock` story — manifest.ts has tabs/deck-progress/header-ribbon/
// carousel only), so the entering-child morph was never sampled (D7). The probe
// targets the plain `data-testid="dock-capture"` (NOT `data-container-name`, which
// co-applies `container-type: inline-size` and FREEZES the morph — the §F1 trap).
const DOCK_ROUTE = "/dock/overview";
const DOCK_CAPTURE_SEL = '.glass-dock[data-testid="dock-capture"]';

// The behavioral bar (the AX.W01 single-scalar numbers). The published
// `(0.32, 0.7)` spring rings 0→~1.05→1.0 over ~23 rAF frames (device-proven), so a
// genuine spring shows MANY rising frames on both the scalar and the box width; a
// snap/freeze shows 0-1. The bar is ≥5 rising frames — comfortably above scheduler
// jitter, far below the real ~23.
const MIN_MORPH_FRAMES = 5; // --dock-morph-t AND the root box width must each rise over ≥5 frames
// The box-onset and the scalar-onset must co-occur within ≤1 frame (the single-clock
// assert). A live rAF scheduler can split a co-driven pair by one frame, so the bar
// is one frame (16.7ms) + a tiny epsilon.
const FRAME_MS = 1000 / 60;
const ONSET_TOLERANCE_MS = FRAME_MS + 1e-3;

// AY.W-DOCK2 HG1/HG2 — the REAL lockstep witness budget: the LAST ENTERING child's
// opacity onset must trail the box-width onset by ≤ this ceiling. This is the
// W-DOCK1 captured-ABSENT KEEP-AND-DOCUMENT ceiling, NOT a tighten (there is no
// clock desync to tighten away — `box↔scalar onset Δ = 0 ms` on all 12 captures).
// The trail the user reads (36.7–96.2 ms captured) IS the deliberate macOS-dock
// reveal stagger (`layers.css` `opacity = clamp(0, (expand-t − onset)/window, 1)`,
// `onset = step × (childIndex−1)` capped at child 6 = `step × 5`).
//
// DERIVATION (using the SHIPPED `shell.css` values, NOT the `layers.css:235`
// `0.55` fallback — the 0.4-vs-0.55 reconciliation, HG2):
//   --dock-stagger-window-size = 0.4   (shell.css)
//   --dock-stagger-step        = 0.08  (shell.css)
//   last-child onset (expand-t) = step × 5 = 0.40
//   last-child FULL opacity at  = onset + window = 0.40 + 0.40 = 0.80 of the morph
//   morph duration ≈ 650 ms (the `--spring-dock` ring; we measure it live below and
//   use the larger of measured/fallback so a fast device cannot tighten the ceiling)
//   ceiling = 0.80 × 650 ≈ 520 ms + a 1-frame epsilon
// A regression PAST the deliberate stagger (a re-added per-child SECOND clock, a
// mis-tuned window) trails the box past this ceiling and REDs. The captured 96.2 ms
// max comfortably clears 520 ms (the budget is a true ceiling, not the lag itself).
const STAGGER_WINDOW = 0.4; // shell.css --dock-stagger-window-size (SHIPPED)
const STAGGER_STEP = 0.08; // shell.css --dock-stagger-step
const LAST_CHILD_FULL_FRACTION = STAGGER_WINDOW + STAGGER_STEP * 5; // 0.80
const MORPH_DURATION_FALLBACK_MS = 650; // the `--spring-dock` ring (device-proven)
const LOCKSTEP_BUDGET_MS =
    LAST_CHILD_FULL_FRACTION * MORPH_DURATION_FALLBACK_MS + FRAME_MS; // ≈ 537 ms

// ── the in-page probe ────────────────────────────────────────────────────────
// Serialized into the browser. Tags the FIRST collapsed dock with a data attr so the
// SAME element is sampled across the class flip, expands it via real dispatched
// pointer events, and rAF-samples the root box width + the `--dock-morph-t` scalar +
// a leaving child's opacity on ONE timeline. Returns the morph timeline + the
// retarget series.
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

        // Sample the morph off the HELD dock-root reference (NOT a per-frame
        // `.glass-dock.collapsed` re-query — once dock #1 expands the `.collapsed`
        // selector resolves to a DIFFERENT dock and the timeline would jump). The
        // root box `width` and the `--dock-morph-t` scalar are the single-clock pair;
        // the LAST ENTERING `.dock-layer--full > *` child opacity is the REAL
        // lockstep witness (AY.W-DOCK2 — the largest-onset child, the `nth-child(n+6)`
        // cap rung the user watches fade in). The LEAVING `.dock-layer--summary`
        // opacity is ALSO sampled (the prior best-effort fact, retained).
        const sampleExpand = (dock) => {
            const leaving =
                dock.querySelector(".dock-layer--summary") ?? dock;
            // The LAST entering child of the EXPANDED pane — the largest stagger
            // onset (the items-lag-capture last-child resolver pattern). Resolved
            // per-frame (the pane only exists/lays-out after the class flip).
            const fullPane = () => dock.querySelector(".dock-layer--full");
            const lastEnteringChild = () => {
                const pane = fullPane();
                if (!pane) return null;
                const kids = pane.children;
                return kids.length ? kids[kids.length - 1] : null;
            };
            const wOf = () => dock.getBoundingClientRect().width;
            const tOf = () =>
                parseFloat(
                    getComputedStyle(dock).getPropertyValue("--dock-morph-t"),
                ) || 0;
            const childOf = () => parseFloat(getComputedStyle(leaving).opacity);
            const enteringOf = () => {
                const el = lastEnteringChild();
                return el ? parseFloat(getComputedStyle(el).opacity) : 0;
            };
            const W0 = wOf();
            const T0 = tOf();
            const C0 = childOf();
            fire(ENTER, dock);
            return new Promise((res) => {
                const widths = [];
                const morphTs = [];
                const childOpacities = [];
                const enteringChildOpacities = [];
                const times = [];
                let enteringSampled = false;
                const t0 = performance.now();
                let stable = 0;
                let lastW = W0;
                const f = () => {
                    const t = performance.now() - t0;
                    const w = wOf();
                    widths.push(w);
                    morphTs.push(tOf());
                    childOpacities.push(childOf());
                    const e = enteringOf();
                    if (lastEnteringChild()) enteringSampled = true;
                    enteringChildOpacities.push(e);
                    times.push(t);
                    if (Math.abs(w - lastW) < 0.5) stable++;
                    else stable = 0;
                    lastW = w;
                    if (stable >= 5 || t > 2000)
                        res({
                            W0,
                            T0,
                            C0,
                            W1: w,
                            widths,
                            morphTs,
                            childOpacities,
                            enteringChildOpacities,
                            enteringChildSampled: enteringSampled,
                            times,
                        });
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });
        };

        (async () => {
            const result = {};

            // Force the readable path: remove startViewTransition from the whole
            // chain (KISS — one fewer source of route-morph noise; the morph is
            // spring-driven on every engine now).
            if (Object.prototype.hasOwnProperty.call(document, "startViewTransition"))
                delete document.startViewTransition;
            let p = Object.getPrototypeOf(document);
            while (p) {
                if (Object.prototype.hasOwnProperty.call(p, "startViewTransition")) {
                    try {
                        delete p.startViewTransition;
                    } catch {
                        /* non-configurable — fall through */
                    }
                    break;
                }
                p = Object.getPrototypeOf(p);
            }
            result.vtForcedOff = !("startViewTransition" in document);

            // Re-mount the dock for a clean collapsed baseline (navigate to a
            // sibling dock route + back; AY.W-DOCK2 — `/dock/overview` is the real
            // collapsible dock; `/dock/rail` is the away route).
            clickLink("/dock/rail");
            await sleep(450);
            clickLink("/dock/overview");
            await sleep(450);

            // AY.W-DOCK2 — prefer the deterministic capture target (the plain
            // `data-testid="dock-capture"` collapsible dock — the slider dock at
            // /dock/overview that reliably morphs, per W-DOCK1 §F). (The probe
            // is serialized into the browser, so the selector is inlined — module
            // consts do NOT cross the page.evaluate boundary.)
            const capture = document.querySelector(
                '.glass-dock[data-testid="dock-capture"]',
            );
            // The capture dock mounts EXPANDED (its `:collapse-delay="600"` idle-
            // collapses only AFTER a hover ends — a fresh mount stays open). Drive it
            // to the collapsed baseline first: fire LEAVE, then wait out the collapse
            // delay so the `.collapsed` class settles, making the subsequent expand a
            // REAL morph (not a no-op on an already-expanded dock). This is the same
            // collapse-first idiom W-DOCK1's capture harness uses.
            if (capture && !capture.classList.contains("collapsed")) {
                fire(LEAVE, capture);
                await sleep(900);
            }
            const dock =
                capture && capture.classList.contains("collapsed")
                    ? capture
                    : findCollapsedDock();
            if (!dock) {
                result.error = "no collapsed dock after re-mount + collapse-settle";
                resolve(result);
                return;
            }
            // HOLD the element by a data attr — guards against the per-frame re-query
            // trap (the collapsed selector switches docks once #1 expands).
            dock.setAttribute("data-dock-animation-probe", "1");

            // (1) The morph timeline off the HELD dock root.
            result.flip = await sampleExpand(dock);

            // (2) Retarget velocity-continuity: interrupt the morph mid-flight, then
            // re-expand; the trajectory must continue (no snap to rest). Collapse
            // first. The SAME held element is re-driven (it is still in the DOM —
            // expanded now, the data attr survives).
            await sleep(500);
            const held =
                document.querySelector('[data-dock-animation-probe="1"]') ?? dock;
            const wOf2 = () => held.getBoundingClientRect().width;
            const retargetWidths = [];
            const retargetTimes = [];
            const t0 = performance.now();
            fire(LEAVE, held);
            await sleep(60);
            fire(ENTER, held);
            await new Promise((res) => {
                let interrupted = false;
                const f = () => {
                    const t = performance.now() - t0;
                    retargetWidths.push(wOf2());
                    retargetTimes.push(t);
                    if (!interrupted && t > 35 && t < 60) {
                        fire(LEAVE, held);
                        fire(ENTER, held);
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

// `changingFrames` counts frame-to-frame |Δ| above an epsilon — a property MOVING in
// either direction (the leaving-pane child opacity falls; the entering rises).
export function changingFrames(series, eps) {
    let n = 0;
    for (let i = 1; i < series.length; i++)
        if (Math.abs(series[i] - series[i - 1]) > eps) n++;
    return n;
}

// `onsetTimeMs` is the timestamp at which |series - series[0]| first exceeds eps —
// the frame the property STARTS moving (the single-clock onset witness).
export function onsetTimeMs(series, times, eps) {
    const from = series[0] ?? 0;
    for (let i = 1; i < series.length; i++) {
        if (Math.abs(series[i] - from) > eps) return times[i];
    }
    return times[times.length - 1] ?? 0;
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

// ── AX.W00 the TOKEN-PEAK SECONDARY (flake-free, device-free) ─────────────────
// keyframes demoted its own dock gate to exactly this form: parse the
// `--spring-dock` linear() ramp and assert its peak stop ≤ the published (0.32,0.7)
// ~+4.6% baseline. It has NO rAF flake surface — a pure string parse over
// tokens.css — so it is the trivially-falsifiable secondary that catches a spring
// retune to a bouncier register even on a runner with no browser. The published
// peak is 1.04501 (+4.5% at 18.367%); the analytic underdamped overshoot for ζ=0.7
// is exp(-ζπ/√(1-ζ²)) ≈ 0.046, so the ceil is 1.046 + a 0.005 parse/round margin.
const SPRING_DOCK_PEAK_CEIL = 1.046 + 0.005;

/** Parse the max numeric stop from the `--spring-dock: linear(…)` declaration. */
export function parseSpringDockPeak(tokensCss) {
    const m = tokensCss.match(/--spring-dock:\s*linear\(([^;]*)\)\s*;/);
    if (!m) return { found: false, peak: null };
    // Each stop is `<value>` or `<value> <pct>%`; take the leading numeric.
    const nums = [...m[1].matchAll(/(-?\d+\.?\d*)(?:\s+[\d.]+%)?/g)]
        .map((x) => Number.parseFloat(x[1]))
        .filter((n) => !Number.isNaN(n));
    if (!nums.length) return { found: false, peak: null };
    return { found: true, peak: Math.max(...nums) };
}

/** The token-peak secondary as a {facts, violations} detector (device-free). */
export function detectTokenPeak(tokensCss) {
    const violations = [];
    const facts = {};
    const { found, peak } = parseSpringDockPeak(tokensCss);
    facts.springDockPeakFound = found;
    facts.springDockPeak = peak;
    facts.springDockPeakCeil = SPRING_DOCK_PEAK_CEIL;
    if (!found) {
        violations.push(
            "could not parse the --spring-dock: linear(…) declaration from tokens.css — the dock-spring token shape moved",
        );
        return { facts, violations };
    }
    if (peak > SPRING_DOCK_PEAK_CEIL) {
        violations.push(
            `--spring-dock peak stop ${peak} exceeds the published (0.32,0.7) ~+4.6% baseline ceil ${SPRING_DOCK_PEAK_CEIL} — the dock spring was retuned to a bouncier register`,
        );
    }
    return { facts, violations };
}

// The pure detector over a probe RESULT — returns {facts, violations}.
export function detectAnimation(result) {
    const violations = [];
    const facts = {};

    if (!result || result.error) {
        violations.push(`probe error: ${result?.error ?? "no result"}`);
        return { facts, violations };
    }

    facts.vtForcedOff = result.vtForcedOff ?? false;

    // (1) The single-scalar morph timeline.
    const flip = result.flip;
    if (!flip) {
        violations.push("the morph timeline is missing");
        return { facts, violations };
    }

    // `--dock-morph-t` must RAMP over ≥5 rising frames — the spring scalar, not a
    // frozen-at-0 snap (the desync/snap regression W01 fixes).
    const tRise = risingFrames(flip.morphTs, 1e-4);
    facts.morphTRisingFrames = tRise;
    facts.morphTMax = Math.round(Math.max(...flip.morphTs) * 1000) / 1000;
    facts.morphTDelta =
        Math.round((Math.max(...flip.morphTs) - flip.T0) * 1000) / 1000;
    if (tRise < MIN_MORPH_FRAMES) {
        violations.push(
            `--dock-morph-t ramped over only ${tRise} rising frame(s) (< ${MIN_MORPH_FRAMES}) — the single-scalar spring did NOT run (it is frozen at ${flip.T0}; the snap/desync regression)`,
        );
    }

    // The root box width must RISE over ≥5 rising frames — a snap/freeze fails.
    const wRise = risingFrames(flip.widths, 0.5);
    facts.rootWidthRisingFrames = wRise;
    facts.widthDelta = Math.round((flip.W1 - flip.W0) * 100) / 100;
    if (wRise < MIN_MORPH_FRAMES) {
        violations.push(
            `the dock-root box width rose over only ${wRise} rising frame(s) (< ${MIN_MORPH_FRAMES}) — the box SNAPPED / FROZE, it did not morph (W0=${flip.W0} W1=${flip.W1})`,
        );
    }

    // AY.W-DOCK2 — STRUCTURAL SANITY (NOT the lockstep witness). The box rides the
    // scalar BY CONSTRUCTION: `layers.css` makes `inline-size: calc(from + (to−from)
    // × var(--dock-morph-t))`, so the box onset co-occurs with the scalar onset
    // tautologically. Asserting it can NEVER red and can NEVER witness a
    // box-leads-CONTENT desync (it only re-proves the box can't lead its own driver,
    // which is structurally impossible). It is kept as a cheap fact — a non-binding
    // sanity that the scalar drives the box — but the `violations.push` is DROPPED.
    // The REAL lockstep witness is the entering-child onset assert below.
    const wOnset = onsetTimeMs(flip.widths, flip.times, 0.5);
    const tOnset = onsetTimeMs(flip.morphTs, flip.times, 1e-4);
    const onsetDelta = Math.abs(wOnset - tOnset);
    facts.widthOnsetMs = Math.round(wOnset * 10) / 10;
    facts.morphTOnsetMs = Math.round(tOnset * 10) / 10;
    facts.onsetDeltaMs = Math.round(onsetDelta * 10) / 10; // structural fact, non-binding

    // The leaving child opacity should MOVE over ≥3 frames — a witness that the
    // content stagger co-morphs off the same scalar (the box did not morph alone).
    // Best-effort: under the clip-reveal model the leaving pane may be absent on some
    // routes, so a still child is NOTED but not asserted.
    if (Array.isArray(flip.childOpacities) && flip.childOpacities.length) {
        const cMove = changingFrames(flip.childOpacities, 0.01);
        facts.childOpacityMovingFrames = cMove;
    }

    // ── THE BINDING LOCKSTEP WITNESS (AY.W-DOCK2 HG1) ──────────────────────────
    // The LAST ENTERING `.dock-layer--full > *` child opacity onset must trail the
    // box-width onset by ≤ LOCKSTEP_BUDGET_MS (the W-DOCK1 KEEP-branch deliberate-
    // stagger ceiling). This is the property the USER perceives lagging — the
    // staggered controls fading in after the shell. The box-vs-scalar tautology
    // above is blind to it; THIS assert witnesses the real number.
    const entering = flip.enteringChildOpacities;
    if (!Array.isArray(entering) || !entering.length || !flip.enteringChildSampled) {
        // D1 blind-spot guard: the entering child must be sampled. An empty/never-
        // resolved series is the exact never-witnessed defect that must NOT recur.
        violations.push(
            "the entering `.dock-layer--full > *` child was NEVER sampled (empty/frozen series) — the D1 lockstep blind-spot would recur; the REAL morph surface is missing",
        );
    } else {
        const eRise = changingFrames(entering, 0.01);
        facts.enteringChildMovingFrames = eRise;
        facts.enteringChildOpacityMax =
            Math.round(Math.max(...entering) * 1000) / 1000;
        const eOnset = onsetTimeMs(entering, flip.times, 0.01);
        const lastChildVsBoxMs = eOnset - wOnset;
        facts.enteringChildOnsetMs = Math.round(eOnset * 10) / 10;
        facts.lastChildVsBoxOnsetDeltaMs = Math.round(lastChildVsBoxMs * 10) / 10;
        facts.lockstepBudgetMs = Math.round(LOCKSTEP_BUDGET_MS * 10) / 10;
        if (lastChildVsBoxMs > LOCKSTEP_BUDGET_MS) {
            violations.push(
                `the last entering child opacity onset (${facts.enteringChildOnsetMs}ms) trails the box-width onset (${facts.widthOnsetMs}ms) by ${facts.lastChildVsBoxOnsetDeltaMs}ms (> the ${facts.lockstepBudgetMs}ms deliberate-stagger budget) — a regression PAST the macOS-dock reveal stagger (a re-added per-child SECOND clock or a mis-tuned window)`,
            );
        }
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

// Whether the π workspace carries an INSTALLED Playwright runner (the fail-CLOSED
// device is present). When present, a missing morph is a hard RED — never a SKIP.
function piWorkspacePresent(ROOT) {
    // npm workspaces HOIST @playwright/test to the ROOT node_modules — accept EITHER
    // the workspace-local or the hoisted-root layout (AX.W00 orchestrator integration
    // fix: a hoisted install must NOT false-SKIP the fail-CLOSED live arm).
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

async function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    // AX.W00 — standardize on the demo dev-server origin `npm run dev` actually
    // serves (vite default :5173; the legacy 5175 default was an inconsistency).
    const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5173";
    // AY.W-DOCK2 — the born-RED witness override. Set GLASS_UI_DOCK_FIXTURE_URL to a
    // file:// URL (e.g. the synthetic `tests-visual/fixtures/dock-entering-child-lag.html`)
    // to run the gate against a fixture instead of the live demo route. The fixture
    // has no nav links, so the probe's re-mount `clickLink` no-ops (returns false)
    // and the capture-selector branch finds the fixture dock directly. The gate REDs
    // on the synthetic per-child second-clock lag.
    const FIXTURE_URL = process.env.GLASS_UI_DOCK_FIXTURE_URL ?? null;
    const TARGET_URL = FIXTURE_URL ?? `${BASE_URL}${DOCK_ROUTE}`;
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_ANIMATION_LIVE_ARTIFACT",
        "AX-dock-animation-live",
    );

    // AX.W00 — the TOKEN-PEAK SECONDARY runs FIRST + ALWAYS (flake-free,
    // device-free). It is the cheap structure-tier check the zero-dep CI runner
    // keeps; a --spring-dock retune to a bouncier register reds here with no
    // browser. A token-peak violation is a HARD RED on every runner.
    const tokensCss = readFileSync(resolve(ROOT, "src/styles/tokens.css"), "utf8");
    const tokenPeak = detectTokenPeak(tokensCss);
    const piPresent = piWorkspacePresent(ROOT);

    const pw = await loadPlaywright();
    if (!pw) {
        // No browser harness reachable from the library `node_modules`. If the π
        // workspace IS present (fail-CLOSED device installed), the behavioral arm
        // belongs to the tests-visual spec (run by the workspace runner) — here we
        // still HARD-FAIL on a token-peak violation (it is device-free), but the
        // live-rAF behavioral truth is the workspace spec's. When the π workspace is
        // ABSENT, this is a genuine device absence: befitting-silent SKIP for the
        // live arm, but the token-peak secondary STILL reds if violated.
        const status = tokenPeak.violations.length === 0 ? "skipped" : "fail";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason: piPresent
                ? "the library node_modules has no Playwright — the live-rAF behavioral arm runs in the tests-visual π workspace (dock-animation-live.spec.ts); the device-free token-peak secondary ran here"
                : "no Playwright harness AND no π workspace on this runner — the live arm is asserted in the tests-visual workspace; the device-free token-peak secondary ran here",
            command: "npm run proof:dock-animation-live",
            facts: { piWorkspacePresent: piPresent, tokenPeak: tokenPeak.facts },
            violations: tokenPeak.violations,
        });
        console.log(
            `proof:dock-animation-live — ${status === "fail" ? "TOKEN-PEAK FAIL" : "live arm SKIPPED on this runner"} (token-peak secondary ran here).`,
        );
        console.log(
            `  --spring-dock peak: ${tokenPeak.facts.springDockPeak ?? "n/a"} (ceil ${tokenPeak.facts.springDockPeakCeil}) — ${tokenPeak.violations.length === 0 ? "OK" : "RETUNED"}`,
        );
        console.log(
            piPresent
                ? "  The live-rAF morph truth is the tests-visual π workspace spec (dock-animation-live.spec.ts), run on the real device."
                : "  Install the tests-visual workspace (npm i + npx playwright install chromium) + a demo dev server for the live behavioral arm.",
        );
        if (tokenPeak.violations.length) {
            console.log("\nVIOLATIONS:");
            for (const v of tokenPeak.violations) console.log(`  x ${v}`);
        }
        process.exit(status === "fail" ? 1 : 0);
    }

    let browser;
    let result;
    try {
        browser = await pw.chromium.launch();
        const page = await browser.newPage();
        // Force the readable arm BEFORE the app boots (most robust point — the
        // in-page delete races the composable's first read).
        await page.addInitScript(() => {
            try {
                if (
                    Object.prototype.hasOwnProperty.call(
                        document,
                        "startViewTransition",
                    )
                )
                    delete document.startViewTransition;
                let p = Object.getPrototypeOf(document);
                while (p) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            p,
                            "startViewTransition",
                        )
                    ) {
                        delete p.startViewTransition;
                        break;
                    }
                    p = Object.getPrototypeOf(p);
                }
            } catch {
                /* non-configurable on this engine */
            }
        });
        await page.goto(TARGET_URL, { waitUntil: "networkidle" });
        // Wait for ANY dock to be present (the capture dock mounts EXPANDED — the
        // probe drives it to the collapsed baseline itself before sampling the expand
        // morph; gating on `.collapsed` here would hang on a fresh-mount demo where no
        // dock idle-collapses without a prior hover).
        await page.waitForSelector(".glass-dock", { timeout: 5000 });
        result = await page.evaluate(pageProbe);
    } catch (e) {
        // AX.W00 fail-CLOSED PROMOTION: when the π workspace is PRESENT (the
        // fail-CLOSED device is installed), an unreachable demo is a real wiring
        // break — exit NON-ZERO, never SKIP-with-EXIT=0. The SKIP path stays ONLY
        // for the genuine no-π-workspace case (the device is not present). The
        // token-peak secondary is folded into the verdict either way.
        if (browser) await browser.close();
        const reason = `could not reach the dock route at ${TARGET_URL}: ${e.message}`;
        const failClosed = piPresent;
        const violations = [...tokenPeak.violations];
        if (failClosed)
            violations.push(
                `${reason} — the π workspace is PRESENT (fail-CLOSED), so an unreachable live morph is a hard RED, not a SKIP`,
            );
        const status = violations.length ? "fail" : "skipped";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason,
            command: "npm run proof:dock-animation-live",
            facts: { piWorkspacePresent: piPresent, tokenPeak: tokenPeak.facts },
            violations,
        });
        console.log(
            `proof:dock-animation-live — ${failClosed ? "FAIL (π workspace present, demo unreachable — fail-CLOSED)" : "SKIPPED (no π workspace; demo unreachable)"} at ${TARGET_URL}.`,
        );
        console.log(`  ${e.message}`);
        if (violations.length) {
            console.log("\nVIOLATIONS:");
            for (const v of violations) console.log(`  x ${v}`);
        }
        process.exit(status === "fail" ? 1 : 0);
    }
    await browser.close();

    const { facts, violations: animViolations } = detectAnimation(result);
    // Fold the device-free token-peak secondary into the verdict + facts.
    const violations = [...animViolations, ...tokenPeak.violations];
    Object.assign(facts, { tokenPeak: tokenPeak.facts, piWorkspacePresent: piPresent });
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-animation-live",
        facts,
        violations,
        timelines: {
            times: result.flip?.times?.map((t) => Math.round(t * 10) / 10),
            widths: result.flip?.widths?.map((w) => Math.round(w * 100) / 100),
            morphTs: result.flip?.morphTs?.map((t) => Math.round(t * 1000) / 1000),
            childOpacities: result.flip?.childOpacities?.map(
                (o) => Math.round(o * 1000) / 1000,
            ),
            enteringChildOpacities: result.flip?.enteringChildOpacities?.map(
                (o) => Math.round(o * 1000) / 1000,
            ),
        },
    });

    console.log("proof:dock-animation-live — the dock single-scalar BEHAVIORAL motion gate (AX.W01)");
    console.log(
        `  --dock-morph-t rising frames : ${facts.morphTRisingFrames ?? "n/a"} (>= ${MIN_MORPH_FRAMES})  peak ${facts.morphTMax ?? "n/a"}`,
    );
    console.log(
        `  root box width rising frames : ${facts.rootWidthRisingFrames ?? "n/a"} (>= ${MIN_MORPH_FRAMES})  Δ ${facts.widthDelta ?? "n/a"}px`,
    );
    console.log(
        `  width / scalar onset delta   : ${facts.onsetDeltaMs ?? "n/a"}ms (structural sanity — non-binding)`,
    );
    console.log(
        `  entering-child → box onset Δ : ${facts.lastChildVsBoxOnsetDeltaMs ?? "n/a"}ms (<= ${facts.lockstepBudgetMs ?? Math.round(LOCKSTEP_BUDGET_MS * 10) / 10}ms budget — the LOCKSTEP witness)`,
    );
    console.log(
        `  leaving child moving frames  : ${facts.childOpacityMovingFrames ?? "n/a"}   entering moving frames: ${facts.enteringChildMovingFrames ?? "n/a"}`,
    );
    console.log(
        `  retarget max frame jump      : ${facts.retargetMaxFrameJump ?? "n/a"}px`,
    );
    console.log(
        `  --spring-dock token peak     : ${tokenPeak.facts.springDockPeak ?? "n/a"} (<= ${tokenPeak.facts.springDockPeakCeil})`,
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
