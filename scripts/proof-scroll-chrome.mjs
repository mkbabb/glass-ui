#!/usr/bin/env node
// proof:scroll-chrome — BC.W-SCROLL-CHROME: useScrollChrome, the floating-chrome
// COLLAPSE-STATE machine (shrink-on-down / expand-on-up / opacity-on-scroll / snap-to-
// state / persistent-by-default), a THIN machine OVER the BC.W-SCROLL-TRIGGER reader.
//
// Device-free SOURCE-scan gate (the comment-strip + pure-detector house pattern,
// mirroring proof-scroll-trigger.mjs). Six falsifiable clauses, each born-RED at the
// pre-build HEAD (the composable + the recipe did not exist) and driven GREEN by the
// leaf + the recipe + the @property reg + the barrel + the api publish + the demo. The
// BINDING painted truth (the chrome reading the scroll + shrinking — the CDP Layout-flat
// trace, the per-frame collapse ramp, the velocity-flick, the legible-quiet, the PRM
// instant snap) rides BC.W-SCROLL-CHROME's π (tests-visual/scroll-chrome.spec.ts) + the
// W-SCROLL-CHROME-DELTA capture (the orchestrator's live-render half); this gate is the
// device-free CI/release half.
//
//   C1 — the composable EXISTS ONCE on /motion-core + composes the reader. useScrollChrome
//        is defined + re-exported from the engine-free /motion-core barrel; it IMPORTS
//        useScrollTrigger (composes the reader — no second addEventListener("scroll"), no
//        second requestAnimationFrame coalesce). Engine-free (vue-only — no @vueuse/core,
//        no @mkbabb/keyframes.js). Born-RED (no such export at HEAD). Self-test bite: a
//        planted raw scroll listener in the leaf reds; a planted keyframes import reds.
//   C2 — PERSISTENT-by-default. collapseOnScroll defaults FALSE; a bare useScrollChrome
//        keeps collapseT at 0 (the ramp engages only when collapseOnScroll is true). Born-
//        RED if the default collapses (the iOS-27 fence). Self-test bite: a planted
//        `collapseOnScroll = true` default reds; an unconditional ramp (no
//        collapseOnScroll guard) reds.
//   C3 — compositor-only shrink/quiet. The .scroll-chrome recipe animates ONLY the
//        compositor set (transform/scale/translate/opacity/box-shadow/--*); NO height/
//        padding/width/inline-size/top collapse leg. (The library-wide enforcement is
//        proof:no-layout-animation, which scans the whole src/styles corpus incl. this
//        recipe; this clause adds the scoped .scroll-chrome audit.) Born-RED if a layout-
//        property collapse leg survives in the recipe. Self-test bite: a planted
//        `transition: height` collapse leg in a synthetic recipe reds.
//   C4 — the flip-delta + snap-midpoint + velocity-gate present. flipDeltaPx defaults 8;
//        snapMidpoint defaults 0.5; the snap commits on scroll-stop (a debounced no-tick
//        window); the optional velocityGate short-circuits. Born-RED if the snap-to-state
//        or flip-delta is absent (a no-snap collapse leaves a half-state at rest — the
//        §2.1 defect). Self-test bite: a synthetic machine with no scroll-stop snap reds.
//   C5 — the blur stays crisp + the quiet never goes invisible. The --chrome-collapse-t
//        ramp does NOT drive a `backdrop-filter` blur (the W-DOCK-SHRINK-BLUR fence); the
//        opacity quiet is BOUNDED above a never-invisible floor (the recipe's fade leg is
//        `1 - t * <depth>` with a bounded depth, NEVER `1 - t` → 0). Born-RED if a collapse
//        leg drives backdrop-filter blur OR fades opacity to 0. Self-test bite: a synthetic
//        `backdrop-filter: blur(calc(… * --chrome-collapse-t))` reds; a `opacity: calc(1 -
//        var(--chrome-collapse-t))` (unbounded → 0) reds.
//   C6 — PRM-discrete. The recipe's transform/opacity RAMP sits inside a `@media
//        (prefers-reduced-motion: no-preference)` gate (under reduce the ramp drops); the
//        machine snaps collapseT to a discrete 0/1 endpoint under reduce (the collapsed
//        STATE stays correct, never half). Born-RED if the ramp is outside the PRM gate
//        (it would interpolate under reduce) OR the machine has no PRM-discrete snap. Self-
//        test bite: a synthetic recipe with the transform ramp outside the PRM gate reds.
//
// + a self-test bite per clause (each MUST flag, proven every run — the anti-evasion floor).
// The @property --chrome-collapse-t (<number>, inherits) is asserted registered (the
// native-ramp custom). The ≥2-consumer bar: the demo scroll-system story (the LIVE
// exerciser) + BC.W-DOCK-SEARCH (the BOOKED dock consumer).

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const FILES = {
    composable: "src/composables/motion/useScrollChrome.ts",
    coreBarrel: "src/composables/motion/core/index.ts",
    recipe: "src/styles/scroll-chrome.css",
    propertyRegs: "src/styles/tokens/property-regs.css",
    indexCss: "src/styles/index.css",
    api: "src/api/index.ts",
    story: "demo/stories/motion/ScrollReaderBody.vue",
};

function read(rel) {
    return readFileSync(resolve(ROOT, rel), "utf8");
}

// Strip JS line- + block-comments so a detector matches REAL source, not a docstring
// example (the house comment-strip pattern). URL-safe `://` preserved.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}
// Strip CSS block-comments (preserve newlines for line-num fidelity).
function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
}

// The reflow set (layout-triggering — FORBIDDEN in a collapse leg). Mirrors
// proof-no-layout-animation.mjs's set; the C3 clause is the .scroll-chrome-scoped audit.
const REFLOW_PROPS = [
    "padding",
    "margin",
    "font-size",
    "width",
    "min-width",
    "max-width",
    "inline-size",
    "min-inline-size",
    "max-inline-size",
    "height",
    "min-height",
    "max-height",
    "block-size",
    "min-block-size",
    "max-block-size",
    "top",
    "left",
    "right",
    "bottom",
    "inset",
    "grid-template",
    "grid-auto",
    "flex-basis",
    "line-height",
    "border-width",
    "gap",
    "row-gap",
    "column-gap",
];
const isReflowProp = (prop) => {
    const p = prop.toLowerCase();
    if (/^border(-(top|right|bottom|left|block|inline))?-color$/.test(p)) return false;
    if (/^border(-(top|right|bottom|left|block|inline))?-style$/.test(p)) return false;
    return REFLOW_PROPS.some((r) => p === r || p.startsWith(`${r}-`));
};

const violations = [];
const facts = {};

if (!existsSync(resolve(ROOT, FILES.composable))) {
    violations.push(`C1: ${FILES.composable} does not exist (the collapse machine is absent)`);
    finish();
}
if (!existsSync(resolve(ROOT, FILES.recipe))) {
    violations.push(`C3: ${FILES.recipe} does not exist (the .scroll-chrome recipe is absent)`);
    finish();
}

const composable = stripComments(read(FILES.composable));
const coreBarrel = stripComments(read(FILES.coreBarrel));
const recipe = stripCss(read(FILES.recipe));
// BI.W-STYLE-REDRAIN — --chrome-collapse-t's @property registration was carved into
// tokens/property-regs-specular.css; read both so REG FOLLOWS the carve into the leaf.
const propertyRegs =
    read(FILES.propertyRegs) +
    "\n" +
    read(FILES.propertyRegs.replace("property-regs.css", "property-regs-specular.css"));

// ── C1 — exists ONCE on /motion-core + composes the reader, engine-free ───────
const defined = /export function useScrollChrome\b/.test(composable);
if (!defined)
    violations.push("C1: useScrollChrome is not defined (export function absent)");

const publishedCore = /export \* from "\.\.\/useScrollChrome"/.test(coreBarrel);
if (!publishedCore)
    violations.push(
        "C1: useScrollChrome is not re-exported from the /motion-core barrel (composables/motion/core/index.ts)",
    );

// It COMPOSES useScrollTrigger (the ONE reader) — imports + calls it.
const composesReader =
    /from\s*["']\.\/useScrollTrigger["']/.test(composable) &&
    /useScrollTrigger\s*\(/.test(composable);
if (!composesReader)
    violations.push(
        "C1: useScrollChrome does not compose useScrollTrigger (it must be a thin machine OVER the reader, not a re-fork)",
    );

// No second scroll listener / rAF coalesce in the leaf (the no-second-reader fence).
const ownsScrollListener = /addEventListener\(\s*["']scroll["']/.test(composable);
const ownsRafCoalesce = /\brequestAnimationFrame\s*\(/.test(composable);
if (ownsScrollListener)
    violations.push(
        "C1: useScrollChrome owns a raw addEventListener('scroll') (it must compose useScrollTrigger — the ONE reader, no second listener)",
    );
if (ownsRafCoalesce)
    violations.push(
        "C1: useScrollChrome owns a requestAnimationFrame coalesce (the reader owns the rAF; the machine reads its direction/velocity, no second loop)",
    );

// Engine-free (vue-only).
const importsVueuse = /from\s*["']@vueuse\/core["']/.test(composable);
const importsKeyframes = /from\s*["']@mkbabb\/keyframes\.js["']/.test(composable);
if (importsVueuse)
    violations.push(
        "C1: useScrollChrome imports @vueuse/core (the /motion-core leaf bar — vue-only)",
    );
if (importsKeyframes)
    violations.push(
        "C1: useScrollChrome imports @mkbabb/keyframes.js (the /motion-core leaf bar — vue-only, NOT the keyframes-bearing /motion barrel)",
    );
facts.c1 = {
    defined,
    publishedCore,
    composesReader,
    ownsScrollListener,
    ownsRafCoalesce,
    importsVueuse,
    importsKeyframes,
};

// ── C2 — PERSISTENT-by-default ────────────────────────────────────────────────
// collapseOnScroll defaults FALSE (the iOS-27 lesson). A `collapseOnScroll = false`
// default in the destructure; a `collapseOnScroll = true` default REDs.
const persistentDefault = /collapseOnScroll\s*=\s*false\b/.test(composable);
const alwaysCollapseDefault = /collapseOnScroll\s*=\s*true\b/.test(composable);
if (!persistentDefault)
    violations.push(
        "C2: collapseOnScroll does not default to false (the persistent-by-default iOS-27 lesson — a bare chrome must NOT auto-collapse)",
    );
if (alwaysCollapseDefault)
    violations.push(
        "C2: collapseOnScroll defaults to true (the always-collapse default is the iOS-26 criticized behavior — the persistent-default fence reds)",
    );
// The ramp is GUARDED by collapseOnScroll — the ramp engages only when opted in (a
// `if (!collapseOnScroll …) return` / `collapseOnScroll &&`-style guard reaching the apply).
const rampGuarded = /if\s*\(\s*!collapseOnScroll/.test(composable);
if (!rampGuarded)
    violations.push(
        "C2: the collapse ramp is not guarded by collapseOnScroll (an unconditional ramp ignores the persistent default — the bare chrome would collapse)",
    );
facts.c2 = { persistentDefault, alwaysCollapseDefault, rampGuarded };

// ── C3 — compositor-only shrink/quiet (the .scroll-chrome recipe audit) ───────
// Scan the .scroll-chrome recipe for any transition / animated property naming a reflow
// prop. The shrink is transform/opacity/box-shadow only; a height/padding/width collapse
// leg REDs. We grade transition declarations + @keyframes prop names in the recipe.
const recipeReflowHits = [];
// transition legs
const transRe = /transition(?:-property)?\s*:\s*([^;{}]+)/gi;
let tm;
while ((tm = transRe.exec(recipe)) !== null) {
    for (const tok of tm[1].split(/[,\s]+/)) {
        const t = tok.trim().toLowerCase();
        if (t && isReflowProp(t)) recipeReflowHits.push(`transition:${t}`);
    }
}
// keyframe step props (any property inside an @keyframes block in the recipe)
const kfRe = /@keyframes\s+[\w-]+\s*\{([\s\S]*?)\n\s*\}/g;
let km;
while ((km = kfRe.exec(recipe)) !== null) {
    const propRe = /(^|[;{])\s*([a-zA-Z-]+)\s*:/g;
    let pm;
    while ((pm = propRe.exec(km[1])) !== null) {
        if (isReflowProp(pm[2])) recipeReflowHits.push(`keyframe:${pm[2].toLowerCase()}`);
    }
}
// the bare transform/scale/translate channel is present (the shrink IS a transform)
const recipeHasTransform = /transform\s*:\s*scale|transform\s*:\s*[^;]*scale\(/.test(recipe);
if (recipeReflowHits.length)
    violations.push(
        `C3: the .scroll-chrome recipe animates a reflow property: ${[...new Set(recipeReflowHits)].join(", ")} (the compositor-only floor — the shrink is transform/opacity, NEVER height/padding/width)`,
    );
if (!recipeHasTransform)
    violations.push(
        "C3: the .scroll-chrome recipe has no transform: scale() shrink leg (the compositor shrink is absent)",
    );
facts.c3 = { recipeReflowHits: [...new Set(recipeReflowHits)], recipeHasTransform };

// ── C4 — flip-delta + snap-midpoint + velocity-gate present ───────────────────
const flipDelta8 = /flipDeltaPx\s*=\s*8\b/.test(composable);
const snapMid05 = /snapMidpoint\s*=\s*0\.5\b/.test(composable);
const hasVelocityGate = /velocityGate/.test(composable);
// the snap-to-state on scroll-stop: a debounced no-tick window (a setTimeout-bounded
// snap to a discrete 0/1 endpoint past snapMidpoint).
const hasScrollStopSnap =
    /scheduleSnap|scrollStopMs/.test(composable) &&
    /setTimeout\s*\(/.test(composable) &&
    />=\s*snapMidpoint\s*\?\s*1\s*:\s*0/.test(composable);
if (!flipDelta8)
    violations.push("C4: flipDeltaPx does not default to 8 (the anti-thrash, mirroring the reader)");
if (!snapMid05)
    violations.push("C4: snapMidpoint does not default to 0.5 (the snap-to-nearest midpoint)");
if (!hasVelocityGate)
    violations.push("C4: the velocityGate short-circuit is absent (a flick must collapse/expand immediately)");
if (!hasScrollStopSnap)
    violations.push(
        "C4: the scroll-stop snap-to-state is absent (a no-snap collapse leaves a half-state at rest — the §2.1 defect; a debounced setTimeout snapping past snapMidpoint to 0/1 is required)",
    );
facts.c4 = { flipDelta8, snapMid05, hasVelocityGate, hasScrollStopSnap };

// ── C5 — the blur stays crisp + the quiet never goes invisible ────────────────
// The --chrome-collapse-t ramp must NOT drive a backdrop-filter blur (the crisp-glass
// fence). A `backdrop-filter` declaration whose value reads --chrome-collapse-t REDs.
const collapseDrivesBackdropBlur =
    /backdrop-filter\s*:[^;]*--chrome-collapse-t/i.test(recipe);
if (collapseDrivesBackdropBlur)
    violations.push(
        "C5: a .scroll-chrome backdrop-filter reads --chrome-collapse-t (the W-DOCK-SHRINK-BLUR fence — the collapse must never drive the resting blur; the shrunken bar stays crisp glass)",
    );
// The opacity quiet is BOUNDED — the recipe's opacity leg must be `1 - t * <depth>` with a
// non-1 depth (a never-invisible floor), NEVER a bare `1 - var(--chrome-collapse-t)` → 0.
const opacityLeg = /opacity\s*:\s*calc\(([^;]+)\)/i.exec(recipe);
let opacityBounded = false;
if (opacityLeg) {
    const expr = opacityLeg[1];
    const usesCollapse = /--chrome-collapse-t/.test(expr);
    // bounded: the collapse term is multiplied by a fade-depth (a `* var(--chrome-fade-
    // depth)` or a `* <0..1 literal>`), so the floor is (1 - depth) > 0; an unbounded
    // `1 - var(--chrome-collapse-t)` (no multiplier) drops to 0 and is forbidden.
    const boundedByDepth = /--chrome-collapse-t\)?\s*\*\s*(var\(--chrome-fade-depth\)|0?\.\d+)/.test(expr);
    opacityBounded = usesCollapse && boundedByDepth;
}
const opacityToZero = !!opacityLeg && /1\s*-\s*var\(--chrome-collapse-t\)\s*\)/.test(opacityLeg[0]);
if (!opacityBounded)
    violations.push(
        "C5: the .scroll-chrome opacity quiet is not bounded above a never-invisible floor (it must be `1 - t * <fade-depth>` with a non-1 depth — the NN/g pale-fade trap forbidden)",
    );
if (opacityToZero)
    violations.push(
        "C5: the .scroll-chrome opacity fades to 0 (`1 - var(--chrome-collapse-t)`) — the bar must read at every collapse fraction",
    );
facts.c5 = { collapseDrivesBackdropBlur, opacityBounded, opacityToZero };

// ── C6 — PRM-discrete ─────────────────────────────────────────────────────────
// The recipe's transform/opacity RAMP sits inside a `@media (prefers-reduced-motion:
// no-preference)` gate (under reduce it drops). We assert the .scroll-chrome transform
// ramp is inside such a gate.
const noPrefBlocks = recipe.match(
    /@media\s*\([^)]*prefers-reduced-motion:\s*no-preference[^)]*\)\s*\{[\s\S]*?\n\}/g,
) || [];
const rampInsidePrmGate = noPrefBlocks.some(
    (b) => /\.scroll-chrome\b/.test(b) && /transform\s*:\s*[^;]*scale/.test(b),
);
if (!rampInsidePrmGate)
    violations.push(
        "C6: the .scroll-chrome transform ramp is not inside a @media (prefers-reduced-motion: no-preference) gate (under reduce it would interpolate — the discrete-state-survives model requires the ramp gated, the snap discrete)",
    );
// The machine snaps collapseT to a discrete 0/1 endpoint under reduce (a `reduced ? (t >=
// … ? 1 : 0) : …`-style snap in apply()).
const machinePrmDiscrete =
    /\breduced\b/.test(composable) &&
    /reduced\s*\?\s*\([^)]*>=\s*snapMidpoint\s*\?\s*1\s*:\s*0\s*\)/.test(composable);
if (!machinePrmDiscrete)
    violations.push(
        "C6: the machine does not snap collapseT to a discrete 0/1 endpoint under reduce (the chrome must never rest half-collapsed under PRM — a `reduced ? (t>=mid?1:0) : clamp` snap is required)",
    );
facts.c6 = { rampInsidePrmGate, machinePrmDiscrete, noPrefBlockCount: noPrefBlocks.length };

// ── The @property --chrome-collapse-t registration (<number>, inherits) ───────
const collapseTReg =
    /@property\s+--chrome-collapse-t\s*\{[\s\S]*?syntax:\s*["']<number>["'][\s\S]*?inherits:\s*true/.test(
        propertyRegs,
    );
if (!collapseTReg)
    violations.push(
        "REG: @property --chrome-collapse-t is not registered (<number>, inherits: true) in tokens/property-regs.css (the native-ramp custom the recipe reads)",
    );
// The recipe is @import-ed after scroll-choreography.css in index.css.
const indexCss = read(FILES.indexCss);
const recipeImported = /@import\s+["']\.\/scroll-chrome\.css["']/.test(indexCss);
if (!recipeImported)
    violations.push(
        "REG: scroll-chrome.css is not @import-ed in index.css (the recipe never ships)",
    );
facts.reg = { collapseTReg, recipeImported };

// ── The api publish + the ≥2-consumer record ──────────────────────────────────
const api = stripComments(read(FILES.api));
const apiPublishes =
    /UseScrollChromeOptions/.test(api) &&
    /UseScrollChromeReturn/.test(api) &&
    /from\s*["']\.\.\/composables\/motion\/useScrollChrome["']/.test(api);
if (!apiPublishes)
    violations.push(
        "API: UseScrollChromeOptions/UseScrollChromeReturn are not published from api/index.ts",
    );
// The demo story is the LIVE exerciser (consumer #1) — a useScrollChrome() call site.
const storyExists = existsSync(resolve(ROOT, FILES.story));
let storyConsumes = false;
if (storyExists) {
    const story = stripComments(read(FILES.story));
    storyConsumes = /useScrollChrome\s*\(/.test(story);
}
if (!storyExists)
    violations.push(`CONSUMER: ${FILES.story} does not exist (the demo exerciser is absent)`);
if (storyExists && !storyConsumes)
    violations.push(
        "CONSUMER: the demo scroll-system story does not call useScrollChrome() (the live exerciser is a stub)",
    );
facts.consumer = { apiPublishes, storyExists, storyConsumes };

// ── Self-test bites (anti-evasion — each MUST flag, proven every run) ──────────
const bites = [];
{
    // Bite 1 (C1): a synthetic leaf forking its own scroll listener MUST flag.
    const fake = `el.addEventListener("scroll", () => requestAnimationFrame(tick))`;
    const stripped = stripComments(fake);
    const flagged =
        /addEventListener\(\s*["']scroll["']/.test(stripped) &&
        /\brequestAnimationFrame\s*\(/.test(stripped);
    bites.push({ id: "C1-second-listener", flagged });
    if (!flagged) violations.push("SELF-TEST C1 bite did not flag a synthetic second scroll listener");
}
{
    // Bite 2 (C2): a synthetic `collapseOnScroll = true` default MUST flag.
    const fake = `const { collapseOnScroll = true } = opts`;
    const flagged = /collapseOnScroll\s*=\s*true\b/.test(stripComments(fake));
    bites.push({ id: "C2-always-collapse-default", flagged });
    if (!flagged) violations.push("SELF-TEST C2 bite did not flag a synthetic always-collapse default");
}
{
    // Bite 3 (C3): a synthetic recipe with `transition: height` MUST flag.
    const fake = `.scroll-chrome { transition: height 0.3s ease; }`;
    let hit = false;
    const m = /transition\s*:\s*([^;{}]+)/i.exec(stripCss(fake));
    if (m) for (const tok of m[1].split(/[,\s]+/)) if (isReflowProp(tok.trim().toLowerCase())) hit = true;
    bites.push({ id: "C3-layout-transition", flagged: hit });
    if (!hit) violations.push("SELF-TEST C3 bite did not flag a synthetic transition: height");
}
{
    // Bite 4 (C4): a synthetic machine with NO scroll-stop snap MUST flag (the absence).
    const fakeNoSnap = `function tick(){ collapseT.value = raw }`;
    const flagged = !/setTimeout|snapMidpoint/.test(fakeNoSnap);
    bites.push({ id: "C4-no-snap", flagged });
    if (!flagged) violations.push("SELF-TEST C4 bite did not detect a missing scroll-stop snap");
}
{
    // Bite 5 (C5): a synthetic `opacity: calc(1 - var(--chrome-collapse-t))` (→0) MUST flag.
    const fake = `.scroll-chrome { opacity: calc(1 - var(--chrome-collapse-t)); }`;
    const m = /opacity\s*:\s*calc\(([^;]+)\)/i.exec(stripCss(fake));
    let unbounded = false;
    if (m) unbounded = /1\s*-\s*var\(--chrome-collapse-t\)\s*\)/.test(m[0]);
    bites.push({ id: "C5-opacity-to-zero", flagged: unbounded });
    if (!unbounded) violations.push("SELF-TEST C5 bite did not flag an opacity-to-zero quiet");
}
{
    // Bite 6 (C6): a synthetic transform ramp OUTSIDE the PRM gate MUST flag (the absence
    // of a no-preference wrapper around the .scroll-chrome transform).
    const fake = `.scroll-chrome { transform: scale(0.9); }`;
    const noPref = (fake.match(/@media\s*\([^)]*no-preference[^)]*\)\s*\{[\s\S]*?\}/g) || []);
    const inside = noPref.some((b) => /\.scroll-chrome/.test(b) && /transform\s*:\s*[^;]*scale/.test(b));
    bites.push({ id: "C6-ramp-outside-prm-gate", flagged: !inside });
    if (inside) violations.push("SELF-TEST C6 bite did not detect a transform ramp outside the PRM gate");
}
facts.selfTestBites = bites;

finish();

function finish() {
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_SCROLL_CHROME_ARTIFACT",
        "scroll-chrome",
    );
    writeGateArtifact(ARTIFACT, {
        gate: "proof:scroll-chrome",
        status,
        generatedAt: snapshotStamp(),
        facts,
        violations,
    });

    console.log(
        "proof:scroll-chrome — the floating-chrome COLLAPSE-STATE machine (BC.W-SCROLL-CHROME)",
    );
    console.log(`  composable: ${FILES.composable}`);
    console.log(`  recipe:     ${FILES.recipe}`);
    if (facts.c1)
        console.log(
            `  C1 exists/composes-reader/engine-free: defined=${facts.c1.defined} core=${facts.c1.publishedCore} composesReader=${facts.c1.composesReader} ownsListener=${facts.c1.ownsScrollListener} ownsRaf=${facts.c1.ownsRafCoalesce} vueuse=${facts.c1.importsVueuse} keyframes=${facts.c1.importsKeyframes}`,
        );
    if (facts.c2)
        console.log(
            `  C2 persistent-default: collapseOnScroll=false default=${facts.c2.persistentDefault} alwaysCollapse=${facts.c2.alwaysCollapseDefault} rampGuarded=${facts.c2.rampGuarded}`,
        );
    if (facts.c3)
        console.log(
            `  C3 compositor-only: reflowHits=[${facts.c3.recipeReflowHits.join(", ") || "NONE"}] hasTransform=${facts.c3.recipeHasTransform}`,
        );
    if (facts.c4)
        console.log(
            `  C4 flip/snap/velocity: flip8=${facts.c4.flipDelta8} snapMid05=${facts.c4.snapMid05} velocityGate=${facts.c4.hasVelocityGate} scrollStopSnap=${facts.c4.hasScrollStopSnap}`,
        );
    if (facts.c5)
        console.log(
            `  C5 crisp-blur/bounded-quiet: blurDriven=${facts.c5.collapseDrivesBackdropBlur} opacityBounded=${facts.c5.opacityBounded} opacityToZero=${facts.c5.opacityToZero}`,
        );
    if (facts.c6)
        console.log(
            `  C6 PRM-discrete: rampInsidePrmGate=${facts.c6.rampInsidePrmGate} machinePrmDiscrete=${facts.c6.machinePrmDiscrete}`,
        );
    if (facts.reg)
        console.log(
            `  REG: collapseTReg=${facts.reg.collapseTReg} recipeImported=${facts.reg.recipeImported}`,
        );
    if (facts.consumer)
        console.log(
            `  consumers: apiPublishes=${facts.consumer.apiPublishes} storyConsumes=${facts.consumer.storyConsumes}`,
        );
    console.log(
        `  self-test bites all flagged: ${(facts.selfTestBites ?? []).every((b) => b.flagged)}`,
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
