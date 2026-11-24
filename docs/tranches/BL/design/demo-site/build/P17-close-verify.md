# P17, the close verify

Seat: claude-opus-5-5 (asserted from the seat's own identity; Fable is out of quota until 2026-11-21, so this verify runs on Opus by the orchestrator's standing ruling). 2026-11-21. Read only: no browser ran, and nothing in the repo changed except this file. The tables below were computed here with Python from banked files and from the worktree's kept JSONL and crops. None of them is banked.

Read: `P17.md` with its Close, `P17-verify.md`, the close driver (`driver/demo-p17-close.js`), `git log --stat 1a423c80d..` on `bl/demo` and the diffs of the seven commits after `d7fb1d1f2`, the tip's `StageSwap.vue` and `StoryCode.vue` whole and both at `1a423c80d`, `demo/main.ts`, the library's `CollapsibleContent.vue` and `disclosure.css`, Vue 3.5.40's `runtime-dom` Transition hooks, and the 20 StageSwap slots in `demo/stories/`. I opened every PNG under `shots/P17/` (21: fourteen contact sheets, four films, two mid-fade sheets and the three-way Dialog crop) and P16's arrival sheet. I also opened the Dialog 390 arrival crop from four builds in the worktree (`.p17/out/p16-crops`, `.p17/out/tip-crops`, `.p17/out/close/f-sweep`, `.p17/out/close/tip-crops`). I read the banked sweeps, the checker, the leave and lift reads, the films, the mid-fade reads, the font and code-face surveys, the WebKit sweeps of `d7fb1d1f2`, `b0fd66681` and the tip, the page-error reads, vitest and the gate. Judged against `OWNER-ORDER.md` and the owner's laws: nothing changes instantly; KISS, no workaround.

## Verdict

**Merge.** No page is broken or empty, and none is worse than P16 at rest. Ten of the fourteen sheets match P16's tile for tile within 24/255, and the three new swap sheets show all 20 swapping pages whole in three cells. The fourteenth sheet differs only where the library's two-state Dialog veil landed in its other state. Every leave lands 0.185 at most per 60 Hz frame, against P16's 0.388. Each stage fades as one layer, in both engines. WebKit ran the new StageSwap and the code line reads clean there. Nothing under `src/` changed.

The record overstates two things, and neither holds the merge. First, the first enter. Its curve is P16's, 200 ms on `--ease-out`, and it lands 0.264 in its first 60 Hz frame on every swap. The close's own 60 Hz film reads 0 to 0.26. The Chromium sweep passes only because headless Chromium runs at about 135 frames a second. Second, WebKit's frame steps track the machine's load: `b0fd66681`, whose StageSwap is the tip's byte for byte, read enter legs up to 0.836. Two new waits are unmeasured on the live site. On a cold load, 13 routes now mount only once the code face has arrived. A "Code" press now answers only once the face and the highlighter have loaded. Read both right after the deploy.

## The seven questions

| Question | Answer |
|---|---|
| Every swap's leave and first enter a tween, no step over 0.2? | Leave: yes by its curve (0.185 at 60 Hz, every swap, Settings and Constellation included). The sampled legs are 0.154 at most in Chromium, but 0.211 to 0.289 on 7 of 57 WebKit legs at 1440. First enter: no at 60 Hz: 0.264 by the curve, the same as P16's (below) |
| Any part showing through another mid-fade? | No (below) |
| Chassis simpler than P16, or no more complex? | No. More complex than P16, simpler than `d7fb1d1f2` (below) |
| Code face fetched only where it paints, no flash? | On first screens, yes, in both engines and both cells. At 390, `/` and `/forms` wait for the face with none on their first screen. Interaction-revealed mono still loads the face on use, as at P16 (below) |
| WebKit ran the new StageSwap and read clean? | It ran, and read clean on the code line, console, checker, films and switches. Its frame steps are over 0.2 on first switches and vary with load (below) |
| Anything worse than P16? | At rest, no. Two new waits, unmeasured live, and a more complex chassis (below) |
| `src/` touched? | No (below) |

## 1. The leave and the first enter

**The leave.** It runs one curve for every swap: 120 ms on `cubic-bezier(0.25, 0, 0.75, 1)`, 0.185 at most per 60 Hz frame (recomputed here). The sweep's curve line reads 0.185 on every swap in all three cells, and `leave/leave-extra.txt` reads it on Settings' tabs and Constellation's presets. In Chromium the sampled leave legs are 0.154 at most. In headless WebKit at 1440, 7 of 57 sampled legs land more than 0.2 in a frame (worktree `.p17/out/close/wk-sweep/sweep.jsonl`): Music Staff 0.289, Paper & Glass 0.284 and 0.221, Data Table 0.262, Surface 0.241, Accordion and Tabs 0.211. Six of the seven are first switches. The 390 cell has none. The record reports only the curve line ("leave 0.185 on all 18 swaps").

The cause is in the code. Vue's CSS Transition starts both its leave and its enter in `nextFrame`, a double `requestAnimationFrame` after the hook (`@vue/runtime-dom` 3.5.40, `makeEnterHook` and `onLeave`). P16's CSS fade therefore began two frames after the press. The tip's fade is `el.animate` under `:css="false"` (from `d7fb1d1f2`), and its leave starts at the hook, so a long first-switch frame lands inside it. `1412baa99` rebuilt the hold for the enter only.

**The first enter.** It is P16's enter, unchanged: 200 ms on `--ease-out`, `cubic-bezier(0, 0, 0.2, 1)`. By its shape it lands 0.264 in its first 60 Hz frame on every swap, and the sweep prints that figure ("enter 0.264") on every route, ungraded. The close's mid-fade read runs a held 60 Hz clock (`.p17/out/close/mid/f/midfade-*.txt`, the tip's fade). On all eight switches, in both engines, it reads the enter frames 0.00, 0.26, 0.44, 0.58: the first frame lands 0.26. The sweep's enter line reads real headless frames, and their rate differs from 60 Hz:

| Engine | Median frame | Enter legs over 0.2 (tip's run) | First switch over 0.2 |
|---|---|---|---|
| Chromium | 7.4 ms (about 135 fps) | 1 of 171 (Music Staff, 1440 light, 0.202; not recurring) | 1 |
| WebKit 1440 | 10 ms, longer on first switches | 18 of 57, on 11 of 18 routes (0.203 to 0.315) | 10 of the 11 routes |
| WebKit 390 | 10 ms | 12 of 57, on 8 routes (0.201 to 0.292) | 5 of the 8 |

At 135 fps the same curve lands 0.150 a frame, and that is why Chromium passes. So item 3 holds for the cold lost frame it chased, at headless Chromium's rate. The close driver's bound reads "0.2 or less on every first switch, like the leave", and the leave's bound is per 60 Hz frame; at 60 Hz the enter does not meet it. It is not worse than P16, which ran the same curve. P17-verify booked it for the next pass.

The cure is one constant. On the leave's curve, `cubic-bezier(0.25, 0, 0.75, 1)`, the same 200 ms lands 0.111 at 60 Hz; on `cubic-bezier(0.42, 0, 0.58, 1)` it lands 0.143. An ease-out start cannot meet 0.2 at 200 ms: `(0.33, 0, 0.2, 1)` lands 0.212, and `--ease-out` over 250 ms lands 0.221.

**Standing.** On its second switch, Command's height snaps from 363 to 43 px in one frame (O-390 d, the library's; standing since P13). It is the one switch failure in each cell in both engines, as at P16.

## 2. Show-through mid-fade

None. `layer()` fades the pane's only element, or the pane when it holds more than one, as one opacity group. A group cannot show its parts through each other, and `mode="out-in"` never puts two panes on the stage at once. I read all 20 StageSwap slots, and none puts a bare text node beside its element or a `display: contents` child in the pane, so the layer is always the whole stage. Dialog's and Popover's open content is teleported out of the pane, as at P16.

The mid-fade sheets (`mid/midfade-chromium.png`, `midfade-webkit.png`) bear this out. In both engines, Select's label and field fade together, as do Settings' rows and Save button, Paper & Glass's paper and five plates, Music Staff's window in its figure, Empty States' card and the Menu stage. Command's enter-mid tile is blank because its trigger sits below the travelling clip. The read reports one element fading in every frame.

The cost is in Chromium: glass inside the faded element shows unfrosted through the fade and frosts as the fade ends. The films read Music Staff at 5.92 and 6.11/255 in the frame after the fade (`tone/tone-chromium.txt`). Paper & Glass's plates sit inside `.pg-stage` the same way, unfilmed. P16 had a step of the same size at the travel's lift, so this is equal to P16. The step has moved from the lift to the fade's end, and the clip's own step is 0. Where the glass is the layer itself (Empty States' card, Surface's plate), it frosts through the fade (0.41 and 0.42). WebKit stays at or under 0.06 in every film. P17's brief asked 2/255 at a travel's end, and Music Staff does not meet it. The close driver chose the one-layer fade over that bound ("never parts one by one").

## 3. The chassis

It is more complex than at P16 and simpler than at `d7fb1d1f2`. Counted in code lines, without comments or blank lines:

| File | P16 `1a423c80d` | `d7fb1d1f2` | tip |
|---|---|---|---|
| `chassis/variants/StageSwap.vue` | 66 | 117 | 95 |
| `chassis/code/StoryCode.vue` | 38 | 38 | 51 |
| `router.ts` | 76 | 76 | 83 |
| `chassis/code/code-face.ts` | none | none | 7 |

The new `codeFace` field also runs through `section.ts`, `manifest.ts`, eight route rows and a `cardsSetCode` helper. Every addition answers a measured step, and the computed-style walk `d7fb1d1f2` added is gone. Three KISS points remain:

1. The fade left Vue's CSS Transition for `el.animate` because `d7fb1d1f2`'s walk needed it. That dropped the two-frame hold Vue gives both the leave and the enter. P17-verify's 0.26 first enter at 390 was that loss, and `afterPaint` rebuilds it by hand for the enter only. With the walk gone, the next pass can choose. Either keep `el.animate`, which leaves the child's own `transition` list alone where a CSS rule would override it, and give the leave the same hold. Or go back to Vue's classes with a `:duration`.
2. The same two-frame hold is written twice, as `afterPaint` in StageSwap and as the `held` flag in StoryCode.
3. The `codeFace` rows are a hand list taken from a survey that has already missed one row (Number Field, added in `15863894f`). A new story that sets the code face on its first screen without its row will flash.

None of the three is a page defect.

## 4. The code face

On first screens it holds, by the record's reads in both engines and both cells (`font/`, `item2/`). `/display/card` and the three arrival routes request no code face. `/`, `/dock`, `/dock/rail`, `/data/metric` and `/forms/number-field` fetch it, and the first frame that shows mono paints it in the face. WebKit's console names no font. Four costs and gaps remain:

- **Two section pages at 390 wait for nothing on screen.** `monosurvey-b0fd66681.txt` reads "first screen 0" for both `/` and `/forms` at 390, which wait on the face all the same. The record names `/` only. Both pages set the face below the fold and the face is `swap`, so the fetch would happen at layout anyway; the cost is the wait.
- **First load waits on the face.** The app mounts after `router.isReady()` (`main.ts` lines 73 and 122), and `beforeResolve` awaits `loadCodeFace()` on 13 routes: the eight rows, four section pages and `/`. On a cold load of one of them, the whole app waits for the code face, whose fetch starts only once the entry has run. At P16 nothing waited for a font. On localhost the first frame of `/` came at 109 ms in Chromium with both faces loaded. The live site was not read. The wait has no timeout; a failed load rejects, and the catch lets the route render.
- **The code disclosure waits too.** A press now awaits the face and the highlighter before anything moves, the chevron included. Pointing at "Code" or focusing it starts both loads early, but on touch `pointerenter` arrives with the press. At P16 the open was immediate and showed two instant changes: the fallback face swapping to the code face, and plain code turning coloured. The tip trades those for a delay, which was read only on localhost. The library's tween is a CSS keyframe animation (`disclosure.css`, `disclosure-open`), so the paused play state does hold it.
- **Interaction-revealed mono.** Typography's Mono register sets three `fira-code` lines, and its route has no row. The shortcuts dialog's keys (`AppShell.vue:318`) and the bottom dock's key hints (`BottomDock.vue:156-205`) are `font-mono` too. All three load the code face when they first show, so on a slow network their glyphs can swap inside the reveal's tween. P16 behaved the same way, since it loaded the face on first use. The first-screen survey does not cover these, and the sweep does not read glyphs.

## 5. WebKit

It ran the new StageSwap on `15863894f`. The sweep covered the 20 swap routes at 1440 light and 390. The mid-fade sheet shows the one-layer fade, and the films stay at or under 0.06/255. The page-error read gave 0 in both cells on eight loads, with the text face loaded each time. The route read is ok on 23 routes. The checker on `/dock/rail` and the three arrival routes fails only `/dock/rail`'s ResizeObserver error (O-391), where P16's build failed all four on the font warning.

It reads clean on the code line (all 19 routes with code, both cells), the console (0), the switch legs against the sweep's two-fifths bound (17 of 18, Command the exception) and the curve lines. It does not read clean on per-frame steps (section 1). The record's WebKit comparison with `d7fb1d1f2` (enter over 0.2 on 18 and 17 routes, against the tip's 11 and 8) leaves out a confound. `b0fd66681`'s tree differs from the tip's by one line, in `demo/stories/forms/routes.ts` (`git diff --stat b0fd66681..15863894f`), so its StageSwap is the same. Its WebKit sweep (`webkit/b0fd66681/`) read:

| Run, same StageSwap | Enter leg over 0.2 | Largest enter step | Sampled leave legs over 0.2 |
|---|---|---|---|
| `b0fd66681`, 1440 | 18 of 18 routes | 0.836 (Paper & Glass, first switch) | 22 of 57, up to 0.507 |
| `b0fd66681`, 390 | 13 of 18 | 0.508 (Data Table) | 12 of 57, up to 0.34 |
| tip, 1440 | 11 of 18 | 0.315 (Music Staff) | 7 of 57, up to 0.289 |
| tip, 390 | 8 of 18 | 0.292 (Data Table) | 0 |

The record sets that run aside "when a cure changed the tip" and gives none of its figures. Headless WebKit's frame steps here measure the machine's load as much as the code. What does not depend on load is the curves' 60 Hz shares: 0.185 for the leave and 0.264 for the enter. Safari.app was not run.

## 6. Against P16

**Pages at rest.** Against P16's close sheets, every tile is within 24/255 except Dialog's arrival at 1440 light and at 390 (`contact/diff-sheets.txt`). The 20 swap pages have no P16 sheet. Against the P16 build's own crops, 229 of 243 match. The 14 that differ are the progress indicators, the live substrates and Dialog's 390 arrival (`contact/diff-crops.txt`). I looked at all three swap sheets: every page renders whole in each cell.

**Dialog's arrival.** At 1440 light the tip matches the P16 build's crop, with the dark veil rectangle. At 390 the tip's crop shows the area under the dialog evenly blurred with a warm glow, and the Rename trigger is gone. The P16 build's crop (11-17), `d7fb1d1f2`'s (11-17) and `dist-f`'s (11-19) all show the trigger faintly behind the scrim. The tip's crop is 161 KB, against about 210 KB for the other three. These are O-390 e's two states. P16-close-verify placed the blurred one on P13 and P16's tip at 1440 light. `/containers/dialog` has no `codeFace` row, and its swap does not run on arrival. Each build has one capture, so the tip's head timing may have moved the race. The record files this tile with "the set that moves between any two captures, as P17-verify found", but P17-verify's set did not include it.

**Judged worse than P16, or at risk, and not holding the merge:**

1. On a cold load, 13 routes mount only once the code face has loaded, with no timeout. P16 waited for no font. It has not been read on the live site.
2. A "Code" press answers only once two loads finish. At P16 the open was immediate, with two instant changes inside it. It has not been read on the live site.
3. The chassis is more complex than P16's (StageSwap 95 code lines against 66), and the leave lost Vue's two-frame hold.

Equal to P16, and listed so the next pass sees them: the first enter at 60 Hz (0.264); Music Staff's 6/255 tone step, moved from the lift to the fade's end; Command's height snap; the interaction-revealed mono.

## 7. `src/`

Untouched. `git diff --name-only 1a423c80d bl/demo -- src` lists nothing. Master's 46 commits since the merge base `44c07aab6` touch none of `demo/`, `index.html` or `src/`. `bl/demo` is at `15863894f`, the SHA in `tip/TIP.txt`. The register lint (`driver/register-lint.pattern`) finds nothing in the 148 lines it read: the lines added after `d7fb1d1f2` and the seven commit messages. It also finds nothing in the Close.

## Blocking candidates, each judged twice

None holds.

1. **The first enter lands 0.264 per 60 Hz frame on every swap.**
   - First, against the hold rule: no page is broken or empty, and the curve is P16's, so this is not worse.
   - Second, as the owner (nothing changes instantly; the pass's own 0.2 bound): a quarter of the fade in one frame is a fast start, not a cut. It stood at P16, P17-verify booked it, and the close claimed it on headless Chromium's rate. The record needs correcting, and the cure is the next pass's first item: one constant.
2. **WebKit's frame steps: enter up to 0.315 on the tip's run, 0.836 on `b0fd66681`'s.**
   - First: no page is broken. The code line, console, checker, films and page-error read are clean in WebKit, and the same code read 0.315 and 0.836 under different loads.
   - Second, as the owner (Safari counts, and Playwright WebKit is not Safari): nothing here read Safari, and a loaded machine drops frames in any engine. There is no P16 WebKit sweep to compare, and P16's leave curve alone was 0.388. This is a gap in the witness, not a regression.
3. **The two new waits (mount on 13 routes, the "Code" press).**
   - First: on localhost each is within a frame or two. No page goes empty, because a failed `fonts.load` rejects and the catch renders the route.
   - Second, as the owner on a slow phone: a stalled font fetch now holds the first render of those 13 routes, and P16 never waited. That is a risk, not an observed defect. Read it on the live site right after the deploy.
4. **The chassis is more complex than P16's.**
   - First: this is not a page.
   - Second, against KISS: the growth is earned by measured cures, but it includes a Vue hold rebuilt by hand, for the enter only. That is the next pass's call.
5. **Music Staff's glass steps 6/255 at the fade's end in Chromium.**
   - First: the step is the same size as P16's at the lift.
   - Second: the brief's bound was 2/255. The close driver set the one-layer fade above it, by its own rule.
6. **Dialog's 390 arrival changed state.**
   - First: these are the library's two veil states, both seen on P16 builds, and P17 changed nothing on that page's arrival.
   - Second: the tip is the first 390 capture in the blurred state across four builds, with one capture each. That is a timing shift in the library's race, not P17's code. Two more captures are owed.

## Record corrections

- Item 3's verdict holds at headless Chromium's frame rate (about 135 fps). At 60 Hz the enter lands 0.264 in its first frame on every swap, and the close's own 60 Hz mid-fade read shows 0 to 0.26 in both engines.
- "In WebKit the long frames fall after the hold, at the headless rate, on second switches as well as first": the first switch is the largest enter leg on 10 of the 11 failing routes at 1440. At 390, 5 of the 8 failing routes have a first switch over 0.2.
- The WebKit comparison with `d7fb1d1f2` leaves out `b0fd66681`'s run of the same StageSwap: enter over 0.2 on 18 of 18 routes at 1440, up to 0.836, and leave legs up to 0.507.
- The WebKit sampled leave legs over 0.2 (7 at 1440, up to 0.289) go unreported. "Leave 0.185 on all 18 swaps" is the curve line.
- Standing lists `/` at 390 waiting on the code face. `/forms` at 390 does too.
- Dialog's 390 arrival is the veil's blurred state, caught at 390 for the first time on this tip. P17-verify's set of moving crops did not include it.

## Owed

Right after the deploy: the live first paint of `/` and of `/data/metric` on a cold cache, a cold "Code" press at 390 on the live site, and two more 390 arrival captures of Dialog on the tip.

For the next pass:

- The enter curve: one constant, 0.111 at 60 Hz.
- The leave's two-frame hold, or a return to Vue's classes.
- One hold helper shared by StageSwap and StoryCode.
- The code face on Typography's Mono register and on the shortcut keys.
- Music Staff's and Paper & Glass's glass inside the faded layer (6/255 in Chromium).
- Command's height snap (O-390 d).
- Safari.app.
