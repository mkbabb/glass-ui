# Dock + generative-viz integration — the hallmark dock composing the redeveloped viz suite (BD viz-research)

**Lane** BD viz-research / dock-integration · **Status** PLANNING/RESEARCH 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Scope** RESEARCH ONLY — zero `src/` edits. THIS doc is the binding artifact for the dock↔viz seam; the waves that execute it are the BD union's Band-2 (DOCK INTEGRATE) + Band-6 (AURORA) + Band-7 (CARDS/CONTROLS) rows, NOT re-specced here — this doc is the JOINING analysis.

> Read alongside: the dock waves (`docs/tranches/BD/union/waves/BD.W-DOCK-{NOWPLAYING-PILL,SUBDOCK,CONSTELLATION,GOO-SPACING,LINK-API}.md` + `BF.W-{DOCK-INTEGRATE,FLIP-SPINE,FISSION-FILAMENT}.md` + `BE.W-DOCK-FISSION.md`), the album-aurora wave (`BD.W-AUR-ALBUM.md`), the blob research (`../research/blob.md` — the goo-split engine source), the shared-field engine (`../arch/shared-field-engine.md`), and `ORCHESTRATOR-NOTES.md` §"The DOCK = the now-playing pill" / §"The DOCK north-star (vid-dock)".

---

## 0. TL;DR — the finding, and the one-sentence thesis

The user's hallmark — *the now-playing dock over a LIVE album-reactive aurora, goo-splitting via the metaball engine, the dock as the control-interface for the vizzes* — is **already fully specced as five Band-2 + two Band-6/7 waves**, and the JOIN between them is the missing analysis this doc supplies. Three integration seams carry the whole hallmark, each a COMPOSITION of shipped engines (no new engine, no fifth rAF — the SEED §3 binding fence):

1. **Dock-over-live-field** — the `<DockNowPlaying>` deep-glass pill (W-DOCK-INTEGRATE) floats over an `<Aurora>` whose palette is *derived from the playing album art* (W-AUR-ALBUM `deriveAuroraPalette`), and the pill's PLATE drinks the album's dominant hue (W-DOCK-NOWPLAYING-PILL via `--glass-fill-tint` off `--glass-ambient-hue`). The aurora ↔ pill share ONE hue source (the hoisted `hueHistogram.ts` leaf, W-HUE-HISTOGRAM-HOIST) — the field and the glass breathe the same color.
2. **Goo-split via the metaball engine** — the now-playing media controls goo-SPLIT off the core dock (W-DOCK-INTEGRATE `useDockFission` + W-FISSION-FILAMENT spanning neck) and re-seat as a PERSISTENT bottom sub-dock (W-DOCK-SUBDOCK), the merge governed by ONE threshold token (`--dock-goo-spacing`, W-DOCK-GOO-SPACING). The goo is the **WebKit-safe SVG `filter: url()` path** (`DockGooFilter.vue` + `color-interpolation-filters="sRGB"`) — the SAME smin/threshold idiom the blob's metaball field uses, but as a CSS filter on glass plates, NOT a re-mount of the blob shader (the architectural distinction in §3).
3. **Dock-as-viz-control-interface** — the `useDockLink` facade (W-DOCK-LINK-API) turns the dock into the control surface for the vizzes: `toSurface` blooms a viz configurator FROM a dock control, `silhouette`/`split` reconfigure the dock for the active viz context, and the dock's own facets (`<DockStack mode="facets">`) drive the viz palette/seed.

**Thesis:** the dock IS the hallmark precisely because it COMPOSES the redeveloped viz suite through three already-shipped seams — the album→aurora→glass hue spine, the metaball→goo-split→sub-dock organism, and the `useDockLink` viz-control facade — each a verb over the ONE FLIP spine + the ONE histogram leaf + the ONE goo threshold, never a parallel system.

---

## 1. The reference north-star (vid-dock = Apple Music iOS-27, frame-by-frame)

From `media-analysis.md` §D + `ORCHESTRATOR-NOTES.md`. The Apple Music app is the dock hallmark — every observed move maps to a shipped/specced glass-ui seam:

| Observed (Apple Music iOS-27) | glass-ui seam | Wave |
|---|---|---|
| Bottom tab bar (Home/New/Radio/Search/Library), indicator animates between tabs | `<SegmentedTabs>` 5-phase liquid indicator | W-TABS-LIQUID (T5) |
| Now-playing mini-player seated ABOVE the tab bar (`.tabViewBottomAccessory`) | `<DockNowPlaying>` stadium pill in the `#persistent` slot + the bottom-accessory re-seat | W-DOCK-INTEGRATE (T2) · W-DOCK-SUBDOCK (T2) |
| Mini-player album thumb + marquee title + transport, tappable-while-collapsed | the leading art-chip + `<ScrollingText>` marquee + SF-symbol play↔pause morph | W-DOCK-NOWPLAYING-PILL (T7) |
| Mini-player EXPANDS into the full now-playing screen (album grows, scrubber appears) | the pill→card bloom via `useLiquidReveal` + `<ExpandableContainer>` | W-DOCK-INTEGRATE §3 (the bloom-to-fullscreen) |
| The now-playing accessory goo-splits off the tab bar | `useDockFission` `media`=lateral signature + the spanning neck | W-DOCK-SUBDOCK · W-FISSION-FILAMENT (T4) |
| Each playlist carries a generative aurora absorbing the playlist's color, flowing | `deriveAuroraPalette(albumArt)` single-hue lightness-walk + cross-fade | W-AUR-ALBUM (T6) |
| Dark-glass throughout | the W-DARK-MATERIAL luminous-transmissive dark register (shipped, BA) | — (baseline) |

The dock is NOT a new component — it is `<DockNowPlaying>` (the integrate SFC) resting as the `[home·now-playing·search]` three-island CONSTELLATION (W-DOCK-CONSTELLATION) over a live `<Aurora>` (DockStage demo seam, presets-in-consumers), the whole thing one living organism on the ONE silhouette orchestrator (`useDockContextSilhouette`).

---

## 2. Seam 1 — the dock over the LIVE album-reactive aurora (the hue spine)

The headline: a now-playing pill that floats over an aurora whose color IS the playing album, and the pill's glass plate drinks that same color. Three already-specced waves, ONE shared hue source — the analysis is how they JOIN.

### 2.1 The single hue source — `hueHistogram.ts` (W-HUE-HISTOGRAM-HOIST, T1)

The whole spine hangs off ONE 12-bucket OKLCh chroma×alpha-weighted hue histogram (`accumulateHuePixel`/`resolveAmbientHue`), today buried in `useGlassBackdropLuminance.ts:179-221`. W-HUE-HISTOGRAM-HOIST (Band-1 consolidate) hoists it to `src/composables/color/hueHistogram.ts` BEFORE the two consumers read it (the DAG sequences T1 before T6) — so the live backdrop observer AND the one-shot album extractor re-import the ONE leaf (no dual binning copy — the `proof:single-color-core` no-dual-path discipline). **This is the load-bearing integration prerequisite:** without the hoist, the aurora-palette extractor and the pill-tint sampler would each fork the histogram, and the field's hue and the glass's hue would drift.

### 2.2 The album → aurora palette (W-AUR-ALBUM, T6)

`deriveAuroraPalette(albumArt, { mode: "single-hue" })` (`aurora/composables/albumPalette.ts`) downsamples the album art to 32×32, bins it through the SHARED `hueHistogram.ts` accumulator → the dominant `{L,C,h}`, hands it to the SHIPPED `deriveAurora(seed, { harmony: "monochrome" })` for the coherent single-hue lightness-walk ramp (deep album-hue base → near-white cream apex). On protagonist change the palette CROSS-FADES (W-SEED-MORPH's `useLiquidFlex` scalar over `interpolateHue("shorter")`, re-uploading via the runtime `update(cfg)` per breathing tick — no hard cut, no second engine). Calm-ceiling: the `motion` atom caps at `breathing`, never `drifting`.

### 2.3 The pill plate drinks the album hue (W-DOCK-NOWPLAYING-PILL, T7)

The pill's PLATE tints to the album's dominant hue via `--glass-fill-tint` (the W-TINTED-CHIP per-instance plate-bg axis) sourced off `--glass-ambient-hue` (the W-AMBIENT-TINT sampler reading the SAME hoisted histogram). Ravel-purple album → purple aurora field AND purple pill plate. The pill is `surface="clear"` (W-CLEAR-VARIANT — the 4th surface-axis member, genuinely translucent over the live field) with its MANDATORY luma-derived legibility scrim (a `::before` so the marquee title stays AA over the busy aurora).

### 2.4 The JOIN — one hue, three surfaces

```
album art ──drawImage──▶ hueHistogram.ts (the ONE leaf, T1)
                            │
              ┌─────────────┼──────────────────────┐
              ▼             ▼                        ▼
   deriveAuroraPalette   --glass-ambient-hue   (the live backdrop
   (W-AUR-ALBUM, T6)     (W-AMBIENT-TINT, T6)   observer, shipped)
              │             │
              ▼             ▼
   <Aurora> field      --glass-fill-tint on the pill plate
   (the FIELD is        (W-DOCK-NOWPLAYING-PILL, T7 —
    the album)           the PLATE is the album)
```

**Integration fence (the trap the analysis surfaces):** the aurora field and the pill plate read the SAME hue but compose it on DIFFERENT axes — the field re-derives its whole `palette` (a single-hue ramp), the pill tints only its plate-bg (`--glass-fill-tint`, a per-instance fill). They must NOT both write `--glass-tint-source` (the W55 legibility axis) — the pill's tint is its OWN fill register (W-TINTED-CHIP is DISTINCT from the rim `--glass-accent` AND the W55 legibility darken). The "one hue, three reads" must stay three DISJOINT axes off one source, never a shared write target. (The cross-origin album-art read wraps `getImageData` in a `SecurityError` catch → falls to the warm-cream default palette; the Safari tainted-canvas fall, W-AUR-ALBUM C7.)

### 2.5 The presets-in-consumers boundary

The album palette + the immersive register live in the CONSUMER (`demo/stories/` `useAuroraProtagonist(mediaRef)` — mount `<Aurora>` only when a media protagonist is present, the one-GL-context-per-route budget). NO library token absorbs the album hue (the warm-cream identity holds — W-AUR-ALBUM C7). The library ships `deriveAuroraPalette` + the cross-fade + the `--glass-fill-tint` axis; the album fixture + the demo wiring are the consumer's.

---

## 3. Seam 2 — the goo-split using the metaball engine (the dock organism)

The now-playing controls goo-split off the core and re-seat as a persistent sub-dock. The critical architectural finding: **the dock goo is NOT the blob's metaball shader re-mounted — it is the SAME smin/threshold IDIOM expressed as a WebKit-safe CSS SVG filter on glass plates.** Two distinct metaball realizations, one shared mental model.

### 3.1 The two metaball realizations (the distinction that keeps it DRY without over-coupling)

| | The blob viz (`../research/blob.md`) | The dock goo-split |
|---|---|---|
| **Where** | a `<canvas>` WebGL2/WGSL fragment field | a CSS `filter: url(#dock-fission-goo)` over glass-plate DOM nodes |
| **Math** | per-fragment IQ `smin` SDF field, analytic gradient → lit normal | SVG `feGaussianBlur` + `feColorMatrix` alpha-threshold (the classic gooey-CSS trick) |
| **Engine** | `useMetaballRenderer` + `metaball.wgsl.ts`/`.frag.ts` over `useGpuSubstrate` | `DockGooFilter.vue` + `fission-bridge.css` driven by `useDockFission`'s `--dock-split-t` |
| **Safari** | WGSL/GLSL floor (WebKit-26) | REGULAR `filter: url()` + `color-interpolation-filters="sRGB"` (the WebKit-safe path; NOT `backdrop-filter: url()` which is WebKit bug 245510) |

**Why two, not one (the architectural rationale):** the blob viz needs lit normals + refraction + the dome-Z (a full SDF field). The dock goo needs only the *visual* merge-and-part of two glass PLATES (real DOM nodes carrying their own `backdrop-filter` blur + content). A blob-shader re-mount would (a) require rendering the dock controls' live glass into a texture every frame (the per-frame DOM-sample cost), and (b) lose the real backdrop-filter bleed-through the glass identity needs. The CSS SVG-goo is the correct, cheaper, WebKit-safe realization for plate-merge. **They share the IDIOM (smin/threshold merge) and the THRESHOLD KNOB (`--dock-goo-spacing` ↔ the blob's `uSmoothK`), not the engine.**

### 3.2 The split → spanning neck → persistent sub-dock chain

1. **The split** (W-DOCK-INTEGRATE + BE.W-DOCK-FISSION): `useDockFission` carves the media controls into N free-floating `.dock-fission-piece` nodes on `--dock-split-t` 0→1; the `media`=lateral signature peels the now-playing center.
2. **The spanning neck** (W-FISSION-FILAMENT, T4): a body-anchored goo FILAMENT spans the gap (gap-sized `feGaussianBlur` peak + `neckHold` dwell + n>2) — the split reads as liquid plate-fission, not a disc flying off. The neck runs stretch→tense→snap.
3. **The merge threshold** (W-DOCK-GOO-SPACING, T4): ONE `--dock-goo-spacing` token (default `1.875rem` ≈ Apple `spacing: 30`) gates blend-vs-discrete — the goo engages while the inter-piece gap is WITHIN the threshold, decouples beyond it. This is the SwiftUI `GlassEffectContainer(spacing:)` analogue. The constellation gutter + the sub-dock re-seat gutter both READ it (the ≥2-reader bar).
4. **The persistent re-seat** (W-DOCK-SUBDOCK, T2): a `persistent: true` piece does NOT auto-merge — at full separation it RE-SEATS as a standing `<DockStack>` (the abstract bottom sub-dock) on the kept `.glass-dock-frame` non-clipping escape, the core dock MINIMIZES beside it (the iOS-26 `.tabViewBottomAccessory` re-seat). The neck SNAPS at re-seat (the standing sub-dock is plain glass, not tethered).

### 3.3 The blob's lava-lamp model informs the goo-split FEEL (the one harvest)

`../research/blob.md` §3 (the procedural lava-lamp: buoyancy envelope + ring-buffer spawn lifecycle, the Damian van der Merwe reference). The dock goo-split is a *deterministic* gesture (not free-running), so it does NOT adopt the lava-lamp sim — but the SHAPE of the split (a swell→stretch→part→settle envelope) mirrors the lava-lamp birth→rise→split→dissolve the blob harvests. The shared mental model: a metaball relationship that ALWAYS reads (the blob's satellite never floats as an unrelated disc; the dock's split-off accessory never reads as a detached pill until the neck snaps). The `--dock-goo-spacing` knob is the dock's twin of the blob's `uSmoothK` worst-case-orbit widen (`BA.W-GOO-REDRESS` — the band always reads the relationship).

### 3.4 Compositor + Safari + PRM (the three fences, all satisfied by the spec)

- **Compositor-only:** the split is `transform`/`opacity`/`filter` on a reserved footprint; the re-seat is a compositor translate on a reserved box; the minimize is the shipped collapse scalar. `proof:no-layout-animation` holds.
- **Safari:** the goo is `filter: url()` (sRGB, WebKit-safe); the sub-dock is `.glass-floating` own-blur; the re-seat is `position: absolute` in the non-clipping frame (the backdrop-stacking-context trap audited — the frame carries no `contain`/`backdrop-filter`, W-SAFARI-STACKING-AUDIT).
- **PRM:** under reduce the split + re-seat seat SYNCHRONOUSLY (the orchestrator's `prefersReducedMotion()` sync-seat — the accessory appears at its re-seated slot in one frame, no detach travel).

---

## 4. Seam 3 — the dock as the control-interface for the vizzes (the `useDockLink` facade)

The dock is the control surface for the generative vizzes. The `useDockLink` facade (W-DOCK-LINK-API, T2) is the KISS verb layer that makes this a composition, not a per-viz wiring.

### 4.1 The four verbs (each delegates to a shipped engine — no re-fork)

- **`toSurface(controlRef, surfaceRef)`** → composes `useLiquidReveal` — blooms a foreign surface FROM a dock control's rect. **Viz use:** a dock control blooms the viz's CONFIGURATOR (the per-viz controls column the BD mandate requires for every viz) from the control's rect — the configurator grows out of the dock button, not a separate panel pop.
- **`receive(ctaRef, controlRef)`** → composes `useDockCtaReceive` — morphs an external CTA INTO a dock control (the inverse bloom). **Viz use:** a viz's "save this seed/palette" CTA flies INTO the dock and congests into a control (the seat reserves).
- **`split(signature)`** → delegates to `useDockFission().split()`. **Viz use:** the dock reconfigures its silhouette for the active viz context (a viz mode splits the dock's control groups).
- **`silhouette(toId)`** → delegates to `useDockContextSilhouette().setSilhouette()`. **Viz use:** the dock morphs its resting silhouette per the active viz/route (`bar+pill` for now-playing, `search` for the viz-gallery search, `split` for a viz mode).

The handle-boundary fix is load-bearing for the viz integration: `useDockLink` takes the fission/silhouette handles as EXPLICIT options (`useDockLink(dockRef, { fission, silhouette })`), NEVER through `defineExpose` or a `[data-reka-*]` internal-selector reach (the reka-binding silent-no-op trap — MEMORY `feedback_glass_ui_binding_verification`). The content ref for the trigger blooms forwards through reka's documented `:ref`.

### 4.2 The dock facets DRIVE the viz config (`<DockStack mode="facets">`)

`<DockStack mode="facets">` (BE.W-DOCK-RAIL-REALIZE, shipped) renders a CONTEXT CAROUSEL of facet-chips, each carrying its own `--glass-accent` hue, writing a consumer-owned `v-model:selected`. **Viz use:** the facet chips ARE the viz's palette/seed/preset selector — selecting a facet writes the viz config (the `useConfiguratorState<AuroraConfig>` `cloneMode="per-preset"` the aurora chrome already binds, per the Configurator contract). The dock's `--dock-goo-spacing` merge threshold + the per-facet accent hue mean the viz-control rail reads as ONE liquid organism, the active viz facet lit on the selected-as-glass `--dock-control-active-bg` tier.

### 4.3 The link-scalar census (the living discoverability)

W-DOCK-LINK-API C5 maintains a LIVING census over every `--dock-*-t`/`--dock-*-gutter`/`--dock-goo-*`/`--neck-t`/`--dock-grow` scalar in `src/styles/dock/` (`src/components/custom/dock/README.md`). The viz-control scalars (`--dock-goo-spacing` for the facet-rail merge, `--dock-split-t` for the viz-mode split, `--dock-silhouette-fuse-t` for the viz-context morph) enroll automatically — so a future viz-control scalar can never silently orphan.

---

## 5. The integration DAG — what lands when (the build order)

The dock↔viz hallmark is NOT a single wave — it is the convergence of three tiers. The build order (from `EXECUTION-DAG.md`):

```
T1 CONSOLIDATE
  W-FLIP-SPINE          (the ONE bloom runner every dock+viz bloom plays through)
  W-HUE-HISTOGRAM-HOIST (the ONE hue leaf the aurora + pill + observer read)  ◀── seam-1 prereq

T2 DOCK INTEGRATE
  W-CLEAR-VARIANT       (surface="clear" for the pill over the live field)
  W-DOCK-INTEGRATE      (<DockNowPlaying> + fission/goo/bloom in a real SFC)   ◀── seam-2 + bloom host
  W-SILHOUETTE-REALIZE  (the silhouette state-machine useDockLink drives)
  W-DOCK-CONSTELLATION  (the resting [home·pill·search] the split carves out of)
  W-DOCK-SUBDOCK        (the persistent sub-dock re-seat; neck-π born-RED-until-T4)
  W-DOCK-LINK-API       (the useDockLink viz-control facade)                   ◀── seam-3

T4 DOCK FIDELITY
  W-FISSION-FILAMENT    (the spanning neck — SUBDOCK's neck-π flips GREEN here)
  W-DOCK-GOO-SPACING    (the --dock-goo-spacing merge threshold)

T6 AURORA
  W-AMBIENT-TINT        (--glass-ambient-hue off the hoisted histogram)
  W-AUR-ALBUM           (deriveAuroraPalette — the field IS the album)         ◀── seam-1

T7 CARDS/CONTROLS
  W-TINTED-CHIP         (--glass-fill-tint plate axis)
  W-DOCK-NOWPLAYING-PILL (the pill plate drinks the album hue)                 ◀── seam-1 terminus

T8 SAFARI FLOOR
  W-GOO-SPLIT-PERF      (re-captures the real-Metal p50 AFTER the fidelity waves
                         make the goo heavier — the final goo cost, not the pre-fix number)
```

**The two gate-split forward edges (the acyclicity the DAG already resolved):** (a) `W-DOCK-SUBDOCK` re-seats the CORE at T2 but its spanning-neck-π is born-RED-until-`W-FISSION-FILAMENT`(T4) — the persistent sub-dock paints its convincing neck only once the spanning neck lands; (b) `W-DOCK-GOO-SPACING` lands the token (C1/C2/C4/C6) at T4 but its ≥2-reader clauses are born-RED-until CONSTELLATION+SUBDOCK read it. Both are FORWARD edges — no back-edge, the graph is a DAG.

---

## 6. The open integration questions (for the prototype/critique loop)

1. **The aurora-pill hue LATENCY.** When the protagonist changes, the aurora cross-fades slowly (breathing clock, W-AUR-ALBUM) but the pill's `--glass-ambient-hue` samples the LIVE backdrop at ≤4Hz (the observer). Do they stay in sync mid-cross-fade, or does the pill lag the field? RESOLUTION CANDIDATE: the pill should read the album's dominant hue DIRECTLY (the one-shot `deriveAuroraPalette` dominant-hue output), not the live observer — so the pill and field re-derive off the SAME one-shot extraction, in lockstep, and the observer stays the GENERIC backdrop-legibility path. To validate in the prototype.
2. **The goo-split over the LIVE aurora — does the SVG goo composite correctly against a moving backdrop?** The `filter: url(#dock-fission-goo)` operates on the glass PLATES (own pixels), not the aurora behind — so it should be backdrop-agnostic. But the plates carry `backdrop-filter` blur OF the aurora; confirm the goo-merge of two backdrop-blurred plates reads correctly (the W-SAFARI-STACKING-AUDIT fence — a transformed ancestor must not kill the plate's own backdrop-filter). To validate on real Safari (W-GOO-SPLIT-PERF).
3. **The facet-rail-as-viz-control — does the per-facet accent hue collide with the album-pill hue?** Two hue events on one dock (the album-pill plate + the per-facet accent rim). RESOLUTION CANDIDATE: they are DISJOINT axes (plate `--glass-fill-tint` vs rim `--glass-accent`) and the one-color-event proportion (`proof:suffuse`) governs — the pill is the protagonist color event, the facets are the secondary rim accents. Confirm the proportion reads (the prototype gestalt).
4. **The metaball IDIOM-sharing — does `--dock-goo-spacing` want to share a named constant with the blob's `uSmoothK`?** They are different units (a CSS length vs a shader smin-K) but the same mental model. DECISION: keep them DISJOINT (different realizations, §3.1) — sharing a literal would over-couple the CSS-filter path to the GL-shader path. Record the conceptual twinning in the link-scalar census comment, not a shared token.

---

## 7. The fences carried (every integration leg honors the SEED charter)

- **No-legacy / clean-break** — W-AUR-ALBUM supersedes W-AUR-REACTIVE's hue-bias re-seed (no dual re-seed path); the goo binding moves off the demo CSS onto the shipped `fission-bridge.css` (W-DOCK-INTEGRATE §2).
- **Idiomatic / no re-fork** — every seam COMPOSES: the aurora reads the SHIPPED `deriveAurora`, the goo is the SHIPPED `useDockFission`, the bloom is the ONE FLIP spine, the facade delegates to the shipped orchestrators. NO fifth rAF.
- **KISS + DRY** — ONE hue source (the hoisted histogram), ONE goo threshold (`--dock-goo-spacing`), ONE bloom runner (`useElementBloom`), ONE link facade (`useDockLink`).
- **Compositor-only** — every dock+viz motion is transform/opacity/filter/clip-path on a reserved footprint; `proof:no-layout-animation`.
- **Safari-first (ABSOLUTE)** — the goo is REGULAR `filter: url()` + sRGB; the aurora is the WGSL/GLSL floor; the pill is own-blur glass; the stacking-context trap audited.
- **≥2-consumer** — `<DockNowPlaying>` + the `GlassDock` fission seam (goo); the aurora-protagonist demo + the now-playing field (album); the now-playing-pill + the facet-rail (the link facade).
- **Presets-in-consumers** — the album palette + the immersive register + the facet hues live in the consumer; the library defaults evolve as identity.
- **Foreign-tree fence** — zero sibling-tree edits; the speedtest/slides adopt the published cut on their own bump.
