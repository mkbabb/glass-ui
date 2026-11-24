# Challenge to RULINGS-8: consumer impact

Seat: an independent challenger, claude-opus-5-5 (asserted from its own system identity), in a seat written for Fable; the owner's order of 2026-11-19 puts every seat on Opus. 2026-11-22. Read-only: no build, no browser, no source change, nothing staged. I wrote none of the rulings.

**Read.** `RULINGS-8.md` in full; `ORCH-LINES-7.md`; `challenge-7-consumers.md` and `fold-7.md`'s table; `audit/dock-usage/USAGE.md`, `SURFACE.md`, `COMPOSITIONS.md` in full; `INBOUND.md` rows O-354 to O-418; `audit/triage-1119/PLACED.md`; `audit/hassio-r13/PLACED.md` (its 11.2.0 rows); `~/.dev-logs/owner-1112/IDIOM-TOPBAR.md`; the `INPUT-first-load-size`, `INPUT-fourier-stage-dock` and `INPUT-hover-shift` notes; `RULINGS-2.md` RU-1 and RU-14. On `bl/dock/wi8` (src `575084358`): `useDockState.ts:110-150`, `:460-520`, `:600-760`, `:840-860`; `useDockBody.ts:1-2`, `:686-735`, `:1310-1340`; `dock.css:240-290`; `density.css:100-200`, `:270-335`; `run.css:625-660`, `:525-570`, `:755-770`; `shape.css`; `controls/tab-button.css:60-100`; `dark-mode-toggle.css:1-70`; `glass/a11y-fallback.css:1-50`; `tokens/property-regs.css:154-158`; `ControlsDock.vue`; the dock README's recipe (`:80-86`). On the main checkout, `git show`/`git grep` of v11.0.2 and v11.1.0 for the fill tokens, the level brackets, the linger tokens and `hover: hover`. Consumer trees, read only, at their newest refs: atlas `u/o18-atlas` f79d949 (2026-11-22), fourier-analysis `origin/master` 266bd67, value.js `origin/master` d7df97f9e, keyframes.js `origin/master` 3e54f9c7, daraksha `origin/master` 24a6dbd, gaggle-site `site-redesign` 898cea9, speedtest `glass-10.1` 4af04ba0, slides `npig` 3cec2cb, gregg (working tree), Home Assistant `apx-ui-r13` ce9eddf6 (and its asks LF-41 to LF-50); atlas's `OWNER-1117-GLASS-ROWS.md`. Not read: the strips (my lens reads source and records), any running page.

Each objection was made, then re-read against the ruling and the evidence; those that did not survive are at the end.

## Each change of default, by consumer

| ruling | the change | sites that use it (ref) | at the move |
|---|---|---|---|
| RU-89 | a persistent seat's press then leave folds at once, never under a held press | keyframes TransportDock Play; fourier Editor, Animation, Canvas docks; gregg and HA `#persistent-end`; atlas rail and phone bar; daraksha's Motion outlet. Press docks are untouched: `onMouseLeave` returns on `pressOnly()` before the branch (`useDockState.ts:638-639`) | nothing for the 11.1.0 sites; atlas (10.1.x), slides, speedtest and daraksha meet 11.1.0's rule for the first time (C8-11) |
| RU-91 | the root corner is `--dock-cap-rest` for every shape; the curve inset goes | `--radius-dock`: daraksha `9999px` (`src/styles.css:61`), atlas rail `1.5rem` (`Dock.css:110`); fourier's phone stage plate is `shape="card"` (`AnimationControls.vue:289`, `:collapse="false"`) | 11.1.0's corner on all; `--dock-curve-inset` is named by no site |
| RU-92 | a press carries the hover step at every pointer | gregg's `(hover: none)` reset (`style.css:1043-1047`) | the reset blanks the cure on gregg's docks (C8-8) |
| RU-93 | dark level 0.7, light pinned at 1 on `.glass-dock` | live docks per C7-2's table; value.js's `:root` level levers (`foundation.css:985`, `:1029`); daraksha's neck by RU-111's recipe | value.js's more-contrast lever stops reaching its docks (C8-12); the recipe escapes the a11y brackets (C8-5) |
| RU-94 | hover 5 %, current 10 to 14 %, declared on `.glass-dock` | gaggle's report dock sets the current fill on an ancestor (`PageDock.vue:186-189`); gregg sets both on `.glass-dock` itself, unlayered (`style.css:495-500`); HA r13 sets none | gaggle's override stops reaching (C8-1); gregg's still wins |
| RU-95 | no capsule channel inside a dock | no site has a SegmentedTabs inside a dock at these refs; atlas o18 moved its dials into `PopoverContent` (`PlateDial.vue:190-215`) | unused, allowed |
| RU-96 | the theme toggle in a dock at full ink, the dock's hover | `DarkModeToggle size="dock"` in keyframes `ChromeDock.vue:636`, gaggle `shell/Dock.vue:221`, `KitDock.vue:91`, `report/page/PageDock.vue:138`, slides `DeckView.vue:164` | a look change on five docks, no draft says so (C8-7) |
| RU-98 | `--dock-tab-h` is the control size; the cockpit's 32 px line goes | gregg, gaggle, keyframes tabs (told); HA r13 worded tabs (no `--dock-tab-h` since r12); speedtest keeps its own (`tokens.css:1003`); atlas's three cockpit docks hold no tab seat | HA's tabs grow, its draft says they don't (C8-2); the cockpit line is unused |
| RU-99 | a trigger in any region is a seat in both axes | fourier `AppDock.vue:564`, `StageDock.vue:130`, `AnimationControls.vue:437`; HA `scale.css:155-158` | each line equals the new default and can go (C8-10) |
| RU-100 | the controls preset's glyph at 0.5 | no site on ControlsDock yet; daraksha and fourier at adoption | matches IDIOM-TOPBAR rule 4 |
| RU-102 | a folded card or rounded dock keeps 16 px | no site folds either shape (fourier's card never folds); atlas expects a disc (`OWNER-1117-GLASS-ROWS.md:21-24`) | see C8-3 |
| RU-90 | `:1407` restated, so RU-28's deleted open seat stays deleted | HA r13 `tabs.css:42-61` (`--dock-open-pitches: 1` and `4`, `--dock-open-seat: auto`); gregg `PageDock.vue:616`; atlas `Dock.css:176` | all inert; HA's 600 to 1023 px band changes (C8-2) |
| RU-108 | G-16 bounded by v11.1.0, not v11.0.2 | daraksha, the site 11.1.0's 1.6 KB kept on 11.0.2 (`package.json:32`, 11.0.2) | daraksha stays blocked (C8-4) |
| RU-109 | the dwell linger and `--dock-linger-max` go | none: neither token is in v11.0.2 or v11.1.0 (`git grep`), and no site names them | allowed |

## What holds

- RU-91: every `--radius-dock` a site sets resolves through `min(var(--radius-dock), calc(var(--dock-cross) / 2))` as on 11.1.0, so no site's corner moves against 11.1.0.
- RU-95 and RU-98's cockpit line remove paint and a token no site's dock reads today.
- RU-99 retires two named site workarounds: fourier's (PR #33, its TRIGGER-CELL-WIDTH test) and Home Assistant's LF-11 rule ("Delete this rule at the bump", `scale.css:155`).
- RU-103 answers atlas's O-418 by its own wording (ORCH line 5).
- gregg's fill overrides keep winning (unlayered on `.glass-dock`); speedtest keeps its tab height and plate veil.
- RU-111's O-417 answer and the O-415 shares match IDIOM-TOPBAR rules 1, 4, 5, 6 and 7.

## Major

### C8-1. RU-94: gaggle's report dock sets its current fill above the dock, and the 11.2.0 declaration on `.glass-dock` cuts it off. Its draft does not say so.

Ruling: the fills at `dock.css:269-271`; the atlas draft: "If you set `--dock-control-hover-bg` or `--dock-control-active-bg`, please set them on the dock itself; an override higher up the page no longer reaches inside one."

Evidence:
- gaggle-site 898cea9 `dashboard/src/report/page/PageDock.vue:80-81`: `<nav class="r-dock-seat">` wraps the `GlassDock`. `:186-189`: `.r-dock-seat { --dock-control-active-bg: var(--plate-press); }`, "glass's gliding plate wears the press step the retired PickedPlate wore". gaggle pins 11.1.0 (`dashboard/package.json:15`).
- v11.1.0 declares the two tokens on `:root` (`tokens/sizing.css:220-221`) and in the `.dark` arm (`dark-arm.css:299-301`), so gaggle's ancestor value is what the dock inherits in both schemes. The branch declares them on `.glass-dock` (`dock.css:269-270`), and the run mark paints `var(--dock-control-active-bg)` (`run.css:566`). A value declared on the element beats the inherited one, whatever the layer.
- So at the bump the report dock's gliding plate changes from gaggle's press step to 10 % of the ink, with no line of gaggle's code changed.
- The gaggle draft says only "Hovered buttons are now 5 % of the dock's text colour and the current one 10 %". The warning went into the atlas draft, and atlas o18 sets neither token (`git grep` over `src`: none).

The update is one line (`.r-dock-seat .glass-dock { … }`), so the change is allowed in 11.2.0, but only if gaggle is told.

Remedy: RU-94 names the reach change and its one consumer site. The gaggle draft carries the line and the selector to move it to. The atlas line can stay as a general note.

### C8-2. RU-98 and the Home Assistant draft describe a tree Home Assistant replaced in round 12. Its tabs grow, and its tablet band loses the open seat it builds on.

Ruling: RU-98: "A site that sets `--dock-tab-h` (Home Assistant, speedtest) keeps its value." HA draft: "your own `--dock-tab-h` still wins, so yours stay as you set them"; "your `--dock-control-active-bg` override can be deleted"; "Four changes in 11.2.0 touch the Home Assistant docks".

Evidence:
- `apx-ui-r13/frontend/src` (ce9eddf6, 2026-11-22, glass 11.1.0) sets no `--dock-tab-h` and no `--dock-control-active-bg`. Round 12's d2b37e07 deleted that whole size block ("The forced size block ... (44px seats and control heights ...) is deleted whole") and measured "computer seats 40, worded 38". The draft quotes USAGE.md's `6d5ac72a9` (`styles/tokens.css:142`), which no longer stands.
- HA's worded tabs are `DockControl shape="tab"` (`tiles/dock_parts.ts:136`), worded `!phone && (wide || current)` (`GlassTabs.ts:287`). Under RU-98 they go from 38 to 40 px at a pointer. The draft says they stay.
- HA's run builds on the open seat RU-28 deleted, which RU-90 now locks by restating `:1407`. `tiles/css/tabs.css:42-61` (ed422231, 2026-11-21) sets `--dock-open-pitches: 1` on a phone, `--dock-open-pitches: 4` from 600 to 1023 px ("glass-ui's own remedy for long names ... 4 pitches"), and `--dock-open-seat: auto` from 1024 px. On the branch both tokens are "declared and unread through 11.2.0" (`run.css:532-539`). So from 600 to 1023 px the current worded seat stops being four pitches wide and sizes to its word, and the seats beside it move by that width on each page change.
- HA filed LF-47 on 2026-11-21 (`r13/asks/glass-ui-lf47-worded-run-open-seat.md`, item 6 of `SEND.md`, not yet in INBOUND). It asks that "a run whose every seat is labelled sizes its open seat to its content". RU-28 already gives that at every width, so its answer can go out with this draft.
- `scale.css:155-158` is HA's LF-11 rule, which RU-99 makes the default.

Remedy: RU-98 drops Home Assistant from its list of sites that keep their value. The HA draft states that the worded tabs grow to 40 px; that `--dock-open-pitches` and `--dock-open-seat` are unread in 11.2.0, so from 600 to 1023 px the current seat hugs its word and its neighbours glide (RU-101); that LF-47 is answered; and that the LF-11 rule can go. It drops the `--dock-tab-h` and `--dock-control-active-bg` lines. Before the drafts go, every site is grepped at its current ref, not at USAGE.md's 2026-11-15 refs. RULINGS-8 re-read only fourier and daraksha.

### C8-3. RU-102 keeps the folded 16 px square that atlas reported as a fault, and the atlas draft says this answers atlas.

Ruling: "A folded card or rounded dock keeps 11.1.0's 16 px corner ... no atlas page uses either shape." Atlas draft: "Folded, both keep 11.1.0's 16 px corner ... which answers the corner reading you sent."

Evidence:
- atlas, `OWNER-1117-GLASS-ROWS.md:21`: "the collapsed disc of both is a square with 16 px corners, not a circle". `:23`, Expected: "... and a collapsed disc's radius is half its side". `:24`: "Atlas will not adopt either shape until it is cured." INBOUND O-401 records that correction.
- So "no atlas page uses either shape" holds because of this fault. It is not evidence that nobody wants the disc.
- The owner: "docks should almost always be rounded"; the dock "rests as a capsule by default" (2026-11-09).
- The one site that passes `shape="card"`, fourier's phone stage plate (`AnimationControls.vue:289`), never folds, so the choice moves no shipped dock. SURFACE.md's "`card` and `rounded` by none" is stale.

Remedy: either the folded finite shapes become a disc, which is atlas's expected and the owner's word, or RU-102 keeps 16 px with its reason restated without the circular clause. In the second case the atlas draft says plainly that the disc half of G1 is declined pending question 5, and question 5 names atlas's expectation beside the default.

### C8-4. RU-108 keeps the one blocked site blocked, and neither its draft nor question 22 says so.

Ruling: G-16 is bounded by v11.1.0's fixture. "No lazy chunk in 11.2.0 ... the first fold would wait on it." Question 22: "a page loads no more of the dock than with 11.1.0."

Evidence:
- O-384 and `INPUT-first-load-size-2026-11-15.md`: 11.1.0's dock took the fourth site to 473.3 KB total and 126.4 KB a page, against budgets of 472 and 125, "so it stays on 11.0.2". That site is daraksha: color, keyframes and fourier are on 11.1.0 (O-384), and daraksha `origin/master` 24a6dbd still pins 11.0.2 (`package.json:32`).
- RU-108's own reason: "The bound exists for value.js's page budget." A bound at v11.1.0 leaves that budget unmet by the same 1.4 KB.
- The code ledger (RU-109) justifies ControlsDock and DockOutlet by "daraksha's and fourier's sites, RU-86". The daraksha draft tells it to move to the preset and outlet and delete `dockHold.ts`, with no word on size.
- The split was misread. The input's ask (2) was a chunk "loaded when a dock can fold", with "preload on idle or on first pointer approach" so the first fold never waits. RU-108 rejects it because "the first fold would wait on it", and the value.js draft turns it into "loading the dock's motion code when a dock is first approached".
- Whether daraksha fits on 11.2.0 is unread. Its own deletions (`dockHold.ts`, 101 lines; the ControlsSeat dock; the blocks marked "REMOVE AT GLASS 11.2.0") may or may not make up the 1.4 KB.

Remedy: before the tag, as a required reading rather than an offer, daraksha's heaviest page is built against the ninth pack with its 11.2.0 deletions and read against 125 KB, by H8's method or by value.js on the tarball. The daraksha draft and question 22 state the result, or that the site stays on 11.0.2. The value.js draft states O-384's split as it was asked: preloaded on idle so no fold waits, and needed by the docks that can fold.

### C8-5. RU-111's neck recipe sets the level on the element, so the reduced-transparency and more-contrast brackets no longer reach it.

Ruling: "The README's recipe ... carries the dark line: `--glass-veil-tier: var(--glass-veil-dock)`, and `--glass-level: 0.7` under `.dark`." The daraksha draft repeats it for the neck, `Star.vue` and `Clasp.vue`.

Evidence:
- The brackets set the level on `:root, :root .glass-dock` (`glass/a11y-fallback.css:20-26`, 0 under reduced transparency; `:38-49`, 0.3 under more contrast). A plate outside a dock receives them only by inheritance (`--glass-level` inherits, `property-regs.css:154-158`).
- daraksha's neck is `<span class="neck glass-plate">` (`SiteDock.vue:280`), styled in its own sheet (`:527`). Following the recipe, daraksha declares `--glass-level: 0.7` on that element under `.dark`, which beats the inherited 0 or 0.3.
- So in dark, under reduced transparency, the two docks go opaque and the neck between them stays translucent and blurred; under more contrast it reads 0.7 beside 0.3.
- H8's reading of the recipe ("the neck follows the plates across the rungs") was taken in the default media only.

Remedy: the recipe carries the brackets as well: the `.dark` line plus `--glass-level: 0` under `prefers-reduced-transparency` and `0.3` under `prefers-contrast: more`, or a form the brackets already reach. RU-93's `level8` gains one cell: the recipe's plate in dark under reduced transparency reads 0.

### C8-6. The daraksha draft does not tell daraksha that the fission seat it plans to adopt left 11.2.0.

Ruling: the daraksha draft (RU-111) gives the neck recipe and the controls preset.

Evidence:
- daraksha `origin/master` `SiteDock.vue:70-80`: "REMOVE AT GLASS 11.2.0: the khatam's fission seat ... Adoption at 11.2.0: move <ThemeControl /> into GlassDock's fission seat and delete the seat, the neck, this block and the .fission styles". `:279` marks the neck the same way.
- INBOUND O-289 (the owner's "fissioned from the dock on the RIGHT ... in goo with safari compat") was placed as W-I.8, 11.2.0, with "daraksha's site version is marked for removal at 11.2.0".
- RULINGS-2 RU-14: "The fission seat leaves 11.2.0" (12.0.0, behind one crop).
- RULINGS-6's rule for items moved out of 11.2.0: "Each consumer is told at booking ... what moved, to where, and what it keeps meanwhile."
- No draft in RULINGS-6, 7 or 8 says it. The neck recipe in this draft only makes sense if daraksha keeps its own fission, which the draft never states.

Remedy: the daraksha draft says the fission seat is not in 11.2.0 and where it went, and that the site keeps its seat, neck and `follow()`. It adds that `--dock-expand-t`, `--dock-expanded-px` and `--dock-collapsed-px` stay through 11.2.0, since RU-35's outputs are kept ("FOR GLASS: publish the expand progress as a token", `:90`). In the same draft: `src/styles.css:61`'s `--radius-dock: 9999px` equals the default since 11.1.0 and can go.

## Minor

### C8-7. RU-96 changes the theme toggle on five docks in three apps; no draft says so.

`DarkModeToggle size="dock"` sits in keyframes `ChromeDock.vue:636`, gaggle `shell/Dock.vue:221`, `KitDock.vue:91` and `report/page/PageDock.vue:138`, and slides `DeckView.vue:164`. None overrides its opacity or hover. Inside a dock it moves from opacity 0.8 to 1 and from `--surface-tint-10` to the dock's 5 % hover (`dark-mode-toggle.css:16`, `:26`). No site code needs to change. One line each in the keyframes, gaggle and slides drafts.

### C8-8. RU-92's touch press is blanked on gregg's docks by a gregg rule glass already made obsolete.

gregg `style.css:1043-1047`, under `(hover: none)`: `.glass-dock :is(.dock-tab-button, .dock-icon-button, .dock-trigger):hover:not(...) { background: transparent }`, "Delete once glass-ui gates its dock hover styles on (hover: hover)". v11.1.0 already gates them (`tab-button.css:79`, `icon-button.css:136`, `triggers.css:80`). Under a finger a pressed seat matches `:hover`, and the unlayered shorthand clears both the hover step RU-92 adds and the 2 % press image. The gregg draft should say the rule can go, and that keeping it leaves gregg's docks with no press fill on touch.

### C8-9. RU-98's cockpit count reads the wrong consumers.

"no `cockpit` in fourier, daraksha or keyframes": atlas is the cockpit's one user, on three docks at f79d949 (`PlateControls.vue:156`, `PlateDock.vue:359`, `StickyScene.vue:159`). None holds a tab seat (`git grep 'shape=' src`: none but pill), so removing `:179` moves nothing. The outcome holds. The *Count* should name atlas.

### C8-10. RU-99 makes five site lines deletable; the drafts name one.

The fourier draft names `AppDock.vue:564`. `StageDock.vue:130` and `AnimationControls.vue:437` set the same `--dock-trigger-min-height: var(--dock-control-size)`, and the latter's comment still expects study G4 in "glass 11.1.2". The HA draft does not name `scale.css:155-158`. A line each.

### C8-11. RU-89 and the drafts treat atlas as an 11.1.0 site, and three other sites are below 11.1.0 too.

RU-89: "gregg and atlas build on 11.1.0". atlas f79d949 pins `10.1.0` (`package.json:118`, `:147`), and its production is "built on glass 10.1.2" (`OWNER-1117-GLASS-ROWS.md:5`). slides pins 10.1.4, speedtest 11.0.1 and daraksha 11.0.2. The atlas draft's "As in 11.1.0, pressing one and then moving off the dock folds it" is new behaviour to atlas. The ruling stands on gregg, value.js's three sites, gaggle and Home Assistant. Only the value.js draft carries a "From 11.0.2" paragraph; the atlas, slides, speedtest and daraksha drafts each need a short "from your version" paragraph, or must say that 11.1.0's notes apply.

### C8-12. RU-93 pins the dock's level on `.glass-dock`, so value.js's own more-contrast level stops reaching its docks.

value.js `foundation.css:980-986`: `:root, .dark { --glass-level: 0.1 }` under `prefers-contrast: more` ("The glass calms so the text floor holds over it"). On v11.1.0 glass's bracket is on `:root` only and the dock declares no level, so value.js's unlayered 0.1 reaches the dock. On the branch, `.glass-dock` declares 1, 0.7 in dark, and the bracket's 0.3 (`dock.css:258`; `a11y-fallback.css:39-41`), so the dock reads 0.3. Under reduced transparency both are 0. One line in the value.js draft: add `.glass-dock` to that selector to keep 0.1.

### C8-13. RU-95's witness is a composition atlas has left.

`dials` models atlas-rc's dial bar, SegmentedTabs strips inside a cockpit dock. atlas o18 replaced it: "No segmented strip ever spans the plate" (`PlateControls.vue:6-12`); each dial is a chip whose SegmentedTabs opens in a `PopoverContent` (`PlateDial.vue:190-215`). RU-95's consumer value is the G14 pair (fourier, the reader). Question 21's dials sentence and the demo's dials page show the owner a dock no app ships. `w-segpair` should carry the witness, and the dials cell is relabelled or rebuilt from o18.

### C8-14. Two triage placements are not carried.

- PLACED.md atlas G12: "The 11.2.0 README names it [`data-morphing`] as the public morph signal." The branch README does not (`grep data-morphing README.md`: none), and neither the ready list nor the atlas draft carries it. Four apps read it (SURFACE.md).
- PLACED.md atlas G9: "question 12 should settle the version too" (the release rule puts a removal in 12.0.0). Question 12 gives only "delete it in 11.2.0". The deletion passes this round's test because no released site uses the helper. The question should still say which release.

### C8-15. The ready list lets daraksha's O-357 (3) ship unwitnessed.

O-357 (3), "a folded dock's hidden open face stays laid out beyond its folded box", was booked to W-I.8. Its guard is G-13's face-box clause, whose plant bites in neither engine (MEASURE-8 `:530`). The ready list accepts "the face-box clause bitten or named unwitnessed". For a fault a consumer filed, the fallback witness is the consumer's own reading: each hidden seat of a folded ControlsDock reports no rect outside the plate, on daraksha's composition, both engines.

### C8-16. RU-103's mount cure is witnessed on one cell, and the atlas draft says a page "pays for that once".

`useDockBody` runs "one requestAnimationFrame loop per dock" (`:2`), and `sync` reads then writes (`:692-735`). With `sync("mount")` in a per-dock frame callback, N docks in one frame interleave N reads with N writes, and each read after the first follows another dock's write. gregg mounts 17 to 19 docks on a page (USAGE.md:18, :25), and atlas mounts one dock per figure. The trace cell should mount a site's count, and the atlas line should state the reading.

## Dropped on the second reading

- *RU-91 shrinking atlas's chosen rail corner.* `min(1.5rem, cross / 2)` gives 22 px against atlas's 24, as on 11.1.0 (master paints from `--dock-cap-rest`). This is not a change at the move.
- *RU-89 folding press docks under a tap.* `onMouseLeave` returns on `pressOnly()` (`useDockState.ts:639`), so atlas PlateDock, gregg's figure docks and fourier's StageDock never reach the branch.
- *RU-95 restyling atlas's dials.* atlas o18's segmented strips render in a teleported `PopoverContent`, outside `.glass-dock`.
- *RU-109's reconciliation removing 11.1.0's idle window under value.js and gaggle* (both mount open). The ruling removes a covered path only "under both their witnesses", which keeps a mounted-open dock's fold.
- *RU-106 bounding a vertical preset's block size.* A positioned box's auto height is its content's, so only the inline axis is capped by the parent.
- *O-387 (4), the "more" seat.* Struck in RULINGS-6 (`:192`); IDIOM-TOPBAR rule 5 leaves the grouping to the site, and ControlsDock warns past six (`ControlsDock.vue:46-53`).
- *O-364 (3).* The gregg draft's "`dockFold.ts`'s pin stays as it is" carries RU-1's answer.
