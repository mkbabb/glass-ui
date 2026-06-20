// AY.W-DOCK1 — the dock items-lag CAPTURE HARNESS (proof:dock-items-lag-capture).
//
// This is the VERIFY-OR-FALSIFY instrument for the SIGNATURE recurring complaint
// (PROMPT-CORPUS #5 / AUDIT-LEDGER #5, CHRONIC across keyframes.js → AX → AY):
//   "the dock will shrink first, and THEN the items will start shrinking a few ms
//    later."
//
// The lockstep is SOLVED-BY-CONSTRUCTION (ONE `--dock-morph-t` scalar drives box +
// child stagger, dockMorphContext.ts) and live-gated — but every "live-verified"
// dock DELTA on disk is a STILL FRAME; the TEMPORAL desync the user reports was
// NEVER captured. So this harness does NOT rebuild solved architecture. It CAPTURES
// the live frame-series on ONE timeline and records, IN MS, whether the box leads
// its inner content — and by how much, against the deliberate per-child stagger
// budget the architecture ships.
//
// WHAT IT MEASURES (the entering-child onset the user perceives — the property the
// existing proof:dock-animation-live gate samples a LEAVING child for and never
// asserts, H-dock §D1 / §D6):
//   On ONE `performance.now()` clock, per condition, it rAF-samples:
//     (a) the dock ROOT `getBoundingClientRect().width`
//     (b) `getComputedStyle(root).getPropertyValue("--dock-morph-t")`
//     (c) the LAST entering `.dock-layer--full > *` child's opacity (the largest
//         stagger onset — the 6th-cap child; here the 4th/last control)
//   and computes, reusing the proof-dock-animation-live.mjs `onsetTimeMs` helper:
//     boxWidthOnsetMs, morphTOnsetMs, lastEnteringChildOnsetMs, and the derived
//     childVsBoxOnsetDeltaMs = lastEnteringChildOnsetMs − boxWidthOnsetMs.
//
// THREE conditions × 2 viewports (desktop 1440×900, mobile 390×844) × light/dark =
// 12 captures. A keyframe PNG saved at the morph midpoint of each. The per-condition
// frame-series + onset-delta land in the gate artefact; the keyframe PNG set lands
// in docs/tranches/AY/audit/visual/.
//
// THIS IS A CAPTURE INSTRUMENT, NOT A BUDGET GATE. A verify wave MEASURES; the impl
// wave (AY.W-DOCK2) gates. So this harness REDS only on a CAPTURE FAILURE (the
// entering child was never sampled — the D-A blind-spot would recur; or a series is
// frozen/empty so no real spring ran). It does NOT red on a particular onset-delta
// value — that number is the EVIDENCE the W-DOCK1-DELTA.md verdict reads. It reuses
// the existing pure helpers (onsetTimeMs / risingFrames / maxInterFrameJump) from
// proof-dock-animation-live.mjs, NOT a parallel re-roll (no-workaround).
//
// HARNESS shape mirrors proof-dock-animation-live.mjs: dynamic playwright import,
// fail-CLOSED when the π workspace is present + the demo unreachable, befitting-
// silent SKIP only on a genuine no-π-workspace device-absence.

import { resolve } from "node:path";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, liveArmCiGraceSkip, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { onsetTimeMs, risingFrames, maxInterFrameJump } from "./proof-dock-animation-live.mjs";

// The CORRECT collapsible-dock route (D-B: the prior gate's `/navigation/dock` route
// has NO collapsible dock — the demo router builds `/<category>/<story>`, and the
// collapsible `<GlassDock>` lives at `/dock/overview`).
const DOCK_ROUTE = "/dock/overview";
// The deterministic capture selector — the single COLLAPSIBLE GlassDock carries
// data-testid="dock-capture" (the slider dock in overview.vue), a plain
// root-forwarded data attr. We DELIBERATELY do NOT use the GlassDock
// `container-name` prop: it co-applies `container-type: inline-size`, which clamps
// the dock to its contained intrinsic size and BREAKS the collapse↔expand morph
// (the AT.W7 / 3.4.0 dock-collapse-vs-container-type interaction). A captured
// finding, recorded in W-DOCK1-DELTA.md §container-type-trap.
const DOCK_SELECTOR = '.glass-dock[data-testid="dock-capture"]';

// Capture matrix.
const VIEWPORTS = [
    { id: "desktop", width: 1440, height: 900 },
    { id: "mobile", width: 390, height: 844 },
];
const THEMES = ["light", "dark"];
const CONDITIONS = ["hover-expand", "click-collapse", "retarget"];

// The captured-real bar (a CAPTURE FAILURE, not a budget). A real spring rings over
// many rAF frames; the entering child stagger must MOVE for the sample to be a real
// witness (the D-A blind-spot: a frozen/empty child series means it was never
// sampled).
const MIN_MORPH_FRAMES = 5; // --dock-morph-t must rise over ≥5 frames (a real spring)
// The entering child opacity must MOVE over ≥2 frames on an EXPAND direction — a real
// witnessed stagger ramp, not a frozen/unsampled child. The floor is 2 (not 3): on a
// high-refresh display the small-content desktop dock's child opacity ramps 0→1 inside
// ~2 frames (the fast spring), which is STILL a captured stagger; the D-A blind-spot (a
// never-sampled child) is caught SEPARATELY by the `childSampled` null/empty guard.
const MIN_CHILD_MOVE_FRAMES = 2;
const EPS_T = 1e-4;
const EPS_W = 0.5;
const EPS_OPACITY = 0.01;

// ── the in-page probe (serialized into the browser) ───────────────────────────
// Holds the named dock by data-container-name, fires real pointer events, and
// rAF-samples width + --dock-morph-t + the LAST .dock-layer--full > * child opacity
// on ONE performance.now() timeline. Returns one of the three condition timelines.
function pageProbe(selector, condition) {
    return new Promise((resolve) => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const dock = document.querySelector(selector);
        if (!dock) {
            resolve({ error: `no dock matching ${selector}` });
            return;
        }
        // The LAST entering child of the EXPANDED pane (.dock-layer--full) — the
        // largest stagger onset, the property the user perceives lagging.
        const fullPane = () => dock.querySelector(".dock-layer--full");
        const lastChildOf = () => {
            const pane = fullPane();
            if (!pane) return null;
            const kids = pane.children;
            return kids.length ? kids[kids.length - 1] : null;
        };
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

        const wOf = () => dock.getBoundingClientRect().width;
        const tOf = () =>
            parseFloat(getComputedStyle(dock).getPropertyValue("--dock-morph-t")) || 0;
        const childOf = () => {
            const el = lastChildOf();
            return el ? parseFloat(getComputedStyle(el).opacity) : 0;
        };

        // rAF-sample one timeline until the box is stable for N frames (or timeout).
        // `awaitMorphStart`: defer the stability check until the morph has BEGUN
        // (`[data-morphing]` armed or the box moved) — needed for click-collapse where
        // an idle-collapse timer delays the morph onset, so a naive stability check
        // would resolve on the still-settled PRE-collapse dock.
        const sampleTimeline = ({
            stabilizeFrames = 5,
            timeoutMs = 2000,
            awaitMorphStart = false,
        } = {}) =>
            new Promise((res) => {
                const widths = [];
                const morphTs = [];
                const lastChildOpacities = [];
                const times = [];
                const t0 = performance.now();
                let stable = 0;
                let lastW = wOf();
                const W0 = lastW;
                let morphStarted = !awaitMorphStart;
                const f = () => {
                    const t = performance.now() - t0;
                    const w = wOf();
                    if (
                        !morphStarted &&
                        (dock.hasAttribute("data-morphing") || Math.abs(w - W0) > 2)
                    ) {
                        // Reset stability AND drop the pre-morph idle frames the moment
                        // the morph begins — the long idle wait (an idle-collapse timer)
                        // would otherwise (a) accumulate `stable` and resolve the timeline
                        // instantly at morph-onset, and (b) bloat the series with flat
                        // pre-morph noise that shifts the onset clock. The captured series
                        // starts ~one frame BEFORE the morph (this frame), so the onset is
                        // measured from the morph's own t≈0.
                        morphStarted = true;
                        stable = 0;
                        widths.length = 0;
                        morphTs.length = 0;
                        lastChildOpacities.length = 0;
                        times.length = 0;
                    }
                    widths.push(w);
                    morphTs.push(tOf());
                    lastChildOpacities.push(childOf());
                    times.push(t);
                    if (Math.abs(w - lastW) < 0.5) stable++;
                    else stable = 0;
                    lastW = w;
                    if ((morphStarted && stable >= stabilizeFrames) || t > timeoutMs)
                        res({ widths, morphTs, lastChildOpacities, times });
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });

        // The dock's idle-collapse timer (GlassDock collapseDelay) must elapse after a
        // LEAVE before the dock returns to its COLLAPSED resting baseline, AND the
        // morph spring must settle (the `--dock-morph-t` scalar back to its rest value
        // + `[data-morphing]` cleared) — a shorter wait samples a still-expanded or
        // mid-morph dock and reads a residual scalar at frame 0.
        const COLLAPSE_SETTLE_MS = 2600;
        const morphSettled = () =>
            !dock.hasAttribute("data-morphing") &&
            dock.classList.contains("collapsed");
        const waitCollapsed = async () => {
            const start = performance.now();
            while (!morphSettled() && performance.now() - start < COLLAPSE_SETTLE_MS) {
                await sleep(60);
            }
            // a beat past the settle so the spring fully clears the morph vars
            await sleep(150);
        };

        (async () => {
            // Always start from a clean COLLAPSED baseline — leave the dock, wait out
            // the idle-collapse timer, confirm the collapsed class.
            fire(LEAVE, dock);
            await waitCollapsed();

            if (condition === "hover-expand") {
                fire(ENTER, dock);
                const series = await sampleTimeline();
                resolve(series);
                return;
            }

            if (condition === "click-collapse") {
                // Expand first (hover), settle the expand morph, THEN leave and sample
                // the REVERSE ramp (the collapse — box shrinks, the reveal-stagger
                // reverses; the trailing child fades OUT). The collapse fires after the
                // dock's idle-collapse timer, so `awaitMorphStart` defers the stability
                // check until the box actually begins shrinking (else the sample
                // resolves on the still-expanded dock). The timeout covers the idle
                // delay + the collapse morph.
                fire(ENTER, dock);
                await sleep(900);
                fire(LEAVE, dock);
                const series = await sampleTimeline({
                    awaitMorphStart: true,
                    timeoutMs: 3000,
                });
                resolve(series);
                return;
            }

            if (condition === "retarget") {
                // Interrupt the morph ~40ms in and re-expand — sample the last child
                // too (the velocity-continuity case; the proof-dock-animation-live.mjs
                // :224-250 retarget pattern, here with the entering-child witness).
                const widths = [];
                const morphTs = [];
                const lastChildOpacities = [];
                const times = [];
                const t0 = performance.now();
                fire(ENTER, dock);
                await new Promise((res) => {
                    let interrupted = false;
                    const f = () => {
                        const t = performance.now() - t0;
                        widths.push(wOf());
                        morphTs.push(tOf());
                        lastChildOpacities.push(childOf());
                        times.push(t);
                        if (!interrupted && t > 35 && t < 60) {
                            fire(LEAVE, dock);
                            fire(ENTER, dock);
                            interrupted = true;
                        }
                        if (t > 900) res();
                        else requestAnimationFrame(f);
                    };
                    requestAnimationFrame(f);
                });
                resolve({ widths, morphTs, lastChildOpacities, times });
                return;
            }

            resolve({ error: `unknown condition ${condition}` });
        })();
    });
}

// ── the pure detector over ONE condition timeline → {facts, violations} ───────
// The onsets reuse the imported onsetTimeMs (no re-roll). childVsBoxOnsetDeltaMs is
// the binding measurement: the temporal gap, in ms, between the LAST entering child
// onset and the box-width onset.
export function detectCondition(series, condition) {
    const violations = [];
    const facts = { condition };
    if (!series || series.error) {
        violations.push(`${condition}: probe error: ${series?.error ?? "no series"}`);
        return { facts, violations };
    }
    const { widths, morphTs, lastChildOpacities, times } = series;
    if (
        !Array.isArray(widths) ||
        !Array.isArray(morphTs) ||
        !Array.isArray(lastChildOpacities) ||
        !widths.length
    ) {
        violations.push(`${condition}: incomplete timeline (empty width/morph/child series)`);
        return { facts, violations };
    }

    // --dock-morph-t must move over ≥MIN_MORPH_FRAMES frames (a real spring ran).
    const morphMoving = risingFrames(
        morphTs.map((t) => Math.abs(t - morphTs[0])),
        EPS_T,
    );
    facts.morphTMovingFrames = morphMoving;
    facts.morphTPeak = Math.round(Math.max(...morphTs) * 1000) / 1000;
    if (morphMoving < MIN_MORPH_FRAMES) {
        violations.push(
            `${condition}: --dock-morph-t moved over only ${morphMoving} frame(s) (< ${MIN_MORPH_FRAMES}) — the single-scalar spring did NOT run (frozen at ${morphTs[0]}); the capture is not a real morph`,
        );
    }

    // The trailing child opacity series — the D-A blind-spot guard. The child must be
    // SAMPLED (a real numeric series, not null/empty); the entering directions
    // (hover-expand / retarget) must additionally show the child opacity MOVE
    // (the deliberate per-child reveal stagger ramps it in). On COLLAPSE the trailing
    // child legitimately rides the box CLIP-aperture (its own opacity holds at 1 — the
    // active pane is statically opacity:1, revealed/concealed by the clip), so a flat
    // opacity series is a VALID captured observation there, NOT the blind-spot.
    const childSampled =
        lastChildOpacities.length > 0 &&
        lastChildOpacities.every((o) => o !== null && Number.isFinite(o));
    const childMoving = (function changing(s, eps) {
        let n = 0;
        for (let i = 1; i < s.length; i++) if (Math.abs(s[i] - s[i - 1]) > eps) n++;
        return n;
    })(lastChildOpacities, EPS_OPACITY);
    facts.lastChildSampled = childSampled;
    facts.lastChildMovingFrames = childMoving;
    facts.lastChildOpacityFrom = Math.round((lastChildOpacities[0] ?? 0) * 1000) / 1000;
    facts.lastChildOpacityTo =
        Math.round((lastChildOpacities[lastChildOpacities.length - 1] ?? 0) * 1000) / 1000;
    if (!childSampled) {
        violations.push(
            `${condition}: the LAST .dock-layer--full child was NOT sampled (null/empty opacity series) — the D-A blind-spot would recur`,
        );
    } else if (condition !== "click-collapse" && childMoving < MIN_CHILD_MOVE_FRAMES) {
        violations.push(
            `${condition}: the LAST entering .dock-layer--full child opacity moved over only ${childMoving} frame(s) (< ${MIN_CHILD_MOVE_FRAMES}) — the entering child reveal-stagger did not ramp (expected on an EXPAND direction)`,
        );
    }

    // The binding measurement: the onsets on ONE clock + the derived delta.
    const boxWidthOnsetMs = onsetTimeMs(widths, times, EPS_W);
    const morphTOnsetMs = onsetTimeMs(morphTs, times, EPS_T);
    facts.boxWidthOnsetMs = Math.round(boxWidthOnsetMs * 10) / 10;
    facts.morphTOnsetMs = Math.round(morphTOnsetMs * 10) / 10;

    // The trailing-child OPACITY onset is meaningful only when the child opacity
    // actually ramps (the EXPAND reveal-stagger). On COLLAPSE the trailing child rides
    // the box clip (opacity holds at 1), so its "opacity onset" is N/A — the box clip
    // conceals it, not its own opacity. Record the onset-delta only where it has a
    // defined meaning; the box↔scalar single-clock onset (below) is the load-bearing
    // lockstep witness in BOTH directions.
    const childOpacityRamps = childSampled && childMoving >= MIN_CHILD_MOVE_FRAMES;
    if (childOpacityRamps) {
        const lastEnteringChildOnsetMs = onsetTimeMs(
            lastChildOpacities,
            times,
            EPS_OPACITY,
        );
        const childVsBoxOnsetDeltaMs = lastEnteringChildOnsetMs - boxWidthOnsetMs;
        facts.lastEnteringChildOnsetMs = Math.round(lastEnteringChildOnsetMs * 10) / 10;
        facts.childVsBoxOnsetDeltaMs = Math.round(childVsBoxOnsetDeltaMs * 10) / 10;
    } else {
        facts.lastEnteringChildOnsetMs = null;
        facts.childVsBoxOnsetDeltaMs = null;
        facts.childOnsetNote =
            "trailing child rides the box clip-aperture (opacity held); the opacity-onset is N/A on this direction";
    }

    // The SINGLE-CLOCK lockstep witness (the architecture's core claim): the box width
    // and the `--dock-morph-t` scalar onset in the SAME frame (≤1 frame apart) — the
    // box rides the scalar, not a second timer. This is the load-bearing onset assert
    // in BOTH directions (it does not depend on the child opacity-stagger).
    const boxVsScalarOnsetMs = Math.abs(boxWidthOnsetMs - morphTOnsetMs);
    facts.boxVsScalarOnsetMs = Math.round(boxVsScalarOnsetMs * 10) / 10;

    // Every BOX/SCALAR onset must be FINITE (a real captured number, not NaN/null).
    for (const [k, v] of Object.entries({ boxWidthOnsetMs, morphTOnsetMs })) {
        if (!Number.isFinite(v)) {
            violations.push(`${condition}: ${k} is not finite (${v}) — the onset was not captured`);
        }
    }

    // The retarget velocity-continuity witness (NOTE only — not a budget here).
    if (condition === "retarget" && widths.length > 4) {
        const jump = maxInterFrameJump(widths);
        facts.retargetMaxFrameJump = Math.round(jump.max * 100) / 100;
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

// Whether a Playwright runner is INSTALLED (the fail-CLOSED device is present).
// Mirrors proof-dock-animation-live.mjs piWorkspacePresent: accept either the
// workspace-local OR the hoisted-root layout.
function piWorkspacePresent(ROOT) {
    const ws = resolve(ROOT, "tests-visual");
    const pkg = [
        resolve(ws, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "node_modules/@playwright/test/package.json"),
    ];
    return pkg.some(existsSync) || existsSync(resolve(ROOT, "node_modules/playwright/package.json"));
}

async function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
    const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_ITEMS_LAG_CAPTURE_ARTIFACT",
        "AY-dock-items-lag-capture",
    );
    const piPresent = piWorkspacePresent(ROOT);

    // liveArmCiGraceSkip(): under CI, skip the live capture arm (this is a CAPTURE wave;
    // the CI proof is the device-free union + the ledger) — the proof:dock-no-scale-pop
    // `!process.env.CI` precedent; the local hard path, CI unset, is untouched.
    const pw = liveArmCiGraceSkip() ? null : await loadPlaywright();
    if (!pw) {
        const status = "skipped";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason: "no Playwright harness reachable — the items-lag capture runs in the tests-visual π workspace (dock-items-lag-capture.spec.ts); this is a CAPTURE wave with no device-free arm",
            command: "npm run proof:dock-items-lag-capture",
            facts: { piWorkspacePresent: piPresent },
            violations: [],
        });
        console.log(
            "proof:dock-items-lag-capture — SKIPPED (no Playwright on this runner).",
        );
        console.log(
            "  The live frame-series capture is the tests-visual π workspace spec (dock-items-lag-capture.spec.ts).",
        );
        process.exit(0);
    }

    mkdirSync(VISUAL_DIR, { recursive: true });

    let browser;
    const captures = [];
    const violations = [];
    try {
        browser = await pw.chromium.launch();
        for (const viewport of VIEWPORTS) {
            for (const theme of THEMES) {
                const ctx = await browser.newContext({
                    viewport: { width: viewport.width, height: viewport.height },
                    deviceScaleFactor: 2,
                    colorScheme: theme === "dark" ? "dark" : "light",
                });
                const page = await ctx.newPage();
                // Force the readable spring path (remove startViewTransition before boot —
                // the proof-dock-animation-live.mjs init-script idiom) AND park the live
                // WebGL substrate FROM BOOT (AY.W-LIVE1 re-run-on-real fix).
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
                    // AY.W-LIVE1 — PARK the live Aurora/GooBlob WebGL substrate from BOOT.
                    // `/dock/overview` mounts a live `<Aurora>` whose per-frame GPU work
                    // (the macOS GL "GPU stall due to ReadPixels") keeps the page
                    // perpetually repainting — at the 390px mobile viewport that makes the
                    // capture dock flicker in/out of Playwright's `visible` check so
                    // `waitForSelector` times out, and a long rAF loop hangs the headless
                    // renderer. Reporting `document.hidden = true` at boot makes the
                    // SHIPPED offscreen-pause seam (`createCanvasLifecycle` reads
                    // `document.hidden` at mount, line ~169) start the WebGL loop
                    // SUSPENDED. The dock morph is a SEPARATE `SpringProgress` rAF
                    // (`dockMorphContext.ts`) that does NOT key off page visibility (only
                    // `respectReducedMotion`), so the collapse↔expand spring this harness
                    // captures rings unchanged while the aurora parks. NOT a PRM emulation
                    // (PRM would snap the morph and break the real-spring assert) —
                    // visibility-park only.
                    try {
                        Object.defineProperty(document, "hidden", {
                            configurable: true,
                            get: () => true,
                        });
                        Object.defineProperty(document, "visibilityState", {
                            configurable: true,
                            get: () => "hidden",
                        });
                    } catch {
                        /* non-configurable on some engines — best-effort */
                    }
                });
                // `domcontentloaded`, NOT `networkidle`: `/dock/overview` carries the
                // live aurora/blob WebGL substrate whose continuous rAF + asset
                // streaming keeps the network from ever idling, so `networkidle` stalls
                // the navigation. The capture dock selector wait (below) is the real
                // readiness gate.
                await page.goto(`${BASE_URL}${DOCK_ROUTE}`, { waitUntil: "domcontentloaded" });
                // The .dark class is the library's dark switch (colorScheme alone does
                // not flip the token cascade — the @variant dark keys off .dark).
                if (theme === "dark") {
                    await page.evaluate(() => document.documentElement.classList.add("dark"));
                } else {
                    await page.evaluate(() => document.documentElement.classList.remove("dark"));
                }
                // AY.W-LIVE1 — re-fire `visibilitychange` post-boot so the substrate
                // suspends even if it mounted before reading the boot-time `document.hidden`
                // (the init-script defines the getter, this dispatch nudges the listener).
                await page.evaluate(() => {
                    try {
                        document.dispatchEvent(new Event("visibilitychange"));
                    } catch {
                        /* best-effort */
                    }
                });
                await page.waitForSelector(DOCK_SELECTOR, { timeout: 8000 });
                // Bring the capture dock into the viewport — an off-fold dock's FLIP
                // measurement + spring can mis-seat (the AY.W-DOCK1 capture must hold a
                // VISIBLE, laid-out dock). With the aurora parked from boot the layout is
                // stable, so `scrollIntoViewIfNeeded` settles instead of timing out.
                await page.locator(DOCK_SELECTOR).scrollIntoViewIfNeeded();
                await page.waitForTimeout(400);

                for (const condition of CONDITIONS) {
                    // Inject the probe FUNCTION body into the page (it is a closure, so
                    // serialize via toString() + rebuild — page.evaluate already passes
                    // the source string across the boundary).
                    const series = await page.evaluate(
                        ({ sel, cond, fn }) => {
                            // eslint-disable-next-line no-new-func
                            const probe = new Function(`return (${fn})`)();
                            return probe(sel, cond);
                        },
                        { sel: DOCK_SELECTOR, cond: condition, fn: pageProbe.toString() },
                    );

                    const { facts, violations: condViolations } = detectCondition(
                        series,
                        condition,
                    );
                    violations.push(...condViolations);

                    // Drive the morph again and screenshot at the midpoint for the
                    // keyframe PNG (a fresh re-trigger so the morph is mid-flight when
                    // the shot fires).
                    const pngName = `W-DOCK1-dock-overview-${condition}-${viewport.id}-${theme}.png`;
                    const pngPath = resolve(VISUAL_DIR, pngName);
                    try {
                        await captureMidpointFrame(page, DOCK_SELECTOR, condition);
                        await page.screenshot({ path: pngPath });
                    } catch (e) {
                        violations.push(
                            `${condition} ${viewport.id} ${theme}: keyframe PNG capture failed: ${e.message}`,
                        );
                    }

                    captures.push({
                        condition,
                        viewport: viewport.id,
                        theme,
                        png: pngName,
                        facts,
                        timeline: {
                            times: series?.times?.map((t) => Math.round(t * 10) / 10),
                            widths: series?.widths?.map((w) => Math.round(w * 100) / 100),
                            morphTs: series?.morphTs?.map((t) => Math.round(t * 1000) / 1000),
                            lastChildOpacities: series?.lastChildOpacities?.map(
                                (o) => Math.round(o * 1000) / 1000,
                            ),
                        },
                    });
                }
                await ctx.close();
            }
        }
    } catch (e) {
        if (browser) await browser.close();
        const reason = `could not capture the dock items-lag frame-series at ${BASE_URL}${DOCK_ROUTE}: ${e.message}`;
        const failClosed = piPresent;
        const vs = failClosed
            ? [`${reason} — the π workspace is PRESENT (fail-CLOSED), so an unreachable live capture is a hard RED, not a SKIP`]
            : [];
        const status = vs.length ? "fail" : "skipped";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason,
            command: "npm run proof:dock-items-lag-capture",
            facts: { piWorkspacePresent: piPresent },
            violations: vs,
        });
        console.log(
            `proof:dock-items-lag-capture — ${failClosed ? "FAIL (π present, demo unreachable — fail-CLOSED)" : "SKIPPED (no π workspace; demo unreachable)"} at ${BASE_URL}${DOCK_ROUTE}.`,
        );
        console.log(`  ${e.message}`);
        process.exit(status === "fail" ? 1 : 0);
    }
    await browser.close();

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-items-lag-capture",
        facts: {
            piWorkspacePresent: piPresent,
            route: DOCK_ROUTE,
            selector: DOCK_SELECTOR,
            captureCount: captures.length,
            staggerBudget: {
                windowSize: 0.55,
                note: "src/styles/dock/layers.css:235 --dock-stagger-window-size default 0.55; per-child onset = --dock-stagger-step × (childIndex−1), capped at child 6 (×5). The last entering child reveals at expand-t ≈ window + step×(n−1).",
            },
        },
        violations,
        captures,
    });

    console.log(
        "proof:dock-items-lag-capture — the dock items-lag CAPTURE harness (AY.W-DOCK1)",
    );
    console.log(`  route                 : ${DOCK_ROUTE}`);
    console.log(`  selector              : ${DOCK_SELECTOR}`);
    console.log(`  captures              : ${captures.length} (3 conditions × 2 viewports × 2 themes)`);
    console.log("");
    console.log(
        "  condition / viewport / theme    child→box Δ(ms)   box↔scalar Δ(ms)   morphT frames   child frames",
    );
    for (const c of captures) {
        const f = c.facts;
        const childDelta = f.childVsBoxOnsetDeltaMs == null ? "N/A" : String(f.childVsBoxOnsetDeltaMs);
        console.log(
            `  ${(c.condition + " / " + c.viewport + " / " + c.theme).padEnd(30)} ${childDelta.padStart(13)}   ${String(f.boxVsScalarOnsetMs ?? "n/a").padStart(14)}   ${String(f.morphTMovingFrames ?? "n/a").padStart(13)}   ${String(f.lastChildMovingFrames ?? "n/a").padStart(11)}`,
        );
    }
    if (violations.length) {
        console.log("\nCAPTURE VIOLATIONS (a capture failure, not a budget):");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    console.log(
        "  This is a CAPTURE wave — it records the onset-delta number; the VERDICT (lag present/absent)",
    );
    console.log(
        "  is read in docs/tranches/AY/audit/visual/W-DOCK1-DELTA.md against the layers.css stagger budget.",
    );
    process.exit(status === "pass" ? 0 : 1);
}

// Re-drive the morph and freeze the shot at its midpoint (--dock-morph-t ≈ 0.5).
async function captureMidpointFrame(page, selector, condition) {
    await page.evaluate(
        ([sel, cond]) => {
            const dock = document.querySelector(sel);
            if (!dock) return;
            const r = dock.getBoundingClientRect();
            const cx = r.x + r.width / 2;
            const cy = r.y + r.height / 2;
            const fire = (types) => {
                for (const t of types)
                    dock.dispatchEvent(
                        new PointerEvent(t, {
                            bubbles: true,
                            clientX: cx,
                            clientY: cy,
                            pointerType: "mouse",
                        }),
                    );
            };
            const ENTER = ["pointerover", "pointerenter", "mouseover", "mouseenter", "pointermove"];
            const LEAVE = ["pointerout", "pointerleave", "mouseout", "mouseleave"];
            if (cond === "click-collapse") {
                // expand first (the morph to capture is the reverse collapse ramp)
                fire(ENTER);
            } else {
                // leave so the idle-collapse timer returns the dock to its collapsed
                // resting baseline (the morph to capture is the expand ramp)
                fire(LEAVE);
            }
        },
        [selector, condition],
    );
    // settle the pre-state: an expand is fast (~600ms), a collapse must wait out the
    // idle-collapse timer (GlassDock collapseDelay default 2000ms).
    await page.waitForTimeout(condition === "click-collapse" ? 700 : 2400);
    await page.evaluate(
        ([sel, cond]) => {
            const dock = document.querySelector(sel);
            if (!dock) return;
            const r = dock.getBoundingClientRect();
            const cx = r.x + r.width / 2;
            const cy = r.y + r.height / 2;
            const fire = (types) => {
                for (const t of types)
                    dock.dispatchEvent(
                        new PointerEvent(t, {
                            bubbles: true,
                            clientX: cx,
                            clientY: cy,
                            pointerType: "mouse",
                        }),
                    );
            };
            const ENTER = ["pointerover", "pointerenter", "mouseover", "mouseenter", "pointermove"];
            const LEAVE = ["pointerout", "pointerleave", "mouseout", "mouseleave"];
            fire(cond === "click-collapse" ? LEAVE : ENTER);
        },
        [selector, condition],
    );
    // poll for --dock-morph-t to cross the midpoint, then shoot immediately
    await page.evaluate(
        (sel) =>
            new Promise((res) => {
                const dock = document.querySelector(sel);
                const t0 = performance.now();
                const f = () => {
                    const t =
                        parseFloat(getComputedStyle(dock).getPropertyValue("--dock-morph-t")) || 0;
                    if ((t >= 0.4 && t <= 0.7) || performance.now() - t0 > 600) res();
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            }),
        selector,
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
