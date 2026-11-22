# The step-10 messages, checked at each site's current ref

Seat: claude-opus-5-5 (asserted from its own system identity), 2026-11-22. Read-only: `git show`, `git grep` and `git log` in each site's repo, no checkout, no fetch, no build, no browser; gregg read as a working tree (it has no commits). Source: RULINGS-8's "The step-10 messages (final)", its owner questions and ready list, and `audit/dock-usage/USAGE.md`. Glass-side figures in the drafts (fills, plate shares, blur, bytes, the harness readings) are RULINGS-8's and were not re-read; claims about each site's tree were. Where a site's default branch is months stale, the ref read is its newest working ref, and both are named.

One change runs through several drafts. Every published glass-ui from 10.1.0 to 11.1.0 sets `--dock-icon-glyph-ratio: 0.5`; the branch sets 0.9 (`src/styles/tokens/sizing.css:179`), and re-resolves `--dock-icon-glyph` on `.glass-dock` (`density.css:220`). A site whose own glyph rules read `--dock-icon-glyph`, or whose dock icons carry no size, sees them nearly double. The atlas, fourier and slides drafts said so; the speedtest, Home Assistant, gregg, daraksha and keyframes drafts did not, and each of those sites has such icons. value.js and gaggle size every dock icon themselves and get no line.

---

## atlas

**Ref read.** `u/o18-atlas` `f79d949` (2026-11-22), the newest atlas ref. The default branch, `origin/master` `e46ec71` (2026-07-16), pins glass-ui 6.0.0 and holds none of these docks. glass-ui at `f79d949`: `package.json:118` `^10.1.0`, `:147` `10.1.0`; `package-lock.json` resolves 10.1.0.

Hi,

Here's what glass-ui 11.2.0 changes in the docks atlas mounts, and one placement I'd like your view on before we suggest it.

- **From your version.** atlas is on 10.1, so moving to 11.2.0 also brings 11.0's and 11.1's changes, which their notes cover. For the docks the main ones are these: the current page's mark glides between buttons, a progress rim rides the plate's edge, and always-shown buttons form the folded face. Pressing one of those and then moving off the dock folds it straight away; under a held finger the fold now waits for the lift.
- **The plate.** A one-row dock rests as a fully rounded capsule, and a dock taller than one row keeps 11.1.0's corners. Your docks are static, so each plate stays an opaque card in both themes; the firmer dark plate the other sites get doesn't reach them.
- **Card and rounded docks.** Nothing in the dock is scaled mid-movement any more, so a `shape="card"` or `shape="rounded"` dock keeps one corner in every frame of a fold and an open. Folded, both now become a circle, its radius half its side, as your corner reading expected; one with an always-shown button beside its icon folds to a short bar and keeps 16 px corners, as before; open, they keep their corners. That covers both halves of the reading, so they're ready whenever you want them.
- **Button fills.** Hovered and current buttons are light steps of the dock's own text colour: 5 % on hover (5 to 6.5 % in dark), and 10 % for the current button in light, with the dark figure between 10 and 14 %, which I'll send with the release. A press adds 2 % over whatever the button already shows, and under a finger it starts from the hover step, so a tap looks like a click. The small highlight that followed the pointer over a button is gone. If you set `--dock-control-hover-bg` or `--dock-control-active-bg`, please set them on the dock itself; an override higher up the page no longer reaches inside one.
- **Icons.** An icon you haven't sized fills nine tenths of its button, where 10.1 draws it at half, and so does a folded face's own icon. Anything you size yourself keeps your size, so PlateDock's More handle keeps the 18 px its `.plate-dock__handle` rule gives the ellipsis, and stays smaller than the Table icon beside it until that rule goes.
- **Heights.** Every button in a dock is the dock's control height, tabs included. Yours stay 44 px at every pointer: the rail and the phone bar set `--dock-control-size` to 2.75rem themselves, and the figure docks take it from `data-preset="cockpit"`. A trigger anywhere in the dock, the always-shown ends included, is at least one button square, and its label and chevron draw at full strength.
- **Segmented controls.** A `SegmentedTabs` inside a dock no longer draws a channel of its own. Your dials open theirs in a popover, outside the dock, so nothing changes for them.
- **The theme toggle** in the rail and the phone bar now draws at full strength rather than slightly dimmed, and its hover is the dock's own. Nothing to change on your side.
- **The controls preset** folds at every width once it holds two or more controls, about 3 s after the pointer leaves; with one control it's just that control. Its icons are the normal size, half the button, to match the top-right controls bar now set for every app. We tried PlateDock on it inside one of your 375 px figure plates, in both themes, with mouse and touch. In PlateDock's own seat the open dock came out broken. The 44 px seat left it only 28 px, so both buttons sat outside it. That one is ours: the preset should grow out of a parent narrower than its buttons, away from its corner, and I'll tell you once it does. In the head row it works, and covers part of the title (1,500 px² of the title's box folded, 2,400 open). Nothing beside it moves in either place. The preset always sits at a corner, so a PlateDock on it would leave the head row it stands in today. Which placement would you want before we suggest the move? It would also cover the figure docks sci-report shows.
- **Mounting.** A dock no longer lays out the page while it mounts: its first measurement moves to its first frame. We're measuring what a page of many docks pays in that frame, and I'll send the figure with the release.
- **Folding and opening.** While a dock folds or opens, its root carries `data-morphing`. The README now names it as the signal to read, so your own checks can rely on it.
- **Overlays.** Menus, popovers, dialogs and sheets opened from a dock button hold the dock open with nothing to wire, so the hold PlateDock takes while Options or Download is open can go. A press on a dialog's or a sheet's dimmed backdrop closes it, and the dock then stays open for its usual pause.
- **In-flow docks.** The overlay that would let an in-flow dock open without pushing its row covers part of a figure's legend, its link included, while the dock stays open, so it's waiting on a decision. Until then an in-flow dock still pushes its row (36 px in your figure header) and `anchor` still does nothing, so please keep your own layout hold. I'll tell you before the release if that changes.
- **Progress rims.** The dock's new `#rim` slot takes a progress rim and follows the plate's outline in every frame, so the `DockProgressRim` in the rail's and the phone bar's `#persistent` could move into it.
- **Search.** The dock's search helper and its `#search` slot are deleted in 11.2.0 unless the owner keeps them; no released site used them. Your search can stay a command dialog, which ranks its own rows once 11.1.2 lands.
- **Unchanged for you.** `run="plain"` stays as you use it. The `:hover-intent` PlateDock passes isn't a dock prop and does nothing; the pause before a hover opens the dock is the `--dock-intent` token. The scroll fold moved to 11.3.0, so your own scroll rule stays for now.

Thanks,
Mike

**Changed, and why**
- *Icons.* "PlateDock's folded sliders icon" is not in the tree: PlateDock's `#collapsed` is the More handle, an `Ellipsis` in `span.plate-dock__handle` (`src/charts/frame/PlateDock.vue:409-412`), sized 1.125rem by `.plate-dock__handle :deep(svg)` (`:595`), a scoped rule rather than a class. Added "where 10.1 draws it at half" (ratio 0.5 in v10.1.0).
- *Heights.* "40 px on desktop and 44 on touch" does not hold for atlas: `.usf-dock` sets `--dock-control-size: 2.75rem` for the rail and the bar (`Dock.css:18`), and the three figure docks are cockpit docks (`PlateDock.vue:359`, `PlateControls.vue:156`, `StickyScene.vue:159`), whose control is 2.75rem (`density.css:139-149` on the branch). No atlas dock has a tab seat.
- *Theme toggle.* Added: `DockThemeToggle` mounts `DarkModeToggle size="dock"` in the rail's `#persistent-end` (`Dock.vue:603`) and the bar's (`:675`), with no opacity or hover override; the 0.8 is in every published toggle (`dark-mode-toggle.css:16`) and goes in 11.2.0.
- *Overlays.* Added the deletable hold: `PlateDock.vue:270-273` keeps the dock open while its Options or Download popover is open; both are glass `Popover`s inside the `GlassDock`, and the branch's `Popover` holds while open (`Popover.vue:98-102`). PlateDock's press pin (`:98-110`) is a different hold and is not named.
- Held at `f79d949`: all five docks `backdrop-mode="static"`; no `shape` but `pill`; neither fill token set in `src`; `SegmentedTabs` only inside `PopoverContent` (`PlateDial.vue:205`, `VizOptionsBand.vue` in PlateDock's `options` slot); `DockProgressRim` in both `#persistent` slots; `DockSearch` opens a glass `CommandDialog` (`DockSearchPalette.vue`); `run="plain"` and `:hover-intent` at `PlateDock.vue:353-354`; the `scroll` collapse source (`useDockCollapse.ts:29`); `[data-morphing]` read in `Dock.css:137-148`; the seat holding the rest width (`PlateDock.vue:115-144`).

---

## fourier

**Ref read.** `origin/master` `266bd67` (2026-11-21), the default branch and the newest ref. glass-ui: `web/package.json:22` `11.1.0`; `web/package-lock.json` resolves 11.1.0.

Hi,

Here's what 11.2.0 lets fourier delete, and what to keep.

- The scroll fold moved to 11.3.0, so please keep folding the app dock on scroll in your own code for this release.
- Three lines that set `--dock-trigger-min-height: var(--dock-control-size)` can go: `AppDock.vue:564`, `StageDock.vue:130` and `AnimationControls.vue:437` (whose comment expects this in 11.1.2). A trigger anywhere in a dock, the always-shown ends included, is now at least one button square, so your trigger-width check should pass on 11.2.0: 44 px at 390, where it reads 38 today.
- The `keepOpen()` and `release()` calls around your menus can go too, in `AppDock.vue`, `UserSlugBar.vue` and `AnimationControls.vue`. A menu, popover, dialog or sheet opened from a dock button holds the dock on its own, and a press on a dialog's dimmed backdrop closes the dialog while the dock stays open for its pause. The `keep-dock-open` on your three Popovers no longer does anything and can go with them.
- `StageDock.vue` can give way to the controls preset, as its header says it will. One `ControlsDock` with `corner="top-end"` and `within="parent"`, passing `expand-on="press"` through, replaces its two `GlassDock`s; the folded icon stays in `#collapsed` and Edit contour in `#persistent-end`. If the stage card scrolls with the page, `within="viewport"` keeps the bar still, as the top-bar rules ask; `within="parent"` keeps it at the card's corner, moving with the card. Its `fold` prop goes, since the preset is the one control when it holds one and folds at every width once it holds two or more. The counted hold and the collapse after an outside press within 600 ms (lines 45 to 76) go as well. The phone column stays yours, as an `orientation` you pass. The preset's icons are the normal size, half the button, as the top-right bar asks; the app dock keeps its larger icons.
- `EditorControlsDock` now never folds, so it's best left a `GlassDock`: the preset folds once it holds two or more controls.
- The `ScrollProgressRim` you teleport into the app dock can sit in the dock's new `#rim` slot and follow the plate's outline in every frame.
- On a phone a tap on the dock no longer pins it open: it folds 6 s after the tap, and 6 s after a tap on one of its buttons. 11.2.0's fit rule cures the 4 to 8 px overflow of the dock's row on a phone.
- **The look.** In dark the plate is firmer: about 43 % of it is the card colour, where 11.1.0's is 18 %, so on a warm dark page it stands about 1.4 to 1 off the page instead of about 1 to 1, and the page still shows through it. It also blurs a little less, about 11 px against 16; I'll confirm the figure. Light takes one more step of ink, a shade greyer on a white page. Hovered buttons are 5 % of the dock's text colour (5 to 6.5 % in dark) and the current one 10 % (dark between 10 and 14 %, the final figure with the release), and the small highlight that followed the pointer is gone. In the stage, animation and editor docks an unsized icon fills nine tenths of its button, where 11.1.0 draws it at half, and your glyph rules there that read `--dock-icon-glyph` follow it; the app dock keeps the 24 px your `--dock-icon-glyph` on `.app-dock` sets. Your phone stage plate is a card-shaped dock that never folds, so the new folded circle doesn't touch it.

Thanks,
Mike

**Changed, and why**
- *Holds.* Named the three files that hold (`AppDock.vue:328-331`, `UserSlugBar.vue:29-30`, `AnimationControls.vue:117-118`) and added `keep-dock-open`, which the branch no longer reads (`Popover.vue:24-26`): `AppDock.vue:467`, `UserSlugBar.vue:287`, `EquationTools.vue:63`.
- *Controls and Canvas.* Dropped. No `SegmentedTabs` sits in a fourier dock at `266bd67` (the two in `web/src` are `EquationView`'s mode toggle and `GalleryView`); the phone's pane switch is one `DockControl` toggle in the app dock's `#persistent-end` (`AppDock.vue:509-518`).
- *EditorControlsDock.* The suggestion's premise is gone: the dock is `:collapse="false"` and "Nothing folds" (`EditorControlsDock.vue:83-92`), and the point count moved into the menu's Simplify row, "nothing in the dock is a readout" (`:146-153`). It now matches the keyframes RibbonBar case, so the line says to keep it a `GlassDock`.
- *The look.* "An unsized icon in the app dock fills nine tenths" does not hold: `.app-dock` sets `--dock-icon-glyph: var(--icon-xl)` (`AppDock.vue:565`), unlayered on the dock's own root, so it wins over the library's layered re-resolve and the app dock's icons stay 24 px. Dropped "tabs grow to the button height": no fourier dock has a `shape="tab"` seat.
- Held at `266bd67`: the scroll fold (`AppDock.vue:315-319`); the three trigger lines at the cited numbers, and `AnimationControls.vue:434`'s "booked for glass 11.1.2"; the `TRIGGER-CELL-WIDTH` check (`web/e2e/o41-stage-dock.spec.ts:135`); `StageDock.vue` (132 lines): its header, two `GlassDock`s, the hold and the 600 ms collapse at 45-76, the column `orientation`; the teleported `ScrollProgressRim` (`AppDock.vue:528-530`); `AnimationControls.vue:289` `shape="card"` with `:collapse="false"`.

---

## Home Assistant

**Ref read.** `apx/ui-r13` `ce9eddf6` (2026-11-22), the UI branch this draft addresses and the tree the fold read. The default branch `master` `187f2c54` (2026-11-22) carries the deployed house from `c9432a83` and does not contain r13; its dock still does not fold (`GlassTabs.ts:370` `collapse: false`). glass-ui on both: `frontend/package.json` `11.1.0`; `frontend/package-lock.json` resolves 11.1.0.

Hi,

Several changes in 11.2.0 touch the Home Assistant dock, a few of your lines can go, and one item has moved to a later release.

- **The worded tab's icon.** A tab button sizes the `svg` that's its direct child at one and a half times the word, and your tab icons are svgs (`tabIcon` in `frontend/src/tiles/tabs.ts`), so there's nothing to mark. Your kit's icon base in `tiles/css/marks.css` is unlayered and still wins over the library's layered rule, as your note in `tiles/css/tabs.css` says of the icon buttons, so a worded tab's icon stays at the kit's size unless `.shell-dock .dock-tab-button > .glyph` takes `1.5em` beside that line, with `> .dock-mark > .glyph` for Home's, whose icon sits in its mark's box. The floor icons in the floor menu sit in menu rows, which the dock doesn't size.
- **The glyph seats.** Your rules in `tiles/css/tabs.css` size a wordless tab's icon, the Home mark's and the folded face's by the library's `--dock-icon-glyph`. In 11.2.0 that token is nine tenths of the button, where 11.1.0's is half, so those icons grow from 20 px to about 36 in a 40 px button. Setting `--dock-icon-glyph-ratio: 0.5` on `.shell-dock` keeps today's size if you'd prefer it.
- **The faces.** The note in `tiles/dock_parts.ts` expects 11.2.0 to size the faces you mark `data-dock-glyph`. That attribute didn't stay in 11.2.0: a dock button sizes only a direct `svg`, `img` or `picture`, so your faces keep the size `Face` and `Avatar` give them, and the attribute can come off. The faces seat stays shown when the dock folds; as in 11.1.0, pressing it and moving off the dock folds the dock straight away, and under a held finger the fold now waits for the lift.
- **Tab height.** Your worded tabs grow to the button height, 40 px on desktop and 44 on touch, where they measure 38 today. Since round 12 you no longer set your own `--dock-tab-h`, so the new default reaches them; setting it again keeps your height if you'd prefer.
- **The current tab from 600 to 1023 px.** `--dock-open-pitches` and `--dock-open-seat` in `tiles/css/tabs.css` do nothing in 11.2.0, since there's no widened current tab any more. The current worded tab sizes to its word at every width, and the tabs beside it glide over when it changes. That's the ask you sent on 21 November, that a row of worded tabs size its current tab to its word, so it's answered, and those lines can go.
- **The trigger beside icon buttons** is now at least one button square, 40 px on desktop and 44 on touch, so the short wide trigger is gone. Your rule in `styles/scale.css` that sets `--dock-trigger-min-height: var(--dock-control-size)` is now the default and can go, as its own note planned. The trigger's inline padding stays at 8 px; set `--dock-trigger-padding-inline` if you'd like it to match the tabs' 12 px.
- **The fills.** The current button's fill is 10 % of the dock's own text colour and a hovered button's 5 % (5 to 6.5 % in dark); the small highlight that followed the pointer is gone.
- **One base size set in px** moved to 12.0.0, so please keep your own scaling until then.

In dark the plate is firmer than today, so the dock stands off a busy page more and still shows it through, and it blurs a little less, about 11 px against 16. Light takes one more step of ink, a shade greyer on a white page, and stays glass.

Thanks,
Mike

**Changed, and why**
- *Glyph seats.* Added. `tiles/css/tabs.css:33-38` sizes `.shell-dock .dock-icon-button > .glyph` by `var(--dock-icon-glyph)` ("half the seat, never under 16"), and `:89-92` and `:104-107` do the same for the Home mark and the folded face (`.dock-folded`). v11.1.0's ratio is 0.5 and the branch's 0.9, re-resolved on `.glass-dock`, so these grow at the bump. HA's `scale.css:52-58` declares the token on `:host`, which the dock's own declaration overrides. HA's layer height is 40 px (`scale.css:132`).
- *The faces.* Added. `tiles/dock_parts.ts:15` ("each marked `data-dock-glyph` (11.2.0 sizes it, LF-30)") and `:179`, `:205` mark the faces; RU-87 removed `data-dock-glyph` when no app used it, and the branch has none in `src`. The faces are `Face` and `Avatar` inside `span.dock-faces`, not a direct glyph.
- *Faces seat fold.* Added in the same bullet: r13's dock now folds (`GlassTabs.ts:338` `collapse: from === undefined ? "closed" : "open"`, `#collapsed` at `:352`), and the faces seat is its `#persistent-end` (`:353`), so the 11.2.0 held-finger rule reaches it. The dock is not press-only.
- *The worded tab's icon.* Added the Home tab's selector: `seatGlyph` wraps Home's icon in `span.dock-mark` (`dock_parts.ts:67-85`), so `> .glyph` alone misses it.
- *Intro.* "docks" to "dock": Home Assistant mounts one.
- Held at `ce9eddf6`: no `--dock-tab-h`, `--dock-control-active-bg` or `--dock-control-hover-bg` in `frontend/src`; `tabs.css:42-61` sets `--dock-open-pitches: 1` and `4` and `--dock-open-seat: auto`; the LF-47 ask is dated 2026-11-21 (`c421679f`); `scale.css:155-158` is the LF-11 rule with "Delete this rule at the bump"; trigger padding 8 px and tab padding 12 px (`scale.css:136`, `:138`); worded tabs `shape: "tab"` (`dock_parts.ts:136`); the kit's `.glyph` base is unlayered (`marks.css:16-19`); `scale.css` is HA's px scaling, generated from 11.1.0.

---

## speedtest

**Ref read.** `glass-10.1` `4af04ba0` (2026-11-15), the newest speedtest ref. The default branch `origin/master` `70b66790` (2026-06-12) pins glass-ui `^3.10.0`. glass-ui at `4af04ba0`: `package.json:101` `11.0.1`; `package-lock.json` resolves 11.0.1.

Hi,

Not much changes for speedtest in 11.2.0, but a few things are worth a look in both themes.

- **From 11.0.1.** Moving to 11.2.0 also brings 11.0.2's and 11.1.0's docks. Yours never fold, so for them the main change is that in dark a hovered, pressed or selected button is drawn lighter than the plate.
- **The fills.** Hovered, current and pressed fills inside a dock are steps of the dock's own text colour: 5 % (5 to 6.5 % in dark), 10 % and 2 % of it. The small highlight that followed the pointer is gone.
- **Icons.** Back, Stop and Retake fill nine tenths of the button, where 11.0.1 draws them at half, so on your 4rem dock they come out nearly twice today's size. The glyphs in your tabs (Next, the survey step, New Test) follow the same token through your `.dock-glyph` rule in `Dock.vue`, so they grow the same way. A tab now sizes its direct `svg` at one and a half times the word, which the note above that rule says the library lacked, so the rule can go from the tabs; `--dock-icon-glyph-ratio: 0.5` on `.dock-signature .glass-dock` keeps every glyph at today's size. The settings icon keeps its `size-icon-lg`.
- Your plate keeps `--material-bg-dock` in both themes. `design/register.css` sets the plate's veil itself, so the firmer dark plate the other sites get doesn't reach it. The other docks' dark blur drops a little, to about 11 px; whether that reaches yours depends on how `register.css` holds the glass level, and we'll read it on your composition before the release.

`--dock-scale` keeps working; one base size set in px moved to 12.0.0. `DockBackgroundToggle` is deleted in 11.2.0, which you'd already dropped (only comments still name it). Your `--dock-trigger-padding-*` values and your own tab height still win over the new defaults. The theme toggle in your settings panel now draws at full strength rather than slightly dimmed.

Thanks,
Mike

**Changed, and why**
- *The fills.* "You set `--dock-fg-on-aurora` on `.glass-dock`" does not hold: no file in `src` names `--dock-fg-on-aurora`. `register.css:235-239` sets `--glass-backdrop`, `--muted-foreground` and `--muted-foreground-strong` on `.glass-dock`. The fills now read as the dock's own text colour, as in the other drafts.
- *From 11.0.1.* Trimmed to what reaches speedtest: both docks are `:collapse="false"` (`Dock.vue:258`, `SurveyResultDock.vue:38-40`), neither has a progress rim or a seat with `aria-current` or `active`, so the gliding mark, the rim, the folded face and the fold on leave do not apply.
- *Icons.* Added. Back, Stop and Retake carry unsized lucide icons (`Dock.vue:268-270`, `:294-296`, `:318-320`); the tab glyphs carry `.dock-glyph` (`:310`, and the tabs below it), sized by `var(--dock-icon-glyph)` (`:620-623`), and the note above it says the library has no `> svg` rule for a tab. The dock's layer height is 4rem (`design/tokens.css:995`), so the token goes from half of it to nine tenths. `AppSettingsButton.vue:9` sizes the settings icon with `size-icon-lg`.
- *Theme toggle.* Added: `DarkModeToggle size="sm"` sits in the settings popover (`AppSettingsButton.vue:29`), outside the dock, and its 0.8 goes everywhere in 11.2.0.
- Held at `4af04ba0`: `register.css:240-244` sets `--glass-veil: var(--material-bg-dock)` on the plate; `--dock-scale` re-homed on `.dock-signature` (`Dock.vue:576`); `DockBackgroundToggle` only in comments (`App.vue:392`, `Dock.vue:376`); `--dock-trigger-padding-*`, `--dock-tab-min-height` and `--dock-tab-h` on `.dock-signature .glass-dock` (`design/tokens.css:991-1006`), unlayered.

---

## gregg

**Ref read.** The working tree at `/Users/mkbabb/Programming/gregg` as of 2026-11-22; the repository has no commits. glass-ui: `package.json:17` `11.1.0`; `package-lock.json:1359-1360` resolves 11.1.0.

Hi,

A few deletions open up in gregg with 11.2.0, plus one thing that didn't make it.

- **The gliding mark stays.** The mark under PageDock's and HeroPlate's current control keeps gliding between buttons as 11.1.0 shipped it, now painted in the dock's new current fill.
- **The fills.** You set `--dock-fg-on-aurora` on `.glass-dock`, so hovered, current and pressed fills follow your ink: 5 % on hover (5 to 6.5 % in dark) and 10 % for the current button, against the 9 % in light and 24 % in dark your `style.css` sets. Whether to keep your override is your call. The small highlight that followed the pointer is gone.
- **The touch reset.** The `(hover: none)` rule in `style.css` that clears a hovered dock button's background can go: glass has kept its dock hover to `(hover: hover)` since 11.1.0, as the rule's note asked. Please do remove it. Under a finger a pressed button also counts as hovered, so while the rule stays, gregg's dock buttons show no press fill on touch.
- **PageDock's row.** A `role="group"` child of the dock's row is now a frame whose buttons are the snap targets, so your `scroll-snap-align` rules can go. The `--dock-open-seat: max-content` line no longer does anything, since 11.2.0 has no widened current tab.
- **Tab heights.** The tab buttons in PageDock and HeroPlate grow to the button height, 40 px on desktop and 44 on touch (about 38.6 and 38 today), so every button in the row is one height.
- **Icons.** An icon you haven't sized fills nine tenths of its button, where 11.1.0 draws it at half: the chart and table icons in the figure and hero docks, and the theme's sun and moon, whose `.page-dock__glyph` rule reads the library's `--dock-icon-glyph`. A size of your own on them keeps today's.
- **The plate.** Your docks are static, so their plates stay an opaque card in both themes, and your pair docks' wash tier is untouched.
- **The progress rim** already rides the plate's border, so nothing there changes; the dock's new `#rim` slot is there if you ever want the rim inside the dock.
- **Not built.** Trailing always-shown buttons that give way on a narrow screen: they never yield, and the row takes the room that's left. `dockFold.ts`'s pin stays as it is.

Thanks,
Mike

**Changed, and why**
- *The fills.* "against the 24 % your `style.css` sets": gregg sets 9 % in light and 24 % in dark (`src/style.css:495-500`).
- *Always-shown buttons.* Dropped. gregg's two folding docks open on a press (`Figure.vue:1093`, `HeroPlate.vue:1112` `expand-on="press"`), and a press dock returns before the leave branch (`useDockState.ts:638-639` on the branch, per challenge-8), so neither the 11.1.0 fold on leave nor the held-finger rule reaches gregg; PageDock never folds (`PageDock.vue:523`).
- *Icons.* Added. The view pair's icons are bare `<component :is="v.icon" />` in `DockControl`s (`Figure.vue:1110-1112` and the `#persistent-end` copy; the hero's alike), and `.page-dock__glyph` sizes the theme glyphs by `var(--dock-icon-glyph, 1.25rem)` (`PageDock.vue:731-734`).
- Held: no `dockIndicator.ts` remains (`src/lib` holds `dockFold.ts`, `dockRoom.ts`, `dockStatus.ts`), so the mark is 11.1.0's; `--dock-fg-on-aurora` on `.glass-dock` (`style.css:510`); the `(hover: none)` rule at `:1043-1047` with its "Delete once" note; the snap rules at `:131-136`; `--dock-open-seat: max-content` (`PageDock.vue:616`); all three docks `backdrop-mode="static"`; the pair docks' `--dock-plate-expanded-tier: var(--glass-veil-wash)` (`Figure.vue:1411`); `ScrollProgressRim edge="border"` (`PageDock.vue:580`); the theme seat is a `DockControl`, not glass's toggle.

---

## value.js

**Ref read.** `origin/master` `d7df97f9e` (2026-11-16), the default branch. glass-ui: `package.json:94` `11.1.0`; `package-lock.json:1276-1277` resolves 11.1.0. The newer `color-40` `168e7eb47` (2026-11-21) also pins 11.1.0; its changes to `foundation.css` and `shell/dock` touch none of the lines below.

Hi,

Three notes for value.js: colour, the plate, and bytes.

- **Colour.** Inside a dock, the hovered, current and pressed fills follow your `--dock-fg-on-aurora`: 5 % (5 to 6.5 % in dark), 10 % and 2 % of it, and the small highlight that followed the pointer is gone. A `DockControl` outside any dock keeps today's fills, including 11.0.2's dark-mode lift. `type="submit"` on `DockControl` stays.
- **The plate in dark.** Your docks take the firmer dark plate, about 43 % card colour where today's is 18 %, and a slightly lighter blur, about 11 px against 16, so the band your colour session measures off `.dock-plate` will read differently in dark; light takes one more step of ink. The dock now takes its glass level from its own token, `--glass-level-dock`, so the `--glass-level: 0.1` in your more-contrast block no longer reaches your docks; adding `--glass-level-dock: 0.1` to the same block keeps them at 0.1. Our next build records whether `--glass-veil-dock` still moves the plate's ink, and I'll send you the token that does with the release.
- **First-load size.** We built a small page that imports the dock parts you use and the menus they hold. On the current build it's 105,249 bytes compressed against 102,631 on 11.0.2, 2.6 % more. We haven't yet measured the same page on 11.1.0, so I can't yet say how much of that is 11.1.0's and how much is new; that figure comes with the next build. Our bound for 11.2.0 is no more than 11.1.0. Does your 125 KB count the first load only, or every script a page can load? If it's the first load, one option for 11.3.0 is a separate chunk for the dock's folding code, loaded only by docks that can fold and fetched when the page is idle or when the pointer first nears a dock, so no fold waits for it. If you'd rather run your own budget first, I can send you a tarball of the build.

Thanks,
Mike

**Changed, and why**
- *From 11.0.2.* Dropped, and the opening line now counts three notes. value.js pins 11.1.0, so 11.1.0's dock (the gliding mark, the rim, the folded face, the idle fold) is what it runs today.
- No icon line: every icon in the dock and in the loose rows carries a size class (`w-6 h-6` in `ActionBarToggle.vue`, `ActionButton.vue`, `ActionBarLayer.vue`; `w-5 h-5` and `w-4 h-4` in `MixResultDisplay.vue`, `ImageEyedropper.vue`, `GradientVisualizer.vue`, `ExtractWorkbench.vue`), so the new glyph share doesn't reach them.
- Held at `d7df97f9e`: `--dock-fg-on-aurora` bound on the dock through `heldInkStyle` (`shell/dock/Dock.vue:181`); loose `DockControl` rows in the four workbenches; `type="submit"` on `DockControl` (`shell/dock/layers/SlugEditLayer.vue:124`); `.dock-plate` read (`shell/dock/Dock.vue:131`, `color-session/useContrastSafeColor.ts:222`); `--glass-level: 0.1` on `:root, .dark` under `prefers-contrast: more` (`styles/foundation.css:980-986`). ConsoleRail reads `--dock-control-hover-bg` outside a dock (`ConsoleRail.vue:401`); the branch still declares the token on `:root` (`tokens/sizing.css:220`), so it is unaffected.

---

## daraksha (through value.js)

**Ref read.** `origin/master` `24a6dbd` (2026-11-21), the default branch. glass-ui: `package.json:32` `11.0.2`; `package-lock.json` resolves 11.0.2. The newer pushed branches `reader-fill` `0e9c79d` and `t31-c-learn` `bd012f6` (2026-11-22) also pin 11.0.2; `reader-fill` moves the reader's Focus, Verses and Page out of the controls seat into the site dock's page layer (`ReaderDock.vue:112-124` there), which the SegmentedTabs line below is worded to fit.

Hi,

Could you pass these along to daraksha?

- **From 11.0.2.** Moving to 11.2.0 also brings 11.1.0's dock: the current page's mark glides between buttons, the progress rim rides the plate's edge, always-shown buttons form the folded face (pressing one and moving off folds the dock straight away), and an untouched dock folds after six idle seconds.
- **The theme seat.** The theme seat that splits off from the dock isn't in 11.2.0; it's booked for 12.0.0. So please keep daraksha's own seat, the neck and `follow()` for now, rather than moving `<ThemeControl />` into a glass seat as the note in `SiteDock.vue` plans. `--dock-expand-t`, `--dock-expanded-px` and `--dock-collapsed-px` stay through 11.2.0. `--radius-dock: 9999px` in `src/styles.css` matches the default now and can go.
- **Glyphs.** A dock button sizes only a glyph that's its direct child: an `svg`, `img` or `picture`, at nine tenths of an icon button (11.0.2 draws an `svg` there at half and leaves the others) and at one and a half times the word in a tab. The pages' icons sit inside `.seat`, so the share you set with `--site-glyph-fill` in `styles.css` still sizes them, along with the Pages mark and the khatam.
- The two `--glass-veil-dock: var(--glass-veil-base)` lines, in `SiteDock.vue` and `ControlsSeat.vue`, now equal the default and can go.
- **The neck.** In dark the dock's plate is firmer than in light, and it blurs a little less, about 11 px against 16; I'll confirm the figure. The neck between the site dock and the theme dock is a `glass-plate` outside both docks, so it would keep the clearer level and read thinner than the two plates it joins. The README's recipe for a plate that matches the dock carries two lines: `--glass-veil-tier: var(--glass-veil-dock)`, which the neck already has, and `--glass-level: var(--glass-level-dock)`. With the second added, the neck reads with the plates in our frames, its blur drops with the dock's, it follows the dock if the dark step changes, and it turns opaque with the docks for someone who asks for reduced transparency. `Star.vue` and `Clasp.vue` borrow a dock for their plates, so they take the dock's level with no line.
- The controls seat can become the controls preset. It folds at every width once it holds two or more controls, its icons are the normal size, half the button, as the top-right bar asks, `dockHold.ts` can go, and `DockOutlet` carries the teleported docks. Until the seat moves, its icons (`.seat-glyph` in `styles.css`) read the library's `--dock-icon-glyph`, which 11.2.0 sets at nine tenths of the button where 11.0.2's is half, so moving it at the bump keeps them at today's size. The `keep-dock-open` on the Text seat's popover no longer does anything: a popover opened from a dock button holds the dock on its own.
- The reader's Focus, Verses and Page can be one `SegmentedTabs`. Inside a dock it sits at button height with no channel, blur or shadow of its own, so the selected one looks like a selected dock button; in the controls dock's `#persistent` it also stays shown when the dock folds.
- `DockControl`'s `active` keeps its meaning: it sets `aria-pressed="true"` and `data-active` and paints the dock's current fill. A bare `aria-pressed` paints nothing. A hovered button is 5 % of the dock's text colour (5 to 6.5 % in dark), and the small highlight that followed the pointer over a button is gone.
- `dockTip.ts` should stay for now, since page names on a press and hold come with the tooltip work after this release.
- We put a copy of daraksha's ornamented ground into our test page. On that near-black ground the firmer plate, with its lighter blur, still stands only a little off the page (about 1.04 to 1 at the step we measured last, against about 1.02 today), so there it shows mostly as less of the ornament coming through; in light it stands about 1.31 to 1 (today's 1.21). We'll read it again at the final dark step. If that doesn't match what you see, a frame of the dock on the real page would help.
- **Size.** 11.1.0's size is what kept daraksha on 11.0.2. Before the release we'll build daraksha's heaviest page against 11.2.0 with the deletions it allows (`dockHold.ts`, the controls seat's dock, the blocks marked for removal at 11.2.0) and read it against the 125 KB budget. I'll send the figure, or tell you if the site has to stay on 11.0.2 for now.

Thanks,
Mike

**Changed, and why**
- *Glyphs.* The bullet's site claims are stale. No tab seat at `24a6dbd` holds an `img` or `picture` (the tab seats are `ReaderDock.vue:144`'s surah button and `TextSeat.vue:70`'s script tabs, both words), so there are no tab-picture rules to delete. The Pages seats are now compact icon seats with `PageIcon` inside `span.seat` (`SiteDock.vue:258`), sized by `--site-glyph-fill` (`styles.css:63-91`, `PageIcon.vue:27-29`), which glass's direct-child rule does not reach. "Motion's Again inside `.kf-turn`" is gone: `MotionPage.vue:19-20` says "There is no Again", and `kf-turn` is in no file under `src`. "already" was wrong for an 11.0.2 site: v11.0.2 sizes only `.dock-icon-button > svg`, at 0.5, and no tab glyph.
- *Controls seat.* Added the glyph line: `StageSeat.vue:34` and `TextSeat.vue:52` mark their icons `.seat-glyph`, sized by `var(--dock-icon-glyph)` (`styles.css:80-84`, "glass's own glyph size ... not 2x"), so in the plain dock they would go from half to nine tenths until the preset's half applies. Added `keep-dock-open` (`TextSeat.vue:47`), which the branch no longer reads.
- *The neck.* The neck already sets `--glass-veil-tier: var(--glass-veil-dock)` (`SiteDock.vue:540`), so only the level line is new. "The same lines suit `Star.vue` and `Clasp.vue`" did not fit the tree: both are `GlassDock`s used as plates (`veil/Star.vue:34`, `veil/film/Clasp.vue:90`), so they already read the dock's level.
- *The reader's views.* "the head dock's `#persistent`" did not match: at `24a6dbd` Focus, Verses and Page are `StageSeat`s in the reader's `ControlsSeat` (`ReaderDock.vue:171-172`), and on `reader-fill` they are `DockControl`s teleported into the site dock's page layer. The line now holds for either.
- Held at `24a6dbd`: the fission notes and `follow()` (`SiteDock.vue:70-111`), the neck marked for removal (`:279-280`), `--dock-expand-t` and the two width tokens read (`:99-106`, `:453`); `--radius-dock: 9999px` (`styles.css:61`); the two veil lines (`SiteDock.vue:381`, `ControlsSeat.vue:135`); `ControlsSeat.vue:14` ("this body becomes `<ControlsDock>`"); `dockHold.ts` and `dockTip.ts`; teleports into `#dock-page`; the "REMOVE AT GLASS 11.2.0" blocks; `ThemeControl` is daraksha's own, so no toggle line.

---

## slides

**Ref read.** `npig` `3cec2cb` (2026-11-09), the newest slides ref and the source its handoff names for production. The default branch `origin/main` `a171266` (2026-06-11) pins glass-ui 3.13.0; local `main` `7dcbb3b` is the September look. glass-ui at `3cec2cb`: `package.json:25` `10.1.4`; `package-lock.json` resolves 10.1.4.

Hi,

There's one visual change for slides in 11.2.0, and a few smaller ones. slides is on 10.1, so the move also brings 11.0's and 11.1's changes, which their notes cover; for docks the main ones are a current-page mark that glides between buttons and a progress rim on the plate's edge.

In dark the dock's plate is firmer, about 43 % card colour where 11.1.0's is 18 %, and hides more of the slide behind it while still showing it through; it also blurs a little less, about 11 px against 16. That includes the deck dock on a dark slide in a light deck, since it carries `.dark` itself. Light takes one more step of ink, and that step reaches the frosted plate `decks/parkway-lab/theme.css` gives a light deck dock over the ridge bands. Button fills are steps of the dock's own text colour (5 % on hover, 5 to 6.5 % in dark, and 10 % for the current button), and the small highlight that followed the pointer is gone. The theme toggle in the deck dock now draws at full strength rather than slightly dimmed, and its hover is the dock's own. The icons are sized from the dock's row, at nine tenths of it where 10.1 uses half: on a desktop they grow from 20 px to 36, the full width of your 2.25rem buttons, and on a phone your 23 px rule in `DeckView.vue` still sets them. Menus or dialogs opened from a dock button hold the dock with nothing to wire. Would you mind opening a deck in dark mode once 11.2.0 is out? A quick look would settle it.

Thanks,
Mike

**Changed, and why**
- *The parkway tier.* "The firmer level also mixes the tier ... toward the card colour" put it under the dark plate. `decks/parkway-lab/theme.css:38-43` sets `--dock-plate-collapsed-tier: 0.86` and `--dock-plate-expanded-tier: 0.9` only on `.deck-dock:not(.dark)` over a ridge band, so it is light's step that reaches it.
- *Icons.* "Unsized icons fill nine tenths of their button" did not fit slides. The glyph token is the dock's row height times the share (`density.css:89-92`, `:220-226` on the branch), 40 px here, while `.deck-dock` sets its buttons to 2.25rem (`DeckView.vue:212`); the lucide `:size="18"` attributes lose to the library's CSS. Under `(pointer: coarse), (max-width: 560px)` the scoped rule at `DeckView.vue:255-257` holds the icons at 23 px.
- *Tabs.* Dropped "tabs grow to the button height": the deck dock has no tab seat (Home, Prev, the pager, Next, the toggle and `DeckSettings`).
- Held at `3cec2cb`: one `GlassDock`, `:collapse="false"`, `:class="{ dark: activeDark }"` (`DeckView.vue:144-148`); `DarkModeToggle size="dock"` (`:164`); `DeckSettings` opens a `DropdownMenu`.

---

## keyframes

**Ref read.** `origin/master` `3e54f9c7` (2026-11-20), the default branch. glass-ui: `package.json:80` `11.1.0`; `package-lock.json:851-852` resolves 11.1.0. The newer `die-1119` `fa6e5be1` (2026-11-21) pins the same and changes no dock file.

Hi,

Seven things for keyframes in 11.2.0.

- `graspHeld` stays exposed through 11.2.0 and is removed in 12.0.0, so the dock-context test can keep reading it for now.
- The transport's Play button still slides when the dock opens, because the in-flow overlay is waiting on a decision. If it lands, setting `anchor="start"` keeps Play within 4 px of the pointer, and I'll say so before the release.
- The `keepOpen()` and `release()` calls around the scene and channel Selects, in `ChromeDock.vue` and `TransportDock.vue`, can go. MbabbMenu's hold can shrink to the moment between its menu closing and a dialog opening: the menu, the share popover and the two dialogs each hold the dock while they're open. The code pane's RibbonBar stays a `GlassDock` with `:collapse="false"`, since the controls preset always folds once it holds two or more controls and that row shouldn't.
- In dark the ChromeDock, TransportDock and RibbonBar plates are firmer and hide more of the aurora behind them while still showing it, and they blur a little less, about 11 px against 16; light takes one more step of ink. Hovered buttons are 5 % of the dock's text colour (5 to 6.5 % in dark), and the small highlight that followed the pointer is gone. The Apply CSS tab grows to the button height, 40 px on desktop and 44 on touch.
- ChromeDock's icons carry no size class and read the library's `--dock-icon-glyph` through `.dock-glyph`, which 11.2.0 sets at nine tenths of the button where 11.1.0's is half, so they grow to nearly twice today's size; the same token sizes the scene icons in the scene list's rows, which grow with them. TransportDock's Play and the RibbonBar's icons keep their size classes.
- The theme toggle in ChromeDock now draws at full strength rather than slightly dimmed, and its hover is the dock's own. Nothing to change on your side.
- The easing picker opening from the bottom of a phone, and short lists opening at their trigger, come with 11.3.0's menu work, not this release.

Thanks,
Mike

**Changed, and why**
- *Holds.* "The calls around your menus can go" was too broad for MbabbMenu. The deletable holds are around Selects (`ChromeDock.vue:415-418`, `TransportDock.vue:374-375`); the branch's `SelectContent` holds the dock. MbabbMenu's watch (`MbabbMenu.vue:376-386`) holds on `open`, `shareOpen`, `confirmClearOpen`, `shortcutsOpen` and `dialogPending`; the first four are glass `DropdownMenu`, `Popover` and `Dialog` surfaces in ChromeDock's tree (`SharePopover.vue:140`, `MbabbMenu.vue:317-318`), which hold on their own, and `dialogPending` covers the gap between them.
- *Icons.* Added, and the count went from six to seven. `ChromeDock.vue:720-746` says its `DockControl` glyphs "carry no class at all now" and sizes `.dock-glyph` by `var(--dock-icon-glyph)`, which the note says also resolves at `:root` for the portalled `SelectContent` rows (`:540-551` mark the scene items `.dock-glyph`). TransportDock's Play is `icon-lg` (`TransportDock.vue:94-95`); the RibbonBar's icons are `icon-sm` (`RibbonBar.vue:88-129`).
- Held at `3e54f9c7`: `graspHeld` read in `test/demo/app/dock-context-slot-resolution.test.ts:115-125`; TransportDock `:collapse="phoneDock ? false : 'closed'"` with Play in `#persistent`; RibbonBar `:collapse="false"` with Apply CSS `shape="tab"` (`RibbonBar.vue:76-93`); `DarkModeToggle size="dock"` (`ChromeDock.vue:636`); the `--radius-dock` line USAGE.md listed is already gone.

---

## gaggle

**Ref read.** `site-redesign` `898cea9` (2026-11-21), the newest gaggle-site ref. The default branch `origin/master` `648b2b0` (2026-05-03) has no glass-ui pin in `dashboard/`. glass-ui at `898cea9`: `dashboard/package.json:15` `11.1.0`; `dashboard/package-lock.json` resolves 11.1.0.

Hi,

A few small changes reach gaggle's docks in 11.2.0, and one needs a line moved.

- **The report dock's press step.** `.r-dock-seat { --dock-control-active-bg: var(--plate-press); }` in `report/page/PageDock.vue` sets the gliding plate's colour on the nav around the dock. In 11.2.0 the dock sets that token on itself, so a value from higher up no longer reaches inside it, and the plate would change to the dock's own current step. Moving the line to `.r-dock-seat .glass-dock` keeps your press step.
- Every tab seat grows to the button height, 40 px on desktop and 44 on touch: the view tabs, the report dock's sections and the lamp seat.
- Hovered buttons are now 5 % of the dock's text colour (5 to 6.5 % in dark) and the current one 10 %, and the small highlight that followed the pointer is gone.
- The theme toggle in the site dock, KitDock and the report dock now draws at full strength rather than slightly dimmed, and its hover is the dock's own. Nothing to change on your side.
- In dark the site dock's and KitDock's plates are firmer and blur a little less, about 11 px against 16; the report dock is static and keeps its opaque card.
- The hold `shell/Dock.vue` takes while a dock menu is open can go, since a menu or popover opened from a dock button now holds the dock on its own. The top-of-page and Find holds are yours and stay.
- The dock's search slot is gone, which changes nothing for you, since Find is a seat of its own in the pill.

Thanks,
Mike

**Changed, and why**
- *Tab icons.* Dropped "An unsized icon beside a word in a tab is now one and a half times the word: 21 px at a 14 px word". Every dock icon at `898cea9` carries a lucide `:size` and sits inside a wrapper span: the view tabs' `<component :is="t.icon" :size="16">` in `span.dock__tab` (`shell/Dock.vue:162`), Filter, Account and More likewise (`:189`, `:228`, `:242`), Find and Home in the report and kit docks (`PageDock.vue:127`, `KitDock.vue:68`, `:81`). The tab rule sizes only a direct child, so nothing changes. For the same reason no icon line is added.
- *Tab heights.* Widened from "the view tabs": the report dock's section seats are `shape="tab"` with their block padding set to 0 (`PageDock.vue:88`, `:198-201`), and the lamp seat is a tab in both page docks (`report/kit/Lamp.vue:57`); gaggle sets no tab height.
- *Holds.* "The `keepOpen()` and `release()` calls around your menus can go" was too broad: `shell/Dock.vue:40-48` keeps three counted holds, `top`, `find` and `menu`, and only `menu` (`:79-82`) is replaced by the overlays' own hold.
- *Search.* "your search lives in its own slot" did not match: Find is an `Input` seat in the dock's run (`shell/Dock.vue:167-177`), and the page docks open Find in a popover.
- Held at `898cea9`: `.r-dock-seat { --dock-control-active-bg: var(--plate-press) }` (`report/page/PageDock.vue:186-189`), unscoped, on the `nav` around the dock (`:80-81`); `DarkModeToggle size="dock"` in `shell/Dock.vue:221`, `KitDock.vue:91` and `PageDock.vue:138`; KitDock and the site dock not static, the report dock `backdrop-mode="static"`.
