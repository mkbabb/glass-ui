# glass.babb.dev: what the review exposed in the library

Design ruling, 2026-11-15. These are faults in `src/`, found while measuring the demo
(`../../audit/demo-site/TABLE.md`, glass-ui 11.0.2, master `e1aebc2d0`). They are listed apart so
the demo rebuild does not hide them: the demo is rebuilt to pass its own checks on the library as
it stands on master, and each fault below is cured in the library, in the release named.

Two releases are named:

- **Patch**: the next patch after 11.1.1 (11.1.2 as its scope stands today; the release seat
  renumbers if that scope is closed). A patch carries a fix that removes no public name and adds
  none.
- **11.2.0**: the dock redesign and anything that adds, removes or re-defaults public surface.

Every line was measured on 11.0.2. `release/11.1.0` changes the dock's default corner; a release
seat re-reads each dock row on that branch before scheduling it.

## The faults

| # | Fault | Where | Measured | Cure | Release |
|---|---|---|---|---|---|
| F1 | A dock whose run overflows loses its end corners. The owner: "docks should almost always be rounded, some are not in some cases" | `src/components/dock/styles/run.css:653` (`--dock-cap-cut: var(--radius-card)`), `:671-672` (the card shape's cut), keyframes `:813-815`, `:879-900` | 14 docks on 6 routes: 28,16,16,28 against a stadium's 28; at 390 the cut reaches both ends | The end corner stays at the stadium whether or not the run overflows. The fade mask alone says there is more to scroll | **Patch** |
| F2 | The scroll-chrome recipe paints a shadow on a box with no radius and no plate. The owner: "scroll header not rounded" | `src/styles/scroll-chrome.css:86-95` | a square shadow band under the demo's page header, at rest (6 %) and collapsed | No shadow at rest; the shadow follows a radius the recipe owns (`--chrome-radius`), and the recipe ships a plate or says it needs one. The demo stops using the recipe (`FORM.md` section 3) | **Patch** |
| F3 | Muted ink in light is under AA | `src/styles/tokens/color-radius.css:91` (`--muted-foreground: var(--neutral-5)`) | 4.36:1 median on warm cream; 2.9 to 3.95:1 on tinted glass; 477 of the 812 low runs in light, on 88 routes | Muted ink reaches 4.5:1 on cream and on the resting glass tint: take the rung above (`--neutral-6` is 7.89:1) or a rung between | **Patch** |
| F4a | Disabled button ink | `src/components/button/styles.css:272-274` (`--button-ink` at `--opacity-disabled`, 0.5) | 3.8 to 4.3:1 dark, 2.9 to 3.3:1 light | A disabled label holds at least 3:1 on its own plate in both themes, and the rule is written down (WCAG exempts disabled text; the owner called the page unreadable) | **Patch** |
| F4b | Destructive button text in light | `src/components/button/styles.css`, the destructive tone on the quiet and text emphases | 2.3:1 | at least 4.5:1 | **Patch** |
| F5 | The configurator's stacked editor has no minimum height, and its gallery row has no maximum | `src/components/configurator/styles.css:317-322` (rows `auto / minmax(stage-min, auto) / minmax(0, 1fr)`), `:355-362` (the wide arm's gallery row inside the same envelope) | editor 308×1 on Aurora at 390; 572×9 at 1440 and 308×19 at 390 on the Configurator's own page | The aside row gets a floor (18rem, as `--configurator-aside-min-block`) and the shell a matching minimum block size; the gallery row gets a cap (6rem, as `--configurator-gallery-max-block`) with sideways scroll | **Patch** |
| F6 | The dock's resting plate is too thin to read over content. The owner: "why is this dock so transparent" | `src/components/dock/styles/dock.css:118-124`; the tiers at `src/components/dock/styles/shell.css:147-148` (collapsed: the wash rung; expanded: the dock rung) | `rgba(…, 0.14)` dark, `0.10` light, on every dock on the site | The dock's default plate is decided with its redesign: firm enough that its ink holds 4.5:1 over any content, without an app setting a tier. Two apps already raise it by hand. The demo's pager dock raises it through the tier variables until then, and that override is deleted with this cure | **11.2.0** |
| F7 | `GlassDock` still offers shapes that are not a pill | `shape="rounded"` and `shape="card"` (`run.css:666-673`) | 16 px corners on 64 px rails; no app passes either | Remove the `shape` prop. The demo stops passing it now | **11.2.0** |
| F8 | A dock that starts closed parks its controls until a hover dwell, which is why the demo's own navigation pinned itself open. The owner: "both docks do not have collapse states nor do they animate" | the collapse and hover hold in `src/components/dock/` (`GlassDock.vue:85-86` defaults; `useDockState`) | 15 of 29 app docks pin `:collapse="false"`; the demo retired its collapse for the same reason (`demo/shell/SidebarDock.vue:58-65`) | The 11.2.0 collapse member (`hover` with a dwell and a leave grace, `press`, `room`, `scroll`) in `../../audit/dock-usage/COMPOSITIONS.md`; overlays opened from a seat hold the dock by themselves | **11.2.0** |
| F9 | The dock search composable accepts something that is not an element and throws. The owner's dock page | `useDockState({ rootEl })` given a component instance (`demo/stories/dock/dock-search.vue:107-109`, `:179-180`): `TypeError: e.addEventListener is not a function` | the one console error on the site | The mistake is the demo's and the page is cut. In the library, `useDockSearch` and the `#search` slot are used by no app and are deleted | **11.2.0** |
| F10 | Dark first paint is black. The owner: "flash black" | `src/composables/dark/darkModeSyncScript.ts:162` writes `color-scheme` with no background; the dark floor is `--neutral-0: hsl(24 9% 4%)` (`src/styles/tokens/dark-arm.css:56`); the aurora's ground is computed in script (`src/components/aurora/Aurora.vue:215-216`) and its canvas fades from 0 (`:374-386`) | near-black frames until 187 to 373 ms on all 92 dark cold loads | The head script takes an optional ground colour and writes it beside `color-scheme`; the aurora's fallback ground is available as a plain colour a consumer can put in its head. The demo paints its ground from its own stamp plugin now and does not wait | **11.2.0** (new option) |
| F11 | The card radius reads small on a large card. The owner: "these card items should be more rounded" | `src/styles/theme/radius.css:134` (`--radius-card: var(--radius-2xl)`, 16 px) | 16 px on a 355 px card | Undecided: the demo's cards move to the 24 px rung (`--radius-3xl`) now. Whether `--radius-card` itself rises is the owner's question 4 | **11.2.0**, if he says yes |

## What is not the library's

Recorded so nobody files it against `src/`:

- Both "unreadable" pages are layout: viewport-keyed grids inside a 410 px column
  (`demo/stories/foundations/paper-glass.vue:135`, `demo/stories/display/buttons.vue:28`).
- The dock section's prose at 2.0 to 2.3:1 is prose placed on an aurora field
  (`demo/stories/dock/_frame/DockStage.vue:125-131`), not a token.
- The title crossing its lede (`demo/chassis/hero/story-hero.css:106-181`).
- The clip above the pager dock (`demo/shell/dock-nav.css:44-52`).
- The blurred substrate card (`demo/chassis/landing/vizPreviewStill.ts:59-60`).
- The docks at 16 px on `/dock/vertical` and `/dock/layers` are the demo passing `shape="rounded"`;
  the prop's existence is F7.

## How the demo avoids hiding these faults

- No demo packet changes a file under `src/`.
- The demo overrides library styling in exactly one place: the pager dock's plate tier (F6). It is
  marked in the source with this file's row and deleted when F6 lands.
- The demo's own text (headers, variant labels) is set in `--foreground`, so its contrast check
  does not depend on F3. Low-contrast runs inside library components are reported against the
  library row, never recoloured locally.
- Where a dock overflows in the demo, the cure is to give it room, not to restyle its corner. A
  dock that still measures a cut corner after that is F1, reported and left.
- After each library release, the reviewing seat re-runs the page checklist in light and removes
  the matching exception from the packet records.
