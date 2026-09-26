# W-G.4 · W-AURORA-GREENFIELD: six deposition bodies in WGSL, a gamut-honest living field, the register at ten, and one studio contract for every viz · 11.0.0

| field | value |
|---|---|
| seat | band-G wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b37a37c3` (`src`, `demo`, `tests` identical to `f3ad78d0`), scratch worktree, demo on :5987, Chromium on Metal with WebGPU (adapter `apple/metal-3`); probe library in W-G.1 appendix A |
| ships in | 11.0.0 |
| families | F-48, the aurora split (`audit/REGISTRY.md:1171-1183`): L01b-49, R2-06-04 (the VizStudio contract). F-47's medium clause that W-G.1 hands over (§0 there): L05a-01 and L10-02's paint half, C-13a's paint half (R9), C-13b (R10). Inbound: UIA-V-46, UIA-V-154 (`INBOUND-MAP.md:407,411`); O-49 (strip-scale aurora motion) and A2-KE-L1-26 (`followPointer`), both routed here by W-B.2 (`W-B.2.md:89,91`) |
| a disease row | #49 GF-AURORA rode BJ and BK at W0 (`census-register-a.md:56`); deciding it is this wave (CH:23) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 0 · The spec of record, and what BL changes in it

The spec of record is GF-AURORA PASS 4 TERMINAL (`docs/tranches/BJ/addenda/2026-07-24-refinement/GREENFIELD-TERMINAL.md`, the `# GF-AURORA` section): §3 W0 harness, §4 W-AURORA-CONFIG, §5 W-AURORA-BODIES, §6 W-AURORA-FIELD, §7 gates, §8 R-AURORA-REGISTER. BL takes it whole with four changes, each forced by a ruling made since:

1. **No WebGL2 salvage.** §4's "~135-line salvage that keeps WebGL2's smooth field linking", the engine-derived "requires WebGPU" option rows, and the typed reason `medium-unsupported` are struck: W-G.1 deletes the WebGL2 arm whole (`BK/PORT.md:115`, E-2). Every body runs on the one engine; a host without WebGPU gets `onInitError` with W-G.1's reasons and the CSS ground.
2. **W0 is on disk.** The harness landed in BK: `?probe=1` (`demo/stories/substrates/aurora.vue:83-87`, `AuroraStage.vue:26`), `?aurmedium=` through the atoms door (`aurora.vue:89-99`), and the settle beacon `data-aurora-settled` (`Aurora.vue:200-209`, `AURORA_SETTLE_MS` exported at `index.ts:16`). At this seat the beacon arrived 2.4 to 3.0 s after load on each of six forced mediums and the medium combobox read the forced label every time (appendix A output). G-HARNESS-DRIVES clauses (a), (b) and (d) are cured at HEAD; clause (c), the `?engine=webgl2` pin, is deleted by W-G.1.
3. **The V-A95 rider is gone** (W-B.5 RETIRE, re-trigger on a real-pointer reproduction). π-REVERSE-DRAG is not owed here.
4. **π-ARCHIVE is banked** (`BK/execution/2026-08-25-pi-band/PI-CENSUS.md:147`; the `pi-ARCHIVE-mediums-gl-*` and `pi-ARCHIVE-presets-gl-*` sheets): the per-dab GLSL cascade is the authoring reference for `dab` and `stick`, which W-G.1 deleted.

## 1 · What it closes

| id | what |
|---|---|
| L01b-49, #49 | GF-AURORA stopped at W0: CONFIG, BODIES, FIELD and REGISTER unbuilt |
| L05a-01, L10-02 (paint half), C-13a, UIA-V-154 | oil, vangogh, oil-pastel and kuwahara paint one body (`aurora-mediums.wgsl.ts:396-401`); "textured media look identical to Smooth" |
| C-13b (R10) | `?aurmedium=` paints 7 of 10 mediums identically because the deposition floor `DEP_MIN` was never taken (`git grep DEP_MIN -- src` → 0) |
| UIA-V-46 | Oil Pastel turns the atmosphere black (oil-pastel is one of the collapsed ids; the black ground is re-read in π-BODIES) |
| F05 (GF-AURORA §6) | the ambient field does not visibly live: light 30 s Δmax 3/255 |
| R2-06-04, BD2 A3, A38, A41, A42, A43 | the viz interaction layer (per-viz configurator, keyboard, pointer, perf budget) has no owner |
| O-49 | value.js asks for a strip-scale aurora that moves on the CSS substrate (`<AuroraStrip>` or a `glass-aurora-drift` utility) |
| A2-KE-L1-26 | Aurora pointer-follow is hand-wired twice in consumers (keyframes `HeroAurora.vue:211-242`, value.js `useAtmosphere.ts:377-394`) |

## 2 · The defect at HEAD

- **The dispatch.** `src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts:399` `if (medium == 3 || medium == 5 || medium == 6 || medium == 7) { return mediumKuwahara(col, p, t); }`, and `:402` `return col;` (an identity tail above every body).
- **The enum.** `constants/presets.ts:79-89`: ten members (`smooth`, `pastel`, `watercolor`, `oil`, `crayon`, `vangogh`, `oil-pastel`, `kuwahara`, `metal`, `metal-gradient`).
- **The dual config layer.** `composables/atoms.ts` (480 lines) and `atoms-fields.ts` (240) translate an atoms shape into `AuroraConfig`; `resolveAtoms`, `configToAtoms`, `DEFAULT_ATOMS` and the `AuroraAtoms*` types are exported (`index.ts:60-76`).
- **Dead axes.** `vividness` and `huePath`: 88 lines in `src`.
- **The register.** `demo/stories/substrates/aurora/presets.ts`: 17 preset keys.
- **No studio contract.** `demo/stories/substrates/constellation.vue` mounts no Configurator and registers no shortcut; `blob.vue` and `fourier-field.vue` register no shortcut; `useVizKeyboard` has 0 hits in `src` and `demo`.
- **No strip motion, no follow.** `git grep -c glass-aurora-drift -- src` → 0; `followPointer` has 0 hits in `src/components/aurora`.

In paint (appendices A and B; `cap/g4-*.json`, captures hashed below):

| probe | HEAD |
|---|---|
| appendix A: `/substrates/aurora?aurmedium=<m>&probe=1`, stage scrolled into view, beacon-gated, element screenshot of `canvas.aurora-canvas`; structure vector (meanL, sdL, hf, aniso) | smooth `0.89731 / 0.0351 / 0.003935 / 0.73648`; vangogh `0.89772 / 0.0348 / 0.00395 / 0.73846`; kuwahara `0.89728 / 0.03513 / 0.003955 / 0.73683`; oil `0.89734 / 0.03508 / 0.003967 / 0.73676`; oil-pastel `0.8973 / 0.03511 / 0.00394 / 0.73655`; crayon `0.87537 / 0.04147 / 0.004653 / 0.78144`. **15 of 15 pairs** separate on fewer than 2 channels by 25 %; five mediums agree to 3-4 significant figures |
| appendix B: `/`, `main, header, nav` hidden, 30 s pair | light: Δmax **3**/255, **6.94 %** of pixels moved ≥ 2, mean chroma **0.0231**, mean L **0.9182**; dark: Δmax **9**/255, **67.94 %** moved, mean chroma **0.0184**, mean L **0.3364** |

Captures (band-G scratch `cap/`, sha256 prefix): `g4-medium-smooth.png` `d98bcdc74a0f`, `-vangogh` `b347b21be86d`, `-kuwahara` `9dc738e35267`, `-oil` `9803330ef2e9`, `-oil-pastel` `30d7bf572682`, `-crayon` `81a2ce411229`; `g4-field-light-t0/t30.png` `d240fd744d2c`/`9037f7cf11ea`, `g4-field-dark-t0/t30.png` `2ab6f6d0b915`/`8ac891f07025`.

## 3 · The cure

Order (GF-AURORA §9): FIELD first, CONFIG, then BODIES, then REGISTER; the studio contract, the strip and the follow prop ride alongside.

1. **W-AURORA-FIELD** (GF-AURORA §6, verbatim constants): L anchors 0.935 light and 0.205 dark with a span ≤ 0.020; per-stop chroma 0.85 × the sRGB ceiling at (L anchor, hue); structure and temporal life carried by hue (route hue ± 26° spatial, ± 26° breath at 48 s, per-nucleus phase 0.618 turn). A CPU spring integrator drives the nuclei (ζ 0.82, the `dock` row of `springPresets.ts` as read on disk at the wave; period 12 s = breathPeriod / 4; Poisson re-target mean 24 s in a 0.10-unit disc) through the per-frame uniform write (`wgpuSetup.ts` repacks the block per frame); the closed-form orbit in `aurora.wgsl.ts` is removed in the same change. Applied to the shell config (light and dark) and the dock routes' configs. The drift clock is W-G.3's (30 Hz at rest).
2. **W-AURORA-CONFIG** (§4): `AuroraMedium = "smooth" | "wash" | "chalk" | "dab" | "stick" | "knife"`; `AuroraMediumSpec` with `deposition` required on every non-smooth member and `grain?`; `AuroraFinishSpec` `{ finish?: "matte" } | { finish: "metal"; flake? }` offered on dab, stick and knife. The atoms shape is the config: `atoms.ts` and `atoms-fields.ts` stop translating and shrink to the per-body deposition-to-uniform map inside the uniform bridge. The identity closes at three layers: the type (deposition required), the bridge (`max(DEP_MIN[medium], deposition)` with `DEP_MIN = { wash: 0.15, chalk: 0.20, dab: 0.25, stick: 0.20, knife: 0.20 } satisfies Record<Exclude<AuroraMedium,"smooth">, number>`), the shader (an exhaustive `switch` whose default arm paints the smooth body; the `return col;` tail is deleted). `vividness`, `DEFAULT_VIVIDNESS`, `VIVID_TARGET`, `huePath` and `AuroraHuePath` are deleted; `tensor` and `curl` join the studio's options.
3. **W-AURORA-BODIES** (§5): wash (edge-darkening migration and valley granulation), chalk (tooth-peak deposit, ≤ 4 quantised directions, boundary overshoot; absorbs pastel and crayon), dab (crescent SDF marks on a darkened underpainting, analytic impasto crown), stick (blunt capsules with overlap drag and analytic burnish), knife (the existing anisotropic Kuwahara as the flatten operator plus a ridge relight and a razor-edge term). Each body is authored once in WGSL, with no derivative builtins; dab and stick are authored against π-ARCHIVE's GLSL sheets. Knife and FOIL (metal over knife) hold ≤ 2.0 ms/frame at 1440×900 DPR 1 on the reference GPU, measured with `timestamp-query` (π-KNIFE-PERF); the first lever is TAPS × RINGS (`mediumKuwahara` runs 4 × 8 at `aurora-mediums.wgsl.ts:268-277`).
4. **R-AURORA-REGISTER** (§8), after G4-G2 is green: the demo register is exactly `DAWN, SKY, SUNSET, DUSK` (atmospheres; DUSK re-founded low-key, ratified by the owner at π-GALLERY through W-B.4) and `WASH, CHALK, DAB, STICK, KNIFE, FOIL` (specimens). The seven kills and renames are §8's; `PAPER_WASH_GROUND` is re-authored against `chalk` under the same name (atlas spreads it, `atlas/src/platform/chrome/background/composables/useAuroraConfig.ts:357`). Same commit: the preset count comes from the source in W-A.4's GPU leg, the label-clicking visual specs select by key, and the stale headers §8 lists are corrected. `SPEEDTEST` moves to speedtest's tranche (its config ships `medium: "smooth"`, `speedtest/src/config/auroraConfig.ts:207`). `source: "image"` is W-L.6's P-6 census row.
5. **One studio contract for every viz** (R2-06-04). `demo/chassis/viz-studio/VizStudio.vue` wraps each substrate story (aurora, blob, constellation, fourier field): the stage; a Configurator pane (`layout="detached"`, 10.1.0) generated from the viz's config fields, each row with its live range; one shortcut group per viz through `registerShortcut` (preset or seed cycling, pause, reset); the viz's pointer interaction (aurora nucleus drag and `followPointer`, blob touch, constellation click-warp and pinning, fourier-field scrub); and a perf readout (presented frames/s from the lifecycle, the effective DPR, the device limit). The budget every viz meets: one shared device, ≤ 30 presented frames/s at rest (W-G.3), DPR at or under `budget.ts`'s cap, knife ≤ 2.0 ms/frame. BD2 A43 (a draw-your-own fourier path in the library) is RETIRED: the one consumer draws its contours itself (`fourier-analysis/web/src/components/visualization/ContourEditorCanvas.vue`), and the field renders the path it is given. The constellation's click-to-add is RETIRED on the same ground: no consumer asks for it (the slides list, W-B.9 §2, does not).
6. **O-49: `glass-aurora-drift`.** An `@utility` in the aurora subpath's CSS: an oversized `::before` carrying `--aurora-ground` (the `auroraGround` layers for a palette, W-G.1 §3.5) whose `translate` loops on the short axis only, linear, inside `@media (prefers-reduced-motion: no-preference)`; no colour moves along the long axis, and it is compositor-only (W-F.6's law). A consumer sets `--aurora-ground` from `./aurora-palette` (W-G.7) and adds the class.
7. **A2-KE-L1-26: `followPointer`.** `Aurora` gains `followPointer?: boolean`: a window-level pointer listener that calls `setCursor` in stage coordinates, stops under reduced motion and while the document is hidden, and clears on `pointerleave` of the window. Probe mode (`?probe=1`) stamps the cursor it last wrote as `data-aurora-cursor` on the root, the witness G4-G10 reads. Two consumer copies collapse into the prop (the ≥ 2 sites rule).
8. **OW-9a's asks.** W-B.14 recommends RETIRE for R36, R39, R40, R41 and A6. If the owner answers BUILD for any of them, this wave carries it with a born-RED e2e (`W-B.14.md` §3.2); the answer is quoted in the ledger row either way.

## 4 · Files it touches

`src/components/aurora/`: `Aurora.vue`, `index.ts`, `README.md`, `DESIGN.md`, `composables/{atoms,atoms-fields,color,frameLoop,runtime,uniformBridge,uniformBridgeWGPU,useAurora,useCursorInteraction,wgpuSetup}.ts`, `constants/{presets,budget}.ts`, `constants/shaders/{aurora,aurora-mediums}.wgsl.ts`, a new `styles.css` for the drift utility (delivered by W-G.7's per-subpath CSS). `demo/stories/substrates/{aurora.vue,blob.vue,constellation.vue,fourier-field.vue}`, `demo/stories/substrates/aurora/{presets.ts,config/options.ts,AuroraStage.vue,NucleiOverlay.vue}`, new `demo/chassis/viz-studio/`. Tests: `tests-visual/wired/aurora-medium-distinct.spec.ts` (appendix A), `tests-visual/wired/aurora-field-alive.spec.ts` (appendix B), the eight label-clicking aurora specs moved to key selection, `tests/components/aurora/*` for the enum, bridge and dispatch. `MIGRATION.md`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| G4-G1 · the enum and the floor | `node -e` over `constants/presets.ts`: `AuroraMedium`'s members are exactly `smooth, wash, chalk, dab, stick, knife`, and `git grep -q 'DEP_MIN' -- src/components/aurora` | both | **FAIL**: 10 members; `DEP_MIN` 0 hits |
| G4-G2 · every body distinct | appendix A over the six bodies (the medium list read from the enum): every pair separates on ≥ 2 of (meanL, sdL, hf, aniso) by ≥ 25 % relative | 0 collapsed pairs | **15 of 15** pairs collapsed (the ten-member enum's six probed) |
| G4-G3 · the field lives, inside the gamut, at its anchor | appendix B: light Δmax ≥ 6/255 with ≥ 25 % of pixels moved ≥ 2 and mean chroma ≥ 0.026; dark Δmax ≥ 8/255 and mean chroma ≥ 0.033; composited mean L within ± 0.01 of 0.935 (light) and 0.205 (dark) | all clauses | **FAIL**: light Δmax 3, 6.94 %, chroma 0.0231, L 0.9182; dark chroma 0.0184, L 0.3364 |
| G4-G4 · one config layer, no dead axis | `! git grep -nE 'resolveAtoms\|configToAtoms\|DEFAULT_ATOMS\|vividness\|huePath\|AuroraHuePath' -- src` | exit 0 | **exit 1**: 88 lines for `vividness`/`huePath` alone; the atoms exports at `index.ts:60-76` |
| G4-G5 · the register | `node -e` over `demo/stories/substrates/aurora/presets.ts`: `PRESETS`'s keys equal the ten names of §3.4 | equal | **17** keys, none of `DAWN, SKY, WASH, CHALK, DAB, STICK, KNIFE, FOIL` |
| G4-G6 · the register's atmospheres differ | pairwise L-histogram total variation ≥ 0.35 across `DAWN, SKY, SUNSET, DUSK`, beacon-gated `?probe=1` captures | all six pairs | **FAIL**: the four keys do not exist |
| G4-G7 · knife holds its budget | `timestamp-query` over 120 frames of `?aurmedium=knife&probe=1` and of `FOIL`: median GPU pass time ≤ 2.0 ms | both | **FAIL**: `knife` is not a medium (the query parameter matches no option) |
| G4-G8 · the studio contract | `for s in aurora blob constellation fourier-field; do grep -q VizStudio demo/stories/substrates/$s.vue \|\| exit 1; done`, and a browser clause: each of the four routes has `[data-viz-studio]` with a Configurator root and ≥ 1 shortcut in its group | both | **exit 1**: 0 stories; constellation has 0 Configurator and 0 shortcuts |
| G4-G9 · the strip moves | `git grep -q glass-aurora-drift -- src/components/aurora`, and in the harness an element with the class has one running animation whose keyframes touch only `translate`, and 0 running animations under `reducedMotion: 'reduce'` | both | **FAIL**: 0 hits |
| G4-G10 · the follow prop | `<Aurora follow-pointer>` in the harness: a pointer move changes the cursor uniform (the `data-aurora-cursor` witness the probe mode stamps) within one frame; 0 changes under reduced motion | both | **FAIL**: `followPointer` 0 hits in `Aurora.vue` |

Planted bites: route `dab` to `knife`'s function (G4-G2); freeze the integrator (G4-G3's temporal clauses); pass `deposition: 0` with the bridge clamp removed (G4-G2 for that body); restore the `return col;` tail and drop the default arm (a unit test on the dispatch source).

## 6 · π and DELTA obligations

Protocol (GF-AURORA §9, binding): every capture carries `?probe=1` and waits on `[data-aurora-settled]`; no wall-clock waits; screenshots only, never `getContext()` on the page canvas.

- **π-FIELD.** `/` and `/dock/overview`, light and dark, 1440×900 DPR 1 and 393×852 DPR 3, content hidden, 30 s pairs, before (HEAD `g4-field-*`) and after, with appendix B's JSON as the paired reading. The isoluminance check GF-AURORA owes (`--muted-foreground` and the hero `h1` over the composite, both themes, both sizes) is measured in the same run and recorded.
- **π-BODIES.** The six bodies at the probe palette and mid-domain deposition, light and dark, before (HEAD `g4-medium-*`) and after, as one contact sheet per theme; `finish: "metal"` on dab, stick and knife as a second sheet. UIA-V-46's black ground is re-read on `stick` (ex-oil-pastel).
- **π-KNIFE-PERF.** The timestamp trace for G4-G7.
- **π-GALLERY.** The ten presets, light and dark, the DUSK capture for the owner's ratification (W-B.4, OW-7).
- **π-STUDIO.** The four VizStudio routes at 1440×900 and 390×844 (the phone cell's reach is W-E.9's F-33 row; this capture records it).
- **π-STRIP.** A 48×320 strip with `glass-aurora-drift`, 8 frames at 250 ms, light and dark.
- Engines: Chromium on Metal, measured. Playwright WebKit: not run at this seat. Real Safari: UNMEASURED (OW-3); the five new WGSL bodies carry WebKit compile risk, recorded per cell at W-A.6.

## 7 · MIGRATION rows

| removed or changed | replacement |
|---|---|
| `AuroraMedium` `pastel`, `crayon` | `chalk` (deposition = pressure) |
| `watercolor` | `wash` |
| `oil`, `vangogh` | `dab` |
| `oil-pastel` | `stick` |
| `kuwahara` | `knife` |
| `metal`, `metal-gradient` | `{ medium: "knife", finish: "metal", flake }` |
| the 19 raw medium knobs on `AuroraConfig` (`strokeScale` … `catchTint`) | `deposition` (required on non-smooth), `grain`, `finish`, `flake` |
| `resolveAtoms`, `configToAtoms`, `DEFAULT_ATOMS`, `AuroraAtoms`, `AuroraZones`, `AuroraMediumAtom`, `AuroraInteractivityAtom`, `AuroraFieldInteractivityAtom`, `AuroraSmoothInteractivityAtom`, `AuroraPainterlyInteractivityAtom`, `AuroraMotionAtom`, `AuroraZoneArrangement` | the config is the atoms shape; `nucleiPrior` stays |
| `vividness`, `DEFAULT_VIVIDNESS`, `VIVID_TARGET`, `huePath`, `AuroraHuePath` | none (the field law sets chroma from the gamut ceiling) |
| `PAPER_WASH_GROUND` on `crayon` | the same name on `chalk` |
| (new) `followPointer` prop, `glass-aurora-drift` utility | additive |

Consumers with pinned painterly configs (atlas, keyframes `HeroAurora.vue`) re-capture in their tranches (GF-AURORA §9 ROUTED).

## 8 · Dependencies

PLAN §5, the one record of edges, with the reasons in its notes (fix-5, FD-03).

## 9 · Ledger rows it closes

#53c (FourierField's `live`, `inertReason` and `note` props, routed by the census with #52) is RETIRE DECLINE: the studio contract (cure 5) states each viz's live state in its perf readout, and no sibling imports FourierField (`ledger/census-register-b.md:43`), so a prop surface for it has no reader (E-7). #49 (BUILD, the disease row decided); C-13a's paint half; C-13b; L01b-49; L05a-01 and L10-02's paint halves; UIA-V-46, UIA-V-154; R2-06-04 with BD2 A3, A38, A41, A42 (BUILD) and A43 (RETIRE); O-49 (BUILD); A2-KE-L1-26 (BUILD); OW-9a's aurora items by the owner's answer (W-B.14).

## 10 · Gestalt passes (P-1)

- **Tranche fit:** the owner's "variants are all almost identical" and "the aurora is buggy" are answered in paint, and every viz shares one studio.
- **Wave:** G4-G1 to G4-G10 green in one run on the GPU leg.
- **Feature:** π-BODIES shows six pictures a viewer tells apart; π-FIELD shows the shell moving; DUSK is ratified.

## Appendix A · `g4-medium.mjs`

```js
// Beacon-gated (data-aurora-settled), ?probe=1, element screenshot of the stage canvas; never getContext() on the page canvas.
import { open, reporter, sleep, CAP } from './lib.mjs';
import { PNG } from '/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js';
import fs from 'node:fs';
const R = reporter('g4-medium');
const MEDIA = (process.argv[2] || 'smooth,oil,vangogh,oil-pastel,kuwahara,crayon').split(',');
const vec = (png) => { const { width: w, height: h, data } = png; const L = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) { const r = data[4 * i] / 255, g = data[4 * i + 1] / 255, b = data[4 * i + 2] / 255; L[i] = Math.cbrt(0.4122 * r + 0.5363 * g + 0.0514 * b) * 0.2105 + Math.cbrt(0.2119 * r + 0.6807 * g + 0.1074 * b) * 0.7936 + Math.cbrt(0.0883 * r + 0.2817 * g + 0.6300 * b) * -0.0041; }
  let m = 0; for (const v of L) m += v; m /= L.length; let s = 0; for (const v of L) s += (v - m) ** 2; const sd = Math.sqrt(s / L.length);
  let hf = 0, n = 0, jxx = 0, jyy = 0, jxy = 0;
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) { const i = y * w + x; hf += Math.abs(4 * L[i] - L[i - 1] - L[i + 1] - L[i - w] - L[i + w]); const gx = (L[i + 1] - L[i - 1]) / 2, gy = (L[i + w] - L[i - w]) / 2; jxx += gx * gx; jyy += gy * gy; jxy += gx * gy; n++; }
  const tr = jxx + jyy, det = jxx * jyy - jxy * jxy, disc = Math.sqrt(Math.max(0, tr * tr / 4 - det)); const l1 = tr / 2 + disc, l2 = tr / 2 - disc;
  return { meanL: +m.toFixed(5), sdL: +sd.toFixed(5), hf: +(hf / n).toFixed(6), aniso: +((l1 - l2) / (l1 + l2 + 1e-12)).toFixed(5) }; };
const out = {};
for (const med of MEDIA) {
  const { browser, page } = await open(`/substrates/aurora?aurmedium=${med}&probe=1`, { settle: 500 });
  await page.evaluate(() => document.querySelector('canvas.aurora-canvas')?.scrollIntoView({ block: 'center' }));
  const t0 = Date.now(); let settled = false;
  try { await page.waitForSelector('[data-aurora-settled]', { timeout: 20000 }); settled = true; } catch {}
  await sleep(1500);
  const buf = await (await page.$('canvas.aurora-canvas')).screenshot();
  fs.writeFileSync(`${CAP}/g4-medium-${med}.png`, buf);
  out[med] = { ...vec(PNG.sync.read(buf)), settled, settleMs: Date.now() - t0, combobox: await page.evaluate(() => [...document.querySelectorAll('[role=combobox]')].map((e) => e.textContent.trim()).slice(0, 3)) };
  await browser.close();
}
const keys = ['sdL', 'hf', 'aniso', 'meanL'];
const sep = (a, b) => keys.filter((k) => Math.abs(a[k] - b[k]) / Math.max(Math.abs(a[k]), Math.abs(b[k]), 1e-9) >= 0.25).length;
const pairs = []; for (let i = 0; i < MEDIA.length; i++) for (let j = i + 1; j < MEDIA.length; j++) pairs.push([MEDIA[i], MEDIA[j], sep(out[MEDIA[i]], out[MEDIA[j]])]);
const fails = pairs.filter((p) => p[2] < 2);
R.row('G4-G2 every medium pair separates on >= 2 of 4 structure channels by >= 25 %', fails.length === 0, { collapsedPairs: fails.map((p) => `${p[0]}~${p[1]}(${p[2]})`), vectors: out });
R.done();
```

HEAD output (per medium): `smooth {"meanL":0.89731,"sdL":0.0351,"hf":0.003935,"aniso":0.73648,"settled":true,"settleMs":2437,"combobox":["Analogous","Smooth","Composed"]}`, `crayon {… 0.87537, 0.04147, 0.004653, 0.78144, settleMs 2420, "Crayon"}`, `vangogh {… 0.89772, 0.0348, 0.00395, 0.73846, 2968, "Van Gogh"}`, `kuwahara {… 0.89728, 0.03513, 0.003955, 0.73683, 2481, "Kuwahara"}`, `oil {… 0.89734, 0.03508, 0.003967, 0.73676, 2459, "Oil"}`, `oil-pastel {… 0.8973, 0.03511, 0.00394, 0.73655, 2425, "Oil Pastel"}`; `FAIL G4-G2 … 15 collapsed pairs`. An earlier run without the scroll read byte-identical vectors for all six and no beacon in 20 s: the stage below the fold is parked and paints its ground. The scroll is part of the instrument.

After the wave the medium list is read from the enum (`smooth,wash,chalk,dab,stick,knife`) and the thresholds are GF-AURORA §7's provisional τ, ratified at bring-up against the first beacon-gated set.

## Appendix B · `g4-field.mjs`

```js
import { open, reporter, sleep, CAP } from './lib.mjs';
import { PNG } from '/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js';
import fs from 'node:fs';
const R = reporter('g4-field');
const lab = (r, g, b) => { const f = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); r = f(r / 255); g = f(g / 255); b = f(b / 255);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
for (const theme of (process.argv[2] || 'light').split(',')) {
  const { browser, page } = await open('/', { settle: 1000, theme });
  await page.waitForSelector('[data-aurora-settled]', { timeout: 20000 }).catch(() => {});
  await page.addStyleTag({ content: 'main, header, nav { visibility: hidden !important }' });
  await page.mouse.move(2, 2); await sleep(1000);
  const a = PNG.sync.read(await page.screenshot()); fs.writeFileSync(`${CAP}/g4-field-${theme}-t0.png`, PNG.sync.write(a));
  await sleep(30000);
  const b = PNG.sync.read(await page.screenshot()); fs.writeFileSync(`${CAP}/g4-field-${theme}-t30.png`, PNG.sync.write(b));
  let dmax = 0, moved = 0, C = 0, Lm = 0; const n = a.data.length / 4;
  for (let i = 0; i < a.data.length; i += 4) { const d = Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2])); dmax = Math.max(dmax, d); if (d >= 2) moved++; const [L, A, B] = lab(b.data[i], b.data[i + 1], b.data[i + 2]); C += Math.hypot(A, B); Lm += L; }
  const r = { dmax255: dmax, movedPct: +(100 * moved / n).toFixed(2), meanC: +(C / n).toFixed(4), meanL: +(Lm / n).toFixed(4) };
  const [dm, mc, La] = theme === 'dark' ? [8, 0.033, 0.205] : [6, 0.026, 0.935];
  R.row(`G4-G3 / ${theme}`, r.dmax255 >= dm && (theme === 'dark' || r.movedPct >= 25) && r.meanC >= mc && Math.abs(r.meanL - La) <= 0.01, r);
  await browser.close();
}
R.done();
```

HEAD output: `light {"dmax255":3,"movedPct":6.94,"meanC":0.0231,"meanL":0.9182}`, `dark {"dmax255":9,"movedPct":67.94,"meanC":0.0184,"meanL":0.3364}`, both FAIL. (The run at this seat applied the ≥ 25 % moved clause to both themes and had no L clause; the verdicts are the same under the gate as written.)
