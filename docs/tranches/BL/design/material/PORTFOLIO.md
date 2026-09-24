# D3 · round 0 · the glass material portfolio

| field | value |
|---|---|
| seat | D3 round-zero portfolio. Design loop D3 covers the glass material in both themes as one design family: the veil, the ink on it, live-mode adaptation, and the material ladder |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | read at `1776f0df`. The tree moved to `d41b974f` during the run through docs-only commits. `git diff --stat v10.0.1 HEAD -- src` is empty at both, so every number below measures the published 10.0.1 bytes |
| inputs | `CHARTER.md` (the design-loop section). `audit/PROMPT-RECAP-SEED.md` (E-1..E-13, D-1..D-4, P-1..P-8, N-13). `audit/REGISTRY.md` F-23, F-24, F-31, F-47, F-50, F-75, plus F-21's R2-06-15 (the O-61 member), F-39 (ring registers) and F-64. `audit/INBOUND-MAP.md`: the 12 F-31 rows and 5 F-23 rows, including UIA-F-216, UIA-F-27, UIA-KF-268 and their neighbours (UIA-F-122, UIA-V-297, UIA-KF-252, -255, UIA-V-198, -431, -234, UIA-F-230, UIA-KF-170, UIA-V-114, -329, -568, UIA-KF-075). Letters under `BK/coordination/`: O-62 (`valuejs-outbound-2026-09-23-glass-veil-grey.md`), O-61 (`…-kf-w13u-relay.md`), C-2 (`chicago-inbound-2026-09-23-dock-live-veil-and-hover-lens.md`), and the O-59 rows above in `…-ui-audit-relay.md`. `docs/design/design-idioms.md` §9. The W-FROST design of record, `BK/execution/2026-08-03-row22-design/APOTHEOSIS-SPEC.md` §1, §3, §13, as the provenance of HEAD's law. `BJ/FEEDBACK-LEDGER.md` F48 (the owner's blur ruling). Source: `src/styles/tokens/` (`glass.css`, `dark-arm.css`, `color-radius.css`, `on-glass-fg.css`, `glass-fx.css`, `property-regs.css`), `src/styles/glass/` (`veil.css`, `ladder.css`, `ladder-undershadow.css`, `material.css`, `control-bit.css`, `glass-capsule.css`, `surface-axis.css`, `a11y-fallback.css`), `components/dock/styles/{adaptive-legibility,dock,shell}.css`, `GlassDock.vue`, `composables/glass/{backdropLuminanceSample,useGlassBackdropLuminance,backdropSampleMath}.ts`, `components/_shared/field/control.css`, `components/aurora/composables/auroraFallbackGround.ts`. The 7.0.0 veil through `git show v7.0.0:src/styles/tokens/{glass,dark-arm,color-radius}.css` |
| instruments | A scratch Vite harness mounts `src/` through the `@glass` alias (`D3/harness/`, port 5463, cache kept in scratch). `index.html` lays out nine plates (wash, quiet, resting, card, floating, overlay, a dialog-tier floating plate, `.glass-resting.glass-opaque`, and `[data-surface="veil"]`) and a live `GlassDock` (fit-content, never collapsing), over paper or over a live `<Aurora>` (default config) at opacity ceiling 1 or 0.5. `css.html` renders the same plates with CSS only, over paper, the frozen aurora capture as an image, black, white, an 8 px checker, 24 px violet/yellow stripes, or an emulated well. Probes `p1-ladder`, `p2-engine`, `p3-ring`, `p5-sampler`, `p6-reach`, `p7-rcs`, `p8-cpu-mirror`, plus `solve.mjs` and `well.mjs`, drive headless Chromium 149.0.7827.55 (WebGPU on: `--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`) and Playwright WebKit 26.5, with Playwright imported from `glass-ui/node_modules`. The aurora is frozen under `reducedMotion: reduce` (the substrate parks after one frame), so plate and backdrop captures see the same field. **Metrics.** Composite: the mean sRGB of an empty plate region. ΔE_OK: Euclidean OKLab distance on the 0-1 scale. Rendered contrast: the WCAG ratio of the resolved ink over the painted ground in a ring around each glyph (1 px, or 3 px where stated), read from a capture with the ink made transparent, reported as p05 over the ring pixels. Perimeter: the painted 2 px edge against the painted ground 2 px and 5 px outside it, taking the minimum. Ink colours are resolved through a private 1×1 canvas; no `getContext()` touches a live field canvas, and the sampler probe wraps only the sampler's own 32×32 context. **Load:** other seats ran on this machine; load averages were 24-44 across the runs. A six-cell sweep took 46-52 s wall with the live aurora and 8-33 s on the CSS-only page. Consumer census: read-only `grep` over `value.js/demo`, `keyframes.js/demo`, `fourier-analysis/web/src` and `chicago/src`. Web: MDN browser-compat-data JSON, read 2026-09-23. Scratch root: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/` |
| tools | the charter's frontend design plugin (DesignSync) syncs claude.ai design-system projects and makes no designs, and the owner withholds Fable (2026-09-23), so this seat is Opus and the verdict comes from the codebase, prototypes and critiques |
| deliverable | Six orthogonal families, plus six formulations considered and not minted (one of them merged by measurement). Each family gets its charter; its answer to problems 1-4, or the exact problem it leaves open; a code sketch of the load-bearing mechanism; engine support; the HEAD reading it leans on and, where one ran, its prototype numbers; cost; consumer impact; known risks; pass-1 questions; and the born-RED witness it must turn green. This document picks no winner |

## 0 · The problem

1. **The light veil reads grey** (O-62, N-13 "why are our docks grayed out, too", fourier OA-43). The light veil ink is a warm near-black by design: `--glass-veil-ink: oklch(0.28 0.035 70)`, and "the plate DARKENS toward it and never lightens toward cream" (`tokens/glass.css:29-34`). So a light plate composites smoke over paper, where 7.0.0 painted `--card` at α 0.30-0.95 (`git show v7.0.0:src/styles/tokens/glass.css`, the `--glass-opacity-*` rungs). The letter asks for a light frost at every level, fixed at the token so every `.glass-*` surface is cured together; dark keeps its own veil. Registry F-31 adds the opaque field well (`--input-on-glass`, `tokens/on-glass-fg.css:37`, which makes the field's `backdrop-filter` inert, `_shared/field/control.css:73-81`) and the blur ladder, which rose to 10/14/16/20/22 px (`tokens/glass.css:69-73`) against F48's owner ruling "Glass blur for ALL glass components slightly more subtle" (`BJ/FEEDBACK-LEDGER.md:82`), from 1/7/7/11/11 at 7.0.0.
2. **Ink is calibrated to the token ground, not the painted composite** (F-23). Muted text fails AA on most routes in light. The perimeter rung `--ink-perimeter: 0.48` is calibrated to 3.0:1 on token grounds (`tokens/color-radius.css:147`; the worst cell 3.011, `glass/control-bit.css:108-137`), so rings and control edges sit at or under 3:1 on painted composites (Dialog Close 1.79:1, R3-02-04). In docks, `contrast-color(var(--card))` resolves both the foreground and the muted ink to pure black or white (`dock/styles/adaptive-legibility.css:67-74`).
3. **Live-mode adaptation** (F-47's luma clause, C-2 row 1). Every readback of the WebGPU field returns alpha 0, so `FIELD_ALPHA_FLOOR` (`backdropLuminanceSample.ts:52`) makes the dock's live luma unavailable forever on the shipped engine, and the live plate resolves to its thinnest veil. chicago measured /0.14 in dark with text reading through, and ships a consumer floor of 0.62. The registry's wave shape has the substrate publish its mean luma per frame and the dock subscribe (F-47 round 2, F-50 W-LUMA-EVENTED).
4. **The material ladder itself.** The levels (`.glass-wash`, `-quiet`, `-resting`, `-card`, `-floating`, `-overlay`, `-opaque`, the dialog, sheet, crown and chassis offsets, and the dock plate), their veil alphas, blur and saturation per level and theme, and O-61 R-1: `contain: paint` on `.glass-wash/-quiet/-resting/-card` (`glass/material.css:104-109`) clips the halos of shadowed capsules seated inside a card (owner: "the shadows on the left clip and are not displayed properly").

**Interfaces only, out of D3's scope:**
- The dock's geometry and motion belong to D2 (`design/dock/`). D3 only names which element carries the veil, and D2's common floor row 6 already fixes that: `.dock-plate` stays the one element that composes the plate and carries the dock's one `backdrop-filter`.
- The aurora and blob engines appear only as far as luma publication needs them (F-47's W-ONE-ENGINE).
- Radius roles are F-30's.
- File placement is D1's.

**Standing law every family is held to:**
- E-1: clean breaks, with no aliases, shims or dual paths.
- E-2: no masking fallback; the primary works in paint or fails loud.
- E-5: presets live in consumers, while the library's own default tokens evolve in `src/styles/`.
- E-6: a consumer updates by an addendum in its own tranche.
- E-13: no inset shadow inside `light-dark()`.
- D-2: breath of life.
- D-3: cartoon-technicolor and aristotelian proportion.
- D-4: Chrome and Safari, with Playwright WebKit not counted as Safari.
- P-2: every visual claim carries a captured DELTA.
- P-3: gates read one source of record.

## 1 · Baseline at HEAD (measured here)

Chromium 149, 1280×900 at DPR 1. **fg** and **muted** are rendered-contrast p05 on a 3 px glyph ring. The 1 px ring agrees within 0.05 on every smooth ground. **perim** is the painted 2 px edge. The paper is `#fbfaf8` (L 0.985, C 0.003); `--card` is `#fdf5ec` in light (L 0.974, C 0.015) and `#352a22` in dark (L 0.295). The dark page is `#0b0a09` (L 0.146). `card` equals `resting` and `veil-surface` equals `quiet` to the byte, so both rows are left out.

### 1.1 Light theme

**Over paper.**

| level | veil α | composite | L | C | ΔE paper | ΔE card | fg | muted | perim |
|---|---|---|---|---|---|---|---|---|---|
| wash | 0.06 | `#efede9` | 0.947 | 0.0058 | 0.039 | 0.029 | 14.96 | 5.62 | 3.02 |
| quiet | 0.10 | `#e6e5e0` | 0.921 | 0.0068 | 0.064 | 0.053 | 13.86 | 5.21 | 3.00 |
| resting | 0.14 | `#dfdcd7` | 0.895 | 0.0075 | 0.090 | 0.079 | 12.79 | 4.80 | 2.92 |
| floating | 0.18 | `#d7d4ce` | 0.871 | 0.0088 | 0.115 | 0.104 | 11.82 | **4.44** | **2.86** |
| overlay | 0.22 | `#cfcbc6` | 0.844 | 0.0082 | 0.142 | 0.130 | 10.84 | **4.07** | **2.84** |
| dialog | 0.18 | `#d7d4ce` | 0.870 | 0.0087 | 0.115 | 0.104 | 11.82 | **4.40** | **2.86** |
| opaque | card | `#fdf5ec` | 0.974 | 0.0147 | 0.017 | 0 | 16.20 | 6.08 | 3.12 |
| dock plate | 0.10 | `#e6e5e1` | 0.921 | 0.0056 | 0.064 | 0.053 | tab 16.66 (ink `#000`) | = fg | — |

Every translucent level is darker than paper by 0.038-0.141 in L, at chroma 0.0056-0.0088. That is below the library's own no-gray floor of C ≥ 0.020 (`color-radius.css:25-37`), so the plates read grey. O-62 is reproduced to the byte:
- fourier's `.glass-floating` composite `rgb(214.7 211.9 207.2)` is `#d7d4ce` here.
- The dock plate paints `color(srgb 0.204 0.148 0.083 / 0.1)`.

**Over the aurora at ceiling 1** (the default config; the field is the same in both themes, see §2.1):

| level | composite | L | C | ΔE paper | ΔE card | ΔE own backdrop | fg | muted | perim |
|---|---|---|---|---|---|---|---|---|---|
| wash | `#f3411a` | 0.637 | 0.220 | 0.411 | 0.396 | 0.042 | 4.63 | **1.74** | **2.22** |
| quiet | `#ea4618` | 0.626 | 0.208 | 0.414 | 0.399 | 0.030 | **4.37** | **1.65** | **2.16** |
| resting | `#e25414` | 0.628 | 0.189 | 0.403 | 0.388 | 0.037 | **4.15** | **1.57** | **2.11** |
| floating | `#da4319` | 0.596 | 0.195 | 0.434 | 0.419 | 0.037 | **3.90** | **1.47** | **2.04** |
| overlay | `#d25b11` | 0.613 | 0.168 | 0.408 | 0.393 | 0.073 | **3.86** | **1.48** | **2.07** |
| dialog | `#da8317` | 0.688 | 0.150 | 0.332 | 0.316 | 0.077 | 5.11 | **1.96** | **2.24** |
| dock plate | `#e6a13d` | 0.759 | 0.139 | 0.264 | 0.248 | 0.044 | tab 7.48 | — | — |

The veil moves the composite only 0.030-0.077 from its own backdrop, and it moves it darker. Muted ink fails at every level.

**Over the aurora at ceiling 0.5** (the demo shell's recessive field): muted 2.38-2.97 and perimeter 2.38-2.59 at every level, fg 6.24-7.91, dock tab 10.93. The composites run `#f39782` (wash, L 0.766) to `#d2926b` (overlay, L 0.715).

### 1.2 Dark theme

**Over the dark page:**

| level | veil α | composite | L | ΔE page | ΔE card | fg | muted | perim |
|---|---|---|---|---|---|---|---|---|
| wash | 0.10 | `#0c0a07` | 0.146 | **0.005** | 0.150 | 15.89 | 10.22 | 4.24 |
| quiet | 0.14 | `#0c0b07` | 0.149 | **0.008** | 0.147 | 15.83 | 10.18 | 4.18 |
| resting | 0.18 | `#0d0a07` | 0.147 | **0.006** | 0.148 | 15.87 | 10.21 | 4.20 |
| floating | 0.22 | `#0e0b06` | 0.151 | **0.011** | 0.144 | 15.79 | 10.15 | 4.21 |
| overlay | 0.26 | `#0e0a07` | 0.149 | **0.008** | 0.147 | 15.85 | 10.19 | 4.24 |
| opaque | card | `#352a22` | 0.295 | 0.150 | 0 | 11.21 | 7.21 | 3.79 |
| dock plate | 0.14 | `#0e0b09` | 0.154 | **0.010** | 0.142 | tab 19.53 (ink `#fff`) | = fg | — |

Ink passes, but the five levels are one colour: all fall within 0.011 of the page, and adjacent levels sit 0.002-0.005 apart. The dark ladder does not exist in paint.

**Over the aurora at ceiling 1:**

| level | composite | L | fg | muted | perim |
|---|---|---|---|---|---|
| wash | `#e73d18` | 0.613 | **3.34** | **2.15** | **1.70** |
| quiet | `#de4115` | 0.601 | **3.53** | **2.27** | **1.75** |
| resting | `#d54d10` | 0.599 | **3.66** | **2.33** | **1.83** |
| floating | `#cc3c14` | 0.565 | **4.07** | **2.62** | **1.92** |
| overlay | `#c3520d` | 0.577 | **3.82** | **2.51** | **1.96** |
| dialog | `#cc7912` | 0.652 | **3.02** | **1.91** | **1.71** |
| dock plate | `#dead37` | 0.773 | tab **2.69** | — | — |

This is C-2 row 1 on the harness: a near-clear dark plate (/0.14) with white ink over a bright field.

**Over the aurora at ceiling 0.5:**
- fg 7.05-8.42.
- muted 4.50-5.44.
- perimeter 2.85-3.07.
- dock tab 6.70.

### 1.3 Hostile grounds (HEAD, 1 px ring, CSS-only page)

| ground | light fg | light muted | light perim | dark fg | dark muted | dark perim |
|---|---|---|---|---|---|---|
| black | 1.15-1.19 (overlay: no glyph separable) | 3.04-3.16 | 1.05-1.07 | 16.5-16.8 | 10.6-10.8 | 4.15-4.18 |
| white | 11.3-15.6 | 4.23-5.88 | 2.87-3.07 | ≤ 1.45 (wash, resting: no glyph separable) | 1.55 | 1.00-1.20 |
| 8 px checker | 3.30-4.08 | 1.37-1.53 | 1.85-2.01 | 3.75-4.87 | 2.41-3.13 | 2.04-2.36 |
| 24 px violet/yellow stripes | 3.93-4.40 | 1.48-1.65 | — | 1.98-3.85 | 1.27-2.47 | — |

Over the stripes, luminance bleed (the p95/p05 luminance ratio inside the composite) is 2.00 at wash, 1.20 at resting and 1.04-1.08 at floating, overlay and dialog. So blur governs it. Hue bleed is the veil's: chroma under chrome text reads 0.089-0.092 (floating `#b56e67`, overlay `#ad6967`), which is the "purple smudges" register of UIA-KF-268.

### 1.4 The live path (`p5-sampler.mjs`)

- **A default consumer dock** (no `backgroundCanvas`) stamps `unavailable / source-unavailable`, with `--glass-backdrop-luma` at 0. The getter at `GlassDock.vue:118-133` returns null, and it hides the shell field canvas from auto-discovery (R2-09-03).
- **A dock fed the WebGPU field** (`:background-canvas` as a getter, as keyframes' `ChromeDock.vue:370` does) ran 37 readbacks in 9 s, and every one had mean alpha 0. It stamps `sample-unavailable`, luma stays 0, and the plate stays at `/0.1` in light and `/0.14` in dark. The maximum blocking `getImageData` read 1.5 ms in this run (R2-09 measured 324-433 ms once per GPU process). Under reduced motion there are 3 readbacks, all alpha 0.
- **The clamp can only darken.** When sampling works, `@utility glass-plate` (`glass/veil.css:57-82`) adds up to two steps of ink past `--glass-backdrop-luma-knee: 0.6` (`tokens/glass-fx.css:145`). In light that means adding dark ink over a bright field, which lowers the composite toward the ink (§2.2).

### 1.5 Engine and instrument facts (measured)

| fact | Chromium 149 | Playwright WebKit 26.5 | real Safari (cited) |
|---|---|---|---|
| filter and compositing math | sRGB-encoded affine: `invert(1) brightness(0.3) invert(1)` over (200,40,40) → (239,190,190); `contrast(0.3) brightness(1.5)` → (224,152,152) | headless paints **no** `backdrop-filter`: the blur-only capture equals the raw capture at ΔE 0.000 in 6 of 6 cells, so its numbers are paint-only | `backdrop-filter` unprefixed Safari 18 (BCD) |
| paint-only ladder over paper | `#efede9` … `#cfcbc6` | `#efedea` … `#cfcbc7` (within 1/255 per channel) | unmeasured |
| `contrast-color()` | `CSS.supports` true; grey 120 → `rgb(0,0,0)` | same | Safari 26 (BCD); binary at Level 5 |
| relative colour syntax with `pow()`, origin `color-mix()`, through a `var()` chain | `oklch(0.29476 0.04 60)` | `oklch(0.294756 0.04 60)` | RCS Safari 18, `pow()` 15.4, `color-mix()` 16.2 (BCD) |
| `overflow-clip-margin` | honoured under `contain: paint` (a paint read 12 px outside, with a 20 px margin), against BCD's "both axes `overflow: clip`" note | `CSS.supports` false | not supported (BCD) |
| `paint-order: stroke fill` on HTML text | supported; the fill paints over the stroke | same | Safari 11 (BCD) |
| `mix-blend-mode: plus-darker` | `CSS.supports` false | true | Safari 9; Chrome none (BCD) |
| `if()` | true | false | none |
| `navigator.gpu` in the harness | adapter present | absent (its aurora runs the GL arm) | WebGPU Safari 26; `mapAsync` Safari 26 (BCD) |
| `GlassDock` mount | renders | **the page crashes** on any page that mounts `GlassDock`; it renders with `nodock=1` and on the CSS-only page | unmeasured (the owner has not enabled safaridriver) |

### 1.6 The 7.0.0 reference (analytic: card at the 7.0.0 α over the measured backdrop, with its 7 px blur and 1.4 saturate left out)

| | wash .30 | quiet .50 | resting .65 | floating .80 | overlay .95 | dock .50 |
|---|---|---|---|---|---|---|
| light over paper, ΔE paper | 0.005 | 0.008 | 0.011 | 0.013 | 0.016 | 0.008 |
| light over aurora c1, muted | 2.44 | 3.27 | 4.15 | 4.79 | 5.80 | 4.61 |
| dark (α .38/.58/.72/.88/.96/.58) over the page, ΔE page | 0.060 | 0.090 | 0.111 | 0.134 | 0.145 | 0.090 |

7.0.0 was a cream frost over paper, and its levels separated from the dark page. Over the full aurora it still failed muted at wash, quiet and resting.

### 1.7 The code in play and the consumer census

- **Plate recipe.** `tokens/glass.css` holds the ink, the base, the step, the derived rungs, the off-ladder offsets and the root plates (`:29-52`, `:134-174`); `dark-arm.css:278-279` holds the dark pair; `glass/veil.css:57-82` the element recipe and luma clamp; `ladder.css` the rungs, the bright bucket and the `contrast-color()` block (`:182-191`, `:254-280`).
  - `--glass-veil-*` appears on 118 lines in 31 files; `--glass-plate-*` on 65 lines in 31 files; `--glass-level` on 90 lines in 28 files.
- **The live channel.** `backdropLuminanceSample.ts` (279), `useGlassBackdropLuminance.ts` (413) and `backdropSampleMath.ts` (54): 746 lines. `useGlassBackdropLuminance` is not exported from the `/glass` barrel; its public faces are `GlassDock`'s `backdropMode` and `backgroundCanvas` props. `--glass-backdrop-luma` appears on 17 lines in 9 files.
- **Ink.** `on-glass-fg.css:35-37` (light) and `dark-arm.css:301-303` (dark) hold `--on-glass-muted`, `-strong` and `--input-on-glass`. `contrast-color(` appears on 22 lines in 5 files; `Timeline.vue:642`'s accent stroke is outside D3.
- **Consumers** (read-only):
  - chicago overrides the dock tiers to `max(<token>, 0.62)` (`chicago/src/style.css:140-141`).
  - fourier moved its Configurator onto `.glass-opaque` (`VisualizationView.vue:302`) and carries GLASS-VEIL-GREY honest-RED.
  - keyframes binds `:background-canvas="auroraCanvas"` on `ChromeDock.vue:370`, the one consumer that feeds the sampler.
  - value.js stamps `data-glass-field-canvas` on its atmosphere (`color-picker/App.vue:34`), which the dock's getter never reaches.
  - value.js's e2e reads `--glass-level` (`e2e/smoke/a11y-modality-support.spec.ts:201-228`).
  - Class-level use: keyframes uses 11 `.glass-*` classes; fourier 68 plus 5 `--glass-level` reads.

## 2 · Facts every family inherits

### 2.1 The legibility floor is a composite lightness

WCAG ratio against a fixed ink sets a luminance bound on the composite under the glyph. That bound depends only on the ink.

| ink | Y | needs, as dark ink on a lighter composite | needs, as light ink on a darker composite |
|---|---|---|---|
| light `--foreground` `hsl(24 10% 10%)` | 0.010 | 4.5:1 → L ≥ 0.604; 7:1 → L ≥ 0.718 | — |
| light `--on-glass-muted` `hsl(30 26% 35%)` | 0.111 | 4.5:1 → **L ≥ 0.876** | — |
| light page `--muted-foreground` `hsl(30 22% 40%)` | 0.144 | 4.5:1 → L ≥ 0.937 | — |
| dark `--foreground` `hsl(30 14% 90%)` | 0.791 | — | 4.5:1 → L ≤ 0.515; 7:1 → L ≤ 0.413 |
| dark `--on-glass-muted` `hsl(34 16% 72%)` | ≈ 0.48 | — | 4.5:1 → L ≤ 0.408 |

The shipped field sits outside those bounds. From the raw captures, sampled every 3 px:
- Aurora at ceiling 1: L ranges 0.617 (p01) to 0.830 (p99), with chroma at p50 0.149.
- Ceiling 0.5 over the light page: L 0.785-0.905.
- Ceiling 0.5 over the dark page: L 0.396-0.521.

The default aurora config does not change with theme, so the dark theme's worst case is a bright field under light ink (F-24's "hero aurora fields ignore dark mode"). **Every family must place a composite of L ≥ 0.876 under light muted ink and L ≤ 0.41-0.52 under dark ink, or move the ink.**

### 2.2 The light veil moves the composite toward its own ink

- At equal α over paper, the ink veil gives muted 5.63 → 4.08 across .06 → .22, where a `--card`-coloured veil gives 6.28 → 6.24 (`solve.mjs`).
- Over the field, the ink veil moves the composite 0.03-0.08 in ΔE and always downward in L.
- The earned darken (§1.4) adds more of the same ink over bright backdrops. Its own comment claims it "darkens the translucent plate so dark text clears ~11:1 over white" (`ladder.css:243-253`). Measured over white it reads 11.27-15.64 for the foreground, but muted falls to 4.23 at overlay: darkening moves the ground toward the muted ink's own luminance, which `ladder.css:173-177` already concedes.
- In dark, the ink veil (`oklch(0.17 0.03 70)`, L 0.17) sits at the page's own lightness, so it is invisible (§1.2).

### 2.3 Where the lift happens is the design freedom (measured convergence)

Every prototype below that clears light muted over the ceiling-1 aurora lands a composite at L 0.88-0.93 and C 0.04-0.06:

| prototype | composite | muted |
|---|---|---|
| D3-A floating | L 0.883, C 0.063 | 4.49 |
| D3-A overlay | L 0.935, C 0.038 | 5.29 |
| D3-F well, every level | L 0.887-0.929, C 0.047-0.059 | 4.60-5.15 |

The sRGB gamut at L ≈ 0.9 caps a warm hue's chroma near 0.06-0.08, so no mechanism keeps the field's vivid colour under legible muted ink. The families therefore differ in five places:
- where the lift is performed (plate paint, the field's own shader, per tile at runtime, or only at the glyph);
- which ink gives way instead (D3-C);
- what the lift costs in transmission;
- what it covers (library substrates only, or any backdrop);
- whether it needs a signal.

### 2.4 Chrome occlusion and the transmission law pull against each other

- **W-FROST's law** (`tokens/glass.css:10-14`; APOTHEOSIS §1) reads: "Occlusion is bought with RADIUS. Legibility is bought with INK. Neither is ever bought with alpha". Its F-8 target keeps content-band transmission σ ≥ 80%, so α ≤ 0.20.
- **The consumers ask for calm chrome.**
  - UIA-F-122: "Floating tier only 18-22% opaque".
  - UIA-KF-268: "purple smudges … expected: menu surfaces opaque enough".
  - UIA-KF-252: "a modal plate reads as a calm room".
  - UIA-V-297: saved-card swatches bleed through dialog text.
- **The measurements split the two.** Blur governs luminance bleed: 1.04-1.08 at 20-22 px over 24 px stripes, 2.00 at 10 px. The veil governs hue bleed: HEAD floating chroma 0.0915 over violet/yellow, D3-A 0.0323, D3-E 0.0788.
- **F48 pulls the blur down.** The owner's "slightly more subtle" blur works against the luminance half. A family that thins the veil must say how chrome stays calm.

### 2.5 A zero-readback publication path already exists, approximately

`sampleAuroraField(config, x, y)` (`auroraFallbackGround.ts:166`) is a CPU mirror of the shader's static output, used today for the placeholder ground. Against the painted, PRM-frozen field at 144 grid points, it reads median ΔE_OK 0.012, p90 0.062 and max 0.154, with |ΔY| median 0.017 and p90 0.081 (`p8-cpu-mirror.mjs`). The medium texture, drift and breath terms are outside the mirror, so it is not a live signal. It bounds what a config-derived publication can promise before any GPU reduction exists.

### 2.6 The common floor (not a differentiator)

Every family lands these rows. They are listed once and left out of each family's cost.

1. **The ladder drops `contain: paint`.** Remove it from `material.css:104-109`; a descendant that must be corner-clipped (media) carries `overflow: clip` with the host's radius itself. Measured reaches: capsule shadow 32 px, floating 36, resting 24 (`p6-reach.mjs`). An `overflow-clip-margin` cure is Chromium-only (§1.5), so it fails D-4. The same removal ends these rungs acting as backdrop roots (`material.css:97-103`), which frees grasp carriers seated in them (O-61 R-1; F-21's R2-06-15).
2. **`contrast-color()` leaves the glass ink:** the dock's self-engage and the bright bucket (`adaptive-legibility.css:67-74`, `ladder.css:254-280`). At Level 5 it returns only black or white (§1.5), which is F-23's R2-01-07. The `--glass-backdrop` bucket's surviving role is decided per family.
3. **One instrument.** The rendered-contrast battery (§7) reads painted pixels. No gate reads token arithmetic (P-3).
4. **The level-0 escape stays `--glass-level: 0` → solid `--card`**, and PRT and FC ride it. PCM rides level 0.3 today and moves no ink (F-24 R3-02-11), so each family's ink answer includes a PCM arm. F-75's aurora PRT lift is an interface to the aurora wave.
5. **The field well is a rung of the family's ladder** (F-31), never an opaque token. `--input-on-glass` (`on-glass-fg.css:37`, `dark-arm.css:303`) retires with no alias.
6. **Consumer overrides retire with the cure, by E-6 addendum:** chicago's 0.62 tier floor, fourier's `.glass-opaque` Configurator escape, and the GLASS-VEIL-GREY honest-RED rows in value.js, keyframes and fourier.

## 3 · Axes, and where each family sits

| axis | D3-A ground pole | D3-B field signal | D3-C cascade ink | D3-D calibrated ladder | D3-E self-grounded ink | D3-F yielding field |
|---|---|---|---|---|---|---|
| what the veil is | the theme's ground (`--card`) painted at a bounded α | the same pole at an α solved per tile at runtime | a thin frost toward the pole; the composite is declared | whatever the solver emits (pole, α, blur, saturate) | a thin frost; legibility is not the veil's job | a thin frost; the field itself is compressed under the glass in OKLab |
| where ink is derived | static tokens against the bound | static tokens; the veil moves to meet them | in CSS, by relative colour syntax against the declared composite | the solver's output over rendered pixels | static, against its own ground (a stroke or halo, and two-tone indicators) | static, against the band the field guarantees |
| who owns the backdrop's luma | nobody: a bound | the substrate publishes per-tile statistics | the page declares a ground colour, and a substrate publishes its own | the reference corpus | nobody: the glyph carries its ground | the substrate controls it under registered glass |
| how the themes relate | one law; the theme picks the pole | one law | one law; the theme picks the solve direction | two solved ladders from one objective | one law | one law; the theme picks the well's pole |
| what the live dock plate reads | the chrome bound: no luma | the tiles under its rect | the ground published under it | the chrome solution | nothing | nothing: the field yields under its rect |
| how it is verified | the battery over hostile grounds | the battery plus the latency of the publication | the battery plus the model error (declared vs painted) | the battery *is* the solver | the battery on glyph rings | the battery plus a no-spill check outside rects |
| round-0 prototype | ran (CSS tokens) | spec only (HEAD sampler plus CPU-mirror baseline) | ran (CSS, with an emulated per-tile publication) | spec only (this seat's harness is its instrument) | ran (halo and stroke variants) | emulated (the well painted into the frozen field) |

## 4 · The families

### D3-A · The ground pole (paint toward the card; a bound, no signal)

**Charter.** The veil is the theme's own ground, `--card`, at α. In light it lifts toward cream paper, which makes it a frost. In dark it lifts toward the dark card (L 0.295), so plates separate from the page. There is one line from the thinnest rung to the opaque escape: level 0 is α = 1 on the same mix, not a second recipe. Each rung's α comes from an analytic bound over the backdrops its band may face:
- **The chrome band** (floating, overlay, dialog, the dock) takes the bound that holds muted AA over its declared worst case.
- **The content band** takes the bound over the fields the library itself ships.

Nothing samples, nothing publishes, and the live channel is deleted.

**Center:** a guarantee that needs no signal. **Optimizes:** zero runtime cost; identical in every engine, because it is paint only; nothing can fail to arrive, so E-2 has nothing to mask.

| problem | answer |
|---|---|
| 1 | **Prototype** `proto/A-pole.css`: light α .40/.52/.64/.76/.88, dark .48/.56/.64/.72/.80, dock at the floating rung. Over paper every level composites to L 0.975-0.981, ΔE paper 0.008-0.015 (HEAD 0.039-0.142), `#fcf8f2` … `#fef5ee`. The dark plates separate from the page by ΔE 0.074-0.122 (HEAD 0.005-0.011) at L 0.219-0.267 |
| 2 | Ink stays static and is honest against the bound. Prototype over ceiling-1 aurora (light): muted 2.84 / 3.31 / 3.88 / 4.49 / 5.29 up the ladder, fg ≥ 7.56. Over the 8 px checker: 2.97-5.32. Over black: overlay 4.62, wash fg 2.88. Dark over ceiling 1: fg 5.63-8.39, muted 3.62-5.44. **Open (1):** the content band cannot hold both W-FROST's σ ≥ 80% (α ≤ 0.20) and muted AA over a field: the bound needs α ≈ 0.76 over the ceiling-1 field's p01 and 0.87 over black (`solve.mjs`). A must rule either that the content band carries the chrome bound (frosted paper everywhere) or that muted ink is not seated on content glass over a field, and D-2 and F-31 have to accept that ruling. **Open (2):** the perimeter reads 2.54-3.00 over the aurora and 2.39-2.91 over black at the prototype α. The rung (0.48, the 3.0 floor on tokens) must be re-derived against the bound composite, or take D3-E's two-tone edge |
| 3 | The dock is chrome and takes the chrome bound: tab 16.08 (light) and 7.83 (dark) over ceiling 1, where HEAD reads 7.48 and 2.69. Nothing is sampled, so `backdropMode` collapses to glass or opaque (level 1 or 0), `backgroundCanvas` is deleted, and the sampler's 746 lines, the knee, `--glass-backdrop-luma` and the clamp go. F-50's 120 idle rAF/s on every live dock goes with them. chicago's floor (0.62) sits below the prototype dock's .76 |
| 4 | **Ladder:** `α(level)` from the bound per band, one step arithmetic kept (`base ± n·step`). Blur is freed from legibility, so it can step back toward F48's subtler radii without cost to ink, and 20-22 px only buys the luminance half of chrome calm (§2.4). Saturate is one value. The well is the card pole one tone toward ink (`--glass-well-tone`) at the chrome α, transmissive. The offsets (dock, dialog, sheet, crown, chassis) stay integer steps. O-61: floor row 1 |

```css
/* D3-A · load-bearing: one mix from the thinnest rung to the opaque escape; no luma term, no second ink axis */
:root       { --glass-veil-pole: var(--card); --glass-veil-base: 0.64; --glass-veil-step: 0.12; }   /* light: bound-derived */
:root.dark  { --glass-veil-base: 0.64; --glass-veil-step: 0.08; }                                  /* the pole follows --card */
@utility glass-plate {
  --glass-veil-alpha: calc(1 - (1 - var(--glass-veil-tier, var(--glass-veil-resting))) * var(--glass-level));
  background: color-mix(in srgb, var(--glass-veil-pole) calc(var(--glass-veil-alpha) * 100%), transparent);
}
```

**Engines.**
- **Measured:** paint-only compositing agrees within 1/255 per channel between Chromium 149 and Playwright WebKit 26.5 over paper.
- **Cited:** `color-mix()` Chrome 111 / Safari 16.2 (BCD).
- **Unmeasured on Safari:** the blur and saturate legs. A backdrop-filter substrate variant (a tone map with no paint) is recorded in §5 and needs a real Safari cell.

**Cost (estimate).**
- **Deletes:** the 746 sampler lines, the clamp in `veil.css`, the knee (`glass-fx.css`), `--glass-backdrop-luma` (`property-regs.css:169-172`), the `GlassDock.vue:118-133` wiring and the ink axis.
- **Edits:** `tokens/glass.css`, `dark-arm.css` (two lines), `shell.css:146-148`, `adaptive-legibility.css`, `on-glass-fg.css` (inks re-derived against the bound), and the perimeter rung.
- **Net:** about −800 / +60 lines.
- **Public API:** `backgroundCanvas` goes; `backdropMode` narrows to `"glass" | "opaque"`, with no alias.

**Consumer impact.**
- chicago deletes its tier floor.
- fourier can retire the `.glass-opaque` Configurator escape: floating over paper reads muted 6.13.
- keyframes deletes the `ChromeDock` binding.
- value.js and fourier's GLASS-VEIL-GREY rows turn green.

**Known risks.**
1. Content glass stops transmitting: σ = 1 − α ≤ 60%.
2. Over paper the light plates are nearly invisible (ΔE ≤ 0.015), so their identity rests on rim and shadow alone.
3. Over a photo grid (chicago), only the any-input bound holds, and it is near opaque for muted.
4. The dark card pole reads brown over saturated reds (UIA-V-198; prototype `#6d321f` at floating over ceiling 1).
5. It is recognisably 7.0.0's recipe with derived rather than hand α. The owner asked to cure the grey, not necessarily to return.

### D3-B · The field signal (the substrate publishes; the veil adapts)

**Charter.** Every field the library paints publishes the luminance statistics under each glass surface, from the GPU that drew it. A static page publishes its ground once. Each surface's α is solved in CSS from the worst published luma under it: thin over calm tiles, thick over busy ones. The ink stays static per theme, and the veil moves to meet it. This is the registry's own wave shape (F-47 round 2, F-50), kept as one family among six.

**Center:** an adaptive minimal veil, with the substrate as the owner of the signal. **Optimizes:** maximum transmission wherever the field allows it.

| problem | answer |
|---|---|
| 1 | The pole is `--card`, as in D3-A. Over paper the page publishes its own ground (L 0.985), so the solve returns the rung's floor α and the plates are a light frost at the thin end |
| 2 | Ink is static. The solve guarantees the composite's luminance at the published low percentile. From the measured field (`solve.mjs`): a light dock over the ceiling-1 field needs α .76 at its p01 tile (L 0.617) and .445 at an L 0.80 tile. A dark dock needs α .28-.60 across the same tiles, and near 0 over the dark page. The perimeter solves the same way at 3:1. **Open:** tile statistics are not the pixels under a glyph. The low percentile per tile bounds the error, and its size is a pass-1 number |
| 3 | The dock subscribes to the tiles under its rect. `data-backdrop-sample-state` becomes `published` with a value, and no DOM readback exists. **Open:** over content that is not a library substrate (chicago's photos, fourier's own canvas) nothing publishes. B needs a declared publication for such regions, or the ceiling α, and whether that ceiling is a guarantee or a masking fallback under E-2 is a critique question |
| 4 | **Ladder:** each rung becomes an α pair, (floor, ceiling). The knee and clamp (`veil.css:57-82`) are replaced by the solve. Blur and saturate are per level as in A. Well and offsets as in A. O-61: floor row 1 |

```ts
// D3-B · load-bearing (substrate side, inside the engine's own frame; the canvas is never read from outside)
reducePass.dispatchWorkgroups(TILES_X, TILES_Y);                 // per tile: mean, p10, p90 luma of the frame it just drew
encoder.copyBufferToBuffer(stats, 0, readback, 0, STATS_BYTES);
device.queue.submit([encoder.finish()]);
readback.mapAsync(GPUMapMode.READ).then(() => {                  // asynchronous: 1-2 frames of latency, no main-thread block
  fieldBus.publish(new Float32Array(readback.getMappedRange()).slice()); readback.unmap();
});
// surface side: one shared registry reads the tiles under each registered rect
fieldBus.subscribe(el, ({ lo }) => el.style.setProperty("--field-luma-lo", lo.toFixed(3)));
```

```css
@utility glass-plate {   /* α that lifts the worst published tile to the ink's need; floor and ceiling per rung */
  --need: calc(var(--ink-target) * (var(--ink-y) + 0.05) - 0.05);
  --glass-veil-alpha: clamp(var(--glass-veil-tier),
      calc((var(--need) - var(--field-luma-lo, 1)) / (var(--glass-pole-y) - var(--field-luma-lo, 1))),
      var(--glass-veil-ceiling));
  background: color-mix(in srgb, var(--glass-veil-pole) calc(var(--glass-veil-alpha) * 100%), transparent);
}
```

**Engines.**
- **Cited:** WebGPU `requestAdapter` and `GPUBuffer.mapAsync` in Chrome from 113 (partial; macOS, Windows, ChromeOS) and fully from 144, and in Safari 26 (BCD). Registered custom properties Chrome 85 / Safari 16.4.
- **Measured:** Playwright WebKit exposes no `navigator.gpu`. Its aurora runs the GL arm, so B's GPU half cannot be exercised there. The CSS solve is plain `calc()`/`clamp()`.
- The mix happens on sRGB-encoded channels (§1.5), so α → Y is not linear. The Y-linear solve above is an approximation whose error is a pass-1 number.

**HEAD reading it leans on.**
- §1.4: 37 of 37 readbacks at alpha 0; `source-unavailable` on every consumer dock.
- §2.5: the CPU mirror, median ΔE 0.012, p90 0.062, is a zero-GPU publication for the static field.

**Cost (estimate).**
- **Depends on:** W-ONE-ENGINE (F-47) for the reduction.
- **Adds:** a field bus and registry of about 150 lines.
- **Deletes:** the sampler's 746 lines, replaced.
- **Per publication:** a style write per subscribed surface, throttled to change > ε.

**Consumer impact.**
- value.js's atmosphere and keyframes' aurora are library substrates and publish for free; keyframes' `ChromeDock` binding goes.
- fourier's visualization canvas and chicago's DOM photos need a public `declareField()` or a declared band: new API, by E-6 addendum.

**Known risks.**
1. The tile low percentile against the glyph's own pixels.
2. Latency: a moving field and an α transition open a window where contrast dips.
3. The WebGPU canvas's alpha/premultiply configuration on Safari.
4. Restyle cost scales with the number of surfaces.
5. Two luma owners if a page also declares.
6. E-2's reading of the unpublished state.

### D3-C · The cascade ink (a declared composite; ink solved in CSS)

**Charter.** The library cannot read a composite, but it can declare one:
- Every glass scope carries `--glass-ground`, a registered `<color>`. The page declares its ground, a library substrate publishes its mean colour, and a consumer declares its own backgrounds.
- Each plate computes `--glass-composite`, the same mix the browser paints.
- Every ink rung (fg, muted, perimeter, ring, state fill) is a relative-colour solve against that composite: the lightness that meets the rung's target ratio. The fg rung is capped at its token, so a calm ground keeps the brand ink.

The veil stays a thin frost toward the card.

**Center:** the ink is derived in the cascade. **Optimizes:** E-5, since a consumer preset that retunes `--card` or `--background` gets correct ink without a table. It also retires `contrast-color()` and the on-glass token table.

| problem | answer |
|---|---|
| 1 | Thin card-pole frost (prototype light α .10-.30, dark .12-.36). Over paper ΔE 0.004-0.007, L 0.980-0.985 |
| 2 | **Prototype** `proto/C-cascade.css`, with the publication emulated per plate from the raw capture. Light over ceiling 1: muted 4.32-4.91, fg 6.49-7.21, perimeter 3.00-3.37. Light over paper: muted 4.79-4.87; the register sits at its target instead of 4.07-5.62. Dark over ceiling 0.5: fg 7.49-8.20, muted 4.45-4.72. **Model error:** the declared composite against the painted one is ΔE ≤ 0.006 over paper and 0.017-0.055 over the aurora. That is the `saturate(1.5)` leg the model leaves out, and it costs up to 10% of ratio on saturated grounds (4.32 against a 4.8 target). **Open:** when the composite is mid-luminance, no ink can clear. Dark over ceiling 1, fg reaches white at 4.08-5.25, and muted converges on it (4.00 against 4.08 at wash), so the hierarchy collapses into one ink. C alone leaves that cell to a veil floor from another family |
| 3 | The dock's ink is solved from the ground published under it, with no readback in the surface. A config-derived publication is available today (§2.5; one colour per scope). **Open:** a photo grid has no single ground colour, and a declared one lies |
| 4 | **Ladder:** α is thin and static. The composite formula carries the level, `color-mix(in srgb, pole calc((1 − (1 − α)·level)·100%), ground)`. Saturate either enters the model or drops to 1 so the model is exact (a pass-1 choice). Well and offsets are thin rungs. O-61: floor row 1 |

```css
/* D3-C · load-bearing: the ink is a function of the declared composite (OKLab l³ ≈ Y), capped at the brand token */
@property --glass-ground { syntax: "<color>"; inherits: true; initial-value: transparent; }
:where(.glass-wash, .glass-quiet, .glass-resting, .glass-card, .glass-floating, .glass-overlay, .dock-plate) {
  --glass-composite: color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-veil-rung)) * var(--glass-level)) * 100%),
                               var(--glass-ground, var(--background)));
  --muted-foreground: oklch(from var(--glass-composite) calc(pow(max(0, (pow(l, 3) + 0.05) / 4.8 - 0.05), 1 / 3)) 0.04 60);
  --foreground:       oklch(from var(--glass-composite) min(0.235, calc(pow(max(0, (pow(l, 3) + 0.05) / 7.5 - 0.05), 1 / 3))) 0.012 60);
}
:root.dark :where(…) { /* the same rungs, solved upward: pow(min(1, T·(l³ + 0.05) − 0.05), 1/3) */ }
```

**Engines.**
- **Measured:** Chromium 149 and Playwright WebKit 26.5 compute the solve from a `color-mix()` origin through a `var()` chain to the same l (0.29476 against 0.294756; `p7-rcs.mjs`). `contrast-color()` is binary in both.
- **Cited:** RCS `oklch()` Chrome 122 / Safari 18; `pow()` Chrome 120 / Safari 15.4; `@property` `<color>` Chrome 85 / Safari 16.4 (BCD).
- **Unmeasured:** the cascade cost of a relative-colour chain on every text node; the Safari nested `color-mix` hole (`tokens/glass.css:155-159`) against an RCS origin on real Safari.

**Cost (estimate).**
- **Replaces:** `on-glass-fg.css` and its dark arm with formulas; the perimeter rung in `control-bit.css`.
- **Deletes:** the bright bucket and `contrast-color()` blocks in `ladder.css`; `adaptive-legibility.css`'s ink half; the sampler.
- **Adds:** a ground publisher: a `:root` declaration, plus one colour per substrate scope.
- **Net:** about −900 / +150 lines.

**Consumer impact.**
- Consumers declare `--glass-ground` on scopes with their own backgrounds: fourier's visualization, chicago's photo band.
- A consumer that sets `--muted-foreground` on a glass scope is overridden by the solve (E-6).
- keyframes' binding goes.

**Known risks.**
1. The l³ ≈ Y approximation and the filter leg; the prototype landed 4.32-4.91 against a 4.8 target.
2. Declared grounds lie over images.
3. The hierarchy compresses on mid grounds.
4. Per-node relative-colour cost.
5. An override of `--foreground` inside glass now fights a formula.

### D3-D · The calibrated ladder (a rendered solve generates the tokens)

**Charter.** The ladder is solved, not authored.
- **The corpus:** paper in both themes; every shipped aurora preset at ceilings 1 and 0.5; the blob hero; the hostile grounds (black, white, checker, stripes); and consumer fields contributed by their owners.
- **The harness:** a calibration harness renders the real ladder specimens over the corpus in Chromium, WebKit and, once enabled, real Safari.
- **The solve:** per level and per theme, it solves the pole α, the blur radius, the saturate term and the ink rungs as a constrained optimisation. It maximises transmission subject to the shared battery (§7): no grey, rendered contrast on glyph rings, the perimeter, ladder separation, and chrome calm, with F48's subtler blur as an upper bound.
- **The output:** `tokens/glass.solved.css` (numbers only). The solver and the corpus are the source of record, and the same harness, unmodified, is the gate.

The two themes are two solutions of one objective, not one law with a switch.

**Center:** empirical, blur-aware and engine-measured.

**What it buys over D3-A.** Blur narrows what the ink sees: L deviation under the resting plate over ceiling 1 falls from 0.0120 raw to 0.0069 under blur alone (−43%), and the corpus band is narrower than any-input. So the solve buys transmission A's analytic bound cannot. The price is that the guarantee covers only the corpus.

| problem | answer |
|---|---|
| 1 | The solver's M-1 constraint forbids grey outright |
| 2 | The ink rungs are solver outputs, measured on painted glyph rings in every corpus cell and engine. **Open:** content outside the corpus |
| 3 | The dock is solved as chrome over the corpus, so its α is static and the sampler goes. **Open:** as for A, photos outside the corpus |
| 4 | Every per-level parameter is emitted. Offsets are solved as their own rows. The well is a rung. O-61: floor row 1 |

```js
// D3-D · load-bearing: the least α that holds the battery on every corpus field, per theme and level
for (const theme of THEMES) for (const level of LEVELS) {
  const radius = blurFor(level, { bleedMax: 1.25, ceiling: F48_SUBTLE[level] });          // calm vs the owner's subtlety
  const alpha  = bisect(0, 1, (a) => CORPUS.every((field) =>
      battery(render({ theme, level, alpha: a, radius, field }), { engines: ENGINES }).green));
  emit(theme, level, { alpha, radius, saturate: SATURATE, inks: solveInks(theme, level, alpha) });
}
write("src/styles/tokens/glass.solved.css", tokens);   // generated; nobody edits it by hand
```

**Engines.**
- **Measured:** this seat's harness is D's instrument, and it ran in Chromium 149. Playwright WebKit paints no `backdrop-filter` headless, so the WebKit leg is paint-only until real Safari runs (§1.5). Mounting `GlassDock` crashes Playwright WebKit, so the dock rung cannot be calibrated there.

**HEAD reading it leans on.** Taken as a solver candidate, the HEAD ladder fails M-1 on 9 of 9 plates, and fails M-2, M-3 and M-6 (§7).

**Cost.**
- **Adds:** an in-repo harness and solver of about 500 lines; a corpus of PNG fixtures; CI time of 46-52 s per six cells (under load 24-44 here).
- **E-7 and E-8:** one site, one gate.
- **P-3:** the token file is derived data with a named source of record.

**Consumer impact.** At runtime, the same as A: token-level. Consumers may contribute fields to the corpus, by addendum.

**Known risks.**
1. Overfitting to the corpus.
2. Non-deterministic GPU rendering across machines.
3. The headless WebKit gap.
4. An owner's hand edit to a generated file.
5. A solver that wants more blur than F48 allows.
6. A second instrument is needed to prove the solver itself can go red.

### D3-E · The self-grounded ink (legibility at the glyph; the plate stays thin)

**Charter.** Legibility is bought at the glyph, not the plate. The plate is a thin frost that transmits the field. Every ink carries its own ground:
- **Text** paints a `--card`-coloured stroke beneath its fill (`paint-order: stroke fill`), or a halo.
- **Every non-text indicator** (perimeter, focus ring, selection edge) is two-tone: an ink band flanked by pole bands.

So each contrast pair is ink against its own ground, known statically, whatever lies behind.

**Center:** grounds local to the glyph; no signal and no floor on the plate. **Optimizes:** the glass reads as glass: α ≤ 0.30, the field visible.

| problem | answer |
|---|---|
| 1 | Thin card-pole frost (prototype light α .10-.30, dark .12-.36). Over paper: ΔE 0.004-0.007, L 0.980-0.985 |
| 2 | **Prototype E′** `proto/E-stroke.css`, a 4 px card stroke under the fill, 1 px ring: light muted 5.37-5.83 over black, white, the checker and ceiling-1 aurora, and 5.74-5.83 over the stripes, with fg 11.0-14.5. Dark muted 4.53-5.47 over the checker, aurora and stripes, but 2.56-3.33 at p05 over white (median 7.21). **Halo variant** `proto/E-halo.css` (five text shadows): weaker, light muted 1.36-3.80 at p05. **Two-tone perimeter:** 5.56-16.39 over the aurora and hostile grounds (HEAD 1.00-3.07), except 2.98 over white in light, where the pair is the perimeter rung against the card pole: the rung itself must rise. **Open:** the owner's taste. At 4 px the stroke reads as sticker lettering (`cap/montage-E-stroke.png`) and the halo reads as glow; neither is iOS 27's vibrancy |
| 3 | No luma, no sampler. The dock's labels carry their ground: the halo prototype's dock tab reads 11.70 light and 4.17 dark over ceiling 1 on the 3 px ring |
| 4 | **Ladder:** thickness only (blur, thin α); the ink ground is one inherited declaration on the plate. **Open:** chrome calm (M-8). The thin chrome plate keeps hue bleed at C 0.0788 over the stripes (HEAD 0.0915), so UIA-F-122, UIA-KF-252, -268 and UIA-V-297 stay open unless the chrome band borrows a second mechanism. O-61: floor row 1 |

```css
/* D3-E · load-bearing: both properties inherit, so one declaration on the plate grounds every glyph inside it */
:where(.glass-wash, .glass-quiet, .glass-resting, .glass-card, .glass-floating, .glass-overlay, .glass-dock) {
  --glass-ink-ground: var(--card);
  -webkit-text-stroke: var(--glass-ink-ground-width, 3px) var(--glass-ink-ground);
  paint-order: stroke fill;
}
/* the indicator carries both poles: ink band inside a ground band, so ≥ 3:1 holds against the band, not the field */
:where(.focus-ring):focus-visible { outline: 2px solid var(--ink-perimeter-color); box-shadow: 0 0 0 4px var(--glass-ink-ground); }
@media (forced-colors: active) { :where(.glass-wash, …) { -webkit-text-stroke: 0; } }
```

**Engines.**
- **Measured:** `paint-order: stroke fill` and `-webkit-text-stroke` paint the fill over the stroke in Chromium 149 and Playwright WebKit 26.5 (§1.5).
- **Cited:** `paint-order` Chrome 123 / Safari 11; `text-shadow` everywhere (BCD). SVG icons take `paint-order` natively.

**Cost (estimate).**
- **Adds:** about 40 lines of CSS.
- **Deletes:** the sampler; the bright bucket; `contrast-color()`; the on-glass ink table, since muted re-derives against the card).
- **Perf:** a stroke doubles glyph rasterisation, and halos blur per glyph. At scale this is unmeasured.

**Consumer impact.** All consumer text on glass changes appearance. A consumer `text-shadow` collides. Small text (≤ 12 px) loses its counters to the stroke. keyframes' binding goes.

**Known risks.**
1. The aesthetic, which is an owner decision.
2. Small text.
3. The selection highlight, emoji and colour fonts.
4. The stroke must vanish under FC and print.
5. Chrome calm stays open.

### D3-F · The yielding field (the substrate carves a well under registered glass)

**Charter.** The library's own substrates know their pixels, so the direction of information reverses: surface → field.
- Glass surfaces register their rects, and a depth per level, with the substrate.
- Inside each rect, behind a feather, the substrate compresses its own OKLab lightness toward the theme's band. It keeps hue and as much chroma as the gamut allows.
- The glass stays a thin frost. Its ink is static, and valid by construction, because the substrate guarantees the band under it.
- Nothing is read back.

**Center:** the field is the variable and the glass is the constant.

| problem | answer |
|---|---|
| 1 | Thin card-pole frost, as in C and E, over paper |
| 2 | **Emulated** (`well.mjs` paints the well into the frozen field: light pole 0.97, gain 0.22; dark pole 0.22, gain 0.36; 18 px feather). Light, α .10-.30: muted 4.60-5.15, fg 12.24-13.71 (HEAD 1.47-1.96 and 3.86-5.11). Dark: fg 7.71-8.73, muted 4.95-5.64. Composite C 0.047-0.059 at L 0.887-0.929, **no more chroma than D3-A at equal L** (§2.3). Perimeter 2.92-3.00 light, so the rung must rise |
| 3 | The dock registers its rect and the field yields under it in both themes. There is no luma and no sampler. **Open:** over anything that is not a library substrate (chicago's photos, fourier's canvas, page text lying between field and glass) nothing yields. F needs another family's answer there |
| 4 | **Ladder:** thin α and blur; the level sets the well's depth. The theme-blind aurora (F-24) can be re-toned at the same site. O-61: floor row 1 |

```wgsl
// D3-F · load-bearing (the substrate's final pass): compress lightness inside each registered glass rect
for (var i = 0u; i < u.rectCount; i++) {
  let w   = wellWeight(fragPx, u.rects[i], u.feather);             // 1 inside, falling to 0 across the feather
  let lab = linearSrgbToOklab(col);
  let L   = mix(lab.x, u.pole + u.gain[i] * (lab.x - u.pole), w);
  col     = oklabToLinearSrgbChromaClamped(vec3(L, lab.yz));        // hue kept; chroma cut only to fit the gamut
}
```

```ts
useFieldWell(el, { depth: "floating" });   // ResizeObserver plus the dock's own morph writes; ≤ 16 rects in one uniform block
```

**Engines.**
- **Cited:** WGSL on WebGPU (Chrome 113+, Safari 26) and GLSL on the GL arm (BCD).
- **Measured:** only the optics, by emulation. The well is not rendered by any engine yet.

**HEAD reading it leans on.** The substrate knows no glass. The field under the ceiling-1 plates reaches L 0.617 at p01 (§2.1).

**Cost (estimate).**
- **Adds:** a rect registry of about 120 lines, and uniforms plus a well function in each substrate shader (aurora WGSL and GLSL, blob, constellation).
- **Couples:** every moving glass surface (dock morph, sheet detents, popovers) must re-register per frame while it moves.
- **Deletes:** the sampler.

**Consumer impact.**
- value.js and keyframes get the well free on library fields.
- fourier and chicago get nothing where their own content lies behind glass.
- keyframes' binding goes.

**Known risks.**
1. **Spill.** The emulation shows a lifted halo 18 px around each plate (`cap/montage-light-aurora.png`, the F tile), so the feather must sit inside the rect.
2. **Motion lag.** A one-frame lag between the DOM rect and the substrate frame lets the well trail a moving dock (D-1).
3. **Overlap.** Overlapping or nested glass.
4. **Multiple substrates.** Several on one page.
5. **The field responds visibly to glass.** That may read as intent or as a defect.

## 5 · Considered and not minted

| id | formulation | ruling |
|---|---|---|
| D3-X1 | **The tone-map frost.** No paint; the plate is a `backdrop-filter` chain that compresses toward a pole: light `invert(1) brightness(g) invert(1) saturate(s)`, dark `brightness(g) saturate(s)` | **Merged into D3-A as a substrate sub-choice, by measurement.** Filter and compositing math are both affine on sRGB-encoded channels (§1.5), so the legibility bound is A's. The chroma-retention hypothesis measured false at equal gain over ceiling 1: tone map wash C 0.142 against pole paint 0.147, resting 0.076 against 0.086 (`proto/F-tonemap.css`). What remains is the pole: white or black instead of the card, which whitens paper (C 0.001-0.003) and loses its warmth. Playwright WebKit cannot paint it (§1.5). Re-trigger: a real Safari cell that shows a chroma difference, or an owner preference for the black/white pole |
| D3-X2 | **The surface samples its backdrop** (HEAD's route) | No web API exposes a composited backdrop to script. A WebGPU canvas reads back alpha 0 (37 of 37), and a `drawImage` + `getImageData` blocks the loop (F-50). Re-trigger: a cross-engine backdrop-readback primitive (none ships) |
| D3-X3 | **Vibrancy ink by blend mode** (`plus-darker` in light, `plus-lighter` in dark) | `plus-darker` is unsupported in Chromium (BCD; `CSS.supports` false in Chromium 149, true in Playwright WebKit), which fails D-4. A relative blend also guarantees no ratio |
| D3-X4 | **`contrast-color()` as the ink** | Binary black or white at Level 5 (measured in both engines); this is F-23's R2-01-07 mechanism. Re-trigger: a shipped `contrast-color()` with a target ratio (CSS Color 6) in both engines |
| D3-X5 | **A declared role split.** A scope bit (`--glass-backdrop: field / paper`) selects a floor arm only over fields | Collapses into D3-A. A's floor costs nothing over paper (light ΔE ≤ 0.015; dark gains separation), so the bit buys nothing A lacks. Style queries never self-match (`adaptive-legibility.css:21-24`) |
| D3-X6 | **Two hand-authored ladders**, one per theme | HEAD's disease: hand α with no rendered check. The two-ladder axis lives in D3-D, as two solved outputs |

## 6 · Pass-1 research questions

### D3-A
1. What α does the chrome bound need over a real photo corpus (chicago's lot photos, value.js swatches)? What does the content band need over ceiling 0.5? Is a content α ≤ 0.64 defensible, and on which routes does muted text sit on content glass over a field at all?
2. Does the perimeter rung re-derived against the bound composite (≥ 3:1 on painted pixels over the aurora and black) read heavier than the owner's "subtle" register? Compare it with D3-E's two-tone edge on the same controls.
3. With legibility carried by α, what blur ladder does F48 want? Capture 1/7/7/11/11, HEAD's 10/14/16/20/22, and a midpoint over the stripes fixture (M-8's luminance half), with paired π.
4. Dark: a card pole (brown, L 0.295) or a deep pole (the page, L 0.146)? Measure UIA-V-198's red ground, plate separation from the page, and fg over ceiling 1.
5. Real Safari: do the paint-only composites match Chromium's, and do the blur and saturate legs change M-2 there?

### D3-B
1. What does a compute reduction of the aurora's own frame cost per frame on an M-class GPU and on an integrated one? What latency does `mapAsync` add on Chrome and Safari 26?
2. How far is the per-tile p10 from the glyph-ring p05 under a dock over the moving field, at 8×8, 16×9 and 32×18 tiles?
3. How large is the Y-linear solve's error when the mix runs on sRGB-encoded channels? Is a lookup (α → Y per pole) needed?
4. What publishes for DOM content (photos, video)? Does a `declareField()` API survive E-2 and E-7, or does the unpublished state take the ceiling?
5. Can the CPU mirror (§2.5, p90 ΔE 0.062) serve as the static publication until W-ONE-ENGINE lands, and what does the drift add?
6. What does per-surface restyle cost at 12 docks (the `/dock` demo) at 30 and 60 Hz publication?

### D3-C
1. What is the ratio error of the l³ ≈ Y solve across the palette gamut, and does a closed form in `oklab()` channels do better?
2. Should `saturate()` enter the composite model, or should saturate drop to 1 so the declared composite is exact (model error 0.017-0.055 today)?
3. Where the composite is mid-luminance and no ink clears (dark over ceiling 1), does C accept a veil floor from A or B, or a hierarchy by weight and size instead of by lightness?
4. What does a relative-colour chain on every text node inside glass cost in style recalc, on Chrome and Safari, at the demo's largest route?
5. On real Safari, is an RCS whose origin is a `color-mix()` inside a `var()` chain exact? This is the nested color-mix hole at `tokens/glass.css:155-159`.
6. How should a consumer declare a ground for a photo grid, and should it?

### D3-D
1. Is the solve well-posed? Is the transmission objective monotone in α and blur, so bisection is sound? Where do M-2 and M-8 conflict?
2. How deterministic is headless GPU rendering across machines? What tolerance does the gate need, and can the solver itself go red (P-3)?
3. Which corpus fields are licensed and representative: consumer contributions, the O-59 capture frames?
4. What is the WebKit plan while headless paints no `backdrop-filter`: real Safari through safaridriver as the second engine?
5. What CI cost is acceptable under E-8's 40-60 gates?

### D3-E
1. Which stroke width and colour read as material rather than sticker at 12, 14 and 16 px? Is a 1.5 px ground with a soft 2 px halo enough for muted at p05 on black and white? Capture it for an owner glance.
2. Does `-webkit-text-stroke` change glyph metrics, hinting or subpixel positioning on Safari? Does it interact with `font-optical-sizing` or variable weights?
3. What does a stroke on every glyph cost to rasterise, on a text-dense route with a live aurora?
4. How does chrome stay calm (M-8) without a thicker veil, and is a chrome-band veil a second mechanism that breaks the family?
5. How do selection, emoji and SVG icons (via `paint-order` on paths), and the FC and print arms, behave?

### D3-F
1. Can the feather sit wholly inside the rect with no visible seam at the plate edge under blur?
2. What latency does registering a rect add, from DOM to uniform to frame, during a dock morph? Does the well lead or trail at 120 Hz?
3. How does the well compose for overlapping and nested glass, several substrates, and page text lying between field and glass?
4. What is the shader cost per rect on the aurora and blob engines? What is the uniform bound (16 rects)?
5. Can the same site cure F-24's theme-blind aurora, a global re-tone per theme?
6. For non-substrate backgrounds, which family's answer does F adopt, and does that make F a second mechanism?

## 7 · The approach-family registry and the born-RED witnesses

| id | family | mechanism | center | round-0 status |
|---|---|---|---|---|
| D3-A | the ground pole | the veil is `--card` at an α set by an analytic bound per band; one mix from the thinnest rung to the opaque escape; the live channel deleted | a bound without a signal | minted; prototype ran |
| D3-B | the field signal | the substrate reduces its own frame to per-tile luma on the GPU and publishes it asynchronously; each surface's α is solved in CSS from the tiles under it; ink static | an adaptive veil, the substrate owning the signal | minted; spec only |
| D3-C | the cascade ink | every scope declares its ground colour; each plate declares its composite; every ink rung is a relative-colour solve against it; the veil thin | the ink derived in the cascade | minted; prototype ran (publication emulated) |
| D3-D | the calibrated ladder | a rendered solve over a reference corpus in real engines emits the ladder and the inks; the harness is the gate | an empirical solve, generated tokens | minted; spec only (this seat's harness is its instrument) |
| D3-E | the self-grounded ink | every glyph carries a pole-coloured stroke or halo, and every indicator is two-tone; the plate is a thin frost | legibility at the glyph | minted; prototype ran |
| D3-F | the yielding field | glass registers its rects; the substrate compresses its own OKLab lightness under them; the glass stays thin, the ink static | the field as the variable | minted; emulated |
| D3-X1 | the tone-map frost | a `backdrop-filter` chain compresses toward a pole, with no paint | (A's bound, another substrate) | merged into D3-A by measurement |
| D3-X2 | the surface samples | a DOM readback of the backdrop | the sampling surface | not minted: no primitive; WebGPU reads alpha 0 |
| D3-X3 | vibrancy blend ink | ink by `plus-darker` / `plus-lighter` | the blend | not minted: Chromium lacks `plus-darker` (D-4) |
| D3-X4 | `contrast-color()` ink | a Level 5 black/white flip | the platform pick | not minted: binary (F-23) |
| D3-X5 | declared role split | a scope bit selects a floor arm | the context bit | not minted: collapses into A |
| D3-X6 | two authored ladders | a hand table per theme | the hand | not minted: HEAD's disease; the two-ladder axis lives in D |

**The shared battery.** Every family must turn M-1..M-8 green, or name the witness it leaves RED and why. All read painted pixels, in both themes, over paper, the aurora at ceilings 1 and 0.5, and the hostile grounds, in Chromium and in Safari once enabled.

| id | invariant | HEAD reading |
|---|---|---|
| M-1 | **No grey.** Over paper, every light level composites to L ≥ L_paper − 0.01 with ΔE_OK(composite, paper) ≤ 0.02 | RED on all 9 plates and the dock: L 0.844-0.947 against 0.985; ΔE 0.039-0.142; C 0.0056-0.0088 |
| M-2 | **Rendered text contrast.** On a 1 px glyph ring, p05 ≥ 4.5 for muted and for fg, every level, every ground | RED: light over ceiling 1, muted 1.47-1.96 and fg 3.86-4.63; dark over ceiling 1, fg 3.02-4.07; light over the checker, muted 1.37-1.53 |
| M-3 | **Non-text ≥ 3:1.** Perimeter and ring against the painted ground on both sides | RED: light paper 2.84-3.02; light over ceiling 1, 2.04-2.24; dark over ceiling 1, 1.70-1.96; black and white 1.00-1.20; Dialog Close 1.79 (R3-02-04, not re-measured on the real Dialog; the emulated dialog plate reads 2.86 on paper) |
| M-4 | **Dock ink keeps its register.** Dock muted ≠ dock fg (ΔL_OK ≥ 0.08), and neither is `#000` or `#fff` by construction | RED: both resolve `contrast-color(var(--card))` to `rgb(0,0,0)` in light and `rgb(255,255,255)` in dark |
| M-5 | **The live dock is legible without a DOM readback.** A default live dock over the WebGPU aurora clears M-2 in both themes with zero `getImageData` calls on the main thread | RED: `sample-unavailable`, 37 readbacks in 9 s at alpha 0, tab 2.69 in dark over ceiling 1 |
| M-6 | **A separable ladder.** Adjacent levels differ by ΔE_OK ≥ 0.01 over paper and over the dark page, and every plate separates from the dark page by ΔE_OK ≥ 0.05 | RED in dark: every level within 0.011 of the page, adjacent levels 0.002-0.005 apart |
| M-7 | **Halos whole.** A capsule (32 px shadow reach) seated 2 px inside the left edge of every content rung paints its full shadow | RED: `contain: paint` at `material.css:104-109` clips it (O-61 measured about 10 px) |
| M-8 | **Chrome calm.** Under floating, overlay and dialog text over the 24 px violet/yellow stripes, luminance p95/p05 ≤ 1.25 and composite chroma ≤ 0.04 | RED on chroma: floating 0.0915, overlay 0.0886, dialog 0.0912. The luminance half is green at 1.04-1.08 |

**Each family's own born-RED witness**, which proves its center rather than the symptoms:

| family | witness | HEAD reading |
|---|---|---|
| D3-A | **A guarantee with no signal.** With no writer of `--glass-backdrop-luma` in `src`, every chrome level clears M-2 over black and white and every content level over its declared band, and the tokens' α equal the bound's solution | RED: the chrome band leans on a luma clamp that never fires (luma 0), and floating over black reads fg 1.15, muted 3.06 |
| D3-B | **The substrate publishes.** On the WebGPU aurora, the dock reads a published luma within ±0.02 of the painted mean under its rect, updated within 2 frames of a field change, with zero synchronous readbacks | RED: 37 of 37 readbacks at alpha 0; `sample-unavailable`; `getImageData` in the loop |
| D3-C | **Ink follows the composite.** The muted glyph-ring p05 lies in [4.5, 5.5] on every level and ground, both themes, and follows a consumer retune of `--card` or `--background` with no token edit | RED: light paper 4.07-5.62 (under at overlay, loose at wash); light over ceiling 1, 1.47-1.96; a `--card` retune moves no ink |
| D3-D | **The tokens are the solver's output.** A clean solver run over the corpus reproduces `tokens/glass.solved.css` byte for byte, and the battery is green on every corpus cell in both engines | RED: no solver exists; α is hand-set (`tokens/glass.css:45-52`); the battery is red (above) |
| D3-E | **Every ink carries its ground.** On the 1 px ring, muted p05 ≥ 4.5 over black, white, the checker and the aurora at every level with plate α ≤ 0.30; every indicator ≥ 3:1 against the band on both sides | RED: muted over black 3.04-3.16 and over white (dark) 1.55; perimeter 1.00-1.20 over white (dark) |
| D3-F | **The field yields under glass.** With a glass rect registered over the substrate, the field's painted L under the rect lies in the theme band (light ≥ 0.876, dark ≤ 0.45) while 24 px outside it the field is unchanged (ΔE ≤ 0.005) | RED: the substrate knows no glass; L under the ceiling-1 plates reaches 0.617 |

## 8 · Sources

**Measured here** (scratch `D3/`):
- `p1-ladder.mjs` produces `head-chromium.json`, `head-webkit` (crash) and `img-*.json`; `p3-ring.mjs` produces `*-ring.json`.
- Captures are in `cap/`: `montage-light-aurora.png` and `montage-dark-aurora.png` (HEAD, A, E; C, F well, tone map), and `montage-E-stroke.png`.
- `p2-engine.mjs` covers engine facts; `p5-sampler.mjs` the live path; `p6-reach.mjs` the shadow reach; `p7-rcs.mjs` the RCS from a `color-mix()` origin; `p8-cpu-mirror.mjs` the CPU field mirror.
- `solve.mjs` holds the analytic bounds, and `well.mjs` the D3-F emulation.
- Prototypes: `proto/A-pole.css`, `B` (spec only), `C-cascade.css`, `E-halo.css`, `E-stroke.css`, `F-well.css`, `F-tonemap.css` (D3-X1).

**Engine support.** MDN browser-compat-data (raw JSON, read 2026-09-23):
- [`color`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/types/color.json) (`contrast-color`, `color-mix`, relative syntax, `light-dark`)
- [`pow()`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/types/pow.json)
- [`overflow-clip-margin`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/overflow-clip-margin.json)
- [`paint-order`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/paint-order.json)
- [`backdrop-filter`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/backdrop-filter.json)
- [`mix-blend-mode`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/mix-blend-mode.json)
- [`@container`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/at-rules/container.json) (style queries)
- [`@property`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/at-rules/property.json)
- [`text-shadow`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/text-shadow.json)
- [`GPU`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/GPU.json)
- [`GPUBuffer`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/GPUBuffer.json)
- [`@media`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/at-rules/media.json) (`prefers-reduced-transparency`: Chrome 118, Safari none)

**The record.**
- The W-FROST design of record: `docs/tranches/BK/execution/2026-08-03-row22-design/APOTHEOSIS-SPEC.md` §1 (the law), §3 (the rung table), §13 (the ratified defaults); landed at `4b1a9733`.
- The owner's blur ruling: `docs/tranches/BJ/FEEDBACK-LEDGER.md:82` (F48).
- The 7.0.0 tokens: `git show v7.0.0:src/styles/tokens/glass.css` (`--glass-opacity-*` .30/.50/.65/.80/.95, dock .50, radii 1/7/7/11/11) and `…/dark-arm.css` (.38/.58/.72/.88/.96).
