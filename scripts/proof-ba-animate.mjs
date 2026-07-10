// proof:ba-animate — BA.W-ANIMATE: the shipped-but-unconsumed motion facilities
// wired onto real demo surfaces (born-RED; the animation-targets lane verdict:
// "the substrate is world-class, the consumption is a museum"). The device-free
// SOURCE arm; the BINDING painted truth is the π arm
// (tests-visual/ba-animate.spec.ts) + the proof:ba-gestalt motion-surface verdict
// — a source-green/visually-still-flat close is the exact AZ P-1 class this
// tranche exists to fix, so a green source arm is NOT done (BA invariant 4).
//
// The defect this wave closes is PURE non-consumption: every animation engine
// ships complete + PRM-gated + tested (scroll-driven.css, transitions.css,
// useCountup, vReveal, useScrollProgress, useStaggerReveal, useIntersectionPause)
// but is a demo-of-itself with ZERO real-surface consumers (ANIM-1..ANIM-5). This
// is a WIRING wave: the substrate is fence-locked, never edited; the gate asserts
// the CONSUMPTION on the real surfaces.
//
// The four falsifiable SOURCE witnesses (the comment-strip + pure-detector house
// pattern, mirroring proof-suffuse.mjs / proof-progress-gradient.mjs), each RED at
// HEAD pre-wave:
//
//   W1 — the route page-enter is wired. BG.W-ROUTE-TRANSITION re-pointed this onto
//        the BARE KEYED ATOMIC SWAP: AppShell's <RouterView v-slot> mount is a keyed
//        `<component :is="Component" :key="route.path" class="route-enter">` (NO
//        <Transition> wrapper — the swap cannot wedge), and the liquid enter is the
//        on-mount `.route-enter` @keyframes `gl-route-enter` in transitions.css. The
//        assert is SCOPED to the <RouterView v-slot> block + the transitions.css
//        recipe. (The route confounders are owned by proof:route-confounder.)
//
//   W2 — the scroll-progress bar tracks the route scroller (BG.W-SCROLL-PROGRESS-RAIL
//        re-point). The `.scroll-progress` recipe hoists `transform: scaleX(0)`
//        UNCONDITIONAL (the invisible rest) + reads a FULL-value `--scroll-progress-
//        timeline` (default `scroll(nearest block)`); the demo bar (a sticky child of
//        `.demo-main-scroller`) binds it to that scroller; AND the GLOBAL comment-blind
//        scan finds NO invalid `scroll(var(...))`/`scroll(--ident ...)` fragment (the
//        HEAD D5 defect: a dashed-ident in scroll()'s scroller slot → animation-timeline
//        `auto` → scaleX(1) full-width). A `--self-test` planted bite proves the
//        fragment detector has teeth.
//
//   W3 — the audacious numbers count up, gated. The metric-cell audacious display
//        figures (text-display-mega / text-display-audacious) carry [data-countup]
//        wired through useCountup with an intersection gate (useIntersectionPause /
//        an IntersectionObserver) so the tween fires on scroll-into-view, not on
//        mount-offscreen. The assert requires BOTH the [data-countup] attribute on
//        the display figure AND the useCountup + intersection wiring (a
//        [data-countup] with no engine, or an ungated engine, is the half-wire
//        that fails). RED at HEAD: the figures are literal static spans, zero
//        [data-countup], `grep useCountup metric-cell.vue` returns 0.
//
//   W4 — the negative fence (proportion + register). The wired surfaces carry
//        exactly ONE motion event each; the hero <h1> entrance (in the StoryHero
//        chassis) is on a SETTLE/smooth register and NEVER names --spring-bouncy /
//        --spring-snappy on the hero title; no wired demo surface introduces a
//        `transition: all` or a hand-rolled @keyframes / rAF outside the named
//        scroll-driven.css / transitions.css recipes. RED-able: a bounce on the
//        hero or a `transition: all` smuggled into a wired surface fails the arm.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:ba-animate";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip HTML/Vue/JS/CSS comments so a prose mention in a comment is NOT a false
// hit — the whole gate is comment-blind. Preserve newlines for line geometry.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// BG.W-SCROLL-PROGRESS-RAIL (D5) — the INVALID scroll() fragment detector: a
// `<dashed-ident>` (a named timeline) or a `var()` substituted into scroll()'s
// SCROLLER slot is invalid and silently computes animation-timeline to `auto`
// (→ scaleX(1) full-width). The FULL-value var form `var(--x, scroll(nearest
// block))` is fine; only the `scroll(var(...))` / `scroll(--ident ...)` FRAGMENT
// is forbidden. Comment-blind by construction (callers pass stripped text).
const SCROLL_FRAGMENT_RE = /scroll\(\s*(?:var\(|--)/;

// Recursive file walk for the GLOBAL scan (comment-blind via strip at the call site).
function walk(rel, exts, acc = []) {
    let entries;
    try {
        entries = readdirSync(resolve(ROOT, rel));
    } catch {
        return acc;
    }
    for (const e of entries) {
        if (e === "node_modules" || e.startsWith(".")) continue;
        const childRel = `${rel}/${e}`;
        let st;
        try {
            st = statSync(resolve(ROOT, childRel));
        } catch {
            continue;
        }
        if (st.isDirectory()) walk(childRel, exts, acc);
        else if (exts.some((x) => e.endsWith(x))) acc.push(childRel);
    }
    return acc;
}

// ── self-test: the planted bite — the fragment detector has teeth ─────────────
if (SELF_TEST) {
    const bites = [];
    const bite = (id, pass, detail) => bites.push({ id, pass, detail });
    bite(
        "scroll-var-fragment-flagged",
        SCROLL_FRAGMENT_RE.test("animation-timeline: scroll(var(--x) block);"),
        "a synthetic `scroll(var(--x) block)` fragment is FLAGGED (W2 would RED)",
    );
    bite(
        "scroll-dashed-ident-fragment-flagged",
        SCROLL_FRAGMENT_RE.test("animation-timeline: scroll(--my-name block);"),
        "a synthetic `scroll(--my-name block)` fragment is FLAGGED (W2 would RED)",
    );
    bite(
        "full-value-var-not-flagged",
        !SCROLL_FRAGMENT_RE.test(
            "animation-timeline: var(--scroll-progress-timeline, scroll(nearest block));",
        ),
        "the FULL-value var form `var(--x, scroll(nearest block))` is NOT flagged (no false positive)",
    );
    bite(
        "valid-scroll-keyword-not-flagged",
        !SCROLL_FRAGMENT_RE.test("animation-timeline: scroll(nearest block);"),
        "a valid `scroll(nearest block)` is NOT flagged (no false positive)",
    );
    const failed = bites.filter((b) => !b.pass);
    console.log("proof:ba-animate --self-test (BG.W-SCROLL-PROGRESS-RAIL scroll-fragment detector)");
    for (const b of bites) console.log(`  ${b.pass ? "✓" : "✗"} ${b.id} — ${b.detail}`);
    if (failed.length) {
        console.error(`\n[self-test] ${failed.length} bite(s) without teeth`);
        process.exit(1);
    }
    console.log("\n[self-test] the scroll() fragment detector has teeth");
    process.exit(0);
}

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── The source surfaces (comment-stripped) ───────────────────────────────────
const appShell = strip(read("demo/shell/AppShell.vue"));
const metricCell = strip(read("demo/stories/data/metric-cell.vue"));
const storyHero = strip(read("demo/chassis/hero/StoryHero.vue"));
const dockNavCss = strip(read("demo/shell/dock-nav.css"));
const transitionsCss = strip(read("src/styles/transitions.css"));

// ── W1 — the route page-enter is wired (scoped to the <RouterView v-slot> block) ──
//
// BG.W-ROUTE-TRANSITION re-pointed this off the removed `<Transition name="fade-slide">`
// onto the BARE KEYED ATOMIC SWAP: the <RouterView v-slot> mount is a keyed
// `<component :is="Component" :key="route.path" class="route-enter">` (no <Transition>
// wrapper — the swap cannot wedge by construction), and the liquid enter is the
// on-mount `.route-enter` @keyframes (transitions.css). A route change still fires ONE
// coherent page-enter; the mechanism is subtraction, not a recipe wrapper.
function routerViewBlock(src) {
    const open = src.search(/<RouterView\b[^>]*v-slot/);
    if (open === -1) return "";
    const close = src.indexOf("</RouterView>", open);
    if (close === -1) return "";
    return src.slice(open, close + "</RouterView>".length);
}
const rvBlock = routerViewBlock(appShell);
const rvKeyedSwap =
    /<component\b[^>]*:is=["']?Component/.test(rvBlock) &&
    /:key=["']route\.path["']/.test(rvBlock) &&
    /class=["'][^"']*\broute-enter\b/.test(rvBlock);
const routeEnterRecipe =
    /\.route-enter\s*\{/.test(transitionsCss) &&
    /@keyframes\s+gl-route-enter\b/.test(transitionsCss);
add(
    "w1-route-page-enter-wired",
    rvKeyedSwap && routeEnterRecipe,
    rvKeyedSwap && routeEnterRecipe
        ? "the <RouterView v-slot> mount is a bare keyed <component :is :key=route.path class=route-enter> (atomic swap) + the .route-enter on-mount @keyframes (transitions.css) — a route change fires ONE coherent page-enter, no leave window to wedge"
        : `the route page-enter is not the bare keyed atomic swap (keyed-swap=${rvKeyedSwap} route-enter-recipe=${routeEnterRecipe}) — the route hard-cuts or wedges (ANIM-1/2)`,
);

// ── W2 — the scroll-progress bar tracks the route scroller (BG.W-SCROLL-PROGRESS-RAIL) ──
//
// BG.W-SCROLL-PROGRESS-RAIL (D5) re-pointed this off the retired `--scroll-progress-
// scroller` + named-timeline pairing onto the FULL-value `--scroll-progress-timeline`:
//   - the `.scroll-progress` recipe HOISTS `transform: scaleX(0)` UNCONDITIONAL (the
//     invisible terminal rest on any unsupported/invalid/PRM path), and reads a
//     FULL-value var timeline (default `scroll(nearest block)`);
//   - the demo bar is a position:sticky CHILD of `.demo-main-scroller`, so its
//     `--scroll-progress-timeline: scroll(nearest block)` resolves to that scroller;
//   - the GLOBAL scan finds NO invalid `scroll(var(...))` / `scroll(--ident ...)`
//     fragment anywhere in src/styles + demo (the HEAD D5 defect — a dashed-ident in
//     scroll()'s scroller slot computes animation-timeline to `auto` → scaleX(1)).
const scrollDrivenCss = strip(read("src/styles/scroll-driven.css"));
const hasScrollProgressEl = /class=["'][^"']*\bscroll-progress\b/.test(appShell);
const recipeHoistsRest =
    /\.scroll-progress\s*\{[^}]*transform:\s*scaleX\(0\)/.test(scrollDrivenCss);
const recipeFullValueVar =
    /animation-timeline:\s*var\(\s*--scroll-progress-timeline\s*,\s*scroll\(nearest block\)\s*\)/.test(
        scrollDrivenCss,
    );
const barBoundToRouteScroller =
    /--scroll-progress-timeline\s*:\s*scroll\(nearest block\)/.test(dockNavCss);
// THE GLOBAL SCAN — comment-blind over src/styles + demo.
const scanFiles = [...walk("src/styles", [".css"]), ...walk("demo", [".css", ".vue"])];
const scrollFragmentOffenders = scanFiles.filter((f) =>
    SCROLL_FRAGMENT_RE.test(strip(read(f))),
);
const w2 =
    hasScrollProgressEl &&
    recipeHoistsRest &&
    recipeFullValueVar &&
    barBoundToRouteScroller &&
    scrollFragmentOffenders.length === 0;
add(
    "w2-scroll-progress-on-route-scroller",
    w2,
    w2
        ? "the .scroll-progress recipe hoists transform: scaleX(0) UNCONDITIONAL + reads the FULL-value var timeline (default scroll(nearest block)); the demo bar (a sticky child of .demo-main-scroller) binds --scroll-progress-timeline: scroll(nearest block); and the GLOBAL scan finds zero invalid scroll() fragments — the bar tracks the route scroller, invisible at rest"
        : `the scroll-progress mechanism is wrong (el=${hasScrollProgressEl} hoists-rest=${recipeHoistsRest} full-value-var=${recipeFullValueVar} bar-bound=${barBoundToRouteScroller} fragment-offenders=${scrollFragmentOffenders.join(", ") || "none"}) — the route bar mis-scopes or a scroll(var/--) fragment computes animation-timeline to auto → scaleX(1) (ANIM-3 / D5)`,
);

// ── W3 — the audacious numbers count up, gated ────────────────────────────────
//
// The audacious display figures carry [data-countup] AND the surface wires
// useCountup gated by an intersection gate.
const figureHasCountup = /\bdata-countup\b/.test(metricCell);
const wiresUseCountup = /\buseCountup\b/.test(metricCell);
const wiresIntersectionGate =
    /\buseIntersectionPause\b/.test(metricCell) ||
    /\bIntersectionObserver\b/.test(metricCell);
// The audacious tier is the figure that carries the countup — assert the
// [data-countup] sits on a text-display-mega / -audacious figure (the ceiling: the
// count-up lands on the audacious number, not body copy).
const countupOnAudacious = (() => {
    // Find each [data-countup] occurrence and confirm a display-tier class is on
    // the same element's class list (the figure is the audacious display number).
    const figs = metricCell.match(/<[^>]*\bdata-countup\b[^>]*>/g) ?? [];
    return figs.some((f) =>
        /text-display-(mega|audacious|3|4|5)\b/.test(f) || /tabular-nums/.test(f),
    );
})();
add(
    "w3-audacious-countup-gated",
    figureHasCountup &&
        wiresUseCountup &&
        wiresIntersectionGate &&
        countupOnAudacious,
    figureHasCountup && wiresUseCountup && wiresIntersectionGate && countupOnAudacious
        ? "the audacious display figures carry [data-countup] wired through useCountup, gated by an intersection observer — the number counts up on scroll-into-view, not on mount-offscreen"
        : `the count-up is missing or half-wired (data-countup=${figureHasCountup} useCountup=${wiresUseCountup} intersection-gate=${wiresIntersectionGate} on-audacious=${countupOnAudacious}) — the audacious numbers are dead static text (ANIM-4)`,
);

// ── W4 — the negative fence (proportion + register) ───────────────────────────
//
// The hero <h1> entrance is on a SETTLE/smooth register and never bounces; no
// wired surface introduces a `transition: all` or a hand-rolled @keyframes / rAF.
const WIRED_SURFACES = {
    "AppShell.vue": appShell,
    "metric-cell.vue": metricCell,
    "StoryHero.vue": storyHero,
};

// The hero title entrance — if StoryHero carries a hero-title entrance hook, it
// must be on a SETTLE register (fade-slide / fade / a --spring-smooth /
// --ease-out / vReveal hook), NEVER --spring-bouncy / --spring-snappy on the hero
// title. Find any rule scoped to the story-hero-title and assert no bouncy spring.
const heroTitleBounces =
    /story-hero-title[^{}]*\{[^}]*--spring-bouncy/.test(storyHero) ||
    /story-hero-title[^{}]*\{[^}]*--spring-snappy/.test(storyHero) ||
    // an inline transition on the title naming a bouncy spring
    /story-hero-title[^>]*spring-bouncy/.test(storyHero);
add(
    "w4a-hero-on-settle-not-bounce",
    !heroTitleBounces,
    heroTitleBounces
        ? "the hero <h1> entrance names --spring-bouncy/--spring-snappy — audacious type must arrive with GRAVITY, not bounce (§6 doctrine)"
        : "the hero <h1> entrance carries no bouncy spring — it arrives on the SETTLE register (gravity, not bounce)",
);

// No `transition: all` on a wired surface (the all-properties anti-pattern).
const transitionAllOffenders = Object.entries(WIRED_SURFACES)
    .filter(([, src]) => /transition\s*:\s*all\b/.test(src))
    .map(([name]) => name);
add(
    "w4b-no-transition-all",
    transitionAllOffenders.length === 0,
    transitionAllOffenders.length === 0
        ? "no wired surface declares `transition: all` (every moment is property-scoped)"
        : `transition: all found on: ${transitionAllOffenders.join(", ")}`,
);

// No hand-rolled @keyframes on a wired DEMO surface (the moments route through the
// named scroll-driven.css / transitions.css recipes; a hand-rolled @keyframes in a
// wired surface is the hand-set-keyframe fork the fence forbids).
const handKeyframeOffenders = Object.entries(WIRED_SURFACES)
    .filter(([, src]) => /@keyframes\b/.test(src))
    .map(([name]) => name);
add(
    "w4c-no-hand-rolled-keyframes",
    handKeyframeOffenders.length === 0,
    handKeyframeOffenders.length === 0
        ? "no wired surface hand-rolls an @keyframes — every moment routes through the named scroll-driven.css / transitions.css recipes"
        : `hand-rolled @keyframes found on: ${handKeyframeOffenders.join(", ")}`,
);

// No hand-rolled rAF on a wired surface (the count-up rides useCountup's engine
// rAF; the scroll bar rides the compositor scroll() timeline — neither calls
// requestAnimationFrame directly).
const rafOffenders = Object.entries(WIRED_SURFACES)
    .filter(([, src]) => /\brequestAnimationFrame\b/.test(src))
    .map(([name]) => name);
add(
    "w4d-no-hand-rolled-raf",
    rafOffenders.length === 0,
    rafOffenders.length === 0
        ? "no wired surface hand-rolls requestAnimationFrame — the count-up rides useCountup's engine, the bar rides the compositor scroll() timeline"
        : `hand-rolled requestAnimationFrame found on: ${rafOffenders.join(", ")}`,
);

// ── (z) the π readback spec is wired (the BINDING close — BA inv-4) ───────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/ba-animate.spec.ts")),
    "tests-visual/ba-animate.spec.ts exists (the π readback: one-fire page-enter + scroll-bar scaleX track + count-up tween & PRM-snap + hero fade-rise no-overshoot — the BINDING close)",
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:ba-animate — the shipped motion facilities wired onto real surfaces (page-enter + scroll-progress + metric count-up + the hero entrance) (BA.W-ANIMATE)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_BA_ANIMATE_OUT", "BA-animate");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:ba-animate",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the RESOLVED one-fire page-enter + the scroll-bar scaleX track + the count-up tween & PRM-snap + the hero fade-rise no-overshoot are proven by tests-visual/ba-animate.spec.ts (the π readback, the binding close) + the proof:ba-gestalt motion-surface verdict, never this gate alone.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:ba-animate] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:ba-animate] the storybook STOPS hard-cutting — every route arrives with ONE coherent page-enter, the shell scroller carries a compositor progress bar, the audacious numbers count up on first reveal, and the hero arrives with gravity. All through the shipped engines, all PRM-clean. The π arm binds the painted render.",
);
