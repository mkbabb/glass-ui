# Dock compositions that exist in the apps

Trees read: value.js `origin/master` 216d0e066, keyframes.js `origin/master` f7d10f518, fourier-analysis `origin/master` ac9881552, daraksha `origin/master` e90682d91, atlas `.u-build/atlas-rc` 88bde3b35 (lt-integ-atlas 73c88cb52 noted), gregg working tree, speedtest 4af04ba0d, gaggle-site ad4ef65eb, slides 3cec2cba2, sci-report bbcbd503d, reddit 26907acc4, Home Assistant 6d5ac72a9; glass-ui master v11.0.2 `e1aebc2d0`.

Eleven distinct compositions across 29 dock components (`USAGE.md`). Each is a candidate demo
page: one live dock built the way the apps build it.

## 1. Site navigation tabs

A row of page or section tabs with a few utilities at the end, fixed at the top or bottom of the
viewport.

- Apps: gregg (`PageDock`), gaggle-site (site dock, report `PageDock`, `KitDock`), Home
  Assistant (shell dock), atlas (phone bar), daraksha (site dock). 7 docks, 5 apps.
- Seats: 3–6 `DockControl shape="tab"` (or `compact` with a word and an icon) marked `:active`
  (gregg and gaggle add a travelling selection plate); `DockSeparator`; a theme seat; often a
  data-age lamp or count; Find; a filter or account menu (`DockTrigger for="dropdown"`).
- Slots: `default`; `persistent-end` for the trailing utilities (gregg, Home Assistant, atlas);
  `persistent` for an identity crest (atlas).
- Props: `:collapse="false"`, `fit-content`; `backdrop-mode="static"` in gregg, gaggle, atlas.
  daraksha's folds (`#collapsed` page icon) and swaps to a second face holding the page's controls.
- On a phone the tabs become one menu naming the current section (gregg, gaggle), lose their
  words (Home Assistant), or the whole dock changes form (atlas rail → bar).

## 2. App chrome with a collapsed seal

The app's one top dock: a select or menu that names where you are, a few menus, the account.
Folds to a single glyph when idle.

- Apps: value.js (top dock), keyframes.js (`ChromeDock`), fourier-analysis (`AppDock`). 3 docks.
- Seats: `DockTrigger for="select"` (view or scene) or `for="dropdown"` (section), 1–3 more
  `DockTrigger`s, `DockTrigger for="popover"` (about), `DockSeparator`s, a theme toggle.
- Slots: `default`, `collapsed` (a swatch with the view icon, the scene glyph, the ℱ mark).
- Props: `collapse="closed"` (keyframes, fourier) or `"open"` / `false` by width (value.js),
  `fit-content`, `background-canvas`.
- Needs: menus that hold the dock (all three hold by hand); fold on scroll (fourier does it);
  popups past the dock edge (keyframes measures it); value.js swaps whole faces with
  `DockLayerGroup` + `DockCrossfade`.

## 3. Vertical section rail

A vertical rail at the viewport's start edge: crest, search and selects, the section list, a foot
with settings and theme. Folds to the crest disc and opens on hover or focus.

- Apps: atlas (`Dock.vue`), so every atlas dashboard including sci-report. 1 dock.
- Seats: app-built nav rows, `DockSeparator`s, `DockTrigger for="select"` (chevron removed).
- Slots: `persistent`, `default`, `persistent-end`.
- Props: `orientation="vertical"`, `anchor="start"`, `backdrop-mode="static"`, `:collapse="homeRail
  ? false : 'closed'"`.
- Needs: hover open with a leave grace (atlas re-implemented it as "bloom"), hold while a
  teleported drawer is open, collapse arbitration (manual, layout, scroll, portal).

## 4. A figure's tools dock

One small dock per figure at the end of its header: a primary seat that stays (Table view, the
chart/table pair) and a tray that opens on a press (options, download, enlarge, or the figure's
own choice run). Many on a page, so a pointer sweep must open none.

- Apps: gregg (`Figure` ×17, `HeroPlate`), atlas (`PlateDock`, one per figure). 2 apps.
- Seats: `DockControl :active` (view), a tab run or a menu (gregg); Options popover, Download,
  Enlarge, Close (atlas).
- Slots: `persistent` (atlas) or `persistent-end` (gregg) for the seat that stays; `collapsed`
  (a More handle, or the current choice in words with a chevron); `default`.
- Props: `collapse="closed"`, `expand-on="press"`, `anchor="end"`, `collapsed-label`,
  `backdrop-mode="static"`; atlas adds `data-preset="cockpit"`; gregg pins `false` where the
  run fits.
- Needs: fold decided by room (gregg's `dockFold.ts`), a summary that holds words, a tray that
  holds while its popover is open (atlas holds by hand), and in lt-integ-atlas hover open with a
  dwell (`hover-intent`, a prop glass does not have).

## 5. A figure's dial bar

The figure's named filters in one capsule: a caption and a segmented strip per dial, parted by
separators, then the figure's own control (a period stepper). Never folds.

- Apps: atlas (`PlateControls` at 60 rem and wider; lt-integ-atlas `StickyScene` head). 1 app.
- Seats: groups of a caption + `SegmentedTabs`; `DockSeparator`; `DockControl` + `DockTrigger`.
- Props: `:collapse="false"`, `backdrop-mode="static"`, `data-preset="cockpit"`.
- Narrower, atlas drops the dock and renders the dials as a grid.

## 6. Canvas tool dock

A floating row over a canvas: view toggles, export, fullscreen, with one primary tool that stays
visible folded.

- Apps: fourier-analysis (`CanvasControlsDock`, `EditorControlsDock`). 2 docks.
- Seats: `DockControl` ×4–6 in Tooltips (some `:active`), `DockSeparator`s, a "more" menu.
- Slots: `default`, `collapsed` (glyph + status dot), `persistent` or `persistent-end`.
- Props: `fit-content`.
- Needs: menu holds (both by hand), `update:expanded`.

## 7. Transport

Play/Pause that never leaves, with the controls that open beside it.

- Apps: keyframes.js (`TransportDock`), fourier-analysis (`AnimationControls`), daraksha (Name's
  Play/Again teleported into the site dock). 3 apps.
- Seats: Play `DockControl`, a select or menus (channel, speed, easing), Reset, a readout.
- Slots: `persistent` (Play), `default`, `collapsed` (fourier: a mini progress bar).
- Props: `collapse="closed"`, `fit-content`.
- Needs: Play's click survives the collapse crossfade (keyframes actuates on pointerup).

## 8. Pager and step controls

Previous / position / next, with home and settings; a wizard's step bar with a primary CTA.

- Apps: slides (deck dock with an app-built dot pager), speedtest (app dock). 2 docks.
- Seats: `DockControl` ×3–4 (`disabled` at the ends), a dot pager, a primary `DockControl
  shape="tab"` with a label, a settings menu.
- Props: `:collapse="false"`; both rewrite the size knobs.

## 9. A page's controls seat in a corner

A page's own actions in one fixed place on every page. One action: a plain capsule. Several: a
glyph that opens on a press (a column on a phone).

- Apps: daraksha (`ControlsSeat` on Colour, Motion, Name and Portraits). 1 app. The file says
  glass will ship this as a named piece in 11.2.0.
- Props: one action `:collapse="false"`, `fit-content`; several `collapse="closed"`,
  `expand-on="press"`, `orientation` vertical on a phone, `collapsed-label`, `#collapsed` icon.
- daraksha also teleports page seats into the site dock's outlets (`#dock-page`,
  `#dock-persistent-end`), with its own hold (`dockHold.ts`) because context does not cross a Teleport.

## 10. An inline action row

A short row of actions inside a pane, card or drawer header. Never folds.

- Apps: keyframes.js (`RibbonBar`: Apply CSS, Copy, Format, Copy compiled), fourier-analysis
  (`EquationResult`, `PaperTocDrawer`). value.js and atlas use `DockControl` + `DockSeparator`
  for such rows without a `GlassDock`. 4 apps.
- Props: `:collapse="false"`, `fit-content`.

## 11. A bare plate

The dock as glass material with no run of controls: a one-seat theme plate, a plate behind a
button that is not in the dock, a strip of read-outs.

- Apps: daraksha (theme dock; `Star` and `Clasp`, inert docks holding an empty span), speedtest
  (`SurveyResultDock`: Badges and a step count). 2 apps.
- Props: `:collapse="false"`, `fit-content`; speedtest sets `--dock-layer-height: auto`.

## What the apps worked around, most common first

Ranked by apps, then docks.

1. **Collapse is turned off or decided by the app.** 10 apps. 15 of 29 docks pin
   `:collapse="false"` and 5 more pin it in one layout. gregg folds from room and pins docks that
   fit, because `"open"` folds on the first outside press; fourier folds AppDock after 48 px of
   scroll; atlas arbitrates five intents and re-implements hover open ("bloom") and slides its
   phone bar out on scroll; daraksha picks the posture per page; gaggle holds the dock open at the
   top of the page.
2. **Size is rewritten with custom properties.** 9 apps: speedtest (the whole table, and a
   re-homed `--dock-scale`), slides, Home Assistant (seat = 44 px on every pointer), atlas (the
   undocumented `data-preset="cockpit"` plus a dozen knobs), sci-report, gregg (touch floor at
   phone width), value.js, daraksha and fourier (phone padding).
3. **Deep selectors and internal variables.** 8 apps reach into `.dock-plate`, `.dock-run > *`,
   `.dock-layer--full`, `.dock-layers`, `.dock-persistent(-end)`, `.dock-layer--summary`, the seat
   classes, `[data-morphing]`, `--dock-expand-t`, `--dock-expanded-px`, and `$el`.
4. **Overlays do not hold the dock.** 6 apps, 11 docks: value.js, keyframes.js, fourier,
   gaggle-site, atlas (`PlateDock`) call `keepOpen()`/`release()` around each menu or popover;
   daraksha routes every teleported overlay through one app hold. keyframes and gaggle re-expand a
   dock that folded anyway. `Popover keep-dock-open` is used only by fourier.
5. **The pill is not a stadium.** 6 apps set `--radius-dock` (four to `9999px`, daraksha to
   `1.875rem`, atlas to a calc); 3 also set `--dock-control-radius`. Four of them note glass 11.1.0
   will make the stadium the default.
6. **Ink and plate paint reset.** 6 apps: muted text and `--dock-fg-on-aurora` (value.js, gregg,
   speedtest), the active fill (gregg, Home Assistant), ring colour and offset (value.js, gregg,
   Home Assistant), the plate's veil, tier and borders (speedtest, slides, gregg, atlas), the grain
   (value.js).
7. **Content does not follow the morph.** 4 apps: daraksha scales and fades teleported controls on
   `--dock-expand-t` and drives a fission from the morph widths; atlas hides swapped content until
   `data-morphing` clears; gregg rebuilt the summary's alignment and the arriving face's fade;
   value.js waits for `data-morphing` to clear before its settle beat.
8. **Tabs swap for a menu on a phone.** gregg, gaggle ×2, Home Assistant, and atlas (rail → bar).
9. **A travelling selection mark.** gregg (`dockIndicator.ts`), gaggle (`PickedPlate.vue`).
10. **Seats contributed from a route.** daraksha: two Teleport outlets and `dockHold.ts`.
11. One app each: popups placed past the dock edge (keyframes), chevron removed through `#icon`
    (atlas), a label that hides when it would overflow (fourier), a hover dwell passed as a
    non-existent prop (lt-integ-atlas), roving keys (Home Assistant), the status announcing the
    wrong control (gregg), a click lost in the crossfade (keyframes), the dock used as a bare
    plate (daraksha), `update:expanded` re-emitted (fourier).

## What the dock could be

The smallest surface that serves the eleven compositions, props and slots only.

### `GlassDock`

| Prop | Values | Default | Why |
| --- | --- | --- | --- |
| `orientation` | `horizontal`, `vertical` | `horizontal` | the rail (3), the corner seat on a phone (9) |
| `collapse` | `false`, `"hover"`, `"press"`, `"room"`, `"scroll"` | `false` | one member for "never" and "what opens or folds it": never (1, 5, 8, 10, 11), hover with a dwell and leave grace (2, 3, 6, 7), press per figure or corner seat (4, 9), fold when the run does not fit (4), fold on scroll (2, 3). It replaces `expandOn` and the five app-side arbiters. |
| `v-model:expanded` | boolean | — | replaces watching the exposed ref and calling `expand`/`collapse` |
| `size` | `sm`, `md`, `lg` | `md` | the rewritten size tables (slides `sm`, atlas's `cockpit`, speedtest `lg`); the 44 px floor keyed to width as well as pointer |
| `material` | `live`, `static` | `live` | today's `backdropMode`; the field canvas is found by its data attribute, so `backgroundCanvas` goes |
| `label` | string | — | names the dock and its folded face (today's `collapsedLabel` and the root `aria-label`) |

`fitContent` becomes the only behaviour (20 of 29 set it; the rest size themselves in their own
CSS). `shape` goes: no app passes anything but the default, and the radius should be a true
half-height in every engine (6 apps patch it). `anchor` goes: it does nothing.

Slots: `default` (the run), `start` and `end` (today's `persistent` / `persistent-end`),
`collapsed`.

Behaviour that replaces the most common workarounds, no new props: every overlay opened from a
seat holds the dock while open and opens past the dock edge; content in the run scales and fades
with the morph; the collapsed face sizes to its content; a run's `active` seat carries one
travelling mark. A named outlet for seats a route contributes (daraksha's `#dock-page`) is the one
addition the apps ask for by name.

### Seats

- `DockControl`: `shape` (`icon`, `tab`), `active`, `disabled`, `compact` (4 apps; its hit area
  held at 44 px), and `tone="primary"` for a CTA (speedtest).
- `DockTrigger`: `for` (`select`, `dropdown`, `popover`), and `chevron` (boolean) in place of the
  `#icon` slot atlas uses only to remove it.
- `DockSeparator`: no props.

### Delete outright

`DockBackgroundToggle`; `useDockSearch` and the `#search` slot; `useDockCtaReceive` on `/dock`;
`useDockContext`, `provideDockContext`, `DOCK_CONTEXT_KEY`; the 17 exported types (keep the
instance type); `graspHeld`; `isPinned`, `isHeld` and `isTransitioning`, whose only uses (keyframes,
fourier) patch around missing holds and label fitting; `anchor` on `GlassDock` and
`DockSeparator`; `DockControl` `type`/`as`/`asChild`; `shape` on `GlassDock`; `DockLayerGroup`'s
switcher and drag with its three props, since both of its users hide the switcher (one
`DockCrossfade` with `DockLayer` children covers value.js and daraksha); `DockLayer` `icon`, and
`label` once the switcher is gone. Of the 172 custom properties, publish a handful (ink, active
fill, ring, radius) and make the rest private, `--dock-expand-t` included once content follows
the morph.

### Presets (shown in the demo, one live dock each)

1. `nav` — `collapse=false`, tabs + end utilities, a phone menu swap (1).
2. `chrome` — `collapse="hover"`, a select + menus, a seal in `#collapsed`, fold on scroll (2).
3. `rail` — `orientation="vertical"`, `collapse="hover"`, crest in `#start`, foot in `#end` (3).
4. `figure-tools` — `collapse="press"` + `"room"`, the view seat in `#start`, More or words in `#collapsed` (4).
5. `dials` — `collapse=false`, `size="sm"`, captioned segmented groups (5).
6. `canvas-tools` — `collapse="hover"`, a primary tool in `#start` or `#end`, a glyph folded (6).
7. `transport` — Play in `#start`, `collapse="hover"` (7).
8. `pager` — `collapse=false`, prev / dots / next (8).
9. `corner-controls` — one action plain, several `collapse="press"`, vertical on a phone (9).
10. `action-row` — `collapse=false` inside a card or pane header (10).

The bare plate (11) belongs to glass's plate material rather than the dock; the demo should show
it there, not as a dock page.
