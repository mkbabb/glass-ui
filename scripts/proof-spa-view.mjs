#!/usr/bin/env node
// BB.B7 — W-SPAVIEW-CACHE — the published <SpaView :max> bounded view-cache router
// pane (proof:spa-view).
//
// The placement: docs/tranches/BB/coordination/cross-repo-inbound.md §5 —
// "spaview-cache <SpaView :max> — caches inactive views, out-in; rewires
// AdminDashboardLayout". The ask: a component that CACHES inactive views (instant
// back-switch, no re-mount/re-fetch) with an :max LRU cap and an out-in cross-fade.
//
// THE NO-FORK DISCIPLINE: the platform already ships the view-cache primitive —
// Vue's built-in <KeepAlive :max> is the bounded LRU; <Transition mode="out-in"> is
// the cross-fade. SpaView does NOT hand-roll an LRU; it COMPOSES the two. This gate
// is the born-RED→GREEN device-free SOURCE arm; the PAINTED truth (the cache
// survives a switch, the out-in fade, both modes, the PRM instant swap) is the π
// live readback that rides W-REFLECT3 (docs/tranches/BB/audit/visual/
// W-SPAVIEW-CACHE-DELTA.md).
//
// Five falsifiable witnesses (each born-RED at HEAD pre-wave):
//
//   W1 — THE PRIMITIVE EXISTS ONCE ON /spa-view. <SpaView> exists in EXACTLY ONE
//        place (src/components/custom/spa-view/SpaView.vue), barreled
//        (index.ts re-exports the SFC + SpaViewProps), README present, published via
//        src/subpaths/spa-view.ts + the package.json ./spa-view exports entry +
//        typesVersions row (the subpath-publication-is-binary invariant — a primitive
//        in src/ that does not PUBLISH fails, the K.WS silent-miss class).
//   W2 — KEEPALIVE IS THE CACHE (no hand-rolled LRU). The SFC template composes
//        <KeepAlive> AND threads :max onto it. The SFC re-implements NO cache: no
//        Map/Set/WeakMap-backed instance store, no manual mount/unmount eviction loop.
//        Bite (anti-evasion): a hand-rolled cache data structure REDs.
//   W3 — THE OUT-IN COMPOSITOR-ONLY PRM-GATED TRANSITION. The SFC composes
//        <Transition mode="out-in">. The default transition is the shared opacity-only
//        recipe ("fade"); the SFC adds NO layout-property keyframe/transition of its
//        own (compositor-only — proof:no-layout-animation owns the corpus). PRM is
//        carried by the shared .fade recipe in transitions.css (which the no-layout-
//        animation gate already scans), so SpaView needs no own PRM block — the gate
//        asserts the recipe SpaView defaults to is the PRM-handled shared one.
//   W4 — THE :max CAP + include/exclude PASS-THROUGH. The prop surface exposes max
//        (number), include/exclude, view/is, transition, viewKey; max is bound onto
//        KeepAlive's :max; include/exclude pass through. The colocation README +
//        api/index.ts type publication record the surface.
//   W5 — THE ≥2-CONSUMER BAR + CANON. The consumer-evidence doc names the booked
//        binary consumer (the speedtest AdminDashboardLayout, the cross-repo CONSUME
//        contract) AND the in-repo demo exerciser; the §Structure custom-dir bump +
//        CLAUDE note + DELTA are recorded.
//
// PLUS a self-test bite: the W2 KeepAlive/no-fork detector MUST flag a synthetic SFC
// that hand-rolls a Map-backed cache, AND pass a genuine KeepAlive composition.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const P = {
    DIR: resolve(ROOT, "src/components/custom/spa-view"),
    SFC: resolve(ROOT, "src/components/custom/spa-view/SpaView.vue"),
    BARREL: resolve(ROOT, "src/components/custom/spa-view/index.ts"),
    README: resolve(ROOT, "src/components/custom/spa-view/README.md"),
    SUBPATH: resolve(ROOT, "src/subpaths/spa-view.ts"),
    PACKAGE_JSON: resolve(ROOT, "package.json"),
    API_INDEX: resolve(ROOT, "src/api/index.ts"),
    DEMO_STORY: resolve(ROOT, "demo/stories/containers/spa-view.vue"),
    CONSUMER_EVIDENCE: resolve(ROOT, "docs/consumer-evidence/spa-view.md"),
    DELTA: resolve(ROOT, "docs/tranches/BB/audit/visual/W-SPAVIEW-CACHE-DELTA.md"),
    TRANSITIONS_CSS: resolve(ROOT, "src/styles/transitions.css"),
    ARTIFACT: gateArtifactPath("GLASS_UI_SPA_VIEW_ARTIFACT", "BB-spa-view"),
};

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
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
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

/**
 * The W2 KeepAlive/no-fork detector. Pure + exported so the self-test bite feeds it
 * synthetic source. Returns { composesKeepAlive, threadsMax, hasHandRolledCache }.
 */
export function detectKeepAliveComposition(sfcRaw) {
    const sfc = stripHtmlComments(stripBlockComments(sfcRaw ?? ""));
    // KeepAlive composed in the template (the platform cache primitive).
    const composesKeepAlive = /<KeepAlive[\s>]/.test(sfc) || /<keep-alive[\s>]/.test(sfc);
    // :max threaded onto KeepAlive (the LRU cap).
    const threadsMax = /<KeepAlive[^>]*:max=/.test(sfc) || /<keep-alive[^>]*:max=/.test(sfc);
    // A hand-rolled cache: a Map/Set/WeakMap-backed instance store OR a manual
    // mount/unmount eviction loop. The no-fork bite — the platform IS the cache.
    const hasHandRolledCache =
        /new\s+(Map|WeakMap|Set)\s*\(/.test(sfc) ||
        /\.set\(\s*\w+\s*,\s*(?:markRaw|shallowRef|h\()/.test(sfc) ||
        /cache\s*\[\s*\w+\s*\]\s*=/.test(sfc) ||
        /evict|lru|leastRecentlyUsed/i.test(sfc);
    return { composesKeepAlive, threadsMax, hasHandRolledCache };
}

/**
 * The W3 transition detector. Pure. Returns { composesOutIn, defaultsToFade,
 * forksLayoutAnimation }.
 */
export function detectTransition(sfcRaw) {
    const sfc = stripHtmlComments(stripBlockComments(sfcRaw ?? ""));
    const composesOutIn = /<Transition[^>]*mode=["']out-in["']/.test(sfc);
    // The default transition recipe is the shared opacity-only "fade" (PRM-handled in
    // transitions.css). Read off the withDefaults default.
    const defaultsToFade = /transition:\s*["']fade["']/.test(sfc);
    // A SpaView-LOCAL layout-property transition/keyframe is the compositor-only
    // violation (width/height/padding/margin/top/left/inline-size/block-size). The
    // SFC must not author one — it rides the shared compositor recipe.
    const forksLayoutAnimation =
        /transition:\s*[^;{]*\b(width|height|padding|margin|top|left|right|bottom|inline-size|block-size|inset)\b/.test(sfc) ||
        /@keyframes/.test(sfc);
    return { composesOutIn, defaultsToFade, forksLayoutAnimation };
}

export function detectSpaView(sources) {
    const violations = [];

    const sfc = stripHtmlComments(stripBlockComments(sources.sfc ?? ""));
    const barrel = stripBlockComments(sources.barrel ?? "");
    const subpath = stripBlockComments(sources.subpath ?? "");
    const apiTs = stripBlockComments(sources.apiTs ?? "");
    const demoStory = stripHtmlComments(stripBlockComments(sources.demoStory ?? ""));
    const evidenceMd = sources.evidenceMd ?? "";
    const deltaMd = sources.deltaMd ?? "";
    const transitionsCss = sources.transitionsCss ?? "";

    // ── W1 — the primitive exists ONCE on /spa-view ───────────────────────────
    const dirExists = sources.dirExists;
    const sfcExists = (sources.sfc ?? "").length > 0;
    const barrelReExports =
        /export\s*\{\s*default as SpaView\s*\}/.test(barrel) &&
        /export type\s*\{\s*SpaViewProps\s*\}/.test(barrel);
    const readmeExists = sources.readmeExists;
    const subpathReExports = /export \* from ["']\.\.\/components\/custom\/spa-view["']/.test(subpath);
    const { exportsEntry, typesVersionsRow } = sources.packageFacts;

    if (!dirExists) violations.push("W1: src/components/custom/spa-view/ dir is absent");
    if (!sfcExists) violations.push("W1: SpaView.vue is absent");
    if (!barrelReExports) violations.push("W1: index.ts must re-export `SpaView` (default) + `SpaViewProps` (type)");
    if (!readmeExists) violations.push("W1: README.md is absent (the colocation marker)");
    if (!subpathReExports) violations.push("W1: src/subpaths/spa-view.ts must re-export the package");
    if (!exportsEntry) violations.push("W1: package.json exports `./spa-view` { types, import } entry is absent — the subpath-publication-is-binary invariant");
    if (!typesVersionsRow) violations.push("W1: package.json typesVersions['*'].spa-view row is absent");

    // ── W2 — KeepAlive IS the cache (no hand-rolled LRU) ──────────────────────
    const ka = detectKeepAliveComposition(sources.sfc ?? "");
    if (!ka.composesKeepAlive) violations.push("W2: SpaView.vue must compose <KeepAlive> (the platform view-cache primitive — no hand-rolled cache)");
    if (!ka.threadsMax) violations.push("W2: :max must be threaded onto <KeepAlive> (the LRU cap)");
    if (ka.hasHandRolledCache) violations.push("W2: SpaView.vue hand-rolls a cache (Map/Set/eviction loop) — KeepAlive IS the cache, no fork");

    // ── W3 — the out-in compositor-only PRM-gated transition ──────────────────
    const tr = detectTransition(sources.sfc ?? "");
    if (!tr.composesOutIn) violations.push('W3: SpaView.vue must compose <Transition mode="out-in"> (the out-in cross-fade)');
    if (!tr.defaultsToFade) violations.push('W3: the default transition must be the shared opacity-only "fade" recipe (withDefaults transition: "fade")');
    if (tr.forksLayoutAnimation) violations.push("W3: SpaView.vue forks a layout-property transition/keyframe — the transition must be compositor-only (rides the shared recipe)");
    // The shared "fade" recipe SpaView defaults to is PRM-handled in transitions.css.
    const fadeRecipePresent = /\.fade-enter-active/.test(transitionsCss);
    const fadePrmHandled = /prefers-reduced-motion: reduce/.test(transitionsCss) && /\.fade-enter-active/.test(transitionsCss);
    if (!fadeRecipePresent) violations.push("W3: the shared .fade recipe is absent from transitions.css (the compositor-only out-in default)");
    if (!fadePrmHandled) violations.push("W3: transitions.css must PRM-handle the .fade recipe (the SpaView default rides the shared PRM carve)");

    // ── W4 — the :max cap + include/exclude pass-through + the prop surface ────
    const exposesMax = /max\?:\s*number/.test(sfc);
    const exposesIncludeExclude = /include\?:/.test(sfc) && /exclude\?:/.test(sfc);
    const passesIncludeExclude = /:include=["']include["']/.test(sfc) && /:exclude=["']exclude["']/.test(sfc);
    const exposesView = /view\?:/.test(sfc) && /is\?:/.test(sfc);
    const apiPublishesProps = /SpaViewProps/.test(apiTs) && /spa-view/.test(apiTs);
    if (!exposesMax) violations.push("W4: the `max?: number` prop is absent");
    if (!exposesIncludeExclude) violations.push("W4: the `include`/`exclude` props are absent");
    if (!passesIncludeExclude) violations.push("W4: include/exclude must pass through to <KeepAlive :include :exclude>");
    if (!exposesView) violations.push("W4: the `view`/`is` dynamic-component props are absent");
    if (!apiPublishesProps) violations.push("W4: src/api/index.ts must publish `SpaViewProps` from the spa-view package");

    // ── W5 — the ≥2-consumer bar ──────────────────────────────────────────────
    // (BH.B5e: the doc-presence `claudeMd` sub-check DROPPED — the functional
    // ≥2-consumer clauses are kept; canon-home authoring rides proof:claude-deletable.)
    const evidenceNamesBooked = /AdminDashboardLayout/.test(evidenceMd);
    const evidenceNamesDemo = /demo\/stories\/containers\/spa-view\.vue/.test(evidenceMd);
    const demoBindsSpaView = /<SpaView/.test(demoStory) && /:max=/.test(demoStory);
    const deltaExists = deltaMd.length > 0;
    if (!evidenceNamesBooked) violations.push("W5: consumer-evidence must name the booked binary consumer (AdminDashboardLayout)");
    if (!evidenceNamesDemo) violations.push("W5: consumer-evidence must name the in-repo demo exerciser");
    if (!demoBindsSpaView) violations.push("W5: the demo story must mount <SpaView :max>");
    if (!deltaExists) violations.push("W5: the W-SPAVIEW-CACHE DELTA is absent");

    const facts = {
        w1: { dirExists, sfcExists, barrelReExports, readmeExists, subpathReExports, exportsEntry, typesVersionsRow },
        w2: { ...ka },
        w3: { ...tr, fadeRecipePresent, fadePrmHandled },
        w4: { exposesMax, exposesIncludeExclude, passesIncludeExclude, exposesView, apiPublishesProps },
        w5: { evidenceNamesBooked, evidenceNamesDemo, demoBindsSpaView, deltaExists },
    };
    return { facts, violations };
}

function readPackageFacts(pkgRaw) {
    let pkg = null;
    try {
        pkg = JSON.parse(pkgRaw);
    } catch {
        return { exportsEntry: false, typesVersionsRow: false };
    }
    const entry = pkg?.exports?.["./spa-view"];
    const exportsEntry =
        !!entry && typeof entry.types === "string" && typeof entry.import === "string";
    const tv = pkg?.typesVersions?.["*"]?.["spa-view"];
    const typesVersionsRow = Array.isArray(tv) && tv.length > 0;
    return { exportsEntry, typesVersionsRow };
}

// ── the self-test bite: the W2 detector must flag a hand-rolled cache AND pass a
// genuine KeepAlive composition. Run in-process; a broken bite REDs the gate.
function selfTestBite() {
    const out = [];
    // A genuine KeepAlive composition with :max — must PASS (no fork).
    const cleanSfc = `<template>
        <Transition name="fade" mode="out-in">
            <KeepAlive :max="max"><component :is="v" :key="k" /></KeepAlive>
        </Transition>
    </template>`;
    const clean = detectKeepAliveComposition(cleanSfc);
    // A hand-rolled Map-backed cache — must be FLAGGED.
    const forkSfc = `<script setup>
        const cache = new Map();
        function show(k){ if(!cache.has(k)) cache.set(k, markRaw(h(view))); return cache.get(k); }
    </script><template><component :is="active" /></template>`;
    const fork = detectKeepAliveComposition(forkSfc);

    const cleanOk = clean.composesKeepAlive && clean.threadsMax && !clean.hasHandRolledCache;
    const forkFlagged = fork.hasHandRolledCache;
    if (!cleanOk) out.push("[self-test] the KeepAlive detector failed a genuine <KeepAlive :max> composition");
    if (!forkFlagged) out.push("[self-test] the no-fork bite is broken — a hand-rolled Map-backed cache must be FLAGGED");
    return { biteOk: out.length === 0, cleanOk, forkFlagged, violations: out };
}

function run() {
    const pkgRaw = safeRead(P.PACKAGE_JSON);
    const packageFacts = readPackageFacts(pkgRaw);

    const { facts, violations } = detectSpaView({
        dirExists: existsSync(P.DIR),
        sfc: safeRead(P.SFC),
        barrel: safeRead(P.BARREL),
        readmeExists: existsSync(P.README),
        subpath: safeRead(P.SUBPATH),
        packageFacts,
        apiTs: safeRead(P.API_INDEX),
        demoStory: safeRead(P.DEMO_STORY),
        evidenceMd: safeRead(P.CONSUMER_EVIDENCE),
        deltaMd: safeRead(P.DELTA),
        transitionsCss: safeRead(P.TRANSITIONS_CSS),
    });

    const bite = selfTestBite();
    facts.selfTest = { cleanOk: bite.cleanOk, forkFlagged: bite.forkFlagged };
    for (const v of bite.violations) violations.push(v);

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:spa-view",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log("proof:spa-view — the published <SpaView :max> bounded view-cache router pane (BB.B7 — W-SPAVIEW-CACHE)");
    console.log(
        `  W1 primitive exists ONCE on /spa-view : ${yn(
            facts.w1.dirExists && facts.w1.sfcExists && facts.w1.barrelReExports &&
                facts.w1.readmeExists && facts.w1.subpathReExports &&
                facts.w1.exportsEntry && facts.w1.typesVersionsRow,
        )}`,
    );
    console.log(
        `  W2 KeepAlive IS the cache (no fork)   : ${yn(
            facts.w2.composesKeepAlive && facts.w2.threadsMax && !facts.w2.hasHandRolledCache,
        )}  (keepalive:${yn(facts.w2.composesKeepAlive)} :max:${yn(facts.w2.threadsMax)} no-fork:${yn(!facts.w2.hasHandRolledCache)})`,
    );
    console.log(
        `  W3 out-in compositor-only PRM-gated   : ${yn(
            facts.w3.composesOutIn && facts.w3.defaultsToFade && !facts.w3.forksLayoutAnimation && facts.w3.fadePrmHandled,
        )}`,
    );
    console.log(
        `  W4 :max cap + include/exclude + props : ${yn(
            facts.w4.exposesMax && facts.w4.exposesIncludeExclude && facts.w4.passesIncludeExclude &&
                facts.w4.exposesView && facts.w4.apiPublishesProps,
        )}`,
    );
    console.log(
        `  W5 ≥2-consumer bar                    : ${yn(
            facts.w5.evidenceNamesBooked && facts.w5.evidenceNamesDemo && facts.w5.demoBindsSpaView &&
                facts.w5.deltaExists,
        )}`,
    );
    console.log(`  self-test bite (no-fork)              : ${yn(bite.biteOk)}  (clean:${yn(bite.cleanOk)} fork-flagged:${yn(bite.forkFlagged)})`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
