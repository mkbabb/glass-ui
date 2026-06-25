# lens-b — the CONFIGURATOR-PRESENTATION greenfield (CROSS-ENGINE / PERF-FIRST)

> The per-page demo-tuning UI on `/substrates/aurora` (+ every other viz studio): the
> CONFIGURATOR controls column + the preset GALLERY + the preset thumbnails + the
> `PresetEditor` gear-sheet. Designed from first principles through the CROSS-ENGINE +
> PERFORMANCE lens — Chrome AND Safari flawless, compositor-only, offscreen-pause,
> the simplest mechanism that hits the bar (KISS). Binding law: design.md +
> GREENFIELD-HARDENING §1 (warm-cream six-layer glass never gray · §3 colourful field
> + defined edge · cartoon-technicolor flow & punch · liquid-weight universal · √φ
> proportion · metaballing perfect in Safari · DEFT UNION, no re-fork, no legacy).

---

## 0 · The live interrogation (REAL painted pixels, REAL preset clicks, both modes — born-RED)

`/substrates/aurora`, Chrome 1440×900, dev server live, captured + measured:

**The page geometry (source-verified `getBoundingClientRect`):**
- The **hero** (`StoryPage` audacious `<h1>Aurora</h1>`) eats the ENTIRE first viewport
  (the display title spans y≈230→530, the blurb + section eyebrow + a second `Aurora`
  body heading follow). The actual STUDIO — the thing the user wants to use — starts at
  **y≈844, fully below the fold**. The user has to scroll past ~1.5 viewports of chrome
  to reach the configurator. This is the literal "configurator is too small" — it is
  not just small, it is *buried*.
- The **controls column** (`.configurator-aside`, the `data-aurora-atoms-surface`) is
  **359px wide** — pinned to the `--configurator-aside-max: 360px` token
  (`Configurator.vue:142`, default `280px/360px`). On a 1440 viewport the stage gets
  1066px and the controls get a cramped 359px gutter. Every `ConfiguratorRow`
  (seed swatch, harmony select, energy slider) is squeezed into that gutter.
- The **preset GALLERY** is a `.configurator-presets shrink-0 border-b` region jammed
  INSIDE the top of that 359px aside (`presetsContainer` rect **335×225**). It shows
  ~1.6 thumbnails (Sky + a sliver of Dawn) before the right edge clips. It is
  horizontally scrollable (`<FadingScroll axis="x">`) but it is a tiny 335px slit — the
  user reads it as "cramped, can't see the presets." NOT up-top, NOT large, NOT
  full-width.

**The presets DON'T RENDER (the user's "none render and work") — ROOT CAUSE FOUND, born-RED:**
- Console at load: **`[Aurora] thumbnail bake aborted: Error: [useWebGPUCanvas] device
  not acquired`** (`useWebGPUCanvas.ts:312` — `buildContext` throws when `device` is
  null). All **13** preset thumbnails (`PRESET_KEYS`: Sky · Dawn · Meadow · Deliberative ·
  Day 9 · Oil Impasto · Oil Gestural · Van Gogh · Oil Pastel ×3 · Crayon · Speedtest)
  render as `Skeleton` shimmer placeholders that NEVER resolve — `thumbsAllBlank: true`.
  In **dark mode** the skeletons read as **near-black dead cards** (the B19-class
  black-well defect, regressed). The gallery looks broken because *it is* broken.
- The cause: `usePresetThumbnails.ts:90` already `await aurora.armAsync()`-es before the
  first `renderAt` (the BC.W-VIZ-AURORA fix). But on the **WebGPU backend**, the shared
  OFFSCREEN canvas (`position:fixed;left:-99999px`, 0-area in the layout flow) fails
  device acquisition → `armAsync()` **rejects** → the `bake()` `try` aborts at line 90,
  `shared.remove()`, returns with zero thumbnails. The live stage canvas (on-screen, real
  area) acquires a device fine; the offscreen capture canvas does not. **The capture path
  is device-fragile** — it depends on an offscreen canvas getting a WebGPU device, which
  is exactly the case Chromium/WebKit deprioritize.
- **But the APPLY wiring WORKS.** Clicking `Van Gogh` → `aria-pressed` moves, the active
  preset key updates, the seed swatch goes `#C53443 → #003B82` (Dawn→Sky family) then
  `→ #BC7BFF` (Van Gogh), the config reads `6 stops · 6 nuclei`, the live GL field
  visibly repaints. `useConfiguratorState.selectPreset` (`per-preset` clone mode) is
  sound. So the user's "none render AND work" is precisely: **the thumbnails don't
  RENDER (dead bake), which makes the gallery look non-functional — even though the
  click DOES apply.** The fix is the bake, not the apply.

**Warm-glass + §3 (born-RED):** the controls column surface (`glass-floating`,
`configurator.css`) reads as a **flat warm-GRAY/brown panel** in both modes — there is
no colourful field BEHIND the glass (the §3 violation), no transmissive read-through to
the aurora field beside it, no defined warm-cream edge. In dark mode it is a muddy
brown. This is the BA.W-NO-GRAY floor not being met on the studio surface.

**The other configurators:** `VizStudio.vue` is the ONE shared chassis — every viz
studio composes `<Configurator asideSide="right">` with the SAME `.configurator-presets`
region inside the SAME 360px-capped aside. So whatever we fix here fixes ALL of them by
construction (DRY is already the structure — the `#presets` slot + `Configurator.vue`).
The `PresetEditor.vue` gear-sheet (`demo/configurator/`) is a SEPARATE preset surface
(the global demo-config gear, a `Sheet side="right"`) with its OWN `SegmentedTabs` preset
row — a third presentation idiom for the same concept (named themed baselines).

**Verdict:** the configurator is buried + cramped, the gallery is a 335px right-gutter
slit (not up-top/large), the thumbnails are a DEAD BAKE (device-acquire RED), the surface
is gray (§3/no-gray RED), and there are THREE preset-presentation idioms (viz-studio
`PresetPickerRow`, `Configurator` default chip row, the gear `SegmentedTabs`) that should
be ONE. Every one of the user's asks reproduces. Born-RED, honestly.

---

## 1 · THE GREENFIELD CORE — the preset gallery IS a dock; the configurator IS a dock-hub surface

The user's exact words decode to a single, already-half-built primitive:

> "the GALLERY should be LARGER, up top, scrollable, and COLLAPSE INTO a glass DOCK …
> the preset gallery as a dock that collapses … the OTHER configurators function similarly."

glass-ui already owns the **dock-as-hub** facility (the converged `dock-hub` GOLDEN:
`useDockHub`/`<DockExpand topology>` over the ONE `useElementMorph` runner, the
`envelop` goo-tear, `useLiquidReveal` the kept bloom core). The configurator-presentation
greenfield is **NOT a new layout system — it is the dock-hub applied to the demo's
tuning UI.** Two moves, both pure recomposition of shipped primitives:

### 1.1 The PRESET GALLERY is a horizontal glass DOCK that collapses to a CORE chip

Today the gallery is a `<FadingScroll axis="x">` of `<button>` thumbnails crammed into the
360px aside. Greenfield: it is a **full-bleed horizontal `<GlassDock>` pinned UP-TOP** of
the studio frame (above the stage, NOT inside the right gutter), spanning the full studio
width. It is:

- **LARGER** — thumbnails at a φ-proportioned `~240×150` (16:10) on a generous warm-cream
  glass rail, the active preset lifted forward (cartoon cast deepens, `--i`-staggered).
- **UP-TOP** — it is the masthead of the studio: `[ gallery dock ]` over
  `[ stage | controls ]`. The stage+controls row drops below it. This alone answers
  "larger + up-top."
- **SCROLLABLE** — the SAME `<FadingScroll axis="x">` (already there), now with room to
  breathe + momentum + the liquid-weight overscroll (Band-0 motion-spring register).
- **COLLAPSE-INTO-A-DOCK** — this is the dock-hub `envelop`/`silhouette` move INVERTED:
  the expanded gallery rail **collapses to a single glass CORE chip** (the active preset
  thumbnail + a "12 presets" count) that lives in the studio's corner. Tapping the core
  chip TEARS THE GOO MEMBRANE (the `envelop` topology) and the full gallery rail ERUPTS
  back out — `useDockHub().toSurface(coreChip, galleryRail, { topology: 'envelop' })`.
  The gallery IS a dock that collapses to its core and erupts on demand. Verbatim ask.

The gallery dock and the studio's existing nav-dock are the SAME `<GlassDock>` register —
ONE dock vocabulary, no `PresetPickerRow` fork. `PresetPickerRow.vue` is RETIRED into a
`<PresetDock>` that composes `<GlassDock>` + `<DockExpand>` (the collapse) + the thumbnail
chips (kept).

### 1.2 The CONFIGURATOR controls surface is a warm-glass dock-hub panel, not a gray gutter

The 360px gray aside becomes a **warm-cream transmissive glass panel** that reads the
aurora field THROUGH it (§3 colourful field + defined edge). Two width states, dock-style:

- **DOCKED (default):** a wider φ-proportioned controls panel (lift the
  `--configurator-aside-max` to a golden `~420px`, and on `≥xl` let it breathe to the
  φ-minor of the stage), warm-cream glass, the aurora field bleeding through its
  transmissive scrim (the live-behind read the dock-hub already does), a defined
  W-CORNER-AA edge. NEVER gray, both modes.
- **COLLAPSED-TO-DOCK:** the whole controls panel collapses to a vertical glass dock of
  section-icon chips (Color · Composition · Motion · Warp · Flow · Texture · Nuclei) —
  tapping a chip ERUPTS that section's controls via `<DockExpand topology="bloom">` (a
  popover bloom from the chip rect). This is "the configurator should COLLAPSE INTO a
  glass dock … the other presets/configurators function similarly" — the controls panel
  AND the gallery both speak the same collapse-to-dock grammar.

Both surfaces are **dock-hub instances** — `toSurface`/`<DockExpand>` with a topology,
ZERO new layout engine. The `Configurator.vue` chassis keeps its `asideSide`/grid; it
gains a `collapsible` mode that wires the aside to a `<DockExpand>` core.

---

## 2 · THE SINGLE BOLDEST MOVE — kill the live-WebGPU thumbnail bake; the gallery is a SELF-PORTRAIT of the dock

> **Collapse the preset gallery, the preset thumbnails, AND the dock into ONE thing: the
> gallery is a horizontal glass DOCK whose chips are the presets, and each chip's preview
> is the dock's OWN `envelop` morph rendered FROM the live stage — there is no separate
> offscreen bake at all. The thumbnail is a real, cheap, both-engines-perfect image; the
> gallery collapses to a core chip and erupts via the dock-hub goo-tear.**

This fuses the cross-engine fix and the gallery redesign into one move with two halves:

### 2.1 The perf/cross-engine half — RETIRE the device-fragile offscreen WebGPU bake

The dead-thumbnail RED is structural: `usePresetThumbnails` asks an **offscreen WebGPU
canvas** for a device, which Safari and headless/SwiftShader Chromium routinely refuse
(`device not acquired`). The fix is to STOP needing a live GL device for a static preview.
Tiered, simplest-first (KISS), Chrome+Safari identical:

1. **Tier 0 (the default, zero-GL): the preview is a CSS `conic`/`radial` warm-mesh** built
   directly from the preset's `palette` OKLCh stops + `nuclei` positions — a pure-CSS
   `background: radial-gradient(...) , conic-gradient(...)` painted from the SAME palette
   the GL field samples. This is the `auroraFallbackGround` static-mesh that ALREADY ships
   as the WebGL-absent fallback (IOS27-REFERENCE T11 / `BD.W-LIVING-ARTWORK`), per-preset.
   It is compositor-only, renders in 1 paint, is byte-identical in Chrome and Safari, never
   needs a device, never blows the 8-context budget, and reads as a faithful warm preview
   of the preset's colour identity. **The gallery never touches WebGL.**
2. **Tier 1 (progressive enhancement, ONE shared context): bake the REAL field ONCE on the
   LIVE stage canvas** — the stage already has an acquired device. When the gallery is
   visible + idle (rAF-idle, offscreen-park honored), iterate the SAME live `createAurora`
   instance through each preset (`update` + `renderAt(1)` + `toDataURL`) and swap the CSS
   mesh → the real webp progressively. The live stage's device is reused (no second
   acquire, no offscreen canvas), so the device-acquire RED cannot fire. If WebGPU
   `armAsync` rejects on the live stage too (Safari SwiftShader), Tier 0 stays — graceful,
   never blank.
3. The bake is **offscreen-paused** (no work when the gallery is scrolled out / tab hidden)
   and **PRM-respecting** (the CSS mesh is static under reduced-motion; no drift).

The result: **thumbnails ALWAYS render** (Tier 0 is unconditional, device-free, both
engines), and upgrade to the real field where a device exists. The user's "none render"
is closed at the root — the gallery cannot be blank.

### 2.2 The audacious half — the active preview IS the live stage, mirrored through the goo-tear

Because the gallery is a dock and the dock-hub owns the `envelop` goo-tear, the **active
preset's chip is not a static thumbnail at all — it is a live MIRROR of the stage field**,
and selecting a preset runs the goo-tear: the chosen chip's mesh **erupts** (the
`envelop`/`bloom` topology) and FLOWS into the stage, the stage's new field flowing back
through the same neck — one continuous warm-cream liquid-glass membrane (`useLiquidReveal`
+ the `fission-bridge.css` neck + the merge-splash burst). Picking a preset is a
goo-morph from the chip into the field, not a hard swap. Cartoon anticipation → stretch →
burst → settle on the ONE `--dock-portal-t` scalar (the dock-hub's spring, reused). This
is the liquid-weight-universal law applied to preset selection — the gallery feels ALIVE,
and it is 100% shipped primitives recomposed.

> **In one line:** the preset gallery, the preset thumbnails, and the dock are ONE
> horizontal glass dock whose chips paint themselves from the preset palette (zero-GL,
> both-engines-perfect), collapse to a core chip + erupt via the dock-hub goo-tear, and
> morph the chosen field into the stage through the goo membrane — the dead offscreen
> WebGPU bake is DELETED, not patched.

---

## 3 · The motion + visual spec (warm-cream glass, liquid-weight, both modes)

- **Glass surface (BA.W-NO-GRAY floor):** both the gallery dock rail AND the controls
  panel are the warm-cream six-layer transmissive composite — light
  `srgb(0.944 0.903 0.865 / .52)`, dark `srgb(0.350 0.295 0.249 / .56)` — NEVER the
  current flat gray. The §3 colourful field is the live aurora stage reading THROUGH the
  transmissive scrim (the dock-hub T5 live-behind), with the W-CORNER-AA defined edge.
- **Gallery chips:** φ-proportioned `~240×150`, the warm-cream plate, the active chip
  lifted on `.shadow-cartoon-lg` (the cast TRAVELS on select via a `::after` caster,
  never animated `box-shadow`), `--i`-staggered entrance (the secondary-action tail).
- **Collapse-to-core:** the gallery rail → core chip and back rides the dock-hub
  `--dock-portal-t` ONE scalar on `DOCK_SPRING {response 0.32, ζ 0.7}` — weighty, a hair
  of give, no overshoot-past-gone on collapse. The goo neck (`fission-bridge.css`)
  stretches + thins + snaps; the merge-splash trails the snap (EFFECTS after SPATIAL).
- **Preset-select morph:** `useLiquidReveal` blooms the chip mesh; the field cross-flows
  through the neck; squish ≈0.88→1 volume-preserving (`useLiquidFlex`, capped ≤1.08).
- **Liquid-weight scroll:** the horizontal gallery scroll carries momentum + inertial
  overscroll (the Band-0 motion-spring register), never a tight clamp.
- **√φ + Aristotelian proportion:** thumbnail 16:10, the gallery height the φ-minor of the
  stage, the controls panel the φ-minor of the studio width, chip radius concentric to the
  rail radius.
- **Paper morphism:** the gallery rail + controls panel show the paper grain at rest.

---

## 4 · Cross-engine (Chrome + Safari) + a11y / PRM carve

- **The thumbnail Tier 0 is the whole Safari story:** a CSS `radial`/`conic` warm-mesh —
  no WebGL, no WebGPU, no `toDataURL`, no offscreen device. Byte-identical Chrome ⇄ Safari,
  zero context budget. This is the cross-engine WIN — the dead bake was a WebKit-hostile
  offscreen-device dependency; deleting it removes the entire Safari failure surface.
- **No `backdrop-filter:url()`** anywhere — the goo neck rides the static SVG
  `DockGooFilter` graph (`feGaussianBlur` + `feColorMatrix` threshold, `sRGB`
  interpolation, the REGULAR `filter` property) — the dock-hub's already-Safari-verified
  metaball. Real blob↔meatball merge, NO naive ellipsoids.
- **Compositor-only:** every morph writes `transform`/`opacity`/`filter` on own pixels
  (the dock-hub one-runner fence); the panel-width state-change is a discrete grid-track
  swap, not a per-frame layout animation.
- **Offscreen-park:** the Tier 1 live bake runs only when the gallery is on-screen + idle;
  a hidden tab / scrolled-away gallery does ZERO GL work (the suite park discipline).
- **PRM:** reduced-motion → the goo-tear/eruption is an instant topology swap, the chip
  mesh is static (no drift), the select-morph is fade-only. The colour preview is not
  vestibular (a colour swap lands instantly).
- **a11y:** the collapse core chip is a `<DockExpand>` trigger with
  `aria-expanded`/`aria-controls`; the gallery chips keep their `aria-pressed` (verified
  live) + roving focus; Escape collapses; focus moves into the erupted gallery + restores.

---

## 5 · How it composes EXISTING primitives (DEFT UNION, KISS/DRY, no fork, no legacy)

| Presentation need | Existing primitive CONSUMED | New code |
|---|---|---|
| gallery = horizontal dock | `<GlassDock>` (the ONE dock register) | `<PresetDock>` thin compose |
| collapse-to-core + erupt | `useDockHub`/`<DockExpand topology="envelop">` (dock-hub GOLDEN) | the core-chip trigger |
| select-morph chip→stage | `useLiquidReveal` + `fission-bridge.css` neck + merge-splash | the chip→stage wiring |
| controls collapse-to-dock | `<DockExpand topology="bloom">` per section | section-icon chips |
| thumbnail Tier 0 (zero-GL) | `auroraFallbackGround` static CSS mesh (ships) | per-preset palette→mesh fn |
| thumbnail Tier 1 (real) | the LIVE stage `createAurora` device (no offscreen) | reuse stage instance |
| scroll | `<FadingScroll axis="x">` (ships) | none |
| controls anatomy | `<ConfiguratorLayer>` / `<ConfiguratorRow>` / `<ColorSwatch>` (ship) | none |
| warm-cream glass | `.glass-floating` warmed to the no-gray floor (`configurator.css`) | token re-point |
| chassis (stage|controls grid) | `<Configurator asideSide>` (ships) | `collapsible` + width φ |
| state (apply — WORKS) | `useConfiguratorState` `per-preset` (verified live) | UNTOUCHED |
| cartoon cast / squish / spring | `.shadow-cartoon-*` · `useLiquidFlex` · `DOCK_SPRING` | none |

**RETIRED (no legacy):** `PresetPickerRow.vue` → folds into `<PresetDock>`;
`usePresetThumbnails.ts`'s offscreen-WebGPU bake → DELETED, replaced by the Tier-0 CSS
mesh + Tier-1 live-stage reuse (no second device, no `left:-99999px` canvas). The THREE
preset idioms (viz-studio row · `Configurator` default chip row · gear `SegmentedTabs`)
unify onto the `<PresetDock>` collapse-to-dock grammar (the gear sheet keeps its sheet
host but its preset row becomes the same dock register — ONE vocabulary).

---

## 6 · The born-RED acceptance bar (real pixels, real clicks, both modes/engines)

1. **Thumbnails ALWAYS render** — a π asserts every preset chip paints a non-blank,
   non-skeleton preview (the Tier-0 mesh) within one frame of mount, in Chrome AND
   WebKit, light AND dark. **Born-RED on HEAD** (all 13 blank, `device not acquired`).
2. **No offscreen-WebGPU device dependency** — grep asserts `usePresetThumbnails` no
   longer creates a `left:-99999px` capture canvas / calls `createAurora({mode:"capture"})`
   for the gallery. **Born-RED on HEAD** (it does exactly that).
3. **Gallery is up-top + full-width + larger** — the gallery rect's `y` < the
   stage/controls `y`, its width ≈ studio width (not the 335px gutter), chip ≥ 240px.
   **Born-RED on HEAD** (gallery at 335×225 inside the 359px right aside).
4. **Collapse-to-dock works** — clicking the core chip erupts the gallery via the dock-hub
   goo-tear (the `--dock-portal-t` frame-series + the goo waist), bidirectional. **Born-RED**
   (no collapse exists).
5. **Apply still works** — clicking a preset chip changes the live config + repaints the
   stage (regression guard; verified GREEN today — must STAY green).
6. **Warm glass, both modes** — the gallery + controls surface composited `background`
   resolves the warm-cream composite (chroma > 0), NEVER gray, light + dark. **Born-RED**
   (flat gray/brown today).
7. **Generalizes** — the SAME `<PresetDock>` + `Configurator collapsible` drives every viz
   studio (one call-site pattern, asserted by a call-expression scan, not per-viz CSS).

---

## 7 · Reconcile vs the 116-wave set (the DELTA-ASSAY → wave-amendment, no dup)

- **vs the dock-hub GOLDEN/WAVE-AMENDMENT** — this is a CONSUMER of `useDockHub`/
  `<DockExpand>`/`useElementMorph`; it adds no morph engine. The gallery + controls are
  the ≥3-distinct-surface H3 proof the dock-hub wave already wants (a viz-configurator is
  named there verbatim as a `toSurface` target). **No dup — the configurator-presentation
  is the dock-hub's first real consumer; it AMENDS the dock-hub demo census to name the
  gallery + controls as instances.**
- **vs `BC.W-VIZ-CONFIGURATOR-SUITE` / `VizStudio`** — AMEND: lift `--configurator-aside`
  to the φ width, add `collapsible`, hoist the `#presets` slot ABOVE the stage as the
  `<PresetDock>` masthead. No chassis fork.
- **vs the thumbnail bake wave (`BC.W-VIZ-AURORA` T2, the `armAsync` fix)** — SUPERSEDE the
  offscreen-bake mechanism: the `armAsync`-await fix was necessary-but-insufficient (it
  still needs an offscreen device that Safari refuses). The clean break is Tier-0 CSS mesh
  + Tier-1 live-stage reuse — no offscreen device at all. **A clean break, no legacy bake
  path retained (the no-backwards-compat law).**
- **vs `BD.W-LIVING-ARTWORK` (T11)** — the Tier-0 per-preset CSS mesh IS the living-artwork
  static-mesh applied to the gallery chips; same primitive, a new consumer. No dup.
- **NEW WAVE → `BD.W-CONFIG-PRESENT`** (the union arm): (a) `<PresetDock>` (gallery=dock,
  collapse-to-core, RETIRE `PresetPickerRow`); (b) the Tier-0/Tier-1 thumbnail rebuild
  (DELETE the offscreen WebGPU bake); (c) `Configurator collapsible` + φ width + warm-cream
  no-gray surface; (d) the unify of the three preset idioms; (e) the born-RED π (§6).
  Tranche-dev only.

---

## 8 · Why this is the cross-engine/perf-first read

The user sees "the gallery is broken" and "too small." The PERF lens finds the broken-ness
is a **device-fragile offscreen WebGPU bake** that Safari structurally refuses — so the
boldest, simplest, both-engines-perfect fix is to **stop needing a device for a static
preview at all** (Tier-0 CSS mesh), and the "too small / collapse-to-dock" asks are not a
new layout system but the **dock-hub the library already converged**, pointed at the demo's
own tuning UI. One deletion (the bake), one recomposition (gallery=dock, controls=dock-hub
panel), zero new engines, warm glass restored, Safari flawless, the whole thing DRY across
every viz studio. The fittest survives (`useConfiguratorState` apply, `<FadingScroll>`, the
`ConfiguratorRow` anatomy, the dock-hub), the weak is refined (the gray surface → warm
cream, the gutter gallery → up-top dock), and only the broken is re-invented (the dead
offscreen bake → the zero-GL mesh).
