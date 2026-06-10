#!/usr/bin/env node
// AW.W16 · AX.W24 — the deck-position rail gate (proof:deck-progress-rail).
//
// glass-ui ships a position-progress RAIL: a `.glass-progress-rail` CSS recipe
// that restyles the shipped `<Progress variant="default">` for the thin
// bottom-of-deck look, plus a `DeckProgress.vue` thin `:value`-only wrapper that
// renders `<Progress :model-value="value" class="glass-progress-rail">` — and
// NOTHING ELSE. NO second progress component that forks the fill, NO
// `deckProgress(index, total)` math leaf, NO `/deck` subpath (the math + the
// pinned chrome stay consumer-side; the `/deck` name is reserved for the slides
// deck-engine lift).
//
// AX.W24 UPGRADE — string-scan → RENDER assertion (the AW cardinal lesson: the
// prior gate string-asserted the recipe READS `--progress-rail-*` tokens, which
// was GREEN while the colour retint was a silent no-op (the @layer utilities
// `bg-primary` always outranked the `@layer components` recipe) AND the rightward
// box-shadow glow was eaten by the ProgressRoot's `overflow-hidden` clip). This
// gate now carries TWO arms:
//
//   STRUCTURE (device-free, in-repo — runs on EVERY runner):
//     1. `.glass-progress-rail` recipe exists, reads `--progress-rail-*` tokens,
//        FEEDS `--progress-fill`/`--progress-track` (the cascade-correct path —
//        it sets the tokens the default variant reads, it does NOT paint a
//        `background` that loses to a utility), composes the shipped indicator
//        child (`> *`), uses an INSET glow (not the eaten OUTSET shadow), and
//        does NOT re-author a second track mechanic.
//     2. `ProgressDefault.vue` reads `--progress-fill`/`--progress-track` at
//        SOURCE (the token-read parity with the gradient variant) and carries NO
//        `bg-primary`/`bg-secondary` utility (the always-winning utility-layer
//        colour the override could never beat).
//     3. `DeckProgress.vue` composes `<Progress>` (no fork), declares no
//        position:/z-index:/env(safe-area, imports no math leaf.
//     4. The `/deck` RESERVED guard: no `src/subpaths/deck.ts`, no `./deck`
//        exports entry, no `deckProgress()` math leaf. (The subpath added is
//        `deck-progress`, NOT `deck`.)
//
//   RENDER (the π-lane DOM-cascade computed-style readback — fail-CLOSED when the
//   tests-visual workspace is installed, befitting-silent SKIP when device-absent):
//     the `deck-progress-rail.spec.ts` mounts <DeckProgress :value=50> under a
//     `:root { --progress-rail-fill: <distinct hue> }` override and asserts (a) the
//     painted indicator computed `background-color` IS the override hue (the cascade
//     fix — RED at HEAD where it painted --primary), (b) a visible glow renders
//     inside the fill boundary (the inset-glow fix), (c) the rail reads as the
//     hairline `--progress-rail-h`. NOT GPU readPixels — a getComputedStyle readback.
//
// bite-check: fork a second track / add a math leaf / squat `/deck` → the matching
// STRUCTURE clause reddens. Revert the ProgressDefault token-read (re-add bg-primary)
// → STRUCTURE clause 2 reddens AND the RENDER override-wins assertion reds. Re-author
// the glow as the OUTSET shadow → the RENDER glow-inside assertion reds.

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — the central stylesheets are thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

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
        GLASS: resolve(ROOT, "src/styles/glass.css"),
        PROGRESS_DEFAULT: resolve(ROOT, "src/components/ui/progress/ProgressDefault.vue"),
        WRAPPER: resolve(ROOT, "src/components/custom/deck-progress/DeckProgress.vue"),
        BARREL: resolve(ROOT, "src/components/custom/deck-progress/index.ts"),
        ROOT_BARREL: resolve(ROOT, "src/index.ts"),
        DECK_SUBPATH: resolve(ROOT, "src/subpaths/deck.ts"),
        PKG: resolve(ROOT, "package.json"),
        WORKSPACE: resolve(ROOT, "tests-visual"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DECK_PROGRESS_RAIL_ARTIFACT",
            "AX-deck-progress-rail",
        ),
    };
    return _cliPaths;
}

// ── The RENDER arm — invoke the π-lane spec (fail-CLOSED when present). ─────────
// npm workspaces HOIST @playwright/test to the ROOT node_modules; resolve the
// runner across BOTH the workspace-local AND the hoisted-root layout (else a
// hoisted install false-SKIPs the fail-CLOSED arm — AX.W00 orchestrator fix).
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

/**
 * Run the render spec. Returns { ran, status: 'pass'|'fail'|'skipped', facts,
 * violations }. SKIPPED only when the π workspace device is genuinely absent.
 */
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
    const REPORT = resolve(P.WORKSPACE, ".cache/deck-progress-rail-report.json");
    const res = spawnSync(
        BIN,
        ["test", "deck-progress-rail.spec.ts", "--reporter=list,json"],
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
                `the deck-progress-rail render spec exited ${res.status} with no parseable report — the computed-style readback did not run cleanly (a broken harness or a failed assertion)`,
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

    // ── STRUCTURE 1: the .glass-progress-rail recipe shape (cascade + glow).
    if (!existsSync(P.GLASS)) {
        violations.push("glass.css is absent");
    } else {
        const css = stripComments(readMonolith(ROOT, "glass"));
        // The rail is authored as a Tailwind `@utility glass-progress-rail` (AX.W24)
        // so its geometry (the hairline height + zero radius) lands in @layer
        // utilities and out-ranks the variant's `h-4`/`rounded-pill` base utilities
        // (a @layer components rule loses to those regardless of source order — the
        // prior 16px-bar silent no-op). Isolate the @utility region so the assertions
        // read the rail rules, not a stray token elsewhere in glass.css.
        const recipeStart = css.search(/@utility\s+glass-progress-rail/);
        const recipeRegion = recipeStart >= 0 ? css.slice(recipeStart) : "";
        facts.recipeExists = /@utility\s+glass-progress-rail\s*\{/.test(css);
        facts.readsRailTokens = /var\(--progress-rail-(h|fill|track|glow[a-z-]*)/.test(
            recipeRegion,
        );
        // The hairline height (the F1-adjacent geometry win the @utility enables).
        facts.setsHairlineHeight =
            /height\s*:\s*var\(--progress-rail-h/.test(recipeRegion);
        // The cascade fix: the recipe FEEDS --progress-fill/--progress-track (the
        // tokens the default variant reads at source), it does NOT paint a losing
        // `background:` colour.
        facts.feedsFillToken =
            /--progress-fill\s*:\s*var\(\s*--progress-rail-fill/.test(recipeRegion);
        facts.feedsTrackToken =
            /--progress-track\s*:\s*var\(\s*--progress-rail-track/.test(recipeRegion);
        // The indicator child — `& > *` inside the @utility (the nested form).
        facts.composesIndicatorChild = /&\s*>\s*\*/.test(recipeRegion);
        // The glow fix: an INSET shadow (inside the clip), NOT the eaten OUTSET form.
        facts.glowIsInset = /&\s*>\s*\*[\s\S]*?box-shadow:\s*[\s\S]*?\binset\b/.test(
            recipeRegion,
        );
        facts.forksTrack =
            /@utility\s+glass-progress-rail[^{]*\{[^}]*translateX|@keyframes\s+glass-progress-rail/.test(
                css,
            );
        if (!facts.recipeExists)
            violations.push("no .glass-progress-rail recipe in glass.css");
        if (!facts.readsRailTokens)
            violations.push(
                "the .glass-progress-rail recipe reads no --progress-rail-* tokens (not token-first)",
            );
        if (!facts.feedsFillToken || !facts.feedsTrackToken)
            violations.push(
                "the glass-progress-rail recipe does not FEED --progress-fill/--progress-track from --progress-rail-fill/--progress-rail-track (the cascade fix — it must set the tokens the default variant reads, not paint a `background` that loses to the @layer utilities `bg-primary`)",
            );
        if (!facts.setsHairlineHeight)
            violations.push(
                "the glass-progress-rail recipe does not set `height: var(--progress-rail-h)` (the hairline — without the @utility geometry win the rail paints as the 16px `h-4` bar)",
            );
        if (!facts.composesIndicatorChild)
            violations.push(
                "the glass-progress-rail recipe does not restyle the shipped <Progress> indicator child (`& > *`)",
            );
        if (!facts.glowIsInset)
            violations.push(
                "the .glass-progress-rail > * glow is not an `inset` box-shadow (the OUTSET rightward shadow is eaten by the ProgressRoot overflow-hidden clip — the AX.W24 F2 fix is the trailing inset edge inside the clip)",
            );
        if (facts.forksTrack)
            violations.push(
                "the .glass-progress-rail recipe re-authors a second track mechanic (it must compose the shipped fill, not fork it)",
            );
    }

    // ── STRUCTURE 2: ProgressDefault token-read parity (the cascade root-cause).
    if (!existsSync(P.PROGRESS_DEFAULT)) {
        violations.push("ProgressDefault.vue is absent");
    } else {
        const pd = stripComments(readFileSync(P.PROGRESS_DEFAULT, "utf8"));
        // The template must read the tokens (the gradient-variant idiom):
        // `bg-[var(--progress-track,…)]` on the root + `[background:var(--progress-fill,…)]`
        // on the indicator.
        facts.defaultReadsTrackToken =
            /bg-\[var\(--progress-track[,)]/.test(pd) ||
            /--progress-track/.test(pd);
        facts.defaultReadsFillToken =
            /\[background:var\(--progress-fill[,)]/.test(pd) ||
            /--progress-fill/.test(pd);
        // It must NOT carry the always-winning utility-layer colour classes.
        facts.defaultNoUtilityColor =
            !/\bbg-primary\b/.test(pd) && !/\bbg-secondary\b/.test(pd);
        if (!facts.defaultReadsFillToken || !facts.defaultReadsTrackToken)
            violations.push(
                "ProgressDefault.vue does not read --progress-fill/--progress-track at source (the token-read parity with the gradient variant — the cascade-fix root cause)",
            );
        if (!facts.defaultNoUtilityColor)
            violations.push(
                "ProgressDefault.vue still carries a bg-primary/bg-secondary utility — that @layer utilities colour ALWAYS outranks the @layer components .glass-progress-rail recipe, so the --progress-rail-* override is a silent no-op (the F1 cascade inversion)",
            );
    }

    // ── STRUCTURE 3: the thin :value wrapper (no fork, no chrome, no math leaf).
    if (!existsSync(P.WRAPPER)) {
        violations.push("DeckProgress.vue is absent");
    } else {
        const wrapper = stripComments(readFileSync(P.WRAPPER, "utf8"));
        facts.composesProgress =
            /<Progress\b/.test(wrapper) && /import.*Progress.*from/.test(wrapper);
        facts.appliesRailClass = /glass-progress-rail/.test(wrapper);
        facts.noChrome =
            !/position:\s*fixed/.test(wrapper) &&
            !/z-index:/.test(wrapper) &&
            !/env\(safe-area/.test(wrapper);
        facts.noMathLeaf =
            !/deckProgress/.test(wrapper) &&
            !/:index\b/.test(wrapper) &&
            !/:total\b/.test(wrapper);
        if (!facts.composesProgress)
            violations.push(
                "DeckProgress.vue does not compose the shipped <Progress> (it must restyle, not fork)",
            );
        if (!facts.appliesRailClass)
            violations.push("DeckProgress.vue does not apply the glass-progress-rail class");
        if (!facts.noChrome)
            violations.push(
                "DeckProgress.vue declares viewport-pinned chrome (position/z-index/env(safe-area)) — that is consumer-supplied",
            );
        if (!facts.noMathLeaf)
            violations.push(
                "DeckProgress.vue carries a math leaf / :index|:total path — the position math stays consumer-side",
            );
    }

    // ── barrel + root-barrel (the additive subpath did NOT demote the root export).
    facts.barrelExists = existsSync(P.BARREL);
    if (!facts.barrelExists) violations.push("deck-progress/index.ts barrel is absent");
    if (existsSync(P.ROOT_BARREL)) {
        const rb = stripComments(readFileSync(P.ROOT_BARREL, "utf8"));
        facts.onRootBarrel = /deck-progress/.test(rb);
        if (!facts.onRootBarrel)
            violations.push(
                "DeckProgress is not re-exported on the root barrel (src/index.ts)",
            );
    }

    // ── STRUCTURE 4: the /deck RESERVED guard (deck-progress is added, deck is NOT).
    facts.noDeckSubpathFile = !existsSync(P.DECK_SUBPATH);
    if (!facts.noDeckSubpathFile)
        violations.push(
            "src/subpaths/deck.ts exists — the reserved /deck deck-engine namespace must NOT be squatted",
        );
    if (existsSync(P.PKG)) {
        const pkg = readFileSync(P.PKG, "utf8");
        // The reserved guard must match `./deck` EXACTLY, not the legitimate
        // `./deck-progress` subpath this wave adds.
        facts.noDeckExport = !/"\.\/deck"\s*:/.test(pkg);
        if (!facts.noDeckExport)
            violations.push(
                'package.json exports a "./deck" entry — the reserved /deck namespace must NOT be consumed',
            );
        // Positive: the deck-progress subpath IS published (the F0 enablement).
        facts.deckProgressExport = /"\.\/deck-progress"\s*:/.test(pkg);
        if (!facts.deckProgressExport)
            violations.push(
                'package.json has no "./deck-progress" exports entry — the minimal-payload subpath must be published',
            );
    }

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
        gate: "proof:deck-progress-rail",
        facts,
        violations,
    });

    console.log(
        "proof:deck-progress-rail — .glass-progress-rail recipe (cascade-correct token-feed + inset glow) over <Progress>, thin DeckProgress wrapper, /deck reserved, + the π-lane computed-style render readback (AX.W24)",
    );
    console.log(
        `  recipe feeds --progress-fill/track + inset glow : ${facts.feedsFillToken && facts.feedsTrackToken && facts.glowIsInset ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  ProgressDefault token-read (no bg-primary util)  : ${facts.defaultReadsFillToken && facts.defaultNoUtilityColor ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  DeckProgress composes <Progress>, no chrome/math : ${facts.composesProgress && facts.noChrome && facts.noMathLeaf ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  deck-progress published, /deck reserved          : ${facts.deckProgressExport && facts.noDeckSubpathFile && facts.noDeckExport ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  π render arm                                     : ${
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
            "\n  NOTE: the π render arm SKIPPED (the tests-visual workspace has no installed @playwright/test). The override-wins + inset-glow computed-style readback is asserted on the real device — install the workspace + a live demo dev server to run it here.",
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
