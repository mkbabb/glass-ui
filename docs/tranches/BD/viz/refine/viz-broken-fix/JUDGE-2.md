# JUDGE-2 — W-VIZ-BROKEN-FIX (iteration 2)

**Verdict: PASS.** Live-verified via chrome-devtools-mcp on `http://localhost:5173` (path-routed SPA, dpr 2, Chrome). All three named-broken vizzes RENDER correctly, the configurators are LIVE, the cursor-follow is wired, the watercolor ghost outline traces the seeded blob path, and the D5 blocker (hero text scrolling on every page) is DECISIVELY closed. Zero shader/WebGPU console errors on any of the three pages.

---

## Live evidence (computed + visual)

### (1) /substrates/blob — the metaball + ghost-outline + hero-scroll

**Metaball render — RENDERS (not "broken totally").** Canvas backing **1536×1536** (768 client × dpr2) — NOT the 300×150 stuck-buffer class. Pixel readback: 357 painted px, avg color **rgb(226,186,132)** = warm amber/gold — luminous warm-cream, NO gray. Screenshot: a clean lit gold droplet with merged satellite dimples (the metaball smin merge reads). The Studio configurator (Calm/Excited/Shy presets, Attraction/Click-impulse/Responsiveness sliders, Mood select) is live + unobstructed.

**WatercolorDot ghost outline — TRACES THE PROPER PATH (the verbatim defect closed).** The "ghost register" row shows solid-LEFT / ghost-RIGHT pairs: each `2px dashed` ghost outline carries an 8-value superellipse `border-radius` IDENTICAL to its solid swatch (verified: solid dot `60.9072% 43.6223% 21.9287% 59.7097% / 65.2026%…` == its ghost). NOT a `50%` circle, NOT a CSS dashed rectangle — the dashed outline follows the organic blob silhouette. The old `<ellipse rx=46>` is gone (4 `.watercolor-ghost-stroke` divs, each distinct).

**Hero scroll (D5, the JUDGE-1 blocker) — DECISIVELY FIXED.** At main-scroller scrollTop 700: hero cluster `position: relative` (NOT sticky), title rect top **-572 / bottom -315** (fully scrolled OFF above the viewport), **canvas-overlap 0%** (was 22.8% sticky-stuck at opacity 1.0). The leave-fade frame-series confirmed earlier holds (opacity 1→0 + translateY lift over the scroll() window, compositor-only). The viz owns the viewport.

### (2) /substrates/goo-dot — the HYBRID render + config

**Renders (not "totally broken").** Canvas backing **2066×920** (1033×460 × dpr2) — not stuck. The dot-matrix metaball cloud reads exactly as spec: dense+bright warm-amber dots in the merged core (glowing center), sparse+dim at the rim — "the goo blob drawn as a dot matrix." Avg painted color rgb(177,139,99) = warm amber. Zero console errors.

**Config drives the render LIVE.** Clicking `dot-sphere` switched the active variant + visibly changed the dot arrangement (field-thickness gradient → even sphere lattice). Variant buttons (dot-field/dot-dither/dot-lattice/dot-sphere) + interactive/paused switches all live (the D2 renderConfig-Proxy + deep wake-watcher architecture).

### (3) /substrates/fourier-field — cursor-follow + config

**Renders + warm palette.** Canvas backing **1246×1042** (correct). Epicycle reconstruction draws in warm rose/orange/peach (not gray). Zero console errors.

**Cursor-follow — WIRED.** Canvas `pointer-events: none`; host `.fourier-field--interactive` `pointer-events: auto` (the velocity-scrub architecture). A dispatched pointer sweep CHANGED the canvas render (frame-hash 4289985736 → 1814996193); idle tip-drift 2px vs scrubbing 5px (the velocity scrub accelerates the head). The numeric pixel-tip readback is unreliable (WebGPU/WebGL premultiplied-transparent drawImage), but the hash-change + host wiring + visual prove the follow responds.

**"These options do not even work" — FIXED (the verbatim defect closed).** 7 live sliders. Harmonics(N) slider keyboard-incremented 5→6 and the status updated **"N 4/16" → "N 6/16 playing"** with the epicycle reconstruction visibly changing. The "Dense reconstruction" preset click jumped Harmonics(N) 6→14 (the preset live-rebinds the whole config). The configurator is fully wired to the render.

### The clean DISJOINT split (no-legacy)

Content page `/forms/inputs`: `.story-hero-shrink` present + `position: sticky` (the iOS large-title collapse KEPT where it belongs); NO `.story-hero-scroll-away`. Viz/hero pages: `.story-hero-scroll-away` `position: relative` (scrolls off), NO sticky. Clean disjoint twin register, no alias, no back-compat shim.

---

## North-star compliance

- **Warm-chroma floor (BA.W-NO-GRAY).** Gold blob (rgb 226,186,132), warm-amber goo-dot cloud (rgb 177,139,99), rose fourier curve. NO gray cast on any viz body.
- **Liquid-weight.** The hero scroll-leave is an inertial opacity+lift feather, not a hard clip.
- **Compositor-only / PRM-carved / Safari.** Native `scroll()` timeline + `@supports`+PRM gate, opacity+translateY only; static plain-flow fallback under reduce.
- **Idiomatic / no legacy.** Disjoint `.story-hero-scroll-away` register; renderConfig Proxy + deep wake watcher; ghost reads the same `activeBorderRadius` seed superellipse the solid dot fills.

## Refinements (non-blocking, NOT required to pass)

- The viz demo card plate behind the blob reads as a neutral light-gray panel (the demo `tier`, not the viz body) — the BLOB itself is warm; if a future pass wants the viz to float over the live page substrate, `tier="field"` (BG-2) would drop the plate. This is a demo-chrome preference, not a defect in the named-broken vizzes.
- Numeric WebGPU canvas pixel-readback stays premultiplied-transparent (drawImage limitation) — config/cursor verification is necessarily visual + frame-hash + DOM-state, which is sufficient and was applied.

**Net.** Every verbatim user defect is closed and live-proven: blob metaball renders (warm gold), ghost outline traces the seeded blob path, goo-dot hybrid renders + config-live, fourier cursor-follows + config-options-work, and the hero text no longer scrolls/overlaps on viz pages. PASS.
