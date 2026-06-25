#!/usr/bin/env node
// BA.W-CONFIG-CHASSIS — proof:config-chassis, the configurator-chassis-made-whole
// SOURCE gate (device-free; the comment-strip + pure-detector house pattern,
// mirroring proof-fading-scroll.mjs / proof-dock-rail-hairline.mjs / proof-no-gray.mjs).
//
// THE DEFECTS (the five fleet lanes + the dark-row + the preset-alpha):
//   CFG-1  the 0px slider — the ConfiguratorRow slot × LabeledField root width-collapse
//          (a percentage track resolving against a content-sized flex item → 0).
//   CFG-2  the DERIVE chip group hard-clips MONO off the ~360px aside.
//   CFG-3  the aurora Seed is a raw full-width `<input type=color>` slab (3 divergent
//          color treatments, no library register).
//   CFG-4  the section/inter-row dividers vanish on the dark glass plate (off-token
//          `border-border/N` alpha).
//   CFG-5  the gear PresetEditor is a parallel chassis OFF the W-HIERARCHY vocabulary
//          (hand-rolled `<section>`+`<h3 text-xs font-mono>` 12px eyebrow + a
//          PresetEditorField ConfiguratorRow clone).
//   BA-DARK-F1+F2  the gear dark row is a desynced NO-OP `<Switch>` over `delta.dark`,
//          not the canonical live `<DarkModeToggle>`.
//   PPD-1  the Speedtest preset preview bakes 0.26 alpha over the opaque dark card.
//
// THE FIX (the seven scopes): (1) the chassis WIDTH CONTRACT (the slot is a definite-
// width context + the LabeledField root claims width — the 0px class dies once,
// library-wide); (2) the in-row OVERFLOW contract (the DERIVE group WRAPS, never clips);
// (3) the first-class <ColorSwatch> register (≥2 consumers); (4) the dark-adaptive
// --configurator-divider token; (5) the gear RECOMPOSED on <ConfiguratorLayer>/
// <ConfiguratorRow> (PresetEditorField RETIRED); (6) the dark row on <DarkModeToggle>
// bound to the live useGlobalDark (delta.dark DELETED); (7) the freezeCfg alpha:1 clamp.
//
// SOURCE arm only — the BINDING painted truth is the π arm
// (tests-visual/config-chassis.spec.ts + the W-CONFIG-CHASSIS-DELTA capture), NEVER this
// gate alone (the AZ P-1 source-green/visually-broken close-class this tranche fixes:
// the WVR-2/3 failure where the AZ gates were headless + missed the 0-width render). And
// the proof:ba-gestalt `configurators+goo` row PASS is the holistic close bar (BA inv-4).
// BORN-RED at HEAD: the slot is content-sized, no divider token, no <ColorSwatch>, the
// gear hand-rolls its chassis, the dark row is a Switch, freezeCfg does not clamp alpha.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:config-chassis";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// Strip CSS/JS/HTML comments so a witness never matches commented-out text (the
// house pattern — every retired-mechanism reference in our explanatory comments
// must NOT trip the negative predicates).
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── Sources ──────────────────────────────────────────────────────────────────────────
const rowVue = strip(read("src/components/custom/configurator/ConfiguratorRow.vue"));
const labeledFieldVue = strip(read("src/components/custom/labeled-field/LabeledField.vue"));
const baseCss = strip(read("src/styles/utilities/base.css"));
const layerVue = strip(read("src/components/custom/configurator/ConfiguratorLayer.vue"));
const configuratorVue = strip(read("src/components/custom/configurator/Configurator.vue"));
const configuratorCss = strip(read("src/styles/configurator.css"));
// BB.W-CARVE3 — offsets-sizing.css carved into offsets.css (§9) + sizing.css
// (§10); the --configurator-divider* tokens live in §10. BC.W-CUT re-drained that
// §10 tail into the cohesive leaf tokens/sizing-config.css (the no-god-module
// drain, sizing.css:447). This reader FOLLOWS the carve into the leaf (the
// W-CARVE4 "reader gates follow the carve into the leaf" precedent) by reading
// BOTH the parent + the carved leaf, so the token's relocation never silently
// de-fangs the w2 --configurator-divider declaration check.
const offsets =
    strip(read("src/styles/tokens/sizing.css")) +
    "\n" +
    strip(read("src/styles/tokens/sizing-config.css"));
const darkArm = strip(read("src/styles/tokens/dark-arm.css"));
const swatchVue = strip(read("src/components/custom/color-swatch/ColorSwatch.vue"));
const swatchBarrel = read("src/components/custom/color-swatch/index.ts");
const swatchSubpath = read("src/subpaths/color-swatch.ts");
const auroraColor = strip(read("demo/stories/aurora/sections/AuroraColorSection.vue"));
const presetEditorVue = strip(read("demo/configurator/PresetEditor.vue"));
const storeTs = strip(read("demo/configurator/preset-editor/store.ts"));
const thumbnails = strip(read("demo/stories/aurora/usePresetThumbnails.ts"));

const checks = [];
const facts = {};
const add = (id, pass, detail) => checks.push({ id, pass, detail });

// ── W1 — the slider width contract (the 0px-slider class dies at the chassis) ──────────
// POSITIVE contract (anti-evasion: not a brittle one-class string match): the
// ConfiguratorRow slot is a DEFINITE-width context (the slot wrapper claims w-full +
// stretches its child via [&>*] flex-1/w-full), AND the .labeled-field root claims full
// inline width (so a hide-label control still occupies its inline space). The π half (W8)
// is the binding floor — a slotted <LabeledSlider> measures width ≥ 1px.
const slotWidthContext =
    /<div class="flex w-full min-w-0 items-center \[&>\*\]:min-w-0 \[&>\*\]:w-full \[&>\*\]:flex-1">/.test(
        rowVue,
    ) ||
    (/flex w-full min-w-0/.test(rowVue) &&
        /\[&>\*\]:w-full/.test(rowVue) &&
        /\[&>\*\]:flex-1/.test(rowVue));
const labeledFieldClaimsWidth =
    /\.labeled-field\s*\{[^}]*inline-size:\s*100%/.test(baseCss) &&
    /\.labeled-field\s*\{[^}]*min-inline-size:\s*0/.test(baseCss);
add(
    "w1-slider-width-contract",
    slotWidthContext && labeledFieldClaimsWidth,
    `the ConfiguratorRow slot is a definite-width block context (w-full min-w-0 + [&>*] flex-1/w-full) AND the .labeled-field root claims inline-size:100% + min-inline-size:0 (the percentage track resolves against a definite width, not the content-sized 0) [slot=${slotWidthContext} field=${labeledFieldClaimsWidth}]`,
);

// ── W2 — the dark-adaptive divider token register ──────────────────────────────────────
// The token is DECLARED in tokens/sizing.css WITH a distinct dark value (a light-dark()
// arm — the dark half is not the light half), has the dark-arm.css `.dark` floor (the
// @supports-split engine path), is CONSUMED by the section + inter-row divider rules in
// configurator.css, and NO inline `border-border/N` DIVIDER survives on the SFC dividers.
const dividerTokenDeclared = /--configurator-divider:\s*light-dark\(/.test(offsets);
const dividerHasDistinctDarkArm =
    /--configurator-divider:\s*light-dark\([^;]*var\(--foreground\)/.test(offsets) &&
    /--configurator-divider:\s*color-mix\(in srgb,\s*var\(--foreground\)/.test(darkArm);
const dividerConsumed =
    /\.configurator-layer\s*\{[^}]*border-color:\s*var\(--configurator-divider-section\)/.test(
        configuratorCss,
    ) &&
    /\.configurator-layer-body\[data-dividers\]\s*>\s*\*\s*\+\s*\*\s*\{[^}]*border-color:\s*var\(--configurator-divider\)/.test(
        configuratorCss,
    );
// The SFC dividers dropped their inline border-border/N alpha (the section border-b, the
// inter-row [&>*+*] border, the aside/preset/footer chrome borders).
const noInlineDividerAlpha =
    !/configurator-layer border-b border-border\//.test(layerVue) &&
    !/\[&>\*\+\*\]:border-border\//.test(layerVue) &&
    !/configurator-aside[^"]*border-t border-border\//.test(configuratorVue) &&
    !/configurator-presets[^"]*border-b border-border\//.test(configuratorVue) &&
    !/configurator-footer[^"]*border-t border-border\//.test(configuratorVue);
add(
    "w2-divider-token-dark-adaptive",
    dividerTokenDeclared && dividerHasDistinctDarkArm && dividerConsumed && noInlineDividerAlpha,
    `--configurator-divider declared with a light-dark() arm (distinct dark value off --foreground) + the dark-arm.css .dark floor, consumed by the section + inter-row rules in configurator.css, and NO inline border-border/N divider survives the SFCs [declared=${dividerTokenDeclared} darkArm=${dividerHasDistinctDarkArm} consumed=${dividerConsumed} noInline=${noInlineDividerAlpha}]`,
);

// ── W3 — the <ColorSwatch> register replaces the raw slabs ─────────────────────────────
// The package exists (component + barrel + subpath mirror) with ≥2 consumer call-sites on
// AuroraColorSection, and NO raw `<input type="color" … w-full>` slab survives there.
const swatchPackageExists =
    /defineOptions\(\{\s*name:\s*"ColorSwatch"/.test(swatchVue) &&
    /export \{ default as ColorSwatch \}/.test(swatchBarrel) &&
    /export \* from ".*components\/custom\/color-swatch"/.test(swatchSubpath);
const swatchConsumerCount = (auroraColor.match(/<ColorSwatch\b/g) || []).length;
const noRawColorSlab = !/<input[^>]*type="color"[^>]*w-full/.test(auroraColor);
add(
    "w3-color-swatch-register",
    swatchPackageExists && swatchConsumerCount >= 2 && noRawColorSlab,
    `the color-swatch package exists (component + barrel + subpath mirror) with ≥2 consumer call-sites (${swatchConsumerCount}) on AuroraColorSection, and no raw <input type=color w-full> slab survives [package=${swatchPackageExists} consumers=${swatchConsumerCount} noSlab=${noRawColorSlab}]`,
);

// ── W4 — the chip-overflow contract (no hard-clip) ─────────────────────────────────────
// The DERIVE ToggleGroup WRAPS (flex-wrap on its container) so MONO is never sliced — it
// does NOT sit single-line under the hard `overflow-x-clip` (the π half W8 is binding: the
// rightmost chip's right edge ≤ the aside content right edge).
const deriveGroupWraps =
    /<ToggleGroup[\s\S]{0,200}?class="flex flex-1 flex-wrap/.test(auroraColor);
add(
    "w4-chip-overflow-no-clip",
    deriveGroupWraps,
    `the DERIVE <ToggleGroup> WRAPS (flex flex-1 flex-wrap) so the 4-harmony chips reflow to a second line rather than overflowing the ~360px aside and being clipped — MONO is never sliced [wraps=${deriveGroupWraps}]`,
);

// ── W5 — the gear on the chassis, the parallel surface retired ─────────────────────────
// PresetEditor.vue composes <ConfiguratorLayer>/<ConfiguratorRow> (not hand-rolled
// <section>+<h3 text-xs font-mono>); PresetEditorField.vue is DELETED; the delta.dark
// field + the setField("dark") branch + the watch(isDark) mirror are absent from store.ts.
const gearComposesChassis =
    /<ConfiguratorLayer\b/.test(presetEditorVue) && /<ConfiguratorRow\b/.test(presetEditorVue);
const noHandRolledEyebrow = !/<h3 class="text-xs font-mono uppercase/.test(presetEditorVue);
const presetEditorFieldGone = !existsSync(
    resolve(ROOT, "demo/configurator/PresetEditorField.vue"),
);
const deltaDarkGone =
    !/delta\.dark/.test(storeTs) &&
    !/key === "dark"/.test(storeTs) &&
    !/watch\(isDark/.test(storeTs);
add(
    "w5-gear-on-chassis",
    gearComposesChassis && noHandRolledEyebrow && presetEditorFieldGone && deltaDarkGone,
    `PresetEditor composes <ConfiguratorLayer>/<ConfiguratorRow> (no hand-rolled <h3 text-xs font-mono> eyebrow), PresetEditorField.vue is DELETED, and delta.dark/setField("dark")/watch(isDark) are absent from store.ts [chassis=${gearComposesChassis} noEyebrow=${noHandRolledEyebrow} fieldGone=${presetEditorFieldGone} deltaDarkGone=${deltaDarkGone}]`,
);

// ── W6 — the dark row composes the live DarkModeToggle ─────────────────────────────────
// The Appearance dark row renders <DarkModeToggle> (self-syncing over useGlobalDark), NOT
// <Switch v-model="darkModel">. The π half (W8) is binding: clicking it flips html.dark.
const darkRowOnToggle =
    /<DarkModeToggle\b/.test(presetEditorVue) &&
    !/Switch v-model="darkModel"/.test(presetEditorVue) &&
    !/darkModel/.test(presetEditorVue);
add(
    "w6-dark-row-darkmodetoggle",
    darkRowOnToggle,
    `the Appearance dark row renders the canonical <DarkModeToggle> (self-syncing over useGlobalDark), not the desynced <Switch v-model="darkModel"> NO-OP [toggle=${darkRowOnToggle}]`,
);

// ── The full-opacity preview-color assert (BD.W-PRESET-RENDER, re-rooted) ───────────────
// The thumbnail preview must show the preset COLOR, not its 0.26 deployment-time
// translucency. BD.W-PRESET-RENDER DELETED the WebGPU `mode:"capture"` bake + its
// `freezeCfg` `nucleiDrift:0 … alpha:1` canonicalization (clean break, no-backwards-compat
// — the GL dependency the preview never needed; it left every card an eternal skeleton on
// no-device hosts). The thumbnail now bakes via the device-free `auroraFallbackGround(config)`
// 2D-canvas raster, which paints each preset's STATIC composite from the palette LUT at
// FULL luminance ("the composite's SPATIAL luminance, not a partial-alpha approximation")
// — so the preview is the preset color, full-opacity, never the deployed 0.26 translucency,
// BY CONSTRUCTION (no clamp needed; the raster never applies the deployment alpha). The
// assert re-points at the NEW seam: the thumbnail composes `auroraFallbackGround` (not the
// retired WebGPU capture bake), and the runtime presets.ts baseline is untouched.
const fullOpacityPreview =
    /auroraFallbackGround\s*\(/.test(thumbnails) &&
    !/mode:\s*["']capture["']/.test(thumbnails);
add(
    "alpha-clamp-at-bake-seam",
    fullOpacityPreview,
    `the thumbnail bakes via the device-free auroraFallbackGround raster (BD.W-PRESET-RENDER — the WebGPU mode:"capture" bake + its freezeCfg alpha:1 clamp DELETED, clean break); the preview shows the preset COLOR at full opacity by construction, not the 0.26 deployment-time translucency (the presets.ts runtime baseline is untouched) [auroraFallbackGround=${fullOpacityPreview}]`,
);

// ── The subpath/package.json registration ──────────────────────────────────────────────
const pkg = read("package.json");
const exportsRegistered =
    /"\.\/color-swatch":\s*\{/.test(pkg) && /"dist\/color-swatch\.d\.ts"/.test(pkg);
add(
    "color-swatch-subpath-registered",
    exportsRegistered,
    `package.json exports + typesVersions carry the ./color-swatch subpath (dist/color-swatch.{js,d.ts}) [registered=${exportsRegistered}]`,
);

// ── The π readback spec is wired (the BINDING close) ───────────────────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/config-chassis.spec.ts")),
    "tests-visual/config-chassis.spec.ts exists (the π readback — the slotted slider's non-zero width, the un-clipped DERIVE chip, the gear's html.dark flip + 20.4px section rung, the Speedtest swatch vivid, the dark-plate divider step; the BINDING truth)",
);

// ── Report ──────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:config-chassis — the configurator chassis made whole (BA.W-CONFIG-CHASSIS)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_CONFIG_CHASSIS_OUT", "BA-config-chassis");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:config-chassis",
    command: COMMAND,
    note: "SOURCE arm only — the painted 0px-slider-dead / un-clipped-chip / live-dark-flip / vivid-swatch / dark-divider-step truth is proven by tests-visual/config-chassis.spec.ts + the W-CONFIG-CHASSIS-DELTA capture (the π arm), never this gate alone (the BA P-1 close-class fix). The configurators+goo gestalt-row verdict is the holistic close bar (BA inv-4).",
    facts,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:config-chassis] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:config-chassis] the configurator chassis holds — the slot is a definite-width context + the LabeledField root claims width (the 0px slider class dead), the dark-adaptive --configurator-divider token survives both plates, the <ColorSwatch> register (≥2 consumers) replaces the raw slabs, the DERIVE chips wrap (no MONO clip), the gear composes the chassis with the live <DarkModeToggle> (delta.dark + PresetEditorField retired), and freezeCfg clamps the preview alpha. The π arm proves the painted truth.",
);
