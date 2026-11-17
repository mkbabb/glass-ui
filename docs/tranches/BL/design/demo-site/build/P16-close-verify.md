# P16 close, the verify

Seat: claude-opus-5-5 (asserted from the seat's own identity; Fable is out of quota until 2026-11-21, so this verify runs on Opus by the orchestrator's standing ruling). 2026-11-17. Read only: no browser ran and nothing in the repo changed except this file. The zooms, pixel diffs and per-frame means below were made here with Pillow over the banked PNGs, into the session scratchpad; none is banked.

Read: `P16.md` with its Close, `P16-verify.md`, `git log --stat 0b4a4d936..` on `bl/demo` and the diffs of the four demo commits (`b9cf75f7a`, `86e4e6fc1`, `03031c402`, `1a423c80d`), every contact sheet under `shots/P16/close/contact/` beside `shots/P15/contact/`, the `railcard/` crops and readings, the `edge/` films (every frame, both builds, both engines), the reach survey, the put-back lift, the checker and sweep texts in three cells, the WebKit sweep and checker with their `base-p15` and `base-p16` baselines, the reruns, vitest, the export gate and the typecheck. Every crop of the close build was diffed against the same crop of `86e4e6fc1`'s build (`shots/P16/tip/`). Judged against `OWNER-ORDER.md`.

## Verdict

**Merge.** No page is broken, empty or worse than P15. The Section Rail card on `/dock` is P15's to the pixel. The Rail page reads as the section's dashboard. Every focus ring the checker reads draws whole in Chromium and WebKit, and with the clip put back the tip differs from itself in exactly the 23 places P15's clip hid. The steps the power hold stopped all ran, on one build of `1a423c80d`, and read as P15 apart from two legs that are noise at their bounds. Nothing under `src/` changed.

Two things the Close does not say, neither holding the merge: in Chromium a glass card inside a travelling swap still steps about 6/255 in tone as the clip lifts (the step P15 took at the fade's end, moved later), and the open Dialog's 1440-light arrival tile renders the focus veil in a different state from P15's.

## `src/`

Untouched. `git diff --name-only master...bl/demo` lists `demo/chassis/variants/StageSwap.vue`, `demo/stories/data/timeline.stage.vue` (its comment only) and `demo/stories/dock/rail.stage.vue`. `git merge-tree --write-tree master bl/demo` is clean against master `40f02f046`. `bl/demo` and `origin/bl/demo` are both at `1a423c80d`, the SHA `close/tip/TIP.txt` names.

## 1. The Section Rail card on `/dock`

The size P15 showed. `railcard/railcard-{p15,tip}.txt`: fit 0.5333, natural box 307×360, rail pill 36.27×95.47 at 1440 in both themes on both builds; 0.6483 and 44.08×121.22 at 390 on all three builds. On the tip the slot reads `display: none`. `86e4e6fc1`'s 0.5066 and 34.45×90.68 are gone. In `railcard-p15-p16-tip.png` the left and right columns match; the middle one is the smaller specimen P16-verify found.

Contact sheets against P15: `contact-dock-1440`, `contact-dock-m390` and both home sheets have no pixel over 24/255. On `contact-dock-{d1440,l1440}` every pixel over 40/255 lies inside the `/dock/rail` tile's Card, which is the line. D5a and D5b pass in each cell (ten cards, one bar figure, Dial Bar).

The code: `[data-card-specimen] .rail-trend { display: none }` in an unscoped block. `.rail-trend` occurs only in `rail.stage.vue` and `data-card-specimen` is set only by `SectionPreviewCard.vue:60`, so the rule reaches the card and nothing else. With the slot out of layout the flex gap goes too.

## 2. The Rail page as a dashboard

At 1440 (`close/tip/dock_rail-{d1440,l1440}.png`) the Card holds the title, three figures and one line climbing across the rest of the card, 108 to 115 with a flat last year. At 390 the line runs under the stacked figures to the card's foot. Headline figures over their trend is a dashboard's form, and it reads as part of an app. The line has no axis, years or end value, which fits "component first". The right third of the 1440 stage stays blank, as at P15.

D6 reads 0.023, 0.023 and 0.015 in Chromium and the same in WebKit (`webkit/check-webkit-*.txt`), so WebKit sizes the SVG to its box. The line's fade passes in three cells (`rerun/railfade.txt`: 26 to 27 frames a leg, largest step 0.107 to 0.119).

## 3. Focus rings, and what the clip used to hide

- **A4.** Dialog, Sheet and Menu draw their rings whole in Chromium in three cells and in WebKit at 1440 light and 390. On P15's build WebKit fails A4 on Dialog in both cells (`webkit/base-p15/`), so the line bites in that engine too.
- **The crops.** Dialog's closed trigger, P15 against the tip, zoomed 4×: P15's ring is four corner arcs, the tip's is whole, at 1440 light and at 390.
- **The put-back.** `close/lift/lift-tip.jsonl` and `lift/lift-p15.jsonl` each hold 258 reads with 23 changes outside a swap: the same 23 keys, the same pixel counts, the same boxes. At rest the tip draws what P15's clip hid and nothing else: the rings on Dialog's and Popover's triggers, the cut shadows (Empty States, Command, Music Staff, Surface at Overlay and Opaque, Dialog's Delete, three section cards at 1440 light), and Colors' two one-pixel rows at 390. Both runs mark Dialog's Subtle and Strong as missed in each cell, so the reads cover 258 of 264 states.
- **Every stage control.** At rest no StageSwap clips. The stage plate's clip and Data Table's narrow clip stand as before, and neither is P16's.

## 4. The shadow edge as a height move ends

**Below and beside the box: cured.** On `86e4e6fc1`'s build the flat-cut shadow appeared whole in the lift frame, up to 39/255 (`edge/before/edge-*-read.txt`). On the tip, the lift frame matches the last clipped frame within 1/255 below the foot and to each side, on all four moves, in Chromium and WebKit (`edge/after/reach-*.txt`). In the `film-*.png` strips the after rows show the shadow whole on the last clipped frame. 3rem clears the deepest shadow that travels (Command's 36 px, `reach-l1440.txt`). Surface reaches 51 px but its height never moves.

**Inside the box: one step remains, in Chromium.** The mean of the lowest 20 rows of Empty States' card face, per stepped frame, Empty to Loading:

| Build | f12 | f13 | lift | rest |
|---|---|---|---|---|
| `86e4e6fc1`, blue | 194.3 (fade 0.999) | **188.6** (fade 1) | 188.2 | 187.4 |
| tip, blue | 194.0 | 194.1 (fade 1, clip on) | **188.2** | 187.3 |

Loading to Error reads the same (186.7 → 181.4 at the fade's end before, 186.7 → 181.1 at the lift after), and red moves about 3 the other way. WebKit shows no step on either build. The card is glass, and its backdrop sample stops at the nearest backdrop root. The pane's fade made one until the fade ended, and `clip-path` makes one too, so the tip keeps the card's unsampled tone until the travel ends. It is P15's step, the same size, one frame later on these moves (218 ms travel, 200 ms fade). On a travel near the 450 ms cap it would come up to 250 ms later than at P15. The Close's "the lift now changes nothing" holds below and beside the box; the cure for the step belongs with the glass backdrop root, not the swap.

**Growth.** Accordion One panel to Multiple (`accordion-growth-before-after.png`): with the cut 3rem lower, one frame on each build slices "How do I track a parcel?" through its letters, one frame earlier on the tip. Standing, not worse. From the code, unmeasured: in Settings the swap is the Card's last child, so a growth (9 to 25 px across its tabs) can paint the new rows up to that far past the swap into the card's padding while the pane is near 0.13 opacity. P15 cut them at the swap's edge.

## 5. The steps the power hold stopped

One chain, 07:28 to 08:25, on one build of `1a423c80d` (`close/tip/tip-run.log`, `TIP.txt`). Each preview was started under `guarded` and stopped by PID.

| Run | Reading | Against P15 |
|---|---|---|
| Build | clean, `dist-demo/assets/404.html` written | as P15 |
| Typecheck | `tsconfig.json` clean; `tsconfig.test.json` the two `fourier-math` import errors | as P15 |
| Checker, 78 routes | 1,517 / 0 / 22; 1,517 / 0 / 22; 1,504 / 0 / 35 (counted here) | P15 1,513 / 1,513 / 1,500 passes; the four added per cell are D6 and A4 |
| Sweep, 1440 dark and light | 77 pass, 1 fail each: Command's standing height snap | as P15 |
| Sweep, 390, all 78 routes | 76 pass, 2 fail: Command's, and Empty States 3 of 4 | P15: Command's only |
| WebKit sweep, 23 routes, 1440 light and 390 | ok on every route in both cells | first run |
| WebKit checker, Rail and the three arrival routes | 83 pass, 4 fail per cell, all line 12 | P15's build: the same four plus D6 and A4 on Dialog |
| Put-back lift | 258 reads, 23 changes, key for key P15's | as P15 |
| vitest | 34 of 35 files, 531 pass, 1 expected fail; `FourierField.smoke` fails on its import | as P15 |
| Export gate | 15 of 15 | as P15 |
| Line's fade | pass, three cells | first run |
| Contact sheets | made, eleven | read here against P15 |

**Empty States at 390.** The first leave fade's largest step reads 0.404 against 0.40. Three reruns on the tip pass (0.383, 0.364, 0.362), P15's build reaches 0.386 and `86e4e6fc1`'s 0.358 (`rerun/empty-390*/`). The leave runs before `onEnter`, so no line either commit changed runs during it. Noise at the bound.

**WebKit line 12.** The Plus Jakarta Sans preload warning on all four routes and the Rail's "ResizeObserver loop completed with undelivered notifications" read the same on P15's build and `86e4e6fc1`'s. Neither paints.

## Anything worse than P15

- `/dock`, `/` and home sheets: no pixel over 24/255. The dock pages: only the Rail tile's Card.
- Containers sheets: only Dialog's closed ring box, which is the cure.
- The close build against `86e4e6fc1`'s, crop for crop over 243 crops: nine differ by more than 24/255. They are the `/dock` index at 1440 (the Rail card, restored), Feedback and Progress (the moving indicator), Constellation and Blob (the live field, 2 px and 0 px over 40) and Dialog's 1440-light arrival.
- **Dialog's 1440-light arrival.** P15 and `86e4e6fc1` show a dark rectangle behind the open dialog with the Rename trigger unblurred inside it. The tip shows that area evenly blurred, with a warm glow under the dialog, as P13 showed it. The sweep's ink reading follows the state: the dialog's words read 1.7 to 2.2 at P15 and `86e4e6fc1` and 2.9 to 3.3 on the tip (P13 3.2 to 3.4), and the quiet Cancel reads 1.53 at P15 and 1.16 on the tip (P13 1.25). At rest this page's CSS and DOM are the same on `86e4e6fc1` and the tip, since the commits act on the card specimen and during a height travel, and the dialog opens on load with no travel. The dark and 390 arrival crops match `86e4e6fc1`'s within 24/255, and Sheet's light arrival matches. There is one capture per build. So this is the library's focus veil (O-390 e, booked for 11.1.2) landing in one of its two states at the sweep's 2.5 s capture, not P16's change.

## Blocking candidates, each judged twice

None holds.

1. **Dialog's 1440-light arrival differs from P15's.**
   - First, against the hold rule: not broken and not empty. The dialog reads, and five of its six ink runs read higher than at P15.
   - Second, as the owner: P15's dark smudge with a sharp button inside reads worse than an evenly blurred page. Cancel is under 3:1 on both, and its row is booked. Not a hold, and not P16's to claim either way.
2. **The card face steps at the lift in Chromium.**
   - First: P15 took the same step at the fade's end, at the same size.
   - Second, against "nothing changes instantly": the step breaks it on both builds, and one frame later is no worse to the eye on the moves filmed. Not a hold; on record.
3. **The 390 sweep's Empty States line is red.**
   - First: the leg runs before the changed code.
   - Second: reruns pass on all three builds, and P15's build reaches 0.386. Noise at the bound.
4. **WebKit line 12.**
   - First: the same four fails on P15's build.
   - Second: a preload warning and a ResizeObserver loop, neither painting. Standing.
5. **A growth's cut sits 3rem lower.**
   - First: text is sliced by the cut on both builds.
   - Second: the slice comes on a pane fading in, a frame earlier, and the stage plate still bounds it. Not worse.

## Copy

P16's close paints no new word. `rg -P -i -f driver/register-lint.pattern` over the Close section of `P16.md`, the two close commit messages and their added demo lines: no hits.

## Record corrections

- `P16.md` Close, item 3, and `1a423c80d`'s message ("nothing appears as the clip lifts", "the lift now changes nothing"): true below and beside the box. Inside it, Chromium's glass card face steps about 6/255 at the lift (section 4).
- `P16.md` Close lists the contact sheets with no reading against P15. Read here: Dialog's 1440-light arrival tile differs (section 5).
- `P16.md`, item 2 ("in every variant option"): the lift misses Dialog's Subtle and Strong in each cell, on P15's build and the tip alike.
- `close/lift/lift-tip.txt` prints its first four 1440-dark routes twice. The jsonl is complete.

## Owed, not holding the merge

- Two more arrival captures of Dialog at 1440 light on `86e4e6fc1`'s build and the tip, to place the veil's two states; then with O-390 e.
- The glass backdrop root: a glass card in a fading or travelling swap samples nothing until both end, then steps. A library or chassis row for after the merge.
- Empty States' first leave fade at 390, at the 0.40 bound on every build.
- WebKit's console on the Rail and the arrival routes, standing.
- Standing from P16-verify: Navigation's blank lower quarter at 1440, Pager's bare "2", Safari.app not run, the library rows as booked.
