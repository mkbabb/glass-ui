#!/usr/bin/env node
// BA.W-FADING-SCROLL — proof:fading-scroll, the scroll-state-driven edge-fade SOURCE
// gate (device-free; the comment-strip + pure-detector house pattern, mirroring
// proof-suffuse.mjs / proof-dock-rail-hairline.mjs / proof-no-gray.mjs).
//
// THE DEFECT (R8-08, the user's "Shy" capture + the "fading scroll list… compatible
// with vertical scrolling too" coinage): the static `.scroll-fade-*` masks
// (utilities/base.css) feather BOTH edges UNCONDITIONALLY with zero knowledge of
// scroll position — so at `scrollLeft = 0` the LEFT edge masks though there is
// nothing to scroll back to (the first card's chrome is half-erased), and the RIGHT
// edge masks even when the row fits with no trailing overflow. The only scroll-aware
// path was the bespoke `PresetPickerRow` JS — binary, trapped in one demo file.
//
// THE FIX: `<FadingScroll>` ships as the library's ONE scroll-state-driven edge-fade
// primitive (subpath /fading-scroll), the dual-path single-writer model that mirrors
// scroll-driven.css: the native `scroll(self)`-timeline drives per-edge `@property`
// mask-width customs (`--fade-start` opens past `scroll > 0`, `--fade-end` closes on
// trailing overflow), with the `useFadingScroll` JS fallback feature-detect-gated OFF
// under timeline support. The owned consumers (blob mood row, aurora controls
// column, PresetPickerRow) fold onto it. (The fourth — SegmentedTabs
// `overflow="scroll"` — had its overflow axis RETIRED at BA.W-TABS: overflow is
// FadingScroll's job at the consumer level, so SegmentedTabs is no longer a
// consumer; the c5 invariant narrowed to "carries no scroll-fade machinery".)
//
// SOURCE arm only — the BINDING painted truth is the π arm
// (tests-visual/fading-scroll.spec.ts + the W-FADING-SCROLL-DELTA capture), NEVER this
// gate alone (the AZ P-1 source-green/visually-broken close-class failure this tranche
// exists to fix). BORN-RED at HEAD: no `.fading-scroll` recipe, no `scroll(self)`
// timeline, the four consumers reference the static path / the bespoke JS.

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:fading-scroll";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// Strip CSS/JS comments so a witness never matches commented-out text.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── Sources ──────────────────────────────────────────────────────────────────────────
const baseCss = strip(readMonolith(ROOT, "utilities")); // concatenated utilities partials (incl. base.css)
const offsets = strip(read("src/styles/tokens/offsets-sizing.css"));
const sfc = strip(read("src/components/custom/fading-scroll/FadingScroll.vue"));
const composable = strip(
    read("src/components/custom/fading-scroll/composables/useFadingScroll.ts"),
);
const barrel = read("src/components/custom/fading-scroll/index.ts");
const subpath = read("src/subpaths/fading-scroll.ts");
const segTabsVue = strip(read("src/components/custom/tabs/SegmentedTabs.vue"));
const segTabsCss = strip(read("src/styles/segmented-tabs.css"));
const auroraDock = strip(read("demo/stories/aurora/AuroraConfigDock.vue"));
const presetRow = strip(read("demo/stories/aurora/PresetPickerRow.vue"));
const blobVue = strip(read("demo/stories/substrates/blob.vue"));

// The named C2/C3 configurator coordination exception — the ONLY surviving
// static `.scroll-fade-*` consumer references allowed (held by W-CONFIG-CHASSIS
// until the orchestrator's Batch-close retire commit).
const C2_C3_ALLOWLIST = ["src/components/custom/configurator/Configurator.vue"];

// Every in-tree file that could reference the static `.scroll-fade-*` utilities,
// excluding the gate/proof scripts (which name the class in prose) and the
// retiring utility DEFINITIONS themselves (base.css blocks survive this wave).
const SCROLL_FADE_CLASS_RE = /scroll-fade-(?:mask|top|bottom|y)\b/;

const checks = [];
const facts = {};
const add = (id, pass, detail) => checks.push({ id, pass, detail });

// ── W1 — the start edge is overflow-gated, not unconditional ────────────────────────
// POSITIVE: a `scroll(self …)` timeline drives a per-edge custom whose start range
// opens past zero (NOT the unconditional `linear-gradient(to right, transparent, black …)`).
const hasScrollSelfTimeline = /animation-timeline:\s*scroll\(self\s+(?:inline|block)\)/.test(
    baseCss,
);
const hasStartProperty = /@property\s+--fade-start\b/.test(baseCss);
const startRangeOpensPastZero =
    /animation-range:\s*0\s+var\(--fade-scroll-width\)/.test(baseCss) &&
    /@keyframes\s+gl-fade-start-in\b/.test(baseCss);
add(
    "w1-start-edge-scroll-gated",
    hasScrollSelfTimeline && hasStartProperty && startRangeOpensPastZero,
    `start edge driven by scroll(self) timeline + a registered --fade-start custom whose animation-range opens at 0..--fade-scroll-width (feathers in only past scroll > 0) [timeline=${hasScrollSelfTimeline} prop=${hasStartProperty} range=${startRangeOpensPastZero}]`,
);

// ── W2 — the end edge is trailing-overflow-gated ────────────────────────────────────
const hasEndProperty = /@property\s+--fade-end\b/.test(baseCss);
const endRangeTrailing =
    /animation-range:\s*calc\(100%\s*-\s*var\(--fade-scroll-width\)\)\s+100%/.test(baseCss) &&
    /@keyframes\s+gl-fade-end-out\b/.test(baseCss);
// AND the JS fallback predicate gates the end edge on remaining trailing overflow.
const jsEndPredicate =
    /scrollWidth\s*-\s*el\.clientWidth/.test(composable) &&
    /scrollHeight\s*-\s*el\.clientHeight/.test(composable) &&
    /pos\s*>=\s*max\s*-\s*SNAP_TOLERANCE/.test(composable);
add(
    "w2-end-edge-overflow-gated",
    hasEndProperty && endRangeTrailing && jsEndPredicate,
    `end edge --fade-end ramps OUT over the last --fade-scroll-width of scroll (sharp at the end) + the JS fallback gates it on scrollWidth/Height − clientWidth/Height remaining [prop=${hasEndProperty} range=${endRangeTrailing} js=${jsEndPredicate}]`,
);

// ── W3 — both axes, one primitive ───────────────────────────────────────────────────
const sfcAxisProp = /axis\?\s*:\s*"x"\s*\|\s*"y"/.test(sfc);
const cssInlineAxis = /scroll\(self\s+inline\)/.test(baseCss);
const cssBlockAxis = /scroll\(self\s+block\)/.test(baseCss);
add(
    "w3-both-axes-one-primitive",
    sfcAxisProp && cssInlineAxis && cssBlockAxis,
    `the component accepts axis "x" | "y" and the CSS drives scroll(self inline) for x + scroll(self block) for y (the "compatible with vertical scrolling too" case) [prop=${sfcAxisProp} inline=${cssInlineAxis} block=${cssBlockAxis}]`,
);

// ── W4 — single-writer dual-path ────────────────────────────────────────────────────
// The JS fallback is feature-detect-gated OFF when scroll() is supported, and it
// writes the SAME customs the CSS writes.
const importsDetect = /supportsScrollTimeline/.test(composable);
const gatedOff =
    /NATIVE_SCROLL_TIMELINE\s*=\s*supportsScrollTimeline\(\)/.test(composable) &&
    /active\s*=\s*ref\(!NATIVE_SCROLL_TIMELINE\)/.test(composable) &&
    /if\s*\(!active\.value\)\s*return/.test(composable);
const writesSameCustoms =
    /setProperty\(\s*"--fade-start"/.test(composable) &&
    /setProperty\(\s*"--fade-end"/.test(composable);
add(
    "w4-single-writer-dual-path",
    importsDetect && gatedOff && writesSameCustoms,
    `useFadingScroll feature-detect-gates OFF under native scroll() support (no double-write) and writes the SAME --fade-start/--fade-end customs the CSS recipe drives [detect=${importsDetect} gated=${gatedOff} sameCustoms=${writesSameCustoms}]`,
);

// ── W5 — the four owned consumers migrated ──────────────────────────────────────────
// C1 (blob mood row), C4 (aurora controls column), C5 (SegmentedTabs scroll), C6
// (PresetPickerRow) carry NO static class, and PresetPickerRow's bespoke machinery
// is DELETED.
// BA.W-TABS — the SegmentedTabs `overflow="scroll"` axis RETIRED (the declared
// W-FADING-SCROLL coordination): overflow is now `<FadingScroll>`'s job at the
// CONSUMER's own level, not an in-tabs scroller, so SegmentedTabs is no longer a
// FadingScroll consumer. The c5 invariant is now "SegmentedTabs carries NO
// scroll-fade machinery" (the migration GOAL — no static class, no in-tabs scroll
// port); the prior "reads <FadingScroll>/useFadingScroll" conjunct dissolved WITH
// the retired axis (a smuggled-back static scroll-fade class still REDs).
const c5Migrated = !SCROLL_FADE_CLASS_RE.test(segTabsVue);
const c4Migrated = !SCROLL_FADE_CLASS_RE.test(auroraDock) && /FadingScroll/.test(auroraDock);
const c1Migrated = !SCROLL_FADE_CLASS_RE.test(blobVue) && /FadingScroll/.test(blobVue);
// C6 bespoke machinery deleted: no --mask-l / --mask-r / --edge-mask, no measure()
// + ResizeObserver hand-roll, folded onto the primitive.
const c6BespokeGone =
    !/--mask-l\b/.test(presetRow) &&
    !/--mask-r\b/.test(presetRow) &&
    !/--edge-mask\b/.test(presetRow) &&
    !/new ResizeObserver/.test(presetRow);
const c6OnPrimitive = /FadingScroll/.test(presetRow) || /useFadingScroll/.test(presetRow);
add(
    "w5-four-consumers-migrated",
    c5Migrated && c4Migrated && c1Migrated && c6BespokeGone && c6OnPrimitive,
    `C5 SegmentedTabs carries NO scroll-fade-* class (the overflow axis RETIRED at BA.W-TABS — no longer a FadingScroll consumer); C4 aurora column + C1 blob mood row carry NO scroll-fade-* class and read <FadingScroll>/useFadingScroll; C6 PresetPickerRow bespoke --mask-l/--mask-r/--edge-mask + ResizeObserver machinery DELETED, folded onto the primitive [c5=${c5Migrated} c4=${c4Migrated} c1=${c1Migrated} c6gone=${c6BespokeGone} c6prim=${c6OnPrimitive}]`,
);

// ── W6 — the static-utility retirement is consumer-clean (the coordination floor) ───
// The ONLY surviving in-tree `.scroll-fade-*` references are the named C2/C3
// configurator pair. Scan every src/ + demo/ file; the gate/proof scripts and the
// retiring utility DEFINITIONS in base.css are excluded.
let survivors = [];
try {
    const grepped = execSync(
        `grep -rln 'scroll-fade-mask\\|scroll-fade-y\\|scroll-fade-top\\|scroll-fade-bottom' src demo 2>/dev/null || true`,
        { cwd: ROOT, encoding: "utf8" },
    );
    survivors = grepped
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        // exclude the retiring utility DEFINITIONS (base.css blocks survive this wave)
        .filter((p) => !p.endsWith("src/styles/utilities/base.css"))
        // exclude the dock overflow comment that names .scroll-fade-{x,y} in prose
        .filter((p) => !p.endsWith("src/styles/tokens/offsets-sizing.css"));
} catch {
    survivors = [];
}
const unexpectedSurvivors = survivors.filter(
    (p) => !C2_C3_ALLOWLIST.some((a) => p.endsWith(a)),
);
facts.scrollFadeSurvivors = survivors;
facts.unexpectedSurvivors = unexpectedSurvivors;
add(
    "w6-retirement-consumer-clean",
    unexpectedSurvivors.length === 0,
    `the ONLY surviving in-tree .scroll-fade-* consumer references are the named C2/C3 configurator pair (held by W-CONFIG-CHASSIS) — unexpected survivors: ${unexpectedSurvivors.length ? unexpectedSurvivors.join(", ") : "none"}`,
);

// ── Subpath + barrel registration ───────────────────────────────────────────────────
const subpathOk = /export \* from ".*components\/custom\/fading-scroll"/.test(subpath);
const barrelOk =
    /FadingScroll/.test(barrel) && /useFadingScroll/.test(barrel);
add(
    "subpath-and-barrel-registered",
    subpathOk && barrelOk,
    `src/subpaths/fading-scroll.ts mirrors the package barrel + index.ts exports FadingScroll + useFadingScroll [subpath=${subpathOk} barrel=${barrelOk}]`,
);

// ── token mint ──────────────────────────────────────────────────────────────────────
const tokenMinted = /--fade-scroll-width:\s*1rem/.test(offsets);
add(
    "fade-scroll-width-token-minted",
    tokenMinted,
    `--fade-scroll-width: 1rem minted in offsets-sizing.css (supersedes --mask-fade-width; retire-coordinated) [minted=${tokenMinted}]`,
);

// ── The π readback spec is wired (the BINDING close) ────────────────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/fading-scroll.spec.ts")),
    "tests-visual/fading-scroll.spec.ts exists (the π edge-fade readback — at-rest start edge SHARP, end edge feathered while overflowing, fits-no-overflow both sharp; the BINDING truth)",
);

// ── Report ──────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:fading-scroll — the scroll-state-driven edge fade (BA.W-FADING-SCROLL)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_FADING_SCROLL_OUT", "BA-fading-scroll");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:fading-scroll",
    command: COMMAND,
    note: "SOURCE arm only — the painted at-rest-sharp / overflow-feathered truth is proven by tests-visual/fading-scroll.spec.ts + the W-FADING-SCROLL-DELTA capture (the π arm), never this gate alone (the BA P-1 close-class fix). The W6 static-utility retirement re-runs GREEN automatically when the orchestrator's Batch-close retire commit lands (C2/C3 migrated).",
    facts,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:fading-scroll] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:fading-scroll] the scroll-state-driven edge fade holds — <FadingScroll> drives per-edge mask-width customs off the native scroll(self) timeline (start past scroll>0, end on trailing overflow) with the feature-detect-gated useFadingScroll fallback, both axes one primitive, the four owned consumers migrated, and the only surviving static .scroll-fade-* references are the named C2/C3 coordination pair. The π arm proves the painted at-rest-sharp truth.",
);
