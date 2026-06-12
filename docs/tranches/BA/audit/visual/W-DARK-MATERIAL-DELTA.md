# BA.W-DARK-MATERIAL — the dark register rebuilt as a luminous transmissive material · DELTA

<!-- surface-paths: src/styles/tokens/dark-arm.css, src/styles/tokens/light-dark.css, src/styles/tokens/glass.css, src/styles/glass/ladder.css, scripts/proof-dark-material.mjs, tests-visual/dark-material.spec.ts -->
<!-- surface-hash: 89936015be5ababfd2e4cd67f50090c7571a871a6a4b6a9a15d073fd55c85684 -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the six surface-paths' bytes are
     byte-identical to capture time (sha256 of the concatenated bytes, "\n"-joined,
     surfaceHash convention). Stamped at the own-surface DARK capture against the live demo
     shell + the synthetic luminous-material fixture on :5199 (the dock/overview host route),
     with the W-DARK-MATERIAL token arms + the ladder.css seam recalibration in place. -->

H1 is DECIDED: **arm (a)** — the FULL luminous-dark transmissive material. All 7 scopes landed.

## §0 RE-GROUND drift notes (every cite re-grepped at HEAD)

Batch 0 carved typography.css and made tokens.css/glass.css thin `@import` roots over partials; the cited dark-register files are the carved partials, all intact at the cited lines:

| cite | HEAD status |
|---|---|
| `dark-arm.css:32` `--neutral-0` / `:51` `--card` / `:59` `--primary` / `:160-164` opacity rungs | EXACT, no drift |
| `light-dark.css:70` `--neutral-0` / `:80` `--card` / `:84` `--primary` / `:85` `--primary-foreground` | EXACT |
| `glass.css` tint seam `:208-261`, blur recipe `:57-85`, edge `:187-188` | EXACT |
| `ladder.css` self-engage `:185-196`, contrast-color `:209-238` | EXACT |
| `color-radius.css` surface-tint `:112-127`; the "auto-dark via --foreground" comment at **`:110`** (spec cited `:111`) | **1-line drift** (comment line) |

No re-diagnosis — the mechanism held at HEAD; the gate was driven born-RED on it.

## The chosen dark values — every token edit (old → new, both arms)

| token | HEAD (both arms) | NEW (both arms) | scope |
|---|---|---|---|
| `--neutral-0` (page) | `hsl(24 8% 6%)` | `hsl(24 9% 4%)` | 1 |
| `--card` / `--popover` | `hsl(24 8% 10%)` | `hsl(24 8% 16%)` | 1 |
| `--surface-public-data-panel` | `hsl(36 9% 12%)` | `hsl(36 9% 18%)` (re-anchor above lifted card) | 1 |
| `--primary` | `hsl(48 10% 90%)` (achromatic cream, chroma ≈ 0.005) | `oklch(0.739 0.134 318.1)` (legendre-violet, chroma **0.134**) | 4 |
| `--primary-foreground` | `hsl(24 10% 10%)` (dark ink) | `hsl(24 10% 10%)` (unchanged — clears 7.15:1 over the violet) | 4 |

| token (`.dark` arm only — additive) | HEAD | NEW | scope |
|---|---|---|---|
| `--glass-edge-light-dark` (in `glass.css`) | α `0.10` | α **`0.22`** (the primary dark silhouette device) | 2 |
| `--glass-blur-{wash,quiet,resting,floating,overlay,dock}` (dark arm) | (no dark arm — light `saturate(1.05)`) | dark arm `saturate(1.22–1.35) brightness(1.06–1.18)`, **radius UNTOUCHED** (resting: `saturate(1.30) brightness(1.14)`) | 2 |
| `--glass-tint-strength-aa` (dark arm) | (no dark arm — light 20%) | **`12%`** (the gentle luminous-dark lift, the SAME seam — no third fork) | 3 |
| `--surface-tint-{4..70}` (dark arm) | (no dark arm — light-ink collapse) | `color-mix(in srgb, hsl(48 12% 96%) N%, transparent)` (mixes toward a LIGHT ink, **in-srgb fence held**) | 5 |
| `--glass-tint-strength-floor` (dark arm) | n/a | `12%` (content tiers want the luminous-dark lift as default in dark) | 3/7 |

| token (`:root` light — minted/recalibrated) | HEAD | NEW | scope |
|---|---|---|---|
| `--glass-tint-strength-floor` (`glass.css`) | n/a | **`4%`** (the sub-perceptual silhouette floor — calm-light card stays warm) | 7 |
| `--glass-tint-strength-aa` (`:root`) | `20%` | `20%` (UNCHANGED — the bright-bucket full AA survives) | 7 |

| seam edit (`ladder.css`) | HEAD | NEW | scope |
|---|---|---|---|
| content-tier self-engage | unconditional full AA (`--glass-tint-strength-aa`) + `--muted-foreground` lift | reads `--glass-tint-strength-floor`, NO unconditional muted lift | 7 |
| overlay band self-engage | (folded into one block) | split out — keeps unconditional full AA + muted lift (over an UNKNOWN consumer surface) | 7 |
| bright-bucket `@container` block | `color: contrast-color(--card)` only | `color` + `--foreground` + `--muted-foreground` all → `contrast-color(--card)`; the muted lift moved HERE | 6/7 |
| contrast-color self-engage | unconditional `color` + `--muted-foreground` → white (un-paired with `--foreground`) | overlay band only; `--foreground` lifted in LOCKSTEP with `--muted-foreground` | 6 |
| `.glass-opaque` | `--glass-level: 0` | `+ --glass-tint-strength: 0%` (the opaque escape suppresses the tint axis too — bucket-invariant) | 7 |

## The measured composited ΔL ladder (the π readback)

| metric | HEAD | NEW | floor |
|---|---|---|---|
| page relL (`--neutral-0`) | 0.0049 | **0.00308** (deeper) | — |
| card relL (`--card`) | 0.0100 | **0.02193** (lifted) | — |
| **card/page relL ratio** (the keystone) | ≈ **2.0×** | **7.12×** | ≥ 3.5× |
| composited wash rung relL | 0.0067 | 0.0078 | — |
| composited overlay rung relL | 0.0100 | 0.0210 | — |
| **wash→overlay band span ratio** | ≈ **1.06×** | **2.69×** | ≥ 1.8× (gate) / 1.6× (π) |
| `--primary` oklab chroma | 0.005 (achromatic) | **0.134** | ≥ 0.08 |
| `--primary-foreground` over `--primary` | 14.13:1 (over cream) | **7.15:1** (over violet) | ≥ 4.5:1 |
| `--surface-tint-15` chip over dark card relL | (collapses to card) | **0.0639** vs card 0.0219 (2.9× lift) | ≥ 1.4× |
| dark `--glass-edge-light-dark` α | 0.10 | **0.22** | ≥ 0.16 |
| contrast-color muted-lifts / fg-lifts | 1 / 0 (un-paired → inverted) | **2 / 2** (paired → selected ≥ unselected) | fg ≥ muted |

The chosen dark `--primary` hue: **legendre-violet `oklch(0.739 0.134 318.1)`** — the house `--section-color-7` / `--viz-legendre` identity register (a LIBRARY-identity chroma, NOT a ppmycota/demo preset — the presets-in-consumers fence held). Measured ratios: `--primary-foreground` (dark ink `hsl(24 10% 10%)`) reads **7.15:1** over it (clears the 4.5:1 text + 3.0:1 graphic floors); as a plate it reads 8.08:1 vs the deepened page.

## Per-scope status — all 7 GREEN

1. **Elevation ladder widened** — page L6→L4, card L10→L16, lockstep both arms. card/page 2.0×→7.12×; band span 1.06×→2.69×. The opacity rungs were UNTOUCHED (the substrate widen alone separated the tiers — measured first, no opacity lift needed).
2. **Transmissive** — dark blur arm `saturate(1.22–1.35) brightness(1.06–1.18)` (radius untouched, W-GLASS-CAL's), dark edge α 0.10→0.22 as the silhouette device.
3. **Dark tint-seam arm lifts** — `--glass-tint-strength-aa` dark arm 12% (the SAME seam, no third fork; the `--surface-tint-*` in-srgb fence held).
4. **Chromatic `--primary`** — legendre-violet, chroma 0.134, fg clears 7.15:1.
5. **`--surface-tint-*` dark arm** — mixes toward `hsl(48 12% 96%)` light ink; the chip lifts 2.9× off the dark card.
6. **contrast-color() inversion fixed** — `--foreground` lifted in lockstep (2/2 paired); selected ≥ unselected, library seam.
7. **Calm-light recalibrated** — content-tier floor 4% (calm card oklab L 0.9266, warm — not the oklab(0.785) gray); full AA gates on the bright bucket; muted lift conditionalized; the `.glass-opaque` tint-suppress + the canary dock-exclusion rebaseline.

## The π results (the binding visual truth)

`tests-visual/dark-material.spec.ts` — **12/12 pass** (5 arms × 2 viewports + 2 DELTA captures):
- (a) the dark five-rung band spans a perceptible ΔL ladder (card/page ≥ 3.5×, band ≥ 1.6×) ✓
- (b) a dark glass tier transmits a synthetic aurora backdrop (translucent + saturate ≥ 1.2 glow) ✓
- (c) a selection control inside a glass card reads selected ≥ unselected (calm + bright bucket) ✓
- (d) W7-i busy-bright AA: content tier clears 4.5:1 over white WITH the bright bucket ✓
- (e) W7-ii calm-light no-gray: a `.glass-card` over a plain light page composites translucent warm (oklab L ≥ 0.90) + the caption keeps the muted register ✓

Rebaseline π (no-regress): `adaptive-glass.spec.ts` **10/10**, `adaptive-glass-live.spec.ts` **18/18** (the busy-bright AA floor survives the scope-7 recalibration with the bright signal engaged).

## The frames

| | DARK |
|---|---|
| BEFORE (HEAD — flat charcoal slab, occlusive glass, achromatic primary) | `W-DARK-MATERIAL-before-dark-desktop.png` |
| AFTER (the luminous-dark transmissive material) | `W-DARK-MATERIAL-after-dark-desktop.png` · `…-mobile.png` |

The DELTA is visible: BEFORE the five rungs are near-identical charcoal slabs (the 0.003-luma band) and the floating card OCCLUDES the aurora behind a 20%-cream-washed slab with an achromatic pale-grey "Primary" chip; AFTER the rungs step up with visible rims, the aurora GLOWS THROUGH the floating card (the edge defines the silhouette), and the "Primary" chip paints the legendre-violet. Selected reads brighter than Unselected in both.

## The gate (born-RED → GREEN)

`proof:dark-material` born-RED at HEAD: **8/20 → 7/20 pass** (after the W6 detection fix; 13 fail covering all 7 scopes). GREEN at close: **20/20 pass**. The 6 device-free witness families (W1–W7) + the `pi-readback-spec-exists` wire. Registered in `package.json` + `gates.mjs` (`["local","ci"]`); `proof:gate-script-parity` PASS.

## The W-REFLECT2 gestalt verdict is NOT claimed here

Per BA invariant 4, this wave's own close drives the per-mechanism gate + the π DELTA GREEN and **stages** the dark-register surface for the W-REFLECT2 `proof:ba-gestalt` dark-register-as-a-surface roster verdict (Batch 7). The holistic FAIL→PASS flip is recorded at W-REFLECT2, not here.
