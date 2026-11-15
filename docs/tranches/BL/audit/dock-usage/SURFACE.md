# The dock's public surface against its use

Surface read from `src/components/dock/` at v11.0.2 (`index.ts`, `trigger.ts`, each SFC's
`defineProps`/slots/`defineEmits`/`defineExpose`, `README.md`, `styles/`). Use counted over the
11 apps in `USAGE.md` (21 dock components, 37 mounts). "Apps" counts repositories; sci-report is
counted only where it touches the surface itself.

Verdicts: USED WIDELY (4+ apps), USED BY 2–3 (named), USED ONCE (named), UNUSED BY ANY APP,
OVERRIDDEN OFTEN (apps set it away from the default).

## Counts

| Class | Items | Unused by every app |
| --- | --- | --- |
| Exported components | 8 | 1 |
| Exported functions and keys | 6 | 5 |
| Exported types | 17 | 17 |
| `GlassDock` props | 9 | 0 (1 value of `shape` unused) |
| `GlassDock` slots | 5 | 1 |
| `GlassDock` emits | 0 | — |
| `GlassDock` exposed members | 9 | 2 |
| `DockControl` props | 8 | 3 |
| `DockTrigger` props + slots | 2 + 2 | 1 (`#icon`) |
| `DockSeparator` props | 1 | 1 |
| `DockLayerGroup` props + model | 5 | 3 |
| `DockLayer` props | 3 | 2 |
| `DockCrossfade` props + expose | 2 + 1 | 1 |
| `DockBackgroundToggle` props + emit | 3 + 1 | 4 |
| Root data attributes a consumer can read | 10 | 8 |
| Dock custom properties (`--dock-*`, `--radius-dock*`, `--shadow-dock*`) | 172 | about 128 |
| Dock CSS classes | 41 | about 26 |

Named items excluding the custom properties and classes: **92**, of which **49 are unused by
every app**. With the properties and classes: 305 items, about 203 unused.

## Exported components (8)

| Component | Apps | Verdict |
| --- | --- | --- |
| `GlassDock` | 10 (all but sci-report, reddit) | USED WIDELY |
| `DockControl` | 10 | USED WIDELY. Also used outside any dock as a plain glass icon button (value.js workbenches ×4, atlas VizGearDock, daraksha popover steppers). |
| `DockSeparator` | 10 | USED WIDELY |
| `DockTrigger` (`/dock-trigger`) | 7: value.js, keyframes.js, fourier-analysis, atlas, gaggle-site, Home Assistant; gregg and slides use `DropdownMenuTrigger as-child` + `DockControl` instead | USED WIDELY. 4 of them import it from `/dock` (10.1.x path). |
| `DockLayerGroup` | 1: value.js (`:show-switcher="false"`) | USED ONCE, and its switcher (the bulk of the file) is unused |
| `DockLayer` | 1: value.js (6 layers across a group and a crossfade) | USED ONCE |
| `DockCrossfade` | 1: value.js (`ActionBarLayer`, `reserve="inline"`) | USED ONCE |
| `DockBackgroundToggle` | 0 (speedtest removed its only use) | UNUSED BY ANY APP |

## Exported functions and keys (6)

| Export | Apps | Verdict |
| --- | --- | --- |
| `useOptionalDockContext` | 2: value.js (`ActionButton` hold), keyframes.js (`MbabbMenu` hold) | USED BY 2 — both to call `keepOpen`/`release` for an overlay |
| `useDockContext` | 0 | UNUSED |
| `provideDockContext` | 0 | UNUSED |
| `DOCK_CONTEXT_KEY` | 0 | UNUSED |
| `useDockSearch` | 0 | UNUSED (it also needs a `UseDockStateReturn` that `/dock` does not export a constructor for) |
| `useDockCtaReceive` | 0 | UNUSED |

## Exported types (17) — all UNUSED BY ANY APP

`DockAnchor`, `DockCollapse`, `DockExpandOn`, `DockProps`, `DockFaceDescriptor`,
`DockFaceRegistration`, `DockCrossfadeContext`, `UseDockStateOptions`, `UseDockStateReturn`,
`DockState`, `DockContext`, `DockOrientation`, `UseDockCtaReceiveOptions`,
`UseDockCtaReceiveReturn`, `DockCtaReceivePreset`, `UseDockSearchOptions`, `UseDockSearchReturn`.

Apps type the dock as `InstanceType<typeof GlassDock>`; atlas writes its own `DockExposed`
(`expanded`, `expand`, `collapse`) and gregg its own `DockApi`.

## `GlassDock` props (9)

| Prop (default) | Docks that set it | Verdict |
| --- | --- | --- |
| `collapse` (`"closed"`) | `false` always: 11 docks in 7 apps (fourier AppDock + EquationResult, daraksha ×2, gregg PageDock, speedtest ×2, gaggle PageDock + KitDock, slides, Home Assistant). `false` sometimes: value.js (mobile), gregg Figure + Hero (when the run fits). `"open"`: value.js (desktop), gaggle site dock, atlas (desktop). `"closed"` explicit: keyframes ×2, gregg (when crowded), atlas (phone). Omitted: fourier ×3. | USED WIDELY, OVERRIDDEN OFTEN: the default posture is the minority. 14 of 21 dock components never collapse in at least one register. |
| `fitContent` (`false`) | value.js, keyframes ×2, fourier ×3, daraksha ×2, gregg ×3, gaggle ×3, Home Assistant | USED WIDELY, OVERRIDDEN OFTEN: 15 of 21 set `true`. Not set: atlas, speedtest ×2, slides, fourier AppDock + AnimationControls. |
| `shape` (`"pill"`) | `"card"`: atlas. `"pill"` passed explicitly (the default): fourier AppDock, gregg ×3, speedtest, gaggle ×3, Home Assistant. `"rounded"`: none. | `card` USED ONCE (atlas); `rounded` UNUSED. And the pill itself is OVERRIDDEN: gregg and gaggle set `--radius-dock` and `--dock-control-radius` to `9999px` because the pill is not a stadium. |
| `orientation` (`"horizontal"`) | `"vertical"`: atlas. `"horizontal"` explicit: fourier AppDock, speedtest strip. | USED ONCE (atlas) |
| `backgroundCanvas` (`null`) | value.js (`canvas[data-glass-field-canvas]` getter), keyframes ChromeDock (aurora canvas) | USED BY 2 |
| `backdropMode` (`"live"`) | `"static"`: gregg ×3, gaggle PageDock | USED BY 2 |
| `collapsedLabel` (`"Expand dock"`) | gregg Figure + Hero; gaggle ×3 (2 dead: those docks never collapse) | USED BY 2 |
| `expandOn` (`"hover"`) | `"press"`: gregg Figure + Hero | USED ONCE (gregg, 18 mounts) |
| `anchor` (`"center"`) | `"end"`: gregg Figure + Hero | USED ONCE (gregg). It only writes `data-anchor`, which gregg's CSS does not read: inert. |

## `GlassDock` slots (5)

| Slot | Apps | Verdict |
| --- | --- | --- |
| `default` | all 10 | USED WIDELY |
| `collapsed` | 6: value.js (seal), keyframes ChromeDock (focusable Button), fourier ×3 (glyph, mini progress), gregg ×2 (words + chevron), gaggle site (status dot), speedtest (dead: `collapse` false) | USED WIDELY. 2 apps fight its square cell (gregg overrides it to hold words; keyframes cut its label to fit). |
| `persistent` | 3: keyframes Transport (Play), fourier Editor (count + Save) and AnimationControls (Play), atlas (crest) | USED BY 3 |
| `persistent-end` | 3: fourier Canvas (Edit), gregg ×3 (theme; chart/table pair), Home Assistant (faces, phase, count, menu) | USED BY 3 |
| `search` | 0. gaggle-site built a search seat in `default` because "11.0.1's #search slot renders below the pill". | UNUSED BY ANY APP |

## `GlassDock` emits (0)

None. Two apps watch the exposed `expanded` to stand in for an `update:expanded` emit
(fourier re-emits it; value.js and gaggle react to it).

## `GlassDock` exposed (9)

| Member | Apps | Verdict |
| --- | --- | --- |
| `keepOpen` / `release` | 4: value.js, keyframes.js ×2, fourier-analysis ×3, gaggle-site (plus 2 via the context) | USED WIDELY — almost all to hold the dock under an open `Select`/`DropdownMenu` |
| `expanded` | 6: value.js, keyframes.js ×2, fourier Canvas, atlas, gaggle site, gregg (`dockFold`) | USED WIDELY |
| `expand` | 4: value.js, keyframes.js ×2, atlas, gaggle-site | USED WIDELY; 2 of them re-expand a dock that folded while held |
| `collapse` | 2: atlas, gregg | USED BY 2 |
| `isPinned` | 1: keyframes ChromeDock | USED ONCE |
| `isHeld` | 1: keyframes ChromeDock (the re-expand watchdog) | USED ONCE |
| `graspHeld` | 0 | UNUSED |
| `isTransitioning` | 0 (value.js reads `data-morphing` off `$el` instead) | UNUSED |
| `$el` (implicit) | 4: value.js, keyframes.js, gregg, gaggle-site via queries | USED WIDELY — a sign the exposed state is not enough |

## `DockControl` props (8)

| Prop | Apps | Verdict |
| --- | --- | --- |
| `shape` (`"icon"`) | `"tab"`: daraksha, gaggle, gregg, speedtest, value.js, Home Assistant. `"icon"` explicit: keyframes, gaggle, value.js. | USED WIDELY |
| `active` | fourier, daraksha, gregg, gaggle, Home Assistant, value.js | USED WIDELY. gregg and gaggle hide its fill and draw their own travelling mark. |
| `disabled` | fourier, daraksha, slides, value.js, gregg | USED WIDELY |
| `compact` | value.js, atlas, gaggle | USED BY 3 |
| `type` | 0 | UNUSED |
| `as` | 0 | UNUSED |
| `asChild` | 0 | UNUSED |
| `class` | attribute pass-through, everywhere | (not a real knob) |

## `DockTrigger` (2 props, 2 slots)

`for`: `"dropdown"` 6 apps, `"select"` 2 (keyframes, value.js), `"popover"` 2 (fourier, gaggle) —
USED WIDELY. `class`: pass-through. Slot `default`: USED WIDELY. Slot `#icon`: UNUSED.

## `DockSeparator` (1 prop)

`anchor`: UNUSED. The component itself is USED WIDELY. slides hides it on a phone
(`display: none`), gaggle trims its margin.

## `DockLayerGroup` (5)

`v-model:active`: value.js. `showSwitcher`: value.js sets `false`, so the tablist, the
indicator and the drag-to-switch gesture never render in any app. `orientation`,
`switcherPosition`, `motion`: UNUSED.

## `DockLayer` (3)

`id`: value.js. `label`, `icon`: UNUSED (they feed only the switcher).

## `DockCrossfade` (2 + expose)

`active`: value.js. `reserve`: value.js (`"inline"`). Exposed `faces`: UNUSED by apps.

## `DockBackgroundToggle` (3 + emit) — all UNUSED

`paused`, `pauseLabel`, `playLabel`, `update:paused`.

## Root data attributes (10)

`data-morphing` — read by value.js (MutationObserver) and gregg (CSS): USED BY 2.
`data-active` on controls — read by gregg CSS: USED ONCE. `data-glass-dock-seat`,
`data-anchor`, `data-backdrop-mode`, `data-held`, `data-crossfading`, `data-glass-dock-face`,
`data-glass-dock-owner`, `data-glass-dock-portal`: UNUSED by apps.

## Custom properties (172 names in glass-ui; about 44 set by some app)

Set by 3 or more apps — the defaults that are wrong:

| Property | Apps and values |
| --- | --- |
| `--dock-control-size` | atlas `2.75rem`; slides `2.25rem` (phone `max(calc(2.5rem * scale), floor)`); speedtest `max(calc(4rem * scale), floor)` and a strip rung; Home Assistant `var(--touch-target)` (44 px); sci-report `2.75rem` |
| `--dock-icon-padding` | value.js `0.5rem 0.75rem`; slides `0` (phone); Home Assistant `7px 0` |
| `--muted-foreground` / `--dock-fg-on-aurora` on `.glass-dock` | value.js (band ink), gregg (`var(--foreground)`), speedtest (`var(--fg-on-glass)`) — the dock's ink is reset in 3 apps |

Set by 2 apps:

| Property | Apps and values |
| --- | --- |
| `--radius-dock`, `--dock-control-radius` | gregg, gaggle: `9999px` |
| `--dock-control-active-bg` | gregg (`foreground` 9 % light / 24 % dark), Home Assistant (a tenth of the text colour) |
| `--dock-control-floor` | gregg (touch target at `max-width: 639.98px`), speedtest (coarse) |
| `--dock-scale`, `--dock-mobile-scale` | slides (`0.78`), speedtest (`0.93`, re-homed `--dock-scale` formula) |
| `--dock-tab-h`, `--dock-tab-padding-inline`, `--dock-layer-height`, `--dock-layer-gap`, `--dock-padding-inline` | speedtest, Home Assistant |
| `--dock-trigger-padding-block/-inline` | atlas (`0.875rem`, for a 44 px hit), speedtest |
| `--dock-compact-control-padding` | atlas (`0.875rem`), value.js (`0.5rem 0.75rem`) |
| `--dock-ring-offset` | gregg, Home Assistant: `calc(-1 * ring width)` (inset the ring) |
| `--dock-open-seat` | gregg (`max-content`), Home Assistant (`var(--dock-control-size)`) — the current tab's widening is undone |
| `--dock-plate-expanded-tier` | gregg (`var(--glass-veil-wash)`), slides (`0.9`) |
| `--dock-separator-height` | atlas (`1.5rem`), value.js (app token) |
| `--dock-icon-glyph` | fourier (`var(--icon-xl)` on the theme toggle), speedtest (scaled) |
| `--shadow-dock-override` | gregg (none on the pair dock), daraksha |
| `--dock-h` | value.js and speedtest declare their own, colliding with glass-ui's sizing token |

Set by 1 app: `--dock-ring-color`, `--dock-ring`, `--dock-compact-control-size` (value.js);
`--dock-morph-t: 1`, `--dock-max-block-size`, `--dock-card-radius` (atlas);
`--dock-trigger-min-height` (fourier); `--dock-tab-padding-block`, `--dock-tab-min-height`,
`--dock-padding-block`, `--dock-local-scale`, `--dock-label-size`, `--dock-control-safe-inset`
(speedtest); `--dock-plate-collapsed-tier`, `--dock-active-scale`, `--scale-hover-dock` (slides);
`--dock-touch-target`, `--dock-run-gap`, `--dock-cap-cut`, `--dock-compact-control-min-width`
(Home Assistant). atlas also sets `--dock-plate-bg` and `--dock-rim-strength`, which no glass rule
reads.

The other ~128 names (the morph scalars, stagger, cap, plate inset and tier, run reserve,
density-comfortable/compact tables, vertical accent, search, CTA, layer switcher, specular)
are touched by no app.

## Classes (41; about 15 reached into by apps)

Reached into: `.glass-dock` (value.js, gregg, speedtest, Home Assistant, sci-report),
`.dock-plate` (value.js, gregg, speedtest, keyframes via `$el`), `.dock-run` (gregg, Home
Assistant), `.dock-layer--full` / `.dock-layers` (atlas, gregg), `.dock-layer--summary`,
`.dock-layer.is-active` / `.is-leaving` (gregg), `.dock-icon-button`, `.dock-tab-button`,
`.dock-trigger`, `.dock-select-trigger`, `.dock-dropdown-trigger` (value.js, gregg, slides, Home
Assistant), `.dock-separator` (slides, gaggle), `.dock-layer-tab` (value.js), `.dock-run-status`
(gregg, from script). Every reach is a deep selector into internals, and most carry a "delete once
glass …" note.

## Adjacent surface outside `/dock`

- `Popover keepDockOpen`: daraksha only, and across a Teleport, where it does not reach the dock.
  `Select`, `DropdownMenu` and `Tooltip` content register with the dock for the collapse-close
  but pass no `hold`, so no menu holds the dock open by itself. That is why 4 apps call
  `keepOpen`/`release` by hand.
- `DarkModeToggle size="dock"`: gaggle ×3, slides; fourier wraps its own in a `DockControl`;
  value.js targets `.dark-mode-toggle-button` in its dock ring rule. A theme seat is in 7 of 10 apps.
