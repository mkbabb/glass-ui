# Dock usage across the apps

Trees read: value.js `origin/master` 216d0e066, keyframes.js `origin/master` f7d10f518, fourier-analysis `origin/master` ac9881552, daraksha `origin/master` e90682d91 (all via `git show`/`git grep`, no checkout, no fetch); atlas `.u-build/atlas-rc` 88bde3b35 (newest: `.u-build/lt-integ-atlas` 73c88cb52); gregg working tree (no commits); speedtest 4af04ba0d (`glass-10.1`); gaggle-site ad4ef65eb (`site-redesign`); slides 3cec2cba2 (`npig`); sci-report bbcbd503d; reddit 26907acc4; Home Assistant `apx-ui-r11` 6d5ac72a9; glass-ui master v11.0.2 `e1aebc2d0`.

Read-only source audit, 2026-11-15, second pass. Paths are relative to `/Users/mkbabb/Programming/`.
Working trees were read as they stand, source directories only.

## The apps and the glass-ui each one pins

| App | glass-ui | Dock components |
| --- | --- | --- |
| value.js (colour demo, `demo/`) | 11.0.2 | 1, plus loose `DockControl` rows in 4 workbenches |
| keyframes.js (`demo/`) | 11.0.2 | 3 |
| fourier-analysis (`web/src`) | 11.0.2 | 6 |
| daraksha | 11.0.1 | 5 (site, theme, page controls seat, 2 bare plates), plus 4 route components that teleport seats in |
| atlas (`.u-build/atlas-rc/src`) | package.json says 10.1.0, but it imports `/dock-trigger` (11.x) | 4 (rail, phone bar, per-figure tools dock, per-figure dial bar); 5 in lt-integ-atlas (plus a scene head dock) |
| sci-report (`dashboards/`) | 7.0.0, atlas 7.0.0 | 0 direct; hosts atlas's docks |
| gregg | 11.0.2 | 3 (17 figure docks mount) |
| speedtest | 11.0.1 | 2 |
| gaggle-site (`dashboard/src`) | 11.0.2 | 3 |
| slides | 10.1.4 | 1 |
| reddit (Packboard) | 10.1.3 | 0 |
| Home Assistant (`hassio-config-worktrees/apx-ui-r11/frontend/src`) | 11.0.1 | 1 (render function) |

29 dock components (30 with lt-integ-atlas). gregg mounts 19 docks, and atlas mounts two per
figure. Every app that imports `DockTrigger` now takes it from `/dock-trigger`.

## Per dock

Props: every prop passed to `GlassDock` with its value. "Hold" means the app calls
`keepOpen()`/`release()` itself.

### value.js (origin/master 216d0e066)

**Top dock** — `demo/shell/dock/Dock.vue:295`. Site navigation plus app chrome: view select,
tools, profile and account menus. Horizontal pill, in-flow in a top band.

- Props: `:collapse="isDesktop ? 'open' : false"`, `:fit-content="true"`,
  `:background-canvas="() => document.querySelector('canvas[data-glass-field-canvas]')"`,
  `:style="heldInkStyle"` (rebinds `--foreground`, `--dock-fg-on-aurora`, `--muted-foreground`,
  `--focus-ring-color` to the band's measured ink, held still during a colour drag).
- Default slot: `DockLayerGroup v-model:active :show-switcher="false"` holding 4 `DockLayer`s
  (`mobile-edit`, `slug-edit`, `action-bar`, `main`). `main`: `DockViewSelect` (a `DockTrigger
  for="select"` with `:style="{'--dock-ring': viewRing}"`), `ActionBarToggle` (`DockControl`),
  `MobileMenuDropdown` (`DockTrigger for="dropdown"`, `DropdownMenu modal`), `ProfileSection` (3
  `DockTrigger for="dropdown"` in modal menus + 1 `DockControl`). `action-bar`: Back
  `DockControl`, `DockSeparator`, `ActionBarLayer`, which nests a `DockCrossfade reserve="inline"`
  with 2 `DockLayer`s (an action row of `DockControl`s with Popover hover cards; a colour input).
  `mobile-edit`: two swatches, `DockSeparator`, Save/Cancel `DockControl`s.
- `#collapsed`: a wax seal (WatercolorDot in the live colour plus the view icon).
- Exposed: `expanded` (watched to leave slug edit), `keepOpen`/`release` (one predicate: action
  bar, edit, or any popup open), `expand` on edit, `$el` (a MutationObserver on `data-morphing`
  to time a settle beat; `.dock-plate` queried to measure ink).
- Context: `ActionButton.vue:67` calls `useOptionalDockContext().keepOpen/release` while its
  Popover hover card is open.
- CSS: `.glass-dock :deep(:is(.dock-layer-tab, .dock-icon-button, .dark-mode-toggle-button,
  .dock-tab-button, .dock-select-trigger, .dock-dropdown-trigger)) { --dock-ring-color:
  var(--focus-ring-color) }` — "glass seats each control's ring at a 48 % mix of that knob, which
  halves a certified ink back under the graphics floor on a light band". New on origin/master:
  `.glass-dock { --glass-grain-opacity: 0 }` — the plate's grain tile "was the page's final LCP
  candidate … this line goes when that ships". `.dock-tools-btn { --dock-compact-control-padding;
  --dock-icon-padding }` (specificity fight with `.dock-icon-button--compact`);
  `--dock-compact-control-size` (SlugEditLayer); `.glass-dock { --input-on-glass }`; an
  app-level `--dock-h` that collides with glass's own.
- Wrappers: `useDockArrival`, `useDockAdminMode`, `usePopupMutex`, `useChromeAccentFn(dockPlate)`,
  `useHeldWhileLive`.

Loose rows (no `GlassDock`): `MixResultDisplay.vue`, `ImageEyedropper.vue`,
`GradientVisualizer.vue`, `ExtractWorkbench.vue` use `DockControl` (often `compact`) and
`DockSeparator` as a plain glass icon button and divider.

### keyframes.js (origin/master f7d10f518)

**Chrome dock** — `demo/app/dock/ChromeDock.vue:445`. Site navigation: scene picker, editor
surface menu, @mbabb menu. Top, fixed.

- Props: `collapse="closed"`, `:fit-content="true"`, `:background-canvas="auroraCanvas"`.
- Default slot: `Select` + `DockTrigger for="select"` (scene), `DockSeparator`, `DropdownMenu` +
  `DockTrigger for="dropdown"` (surfaces), `DockSeparator`, App's `MbabbMenu` slot.
- `#collapsed`: a glass `Button` (icon-only) with the scene glyph and a focus hand-off.
- Exposed: `expanded`, `isPinned`, `isHeld` (a watchdog re-expands a dock that folded while held),
  `expand`, `keepOpen`/`release` around `isSelectOpen`, `$el` for popup offsets.
- Context: `MbabbMenu.vue:351` holds through `useOptionalDockContext()`, now also while a dialog
  waits for the menu's exit (`dialogPending`).
- Wrappers: `dockEdge.ts` (`useDockEdgeOffset`: popups placed past the dock's edge, "O-59").

**Transport dock** — `demo/components/instrument/transport/TransportDock.vue:36`. Bottom, fixed,
or in flow in an embed (`contained`).

- Props: `collapse="closed"`, `:fit-content="true"`.
- `#persistent`: Play/Pause `DockControl shape="icon"` actuated on pointerup/keyup
  (`usePlayActuation`: the collapse crossfade "can strand" a click).
- Default slot: `div.transport-row`: `DockSeparator`, channel `Select` + `DockTrigger
  for="select"`, `DockSeparator`, Reset `DockControl`.
- Exposed: `expand`, `keepOpen`/`release` around the channel Select, `$el` for the list offset.

**Ribbon dock** (new on origin/master) — `demo/components/instrument/pane/RibbonBar.vue:76`. A
pane's action row: Apply CSS (`DockControl shape="tab" :active`), `DockSeparator`, Copy, Format,
Copy compiled (`DockControl shape="icon"` in Tooltips). Props: `fit-content`, `:collapse="false"`.

App-wide CSS: `demo/styles/style.css:158 --radius-dock: 9999px` — "Fully round docks … REMOVE AT
GLASS 11.1.0, which makes the stadium the default." Both bar docks add `view-transition-class:
gl-list-item`.

### fourier-analysis (origin/master ac9881552)

**App dock** — `web/src/components/layout/AppDock.vue:239`. Site navigation. Changed: it now folds.

- Props: `orientation="horizontal"`, `shape="pill"`, `collapse="closed"`, `class="app-dock"`.
- Default slot: `Popover keep-dock-open` + `DockTrigger for="popover"` (about), `DockSeparator`,
  `DropdownMenu :modal="false" @update:open="holdDockWhileOpen"` + `DockTrigger for="dropdown"`
  (page nav, with a label shown only when it fits), `DockSeparator`, `UserSlugBar` (an account
  `DropdownMenu` held through `useOptionalDockContext()` — "glass's DropdownMenu has no such
  prop" — or a login `Popover keep-dock-open`), `DockSeparator`, `DarkModeToggle`.
- `#collapsed`: the ℱ mark.
- Exposed: `expanded`, `isTransitioning` (both gate `fitNavLabel`, which probes every label and
  hides the label if the run would overflow), `isHeld`, `collapse` (the app folds the dock after
  48 px of scroll down), `keepOpen`/`release`, `$el`. A `ScrollProgressRim` sits on it.
- CSS: `--dock-trigger-min-height: var(--dock-control-size)`; a phone `--dock-padding-block` from
  `--dock-density-compact-padding-block`.

**Canvas controls dock** — `components/visualization/CanvasControlsDock.vue:63`. Unchanged: props
`fit-content`; view menu, Publish, Equation, Export, Fullscreen; `#collapsed` ellipsis + dot;
`#persistent-end` Edit; holds; `expanded` re-emitted as `update:expanded`.

**Editor controls dock** — `EditorControlsDock.vue:103`. Props `fit-content`; `#persistent` count
+ Save; `#collapsed` ellipsis; default Undo/Redo/Delete/view menu/more menu (now glass Buttons as
menu rows); holds.

**Animation controls** — `AnimationControls.vue:142`. Unchanged: `#persistent` Play, `#collapsed`
mini progress, speed and easing menus, holds.

**Equation actions** — `components/equation/EquationResult.vue:80`. Unchanged: `fit-content`,
`:collapse="false"`, Info + Copy.

**Contents drawer actions** (new) — `components/paper/PaperTocDrawer.vue:136`. A drawer header's
action row: Scroll to top, Contents toggle (`CollapsibleTrigger as-child`), Hide. Props
`fit-content`, `:collapse="false"`.

App-wide CSS: `web/src/style.css:526 :root { --radius-dock: 9999px }` — "DELETE AT THE glass
11.1.0 BUMP, which makes the stadium the default."

### daraksha (origin/master e90682d91, glass-ui 11.0.1)

**Site dock** — `src/shell/SiteDock.vue:255`. Site navigation that swaps to the page's controls.
Changed: it now folds and has two faces.

- Props: `fit-content`, `class="dock"`, `aria-label="Site"`, `:collapsed-label="<page>: open the
  dock"` (collapse omitted, so `"closed"`).
- `#collapsed`: the page icon. `#persistent-end` (Motion page only): `<div
  id="dock-persistent-end">`, a Teleport outlet.
- Default slot: `DockLayerGroup v-model:active :show-switcher="false"` with `DockLayer id="pages"
  label="Pages"` (5 `DockControl compact :active` seats, each a word and an icon) and `DockLayer
  id="page" :label="<page> controls"` (a Pages `DockControl shape="icon"`, `DockSeparator`, `<div
  id="dock-page">`, the Teleport outlet).
- Teleported in: `scripture/ReaderDock.vue`, `name/NameDock.vue`, `portraits/PortraitsDock.vue`
  (into `#dock-page`), `pages/MotionPage.vue` (into `#dock-persistent-end`).
- Exposed: `expanded`, `keepOpen("grasp")`/`keepOpen("morph")` and `release`, `collapse`, and the
  root's `--dock-expand-t`, `--dock-expanded-px`, `--dock-collapsed-px` read to drive a "fission"
  where the theme dock splits from the site dock as it opens.
- Wrapper: `shell/dockHold.ts`, one app hold the teleported controls reach by injection: "glass's
  `keep-dock-open` and its Slider's own hold never reach the dock … REMOVE AT GLASS 11.2.0
  (glass's outlet for teleported page controls)". `shell/dockTip.ts` (tooltips only where there
  is room).
- CSS: `.site-dock :global(.glass-dock #dock-page > *)` scales and fades the teleported controls on
  `--dock-expand-t` — "Glass's morph keeps a layer's content whole for the first part of a fold
  … a wide control … stood outside the closing plate". Phone:
  `--dock-density-comfortable-padding-inline: 0.375rem`. `src/styles.css`: `--radius-dock:
  1.875rem` ("The dock is a stadium … retuned to half the dock's" height), `--shadow-dock-override:
  var(--shadow-sm)`.

**Theme dock** — `SiteDock.vue:312`. One seat (`ThemeControl`). Props `:collapse="false"`,
`fit-content`, `aria-label="Theme"`.

**Page controls seat** (new) — `src/shell/ControlsSeat.vue:98` and `:101`. A page's own controls
in one place on every page, top right: "a controls button that is a dock, too … Glass ships this
composition as a named piece in 11.2.0: REPLACE THIS FILE'S DOCK WITH IT THEN". Used by Colour,
Motion, Name and Portraits pages.

- One action: `:collapse="false"`, `fit-content`, `:aria-label`.
- Several (`fold`): `collapse="closed"`, `expand-on="press"`, `:orientation="column ? 'vertical' :
  'horizontal'"` (a column on a phone), `:collapsed-label`, `#collapsed` page icon.
- Seats: the page's `DockControl`s in the default slot; holds through `dockHold`.
- CSS: `--dock-density-comfortable-padding-inline: 0.375rem` on a phone.

**Bare plates** (new) — `src/veil/Star.vue:31` and `src/veil/film/Clasp.vue:84`. A
`GlassDock :collapse="false" fit-content` holding only an empty sizing span, `inert`, behind a
button that is not in the dock: "glass's one-seat dock, never collapsing, the theme seat's
material". The dock is used as a material plate.

### atlas (`.u-build/atlas-rc` 88bde3b35; sci-report shows these)

**Section rail** — `src/platform/chrome/dock/Dock.vue:440`. Site and section navigation as a
vertical rail at the start edge, 768 px and wider. Changed: no `shape="card"`; the rail folds to
the crest disc and the app opens it on hover.

- Props: `orientation="vertical"`, `anchor="start"`, `backdrop-mode="static"`, `:collapse="homeRail
  ? false : 'closed'"`, `aria-label="Site navigation"`, several data attributes.
- `#persistent`: `DockCrest`, `DockProgressRim`, then a search field (home) or a dashboard
  `DockTrigger for="select"` (with `<template #icon><span hidden /></template>` to drop the
  chevron), search, saved views. Default: `DockStepperRender` or `DockRoster`.
  `#persistent-end`: `DockFoot` or saved views + theme toggle.
- Collapse: `useDockCollapse` arbitrates intents (manual, register, scroll, portal, bloom) and calls
  `expand()`/`collapse()`. "Bloom" re-implements hover/focus open with a 150 ms leave grace and
  keyboard-vs-pointer tracking. `useDockPortals` pins it open while a teleported drawer or list is
  open. Reads `data-morphing` off `$el`.
- CSS (`Dock.css`): `--dock-control-size: 2.75rem; --dock-separator-height: 1.5rem;
  --dock-max-block-size; --dock-control-radius: var(--radius-stadium); --dock-layer-tab-radius;
  --dock-padding-block: 0.875rem; --dock-padding-inline: 0; --dock-collapsed-padding: 0;
  --dock-collapsed-summary-min-size: 2.75rem; --dock-layer-gap: 0.5rem; --dock-morph-t: 1;
  --dock-plate-bg; --dock-rim-strength; --shadow-dock-override; --dock-plate-collapsed-border /
  -expanded-border: transparent; --dock-seat; --dock-run-gap; --dock-open-pitches: 1`, a home
  rail `--radius-dock: calc(max(1.375em, 22px) + 0.5em)`. Deep selectors: `.dock-layer--full`
  (×5), `.dock-persistent-end` (×4), `.dock-persistent` (×3), `.dock-run`, `.dock-plate`,
  `.dock-layers`, `.dock-progress-rim`, with `[data-morphing]` and `--dock-expand-t`.

**Phone bar** — `Dock.vue:519`. The same navigation as a bottom bar under 768 px.

- Props: `orientation="horizontal"`, `:collapse="false"`, `backdrop-mode="static"`.
- `#persistent`: crest + progress rim. Default: dashboard select, section cell, search, saved views
  (`DockTrigger for="select"`). `#persistent-end`: filter trigger (`DockControl`), theme toggle.
- The bar slides out on scroll down (`barOut`), app-driven.

**Figure tools dock** — `src/charts/frame/PlateDock.vue:145`, one per figure (`VizPlate.vue:249`,
`ChapterStage.vue:283`). Replaces the old hand-built `VizGearDock`.

- Props: `orientation="horizontal"`, `collapse="closed"`, `expand-on="press"`, `anchor="end"`,
  `:collapsed-label="Tools for <title>"`, `backdrop-mode="static"`, `shape="pill"`,
  `data-preset="cockpit"`.
- `#persistent`: Table view `DockControl :active`. `#collapsed`: the More handle (ellipsis + dirty
  dot). Default: Options (`Popover` anchored to its control), Raw data or Download, Enlarge, Close.
- Exposed: `keepOpen`/`release` while Options or Download is open, `collapse` on Close, Escape and
  a sheet taking the screen.

**Figure dial bar** — `src/charts/frame/PlateControls.vue:117`, per figure at 60 rem of plate and
wider. Named dial groups, each a caption and a `SegmentedTabs` pill strip, parted by
`DockSeparator`, then the figure's own control (`PeriodControl`: `DockControl` + `DockTrigger`).
Props: `orientation="horizontal"`, `:collapse="false"`, `backdrop-mode="static"`, `shape="pill"`,
`data-preset="cockpit"`. Narrower, the same dials render as a grid with no dock.

Differences in `.u-build/lt-integ-atlas` (73c88cb52):
- `PlateDock.vue:280` opens on hover: `expand-on="hover"`, plus `:hover-intent="HOVER_INTENT_MS"`
  and `run="plain"`. Neither prop exists on `GlassDock` v11.0.2, so both fall through as root
  attributes and do nothing. Enlarge moves into `#persistent`; the tray lingers before closing
  ("should not instantly teleport away … dwell time").
- `src/charts/scene/StickyScene.vue:154` adds a scene head dock: `:collapse="false"`,
  `backdrop-mode="static"`, `shape="pill"`, `data-preset="cockpit"`, slot `figure-control`.
- The rail and phone bar props are the same.

sci-report: no glass dock import. `home/gallery/GalleryView.vue:385` sets `--dock-control-size:
2.75rem` on a control zone styled after atlas's dock foot. It pins atlas 7.0.0, so the shipped
site shows whichever atlas it was built with.

### gregg

**Page dock** — `gregg/src/components/PageDock.vue:542`. Site section navigation, fixed bottom.

- Props: `shape="pill"`, `:collapse="false"`, `fit-content`, `backdrop-mode="static"`.
- Default slot: on a phone a `DropdownMenu` whose trigger is `DropdownMenuTrigger as-child` +
  `DockControl shape="tab"` (label stack and chevron); otherwise `div.page-dock__run.dock-indicated
  role="group"` with a gliding `span.dock-indicator` and one `DockControl shape="tab"` per section.
- `#persistent-end`: `DockSeparator`, theme `DockControl`.
- Beside it: `ScrollProgressRim` sized from the plate's computed radius (`$el`, `.dock-plate`).
- CSS: `:deep(.glass-dock) { --dock-open-seat: max-content }` — "The library widens a current
  tab in a run; these labels already fit." `:deep(.dock-tab-button) { --dock-ring-offset:
  calc(-1 * var(--focus-ring-width)) }` — the ring "nearly filled the 60 px plate and read as a
  second plate".

**Figure dock** — `components/Figure.vue:970`, one per `Figure` (17 figures). A figure's filters
and its chart/table pair, in the figure header at the end.

- Props: `shape="pill"`, `:collapse="collapsible ? 'closed' : false"`, `expand-on="press"`,
  `anchor="end"`, `:collapsed-label="Open the controls for <title>, set to <choice>"`,
  `fit-content`, `backdrop-mode="static"`, `v-fade`, state classes.
- Default slot: the figure's `#controls` slot (tab runs in `div.dock-run role="group"`, menus,
  pickers) or, when none, the chart/table pair. `#persistent-end` (with controls):
  `DockSeparator` + the chart/table pair (`DockControl :active` in Tooltips). `#collapsed` (when
  folding): the current choice in words + a chevron.
- Exposed: `expanded`, `collapse` (from `dockFold.ts`), `$el` (reads `.dock-layer--full` and its
  controls to build the summary words).
- CSS: `.figure__dock--pair { --shadow-dock-override: 0 0 0 transparent;
  --dock-plate-expanded-tier: var(--glass-veil-wash) }`.

**Hero dock** — `figures/hero/HeroPlate.vue:1019`. The hero figure's arrangement tabs and view
pair. Same props as the figure dock (`collapse` keyed to `heroFolds`). Default slot: a menu on
narrow widths, else an indicated tab run. Same `#persistent-end` and `#collapsed`.

Figure controls filled into `#controls`: `campus/DockPick.vue`, `when/DayCalendar.vue`,
`when/WeeklyBars.vue`, `where/StepFilter.vue`, `how/HearFigure.vue`, and 5 more figures.

App-wide CSS (`gregg/src/style.css`), each marked "GLASS … delete once":
- `--radius-dock: 9999px; --dock-control-radius: 9999px` — "glass 11.0.1 rounds a dock and its
  controls at --radius-pill, 1rem, which leaves a 56 px dock and a 38 px tab short of half their
  height".
- `.glass-dock .dock-plate, ::after { border-radius: var(--radius-dock) !important }` — WebKit
  hover turns the pill into a lens.
- `.dock-run > [role="group"] { scroll-snap-align: none }` and its controls `start` — snap on
  direct children only.
- `@supports not (backdrop-filter …)` and `prefers-reduced-transparency`: `.dock-plate` near-opaque.
- `--dock-control-active-bg` per scheme — "the library fills an active dock control with
  --glass-plate-floating, near-white on a cream plate (about 1.06:1)".
- `.glass-dock { --muted-foreground: var(--foreground); --dock-fg-on-aurora: var(--foreground) }` —
  "contrast-color(var(--card)) … resolves to pure black in light and pure white in dark".
- Active-hover order fix (`G-33`), `(hover: none)` hover reset (`G-21`).
- `(pointer: coarse), (max-width: 639.98px) { .glass-dock.glass-dock { --dock-control-floor:
  var(--dock-touch-target, 2.75rem) } }` — "glass-ui keys its dock control floor to pointer:
  coarse alone".
- Seat transition list re-composed (press spring lost), `.dock-layer[tabindex="-1"]:focus {
  outline: none }`, `overscroll-behavior-y: auto; touch-action: pan-x pan-y` on horizontal runs.
- `.dock--folds .dock-layer--summary { aspect-ratio: auto; inline-size: auto }` — "glass sizes the
  summary layer as a square icon cell … so words overflow it"; morph-time summary alignment;
  a rebuilt cross-fade for the arriving face; reduced-motion fold; run edge fade mask.

Wrappers: `dockFold.ts` (decides from room whether a dock folds; pins open where it fits,
because "open" "folds on any press outside the dock … nineteen morphs at once"; eases the fold
itself under reduced motion), `dockIndicator.ts` (a gliding selection mark: "DockControl could
own this mark"), `dockStatus.ts` (`.dock-run-status` announces "the group's first control"),
`dockRoom.ts` (layout clearance for the fixed dock).

### speedtest

**App dock** — `speedtest/src/components/Dock.vue:256`. A wizard's step controls (back, stop,
retake, next, primary CTA) plus settings. Bottom, large.

- Props: `:collapse="false"`, `shape="pill"`.
- Default slot: Back `DockControl`, `DockSeparator`, per-face seats (Stop, Retake as icons;
  Next / survey forward / New Test as `DockControl shape="tab" data-tier="primary"` with glyph and
  label), `DockSeparator`, `AppSettingsButton` (`DockControl` + menu).
- `#collapsed`: phase icon + label. Dead: `collapse` is `false`.
- Wrapper element `.dock-in.dock-signature` re-homes the scale: `--dock-scale: calc(var(--ui-scale,
  1) * var(--dock-local-scale, 1)); --dock-icon-glyph: …; --dock-mobile-scale: 0.93;
  --dock-local-scale: 1.15; --dock-control-floor: …` — "The `--dock-local-scale` lever does NOT
  thread as documented … neither is `@property`-registered, so their `calc()` is substituted
  ONCE at `:root`".
- `design/tokens.css:991 .dock-signature .glass-dock` rewrites the whole size table:
  `--dock-padding-block/inline`, `--dock-control-size`, `--dock-layer-height`,
  `--dock-control-safe-inset`, `--dock-layer-gap`, `--dock-trigger-padding-*`, `--dock-tab-padding-*`,
  `--dock-tab-min-height`, `--dock-tab-h`, `--dock-label-size`, with a phone variant.
- `design/register.css:235 .glass-dock { --glass-backdrop: light; --muted-foreground:
  var(--fg-on-glass) }` and `.glass-dock .dock-plate { --glass-veil: var(--material-bg-dock) }` —
  "dock reads squared/opaque, should be a glassy glass-ui dock".
- `design/index.css:311 .dock-tab-button[data-tier="primary"]` paints the primary CTA.
- Wrapper: `useDockOrchestration` (state and actions for the dock and a preflight dialog).
- `DockBackgroundToggle` was removed (`App.vue:392`).

**Result strip** — `speedtest/src/components/survey/SurveyResultDock.vue:38`. A status strip:
result Badges with Metrics and a step counter, no controls.

- Props: `orientation="horizontal"`, `:collapse="false"`, `role="group"`, `aria-label`.
- CSS: the size table again at a smaller rung, plus `--dock-layer-height: auto` — "releases the
  primitive's fixed single-row layer height so the body sizes to its two-row content".

### gaggle-site

**Site dock** — `gaggle-site/dashboard/src/shell/Dock.vue:126`. Site navigation with search,
filter and account. Bottom centre.

- Props: `shape="pill"`, `collapse="open"`, `fit-content`, `:collapsed-label="Show the site
  controls. Data <age>"`.
- Default slot: data-age lamp (`DockControl shape="icon" compact`, or `Popover` + `DockTrigger
  for="popover"`), a `TransitionGroup` of view tabs (`DockControl shape="tab" :active`), a search
  `Input` seat ("11.0.1's #search slot renders below the pill"), `DockSeparator`, a filter
  `DropdownMenu` (`DockTrigger for="dropdown"`) with checkbox groups, `DockSeparator`,
  `DarkModeToggle size="dock"`, an account `DropdownMenu`; on a phone one "more" menu.
- `#collapsed`: a `StatusDot`.
- Exposed: three counted holds (`keepOpen` + `expand`, `release`): top of page, Find focused or
  holding text, any menu open; a watcher re-expands when the dock folds while held ("Esc closing a
  dock menu did"); `expand()` exposed onward.

**Report page dock** — `report/page/PageDock.vue:76`. Section navigation for a report page.

- Props: `shape="pill"`, `:collapse="false"`, `fit-content`, `backdrop-mode="static"`,
  `collapsed-label` (dead: never collapses).
- Default slot: `PickedPlate` (a travelling selection plate) + section `DockControl shape="tab"`s,
  or on a phone a `Popover` + `DockTrigger for="popover"`; `DockSeparator`; `Lamp`
  (`DockTrigger for="popover"` or a tab + sheet); a Find `Popover`; `DarkModeToggle size="dock"`.
- CSS: `report/styles/page.css:11 --radius-dock: 9999px; --dock-control-radius: 9999px`;
  `.r-dock-seat.r-dock-seat .dock-separator { margin-inline: 0.125rem }` at 480 px.

**Kit dock** — `report/kit/KitDock.vue:64`. Page controls (home, route slot, lamp, find, theme).
Props: `shape="pill"`, `:collapse="false"`, `fit-content`, `collapsed-label` (dead).

### slides

**Deck dock** — `slides/src/deck/DeckView.vue:144`. A deck's transport and pager.

- Props: `class="deck-dock"`, `:class="{ dark }"`, `:collapse="false"`.
- Default slot: Home `DockControl` (RouterLink), Prev, `DeckPager` (app-built dot buttons),
  Next, `DockSeparator`, `DarkModeToggle size="dock"`, `DeckSettings` (`DropdownMenu` with
  `DropdownMenuTrigger as-child` + `DockControl`).
- CSS: `.deck-dock { --dock-control-size: 2.25rem; max-inline-size: calc(100dvw - …) }`; at
  `(pointer: coarse), (max-width: 560px)`: `--dock-mobile-scale: 0.78; --dock-scale:
  var(--dock-mobile-scale); --dock-control-size: max(…); --dock-icon-padding: 0`,
  `.deck-dock .dock-separator { display: none }`, `.deck-dock :is(.dock-icon-button,
  .dock-select-trigger) svg { width: 23px; height: 23px }` — "glass-ui's density sheet
  re-declares `--dock-scale` … under (pointer: coarse) only". `DeckSettings.vue:166
  .deck-settings__trigger { --scale-hover-dock: 1; --dock-active-scale: 1 }` — the hover growth
  "pushed the gear ~2px past the port, and the whole pill snapped to an oval".
  `decks/parkway-lab/theme.css`: `--dock-plate-collapsed-tier: 0.86; --dock-plate-expanded-tier: 0.9`.

### Home Assistant

**Shell dock** — `hassio-config-worktrees/apx-ui-r11/frontend/src/tiles/GlassTabs.ts:370`. Site
navigation: house tabs, a floor menu on the current tab, residents' faces, part of the day, a
warning count, an admin menu. Fixed under HA's toolbar, positioned from a spacer.

- Props (render function): `shape: "pill"`, `collapse: false`, `fitContent: true`,
  `class: "shell-dock"`, `data-worded`, `data-phone`, `data-settled`, `--dock-cut-edge`,
  `onKeydown` (own roving focus).
- Slots: `default` = tab seats (`DockControl`, the current one a `DockTrigger` for the floor
  `DropdownMenu`, `dock_menu.ts`); `persistent-end` = `DockSeparator`, face seats, phase seat,
  count seat, ••• menu.
- CSS (`styles/tokens.css:142 .glass-dock`): `--dock-run-gap: 8px; --dock-touch-target: 44px;
  --dock-tab-h: 44px; --dock-control-size: var(--touch-target); --dock-layer-height:
  var(--touch-target)` — "glass-ui scales its seat with the pointer, to 35px on a mouse (under the
  44 target) and 57px on a phone"; `--dock-control-active-bg` (capsule a shade off the plate).
  `tiles/css/tabs.css`: `--dock-tab-padding-inline`, `--dock-cap-cut: var(--dock-cap-rest)` ("keeps
  its rounded ends while its run scrolls"), phone `--dock-run-gap: 0; --dock-layer-gap: 0;
  --dock-open-seat: var(--dock-control-size); --dock-padding-inline: 2px`, `--dock-ring-offset`
  inset, `--dock-icon-padding`, `--dock-compact-control-min-width`; edge-fade masks on
  `.dock-run[data-before|after]`; selectors on `.dock-run > *`, `.dock-run > [aria-current]`.
- Wrappers: `dock_fit.ts` (lead and span on HA's column), `dock_keys.ts` (arrow/Home/End focus
  along the run), `dock_parts.ts` (seat renderers), `dock_menu.ts` (menus teleported out of the run).

### reddit

No dock.


## Correction (2026-11-15, second pass)

The first pass read local checkouts on old branches for value.js, keyframes.js,
fourier-analysis and daraksha, and an atlas tree months behind production. This file now
reflects `origin/master` for the four and `.u-build/atlas-rc` for atlas. The corrected rows:

| App | First pass | Corrected |
| --- | --- | --- |
| value.js | 10.1.3; `DockTrigger` from `/dock` | 11.0.2; `/dock-trigger`; menus `modal`; adds `.glass-dock { --glass-grain-opacity: 0 }`. Same one dock. |
| keyframes.js | 10.1.3; 2 docks | 11.0.2; 3 docks (adds `RibbonBar`, a pane action row, `:collapse="false"`); `--radius-dock: 9999px` |
| fourier-analysis | 10.1.3; 5 docks; AppDock `:collapse="false"` | 11.0.2; 6 docks (adds `PaperTocDrawer` header actions); AppDock `collapse="closed"` with `#collapsed` ℱ, app-driven fold on scroll, label fit probe, `Popover keep-dock-open`, `isTransitioning`/`isHeld`/`collapse` used; `--radius-dock: 9999px` |
| daraksha | 10.1.4; 2 docks, both `:collapse="false"`, `#dock-page` outlet | 11.0.1; 5 docks: a folding site dock with `DockLayerGroup` + 2 labelled `DockLayer`s, `compact` seats, two Teleport outlets, a fission read off the morph variables; a theme dock; a page controls seat (`expand-on="press"`, vertical on a phone); 2 bare plates; `dockHold.ts`; `--radius-dock: 1.875rem` |
| atlas | 1 rail (`shape="card"`, `:collapse="isPhone ? 'closed' : 'open'"`) and a hand-built `VizGearDock` | 4 docks: rail (`orientation="vertical"`, `anchor="start"`, static, no `shape`), phone bar, `PlateDock` (a real `GlassDock`, `expand-on="press"`, `anchor="end"`, `data-preset="cockpit"`), `PlateControls`; `VizGearDock` deleted; `DockTrigger #icon` used; `--radius-dock` on the home rail |
| totals | 21 components | 29 components (30 with lt-integ-atlas) |
