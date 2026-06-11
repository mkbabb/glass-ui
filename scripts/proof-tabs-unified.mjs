// AX.W53 — proof:tabs-unified, the SegmentedTabs unification gate.
//
// The former tabs surface was FIVE artefacts — BouncyToggle (the engine),
// BouncyTabs (a shim), UnderlineTabs (a separate component), useBouncySlider,
// and the standalone ResponsiveTabs — for ONE concept. W53 collapses them onto
// ONE component (`SegmentedTabs`) with a three-value `variant` axis
// (segmented · pill · underline), ONE shared elastic indicator that GLIDES on
// `--spring-snappy` and SQUISHES on travel, multi-select on the same engine,
// and responsive-collapse as a prop. Clean break — no "Bouncy" prefix, no
// legacy alias for the dropped names.
//
// This gate has TWO arms:
//   - the DEVICE-FREE SOURCE arm (always runs, always gates) — the unified
//     structure: one Tabs family, the variant axis, no Bouncy* export, the
//     indicator reads `--spring-snappy` + the `--tab-indicator-max-stretch`
//     squish token, the ARIA-role-per-variant contract, the dropped-name
//     deletion-proof grep.
//   - the FAIL-CLOSED π LIVE arm (runs only when the Playwright workspace + a
//     demo dev server are present) — the indicator GLIDES + SQUISHES live.
//     When the workspace IS present, an unreachable / non-animating indicator
//     is a hard RED (never a false-green SKIP). The orchestrator drives the
//     live tuning of the squish magnitude via this arm.
//
// Born-RED at the pre-W53 HEAD: BouncyToggle/BouncyTabs/UnderlineTabs/
// ResponsiveTabs still export (the prefix survives); there is no SegmentedTabs;
// there is no `--tab-indicator-max-stretch` token. Bite: re-introduce a Bouncy*
// export → the deletion-proof clause reddens; remove the squish token → the
// squish clause reddens.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { DELETION_SWEEP_ROOTS } from "./constellation.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:tabs-unified";

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ comments (so a prose mention of a dropped name in
// a comment is not mistaken for a live code reference). Newlines preserved.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

// Walk src/ + demo/ + tests/ for the deletion-proof + the no-Bouncy-export grep.
// The walk roots are the SHARED constellation constant (AX.W62) — so a dropped
// name surviving in the tests/ mirror (the carve-out blind spot) reds here too.
const SWEEP_ROOTS = DELETION_SWEEP_ROOTS;
const SWEEP_EXT = /\.(vue|ts|css)$/;
const SWEEP_SKIP = new Set(["node_modules", "dist", ".git", ".claude"]);
function walk(dir, out = []) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (SWEEP_SKIP.has(entry.name)) continue;
            walk(join(dir, entry.name), out);
        } else if (entry.isFile() && SWEEP_EXT.test(entry.name)) {
            out.push(join(dir, entry.name));
        }
    }
    return out;
}

export function detect() {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    const TABS_DIR = "src/components/custom/tabs";
    const sfc = read(`${TABS_DIR}/SegmentedTabs.vue`);
    // The track choreography is carved out of the SFC into a partial
    // (segmented-tabs.css, @import-ed into styles/index.css). Its home moved
    // from the component dir to src/styles/ — read BOTH candidates so a
    // colocate/carve relocation never strands the CSS assertions.
    const css =
        read("src/styles/segmented-tabs.css") || read(`${TABS_DIR}/segmented-tabs.css`);
    const barrel = read(`${TABS_DIR}/index.ts`);
    const barrelCode = stripComments(barrel);
    const composable = read(`${TABS_DIR}/composables/useTabIndicator.ts`);
    // tokens.css is a thin @import root over `tokens/*.css` partials; the
    // `--tab-indicator-max-stretch` token lives in a partial post-carve. Read the
    // ROOT + every partial so a partial-move never strands the token assertion.
    let tokens = read("src/styles/tokens.css");
    const tokensDir = resolve(ROOT, "src/styles/tokens");
    if (existsSync(tokensDir)) {
        for (const f of readdirSync(tokensDir)) {
            if (f.endsWith(".css")) tokens += "\n" + read(`src/styles/tokens/${f}`);
        }
    }
    const apiIndex = read("src/api/index.ts");
    const apiCode = stripComments(apiIndex);
    const pkg = JSON.parse(read("package.json") || "{}");

    // ── 1. ONE Tabs family — SegmentedTabs.vue exists; the old SFCs are GONE. ──
    assert("SegmentedTabs.vue exists", sfc.length > 0);
    assert(
        "old BouncyToggle.vue deleted",
        !existsSync(resolve(ROOT, `${TABS_DIR}/BouncyToggle.vue`)),
    );
    assert(
        "old BouncyTabs.vue deleted",
        !existsSync(resolve(ROOT, `${TABS_DIR}/BouncyTabs.vue`)),
    );
    assert(
        "old UnderlineTabs.vue deleted",
        !existsSync(resolve(ROOT, `${TABS_DIR}/UnderlineTabs.vue`)),
    );
    assert(
        "old useBouncySlider.ts deleted",
        !existsSync(resolve(ROOT, `${TABS_DIR}/composables/useBouncySlider.ts`)),
    );
    assert(
        "useTabIndicator.ts (the renamed engine) exists",
        composable.length > 0,
    );
    assert(
        "standalone responsive-tabs/ dir retired",
        !existsSync(resolve(ROOT, "src/components/custom/responsive-tabs")),
    );
    assert(
        "src/subpaths/responsive-tabs.ts retired",
        !existsSync(resolve(ROOT, "src/subpaths/responsive-tabs.ts")),
    );

    // ── 2. The barrel exports SegmentedTabs + types, no Bouncy*/Underline*. ──
    assert(
        "barrel exports SegmentedTabs",
        /export\s*\{\s*default as SegmentedTabs\s*\}/.test(barrelCode),
    );
    assert(
        "barrel exports SegmentedTabOption type",
        /SegmentedTabOption/.test(barrelCode),
    );
    assert(
        "barrel exports SegmentedTabsVariant type",
        /SegmentedTabsVariant/.test(barrelCode),
    );
    assert(
        "barrel does NOT re-export any Bouncy*/UnderlineTabs symbol",
        !/\bBouncy(Tabs|Toggle)\b/.test(barrelCode) &&
            !/\bUnderlineTabs\b/.test(barrelCode),
    );

    // ── 3. The variant axis — segmented (DEFAULT) · pill · underline. ──
    assert(
        "variant type is the three-value axis",
        /SegmentedTabsVariant\s*=\s*"segmented"\s*\|\s*"pill"\s*\|\s*"underline"/.test(
            sfc,
        ),
    );
    assert(
        "variant default is segmented",
        /withDefaults\([\s\S]*variant:\s*"segmented"/.test(sfc),
    );
    // the three chrome rules paint (the carved-out segmented-tabs.css).
    assert(
        "segmented/pill/underline variant CSS all present",
        /\.segmented-tabs--pill\b/.test(css) &&
            /\.segmented-tabs--underline\b/.test(css) &&
            /\.segmented-tabs\b/.test(css),
    );

    // ── 4. ONE shared elastic indicator reading --spring-snappy. ──
    // The glide register must be the CONTROL spring (snappy), NOT --spring-bouncy.
    assert(
        "indicator glides on --spring-snappy",
        /transition:[^;]*var\(--spring-snappy\)/.test(css),
    );
    assert(
        "indicator does NOT route travel through --spring-bouncy",
        !/transition:[^;]*var\(--spring-bouncy\)/.test(css),
    );

    // ── 5. The squish-on-travel atom — the new token + the volume-preserving
    //       reciprocal scale pairing, capped LOW. ──
    assert(
        "--tab-indicator-max-stretch token minted",
        /--tab-indicator-max-stretch:\s*1\.0[0-9]/.test(tokens),
    );
    const capMatch = tokens.match(/--tab-indicator-max-stretch:\s*([\d.]+)/);
    facts.maxStretch = capMatch ? Number(capMatch[1]) : null;
    assert(
        "max-stretch is restrained (≤ 1.10 — the iOS-26.2-dialed-down register)",
        facts.maxStretch != null && facts.maxStretch <= 1.1 && facts.maxStretch > 1,
    );
    // volume-preserving reciprocal pairing: `scale: var(--stretch) calc(1 / var(--stretch))`.
    assert(
        "indicator squish is volume-preserving (scale X / reciprocal Y)",
        /scale:\s*var\(--stretch\)\s*calc\(\s*1\s*\/\s*var\(--stretch\)\s*\)/.test(
            css,
        ),
    );
    assert(
        "useTabIndicator writes the --stretch travel scalar",
        /setProperty\(\s*["']--stretch["']/.test(composable) &&
            /--tab-indicator-max-stretch/.test(composable),
    );
    // PRM-gated — the squish must early-return under reduced motion.
    assert(
        "squish is prefers-reduced-motion-gated",
        /prefers-reduced-motion[\s\S]*reduce/.test(composable),
    );

    // ── 6. ARIA-role-per-variant — underline=tablist/tab+aria-selected;
    //       segmented/pill=group+aria-pressed. ──
    assert(
        "underline variant emits role=tablist/tab + aria-selected",
        /role="tablist"|isUnderline\s*\?\s*'tablist'/.test(sfc) &&
            /aria-selected/.test(sfc),
    );
    assert(
        "segmented/pill emit role=group + aria-pressed",
        /'group'/.test(sfc) && /aria-pressed/.test(sfc),
    );

    // ── 7. Multi-select + responsive folded onto the one component. ──
    assert("multiSelect prop present", /multiSelect\?:\s*boolean/.test(sfc));
    assert(
        "responsive prop present (subsumes ResponsiveTabs)",
        /responsive\?:\s*boolean\s*\|\s*SegmentedTabsResponsive/.test(sfc),
    );

    // ── 8. api/index.ts re-exports the unified types, not the dropped ones. ──
    assert(
        "api/index.ts re-exports SegmentedTabsProps",
        /SegmentedTabsProps/.test(apiCode),
    );
    assert(
        "api/index.ts dropped ResponsiveTabsProps/BouncyToggleProps re-exports",
        !/ResponsiveTabsProps/.test(apiCode) &&
            !/BouncyToggleProps/.test(apiCode),
    );

    // ── 9. The /responsive-tabs subpath is gone from package.json. ──
    const exportsKeys = Object.keys(pkg.exports ?? {});
    facts.hasResponsiveTabsSubpath = exportsKeys.includes("./responsive-tabs");
    assert(
        "package.json ./responsive-tabs subpath retired",
        !facts.hasResponsiveTabsSubpath,
    );
    assert(
        "package.json ./tabs subpath preserved",
        exportsKeys.includes("./tabs"),
    );

    // ── 10. Deletion-proof — NO Bouncy*/UnderlineTabs/ResponsiveTabs IDENTIFIER
    //        survives as a live import/tag/export across src + demo. Prose and
    //        comments that DESCRIBE the merge are allowed; a live code reference
    //        (import {…}, <Tag>, export …) is NOT. We scan for the code forms. ──
    const survivors = [];
    const NAMES = ["BouncyTabs", "BouncyToggle", "UnderlineTabs", "ResponsiveTabs"];
    for (const r of SWEEP_ROOTS) {
        const base = resolve(ROOT, r);
        if (!existsSync(base) || !statSync(base).isDirectory()) continue;
        for (const file of walk(base)) {
            // Strip JS/TS comments + Vue HTML comments so a prose mention of a
            // dropped name (e.g. "subsumes the former ResponsiveTabs") is not a
            // false survivor — only a LIVE code form (import/export/<Tag>) reds.
            const raw = readFileSync(file, "utf8");
            const src = stripComments(raw).replace(/<!--[\s\S]*?-->/g, "");
            for (const name of NAMES) {
                const codeRef = new RegExp(
                    `(import\\b[^;]*\\b${name}\\b|export\\b[^;]*\\b${name}\\b|<${name}[\\s/>])`,
                );
                if (codeRef.test(src)) {
                    survivors.push(`${file.slice(ROOT.length + 1)} :: ${name}`);
                }
            }
        }
    }
    facts.codeSurvivors = survivors;
    assert(
        "no live Bouncy*/UnderlineTabs/ResponsiveTabs code reference survives",
        survivors.length === 0,
    );

    return { facts, violations };
}

// ── The fail-CLOSED π LIVE arm ──
// Probes the live demo /navigation/tabs: the active indicator must MOVE
// (glide) between two segments AND its `scale`/`--stretch` must deviate from
// the rest value mid-travel (squish). When the Playwright workspace IS present
// the demo MUST be reachable + the indicator MUST animate — else a hard RED.
async function liveArm() {
    const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
    const ROUTE = "/navigation/tabs";

    // Detect the π workspace (hoisted OR local). Absent → befitting-silent SKIP.
    const wsCandidates = [
        resolve(ROOT, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "../tests-visual/node_modules/@playwright/test/package.json"),
    ];
    const workspacePresent = wsCandidates.some((p) => existsSync(p));

    let playwright = null;
    for (const mod of ["playwright", "playwright-core"]) {
        try {
            playwright = await import(mod);
            break;
        } catch {
            /* not installed */
        }
    }

    if (!playwright) {
        return {
            ran: false,
            failClosed: false,
            reason: workspacePresent
                ? "playwright module unresolved despite workspace marker"
                : "no Playwright harness on this runner",
            workspacePresent,
        };
    }

    const { chromium } = playwright;
    let browser = null;
    try {
        browser = await chromium.launch();
        const page = await browser.newPage();
        const resp = await page.goto(`${BASE_URL}${ROUTE}`, {
            waitUntil: "networkidle",
            timeout: 8000,
        });
        if (!resp || !resp.ok()) {
            throw new Error(`demo unreachable at ${BASE_URL}${ROUTE}`);
        }
        // The default segmented strip + its anchor/JS indicator.
        const probe = await page.evaluate(async () => {
            const strip = document.querySelector(".segmented-tabs");
            const indicator = document.querySelector(".segmented-indicator");
            if (!strip || !indicator) return { ok: false, reason: "no strip/indicator" };
            const btns = [...strip.querySelectorAll(".segmented-tab")];
            if (btns.length < 2) return { ok: false, reason: "too few segments" };
            const rect0 = indicator.getBoundingClientRect();
            const restScale = getComputedStyle(indicator).scale;
            // click a far segment and sample mid-travel.
            btns[btns.length - 1].click();
            await new Promise((r) => requestAnimationFrame(r));
            await new Promise((r) => requestAnimationFrame(r));
            const midScale = getComputedStyle(indicator).getPropertyValue("--stretch");
            await new Promise((r) => setTimeout(r, 400));
            const rect1 = indicator.getBoundingClientRect();
            return {
                ok: true,
                glided: Math.abs(rect1.left - rect0.left) > 4,
                restScale,
                midStretch: Number(midScale) || 1,
            };
        });
        const glided = probe.ok && probe.glided;
        const squished = probe.ok && probe.midStretch > 1.0;
        return {
            ran: true,
            failClosed: workspacePresent,
            workspacePresent,
            glided,
            squished,
            probe,
        };
    } finally {
        if (browser) await browser.close();
    }
}

async function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_TABS_UNIFIED_ARTIFACT",
        "AX-tabs-unified",
    );
    const { facts, violations } = detect();

    // The π arm — fail-CLOSED when the workspace is present.
    let live = { ran: false, failClosed: false, reason: "not attempted" };
    try {
        live = await liveArm();
    } catch (err) {
        live = {
            ran: false,
            failClosed: false,
            error: String(err?.message ?? err),
        };
    }
    facts.live = live;

    // Fail-closed promotion: if the workspace IS present, the live arm MUST have
    // run AND the indicator MUST have glided + squished — else a hard RED.
    if (live.failClosed) {
        if (!live.ran) {
            violations.push(
                `π live arm: workspace present but demo unreachable (${live.error ?? live.reason ?? "unknown"}) — fail-CLOSED`,
            );
        } else {
            if (!live.glided)
                violations.push("π live arm: the indicator did NOT glide between segments (fail-CLOSED)");
            if (!live.squished)
                violations.push("π live arm: the indicator did NOT squish (--stretch never exceeded 1) on travel (fail-CLOSED)");
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:tabs-unified",
        command: COMMAND,
        facts,
        violations,
    });

    console.log("proof:tabs-unified — the SegmentedTabs unification gate (AX.W53)");
    console.log(`  SegmentedTabs.vue       : ${facts["SegmentedTabs.vue exists"]}`);
    console.log(`  Bouncy* deleted         : ${facts["old BouncyToggle.vue deleted"]}`);
    console.log(`  variant axis (3-value)  : ${facts["variant type is the three-value axis"]}`);
    console.log(`  glides on --spring-snappy: ${facts["indicator glides on --spring-snappy"]}`);
    console.log(`  squish token (≤1.10)    : ${facts["max-stretch is restrained (≤ 1.10 — the iOS-26.2-dialed-down register)"]} (${facts.maxStretch})`);
    console.log(`  code survivors          : ${facts.codeSurvivors.length}`);
    console.log(
        `  π live arm              : ${live.ran ? `ran (glided=${live.glided}, squished=${live.squished})` : `not run (${live.failClosed ? "FAIL-CLOSED" : "skipped"})`}`,
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
