# Verification of ROOT.md and cure.patch (the page scrolling under phone surfaces)

Verifier: claude-opus-5-5, 2026-11-23. I read `ROOT.md`, `cure.patch`, the harness
(`probe.mjs`, `cuts.mjs`, `Page.vue`, `summarize.py`) and every data file under
`harness/data/`, and I read the source on `108fd6051` with `git show`. I re-ran two
things myself, both under the guard (see "What I ran"). I changed no source and staged
nothing.

## Verdict: holds after fixes

The cause is right. The surfaces that leak are the non-modal ones. Nothing holds the page
under them, and WebKit's fitting-box rule (b/243452) makes `contain` useless on a list
that fits. The mechanism of the cure is also right: glass's existing counted root lock,
taken by one predicate in one module. For the surfaces that cover the page (the Select's
sheet, a dock's menu, the filter drawer) it is the smallest cure there is.

Four things have to change before the record or the patch is accepted:

1. The rule as written in the patch is wider than the rule the record argues for.
2. The patch makes the open WebKit dismissal fault into a trap, so it cannot ship ahead of
   that fault.
3. The record's cut list is not empty: its own frames show a scrim cut.
4. Several engine claims go past what was measured.

## Blocking items, each judged twice

### B1. The patch holds the page under surfaces that do not cover it, and the public docs still say they do not

**First judgement.** The record's principle is "a surface that covers the page holds the
page" (ROOT.md:24-28, and the new comment in `sheet-width.ts`). The predicate that ships
is different: `open() && sheet.value && !modal()`, which holds the page for every open
overlay that calls `useSheetWidth` below 30rem, whatever its size.

The record's own boxes at 390 (`plain-chromium.json`, `afterOpen.plate`) show two such
surfaces:

- The DropdownMenu with 4 rows is 128x176 px at x 28 to 156, 7% of the screen.
- The Popover with 2 lines is 7% of the screen.

Glass's own comment says such a menu does not cover the page. The D-6 note
(`DropdownMenuContent.vue:81-85`, unchanged by the patch) reads: "Below 30rem a menu a dock
opened covers the page ... An anchored menu outside a dock ... keeps the floating plate."

Two surfaces the record never names are swept in as well:

- **ContextMenu.** It renders through the same `DropdownMenuContent`
  (`family-context.ts:26`), so it holds the page on a long press.
- **The HoverCard arm of `PopoverContent`.** `panelOpen` reads `hoverRoot` when
  `usesHoverRoot`, and `isModal` is false on that arm by construction
  (`PopoverContent.vue:144`).

Three public docs that consumers read now state the opposite of the new behaviour, and the
patch edits none of them:

- `DropdownMenu.vue:7` and `ContextMenu.vue:7`: `modal` is "Whether opening the menu makes
  outside content inert (and locks page scroll). Default false."
- `Popover.vue:30-31`: "false (default): non-modal. ... the page behind stays operable."

**Second judgement.** Is the wider rule simply the intent, with the docs as the only fault?
Holding the page under an anchored menu on a phone matches what iOS does with its own menus,
and the WebKit wheel lane does show the anchored Popover and DropdownMenu moving the page by
the whole swipe when they fit. So holding them is defensible.

But the record justifies it by coverage, which is false for these surfaces. It does not
name ContextMenu or the hover arm, and it leaves three public prop docs false. Real sites
are reached:

- atlas's chart options Popover (`atlas/src/charts/legend/VizOptions.vue:136-139`): "the
  page stays live behind (a non-modal lens)".
- atlas's pinnable hover-arm `EasterEgg` (`atlas/src/editorial/EasterEgg.vue`).
- atlas's dock settings menu.

Under the clean-break rule the behaviour may change, but the docs and the stated rule must
change in the same commit.

The fix is one of two. Either narrow the predicate to the surfaces that take a sheet form,
or keep it and restate the rule as "below 30rem every open non-modal overlay holds the
page". In the second case, name ContextMenu and the hover arm, and rewrite the three prop
docs. Confirmed.

### B2. The cure turns the open WebKit dismissal fault into a trap; it cannot ship ahead of it

**First judgement.** The record found that in Playwright WebKit 26.5, by tap, a tap outside
a Select, a dock Select, a DropdownMenu or a Popover closes nothing (`cuts-webkit.json`:
`closed=false` on every tap-outside route). So do a tap on any scrim and a second tap on an
open Select's trigger.

The cause checks out in reka 2.10.1 (`DismissableLayer/utils.js:51-54`): for a touch
pointer the outside press waits for a document `click`, and a tap on a target that is not
clickable sends none.

Before the patch, a reader who could not tap a surface away could at least scroll the page.
With the patch, the page is held for as long as the surface is open. On the routes that do
close in WebKit:

- **Popover:** only its trigger or Escape. A phone has no Escape.
- **Select sheet:** only a row or Escape; neither the outside tap nor the trigger tap
  closes it.

So a reader who opens a Select only to look, or opens a Popover, is left with a held page
and one way out. The record states this itself (ROOT.md:370-373) and files it under For
INBOUND, "outside this record's question".

**Second judgement.** Is this only Playwright WebKit? The record cites b/267688 for the same
behaviour on iOS, and the iPhone has not been read. Whatever the iPhone shows, the hazard is
created by this patch: the hold is new and the dismissal fault is old. So it is inside this
record's question, not outside it.

The patch must not ship before one of two things happens:

- The iPhone reading shows that the outside tap closes these surfaces.
- The dismissal cure ships in the same change.

The record's "the 11.1.2 build reads it on the iPhone first ... and cures it in the same
release" should be written as a hard condition on `cure.patch`, not as an INBOUND note.
Confirmed.

### B3. The cut list is not empty: the detented Sheet's scrim cuts in and out

**First judgement.** "So the list of cuts for 11.1.1 is empty" (ROOT.md:356-357). The
record's own frames say otherwise.

At the open of the detented Sheet, the scrim goes from absent to 0.28 effective opacity in
one frame, then tweens up. This happens in both engines:

- Chromium 149 `tap-close` open frames: `(8, none) → (16, 0.28) → (24, 0.288)`.
- WebKit 26.5: first frame at 0.28.

At the close, the plate reaches the foot (top 844, 0% on screen) by about 360 ms. The scrim
then holds at exactly 0.28 for every recorded frame to 696 ms in Chromium and 686 ms in
WebKit, so it can only go from 0.28 to nothing in one frame. The scrim is
`hsl(24 10% 10%)` at 50% (`glass-fx.css:213-214`), so 0.28 is about a 14% dark wash
appearing and leaving at once.

The cause is in code. `scrimDetentOpacity(t) = 0.28 + 0.44 t` (`sheet/motion.ts:54, 68`)
has a floor of 0.28 at t = 0. `SheetContent.vue:228-231` applies it through the open and the
dismissal, where t passes through 0. The cut rule in `cuts.mjs` (`analyse`) never looks at
`f.scrim`, though the sampler records it.

**Second judgement.** Could 0.28 be a reading artefact? `eff()` returns 0 for
`display: none` or `visibility: hidden`, so 0.28 means a painted scrim. The other scrims
show the sampler reads them correctly:

- Plain Sheet, Dialog and Command: they start at 0 and end at 0.02 to 0.05 before going.
- The detented one alone starts and rests at its floor.

Confirmed. This is a real "nothing changes instantly" fault in 11.1.1, missed because the
rule watches the plate only. The cut section must list it, and the cut rule should judge the
scrim as it judges the plate.

**How the close ends, from the code.** Under normal motion `sheetDetents.opacity` is
null: it is set only for the reduced-motion fade (`sheet/detents/use.ts:66-67, 136-165`).
So the scrim is exactly `0.28 + 0.44 t`. It stays mounted while `present` holds, and
`present` turns false once the dismissing spring has settled at 0 (`use.ts:190`).

That is why the recorded close frames sit at 0.28 well after the plate has gone, and it
means the scrim leaves from 0.28 in one frame when the spring settles. Under reduced motion
the fade multiplies the scrim down to 0 with the sheet, so that path does not cut.

The cure is at the root of the law: the scrim should read 0 when dismissed. The floor
belongs to a resting peek rung, not to the travel from and to dismissal.

### B4. Engine claims stated past their evidence

**First judgement.** ROOT.md:19-21: "So on an iPhone a swipe on a short Select sheet, a
short menu or popover, or any part of a filter drawer goes straight to the page." The
readings show these by touch:

- **Filter drawer:** RED by touch only in Chromium (CDP touch, a real gesture scroll).
- **Select, dock Select, Popover, DropdownMenu:** no touch reading shows any of them RED
  in any engine. Chromium 149 holds all four. Their RED comes only from the WebKit wheel
  lane, which is `isMobile: false` with `mouse.wheel`, a mouse input.

The column "WebKit 26.5, touch: page held while open?" in both tables reads the root's
computed `overflow-y` after a tap. It is a state read, not a held swipe. In the cured tree it
is "yes" by construction of the patch.

Smaller overstatements:

- ROOT.md:21-22, "leaks in every engine": two engines were read, and one of them by wheel.
- ROOT.md:190, "on the title or foot": only the foot was swiped, and the finger-down swipe
  there travelled 30 px (from y 806, clamped at 836, in `plain-chromium.json`), so
  `plate v -2/-15` and `-30` understate it.
- ROOT.md:295, "the two cured cells whose root stays hidden": there are four (Popover 2 and
  30 in each WebKit lane).

**Second judgement.** The lanes section (ROOT.md:59-76, 378-393) is candid that the WebKit
lanes are not touch and that nothing here is iOS. The owner's iPhone corroborates the
symptom for the Select's sheet and the drawer.

To test whether a touch RED could be had at all, I looked for the pre-144 Chromium rule.
The feature the record tried, `OverscrollBehaviorRespectedOnAllScrollContainers`, is not in
the Chromium 149 headless binary (`strings`). The nearest name present,
`RespectOverscrollBehaviorForScrollBubbling`, does not bring the old rule back either (my
control run, below). So the record was right to drop that lane.

The fault is the wording, and it matters, because the owner judges the cure on his iPhone
against these claims. The fixes:

- State in The answer that the Select, Popover and DropdownMenu are RED by WebKit wheel and
  the owner's report, not by any touch reading.
- Rename the touch column to what it reads ("root `overflow` while open, after a tap").
- Correct the four small claims above.

Confirmed, as a wording fix.

## The questions asked

**Is the cause shown for each surface by touch, in each engine claimed?**

- **Filter drawer:** yes in Chromium, by touch. In WebKit only by wheel.
- **Select, dock Select, Popover, DropdownMenu:** no. Wheel only, in WebKit (B4).
- **Modal surfaces:** shown holding in both engines, by touch in Chromium.

The causes in code are as the record says, and I checked each one:

- `SelectContent.vue:74-82` sets `bodyLock: false`.
- `DropdownMenu` and `Popover` default to non-modal.
- `ModalOverlay.vue:70` renders only for a modal root.
- reka's iOS `touchmove` cancel lets a target in an overflowing box through
  (`useBodyScrollLock.js:51, 85-91`).

**One rule at the root, or per-surface patches?** One predicate in one module
(`sheet-width.ts`), reached by three new one-line calls (Popover, Sheet, Dialog) and one
added argument (DropdownMenu). There is no per-surface CSS and no listener. It is one rule.

Two notes, neither blocking:

- The page hold now lives in a module named for the sheet form. Popover, Sheet and Dialog
  call `useSheetWidth` only for that side effect and discard the ref it returns.
- A future overlay content component is covered only if it calls it.

The patch applies cleanly to `108fd6051` (`patch --dry-run`), and `src` is unchanged from
there to `4f1fa667e`.

**A list that fits and a long list.** Both hold in the cured tree:

- Lists that fit: the page stays at 0 by touch in Chromium and by wheel in WebKit.
- Long lists: they still scroll themselves (Chromium +205 to +305 by touch, WebKit +220 by
  wheel).

On iOS this rests on Safari honouring the root's `hidden`. That is unread.

**What a site relies on.**

- **A page that should scroll behind a non-modal Popover.** It no longer scrolls below
  30rem. See B1 and B2. At 30rem and up nothing changes.
- **Text selection in a sheet.** The patch writes only the root's inline `overflow`; no
  `user-select` or `touch-action` changes. Unaffected by construction. Not read.
- **A sheet's own drag.** A detented sheet is modal by default, so the patch skips it. A
  non-modal detented sheet would take the root lock, and its drag runs on pointer events
  with `touch-action: none` on grip and header, which the root's overflow does not touch.
  The drag was read only on the plain tree, in Chromium.
- **Focus and reading order.** No DOM, `aria` or `inert` change. A non-modal surface leaves
  the page in the reading order while the page is held. `focus()` and assistive
  scroll-into-view are programmatic scrolls that `overflow: hidden` allows. VoiceOver's
  three-finger page scroll would be held while the surface is open. Not read.
- **Reduced motion.** The hold follows the logical `open`, not the motion, so it is the same
  under reduced motion. Not read.

**Engine claims past their evidence.** See B4. The citations I checked hold:

- The Safari 26.4 note, verbatim under Browser, Resolved Issues, 163660111.
- b/243452: NEW, Scrolling, last changed 2026-11-04. Simon Fraser's 2024 comment proposes
  putting non-scrollable `contain` boxes in the scrolling tree. I did not find the words "a
  fair amount of work" in my read of the bug page.
- reka's outside-press code and iOS lock.

One gap: **b/299084** ("REGRESSION (Safari 26): Overflow hidden on body/html no longer
works", iOS 26, NEW, last changed 2025-11-24). The reporter thought 26.1 fixed it. Simon
Fraser kept it open: "there are still plenty of bugs here". It bears on "what it rests on in
Safari" and should be cited beside b/240859 and b/317941.

**Are the listed cuts real (frames, routes)?** The data matches the record:

- Chromium: 28 cells, 0 plate cuts.
- WebKit: 28 cells (27 driven, the drag skipped), 0 plate cuts.
- The WebKit routes that did not close are exactly the ones the record names.

The list is incomplete in two ways:

- The detented scrim cut (B3).
- Cuts were read on the plain tree only. The cure adds root overflow changes at the open
  and close of the Select, menus, Popover and drawer, and these were not re-read for cuts.
  I expect no plate movement from them (the root stays the scroller, with a stable gutter),
  but it is unread.

## Checked and holding

- The data tables in ROOT.md match `summarize.py` over `harness/data/*.json`, cell for cell.
- The Chromium lane is real touch: the bare page moves about 300 px per CDP swipe.
- The WebKit wheel control (a fitting `contain` box passes -155 / +220) proves the engine
  rule for wheel.
- The vitest failure is the harness page's `@interact-outside.prevent` under `demo/`
  (`logs/vitest-cure.log`), not the patch.
- atlas scrolls on the root (`PlatformShell.vue:164`, `min-height: 100dvh`, and StickyScene
  forbids an overflow ancestor), so the root lock does reach the owner's site. The record's
  drawer cell mounts atlas's drawer faithfully (`Dialog :modal="false"`, `SheetContent
  side="right"`, `@interact-outside.prevent`, a consumer `overflow-y: auto` body).
- The counted lock behaves: the hold follows `open` with `flush: "sync"`, and it releases at
  the close and on scope dispose. A Select inside a modal Dialog takes a second count and
  restores correctly.

## What I ran

All runs went under `~/.claude/guard/guarded` in Playwright Chromium 149.0.7827.55, headless
shell, 390x844, `isMobile`, `hasTouch`, one browser per variant, closed in `finally`.

1. **An engine control on a static page.** A fixed `overflow-y: auto; overscroll-behavior:
   contain` box that fits, over a tall page, swiped by CDP touch in three variants:
   default, `--disable-blink-features=RespectOverscrollBehaviorForScrollBubbling`, and
   `--disable-features=` the same.

   | Variant | Box that fits (v / ^) | Bare page (v) |
   |---|---|---|
   | default | 0 / 0 | -296 |
   | blink feature off | 0 / 0 | -297 |
   | feature off | 0 / 0 | -312 |

   No switch restores the pre-144 rule.
2. **A plain archive tree of `108fd6051`.** Built with `harness/build-tree.sh` (docs
   excluded, `node_modules` linked) and served on 5363 inside one guarded call, to read the
   detented scrim through the whole close. Both attempts failed in my script, not in the
   page:
   - The first looked for the ✕ before the sheet was open.
   - The second skipped the probe's parking scroll, so the trigger tap landed below the
     fold.

   With the heavy queue at 15 and the load at 86, I did not try a third time. B3 stands on
   the record's own frames and the code above, not on this run. The tree was deleted
   afterwards.

No WebKit run, no iPhone, no Safari.
