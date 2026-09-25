# D3 · pass 1 · SPECS · one spec per family

| field | value |
|---|---|
| seat | D3 pass 1, SYNTHESIS. One spec per family (D3-A..D3-F). The routes are still incompatible, so none is merged into another, and none is ranked |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`; the checkout read `b37a37c3`. D3-F measured `git diff --stat 9aa2b7f9 b37a37c3 -- src` as touching only `components/configurator/*` and `src/index.ts`, none of the material (`D3-F.md` header), so every HEAD reading holds |
| inputs | `PORTFOLIO.md` (whole), `harness/HARNESS.md`, `pass-1/W.md`, `pass-1/X.md`, `pass-1/D3-{A,B,C,D,E,F}.md` (all six were on disk; none arrived inline). Source lines re-read here to pin names: `tokens/glass.css:34-182`, `tokens/dark-arm.css:278-303`, `dock/styles/shell.css:57,146-148,263`, `dock/styles/controls/tab-button.css:47`, `dialog/styles.css:144,243`, `glass/material.css:108`, `harness/capture.mjs:44`. One scratch read: D3-E's battery log (`…/D3-E-research/run-e1.log`) and its probe patch (`…/D3-E-probe.patch`), to fill the values D3-E's report left implicit |
| measurement | none new. Every number is a research seat's, cited `family §section`. Where a spec needs a value no seat fixed, it is marked **synthesis choice** and is unmeasured |

**How to read a spec.** HEAD's ladder is `--glass-veil-base ± n·--glass-veil-step` (`tokens/glass.css:45-52`), with the offsets chassis = base − 2·step, dock = base − step, crown = dialog = base + step, sheet = base + 2·step (`:134-138`). A spec that states only base and step keeps those formulas, and its tables spell them out. "Card" equals resting throughout. The dock plate lerps between its collapsed tier (`--glass-veil-wash`, `shell.css:146`) and its expanded tier (`--glass-veil-dock`, `:148`) unless the spec says otherwise. HEAD's medium is blur 10/14/16/20/22 px, `--glass-saturate: 1.5` on every rung (`glass.css:69-92`), and a dock re-composition at `saturate(1.2)` in light and `saturate(1.3) brightness(1.14)` in dark (`shell.css:57,263`).

**Battery verdicts** are Chromium-gated. Playwright WebKit rows are paint-only and informational. Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox), and no spec repeats that per row.

---

## D3-A · The ground pole

### A.1 Mechanism

**The veil.** One pole, `--card`, in both themes, composed as one mix from the thinnest rung to the opaque escape. There is no ink token, no luma term and no clamp (`D3-A §2` item 1):

```css
@utility glass-plate {
  --glass-veil-alpha: calc(1 - (1 - var(--glass-veil-tier, var(--glass-veil-resting))) * var(--glass-level));
  background: color-mix(in srgb, var(--card) calc(var(--glass-veil-alpha) * 100%), transparent);
}
/* :root --glass-plate-{rung}: the same mix at the root level, so each stays a paintable <color> (X §3.4 #2) */
```

Level 0 is α = 1 (the opaque escape); level 0.3 (PCM) is 1 − 0.7·(1 − α); level > 1 thins.

The light `--card` moves from `hsl(30 85% 96%)` (L 0.974) to `hsl(30 85% 97%)`, which passes M-1 on every ladder row in both engines (`D3-A §3`, `v-card97`).

The ladder has two bands, and each band's thinnest rung sits on its bound (`D3-A §2` items 2-3):
- **Content bound** over the declared content field (library fields at ceiling ≤ 0.5, plus paper): 0.516 light, 0.496 dark (`D3-A Q1`).
- **Chrome bound** over any input: 0.871 light, 0.854 dark. Adding a 0.02 engine margin gives 0.89 / 0.86 (`D3-A Q5`).

| rung | light α | dark α | source |
|---|---|---|---|
| wash, chassis | 0.53 | 0.50 | content bound |
| quiet | 0.60 | 0.58 | + 1 step |
| resting (= card) | 0.67 | 0.66 | + 2 steps |
| floating, dock (both morph endpoints), crown, well | 0.89 | 0.86 | chrome bound + margin |
| overlay, sheet | 0.96 | 0.94 | chrome + 1 step |
| dialog | **1.00** | 0.94 | light: synthesis choice (below) |
| opaque (level 0) | 1 | 1 | the same mix |

Step sizes:
- **Light step: 0.07** (`D3-A §2` item 3).
- **Dark step: 0.08.** Synthesis choice: the probe's 0.07 missed wash→quiet in M-6 by 0.0003 (`D3-A §3`). 0.08 is unmeasured.

The light dialog at α 1.00 is a synthesis choice. `D3-A §6` counterexample 5 names two cures: "the dialog rung must reach α 1 in light, or the scrim must stop under the plate". The first stays inside the pole's recipe. At the probe's 0.95, the real Dialog read L 0.967 (0.973 with the lifted card) and failed M-1 by 0.002.

**The well** (floor row 5) is `--glass-well`: `--card` mixed 8% (`--glass-well-tone`) toward `--glass-well-toward` (`--foreground` in light, `--background` in dark), painted at the chrome α and transmissive. `--input-on-glass` retires (`D3-A §2` item 7).

**The ink.** Static in both arms: `--foreground`, and `--on-glass-muted` (light `hsl(30 26% 35%)`, dark `hsl(34 16% 72%)`). The dock reads the same pair (`--dock-fg-on-aurora: var(--foreground)`, muted `var(--on-glass-muted)`) (`D3-A §2` item 5).

Indicators:
- `--ink-perimeter` becomes 0.52 on the chrome composite. 3:1 sits near 0.505, because contrast climbs about 0.10 per 0.01 of the rung (`D3-A Q2`).
- The Dialog Close ring's hand literal (`dialog/styles.css:144,243`, 48%) routes through `--ink-perimeter`. Shared fact S-12 gives the literal; D3-A left the ring's re-derivation open.
- The two-tone edge (`box-shadow: 0 0 0 1px var(--card)` outside the ink border) is the stated alternative if the content band must hold 3:1 over hostile grounds. At 0.48 it measured 2.96-3.05 light and 3.67-3.81 dark on every ground (`D3-A Q2`), so a light rung near 0.52 is still needed.

**The luma owner.** Nobody. The bound is the guarantee. The live channel is deleted: the sampler's 746 lines, the clamp in `glass/veil.css`, the knee (`--glass-backdrop-luma-knee`), and `--glass-backdrop-luma` with its `@property`.

**The content-band declaration** is a written, consumer-facing rule (`D3-A §2` item 4): content glass guarantees muted AA over paper and library fields at ceiling ≤ 0.5, and nothing else. Text-bearing content surfaces over any other ground (ceiling 1, photos, a user-seeded field, black) take a chrome rung.

**Blur and saturate.**
- Blur is 6/10/12/16/16 px (wash … overlay). The dock rides `--glass-blur-resting-radius` (12). Legibility is carried by α, and blur moves the light photo bound by only 0.852 → 0.830 (`D3-A Q1`, `Q3`).
- Saturate is one value, `--glass-saturate: 1.5`, the value the bound was solved with (`D3-A Q1` model).
- Synthesis choice, unmeasured on the probe: the dock's private re-compositions (`shell.css:57,263`) read `--glass-saturate`, and the dark `brightness(1.14)` is dropped. The research states "one saturate" but did not name the dock's filters.

**Common floor rows.**
- **1:** `contain: paint` goes from `material.css:108`.
- **2:** every `contrast-color()` glass ink and the bright bucket go. `--glass-backdrop` is deleted with no surviving role; the probe left it declared as owed (`D3-A §3`).
- **3:** the battery is the one instrument.
- **4:** the level-0 escape is α = 1 on the same mix. PCM rides level 0.3 through the recipe, and the static ink needs no PCM arm because every ink is solved against the bound.
- **5:** the well is a chrome rung.
- **6:** the consumer overrides retire (A.2).

**The four problems.**
1. A light plate is a card frost: L 0.976-0.980, ΔE paper 0.009-0.015.
2. The ink is honest against the bound.
3. The dock is chrome and needs no signal.
4. The ladder is the bound-plus-step table above, with O-61 cured by floor row 1.

### A.2 Public API delta and migration

Library (E-1, no aliases; `D3-A §4`):
- **`GlassDock`:** `backgroundCanvas` is deleted, and `backdropMode` becomes `"glass" | "opaque"` (was `"live" | "static"`), defaulting to `"glass"`.
- **Deleted tokens:** `--glass-veil-ink`, `--glass-veil-base`, `--glass-backdrop-luma` (and its `@property`), `--glass-backdrop-luma-knee`, `--input-on-glass`, `--glass-backdrop`.
- **Added tokens:** `--glass-veil-content`, `--glass-veil-chrome`, `--glass-well`, `--glass-well-toward`.
- **Kept, with new values:** `--glass-veil-{wash,quiet,resting,floating,overlay,dock,dialog,sheet,crown,chassis}`, `--glass-veil-step`, `--glass-plate-*`, and the light `--card`.
- **Owed call sites:** `sheet/styles.css:216,226` read `--glass-veil-ink`; `music-staff/styles.css:63` writes it; `tokens/manifest.ts:22` lists it; plus the demo stories and tests that reference the deleted API (`D3-A §3`).

Consumers (E-6 addenda):
- **chicago:** delete `style.css:140-141`; the 0.62 floor is inert under 0.89. Delete the count's `opacity: 0.6` once M-4 reads green.
- **keyframes:** delete `ChromeDock.vue:370` and its getter; re-point `TimelineCaret.vue:106` from `--input-on-glass` to `--glass-well`.
- **fourier:** retire the `.glass-opaque` Configurator (floating over paper reads muted 6.08-6.21) and the strong-muted hand picks over paper.
- **value.js** (lands through X-W7L):
  - Its certified-ink model already models a `--card` pole at a rung α, so THE STOP should clear.
  - Its panes are content rungs over a user-seeded field whose bound is 0.845, so they take a chrome tier by addendum.
  - Its reduced-transparency block keeps the at-element recipe.

### A.3 Battery

Evidence is the probe at `dac7d50c` (`D3-A §3`), which ran the step at 0.07 in both themes, chrome at 0.88/0.86, dialog at 0.95 and the perimeter at 0.48.

| witness | verdict | measured evidence | why it stays RED |
|---|---|---|---|
| M-1 | GREEN on the ladder once the card lifts | Probe FAIL 2/11: every translucent plate and the dock read L 0.976-0.980. With `hsl(30 85% 97%)` every ladder row passes in both engines, and the real Dialog reads L 0.973 (FAIL 2/21) | the real Dialog at 0.95. The spec's light dialog at 1.00 is meant to close it; unmeasured |
| M-2 | GREEN on chrome, and on content over its declared grounds | Probe FAIL 35/560, all content rungs over undeclared grounds: light c1 muted 3.34-4.11, light black 1.72-2.66, dark white fg 2.41-3.54 | by declaration: content α ≤ 0.67 cannot hold over ceiling 1 (bound 0.766/0.799), black, the checker or the stripes |
| M-3 | GREEN on chrome at a re-derived rung (the 0.60 variant) | 0.48: light paper 2.76-2.82. 0.60: chrome rows green except the Close ring. **0.52 not captured** | the Close ring (2.89-2.92 light) until it is routed; content-band edges over black (1.04 at 0.48, 2.09 at 0.72) |
| M-4 | unresolved (instrument, S-9) | fg = muted = `#705942` / `#c3b9ac`; neither ink is a pole | the specimen's "fg" run is an inactive tab |
| M-5 | **GREEN** | 0 `getImageData`, 0 `readPixels` in all 8 live windows. Dock 5.32-6.67 over both ceilings, both themes | — |
| M-6 | GREEN in dark; RED in light | dark: plates 0.078-0.150 from the page, adjacent 0.013/0.030/0.011, and wash→quiet 0.010 reds by 0.0003 at step 0.07. Light adjacent 0.002-0.003 | light: structural (S-7) |
| M-7 | **GREEN** | reach 18/17 px at every host; Playwright WebKit PASS 8 | — |
| M-8 | **GREEN** | light C 0.016-0.022, bleed ≤ 1.01; dark C 0.024-0.034. Green at all three blur ladders (`D3-A Q3`) | — |
| W-A | legs 1-3 GREEN (leg 3 by declaration); leg 4 RED as written | FAIL 20/197. Leg 2: chrome ≥ 4.5 over black and white in both themes, worst 4.65 / 4.60. Painted bound 0.865/0.855 against analytic 0.871/0.854 | leg 4 reads "α equals the bound", which contradicts a separable dark ladder. `D3-A` asks that it be restated as "α ≥ bound, and the thinnest rung of each band = bound" |

### A.4 Chrome and WebKit

- **Chromium 149:** every row above.
- **Playwright WebKit, paint-only:**
  - Composites agree within ΔE 0.0018 (1/255 per channel).
  - Glyph rings do not agree: light floating muted over black reads 4.44 against Chromium's 4.65, and the painted bound reads 0.885. The 0.02 engine margin in the chrome α exists for this.
  - It paints no blur and crashes on the dock.
- **Real Safari:** UNMEASURED, including whether blur and `saturate(1.5)` move M-2 (analytically ≤ 0.006 at α ≥ 0.86, `D3-A Q5`).

### A.5 Open gaps (verbatim, `D3-A §7`)

- Real Safari, every cell: UNMEASURED (owner's safaridriver checkbox).
- **M-4 needs its specimen re-pointed.** The fg run should be the active tab or a `--dock-fg-on-aurora` icon, not an inactive tab. It is not measured here because the harness is read-only to this seat.
- **Content α under the ceiling-1 declaration was not captured.** The analytic answer is 0.77 / 0.80. Neither the combined probe (content = chrome) nor the perimeter rung at 0.52 was captured (0.60 and 0.72 were).
- The Dialog Close focus-ring ink was not traced to its token, nor re-derived.
- **Deferred cost:** the demo and test updates, `sheet.css` and `music-staff` re-derivation, the `manifest.ts` token list, and the stale comments. vue-tsc and unit tests were not run on the probe.
- **The photo corpus is chicago's 49 listing photos at 400 px.** It covers no video or text-over-text ground, and value.js's field was modelled by an OKLCh sweep, not rendered.
- **One process note:** `git add -N .` ran inside the scratch worktree to capture the new-file diff into the patch. That wrote only the worktree's own index, before the worktree was removed. No git write reached the checkout.

Added by synthesis: the dark step 0.08, the light dialog α 1.00 and the dock's filter unification are unmeasured.

---

## D3-B · The field signal

### B.1 Mechanism

**The veil.** One pole, `--card`, at a per-surface α solved in CSS from published field statistics, clamped between the rung's floor and 1. Rung floors come from the probe (`D3-B §3.1`): light base 0.26 and step 0.08; dark base 0.52 and step 0.08 (the dark step is HEAD's, kept by the probe).

| rung | light floor | dark floor |
|---|---|---|
| wash, chassis | 0.10 | 0.36 |
| quiet, dock expanded | 0.18 | 0.44 |
| resting (= card) | 0.26 | 0.52 |
| floating, crown, dialog | 0.34 | 0.60 |
| overlay, sheet | 0.42 | 0.68 |
| dock collapsed | wash | wash |
| unpublished (any rung) | the bound: α 0.894 | the bound: α 0.853 |

**The solve** sits in `@utility glass-plate`, per theme, on encoded tone (`D3-B §2` item 5, finding 3):

```css
--glass-field-sign:  calc(2 * var(--glass-field-dir) - 1);            /* +1 light, −1 dark */
--glass-field-worst: calc(var(--glass-field-dir) * var(--glass-backdrop-luma-lo)
                        + (1 - var(--glass-field-dir)) * var(--glass-backdrop-luma-hi));
--glass-field-e:     calc(1.055 * pow(var(--glass-field-worst), 0.416667) - 0.055);
--glass-veil-rest:   clamp(var(--glass-veil-tier),
    calc(max(0, var(--glass-field-sign) * (var(--glass-need-e) - var(--glass-field-e)))
       / max(0.001, var(--glass-field-sign) * (var(--glass-pole-e) - var(--glass-field-e)))),
    1);
```

The solve's inputs:
- `need` is the composite luminance muted ink needs at target 4.7 (light) or 4.6 (dark).
- `pole` is `--card`.
- The sign term is load-bearing: without it, paper in light solved α 1 (`D3-B §2` item 5).
- The pole's and the inks' luminances come from one source: `--card` and `--on-glass-muted` are authored as `oklch(L …)` with L as its own token, and Y = L³. The probe restated them as numbers, which is P-3 debt.

**The well** (floor row 5). Synthesis choice: the research did not specify it.
- The well is a `glass-plate` surface that no component registers, so it is always unpublished and sits at the bound α (0.894 / 0.853).
- Its colour is `--card` toned 8% toward ink.
- Reason: a well's `backdrop-filter` inside a rung sees only the rung's paint (S-2), so no field publication describes what is under it.

**The ink.** Static per theme: `--foreground` and `--on-glass-muted`. The dock's muted register reads `--on-glass-muted` (`D3-B §3.1`). `--ink-perimeter` and the focus rings are untouched: this family moves the veil, not the ink (`D3-B §5` item 11).

**The luma owner** is the substrate (`D3-B §2` items 1-4, 6-7).

Publisher:
- A library substrate reduces the frame it just drew, inside its own command encoder, before presentation.
- The swap-chain texture carries `TEXTURE_BINDING` (`useWebGPUCanvas.ts:228`).
- It reduces the composite as painted: the frame at the root's computed opacity over the page ground, on encoded channels.

Statistics:
- A 32×18 tile grid. Per tile: the mean, p05 and p95 of relative luminance, from a 128-bin histogram (p05 on the bin's lower edge, p95 on its upper edge).
- Copied into a 3-deep ring of `MAP_READ` buffers and read by `mapAsync`.

Validity predicate:
- A publication is false while the arm cross-fade is in flight (inner opacity < 0.999), or when the ceiling has moved since the reduction.
- An invalid publication reads as unpublished.

Surfaces:
- Components register their surfaces (`GlassDock`, `PopoverContent`, `DialogContent`, `Card`) with a `ResizeObserver` and scroll/transform notification. Plain `.glass-*` markup stays unpublished.
- Each registered surface receives, as `--glass-backdrop-luma{,-lo,-hi}`:
  - the worst p05 (light) or p95 (dark) over the tiles its rect touches, padded by 3σ of its blur;
  - the area-weighted mean under its own rect.
- The properties are registered `<number>`, `inherits: false`, initials 0 / 0 / 1. A write happens only when the value moves by more than 0.004.
- A surface that no single valid publisher covers is unpublished.

Other sources and breakers:
- **`declareField(el)`** on `/glass` takes an `<img>`, `<video>` or `<canvas>` element, and the library reduces it itself. A consumer never hands in a number. Cross-origin media fails loud at `copyExternalImageToTexture` (`D3-B Q4`).
- **The occluder breaker:** a surface whose stacking context holds a layer the publisher did not reduce is unpublished. That means `.bg-overlay-scrim`, `.glass-focus-veil` and any `[data-glass-occluder]`, checked by `elementsFromPoint` at registration.
- **There is no page publication by default.** It is the masking fallback (`D3-B §0` finding 4).

**Blur and saturate.** HEAD's, unchanged in the probe: 10/14/16/20/22 px, `--glass-saturate: 1.5`, and the dock's re-compositions. The 3σ pad reads each rung's radius. The solve target of 4.7 in light absorbs the residual chroma error (`D3-B Q3`).

**Common floor rows.**
- **1:** `contain: paint` goes.
- **2:** `contrast-color()` inks and the bright bucket go. The `--glass-backdrop` bucket goes (`D3-B §4`).
- **3:** one instrument.
- **4:** `backdropMode: "static"` stays as the level-0 escape.
- **5:** the well is an unpublished rung, as above.
- **6:** consumer overrides retire (B.2).

**The four problems.**
1. Over paper every surface is unpublished and at the bound, a card frost.
2. The veil moves to meet static ink.
3. The dock subscribes to a GPU publication with no DOM readback.
4. The ladder is a floor table plus the solve; O-61 is floor row 1.

### B.2 Public API delta and migration

Library (`D3-B §4`):
- **New:** `declareField(el)` on `/glass`, and the three registered properties, read-only and marked by `data-field="published"`.
- **Removed:** `GlassDock`'s `backgroundCanvas`; the `backdropMode: "live"` observer; `--glass-backdrop`; `--glass-backdrop-luma-knee`; the sampler's 746 lines.
- **Changed:** `--glass-veil-tier` now means the rung's floor α of the `--card` pole, not an ink alpha. Any consumer tier override changes meaning.

Consumers:
- **value.js:** gets nothing until publication moves into `useAurora` and covers its WebGL2 arm. The `"css"` arm stays at the bound. Its panes at the bound read near-opaque `--card`, which keeps its model solvable. It retires `data-glass-field-canvas` and `derivedLightness` by addendum.
- **keyframes:** delete `ChromeDock.vue:370`. The 0.1-ceiling hero publishes its composite. Its `.glass-*` sites stay at the bound unless its components register.
- **fourier:** nothing publishes for prose, plots or its `isolate` paper, so everything sits at the bound: legible, and not grey (ΔE 0.016, C 0.014). `declareField(canvas)` on its plots is the one way to thin them.
- **chicago:** its photos are cross-origin, so they cannot publish, and the dock over them sits at the bound. Its 0.62 floor retires by addendum.

### B.3 Battery

Evidence is the `d3b-strict2` arm (`D3-B §3.2`).

| witness | verdict | measured evidence | why it stays RED |
|---|---|---|---|
| M-1 | RED by 0.001 | FAIL 11/11: every plate at the bound paints `#fdf5ed`, L 0.974, against a floor of 0.975 | the `--card` L fact (S-6); a pole decision outside the signal |
| M-2 | GREEN but for the scrim | FAIL 2/560: only the real Dialog's muted caption, 4.20 (c1) and 3.23 (c0.5). Every hostile ground is green: light over black muted ≥ 4.79, dark over white ≥ 4.51 | the scrim falsifies the publication. The occluder breaker (specified, not probed) would put the Dialog at the bound |
| M-3 | RED | FAIL 209/266: the perimeter and rings are untouched, 2.29-2.92 in light | static ink by design |
| M-4 | RED (instrument, S-9) | fg = muted = `#705942` / `#c3b9ac` | the inactive-tab specimen |
| M-5 | **GREEN** | 0 readbacks in every 9 s window. Dock fg/muted: light c1 4.62/4.68, dark c1 5.18/4.95 | — |
| M-6 | GREEN in dark only | FAIL 8/19: over paper every rung is unpublished and at the bound (adjacent 0.000, both themes); dark plates 0.131 from the page | the ladder collapses wherever nothing publishes; light is also infeasible (S-7) |
| M-7 | **GREEN** | reach 18/17 px in every host | — |
| M-8 | **GREEN** | C 0.019-0.021 light, 0.029-0.034 dark; bleed 1.00-1.05 | — |
| W-B | GREEN on a clean raw; RED as the harness reads | FAIL 7/24. Readbacks 0 in all 8 windows. Latency 2 frames in 7 of 8 steps. Published vs painted mean under the dock: Δ 0.001, 0.001, 0.001, 0.000 against a clean raw (`wb-clean.mjs`) | the harness `raw` leak (S-10) biases the painted reference by −0.008 to +0.036 |

The page-publication arm (`d3b-page2`) is recorded, not specified. It turns M-1's plates green (L 0.980-0.984) and fails silently elsewhere: M-2 FAIL 88/560, light over black fg 1.01, M-8 chroma 0.049-0.070.

### B.4 Chrome and WebKit

- **Chromium 149:** the whole path runs: the WebGPU reduction, `pow()` in `calc()`, registered `inherits: false` properties taken by explicit `inherit`.
- **Cost (`D3-B §1.1`, `§1.6`):**
  - GPU: 71-127 µs per frame.
  - Publication: 1.8-2.8 ms p50 after submit.
  - Main thread: 21-23 ms/s script and 39-57 ms/s style at 21 surfaces, with 0 frames over 20 ms.
  - SwiftShader: 6 of 240 frames publish.
- **Playwright WebKit:** no `navigator.gpu`, so the aurora runs its GL arm and nothing publishes. Every surface sits at the bound, the paint-only rows agree (light muted 4.58-5.72), and M-1 misses by the same 0.001. The dock crashes it.
- **Real Safari:** WebGPU and `mapAsync` ship in 26 (BCD). Latency and `TEXTURE_BINDING` alpha behaviour are UNMEASURED.

### B.5 Open gaps (verbatim, `D3-B §6`)

- Real Safari: `mapAsync` latency, reduction cost, and the `TEXTURE_BINDING` swap chain's alpha and premultiply behaviour: UNMEASURED (owner's safaridriver checkbox).
- Integrated GPU (Intel/AMD iGPU) reduction cost and `mapAsync` latency on Chrome 149: no hardware here.
- The WebGL2 arm's publication, and whether a PBO + `fenceSync` read is acceptable under W-B and M-5.
- `useAurora` (value.js's path), the image-source arm (`setupImageWGPU`), blob and constellation substrates: no reduction written.
- The scrim/occluder breaker (§2 item 7) and component registration (§2 item 4): specified, not probed.
- The harness `raw` leak (§0 finding 2): W-B goes green only after `capture.mjs` hides `[data-spec] *`; the probe's clean re-read is `S/probe/wb-clean.mjs`.
- A pointer-driven field (the gel snap-back) against the 2-frame window: drift measured only for the autonomous drift.
- The pole's L (M-1's 0.001 miss) and the light ladder's separation over paper: both need a pole or floor decision outside the signal.

Added by synthesis: the unpublished well is unmeasured.

---

## D3-C · The cascade ink

### C.1 Mechanism

**The veil.** A thin `--card` frost at `α = 1 − (1 − rung)·level`, plus a solved floor layer beneath it that engages only outside the ink band. Values are from the c5 probe (`D3-C §2` item 8):

| rung | light α | dark α |
|---|---|---|
| wash, chassis | 0.10 | 0.32 |
| quiet, dock expanded | 0.15 | 0.40 |
| resting (= card) | 0.20 | 0.48 |
| floating, crown, dialog | 0.25 | 0.56 |
| overlay, sheet | 0.30 | 0.64 |
| well (`--glass-veil-well`) | 0.35, floor off | 0.35, floor off |

- Light base is 0.20 and step 0.05; dark base 0.48 and step 0.08. M-6's page separation needs dark α ≥ 0.32 (`D3-C §5` item 7).
- Chassis, crown and sheet follow HEAD's offset formulas; the research stated dock and dialog only.
- Chrome rungs (floating, overlay, dock) carry `--glass-calm: 0.12`, the maximum encoded channel spread.
- The Dialog is a room: `--glass-floor-e: 0.98` in light.

**The declared ground** (`D3-C §2` items 1-2, 6):
- `--glass-ground-lo` and `--glass-ground-hi` are colours: the dark and bright bounds of what paints behind a scope. `:root` declares both as `var(--background)`.
- `--glass-ground` is a registered `<color>` that inherits. It reads `-lo` in light and `-hi` in dark.
- `Aurora.vue` publishes its pair on `document.documentElement`: it samples `sampleAuroraField` on a 12×12 grid, takes the p10 and p90 luminance samples, and writes each as `color-mix(in srgb, <sample> <ceiling>%, var(--background))`.
- A consumer declares its own pair on the scope that paints its background. It declares the bound, not the mean (`D3-C Q6`, finding 4):
  - a fine texture declares its blurred mean;
  - a coarse two-colour ground declares its darker colour for light ink and its brighter colour for dark ink.
- `--glass-backdrop-in` models layers between ground and plate. The Dialog declares its scrim (`--overlay-scrim-ink` at 50%) and the focus veil, and `--glass-focus-veil-dim` is rewritten to the same product. Children reset it to `initial`.
- A scope's non-scope children receive `--glass-ground: var(--glass-composite)`.

**The composite chain** (`@utility glass-scope`, in order, all in the cascade; `D3-C §2` item 4):
1. `--glass-sat`: the saturate matrix of the backdrop, applied to the ground (registered):
   `color(from G srgb clamp(0, (0.213 + 0.787s)·r + (0.715 − 0.715s)·g + (0.072 − 0.072s)·b, 1) …)`.
2. `--glass-floor`: `color(srgb P P P / A)`, white in light and black in dark. A = max(the luma floor, the chroma calm), where the luma floor is clamp(0, (E_t − E)/(P − E), 1) on the encoded luma of `--glass-sat`.
3. `--glass-lift`: the floor over the backdrop (registered).
4. `--glass-veil`: `--card` at the rung α.
5. `--glass-composite`: the veil over the lift (registered).

`@utility glass-plate` paints `background: linear-gradient(var(--glass-veil) …), linear-gradient(var(--glass-floor) …)`. The dock computes the chain on `.glass-dock` (whose tier lerp moves there), and `.dock-plate` paints the inherited layers.

**The ink** is the exact WCAG solve against `--glass-composite` (`D3-C §2` item 5; Q1):

```css
--muted-foreground: oklch(from color(from var(--glass-composite) srgb-linear k k k) l c h);
/* k = the exact WCAG solve from Y = 0.2126r + 0.7152g + 0.0722b at target T;
   dark ink in light (--glass-ink-dir: 1), light ink in dark */
```

| rung | target | chroma / hue |
|---|---|---|
| `--muted-foreground` | 5.0 | light c .035 h 60; dark c .03 h 70 |
| `--muted-foreground-strong` | 8 light, 7 dark | same as muted |
| `--glass-perimeter` | 3.6 | c .02 |

- `--foreground` is not solved: inside the band it clears 6.07 / 6.18 by construction.
- The perimeter also resolves at `:root` against the page ground, so `.focus-ring`, the Dialog Close and the field wells read one rung.
- The well's perimeter is solved against the plate (the binding side). Its recess lip and focus halo use shadow ink `oklch(0 0 0)`.
- Dock tabs read `--muted-foreground-strong` (`tab-button.css:47`), so tab and caption keep two solved registers (M-4).

**The luma owner** is the declaration: the page, a library substrate (a config-derived CPU publication), or the consumer. Nothing is read back.

**Blur and saturate.** One filter recipe on every text-bearing rung: `blur(r × level) saturate(var(--glass-saturate))`. Radii are HEAD's 10/14/16/20/22 and saturate is 1.5; the model mirrors saturate exactly (ΔE ≤ 0.004, `D3-C Q2`). The dock's `saturate(1.2)` and its dark `saturate(1.3) brightness(1.14)` retire (`D3-C §2` item 3).

**Common floor rows.**
- **1:** `contain: paint` goes.
- **2:** both `contrast-color()` blocks and the bright bucket go.
- **3:** one instrument.
- **4:** the escape composes at the element, so a descendant `--glass-level: 0` re-resolves. The opaque rows read `--card` at ΔE 0.000.
- **5:** the well is a rung at 0.35 of the floor pole.
- **6:** consumer overrides retire (C.2).

**The four problems.**
1. A thin frost: plates L 0.981-0.985.
2. The ink is solved against the declared composite.
3. The dock solves against the ground published under it.
4. The ladder is thin static α plus a solved floor; O-61 is floor row 1.

### C.2 Public API delta and migration

Library (`D3-C §4`):
- **New:** `--glass-ground-lo/-hi` (the consumer declaration); `--glass-ground` and `--glass-composite` (registered `<color>`s; the composite is the paintable plate colour X §3.4 #2 asks for); `--glass-backdrop-in`; `--glass-calm`; `--glass-{muted,strong,perimeter}-target` (retunable by presets, E-5).
- **Removed:** `--glass-veil-ink`; `--on-glass-muted`, `-strong`; `--input-on-glass`; `--glass-backdrop`; `--glass-backdrop-luma`; `backgroundCanvas`; `backdropMode: "live"` sampling; the sampler's 746 lines. The last three were not done in the probe.
- **Behaviour change:** a consumer `--muted-foreground` inside a glass scope is overridden by the solve. A consumer that needs a hand ink sets the targets instead.

Consumers:
- **value.js:**
  - Declares `-lo/-hi` from the darkest and brightest stops of `--saved-bg-0..3`.
  - Retires `ink.ts:24-124`, because `--glass-composite` is published.
  - Drops its reduced-transparency `!important` block.
  - Its `useAurora` arms do not publish yet.
- **keyframes:** delete `ChromeDock.vue:370`. The 0.1 hero publishes automatically.
- **fourier:** declare the plots' ground as `--card`, and the prose overlays with the ink colour as `-lo`. Retire `.glass-opaque` and the `-strong` picks.
- **chicago:** retire the 0.62 floor. Declare the `.ground` bounds and a photo-band pair; `#000` / `#fff` is legible and near-opaque.

### C.3 Battery

Evidence is the c5 probe (`D3-C §3`). "Declared" means the stands carry the Q6 consumer declarations.

| witness | verdict | measured evidence | why it stays RED |
|---|---|---|---|
| M-1 | GREEN but for the escape | FAIL 1/11: plates L 0.981-0.985, ΔE 0.003-0.007; the Dialog `#faf8f6` L 0.981 | the opaque escape is `--card` at L 0.974 (S-6) |
| M-2 | GREEN wherever the ground is declared | FAIL 124/560, all on the undeclared stands. Paper and both ceilings clear in both themes. Declared stands: muted 4.86-6.73, fg ≥ 7.11 | an undeclared ground is silently wrong (1.00-4.06) |
| M-3 | GREEN but for the dark Dialog well | FAIL 93/266 (the undeclared stands). Dark-paper Dialog well: perimeter 2.53, ring 2.83; declared dark black 2.41 / 2.71 | a nested `backdrop-filter` well inside the longest chain (S-2) |
| M-4 | **GREEN** | PASS 14/14: light ΔL_OK 0.109-0.111 (tab `#5c493a`, label `#7c6858`); dark 0.088-0.091 | — |
| M-5 | **GREEN** | 0 readbacks. Dock fg 7.41-8.06, muted 5.05-5.27 | — |
| M-6 | GREEN in dark only | FAIL 4/19. Dark adjacent 0.011-0.014; from the page, wash 0.051 … Dialog 0.116. Light adjacent 0.002 | light: S-7 |
| M-7 | **GREEN** | reach 18/17 px | — |
| M-8 | GREEN where declared | undeclared stripes: FAIL 7/8, C 0.053-0.079. Declared: C 0.0122-0.0202, bleed 1.01-1.02 | undeclared stands |
| W-C | GREEN on its centre | FAIL 122/304 overall. On paper, both themes and after the retune: 18/18 in [4.5, 5.5] | the band's upper edge only: field content in dark (to 6.62) and wells (to 7.05). The bound publication and the backdrop-root well over-deliver |

### C.4 Chrome and WebKit

- **Chromium 149:** every row above. Style recalc is +10-17% on the largest route (`/substrates/aurora`, 1,432 elements). Emitted CSS grows +16.6% raw and +4.4% gzip (`D3-C Q4`).
- **Playwright WebKit:**
  - The solves agree to the third decimal.
  - The four-level Dialog chain resolves to 0 bytes of difference (`D3-C Q5`).
  - It paints no saturate, so the composite departs by up to ΔE 0.049 on vivid grounds, and the checker never averages without blur.
  - Recalc is about 2.1× on a scope-dense page.
  - The dock crashes it.
- **Real Safari:** UNMEASURED: the model, the solve, the cost and Q5.

### C.5 Open gaps (verbatim)

From `D3-C §2`, "Not yet specified precisely, and owed":
- **Publication outside `<Aurora>`.** `useAurora` on a consumer canvas (value.js's WebGL2 and `"css"` arms) publishes nothing.
- **Live motion.** The drift and breath terms are outside the CPU mirror, so the bound is the static field's (PORTFOLIO §2.5: mirror p90 ΔE 0.062).
- **Two substrates.** A document with two publishing substrates has one pair.

From `D3-C Q4`: "A real-Safari number is the open cell."

From `D3-C Q5`: "Exact in Playwright WebKit. Real Safari remains the one open cell, and the prototype's Dialog chain is the probe to run there."

From `D3-C §5`:
- item 3: "The cure consistent with C is a well that carries no `backdrop-filter`; not probed."
- item 12: "no inertia (D-1) beyond what a registered-colour transition on `--glass-ground` could add, which was not probed."

---

## D3-D · The calibrated ladder

### D.1 Mechanism

**The veil.** Every per-level number is a solver output in `src/styles/tokens/glass.solved.css`. Line 1 reads `/* solver: node scripts/glass-solve/emit.mjs */`. The file is `@import`-ed after the dark arm, so its `.dark` block is the one dark writer, and every number it holds is deleted from its hand-written home (`D3-D §2.1` item 8).

The emitted file under the as-written band (`D3-D §2.2`):

| token | light (`:root`) | dark (`.dark`) |
|---|---|---|
| `--glass-veil-pole` | `rgb(255 255 251)` | `rgb(0 0 0)` |
| wash · quiet · resting | 0.600 · 0.600 · 0.600 | 0.751 · 0.852 · 0.945 |
| floating · overlay | 0.678 · 0.678 | 0.951 · 0.955 |
| dialog (scrim-aware) · dock | 0.937 · 0.768 | 0.853 · 0.799 |
| chassis · crown · sheet | 0.600 · 0.937 · 0.678 | 0.751 · 0.853 · 0.955 |
| blur radii, wash · quiet · resting · floating · overlay | 0 · 6 · 6 · 9 · 9 px | same |
| saturate, every rung and the dock | 1 | 1 |
| `--on-glass-muted` | `rgb(66 45 23)` (fg L + 0.10) | `rgb(206 196 183)` (fg L − 0.10) |
| `--ink-perimeter` | 0.82 | 0.82 |

The header carries the corpus sha256 `b8312697c243a289`, the engine (Chromium 149.0.7827.55), the settings, and `light: INFEASIBLE: M-6 …; dark: feasible`.

**The solver** (`D3-D §2.1`, `§1.1`):
- **Variables, per theme:** one pole, searched along the card hue in OKLCh lightness (light C 0.006 h 75; dark C 0.02 h 60); the muted ink (the M-4 floor, fg L ± 0.10); and the perimeter rung (stage 2).
- **Variables, per level:** α by bisection (sound, because the pass set is monotone once the pole sits on the far side of the ink); r ≤ the F48 cap (≤ 9 px) and s ∈ {1, 1.5} by grid.
- **Constraints:** the least α holding M-2 on every corpus field in the level's band, plus M-8 on chrome.
- **Ordering:** a thicker rung carries at least the veil of the one below and sits ≥ 0.012 above it over paper.
- **Dark:** plates are raised to page separation 0.052.
- **Selection:** the pole with the highest mean transmission among feasible ladders.
- **Dialog:** raised to the least α holding M-1 over scrimmed paper (light) and page separation over the scrimmed page (dark).
- **Margins, specified and not yet run:** M-2 solved at 4.65 and M-8 bleed at 1.20.
- **Infeasibility is output:** the header names each violated row, and nothing clamps quietly (E-2).
- **Two stages:** stage 1 solves the plate over the corpus. Stage 2 renders the stage-1 build and solves `--ink-perimeter` over its painted wells and rings. Every indicator colour routes through that rung; the Dialog Close literal is routed (`dialog/styles.css:144,243` → `calc(var(--ink-perimeter) * 100%)`).

**The corpus** is frozen data with a manifest (`D3-D §2.1` item 1, `§1.3`):
- Fields: paper in both themes; black, white, the 16 px checker and the 24 px stripes; `DEFAULT_AURORA_CONFIG` plus the 18 demo presets at ceilings 1 and 0.5; the blob hero.
- The manifest carries a digest, a licence line per field, and the reference engine and backend.
- A liveness check rejects any field whose L spread is 0. The default blob fails it.
- Fields are never re-rendered at solve time.

**The band table** is part of the source of record (`D3-D §2.1` item 2). The as-written battery puts every level over every ground, which is what the numbers above solve. The owner's band ruling is the family's largest lever (open gap, D.5): banded content solves light wash, quiet and resting at α 0.113.

**The ink.** `--foreground` stays hand-set. `--on-glass-muted` and `--ink-perimeter` keep their names and change writer to the solver. The dock's `--muted-foreground` is `--on-glass-muted` (was `--foreground`), and an inactive tab reads `--dock-fg-on-aurora` (`tab-button.css:47`, was `--muted-foreground`) (`D3-D §2.2`).

**The luma owner** is the corpus. The dock is solved as chrome over the corpus, so its α is static and the sampler goes.

**Blur and saturate.**
- Emitted per level; above, 0/6/6/9/9 px and s = 1 everywhere. M-8's chroma half wants s = 1, and HEAD's 1.5 has no support in the solve (`D3-D §1.1`).
- The dock reads `--glass-saturate-dock`, and the dark `brightness(1.14)` is dropped.
- The dock's radius is still `--glass-blur-resting-radius` (`D3-D §3` item 9).

**Common floor rows.**
- **1:** `contain: paint` goes.
- **2:** the bright bucket and `contrast-color()` go.
- **3:** the battery is the instrument; it never reads the solver's model.
- **4:** `--card` escape unchanged.
- **5:** NOT done: the well stays the opaque `--input-on-glass` in the probe.
- **6:** consumer overrides retire (D.2).

**The four problems.**
1. A near-white frost: L 0.991-0.993.
2. The inks are solver outputs, measured on painted rings.
3. The dock is static chrome.
4. The ladder is the emitted file; O-61 is floor row 1.

### D.2 Public API delta and migration

Library (`D3-D §2.5`):
- **Deleted:** `--glass-veil-ink`, `--glass-veil-base`, `--glass-veil-step`, `--glass-saturate` as a written token, and `GlassDock`'s `backgroundCanvas` (`useGlassBackdropLuminance` was never on the barrel).
- **Added:** `--glass-veil-pole` and `--glass-saturate-{wash,quiet,resting,floating,overlay,dock}`.
- **Unchanged names, new writer:** `--glass-veil-{rung}`, `--glass-plate-{rung}` (still paintable), `--on-glass-muted`, `--ink-perimeter`.
- **Orphaned, owed to the wave:** `--glass-backdrop-luma` and its `@property` and knee.
- **Repo additions:** `scripts/glass-solve/` (4 scripts, about 330 lines), the 70-line generated file, and a corpus of 78 PNG (71 MB).
- **Gate W-D:** off the PR path (nightly or pre-release, triggered by changes to the corpus, the solver, `stages.json` or the specimens). Per PR, a 1 s digest compare.

Consumers:
- **value.js:** its model hard-codes rung alphas (`ink.ts:24-37`), so it must read the generated file or retire. Its seed space must enter the corpus, or its panes are outside the guarantee.
- **keyframes:** delete `ChromeDock.vue:370`. The 0.1 hero lies inside the band by monotonicity (argued, not measured).
- **fourier:** the `.glass-opaque` escape and the strong-muted picks are no longer needed (muted reads 12 on paper). Prose and plots are not in the corpus.
- **chicago:** the 0.62 floor and the count-by-opacity retire (M-4 green). Its photos cannot enter the corpus (licence unknown).

### D.3 Battery

Evidence is the `final` probe run (`D3-D §2.3`).

| witness | verdict | measured evidence | why it stays RED |
|---|---|---|---|
| M-1 | GREEN but for the escape | FAIL 1/11: light plates `#fefcf8`-`#fffcf9`, L 0.991-0.993; the real Dialog `#faf7f4` L 0.978 | `.glass-opaque` = `--card`, L 0.974 (S-6) |
| M-2 | **GREEN** | PASS 560. Light muted 4.54 (wash over black, the binding cell) to 12.95; dark muted 6.12-12.20 | — (zero margin; Playwright WebKit reads 4.41 at the binding cell) |
| M-3 | **GREEN** | PASS 266: well perimeter 4.69-8.18; Close ring 8.13-8.81 light, 3.90-3.96 dark | — |
| M-4 | **GREEN** | PASS 14: dock fg `#1c1917`, muted `#422d17`, ΔL_OK 0.100 | — |
| M-5 | **GREEN** | 0 readbacks in 8 windows; dock rings ≥ 9.69 over c1 | — |
| M-6 | GREEN in dark only | FAIL 4/19. Dark adjacent 0.016/0.017/0.030/0.046; plates 0.058-0.146 from the page. Light adjacent 0.000/0.000/0.001/0.000 | light: proven infeasible (S-7), emitted as INFEASIBLE |
| M-7 | **GREEN** | 18/17 px at every host | — |
| M-8 | **GREEN** | light floating/overlay bleed 1.25 (at the bound), C 0.0207; dark 1.02 | — (zero margin) |
| W-D | leg 1 GREEN; leg 2 RED | FAIL 4/9. A clean `emit.mjs` re-run is byte-identical. Leg 2 gates on Playwright WebKit: M-2 8/1092 (muted 4.35-4.41), M-8 bleed 1.43, plus M-1 and M-6 | Playwright WebKit paints no blur and crashes on the dock. `D3-D` amends the gate to `--gate chromium` plus Safari once enabled |

### D.4 Chrome and WebKit

- **Chromium 149:** every row above. The solver's backdrop stage is deterministic across Metal and SwiftShader (|Δα*| p95 0.003, identical emitted α). Field renders differ across backends by up to ΔE 0.42, hence the frozen corpus (`D3-D §1.2`).
- **Playwright WebKit:** plate paint matches within 1/255. With no blur, light chrome bleeds 1.43. Ink rasterises lighter (`#442f1a` for `#422d17`), costing 0.13 of contrast. The dock crashes it. Solving for r = 0 to fit it is refused (it costs 0.023 α on chrome).
- **Real Safari:** UNMEASURED. It is the planned second gate engine, through safaridriver (`D3-D §1.4`).
- **Cost:** emit takes 282-291 s on Metal; the shared battery about 20 min.

### D.5 Open gaps (verbatim, `D3-D §4`)

- Real Safari, every cell: UNMEASURED (owner's safaridriver checkbox).
- The band ruling (content over black and white, or not): the family's largest lever (α 0.600 → 0.113 in light content), and the owner's.
- The M-1 × M-6 conflict in light: an owner ruling on either M-1's radius, M-6 over paper, or ladder separation by non-paint means.
- The solve margins (4.65, 1.20) are specified, not yet run.
- The field well stays the opaque `--input-on-glass` in this probe; common floor row 5 (the well as a rung) is not done.
- The `--glass-backdrop-luma` registration and knee, and the demo stories that bind `backgroundCanvas`, are left for the full wave.
- The consumer fields (value.js seed sweep, keyframes' 0.1 hero, fourier's prose) are not in the corpus; chicago's photos cannot enter it.
- Dock rung per-engine calibration: impossible in Playwright WebKit (crash).
- The portfolio's −43% blur claim does not reproduce (−8% to −30% here); the metric difference is unresolved.

---

## D3-E · The self-grounded ink

### E.1 Mechanism

**The veil.** A thin `--card` frost, one law in both themes; the dark base override is deleted (`D3-E §6` item 5). The pole is renamed from `--glass-veil-ink` to `--glass-veil-pole` with no alias. Base is 0.20 and step 0.05:

| rung | α (both themes) |
|---|---|
| wash, chassis | 0.10 |
| quiet, dock expanded | 0.15 |
| resting (= card) | 0.20 |
| floating, crown, dialog | 0.25 |
| overlay, sheet | 0.30 |
| well | `color-mix(in srgb, var(--card) 30%, transparent)` |

- The well value is the probe's (`D3-E-probe.patch`, `on-glass-fg.css`). The spec retires the name `--input-on-glass` for the rung.
- Chassis, crown and sheet follow HEAD's formulas.

**The ink ground.** One inherited declaration on every rung and on `.glass-dock` (`D3-E §6` item 1):

```css
:where(.glass-wash, .glass-quiet, .glass-resting, .glass-card, .glass-floating, .glass-overlay, .glass-dock) {
  -webkit-text-stroke: var(--glass-ink-ground-width) var(--card);   /* --glass-ink-ground-width: 5px */
  paint-order: stroke fill;
}
```

The 5 px width is the witness's number, and it is independent of font size between 12 and 16 px. Each ink's contrast is then fixed in tokens: muted/card 6.06 light and 7.22 dark (`D3-E §1`).

**The resets**, each required (`D3-E §6` item 2, `§5`):
- `@media (forced-colors: active), print { -webkit-text-stroke: 0 }`;
- `::selection { -webkit-text-stroke-color: transparent }`;
- `-webkit-text-stroke: 0` on any `background-clip: text` run, and on every nested solid-fill control inside a plate (primary Button, Badge, active tab).

**Icons.** An SVG dilate ground, `filter: url(#glass-ink-ground)` (`feMorphology dilate 2.5` + `feFlood var(--card)`), shipped once in the library's root (`D3-E §6` item 3).

**Indicators are two-tone** (`D3-E §6` item 4). The ink is opaque, `color-mix(in oklab, var(--foreground) 60%, var(--card))`, replacing the translucent `--ink-perimeter` 0.48, and it sits on a pole band on both sides:
- control edge: `inset 0 0 0 2px var(--card)` plus an outer `0 0 0 2px var(--card)`;
- focus ring: `outline` over `box-shadow: 0 0 0 calc(var(--focus-ring-width) + 4px) var(--card)`.

The sRGB-proxy ratio of P60 against the card is 4.47 light and 5.05 dark.

**The text inks.** `--foreground` and the page `--muted-foreground`, solved against the card. The on-glass ink table (`--on-glass-muted*`) retires (`D3-E §8`). The dock's `--muted-foreground: var(--foreground)` self-engage and its `contrast-color()` block are deleted, so the dock reads the same pair.

**The luma owner.** Nobody: the glyph carries its ground. The sampler, the clamp and the knee are deleted.

**Blur and saturate** (`D3-E §6` item 6, `§4`):
- Blur 8/10/12/16/18 px. The chrome floor is 16 px, where M-8's bleed half lives.
- `--glass-saturate: 1.2` on content rungs; `--glass-saturate-chrome: 0.6` on floating and overlay.
- Chrome calm comes from desaturation inside the same `backdrop-filter`. This strikes the W-FROST clause that "the warm-cream read arrives by TRANSMISSION of the warm field through `saturate()`" (`tokens/glass.css:12-13`) as a clean break.
- The dock's filters are not addressed by the research.

**Common floor rows.**
- **1:** `contain: paint` goes.
- **2:** the bright bucket and both `contrast-color()` blocks go.
- **3:** one instrument.
- **4:** `--card` escape unchanged.
- **5:** the well is the 30% card rung.
- **6:** consumer overrides retire (E.2).

**The four problems.**
1. A thin frost.
2. Legibility at the glyph.
3. No signal.
4. The ladder is thickness only (thin α and blur), with calm by saturate; O-61 is floor row 1.

### E.2 Public API delta and migration

Library (`D3-E §8`):
- **Removed:** `backgroundCanvas` and the live observer; `--glass-veil-ink` (renamed); `--glass-backdrop-luma` and its knee; `--input-on-glass`; `--on-glass-muted*`; `--ink-perimeter` as an alpha.
- **Added:** `--glass-ink-ground-width`, `--glass-saturate-chrome`, the icon ground filter, and a perimeter ink colour token.

Consumers:
- **value.js:**
  - `.palettes-ramp-text` (`DockViewSelect.vue:132`) disappears until it opts out.
  - Its `::selection` (`foundation.css:587`) is perforated.
  - `ink.ts` retires rather than re-solves.
  - `--glass-plate-resting` readers keep a paintable token.
- **keyframes:** delete `ChromeDock.vue:370` and the dead tint-AA override.
- **fourier:** retire `.glass-opaque` and the strong-muted picks. Its `::selection` palette (`style.css:121-126`) is perforated. Glass over prose is covered at the glyph.
- **chicago:** retire the 0.62 floor and the count opacity. Photos are covered at the glyph.
- **Every consumer:** all text on glass becomes stroked lettering. X.md found 0 consumer `text-shadow` declarations to collide with.

### E.3 Battery

**No witness has read this family's probe.** `D3-E §7` records the battery unfinished at return (7 of about 70 cells). This seat read its log (`…/D3-E-research/run-e1.log`): the background run went on to crash at `chromium-dark-aurora50-dialog-base` ("Target page, context or browser has been closed"), and `out/caps/e1/results/` does not exist. The table is therefore the research's predictions plus its standalone probes, all UNMEASURED on the battery.

| witness | status | evidence from standalone probes (`D3-E §1`, `§4`, `§6`) | expected RED and why |
|---|---|---|---|
| M-1 | UNMEASURED; predicted GREEN on plates | analytic card-over-paper mix: L 0.982-0.984, ΔE 0.002-0.005 | the opaque escape (S-6); the real Dialog transmits its scrim (S-8) |
| M-2 | UNMEASURED; predicted GREEN at 5 px | CSS-only plates: muted p05 5.90-6.08 light and 6.52-7.21 dark over black, white, the checker, the stripes and the aurora at 12/14/16 px. Playwright WebKit 5.49-7.21 | icons (bare 1.71-1.79; dilate 4.10-4.17), emoji and nested solid controls, none of which the harness carries |
| M-3 | UNMEASURED; predicted GREEN on the well edge | P60 proxy 4.47 / 5.05 | the Dialog Close, if its own `box-shadow` outranks `.focus-ring` |
| M-4 | UNMEASURED; predicted GREEN | dock fg `--foreground`, muted the page muted (ΔL_OK ≈ 0.3) | the inactive-tab specimen (S-9) may still read fg = muted |
| M-5 | UNMEASURED; predicted GREEN | the sampler is deleted | — |
| M-6 | predicted **RED in both themes** | light adjacent ΔE 0.001; dark page ΔE 0.016-0.048, adjacent 0.008 (analytic) | a thin card frost cannot separate the ladder in paint (`D3-E §0` finding 6) |
| M-7 | UNMEASURED; predicted GREEN | floor row 1 | — |
| M-8 | predicted GREEN | Chromium: stripes C 0.030-0.038, bleed 1.12-1.17 at blur 16 and saturate 0.6 (`D3-E §4`) | — |
| W-E | UNMEASURED; predicted GREEN except the Dialog α leg | the harness selftest shows the W-E fixture green at a 6 px stroke (HARNESS §4) | the real Dialog's painted α is scrim plus plate (HEAD 0.635/0.653); no plate edit reaches it |

### E.4 Chrome and WebKit

- **Stroke and `paint-order`:** the fill is bit-identical with and without the stroke, in both engines, at DPR 1 and 2 (`D3-E Q2`).
- **Halos:** twice as strong in Playwright WebKit as in Chromium, so they are not portable, and the halo arm is ruled out.
- **Emoji:** stroked in Chromium only.
- **Forced colours:** they do not force the stroke in Chromium, so a manual arm is required.
- **Re-raster cost in Chromium:** main-thread Paint ×1.83 and raster ×1.47 for the stroke, with frames held at 120 Hz. Playwright WebKit's software raster reaches 33 ms at p95 (`D3-E Q3`).
- **Chrome calm by saturate:** measured in Chromium only.
- **The dock:** crashes Playwright WebKit.
- **Real Safari:** UNMEASURED, including hinting and GPU raster cost.

### E.5 Open gaps (verbatim)

From `D3-E §7`: "The battery did not finish inside this seat. … No witness has read the probe capture, so **M-1..M-8 and W-E are UNMEASURED on the probe**."

From `D3-E §7`: "The §6.2 resets beyond FC/print and the §6.3 icon ground are left out."

From `D3-E §5`: "Cure: `::selection { -webkit-text-stroke-color: transparent }` or width 0. Unmeasured whether both engines honour the stroke inside `::selection`."

From `D3-E §2`: "Hinting on real Safari (and LCD or subpixel antialiasing, which headless does not use) is UNMEASURED (owner's safaridriver checkbox)."

From `D3-E §3`: "Real Safari rasters on the GPU, so its cost is UNMEASURED (owner's safaridriver checkbox)."

From `D3-E §10` item 1: "The width the witness needs is the width the owner called sticker lettering. Nothing between 2 and 5 px is both. This is the family's central, unresolved cost."

Added by synthesis: the background battery run crashed and produced no results. The probe (`D3-E-probe.patch`) needs a fresh `run.mjs`.

---

## D3-F · The yielding field

### F.1 Mechanism

**The veil.** A thin frost; values from the probe (`D3-F §1`).
- **Light:** the pole is `--card`. The probe writes `--glass-veil-ink: oklch(from var(--card) l c h)`, and the spec renames the token `--glass-veil-pole` across its 118 lines in 31 files. Alphas are HEAD's: base 0.14, step 0.04.
- **Dark:** the pole is `oklch(0.45 0.03 60)`, base 0.24, step 0.04.

| rung | light α | dark α |
|---|---|---|
| wash, chassis, dock collapsed | 0.06 | 0.16 |
| quiet, dock expanded | 0.10 | 0.20 |
| resting (= card) | 0.14 | 0.24 |
| floating, crown, dialog | 0.18 | 0.28 |
| overlay, sheet | 0.22 | 0.32 |

**The well** (floor row 5): not in the probe, and not specified by the research.

**The field well**, one band per theme as tokens in plain per-mode arms (E-13-safe; `D3-F §3` items 1-2):

| token | light | dark |
|---|---|---|
| `--field-well-pole` (OKLab L) | 0.965 | 0.18 |
| `--field-well-gain` | 0.2 | 0.28 |
| `--field-well-feather` | 2px | 2px |
| `--field-well-outset` | 2px | 2px |
| `--field-well-ambient` | 0 | 0 |

With these values, field L 0.617-0.830 maps to 0.89-0.94 in light (muted needs ≥ 0.876) and to 0.30-0.36 in dark (muted needs ≤ 0.408). The band is one per theme, not per level (`D3-F Q3`).

In the substrate's final pass, in linear light before the OETF, on WGSL and GLSL (`D3-F §1`):

```wgsl
w  = max_i (1 − smoothstep(outset − feather, outset, sdRoundBox_i(fragPx)));   // radius clamped to half the short side
L' = mix(L, pole + gain * (L − pole), w);   // hue kept; chroma cut by a 6-step bisection only when out of gamut
```

**The registry** (`D3-F §1`, `§3` items 3-6):
- **What registers:** the ladder's own class set plus `.dock-plate` and `[data-field-well]`. Consumers write nothing.
- **Refresh:** a `MutationObserver` refreshes the element list and each radius.
- **Rect reads:** `fieldWellsFor(canvas)` reads at most 16 rects in device pixels, inside the substrate's own frame.
- **The dock** publishes its visible extent: read from `--dock-plate-inset-*`, or the dock writes its own rect, because the plate morphs by `clip-path`.
- **Z-order:** only glass painted above the substrate canvas yields. This is specified; the probe wells every rect.
- **One library frame clock:** a write phase (dock morph, sheet detents, springs) runs before a paint phase (substrates). Consumer movers outside the clock get `outset = v_max / f` as a declared margin.
- **The bound:** past 16 rects per canvas, the substrate reports `rendererStatus` failure attribution rather than dropping wells silently.
- **Arms:** aurora palette and image (WGSL and GLSL), blob (WGSL and GLSL), constellation (Canvas2D), fourier-field, and the aurora placeholder ground and `"css"` mode. The last pair needs a CSS carve over a lightened copy of the ground, which is a second implementation.
- **The ceiling** composes by construction when the page sits on the band's side. A consumer page ground on the wrong side must be named (`D3-F §3` item 8).

**The ink.** Static: `--foreground` and `--on-glass-muted`. The dock's `contrast-color()` block is deleted and its `--muted-foreground` is `var(--on-glass-muted)`. The perimeter rung is untouched.

**The luma owner** is the substrate, which controls the field under registered glass. Nothing is read back.

**Blur and saturate.** HEAD's, unchanged in the probe. Chromium's backdrop blur samples no farther than the element's box, which is what makes the 2 px hard well seamless (`D3-F Q1`).

**Common floor rows.**
- **1:** `contain: paint` goes.
- **2:** only the dock half is done. The ladder's bright bucket remains in the probe.
- **3:** one instrument.
- **4:** `--card` escape unchanged.
- **5:** not done.
- **6:** consumer overrides retire only where glass sits over a library substrate (F.2).

**The four problems.**
1. A cream frost over paper.
2. The ink is valid by construction over library substrates.
3. The dock's rect is welled with no signal.
4. The ladder is thin α plus one band per theme; O-61 is floor row 1. The same function's `--field-well-ambient` can re-tone the theme-blind aurora (F-24): at ambient 1, dark field L 0.301-0.362. That value is the aurora owner's call.

### F.2 Public API delta and migration

Library (`D3-F §6`):
- **`GlassDock`:** `backgroundCanvas` is deleted. `backdropMode: "live" | "static"` stays, and "live" now means "the plate is translucent and the substrate yields".
- **Deleted tokens:** `--glass-backdrop-luma`, `--glass-backdrop-luma-knee`.
- **New:** `--field-well-{pole,gain,feather,outset,ambient}` per theme; the `data-field-well` attribute.
- **Renamed:** `--glass-veil-ink` → `--glass-veil-pole`.
- **Substrates** gain the well with no consumer code: `<Aurora>`, `useAurora`, and per the spec Blob, Constellation and FourierField.

Consumers:
- **keyframes:** delete `ChromeDock.vue:370` and `:200-227`. The well is near-inert at a 0.1 ceiling.
- **value.js:** the atmosphere wells on the GPU path. Its `"css"` mode is not welled. `data-glass-field-canvas` retires.
- **fourier:** grey rows close. The legibility rows over prose and canvases stay RED.
- **chicago:** F gives it nothing. Its 0.62 floor retirement is blocked.

### F.3 Battery

Evidence is the `f2` probe (`D3-F §4`).

| witness | verdict | measured evidence | why it stays RED |
|---|---|---|---|
| M-1 | GREEN but for the escape and the Dialog | FAIL 2/11: plates and dock L 0.981-0.985, ΔE 0.003-0.005 | the opaque escape (S-6); the real Dialog `#aba7a0` L 0.729 (S-8) |
| M-2 | GREEN on every library-substrate and paper cell | FAIL 110/560. Ladder 36/36 per cell on light paper, c1, c0.5 and white, and on dark paper, c1, c0.5 and black. Light c1 worst muted 4.64 (HEAD 1.47) | non-substrate grounds: light black fg 1.01, dark white fg 1.03. The light Dialog (scrim): muted 2.33-2.74. Prose under a plate: 4.10 / 4.35 (`D3-F Q3`) |
| M-3 | RED | FAIL 230/266: light paper perimeter 2.79, ring 2.92-2.94; Dialog ring 2.29-2.36 | the rung is untouched |
| M-4 | RED (instrument, S-9) | the poles are gone: fg = muted = `#705942` / `#c3b9ac` | the inactive tab; the one-line fix is D2's register call |
| M-5 | **GREEN** | 0 readbacks in 8 windows. Dock: light c1 4.83/4.86, dark c1 5.52/5.39 | — |
| M-6 | GREEN in dark only | FAIL 4/19. Dark adjacent 0.010-0.016; from the page, wash 0.054 … overlay 0.106. Light adjacent 0.001-0.003 | light: S-7 |
| M-7 | **GREEN** | 18/17 px | — |
| M-8 | RED | floating C 0.0866, overlay 0.0819, Dialog 0.0629 (light) | the stripes are not a substrate |
| W-F | **GREEN** | PASS 152/152. Light c1 L p05 0.893-0.936, c0.5 0.934-0.962; dark c1 p95 0.306-0.362, c0.5 0.219-0.260. 24 px out, ΔE p95 0.0000 | — |

### F.4 Chrome and WebKit

- **Chromium 149:** every row above.
- **Cost (`D3-F Q4`):** GPU +0.23-0.32 ms at 4 Mpx for 16 rects (≤ 4% of a 120 Hz frame). Main-thread rect reads p50 < 0.1 ms.
- **Latency (`D3-F Q2`):** the well never leads. It trails by 0 or 1 frame, decided by rAF order: 7.5 px at 900 px/s.
- **Playwright WebKit:** the GLSL arm yields identically (W-F informational rows green). It paints no `backdrop-filter`, so the edge question is void there. The dock crashes it.
- **Real Safari:** UNMEASURED. If Safari's backdrop blur reads past the box, the outset must grow to about 2σ (20-44 px) and spill a halo, which is the family's largest engine risk (`D3-F §5` C-F4).

### F.5 Open gaps (verbatim)

From `D3-F §1`: "Not in the probe: the `aurora-image` pipelines (WGSL and GLSL), the blob, constellation and fourier-field substrates, the placeholder ground and the `"css"` render mode, the ladder's `contrast-color()` bright bucket, the field-well rung (floor row 5), the perimeter rung, and stale prose comments that still name the sampler."

From `D3-F Q1`: "Playwright WebKit paints no `backdrop-filter`, so the blur-edge question is unanswered there. Real Safari: UNMEASURED (owner's safaridriver checkbox)."

From `D3-F Q3`: "Several substrates (not measured). … The registry needs a z-order test (the glass above the canvas in paint order), which the probe does not make: it wells every intersecting rect."

From `D3-F Q4`: "Not measured. The WebGL2/GLSL arm's cost (the same op count), and the blob engine, whose metaball WGSL and GLSL were not touched. The bound of 16 fills 256 B of the 352 B uniform block. At 17+ surfaces the probe silently drops the rest, which E-2 forbids: the spec must fail loud (§3)."

From `D3-F Q6`: "So yes, F alone is incomplete, and adopting any of these makes it two mechanisms."

From `D3-F §5` C-F10: "The one-line fix, pointing the inactive tab at `--dock-fg-on-aurora` (or 78% of it, as `layer-group.css:250` does), is D2's register call. It was not applied."

From `D3-F §7`: "Real Safari. UNMEASURED (owner's safaridriver checkbox): the backdrop edge (C-F4), WebGPU `fieldWell` on Safari 26, and the dock."

---

## SHARED FACTS

Measured facts every family inherits. Each is cited to the seat that measured it.

| id | fact | source |
|---|---|---|
| S-1 | **Compositing and filters are affine on encoded sRGB.** `saturate()` is the encoded-sRGB matrix in Chromium and within 1/255 in Playwright WebKit. It is not luminance-neutral: it raises WCAG Y by +16.6% on `(200,100,50)` and +9.8% on `(60,140,200)`, and changes a near-neutral by −0.4%. A composite model must carry it or set it to 1 | `W.md §7` (T4); `D3-C Q2` (in the model, ΔE ≤ 0.004; left out, 0.013-0.062) |
| S-2 | **`contain: paint` is not a backdrop root in Chromium 149; any `backdrop-filter` on an ancestor is**, including the identity `saturate(1)`. Common floor row 1's second sentence ("frees grasp carriers") is false: dropping `contain: paint` cures the halo clip (M-7), but a nested `backdrop-filter` (a field well, a grasp carrier) inside a rung still sees only the rung's paint | `W.md §1` finding 1 (T6, T6b); consequences in `D3-C §5` item 3 and `D3-C §3` (well placeholders 5.8-7.3; the dark Dialog well 2.41-2.53) |
| S-3 | **`contrast-color()` is binary WCAG-2 max-contrast in both engines and ignores alpha.** It flips at grey 117→118 (Y ≈ 0.179), and `rgb(0 0 0 / 0.1)` returns white. No muted register is possible through it | `W.md §1` finding 3 (T1) |
| S-4 | **An exact WCAG ink solve exists in shipped CSS in both engines**: `color(from C srgb-linear k k k)` with k from `0.2126r + 0.7152g + 0.0722b`, or the equivalent `oklab()` closed form. It renders 4.76-4.84 neutral against a 4.8 target, byte-identical across engines. The `l³ ≈ Y` shortcut misses by −16% to +10% of ratio and breaks AA on saturated composites | `W.md §1` finding 4 (T2, T2b); `D3-C Q1` (474 + 245 composites) |
| S-5 | **Legibility is a composite-lightness bound.** Light muted `hsl(30 26% 35%)` needs composite L ≥ 0.876 at 4.5. Dark ink needs L ≤ 0.41-0.52. The shipped aurora at ceiling 1 spans L 0.617-0.830. A solved muted ink that keeps M-4's ΔL_OK ≥ 0.08 needs composite Y ≥ 0.29 (light), and none exists for Y in 0.175-0.183 | `PORTFOLIO §2.1`; `W.md §6.3` (T2b); `D3-C Q3` (band Y ≥ 0.315 light, ≤ 0.086 dark at target 5.0) |
| S-6 | **The light `--card` (`#fdf5ec`, L 0.974) sits 0.001 under M-1's floor (0.975).** So the opaque escape, and any plate at α near 1 of a `--card` pole, fails M-1 by 0.001. `hsl(30 85% 97%)` passes every ladder row in both engines | `HARNESS §3` new reading 2; `D3-A §3` (`v-card97`); `D3-B §3.2`; `D3-C §3`; `D3-D §2.3`; `D3-F §4` |
| S-7 | **M-1 and M-6 cannot both hold in light for any single pole and any α.** Composites over paper lie on the paper→pole segment. M-1 caps it at ΔE 0.02, so five rungs cannot sit 0.01 apart. Every family measured light adjacency 0.000-0.003. This is a battery conflict for the owner (relax light adjacency, or separate light levels by blur, rim and shadow, which no witness reads) | proof `D3-D §1.1`; `D3-A §0` finding 6; `D3-B §0` finding 6; `D3-C §5` item 6; `D3-E §0` finding 6; `D3-F §5` C-F9 |
| S-8 | **The real Dialog transmits its modal scrim.** At HEAD it composites `#746f66` (L 0.544) over light paper: muted 1.32, fg 3.50, Close ring 1.80. Any thin dialog plate inherits this. The cures measured so far: an α near 1 (D3-A, D3-D), a declared scrim layer in the model (D3-C), or a breaker that treats the dialog as unpublished (D3-B, specified) | `HARNESS §3` new reading 1; `D3-A §6` item 5; `D3-B §0` finding 5; `D3-C §2` item 2; `D3-D §2.2`; `D3-F §5` C-F2 |
| S-9 | **M-4's specimen reads an inactive dock tab as "fg".** An inactive `DockControl` tab paints `--muted-foreground` by design (`tab-button.css:47`), so any two-register dock reads fg = muted on that run. D3-D turned M-4 green by pointing the inactive tab at `--dock-fg-on-aurora`; D3-C did so with a solved `-strong` rung. Whether that change belongs to D3 or to D2's register is open | `D3-A §0` finding 7; `D3-F §5` C-F10; `D3-D §2.2`; `D3-C §2` item 10 |
| S-10 | **The harness's `raw` mode leaks the dock's contents.** `capture.mjs:44` hides `[data-spec]` by `visibility: hidden`, but the dock layers set `visibility: visible` (`dock/styles/layers.css:148`), so tabs and labels paint into `raw`. This biases every under-dock `raw` read (W-B, W-F leg 1) by −0.008 to +0.036. Cure: hide `[data-spec] *` | `D3-B §0` finding 2; lines re-read here |
| S-11 | **Playwright WebKit is not Safari, and it is paint-only.** It paints no `backdrop-filter`, exposes no `navigator.gpu` (so the aurora runs its GL arm), and crashes on any page that mounts `GlassDock`. Plate paint matches Chromium within 1/255, but glyph rasterisation does not: 4.44 against 4.65 (`D3-A Q5`), 4.41 against 4.54 (`D3-D §1.2`). A gate solved to the bound needs about 0.02 α or 0.15 of ratio as engine margin. Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) | `HARNESS §2`; `PORTFOLIO §1.5`; `D3-A Q5`; `D3-D §1.2`, `§1.4` |
| S-12 | **The Dialog Close ring is a hand literal**, `color-mix(in oklab, var(--foreground) 48%, transparent)` at `dialog/styles.css:144,243`, outside `--ink-perimeter`. Routed through a re-derived rung it read 8.13-8.81 (D3-D) | `D3-D §1.2`; `D3-A Q2`; lines re-read here |
| S-13 | **The live sampler is dead on the shipped engine.** The fed dock makes 36-37 `getImageData` per 9 s, all at alpha 0, stamping `sample-unavailable`; the default dock stamps `source-unavailable`. Every family deletes the 746 lines, and every probe that ran reads M-5 GREEN with 0 readbacks | `HARNESS §3` (M-5, W-B); `D3-A`, `D3-B`, `D3-C`, `D3-D`, `D3-F` §3/§4 |
| S-14 | **Blur buys little on the smooth aurora and more on high-frequency grounds.** α* is flat in radius over every c1 preset (within 0.01). It falls over the checker (0.87 → 0.73) and the stripes (0.80 → 0.72). Blur at r16 cuts L deviation under the plate by 8-30%, not the portfolio's 43%. M-8's luminance-bleed half needs blur: F48's cap (≤ 9 px) costs 0.078 α on light chrome (D3-D); the dock's bleed at 7.0.0's radii sits on 1.25 (D3-A) | `D3-D §0` findings 5-6, `§1.1`; `D3-A Q1`, `Q3` |
| S-15 | **Chrome calm's chroma half has two measured routes**: a thick veil (α ≥ 0.86: C 0.016-0.034) or `saturate ≤ 0.6` at blur ≥ 16 px with a thin veil (C 0.030-0.038). At blur 12 px the bleed half fails (1.40-1.63) at every saturate | `D3-A Q3`; `D3-E Q4` |
| S-16 | **The any-input bound for a `--card` pole is α 0.871 (light) and 0.854 (dark).** A photo corpus reaches it within 0.02, because photos carry near-black and near-white pixels. Muted is the binding ink; fg alone needs 0.459 over photos | `D3-A Q1` (49 photos, OKLCh sweep, value.js swatches) |
| S-17 | **A GPU reduction plus `mapAsync` is cheap on Apple silicon Chromium.** 48 µs for a 16×9 reduction and 0.9 ms p50 (W, 720p). 71-127 µs and 1.8-2.8 ms p50 (B, 128-bin histogram, up to the DPR-2 backing). Cold start is 180-347 ms (pipeline compile). SwiftShader publishes 6 of 240 frames. Integrated-GPU and Safari figures are unmeasured | `W.md §1` finding 6 (T7); `D3-B Q1` |
| S-18 | **The CPU field mirror is not a live signal.** `sampleAuroraField` against the frozen frame: median ΔE 0.012 and p90 0.062 (portfolio); worst-tile |ΔY| up to 0.19-0.20, and on the unsafe side of the live field in 8-35% of tile-frames; 71-94 ms of main thread per 144-tile publication | `PORTFOLIO §2.5`; `D3-B Q5` |
| S-19 | **Within one GPU backend, rendering is bit-stable; across backends the aurora is a different picture** (ΔE up to 0.42; Playwright WebKit paints OIL_GESTURAL at p50 0.30). Any frozen reference must be PNG captured on a named engine and backend | `D3-D §1.2` |
| S-20 | **Chromium's `backdrop-filter: blur()` samples no farther than the element's own box** | `D3-F Q1` (edge ΔL ≤ 0.005 with the unwelled field 2-20 px outside) |
| S-21 | **The luminosity-blend pole** (`mix-blend-mode: luminosity`, Fluent acrylic's layer) pins composite L to 0.927-0.948 in light on seven grounds in both engines, with hue kept. It goes flat grey inside any isolated group (`transform`, `isolation`, `z-index`, a `backdrop-filter` parent) and over a root-propagated background. fourier's app root is `isolate`, and value.js's ground is root-propagated. No family adopted it | `W.md §1` finding 2, `§9.2`; `X.md §0` finding 6 |
| S-22 | **`prefers-reduced-transparency` is unsupported in Safari.** Playwright WebKit matches neither value. `prefers-contrast` ships in Safari 14.1 | `W.md §8` (T5, BCD) |
| S-23 | **Consumer constraints**: <br>(1) floors are per theme: chicago's single 0.62 floor on an ink veil drops light fg to 2.90-3.92 (p05 1.80-3.20) while fixing dark; <br>(2) the plate token stays a paintable colour; <br>(3) a descendant `--glass-level` must re-resolve at the element; <br>(4) the dock owes a muted register; <br>(5) value.js's field hue is user-driven (L 0.50-0.82 light); <br>(6) fourier (prose, canvases) and chicago (photos, cross-origin) put glass over content no library substrate owns; <br>(7) keyframes is the sampler's only feeder | `X.md §0` finding 1, `§2`, `§3.4` |
| S-24 | **value.js is held on glass 7.0.0.** Its GLASS-VEIL-GREY is a render crash: the certified-ink walk throws `contrast_unreachable` (THE STOP). The 10.0.1 repin is a banked patch landing in X-W7L on top of BL's cure, so the cure must keep that model solvable or publish the composite | `X.md §0` finding 2, `§1.4` |
| S-25 | **The 7.0.0 reference** was a cream frost over paper (ΔE paper 0.005-0.016) whose levels separated from the dark page (ΔE 0.060-0.145), and it still failed muted over the ceiling-1 aurora at wash, quiet and resting (2.44-4.15). The owner-glance pair shows HEAD's Dialog as a smoke-brown slab and 7.0.0's as a warm card | `PORTFOLIO §1.6`; `HARNESS §5` |
