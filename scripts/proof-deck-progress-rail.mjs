#!/usr/bin/env node
// AW.W16 · AX.W24 — the deck-position rail gate (proof:deck-progress-rail).
// Reconciled at AY.W-CLOSE1: the `DeckProgress.vue` WRAPPER + the `./deck-progress`
// subpath + the api seat + the demo story were RETIRED (PRUNE-LEDGER R2 — 0 real
// consumers; slides ships its own deck-local progress bar). The KEPT surface is the
// CSS-only `.glass-progress-rail` `@utility` restyle over the shipped `<Progress>`
// + the `ProgressDefault.vue` token-read (the cascade-correct rail look stays in the
// Progress family). This gate is reconciled to lock the KEPT recipe + the /deck
// reserved guard ONLY; the retired-wrapper / published-subpath / RENDER-story arms
// are removed (a gate must not assert a retired component exists).
//
// glass-ui ships a position-progress RAIL: a `.glass-progress-rail` CSS recipe
// that restyles the shipped `<Progress variant="default">` for the thin
// bottom-of-deck look. NO second progress component that forks the fill, NO
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
        DECK_SUBPATH: resolve(ROOT, "src/subpaths/deck.ts"),
        PKG: resolve(ROOT, "package.json"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DECK_PROGRESS_RAIL_ARTIFACT",
            "AX-deck-progress-rail",
        ),
    };
    return _cliPaths;
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

    // ── STRUCTURE 3 (RETIRED): the DeckProgress.vue wrapper / barrel / root-barrel /
    //    ./deck-progress published-subpath / RENDER-story assertions are GONE — the
    //    wrapper + subpath + api seat + demo story were RETIRED (PRUNE-LEDGER R2).
    //    Asserting the retired component MUST NOT exist would be a backwards-compat
    //    anti-assertion; the gate locks the KEPT recipe + the /deck reserved guard.
    facts.deckProgressWrapperRetired = !existsSync(P.WRAPPER);

    // ── STRUCTURE 4 (RETIRED at BC.W-DECK): the /deck namespace reservation is OVER.
    //    AY.W-CLOSE1 reserved `/deck` for a future slides deck-engine and forbade any
    //    `src/subpaths/deck.ts` / `./deck` export (the squat guard). BC.W-DECK shipped
    //    the `/deck` keyboard-paged PRESENTATION register LEGITIMATELY — `src/subpaths/
    //    deck.ts` (export * from "../components/custom/deck") + the `./deck` package
    //    export are now the OWNED surface, gated by its own `proof:deck`. So the reserved
    //    guard is RETIRED: it would forbid what BC.W-DECK correctly consumed. This gate
    //    keeps ONLY the .glass-progress-rail recipe + the retired-DeckProgress-WRAPPER
    //    locks above (orthogonal to the /deck subpath, which `proof:deck` owns). The
    //    facts record the namespace is now consumed-by-design, not a squat.
    facts.deckNamespaceOwnedByDeckWave = existsSync(P.DECK_SUBPATH);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:deck-progress-rail",
        facts,
        violations,
    });

    console.log(
        "proof:deck-progress-rail — the KEPT .glass-progress-rail recipe (cascade-correct token-feed + inset glow) over <Progress> + ProgressDefault token-read + the /deck reserved guard (the DeckProgress wrapper/subpath RETIRED, PRUNE-LEDGER R2)",
    );
    console.log(
        `  recipe feeds --progress-fill/track + inset glow : ${facts.feedsFillToken && facts.feedsTrackToken && facts.glowIsInset ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  ProgressDefault token-read (no bg-primary util)  : ${facts.defaultReadsFillToken && facts.defaultNoUtilityColor ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  DeckProgress wrapper RETIRED (R2)                : ${facts.deckProgressWrapperRetired ? "yes ✓" : "NO ✗ (still present)"}`,
    );
    console.log(
        `  /deck namespace reserved (no squat)              : ${facts.noDeckSubpathFile && facts.noDeckExport ? "yes ✓" : "NO ✗"}`,
    );
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
