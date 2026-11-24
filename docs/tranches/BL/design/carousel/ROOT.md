# Carousel jitter: the root and the design (O-421)

Seat: claude-opus-5-5 (asserted from its own system identity), 2026-11-23. This is the folded ROOT: it follows `RECORD.md`, takes `critique.md` as `fold.md` rules it, and replaces the first ROOT. `cure.patch` and `near-snap.patch` are the folded patches.

Engines, as in the record. **Chromium** is Playwright's headless shell 149.0.7827.55 on the GPU lane (`--use-angle=metal --enable-gpu-rasterization`), sampled each animation frame (rows at a 7.5 to 8.3 ms median). It is not a phone. Frame claims come only from it. **WebKit** is Playwright's WebKit 26.5. It is not Safari, it cannot send a moving touch, and its wheel is unphased steps, so its cells are the wheel, the pager and the logic witness. Every reading names one of the two.

**RED** is glass v11.1.0 (d19e12559). **GREEN** is v11.1.0 with the folded `cure.patch`. The first cure as written is kept where a cell shows what the fold changed (`witness/probe-green/`, and the `cure1` witness rows). Each was built from `git archive` into `trees/`, served on 5381 to 5384, and filmed with `tools/carousel-probe.mjs` and the record's inputs. The 1-minute load ran 26 to 46 during the folded Chromium films (the machine was shared).

## Verdict

- **The platform's scroll-snap is sound, and the jitter is glass's own writes around it.** With the cure, every touch, wheel and pager cell in Chromium runs 0 reversals and rests 0 px off its snap point, and a held finger keeps the picture 1:1 (0.99 at 1440, 0.96 at 390): the bare strip's own numbers. In WebKit the wheel now carries the strip, with one snap-back left per wheel gesture whose cause is not named (§2.2).
- **No fork between native snap and a pointer glide.** Native stays (§5).
- **11.1.2** is `cure.patch`: five files, +167 −90 lines, 122 B gzip larger than v11.1.0 in a consumer build (§3). It fixes ten faults (§1), among them the Home View study's carousel defect (the dots and the slides disagree), a stale pitch after a resize, presses that animate under reduced motion, and an engine without `scrollend`.
- **The content lag goes by default, and bringing it back is the owner's call** (§1.3, question 1). It cannot return without a per-frame write, and WebKit drops the trackpad when anything is written per frame.
- **11.3.0** gets one `moving` signal for heavy live members (`near-snap.patch`, +36 B, §4), the commit at the decision (§1.2), and the autoplay (CR-06). On the cure a consumer's own "run only while still" rule is already smooth (§4); `moving` makes that rule direct and right at the strip's end.
- **Atlas** runs a glass line whose page turn causes its 150 to 350 px jumps (record §2.1). Its path onto the cure is §7: 11.1.2 takes the line's resize, rest and reduced-motion handling, and the spring turn for presses is question 2.

## 1. The causes and the cures

Lines are v11.1.0's. Paths are under `src/components/`.

| # | Source | Cause | What it does | Cure (11.1.2) |
|---|---|---|---|---|
| 1 | **Commit echo** | `deck/composables/useDeckSnap.ts:167-170`: `watch(deck.index)` calls `scrollTo` on every index change, including the ones the strip itself committed (`:98-101`, reached from `:114-121` and `:127-139`) | Chromium: a smooth scroll lands mid-gesture, replaces the platform's snap curve, pulls the strip on under a held finger (carry ratio 1.29 at 1440, 1.36 at 390, against bare's 0.99 and 0.96), restarts the velocity (cause 3's lurch) and cuts programmatic jumps short (P-21a). WebKit: flat turns two slides on a 60 % wheel. Atlas's line: an instant seat fights the platform's snap animation, giving jumps of +315 px | `heading`: the arm remembers the member the strip is going to (the last it reported, or the last it was sent to). The watcher scrolls only when the index is somewhere else |
| 2 | **Per-scroll writes on the scrolled content** | `carousel/CarouselContent.vue:50-75` writes `--member-scale` and `--member-lag` on every member on every scroll event; `carousel/styles.css:43` applies the scale to the member, which is the snap area (`:39`) | (a) Chromium measures a snap area on its transformed box: rests 18 px (1440) and 7 px (390) off, then creeps the last pixels in. (b) WebKit snaps a trackpad wheel back after each event when anything in the scrolled content is restyled per scroll (§2.2) | The travel scale becomes a scroll-driven animation on the **content** node: `animation-timeline: view(inline)`, `animation-range: exit -100% exit 100%`, 1 at the snap point and 0.965 one member away, inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`. Nothing is written per frame (BM DESIGN rule 4) |
| 3 | **Velocity lag** | `CarouselContent.vue:60,67`, `styles.css:54-60`; the velocity is a two-sample quotient on the main thread (`useDeckSnap.ts:103-112`) | The lag swings its whole 8 % ceiling in one frame. With causes 1 and 2 cured it still steps the content backwards through every settle: 20 reversals (37 px) in a 1440 swipe, 26 (54 px) in a flick (`witness/probe-green-lagkept`, still rows skipped) | Removed by default; §1.3 states the trade and question 1 asks the owner. The `memberLag` and `MEMBER_LAG_*` exports stay until 12.0.0 |
| 4 | **Velocity never zeroed** | `useDeckSnap.ts:103-112`: only scroll events feed the velocity, so the last one stands at rest | The lag's content rested 9 px (Chromium) to 65 px (WebKit) off its housing (record §2.2); any reader of `deck.velocity` reads a speed at rest | `rest()` feeds the position with velocity 0 on `scrollend` |
| 5 | **Double release** | `useDeckSnap.ts:157-162`: the hold is released on `scrollend` and again by a 900 ms timer | An earlier press's timer drops a later press's hold, and the observer commits the member being left: Previous pressed 800 to 900 ms after Next is undone (§2.3) | Release once, whichever comes first, and clear the timer |
| 6 | **Reports dropped during a hold** (CR-09) | `useDeckSnap.ts:98-101`: a commit during a programmatic scroll is dropped, and the engine reports nothing more if the strip comes back to the member it last settled on | Next, then the page's own scroll back to member 0 within 60 ms: the strip rests on 0 with member 1 active | At the hold's end, if the strip rests somewhere other than where it was sent, commit the member whose own offset it rests on (`restingOn`) |
| 7 | **The model is one-way** (the Home View study's defect; W-L.2 item 9) | `carousel/Carousel.vue:24` with `carousel/useCarousel.ts:35-43`: `active` is read once, at creation | A PagerDots bound to the same `v-model:active` moves its dot and not the strip: at 390 every press, at 1440 every dot | `watch(active, (to) => deck.go(to))`. `go` ignores the deck's own change coming back |
| 8 | **A cached pitch** | `useDeckSnap.ts:146`: `scrollTo` goes to `index × extent`, and `extent` is measured only at mount and on a member-count change (`:171-174`, `:179`) | After a resize or a rotation a press goes to the old pitch's offset. Chromium, 1440 → 1000: the strip rests on member 3 with member 2 active (v11.1.0 and the first cure); 390 → 844: the first cure rests on member 1 with the dots on 3 | `scrollTo` and the reconcile read each member's own offset (`offsetOf`, clamped to the strip's end); a `ResizeObserver` re-measures the pitch the continuous channel divides by |
| 9 | **Reduced motion ignored** (CR-08) | `useDeckSnap.ts:143`: `scrollTo` passes `behavior: "smooth"`, which overrides the stylesheet's `scroll-behavior: auto` under `reduce` (`styles.css:71-73`) | A press animates under reduced motion: 64 rows over 575 ms in Chromium (62 over 601 ms in the first cure) | Under reduced motion a press scrolls `instant`: it arrives in one frame |
| 10 | **No `scrollend`** | Safari 26.0 and 26.1 do not fire it; v11.1.0's release falls to the 900 ms floor | The hold's reconcile never runs and the velocity is never zeroed: the held cell fails with the event removed, in both engines | Where the engine has no `scrollend`, 150 ms with no scroll event dispatches one on the strip, so `rest()` and the reconcile run as they do elsewhere |

### 1.1 Left as they are

- **inert and aria-hidden flips** (`CarouselItem.vue:50-56`): a few ms at the commit (style 1.2 to 1.9, layout 0.7 to 1.6, script 2.3 to 4.4) and no dropped frame (record §2.3).
- **The pager's re-render** (about 200 writes a turn): no dropped frame (record §2.5). The dots are the owner's (question 4).
- **The first press's frame.** The first Next at 1440 (Chromium) has one long frame in some runs: 17.6 ms (record), 25.0 (v11.1.0), 26.3 and 33.3 traced (first cure), 32.6 (first near-snap), 23.5 (folded cure), and 29 to 52 ms on the live-figure pages. No long task or long animation frame is attributed, the loads differed, and no build is free of it. No cause is claimed.
- **Found, not cured here: focus falls out of the strip.** With a link in each slide (atlas's previews are anchors), Tab focuses slide 1's link, the first ArrowRight turns the strip, and the commit makes that slide `inert`, which drops focus to `body`; later presses do nothing. v11.1.0 and the cure alike, in Chromium (§2.3). With nothing focusable in the slides, Chromium focuses the strip itself and the arrows turn three slides. In WebKit, Tab reaches neither the strip nor a link (only the dock's buttons), so the arrows never reach the strip there. It predates the cure and is not jitter, so it is placed as a new row for the accessibility wave: keep focus in the strip when its slide goes inert.
- **The fade half of O-327.** The neighbours' opacity still starts at the commit and ends about 60 ms after rest. It moves with the commit timing (§1.2).
- **The `window` projection** switches the newly active member's scale from 0.965 to its timeline value in one frame at the commit, as v11.1.0 did in script. Unfilmed; no page in glass's `src` or `demo` uses `window`. With §1.2.

### 1.2 Commit timing (law 3), for 11.3.0

v11.1.0 commits from an IntersectionObserver at 55 % visibility in every engine: `watch(deck.total)` (`useDeckSnap.ts:171-174`) installs it, though the comment at `:180-186` called it the fallback (the cure rewrites that comment). So a carry commits at 552 ms with the finger still down until 947 ms (Chromium, 1440). Law 3 says a drag commits what the finger lifts over. That is pre-existing, and 11.1.2 keeps it.

A first cut removed the observer where `scrollsnapchange` exists. Filmed (`witness/probe-green-io-off`), the commit then came only at rest, 1045, 958 and 1107 ms into the swipe, flick and carry, because Chromium fires `scrollsnapchange` with `scrollend`. The dots would move only after the slide had landed, so that change is not in 11.1.2.

The cure for 11.3.0: commit at the lift. That means `scrollsnapchanging` (Chromium) or the nearest member (WebKit) read at `touchend`, plus a midpoint crossing while no finger is down for a wheel or a flick. It is not prototyped here.

### 1.3 The lag, and what removing it trades

The lag was a momentum channel: the content trailed its housing by its velocity times a time constant, up to 8 % of the member's width (30 px at 390, 78 px at 1440). `restraint.md` says a cure never removes weight or momentum, so this is the owner's to rule.

It cannot be kept as it was. With the echo and the scale cured, the lag alone still steps the content backwards through every settle (cause 3). A lag needs the scroll's velocity, CSS has no velocity input, and every per-frame form tried makes WebKit drop the trackpad wheel (§2.2, the write table). BM rule 4 forbids the per-frame write anyway.

What the owner gets instead is the platform's own momentum: the strip coasts and settles on the browser's snap curve. That settle is longer than v11.1.0's, because v11.1.0's echo replaced the curve with its own smooth scroll. Chromium, flat page, from the lift to the last moving frame: 331 → 696 ms at 1440 and 231 → 547 ms at 390, the bare strip's 690 and 545. Safari's curve will differ.

Question 1 (§10) puts it to him. O-327 is part-cured: its lag is gone and its rest offset is 0, its fade is untouched (§1.1).

## 2. The witness

### 2.1 Chromium (GPU lane), RED → GREEN

A reversal is a moving step (over 0.5 px) against the last moving step, still rows skipped; the largest such step is in brackets. Rest is ms from the lift or press to the last moving frame. Off is px from the snap point at rest. Carry is the picture's travel over the finger's. RED is `witness/probe-red`, GREEN is `witness/probe-green-fold`.

| cell | gesture | reversals | rest ms | off px | carry | frames > 25 ms |
|---|---|---|---|---|---|---|
| hero (travel) 1440 | swipe / flick / carry | 9 (34) / 7 (51) / 18 (51) → 0 / 0 / 0 | 496 / 598 / — → 690 / 828 / 157 | 18 → 0 | 1.29 → 0.99 | 0 → 0 |
| hero 390 | swipe / flick / carry | 5 (13) / 7 (26) / 6 (15) → 0 / 0 / 0 | 309 / 291 / — → 550 / 616 / 184 | 7 → 0 | 1.36 → 0.96 | 0 → 0 |
| hero 1440 / 390 | wheel (phased) | 38 (68) / 10 (20) → 0 / 0 | 316 / 227 → 74 / 126 | 18 / 7 → 0 | | 0 → 0 |
| hero 1440 | next / prev / dot | 6 (19) / 5 (13) / did not move → 0 / 0 / 0 (2072 px) | 537 / 543 / — → 519 / 521 / 743 | 18 → 0 | | 0 → 0 |
| hero 390 | next / prev / dot | the strip did not move (cause 7) → 0 / 0 / 0 | → 389 / 398 / 539 | → 0 | | 0 |
| flat 1440 | swipe / flick / carry | 0 → 0 | 331 / 460 / — → 696 / 818 / 150 | 0 | 1.29 → 0.99 | 0 |
| flat 390 | swipe / flick / carry | 0 → 0 | 231 / 290 / — → 547 / 615 / 183 | 0 | 1.35 → 0.96 | 0 |
| flat 1440 / 390 | wheel (phased) | 0 → 0 | 307 / 206 → 73 / 138 | 0 | | 0 |
| demo 1440 | swipe / flick / carry | 4 (11) / 4 (10) / 6 (19) → 0 | 203 / 237 / — → 505 / 532 / 182 | 5 → 0 | 1.32 → 0.95 | 0 |
| demo 390 | swipe / flick / carry | 6 (12) / 4 (26) / 12 (18) → 0 | 198 / 252 / — → 517 / 582 / 182 | 6 → 0 | 1.29 → 0.96 | 0 |
| demo pager 1440 / 390 | next / prev | 0 → 0 | 175 / 173 → 218 / 188; 326 / 309 → 344 / 344 | 0 | | 0 → 1 (the first press, §1.1) / 0 |
| hero webp 1440 (RED from the record) | swipe / flick / carry | 11 (35) / 13 (51) / 23 (50) → 0 | 508 / 647 / 155 → 696 / 817 / 160 | 5–7 → 0 | 1.30 → 0.99 | 0 |
| hero webp 390 (RED from the record) | swipe / flick / carry | 5 (13) / 7 (36) / 7 (17) → 0 | 363 / 437 / 146 → 552 / 613 / 187 | 3 → 0 | 1.34 → 0.96 | 0 |
| bare 1440 (the control) | swipe / flick / carry | 0 → 0 | 690 / 826 / 156 → 690 / 829 / 159 | 0 | 0.99 | 0 |
| bare 390 | swipe / flick / carry | 0 → 0 | 546 / 618 / 190 → 545 / 611 / 188 | 0 | 0.96 | 0 |

"—" marks a RED carry whose motion ended before the lift: the echo had already carried the strip on.

- **The settle is the platform's** (§1.3). GREEN's rest after a swipe is bare's to within 6 ms at both widths.
- **Per-gesture style writes on the members** (hero): RED 223 to 854 → GREEN 0. The pager's own writes (about 200 a turn) are unchanged.
- **The commit** comes where RED's did, within 14 ms: 360 ms into the swipe, 264 ms into the flick and 552 ms into the carry at 1440 (§1.2).
- **The travel scale** (`tools/scale.mjs`, both engines, the first cure's CSS, unchanged by the fold): 0.965 / 1 / 0.965 at rest, within 0.0015 of v11.1.0 in flight. The view timeline ramps over the member's width rather than its pitch, which is the whole difference.

### 2.2 WebKit (Playwright 26.5, not Safari), RED → GREEN

The wheel is 60 % of the strip in unphased steps over about 555 ms. Rows run at a 10 ms median in `probe-red` and `probe-green-fold` (the record's own WebKit runs were 17 and 33 ms), against paints of about 16.7 ms, so rows repeat and no WebKit frame claim is made. Reversals are counted with still rows skipped.

| cell | strip offset when the last wheel event lands | `scrollend` events during the wheel | reversals (step back) | rest ms | lands on |
|---|---|---|---|---|---|
| hero (travel) wheel 1440 / 390 | 0 / 0 → **559 / 192 px** | 34 / 31 → **1 / 1** | 42 / 38 → **2 / 2** (21 px at 49 → 59 ms; 28 px at 81 → 91 ms) | 498 / 459 → 773 / 619 | slide 2 (RED 8 px off at 1440) → slide 2, 0 off |
| demo wheel 1440 / 390 | 0 / 0 → 161 / 204 px | 31 / 29 → 1 / 1 | 39 / 42 → 2 / 2 (13 px; 8 px) | 445 / 463 → 580 / 589 | slide 2 |
| flat wheel 1440 / 390 | 1004 / 234 → 602 / 234 px | 0 → 0 | 0 → 0 | 520 / 284 → 762 / 604 | **slide 3** at 1440 (two slides on one wheel) → slide 2 |
| bare wheel 1440 / 390 (the control) | 602 / 234 → 602 / 234 px | 0 → 0 | 0 → 0 | 762 / 608 → 741 / 578 | slide 2 |
| hero pager 1440: next / prev / dot | | | 0 / 0 / the dot did not move → 0 / 0 / 0 (2072 px) | 281 / 231 / — → 215 / 204 / 217 | off 0 / 18 / 18 px → 0; the content's stuck lag (−6.5 %, about 65 px) → 0 |
| hero pager 390: next / prev / dot | | | the strip did not move → 0 / 0 / 0 | → 260 / 249 / 212 | 0 px off |
| demo pager 1440: next / prev | | | 0 / 1 (1 px, two scroll calls) → 0 / 0, one call | 131 / 266 → 161 / 142 | 0 px off |

The wheel now moves the strip with the hand: bare reaches 602 px by the last wheel event, and GREEN reaches 559 px. Flat no longer turns two slides on one wheel (cause 1).

**One snap-back is left** in every travel wheel: early in the gesture the strip steps back to 0 once (21 px at 1440, 28 px at 390; 13 and 8 px on the demo), then follows the wheel again. The first cure had the same step at the same moments (`probe-green`).

The variants, on the cure's own page (`tools/snapback.mjs --travel --repeat 3`, WebKit, three runs each; `witness/snapback-fold-webkit.log`):

| variant | 1440: strip at the last wheel event; deviation | 390 |
|---|---|---|
| the cure as it ships | 530–559 px; 21 px back at 49–54 ms, 3 of 3 | 192 px; 28 px back at 85–87 ms, 3 of 3 |
| the scale's range set back to `cover` | 530–559 px; 21 px back at 51–54 ms, 3 of 3 | 192 px; 28 px back at 79–100 ms, 3 of 3 |
| the neighbours' 0.7 dimming and its transition off | **602 px (bare's); none, 3 of 3** | **234 px (bare's); none, 3 of 3** |
| the scale's animation off | 1049–1052 px: the strip snaps on to slide 2 mid-wheel (431–461 ms), runs 13–16 px past and comes back, 3 of 3 | 234 px; none, 3 of 3 |
| the dimming moved onto the content node (`travel-opc`) | 1049 px: the same forward snap (443–466 ms), 13 px back, 3 of 3 | 234 px; none, 3 of 3 |

The early snap-back needs both the scale's animation and the dimming on the slide: take either away and it goes. Only taking the dimming away leaves the strip with the hand at both widths. With the scale off, or the dimming moved onto the content, the strip instead leaves the hand at 1440 and snaps on to the next slide at about the time the slide is committed and the dimming changes. No variant cures it and keeps the dimming, so the cause is not named, `travel-opc` stays out of 11.1.2, and 11.1.2 ships with this one snap-back in WebKit's wheel. Whether Safari, with a real phased trackpad, shows it at all is unread; if it does, the dimmed neighbours against a clean trackpad is a choice for the owner.

What makes WebKit drop the wheel, isolated (`tools/snapback.mjs`, the first seat's run, WebKit, the hero page with the Carousel's own writes off, a scroll listener per variant writing on every scroll event):

| variant | strip offset when the last wheel event lands (1440 / 390) | `scrollend` events during the wheel |
|---|---|---|
| nothing written (control) | 602 / 234 px | 0 / 0 |
| a custom property on each member that no rule reads | 602 / 234 | 0 / 0 |
| `--member-scale` on each member (v11.1.0's write) | 1 / 0 | 33 / 32 |
| `--member-scale` on each content node, read by its `scale` | 1 / 0 | 30 / 28 |
| `scale` on each content node, set directly | 1 / 1 | 29 / 28 |
| no listener: a `view()` scroll-driven animation scales each content node | 602 / 234 | 0 / 0 |

Moving the scale off the snap area was not enough: an intermediate build that wrote it on the content node per frame (`witness/probe-green-jsscale`) still had 22 to 29 snap-backs. Any per-scroll restyle of the scrolled content does it, and the scroll-driven animation does not.

### 2.3 The logic witness (`tools/witness.mjs`)

One browser per run, a context per cell. RED is v11.1.0, cure 1 the first cure as written, GREEN the folded cure.

- **race**: on the demo's chevron pager, Next, then Previous 760 to 900 ms later (7 lags).
- **model**: on the hero, press the dot two ahead. The dots share the Carousel's `v-model:active`, as on atlas.
- **held**: Next, then 60 ms later the page scrolls the strip back to member 0.
- **resize**: turn to member 1, change the width (1440 → 1000 with the chevrons; 390 → 844, a phone turned, with the dots), then press for member 2. Holds when the strip rests on member 2's own offset with member 2 active and the dots on 3.
- **keyboard** (1440): Tab into the strip, then ArrowRight three times, without and with a link in each slide.
- **reduce**: press for member 1 under `prefers-reduced-motion: reduce`. Holds when the strip arrives in one frame.
- **no `scrollend`**: the held cell with `onscrollend` removed and the engine's own event stopped.
- **frozen** (the near-snap tree, hero with a live figure per slide, no `scrollend`): press Next and wait. Holds when the landed slide's figure runs.

| cell | Chromium: RED → cure 1 → GREEN | WebKit: RED → GREEN |
|---|---|---|
| race 1440 (7 lags) | holds at 760 ms, fails at 800 to 900 (Previous undone) → GREEN **holds at all 7** | holds at 760 and 800, fails at 840 to 900 → **holds at all 7** |
| race 390 (7 lags) | holds at 760 and 800, fails at 840 to 900 → **holds at all 7** | holds at 760 and 800, fails at 840 to 900 → **holds at all 7** |
| model 1440 / 390 | fails (the dot moves, the strip stays on member 0) → **holds** (2072 / 844 px, member 2 active) | fails → **holds** |
| held 1440 / 390 | fails (rests on member 0 with member 1 active) → **holds** | holds / fails → **holds** |
| resize 1440 → 1000 | rests on member 3 (2401 px) with member 2 active → cure 1 the same (2388 px) → **holds** (1592 px) | rests at 3993 px with member 4 active → **holds** (1592 px) |
| resize 390 → 844 | the dot does not move the strip (cause 7) → cure 1 rests on member 1 (876 px) with member 2 active and the dots on 3 → **holds** (1752 px) | the dot does not move the strip → **holds** (1752 px) |
| keyboard 1440, nothing focusable in the slides | RED and GREEN: Tab focuses the strip; three ArrowRight presses turn three slides | RED and GREEN: Tab reaches only the dock's buttons; the strip is never focused |
| keyboard 1440, a link in each slide | RED and GREEN: Tab focuses slide 1's link; the first ArrowRight turns, focus falls to `body`, the next two do nothing | RED and GREEN: links are not in WebKit's Tab order, as in Safari by default; the strip is never focused |
| reduce 1440 | animates (64 rows over 575 ms) → cure 1 animates (62 rows, 601 ms) → **one frame** | animates (18 rows over 253 ms) → **one frame** |
| reduce 390 | the dot does not move the strip → cure 1 animates (38 rows, 377 ms) → **one frame** | the dot does not move the strip → **one frame** |
| no `scrollend` 1440 / 390 | fails → cure 1 fails → **holds** (member 0 committed at 351 to 363 ms, against 224 to 226 ms with the event) | fails → **holds** (297 and 345 ms, against 175 and 176) |
| frozen 1440 / 390 (near-snap tree) | **holds**: 65 and 67 figure frames in the 500 ms after landing | **holds**: 49 and 50 |

The model cell is also the P-21a witness: a jump of two members lands on its target with `scroll-snap-stop: always` in place. After both resizes, both engines had already re-snapped the resting strip to its member (796 px and 876 px) before the press, so 11.1.2 re-measures and does not re-seat.

## 3. Bytes and code

| | v11.1.0 | first cure | 11.1.2 (folded cure) | 11.3.0 (cure + `moving`) |
|---|---|---|---|---|
| a consumer build: the Carousel's chunks, minified, gzip -9 (`CarouselItem` js + css, `slideContext` js) | 1505 + 496 + 1458 = **3459 B** | 1174 + 580 + 1574 = 3328 B | 1175 + 580 + 1826 = **3581 B** (+122) | 1186 + 580 + 1851 = **3617 B** (+36 over the cure) |
| lines changed | | +93 −71, five files | **+167 −90**, five files | +16 −6, four files |

The cure moves the scale out of script: the per-frame `project()` and its two watchers are gone, and the CSS grows by 84 B for the keyframes. `useDeckSnap` grows by the fixes the fold added: live offsets and the resting member, the resize observer, the idle floor and the reduced-motion branch, together 252 B over the first cure.

**Release note, 11.1.2.**
- The Carousel no longer jitters under a swipe, a trackpad or a pager press; the strip settles on the browser's own snap and rests exactly on it.
- The neighbours' travel scale is drawn by the browser from the scroll position. Firefox has not shipped scroll-driven animations, so it shows no travel scale.
- The content no longer lags its slide (question 1 decides whether it comes back).
- Dots bound to the Carousel's `v-model:active` move the slides.
- A press scrolls at once under reduced motion.
- A press after a resize or a rotation lands on the right slide.

**Overlaps with BL rows.**
- W-L.2 item 9 (the inbound model) is cause 7.
- W-F.3 cure 3 zeroes the velocity at `scrollsnapchange`. WebKit never fires that, and Chromium fires it with `scrollend`, so the cure zeroes at `scrollend` (cause 4), with the idle floor where there is none (cause 10).
- W-K.6 item 13 (CR-08) is now cause 9.
- O-327 is part-cured (§1.3).
- O-372 placed atlas's fix commit `b1bd7d088` (`u/glass-fixes-on-11.1.0`) in 11.1.2. It rewrites the same function as this cure. §7 takes its parts into the cure and leaves its spring turn to question 2, so `b1bd7d088` itself is not applied.

## 4. Heavy live members (11.3.0)

The record measured the problem (§2.6): a live SVG on each of 8 slides runs the rows at 44 to 50 Hz, with 13 to 32 frames over 25 ms per gesture and the commit 580 to 810 ms late. Running only the active slide's figure while the strip is still removes it.

**The fair comparison** (Chromium, all on the cure, a live SVG figure per slide; `witness/probe-nearsnap-fold`):

| | touch 1440: reversals; frames > 25 ms; longest | touch 390 | pager 1440 next / prev / dot: frames > 25 ms (longest) | pager 390 |
|---|---|---|---|---|
| all 8 live, v11.1.0 (record) | 2 / 7 / 4; 29 / 22 / 29; 41.6 ms | 3 / 3 / 3; 14 / 13 / 32; 41.7 ms | 1 / 0 / 0 (41.7) | 0 |
| the consumer's own rule (run when active and the deck's position and velocity say still), cure | 0; 0; 14.3 ms | 0; 0; 17.8 ms | 1 / 0 / 0 (51.9) | 0 / 1 / 0 (29.2) |
| the slot's `moving`, all 8 mounted | 0; 0; 25.0 ms | 0; 0; 24.6 ms | 1 / 0 / 0 (29.0) | 0 |
| `moving`, and the page mounts only the rested slide and its neighbours | 0; 0; 10.3 ms | 0; 0; 18.4 ms | 1 / 0 / 0 (32.3) | 0 |

On the cure, the consumer's own rule is as smooth as anything the library adds; the earlier witness compared the prototype with v11.1.0 and so credited the cure's gains to it. Mounting three figures instead of eight changes nothing measurable on this lane. The one long frame at the first press appears in every variant (§1.1).

**So the library adds one signal, `moving`**, on `CarouselContext` and on `CarouselItem`'s slot beside `index` and `active`: true from the strip's first scroll event or a press, false at its `scrollend` (or the idle floor). A consumer writes:

```vue
<CarouselItem :index="i" v-slot="{ active, moving }">
  <Figure :running="active && !moving" />
</CarouselItem>
```

Why a signal and not the position: "still" read from the deck's position (an integral position and zero velocity) is wrong wherever the strip rests off a pitch multiple, as at the end of a strip whose last members share a clamped offset (the demo's peek exhibit rests at 5.31 pitches) or before a resize is re-measured. `moving` comes from the events themselves. This is reasoning; that cell was not filmed.

What stays with the page: which slides mount a figure (the near window, `tools/app-extra/mounts/carousel-near.vue` shows one), pausing off screen and in a hidden document (daraksha's stage does both, §6), `contain: paint`, decoding ahead.

Cost: +36 B gzip, +16 −6 lines. Without `scrollend` the figure still starts after landing (the frozen cell, §2.3).

**Weighed and left out.**
- `near`, `live` and `rested` (the first prototype): `live` is `active && !moving`, and the window is a page's loading policy.
- `content-visibility: auto`: free off-screen skipping, but it applies paint containment, which clips a member's shadows and anything drawn past its box (O-325b). The consumer's choice.

## 5. Native scroll-snap or a pointer glide

Daraksha's glide (`src/portraits/glide.ts` at 61b36f0) is the alternative value.js pointed to ("a hand-carried glide like this one would replace snap-scroll's jitter", HOME-DECK-REFS.md, as the record quotes it).

| | native snap, cured (Chromium) | daraksha's glide (record §3, Chromium) |
|---|---|---|
| reversals, touch and wheel | 0 in every cell | a one-frame jump at every hand-over: 189 / 122 / 273 px (1440), 175 / 122 / 253 px (390), the same in WebKit |
| hand ratio while held | 0.99 (1440), 0.96 (390), the same as bare | 0.94 to 0.97 |
| code (minified, gzip -9) | `useDeckSnap` in the `slideContext` chunk; the snap itself is the platform's | `glide.ts` 2019 B + `lateral.ts` 458 B, plus its springs and the stage's recognizer |
| trackpad and wheel | the platform's momentum, one slide a gesture | a horizontal trackpad does nothing |
| keyboard | arrow keys scroll the strip while it, or something in the active slide, has focus; a focused link loses focus when its slide goes inert (§1.1) | window-level ArrowLeft and ArrowRight, guarded against inputs; measured working (record §3) |
| scroll-linked effects | view and scroll timelines (the travel scale) | each effect is script per frame (rule 4 forbids it) |
| rubber-band, nested scroll on a phone | the platform's, including the axis lock between the page and the strip | its own slop (8 px) and its own edges |
| a mouse drag on a desktop | does not scroll a native strip (record §5) | carries the pictures |

The jitter came from glass's writes around the snap, not from the snap. Cured, the snap is as smooth as the bare control in every Chromium cell. The glide's one real gain is the desktop mouse drag, which is not part of O-421 and no site has asked for.

## 6. Daraksha's slides and portraits as reference

What the Carousel takes:
- Content moves on `transform` and `opacity` only (it already does), and the frames stand still while their content moves.
- A live figure runs only on the slide on show, only while it is still (§4, `moving`).

What stays daraksha's, and a page's, own:
- The pointer glide itself, its tuning (`GIVE` 0.236, `PAST` 0.25, `FLUNG` 0.35 px/ms, `AIR` 16), the hand-over and the fade on keys.
- Its stage's live drawing stops when the stage leaves the screen (an IntersectionObserver) or the document is hidden (`visibilitychange`), in `PortraitStage.vue`.
- `warmNeighbours` fetches and decodes the photos either side of the one shown; `decoded()` races `img.decode()` against 610 ms. A page's loading policy.
- `contain: paint` on its figures.
- Under reduced motion a turn fades 144 ms out and 144 ms in. The Carousel instead jumps, as its stylesheet already asked (cause 9).

Its dots are glass's PagerDots, so the dots' look is question 4.

## 7. Atlas's path onto the cure

Atlas's home deck runs glass `u/sp-integ-glass` (8b4d8f82b). That line branches from glass before 11.0.0 (merge base 373ed8aba) and adds the U/HERO commits. Its deck half was later carried onto v11.1.0 as `b1bd7d088` on `u/glass-fixes-on-11.1.0`, which O-372 placed in 11.1.2.

| What the line has | Line | `b1bd7d088` | 11.1.2 (folded cure) | Side |
|---|---|---|---|---|
| live member offsets for a press (`offsetOf`) | yes | yes | yes, clamped to the strip's end, and also for the reconcile | glass |
| resize handling | `ResizeObserver` → re-measure and an instant re-seat | same | re-measure only; both engines re-snap the strip to its member themselves (§2.3, resize) | glass |
| a rest without `scrollend` | 150 ms idle floor, always armed | same | 150 ms idle floor, only where the engine has no `scrollend` (a held finger is not rest) | glass |
| velocity zeroed at rest | yes | yes | yes (cause 4) | glass |
| release once | yes | yes | yes, with the reconcile (causes 5, 6) | glass |
| reduced motion | instant | instant | instant (cause 9) | glass |
| inbound `watch(active)` | yes | no | yes (cause 7) | glass |
| the commit echo | yes (the spring turn runs on every commit) | yes | gone (`heading`, cause 1) | glass |
| the projection (scale and lag per scroll frame) | yes | yes | view-timeline scale, no lag (causes 2, 3) | glass; the lag is question 1 |
| a press as a spring turn: an instant seat plus a `translate` spring on `--spring-dock`, snap suspended | yes | yes | no: the browser's smooth scroll | **question 2** |
| one-pass autoplay with a pause control (`9235d026c`) | yes | no | no | 11.3.0 (CR-06); atlas keeps the line's until then |

The path: atlas's line rebases onto 11.1.2, drops its own `useDeckSnap` changes (b1250cadb, f373de108) for the cure, and keeps `9235d026c` until 11.3.0 carries the autoplay. If the owner picks the spring turn, it returns in 11.3.0 for presses only, on top of `heading`, so a swipe never runs it. O-421 is closed only when atlas's deck runs the cure.

## 8. The Home View study, folded

The study's carousel defect (GAP.md, "the defect under all three": the dots and the slides disagree) is cause 7, cured in 11.1.2.

The three open questions:
- **Q-CR-1, the entrance spring.** It concerns a media dock glass does not have (CR-02, CR-03). Held until one exists.
- **Q-CR-2, one card per flick.** P-21a, the programmatic jump cut short, was the commit echo and not `scroll-snap-stop` (GAP A3). With the echo cured, a dot two ahead lands on its member in both engines (§2.3, model). Either answer is one CSS line on the platform's own snap: question 3.
- **Q-CR-3, the dots' length in flight.** A length that follows the scroll must be a scroll-driven animation (rule 4), never a property written per frame. The picture is the owner's: question 4.

| Row | Placement |
|---|---|
| CR-01 (the echo, the restart, the truncated jump) | The echo and P-21a: **11.1.2**. The retarget clause (velocity kept through a second press) depends on question 2. The composed pager that wraps where the carousel does not (M-06) was not examined |
| CR-02 (a carousel media dock) | A consumer composition first: atlas composes PagerDots and a play toggle in its own dock. The library's when a second site asks |
| CR-03 (the dock's entrance) | Held with CR-02 |
| CR-04 (a resting capsule), CR-05 (an indicator that follows the scroll) | Question 4, beside W-E.12. If B, a scroll timeline on the strip read by the dots through `timeline-scope` |
| CR-06 (autoplay with a fill) | **11.3.0**, from atlas's line (`9235d026c`) after review against CR-06's clauses |
| CR-07 (velocity-chosen landing) | Question 3 |
| CR-08 (programmatic scroll under reduced motion) | **11.1.2**, cause 9 |
| CR-09 (a stale committed index) | **11.1.2**, cause 6 (the held cell) |
| CR-10 (the deck turn's velocity through a reversal) | **11.3.0**, on BM rule 2 (sampled keyframes from the spring's own state). It is DeckStage's turn, not the strip's |

## 9. Corrections to the record

They now head `RECORD.md`: the commit at 345 to 375 ms is the IntersectionObserver's, not `scrollsnapchange`'s; WebKit's swallowed wheel is any per-scroll restyle of the scrolled content, not the snap point moving; and the reversal counts rise for v11.1.0 under the still-row fix, with no finding changed.

## 10. Questions for the owner

Each has a default that ships in 11.1.2 if he says nothing. Questions 2 to 4 are a feel, so each wants a live page with A and B side by side on his phone, like the choice board; this seat did not build it.

1. **Should the picture inside a slide trail the slide while it moves?** A, the default: no. The slide and its picture move as one, and the weight is the browser's own coasting and settling, which now takes about 0.7 s after a swipe at 1440 instead of 0.33 s. B: the picture trails by up to 8 % of the slide's width and catches up as it slows. That needs a write on every frame, which costs the trackpad in Safari's engine (it snaps back after each wheel step) and stepped backwards against the slide in every settle as built.
2. **How a press moves the slides** (next, previous, a dot). A, the default: the browser's own smooth scroll, about 0.5 s for a full-width slide at 1440 in Chromium and 0.22 s in WebKit, on the browser's curve. B: atlas's spring turn, 0.22 to 0.28 s with no reversals, on glass's dock spring; it pauses the snap while it runs and must give way cleanly to a swipe.
3. **One card per flick, or as far as the flick carries.** A, the default: one card per flick, as now and as iOS Photos does. B: the flick's speed picks the landing and can pass several cards, as Apple's Home View does. Both run on the browser's own snap.
4. **The dots while the slides move.** A, the default: today's worm, which moves when the slide is committed, stretches with its speed and is a dot again at rest. B: Apple's capsule, where the current dot is a longer capsule whose length follows the scroll frame by frame, trading length with the next dot.

Held: an entrance for a carousel's media dock, until glass has one.

## 11. Not run

- Safari and real phones: the machine law allows no safaridriver, no headed browser and no device. No iPhone reading was taken. Safari 26.0 and 26.1 (no `scrollend`) were stood in for by removing the event in both engines.
- WebKit touch, flick and carry: Playwright's WebKit cannot send a moving touch. The WebKit wheel is unphased steps, so whether Safari's phased trackpad shows the remaining snap-back is unread.
- Atlas in WebKit (it crashed there in the record), and atlas on 11.1.2 (not built).
- Firefox: not in the matrix. Under the `@supports` guard it shows no travel scale.
- Questions 1 to 4's B sides, filmed against the cure.
- Right-to-left: not run. Live offsets make `scrollTo` and the reconcile follow the members' own positions, but the continuous position is negative there.
- The reconcile at the end of a peek strip (`restingOn`'s first-of-the-clamped rule): reasoned, not filmed.
- A `scrollend` lost in a hidden document mid-scroll: not covered by the idle floor (it arms only where the engine has no `scrollend`).
- `moving` against the position-derived rule at a clamped strip end (§4): reasoned, not filmed.
- The near-snap tree in WebKit, beyond the frozen cell.
- A vertical strip, the `window` projection and dark mode.
- Repeats: each GREEN film cell ran once; the snap-back variants ran three times at each width.
- value.js's HOME-DECK-REFS.md is not committed; it is quoted as the record quotes it.

## 12. Files

- `cure.patch`: 11.1.2 against v11.1.0 (`patch -p1` or `git apply` at the repo root). `near-snap.patch`: 11.3.0 against the cure.
- `fold.md`: each objection's ruling. `STUDY.md`: the study for the owner. `SITES.md`: the notes for atlas, and for value.js and daraksha.
- `witness/`
  - `probe-red/`, `probe-green-fold/`: RED and the folded GREEN, with `summary.json`. `probe-green/`: the first cure.
  - `probe-nearsnap-fold/`: §4's comparison. `probe-nearsnap/`: the first prototype.
  - `probe-green-lagkept/`, `probe-green-jsscale/`, `probe-green-io-off/`, `probe-nearsnap-io-off/`: the intermediate builds §1, §1.2 and §2.2 cite.
  - `witness.{red,green}.{chromium,webkit}.json`: the first logic witness. `witness.{red,cure1,green,near}-fold.*.json`: the fold's cells.
  - `snapback-fold-webkit.log`: the variants, three runs at each width. `scale-*.log`, `snapback-webkit.log`, `snapback-travel-webkit.log`: the first checks.
- `tools/`: `carousel-probe.mjs`, `analyze.mjs` (still rows skipped), `witness.mjs`, `snapback.mjs`, `scale.mjs`, `compare.py`, `wheel.py`, `tables.py`, `build-tree.sh`, `serve.sh`, and the study pages under `app-extra/mounts/`.
