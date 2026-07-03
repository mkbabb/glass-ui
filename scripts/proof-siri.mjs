#!/usr/bin/env node
// proof:siri — BG.W-SIRI-DOCK-CAPABILITY — Siri as a DOCK CAPABILITY (born-RED → GREEN).
//
// Siri is NOT a subpath component + carries NO `api/` entry — it is a capability that lives
// BESIDE the dock via the `.glass-dock-frame`/`#rail` escape (box-inviolate). This ONE gate
// carries the FOUR arms the merged wave collapses (the historical WS6 blur-engage + island +
// waveform + integration sub-waves → ONE `proof:siri`):
//
//   E — the `--siri-island-t`-coupled descend SCRIM (the blur-engage arm). The route's OWN
//       pixels blur + dim as Siri rises via `filter: blur()` (Safari-safe — NEVER a
//       `backdrop-filter`, which mis-composites on WebKit), OVERSIZED (a sub-perceptual
//       scale past 1 so the blurred edge never reveals a gutter), TWO dim modes (global
//       `::backdrop` + local panel), coupled to `--siri-island-t`, PRM-carved.
//
//   S — the glass ISLAND. FOUR forms (the `SIRI_FORMS` DATA ladder, √φ) on ONE
//       `--siri-island-t` scalar; the seam (`useSiriDock`) composes `useDockSpring` (the
//       ONE dock spring — ZERO `new SpringProgress`) + `useLiquidReveal` (the source-rect
//       bloom); clip-aperture + overlapping content crossfade; warm under-glow; `role=status`;
//       box-inviolate (the island reserves its OWN peak, never mutates the dock box).
//
//   W — the demo-private WebGL2 WAVEFORM. ONE GLSL fullscreen pass on the shared
//       `createWebGLCanvas` substrate (WebGL2-only — NO `.wgsl`); warm-dominant prismatic
//       ribbon whose color is an in-shader OKLab-RECTANGULAR ramp (Ottosson matrices); the
//       push-API `level(0..1)` prop → `uLevel` uniform; NO cool teal/navy (warm-cream identity).
//
//   D — the INTEGRATION story. The "Search or ask" pill composes the EXISTING `useDockSearch`
//       pipeline (ONE matcher — no second engine); the island renders off the `#rail`/
//       `.glass-dock-frame` escape; composes the shipped `<SiriDockCapability>` + the
//       demo-private `<SiriWaveform>` (no demo-local re-fork of the capability).
//
// Each arm reds when its file is absent (born-RED on HEAD). A per-arm self-test bite plants a
// synthetic defect and asserts the detector flags it. Run: node scripts/proof-siri.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:siri";

const SIRI_CSS = "src/styles/dock/siri.css";
const PROPERTY_REGS = "src/styles/tokens/property-regs.css";
const DOCK_CSS = "src/styles/dock.css";
const COMPOSABLE = "src/components/custom/dock/composables/useSiriDock.ts";
const COMPONENT = "src/components/custom/dock/SiriDockCapability.vue";
const CONSTANTS = "src/components/custom/dock/constants.ts";
const WAVEFORM = "demo/stories/dock/SiriWaveform.vue";
const STORY = "demo/stories/dock/siri-island.vue";

// Strip CSS/TS/JS comments (both // and /* */) so a prose mention of a retired construct is
// never a false hit. Preserve newlines for line-count stability. The URL-safe `(^|[^:])//`
// strip keeps a `://` in a string from being eaten (the house idiom).
const stripComments = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(Math.max(0, m.length - p1.length)));

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// ── cool-blue detection (the teal-navy-purge warm-identity floor, W5) ────────────
// A cool OKLCh stop above the neutral chroma floor OR a blue-dominant hex is a
// teal/navy color event — forbidden in the warm-cream waveform identity.
const COOL_HUE_LO = 180;
const COOL_HUE_HI = 270;
const NEUTRAL_CHROMA_FLOOR = 0.02;
function coolHits(srcRaw) {
    const text = stripComments(srcRaw);
    const hits = [];
    // oklch(<L> <C> <h>) functional literals.
    let m;
    const re = /oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/g;
    while ((m = re.exec(text))) {
        const C = parseFloat(m[2]);
        const h = parseFloat(m[3]);
        if (h >= COOL_HUE_LO && h <= COOL_HUE_HI && C > NEUTRAL_CHROMA_FLOOR)
            hits.push(`oklch(${m[1]} ${m[2]} ${m[3]})`);
    }
    // blue-dominant hex.
    const re3 = /#([0-9a-fA-F]{6})\b/g;
    while ((m = re3.exec(text))) {
        const r = parseInt(m[1].slice(0, 2), 16);
        const g = parseInt(m[1].slice(2, 4), 16);
        const b = parseInt(m[1].slice(4, 6), 16);
        if (b > r + 40 && b > g + 20 && b > 96) hits.push(`#${m[1]}`);
    }
    return hits;
}

// ── E — the blur-engage descend scrim ───────────────────────────────────────────
export function detectE(cssRaw, regsRaw) {
    const v = [];
    const f = {};
    f.cssExists = cssRaw.length > 0;
    if (!f.cssExists) {
        v.push(`E: ${SIRI_CSS} does not exist — the Siri scrim + island recipe is absent`);
        return { violations: v, facts: f };
    }
    const css = stripComments(cssRaw);
    // The @property registration lives in siri.css (colocated with its recipe) — NOT
    // property-regs.css, which is grandfathered over the no-god-module bound and may not
    // grow. property-regs.css is scanned as a fallback (either home is accepted).
    const regs = stripComments(regsRaw);

    // E1 — @property --siri-island-t registered (typed <number>, inherits true).
    const propBlock =
        /@property\s+--siri-island-t\s*\{[\s\S]*?\}/.exec(css)?.[0] ??
        /@property\s+--siri-island-t\s*\{[\s\S]*?\}/.exec(regs)?.[0] ??
        "";
    f.propertyRegistered = propBlock.length > 0;
    f.propertyTypedNumber = /syntax:\s*["']<number>["']/.test(propBlock);
    f.propertyInherits = /inherits:\s*true/.test(propBlock);
    if (!f.propertyRegistered)
        v.push(`E1: @property --siri-island-t is not registered (in ${SIRI_CSS} or ${PROPERTY_REGS}) — a bare var() snaps the morph instead of interpolating`);
    else if (!(f.propertyTypedNumber && f.propertyInherits))
        v.push(`E1: @property --siri-island-t is not the typed inheriting <number> (the cascading-scalar idiom the island + scrim both read)`);

    // Isolate the .siri-scrim recipe body (the scrim rule + its ::after/::backdrop kin).
    const scrimBodies = [...css.matchAll(/\.siri-scrim[^{]*\{[\s\S]*?\}/g)].map((m2) => m2[0]).join("\n");
    f.hasScrim = /\.siri-scrim\b/.test(css);
    // E2 — the blur rides `filter: blur()` on OWN pixels (never backdrop-filter), coupled to t.
    f.scrimFilterBlur = /filter:\s*blur\(/.test(scrimBodies) && /--siri-island-t/.test(scrimBodies);
    f.scrimNoBackdropFilter = !/backdrop-filter\s*:/.test(scrimBodies);
    if (!f.hasScrim)
        v.push(`E2: ${SIRI_CSS} has no .siri-scrim recipe — the descend scrim (the route recedes as Siri rises) is absent`);
    else {
        if (!f.scrimFilterBlur)
            v.push(`E2: .siri-scrim does not ramp \`filter: blur()\` off --siri-island-t — the Safari-safe read-through blur on the content's OWN pixels is missing`);
        if (!f.scrimNoBackdropFilter)
            v.push(`E2: .siri-scrim uses \`backdrop-filter\` — FORBIDDEN (it mis-composites on WebKit); the scrim must blur the content's OWN pixels via \`filter: blur()\``);
    }
    // E3 — OVERSIZED (a scale past 1 coupled to the scalar so the blur edge clears the gutter).
    f.scrimOversize = /transform:\s*scale\([^)]*--siri-island-t/.test(scrimBodies);
    if (f.hasScrim && !f.scrimOversize)
        v.push(`E3: .siri-scrim is not OVERSIZED (a \`transform: scale(1 + … * --siri-island-t)\`) — a blurred box shrinks its visible content, revealing a transparent gutter at the edge`);

    // E4 — two dim modes: global (::backdrop) + local (a bounded [data-siri-scrim] panel).
    f.scrimGlobalBackdrop = /\.siri-scrim::backdrop/.test(css);
    f.scrimLocalMode = /\[data-siri-scrim=["']local["']\]/.test(css);
    f.scrimGlobalMode = /\[data-siri-scrim=["']global["']\]/.test(css);
    if (!(f.scrimGlobalBackdrop && f.scrimGlobalMode && f.scrimLocalMode))
        v.push(`E4: the scrim does not carry BOTH dim modes — the global \`::backdrop\` (a top-layer Siri) + the local \`[data-siri-scrim="local"]\` panel`);

    // E5 — PRM carve present.
    f.scrimPrmCarve = /@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(css) && /\.siri-scrim\s*\{\s*transform:\s*none/.test(css.replace(/\s+/g, " "));
    if (!f.scrimPrmCarve)
        v.push(`E5: no \`@media (prefers-reduced-motion: reduce)\` carve zeroing the scrim's oversize transform — PRM must drop the spatial scale`);
    return { violations: v, facts: f };
}

// ── S — the glass island (4 forms, ONE scalar, no second engine) ─────────────────
export function detectS(componentRaw, composableRaw, constantsRaw, cssRaw) {
    const v = [];
    const f = {};
    f.componentExists = componentRaw.length > 0;
    f.composableExists = composableRaw.length > 0;
    if (!f.componentExists)
        v.push(`S: ${COMPONENT} does not exist — the Siri island component is absent`);
    if (!f.composableExists)
        v.push(`S: ${COMPOSABLE} does not exist — the useSiriDock seam is absent`);
    if (!f.componentExists || !f.composableExists) return { violations: v, facts: f };

    const comp = stripComments(componentRaw);
    const seam = stripComments(composableRaw);
    const konst = stripComments(constantsRaw);
    const css = stripComments(cssRaw);

    // S1 — the component composes useSiriDock.
    f.componentComposesSeam = /\buseSiriDock\s*[(<]/.test(comp) && /useSiriDock/.test(comp);
    if (!f.componentComposesSeam)
        v.push(`S1: ${COMPONENT} does not compose useSiriDock — the island chrome must ride the seam`);

    // S2 — the seam composes useDockSpring + useLiquidReveal, ZERO new SpringProgress.
    f.seamComposesDockSpring = /\buseDockSpring\s*\(/.test(seam);
    f.seamComposesLiquidReveal = /\buseLiquidReveal\s*\(/.test(seam);
    f.seamNoRawSpring = !/\bnew\s+SpringProgress\s*\(/.test(seam);
    if (!f.seamComposesDockSpring)
        v.push(`S2: useSiriDock does not compose useDockSpring — the form morph must ride the ONE dock spring factory, not a fresh clock`);
    if (!f.seamComposesLiquidReveal)
        v.push(`S2: useSiriDock does not compose useLiquidReveal — the island must bloom FROM the trigger (the iOS-27 source-rect reveal)`);
    if (!f.seamNoRawSpring)
        v.push(`S2: useSiriDock instantiates a raw \`new SpringProgress(\` — the seam must DRIVE the factory, never a second engine`);

    // S3 — FOUR forms on ONE --siri-island-t scalar (√φ ladder, forms-are-DATA).
    const formsBlock = /SIRI_FORMS\s*:[^=]*=\s*\[([\s\S]*?)\]\s*as const/.exec(konst)?.[1] ?? "";
    f.formCount = (formsBlock.match(/\bid:\s*["']/g) || []).length;
    f.sqrtPhiDeclared = /SIRI_SQRT_PHI\b/.test(konst);
    f.seamWritesScalar = /setProperty\(\s*["']--siri-island-t["']/.test(seam);
    if (f.formCount !== 4)
        v.push(`S3: SIRI_FORMS declares ${f.formCount} forms — the island morphs through EXACTLY FOUR (dormant · listening · thinking · responding)`);
    if (!f.sqrtPhiDeclared)
        v.push(`S3: SIRI_SQRT_PHI (the √φ silhouette ladder) is not declared in constants.ts — the forms-are-DATA proportional growth is missing`);
    if (!f.seamWritesScalar)
        v.push(`S3: useSiriDock does not write \`--siri-island-t\` — the ONE morph scalar the island + scrim read is not driven`);

    // S4 — clip-aperture + overlapping content crossfade off the scalar.
    f.clipAperture = /overflow:\s*clip/.test(css) || /clip-path:/.test(css);
    f.formCrossfade = /\.siri-form\b/.test(css) && /opacity:[\s\S]*--siri-island-t/.test(css);
    if (!f.clipAperture)
        v.push(`S4: ${SIRI_CSS} has no clip-aperture (\`overflow: clip\` / \`clip-path\`) — the morph must read as ONE surface reshaping, not stacked plates spilling out`);
    if (!f.formCrossfade)
        v.push(`S4: the .siri-form layers do not crossfade off --siri-island-t — the overlapping content crossfade is missing`);

    // S5 — warm under-glow (a warm-hue glow, never cool teal/navy).
    f.underglow = /\.siri-underglow\b/.test(css) && /radial-gradient/.test(css);
    const glowCool = coolHits(cssRaw);
    f.underglowWarm = glowCool.length === 0;
    if (!f.underglow)
        v.push(`S5: ${SIRI_CSS} has no .siri-underglow radial bloom — the warm "lit from within" register is missing`);
    if (!f.underglowWarm)
        v.push(`S5: ${SIRI_CSS} carries a cool teal/navy color event (${glowCool.join(", ")}) — the under-glow must be WARM (the warm-cream identity)`);

    // S6 — role="status" on the island.
    f.roleStatus = /role=["']status["']/.test(comp);
    if (!f.roleStatus)
        v.push(`S6: ${COMPONENT} does not carry \`role="status"\` — the island's live announcement region is absent`);

    // S7 — box-inviolate: the island reserves its OWN static peak (a reserve, not an animated
    // dimension) AND does NOT write a `.glass-dock` box size (it reads the pill, never the box).
    f.islandStaticReserve = /\.siri-island\s*\{[\s\S]*?inline-size:[^;]+;[\s\S]*?block-size:/.test(css);
    f.noDockBoxMutation = !/\.glass-dock\s*\{[\s\S]*?(?:inline-size|block-size|width|height)\s*:/.test(css);
    if (!f.islandStaticReserve)
        v.push(`S7: .siri-island does not reserve a STATIC peak footprint (inline-size + block-size) — the morph must be the clip-aperture over a reserved box, never an animated dimension`);
    if (!f.noDockBoxMutation)
        v.push(`S7: ${SIRI_CSS} mutates a \`.glass-dock\` box dimension — the island is box-INVIOLATE (it reads the dock pill as its bloom source, never touches the dock box)`);
    return { violations: v, facts: f };
}

// ── W — the demo-private WebGL2 waveform ─────────────────────────────────────────
export function detectW(waveformRaw) {
    const v = [];
    const f = {};
    f.exists = waveformRaw.length > 0;
    if (!f.exists) {
        v.push(`W: ${WAVEFORM} does not exist — the demo-private WebGL2 waveform is absent`);
        return { violations: v, facts: f };
    }
    const src = stripComments(waveformRaw);

    // W1 — composes the shared WebGL substrate (WebGL2-only).
    f.composesSubstrate = /createWebGLCanvas\s*\(/.test(src) && /useWebGLCanvas/.test(src);
    if (!f.composesSubstrate)
        v.push(`W1: ${WAVEFORM} does not compose createWebGLCanvas (the shared WebGL2 substrate) — a hand-rolled rAF/context is forbidden`);

    // W2 — NO .wgsl (WebGL2-only fence — no WGSL primary).
    f.noWgsl = !/\.wgsl/.test(src) && !/@compute\b/.test(src) && !/wgsl/i.test(src);
    if (!f.noWgsl)
        v.push(`W2: ${WAVEFORM} references WGSL — the waveform is WebGL2-ONLY (no .wgsl primary)`);

    // W3 — push-API level(0..1): a `level` prop AND a `uLevel` shader uniform.
    f.hasLevelProp = /level\??\s*:\s*number/.test(src) || /defineProps<\{[^}]*\blevel\b/.test(src);
    f.hasLevelUniform = /uLevel/.test(src);
    if (!(f.hasLevelProp && f.hasLevelUniform))
        v.push(`W3: the waveform has no push-API level(0..1) — a \`level\` prop wired to a \`uLevel\` uniform (the amplitude useSiriDock pushes per form)`);

    // W4 — in-shader OKLab-RECTANGULAR ramp (Ottosson matrices, computed in-shader).
    f.oklabRamp = /oklab/i.test(src) && /0\.3963377774/.test(src) && /4\.0767416621/.test(src);
    if (!f.oklabRamp)
        v.push(`W4: the shader has no in-shader OKLab→linear (Ottosson) ramp — the warm color must be computed in OKLab-rectangular, not a baked RGB literal`);

    // W5 — warm-dominant / teal-navy-purge (no cool oklch / blue hex in the shader).
    const cool = coolHits(waveformRaw);
    f.warmIdentity = cool.length === 0;
    if (!f.warmIdentity)
        v.push(`W5: ${WAVEFORM} carries a cool teal/navy color event (${cool.join(", ")}) — the waveform is WARM-dominant (the warm-cream identity; a teal Siri-rainbow is forbidden)`);
    return { violations: v, facts: f };
}

// ── D — the integration story ────────────────────────────────────────────────────
export function detectD(storyRaw) {
    const v = [];
    const f = {};
    f.exists = storyRaw.length > 0;
    if (!f.exists) {
        v.push(`D: ${STORY} does not exist — the Siri dock-capability integration story is absent`);
        return { violations: v, facts: f };
    }
    const src = stripComments(storyRaw);

    // D1 — the "Search or ask" pill composes the EXISTING useDockSearch pipeline.
    f.composesDockSearch = /useDockSearch/.test(src) || /searchOptions/.test(src);
    f.searchThreaded = /:search-options=|searchOptions/.test(src);
    if (!(f.composesDockSearch && f.searchThreaded))
        v.push(`D1: the story does not thread the EXISTING useDockSearch pipeline (the searchOptions the capability composes) — the Search-or-ask pill must ride the ONE matcher`);

    // D2 — the island renders off the #rail / .glass-dock-frame escape.
    f.railEscape = /#rail|name=["']rail["']/.test(src) && /<SiriDockCapability/.test(src);
    if (!f.railEscape)
        v.push(`D2: the island does not render off the \`#rail\` escape — Siri must live BESIDE the dock via the .glass-dock-frame/#rail (box-inviolate), not inside the dock box`);

    // D3 — composes the shipped capability + the demo-private waveform (no demo-local re-fork).
    f.composesCapability = /import\s*\{[^}]*\bSiriDockCapability\b[^}]*\}\s*from\s*["']@glass\/components\/custom\/dock["']/.test(src);
    f.composesWaveform = /<SiriWaveform\b/.test(src) && /import\s+SiriWaveform\s+from/.test(src);
    if (!f.composesCapability)
        v.push(`D3: the story does not import <SiriDockCapability> from the dock package — it must compose the SHIPPED capability, not a demo-local re-fork`);
    if (!f.composesWaveform)
        v.push(`D3: the story does not mount the demo-private <SiriWaveform> into the island — the waveform seam is not exercised`);

    // D4 — no second search engine (no re-forked matcher in the story).
    f.noSecondMatcher = !/useFuzzySearch\s*\(/.test(src) && !/function\s+fuzzyMatch/.test(src);
    if (!f.noSecondMatcher)
        v.push(`D4: the story re-forks a matcher (useFuzzySearch / a hand fuzzyMatch) — the pipeline is useDockSearch's ONE matcher, composed by the capability, never re-forked in the demo`);
    return { violations: v, facts: f };
}

// ── the /dock re-export + no-subpath/no-api fences (the ruling-4 floor) ───────────
export function detectFences(dockIndexRaw, cssRootRaw) {
    const v = [];
    const f = {};
    const idx = stripComments(dockIndexRaw);
    // The capability re-exports from the /dock subpath (NOT a new subpath / api entry).
    f.dockReExports = /SiriDockCapability/.test(idx) && /useSiriDock/.test(idx);
    if (!f.dockReExports)
        v.push(`FENCE: the /dock barrel does not re-export SiriDockCapability + useSiriDock — the capability reaches consumers via /dock ONLY (NO new subpath, NO api/ entry)`);
    // The Siri CSS is wired into the dock cascade.
    f.cssImported = /@import\s+["']\.\/dock\/siri\.css["']/.test(stripComments(cssRootRaw));
    if (!f.cssImported)
        v.push(`FENCE: ${DOCK_CSS} does not @import ./dock/siri.css — the Siri recipe never reaches the /styles cascade`);
    // NO src/subpaths/siri-*.ts + NO api/ siri entry (the ruling-4 floor).
    f.noSubpath = !existsSync(resolve(ROOT, "src/subpaths/siri-island.ts")) && !existsSync(resolve(ROOT, "src/subpaths/siri.ts"));
    if (!f.noSubpath)
        v.push(`FENCE: a src/subpaths/siri-*.ts exists — Siri is a DOCK CAPABILITY, NO published subpath (ruling 4)`);
    const apiRaw = readRel("src/api/index.ts");
    f.noApiEntry = !/\bSiri(Dock|Island|Form|Waveform)/.test(stripComments(apiRaw));
    if (!f.noApiEntry)
        v.push(`FENCE: src/api/index.ts publishes a Siri* symbol — Siri carries NO api/ entry (ruling 4)`);
    return { violations: v, facts: f };
}

// ── self-test bites — the detectors MUST bite their planted fixtures ─────────────
function selfTest() {
    const failures = [];

    // E bite — a scrim using backdrop-filter (the WebKit-broken form) reds E2.
    const E_BACKDROP = `@property --siri-island-t { syntax: "<number>"; inherits: true; }`;
    const E_BAD_CSS = `.siri-island { inline-size: 10rem; block-size: 5rem; overflow: clip; }
.siri-underglow { background: radial-gradient(circle, oklch(0.86 0.1 68), transparent); }
.siri-form { opacity: calc(1 - var(--siri-island-t)); }
.siri-scrim { backdrop-filter: blur(calc(12px * var(--siri-island-t))); transform: scale(calc(1 + 0.02 * var(--siri-island-t))); }
.siri-scrim::backdrop { background: black; }
.siri-scrim[data-siri-scrim="global"] { --x: 1; }
.siri-scrim[data-siri-scrim="local"] { --x: 1; }
@media (prefers-reduced-motion: reduce) { .siri-scrim { transform: none; } }`;
    if (!detectE(E_BAD_CSS, E_BACKDROP).violations.some((x) => /FORBIDDEN/.test(x)))
        failures.push("E self-test BROKE — a backdrop-filter scrim did not red E2 (the WebKit-broken form)");

    // S bite — a seam with a raw `new SpringProgress(` reds S2 (the second engine).
    const S_RAW_SEAM = `import { useDockSpring } from "./useDockSpring";
import { useLiquidReveal } from "../../../../composables/motion/useLiquidReveal";
export function useSiriDock(o) {
  const s = new SpringProgress({ response: 0.3 });
  useDockSpring({}); useLiquidReveal(o.island, {});
  el.style.setProperty("--siri-island-t", "1");
}`;
    const S_OK_COMP = `<script setup>const siri = useSiriDock({});</script><template><div role="status"></div></template>`;
    const S_OK_KONST = `export const SIRI_SQRT_PHI = 1.272;
export const SIRI_FORMS = [{ id: "a" },{ id: "b" },{ id: "c" },{ id: "d" }] as const;`;
    const S_OK_CSS = `.siri-island { inline-size: 10rem; block-size: 5rem; overflow: clip; } .siri-underglow { background: radial-gradient(circle, oklch(0.86 0.1 68), transparent); } .siri-form { opacity: calc(1 - var(--siri-island-t)); }`;
    if (!detectS(S_OK_COMP, S_RAW_SEAM, S_OK_KONST, S_OK_CSS).violations.some((x) => /second engine|raw/.test(x)))
        failures.push("S self-test BROKE — a seam with a raw new SpringProgress( did not red the second-engine bite");

    // S bite — a wrong form count (3, not 4) reds S3.
    const S_THREE = `export const SIRI_SQRT_PHI = 1.272; export const SIRI_FORMS = [{ id: "a" },{ id: "b" },{ id: "c" }] as const;`;
    const S_OK_SEAM = `import { useDockSpring } from "./useDockSpring"; import { useLiquidReveal } from "x"; export function useSiriDock(o){ useDockSpring({}); useLiquidReveal(o.island,{}); el.style.setProperty("--siri-island-t","1"); }`;
    if (!detectS(S_OK_COMP, S_OK_SEAM, S_THREE, S_OK_CSS).violations.some((x) => /EXACTLY FOUR/.test(x)))
        failures.push("S self-test BROKE — a 3-form SIRI_FORMS did not red the four-forms bite");

    // W bite — a shader with a cool navy oklch reds W5.
    const W_TEAL = `import { createWebGLCanvas } from "x";
const props = defineProps<{ level?: number }>();
const FRAG = "uniform float uLevel; vec3 c = vec3(0.3963377774); float k = 4.0767416621; oklab; gl_FragColor = vec4(0.0);";
// a cool navy default
const c = "oklch(0.4 0.15 250)";`;
    if (!detectW(W_TEAL).violations.some((x) => /teal\/navy/.test(x)))
        failures.push("W self-test BROKE — a cool navy oklch in the shader did not red W5");

    // W bite — a WGSL reference reds W2.
    const W_WGSL = `import { createWebGLCanvas } from "x"; const props = defineProps<{ level?: number }>(); const SHADER = "@compute wgsl uLevel oklab 0.3963377774 4.0767416621";`;
    if (!detectW(W_WGSL).violations.some((x) => /WebGL2-ONLY/.test(x)))
        failures.push("W self-test BROKE — a WGSL reference did not red the WebGL2-only bite");

    // D bite — a story that renders the island OUTSIDE the #rail escape reds D2.
    const D_NO_RAIL = `import { SiriDockCapability } from "@glass/components/custom/dock";
import SiriWaveform from "./SiriWaveform.vue";
const searchOptions = {};
// no #rail template — the island sits in the dock body
`;
    if (!detectD(D_NO_RAIL).violations.some((x) => /#rail/.test(x)))
        failures.push("D self-test BROKE — a story rendering the island outside #rail did not red D2");

    // D bite — a story re-forking useFuzzySearch reds D4.
    const D_FORK = `import { SiriDockCapability } from "@glass/components/custom/dock";
import SiriWaveform from "./SiriWaveform.vue";
const searchOptions = {};
const x = useFuzzySearch({ items: [] });
// <template #rail><SiriDockCapability><SiriWaveform/></SiriDockCapability></template>
`;
    if (!detectD(D_FORK).violations.some((x) => /re-forks a matcher/.test(x)))
        failures.push("D self-test BROKE — a story re-forking useFuzzySearch did not red D4");

    return failures;
}

// ── compose ─────────────────────────────────────────────────────────────────────
export function detect() {
    const cssRaw = readRel(SIRI_CSS);
    const regsRaw = readRel(PROPERTY_REGS);
    const componentRaw = readRel(COMPONENT);
    const composableRaw = readRel(COMPOSABLE);
    const constantsRaw = readRel(CONSTANTS);
    const waveformRaw = readRel(WAVEFORM);
    const storyRaw = readRel(STORY);
    const dockIndexRaw = readRel("src/components/custom/dock/index.ts");
    const cssRootRaw = readRel(DOCK_CSS);

    const e = detectE(cssRaw, regsRaw);
    const s = detectS(componentRaw, composableRaw, constantsRaw, cssRaw);
    const w = detectW(waveformRaw);
    const d = detectD(storyRaw);
    const fences = detectFences(dockIndexRaw, cssRootRaw);
    const selfTestFailures = selfTest();

    const violations = [
        ...e.violations,
        ...s.violations,
        ...w.violations,
        ...d.violations,
        ...fences.violations,
        ...selfTestFailures.map((x) => `SELF-TEST: ${x}`),
    ];
    return {
        violations,
        facts: { E: e.facts, S: s.facts, W: w.facts, D: d.facts, fences: fences.facts, selfTestFailures },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_SIRI_ARTIFACT", "BG-siri");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:siri",
        command: COMMAND,
        note: "BG.W-SIRI-DOCK-CAPABILITY — Siri as a DOCK CAPABILITY, ONE gate 4 arms (E blur-engage scrim · S the 4-form island on ONE --siri-island-t scalar composing useDockSpring+useLiquidReveal, ZERO new SpringProgress · W the demo-private WebGL2 warm OKLab waveform, no WGSL · D the integration story off the #rail escape composing the EXISTING useDockSearch) + the ruling-4 no-subpath/no-api fences. The binding PAINT is the proof:bg-gestalt Siri verdict + tests-visual (both engines, both modes); this gate proves the CAPABILITY structure, not the paint.",
        facts,
        violations,
    });
    console.log(`proof:siri — ${status.toUpperCase()}`);
    console.log(`  E scrim: prop=${facts.E.propertyRegistered ?? false} filterBlur=${facts.E.scrimFilterBlur ?? false} noBackdrop=${facts.E.scrimNoBackdropFilter ?? false} oversize=${facts.E.scrimOversize ?? false} 2modes=${(facts.E.scrimGlobalBackdrop && facts.E.scrimLocalMode) ?? false} prm=${facts.E.scrimPrmCarve ?? false}`);
    console.log(`  S island: composesSeam=${facts.S.componentComposesSeam ?? false} dockSpring=${facts.S.seamComposesDockSpring ?? false} liquidReveal=${facts.S.seamComposesLiquidReveal ?? false} noRawSpring=${facts.S.seamNoRawSpring ?? false} forms=${facts.S.formCount ?? 0} role=${facts.S.roleStatus ?? false} boxInviolate=${facts.S.noDockBoxMutation ?? false}`);
    console.log(`  W waveform: substrate=${facts.W.composesSubstrate ?? false} noWgsl=${facts.W.noWgsl ?? false} level=${(facts.W.hasLevelProp && facts.W.hasLevelUniform) ?? false} oklab=${facts.W.oklabRamp ?? false} warm=${facts.W.warmIdentity ?? false}`);
    console.log(`  D integration: dockSearch=${facts.D.composesDockSearch ?? false} rail=${facts.D.railEscape ?? false} capability=${facts.D.composesCapability ?? false} waveform=${facts.D.composesWaveform ?? false} noSecondMatcher=${facts.D.noSecondMatcher ?? false}`);
    console.log(`  fences: dockReExport=${facts.fences.dockReExports} cssImport=${facts.fences.cssImported} noSubpath=${facts.fences.noSubpath} noApi=${facts.fences.noApiEntry}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const x of violations) console.log(`  ✗ ${x}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
