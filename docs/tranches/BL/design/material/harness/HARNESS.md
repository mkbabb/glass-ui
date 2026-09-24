# D3 · the glass material battery (harness)

| field | value |
|---|---|
| seat | D3 pass 1, BATTERY. Promotes the round-0 portfolio's scratch probes into the shared battery of `PORTFOLIO.md` §7 (M-1..M-8) and the six family witnesses (W-A..W-F) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | measured at `991067c8`, in a clean detached worktree (`srcDirtyFiles: 0` in `build.json`). `git diff --stat` over `src` is empty between `991067c8`, the brief's `9aa2b7f9` and `v10.0.1`, so every number measures the published 10.0.1 bytes, the same bytes the portfolio read |
| engines | Chromium 149.0.7827.55 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, WebGPU adapter present) and Playwright WebKit 26.5, both headless, Playwright imported from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| load | other seats ran on the machine. Load averages were 16-43 during the HEAD capture (68 cells and 8 live windows in 615 s) |
| scratch | `D3_OUT=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/harness/out` (builds, captures, selftest). The owner-glance PNGs sit one level up, in `…/D3/p1/harness/` |

**Provenance of the tooling.** The round-0 probes (`p1-ladder`, `p3-ring`, `p5-sampler`, `p6-reach`, `p7-rcs`, `p8-cpu-mirror`, `solve.mjs`, `well.mjs`, `proto/`) were gone from scratch when this pass ran; the /tmp wipe recorded at `f538a252` took them. What each one measured is carried forward from `PORTFOLIO.md` §1, §2 and §7, as follows:
- `p1-ladder` became `capture.mjs` plus the composite metric.
- `p3-ring` became `glyphRing`.
- `p5-sampler` became the live windows.
- `p6-reach` became M-7.
- `solve.mjs` became W-A's bound.
- `well.mjs` became the F fixture.

`p7-rcs` and `p8-cpu-mirror` measured engine facts, not invariants, so no witness carries them.

## 1 · What is here

| file | role |
|---|---|
| `lib.mjs` | Paths, engines, OKLab and WCAG maths, PNG reads, the painted-pixel metrics (`composite`, `glyphRing`, `edgeContrast`, `calm`, `paintedAlpha`), the static server, the PASS/FAIL reporter, and the consumer retune CSS W-C uses |
| `specimens.mjs` | The specimen app: a Vue page that imports the **real** library through `@glass` from any worktree's `src`, and stamps the DOM contract below |
| `build.mjs` | `node build.mjs <worktree> [--label x]` bundles the specimen app against that worktree into `$D3_OUT/builds/<label>/dist`, and writes nothing into the worktree |
| `capture.mjs` | Renders a build (or a fixture) in every cell and saves the captures and layout geometry. It is the only script that drives a browser |
| `rows.mjs` | Row generators the witnesses share: which cells a witness needs (a missing or crashed gate cell is a FAIL row), and the ink and indicator rows of a cell |
| `m1-…` to `m8-…` `.mjs` | M-1..M-8, one script each |
| `wa-…` to `wf-…` `.mjs` | W-A..W-F, one script each |
| `run.mjs` | `node run.mjs <worktree> [--label x]`: build, capture (all cells, the live windows, the retune variant), then every witness. Logs go to `<capdir>/results/<id>.log` |
| `fixtures.mjs` | Hand-made minimal pages that honour the same DOM contract: `green` (the M battery), `A`, `B`, `C`, `E`, `F` (the family witnesses) |
| `selftest.mjs` | Shows every witness PASS on its fixture and FAIL on one planted violation |
| `glance.mjs` + `v700-veil.css` | The paired owner-glance captures (HEAD against the 7.0.0 veil) |

**Running it.**

```sh
git worktree add --detach <scratch>/wt <rev>
ln -s <checkout>/node_modules <scratch>/wt/node_modules
export D3_OUT=<scratch>/out
node docs/tranches/BL/design/material/harness/run.mjs <scratch>/wt --label head     # ≈ 11 min under load
node docs/tranches/BL/design/material/harness/m2-text-contrast.mjs $D3_OUT/caps/head [--gate chromium,webkit] [--verbose]
node docs/tranches/BL/design/material/harness/selftest.mjs --fields $D3_OUT/caps/head [--only M-7,W-A]
node docs/tranches/BL/design/material/harness/glance.mjs $D3_OUT/builds/head/dist --out <dir>
```

The harness is read-only toward the worktree. A candidate is measured by pointing `run.mjs` at a worktree carrying the candidate's `src` edits. Every witness exits 0 on PASS and 1 on FAIL. Its last line is the verdict, and the lines above it are the measured rows.

## 2 · The instrument

**Specimens (the real ladder).**
- The eight plates: `.glass-wash`, `-quiet`, `-resting`, `-card`, `-floating`, `-overlay`, the dialog rung (a `.glass-floating` plate with `--glass-veil-tier: var(--glass-veil-dialog)`), and `.glass-resting.glass-opaque`.
- Each plate holds foreground and muted text, and two field wells (the real `Input`, one with a value and one showing its placeholder).
- A live `GlassDock` (fit-content, `:collapse="false"`) with a tab, a label and a muted label.
- An open `Popover`.
- The real `Dialog` scene (`DialogContent` with title, description, muted caption, a well and Close), scrim included.
- The halo scene: a `.glass-capsule` seated 2 px inside wash, quiet, resting and card, plus one on the open page as the reference.

**The DOM contract.** Fixtures honour the same contract:
- `[data-spec]` marks a surface.
- `[data-ink]` marks a text run; an id containing `muted` is the muted register.
- `[data-edge]` marks a border perimeter.
- `[data-ring]` marks a focusable whose outline is a ring.
- `[data-sample]` marks an empty region of the surface.
- `[data-bare]` marks an empty region of the page.
- `window.__harness.setCeiling(v)` steps the field.

**Cells.** A cell is an engine × theme × ground × scene. The grounds:
- paper (the theme's `--background`);
- `<Aurora>` at `opacity-ceiling` 1 (`aurora`) and 0.5 (`aurora50`), default config;
- black, white, a 16 px-tile checker (8 px squares), and 24 px violet `#7c3aed` / yellow `#facc15` stripes.

The scenes are `ladder`, `dialog`, `halo` (paper only) and `empty` (field grounds only: the field with nothing mounted, for W-F).

Each cell uses a fresh context at 1280×900, DPR 1, with `reducedMotion: reduce`, so the aurora parks after one frame and every capture of a cell sees the same field. Each cell takes these captures:
- `full`;
- `noink` (text fill transparent, strokes and halos kept);
- `maskA` / `maskB` (text fill `#00ff00` / `#ff00ff`, strokes and shadows off), whose difference is glyph coverage, independent of ink and ground;
- `raw` (every surface and the scrim hidden: the bare ground under the same layout);
- one clip per `[data-ring]` focused with keyboard modality;
- `on` / `off` for the halo scene.

**The live windows** (Chromium, field grounds, both themes). Motion is on, the capture runs for 9 s, and it is taken once with a default dock and once with the dock fed the field canvas the way keyframes binds `:background-canvas`. Readbacks are counted by wrapping `getImageData` and `readPixels` on the prototypes. No canvas context is ever requested, so the live WebGPU field is observed only by screenshot. The window then steps the ceiling (1 → 0.5 or 0.5 → 1), records the dock's published signal each frame for 90 frames, and takes a `raw` screenshot for the settled painted luma.

**Metrics (P-3: pixels only).** No witness reads a token, a computed colour or a canvas; layout geometry comes from the DOM.
- **Composite:** the mean sRGB of a surface's `[data-sample]` region in `full`.
- **Glyph-ring contrast:**
  - Coverage comes from the two masks.
  - The ink is the median `full` colour of the glyph cores (coverage ≥ 0.9·max).
  - The ring is the pixels within 1 px (Chebyshev) of the glyph with coverage < 0.25, read in `noink`.
  - The WCAG ratio is taken per ring pixel, reported as p05.
- **Indicator contrast:** per column along the top edge, min(band vs the row inside, band vs the row outside). The band is the painted border rows (perimeter) or outline rows (ring). The result is reported as p05 over columns.
- **Painted α:** from composites over black and white, α = 1 − mean(C_white − C_black)/255, pole = C_black/α. This holds because compositing is affine on encoded channels and blur or saturate of a flat ground is that ground.
- **Chrome calm:** luminance p95/p05 and OKLCh chroma of the mean inside the sample region.

**Engine labels.**
- **Chromium** is the gate engine.
- **Playwright WebKit** rows print as an informational leg, paint-only: headless WebKit paints no `backdrop-filter`. `--gate chromium,webkit` gates on both; W-D does so.
- **GlassDock crashes Playwright WebKit.** Re-probed this pass: with the dock mounted, `page.goto: Page crashed`; with `nodock=1`, clean. So WebKit cells run `nodock=1`, and every WebKit dock row prints "UNMEASURED in Playwright WebKit". W-B, W-F and M-5 are Chromium-only (Playwright WebKit also exposes no `navigator.gpu`).
- **Real Safari** prints "UNMEASURED (owner's safaridriver checkbox)" in every witness.

## 3 · HEAD, born RED (`991067c8`, Chromium gate)

All 14 witnesses exit 1. Logs: `$D3_OUT/caps/head/results/<id>.log`.

| witness | verdict | measured at HEAD (1 px ring unless stated) | portfolio reading | agreement |
|---|---|---|---|---|
| M-1 no grey | FAIL 11/11 | Light over paper `#fbfaf8` (L 0.985): wash `#efede9` L 0.947 · quiet `#e6e5e0` 0.921 · resting = card `#dfdcd7` 0.895 · floating = popover = dialog rung `#d7d4ce` 0.871 · overlay `#cfcbc6` 0.844 · dock `#e6e4e0` 0.919. ΔE paper 0.039-0.142, C 0.0058-0.0088. Opaque `#fdf5ec` L 0.974 misses the floor (0.975) by 0.001. **The real Dialog: `#746f66`, L 0.544, ΔE 0.441** | L 0.844-0.947, ΔE 0.039-0.142, C 0.0056-0.0088 on 9 plates and the dock | byte-identical on every plate. The dock reads `#e6e4e0` against `#e6e5e1` (1/255). The opaque miss and the Dialog are new (below) |
| M-2 text contrast | FAIL 169/560 | Light over ceiling 1: muted 1.47 (floating) to 6.08 (opaque), fg down to 3.88 (overlay); Dialog fg 2.28, muted 1.08. Dark over ceiling 1: fg 2.12 (popover), muted 1.36; dock fg 3.89, muted 3.51. Light over the checker: muted 1.26-6.08. Light over paper: overlay muted 4.07, floating 4.44; **Dialog fg 3.50, muted 1.32**. Playwright WebKit: 168 of 532 informational rows under 4.5 | light c1 muted 1.47-1.96, fg 3.86-4.63; dark c1 fg 3.02-4.07; checker muted 1.37-1.53 | plate rows agree. The dark dock reads 3.89 here against 2.69: this is a different instrument (a 1 px ring, a fit-content dock at (24, 470) over a different patch of the field) |
| M-3 non-text | FAIL 237/266 | Well perimeter, light paper 2.21-2.79; light c1 1.06-2.79; dark c1 1.09-2.35; stripes 1.01. Focus rings: light paper 2.63-2.92; **Dialog Close/well ring over light paper 1.80-1.81**; light black Close 1.02 | light paper 2.84-3.02 (plate rim); light c1 2.04-2.24; Dialog Close 1.79 (R3-02-04) | The Dialog Close ring reproduces R3-02-04 (1.80 against 1.79) on the real Dialog. The perimeter here is the field well's painted border (the `--ink-perimeter` control edge), not the plate rim, so its numbers differ from the portfolio's `perim` column |
| M-4 dock register | FAIL 14/14 | Dock fg = muted = `#000000` in light and `#ffffff` in dark, on all seven grounds (ΔL_OK 0.000) | both resolve `contrast-color(var(--card))` to black/white | agrees, now read from painted glyph cores |
| M-5 live dock | FAIL 6/16 | Fed dock: getImageData 36-37 per 9 s, readback alpha max 0.000, `sample-unavailable`. Default dock: 0 readbacks, `source-unavailable`. Legibility: light c1 fg 5.38 / muted 5.56 (black ink), c0.5 9.19; **dark c1 fg 3.89 / muted 3.51**; dark c0.5 8.52 / 7.95 | 37 readbacks in 9 s at alpha 0; dark tab 2.69 | agrees. The slowest `getImageData` read 9.4 ms here |
| M-6 separable ladder | FAIL 14/19 | Dark page `#0b0a09`: adjacent ΔE 0.004-0.006; ΔE from the page wash 0.005 … floating 0.011, dock 0.015, **Dialog 0.034**. Light adjacent ΔE 0.025-0.027 passes | dark within 0.011 of the page, adjacent 0.002-0.005 | agrees |
| M-7 halos whole | FAIL 8/8 | Reference capsule reach 18 px (light), 17 px (dark). Inside wash, quiet, resting and card: 2 px. Playwright WebKit: reference 14 px, hosts 2 px | `contain: paint` clips; O-61 about 10 px lost; p6-reach 32 px | agrees in kind. The reach is shorter here because the threshold is ≥ 2/255 on any channel over the capsule's middle rows |
| M-8 chrome calm | FAIL 8/8 | Stripes, light: floating = dialog rung C 0.0912, overlay 0.0887, Dialog 0.0743; bleed 1.01-1.07 (green half). Dark: C 0.0713-0.0884. Playwright WebKit (no backdrop-filter): bleed 3.08-3.27 | C 0.0915 / 0.0886 / 0.0912; bleed 1.04-1.08 | agrees |
| W-A no signal | FAIL 68/197 | Source: a writer of `--glass-backdrop-luma` at `useGlassBackdropLuminance.ts:248`. Chrome over black, light: dock fg 1.02, Dialog fg 1.05. Chrome over white, dark: overlay muted 1.07. Content light c1: resting muted 1.57. Painted α and pole: light pole ≈ `#322315` (the ink), so no α clears; dark bound 0.455-0.505 content, 0.750 chrome, against painted α 0.102-0.259 | leans on a clamp that never fires; floating over black fg 1.15, muted 3.06 | agrees. The light "no α clears with this pole" is the ink-veil fact of §2.2, read from paint |
| W-B substrate publishes | FAIL 20/24 | Published `--glass-backdrop-luma` 0.000 against a painted mean Y under the dock of 0.269 / 0.503 (light c1 / c0.5), 0.287 / 0.090 (dark). After the ceiling step it never comes within ±0.02 in 90 frames. The fed dock makes 36-37 synchronous readbacks | 37 of 37 at alpha 0 | agrees |
| W-C ink follows | FAIL 284/304 | Muted p05 ∈ [4.5, 5.5] in 20 of 304 rows. Light paper 4.07-5.62. Dark paper 6.02-10.22 (never inside). Retune (lib `RETUNE_CSS`, a cool `--background` / `--card`): light muted **falls** to 3.64 (overlay) and 4.28 (resting, card), and the Dialog to 1.22, so the ink does not follow | light paper 4.07-5.62; a retune moves no ink | agrees. The retune now has a measured cost |
| W-D solved tokens | FAIL 9/9 | RED by absence: no `src/styles/tokens/glass.solved.css`; the ladder is hand-set (`glass.css:45` base 0.14, `:46` step 0.04). All eight M witnesses FAIL under `--gate chromium,webkit` | no solver; α hand-set | agrees |
| W-E ink ground | FAIL 229/360 | Muted over black, light: dock 1.02, wash 3.16. Over white, dark: overlay 1.07. Over the checker, light: overlay 1.26. Indicators 1.02-2.91 in light, 1.00-4.15 in dark. Painted α: ladder 0.059-0.259 (≤ 0.30, green), **Dialog 0.635 light / 0.653 dark** | muted over black 3.04-3.16; over white (dark) 1.55; perimeter 1.00-1.20 | agrees on the plates. The Dialog's "α" is the scrim-plus-plate stack (below) |
| W-F field yields | FAIL 66/152 | Field L under the rects, light c1: p05 0.561 (dock) to 0.827 (popover); dark c1: p95 0.623-0.830. 24 px outside: ΔE 0.0000 (nothing yields, and nothing spills) | L down to 0.617 | agrees |

**New readings the portfolio did not have.**
1. **The real Dialog transmits its own scrim.** Over light paper, `DialogContent` composites to `#746f66` (L 0.544), because the plate's thin veil lets the modal scrim's darkening through. Muted reads 1.32, fg 3.50 and the Close ring 1.80. Over the c1 aurora, muted reads 1.08. The portfolio's "dialog" row was a dialog-rung plate with no scrim (`#d7d4ce`). The glance pair below shows it.
2. **The opaque escape sits 0.011 L under paper.** `--card` `#fdf5ec` is darker than paper `#fbfaf8`, so a pure-`--card` plate misses M-1's L floor by 0.001. Any family whose pole is `--card` lands on the floor's edge unless the pole or the floor moves.
3. **Rendering mode.** The Aurora stamps `data-aurora-substrate="webgl"` even with a WebGPU adapter present. Per `aurora/composables/runtime.ts:98-110` that value is a render *mode* ("animate at all"), not the backend. The chosen backend is not read, because no context is requested.

## 4 · Self-test: every witness goes GREEN and RED

`selftest.mjs` captures a fixture built to satisfy each witness and expects exit 0, then plants one violation of that witness's own invariant and expects exit 1. The aurora grounds in the fixtures are the HEAD run's frozen Chromium field frames (`--fields`). Summary: `$D3_OUT/selftest/summary.json`. Fixture captures: `$D3_OUT/selftest/caps/<name>`.

30 of 30 expectations met. The `green` fixture paints opaque plates, near-paper tints in light and lifted L 0.22-0.30 tones in dark, each a distinct colour, with static inks. It proves each M witness can go green. It is not a design.

| witness | PASS on | exit / verdict | planted violation | exit / verdict (a failing row it prints) |
|---|---|---|---|---|
| M-1 | `green` (both engines, 7 grounds, live) | 0 · PASS 11 rows (Playwright WebKit 10 PASS, info) | floating painted HEAD's `#d7d4ce` | 1 · FAIL 1/11: `floating #d7d4ce L 0.871 C 0.0088 ΔE 0.115` |
| M-2 | `green`: light fg 16.24-16.54, muted 5.62-5.73; dark fg 11.50-14.60, muted 6.15-7.80 | 0 · PASS 560 (WebKit 532 PASS) | muted ink moved toward the plate (`#a39a91` / `#6e665e`) | 1 · FAIL 154/560: light paper muted 2.61-2.65 |
| M-3 | `green`: perimeter 5.62-5.73, ring 16.24-16.54 | 0 · PASS 266 (WebKit 266 PASS) | well border faded (`#d9d3cc` / `#4a423b`) | 1 · FAIL 126/266: light paper perimeter 1.40-1.42 |
| M-4 | `green` | 0 · PASS 14 | dock muted pinned to `#000` / `#fff` | 1 · FAIL 14/14: `dock fg #1f1a16 muted #000000 ΔL_OK 0.222 · muted is a pole` |
| M-5 | `green` (no readback; dock legible over the field frames) | 0 · PASS 16 | the page runs `getImageData` every frame | 1 · FAIL 8/16: getImageData 359 in 3 s, slowest 5.7 ms |
| M-6 | `green` | 0 · PASS 19 (WebKit 18 PASS) | every dark plate painted HEAD's page-coloured composite | 1 · FAIL 15/19: adjacent ΔE 0.000, page ΔE 0.008 |
| M-7 | `green`: reference and every host 24 px | 0 · PASS 8 (WebKit 8 PASS) | `contain: paint` on the content hosts (O-61) | 1 · FAIL 8/8: reference 24 px, every host 2 px |
| M-8 | `green` | 0 · PASS 8 (WebKit 8 PASS) | floating and the Dialog at a thin white veil (`rgb(255 255 255 / .2)`) | 1 · FAIL 4/8: floating bleed 2.81, C 0.0540 |
| W-A | `A`: the `--card` pole at α = the witness's own bound + 0.012 (calibrated by a probe at α 0.90: light content 0.835-0.847, chrome 0.922; dark content 0.732-0.767, chrome 0.907); a `src` with no luma writer | 0 · PASS 197 | (1) a `setProperty("--glass-backdrop-luma", …)` planted in `src`; (2) floating α 0.10 under its bound | (1) 1 · FAIL 1/197: `writers of --glass-backdrop-luma: src/surface.ts:1`; (2) 1 · FAIL 4/197: floating muted 3.64 over black (light), 3.39 over white (dark) |
| W-B | `B`: a flat field whose painted luma the page knows; the dock publishes it on the frame the ceiling steps | 0 · PASS 20; latency 1 frame on all 8 steps | publication lands 12 frames late | 1 · FAIL 8/20: `latency 12 frames` |
| W-C | `C`: the muted ink is a relative-colour solve at 5.0:1 against each plate (`oklch(from var(--plate) …)`), retune included | 0 · PASS 304 | muted frozen at the default-card solve (`#6a6a6a` / `#9b9b9b`) | 1 · FAIL 65/304: dark paper floating 5.62, overlay 5.76, dialog rung 5.91 |
| W-D | a fixture worktree whose `glass.solved.css` names `node solve.mjs`, which rewrites it byte for byte; battery = the green capture under `--gate chromium,webkit` | 0 · PASS 9 | a hand edit (floating 0.760 → 0.700) | 1 · FAIL 1/9: `solver \`node solve.mjs\`: differs from the committed file` |
| W-E | `E`: α 0.20 card frost, a 6 px card stroke under every glyph (`paint-order: stroke fill`), two-tone indicators | 0 · PASS 360 | the glyph stroke removed | 1 · FAIL 74/360: light black muted 2.17 |
| W-F | `F`: the pole at 82% painted into the field layer under each rect | 0 · PASS 80 | the well spills 30 px past each rect | 1 · FAIL 40/80: 24 px out ΔE p95 0.36-0.39 |

In this seat's earlier run (its summary was cleared before the fresh selftest above), a W-E fixture with a 4 px stroke failed its own PASS at 3.38 (dark muted over white), and 6 px was needed. Stroke width is a real D3-E cost, and the portfolio's E′ open question (dark muted 2.56-3.33 over white) reproduces here.

**Two defects found by the selftest and cured in this pass.**
- **M-7's green fixture** used a black capsule shadow that moves a `#0b0a09` page by under 2/255, so the dark reference read "no shadow". It also sank W-D's PASS, because W-D re-runs M-7 on the same capture. Dark now takes a light halo.
- **W-A leg 4** solved each level's bound over the field under the empty sample strip at the plate's foot. The muted caption sits near the top, over other field pixels, so the α calibrated from that bound still read 4.32 on card over c1. The bound is now solved per ink, over the raw field under that ink's own text box.

## 5 · The owner glance (light, over paper, Chromium)

`glance.mjs` paints the same HEAD build twice: as it ships, and with `v700-veil.css`. That overlay puts the 7.0.0 veil onto HEAD's seam: the ink pointed at `--card`, with the 7.0.0 rungs light .30/.50/.65/.80/.95, dock .50, dialog .68, blur 1/7/7/11/11 and saturate 1.4/1.6, all read from `git show v7.0.0:src/styles/tokens/{glass,dark-arm}.css` (`glass.css:53-57, 86-97, 123-127, 183, 199`). Each PNG is HEAD on the left and 7.0.0 on the right, cropped to the same box. The numbers come from `glance-light-v700.json`.

| file (in `…/D3/p1/harness/`) | HEAD | 7.0.0 veil | what the eye sees |
|---|---|---|---|
| `glance-light-dock-head-vs-v700.png` | `#e6e4e0`, L 0.919, ΔE paper 0.067; tab and label ink `#000000` (16.66) | `#fcf8f2`, L 0.979, ΔE 0.009; ink still `#000000` (19.85) | HEAD's plate is a grey stadium, and its active tab a darker grey pill. At 7.0.0 the plate is a cream frost barely off the paper, and the active pill nearly vanishes, so identity rests on rim and shadow. The label ink is `contrast-color` black in both halves (M-4 is untouched by the veil) |
| `glance-light-dialog-head-vs-v700.png` | `#746f66`, L 0.544, ΔE 0.441; muted `#705942` 1.32, fg 3.50 | `#ebe4da`, L 0.921, ΔE 0.066; muted 5.02, fg 13.36 | HEAD's Dialog is a smoke-brown slab on a grey scrim: the caption is near invisible, and the well is the only light surface. At 7.0.0 the plate reads as a warm card, and the caption, well edge and Close ring are all legible. HEAD's scrim stays in both halves |
| `glance-light-floating-head-vs-v700.png` | `#d7d4ce`, L 0.871, ΔE 0.115; muted 4.44 | `#fcf6ee`, L 0.975, ΔE 0.014; muted 6.12 | HEAD: a flat grey card with lighter wells sunk into it. 7.0.0: a cream plate, with the wells a shade darker than the plate instead of lighter |

These are scratch overlays of token values, not a 7.0.0 build: 7.0.0's oklab tint on the dock and dialog plates and its separate sheet and chassis rungs are left out.

## 6 · Known limits of the instrument

- **Ring width.** The ring is 1 px, per M-2's statement. The portfolio's §1 used 3 px for fg and muted, and those agree within 0.05 on smooth grounds; on the checker and stripes the 1 px ring reads lower.
- **Perimeter.** It is read on the field well's border, the one painted control edge every specimen carries. The plate rim is a shadow and specular stack, not a border, so it has no band to read.
- **M-5 legibility** is read in the reduced-motion field cells, where the field is frozen. The live windows supply only the readback count and the signal. A moving-field ring read would need a frame-locked capture.
- **Playwright WebKit numbers are paint-only.** No `backdrop-filter`, so no blur and no saturate, and no dock. They cannot stand in for Safari in either direction.
- **The analytic bound in W-A** leaves blur and saturate out: it models α·P + (1 − α)·field on the raw pixels. Blur narrows what the ink sees (§2.3 of the portfolio: −43% L deviation under resting), so the bound is conservative for blurred plates.
- **Machine load.** Timing-sensitive legs (W-B's latency) ran under load 16-43. In the fixture's W-B PASS, all 8 steps read "latency 1 frames", so the counter itself resolves a single frame.
