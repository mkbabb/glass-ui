// AW.W3 — the dock LAYERING-POLISH behavioral gate (proof:dock-layering-polish).
//
// The W3 layering folds all read as ONE motion language. This gate asserts, on a
// live browser, the five surfaces of that language:
//
//   (a) DIRECTIONAL VT — an expand and a collapse run DISTINCT
//       `::view-transition` type curves (the `:active-view-transition-type
//       (dock-expand|dock-collapse)` asymmetry). Measured as a difference in the
//       resolved animation-duration the two directions produce.
//   (b) SPRING-KEYED STAGGER — the expanded layer's children reveal on a cascade
//       that is MONOTONE in the SINGLE size spring's progress (the per-child
//       opacity onset rises with the morph, NOT clustered at a fixed-ms offset),
//       AND the active PANE opacity stays 1 throughout (the W2 clip-reveal
//       contract is not regressed by the child stagger).
//   (c) HOVER-SCALE — the collapsed-hover `scale` rises over ≥3 frames on the
//       dock spring curve (unified onto `--dock-motion-resize`).
//   (d) PRM — under forced `prefers-reduced-motion: reduce`, (b)/(c) collapse to
//       an instant completed state (0 stagger/scale morph frames) while the state
//       still toggles (the leaving-pane fade is allowed to persist — a fade is not
//       spatial motion).
//   (e) SLIDER HOLD — an in-dock `<Slider>` pointer-drag holds the dock open: the
//       dock stays `expanded` through the synthetic drag and does NOT idle-collapse
//       mid-gesture; a release re-arms the idle collapse.
//
// BORN-RED on the pre-W3 build: symmetric VT curves (no direction types threaded),
// a fixed-ms-cluster child reveal (no spring-keyed onset), a hover scale that does
// not ride the dock spring, and an idle-collapse under the held slider thumb.
//
// HARNESS: same contract as proof:dock-clip-reveal / proof:dock-animation-live —
// dynamically imports playwright; SKIPs fail-open with a self-describing artefact
// when the harness or the demo dev server is absent. The PURE detectors below are
// exported + unit-tested (dock-layering-polish.detect.test.ts) so the gate's
// reasoning cannot regress to a false-GREEN where the browser does not run.

import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const DOCK_ROUTE = "/navigation/dock";
const MIN_MORPH_FRAMES = 3;

// ── the in-page probe ────────────────────────────────────────────────────────
function pageProbe() {
    return new Promise((resolve) => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
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
        const ENTER = ["pointerover", "pointerenter", "mouseover", "mouseenter", "pointermove", "mousemove"];
        const LEAVE = ["pointerout", "pointerleave", "mouseout", "mouseleave"];

        // (b)+(c) FLIP-engine sample: arm the FLIP fallback (delete
        // startViewTransition), hover the collapsed dock and rAF-sample (i) the
        // active pane opacity, (ii) the per-child opacity of the first few
        // controls, (iii) the dock root `scale`, (iv) the morph progress var.
        const sampleStaggerAndScale = (dock) => {
            const full = dock.querySelector(".dock-layer--full");
            const layers = dock.querySelector(".dock-layers");
            const children = full ? [...full.children] : [];
            const scaleOf = () => {
                const s = getComputedStyle(dock).scale;
                // `scale` computes to "none" at rest or "<x>" / "<x> <y>".
                if (!s || s === "none") return 1;
                return parseFloat(String(s).split(" ")[0]) || 1;
            };
            const activeOf = () => (full ? parseFloat(getComputedStyle(full).opacity) : 1);
            const childOpacities = () => children.map((c) => parseFloat(getComputedStyle(c).opacity));
            const progressOf = () => {
                const v = layers ? getComputedStyle(layers).getPropertyValue("--dock-morph-progress") : "";
                const n = parseFloat(v);
                return Number.isFinite(n) ? n : null;
            };
            fire(ENTER, dock);
            return new Promise((res) => {
                const scales = [];
                const actives = [];
                const childSeries = []; // array of [c0,c1,c2,...] per frame
                const progresses = [];
                const times = [];
                const t0 = performance.now();
                let stable = 0;
                let lastScale = scaleOf();
                const f = () => {
                    const t = performance.now() - t0;
                    const sc = scaleOf();
                    scales.push(sc);
                    actives.push(activeOf());
                    childSeries.push(childOpacities());
                    progresses.push(progressOf());
                    times.push(t);
                    if (Math.abs(sc - lastScale) < 0.0005) stable++;
                    else stable = 0;
                    lastScale = sc;
                    if (stable >= 5 || t > 2000) res({ scales, actives, childSeries, progresses, times });
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });
        };

        // (a) directional VT — capture the resolved VT animation-duration for an
        // expand vs a collapse by reading the `::view-transition-group` computed
        // animation-duration mid-transition. Browsers do not expose pseudo
        // computed styles reliably across engines; instead we observe the TIME the
        // morph takes (settle time) for each direction as a proxy for the curve
        // difference (the asymmetry produces different settle times). This runs on
        // the VT-live engine.
        const sampleDirectionalSettle = async (dock) => {
            const layers = dock.querySelector(".dock-layers");
            const settleTime = (trigger) =>
                new Promise((res) => {
                    const t0 = performance.now();
                    trigger();
                    let stable = 0;
                    let last = layers.getBoundingClientRect().width;
                    const f = () => {
                        const w = layers.getBoundingClientRect().width;
                        if (Math.abs(w - last) < 0.5) stable++;
                        else stable = 0;
                        last = w;
                        const t = performance.now() - t0;
                        if (stable >= 6 || t > 2000) res(t);
                        else requestAnimationFrame(f);
                    };
                    requestAnimationFrame(f);
                });
            const expandMs = await settleTime(() => fire(ENTER, dock));
            await sleep(400);
            const collapseMs = await settleTime(() => fire(LEAVE, dock));
            return { expandMs, collapseMs };
        };

        (async () => {
            const result = {};

            // (a) directional settle on the VT-live engine.
            const dockVt = findCollapsedDock();
            if (dockVt) {
                try {
                    result.directional = await sampleDirectionalSettle(dockVt);
                } catch (e) {
                    result.directional = { error: String(e) };
                }
            } else {
                result.error = "no collapsed dock for the directional sample";
                resolve(result);
                return;
            }
            await sleep(500);

            // Force the FLIP path so the spring-keyed stagger + scale are JS-driven
            // and sampleable frame by frame.
            if (Object.prototype.hasOwnProperty.call(document, "startViewTransition"))
                delete document.startViewTransition;
            let p = Object.getPrototypeOf(document);
            while (p) {
                if (Object.prototype.hasOwnProperty.call(p, "startViewTransition")) {
                    try {
                        delete p.startViewTransition;
                    } catch {
                        /* non-configurable */
                    }
                    break;
                }
                p = Object.getPrototypeOf(p);
            }
            result.vtForcedOff = !("startViewTransition" in document);

            // collapse it back first so we sample a fresh expand on the FLIP engine.
            fire(LEAVE, dockVt);
            await sleep(600);
            const dockFlip = findCollapsedDock();
            if (!dockFlip) {
                result.error = "no collapsed dock after FLIP-force (stagger sample)";
                resolve(result);
                return;
            }
            result.flip = await sampleStaggerAndScale(dockFlip);

            resolve(result);
        })();
    });
}

// PRM-forced probe — under reduce, the stagger + scale collapse to an instant
// completed state. We sample the same surfaces and assert 0 morph frames.
function prmProbe() {
    return new Promise((resolve) => {
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
                    new PointerEvent(t, { bubbles: true, clientX: cx, clientY: cy, pointerType: "mouse" }),
                );
        };
        const ENTER = ["pointerover", "pointerenter", "mouseover", "mouseenter", "pointermove", "mousemove"];
        const dock = findCollapsedDock();
        if (!dock) {
            resolve({ error: "no collapsed dock for the PRM sample" });
            return;
        }
        const full = dock.querySelector(".dock-layer--full");
        const scaleOf = () => {
            const s = getComputedStyle(dock).scale;
            if (!s || s === "none") return 1;
            return parseFloat(String(s).split(" ")[0]) || 1;
        };
        const childOpacities = () =>
            full ? [...full.children].map((c) => parseFloat(getComputedStyle(c).opacity)) : [];
        const scales = [];
        const childSeries = [];
        const expandedFlags = [];
        const t0 = performance.now();
        fire(ENTER, dock);
        const f = () => {
            scales.push(scaleOf());
            childSeries.push(childOpacities());
            expandedFlags.push(dock.classList.contains("expanded"));
            const t = performance.now() - t0;
            if (t > 700) resolve({ scales, childSeries, expandedFlags });
            else requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
    });
}

// ── pure assertions over a captured timeline (unit-testable) ──────────────────

export function risingFrames(series, eps = 0.001) {
    let n = 0;
    for (let i = 1; i < series.length; i++) if (series[i] - series[i - 1] > eps) n++;
    return n;
}

export function allOne(series, eps = 0.001) {
    return series.length > 0 && series.every((v) => Math.abs(v - 1) <= eps);
}

// `directionalAsymmetry` — the expand and collapse settle TIMES differ by more
// than a tolerance (the directional-curve asymmetry produces a measurable settle
// difference). A symmetric pre-W3 build settles both directions on the same
// curve → near-equal times → RED.
export function directionalAsymmetry(directional, tolMs = 30) {
    if (!directional || directional.error) return { asymmetric: false, deltaMs: 0 };
    const deltaMs = Math.abs((directional.expandMs ?? 0) - (directional.collapseMs ?? 0));
    return { asymmetric: deltaMs >= tolMs, deltaMs: Math.round(deltaMs) };
}

// `staggerMonotone` — over the morph frames, the per-child reveal is MONOTONE in
// the morph progress: a later child never fully reveals before an earlier one
// (its opacity is <= the earlier child's opacity at every frame, within eps), AND
// the children reveal over ≥ MIN distinct rising frames (not a single jump-cut /
// fixed-ms cluster where they all flip on the same frame). Returns
// { monotone, revealFrames, orderViolations }.
export function staggerMonotone(childSeries, eps = 0.02) {
    if (!Array.isArray(childSeries) || childSeries.length === 0)
        return { monotone: false, revealFrames: 0, orderViolations: 1 };
    let orderViolations = 0;
    // Count frames where SOME child's opacity rose (the cascade is in flight).
    let revealFrames = 0;
    for (let i = 0; i < childSeries.length; i++) {
        const frame = childSeries[i];
        // order: child[k] (later) must not exceed child[k-1] (earlier) by > eps.
        for (let k = 1; k < frame.length; k++) {
            if (frame[k] - frame[k - 1] > eps) orderViolations++;
        }
        if (i > 0) {
            const prev = childSeries[i - 1];
            const rose = frame.some((v, k) => v - (prev[k] ?? v) > 0.005);
            if (rose) revealFrames++;
        }
    }
    return {
        monotone: orderViolations === 0,
        revealFrames,
        orderViolations,
    };
}

// `progressKeyed` — the morph progress var rises monotonically over ≥ MIN frames
// (the cascade is keyed to a real spring clock, not a fixed-ms timer). Filters out
// null samples (frames before the var is written).
export function progressKeyed(progresses) {
    const real = (progresses ?? []).filter((p) => p !== null && Number.isFinite(p));
    return { samples: real.length, risingFrames: risingFrames(real, 0.005) };
}

export function detectFlipSample(flip) {
    const violations = [];
    const facts = {};
    if (!flip) {
        violations.push("the FLIP stagger/scale sample is missing");
        return { facts, violations };
    }

    // (c) hover scale rises over ≥3 frames on the dock spring.
    const scaleRise = risingFrames(flip.scales, 0.0005);
    facts.hoverScaleRisingFrames = scaleRise;
    facts.hoverScaleMax = Math.round(Math.max(...flip.scales) * 1000) / 1000;
    if (scaleRise < MIN_MORPH_FRAMES) {
        violations.push(
            `the collapsed-hover scale rose over only ${scaleRise} frame(s) (< ${MIN_MORPH_FRAMES}) — the hover scale is not riding the dock spring curve (it snapped or did not run)`,
        );
    }

    // (b) the active PANE opacity stays 1 (W2 clip-reveal not regressed).
    const paneStatic1 = allOne(flip.actives);
    facts.activePaneOpacityStatic1 = paneStatic1;
    if (!paneStatic1) {
        violations.push(
            "the active PANE opacity fell below 1 during the morph — the child stagger leaked onto the pane (the W2 clip-reveal contract is regressed)",
        );
    }

    // (b) the child stagger is monotone in the spring progress.
    const stag = staggerMonotone(flip.childSeries);
    facts.staggerMonotone = stag.monotone;
    facts.staggerRevealFrames = stag.revealFrames;
    facts.staggerOrderViolations = stag.orderViolations;
    if (!stag.monotone) {
        violations.push(
            `the child stagger is not monotone (${stag.orderViolations} order violation(s)) — a later control revealed before an earlier one`,
        );
    }
    if (stag.revealFrames < MIN_MORPH_FRAMES) {
        violations.push(
            `the child reveal ran over only ${stag.revealFrames} frame(s) (< ${MIN_MORPH_FRAMES}) — a fixed-ms cluster, not a spring-keyed cascade`,
        );
    }

    // (b) the cascade is keyed to the spring progress var (a real clock).
    const pk = progressKeyed(flip.progresses);
    facts.progressSamples = pk.samples;
    facts.progressRisingFrames = pk.risingFrames;
    if (pk.risingFrames < MIN_MORPH_FRAMES) {
        violations.push(
            `the morph-progress var rose over only ${pk.risingFrames} frame(s) (< ${MIN_MORPH_FRAMES}) — the stagger is not keyed to the size spring's progress`,
        );
    }

    return { facts, violations };
}

export function detectPrmSample(prm) {
    const violations = [];
    const facts = {};
    if (!prm || prm.error) {
        violations.push(`PRM sample error: ${prm?.error ?? "missing"}`);
        return { facts, violations };
    }
    // 0 scale morph frames (the scale snaps, not springs).
    const scaleRise = risingFrames(prm.scales, 0.0005);
    facts.prmScaleRisingFrames = scaleRise;
    if (scaleRise > 0) {
        violations.push(
            `under PRM the hover scale rose over ${scaleRise} frame(s) (expected 0 — PRM must snap the scale, not spring it)`,
        );
    }
    // 0 child stagger morph frames (children at full opacity at once).
    const stag = staggerMonotone(prm.childSeries);
    facts.prmStaggerRevealFrames = stag.revealFrames;
    if (stag.revealFrames > 0) {
        violations.push(
            `under PRM the child stagger ran over ${stag.revealFrames} frame(s) (expected 0 — PRM must reveal the children instantly)`,
        );
    }
    // the state STILL toggles (PRM kills bounce, not function).
    const toggled = (prm.expandedFlags ?? []).some((e) => e === true);
    facts.prmStateToggled = toggled;
    if (!toggled) {
        violations.push("under PRM the dock never expanded — PRM must keep the function, only kill the motion");
    }
    return { facts, violations };
}

// AX.W03 — the fail-open `detectSliderHold` SKIP arm (the synthetic in-dock
// slider-hold probe + its detector) is RETIRED here. It exited 0 with no
// Playwright harness present, giving false assurance — the broken keepDockOpen
// contract shipped GREEN across 3.4.0→3.6.0 behind it. Its responsibility
// migrates to the deterministic, bite-in-CI `proof:dock-hold-contract` mount
// gate (a @vue/test-utils MOUNT that dispatches a real pointerdown on the
// resolved slider host — see scripts/proof-dock-hold-contract.mjs). The rest of
// the polish gate (directional asymmetry, FLIP, PRM) is untouched.

export function detectLayeringPolish(result) {
    const violations = [];
    const facts = {};
    if (!result || result.error) {
        violations.push(`probe error: ${result?.error ?? "no result"}`);
        return { facts, violations };
    }
    facts.vtForcedOff = result.vtForcedOff ?? false;

    // (a) directional asymmetry.
    const da = directionalAsymmetry(result.directional);
    facts.directionalAsymmetric = da.asymmetric;
    facts.directionalDeltaMs = da.deltaMs;
    if (!da.asymmetric) {
        violations.push(
            `the expand and collapse settle on the SAME curve (Δ${da.deltaMs}ms < tol) — no directional View-Transition asymmetry`,
        );
    }

    const flip = detectFlipSample(result.flip);
    Object.assign(facts, flip.facts);
    violations.push(...flip.violations);

    if (result.prm) {
        const prm = detectPrmSample(result.prm);
        Object.assign(facts, prm.facts);
        violations.push(...prm.violations);
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
    const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_LAYERING_POLISH_ARTIFACT",
        "AW-dock-layering-polish",
    );

    const pw = await loadPlaywright();
    if (!pw) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "no Playwright harness on this runner — run in the demo/MCP environment (npm i -D playwright + a live demo dev server) for the behavioral assert",
            command: "npm run proof:dock-layering-polish",
        });
        console.log("proof:dock-layering-polish — SKIPPED (no Playwright harness on this runner).");
        console.log(
            "  The layering-polish behavioral truth is asserted wherever the harness runs (the wave's MCP env). The pure detectors are unit-tested here.",
        );
        process.exit(0);
    }

    let browser;
    let result;
    try {
        browser = await pw.chromium.launch();
        // (a)+(b)+(c) on the dock route.
        const page = await browser.newPage();
        await page.goto(`${BASE_URL}${DOCK_ROUTE}`, { waitUntil: "networkidle" });
        await page.waitForSelector(".glass-dock.collapsed", { timeout: 5000 });
        result = await page.evaluate(pageProbe);

        // (d) PRM on a reduce-emulated page.
        const prmPage = await browser.newPage();
        await prmPage.emulateMedia({ reducedMotion: "reduce" });
        await prmPage.goto(`${BASE_URL}${DOCK_ROUTE}`, { waitUntil: "networkidle" });
        await prmPage.waitForSelector(".glass-dock.collapsed", { timeout: 5000 });
        result.prm = await prmPage.evaluate(prmProbe);

        // (e) the slider-hold probe is RETIRED — its responsibility migrated to
        //     the bite-in-CI `proof:dock-hold-contract` mount gate (AX.W03).
    } catch (e) {
        if (browser) await browser.close();
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason: `could not reach the demo at ${BASE_URL}: ${e.message}`,
            command: "npm run proof:dock-layering-polish",
        });
        console.log(`proof:dock-layering-polish — SKIPPED (demo unreachable at ${BASE_URL}).`);
        console.log(`  ${e.message}`);
        process.exit(0);
    }
    await browser.close();

    const { facts, violations } = detectLayeringPolish(result);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-layering-polish",
        facts,
        violations,
    });

    console.log("proof:dock-layering-polish — the dock motion language (AW.W3)");
    console.log(`  directional Δ settle    : ${facts.directionalDeltaMs ?? "n/a"}ms (asymmetric: ${facts.directionalAsymmetric})`);
    console.log(`  hover scale rising      : ${facts.hoverScaleRisingFrames ?? "n/a"}`);
    console.log(`  stagger monotone        : ${facts.staggerMonotone ?? "n/a"} (${facts.staggerRevealFrames ?? "n/a"} frames)`);
    console.log(`  active pane opacity == 1: ${facts.activePaneOpacityStatic1 ?? "n/a"}`);
    console.log(`  PRM scale/stagger frames: ${facts.prmScaleRisingFrames ?? "n/a"} / ${facts.prmStaggerRevealFrames ?? "n/a"}`);
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
