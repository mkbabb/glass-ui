#!/usr/bin/env node
// AX.W56 — proof:squircle-language, the corner-SHAPE token-axis + rounded-vs-squircle
// POLICY lock (device-free SOURCE arm + a fail-CLOSED π render arm).
//
// The squircle is a SECOND corner axis parallel to the `--radius-*` ladder:
// `corner-shape` only changes the CURVE within the `border-radius` box. AX.W56
// mints `--corner-k-{squircle,soft,sharp}` (the superellipse-k primitives; MDN:
// `superellipse(K)` paints |x|^(2K)+|y|^(2K)=1, so `squircle == superellipse(2)
// == n=4`) + the semantic `--corner-shape-{card,pill,panel,bigdock,dialog,sheet,
// hero}` POLICY aliases, and RE-HOMES the shipped AW.W23 keyword: cards/pills stay
// round, the LARGE-RADIUS GLASS FAMILY (big-dock, dialog, sheet, panel, hero) is
// the squircle set (the large 12-24px radius is where the superellipse reads —
// W56b extended off big-dock-only per USER-DECISION R1). The native `corner-shape`
// is Chrome-139+ only
// (~65% global May 2026) → it ships ONLY inside `@supports (corner-shape:
// superellipse(2))`; the un-gated `border-radius` round is the cross-engine
// CONTRACT (Safari/Firefox have no positive signal through 2026). The clip-path
// figma-squircle cross-engine fallback is REJECTED (it hard-clips the box, severing
// the backdrop-filter blur halo + the cartoon offset-shadow that live outside the
// border-box) — recorded so a later agent does not "fix" the 35% gap with a JS path
// generator (R-squircle §3.3 / A-squircle-pivot §1).
//
// HOUSE STYLE mirrors proof-shadow-contract.mjs (the CSS-cascade contract gate):
// ESM .mjs, comment-strip first (false-witness discipline), a pure exported
// detector, a byte-stable JSON artefact via gate-output, a human summary,
// process.exit(1) on any violation. The π render arm mirrors
// proof-constellation-warp-live.mjs: fail-CLOSED when the tests-visual Playwright
// workspace is present (a wrong cornerShape readback on a present Chrome-139 device
// exits NON-ZERO), befitting-silent SKIP only on genuine device/workspace absence.
//
// THE SOURCE ASSERTS (device-free, run + hard-RED on every runner):
//   1. TOKEN-AXIS-EXISTS — theme.css mints the k-primitives
//      (--corner-k-squircle:2 + --corner-k-soft + --corner-k-sharp) AND the
//      semantic --corner-shape-{card,pill,panel,bigdock,dialog,sheet,hero} aliases.
//   2. POLICY (W56b — the radius-threshold map) — the ROUND set is card/pill ONLY
//      (they resolve `round`); the SQUIRCLE set is
//      bigdock/dialog/sheet/panel/hero (each resolves a `superellipse(...)` riding
//      var(--corner-k-squircle), NOT round, NOT an inline literal). The
//      rounded-vs-squircle map is encoded in the tokens.
//   3. BIGDOCK-READS-TOKEN (the bite) — dock.css's big-dock site reads
//      `corner-shape: var(--corner-shape-bigdock)` (NOT a bare `squircle` keyword)
//      so the shape is as overridable as the radius. A re-hardcoded keyword → RED.
//   4. SUPPORTS-GATE-INTACT — the big-dock corner-shape decl sits ONLY inside an
//      `@supports (corner-shape: superellipse(2))` block (a leak onto the un-gated
//      base would break the round fallback on a partial-support engine), AND the
//      un-gated `border-radius` round fallback is present on the big-dock site.
//   5. CARD-REHOMED — glass.css carries NO `corner-shape: squircle` on
//      .glass-card/.glass-btn/.btn-pill (the AW.W23 inversion is re-homed; cards
//      stay round by policy). A re-added card squircle → RED.

import { existsSync, readFileSync } from "node:fs";
import { readMonolith } from "./read-css-monoliths.mjs";
import { readDockCss } from "./read-dock-css.mjs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        THEME_CSS: resolve(ROOT, "src/styles/theme.css"),
        DOCK_CSS: resolve(ROOT, "src/styles/dock.css"),
        GLASS_CSS: resolve(ROOT, "src/styles/glass.css"),
        WORKSPACE: resolve(ROOT, "tests-visual"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_SQUIRCLE_LANGUAGE_ARTIFACT",
            "AX-squircle-language",
        ),
    };
    return _cliPaths;
}

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
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Brace-balanced span of the `@supports (…) { … }` block whose head matches
// `headRe`. Returns {body, whole} — `body` is the inner declarations, `whole` is
// the entire construct INCLUDING the head (so a leak scan can excise the head's
// own `corner-shape:` condition text, not just the body).
function matchAtSupportsBody(css, headRe) {
    const m = css.match(headRe);
    if (!m) return null;
    const open = css.indexOf("{", m.index);
    if (open === -1) return null;
    let depth = 0;
    for (let i = open; i < css.length; i++) {
        if (css[i] === "{") depth++;
        else if (css[i] === "}") {
            depth--;
            if (depth === 0)
                return {
                    body: css.slice(open + 1, i),
                    whole: css.slice(m.index, i + 1),
                };
        }
    }
    return null;
}

// Read the resolved value of a `--token: <value>;` declaration (last wins).
function tokenValue(css, token) {
    const re = new RegExp(`${token.replace(/[-]/g, "\\-")}\\s*:\\s*([^;}]+)`, "g");
    let last = null;
    for (const m of css.matchAll(re)) last = m[1].replace(/\s+/g, " ").trim();
    return last;
}

/**
 * The pure detector. Takes the three comment-stripped CSS sources; returns
 * {facts, violations}. The five SOURCE asserts run over the stripped text.
 */
export function detectSquircleLanguage({ themeCss, dockCss, glassCss }) {
    const violations = [];
    const facts = {};

    // ── 1. TOKEN-AXIS-EXISTS ─────────────────────────────────────────────
    const kSquircle = tokenValue(themeCss, "--corner-k-squircle");
    const kSoft = tokenValue(themeCss, "--corner-k-soft");
    const kSharp = tokenValue(themeCss, "--corner-k-sharp");
    facts.kSquircle = kSquircle;
    facts.kSoft = kSoft;
    facts.kSharp = kSharp;
    if (kSquircle !== "2")
        violations.push(
            `theme.css: --corner-k-squircle must be 2 (squircle == superellipse(2) == n=4 per MDN); got ${kSquircle ?? "(missing)"}`,
        );
    if (kSoft === null)
        violations.push("theme.css: --corner-k-soft is not minted (the soft k-rung)");
    if (kSharp === null)
        violations.push("theme.css: --corner-k-sharp is not minted (the sharp k-rung)");

    const shapeCard = tokenValue(themeCss, "--corner-shape-card");
    const shapePill = tokenValue(themeCss, "--corner-shape-pill");
    const shapePanel = tokenValue(themeCss, "--corner-shape-panel");
    const shapeBigdock = tokenValue(themeCss, "--corner-shape-bigdock");
    const shapeHero = tokenValue(themeCss, "--corner-shape-hero");
    facts.shapeCard = shapeCard;
    facts.shapePill = shapePill;
    facts.shapePanel = shapePanel;
    facts.shapeBigdock = shapeBigdock;
    facts.shapeHero = shapeHero;
    for (const [name, v] of [
        ["--corner-shape-card", shapeCard],
        ["--corner-shape-pill", shapePill],
        ["--corner-shape-panel", shapePanel],
        ["--corner-shape-bigdock", shapeBigdock],
        ["--corner-shape-hero", shapeHero],
    ]) {
        if (v === null)
            violations.push(`theme.css: ${name} semantic shape alias is not minted`);
    }

    // ── 2. POLICY (W56b — the radius-threshold map) ──────────────────────
    // The ROUND set is card/pill ONLY (the small surfaces); the SQUIRCLE set is
    // the LARGE-RADIUS GLASS FAMILY bigdock/dialog/sheet/panel/hero — each must
    // resolve a `superellipse(...)` riding var(--corner-k-squircle).
    if (shapeCard !== null && shapeCard !== "round")
        violations.push(
            `policy: --corner-shape-card must be \`round\` (data cards stay round per the radius-threshold policy); got ${shapeCard}`,
        );
    if (shapePill !== null && shapePill !== "round")
        violations.push(
            `policy: --corner-shape-pill must be \`round\` (pills/buttons stay round); got ${shapePill}`,
        );
    // The SQUIRCLE set (W56b): each large-radius glass surface resolves a
    // superellipse riding the ONE --corner-k-squircle vocabulary (no inline literal).
    const shapeDialogTok = tokenValue(themeCss, "--corner-shape-dialog");
    const shapeSheetTok = tokenValue(themeCss, "--corner-shape-sheet");
    const SQUIRCLE_SET = [
        ["--corner-shape-bigdock", shapeBigdock],
        ["--corner-shape-dialog", shapeDialogTok],
        ["--corner-shape-sheet", shapeSheetTok],
        ["--corner-shape-panel", shapePanel],
        ["--corner-shape-hero", shapeHero],
    ];
    let bigdockIsSuperellipse = false;
    for (const [name, v] of SQUIRCLE_SET) {
        const isSuperellipse = v !== null && /superellipse\s*\(/.test(v);
        if (name === "--corner-shape-bigdock") bigdockIsSuperellipse = isSuperellipse;
        if (!isSuperellipse) {
            violations.push(
                `policy: ${name} must resolve a \`superellipse(...)\` (the large-radius glass family squircles — W56b); got ${v ?? "(missing)"}`,
            );
            continue;
        }
        // rides the k token (one vocabulary; no inline literal).
        if (!/var\(\s*--corner-k-squircle\s*\)/.test(v))
            violations.push(
                `policy: ${name} should ride var(--corner-k-squircle) (the ONE k vocabulary), not an inline literal; got ${v}`,
            );
    }
    facts.bigdockIsSuperellipse = bigdockIsSuperellipse;
    facts.panelIsSuperellipse =
        shapePanel !== null && /superellipse\s*\(/.test(shapePanel);
    facts.heroIsSuperellipse =
        shapeHero !== null && /superellipse\s*\(/.test(shapeHero);

    // ── 3 + 4. BIGDOCK-READS-TOKEN + SUPPORTS-GATE-INTACT ────────────────
    const supports = matchAtSupportsBody(
        dockCss,
        /@supports\s*\(\s*corner-shape\s*:\s*superellipse\(\s*2\s*\)\s*\)/,
    );
    facts.supportsGatePresent = supports !== null;
    if (supports === null) {
        violations.push(
            "dock.css: the big-dock `@supports (corner-shape: superellipse(2))` gate is missing — the PE tier must sit inside the @supports block (a leak onto the base breaks the round fallback)",
        );
    } else {
        const readsToken = /corner-shape\s*:\s*var\(\s*--corner-shape-bigdock\s*\)/.test(
            supports.body,
        );
        const bareKeyword = /corner-shape\s*:\s*squircle\b/.test(supports.body);
        facts.bigdockReadsToken = readsToken;
        facts.bigdockBareKeyword = bareKeyword;
        if (!readsToken)
            violations.push(
                "dock.css: the big-dock site must read `corner-shape: var(--corner-shape-bigdock)` (the tokenized shape — as overridable as the radius), not a bare keyword",
            );
        if (bareKeyword)
            violations.push(
                "dock.css: the big-dock corner-shape is a bare `squircle` keyword (re-hardcoded) — it must read the `var(--corner-shape-bigdock)` token",
            );
    }
    // A `corner-shape` decl must NOT leak onto the un-gated base. Excise the ENTIRE
    // @supports construct (head + body) — the head's own `corner-shape:
    // superellipse(2)` CONDITION text is not a leak (it is the feature query).
    const dockNoSupports = supports
        ? dockCss.replace(supports.whole, "")
        : dockCss;
    const leak = /corner-shape\s*:/.test(dockNoSupports);
    facts.dockCornerShapeLeak = leak;
    if (leak)
        violations.push(
            "dock.css: a `corner-shape` declaration sits OUTSIDE the @supports block (a partial-support engine would apply it and break the round fallback)",
        );
    // The un-gated `border-radius` round fallback is present on the big-dock site.
    const bigdockRoundFallback =
        /\.glass-dock\.variant-dock:not\(\.vertical\)\.shape-card\s*\{[^}]*border-radius\s*:/.test(
            dockCss,
        );
    facts.bigdockRoundFallback = bigdockRoundFallback;
    if (!bigdockRoundFallback)
        violations.push(
            "dock.css: the big-dock `.shape-card` has no un-gated `border-radius` fallback — the cross-engine round contract is missing",
        );

    // ── 5. CARD-REHOMED + W56(R1)+W56b large-radius-glass squircle ───────
    // glass.css carries NO `corner-shape` on .glass-card/.glass-btn/.btn-pill
    // (round by policy), AND any corner-shape it DOES carry (the large-radius
    // glass FAMILY — dialog/sheet/panel/hero) sits ONLY inside `@supports
    // (corner-shape: superellipse(2))` reading the `var(--corner-shape-<surface>)`
    // token over the un-gated `border-radius` round fallback.
    const glassSupports = matchAtSupportsBody(
        glassCss,
        /@supports\s*\(\s*corner-shape\s*:\s*superellipse\(\s*2\s*\)\s*\)/,
    );
    const glassNoSupports = glassSupports
        ? glassCss.replace(glassSupports.whole, "")
        : glassCss;
    // (a) no corner-shape leaks onto the un-gated base (a partial-support engine
    //     would apply it and break the round fallback).
    const glassLeak = /corner-shape\s*:/.test(glassNoSupports);
    facts.glassCornerShapeLeak = glassLeak;
    if (glassLeak)
        violations.push(
            "glass.css: a `corner-shape` declaration sits OUTSIDE the @supports block — it must be PE-gated (the un-gated round fallback is the cross-engine contract)",
        );
    // (b) cards/buttons/pills stay ROUND even where supported — no corner-shape
    //     on a .glass-card/.glass-btn/.btn-pill selector anywhere.
    const cardSquircle =
        /\.(glass-card|glass-btn|btn-pill)[^{}]*\{[^}]*corner-shape\s*:/.test(glassCss);
    facts.glassCardSquircle = cardSquircle;
    if (cardSquircle)
        violations.push(
            "glass.css: .glass-card/.glass-btn/.btn-pill carry a `corner-shape` — cards/pills stay ROUND by policy (the squircle is the dialog/sheet/big-dock register, AW.W23 re-homed)",
        );
    // (c) the W56 R1 dialog + sheet glass surfaces read their tokenized shape
    //     inside the @supports block.
    if (glassSupports) {
        const readsDialog = /corner-shape\s*:\s*var\(\s*--corner-shape-dialog\s*\)/.test(
            glassSupports.body,
        );
        const readsSheet = /corner-shape\s*:\s*var\(\s*--corner-shape-sheet\s*\)/.test(
            glassSupports.body,
        );
        const readsPanel = /corner-shape\s*:\s*var\(\s*--corner-shape-panel\s*\)/.test(
            glassSupports.body,
        );
        const readsHero = /corner-shape\s*:\s*var\(\s*--corner-shape-hero\s*\)/.test(
            glassSupports.body,
        );
        facts.dialogReadsShapeToken = readsDialog;
        facts.sheetReadsShapeToken = readsSheet;
        facts.panelReadsShapeToken = readsPanel;
        facts.heroReadsShapeToken = readsHero;
        if (!readsDialog)
            violations.push(
                "glass.css: the dialog glass surface must read `corner-shape: var(--corner-shape-dialog)` inside @supports (W56 R1 — dialogs get the squircle)",
            );
        if (!readsSheet)
            violations.push(
                "glass.css: the sheet glass surface must read `corner-shape: var(--corner-shape-sheet)` inside @supports (W56 R1 — sheets get the squircle)",
            );
        if (!readsPanel)
            violations.push(
                "glass.css: the panel glass surface (.configurator/.floating-panel) must read `corner-shape: var(--corner-shape-panel)` inside @supports (W56b — panels join the squircle family)",
            );
        if (!readsHero)
            violations.push(
                "glass.css: the hero glass surface (.glass-hero) must read `corner-shape: var(--corner-shape-hero)` inside @supports (W56b — the glass hero overlay squircles)",
            );
    }
    // (d) the dialog/sheet/panel/hero shape tokens resolve a superellipse(...) in theme.css.
    const shapeDialog = tokenValue(themeCss, "--corner-shape-dialog");
    const shapeSheet = tokenValue(themeCss, "--corner-shape-sheet");
    facts.shapeDialog = shapeDialog;
    facts.shapeSheet = shapeSheet;
    if (!shapeDialog || !/superellipse\(/.test(shapeDialog))
        violations.push(
            `theme.css: --corner-shape-dialog must resolve a superellipse(...) (W56 R1); got ${shapeDialog ?? "(missing)"}`,
        );
    if (!shapeSheet || !/superellipse\(/.test(shapeSheet))
        violations.push(
            `theme.css: --corner-shape-sheet must resolve a superellipse(...) (W56 R1); got ${shapeSheet ?? "(missing)"}`,
        );
    if (!facts.panelIsSuperellipse)
        violations.push(
            `theme.css: --corner-shape-panel must resolve a superellipse(...) (W56b — panel joined the squircle family); got ${shapePanel ?? "(missing)"}`,
        );
    if (!facts.heroIsSuperellipse)
        violations.push(
            `theme.css: --corner-shape-hero must resolve a superellipse(...) (W56b — the glass hero overlay squircles); got ${shapeHero ?? "(missing)"}`,
        );

    facts.sourceClean = violations.length === 0;
    return { facts, violations };
}

export function detectSource(sources) {
    return detectSquircleLanguage({
        themeCss: stripBlockComments(sources.themeCss ?? ""),
        dockCss: stripBlockComments(sources.dockCss ?? ""),
        glassCss: stripBlockComments(sources.glassCss ?? ""),
    });
}

// ── The π render arm (fail-CLOSED Playwright cornerShape readback) ──────────
// Mirrors proof-constellation-warp-live.mjs: when the tests-visual workspace
// resolves a Playwright runner, the live cornerShape readback runs and a wrong
// value exits NON-ZERO; on genuine workspace/binary absence it befitting-silent
// SKIPs. The spec is tests-visual/squircle-language.spec.ts (the big-dock
// getComputedStyle(...).cornerShape === 'superellipse(2)' assert on Chrome-139;
// on a non-supporting engine it asserts the round fallback, never a false RED).
function piArm(WORKSPACE) {
    const PW_BIN = [
        resolve(WORKSPACE, "node_modules/.bin/playwright"),
        resolve(WORKSPACE, "../node_modules/.bin/playwright"),
    ].find(existsSync);
    const SPEC = resolve(WORKSPACE, "squircle-language.spec.ts");
    if (!PW_BIN || !existsSync(SPEC)) {
        return {
            ran: false,
            status: "skip",
            note: "π render arm SKIPPED — tests-visual Playwright workspace/spec absent (befitting-silent device absence; the orchestrator drives the chrome-devtools-mcp cornerShape readback per the cardinal lesson)",
        };
    }
    const res = spawnSync(PW_BIN, ["test", "squircle-language.spec.ts"], {
        cwd: WORKSPACE,
        encoding: "utf8",
        stdio: "pipe",
    });
    const ran = res.status !== null;
    return {
        ran,
        status: res.status === 0 ? "pass" : "fail",
        note:
            res.status === 0
                ? "π render arm GREEN — big-dock cornerShape readback === superellipse(2) on Chrome-139 (or the round fallback on a non-supporting engine)"
                : `π render arm RED — cornerShape readback wrong (exit ${res.status})`,
        output: (res.stdout ?? "") + (res.stderr ?? ""),
    };
}

function run() {
    const { ROOT, THEME_CSS, WORKSPACE, ARTIFACT } = cliPaths();
    // AY.W-CSS1 — glass.css became a thin @import root over carved partials (the
    // squircle @supports arm lives in glass/squircle.css); readMonolith
    // concatenates root + partials in cascade order. The dock.css squircle content
    // lives in the AX.W06 dock/* partials; readDockCss concatenates the dock family.
    const { facts, violations } = detectSource({
        themeCss: readFileSync(THEME_CSS, "utf8"),
        dockCss: readDockCss(ROOT),
        glassCss: readMonolith(ROOT, "glass"),
    });

    const pi = piArm(WORKSPACE);
    // fail-CLOSED: a PRESENT π arm that REDs fails the gate.
    const piFailedClosed = pi.ran && pi.status === "fail";
    const status =
        violations.length === 0 && !piFailedClosed ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "contract",
        command: "npm run proof:squircle-language",
        facts,
        violations,
        piArm: { ran: pi.ran, status: pi.status, note: pi.note },
    });

    console.log(
        "proof:squircle-language — the corner-shape token axis + rounded-vs-squircle policy (AX.W56)",
    );
    console.log(`  --corner-k-squircle (=2)  : ${facts.kSquircle ?? "(missing)"}`);
    console.log(
        `  card/pill = round         : ${
            facts.shapeCard === "round" && facts.shapePill === "round" ? "YES" : "NO"
        }`,
    );
    console.log(
        `  bigdock = superellipse    : ${facts.bigdockIsSuperellipse ? "YES" : "NO"}`,
    );
    console.log(
        `  panel/hero = superellipse : ${
            facts.panelIsSuperellipse && facts.heroIsSuperellipse ? "YES" : "NO"
        }`,
    );
    console.log(
        `  bigdock reads token (bite): ${facts.bigdockReadsToken ? "YES" : "NO"}`,
    );
    console.log(
        `  @supports gate intact     : ${
            facts.supportsGatePresent && !facts.dockCornerShapeLeak ? "YES" : "NO"
        }`,
    );
    console.log(
        `  round fallback present    : ${facts.bigdockRoundFallback ? "YES" : "NO"}`,
    );
    console.log(
        `  card squircle re-homed    : ${facts.glassCardSquircle ? "NO (leak!)" : "YES"}`,
    );
    console.log(`  π render arm              : ${pi.status.toUpperCase()} — ${pi.note}`);
    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
