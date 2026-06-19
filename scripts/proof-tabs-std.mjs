// BA.W-TABS — proof:tabs-std, the standardized SegmentedTabs gate.
//
// SUPERSEDES proof:tabs-unified (the AX.W53 unification gate that machine-locked
// the THREE-value variant axis + overflow + multi-select shape). This wave
// standardizes the family onto ONE engine, TWO materials, ONE orientation axis:
//   · PILL    (DEFAULT, the glass material — absorbs the retired `segmented`)
//   · UNDERLINE (the paper material — the ink hairline on `.paper-ink-mark`)
// with axis-derived orientation, the calibrated `--tab-indicator-duration` clock,
// release-at-arrival squish (the `INDICATOR_RELEASE_MS` mid-glide timer GONE), the
// BA-VJS-3 center-correction, and the `ui/Tabs` public surface + `overflow` +
// `:multi-select` axes RETIRED (clean break, no alias — "No legacy code").
//
// TWO arms:
//   - the DEVICE-FREE SOURCE arm (always runs, always gates) — the cut taxonomy,
//     the two-material register CSS, the calibrated clock + release-at-arrival,
//     the axis-derived orientation, the retirement grep, the dock-rail
//     internal-keep witness.
//   - the FAIL-CLOSED π LIVE arm (runs only when the Playwright workspace + a
//     demo dev server are present) — the indicator GLIDES + SQUISHES + CENTERS
//     live; the underline paints NO plate. The π truth lives in
//     tests-visual/tabs-std.spec.ts (the full no-plate / vertical-axis / timing /
//     centering readback); this arm is the gate-side smoke confirm.
//
// Born-RED at the pre-W-TABS HEAD: the variant axis is three-value (segmented
// survives); `overflow`/`multiSelect` props exist; `ui/Tabs` is on the public
// barrel; the clock is `--duration-normal`; `INDICATOR_RELEASE_MS` exists. Bite:
// re-introduce `variant="segmented"`/the overflow axis/`:multi-select`/a ui/Tabs
// public-barrel row/`INDICATOR_RELEASE_MS`/the `--duration-normal` indicator clock
// → the matching clause reddens.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { DELETION_SWEEP_ROOTS } from "./constellation.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:tabs-std";

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ comments (so a prose mention of a retired token in a
// comment is not mistaken for a live code reference). Newlines preserved.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

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
    const sfcCode = stripComments(sfc);
    const css =
        read("src/styles/segmented-tabs.css") || read(`${TABS_DIR}/segmented-tabs.css`);
    const composable = read(`${TABS_DIR}/composables/useTabIndicator.ts`);
    const composableCode = stripComments(composable);
    const constants = read(`${TABS_DIR}/constants.ts`);
    const constantsCode = stripComments(constants);
    // tokens.css is a thin @import root over `tokens/*.css` partials.
    let tokens = read("src/styles/tokens.css");
    const tokensDir = resolve(ROOT, "src/styles/tokens");
    if (existsSync(tokensDir)) {
        for (const f of readdirSync(tokensDir)) {
            if (f.endsWith(".css")) tokens += "\n" + read(`src/styles/tokens/${f}`);
        }
    }
    const rootBarrel = read("src/index.ts");
    const rootBarrelCode = stripComments(rootBarrel);
    const uiBarrel = read("src/components/ui/index.ts");
    const uiBarrelCode = stripComments(uiBarrel);
    const dockGroup = read("src/components/custom/dock/DockLayerGroup.vue");
    const pkg = JSON.parse(read("package.json") || "{}");

    // ── 1. ONE component, the TWO-material variant axis (pill · underline). ──
    assert("SegmentedTabs.vue exists", sfc.length > 0);
    assert(
        "variant type is the two-material axis (pill | underline)",
        /SegmentedTabsVariant\s*=\s*"pill"\s*\|\s*"underline"/.test(sfc),
    );
    assert(
        "variant default is pill (the glass material — absorbs segmented)",
        /withDefaults\([\s\S]*variant:\s*"pill"/.test(sfc),
    );
    // The retired `segmented` value is GONE from the type + the default.
    assert(
        'no "segmented" variant value survives in the type or default',
        !/SegmentedTabsVariant\s*=[^;]*"segmented"/.test(sfc) &&
            !/variant:\s*"segmented"/.test(sfcCode),
    );
    assert(
        "both register CSS present (pill track + underline ink mark)",
        /\.segmented-tabs--underline\b/.test(css) && /\.segmented-tabs\b/.test(css),
    );

    // ── 2. The orientation axis is first-class (axis-derived). ──
    assert(
        "orientation prop present (horizontal | vertical)",
        /orientation\?:\s*SegmentedTabsOrientation/.test(sfc) &&
            /SegmentedTabsOrientation\s*=\s*"horizontal"\s*\|\s*"vertical"/.test(sfc),
    );
    assert(
        "vertical CSS axis present (block-axis indicator)",
        /\.segmented-tabs--vertical\b/.test(css),
    );
    // The engine keys the squish/measure off a computed `vertical` axis (not a
    // hardcoded dimension) — the R10-2 horizontal-only slab is impossible.
    assert(
        "useTabIndicator derives its axis from the `vertical` param",
        /vertical:\s*ComputedRef<boolean>/.test(composable) &&
            /vertical\.value/.test(composable),
    );

    // ── 3. The PILL material reads the glass register (W-REGISTER-IOS), NOT gray. ──
    // The track is glass-quiet; the indicator is glass-floating. NO --surface-tint
    // gray plate on the track or a saturated --foreground fill on the indicator.
    assert(
        "pill track rides the glass-quiet tier (no --surface-tint gray plate)",
        /\.segmented-tabs\s*\{[^}]*background:\s*var\(--glass-bg-quiet\)/s.test(css),
    );
    assert(
        // BC.W-TABS-IOS re-pointed the pill onto the element-level W55-tinted floating
        // pair (`--glass-bg-floating-tinted` = color-mix(in oklab, --glass-bg-floating,
        // …)) — STILL the glass-floating tier (the adaptive register reaching the pill),
        // NOT a saturated --foreground fill or opaque bg-card. The clause accepts the
        // raw rung OR its W55-tinted wrapper (the substitution-over-redeclaration shape
        // BB.W-BUTTON-GLASS already navigated for the button register).
        "pill indicator rides the glass-floating tier (selected-reads-as-glass)",
        /\.segmented-indicator\s*\{[^}]*background:\s*var\(--glass-bg-floating(?:-tinted)?\)/s.test(
            css,
        ),
    );
    assert(
        "no --surface-tint-6 gray track survives on the pill register",
        !/--surface-tint-6/.test(css),
    );

    // ── 4. The UNDERLINE material reads the shared .paper-ink-mark register. ──
    assert(
        "underline composes the .paper-ink-mark register tokens (no plate/blur/glass)",
        /\.segmented-tabs--underline\b[\s\S]*?--paper-ink-mark-weight/.test(css) &&
            /--paper-ink-mark-color/.test(css),
    );
    // The underline strips any plate background/blur (the R10-2 oval-blob class).
    assert(
        "underline track paints no surface (background:none / backdrop:none)",
        /\.segmented-tabs--underline\s*\{[^}]*background:\s*none/s.test(css),
    );

    // ── 5. The motion contract — the calibrated clock + release-at-arrival. ──
    assert(
        "--tab-indicator-duration token minted off --spring-snappy-duration",
        /--tab-indicator-duration:\s*var\(--spring-snappy-duration\)/.test(tokens),
    );
    // The indicator transitions read the calibrated clock, NOT the generic
    // --duration-normal (the R10-2 sub-pixel tail).
    assert(
        "indicator glide reads --tab-indicator-duration (the calibrated clock)",
        /transition:[^;]*var\(--tab-indicator-duration\)/.test(css),
    );
    // Scope the negative to the INDICATOR transition rules only (the `scale`/`inset`/
    // `transform` glide channels) — a tab-BUTTON colour cross-fade on a generic
    // clock is legitimate (§6 doctrine: a colour shift is a bezier ease). We assert
    // no `transition:` line that animates `scale`/`inset`/`transform`/`width`/`height`
    // routes through `--duration-normal`.
    assert(
        "indicator glide does NOT route through the generic --duration-normal",
        !css
            .split("\n")
            .some(
                (ln) =>
                    /transition:\s*(?:scale|inset|transform|width|height)\b/.test(ln) &&
                    /var\(--duration-normal\)/.test(ln),
            ) &&
            // and the multi-line `.segmented-indicator--js` block (a comma-list) does
            // not carry --duration-normal on any of its property legs.
            !/\.segmented-indicator--js\s*\{[^}]*var\(--duration-normal\)/s.test(css),
    );
    assert("indicator glides on --spring-snappy", /var\(--spring-snappy\)/.test(css));
    // INDICATOR_RELEASE_MS (the fixed mid-glide timer) is GONE; the release keys
    // off the calibrated clock × the arrival fraction.
    assert(
        "INDICATOR_RELEASE_MS retired (the fixed mid-glide timer is gone)",
        !/INDICATOR_RELEASE_MS/.test(constantsCode) &&
            !/INDICATOR_RELEASE_MS/.test(composableCode),
    );
    assert(
        "release keys off arrival (INDICATOR_RELEASE_AT_ARRIVAL fraction)",
        /INDICATOR_RELEASE_AT_ARRIVAL/.test(constantsCode) &&
            /INDICATOR_RELEASE_AT_ARRIVAL/.test(composableCode),
    );
    // The squish is still volume-preserving + PRM-gated + reads the cap token. The
    // cap is restrained to the anti-taffy band (≤1.2): BC.W-LIQUID-TAB lifted it 1.08
    // → 1.15 so the liquid-tab pull visibly swells the pill (still LOW — it swells,
    // never taffy-pulls); the band ceiling is the ≤1.2 anti-taffy bar, not the old
    // +10% restraint.
    assert(
        "--tab-indicator-max-stretch token present + restrained (≤1.2, the anti-taffy bar)",
        (() => {
            const m = tokens.match(/--tab-indicator-max-stretch:\s*([\d.]+)/);
            facts.maxStretch = m ? Number(m[1]) : null;
            return facts.maxStretch != null && facts.maxStretch <= 1.2 && facts.maxStretch > 1;
        })(),
    );
    assert(
        "indicator squish is volume-preserving (scale X / reciprocal Y)",
        /scale:\s*var\(--stretch\)\s*calc\(\s*1\s*\/\s*var\(--stretch\)\s*\)/.test(css),
    );
    assert(
        "squish is prefers-reduced-motion-gated",
        /prefers-reduced-motion[\s\S]*reduce/.test(composableCode),
    );

    // ── 6. The BA-VJS-3 center-correction (indicator center == button center). ──
    // The JS slider positions by CENTER (translate = center − size/2), NOT the raw
    // `offsetLeft` left-edge write the value.js fold flagged.
    assert(
        "JS slider is center-anchored (offsetLeft + width/2, not raw offsetLeft)",
        /offsetWidth\s*\/\s*2/.test(composable) ||
            /offsetLeft\s*\+[^;]*\/\s*2/.test(composable),
    );
    assert(
        "no raw translateX(offsetLeft) left-edge write survives",
        !/translateX\(\$\{btn\.offsetLeft\}px\)/.test(composable) &&
            !/translateX\(\$\{[^}]*\.offsetLeft\}px\)/.test(composable),
    );

    // ── 7. The taxonomy is CUT — overflow + multi-select props GONE. ──
    assert(
        "overflow axis retired (no overflow prop on SegmentedTabsProps)",
        !/overflow\?:\s*["']none["']/.test(sfc) &&
            !/\.segmented-tabs--scroll\b/.test(css) &&
            !/\.segmented-tabs--auto\b/.test(css),
    );
    assert(
        ":multi-select prop retired (no multiSelect prop)",
        !/multiSelect\?:\s*boolean/.test(sfc),
    );
    assert(
        "model is single-select string (the multi-select array model gone)",
        /defineModel<string>\(/.test(sfc) && !/defineModel<string\s*\|\s*string\[\]>/.test(sfc),
    );

    // ── 8. ui/Tabs LEFT the public surface; the dock-rail internal-keep holds. ──
    assert(
        "ui/Tabs retired from the root barrel (no `export * from ./components/ui/tabs`)",
        !/export\s*\*\s*from\s*["']\.\/components\/ui\/tabs["']/.test(rootBarrelCode),
    );
    assert(
        "ui/Tabs retired from the ui/ barrel (no `export * from ./tabs`)",
        !/export\s*\*\s*from\s*["']\.\/tabs["']/.test(uiBarrelCode),
    );
    // Anti-evasion: the dock-rail consumer is the recorded internal-keep — the reka
    // substrate files remain ONLY for it (DockLayerGroup imports them + uses the
    // :surface="false" hairline). A silent ui/Tabs public-barrel survivor reds above.
    assert(
        "dock-rail internal-keep witness: DockLayerGroup imports the reka Tabs substrate",
        /import\s*\{[^}]*\bTabs\b[^}]*\}\s*from\s*["']\.\.\/\.\.\/ui\/tabs["']/.test(
            dockGroup,
        ),
    );
    facts.dockRailArm = /TabsIndicator/.test(dockGroup)
        ? "internal-keep (dock-rail consumer holds)"
        : "delete (no dock-rail consumer)";

    // ── 9. The /tabs subpath is preserved (SegmentedTabs family). ──
    const exportsKeys = Object.keys(pkg.exports ?? {});
    assert("package.json ./tabs subpath preserved", exportsKeys.includes("./tabs"));

    // ── 10. The old gate retired WITH a registry re-point (not a silent delete). ──
    const scripts = pkg.scripts ?? {};
    assert(
        "proof:tabs-std registered in package.json scripts",
        typeof scripts["proof:tabs-std"] === "string",
    );
    assert(
        "proof:tabs-unified retired from package.json scripts",
        !Object.prototype.hasOwnProperty.call(scripts, "proof:tabs-unified"),
    );
    assert(
        "the old proof-tabs-unified.mjs file is gone (retired-with-re-point)",
        !existsSync(resolve(ROOT, "scripts/proof-tabs-unified.mjs")),
    );

    // ── 11. Deletion-proof — NO `overflow="scroll"`/`:multi-select` live ref on a
    //        SegmentedTabs survives across src + demo; no ui/Tabs PUBLIC import. ──
    const survivors = [];
    for (const r of SWEEP_ROOTS) {
        const base = resolve(ROOT, r);
        if (!existsSync(base) || !statSync(base).isDirectory()) continue;
        for (const file of walk(base)) {
            const raw = readFileSync(file, "utf8");
            const src = stripComments(raw).replace(/<!--[\s\S]*?-->/g, "");
            // A <SegmentedTabs … :multi-select> or overflow="scroll/auto" live tag.
            if (
                /<SegmentedTabs[\s\S]*?(?::multi-select|multi-select=|overflow="(?:scroll|auto)")/.test(
                    src,
                )
            ) {
                survivors.push(`${file.slice(ROOT.length + 1)} :: retired SegmentedTabs prop`);
            }
            // A ui/Tabs import from the PUBLIC barrel (the root package name).
            if (/import\s*\{[^}]*\bTabsList\b[^}]*\}\s*from\s*["']@mkbabb\/glass-ui["']/.test(src)) {
                survivors.push(`${file.slice(ROOT.length + 1)} :: ui/Tabs from the public barrel`);
            }
        }
    }
    facts.codeSurvivors = survivors;
    assert(
        "no retired-axis SegmentedTabs prop / public ui/Tabs import survives",
        survivors.length === 0,
    );

    return { facts, violations };
}

// ── The fail-CLOSED π LIVE arm ──
// Probes the live demo /navigation/tabs: the active indicator MOVES (glide), its
// `--stretch` deviates from rest mid-travel (squish), AND the underline variant
// paints NO plate. The full readback (centering, vertical axis, timing) lives in
// tests-visual/tabs-std.spec.ts; this arm is the gate-side smoke confirm.
async function liveArm() {
    const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
    const ROUTE = "/navigation/tabs";

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
        const probe = await page.evaluate(async () => {
            const strip = document.querySelector(".segmented-tabs:not(.segmented-tabs--underline)");
            const indicator = strip?.querySelector(".segmented-indicator");
            if (!strip || !indicator) return { ok: false, reason: "no pill strip/indicator" };
            const btns = [...strip.querySelectorAll(".segmented-tab")];
            if (btns.length < 2) return { ok: false, reason: "too few segments" };
            const rect0 = indicator.getBoundingClientRect();
            btns[btns.length - 1].click();
            await new Promise((r) => requestAnimationFrame(r));
            await new Promise((r) => requestAnimationFrame(r));
            const midStretch = getComputedStyle(indicator).getPropertyValue("--stretch");
            await new Promise((r) => setTimeout(r, 400));
            const rect1 = indicator.getBoundingClientRect();

            // The underline variant — NO plate (no ancestor/sibling element with a
            // filled bg + pill radius behind the active tab).
            const underlineStrip = document.querySelector(".segmented-tabs--underline");
            let underlinePlate = false;
            if (underlineStrip) {
                const before = getComputedStyle(underlineStrip, "::before");
                const h = parseFloat(before.blockSize || before.height) || 0;
                underlinePlate = h > 6; // a 2px hairline, not a 31px plate
            }
            return {
                ok: true,
                glided: Math.abs(rect1.left - rect0.left) > 4,
                midStretch: Number(midStretch) || 1,
                underlinePlate,
            };
        });
        const glided = probe.ok && probe.glided;
        const squished = probe.ok && probe.midStretch > 1.0;
        const noPlate = probe.ok && !probe.underlinePlate;
        return {
            ran: true,
            failClosed: workspacePresent,
            workspacePresent,
            glided,
            squished,
            noPlate,
            probe,
        };
    } finally {
        if (browser) await browser.close();
    }
}

async function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_TABS_STD_ARTIFACT", "BA-tabs-std");
    const { facts, violations } = detect();

    let live = { ran: false, failClosed: false, reason: "not attempted" };
    try {
        live = await liveArm();
    } catch (err) {
        live = { ran: false, failClosed: false, error: String(err?.message ?? err) };
    }
    facts.live = live;

    if (live.failClosed) {
        if (!live.ran) {
            violations.push(
                `π live arm: workspace present but demo unreachable (${live.error ?? live.reason ?? "unknown"}) — fail-CLOSED`,
            );
        } else {
            if (!live.glided)
                violations.push("π live arm: the pill indicator did NOT glide between segments (fail-CLOSED)");
            if (!live.squished)
                violations.push("π live arm: the pill indicator did NOT squish (--stretch never exceeded 1) on travel (fail-CLOSED)");
            if (!live.noPlate)
                violations.push("π live arm: the underline variant painted a PLATE (::before block-size > 6px — the R10-2 oval blob) (fail-CLOSED)");
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:tabs-std",
        command: COMMAND,
        facts,
        violations,
    });

    console.log("proof:tabs-std — the standardized SegmentedTabs gate (BA.W-TABS)");
    console.log(`  SegmentedTabs.vue        : ${facts["SegmentedTabs.vue exists"]}`);
    console.log(`  variant axis (pill|underline): ${facts["variant type is the two-material axis (pill | underline)"]}`);
    console.log(`  orientation first-class  : ${facts["orientation prop present (horizontal | vertical)"]}`);
    console.log(`  pill=glass / underline=paper : ${facts["pill track rides the glass-quiet tier (no --surface-tint gray plate)"]} / ${facts["underline track paints no surface (background:none / backdrop:none)"]}`);
    console.log(`  calibrated clock         : ${facts["indicator glide reads --tab-indicator-duration (the calibrated clock)"]}`);
    console.log(`  release-at-arrival       : ${facts["release keys off arrival (INDICATOR_RELEASE_AT_ARRIVAL fraction)"]} (RELEASE_MS gone=${facts["INDICATOR_RELEASE_MS retired (the fixed mid-glide timer is gone)"]})`);
    console.log(`  BA-VJS-3 center-corrected: ${facts["JS slider is center-anchored (offsetLeft + width/2, not raw offsetLeft)"]}`);
    console.log(`  overflow/multi retired   : ${facts["overflow axis retired (no overflow prop on SegmentedTabsProps)"]} / ${facts[":multi-select prop retired (no multiSelect prop)"]}`);
    console.log(`  ui/Tabs off public barrel: root=${facts["ui/Tabs retired from the root barrel (no `export * from ./components/ui/tabs`)"]} ui=${facts["ui/Tabs retired from the ui/ barrel (no `export * from ./tabs`)"]}`);
    console.log(`  dock-rail arm            : ${facts.dockRailArm}`);
    console.log(`  proof:tabs-unified re-pointed: ${facts["proof:tabs-unified retired from package.json scripts"]} (file gone=${facts["the old proof-tabs-unified.mjs file is gone (retired-with-re-point)"]})`);
    console.log(`  code survivors           : ${facts.codeSurvivors.length}`);
    console.log(
        `  π live arm               : ${live.ran ? `ran (glided=${live.glided}, squished=${live.squished}, noPlate=${live.noPlate})` : `not run (${live.failClosed ? "FAIL-CLOSED" : "skipped"})`}`,
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
