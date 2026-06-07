#!/usr/bin/env node
// AW.W16 — the deck-position rail gate (proof:deck-progress-rail).
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
// Clauses:
//   1. `.glass-progress-rail` recipe exists in glass.css, reads `--progress-rail-*`
//      tokens, and composes the shipped <Progress> hooks (no second
//      width-animated track element re-authored).
//   2. DeckProgress.vue references <Progress> (composes, not forks), declares no
//      position:/z-index:/env(safe-area, and imports no deckProgress/math helper.
//   3. No `src/subpaths/deck.ts` AND no `./deck` exports entry (reserved guard).
//
// bite-check: fork a second track / add a math leaf / squat `/deck` → the
// matching clause reddens.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

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
        WRAPPER: resolve(ROOT, "src/components/custom/deck-progress/DeckProgress.vue"),
        BARREL: resolve(ROOT, "src/components/custom/deck-progress/index.ts"),
        ROOT_BARREL: resolve(ROOT, "src/index.ts"),
        DECK_SUBPATH: resolve(ROOT, "src/subpaths/deck.ts"),
        PKG: resolve(ROOT, "package.json"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DECK_PROGRESS_RAIL_ARTIFACT",
            "AW-deck-progress-rail",
        ),
    };
    return _cliPaths;
}

function run() {
    const P = cliPaths();
    const { ROOT, ARTIFACT } = P;
    const violations = [];
    const facts = {};

    // ── 1. the .glass-progress-rail recipe.
    if (!existsSync(P.GLASS)) {
        violations.push("glass.css is absent");
    } else {
        const css = stripComments(readFileSync(P.GLASS, "utf8"));
        facts.recipeExists = /\.glass-progress-rail\s*\{/.test(css);
        facts.readsRailTokens = /var\(--progress-rail-(h|fill|track|glow[a-z-]*)/.test(css);
        // The fill is the shipped indicator child — `.glass-progress-rail > *`,
        // NOT a re-authored width-animated track element with its own transform.
        facts.composesIndicatorChild = /\.glass-progress-rail\s*>\s*\*/.test(css);
        facts.forksTrack = /\.glass-progress-rail[^{]*\{[^}]*translateX|@keyframes\s+glass-progress-rail/.test(css);
        if (!facts.recipeExists) {
            violations.push("no .glass-progress-rail recipe in glass.css");
        }
        if (!facts.readsRailTokens) {
            violations.push("the .glass-progress-rail recipe reads no --progress-rail-* tokens (not token-first)");
        }
        if (!facts.composesIndicatorChild) {
            violations.push("the .glass-progress-rail recipe does not restyle the shipped <Progress> indicator child (`> *`)");
        }
        if (facts.forksTrack) {
            violations.push("the .glass-progress-rail recipe re-authors a second track mechanic (it must compose the shipped fill, not fork it)");
        }
    }

    // ── 2. the thin :value wrapper.
    if (!existsSync(P.WRAPPER)) {
        violations.push("DeckProgress.vue is absent");
    } else {
        const wrapper = stripComments(readFileSync(P.WRAPPER, "utf8"));
        facts.composesProgress = /<Progress\b/.test(wrapper) && /import.*Progress.*from/.test(wrapper);
        facts.appliesRailClass = /glass-progress-rail/.test(wrapper);
        // NO viewport chrome in the library wrapper.
        facts.noChrome =
            !/position:\s*fixed/.test(wrapper) &&
            !/z-index:/.test(wrapper) &&
            !/env\(safe-area/.test(wrapper);
        // NO math leaf import / :index|:total path.
        facts.noMathLeaf =
            !/deckProgress/.test(wrapper) &&
            !/:index\b/.test(wrapper) &&
            !/:total\b/.test(wrapper);
        if (!facts.composesProgress) {
            violations.push("DeckProgress.vue does not compose the shipped <Progress> (it must restyle, not fork)");
        }
        if (!facts.appliesRailClass) {
            violations.push("DeckProgress.vue does not apply the glass-progress-rail class");
        }
        if (!facts.noChrome) {
            violations.push("DeckProgress.vue declares viewport-pinned chrome (position/z-index/env(safe-area)) — that is consumer-supplied");
        }
        if (!facts.noMathLeaf) {
            violations.push("DeckProgress.vue carries a math leaf / :index|:total path — the position math stays consumer-side");
        }
    }

    // ── barrel + root-barrel.
    facts.barrelExists = existsSync(P.BARREL);
    if (!facts.barrelExists) violations.push("deck-progress/index.ts barrel is absent");
    if (existsSync(P.ROOT_BARREL)) {
        const rb = stripComments(readFileSync(P.ROOT_BARREL, "utf8"));
        facts.onRootBarrel = /deck-progress/.test(rb);
        if (!facts.onRootBarrel) {
            violations.push("DeckProgress is not re-exported on the root barrel (src/index.ts)");
        }
    }

    // ── 3. no /deck subpath squat.
    facts.noDeckSubpathFile = !existsSync(P.DECK_SUBPATH);
    if (!facts.noDeckSubpathFile) {
        violations.push("src/subpaths/deck.ts exists — the reserved /deck deck-engine namespace must NOT be squatted");
    }
    if (existsSync(P.PKG)) {
        const pkg = readFileSync(P.PKG, "utf8");
        facts.noDeckExport = !/"\.\/deck"/.test(pkg);
        if (!facts.noDeckExport) {
            violations.push('package.json exports a "./deck" entry — the reserved /deck namespace must NOT be consumed');
        }
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
        "proof:deck-progress-rail — .glass-progress-rail recipe over <Progress> + thin DeckProgress :value wrapper, no math leaf, no /deck squat (AW.W16)",
    );
    console.log(`  .glass-progress-rail recipe : ${facts.recipeExists && facts.readsRailTokens && facts.composesIndicatorChild ? "yes ✓" : "NO ✗"}`);
    console.log(`  DeckProgress composes <Progress>, no chrome/math : ${facts.composesProgress && facts.noChrome && facts.noMathLeaf ? "yes ✓" : "NO ✗"}`);
    console.log(`  no /deck subpath squat       : ${facts.noDeckSubpathFile && facts.noDeckExport ? "yes ✓" : "NO ✗"}`);
    if (violations.length) {
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
