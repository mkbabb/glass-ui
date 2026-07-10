# BG.W-COLORS-WATERCOLOR-SWATCH — PAINT DELTA (dual-engine, both modes)

**Verdict: PASS** — non-authoring paint judge. Every criterion reads correct in BOTH
engines (Chrome/ANGLE-Metal + Safari/WebKit-Apple-GPU) × BOTH modes (light + dark),
and every capture PNG resolves on disk.

- Route: `/foundations/colors`
- Method: the proven C18 pipeline — `demo:dist:build` → `demo:dist:serve` (BUILT bytes
  on `:5200`), Chrome via CDP (`connectOverCDP`, 1440×900 @2x, `?capture=…&mode=…`,
  poll `data-capture-ready`) + Safari via off-screen `wkshot-live` WKWebView (system
  WebKit.framework/Metal). Provenance badges decoded per capture.
- Judge date: 2026-07-10

---

## Captures on disk (all resolve)

Under `docs/tranches/BG/audit/visual/BG.W-COLORS-WATERCOLOR-SWATCH-paint/`:

| Engine | Mode | Full page | Badge decode |
|--------|------|-----------|--------------|
| Chrome | light | `chrome_foundations_colors_light.png` (2880×1800) | ENGINE CHROME · ANGLE Metal Apple M5 Max · MODE LIGHT |
| Chrome | dark  | `chrome_foundations_colors_dark.png` (2880×1800)  | ENGINE CHROME · ANGLE Metal Apple M5 Max · MODE DARK |
| Safari | light | `safari_foundations_colors_light.png` (2880×1800) | ENGINE WEBKIT · Apple GPU · MODE LIGHT |
| Safari | dark  | `safari_foundations_colors_dark.png` (2880×1800)  | ENGINE WEBKIT · Apple GPU · MODE DARK |

Ramp element crops: `chrome_colors_ramp_{light,dark}.png`. Provenance badge crops:
`chrome_foundations_colors_{light,dark}-badge.png`.

Entrance frame-series painted PNGs (8 per mode, Chrome, live non-capture):
`entrance_{light,dark}_f00_s45.png … _f07_s175.png` + `entrance_{light,dark}_{t00,t33,t66,t100}.png`.
Numeric series: `entrance-pi.json`. Computed-DOM probe: `chrome-colors-probe.json`.

---

## Criteria verification

### Gate `proof:demo` WC1–WC5 — GREEN on the INTEGRATED tree (status PASS, 0 violations)

```
WC1 colors→WatercolorDot  : true
WC2 no flat-chip regress  : true
WC3 swatch ≥112px         : true  (px: 120)
WC4 hand-laid stagger     : true  (stops: 13, distinct: true)
WC5 scroll-cascade entrance: true
self-test                 : OK — 46 synthetic sabotages handled (incl. WC1–WC5 bites)
status: PASS
```

### The PAINTED truth (computed-DOM + pixel)

- **WC1 — the ramp IS `<WatercolorDot>` seeded organic blobs.** 13 `[data-testid="watercolor-swatch"]`
  nodes, every one carrying a live SVG wet-edge filter (`hasSvgFilter: true` ×13) and the
  `animate` liveness (`watercolor-animated` class ×13). The pixel read (both engines, both
  modes) shows 13 organic pastel blobs with bleeding wet edges + per-vertex `border-radius`
  morph — NOT flat token chips. WC2 confirmed by construction (no flat `background:
  var(--section-color-N)` chip survives; the hue arrives via `:color`).
- **WC3 — sized ≥112px, strictly > the retired 96px chip.** Measured bounding boxes
  116–129 px (base `7.5rem`=120px; the ±px variance is the organic morph/wet-edge
  displacement). Minimum 116px clears the 112px floor.
- **WC4 — hand-laid vertical zigzag stagger, adjacent stops distinct.** `marginBlockStart`
  = `0, 25.6, 8, 20.8, 0, 27.2, 9.6, 22.4, 4.8, 24, 6.4, 19.2, 0` px — every adjacent pair
  distinct; the irregular hand-laid read is visible in all four full-page captures (row 1
  bows up-down-up-down…, not a flat aligned row). It is a STATIC `margin-block-start` layout
  offset, so it composes with the compositor entrance transform without clobbering it.
- **WC5 — the entrance rides the EXISTING `.scroll-cascade--columns` register.** The direct
  children resolve `animation-name: gl-cascade-build` on `animation-timeline: view()` (a real
  `ViewTimeline` — confirmed via `getAnimations()`), each with its consumer-set `--col`. NO
  demo-local `@keyframes` — the shipped library register is the sole entrance source.

### Entrance frame-series π (≥8 painted frames · compositor-only · PRM static terminal) — PASS

Driven live in NON-capture mode (capture mode correctly freezes to the settled terminal
per `demo/capture/capture.css`, so the static PNGs above are the PRM/terminal evidence).
The `.scroll-cascade--columns` `view(block)` timeline was scrubbed by scrolling the
`.demo-main-scroller` through the cascade's entry range:

- **18 mid-progress frames · 19 distinct progress buckets** (both modes identical).
- opacity build `0 → 0.28 → 0.71 → 0.89 → 0.97 → 0.99 → 1.0`; transform `translateY 20px → 0`.
- `timeline = view()`, `tl = ViewTimeline`, `animName = gl-cascade-build` at every sampled
  frame — a genuine live scroll-driven entrance, not a snapshot.
- **Compositor-only**: the `gl-cascade-build` keyframes animate ONLY `opacity` + `transform`
  (no layout property; `proof:no-layout-animation` corpus).
- **PRM static terminal**: the register sits under `@media (prefers-reduced-motion:
  no-preference)` + `@supports (animation-timeline: view())`; under PRM / capture the ramp
  renders at its terminal (all 13 blobs opacity 1) — confirmed by the frozen capture PNGs.
- 8 painted element PNGs per mode on disk (distinct byte sizes → distinct painted frames).

### Gestalt (both engines, both modes)

- Hero/title "Colors" fits its envelope; eyebrow (`FOUNDATIONS · COLOR`) + `Section ramp ·
  13 stops` heading + blurb read correct; stop labels `0…12` stay warm ink
  (`rgb(124,102,80)` = `--muted-foreground`, untinted — the one-color-event proportion held).
- Page backdrop is a calm recessive wash (near-black warm in dark, cream in light) — no
  conic banding, no oversaturation, grain calm. The single page-background context is
  offscreen-paused (`none/2d`) in the live non-capture read; it is not the swatch grid.
- The 13-stop ramp IS the content (reference-class one-color-event exemption) — full-chroma
  per stop, dark-adapted pastels in dark mode for legibility over the near-black canvas.
- WebKit renders the SVG turbulence/displacement filter identically to Chrome (Safari-safe
  by construction — the filter rasterizes once + caches, never per-frame).

---

## Fences honored

Non-authoring judge: zero `src/`/`demo/`/`styles/`/`scripts/` edits. Only PNGs + this DELTA
written under `docs/tranches/BG/audit/visual/`, plus the cursor-row flip in
`docs/tranches/BG/execution/EXECUTION-PROGRESS.md`. Siblings intact
(`verify-siblings-intact.mjs --quiet` → 0) before and after. Preview server killed on teardown.
