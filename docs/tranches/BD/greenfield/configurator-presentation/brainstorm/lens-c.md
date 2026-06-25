# lens-c — the CONFIGURATOR-PRESENTATION, greenfield (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> LENS: maximum 1940s-technicolor FLOW & PUNCH — bold layered-offset cartoon
> shadow, exaggerated squash/stretch/morph, anticipation→follow-through→
> overlapping-action→arcs, real weight & inertia; the boldest variant that stays
> idiomatic + cross-engine.
>
> BINDING LAW (design.md + GREENFIELD-HARDENING §1; IOS27-REFERENCE the guiding
> light): perfected warm-cream six-layer transmissive glass (NEVER gray, both
> modes, BA.W-NO-GRAY floor) · §3 = a COLOURFUL FIELD behind glass + a defined
> edge · PAPER morphism visible · AUDACIOUS √φ type · CARTOON shadow + FLOW &
> PUNCH · LIQUID-WEIGHT UNIVERSAL (inertia/bounce/squish on ALL motion, morph
> MORE on move, never tight/springy) · ARISTOTELIAN φ proportion · METABALLING
> PERFECT Chrome AND Safari (static SVG goo, sRGB interp, NO `backdrop-filter:url`,
> compositor-only, @supports/PRM floors) · DEFT UNION, KISS/DRY, NO LEGACY.

---

## 0 · LIVE INTERROGATION — born-RED, source-verified (`/substrates/aurora`, both modes)

Navigated `http://localhost:5173/substrates/aurora`, screenshotted, `getComputedStyle`'d,
clicked presets, read console. The four user asks confirmed AT THE PIXEL:

### 0.1 The gallery is CRAMPED (ask 1 + 2) — measured

The preset gallery (`PresetPickerRow`) lives INSIDE the right-hand `configurator-aside`,
a `minmax(280px, 360px)` band (`configurator.css`). Live numbers:

| measure | value | verdict |
|---|---|---|
| stage width | **703.6px** | the field dominates |
| aside width | **360px** (the cap) | the controls + gallery share this sliver |
| preset row width | **359px** | the gallery is as wide as the aside |
| card width | **200px** each | × 13 presets = 2600px of content |
| **cards visible at once** | **2 of 13** | the user's "too SMALL / cramped" — LITERAL |
| preset row height | 245px | the row eats a quarter of the aside before a single control |

So the gallery is **a 2-card peephole pinned to the narrow right rail**, scroll-clipped
to 7% of its content, sitting ABOVE the controls inside the same 360px column. The user
wants the inverse: **gallery LARGER + UP-TOP (full studio width) + horizontally
scrollable + collapse-to-dock**; the configurator is "too small" precisely because the
gallery is stealing its vertical budget inside a too-narrow column.

### 0.2 NONE of the presets RENDER (ask 3) — the ROOT CAUSE, console-confirmed

Every one of the 13 preset cards renders the `<Skeleton variant="shimmer">` loading
state FOREVER — `imgCount: 0`, `skeletonCount: 13`. The screenshot shows grey
vertical-gradient dead cards labelled "Sky", "Dawn", … — no aurora preview at all.
The console gives the smoking gun:

```
[Aurora] thumbnail bake aborted: Error: [useWebGPUCanvas] device not acquired
```

**The bug, traced in source:**
- `usePresetThumbnails.ts:74` calls `createAurora(shared, …, { mode: "capture" })`.
- `runtime.ts:62,71` — **`mode: "capture"` FORCES `initStrategy: "eager"`**, and eager
  means "`createAurora` ARMS SYNCHRONOUSLY before returning."
- On the **WebGPU backend** the device acquisition is **async** (`armAsync`,
  `runtime.ts:139-148`, `useWebGPUCanvas.ts`). A synchronous eager arm on WebGPU
  therefore THROWS `device not acquired`.
- That throw lands in the `try/catch` at `usePresetThumbnails.ts:73-81` → the catch
  removes the canvas and **`return`s**. The `await aurora.armAsync()` at line 90 — the
  line whose comment claims it fixes the dead-card defect — **is never reached** because
  the throw is at the `createAurora` *call*, one statement before it.
- Net: the bake aborts on statement 1, `thumbs.value[key]` stays `""` for ALL keys, the
  `v-if="thumbs[key]"` never flips, all 13 cards skeleton forever.

This is the user's "**NONE of the presets render**", exactly. It is a **born-RED** init-
ORDER bug: capture pinned `mode:"capture"` (→ eager → sync arm → WebGPU throw) instead
of `initStrategy:"deferred"` + an awaited `armAsync()`.

### 0.3 The presets DO apply (ask 3, the other half) — wiring is sound

Clicking a preset (`selectPreset` → `useConfiguratorState.selectPreset` → the per-preset
clone copied onto `studio.config`) genuinely re-drives the live stage: a click on
Speedtest flipped the aside header from `5 stops · 4 nuclei` → `6 stops · 6 nuclei` and
`aria-pressed=true`. So the **APPLY path works; only the RENDER (thumbnail) is dead.**
The user perceives "none render AND work" because a dead grey card that gives no preview
reads as broken even when the click lands. **Fix the render, and the apply is already
there.** (One caveat surfaced: a stray click can bubble to a route nav — guard the card's
click so it never escapes to the router; a `type="button"` + `@click.stop` discipline.)

### 0.4 Warm-glass + liquid (ask 4) — the aside reads GRAY-DRIFTING, the gallery is INERT

The `configurator-aside` over the warm Dawn field reads acceptably warm at the panel,
but the **preset cards are `bg-card` opaque rectangles** (`PresetPickerRow` line 68:
`bg-card`), not the transmissive warm-cream six-layer glass — so once baked they'd be
flat plates, not glass thumbnails seated over the §3 field. And there is **zero liquid
motion** in the gallery: the cards carry a static `shadow-cartoon` + a `hover:-translate`
nudge + an `aria-pressed` inset ring — **no squish, no morph, no goo, no entrance, no
collapse**. It is the OPPOSITE of liquid-weight-universal. (Band-0 motion absent.)

### 0.5 Generalize (ask 5) — aurora is the ONLY studio wired; the pattern is HALF-DRY

`grep`: `VizStudio` + `PresetPickerRow` + `usePresetThumbnails` are consumed by
**aurora ONLY** (`demo/stories/substrates/aurora.vue`). `VizStudio` (the shared chassis)
already standardizes stage-left / controls-right via the library `<Configurator>`, but
the **preset GALLERY is a per-viz fork** (`PresetPickerRow` is aurora-bespoke; the
`<Configurator>` default preset row is a tiny text-chip `role=tablist`). Other studios
(blob, concentric, fourier) either have no gallery or a different chip row. There is **no
ONE configurator-presentation pattern** — the gallery placement, the thumbnail bake, the
collapse behaviour are not shared. The user's "the other configurators should function
similarly" is a real DRY gap.

**Summary of born-RED:** (1) gallery 2-of-13 cramped in the 360px rail; (2) thumbnails
100% dead (WebGPU eager-arm throw); (3) apply works; (4) cards opaque/inert, no liquid;
(5) pattern aurora-only, not generalized.

---

## 1 · THE GREENFIELD CORE — the GALLERY *IS* a collapse-to-dock, and it RIDES `useDockHub`

The user said it almost verbatim: *"the GALLERY should be LARGER, up top, scrollable, and
COLLAPSE INTO a glass DOCK … reuse the dock — the dock-as-hub/dock-core collapse."* The
dock-hub GOLDEN already shipped the spine for exactly this:
`useDockHub.toSurface(control, surface, {topology})` is **surface-TYPE-blind** and
`<DockExpand topology>` is the declarative skin (dock-hub/GOLDEN §1). **The configurator
gallery is a first-class CONSUMER of that spine — no new collapse engine.**

### 1.1 The new presentation shape — `<VizStudioGallery>` (the ONE pattern, DRY)

Restructure the studio from **[stage-LEFT | aside-RIGHT(gallery-on-top-of-controls)]** to:

```
┌──────────────────────────────────────────────────────────────┐
│  ▸ GALLERY RAIL — full studio width, UP TOP, horizontally     │  ← the headline change
│    scrollable, LARGE thumbnail cards (φ-tall), collapse-to-dock│
├───────────────────────────────────────────┬──────────────────┤
│                                            │                  │
│   STAGE  (the live field, flex-1, now      │   CONTROLS aside │  ← controls now own the
│          TALLER — it reclaims the vertical │   (the FULL       │     full aside height
│          the gallery used to steal)        │   ConfiguratorLayer
│                                            │   stack, larger) │
└───────────────────────────────────────────┴──────────────────┘
```

- **Gallery UP TOP, full width.** The gallery is lifted OUT of the 360px aside into a
  full-studio-width rail above the stage+controls row. At 703+360 = ~1080px wide it shows
  **~5 large cards** instead of 2, horizontally scrollable (the shipped `<FadingScroll
  axis="x">` — sharp at rest, feather on overflow, the existing primitive), momentum-snap
  with ±neighbour peek (IOS27 T13: momentum YES, snap-bounce NO).
- **The gallery COLLAPSES INTO a glass DOCK.** A header chevron (or scroll-past
  threshold) runs `hub.silhouette(collapsed)` — the full gallery rail **goo-morphs down
  into a single floating glass DOCK PILL** seated bottom-center of the studio frame
  (margins all round, transmissive — IOS27 T16 floating island), showing the ACTIVE
  preset's thumbnail + label + a `⌄` re-expand affordance. Click the pill → the gallery
  **erupts back UP** (`hub.toSurface(pill, galleryRail, {topology:'envelop'})`, the
  dock-hub goo-tear §2). One spring, one scalar, bidirectional, interruptible.
- **The configurator GROWS.** With the gallery gone from the aside, the controls reclaim
  the full aside height (no more 245px gallery tax) AND the aside band widens (the
  `asideWidth` prop already exists, default 280/360 → bump to 320/420 for the studio
  case). The configurator is no longer "too small."

### 1.2 Why this is a UNION, not a fork (DEFT, KISS)

| presentation need | EXISTING primitive consumed | new code |
|---|---|---|
| collapse-to-dock | `useDockHub.silhouette` + `<DockExpand topology="envelop">` (dock-hub GOLDEN, shipped spine) | ZERO — the gallery is a consumer |
| the goo-tear re-expand | `useElementMorph` + `fission-bridge.css` necks + `--dock-portal-t` | ZERO — inherited from the hub |
| horizontal scroll + peek | `<FadingScroll axis="x">` + `snap-x` (shipped) | ZERO |
| the collapsed pill = a glass dock | `<GlassDock>` recursively (the hub's self-similarity) | ZERO |
| the full-width rail layout | `<Configurator>` gains a `galleryPlacement="top"` axis | ONE prop + a CSS arm |
| the thumbnail bake | `createAurora` deferred + `armAsync` | the BUG FIX (§3) |
| generalization | `VizStudio` already the shared chassis; add the gallery slot to it | ONE chassis edit, all studios inherit |

The collapse-to-dock is **literally the dock-hub `envelop` topology with the gallery as
the consumer surface** — the user's "reuse the dock" satisfied with zero new machinery.

---

## 2 · THE SINGLE BOLDEST MOVE — the CARTOON PRESET-SWAP "DEAL & SHUFFLE": cards squash-cascade, the chosen one ERUPTS to fill the stage, the gallery COLLAPSES in its wake

This is the technicolor-punch payload that makes the generalized gallery feel hand-built.
**Three shipped engines choreographed on ONE `--gallery-deal-t` scalar / `DOCK_SPRING`:**

When the user picks a preset card, do NOT just swap a config + flip a ring. Run a **1940s
cel-animation "deal":**

1. **ANTICIPATION (t 0→0.12) — the deck INHALES.** The picked card squishes inward
   (`useLiquidFlex`, scale ≈0.92, volume-preserving) and its `.shadow-cartoon-lg` cast
   DEEPENS (the card lifts off its offset shadow — wind-up). The sibling cards squish a
   hair toward the picked one (overlapping action, `--i`-indexed lag). ~80ms of pure pull-
   back before the punch.
2. **DEAL / ARC (t 0.12→0.55) — the chosen card FLIES to the stage on an ARC.** The picked
   thumbnail does an `useElementMorph` FLIP from its card rect → the STAGE rect (a quad-
   Bézier travel, not a straight line — the arc principle), scaling up with overlapping-
   action trailing-edge lag (`--portal-lag` cross-axis skew) so it reads as a heavy elastic
   card. The neighbours **shuffle to close the gap** (the deck re-snugs, momentum-eased).
3. **BURST (t 0.55) — the card MERGES into the live field.** At the merge threshold the
   flying thumbnail's metaball neck (the SAME `fission-bridge.css` neck + `--neck-t`) snaps
   into the stage canvas and the **live aurora config cross-fades to the new preset under a
   one-shot merge-splash** (the BE.W-DOCK-JUBILANCE gold coalesce, EFFECTS trailing the
   SPATIAL snap). The stage gives a ≈1.04 squash on the merge axis then recoils (squash &
   stretch). The thumbnail dissolves INTO the field — the preview literally becomes the
   stage.
4. **SETTLE (t 0.55→1.0) — follow-through.** The new active card's ring blooms with the
   `DOCK_SPRING` ζ≈0.7 give, the cartoon cast slides opposite the deal then snaps home, a
   secondary micro-bounce ripples the neighbour cards (the `--i` stagger tail). If the
   gallery is set to auto-collapse on pick, the rail then goo-collapses to the pill (§1.1)
   in the deal's wake — one continuous motion: deal → merge → collapse.

> **The boldest move in one line:** *make picking a preset a CARTOON DEAL — the chosen
> card squash-anticipates, ARCS off the deck to the stage with overlapping-action lag,
> goo-MERGES into the live field with a burst-splash (the thumbnail BECOMING the stage),
> the deck shuffles closed behind it, and the whole rail collapses to a glass dock pill in
> its wake — all on ONE `--gallery-deal-t` scalar over the shipped `DOCK_SPRING`,
> composed 100% from `useElementMorph` + `fission-bridge.css` + `useLiquidFlex` + the
> merge-splash + `.shadow-cartoon-*`. No new physics core.*

**Why bold AND deft:** every beat is a shipped engine recomposed — the FLIP is
`useElementMorph` (the dock-hub one-runner), the neck/splash is `fission-bridge.css`, the
squish is `useLiquidFlex`, the cast is `.shadow-cartoon-*`, the spring is `DOCK_SPRING`.
It mints ONE scalar (`--gallery-deal-t`) and ONE four-beat phase map. The audacity is in
the CHOREOGRAPHY — a generalized gallery that feels like a bespoke per-app morph because
the thumbnail literally flies into and BECOMES the field.

---

## 3 · THE THUMBNAIL FIX (the born-RED render bug — without this, nothing renders)

The deal-move is moot if the cards are dead grey. The fix is small and exact:

```ts
// usePresetThumbnails.ts — the init-ORDER correction
// WRONG (current): mode:"capture" forces eager → synchronous arm → WebGPU `device not
//                  acquired` THROW before armAsync is ever called → all cards skeleton.
// RIGHT: deferred init + an AWAITED async device-acquire BEFORE the first renderAt.
aurora = createAurora(shared, freezeCfg(PRESETS[PRESET_KEYS[0]!]), {
  initStrategy: "deferred",          // NOT mode:"capture" (which forces eager/sync-arm)
  preserveDrawingBuffer: true,       // capture needs the drawing buffer to toDataURL
});
await aurora.armAsync();             // NOW the async WebGPU device acquire resolves first
for (const key of PRESET_KEYS) {
  aurora.update(freezeCfg(PRESETS[key]));
  aurora.renderAt(1.0);
  thumbs.value[key] = shared.toDataURL("image/webp", 0.85);
  await new Promise((r) => setTimeout(r, 0));
}
```

- **Why it works:** `deferred` does NOT arm in the `createAurora` constructor, so the
  synchronous-throw on WebGPU is gone; `armAsync()` then resolves the
  adapter→device→configure→setup prelude BEFORE the first `renderAt` (which is a no-op
  until the device is live — `runtime.ts:139`); the WebGL2 fallback arms inside `armAsync`
  synchronously too, so both backends bake real pixels.
- **The shared-context budget is preserved** — still ONE offscreen canvas, ONE
  `createAurora`, iterate + `dispose`. No new context.
- **Born-RED gate:** a π asserts each baked thumbnail's mean luma/chroma is NOT the flat
  grey skeleton (every preset's preview has real aurora color, ≥2 distinct hues across the
  13) — RED on HEAD (all skeleton), GREEN on the fix. Capture in BOTH the WebGPU and the
  WebGL2-fallback path (the device-tier matrix).
- **The apply guard:** the card is `type="button"` with `@click.stop` so a pick can never
  bubble to the router (the stray-404 the live probe hit).

---

## 4 · THE VISUAL + MATERIAL SPEC (perfected warm glass, both modes, §3 field)

- **The cards are GLASS, not `bg-card`.** Re-skin `PresetPickerRow` cards from the opaque
  `bg-card` plate to the warm-cream six-layer transmissive composite (`.glass-quiet`/
  `.glass-floating` tier) so the baked thumbnail reads through a glass crown over the §3
  field — light `srgb(0.944 0.903 0.865 / .52)`, dark `srgb(0.350 0.295 0.249 / .56)`,
  NEVER gray (BA.W-NO-GRAY floor). The thumbnail well is the COLOURFUL FIELD; the card rim
  is the W-CORNER-AA defined edge.
- **The collapsed dock pill** is the floating transmissive island — `.glass-deep` (14-20px
  blur, IOS27 T7) over the vibrant field, margins all round, bottom-center, persistent.
- **φ proportion (Aristotelian).** The large card is φ-tall: a `16/10` well (≈φ) crowned by
  the label band; the rail height, the card width, the deal-arc apex, the cast offset all
  derive from φ ratios. The collapsed-pill width is the active card width ÷ φ.
- **CARTOON cast (technicolor punch).** Cards carry `.shadow-cartoon-md`; the active card
  `.shadow-cartoon-lg`; during the deal the cast TRAVELS (a `::after` caster `transform`,
  NEVER animated `box-shadow`), deepening at anticipation, sliding through the arc, snapping
  at settle. PRM → static cast.
- **√φ audacious type.** "PRESETS" eyebrow on the section rung; card labels on the small
  rung; the active-preset name in the collapsed pill at the display tier with -1.5%
  tracking.
- **PAPER morphism.** The settled active card + the controls plate show the paper grain at
  rest (the resting-state affordance).
- **LIQUID-WEIGHT UNIVERSAL.** Every card carries the `useLiquidFlex` tap-squish on press
  (≈0.92, volume-preserving, capped ≤1.08); hover is a weighty lift not a tight nudge; the
  horizontal scroll has momentum + overdamped snap (NO bounce on content snap, IOS27 T13);
  the entrance of the rail uses `.liquid-enter` (≈0.88 squish-grow + fade + overshoot,
  W-LIQUID-ENTRANCE-GENERAL) staggered `--i`.
- **The accent-flood on pick** is a CONSUMER accent (`--glass-accent`, presets-in-
  consumers) defaulting to the neutral warm lift — no hardcoded crimson.

---

## 5 · CROSS-ENGINE (Chrome + Safari) + a11y / PRM carve

- **Compositor-only by construction** — the deal/collapse writes ONLY `transform`/`opacity`/
  `filter` (never width/height/top/left, the `proof:no-layout-animation` fence); inherited
  from `useElementMorph` + the hub.
- **The goo neck** (deal-merge + collapse) rides `DockGooFilter` — the static SVG
  `filter:url(#…)` graph (feGaussianBlur + feColorMatrix threshold + feComposite, all
  WebKit-supported), `color-interpolation-filters:sRGB` (the waist reads right on Safari,
  not linearRGB-wrong), the REGULAR `filter` property — NEVER per-frame `backdrop-filter:
  url()`. Real metaball merge, NO naive ellipsoids. `@supports not (filter:url)` → the deal
  degrades to a clean scale-FLIP (no goo, still arcs + merges).
- **The thumbnail bake** is offscreen, parked off-DOM, ONE context, disposed — no steady-
  state cost.
- **PRM** → the deal collapses to an INSTANT config swap + the active-ring flip, zero
  arc/squish/neck/cast frames (the `useElementMorph` PRM floor); the collapse-to-dock is an
  instant topology swap; the field-hue cross-fade lands instantly (a color change is not
  vestibular).
- **a11y** — the gallery is a `role=tablist` of preset `role=tab` buttons (the shipped
  pattern), arrow-key cycle (already wired via `registerShortcut`), `aria-selected`/
  `aria-pressed` honest; the collapse pill carries `aria-expanded`/`aria-controls` on the
  trigger (the `<DockExpand>` contract), focus restored on re-expand, Escape collapses; the
  `useDockClickIntegrity` mid-morph tap guard ships. `type="button"` + `@click.stop` so a
  pick never escapes to the router.
- **Both modes** — warm-cream composite, light + dark, never gray; the π captures both.

---

## 6 · GENERALIZE — ONE configurator-presentation pattern (DRY, ask 5)

- **`VizStudio` gains a `#gallery` slot + a `galleryCollapsible` axis.** The gallery rail
  (full-width-top + collapse-to-dock) becomes part of the SHARED chassis, not aurora-
  bespoke. Aurora passes its `PresetPickerRow`; blob/concentric/fourier pass theirs (or the
  `<Configurator>` default thumbnail row). EVERY studio inherits the same placement +
  collapse + deal behaviour — the single-writer chassis discipline.
- **`<Configurator>` gains `galleryPlacement: "aside" | "top"`** (default `aside` for back-
  compat-free greenfield → set `top` for the viz studios). The full-width-top grid arm is
  ONE precompiled `[data-slot=configurator][data-gallery=top]` rule in `configurator.css`
  (never a dead JIT bracket — the BC.W-CONFIG-RIGHT lesson).
- **The bake is generic.** `usePresetThumbnails` is already config-shape-blind via
  `createAurora` — but the deal/collapse choreography is in the GALLERY component, so any
  viz that bakes thumbnails inherits it. A non-aurora viz that has no GL preview falls back
  to the swatch-strip thumbnail (the `<Configurator>` default), still collapse-to-dock.
- **The GLOBAL demo gear (`PresetEditor`) is a SEPARATE register** — it is a right-side
  `Sheet` of design-token controls, not a viz gallery; it is OUT of scope for the gallery
  pattern but SHOULD adopt the same `.liquid-enter` + cartoon-cast + warm-glass material
  (it currently uses `glass-resting`/`glass-floating` already) for consistency. No collapse-
  to-dock there (a Sheet is its own collapse). Noted, not forced.

---

## 7 · THE ACCEPTANCE BAR + born-RED gate (real pixels, a real pick)

- **R1 — thumbnails RENDER.** π: each of the 13 baked cards has real aurora color (mean
  chroma > the grey-skeleton floor, ≥2 distinct hues across the set), BOTH backends (WebGPU
  + WebGL2-fallback). **Born-RED on HEAD** (`device not acquired`, all skeleton).
- **R2 — a pick APPLIES + DEALS.** π: a card click (a) updates the live stage config
  (header stops/nuclei change — already GREEN, keep it), (b) runs the deal FRAME-SERIES —
  squish (scale≠1, X·Y≈1) → arc (the thumbnail rect travels a non-straight path) → goo
  waist at the merge midpoint → burst-splash trailing the snap → settle. **Born-RED on a
  flat ring-flip.**
- **R3 — gallery is UP-TOP + LARGE + scrollable.** π: the gallery rect spans the full
  studio width (≈stage+aside), ≥4 cards visible (vs the HEAD 2), `<FadingScroll axis=x>`
  feathers on overflow. **Born-RED on HEAD** (2-of-13 in the 360px rail).
- **R4 — collapse-to-dock.** π: the chevron/scroll collapses the rail to a floating glass
  pill (a `<GlassDock>` silhouette), the active thumbnail + label read in the pill, click
  re-erupts the rail (goo-tear). **Born-RED on HEAD** (no collapse exists).
- **R5 — warm glass, both modes.** π: the cards + pill composite α is the warm-cream six-
  layer (never gray), light + dark; the §3 field reads through; the cast travels.
- **R6 — generalized.** structural: `VizStudio` `#gallery` slot consumed by ≥1 non-aurora
  studio OR the `<Configurator>` default; the deal/collapse code lives in the gallery
  component, not aurora-bespoke (call-site scan, not keyword grep). **Born-RED on HEAD**
  (aurora-only).
- Plus the `proof:ba-gestalt` configurator verdict on a fresh BD capture (the gestalt is
  the bar: a larger up-top scrollable collapse-to-dock gallery, presets that render + deal +
  apply, warm glass, cartoon punch, both modes).

---

## 8 · DELTA-ASSAY → wave amendment (reconcile vs the 116-wave set; no dup)

- **AMEND `BD.W-DOCK-HUB-API`** — the configurator gallery is named as a FIRST consumer of
  `<DockExpand topology="envelop">` / `hub.silhouette` (the ≥3-distinct-surface H3 bar
  already wants a "viz-configurator" surface; the gallery rail IS that surface). No new hub
  engine — the gallery RIDES the spine. Cross-point: the collapsed pill is the recursive
  `<GlassDock>`.
- **NEW `BD.W-CONFIG-GALLERY-DEAL`** (the only genuinely new authoring) — (a) the
  thumbnail bake FIX (`deferred`+`armAsync`, §3, born-RED R1); (b) `<Configurator
  galleryPlacement="top">` + the precompiled CSS arm + the `VizStudio` `#gallery` slot (R3,
  R6); (c) the `--gallery-deal-t` four-beat deal choreography over `useElementMorph` +
  `fission-bridge.css` + `useLiquidFlex` + merge-splash (R2, the boldest move); (d) the
  collapse-to-dock via `hub.silhouette`/`<DockExpand>` (R4); (e) the warm-glass card re-skin
  (R5). Composes existing engines; ZERO new physics core.
- **vs `BD.W-LIQUID-ENTRANCE-GENERAL`** — the rail entrance + card stagger USE
  `.liquid-enter`; downstream, no dup.
- **vs `W-DOCK-SCROLL-FISSION` / `BE.W-DOCK-FISSION`** — the deal-merge + collapse REUSE the
  fission necks + merge-splash; the gallery is another consumer of the same goo machinery,
  not a fork.
- **vs `BC.W-VIZ-CONFIGURATOR-SUITE` / `BC.W-CONFIG-RIGHT`** — those established the shared
  `VizStudio` chassis + controls-right; this AMENDS the chassis with the gallery-top +
  collapse axis (the gallery placement moves from aside to a collapsible top rail). The
  controls-right stays; the gallery leaves the aside.
- **NO dup with the global `PresetEditor` gear** — that is the design-token Sheet, a
  separate register (§6); it adopts the shared material/motion, not the gallery pattern.

The result: the configurator becomes LARGER (controls reclaim the aside), the gallery goes
UP-TOP + LARGE + scrollable + collapse-to-glass-dock (reusing the dock-hub spine), every
preset RENDERS (the bake fix) and DEALS-then-APPLIES with full 1940s cartoon punch, on warm
transmissive glass in both modes — generalized to ONE chassis pattern every viz studio
inherits. Exactly what the user asked.
