#!/usr/bin/env node
// BA.W-HANDMARK — the hand-voice family gate (proof:handmark).
//
// The d6 hand-mark family RE-LANDED on /handmark (the B-1 measure anchors inherited),
// the editorial /underline FOLDED onto HandMark shape="underline" (DEC-8 outcome 1),
// the highlighter's FIVE field deltas ENGAGED, and the natural-underline morphology
// gone PROCEDURAL off the ONE seeded pencil-boil engine fed by the house prng leaf —
// while the structural `.paper-ink-mark` stays deliberately straight.
//
// This is the device-free SOURCE arm. The BINDING painted truth — the highlight
// visibly multiplies against the page behind it, the marks read HAND-made over the
// paper register, the morphology amplitude scales — is tests-visual/handmark.spec.ts
// + the W-HANDMARK-DELTA capture + the proof:ba-gestalt verdict. A source-green/
// visually-broken gap is the AZ P-1 close-class the BA gestalt bar (inv-4) kills.
//
// Six falsifiable witnesses (each born-RED at the fork's inert state by construction):
//
//   W1 — THE FAMILY SHIPS. The handmark dir carries the colocation-shaped family
//        (HandMark.vue + brush/geometry/ink/texture/freehand + composables/useHandMark
//        + constants.ts + README), the index barrel exports HandMark/InkMark/BRUSHES,
//        the /handmark subpath mirror exists, and api/index.ts seats the public types.
//        The B-1 anchor lives (the content-node Range measure in HandMark.vue).
//   W2 — THE FOLD IS CLEAN. GlassUnderline + the custom/underline dir + the /underline
//        subpath mirror are GONE (grep-negative for an IMPORT/USE survivor in src/+
//        demo/, prose mentions of the retirement allowed). api/index.ts no longer
//        exports the GlassUnderline* types.
//   W3 — THE HIGHLIGHTER'S FIVE DELTAS LIVE. The highlighter preset is ribbon:'hull'
//        (b) + a non-zero taper (c) + cap:'square' (d); ink.ts plumbs b.cap onto the
//        emitted InkPath.cap (d); the SFC binds :stroke-linecap and carries NO
//        hardcoded `stroke-linecap: round` (d); the SFC root carries NO
//        `isolation: isolate` (e) so the multiply reaches the page; the highlight
//        geometry seats LOW off HIGHLIGHT_RISE, not the box-middle cy (a).
//   W4 — THE MORPHOLOGY IS NATURAL + SEEDED. geometry.ts carries the procedural
//        naturalUnderlinePoints (scale-relative amplitude via NATURAL_AMP_FRAC,
//        irregular PERIODS_MIN..MAX), routed by the `natural` arm; the SEED RECONCILE
//        holds — glass-ui's handmark code imports `mulberry32` from the HOUSE leaf
//        (utils/prng), NEVER from @mkbabb/pencil-boil (the ONE mulberry32 source).
//   W5 — THE VOICES DIFFER. BRUSHES carries the boil/pencil/crayon trio as DISTINCT
//        rows (the no-op "everything-renders-pen" death) — boil is the procedural
//        clean voice, pencil/crayon distinct grain/weight.
//   W6 — THE THREE-UNDERLINE FENCE. `.paper-ink-mark` stays STRAIGHT (no wobble/
//        feTurbulence/perturb introduced on its register); CLAUDE.md records the
//        three-register fence + the family.
//
// bite: revert the highlighter to ribbon:'stroke' / re-hardcode stroke-linecap:round
// / re-add isolation:isolate / import mulberry32 from pencil-boil / leave a
// GlassUnderline import survivor / wobble .paper-ink-mark → RED.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const ARTIFACT = gateArtifactPath("GLASS_UI_HANDMARK_ARTIFACT", "BA-handmark");
const rd = (p) => (existsSync(resolve(ROOT, p)) ? readFileSync(resolve(ROOT, p), "utf8") : "");

const HM = "src/components/custom/handmark";
const violations = [];
const facts = {};

// ── W1 — the family ships (colocation-shaped) ────────────────────────────────
const w1Files = [
    `${HM}/HandMark.vue`,
    `${HM}/brush.ts`,
    `${HM}/geometry.ts`,
    `${HM}/ink.ts`,
    `${HM}/texture.ts`,
    `${HM}/freehand.ts`,
    `${HM}/constants.ts`,
    `${HM}/composables/useHandMark.ts`,
    `${HM}/index.ts`,
    `${HM}/README.md`,
    "src/subpaths/handmark.ts",
];
const missing = w1Files.filter((f) => !existsSync(resolve(ROOT, f)));
facts.w1MissingFiles = missing;
if (missing.length) violations.push(`W1: missing family files [${missing.join(", ")}]`);

const indexBarrel = rd(`${HM}/index.ts`);
const w1Exports =
    /HandMark/.test(indexBarrel) &&
    /InkMark/.test(indexBarrel) &&
    /BRUSHES/.test(indexBarrel);
facts.w1BarrelExports = w1Exports;
if (!w1Exports) violations.push("W1: index barrel must export HandMark/InkMark/BRUSHES");

const apiIndex = rd("src/api/index.ts");
const w1Api = /HandMarkProps/.test(apiIndex) && /from "\.\.\/components\/custom\/handmark"/.test(apiIndex);
facts.w1ApiSeated = w1Api;
if (!w1Api) violations.push("W1: api/index.ts must seat the HandMark public types");

// the B-1 anchor — the content-node Range measure (not the empty-anchor zero-rect bug).
const sfc = rd(`${HM}/HandMark.vue`);
// comment-stripped SFC for the CSS-rule checks (the prose names the un-walled isolation
// + the dropped hardcoded round — those mentions must not trip the negative asserts).
const sfcNoComments = sfc
    .replace(/\/\*[\s\S]*?\*\//g, "") // CSS / JS block comments
    .replace(/\/\/[^\n]*/g, "") // JS line comments
    .replace(/<!--[\s\S]*?-->/g, ""); // HTML comments
const w1Anchor = /document\.createRange\(\)/.test(sfc) && /setEndAfter/.test(sfc) && /baselineFrac/.test(sfc);
facts.w1B1Anchor = w1Anchor;
if (!w1Anchor) violations.push("W1: the B-1 content-node Range measure anchor must live in HandMark.vue");

// ── W2 — the fold is clean (GlassUnderline / /underline GONE) ────────────────
const underlineDirGone = !existsSync(resolve(ROOT, "src/components/custom/underline"));
const underlineSubpathGone = !existsSync(resolve(ROOT, "src/subpaths/underline.ts"));
facts.w2UnderlineDirGone = underlineDirGone;
facts.w2UnderlineSubpathGone = underlineSubpathGone;
if (!underlineDirGone) violations.push("W2: src/components/custom/underline/ must be DELETED (DEC-8 fold)");
if (!underlineSubpathGone) violations.push("W2: src/subpaths/underline.ts must be DELETED (DEC-8 fold)");

// grep src/+demo/ for an IMPORT/USE survivor (prose mentions of the retirement allowed).
function listFiles(dir, exts) {
    const out = [];
    const walk = (d) => {
        if (!existsSync(d)) return;
        for (const e of readdirSync(d, { withFileTypes: true })) {
            const full = resolve(d, e.name);
            if (e.isDirectory()) walk(full);
            else if (exts.some((x) => e.name.endsWith(x))) out.push(full);
        }
    };
    walk(resolve(ROOT, dir));
    return out;
}
const codeFiles = [...listFiles("src", [".ts", ".vue"]), ...listFiles("demo", [".ts", ".vue"])];
const importSurvivors = [];
for (const f of codeFiles) {
    const src = readFileSync(f, "utf8");
    // a real import of the retired component, OR a <GlassUnderline …> tag usage.
    if (/from\s+["'][^"']*custom\/underline["']/.test(src)) importSurvivors.push(`${f} (import custom/underline)`);
    if (/<GlassUnderline[\s/>]/.test(src)) importSurvivors.push(`${f} (<GlassUnderline> usage)`);
    if (/import\s*\{[^}]*GlassUnderline/.test(src)) importSurvivors.push(`${f} (import GlassUnderline)`);
}
facts.w2ImportSurvivors = importSurvivors;
if (importSurvivors.length) violations.push(`W2: GlassUnderline/underline import/use survivors [${importSurvivors.join("; ")}]`);

const w2ApiClean = !/GlassUnderline/.test(apiIndex.replace(/\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, ""));
facts.w2ApiClean = w2ApiClean;
if (!w2ApiClean) violations.push("W2: api/index.ts must not export the GlassUnderline* types (only prose mentions allowed)");

// ── W3 — the highlighter's five deltas live ──────────────────────────────────
const brush = rd(`${HM}/brush.ts`);
const ink = rd(`${HM}/ink.ts`);
const geometry = rd(`${HM}/geometry.ts`);
const constants = rd(`${HM}/constants.ts`);

// isolate the highlighter preset block — capture through the `cap:` line (the last
// scalar) so the nested `taper: {…}` brace does not truncate the match early.
const hlMatch = brush.match(/highlighter:\s*\{[\s\S]*?cap:\s*"[a-z]+",/);
const hlBlock = hlMatch ? hlMatch[0] : "";
const w3Hull = /ribbon:\s*"hull"/.test(hlBlock); // (b)
const w3Taper = /taper:\s*\{\s*start:\s*([1-9]\d*)/.test(hlBlock) && /end:\s*([1-9]\d*)/.test(hlBlock); // (c)
const w3Cap = /cap:\s*"square"/.test(hlBlock); // (d) preset
facts.w3HullEngaged = w3Hull;
facts.w3TaperNonZero = w3Taper;
facts.w3CapSquarePreset = w3Cap;
if (!w3Hull) violations.push("W3(b): the highlighter preset must be ribbon:'hull'");
if (!w3Taper) violations.push("W3(c): the highlighter preset must carry a non-zero taper (start>0 AND end>0)");
if (!w3Cap) violations.push("W3(d): the highlighter preset must set cap:'square'");

// (d) ink.ts plumbs b.cap onto the emitted InkPath.cap.
const w3InkCap = /cap:\s*b\.cap/.test(ink);
facts.w3InkPlumbsCap = w3InkCap;
if (!w3InkCap) violations.push("W3(d): ink.ts must plumb b.cap onto the emitted InkPath (cap: b.cap)");

// (d) the SFC binds :stroke-linecap from the path cap AND carries NO hardcoded round.
const w3SfcBindsCap = /:stroke-linecap="p\.cap/.test(sfc) || /stroke-linecap.*p\.cap/.test(sfc);
const w3NoHardRound = !/stroke-linecap:\s*round\s*;/.test(sfcNoComments);
facts.w3SfcBindsCap = w3SfcBindsCap;
facts.w3NoHardcodedRound = w3NoHardRound;
if (!w3SfcBindsCap) violations.push("W3(d): HandMark.vue must bind :stroke-linecap from the path cap field");
if (!w3NoHardRound) violations.push("W3(d): HandMark.vue must NOT hardcode `stroke-linecap: round` in the CSS");

// (e) the SFC root carries NO `isolation: isolate` (the multiply un-walled).
const w3NoIsolate = !/isolation:\s*isolate/.test(sfcNoComments);
facts.w3IsolationUnwalled = w3NoIsolate;
if (!w3NoIsolate) violations.push("W3(e): HandMark.vue `.hm` must NOT carry `isolation: isolate` (it walls the multiply off the page)");

// (a) the highlight geometry seats LOW off HIGHLIGHT_RISE (a baseline band), not cy.
const w3LowSeat = /HIGHLIGHT_RISE/.test(geometry) && /HIGHLIGHT_RISE/.test(constants);
facts.w3LowSeat = w3LowSeat;
if (!w3LowSeat) violations.push("W3(a): the highlight band must seat LOW off HIGHLIGHT_RISE (a baseline band, not the box-middle cy)");

// the multiply blend is still wired in the SFC (the data-behind multiply path).
const w3Multiply = /mix-blend-mode:\s*multiply/.test(sfc) && /data-behind/.test(sfc);
facts.w3MultiplyWired = w3Multiply;
if (!w3Multiply) violations.push("W3(e): HandMark.vue must wire the multiply blend on the behind band");

// ── W4 — the morphology is natural + seeded; the seed reconcile holds ─────────
// BD.W-HANDMARK-AUDIT RE-INVENT: `naturalUnderlinePoints` is no longer a seeded sinusoid
// (the period constants NATURAL_AMP_FRAC/PERIODS_MIN/PERIODS_MAX are DELETED — no-legacy).
// The boil voice is now a φ-incommensurate fractal value-noise displacement: scale-relative
// amplitude via NOISE_AMP_FRAC, irregular hump spacing via the NOISE_OCTAVES/NOISE_F0/NOISE_PHI
// octave sum (φ mutually-irrational steps → the sum never closes into a period).
// BG.W-HANDMARK-PERFECT carved the pure value-noise engine into the pencil-boil-FREE
// ./noise leaf (so proof:handmark-audit can strip-import + sample the REAL emitted point-set
// — geometry.ts re-exports it); the NOISE_* constant witnesses now read geometry+noise, and
// the binding spacing-CV discriminator RUNS in proof:handmark-audit (no longer a phantom).
const noise = rd(`${HM}/noise.ts`);
const geomAndNoise = `${geometry}\n${noise}`;
const w4Procedural =
    /naturalUnderlinePoints/.test(geometry) &&
    /NOISE_AMP_FRAC/.test(geomAndNoise) &&
    /NOISE_OCTAVES/.test(geomAndNoise) &&
    /NOISE_PHI/.test(geomAndNoise) &&
    /NOISE_F0/.test(geomAndNoise);
facts.w4Procedural = w4Procedural;
if (!w4Procedural) violations.push("W4: geometry+noise must carry the φ-incommensurate naturalUnderlinePoints (scale-relative amplitude via NOISE_AMP_FRAC + irregular spacing via the NOISE_OCTAVES/NOISE_F0/NOISE_PHI octave sum)");

// the seed reconcile — glass-ui handmark code imports mulberry32 from the HOUSE leaf,
// NEVER from @mkbabb/pencil-boil. Grep every handmark .ts (+ the SFC) for the bad import.
const hmTs = [
    ...listFiles(HM, [".ts"]),
    resolve(ROOT, `${HM}/HandMark.vue`),
];
const badSeedImports = [];
let houseSeedFed = false;
for (const f of hmTs) {
    const src = readFileSync(f, "utf8");
    // a mulberry32 import FROM pencil-boil is the forbidden second source.
    if (/import\s*\{[^}]*\bmulberry32\b[^}]*\}\s*from\s*["']@mkbabb\/pencil-boil["']/.test(src)) {
        badSeedImports.push(f);
    }
    if (/from\s*["'][^"']*utils\/prng["']/.test(src) && /\bmulberry32\b/.test(src)) {
        houseSeedFed = true;
    }
}
facts.w4BadSeedImports = badSeedImports;
facts.w4HouseSeedFed = houseSeedFed;
if (badSeedImports.length) violations.push(`W4: mulberry32 imported FROM @mkbabb/pencil-boil [${badSeedImports.join(", ")}] — the family must seed via the HOUSE leaf`);
if (!houseSeedFed) violations.push("W4: the family must import mulberry32 from the HOUSE prng leaf (utils/prng)");

// ── W5 — the voices differ ───────────────────────────────────────────────────
const w5Voices =
    /\bboil:\s*\{/.test(brush) && /\bpencil:\s*\{/.test(brush) && /\bcrayon:\s*\{/.test(brush);
facts.w5VoicesPresent = w5Voices;
if (!w5Voices) violations.push("W5: BRUSHES must carry the boil/pencil/crayon distinct voices");

// ── W6 — the three-underline fence ───────────────────────────────────────────
// the structural .paper-ink-mark register must stay STRAIGHT (no wobble/feTurbulence/
// perturb introduced on its rule blocks in the surface-axis/segmented-tabs CSS).
const surfaceAxis = rd("src/styles/glass/surface-axis.css");
const segTabs = rd("src/styles/segmented-tabs.css");
const paperMarkBlocks = (surfaceAxis + segTabs);
const w6FenceHeld =
    !/\.paper-ink-mark[^}]*feturbulence/i.test(paperMarkBlocks) &&
    !/\.paper-ink-mark[^}]*perturb/i.test(paperMarkBlocks);
facts.w6FenceHeld = w6FenceHeld;
if (!w6FenceHeld) violations.push("W6: the structural .paper-ink-mark register must stay STRAIGHT (no wobble/feTurbulence/perturb)");

// (BH.B5e: the W6 doc-presence `canonHandmark` sub-check DROPPED — the structural
// fence clause is kept; canon-home authoring rides proof:claude-deletable.)

// ── W7 — the BG.W-HANDMARK-PERFECT engine perfections (+ hull-guard clause) ────
// (b) the hull se-guard: ink.ts guards the hull body on a degenerate near-point
// outline and falls back to a STROKED path (fill→stroke) so a tiny-datum hull mark
// (highlighter/marker/crayon/boil over a 1ch box-mode datum) never emits an empty `d`
// and vanishes. The full-span case stays the filled hull byte-for-byte.
const w7HullGuard =
    /getSvgPathFromStroke\(outline\)/.test(ink) &&
    /outline\.length\s*<\s*4/.test(ink) &&
    /if\s*\(\s*outline\.length\s*<\s*4[\s\S]{0,80}?\)\s*\{[\s\S]{0,220}?stroke:\s*color/.test(ink);
facts.w7HullGuard = w7HullGuard;
if (!w7HullGuard)
    violations.push(
        "W7(b): ink.ts must carry the hull se-guard (outline.length<4 → a stroked fallback, never an empty hull `d`)",
    );

// (a) the aspect-correct viewBox: the SFC derives the marking-space HEIGHT from the
// MEASURED box px-aspect (vbH = VB_W / boxAspect) + binds it into the viewBox, so
// `preserveAspectRatio="none"` scales the text-mode wobble SHAPE uniformly (a short
// word's humps stop crushing flat — the headless-green ruler trap closed).
const w7Aspect =
    /boxAspect/.test(sfc) &&
    /VB_W\s*\/\s*(?:a|boxAspect)/.test(sfc) &&
    /viewBox=.*\$\{\s*vbH\s*\}/.test(sfc);
facts.w7AspectCorrect = w7Aspect;
if (!w7Aspect)
    violations.push(
        "W7(a): HandMark.vue must derive the aspect-correct viewBox (vbH = VB_W / boxAspect from the measured box px-aspect, bound into the viewBox)",
    );

// (c) the amplitude knob: the SFC/core derives the natural excursion from the brush
// `wobble` scalar (NOISE_WOBBLE_REF) with an explicit `amplitude` prop override — no
// 13th brush scalar, default byte-identical.
const w7Amplitude =
    /NOISE_WOBBLE_REF/.test(constants) &&
    /amplitude/.test(rd(`${HM}/types.ts`)) &&
    /wobble\s*\/\s*NOISE_WOBBLE_REF/.test(rd(`${HM}/composables/useHandMark.ts`));
facts.w7AmplitudeKnob = w7Amplitude;
if (!w7Amplitude)
    violations.push(
        "W7(c): the amplitude knob must repurpose the brush `wobble` scalar (NOISE_WOBBLE_REF) with an `amplitude` prop override (default byte-identical)",
    );

// ── verdict ──────────────────────────────────────────────────────────────────
const pass = violations.length === 0;
const result = {
    gate: "proof:handmark",
    pass,
    stamp: snapshotStamp(),
    facts,
    violations,
};
writeGateArtifact(ARTIFACT, result);

const tag = pass ? "PASS" : "FAIL";
console.log(`proof:handmark — ${tag} (${violations.length} violation${violations.length === 1 ? "" : "s"})`);
if (!pass) {
    for (const v of violations) console.log(`  ✗ ${v}`);
    process.exit(1);
}
console.log("  ✓ W1 family ships · W2 fold clean · W3 highlighter five deltas live · W4 morphology natural+seeded · W5 voices differ · W6 fence held · W7 aspect-correct viewBox + hull se-guard + amplitude knob");
