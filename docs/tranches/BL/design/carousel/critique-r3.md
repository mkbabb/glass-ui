# Carousel jitter: the third round of critique (O-421)

## Round 3, the third critic (2026-11-24): holds after fixes, two items blocking

Seat: claude-opus-5-5, asserted from its own system identity. It read `critique.md` (round 2), `ROOT.md`, `STUDY.md`, `SITES.md`, `cure.patch`, `near-snap.patch`, `tools/witness.mjs` and the third fold's diff against HEAD. No source was changed and nothing was staged.

What this seat ran:

- `git archive release/11.1.1` (b9b96cb76) into `trees/c3-base` and `trees/c3-green` (docs and tests-visual left out, `node_modules` linked to the repo's). `cure.patch` applies with `git apply --check` and `patch -p1`; `near-snap.patch` applies after it.
- vitest, two workers: 16 of 16 on the cure (snap-travel's 10 and the Carousel and deck contract files), 16 of 16 with near-snap on top; snap-travel on 11.1.1 fails 8 of 10, as §2.5 says. vue-tsc on `tsconfig.src.json` is clean with near-snap on top.
- Both demos built with `tools/build-tree.sh`. CarouselItem js + css + slideContext js, gzip -9: 1505 + 496 + 1458 = 3459 B on 11.1.1, 1175 + 590 + 1873 = 3638 B on the cure (+179), as §3 says.
- Chromium is Playwright's headless shell 149.0.7827.55 with the GPU lane flags; WebKit is Playwright's WebKit 26.5 under the exclusive lock, not Safari. One browser per run, a context per cell, every run under `guarded`. The seat's own tools: `witness.mjs --cells reduce`, `scale-stage.mjs`, `snapback.mjs --travel --only travel,travel-flat --repeat 2`. Four probes of this seat's (scratchpad, not kept): each member's on-screen ink per frame around one press under reduced motion (ink is the share of the member inside the strip, times its opacity, times its content's); the second fold's `view(inline)` put back on the cured build; two dot presses 60 ms apart on glass's stage; the dots' boxes at 390 with a touch pointer.

### Verdict

The named view timeline holds in both engines and bites (below), and the PagerDots sentence is no longer false as a whole. The reduced-motion cure does not hold. Round 2's first item was "a press is a one-frame cut". After this fold the press is still a one-frame cut, now from the slide to nothing (B-1), and on a strip that shows more than one member the fade blinks a member that was already on screen (B-2). The witness cell cannot see either, because it reads only the pressed member on a page whose neighbours are never on screen.

### Blocking

**B-1. The slide being left still goes in one frame, and a full-width strip shows nothing in the seat frame.**

Claim: cause 9, §2.5 ("nothing travels and nothing arrives in one frame"), STUDY, and the note to atlas ("so nothing slides and nothing appears in one frame"). §1.1 records that the slide being left goes in the seat's frame and does not build the dip.

Evidence (the hero page, one press, `reducedMotion: "reduce"`):

| | frame before the seat | the seat frame | after |
|---|---|---|---|
| Chromium, 1440 and 390 | member 0 fully on screen at 1 (ink 1) | member 0 off screen, member 1 on screen at 0: ink 0 | member 1 at 0.09, 0.18, … 1 by about 150 ms |
| WebKit, 1440 and 390 | ink 1 | ink 0 | member 1 at 0.16 to 0.19 the next frame |

For one frame the strip shows what is behind it. On atlas's deck (full-width slides, a 2rem gutter), the caption beside the strip is still fading the old words out over 90 ms while the picture is already gone.

The laws: motion canon P0, "An exit is an animation too, never a cut", "No element changes … opacity or presence between two frames", and "Reduced motion shortens the travel to a fade (P6); it never makes a cut"; P0a, "a leg is at least five frames long. A cut given two frames is still a cut." The cut has moved from the arriving slide to the leaving one. Glass's own shortened swaps keep both legs under reduced motion (`transitions.css`: pane-swap and metric-swap at 0.15 s in and out), and daraksha fades 144 ms out and 144 ms in; the fold cites both for the in half only.

The cure: build the out leg. The canon's form is P6's dip, which §1.1 already names. On a press, fade what the strip shows out over about 90 ms (six tenths of the in, P0a), seat the strip at the end of it, and fade in over 150 ms; a press during the out leg retargets the pending seat instead of queueing a second. The fade-out starts in the press's frame, so the press still answers at once. Its cost is a seat about 90 ms behind the press and one pending target in the hold.

**B-2. On a strip that shows more than one member, the fade blinks a member that was already on screen.**

Claim: the same sentences. §11 lists "the reduced-motion fade on a strip whose neighbours show (glass's stage)" as not filmed, while STUDY and SITES say nothing appears in one frame.

Evidence:

- A strip shaped like fourier's featured row (`GalleryFeaturedCarousel.vue`: `projection="none"`, members `flex: 0 0 16rem`). Here it is the hero page with `projection=none` and 16rem members, the rule in place before the Carousel mounts, at 1440, and Next from member 0. Before the press, member 1 is fully on screen at opacity 1. In the seat frame the strip is at 288 px and member 1 is still fully on screen, at opacity 0. It climbs back over 150 ms. Chromium and WebKit read the same. On 11.1.1 the same press travels (28 offsets between) and nothing blinks; the second fold had no fade, so nothing there changed opacity. This fold adds the blink, and fourier (on 10.1.3) meets it when it moves to 11.1.2.
- Glass's stage (`?c=carousel`), dot 2. At 1440, slide 2 goes from a 0.7 sliver at the right edge (26 % on screen) to the centre at 0, and slide 3 appears at the right edge at 0.7 in the seat frame (ink 0 → 0.18). At 390 it is the same with 7 % slivers. Both engines. So "nothing appears in one frame" is false on glass's own Carousel page.

The cure: B-1's dip applied to what the strip shows (the strip's own opacity, or every member on screen) covers every shape. A fade of the target member alone cannot, because on a strip with neighbours the target is not the only thing that changes. The witness then needs cells that read every member's on-screen ink per frame, on the hero, on glass's stage and on a `projection="none"` strip of 16rem members, and that hold when no member's ink changes by more than two fifths between two frames, in both engines. The present cell's `holds` reads member 1 only; it records member 0 at 0.7 in the seat frame, which is off screen, and never reads what is on screen.

### Major

**M-1. The fade replaces the member's own opacity for 150 ms, then drops back to it in one frame.** The brief asked for the arriving slide's content; the patch animates the member (`members()[index]?.animate({ opacity: [0, 1] }, …)`). With no fill, that animation stands in for the member's state opacity until it ends. Two dot presses 60 ms apart on glass's stage under reduced motion (slide 2, then slide 3): slide 2, by then the dimmed left neighbour with 26 % on screen, climbs to 1, above its 0.7 dimming, and drops 1 → 0.7 in one frame at the fade's end (286 → 294 ms, Chromium). WebKit reads the same drop. If B's dip does not replace this code, fade the content node, whose own opacity is always 1, as the brief said.

**M-2. The note to daraksha names a tap-target change its dots will not see.** SITES (to value.js and daraksha) and STUDY say one of the two other 11.1.2 changes "sets each dot's tap target on a touch screen to 44 px". PagerDots already sets `--pager-hit-cell: var(--touch-target)` (2.75rem) under `pointer: coarse` at v10.1.4 (daraksha's pin), v11.1.0 and release/11.1.1 (`PagerDots.vue:588-590`). A ring-off rail, daraksha's and atlas's shape, at 390 with a touch pointer measures 44 × 44 per dot on 11.1.1 and on the cure, in both engines. LT-18's 32 × 32 is its reading of the stage's dots (`audit/last-ten/FINDINGS.md:30`), and what LT-18 will change is not built. ROOT §6 hedges ("that row reads how the two meet"), while the outward notes state it as fact. The end-dot change (3c24e5b4c, ruled in by O-372, not on release/11.1.1) carries the ask alone. A sentence for the note, with no ids:

> Daraksha does not use the Carousel, and the Carousel changes in this study do not touch PagerDots. One other change planned for 11.1.2 does: the active dot at either end of a rail without its ring stays whole instead of being cut to a half-moon (a fix from atlas). The portraits page renders PagerDots on just such a rail (`:ring="false"`), so its dots are worth a look on 11.1.2, on the first and last portrait.

STUDY's paragraph on the portraits page's dots and ROOT §6 change to match.

### Minor

1. The fade's curve and clock are literals. `easing: "ease-out"` is the CSS keyword, cubic-bezier(0, 0, 0.58, 1), not glass's `--ease-out`, cubic-bezier(0, 0, 0.2, 1) (`tokens/scheme-spring.css:154`), which the canon's P1 gives every effect; 150 is a number in TS. Read both from the tokens, or say in the comment why not.
2. Round 2's two other open notes are not in ROOT: a Carousel mounted hidden, and dot jumps in Chromium that grow with distance (0 to 7 in 1.4 s). One reading of the first here (Chromium, the hero with `start=2` mounted inside `display: none` and shown 600 ms later) rested at 2072 px with member 2 active and the caption on 3, so it did not reproduce in that shape. Record both in §11 or §1.1 with that reading.
3. `.carousel-strip[data-orientation="vertical"] .carousel-item { view-timeline-axis: block }` is a descendant selector, so a horizontal Carousel inside a vertical one takes the block axis. The members are the strip's children, so `>` scopes it. The second fold's rule had the same shape, and no page has a vertical strip.

### What stands

- **The patches.** `cure.patch` applies to release/11.1.1 (b9b96cb76) and `near-snap.patch` applies after it; the tests, the typecheck and the bytes read as above.
- **The reduce cell bites and holds as §2.5 says, for what it reads.** On 11.1.1 the press travels at 1440 (59 offsets between in Chromium, 11 in WebKit) and does not move the strip at 390. On the cure the strip seats in one frame, the pressed member reads 0 there and 1 after 145 to 151 ms, with the largest rise 0.10 a frame in Chromium and 0.18 in WebKit, and `scrollend` fires once. B-1 and B-2 are what it does not read.
- **The named timeline is the root cure the round 2 note asked for.** The cure's `hidden` rows equal its `built` rows to the fourth decimal in both engines at both widths: 0.965 / 1 / 0.965 at rest, and 0.9964 / 0.9929 / 0.99 / 0.9821 leaving at 1440. On the same build, the second fold's `view(inline)` put back on the content reads 1 / 1 / 1 with every member `overflow: hidden` and 0.965 / 1 / 0.965 without, in both engines, so the cell bites. `nopad`, `clip` and the hero read as §2.4.
- **WebKit's wheel on the cure** (2 runs per width): at 1440, 559 px when the last wheel event lands, with one 21 px step back at 59 to 60 ms; at 390, 192 px, with one 28 px step back at 100 to 123 ms. Without the dimming the strip keeps the hand at 602 and 234 px. That is §2.2 and §2.5 again: the timeline declared on the snap area adds no snap-back.
- **PagerDots.** SITES no longer says PagerDots does not change, and the end-dot commit is as described.
- **Consumers** (source, read-only). Fourier's `GalleryFeaturedCarousel` (`projection="none"`, 16rem cards, CarouselPager) and atlas's `HeroStage` on sci-report 83e3ab52 (`projection="travel"`, full width, `--carousel-gutter: 2rem`) are the only Carousels. No consumer uses DeckStage's snap register or `useDeckSnap` directly, declares a view timeline on a member, or clips a member with `overflow: hidden`. value.js, keyframes, gaggle and Home Assistant use no Carousel, and daraksha uses PagerDots only. Fourier and atlas meet B-1 and B-2 under reduced motion and nothing else from this fold.

### Files

- `critique-r3.md`: this section.
- The trees this seat built (`trees/c3-base`, `trees/c3-green`, and a near-snap copy) and the picture cache are deleted, and both servers are stopped. The probes lived in the session scratchpad.

## Round 4, the fourth critic (2026-11-27): holds after fixes, two items blocking

Seat: claude-opus-5-5, asserted from its own system identity. It read `critique.md`, round 3 above, `ROOT.md`, `STUDY.md`, `SITES.md`, `cure.patch`, `near-snap.patch` and `tools/witness.mjs` in full, the fourth fold's films (`witness/*fold4*`), the BM study's ruling on reduced motion (`BM/study/choices/CHOICES.md` choice 8, `BM/study/DESIGN.md` §5.3 and §14.2) and the consumers' Carousels, read-only. release/11.1.1 is at e12ad9f02 now; its `src`, `tests` and `demo` are ca61ce5b6's to the byte. No source was changed and nothing was staged.

What this seat ran:

- `git archive release/11.1.1` into `trees/c5-base` and `trees/c5-green` (docs and tests-visual left out, `node_modules` linked to the repo's). `cure.patch` applies, and `near-snap.patch` applies after it, with `git apply` (repo discovery stopped at `trees/`, minor 4) and with `patch -p1`.
- vitest, two workers, on the cure: 17 of 17 (snap-travel's 11 and the Carousel and deck contract files). vue-tsc on `tsconfig.src.json` is clean with near-snap on top.
- Both demos built with `tools/build-tree.sh`. CarouselItem js + css + slideContext js, gzip -9: 1505 + 496 + 1458 = 3459 B on 11.1.1, 1174 + 606 + 2067 = 3847 B on the cure (+388), as §3 says. The library diff is +248 −105 in seven files, the stage +7 −3, the test 269 lines, as §3 says.
- Chromium is Playwright's headless shell 149.0.7827.55 with the GPU lane flags; WebKit is Playwright's WebKit 26.5 under the exclusive lock, not Safari. One browser per run, a context per cell, every run under `guarded`. The fold's `witness.mjs --cells reduce,retarget,turn,motion` on the cure in Chromium, and `reduce,retarget,turn` in WebKit. This seat's own probe (scratchpad, not kept), on the hero and the 16rem strip: a second press dispatched at the first press's `scrollend`; two presses 92 to 124 ms apart; a touch swipe toward member 1 (80 % to 20 % of the strip in 150 ms), then a press for member 2 at 0 to 300 ms after the lift (Chromium: Next at 1440, the dot at 390); a trackpad-like wheel of 60 % of the strip, then Next at 0 to 300 ms after its last event (both engines). Each reads where the strip rests, which member is active, every change of the active member, and every offset the strip takes.
- A trial tree (`trees/c5-proto`, the cure plus the two-line change in B-1's cure), built and filmed the same way, to see whether that cure holds and what it costs.

### Verdict

Round 3's two blocking items are cured as the fold says. Under reduced motion a press now dips the strip, and every ink cell holds in both engines: no member on screen moves more than 0.29 of its ink in a 60 Hz frame in Chromium and 0.31 in WebKit (0.35 once in the fold's own WebKit film), on the hero, glass's stage and the 16rem strip, and a press during the fade-out retargets the seat. Round 3's major and minor items are answered too: the fade is on the strip, the note to daraksha carries the end dot alone, the curves come from the tokens, and the vertical selector takes `>`.

Two items block. The dip takes the strip's hold at the seat, 90 ms after the press, so a press made while the strip still moves is undone: after a swipe in Chromium, a press 0, 60, 120, 200 or 300 ms after the lift is lost under reduced motion every time, where 11.1.1 keeps three of the five and the cure with motion allowed keeps all five (B-1). And the dip's figures and release contradict the BM study's ruling on this same press, which the record never names (B-2).

### Blocking

**B-1. Under reduced motion a press holds nothing until its seat, so a press made while the strip settles is undone, and one made at a seat can land on the wrong slide.**

Claim: cause 9 ("A press during the fade-out moves the pending seat"), §2.6 ("the pending seat goes to the last press"), STUDY ("A second press during the fade-out changes where the strip lands") and the note to atlas.

The mechanism, read from the patch: under reduced motion `scrollTo` sets `heading`, starts `hide()` and returns. The hold (`programmatic`) is taken only in `seat()`, when the fade-out ends. For those 90 ms `commit()` takes any report the strip makes, sets `heading` to it and calls `deck.go`, and the seat goes to that `heading`. The neighbour guard (cause 11) covers only a strip at rest on its heading; after a press the heading has moved and the strip has not. With motion allowed the same press takes the hold in its own frame.

Evidence (the press is for member 2; "lost" means the strip rests on member 1 with member 1 active, after the active member went to 2 and back; on the hero the dots and the caption follow it):

| Chromium, hero, a touch swipe to member 1, then Next | 0 ms after the lift | 60 | 120 | 200 | 300 |
|---|---|---|---|---|---|
| 11.1.1, reduced motion | lost | lost | member 2 | member 2 | member 2 |
| the cure, motion allowed | member 2 | member 2 | member 2 | member 2 | member 2 |
| **the cure, reduced motion** | **lost** | **lost** | **lost** | **lost** | **lost** |
| the trial (B-1's cure), reduced motion | member 2 | member 2 | member 2 | member 2 | member 2 |

- Two ways to lose it. At 0 and 60 ms the observer reports member 1 during the swipe's settle, inside the fade-out, and the active member goes back to 1 there (87 and 21 ms after the press). From 120 ms the seat does run, and fails: the offsets read every frame at 120 ms go 915, 920, **2072, 2077**, 936, 941 … 1036 (at 200 ms: 962, **2072, 2075**, 972 … 1036). The instant seat holds two frames, while the strip is at opacity 0, then the swipe's own snap animation, still running, carries the strip back onto its curve and on to member 1, and the reconcile commits member 1 about 20 ms after the seat's `scrollend`. A smooth scroll (the motion path, and 11.1.1's reduced press) replaces that animation; an instant seat does not.
- At 390 with the dot for member 2, 0, 40, 80 and 160 ms after the lift: the cure under reduced motion loses all four; with motion allowed it loses 0 to 80 and keeps 160 (M-1); 11.1.1's dot does not move the strip at 390 (cause 7). The trial keeps all four.
- WebKit, which cannot send a moving touch, a wheel of 60 % of the strip, then Next for member 2 (hero, 1440): 11.1.1 under reduced motion lands on member 2 at 0, 100, 200 and 300 ms; the cure under reduced motion loses 0 and 100 (the active member back to 1 within 25 ms of the press); at 300 ms the active member was already 2 before Next came (M-2), and Next went to member 3. In Chromium, where the wheel has not committed member 1 when Next comes, the same cell loses the press at 0 and 100 ms on the cure and at 100 ms on 11.1.1.
- At a seat: a press for member 2 dispatched inside the first press's `scrollend` (Chromium, reduced motion) is lost on the hero at 1440 and 390 and on the 16rem strip at 390 (the active member 1, 2, then 1 again about 4 ms later), and on the 16rem strip at 1440 the strip rests on **member 3** with member 3 active (the active member went 1, 2, 3): a neighbour's late report, the one cause 11 names, lands inside the second press's fade-out, where the guard does not reach. With motion allowed all four land on member 2. Presses timed 92 to 124 ms apart all landed (16 of 16), the nearest 3.8 ms after a seat's `scrollend`, so this window is a few ms wide in Chromium. In WebKit all eight land; there `scrollend` comes 10 to 15 ms after the seat (§2.6).

The laws: the press moves the dots and the caption at once and then takes them back, so the reader's intent is shown and withdrawn, and the press at a seat can carry the reader to a slide nobody chose. Fourier's and atlas's Carousels both meet it under reduced motion.

The cure, at the root: the dip is a programmatic scroll that has not moved yet, so it holds the strip's reports from the press, not from the seat; and it seats only once the strip is still, waiting at opacity 0 for the strip's `scrollend` (or the idle floor) when a scroll is in flight as the fade-out ends. The trial is two lines on the cure: `commit()` returns while `dip` runs, and the fade-out's end waits for `scrollend` when the strip scrolled in the last 50 ms. On it, every row above lands on member 2 in Chromium (the swipe at 1440 and 390, the seat cell 8 of 8), and in WebKit the seat cell lands 8 of 8 (the trial's wheel cells there are confounded by M-2), the fold's ink cells still hold (Chromium, 0.28 to 0.29, out 93 to 100 ms, in 149 to 150 ms), and 17 of 17 unit tests pass. Its cost: after a swipe the strip stays hidden until the swipe's settle ends, 390 to 690 ms after the press at 1440 against 90 ms, and after the WebKit wheel 0.9 to 1.1 s, while the strip keeps moving (M-2). A seat that stops the settle instead was not tried. Add a unit test that a report during the fade-out commits nothing, and the swipe-then-press and seat cells to the witness (Chromium touch, WebKit wheel), holding when the strip rests on the member last pressed for and the active member never steps back.

**B-2. The dip's figures and release are not the ones the BM study ruled for this press, and the record does not say so.**

Claim: cause 9 calls the dip "the motion canon's dip (P6), the out leg six tenths of the in (P0a)", and the patch's comment says the same.

Evidence:

- The owner ratified the BM study's choices on 2026-11-23. Choice 8 A: "the mark fades out where it was and in where it goes (100 ms each way); the Switch's thumb dips out, lands hidden, and returns (200 ms)" (`BM/study/choices/CHOICES.md:196`).
- The study's final fold, run on those choices and committed 2026-11-24 at 04:16, before this fold, applies it to this press by name: "A transform that is a state's only sign of place dips. It fades out where it is, lands while hidden, and fades in, 100 ms each way. The switch thumb and the Carousel's press do this. BL's 11.1.2 Carousel press "arrives at once" under reduced motion, so it goes to BL as an 11.3.0 row at these figures, not daraksha's 144 ms and 144 ms" (`BM/study/DESIGN.md:156`; §14.2 at `:788`).
- The only P6 that names a dip is BM's unjudged precept amendment (precepts `bm/precepts-wip` at 8e54c07, and the precepts working copy today), and it says 100 ms each way. Glass's pinned canon (precepts 75822358c) has no dip in P6.
- The fold ships 90 ms out and 150 ms in, in 11.1.2, and names none of this. So two tranches now carry a dip for the same press, at different figures, for different releases.

The fold's reason for 150 ms holds on the numbers. Computed from glass's tokens, a whole 0-to-1 fade over 100 ms lands at most 0.42 of its travel in one 60 Hz frame on `--ease-standard` and 0.44 on `--ease-out`, past P0a's two fifths; over 150 ms on `--ease-standard` it lands 0.29 (the films read 0.27 to 0.30). The out leg on `--ease-in` lands 0.28 at 90 ms and 0.25 at 100 ms. So 100 ms each way meets P0a only on `linear` (0.17), which P1 does not give an effect, and 90/150 meets P0a and P1 but not choice 8 A's figure. That is a conflict between two of the owner's rulings, so it is his to settle.

The cure: state it in ROOT (cause 9 and §10, as a question with 90/150 as the default if that is the recommendation) and in STUDY, with the numbers above; tell BM that its 11.3.0 row for this press is built in 11.1.2, so BM's parts minor does not ship a second dip; and keep SITES's figures in step with what the owner settles.

### Major

**M-1. §1.1's "a press just after a lift" is wider than its one reading.** It says the reconcile commits the right member and "the active member never steps back", from the second critic's Next at 1440. At 390 with the dot, motion allowed, a press 0, 40 or 80 ms after a swipe's lift is lost: the swipe's settle wins over the smooth scroll, the strip rests on member 1, and the active member goes to 2 and back to 1 (Chromium, 3 of 4; 160 ms lands). 11.1.1's dot does not move the strip at 390, so it is not a regression, but the sentence is false on the phone, which is atlas's case. Put the cell in §1.1 and §11, and in B-1's witness with motion allowed.

**M-2. The WebKit wheel under reduced motion was never filmed, and on the cure the strip does not stay where it lands.** §11 keeps §2.5's wheel rows because "the fold changes no rule that runs with motion allowed". It does change one that runs under reduced motion: the dimming's `transition: none` becomes a 0.15 s fade, and §2.2 ties WebKit's wheel faults to exactly that dimming. This seat's wheel on the cure (60 % of the strip, hero, 1440, reduced motion, WebKit, offsets every frame): the strip follows the wheel to 586 px, reaches member 1 (1036) in one frame at 481 ms, runs 12 px past and comes back at 596 ms. In the traced run with Next at 300 ms it then moves on by itself from 690 ms (1087, 1153 … 1813 px by 973 ms), so the observer commits member 2 with no press, and the Next goes to member 3; the untraced run on the cure and the trial's run show the same order (member 2 active 2 ms before the press, then member 3). 11.1.1's one run of the same cell committed nothing between the wheel and the press, and its Next landed on member 2; its offsets were not traced. The trial does what the cure does, so it is not the dip. The cause is not traced, and whether the one-frame arrival is WebKit's own snap under reduced motion or glass's is unread. Film the reduced-motion wheel in WebKit on 11.1.1 and the cure, with offsets, before 11.1.2 says that nothing slides under reduced motion; whether Safari does it is unread.

### Minor

1. **"Stays that size."** SITES (to value.js and daraksha) says the dots' tap target "is already 44 px, and stays that size", and STUDY says "that does not change for daraksha". The first half is measured. The second is about LT-18, which is placed in 11.1.2 and not built (no commit names it). Say "is already 44 px on 11.1.1".
2. **A press back during the fade-out runs the whole dip.** A press for the member on show while the strip fades out moves `heading` back, so the strip goes to 0, seats nowhere and fades in, a 240 ms blink for no change. P0a rule 6 turns a change undone inside a tenth of a second round from the value on screen. When the pending seat comes back to the member on show, cancel the fade-out and fade in from the opacity on screen.
3. **The easing fallbacks.** `ease("--ease-in", "ease-in")` and `ease("--ease-standard", "ease-in-out")` fall back to CSS keywords when a token is missing, a masking ladder under the owner's no-masking-fallback rule. The stylesheet beside it reads `var(--ease-out)` and `var(--spring-dock)` with none. Drop them, or say in the comment why the script differs.
4. **How the patch was checked.** `git apply` run inside `trees/`, which sits in glass-ui's own checkout, takes its paths from the repository's root, skips every one outside the current directory, and still exits 0. This seat's first check did exactly that. The patches do apply, with repo discovery stopped at `trees/` (`GIT_CEILING_DIRECTORIES`) and with `patch -p1`; §2.6's "both patches apply … with `git apply`" should say how.
5. **The fourth fold's trees are still on disk**: `trees/c4-base`, `c4-green`, `c4-near`, `c4-patchcheck` and three `tsc-*.txt` (2026-11-24 22:23 to 22:26). The brief's law deletes them; this seat leaves them, since they are not its own.
6. **Atlas's caption cuts under reduced motion** (`HeroStage.vue:304-307` at 83e3ab52, `transition: none`), so on atlas the strip now dips while the caption beside it swaps at once. The note to atlas could ask for the caption's fade to stay, shortened, under reduced motion, as the strip's does.

### Notes left open

- For the dip's 240 ms the strip's opacity makes it a backdrop root in Chromium, so a slide that holds a backdrop-filtered surface over a see-through slide would sample only the strip during the dip and the page again at its end. Neither consumer's slides do that as far as read (fourier's cards are opaque plates, `GalleryCard.vue:96-97`; atlas's previews are pictures). Not filmed.

### What stands

- **The patches**: as above. ROOT, STUDY and SITES pass register-lint.
- **The ink cells**, re-run on the cure: Chromium, every cell holds as §2.6 says: reduce on the hero, stage and 16rem strip at 0.283 to 0.285 at both widths, the seat 95 to 98 ms after the press and the fade-in 148 to 150 ms; retarget seats once, on member 2; turn seats twice and rests on member 2; motion rests on member 1 on both pages. WebKit, every cell holds too: 0.26 to 0.31 at the worst frame, the seat 101 to 119 ms after the press, the fade-in 146 to 149 ms. The fold's own films (`witness.green-fold4.*.json`) match its tables.
- **The named timeline** is unchanged by the fourth fold apart from `>`, and round 3's reading of it stands.
- **The neighbour guard** holds in the cells it was built for (the 16rem strip rests with the pressed member active in every reduce and motion cell, in this seat's runs and the fold's films, both engines); B-1 is the window it does not cover.
- **PagerDots**: the end-dot commit (3c24e5b4c) is on `u/glass-fixes-on-11.1.0` and not on release/11.1.1, and `PagerDots.vue:588-590` sets the coarse hit cell on release/11.1.1, as ROOT §6 says.
- **Consumers** (source, read-only): fourier's `GalleryFeaturedCarousel` (on its current branch) and atlas's `HeroStage` (sci-report 83e3ab52) put no opacity, transition or animation on the strip, so the dip's Web Animation replaces nothing of theirs; neither uses `useDeckSnap`, DeckStage's snap register or a member that clips. value.js, keyframes, gaggle and Home Assistant use no Carousel; daraksha (61b36f0) uses PagerDots only. Fourier and atlas meet B-1 under reduced motion.

### Files

- `critique-r3.md`: this section.
- This seat's trees (`trees/c5-base`, `c5-green`, `c5-near`, `c5-proto`, `trees/w`, its build and serve logs) are deleted and its three servers stopped. The probe lived in the session scratchpad.
