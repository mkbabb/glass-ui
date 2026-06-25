#!/usr/bin/env node
// BC.W-DECK — the `@mkbabb/glass-ui/deck` sibling subpath (proof:deck).
//
// The born-RED→GREEN device-free SOURCE arm for the full-viewport keyboard-paged
// aria-live PRESENTATION register — the single largest unbuilt cross-repo primitive
// (the `/deck` name was reserved-but-never-built across AY→BB). This gate locks the
// LIFT: a clean MOVE of the slides donor's ~1108-LoC headless core into the colocated
// `/deck` dir, NOT a re-author, NOT a `/carousel` fold, NOT a third `pagerWindow` fork.
//
//   D1 — THE `/deck` SUBPATH EXISTS AS A SIBLING (colocation + publication).
//        The deck/ feature-dir + composables/useDeck + composables/useDeckKeyboard +
//        composables/useDeckSpring + DeckPager.vue + constants.ts + index.ts +
//        README.md; the /deck subpath mirror + the api type publication + the
//        package.json `./deck` export + `typesVersions["deck"]`. A `/carousel` FOLD
//        (the deck folded into carousel.ts / the carousel export) REDs (caveat i).
//   D2 — THE LIFT IS A MOVE, NOT A RE-AUTHOR. The donor `useDeck` semantics are
//        preserved unit-faithful: the clamp `[0,total-1]`, the 1-based `progress`
//        ((index+1)/total*100), `go`/`next`/`prev`/`first`/`last`. A drifted
//        clamp/progress REDs.
//   D3 — NO THIRD `pagerWindow` FORK. The windowing math is sourced from ONE place
//        (`pager-dots/pagerWindow.ts`); PagerDots imports it AND DeckPager composes
//        PagerDots — there is no second `function pagerWindow` definition in the
//        deck/ or pager-dots/ source. A second definition REDs.
//   D4 — `useDeckKeyboard` IS FOCUS-GUARDED. The CONTROL_SELECTOR test is present;
//        Space + digit reach a focused control's native activation (`if (onControl)
//        return false` for Space, `&& !onControl` for digit). A hijack-all keydown
//        (Space/digit navigating regardless of focus) REDs.
//   D5 — `<DeckPager>` IS THE PRESENTATION REGISTER over PagerDots. It composes
//        `<PagerDots pattern="group">` (the deck aria axis: role=group/aria-current,
//        NOT a re-rendered dot loop) AND PagerDots emits the group register when
//        `pattern==="group"` (role=group on the root, aria-current on the active dot)
//        while keeping the default tabs register byte-identical. The focus-survival
//        watch + the 24px WCAG-2.5.8 hit target ride the composed PagerDots machinery.
//   D6 — THE ARIA-LIVE ANNOUNCER SEAM. `useDeck` returns a `liveMessage` computed
//        ("Slide N of M") off the live index — the portable WCAG step announcer a
//        consumer surfaces in an sr-only polite region.
//   D7 — `--spring-deck` RESOLVES THE `.smooth` REGISTER. `--spring-deck:
//        var(--spring-smooth)` (scheme-motion.css) — an ALIAS, NOT a new spring
//        family. The JS half (`installDeckSpring`) consumes keyframes.js
//        `springTimingFunction(DECK_SPRING)` as the LAZY dynamic import only (the
//        /deck barrel stays keyframes-FREE on the static graph — no top-level
//        `import … from "@mkbabb/keyframes.js"` in the deck composables).
//
// The BINDING painted truth is the π readback (tests-visual/deck.spec.ts — the live
// keyboard-page + focus-guard + focus-survival + announcer over the demo deck, both
// modes) + the proof:ba-gestalt motion-band verdict. This gate is the no-device CI half.
//
// House style mirrors proof-completion-seal.mjs: comment-strip first (false-witness
// discipline), a pure exported detector, a byte-stable JSON artefact, a self-test with
// planted-defect bites, process.exit(1) on any violation.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const d = (p) => resolve(ROOT, "src/components/custom/deck", p);
    _cliPaths = {
        ROOT,
        DIR: resolve(ROOT, "src/components/custom/deck"),
        USE_DECK: d("composables/useDeck.ts"),
        USE_KEYBOARD: d("composables/useDeckKeyboard.ts"),
        USE_SPRING: d("composables/useDeckSpring.ts"),
        DECK_PAGER: d("DeckPager.vue"),
        CONSTANTS: d("constants.ts"),
        INDEX: d("index.ts"),
        README: d("README.md"),
        PAGER_WINDOW: resolve(
            ROOT,
            "src/components/custom/pager-dots/pagerWindow.ts",
        ),
        PAGER_DOTS: resolve(
            ROOT,
            "src/components/custom/pager-dots/PagerDots.vue",
        ),
        SCHEME_MOTION: resolve(ROOT, "src/styles/tokens/scheme-motion.css"),
        // BD.W-CUT carved the §2 EASING block (incl. --spring-deck) into the
        // adjacent scheme-spring.css partial; D7 reads it concatenated below.
        SCHEME_SPRING: resolve(ROOT, "src/styles/tokens/scheme-spring.css"),
        SUBPATH: resolve(ROOT, "src/subpaths/deck.ts"),
        CAROUSEL_SUBPATH: resolve(ROOT, "src/subpaths/carousel.ts"),
        API_INDEX: resolve(ROOT, "src/api/index.ts"),
        ROOT_BARREL: resolve(ROOT, "src/index.ts"),
        PKG: resolve(ROOT, "package.json"),
        ARTIFACT: gateArtifactPath("GLASS_UI_DECK_ARTIFACT", "BC-deck"),
    };
    return _cliPaths;
}

// ── comment-strip (the false-witness discipline) ────────────────────────────
function stripBlockComments(t) {
    return t.replace(/\/\*[\s\S]*?\*\//g, " ");
}
function stripLineComments(t) {
    return t
        .split("\n")
        .map((l) => {
            const m = l.match(/(^|[^:])\/\//);
            if (!m) return l;
            return l.slice(0, l.indexOf("//", m.index));
        })
        .join("\n");
}
function stripTs(t) {
    return stripLineComments(stripBlockComments(t));
}
function stripCss(t) {
    return stripBlockComments(t);
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

/** Count `function pagerWindow(` definitions across a joined source blob. */
function countPagerWindowDefs(blob) {
    return (blob.match(/function\s+pagerWindow\s*\(/g) ?? []).length;
}

/**
 * THE PURE DETECTOR — takes file CONTENTS (so the self-test can plant synthetic
 * inputs) and returns { facts, violations }. No disk read inside.
 */
export function detectDeck(inputs) {
    const {
        useDeck = "",
        useKeyboard = "",
        useSpring = "",
        deckPager = "",
        constants = "",
        index = "",
        pagerWindow = "",
        pagerDots = "",
        schemeMotion = "",
        subpath = "",
        carouselSubpath = "",
        apiIndex = "",
        rootBarrel = "",
        pkg = "",
        dirExists = false,
        readmeExists = false,
        constantsExists = false,
        useDeckExists = false,
        useKeyboardExists = false,
        useSpringExists = false,
        deckPagerExists = false,
        indexExists = false,
        pagerWindowExists = false,
    } = inputs;

    const violations = [];
    const facts = {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {},
        d6: {},
        d7: {},
    };

    // ── D1 — the /deck subpath exists as a SIBLING (colocation + publication) ──
    const subpathMirror = /export \* from ["']\.\.\/components\/custom\/deck["']/.test(
        subpath,
    );
    const apiPublishes = /DeckCore|DeckMoves/.test(apiIndex);
    const pkgExport = /"\.\/deck"/.test(pkg);
    const typesVersions = /"deck"\s*:\s*\[\s*"dist\/deck\.d\.ts"/.test(pkg);
    // The caveat-i fence: a /carousel FOLD reds — the deck export folded into the
    // carousel subpath (carousel.ts re-exporting the deck) is the violation.
    const carouselFold = /custom\/deck|\/deck"/.test(carouselSubpath);
    // The off-root-barrel fence: /deck is OFF the root barrel (vueuse+keyframes-free
    // discipline). A root barrel re-export of custom/deck reds.
    const onRootBarrel = /components\/custom\/deck/.test(rootBarrel);
    facts.d1 = {
        dirExists,
        readmeExists,
        constantsExists,
        useDeckExists,
        useKeyboardExists,
        useSpringExists,
        deckPagerExists,
        indexExists,
        subpathMirror,
        apiPublishes,
        pkgExport,
        typesVersions,
        carouselFold,
        onRootBarrel,
    };
    if (!dirExists) violations.push("D1: the deck/ feature-dir does not exist");
    if (
        !(
            readmeExists &&
            constantsExists &&
            useDeckExists &&
            useKeyboardExists &&
            useSpringExists &&
            deckPagerExists &&
            indexExists
        )
    )
        violations.push(
            "D1: the colocation set is incomplete (composables/useDeck.ts + useDeckKeyboard.ts + useDeckSpring.ts + DeckPager.vue + constants.ts + index.ts + README.md)",
        );
    if (!subpathMirror)
        violations.push(
            "D1: src/subpaths/deck.ts mirror is missing/mis-shaped (the glob-resolved subpath)",
        );
    if (!apiPublishes)
        violations.push(
            "D1: src/api/index.ts does not publish a DeckCore/DeckMoves type (the discovery layer)",
        );
    if (!pkgExport)
        violations.push("D1: package.json has no `./deck` export (the SIBLING subpath)");
    if (!typesVersions)
        violations.push(
            "D1: package.json typesVersions has no `deck` → dist/deck.d.ts row (the dts publication)",
        );
    if (carouselFold)
        violations.push(
            "D1: the deck is FOLDED into /carousel (caveat i) — the deck is the full-viewport keyboard-paged PRESENTATION register, DISTINCT from carousel's embla item-scroller; it ships as a SIBLING subpath, never a carousel fold",
        );
    if (onRootBarrel)
        violations.push(
            "D1: custom/deck is re-exported from the root barrel — /deck is OFF the root barrel (the vueuse-FREE + keyframes-FREE SCC-trap discipline); reached only via @mkbabb/glass-ui/deck",
        );

    // ── D2 — the lift is a MOVE, not a re-author (donor semantics preserved) ──
    const hasClamp =
        /Math\.max\(\s*0\s*,\s*Math\.min\(\s*total\s*-\s*1\s*,/.test(useDeck);
    const hasProgress =
        /\(\s*\(\s*index\.value\s*\+\s*1\s*\)\s*\/\s*total\s*\)\s*\*\s*100/.test(
            useDeck,
        );
    const hasMoves =
        /next\s*:/.test(useDeck) &&
        /prev\s*:/.test(useDeck) &&
        /first\s*:/.test(useDeck) &&
        /last\s*:/.test(useDeck) &&
        /\bgo\b/.test(useDeck);
    facts.d2 = { hasClamp, hasProgress, hasMoves };
    if (!hasClamp)
        violations.push(
            "D2: useDeck does not clamp to `Math.max(0, Math.min(total - 1, n))` (the donor clamp drifted)",
        );
    if (!hasProgress)
        violations.push(
            "D2: useDeck `progress` is not `((index + 1) / total) * 100` (the donor 1-based progress drifted)",
        );
    if (!hasMoves)
        violations.push(
            "D2: useDeck does not return the full move surface (go/next/prev/first/last)",
        );

    // ── D3 — NO third pagerWindow fork (sourced from ONE place) ───────────────
    const leafDefinesPagerWindow = countPagerWindowDefs(pagerWindow) === 1;
    const pagerDotsImportsLeaf =
        /import\s*\{\s*pagerWindow\s*\}\s*from\s*["']\.\/pagerWindow["']/.test(
            pagerDots,
        );
    // No second `function pagerWindow` definition anywhere in pager-dots/ or deck/.
    const extraDefs =
        countPagerWindowDefs(pagerDots) +
        countPagerWindowDefs(deckPager) +
        countPagerWindowDefs(useDeck) +
        countPagerWindowDefs(index);
    facts.d3 = {
        leafDefinesPagerWindow,
        pagerDotsImportsLeaf,
        extraDefs,
    };
    if (!leafDefinesPagerWindow)
        violations.push(
            "D3: pager-dots/pagerWindow.ts does not define `function pagerWindow` exactly once (the ONE windowing-oracle source)",
        );
    if (!pagerDotsImportsLeaf)
        violations.push(
            "D3: PagerDots.vue does not import `pagerWindow` from `./pagerWindow` (it must compose the shared leaf, not re-define the math)",
        );
    if (extraDefs > 0)
        violations.push(
            "D3: a second `function pagerWindow` definition exists (in pager-dots/PagerDots.vue / deck/) — the windowing math is sourced from ONE place; a third fork is the exact duplication this wave KILLS",
        );

    // ── D4 — useDeckKeyboard is FOCUS-GUARDED ─────────────────────────────────
    const hasControlSelector =
        /CONTROL_SELECTOR/.test(constants) && /CONTROL_SELECTOR/.test(useKeyboard);
    const controlSelectorValue =
        /CONTROL_SELECTOR\s*=\s*["'][^"']*\[role=button\][^"']*["']/.test(
            constants,
        );
    // The Space guard: `if (onControl) return false` for Space, `&& !onControl` for
    // digit (the focus guard reaches the control's native activation).
    const spaceGuarded = /if\s*\(\s*onControl\s*\)\s*return\s+false/.test(
        useKeyboard,
    );
    const digitGuarded = /&&\s*!onControl/.test(useKeyboard);
    facts.d4 = {
        hasControlSelector,
        controlSelectorValue,
        spaceGuarded,
        digitGuarded,
    };
    if (!hasControlSelector)
        violations.push(
            "D4: CONTROL_SELECTOR is not declared in constants.ts AND read by useDeckKeyboard (the focused-control test)",
        );
    if (!controlSelectorValue)
        violations.push(
            "D4: CONTROL_SELECTOR does not include the control set (button/a/input/textarea/select/[role=button])",
        );
    if (!spaceGuarded)
        violations.push(
            "D4: the Space key is not focus-guarded (`if (onControl) return false`) — Space on a focused control must reach its native activation, never be hijacked for navigation (the C6 fix)",
        );
    if (!digitGuarded)
        violations.push(
            "D4: the digit jump is not focus-guarded (`&& !onControl`) — a digit on a focused field must type, never jump slides",
        );

    // ── D5 — <DeckPager> is the PRESENTATION register over PagerDots ──────────
    const deckPagerComposesPagerDots =
        /from\s*["']\.\.\/pager-dots\/PagerDots\.vue["']/.test(deckPager) &&
        /pattern\s*=\s*["']group["']/.test(deckPager);
    // PagerDots emits the group register conditionally on pattern==="group".
    const pagerDotsHasPatternAxis = /pattern\s*\?:\s*["']tabs["']\s*\|\s*["']group["']/.test(
        pagerDots,
    );
    const pagerDotsEmitsGroupRole =
        /role\s*=\s*"group"|['"`]group['"`]\s*:\s*['"`]tablist['"`]/.test(
            pagerDots,
        ) || /pattern\s*===\s*['"]group['"]/.test(pagerDots);
    const pagerDotsEmitsAriaCurrent = /aria-current/.test(pagerDots);
    // The focus-survival + 24px hit target ride the composed PagerDots machinery.
    const focusSurvival =
        /document\.activeElement/.test(pagerDots) &&
        /dotEls\.get\(\s*active\.value\s*\)\?\.focus\(\)/.test(pagerDots);
    const hitTarget = /width:\s*24px/.test(pagerDots) && /height:\s*24px/.test(pagerDots);
    facts.d5 = {
        deckPagerComposesPagerDots,
        pagerDotsHasPatternAxis,
        pagerDotsEmitsGroupRole,
        pagerDotsEmitsAriaCurrent,
        focusSurvival,
        hitTarget,
    };
    if (!deckPagerComposesPagerDots)
        violations.push(
            "D5: DeckPager.vue does not compose `<PagerDots pattern=\"group\">` (it must wrap the PagerDots oracle with the group aria axis, not re-render a dot loop)",
        );
    if (!pagerDotsHasPatternAxis)
        violations.push(
            "D5: PagerDots has no `pattern?: \"tabs\" | \"group\"` axis (the deck PRESENTATION register selector)",
        );
    if (!pagerDotsEmitsGroupRole)
        violations.push(
            "D5: PagerDots does not emit the group register when pattern===\"group\" (role=group / the conditional role)",
        );
    if (!pagerDotsEmitsAriaCurrent)
        violations.push(
            "D5: PagerDots does not emit aria-current (the deck PRESENTATION register marks the active dot with aria-current, not only aria-selected)",
        );
    if (!focusSurvival)
        violations.push(
            "D5: the PagerDots focus-survival watch is missing (a focused dot scrolling out of the window must move focus to the active dot, never to <body>)",
        );
    if (!hitTarget)
        violations.push(
            "D5: the PagerDots dot is not the 24px WCAG-2.5.8 hit target",
        );

    // ── D6 — the aria-live announcer seam ─────────────────────────────────────
    const hasLiveMessage =
        /liveMessage/.test(useDeck) &&
        /Slide\s*\$\{[^}]*\+\s*1\}\s*of\s*\$\{total\}/.test(useDeck);
    facts.d6 = { hasLiveMessage };
    if (!hasLiveMessage)
        violations.push(
            "D6: useDeck does not return a `liveMessage` computed (`Slide N of M` off the live index) — the portable WCAG step announcer seam",
        );

    // ── D7 — --spring-deck resolves the .smooth register (alias, lazy kf) ─────
    const springDeckAlias =
        /--spring-deck\s*:\s*var\(\s*--spring-smooth\s*\)/.test(schemeMotion);
    // No NEW spring family: --spring-deck must NOT be its own linear() curve.
    const springDeckIsOwnCurve = /--spring-deck\s*:\s*linear\(/.test(schemeMotion);
    // The lazy kf consume: installDeckSpring uses a dynamic import, NOT a static
    // top-level import of @mkbabb/keyframes.js (keeping /deck keyframes-free).
    const lazyKfImport = /import\(\s*["']@mkbabb\/keyframes\.js["']\s*\)/.test(
        useSpring,
    );
    const staticKfImport =
        /^\s*import\s[^\n]*from\s*["']@mkbabb\/keyframes\.js["']/m.test(useSpring) ||
        /^\s*import\s[^\n]*from\s*["']@mkbabb\/keyframes\.js["']/m.test(useDeck) ||
        /^\s*import\s[^\n]*from\s*["']@mkbabb\/keyframes\.js["']/m.test(
            useKeyboard,
        ) ||
        /^\s*import\s[^\n]*from\s*["']@mkbabb\/keyframes\.js["']/m.test(index);
    const consumesSpringTimingFunction = /springTimingFunction\(\s*DECK_SPRING\s*\)/.test(
        useSpring,
    );
    facts.d7 = {
        springDeckAlias,
        springDeckIsOwnCurve,
        lazyKfImport,
        staticKfImport,
        consumesSpringTimingFunction,
    };
    if (!springDeckAlias)
        violations.push(
            "D7: --spring-deck is not `var(--spring-smooth)` (scheme-motion.css) — the deck rides the existing .smooth register, an ALIAS not a new spring family",
        );
    if (springDeckIsOwnCurve)
        violations.push(
            "D7: --spring-deck is minted as its OWN linear() curve — that is a third easing vocabulary (the donor's + the W-GLASS-CAL spring fence forbid it); it must alias --spring-smooth",
        );
    if (!lazyKfImport)
        violations.push(
            "D7: installDeckSpring does not consume keyframes.js via a LAZY dynamic import (`import(\"@mkbabb/keyframes.js\")`)",
        );
    if (staticKfImport)
        violations.push(
            "D7: a STATIC top-level `import … from \"@mkbabb/keyframes.js\"` exists on the /deck barrel — keyframes is the LAZY dynamic import only (the SCC-trap discipline; a static import re-opens the trap)",
        );
    if (!consumesSpringTimingFunction)
        violations.push(
            "D7: installDeckSpring does not consume `springTimingFunction(DECK_SPRING)` (the cross-repo kf consume — the count-up easing)",
        );

    return { facts, violations };
}

// ── the live-disk read ───────────────────────────────────────────────────────
function readInputs(P) {
    return {
        useDeck: stripTs(read(P.USE_DECK)),
        useKeyboard: stripTs(read(P.USE_KEYBOARD)),
        useSpring: stripTs(read(P.USE_SPRING)),
        deckPager: stripTs(read(P.DECK_PAGER)),
        constants: stripTs(read(P.CONSTANTS)),
        index: stripTs(read(P.INDEX)),
        pagerWindow: stripTs(read(P.PAGER_WINDOW)),
        pagerDots: stripTs(read(P.PAGER_DOTS)),
        schemeMotion: stripCss(read(P.SCHEME_MOTION) + "\n" + read(P.SCHEME_SPRING)),
        subpath: stripTs(read(P.SUBPATH)),
        carouselSubpath: stripTs(read(P.CAROUSEL_SUBPATH)),
        apiIndex: stripTs(read(P.API_INDEX)),
        rootBarrel: stripTs(read(P.ROOT_BARREL)),
        pkg: read(P.PKG),
        dirExists: existsSync(P.DIR),
        readmeExists: existsSync(P.README),
        constantsExists: existsSync(P.CONSTANTS),
        useDeckExists: existsSync(P.USE_DECK),
        useKeyboardExists: existsSync(P.USE_KEYBOARD),
        useSpringExists: existsSync(P.USE_SPRING),
        deckPagerExists: existsSync(P.DECK_PAGER),
        indexExists: existsSync(P.INDEX),
        pagerWindowExists: existsSync(P.PAGER_WINDOW),
    };
}

// ── self-test: the false-witness bites (each planted defect must RED) ─────────
function selfTest() {
    const good = {
        useDeck: `export interface DeckCore { liveMessage: ComputedRef<string>; }
        export function useDeck(total, opts = {}) {
            const clamp = (n) => Math.max(0, Math.min(total - 1, n));
            const index = ref(clamp(opts.initial ?? 0));
            const progress = computed(() => ((index.value + 1) / total) * 100);
            const liveMessage = computed(() => \`Slide \${index.value + 1} of \${total}\`);
            function go(i) {}
            return { index, total, progress, liveMessage, go, next: () => {}, prev: () => {}, first: () => {}, last: () => {} };
        }`,
        useKeyboard: `import { CONTROL_SELECTOR } from "../constants";
        export function handleDeckKey(e, deck, opts = {}) {
            const onControl = isControl(e.target);
            case " ": if (onControl) return false; deck.next();
            if (e.key >= "1" && e.key <= "9" && !onControl) { deck.go(parseInt(e.key, 10) - 1); }
        }`,
        useSpring: `import { DECK_SPRING } from "../constants";
        export function installDeckSpring() {
            void import("@mkbabb/keyframes.js").then(({ springTimingFunction }) => { deckEase.fn = springTimingFunction(DECK_SPRING); });
        }`,
        deckPager: `import PagerDots from "../pager-dots/PagerDots.vue";
        <PagerDots pattern="group" />`,
        constants: `export const CONTROL_SELECTOR = "button, a, input, textarea, select, [role=button]";`,
        index: `export { useDeck } from "./composables/useDeck";`,
        pagerWindow: `export function pagerWindow(total, activeIndex, fit) { return { shown: [], clippedStart: false, clippedEnd: false }; }`,
        pagerDots: `import { pagerWindow } from "./pagerWindow";
        pattern?: "tabs" | "group";
        :role="pattern === 'group' ? 'group' : 'tablist'"
        :aria-current="pattern === 'group' && i === active ? 'true' : undefined"
        watch(shown, (next) => { if (!el.contains(document.activeElement)) return; void nextTick(() => dotEls.get(active.value)?.focus()); });
        .pager-dot { width: 24px; height: 24px; }`,
        schemeMotion: `--spring-deck: var(--spring-smooth);`,
        subpath: `export * from "../components/custom/deck";`,
        carouselSubpath: `export * from "../carousel";`,
        apiIndex: `export type { DeckCore, DeckMoves } from "../components/custom/deck";`,
        rootBarrel: `export * from "./components/custom/icon-chip";`,
        pkg: `"./deck": { "types": "./dist/deck.d.ts" } "deck": [ "dist/deck.d.ts" ]`,
        dirExists: true,
        readmeExists: true,
        constantsExists: true,
        useDeckExists: true,
        useKeyboardExists: true,
        useSpringExists: true,
        deckPagerExists: true,
        indexExists: true,
        pagerWindowExists: true,
    };
    const baseGreen = detectDeck(good).violations.length === 0;

    const bites = [];
    // Bite A — a /carousel fold reds D1 (caveat i).
    bites.push({
        name: "carousel-fold",
        red:
            detectDeck({
                ...good,
                carouselSubpath: `export * from "../carousel";\nexport * from "../components/custom/deck";`,
            }).violations.length > 0,
    });
    // Bite B — a drifted clamp reds D2.
    bites.push({
        name: "drifted-clamp",
        red:
            detectDeck({
                ...good,
                useDeck: good.useDeck.replace(
                    "Math.max(0, Math.min(total - 1, n))",
                    "Math.min(total, n)",
                ),
            }).violations.length > 0,
    });
    // Bite C — a drifted progress reds D2.
    bites.push({
        name: "drifted-progress",
        red:
            detectDeck({
                ...good,
                useDeck: good.useDeck.replace(
                    "((index.value + 1) / total) * 100",
                    "(index.value / total) * 100",
                ),
            }).violations.length > 0,
    });
    // Bite D — a second pagerWindow definition reds D3.
    bites.push({
        name: "second-pager-window",
        red:
            detectDeck({
                ...good,
                pagerDots:
                    good.pagerDots +
                    "\nfunction pagerWindow(total, activeIndex, fit) { return {}; }",
            }).violations.length > 0,
    });
    // Bite E — a hijack-all Space (drop the focus guard) reds D4.
    bites.push({
        name: "hijack-all-space",
        red:
            detectDeck({
                ...good,
                useKeyboard: good.useKeyboard.replace(
                    `case " ": if (onControl) return false; deck.next();`,
                    `case " ": deck.next();`,
                ),
            }).violations.length > 0,
    });
    // Bite F — --spring-deck minted as its own curve reds D7.
    bites.push({
        name: "spring-deck-own-curve",
        red:
            detectDeck({
                ...good,
                schemeMotion: `--spring-deck: linear(0, 1);`,
            }).violations.length > 0,
    });
    // Bite G — a static keyframes import reds D7 (the SCC-trap re-open).
    bites.push({
        name: "static-keyframes-import",
        red:
            detectDeck({
                ...good,
                useSpring:
                    `import { springTimingFunction } from "@mkbabb/keyframes.js";\n` +
                    good.useSpring,
            }).violations.length > 0,
    });
    // Bite H — a root-barrel re-export reds D1 (off-root fence).
    bites.push({
        name: "on-root-barrel",
        red:
            detectDeck({
                ...good,
                rootBarrel:
                    good.rootBarrel +
                    '\nexport * from "./components/custom/deck";',
            }).violations.length > 0,
    });
    // Bite I — drop the liveMessage announcer reds D6.
    bites.push({
        name: "no-live-message",
        red:
            detectDeck({
                ...good,
                useDeck: good.useDeck.replace(
                    'const liveMessage = computed(() => `Slide ${index.value + 1} of ${total}`);',
                    "",
                ),
            }).violations.length > 0,
    });

    return { baseGreen, bites };
}

function run() {
    const P = cliPaths();
    const inputs = readInputs(P);
    const { facts, violations } = detectDeck(inputs);

    const st = selfTest();
    const biteFailures = st.bites.filter((b) => !b.red).map((b) => b.name);
    if (!st.baseGreen)
        violations.push(
            "D8: the self-test GOOD corpus did not green (detector over-strict)",
        );
    if (biteFailures.length > 0)
        violations.push(`D8: self-test bite(s) did not RED: ${biteFailures.join(", ")}`);
    facts.d8 = {
        baseGreen: st.baseGreen,
        allBite: biteFailures.length === 0,
        bites: st.bites,
    };

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        gate: "proof:deck",
        stamp: snapshotStamp(),
        status,
        facts,
        violations,
    });

    const yn = (b) => (b ? "✓" : "✗");
    console.log(
        "proof:deck — the @mkbabb/glass-ui/deck sibling subpath (BC.W-DECK)",
    );
    console.log(
        `  D1 /deck exists as a SIBLING + publish : ${yn(
            facts.d1.dirExists &&
                facts.d1.readmeExists &&
                facts.d1.useDeckExists &&
                facts.d1.useKeyboardExists &&
                facts.d1.useSpringExists &&
                facts.d1.deckPagerExists &&
                facts.d1.constantsExists &&
                facts.d1.indexExists &&
                facts.d1.subpathMirror &&
                facts.d1.apiPublishes &&
                facts.d1.pkgExport &&
                facts.d1.typesVersions &&
                !facts.d1.carouselFold &&
                !facts.d1.onRootBarrel,
        )}`,
    );
    console.log(
        `  D2 the lift is a MOVE (donor semantics) : ${yn(
            facts.d2.hasClamp && facts.d2.hasProgress && facts.d2.hasMoves,
        )}`,
    );
    console.log(
        `  D3 NO third pagerWindow fork            : ${yn(
            facts.d3.leafDefinesPagerWindow &&
                facts.d3.pagerDotsImportsLeaf &&
                facts.d3.extraDefs === 0,
        )}`,
    );
    console.log(
        `  D4 useDeckKeyboard FOCUS-GUARDED        : ${yn(
            facts.d4.hasControlSelector &&
                facts.d4.spaceGuarded &&
                facts.d4.digitGuarded,
        )}`,
    );
    console.log(
        `  D5 <DeckPager> over PagerDots (group)   : ${yn(
            facts.d5.deckPagerComposesPagerDots &&
                facts.d5.pagerDotsHasPatternAxis &&
                facts.d5.pagerDotsEmitsGroupRole &&
                facts.d5.pagerDotsEmitsAriaCurrent &&
                facts.d5.focusSurvival &&
                facts.d5.hitTarget,
        )}`,
    );
    console.log(
        `  D6 aria-live announcer seam             : ${yn(facts.d6.hasLiveMessage)}`,
    );
    console.log(
        `  D7 --spring-deck = .smooth (lazy kf)    : ${yn(
            facts.d7.springDeckAlias &&
                !facts.d7.springDeckIsOwnCurve &&
                facts.d7.lazyKfImport &&
                !facts.d7.staticKfImport &&
                facts.d7.consumesSpringTimingFunction,
        )}`,
    );
    console.log(
        `  D8 self-test bites RED                  : ${yn(
            facts.d8.allBite && facts.d8.baseGreen,
        )}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            P.ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
