# D3 · pass 1 · D3-C · the cascade ink

| field | value |
|---|---|
| seat | D3 pass 1, RESEARCH for family D3-C (the cascade ink: a declared composite, the ink solved in CSS) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`. The checkout read `ad02b0f8` at start and `396125cb` at the write; the scratch worktree was cut at `9e263caa`. `git diff --stat 9aa2b7f9 9e263caa -- src` is empty, so every HEAD number measures the tasked `src` |
| inputs | `PORTFOLIO.md` §0-§2, the D3-C section, §6 D3-C and §7; `pass-1/W.md` (findings 1 and 4, §6-§7); `pass-1/X.md` (whole); `harness/HARNESS.md`. Source read in the worktree: `tokens/{glass,dark-arm,on-glass-fg,color-radius,light-dark}.css`, `glass/{veil,ladder,material,focus-veil}.css`, `utilities/base.css`, `_shared/field/control.css`, `dock/styles/{dock,shell,adaptive-legibility,search}.css`, `dock/styles/controls/tab-button.css`, `dock/GlassDock.vue`, `dialog/{DialogContent.vue,ModalOverlay.vue,styles.css}`, `aurora/{Aurora.vue,composables/auroraFallbackGround.ts}` |
| instruments | Playwright from `glass-ui/node_modules/playwright`. Headless Chromium 149 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`) and Playwright WebKit 26.5. The battery is `harness/run.mjs` with `D3_OUT` in scratch. This seat's own probes are in scratch `D3/p1/D3-C-research/probes/`: `q1-solve.mjs`, `q2-model.mjs`, `t-scope.mjs`, `c-model.mjs`, `q4-recalc.mjs`, `crawl.mjs`, `q6-photo.mjs`, `gen-scope.mjs`, `apply{,2,3,4,5}.mjs`, and the final diff `c5.patch`. **Playwright WebKit is not Safari**: every WebKit number is labelled Playwright WebKit and is paint-only (headless WebKit paints no `backdrop-filter`). Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| load | Other seats shared the machine. Load averages ran 12-25 through the batteries and 54-176 during Q4. Q4's timings are relative figures from interleaved runs, not absolutes |
| fences | Source was edited and built only in the worktree `…/D3-C-research/wt`, with its vite cache and output in scratch. HEAD's demo was built from a `git archive` copy in scratch. The checkout's `node_modules/.vite` last changed at 20:58, before this seat started. The only write to the checkout is this file |

## 0 · Findings

1. **The composite can be declared exactly; the ground cannot.** With the saturate leg in the model, a declared composite matches paint to ΔE 0.000-0.004 when the ground under the plate is known (HEAD captures, Q2). Left out, the saturate leg costs ΔE 0.013-0.062. The dominant error is the ground itself. One colour for the whole page misses the field under a plate by ΔE 0.013-0.135 (median 0.041-0.074); the mean under the plate's own rect misses by 0.000-0.070. C's accuracy is bounded by how finely a ground can be declared.
2. **Two exact solves exist in shipped CSS, and they are the same solve.** Q1 rendered each solve over 474 dark-ink and 245 light-ink composites:
   - `l³ ≈ Y` reads 4.05-5.31 against a 4.8 target, with 90 of 474 dark-ink rows under 4.5.
   - A closed form in `oklab()` channels (Y through the LMS cubes) and the `srgb-linear` form both read 4.76-4.84 neutral and 4.60-4.88 warm. They agree byte for byte in Chromium and Playwright WebKit.
3. **The ink alone cannot carry mid-luminance grounds. A floor derived from the same declared ground can, and it is C's own.** The composite band where muted clears 5:1 and still sits ≥ 0.08 L_OK from `--foreground` is Y ≥ 0.315 in light and Y ≤ 0.086 in dark (computed from the tokens). The prototype paints a white or black floor layer whose α is solved in CSS from the declared ground. It engages only outside that band, plus a chroma calm on chrome rungs. With it, dark over the ceiling-1 aurora goes from HEAD's fg 2.12-4.07 to fg 10.61-13.06 and muted 4.97-6.62 (Chromium).
4. **Publish the bound, not the mean.** A declared mean under-lifts plates over the field's darker (light) or brighter (dark) parts:
   - over the field, content rungs miss by ΔE 0.059-0.116 with Y 22-48% too bright;
   - over a photo grid, muted reads 2.32-5.94.

   Publishing the field's p10-luminance colour for dark ink, and its p90 colour for light ink, gives M-2 green on every field cell in both themes. Over photos it gives 4.24-7.56 muted. The cost is W-C's upper bound: muted runs up to 7.05 over the field.
5. **Cost.** Style recalc is +10-17% in Chromium on the demo's largest route (`/substrates/aurora`, 1,432 elements) and about 2.1× in Playwright WebKit on a 1,202-element specimen. Registering the solved rungs as `<color>` makes both worse. The emitted CSS grows 16.6% raw and 4.4% gzip.
6. **Three real weaknesses the probe surfaced:**
   - An undeclared consumer ground is silently wrong: HEAD-grade failures of 1.00-4.06, not a loud one.
   - A nested `backdrop-filter` scope (the field well) sees only its parent's paint, not the parent composite the model hands it. That is W.md finding 1, and it pushes well placeholders to 5.8-7.3.
   - CSS cannot read an inherited value it overrides, so a scope that is the direct child of a scope reads its grandparent's ground.

## 1 · Research questions

### Q1 · The ratio error of `l³ ≈ Y` across the gamut, and a closed form in `oklab()` channels

**Command.** `node probes/q1-solve.mjs`. The gamut is a 9-step sRGB cube (729 colours) plus the 19 HEAD aurora and hostile composites. Each swatch paints the composite with an ink square solved in CSS, target 4.8. The ratio is read from the screenshot. A row counts only where an ink exists (dark ink: Y ≥ 0.19; light ink: T·(Y + 0.05) − 0.05 ≤ 1).

| solve | dark ink, neutral (n 474) | dark ink, warm c .035 h 60 | light ink, neutral (n 245) | light ink, warm |
|---|---|---|---|---|
| A `oklch(from C calc(pow(max(0,(pow(l,3)+.05)/T-.05),1/3)) …)` | 4.045-5.273 (p05 4.21), **90 under 4.5**; worst `rgb(224 0 255)` low, `rgb(0 255 32)` high | 4.069-5.311, 81 under | 4.468-5.679, 4 under; worst `rgb(0 128 0)` | 4.407-5.628, 12 under |
| B `oklab()` closed form: Y = −0.0407745·l′³ + 1.1124922·m′³ − 0.0717176·s′³, with l′ = l + 0.3963378a + 0.2158038b, m′ = l − 0.1055613a − 0.0638542b, s′ = l − 0.0894842a − 1.2914855b; ink L = cbrt(k) | 4.763-4.836 | 4.799-4.877 | 4.771-4.828 | 4.600-4.791 |
| C `color(from C srgb-linear k k k)`, k from 0.2126r + 0.7152g + 0.0722b (W.md finding 4) | 4.762-4.836 | 4.795-4.877 | 4.771-4.829 | 4.600-4.791 |

- Chromium and Playwright WebKit agree to the third decimal on every cell (`q1-out.json`).
- The coefficients were computed here (`node -e` over the OKLab LMS→linear-sRGB matrix; their sum is 1.0000000000).

**Answer.** `l³ ≈ Y` misses by −16% and +10% of ratio, and on saturated composites it breaks AA outright. The `oklab()` closed form is exact. It is algebraically the same quantity as the `srgb-linear` form, which is shorter and needs no `pow()`. The residual error is the ink's own chroma: warming the ink at c 0.035 costs down to 4.60 against 4.8 on light inks. So the prototype targets 5.0, and its solved muted reads 4.95-5.08 over flat grounds (`t-scope.mjs`).

### Q2 · Should `saturate()` enter the model, or drop to 1?

**Command.** `node probes/q2-model.mjs <HEAD capdir> head-table.json`, on the HEAD battery's frozen captures. For every plate over the ceiling-1 and ceiling-0.5 aurora, in both themes:
- the raw ground goes through an edge-clamped Gaussian at the rung's radius;
- the HEAD pole and α are composited over it with and without the encoded-sRGB saturate matrix;
- the result is compared with the painted sample.

| cell | ΔE, saturate left out | ΔE, saturate per pixel | ΔE, saturate of the mean ground (what CSS can write) | ΔE, ground as the rect mean | ΔE, ground as one page mean |
|---|---|---|---|---|---|
| light c1 | 0.024-0.059 (med 0.033); ΔY to −14.4% | 0.000-0.004 | 0.000-0.004 | 0.000-0.070 (med 0.013) | 0.023-0.134 (med 0.074) |
| light c0.5 | 0.013-0.032 | 0.001-0.004 | 0.001-0.004 | 0.000-0.050 | 0.013-0.077 |
| dark c1 | 0.028-0.055; ΔY to −16.0% | 0.000-0.002 | 0.000-0.002 | 0.000-0.058 | 0.023-0.135 |
| dark c0.5 | 0.023-0.062; ΔY to −29.7% (dock, brightness 1.14 left out) | 0.001-0.003 | 0.001-0.003 | 0.000-0.025 | 0.013-0.079 |

The candidate's own declared composite, read by resolving the computed `--glass-composite` through a 1×1 canvas (`c-model.mjs`), matches paint in both engines:
- Over paper: ΔE 0.000-0.004 in both themes.
- Over black, white, the checker, the stripes and eight vivid colours, with a 10 px blur and saturate 1.5 in the model: 0.0008-0.0034 in Chromium (`t-scope.mjs`, 24 plates). Playwright WebKit departs by up to ΔE 0.049 on vivid grounds, because it paints no `backdrop-filter` and so no saturate.

**Answer.** Saturate enters the model. The matrix is linear on encoded channels, so `color(from G srgb clamp(0, (0.213 + 0.787s)·r + (0.715 − 0.715s)·g + (0.072 − 0.072s)·b, 1) …)` applied to the declared ground is exact to ≤ 0.004. Clamping bites under 0.004 even on the aurora's reds. Dropping it to 1 is not needed for exactness, and it would change the material's look. What exactness does require is **one filter recipe the model can read**:
- The prototype retires the dock's own `saturate(1.2)`, and in dark `saturate(1.3) brightness(1.14)` (`dock/styles/shell.css`), for the ladder's `var(--glass-saturate)`. Brightness can be modelled too (it is a scalar on encoded channels), but every per-surface filter becomes a term the model must mirror.
- The saturate leg is not where the error lives. The ground's granularity is (Q6, finding 4).

### Q3 · Where no ink clears (dark over ceiling 1): a veil floor, or hierarchy by weight and size?

**The band.** Computed from `--foreground` (light L_OK 0.216, Y 0.0100; dark L_OK 0.925, Y 0.7914) at a muted target of 5.0 and M-4's ΔL_OK ≥ 0.08:
- Light: the composite needs Y ≥ 0.315 (L 0.680, encoded luma 0.597).
- Dark: Y ≤ 0.0862 (L 0.442, encoded luma 0.325).

HEAD's dark composites over ceiling 1 sit at L 0.565-0.652 (Y about 0.18-0.28). That is inside W.md's dead band 0.175-0.183, where only one pole register exists, and above the dark bound. No solve can keep two registers there.

**Weight and size fail on measurement.** Over those composites the best light ink (white) reads at most (1.05)/(Y + 0.05), which is 4.2 at Y 0.2. So even fg fails 4.5, and a muted register by weight is the same ink. By definition that is ΔL_OK 0, and M-4 fails. WCAG's 3:1 large-text exemption covers only ≥ 24 px, or 18.66 px bold. Captions and labels are 15 px.

**The ablation.** The same candidate with its floor and calm injected off (`probes/nofloor.css`, `capture.mjs --inject`, Chromium, field grounds, both themes):
- M-2: dark ceiling 1, popover fg 3.94. Everything else holds, because the bound publication already moves the ink.
- M-4: 14 of 14 rows FAIL, dock ink ΔL_OK 0.000 in every cell. The dock's inactive tab and its label both read the solved muted rung.

With the floor (c5, Chromium), every field cell clears M-2 in both themes:

| cell | fg | muted | well fg / muted | dock fg / muted |
|---|---|---|---|---|
| light c1 | 6.38-16.20 | 5.00-5.37 | 10.68-17.49 / 5.05-7.05 | 8.06 / 5.05 |
| light c0.5 | 9.23-16.20 | 4.97-5.37 | 12.01-17.49 / 5.05-5.94 | 8.06 / 5.07 |
| dark c1 | 10.61-13.06 | 4.97-6.62 | 14.70-16.88 / 4.99-6.74 | 7.45 / 5.27 |
| dark c0.5 | 10.28-12.86 | 4.95-6.33 | 13.88-16.88 / 4.99-6.26 | 7.41 / 5.21 |

**Answer.** C takes a floor, and derives it from the datum it already has. The declared ground gives the backdrop's luma in CSS:
- A white (light) or black (dark) layer at α = clamp(0, (E_t − E)/(P − E), 1), with E the encoded luma of the saturated ground, P the pole and E_t the band's encoded target, moves the composite into the band.
- It also enters the declared composite exactly, because it is a layer the plate paints: veil over floor over the filtered backdrop.
- It engages only where the ground sits outside the band. Over paper, the page and bright light fields its α is 0, and the veil stays a thin card frost.

Hierarchy by weight and size is refused on the numbers above.

### Q4 · The cost of a relative-colour chain on every text node inside glass

**Largest route.** `node probes/crawl.mjs` over the built demo (Chromium, 92 routes reached from `/`) ranks `/substrates/aurora` first: 1,432 elements, 1,251 inside glass, 287 text-bearing. The next is `/dock/layers` at 760.

**Method.** `node probes/q4-recalc.mjs`:
- Each run forces 60 style-only flushes (`getComputedStyle` on a node inside glass, no layout read) after 10 warm-up flushes.
- Three mutations: theme toggle, a `--card` flip on `:root`, and a `--glass-ground-lo` flip.
- Chromium also reads CDP `RecalcStyleDuration`.
- Every GlassDock page crashes Playwright WebKit, and the demo shell mounts a dock on every route. So WebKit ran the specimen ladder (`nodock=1`) with its plates cloned 14× (1,202 elements, 375 scopes), and Chromium ran it too for a paired figure.
- Runs were interleaved (HEAD, C, C-registered) twice.

| page · engine | HEAD (median ms) | C (median ms) | C with the solved rungs registered as `<color>` |
|---|---|---|---|
| demo `/substrates/aurora` · Chromium, theme / card / ground | 25.7-25.8 / 24.1-24.4 / 24.2-24.5 | 28.9-29.5 / 26.3-28.6 / 27.3-29.0 | 31.8 / 30.3-30.4 / 29.6-30.4 |
| same, CDP RecalcStyleDuration per flush | 25.6-26.1 | 29.9-30.3 | 32.7-32.8 |
| cloned specimen · Chromium | 10.6-10.7 / 7.9-8.1 / 7.8 | 11.7-11.8 / 9.6-9.7 / 9.3-9.6 | 10.7-11.2 / 9.6-9.9 / 9.5-9.9 |
| cloned specimen · Playwright WebKit | 151-156 / 162 / 232-235 | 322-341 / 339-342 / 337-338 | 423-436 / 422-426 / 420 |
| real Safari | UNMEASURED (owner's safaridriver checkbox) | UNMEASURED | UNMEASURED |

**Answer.** In Chromium the chain costs +10-17% of a full style flush on the largest route, about 3-5 ms at load 54-176. In Playwright WebKit it costs about 2.1× (theme, card) and 1.45× (ground) on a scope-dense page. Registering `--muted-foreground`, `-strong` and `--glass-perimeter` as `<color>`, so that each is computed once per scope, is slower in both engines (WebKit +25%). The unregistered chain, substituted per text node, is the cheaper form.

The emitted CSS carries 13 inlined copies of the scope body (Tailwind `@apply`):
- specimen CSS 391,098 → 456,170 bytes raw (+16.6%);
- gzip 63,278 → 66,068 (+4.4%).

A real-Safari number is the open cell.

### Q5 · On real Safari, is an RCS whose origin is a `color-mix()` inside a `var()` chain exact?

**Real Safari: UNMEASURED (owner's safaridriver checkbox).**

**The hole.** In the record, it is a `color-mix()` whose endpoint is itself a var-resolved `color-mix()` (`tokens/glass.css:151-159`; G-16 COLORMIX-NESTING and W-BUILD-COLORMIX under `BL/audit/`). The candidate's Dialog runs that exact shape four levels deep:
1. `--glass-backdrop-in` = `color-mix(card, <saturate RCS of color-mix(scrim, var(--glass-ground))>)`;
2. into the registered `--glass-sat` RCS;
3. then the floor RCS;
4. then `color-mix` into `--glass-composite`, then the `srgb-linear` solve.

**Measured in Playwright WebKit.** `c-model.mjs` resolved every surface's declared composite and solved muted in both engines, over paper and both aurora ceilings, in both themes. Across 60 surface pairs the largest channel difference is 1/255. All six Dialog rows differ by 0 bytes. W.md T2 found the single-level case exact to ΔL 1e-6 in Playwright WebKit.

The shipped build lowers each `color-mix()` declaration to a fallback ladder: a `var(--card)` declaration followed by an `@supports (color: color-mix(in lab, red, red))` arm. Both engines take the arm.

**Answer.** Exact in Playwright WebKit. Real Safari remains the one open cell, and the prototype's Dialog chain is the probe to run there.

### Q6 · How should a consumer declare a ground for a photo grid, and should it?

**Command.** `node probes/q6-photo.mjs`, Chromium. It uses two grounds converted by `sips` from repo images:
- a contact sheet of phone screenshots, `docs/tranches/BD/viz/liquid-video/sheet-02.jpg` (mean `#394037`, L p05-p95 0.071-0.849);
- the liquid-metal photograph under `BD/viz/source-media/` (mean `#b09064`, L 0.394-0.987).

Each ground carries 12 plates (content α 0.20; chrome α 0.25 with calm), and each plate a muted bar from the generated solve. The ratio is read per ring pixel.

| ground · theme | undeclared (the page ground) | declared mean | declared bound (p10 for dark ink, p90 for light ink) |
|---|---|---|---|
| screenshots · light | 1.01-1.47 | 4.30-5.28 (6 of 12 under 4.5) | 5.08-5.97 (0 under) |
| screenshots · dark | 1.56-4.06 | 2.32-5.94 (7 under) | 4.24-7.56 (2 content plates under, over the brightest icons) |
| metal · light | 1.16-2.36 | 2.78-5.01 (5 under) | 5.05-6.94 (0 under) |
| metal · dark | 1.10-1.93 | 4.28-4.92 (4 under) | 5.27-6.12 (0 under) |

**Answer.** Yes. A consumer declares the bound its ink must hold over, not the mean: `--glass-ground-lo` (the ground's dark decile) and `--glass-ground-hi` (its bright decile) on the grid's scope. The theme picks which one the solve reads.
- **The mean** lies wherever a plate sits over the photo's darker (light) or brighter (dark) half.
- **The bound** is legible everywhere except over the top decile's own pixels in dark. That is a p90 bound meeting the p95+ highlights.
- **A fine texture** (the checker) declares its blurred mean, because the blur really averages it. **A coarse two-colour ground** (the stripes) declares its darker colour for light ink and its brighter colour for dark ink.

With exactly those declarations (`probes/declared.css`, injected as a consumer stylesheet), every hostile stand the battery paints clears M-2 in Chromium, in both themes.

It should, because the undeclared case is the failure: 1.01-4.06 here, and 1.00-4.06 on the battery's undeclared stands. The weakness is that nothing in the library can tell an undeclared ground from the page (§5, counterexample 1).

## 2 · The strongest form

What C must specify precisely to work. Every clause below is implemented in the probe (`probes/c5.patch`, 16 files, +158/−219 before the sampler deletion) unless marked.

1. **A declared ground pair per scope.**
   - `--glass-ground-lo` and `--glass-ground-hi` are colours: the dark and bright bounds of what paints behind the scope. `:root` declares both as `var(--background)`.
   - The theme selects `--glass-ground` (registered `<color>`, inherits): `var(--glass-ground-lo)` in light, `var(--glass-ground-hi)` in dark.
   - A library substrate publishes its pair. `Aurora.vue` samples `sampleAuroraField` on a 12×12 grid, takes the p10 and p90 luminance samples, and writes each as `color-mix(in srgb, <sample> <ceiling>%, var(--background))` on `document.documentElement`, because portalled glass must see it.
   - A consumer declares its own pair on the scope that paints its background.
2. **A declared backdrop for the layers between ground and plate.** `--glass-backdrop-in` (default: the ground) is the model of anything painted between the ground and the plate. The Dialog declares its scrim (`--overlay-scrim-ink` at 50%) and the focus veil (saturate, then `--card` at `--glass-veil-overlay × --glass-focus-veil-dim-share`). `--glass-focus-veil-dim` was rewritten to that same product so paint and model are one expression. The scope's children reset it to `initial`.
3. **One filter recipe.** Every text-bearing glass `backdrop-filter` is `blur(r × level) saturate(var(--glass-saturate))`. The dock's own saturate and brightness retire (Q2).
4. **The composite, at the element.** `@utility glass-scope` computes the following in order, all in the cascade:
   - `--glass-sat`, the saturate matrix of the backdrop (registered);
   - `--glass-floor`, `color(srgb P P P / A)` with A = max(the luma floor, the chroma calm), solved from `--glass-sat`'s own channels;
   - `--glass-lift`, the floor over the backdrop (registered);
   - `--glass-veil`, `--card` at α = 1 − (1 − rung)·level;
   - `--glass-composite`, the veil over the lift (registered).

   `@utility glass-plate` adds the paint, `background: linear-gradient(var(--glass-veil) …), linear-gradient(var(--glass-floor) …)`. The dock computes on `.glass-dock` (whose tier lerp moved there) and its `.dock-plate` paints the inherited layers.
5. **The solved rungs.** The muted rung is `oklch(from color(from var(--glass-composite) srgb-linear k k k) l c h)`, with k the exact WCAG solve at target T, dark ink in light (`--glass-ink-dir: 1`) and light ink in dark:

   | rung | target T | chroma / hue |
   |---|---|---|
   | `--muted-foreground` | 5.0 | light c .035 h 60; dark c .03 h 70 |
   | `--muted-foreground-strong` | 8 (light), 7 (dark) | same as muted |
   | `--glass-perimeter` | 3.6 | c .02 |

   `--foreground` is not solved: inside the band the brand ink clears 6.07 (light) and 6.18 (dark) by construction, and it measures 6.38-17.49 everywhere in the battery. The perimeter also resolves at `:root` against the page ground, so `.focus-ring`, the Dialog Close and the field wells read one rung.
6. **The ground hand-off.** A scope's non-scope children receive `--glass-ground: var(--glass-composite)`, so a well inside a plate solves against the paint under it.
7. **The field well is a rung.** `--input-on-glass` retires.
   - The well is `.field-control` as a scope: the floor pole at `--glass-veil-well` 0.35, with its floor off.
   - Its perimeter is solved against its ground (the plate), the binding side of the edge.
   - Its recess lip and focus halo are shadow ink (`oklch(0 0 0)`), not `--foreground`. The dark lip had lifted the row inside the edge to `#3a342e` against a `#7a7066` band.
8. **The ladder.** Card pole:
   - light rungs 0.10/0.15/0.20/0.25/0.30 (base 0.20, step 0.05);
   - dark rungs 0.32/0.40/0.48/0.56/0.64 (base 0.48, step 0.08; M-6 measured the need, see §3);
   - dock = base − step; dialog = base + step;
   - chrome rungs (floating, overlay, dock) carry `--glass-calm: 0.12`, the maximum encoded channel spread;
   - the Dialog is a room: `--glass-floor-e: 0.98` in light.

   Floor row 1 is applied (`contain: paint` removed).
9. **Retired.**
   - `--glass-veil-ink` and the luma clamp in `glass-plate`;
   - the bright bucket, the on-glass re-points and both `contrast-color()` blocks (`ladder.css`, `adaptive-legibility.css`);
   - `--on-glass-muted`, `-strong` and `--input-on-glass` in both arms;
   - the dock's sampler call. The probe gates `useGlassBackdropLuminance` off in `GlassDock.vue`. The strongest form deletes the 746 lines of `composables/glass/{backdropLuminanceSample,useGlassBackdropLuminance,backdropSampleMath}.ts` and the `backgroundCanvas` prop; not done in the probe.
10. **Dock registers.** Tabs read `--muted-foreground-strong` (`tab-button.css:47`), so tab and caption keep two solved registers (M-4).

Not yet specified precisely, and owed:
- **Publication outside `<Aurora>`.** `useAurora` on a consumer canvas (value.js's WebGL2 and `"css"` arms) publishes nothing.
- **Live motion.** The drift and breath terms are outside the CPU mirror, so the bound is the static field's (PORTFOLIO §2.5: mirror p90 ΔE 0.062).
- **Two substrates.** A document with two publishing substrates has one pair.

## 3 · The probe: the battery on the candidate (c5)

**Commands.**
- `node probes/apply.mjs wt`, the field's `@apply` moved to `veil.css`, then `apply2.mjs` … `apply5.mjs` (final diff `probes/c5.patch`).
- `D3_OUT=…/D3-C-research/out node harness/build.mjs wt --label c5`.
- `node harness/run.mjs wt --label c5 --skip-build`: 68 cells and 8 live windows in 616.8 s at load 51-79, then 8 retune cells.
- The consumer-declared variant: `node harness/capture.mjs out/builds/c5/dist --out out/caps/c5-declared --engines chromium --grounds black,white,checker,stripes --scenes ladder,dialog --inject probes/declared.css`, then each witness on it. The c4 declared capture also ran Playwright WebKit.

Chromium is the gate. The "declared" column reads the hostile stands with the consumer declarations of Q6. Its witness totals count the six paper and field cells it did not capture as MISSING rows, so only its measured rows are quoted.

| witness | HEAD (HARNESS §3) | c5, library grounds (paper, aurora c1, c0.5) + undeclared stands | c5, stands declared | verdict for C |
|---|---|---|---|---|
| M-1 no grey | FAIL 11/11 | FAIL 1/11. Every plate L 0.981-0.985, ΔE 0.003-0.007; the Dialog `#faf8f6` L 0.981. Only the opaque escape (`--card` `#fdf5ec`, L 0.974 against the 0.975 floor) misses, a common-floor row 4 fact | n/a | GREEN but for the escape |
| M-2 text | FAIL 169/560 | FAIL 124/560. **All 124 are on the undeclared stands** (black, white, checker, stripes). Paper and both ceilings clear in both themes (table in Q3; light paper fg 16.20-16.66, muted 4.97-5.04; dark paper fg 11.21-14.63, muted 4.91-4.98) | every measured row ≥ 4.5 in both themes: muted 4.86-6.73, fg ≥ 7.11 | GREEN where the ground is declared |
| M-3 non-text | FAIL 237/266 | FAIL 93/266. Paper and field cells all ≥ 3.0 except the **dark-paper Dialog well** (perimeter 2.53, ring 2.83). Light paper perimeter 3.25-3.48, ring 3.19-3.23; dark aurora 3.60-4.77 | 2 rows under 3.0, the dark-black Dialog well (2.41, 2.71) | GREEN but for the Dialog well in dark |
| M-4 dock register | FAIL 14/14 | **PASS 14/14**. Light ΔL_OK 0.109-0.111 (tab `#5c493a`, label `#7c6858`); dark 0.088-0.091 | measured rows pass | GREEN |
| M-5 live dock | FAIL 6/16 | **PASS 16/16**. 0 readbacks in every live window; dock fg 7.41-8.06, muted 5.05-5.27 over the frozen field in both themes | n/a | GREEN |
| M-6 separable ladder | FAIL 14/19 | FAIL 4/19. Dark passes (adjacent ΔE 0.011-0.014; from the page wash 0.051 … Dialog 0.116). **Light adjacency 0.002** on all four steps | n/a | RED in light, structurally (§5, counterexample 6) |
| M-7 halos whole | FAIL 8/8 | **PASS 8/8** (reach 18 px light, 17 px dark, equal to the reference) | n/a | GREEN (floor row 1) |
| M-8 chrome calm | FAIL 8/8 | FAIL 7/8 on the undeclared stripes (C 0.053-0.079) | **PASS**: C 0.0122-0.0202, bleed 1.01-1.02 in both themes | GREEN where declared |
| **W-C ink follows** | FAIL 284/304 | FAIL 122/304 overall. On paper, both themes, and **after the consumer retune**: 18/18 in [4.5, 5.5] (light 4.95-5.13, dark 4.71-4.99). Out of band only above it: field content plates in dark (muted to 6.62) and well placeholders (to 7.05) | all ≥ 4.86; out of band only above it (wells 5.8-7.3; light stripes content to 6.73) | GREEN on its center (the ink follows the ground and the retune); the band's upper edge fails where the bound publication and the backdrop-root well over-deliver |

Out-of-family witnesses on c5 (Chromium), for completeness:
- W-A FAIL 47/197 (its analytic bound reads plain pixels; C paints a floor it does not model);
- W-B FAIL 16/24 (nothing publishes `--glass-backdrop-luma`; C deletes it);
- W-D FAIL 6/9 (no solver file);
- W-E FAIL 138/360;
- W-F FAIL 66/152 (the field does not yield).

**Playwright WebKit (paint-only, informational).**
- Library grounds: muted 4.61-5.20 light and 4.84-6.64 dark (the missing saturate lowers some rows below 4.8).
- Declared stands: M-2 34/34 rows ≥ 4.5 on black, white and stripes in both themes. Checker 23/34 (light) and 17/34 (dark) rows under 4.5, because with no blur the 8 px squares never average to the declared mean.
- M-7 reach 14 px = reference; M-6 dark adjacent 0.011-0.014.
- The dock rows are UNMEASURED in Playwright WebKit (any page that mounts GlassDock crashes it). Real Safari: UNMEASURED (owner's safaridriver checkbox).

**How the probe got there** (each step measured, then kept):

| candidate | change | result that drove the next step |
|---|---|---|
| c1 | the scope, the solve, the floor, one mean colour published by Aurora | declared-vs-painted over light c1: content rungs ΔE 0.059-0.116, ΔY +22-48%; Dialog over light paper L 0.768 (the scrim showing) |
| c2 | bound publication (p10/p90); the Dialog room floor | Dialog L 0.981. M-2 green on paper and fields in both themes. M-4 14/14 FAIL; dark well perimeter 2.08-2.31 |
| c3 | field perimeter on its ground; perimeter target 3.6; dock tabs on the strong rung | light M-3 green; M-4 7/14 (light ΔL 0.077-0.080) |
| c4 | the well paints toward the floor pole; strong rung 8 (light) | M-4 PASS 14/14; dark well perimeter 2.54 (the lip) |
| c5 | the recess lip and halo in shadow ink | dark paper and field wells ≥ 3.0; the dark Dialog well 2.53 remains |

## 4 · Public API and consumer impact

**New public surface:**

| token | role |
|---|---|
| `--glass-ground-lo`, `--glass-ground-hi` | the declaration a consumer writes |
| `--glass-ground`, `--glass-composite` | registered `<color>`s, readable with `getComputedStyle`; the composite is the painted colour a consumer can reuse, which X.md §3.4 constraint 2 asks for |
| `--glass-backdrop-in` | a declared layer model for scrims, sheets and overlays |
| `--glass-calm` | chrome calm |
| `--glass-muted-target`, `--glass-strong-target`, `--glass-perimeter-target` | the solve targets; a preset may retune them (E-5) |

**Removed** (E-1, no aliases): `--glass-veil-ink`; `--on-glass-muted`, `-strong`; `--input-on-glass`; `--glass-backdrop` and its bucket; `--glass-backdrop-luma`; the dock's `backgroundCanvas` and live `backdropMode` sampling.

**A behaviour change.** A consumer that sets `--muted-foreground` inside a glass scope is overridden by the solve, and an override of it now fights a formula. Consumers that need a hand ink set the targets instead.

| consumer | what it must do (E-6 addendum in its own tranche) | can it? |
|---|---|---|
| value.js (held on 7.0.0) | Declare `--glass-ground-lo/-hi` from its palette. Its `--saved-bg-0..3` ramp's darkest and brightest stops are the bounds, and `derivedLightness` is its mean (X.md §0.3). Retire the certified-ink model (`color-session/ink.ts:24-124`): the producer now solves against the composite it paints, and publishes it as `--glass-composite`, which clears the X-W7R `contrast_unreachable` stop by construction. Its reduced-transparency `!important` block (`foundation.css:846-860`) becomes unnecessary: the plate composes at the element, so a descendant `--glass-level: 0` re-resolves (the probe's escape reads `--card` exactly: opaque rows ΔE 0.000) | yes. Its WebGL2 and `"css"` aurora arms come from `useAurora`, which does not publish in the probe (open) |
| keyframes.js | Delete the `:background-canvas` binding (`ChromeDock.vue:370`). The home `HeroAurora` at ceiling 0.1 publishes its pair automatically. Its graph paper is a fine texture whose blurred mean is the paper, so nothing else is declared | yes |
| fourier-analysis | Declare the plot containers' ground as `--card` (the canvases sit on `.cartoon-card`). Declare the prose overlays (ToC, search, page number) with the bound set by the text under them (the ink colour for `-lo` in light), which floors those plates toward a room. Retire the `.glass-opaque` Configurator and the hand `-strong` picks | yes for paper, plots and prose; images take a declared bound per view |
| chicago | Retire the 0.62 tier floor. X.md §0.1 measured it breaking light: 2.90-3.92. Declare the static `.ground` bounds (its lightest and darkest gradient stops). Declare per-card photo bounds, or one conservative pair for the listing band | the field, yes. Per-photo bounds need an image statistic it does not compute today; a constant pair (`#000` / `#fff`) is legible and near-opaque |

## 5 · Weaknesses, as named counterexamples

1. **The undeclared ground.** The battery's hostile stands are consumer backgrounds nobody declared. Undeclared, the solve targets the page and M-2 reads 1.00-4.06 (light over black: dock 2.86; dark over white: muted 1.03). Over photos, undeclared reads 1.01-4.06. The library cannot tell an undeclared ground from paper, so this is a silent failure, in tension with E-2.
2. **The mean lies at the rect.** One mean per page misses the field under a plate by ΔE up to 0.116 (c1). The bound publication restores M-2, but the ink over-delivers where the local ground is kinder: W-C out of band to 6.62 (content) and 7.05 (wells). The band [4.5, 5.5] is only reachable with a ground at the plate's rect, which is a signal, not a declaration.
3. **Backdrop roots.** A well's own `backdrop-filter` inside a rung sees only the rung's paint (W.md finding 1). So the hand-off "child ground = parent composite" is wrong in paint for nested blurred scopes. Placeholders read 5.8-7.3 against a 5.0 solve, too high rather than too low only because the floor lifted the plate. The cure consistent with C is a well that carries no `backdrop-filter`; not probed.
4. **A direct-child scope reads its grandparent's ground.** CSS cannot read an inherited value it overrides, and `inherit()` is not cross-engine. The hand-off rule skips scopes that are direct children of scopes. value.js's `<Card surface="veil" tier="quiet">` inside the picker plate is the shape at risk if it is a direct child.
5. **Cost.** +10-17% style flush in Chromium at the largest route; about 2.1× in Playwright WebKit; +16.6% raw / +4.4% gzip CSS; real Safari unmeasured. Registration makes it worse. The `@apply` inlining is the byte cost; a single rule over the scope selector list would pay it once.
6. **Light M-6 is infeasible with M-1 for a card pole.** Composites over paper live on the segment paper→card, whose whole length is ΔE 0.017 (`#fbfaf8` to `#fdf5ec`). M-1 caps every plate at ΔE 0.02 from paper, so five rungs can never sit 0.01 apart (c5: 0.002). Either the battery relaxes light adjacency, or light levels separate by blur and edge rather than paint.
7. **The dark veil is not thin.** M-6's "every plate ≥ 0.05 from the dark page" needs card α ≥ 0.32 (computed: α 0.30 gives ΔE 0.048). The dark ladder is 0.32-0.64, which is W-FROST's σ ≥ 80% transmission law broken in dark.
8. **The floor hides the field.**
   - Chrome over the ceiling-1 aurora composites to `#feeae3` (L 0.952) in light and `#2e1c15` (L 0.247) in dark: calm, but the field barely transmits.
   - Light content plates over ceiling 1 sit at L 0.716 (`#fe7254`), with the field present but the plate reading as a lighter field.

   This is the price of legibility over a mid ground, and it moves with the declared bound.
9. **One filter recipe.** The dock loses its `saturate(1.2)` light and `saturate(1.3) brightness(1.14)` dark read. Any future per-surface filter is a model term, or the model drifts.
10. **The dark Dialog well** reads perimeter 2.41-2.53 and ring 2.71-2.83 over the dark page. The Dialog's composite model is the longest chain (scrim, then veil saturate, dim, dialog saturate, floor). Its well is a nested backdrop-filter scope inside it, so this is counterexample 3 at its worst.
11. **Engines.** Playwright WebKit paints no `backdrop-filter`, so every WebKit composite over a vivid ground is the unsaturated one (ΔE to 0.049 against the model), and the checker never averages. Real Safari, where the `glass.css:75-79` comment says the saturate term diverges most, is UNMEASURED (owner's safaridriver checkbox) for the model, the solve, the cost and Q5.
12. **The static publication.** The p10/p90 pair comes from the CPU mirror at t = 0. The live field's drift and breath are not in it, and a ceiling change repaints the pair only through the Vue watch: no inertia (D-1) beyond what a registered-colour transition on `--glass-ground` could add, which was not probed.

## 6 · Commands and artefacts

Scratch root: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-C-research/`.

- **Q1:** `node probes/q1-solve.mjs` → `probes/q1-out.json`.
- **Q2:** `node probes/q2-model.mjs ../harness/out/caps/head probes/head-table.json` → `probes/q2-head.json`. The candidate model: `node probes/t-scope.mjs`; `node probes/c-model.mjs out/builds/c5/dist --engines chromium,webkit --out probes/c-model-c5.json` (also c1, c2 and the c2 WebKit run).
- **Q3 ablation:** `node harness/capture.mjs out/builds/c2/dist --out out/caps/c2-nofloor --engines chromium --grounds aurora,aurora50,paper --scenes ladder,dialog --inject probes/nofloor.css`, then `m2-text-contrast.mjs` and `m4-dock-register.mjs` on it.
- **Q4:**
  - `node probes/build-demo.mjs wt out/demo-c4`, and `… headsrc out/demo-head` (headsrc = `git -C wt archive HEAD …`);
  - `node probes/crawl.mjs out/demo-c2/dist` → `probes/crawl-out.json`;
  - `node probes/q4-recalc.mjs <dist> <label> [--route …] [--clone 14] [--inject probes/registered.css] [--engines chromium]` → `probes/q4-out.jsonl`.
- **Q6:** `node probes/q6-photo.mjs` → `probes/q6-out.json` (`photo.png` and `photo2.png` converted with `sips` from the BD images).
- **Battery:** `harness/run.mjs` on c2, c3, c4 and c5 → `out/caps/c{2,3,4,5}/results/*.log`, plus `out/caps/c{3,4,5}-declared`.
- **Candidate source:** `probes/gen-scope.mjs` generates every relative-colour expression; `probes/apply.mjs` … `apply5.mjs` write it; `probes/c5.patch` is the final diff against `9e263caa`.
- **Worktree:** `git worktree add --detach …/wt HEAD`, with `node_modules` and `tests-visual/node_modules` symlinked; removed with `git worktree remove --force` after this write.
