# AS.W7 · WAVE-1 · Cluster A3 — Configurator + pill list (D5 · D7 · D8)

Read-only diagnosis. Every root cause is grounded at `file:line` and confirmed
against the running demo (`:5173`) + the two user screenshots. The fix specs name
the exact change Wave-2 makes — they are NOT applied here.

Scope: the three defects all live in the configurator surface — the bare
`/primitives/configurator` story (sparse, must merge mobile), the aurora "in-anger"
configurator dock (empty-void layout + pill overflow), and the `Medium·Palette·Flow·
Texture·Comp·Nuclei` pill rail (clipped, not scrollable).

---

## Surface map (who renders what)

- The **pill rail** is NOT a DockLayerGroup rail and NOT a raw ToggleGroup — it is
  `<BouncyTabs variant="pill" overflow="scroll">` at
  `demo/stories/aurora/AuroraConfigDock.vue:55-63`. `BouncyTabs`
  (`src/components/custom/tabs/BouncyTabs.vue`) forwards to `BouncyToggle`
  (`src/components/custom/tabs/BouncyToggle.vue`) with `:multi-select="false"`.
  The crossfade between layer bodies below it is a separate `DockLayerGroup`
  (`:show-rail="false"`) at `AuroraConfigDock.vue:75-110` — its native icon rail is
  suppressed; BouncyTabs is the sole switcher.
- The **library primitive** is `<Configurator>` (`Configurator.vue`) — a CSS-grid
  shell: `stage` 1fr + `aside` band `minmax(280px,360px)` at `lg`+
  (`Configurator.vue:135-136`). `<ConfiguratorLayer>` is the collapsible section,
  `<ConfiguratorRow>` the labeled field row.
- Two stories: `demo/stories/primitives/configurator.vue` (the bare story — D5/D7
  evidence) and `demo/stories/primitives/configurator-mobile.vue` (the density A/B).
  Both registered at `demo/stories/manifest.ts:105-106`.
- The aurora composition `demo/stories/aurora.vue` is the configurator-in-anger
  (flat route `/aurora`, `manifest.ts:295-302`).

---

## D8 — pill rail overflows, active item clipped, not scrollable

### Root cause (measured)

The 6 pills do not fit the aside. Intrinsic content widths (measured live against
the BouncyToggle pill recipe — `padding:0.125rem 0.625rem; font-size:0.75rem;
gap:0.125rem; outer padding 0.125rem`):

| Medium | Palette | Flow | Texture | Comp | Nuclei | **total** |
|--------|---------|------|---------|------|--------|-----------|
| 65 | 59 | 47 | 61 | 54 | 55 | **355px** |

The aside band is `minmax(var(--configurator-aside-min,280px),var(--configurator-aside-max,360px))`
(`Configurator.vue:136`). At the **widest** 360px the pill-row host
(`AuroraConfigDock.vue:55` — `<div class="… px-3 py-2">`) gives ~332px usable
(360 − 24 `px-3` − ~4 pill padding). 355 > 332, so the row overflows by ~23px at the
widest aside, and far more at the default/narrow band. Nuclei is the LAST pill, so it
is the one pushed past the edge.

The `overflow="scroll"` path was the intended fix — it swaps the inline-grid for
`display:flex; overflow-x:auto` at `BouncyToggle.vue:490-498` and adds
`scroll-fade-mask scrollbar-hidden` (`BouncyToggle.vue:256`). The row CAN scroll. The
defect ("not scrollable, Nuclei clipped") is the conjunction of three mechanisms, all
real:

1. **No scroll affordance.** `scrollbar-hidden` (`BouncyToggle.vue:256`,
   `utilities.css:108-111`) removes the scrollbar, and `scroll-fade-mask`
   (`utilities.css:260-263`) fades the right edge to transparent. So the rightmost
   pill (Nuclei) is rendered behind a fade-to-nothing with no visible track — it
   reads as clipped, not scrollable. A pointer/trackpad CAN scroll it, but nothing
   signals that it is scrollable, and there is no left/right control.
2. **No scroll-active-into-view.** When `activeLayer` is anything but the last pill
   (default is `"medium"`, `aurora.vue:76`), the scroll offset stays at 0 and the
   active pill is fine — but when the active layer IS Nuclei (the screenshotted
   state), nothing scrolls Nuclei's button into the viewport. `BouncyToggle` has no
   `scrollIntoView` on selection — `select()` (`BouncyToggle.vue:183-207`) only emits
   + animates the press; it never adjusts `containerRef.scrollLeft`. So selecting
   Nuclei leaves it under the right fade.
3. **Anchor slider can desync under scroll.** On anchor-supporting engines the active
   pill carries `anchor-name:--gl-toggle-active` and `.bouncy-slider--anchor` tethers
   via `position-anchor`+`inset:anchor(...)` (`BouncyToggle.vue:377-395`). The anchor
   box tracks the button correctly inside a scroller, but combined with (1)+(2) the
   user never sees a correctly-placed slider on the clipped pill.

### Fix spec (Wave-2)

The redesign direction is a **proper scrollable segmented rail with affordance +
active-into-view**, owned in the library primitive `BouncyToggle` so every consumer
benefits (it is the shared pill rail).

- **`src/components/custom/tabs/BouncyToggle.vue:183-207` (`select`)** — after the
  emit, scroll the just-selected button into view when a JS/overflow scroller is
  live: `buttonRefs.value[idx]?.scrollIntoView({ inline: 'nearest', block:
  'nearest', behavior: prefers-reduced-motion ? 'auto' : 'smooth' })`. Gate on
  `isScroll.value || isAuto.value`. This closes mechanism (2) — selecting Nuclei
  brings it on-screen.
- **`src/components/custom/tabs/BouncyToggle.vue` `onMounted` (237-244)** — when an
  overflow scroller is active, also `scrollIntoView` the initially-active button on
  mount, so a configurator that opens with `activeLayer="nuclei"` is not born clipped.
- **`src/components/custom/tabs/BouncyToggle.vue:490-498` (`.bouncy-toggle--scroll`)**
  — drop `scrollbar-hidden` for the `scroll` variant OR replace the right-edge
  `scroll-fade-mask` with a state-driven fade that only paints when there IS
  overflow (a `--gl-scroll-end` shadow gated on `scroll-snap`/JS overflow flag).
  Minimal: keep the mask but ensure mechanism (2) lands the active pill inside the
  solid (non-faded) band. The fade should never fully hide the rightmost pill at
  rest — narrow the `--mask-fade-width` for the pill rail or pad the scroller's
  inline-end so the last pill clears the fade.
- **Alternative redesign (preferred for expressiveness, D7-coupled):** at the
  current 360px aside the 6 labels are short — instead of scrolling, make the rail
  **wrap to two rows** OR shorten via a `compact`/icon mode. But the canonical fix
  is scroll-with-affordance because the aside narrows to 280px default; ship the
  scroll fix and let Wave-2 frontend-design decide wrap-vs-scroll per the final aside
  width. Either way the change is in `BouncyToggle.vue`, not the consumer.
- **Aside-width lever (consumer side, `aurora.vue`):** the aurora studio leaves the
  aside at its default band. Widening it (`<Configurator :aside-width="['320px',
  '420px']">` at `aurora.vue:145`) buys the pill row room — but this is a palliative;
  the library scroll fix is the correctness fix because consumers can set any width.

---

## D7 — configurator not expressive: huge empty void below sparse controls

### Root cause

Two distinct void mechanisms — one per surface.

**(a) Bare story `/primitives/configurator` (the sparse one).**
`demo/stories/primitives/configurator.vue:44-87` mounts `<Configurator>` with NO
height and a near-empty stage:

- The stage slot (`configurator.vue:50-57`) is a single centered `<code>` line
  (`spread: 60 · bloom: 50 · grain: true`). Measured live: stage = **740×291px** of
  empty box for one line of text. The grid gives the stage `1fr`
  (`Configurator.vue:136`) so it inflates to ~740px wide with nothing in it — the
  "huge empty void."
- The aside holds 3 bare `<ConfiguratorRow>`s (Spread/Bloom/Grain,
  `configurator.vue:58-86`) with no `<ConfiguratorLayer>` grouping, no preset
  thumbnails, no header — sparse by construction.
- The Configurator height is content-driven (`cfgMinH:0`, measured height 293px)
  because nothing sets a height — so the void is "as tall as the aside's 3 rows,"
  which on a wide viewport reads as a flat under-designed band, and the stage is a
  big blank rectangle beside it.

**(b) Aurora studio `/aurora` (the in-anger one).**
`aurora.vue:145-153` sets `scroll-mode="never"` + `h-[min(78vh,720px)]`. Here the
stage IS full (AuroraStage WebGL canvas), so the void is not the stage — it is the
**aside controls column under-filling its 720px height**. `AuroraConfigDock.vue:74`
gives the layer body `flex-1 min-h-0 overflow-y-auto`, but each layer
(MediumLayer/etc.) is a short stack of rows, so under a 720px aside the body has a
large empty tail below the controls. The DockLayerGroup crossfade keeps the host
height fixed (good — no canvas reflow) but the controls do not fill it, so the bottom
of the 720px aside is dead space.

### Fix spec (Wave-2)

D7 is a frontend-design refinement (Wave-2's methodology), grounded here:

- **Bare story void — `demo/stories/primitives/configurator.vue:50-57` (stage
  slot).** Replace the lone `<code>` line with an expressive live specimen that
  earns the 1fr stage — e.g. a visual preview that reads `spread/bloom/grain` (a
  bloom-radius swatch, a grain-overlay sample, a gradient that responds to the
  sliders). The stage must SHOW the config, not print it. This is the single biggest
  D7 lever for the bare story.
- **Bare story height — `configurator.vue:44` (`<Configurator>` open tag).** Add an
  explicit height so the shell reads as a studio panel, not a thin band:
  `class="h-[min(70vh,560px)]"` (mirrors aurora's `h-[min(78vh,720px)]` idiom). A
  bounded height makes the stage a proper viewport and gives the `scroll-mode="auto"`
  controls a reason to scroll.
- **Bare story controls density — `configurator.vue:58-86`.** Group the 3 rows under
  a `<ConfiguratorLayer label="Field">` (the layer header + chevron the primitive is
  built for) so the aside is not a flat list. Add the preset thumbnails via the
  `presets` slot, or at minimum keep the default preset row (already wired,
  `configurator.vue:46-48`). Expressiveness = layer grouping + a real stage.
- **Aurora aside tail — `AuroraConfigDock.vue:74` (layer-body wrapper).** The empty
  tail under a 720px aside is acceptable for a scroll body, but to kill the dead
  space, either (i) bottom-anchor a footer (preset name + reset already exist in the
  header) or (ii) let short layers center vertically. Lower priority than (a) — the
  aurora stage is the hero; the aside tail is cosmetic. Defer unless Wave-2 finds it
  jarring at the test viewport.
- **Overflowing pill row contributes to "unfinished" read** — fixing D8 (above)
  removes the clipped-Nuclei artefact that makes the aurora dock look broken.

---

## D5 — bare story sparse + must merge with configurator-mobile into one responsive story

### Root cause (structural, not a render bug)

Two routes exist for one primitive:

- `demo/stories/manifest.ts:105` — `s("primitives", "configurator", "Configurator", …)`
  → `demo/stories/primitives/configurator.vue` (preset + scroll-mode demo).
- `demo/stories/manifest.ts:106` — `s("primitives", "configurator-mobile",
  "Configurator (mobile density)", …)` →
  `demo/stories/primitives/configurator-mobile.vue` (the `mobile` vs `comfortable`
  density A/B, side-by-side via `lg:grid-cols-2`, `configurator-mobile.vue:35`).

The split is the defect: the "mobile" story is not a separate primitive, it is the
SAME `<Configurator>` at a different `density` prop. The density axis is meant to be
demonstrated responsively (one story that adapts), not as a second route. Per the
user: merge into one responsive story.

### Fix spec (Wave-2)

- **Merge target — `demo/stories/primitives/configurator.vue`.** Fold the density
  demonstration into the bare story. The bare story already composes the full
  primitive (preset row + controls + stage); add a density treatment that is
  *responsive* rather than a static side-by-side: drive `<Configurator :density>` off
  a viewport `matchMedia` (or the `--density` container-style-query the primitive
  already honors — `ConfiguratorRow.vue:159-184`) so one Configurator reads `mobile`
  at narrow widths and `comfortable` at wide. This is the "responsive, not two
  routes" the user asked for. Keep one expressive specimen (D7 stage fix) so the
  merged story is the single canonical configurator demo.
- **Retire the second route — `demo/stories/manifest.ts:106`.** Delete the
  `configurator-mobile` manifest entry (per the no-backwards-compat house rule — no
  redirect alias) and delete
  `demo/stories/primitives/configurator-mobile.vue`. The density A/B content it
  carried (`LabeledSelect/Slider/Switch` under a `<ConfiguratorLayer>`) is absorbed
  into the merged story.
- **Salvage from the mobile story:** `configurator-mobile.vue:44-63` uses a
  `<ConfiguratorLayer label="Field">` wrapper — carry that grouping pattern into the
  merged story (it is the D7 "group the rows" fix too). The mobile story is also the
  ONLY story exercising `<ConfiguratorLayer>` — losing it means the merged story must
  keep a layer so the primitive's collapsible section stays demonstrated.
- **Manifest count note:** removing one entry drops the primitives list by one — no
  other manifest math depends on the index, and the route is path-derived
  (`router.ts:45-56`), so the delete is clean.

---

## Defect → file:line → fix index

| ID | Root cause (file:line · mechanism) | Demo/Lib | Severity |
|----|-----------------------------------|----------|----------|
| D8 | `BouncyToggle.vue:183-207` (`select` has no scroll-active-into-view) + `:256`/`:490-498` (`scrollbar-hidden`+`scroll-fade-mask` hide the affordance and fade the last pill) — 6 pills = 355px > ~332px usable at the 360px aside (`Configurator.vue:136`); Nuclei (last) sits under the right fade with no scroll signal | Lib (BouncyToggle) | high |
| D7a | `demo/stories/primitives/configurator.vue:50-57` — 1fr stage holds one `<code>` line → 740×291 empty void; `:44` no height → thin band | Demo | high |
| D7b | `AuroraConfigDock.vue:74` — short layer bodies under-fill the 720px aside (`aurora.vue:151`) → dead tail | Demo | low |
| D5 | `manifest.ts:105-106` — two routes for one primitive; `configurator-mobile.vue` is the same `<Configurator>` at a different `density`, must merge responsively | Demo | medium |

## Cross-cluster notes (hand-off, not in A3 scope)

- D8's affordance fix lands in the **library** `BouncyToggle` — coordinate with any
  other cluster touching `tabs/` (BouncyTabs/UnderlineTabs share the file). The
  `scrollIntoView`-on-select is additive and safe for the multi-select path.
- D2 (general nav-dock overflow, screenshot 00.00.33) is the SAME failure class as D8
  (a horizontal pill/tab row with no scroll affordance) but on a different surface
  (the demo nav dock, not BouncyToggle) — fix separately; do not conflate the
  components. The shared lesson: a scrolling horizontal rail needs a visible
  affordance + active-into-view.
- The `PaletteLayer.vue:27` `min-w-[320px]` and `NucleiLayer.vue:32` `min-w-[300px]`
  force the layer body wider than the aside; `AuroraConfigDock.vue:74`
  `overflow-x-clip` hard-clips it (acknowledged in the `:64-73` comment). Not an A3
  pill defect, but the same width-pressure root as D8 — Wave-2 should widen the aside
  band (`aurora.vue:145` `:aside-width`) OR relax these `min-w` floors so the body
  fits the aside without a horizontal clip.

## Verification notes

- Live measurements taken at viewport 1440×900 against the running `:5173` demo. The
  bare `/primitives/configurator` measured: configurator 1102×293, stage 740×291
  (the void), aside 360px, grid `740px 360px`.
- Pill intrinsic widths measured by building the BouncyToggle pill recipe offscreen
  in the live page (355px total for the 6 labels).
- The aurora `/aurora` route could not be held in the driven browser session (an
  external driver was cycling routes mid-capture); the AuroraConfigDock + BouncyToggle
  overflow math is grounded by source + the offscreen pill measurement + the
  `WV/W7-visual-defect-ledger` screenshots rather than a held aurora screenshot.
