# PI-FIELD — VERDICT, 2026-08-28

**RECORDED-NOT-DECIDED.** This seat ratifies nothing. It measures the two terms
`lanegamma-unit2/RECORD.md` refused to cut a constant for, banks them, and hands the numbers
to **#49** (`W-AURORA-FIELD`). Same discipline as the g3 sheets.

**Seat model:** `claude-opus-5`, asserted from this seat's own subagent transcript
`…/subagents/agent-a0afb01ad5d994250.jsonl` (first user message = this seat's order;
`message.model` on every assistant record → `claude-opus-5`). The assertion `&&`-gated the run.

**Cell provenance.** π-FIELD has no queue-table row — it is the drop `PI-CENSUS.md` §5 D8
caught, routed by two live obligations in a source of record and never dispatched:

> `:202` — *"…that term is `W-AURORA-FIELD` §6's to derive … and **π-FIELD's to ratify in
> paint**. This seat holds no capture and will not cut a paint threshold blind."*
>
> `:520` — *"**The drift floor's CUT is π-FIELD's** (§A7). The shape is on disk; the number is
> not…"*

`PI-CENSUS.md` is **not** edited by this seat; the driver reconciles.

---

## 1 · The two terms, and what they are measured against

`AURORA_DRIFT_FLOOR` is on disk at `src/components/aurora/constants/presets.ts:327-331` —
`nucleiDrift 0.0005 · paletteDrift 0.0004 · breathDepth 0.0015 · warpDrift 0.00015`, one
percent of each axis's authored domain, stated in the source as the SHAPE and not the cut.
The γ unit's arithmetic for why no config-space constant separates the two fields:

| axis | domain | shell / hero | studio default (type) | separation |
|---|---|---|---|---|
| `nucleiDrift` | 0..0.05 | 0.012 | 0.015 | 1.25× |
| `paletteDrift` | 0..0.04 | 0.012 | 0.015 | 1.25× |
| `breathDepth` | 0..0.15 | 0.05 | 0.05 | **identical** |
| `warpDrift` | 0..0.015 | 0.008 | 0.008 | **identical** |

**T1** — the composited range each palette can express (shell C ≤ 0.07 over an L span of 0.03
against the studio's C 0.16/0.13/0.095), the term `:202` says actually separates them.
**T2** — the drift amplitude in paint, per axis.

---

## 2 · Instrument

Chromium `--headless=new --use-gl=angle --use-angle=metal --enable-unsafe-webgpu
--ignore-gpu-blocklist` (the house `tests-visual/playwright.config.ts` darwin arm), viewport
1440×900, **dpr 1**, light and dark by `vueuse-color-scheme` seeded before load plus the
matching `colorScheme` emulation. Dev server `vite --host localhost --port 5401`, port-guarded
(`HTTP 200`) before the first capture, killed only by this seat.

**Observation fence.** No `getContext()` is ever called by this seat on a live canvas — the
prototype is wrapped before page scripts and forwards the app's own call, so the app receives
its own context and the recorder only witnesses. All colour is read from screenshots and
decomposed through the house `oklabFromRgb` (`scripts/reflect-capture-verify.mjs:140`); styles
via `getComputedStyle` only.

**Beacon gate.** Every capture waits on `[data-aurora-settled]` (`Aurora.vue:206`), then a
further 700–900 ms and two rAF ticks.

**Sample sets.** Studio: the stage canvas rect, inset 8 px, stride 3 px (20,944 points).
Shell: a 12 px grid filtered to FIELD-VISIBLE points — `elementFromPoint` plus an ancestor walk
that rejects any element between the point and `<body>` carrying a non-transparent background,
a background image, a backdrop-filter or a box-shadow, and rejects glyph-bearing and
canvas/img/svg hits. What survives is field-over-page-ground, which is the composite the term
is about (1,016 points on `/substrates`, 2,516 on `/display`).

**Noise floor.** Four PRM-`reduce` arms and one all-axes-zero arm return **ΔE = 0.000000 at
every percentile, 0 pixels changed** over 8–10 s. The pipeline is deterministic; every non-zero
number below is real motion.

---

## 3 · T1 — the composited range, measured

Static read at t0, OKLCh over the sample set.

| subject | theme | n | L p01 | L p50 | L p99 | L span98 | C p50 | C p99 | C max | hue |
|---|---|---|---|---|---|---|---|---|---|---|
| shell `/display` | light | 2516 | 0.865 | 0.916 | 0.933 | 0.069 | 0.023 | 0.026 | **0.026** | 68° |
| shell `/substrates` | light | 1016 | 0.823 | 0.875 | 0.896 | 0.072 | 0.072 | 0.077 | **0.077** | 63° |
| shell `/display` | dark | 2516 | 0.312 | 0.340 | 0.386 | 0.074 | 0.019 | 0.024 | **0.025** | 59° |
| shell `/substrates` | dark | 1016 | 0.550 | 0.571 | 0.590 | 0.040 | 0.076 | 0.081 | **0.081** | 61° |
| studio `/substrates/aurora` | light | 20944 | 0.663 | 0.836 | 0.855 | 0.192 | 0.114 | 0.148 | **0.160** | 67° |
| studio `/substrates/aurora` | dark | 20944 | 0.663 | 0.836 | 0.855 | 0.192 | 0.114 | 0.148 | **0.160** | 67° |

**The record's config-space claim holds in paint, with two corrections.**

1. The studio composites to **C p99 0.148 / C max 0.160** against a shell that composites to
   **0.026–0.081** — a 1.8× to 5.7× separation, and the widest single separator this seat
   measured on any term.
2. **Composited chroma exceeds the authored palette maximum.** `shellAuroraConfig`'s warmest
   stop is C 0.065 (light) and `shellAuroraConfigDark`'s is 0.07; the paint reads 0.077 and
   0.081. A threshold cut against authored C under-predicts the paint by ~15–20%. Both stay
   under the stated C ≤ 0.10 recessive ceiling.
3. **The shell's L span is 0.040 in dark and 0.069–0.074 in light**, against the record's
   "an L span of 0.03". The dark figure is close; the light figures are more than double it.

**Two shell routes with byte-identical drift config are 3× apart in composited chroma**
(`/display` C p99 0.026 vs `/substrates` 0.077) because `warmFieldHue(categoryId)` gives them
different hues on the same palette shape. "The shell field" is not one paint range.

---

## 4 · T2 — the drift, measured

Per-point OKLab ΔE between the settled frame and a later frame over the same points.

| subject | theme | window | pixels changed | ΔE mean | ΔE p95 | ΔE p99 | ΔE max |
|---|---|---|---|---|---|---|---|
| shell `/display` | light | 10 s | **29.3%** | 0.00064 | 0.0033 | **0.0043** | 0.0055 |
| shell `/display` | dark | 10 s | 93.1% | 0.0066 | 0.0147 | **0.0191** | 0.0295 |
| shell `/substrates` | light | 10 s | 92.7% | 0.0070 | 0.0278 | **0.0524** | 0.0670 |
| shell `/substrates` | dark | 10 s | 91.5% | 0.0074 | 0.0297 | **0.0564** | 0.0684 |
| studio | light | 10 s | 99.5% | 0.0249 | 0.0727 | **0.0988** | 0.1317 |
| studio | dark | 10 s | 99.5% | 0.0249 | 0.0724 | **0.0987** | 0.1294 |
| any subject, PRM reduce | both | 10 s | **0%** | 0 | 0 | **0** | 0 |

**The decisive datum.** `/display` and `/substrates` run the *same* shell config —
`nucleiDrift 0.012 · paletteDrift 0.012 · breathDepth 0.05 · warpDrift 0.008`, identical to the
byte. Their paint motion differs by **12×** (ΔE p99 0.0043 vs 0.0524). Nothing in the drift
axes explains that; the composited chroma range does (C p99 0.026 vs 0.077). This is `:202`'s
claim — *"what separates them is not the drift amplitude but the composited range each palette
can express"* — measured in paint rather than argued, and it means **a threshold cut in drift
units cannot be transferred between two routes of the same field.**

### 4.1 · Per-axis isolation on the studio (light, 8 s, 20,944 points)

Each arm drives the other axes to 0 through the studio's own sliders and reads the door back.

| arm | live axes | changed | ΔE p99 | marginal over warp-only |
|---|---|---|---|---|
| ALL FOUR ZERO | — | **0%** | **0** | — (the loop parks) |
| WARP only | `warpDrift 0.008` | 91.7% | 0.0597 | baseline |
| BREATH + warp | `breathDepth 0.05` | 91.9% | 0.0599 | **+0.000** |
| NUCLEI + warp | `nucleiDrift 0.022` | 93.5% | 0.0759 | +0.016 |
| PALETTE + warp | `paletteDrift 0.016` | 98.9% | 0.0772 | +0.017 |
| SHIPPED (all on) | lead preset | 99.4% | 0.0875 | +0.027 |

*(The `axis-ALLZERO` arm in `partC` did not zero `warpDrift` — its slider sits in a collapsed
`ConfiguratorLayer`; it is therefore a second warp-only reading, 0.0628, and the run-to-run
spread on that config is 0.0597–0.0628. `partD` opens the layer and gets the true all-zero arm.)*

**`warpDrift` alone carries ~70% of the shipped field's paint motion** (0.060 of 0.088), and
**`breathDepth` at its shipped 0.05 adds nothing measurable on top of it** (+0.000, inside the
run spread). Those are precisely the two axes the γ unit found byte-identical between shell and
studio. `nucleiDrift` and `paletteDrift` — the two that sit 25% apart — each add ~25% of the
warp baseline. **No floor on nuclei and palette can park either field**, because the axis that
is doing the work is identical on both and untouched by them.

### 4.2 · The demand gate parks, measured

With all four axes at 0 — `isAuroraDriftLive` false — the field's paint delta is **exactly 0 at
every percentile over 8 s, 0 of 20,944 pixels changed**. The gate is real in paint, not just in
the predicate. The floors are the question of *where* it should fire, not *whether*.

### 4.3 · The floors are unreachable through the shipped controls

| axis | proposed floor | studio slider step | floor as a fraction of one step |
|---|---|---|---|
| `nucleiDrift` | 0.0005 | 0.001 | 0.5 |
| `paletteDrift` | 0.0004 | 0.001 | 0.4 |
| `breathDepth` | 0.0015 | 0.005 | 0.3 |
| `warpDrift` | 0.00015 | 0.0005 | 0.3 |

Every floor is **below one step of its own control**
(`sections/AuroraMotionSection.vue:104-128`, `config/CompositionLayer.vue:81-88`). No user can
author a value strictly between 0 and any floor through the studio, so **the floors are
paint-identical today by construction** — which is what the source claims, now with the
mechanism named rather than inferred from "below every shipped value". The `partD` arm confirms
the other side: at 0, the paint is exactly still.

---

## 5 · What the live studio actually runs

The doors on `/substrates/aurora` read **`nucleiDrift 0.022 · paletteDrift 0.016 ·
breathDepth 0.05 · breathPeriod 44 · warpDrift 0.008`** — the lead preset, not
`DEFAULT_AURORA_CONFIG` (`0.015 · 0.015 · 0.05 · 40 · 0.008`). The record's "studio default"
column is the type default. Against the shell's 0.012, the **shipped** separation is 1.83× on
`nucleiDrift` and 1.33× on `paletteDrift`, not 1.25× on both. The two byte-identical axes stay
byte-identical.

---

## 6 · Routed to #49 — measurements, not rulings

**F1 · `aurora-hero.ts:274`'s WCAG 2.2.2 claim is refuted in paint.**
The source says the shell field *"reads effectively static (WCAG 2.2.2 by being non-animated —
no pause control owed)"*. Measured over 10 s at rest: **91.5–93.1% of field-visible pixels
change** on `/substrates` and on `/display` in dark, ΔE p99 up to 0.056, ΔE max 0.068, peak
per-channel 8-bit delta 20–21. That is a moving field, not a still one. Only `/display` in
light is near-still (29.3% of pixels, ΔE p99 0.0043, peak channel delta 2) — and that is the
palette's doing, not the drift's. This is the item `lanegamma-unit2` §6.3 hands forward:
*"the claim must then be struck or earned."* **The measurement says struck.**
Coordinates: `demo/chassis/hero/aurora-hero.ts:274`.

**F2 · `shellAuroraConfigDark`'s composited-L claim is refuted in paint.**
The source says the dark shell *"composites to L ≈ 0.12–0.16 over the dark page"* at
`opacityCeiling 0.5`. Measured composited L: **p50 0.340 on `/display`, p50 0.571 on
`/substrates`** — 2.1× to 3.6× the claimed band, and on `/substrates` a mid-light warm-brown
wash rather than a deep ember. Coordinates: `demo/chassis/hero/aurora-hero.ts:322-345`,
`demo/shell/AppShell.vue:172-176`. Evidence: `pi-FIELD-shell-substrates-dark-f0.png`,
`pi-FIELD-shell-display-dark-f0.png`.

**F3 · The aurora studio's arrow-key shortcuts hijack every slider.**
`ArrowLeft`/`ArrowRight` are registered as *Previous/Next preset*
(`demo/stories/substrates/aurora.vue:99-109`, `allowInInput: false`). A `[role="slider"]` is not
an input, so one `ArrowRight` on a **focused** "Nuclei drift" slider swapped the whole preset:
seven axes moved in one press (`Energy 0.486→0.543 · Nuclei drift 0.022→0.024 · Palette drift
0.016→0.018 · Breath period 44→46 · Warp amount 0.50→0.52 · Warp drift 0.008→0.009 ·
Saturation 1.02→1.04`). Keyboard adjustment of any axis destroys the user's configuration.
Recorded at `pi-FIELD-MEASUREMENTS.json` → `partC_arrowKeyCollision`.
**This voids `partB`'s `bracket-ONESTEP-nuclei` arm**, which is retained in the record and
marked void rather than deleted.

**F4 · The studio stage does not arm until it is scrolled into view.**
At 1440×900 `/substrates/aurora`'s `.aurora-root` sits at y ≈ 936 — below the fold. Until the
stage is scrolled in, the canvas stays at the 300×150 HTML default, the renderer status parks
at *"WebGPU·Acquiring adapter"*, `navigator.gpu.requestAdapter` is **never called**, and
`data-aurora-settled` never stamps. This is deferred init behaving as designed, and it is a
**capture precondition** any future π seat must honour — `partA`'s four studio arms timed out
on it and are superseded by `partB`'s. Recorded at `partB.harnessFact`.

**F5 · The focal studio field is theme-invariant.** Light and dark arms return identical static
statistics to five decimals (L p50 0.83563, C p99 0.148 in both). Stated as a measurement; this
seat does not judge whether the focal register is meant to be theme-aware.

---

## 7 · What this seat does NOT decide

- **The floor's number.** The transfer curve from a drift axis to paint ΔE is banked per axis
  above; the threshold that should fire the demand gate is #49's, and it must be cut per axis
  *and* be stated against a named palette, because §4's `/display`-vs-`/substrates` result
  proves one number does not carry across two routes of the same field.
- **Whether the paint-motion unit should be ΔE p99, changed-pixel fraction, or peak channel
  delta.** All three are banked for every arm.
- **F1's remedy** — strike the WCAG claim or park the field. The measurement is the input.
- **Any GLSL deletion.** π-ARCHIVE is still the fence and this cell does not touch it.

---

## 8 · Artifacts — 79 files, `pi-FIELD-` prefix, this directory

`pi-FIELD-MEASUREMENTS.json` — every arm, every point count, every percentile, plus
`partB.harnessFact`, `partC_arrowKeyCollision`, `partC_axisIsolation`, `partD_allZeroPark`.

78 PNG frames, four or three per arm (`-f0` settled, then +2 s/+3 s/+5 s or +3 s/+5 s):
`pi-FIELD-shell-{substrates,display}-{light,dark}[-prm]-f{0..3}` (32) ·
`pi-FIELD-studio-aurora-{light,dark}[-prm]-f{0..3}` (16) ·
`pi-FIELD-bracket-{PARKED,ONESTEP-nuclei,SHIPPED}-f{0..3}` (12) ·
`pi-FIELD-axis-{ALLZERO,NUCLEI-only,PALETTE-only,BREATH-only,WARP-only}-f{0..2}` (15) ·
`pi-FIELD-axis-ALLZERO-TRUE-f{0..2}` (3).

**Not touched by this seat:** `PI-CENSUS.md`, `PI-BATTERY-gamma-aurora-blob.md`, every source
file, every other band directory, and every sibling repo. No `git add`, `commit`, `stash` or
`checkout`. The only writes are this file, `pi-FIELD-MEASUREMENTS.json`, the 78 frames, and
the δ3-π-5 block appended to the δ battery.
