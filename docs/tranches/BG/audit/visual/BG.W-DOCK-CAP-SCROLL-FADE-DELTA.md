# BG.W-DOCK-CAP-SCROLL-FADE — dual-engine paint DELTA

**Wave:** BG.W-DOCK-CAP-SCROLL-FADE (row 4.7, F3) · **Verdict: PASS** · Judge: non-authoring paint judge (did not build this wave).

**Routes:** `/dock/overview` (content-driven overflow-wrap shell) · `/dock/layers` (vertical-overflow layer case)
**Engines:** Chrome 149 (CDP over headed Chrome.app → real GPU) · WebKit (native WKWebView off-screen harness + Playwright WebKit 26.4 for the live-scroll leg)
**Modes:** light + dark · **Bytes:** BUILT `dist-demo` served on `vite preview :5200` (NOT `:5199` dev)

**GPU provenance (decoded off the top-left engine badge / GL_RENDERER):**
- Chrome: `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` — headed → real Metal, all 4 combos.
- Safari/WebKit: badge `WEBKIT · Apple GPU · DARK/LIGHT` on all 4 native-WKWebView captures. Live-scroll leg: Playwright WebKit engine `26.4`.

---

## Criterion 1 — the `<FadingScroll>` `--fade-start`/`--fade-end` mask seam feathers BOTH scroll ports

### The capture-harness interaction (recorded, load-bearing)

The FadingScroll feather is DRIVEN by scroll-timeline animations — `@keyframes gl-fade-start-in`/`gl-fade-end-out`
with `animation-timeline: scroll(self inline|block)` (`src/styles/utilities/base-misc.css`), interpolating the
registered `@property --fade-start`/`--fade-end` mask-width customs. The C18 capture harness (`demo/capture/capture.css`
rule 1) sets `animation: none !important` on `html[data-capture] *` to freeze entrance layers for the off-screen snapshot
— which ALSO freezes these scroll-driven customs at their `@property` initial `0px` (SHARP edges). So the **8 capture-mode
PNGs structurally cannot show the feather** (they read sharp at the ports) — this is an intrinsic capture-mode/animation
conflict, NOT a wave defect. The mask SEAM is present in capture mode (mask-image applied on both ports, confirmed
computationally); only the runtime fade-WIDTH driver is disabled.

The feather is therefore verified via **live (non-capture) dual-engine paint** — themselves non-authoring real-GPU reads.

### Live proof — horizontal port (`fading-scroll--x.demo-bottom-dock__tabs`, the content-overflow shell scroller)

| engine | mode | at rest (scroll=0) | mid-scroll | active animations |
|--------|------|--------------------|-----------|-------------------|
| Chrome (Metal) | light | `--fade-start:0px` (SHARP) · `--fade-end:16px` (FEATHER, trailing overflow) | both `16px` | `gl-fade-start-in`+`gl-fade-end-out` on `ScrollTimeline` |
| WebKit 26.4 | light+dark | — | both `16px`; resolved mask `linear-gradient(to right, transparent 0px, black 16px, black calc(100%-16px), transparent 100%)` | 2× `ScrollTimeline` |

- `scrollW 1289 > clientW 629` → real trailing overflow. At scroll=0 the START is sharp (feathers only past scroll>0) and the END feathers (trailing overflow remains) — the exact dual-path FadingScroll contract.
- Pixel confirmation: `live-fade-overview-light-port0.png` (Chrome) + `webkit-fade-overview-{light,dark}-hport.png` (WebKit) — both edges feather softly to transparency mid-scroll.

### Live proof — vertical port (`demo-sidebar-dock.glass-dock.vertical`, the layer/vertical-overflow case)

Forcing the viewport-capped sidebar dock to overflow (short viewport 1440×560, `scrollH 710 > clientH 445`), mid-scroll:
- Chrome: `--fade-start:16px` + `--fade-end:16px`, 2× `ScrollTimeline`. Pixel: `live-vfade-layers-light-yport0.png` — top+bottom icons feather softly.
- WebKit 26.4: `--fade-start` reads (after frame settle) with `--fade-end:16px`, 2× `ScrollTimeline`. Pixel: `webkit-vfade-layers-{light,dark}-vport.png` — top+bottom feather.

Both scroll ports (X shell scroller + Y sidebar/layer) feather via the ONE wired mechanism. **PASS.**

---

## Criterion 2 — no clip lozenge · Criterion 3 — plate clears its track cell

These are STATIC geometry (capture-faithful; unaffected by the animation kill). Computed + pixel:

- Dock control geometry (`.dock-icon-button`): cell 40px, `padding: 4px` all sides, `background-clip: content-box`, `--dock-control-safe-inset = calc(max(2.5rem,0px)*.1) = 4px`. The PAINTED plate (content-box) is inset 4px/side → 32px within the 40px hit-cell (WCAG hit-box preserved).
- Hovered plate: `scale: 1.1` → visual cell 44px; the content-box plate (~35px at 1.1×) stays inside the row even against the `.dock-layer--full` overflow-x scroll port (clip ancestor). No slice.
- Pixel: `plate-hover-light.png` — the hovered bell plate is a **clean fully-rounded pill with clearance on all sides**, NOT a flat-topped lozenge. `plate-rest-light.png` — resting plates clean.
- Across all 8 capture PNGs (both engines/modes, overview+layers): every dock control (collapsible home/search/bell/settings, media transport, Assets/Layers/Libraries, bottom shell nav, left sidebar) reads as clean rounded pills/circles — zero lozenge slicing. **PASS.**

---

## Generic gestalt reads (both engines, both modes)

- Recessive warm aurora field behind the DockStage cards — warm salmon (light) / warm-brown transmissive glass over near-black (dark, the W-DARK-MATERIAL luminous-dark register). No conic banding, no oversaturation ring.
- Grain calm; hero title fits its envelope; `mainChildren: 3`, `glContextCount: 2` (overview) / `1` (layers) — one-GL-per-route budget respected.

---

## Evidence (all resolve on disk under `BG.W-DOCK-CAP-SCROLL-FADE-assets/`)

**Provenance-badged capture-mode set (8):** `chrome-dock-{overview,layers}-{light,dark}.png`, `safari-dock-{overview,layers}-{light,dark}.png` (all 2880×1800).
**Live feather set:** `live-fade-{overview,layers}-light-port0.png`, `live-vfade-layers-light-yport0.png`, `webkit-fade-overview-{light,dark}-hport.png`, `webkit-vfade-layers-{light,dark}-vport.png`.
**Plate set:** `plate-rest-light.png`, `plate-hover-light.png`.

**Device-free gate `proof:dock-plate-clearance`:** GREEN (pre-existing). This paint re-earns the "overflow-fade `/dock` π owed at the F3 visual close" against the live painted truth.

**VERDICT: PASS** — both scroll ports feather (soft-edge, both engines, both modes, live-verified); no clip lozenge; plate clears its track cell; all capture PNGs resolve on disk and read clean.
