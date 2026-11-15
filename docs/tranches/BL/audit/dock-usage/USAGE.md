# Dock usage across the apps

Read-only source audit, 2026-11-15, against glass-ui master v11.0.2 (`e1aebc2d0`). Each app's
working tree was read as it stands (source directories only). Paths are relative to
`/Users/mkbabb/Programming/`.

## The apps and the glass-ui each one pins

| App | glass-ui | Docks (components / mounts) |
| --- | --- | --- |
| value.js (color demo, `demo/`) | 10.1.3 | 1 / 1, plus loose `DockControl` clusters in 4 workbenches |
| keyframes.js (`demo/`) | 10.1.3 | 2 / 2 |
| fourier-analysis (`web/src`) | 10.1.3 | 5 / 5 |
| daraksha | 10.1.4 | 2 / 2, plus 2 route components that teleport seats in |
| atlas (library, `src/`) | 10.1.0 (peer ^10.1.0) | 1 / 1, plus a hand-built per-figure "gear dock" |
| sci-report (`dashboards/`) | 7.0.0, atlas 7.0.0 | 0 direct; hosts atlas's dock through `PlatformShell` |
| gregg | 11.0.2 | 3 / 19 (17 figure docks) |
| speedtest | 11.0.1 | 2 / 2 |
| gaggle-site (`dashboard/src`) | 11.0.2 | 3 / 3 |
| slides | 10.1.4 | 1 / 1 |
| reddit (Packboard) | 10.1.3 | 0 |
| Home Assistant (`hassio-config-worktrees/apx-ui-r11/frontend/src`) | 11.0.1 | 1 / 1 (render function) |

21 dock components, 37 mounted docks on a full render. The value.js `demo/` is the colour site;
keyframes and fourier are separate repos, read in full. Four apps on 10.1.x (value.js,
keyframes.js, fourier-analysis, atlas) import `DockTrigger` from `@mkbabb/glass-ui/dock`, which
11.x moved to `/dock-trigger`: they break on upgrade.

## Per dock

Props column: every prop passed to `GlassDock` with its value. "Hold" means the app calls the
exposed `keepOpen()`/`release()` itself.

### value.js

**Top dock** — `value.js/demo/shell/dock/Dock.vue:279`. Site navigation plus app chrome: view
select, tools, profile and account menus. Horizontal pill, in-flow in a top band.

- Props: `:collapse="isDesktop ? 'open' : false"`, `:fit-content="true"`,
  `:background-canvas="() => document.querySelector('canvas[data-glass-field-canvas]')"`,
  `:style="bandInkStyle"` (rebinds `--foreground`, `--dock-fg-on-aurora`, `--muted-foreground`,
  `--focus-ring-color` to the band's measured ink).
- Default slot: `DockLayerGroup v-model:active :show-switcher="false"` holding 4 `DockLayer`s
  (`mobile-edit`, `slug-edit`, `action-bar`, `main`). `main`: `DockViewSelect` (a `DockTrigger
  for="select"` with `:style="{'--dock-ring': viewRing}"`), `ActionBarToggle` (`DockControl`),
  `MobileMenuDropdown` (`DockTrigger for="dropdown"`), `ProfileSection` (3 `DockTrigger
  for="dropdown"` + 1 `DockControl`). `action-bar`: Back `DockControl`, `DockSeparator`,
  `ActionBarLayer`, which nests a `DockCrossfade reserve="inline"` with 2 `DockLayer`s (an
  action row of `DockControl`s with Popover hover cards, and a colour text input).
  `mobile-edit`: two swatches, `DockSeparator`, Save/Cancel `DockControl`s.
- `#collapsed`: a wax seal (WatercolorDot in the live colour plus the view icon).
- Exposed: `expanded` (watched to exit slug edit), `keepOpen`/`release` (one predicate:
  action bar, edit, or any popup open), `expand` on edit, `$el` (a MutationObserver on
  `data-morphing` to time a settle beat; `.dock-plate` queried to measure ink).
- Context: `ActionButton.vue:59` calls `useOptionalDockContext().keepOpen/release` while its
  Popover hover card is open, instead of `Popover keep-dock-open`.
- CSS: `.glass-dock :deep(:is(.dock-layer-tab, .dock-icon-button, .dark-mode-toggle-button,
  .dock-tab-button, .dock-select-trigger, .dock-dropdown-trigger)) { --dock-ring-color:
  var(--focus-ring-color) }` — "glass seats each control's ring at a 48 % mix of that knob,
  which halves a certified ink back under the graphics floor on a light band".
  `.dock-tools-btn { --dock-compact-control-padding: 0.5rem 0.75rem; --dock-icon-padding: 0.5rem
  0.75rem }` — "`.glass-dock .dock-icon-button { padding: var(--dock-icon-padding, …) }` (0,2,0)
  outranks `.dock-icon-button--compact` (0,1,0) inside the dock". `SlugEditLayer`:
  `--dock-compact-control-size`. `styles/shell.css:373`: `.glass-dock { --input-on-glass:
  var(--well-bg) }`. `foundation.css` declares an app-level `--dock-h`, which collides with
  glass-ui's own `--dock-h` sizing token.
- Wrappers: `useDockArrival` (boot reveal, finds `.glass-dock`), `useDockAdminMode`,
  `usePopupMutex` (one popup open at a time), `useChromeAccentFn(dockPlate)` (ink certified
  against the plate).

Loose clusters (no `GlassDock`): `MixResultDisplay.vue:138`, `ImageEyedropper.vue:28`,
`GradientVisualizer.vue:292`, `ExtractWorkbench.vue:59` use `DockControl` (often `compact`) and
`DockSeparator` as a plain glass icon button and divider inside ordinary flex rows.

### keyframes.js

**Chrome dock** — `keyframes.js/demo/app/dock/ChromeDock.vue:447`. Site navigation: the scene
picker, the editor-surface menu, the @mbabb menu. Top, fixed, horizontal pill.

- Props: `collapse="closed"`, `:fit-content="true"`, `:background-canvas="auroraCanvas"`.
- Default slot: `Select` with `DockTrigger for="select"` (scene), `DockSeparator`,
  `DropdownMenu` with `DockTrigger for="dropdown"` (surfaces), `DockSeparator`, a slot for
  App's `MbabbMenu` (`DockTrigger for="dropdown"`).
- `#collapsed`: a glass `Button` (icon-only) holding the scene glyph, made focusable because the
  10.1.x summary was not, with a focus handler that calls `expand()` and moves focus.
- Exposed: `expanded`, `isPinned`, `isHeld` (a watchdog re-expands a dock that collapsed while
  held), `expand`, `keepOpen`/`release` around `isSelectOpen`, `$el` for popup offsets.
- Context: `MbabbMenu.vue:375` holds through `useOptionalDockContext()`.
- CSS: no glass knobs set; `.dock-glyph { width: var(--dock-icon-glyph) }` reads one.
- Wrappers: `composables/dockEdge.ts` (`provideDockPlate` + `useDockEdgeOffset`): "a popup opened
  from the top dock starts BELOW the dock, not inside it … the producer half — floating content
  inside a dock offsets from the dock edge by itself — stays relay-only (O-59)".

**Transport dock** — `keyframes.js/demo/components/instrument/transport/TransportDock.vue:33`.
Animation transport. Bottom, fixed, horizontal pill.

- Props: `collapse="closed"`, `:fit-content="true"`.
- `#persistent`: Play/Pause `DockControl shape="icon"` in a Tooltip, actuated on
  pointerup/keyup by `usePlayActuation` ("the dock's collapse crossfade can strand" a click).
- Default slot: a `div.transport-row` holding `DockSeparator`, a channel `Select` with
  `DockTrigger for="select"`, `DockSeparator`, Reset `DockControl`.
- `#collapsed`: unauthored (Play is persistent).
- Exposed: `expand` after play, `keepOpen`/`release` around the channel Select, `$el` for the
  list's offset.
- Wrappers: `useMenubarMeasure` publishes the dock host's height on `:root`.

### fourier-analysis

**App dock** — `fourier-analysis/web/src/components/layout/AppDock.vue:172`. Site navigation.

- Props: `orientation="horizontal"`, `shape="pill"`, `:collapse="false"`, `class="app-dock"`.
- Default slot: `Popover` + `DockTrigger for="popover"` (about), `DockSeparator`, `DropdownMenu
  :modal="false"` + `DockTrigger for="dropdown"` (page nav), `DockSeparator`, `UserSlugBar`
  (`DockTrigger`), `DockSeparator`, `DarkModeToggle` (a `DockControl` inside).
- CSS: `.app-dock { --dock-trigger-min-height: var(--dock-control-size) }`;
  `DarkModeToggle.vue:257 .sun-moon-toggle { --dock-icon-glyph: var(--icon-xl) }`.

**Canvas controls dock** — `components/visualization/CanvasControlsDock.vue:63`. A canvas's view
tools, floating over the visualisation in an anchor box.

- Props: `fit-content` (collapse omitted, so `"closed"`).
- Default slot: `ViewLayersMenu` (`DockTrigger for="dropdown"`), `DockSeparator`, Publish,
  Equation (`:active`), Export `DockControl`s in Tooltips, `DockSeparator`, Fullscreen.
- `#collapsed`: an ellipsis glyph and a `StatusDot`. `#persistent-end`: Edit `DockControl`.
- Exposed: `keepOpen`/`release` from each menu's `update:open` (`holdDockWhileOpen`); `expanded`
  watched and re-emitted as `update:expanded`, "rather than an out-of-band `defineExpose`".

**Editor controls dock** — `EditorControlsDock.vue:97`. Contour editor tools.

- Props: `fit-content`.
- `#persistent`: a point-count `Metric` and Save `DockControl`. `#collapsed`: ellipsis glyph.
- Default slot: `div.dock-row` with Undo, Redo, `DockSeparator`, Delete, `ViewLayersMenu`,
  a `DropdownMenu :modal="false"` (`DockTrigger for="dropdown"`) holding a slider, items and a
  sub-menu.
- Exposed: `keepOpen`/`release` (`holdDockWhileOpen`).
- CSS: `.dock-row { gap: var(--dock-layer-gap) }`, `.dock-summary-glyph` reads `--dock-icon-glyph`.

**Animation controls** — `AnimationControls.vue:141`. Transport.

- Props: `class="animation-dock"`, `:style="{'--animation-dock-max-width': maxWidth}"`.
- `#persistent`: Play/Pause `DockControl :active`. `#collapsed`: `MiniProgressReadout`.
- Default slot: `div.transport-face` with a timeline readout and two `DropdownMenu`s
  (`DockTrigger for="dropdown"`: speed, easing).
- Exposed: `keepOpen`/`release`. CSS: width computed from `--dock-padding-inline`,
  `--dock-layer-height`, `--dock-layer-gap`.

**Equation actions** — `components/equation/EquationResult.vue:80`. An inline action cluster in
a card header.

- Props: `fit-content`, `:collapse="false"`. Default slot: a consumer `#actions` slot (an Info
  `DockControl` under a Popover from `EquationView.vue:554`) and Copy `DockControl`.

### daraksha

**Pages dock** — `daraksha/src/shell/SiteDock.vue:31`. Site navigation.

- Props: `fit-content`, `:collapse="false"`, `class="pages"`, `aria-label="Pages"`.
- Default slot: one `DockControl shape="tab" :active` per page.

**Controls dock** — `SiteDock.vue:42`. The page's controls, filled from outside.

- Props: `fit-content`, `:collapse="false"`, `aria-label="Controls"`.
- Default slot: `<div id="dock-page" class="contents">` (a Teleport target) and `ThemeControl`
  (`DockControl` with `aria-pressed`).
- Teleported in: `scripture/ReaderDock.vue` (Surah tab, prev/next `DockControl`s, `DockSeparator`,
  a `role="group"` of 3 tab `DockControl`s, `DockSeparator`, `Popover keep-dock-open` with a tab
  trigger and a panel holding steppers and toggle groups); `name/NameDock.vue` (Play/Pause and
  Again tabs, `DockSeparator`).
- The two docks sit side by side in a fixed grid wrapper, stacked on a phone.
- Wrapper: `shell/dockTip.ts` (tooltips only on a fine pointer at one-row width).
- No glass knob overridden.

### atlas (and sci-report through it)

**Section rail** — `atlas/src/platform/chrome/dock/Dock.vue:228`. Site section navigation as a
vertical rail at the left edge; a sheet on a phone.

- Props: `orientation="vertical"`, `shape="card"`, `:collapse="isPhone ? 'closed' : 'open'"`,
  `class="usf-dock"`, `aria-label="Section navigation"`.
- `#persistent`: `DockCrest` (identity crest; a button on a phone). Default slot:
  `.usf-dock__viewport` > `DockStepperRender` (nav items, `DockSeparator`), and `DockFoot`
  (`DockSeparator`, `DockSettings` = `DockTrigger for="dropdown"`, a collapse toggle).
- Exposed: `expanded`, `expand`, `collapse`, driven by `useDockCollapse` (an intent arbiter:
  manual > register > scroll) and its own `useScrollChrome` (collapse on scroll down).
- CSS (`Dock.css`): `--dock-control-size: 2.75rem; --dock-separator-height: 1.5rem;
  --dock-max-block-size: calc(100dvh - …); --dock-card-radius: var(--cp-radius, 1.75rem);
  --dock-morph-t: 1; --glass-opacity-dock: 0.9; --dock-plate-bg: …; --dock-rim-strength: …`
  (the last two are read by no glass rule). Positioning (`position: fixed`, insets, inline size)
  is set on the dock root itself.
- Deep selectors: `:deep(.dock-layer--full)` (flex column), `.usf-dock--phone.collapsed
  :deep(.dock-layers) { display: none }`, and a phone sheet restyle of the stepper rows.
- Scrim and Escape handling for the phone sheet are the app's.

**Per-figure gear dock (stand-in)** — `atlas/src/charts/frame/VizGearDock.vue`, used at
`VizPlate.vue:157`. A figure's filter/download/enlarge controls. Not a `GlassDock`: a hand-built
group with a gear button that blooms the slotted controls on hover/focus (`max-inline-size`
transition, 60 ms dwell). Seats: `DockControl compact` (Filters, with a count Badge),
`DockControl compact` or `DockTrigger for="dropdown"` (Download), `DockControl compact`
(Enlarge). CSS: `--dock-compact-control-padding: 0.875rem; --dock-trigger-padding-block/inline:
0.875rem` — "0.875rem padding × 2 + the 1rem glyph = 44px", the hit floor the controls lacked.

sci-report: no glass dock import. `home/gallery/GalleryView.vue:385` sets `--dock-control-size:
2.75rem` on a control zone styled after atlas's dock foot.

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
