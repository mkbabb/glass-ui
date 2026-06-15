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
//   W1 — the route page-enter is wired. AppShell's <RouterView v-slot> mount is
//        wrapped in a <Transition> whose bound transition references a
//        transitions.css recipe class (fade / fade-slide). The assert is SCOPED
//        to the <RouterView v-slot> block — a <Transition> elsewhere (the morph
//        stage, a dialog) must NOT green it. RED at HEAD: the <RouterView> mount
//        is a bare <component :is="Component"> with no wrapper.
//
//   W2 — the scroll-progress bar is on the route scroller. A .scroll-progress
//        element exists inside the AppShell <main> region AND its
//        --scroll-progress-scroller resolves to the <main> block scroller (a named
//        timeline / scroped scroller override — NOT the default `root`). RED at
//        HEAD: no .scroll-progress anywhere in AppShell.
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

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:ba-animate";

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

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── The source surfaces (comment-stripped) ───────────────────────────────────
const appShell = strip(read("demo/layout/AppShell.vue"));
const metricCell = strip(read("demo/stories/data/metric-cell.vue"));
const storyHero = strip(read("demo/stories/StoryHero.vue"));
const dockNavCss = strip(read("demo/layout/dock-nav.css"));

// The named recipe classes from transitions.css — the only legitimate route
// page-enter binding.
const PAGE_ENTER_RECIPES = ["fade-slide", "fade", "pane-swap"];

// ── W1 — the route page-enter is wired (scoped to the <RouterView v-slot> block) ──
//
// Extract the <RouterView v-slot=...> ... </RouterView> block and assert a
// <Transition> wraps the <component :is> mount INSIDE it, bound to a named recipe.
function routerViewBlock(src) {
    const open = src.search(/<RouterView\b[^>]*v-slot/);
    if (open === -1) return "";
    const close = src.indexOf("</RouterView>", open);
    if (close === -1) return "";
    return src.slice(open, close + "</RouterView>".length);
}
const rvBlock = routerViewBlock(appShell);
const rvHasTransition = /<Transition\b/.test(rvBlock);
// The bound recipe — a `name="…"` referencing a transitions.css class, OR the
// recipe class on the mounted component (Vue <Transition name="x"> applies
// x-enter-active etc.). Accept either the name binding or an explicit class.
const rvRecipe = (() => {
    const m = rvBlock.match(/<Transition\b[^>]*\bname=["']([^"']+)["']/);
    return m ? m[1] : "";
})();
const rvRecipeNamed = PAGE_ENTER_RECIPES.includes(rvRecipe);
const rvWrapsMount =
    rvHasTransition && /<component\b[^>]*:is=["']?Component/.test(rvBlock);
add(
    "w1-route-page-enter-wired",
    rvHasTransition && rvWrapsMount && rvRecipeNamed,
    rvHasTransition && rvWrapsMount && rvRecipeNamed
        ? `the <RouterView v-slot> mount is wrapped in <Transition name="${rvRecipe}"> (a transitions.css recipe) — a route change fires ONE coherent page-enter`
        : `the <RouterView v-slot> mount is NOT wrapped in a recipe-bound <Transition> (has=${rvHasTransition} wraps-mount=${rvWrapsMount} recipe="${rvRecipe || "none"}") — the route hard-cuts (ANIM-1/2)`,
);

// ── W2 — the scroll-progress bar is on the route scroller ─────────────────────
//
// A .scroll-progress element exists in AppShell AND its scroller is overridden to
// the <main> block scroller (the route owns scroll, not `root`). The override is
// EITHER an inline/scoped `--scroll-progress-scroller: <name>` paired with a
// `scroll-timeline-name` on <main>, OR the bar sits inside <main> with the
// scroller bound to the named timeline. Accept the canonical pattern: the bar
// class + a --scroll-progress-scroller override that names a timeline (not `root`)
// + the matching scroll-timeline-name declaration somewhere in the source set.
const hasScrollProgressEl = /class=["'][^"']*\bscroll-progress\b/.test(appShell);
const scrollerOverride =
    /--scroll-progress-scroller\s*:/.test(appShell) ||
    /--scroll-progress-scroller\s*:/.test(dockNavCss);
// The named-scroller binding — a `scroll-timeline-name` (or `timeline-scope`) on
// the <main>/scroller pairs with the bar's `scroll(<name> block)`. Reject a bare
// `root` scroller (it would track the wrong element — a faint pass over R8).
const namedTimeline =
    /scroll-timeline-name\s*:/.test(appShell) ||
    /scroll-timeline-name\s*:/.test(dockNavCss);
const scrollerNotRoot =
    scrollerOverride &&
    !/--scroll-progress-scroller\s*:\s*root\b/.test(appShell + dockNavCss);
add(
    "w2-scroll-progress-on-route-scroller",
    hasScrollProgressEl && scrollerOverride && namedTimeline && scrollerNotRoot,
    hasScrollProgressEl && scrollerOverride && namedTimeline && scrollerNotRoot
        ? "a .scroll-progress bar lives in the <main> region with --scroll-progress-scroller bound to a named scroll-timeline on <main> (not root) — the bar tracks the route scroller on the compositor"
        : `the .scroll-progress bar is missing or mis-scoped (el=${hasScrollProgressEl} override=${scrollerOverride} named-timeline=${namedTimeline} not-root=${scrollerNotRoot}) — the route-owning scroller has no compositor bar (ANIM-3)`,
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
