# W-G.5 · W-BLOB-GREENFIELD: the blob as a colony that separates, settles on one signal, and paints glass-ui's ink · 11.0.0

| field | value |
|---|---|
| seat | band-G wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b37a37c3` (`src`, `demo`, `tests` identical to `f3ad78d0`), scratch worktree, demo on :5987, Chromium on Metal with WebGPU (adapter `apple/metal-3`); probe library in W-G.1 appendix A |
| ships in | 11.0.0 |
| families | F-48, the blob split (`audit/REGISTRY.md:1171-1183`): L01b-50, L05a-02, L05b-10 (blob half), R2-03-07. F-50, the blob's settle seam (`REGISTRY.md:1206,1212-1213,1219`): R2-03-06 and value.js's quiescence ask. Inbound: O-56 G-3 (the look; `INBOUND-MAP.md:538`), UIA-V-47, UIA-V-164, UIA-V-199, UIA-V-386 (`INBOUND-MAP.md:408,412,415,417`), O-52 (hero-blob display-p3, routed here by `W-B.2.md:91`). Folded here by W-E.10 (`W-E.10.md:78,121`): the seed ceiling pair G-CHROMA and G-MOOD-STILL |
| a disease row | #50 GF-BLOB rode BJ and BK at W0 ("NOT ONE GLSL BYTE IS DELETED", `census-register-a.md:57`); five owner asks since BC H42 (L05b-10). Deciding it is this wave (CH:23) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 0 · The spec of record, and what BL changes in it

The spec of record is GF-BLOB TERMINAL of 2026-07-28 (`BJ/addenda/2026-07-24-refinement/DESIGN-NOW.md:58-175`), which supersedes GREENFIELD-TERMINAL's GF-BLOB PASS 4 except for PASS 4's W3 (the stamp), W4 (the ink), ADJ-1/2/9/11 and its §REJECTED (`DESIGN-NOW.md:60`). The census's "#50 W1-W8" and C-12's "seven blob cells (W2-W6)" name this spec's waves.

- **W1 (the GL excise) is W-G.1's**, with π-W1 (C-11) (W-G.1 §0). This wave starts at W2.
- **The settle seam is decided by W6's predicate.** `settled` is the closed-form energy predicate with a 1 s dwell and nothing else, so no mood source can veto it; that is value.js's ask ("a mood pin does not veto settle", `REGISTRY.md:1219`). Under an ambient drive the colony orbits and `settled` is false by definition (the breath of life, D-2); the consumer parks by quenching (`drive` → 0), which W6 makes the settle command. The born-RED below drives exactly that path.
- **O-52 joins W8.** The blob configures its canvas in `display-p3` where `(color-gamut: p3)` matches, resolves palette stops into that space by css-color-4 gamut mapping (never a per-channel clip), bounds `gamutClampOklch` by the buffer's gamut, and exposes the resolved space. W4's chroma targets are written in the buffer's gamut.

## 1 · What it closes

| id | what |
|---|---|
| L01b-50, L05a-02, #50, C-12 | GF-BLOB W2-W8 unbuilt: `MAX_SATS = 4` (`constants.ts:13`); `lambda`, `quench`, `chaosLambda`, `0.3381` 0 hits in `src/components/blob` |
| L05b-10 (blob), R2-03-07, O-56 G-3 (look), N-8c, UIA-V-199 | "the blob is awful, not animated, and not glass-ui idiomatic": the same matte shaded body with fused horns at 7.0.0 and HEAD; no satellite ever separates |
| R2-03-06, the quiescence ask, UIA-V-47, UIA-V-386 | `settled` never turns true under a manual mood pin, so consumers park by wall clock; a config write neither wakes nor settles the parked blob |
| UIA-V-164 | the hero blob flashes as an opaque square tile during a colour jump (unmeasured at HEAD; π-INK re-reads it) |
| O-52 | the blob renders sRGB on a p3 display |
| G-CHROMA, G-MOOD-STILL (from W-E.10) | the blob's ink: C p95 0.085-0.093 against the aurora's 0.140 one route away |

## 2 · The defect at HEAD

Source:

- **The inflation.** `shaders/metaball.wgsl.ts:209` `satG.x = satG.x + (1.0 - s.w) * 0.3;`: every shipped satellite's effective radius is negative (−0.02375 default, −0.01250 hero; GF-BLOB BC-03).
- **Separation is off.** `surface.fissionAmp` defaults to 0 (`types.ts:412`), read once (`useBlobSatellites.ts:142`), set nowhere in `src` or `demo`.
- **The phase machine.** `useBlobSatellites.ts:226,233,301` (`absorbed` zeroes position and opacity), `satelliteKinematics.ts` (129 lines, a closed-form orbit), `blobSimulation.ts:83-89` (`isQuiescent`, a phase test).
- **The veto.** `useBlobMood.ts:173` `if (manualOverride && currentMood.value !== "idle") return false;` with `manualOverride` armed by every `setMood` from the component (`Blob.vue:258-259`).
- **The stamp.** `Blob.vue:355` `filter: drop-shadow(var(--blob-shadow-ambient)) drop-shadow(var(--blob-shadow-contact))`, `:356` a `filter` transition, `:360` the hover swap; the `--blob-shadow-*` tokens are declared at `:root` (`src/styles/tokens/shadow.css`, 18 lines), unregistered, so the tint substitutes at `:root` (GF-BLOB PASS 4 ADJ-6).
- **The shadow march.** `metaball.wgsl.ts:241` `fn softShadow2D(…)`, a 24-step march.
- **Resting promotion.** `Blob.vue:373` `will-change: transform` at rest.

Paint and behaviour (appendices A-C; `cap/g5-*.json`):

| probe | HEAD |
|---|---|
| appendix A: `/substrates/blob`, the Blob's exposed API reached through the root vnode (2 blobs), pointer parked | `settled` false on all **48** samples over 12 s unpinned; after `setMood("sleepy")`, false on all **60** samples over 15 s (`currentMood` reads `sleepy`) |
| appendix A: the first blob isolated (every other node hidden, page `#808080`, 1440×1400), 24 frames at 2 fps, connected components ≥ 3 % of the largest | **1** component in **24 of 24** frames. The frame (`cap/g5-blob-f0.png`, sha256 `81df2da5c676…`) is a matte shaded body with three fused horns |
| appendix B: G-CHROMA over that frame's blob pixels | C p95 **0.0926**, C max 0.0953, 4 hue bins (10°) at ≥ 1 % |
| appendix C: `(color-gamut: p3)` emulated through CDP, `GPUCanvasContext.configure` recorded | both blob canvases configured with the default colour space (`srgb`), format `bgra8unorm` |

An earlier cut of appendix A cropped the canvas box (160 % of the wrapper) with page chrome in view and read 3-4 "components" per frame: page furniture inside the crop, which GF-BLOB §5 warns about. The isolation step is part of the instrument.

## 3 · The cure

GF-BLOB W2 to W8 as written (`DESIGN-NOW.md` §3), with PASS 4's W3 stamp and W4 ink:

1. **W2, the colony.** `BlobNode { parent, depth, r, m, x, y, vx, vy, children[] }`; the core pinned at the origin; the φ^(1/4) radius ladder from R = 0.22 (0.135967, 0.120556, 0.106891); depth-1 roster N = 3; per-pair k₀ = min(r_parent, r_child) / 3; one `array<vec4f>` of sources into one smin field; fixed dt = 1/240 s, 4 substeps per 60 Hz frame. `useBlobSatellites.ts` and `satelliteKinematics.ts` become `composables/blobColony.ts`; the inflation literal and its compensation comment go.
2. **W3, cohesion.** Central attraction n = 1.70 with the interior solution; the capillary contact well to gap = 2k₀ with approach-only damping; the integral pump (τ_ε = 7 s, Bo = 0.14, T₀ = 12 s) targeting specific orbital energy between the two derived turning radii; the one-sided containment invariant at `0.475 / POS_SCALE − r − subtreeReach`.
3. **W4, fission.** `surface.fissionAmp` becomes `surface.drive` (default 0.90; the Calm preset 0.30, below the threshold 0.3381); bonded or free is read from the field; the only latch is event hysteresis (latch above 2k₀ + r/2, release below 2k₀); a click adds a radial impulse at the derived knee J* = 0.00284.
4. **W5, depth.** `MAX_DEPTH = 2`, a loud clamp; depth-2 nodes are bonded lobes; the hero ships depth 1.
5. **W6, one settle signal.** `settled ⇔ ∀ nodes: ½v²_rel + U(d) + ψ(gap) ≤ L²/(2r_b²) + U(r_b)` held for 1 s; `isQuiescent` and `nextEventMs` are deleted, and so is `useBlobMood`'s `manualOverride` veto; the loop parks on `settled` and re-arms on pointer, mood, config (UIA-V-47, UIA-V-386) and resize. Quench is `drive` → 0 on the named `gentle` spring (τ 1.2 s). The analytic per-body shadow replaces `softShadow2D`.
6. **W7, mood as three scalars** into the laws (arousal → drive in [0.55, 1.00], valence → T₀ in [16 s, 9 s], arousal → Bo in [0.22, 0.09]); below drive* the configured drive is literal and mood may not raise it (the calm floor law). PASS 4 W5's lean law and baseSquash channel ride unchanged. The configurator rows are VizStudio's (W-G.4), each with its live range.
7. **PASS 4 W3, the stamp.** The ten gel tokens and the `:root` `--blob-shadow-*` declarations are deleted, with the hover `filter` swap and its transition. Three wrapper properties `--blob-stamp-offset`, `--blob-stamp-blur`, `--blob-stamp-ink` are set from JS: the ink is palette stop 0 L-clamped to [0.28, 0.34] with chroma ≤ 0.06; the offset is the space rung nearest 4.4 % of the rendered diameter; hover moves one rung on the `bouncy` spring under `(hover: hover)`.
8. **PASS 4 W4, the ink.** Per-bead ink is `paletteStops` whole; hue solved upward until G-CHROMA and G-MOOD-STILL pass.
9. **W8 close and O-52.** Technicolor default, warm cream as the Calm preset, the heavy-cartoon A/B as the first capture; the canvas sized to the orbit envelope, not 160 %; `will-change` only while unsettled; the display-p3 path of §0; the demo's STAGE-1 section and all WebGL2 prose struck (`demo/.../manifest.ts:443`, `blob.vue:2`). The WatercolorDot standing falsifier (`DESIGN-NOW.md:161`) is carried: if π-SEPARATE still shows one component in every frame after W3-W4, the next ruling is whether WatercolorDot replaces the engine, not another wave.

## 4 · Files it touches

`src/components/blob/`: `Blob.vue`, `README.md`, `types.ts`, `constants.ts`, `presets.ts`, `config.ts`, `index.ts`, `shaders/{metaball,metaball-noise,metaball-palette}.wgsl.ts`, `composables/{blobColony (new),blobSimulation,useBlobMood,useBlobPointer,useMetaballRenderer,wgpuSetup,packBlobUniforms,resolveBlobSurface,easing}.ts`; deleted `composables/{useBlobSatellites,satelliteKinematics}.ts`. `src/styles/tokens/shadow.css` (the blob tokens out). `demo/stories/substrates/blob.vue` and the blob manifest entry. The band-G harness page gains `c=blob` (a `Blob` on `BLOB_HERO` with its ref on `window`). Tests: `tests/components/custom/blob/colony.test.ts` (new: G-CHAOS, the latch, the settle predicate, G-BOUNDED, G-DEPTH-BOUND), `tests-visual/wired/blob-greenfield.spec.ts` (appendices A-C and the paint gates). `MIGRATION.md`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| G5-G1 · a mood pin does not veto settle | harness `c=blob`: `setMood("sleepy")`, then `config.surface.drive = 0`; `settled` is true within 5.2 s and stays true for 3 s | both | **FAIL** (appendix A on the demo route, same seam): false on 60 of 60 samples over 15 s after `setMood("sleepy")`; `drive` does not exist |
| G5-G2 · the blob separates (G-SEPARATION, quick form) | appendix A's isolated strip at the default drive: ≥ 1 frame of 24 with ≥ 2 components | ≥ 1 | **0 of 24** |
| G5-G3 · G-SEPARATION (the spec's form) | drive 0.90, 300 s, 8 seeds, canvas-cropped, connected-component labelled: every seed has ≥ 1 latched event (gap > 2k₀ + r/2 held ≥ 250 ms) and the colony mean is ≥ 4/min | all seeds | **FAIL**: no event on any config (G5-G2) |
| G5-G4 · the physics is the colony | `! git grep -nE '\(1\.0 - s\.w\) \* 0\.3\|"absorbed"\|isQuiescent\|nextEventMs\|fissionAmp\|manualOverride\|satelliteKinematics\|softShadow2D' -- src/components/blob` | exit 0 | **exit 1**: `metaball.wgsl.ts:209,241`, `useBlobSatellites.ts:142,226,233,301`, `blobSimulation.ts:83-89`, `useBlobMood.ts:173`, `types.ts:234,412` |
| G5-G5 · the colony's unit gates | `npx vitest run tests/components/custom/blob/colony.test.ts`: G-CHAOS (Benettin λ ≥ 0.25/s undriven, every seed, 300 s), G-FISSION-CAUSED+LATCHED (a click at J* at least doubles the 10 s event count; no latch without gap > 2k₀ + r/2; release below 2k₀), G-SETTLED-ONE-SIGNAL (true within 5.2 s of quench on 8 of 8 seeds, 0 flap, never true while any gap > 2k₀), G-BOUNDED (max (|p| + r) · POS_SCALE ≤ 0.500 at the 10-body depth-2 tree), G-DEPTH-BOUND | exit 0 | **exit 1** (no file; `blobColony` 0 hits) |
| G5-G6 · G-CHROMA | appendix B over the isolated blob, light and dark, Calm preset idle: C p95 ≥ 0.13, C max ≤ 0.15, ≥ 4 hue bins (10°) at ≥ 1 % | both themes | **FAIL** light: C p95 0.0926 |
| G5-G7 · G-MOOD-STILL | five mood stills (time-averaged over 4 s each): sleepy and excited separate on bead reach and rest aspect by ≥ 3× the same-mood spread; pairwise ΔL ≥ 8/255; hue spread ≥ 20° | all | **FAIL** by construction: `beadReach` and `baseSquash` 0 hits; GF-BLOB's HEAD reading ΔL 1.83-3.18, hue 1.4° |
| G5-G8 · the stamp is the component's | `! git grep -n -- '--blob-shadow-' -- src` and, in the browser, the wrapper's computed `--blob-stamp-ink` is within 30° of stop 0's hue with L ≤ 0.35 in both themes | both | **exit 1**: 18 lines in `shadow.css`, 3 in `Blob.vue`; `--blob-stamp-ink` absent |
| G5-G9 · display-p3 | appendix C: under `(color-gamut: p3)` every blob canvas is configured `display-p3`, and the instance exposes `colorSpace: "display-p3"` | both | **FAIL**: default colour space on 2 of 2 |
| G5-G10 · no resting promotion | the hero at rest (`settled` true) has computed `will-change: auto` | `auto` | **FAIL**: `Blob.vue:373` `will-change: transform` unconditionally |

Planted bites (GF-BLOB §5's mutation column): re-add the ×0.3 inflation (G5-G4, G5-G2); drop the hysteresis (G5-G5's latch clause); restore the mood veto (G5-G1); move the ink declaration to `:root` (G5-G8); set `baseSquash` constant across moods (G5-G7).

## 6 · π and DELTA obligations

Route `/substrates/blob`; canvas-bbox-cropped with the page isolated as in appendix A; connected-component labelled; screenshots only.

- **π-SEPARATE.** 30 s at 2 fps at drive 0.90, before (HEAD `g5-blob-f0.png` and its 24-frame strip) and after, light and dark. **The heavy-cartoon A/B is this first capture** (GF-BLOB W8).
- **π-FISSION** (one latched episode, bonded → free → re-bonded, 9 frames at 1.4 s), **π-CALM** (drive 0.30, every frame one component), **π-CHAOS** (twin seeds 60 s apart, overlaid, with the λ figure), **π-DEPTH** (depth 1 and 2, same seed and time), **π-CONTAIN** (the peak frame at 1440×979 and 390×844), **π-SETTLE** (the quench pair), **π-PERF** (simulation ≤ 0.5 ms/frame at 13 bodies; GPU fill with the aurora co-present against the < 7 % budget owed since BJ).
- **π-INK and π-STAMP.** The blob beside the aurora, both themes, before and after, with appendix B's numbers; the stamp at ⌀112, 240, 480 and 768; UIA-V-164's colour-jump frame strip (the tile flash) re-read here.
- **π-P3.** On a p3-capable display the same frame in sRGB and in p3, with the configured colour space recorded.
- **π-LOOK (O-56 G-3).** The hero at rest and in an episode, both themes, for the owner's read through W-B.4 (OW-7).
- Engines: Chromium on Metal, measured. Playwright WebKit: not run at this seat. Real Safari: UNMEASURED (OW-3); one π-PARITY cell is owed at W-A.6.

## 7 · MIGRATION rows

| removed or changed | replacement |
|---|---|
| `config.surface.fissionAmp` | `config.surface.drive` (0 to 1; default 0.90; below 0.3381 the colony never separates) |
| `config.membrane.smoothK` and its mood multiplier | none; the meniscus is derived per pair |
| `config.satellites.absorbedDuration`, the phase timing constants, `eccentricity` | none; phases no longer exist |
| `settled` true only when no satellite is in transition and no mood is pinned | `settled` is the colony's energy predicate held 1 s; set `drive` to 0 to settle |
| barrel names `useBlobSatellites`, `BlobSatelliteSystem`, `SatellitePhase`, `SatelliteInternal`, `MetaballSource` (where exported) | none |
| `--blob-shadow-*` tokens | `--blob-stamp-offset`, `--blob-stamp-blur`, `--blob-stamp-ink`, set by the component |
| `BLOB_HERO` roster of 4 | 3 |
| (new) the instance's `colorSpace` | additive |

value.js's HeroBlob replaces its wall-clock park (`BLOB_IDLE_MS`, `SLEEPY_POSE_MS`, `HeroBlob.vue:17,211-220`, R2-03-05) with `drive` → 0 and a watch on `settled`, in its own tranche. slides carries the barrel breaks and `fissionAmp` → `drive` (GF-BLOB §9 ROUTED).

## 8 · Dependencies

W-G.1 (W1 and the packer), W-G.4 (the studio shell the configurator rows live in; they may land in either order, the rows attach when both are in).

## 9 · Ledger rows it closes

#50 (BUILD, the disease row decided; C-11 by W-G.1, C-12 here); L01b-50, L05a-02, L05b-10's blob half; R2-03-06, R2-03-07; O-56 G-3's look; N-8c; the quiescence ask (ANSWERED: `settled` is the energy predicate; park with `drive` → 0); O-52 (BUILD); UIA-V-47, UIA-V-164, UIA-V-199, UIA-V-386; G-CHROMA and G-MOOD-STILL (W-E.10's fold).

## 10 · Gestalt passes (P-1)

- **Tranche fit:** the oldest live owner ask (A12) is built from its converged spec, and the one consumer that parks the blob gets a signal it can use.
- **Wave:** G5-G1 to G5-G10 green in one run on the GPU leg.
- **Feature:** π-SEPARATE and π-FISSION show beads that leave and return; π-LOOK is read by the owner.

## Appendix A · `g5-blob.mjs`

```js
// Screenshot-only on the canvas bbox (never getContext on the live WebGPU canvas). Real GPU.
import { open, reporter, sleep, CAP } from './lib.mjs';
import { PNG } from '/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js';
import fs from 'node:fs';
const R = reporter('g5-blob');
const { browser, page } = await open('/substrates/blob', { settle: 3000, h: 1400 });
await page.mouse.move(2, 2);
const exposedOk = await page.evaluate(() => { const found = []; const walk = (v, d) => { if (!v || d > 400) return; if (v.component) { const e = v.component.exposed; if (e && typeof e.setMood === 'function') found.push(e); walk(v.component.subTree, d + 1); } if (Array.isArray(v.children)) for (const c of v.children) if (c && typeof c === 'object') walk(c, d + 1); if (v.suspense) walk(v.suspense.activeBranch, d + 1); }; walk(document.querySelector('#app')._vnode, 0); window.__blob = found[0]; return { blobs: found.length, ok: !!window.__blob }; });
const watch = async (ms) => page.evaluate(async (ms) => { const seen = []; const t0 = performance.now(); while (performance.now() - t0 < ms) { seen.push(!!window.__blob.settled?.value); await new Promise((r) => setTimeout(r, 250)); } return { anyTrue: seen.includes(true), lastTrue: seen.at(-1), samples: seen.length }; }, ms);
const unpinned = await watch(12000);
await page.evaluate(() => window.__blob.setMood('sleepy'));
const pinned = await watch(15000);
R.row('G5-G1 a manual mood pin does not veto settle', pinned.anyTrue, { exposedOk, unpinned, pinnedSleepy: pinned, mood: await page.evaluate(() => window.__blob.currentMood?.value) });
await page.addStyleTag({ content: 'body * { visibility: hidden !important } .goo-blob-wrapper:first-of-type, .goo-blob-wrapper:first-of-type * { visibility: visible !important } html, body { background: #808080 !important } .shell-aurora { display: none !important }' });
await sleep(800);
const box = await page.evaluate(() => { const c = document.querySelector('canvas.goo-blob-canvas'); const r = c.getBoundingClientRect(); const x = Math.max(0, r.x), y = Math.max(0, r.y); return { x, y, width: Math.min(innerWidth, r.right) - x, height: Math.min(innerHeight, r.bottom) - y }; });
await sleep(600);
const comps = [];
for (let f = 0; f < 24; f++) {
  const png = PNG.sync.read(await page.screenshot({ clip: box }));
  const { width: w, height: h, data } = png; const bg = [data[0], data[1], data[2]];
  const m = new Uint8Array(w * h); for (let i = 0; i < w * h; i++) m[i] = Math.abs(data[4 * i] - bg[0]) + Math.abs(data[4 * i + 1] - bg[1]) + Math.abs(data[4 * i + 2] - bg[2]) > 40 ? 1 : 0;
  const lab = new Int32Array(w * h); const areas = []; let k = 0;
  for (let i = 0; i < w * h; i++) { if (!m[i] || lab[i]) continue; k++; let a = 0; const st = [i]; lab[i] = k; while (st.length) { const j = st.pop(); a++; const x = j % w, y = (j / w) | 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= w || Y >= h) continue; const q = Y * w + X; if (m[q] && !lab[q]) { lab[q] = k; st.push(q); } } } areas.push(a); }
  const big = Math.max(0, ...areas); comps.push(areas.filter((a) => a >= 0.03 * big).length);
  if (f === 0) fs.writeFileSync(`${CAP}/g5-blob-f0.png`, PNG.sync.write(png));
  await sleep(500);
}
R.row('G5-G2 the blob separates in paint: >= 1 frame of 24 (12 s) with >= 2 components', comps.some((c) => c >= 2), { componentsPerFrame: comps });
await browser.close();
R.done();
```

HEAD output: `FAIL G5-G1 … {"exposedOk":{"blobs":2,"ok":true},"unpinned":{"anyTrue":false,"lastTrue":false,"samples":48},"pinnedSleepy":{"anyTrue":false,"lastTrue":false,"samples":60},"mood":"sleepy"}`; `FAIL G5-G2 … {"componentsPerFrame":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}`. After the wave G5-G1 runs on the harness page with the quench step (§5); G5-G2 keeps this form.

## Appendix B · `g5-ink.mjs`

```js
// G-CHROMA over the isolated blob's pixels (background #808080 masked out).
import { PNG } from '/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js';
import fs from 'node:fs';
const png = PNG.sync.read(fs.readFileSync(process.argv[2]));
const f = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const Cs = []; const bins = new Array(36).fill(0);
for (let i = 0; i < png.data.length; i += 4) { const R = png.data[i], G = png.data[i + 1], B = png.data[i + 2]; if (Math.abs(R - 128) + Math.abs(G - 128) + Math.abs(B - 128) <= 40) continue;
  const r = f(R / 255), g = f(G / 255), b = f(B / 255); const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s; const C = Math.hypot(a, bb); Cs.push(C); bins[Math.floor(((Math.atan2(bb, a) * 180 / Math.PI + 360) % 360) / 10)]++; }
Cs.sort((x, y) => x - y); const n = Cs.length; const occ = bins.filter((k) => k / n >= 0.01).length;
const r = { px: n, Cp95: +Cs[Math.floor(0.95 * n)].toFixed(4), Cmax: +Cs[n - 1].toFixed(4), hueBinsAt1pct: occ };
const pass = r.Cp95 >= 0.13 && r.Cmax <= 0.15 && occ >= 4;
console.log(`${pass ? 'PASS' : 'FAIL'} G5-G6 G-CHROMA ${JSON.stringify(r)}`); process.exitCode = pass ? 0 : 1;
```

HEAD output on `g5-blob-f0.png`: `FAIL G5-G6 G-CHROMA {"px":48237,"Cp95":0.0926,"Cmax":0.0953,"hueBinsAt1pct":4}`. The dark-theme cell is taken in the same run after the wave (HEAD's dark cell was not captured at this seat).

## Appendix C · `g5-p3.mjs`

```js
import { open, reporter, sleep } from './lib.mjs';
const R = reporter('g5-p3');
const init = `(() => { window.__cfg = []; const c = GPUCanvasContext.prototype.configure; GPUCanvasContext.prototype.configure = function (d) { window.__cfg.push({ cls: this.canvas?.className?.split(' ')[0], colorSpace: d.colorSpace ?? '(default srgb)', format: d.format }); return c.call(this, d); }; })();`;
const { browser, ctx, page } = await open('/substrates/blob', { init, settle: 500, h: 1400 });
const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'color-gamut', value: 'p3' }] });
await page.reload({ waitUntil: 'networkidle' }); await sleep(3000);
const r = await page.evaluate(() => ({ p3: matchMedia('(color-gamut: p3)').matches, cfg: window.__cfg.filter((x) => /goo-blob/.test(x.cls || '')) }));
R.row('G5-G9 (color-gamut: p3): every blob canvas is configured display-p3', r.p3 && r.cfg.length > 0 && r.cfg.every((x) => x.colorSpace === 'display-p3'), r);
await browser.close();
R.done();
```

HEAD output: `FAIL … {"p3":true,"cfg":[{"cls":"goo-blob-canvas","colorSpace":"(default srgb)","format":"bgra8unorm"},{"cls":"goo-blob-canvas","colorSpace":"(default srgb)","format":"bgra8unorm"}]}`.
