# Dock cluster · pass 2 challenge, round 3

| field | value |
|---|---|
| seat | a fresh adversarial challenger, pass 2 round 3. I wrote nothing else in `design/dock-cluster/` |
| model | `claude-opus-5-5`, asserted from own system identity |
| read | W-I.8 as it stands on disk, `pass2-build.md`, `pass2-challenge-1.md`, `pass2-challenge-2.md`, `pass2-fold-1.md`, `pass2-fold-2.md`, `fold.md`, both orchestrator notes, `docs/precepts/restraint.md`, `pass2/prototype.patch` (fold 2's build) and fold 2's fixture and probe. Glass's own overlay and dock-state code: `useDockState.ts` (`onMouseLeave`, `onFocusOut`, the click-away), `_shared/overlay/isTeleportedTarget.ts` and `participation.ts`, `TooltipContent`, `DropdownMenuContent`, `SelectContent`, `Popover`. Daraksha `o1109-dock` at `1fd1266` (`SiteDock.vue`, `ThemeControl.vue`) and value.js `demo/shell/dock/` (`Dock.vue`, `DockViewSelect.vue`), read-only |
| base | master `8c2d7768c`. Scratch worktree `.claude/worktrees/bl/cluster/pass2-challenge-3` with `pass2/prototype.patch` applied (clean), removed after this record was written |
| fixture | `pass2-challenge-3/fixture/` is fold 2's fixture plus `menu=1` (a `DockTrigger for="dropdown"` "More" in the pages face, opening glass's own `DropdownMenu`, with no consumer hold) and `tip=1` (every page seat wrapped in daraksha's `Tooltip` / `TooltipTrigger as-child` / `TooltipContent side="top"`). The app sits in a `TooltipProvider` (delay 200 ms) |
| harness | `pass2-challenge-3/tools/c3.mjs`: real clock, real pointer, real taps. Parts `overlay`, `touch`, `forced` and `kbmenu`. `tools/forced-attr.mjs` lists every bordered element under forced colors. Runners: `run-c3.sh`, `run-c3b.sh` and `run-c3cure.sh` |
| engines | headless Chromium 149 (Playwright headless shell) and Playwright WebKit 26.5, guarded, one browser per run and a new context per cell. WebKit runs under `--exclusive webkit`. Builds run under `guarded --light` |
| records | `pass2-challenge-3/data/`, `logs/` and `png/`. When a part errored in WebKit (see §W), its per-cell lines are in `logs/webkit-*.log` and not in the JSON |

## Verdict

Three findings stand. Each is demonstrated against the 11.0.0 composition on the same build, and each sits in the R-13 hold or the cluster's paint, not in GlassDock.

- **C3-1 (blocks the wave), both engines.** When the reader moves the pointer from the dock into an overlay the dock opened, the dock collapses about 3.6 s later and the overlay goes with it. The overlay is glass's own portalled DropdownMenu, or daraksha's real seat Tooltip. A lone 11.0.0 dock holds through 8 s.
- **C3-2 (blocks the wave), both engines.** On a touch screen, after a tap on the theme, a tap away does not close the dock. 11.0.0 closes within 500 ms.
- **C3-3, Chromium (forced colors).** The fused silhouette has no edge. The reader sees two separate box outlines with a gap between them, and when collapsed, the dock's outline is a broken half-arc.

A cure sketch for C3-1 and C3-2 (10 lines in `DockCluster.vue`) turns both GREEN in both engines (§Cure). I could not refute the seam, the capsule, the swap, PRM or restraint, and I did not re-measure them: the earlier rounds' reads stand, and my cells did not touch their code paths. See "Not demonstrated" below.

## C3-1 · A leave into the dock's own overlay releases the hold, and the dock collapses under the reader (R-13)

A lone GlassDock does not collapse when the pointer or focus moves into one of its own portalled overlays. `useDockState.onMouseLeave(e)` and `onFocusOut(e)` return when `isTeleportedTarget(e.relatedTarget, dockId)` is true. That is the stamp contract, and the dock relies on it for every overlay that takes no hold: TooltipContent ("the hint takes no HOLD … only the stamp"), DropdownMenuContent, SelectContent, CommandList, and a Popover without `keepDockOpen`.

The cluster's R-13 hold breaks that contract in two places:

- `onPointerLeave()` clears the hold whatever the `relatedTarget`.
- On release, each member's `leave()` runs `onMouseLeave()` with **no event**, so the teleport guard is never reached and `scheduleCollapse()` runs.

`onFocusOut` has the same gap for focus that moves into a portalled menu.

Cell `overlay`: `bind=1`, real clock. The pointer reaches the dock and waits 1.3 s, so the dock expands and the theme fissions out. It then moves to "More" and clicks (menu), or rests on "Colour" (tooltip). It moves onto the first menu item or onto the tooltip, rests there, and is sampled every 500 ms for 8 s:

| composition, cell | Chromium 1440 / 390 | WebKit 1440 |
|---|---|---|
| cluster, stage, menu | **collapsed at 4.0 s; menu closed at 4.0 s**, the pointer then on bare page (`MAIN`) / the same | **collapsed at 3.5 s; menu closed at 4.0 s** |
| cluster, `.site-dock`, menu | **4.0 s; closed 4.0 s** / the same | **3.5 s; closed 4.0 s** |
| cluster, stage, tooltip (daraksha's seat) | **collapsed at 4.0 s**; the tooltip stays open, detached from its now-inert seat, and the pointer is over bare page from 5.0 s / the same | **4.0 s**, the same |
| cluster, `.site-dock`, tooltip | **4.0 s** / the same | **3.5 s** |
| 11.0.0 (`nocluster=1`), menu | expanded through 8 s, the pointer on "Share" in every sample, menu open / the same | crashed at `goto` (§W) |
| 11.0.0, tooltip | expanded through 8 s, tooltip open, pointer on it / the same | crashed at `goto` (§W) |

Data: `data/chromium-c3.json` (`cells.overlay`), `logs/webkit-c3b.log`. The WebKit menu opens by click in `c3b` (in `c3` the probe found no overlay after the click, and `c3b` adds an Enter fallback that was not needed). Capture: `png/chromium-c3-overlay-after-menu-1440-t4500.png`.

The collapse is the same 3.6 s `DOCK_COLLAPSE_DELAY_MS` that D1 cured for a leave to the page. It hits overlays the reader is actively using. Since the collapse closes a face-opened menu (`useDockParticipation`'s `close`), the reader loses the menu mid-choice. Two real consumers are affected:

- **Daraksha.** Every page seat and the khatam carry a Tooltip in `o1109-dock`. A reader who moves onto a hint sees the dock fold and the theme fuse back under it.
- **Any glass consumer of the README's contract** ("Portaled dropdowns, selects, and popovers keep the dock open … and retain their own focus and dismissal semantics"). Value is shielded only because its `Dock.vue` takes its own `keepOpen` while a popup is open.

I8-G19 has no cell with an overlay.

## C3-2 · On touch, after a tap on the theme, a tap away does not close the dock (R-13)

On a touch tap, the engine sends `pointerenter … pointerup, pointerleave` first and the compatibility `mousedown`/focus after. GlassDock's run focuses on press. So the cluster's `pointerleave` runs before the focus, and the `focusin` that follows sets `focusIn` with no later `pointerleave` to clear it. The hold stays on. The tap away's `pointerdown` then reaches each member's click-away while `keepOpenCount > 0`, and the click-away is suppressed. A tap pins the dock (`onClickCollapsed`), and a pinned dock only closes on a click-away. So nothing closes it.

Cell `touch`: `hasTouch` (Chromium also sets `isMobile`), `bind=1`. The sequence taps the collapsed dock, then the theme (it is fissioned out), then the bare page at (w/2, 30), sampled every 500 ms for 7 s:

| composition, sequence | Chromium 1440 / 390 | WebKit 1440 |
|---|---|---|
| cluster, stage: dock, theme, away | **expanded through 7 s** (focus to body in Chromium) / the same | **expanded through 7 s**, focus stays on "Dark theme" |
| cluster, `.site-dock`: dock, theme, away | **expanded through 7 s** / the same | **expanded through 7 s** |
| cluster: dock, away (no theme tap) | collapsed at 0.5 s / the same | 0.5 s |
| 11.0.0: dock, theme, away | collapsed at 0.5 s / the same | crashed at `goto` (§W) |
| 11.0.0: dock, away | 0.5 s / the same | crashed at `goto` |

Data: `data/chromium-c3.json` (`cells.touch`), `logs/webkit-c3.log` and `logs/webkit-c3b.log`. This is the case the fission exists for. On daraksha's phone row the khatam is the tap the reader makes most, and after it the dock stays open over the page until a second tap away. fold 2's D1 cure reads the pointer's leave, and a touch has no leave after its focus. I8-G19's click-and-leave arm uses a mouse only.

## C3-3 · Under forced colors the fused plate has no edge, and the members' boxes show as two plates (R-1)

Forced colors (Windows High Contrast) drop `backdrop-filter`, backgrounds and shadows. The skin in `a11y-fallback.css` restores structure through real borders. Inside a cluster:

- the painter's plate has `border: 0` (`cluster.css`);
- the rim is a `background` on `::before`, which forced colors repaint to `Canvas`;
- the shadow is a background fill.

So the silhouette draws nothing. What does draw is each member's `.glass-dock` **box** border (1 px `CanvasText`, `border-radius` 16 px; the collapsed dock's box is a 58 × 58 square at `50%`). The morph clip cuts it as well.

`tools/forced-attr.mjs`, Chromium `forcedColors: "active"`, flat field, 1440 (`data/chromium-forced-attr.json`):

| | bordered elements | paint |
|---|---|---|
| cluster, collapsed (fused) | dock box 58 × 58 (50 %), theme box 66 × 58 (16 px), both 1 px `rgb(0,0,0)`; plate `0px none` | the dock's outline is a **half-arc open on its right**, with a **gap**, then a separate rounded square for the theme. No fused shape at all (`png/chromium-c3-forced-after-light-collapsed-1440.png`) |
| cluster, expanded (split) | dock box 204 × 58, theme box 66 × 58, 16 px | two rounded rects, with a **notch** in the dock's right edge at mid-height (`…-after-light-expanded-1440.png`) |
| 11.0.0 lone dock | box and plate both 1 px, 16 px | one closed outline (`…-before-light-expanded-1440.png`) |

The same holds in dark, at 390 and in `.site-dock` (`cells.forced`, 32 cluster cells). This is Chromium only: WebKit has no forced-colors mode, so this is not a Safari risk, but it is an accessibility regression against the lone dock. The cure belongs in the a11y skin: inside a cluster under `forced-colors`, the painter's ring (`--dock-ring-clip`) paints `CanvasText` with `forced-color-adjust: none` on that pseudo only, and the member box borders stand down. I did not build or measure this cure.

## Cure sketch (C3-1, C3-2), measured

`prototype-plus-cure.patch` is `pass2/prototype.patch` with these changes to `DockCluster.vue` only:

- `onPointerLeave(e)` returns when `isTeleportedTarget(e.relatedTarget)`.
- `onFocusOut` returns on the same test.
- A capture `pointerdown` on `document` ends the hold first (`pointerIn = focusIn = false; syncHold()`) for any press outside the root and its overlays, so each member's own click-away runs as it does alone.

The sketch uses the unscoped `isTeleportedTarget(target)`. The wave should scope it to a member's `dockId`.

| cell (`data/chromium-cure.json`, `logs/webkit-cure.log`) | Chromium 1440 / 390 | WebKit 1440 |
|---|---|---|
| cluster, stage and `.site-dock`, menu | expanded and menu open through 8 s, pointer on "Share" | the same |
| cluster, stage and `.site-dock`, tooltip | expanded and tooltip open through 8 s | the same |
| cluster, stage and `.site-dock`: dock, theme, away | collapsed at 0.5 s | 0.5 s |
| cluster: dock, away | 0.5 s | 0.5 s |

I did not re-run fold 2's `clickhold` (D1) or I8-G19's earlier arms on the cure build. The pointer-to-page leave path is unchanged by it, and both must be read at landing.

## §W · WebKit

Every page of the 11.0.0 composition (`nocluster=1`) in this fixture crashed WebKit at `page.goto` ("Page crashed") in all three runs (`c3`, `c3b`, `cure`). Each crash aborted the rest of its part, so WebKit's overlay and touch cells ran at 1440 only, and its 11.0.0 controls are missing. The cluster pages, in the same runs and browser, loaded and ran. Fold 2's fixture ran the 11.0.0 composition in WebKit, so the crash is likely from this fixture's additions (the `TooltipProvider` wrapper, which now covers every page). I did not isolate it. The 11.0.0 side of C3-1 and C3-2 therefore rests on Chromium, plus GlassDock's own code path, which is the same in both engines: the teleport guard in `onMouseLeave` and `onFocusOut`, and the click-away gated by `keepOpenCount`. The cluster's own failure is demonstrated in WebKit cell by cell.

## Not demonstrated (tried, inconclusive)

- **The keyboard-only menu reader (`kbmenu`).** I meant to show C3-1 by focus alone: Tab in, Enter on "More", focus moves into the menu. In the cluster, the first Tab stop is the collapsed summary ("Name: open the dock"). The dock had not expanded 900 ms later, so focusing "More" failed and no menu opened. In 11.0.0 the first stop is the theme in `#persistent`, and the dock expands. The two compositions start the walk on different elements, so the cells are not comparable, and I record no finding. The same `onFocusOut` gap is in the code, and the cure covers it, but this record does not demonstrate it in paint.
- **Not re-run:** the fractional-ratio seam, the capsule in every frame, the swap and its interrupts, PRM (O-198's ≤ 144 ms arm, RED until L5 by the record), the shade/restraint read, and value's collapsible dock. Fold 2's and challenge 2's reads stand. My cells change no paint path: the cure touches only the hold.
