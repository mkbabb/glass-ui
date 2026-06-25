# GOLDEN — the CONFIGURATOR + preset GALLERY (the per-page demo-tuning UI)

> The canonical greenfield reference for the live demo-tuning UI on `/substrates/aurora`
> and every sibling viz studio: the preset GALLERY + the preset thumbnails + the
> CONFIGURATOR controls + the `PresetEditor` gear-sheet. Synthesized from lens-a (pure
> ios27 fidelity), lens-b (cross-engine / perf-first), lens-c (cartoon-technicolor punch).
> One coherent design — survival of the fittest across the three.
>
> BINDING LAW (design.md + GREENFIELD-HARDENING §1; IOS27-REFERENCE the guiding light):
> perfected warm-cream six-layer transmissive glass (NEVER gray, both modes, BA.W-NO-GRAY
> floor) · §3 = a COLOURFUL FIELD behind glass + a defined edge · PAPER morphism visible ·
> AUDACIOUS √φ type · CARTOON shadow + FLOW & PUNCH · LIQUID-WEIGHT UNIVERSAL (inertia /
> bounce / squish on ALL motion, morph MORE on move, never tight/springy) · ARISTOTELIAN
> φ proportion · METABALLING PERFECT Chrome AND Safari (static SVG goo, sRGB interp, NO
> `backdrop-filter:url`, compositor-only, @supports/PRM floors) · DEFT UNION, KISS/DRY, NO
> LEGACY EVER.

---

## 0 · The three lenses, reconciled (what each contributed; what was cut)

All three lenses independently reproduced the SAME born-RED and converged on the SAME
gestalt — the studio is a dock in disguise. The synthesis keeps the strongest move from
each and resolves the cross-engine / audacity / correctness tensions.

| Move | Source | Verdict |
|---|---|---|
| **Gallery = a top-pinned, scroll-collapsing horizontal dock; configurator = the same collapse grammar; ONE DRY chassis** | a, b, c (unanimous) | **KEEP** — the gestalt |
| **Thumbnail bake fix: the root cause is `mode:"capture"` → eager → sync-arm → WebGPU `device not acquired` THROW *before* `armAsync()` is reached** | c (exact source trace), a/b (corroborate) | **KEEP** — c's trace is the precise truth |
| **The never-blank floor + the cross-engine WIN: stop needing a GL device for a static preview** | b (the boldest correct insight) | **KEEP, but RESOLVED** — use the *shipped* `auroraFallbackGround(config)` (a real device-free CSS field from the SAME palette+nuclei math), NOT a hand-rolled conic mesh |
| **The CARTOON "deal & shuffle" preset-select choreography** (anticipate → arc → goo-merge → settle) | c | **KEEP as the SPATIAL skin** — but built on `useLiquidReveal` (the shipped source-rect FLIP), not the nonexistent `useElementMorph` |
| **`useDockHub.toSurface` / `<DockExpand topology="envelop">` as the collapse spine** | a, b, c (all three) | **CUT — does not ship.** Reconciled below: those are IOS27-REFERENCE *brief-vocabulary* names for FUTURE waves, not on-disk engines. The collapse is built from the engines that DO ship. |
| **`useElementMorph` (the "one runner")** | a, b, c | **CUT — does not ship.** Replaced by `useLiquidReveal` + `useLiquidFlex` + `useScrollChrome` (all on-disk). |

**THE ONE CORRECTNESS RESOLUTION (the load-bearing reconciliation).** All three lenses
cite `useDockHub` / `<DockExpand topology>` / `useElementMorph` as the shipped "dock-hub
GOLDEN spine." **They do not exist on disk.** `find src -name 'useDockHub*' -o -name
'DockExpand*' -o -name 'useElementMorph*'` returns nothing; they are named in
`IOS27-REFERENCE.md` only as *proposed* brief-vocabulary waves (`W-DOCK-HUB-API`,
`W-DOCK-MORPH-FAMILY`). The GOLDEN therefore builds the identical behaviour from the
engines that **are** shipped and Safari-verified:

| Behaviour the lenses wanted | The NONEXISTENT name they used | The SHIPPED engine the GOLDEN uses |
|---|---|---|
| collapse-to-core on scroll | `useDockHub.silhouette` / `useScrollChrome` collapse | **`useScrollChrome`** (`src/composables/motion/useScrollChrome.ts` — `collapseT`/`collapsed`/`direction`, writes `--chrome-collapse-t`) ✓ ships |
| erupt the gallery from the core | `<DockExpand topology="envelop">` | **`useLiquidReveal`** (`src/composables/motion/useLiquidReveal.ts` — the source-rect FLIP bloom from a trigger) ✓ ships |
| the goo-tear neck at merge/collapse | the dock-hub goo-tear | **`DockGooFilter.vue` + `fission-bridge.css`** (`src/components/custom/dock/` + `src/styles/dock/` — Safari-safe static SVG `filter:url`, sRGB interp) ✓ ship |
| n-ary collapse-to-triad (if/when) | the dock-hub split | **`useDockFission`** (`src/components/custom/dock/composables/useDockFission.ts`) ✓ ships |
| the volume-preserving squish | `useLiquidFlex` | **`useLiquidFlex`** ✓ ships |
| the spring | `DOCK_SPRING` | **`DOCK_SPRING {response:0.32, ζ:0.7}`** (`useLiquidMorph.ts`) ✓ ships |
| the device-free thumbnail | a new conic/mesh fn | **`auroraFallbackGround(config)`** (`src/components/custom/aurora/composables/auroraFallbackGround.ts` — device-free CSS field from the SAME palette+nuclei math, deterministic, byte-identical Chrome/Safari) ✓ ships |

This is the deftest possible union AND the only honest one: zero new physics core, zero
phantom dependencies, every cited engine verified on disk.

---

## 1 · The born-RED (the five defects, source-verified, the gate's RED seed)

Measured live on `/substrates/aurora` (1440×900, both modes) — all three lenses concur:

1. **Gallery CRAMPED + rail-trapped.** `PresetPickerRow` renders inside the 360px
   `.configurator-aside` (`minmax(280px,360px)`, `configurator.css`), a **335×225 box**
   showing **2 of 13** cards. NOT large, NOT up-top, NOT full-width.
2. **Thumbnails 100% DEAD.** Console: `[Aurora] thumbnail bake aborted: Error:
   [useWebGPUCanvas] device not acquired`. All 13 cards are eternal `<Skeleton
   variant="shimmer">`. **Root cause (lens-c's exact trace):** `usePresetThumbnails.ts:74`
   calls `createAurora(shared, …, {mode:"capture"})`; `mode:"capture"` forces
   `initStrategy:"eager"` → a SYNCHRONOUS arm in the constructor → on the WebGPU backend
   the async device-acquire THROWS `device not acquired` → the `catch` at L77-80 removes
   the canvas and `return`s. The `await aurora.armAsync()` at L90 (whose comment claims it
   fixes this) **is never reached** — the throw is one statement earlier.
3. **APPLY works, RENDER is dead.** A preset click moves `aria-pressed`, swaps the seed
   hex, re-drives the live stage (`useConfiguratorState.selectPreset` is sound). The user
   reads "none render and work" because dead grey cards give no preview. **Fix the render;
   the apply is already there.** (Guard: the card needs `type="button"` + `@click.stop` so
   a pick never bubbles to the router — the stray-nav lens-c caught.)
4. **Gray, not glass.** The cards are opaque `bg-card` plates; the dark-mode aside reads
   gray-brown over the vibrant field. No §3 read-through, no warm-cream composite — a
   BA.W-NO-GRAY miss. Zero liquid motion in the gallery (a static hover nudge only).
5. **No DRY pattern.** Five divergent presentations: aurora→`PresetPickerRow` (broken),
   blob→its own weighted row, fourier→default chip row, concentric/paper-grid→no gallery,
   the rest→nothing. The `PresetEditor` gear-sheet is a sixth idiom (`SegmentedTabs`).

---

## 2 · THE GREENFIELD GESTALT — the studio IS a dock; ONE chassis, every viz

> **The studio's two chrome bodies are two halves of ONE collapse grammar. The preset
> GALLERY is a top-pinned, full-bleed horizontal glass dock of thumbnail tiles that
> SCROLL-COLLAPSES (via `useScrollChrome`) into a single `[● Presets · "Crayon" ·····]`
> core capsule and ERUPTS back (via `useLiquidReveal` from the core's rect, the goo neck
> reading at the seam). The CONFIGURATOR controls panel speaks the SAME collapse grammar
> (a focus-mode / mobile collapse to a vertical section-chip dock that erupts a section on
> tap). Both ride the SAME `DOCK_SPRING` + `useLiquidFlex` + `DockGooFilter` family, so the
> two bodies move as one weighted system — and the WHOLE thing is ONE `<VizStudioGallery>`
> chassis axis every viz inherits, DRY.**

### 2.1 The layout reflow — gallery TO THE TOP, full-bleed, over the stage

Restructure from `[stage-LEFT | aside-RIGHT(gallery-on-top-of-controls)]` to:

```
┌──────────────────────────────────────────────────────────────────┐
│  ▸ GALLERY DOCK — full studio width, UP TOP, horizontally          │ ← the headline
│    scrollable, LARGE φ-tall tiles, scroll-COLLAPSES to a core pill  │   change
├──────────────────────────────────────────────┬───────────────────┤
│   STAGE  (the live field, flex-1, now TALLER  │  CONTROLS aside    │ ← controls reclaim
│   — it reclaims the vertical the gallery used  │  (the FULL layer   │   the full height;
│   to steal from the aside)                     │  stack, WIDER)     │   aside widens
└──────────────────────────────────────────────┴───────────────────┘
```

- **`<Configurator>` grows ONE additive axis** (no fork, default unchanged):
  `galleryPlacement?: "aside" | "top"` (default `"aside"`). `"top"` portals the
  `#presets` slot OUT of the 360px aside and pins it as a floating glass dock across the
  TOP of the studio frame (`position:absolute; inset-block-start:φ-margin; inset-inline:
  φ-margin` — a detached island, IOS27 T16). The grid arm is ONE **precompiled**
  `[data-slot=configurator][data-gallery=top]` rule in `configurator.css` (never a dead
  JIT bracket — the BC.W-CONFIG-RIGHT lesson).
- **The gallery is now ~660–1080px wide** instead of 335px (≈2–3× the cramp), showing
  ~5 large cards, horizontally scrollable with momentum + ±neighbour peek (T13:
  momentum YES, snap-bounce NO — calm-overdamped, the shipped `<FadingScroll axis="x">`).
- **The aside WIDENS** (`--configurator-aside-max` lifts from 360px to a φ-derived band
  ~420px) and the controls reclaim the full aside height — the configurator stops being
  "too small."
- On `lg-`, the gallery stacks as a top strip above the stacked stage+controls.

### 2.2 The gallery AS A DOCK — scroll-collapse to a core (the headline interaction)

The top gallery is a `<GlassDock orientation="horizontal">` (the shipped shell dock —
full keyboard/roving model inherited) hosting N `<PresetTile>`s + a leading "Presets"
label puck. It wears **`useScrollChrome({collapseOnScroll, chromeRef, velocityGate})`**:

- **Expanded (rest / scroll-up):** the full thumbnail strip — large baked previews, the
  active preset lifted (the cartoon `-translate-y` + `.shadow-cartoon-lg` cast),
  horizontally scrollable.
- **Collapsed (scroll-down past `collapseRangePx`):** `collapseT` drives the dock to
  **goo-collapse** (the `--dock-morph-t`/`useLiquidFlex` squish, box-INVIOLATE) into a
  single compact `[● Presets · "Crayon" · ·····]` core capsule showing only the ACTIVE
  thumb + dot-indices — the stage reclaims full height while you tune.
- **Re-erupt:** tapping the core runs **`useLiquidReveal({trigger: coreRef})`** — the full
  strip blooms FROM the core's rect (the source-rect FLIP), the goo neck (`DockGooFilter`
  + `fission-bridge.css`) reading at the seam. Bidirectional, interruptible, `ζ≈0.7` give
  on the way up, NO overshoot-past-gone on collapse.

### 2.3 The configurator panel — "function similarly" (the same collapse grammar)

Desktop default: the configurator stays open in the (now-wider, warm-glass) right rail
— the inspector idiom survives (the fittest). But it gains the SAME collapse grammar for
mobile / a "focus mode" toggle: the panel collapses to a **vertical section-chip dock**
(Color · Composition · Motion · Warp · Flow · Texture · Nuclei) and tapping a chip ERUPTS
that section's controls via `useLiquidReveal` from the chip's rect. One verb, the same
spring family, zero new physics — the gallery-collapse and the configurator-eruption are
the SAME `DOCK_SPRING` system, so the two bodies breathe as one.

### 2.4 The DRY chassis — `<VizStudioGallery>` (the generalization, defect 5)

`VizStudio` gains a `#gallery` slot + a `galleryCollapsible` axis, so EVERY studio gets
the same presentation for free. The ONE generic gallery-as-dock (`<PresetTile>` ×N +
`useScrollChrome` collapse + the φ-thumbnail) re-hosts `PresetPickerRow` (kept name, NO
legacy alias — the no-backwards-compat law). Studios with no GL bake (concentric,
paper-grid, dot-matrix) pass `<PresetTile variant="swatch">` (the device-free
`auroraFallbackGround`-style CSS field, §3) — so EVERY configurator page gets a large,
up-top, scrollable, collapse-to-dock gallery, brand-uniform. The six divergent idioms
collapse to ONE. The `PresetEditor` gear-sheet keeps its Sheet host (a Sheet is its own
collapse) but adopts the same warm-glass material + `.liquid-enter` cartoon-cast for
consistency (noted, not forced — lens-c §6).

---

## 3 · THE SINGLE BOLDEST MOVE — the CARTOON PRESET-DEAL on a device-free gallery

The audacity (from lens-c) fused with the cross-engine correctness (from lens-b): picking
a preset is a **1940s cel-animation "deal"** — but the gallery never touches a GL device
to show a preview, so the deal is flawless in Safari.

> **Picking a preset runs a four-beat CARTOON DEAL — the chosen tile squash-ANTICIPATES,
> ARCS off the deck to the stage with overlapping-action lag, goo-MERGES into the live
> field with a burst-splash (the thumbnail BECOMING the stage), the deck shuffles closed
> behind it, and the rail can collapse to its core in the wake — all on ONE
> `--gallery-deal-t` scalar over the shipped `DOCK_SPRING`, composed 100% from
> `useLiquidReveal` + `fission-bridge.css` + `useLiquidFlex` + the merge-splash +
> `.shadow-cartoon-*`. AND every tile paints itself from the preset's palette via the
> device-free `auroraFallbackGround` field — zero offscreen WebGPU, byte-identical Chrome
> and Safari — so the gallery CANNOT be blank and the deal CANNOT break on WebKit.**

The four beats (the SPATIAL phase map on `--gallery-deal-t` / `DOCK_SPRING`):

1. **ANTICIPATION (t 0→0.12) — the deck INHALES.** The picked tile squishes inward
   (`useLiquidFlex`, scale ≈0.92, volume-preserving) and its `.shadow-cartoon-lg` cast
   DEEPENS (lifts off its offset — wind-up). Siblings squish a hair toward the picked one
   (`--i`-indexed overlapping-action lag). ~80ms of pull-back before the punch.
2. **DEAL / ARC (t 0.12→0.55) — the chosen tile FLIES to the stage on an ARC.** The tile
   does a `useLiquidReveal`-style FLIP from its tile rect → the STAGE rect along a
   non-straight path (the arc principle), scaling up with trailing-edge skew lag. The
   neighbours shuffle to close the gap (the deck re-snugs, momentum-eased).
3. **BURST (t 0.55) — the tile MERGES into the live field.** At the merge threshold the
   tile's metaball neck (`fission-bridge.css` + `--neck-t`) snaps into the stage canvas
   and the live config cross-fades to the new preset under a one-shot merge-splash (the
   BE.W-DOCK-JUBILANCE gold coalesce — EFFECTS trailing the SPATIAL snap). The stage gives
   a ≈1.04 squash on the merge axis then recoils (squash & stretch). The preview literally
   BECOMES the stage.
4. **SETTLE (t 0.55→1.0) — follow-through.** The new active tile's ring blooms with the
   `DOCK_SPRING` ζ≈0.7 give, the cast slides opposite the deal then snaps home, a micro
   ripple runs the neighbours (`--i` tail). If auto-collapse-on-pick is set, the rail
   goo-collapses to the core in the wake — one continuous motion: deal → merge → collapse.

Every beat is a shipped engine recomposed. It mints ONE scalar (`--gallery-deal-t`) and
ONE four-beat phase map. The audacity is in the CHOREOGRAPHY — a generalized gallery that
feels bespoke because the thumbnail flies into and BECOMES the field — and it is
Safari-perfect because the previews are device-free CSS.

---

## 4 · THE BLOCKING FIX — make the presets actually RENDER (defect 2/3, the gate)

No presentation matters if the tiles stay blank. Two halves, simplest-first (KISS):

### 4.1 Tier-0 (the default, device-free, both engines): the shipped `auroraFallbackGround`

The preview is **not** an offscreen GL bake at all. It is the shipped
`auroraFallbackGround(config)` (`src/components/custom/aurora/composables/`) — a pure-CSS
`background-image` (layered radial-gradient nuclei-glow) + `background-color`
(field-mean) built from the SAME palette+nuclei field the shader uploads (the math is
mirrored CPU-side, not re-invented; it returns measured luminance metrics). It is:
compositor-only, one paint, **byte-identical Chrome ⇄ Safari**, needs **no device**, never
blows the 8-context budget, deterministic per preset. **The gallery never touches WebGL.**
This is the cross-engine WIN — deleting the offscreen-WebGPU dependency removes the entire
Safari failure surface. (b's insight, resolved onto a real shipped primitive, not a new
conic fn.)

### 4.2 Tier-1 (progressive enhancement, ONE shared context, optional): the real field

Where richer previews are wanted, bake the REAL field ONCE — but with lens-c's exact
init-order fix, on a deferred-then-awaited arm (no `mode:"capture"` eager throw):

```ts
// usePresetThumbnails.ts — the init-ORDER correction (lens-c §3, on-disk-honest)
// WRONG (HEAD): mode:"capture" → eager → SYNC arm → WebGPU `device not acquired` THROW
//               at the createAurora CALL, one statement BEFORE armAsync() is ever reached.
// RIGHT: deferred init + an AWAITED async device-acquire BEFORE the first renderAt.
aurora = createAurora(shared, freezeCfg(PRESETS[PRESET_KEYS[0]!]), {
  initStrategy: "deferred",        // NOT mode:"capture" (which forces eager/sync-arm)
  preserveDrawingBuffer: true,     // capture needs the drawing buffer to toDataURL
});
await aurora.armAsync();           // NOW the async WebGPU device-acquire resolves FIRST
for (const key of PRESET_KEYS) {
  aurora.update(freezeCfg(PRESETS[key]));
  aurora.renderAt(1.0);
  thumbs.value[key] = shared.toDataURL("image/webp", 0.85);
  await new Promise((r) => setTimeout(r, 0));
}
```

The bake is **offscreen-paused** (no work when scrolled out / tab hidden) and
**PRM-static**. It progressively swaps the Tier-0 CSS field → the real webp where a device
exists; if `armAsync` still rejects (Safari SwiftShader), **Tier-0 stays** — graceful,
never blank. ONE offscreen canvas, ONE `createAurora`, disposed — the context budget is
preserved.

### 4.3 The current-key + nav-bubble fixes

- Seed `useConfiguratorState.initialPreset` and the gallery's `current` from the SAME
  source so `aria-pressed` lands on the lead preset (Dawn), not Van Gogh (a/b caught).
- Each tile is `type="button"` + `@click.stop` so a pick never bubbles to the router
  (lens-c caught the stray 404).

---

## 5 · The motion + visual + material spec (perfected warm glass, both modes)

- **Spring:** ONE register — `DOCK_SPRING {response 0.32, ζ 0.7}` for the gallery
  collapse/expand + the configurator eruption + the deal; `bouncy` for a tile select-pop.
  No new clock.
- **Gallery scroll (T13):** momentum YES, snap-bounce NO (calm-overdamped) + ±neighbour
  peek always ~12% visible; the active tile lifts on the cartoon cast.
- **Tiles are GLASS, not `bg-card`.** Re-skin from the opaque `bg-card` plate to the
  warm-cream six-layer transmissive composite (`.glass-quiet`/`.glass-floating` tier) —
  light `srgb(0.944 0.903 0.865 / .52)`, dark `srgb(0.350 0.295 0.249 / .56)`, NEVER gray
  (BA.W-NO-GRAY floor). The thumbnail well is the §3 COLOURFUL FIELD (the
  `auroraFallbackGround`); the tile rim is the W-CORNER-AA defined edge.
- **The collapsed core capsule** is the floating transmissive island — `.glass-deep`
  (14–20px blur, T7) over the vibrant field, margins all round, the active thumb + label.
- **CARTOON cast (technicolor punch).** Tiles carry `.shadow-cartoon-md`; the active
  `.shadow-cartoon-lg`; during the deal the cast TRAVELS via a `::after` caster
  `transform` (NEVER animated `box-shadow`), deepening at anticipation, sliding through
  the arc, snapping at settle. PRM → static cast.
- **√φ audacious type.** "PRESETS" eyebrow on the section rung; tile labels on the small
  rung; the active-preset name in the core capsule at the display tier, -1.5% tracking.
- **PAPER morphism.** The settled active tile + the controls plate show the paper grain
  at rest.
- **LIQUID-WEIGHT UNIVERSAL.** Every tile carries the `useLiquidFlex` tap-squish on press
  (≈0.92, vol-preserving, capped ≤1.08); hover is a weighty lift not a tight nudge; the
  rail entrance uses `.liquid-enter` (≈0.88 squish-grow + fade + overshoot) staggered
  `--i`.
- **The accent-flood on pick** is a CONSUMER accent (`--glass-accent`, presets-in-
  consumers) defaulting to the neutral warm lift — no hardcoded crimson.
- **§3 + dark-rail re-floor.** The live stage reads THROUGH the top dock + the panel
  (transmissive, never flat scrim); the dark-mode rail is RE-FLOORED off the measured
  gray-brown toward the warm composite (the live defect).
- **φ proportion (Aristotelian).** The tile is φ-tall (a 16:10 well ≈ φ crowned by a
  label band); the rail height the φ-minor of the stage; the core width the active-tile
  width ÷ φ; the cast offset, the deal-arc apex all derive from φ ratios off the stage
  rect.

---

## 6 · Cross-engine (Chrome + Safari) + a11y / PRM carve

- **The thumbnail Tier-0 IS the whole Safari story:** `auroraFallbackGround` — no WebGL,
  no WebGPU, no `toDataURL`, no offscreen device. Byte-identical Chrome ⇄ Safari, zero
  context budget. Deleting the offscreen-device dependency removes the entire WebKit
  failure surface.
- **Compositor-only:** the reflow is `position:absolute`; the collapse/eruption/deal write
  ONLY `transform`/`opacity`/`filter` (the `proof:no-layout-animation` fence). The
  panel-width state-change is a discrete grid-track swap, not a per-frame layout animation.
- **Metaball PERFECT both engines:** the collapse/eruption/merge necks ride
  `DockGooFilter` — the static SVG `filter:url(#…)` graph (feGaussianBlur + feColorMatrix
  threshold + feComposite), `color-interpolation-filters:sRGB` (the waist reads right on
  Safari, not linearRGB-wrong), the REGULAR `filter` property — NEVER `backdrop-filter:
  url()`. Real blob↔meatball merge, NO naive ellipsoids. `@supports not (filter:url)` →
  the deal degrades to a clean scale-FLIP (no goo, still arcs + merges).
- **Offscreen-park:** the optional Tier-1 bake runs only when the gallery is on-screen +
  idle; a hidden tab / scrolled-away gallery does ZERO GL work.
- **PRM:** `useScrollChrome` + `useLiquidReveal` honor `prefers-reduced-motion` → instant
  collapse / instant eruption, zero neck/squish/cast/arc frames, fade-only; the
  accent-flood + the color swap land instantly (a color change is not vestibular).
- **a11y:** the gallery dock is a real `<GlassDock>` `role="tablist"` of preset
  `role="tab"`/`aria-pressed` tiles (roving tabindex inherited), arrow-keys cycle (the
  shipped `registerShortcut`). The core capsule carries `aria-expanded`/`aria-controls`,
  focus-move-in on erupt + restore, Escape collapses. The `useDockClickIntegrity` mid-morph
  tap guard ships. `type="button"` + `@click.stop` so a pick never escapes to the router.
- **Both modes:** warm-cream composite, light + dark, never gray (the dark-rail re-floor
  is the live fix). The π captures both.

---

## 7 · How it composes EXISTING primitives (DEFT UNION — KISS/DRY, no fork, no legacy)

| Presentation need | Existing primitive CONSUMED (verified on disk) | New code |
|---|---|---|
| gallery = horizontal dock | `<GlassDock orientation="horizontal">` (`src/components/custom/dock/GlassDock.vue`) | re-host `PresetPickerRow` → the gallery dock |
| scroll-collapse to core | `useScrollChrome` (`src/composables/motion/useScrollChrome.ts`) | wire `collapseOnScroll` + `chromeRef` on the rail |
| erupt from the core | `useLiquidReveal` (`src/composables/motion/useLiquidReveal.ts`) | the core-capsule trigger ref |
| goo necks (collapse/erupt/merge) | `DockGooFilter.vue` + `fission-bridge.css` | none |
| tile squish / deal | `useLiquidFlex` (`src/composables/motion/useLiquidFlex.ts`) | the `--gallery-deal-t` phase map |
| device-free thumbnail (Tier-0) | `auroraFallbackGround(config)` (`src/components/custom/aurora/composables/`) | per-preset field wiring |
| real thumbnail (Tier-1, optional) | `createAurora` (deferred + `armAsync`) | the init-ORDER fix |
| horizontal scroll + peek | `<FadingScroll axis="x">` (ships) | none |
| controls anatomy | `<ConfiguratorLayer>`/`<ConfiguratorRow>`/`<ColorSwatch>` (ship) | none |
| warm-cream glass | `.glass-floating`/`.glass-deep` + `useGlassBackdropLuminance` | dark-rail warm re-floor + tile re-skin |
| layout reflow | `<Configurator>` `galleryPlacement` (additive prop) | `"top"` portal branch + precompiled CSS arm |
| DRY chassis | `VizStudio` (`demo/stories/substrates/VizStudio.vue`) | `#gallery` slot + `galleryCollapsible` axis |
| state (apply — WORKS) | `useConfiguratorState` `per-preset` (verified live) | UNTOUCHED |
| cast / squish / spring | `.shadow-cartoon-*` · `useLiquidFlex` · `DOCK_SPRING` | none |
| scroll/peek | `<FadingScroll axis="x">` (ships) | momentum + φ peek |

**RETIRED (no legacy):** `PresetPickerRow.vue` → folds into the gallery dock (kept name,
no legacy alias); `usePresetThumbnails.ts`'s eager-`mode:"capture"` bake → the deferred +
device-free Tier-0/Tier-1 split (the offscreen-WebGPU hard dependency DELETED). The six
preset idioms unify onto the ONE gallery-dock grammar.

**No phantom engines.** Every cited primitive is verified present (`find src` confirms).
The lenses' `useDockHub`/`<DockExpand>`/`useElementMorph` are NOT used — their behaviour is
built from `useScrollChrome` + `useLiquidReveal` + `useLiquidFlex` + the goo filter, all
on-disk and Safari-verified.

---

## 8 · The ACCEPTANCE BAR + the born-RED gate (real pixels, a real pick, both modes/engines)

The gate is born-RED on HEAD and GREEN on the GOLDEN:

- **R1 — thumbnails ALWAYS render (device-free).** π: every preset tile paints a
  non-blank, non-skeleton preview (the Tier-0 `auroraFallbackGround` field — mean chroma >
  the grey-skeleton floor, ≥2 distinct hues across the 13) within one frame of mount, in
  Chrome AND WebKit, light AND dark. **Born-RED on HEAD** (all 13 blank, `device not
  acquired`). Plus a grep: `usePresetThumbnails` no longer calls
  `createAurora({mode:"capture"})` and the gallery's default preview path creates no
  `left:-99999px` offscreen capture canvas. **Born-RED** (HEAD does exactly that).
- **R2 — a pick APPLIES + DEALS.** π: a tile click (a) updates the live stage config
  (header stops/nuclei change — already GREEN, must STAY green), (b) runs the deal
  FRAME-SERIES — squish (scale≠1, X·Y≈1) → arc (the tile rect travels a non-straight path)
  → goo waist at the merge midpoint → burst-splash trailing the snap → settle. **Born-RED
  on a flat ring-flip.**
- **R3 — gallery is UP-TOP + LARGE + scrollable.** π: the gallery rect's `y` < the
  stage/controls `y`; its width ≈ studio width (not the 335px gutter); ≥4 tiles visible
  (vs HEAD 2); `<FadingScroll axis=x>` feathers on overflow. **Born-RED on HEAD** (335×225
  in the 360px rail).
- **R4 — collapse-to-dock works.** π: a scroll-down (or the core toggle) collapses the
  rail to a floating glass core (the `useScrollChrome` `collapseT` ramp + the
  `useLiquidFlex` squish + the goo waist), the active thumb + label read in the core; a
  tap re-erupts via `useLiquidReveal` (the source-rect bloom + the goo neck). Bidirectional.
  **Born-RED on HEAD** (no collapse exists).
- **R5 — warm glass, both modes.** π: the tiles + core composited `background` α resolves
  the warm-cream six-layer (chroma > 0), NEVER gray, light + dark; the §3 field reads
  through; the cast travels. **Born-RED** (flat gray/brown today).
- **R6 — generalized (DRY).** structural: the SAME `<VizStudioGallery>` + `Configurator
  galleryPlacement="top"` drives ≥2 studios (aurora + one more), the deal/collapse code in
  the gallery component, NOT aurora-bespoke (a call-site/call-expression scan, not a
  per-viz keyword grep). **Born-RED on HEAD** (aurora-only).
- Plus the `proof:ba-gestalt` configurator verdict on a fresh BD capture (the gestalt IS
  the bar: a larger up-top scrollable collapse-to-dock gallery, presets that render + deal
  + apply, warm glass, cartoon punch, both modes).

### 8.1 The born-RED gate sketch (the π that proves it)

```ts
// gate: configurator-presentation (born-RED on HEAD, GREEN on GOLDEN)
// Run live (chrome-devtools) on /substrates/aurora, BOTH modes, BOTH engines.

// R1 — device-free render: no skeleton, real chroma, no capture canvas.
const tiles = [...document.querySelectorAll('[data-preset-tile]')];
assert(tiles.length >= 13);
assert(tiles.every(t => !t.querySelector('[data-skeleton]')));         // RED: 13 skeletons
const chroma = tiles.map(meanChromaOfWell);
assert(chroma.every(c => c > GREY_FLOOR) && distinctHues(chroma) >= 2); // RED: all grey
assert(!document.querySelector('canvas[style*="-99999"]'));            // RED: offscreen canvas present
assert(consoleErrors.every(e => !/device not acquired/.test(e)));      // RED: the abort logs

// R3 — up-top + large + scrollable.
const gal = rect('[data-gallery-dock]'), stage = rect('#stage');
assert(gal.top < stage.top && gal.width > stage.width * 0.9);         // RED: gallery in the 360 rail
assert(visibleTileCount() >= 4);                                       // RED: 2 of 13

// R4 — collapse + erupt (the frame-series).
scrollDownPast(collapseRangePx);
const series = captureFrames('[data-gallery-dock]', 12);
assert(squishPresent(series) && gooWaistAt(series, 0.5));              // RED: no collapse
assert(rect('[data-preset-core]').width > 0);                         // RED: no core
tapCore(); assert(bloomFromRect(captureFrames('[data-gallery-dock]', 12)));

// R2 — apply (stays green) + deal (the cartoon series).
const before = stageHeader();
click('[data-preset-tile="Crayon"]');
assert(stageHeader() !== before);                                     // GREEN today, keep
const deal = captureFrames('[data-preset-tile="Crayon"]', 16);
assert(anticipateSquish(deal) && arcTravel(deal) && mergeSplashTrails(deal)); // RED: flat flip

// R5 — warm glass, both modes.
for (const mode of ['light','dark']) {
  setMode(mode);
  const bg = composited('[data-preset-tile]','background-color');
  assert(chromaOf(bg) > 0 && !isGrey(bg));                            // RED: gray/brown
}

// R6 — DRY: same chassis drives ≥2 studios.
assert(studiosUsing('VizStudioGallery').length >= 2);                  // RED: aurora-only
```

---

## 9 · The DELTA-ASSAY → wave amendment (reconcile vs the BD wave set; no dup)

This is a **demo-chassis composition + ONE engine init-fix + ONE chassis prop**, NOT a
new dock band. It rides the SHIPPED engines and AMENDS existing waves:

- **AMENDS `BC.W-VIZ-CONFIGURATOR-SUITE` (the `VizStudio` chassis):** add `#gallery` slot
  + `galleryCollapsible` + `Configurator galleryPlacement="top"` (the precompiled CSS arm)
  + the φ aside-width; re-host every studio's preset row onto the ONE gallery dock (the DRY
  close — defect 5). The chassis already exists; this extends it. The controls-right stays.
- **NEW small wave `BD.W-CONFIG-GALLERY-DEAL`** (demo-chassis, Pass-C/E — the only genuinely
  new authoring): (a) the thumbnail RENDER fix — Tier-0 device-free `auroraFallbackGround`
  + Tier-1 deferred-`armAsync` (DELETE the eager `mode:"capture"` bake), born-RED R1; (b)
  the gallery-as-`<GlassDock>` + the `useScrollChrome` scroll-collapse + the
  `useLiquidReveal` re-erupt (R3/R4); (c) the `--gallery-deal-t` four-beat deal over
  `useLiquidReveal` + `fission-bridge.css` + `useLiquidFlex` + merge-splash (R2, the
  boldest move); (d) the warm-glass tile re-skin + dark-rail re-floor (R5); (e) the
  generalize across ≥2 studios (R6). Composes shipped engines; ZERO new physics core.
- **vs `BD.W-LIQUID-ENTRANCE-GENERAL`:** the rail entrance + tile stagger USE
  `.liquid-enter`; downstream, no dup.
- **vs `BD.W-DOCK-SCROLL-FISSION` / `BE.W-DOCK-FISSION`:** the gallery collapse REUSES
  `useScrollChrome` + the fission necks + merge-splash — another consumer of the same goo
  machinery, NOT a fork. (If a triad-collapse is ever wanted, `useDockFission` is the same
  spine.)
- **vs `BD.W-LIVING-ARTWORK`:** the Tier-0 `auroraFallbackGround` tile IS the living-artwork
  static-field applied to the gallery tiles; same primitive, a new consumer. No dup.
- **NO phantom `W-DOCK-HUB-API`:** the lenses' dock-hub spine is NOT introduced. The
  collapse grammar is built from shipped engines. If `W-DOCK-HUB-API` is ever authored as
  a real engine, this studio becomes its consumer for free — but the GOLDEN does NOT depend
  on it shipping first.

---

## 10 · The fittest survives — the survival-of-the-fittest ledger

- **KEEP (fit):** `useConfiguratorState` apply path · `<FadingScroll axis=x>` · the
  `<ConfiguratorRow>`/`<ColorSwatch>` controls anatomy · `<GlassDock>` · `useScrollChrome` ·
  `useLiquidReveal` · `useLiquidFlex` · `DockGooFilter`/`fission-bridge.css` · `DOCK_SPRING`
  · `auroraFallbackGround` · the `VizStudio` chassis · the inspector-right idiom on desktop.
- **REFINE (weak):** the gray aside → warm-cream + §3 read-through · the 335px gutter
  gallery → up-top full-bleed dock · the static hover → the cartoon deal · the
  aurora-bespoke gallery → the DRY `<VizStudioGallery>` · the current-key mismatch.
- **RE-INVENT (broken):** the eager `mode:"capture"` offscreen-WebGPU bake → the device-free
  Tier-0 + deferred-`armAsync` Tier-1 (a clean break, the no-backwards-compat law) · the
  six divergent preset idioms → ONE gallery-dock grammar.

The configurator becomes LARGER (controls reclaim the aside), the gallery goes UP-TOP +
LARGE + scrollable + collapse-to-glass-dock (reusing `useScrollChrome` + `useLiquidReveal`),
every preset RENDERS device-free (Tier-0) and DEALS-then-APPLIES with full 1940s cartoon
punch, on warm transmissive glass in both modes, perfect in Chrome AND Safari — generalized
to ONE chassis pattern every viz studio inherits. Exactly what the user asked, built only
from engines that ship.
