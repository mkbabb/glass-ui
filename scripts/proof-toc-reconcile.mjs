#!/usr/bin/env node
// BC.W-TOC-RECONCILE — proof:toc-reconcile, the ToC-tracking-family reconcile +
// three-leaves + no-third-fork gate. The 3-way fork (glass-ui/sidebar canon +
// the latex-paper older static-array fork + the words wordlist-actions consumer)
// reconciles onto the ONE canonical home — glass-ui/sidebar — and the three
// leaves glass-ui LACKED (useScrollTo / useClickDelegate / useLazyLoader) join
// it. NO re-mint, NO second engine: a fold + extend-in-place.
//
// SOURCE arm. The BINDING painted truth is the π arm
// (tests-visual/toc-reconcile.spec.ts + the W-TOC-RECONCILE-DELTA capture: the
// active-highlight tracking + the ToC-click warm-then-scroll landing). The dist
// /sidebar subpath-resolution is proof:resolution + verify-export-types' job —
// this gate asserts the SOURCE wiring + the single-home fence only.
//
// BORN-RED at HEAD: the three leaves are absent from src/composables/sidebar/,
// the barrel + /api do not export them, the ledger is unwritten.
//
// Each clause carries a self-test bite (the gate-coherence discipline): a
// regressed shape REDs the clause.

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:toc-reconcile";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// Strip JS/TS comments so a witness never matches commented-out text.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── Sources ──────────────────────────────────────────────────────────────────
const trackerSrc = read("src/composables/sidebar/useScrollTracker.ts");
const tracker = strip(trackerSrc);
const followSrc = read("src/composables/sidebar/useSidebarFollow.ts");
const follow = strip(followSrc);
const scrollToSrc = read("src/composables/sidebar/useScrollTo.ts");
const scrollTo = strip(scrollToSrc);
const clickDelegateSrc = read("src/composables/sidebar/useClickDelegate.ts");
const clickDelegate = strip(clickDelegateSrc);
const lazyLoaderSrc = read("src/composables/sidebar/useLazyLoader.ts");
const lazyLoader = strip(lazyLoaderSrc);
const typesSrc = read("src/composables/sidebar/types.ts");
const types = strip(typesSrc);
const barrel = strip(read("src/composables/sidebar/index.ts"));
const sidebarSubpath = strip(read("src/sidebar.ts"));
const apiIndex = strip(read("src/api/index.ts"));
const ledger = read("docs/tranches/BC/audit/W-TOC-RECONCILE-ledger.md");

const checks = [];
const facts = {};
const add = (id, pass, detail) => checks.push({ id, pass, detail });

// ── TR1 — the family is COMPLETE on /sidebar (the four canon + the three leaves) ──
const fourCanon =
    /export\s*\{\s*useScrollTracker\s*\}/.test(barrel) &&
    /\buseSidebarFollow\b/.test(barrel) &&
    /\buseSidebarState\b/.test(barrel) &&
    /\buseTreeIndex\b/.test(barrel);
const threeLeaves =
    /export\s*\{\s*useScrollTo\s*\}/.test(barrel) &&
    /export\s*\{\s*useClickDelegate\s*\}/.test(barrel) &&
    /export\s*\{\s*useLazyLoader\s*\}/.test(barrel);
// The /sidebar subpath mirrors the composables barrel (export * — so the leaves
// + the option types ride it automatically).
const subpathMirrors = /export\s+\*\s+from\s+["']\.\/composables\/sidebar["']/.test(
    sidebarSubpath,
);
// The three option types are co-published on the /api discovery layer.
const apiTypes =
    /ScrollToOptions/.test(apiIndex) &&
    /ClickDelegateOptions/.test(apiIndex) &&
    /LazyLoaderOptions/.test(apiIndex) &&
    /from\s+["']\.\.\/composables\/sidebar["']/.test(apiIndex);
// The barrel publishes the three option types too.
const barrelTypes =
    /ScrollToOptions/.test(barrel) &&
    /ClickDelegateOptions/.test(barrel) &&
    /LazyLoaderOptions/.test(barrel);
add(
    "tr1-family-complete-on-sidebar",
    fourCanon && threeLeaves && subpathMirrors && apiTypes && barrelTypes,
    `the ToC-tracking family is COMPLETE on /sidebar: the four canon (useScrollTracker/useSidebarFollow/useSidebarState/useTreeIndex) + the THREE new leaves (useScrollTo/useClickDelegate/useLazyLoader) export from the barrel, src/sidebar.ts mirrors it, and the three option types co-publish on /api + the barrel [fourCanon=${fourCanon} threeLeaves=${threeLeaves} subpath=${subpathMirrors} apiTypes=${apiTypes} barrelTypes=${barrelTypes}]`,
);

// ── TR2 — the reactive-roots signature is the canon (no static-array regression) ──
// useScrollTracker's first param is MaybeRefOrGetter<T[]> (the toValue reads),
// NOT a bare T[]; the mounted guard is present.
const reactiveRoots =
    /useScrollTracker<T\s+extends\s+TreeNode>\s*\(\s*[\s\S]*?roots:\s*MaybeRefOrGetter<T\[\]>/.test(
        tracker,
    );
const usesToValueRoots = /toValue\(roots\)/.test(tracker);
const mountedGuard = /let\s+mounted\s*=\s*false/.test(tracker) &&
    /if\s*\(!mounted\)\s*return/.test(tracker);
// Self-test bite: a static-array re-fork (`roots: T[]` first param, no
// MaybeRefOrGetter) would red. We assert the negative: the first param is NOT a
// bare `roots: T[],` static array.
const noStaticArrayRefork =
    !/useScrollTracker<T\s+extends\s+TreeNode>\s*\(\s*roots:\s*T\[\]\s*,/.test(tracker);
add(
    "tr2-reactive-roots-canon",
    reactiveRoots && usesToValueRoots && mountedGuard && noStaticArrayRefork,
    `useScrollTracker keeps the reactive-roots canon: first param is MaybeRefOrGetter<T[]> (toValue reads), the mounted guard is present, and NO static-array re-fork (a bare roots: T[] first param) regressed [reactive=${reactiveRoots} toValue=${usesToValueRoots} mounted=${mountedGuard} noRefork=${noStaticArrayRefork}]`,
);

// ── TR3 — the data-toc-id auto-scroll lives ONCE (in useSidebarFollow) ──
// useSidebarFollow carries the data-toc-id querySelector auto-scroll.
const followHasTocAutoScroll =
    /data-toc-id/.test(follow) && /querySelector/.test(follow);
// useScrollTracker does NOT carry an inline data-toc-id scrollIntoView auto-scroll
// (the latex-paper inline copy is NOT re-introduced — re-folding re-forks the
// concern useSidebarFollow already factored out).
const trackerHasNoInlineTocScroll =
    !/data-toc-id/.test(tracker) && !/scrollIntoView/.test(tracker);
add(
    "tr3-toc-autoscroll-once-in-follow",
    followHasTocAutoScroll && trackerHasNoInlineTocScroll,
    `the data-toc-id auto-scroll lives ONCE: useSidebarFollow carries the data-toc-id querySelector auto-scroll, and useScrollTracker carries NO inline data-toc-id/scrollIntoView re-fold (the de-dup holds) [followHasIt=${followHasTocAutoScroll} trackerClean=${trackerHasNoInlineTocScroll}]`,
);

// ── TR4 — useScrollTo is treeIndex-aware + generic-count-sourced (partial-load) ──
const scrollToExists = scrollToSrc.length > 0;
// ensureTargetLoaded reads `entry.rootIndex + 2` (the partial-load) under a
// treeIndex branch, falls back to totalCount otherwise.
const partialLoad = /entry\.rootIndex\s*\+\s*2/.test(scrollTo);
const treeIndexBranch =
    /if\s*\(\s*treeIndex\s*\)/.test(scrollTo) ||
    /treeIndex\.get\(/.test(scrollTo);
const fallbackTotal = /visibleCount\.value\s*=\s*totalCount/.test(scrollTo);
// Generic-count-sourced: NO WordList/PaperSection/consumer-type coupling.
const noConsumerCoupling =
    !/WordListItem|WordList\b|PaperSection/.test(scrollTo) &&
    !/WordListItem|WordList\b|PaperSection/.test(types.match(/interface ScrollToOptions[\s\S]*?\n}/)?.[0] ?? "");
// The rAF-retry settle-and-scroll (the Math.abs(absoluteTop - lastY) < 1 settle).
const settleScroll =
    /Math\.abs\(\s*absoluteTop\s*-\s*lastY\s*\)\s*<\s*1/.test(scrollTo) &&
    /behavior:\s*["']smooth["']/.test(scrollTo);
// The type is generic-count-sourced: totalCount: number + visibleCount: Ref<number>.
const genericCountType =
    /totalCount:\s*number/.test(types) && /visibleCount:\s*Ref<number>/.test(types);
add(
    "tr4-scrollto-treeindex-aware-generic",
    scrollToExists &&
        partialLoad &&
        treeIndexBranch &&
        fallbackTotal &&
        noConsumerCoupling &&
        settleScroll &&
        genericCountType,
    `useScrollTo is treeIndex-aware + generic-count-sourced: ensureTargetLoaded loads entry.rootIndex+2 (partial-load) under a treeIndex branch + falls back to totalCount, NO WordList/PaperSection coupling, the rAF settle-and-smooth-scroll is present, and the option type takes totalCount:number + visibleCount:Ref<number> [exists=${scrollToExists} partial=${partialLoad} branch=${treeIndexBranch} fallback=${fallbackTotal} noCoupling=${noConsumerCoupling} settle=${settleScroll} genericType=${genericCountType}]`,
);

// ── TR5 — useLazyLoader is DISTINCT from useInfiniteScroll (no duplicate) ──
const lazyExists = lazyLoaderSrc.length > 0;
// Grows a visibleCount render-count via a batch sentinel.
const growsVisibleCount =
    /\bvisibleCount\b/.test(lazyLoader) &&
    /visibleCount\.value\s*\+\s*batchSize/.test(lazyLoader) &&
    /\bloadSentinel\b/.test(lazyLoader);
// Does NOT fire a data-fetch onLoadMore trigger (the useInfiniteScroll concern).
const noDataFetchTrigger =
    !/\bonLoadMore\b/.test(lazyLoader) && !/\bfetch\b/.test(lazyLoader);
// The distinction is recorded in the leaf's own docstring/header (a prose record
// of the disjointness from useInfiniteScroll).
const distinctionRecorded =
    /useInfiniteScroll/.test(strip(lazyLoaderSrc).length ? lazyLoaderSrc : "") ||
    /useInfiniteScroll/.test(ledger);
// The house useInfiniteScroll engine still exists + is unchanged (NOT collapsed).
const infiniteScrollIntact = existsSync(
    resolve(ROOT, "src/components/custom/infinite-scroll/composables/useInfiniteScroll.ts"),
);
add(
    "tr5-lazyloader-distinct-from-infinite-scroll",
    lazyExists &&
        growsVisibleCount &&
        noDataFetchTrigger &&
        distinctionRecorded &&
        infiniteScrollIntact,
    `useLazyLoader is DISTINCT from useInfiniteScroll: it grows a visibleCount render-count via a batch sentinel, fires NO onLoadMore/fetch data-trigger, the distinction is recorded (docstring/ledger), and the house useInfiniteScroll engine stays intact (not collapsed) [exists=${lazyExists} grows=${growsVisibleCount} noFetch=${noDataFetchTrigger} recorded=${distinctionRecorded} infiniteIntact=${infiniteScrollIntact}]`,
);

// ── TR6 — the no-third-fork fence + the reconcile-ledger ──
const ledgerExists = ledger.length > 0;
// The ledger records the diff (glass-ui canon ⊇ latex-paper; the ∅-or-folded
// refinements) + the no-third-fork decision.
const ledgerRecordsDiff =
    /latex-paper/i.test(ledger) &&
    /(superset|⊇|supersedes|canon)/i.test(ledger) &&
    /(no[- ]third[- ]fork|no[- ]second[- ]engine|one home|single home)/i.test(ledger);
// The no-third-fork fence: NO second useScrollTracker / useScrollTo / useTreeIndex
// FUNCTION DEFINITION anywhere in src/ (one home). A re-export or a type-only
// mention does not count — only a live `export function use…(` definition.
let dupDefinitions = [];
for (const fn of ["useScrollTracker", "useScrollTo", "useTreeIndex"]) {
    try {
        const grepped = execSync(
            `grep -rln "export function ${fn}" src 2>/dev/null || true`,
            { cwd: ROOT, encoding: "utf8" },
        );
        const files = grepped.split("\n").map((s) => s.trim()).filter(Boolean);
        if (files.length > 1) dupDefinitions.push({ fn, files });
    } catch {
        // grep miss — no definitions, treated as not-a-dup below
    }
}
facts.dupDefinitions = dupDefinitions;
const singleHome = dupDefinitions.length === 0;
add(
    "tr6-no-third-fork-ledger",
    ledgerExists && ledgerRecordsDiff && singleHome,
    `the no-third-fork fence holds: the reconcile-ledger records the glass-ui ⊇ latex-paper diff + the one-home decision, and NO second useScrollTracker/useScrollTo/useTreeIndex function definition exists in src/ (single home; ${dupDefinitions.length} dup-def group(s)) [ledger=${ledgerExists} diff=${ledgerRecordsDiff} singleHome=${singleHome}]`,
);

// ── Report ───────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

function run() {
    console.log(
        "proof:toc-reconcile — the ToC-tracking-family reconcile onto the ONE glass-ui/sidebar home + the three leaves (BC.W-TOC-RECONCILE)",
    );
    console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
    for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

    const ARTIFACT = gateArtifactPath("GATE_TOC_RECONCILE_OUT", "BC-toc-reconcile");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: pass ? "pass" : "fail",
        gate: "proof:toc-reconcile",
        command: COMMAND,
        note: "SOURCE arm + the single-home fence. The BINDING painted truth is tests-visual/toc-reconcile.spec.ts + the W-TOC-RECONCILE-DELTA capture (the active-highlight tracking + the ToC-click warm-then-scroll landing), never this gate alone. The dist /sidebar subpath-resolution is proof:resolution + verify-export-types. The reconcile is a FOLD + extend-in-place: glass-ui/sidebar is the ONE home, the reactive-roots signature is the canon (the static-array fork retires), the data-toc-id auto-scroll lives ONCE in useSidebarFollow, the three leaves (useScrollTo/useClickDelegate/useLazyLoader) join, and the no-third-fork fence makes a fourth fork impossible.",
        facts,
        checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
    });

    if (!pass) {
        console.error(`\n[proof:toc-reconcile] ${failed.length} check(s) FAILED:`);
        for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
        process.exit(1);
    }
    console.log(
        "\n[proof:toc-reconcile] the ToC-tracking family is reconciled HOME — glass-ui/sidebar is the ONE home (the reactive-roots canon, the data-toc-id auto-scroll once in useSidebarFollow), the three latex-paper-only leaves (useScrollTo treeIndex-aware partial-load + useClickDelegate + useLazyLoader distinct from useInfiniteScroll) join it, published on /sidebar + the /api types, and the no-third-fork fence is machine-locked. The π arm proves the painted warm-then-scroll landing.",
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
