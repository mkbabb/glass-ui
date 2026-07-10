// proof:motion-demo — AZ.W-MOTION-SUITE: the robust /motion demo + the springs.vue
// local-spring fork kill (born-RED, the DEVICE-FREE source arm).
//
// AY.W-MOTION2 landed the single-source (springPresets.ts / curves.ts / suite.ts) to
// KILL spring-vocabulary drift — but the DEMO still forked it: springs.vue opened a
// local `damped(stiffness, damping)` closed-form with arbitrary 40/12·120/18·90/8·
// 20/10 pairs reaching neither SPRING_PRESETS nor MOTION_CURVES, and the curve
// gallery plotted only 10 MOTION_CURVES (no Sine/Quad/Cubic/Expo/Circ/Back/Bounce/
// Steps), and the motion family read warm-red. This wave makes the /motion section a
// robust demonstration of the FULL motion language and kills the demo-side fork.
//
// THE SPLIT (the W-REGISTER-IOS precedent): this DEVICE-FREE `.mjs` carries the
// deletion-proofs + source-witnesses (run on EVERY runner, `ci`-tagged) — esp.
// FORK-DEAD, the headline drift-guard `proof:motion-suite` CANNOT carry (it greps
// curves.ts only, so the springs.vue demo fork survives it). The π CAPTURE halves
// (the expanded-grid render, the live linear() slider readout, the scroll/VT render,
// the purple color-readback) move to tests-visual/motion-demo.spec.ts (local-only π).
//
// Bites:
//   (1) FORK-DEAD — springs.vue defines NO local `damped(`/closed-form spring solver,
//       IMPORTS SPRING_PRESETS/springPreset/springTimingFunction from the canonical
//       source, and carries NO "Critically damped" mislabel on the smooth register.
//   (2) CURVE-FAMILIES-ALL (source-witness) — the gallery's family taxonomy is the
//       EXACT 10-family EASING_GROUPS set (Standard/Sine/Quad/Cubic/Expo/Circ/Back/
//       Bounce/Steps/Custom, N=10), each driven by a REAL JS twin; Back rides the
//       value.js bezierPresets, Steps the value.js step generators, Bounce the
//       value.js bounce*Ease siblings — imported DIRECTLY from @mkbabb/value.js (the
//       sanctioned twin), never a hand-rolled cubic/step approximation.
//   (3) SPRING-PLAYGROUND (source-witness) — springs.vue hosts a live response/ζ
//       playground feeding springTimingFunction + reading springLinearStops.
//   (4) SCROLL-VT-DEMO (source-witness) — a /motion story consumes scroll-driven.css
//       recipes + useViewTransition's startViewTransition + a supportsCssTimeline badge.
//   (5) FOUNDATIONS-DEDUP — foundations/motion.vue no longer renders the 10-curve
//       fake-hint-SVG table; the fake quarter-ellipse `path d` constants are DELETED.
//   (6) PURPLE-IDENTITY (source-witness) — --motion-accent is minted DEMO-LOCAL onto
//       var(--viz-legendre); the plots/dots/spring block read it; ppmycota does NOT
//       appear in src/styles/ (presets-in-consumers).
//   (7) PARITY-PRESERVED — proof:motion-suite stays GREEN (a subprocess run).
//   (8) PI-SPEC — tests-visual/motion-demo.spec.ts exists (the binding π half).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:motion-demo";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip JS/TS comments so a prose mention is not a false hit (comment-blind).
const stripJs = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

const SPRINGS = "demo/stories/motion/springs.vue";
const GALLERY = "demo/stories/motion/curve-gallery.vue";
const FAMILIES = "demo/stories/motion/curve-families.ts";
// BB.W-EASING-PRIMITIVE — the C-3 fold LANDED: the two demo editors (BezierEditor +
// StepsEditor) re-home onto the ONE published <EasingPicker> curve-authoring
// primitive (clean break, no alias — the demo SFCs DELETED). The editor source is
// now the published component; the gallery is its #1 binary consumer.
const EASING_PICKER = "src/components/custom/easing/EasingPicker.vue";
const BEZIER_OLD = "demo/stories/motion/curve-gallery/BezierEditor.vue";
const STEPS_OLD = "demo/stories/motion/curve-gallery/StepsEditor.vue";
const SCROLL_VT = "demo/stories/motion/ScrollNativeBody.vue";
const FOUNDATIONS = "demo/stories/foundations/motion.vue";
const DEMO_CSS = "demo/demo.css";

const springsSrc = stripJs(read(SPRINGS));
const gallerySrc = stripJs(read(GALLERY));
const familiesSrc = stripJs(read(FAMILIES));
const easingPickerSrc = stripJs(read(EASING_PICKER));
const scrollVtSrc = stripJs(read(SCROLL_VT));
const foundationsSrc = stripJs(read(FOUNDATIONS));
const demoCssRaw = read(DEMO_CSS);

// ── (1) FORK-DEAD — the headline drift-guard ─────────────────────────────────────
const hasLocalDamped = /\bfunction\s+damped\s*\(/.test(springsSrc) ||
    /\bdamped\s*=\s*\(/.test(springsSrc) ||
    /\bconst\s+damped\b/.test(springsSrc);
add(
    "fork-dead-no-local-damped",
    !hasLocalDamped,
    hasLocalDamped
        ? `RED: ${SPRINGS} still defines a local damped()/closed-form spring solver (the AY.W-MOTION2 single-source fork)`
        : `${SPRINGS} defines NO local damped()/closed-form spring solver`,
);
const importsCanonicalSpring =
    /SPRING_PRESETS/.test(springsSrc) &&
    /springPreset\b/.test(springsSrc) &&
    /springTimingFunction/.test(springsSrc) &&
    /from\s+["'][^"']*\/composables\/motion["']/.test(springsSrc);
add(
    "fork-dead-imports-canonical",
    importsCanonicalSpring,
    importsCanonicalSpring
        ? "springs.vue drives off SPRING_PRESETS + springPreset + springTimingFunction from the canonical /composables/motion source"
        : `RED: ${SPRINGS} does not import SPRING_PRESETS/springPreset/springTimingFunction from the canonical source`,
);
// the arbitrary fork pairs are gone (40/12, 120/18, 90/8, 20/10).
const hasForkPairs = /damped\(\s*40\s*,\s*12|damped\(\s*120\s*,\s*18|damped\(\s*90\s*,\s*8|damped\(\s*20\s*,\s*10/.test(springsSrc);
add(
    "fork-dead-no-arbitrary-pairs",
    !hasForkPairs,
    hasForkPairs
        ? "RED: the arbitrary 40/12·120/18·90/8·20/10 damped() pairs survive"
        : "the arbitrary fork pairs (40/12·120/18·90/8·20/10) are gone",
);
// the mislabel is corrected — the original defect was the blurb
// `fn: damped(40, 12) /* "Critically damped — no overshoot" */` describing the
// SMOOTH register (smooth is ζ=0.86 SETTLE; gentle is the critically-damped row).
// A "critically damped" mention is the mislabel ONLY when it sits within ~120 chars
// of the `smooth` register token (the gentle-row mention is legitimate). The HEAD
// fork's blurb (`smooth: { ... blurb: "Critically damped …" }`) is exactly that.
const mislabelOnSmooth = (() => {
    const re = /critically damped/gi;
    let m;
    while ((m = re.exec(springsSrc)) !== null) {
        const window = springsSrc.slice(Math.max(0, m.index - 120), m.index + 40);
        if (/\bsmooth\b/.test(window)) return true;
    }
    return false;
})();
add(
    "fork-dead-no-mislabel",
    !mislabelOnSmooth,
    mislabelOnSmooth
        ? "RED: a 'Critically damped' blurb survives on the SMOOTH register (smooth is ζ=0.86 SETTLE; gentle is critically-damped)"
        : "no 'Critically damped' mislabel on the smooth register",
);

// ── (2) CURVE-FAMILIES-ALL (source-witness) ──────────────────────────────────────
// the EXACT 10-family EASING_GROUPS set, no "≥ floor" a stub could evade.
const REQUIRED_FAMILIES = [
    "Standard", "Sine", "Quad", "Cubic", "Expo", "Circ", "Back", "Bounce", "Steps", "Custom",
];
// the analytic families ride the data module; Custom is the live bezier editor in
// the gallery. Witness each family name across the gallery + families module.
const galleryAndFamilies = gallerySrc + "\n" + familiesSrc;
const missingFamilies = REQUIRED_FAMILIES.filter((f) => {
    // family literal must appear (the curve-families table OR the gallery Custom branch).
    const re = new RegExp(`["'\\\`]${f}["'\\\`]`);
    return !re.test(galleryAndFamilies);
});
add(
    "curve-families-all-10",
    missingFamilies.length === 0,
    missingFamilies.length === 0
        ? `the FULL 10-family taxonomy is present (${REQUIRED_FAMILIES.join("/")})`
        : `RED: missing families ${missingFamilies.join(", ")} (the EASING_GROUPS 10-family set is required, not a subset)`,
);
// the Back/Steps/Bounce twins import DIRECTLY from @mkbabb/value.js (the sanctioned
// twin) — bezierPresets (Back), the step generators (Steps), the bounce*Ease
// siblings (Bounce). A hand-rolled cubic/step would be the fork the §6 fence forbids.
const importsValueJsTwins =
    /import\s*\{[\s\S]*?\}\s*from\s*["']@mkbabb\/value\.js["']/.test(familiesSrc) &&
    /bezierPresets/.test(familiesSrc) &&
    /steppedEase/.test(familiesSrc) &&
    /(stepStart|stepEnd)/.test(familiesSrc) &&
    /bounce\w*Ease/.test(familiesSrc);
add(
    "curve-families-real-twins",
    importsValueJsTwins,
    importsValueJsTwins
        ? "Back/Steps/Bounce drive off the value.js bezierPresets + step generators + bounce*Ease siblings (the shipped twins, imported directly)"
        : "RED: the Back/Steps/Bounce twins are not imported from @mkbabb/value.js (the sanctioned twin — a hand-rolled cubic/step is the forbidden fork)",
);
// no fake hint-SVG path constants in the gallery (the real-plot fence).
const galleryHasFakePath = /d=["']M\s*0\s*18\s*[CQ]/.test(gallerySrc);
add(
    "curve-families-no-fake-svg",
    !galleryHasFakePath,
    galleryHasFakePath
        ? "RED: the gallery still carries a fake quarter-ellipse hint-SVG path constant"
        : "the gallery plots real twins (no fake hint-SVG path constant)",
);

// ── (3) SPRING-PLAYGROUND (source-witness) ───────────────────────────────────────
const hasPlayground =
    /springLinearStops/.test(springsSrc) &&
    /(LabeledSlider|Slider)/.test(springsSrc) &&
    /response/i.test(springsSrc) &&
    /dampingFraction|playDamping/.test(springsSrc);
add(
    "spring-playground-live",
    hasPlayground,
    hasPlayground
        ? "springs.vue hosts the response/ζ playground feeding springTimingFunction + reading springLinearStops"
        : "RED: no live spring playground (response/ζ → springLinearStops readout) in springs.vue",
);

// ── (4) SCROLL-VT-DEMO (source-witness) ──────────────────────────────────────────
const hasScrollVt =
    /scroll-progress/.test(scrollVtSrc) &&
    /data-scroll-reveal/.test(scrollVtSrc) &&
    /startViewTransition/.test(scrollVtSrc) &&
    /gl-list-item/.test(scrollVtSrc) &&
    /(supportsScrollTimeline|supportsViewTimeline)/.test(scrollVtSrc);
add(
    "scroll-vt-demo",
    hasScrollVt,
    hasScrollVt
        ? "the scroll-vt story consumes .scroll-progress + [data-scroll-reveal] + startViewTransition + .gl-list-item + the supportsCssTimeline badge"
        : "RED: the scroll/VT story does not consume the full scroll-driven + view-transition facility set",
);

// ── (5) FOUNDATIONS-DEDUP (deletion proof) ───────────────────────────────────────
// the fake quarter-ellipse hint path is deleted; the 10-curve table is folded out.
const foundationsHasFakePath = /d=["']M\s*0\s*18\s*[CQ]/.test(foundationsSrc);
add(
    "foundations-dedup-no-fake-svg",
    !foundationsHasFakePath,
    foundationsHasFakePath
        ? "RED: foundations/motion.vue still renders the fake quarter-ellipse hint-SVG path"
        : "foundations/motion.vue's fake hint-SVG path constants are DELETED",
);
// the 10-curve `cssVar`-table duplicate is gone (no `kind: "cubic" | "spring"` curve
// array driving a play(curve) over a cssVar list).
const foundationsHasCurveTable = /cssVar:\s*["']--/.test(foundationsSrc);
add(
    "foundations-dedup-no-curve-table",
    !foundationsHasCurveTable,
    foundationsHasCurveTable
        ? "RED: foundations/motion.vue still duplicates the curve table (cssVar rows)"
        : "foundations/motion.vue folds the curve table out (it focuses on the Transition grammar)",
);

// ── (6) PURPLE-IDENTITY (source-witness) ─────────────────────────────────────────
// --motion-accent minted DEMO-LOCAL onto var(--viz-legendre).
const accentMinted = /--motion-accent:\s*var\(\s*--viz-legendre\s*\)/.test(demoCssRaw);
add(
    "purple-accent-minted",
    accentMinted,
    accentMinted
        ? "--motion-accent is minted DEMO-LOCAL onto var(--viz-legendre) (the violet twin)"
        : "RED: --motion-accent: var(--viz-legendre) is not minted in demo.css",
);
// the plots/dots/spring block read --motion-accent (no warm-red hsl(--demo-hue) block).
const galleryReadsAccent = /var\(\s*--motion-accent\s*\)/.test(gallerySrc);
const springsReadsAccent = /var\(\s*--motion-accent\s*\)/.test(springsSrc) ||
    /oklch\([^)]*317\.5/.test(springsSrc); // the violet block (same hue family)
const noWarmRedBlock = !/hsl\(\s*var\(\s*--demo-hue/.test(springsSrc);
add(
    "purple-plots-read-accent",
    galleryReadsAccent && springsReadsAccent && noWarmRedBlock,
    galleryReadsAccent && springsReadsAccent && noWarmRedBlock
        ? "the gallery plots/dots + the springs block read --motion-accent / the violet hue (no warm-red hsl(--demo-hue) block)"
        : `RED: the motion family does not read the violet accent (gallery=${galleryReadsAccent}, springs=${springsReadsAccent}, no-red-block=${noWarmRedBlock})`,
);
// ppmycota is DEMO-LOCAL only — it does NOT appear in a src/styles/ RULE
// (presets-in-consumers). The scan STRIPS CSS comments first (the house comment-
// strip pattern): a fence-COMMENT asserting "NO ppmycota/demo hue" (on-glass-fg.css)
// is documentation of the absence, NOT a leak — a raw grep that matched it was the
// comment-blind false positive. A real leak is a ppmycota color/token in a CSS RULE.
const stripCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, " ");
const walkCss = (dir, acc = []) => {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        const p = join(dir, n);
        const st = statSync(p);
        if (st.isDirectory()) walkCss(p, acc);
        else if (/\.css$/.test(n)) acc.push(p);
    }
    return acc;
};
const ppmycotaLeaks = walkCss(resolve(ROOT, "src/styles")).filter((p) =>
    /ppmycota/i.test(stripCss(readFileSync(p, "utf8"))),
);
const ppmycotaInLib = ppmycotaLeaks.length > 0;
add(
    "ppmycota-demo-local-only",
    !ppmycotaInLib,
    ppmycotaInLib
        ? `RED: ppmycota leaked into a src/styles/ CSS RULE (a DEMO-LOCAL keyframes consumer color — presets-in-consumers): ${ppmycotaLeaks
              .map((p) => p.slice(ROOT.length + 1))
              .join(", ")}`
        : "ppmycota does NOT appear in any src/styles/ CSS RULE (comments stripped — it stays demo-local)",
);

// ── (7) PARITY-PRESERVED — proof:motion-suite stays GREEN ────────────────────────
let suiteGreen = false;
let suiteDetail = "";
try {
    execFileSync("node", ["scripts/proof-motion-suite.mjs"], {
        cwd: ROOT,
        stdio: "pipe",
    });
    suiteGreen = true;
    suiteDetail = "proof:motion-suite stays GREEN (the substrate distribution seam is intact)";
} catch (e) {
    suiteGreen = false;
    suiteDetail = `RED: proof:motion-suite failed — this DEMO-consumption wave broke the substrate seam (${String(e).split("\n")[0]})`;
}
add("parity-preserved-motion-suite", suiteGreen, suiteDetail);

// ── (8) PI-SPEC — the binding π half exists ──────────────────────────────────────
const specExists = existsSync(resolve(ROOT, "tests-visual/motion-demo.spec.ts"));
add(
    "pi-spec-exists",
    specExists,
    specExists
        ? "tests-visual/motion-demo.spec.ts exists (the π light+dark capture half — the binding visual truth)"
        : "RED: tests-visual/motion-demo.spec.ts is absent (the π capture half is the binding visual truth)",
);

// ── BEZIER/STEPS EDITOR — the W-EASING-PRIMITIVE C-3 fold (re-homed) ──────────────
// The two demo editors RE-HOME onto the ONE published <EasingPicker> primitive (the
// boundary-law curve editor: curve MATH = value.js, the editor COMPONENT = glass-ui).
// The gate asserts (a) the published primitive EXISTS + is tailwind-first (no raw
// pasted keyframes CSS), (b) the gallery DEMONSTRATES both arms (<EasingPicker
// mode="bezier"> + mode="steps">), (c) the OLD demo BezierEditor/StepsEditor SFCs are
// DELETED (the clean-break deletion proof — no fourth fork survives).
const pickerExists = easingPickerSrc.length > 0;
// raw-paste tell: a scoped <style> block carrying the standalone curve-editor
// selectors pasted verbatim rather than Tailwind utilities + token customs.
const pickerRawPaste =
    /\.easing-curve-canvas\s*\{|\.bezier-path\s*\{|\.control-point\s*\{/.test(
        easingPickerSrc,
    );
// the gallery demonstrates the re-homed primitive in BOTH authoring modes.
const galleryImportsPicker = /\bEasingPicker\b/.test(gallerySrc);
const galleryBezierMode = /<EasingPicker[^>]*mode\s*=\s*["']bezier["']/.test(
    gallerySrc,
);
const galleryStepsMode = /<EasingPicker[^>]*mode\s*=\s*["']steps["']/.test(
    gallerySrc,
);
const galleryDemonstrates =
    galleryImportsPicker && galleryBezierMode && galleryStepsMode;
// the deletion proof — the old demo editor SFCs are GONE (clean break, no alias).
const oldEditorsGone = !existsSync(resolve(ROOT, BEZIER_OLD)) &&
    !existsSync(resolve(ROOT, STEPS_OLD));
const bezierOk =
    pickerExists && !pickerRawPaste && galleryDemonstrates && oldEditorsGone;
add(
    "bezier-editor-tailwind-first",
    bezierOk,
    bezierOk
        ? "the bezier+steps editor re-homed onto the published <EasingPicker> (tailwind-first, no raw pasted curve-editor CSS); the gallery demonstrates BOTH modes; the old demo BezierEditor/StepsEditor SFCs are DELETED (the C-3 fold)"
        : `RED: the re-homed curve editor is not whole (picker-exists=${pickerExists}, no-raw-paste=${!pickerRawPaste}, gallery-demonstrates[import=${galleryImportsPicker} bezier=${galleryBezierMode} steps=${galleryStepsMode}], old-demo-editors-deleted=${oldEditorsGone})`,
);

// ── Report ──────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log("proof:motion-demo — the robust /motion demo + the springs.vue fork kill (AZ.W-MOTION-SUITE, device-free source arm)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_MOTION_DEMO_OUT", "AZ-motion-demo");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:motion-demo",
    command: COMMAND,
    note: "DEVICE-FREE source arm — the deletion-proofs (FORK-DEAD, FOUNDATIONS-DEDUP) + source-witnesses. The painted truth (the expanded grid, the live linear() readout, the scroll/VT render, the purple readback) is proven by tests-visual/motion-demo.spec.ts (the π half).",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:motion-demo] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log("\n[proof:motion-demo] the /motion section is the full motion language — all-families gallery + spring playground + bezier editor + scroll/VT demos + foundations de-dup + the violet identity; the springs.vue local-spring fork is DEAD.");
