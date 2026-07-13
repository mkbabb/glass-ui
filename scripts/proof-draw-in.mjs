// proof:draw-in — BI.W-DRAW-IN (UF-G6 / SUFFUSION-MAP R21): the codified self-drawing
// arrival register (`.draw-rule` / `[data-draw-in]`) is the ONE no-overshoot draw-in
// law, and the ad-hoc masthead divider that rode `--ease-cartoon-punch` (+22% overshoot)
// is re-pointed onto it (born-RED → GREEN; device-free SOURCE arm).
//
// The defect (UF-G6): "We should plan to have refined drawing animations — and codify
// this to not be ad-hoc … The draw in animation for the dividing line in the header is a
// bit too bouncy. Needs smoothing." At HEAD the masthead divider (a `.story-hero-
// cluster::after` rule) drew itself on a demo-local `@keyframes chrome-rule-strike`
// riding `--ease-cartoon-punch` — a spring that overshoots past 1.0 then springs back.
// A rule drawing ITSELF never overshoots past full width; draw-in is a SPATIAL channel
// on the NO-OVERSHOOT arrival ease `--ease-out-expo`, categorically NOT a spring.
//
// The fix: mint `src/styles/draw-in.css` — `.draw-rule` / `[data-draw-in]` draws via
// `transform: scaleX(0→1)` (or a `clip-path: inset()` wipe) on `--ease-out-expo` at
// `--draw-in-duration = calc(0.52s * var(--motion-tempo))`, PRM-static. Re-point the
// masthead divider onto the shared `draw-rule-in` keyframe on `--ease-out-expo` and
// retire the demo-local `chrome-rule-strike` keyframe + `--ease-cartoon-punch` (clean
// break). CompletionSeal (`--seal-draw` stroke-dashoffset wipe) + HandMark (`draw-on`)
// are recorded as register MEMBERS (own recipes, not re-authored).
//
// THIS DEVICE-FREE SOURCE ARM proves the STRUCTURE. The π arm (the W-DRAW-IN-DELTA
// frame-series) proves the RENDER this gate cannot: the divider draws in NO-OVERSHOOT,
// the scaleX 0→1 arriving on the expo deceleration, Chrome/Safari, both modes.
//
// It asserts (D1–D6 + self-test):
//   D1 — `.draw-rule` exists ONCE (draw-in.css), rides `--ease-out-expo`, and carries
//        NO `--spring-*` token on the draw leg (draw-in is NOT a spring).
//   D2 — compositor-only: every draw keyframe animates ONLY scaleX/clip-path (transform
//        + clip-path), NEVER a reflow property (width/inline-size/height/…).
//   D3 — the ad-hoc divider spring is DEFINITION-ABSENT: the demo-local `chrome-rule-
//        strike` @keyframes is gone AND the divider `::after` strike rides the register
//        (`draw-rule-in` + `--ease-out-expo`) with NO `--ease-cartoon-punch`/`--spring-*`.
//   D4 — ≥2 register members recorded (the divider + CompletionSeal/HandMark) in
//        docs/tranches/BI/audit/W-DRAW-IN-REGISTER.md.
//   D5 — the register ships in `/styles` (`@import "./draw-in.css"` in index.css).
//   D6 — the PRM snap arm: the base rule paints `scaleX(1)` at rest and the draw engages
//        ONLY under `prefers-reduced-motion: no-preference` (snap-to-full under reduce).
//
// Born-RED at HEAD: draw-in.css does not exist; the masthead divider rides
// `chrome-rule-strike` on `--ease-cartoon-punch` (+22% overshoot).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:draw-in";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip CSS `/* */` comments so a prose mention of a class/token/keyframe is NOT a false
// hit — the gate is comment-blind. Preserve newlines.
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

const DRAW_IN_RAW = read("src/styles/draw-in.css");
const DRAW_IN = strip(DRAW_IN_RAW);
const INDEX = strip(read("src/styles/index.css"));
const STORY_HERO = strip(read("demo/chassis/hero/story-hero.css"));
const REGISTER_DOC = read("docs/tranches/BI/audit/W-DRAW-IN-REGISTER.md");

// The reflow (layout-triggering) property set forbidden in a compositor-only draw.
// Property-SCOPED (name + optional longhand + `:`) so a value function like the
// clip-path `inset(…)` basic shape is NOT mistaken for the `inset:` layout shorthand.
const REFLOW_PROPS =
    /\b(width|height|inline-size|block-size|min-inline-size|min-block-size|max-inline-size|max-block-size|top|left|right|bottom|inset|padding|margin|font-size|line-height|gap|flex-basis|grid-template)(?:-[a-z]+)*\s*:/;

// Extract a `@keyframes <name> { … }` body (brace-balanced) from a stylesheet.
const keyframesBody = (css, name) => {
    const re = new RegExp(`@keyframes\\s+${name}\\s*\\{`);
    const m = re.exec(css);
    if (!m) return null;
    let i = m.index + m[0].length;
    let depth = 1;
    const start = i;
    while (i < css.length && depth > 0) {
        const ch = css[i];
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
        i++;
    }
    return css.slice(start, i - 1);
};

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── D1 — `.draw-rule` exists ONCE, rides `--ease-out-expo`, NO `--spring-*` on the draw ──
const hasDrawRuleSelector = /\.draw-rule\b/.test(DRAW_IN);
// The draw legs are the `animation:` declarations inside the register file.
const animLegs = [...DRAW_IN.matchAll(/animation\s*:\s*([^;]+);/g)].map((m) => m[1]);
const everyLegExpo = animLegs.length > 0 && animLegs.every((leg) => /--ease-out-expo/.test(leg));
const noSpringOnDraw = !animLegs.some((leg) => /--spring-/.test(leg));
// It is the ONE home — the register selector must not be re-declared in another css file.
const otherHomes = ["src/styles/utilities.css", "src/styles/animations.css"]
    .map((f) => read(f))
    .filter((c) => /\.draw-rule\s*[,{]/.test(strip(c)));
const oneHome = otherHomes.length === 0;
add(
    "D1-draw-rule-on-expo-not-spring",
    hasDrawRuleSelector && everyLegExpo && noSpringOnDraw && oneHome,
    hasDrawRuleSelector && everyLegExpo && noSpringOnDraw && oneHome
        ? `\`.draw-rule\` exists once in draw-in.css; every draw leg (${animLegs.length}) rides \`--ease-out-expo\` with NO \`--spring-*\` token — draw-in is a SPATIAL channel on the no-overshoot arrival ease, categorically NOT a spring (the codified law)`
        : `D1 FAIL — selector:${hasDrawRuleSelector}, legs:${animLegs.length}, everyLegExpo:${everyLegExpo}, noSpringOnDraw:${noSpringOnDraw}, oneHome:${oneHome}`,
);

// ── D2 — compositor-only: every draw keyframe touches ONLY scaleX/clip-path, no reflow ──
const drawKeyframeNames = [...DRAW_IN.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
const reflowingKeyframes = drawKeyframeNames.filter((n) => {
    const body = keyframesBody(DRAW_IN, n);
    return body != null && REFLOW_PROPS.test(body);
});
// Positive: at least one keyframe drives scaleX or clip-path (the draw is real).
const drawsScaleXOrClip = drawKeyframeNames.some((n) => {
    const body = keyframesBody(DRAW_IN, n) ?? "";
    return /scaleX\s*\(|clip-path\s*:/.test(body);
});
add(
    "D2-compositor-only",
    drawKeyframeNames.length > 0 && reflowingKeyframes.length === 0 && drawsScaleXOrClip,
    drawKeyframeNames.length > 0 && reflowingKeyframes.length === 0 && drawsScaleXOrClip
        ? `the ${drawKeyframeNames.length} draw keyframe(s) (${drawKeyframeNames.join(", ")}) animate ONLY scaleX/clip-path — never a reflow property (proof:no-layout-animation holds by construction)`
        : `D2 FAIL — keyframes:${drawKeyframeNames.length}, reflowing:[${reflowingKeyframes.join(", ")}], drawsScaleX/clip:${drawsScaleXOrClip}`,
);

// ── D3 — the ad-hoc divider spring / `--ease-cartoon-punch` rule-strike DEFINITION-ABSENT ──
const chromeStrikeKeyframeGone = keyframesBody(STORY_HERO, "chrome-rule-strike") == null;
// The divider `::after` strike rule now rides the register keyframe + expo, no cartoon-punch.
// Find the `::after` rule block that carries the entrance `animation:` (the strike).
const dividerBlock = [...STORY_HERO.matchAll(/::after\s*\{([^}]*)\}/g)]
    .map((m) => m[1])
    .find((body) => /animation\s*:\s*draw-rule-|animation\s*:\s*chrome-rule-strike/.test(body));
const dividerRidesRegister =
    dividerBlock != null &&
    /draw-rule-in/.test(dividerBlock) &&
    /--ease-out-expo/.test(dividerBlock) &&
    !/--ease-cartoon-punch/.test(dividerBlock) &&
    !/--spring-/.test(dividerBlock);
// The whole file carries no LIVE `--ease-cartoon-punch` in a draw/animation leg
// (comment-blind — the prose describing the retirement is stripped).
const noCartoonPunchDraw = !/animation\s*:[^;]*--ease-cartoon-punch/.test(STORY_HERO);
add(
    "D3-adhoc-divider-spring-absent",
    chromeStrikeKeyframeGone && dividerRidesRegister && noCartoonPunchDraw,
    chromeStrikeKeyframeGone && dividerRidesRegister && noCartoonPunchDraw
        ? "the demo-local `chrome-rule-strike` keyframe is DEFINITION-ABSENT and the masthead divider `::after` strike rides the register (`draw-rule-in` on `--ease-out-expo`) with NO `--ease-cartoon-punch`/`--spring-*` — the +22% overshoot bounce is gone (UF-G6 closed, clean break)"
        : `D3 FAIL — chromeStrikeKeyframeGone:${chromeStrikeKeyframeGone}, dividerRidesRegister:${dividerRidesRegister} (block found:${dividerBlock != null}), noCartoonPunchDraw:${noCartoonPunchDraw}`,
);

// ── D4 — ≥2 register members recorded (divider + CompletionSeal/HandMark) ────────────
const docHasDivider = /masthead\s+divider/i.test(REGISTER_DOC);
const docHasSeal = /CompletionSeal/.test(REGISTER_DOC);
const docHasHandMark = /HandMark/.test(REGISTER_DOC);
const memberCount = [docHasDivider, docHasSeal, docHasHandMark].filter(Boolean).length;
add(
    "D4-register-members-recorded",
    REGISTER_DOC.length > 0 && docHasDivider && (docHasSeal || docHasHandMark) && memberCount >= 2,
    REGISTER_DOC.length > 0 && docHasDivider && (docHasSeal || docHasHandMark) && memberCount >= 2
        ? `W-DRAW-IN-REGISTER.md records ${memberCount} members (masthead divider + CompletionSeal + HandMark) — the ≥2-consumer evidence that the no-overshoot draw-in law is a shared register, not a one-off`
        : `D4 FAIL — doc:${REGISTER_DOC.length > 0}, divider:${docHasDivider}, seal:${docHasSeal}, handmark:${docHasHandMark}`,
);

// ── D5 — the register ships in `/styles` (index.css @import) ──────────────────────────
const importsDrawIn = /@import\s+["']\.\/draw-in\.css["']/.test(INDEX);
add(
    "D5-register-ships-in-styles",
    importsDrawIn,
    importsDrawIn
        ? "src/styles/index.css `@import`s ./draw-in.css — the register ships in the `/styles` cascade (a consumer's `@import '@mkbabb/glass-ui/styles'` gets `.draw-rule`)"
        : "D5 FAIL — index.css does not @import ./draw-in.css",
);

// ── D6 — the PRM snap arm (static rest, draw gated under no-preference) ────────────────
const baseRestScaleX = /\.draw-rule\s*,[\s\S]{0,80}\[data-draw-in\][\s\S]{0,120}transform\s*:\s*scaleX\(1\)/.test(
    DRAW_IN,
);
// The draw animation lives inside a `prefers-reduced-motion: no-preference` block.
const noPrefBlockM = /@media\s*\(\s*prefers-reduced-motion\s*:\s*no-preference\s*\)\s*\{([\s\S]*)\}/.exec(
    DRAW_IN,
);
const drawGatedUnderNoPreference =
    noPrefBlockM != null && /animation\s*:\s*draw-rule-(in|wipe)/.test(noPrefBlockM[1]);
// The draw legs are NOT outside the no-preference block (no unconditional animation).
const drawLegsOnlyInNoPref =
    (DRAW_IN.match(/animation\s*:\s*draw-rule-(in|wipe)/g) ?? []).length ===
    (noPrefBlockM ? (noPrefBlockM[1].match(/animation\s*:\s*draw-rule-(in|wipe)/g) ?? []).length : 0);
add(
    "D6-prm-snap-static-rest",
    baseRestScaleX && drawGatedUnderNoPreference && drawLegsOnlyInNoPref,
    baseRestScaleX && drawGatedUnderNoPreference && drawLegsOnlyInNoPref
        ? "the base `.draw-rule`/`[data-draw-in]` rule paints `scaleX(1)` at rest and the draw engages ONLY under `prefers-reduced-motion: no-preference` — under reduce the rule reads full-width, zero motion frames (opacity kept, PRM snap-to-full)"
        : `D6 FAIL — baseRestScaleX:${baseRestScaleX}, drawGatedUnderNoPreference:${drawGatedUnderNoPreference}, drawLegsOnlyInNoPref:${drawLegsOnlyInNoPref}`,
);

// ── Self-test bites (anti-evasion) — the distinguishing reds ──────────────────────────
const selfTest = (() => {
    const bites = [];
    // A synthetic spring-riding `.draw-rule` (a `--spring-*` token on the draw leg) REDs D1.
    const springDraw = ".draw-rule { animation: draw-rule-in var(--draw-in-duration) var(--spring-bouncy) both; }";
    const springLegs = [...springDraw.matchAll(/animation\s*:\s*([^;]+);/g)].map((m) => m[1]);
    bites.push({
        id: "bite-spring-draw-flags",
        reds: springLegs.some((leg) => /--spring-/.test(leg)),
    });
    // A synthetic width-animating keyframe REDs D2.
    const widthKf = "@keyframes bad-draw { from { width: 0; } to { width: 100%; } }";
    bites.push({
        id: "bite-width-keyframe-flags",
        reds: REFLOW_PROPS.test(keyframesBody(widthKf, "bad-draw") ?? ""),
    });
    // A synthetic re-added `--ease-cartoon-punch` divider strike REDs D3.
    const cartoonDivider =
        ".x::after { animation: chrome-rule-strike 520ms var(--ease-cartoon-punch) 240ms both; }";
    bites.push({
        id: "bite-cartoon-punch-divider-flags",
        reds: /animation\s*:[^;]*--ease-cartoon-punch/.test(cartoonDivider),
    });
    // The honest register leg (expo, no spring) PASSES D1 (the detector is not hollow).
    const honestLeg = "animation: draw-rule-in var(--draw-in-duration) var(--ease-out-expo) both;";
    bites.push({
        id: "bite-honest-expo-leg-passes",
        reds: /--ease-out-expo/.test(honestLeg) && !/--spring-/.test(honestLeg),
    });
    // The scaleX draw keyframe is compositor-safe (the D2 detector distinguishes it).
    const scaleKf = "@keyframes draw-rule-in { from { transform: scaleX(0); } to { transform: scaleX(1); } }";
    bites.push({
        id: "bite-scalex-keyframe-clean",
        reds: !REFLOW_PROPS.test(keyframesBody(scaleKf, "draw-rule-in") ?? "") &&
            /scaleX/.test(keyframesBody(scaleKf, "draw-rule-in") ?? ""),
    });
    return bites;
})();
const selfTestPasses = selfTest.every((b) => b.reds);
add(
    "self-test-bite",
    selfTestPasses,
    selfTestPasses
        ? `the distinguishing bites all hold: ${selfTest.map((b) => b.id).join(", ")}`
        : `self-test FAIL — a bite did not hold: ${selfTest.filter((b) => !b.reds).map((b) => b.id).join(", ")}`,
);

// ── Report ────────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:draw-in — the codified no-overshoot draw-in register (`.draw-rule`); the ad-hoc bouncy masthead divider re-pointed (BI.W-DRAW-IN / UF-G6)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_DRAW_IN_OUT", "BI-draw-in");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:draw-in",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm (D1 `.draw-rule` once on `--ease-out-expo`, no `--spring-*`; D2 compositor-only scaleX/clip-path; D3 the `chrome-rule-strike`/`--ease-cartoon-punch` ad-hoc divider spring DEFINITION-ABSENT, re-pointed; D4 ≥2 members recorded; D5 ships in /styles; D6 PRM-static; + a 5-bite self-test). The RESOLVED render (the divider draws in NO-OVERSHOOT, the scaleX 0→1 on the expo deceleration, Chrome/Safari both modes) is the W-DRAW-IN-DELTA π, never this gate alone.",
    drawKeyframeNames,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:draw-in] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:draw-in] the no-overshoot draw-in law is codified (`.draw-rule` on `--ease-out-expo`, NOT a spring); the ad-hoc bouncy masthead divider is re-pointed; CompletionSeal + HandMark are recorded members — the π arm binds the no-overshoot render.",
);
