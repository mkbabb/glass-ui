# Carousel jitter: the critique (O-421)

Seat: claude-opus-5-5, asserted from its own system identity, 2026-11-23. It reads `RECORD.md`, `ROOT.md`, `cure.patch` and `near-snap.patch` against v11.1.0 (d19e12559), atlas's line (glass `u/sp-integ-glass`, useDeckSnap.ts) and the witness and record files under this folder. No source was changed and nothing was staged.

What this seat ran:

- `cure.patch`, then `near-snap.patch`, applied to `git archive d19e12559 src/components/{deck,carousel}`. Both apply cleanly. Line numbers below marked "cure" are in that patched tree.
- `tools/compare.py` and `tools/wheel.py` over `witness/probe-red` and `witness/probe-green`, plus a recount of reversals that ignores still rows (below).
- One keyboard check, under `guarded`, in Playwright's Chromium headless shell 149.0.7827.55. It uses a standalone snap strip with glass's commit rule (an IntersectionObserver at 0.55) and its `inert`/`aria-hidden` flip, not glass's build. It is not a frame claim.

The trees are deleted.

## Verdict

The record's central finding holds, and it holds on more than one cell. The platform's snap alone does not jitter, and the jitter is glass's writes around it. Bare and flat stay at 0 reversals at both widths and every gesture. Travel reverses in every gesture. The 18 px and 7 px rest offsets match (1 − 0.965) / 2 of the member width.

Five of the seven cures are at the root and close to the smallest form:

- `heading` (cause 1)
- the scale moved to a view timeline (cause 2)
- the release-once (cause 5)
- the inbound model watcher (cause 7)
- the zeroed velocity (cause 4), though nothing in glass reads it any more (minor 6)

Choosing native snap over a pointer glide follows from the numbers, not from taste. Cured native matches bare. No glide can do better than 0 reversals and a 0.99 hand ratio.

One blocking item: the cure removes the content lag, a weight-and-momentum channel, and does not put that to the owner. Six items are major:

- WebKit's wheel table misreports a reversal it still has.
- The reconcile is arithmetic on a cached pitch, and nothing re-measures that pitch.
- Atlas's path onto 11.1.2 is not stated.
- The keyboard, reduced-motion and resize routes were never run, and the keyboard claim fails a check.
- The near-snap witness credits the cure's gains to the API.
- The near-snap API is larger than it needs to be.

## Blocking

### B-1. The interior lag is removed as a cure, without the owner

**Claim.** Cause 3 deletes the content lag (v11.1.0 `CarouselContent.vue:60,67`, `styles.css:54-60`, and LAW 3 in `projection.ts:16-18`). ROOT §1 justifies this as "Restraint: one primary motion (the scroll) and its coupled scale". No owner question covers it.

**Evidence.**
- `docs/precepts/restraint.md`, "What he wants instead": "Weight, momentum and breath are owner rulings like the palette and the glass (rule 3 of 'How conflicts settle'): a cure never removes them."
- The lag is a momentum channel by its own definition: content trails its housing by v·τ ("LAW 3 — CONTENT-LAG IS A SPRING", `projection.ts:16`).
- O-327, the audit row that ROOT §3 says cause 3 cures, prescribed keeping the lag ("derive the lag and the fade from position, and return the lag to 0 on `scrollend`", INBOUND.md:302). It did not prescribe removing it. The fade half of O-327 (the fade ending 60 ms after rest) is not addressed at all.

**First reading.** This is a precept violation. A seat decided an owner ruling.

**Second reading.** A case for removal exists, and the evidence supports it:
- `witness/probe-green-lagkept` shows the lag still steps backwards (16 reversals at 12 px in a 1440 swipe) with causes 1 and 2 cured.
- The snap-back table (ROOT §2.2) shows that a per-scroll transform write on the content node makes WebKit drop the wheel.
- BM rule 4 forbids per-frame writes, and CSS has no velocity input.

So a velocity lag cannot exist without bringing back the WebKit swallow or a per-frame write. That is a trade between two owner laws, and that is what makes it his to decide. The ROOT does not state the trade. It reaches for restraint's "one primary motion", and the same file says a cure never removes momentum.

**Cure.** Keep the removal in the patch, state the trade above with its numbers, and add it to §9 as the first owner question:
- A, the default: no lag. The platform's momentum is the weight.
- B: a lag on a smoothed velocity, at the cost of a per-frame write and WebKit's wheel.

Tell the owner how the settle changes too: Chromium's snap curve doubles RED's settle (flat 1440 swipe 331 → 689 ms, record and ROOT §2.1). Also mark O-327 as part-cured. Its fade timing is untouched.

## Major

### M-1. WebKit's wheel still reverses, and the table reports 0

ROOT §2.2's table gives hero wheel reversals "40 (154) / 34 (60) → 0 / 0" and demo 390 "37 (57) → 0". The raw GREEN rows disagree (WebKit 26.5, `witness/probe-green/*.wheel.*.webkit.json`, the strip's `sl`):

- hero 1440: 0, 7, 21, 21, **0**, 0, 29, 64 … The strip steps back 21 px at 51 → 60 ms, then resumes.
- hero 390: 17, 28, 28, **0**, 0, 0, 16 … back 28 px at 90 → 99 ms.
- demo 1440 / 390: back 13 px and 8 px.

`tools/analyze.mjs:329` counts a reversal only when two consecutive steps both exceed 0.5 px. A backward step framed by still rows is not counted. The WebKit witness rows run at a 10 ms median against ~16.7 ms paints, so still rows are common. With still rows collapsed, every GREEN Chromium cell stays at 0 (the headline holds), and every GREEN travel WebKit wheel cell has 2 sign changes. The prose's "43 → 0 px" is not in the film either. The film shows 21 → 0.

The attribution of this residue to the neighbours' opacity ("not from the scale") rests on one run per variant (`witness/snapback-travel-webkit.log`), and the two widths disagree:
- At 390, turning off the scale alone also removes the snap-back (`travel-still` 234 px, 0 snap-backs).
- At 1440 the scale-off run reached 1052 px, past bare's 602 and past member 1 (1036). Its one `scrollend` was a forward snap mid-wheel, a different event that the snap-back count lumps in.
- The snap-back lands 51 to 116 ms into the wheel, before any commit, so no `[data-state]` or opacity changes then. The proposed `travel-opc` cure ("so that nothing on the snap area changes style") has no mechanism that fits a static opacity.

11.1.2 is conditional on that unrun variant ("If it films clean … it joins 11.1.2").

Cure:
- Fix the detector so it collapses still rows, and re-print §2.2.
- Say that 11.1.2 leaves one 21 to 28 px reversal per WebKit wheel gesture.
- Run the snap-back variants three times each at both widths before naming a cause, and keep `travel-opc` out of 11.1.2 until then.
- Also: Playwright's wheel is unphased steps, so whether Safari shows this at all is unread.

### M-2. The reconcile is position arithmetic on a pitch that nothing re-measures

Cure `useDeckSnap.ts:188`: `commit(Math.round(offset() / extent))`.

- The file's own header, unchanged by the cure (`:13-16`), says "There is no scroll-position arithmetic in the commit path". The patch makes that false and leaves the comment.
- `extent` is measured only at mount and on a member-count change (v11.1.0 `:171-174`, `:179`). There is no ResizeObserver anywhere in `deck/` or `carousel/` at v11.1.0. After a rotation or a window resize, `scrollTo` (`:161`) and this reconcile both work from the old pitch.
  - Worked case: a phone from 390 to 844 wide, pitch 422 → 876, resting on member 1 at 876. Next sends the strip to 2 × 422 = 844, and the mandatory snap returns it to 876. Then the reconcile commits round(876 / 422) = 2. The dots say 3 and the strip shows 2.
  - v11.1.0 lands on the same wrong state by a different path, so the fault predates the cure. But the cure adds a second site that depends on the stale value.
- In a peek layout the clamp `Math.min(to, max)` and `round(offset / extent)` disagree with the IntersectionObserver at the end of the strip. On the demo's peek exhibit (pitch 121, member 101, strip 305, 8 members, so max 643 by those numbers) a rest at max commits member 5, which is 62 % visible, while 6 and 7 are fully visible.
- Atlas's line already carries the remedy, for the same reason: `offsetOf()` (live member offsets, `u/sp-integ-glass` useDeckSnap.ts:129-137) and `reseat()` on a ResizeObserver (:321-337, :363-366).

Cure: use live member offsets in `scrollTo` and the reconcile, add the line's ResizeObserver re-measure, and correct both stale comments (`:13-16` and `:212-213`, the observer as "the ONE fallback", which ROOT §1.2 shows is false).

### M-3. Atlas's path onto the cure is not stated

The owner saw the jitter on atlas's deck, which runs glass `u/sp-integ-glass` (8b4d8f82b), not v11.1.0. ROOT's verdict says atlas "can drop the line's travel/land/seat for swipes". That line also carries:

- the ResizeObserver `reseat` and `offsetOf` (M-2)
- `REST_IDLE_MS`, a 150 ms idle floor for `scrollend` (:150, :163-164)
- a release-once (:297-303)
- a reduced-motion branch in `scrollTo` (:305)
- the inbound `watch(active)` (record §2.7)
- the autoplay commit 9235d026c

Several of these overlap causes 4, 5 and 7. If atlas moves to 11.1.2 alone, it loses the resize handling. ROOT §3's "Overlaps with BL waves" lists W-L.2, W-F.3, W-K.6 and O-327, and none of the line's commits (b1250cadb, f373de108). Cure: a short table of what the line has and what 11.1.2 has, and which side each item takes. O-421 is closed only when atlas's deck runs the cure.

### M-4. Three routes were never run, and one claim about them fails a check

The record's inputs are touch, flick, carry, phased and bare wheel, and pager presses, all with `reducedMotion: no-preference` (RECORD.md "Inputs"). ROOT §10 lists vertical, `window` and dark mode as not filmed. It does not list the routes below.

- **Keyboard.** ROOT §5 credits native snap with "arrow keys and assistive scrolling move it". This seat's check (Chromium headless shell 149, the standalone replica above) does not bear that out once a member holds a focusable element:
  - Focus on slide 0's link. ArrowRight turns one slide (scrollLeft 0 → 932, member 1 active).
  - The commit's `inert` flip then drops focus to `body`.
  - The second and third ArrowRight do nothing (932, 932).
  - With nothing focusable in the members, the strip itself takes focus, and ArrowRight turns 0 → 932 → 1864 → 2796.

  Atlas's previews are anchors (`a[dashboard-preview]`, record §2.3), so atlas has the failing case. The flip is glass's (`CarouselItem.vue:55-56`), so the fault predates the cure. It still means the comparison row is past its evidence, and the route belongs in the record. It needs one run of glass's own build in both engines.
- **Reduced motion.** Never filmed. The cure's `scrollTo` still passes `behavior: "smooth"` explicitly (cure `:164-168`). That overrides the stylesheet's `scroll-behavior: auto` under `reduce` (cure `styles.css:90-92`), so presses still animate. ROOT §3 defers this as CR-08. §10 should say the route was not run.
- **Resize mid-scroll** (or rotation). Never run. See M-2.

Also not run and not listed: right-to-left. There, `scrollLeft` is ≤ 0, so `offset() / extent` and `index * extent` are both wrong, and the new reconcile is one more site that is.

### M-5. The near-snap witness credits the cure's gains to the API

ROOT §4's witness compares `near` + `live` on the cure against "active-only by the consumer" on **v11.1.0**. The 2 to 7 reversals and the 18 px / 7 px rest offset in that baseline row come from the projection, which 11.1.2 removes, not from the consumer's approach.

The fair comparison is consumer active-only on 11.1.2 against `near` + `live` on 11.1.2, and it was not filmed. The difference that remains in the longest frame (24.9 ms in the record's active-only cells, against 10.4 ms at 1440 and 17 ms at 390 for the prototype) may come from mounting 3 figures instead of 8. That would be the `near` window, but no cell isolates it.

After 11.1.2 a consumer can already tell "still" from the exposed deck: velocity is zeroed at `scrollend` (cause 4) and the position is integral. The study's own figure reads exactly that (`tools/app-extra/mounts/carousel-figure.vue`, `moving` from `deck.velocity`/`deck.position`).

### M-6. The near-snap API is larger than it needs to be, and its rest signal has no floor

No node is added and no listener per member. `moving` rides the existing `onScroll`, `rested` is one watcher in the provider, and each member gets two computeds. The +71 B is in proportion. But the surface adds four names: `near` and `live` on the slot, `moving` and `rested` on `CarouselContext`.

- `live` is `active && !moving`, which any consumer can write.
- `near` builds a ±1 mount window into the library. ROOT §6 keeps daraksha's decode-ahead with the page as "a page's loading policy". The mount window is the same kind of policy.

The smallest form that serves atlas is one `moving` ref on the context and the slot, and the window stays with the page. Grow it if a second site needs `near`.

`moving` falls only on `scrollend` (near-snap `rest()`). Safari shipped `scrollend` in 26.2; 26.0 and 26.1 lack it ([InfoQ](https://www.infoq.com/news/2026/04/safari-scrollend-support), [WebKit bug 201556](https://bugs.webkit.org/show_bug.cgi?id=201556)). On those versions, and wherever `scrollend` is lost (a hidden document mid-scroll), `live` stays false after the first scroll, and the figures freeze. Atlas's line already keeps a 150 ms idle floor for this (`REST_IDLE_MS`). The cure's `rest()` and the hold's reconcile (`:179`, no reconcile without an event) have the same gap. ROOT §10 says "both engines here fire `scrollend`", which is true of Playwright's builds, not of every Safari in use.

## Minor

1. **RECORD.md still states what ROOT §8 retracts.**
   - §2.1 says the commit comes from `scrollsnapchange` at 345 to 375 ms. It comes from the IntersectionObserver.
   - §2.2 and §6 read WebKit's swallowed wheel as the snap-point shift.

   Atlas and value.js will read the record first. Amend those paragraphs, or put a correction at the head of the record.
2. **"One 38 ms gap … in RED and GREEN alike"** (ROOT §1.1) is not in the rows. The first Next at 1440 in Chromium shows:
   - record: 17.6 ms max
   - RED film: 25.0
   - GREEN: 26.3 untraced and 33.3 traced
   - near-snap: 32.6

   The cure's frame is longer in every GREEN reading. The load also differed (RED 30 to 40, GREEN 37 to 57), so "the cure does not change it" is not shown either way.
3. **"Rows are 17 ms (60 Hz)"** (ROOT §2.2) does not match the witness. Every WebKit cell in `probe-red` and `probe-green` has a 10 ms median row. The record's own WebKit runs were at 17 ms. Say which hook sampled which film. The duplicate rows are also what hides M-1's reversal.
4. **The glide column puts the cold-context long frames** (367 and 182 ms) against the glide. The record could attribute no script to them and saw none warm (record §3). Daraksha's keys are measured working (record §3, "Keys and dots"), so "only what the page wires itself" undersells it. Neither changes the choice, which rests on reversals and the hand ratio.
5. **The continuous feed now has no reader in glass.** After cause 3, `deck.position` and `deck.velocity` are read nowhere in `src/components` (v11.1.0 grep: `CarouselContent.vue:59-72` was the only reader). `onScroll` still writes two refs on every scroll event, and cause 4 adds a listener to zero one of them. Either name the consumer that reads it (the study's figure does) or have the Carousel pass `continuous: false`.
6. **Firefox loses the travel scale** under the `@supports` guard. ROOT §10 says so. It belongs in the release note as a change in that engine.
7. **`window` projection.** At the commit, the newly active member's content goes from a static 0.965 to its timeline value (about 0.984 at 55 %), and the old one goes back to 0.965, both in one frame. v11.1.0 did the same in script. The owner's "nothing changes instantly" applies. Unfilmed.
8. **Owner questions.**
   - Q4 asks about the entrance of a dock that does not exist ("once there is one"). Hold it until CR-02 exists.
   - Q1's B and C were not filmed against the cure. C's 1 s ease outlasts the hold's 900 ms floor (cure `:190`), so it cannot run on the cure as written.
   - Q1, Q2 and Q3 are feel choices, so they need a live before-and-after page, as the BM choice board does, rather than prose.
   - Q2 and Q3 are in scope by INBOUND.md:411, which folds the Home View study into O-421.

## What stands

- Record §1 and §2.2 (the projection as the source of every v11.1.0 reversal and of the rest offset): flat and bare against travel, at two widths, in four gestures.
- Record §2.7 and ROOT §2.3 (the dots do not move the strip; the race; the held report): all variants and both widths. The race appeared in 2 of 3 runs in RED, and the 7-lag witness holds in both engines in GREEN.
- The view-timeline scale reads 0.965 / 1 / 0.965 at rest in both engines, within 0.0015 of v11.1.0 in flight (`witness/scale-*.log`). `exit -100% exit 100%` centres on the `start` snap for any member width.
- `heading`, the release-once and `watch(active)` are each the smallest form of their fix. `heading` equals the index after every write the arm makes, so a commit never scrolls and an outside `go` always does.
- Chromium (GPU lane): every GREEN touch, wheel and pager cell has 0 reversals, under this seat's stricter count too. The hand ratio matches bare (0.99 / 0.96). Nothing is off snap.

## Files

- `critique.md`: this file.
- The patched tree and the keyboard check lived in `trees/` (gitignored) and are deleted.
