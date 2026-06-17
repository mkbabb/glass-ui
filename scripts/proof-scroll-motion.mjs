#!/usr/bin/env node
// proof:scroll-motion — BB.W-SCROLL-MOTION: the SOTA scroll-driven CHOREOGRAPHY
// register SOURCE gate (device-free; the comment-strip + pure-detector house
// pattern, mirroring proof-fading-scroll.mjs / proof-no-layout-animation.mjs).
//
// THE CHARGE (the awwwards live-audit's one genuinely-new SOTA element): glass-ui
// owns the native scroll-driven SUBSTRATE (scroll-driven.css `scroll()`/`view()`
// + the `--demo-main-progress` named timeline + the `supportsCssTimeline` harden)
// but composes NONE of the CHOREOGRAPHY — the page-load BUILD, the section
// CASCADE, the scroll-PINNED fixed-stage-advances-time reveals + the smooth-scroll
// register. The award-winners hand-roll these on Lenis+GSAP (a 20-40KB JS dep);
// glass-ui ships the native register (the no-net-dep fence — the platform now ships
// `scroll()`/`view()`/`timeline-scope` natively, off the compositor at 60fps).
//
// THE REGISTER (src/styles/scroll-choreography.css): three recipes on the native
// substrate + the smooth-scroll opt-in, all compositor-only + PRM-carved:
//   .scroll-build   — the route-enter page-build (chrome -> hero -> body, spring-
//                     clocked coupled-fade, @keyframes-on-mount, PRM-snapped).
//   .scroll-cascade — the section cascade (per-child view() timeline, the implicit
//                     stagger [NO setTimeout], the spring-clocked coupled build).
//   .scroll-pin     — the fixed-stage-advances-time scroll-pinned register
//                     (position: sticky stage + a named scroll-timeline/timeline-
//                     scope phase sweep, compositor channels only).
//   .smooth-scroll  — the native scroll-behavior: smooth opt-in (PRM-gated).
//
// SOURCE arm only (S1-S6) — the BINDING painted truth is the π arm
// (tests-visual/scroll-motion.spec.ts + the W-SCROLL-MOTION-DELTA capture: the
// page-build frame-series, the section-cascade scroll-through, the scroll-pinned
// phase sweep, the PRM single-paint/static-layout, BOTH modes), NEVER this gate
// alone (the AZ P-1 source-green/visually-broken close-class). The property-tier
// (compositor-only, no reflow set) is proof:no-layout-animation's; this gate
// asserts the CHOREOGRAPHY-SHAPE (the registers exist, ride the timeline substrate
// + the spring clock, the PRM/no-dep fences). Born-RED at HEAD: no
// scroll-choreography.css, no .scroll-build/.scroll-cascade/.scroll-pin, no
// timeline-scope, no native smooth-scroll register.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:scroll-motion";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// Strip CSS/JS comments so a witness never matches commented-out text.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1"); // URL-safe // strip (clause-7 house idiom)

// ── Sources ──────────────────────────────────────────────────────────────────
const choreoRaw = read("src/styles/scroll-choreography.css");
const choreo = strip(choreoRaw);
const indexCss = strip(read("src/styles/index.css"));
// BB.W-CARVE4 — the §20 PLATFORM MOTION knobs (incl. --scroll-reveal-*/--scroll-build-*/
// --scroll-cascade-*/--scroll-pin-*) carved WHOLE from scale-paper.css into
// tokens/scroll-tokens.css (an adjacent :root{} partial); read both so the
// tokens-minted assert follows the carve.
const scalePaper = strip(
    read("src/styles/tokens/scale-paper.css") +
        "\n" +
        read("src/styles/tokens/scroll-tokens.css"),
);
const pkg = read("package.json"); // raw — the dependency NEGATIVE scan reads the manifest

// The choreography recipe block (the body between the outer PRM/@supports gate).
// The S4 outer-gate clause asserts the recipes are NESTED inside the brackets;
// for the per-recipe channel scans we read the whole sheet (the recipes live
// under the gate, so the sheet body IS the gated register).

// ── Helpers ────────────────────────────────────────────────────────────────────
// The layout-reflow set (the proof:no-layout-animation floor, mirrored here for the
// CHOREOGRAPHY-shape assert — a build/cascade/pin step animating a layout property
// reds; the property-tier enforcement is no-layout-animation's, this is the
// shape-level bite). Matched as a `from`/`to`/`%` keyframe-step PROPERTY or a
// `transition-property:` declaration listing one.
const REFLOW_PROPS = [
    "padding",
    "margin",
    "font-size",
    "width",
    "height",
    "inline-size",
    "block-size",
    "top",
    "left",
    "right",
    "bottom",
    "inset",
    "grid-template",
    "grid-auto",
    "flex-basis",
    "line-height",
    "gap",
];
// A keyframe step that sets a reflow property as `prop:` (allow `min-`/`max-`
// prefixes). We scan inside @keyframes bodies + the recipe transition declarations.
const reflowInKeyframes = (css) => {
    const hits = [];
    const kfRe = /@keyframes\s+[\w-]+\s*\{([\s\S]*?)\}\s*\}/g; // greedy-to-step is fine; we scan the body
    // Simpler + robust: scan every @keyframes ... { ... } body by brace-matching.
    let i = 0;
    while ((i = css.indexOf("@keyframes", i)) !== -1) {
        const open = css.indexOf("{", i);
        if (open === -1) break;
        let depth = 0;
        let j = open;
        for (; j < css.length; j++) {
            if (css[j] === "{") depth++;
            else if (css[j] === "}") {
                depth--;
                if (depth === 0) break;
            }
        }
        const body = css.slice(open + 1, j);
        for (const prop of REFLOW_PROPS) {
            const re = new RegExp(`(?:^|[;{\\s])(?:min-|max-)?${prop}[\\w-]*\\s*:`, "m");
            if (re.test(body)) hits.push(prop);
        }
        i = j + 1;
    }
    void kfRe;
    return [...new Set(hits)];
};

const checks = [];
const facts = {};
const add = (id, pass, detail) => checks.push({ id, pass, detail });

// ════════════════════════════════════════════════════════════════════════════
// S1 — the page-build recipe exists + rides the spring clock + is PRM-carved.
// `.scroll-build` is a route-enter entrance whose SPATIAL (transform) leg rides a
// `--spring-<name>` + the matching `--spring-<name>-duration` (P2/P4), COUPLED
// with an opacity leg on the no-overshoot `--ease-out`/`--ease-expo-out` (P3),
// under a PRM carve that drops the transform + keeps the fade (P6).
// ════════════════════════════════════════════════════════════════════════════
const hasScrollBuild = /\.scroll-build\b/.test(choreo);
// The transform leg rides a spring + its matching duration clock.
const buildSpring = /--spring-(snappy|bouncy|smooth|gentle|dock)\b/.test(choreo);
const buildSpringDuration =
    /--spring-(snappy|bouncy|smooth|gentle|dock)-duration\b/.test(choreo);
// The coupled opacity leg on a no-overshoot bezier (--ease-out / --ease-expo-out).
const buildCoupledFade = /--ease-(out|expo-out)\b/.test(choreo);
// The PRM carve — a (prefers-reduced-motion: reduce) block that drops the build.
const buildPrmCarve = /@media[^{]*prefers-reduced-motion:\s*reduce/.test(choreo);
facts.scrollBuild = {
    recipe: hasScrollBuild,
    spring: buildSpring,
    springDuration: buildSpringDuration,
    coupledFade: buildCoupledFade,
    prmCarve: buildPrmCarve,
};
add(
    "s1-page-build-spring-coupled-prm",
    hasScrollBuild &&
        buildSpring &&
        buildSpringDuration &&
        buildCoupledFade &&
        buildPrmCarve,
    `.scroll-build exists (${hasScrollBuild}) + the transform leg rides a --spring-* (${buildSpring}) + its matching --spring-*-duration clock (${buildSpringDuration}) + a coupled opacity leg on --ease-out/--ease-expo-out (${buildCoupledFade}) + a (prefers-reduced-motion: reduce) carve (${buildPrmCarve}) — P2/P3/P4/P6. A build springing the transform on a generic --duration-*, omitting the coupled fade, or with no PRM carve reds.`,
);

// ════════════════════════════════════════════════════════════════════════════
// S2 — the section-cascade rides a timeline + is compositor-only (no setTimeout).
// `.scroll-cascade` rides a view() (or named-scroll()) timeline (the per-child
// implicit stagger — NOT a JS setTimeout cascade) and animates ONLY transform/
// opacity (the no-layout-animation floor it is SUBJECT to).
// ════════════════════════════════════════════════════════════════════════════
const hasScrollCascade = /\.scroll-cascade\b/.test(choreo);
const cascadeTimeline =
    /animation-timeline:\s*view\(/.test(choreo) ||
    /animation-timeline:\s*scroll\(/.test(choreo) ||
    /animation-timeline:\s*--[\w-]+/.test(choreo);
// The coupled transform+opacity build (the orchestrated cascade, not a bare fade).
// The cascade @keyframes must carry BOTH a transform and an opacity step.
const cascadeKfBody = (() => {
    const m = choreoRaw.match(/@keyframes\s+gl-cascade[\w-]*\s*\{([\s\S]*?)\}\s*\}/);
    return m ? m[1] : "";
})();
const cascadeCoupled =
    /(transform|translate)/.test(cascadeKfBody) && /opacity/.test(cascadeKfBody);
// NO setTimeout/setInterval cascade anywhere in the register's CSS (a CSS sheet
// cannot carry one — but the anti-evasion bite reads the whole register for a
// smuggled timer-shaped string + any JS leaf if minted).
const choreoLeaf = strip(read("src/composables/motion/core/useScrollChoreography.ts"));
const noTimerCascade =
    !/setTimeout|setInterval/.test(choreo) && !/setTimeout|setInterval/.test(choreoLeaf);
// No layout property animates in the cascade keyframes.
const cascadeReflow = reflowInKeyframes(choreoRaw).length === 0;
facts.scrollCascade = {
    recipe: hasScrollCascade,
    timeline: cascadeTimeline,
    coupled: cascadeCoupled,
    noTimerCascade,
    noReflow: cascadeReflow,
};
add(
    "s2-cascade-timeline-compositor-no-timer",
    hasScrollCascade &&
        cascadeTimeline &&
        cascadeCoupled &&
        noTimerCascade &&
        cascadeReflow,
    `.scroll-cascade exists (${hasScrollCascade}) + rides a view()/named-scroll() timeline (${cascadeTimeline}) + carries a coupled transform+opacity build (${cascadeCoupled}) + NO setTimeout/setInterval cascade (${noTimerCascade}) + NO layout property in any choreography @keyframes (${cascadeReflow}) — the proof:no-layout-animation floor. A re-introduced timer stagger or a height/padding keyframe reds.`,
);

// ════════════════════════════════════════════════════════════════════════════
// S3 — the scroll-pinned register composes sticky + a named-timeline + compositor.
// `.scroll-pin`/`.scroll-pin-stage` composes position: sticky + a named
// scroll-timeline/timeline-scope (the fixed-stage-scroll-advances-time model) and
// the stage's phase animations are transform/opacity/clip-path ONLY.
// ════════════════════════════════════════════════════════════════════════════
const hasScrollPin = /\.scroll-pin\b/.test(choreo) || /\.scroll-pin-stage\b/.test(choreo);
const pinSticky = /position:\s*sticky/.test(choreo);
const pinTimelineLink =
    /timeline-scope:/.test(choreo) ||
    /scroll-timeline-name:/.test(choreo) ||
    /animation-timeline:\s*--[\w-]+/.test(choreo);
// The pin phase keyframes carry only compositor channels (no reflow — covered by
// S2's whole-sheet reflow scan; here we positively assert a compositor phase channel).
const pinCompositorPhase =
    /(transform|translate|scale|rotate|opacity|clip-path)/.test(choreo);
facts.scrollPin = {
    recipe: hasScrollPin,
    sticky: pinSticky,
    timelineLink: pinTimelineLink,
    compositorPhase: pinCompositorPhase,
};
add(
    "s3-pin-sticky-named-timeline-compositor",
    hasScrollPin && pinSticky && pinTimelineLink && pinCompositorPhase,
    `.scroll-pin/.scroll-pin-stage exists (${hasScrollPin}) + composes position: sticky (${pinSticky}) + a named scroll-timeline/timeline-scope/animation-timeline link (${pinTimelineLink}) + compositor-only phase channels (${pinCompositorPhase}) — the fixed-stage-advances-time model. A static sticky with no timeline link (not a scroll-advanced stage) reds.`,
);

// ════════════════════════════════════════════════════════════════════════════
// S4 — the whole register sits under the PRM + @supports outer-gate.
// Every choreography recipe sits under the @media (prefers-reduced-motion:
// no-preference) + @supports (animation-timeline: …) brackets (the
// scroll-driven.css discipline).
// ════════════════════════════════════════════════════════════════════════════
// Assert: every choreography selector occurrence is preceded (in source order,
// at a shallower brace depth) by the no-preference @media + an @supports
// animation-timeline gate. The robust witness: the sheet opens with the outer
// brackets and the recipe selectors appear AFTER the first
// `@media (prefers-reduced-motion: no-preference)` + `@supports (animation-timeline`.
const hasNoPreferenceGate = /@media[^{]*prefers-reduced-motion:\s*no-preference/.test(
    choreo,
);
const hasSupportsGate = /@supports\s*\([^)]*animation-timeline/.test(choreo);
// The recipe selectors must NOT appear at the top level before the gate opens.
// Find the index of the first no-preference gate and the first recipe selector.
const idxNoPref = choreo.search(/@media[^{]*prefers-reduced-motion:\s*no-preference/);
const idxBuild = choreo.search(/\.scroll-build\b/);
const idxCascade = choreo.search(/\.scroll-cascade\b/);
const idxPin = choreo.search(/\.scroll-pin\b/);
// Each recipe selector appears AFTER the no-preference gate opens (nested under it).
const recipesUnderGate =
    idxNoPref !== -1 &&
    idxBuild > idxNoPref &&
    idxCascade > idxNoPref &&
    idxPin > idxNoPref;
facts.outerGate = {
    noPreferenceGate: hasNoPreferenceGate,
    supportsGate: hasSupportsGate,
    recipesUnderGate,
};
add(
    "s4-outer-prm-supports-gate",
    hasNoPreferenceGate && hasSupportsGate && recipesUnderGate,
    `every choreography recipe sits under the @media (prefers-reduced-motion: no-preference) (${hasNoPreferenceGate}) + @supports (animation-timeline: …) (${hasSupportsGate}) outer brackets, with the .scroll-build/.scroll-cascade/.scroll-pin selectors nested AFTER the gate opens (${recipesUnderGate}) — the scroll-driven.css discipline. A recipe outside the PRM gate (the vestibular floor) reds.`,
);

// ════════════════════════════════════════════════════════════════════════════
// S5 — the smooth-scroll is native + NO scroll dependency is bundled.
// The smooth-scroll register is the native scroll-behavior: smooth (CSS-first,
// PRM-gated) AND package.json carries NO lenis/gsap/locomotive/@studio-freight
// dependency AND no src/demo file imports one or hand-rolls a rAF momentum loop.
// ════════════════════════════════════════════════════════════════════════════
const hasSmoothRegister = /\.smooth-scroll\b/.test(choreo);
const smoothNative = /scroll-behavior:\s*smooth/.test(choreo);
// The smooth-scroll register must sit under a PRM gate (no-preference) — it is in
// the same gated sheet; assert the native register and a PRM gate both present.
const smoothPrmGated = hasNoPreferenceGate; // the whole register sheet is PRM-gated
// The NEGATIVE — no scroll-momentum lib in the manifest.
const DEP_RE = /"(lenis|gsap|locomotive-scroll|@studio-freight\/[\w-]+|@studio-freight\/lenis)"\s*:/;
const depBundled = DEP_RE.test(pkg);
// No src/demo file IMPORTS a scroll lib (the bundled-in-disguise evasion). Grep
// the source trees for an import of one of the forbidden names.
let scrollLibImport = false;
try {
    const { execSync } = await import("node:child_process");
    const grepped = execSync(
        `grep -rinE "from ['\\"](lenis|gsap|locomotive-scroll|@studio-freight)" src demo 2>/dev/null || true`,
        { cwd: ROOT, encoding: "utf8" },
    ).trim();
    scrollLibImport = grepped.length > 0;
} catch {
    scrollLibImport = false;
}
facts.smoothScroll = {
    register: hasSmoothRegister,
    native: smoothNative,
    prmGated: smoothPrmGated,
    depBundled,
    scrollLibImport,
};
add(
    "s5-smooth-scroll-native-no-dep",
    hasSmoothRegister &&
        smoothNative &&
        smoothPrmGated &&
        !depBundled &&
        !scrollLibImport,
    `the .smooth-scroll register exists (${hasSmoothRegister}) + is the native scroll-behavior: smooth (${smoothNative}) + sits under the PRM no-preference gate (${smoothPrmGated}); the NEGATIVE — package.json carries NO lenis/gsap/locomotive/@studio-freight dependency (bundled=${depBundled}) AND no src/demo file imports one (import=${scrollLibImport}) — the no-net-dep fence. A bundled smooth-scroll lib or a hand-rolled rAF momentum loop (Lenis-in-disguise) reds.`,
);

// ════════════════════════════════════════════════════════════════════════════
// S6 — the ≥2-consumer bar. The choreography registers are adopted on ≥2 demo
// surfaces (the .scroll-cascade on the StoryPage section wrap [rides EVERY story
// page] + the .scroll-build on the route-enter + the .scroll-pin on the showcase
// story). The substrate-without-consumer J-invariant-10 floor.
// ════════════════════════════════════════════════════════════════════════════
const REGISTER_RE = /scroll-(build|cascade|pin)\b/;
let consumerFiles = [];
try {
    const { execSync } = await import("node:child_process");
    // Search demo/ templates for the register class (the CSS-class consumers), and
    // src/styles/ for the recipe DEFINITION (excluded — only consumer SITES count).
    const grepped = execSync(
        `grep -rlE "scroll-(build|cascade|pin)" demo 2>/dev/null || true`,
        { cwd: ROOT, encoding: "utf8" },
    ).trim();
    consumerFiles = grepped
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        // A live class consumer, not a prose comment. Strip CSS/JS + HTML comments.
        .filter((p) => {
            const body = strip(read(p)).replace(/<!--[\s\S]*?-->/g, "");
            return REGISTER_RE.test(body);
        });
} catch {
    consumerFiles = [];
}
facts.consumerFiles = consumerFiles;
add(
    "s6-two-consumer-bar",
    consumerFiles.length >= 2,
    `≥2 distinct demo consumer surfaces reference the .scroll-build/.scroll-cascade/.scroll-pin registers (the substrate-without-consumer J-inv-10 floor): ${consumerFiles.length} found${consumerFiles.length ? ` — ${consumerFiles.join(", ")}` : ""}. A register with <2 consumers reds (the visual-load-bearing bar).`,
);

// ── Structural wiring asserts (the register is real + reachable) ────────────────
const importInCascade = /@import\s+["']\.\/scroll-choreography\.css["']/.test(indexCss);
facts.importInCascade = importInCascade;
add(
    "wiring-import-in-cascade",
    importInCascade,
    `scroll-choreography.css is @import-ed in src/styles/index.css (after scroll-driven.css in cascade order) [imported=${importInCascade}]`,
);

const tokensMinted =
    /--scroll-build-/.test(scalePaper) &&
    /--scroll-cascade-/.test(scalePaper) &&
    /--scroll-pin-/.test(scalePaper);
facts.tokensMinted = tokensMinted;
add(
    "wiring-tokens-minted",
    tokensMinted,
    `the --scroll-build-*/--scroll-cascade-*/--scroll-pin-* tokens are minted in tokens/scroll-tokens.css (carved from scale-paper.css at BB.W-CARVE4) beside the existing --scroll-reveal-* knobs [minted=${tokensMinted}]`,
);

const piSpecExists = existsSync(resolve(ROOT, "tests-visual/scroll-motion.spec.ts"));
facts.piSpecExists = piSpecExists;
add(
    "pi-readback-spec-exists",
    piSpecExists,
    "tests-visual/scroll-motion.spec.ts exists (the π — the page-build frame-series, the section-cascade scroll-through, the scroll-pinned phase sweep, the PRM static-layout; the BINDING truth, never this gate alone)",
);

// ── Report ──────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log(
    "proof:scroll-motion — the SOTA scroll-driven choreography register (BB.W-SCROLL-MOTION)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_SCROLL_MOTION_OUT", "BB-scroll-motion");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:scroll-motion",
    command: COMMAND,
    note: "SOURCE arm only (S1-S6) — the PAINTED page-build/cascade/pin truth is the π arm tests-visual/scroll-motion.spec.ts + the W-SCROLL-MOTION-DELTA capture (the frame-series + the PRM single-paint, BOTH modes), never this gate alone (the AZ P-1 close-class fix). The property-tier (compositor-only) is proof:no-layout-animation's; this gate asserts the choreography-SHAPE (the registers exist, ride the timeline substrate + the spring clock, the PRM/no-dep fences). The scroll-pin ships the CSS-only native register under the @supports (timeline-scope) gate with a correct static-layout fallback — no JS leaf, no net dep (the 2026 universal-support decision; the JS fallback leaf is BOOKED only on a material engine-gap reveal per §Triumvirate). Born-RED at HEAD: no scroll-choreography.css, no .scroll-build/.scroll-cascade/.scroll-pin, no timeline-scope, no native smooth-scroll register.",
    facts,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:scroll-motion] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:scroll-motion] the scroll-choreography register holds — .scroll-build (the route-enter page-build, spring-clocked coupled-fade, PRM-snapped), .scroll-cascade (the per-child view()-timeline section cascade, the implicit stagger), .scroll-pin (the position:sticky fixed-stage-advances-time phase sweep on a timeline-scope-linked named timeline), all under the PRM + @supports outer-gate, compositor-only; the native scroll-behavior: smooth opt-in (PRM-gated) with NO Lenis/GSAP/Locomotive dependency (the no-net-dep fence). The π arm proves the painted page-assembles-itself truth.",
);
