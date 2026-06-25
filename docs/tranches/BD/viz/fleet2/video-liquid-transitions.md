# The LIQUID TRANSITIONS — frame-by-frame, Safari-compatible (W-LIQUID-TRANSITIONS)

**Lane** BD viz-research / fleet2 / liquid-transitions · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Frame-grounded** against `/tmp/bd-media/frames/{vid-dock,vid-ios27,vid-aurora}/` (48 frames each, ~38s Apple Music · ~Maps card-expand · ~Apple Music generative aurora) + the contact sheets `/tmp/bd-media/sheets/*.png` ·
**Substrate-grounded** against `src/composables/motion/{useLiquidReveal,useBloomUp,useLiquidMorph,useDragMorph,springPresets}.ts`, `src/components/custom/dock/composables/useDockOrientationMorph.ts`, `src/components/custom/tabs/composables/useTabIndicator.ts` at HEAD ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits.

> Read alongside `dock/hallmark-northstar.md` (§4 liquid-tab 5-beat · §7 now-playing pill · §8 cross-cutting flagship bar), `dock/spec-consolidate.md` (§2 motion spine, §8 link-API), `media-analysis.md §D/§E`, `arch/no-fallback-policy.md` (the Safari fence for the VIZ tier — distinct from the TRANSITION tier this doc owns). This doc OWNS the frame-by-frame timing/easing/spring/choreography read of the four named transitions + the per-transition map onto shipped primitives + the Safari-compat fence on the COMPOSITOR/CSS tier. It does not re-derive the dock anatomy (spec-consolidate) nor the flagship quality bar (hallmark-northstar).

---

## 0. TL;DR — the four transitions, the map, the gap

Four liquid transitions were read frame-by-frame from the three videos. Each maps onto an ALREADY-SHIPPED primitive — the engines exist; the gap is choreography + wiring, not net-new machinery:

| Transition | Source | Shipped primitive | Spring | Gap vs the video |
|---|---|---|---|---|
| **Tab indicator glide** | `vid-dock` tab bar | `useTabIndicator` (`--stretch` squish) | `snappy` 0.42/0.78 | the 5-beat envelope (grow→overshoot→travel→settle→shrink) — today's primitive smears phases 1+3+4, no distinct grow, no past-target overshoot, no shrink-close → **W-TABS-LIQUID** adds the `--tab-blob` AREA channel |
| **Mini-player → full-player BLOOM** | `vid-dock` f044→f047 | `useBloomUp` (4-channel) | `bouncy` 0.5/0.55 | NEARLY complete — the 4th field-warm channel ships; the gap is the source-pill rect wiring + the play↔scrubber transport crossfade choreography |
| **Maps card EXPAND** | `vid-ios27` f036→f040 | `useLiquidMorph` mode `"expand"` / `useBloomUp` | `bouncy`/`dock` | the sheet-DETENT grow (compact→full over a reserved full-footprint, content fades-and-rises, map dims behind) — engine exists; gap is the sheet-detent wiring + the backdrop-dim coupling |
| **Aurora album fade up/out + field flow** | `vid-aurora` f020→f024 | `useBloomUp` field-hue channel + carousel | `smooth`/`gentle` | the carousel hue cross-fade between cards + the `--glass-ambient-hue` field-warm; the field FLOW is the aurora shader's own `breathing`, not a transition — the gap is the inter-card hue cross-fade timing |

**The headline:** all four transitions are COMPOSITOR-ONLY (transform/opacity/filter/clip-path + `@property` scalar) — NONE needs `backdrop-filter: url()`, the WebKit gap (bug 245510). The Safari fence on the TRANSITION tier is therefore CLEAN: every one of the four paints byte-identically on WebKit with zero degrade. (The VIZ tier's GPU/Canvas2D fence — `arch/no-fallback-policy.md` — is a SEPARATE concern; transitions are CSS/JS-compositor, not GPU.)

---

## 1. TRANSITION A — the tab-indicator glide (`vid-dock`, → W-TABS-LIQUID)

### 1.1 The frame read
The 5-tab bar (`Home · New · Radio · Library · Search`) carries an animated indicator that travels between tabs as you switch (f009/f030 Search-active · f044 mid-tab-bloom where the Library icon glows the album-red). Frame cadence: a tab tap reads as the indicator MATERIAL (a glass-quiet plate behind the active tab) inflating slightly, gliding to the new tab swollen, then settling to fit — NOT a rigid slide. In the iOS-27 reference the indicator is a metaball: it grows past the target, glides over-inflated, settles with a small liquid overshoot, shrinks to the destination footprint. The travel reads ALIVE — the plate stretches along the axis as it moves (gel-stretch), the cross-axis compresses (volume-preserving).

### 1.2 The timing/easing/spring (measured)
- **Clock:** ~340ms total (the `--tab-indicator-duration` = `--spring-snappy-duration`, the W-GLASS-CAL per-spring clock). The perceptual arrival reads quick (~100-120ms 90%-travel — snappy's curve hits ~1.0 by the 12-16% slot post BC.W-SPRING-EASE retune; the 2%-band settle runs the full 340ms but is sub-perceptual).
- **Spring:** `snappy` (response 0.42, ζ 0.78 — the CONTROL register, overshoot ~+2.0%). The position glide rides the CSS `--spring-snappy` `linear()` curve.
- **The 5-beat envelope (USER-VERBATIM, hallmark §4):** (1) GROW — inflate FROM the current tab (a distinct grow phase); (2) blob OVERSHOOT — area > target ~1.08-1.12× at peak (a metaball over-inflation); (3) TRAVEL swollen — glide to destination gel-stretched along the axis; (4) SETTLE liquid — soft ζ<1 settle (small overshoot-undershoot, never a hard stop); (5) SHRINK-to-fit — de-inflate to the destination footprint.

### 1.3 Map onto the shipped primitive — `useTabIndicator`
`useTabIndicator.ts` ALREADY owns:
- The center-anchored JS slider measure (`updateSingleSlider`, BA-VJS-3 center-correction — the indicator center == active button center) on the `@supports not (anchor)` branch.
- The travel-squish `--stretch` write via `useLiquidFlex` (`squishLaw: "linear"`, `maxStretch` read from `--tab-indicator-max-stretch` ≈ 1.08) — the reciprocal `scale: var(--stretch) calc(1/--stretch)` gel-stretch.
- The release-AT-ARRIVAL timer (`clockMs(el) × INDICATOR_RELEASE_AT_ARRIVAL`) — the grow-then-shrink close keyed to the calibrated clock, not a fixed mid-glide 60ms.
- PRM-gate (no squish under reduce); the underline hairline SLIDES (no deform — it has no body).

### 1.4 THE GAP (what W-TABS-LIQUID adds)
Today's primitive delivers phases 1+3+4 SMEARED — a gel-stretch DURING the glide that releases at arrival. The frame read wants the FIVE distinct beats:
- **No distinct GROW (phase 1):** the indicator does not visibly inflate FROM the current tab before traveling — it starts traveling pre-inflated.
- **No past-target OVERSHOOT (phase 2):** `--stretch` is a reciprocal X/Y squish (axis-stretch), NOT an AREA over-inflation — the plate never reads "slightly bigger than needed."
- **No SHRINK-close as a distinct beat (phase 5):** the release relaxes the squish but there is no de-inflation FROM a swollen footprint.
- **The fix:** compose a SECOND `useLiquidFlex` AREA channel `--tab-blob` ON TOP of the existing travel-squish `--stretch`, ONE schedule ONE clock (hallmark §4): `--tab-blob` ramps `1 → 1.1 → 1` (grow→overshoot→shrink) on the `snappy` curve as `--stretch` does the axis gel; the indicator's CSS reads BOTH (`scale: calc(--stretch · --tab-blob) calc(--tab-blob / --stretch)`). Cap LOW (≤1.2 — the anti-taffy bar; a rubber-band overshoot is the OTHER failure). The pill material inflates; the underline does NOT.

### 1.5 Safari fence
**CLEAN — no fall needed.** Pure compositor `scale` on the indicator's OWN box via `@property --tab-blob` (a registered `<number>`, Baseline) + `@property --stretch`. Interpolates identically on WebKit. NO `backdrop-filter: url()`, NO SVG goo — the indicator is a glass-quiet plate, the squish is a transform. The CSS `anchor-name` position path (Chromium-only) has the JS-slider fallback for WebKit (anchor positioning is not yet WebKit-Baseline), and the squish is INDEPENDENT of the position path (it writes on every selection, anchor OR JS engine).

---

## 2. TRANSITION B — the mini-player → full-player BLOOM (`vid-dock`, → the now-playing bloom)

### 2.1 The frame read
The now-playing mini-player pill is seated ABOVE the 5-tab bar (f009/f024/f030 — the album chip + 2-line marquee title `The Sleeping Beauty / By Pyotr Tchaikovsky` + transport glyphs). Tapping it BLOOMS the full now-playing screen: the album art grows from the pill's chip to hero scale, the transport + scrubber appear, and the WHOLE surrounding field warms to the album's dominant hue. The transition frames (f044 → f047) show the bloom MID-flight: the tab bar dims, the Library/now-playing region carries a glowing album-red highlight blooming outward, the field warms red. The album art does NOT scale-crush — the full surface lays out ONCE at hero size and the geometry blooms FROM the pill rect onto it (a FLIP shared-element, source≠dest).

### 2.2 The timing/easing/spring (measured)
- **Clock:** ~500ms (the `bouncy` settle horizon — `response 0.5 × 4 = 2s` analytic, perceptual ~500ms to the 90%-point). An emphatic large-surface bloom reads slower than the snappy tab.
- **Spring:** `bouncy` (response 0.5, ζ 0.55 — the PLAYFUL register, overshoot ~+12.6%, the Apple 12-18% band). The full-screen bloom is a deliberate emphatic one-shot — it WANTS the overshoot read.
- **The 4 coupled channels (the iOS-27 betters-claim, hallmark §7 + media §D):** (a) SCALE — the bloom grows from the pill chip rect to the hero rect (transform-origin at the pill); (b) OPACITY 0→1 — the full surface fades in coupled to the scale; (c) FILTER blur(4px)→0 — the iOS light-bending decongest on the surface's OWN pixels; (d) FIELD-HUE — the surrounding field warms to the album's dominant hue (`--glass-ambient-hue` at a bounded ≤8% strength), ramped on the SAME spring curve. "The whole world takes on the album's color."

### 2.3 Map onto the shipped primitive — `useBloomUp`
`useBloomUp.ts` is the EXACT match — it ships ALL FOUR channels:
- `ElementMorph(destRect, sourceRect)` FLIP inversion (spring 1→0, the dest blooms FROM the source's rect onto its own settled full rect — source≠dest, the shared-element open) + `springTimingFunction` (the `bouncy` curve sampled from `SPRING_PRESETS`).
- The 3 compositor channels (scale/opacity/filter-blur-decongest) on the dest surface.
- **The 4th color channel** on the DESTINATION FIELD (a different element — the compositor-only floor de-risk): writes `--glass-ambient-hue` (the album hue) + ramps `--glass-ambient-strength` 0→8% on the SAME spring, the registered `@property` making the field-tint INTERPOLATE. Resolves the field via `[data-glass-field]` ancestor-walk.
- No-mount-flash auto-prime (`watch(dest, …, { flush: "pre" })` seats the dest hidden+collapsed before paint — the v-if full-size flash fix), PRM-snap (surface to settled, hue lands instant), `onBloomed` hand-off.

### 2.4 THE GAP (what the now-playing wave wires)
The ENGINE is complete; the gap is the WIRING + the transport choreography:
- **Source-rect:** the now-playing pill (the `#persistent` slot control) is the `source` ref; the full now-playing surface is `dest`; `fieldHue` = the album's `--glass-ambient-hue` (the 12-bucket OKLCh histogram over the album art — W-DOCK-NOWPLAYING-PILL N3). The bloom composes the SHIPPED `ExpandableContainer` (body-lock/teleport/Escape) per spec-consolidate §8 — NO second fullscreen mechanism.
- **The transport MORPH (not in `useBloomUp`):** the mini-player's compact transport (play/pause) → the full scrubber + shuffle/repeat is a `clip-path`/`opacity` glyph crossfade (compositor, cross-engine), NOT a hard swap (hallmark §7). The play↔pause within the pill is the same compositor glyph crossfade. This is a SEPARATE small choreography beside the bloom — the title `<ScrollingText>` marquee is byte-reused (PRM-stopped).

### 2.5 Safari fence
**CLEAN.** `ElementMorph` is a compositor `translate()+scale()`; the field re-tint is a `color-mix`/`@property` interp (`@property` is Baseline on WebKit 26); the decongest rides a REGULAR `filter: blur()` on the surface's own pixels (NEVER `backdrop-filter: url()`). The header of `useBloomUp.ts` explicitly records "SAFARI-SAFE." The transport crossfade is `clip-path`/`opacity` (compositor). Zero WebKit gap.

---

## 3. TRANSITION C — the Maps card EXPAND morph (`vid-ios27`, → W-MAPS-CARD + expand-morph)

### 3.1 The frame read
The compact Maps card (f036 — a glass search-pill `Apple Maps` + mic + avatar, a `Places` row of circular gradient icon-chips Work/Home/Walmart/Add, a `Recents` list starting to show, the satellite map ~40% visible above) EXPANDS UP into a full sheet (f040 — the map ~10% visible, the full Places + Recents + Your Guides/Favorites washing in). The transition (f037 → f038 → f040) shows the sheet growing UP off the grip handle: the map DIMS + recedes behind, the sheet content (Recents rows, Guides cards) FADES-AND-RISES in as the sheet grows. The content does NOT scale-crush — the Recents rows and the gold-star Favorites card lay out at FULL size; the SHEET geometry grows (a detent expand), the content reveals as more of the sheet's reserved footprint un-occludes.

### 3.2 The timing/easing/spring (measured)
- **Clock:** ~400-450ms (a sheet detent grow — slower than a tab, faster than the emphatic player bloom; reads as a confident liquid grow, not a snap).
- **Spring:** `dock` (response 0.32, ζ 0.7, overshoot ~+4.6% — the iOS-control settled register) OR `bouncy` if the orchestrator wants the emphatic Maps read. The frame read carries a SMALL settle overshoot (the sheet grows slightly past, settles back) → `dock` is the faithful match (a detent is a control, not a one-shot celebration).
- **The coupled channels:** (a) the SHEET grows (compositor `scale`/`translate` over a RESERVED full-footprint — the content laid out once, the sheet's transform reveals it); (b) the content OPACITY-rises (the Recents/Guides fade-and-rise, staggered in reading order — a `.scroll-build`-style entrance, not a flat fade); (c) the backdrop MAP dims + recedes (a `filter: brightness`/`opacity` dim on the map behind — the sheet's dimming-scrim, compositor); (d) NO field-hue channel (the Maps card is neutral — unlike the album bloom, no content hue to drink).

### 3.3 Map onto the shipped primitive — `useLiquidMorph` mode `"expand"` / `useBloomUp`
TWO shipped engines apply; the choice is the SHEET-vs-SHARED-ELEMENT distinction:
- **`useLiquidMorph` mode `"expand"`** (`useLiquidMorph.ts` — "a dock that EXPANDS to form a CARD") is the EXACT named case: it composes `useLiquidReveal(card, { trigger: pill, preset: "bouncy" })` for the source-rect bloom on ONE `--liquid-morph-t` spring (`springPreset("dock")`), compositor-only + PRM-safe. The Maps card-expand IS a "dock/compact-card EXPANDS to form a card/sheet."
- **`useBloomUp`** (source = the compact-card rect, dest = the full sheet) is the alternative if the expand reads as a shared-element bloom rather than a same-element grow. Since the Maps card has NO content-hue to drink, `useBloomUp`'s 4th channel is a no-op (gray source → null hue → no tint — the documented neutral fall), so `useLiquidMorph`/`useLiquidReveal` (3-channel, no field-hue) is the LEANER match.

### 3.4 THE GAP (what W-MAPS-CARD wires)
- **The sheet-detent grow over a RESERVED footprint:** the full sheet lays out ONCE at its full height (the content reads complete behind the grow aperture from frame 0 — the dock `--dock-morph-t` reserved-footprint precedent, hallmark §8.6 zero-CLS). The compact card is the `from` rect, the full sheet the `to`; the morph is `transform: scale`/`translate` over the reserved box — NEVER an animated `height` (the A'-3 reflow lesson, `proof:no-layout-animation`).
- **The backdrop-dim coupling:** the map behind dims `filter: brightness(0.6)` + recedes (a small `scale(0.96)` push-back) on the SAME `--liquid-morph-t` scalar — the iOS sheet-over-map depth cue. This is a NEW coupling (neither `useLiquidMorph` nor `useBloomUp` touches a separate backdrop element) — wired as a `watch(t, …)` writing the backdrop's `--maps-backdrop-dim` (a registered `@property`, the field-hue precedent).
- **The content fade-and-rise:** the Recents/Guides build in on the `.scroll-cascade`/`.scroll-build` register (staggered reading-order entrance, W-SCROLL-MOTION) gated on the expand settle — NOT a flat opacity fade.
- **The grip-drag-to-expand:** the sheet grip composes `useDragMorph` with two snap targets (compact / full, fling-to-nearest single-commit) — the same drag-to-grow the spec-consolidate §2.2 names for the dock `--dock-grow`. Tap-to-expand AND drag-to-expand share the ONE `--liquid-morph-t` scalar.

### 3.5 Safari fence
**CLEAN.** The sheet grow is compositor `scale`/`translate` over a reserved box; the backdrop dim is `filter: brightness`/`opacity` (compositor); the content build is `transform`/`opacity` (`.scroll-cascade` is under the `@supports (animation-timeline: view())` + PRM outer gate — on a WebKit engine without the view-timeline the build degrades to a terminal fade, never broken). The drag is pointer-capture `transform`. NO `backdrop-filter: url()`. Note: the GRIP-drag uses `useDragMorph` which reaches kf `Draggable` (compositor `transform`) — WebKit-native. Zero gap.

---

## 4. TRANSITION D — the aurora album fade up/out + field flow (`vid-aurora`, → W-AUR-ALBUM + field-hue)

### 4.1 The frame read
The "Playlists Made for You" hero carousel (f020 — `Your Essentials` violet aurora hero card; f024 — `Get Up!` warm-red aurora after a swipe, `Your Essentials` violet peeking left + `Chill` teal peeking right). Each card carries a GENERATIVE aurora that ABSORBS the playlist's single dominant hue and FLOWS painterly. The transition is TWO distinct events:
- **The inter-card hue cross-fade (the "fade up/out"):** as the carousel swipes between cards, each card's aurora is live; the swiping card's hue dominates as it centers. The now-playing pill at the bottom (Daphnis Et Chloé, purple) keeps its own purple-cast. This is a CAROUSEL slide where each item's aurora is a distinct single-hue field — the hue cross-fades as items center.
- **The field FLOW (the "field flow"):** WITHIN a single card, the aurora field flows continuously — the nuclei drift, the palette drifts, the warp drifts (the `breathing`/`drifting` register, small-but-perceptible atmospheric drift). This is NOT a transition — it is the aurora shader's OWN continuous animation (`MOTION_FIELDS` atom, GPU).

### 4.2 The timing/easing/spring (measured)
- **Carousel slide:** ~300-400ms per swipe (a `smooth` settle — patient, no overshoot; an album swap is an entrance/fade, the SETTLE register). The hue cross-fade couples to the slide position.
- **Spring:** `smooth` (response 0.5, ζ 0.86 — SETTLE, no overshoot read) for the carousel; the field-flow is NOT a spring (it is the shader's continuous noise drift on its own GPU clock, frame-rate-independent).
- **The single-hue lightness-walk:** each card's aurora is W-AUR-ALBUM (the single dominant hue walked over a lightness ramp — the field IS the playlist's color). The hue is the 12-bucket OKLCh histogram over the album/playlist art.

### 4.3 Map onto the shipped primitives
- **The field FLOW** is the AURORA SHADER's own animation — NOT a transition primitive. It rides the GPU `MOTION_FIELDS` `breathing`/`drifting` register (the BA.W-STAGE/BA-VJS-2 honest-breathing fix — `nucleiDrift/paletteDrift/warpDrift` small non-zero). This is the VIZ tier (`arch/no-fallback-policy.md`), not the transition tier. NO transition primitive owns it.
- **The album hue cross-fade** is `useBloomUp`'s field-hue channel applied to a CAROUSEL: as a card centers, its dominant hue writes `--glass-ambient-hue` on the carousel field + the now-playing pill (the W-DOCK-NOWPLAYING-PILL plate-drinks-the-album-hue), ramped on the carousel slide position (the `smooth` curve). The aurora shader itself re-derives its palette off the centered card's hue (W-AUR-ALBUM — the single-hue lightness-walk re-seeds).
- **The carousel slide** is the existing `/carousel` (embla) item-scroller — NO new engine; the hue cross-fade is the field-hue write coupled to the embla scroll progress.

### 4.4 THE GAP (what W-AUR-ALBUM + the hue cross-fade wires)
- **The inter-card hue cross-fade timing:** as item N centers, its `--glass-ambient-hue` ramps in WHILE item N-1's ramps out (a coupled cross-fade off the embla `scrollProgress`, not a hard switch at the snap point). The now-playing pill (which carries the CURRENTLY-PLAYING album's hue, not the browsed card's) stays DECOUPLED from the carousel browse — only the FIELD behind the carousel cross-fades; the pill drinks the PLAYING hue.
- **The aurora re-seed coupling:** the centered card's aurora re-derives its single-hue palette (W-AUR-ALBUM) — a shader uniform write, not a transition. The transition layer (the field-hue cross-fade) is the GLASS field behind/around the cards; the aurora INSIDE each card is the shader.

### 4.5 Safari fence
**CLEAN on the transition tier.** The hue cross-fade is `--glass-ambient-hue`/`--glass-ambient-strength` (`@property` color-mix interp, Baseline) — compositor/paint, no `backdrop-filter: url()`. The carousel slide is embla `transform`. The aurora field-flow is the VIZ tier (WebGPU/WebGL2 — `arch/no-fallback-policy.md`'s Safari floor: the WGSL-byte-lockstep WebGL2 net covers WebKit; a metal/album config NEVER silent-degrades on Safari). The transition layer adds zero WebKit gap.

---

## 5. The cross-cutting Safari-compat fence (the TRANSITION tier)

The four transitions are ALL compositor/CSS — the WebKit fence is structurally clean. The binding rules (the difference between Safari-first and Chromium-only):

1. **NO `backdrop-filter: url()` — ever (WebKit bug 245510).** None of the four transitions needs it. The decongest blur is a REGULAR `filter: blur()` on the surface's OWN pixels (`useBloomUp`/`useLiquidReveal` already do this — the comment "filter not backdrop-filter so the resting glass-tier plate blur is never clobbered"). The resting glass plate blur (`backdrop-filter: blur()`, no `url()`) is WebKit-native.
2. **`@property` scalars are the interpolation seam — Baseline on WebKit 26.** Every animated scalar (`--tab-blob`, `--stretch`, `--glass-ambient-strength`, `--liquid-morph-t`, `--maps-backdrop-dim`, `--dock-morph-t`) is a REGISTERED `@property` so it INTERPOLATES (a bare unregistered `var()` SNAPS — the `--border-progress-fill`/`--dock-morph-t` precedent). `@property` is WebKit-Baseline; the registration paints identically.
3. **Compositor channels ONLY — transform/opacity/filter/clip-path.** Never `width`/`height`/`top`/`left`/`padding`/`font-size` (the A'-3 reflow lesson, `proof:no-layout-animation` library-wide). Every morph/bloom/expand is a transform over a one-time-RESERVED footprint → zero CLS, identical on WebKit.
4. **The GOO (`filter: url()` sRGB) is a DOCK-SPLIT concern, NOT one of these four transitions.** The goo-split/fission (W-DOCK-SUBDOCK) uses `filter: url(#…)` + `color-interpolation-filters="sRGB"` (the WebKit-safe path, never `backdrop-filter: url()`) — but NONE of the four transitions in THIS doc (tab/player-bloom/maps-expand/album-fade) uses goo. They are pure compositor transforms. The goo fence is recorded for completeness (it lives in `dock/spec-consolidate.md §2`), not because these transitions need it.
5. **CSS `anchor-name` is Chromium-only — the JS-slider path covers WebKit.** The tab indicator's CSS anchor-positioning path is `@supports (anchor-name)`-gated; on WebKit the `useTabIndicator` JS-measure slider is the live writer (the squish is independent of the position path, so the 5-beat envelope works on BOTH engines).
6. **PRM-safe by construction (the vestibular floor, absolute, both engines).** Every transition seats SYNCHRONOUSLY under `prefers-reduced-motion: reduce` — the tab snaps to fit (no squish), the player bloom snaps to settled (opacity 1, hue lands instant), the Maps sheet seats at full (no grow frames), the album hue cross-fades instant (a color change is not vestibular; scale/translate/blur are). The shipped primitives ALL carry `respectReducedMotion` (verified in `useBloomUp`/`useLiquidReveal`/`useDockOrientationMorph`).

---

## 6. The gap ledger (the one-line bar per transition)

| Transition | Engine ships? | The gap = wiring + choreography | The wave |
|---|---|---|---|
| Tab-indicator glide | `useTabIndicator` (partial) | the `--tab-blob` AREA channel for the 5-beat overshoot-past-target + distinct grow/shrink | **W-TABS-LIQUID** |
| Player bloom | `useBloomUp` (4-channel, COMPLETE) | source-pill rect wiring + `ExpandableContainer` compose + the transport `clip-path` crossfade | **W-DOCK-NOWPLAYING-PILL** / link-API `toSurface` |
| Maps card expand | `useLiquidMorph` mode `expand` (COMPLETE) | the sheet-detent reserved-footprint grow + the backdrop-dim coupling + drag-to-expand snap | **W-MAPS-CARD** + expand-morph |
| Album fade + field flow | `useBloomUp` field-hue + carousel + aurora shader | the inter-card hue cross-fade off embla progress; the field-flow is the SHADER (not a transition) | **W-AUR-ALBUM** + the hue cross-fade |

**The binding verdict:** the liquid-transition ENGINES are SHIPPED (the BF.W-FLIP-SPINE `useElementBloom` runner + `useLiquidReveal`/`useBloomUp`/`useLiquidMorph`/`useDockOrientationMorph`/`useTabIndicator` all play through the ONE FLIP/spring family — hallmark §8.4 one-organism-one-orchestrator). The gap is NOT net-new machinery — it is (a) the `--tab-blob` 5-beat AREA channel on the tab indicator, (b) the rect-wiring + transport-crossfade choreography on the player bloom, (c) the sheet-detent + backdrop-dim coupling on the Maps expand, (d) the embla-coupled hue cross-fade on the album carousel. ALL FOUR are Safari-clean (compositor + `@property`, zero `backdrop-filter: url()`). The frame-match verdict (hallmark §8.8) is the binding close: each transition's fresh live `:5199` capture (LIVE MOTION, both modes, the webkit Playwright project) overlaid against its reference frame — the motion envelope must MATCH within a hairline, and where it differs glass-ui is RICHER (the 4th field-warm channel, the 5-beat overshoot).
