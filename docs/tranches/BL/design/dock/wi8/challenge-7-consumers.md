# Challenge to RULINGS-7: consumer impact

Seat: an independent challenger, claude-opus-5-5, in the seat written for Fable (out of quota until 2026-11-21; design, ruling and critique seats run on Opus until then). 2026-11-17. Read-only: no build, no browser, no source change, nothing staged. I wrote none of the rulings.

**Read.** `RULINGS-7.md` in full; `RULINGS-6.md` (rulings, triage, final lists), `ORCH-LINES-6.md`, `challenge-6-consumers.md`, `fold-6.md`; `audit/dock-usage/USAGE.md`, `SURFACE.md`, `COMPOSITIONS.md` in full; `INBOUND.md` rows O-354 to O-388 with their lettered rows. On `bl/dock/wi8` (src `943fe6e9d`, pass `3a923d2ea`): `GlassDock.vue:60-200`, `:440-470`; `ControlsDock.vue`; `styles/dock.css:100-140`, `:200-240`; `styles/morph.css:196-310`; `styles/adaptive-legibility.css:70-115`; `styles/shell.css:255-268`; `styles/controls/tab-button.css:15-40`, `:54-97`; `styles/controls/icon-button.css:236-275`; `styles/glass/veil.css:20-100`; `styles/tokens/glass.css` (the veil and level lines); `tokens/property-regs.css:154-158`; the diffs of `ModalOverlay.vue`, `DialogContent.vue`, `SheetContent.vue` against `99a1389e6`; logs `m7p-names.txt`, `m7p-g16.txt`, `m7-appgrep.txt`; harness `m7/g16.sh`, `m7/appgrep.mjs:1-40`, `dock-wi8.vue:40-55`, `:918-930`. On the main checkout, `git show v11.1.0` of `useDockRunMark.ts` and its log, and `git ls-tree` of master's and the branch's `tests-visual/`. Consumer trees, read only: gregg (working tree, on 11.1.0), fourier-analysis `origin/master` 67a0c57, value.js `origin/master` d7df97f9e, daraksha `origin/master` 919090c, keyframes.js `origin/master` d92c7a53, atlas `.u-build/atlas-rc` 88bde3b, speedtest 4af04ba0, gaggle-site 39803b7, slides 3cec2cb, sci-report bbcbd503, Home Assistant `apx-ui-r11/frontend/src` b48da4b0. Not read: the strips (my lens reads source and records, not paint), any running page.

Each objection was made, then re-read against the ruling and the evidence. Those that did not survive are listed at the end.

## What holds

- RU-78's removals. `pinned`, `update:pinned`, `data-dock-scope` and the exposed `controlCount` were added since v11.1.0 and no app source or test names them (`m7-appgrep.txt:260-275`; the grep covers tests, as C-1 asked). keyframes reads the exposed `isPinned`, which stays (`GlassDock.vue:451-462`).
- The seventeen removals in `m7p-names.txt` leave every exposed member of v11.1.0 in place: `isHeld` and `isTransitioning` (fourier, keyframes), `graspHeld` (keyframes's test). `DockControl.type` stays (value.js's `type="submit"`).
- RU-76 moves no site's folded glyph. gregg wraps its chevron in a span (`Figure.vue:1072-1075`, `HeroPlate.vue:1128-1131`); fourier's folded faces are a text mark, a wrapped glyph and a div (`AppDock.vue:368`, `CanvasControlsDock.vue:64-67`, `AnimationControls.vue:96-109`); daraksha sizes its direct `PageIcon` svg with its own unlayered class (`PageIcon.vue:26-29`) over glass's `@layer components`; atlas's More handle has a size class and its draft says so.
- RU-72 and RU-85: `ModalOverlay` is internal, with two callers (`DialogContent.vue`, `SheetContent.vue`), and is not exported. No site's attribute moves.
- RU-79's fold at every width matches fourier's canvas and editor docks (`collapse` at its default), atlas's `PlateDock` and daraksha's several-action seat. `expand-on` reaches GlassDock through ControlsDock's `v-bind="attrs"`, so a press-opened dock keeps its press.
- Home Assistant: every glass root sits in `.glass-root.dark` (`core/define.ts:110`), so O-358 (5)'s shadow-root gap does not reach RU-67's descendant selector.
- The speedtest draft is right that `DockBackgroundToggle` survives only in comments (`src/components/Dock.vue:394`, `src/App.vue:388-393`).

## Blocking

### C7-1. RU-66: "superseded by the deletion" removes 11.1.0's gliding nav mark, which gregg adopted in two docks.

Ruling: "a commit whose file the redesign deleted (`useDockRunMark.ts`, `dockMorphMeasure.ts`) is superseded by the deletion and its release spec is read."

Evidence:
- `useDockRunMark.ts` holds a feature, not a fix. v11.1.0's `1263cd5cf` is "feat(dock): content-sized collapsed face, gliding nav mark, border-edge progress rim", and seven fixes follow it (`33a826d11`, `bd16cb097`, `55c5dc48d`, `0bd7ed13d`, `ecefe3260`, `df8a65446`, `02d13a4c7`). It paints one plate per navigation run on the seat carrying `aria-current` and moves it between seats on the dock spring (v11.1.0 `useDockRunMark.ts:1-8`, `:61`).
- gregg pins 11.1.0 (`package.json:17`) and builds two docks on it: `PageDock.vue:51-53` ("The current section's mark is glass's own run mark (11.1.0, O-188/O-246): it glides on dock"), `HeroPlate.vue:583-585`; `style.css:497-503` ("The current control is then told by the gliding mark under its label alone"); `lib/motion.ts:393-396` (`indicatorSpring` waits for the mark to land). O-383 records gregg retiring its own indicator on 11.1.0 for this mark, and the tree no longer has `dockIndicator.ts`.
- RULINGS-4:157 moved the mark to 12.0.0 because "moving it costs 11.2.0 nothing it has today". That was read on the branch's base, `99a1389e6`, which RULINGS-7's own first finding shows predates 11.1.0. Against v11.1.0 it costs a shipped behaviour.
- No gate sees it leave. The mark's witness on master is a unit test, `tests/components/custom/dock/GlassDock.run-mark.test.ts`, which leaves with the file; RU-66 widens G-14 by `release-11-0-2*` and `ro-loop*` only, and master has no 11.1.0 visual spec set.

What breaks for gregg at the bump: each tab paints its own current fill (`tab-button.css:96-97` on the branch), so the section mark in PageDock and the arrangement mark in HeroPlate stop travelling between seats, in a dock whose site says that mark is the only thing marking the current control. Getting it back means rebuilding the indicator gregg deleted, which is not a one-line update. The gregg draft says nothing of it. The owner's words: nothing changes instantly, every change tweens in and out with weight.

Remedy: RU-66 names `1263cd5cf`'s mark and its fixes as a shipped 11.1.0 feature. Either the merge carries `useDockRunMark.ts` onto the redesign's run, with the run-mark unit test kept as a G-14 witness and a plant (the mark's write removed), and the line arithmetic stops counting its +281 as "going with files the redesign deleted"; or the regression goes to the owner as a question, default "carry it", and the gregg draft states the outcome before the tag. "Superseded by the deletion" is not open to a feature a site has adopted.

## Major

### C7-2. RU-67: the drafts and RU-83's wash-tier strip assume a reach the level does not have.

Ruling: dark at level 0.7 on `.dark .glass-dock`; the step-10 drafts tell sites their dark plate firms "about a third"; RU-83 shows "a dock on the wash tier (gregg's pair docks) beside a default one at the dark level (C-6)".

Evidence:
- A static dock's plate sets its own level over an opaque card: `.glass-dock[data-backdrop-mode="static"] .dock-plate { --glass-level: 1; background: linear-gradient(var(--glass-veil), var(--glass-veil)), var(--card) }` (`adaptive-legibility.css:92-102`). The root's 0.7 does not reach it.
- Every atlas dock is static (atlas-rc `Dock.vue:447`, `:526`, `PlateDock.vue:152`, `PlateControls.vue:121`), every gregg dock is static (`PageDock.vue:523`, `Figure.vue:1051`, `HeroPlate.vue:1076`), and so is gaggle's report dock (`dashboard/src/report/page/PageDock.vue:75`).
- speedtest replaces the composed veil on the plate itself: `.glass-dock .dock-plate { --glass-veil: var(--material-bg-dock) }` (`src/design/register.css:240-244`), unlayered, over the layered `--glass-veil` of `@utility glass-plate` (`glass/veil.css:75-81`), which is where `--glass-level` enters. Its plate paints `--material-bg-dock` at every level.
- So the drafts are false for atlas ("In dark mode its plate is firmer ... Worth a look at your figure docks in dark"), gregg ("The plate is about a third firmer, which mixes your pair docks' wash tier toward the card colour by that much"), sci-report (it shows atlas's docks) and speedtest ("The tier `design/register.css` sets on the dock is mixed about a third of the way toward the card colour"). The live docks that do change get no line: value.js (its band is measured off `.dock-plate`, `color-session/ink.ts:19-23`, `useContrastSafeColor.ts:57`, `:76`), keyframes (ChromeDock over the aurora canvas, TransportDock, RibbonBar) and gaggle (site dock and KitDock, no `backdrop-mode`).
- RULINGS-6's C-6 premise (gregg's pair docks, speedtest and slides flattened by the level) holds for slides alone, so RU-83's wash-tier row models a dock gregg mounts static.

Remedy: RU-67 carries a reach table from these source facts. Firmer in dark: value.js, keyframes, fourier, daraksha, gaggle's site and kit docks, Home Assistant, slides (after C7-3). Unchanged: atlas, gregg, gaggle's report dock, speedtest. The drafts follow the table, and value.js is told its measured band firms in dark. The wash-tier row is relabelled as slides's case (`decks/parkway-lab/theme.css`, live tiers) or dropped.

### C7-3. RU-67 and RU-68: the dark arm misses a dock that carries `.dark` itself.

Ruling: "`dock.css:216-220`: `.glass-dock { --glass-level: 1 }` and a plain `.dark .glass-dock { --glass-level: 0.7 }`"; RU-68's fill steps take "a dark arm beside RU-67's".

Evidence: slides mounts `<GlassDock class="deck-dock" :class="{ dark: activeDark }" :collapse="false">` (`src/deck/DeckView.vue:144-147`), where `activeDark` is the current slide's flag (`:65`) and the document's class is the site theme (`main.ts:32`). GlassDock puts the class on its root (`GlassDock.vue:66`, `:468-469`). `.dark { color-scheme: dark }` (`tokens/dark-arm.css`) then darkens every `light-dark()` colour inside the dock, but `.dark .glass-dock` needs a `.dark` ancestor. On a dark slide in a light site the dock takes dark colours, level 1 and the light fill steps: the clear dark plate the owner called "a bit too transparent". The slides draft promises the firmer plate.

Remedy: the arm is `.dark .glass-dock, .glass-dock.dark` for both the level and the fill steps, still a plain per-mode arm with no `light-dark()` for a number. RU-67's witness gains one cell: computed `--glass-level` 0.7 on a `.glass-dock.dark` in a light document. The shell's existing dark blur arm (`shell.css:263`) takes the same selector.

### C7-4. RU-67: a plate that copies the dock's material outside a dock stays at level 1 in dark.

Ruling: the dark level is set on `.glass-dock` only.

Evidence: daraksha's neck, the waist of glass between its site dock and theme dock during the fission, is `<span class="neck glass-plate">` outside both docks (`SiteDock.vue:275`, between `</GlassDock>` at `:273` and the theme dock at `:277`), with `--glass-veil-tier: var(--glass-veil-dock)` and the dock's blur (`:525-527`). Outside a dock `--glass-level` is its registered initial 1 (`tokens/property-regs.css:154-158`). RULINGS-6's ADDS tells daraksha to move its two bare plates (`Star.vue`, `Clasp.vue`) to "the `glass-plate` utility at the dock's rung, not a dock". Under RU-67 the docks are 0.7 in dark while the neck and that recipe are 1, so the waist reads clearer than the two plates it joins and the bare plates stop matching the theme seat. The daraksha draft names neither.

Remedy: the README's recipe for a plate that matches the dock carries the dark level (`.dark` arm, 0.7); the daraksha draft names the neck and the bare-plate recipe; RU-85's daraksha ground reads the fission in dark at the ruled level.

### C7-5. RU-77: the closure is the dock alone, not the page the blocked site budgets.

Ruling: G-16 reads "the closure from `glass-ui/dock`, gzipped file by file", because "the site behind the gate budgets bytes per page (value.js: 125 KB a page), which is the closure".

Evidence: `m7/g16.sh` follows `import ... from "./x.js"` out of `dist/dock.js` and sums each file gzipped alone. A non-entry chunk exists because more than one entry imports it, so every non-entry file in both closures (26 for v11.0.2, 18 for the tip, `m7p-g16.txt`) is shared with another entry, and a page saves a chunk the dock stops importing only if it loads no other importer. Every app that mounts a dock also loads `/dock-trigger` or overlay entries for what its dock holds (USAGE.md: six apps import `DockTrigger`, and each app's main dock holds a DropdownMenu, Select, Popover or Tooltip). O-384's site budgets the page (472 KB total, 125 KB a page; 473.3 and 126.4 with 11.1.0). The entry grew 5,253 B, which a page pays in full, while part of the closure's 2,997 B fall may be chunks the page still loads for its menus. The value.js draft ("what a page downloads to show a dock, that file plus the chunks it pulls in, came to about 35.8 KB ... against 38.8 KB") states a page figure the method does not read.

Remedy: the gate stays as RU-77 writes it. Beside it, one reading on v11.0.2 and on the merged tree: the union closure of `dock`, `dock-trigger`, `dropdown-menu`, `select`, `popover` and `tooltip`, each file counted once. The value.js draft gives that union as the page figure, or asks value.js to run its own budget on a tarball of the merged build before the tag.

### C7-6. RU-79 and two drafts name a fold the sites do not have.

Ruling: "The three sites the cells model fold at 1440 today with `GlassDock collapse="closed"`"; the keyframes draft: "the controls preset folds the code panel's dock on desktop once it holds two or more controls"; the sci-report draft: "the filters can move to it and keep folding on desktop as they do today".

Evidence: keyframes's code-pane dock is `<GlassDock fit-content :collapse="false">` (`demo/components/instrument/pane/RibbonBar.vue:76`, d92c7a53), COMPOSITIONS.md's composition 10 ("Never folds"). The `w-kfcode` cell mounts it as a ControlsDock with `collapse="closed"` (`harness/dock-wi8.vue:921`). RibbonBar holds four controls, so moving it to the preset makes a row that never folds fold after the linger, and RU-79 gives the preset no way not to fold ("No prop returns"). sci-report's own tree mounts no GlassDock (bbcbd503; USAGE.md:250-252); the figure docks it shows that fold are atlas's `PlateDock`.

Remedy: the keyframes draft says the code pane stays a GlassDock with `:collapse="false"`. RU-79 names the sites behind "the three sites", with `w-kfcode` relabelled as a cell rather than keyframes's dock, or its scenarios dropped from the fold count. The sci-report line moves into atlas's draft as `PlateDock` to ControlsDock (with `expand-on="press"` passed through), or goes.

### C7-7. A silent drop: O-386's one cross extent.

Ruling: RU-84 gives RU-61 "one more prototype round on its named faults" (the legend's 28 px, the transport's 4 px, the extra layout).

Evidence: O-386, value.js's hover sweep: "the folded face is 40 px and the open row 48 px, so opening lifts the plate and a neighbour 8 px (`morph.css:205-221`)", booked "W-I.8 input (... one cross extent in both postures)"; `INPUT-hover-shift-2026-11-15.md:17`; RULINGS-6 RU-61: "One cross extent in both postures for a one-row dock is read, and cured only if RED (value.js's 40 against 48 px)". Neither MEASURE-6 nor MEASURE-7 has the reading, and neither RU-84, the eighth pass's order nor the ready list carries it. value.js's top dock sits in flow in a top band (USAGE.md:35-36), and O-366 binds: "hovering over cards/dashboard items should not shift the main cards or vizzes around". RU-61 was RED in both engines at `458e66e58`; if it stays out of 11.2.0, this is the one in-flow shift left that a minor can cure, and it needs no margin.

Remedy: one reading in H, both engines, 1440 and 390, on value.js's composition and `w-inflow`: the plate's block size folded and open. A cure in S if they differ, with a plant. RU-75's seat extent may already close it; the reading says so. It does not wait on RU-84.

## Minor

### C7-8. O-380's "dock pinned on touch" is named nowhere.

O-380 books fourier's eighteen standing reds ("4 to 8 px dock row overflow, the dock pinned on touch") to "W-I.8 (the fit law, RU-39)". No file under `design/dock/wi8/` names O-380 or a dock pinned on touch, and the fourier draft says nothing of the reds. The draft should say which booked reds 11.2.0 is read to cure (the row overflow, by RU-39) and that the pinned-on-touch red is unread, or a cell on fourier's AppDock composition at 390 touch reads it.

### C7-9. The gregg draft names code gregg no longer has and a fill step it may not want.

- "The code that sizes it from the plate's radius can go": gregg removed it on 11.1.0 (O-383, "the rim stopgap"). Its rim is `edge="border"` and inherits `--radius-dock` (`PageDock.vue:242-244`, `:610-612`). USAGE.md:263 predates that.
- "The `--dock-control-active-bg` override can go": gregg's dark value is 24 % of its ink (`style.css:494-496`), against RU-68's dark candidates of 10, 12 and 14 %. The draft gives the step taken and leaves the choice to gregg.

### C7-10. The atlas draft: `hover-intent`, and a third rim site.

- The lt-integ `PlateDock` line RU-78 cites for `run` also passes `:hover-intent="HOVER_INTENT_MS"` (`m7-appgrep.txt:261`), which is not a GlassDock prop. RULINGS-2:40 made it the `--dock-intent` token, which the branch reads (`useDockState.ts:520`). "Unchanged for you. `run="plain"` stays as you use it" should add that the attribute does nothing and the token replaces it.
- atlas's rail and phone bar carry their own `DockProgressRim` in `#persistent` (atlas-rc `Dock.vue:473`, `:539`; SURFACE.md:218). RU-78's rim grep names gregg and fourier only. fourier's line exists (`AppDock.vue:371-373` teleports a `ScrollProgressRim` into the dock's root), so `#rim` stays either way; atlas belongs in the grep and the draft.

### C7-11. The fourier draft leaves out StageDock.

`web/src/components/shared/StageDock.vue` folds with `expand-on="press"` and does by hand what G-8 now builds: a counted `keepOpen()` and a collapse after an outside press within 600 ms (`:67-71`). It is the dock RULINGS-6's ControlsDock recipe was written for (O-387). The draft names the canvas and editor docks and "your menus". It should name StageDock and the two pieces it can delete.

### C7-12. RU-75's taller tab seat is told to two sites of six.

RU-75 raises a tab seat from 38.59 to 40 px at 1440 and from 38 to 44 px at 390 wherever a site sets neither `--dock-tab-h` nor `--dock-tab-min-height` (`tab-button.css:26`). Home Assistant and speedtest set them and keep theirs (USAGE.md:413-414, :335-338). The change lands on gaggle's view tabs, gregg's PageDock and HeroPlate runs and keyframes's Apply CSS tab; only the Home Assistant and atlas drafts mention it. One line in each of the other three.

### C7-13. RU-69: daraksha's veil lines are now the default; value.js was told the token is the knob.

daraksha sets `--glass-veil-dock: var(--glass-veil-base)` on its site dock and controls seat (`SiteDock.vue:373`, `ControlsSeat.vue:125`), its answer to the owner's frame 120. The branch's default is the same (`glass.css:135`), so daraksha loses nothing whichever way RU-69's reading goes, and its draft can say both lines can go. On RU-69's second outcome a comment is corrected, but O-370 told value.js that `--glass-veil-dock` is the supported knob for the plate's ink; the value.js and daraksha drafts then say what does move the dock's veil.

## Dropped on the second reading

- *RU-69 as a fault at daraksha.* The branch's default veil equals daraksha's override, so nothing it set is lost (C7-13 keeps the message).
- *RU-75 on daraksha's `compact` page seats.* The labelled-seat selector reads its wrapped picture (`SiteDock.vue:253`) as a word, but daraksha's control size is its own seat token, so the new `min-block-size` is no larger than the seat renders. No reading shows a change.
- *RU-76 enlarging gregg's chevron beside its words.* The chevron sits inside a span, not directly in the face.
- *RU-67's dark arm at Home Assistant.* `.glass-root.dark` is an ancestor inside every shadow root.
- *RU-68's full trigger ink retiring the `--muted-foreground` rebinds at gregg, value.js and speedtest.* The trigger's dimming is `--opacity-icon-muted`, a different knob; gregg's rebind answers `adaptive-legibility.css:70-73`, which the branch still has, and speedtest's serves its own step label.
- *gaggle's dock clipping at 360 to 430 and its 17 px DockTrigger (O-362a).* Booked in O-349, outside this range.
- *O-376 (b), the rail with only persistent seats on touch.* Carried as `w-railp` (`dock-wi8.vue:52-53`).
