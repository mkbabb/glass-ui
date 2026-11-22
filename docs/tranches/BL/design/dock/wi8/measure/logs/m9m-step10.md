#### atlas

Hi,

Here's what glass-ui 11.2.0 changes in the docks atlas mounts, and one placement I'd like your view on before we suggest it.

- **From your version.** atlas is on 10.1, so moving to 11.2.0 also brings 11.0's and 11.1's changes, which their notes cover. For the docks the main ones are these: the current page's mark glides between buttons, a progress rim rides the plate's edge, and always-shown buttons form the folded face. Pressing one of those and then moving off the dock folds it straight away; under a held finger the fold now waits for the lift.
- **The plate.** A one-row dock rests as a fully rounded capsule, and a dock taller than one row keeps 11.1.0's corners. Your docks are static, so each plate stays an opaque card in both themes; the firmer dark plate the other sites get doesn't reach them.
- **Card and rounded docks.** Nothing in the dock is scaled mid-movement any more, so a `shape="card"` or `shape="rounded"` dock keeps one corner in every frame of a fold and an open. Folded, both now become a circle, its radius half its side, as your corner reading expected; one with an always-shown button beside its icon folds to a short bar and keeps 16 px corners, as before; open, they keep their corners. That covers both halves of the reading, so they're ready whenever you want them.
- **Button fills.** Hovered and current buttons are light steps of the dock's own text colour: 6.5 % on hover in light and 5 % in dark, and 10 % for the current button in both. A press adds 2 % over whatever the button already shows, and under a finger it starts from the hover step, so a tap looks like a click. The small highlight that followed the pointer over a button is gone. If you set `--dock-control-hover-bg` or `--dock-control-active-bg`, please set them on the dock itself; an override higher up the page no longer reaches inside one.
- **Icons.** An icon you haven't sized fills nine tenths of its button, where 10.1 draws it at half, and so does a folded face's own icon. Anything you size yourself keeps your size, so PlateDock's More handle keeps the 18 px its `.plate-dock__handle` rule gives the ellipsis, and stays smaller than the Table icon beside it until that rule goes.
- **Heights.** Every button in a dock is the dock's control height, tabs included. Yours stay 44 px at every pointer: the rail and the phone bar set `--dock-control-size` to 2.75rem themselves, and the figure docks take it from `data-preset="cockpit"`. A trigger anywhere in the dock, the always-shown ends included, is at least one button square, and its label and chevron draw at full strength.
- **Segmented controls.** A `SegmentedTabs` inside a dock no longer draws a channel of its own. Your dials open theirs in a popover, outside the dock, so nothing changes for them.
- **The theme toggle** in the rail and the phone bar now draws at full strength rather than slightly dimmed, and its hover is the dock's own. Nothing to change on your side.
- **The controls preset** folds at every width once it holds two or more controls, about 3 s after the pointer leaves; with one control it's just that control. Its icons are the normal size, half the button, to match the top-right controls bar now set for every app. Thanks for choosing the head row. We built it the way you described: the title keeps a margin at its end as wide as the folded dock's box (the preset's 1rem corner inset plus 3.25rem, one 2.75rem button and the plate's 0.25rem edge on each side, from the plate's inner edge), and a 98-character title wraps before it. We read it at 375, 390 and 1440, in both themes, with mouse and touch, in Chromium and in WebKit's test build. Folded, the dock covers none of the title. Open and while it stays, it covers none of the legend, its link or the plot, and nothing beside it moves in any frame. The folded box is one button plus the plate's edge (52 by 52) only when `#collapsed` holds the icon itself. A 44 px span around the icon, as PlateDock's More handle is today, gets the dock's own padding round it and folds 74 px wide, which puts 616 px² over the title's box. glass has no token the head row can read for those sizes yet: the preset sets them on the dock itself, so the margin is written out for now. The fix for PlateDock's own seat, where the parent is narrower than the buttons, isn't in 11.2.0; since you've chosen the head row, nothing of yours mounts that seat.
- **Mounting.** A dock no longer lays out the page while it mounts: its first measurement moves to its first frame. On a test page of 18 docks, that first frame forced one layout in all; with 10 docks it forced none.
- **Folding and opening.** While a dock folds or opens, its root carries `data-morphing`. The README now names it as the signal to read, so your own checks can rely on it.
- **Overlays.** Menus, popovers, dialogs and sheets opened from a dock button hold the dock open with nothing to wire, so the hold PlateDock takes while Options or Download is open can go. A press on a dialog's or a sheet's dimmed backdrop closes it, and the dock then stays open for its usual pause.
- **In-flow docks.** The overlay that would let an in-flow dock open without pushing its row covers part of a figure's legend, its link included, while the dock stays open, so it's waiting on a decision. Until then an in-flow dock still pushes its row (36 px in your figure header) and `anchor` still does nothing, so please keep your own layout hold. I'll tell you before the release if that changes.
- **Progress rims.** The dock's new `#rim` slot takes a progress rim and follows the plate's outline in every frame, so the `DockProgressRim` in the rail's and the phone bar's `#persistent` could move into it.
- **Search.** The dock's search helper and its `#search` slot are deleted in 11.2.0 unless the owner keeps them; no released site used them. Your search can stay a command dialog, which ranks its own rows once 11.1.2 lands.
- **Unchanged for you.** `run="plain"` stays as you use it. The `:hover-intent` PlateDock passes isn't a dock prop and does nothing; the pause before a hover opens the dock is the `--dock-intent` token. The scroll fold moved to 11.3.0, so your own scroll rule stays for now.

Thanks,
Mike

#### fourier

Hi,

Here's what 11.2.0 lets fourier delete, and what to keep.

- The scroll fold moved to 11.3.0, so please keep folding the app dock on scroll in your own code for this release.
- Three lines that set `--dock-trigger-min-height: var(--dock-control-size)` can go: `AppDock.vue:564`, `StageDock.vue:130` and `AnimationControls.vue:437` (whose comment expects this in 11.1.2). A trigger anywhere in a dock, the always-shown ends included, is now at least one button square, so your trigger-width check should pass on 11.2.0: 44 px at 390, where it reads 38 today.
- The `keepOpen()` and `release()` calls around your menus can go too, in `AppDock.vue`, `UserSlugBar.vue` and `AnimationControls.vue`. A menu, popover, dialog or sheet opened from a dock button holds the dock on its own, and a press on a dialog's dimmed backdrop closes the dialog while the dock stays open for its pause. The `keep-dock-open` on your three Popovers no longer does anything and can go with them.
- `StageDock.vue` can give way to the controls preset, as its header says it will. One `ControlsDock` with `corner="top-end"` and `within="parent"`, passing `expand-on="press"` through, replaces its two `GlassDock`s; the folded icon stays in `#collapsed` and Edit contour in `#persistent-end`. If the stage card scrolls with the page, `within="viewport"` keeps the bar still, as the top-bar rules ask; `within="parent"` keeps it at the card's corner, moving with the card. Its `fold` prop goes, since the preset is the one control when it holds one and folds at every width once it holds two or more. The counted hold and the collapse after an outside press within 600 ms (lines 45 to 76) go as well. The phone column stays yours, as an `orientation` you pass. The preset's icons are the normal size, half the button, as the top-right bar asks; the app dock keeps its larger icons.
- `EditorControlsDock` now never folds, so it's best left a `GlassDock`: the preset folds once it holds two or more controls.
- The `ScrollProgressRim` you teleport into the app dock can sit in the dock's new `#rim` slot and follow the plate's outline in every frame.
- On a phone a tap on the dock no longer pins it open: it folds 6 s after the tap, and 6 s after a tap on one of its buttons. 11.2.0's fit rule cures the 4 to 8 px overflow of the dock's row on a phone.
- **The look.** In dark the plate is firmer: about 43 % of it is the card colour, where 11.1.0's is 18 %, so on a warm dark page it stands 1.44 to 1 off the page instead of 1.01, and the page still shows through it. It also blurs a little less: 11.2 px, where every card and the light dock blur 16. Light takes one more step of ink, a shade greyer on a white page. Hovered buttons are 6.5 % of the dock's text colour in light and 5 % in dark, and the current one 10 % in both, and the small highlight that followed the pointer is gone. In the stage, animation and editor docks an unsized icon fills nine tenths of its button, where 11.1.0 draws it at half, and your glyph rules there that read `--dock-icon-glyph` follow it; the app dock keeps the 24 px your `--dock-icon-glyph` on `.app-dock` sets. Your phone stage plate is a card-shaped dock that never folds, so the new folded circle doesn't touch it.

Thanks,
Mike

#### Home Assistant

Hi,

Several changes in 11.2.0 touch the Home Assistant dock, a few of your lines can go, and one item has moved to a later release.

- **The worded tab's icon.** A tab button sizes the `svg` that's its direct child at one and a half times the word, and your tab icons are svgs (`tabIcon` in `frontend/src/tiles/tabs.ts`), so there's nothing to mark. Your kit's icon base in `tiles/css/marks.css` is unlayered and still wins over the library's layered rule, as your note in `tiles/css/tabs.css` says of the icon buttons, so a worded tab's icon stays at the kit's size unless `.shell-dock .dock-tab-button > .glyph` takes `1.5em` beside that line, with `> .dock-mark > .glyph` for Home's, whose icon sits in its mark's box. The floor icons in the floor menu sit in menu rows, which the dock doesn't size.
- **The glyph seats.** Your rules in `tiles/css/tabs.css` size a wordless tab's icon, the Home mark's and the folded face's by the library's `--dock-icon-glyph`. In 11.2.0 that token is nine tenths of the button, where 11.1.0's is half, so those icons grow from 20 px to about 36 in a 40 px button. Setting `--dock-icon-glyph-ratio: 0.5` on `.shell-dock` keeps today's size if you'd prefer it.
- **The faces.** The note in `tiles/dock_parts.ts` expects 11.2.0 to size the faces you mark `data-dock-glyph`. That attribute didn't stay in 11.2.0: a dock button sizes only a direct `svg`, `img` or `picture`, so your faces keep the size `Face` and `Avatar` give them, and the attribute can come off. The faces seat stays shown when the dock folds; as in 11.1.0, pressing it and moving off the dock folds the dock straight away, and under a held finger the fold now waits for the lift.
- **Tab height.** Your worded tabs grow to the button height, 40 px on desktop and 44 on touch, where they measure 38 today. Since round 12 you no longer set your own `--dock-tab-h`, so the new default reaches them; setting it again keeps your height if you'd prefer.
- **The current tab from 600 to 1023 px.** `--dock-open-pitches` and `--dock-open-seat` in `tiles/css/tabs.css` do nothing in 11.2.0, since there's no widened current tab any more. The current worded tab sizes to its word at every width, and the tabs beside it glide over when it changes. That's the ask you sent on 21 November, that a row of worded tabs size its current tab to its word, so it's answered, and those lines can go.
- **The trigger beside icon buttons** is now at least one button square, 40 px on desktop and 44 on touch, so the short wide trigger is gone. Your rule in `styles/scale.css` that sets `--dock-trigger-min-height: var(--dock-control-size)` is now the default and can go, as its own note planned. The trigger's inline padding stays at 8 px; set `--dock-trigger-padding-inline` if you'd like it to match the tabs' 12 px.
- **The fills.** The current button's fill is 10 % of the dock's own text colour, and a hovered button's 6.5 % in light and 5 % in dark; the small highlight that followed the pointer is gone.
- **One base size set in px** moved to 12.0.0, so please keep your own scaling until then.

In dark the plate is firmer than today, so the dock stands off a busy page more and still shows it through, and it blurs a little less, 11.2 px against 16. Light takes one more step of ink, a shade greyer on a white page, and stays glass.

Thanks,
Mike

#### speedtest

Hi,

Not much changes for speedtest in 11.2.0, but a few things are worth a look in both themes.

- **From 11.0.1.** Moving to 11.2.0 also brings 11.0.2's and 11.1.0's docks. Yours never fold, so for them the main change is that in dark a hovered, pressed or selected button is drawn lighter than the plate.
- **The fills.** Hovered, current and pressed fills inside a dock are steps of the dock's own text colour: 6.5 % on hover (5 % in dark), 10 % for the current button and 2 % for a press. The small highlight that followed the pointer is gone.
- **Icons.** Back, Stop and Retake fill nine tenths of the button, where 11.0.1 draws them at half, so on your 4rem dock they come out nearly twice today's size. The glyphs in your tabs (Next, the survey step, New Test) follow the same token through your `.dock-glyph` rule in `Dock.vue`, so they grow the same way. A tab now sizes its direct `svg` at one and a half times the word, which the note above that rule says the library lacked, so the rule can go from the tabs; `--dock-icon-glyph-ratio: 0.5` on `.dock-signature .glass-dock` keeps every glyph at today's size. The settings icon keeps its `size-icon-lg`.
- Your plate keeps `--material-bg-dock` in both themes. `design/register.css` sets the plate's veil itself, so the firmer dark plate the other sites get doesn't reach it. The other docks' dark blur drops a little, to 11.2 px; whether that reaches yours depends on how `register.css` holds the glass level, and we'll read it on your composition before the release.

`--dock-scale` keeps working; one base size set in px moved to 12.0.0. `DockBackgroundToggle` is deleted in 11.2.0, which you'd already dropped (only comments still name it). Your `--dock-trigger-padding-*` values and your own tab height still win over the new defaults. The theme toggle in your settings panel now draws at full strength rather than slightly dimmed.

Thanks,
Mike

#### gregg

Hi,

A few deletions open up in gregg with 11.2.0, plus one thing that didn't make it.

- **The gliding mark stays.** The mark under PageDock's and HeroPlate's current control keeps gliding between buttons as 11.1.0 shipped it, now painted in the dock's new current fill.
- **The fills.** You set `--dock-fg-on-aurora` on `.glass-dock`, so hovered, current and pressed fills follow your ink: 6.5 % on hover (5 % in dark) and 10 % for the current button, against the 9 % in light and 24 % in dark your `style.css` sets. Whether to keep your override is your call. The small highlight that followed the pointer is gone.
- **The touch reset.** The `(hover: none)` rule in `style.css` that clears a hovered dock button's background can go: glass has kept its dock hover to `(hover: hover)` since 11.1.0, as the rule's note asked. Please do remove it. Under a finger a pressed button also counts as hovered, so while the rule stays, gregg's dock buttons show no press fill on touch.
- **PageDock's row.** A `role="group"` child of the dock's row is now a frame whose buttons are the snap targets, so your `scroll-snap-align` rules can go. The `--dock-open-seat: max-content` line no longer does anything, since 11.2.0 has no widened current tab.
- **Tab heights.** The tab buttons in PageDock and HeroPlate grow to the button height, 40 px on desktop and 44 on touch (about 38.6 and 38 today), so every button in the row is one height.
- **Icons.** An icon you haven't sized fills nine tenths of its button, where 11.1.0 draws it at half: the chart and table icons in the figure and hero docks, and the theme's sun and moon, whose `.page-dock__glyph` rule reads the library's `--dock-icon-glyph`. A size of your own on them keeps today's.
- **The plate.** Your docks are static, so their plates stay an opaque card in both themes, and your pair docks' wash tier is untouched.
- **The progress rim** already rides the plate's border, so nothing there changes; the dock's new `#rim` slot is there if you ever want the rim inside the dock.
- **Not built.** Trailing always-shown buttons that give way on a narrow screen: they never yield, and the row takes the room that's left. `dockFold.ts`'s pin stays as it is.

Thanks,
Mike

#### value.js

Hi,

Three notes for value.js: colour, the plate, and bytes.

- **Colour.** Inside a dock, the hovered, current and pressed fills follow your `--dock-fg-on-aurora`: 6.5 % on hover (5 % in dark), 10 % for the current button and 2 % for a press, and the small highlight that followed the pointer is gone. A `DockControl` outside any dock keeps today's fills, including 11.0.2's dark-mode lift. `type="submit"` on `DockControl` stays.
- **The plate in dark.** Your docks take the firmer dark plate, about 43 % card colour where today's is 18 %, and a slightly lighter blur, 11.2 px against 16, so the band your colour session measures off `.dock-plate` will read differently in dark; light takes one more step of ink. The dock now takes its glass level from its own token, `--glass-level-dock`, so the `--glass-level: 0.1` in your more-contrast block no longer reaches your docks; adding `--glass-level-dock: 0.1` to the same block keeps them at 0.1. `--glass-veil-dock` still sets how much card colour the plate takes: at 0.5 the dark plate goes from 43 % to 65 %.
- **First-load size.** We built a small page that imports the dock parts you use and the menus they hold. On the current build it's 104,596 bytes compressed: 299 more than the same page on 11.1.0 (104,297) and 1,965 more than on 11.0.2 (102,631). Our bound for 11.2.0 is no more than 11.1.0, so it's 299 bytes over, and the release waits on that. Does your 125 KB count the first load only, or every script a page can load? If it's the first load, one option for 11.3.0 is a separate chunk for the dock's folding code, loaded only by docks that can fold and fetched when the page is idle or when the pointer first nears a dock, so no fold waits for it. If you'd rather run your own budget first, I can send you a tarball of the build.

Thanks,
Mike

#### daraksha (through value.js)

Hi,

Could you pass these along to daraksha?

- **From 11.0.2.** Moving to 11.2.0 also brings 11.1.0's dock: the current page's mark glides between buttons, the progress rim rides the plate's edge, always-shown buttons form the folded face (pressing one and moving off folds the dock straight away), and an untouched dock folds after six idle seconds.
- **The theme seat.** The theme seat that splits off from the dock isn't in 11.2.0; it's booked for 12.0.0. So please keep daraksha's own seat, the neck and `follow()` for now, rather than moving `<ThemeControl />` into a glass seat as the note in `SiteDock.vue` plans. `--dock-expand-t`, `--dock-expanded-px` and `--dock-collapsed-px` stay through 11.2.0. `--radius-dock: 9999px` in `src/styles.css` matches the default now and can go.
- **Glyphs.** A dock button sizes only a glyph that's its direct child: an `svg`, `img` or `picture`, at nine tenths of an icon button (11.0.2 draws an `svg` there at half and leaves the others) and at one and a half times the word in a tab. The pages' icons sit inside `.seat`, so the share you set with `--site-glyph-fill` in `styles.css` still sizes them, along with the Pages mark and the khatam.
- The two `--glass-veil-dock: var(--glass-veil-base)` lines, in `SiteDock.vue` and `ControlsSeat.vue`, now equal the default and can go.
- **The neck.** In dark the dock's plate is firmer than in light, and it blurs a little less, 11.2 px against 16. The neck between the site dock and the theme dock is a `glass-plate` outside both docks, so it would keep the clearer level and read thinner than the two plates it joins. The README's recipe for a plate that matches the dock carries two lines: `--glass-veil-tier: var(--glass-veil-dock)`, which the neck already has, and `--glass-level: var(--glass-level-dock)`. With the second added, the neck reads with the plates in our frames, its blur drops with the dock's, it follows the dock if the dark step changes, and it turns opaque with the docks for someone who asks for reduced transparency. `Star.vue` and `Clasp.vue` borrow a dock for their plates, so they take the dock's level with no line.
- The controls seat can become the controls preset. It folds at every width once it holds two or more controls, its icons are the normal size, half the button, as the top-right bar asks, `dockHold.ts` can go, and `DockOutlet` carries the teleported docks. Until the seat moves, its icons (`.seat-glyph` in `styles.css`) read the library's `--dock-icon-glyph`, which 11.2.0 sets at nine tenths of the button where 11.0.2's is half, so moving it at the bump keeps them at today's size. The `keep-dock-open` on the Text seat's popover no longer does anything: a popover opened from a dock button holds the dock on its own.
- The reader's Focus, Verses and Page can be one `SegmentedTabs`. Inside a dock it sits at button height with no channel, blur or shadow of its own, so the selected one looks like a selected dock button; in the controls dock's `#persistent` it also stays shown when the dock folds.
- `DockControl`'s `active` keeps its meaning: it sets `aria-pressed="true"` and `data-active` and paints the dock's current fill. A bare `aria-pressed` paints nothing. A hovered button is 6.5 % of the dock's text colour in light and 5 % in dark, and the small highlight that followed the pointer over a button is gone.
- `dockTip.ts` should stay for now, since page names on a press and hold come with the tooltip work after this release.
- We put a copy of daraksha's ornamented ground into our test page. On that near-black ground the firmer plate, with its lighter blur, still stands only a little off the page: 1.08 to 1 at the dark step 11.2.0 takes, where today's dock stands 1.02, so there it shows mostly as less of the ornament coming through. In light it stands 1.31 to 1 (today's 1.21). If that doesn't match what you see, a frame of the dock on the real page would help.
- **Size.** 11.1.0's size is what kept daraksha on 11.0.2. Before the release we'll build daraksha's heaviest page against 11.2.0 with the deletions it allows (`dockHold.ts`, the controls seat's dock, the blocks marked for removal at 11.2.0) and read it against the 125 KB budget. I'll send the figure, or tell you if the site has to stay on 11.0.2 for now.

Thanks,
Mike

#### slides

Hi,

There's one visual change for slides in 11.2.0, and a few smaller ones. slides is on 10.1, so the move also brings 11.0's and 11.1's changes, which their notes cover; for docks the main ones are a current-page mark that glides between buttons and a progress rim on the plate's edge.

In dark the dock's plate is firmer, about 43 % card colour where 11.1.0's is 18 %, and hides more of the slide behind it while still showing it through; it also blurs a little less, 11.2 px against 16. That includes the deck dock on a dark slide in a light deck, since it carries `.dark` itself. Light takes one more step of ink, and that step reaches the frosted plate `decks/parkway-lab/theme.css` gives a light deck dock over the ridge bands. Button fills are steps of the dock's own text colour (6.5 % on hover in light, 5 % in dark, and 10 % for the current button), and the small highlight that followed the pointer is gone. The theme toggle in the deck dock now draws at full strength rather than slightly dimmed, and its hover is the dock's own. The icons are sized from the dock's row, at nine tenths of it where 10.1 uses half: on a desktop they grow from 20 px to 36, the full width of your 2.25rem buttons, and on a phone your 23 px rule in `DeckView.vue` still sets them. Menus or dialogs opened from a dock button hold the dock with nothing to wire. Would you mind opening a deck in dark mode once 11.2.0 is out? A quick look would settle it.

Thanks,
Mike

#### keyframes

Hi,

Seven things for keyframes in 11.2.0.

- `graspHeld` stays exposed through 11.2.0 and is removed in 12.0.0, so the dock-context test can keep reading it for now.
- The transport's Play button still slides when the dock opens, because the in-flow overlay is waiting on a decision. If it lands, setting `anchor="start"` keeps Play within 4 px of the pointer, and I'll say so before the release.
- The `keepOpen()` and `release()` calls around the scene and channel Selects, in `ChromeDock.vue` and `TransportDock.vue`, can go. MbabbMenu's hold can shrink to the moment between its menu closing and a dialog opening: the menu, the share popover and the two dialogs each hold the dock while they're open. The code pane's RibbonBar stays a `GlassDock` with `:collapse="false"`, since the controls preset always folds once it holds two or more controls and that row shouldn't.
- In dark the ChromeDock, TransportDock and RibbonBar plates are firmer and hide more of the aurora behind them while still showing it, and they blur a little less, 11.2 px against 16; light takes one more step of ink. Hovered buttons are 6.5 % of the dock's text colour in light and 5 % in dark, and the small highlight that followed the pointer is gone. The Apply CSS tab grows to the button height, 40 px on desktop and 44 on touch.
- ChromeDock's icons carry no size class and read the library's `--dock-icon-glyph` through `.dock-glyph`, which 11.2.0 sets at nine tenths of the button where 11.1.0's is half, so they grow to nearly twice today's size; the same token sizes the scene icons in the scene list's rows, which grow with them. TransportDock's Play and the RibbonBar's icons keep their size classes.
- The theme toggle in ChromeDock now draws at full strength rather than slightly dimmed, and its hover is the dock's own. Nothing to change on your side.
- The easing picker opening from the bottom of a phone, and short lists opening at their trigger, come with 11.3.0's menu work, not this release.

Thanks,
Mike

#### gaggle

Hi,

A few small changes reach gaggle's docks in 11.2.0, and one needs a line moved.

- **The report dock's press step.** `.r-dock-seat { --dock-control-active-bg: var(--plate-press); }` in `report/page/PageDock.vue` sets the gliding plate's colour on the nav around the dock. In 11.2.0 the dock sets that token on itself, so a value from higher up no longer reaches inside it, and the plate would change to the dock's own current step. Moving the line to `.r-dock-seat .glass-dock` keeps your press step.
- Every tab seat grows to the button height, 40 px on desktop and 44 on touch: the view tabs, the report dock's sections and the lamp seat.
- Hovered buttons are now 6.5 % of the dock's text colour in light and 5 % in dark, and the current one 10 %, and the small highlight that followed the pointer is gone.
- The theme toggle in the site dock, KitDock and the report dock now draws at full strength rather than slightly dimmed, and its hover is the dock's own. Nothing to change on your side.
- In dark the site dock's and KitDock's plates are firmer and blur a little less, 11.2 px against 16; the report dock is static and keeps its opaque card.
- The hold `shell/Dock.vue` takes while a dock menu is open can go, since a menu or popover opened from a dock button now holds the dock on its own. The top-of-page and Find holds are yours and stay.
- The dock's search slot is gone, which changes nothing for you, since Find is a seat of its own in the pill.

Thanks,
Mike
