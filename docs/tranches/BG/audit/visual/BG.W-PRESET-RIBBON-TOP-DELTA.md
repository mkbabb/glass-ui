# BG.W-PRESET-RIBBON-TOP — PAINT DELTA

**Wave:** BG.W-PRESET-RIBBON-TOP (F7.6 — the aurora studio presets = LARGE full-width TOP RIBBON)
**Route:** `/substrates/aurora`
**Verdict:** **PASS** — dual-engine (Chrome + Safari/WebKit) × both modes (light + dark). Every criterion reads correct on the PAINTED truth; every capture PNG resolves on disk.
**Judged by:** non-authoring paint judge (did not build the wave; verified painted pixels + computed DOM, not the builder's claim).
**Build under test:** `1d761a91` on `tranche/BG`, served from BUILT bytes (`npm run demo:dist:build` → `dist-demo/` → `vite preview` on `:5200`).

---

## Capture provenance (badges decoded)

| Engine | GPU (decoded from top-left badge) | Modes | Files |
|--------|-----------------------------------|-------|-------|
| **Chrome** (CDP, Chrome 150) | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` | light + dark | `chrome_substrates_aurora_{light,dark}.png` (top-of-page) · `chrome_substrates_aurora_{light,dark}_configurator.png` (scrolled to the configurator) · `*-badge.png` |
| **Safari / WebKit** (off-screen WKWebView, system WebKit.framework/Metal) | `WEBKIT · Apple GPU` | light + dark | `safari_substrates_aurora_{light,dark}.png` |

All captures 1440×900 @2x → 2880×1800px, via the C18 `?capture=/substrates/aurora&mode=<m>` boot path polling `data-capture-ready`.

---

## Criteria matrix

| # | Criterion | Method | Result |
|---|-----------|--------|--------|
| 1 | Preset gallery is a full-width RIBBON pinned at the TOP of the configurator (above stage+aside) | Computed DOM | **PASS** — `[data-slot=configurator]` resolves `data-gallery="top"`; the `[data-gallery-dock]` computes `grid-row: 1`, `grid-column: 1 / span 2` (spans both columns); dockRect.top (678 light / 724 dark) sits ABOVE stageRect.top (976 / 1022) and asideRect.top; dock width 1063.6px ≈ configurator width 1065.6px. Visual: the scrolled captures show the ribbon spanning the whole studio width, stage+aside in row 2 below. |
| 2 | Tiles ≥72px tall (visibly a ribbon, not a chip strip) | Computed DOM + pixels | **PASS** — all 14 tiles measure **288×242.5px** (`inline-size: 288px`, the `clamp(200px,20vw,288px)` top floor). 242.5px ≫ 72px. Visually LARGE φ-tall cards. |
| 3 | Real baked thumbnails preserved (usePresetThumbnails) | Computed DOM + pixels | **PASS** — every tile's `.configurator-preset-well` carries a `url("data:…")` baked-thumbnail background; each renders a DISTINCT preset gradient (Sky = blue smooth · Dawn = pink/orange diagonal · Meadow = yellow/blue watercolor · Deliberative = pink/red radial). |
| 4 | Horizontal overflow through `<FadingScroll>` (the one scroll-fade port) | Computed DOM + pixels | **PASS** — the tiles' scroll parent is `fading-scroll fading-scroll--x configurator-gallery-track` (`overflow-x: auto`), `scrollWidth 4144 > clientWidth 1040` (overflowing), with a `linear-gradient` mask fade present. Visual: the 4th tile (Deliberative) is clipped at the right edge = the overflow. |
| 5 | Active preset lifted on the selected-reads-as-glass tier (never a saturated fill) | Computed DOM | **PASS** — the active tile (`aria-pressed="true"`, "Dawn") keeps the SAME translucent glass-capsule fill as inactive tiles (light `oklab(0.809 … / 0.866)`, tiny chroma — warm-cream, not saturated) and is distinguished ONLY by a warm-ink 2px inset ring + cartoon cast (`rgb(28,25,23)` inset light / `rgb(186,183,171)` inset dark) — inactive tiles have `box-shadow: none`. The lift is the selected-reads-as-glass ring, not a saturated background. |
| 6 | Keyboard preset-cycle preserved | Live keypress | **PASS** — tiles are `<button>` inside a `role="radiogroup"`; focusing the active tile and pressing **ArrowRight** moved the pressed preset from index 1 → 2. |
| 7 | Recessive aurora / no conic / no oversaturation / grain calm / hero fits envelope | Pixels | **PASS** — the page-backdrop aurora + the stage aurora both read as a soft warm-cream (light) / warm-bronze (dark) painterly field; no conic banding, no oversaturation, calm grain. The `Aurora` display hero fits its envelope; the studio nuclei rings render clean. |
| 8 | Aside carries NO preset content (clean-break — the ribbon replaces the aside preset row) | Computed DOM | **PASS** — `.configurator-aside` contains no `.configurator-preset-tile` / `.configurator-presets`. |
| 9 | Gate `proof:demo` PR1–PR3 preset-ribbon arm GREEN on the INTEGRATED tree (0 violations) | Gate | **PASS** — `PR1 aurora ribbon (top): true (pinsTop: true)`, `PR2 VizStudio threads axis: true (prop+bind)`, `PR3 ribbon tile ≥72px: true (minPx: 200)`, status **PASS**, 46 self-test sabotages handled. |

---

## Fence checks (untouched by this wave)

- **One-GL-per-route budget:** `glContextCount = 2` — the page-backdrop `aurora-root` (body-level, 1440×900) + the studio stage `aurora-canvas` (704×403). Both are PRE-EXISTING aurora contexts for the `/substrates/aurora` GL-showcase route; this wave touched only preset gallery PLACEMENT + tile CSS + the VizStudio `galleryPlacement` passthrough — it added/removed no GL context. Not a regression of this wave.
- **`animationsRunning = 0`** at the settled capture frame; **`mainChildren = 2`** (layout sane).
- **Presets-in-consumers:** the ribbon is chrome; the preset content stays the demo's `<PresetPickerRow>` in the `#presets` slot; the top placement is the SHARED library `<Configurator galleryPlacement>` axis (no per-studio gallery re-fork).

---

## Conclusion

The wave paints EXACTLY as specified: `/substrates/aurora` renders the baked-thumbnail preset gallery as a LARGE (288×242.5px tiles), full-width RIBBON pinned at the TOP of the configurator, above the stage+aside, with the real baked thumbnails preserved, horizontal overflow clipped through the one `<FadingScroll>` port, the active preset lifted on the selected-reads-as-glass tier (warm-ink ring, not a saturated fill), and the keyboard preset-cycle intact. Confirmed identical across Chrome (ANGLE Metal) + Safari (WebKit/Apple GPU) in both light and dark. Gate `proof:demo` PR1–PR3 GREEN, 0 violations.

**→ DONE.**
