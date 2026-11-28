# Challenge to RULINGS-9: consumer impact

claude-opus-5-5 (asserted from its own system identity), 2026-11-27. An adversarial challenger of `RULINGS-9.md`; I wrote none of it. I read, reasoned and wrote; I built nothing, ran no browser and changed no source.

**Read.** `RULINGS-9.md` in full. `audit/dock-usage/USAGE.md`, `SURFACE.md`, `COMPOSITIONS.md`. `audit/INBOUND.md` rows O-354 to O-438. `audit/triage-1119/PLACED.md`. `~/.dev-logs/owner-1112/IDIOM-TOPBAR.md`. `ORCH-LINES-8.md`, `OWNER-READ.md:118-132`, and BM `study/choices/CHOICES.md` (choices 8, 35 to 45), `study/DESIGN.md` §5.3, `waves/BM-8.md` and `BM-11.md`. On `bl/dock/wi8` at `254b3f501` (source at `a5a4fe546`), read only: `GlassDock.vue:60-80`, `ControlsDock.vue`, `DockCrossfade.vue:60-160`, `useDockBody.ts:266-285`, `:528-590`, `:895-910`, `:1030-1160`, `:1205-1265`, `useDockState.ts` (the `alwaysExpanded` lines), `styles/run.css:600-655`, `styles/density.css:60-310`, `styles/morph.css:40-185`, `styles/shape.css`, `styles/crossfade.css:115-140`, `styles/shell.css:300-315`, `styles/index.css` (import order), `README.md`, `index.ts`. On the main checkout: `v11.1.0`'s `run.css` and `DockCrossfade.vue`, and `release/11.1.1`'s commit `6231b371e`.

**Consumer sites read at their current refs** (git show and git grep only; no checkout, no fetch): value.js `origin/master` 561137225 (2026-11-24); daraksha `origin/master` cd9c430 (2026-11-24); fourier-analysis `origin/master` 89337ad (2026-11-24); speedtest `glass-10.1` 4af04ba0 (2026-11-15, its newest ref); slides `npig` 3cec2cb; hassio-config `HEAD` 3115da21 (2026-11-27); atlas `.u-build/atlas-rc` 62405c0 (2026-11-22); the gregg working tree.

Every objection was made, then re-read against the ruling and its evidence. Five did not survive and are listed at the end.

---

## Blocking

### C9-1. RU-127 and RU-135 keep the touch rest-open rule, and it stops atlas's rail from folding on a touch tablet

**Ruling.** RU-127 ("the skip stands") and RU-135 ("on touch such a dock already rests open (`GlassDock.vue:78`)") keep R-2 and name only keyframes's transport as the dock it serves.

**Claim.** R-2 is a changed default: v11.1.0 folds a faceless collapsible dock on a pointer that cannot hover, and the tip does not. A second mounted dock falls under it. atlas's section rail shows at 768 px and wider, which covers an iPad. The rail is `collapse="closed"`, has no `#collapsed`, and atlas built its own fold model for devices that cannot hover. Under R-2 the rail is pinned open there, and atlas's own `collapse()` calls do nothing. Neither the README nor the atlas draft says so.

**Evidence.**
- *Source*: `GlassDock.vue:71-78`, `alwaysExpanded = declaredOpen || (noHover && !slots.collapsed)`. In `useDockState.ts:78-80`, `expand()` and `collapse()` are "no-op when `alwaysExpanded`".
- *Consumer*: atlas-rc `src/platform/chrome/dock/Dock.vue`, the rail: `orientation="vertical"`, `:collapse="homeRail ? false : 'closed'"`, with `#persistent` (the crest), `#default` and `#persistent-end`, and no `#collapsed`. `composables/coarse-reveal.ts:1-45` is atlas's "wide-coarse reveal": on any `(hover: none)` device the rail rests folded, opens on a gesture and stays open until a press outside, which calls `collapse()`.
- *Source*: `README.md:50` says `"closed"` "expands on pointer, focus or a tap on the folded face". `README.md:100-103` says that with no `collapsed` slot "the persistent seats are the whole collapsed face". Neither line holds on a touch screen.
- *Record*: the atlas draft (RULINGS-9.md:480) asks atlas for a `#collapsed` face only so the folded disc is not empty. The keyframes draft (:619-635) does not say its transport now rests open on a phone.

**Remedy.** Either honour a host's explicit `expand()` and `collapse()` under R-2, skipping only the library's own idle fold, or name atlas's rail in RU-127 and put the touch rule in the README line RU-135 adds and in the atlas and keyframes drafts. The rule as written breaks atlas's iPad rail, and atlas cannot fix that in one line: the crest would have to move into `#collapsed`.

### C9-2. RU-126's tall-dock cap reads `--dock-layer-height`, and speedtest's result strip sets it to `auto`, which leaves the strip with square corners

**Ruling.** RU-126: a dock taller than one row takes "the one-row cap from the tokens, as S1 built".

**Claim.** speedtest's `SurveyResultDock` is a two-row strip (pills row and progress row). It sets `--dock-layer-height: auto` on the dock root so the body can size to two rows. On the tip, and in RU-126's tall branch, `--dock-cross` is `calc(auto + 2 * …)`. That makes `border-radius: var(--dock-cap-rest)` invalid when the value is computed, so the corner falls to 0. The carrier then reads that 0 as its cap for every frame. v11.1.0 rounds this strip, because it read the measured cross first. speedtest is on 11.0.1 and gets 16 px corners today. The speedtest draft says nothing.

**Evidence.**
- *Consumer*: speedtest `glass-10.1:src/components/survey/SurveyResultDock.vue:228-252` ("`--dock-layer-height: auto` releases the primitive's fixed single-row layer height so the body sizes to its two-row content"), mounted at `SurveyWizard.vue:39`. USAGE.md:349-351.
- *Source*: `run.css:629` (`--dock-cross: calc(var(--dock-layer-height) + 2 * var(--dock-padding-block))`), `:636`, `shape.css:13`. In `useDockBody.ts:273-276`, `restRadius` reads the computed `borderTopLeftRadius`; an invalid value computes to `0px`, which makes `cap = 0`, and `currentRadius` (`:899-902`) returns `min(…, cap)`.
- *Source*: `v11.1.0:run.css:691` reads `var(--dock-plate-cross-px, calc(…))`, measured first.
- The owner: "docks should almost always be rounded".

**Remedy.** In the tall branch, the carrier writes the cap in px whenever the token cross is not a length. It already reads the root's computed style, and it can take the one-row extent from a seat's measured height. Add speedtest's strip as a corner cell (`--dock-layer-height: auto`, two rows), plus a line in the speedtest draft.

---

## Major

### C9-3. RU-139 changes the end padding without saying how, and five sites set only one of the two paddings

**Ruling.** RU-139: "The horizontal default's inline padding takes the block padding's value (0.5rem) … (and any density whose two paddings differ)."

**Claim.** The ruling never says whether the change is (a) the inline fallback value going from 0.75rem to 0.5rem, or (b) inline reading the block token. Under (a), every site below that sets one axis stays off concentric. Under (b), the inline knob those sites set stops working without notice. Either way, the drafts promise concentric ends to sites whose own lines prevent them. "Any density whose two paddings differ" also covers the cockpit preset (inline 6 px, block 4 px), which atlas's four figure docks use. No draft tells atlas.

**Evidence.**
- *daraksha*: `SiteDock.vue:377` sets block to `--site-dock-pad` (0.375rem). `:413-416` sets inline to 0.375rem on a phone only, with the comment "a desk keeps glass's own, the room a page's wide control (the Portraits' terms) needs to stay inside the plate as it folds". `:505` sets the theme seat's inline to the pad "on every side". Further lines: `ControlsSeat.vue:254` (inline 0.375rem on a phone, a vertical dock there) and `scripture/PhraseTray.vue:235` (inline 0.25rem). The daraksha draft (RULINGS-9.md:588-605) says nothing about ends.
- *gregg*: `src/style.css:516-517` sets block 0.25rem and inline 0.375rem, and `:1179` sets inline 0.25rem on a phone. `Figure.vue:1418-1426` reserves a pre-mount seat of 6rem "as the mounted dock measures". The gregg draft (:568) says "The end buttons sit concentric".
- *fourier*: `AppDock.vue:1006-1015` sets only `--dock-padding-block` (compact, 4 px) in short landscape. The fourier draft (:512) says "The end buttons sit concentric".
- *atlas*: `density.css:154-159` gives the cockpit preset block 0.25rem and inline 0.375rem. USAGE.md:227-239 lists atlas's `data-preset="cockpit"` on PlateDock, PlateControls and the scene head.
- *Source*: RU-139's reason says "the vertical dock already sets one padding on every side (`shell.css:311`)". But `morph.css:96-101` (`.glass-dock.vertical { padding-inline: var(--dock-padding-inline); padding-block: var(--dock-padding-block) }`) is imported after `shell.css` (`index.css:42`, `:56`) and wins. That is why a default vertical dock has 8 px ends against 12 px sides, the demo rail O-428 reported.
- keyframes and value.js docks become 8 px shorter, and neither draft says so (value.js colour's widths are quoted at :580).

**Remedy.** Name the form. Form (b) gives concentric ends wherever a site set only block, but it retires daraksha's and gregg's inline knob. The consumer update is then to delete the line, which is allowed in this release once the sites are told. List the eight lines above in RU-139's Touches. Correct the gregg, fourier and slides drafts to "unless you set one of the two paddings", and add an ends line to the daraksha, keyframes, value.js and atlas (cockpit) drafts.

### C9-4. RU-133 keeps choice 41's "nine tenths of the seat", but the source sizes the glyph from the row, so slides's icons fill their buttons

**Ruling.** RU-133: "Icon-only seats stay at nine tenths."

**Claim.** The ratified wording is "nine tenths of the seat for an icon-only seat" (CHOICES.md, row 41). The source computes `--dock-icon-glyph` from `--dock-layer-height`, not from `--dock-control-size`. slides sets the seat to 2.25rem and leaves the row at 2.5rem, so a 36 px glyph fills a 36 px button: ten tenths, with no room for the hover fill around it. The slides draft records this ("36, the full width of your 2.25rem buttons", RULINGS-9.md:615) without calling it a fault.

**Evidence.** *Source*: `density.css:219-226` and the coarse block `:255-263` (`calc(var(--dock-layer-height, …) * var(--dock-icon-glyph-ratio))`). *Consumer*: slides `npig:src/deck/DeckView.vue:212` (`--dock-control-size: 2.25rem`, no `--dock-layer-height`). O-374 lists "room for the hover fill at a high glyph share" among daraksha's asks.

**Remedy.** Key an icon seat's glyph to `--dock-control-size`, which matches the ratified "of the seat" for every site, or give slides the one line `--dock-layer-height: 2.25rem` in its draft. The first is a value change inside density.css, and the slides draft then reads 32 px.

### C9-5. RU-165's cell does not build Home Assistant's composition, so it can pass while the cause of O-427 (2) remains

**Ruling.** RU-165: "on w-seat and w-trigr, each seat chosen in turn: every seat's inline size changes 0 px … Plant: g4-openseat."

**Claim.** O-427 (2) names the cause: when chosen, the current page seat changes from a `DockControl` tab into a `DockTrigger`, adding a chevron and the trigger's padding. w-seat swaps `aria-current` on DockControls. w-trigr holds triggers that never change component. Neither cell swaps a tab for a trigger. The plant brings back the widened open seat, a different widening. The HA draft promises "the dock doesn't grow when a page is picked" (RULINGS-9.md:523).

**Evidence.** INBOUND O-427 (2) (`DockTrigger.vue:103`, `controls/triggers.css:160-172`). HA `HEAD:frontend/src/tiles/dock_parts.ts:7-9`: "On a computer the current tab with floors is glass-ui's `DockTrigger` for the floor choice (`dock_menu.ts`), with a chevron after its word". HA imports `ChevronDown` there itself. The harness cells are at `demo/__anim/mounts/dock-wi8.vue:419-434` (w-seat) and `measure/harness/m9/dock-wi8.vue:795-806` (w-trigr).

**Remedy.** Add a cell with HA's form: worded `DockControl shape="tab"` seats whose current one renders as a `DockTrigger for="dropdown"` with the same word, each chosen in turn, with 0 px change in inline size for every seat. Its plant is today's trigger padding and chevron. Name the cure, either equal tab and trigger inline padding with the chevron inside the box or glass drawing the mark through the trigger's own icon. Then tell HA in its draft whether its own `ChevronDown` after the word still takes width.

### C9-6. The keyframes draft puts in 12.0.0 what choice 39, ratified, puts in this release

**Ruling.** RU-144 ("Choice 39's default, ratified, is that the dock opens around its centre except where a site asks (keyframes's Play slides 38 to 109 px) … 0 px holds on the side a site anchors") against the keyframes draft (RULINGS-9.md:626).

**Claim.** Choice 39's default for this release is "11.2.0 opens to one side only where a site asks". Its 12.0.0 half is making that the rule for every dock. keyframes is the site that asked (O-386). The draft tells keyframes that "Play still slides … A dock in a row keeps pushing its row in this release, so `anchor` has nothing to hold there. Whether a dock should open away from its one always-shown button is a 12.0.0 question." keyframes's transport is not pushing a row: it is an in-flow dock in a fixed wrapper centred at the bottom (the harness's `w-kf`). The README's recipe for holding an edge (a wrapper sized to its content at that edge, README.md:68-76) is the way keyframes asks, and the draft does not give it.

**Evidence.** CHOICES.md row 39. OWNER-READ.md:125-126 (question 15, default "the button stays under the pointer and the dock opens away from it"). RULINGS-9.md:177, :180, :626. The README's anchor paragraph.

**Remedy.** Rewrite the keyframes line with the recipe (lay the transport at its Play side's edge, so Play holds and the dock opens away from it), with a ride cell on `w-kf` in that form. If the recipe cannot hold Play at 0 px, RU-144 says so and the point goes back to the owner, since he ratified it for this release.

### C9-7. RU-128 removes a behaviour value.js works around, and neither the ruling nor the value.js draft names it

**Ruling.** RU-128: inside a dock, DockCrossfade neither observes nor measures. Its Touches name no site.

**Claim.** value.js's top dock nests `<DockCrossfade reserve="inline">` inside the dock (the action row against the colour input). It keys that crossfade on its kept-seat count only to escape the peak latch. On v11.1.0 the reserve applies inside a dock. On the tip, R-5 drops it there (`reserveStyle` returns `undefined` when `dockBody` exists), and RU-128 removes the measure, so `reserve="inline"` silently does nothing in value.js's one use. The change also retires value.js's `:key="kept"` remount. That is an addition retiring a named site workaround, but the ruling never names it.

**Evidence.** *Consumer*: value.js `origin/master:demo/shell/dock/layers/ActionBarLayer.vue:133-140` ("glass's `<DockCrossfade reserve=\"inline\">` latches the PEAK face width … The crossfade is therefore keyed on the kept count") and `:240-244`. *Source*: tip `DockCrossfade.vue:99-106` and the R-5 comment above `useOptionalDockBody()`, against `v11.1.0:DockCrossfade.vue:99-108`. SURFACE.md:48 lists value.js as the only user. `README.md:25` gives no note.

**Remedy.** Name `ActionBarLayer.vue` in RU-128. Add a README line saying `reserve` applies only outside a dock. Add a line to the value.js draft: inside the dock, `reserve="inline"` and the `:key="kept"` can go, because the plate glides to each face's width. Each is a one-attribute delete.

### C9-8. RU-130's condition for removing RU-38's guard reads only Chromium layout counts, while the harm a site would see is a ResizeObserver loop error in WebKit

**Ruling.** RU-130: RU-38's observer guard goes "only if its removal adds no forced layout in G-11's trigger and landing frames and in the many-dock first frame".

**Claim.** The guard returns from a ResizeObserver delivery without reading layout when every entry's box equals the held box. Without it, `sync("ro")` reads layout inside the delivery. O-391 shows that a layout read inside a delivery is the WebKit trigger for "ResizeObserver loop completed". value.js's colour specs fail on that error (O-360 to O-360d, O-373), and Gregg reported it from a dock writer (O-383 (3)). A Chromium layout count does not read it. RU-123's `hold.sh` leg carries only the mount plant.

**Evidence.** *Source*: `useDockBody.ts:1217-1238` (`onResize`, `heldSize`). INBOUND O-391 ("a plain page with no glass code reproduces it 3/3 with a getBoundingClientRect read, 0/3 without"), O-373, O-383 (3).

**Remedy.** Add a second plant to RU-123's WebKit run: the guard removed, `hold.sh` `baseline` and `baseline-nohold` against the tenth preview, and `tests-visual/ro-loop.spec.ts`'s resize-mid-morph cells. The guard goes only if neither raises a loop error from a dock.

### C9-9. RU-159 presents question 27 as "new, from atlas", but four sites asked, two still carry hand-built workarounds, and their drafts say nothing

**Ruling.** RU-159 and question 27 ("A dock with more buttons than fit (new, from atlas)").

**Claim.** The overflow menu was asked by value.js (O-85, 2026-09-25), fourier (O-387 item 4), Home Assistant (O-358's compact many-seat form) and atlas (GL-9). The owner's top-bar idiom states it as rule 5 ("what does not fit goes behind one 'more' seat"). RULINGS-6:192 struck it, and choice 40 settled the cue only. value.js's code waits on it by name. With the default "no", value.js's and fourier's hand-built measures become permanent, and neither draft tells them. The owner would answer question 27 without knowing that two production docks carry a workaround for this exact ask.

**Evidence.** INBOUND O-85 and O-387. `INPUT-fourier-stage-dock-2026-11-16.md:8`. value.js `ActionBarLayer.vue:125-140` ("When glass O-85 DOCK-PRIORITY-OVERFLOW lands, this measure is retired for it"). IDIOM-TOPBAR rule 5. The value.js and fourier drafts (RULINGS-9.md:497-515, :574-586).

**Remedy.** Question 27 names all four askers and the two workarounds it would retire. The value.js and fourier drafts each get a line saying the menu does not come in this release and their measure stays.

### C9-10. RU-146's list of 11.1.2 cures omits daraksha's seat ring (O-437 (3)), and the carrier has a clip that cuts it

**Ruling.** RU-146 lists the 11.1.2 cures M0 brings to the carrier's paths. O-437 (3) is not on the list. RULINGS-9 read INBOUND up to O-436, and O-437 arrived about ten minutes before the file was written.

**Claim.** O-437 (3) is placed in 11.1.2 together with G-F (value.js four-site item 2, already in 11.1.2). G-F's clip is `crossfade.css`'s face clip, which wi8 deleted. So M0 resolves that hunk onto nothing, and the cure has no form on this branch. The carrier's seat cut is `inset(0 cut 0 0)`, zero on the cross axis. It cuts a seat's outer ring at top and bottom on every frame a growing seat is cut: a current seat whose word grows, such as RU-149's carriage, or HA's current worded tab. BM-11 relies on "11.1.2's cure for O-437 (3)" to keep daraksha's 1.5 px ring whole.

**Evidence.** INBOUND O-437 (3). daraksha `SiteDock.vue:406-407` (`--dock-active-shadow: 0 0 0 1.5px …`). *Source*: `useDockBody.ts:1094-1095`. `crossfade.css:130` ("the face's own posture clip is deleted"). `BM/waves/BM-11.md` ("The rests"). *Hypothesis* until a cell reads it.

**Remedy.** Add O-437 (3) to RU-146 with its carrier form: the seat cut takes a negative cross-axis inset equal to the reach of `--dock-active-shadow`. Add a cell: daraksha's ring whole on every frame of an open and of a current seat's label growth, in both engines.

---

## Minor

### C9-11. The gregg draft does not say that `reduceFold` stays through this release

O-364 (1) was placed with the line "the box does not change size in a single frame (Gregg's stand-in … that is the behaviour to match)" (`driver/glass-11.1.1-scope.md:116`; exits scope row 8). 11.1.1 built "the box landing at once" (`6231b371e`). RU-143 keeps "R-11's one-frame rest", and BM-11 puts the fold's dip in 12.0.0. That sequence is consistent with choice 8 A as BM schedules it, but gregg's stand-in (`dockFold.ts`, USAGE.md:314-317) is then needed until 12.0.0. *Remedy*: one line in the gregg draft.

### C9-12. RU-137 promises the sites' messages will name the docks whose selected words fall under 4.5, and no draft does

RU-137 (RULINGS-9.md:132): "The docks are named in the README's contrast note and in the sites' messages." No draft mentions a selected word under 4.5 or a warm dark ground in that sense (checked: :471-651). *Remedy*: name the site docks that sit on a warm dark page with a selected tab, or strike "and in the sites' messages".

### C9-13. The README still lists the deleted `search` slot

`README.md`'s slot list keeps "`search`: a search field inside the dock's morph; authoring the slot enables it". `index.ts:69-70` records it deleted, and the atlas and gaggle drafts say it is gone (RULINGS-9.md:492, :649). atlas asked for that helper (O-413 G9). *Remedy*: drop the line in the README pass the ready list already names.

### C9-14. RU-131's ask to the orchestrator leaves out the reading that kept daraksha on 11.0.2

RU-131 moves G-16's bound to v11.1.0's 104,297 B. O-384 records that 11.1.0's dock growth (about 1.6 KB gz) is what put daraksha's routes at 126.4 KB against a 125 KB cap. The reader's cap is now 126, and the total has about 6 KB of room (ORCH-LINES-8). The tag gate does read daraksha's routes, but the orchestrator should see O-384's figures, and BM-1's +226 B, beside the ask. *Remedy*: put those numbers in "Asked of the orchestrator" item 1.

### C9-15. RU-142 says the preset's "three lines" read the new tokens; the preset sets five

The controls preset sets `--dock-control-size`, `--dock-layer-height`, `--dock-padding-block`, `--dock-padding-inline` and `--dock-corner-inset` (`density.css:281-289`). If only three are rewired, changing `--dock-controls-size` moves the seats but not the folded floor (`morph.css:176` reads the layer height). Changing `--dock-controls-edge` moves one padding axis and breaks RU-139 for the preset. RU-142's witness changes "one token". *Remedy*: wire all five, and plant each of the three tokens in turn.

---

## Dropped on the second judgment

- **Home Assistant under the touch rest-open rule.** HA's dock now passes `collapsed` (`GlassTabs.ts:340-354` at 3115da21), so R-2 does not pin it.
- **RU-136's claim that no released site mounts a dock that pushes a row.** value.js's top dock sits in flow in its band with only an absolutely placed lamp beside it, gregg reserves the open width itself (`Figure.vue:1233-1235`), and keyframes's transport is alone in its wrapper. No counter-example held.
- **RU-130's removal of the fit memory.** The ready list keeps `w-pwords` GREEN, which is the cell RU-54 used for the fit flag at the edge, so behaviour stays guarded.
- **RU-141's `100vw` cap.** Six seats come to 312 px, so the cap does not bind for any composition a site mounts.
- **The atlas draft's toggle question.** atlas wraps glass's `DarkModeToggle` (`DockThemeToggle.vue:6`), so the question applies.

## Additions checked for a retired workaround

| ruling | site workaround it retires | named in the ruling? |
|---|---|---|
| RU-128 (DockCrossfade guard) | value.js `ActionBarLayer.vue:240-244` (`:key="kept"`, `reserve="inline"`) | no (C9-7) |
| RU-141 (preset width under `within="parent"`) | the README's untrue `within` line. fourier's draft moves StageDock to `within="parent"` | yes, the README; fourier's case not named |
| RU-142 (three page tokens) | atlas's literal head-row margin | yes |
| RU-146 (`data-summary`, `data-persistent`, `composedPath()`) | daraksha's reader frame cost (O-433); HA's `collapse: false` hold (LF-56) | yes |
| RU-165 (choosing a seat changes no width) | HA's widening current tab (O-427 (2)) | named, but its cell does not build HA's form (C9-5) |
