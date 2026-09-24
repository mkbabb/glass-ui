# D2 · pass 1 · X · the constellation (consumer mounts, overrides, the scroll reference, the constraint set)

| field | value |
|---|---|
| seat | X, the constellation seat of D2 pass 1. It picks no family. It states what the four consumers mount, override and depend on, what the floridify scroll reference does exactly, and what that requires of, or forbids to, any D2 family |
| model | `claude-opus-5-5`, asserted from own system identity |
| glass-ui HEAD | named `5804d8cc`. The tree read `9e1c8f11` at the start, `35d3061e` when the scratch worktree was cut, and `f5682c03` at the end, all through docs-only commits: `git diff 5804d8cc f5682c03 -- src` is 0 lines, and `git diff --stat v10.0.1 35d3061e -- src` is empty. So every consumer on 10.0.1 runs HEAD's dock byte for byte |
| consumer trees (read-only) | value.js `0b64d20c` at start, `c732a320` at end (a live session; the lines cited were re-read at the end), `package.json:89` `^7.0.0`, installed **7.0.0**. keyframes.js `e11db5a1`, `package.json:78` `10.0.1`, installed 10.0.1. fourier-analysis `b4a4311` at start, `1c2f8fd` at end (live), `web/package.json:19` `10.0.1`, installed 10.0.1. chicago: not a git repository, `package.json:12` `^10.0.1`, installed 10.0.1. words (floridify) `26b16ff`: `useSearchBarScroll.ts` last touched `0f16925` (2026-05-12), `views/Home.vue` `9d532be` (2026-04-08) |
| instruments | Read-only `grep`/`sed` over the five trees. For the measured rows: a scratch worktree of glass-ui at `35d3061e` (checkout `node_modules` symlinked) built one scene page from `src/` through an `@glass` alias; six scenes copy one consumer site's dock-facing structure each (props, slots, wrapper children, anchoring, and the consumer CSS verbatim) with stand-in content (`scenes-x.mjs`, `build-x.mjs`). Four runners (`probe-x.mjs` … `probe-x4.mjs`) drive headless **Chromium 149.0.7827.55** and **Playwright WebKit 26.5** (the Playwright 1.61.1 build) at 1280×800, Playwright imported from `glass-ui/node_modules/playwright`. Per-frame rAF loggers read rects, `offsetWidth`, computed `scale`, plate radii and run scroll range. Outputs: `out/probe-x{,2,3,4}.json`, captures `out/cap/*.png`. Scratch root: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/X/`. The worktree was removed with `git worktree remove --force` before return |
| WebKit shim | Playwright WebKit crashed the page on every dock scene here (6/6 loads, `t2.mjs`), the crash the D2 harness documents (`harness/adapter-head.mjs:26-37`: a nested translucent `color-mix()` on the plate border). The WebKit cells carry that harness's shim (border colour pinned to one arm; no geometry or motion input touched) and are labelled **Playwright WebKit +shim**. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| writes | this file only, in the checkout |

## 0 · Findings in one table

| # | finding | kind | where |
|---|---|---|---|
| 1 | Nine `GlassDock` mounts across four consumers. All nine are horizontal. None sets `backdropMode`, none uses `#search`, `DockCrossfade`, `ScrollProgressRim` or `useScrollChrome`. One uses `DockLayerGroup` (value.js). One passes `backgroundCanvas` (keyframes, a getter) | read | §1 |
| 2 | Six of nine mounts do not put seats as direct run children: four wrap every seat in one element, two group seats in a `display: contents` div. HEAD reads seats as `run.children` (`useDockRun.ts:65-75`) and snaps `.dock-run > *` (`run.css:270-271`) | read, measured (kf transport run has 1 child) | §1.2 |
| 3 | Two collapsible consumers author a collapsed face wider than HEAD's 40 px square summary (`morph.css:180-198`). It paints outside the plate by 16.98 px each side (keyframes transport, Chromium; 20.16 Playwright WebKit +shim), and fourier's readout overlaps its own persistent Play by 22.23 px | measured, captured | §4 M-A, M-B |
| 4 | Every collapsed consumer dock whose expanded row is wider than its collapsed box paints the lens in the collapsed rung: plate radii `50% / 16px / 16px / 50%` in 3 of 4 compositions, both engines. The hidden full layer is a live scroller (F-18 route 2 at the consumers) | measured, captured | §4 M-F |
| 5 | fourier's AnimationControls sets the dock's width under `.expanded` (`AnimationControls.vue:225-227`). Every expand, first and warm, is one frame 102 → 960 px, with 70 (Chromium) / 55 (WebKit) `data-morphing` frames that move nothing | measured | §4 M-C |
| 6 | fourier's CanvasControlsDock is anchored by `right` (`VisualizationView.vue:640-645`). HEAD's morph holds layout at the expanded footprint and scales about the centre, so every warm collapse ends and every warm expand begins with the whole dock jumping 97 px in one frame, and the `#persistent-end` control travels 78 px during the morph. A centred dock holds centre drift 0 | measured, both engines | §4 M-D |
| 7 | Content changes while expanded, and in `#persistent` while collapsed, are routine at the consumers (11 sites) and land in one frame with 0 morph frames: 290 → 104, +37.36 and +28.0 px measured | measured | §4 M-E, §6 K-13 |
| 8 | value.js is on 7.0.0. On a HEAD dock its struck `:always-expanded="true"` falls through as an attribute: the dock mounts collapsed, 16 px wide, with an empty summary and both buttons hidden and inert. Its `:show-rail="false"` lands as an attribute and the switcher renders | measured, both engines | §4 M-G |
| 9 | chicago's three overrides work at HEAD. Without them the run overflows by ≤ 2 px on 38/229 (Chromium) and 28/182 (WebKit) hover frames, the plate radius flips, and a horizontal wheel scrolls the run 2 px in Playwright WebKit | measured | §4 M-H |
| 10 | Consumers already carry six JavaScript accommodations of dock behaviour (a mount veil, a font wait before mount, a re-expand watchdog, a click-free play actuation, a local layer crossfade, a seat slot machine). Each names the producer fact that would retire it | read | §3 |
| 11 | The floridify reference is a gate times a ramp, not a threshold machine. Source: `window`. Threshold T = 50 or 100 px; eased progress saturates at 2T; compaction starts at y = 16.3 or 32.5 px. Desktop scale 0.9475 → 0.8725, opacity 0.78 → 0.68, no scale below 640 px. The gate opens at once and closes 150 ms after the last input clears. It rests shrunk at the top of the page, which O-55 R-1's "back out on scroll-to-top" does not match | read, computed | §5 |
| 12 | Scroll sources across the constellation: `window` (chicago, words), an element (fourier's `<main>`, its sole scroller), none (keyframes, whose `html, body` are `overflow: hidden`; value.js, whose band is in flow and scrolls away by decision) | read | §6 K-34 |

## 1 · The mounts

### 1.1 Census

value.js is on the 7.0.0 surface, so M-1 and M-2 are read against that surface and against HEAD.

| id | site | props | slots | the run's direct children | anchoring, surrounding layout |
|---|---|---|---|---|---|
| M-1 | value.js `demo/shell/dock/Dock.vue:159-352` | 7.0.0 surface: `:collapse-delay="5000"` `:start-collapsed="false"` `:fit-content="true"` `:always-expanded="!isDesktop"` (`isDesktop` = `min-width: 1024px`, `:87`) | default: `DockLayerGroup v-model:active :show-rail="false"` (`:166`) over four `DockLayer`s (`mobile-edit :168`, `slug-edit :194`, `action-bar` under `v-if` `:202`, `main :214`). `#collapsed`: the wax seal, `.dock-seal` block-size 100% and aspect-ratio 1 (`:333-351`, `:397-408`) | 1 (the layer group) | In flow, centred in `nav.dock-band` (`shell.css:138-144`, App.vue `:42-50`), band floored at `--dock-band-min-h` (`foundation.css:476`). A wrapper div runs `vj-settle`, scale 1 → 1.03 → 1, on every view switch (`Dock.vue:158,369-371`, `animations.css:170-174`). The band is veiled (`visibility: hidden`) through the producer's mount morph, then lands with `translateY(-12px) rotate(-0.6deg)` → none (`overture.css:105-129`) |
| M-2 | value.js `demo/scenes/ConfigSliderPane.vue:164-173` | `:always-expanded="true"` `:fit-content="true"` | default: two glass `Button size="sm"`. No `#collapsed` | 2 | Footer of a Card (`div.config-action-bar`) |
| M-3 | keyframes `demo/app/dock/ChromeDock.vue:366-542` | `collapse="closed"` `:fit-content="true"` `:background-canvas="auroraCanvas"` (a getter, `:222-226`) | default: `Select` → `DockTrigger for="select"` (`:405-415`); under `v-if="showSurfaceItems"` a `DockSeparator` and N `DockControl shape="icon" compact` (`:459-480`); `DockSeparator v-if="$slots.items"` (`:482`); `<slot name="items">` (`:485`), which App.vue fills with MbabbMenu's `DockTrigger for="dropdown"` (`App.vue:33-35`, `MbabbMenu.vue:15`). `#collapsed`: a focusable glass `Button` (`:530-541`) | seats directly (Select and DropdownMenu render no element) | Fixed full-width band, flex centred, `top: var(--dock-top-anchor)`, `pointer-events: none` on the band and `auto` on the dock's parent (`:342-347`). Over a page that does not scroll (`style.css:286-300`) |
| M-4 | keyframes `demo/components/instrument/transport/TransportDock.vue:31-227` | `collapse="open"` `:fit-content="true"` | default: one `div.transport-row flex items-center` (`:45`) holding a 40×40 glass `Button` with `scale-on-hover` (`:49-66`), an optional `Select` → `DockTrigger` (`:77-137`), separators, one or two `DockControl shape="icon"`, and a text span (`:153-160`). `#collapsed`: a 32×32 play `Button` and the animation name (`:199-226`) | 1 (measured: `runChildren: 1`, both engines) | Fixed full-width band at `bottom: var(--dock-bottom-anchor, …)` (`:1-9`); the band's border-box height is published as `--menubar-measured-h` by a ResizeObserver (`:276-278`, `useMenubarMeasure.ts:24-41`) and feeds the stage's layout reserve (`layout.css:100-120`) |
| M-5 | fourier `web/src/components/layout/AppDock.vue:71-157` | `orientation="horizontal" shape="pill" :collapse="false"`, class `app-dock` | default: `Popover` → `DockTrigger for="popover"` (logo), separator, `DropdownMenu` → `DockTrigger for="dropdown"` (route nav), separator, `div.contents role="group"` (admin badge, `UserSlugBar` → `DockTrigger`), separator, fourier's own `DarkModeToggle` | seats plus one `display: contents` group | `header.app-header`, flex centred, in flow above `<main>`, the app's sole scroller; the document's scroll range is zero (`App.vue:66-67,124,140-141`). The owner words of O-55 name this dock |
| M-6 | fourier `web/src/components/visualization/CanvasControlsDock.vue:41-168` | `fit-content` (collapse default `"closed"`) | default: under `v-if="!isEditing"` (`:62-109`) a click `Popover keep-dock-open` → `DockControl` (with an absolutely positioned `.view-dot`, `:185-194`), separators, `DockControl`s under `v-if="hasContour"` / `v-if="hasData"`; then a `DockControl` (fullscreen). `#collapsed`: a glyph and the dot (`:141-146`). `#persistent-end`: the Edit contour `DockControl` (`:161-167`) | seats directly | `.controls-dock-anchor`, `position: absolute; top: 0.5rem; right: 0.5rem` (`VisualizationView.vue:640-645`), inside ancestors that clip (`VisualizationView.vue:596-600` names `.viz-panel-right { overflow: hidden }` and the stage cell's `overflow-hidden`) |
| M-7 | fourier `…/EditorControlsDock.vue:49-221` | `fit-content` | `#persistent`: a text badge `{{ pointCount }} pts` and the Save `DockControl` (`:82-93`). `#collapsed`: one glyph (`:112-114`). default: one `div.dock-row flex items-center w-full` (`:129`) holding `DockControl`s, separators and two click `Popover keep-dock-open` (`:160`, `:191`) | 1 | `.controls-overlay`: absolute, bottom 0.75rem, inline 0.375rem, flex centred (`VisualizationView.vue:581-591`). It swaps in place with M-8 on the `isEditing` flip (`:357-371`) |
| M-8 | fourier `…/AnimationControls.vue:134-218` | class `animation-dock`, `:style` `--animation-dock-max-width` (prop `maxWidth`, default 960px, `:15-26,137`); collapse default | `#persistent`: the Play `DockControl` (`:153-171`). `#collapsed`: a 3rem × 4px progress bar and a `Metric` speed readout (`:174-177`). default: one `div.flex items-center gap-2 w-full` (`:180`) holding `GlassTimeline` (a slider scrubbed by drag), `SpeedSelect`, and a `DropdownMenu` → `DockTrigger` | 1 | `.controls-overlay` (as M-7). Also mounted in `FullscreenViewer.vue:131` |
| M-9 | chicago `src/TempApp.vue:291-339` | `orientation="horizontal" fit-content :collapse="false"` | default: `div.contents role="group"` holding three `DockControl shape="tab" class="tap-squish" :active`; separator; `Popover keep-dock-open` → `PopoverTrigger as-child` → `DockControl shape="tab"`; separator; `DockControl` (icon, `title` and `aria-label`) | seats plus one `display: contents` group | `nav.page-dock`: fixed, `bottom: max(var(--space-family), env(safe-area-inset-bottom))`, full width, flex centred, 16px inline padding, `pointer-events: none` with `auto` on children and `max-width: 100%` on the dock (`style.css:85-98`). Over a page that scrolls on `window` |

### 1.2 Aggregates

| axis | count | sites |
|---|---|---|
| orientation | 9 horizontal, 0 vertical | vertical is demo-only in this constellation |
| `shape` | 1 explicit (`"pill"`, the default) | M-5 |
| `backdropMode` | 0 explicit; all nine run `"live"` (`GlassDock.vue:83-86`) | chicago tried `"static"` as a workaround (C-2 row 3); the live file carries a veil-floor override instead (§2 X-3) |
| `backgroundCanvas` | 1, a getter | M-3 |
| collapse pole | `"closed"`/default 4 (M-3, M-6, M-7, M-8); `"open"` 1 (M-4); `false` 2 (M-5, M-9). value.js on the 7.0.0 surface: M-1 open on desktop and pinned below 1024 px, M-2 pinned | after value.js repins it needs all three poles and a runtime flip between two of them (§6 K-2) |
| `fit-content` | 7 | all but M-5 and M-8 |
| slots | default 9, `#collapsed` 6 (M-1, M-3, M-4, M-6, M-7, M-8), `#persistent` 2 (M-7, M-8), `#persistent-end` 1 (M-6), `#search` 0 | |
| layer usage | `DockLayerGroup` 1 (M-1, 4 layers, one under `v-if`), `DockCrossfade` 0 | fourier's only `DockCrossfade` mention is a comment (`EditorControlsDock.vue:246`); value.js's is a comment (`ActionBarLayer.vue:84`) |
| seats not direct run children | 4 mounts wrap all seats in one element (M-1, M-4, M-7, M-8); 2 group seats in `display: contents` (M-5, M-9) | §6 K-12 |
| non-dock primitives seated in the run | glass `Button` (M-2 ×2, M-4, value.js `ProfileSection.vue:59,129,152`), `WatercolorDot` (M-1 `:169-180`), `Metric` (M-8), a slider (M-8), `SpeedSelect` (M-8), fourier `DarkModeToggle` (M-5), plain text spans (M-4, M-7) | O-56 G-2 (value.js login and `@user` pills "squared") is the glass `Button` seated in a dock |
| expose read | `expanded` (M-1 `Dock.vue:92-97`, M-3 `:305-311`, M-6 `:34-37`), `isPinned` and `isHeld` (M-3 `:305-311`) | `collapse()`, `isTransitioning`, `graspHeld`: no consumer reader found |
| expose called | `expand()` (M-1 `:115-117`, M-3 `:309,325`, M-4 `:288`); `keepOpen()`/`release()` (M-1 `:110-113`, M-3 `:335-338`) | keyframes' test mock fixes the shape `{ expand, collapse, keepOpen, release }` (`test/demo/instrument/transport-keyboard-propagation.test.ts:66-76`) |
| dock context | `useOptionalDockContext().keepOpen/release`: value.js `ActionButton.vue:84-86`, keyframes `MbabbMenu.vue:351-379` | |
| `Popover keep-dock-open` | 4 (M-6 ×1, M-7 ×2, M-9 ×1) | `Popover.vue:25,94` |
| label shedding by breakpoint | 4 of 4 consumers shed label text so the row fits on one line and never scrolls: keyframes `ChromeDock.vue:414` (`max-[399px]:sr-only`), fourier `AppDock.vue:207-252` (labels shown from 640 px), value.js `ActionBarToggle.vue:82,96,103` (desktop-only label, separator and arrow), chicago `style.css:110-122` (short labels at ≤ 480 px) | §6 K-22 |

### 1.3 Corrections to PORTFOLIO §1.4

- **fourier's tokens.** §1.4 says fourier "sets `--dock-control-size`, `--dock-scale` and `--dock-control-active-bg`". It sets `--dock-trigger-min-height` (`AppDock.vue:189`) and `--dock-control-active-bg` (`AnimationControls.vue:237`). It reads `--dock-control-size` (`AppDock.vue:189,194,198`; `UserSlugBar.vue:260`), `--dock-icon-glyph` (`CanvasControlsDock.vue:210-211`; `EditorControlsDock.vue:260-261`) and `--dock-layer-gap` (`EditorControlsDock.vue:270`). `--dock-scale` appears only in comments.
- **"No consumer mounts DockCrossfade directly."** True. But value.js stamps the producer's crossfade class names (`dock-layer`, `is-active`, `is-leaving`) on its own sub-layers and relies on the producer's rules for them (§2 X-12).
- **Mount count.** §1.4 lists sites by file. There are nine mounts; M-7 (`EditorControlsDock.vue:49`) and M-8 (`AnimationControls.vue:134`) are both live.

## 2 · Consumer CSS that reaches into the dock

"Retires when" names the producer fact that makes the override unnecessary. D2 owns every row except X-3, which is an interface (O-62, F-23).

| id | consumer, file:line | declaration | producer fact it overrides or reads | why the consumer wrote it | retires when |
|---|---|---|---|---|---|
| X-1 | chicago `style.css:130-132` | `.glass-dock.shape-pill { --dock-cap-rest: 9999px }` | `run.css:468` `--dock-cap-rest: 50%`, which resolves per axis and paints the lens | a 1-2 px hover overflow arms the cut cap (C-2 row 2). The selector is page-global: it retunes every pill dock on the page, not only `.page-dock` | the plate is a stadium by construction in every rung (problem 1), and the cap arms only on genuine overflow (problem 2) |
| X-2 | chicago `style.css:136-138` | `.page-dock .dock-run { overflow: visible }` | `run.css:163-164` `overflow-x: auto; overflow-y: hidden` | a hover `scale(1.1)` pokes about 2 px past the run, which then scrolls under a wheel and slides every label. The override also turns off snap and the cut-cap timeline for this dock for good | a run whose seats fit has no scroll range under hover, focus or press (W-3, W-3t) |
| X-3 | chicago `style.css:139-142` | `--dock-plate-expanded-tier` / `--dock-plate-collapsed-tier: max(token, 0.62)` | `shell.css:146-148`, lerped at `dock.css:117-124` | the live veil sits at 0.14 (dark) / ~0.2 (light) over photos (C-2 row 1) | interface only: O-62 / F-23 own it |
| X-4 | fourier `AnimationControls.vue:225-227` | `.animation-dock:where(.expanded) { width: min(var(--animation-dock-max-width, 960px), calc(100dvw - 1rem)) }` | the producer has no "expanded fills up to a cap" mode: the inline cap `--dock-max-inline-size` is deleted (`shell.css:199-226`), and a non-`fit-content` expanded dock fills only its own `.dock-layers` (`layers.css:344-350`) | the timeline row should stretch to 960 px | the expanded extent cap is a dock input, and the morph lands on it (measured cost in §4 M-C) |
| X-5 | fourier `AppDock.vue:188-199`, `UserSlugBar.vue:255-261` | `.app-dock { --dock-trigger-min-height: var(--dock-control-size) }`; `min-inline-size: var(--dock-control-size)` on three trigger faces; `--toggle-size` on its toggle | `triggers.css:31` `min-height: var(--dock-trigger-min-height, auto)` | trigger faces were smaller than the ≥ 44 px coarse cell | a `DockTrigger`'s box is the seat cell by construction (the lattice pitch) |
| X-6 | fourier `AnimationControls.vue:236-246` | `.play-control[data-active] { --dock-control-active-bg: linear-gradient(…); background-size: 300% 300%; animation: rainbow-drift 2.5s infinite }` | the public active-seat knob (`sizing.css:207,237`, read at `icon-button.css:173-176`) | the playing state keeps its rainbow | not an override to retire: a public knob. Constraint: the knob takes an image and a running background animation |
| X-7 | value.js `foundation.css:452-459` | `:root { --dock-h: calc(var(--size-icon-btn) + var(--dock-padding-y) + var(--dock-border-width)) }` | shadows `sizing.css:134` (the same value), which feeds `--dock-separator-height` (`shell.css:75`) | value.js's own comment: a control and separator basis, not the band floor | the separator's extent derives from the seat cross extent |
| X-8 | value.js `foundation.css:460-476`, `shell.css:88-96,138-144` | `--dock-band-min-h: calc(var(--size-icon-btn) + 2rem)` as the band's `min-height` | the dock's expanded cross extent, which value.js reserves itself so collapse ↔ expand does not reflow the scene (T-57: the band grew 6.4 px on every re-expand before) | the file says it "RETIRES to the producer `--dock-pill-h` rung when it ships" | the dock publishes its cross extent as a token or reserves it itself (the cross axis is already invariant across the morph, `morph.css:101-155`) |
| X-9 | value.js `DockViewSelect.vue:66-71` | inline `--dock-ring` per trigger (view accent, or gold in admin mode); `[&>span]:line-clamp-none` | `sizing.css:256` `--dock-ring`; the trigger's label clamp (`DockTrigger.vue:25-29`) | the seal-to-trigger colour continuity; value.js's "Ad-18" marker asks for a `clampLabel` prop | the ring colour is a per-seat input (keep); the clamp policy is F-19's or the trigger's, not D2's |
| X-10 | value.js `ActionBarToggle.vue:154-158`, `SlugEditLayer.vue:160-162` | `--dock-compact-control-padding: 0.5rem 0.75rem`; `--dock-compact-control-size: max(1.5rem, var(--control-floor))` | `icon-button.css:236,239` | a compact seat that reads as a real button; a ≥ 24 px / 44 px hit cell | public knobs. Constraint: compact seats of consumer-chosen width exist, so seat width is not always one pitch |
| X-11 | value.js `ActionBarToggle.vue:76-145` | a seat whose presence animates `grid-template-columns: 0fr ↔ 1fr` and opacity over `--duration-normal var(--ease-standard)` inside the run; its inner box is `overflow: hidden` and is released to `visible` only at settle (`:143-145`, "T-29"), because `overflow-clip-margin` was rejected for Safari | no producer seat enter/leave motion; the run clips its cross axis (O-63) | a Tools seat that appears and disappears with the view | seat presence changes morph on the dock spring (R-2), and a seat's ring or capsule is never clipped (O-63). Until then the dock width has two owners on this edge (§6 K-13) |
| X-12 | value.js `ActionBarLayer.vue:83-128,136` | a local `useLayerTransition` (a 260 ms `setTimeout`) that stamps `dock-layer` + `is-active` / `is-leaving` on its own two sub-layers inside `div.dock-layer-grid` | relies on `:where(.glass-dock, .dock-layer-group) .dock-layer:not(.is-active) { position: absolute; inset: 0 }` (`layers.css:229-236`) and catches the morph stagger `.glass-dock[data-morphing] .dock-layer.is-active > *` (`layers.css:256-328`) | glass 7 removed `useLayerTransition`; the file's relay note: "a public content-swap composable would retire this local shim" | a public content-swap primitive that nests inside a dock layer |
| X-13 | keyframes `TransportDock.vue:53,209`; value.js `ActionButton.vue:117-120` | glass `scale-on-hover` (`btn.css:15-26`: `scale: var(--scale-hover)` = 1.08, `scale-paper.css:9`, not under `(hover: hover)`) on a 40 px seat; `.action-icon:hover { transform: scale(1.2) }` on an icon inside a 2rem seat | the dock's own seat lift is 1.1 (`scale-paper.css:10`, `icon-button.css:112-116`, `tab-button.css:69-73`) | consumer hover feedback | nothing to retire. Constraint: paint reach inside a seat is not the dock's to bound (§6 K-33) |
| X-14 | fourier `CanvasControlsDock.vue:185-194` | `.view-dot { position: absolute; top: -1px; right: -3px }` on a seat | none | a state dot on the View options seat | nothing to retire. Constraint: consumers paint outside the seat box |

keyframes sets no producer dock token. It reads `--dock-layer-gap` (`TransportDock.vue:347-349`) and `--dock-icon-glyph` (`ChromeDock.vue` `.dock-glyph`). Its `--dock-*` layout tokens (`layout.css:62-160`, e.g. `--dock-top-anchor`, `--dock-band-reserve`) are its own namespace: 0 hits for each in glass `src/`. value.js's `--dock-gap`, `--dock-inset` and `--dock-band-min-h` are likewise its own (0 hits).

## 3 · Consumer JavaScript that accommodates dock behaviour

| id | consumer, file:line | what it does | the producer behaviour it answers | retires when |
|---|---|---|---|---|
| A-1 | value.js `boot/useDockArrival.ts:1-14,30-84`, App.vue `:42-50` | veils the dock band while the producer's mount morph runs; reveals on a `transitionend` from any `.glass-dock` descendant, else after two frames checks `getAnimations({ subtree: true })`, keeping only finite document-timeline animations, because the cut-cap scroll-timeline animations never finish and waiting on them "veiled the dock FOREVER on WebKit-mobile" (`:52-62`) | a visible nub → pill mount morph | the dock arrives at rest; the file says "this veil dies the day it ships" (`:9-10`). Note: a design whose morph is not a CSS transition fires no `transitionend`; A-1's fallback path then carries it |
| A-2 | keyframes `demo/app/main.ts:34-50` | waits for the body font to decode (≤ 1.5 s) before `app.mount` | "GlassDock measures its expanded layer width at MOUNT", and a fallback-face measure under-sized the pill by ~10 % and clipped the transport at 390 px | endpoints are not taken at mount against a fallback face (re-measure on `document.fonts` or measure-free endpoints; R-1, W-6) |
| A-3 | keyframes `ChromeDock.vue:292-311` | re-expands the dock when it collapses while `isHeld` | a producer touch gate that collapsed without consulting holds. HEAD deleted that gate (`GlassDock.vue:9-17`), so the watchdog answers a path that no longer exists | already, at keyframes' next repin |
| A-4 | keyframes `ChromeDock.vue:322-327,530-541`, `TransportDock.vue:199-226` | seats a focusable glass `Button` in `#collapsed` and hands keyboard focus to the expanded trigger | at HEAD the summary is itself a `role="button"` disclosure whenever it is the current layer (`GlassDock.vue:231,476-492`), so these are nested interactive controls. fourier moved its collapsed controls to `#persistent` for that reason (`EditorControlsDock.vue:52-81`, `AnimationControls.vue:140-152`) | the design states which holds: the summary is the disclosure and actionable content lives in `#persistent`, or the summary admits controls (§6 K-19) |
| A-5 | keyframes `TransportDock.vue:280-289` (`usePlayActuation`) | actuates Play from pointerup and key events, never `click` | "the dock's collapse crossfade can strand" the synthesised click | a layer swap never drops or re-targets a press that began on the leaving face (§6 K-20) |
| A-6 | keyframes `useMenubarMeasure.ts:24-41` | publishes the transport band's border-box height (live and a monotonic peak) on `:root` | the dock's block extent is layout-significant to the stage | nothing to retire. Constraint: a rung that changes the dock's block extent moves keyframes' stage (§6 K-21) |
| A-7 | value.js `Dock.vue:92-97`; fourier `CanvasControlsDock.vue:34-37` | exits slug edit on collapse; mirrors `expanded` to the parent | posture as an observable | keep `expanded` (§6 K-6) |
| A-8 | value.js `e2e/smoke/fixtures/dock.ts:41-50` and three specs (`scene-action-contract.spec.ts:100`, `w7-inspector-rows.spec.ts:134`, `o29-scene-contracts.spec.ts:94`) | clicks `.glass-dock.collapsed` to expand, then waits for `.glass-dock[data-morphing]` to reach count 0 | a posture class and a settle signal | a successor for each fact exists (§6 K-10) |

## 4 · Measurements at HEAD on consumer compositions

Stand-in content; each scene copies the cited consumer structure (§ header). Viewport 1280×800. "C" is Chromium 149.0.7827.55; "W" is Playwright WebKit 26.5 +shim. Real Safari: UNMEASURED (owner's safaridriver checkbox).

**M-A · keyframes transport, collapsed face (M-4).** `probe-x.json` `kfTransportCollapsed`, `probe-x2.json` `kfClip`, `cap/{chromium,webkit}-kf-transport-collapsed.png`.

| | C | W |
|---|---|---|
| dock, plate, summary widths | 56, 56, 40 | 56, 56, 40 |
| collapsed content (`summary.scrollWidth`) | 65 | 68 |
| Play's left edge outside the plate | 16.98 px | 20.16 px |
| name's right edge outside the plate | 16.98 px | 20.16 px |
| overflow / clip-path on `.glass-dock`, `.dock-controls`, `.dock-layers`, `.dock-layer--summary` | all `visible` / `none` | all `visible` / `none` |

The captures show the Play glyph and the word painted outside the circle, on the page.

**M-B · fourier animation readout, collapsed (M-8).** `probe-x.json` `frAnimCollapsed`, `probe-x2.json` `frAnimOverlap`, `cap/{chromium,webkit}-fr-anim-collapsed.png`. The dock is 102 px (persistent Play + a 40 px summary). The 3rem bar starts inside the persistent Play: overlap 22.23 px (C) / 22.25 px (W). The speed text ends 20.25 px (C) / 20.27 px (W) past the plate's right edge.

**M-C · fourier expanded width override (M-8, X-4).** `frAnimFirstExpand`, `frAnimWarmExpand`.

| | C | W |
|---|---|---|
| first expand: widths seen | 102 → 960 in one frame, 2 distinct | same |
| warm expand after the 3,600 ms idle collapse | 102 → 960 in one frame, 2 distinct | same |
| `data-morphing` frames per expand | 70 / 74 | 55 / 55 |
| rest width | 960 (the consumer's rule) | 960 |

**M-D · right-anchored dock (M-6).** `probe-x3.json`. Anchor edge = stage right − 8 px = 1248.

| | C | W |
|---|---|---|
| cold first expand | 96 → 290 in one frame (W-6 class); right edge held (0) | same |
| warm collapse | layout holds 290 under `scale: 0.331034 1`, visual box 1055-1151; at settle layout becomes 96 at 1152-1248: **the whole dock moves 97 px in one frame** | same |
| warm expand | the first morph frame moves the dock from 1152-1248 to 1055-1151: **97 px in one frame**, then it grows about that centre | same |
| `#persistent-end` right edge vs anchor during the morph | −8 → −86.26 px (78 px of travel) | same |
| control: centred transport (M-4) | centre drift 0; largest per-frame edge step 7.67 px | 9.79 px |

**M-E · content changes, unmorphed.** `probe-x2.json`.

| composition | change | C | W |
|---|---|---|---|
| M-6 expanded | `isEditing` true: three seats and two separators leave | 290 → 104 in one frame, 0 `data-morphing` frames | same |
| M-7 collapsed | `#persistent` badge 9 → 10000 pts | 156.41 → 193.77 in one frame, 0 morph frames | 156.42 → 193.80 |
| M-7 expanded | badge → 10000000 pts | 294.77 → 322.77 in one frame, 0 morph frames | 294.80 → 322.81 |

**M-F · the lens in the collapsed rung.** `probe-x4.json`. Plate radii are top-left / top-right / bottom-right / bottom-left.

| composition | collapsed width | plate radii (C and W identical) | hidden full layer: client / scroll width | cap animation progress |
|---|---|---|---|---|
| M-4 transport | 56 | `50% / calc(0% + 16px) / calc(0% + 16px) / 50%` | 56 / 228 | 0, 1 |
| M-8 animation | 102 | same | 102 / 288 | 0, 1 |
| M-6 canvas | 96 | same | 96 / 226 | 0, 1 |
| M-7 editor | 156.41 | `9999px` ×4 | 156 / 156 | inactive |

The full layer is `position: absolute; overflow-x: auto; visibility: hidden` in the collapsed rung, so it is a scroll container with range and the plate's cut cap reads it (R2-02-06). M-7 escapes only because its persistent badge makes the collapsed box as wide as the expanded row. The trailing corners read the cut value (16 px) at rest on a 56 px circle.

**M-G · value.js's struck props on a HEAD dock (M-2, M-1).** `probe-x.json` `vjConfig`, identical in C and W. `<GlassDock :always-expanded="true" :fit-content="true">`: classes `glass-dock horizontal shape-pill collapsed fit-content`; attribute `always-expanded="true"` on the root; width 16 px; `#collapsed` absent, so the summary has 0 children; `.dock-layer--full` `visibility: hidden` and `inert`; the Copy JSON button `visibility: hidden`. `DockLayerGroup :show-rail="false"`: the attribute lands on `.dock-layer-group`, and one `role="tablist"` renders (HEAD's prop is `showSwitcher`, default true, `DockLayerGroup.vue:52-71`).

**M-H · chicago (M-9), without and with its three overrides.** `probe-x.json` `chicago_ov0`, `chicago_ov1`. A sweep over the five seats, then a 200 px horizontal wheel on the last seat.

| | C, no overrides | W, no overrides | C, overrides | W, overrides |
|---|---|---|---|---|
| run `overflow-x` | `auto` | `auto` | `visible` | `visible` |
| frames with scroll range > 0 | 38 / 229, max 2 px | 28 / 182, max 2 px | 36 / 228 (not a scroll container) | 28 / 181 (not a scroll container) |
| plate top-left radius values seen | `9999px`, `50%` | `9999px`, `calc(47.916667% + 0.666667px)` | `9999px` | `9999px` |
| `scrollLeft` after the wheel | 0 | **2** | 0 | 0 |
| plate veil alpha | 0.1 | 0.1 | 0.62 | 0.62 |

The Playwright WebKit wheel reproduces chicago's "labels slide" report, which W-3 did not reproduce in Chromium (mandatory snap returned it there).

## 5 · The floridify reference, exactly

The live path is four files in `~/Programming/words/frontend/src`. `components/custom/search/utils/scroll.ts` (a second, container-style implementation with an "inflection point") has no importer and is dead.

**Inputs.**

| input | source | file:line |
|---|---|---|
| scroll offset `y` | VueUse `useScroll(window)`: the window, no element | `views/Home.vue:174` |
| threshold T | 50 px when an entry or word suggestions are shown, else 100 px | `Home.vue:176-178` |
| focus | `searchBar.isFocused` (store) | `useSearchBarScroll.ts:43` |
| hover | `uiState.isContainerHovered`, set by `mouseenter` / `mouseleave` on the container: no pointer-type or `(hover: hover)` guard, so a touch's emulated mouse events latch it | `SearchBar.vue:9-10,260-268`, `useSearchBarScroll.ts:44` |
| open surfaces | `searchBar.showSearchControls`, `searchBar.showDropdown` | `useSearchBarScroll.ts:45-46` |
| viewport width | `window.innerWidth` on `resize`; "mobile" is < 640 px | `useSearchBarScroll.ts:18-34,67` |

**The chain.**

1. `scrollProgress = 1 − (1 − min(y / 2T, 1))³`: an ease-out cubic of y over 2T, so it saturates at y = 100 px (T = 50) or 200 px (T = 100) (`Home.vue:180-184`).
2. `shrinkPercentage = max(b, min(0.85 · scrollProgress, 0.85))`, with b = 0 when focused and 0.35 otherwise (`Home.vue:186-189`).
3. `useSearchBarScroll` copies it into `uiState.scrollProgress` (`:99-106`; the name is reused for the shrink value).
4. **The gate.** `isInteractive` becomes true at once when focus, hover, controls or dropdown turns true, and false 150 ms after all four are false (a `setTimeout`, cleared on every change) (`:36-60`). That 150 ms release is the reference's only hysteresis. There is no threshold hysteresis, no scroll-direction input and no memory: the shrink is a function of position.
5. **The container style** (`:62-97`):
   - Interactive: `scale(1)`, opacity 1, `transition: transform var(--duration-normal, 0.3s) var(--ease-out), opacity …`.
   - Otherwise: eff = max(0.35, min(shrink, 1)); scale = 1 − 0.15·eff on ≥ 640 px and 1 below; opacity = max(0.65, 0.85 − 0.2·eff); `transition: … var(--duration-fast, 0.2s) var(--ease-out)`.
   - `maxWidth` is constant per breakpoint (`calc(100dvw - 0.5rem)` / `min(32rem, calc(100dvw - 2rem))`), and the code comment states why: transform and opacity only, so the sticky bar "never causes reflow feedback loops" (`:62-72`). The container scales about its top edge (`origin-top`, `SearchBar.vue:5`) and sits in a `sticky top-0` wrapper (`Home.vue:191-193`).
6. **Secondary readers.** The icon opacity fades from 1 to 0.1 between shrink 0.4 and 0.85 on an ease-out cubic, and is held at 1 by the same four inputs (`useSearchBarUI.ts:29-54`). The placeholder empties when scrollProgress > 0.3 (`useSearchBarBindings.ts:99-103`).

**Computed values** (the chain evaluated in node at the listed y; unengaged, desktop):

| y (px) | T = 50: scale, opacity | T = 100: scale, opacity |
|---|---|---|
| 0 | 0.9475, 0.78 | 0.9475, 0.78 |
| 17 | 0.9454, 0.7772 | 0.9475, 0.78 |
| 50 | 0.8884, 0.7012 | 0.9263, 0.7517 |
| 100 | 0.8725, 0.68 | 0.8884, 0.7012 |
| ≥ 200 | 0.8725, 0.68 | 0.8725, 0.68 |

- Compaction leaves its resting value at y = 16.3 px (T = 50) or 32.5 px (T = 100).
- The 0.65 opacity floor is never reached: eff tops out at 0.85, so opacity bottoms at 0.68.
- **At the top of the page an unengaged bar rests shrunk** (scale 0.9475, opacity 0.78). O-55 R-1 asks the dock to come "back out on … scroll-to-top". That is the owner's ask; the reference does not do it.
- Below 640 px nothing scales; only the opacity moves.
- **Motion tokens.** words imports `@mkbabb/glass-ui/styles` (`assets/index.css:3`) at pin `^3.0.0`, which is not installed on disk here, so the resolved `--duration-*` and `--ease-out` at words' pin are UNMEASURED. At glass HEAD they are 0.2 s, 0.3 s (`scheme-motion.css:100-101`) and `cubic-bezier(0, 0, 0.2, 1)` (`scheme-spring.css:154,159`): bezier timings, not springs.

**What the reference gives a dock design, and what it does not:**
- It gives the engagement gate (focus ∪ hover ∪ open surfaces, 150 ms release) and the no-reflow rule.
- It does not give a threshold, direction, hysteresis on position, spring motion (D-1), modality-typed hover (F-77), or a scroll-to-top reset.
- The owner's words ("shrink and morph on scroll to go into a smaller state--and change on and expand on focus and hover", O-55) read as a rung change. The reference is a continuous uniform scale.

## 6 · The constraint set

"Must" rows bind any family. A name may change under E-1 and the consumer-updates ruling (the consumer re-points in its own tranche by a marked addendum), but each fact below needs exactly one successor.

### 6.1 Surface that must survive

| id | constraint | consumers |
|---|---|---|
| K-1 | Horizontal is the whole consumer load: 9 of 9 mounts. A vertical-only mechanism, or one that is weaker horizontally, has no consumer | all |
| K-2 | Three collapse poles (`"closed"`, `"open"`, `false`) and a defined runtime flip between them. After its repin, value.js needs `:collapse="isDesktop ? 'open' : false"`. At HEAD a `false` → collapsible flip lands on `collapsed` whatever the mount pole (`useDockState.ts:415-423`), so crossing 1024 px would collapse value.js's dock | M-1..M-9 |
| K-3 | `fit-content` (7 mounts), plus an expanded extent cap for a dock that fills: M-8 needs "fill up to 960 px". Either a cap input the morph lands on, or the morph treats a consumer width as its endpoint. HEAD has neither (X-4, M-C) | M-8, and every `fit-content` dock inside a bounded parent (M-9's `max-width: 100%`) |
| K-4 | The scroll-source input is an element or a getter, never a selector string (O-55 R-1). Precedent at HEAD: `backgroundCanvas` advertises `\| string` (`useDockShellProps.ts:93-97`) and drops it to `null` (`GlassDock.vue:127-134`); keyframes wrote a getter after finding that (`ChromeDock.vue:200-226`) | M-3; §6.4 |
| K-5 | Slots: default (9), `#collapsed` (6), `#persistent` (2), `#persistent-end` (1). `#search` has no consumer. `#collapsed` content wider than the collapsed box exists at two consumers (M-4, M-8) and paints outside the plate today (M-A, M-B). A design either makes the collapsed rung as wide as its face (the summary sizes to content), or states the circle as the contract, clips to it, and routes M-4 and M-8 content to `#persistent` by addendum | M-1, M-3, M-4, M-6, M-7, M-8 |
| K-6 | Expose: `expanded`, `isPinned`, `isHeld`, `expand()`, `keepOpen()`, `release()`, plus `collapse()` in keyframes' test mock | M-1, M-3, M-4, M-6 |
| K-7 | The hold (`keepOpen` / `release` on the context, and `Popover keep-dock-open`) survives, and it also blocks the compact rung: words treats an open dropdown or controls surface as engagement | value.js, keyframes, fourier ×3, chicago |
| K-8 | A layer swap for value.js's four faces (`v-model:active`, one face under `v-if`), with the switcher off. value.js's nested sub-layer swap borrows the producer's classes (X-12), so the successor must nest inside a face | M-1 |
| K-9 | `DockControl` `shape` (icon, tab), `compact`, tri-state `active`, `disabled`, `as-child` under `PopoverTrigger`; `DockTrigger for` select, dropdown and popover; plain `DockSeparator` | all |
| K-10 | Facts consumer code and tests read, each needing one successor: a posture class (`.glass-dock.collapsed`, value.js fixture); a settle signal (`.glass-dock[data-morphing]` clearing, four value.js specs, and O-64 R-4's window); the dock root (`.glass-dock`: value.js `useContrastSafeColor.ts:152` and `useDockArrival.ts:34,51`, keyframes `chrome-dock-containment.test.ts:105`, O-64's sampler, fourier e2e); seat classes (`.dock-icon-button`, `.dock-trigger`, `.dock-layer--summary`, fourier `f-w13-image-controls.spec.ts:53`); the summary's accessible name "Expand dock" (fourier `f-w14-control-row.spec.ts:177`) | value.js, keyframes, fourier |

### 6.2 Behaviours a design must not break

| id | constraint | evidence |
|---|---|---|
| K-11 | **The anchor edge is the consumer's.** Seven mounts are centred and one is right-anchored (M-6). The morph must hold whichever edge layout holds. A morph about the box centre, or an aperture symmetric about it, fails M-6. Measured at HEAD: a 97 px one-frame jump at the start of every warm expand and the end of every warm collapse, and 78 px of travel for a persistent control (M-D) | M-D |
| K-12 | **Seats at any depth.** Four mounts put every seat inside one wrapper and two use `display: contents` groups. Lattice, snap, roving, reach and stagger that read direct children collapse those docks to one seat. The PORTFOLIO's floor row 1 (declared seats) is required by the constellation, not an option. The wrappers are `w-full` in M-7 and M-8, so the run's lone child also stretches | §1.1, M-A (`runChildren: 1`) |
| K-13 | **Content changes on a live dock morph on the dock spring, with one owner.** Sites: M-6 `v-if` on `isEditing`, `hasContour`, `hasData` (`:62,95,101`); M-7's badge text (`:83`); M-3's `showSurfaceItems` and `$slots.items` (`:459,482`); M-4's channel select and timeline chip (`:77,153`); M-1's action-bar layer `v-if` (`:202`) and the Tools seat (X-11); M-1's view label (DockViewSelect `SelectValue`); M-9's counts and labels. Measured one-frame steps: 186, 37.36, 28.0 px (M-E); keyframes 16.79 px (O-64 R-2). value.js already animates one of these edges itself (X-11, a 0fr ↔ 1fr bezier), so the cure must land with that consumer transition's retirement or the width has two owners (O-64 R-5, generalised) | M-E, X-11 |
| K-14 | **A consumer-set width is not a second extent owner.** A design that owns the extent (measured or closed-form) fights X-4; today the fight costs an 858 px one-frame expand (M-C). The cap must be an input (K-3) | M-C |
| K-15 | **Ancestors transform.** value.js scales the dock's wrapper to 1.03 on every view switch, the same moment its content width changes, and lands the band with a translate and a rotate. A design that measures endpoints must measure in the dock's own space (layout or ResizeObserver boxes), not from `getBoundingClientRect`, which includes ancestor transforms. `dock.css:219-233` keeps the dock itself transform-free for `anchor()`, but consumers transform its ancestors | M-1 |
| K-16 | **Ancestors clip and bands pass pointers through.** fourier's canvas docks sit under `overflow: hidden` ancestors (`VisualizationView.vue:596-600`). keyframes and chicago put docks in `pointer-events: none` bands with `auto` on the child. Paint or hit area placed outside the dock box (a projected plate, the rim, hover shadows) is clipped by consumer ancestors unless it is in the top layer, and needs its own `pointer-events` | M-3, M-4, M-6, M-7, M-8, M-9 |
| K-17 | **Drag controls live in seats.** M-8 seats a scrubbable slider (`GlassTimeline`) in the run. A run that owns horizontal pan (native `touch-action: pan-x` today, `run.css:181`; a transform track tomorrow) must leave a seat's own gesture alone, and a scrub also takes the grasp hold (`useDockHold`) | M-8 |
| K-18 | **Document View Transitions belong to keyframes.** keyframes wraps every scene switch in a document View Transition (`useSceneTransition.ts:6-50`, `App.vue:437-438`), and the scene switch is when the ChromeDock's width changes (O-64 R-2). A dock morph that starts its own document transition collides with it: one document transition at a time, and W's P07 measured a 133-135 px jump for a second transition started mid-flight, with page clicks swallowed | M-3 |
| K-19 | **The collapsed face and interactivity.** keyframes seats buttons in `#collapsed` (A-4). HEAD's summary is a `role="button"` disclosure, so they are nested interactive. The design must state one of two contracts: the summary is the disclosure and actionable content goes to `#persistent` (keyframes' addendum), or the summary admits controls and is not a button | M-3, M-4, A-4 |
| K-20 | **Press integrity through a swap.** A press that begins on the leaving face must not be dropped or re-targeted (A-5). keyframes and value.js both rely on it; HEAD's press keepalive (`is-press-keepalive`, `GlassDock.vue:462-470`) is the current answer | M-1, M-4 |
| K-21 | **Footprint stability.** value.js reserves the expanded cross extent (X-8), keyframes measures its band (A-6), and fourier's AppDock is in flow above the element that scrolls. A rung that changes the dock's layout extent moves consumer layout, and for fourier it resizes the scroller that drives the rung: compaction changes `<main>`'s height, which changes its scroll range, which changes the compaction input. A compact rung must leave the layout footprint unchanged, as words' transform-and-opacity rule does, or reserve it | X-8, A-6, M-5 |
| K-22 | **A fitting row never scrolls.** All four consumers shed label text by breakpoint to keep one row (§1.2). A design must not scroll, fold into a "More" seat, or cap-cut a row that fits, under hover, focus or press (W-3, M-H). Whatever it does on genuine overflow must not pre-empt the consumer's own breakpoints | §1.2, M-H |

### 6.3 Overrides and accommodations a design must make unnecessary

| retire | the design fact that retires it |
|---|---|
| X-1 chicago `--dock-cap-rest: 9999px` | the plate is a stadium in every rung and orientation by construction; the cap arms only on genuine overflow, and never from a hidden layer (M-F) |
| X-2 chicago `.dock-run { overflow: visible }` | no scroll range when seats fit, under hover, focus and press; the run's cross axis never clips a seat's ring, capsule or shadow (O-63) |
| X-4 fourier's width on `.expanded` | an expanded extent cap as an input (K-3) |
| X-5 fourier's trigger min-height | a trigger face equals the seat cell |
| X-8 value.js's band floor | the dock publishes, or itself reserves, its cross extent |
| X-11 value.js's slot machine and settle-stamped clip release | seat presence morphs on the dock spring; seat paint is never clipped |
| X-12 value.js's local layer transition | a public content swap that nests in a face |
| A-1 value.js's mount veil | the dock arrives at rest, with no visible mount morph |
| A-2 keyframes' font wait before mount | no endpoint taken against a fallback face |
| A-3 keyframes' re-expand watchdog | already obsolete at HEAD; keyframes drops it at its repin |
| A-4 keyframes' buttons in `#collapsed` | K-19, one stated contract |
| A-5 keyframes' click-free actuation | K-20 |

X-3 (the veil floor) retires with O-62 and F-23, not D2. X-6, X-9 (ring colour), X-10, X-13 and X-14 are public knobs or consumer paint that stay. X-13 and X-14 bind K-33 below.

### 6.4 The compact-on-scroll rung

| id | constraint |
|---|---|
| K-34 | **Opt-in, with an element or window source.** chicago and words scroll `window`; fourier scrolls `<main>` (`App.vue:66-67`); keyframes has no document scroll (`style.css:286-300`); value.js's band is in flow and scrolls away by a recorded decision (`shell.css:98-137`), with a banked re-probe once its routes grow. Default off. The source is a getter or an element (K-4) |
| K-35 | **It must work on a dock that never collapses and has no `#collapsed`.** The dock the owner names (M-5) and the likeliest second consumer (M-9) are both `:collapse="false"` with no collapsed face. So the compact rung cannot be "the collapsed face reached by scroll" unless the design requires a collapsed face (a consumer addendum for M-5 and M-9). It is a smaller rung of the expanded face or of its chrome |
| K-36 | **Engagement is hover (fine pointer only, F-77) ∪ focus-within ∪ any hold (K-7).** The reference releases 150 ms after the last input clears. Unlike the reference, a coarse touch must not latch hover |
| K-37 | **No layout feedback** (K-21) |
| K-38 | **At the top of the page, full size.** The owner's letter asks for it; the reference rests at 0.9475 unengaged. The letter binds |
| K-39 | **A rung, not a scale.** The owner's words and O-55 ("into its smaller rung past a threshold with hysteresis") ask for a state change with position hysteresis. The reference supplies only the gate. Position hysteresis on Safari cannot come from `timeline-trigger` or `scroll-state()`, both Chrome-only per W §0 rows 2-3 |
| K-40 | **Phone width.** The reference does not scale below 640 px. The dock's compact rung must be defined at 390 px, where M-9 already sheds labels (`style.css:113-122`) |
| K-41 | **Motion.** The reference runs bezier transitions (0.3 s / 0.2 s). The dock's rung rides a spring on its own clock (D-1, canon P1, P4), and PRM keeps the fade (P6) |

### 6.5 The rim and paint reach

| id | constraint |
|---|---|
| K-42 | No consumer mounts `ScrollProgressRim` or `useScrollChrome` today (0 hits across the four trees). Its first consumers are O-55 R-2's asks. It reads the same source as K-34: `<main>` for fourier, `window` for chicago |
| K-43 | The rim lies inside the silhouette in every rung (W-12), including a compact rung that K-35 defines without a collapsed face. On fourier's canvas docks, anything painted outside the dock box is clipped by consumer ancestors (K-16) |
| K-33 | Paint reach inside seats is partly consumer-authored: glass `scale-on-hover` (1.08) on a 40 px keyframes seat (1.6 px past each side), value.js's icon `scale(1.2)`, fourier's `.view-dot` at −3 px. A closed-form paint gutter must cover these or state its maximum as a consumer contract. A design whose port never clips paint needs neither |

## 7 · Which rows bite each PORTFOLIO family hardest

This is a map, not a verdict. Each family's pass-1 seat answers its rows.

| family | rows it must answer first | why |
|---|---|---|
| D2-A total lattice | K-11, K-12, K-14, K-3, K-33 | The aperture in §4 D2-A is symmetric about the centre, so it fails M-6. Undeclared-k seats: consumer seats at depth, compact seats of chosen width (X-10), glass `Button`s and text spans (§1.2). A consumer-set width cannot be closed-form. The gutter must cover consumer reach |
| D2-B measured scene | K-15, K-13, K-14, A-2 | Measured endpoints under ancestor transforms; content changes; the first endpoint against a fallback font |
| D2-C physical dock | K-17, K-12, K-22 | A transform track owns pan, and M-8 seats a scrubber; seats at depth; a row that fits must not move |
| D2-D drawn silhouette | K-5, K-43, K-11 | Collapsed faces wider than the circle, the rim on the path, and the path's origin on a right-anchored box |
| D2-E anchored projection | K-16, K-15 | Paint outside the port meets consumer clips and pass-through bands; anchors through transformed ancestors |
| D2-F discrete rungs | K-18, K-22, K-13 | Document View Transitions collide with keyframes'; the element-scoped kind is Chrome-only (W §0 row 7); a "More" seat must not pre-empt consumer breakpoints; content changes between rungs |

## 8 · Open, unmeasured

- **Real Safari**, every row: UNMEASURED (owner's safaridriver checkbox).
- **Stand-ins.** The scenes copy structure, not content. M-A and M-B use stand-in widths close to the real ones (a 32 px button plus a six-letter name; a 3rem bar plus a four-character metric). The consumers' served pages were not loaded, because each consumer runs its own session.
- **value.js on HEAD, end to end.** M-G shows two struck props. The full effect of repinning value.js to 10.0.1 (the `:collapse-delay` and `:start-collapsed` fall-throughs, and the 3,600 ms idle window replacing its 5,000 ms) was not driven.
- **Coarse-pointer consumer rows.** Every probe here used a fine pointer. W-3t and W-11 cover coarse taps on harness docks, not on these compositions.
- **words' resolved motion tokens** at its `^3.0.0` pin: not installed on disk.

## 9 · Sources read

- glass-ui (HEAD, `src/` identical to v10.0.1): `components/dock/GlassDock.vue`, `DockControl.vue`, `DockTrigger.vue`, `DockLayerGroup.vue`, `DockSeparator.vue`, `composables/{useDockShellProps,useDockState,useDockRun,dockContext}.ts`, `constants.ts`, `styles/{run,layers,morph,shape,dock,shell}.css`, `styles/controls/{icon-button,tab-button,triggers}.css`, `styles/utilities/{btn,base}.css`, `styles/tokens/{sizing,scale-paper,scheme-motion,scheme-spring}.css`, `components/popover/Popover.vue`; `docs/tranches/BL/design/dock/PORTFOLIO.md` §0-2; `BK/coordination/` O-55, O-56, O-63, O-64 and C-2; `design/dock/harness/{scenes,build,lib,adapter-head}.mjs` (read only; nothing reused except the shim's CSS text).
- value.js: `demo/shell/dock/{Dock,DockViewSelect,ActionBarToggle,ActionButton}.vue`, `layers/{ActionBarLayer,SlugEditLayer}.vue`, `menus/ProfileSection.vue`, `index.ts`, `demo/scenes/ConfigSliderPane.vue`, `demo/color-picker/App.vue`, `composables/boot/{useDockArrival.ts,overture.css}`, `demo/styles/{foundation,shell,animations}.css`, `demo/color-session/useContrastSafeColor.ts`, `e2e/smoke/fixtures/dock.ts`, `node_modules/@mkbabb/glass-ui` 7.0.0 `.d.ts` for the dock props.
- keyframes.js: `demo/app/dock/{ChromeDock,MbabbMenu}.vue`, `demo/app/App.vue`, `demo/app/main.ts`, `demo/app/transition/useSceneTransition.ts`, `demo/components/instrument/transport/TransportDock.vue`, `TransportDock/useMenubarMeasure.ts`, `demo/styles/{layout,style}.css`, `test/demo/app/chrome-dock-containment.test.ts`, `test/demo/instrument/transport-keyboard-propagation.test.ts`.
- fourier-analysis: `web/src/App.vue`, `components/layout/AppDock.vue`, `components/visualization/{CanvasControlsDock,EditorControlsDock,AnimationControls,VisualizationView,GlassTimeline}.vue`, `gallery/UserSlugBar.vue`, `web/e2e/*` (grep).
- chicago: `src/TempApp.vue`, `src/style.css`, `package.json`.
- words: `frontend/src/views/Home.vue`, `components/custom/search/{SearchBar.vue,composables/useSearchBarScroll.ts,composables/useSearchBarUI.ts,composables/useSearchBarBindings.ts,utils/scroll.ts}`, `assets/index.css`.
