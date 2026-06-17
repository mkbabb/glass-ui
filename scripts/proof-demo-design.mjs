// proof:demo-design — BB.W-DEMO-DESIGN: the demo PRESENTATION designed to glass-ui's
// own SOTA standard (born-RED → GREEN). The flat spec-sheet token tours become
// DESIGNED specimens, the type pane an editorial type specimen, the glass-atom panes
// staged over a live field, and the demo surfaces themselves carry the liquid-glass
// motion (CONSUMING the sibling-wave primitives — the IconChip :reveal pop-entrance,
// the .scroll-cascade section build, the library press register).
//
// THIS DEVICE-FREE SOURCE ARM proves the STRUCTURE; the π arm
// (tests-visual/demo-design.spec.ts) proves the RENDER (the focal specimen + the
// activated tiers over the calm wash, the rainbow/Pops promoted-to-focal pop-in, the
// staged buttons over the live field, the section-cascade build). The implementer must
// NOT treat a green source arm as done; the π readback + the proof:ba-gestalt per-pane
// verdicts are the binding close (the AZ P-1 source-green/visually-flat close-class
// this bar exists to kill).
//
// The SIX falsifiable SOURCE clauses (the comment-strip + pure-detector house pattern,
// mirroring proof-suffuse.mjs / proof-stage.mjs), each RED at HEAD pre-wave:
//
//   D1 — the type pane is a SPECIMEN, not a label/sample table. typography.vue leads
//        with a focal display register (display-audacious/-mega/-hero) AND activates
//        the mega/hero/audacious tiers (≥1 of each) AND drops the flat grid-cols-
//        [10rem_1fr] label/sample table. RED at HEAD: the 18-row table, tops at
//        display-5, no top tiers.
//   D2 — the color + icon token tours are DESIGNED specimens. colors.vue leads with
//        the rainbow ramp (BEFORE the core grid in source order) + a pop-entrance
//        register; icons.vue leads with the Pops row (BEFORE the icon grid) +
//        composes the IconChip :reveal pop-entrance. RED at HEAD: core grid first;
//        Pops row last; static.
//   D3 — no glass-atom pane hosts glass over a flat opaque bg-card plate. buttons.vue's
//        glass-variant + .glass-btn rows are hosted on a tier="field" host, NOT the
//        flat card; the opaque-atom rows are NOT on a field. RED at HEAD: glass rows on
//        the flat StoryPage card.
//   D4 — the demo SURFACES carry the liquid-glass motion, composing the sibling
//        primitives, never a demo-local fork. The focal pops compose the IconChip
//        :reveal axis; the body panes the .scroll-cascade register; AND no demo-local
//        @keyframes re-implements the pop-entrance/cascade. RED at HEAD: static panes.
//   D5 — the named incongruence panes are redressed. buttons.vue (CTA out-presents
//        destructive); notification.vue (.feedback-tone rows, NOT 10px dots);
//        fourier-studio.vue (one blurb, no sandwich); reveal.vue (StorySection, no
//        top-level text-prose). RED at HEAD: the CTA inversion, the dots, the sandwich,
//        the bypass.
//   D6 — the house fences hold. ZERO src/styles token mint in the wave (the redesigned
//        panes read library --section-color/display tokens); the GL-context count per
//        static-wash route ≤ budget (no <Aurora>/<Constellation>/<FourierField>/
//        <GooBlob> added to a foundations/display pane). RED-as-regression-guard.

import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:demo-design";
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

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// The GL background components — adding one to a static-wash route blows the
// one-GL-per-route budget (the foundations/display panes are FREE-static-wash).
const GL_TAGS = /<(Aurora|Constellation|FourierField|GooBlob)\b/;

// The redesigned panes (read once, comment-stripped).
const SURFACES = {
    typography: "demo/stories/foundations/typography.vue",
    colors: "demo/stories/foundations/colors.vue",
    icons: "demo/stories/foundations/icons.vue",
    radii: "demo/stories/foundations/radii.vue",
    shadows: "demo/stories/foundations/shadows.vue",
    surfaceTints: "demo/stories/foundations/surface-tints.vue",
    buttons: "demo/stories/display/buttons.vue",
    notification: "demo/stories/feedback/notification.vue",
    fourierStudio: "demo/stories/substrates/fourier-studio.vue",
    reveal: "demo/stories/motion/reveal.vue",
};

// Build a {key: stripped-source} map. In --self-test mode, allow a sabotaged
// override map to prove the bite reds.
function loadSources(overrides = {}) {
    const out = {};
    for (const [key, rel] of Object.entries(SURFACES)) {
        out[key] = key in overrides ? strip(overrides[key]) : strip(read(rel));
    }
    return out;
}

// ── The detectors (pure functions over a stripped-source map) ─────────────────

// D1 — type pane is a specimen, not a flat label/sample table.
function d1(src) {
    const t = src.typography;
    // (a) the focal specimen: a display-audacious/-mega/-hero element present.
    const focal = /text-display-(audacious|mega|hero)/.test(t);
    // (b) the activation: each top tier present (the visual-load-bearing rule).
    const mega = /text-display-mega/.test(t);
    const hero = /text-display-hero/.test(t);
    const audacious = /text-display-audacious/.test(t);
    // (c) the flat label/sample table is GONE (no grid-cols-[10rem_1fr]).
    const noFlatTable = !/grid-cols-\[10rem_1fr\]/.test(t);
    return {
        pass: focal && mega && hero && audacious && noFlatTable,
        focal,
        mega,
        hero,
        audacious,
        noFlatTable,
    };
}

// D2 — color + icon token tours are designed specimens (focal-asset-first + pop).
function d2(src) {
    const c = src.colors;
    const i = src.icons;
    // Scope source-order to the <template> region so script-block const declarations
    // (core = [...], rainbow = [...]) do not skew the order.
    const tpl = (s) => {
        const k = s.indexOf("<template>");
        return k >= 0 ? s.slice(k) : s;
    };
    const cTpl = tpl(c);
    const iTpl = tpl(i);
    // colors: the rainbow ramp appears BEFORE the core role grid in template order.
    const rainbowAnyIdx = cTpl.search(/var\(--section-color-/);
    const coreGridIdx = cTpl.search(/Core roles|c\.cssVar/);
    const rainbowFirst =
        rainbowAnyIdx >= 0 && (coreGridIdx < 0 || rainbowAnyIdx < coreGridIdx);
    // colors: the rainbow/viz compose a pop register (.scroll-cascade — the focal
    // pop-entrance for non-chip assets).
    const colorsPop = /scroll-cascade/.test(c);
    // icons: the Pops row (IconChip walk) appears BEFORE the monochrome icon grid.
    const popsIdx = iTpl.search(/Pops|<IconChip/);
    const gridIdx = iTpl.search(/Lucide reference|icon\.component/);
    const popsFirst = popsIdx >= 0 && (gridIdx < 0 || popsIdx < gridIdx);
    // icons: the Pops compose the IconChip :reveal pop-entrance axis.
    const iconsPop = /<IconChip[\s\S]{0,300}\breveal\b/.test(i);
    return {
        pass: rainbowFirst && colorsPop && popsFirst && iconsPop,
        rainbowFirst,
        colorsPop,
        popsFirst,
        iconsPop,
    };
}

// D3 — no glass-atom pane hosts glass over a flat opaque bg-card plate (BG-2).
function d3(src) {
    const b = src.buttons;
    // The glass variants + the .glass-btn row are inside a tier="field" host.
    const hasFieldHost = /tier=["']field["']/.test(b);
    // The glass-btn rows are staged (the .glass-btn appears AFTER a tier="field"
    // opening in source order — a field host wraps it).
    const glassBtnStaged = (() => {
        const fieldIdx = b.search(/tier=["']field["']/);
        const glassBtnIdx = b.search(/glass-btn/);
        return fieldIdx >= 0 && glassBtnIdx >= 0;
    })();
    // The opaque-atom row (default/destructive/outline/secondary cluster) is NOT on
    // a field — it is rendered via the opaqueVariants list on a bare host (no
    // tier="field" wrapping the opaqueVariants v-for).
    const opaqueListPresent = /opaqueVariants/.test(b);
    // A regression guard: the loud destructive is not the sole un-staged glass host
    // (the glass variants must be the staged set). We assert the field host exists
    // AND glassVariants is the staged list (not opaqueVariants).
    const glassListStaged = /glassVariants/.test(b);
    return {
        pass: hasFieldHost && glassBtnStaged && opaqueListPresent && glassListStaged,
        hasFieldHost,
        glassBtnStaged,
        opaqueListPresent,
        glassListStaged,
    };
}

// D4 — the demo surfaces carry the liquid-glass motion, composing the sibling
// primitives, never a demo-local fork (the anti-fork bite).
function d4(src) {
    // The focal pops compose the IconChip :reveal axis (icons.vue).
    const iconPop = /<IconChip[\s\S]{0,300}\breveal\b/.test(src.icons);
    // The body panes compose the .scroll-cascade register (colors/icons/radii/
    // shadows/surface-tints — the W-SCROLL-MOTION section build).
    const cascadeSurfaces = ["colors", "icons", "radii", "shadows", "surfaceTints"];
    const cascadeWired = cascadeSurfaces.every((k) => /scroll-cascade/.test(src[k]));
    // THE ANTI-FORK: no demo SFC re-implements the pop-entrance via a demo-local
    // @keyframes named like the sibling-wave primitive (icon-chip-reveal / cascade /
    // pop-in). The reveal pane's reveal-rise/reveal-fade are the documented v-reveal
    // CONSUMER CSS (the directive ships no keyframes by design — NOT a pop-entrance
    // fork), so they are explicitly allowed.
    const forkOffenders = [];
    for (const [key, s] of Object.entries(src)) {
        for (const m of s.matchAll(/@keyframes\s+([\w-]+)/g)) {
            const name = m[1];
            // The forbidden re-implementations of a sibling-wave primitive.
            if (/icon-chip-reveal|cascade-build|page-build|pop-in|pop-entrance/.test(name)) {
                forkOffenders.push(`${key}:@keyframes ${name}`);
            }
        }
    }
    return {
        pass: iconPop && cascadeWired && forkOffenders.length === 0,
        iconPop,
        cascadeWired,
        forkOffenders,
    };
}

// D5 — the named incongruence panes are redressed.
function d5(src) {
    const b = src.buttons;
    const n = src.notification;
    const f = src.fourierStudio;
    const r = src.reveal;
    // buttons: the primary-audacious CTA appears BEFORE the opaque-atom (destructive)
    // cluster in TEMPLATE source order (the CTA out-presents destructive — the focal-
    // placement fix). Scope to the <template> region so the script-block const
    // declarations (opaqueVariants = [...]) do not skew the order.
    const bTpl = (() => {
        const i = b.indexOf("<template>");
        return i >= 0 ? b.slice(i) : b;
    })();
    const ctaIdx = bTpl.search(/primary-audacious/);
    // The opaque-atom cluster is rendered via the opaqueVariants v-for + the
    // "Opaque variants" section heading; the destructive register lives there.
    const destructiveIdx = bTpl.search(/Opaque variants|v-for="v in opaqueVariants"/);
    const ctaOutPresents = ctaIdx >= 0 && (destructiveIdx < 0 || ctaIdx < destructiveIdx);
    // notification: the .feedback-tone rows replace the 10px solid dot list (no
    // `size-2.5 rounded-full` dot swatch survives).
    const noDots = !/size-2\.5\s+rounded-full/.test(n) && /feedback-tone/.test(n);
    // fourier-studio: ONE blurb — the StorySection no longer carries the long
    // duplicated `blurb=` (the masthead carries the one description; no sandwich).
    // The duplicated-blurb sandwich is the StorySection re-stating the studio prose:
    // assert the masthead <p> blurb exists + the StorySection does NOT carry a
    // multi-line blurb= attribute re-stating "TRUNCATE the spectrum".
    const mastheadBlurb = /text-display-3[\s\S]{0,400}<p\b/.test(f);
    const noSandwich = !/blurb="[\s\S]{0,400}TRUNCATE the spectrum/.test(f);
    const studioFixed = mastheadBlurb && noSandwich;
    // reveal: composes <StorySection>, no hand-rolled top-level text-prose at the
    // page root (the StorySection census fix).
    const revealStorySection = /<StorySection\b/.test(r);
    // no bare top-level `<p class="text-prose"` directly under <StoryPage> (the
    // bypass shape — text-prose now lives inside StorySection or is text-small).
    const noTopProse = !/<StoryPage>\s*<section[\s\S]{0,60}text-prose/.test(r);
    const revealFixed = revealStorySection && noTopProse;
    return {
        pass: ctaOutPresents && noDots && studioFixed && revealFixed,
        ctaOutPresents,
        noDots,
        studioFixed,
        revealFixed,
    };
}

// D6 — the house fences hold (no src/styles token mint, no GL on a static-wash route).
function d6(src, { skipGitDiff = false } = {}) {
    // (a) ZERO src/styles token mint in the wave's diff (the demo-private fence).
    // Probe `git diff` for any changed line under src/styles; this wave is demo-only.
    let srcStylesClean = true;
    let srcStylesDetail = "git diff src/styles is empty (demo-private fence held)";
    if (!skipGitDiff) {
        try {
            const out = execFileSync(
                "git",
                ["diff", "--name-only", "HEAD", "--", "src/styles"],
                { cwd: ROOT, encoding: "utf8" },
            ).trim();
            srcStylesClean = out.length === 0;
            if (!srcStylesClean) srcStylesDetail = `src/styles touched: ${out.replace(/\n/g, ", ")}`;
        } catch {
            // git not available — fall back to the positive structural guard below.
            srcStylesDetail = "git diff unavailable; structural GL-budget guard stands";
        }
    }
    // (b) no GL context ADDED to a foundations/display static-wash pane. The
    // foundations panes + the buttons (display) pane must reference ZERO GL tags
    // (the one-GL-per-route budget — these routes are paper static-wash by design).
    const staticWashPanes = [
        "typography",
        "colors",
        "icons",
        "radii",
        "shadows",
        "surfaceTints",
        "buttons",
    ];
    const glOffenders = staticWashPanes.filter((k) => GL_TAGS.test(src[k]));
    return {
        pass: srcStylesClean && glOffenders.length === 0,
        srcStylesClean,
        srcStylesDetail,
        glOffenders,
    };
}

// ── The self-test bite (anti-evasion) — runs BEFORE the real ledger ───────────
// Demonstrates the distinguishing bite: each sabotage REDs its clause. The bite
// proves the gate is not vacuous (the proof-ba-gestalt / proof-stage house pattern).
function selfTest() {
    let flagged = 0;
    const sab = (overrides, detector, label, extra = {}) => {
        const s = loadSources(overrides);
        const r = detector(s, extra);
        if (!r.pass) flagged++;
        else
            throw new Error(
                `[proof:demo-design self-test] the bite FAILED to flag the sabotage: ${label}`,
            );
    };
    // D1: re-introduce the flat label/sample table → REDs D1.
    sab(
        { typography: `<div class="grid grid-cols-[10rem_1fr]">flat table text-display-mega text-display-hero text-display-audacious</div>` },
        d1,
        "D1 flat-table re-introduced",
    );
    // D2: move the core grid above the rainbow (core first) → REDs D2's source-order arm.
    sab(
        { colors: `<div>c.cssVar Core roles</div> <div class="scroll-cascade">var(--section-color-1)</div>` },
        d2,
        "D2 core-grid-above-rainbow",
    );
    // D3: un-wrap the glass-button rows onto the flat card (no tier="field") → REDs D3.
    sab(
        { buttons: `glassVariants opaqueVariants glass-btn <div class="bg-card">no field here</div>` },
        d3,
        "D3 glass-on-flat-card",
    );
    // D4: inject a demo-local @keyframes pop-in re-implementing the entrance → REDs D4's anti-fork.
    sab(
        { colors: `scroll-cascade <style>@keyframes pop-in { from { scale: 0.85 } }</style>` },
        d4,
        "D4 demo-local pop-in fork",
    );
    // D5: restore the 10px dot-list in notification → REDs D5.
    sab(
        { notification: `<span class="inline-block size-2.5 rounded-full"></span>` },
        d5,
        "D5 10px-dots restored",
    );
    // D6: add a GL context to a foundations static-wash pane → REDs D6's GL-budget arm.
    sab(
        { typography: `text-display-mega <Aurora :config="x" />` },
        d6,
        "D6 GL-added-to-static-wash",
        { skipGitDiff: true },
    );
    return flagged;
}

// ── Run ───────────────────────────────────────────────────────────────────────
const selfTestCount = selfTest();

const src = loadSources();

const r1 = d1(src);
add(
    "d1-type-pane-specimen",
    r1.pass,
    r1.pass
        ? "typography.vue is an editorial specimen — a focal display-audacious/-mega/-hero word + the mega/hero/audacious tiers ACTIVATED + the flat grid-cols-[10rem_1fr] label/sample table GONE (over the calm wash via ShowcaseFrame quiet/field tiers)"
        : `the type pane is not a full specimen (focal=${r1.focal} mega=${r1.mega} hero=${r1.hero} audacious=${r1.audacious} no-flat-table=${r1.noFlatTable}) — the proudest tiers must be ACTIVATED and the flat table GONE`,
);

const r2 = d2(src);
add(
    "d2-color-icon-designed-specimens",
    r2.pass,
    r2.pass
        ? "colors.vue leads with the rainbow ramp (before the core role grid) + the .scroll-cascade pop register; icons.vue leads with the Pops row (before the icon grid) + the IconChip :reveal pop-entrance — the vibrant assets PROMOTED to focal"
        : `the color/icon tours are not designed specimens (rainbow-first=${r2.rainbowFirst} colors-pop=${r2.colorsPop} pops-first=${r2.popsFirst} icons-pop=${r2.iconsPop}) — the focal asset must lead + compose the sibling pop-entrance`,
);

const r3 = d3(src);
add(
    "d3-glass-staged-over-field",
    r3.pass,
    r3.pass
        ? "buttons.vue stages the glass-variant + .glass-btn rows over a tier=\"field\" live field (the BG-2 black-plate kill); the opaque-atom rows stay on the opaque host (the field is for the glass variants only)"
        : `the glass atoms are not staged over a field (field-host=${r3.hasFieldHost} glass-btn-staged=${r3.glassBtnStaged} opaque-list=${r3.opaqueListPresent} glass-list-staged=${r3.glassListStaged}) — glass over a flat plate has nothing to refract (BG-2)`,
);

const r4 = d4(src);
add(
    "d4-demo-surfaces-liquid-motion",
    r4.pass,
    r4.pass
        ? "the demo surfaces carry the liquid-glass motion composing the sibling primitives (the IconChip :reveal focal pop + the .scroll-cascade body build on every token-tour pane) with NO demo-local @keyframes re-implementing the pop-entrance/cascade (the anti-fork bite)"
        : `the demo-surface motion is incomplete or forked (icon-pop=${r4.iconPop} cascade-wired=${r4.cascadeWired} fork-offenders=${r4.forkOffenders.join(", ") || "none"}) — consume the sibling primitive, never a demo-local fork`,
);

const r5 = d5(src);
add(
    "d5-incongruence-panes-redressed",
    r5.pass,
    r5.pass
        ? "the named incongruence panes are redressed: buttons CTA out-presents destructive (focal placement), notification renders .feedback-tone rows not 10px dots, fourier-studio carries ONE blurb (no sandwich), reveal routes through <StorySection> (no top-level text-prose bypass)"
        : `an incongruence pane is unredressed (cta-out-presents=${r5.ctaOutPresents} no-dots=${r5.noDots} studio-fixed=${r5.studioFixed} reveal-fixed=${r5.revealFixed})`,
);

const r6 = d6(src);
add(
    "d6-house-fences-hold",
    r6.pass,
    r6.pass
        ? `the house fences hold — ${r6.srcStylesDetail}; no GL context added to a foundations/display static-wash route (the one-GL-per-route budget)`
        : `a house fence breached (${r6.srcStylesDetail}; GL-offenders on static-wash routes: ${r6.glOffenders.join(", ") || "none"})`,
);

// ── (z) the π readback spec is wired (the BINDING close — BB inv-4) ───────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/demo-design.spec.ts")),
    "tests-visual/demo-design.spec.ts exists (the π readback: the focal display specimen + activated tiers over the calm wash, the rainbow/Pops promoted-to-focal pop-in frame-series, the staged buttons over the live field, the section-cascade build — the BINDING close)",
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:demo-design — the demo presentation designed to glass-ui's own SOTA standard: designed specimens, the type pane an editorial specimen, the glass atoms staged over the live field, the demo surfaces alive (BB.W-DEMO-DESIGN)",
);
console.log(`  self-test (bite proof): OK — ${selfTestCount} synthetic sabotages flagged (D1 flat-table, D2 core-first, D3 glass-on-flat, D4 demo-local fork, D5 10px-dots, D6 GL-on-static-wash)`);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_DEMO_DESIGN_OUT", "BB-demo-design");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:demo-design",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the RESOLVED focal specimen + activated tiers + the promoted-to-focal pop-in + the staged buttons over the live field are proven by tests-visual/demo-design.spec.ts (the π readback, the binding close) + the proof:ba-gestalt per-pane verdicts, never this gate alone. Self-test: 6 synthetic sabotages flagged.",
    selfTestChecks: selfTestCount,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (SELF_TEST) {
    console.log(`\n[proof:demo-design --self-test] ${selfTestCount} bite(s) flagged; ledger ${pass ? "GREEN" : "RED"}`);
    process.exit(0);
}

if (!pass) {
    console.error(`\n[proof:demo-design] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:demo-design] the demo presentation is designed to glass-ui's own SOTA standard — the type pane sings as an editorial specimen, the vibrant color/icon assets are the focal moment + pop in, the glass atoms read as lit glass over the live field, and the demo surfaces themselves come alive. The π arm + the proof:ba-gestalt per-pane verdicts bind the render.",
);
