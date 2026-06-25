# BD union — birthdaycolor.com glass audit (distilled)

Reference: https://www.birthdaycolor.com — a generative **color-field SPA** (client-rendered; the color IS the page). Technique class (high-confidence genre, exact bundle unread — SPA + no browser): a THREE.js WebGL **Perlin-noise-displaced blob + two-color gradient fragment shader**, calm morph/crossfade on date selection, **Pantone color-card** UI (swatch + hex + Japanese name + keywords), subtle **grain**. NOT glassmorphism — its strength is the generative color field + calm morph + grain.

## How glass-ui BESTS it (compose shipped primitives, no re-fork)
glass-ui ships a **superset**: `<Aurora>` (WebGPU-first nuclei-field + painterly mediums) ⊃ their color field; `<GooBlob>` (SDF metaball + smin merge + satellites) ⊃ their single Perlin blob; the `/color` OKLCh **shorter-hue** leaf ⊃ their sRGB `mix()`; the grain `::after` (pop-free) ⊃ their grain; PLUS the entire **glass material system they lack**.

## The 4 genuine BD waves (all compositions, not engines)
1. **W-BD-COLOR-CARD** — *the headline best.* A Pantone **GLASS** color-card (`<ColorSwatch>` + hex + name + keywords on `surface="veil"` over a LIVE Aurora field — the `<ShowcaseFrame tier="field">` precedent). Their card is opaque; ours floats as liquid glass over the live color.
2. **W-BD-COLOR-PROTAGONIST** — a thin `<Aurora :seed="color">` "the page IS this color" register (the date→seed ritual; compose Aurora, no new viz).
3. **W-BD-SEED-MORPH** — aurora seed→palette transition (OKLCh shorter-hue, no hard cut) on `onFlipSettled` / `useLiquidFlex`. Bests their `mix()` crossfade perceptually.
4. **W-BD-CONTROL-GLASS** — close the last "glass-for-every-element" PARTIAL: an explicit glass-track register for switch/checkbox/radio + a calm single-color breathing preset (presets-in-consumers).

## Glass-for-every-element coverage (the law)
SHIPPED: buttons · cards · inputs/textarea/number-field · selects/dropdowns/menus/command/context-menu · tabs · chips · dock+controls · dialogs/sheets/drawers/popovers · toast/notification/alert · progress/border-progress. SHIPPED-by-exemption (opaque allowlist): avatar/label/separator/skeleton/table/loud-badge. PARTIAL→wave: sliders/switch/checkbox glass-track (W-BD-CONTROL-GLASS), the Pantone glass color-card (W-BD-COLOR-CARD). GAP→wave: the color-protagonist register (W-BD-COLOR-PROTAGONIST). **Verdict: glass-ui already exceeds birthdaycolor's per-element coverage; the additions are the 4 waves above.**

## ⚠ THE ABSOLUTE SAFARI FENCE (load-bearing for EVERY goo/glass wave)
**Every goo/refraction stays on the SHADER (WebGPU/WebGL) or own-pixel `filter:` path — NEVER `backdrop-filter: url(#…)` (WebKit bug 245510, broken in Safari).** Any SVG goo (the CSS metaball trick) MUST set `color-interpolation-filters="sRGB"` (WebKit defaults linearRGB → the alpha-threshold goo breaks). `feDisplacementMap` backdrop refraction is WebKit-unreliable → keep `@supports`-gated, never the sole path (W-LENSING precedent). Prefer the SHADER goo (`metaball.wgsl`/`.frag`) over SVG goo for Safari fidelity.

### Safari-26 status (the moves in play)
✓ WebGL2 · WebGPU (26+, falls to WebGL2) · `backdrop-filter: blur()` · `filter: blur()` (own pixels — `.glass-reveal` uses this) · SVG goo as `filter:` (iff sRGB) · `@property` (16.4+; `initial-value` is the safe rest) · `color-mix`/`oklch` · scroll-driven `scroll()/view()` (26; `@supports`-gated) · `mask-composite` conic (+`-webkit-` companion) · `startViewTransition` (18+).
✗ `backdrop-filter: url()` (245510) · `feDisplacementMap` backdrop (unreliable) — both already `@supports`-gated in glass-ui; no wave may regress.

## Follow-up (before fidelity-lock)
Capture birthdaycolor.com live with a connected browser (DevTools Network→bundle, Elements→canvas/grain) to confirm the `[INFERRED]` shader/grain/morph specifics. The genre technique + the best-it map are solid regardless.
