# Carousel jitter: the root and the design (O-421)

Seat: claude-opus-5-5 (asserted from its own system identity), 2026-11-23. This is the folded ROOT: it follows `RECORD.md`, takes `critique.md` as `fold.md` rules it, and replaces the first ROOT. `cure.patch` and `near-snap.patch` are the folded patches.

Engines, as in the record. **Chromium** is Playwright's headless shell 149.0.7827.55 on the GPU lane (`--use-angle=metal --enable-gpu-rasterization`), sampled each animation frame (rows at a 7.5 to 8.3 ms median). It is not a phone. Frame claims come only from it. **WebKit** is Playwright's WebKit 26.5. It is not Safari, it cannot send a moving touch, and its wheel is unphased steps, so its cells are the wheel, the pager and the logic witness. Every reading names one of the two.

**RED** is glass v11.1.0 (d19e12559). **GREEN** is v11.1.0 with the folded `cure.patch`. The first cure as written is kept where a cell shows what the fold changed (`witness/probe-green/`, and the `cure1` witness rows). Each was built from `git archive` into `trees/`, served on 5381 to 5384, and filmed with `tools/carousel-probe.mjs` and the record's inputs. The 1-minute load ran 26 to 46 during the folded Chromium films (the machine was shared).

**The second fold** (`fold.md`, second section) moved `cure.patch` onto release/11.1.1 (ca61ce5b6). 11.1.1 changes no library file the cure touches, so the films on v11.1.0 stand for the library half. It added the stage's scroll-padding, the start value, the comment fixes and a unit test, and re-read what those touch on trees built from release/11.1.1 (§2.4).

**The third fold** (`critique.md`, "Round 2, the second critic") answers that critic's two blocking items and takes its note on `overflow: hidden`, on trees built from release/11.1.1. Under reduced motion a press still seats the strip at once and now fades the arriving slide in (cause 9). The travel scale reads a view timeline named on the member, so a member that clips with `overflow: hidden` keeps it (cause 2). SITES.md no longer says PagerDots does not change (§6). Its readings are §2.5.

**The fourth fold** (`critique-r3.md`, the third critic) answers that critic's two blocking items, on trees built from release/11.1.1 (14506233e now; its `src`, `tests` and `demo` are still ca61ce5b6's). Under reduced motion a press no longer cuts anything: the strip fades out over 90 ms, seats while it is hidden and fades back in over 150 ms, and a second press during the fade-out moves the pending seat (cause 9). The neighbours' dimming keeps a short fade under reduced motion. A strip that shows several members no longer commits one beside the member pressed for (cause 11). The witness now reads every member's ink, frame by frame, on three pages. Its readings are §2.6.

**The fifth fold** (`critique-r3.md`, the fourth critic) takes the owner's ruling. He ratified the BM study wholesale on 2026-11-23, and its choice 8 A row says the Carousel's 11.1.2 press arrives at once under reduced motion, and that the dip, 100 ms out and 100 ms in, is the later minor's (BM pass 10, `tranche-draft.md:185`; `DESIGN.before-pass10.md:1728` and `:1788`; BM-6 lists it as BL's row). So 11.1.2 drops the dip: under reduced motion a press seats the strip at once. The fourth critic's B-1 was then read again on the cure without the dip. A press made while the strip still settled from a swipe or a wheel was still lost, so the press now holds the strip's reports from its own frame and, if the strip is moving, seats it once it rests (cause 9). Everything else in the fourth fold stays: the neighbour guard, the dimming's reduced-motion fade, the `>` in the vertical selector, the ink cells and `near-snap.patch`, rebased. Its readings are §2.7. The dip's design for BM's parts minor is §13.

## Verdict

- **The platform's scroll-snap is sound, and the jitter is glass's own writes around it.** With the cure, every touch, wheel and pager cell in Chromium runs 0 reversals and rests 0 px off its snap point, and a held finger keeps the picture 1:1 (0.99 at 1440, 0.96 at 390): the bare strip's own numbers. In WebKit the wheel now carries the strip, with one snap-back left per wheel gesture whose cause is not named (§2.2).
- **No fork between native snap and a pointer glide.** Native stays (§5).
- **11.1.2** is `cure.patch` against release/11.1.1: seven library files (+234 −105), glass's own Carousel stage (+7 −3) and a unit test (+275), 261 B gzip larger than 11.1.1 in a consumer build (§3). It fixes ten faults (§1), and guards against an eleventh that its own instant seat brought out, among them the Home View study's carousel defect (the dots and the slides disagree), a stale pitch after a resize, presses that animate under reduced motion (a press now arrives at once, and one made while the strip still moves lands when it rests), and an engine without `scrollend`.
- **The content lag goes by default, and bringing it back is the owner's call** (§1.3, question 1). It cannot return without a per-frame write, and WebKit drops the trackpad when anything is written per frame.
- **11.3.0** gets one `moving` signal for heavy live members (`near-snap.patch`, +32 B, §4), the commit at the decision (§1.2), and the autoplay (CR-06). On the cure a consumer's own "run only while still" rule is already smooth (§4); `moving` makes that rule direct and right at the strip's end.
- **Atlas** runs a glass line whose page turn causes its 150 to 350 px jumps (record §2.1). Its path onto the cure is §7: 11.1.2 takes the line's resize, rest and reduced-motion handling, and the spring turn for presses is question 2.

## 1. The causes and the cures

Lines are v11.1.0's. Paths are under `src/components/`.

| # | Source | Cause | What it does | Cure (11.1.2) |
|---|---|---|---|---|
| 1 | **Commit echo** | `deck/composables/useDeckSnap.ts:167-170`: `watch(deck.index)` calls `scrollTo` on every index change, including the ones the strip itself committed (`:98-101`, reached from `:114-121` and `:127-139`) | Chromium: a smooth scroll lands mid-gesture, replaces the platform's snap curve, pulls the strip on under a held finger (carry ratio 1.29 at 1440, 1.36 at 390, against bare's 0.99 and 0.96), restarts the velocity (cause 3's lurch) and cuts programmatic jumps short (P-21a). WebKit: flat turns two slides on a 60 % wheel. Atlas's line: an instant seat fights the platform's snap animation, giving jumps of +315 px | `heading`: the arm remembers the member the strip is going to (the last it reported, or the last it was sent to). The watcher scrolls only when the index is somewhere else |
| 2 | **Per-scroll writes on the scrolled content** | `carousel/CarouselContent.vue:50-75` writes `--member-scale` and `--member-lag` on every member on every scroll event; `carousel/styles.css:43` applies the scale to the member, which is the snap area (`:39`) | (a) Chromium measures a snap area on its transformed box: rests 18 px (1440) and 7 px (390) off, then creeps the last pixels in. (b) WebKit snaps a trackpad wheel back after each event when anything in the scrolled content is restyled per scroll (§2.2) | The travel scale becomes a scroll-driven animation on the **content** node, on a view timeline named on its member (`view-timeline: --carousel-member inline` on the member, `animation-timeline: --carousel-member` on the content, so a member that clips with `overflow: hidden` keeps it), `animation-range: exit -100% exit 100%`, 1 at the snap point and 0.965 one member away, inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`. Nothing is written per frame (BM DESIGN rule 4). The view timeline's inset is the strip's `scroll-padding`, so a strip that offsets its members from its start (a padding, a centred snap) states that offset as `scroll-padding`; glass's own Carousel stage now does (§2.4) |
| 3 | **Velocity lag** | `CarouselContent.vue:60,67`, `styles.css:54-60`; the velocity is a two-sample quotient on the main thread (`useDeckSnap.ts:103-112`) | The lag swings its whole 8 % ceiling in one frame. With causes 1 and 2 cured it still steps the content backwards through every settle: 20 reversals (37 px) in a 1440 swipe, 26 (54 px) in a flick (`witness/probe-green-lagkept`, still rows skipped) | Removed by default; §1.3 states the trade and question 1 asks the owner. The `memberLag` and `MEMBER_LAG_*` exports stay until 12.0.0 |
| 4 | **Velocity never zeroed** | `useDeckSnap.ts:103-112`: only scroll events feed the velocity, so the last one stands at rest | The lag's content rested 9 px (Chromium) to 65 px (WebKit) off its housing (record §2.2); any reader of `deck.velocity` reads a speed at rest | `rest()` feeds the position with velocity 0 on `scrollend` |
| 5 | **Double release** | `useDeckSnap.ts:157-162`: the hold is released on `scrollend` and again by a 900 ms timer | An earlier press's timer drops a later press's hold, and the observer commits the member being left: Previous pressed 800 to 900 ms after Next is undone (§2.3) | Release once, whichever comes first, and clear the timer |
| 6 | **Reports dropped during a hold** (CR-09) | `useDeckSnap.ts:98-101`: a commit during a programmatic scroll is dropped, and the engine reports nothing more if the strip comes back to the member it last settled on | Next, then the page's own scroll back to member 0 within 60 ms: the strip rests on 0 with member 1 active | At the hold's end, if the strip rests somewhere other than where it was sent, commit the member whose own offset it rests on (`restingOn`) |
| 7 | **The model is one-way** (the Home View study's defect; W-L.2 item 9) | `carousel/Carousel.vue:24` with `carousel/useCarousel.ts:35-43`: `active` is read once, at creation | A PagerDots bound to the same `v-model:active` moves its dot and not the strip: at 390 every press, at 1440 every dot | `watch(active, (to) => deck.go(to))`. `go` ignores the deck's own change coming back. The deck is made while the member count is 0, so it seats 0 whatever `active` says: a second watch takes `active` once, synchronously, when the members first arrive, before the strip is seated (§2.4, start) |
| 8 | **A cached pitch** | `useDeckSnap.ts:146`: `scrollTo` goes to `index × extent`, and `extent` is measured only at mount and on a member-count change (`:171-174`, `:179`) | After a resize or a rotation a press goes to the old pitch's offset. Chromium, 1440 → 1000: the strip rests on member 3 with member 2 active (v11.1.0 and the first cure); 390 → 844: the first cure rests on member 1 with the dots on 3 | `scrollTo` and the reconcile read each member's own offset (`offsetOf`, clamped to the strip's end); a `ResizeObserver` re-measures the pitch the continuous channel divides by |
| 9 | **Reduced motion ignored** (CR-08) | `useDeckSnap.ts:143`: `scrollTo` passes `behavior: "smooth"`, which overrides the stylesheet's `scroll-behavior: auto` under `reduce` (`styles.css:71-73`) | A press animates under reduced motion: 64 rows over 575 ms in Chromium (62 over 601 ms in the first cure) | Under reduced motion a press never scrolls in sight: it seats the strip `instant`, so the press arrives at once, as the owner's ratified choice 8 A rules for 11.1.2 (the dip is BM's parts minor, §13). A strip still moving when the press comes (a swipe's settle, a wheel's coast) carries itself back off an instant seat, so the press holds the strip's reports from its own frame and seats once the strip rests (its `scrollend`, or 150 ms with no scroll event), on the last member pressed for. The neighbours' dimming keeps a 0.15 s fade there, carved past the universal reduced-motion layer as `transitions.css` carves its swaps (§2.6, §2.7) |
| 10 | **No `scrollend`** | Safari 26.0 and 26.1 do not fire it; v11.1.0's release falls to the 900 ms floor | The hold's reconcile never runs and the velocity is never zeroed: the held cell fails with the event removed, in both engines | Where the engine has no `scrollend`, 150 ms with no scroll event dispatches one on the strip, so `rest()` and the reconcile run as they do elsewhere |
| 11 | **A neighbour's late report** (found by the fourth fold) | `useDeckSnap.ts:127-139`: the IntersectionObserver commits the member most in view in each batch of entries. On a strip that shows several members whole, a batch that lands after a press's hold is released names a member beside the one pressed for | A strip shaped like fourier's featured row (16rem members, `projection="none"`), 1440, Chromium: on the third fold a reduced-motion press for member 1 rests on member 1 with member 3 active (two runs of two), and one smooth Next of two rested with member 4 active. The cure's instant seat brings it out: `scrollend` releases the hold in the seat frame, and the observer's batch lands a frame later. 11.1.1 rested with member 1 active in the same cells (one run each, Chromium) | While the strip rests on the member it is heading to, a report of another member commits nothing (§2.6) |

### 1.1 Left as they are

- **inert and aria-hidden flips** (`CarouselItem.vue:50-56`): a few ms at the commit (style 1.2 to 1.9, layout 0.7 to 1.6, script 2.3 to 4.4) and no dropped frame (record §2.3).
- **The pager's re-render** (about 200 writes a turn): no dropped frame (record §2.5). The dots are the owner's (question 4).
- **The first press's frame.** The first Next at 1440 (Chromium) has one long frame in some runs: 17.6 ms (record), 25.0 (v11.1.0), 26.3 and 33.3 traced (first cure), 32.6 (first near-snap), 23.5 (folded cure), and 29 to 52 ms on the live-figure pages. No long task or long animation frame is attributed, the loads differed, and no build is free of it. No cause is claimed.
- **Found, not cured here: focus falls out of the strip.** With a link in each slide (atlas's previews are anchors), Tab focuses slide 1's link, the first ArrowRight turns the strip, and the commit makes that slide `inert`, which drops focus to `body`; later presses do nothing. v11.1.0 and the cure alike, in Chromium (§2.3). With nothing focusable in the slides, Chromium focuses the strip itself and the arrows turn three slides. In WebKit, Tab reaches neither the strip nor a link (only the dock's buttons), so the arrows never reach the strip there. It predates the cure and is not jitter, so it is placed as a new row for the accessibility wave: keep focus in the strip when its slide goes inert.
- **The fade half of O-327.** The neighbours' opacity still starts at the commit and ends about 60 ms after rest. It moves with the commit timing (§1.2).
- **The `window` projection** switches the newly active member's scale from 0.965 to its timeline value in one frame at the commit, as v11.1.0 did in script. Unfilmed; no page in glass's `src` or `demo` uses `window`. With §1.2.
- **A press just after a lift, with motion allowed.** At 1440 a Next press for member 2 made 0 to 300 ms after a swipe's lift lands on member 2 with the active member never stepping back (Chromium, 8 of 8, §2.7; the second critique read a smooth scroll ending 3 px short at 60 and 150 ms, which the snap then crept in). At 390 with the dot it does not hold: a press 0 to 120 ms after the lift is lost, the swipe's settle winning over the smooth scroll, so the strip rests on member 1 and the active member goes to 2 and back to 1; from 160 ms it lands (5 of 8 lost, the fourth critic's M-1). 11.1.1's dot does not move the strip at 390 at all (cause 7), so this is no regression, and it is atlas's phone case. The reduced-motion hold (cause 9) would cure it the same way, a smooth scroll sent once the strip rests, at the cost of a press that starts only after the settle. That belongs with the commit at the lift (§1.2), for 11.3.0; not built.
- **No stacking context under `projection="none"` or reduced motion.** v11.1.0's `.carousel-item` always carried `scale: var(--member-scale, 1)`, so every member was a stacking context and the containing block of a fixed-position child. The cure scales the content node, and only where the travel scale runs, so under `"none"` and under reduced motion a member is neither. It is kept: that containment was a side effect of the per-frame channel, glass's only CarouselItem page (the stage) depends on neither, and a rule that restores it would have no other job. The release note says so (§3). Unfilmed.
- **Under reduced motion the neighbours stay dimmed** at 0.7, as with motion. The reduce block's old `opacity: 1` lost to the dimming rule's specificity and never applied, so the fourth fold drops it rather than make it win. Its old `transition: none` switched the dimming in one frame at each commit (11.1.1 did the same); the fourth fold gives it a 0.15 s fade instead (cause 9). A swipe's commit under reduced motion, where both slides are on screen, is reasoned from that rule and not filmed.
- **Under reduced motion a press made while the strip moves lands when the strip rests.** `deck.index`, the dots and the caption change at the press; the strip finishes the reader's own swipe or wheel on the platform's snap and then seats at once. After a swipe that is 387 to 692 ms after the press at 1440 and 249 to 566 ms at 390 (Chromium, §2.7), about when a smooth press would have landed (11.1.1's reduced press took 440 to 533 ms at 1440). A press made at rest seats in its own frame.

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
- **The travel scale** (`tools/scale.mjs`, both engines, the first cure's CSS, unchanged by the fold): 0.965 / 1 / 0.965 at rest, within 0.0015 of v11.1.0 in flight. The view timeline ramps over the member's width rather than its pitch, which is the whole difference. That holds for members that rest at the strip's start; a strip that centres them is §2.4.

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

### 2.4 The second fold, on release/11.1.1

RED here is release/11.1.1 (ca61ce5b6), GREEN is 11.1.1 with the second fold's `cure.patch`, each from `git archive` into `trees/`, built with `tools/build-tree.sh`, served on 5381 and 5382. The third fold changes two of its rows, `hidden` and reduce (§2.5); every other row reads the same on it.

**The travel scale on a strip that centres its slides** (`tools/scale-stage.mjs`). The page is glass's own Carousel page (`?c=carousel`): 11.1.1's CarouselStage, slides 64cqi wide at 40rem and up (82cqi below), `scroll-snap-align: center`, the strip's `padding-inline` half of what a slide leaves. The strip is held at member 1 and at fractions of a pitch past it, snap off; members 0, 1 and 2 are read (the member's scale times its content's).

| Chromium 149, GPU lane | at rest on member 1 (members 0 / 1 / 2) | member 1 leaving: +0.1 / +0.2 / +0.28 / +0.5 of a pitch |
|---|---|---|
| 11.1.1, 1440 and 390 | 0.965 / 1 / 0.965 | 0.9965 / 0.993 / 0.9902 / 0.9825 |
| the cure without the stage's scroll-padding, 1440 | 0.9741 / 0.9901 / 0.965 | 0.9937 / 0.9973 / **0.9999** / 0.992 |
| the same, 390 | 0.9675 / 0.9961 / 0.965 | **0.9998** / 0.9966 / 0.9937 / 0.9857 |
| 11.1.2 (the stage states its offset as `scroll-padding-inline`), 1440 | 0.965 / 1 / 0.965 | 0.9964 / 0.9929 / 0.99 / 0.9821 |
| the same, 390 | 0.965 / 1 / 0.965 | 0.9964 / 0.9928 / 0.9899 / 0.9819 |
| the second fold with every member `overflow: hidden`, both widths | 1 / 1 / 1 | 1 at every hold |
| 11.1.2 with every member `overflow: clip`, both widths | as 11.1.2 | as 11.1.2 |

WebKit 26.5 reads every row the same to the fourth decimal: 11.1.1 at 0.965 / 1 / 0.965; the cure without the line at 0.9741 / 0.9901 / 0.965 (1440) and 0.9675 / 0.9961 / 0.965 (390), member 1 swelling to 0.9999 at +0.28 (1440) and 0.9998 at +0.1 (390); 11.1.2 at 0.965 / 1 / 0.965; `hidden` at 1 everywhere; `clip` as 11.1.2.

Without the scroll-padding the view range peaks where the content's start edge meets the strip's start edge, which on this stage is 28 % of a slide past rest at 1440 (18cqi of padding against a 64cqi slide) and 11 % at 390 (9cqi against 82cqi). So the slide at rest sits about 1 % small, and a leaving slide grows to full size before it shrinks. `view()`'s `auto` inset is the strip's `scroll-padding`; with it the peak is the snap point. A strip let go 30 % of a pitch past member 1 rests at one pitch (940 px at 1440, 330 at 390) in every variant, on 11.1.1 and on 11.1.2: symmetric scroll-padding leaves a centred snap where it was. The hero page (full-width members, start-aligned) reads 1 / 0.965 on both builds in both engines; in Chromium 11.1.1's hero rests 18 px (1440) and 7 px (390) past its snap point, cause 2's shortfall again, and in WebKit both builds rest on it.

**The logic cells** (`tools/witness.mjs --cells model,start,reduce`, hero page):

| cell | Chromium: 11.1.1 → 11.1.2 | WebKit: 11.1.1 → 11.1.2 |
|---|---|---|
| model 1440 / 390 | fails: the dot moves, the strip stays at 0 → **holds** (2072 / 844 px, member 2 active, dots on 3) | fails → **holds** (2072 / 844 px, member 2 active, dots on 3) |
| start 1440 / 390 (`v-model:active` 2 at mount) | fails: the strip rests at 0 with member 0 active, the dots and the caption on 3 → **holds**: the first sampled frame is already at 2072 / 844 px, member 2 active | fails, as in Chromium → **holds**: the first sampled frame is already at 2072 / 844 px |
| reduce 1440 | animates (59 offsets between, 104 → 596 ms) → **one frame** at 91 ms | animates (11 offsets between, 61 → 244 ms) → **one frame** at 73 ms |
| reduce 390 | the dot does not move the strip (cause 7) → **one frame** at 44 ms | the dot does not move the strip → **one frame** at 137 ms |
| `scrollend` after the instant press (11.1.2) | one, in the arriving frame (90 ms, 44 ms) | one, 12 ms (1440) and 18 ms (390) after the strip arrives |

**The unit test** (`tests/components/deck/snap-travel.test.ts`, in the patch; happy-dom): nine tests, for `heading`, the press offset, the release-once, the reconcile, reduced motion, rest velocity 0, the idle floor, the inbound model and the start value. 9 of 9 pass on 11.1.2; 8 fail on 11.1.1 (the press offset passes, since its members are equal); on the cure without the start watch only the start test fails.

### 2.5 The third fold, on release/11.1.1

RED here is release/11.1.1 with the second fold's `cure.patch` (§2.4's GREEN). GREEN is release/11.1.1 with the third fold's `cure.patch` (§2.6 replaces its reduced-motion half). The branch has moved since §2.4 (b9b96cb76 when this was written), but its `src`, `tests` and `demo` are ca61ce5b6's to the byte, and both patches apply to it in order. Both come from `git archive` into `trees/`, are built with `tools/build-tree.sh` and served on 5381 and 5382. The two builds differ in two places: under reduced motion `scrollTo` fades the arriving member in, and the travel scale's view timeline is named on the member.

**Reduced motion** (`tools/witness.mjs --cells reduce`, the hero page, one Next press in a context with `reducedMotion: "reduce"`). Each frame reads the strip's offset and the opacity of member 0 (left) and member 1 (pressed for), each the member's opacity times its content's.

| | Chromium 149, GPU lane, 1440 / 390 | WebKit 26.5, 1440 / 390 |
|---|---|---|
| the seat, RED → GREEN | one frame, no offset between: 56 / 41 ms → 51 / 37 ms | one frame, no offset between: 50 / 41 ms → 50 / 48 ms |
| member 1 in the seat frame | 1 → **0** | 1 → **0** |
| member 1 after the seat (GREEN) | 0.49 at 50 ms, 0.84 at 100 ms, 1 at 150 / 149 ms; largest step 0.09 a frame | 0.50 at 50 ms, 0.84 at 100 ms, 1 at 150 / 149 ms; largest step 0.19 a frame (60 Hz) |
| member 0 in the seat frame | 0.7, both builds (off screen, a dimmed neighbour from then on) | the same |
| `scrollend` (GREEN) | one, in the seat frame | one, 17 ms after the seat |
| the cell: seated in one frame, member 1 under 0.25 there, at 1 within 100 to 250 ms | fails → **holds** | fails → **holds** |

So nothing travelled, and the slide pressed for no longer arrived in one frame. The cell read only that slide, on a page whose neighbours are never on screen. The third critic read every member and found the cut moved, not gone: the slide being left still went in the seat frame, and on a strip that shows more than one member a member already on screen blinked to 0 (`critique-r3.md`, B-1 and B-2). The fourth fold replaces this fade with the dip (§2.6). The model and start cells, re-read on GREEN, hold in both engines at both widths as in §2.4.

The fourth fold moves the fade from the member to the strip and adds its out leg (§2.6); the reasoning for a Web Animation below still holds. The fade is `Element.animate` on the member, not a CSS animation. The universal reduced-motion layer (`utilities/a11y-overrides.css`) sets every CSS animation to 0.01 ms and every transition to 0 s, and a glass fade that must survive it is carved with `!important` (motion canon P6). That fits a state. This fade belongs to a press: in CSS it would need a class set on the arriving member, cleared at the animation's end and restarted by a second press. A Web Animation starts at the press, on the member the arm already holds, and the layer, which sets CSS durations only, does not reach it. It fades the member because the arm knows only the strip's children; DeckStage's snap register rides the same arm and fades the same way. Opacity is not geometry, so the member stays the snap area, unlike the scale (cause 2). 150 ms sits with glass's other shortened fades (`pane-swap` and `metric-swap` at 0.15 s in `transitions.css`) and with daraksha's 144 ms.

**The travel scale with `overflow: hidden`** (`tools/scale-stage.mjs`, as in §2.4: members 0 / 1 / 2 at rest on member 1, then member 1 leaving at +0.1 / +0.2 / +0.28 / +0.5 of a pitch):

| every member `overflow: hidden` | Chromium 149 | WebKit 26.5 |
|---|---|---|
| RED, 1440 and 390 | 1 / 1 / 1; 1 at every hold | the same |
| GREEN, 1440 | 0.965 / 1 / 0.965; 0.9964 / 0.9929 / 0.99 / 0.9821 | the same |
| GREEN, 390 | 0.965 / 1 / 0.965; 0.9964 / 0.9928 / 0.9899 / 0.9819 | the same |

GREEN's `hidden` rows equal its `built` rows to the fourth decimal in both engines. A member that clips with `overflow: hidden` is a scroll container, so `view()` on its content found the member, which never scrolls. Named on the member, the timeline's subject is the member, whose nearest scroll container is the strip, and each content node takes the name from its own member, the nearest ancestor that declares it. Every other row (`built`, `nopad`, `clip`, the hero page) reads the same on RED and GREEN to the fourth decimal in both engines, and each strip rests where it did (940 / 330 px on the stage, 1036 / 422 on the hero). The release note's `overflow: clip` line goes.

**The wheel in WebKit** (`tools/snapback.mjs --travel --only travel,travel-flat --repeat 3`, GREEN), to see that a timeline declared on the snap area does not bring back cause 2's snap-backs: as §2.2 found it. At 1440 the strip is at 559 px when the last wheel event lands, with one 21 px step back at 56 to 66 ms, 3 of 3; at 390, 192 px and one 28 px step back at 85 to 96 ms, 3 of 3 (§2.2: 530 to 559 px and 21 px at 49 to 54 ms; 192 px and 28 px at 85 to 87 ms; rows ran every 10 ms then and every 17 ms now). Without the dimming (`travel-flat`) the strip keeps the hand, 602 and 234 px, none, 3 of 3.

**The unit test** now has ten tests. The reduced-motion test also asks that the press fades the arriving member in with `opacity: [0, 1]`, and a new one asks that nothing fades when motion is allowed. 10 of 10 pass on 11.1.2 (16 of 16 with the Carousel and deck contract files); on the second fold only the fade test fails.

### 2.6 The fourth fold, on release/11.1.1

The fifth fold takes the dip out of 11.1.2 (§2.7). These readings are kept for BM's parts minor, which takes the dip at its own figures (§13).

Here **11.1.1** is release/11.1.1 itself, **RED** is the third fold (§2.5's GREEN) and **GREEN** is this `cure.patch`. Each comes from `git archive` into `trees/`, is built with `tools/build-tree.sh` and is served on 5383, 5381 and 5382. GREEN differs from RED in four places: the dip (cause 9), the neighbour guard (cause 11), the dimming's reduced-motion fade, and the `>` in the vertical selector (the third critic's minor 3).

**The dip.** A press under reduced motion no longer scrolls at once. `scrollTo` animates the strip's opacity from what it shows to 0 over 90 ms on `--ease-in` and holds it at 0. At the end the strip seats `instant` on the member it is then heading to, a second Web Animation fades it from 0 back to its own opacity over 150 ms on `--ease-standard`, and the first is cancelled. A press during the fade-out only moves `heading`, so the pending seat goes to the last press and no second fade starts. A press during the fade-in cancels it and fades out from the opacity on screen, still over the whole 90 ms, so no leg is shorter than five frames. The curves are read from the strip's computed tokens. 90 and 150 are literals, and the comment says why: glass's reduced-motion swaps carve 0.15 s, and no token names it (the third critic's minor 1). The press still answers in its own frame: `deck.index`, the dots and the caption change at once, and the fade-out starts there.

The fade is on the strip, not a member, as B-2 asks. Every member on screen rides the one fade, so a member already on screen never blinks, and no member's own opacity (the dimming) is replaced for the fade's length (M-1).

**The ink cells** (`tools/witness.mjs --cells reduce,retarget,turn,motion`). Each frame the cell reads the strip's offset and opacity and every member's ink: the share of its width inside the strip, times its content's opacity, its own and the strip's. A press is a click made in the page, so the gap between two is exact. There are three pages. The hero is atlas's shape: full-width members and a 2rem gutter. Glass's own Carousel page (`?c=carousel`) centres its slides, with the neighbours peeking at both edges. The 16rem strip is shaped like fourier's featured row: the hero with `projection=none`, 16rem members and a 1rem gutter, so three members show whole at 1440 and one and a half at 390.

- `reduce` presses for member 1 on each page under reduced motion.
- `retarget` presses the stage's dots for member 1, then for member 2 60 ms later, inside the fade-out.
- `turn` presses for member 1 on the hero, then for member 2 160 ms later, inside the fade-in.
- `motion` presses for member 1 on the hero and the 16rem strip with motion allowed.

A reduced-motion cell holds when the strip rests on the last member pressed for with that member active, takes no offset in between, seats at most once a press (once in `retarget`), and no member's ink changes by more than two fifths within one 60 Hz frame (a 120 Hz film is read over 17 ms). A motion cell holds when the strip rests on member 1 with member 1 active.

Each entry is the largest change of any member's ink within one 60 Hz frame, at 1440 / 390, then what the film shows.

| Chromium 149, GPU lane | 11.1.1 | RED (third fold) | GREEN (fourth fold) |
|---|---|---|---|
| reduce, hero | 0.30: the press travels (59 offsets between), and member 0's dimming steps 1 → 0.7 in one frame / the dot does not move the strip (cause 7) | **1 / 1**: member 0 goes 1 → 0 in the seat frame, so the strip shows nothing | **holds**: 0.28 / 0.28; seated 99 / 96 ms after the press, back to 1 150 ms later |
| reduce, stage | 0.30 / 0.30: travels (55 / 31 between), the dimming steps in one frame | **0.82 / 0.95**: member 0 drops from 1 to its sliver in the seat frame, and member 2's sliver appears at 0.18 / 0.05 | **holds**: 0.30 / 0.29 |
| reduce, 16rem strip | 0.26: travels (27 between) / the dot does not move the strip | **1 / 1**: member 1, whole on screen before and after, goes 1 → 0 in the seat frame; at 1440 the strip rests with **member 3 active** (cause 11) | **holds**: 0.28 / 0.28, member 1 active |
| retarget, stage | 0.30 / 0.30: travels to member 2 (86 / 50 between) | 0.82 / 0.95, and two seats, one at each press | **holds**: 0.28 / 0.28; one seat, on member 2, 96 ms after the first press |
| turn, hero | 0.30: travels (90 between) / the dot does not move the strip | 1 / 1, two seats | **holds**: 0.29 / 0.29; the second press comes at 0.69 of the fade-in, and the strip turns round from there |
| motion, hero | 0.14: travels, and rests 18 px past member 1 (1054 px; cause 2) / the dot does not move the strip | holds (59 / 36 between) | holds (59 / 35 between) |
| motion, 16rem strip | 0.26, holds / the dot does not move the strip | holds in this run; one earlier run of the same build rested with member 4 active (cause 11) | holds |

| WebKit 26.5 | 11.1.1 | RED (third fold) | GREEN (fourth fold) |
|---|---|---|---|
| reduce, hero | 0.30: travels (11 offsets between), the dimming steps in one frame / the dot does not move the strip | **1 / 1**: member 0 goes 1 → 0 in the seat frame | **holds**: 0.27 / 0.28; seated 113 / 100 ms after the press |
| reduce, stage | 0.30 / 0.30: travels (11 / 11 between) | **0.82 / 0.95**, as in Chromium | **holds**: 0.27 / 0.27 |
| reduce, 16rem strip | 0.20: travels (11 between) / the dot does not move the strip | **1 / 1**; member 1 active at rest (cause 11 not seen in WebKit) | **holds**: 0.27 / 0.35 (the 0.35 over one 21 ms frame) |
| retarget, stage | 0.30 / 0.30: travels to member 2 (14 / 14 between) | 0.82 / 0.95, two seats | **holds**: 0.28 / 0.28; one seat, on member 2, 101 / 103 ms after the first press |
| turn, hero | 0.30: travels (21 between) / the dot does not move the strip | 1 / 1, two seats | **holds**: 0.29 / 0.29 |
| motion, hero | 0.21, holds (12 between) / the dot does not move the strip | holds | holds |
| motion, 16rem strip | 0.20, holds / the dot does not move the strip | holds | holds |

What GREEN's films show, on the hero at 1440 (Chromium, every second row, about 17 ms apart): member 0 reads 1, 0.85, 0.68, 0.49, 0.29, 0.09 from the press's frame, the strip seats while it is hidden, and member 1 reads 0.01, 0.08, 0.31, 0.59, 0.78, 0.88, 0.95, 0.98, 1. On the 16rem strip, members 1 to 3 stay on screen through the press and all three take that same curve; member 0 leaves while the strip is hidden. On the stage, both slivers come back with the slide at the centre, at 0.18 of it. WebKit's films, at 60 Hz, read the same curves. `scrollend` fires once a seat: in the seat frame in Chromium, 10 to 15 ms after it in WebKit. The model and start cells, re-read on GREEN, hold in both engines at both widths as in §2.4.

**Why the in leg is on `--ease-standard`.** The first build of the dip faded in on `--ease-out`, cubic-bezier(0, 0, 0.2, 1), which lands a third of a 150 ms fade in its first 17 ms. In Chromium that read 0.33 a frame; in WebKit the fade's first painted frame came late and read 0.45 on the hero and the 16rem strip and 0.43 on the stage, so those cells failed (`witness.green-fold4-easeout.webkit.json`). `--ease-standard`, cubic-bezier(0.4, 0, 0.2, 1), is the canon's other effects curve (P1). It starts slowly, so a late first frame costs little. Its steepest 60 Hz frame lands 0.27 to 0.30 of the fade, and 0.35 in the one WebKit frame that took 21 ms. The out leg stays on `--ease-in`, whose steepest frame is its last. The same build's out leg was cut short on a turn (90 ms times the opacity on screen, so 40 ms from 0.45); GREEN keeps the whole 90 ms (P0a's five frames).

**The neighbour guard** (cause 11). The observer commits the member most in view in each batch of entries. On the 16rem strip at 1440, three members are whole on screen once the strip rests on member 1, and a batch that lands after the hold is released names one of the others. RED, Chromium: a reduced-motion press for member 1 rested with member 3 active in both runs, and a smooth Next rested with member 4 active in one run of two. WebKit's RED rested with member 1 active in every cell, so the late report is Chromium's here. GREEN ignores a report of another member while the strip rests on the member it is heading to; a swipe moves the strip off that offset at once, so its reports pass. Every GREEN cell rests with the pressed member active.

**The dimming.** A press moves the dimming at once: on the stage, member 1 loses its 0.7 and member 0 takes it. The reduce block's old `transition: none` made that a 0.3 step in one frame on 11.1.1 and on every fold before this one (11.1.1's 0.30 above). GREEN carves a 0.15 s fade on `--ease-out` for it, past the universal reduced-motion layer, as `transitions.css` carves its swaps, so it runs inside the fade-out.

**The unit test** has eleven tests. The reduced-motion test asks that a press fades the strip out (`[1, 0]`), that a second press during the fade-out scrolls nothing and starts no second fade, that the seat at the fade-out's end goes to the second press's member, and that the strip then fades in to its own opacity. A new test asks that a report of a member beside the one the strip rests on commits nothing. 11 of 11 pass on GREEN (17 of 17 with the Carousel and deck contract files, and 17 of 17 with `near-snap.patch` on top). On RED the reduced-motion test and the new one fail. vue-tsc on `tsconfig.src.json` is clean with `near-snap.patch` on top, and both patches apply to release/11.1.1 in order with `patch -p1`, and with `git apply` once repository discovery stops at `trees/` (`GIT_CEILING_DIRECTORIES`); run inside glass's own checkout without that, `git apply` skips every path outside the current directory and still exits 0 (the fourth critic's minor 4).

## 3. Bytes and code

| | v11.1.0 and 11.1.1 | first cure | folded cure | second fold | third fold | fourth fold (the dip) | 11.1.2 (fifth fold) | 11.3.0 (fifth fold + `moving`) |
|---|---|---|---|---|---|---|---|---|
| a consumer build: the Carousel's chunks, minified, gzip -9 (`CarouselItem` js + css, `slideContext` js) | 1505 + 496 + 1458 = **3459 B** | 1174 + 580 + 1574 = 3328 B | 1175 + 580 + 1826 = 3581 B | 1176 + 580 + 1826 = 3582 B (+123) | 1175 + 590 + 1873 = 3638 B (+179) | 1174 + 606 + 2067 = 3847 B (+388) | 1173 + 606 + 1941 = **3720 B** (+261) | NEAR-BYTES |
| lines changed | | +93 −71, five files | +167 −90, five files | library +188 −101 in seven files; the stage +7 −3; the test +228 | library +197 −101 in seven files; the stage +7 −3; the test +245 | library +248 −105 in seven files; the stage +7 −3; the test +269 | **library +234 −105 in seven files; the stage +7 −3; the test +275** | +18 −11, four files |

The cure moves the scale out of script: the per-frame `project()` and its two watchers are gone, and the CSS grows by 84 B for the keyframes. `useDeckSnap` grows by the fixes the fold added: live offsets and the resting member, the resize observer, the idle floor and the reduced-motion branch, together 252 B over the first cure. The second fold adds 1 B (the start watch); its comment changes cost nothing minified. The third fold adds 56 B: the reduced-motion fade (47 B in `slideContext`) and the named timeline (10 B of CSS), less 1 B in `CarouselItem`'s js. The fourth fold adds 209 B over the third: 194 B in `slideContext` for the dip (two Web Animations on the strip, the pending seat, the two curve tokens read from the strip) and the neighbour guard, 16 B of CSS for the dimming's reduced-motion fade, less 1 B in `CarouselItem`'s js. The fifth fold takes the dip out and adds the hold: 126 B less in `slideContext` than the fourth (the cure with the dip simply removed, the instant seat alone, is 1843 B there; the hold adds 98 B), and 2 B less in `CarouselItem`'s js. NEAR-SENTENCE 11.1.1's chunks are v11.1.0's to the byte (all three 11.1.1 demo builds read 3459 B).

**Release note, 11.1.2.**
- The Carousel no longer jitters under a swipe, a trackpad or a pager press; the strip settles on the browser's own snap and rests exactly on it.
- The neighbours' travel scale is drawn by the browser from the scroll position. Firefox, and Safari before 26 (iOS 18 and earlier), have no scroll-driven animations, so they show no travel scale.
- A strip that offsets its slides from its start (a padding, a centred snap) must state that offset as its `scroll-padding` too, or the slide at rest stays slightly small. Glass's Carousel page does.
- Under `projection="none"` and reduced motion a slide is no longer a stacking context or the containing block of a fixed-position child. A page that relied on that sets `isolation: isolate` (the stacking context) or `contain: layout` (both) on its slides.
- The content no longer lags its slide (question 1 decides whether it comes back).
- Dots bound to the Carousel's `v-model:active` move the slides, and a Carousel mounted with `v-model:active` on a later slide shows that slide.
- Under reduced motion a press puts the new slide in place at once; nothing slides. A press made while the slides still settle from a swipe or a trackpad gesture lands when they stop. The neighbours' dimming fades there.
- A press after a resize or a rotation lands on the right slide.

**Overlaps with BL rows.**
- W-L.2 item 9 (the inbound model) is cause 7.
- W-F.3 cure 3 zeroes the velocity at `scrollsnapchange`. WebKit never fires that, and Chromium fires it with `scrollend`, so the cure zeroes at `scrollend` (cause 4), with the idle floor where there is none (cause 10).
- W-K.6 item 13 (CR-08) is now cause 9.
- O-327 is part-cured (§1.3).
- O-372 placed atlas's fix commit `b1bd7d088` (`u/glass-fixes-on-11.1.0`) in 11.1.2. It rewrites the same function as this cure. §7 takes its parts into the cure and leaves its spring turn to question 2, so `b1bd7d088` itself is not applied. Its test, `tests/components/deck/snap-travel.test.ts`, is replaced by the cure's test at the same path (§2.4).

## 4. Heavy live members (11.3.0)

The record measured the problem (§2.6): a live SVG on each of 8 slides runs the rows at 44 to 50 Hz, with 13 to 32 frames over 25 ms per gesture and the commit 580 to 810 ms late. Running only the active slide's figure while the strip is still removes it.

**The fair comparison** (Chromium, all on the cure, a live SVG figure per slide; `witness/probe-nearsnap-fold`):

| | touch 1440: reversals; frames > 25 ms; longest | touch 390 | pager 1440 next / prev / dot: frames > 25 ms (longest) | pager 390 |
|---|---|---|---|---|
| all 8 live, v11.1.0 (record) | 2 / 7 / 4; 29 / 22 / 29; 41.6 ms | 3 / 3 / 3; 14 / 13 / 32; 41.7 ms | 1 / 0 / 0 (41.7) | 0 |
| the consumer's own rule (run when active and the deck's position and velocity say still), cure | 0; 0; 14.3 ms | 0; 0; 17.8 ms | 1 / 0 / 0 (51.9) | 0 / 1 / 0 (29.2) |
| the slot's `moving`, all 8 mounted | 0; 0; 25.0 ms | 0; 0; 24.6 ms | 1 / 0 / 0 (29.0) | 0 |
| `moving`, and the page mounts only the rested slide and its neighbours | 0; 0; 10.3 ms | 0; 0; 18.4 ms | 1 / 0 / 0 (32.3) | 0 |

On the cure, the consumer's own rule is as smooth as anything the library adds; the earlier witness compared the prototype with v11.1.0 and so credited the cure's gains to it. That rule's position test needs a tolerance a page cannot easily choose: `extent` comes from rounded `offsetLeft`, while `scrollLeft` rests at the true offset, so at a pitch of 808.4 px member 7 rests at 7.0035, past the study page's 0.002; and the velocity also reads 0 on the first scroll event of each gesture, because `rest()` clears `lastTime`. On 11.1.2 a page reads "still" from the strip's own `scroll` and `scrollend` instead: listeners on `CarouselContent` fall through to the strip (checked in happy-dom), and 11.1.2 dispatches `scrollend` where the engine has none. `moving` is that same signal. Mounting three figures instead of eight changes nothing measurable on this lane. The one long frame at the first press appears in every variant (§1.1).

**So the library adds one signal, `moving`**, on `CarouselContext` and on `CarouselItem`'s slot beside `index` and `active`: true from the strip's first scroll event or a press, false at its `scrollend` (or the idle floor). A consumer writes:

```vue
<CarouselItem :index="i" v-slot="{ active, moving }">
  <Figure :running="active && !moving" />
</CarouselItem>
```

Why a signal and not the position: "still" read from the deck's position (an integral position and zero velocity) is wrong wherever the strip rests off a pitch multiple, as at the end of a strip whose last members share a clamped offset (the demo's peek exhibit rests at 5.31 pitches) or before a resize is re-measured. `moving` comes from the events themselves. This is reasoning; that cell was not filmed.

What stays with the page: which slides mount a figure (the near window, `tools/app-extra/mounts/carousel-near.vue` shows one), pausing off screen and in a hidden document (daraksha's stage does both, §6), `contain: paint`, decoding ahead.

Cost: +32 B gzip over the fourth fold (it cost 37 B on the third), +16 −6 lines. Without `scrollend` the figure still starts after landing (the frozen cell, §2.3). Under reduced motion `moving` rises at the seat, which is the press unless the strip was still moving then (§2.7), and falls at that seat's `scrollend` (Chromium in the seat frame, WebKit 10 to 15 ms later). The slide being left stops its figure at the press, when it stops being active.

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
- Under reduced motion a turn fades 144 ms out and 144 ms in. In 11.1.2 a Carousel press arrives at once under reduced motion (cause 9, the owner's ratified choice 8 A); the dip, 100 ms out and 100 ms in, is BM's parts minor (§13).

Its dots are glass's PagerDots (`src/pages/PortraitsPage.vue:556` at 61b36f0: `:ring="false"`, and `window-fit` 3 or 5 on narrow screens), so the dots' look is question 4. This study's patches do not touch PagerDots. One other 11.1.2 row does: O-372's `3c24e5b4c` (on `u/glass-fixes-on-11.1.0`, not yet on release/11.1.1) keeps the active end dot of a ring-off rail whole instead of cut to a half-moon, and daraksha's rail is ring-off. The dots' tap target does not change for daraksha. PagerDots already sets `--pager-hit-cell` to `--touch-target` (2.75rem) under `pointer: coarse` at v10.1.4 (daraksha's pin), v11.1.0 and release/11.1.1 (`PagerDots.vue:588-590`), and the third critic measured a ring-off rail at 390 with a touch pointer at 44 × 44 per dot on 11.1.1 and on the cure, in both engines. LT-18's 32 × 32 is its reading of the stage's dots (`audit/last-ten/FINDINGS.md:30`), and what LT-18 will change is not built. The round 2 critic's brief named a coarse-size change for daraksha's dots; the measurement says otherwise, so the note names the end dot only. O-385 (f) (eight or more dots overflow a 358 px stage at a coarse pointer) is read with the end-dot commit; daraksha's rail windows itself on narrow screens, so it should not meet it. So daraksha's portraits dots are worth a look on 11.1.2, on the first and last portrait; the note to daraksha says so (SITES.md).

## 7. Atlas's path onto the cure

Atlas's home deck runs glass `u/sp-integ-glass` (8b4d8f82b). That line branches from glass before 11.0.0 (merge base 373ed8aba) and adds the U/HERO commits. Its deck half was later carried onto v11.1.0 as `b1bd7d088` on `u/glass-fixes-on-11.1.0`, which O-372 placed in 11.1.2.

| What the line has | Line | `b1bd7d088` | 11.1.2 (folded cure) | Side |
|---|---|---|---|---|
| live member offsets for a press (`offsetOf`) | yes | yes | yes, clamped to the strip's end, and also for the reconcile | glass |
| resize handling | `ResizeObserver` → re-measure and an instant re-seat | same | re-measure only; both engines re-snap the strip to its member themselves (§2.3, resize) | glass |
| a rest without `scrollend` | 150 ms idle floor, always armed | same | 150 ms idle floor, only where the engine has no `scrollend` (a held finger is not rest) | glass |
| velocity zeroed at rest | yes | yes | yes (cause 4) | glass |
| release once | yes | yes | yes, with the reconcile (causes 5, 6) | glass |
| reduced motion | instant | instant | instant, and a press made while the strip moves holds its reports and seats once the strip rests (cause 9); the dip is BM's parts minor (§13) | glass |
| inbound `watch(active)` | yes | no | yes (cause 7) | glass |
| the commit echo | yes (the spring turn runs on every commit) | yes | gone (`heading`, cause 1) | glass |
| the projection (scale and lag per scroll frame) | yes | yes | view-timeline scale, no lag (causes 2, 3) | glass; the lag is question 1 |
| a press as a spring turn: an instant seat plus a `translate` spring on `--spring-dock`, snap suspended | yes | yes | no: the browser's smooth scroll | **question 2** |
| one-pass autoplay with a pause control (`9235d026c`) | yes | no | no | 11.3.0 (CR-06); atlas keeps the line's until then |

The path: atlas's line rebases onto 11.1.2, drops its own `useDeckSnap` changes (b1250cadb, f373de108) for the cure, and keeps `9235d026c` until 11.3.0 carries the autoplay, less its `useCarousel.ts` hunk: that hunk adds `watch(active, (i) => deck.go(i))` and the `watch` import where 11.1.2 does, so keeping it conflicts (the second critic's note; SITES.md tells atlas). If the owner picks the spring turn, it returns in 11.3.0 for presses only, on top of `heading`, so a swipe never runs it. O-421 is closed only when atlas's deck runs the cure.

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
- Firefox: not in the matrix. Under the `@supports` guard it shows no travel scale, and neither does Safari before 26.
- On the 11.1.1 base: race, held and noend (they press the chevron pager on `?c=carousel`, and 11.1.1 rebuilt that page into CarouselStage, which has none; the second critique's hero-page form of them fails on unpatched 11.1.1 at 800 to 900 ms and holds on the cure, in Chromium), resize and keyboard, and the touch, wheel and pager films. The library source they read is v11.1.0's, byte for byte.
- `projection="none"` without a stacking context on the member (§1.1): reasoned from the stylesheet, not filmed.
- A press 60 or 150 ms after a lift (§1.1): the second critique's Chromium reading, not refilmed.
- Questions 1 to 4's B sides, filmed against the cure.
- Right-to-left: not run. Live offsets make `scrollTo` and the reconcile follow the members' own positions, but the continuous position is negative there.
- The reconcile at the end of a peek strip (`restingOn`'s first-of-the-clamped rule): reasoned, not filmed.
- A `scrollend` lost in a hidden document mid-scroll: not covered by the idle floor (it arms only where the engine has no `scrollend`).
- `moving` against the position-derived rule at a clamped strip end (§4): reasoned, not filmed.
- The near-snap tree in WebKit, beyond the frozen cell.
- The near-snap tree's films (§4 and the frozen cell) on the fourth fold: not re-run. Its unit tests, typecheck and bytes were (§2.6, §3).
- A vertical strip, the `window` projection and dark mode.
- Repeats: each GREEN film cell ran once; the snap-back variants ran three times at each width.
- The dip on DeckStage's snap register, which rides the same arm: not filmed. The ink cells are the hero, glass's stage and the 16rem strip (§2.6).
- A swipe under reduced motion, where the dimming now fades over 0.15 s at the commit (§1.1): not filmed.
- The dip in a hidden document: the fade-out's end, which seats the strip, waits on the document's animation clock, so a press made while the tab is hidden (an autoplay) may seat only when the tab shows again. Reasoned, not filmed.
- A Carousel mounted hidden (round 2's note): one reading by the third critic (Chromium, the hero with `start=2` mounted inside `display: none` and shown 600 ms later) rested at 2072 px with member 2 active and the caption on 3, so it did not reproduce in that shape. Not refilmed here.
- Dot jumps in Chromium that grow with distance (round 2's note: 0 to 7 takes 1.4 s): the browser's smooth scroll over seven pitches, which the cure does not shape (question 2). Not refilmed here.
- The WebKit wheel and the travel scale on the fourth fold: not refilmed. The fold changes no rule that runs with motion allowed except the vertical selector (now `>`, so a horizontal strip inside a vertical one keeps the inline axis; no page has a vertical strip), and the neighbour guard, which acts only while the strip rests on its heading. §2.5's wheel and scale rows stand on the third fold.
- The named timeline on a vertical strip: not run (no page in glass has one).
- value.js's HOME-DECK-REFS.md is not committed; it is quoted as the record quotes it.

## 12. Files

- `cure.patch`: 11.1.2 against release/11.1.1 (`patch -p1` or `git apply` at the repo root): the library, glass's Carousel stage and `tests/components/deck/snap-travel.test.ts`. Its library half applies to v11.1.0 too; the stage file does not exist there. `near-snap.patch`: 11.3.0 against the cure.
- `fold.md`: each objection's ruling in the first two folds; the third fold answers `critique.md`'s second round directly (§2.5), and the fourth answers `critique-r3.md` directly (§2.6). `STUDY.md`: the study for the owner. `SITES.md`: the notes for atlas, and for value.js and daraksha.
- `witness/`
  - `probe-red/`, `probe-green-fold/`: RED and the folded GREEN, with `summary.json`. `probe-green/`: the first cure.
  - `probe-nearsnap-fold/`: §4's comparison. `probe-nearsnap/`: the first prototype.
  - `probe-green-lagkept/`, `probe-green-jsscale/`, `probe-green-io-off/`, `probe-nearsnap-io-off/`: the intermediate builds §1, §1.2 and §2.2 cite.
  - `witness.{red,green}.{chromium,webkit}.json`: the first logic witness. `witness.{red,cure1,green,near}-fold.*.json`: the fold's cells.
  - `snapback-fold-webkit.log`: the variants, three runs at each width. `scale-*.log`, `snapback-webkit.log`, `snapback-travel-webkit.log`: the first checks.
  - The second fold: `scale-stage-{chromium,webkit}.log` (§2.4's scale), `run-fold2-{red,green}-{chromium,webkit}.log` and `witness.{red,green}-fold2.*.json` (§2.4's logic cells).
  - The third fold: `run-fold3-{red,green}-{chromium,webkit}.log` and `witness.{red,green}-fold3.*.json` (§2.5's reduce, model and start cells), `scale-stage-fold3-{chromium,webkit}.log` (§2.5's scale), `snapback-fold3-webkit.log` (§2.5's wheel).
  - The fourth fold: `run-fold4-{v1111,red,green}-{chromium,webkit}.log` and `witness.{v1111,red,green}-fold4.*.json` (§2.6's ink cells; RED is the third fold). `witness.green-fold4-easeout.*.json` and `run-fold4-green-easeout-*.log`: the dip with its in leg on `--ease-out`, the reading that moved it to `--ease-standard` (§2.6); its WebKit run lost its browser at 390, cause not read.
- `tools/`: `carousel-probe.mjs`, `analyze.mjs` (still rows skipped), `witness.mjs` (with the `start` cell, and the ink cells `reduce`, `retarget`, `turn` and `motion`, which read every member's on-screen ink per frame), `snapback.mjs`, `scale.mjs`, `scale-stage.mjs`, `compare.py`, `wheel.py`, `tables.py`, `build-tree.sh`, `serve.sh`, and the study pages under `app-extra/mounts/` (the hero now takes `member` and `gutter`, for the 16rem strip).

## 13. The dip, for BM's parts minor

Choice 8 A gives the Carousel's reduced press the dip: what the strip shows fades out where it is, the strip seats while hidden, and it fades back in, 100 ms each way (BM `study/DESIGN.md` §5.3). 11.1.2 does not ship it (cause 9). This is the design BM's parts minor takes, from this study's four folds and one trial.

**On the strip, not the member.** The fade animates the strip's own opacity. On a strip that shows several members, a fade of the member pressed for blinks the members already on screen and stands in for the neighbours' dimming for its length (round 3's B-2 and M-1); a fade of the strip covers every shape.

**The curve.** P0a's check is that no leg lands more than two fifths of its travel in one 60 Hz frame and that a leg is at least five frames long. A 100 ms leg is six frames. The share of a whole 0-to-1 fade that lands in one 16.7 ms frame, from glass's tokens on release/11.1.1, at the worst phase of the frame clock and with frames counted from the leg's start (BM's `pass-10/access/frames.mjs` counts the second way), and over one late 21 ms frame (the fourth fold's WebKit film had one):

| curve, 100 ms | worst phase | from the start | one 21 ms frame |
|---|---|---|---|
| `--ease-in`, cubic-bezier(0.4, 0, 1, 1) | 0.25 | 0.25 | 0.32 |
| `--ease-apple`, cubic-bezier(0.25, 0.1, 0.25, 1) | 0.36 | 0.36 | 0.44 |
| `--ease-standard`, cubic-bezier(0.4, 0, 0.2, 1) | 0.42 | 0.37 | 0.50 |
| `--ease-out`, cubic-bezier(0, 0, 0.2, 1) | 0.44 | 0.44 | 0.52 |
| linear | 0.17 | 0.17 | 0.21 |

So the out leg rides `--ease-in`, whose steepest frame is its last, at 0.25. The in leg rides `--ease-apple`: of glass's bezier tokens it is the only one that starts slowly enough to keep the cap at 100 ms in any phase. BM's own figure for the dip, 0.372 on `--ease-standard`, holds only when the frames fall at the leg's start; a frame clock a third of a frame off lands 0.42. `--ease-out` breaks the cap either way. No glass curve keeps it over a late 21 ms frame except `--ease-in` and linear, and P1 does not give an effect linear. `--exit-curve` would (0.19 on release/11.1.1), but master now aliases it to `--ease-out`.

TRIAL-READINGS

**The hold.** The dip is a programmatic scroll that has not moved yet, so it holds the strip's reports from the press, not from the seat: `commit()` returns while the dip runs, so a report the strip makes during the out leg (a swipe's settle, a neighbour's late batch) cannot take the press back. At the out leg's end, a strip that has scrolled since it last rested waits at opacity 0 for its `scrollend`, or 150 ms with no scroll, before it seats. That is 11.1.2's hold (cause 9, §2.7) with the out leg in front of it; without it the fourth fold lost every press made within 300 ms of a swipe's lift (`critique-r3.md`, round 4, B-1).

**Turning round.** A press during the out leg moves only `heading`, so the seat goes to the last press. A press back to the member on show during the out leg cancels it and fades in from the opacity on screen, so a change undone inside a tenth of a second turns round instead of running the whole dip (P0a rule 6; the fourth critic's minor 2). A press during the in leg fades out from the opacity on screen over the whole 100 ms.

**Tokens, no fallback.** The script reads `--ease-in` and `--ease-apple` from the strip's computed style with no keyword behind them, as the stylesheet reads its tokens (the fourth critic's minor 3). 100 ms is choice 8 A's figure; no token names it.

**What the dip brings with it.** For its 200 ms the strip's animated opacity makes it a stacking context and, in Chromium, a backdrop root, so a member's child raised over what lies outside the strip stays inside the strip's layer, and a backdrop-filtered surface inside a slide samples only the strip until the dip ends (neither consumer's slides do either, as far as read). A press made in a hidden document seats only when the document's animation clock runs again. `moving` (§4) rises at the seat, not at the press.
