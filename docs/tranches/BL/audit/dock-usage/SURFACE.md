# The dock's public surface against its use

Trees read: value.js `origin/master` 216d0e066, keyframes.js `origin/master` f7d10f518, fourier-analysis `origin/master` ac9881552, daraksha `origin/master` e90682d91, atlas `.u-build/atlas-rc` 88bde3b35 (lt-integ-atlas 73c88cb52 noted), gregg working tree, speedtest 4af04ba0d, gaggle-site ad4ef65eb, slides 3cec2cba2, sci-report bbcbd503d, reddit 26907acc4, Home Assistant 6d5ac72a9; glass-ui master v11.0.2 `e1aebc2d0`.

Surface read from `src/components/dock/` at v11.0.2 (`index.ts`, `trigger.ts`, each SFC's
`defineProps`/slots/`defineEmits`/`defineExpose`, `README.md`, `styles/`). Use counted over the
apps in `USAGE.md` (29 dock components). "Apps" counts repositories; sci-report is counted only
where it touches the surface itself.

Verdicts: USED WIDELY (4+ apps), USED BY 2–3 (named), USED ONCE (named), UNUSED BY ANY APP,
OVERRIDDEN OFTEN (apps set it away from the default).

## Counts

| Class | Items | Unused by every app |
| --- | --- | --- |
| Exported components | 8 | 1 |
| Exported functions and keys | 6 | 5 |
| Exported types | 17 | 17 |
| `GlassDock` props | 9 | 1 (`shape`: only its default is ever passed) |
| `GlassDock` slots | 5 | 1 |
| `GlassDock` emits | 0 | — |
| `GlassDock` exposed members | 9 | 1 |
| `DockControl` props | 8 | 3 |
| `DockTrigger` props + slots | 2 + 2 | 0 |
| `DockSeparator` props | 1 | 1 |
| `DockLayerGroup` props + model | 5 | 3 |
| `DockLayer` props | 3 | 1 |
| `DockCrossfade` props + expose | 2 + 1 | 1 |
| `DockBackgroundToggle` props + emit | 3 + 1 | 4 |
| Root data attributes (10 written, plus `data-preset` read as an input) | 11 | 8 |
| Dock custom properties (`--dock-*`, `--radius-dock*`, `--shadow-dock*`) | 172 | about 104 |
| Dock CSS classes | 41 | about 24 |

Named items excluding the custom properties and classes: **93**, of which **47 are unused by
every app**. With the properties and classes: 306 items, about 175 unused.

## Exported components (8)

| Component | Apps | Verdict |
| --- | --- | --- |
| `GlassDock` | 10 (all but sci-report, reddit) | USED WIDELY |
| `DockControl` | 10 | USED WIDELY. Also used outside any dock as a glass icon button (value.js workbenches, daraksha popovers, atlas `PeriodControl`). |
| `DockSeparator` | 10 | USED WIDELY |
| `DockTrigger` (`/dock-trigger`) | 6: value.js, keyframes.js, fourier-analysis, atlas, gaggle-site, Home Assistant. gregg and slides use `DropdownMenuTrigger as-child` + `DockControl`. | USED WIDELY |
| `DockLayerGroup` | 2: value.js, daraksha — both `:show-switcher="false"` | USED BY 2, and its switcher (most of the file) renders in neither |
| `DockLayer` | 2: value.js, daraksha | USED BY 2 |
| `DockCrossfade` | 1: value.js (`reserve="inline"`) | USED ONCE |
| `DockBackgroundToggle` | 0 (speedtest removed its only use) | UNUSED BY ANY APP |

## Exported functions and keys (6)

| Export | Apps | Verdict |
| --- | --- | --- |
| `useOptionalDockContext` | 3: value.js (`ActionButton`), keyframes.js (`MbabbMenu`), fourier-analysis (`UserSlugBar`) | USED BY 3 — every use holds the dock under an overlay |
| `useDockContext` | 0 | UNUSED |
| `provideDockContext` | 0 | UNUSED (daraksha built its own `DOCK_HOLD` key instead, to reach teleported seats) |
| `DOCK_CONTEXT_KEY` | 0 | UNUSED |
| `useDockSearch` | 0 | UNUSED |
| `useDockCtaReceive` | 0 | UNUSED |

## Exported types (17) — all UNUSED BY ANY APP

`DockAnchor`, `DockCollapse`, `DockExpandOn`, `DockProps`, `DockFaceDescriptor`,
`DockFaceRegistration`, `DockCrossfadeContext`, `UseDockStateOptions`, `UseDockStateReturn`,
`DockState`, `DockContext`, `DockOrientation`, `UseDockCtaReceiveOptions`,
`UseDockCtaReceiveReturn`, `DockCtaReceivePreset`, `UseDockSearchOptions`, `UseDockSearchReturn`.

Apps type the dock as `InstanceType<typeof GlassDock>` or write their own: atlas `DockExposed`,
gregg `DockApi`, daraksha `Dock` (in `dockHold.ts`), atlas `PlateDock` an inline `keepOpen` shape.

## `GlassDock` props (9)

| Prop (default) | Docks that set it | Verdict |
| --- | --- | --- |
| `collapse` (`"closed"`) | `false` always: 15 of 29 (fourier EquationResult + PaperTocDrawer, keyframes RibbonBar, daraksha theme + 2 plates, gregg PageDock, speedtest ×2, gaggle PageDock + KitDock, slides, Home Assistant, atlas phone bar + PlateControls). `false` in one layout: value.js (mobile), gregg Figure + Hero (when the run fits), daraksha ControlsSeat (one action), atlas rail (wide home). Collapsible always: keyframes Chrome + Transport, fourier AppDock + Canvas + Editor + Animation, daraksha site dock, gaggle site dock, atlas PlateDock. | USED WIDELY, OVERRIDDEN OFTEN: 20 of 29 never collapse in at least one layout |
| `fitContent` (`false`) | 20 of 29: value.js; keyframes ×3; fourier Canvas, Editor, EquationResult, PaperTocDrawer; daraksha ×5; gregg ×3; gaggle ×3; Home Assistant. Not set: atlas ×4, speedtest ×2, slides, fourier AppDock + AnimationControls. | USED WIDELY, OVERRIDDEN OFTEN |
| `collapsedLabel` (`"Expand dock"`) | gregg Figure + Hero; gaggle ×3 (2 dead: they never collapse); daraksha site dock + ControlsSeat; atlas PlateDock | USED WIDELY (4 apps) |
| `backdropMode` (`"live"`) | `"static"`: gregg ×3, gaggle PageDock, atlas ×4 | USED BY 3 |
| `expandOn` (`"hover"`) | `"press"`: gregg Figure + Hero, daraksha ControlsSeat (fold), atlas PlateDock (lt-integ-atlas moves it to `"hover"` with a dwell) | USED BY 3 |
| `orientation` (`"horizontal"`) | `"vertical"`: atlas rail, daraksha ControlsSeat (phone). `"horizontal"` explicit: fourier AppDock, speedtest strip, atlas ×3. | USED BY 2 |
| `anchor` (`"center"`) | `"end"`: gregg Figure + Hero, atlas PlateDock; `"start"`: atlas rail | USED BY 2. It only writes `data-anchor`, which neither app's CSS reads: inert. |
| `backgroundCanvas` (`null`) | value.js, keyframes ChromeDock | USED BY 2 |
| `shape` (`"pill"`) | `"pill"` passed explicitly (the default) by fourier, gregg, speedtest, gaggle, Home Assistant, atlas; `"card"` and `"rounded"` by none (atlas dropped `card`) | UNUSED as a knob. The pill itself is OVERRIDDEN by 6 apps through `--radius-dock` (below). |

lt-integ-atlas also passes `hover-intent` and `run="plain"`, which `GlassDock` does not have:
they land on the root as attributes and do nothing.

## `GlassDock` slots (5)

| Slot | Apps | Verdict |
| --- | --- | --- |
| `default` | all 10 | USED WIDELY |
| `collapsed` | 8: value.js (seal), keyframes ChromeDock (Button), fourier ×4 (ℱ, glyphs, mini progress), daraksha site dock + ControlsSeat (page icon), gregg ×2 (words + chevron), gaggle site dock (status dot), atlas PlateDock (More handle), speedtest (dead) | USED WIDELY. gregg overrides its square cell to hold words. |
| `persistent-end` | 5: fourier Canvas, gregg ×3, Home Assistant, daraksha (a Teleport outlet), atlas rail + phone bar | USED WIDELY |
| `persistent` | 3: keyframes Transport, fourier Editor + Animation, atlas rail + phone bar + PlateDock | USED BY 3 |
| `search` | 0. gaggle built a search seat in `default` ("renders below the pill"); atlas puts its search in `#persistent`. | UNUSED BY ANY APP |

## `GlassDock` emits (0)

None. fourier re-emits the exposed `expanded` as `update:expanded`; six apps watch `expanded`.

## `GlassDock` exposed (9)

| Member | Apps | Verdict |
| --- | --- | --- |
| `keepOpen` / `release` | 6: value.js, keyframes.js, fourier-analysis, gaggle-site, daraksha (with a `"grasp"` kind), atlas PlateDock | USED WIDELY — almost all to hold the dock under an open overlay |
| `expanded` | 7: value.js, keyframes.js, fourier, atlas, gaggle, gregg, daraksha | USED WIDELY |
| `collapse` | 4: atlas, gregg, fourier (fold on scroll), daraksha | USED WIDELY |
| `expand` | 4: value.js, keyframes.js, atlas, gaggle-site | USED WIDELY |
| `isHeld` | 2: keyframes.js (re-expand watchdog), fourier (no scroll fold while held) | USED BY 2 |
| `isPinned` | 1: keyframes.js | USED ONCE |
| `isTransitioning` | 1: fourier AppDock (label fit waits for rest) | USED ONCE |
| `graspHeld` | 0 | UNUSED |
| `$el` (implicit) | 6: value.js, keyframes.js, gregg, gaggle, atlas, daraksha | USED WIDELY — the exposed state is not enough |

## `DockControl` props (8)

| Prop | Apps | Verdict |
| --- | --- | --- |
| `shape` (`"icon"`) | `"tab"`: daraksha, gaggle, gregg, speedtest, value.js, keyframes, Home Assistant | USED WIDELY |
| `active` | fourier, daraksha, gregg, gaggle, Home Assistant, value.js, keyframes, atlas | USED WIDELY |
| `disabled` | fourier, daraksha, slides, value.js, gregg | USED WIDELY |
| `compact` | value.js, atlas, gaggle, daraksha | USED WIDELY |
| `type`, `as`, `asChild` | 0 | UNUSED |
| `class` | pass-through | (not a real knob) |

## `DockTrigger` (2 props, 2 slots)

`for`: `"dropdown"` 6 apps, `"select"` 3 (keyframes, value.js, atlas), `"popover"` 2 (fourier,
gaggle). Slot `#icon`: atlas, twice, to remove the chevron (`<template #icon><span hidden
/></template>`) — USED ONCE, as a workaround.

## `DockSeparator` (1 prop)

`anchor`: UNUSED.

## `DockLayerGroup` (5)

`v-model:active`: value.js, daraksha. `showSwitcher`: both set `false`. `orientation`,
`switcherPosition`, `motion`: UNUSED.

## `DockLayer` (3)

`id`: value.js, daraksha. `label`: daraksha (it feeds only the hidden switcher, so it is inert).
`icon`: UNUSED.

## `DockCrossfade` (2 + expose)

`active`, `reserve`: value.js. Exposed `faces`: UNUSED by apps.

## `DockBackgroundToggle` (3 + emit) — all UNUSED

## Root data attributes (11)

`data-morphing`: value.js, gregg, atlas, daraksha — USED WIDELY (to time work after the morph).
`data-preset="cockpit"` (an input density.css reads): atlas ×4 docks — USED ONCE, a hidden size
preset. `data-active` on controls: gregg CSS — USED ONCE. `data-glass-dock-seat`, `data-anchor`,
`data-backdrop-mode`, `data-held`, `data-crossfading`, `data-glass-dock-face`,
`data-glass-dock-owner`, `data-glass-dock-portal`: UNUSED.

## Custom properties (172 names; 68 named by some app)

Set by 4 or more apps:

| Property | Apps and values |
| --- | --- |
| `--radius-dock` | 6: gregg, gaggle, keyframes, fourier `9999px`; daraksha `1.875rem`; atlas home rail `calc(max(1.375em, 22px) + 0.5em)`. Four say "remove at glass 11.1.0, which makes the stadium the default". |
| `--dock-control-size` | 8 mention it; set by atlas `2.75rem`, slides `2.25rem`, speedtest (scaled table), Home Assistant `var(--touch-target)`, sci-report `2.75rem` |
| `--dock-layer-gap` | speedtest, Home Assistant, atlas (`0.5rem`, figure frame `0`), and read by fourier, value.js |
| `--dock-control-radius` | gregg, gaggle `9999px`; atlas `var(--radius-stadium)` |
| `--dock-padding-inline` / `-block` | speedtest, Home Assistant, atlas, fourier (phone) |
| `--dock-icon-padding` | value.js, slides, Home Assistant |
| `--dock-control-floor` | gregg (phone width), speedtest (coarse); read by value.js, slides |
| `--muted-foreground` / `--dock-fg-on-aurora` on `.glass-dock` | value.js, gregg, speedtest |
| `--dock-run-gap` | Home Assistant, atlas |

Set by 2–3 apps: `--shadow-dock-override` (gregg, daraksha, atlas), `--dock-open-seat` (gregg,
Home Assistant), `--dock-control-active-bg` (gregg, Home Assistant), `--dock-ring-offset` (gregg,
Home Assistant), `--dock-scale` and `--dock-mobile-scale` (slides, speedtest),
`--dock-plate-expanded-tier` (gregg, slides), `--dock-trigger-padding-*` (atlas, speedtest),
`--dock-compact-control-padding` (value.js), `--dock-separator-height` (atlas,
value.js), `--dock-icon-glyph` (fourier, speedtest), `--dock-collapsed-summary-min-size` (atlas),
`--dock-density-comfortable-padding-inline` (daraksha ×2 docks).

Read, not set, to follow the morph: `--dock-expand-t` (daraksha, atlas), `--dock-expanded-px` /
`--dock-collapsed-px` (daraksha's fission). These are internal scalars apps had to reach for.

Set by one app: `--dock-morph-t: 1`, `--dock-max-block-size`, `--dock-layer-tab-radius`,
`--dock-collapsed-padding`, `--dock-plate-collapsed-border`, `--dock-plate-expanded-border`,
`--dock-seat`, `--dock-open-pitches` (atlas); `--dock-ring-color`, `--dock-ring`,
`--dock-compact-control-size` (value.js); `--dock-trigger-min-height` (fourier);
`--dock-tab-padding-block`, `--dock-tab-min-height`, `--dock-local-scale`, `--dock-label-size`,
`--dock-control-safe-inset` (speedtest); `--dock-plate-collapsed-tier`, `--dock-active-scale`
(slides); `--dock-touch-target`, `--dock-cap-cut`, `--dock-compact-control-min-width` (Home
Assistant). atlas also sets `--dock-plate-bg` and `--dock-rim-strength`, which no glass rule reads.
value.js sets `--glass-grain-opacity: 0` on `.glass-dock` (the grain tile was the LCP element).

About 104 names (stagger, cap, plate inset, run reserve, most of the density tables, vertical
accent, search, CTA, layer switcher, specular) are touched by no app.

## Classes (41; about 17 reached into by apps)

`.glass-dock`, `.dock-plate`, `.dock-run`, `.dock-layers`, `.dock-layer--full`,
`.dock-layer--summary`, `.dock-layer.is-active` / `.is-leaving`, `.dock-persistent`,
`.dock-persistent-end`, `.dock-icon-button`, `.dock-tab-button`, `.dock-trigger`,
`.dock-select-trigger`, `.dock-dropdown-trigger`, `.dock-separator`, `.dock-layer-tab`,
`.dock-run-status`. Reached by value.js, keyframes.js, atlas, gregg, slides, gaggle-site, Home
Assistant, daraksha (8 apps).

## Adjacent surface outside `/dock`

- `Popover keepDockOpen`: fourier (AppDock, UserSlugBar). daraksha removed its use: across a
  Teleport it does not reach the dock. `Select`, `DropdownMenu` and `Tooltip` content pass no
  `hold`, so no menu holds the dock by itself.
- `DarkModeToggle size="dock"`: gaggle ×3, slides; fourier wraps its own in a `DockControl`;
  daraksha and atlas built their own theme seats. Almost every site-navigation dock carries one.
- `ScrollProgressRim` on a dock: gregg, fourier, atlas (`DockProgressRim`).
- `SegmentedTabs` inside a dock: atlas `PlateControls`.
