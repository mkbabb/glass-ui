// AX.W04 — proof:dock-wrap-content-driven, the dock CONTENT-DRIVEN-WRAP detector
// (π-lane, fail-CLOSED).
//
// `overflow="wrap"` was a VIEWPORT `@media (min-width: 640px)` toggle, not a content
// strategy: above 640px a wrap dock unconditionally forced `flex-wrap: nowrap` +
// `max-width: none`, so a 40-button row at an 800px viewport rendered 1861px wide
// (overflowing the viewport by ~1060px) and NEVER wrapped. W04 re-expresses wrap as
// an INTRINSIC over-cap flex reflow: `flex-wrap: wrap` is always-on and the dock
// inline-size caps at `min(max-content, --dock-max-inline-size)`, so the row wraps
// to N rows EXACTLY when its intrinsic width exceeds the cap — at ANY viewport.
//
// This gate has TWO arms, mirroring proof-dock-animation-live.mjs:
//
//   (A) The DEVICE-FREE SOURCE arm (runs FIRST + ALWAYS, HARD-REDs on every runner).
//       A pure source parse over dock.css / tokens.css / GlassDock.vue / README.md
//       that asserts the magic-640 chain is GONE and the content-driven recipe +
//       the card-tier shadow/radius unify + the horizontal-only guard + the struck
//       false claim are IN. This is the born-RED→GREEN canary the orchestrator
//       verifies with NO browser: born-RED at HEAD a125d9a (the `@media 640` +
//       `--dock-overflow-bp` + the `--radius-2xl` wrap literal all present), GREEN
//       after the wave. The source greps are deletion-PROOFS (a valid runtime-gate
//       form per SPEC.md §Hard Gates), not "grep-for-source-string-as-behaviour".
//
//   (B) The LIVE Playwright arm (the π-lane RUNTIME truth; fail-CLOSED when the
//       tests-visual workspace is present). Mounts the demo `overflow="wrap"` dock
//       at a ≥640px viewport and asserts the computed `flex-wrap === "wrap"`,
//       `rowCount >= 2`, the dock `right <= innerWidth`, the radius resolves to
//       `--dock-card-radius` (not `--radius-2xl`), and a vertical wrap dock emits NO
//       `.dock-overflow-wrap`. The live-rAF truth additionally lives in the
//       tests-visual π workspace spec (dock-wrap-content-driven.spec.ts), run on the
//       real device by the orchestrator.
//
// House style mirrors proof-dock-animation-live.mjs: ESM .mjs, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on a real violation
// (0 on pass or harness-absent skip — the SOURCE arm still hard-REDs regardless).

import { resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const DOCK_ROUTE = "/navigation/dock";

// ── (A) the device-free SOURCE arm — pure detectors over the source files ─────
// Each returns nothing; it pushes to `violations`. Inputs are the raw file strings
// so the arm is import-side-effect-free + unit-testable.

/**
 * Strip CSS/JS block comments (`/* … *​/`) so a deletion-proof parses the ACTIVE
 * source, not commentary. A deletion-doc comment ("--dock-overflow-bp token are
 * DELETED") must not false-RED the deletion proof, and a "NO transition: min-height"
 * note must not false-RED the retired-morph proof.
 */
export function stripCssComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, " ");
}

/**
 * Detect the content-driven-wrap source contract. Born-RED at HEAD (the magic-640
 * chain present), GREEN after the wave. Returns {facts, violations}.
 *
 * The CSS inputs are parsed COMMENT-STRIPPED (deletion proofs assert over active
 * rules, not the deletion-doc comments). README is parsed RAW (the strike-proof
 * asserts the false claim is gone from the PROSE, comments included).
 *
 * @param {{dockCss:string, tokensCss:string, glassDockVue:string, readme:string}} src
 */
export function detectWrapSource(src) {
    const dockCss = stripCssComments(src.dockCss);
    const tokensCss = stripCssComments(src.tokensCss);
    const { glassDockVue, readme } = src;
    const violations = [];
    const facts = {};

    // 1. The magic-640 `@media` snap-back is DELETED. HEAD carries an
    //    `@media (min-width: 640px …) { … .dock-overflow-wrap { flex-wrap: nowrap …`
    //    block; the wave excises it. We assert no `@media (min-width: 640px …)` rule
    //    whose BODY governs `.dock-overflow-wrap`.
    const mediaBlocks = [...dockCss.matchAll(/@media\s*\(min-width:\s*640px[^)]*\)\s*\{/g)];
    let media640GovernsWrap = false;
    for (const m of mediaBlocks) {
        // Scan from the block open brace to its matching close, balancing braces.
        const start = m.index + m[0].length;
        let depth = 1;
        let i = start;
        for (; i < dockCss.length && depth > 0; i++) {
            if (dockCss[i] === "{") depth++;
            else if (dockCss[i] === "}") depth--;
        }
        const body = dockCss.slice(start, i);
        if (/\.dock-overflow-wrap/.test(body)) media640GovernsWrap = true;
    }
    facts.media640GovernsWrap = media640GovernsWrap;
    if (media640GovernsWrap) {
        violations.push(
            "dock.css still has an `@media (min-width: 640px)` block governing `.dock-overflow-wrap` — the viewport snap-back was not deleted (the magic-640 chain survives)",
        );
    }

    // 2. The `--dock-overflow-bp` token is DELETED from tokens.css (no live
    //    definition). A deletion-doc mention ("--dock-overflow-bp token are DELETED")
    //    is allowed; a DEFINITION (`--dock-overflow-bp:`) is not.
    const overflowBpDefined = /--dock-overflow-bp\s*:/.test(tokensCss) || /--dock-overflow-bp\s*:/.test(dockCss);
    facts.overflowBpDefined = overflowBpDefined;
    if (overflowBpDefined) {
        violations.push(
            "the `--dock-overflow-bp` token is still DEFINED — the viewport-breakpoint token was not deleted",
        );
    }

    // 3. The wrap recipe is ALWAYS-ON content-driven flex-wrap: the
    //    `.dock-overflow-wrap .dock-layer--full` rule carries `flex-wrap: wrap`, AND
    //    the `.dock-overflow-wrap` root carries the `min(max-content, …)` inline cap.
    const wrapFullRule = sliceRule(dockCss, ".glass-dock.dock-overflow-wrap .dock-layer--full");
    facts.wrapFullHasFlexWrap = wrapFullRule != null && /flex-wrap:\s*wrap/.test(wrapFullRule);
    if (!facts.wrapFullHasFlexWrap) {
        violations.push(
            "the `.dock-overflow-wrap .dock-layer--full` rule does not carry an always-on `flex-wrap: wrap` (the content-driven reflow is missing)",
        );
    }
    const wrapRootRule = sliceRule(dockCss, ".glass-dock.dock-overflow-wrap {");
    // The cap is the VALID idiom: the dock base shrink-wraps to content, and the
    // wrap recipe caps that intrinsic width at `max-inline-size: var(--dock-max-inline-size)`.
    // The `min(max-content, …)` form is INVALID CSS (math functions reject the
    // `max-content` intrinsic keyword → invalid-at-computed-value → the property
    // computes to its initial `none` and the cap silently drops, so the over-cap row
    // never wraps). The check asserts the valid plain cap AND that no `min(max-content`
    // regression sneaks back in.
    const wrapHasInvalidMinMaxContent =
        wrapRootRule != null && /max-inline-size:\s*min\(\s*max-content/.test(wrapRootRule);
    facts.wrapRootHasMaxContentCap =
        wrapRootRule != null &&
        !wrapHasInvalidMinMaxContent &&
        /max-inline-size:\s*var\(--dock-max-inline-size\)/.test(wrapRootRule);
    if (wrapHasInvalidMinMaxContent) {
        violations.push(
            "the `.dock-overflow-wrap` root caps inline-size with the INVALID `min(max-content, var(--dock-max-inline-size))` — math functions reject the `max-content` intrinsic keyword, so the property computes to `none` and the cap silently drops (the over-cap row never wraps); use the plain `max-inline-size: var(--dock-max-inline-size)` over the base shrink-wrap",
        );
    } else if (!facts.wrapRootHasMaxContentCap) {
        violations.push(
            "the `.dock-overflow-wrap` root does not cap inline-size at `var(--dock-max-inline-size)` — the over-cap reflow trigger is missing",
        );
    }

    // 4. F4 radius unify — the wrap recipe morphs the corner onto `--dock-card-radius`
    //    (not the bare `--radius-2xl` literal) keyed off `--dock-expand-t` (the
    //    settled-state-aware derivative of the `--dock-morph-t` W01 scalar).
    facts.wrapRootUsesRadius2xl = wrapRootRule != null && /border-radius:\s*var\(--radius-2xl\)/.test(wrapRootRule);
    if (facts.wrapRootUsesRadius2xl) {
        violations.push(
            "the `.dock-overflow-wrap` root still hardcodes `border-radius: var(--radius-2xl)` — the F4 radius unify onto `--dock-card-radius` did not land",
        );
    }
    facts.wrapRadiusOnCardRadiusScalar =
        wrapRootRule != null &&
        /--dock-card-radius/.test(wrapRootRule) &&
        /border-radius:\s*calc\(/.test(wrapRootRule) &&
        /--dock-expand-t/.test(wrapRootRule);
    if (!facts.wrapRadiusOnCardRadiusScalar) {
        violations.push(
            "the `.dock-overflow-wrap` border-radius does not morph `--dock-card-radius` off `--dock-expand-t` — the F4 radius unify + single-scalar morph is missing",
        );
    }

    // 5. F1 card-tier shadow — the `--shadow-dock-wrap` token exists on the cascade,
    //    AND the wrap recipe drives the floating-tier shadow off `--dock-expand-t`
    //    (the single scalar). The wrap box-shadow must read the scalar in lockstep
    //    with the radius (NOT a CSS transition on the retired `--dock-motion-resize`).
    facts.shadowDockWrapTokenDefined = /--shadow-dock-wrap\s*:/.test(tokensCss);
    if (!facts.shadowDockWrapTokenDefined) {
        violations.push(
            "the `--shadow-dock-wrap` card-tier token is not defined on the `:root` cascade (the F1 elevation token is missing)",
        );
    }
    facts.wrapShadowOnScalar =
        wrapRootRule != null &&
        /box-shadow:/.test(wrapRootRule) &&
        /--dock-expand-t/.test(wrapRootRule) &&
        /--dock-wrap-elev/.test(wrapRootRule);
    if (!facts.wrapShadowOnScalar) {
        violations.push(
            "the `.dock-overflow-wrap` box-shadow does not lift the floating-tier off `--dock-expand-t` (the F1 card-tier elevation morph is not scalar-driven)",
        );
    }
    // The retired JS-morph must be GONE from the wrap layer rule (no
    // `transition: min-height …` reflow morph).
    facts.wrapLayerHasMinHeightTransition =
        wrapFullRule != null && /transition:\s*min-height/.test(wrapFullRule);
    if (facts.wrapLayerHasMinHeightTransition) {
        violations.push(
            "the `.dock-overflow-wrap .dock-layer--full` rule still has a `transition: min-height` JS-morph — the retired AW.W3b spring-keyed reflow morph was not removed (F3)",
        );
    }

    // 6. F5 horizontal-only guard — GlassDock.vue emits `.dock-overflow-wrap` ONLY
    //    when `orientation !== 'vertical'`.
    facts.wrapGuardHorizontalOnly =
        /'dock-overflow-wrap':\s*overflow === 'wrap'\s*&&\s*orientation !== 'vertical'/.test(glassDockVue);
    if (!facts.wrapGuardHorizontalOnly) {
        violations.push(
            "GlassDock.vue does not guard the `.dock-overflow-wrap` emit on `orientation !== 'vertical'` (F5 horizontal-only is missing — wrap silently no-ops on a vertical rail)",
        );
    }

    // 7. F3 strike-proof — the false `proof:dock-layering-polish` wrap-reflow claim
    //    is STRUCK from README + dock.css (the `wrap reflow|morphing.*wrap` grep = 0).
    //    This is a DOC-ROT strike — it asserts over the RAW source (comments + prose
    //    included), the exact `grep` form the HardGate names.
    const strikeRe = /wrap reflow|morphing.*wrap/;
    facts.falseWrapClaimInDockCss = strikeRe.test(src.dockCss);
    facts.falseWrapClaimInReadme = strikeRe.test(readme);
    if (facts.falseWrapClaimInDockCss || facts.falseWrapClaimInReadme) {
        violations.push(
            `the false "wrap reflow" / "morphing wrap" claim is still present (dockCss:${facts.falseWrapClaimInDockCss} readme:${facts.falseWrapClaimInReadme}) — the F3 doc-rot strike did not land`,
        );
    }
    // The struck gate row must no longer narrate the unbacked wrap claim.
    facts.layeringPolishRowNarratesWrap = /proof:dock-layering-polish.*wrap/.test(readme);
    if (facts.layeringPolishRowNarratesWrap) {
        violations.push(
            "the README `proof:dock-layering-polish` gate row still narrates a wrap-reflow claim — the F3 strike is incomplete",
        );
    }

    return { facts, violations };
}

/**
 * Slice the body of the FIRST CSS rule whose selector text contains `selectorKey`,
 * balancing braces. Returns the rule body (between the matched `{` and its `}`), or
 * null if not found. Tolerant of the `.dock-overflow-wrap {` form (the trailing `{`
 * is part of the key for the root rule to disambiguate it from descendant rules).
 */
export function sliceRule(css, selectorKey) {
    const keyHasBrace = selectorKey.trimEnd().endsWith("{");
    const needle = keyHasBrace ? selectorKey.trimEnd().slice(0, -1).trimEnd() : selectorKey;
    // Find the selector, then the `{` that opens its block, then balance to `}`.
    let from = 0;
    while (from < css.length) {
        const idx = css.indexOf(needle, from);
        if (idx === -1) return null;
        // The char after the selector (skipping ws) must be `{` (the rule open) for
        // a root-rule match — guards against a longer descendant selector that
        // merely CONTAINS the key (e.g. `.dock-overflow-wrap .dock-layer--full`).
        const after = css.slice(idx + needle.length);
        const m = after.match(/^\s*\{/);
        if (m) {
            const open = idx + needle.length + m[0].length;
            let depth = 1;
            let i = open;
            for (; i < css.length && depth > 0; i++) {
                if (css[i] === "{") depth++;
                else if (css[i] === "}") depth--;
            }
            return css.slice(open, i - 1);
        }
        from = idx + needle.length;
    }
    return null;
}

// ── (B) the in-page probe (the live π-lane arm) ──────────────────────────────
// Serialized into the browser. Finds the demo `overflow="wrap"` dock (the
// `.dock-overflow-wrap` host), samples its computed `flex-wrap`, the row count of
// its `.dock-layer--full` children, the dock `right` vs `innerWidth`, and the
// computed `border-radius`. Also confirms no `.dock-overflow-wrap.vertical` exists.
function pageProbe() {
    const wrapDocks = [...document.querySelectorAll(".glass-dock.dock-overflow-wrap")];
    if (!wrapDocks.length) return { error: "no .dock-overflow-wrap dock on the route" };

    // Pick the WIDEST-content wrap dock (the one most likely to overflow its cap).
    const dock = wrapDocks[0];
    const layer = dock.querySelector(".dock-layer--full") ?? dock;
    const cs = getComputedStyle(layer);
    const flexWrap = cs.flexWrap;

    // rowCount: group the layer's flex children by their offsetTop band.
    const kids = [...layer.children].filter((c) => c.getBoundingClientRect().width > 0);
    const tops = kids.map((c) => Math.round(c.getBoundingClientRect().top));
    const rows = new Set(tops);
    const rowCount = rows.size;

    const r = dock.getBoundingClientRect();
    const dockCS = getComputedStyle(dock);

    // A vertical wrap dock must NOT carry `.dock-overflow-wrap` (horizontal-only).
    const verticalWrapDocks = document.querySelectorAll(
        ".glass-dock.vertical.dock-overflow-wrap",
    ).length;

    return {
        flexWrap,
        rowCount,
        dockRight: Math.round(r.right),
        innerWidth: window.innerWidth,
        borderRadius: dockCS.borderRadius,
        verticalWrapDocks,
    };
}

/** The pure detector over the live probe RESULT — returns {facts, violations}. */
export function detectLiveWrap(result) {
    const violations = [];
    const facts = {};
    if (!result || result.error) {
        violations.push(`live probe error: ${result?.error ?? "no result"}`);
        return { facts, violations };
    }
    facts.flexWrap = result.flexWrap;
    facts.rowCount = result.rowCount;
    facts.dockRight = result.dockRight;
    facts.innerWidth = result.innerWidth;
    facts.borderRadius = result.borderRadius;
    facts.verticalWrapDocks = result.verticalWrapDocks;

    if (result.flexWrap !== "wrap") {
        violations.push(
            `the wrap dock's layer computed flex-wrap is "${result.flexWrap}" (expected "wrap") — the content-driven reflow did not engage`,
        );
    }
    if (result.rowCount < 2) {
        violations.push(
            `the wrap dock's layer rendered ${result.rowCount} row(s) (expected >= 2) — the over-cap content did not wrap`,
        );
    }
    if (result.dockRight > result.innerWidth + 1) {
        violations.push(
            `the wrap dock's right edge (${result.dockRight}px) exceeds the viewport (${result.innerWidth}px) — it overflows the viewport (the 800px-bleed defect)`,
        );
    }
    if (result.verticalWrapDocks > 0) {
        violations.push(
            `${result.verticalWrapDocks} vertical dock(s) carry .dock-overflow-wrap — wrap must be horizontal-only (F5)`,
        );
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

function piWorkspacePresent(ROOT) {
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
    // Default to 127.0.0.1 (NOT `localhost`) to match the canonical demo spawn
    // (`npm run dev -- --host 127.0.0.1 --port 5173`) and the π playwright config.
    // `localhost` can resolve to IPv6 `::1` on macOS, which vite does not bind, so
    // the page loads degraded and the wrap-dock selector times out (a false RED).
    const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://127.0.0.1:5173";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_WRAP_ARTIFACT",
        "AX-dock-wrap-content-driven",
    );

    // (A) The DEVICE-FREE SOURCE arm — runs FIRST + ALWAYS, hard-RED on EVERY runner.
    const src = {
        dockCss: readFileSync(resolve(ROOT, "src/styles/dock.css"), "utf8"),
        tokensCss: readFileSync(resolve(ROOT, "src/styles/tokens.css"), "utf8"),
        glassDockVue: readFileSync(
            resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
            "utf8",
        ),
        readme: readFileSync(
            resolve(ROOT, "src/components/custom/dock/README.md"),
            "utf8",
        ),
    };
    const source = detectWrapSource(src);
    const piPresent = piWorkspacePresent(ROOT);

    const pw = await loadPlaywright();
    if (!pw) {
        // No browser harness reachable. The SOURCE arm STILL hard-REDs on a
        // violation; the live arm belongs to the tests-visual π workspace spec.
        const status = source.violations.length === 0 ? "skipped" : "fail";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason: piPresent
                ? "the library node_modules has no Playwright — the live wrap-geometry arm runs in the tests-visual π workspace (dock-wrap-content-driven.spec.ts); the device-free SOURCE arm ran here"
                : "no Playwright harness AND no π workspace on this runner — the live arm is asserted in the tests-visual workspace; the device-free SOURCE arm ran here",
            command: "npm run proof:dock-wrap-content-driven",
            facts: { piWorkspacePresent: piPresent, source: source.facts },
            violations: source.violations,
        });
        printSummary(source.facts, null, source.violations, ROOT, ARTIFACT);
        process.exit(status === "fail" ? 1 : 0);
    }

    let browser;
    let result;
    try {
        browser = await pw.chromium.launch();
        // ≥640px viewport — the exact width the magic-640 chain false-passed at.
        const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
        await page.goto(`${BASE_URL}${DOCK_ROUTE}`, { waitUntil: "networkidle" });
        await page.waitForSelector(".glass-dock.dock-overflow-wrap", { timeout: 5000 });
        // Let layout settle (fonts + the morph rest).
        await page.waitForTimeout(400);
        result = await page.evaluate(pageProbe);
    } catch (e) {
        if (browser) await browser.close();
        const reason = `could not reach the demo wrap dock at ${BASE_URL}${DOCK_ROUTE}: ${e.message}`;
        const failClosed = piPresent;
        const violations = [...source.violations];
        if (failClosed)
            violations.push(
                `${reason} — the π workspace is PRESENT (fail-CLOSED), so an unreachable live wrap dock is a hard RED, not a SKIP`,
            );
        const status = violations.length ? "fail" : "skipped";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason,
            command: "npm run proof:dock-wrap-content-driven",
            facts: { piWorkspacePresent: piPresent, source: source.facts },
            violations,
        });
        printSummary(source.facts, null, violations, ROOT, ARTIFACT);
        process.exit(status === "fail" ? 1 : 0);
    }
    await browser.close();

    const live = detectLiveWrap(result);
    const violations = [...source.violations, ...live.violations];
    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-wrap-content-driven",
        facts: { piWorkspacePresent: piPresent, source: source.facts, live: live.facts },
        violations,
    });
    printSummary(source.facts, live.facts, violations, ROOT, ARTIFACT);
    process.exit(status === "pass" ? 0 : 1);
}

function printSummary(sourceFacts, liveFacts, violations, ROOT, ARTIFACT) {
    console.log("proof:dock-wrap-content-driven — the dock content-driven-wrap detector (AX.W04)");
    console.log(`  [source] @media-640 governs wrap : ${sourceFacts.media640GovernsWrap} (must be false)`);
    console.log(`  [source] --dock-overflow-bp gone : ${!sourceFacts.overflowBpDefined}`);
    console.log(`  [source] always-on flex-wrap     : ${sourceFacts.wrapFullHasFlexWrap}`);
    console.log(`  [source] valid max-inline cap    : ${sourceFacts.wrapRootHasMaxContentCap}`);
    console.log(`  [source] radius unify (card-rad) : ${sourceFacts.wrapRadiusOnCardRadiusScalar} (2xl gone: ${!sourceFacts.wrapRootUsesRadius2xl})`);
    console.log(`  [source] --shadow-dock-wrap token: ${sourceFacts.shadowDockWrapTokenDefined}  shadow on scalar: ${sourceFacts.wrapShadowOnScalar}`);
    console.log(`  [source] horizontal-only guard   : ${sourceFacts.wrapGuardHorizontalOnly}`);
    console.log(`  [source] false-claim struck      : ${!sourceFacts.falseWrapClaimInDockCss && !sourceFacts.falseWrapClaimInReadme}`);
    if (liveFacts) {
        console.log(`  [live]   flex-wrap               : ${liveFacts.flexWrap} (expected wrap)`);
        console.log(`  [live]   rowCount                : ${liveFacts.rowCount} (>= 2)`);
        console.log(`  [live]   dock.right <= innerWidth: ${liveFacts.dockRight} <= ${liveFacts.innerWidth}`);
        console.log(`  [live]   border-radius           : ${liveFacts.borderRadius}`);
        console.log(`  [live]   vertical wrap docks      : ${liveFacts.verticalWrapDocks} (must be 0)`);
    } else {
        console.log("  [live]   SKIPPED on this runner (the source arm ran; the live arm is the tests-visual π spec)");
    }
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    const status = violations.length === 0 ? "pass" : "fail";
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
