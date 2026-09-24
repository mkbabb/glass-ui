# D3 · pass 1 · D3-A · the ground pole (research)

| field | value |
|---|---|
| seat | D3 pass 1, RESEARCH for family D3-A (the ground pole) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`; the checkout read `dac7d50c` when the worktree was cut. `git diff --stat 9aa2b7f9 HEAD -- src` is empty, so the probe starts from the published 10.0.1 `src` |
| inputs | `PORTFOLIO.md` §0-§2, the D3-A section, §6 (D3-A questions) and §7; `pass-1/W.md`, `pass-1/X.md`, `harness/HARNESS.md`. Source read in the worktree: `tokens/{glass,dark-arm,on-glass-fg,color-radius,glass-fx,property-regs}.css`, `glass/{veil,ladder,material,control-bit}.css`, `components/dock/{GlassDock.vue,composables/useDockShellProps.ts,styles/*}`, `_shared/field/control.css`. Read-only: `chicago/public/photos/*.jpg` (49), the swatch fixtures in `value.js/demo/test/palettes/*.ts`, the UIA-V-198 evidence `value.js/docs/tranches/X/audit/ui-evidence/value/home-picker/1440-dark-01-default.png` |
| instruments | The shared battery (`harness/run.mjs`, unmodified) pointed at a detached worktree carrying the probe; `capture.mjs --inject` for variants on the same build. Headless Chromium 149.0.7827.55 (WebGPU flags per HARNESS) and **Playwright WebKit 26.5, which is not Safari** (paint-only: it paints no `backdrop-filter`, and any page mounting `GlassDock` crashes it). Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**. Scratch-only scripts: `bound.mjs` (the analytic bound), `q4.mjs` (dark pole arithmetic), `montage.mjs` (paired crops) |
| load | load averages 26-160 across the runs (other seats). The full capture took 634.8 s at load 153 |
| scratch | `S = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-A-research/`. Captures `S/out/caps/{pole,v-*}`, witness logs `S/out/caps/pole/results/*.log`, bound output `S/bound.json`, paired glances `S/glance/*.png`, the probe diff `S/D3-A-probe.patch` (559 lines). The worktree was removed after the runs |

## 0 · Findings

1. **The chrome bound is a real, reachable number, and the photo corpus sits at it.** Over any input (black and white), every ink clears 4.5:1 at α ≥ 0.871 in light and 0.854 in dark (card pole). Over chicago's 49 lot photos, the pooled p05 bound is 0.852 (light) and 0.828 (dark); the worst single photo needs 0.867 and 0.854. Lot photos carry near-black pixels (corpus L p01 0.140, p05 0.242), so the photo bound converges on the any-input bound. Muted ink is the binding ink everywhere: fg alone needs only 0.459 over the photos.
2. **Blur buys almost nothing on the bound.** Over the photos, raising σ from 0 to 20 px (with `saturate(1.5)`) moves the light bound 0.852 → 0.830; over the aurora it moves by ≤ 0.004. Legibility is carried by α, so blur is free to follow F48.
3. **A content α ≤ 0.64 is defensible only if the declared content field is the ceiling-0.5 aurora.** Over ceiling 0.5 the bound is 0.516 (light) and 0.496 (dark). Over ceiling 1 it is 0.766 and 0.799. Over value.js's user-seeded atmosphere (any hue, L 0.50-0.82) it is 0.845. The probe ships the ceiling-0.5 declaration, and M-2 then reds exactly where the declaration says it will: content rungs over ceiling 1, black, the checker, the stripes, and (dark) white.
4. **The chrome guarantee holds in paint.** At chrome α 0.88 / 0.86, every chrome row (floating, overlay, the dialog rung, the real Dialog, the popover, the dock) clears 4.5 over black and white in both themes in Chromium, and the painted bound W-A reads back from the pixels (0.865 light, 0.855 dark) agrees with the analytic 0.871 / 0.854 to within 0.006.
5. **The live dock is legible with no signal.** M-5 is GREEN: 0 `getImageData` and 0 `readPixels` in all 8 live windows. The dock reads 5.32-6.67 over both aurora ceilings in both themes; HEAD reads 3.51-3.89 in dark over ceiling 1.
6. **Two battery conflicts are structural to the card pole, and one is structural to the battery itself.**
   - **M-1 against M-6 in light.** M-1 caps every light plate within ΔE 0.02 of paper. M-6 asks for four adjacent steps of ΔE ≥ 0.01. The card pole spans ΔE 0.017 from paper at α = 1, so M-6 in light can never pass on this pole. Measured: adjacent ΔE 0.002-0.003.
   - **W-A's "α equals the bound" against M-6 in dark.** A separable dark ladder needs Δα ≈ 0.07 per step (ΔE(card, page) = 0.150). A ladder pinned to its bound (±0.03) is flat and fails M-6. The probe steps above the bound, so W-A leg 4 reds on every rung above the thinnest of each band. The witness should read "α ≥ bound, and the thinnest rung of each band = bound".
7. **M-4 cannot be read on the specimen as built.** The specimen's dock "fg" run is an *inactive* tab, and an inactive `DockControl` tab paints `--muted-foreground` by design (`dock/styles/controls/tab-button.css:47`). Any honest two-register dock therefore reads fg = muted on that run (ΔL 0.000), and M-4 reds 14/14 on the probe. The registers themselves separate: ΔL_OK(`--foreground`, `--on-glass-muted`) is 0.266 in light and 0.134 in dark. This is an instrument finding, so M-4 is **unresolved, not green**.
8. **The dark card pole reads as brown only on the chrome rungs, and only over saturated red.** Over UIA-V-198's ground `#761617`, the content rungs stay red glass: hue 27, C 0.088-0.111. The chrome rungs shift to hue 34-40 at C 0.033-0.048, and that is the brown. The deep pole keeps hue 24-27 at every rung, but over the dark page every plate lands at ΔE 0.000-0.005 from the page: HEAD's dark-ladder disease, restored exactly.

## 1 · Research questions

### Q1 · The chrome bound over real photos, the content band over ceiling 0.5, and where muted text meets content glass

**Command:** `node S/bound.mjs`, which writes `S/bound.json`.
- **Model:** composite = α·P + (1 − α)·sat₁.₅(blur_σ(G)), on encoded sRGB (Filter Effects 1), with WCAG against the static inks. Light fg `hsl(24 10% 10%)`, light muted `hsl(30 26% 35%)`; dark fg `hsl(30 14% 90%)`, dark muted `hsl(34 16% 72%)`. The least α comes from bisection on a 1/512 grid.
- **Grounds:** chicago's 49 photos (`sips -Z 400` to PNG in scratch, pixels every 3rd); the 10 value.js swatch fixtures; a max-chroma OKLCh sweep (L 0.30-0.95 × 12 hues) standing in for arbitrary swatches; and HEAD's frozen Chromium aurora frames (`harness/out/caps/head/png/chromium-{theme}-{aurora,aurora50}-empty-base-full.png`).

| ground | statistic | light · card | dark · card | dark · deep (`#0b0a09`) |
|---|---|---|---|---|
| any input (black + white) | min over all inks | **0.871** | **0.854** | 0.734 |
| any input | fg only | 0.525 | 0.719 | 0.619 |
| value.js swatch fixtures (`#000`…`#ff8800`) | min | 0.871 | 0.801 | 0.660 |
| arbitrary-swatch sweep | min / fg only | 0.861 / 0.488 | 0.842 / 0.697 | 0.719 / 0.598 |
| chicago photos, σ 0 | pooled p05 · pooled p00 · worst photo p05 | 0.852 · 0.871 · 0.867 | 0.828 · 0.854 · 0.854 | 0.695 · 0.734 · 0.734 |
| chicago photos, σ 16 + saturate 1.5 | same | 0.832 · 0.871 · 0.859 | 0.814 · 0.854 · 0.854 | 0.676 · 0.734 · 0.734 |
| chicago photos, σ 20 + saturate 1.5 | same, and fg only p05 | 0.830 · 0.869 · 0.855; fg 0.377 | 0.813 · 0.854 · 0.854; fg 0.641 | 0.674 · 0.734 · 0.734 |
| aurora ceiling 1 (σ 0 / σ 20) | p05 | 0.762 / 0.766 | 0.799 / 0.799 | 0.654 / 0.656 |
| aurora ceiling 0.5 (σ 0 / σ 20) | p05 | **0.510 / 0.516** | **0.484 / 0.496** | 0.311 / 0.320 |
| value.js atmosphere band (any hue, L 0.50-0.82 light / 0.18-0.42 dark, max chroma; `node S/q4.mjs`) | min | 0.845 | 0.125 | — |

**Answers.**
- **The chrome bound is 0.871 (light) and 0.854 (dark).** It is the any-input bound, and the photo corpus reaches it within 0.02, because photos contain near-black (and, in dark, near-white) pixels. The probe's chrome α of 0.88 / 0.86 sits 0.009 / 0.006 above it.
- **The content bound over ceiling 0.5 is 0.516 (light) and 0.496 (dark).** The probe's 0.53 / 0.50 content base sits on it.
- **A content α ≤ 0.64 is defensible only for a ceiling-0.5 declaration.** Over ceiling 1 the content bound is 0.766 / 0.799, which forces 0.77-0.80 on every content rung. The painted W-A read over paper + ceiling 1 + ceiling 0.5 gives 0.745-0.760 light and 0.610-0.660 dark (`S/out/caps/pole/results/W-A.log`).
- **Where muted text sits on content glass over a field** (from `X.md` §1 census, not re-measured):
  - **value.js:** every pane is `<Card tier="resting">` over the user-seeded atmosphere (`ColorPicker.vue:11` and 12 more). That is the one production route with muted text on content glass over a vivid field. Its band needs 0.845 in light (above). value.js is held on 7.0.0 and does not use `<Aurora>` at a fixed ceiling, so the ceiling-0.5 declaration does **not** cover it.
  - **chicago:** listing cards (`<Card shadow>` → resting) sit over `.ground`. Those gradients are L 0.80-0.82 at α 0.30-0.55 over paper, so the composite under the card is lighter than ceiling 0.5 and the bound is below 0.52. Photos sit inside cards, not under them.
  - **keyframes:** quiet cards over graph paper; the aurora is at ceiling 0.1 on home only. The bound is paper-trivial.
  - **fourier:** wash and resting over paper, prose and `--card` canvases. Paper-trivial, except text-over-text, which no bound covers.
  - **The library's own demo shell:** ceiling 0.5.

  So the declaration "content band = the library's fields at ceiling ≤ 0.5, plus paper" covers every shipped route except value.js's panes. Those panes need a consumer tier (resting → a chrome rung) or a D3-A ruling that value.js panes are chrome.

### Q2 · The perimeter rung re-derived against the bound composite, against a two-tone edge

**Command:** `node harness/m3-non-text.mjs S/out/caps/{pole,v-perim60,v-perim72,v-twotone}`. The variants are one build with `--inject`:
- `var/perim60.css` and `var/perim72.css` set `--ink-perimeter: 0.60` and `0.72`.
- `var/twotone.css` adds `.field-control { box-shadow: 0 0 0 1px var(--card) }`: a 1 px pole band outside the ink border. It is built here as the question names it, not from any other family's specification.

The row read is the field well's border against the well fill inside and the plate outside (p05 over columns).

| variant | light paper | light c1 | light black | dark paper | dark c1 | dark white | Dialog Close ring |
|---|---|---|---|---|---|---|---|
| probe, `--ink-perimeter` 0.48 | 2.76-2.82 | 1.97-2.80 | 1.04-2.80 | 2.59-2.64 | 1.96-2.60 | 1.00-2.60 | 2.89-2.92 light, 3.38-3.54 dark |
| 0.60 | **3.94-3.98** | 2.78-3.98 | 1.46-3.98 | 3.47-3.54 | 2.63-3.49 | 1.12-3.49 | unchanged |
| 0.72 | 5.67-5.74 | 3.97-5.74 | 2.09-5.74 | 4.51-4.59 | 3.40-4.54 | 1.43-4.54 | unchanged |
| two-tone at 0.48 | 2.96-3.05 | 2.96-3.02 | 2.96-3.02 | 3.72-3.75 | 3.73-3.81 | 3.67-3.80 | unchanged |
| HEAD (`harness/out/caps/head`, HARNESS §3) | 2.21-2.79 | 1.06-2.79 | — | — | 1.09-2.35 | — | 1.80-1.81 |

**Answers.**
- **On the chrome band, the rung needs about 0.52, not 0.60.** Chrome composites are bounded near the pole, so the perimeter reads the same on every ground. At 0.48 every chrome row reads 2.76-2.82 (light) on paper, black, white and ceiling 1 alike, and contrast climbs about 0.10 per 0.01 of α (0.48 → 2.76; 0.60 → 3.94). So 3:1 sits at about 0.505, and 0.52 carries margin.
  - Against the owner's "subtle" register that is a small step: the HEAD edge reads 2.21-2.79 on paper, and 0.52 would read about 3.2. The 0.60 variant reads 3.94 on paper, and in `S/glance/q2-edge-light.png` it reads visibly darker. That is the heavier register the question fears.
  - The content band cannot be fixed by the rung. Over black, the wash-rung perimeter is 1.04 at 0.48 and 2.09 even at 0.72, because the content composite itself goes dark.
- **The two-tone edge makes the perimeter ground-independent, but it needs a rung near 0.52 in light too.**
  - At 0.48 it reads 2.96-3.05 in light on every ground: the outer pole band isolates the ink from the field. It reads 3.67-3.81 in dark.
  - It clears 3:1 in dark everywhere, and on content rungs over black, which no single-tone rung does.
  - It costs a second painted band per control, and it does not touch the focus ring, which reds over hostile grounds in every variant (wash ring over black 1.98-2.94; over dark white 1.54-1.87).
- **The Dialog Close ring is its own ink** (a focus outline that does not read `--ink-perimeter`). It reads 2.89-2.92 in light in every variant, so it needs its own re-derivation against the chrome composite.

### Q3 · The blur ladder F48 wants, with legibility carried by α

**Command:** `node harness/m8-chrome-calm.mjs` and `node harness/m2-text-contrast.mjs` on three captures of the probe build:
- `S/out/caps/v-blur700` (`--inject var/blur700.css`: 1/7/7/11/11);
- `S/out/caps/v-blurmid` (`var/blurmid.css`: 6/10/12/16/16);
- `S/out/caps/pole` (HEAD's 10/14/16/20/22).

The paired captures are `S/glance/q3-blur-{light,dark}-stripes.png`: columns are the three ladders, rows are floating, overlay, the dialog rung and wash.

| ladder | light stripes: floating / overlay / dialog-rung / Dialog (bleed · C) | dark stripes: same | dock bleed (info) light / dark | wash muted over stripes (light / dark) | light and dark M-2 over ceiling 1 |
|---|---|---|---|---|---|
| 1/7/7/11/11 | 1.05·0.022 / 1.02·0.017 / 1.02·0.017 / 1.01·0.016 | 1.13·0.034 / 1.06·0.027 / 1.06·0.027 / 1.01·0.024 | 1.11 / **1.25** | 2.90 / 2.06 | identical to HEAD blur |
| **6/10/12/16/16** | 1.02·0.022 / 1.01·0.017 / 1.01·0.017 / 1.01·0.016 | 1.04·0.034 / 1.02·0.026 / 1.02·0.027 / 1.00·0.024 | 1.05 / 1.11 | 2.98 / 2.16 | identical |
| 10/14/16/20/22 (HEAD) | 1.01·0.022 / 1.00·0.018 / 1.01·0.018 / 1.01·0.016 | 1.02·0.034 / 1.01·0.027 / 1.00·0.027 / 1.00·0.024 | 1.02 / 1.04 | 3.36 / 2.53 | identical |

**Answers.**
- **M-8 is green at all three ladders, in both themes.** With chrome α ≥ 0.86 the veil carries both halves: chroma 0.016-0.034, well under 0.04. Bleed stays ≤ 1.13 on gated rows even at 7.0.0's radii.
- **Blur changes no ink reading over the aurora** (a smooth field). It moves only content-band text over the 24 px stripes, which the ceiling-0.5 declaration already leaves outside the guarantee.
- **The ladder F48 wants is the midpoint, 6/10/12/16/16.** Its worst dock bleed is 1.11 against 1.25 at 7.0.0. The dock rides `--glass-blur-resting-radius`, so at 7.0.0 radii the dark dock sits exactly on M-8's 1.25 line. The midpoint drops the cost of every rung by 4-6 px of radius and keeps a 0.14 margin on the dock.
- **Playwright WebKit cannot answer this** (it paints no `backdrop-filter`). Real Safari: **UNMEASURED (owner's safaridriver checkbox)**.

### Q4 · Dark: the card pole (L 0.295) or the deep pole (the page, L 0.146)

**Commands:**
- the pole run (card);
- `S/out/caps/v-deep` (`var/deep.css`: `html.dark [data-spec] { --card: #0b0a09 }`);
- `S/out/caps/v-red` and `v-deepred` (the black stand repainted `#761617`);
- `node harness/m6-separable-ladder.mjs`, `m2-text-contrast.mjs --verbose`, and a composite read of the red cells. Analytic twin: `node S/q4.mjs`.

UIA-V-198's red ground is `#761617` (L 0.371, C 0.131, h 26), a 200×300 mean read from value.js's own evidence PNG. In the same PNG, 7.0.0's card-pole pane composites `#633732` (L 0.390, C 0.064).

| | card pole | deep pole |
|---|---|---|
| over the red, content rungs (wash, quiet, resting) | `#691b17` `#611d19` `#5a1f1b`: h 27, C 0.111-0.088, ΔE from the red 0.028-0.060 | `#540b0b` `#490b0b` `#3f0a0b`: h 25-27, C 0.104-0.081, ΔE 0.085-0.135 |
| over the red, chrome rungs (floating, overlay, dock) | `#44261f` `#3c2821` `#452720`: **h 34-40, C 0.033-0.048** (the brown) | `#1f0b0a` `#150a09` `#200c0b`: h 24-25, C 0.020-0.035, L 0.160-0.185 (near black) |
| separation from the dark page (M-6) | every plate ΔE 0.078-0.150; adjacent 0.010-0.030 (wash→quiet 0.010 reds by 0.0003) | **every plate ΔE 0.000-0.005; adjacent 0.000-0.002**: FAIL 19/19 rows |
| fg over ceiling 1 (floating / overlay / dock / resting) | 9.53 / 10.22 / 5.96 / 6.88 | 13.95 / 14.97 / 8.81 / 9.56 |
| worst over dark white (wash fg / muted) | 2.41 / 1.55 | 3.00 / 1.93 |
| chrome bound (any input) | 0.854 | 0.734 |

**Answer: keep the card pole.**
- The deep pole wins on contrast everywhere and keeps red glass red. But it paints every plate the colour of the page, so the dark ladder vanishes (M-6 0.000). That is the exact disease HEAD's L 0.17 ink veil has (PORTFOLIO §1.2), and `S/glance/q4-dark-page.png` shows it.
- The card pole keeps every plate ≥ 0.078 from the page, and adjacent rungs at 0.010-0.030.
- UIA-V-198's brown is real, but only on chrome rungs over a saturated red. It is a chrome decision (calm over hue), and it is milder than 7.0.0's at α 0.72 (C 0.033-0.048 against 7.0.0's 0.064 at a lighter L 0.390).

### Q5 · Real Safari

- **Real Safari: UNMEASURED (owner's safaridriver checkbox)** for paint-only composites, blur and saturate legs, and glyph rings alike.
- **What Playwright WebKit shows, paint-only** (probe build, ladder specs, sample regions; `node --input-type=module …` over `S/out/caps/pole/cells.json`):
  - Composites agree with Chromium to max ΔE_OK 0.0013 (light paper) and 0.0018 (dark paper), within 1/255 per channel; over black and white, ≤ 0.0001.
  - Glyph rings do not agree. Over black, light floating muted reads **4.44 in Playwright WebKit against 4.65 in Chromium**, over the same painted composite. Its glyph cores resolve `#735c45` against Chromium's `#705942`, so text rasterisation, not the veil, moves the ring. W-A's painted chrome bound reads 0.885 in Playwright WebKit against 0.865 in Chromium.
  - So D3-A's chrome α needs about 0.02 of engine margin: **0.89 light**, and 0.86 dark (both engines already clear there).
- Whether Safari's `blur` and `saturate(1.5)` legs move M-2 cannot be read in Playwright WebKit. Analytically, the saturate leg barely moves the bound over the fields (≤ 0.006 between σ 0 and σ 20 with saturate), because at α ≥ 0.86 only 14% of the backdrop reaches the glyph ring.

## 2 · The strongest form

What D3-A must specify precisely to work:

1. **One recipe, one pole, one scalar.** `background: color-mix(in srgb, var(--card) calc((1 − (1 − α_tier)·level)·100%), transparent)`, composed at the element (`@utility glass-plate`) and as `:root` `--glass-plate-*` values. Level 0 is α = 1 (the opaque escape), level 0.3 (PCM) is 1 − 0.7(1 − α), and level > 1 thins. There is no ink token, no luma term and no clamp.
2. **Two bounds, stated with their grounds and their inks, in the token file.** The shipped numbers are derived by `bound.mjs` against the static inks:
   - **chrome:** α_chrome ≥ the any-input bound: 0.871 light, 0.854 dark, plus 0.02 engine margin → **0.89 / 0.86**. It covers floating, overlay, dialog, sheet, crown, the dock at both morph endpoints, and the well.
   - **content:** α_content ≥ the bound over the *declared* content field. At the library's ceiling ≤ 0.5 plus paper that is 0.516 / 0.496 → **0.53 / 0.50**. Over ceiling 1 it is 0.77 / 0.80.
3. **A ladder that steps above the bound.** Each band's thinnest rung is on its bound; thicker rungs add `--glass-veil-step`. The step must be ≥ 0.07 so the dark ladder separates (M-6 needs ΔE ≥ 0.01; ΔE(card, page) = 0.150). Probe: light 0.53/0.60/0.67 · 0.88/0.95; dark 0.50/0.57/0.64 · 0.86/0.93. The dialog and sheet sit at chrome + step (see risk 5 for the real Dialog's scrim).
4. **A written content-band declaration.** Content glass guarantees muted AA over paper and library fields at ceiling ≤ 0.5, and nothing else. Over any other ground (ceiling 1, photos, a user-seeded field, black), text-bearing content surfaces must take a chrome rung. That is a consumer-facing rule, and it is where value.js's panes land.
5. **Ink stays static:** `--foreground` and `--on-glass-muted` in both arms. The dock reads the same pair (`--dock-fg-on-aurora: var(--foreground)`, muted `var(--on-glass-muted)`). Every `contrast-color()` and the `--glass-backdrop` bucket go (common floor row 2).
6. **The perimeter rung is re-derived on the chrome composite:** `--ink-perimeter` ≈ 0.52 (3:1 at about 0.505), plus a separate re-derivation of the focus-ring ink (Dialog Close 2.89-2.92). Alternatively the two-tone edge at 0.52, if the content band must hold 3:1 over hostile grounds.
7. **The well is a chrome rung:** `--glass-well` = `--card` mixed `--glass-well-tone` (8%) toward `--glass-well-toward` (light `--foreground`, dark `--background`, so the recess always deepens), at α_chrome, transmissive. `--input-on-glass` retires with no alias.
8. **Blur 6/10/12/16/16, one saturate.** Blur is decoupled from legibility (Q3).
9. **The light `--card` must sit within 0.008 L of paper, or the opaque escape and the top chrome rungs miss M-1's floor.** `--card: hsl(30 85% 96%)` has L 0.974 against a floor of 0.975. `hsl(30 85% 97%)` passes every ladder row in both engines (Q-M1 below).

## 3 · The probe (worktree on `dac7d50c`; patch `S/D3-A-probe.patch`)

**What changed in `src`** (`git diff --stat`: 16 files, **+59 / −966**):
- `tokens/glass.css`: the ink, base and derived rungs are replaced by `--glass-veil-content` 0.53, `--glass-veil-chrome` 0.88 and `--glass-veil-step` 0.07. The rungs and offsets derive from these (dock and crown = chrome; dialog and sheet = chrome + step, capped at 1; chassis = content). The `--glass-plate-*` values become the pole mix, and `--glass-well` plus `--glass-well-toward` are added.
- `tokens/dark-arm.css`: content 0.50, chrome 0.86, well toward `--background`; `--input-on-glass` is deleted. `tokens/on-glass-fg.css` loses `--input-on-glass` too.
- `glass/veil.css`: the recipe above; the luma clamp is deleted.
- `glass/ladder.css`: the `--glass-backdrop: light` self-engage, the bright-bucket muted lift and the `contrast-color()` block are deleted.
- `glass/material.css`: `contain: paint` is deleted (floor row 1).
- `_shared/field/control.css`: `--input-on-glass` → `--glass-well` (4 sites).
- The dock:
  - `adaptive-legibility.css`: static inks, no `contrast-color()`, `[data-backdrop-mode="opaque"]`;
  - `shell.css`: the collapsed tier becomes the dock (chrome) tier, and the bucket is dropped;
  - `GlassDock.vue`: the sampler wiring is deleted and the `backdropMode` default becomes `"glass"`;
  - `useDockShellProps.ts`: `DockBackdropMode = "glass" | "opaque"`, and `backgroundCanvas` is deleted.
- **Deleted:** `composables/glass/{backdropLuminanceSample,useGlassBackdropLuminance,backdropSampleMath}.ts` (746 lines), `--glass-backdrop-luma` (`property-regs.css`), and the knee (`glass-fx.css`).
- **Left undone, and owed** (cost, not measured): `components/sheet/styles.css:216,226` read the deleted `--glass-veil-ink`; `music-staff/styles.css:63` writes it, now a dead write; `tokens/manifest.ts:22` lists it; the stale comments in `veil.css`, `ladder.css`, `dock.css`, `search.css` and the dock README; and `--glass-backdrop` remains declared (`glass-fx.css`, `deep.css`, `surfaces-pager.css`).
- **Demo and tests that reference the deleted API:** `demo/stories/dock/{_frame/DockStage,layers,sections,cta-receive,dock-search}.vue`, `demo/stories/substrates/glass-material.vue`, `tests/components/custom/dock/GlassDock.{backdrop-mode,motion-parity,posture,touch-gate}.test.ts`, `tests/composables/glass/backdropLuminanceSample.test.ts`, `tests/setup.ts`.

**Command:** `D3_OUT=S/out node docs/tranches/BL/design/material/harness/run.mjs <worktree> --label pole` builds, captures 68 cells and 8 live windows (634.8 s at load 153), and runs all 14 witnesses. Logs are in `S/out/caps/pole/results/`.

| witness | HEAD (HARNESS §3) | probe, Chromium gate | the reading |
|---|---|---|---|
| **M-1** no grey | FAIL 11/11 | FAIL **2/11** | Every translucent plate and the dock: L 0.976-0.980, ΔE paper 0.009-0.015 (`#fcf8f1` … `#fdf6ed`). The two fails are **opaque** `#fdf5ec` (L 0.974, the pole itself) and the **real Dialog** `#faf3e9` (L 0.967, scrim transmitted). With `--card: hsl(30 85% 97%)` (`S/out/caps/v-card97`, `--gate chromium,webkit`) every ladder row passes in both engines, leaving the Dialog at L 0.973 in both (FAIL 2/21, the Dialog in each engine) |
| **M-2** text | FAIL 169/560 | FAIL **35/560** | Every chrome row passes in both themes over all 7 grounds. The fails are all content rungs: light c1 muted 3.34-4.11; light black muted 1.72-2.66 and wash fg 4.58; light checker 3.55-4.21; light stripes 3.36-4.35; dark c1 muted 3.72-4.39; dark white fg 2.41-3.54 and muted 1.55-2.28; dark checker 3.79-4.17; dark stripes 2.53-3.93. The dock "fg" and muted runs at 4.60-4.65 over black and white are the tightest chrome rows. Light paper: all 36 rows ≥ 4.5 (muted 6.08-6.21) |
| **M-3** non-text | FAIL 237/266 | FAIL 213/266 | At `--ink-perimeter` 0.48, light paper reads 2.76-2.82 and the Dialog Close ring 2.89-2.92 (Q2). Not re-derived in the probe; the 0.60 variant turns every light and dark chrome row green except the Close ring |
| **M-4** dock register | FAIL 14/14 | FAIL 14/14, **instrument** | Dock "fg" = muted = `#705942` (light) and `#c3b9ac` (dark): the "fg" run is an inactive tab, which paints `--muted-foreground` by design. The inks are no longer `#000` and `#fff` |
| **M-5** live dock | FAIL 6/16 | **PASS 16/16** | 0 `getImageData` and 0 `readPixels` in all 8 live windows (default and fed); dock 5.32 / 5.36 (light c1), 5.72 (light c0.5), 5.96 / 5.80 (dark c1), 6.67 / 6.61 (dark c0.5) |
| **M-6** separable | FAIL 14/19 | FAIL **5/19** | Light adjacent 0.002-0.003 (structural, finding 6). Dark: every plate 0.078-0.150 from the page; adjacent 0.013 / 0.030 / 0.011, and wash→quiet 0.010 reds at the third decimal |
| **M-7** halos | FAIL 8/8 | **PASS 8/8** | Reference reach 18 px (light) / 17 px (dark), and every host the same. Playwright WebKit PASS 8 |
| **M-8** chrome calm | FAIL 8/8 | **PASS 8/8** | Light C 0.016-0.022, bleed ≤ 1.01; dark C 0.024-0.034, bleed ≤ 1.02 |
| **W-A** (D3-A's witness) | FAIL 68/197 | FAIL **20/197** | Leg 1 green: no writer of `--glass-backdrop-luma` in `src`. Leg 2 green: chrome ≥ 4.5 over black and white in both themes, worst floating muted 4.65 (light) and 4.60 (dark). Leg 3 reds on ceiling 1 only, by the declaration: light wash muted 3.34, dark 3.72; ceiling 0.5 and paper are green (light c0.5 worst 4.56). Leg 4: painted α within 0.03 of the painted bound for floating, dock and popover (0.878 vs 0.865 light; 0.859 vs 0.855 dark) and dark resting and card. It reds on content rungs (bound read over c1: 0.745-0.760 light) and on every rung stepped above its band's bound (overlay 0.949 vs 0.870; the Dialog 0.987) |
| W-B, W-C, W-D, W-E, W-F | FAIL | FAIL 16/24, 216/304, 7/9, 180/360, 66/152 | Other families' centres, not D3-A's; recorded, not pursued |

**In both themes, the probe turns green M-5, M-7 and M-8, plus W-A legs 1-2 (the signal-free chrome guarantee).**
- **M-1** is green on every ladder row with the `--card` lift. The Dialog stays red by 0.002 L.
- **M-2** is green on every chrome row and on the content band over its declared grounds.
- **M-3** goes green on the chrome band when the rung is re-derived (the 0.60 variant). The Close ring stays open.
- **M-4** is unresolved (instrument).
- **M-6** is red in light by construction, and green in dark at a step ≥ 0.07. The probe misses by 0.0003 on one pair.

**Cost.**
- **Runtime:** zero. No observer, no rAF, no readback; F-50's idle rAF on every live dock goes with the sampler.
- **Paint:** unchanged: one `backdrop-filter` per rung. The midpoint blur lowers every radius by 4-6 px.
- **Transmission:** σ = 1 − α = 0.47 / 0.40 / 0.33 on the content rungs (light) and **0.12 / 0.05 on chrome**. Chrome is frosted paper, and the paired glance shows it (`S/glance/pole-vs-head-light-aurora.png`).

## 4 · Public API and consumer impact

**Library API (clean break, E-1).**
- `GlassDock`: `backgroundCanvas` is deleted, and `backdropMode` becomes `"glass" | "opaque"` (it was `"live" | "static"`), defaulting to `"glass"`, with no alias.
- **Tokens deleted:** `--glass-veil-ink`, `--glass-veil-base`, `--glass-backdrop-luma` (and its `@property`), `--glass-backdrop-luma-knee`, `--input-on-glass`.
- **Tokens added:** `--glass-veil-content`, `--glass-veil-chrome`, `--glass-well`, `--glass-well-toward`.
- **Kept, with new values:** `--glass-veil-{wash,quiet,resting,floating,overlay,dock,dialog,sheet,crown,chassis}`, `--glass-veil-step`, and `--glass-plate-*`. The last stay paintable `<color>`s, so X.md §3.4 constraint 2 holds.

**Consumers** (read-only census: `grep` over `value.js/demo`, `keyframes.js/demo`, `fourier-analysis/web/src`, `chicago/src`). Each change lands by E-6 addendum in the consumer's own tranche.
- **chicago:** `style.css:140-141` `max(var(--glass-veil-dock), 0.62)` and `max(var(--glass-veil-wash), 0.62)` become inert (0.88 > 0.62) and should be deleted. The dock clears M-2 over any input, so the photo case (X.md §2, light p05 3.29 under the library's HEAD veil) is covered by the chrome bound. The count's `opacity: 0.6` muting (`style.css:102-105`) can retire once M-4 is read on the right runs, since the dock now carries `--on-glass-muted`.
- **keyframes:** `ChromeDock.vue:370` `:background-canvas="auroraCanvas"` must be deleted, because the prop is gone. `TimelineCaret.vue:106` paints `bg-[var(--input-on-glass)]` and must re-point to `--glass-well` (2 live reads plus comments in `CSSPasteDialog.vue`). The dead `--glass-tint-strength-aa` override is untouched (X.md §0.4).
- **fourier:** the `.glass-opaque` Configurator escape (`VisualizationView.vue:302`) can retire: floating over paper reads muted 6.08-6.21 and ΔE to `--card` ≤ 0.005. The strong-muted hand picks (`PaperView.vue:781`, `PaperSearchModal.vue:320`) can retire where the surface sits over paper. No API change reaches it.
- **value.js** (held on 7.0.0; lands through X-W7L):
  - Its certified-ink model (`ink.ts:24-37`) models a `--card` pole at a rung α, so D3-A is the one veil its model already speaks. THE STOP (X-W7R) should clear, because the ink is solvable against a known card composite.
  - Its panes are `resting` over a user-seeded field whose bound is 0.845. Under the content declaration, they must take a chrome rung (consumer tier) or accept content-band muted failure over bright seeds.
  - Its `data-glass-field-canvas` stamp is read by nothing, before or after.
  - Its reduced-transparency `!important` block still wants the at-element level recipe, which the probe keeps.

## 5 · Engines

| cell | Chromium 149 | Playwright WebKit 26.5 | real Safari |
|---|---|---|---|
| composite, pole mix | measured | within ΔE 0.0018, 1/255 per channel (paint-only) | UNMEASURED (owner's safaridriver checkbox) |
| chrome text over black / white | ≥ 4.60 every row | light floating muted **4.44** over black (glyph raster, not veil); the painted bound 0.885 | UNMEASURED (owner's safaridriver checkbox) |
| `backdrop-filter` blur / saturate | M-8 green at 3 ladders | paints none (no reading) | UNMEASURED (owner's safaridriver checkbox) |
| dock | M-5 green | crashes on `GlassDock` mount (UNMEASURED in Playwright WebKit) | UNMEASURED (owner's safaridriver checkbox) |
| `color-mix(in srgb, … , transparent)` | renders | renders | cited Safari 16.2 (BCD, via PORTFOLIO) |

## 6 · Weaknesses, as named counterexamples

1. **Frosted paper, not glass, on chrome.** Chrome transmits 5-12% (α 0.88-0.95). In `S/glance/pole-vs-head-light-aurora.png` the probe's floating plate and dock read as cream cards over the aurora. The one bound that holds over any input leaves almost no field.
2. **Content glass over a bright or unknown ground is illegible for muted text, by declaration.** Light wash muted reads 3.34 over ceiling 1 and 1.72 over black; dark wash fg reads 2.41 over white. Any consumer that seats content text over ceiling 1, photos or a user-seeded field (value.js panes, bound 0.845) must pick a chrome rung itself. The guarantee is only as good as that declaration.
3. **The light ladder is invisible over paper** (M-1 against M-6). Adjacent rungs are 0.002-0.003 ΔE apart, so identity rests on radius, rim and shadow alone (`S/glance/pole-vs-head-light-paper.png`).
4. **The dark chrome rungs turn brown over saturated red** (UIA-V-198): h 26 → 34-40 at C 0.033-0.048 over `#761617`. Content rungs stay red. The deep pole cures it and kills the dark ladder (M-6 0.000).
5. **The real Dialog transmits its scrim.** At dialog α 0.95 the painted stack reads α 0.987 and L 0.967 over light paper (0.973 with the lifted card), failing M-1 by 0.002. The dialog rung must reach α 1 in light, or the scrim must stop under the plate. Either is a decision outside the pole.
6. **Engine text rasterisation eats the margin.** The chrome bound in paint is 0.865 in Chromium and 0.885 in Playwright WebKit. At the probe's 0.88, Playwright WebKit floating muted over black reads 4.44. Real Safari may differ in either direction, so the shipped chrome α needs an engine margin that only a real-Safari cell can size.
7. **The perimeter cannot be carried by one rung on the content band.** Over black, the wash-rung well edge reads 1.04 at 0.48 and 2.09 at 0.72. Only the two-tone edge (2.96-3.05 on every ground at 0.48) is ground-independent, and it adds a painted band per control.
8. **W-A's own leg 4 reds against the design it certifies.** "Tokens' α equal the bound" contradicts a separable ladder (M-6 dark needs Δα ≥ 0.07). The witness wants restating as "α ≥ bound; the thinnest rung of each band = bound".

## 7 · Open gaps

- Real Safari, every cell: UNMEASURED (owner's safaridriver checkbox).
- **M-4 needs its specimen re-pointed.** The fg run should be the active tab or a `--dock-fg-on-aurora` icon, not an inactive tab. It is not measured here because the harness is read-only to this seat.
- **Content α under the ceiling-1 declaration was not captured.** The analytic answer is 0.77 / 0.80. Neither the combined probe (content = chrome) nor the perimeter rung at 0.52 was captured (0.60 and 0.72 were).
- The Dialog Close focus-ring ink was not traced to its token, nor re-derived.
- **Deferred cost:** the demo and test updates, `sheet.css` and `music-staff` re-derivation, the `manifest.ts` token list, and the stale comments. vue-tsc and unit tests were not run on the probe.
- **The photo corpus is chicago's 49 listing photos at 400 px.** It covers no video or text-over-text ground, and value.js's field was modelled by an OKLCh sweep, not rendered.
- **One process note:** `git add -N .` ran inside the scratch worktree to capture the new-file diff into the patch. That wrote only the worktree's own index, before the worktree was removed. No git write reached the checkout.
