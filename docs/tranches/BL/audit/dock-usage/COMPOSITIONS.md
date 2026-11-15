# Dock compositions that exist in the apps

Eight distinct compositions across 21 dock components (`USAGE.md`). Each is a candidate demo
page: one live dock built the way the apps build it. Props listed are the ones the composition
needs; seats are what sits in the run.

## 1. Site navigation tabs

A row of page or section tabs with a few utilities at the end. Never collapses. Fixed at the
top or bottom of the viewport, or in a header band.

- Apps: daraksha (pages dock), gregg (`PageDock`), gaggle-site (site dock, report `PageDock`,
  `KitDock`), Home Assistant (shell dock). 6 docks, 4 apps.
- Seats: 3–6 `DockControl shape="tab" :active` (gregg and gaggle add a travelling selection
  plate under them); `DockSeparator`; a theme toggle; often a lamp or count seat; a Find seat
  (gaggle ×3); a filter or account menu (`DockTrigger for="dropdown"`).
- Slots: `default`; `persistent-end` for the trailing utilities (gregg, Home Assistant).
- Props: `:collapse="false"`, `fit-content`; `backdrop-mode="static"` in 2 apps.
- On a phone the tabs become one menu that names the current section (gregg, gaggle, Home
  Assistant hides words). Every app in this group rebuilt that swap by hand.

## 2. App chrome with a collapsed seal

The app's one top dock: a select or menu that names where you are, a few menus, the account.
Folds to a single glyph (the seal) when idle or on a phone.

- Apps: value.js (top dock), keyframes.js (`ChromeDock`), fourier-analysis (`AppDock`, which never
  folds). 3 docks.
- Seats: `DockTrigger for="select"` (view or scene), `DockTrigger for="dropdown"` ×1–3,
  `DockTrigger for="popover"` (about), `DockSeparator`s, a theme toggle.
- Slots: `default`, `collapsed` (a glyph or a swatch with the view's icon).
- Props: `collapse="closed"` or `"open"` (desktop) / `false` (phone), `fit-content`,
  `background-canvas`.
- Needs: menus that hold the dock while open (all three hold by hand); a popup placed past the
  dock's edge (keyframes measures it); value.js alone swaps whole faces (edit, slug edit, tools)
  with `DockLayerGroup` + `DockCrossfade`.

## 3. Vertical section rail

A vertical card at the viewport's start edge: an identity crest, a numbered list of sections,
a foot with settings and a collapse toggle. Collapses on scroll down and becomes a sheet on a phone.

- Apps: atlas (`Dock.vue`), so every atlas dashboard including sci-report. 1 dock.
- Seats: app-built nav items (not `DockControl`), `DockSeparator`s, `DockTrigger for="dropdown"`.
- Slots: `persistent` (crest), `default`.
- Props: `orientation="vertical"`, `shape="card"`, `:collapse="isPhone ? 'closed' : 'open'"`.
- Needs: collapse on scroll (atlas wrote `useScrollChrome` + an intent arbiter), a phone sheet
  with scrim and Escape (atlas wrote both), a block-size cap (`--dock-max-block-size`).

## 4. A figure's filter dock

One small dock per figure, in the figure's header at the end. Holds the figure's own choices
(a tab run, a menu) and the chart/table pair. Many on a page, so a pointer sweep must open none.
Folds to the current choice in words with a chevron when the row has no room.

- Apps: gregg (`Figure` ×17, `HeroPlate`), atlas (`VizGearDock`, a hand-built stand-in: a gear
  that blooms Filters / Download / Enlarge on hover). 2 apps, 19 + one per atlas figure.
- Seats: a `role="group"` tab run (`DockControl shape="tab"`) or a menu; `DockSeparator`; the
  view pair (`DockControl :active` ×2). atlas: 3 `DockControl compact`.
- Slots: `default`, `persistent-end` (the pair), `collapsed` (words + chevron).
- Props: `expand-on="press"`, `:collapse="fits ? false : 'closed'"`, `collapsed-label`,
  `fit-content`, `backdrop-mode="static"`.
- Needs: fold decided by room (gregg's `dockFold.ts`), a summary that holds words, an "open" that
  does not fold on the first outside press, a 44 px hit area on compact seats (atlas pads it).

## 5. Canvas tool dock

A floating row over a canvas or stage: view toggles, export, fullscreen, with one primary tool
that stays visible when folded. Folds to an ellipsis glyph.

- Apps: fourier-analysis (`CanvasControlsDock`, `EditorControlsDock`). 2 docks.
- Seats: `DockControl` ×4–6 in Tooltips (some `:active`), `DockSeparator`s, a "more" menu
  (`DockTrigger for="dropdown"`) holding sliders and items.
- Slots: `default`, `collapsed` (glyph + status dot), `persistent` (count + Save) or
  `persistent-end` (Edit).
- Props: `fit-content`, `collapse` default.
- Needs: menu holds (both hold by hand), an `update:expanded` (re-emitted from the exposed ref).

## 6. Transport

Play/Pause that never leaves, and the controls that open beside it: a channel or speed select,
easing, reset, a timeline.

- Apps: keyframes.js (`TransportDock`), fourier-analysis (`AnimationControls`), daraksha
  (`NameDock` teleports Play and Again into the controls dock). 3 apps.
- Seats: Play `DockControl` (persistent), `DockTrigger for="select"` or `for="dropdown"` ×1–2,
  Reset `DockControl`, `DockSeparator`s, a readout.
- Slots: `persistent` (Play), `default`, `collapsed` (fourier: a mini progress bar).
- Props: `collapse="closed"`, `fit-content`.
- Needs: Play's click survives the collapse crossfade (keyframes actuates on pointerup instead);
  the list opens past the dock's edge.

## 7. Pager and step controls

Previous / position / next, with home and settings: a deck's pager, a wizard's step bar with a
primary CTA.

- Apps: slides (deck dock: Home, Prev, `DeckPager` dots, Next, theme, settings), speedtest (app
  dock: Back, Stop/Retake, a primary "Next" tab with glyph and label, settings). 2 docks.
- Seats: `DockControl` ×3–4 (`disabled` at the ends), an app-built dot pager, a primary
  `DockControl shape="tab"` with label, a settings menu.
- Slots: `default` only.
- Props: `:collapse="false"`. speedtest is large and rewrites the whole size table; slides is
  small and rewrites it for phones.
- Needs: a size step (both rewrite size knobs), a pager seat (slides built `DeckPager`), a
  primary seat (speedtest paints `[data-tier="primary"]`).

## 8. Page controls in an outlet, and inline action clusters

Controls that belong to the page or a card rather than the site.

- Outlet: daraksha's controls dock holds `<div id="dock-page">`; `ReaderDock` and `NameDock`
  teleport their seats into it (surah stepper, view tabs, a `Popover keep-dock-open` panel). The
  README names this as unsupported: context does not cross the Teleport.
- Inline: fourier's `EquationResult` (`:collapse="false"`, Info + Copy in a card header);
  value.js workbenches and atlas `VizPlate` use `DockControl`/`DockSeparator` with no
  `GlassDock` at all, as glass icon buttons in a plain row.
- Status strip: speedtest `SurveyResultDock` puts Badges and a step counter in a dock plate with
  no controls (`--dock-layer-height: auto`).

## What the apps worked around, most common first

1. **Menus do not hold the dock.** `Select` and `DropdownMenu` content pass no hold, so the idle
   timer folds the dock under an open list. value.js, keyframes.js (×3), fourier-analysis (×3),
   gaggle-site call `keepOpen()`/`release()` from each menu's `update:open`; keyframes and gaggle
   add a watcher that re-expands a dock that folded anyway. Only `Popover` has `keep-dock-open`,
   used once (daraksha, where the Teleport defeats it). 5 apps, 9 docks.
2. **Collapse is turned off or arbitrated outside.** 11 docks pin `:collapse="false"`. gregg pins
   docks that fit because `"open"` folds on the first outside press; gregg decides fold from room
   (`dockFold.ts`); atlas arbitrates manual / phone / scroll intents (`useDockCollapse`,
   `useScrollChrome`). 8 apps.
3. **Size is rewritten with custom properties.** speedtest (the full table, plus a re-homed
   `--dock-scale` because it is not registered), slides (`--dock-mobile-scale`, `--dock-scale`,
   `--dock-control-size`), Home Assistant (seat = 44 px on every pointer), atlas, sci-report
   (`--dock-control-size: 2.75rem`), gregg (`--dock-control-floor` at phone width), value.js
   (icon padding). 7 apps. The floor keyed to `pointer: coarse` only is named by gregg, slides and
   Home Assistant.
4. **Ink and selection paint reset.** `--muted-foreground` / `--dock-fg-on-aurora` (value.js,
   gregg, speedtest), `--dock-control-active-bg` (gregg, Home Assistant), ring colour and offset
   (value.js, gregg, Home Assistant), the plate's veil (speedtest, slides, gregg). 6 apps.
5. **Deep selectors into internals.** `.dock-plate`, `.dock-run > *`, `.dock-layer--full`,
   `.dock-layer--summary`, `.dock-layers`, `.dock-*-button`, `$el` queries: value.js, keyframes.js,
   atlas, gregg, slides, gaggle-site, Home Assistant. 7 apps.
6. **The pill is not a stadium.** gregg and gaggle set `--radius-dock` and
   `--dock-control-radius` to `9999px`; gregg pins the plate radius `!important` for WebKit hover.
7. **A travelling selection mark.** gregg (`dockIndicator.ts`) and gaggle (`PickedPlate.vue`)
   each built one for tab runs; `DockControl.active` paints only a per-seat fill.
8. **The collapsed summary is a square cell.** gregg overrides it to hold words; keyframes cut its
   label to a glyph.
9. **Popups open inside the dock.** keyframes offsets every list past the dock edge
   (`dockEdge.ts`, both docks).
10. **Phone swap of tabs for a menu.** gregg, gaggle ×2, Home Assistant hand-swap a tab run for a
    menu that names the current item.
11. Smaller, one app each: own roving keys (Home Assistant `dock_keys.ts`), wrong status
    announcement in a group (gregg `dockStatus.ts`), click lost in the collapse crossfade
    (keyframes `usePlayActuation`), a Teleport outlet (daraksha), `update:expanded` re-emitted
    (fourier), hover growth overflowing the run (slides).

Version drift worth noting: value.js, keyframes.js, fourier-analysis and atlas import
`DockTrigger` from `/dock` (10.1.x); sci-report is on 7.0.0. Several of their workarounds (the
focusable collapsed Button in keyframes, the `DockTrigger` path) are for behaviour 11.x changed.

## What the dock could be

The smallest surface that serves the eight compositions, props and slots only.

### `GlassDock`

| Prop | Values | Default | Why |
| --- | --- | --- | --- |
| `orientation` | `horizontal`, `vertical` | `horizontal` | the rail (3) |
| `collapse` | `false`, `"idle"`, `"press"`, `"room"`, `"scroll"` | `false` | one member for the posture and what folds it: never (1, 7, 8), idle hover (2, 5, 6), press per figure (4), when the run does not fit (4), on scroll (3). Folds `expandOn` in. |
| `v-model:expanded` | boolean | — | replaces watching the exposed ref and calling `expand`/`collapse` |
| `size` | `sm`, `md`, `lg` | `md` | replaces the rewritten size tables (speedtest `lg`, slides `sm`); the 44 px floor keyed to width as well as pointer |
| `material` | `live`, `static` | `live` | today's `backdropMode`; the field canvas is found by convention (`data-glass-field-canvas`), so `backgroundCanvas` goes |
| `label` | string | — | names the dock and its folded face (today's `collapsedLabel` and the root `aria-label`) |

`fitContent` becomes the only behaviour (15 of 21 set it; the rest are fixed-width by their own
CSS). `shape` reduces to the stadium for a horizontal dock and the card for a vertical one,
derived from `orientation`, with the radius a true half-height. `anchor` goes: it does nothing.

Slots: `default` (the run), `start` and `end` (today's `persistent` / `persistent-end`),
`collapsed`.

Behaviour that replaces the most common workarounds, no new props: every overlay opened from a
seat holds the dock while open and positions past the dock edge; the collapsed face sizes to its
content (a glyph or words); a run's selection paints one travelling mark under the `active` seat.

### Seats

- `DockControl`: `shape` (`icon`, `tab`), `active`, `disabled`, and `tone="primary"` for the
  wizard CTA (speedtest). `compact` stays only if the hit area is held at 44 px (atlas had to pad it).
- `DockTrigger`: `for` (`select`, `dropdown`, `popover`). Also accepted as `as-child` content of
  any menu trigger, which is what gregg and slides do.
- `DockSeparator`: no props.

### Delete outright

`DockBackgroundToggle`, `useDockSearch` and the `#search` slot, `useDockCtaReceive` on `/dock`,
`useDockContext`, `provideDockContext`, `DOCK_CONTEXT_KEY`, all 17 exported types except the
instance type, `graspHeld`, `isTransitioning`, `isPinned`, `isHeld` (one app, used to patch
item 1), the `anchor` props on `GlassDock` and `DockSeparator`, `DockControl` `type`/`as`/`asChild`,
`DockTrigger #icon`, `shape="rounded"`, `DockLayerGroup`'s switcher, drag and its three props
(`orientation`, `switcherPosition`, `motion`), `DockLayer` `label`/`icon`. Of the 172 custom
properties, keep a published handful (size via `size`, ink, active fill, ring) and make the rest
private.

`DockLayerGroup` + `DockLayer` + `DockCrossfade` serve one app (value.js) with three components;
one `DockCrossfade` with `DockLayer` children covers it. `useOptionalDockContext` stays only if
the overlay hold moves into the overlays; today its two uses are that hold.

### Presets (consumer-side compositions, shown in the demo)

1. `nav` — `collapse=false`, tabs + end utilities, phone menu swap (1).
2. `chrome` — `collapse="idle"`, a select + menus, seal in `#collapsed` (2).
3. `rail` — `orientation="vertical"`, `collapse="scroll"`, crest in `#start` (3).
4. `figure` — `collapse="room"` with press to open, view pair in `#end`, words in `#collapsed` (4).
5. `tools` — `collapse="idle"`, primary tool in `#start` or `#end`, glyph in `#collapsed` (5).
6. `transport` — Play in `#start`, `collapse="idle"` (6).
7. `pager` — `collapse=false`, prev / dots / next, `size` per app (7).

These are the demo's dock pages: one live dock per preset, plus the outlet case (8) shown as a
known gap until seats can be contributed from a route.
