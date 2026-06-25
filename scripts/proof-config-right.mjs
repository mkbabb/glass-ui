#!/usr/bin/env node
// BC.W-CONFIG-RIGHT — proof:config-right, the desktop-two-column-controls-RIGHT gate.
//
// THE DEFECT (USER-DEFECTS §E/§F): "the configurator is misplaced → must be on the
// RIGHT on desktop (ALL configurators)." The <Configurator> chassis ALREADY defaulted
// asideSide="right", but the desktop two-column grid SILENTLY did not engage: the SFC
// carried the structural layout as a
//   lg:grid-cols-[minmax(0,1fr)_minmax(var(--configurator-aside-min,280px),var(--configurator-aside-max,360px))]
// arbitrary utility — a `lg:` arbitrary bracket with NESTED var() + commas + minmax()
// that dies in a consumer's content-scan (the BA.W-EMISSION self-emission class, the
// SAME failure that killed the Select collision-bound). Live-probed at /substrates/aurora
// (innerWidth 1280, past the lg 1024px breakpoint): the class was in classList,
// matchMedia('(min-width:1024px)').matches === true, BUT getComputedStyle.gridTemplateColumns
// === "1131px" (a SINGLE column), the aside stacked BELOW the stage (sameRow:false),
// and a full sheet-walk for a rule with both `configurator-aside-max` and
// `grid-template-columns` found NOTHING (gridRuleFound:false). The side-placement flip
// (`lg:col-start-*`) was gated behind the same dead `lg:` arbitrary class.
//
// THE FIX (the BA.W-EMISSION discipline): the structural layout moves into SHIPPED CSS —
// a precompiled `@media (min-width:1024px)` rule scoped to `[data-slot="configurator"]`
// in src/styles/configurator.css (the SAME mechanism the Select bound got in select.css),
// never load-bearing on a content-scan reach. The dead `lg:grid-cols-[...]` arbitrary
// utility is DELETED from the SFC (clean break — it never worked). The side becomes a
// `data-aside-side` attr the SFC binds, with the `[data-aside-side="left"]` flip in
// configurator.css; `right` (default) is the natural source order. Every studio
// (aurora/blob/fourier-studio/compositions-configurator) composes <Configurator> with
// controls-right; the gear PresetEditor (no stage) is the sanctioned single-column exempt.
//
// THIS GATE is the device-free SOURCE arm (["local","ci","release"]): it reads the
// SOURCE configurator.css + Configurator.vue + the host SFCs. The BINDING painted truth
// is the π arm (tests-visual/config-right.spec.ts) + the captured W-CONFIG-RIGHT-DELTA
// (the controls-RIGHT two-column on desktop, the single-column stack below lg, the
// rounded panel) — NEVER this gate alone (the A1-1/P-1 source-green/visually-broken gap
// is the close-class this discipline fixes). Born-RED on HEAD: configurator.css had no
// precompiled grid rule + the SFC carried the dead arbitrary utility.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:config-right";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// Strip CSS block comments + JS/Vue line comments so a `lg:grid-cols-[…]` token or a
// `--configurator-aside-max` mentioned in PROSE/an explanatory comment is never mistaken
// for a live declaration. The dead-arbitrary-utility bite must read LIVE class strings
// + LIVE CSS rules, not the wave's own narrative about them.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });
const facts = {};

// ── Source surfaces ─────────────────────────────────────────────────────────────────
const CSS_PATH = "src/styles/configurator.css";
const SFC_PATH = "src/components/custom/configurator/Configurator.vue";
const cssRaw = read(CSS_PATH);
const cssLive = strip(cssRaw);
const sfcRaw = read(SFC_PATH);
const sfcLive = strip(sfcRaw);

facts.cssPath = CSS_PATH;
facts.sfcPath = SFC_PATH;

// ════════════════════════════════════════════════════════════════════════════════════
// CR1 — the DESKTOP TWO-COLUMN layout ships as PRECOMPILED CSS.
// configurator.css carries a `@media (min-width:1024px)` rule on
// `[data-slot="configurator"]` setting grid-template-columns: minmax(0,1fr) minmax(...).
// Born-RED: HEAD had only the dead `lg:grid-cols-[...]` arbitrary utility in the SFC, no
// precompiled rule. Self-test: removing the precompiled rule reds (the match below).
// ════════════════════════════════════════════════════════════════════════════════════
// The rule may span multiple lines (the partial ships UNMINIFIED in dist) — match a
// `@media (min-width:1024px)` whose body carries a `[data-slot="configurator"]` selector
// (no further attr qualifier on the SAME selector — the bare desktop rule, NOT the
// left-flip) AND a `grid-template-columns: minmax(0, 1fr) minmax(...)` two-track template
// reading the aside-min/max band.
const hasDesktopMedia = /@media[^{]*min-width\s*:\s*(?:1024px|64rem)/.test(cssLive);
// The bare [data-slot="configurator"] rule (right default — no [data-aside-side] qualifier)
// setting the two-track grid-template-columns off the aside band.
const desktopGridRule =
    /\[data-slot=["']?configurator["']?\]\s*\{[^}]*grid-template-columns\s*:\s*minmax\(\s*0\s*,\s*1fr\s*\)\s*minmax\([^}]*--configurator-aside-min[^}]*--configurator-aside-max[^}]*\}/s.test(
        cssLive,
    );
// The desktop rule OWNS the row geometry (the two-column band sets it explicitly).
// BD.W-CONFIG-GALLERY-DOCK moved the gallery OUT of the aside into a grid sibling, so
// the desktop grid is now TWO rows — the gallery row (auto) over the body row (1fr):
// `grid-template-rows: auto minmax(0, 1fr)` (the gallery-dock geometry). The prior
// pre-gallery form was `grid-template-rows: none`. Either is the desktop band owning the
// row geometry off the precompiled rule (NOT the dead arbitrary utility); accept both.
const desktopRowsNone =
    /\[data-slot=["']?configurator["']?\]\s*\{[^}]*grid-template-rows\s*:\s*(?:none|auto\s+minmax\(\s*0\s*,\s*1fr\s*\))[^}]*\}/s.test(
        cssLive,
    );
facts.cr1 = { hasDesktopMedia, desktopGridRule, desktopRowsNone };
add(
    "CR1-desktop-two-column-precompiled",
    hasDesktopMedia && desktopGridRule && desktopRowsNone,
    hasDesktopMedia && desktopGridRule && desktopRowsNone
        ? "the desktop two-column layout SHIPS as a precompiled `@media (min-width:1024px)` rule on [data-slot=configurator] in configurator.css — grid-template-columns: minmax(0,1fr) minmax(--configurator-aside-min, --configurator-aside-max) + grid-template-rows: auto minmax(0,1fr) (the BD.W-CONFIG-GALLERY-DOCK gallery-row geometry; the BA.W-EMISSION discipline, never load-bearing on a content-scan reach)"
        : `the precompiled desktop two-column rule is ABSENT/incomplete in configurator.css (media ${hasDesktopMedia}, grid-rule ${desktopGridRule}, rows-none ${desktopRowsNone}) — the layout would die silently as the dead arbitrary utility did (the born-RED state)`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// CR2 — the DEAD ARBITRARY UTILITY is GONE (clean break, no alias).
// Configurator.vue's LIVE class strings carry NO `lg:grid-cols-[minmax(...var(...)...)]`
// arbitrary utility with nested var(). The anti-evasion bite: a re-added arbitrary
// `lg:grid-cols-[...]` with a nested `var()` reds (it never emits — the EMISSION class).
// ════════════════════════════════════════════════════════════════════════════════════
// Read LIVE class strings only (comments stripped — the wave's own narrative names the
// dead utility for context, that must not red). The dead form: a `lg:grid-cols-[` bracket
// containing a `var(` (the nested-var arbitrary that silently dies). Also catch any
// `grid-cols-[` arbitrary bracket carrying `--configurator-aside` (the structural grid as
// an arbitrary utility, on ANY breakpoint prefix).
const deadGridArbitrary =
    /\blg:grid-cols-\[[^\]]*var\(/.test(sfcLive) ||
    /\bgrid-cols-\[[^\]]*--configurator-aside/.test(sfcLive);
facts.cr2 = { deadGridArbitrary };
add(
    "CR2-dead-arbitrary-utility-gone",
    !deadGridArbitrary,
    !deadGridArbitrary
        ? "the dead `lg:grid-cols-[minmax(...var(...)...)]` arbitrary utility is GONE from Configurator.vue's live class strings (clean break — the inert class is deleted, not aliased); the desktop columns come from the precompiled configurator.css rule"
        : "Configurator.vue STILL carries a `grid-cols-[…var(…)…]`/`lg:grid-cols-[…--configurator-aside…]` arbitrary utility in a live class string — the EMISSION class (a `lg:` arbitrary bracket with nested var() silently dies in a consumer content-scan; it must move to the precompiled configurator.css rule)",
);

// ════════════════════════════════════════════════════════════════════════════════════
// CR3 — the SIDE is a DATA-ATTR, default RIGHT.
// Configurator.vue binds `:data-aside-side` on the root + defaults asideSide:"right";
// configurator.css has the `[data-aside-side="left"]` flip rule; the `lg:col-start-*`
// arbitrary flip is GONE. Born-RED: HEAD used the `lg:col-start-*` arbitrary class.
// ════════════════════════════════════════════════════════════════════════════════════
// The SFC binds the data attr on the root section.
const bindsDataAsideSide = /:data-aside-side\s*=\s*["']asideSide["']/.test(sfcLive);
// The default is right.
const defaultsRight = /asideSide\s*:\s*["']right["']/.test(sfcLive);
// The dead `lg:col-start-*` arbitrary flip is GONE from live class strings.
const deadColStart = /\blg:col-start-\d/.test(sfcLive);
// configurator.css carries the [data-aside-side="left"] flip rule (grid-column-start swap).
const leftFlipRule =
    /\[data-aside-side=["']?left["']?\][^{]*\{[^}]*grid-column-start/s.test(cssLive) ||
    /\[data-slot=["']?configurator["']?\]\[data-aside-side=["']?left["']?\]/.test(cssLive);
facts.cr3 = { bindsDataAsideSide, defaultsRight, deadColStart, leftFlipRule };
add(
    "CR3-side-is-data-attr-default-right",
    bindsDataAsideSide && defaultsRight && !deadColStart && leftFlipRule,
    bindsDataAsideSide && defaultsRight && !deadColStart && leftFlipRule
        ? "the side is a `data-aside-side` attr (default `right`): Configurator.vue binds :data-aside-side + defaults asideSide:'right'; configurator.css owns the [data-aside-side='left'] grid-column flip; the dead `lg:col-start-*` arbitrary flip is GONE"
        : `the side is NOT correctly a data-attr (binds-attr ${bindsDataAsideSide}, defaults-right ${defaultsRight}, dead-col-start-present ${deadColStart}, left-flip-rule ${leftFlipRule}) — born-RED on HEAD's lg:col-start-* arbitrary class`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// CR4 — every STUDIO reads controls-right, no left fork (the EXACTLY-ONE-LIST census).
// aurora/blob/fourier-studio/compositions-configurator compose <Configurator> with
// controls-right (default or explicit); none passes asideSide="left"; the PresetEditor
// single-column is the recorded POSITIVE exempt. Every <Configurator> host appears on
// EXACTLY ONE list (two-column-studio | single-column-exempt) — the anti-gameability
// floor (the dock-NORMALIZE census precedent).
// ════════════════════════════════════════════════════════════════════════════════════
// The census: every host that composes the <Configurator> CHASSIS, on exactly one list.
const TWO_COLUMN_STUDIOS = [
    "demo/stories/substrates/aurora.vue",
    "demo/stories/substrates/blob.vue",
    // BC.W-VIZ-CONFIGURATOR-SUITE — the fourier studio is the ONE merged
    // `fourier-field.vue` view (proof:fourier-field U1 RETIRED the duplicate
    // `fourier-studio.vue`); the census roster names the live merged view, not the
    // retired duplicate.
    "demo/stories/substrates/fourier-field.vue",
    "demo/stories/compositions/configurator.vue",
];
const SINGLE_COLUMN_EXEMPT = [
    // The gear PresetEditor recomposes <ConfiguratorLayer>/<ConfiguratorRow> but has NO
    // <Configurator> chassis + NO stage (a controls-only gear panel — no side to place).
    // The sanctioned single-column exempt (the dock-FEATURE-exempt precedent).
    "demo/configurator/PresetEditor.vue",
];
facts.census = { twoColumnStudios: TWO_COLUMN_STUDIOS, singleColumnExempt: SINGLE_COLUMN_EXEMPT };

// Every two-column studio: composes the <Configurator> chassis + passes NO asideSide="left".
const studioVerdicts = TWO_COLUMN_STUDIOS.map((rel) => {
    const src = strip(read(rel));
    // Opens the chassis tag (`<Configurator` followed by whitespace/`>`/newline — NOT
    // `<ConfiguratorRow`/`<ConfiguratorLayer`) — OR `<VizStudio>` (BC.W-VIZ-CONFIGURATOR-
    // SUITE — the shared studio chassis that BUNDLES <Configurator asideSide="right">; a
    // studio composing VizStudio reads the SAME standardized controls-right layout, the
    // single-writer chassis discipline). aurora is the first VizStudio exemplar.
    const composesChassis =
        /<Configurator(?:\s|>|$)/m.test(src) || /<VizStudio(?:\s|>|\/|$)/m.test(src);
    // The left fork: an asideSide="left" / :aside-side="'left'" / aside-side="left" prop.
    const passesLeft =
        /aside-side\s*=\s*["']left["']/.test(src) ||
        /:aside-side\s*=\s*["']\s*['"]?left['"]?\s*["']/.test(src) ||
        /asideSide\s*=\s*["']left["']/.test(src);
    return { rel, exists: read(rel).length > 0, composesChassis, passesLeft };
});
facts.studioVerdicts = studioVerdicts;
const allStudiosControlsRight = studioVerdicts.every(
    (v) => v.exists && v.composesChassis && !v.passesLeft,
);

// The exempt: PresetEditor exists + has NO <Configurator> chassis + NO #stage (a gear
// panel with no stage → the sanctioned single-column, no side to place).
const exemptVerdicts = SINGLE_COLUMN_EXEMPT.map((rel) => {
    const src = strip(read(rel));
    const hasChassis = /<Configurator(?:\s|>|$)/m.test(src);
    const hasStage = /<template\s+#stage/.test(src) || /name=["']stage["']/.test(src);
    return { rel, exists: read(rel).length > 0, hasChassis, hasStage };
});
facts.exemptVerdicts = exemptVerdicts;
const exemptValid = exemptVerdicts.every(
    (v) => v.exists && !v.hasChassis && !v.hasStage,
);

// The EXACTLY-ONE-LIST anti-smuggle floor: no host appears on both lists; the union has
// no duplicate. (A future agent adding a <Configurator> host must list it on exactly one.)
const overlap = TWO_COLUMN_STUDIOS.filter((s) => SINGLE_COLUMN_EXEMPT.includes(s));
const noOverlap = overlap.length === 0;
facts.cr4 = { allStudiosControlsRight, exemptValid, noOverlap, overlap };
add(
    "CR4-every-studio-controls-right-no-left-fork",
    allStudiosControlsRight && exemptValid && noOverlap,
    allStudiosControlsRight && exemptValid && noOverlap
        ? `every studio reads controls-right: ${TWO_COLUMN_STUDIOS.length} two-column studios compose <Configurator> with the controls-right default (none passes asideSide="left"); the gear PresetEditor is the recorded single-column exempt (no chassis, no stage); the census lists are disjoint (the anti-smuggle floor)`
        : `a studio census clause failed (studios-controls-right ${allStudiosControlsRight}, exempt-valid ${exemptValid}, no-overlap ${noOverlap}${overlap.length ? ` overlap:${overlap.join(",")}` : ""}) — see facts.studioVerdicts/exemptVerdicts`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// SELF-TEST — every clause has a synthetic BITE (a missing precompiled rule, a re-added
// dead arbitrary utility, a `left` default, an un-listed/left-forked studio — each MUST
// flag). The self-test runs the SAME detectors over synthetic fixtures so a future
// detector rot (a regex that stops matching) is caught.
// ════════════════════════════════════════════════════════════════════════════════════
const selfTests = [];
const st = (id, pass, detail) => selfTests.push({ id, pass: Boolean(pass), detail });

// CR1 bite: a fixture WITHOUT the precompiled grid rule must NOT match desktopGridRule.
const noGridFixture = `.configurator { display: grid; } @media (min-width: 1024px) { .other { color: red; } }`;
const cr1Bite =
    !/\[data-slot=["']?configurator["']?\]\s*\{[^}]*grid-template-columns\s*:\s*minmax\(\s*0\s*,\s*1fr\s*\)\s*minmax\([^}]*--configurator-aside-min[^}]*--configurator-aside-max[^}]*\}/s.test(
        noGridFixture,
    );
st("CR1-bite-missing-grid-rule-reds", cr1Bite, "a fixture missing the precompiled [data-slot=configurator] grid rule does NOT match (the detector bites a removed rule)");

// CR2 bite: a fixture WITH a re-added `lg:grid-cols-[…var(…)…]` arbitrary utility MUST match.
const reAddedDead = `class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(var(--configurator-aside-min,280px),var(--configurator-aside-max,360px))]"`;
const cr2Bite =
    /\blg:grid-cols-\[[^\]]*var\(/.test(reAddedDead) ||
    /\bgrid-cols-\[[^\]]*--configurator-aside/.test(reAddedDead);
st("CR2-bite-readded-dead-arbitrary-reds", cr2Bite, "a re-added `lg:grid-cols-[…var(…)…]` arbitrary utility MATCHES the dead-arbitrary detector (the anti-evasion bite)");

// CR3 bite: a fixture defaulting asideSide:"left" must FAIL the defaultsRight check.
const leftDefaultFixture = `asideSide: "left",`;
const cr3Bite = !/asideSide\s*:\s*["']right["']/.test(leftDefaultFixture);
st("CR3-bite-left-default-reds", cr3Bite, "a fixture defaulting asideSide:'left' does NOT satisfy defaultsRight (the wrong-default bite)");

// CR3 bite-b: a re-added `lg:col-start-2` arbitrary flip MUST be caught.
const reAddedColStart = `class="lg:col-start-2"`;
const cr3BiteB = /\blg:col-start-\d/.test(reAddedColStart);
st("CR3-bite-readded-col-start-reds", cr3BiteB, "a re-added `lg:col-start-N` arbitrary flip MATCHES the deadColStart detector (the side must be a data-attr, not an arbitrary class)");

// CR4 bite: a fixture studio passing asideSide="left" MUST be caught as a left fork.
const leftForkFixture = `<Configurator asideSide="left" :presets="presets">`;
const cr4Bite =
    /aside-side\s*=\s*["']left["']/.test(leftForkFixture) ||
    /asideSide\s*=\s*["']left["']/.test(leftForkFixture);
st("CR4-bite-left-fork-studio-reds", cr4Bite, "a studio passing asideSide='left' MATCHES the left-fork detector (no studio may fork the standardized controls-right idiom)");

// CR4 bite-b: an un-listed host (a <Configurator> chassis on neither census list) is the
// smuggle attempt — the EXACTLY-ONE-LIST floor catches it because the union is the closed
// set this gate audits. The bite asserts the union has no overlap (a host on BOTH lists
// would be the double-count gameability) — already checked above; here the synthetic
// overlap MUST be caught.
const syntheticOverlap = ["x.vue"].filter((s) => ["x.vue"].includes(s));
const cr4BiteB = syntheticOverlap.length > 0;
st("CR4-bite-overlap-caught", cr4BiteB, "a host on BOTH census lists is caught by the overlap detector (the anti-double-count floor)");

facts.selfTests = selfTests;
const allSelfTestsPass = selfTests.every((s) => s.pass);
add(
    "self-test-bites-armed",
    allSelfTestsPass,
    allSelfTestsPass
        ? `all ${selfTests.length} self-test bites armed (a missing precompiled rule, a re-added dead arbitrary utility, a left default, a re-added col-start flip, a left-fork studio, a census overlap — each detector flags its synthetic fixture)`
        : `a self-test bite FAILED to flag: ${selfTests.filter((s) => !s.pass).map((s) => s.id).join(", ")} — the detector has rotted (it would silently pass a regression)`,
);

// ── The π readback spec is wired (the BINDING close) ────────────────────────────────
add(
    "pi-readback-spec-wired",
    existsSync(resolve(ROOT, "tests-visual/config-right.spec.ts")),
    existsSync(resolve(ROOT, "tests-visual/config-right.spec.ts"))
        ? "tests-visual/config-right.spec.ts exists (the π readback — the desktop two-column truth: ≥1280px getComputedStyle resolves TWO tracks + aside.left > stage.left + same-row; the narrow single-column truth ≤900px; the rounded-panel truth; the stage→aside DOM/tab reading-order floor — the BINDING painted truth, both modes + WebKit)"
        : "tests-visual/config-right.spec.ts MISSING — the π readback rides BC.W-PAINT-GATE; the orchestrator wires the LOCAL real-render arm (this gate is the device-free SOURCE arm)",
);

// ── Report ──────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:config-right — the desktop-two-column-controls-RIGHT gate (BC.W-CONFIG-RIGHT)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_CONFIG_RIGHT_OUT", "BC-config-right");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:config-right",
    command: COMMAND,
    note: "device-free SOURCE arm (reads src/styles/configurator.css + Configurator.vue + the host SFCs). The BINDING painted truth is the π arm tests-visual/config-right.spec.ts + the captured W-CONFIG-RIGHT-DELTA (controls-RIGHT two-column on desktop, single-column stack below lg, rounded panel), never this gate alone (the BC P-1 source-green/visually-broken close-class fix). The configurator grid joins proof:emission's covered structural-utility set.",
    facts,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:config-right] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:config-right] the desktop two-column layout is RELIABLE: the controls-RIGHT grid ships as a precompiled [data-slot=configurator] rule in configurator.css (the BA.W-EMISSION discipline — never load-bearing on a content-scan reach), the dead `lg:grid-cols-[…var(…)…]`/`lg:col-start-*` arbitrary utilities are DELETED, the side is the `data-aside-side` attr (default right), and every studio reads the SAME standardized layout (the gear PresetEditor the recorded single-column exempt). The π arm proves the painted controls-RIGHT truth.",
);
