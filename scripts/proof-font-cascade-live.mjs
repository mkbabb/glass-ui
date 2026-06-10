#!/usr/bin/env node
// AX.W22 — proof:font-cascade-live, the font-register reconciliation gate.
//
// The library DEFAULT font register == the register the demo + consumers paint:
// ONE brand voice (Plus Jakarta Sans text + display, Fira Code mono), NO preset
// opt-out, NO body-defaults-to-a-display-serif. The AW gap this closes: a green
// proof:font-canon (name-legality) + the retired proof:font-axes (woff2 fvar)
// shipped GREEN over a Fraunces serif-body default NO live surface paints —
// neither opened a browser.
//
// TWO arms (the precept-valid HardGate shape; the AX.W24 sibling pattern):
//
//   STRUCTURE (device-free, in-repo — runs + hard-REDs on EVERY runner):
//     1. the token cascade declares --font-stack-text as the Plus Jakarta calibrated
//        chain (the single-source register), --font-stack-display ALIASES it
//        (var(--font-stack-text)), --font-stack-mono is the Fira Code chain, and
//        the misnamed --font-stack-serif token is GONE. The --font-stack-* register
//        now lives in the carved partial src/styles/tokens/scheme-motion.css (the
//        AZ.W-GATES D7 re-point — the pre-carve tokens.css path false-REDded these
//        three asserts); readTokenFonts() reads the partial(s) that hold them, the
//        read-dock-css.mjs authority-reader precedent (robust to a further carve).
//     2. theme.css bridges --font-text from --font-stack-text; --font-serif is a
//        bridge alias resolving to --font-stack-text (no display-serif voice).
//     3. typography.css body{} reads var(--font-text) (NOT a --font-serif that
//        pointed at Fraunces), and the heading/prose ladder re-grounds onto
//        var(--font-text). The WONK/SOFT machinery is GONE
//        (--font-display-variation-settings / --font-display-weight, the
//        font-variation-settings: var(--font-display-variation-settings) lines).
//     4. The brand-uniform-sans escape-hatch preset + --font-brand-sans are GONE.
//     5. DELETION proof: src/fonts/fraunces/ absent; the Fraunces @font-face gone
//        from fonts.css; index.html carries no data-typography-preset; zero
//        Fraunces/WONK/SOFT/font-brand-sans/data-typography-preset survivors
//        across the register surface. .cm-serif is the ONE allowed serif survivor
//        (a DISTINCT consumer-supplied math voice — NOT Fraunces).
//
//   RENDER (the π-lane DOM-cascade computed-style readback — fail-CLOSED when the
//   tests-visual workspace is installed, befitting-silent SKIP when device-absent):
//     font-cascade-live.spec.ts loads the demo, awaits document.fonts.ready, reads
//     getComputedStyle on body/.text-display-*/.fira-code/.text-admin-label, asserts
//     the resolved face IS the intended register (document.fonts.check + a canvas
//     width-fingerprint to distinguish the real face from a metric-matched fallback),
//     and BITES on a deliberately-Georgia-overridden body default. NOT GPU readPixels.
//
// bite-check: re-point --font-stack-text at a non-shipped serif → STRUCTURE 1 RED;
// revert body{} to var(--font-serif)-as-Fraunces → STRUCTURE 3 RED; restore the
// data-typography-preset attr → STRUCTURE 4 RED; re-add the Fraunces dir/@font-face →
// STRUCTURE 5 RED. On the live arm: a serif-first computed body family → RENDER RED.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// AZ.W-GATES (D7) — the font-token AUTHORITY reader. The --font-stack-* register
// carved out of the tokens.css monolith into src/styles/tokens/ partials (today:
// scheme-motion.css). This concats the tokens.css core + every tokens/*.css
// partial that declares a --font-stack-* token, in alpha order, mirroring the
// read-dock-css.mjs authority-reader precedent — so the STRUCTURE-1 asserts (and
// the --font-stack-serif GONE check) read the whole register, robust to a further
// carve. Returns the comment-STRIPPED concat (the asserts test live declarations).
function readTokenFonts(root, strip) {
    const core = resolve(root, "src/styles/tokens.css");
    const dir = resolve(root, "src/styles/tokens");
    const parts = [];
    if (existsSync(core)) parts.push(readFileSync(core, "utf8"));
    if (existsSync(dir)) {
        const partials = readdirSync(dir)
            .filter((f) => f.endsWith(".css"))
            .sort();
        for (const f of partials) {
            const src = readFileSync(resolve(dir, f), "utf8");
            if (/--font-stack-/.test(src)) parts.push(src);
        }
    }
    return strip(parts.join("\n"));
}

function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        TOKENS: resolve(ROOT, "src/styles/tokens.css"),
        THEME: resolve(ROOT, "src/styles/theme.css"),
        TYPOGRAPHY: resolve(ROOT, "src/styles/typography.css"),
        FONTS: resolve(ROOT, "src/styles/fonts.css"),
        FRAUNCES_DIR: resolve(ROOT, "src/fonts/fraunces"),
        INDEX_HTML: resolve(ROOT, "index.html"),
        DEMO_CSS: resolve(ROOT, "demo/demo.css"),
        DEFAULTS: resolve(ROOT, "demo/configurator/preset-editor/defaults.ts"),
        WORKSPACE: resolve(ROOT, "tests-visual"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_FONT_CASCADE_LIVE_ARTIFACT",
            "AX-font-cascade-live",
        ),
    };
    return _cliPaths;
}

// ── The RENDER arm — invoke the π-lane spec (fail-CLOSED when present). ─────────
// npm workspaces HOIST @playwright/test to the ROOT node_modules; resolve the
// runner across BOTH the workspace-local AND the hoisted-root layout (else a
// hoisted install false-SKIPs the fail-CLOSED arm — the AX.W00 orchestrator fix).
function pwBin(P) {
    return (
        [
            resolve(P.WORKSPACE, "node_modules/.bin/playwright"),
            resolve(P.ROOT, "node_modules/.bin/playwright"),
        ].find(existsSync) ?? null
    );
}
function pwPkg(P) {
    return (
        [
            resolve(P.WORKSPACE, "node_modules/@playwright/test/package.json"),
            resolve(P.ROOT, "node_modules/@playwright/test/package.json"),
        ].find(existsSync) ?? null
    );
}

function parseReport(path) {
    const json = JSON.parse(readFileSync(path, "utf8"));
    const failures = [];
    let passed = 0;
    let failed = 0;
    const walk = (suite) => {
        for (const spec of suite.specs ?? []) {
            for (const t of spec.tests ?? []) {
                const ok = t.results?.every((r) => r.status === "passed");
                if (ok) passed++;
                else {
                    failed++;
                    const msg = t.results
                        ?.flatMap((r) => r.errors ?? [])
                        .map((e) => (e.message ?? "").split("\n")[0])
                        .join(" | ");
                    failures.push(`${spec.title}: ${msg}`);
                }
            }
        }
        for (const child of suite.suites ?? []) walk(child);
    };
    for (const suite of json.suites ?? []) walk(suite);
    return { passed, failed, failures };
}

function renderArm(P) {
    const BIN = pwBin(P);
    const PKG = pwPkg(P);
    if (BIN === null || PKG === null) {
        return {
            ran: false,
            status: "skipped",
            facts: { workspacePresent: false },
            violations: [],
        };
    }
    const REPORT = resolve(P.WORKSPACE, ".cache/font-cascade-live-report.json");
    const res = spawnSync(
        BIN,
        ["test", "font-cascade-live.spec.ts", "--reporter=list,json"],
        {
            cwd: P.WORKSPACE,
            stdio: ["ignore", "pipe", "inherit"],
            encoding: "utf8",
            env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: REPORT },
        },
    );
    let report = null;
    if (existsSync(REPORT)) {
        try {
            report = parseReport(REPORT);
        } catch {
            /* fall through */
        }
    }
    const violations = [];
    if (res.status !== 0) {
        if (report?.failures?.length) violations.push(...report.failures);
        else
            violations.push(
                `the font-cascade-live spec exited ${res.status} with no parseable report — the computed-style font readback did not run cleanly (a broken harness or a failed assertion)`,
            );
    }
    return {
        ran: true,
        status: violations.length === 0 && res.status === 0 ? "pass" : "fail",
        facts: {
            workspacePresent: true,
            specsPassed: report?.passed ?? null,
            specsFailed: report?.failed ?? null,
            playwrightExit: res.status,
        },
        violations,
    };
}

function run() {
    const P = cliPaths();
    const { ROOT, ARTIFACT } = P;
    const violations = [];
    const facts = {};

    // AZ.W-GATES (D7): read the font-token AUTHORITY — the tokens.css core + every
    // tokens/*.css partial that holds --font-stack-* (the carve moved them to
    // tokens/scheme-motion.css). The pre-carve P.TOKENS-only read false-REDded the
    // three STRUCTURE-1 asserts.
    const tokens = readTokenFonts(P.ROOT, stripComments);
    const theme = existsSync(P.THEME) ? stripComments(readFileSync(P.THEME, "utf8")) : "";
    const typography = existsSync(P.TYPOGRAPHY)
        ? stripComments(readFileSync(P.TYPOGRAPHY, "utf8"))
        : "";
    const fonts = existsSync(P.FONTS) ? readFileSync(P.FONTS, "utf8") : "";

    // ── STRUCTURE 1: the token-cascade single-source register (the --font-stack-*
    // authority — tokens/scheme-motion.css after the AZ.W-GATES D7 carve re-point).
    facts.declaresTextStack =
        /--font-stack-text\s*:\s*"Plus Jakarta Sans"/.test(tokens);
    facts.displayAliasesText =
        /--font-stack-display\s*:\s*var\(\s*--font-stack-text\s*\)/.test(tokens);
    facts.monoIsFiraCode = /--font-stack-mono\s*:\s*"Fira Code"/.test(tokens);
    facts.serifStackGone = !/--font-stack-serif\s*:/.test(tokens);
    if (!facts.declaresTextStack)
        violations.push(
            "tokens.css §0 does not declare --font-stack-text as the Plus Jakarta calibrated chain (the single-source brand register)",
        );
    if (!facts.displayAliasesText)
        violations.push(
            "tokens.css --font-stack-display does not alias var(--font-stack-text) — the display register must fold onto the one text register (no separate display-serif)",
        );
    if (!facts.monoIsFiraCode)
        violations.push("tokens.css --font-stack-mono is not the Fira Code chain");
    if (!facts.serifStackGone)
        violations.push(
            "tokens.css still declares --font-stack-serif — the misnamed serif token must fold onto --font-stack-text (no display-serif voice survives)",
        );

    // ── STRUCTURE 2: theme.css bridges.
    facts.bridgesText =
        /--font-text\s*:\s*var\(\s*--font-stack-text\s*\)/.test(theme);
    facts.serifBridgeFolded =
        /--font-serif\s*:\s*var\(\s*--font-stack-text\s*\)/.test(theme);
    if (!facts.bridgesText)
        violations.push(
            "theme.css does not bridge --font-text from --font-stack-text (the @theme namespace var the text register resolves through)",
        );
    if (!facts.serifBridgeFolded)
        violations.push(
            "theme.css --font-serif bridge does not resolve to var(--font-stack-text) — the configurator serif slot must fold onto the text register, not a separate stack",
        );

    // ── STRUCTURE 3: typography.css body + ladder + WONK/SOFT excise.
    facts.bodyReadsText =
        /body\s*\{[^}]*font-family:\s*var\(\s*--font-text\s*\)/.test(typography);
    facts.noVariationSettingsToken = !/--font-display-variation-settings/.test(
        typography,
    );
    facts.noDisplayWeightToken = !/--font-display-weight/.test(typography);
    facts.ladderReadsText = /@utility\s+text-body\s*\{[^}]*font-family:\s*var\(\s*--font-text\s*\)/.test(
        typography,
    );
    if (!facts.bodyReadsText)
        violations.push(
            "typography.css body{} does not read var(--font-text) — body must resolve the brand text register directly (the Fraunces→Georgia serif-body default is the visual root defect)",
        );
    if (!facts.noVariationSettingsToken || !facts.noDisplayWeightToken)
        violations.push(
            "typography.css still carries the WONK/SOFT machinery (--font-display-variation-settings / --font-display-weight) — the inert axes must be excised with the Fraunces face",
        );
    if (!facts.ladderReadsText)
        violations.push(
            "typography.css text-body does not re-ground onto var(--font-text) — the heading/prose ladder must read the brand text register, not a folded --font-serif",
        );

    // ── STRUCTURE 4: the escape-hatch preset + --font-brand-sans are gone.
    facts.noPresetBlock = !/data-typography-preset/.test(typography);
    facts.noBrandSans = !/--font-brand-sans/.test(typography);
    if (!facts.noPresetBlock)
        violations.push(
            "typography.css still carries a data-typography-preset block — the brand-uniform-sans escape hatch must collapse (the default IS the brand register, nothing to undo)",
        );
    if (!facts.noBrandSans)
        violations.push(
            "typography.css still declares --font-brand-sans — the indirection must collapse onto the single text register",
        );

    // ── STRUCTURE 5: the Fraunces deletion proof + the demo de-indirection.
    facts.frauncesDirGone = !existsSync(P.FRAUNCES_DIR);
    facts.frauncesFaceGone = !/@font-face[\s\S]*?font-family:\s*"Fraunces"/.test(fonts);
    if (!facts.frauncesDirGone)
        violations.push(
            "src/fonts/fraunces/ still exists — the ~40KB dead face must be deleted (no live surface paints it)",
        );
    if (!facts.frauncesFaceGone)
        violations.push(
            "fonts.css still declares the Fraunces @font-face — the deleted woff2 would be a dangling font URL",
        );

    // The repo-root index.html carries no preset attr (HARDENING §G #24 — the
    // attr lives at repo-root index.html, NOT demo/index.html).
    if (existsSync(P.INDEX_HTML)) {
        const html = readFileSync(P.INDEX_HTML, "utf8");
        facts.htmlNoPreset = !/data-typography-preset/.test(html);
        if (!facts.htmlNoPreset)
            violations.push(
                "index.html still carries data-typography-preset — the demo must render the library default with zero override",
            );
    } else {
        violations.push("repo-root index.html is absent");
    }
    // demo.css carries no --font-brand-sans override.
    if (existsSync(P.DEMO_CSS)) {
        const demo = stripComments(readFileSync(P.DEMO_CSS, "utf8"));
        facts.demoNoBrandSans = !/--font-brand-sans/.test(demo);
        if (!facts.demoNoBrandSans)
            violations.push(
                "demo/demo.css still carries the --font-brand-sans override — the demo de-indirection is incomplete",
            );
    }
    // The configurator offers no Fraunces option (no face that falls to Georgia).
    if (existsSync(P.DEFAULTS)) {
        const defaults = readFileSync(P.DEFAULTS, "utf8");
        facts.configuratorNoFraunces = !/Fraunces/.test(defaults);
        if (!facts.configuratorNoFraunces)
            violations.push(
                "the demo configurator still offers a Fraunces font option — it falls through to Georgia (the dishonest-picker trap)",
            );
    }

    // .cm-serif is the ONE allowed serif survivor (a DISTINCT face, NOT Fraunces).
    facts.cmSerifSurvives = /@utility\s+cm-serif\s*\{/.test(typography);
    facts.cmSerifNotFraunces = !/cm-serif[\s\S]{0,120}Fraunces/.test(typography);
    if (!facts.cmSerifSurvives)
        violations.push(
            ".cm-serif (the math/serif voice) was collateral-deleted — it is a DISTINCT face that must survive the Fraunces excise",
        );
    if (!facts.cmSerifNotFraunces)
        violations.push(".cm-serif resolves to Fraunces — it must be a distinct serif voice");

    // ── The RENDER arm (fail-CLOSED when the π workspace is installed).
    const render = renderArm(P);
    facts.render = render.facts;
    if (render.ran && render.status === "fail") {
        violations.push(...render.violations.map((v) => `[render] ${v}`));
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:font-cascade-live",
        facts,
        violations,
    });

    console.log(
        "proof:font-cascade-live — the library DEFAULT font register IS the rendered register (one brand voice, no preset opt-out, no serif body) + the π-lane computed-style readback (AX.W22)",
    );
    console.log(
        `  single-source register (text/display/mono)       : ${facts.declaresTextStack && facts.displayAliasesText && facts.monoIsFiraCode && facts.serifStackGone ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  body{} reads --font-text, WONK/SOFT excised       : ${facts.bodyReadsText && facts.noVariationSettingsToken && facts.ladderReadsText ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  preset + --font-brand-sans collapsed              : ${facts.noPresetBlock && facts.noBrandSans && facts.htmlNoPreset && facts.demoNoBrandSans ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  Fraunces excised, .cm-serif survives              : ${facts.frauncesDirGone && facts.frauncesFaceGone && facts.configuratorNoFraunces && facts.cmSerifSurvives ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  π render arm                                      : ${
            render.ran
                ? render.status === "pass"
                    ? "pass ✓"
                    : "FAIL ✗"
                : "skipped (device absent)"
        }`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    if (!render.ran) {
        console.log(
            "\n  NOTE: the π render arm SKIPPED (the tests-visual workspace has no installed @playwright/test). The default-==-rendered computed-style font readback is asserted on the real device — install the workspace + a live demo dev server to run it here.",
        );
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
