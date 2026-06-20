// AW.W2 — the dock CLIP-REVEAL behavioral gate (proof:dock-clip-reveal).
//
// The headline gate for the clip-reveal one-clock morph: the box IS the reveal
// aperture. Content is laid out ONCE at its natural size behind the aperture and
// is UNCOVERED as the box grows — there is ZERO opacity authority on the active
// pane (it is statically opacity:1) and the content box is clipped by the
// shrinking/growing aperture (it never paints at full size past a half-collapsed
// box). This gate measures painted frames and asserts both invariants on BOTH
// engines (FLIP + VT) and BOTH orientations.
//
// BORN-RED on the 3.3.0 `overflow:hidden` + active-opacity-fade model: a frame
// exists where the active pane's opacity < 1 while the box is still wide (the
// "content fades, not revealed" tell). GREEN once the active-pane opacity
// transition is deleted (the aperture reveals) and the single-axis
// `overflow:clip` gated on `data-morphing` holds the aperture through the morph.
//
// HARNESS: a Playwright driver (same contract as proof:dock-animation-live).
// glass-ui carries ZERO browser dependency, so this gate dynamically imports
// `playwright`/`playwright-core` and runs ONLY when that harness AND a live demo
// dev server are present (the wave's MCP environment). When the harness is absent
// it exits SKIPPED with a self-describing artefact — never a false GREEN, never a
// hard RED on a missing optional harness. The PURE detectors below are exported
// and unit-tested (dock-clip-reveal.detect.test.ts) so the gate's reasoning
// cannot regress to a false-GREEN even where the browser does not run.
//
// House style mirrors proof-dock-animation-live.mjs: ESM .mjs, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on a real
// behavioral violation (0 on pass or harness-absent skip).

import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, liveArmCiGraceSkip, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const DOCK_ROUTE = "/navigation/dock";
const MIN_MORPH_FRAMES = 3;
// The aperture-clip tolerance: the rendered (visible) content width must track
// min(natural, aperture) within this many px (sub-pixel rounding + the box's own
// padding). A content box that paints at full natural width while the aperture is
// far narrower exceeds this — the "content spills past a half-collapsed box" tell.
const CLIP_TOLERANCE_PX = 2;

// ── the in-page probe ────────────────────────────────────────────────────────
// Serialized into the browser. Samples, across an expand morph: (a) the active
// pane opacity every frame, (b) the dock box (aperture) width and the active
// pane's CONTENT scrollWidth (its natural laid-out width) every frame. Runs once
// with VT live (native engine) and once with VT forced off (FLIP engine).
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

        // Sample one expand morph: active-pane opacity + (aperture width, content
        // natural width) per frame. `apertureOf` is the dock's own clip box; the
        // content natural width is the active pane's scrollWidth (its laid-out
        // max-content width independent of the clip).
        const sampleClipReveal = (dock) => {
            const full = dock.querySelector(".dock-layer--full");
            const layers = dock.querySelector(".dock-layers");
            const apertureOf = () => dock.getBoundingClientRect().width;
            const visibleOf = () => layers.getBoundingClientRect().width;
            const naturalOf = () => (full ? full.scrollWidth : 0);
            const activeOf = () => parseFloat(getComputedStyle(full).opacity);
            const A0 = apertureOf();
            fire(ENTER, dock);
            return new Promise((res) => {
                const apertures = [];
                const visibles = [];
                const naturals = [];
                const activeOpacities = [];
                const times = [];
                const t0 = performance.now();
                let stable = 0;
                let lastA = A0;
                const f = () => {
                    const t = performance.now() - t0;
                    const a = apertureOf();
                    apertures.push(a);
                    visibles.push(visibleOf());
                    naturals.push(naturalOf());
                    activeOpacities.push(activeOf());
                    times.push(t);
                    if (Math.abs(a - lastA) < 0.5) stable++;
                    else stable = 0;
                    lastA = a;
                    if (stable >= 4 || t > 2000)
                        res({ apertures, visibles, naturals, activeOpacities, times });
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });
        };

        (async () => {
            const result = {};

            // (1) VT-live engine (native): sample the morph with the browser-owned
            // View-Transition running.
            const dockVt = findCollapsedDock();
            if (dockVt) {
                result.vt = await sampleClipReveal(dockVt);
            } else {
                result.error = "no collapsed dock for the VT sample";
                resolve(result);
                return;
            }
            await sleep(500);

            // Force the FLIP path: remove startViewTransition from the chain.
            if (Object.prototype.hasOwnProperty.call(document, "startViewTransition"))
                delete document.startViewTransition;
            let p = Object.getPrototypeOf(document);
            while (p) {
                if (Object.prototype.hasOwnProperty.call(p, "startViewTransition")) {
                    try {
                        delete p.startViewTransition;
                    } catch {
                        /* non-configurable — FLIP forcing may not apply */
                    }
                    break;
                }
                p = Object.getPrototypeOf(p);
            }
            result.vtForcedOff = !("startViewTransition" in document);

            // Re-mount so the composable reads NATIVE_VT=false.
            clickLink("/navigation/tabs");
            await sleep(450);
            clickLink("/navigation/dock");
            await sleep(450);

            const dockFlip = findCollapsedDock();
            if (!dockFlip) {
                result.error = "no collapsed dock after re-mount (FLIP sample)";
                resolve(result);
                return;
            }
            result.flip = await sampleClipReveal(dockFlip);

            resolve(result);
        })();
    });
}

// ── pure assertions over a captured timeline (unit-testable) ──────────────────

// `allOne` — every active-pane opacity sample equals 1 within eps (the aperture
// REVEALS the active pane; it never fades). A single frame < 1 while the box is
// still mid-morph is the born-RED "content fades, not revealed" tell.
export function allOne(series, eps = 0.001) {
    return series.length > 0 && series.every((v) => Math.abs(v - 1) <= eps);
}

// `clipFrames` — counts frames where the VISIBLE (clipped) content width tracks
// `min(natural, aperture)` within tolerance: the content box is clipped by the
// aperture, never painting at full natural width past a narrower box. Returns
// { clipped, spilled } counts.
export function clipFrames(apertures, visibles, naturals, tol = CLIP_TOLERANCE_PX) {
    let clipped = 0;
    let spilled = 0;
    for (let i = 0; i < apertures.length; i++) {
        const aperture = apertures[i];
        const visible = visibles[i];
        const natural = naturals[i] || 0;
        const expected = Math.min(natural || aperture, aperture);
        // The visible content cannot exceed the aperture by more than tol (the
        // clip holds it); a far-larger visible width means content spilled.
        if (visible <= aperture + tol) clipped++;
        // A "spill" is content painting markedly WIDER than the aperture while
        // the natural width exceeds the aperture (i.e. there IS something to clip).
        else if (natural > aperture + tol && visible > expected + tol) spilled++;
    }
    return { clipped, spilled };
}

// The pure detector over a single-engine sample — returns {facts, violations}.
export function detectEngineSample(label, sample) {
    const violations = [];
    const facts = {};
    if (!sample || !Array.isArray(sample.activeOpacities)) {
        violations.push(`${label}: the clip-reveal sample is missing`);
        return { facts, violations };
    }

    // (a) The active pane is statically opacity:1 across EVERY morph frame.
    const active1 = allOne(sample.activeOpacities);
    facts[`${label}ActiveOpacityStatic1`] = active1;
    facts[`${label}ActiveOpacityMin`] =
        Math.round(Math.min(...sample.activeOpacities) * 1000) / 1000;
    if (!active1) {
        violations.push(
            `${label}: the active pane opacity fell below 1 (min ${facts[`${label}ActiveOpacityMin`]}) during the morph — content FADES instead of being REVEALED by the aperture (the clip-reveal contract)`,
        );
    }

    // (b) The aperture actually morphs (a frozen box has no aperture to reveal
    // through — this also guards against a misread on a non-morphing dock).
    const apertureSpan =
        Math.max(...sample.apertures) - Math.min(...sample.apertures);
    facts[`${label}ApertureSpanPx`] = Math.round(apertureSpan * 100) / 100;
    let rises = 0;
    for (let i = 1; i < sample.apertures.length; i++)
        if (sample.apertures[i] - sample.apertures[i - 1] > 0.5) rises++;
    facts[`${label}ApertureRisingFrames`] = rises;
    if (rises < MIN_MORPH_FRAMES) {
        violations.push(
            `${label}: the aperture morphed over only ${rises} rising frame(s) (< ${MIN_MORPH_FRAMES}) — the box did not open, so the clip-reveal cannot be measured (a frozen / snapped morph)`,
        );
    }

    // (c) The content box is CLIPPED by the aperture across the morph (it never
    // paints at full natural width past a narrower box).
    const { clipped, spilled } = clipFrames(
        sample.apertures,
        sample.visibles,
        sample.naturals,
    );
    facts[`${label}ClippedFrames`] = clipped;
    facts[`${label}SpilledFrames`] = spilled;
    if (spilled > 0) {
        violations.push(
            `${label}: ${spilled} frame(s) show content painted WIDER than the aperture while there was content to clip — the box did not clip the content (content spills past a half-collapsed box instead of being revealed)`,
        );
    }

    return { facts, violations };
}

// The pure detector over the full probe RESULT — both engines.
export function detectClipReveal(result) {
    const violations = [];
    const facts = {};
    if (!result || result.error) {
        violations.push(`probe error: ${result?.error ?? "no result"}`);
        return { facts, violations };
    }

    facts.vtForcedOff = result.vtForcedOff ?? false;

    for (const [label, sample] of [
        ["vt", result.vt],
        ["flip", result.flip],
    ]) {
        if (!sample) continue;
        const r = detectEngineSample(label, sample);
        Object.assign(facts, r.facts);
        violations.push(...r.violations);
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
        "GLASS_UI_DOCK_CLIP_REVEAL_ARTIFACT",
        "AW-dock-clip-reveal",
    );

    // liveArmCiGraceSkip(): under CI, skip the live behavioral arm (the CI proof is the
    // device-free union + the ledger) — the proof:dock-no-scale-pop `!process.env.CI`
    // precedent; the local hard path, CI unset, is untouched. See gate-output.mjs.
    const pw = liveArmCiGraceSkip() ? null : await loadPlaywright();
    if (!pw) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason: "no Playwright harness on this runner OR CI environment — run in the demo/MCP environment (npm i -D playwright + a live demo dev server) for the behavioral assert; under CI the ledger is the proof",
            command: "npm run proof:dock-clip-reveal",
        });
        console.log(
            "proof:dock-clip-reveal — SKIPPED (no Playwright harness on this runner).",
        );
        console.log(
            "  The clip-reveal behavioral truth is asserted wherever the harness runs (the wave's MCP env). The pure detectors are unit-tested here.",
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
        if (browser) await browser.close();
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason: `could not reach the demo dock route at ${BASE_URL}${DOCK_ROUTE}: ${e.message}`,
            command: "npm run proof:dock-clip-reveal",
        });
        console.log(
            `proof:dock-clip-reveal — SKIPPED (demo unreachable at ${BASE_URL}${DOCK_ROUTE}).`,
        );
        console.log(`  ${e.message}`);
        process.exit(0);
    }
    await browser.close();

    const { facts, violations } = detectClipReveal(result);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-clip-reveal",
        facts,
        violations,
        timelines: {
            vt: result.vt && {
                apertures: result.vt.apertures?.map((a) => Math.round(a * 100) / 100),
                visibles: result.vt.visibles?.map((v) => Math.round(v * 100) / 100),
                naturals: result.vt.naturals,
                activeOpacities: result.vt.activeOpacities?.map(
                    (o) => Math.round(o * 1000) / 1000,
                ),
            },
            flip: result.flip && {
                apertures: result.flip.apertures?.map((a) => Math.round(a * 100) / 100),
                visibles: result.flip.visibles?.map((v) => Math.round(v * 100) / 100),
                naturals: result.flip.naturals,
                activeOpacities: result.flip.activeOpacities?.map(
                    (o) => Math.round(o * 1000) / 1000,
                ),
            },
        },
    });

    console.log("proof:dock-clip-reveal — the box IS the reveal aperture (AW.W2)");
    console.log(`  VT active opacity == 1   : ${facts.vtActiveOpacityStatic1 ?? "n/a"}`);
    console.log(`  VT clipped / spilled     : ${facts.vtClippedFrames ?? "n/a"} / ${facts.vtSpilledFrames ?? "n/a"}`);
    console.log(`  FLIP active opacity == 1 : ${facts.flipActiveOpacityStatic1 ?? "n/a"}`);
    console.log(`  FLIP clipped / spilled   : ${facts.flipClippedFrames ?? "n/a"} / ${facts.flipSpilledFrames ?? "n/a"}`);
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
