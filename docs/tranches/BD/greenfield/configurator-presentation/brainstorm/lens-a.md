# lens-a — CONFIGURATOR-PRESENTATION, pure iOS-27 fidelity

> **GREENFIELD BRAINSTORM (lens-a, pure ios27).** The per-page configurator + preset gallery
> on `/substrates/aurora` (and every sibling viz studio) redesigned from first principles, then
> reconciled — DEFT, no fork — onto the shipped `<Configurator>` chassis + the dock-hub GOLDEN
> spine (`useDockHub` / `<DockExpand topology>` / `toSurface`). Binding law: IOS27-REFERENCE the
> guiding light · perfected warm-cream six-layer glass (NEVER gray) · §3 colourful field + edge ·
> AUDACIOUS √φ type · CARTOON technicolor punch · LIQUID-WEIGHT UNIVERSAL · golden proportion ·
> metaball PERFECT Chrome+Safari · UNION not bolt-on · KISS/DRY · NO LEGACY.

---

## 0 · The LIVE born-RED interrogation (real painted-pixel + real preset click, both modes)

Live on `http://localhost:5173/substrates/aurora`, 1440×900, chrome-devtools, `getBoundingClientRect`
+ `getComputedStyle` + console + a real preset click. **All four user asks reproduce on HEAD.**

**The studio geometry (the cramp is REAL, measured):**

| Part | Measured rect | The defect |
|---|---|---|
| `.viz-studio` / `[data-slot=configurator]` | 1066 × 629 | the whole studio |
| `#stage` (live aurora) | **704** × 627 (66% of width) | the field dominates |
| `.configurator-aside` (right rail) | ~360 wide | the WHOLE right column is 360px |
| `#presets` gallery (the "Presets" row) | **335 × 225**, top: 51, left: 950 | **cramped, rail-trapped, NOT up-top, NOT full-width** |
| `[data-aurora-atoms-surface]` controls | **359** wide, top: 345 | the configurator IS small — a 360px rail |

So the gallery is a **335×225 box wedged into the TOP of the 360px right rail, ABOVE the
controls** — exactly the user's "configurator too SMALL, gallery cramped." Only ~2 cards
(Sky/Dawn) are visible; it scrolls horizontally but in a tiny porthole. It is NOT large, NOT
up-top, NOT full-width, and does NOT collapse to a dock.

**Why structurally:** `<Configurator>` renders `<slot name="presets">` INSIDE `.configurator-aside`
as a `shrink-0 border-b px-3 py-2` strip (`Configurator.vue:232-281`), pinned in the narrow
`minmax(--configurator-aside-min 280px, --configurator-aside-max 360px)` band
(`configurator.css`). The preset gallery is, by chassis design, a sub-element of the 360px
inspector rail — there is no top-row, full-bleed slot for it.

**The presets DON'T RENDER (defect 3 — root-caused):** ALL 13 preset cards report
`hasImg:false, hasSkeleton:true` — **every card is a perpetual shimmer skeleton.** Console:
> `[Aurora] thumbnail bake aborted: Error: [useWebGPUCanvas] device not acquired`

`usePresetThumbnails.ts` bakes 13 thumbs on ONE offscreen capture-canvas via
`createAurora(shared, …, {mode:"capture"})` → `aurora.armAsync()` (line 74-90). On the **WebGPU
backend the offscreen capture context never acquires a device**, `armAsync()` throws, the outer
`finally` disposes, and `thumbs[key]` stays `""` for all keys → `<PresetPickerRow>` renders the
`<Skeleton variant="shimmer">` v-else forever. **This is the user's literal "NONE render."**

**The APPLY does work (the nuance):** a real click on `Crayon` moved `aria-pressed`, swapped the
configurator's Seed hex `#BC7BFF → #D7352D`, the arrangement to `Diagonal`, the header to
`6 stops · 5 nuclei` (Crayon's exact palette) — the live config applies to stage + controls. So
the precise truth is **APPLY ✅, RENDER ❌**: the gallery is a wall of identical blank shimmer, so
you cannot preview or tell presets apart — it *reads* as "nothing works," and that read is the
defect. (Also caught: `aria-pressed=true` sits on **Van Gogh** while the page leads with
**OPENAI_DAWN** — a current-key/initial-preset mismatch.)

**Warm-glass / both modes:** light mode reads warm-cream over the aurora — acceptable. **Dark mode
the right rail reads GRAY-BROWN** over the vibrant field (the §3 warm floor is too faint at the
inspector tier over a saturated backdrop — a BA.W-NO-GRAY-adjacent miss). The two preset cards are
opaque white boxes with skeleton wells — they do not read as glass.

**The generalization gap (defect 5 — surveyed):** there is **no single configurator-presentation
pattern.** `aurora` → `PresetPickerRow` (baked thumbs, broken); `blob` → its own `#presets`
weighted row; `fourier-field` → the default chip row; `concentric` + `paper-grid` → raw
`<Configurator>` with **NO preset gallery at all**; `constellation`/`dot-flow`/`dot-matrix`/
`glass-material`/`glass-panel`/`goo-dot` → no preset row. Five different presentations (or none)
for one job.

**VERDICT — honest born-RED:** all four asks reproduce. Gallery cramped+rail-trapped (1); not
large/up-top/scrollable-properly/collapse-to-dock (2); thumbnails 100% broken — capture-mode
WebGPU device-not-acquired (3); dark-mode rail reads gray, cards aren't glass (4); five divergent
presentations, no DRY pattern (5).

---

## 1 · THE GREENFIELD GESTALT — the preset gallery IS A DOCK; the configurator IS A SURFACE that DOCK ERUPTS

The ios27 read of "a gallery up top that collapses into a glass dock, and the configurator behaves
the same" is **already the dock-hub GOLDEN spine, applied to the studio.** We do not invent a new
widget — we recognise that the studio's two chrome bodies are the two halves of the shipped hub
vocabulary:

> **The preset GALLERY is a horizontal `<GlassDock>` pinned to the TOP of the stage — a
> persistent floating media-dock (IOS27 T16) whose tiles are the baked preset thumbnails. It
> COLLAPSES (scroll / explicit toggle) into a compact glass dock-core (a single "Presets ●●●"
> capsule) and RE-EXPANDS on demand — the `useScrollChrome` collapse the dock already ships. The
> CONFIGURATOR is a `<DockExpand topology="envelop">` surface that ERUPTS from a control on that
> same dock — the goo-tear membrane (GOLDEN §2). One vocabulary, both bodies, every studio.**

The two user sentences map ONE-to-ONE onto two shipped topologies:

| user ask | the GOLDEN topology | what it composes |
|---|---|---|
| "gallery LARGER, UP-TOP, SCROLLABLE, COLLAPSE INTO a glass DOCK" | a top-pinned **`<GlassDock>` + `useScrollChrome`** (collapse-to-core) | the dock-core collapse, IOS27 T16 media-dock |
| "configurator … function similarly" (collapse/expand like the dock) | **`<DockExpand topology="envelop">`** erupting the configurator panel | `useDockHub.toSurface` + the goo-tear |
| "the OTHER configurators function similarly (DRY)" | the SAME `<VizStudioDock>` chassis | one composition, every viz |

This is the deftest possible union: the configurator-presentation problem is **the dock-hub
problem in a studio costume.** The gallery is a media-dock; the configurator is an envelop-surface;
the chassis that hosts both is `<VizStudio>` extended once.

### 1.1 The layout reflow — gallery TO THE TOP, full-bleed, over the stage

`<Configurator>` grows ONE structural option (no fork, additive prop):

```ts
// Configurator.vue — additive
presetsPlacement?: "aside" | "stage-top"   // default "aside" (no churn)
```

`stage-top` portals the `#presets` slot OUT of the 360px `.configurator-aside` and pins it as a
**floating glass dock across the TOP of the `.configurator-stage`** (the 704px+ wide column),
`position:absolute; inset-block-start:φ-margin; inset-inline:φ-margin` — a detached island with
margins all round (T16). The gallery is now ~660px wide instead of 335px (≈2× the cramp), scrolls
horizontally with momentum + ±neighbour peek (T13 calm-overdamped, NOT bouncy), and floats as
transmissive glass OVER the live aurora — the §3 colourful field reads THROUGH it.

The controls (the configurator body) keep the right rail — but the rail WIDENS (the gallery no
longer steals its top third): `--configurator-aside-max` lifts to a φ-derived band so the
configurator stops being "too small." On `lg-`, the gallery stacks as a top strip above the stacked
stage+controls (single-column), still a dock.

### 1.2 The gallery AS A DOCK — collapse-to-core (the headline interaction)

The top gallery is literally `<GlassDock orientation="horizontal">` (the shipped shell dock, full
keyboard/roving model inherited) hosting N `<DockTile>` preset thumbnails + a leading "Presets"
label puck. It wears `useScrollChrome` (the shipped collapse-state composable):

- **Expanded (rest / scroll-up):** the full thumbnail strip — large baked previews, the active
  preset lifted (the cartoon `-translate-y` + `shadow-cartoon` cast), horizontally scrollable.
- **Collapsed (scroll-down past threshold):** the dock **goo-collapses** (the shipped
  `--dock-morph-t` / `DOCK_SPRING` squish, box-INVIOLATE) into a single compact capsule — a
  `[◧ Presets · "Crayon" ●●●●●]` core showing only the ACTIVE thumb + a row of dot-indices — so
  the stage reclaims full height while you tune. Tapping the core re-erupts the full strip.

This is the dock-core/dock-hub collapse verbatim (GOLDEN dock-core), NOT a new collapse engine. The
collapse carries liquid weight: squish on the way down, a hair of `ζ≈0.7` give on the way up, the
goo neck reads at the merge (the `fission-bridge.css` necks — Safari-safe static SVG).

### 1.3 The configurator AS AN ENVELOP-SURFACE — "function similarly"

The user's "the configurator should function similarly" = the configurator panel is a
`<DockExpand topology="envelop">` whose trigger is a `[⚙ Tune]` puck on the same top dock. On
desktop the configurator is open-by-default in the right rail (the inspector idiom survives); but
the SAME open/close is the dock-hub goo-tear — so on mobile / on a "focus mode" toggle the
configurator **erupts from the ⚙ puck as the dock's own glass skin tearing open** (GOLDEN §2 four
beats: anticipate → neck-stretch → burst → settle), then sucks back. One verb (`hub.toSurface(⚙,
configuratorPanelRef, {topology:'envelop'})`), zero new physics — the configurator inherits the
dock's liquid identity for free. The gallery-collapse and the configurator-eruption are the SAME
spring family (`DOCK_SPRING`), so the two bodies move as one weighted system.

### 1.4 The DRY chassis — `<VizStudioDock>` (the generalization, defect 5)

`<VizStudio>` is extended ONCE (or a thin `<VizStudioDock>` superset) so EVERY studio gets the same
presentation for free:

```vue
<VizStudio presets-placement="stage-top" :gallery-collapsible="true">
  <template #stage>      <AuroraStage … />            </template>
  <template #controls>   <AuroraConfigDock … />        </template>
  <template #presets="s"> <PresetGalleryDock v-bind="s" /> </template>
</VizStudio>
```

`<PresetGalleryDock>` is the ONE generic gallery-as-dock (a `<GlassDock>` of `<PresetTile>`s + the
scroll-collapse + the φ-thumbnail) — `PresetPickerRow` is RE-IMPLEMENTED as this (keeps its name,
no legacy alias). Studios with no thumbnail bake (concentric, paper-grid, dot-matrix) pass
`<PresetTile variant="swatch">` (a cheap CSS gradient/mini-canvas chip, no GL bake) — so **every**
configurator page gets a large, up-top, scrollable, collapse-to-dock gallery, brand-uniform. The
five divergent presentations collapse to ONE.

---

## 2 · THE SINGLE BOLDEST MOVE

> **Recognise that the studio's two chrome bodies ARE the dock-hub spine in disguise, and unify
> them onto it: the preset GALLERY becomes a top-pinned, scroll-collapsing `<GlassDock>` of
> thumbnail tiles (a persistent media-dock that goo-shrinks to a `[Presets ●●●]` core), and the
> CONFIGURATOR becomes a `<DockExpand topology="envelop">` surface that the SAME dock erupts via the
> goo-tear membrane — so "the gallery collapses into a glass dock" and "the configurator functions
> similarly" are not two features but ONE shipped vocabulary (`useDockHub` + `useScrollChrome` +
> `DOCK_SPRING`) applied to the studio, DRY across every viz, zero new physics core.**

The audacity: the studio stops being "a panel with a cramped thumbnail strip bolted in a rail" and
becomes **a living dock-hub** — the gallery breathes (collapse/expand with liquid weight), the
configurator erupts from it as one continuous warm-glass membrane, and both inherit the dock's
identity. It is bold (the configurator literally tears out of the gallery dock) AND deft (100%
shipped engines: `<GlassDock>` + `useScrollChrome` + `useDockHub.envelop` + `DOCK_SPRING` +
`fission-bridge.css` necks — only the `presetsPlacement="stage-top"` reflow + the
`<PresetGalleryDock>` re-host + the WebGPU capture-bake FIX are new).

---

## 3 · The blocking FIX — make the presets actually RENDER (defect 3, the gate)

No presentation matters if the tiles stay blank. The bake must survive the WebGPU backend:

- **Root cause:** `usePresetThumbnails.bake()` calls `aurora.armAsync()` on a `mode:"capture"`
  offscreen canvas whose WebGPU device is never acquired → throw → all thumbs `""`.
- **The fix (engine-honest, not a demo patch):** the capture path must **acquire a device** (await
  the WebGPU adapter→device→configure prelude in capture mode, the same `armAsync` the live stage
  awaits) OR **fall back to the WebGL2 capture context** when no device resolves (the offscreen
  bake does not need WebGPU — WebGL2 raster is sufficient for a 320×200 still). Prefer: capture
  mode forces the WebGL2/software-raster backend (the deterministic still-frame path) so the bake
  is backend-independent and never blocks on device acquisition. One `mode:"capture"` → WebGL2
  pin in `createAurora`, no per-call try/catch lottery.
- **Belt-and-braces (the never-blank floor):** when a thumb fails to bake, render a **CSS
  conic/mesh swatch derived from the preset's OKLCh palette** (the `presets.ts` `palette[]` stops →
  a `conic-gradient` chip) instead of an eternal skeleton — so a tile ALWAYS shows the preset's
  COLOUR even if GL is unavailable (PRM/headless/Safari-cap). This doubles as the `variant="swatch"`
  tile the no-bake studios use (§1.4) — DRY.
- **The current-key fix:** seed `useConfiguratorState.initialPreset` and the gallery's `current`
  from the SAME source so `aria-pressed` lands on the lead preset (Dawn), not Van Gogh.

---

## 4 · Motion + visual spec (ios27 liquid-weight, perfected glass, both modes)

- **Spring:** ONE register — the shipped `DOCK_SPRING {response 0.32, ζ 0.7}` for gallery
  collapse/expand + the configurator envelop-eruption; `bouncy` for a tile select-pop. No new clock.
- **Gallery scroll (T13):** momentum YES, snap-bounce NO (calm-overdamped) + ±neighbour peek always
  ~12% visible; the active tile lifts on the cartoon cast.
- **Tile select (T4-flavoured):** the picked thumbnail overshoots ~1.12× then settles (squash &
  stretch, volume-preserving via `useLiquidFlex`), the label cross-fades, a one-shot
  `--glass-accent` flood trails the spatial commit (EFFECTS after SPATIAL) then clears — a CONSUMER
  accent (presets-in-consumers), default the warm neutral lift.
- **Collapse-to-core:** the dock squishes (not a flat scale) on the `--dock-morph-t` scalar, the
  goo neck reads at the merge (the metaball waist), `ζ≈0.7` give on re-expand, NO overshoot-past-gone
  on collapse.
- **Configurator envelop-eruption:** the four GOLDEN beats (anticipate inhale → neck-stretch →
  burst-splash → settle follow-through) on `--dock-portal-t`, the membrane is the dock's OWN
  warm-cream skin flowing into the panel rect.
- **Glass (BA.W-NO-GRAY floor, BOTH modes):** the top dock + the configurator panel are the
  warm-cream six-layer transmissive composite (light `srgb(.944 .903 .865/.52)`, dark
  `srgb(.350 .295 .249/.56)`) — and the dark-mode rail is RE-FLOORED off the measured gray-brown
  toward the warm composite (the live defect). The media-dock variant opts into `.glass-deep`
  (14-20px blur) over the vibrant aurora — the field bleeds its hue into the dock rim (T7, rides the
  shipped `--glass-accent` + the luminance observer).
- **§3 colourful field + edge:** the live `<AuroraStage>` reads THROUGH the top dock + the panel
  (transmissive, never flat scrim); every tile + the dock carry the W-CORNER-AA rim (the defined edge).
- **Paper morphism:** the settled configurator panel + the resting tiles show the paper grain.
- **√φ type:** the "Presets" label + the active-preset name use the sqrt-φ display ladder, -1.5%
  tracking; the gallery is large enough to carry an audacious tile caption.
- **Golden proportion:** the top-dock margin, the tile aspect (16:10 ≈ φ-ish → tune to √φ), the
  collapsed-core width, the configurator settled rect all derive from φ ratios off the stage rect.

---

## 5 · Cross-engine (Chrome + Safari) + a11y / PRM

- **Compositor-only:** the reflow is `position:absolute` + the collapse/eruption write ONLY
  `transform`/`opacity`/`filter` (the dock engines' floor) — no width/height/top/left animation.
- **Metaball PERFECT both engines:** the collapse/eruption necks ride `DockGooFilter` (static SVG
  `filter:url(#…)`, `color-interpolation-filters:sRGB`, feGaussianBlur+threshold+composite) — the
  shipped Safari-safe goo, NO `backdrop-filter:url`, real blob↔meatball merge, NO naive ellipsoids.
  `@supports` floor → no `filter:url` → clean scale-collapse (no goo, still works).
- **Thumbnail bake Safari/headless:** the WebGL2/software-raster capture pin (§3) bakes on every
  backend; the OKLCh-swatch fallback covers a hard GL-absent floor — Safari never shows a blank tile.
- **PRM:** `useScrollChrome` + `useDockHub` honor `prefers-reduced-motion` → instant collapse /
  instant envelop swap, zero neck/squish/cast frames, fade-only; the accent-flood lands instantly.
- **a11y:** the gallery dock is a real `<GlassDock>` `role="tablist"` of preset `role="tab"`
  tiles (roving tabindex inherited), `aria-selected` on the active, arrow-keys cycle (the shipped
  `registerShortcut` ArrowLeft/Right). `<DockExpand>` sets `aria-expanded`/`-controls` on the ⚙
  trigger, focus-move-in + restore, Escape-closes. The collapse toggle is a labelled button.
- **Both modes:** warm-cream composite, light + dark, never gray (the dark-rail re-floor is the
  live fix).

---

## 6 · How it composes EXISTING primitives (DEFT — a UNION, not a fork)

| presentation need | shipped primitive CONSUMED | new code |
|---|---|---|
| gallery as a dock | `<GlassDock orientation="horizontal">` (shell dock) | re-host `PresetPickerRow` → `<PresetGalleryDock>` |
| collapse-to-core | `useScrollChrome` + `--dock-morph-t` + `DOCK_SPRING` (box-INVIOLATE) | wire scroll-collapse on the gallery dock |
| configurator eruption | `useDockHub.toSurface(…, {topology:'envelop'})` + `<DockExpand>` (GOLDEN spine) | the ⚙ trigger + the panel ref |
| goo necks (collapse + eruption) | `DockGooFilter` + `fission-bridge.css` | none |
| tile select squish/flood | `useLiquidFlex` + `--glass-accent` flood (presets-in-consumers) | thin tile recipe |
| glass material | `.glass-floating`/`.glass-deep` + `useGlassBackdropLuminance` (hue-bleed) | dark-rail warm re-floor |
| layout reflow | `<Configurator>` `presetsPlacement` (additive prop) | `"stage-top"` portal branch |
| DRY chassis | `<VizStudio>` (the shared studio chassis) | `presetsPlacement`/`galleryCollapsible` pass-through |
| thumbnail bake | `createAurora({mode:"capture"})` | WebGL2/raster capture pin + OKLCh-swatch fallback |
| scroll/peek | the gallery's horizontal scroll + `FadingScroll axis="x"` | momentum + φ peek |
| a11y/roving | `<GlassDock>` keyboard model + `registerShortcut` | tablist roles on tiles |

No second dock, no second collapse engine, no second morph runner — the gallery IS a `<GlassDock>`,
the collapse IS `useScrollChrome`, the configurator eruption IS `useDockHub.envelop`. The ONLY real
new code is the `stage-top` portal reflow, the `<PresetGalleryDock>` re-host, the capture-bake fix,
and the dark-rail warm re-floor.

---

## 7 · The DELTA-ASSAY → wave-amendment (reconcile vs the 116-wave set, no dup)

This is a **demo-chassis composition + one engine FIX + one chassis prop**, NOT a new dock band. It
rides the dock-hub GOLDEN and AMENDS existing waves:

- **AMENDS the dock-hub wave (`W-DOCK-HUB-API`):** the studio (gallery-dock + configurator-envelop)
  is an INSTANCE of `useDockHub` / `<DockExpand topology>` — proves the spine's surface-TYPE-blind
  contract on a real configurator surface (the H3 ≥3-distinct-surface gate gains a 4th: the viz
  configurator). No engine fork; the studio is a consumer of the shipped hub.
- **AMENDS `BC.W-VIZ-CONFIGURATOR-SUITE` (the VizStudio chassis):** add `presetsPlacement="stage-top"`
  + `galleryCollapsible` to the ONE chassis; re-host every studio's preset row onto
  `<PresetGalleryDock>` (the DRY close — defect 5). The chassis already exists; this extends it.
- **NEW small wave `W-CONFIG-GALLERY-DOCK`** (demo-chassis, Pass-C/E): the `stage-top` reflow + the
  gallery-as-`<GlassDock>` + the scroll-collapse + the `<PresetGalleryDock>` re-host across all viz
  studios. Born-RED: the live measured 335px rail-trapped gallery + the 5 divergent presentations.
- **NEW engine FIX `W-AURORA-CAPTURE-BAKE`** (the gate, library): the WebGPU capture-mode
  device-not-acquired → WebGL2/raster capture pin + the OKLCh-swatch never-blank fallback +
  the current-key/initial-preset reconcile. Born-RED: the live console abort + 13/13 skeleton tiles.
- **vs `W-MEDIA-DOCK` / `W-DOCK-SCROLL-FISSION`:** the gallery-dock IS a media-dock instance (T16)
  with the scroll-collapse (a sibling of scroll-fission, sharing `useScrollChrome`). No dup — same
  spine, studio costume.
- **No dup of `PresetPickerRow`/`usePresetThumbnails`:** both are RE-IMPLEMENTED (kept names, no
  legacy alias — no-backwards-compat law) onto the dock + the fixed bake.

The π-gate (born-RED on HEAD): (a) the gallery rect is TOP-of-stage + ≥1.8× the 335px width +
horizontally scrollable; (b) a scroll-down collapses it to a core (the squish + goo waist reads,
both modes); (c) ≥1 preset tile renders a REAL baked thumbnail (`img.naturalWidth>0`, the live
console abort gone) AND a click APPLIES the config live (seed/header diff); (d) the configurator
opens via the envelop goo-tear (the boundary grows + the neck waist); (e) BOTH modes warm-cream,
never gray; (f) the SAME chassis drives ≥2 studios (aurora + one more) — the DRY proof.
