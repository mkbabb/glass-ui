#!/usr/bin/env node
// BC.W-SAFARI-WEBGL — the cross-engine WebGL context-lifecycle gate (proof:safari-webgl).
//
// The born-RED→GREEN device-free SOURCE arm. USER-DEFECTS §H: "NONE of this works on
// Safari … it rapidly FLASHES the screen." The flash root is the WebGL context-loss CHURN
// — on WebKit the per-page context cap is overrun, an eviction fires `webglcontextlost` →
// the self-heal re-creates a context → it evicts another → that loss fires → re-heal → … =
// the rapidly-flashing re-arm STORM. The lifecycle EXISTS (`useWebGLCanvas.ts:177-218`) but
// re-arms UNCONDITIONALLY (no debounce, no give-up). This wave BOUNDS the storm (the
// debounced re-arm + the N-in-T circuit-breaker, ONCE in the shared `createCanvasLifecycle`
// leaf so all three backends inherit it), adds the WebKit playwright project (the storm
// becomes catchable), and verifies the `@supports`-gated SVG-lens degrade (the one
// Chromium-only enhancement honestly absent on WebKit, the material present).
//
// Six falsifiable SOURCE witnesses (each born-RED at HEAD pre-wave), the comment-strip +
// pure-detector house pattern (mirrors proof-aurora-swraster.mjs / proof-gpu-substrate-single.mjs):
//
//   S1 — THE CIRCUIT-BREAKER IS WIRED. The shared lifecycle carries the debounced re-arm
//        (a `setTimeout(RESTORE_DEBOUNCE_MS)` coalescing a burst into one rebuild per settle)
//        + the N-in-T breaker (the sliding loss window + `breakerTripped`), with the named
//        thresholds (N_RESTORE_STORM/T_RESTORE_STORM_MS/RESTORE_DEBOUNCE_MS) — not magic
//        numbers. RED at HEAD: the restore re-arms synchronously, unbounded.
//        Bite: a synchronous-unbounded re-arm (no debounce timer / no breaker flag) REDs.
//
//   S2/S3 — THE BREAKER BEHAVIOR IS UNIT-PROVEN. A unit test drives ≥N synthetic lost/restored
//        cycles inside T and asserts the substrate STOPS re-arming + HOLDS the parked state +
//        fires NO throw (S2, the storm is a recognized hold); and drives ONE cycle below the
//        threshold and asserts it self-heals (S3, the present correct behavior un-regressed).
//        The gate asserts the unit test EXISTS + names both behaviors (the runtime truth lives
//        in vitest, which the gate runs as a subprocess). RED at HEAD: no breaker test exists.
//
//   S4 — THE WEBKIT PROJECT EXISTS + RUNS THE CROSS-ENGINE SUBSET. playwright.config.ts carries
//        a `webkit` project (Playwright bundled WebKit — the closest CI-runnable Safari proxy)
//        whose `testMatch` enrolls the cross-engine specs (safari-webgl + aurora-swraster).
//        RED at HEAD: only chromium-headless-new + coarse-touch.
//        Bite: a removed webkit project / an empty testMatch REDs.
//
//   S5 — NO UN-GATED `backdrop-filter: url()`. Every `backdrop-filter:`/`-webkit-backdrop-filter:`
//        PROPERTY whose value composes the SVG-lens (a literal `url(#…)`/`url("…#…")` or the
//        `var(--glass-refract-filter)` that resolves to it) lives INSIDE an
//        `@supports (backdrop-filter: url(…))` block (the Safari degrade floor preserved — a
//        load-bearing un-gated lens breaks the Safari glass to an un-styled box). RED if a
//        load-bearing un-gated lens is planted.
//        Bite: a planted un-gated `backdrop-filter: var(--glass-refract-filter)` REDs.
//
//   S6 — THE BREAKER LIVES ONCE. The debounce + the N-in-T breaker live ONLY in the shared
//        `createCanvasLifecycle` leaf, NOT forked per-backend (the W-CANVAS-UNIFY single-source
//        — the AV.W1 two-copy class). The WebGL2/WebGPU backends carry NO own loss-window /
//        debounce-timer fork.
//        Bite: a second forked breaker copy in useWebGLCanvas.ts REDs.
//
// + the self-test bite per clause (the false-witness discipline) and the BINDING WebKit π
//   readback (tests-visual/safari-webgl.spec.ts — the no-flash / viz-paint / morph-stability /
//   glass-degrade / console-silence on the WebKit project, the storm killed on a real engine).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip block + line comments so a witness never matches commented prose (the
 *  URL-safe `//` strip — `(^|[^:])//` keeps a `://` in a URL intact). */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/** CSS comment strip ( `/* … *​/` only — CSS has no `//` comments). */
function stripCssComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

const LIFECYCLE = "src/composables/glass/webgl/createCanvasLifecycle.ts";
const WEBGL = "src/composables/glass/webgl/useWebGLCanvas.ts";
const WEBGPU = "src/composables/glass/webgpu/useWebGPUCanvas.ts";
const PLAYWRIGHT = "tests-visual/playwright.config.ts";
const LENS_CSS = "src/styles/glass-refract.css";
const BREAKER_TEST = "tests/composables/glass/webgl/useWebGLCanvas.test.ts";

/**
 * Pure detector — given the source strings, return { facts, violations }.
 *
 * `sources` shape:
 *   lifecycle   : createCanvasLifecycle.ts (S1, S6)
 *   webgl       : useWebGLCanvas.ts (S6 — no forked breaker; S3 self-heal kept)
 *   webgpu      : useWebGPUCanvas.ts (S6 — no forked breaker)
 *   playwright  : playwright.config.ts (S4 — the webkit project)
 *   lensCss     : glass-refract.css (S5 — the @supports-gated lens)
 *   breakerTest : useWebGLCanvas.test.ts (S2/S3 — the breaker unit tests exist)
 */
export function detectSafariWebgl(sources) {
    const { lifecycle, webgl, webgpu, playwright, lensCss, breakerTest } = sources;
    const facts = {};
    const violations = [];

    const lc = stripComments(lifecycle);
    const wg = stripComments(webgl);
    const wp = stripComments(webgpu);
    const pw = stripComments(playwright);
    const bt = stripComments(breakerTest);
    const css = stripCssComments(lensCss);

    // ── S1 — the circuit-breaker is WIRED in the shared lifecycle ─────────────
    facts.s1 = {};
    // The named thresholds exist (not magic numbers).
    facts.s1.thresholdsNamed =
        /const\s+N_RESTORE_STORM\s*=\s*\d+/.test(lc) &&
        /const\s+T_RESTORE_STORM_MS\s*=\s*\d+/.test(lc) &&
        /const\s+RESTORE_DEBOUNCE_MS\s*=\s*\d+/.test(lc);
    // The restore is DEBOUNCED — a setTimeout keyed on RESTORE_DEBOUNCE_MS schedules the
    // rebuild (NOT a synchronous in-event rebuild).
    facts.s1.restoreDebounced =
        /setTimeout\([\s\S]{0,200}?RESTORE_DEBOUNCE_MS/.test(lc);
    // The breaker tracks a sliding loss window + a tripped flag, and the rebuild is gated
    // on it (the trip suppresses the re-arm).
    facts.s1.breakerStatePresent =
        /breakerTripped/.test(lc) &&
        /lossTimestamps/.test(lc) &&
        /T_RESTORE_STORM_MS/.test(lc);
    // The trip fires on > N losses inside T (the storm threshold) and is read by the
    // rebuild gate (`breakerTripped` short-circuits the re-arm).
    facts.s1.breakerTripsOnStorm =
        /lossTimestamps\.length\s*>\s*N_RESTORE_STORM[\s\S]{0,40}?breakerTripped\s*=\s*true/.test(
            lc,
        );
    facts.s1.rebuildGatedOnBreaker =
        /(disposed\s*\|\|\s*breakerTripped|breakerTripped\s*\|\|\s*disposed)/.test(lc);
    facts.s1.ok =
        facts.s1.thresholdsNamed &&
        facts.s1.restoreDebounced &&
        facts.s1.breakerStatePresent &&
        facts.s1.breakerTripsOnStorm &&
        facts.s1.rebuildGatedOnBreaker;
    if (!facts.s1.ok) {
        violations.push(
            "S1: createCanvasLifecycle must wire the circuit-breaker — the named thresholds (N_RESTORE_STORM/T_RESTORE_STORM_MS/RESTORE_DEBOUNCE_MS), the DEBOUNCED restore (a setTimeout(RESTORE_DEBOUNCE_MS) rebuild, not a synchronous in-event re-arm), the sliding loss window (lossTimestamps) + breakerTripped flag tripping on `> N_RESTORE_STORM` losses in T, and the rebuild gated on `breakerTripped`",
        );
    }

    // ── S2/S3 — the breaker behavior is UNIT-PROVEN ──────────────────────────
    facts.s23 = {};
    // The breaker unit tests exist + name both behaviors (the storm-holds + the single-loss-heals).
    facts.s23.testFilePresent = bt.length > 0;
    facts.s23.stormHoldsTest =
        /BC\.W-SAFARI-WEBGL/.test(bt) &&
        /N_RESTORE_STORM/.test(bt) &&
        /threw\)\.toBe\(false\)/.test(bt);
    facts.s23.singleLossHealsTest =
        /single[\s\S]{0,40}?self-heals|self-heals[\s\S]{0,40}?single/i.test(bt) &&
        /toBe\(2\)/.test(bt);
    // The breaker test imports the named thresholds from the leaf (no magic-number fork).
    facts.s23.importsThresholds =
        /import\s*\{[\s\S]*?N_RESTORE_STORM[\s\S]*?\}\s*from\s*["'][^"']*createCanvasLifecycle["']/.test(
            bt,
        );
    facts.s23.ok =
        facts.s23.testFilePresent &&
        facts.s23.stormHoldsTest &&
        facts.s23.singleLossHealsTest &&
        facts.s23.importsThresholds;
    if (!facts.s23.ok) {
        violations.push(
            "S2/S3: the breaker unit test (useWebGLCanvas.test.ts) must drive ≥N lost/restored cycles inside T asserting the surface HOLDS without throwing (S2), drive ONE cycle below threshold asserting it self-heals (S3), and import the named thresholds from createCanvasLifecycle (no magic-number fork)",
        );
    }

    // ── S4 — the WebKit project exists + runs the cross-engine subset ─────────
    facts.s4 = {};
    facts.s4.webkitProjectPresent = /name:\s*["']webkit["']/.test(pw);
    // The project uses a WebKit device (not a chromium re-skin).
    facts.s4.usesWebkitDevice = /devices\[["']Desktop Safari["']\]/.test(pw);
    // It scopes a non-empty testMatch enrolling the cross-engine subset.
    const webkitBlock = pw.slice(pw.indexOf('name: "webkit"'));
    facts.s4.enrollsCrossEngine =
        /name:\s*["']webkit["']/.test(pw) &&
        /testMatch:\s*\[[\s\S]*?safari-webgl\.spec\.ts/.test(webkitBlock);
    facts.s4.ok =
        facts.s4.webkitProjectPresent &&
        facts.s4.usesWebkitDevice &&
        facts.s4.enrollsCrossEngine;
    if (!facts.s4.ok) {
        violations.push(
            "S4: playwright.config.ts must carry a `webkit` project (devices['Desktop Safari']) with a non-empty testMatch enrolling the cross-engine subset (safari-webgl.spec.ts at minimum)",
        );
    }

    // ── S5 — no un-gated `backdrop-filter: url()` (the SVG-lens degrade floor) ─
    facts.s5 = {};
    // Find every backdrop-filter PROPERTY write whose value composes the SVG lens (a
    // literal url(#…) / url("…#…") OR var(--glass-refract-filter)). Each MUST sit inside an
    // `@supports (backdrop-filter: url(…))` block (the Safari degrade floor).
    const propRe =
        /(?:-webkit-)?backdrop-filter\s*:\s*([^;{}]*)(?:;|\})/g;
    const lensValRe = /var\(\s*--glass-refract-filter|url\(\s*["']?\s*#|url\(\s*["'][^"']*#/;
    const ungatedLens = [];
    let m;
    while ((m = propRe.exec(css)) !== null) {
        const value = m[1];
        if (!lensValRe.test(value)) continue; // a plain blur+tint write — cross-engine, fine
        // Is this property write inside an `@supports (backdrop-filter: url` block? Find the
        // nearest preceding `@supports (backdrop-filter: url` and confirm its block still
        // encloses this index (a balanced-brace check from the @supports open to here).
        const before = css.slice(0, m.index);
        const supIdx = before.lastIndexOf("@supports");
        let gated = false;
        if (supIdx >= 0) {
            const supText = css.slice(supIdx, m.index);
            // The @supports condition mentions `backdrop-filter: url` AND the block is still
            // open at this point (more `{` than `}` since the @supports open).
            const cond = /@supports\s*\([^)]*backdrop-filter\s*:\s*url/.test(supText);
            const opens = (supText.match(/\{/g) || []).length;
            const closes = (supText.match(/\}/g) || []).length;
            gated = cond && opens > closes;
        }
        if (!gated) ungatedLens.push(value.trim().slice(0, 60));
    }
    facts.s5.ungatedLensCount = ungatedLens.length;
    facts.s5.ungatedLens = ungatedLens;
    // The gate-floor exists at all (a positive presence: the lens IS @supports-gated in the
    // shipped tree — a deleted gate would also red S5 via the count if a property survived,
    // but the positive confirms the degrade floor is intentionally present).
    facts.s5.supportsGatePresent =
        /@supports\s*\([^)]*backdrop-filter\s*:\s*url/.test(css);
    facts.s5.ok = facts.s5.ungatedLensCount === 0 && facts.s5.supportsGatePresent;
    if (!facts.s5.ok) {
        violations.push(
            facts.s5.ungatedLensCount > 0
                ? `S5: ${facts.s5.ungatedLensCount} un-gated backdrop-filter lens write(s) — every backdrop-filter composing url(#…)/var(--glass-refract-filter) must sit INSIDE an @supports (backdrop-filter: url(…)) block (the Safari degrade floor): ${ungatedLens.join("; ")}`
                : "S5: the @supports (backdrop-filter: url(…)) degrade gate is absent — the SVG-lens floor must be present",
        );
    }

    // ── S6 — the breaker lives ONCE (shared leaf, no per-backend fork) ────────
    facts.s6 = {};
    // The leaf carries the breaker (S1 confirmed). The WebGL2 + WebGPU backends carry NO
    // own loss-window / debounce-timer fork — they thread loss/restore through the leaf's
    // bindContextEvents seam only.
    const hasForkedBreaker = (src) =>
        /N_RESTORE_STORM\s*=|lossTimestamps|breakerTripped\s*=|RESTORE_DEBOUNCE_MS\s*=/.test(
            src,
        );
    facts.s6.noForkInWebgl = !hasForkedBreaker(wg);
    facts.s6.noForkInWebgpu = !hasForkedBreaker(wp);
    // The leaf is the home (the breaker symbols live in the lifecycle).
    facts.s6.breakerInLeaf =
        /breakerTripped/.test(lc) && /lossTimestamps/.test(lc);
    facts.s6.ok =
        facts.s6.noForkInWebgl &&
        facts.s6.noForkInWebgpu &&
        facts.s6.breakerInLeaf;
    if (!facts.s6.ok) {
        violations.push(
            "S6: the debounce + N-in-T breaker must live ONCE in createCanvasLifecycle (the W-CANVAS-UNIFY single-source) — no forked loss-window/debounce-timer copy in useWebGLCanvas.ts or useWebGPUCanvas.ts",
        );
    }

    return { facts, violations };
}

// ── The self-test bites: the false-witness discipline (each bite REDs its clause
//    through the PURE detector). ─────────────────────────────────────────────
function selfTest() {
    const goodLifecycle = `
      export const N_RESTORE_STORM = 3;
      export const T_RESTORE_STORM_MS = 2000;
      export const RESTORE_DEBOUNCE_MS = 100;
      let lossTimestamps = [];
      let restoreTimer = 0;
      let breakerTripped = false;
      function arm() {
        bindContextEvents(
          () => {
            if (disposed || breakerTripped) return;
            restoreTimer = setTimeout(() => { if (breakerTripped) return; build(); }, RESTORE_DEBOUNCE_MS);
          },
          () => {
            const t = now();
            lossTimestamps.push(t);
            lossTimestamps = lossTimestamps.filter(ts => t - ts <= T_RESTORE_STORM_MS);
            if (lossTimestamps.length > N_RESTORE_STORM) breakerTripped = true;
          },
        );
      }`;
    const goodWebgl = `
      function buildContext() { return {}; }
      const lifecycle = createCanvasLifecycle({ bindContextEvents: (rebuild, markLost) => {} });`;
    const goodWebgpu = `
      const lifecycle = createCanvasLifecycle({ bindContextEvents: (rebuild, markLost) => {} });`;
    const goodPlaywright = `
      projects: [
        { name: "chromium-headless-new", use: {} },
        { name: "webkit", testMatch: ["safari-webgl.spec.ts", "aurora-swraster.spec.ts"], use: { ...devices["Desktop Safari"] } },
      ]`;
    const goodLensCss = `
      @supports (backdrop-filter: url("#glass-refract")) {
        .glass-lens { backdrop-filter: var(--glass-blur-resting) var(--glass-refract-filter); }
      }`;
    const goodBreakerTest = `
      import { N_RESTORE_STORM, RESTORE_DEBOUNCE_MS, T_RESTORE_STORM_MS } from "../createCanvasLifecycle";
      describe("BC.W-SAFARI-WEBGL breaker", () => {
        it("S2 storm holds", () => { for (let i=0;i<N_RESTORE_STORM+1;i++){} expect(threw).toBe(false); });
        it("S3 single quiet loss self-heals", () => { expect(setups).toBe(2); });
      });`;

    const base = {
        lifecycle: goodLifecycle,
        webgl: goodWebgl,
        webgpu: goodWebgpu,
        playwright: goodPlaywright,
        lensCss: goodLensCss,
        breakerTest: goodBreakerTest,
    };

    const bites = [];

    // Bite A — a synchronous-unbounded re-arm (no debounce, no breaker) reds S1.
    {
        const bad = `
          function arm() {
            bindContextEvents(() => { build(); wake(); }, () => { hooks = null; });
          }`;
        const { facts } = detectSafariWebgl({ ...base, lifecycle: bad });
        bites.push({ name: "S1 sync-unbounded-rearm reds", reds: !facts.s1.ok });
    }
    // Bite B — a removed webkit project reds S4.
    {
        const bad = `projects: [ { name: "chromium-headless-new", use: {} } ]`;
        const { facts } = detectSafariWebgl({ ...base, playwright: bad });
        bites.push({ name: "S4 no-webkit-project reds", reds: !facts.s4.ok });
    }
    // Bite C — an un-gated backdrop-filter lens write reds S5.
    {
        const bad = `
          .glass-lens { backdrop-filter: var(--glass-blur-resting) var(--glass-refract-filter); }
          @supports (backdrop-filter: url("#glass-refract")) { .x { backdrop-filter: blur(1px); } }`;
        const { facts } = detectSafariWebgl({ ...base, lensCss: bad });
        bites.push({ name: "S5 ungated-lens reds", reds: !facts.s5.ok });
    }
    // Bite D — a forked breaker copy in the WebGL backend reds S6.
    {
        const bad =
            goodWebgl + `\n let lossTimestamps = []; let breakerTripped = false;`;
        const { facts } = detectSafariWebgl({ ...base, webgl: bad });
        bites.push({ name: "S6 forked-breaker reds", reds: !facts.s6.ok });
    }
    // Bite E — a missing breaker unit test (storm-hold) reds S2/S3.
    {
        const bad = `import { N_RESTORE_STORM } from "../createCanvasLifecycle"; it("x", () => {});`;
        const { facts } = detectSafariWebgl({ ...base, breakerTest: bad });
        bites.push({ name: "S2/S3 missing-breaker-test reds", reds: !facts.s23.ok });
    }

    return bites;
}

/** Run the breaker unit test as a subprocess (S2/S3 runtime truth). */
function runBreakerUnit() {
    const res = spawnSync(
        "npx",
        ["vitest", "run", BREAKER_TEST, "--reporter=dot"],
        { cwd: ROOT, encoding: "utf8", timeout: 120_000 },
    );
    return { ok: res.status === 0, stdout: res.stdout, stderr: res.stderr };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_SAFARI_WEBGL_ARTIFACT",
        "BC-safari-webgl",
    );

    const sources = {
        lifecycle: safeRead(resolve(ROOT, LIFECYCLE)),
        webgl: safeRead(resolve(ROOT, WEBGL)),
        webgpu: safeRead(resolve(ROOT, WEBGPU)),
        playwright: safeRead(resolve(ROOT, PLAYWRIGHT)),
        lensCss: safeRead(resolve(ROOT, LENS_CSS)),
        breakerTest: safeRead(resolve(ROOT, BREAKER_TEST)),
    };

    const { facts, violations } = detectSafariWebgl(sources);

    // The self-test bites.
    const bites = selfTest();
    const biteFailures = bites.filter((b) => !b.reds);
    facts.selfTest = { bites, allBite: biteFailures.length === 0 };
    if (!facts.selfTest.allBite) {
        violations.push(
            `SELF-TEST: bite(s) did not RED: ${biteFailures
                .map((b) => b.name)
                .join(", ")}`,
        );
    }

    // The breaker unit-test subprocess (S2/S3 runtime truth — the storm holds, the
    // single loss heals). Skippable via GLASS_UI_SAFARI_WEBGL_SKIP_UNIT (source-only run).
    if (!process.env.GLASS_UI_SAFARI_WEBGL_SKIP_UNIT && existsSync(resolve(ROOT, BREAKER_TEST))) {
        const unit = runBreakerUnit();
        facts.breakerUnit = { ran: true, ok: unit.ok };
        if (!unit.ok) {
            violations.push(
                "S2/S3 RUNTIME: the breaker unit test (useWebGLCanvas.test.ts) did not pass — the storm-holds / single-loss-heals behavior is not proven at runtime",
            );
        }
    } else {
        facts.breakerUnit = { ran: false, ok: null };
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:safari-webgl",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:safari-webgl — the cross-engine WebGL context-lifecycle: the §H Safari flash killed (BC.W-SAFARI-WEBGL)",
    );
    console.log(`  S1 circuit-breaker wired (debounce + N-in-T)         : ${yn(facts.s1.ok)}`);
    console.log(`  S2/S3 breaker behavior unit-proven (hold + heal)     : ${yn(facts.s23.ok)}`);
    console.log(`  S4 webkit project + cross-engine subset              : ${yn(facts.s4.ok)}`);
    console.log(`  S5 no un-gated backdrop-filter: url() lens           : ${yn(facts.s5.ok)}`);
    console.log(`  S6 breaker lives ONCE (shared leaf, no fork)         : ${yn(facts.s6.ok)}`);
    console.log(`  self-test bites RED                                  : ${yn(facts.selfTest.allBite)}`);
    if (facts.breakerUnit.ran)
        console.log(`  breaker unit subprocess                              : ${yn(facts.breakerUnit.ok)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
