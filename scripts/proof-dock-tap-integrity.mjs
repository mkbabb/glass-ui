// R5-TAP (R5-3) — proof:dock-tap-integrity, the collapsed-tap + hover-approach
// MORPH-RACE click-integrity gate (born-RED at HEAD via git-show reconstruction,
// driven GREEN by the wave).
//
// THE DEFECT (slides-consumer-verified, USER-AUDIT-2026-06-11-R5 §R5-3). Two
// manifestations of ONE root cause — a click/tap whose target IDENTITY changed
// under the (stationary) pointer because the dock's hover-expand layer swap moved a
// DIFFERENT control under it:
//   (a) TOUCH. A tap on a COLLAPSED dock expands it AND lets the browser's native
//       tap→click compat event flow to the control under the finger (the iOS
//       single-tap contract). The swap puts a different control at those coordinates
//       → the compat click activates it (the deck's Home-link-under-a-gear-tap →
//       navigate-away).
//   (b) FINE POINTER. An approach-then-click during the hover-expand FLIP lands the
//       click on the EXPANDED layer's control at the old coordinates (the deck's
//       gear click ADVANCED THE SLIDE; the gear popover never opened).
//
// THE FIX (this wave): GlassDock gains an INTERNAL click-integrity guard
// (`useDockClickIntegrity`) wired onto its root in the CAPTURE phase. It records the
// element under the pointer at `pointerdown` + whether the box was morphing then;
// on the `click`, while a swap could have moved a control under the pointer (a morph
// in flight OR the post-flip settle envelope), it DEFERS a racing click (morph in
// flight, or a press begun mid-morph) and SWALLOWS an identity-mismatched compat
// click (gear-tap → a different control). The consumer no longer needs a guard
// (slides' interim `@touchend.prevent` + 320ms capture-phase guard RETIRE); the
// exposed `expanded` ref STAYS exposed (a protected binary-consumer surface).
//
// WHAT THIS GATE PROVES — THREE WITNESSES + a born-RED self-test:
//   W1 (source, device-free) — `useDockClickIntegrity.ts` exists and carries BOTH
//      the identity scope (a press-time `pointerdown` target compared on click) AND
//      the morph-settle window (`[data-morphing]` / `MORPH_SETTLE_MS`); AND those
//      handlers are WIRED onto the GlassDock root in the capture phase
//      (`@pointerdown.capture` + `@click.capture`). RED at HEAD: the composable does
//      not exist and GlassDock has no capture-phase guard.
//   W2 (source, device-free, the BORN-RED reconstruction) — `git show HEAD:` proves
//      the pre-fix tree had NO `useDockClickIntegrity.ts`, NO capture handlers on
//      GlassDock, and NO `MORPH_SETTLE_MS` constant. The witness is the git-history
//      fact: the gate is born-RED on the tree it was minted against.
//   W3 (live, real-input replay — the slides recipe equivalent on the demo shell) —
//      over the deterministic `dock-tap-capture` dock (a collapsed gear-summary
//      whose post-expand box-center hosts a DIFFERENT control), with REAL input
//      (Playwright touch emulation via CDP + the real fine-pointer cursor):
//        • (a) a touch tap on the collapsed gear activates NO full-layer control
//          (the compat click is identity-scoped, not coordinate-scoped);
//        • (b) an approach-click during the morph activates NO full-layer control
//          (the racing click is deferred until settle);
//        • the SETTLED click (after the morph) DOES reach the control (the guard is
//          not over-broad — it never traps a genuine settled interaction).
//      RED at HEAD: the live replay (and the committed born-RED baseline trace)
//      shows the racing tap/click activating a full-layer control.
//
// The W3 trace-analysis detector is PURE over a captured result, so the SELF-TEST
// replays the committed born-RED baseline (ground/R5-tap-race-baseline.json — the
// proven leak captured on the pre-fix tree) and asserts the leak is FLAGGED. The
// device-free W1+W2 source arm + the baseline self-test run on EVERY runner.
//
// HARNESS: the proof-dock-no-scale-pop.mjs pattern — a dynamically-imported
// Playwright driver that runs the live arm ONLY when a demo dev server + Playwright
// are present, parks the live WebGL substrate via the visibility-park seam, and
// fail-CLOSES when the π workspace is present + not in CI.

import { resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:dock-tap-integrity";
const DOCK_ROUTE = "/dock/overview";
const CAPTURE_SEL = '.glass-dock[data-testid="dock-tap-capture"]';
// The full-layer controls of the dock-tap-capture dock (the swapped-in set behind
// the collapsed gear-summary). A racing tap/click that activates ANY of these is the
// R5-3 leak.
const FULL_LAYER_LABELS = ["Skip back", "Previous", "Play", "Skip forward", "Share"];

// ── comment-strip (false-witness discipline) ───────────────────────────────────
function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            const end = text.indexOf("\n", i + 2);
            const stop = end === -1 ? text.length : end;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// ── W1 — the integrity guard exists + is WIRED (source, device-free) ───────────
export function detectGuardSource(composableSrc, glassDockSrc) {
    const violations = [];
    const facts = {};
    const comp = composableSrc ? stripBlockComments(composableSrc) : "";
    const dock = glassDockSrc ? stripBlockComments(glassDockSrc) : "";

    // The composable must exist and carry BOTH axes.
    const hasComposable = comp.length > 0;
    facts.composablePresent = hasComposable;
    if (!hasComposable) {
        violations.push(
            "W1: useDockClickIntegrity.ts is absent — there is no internal click-integrity guard (the R5-3 race is unguarded)",
        );
    }

    // Axis 1 — the identity scope: a press-time target captured on pointerdown and
    // compared on click (the pass-through is scoped to the pressed element, not a
    // coordinate). We look for a recorded press target + an identity comparison.
    const hasPressTarget = /pressTarget\s*=/.test(comp);
    const hasIdentityCompare =
        /sameControlIdentity/.test(comp) && /pressTarget/.test(comp);
    facts.identityScope = hasPressTarget && hasIdentityCompare;
    if (hasComposable && !facts.identityScope)
        violations.push(
            "W1: the guard has no IDENTITY scope — it must capture the element under the pointer at pointerdown (pressTarget) and compare it on click (sameControlIdentity), so the pass-through is scoped to the pressed element, never post-swap coordinates",
        );

    // Axis 2 — the morph-settle window: the live morph signal (`data-morphing`) AND
    // a settle envelope (MORPH_SETTLE_MS) gate the decision.
    const hasMorphSignal = /data-morphing/.test(comp);
    const hasSettleWindow = /MORPH_SETTLE_MS|settleDeadline/.test(comp);
    facts.morphSettleWindow = hasMorphSignal && hasSettleWindow;
    if (hasComposable && !facts.morphSettleWindow)
        violations.push(
            "W1: the guard has no MORPH-SETTLE window — it must read the live `[data-morphing]` signal AND a settle envelope (MORPH_SETTLE_MS) so a click that races the FLIP is deferred until settle",
        );

    // The WIRED assert (anti-decoy): the handlers must be on the GlassDock ROOT in the
    // CAPTURE phase (a guard that never sees the click is dead code).
    const importsComposable = /useDockClickIntegrity/.test(dock);
    const wiresPointerDown = /@pointerdown\.capture\s*=\s*"onPointerDownCapture"/.test(
        glassDockSrc ?? "",
    );
    const wiresClick = /@click\.capture\s*=\s*"onClickCapture"/.test(glassDockSrc ?? "");
    facts.importedInDock = importsComposable;
    facts.pointerDownCaptureWired = wiresPointerDown;
    facts.clickCaptureWired = wiresClick;
    if (hasComposable && !importsComposable)
        violations.push(
            "W1: GlassDock.vue does not import useDockClickIntegrity — the guard is not instantiated",
        );
    if (hasComposable && !(wiresPointerDown && wiresClick))
        violations.push(
            "W1: the guard handlers are NOT wired onto the GlassDock root in the capture phase (@pointerdown.capture=\"onPointerDownCapture\" + @click.capture=\"onClickCapture\") — a guard that never sees the click is a no-op decoy",
        );

    return { facts, violations };
}

// ── W2 — the BORN-RED reconstruction (git-show, device-free) ───────────────────
// Proves the pre-fix tree (HEAD) had none of the guard. The witness is a git-history
// fact, computed by the caller (it owns the git surface); this detector verifies the
// shape of the reconstruction result.
export function detectBornRed(headState) {
    const violations = [];
    const facts = { ...headState };
    // The gate is born-RED IFF the pre-fix tree lacked ALL three: the composable, the
    // wired capture handlers, and the MORPH_SETTLE_MS constant. If ANY was already
    // present at HEAD, the reconstruction is not a faithful born-RED (the gate was
    // minted against a tree that already carried the fix — a stale-base trap).
    if (headState.composableExistedAtHead)
        violations.push(
            "W2: useDockClickIntegrity.ts ALREADY existed at HEAD — the gate is not born-RED against the pre-fix tree",
        );
    if (headState.captureHandlersAtHead > 0)
        violations.push(
            "W2: GlassDock.vue ALREADY carried capture-phase guard handlers at HEAD — not born-RED",
        );
    if (headState.morphSettleConstAtHead > 0)
        violations.push(
            "W2: constants.ts ALREADY carried MORPH_SETTLE_MS at HEAD — not born-RED",
        );
    facts.bornRed =
        !headState.composableExistedAtHead &&
        headState.captureHandlersAtHead === 0 &&
        headState.morphSettleConstAtHead === 0;
    return { facts, violations };
}

// ── W3 — the live replay verdict (PURE over a captured result) ──────────────────
// A result carries `touchTap`, `fineRace`, and `settled`. The R5-3 acceptance bar:
//   (a) the touch tap activates NO full-layer control;
//   (b) the fine-pointer race click activates NO full-layer control;
//   (c) the settled click DOES reach a control.
export function detectLive(result) {
    const violations = [];
    const facts = {};
    if (!result || result.error) {
        violations.push(`live probe error: ${result?.error ?? "no result"}`);
        return { facts, violations };
    }

    const fullSet = new Set(FULL_LAYER_LABELS);
    const leakOf = (acts) => (Array.isArray(acts) ? acts.filter((x) => fullSet.has(x)) : []);

    // (a) touch tap
    const tap = result.touchTap;
    if (!tap || !Array.isArray(tap.activations)) {
        violations.push("W3(a): the touch-tap trace is missing (the tap was not staged)");
    } else {
        const leak = leakOf(tap.activations);
        facts.touchTapActivations = tap.activations;
        facts.touchTapLeak = leak;
        if (!tap.expandedAfter)
            violations.push(
                "W3(a): the touch tap did not expand the collapsed dock — the tap-to-expand path was not staged, so the pass-through assert is vacuous",
            );
        if (leak.length > 0)
            violations.push(
                `W3(a): the touch tap on the collapsed gear ACTIVATED a full-layer control (${leak.join(", ")}) — the compat click landed on a swapped-in control at the tap coordinates (the navigate-away defect)`,
            );
    }

    // (b) fine-pointer race
    const race = result.fineRace;
    if (!race || !Array.isArray(race.activations)) {
        violations.push("W3(b): the fine-pointer race trace is missing (the race was not staged)");
    } else {
        const leak = leakOf(race.activations);
        facts.fineRaceSnap = race.snapAtClick ?? null;
        facts.fineRaceActivations = race.activations;
        facts.fineRaceLeak = leak;
        // The race must have been staged ON a swapped control mid-morph for the assert
        // to bite (the snap recorded a full-layer control under the point while morphing).
        if (!race.snapAtClick || !race.snapAtClick.under || !race.snapAtClick.m)
            violations.push(
                "W3(b): the race was not staged mid-morph over a swapped-in control (no full-layer control under the point while [data-morphing]) — the assert is vacuous",
            );
        else if (leak.length > 0)
            violations.push(
                `W3(b): the approach-click during the morph ACTIVATED a full-layer control (${leak.join(", ")}) — the racing click landed on the swapped-in control at the old coordinates (the advance-the-slide defect)`,
            );
    }

    // (c) the settled click must reach a control (the guard is not over-broad)
    const settled = result.settled;
    facts.settledActivations = settled ?? [];
    if (!Array.isArray(settled) || settled.length === 0)
        violations.push(
            "W3(c): the SETTLED click (after the morph) reached NO control — the guard is over-broad, trapping a genuine settled interaction (the consumer would read it as a dead dock)",
        );

    return { facts, violations };
}

// ── the in-page sampler + the real-input staging ────────────────────────────────
function installSampler() {
    const SEL = '.glass-dock[data-testid="dock-tap-capture"]';
    const d = document.querySelector(SEL);
    if (!d) return false;
    window.__tap = { acts: [] };
    document.addEventListener("click", (e) => {
        const c = e.target.closest ? e.target.closest("button, a, [role=button]") : null;
        if (c) window.__tap.acts.push(c.getAttribute("aria-label") || "<ctrl>");
    });
    window.__tap.rect = () => {
        const r = d.getBoundingClientRect();
        return { cx: r.x + r.width / 2, cy: r.y + r.height / 2, top: r.top, left: r.x, w: Math.round(r.width) };
    };
    window.__tap.collapsed = () => d.classList.contains("collapsed");
    window.__tap.morphing = () => d.hasAttribute("data-morphing");
    window.__tap.underFull = (x, y) => {
        const e = document.elementFromPoint(x, y);
        const c = e && e.closest ? e.closest(".dock-layer--full button, .dock-layer--full a, .dock-layer--full [role=button]") : null;
        return c ? c.getAttribute("aria-label") : null;
    };
    window.__tap.reset = () => { window.__tap.acts = []; };
    return true;
}

async function loadPlaywright() {
    for (const mod of ["playwright", "playwright-core"]) {
        try {
            return await import(mod);
        } catch {
            /* next */
        }
    }
    return null;
}

function piWorkspacePresent(ROOT) {
    const ws = resolve(ROOT, "tests-visual");
    const pkg = [
        resolve(ws, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "node_modules/playwright/package.json"),
    ];
    return pkg.some(existsSync);
}

function parkGL(page) {
    return page.evaluate(() => {
        try {
            Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
            Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "hidden" });
            document.dispatchEvent(new Event("visibilitychange"));
        } catch {
            /* best-effort */
        }
    });
}

async function collapseDock(page) {
    const rc = await page.evaluate(() => window.__tap.rect());
    await page.mouse.move(rc.cx, rc.cy, { steps: 4 });
    await page.waitForTimeout(150);
    await page.mouse.move(rc.cx, rc.top + 420, { steps: 6 });
    await page.waitForFunction(() => window.__tap.collapsed(), null, { timeout: 3000 });
    await page.waitForTimeout(280);
}

async function preparePage(page, BASE_URL, touch) {
    void touch; // the touch context is set at context level by the caller
    await page.addInitScript(() => {
        try {
            delete document.startViewTransition;
        } catch {
            /* non-configurable */
        }
    });
    await page.goto(`${BASE_URL}${DOCK_ROUTE}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(CAPTURE_SEL, { state: "attached", timeout: 8000 });
    await parkGL(page);
    await page.evaluate(installSampler);
    await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView({ block: "center" }), CAPTURE_SEL);
    await page.waitForTimeout(450);
}

async function stageAndCapture(pw, BASE_URL) {
    const out = {};
    const browser = await pw.chromium.launch();
    try {
        // (a) TOUCH — a context with hasTouch; tap the collapsed gear via CDP touch
        //     (which generates the native compat click).
        {
            const ctx = await browser.newContext({ hasTouch: true, viewport: { width: 1280, height: 900 } });
            const page = await ctx.newPage();
            await preparePage(page, BASE_URL, true);
            await collapseDock(page);
            const rc = await page.evaluate(() => window.__tap.rect());
            const cdp = await ctx.newCDPSession(page);
            await page.evaluate(() => window.__tap.reset());
            await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: rc.cx, y: rc.cy }] });
            await page.waitForTimeout(30);
            await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
            // The tap-to-expand is TRANSIENT (the touch-gate auto-deactivates), so poll
            // for the expand at ANY point during the window — by the time the compat
            // click + the gate cycle resolve, the dock may have re-collapsed.
            let expandedAfter = false;
            for (let i = 0; i < 40; i++) {
                if (await page.evaluate(() => !window.__tap.collapsed())) {
                    expandedAfter = true;
                    break;
                }
                await page.waitForTimeout(20);
            }
            await page.waitForTimeout(600);
            const acts = await page.evaluate(() => window.__tap.acts);
            out.touchTap = { activations: acts, expandedAfter };
            await ctx.close();
        }

        // (b) FINE POINTER — approach-click during the morph, then a settled click.
        {
            const ctx = await browser.newContext({ hasTouch: false, viewport: { width: 1280, height: 900 } });
            const page = await ctx.newPage();
            await preparePage(page, BASE_URL, false);
            await collapseDock(page);
            const rc = await page.evaluate(() => window.__tap.rect());
            await page.evaluate(() => window.__tap.reset());
            // approach: move onto the collapsed pill (triggers hover-expand)
            await page.mouse.move(rc.cx, rc.cy, { steps: 3 });
            // poll until a FULL-layer control is under the box center AND still morphing,
            // then click immediately — the precise race condition.
            let snap = null;
            for (let i = 0; i < 60; i++) {
                snap = await page.evaluate(
                    (p) => ({ m: window.__tap.morphing(), under: window.__tap.underFull(p.x, p.y) }),
                    { x: rc.cx, y: rc.cy },
                );
                if (snap.under && snap.m) break;
                await page.waitForTimeout(8);
            }
            await page.mouse.down();
            await page.mouse.up();
            await page.waitForTimeout(800);
            const acts = await page.evaluate(() => window.__tap.acts);
            out.fineRace = { snapAtClick: snap, activations: acts };

            // settled click — re-collapse, re-expand fully, settle, click center.
            await page.waitForTimeout(280);
            await page.mouse.move(rc.cx, rc.top + 420, { steps: 4 });
            await page.waitForFunction(() => window.__tap.collapsed(), null, { timeout: 3000 });
            await page.waitForTimeout(250);
            await page.mouse.move(rc.cx, rc.cy, { steps: 3 });
            await page.waitForFunction(() => !window.__tap.collapsed() && !window.__tap.morphing(), null, { timeout: 2500 });
            await page.waitForTimeout(450);
            await page.evaluate(() => window.__tap.reset());
            const re = await page.evaluate(() => window.__tap.rect());
            await page.mouse.click(re.cx, re.cy);
            await page.waitForTimeout(300);
            out.settled = await page.evaluate(() => window.__tap.acts);
            await ctx.close();
        }
    } catch (e) {
        out.error = e.message;
    } finally {
        await browser.close();
    }
    return out;
}

// ── the born-RED baseline self-test (device-free) ──────────────────────────────
function baselineSelfTest(ROOT) {
    const p = resolve(ROOT, "docs/tranches/AZ/audit/ground/R5-tap-race-baseline.json");
    if (!existsSync(p)) return { ran: false, reason: "born-RED baseline absent" };
    let trace;
    try {
        trace = JSON.parse(readFileSync(p, "utf8"));
    } catch {
        return { ran: false, reason: "born-RED baseline unparseable" };
    }
    // The baseline is the proven leak captured on the pre-fix tree. Run it through the
    // PURE W3 detector and assert it is FLAGGED (the bite is demonstrated every run).
    const live = detectLive(trace);
    const flagged = live.violations.some(
        (v) => v.includes("ACTIVATED a full-layer control"),
    );
    return {
        ran: true,
        flagged,
        baselineTouchLeak: live.facts.touchTapLeak ?? [],
        baselineRaceLeak: live.facts.fineRaceLeak ?? [],
    };
}

// ── the pre-fix reconstruction (git-show, the W2 born-RED witness) ──────────────
// PINNED to the recorded pre-fix tree (e5bb8166 — the parent of the R5-TAP
// corrective 84def5f4 that landed the guard). The original `HEAD:` anchor was
// correct only at authoring time: once the fix MERGED, HEAD contained the guard
// and the witness inverted into a permanent false-RED (the moving-anchor trap).
// Pinning keeps the born-RED proof EXECUTABLE forever against the true pre-fix
// tree instead of demoting it to a header comment.
const PRE_FIX_COMMIT = "e5bb8166";
async function reconstructHeadState(ROOT) {
    const { execFileSync } = await import("node:child_process");
    const show = (path) => {
        try {
            return execFileSync("git", ["show", `${PRE_FIX_COMMIT}:${path}`], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
        } catch {
            return null; // absent at the pre-fix tree
        }
    };
    const composable = show("src/components/custom/dock/composables/useDockClickIntegrity.ts");
    const dockHead = show("src/components/custom/dock/GlassDock.vue") ?? "";
    const constsHead = show("src/components/custom/dock/constants.ts") ?? "";
    const captureHandlers =
        (dockHead.match(/@pointerdown\.capture\s*=\s*"onPointerDownCapture"/g) || []).length +
        (dockHead.match(/@click\.capture\s*=\s*"onClickCapture"/g) || []).length;
    return {
        composableExistedAtHead: composable !== null,
        captureHandlersAtHead: captureHandlers,
        morphSettleConstAtHead: (constsHead.match(/MORPH_SETTLE_MS/g) || []).length,
    };
}

async function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_TAP_INTEGRITY_ARTIFACT", "AZ-dock-tap-integrity");

    // ── (0) device-free SOURCE arm (W1 + W2) + the baseline self-test ───────────
    const readOr = (p) => {
        const abs = resolve(ROOT, p);
        return existsSync(abs) ? readFileSync(abs, "utf8") : "";
    };
    const composableSrc = readOr("src/components/custom/dock/composables/useDockClickIntegrity.ts");
    const glassDockSrc = readOr("src/components/custom/dock/GlassDock.vue");
    const w1 = detectGuardSource(composableSrc, glassDockSrc);
    const headState = await reconstructHeadState(ROOT);
    const w2 = detectBornRed(headState);
    const selfTest = baselineSelfTest(ROOT);

    const sourceViolations = [...w1.violations, ...w2.violations];
    if (selfTest.ran && !selfTest.flagged)
        sourceViolations.push(
            "SELF-TEST FAILED: the born-RED baseline (proven leak on the pre-fix tree) was NOT flagged by the W3 detector — the gate is not load-bearing",
        );

    const piPresent = piWorkspacePresent(ROOT);
    const pw = await loadPlaywright();

    if (!pw) {
        const status = sourceViolations.length === 0 ? "skipped" : "fail";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason: piPresent
                ? "Playwright absent here — the live W3 arm runs in the π workspace; the device-free W1+W2 + baseline self-test ran"
                : "no Playwright harness — the device-free W1+W2 + baseline self-test ran",
            command: COMMAND,
            facts: { piWorkspacePresent: piPresent, w1: w1.facts, w2: w2.facts, baselineSelfTest: selfTest },
            violations: sourceViolations,
        });
        printSummary({ status, w1, w2, selfTest, live: null });
        process.exit(status === "fail" ? 1 : 0);
    }

    // ── (1) the live W3 arm ─────────────────────────────────────────────────────
    let result;
    try {
        result = await stageAndCapture(pw, BASE_URL);
    } catch (e) {
        result = { error: e.message };
    }

    const liveReachable = result && !result.error;
    const live = liveReachable ? detectLive(result) : { facts: {}, violations: [] };
    const failClosed = piPresent && !process.env.CI;
    let violations = [...sourceViolations];
    if (liveReachable) {
        violations = [...violations, ...live.violations];
    } else if (failClosed) {
        violations.push(
            `could not run the live W3 arm at ${BASE_URL}${DOCK_ROUTE}: ${result?.error ?? "unreachable"} — π workspace PRESENT (fail-CLOSED)`,
        );
    }
    const status = violations.length === 0 ? (liveReachable ? "pass" : "skipped") : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts: {
            piWorkspacePresent: piPresent,
            w1: w1.facts,
            w2: w2.facts,
            baselineSelfTest: selfTest,
            live: live.facts,
            liveReachable,
            liveError: result?.error ?? null,
        },
        violations,
    });
    printSummary({ status, w1, w2, selfTest, live: liveReachable ? live : null, liveError: result?.error });
    process.exit(status === "fail" ? 1 : 0);
}

function printSummary({ status, w1, w2, selfTest, live, liveError }) {
    console.log("proof:dock-tap-integrity — the collapsed-tap + hover-approach morph-race click-integrity gate (R5-TAP / R5-3)");
    console.log(
        `  W1 guard source   : composable=${w1.facts.composablePresent} identity=${w1.facts.identityScope} settle=${w1.facts.morphSettleWindow} wired(pd/click)=${w1.facts.pointerDownCaptureWired}/${w1.facts.clickCaptureWired} ${w1.violations.length === 0 ? "OK" : "RED"}`,
    );
    console.log(
        `  W2 born-RED       : bornRed=${w2.facts.bornRed} (composable@HEAD=${w2.facts.composableExistedAtHead} handlers@HEAD=${w2.facts.captureHandlersAtHead} const@HEAD=${w2.facts.morphSettleConstAtHead}) ${w2.violations.length === 0 ? "OK" : "RED"}`,
    );
    console.log(
        `  baseline self-test: ${selfTest.ran ? (selfTest.flagged ? `OK (flagged leak touch=[${selfTest.baselineTouchLeak}] race=[${selfTest.baselineRaceLeak}])` : "FAIL (did not flag the baseline leak)") : `absent (${selfTest.reason})`}`,
    );
    if (live) {
        console.log(
            `  W3(a) touch tap   : activations=[${live.facts.touchTapActivations ?? "n/a"}] leak=[${live.facts.touchTapLeak ?? "n/a"}]`,
        );
        console.log(
            `  W3(b) fine race   : snap=${JSON.stringify(live.facts.fineRaceSnap)} activations=[${live.facts.fineRaceActivations ?? "n/a"}] leak=[${live.facts.fineRaceLeak ?? "n/a"}]`,
        );
        console.log(
            `  W3(c) settled     : reached=[${live.facts.settledActivations ?? "n/a"}]`,
        );
    } else if (liveError) {
        console.log(`  live W3 arm       : SKIPPED/FAILED — ${liveError}`);
    } else {
        console.log("  live W3 arm       : SKIPPED on this runner (device-free arm ran)");
    }
    const allV = [...w1.violations, ...w2.violations, ...(live?.violations ?? [])];
    if (allV.length) {
        console.log("\nVIOLATIONS:");
        for (const v of allV) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
