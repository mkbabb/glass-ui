# BG.W-DOCK-FISSION-WIRE — PAINT DELTA (non-authoring dual-engine judge)

**Wave:** `BG.W-DOCK-FISSION-WIRE` (§1 seq 4.5, family F3) — the dock fission bloom π.
**Routes:** `/dock/dock-gallery` · `/dock/liquid-playground`
**Verdict:** **PASS** — dual-engine (Chrome ANGLE-Metal + Safari/WebKit Apple GPU), BOTH modes.
**Judge:** non-authoring paint judge (did NOT build the wave). Built bytes over `demo:dist` served on `:5200`, NOT `:5199` dev.
**Date:** 2026-07-02.

---

## Method (the proven C18 pipeline)

- `npm run demo:dist:build` → `dist-demo` (945ms) → `npm run demo:dist:serve` → vite preview `:5200` (BUILT bytes).
- **Chrome leg:** real headed `Google Chrome.app` (→ real Metal), `chromium.connectOverCDP(:9456)`, `newContext({1440×900, dsf:2, colorScheme})`, `goto ?capture=<route>&mode=<m>`, `waitForFunction data-capture-ready` +800ms, `GL_RENDERER` read off a throwaway `webgl2` ctx, `page.screenshot` clip 1440×900 → 2880×1800.
- **Safari/WebKit leg:** the off-screen `wkshot-live` harness (polls `data-capture-ready` @4500ms → `takeSnapshotWithConfiguration`), 2880×1800.
- Interaction-gated surfaces (the fission bloom + the facet fan) driven over the SAME CDP Chrome page (mode-switch → reka-slider scrub → hover-fan), COMPUTED-DOM readback + a clipped screenshot per state.

### Provenance (in-pixel engine badge decode)

| leg | ENGINE | GPU | probe |
|-----|--------|-----|-------|
| Chrome | `CHROME` | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` | real Metal M5 Max — NOT SwiftShader |
| Safari | `WEBKIT` | `Apple GPU` | real WebKit — NOT blank |

Body-text non-blank on every route (dock-gallery ~1.48k chars, liquid-playground ~2.35k chars; SwiftShader/blank-WebKit does NOT reproduce).

---

## Pass-condition checklist

The criteria: *a NON-AUTHORING dual-engine paint of the dock fission bloom — the rest-state ONE crisp `.glass-floating` pill FISSIONS into islands with a goo neck (dock-gallery Call tile / app-switcher referencing `#dock-fission-goo`; liquid-playground ISLAND split) — reads the bloom correctly with the 0.2 fade-floor legible.*

| # | criterion | how verified | result |
|---|-----------|--------------|--------|
| 1 | dual-engine, both modes | badge decode + GL_RENDERER probe | **PASS** — Chrome Metal M5 Max + Safari Apple GPU, light+dark |
| 2 | rest-state ONE crisp `.glass-floating` pill (goo OFF) | DOM at rest: `.dock-fission-bridge` `filter:none`, `data-fissioning` absent, `--dock-split-t:0` | **PASS** — crisp pill, goo off at rest |
| 3 | dock-gallery Call tile / app-switcher reference `#dock-fission-goo` | `#dock-fission-goo` GooFilter present; 2 bridges / 5 pieces; Call-tile bridge `filter:url("#dock-fission-goo")` | **PASS** — DRY onto ONE `#dock-fission-goo` |
| 4 | liquid-playground ISLAND split → goo neck | island mode + scrub `--dock-split-t=0.62`: bridge `filter:url("#dock-fission-goo")`, 2 blob pieces, pill FISSIONS into "Timer" + "Now Playing" islands with a goo neck | **PASS** — bloom reads correct, both modes |
| 5 | 0.2 fade-floor legible (W1 rail-facet) | facet carousel fanned: `--dock-facet-tier-opacity` min = **0.20** / max = 1.0, 16 chips, 8 distinct accents, box-INVIOLATE fan | **PASS** — receding facets legible, NOT 0 |
| 6 | every capture PNG resolves on disk | 14 PNGs, all 2880×1800, non-trivial bytes | **PASS** |

### Device-free gate `proof:dock-fission` (already GREEN, corroborated)
- F1 substrate-via-`useDockSpring` factory · W1 fade-floor `railProjection.DEFAULT_GEOMETRY.fadeMinAlpha = 0.2` (≥0.15 legible) · W2 spring routed through `useDockSpring` (no own `new SpringProgress`) · W3 DRY onto ONE `#dock-fission-goo` · W4 wired to `GlassDock :splittable`.
- **Live corroboration:** the painted `--dock-facet-tier-opacity` min = 0.20 exactly matches the source `fadeMinAlpha` floor; the composited bridge `filter` resolves `url("#dock-fission-goo")` under the `[data-fissioning]` ancestor gate on both engines.

---

## Measurements (Chrome CDP computed-DOM)

**Rest (static capture):** `.dock-fission-bridge` → `filter:none`, `opacity:1`, `data-fissioning:absent`, `--dock-split-t:0`. `#dock-fission-goo` present. dock-gallery: 2 bridges / 5 pieces. liquid-playground default mode `expand` → island host not mounted at rest (correct; `v-if="mode==='island'"`).

**ISLAND split driven (both modes):**
- `--dock-split-t = 0.62`, bridge `filter = url("#dock-fission-goo")` (the `[data-fissioning]` ancestor gate engaged), 2 `.dock-fission-piece` blobs (opacity 1). Pill visibly fissions → "Timer / Laundry · 8:24" + "Now Playing / Shiro Sagisu" goo-necked islands.

**FACET carousel fade-floor (both modes):**
- 16 `.dock-facet-chip` (8 horizontal + 8 vertical dock), fan `is-expanded` on core hover.
- `--dock-facet-tier-opacity`: **min 0.20 / max 1.00** — the receding φ-tier facets clamp at the legible 0.2 whisper, never 0 (the C-DOCK "fade to 0" defect is structurally closed).
- 8 distinct `--glass-accent` hues (the `--section-color-*` ramp); active facet on the selected-as-glass tier. Fan rides the `#rail` gutter, dock box unchanged (box-INVIOLATE).

**Gallery Call tile:** the Dynamic Island · Call pill (bridge `filter:url("#dock-fission-goo")`) shows the two goo-necked segments (info + controls) referencing the ONE goo mount; tap toggles the real `useDockFission` spring (settles fast — the frozen mid-neck frame is the liquid-playground scrubber's job).

---

## Gestalt guardrails

- **Recessive backdrop / no conic / no oversaturation:** the `[data-glass-field]` warm stage is a SMOOTH warm gradient — NO conic banding, NO aurora GL artifact. It is a strongly-warm orange (the demo's deliberate "field warms toward the album's color" stage, demo-local, presets-in-consumers). Not a fission-wave surface; no conic/banding defect. (Observation, not a defect: the field saturation is a demo-backdrop design choice orthogonal to this wave's `useDockFission` + `fission-bridge.css` src.)
- **Grain calm:** no disco grain; calm register. PASS.
- **Hero fits envelope:** "Liquid Morph" / "Dock Gallery" titles fit their envelope, no overflow, both modes. PASS.
- **Dark register:** luminous-dark transmissive material — near-black page, warm-lifted ink, colorful tiles + goo-necked islands read; not a dead void. PASS.

---

## Capture inventory (all resolve on disk, 2880×1800)

Static (provenance + rest gestalt):
- `BG.W-DOCK-FISSION-WIRE-paint/chrome-dock-gallery-{light,dark}.png`
- `BG.W-DOCK-FISSION-WIRE-paint/chrome-liquid-playground-{light,dark}.png`
- `BG.W-DOCK-FISSION-WIRE-paint/safari-dock-gallery-{light,dark}.png`
- `BG.W-DOCK-FISSION-WIRE-paint/safari-liquid-playground-{light,dark}.png`

Driven (the fission bloom + fade-floor truth):
- `BG.W-DOCK-FISSION-WIRE-paint/chrome-island-split-{light,dark}.png` — split-t=0.62 goo-necked Timer + Now Playing islands
- `BG.W-DOCK-FISSION-WIRE-paint/chrome-facet-fan-{light,dark}.png` — the fanned facet carousel, min tier-opacity 0.20
- `BG.W-DOCK-FISSION-WIRE-paint/chrome-gallery-call-fission-{light,dark}.png` — the Call-tile goo-necked fission pill

**VERDICT: PASS.** Cursor row 4.5 flipped `PAINT-PENDING → DONE`.
