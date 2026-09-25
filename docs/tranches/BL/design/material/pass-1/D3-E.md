# D3 · pass 1 · D3-E research · the self-grounded ink

| field | value |
|---|---|
| seat | pass-1 RESEARCH seat for family D3-E (legibility at the glyph; the plate stays thin) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`; measured at `4ece9589`. `git diff 9aa2b7f9 HEAD -- src` touches only `components/configurator/*` and `src/index.ts` (10.1.0, O-68/O-75), none of the material |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless, Playwright imported from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| load | load averages 21-79 across the runs (other seats live) |
| scratch | `R = …/scratchpad/D3/p1/D3-E-research/`: `q1/` (stroke and halo variants), `q2/` (metrics), `q3/` (raster cost), `q4/` (chrome calm), `q5/` (selection, emoji, icons, FC, print, clip-text), `D3-E-probe.patch` (the probe on real source), `out/` (the battery run), `montage-q1-{light,dark}.png` (owner glance) |
| inputs | `PORTFOLIO.md` §0-§2, the D3-E section, §6 D3-E and §7; `harness/HARNESS.md`; `pass-1/X.md` §0 and §3. No other family's section was read |

## 0 · Findings that change the family

1. **The witness's geometry sets the stroke width, and that width reads as a sticker.** On the harness's 1 px glyph ring (the ring sits about 1.25-1.75 px outside the glyph outline), the ground has to be opaque for about 2.5 px past the outline. So a centred stroke needs **5 px**. At 5 px, muted p05 reads 5.90-6.08 in light and 6.52-7.21 in dark over black, white, the checker, the stripes and the aurora, at 12, 14 and 16 px, in both engines (§1). At 4 px it fails: light black 4.36-5.08, dark white 2.34-3.22 (Chromium). At that width the ground reads as sticker lettering in light over dark grounds and as embossed meme type in dark over bright grounds (`montage-q1-*.png`).
2. **A thin ground is worse than none on the adversarial ground.** A 1-2 px stroke puts its antialiased outer edge exactly on the ring, at a luminance between the ink and the field. Light muted over black: no stroke 1.97, 1 px 1.06-1.08, 1.5 px 1.05-1.14, 2 px 1.07-1.14 (Chromium). The "material" register the charter wants (≤ 2 px) cannot pass the family's own witness.
3. **Halos are not engine-portable.** The same stacked `text-shadow` grounds twice as strongly in Playwright WebKit as in Chromium. With `s3 + 0 0 2/3/4px`, light muted over black reads 2.79-3.64 in Chromium and 4.69-5.22 in Playwright WebKit. A halo answer calibrated in one engine fails in the other. The 1.5 px ground plus a soft 2 px halo (Q1's named variant) reads 1.07-1.09 (light, black) and 1.04 (dark, white) in Chromium. It is nowhere near enough.
4. **The stroke is a second paint on every glyph that other text features collide with.** It covers about 34% of a selection highlight's box, it draws around colour emoji in Chromium (and not in Playwright WebKit), it erases `background-clip: text` (value.js's `.palettes-ramp-text`, which sits in its dock), and forced colours keep it: in dark, Chromium's FC paints black glyphs inside a dark-brown 5 px stroke on white (§5). Every one of these needs its own reset, so the stroke is not the one declaration the charter claims.
5. **Chrome calm comes from the same backdrop-filter, not from a thicker veil.** With α .20-.30, blur 16 px and `saturate(0.6)`, M-8 goes green in both themes over the stripes: chroma 0.030-0.038, bleed 1.12-1.17. At `saturate(1.5)` (HEAD) chroma stays 0.073-0.090 whatever the α (§4).
6. **The card pole cannot separate a thin ladder in paint.** Over paper, a `--card` frost at α .10-.40 moves the composite 0.002-0.007 in ΔE_OK, and adjacent rungs sit 0.001 apart. In dark, α .30 lands 0.048 from the page against M-6's 0.05, and a .05 step gives 0.008 against 0.01 (analytic sRGB mix, `§6`). **M-6 is RED by construction in both themes** while α ≤ .30 holds. The family's own cap and the shared ladder witness conflict.

## 1 · Q1 · Which stroke reads as material, and is 1.5 px + a 2 px halo enough?

**Command.** `node q1/probe-q1.mjs chromium,webkit` (10 variants) and `Q1B=1 node q1/probe-q1.mjs chromium,webkit` (9 more). A CSS-only page: one plate per variant × size (α .20 `--card` frost, blur 16 px), muted `hsl(30 26% 35%)` / fg in light, `hsl(34 16% 72%)` / fg in dark, the stroke colour `--card`. The metric is the harness's own `glyphRing` (1 px ring, p05), from full / noink / maskA / maskB captures made the harness's way. A ground profile adds the mean ΔE_OK between the noink capture and the textless capture at Chebyshev distance 1..6 from the glyph. Outputs: `q1/q1.out`, `q1/q1b.out`, `q1/out/q1*.json`.

Muted p05, minimum over black, white, checker, stripes and aurora (Chromium; Playwright WebKit in brackets):

| variant | light 12 / 14 / 16 px | dark 12 / 14 / 16 px |
|---|---|---|
| none | 1.97 / 1.97 / 1.97 [1.60-1.61] | 1.31 / 1.31 / 1.31 [1.12-1.13] |
| 1 px | 1.06-1.08 [1.09-1.12] | 1.01-1.03 [1.05] |
| 1.5 px | 1.05-1.14 [1.09-1.13] | 1.03-1.05 [1.04-1.07] |
| 1.5 px + halo 2 px | 1.07-1.09 [1.06-1.12] | 1.04 [1.06-1.10] |
| 1.5 px + halo 2 px ×2 | 1.10-1.12 [1.30-1.46] | 1.06 [1.38-1.53] |
| 2 px | 1.07-1.14 [1.14-1.16] | 1.03-1.05 [1.09] |
| 3 px | 1.60-2.10 [1.46-1.88] | 1.15-1.31 [1.28-1.76] |
| 3 px + halo 2/3/4 | 2.79-3.64 [4.69-5.22] | 2.07-2.61 [5.31-6.27] |
| 4 px | 4.36-5.08 [4.37-5.13] | 2.34-3.22 [4.69-6.08] |
| 4 px + halo 2 px ×2 | 4.79-5.38 [5.37-5.78] | 3.14-4.01 [6.86-7.21] |
| **5 px** | **5.90-6.08** [5.49-5.99] | **6.52-7.21** [7.05-7.21] |
| 5 px + halo 3 px | 6.05 [5.49-5.99] | 7.21-7.22 [7.05-7.21] |
| 6 px | 5.90-6.08 [5.49-5.99] | 7.21 [7.05-7.21] |

The ceiling is the ink against the card itself: 6.06 light, 7.22 dark.

**Ground profile** (Chromium, 14 px muted, mean ΔE_OK at d = 1..6): light over black, 3 px `.59 .16 .00`, 4 px `.65 .39 .03`, 5 px `.65 .57 .17 .01`, 6 px `.65 .64 .39 .02`, halo-only `.43 .17 .05 .01`. Every stroke is a flat plateau that ends in one step, which is the sticker edge the eye reads. The halo decays, which reads as glow.

**Owner glance.** `montage-q1-light.png` and `montage-q1-dark.png` (Chromium, 2× nearest): rows none, 1.5 px + halo 2 px, 3, 4, 4 + halo ×2, 5, 5 + halo 3; columns aurora, black, white and stripes at 12 and 14 px. What the eye sees:
- **Light, 5 px:** cream sticker outlines over black and the aurora. At 12 px neighbouring glyphs' grounds fuse into one lozenge per word.
- **Dark, 5 px:** a dark embossed shadow over the aurora, and over black it is invisible (the card is near the page).
- **1.5 px + halo 2 px:** the only row that reads as material, and it fails the witness.

**Answer.** No width at 12-16 px is both material and green. Material means ≤ 2 px with a soft edge, and that reads 1.03-1.16. Green means ≥ 5 px, and that reads as sticker. A 1.5 px ground with a soft 2 px halo is not enough on black or white in either engine.

## 2 · Q2 · Does the stroke change metrics, hinting, subpixel placement, optical sizing?

**Command.** `node q2/probe-q2.mjs` and `DPR=2 node q2/probe-q2.mjs`. On a black page, the fill is `#00ff00` and the stroke is 5 px `#000` (identical to the page), so the only thing that can differ between stroke 0 and stroke 5 px is the fill's own raster. Fonts: Plus Jakarta Sans (the library's variable face, wght 200-800, loaded from `src/fonts`), `system-ui` (SF, with opsz), Fira Code (variable). Weights 300/450/600/800, sizes 12/14/16, `font-optical-sizing` auto and none. Output `q2/q2-dpr{1,2}.json`.

| engine | runs | max \|Δ advance\| | max \|Δ height\| | fill pixels changed |
|---|---|---|---|---|
| Chromium, DPR 1 | 48 | 0 px | 0 px | 0 / 83,759 |
| Chromium, DPR 2 | 48 | 0 px | 0 px | 0 / 269,884 |
| Playwright WebKit, DPR 1 | 48 | 0 px | 0 px | 0 / 90,185 |
| Playwright WebKit, DPR 2 | 48 | 0 px | 0 px | 0 / 289,682 |

**Answer.** In both engines the stroke leaves the fill's advances, line box and raster bit-identical, at every weight and at both DPRs. `font-optical-sizing` is live in Playwright WebKit (`system-ui` auto 23,730 versus none 23,324 ink pixels at DPR 1) and a no-op in Chromium (21,945 both). The stroke follows whichever instance paints, and it changes nothing about the choice. Hinting on real Safari (and LCD or subpixel antialiasing, which headless does not use) is UNMEASURED (owner's safaridriver checkbox).

## 3 · Q3 · What does a ground on every glyph cost?

**Command.** `node q3/build.mjs <wt> q3/dist` builds a route from the real `src`: a live `<Aurora>` (motion on) under 80 plates cycling the five rungs, each with a 16 px heading and 8 lines of 14 px text (72,070 characters), at DPR 2. The page stayed on the system-ui fallback, because the font URL did not resolve in this build. `node q3/perf.mjs chromium 3` interleaves modes (none, 5 px stroke, 3 px stroke + three halos) and measures, per mode:
- a toggle (class flip → 2 rAF);
- 4 s steady;
- 4 s scroll;
- Chromium trace sums (`Paint`, `RasterTask`, …).

`perf-repaint.mjs` replaces the scroll with a colour flip on the scroller every frame, so all visible text re-rasters every frame.

| Chromium 149 (WebGPU adapter present) | none | 5 px stroke | stroke + 3 halos |
|---|---|---|---|
| toggle (restyle + paint, ms) | 12-13 | 17-18 | 12-15 |
| steady / scroll frame p95 | 9.9 / 9.8 ms | 9.7 / 9.6 ms | 9.6 / 9.7 ms |
| repaint-all-text frame p95 | 9.8 ms | 9.9 ms | 9.8 ms |
| main-thread `Paint`, sum over 2 × 8 s | 1,670 ms | **3,063 ms (×1.83)** | **3,440 ms (×2.06)** |
| `RasterTask`, same window | 351 ms | **515 ms (×1.47)** | **1,450 ms (×4.1)** |

| Playwright WebKit 26.5 (software raster headless; not Safari) | none | 5 px stroke | stroke + 3 halos |
|---|---|---|---|
| steady frame p95 | 19 ms | 22 ms | 19 ms |
| repaint-all-text frame p50 / p95 | 17 / 20 ms | 19 / **33 ms** (37% of frames > 20 ms) | **297 / 313 ms** |

**Answer.** On an idle or scrolling text-dense route over the live aurora, text tiles are cached and the stroke costs no frame time in Chromium. Once text re-rasters (any animated text, counters, a colour transition, a theme flip, a scroll into new tiles), main-thread paint doubles and raster rises 1.5× for the stroke and 4× for halos. The Chromium frame budget held here at 120 Hz. Playwright WebKit's software raster drops to 30 fps on the stroke and 3 fps on halos. Real Safari rasters on the GPU, so its cost is UNMEASURED (owner's safaridriver checkbox). The halo arm is ruled out on cost alone.

## 4 · Q4 · Chrome calm without a thicker veil

**Command.** `node q4/probe-q4.mjs`, Chromium only (Playwright WebKit paints no `backdrop-filter` headless). Plates of `--card` at α .20 and .30 × blur 12/16/20 px × saturate 1.5/1.0/0.6/0.4/0.2 are read over the 24 px violet/yellow stripes, the frozen aurora and paper with M-8's own metric (`lib.calm`). Output `q4/q4.json`.

| light, α .30, blur 16 px | sat 1.5 (HEAD) | 1.0 | **0.6** | 0.4 | 0.2 |
|---|---|---|---|---|---|
| stripes bleed / C | 1.12 / 0.073 | 1.13 / 0.049 | **1.13 / 0.030** | 1.12 / 0.021 | 1.12 / 0.012 |
| aurora L / C | 0.797 / 0.145 | 0.802 / 0.111 | 0.797 / 0.069 | 0.845 / 0.044 | 0.679 / 0.028 |
| paper L / C | 0.982 / 0.0082 | 0.982 / 0.0069 | 0.983 / 0.0057 | 0.983 / 0.0057 | 0.983 / 0.0045 |

- **Dark, α .20-.30, blur 16 px, sat 0.6:** stripes 1.16-1.17 / C 0.034-0.038.
- **Blur 12 px:** fails the luminance half at every saturate (bleed 1.40-1.63).
- **Blur 16-20 px:** holds it (1.03-1.21).

**Answer.** M-8 is green at blur ≥ 16 px and `saturate ≤ 0.6`, with the veil held at α ≤ .30. That is a value change inside the backdrop-filter every rung already carries: no paint, no second layer and no signal. So it does not break the family's mechanism. It does break the W-FROST clause "the warm-cream read arrives by TRANSMISSION of the warm field through `saturate()`" (`tokens/glass.css:12-13`), which the family would strike as a clean break. The price is that chrome over the aurora loses about half its chroma (C 0.145 → 0.069), so a field seen through a popover reads calmer and greyer. Content rungs keep a transmitting saturate (1.2 in the probe). F48's "slightly more subtle" is honoured by 8/10/12/16/18 px against HEAD's 10/14/16/20/22 px. The chrome floor is 16 px, where the measured bleed half of M-8 lives.

## 5 · Q5 · Selection, emoji, SVG icons, forced colours, print

**Command.** `node q5/probe-q5.mjs` (a 5 px inherited `--card` ground on a plate over black, both themes, both engines), the icon re-read in §5, and `q5/clip.html` for `background-clip: text`. Captures are in `q5/`.

| case | Chromium | Playwright WebKit | consequence |
|---|---|---|---|
| **selection** | the stroke paints above the highlight: 34.7% (light) / 33.1% (dark) of the selected run's box is card-coloured | 34.4% / 34.8% | the highlight reads perforated by cream (light) or brown (dark) outlines (`chromium-light-no-selection.png`). Cure: `::selection { -webkit-text-stroke-color: transparent }` or width 0. Unmeasured whether both engines honour the stroke inside `::selection` |
| **colour emoji** | stroked: 381-417 of 2,880 px change | untouched: 0 of 3,204 px | engine-divergent. Chromium outlines emoji in the pole colour |
| **SVG icons** (lucide-shaped, stroke = currentColor) | light over black, ring p05 1.79 bare; `drop-shadow(0 0 1px card)` ×3 gives 2.42; an `feMorphology dilate r=2.5` ground gives **4.17** (dark 4.81) | 1.71 / 2.48 / **4.10** (dark 5.27) | `-webkit-text-stroke` never reaches SVG, and `paint-order` has nothing to reorder on a fill-none icon. Icons need their own ground, an SVG dilate filter referenced from CSS, which is a second mechanism. Non-text needs 3:1, so the dilate passes and drop-shadow does not |
| **forced colours** (`emulateMedia({forcedColors:"active"})`) | the stroke is **not** forced: `-webkit-text-stroke-color` stays `rgb(53 42 34)` in dark (`rgb(253 245 236)` light) while `color` is forced to `rgb(0 0 0)`. Dark FC renders black glyphs fattened by a dark-brown 5 px stroke (`chromium-dark-no-forced.png`), barely readable | the media query matches but Playwright WebKit forces no colours | an FC arm (`-webkit-text-stroke: 0`) is mandatory, not optional |
| **print** (`emulateMedia({media:"print"})`) | the stroke survives (5 px). It is not a background, so economy printing does not drop it | same | a print arm is mandatory: dark-theme print would outline every glyph in brown on white paper |
| **`background-clip: text`** | the gradient text disappears under the cream stroke (`clip-chromium.png`) | same (`clip-webkit.png`) | breaks value.js's `.palettes-ramp-text` in its dock (`DockViewSelect.vue:132`, `utils.css:207-216`) |

## 6 · The strongest form

What the family must specify precisely to work:

1. **The ground.** One inherited declaration on every rung and on `.glass-dock`: `-webkit-text-stroke: var(--glass-ink-ground-width) var(--card); paint-order: stroke fill`, with `--glass-ink-ground-width: 5px`. The width is the witness's number, not a taste (§1), and it is independent of font size between 12 and 16 px. The colour is the theme's `--card` and nothing else, so each ink's contrast is fixed in tokens: muted/card 6.06 (light) and 7.22 (dark); page muted/card 5.01 light.
2. **The resets** (each one a counterexample to "one declaration"):
   - `@media (forced-colors: active), print { … -webkit-text-stroke: 0 }`;
   - `::selection { -webkit-text-stroke-color: transparent }`;
   - `-webkit-text-stroke: 0` on any `background-clip: text` run and on every nested solid-fill control inside a plate (primary Button, Badge, active tab, whose ground is its own fill, not the card).
3. **Icons.** An SVG-dilate ground for icons (`filter: url(#glass-ink-ground)` with `feMorphology dilate 2.5` + `feFlood var(--card)`, shipped once in the library's root), because text stroke never reaches SVG.
4. **Indicators two-tone.** Each indicator is an **opaque** ink solved against the card, `color-mix(in oklab, var(--foreground) 60%, var(--card))`, which replaces the translucent `--ink-perimeter` 0.48 alpha. It sits on a pole band on both sides:
   - control edge: `inset 0 0 0 2px var(--card)` plus an outer `0 0 0 2px var(--card)`;
   - focus ring: `outline` over `box-shadow: 0 0 0 calc(ring + 4px) var(--card)`.

   The sRGB-proxy ratio of P60 against the card is 4.47 light and 5.05 dark (P50: 3.29 / 3.98; P45: 2.85 / 3.51).
5. **The plate.** The veil pole becomes `--card` (renamed `--glass-veil-pole`, `--glass-veil-ink` deleted, no alias). α `base .20 ± n·.05`: wash .10, quiet .15, resting .20, floating .25, overlay .30, dock .15, dialog .25. One law in both themes, and the dark base override is deleted.
6. **The medium.** Blur 8/10/12/16/18 px. `saturate` becomes a band term: content 1.2, chrome (`--glass-saturate-chrome`) 0.6.
7. **Deleted:**
   - the luma clamp in `@utility glass-plate`;
   - the sampler (`backdropLuminanceSample.ts`, `useGlassBackdropLuminance.ts`, `backdropSampleMath.ts`, 746 lines) with `GlassDock`'s `backgroundCanvas` prop and `backdropMode: "live"` observer;
   - the bright bucket and both `contrast-color()` blocks (`ladder.css`, `adaptive-legibility.css`), and the dock's `--muted-foreground: var(--foreground)` self-engage;
   - `contain: paint` (floor row 1). `--input-on-glass` becomes the well rung (floor row 5).

## 7 · The probe on real source

`D3-E-probe.patch` (371 lines, 10 files: `tokens/{glass,dark-arm,on-glass-fg}.css`, `glass/{veil,material,ladder}.css`, `utilities/base.css`, `_shared/field/control.css`, `dock/styles/adaptive-legibility.css`, `dock/GlassDock.vue`; +47 −145) implements §6 items 1, 4 (control edge and `.focus-ring`), 5, 6 and 7. The §6.2 resets beyond FC/print and the §6.3 icon ground are left out.

**The battery did not finish inside this seat.** Under load 21-79, `run.mjs <wt> --label e1` (`run-e1.log`, `D3_OUT=R/out`) had built and captured 7 of about 70 cells when the seat was told to return. No witness has read the probe capture, so **M-1..M-8 and W-E are UNMEASURED on the probe**. The capture continues in the background and writes `R/out/caps/e1/results/*.log` if it completes. What the probe's own numbers predict, each from a measurement above:

| witness | predicted on the probe | ground for the prediction |
|---|---|---|
| M-1 no grey | green over paper: L 0.982-0.984, ΔE 0.002-0.005 | analytic card-over-paper mix (§0.6); the opaque escape sits 0.001 under the floor (HARNESS §3 note 2) |
| M-2 text | green on every plate and ground in both themes at 5 px, **except** icons, emoji and nested solid controls, which the harness does not carry | §1: 5.90-7.21 |
| M-3 non-text | likely green at P60 on the well edge. The Dialog Close depends on whether its own `box-shadow` outranks `.focus-ring`'s | §6.4 proxy ratios |
| M-4 dock register | green: dock fg `--foreground`, muted the page muted (ΔL_OK ≈ 0.3), neither black nor white | `contrast-color` deleted |
| M-5 live dock | green on readbacks (the sampler is deleted, 0 `getImageData`). Legibility rides §1 | `GlassDock.vue` diff |
| M-6 separable ladder | **RED in both themes by construction**: light adjacent ΔE 0.001; dark page ΔE 0.016-0.048, adjacent 0.008 | §0.6 |
| M-7 halos whole | green (floor row 1) | `material.css` diff |
| M-8 chrome calm | green: stripes C 0.030-0.038, bleed 1.12-1.17 | §4 |
| W-E ink ground | green on every glyph-ring and ladder-α row. **RED on the real Dialog's α leg**: the painted α there is the scrim plus the plate (HEAD 0.635/0.653), and no plate edit reaches it | §1; HARNESS W-E at HEAD |

## 8 · Public API and consumer impact

- **Removed:**
  - `GlassDock`'s `backgroundCanvas` prop and the live observer;
  - `--glass-veil-ink`, renamed with no alias;
  - `--glass-backdrop-luma` and its knee;
  - `--input-on-glass`, `--on-glass-muted*` (the family needs no on-glass ink table, because muted is solved against the card);
  - `--ink-perimeter` as an alpha.
- **Added:** `--glass-ink-ground-width`, `--glass-saturate-chrome`, the icon ground filter, and a perimeter ink colour token.
- **value.js** (held on 7.0.0; repin lands in X-W7L):
  - `.palettes-ramp-text` in its dock disappears under the ground until it opts out;
  - its `::selection` (`foundation.css:587`) is perforated by the stroke;
  - its certified-ink model (`ink.ts`) has no plate composite to certify against, since legibility no longer depends on the plate. The model retires rather than re-solves;
  - `--glass-plate-resting` readers keep a paintable token (X §3.4 row 2).
- **keyframes:** the `:background-canvas` binding (`ChromeDock.vue:370`) is deleted with the prop, and the dead tint-AA reclaim goes. Its `body.is-dragging ::selection` rule is unaffected.
- **fourier:**
  - the `.glass-opaque` Configurator escape and the strong-muted picks retire;
  - its `::selection` palette (`style.css:121-126`) is perforated on glass;
  - its glass over running prose reads through the ground, which is the family's strength: no substrate is needed.
- **chicago:** the 0.62 tier floor and the count opacity retire (M-4). Its photos are covered at the glyph.
- **Every consumer:** all text on glass changes appearance to stroked lettering. X.md censused 0 consumer `text-shadow` declarations, so there is no halo collision.

## 9 · Engines

| fact | Chromium 149 | Playwright WebKit 26.5 | real Safari |
|---|---|---|---|
| stroke + `paint-order` fill identity | bit-identical fill (§2) | bit-identical fill | UNMEASURED (owner's safaridriver checkbox) |
| 5 px ground, muted p05 | 5.90-7.21 | 5.49-7.21 | UNMEASURED |
| stacked halos | weak (Chromium blur) | about 2× stronger | UNMEASURED |
| emoji stroked | yes | no | UNMEASURED |
| forced colours force the stroke | no (a manual arm is required) | no colour forcing at all | UNMEASURED |
| repaint cost (stroke / halo) | Paint ×1.83 / ×2.06, raster ×1.47 / ×4.1, frames held | 33 ms / 313 ms p95 (software raster) | UNMEASURED |
| chrome calm via saturate | measured green (§4) | paint-only: no backdrop-filter headless | UNMEASURED |
| `GlassDock` mount | renders | crashes (HARNESS §2), so dock rows are UNMEASURED in Playwright WebKit | UNMEASURED |

## 10 · Real weaknesses (named counterexamples)

1. **The sticker** (§1, montages). The width the witness needs is the width the owner called sticker lettering. Nothing between 2 and 5 px is both. This is the family's central, unresolved cost.
2. **M-6 RED in both themes** (§0.6). A thin card-pole frost cannot separate the ladder in paint over paper or the dark page. Separation rides blur, radius and shadow, which no shared witness reads.
3. **The real Dialog's W-E α leg is RED.** The scrim is counted in the painted α, so the family's own witness fails on the one modal the library ships unless the scrim itself thins to about 0.12.
4. **Icons** (§5): 1.71-1.79 bare. A second mechanism (an SVG dilate filter) is required.
5. **Nested solid-fill controls.** A primary Button or active tab inside a plate inherits a cream or brown 5 px outline that belongs to the plate, not to its own fill. Every such component needs a reset.
6. **`background-clip: text`** (value.js dock) and **`::selection`** (value.js, fourier, the platform default) break.
7. **Forced colours and print** keep the stroke unless reset (§5). In dark FC it degrades legibility below HEAD.
8. **Emoji** are outlined in Chromium only.
9. **Re-raster cost** doubles main-thread paint (§3). Halos are prohibitive on software raster.
10. **Chrome greys over the field** (§4): chroma under chrome falls from 0.145 to 0.069 over the aurora, the price of M-8 without a veil.

## 11 · Commands and artefacts

`R = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-E-research`

- Q1: `node R/q1/probe-q1.mjs chromium,webkit` → `q1/q1.out`; `Q1B=1 …` → `q1/q1b.out`; `node R/q1/montage.mjs` → `R/montage-q1-{light,dark}.png`.
- Q2: `node R/q2/probe-q2.mjs`, `DPR=2 node R/q2/probe-q2.mjs` → `q2/q2-dpr{1,2}.json`.
- Q3: `node R/q3/build.mjs R/wt R/q3/dist`; `node R/q3/perf.mjs chromium 3`; `node R/q3/perf-repaint.mjs chromium 2`; `node R/q3/perf-repaint.mjs webkit 2`.
- Q4: `node R/q4/probe-q4.mjs` → `q4/q4.json`.
- Q5: `node R/q5/probe-q5.mjs` → `q5/q5.json` and captures; the icon re-read and dilate test, run inline over `q5/*.html`; `q5/clip.html` → `clip-{chromium,webkit}.png`.
- Probe: `R/D3-E-probe.patch`; battery `D3_OUT=R/out node docs/tranches/BL/design/material/harness/run.mjs R/wt --label e1` → `R/run-e1.log` (incomplete at return).
