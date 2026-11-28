# The home deck's uneven scrolling: the study

On 23 November, on atlas's home deck, the owner wrote that the scrolling of the preview pages in the slides "is jittery and not smooth", and asked whether the slides could hold live, interactive figures. This study answers glass's share: the unevenness between slides by swipe, trackpad and pager press, and how a slide can hold heavy live content without stutter. The rings on the map and the live figures themselves are atlas's.

Every number names its engine. **Chromium** is Playwright's headless Chromium on the Mac's GPU, filmed every frame; frame rates come only from it. **WebKit** is Playwright's WebKit build, which is close to Safari's engine but is not Safari, and cannot send a moving finger. No iPhone was measured. The detail is in `RECORD.md` (the first film), `ROOT.md` (the causes, the cure and every table) and `fold.md` (how the critique was taken).

## What makes the deck uneven

The browser's own snapping strip is smooth. With nothing of glass's around it (the "bare" strip), every swipe, flick and trackpad gesture runs with no backward step, rests exactly on its slide, and keeps the picture under a held finger 1:1 (0.99 of the finger's travel at 1440 wide, 0.96 at 390). The unevenness is glass's own code around that strip, in these sources (Chromium unless named):

1. **The Carousel scrolled the strip again after the strip reported its own slide.** Glass's v11.1.0 replaced the browser's settle with its own scroll in mid-gesture, so under a held finger the picture ran 29 % ahead of the hand at 1440 and 36 % at 390. On atlas's glass line the same echo restarts atlas's spring turn while the browser is still settling: the picture jumps 316 px back in one frame at 1440 (153 px at 390), changes direction 29 times in one swipe, and jumps 352 px after a trackpad gesture. This is the largest source, and it is what the owner saw.
2. **The neighbours' shrink was written onto the slides on every scroll frame.** The browser measures a slide's snap edge on its shrunken box, so every gesture rested 18 px (1440) or 7 px (390) short and then crept in. In WebKit, anything rewritten on the slides during a scroll makes it snap a trackpad back after each wheel step: the strip sat at 0 to 6 px when the hand stopped, then turned on its own 100 ms later.
3. **The picture trailed its slide by its speed** (up to 8 % of the slide's width) and that trail swung its whole range in one frame at the commit: a 77 px lurch at 1440, then 19 to 21 px backward steps. Even with sources 1 and 2 fixed, it alone made the picture change direction 20 times in a 1440 swipe.
4. **The trail never returned to zero at rest**: the picture rested 9 px (Chromium) to 65 px (WebKit) off its slide.
5. **Two presses could cancel each other**: Previous pressed 0.8 to 0.9 s after Next was undone by Next's timer.
6. **The strip and the dots could disagree**: if the page scrolled the strip back during a press, the strip rested on slide 1 with slide 2 marked.
7. **Dots bound to the Carousel did not move the strip**: at 390 no press moved it at all; at 1440 no dot did.
8. **After a rotation or a resized window, a press used the old slide width**: at 1440 → 1000 the strip rested on slide 4 with slide 3 marked.
9. **Under reduced motion a press still animated** (575 ms).
10. **In a Safari without the `scrollend` event (26.0 and 26.1)** the strip never learned it had stopped.

The content counts too. A live SVG figure on each of 8 slides ran the whole page at 44 to 50 frames a second, with 13 to 32 frames over 25 ms per gesture, and delayed the slide's commit by 580 to 810 ms. Running only the shown slide's figure, only while the strip is still, removed all of it. Large WebP pictures cost nothing visible on this lane; atlas's lazy previews showed slide 2 empty for 9 frames on the first swipe at 390.

## The cure, in glass 11.1.2

One patch to the Carousel (`cure.patch`, on 11.1.1: seven library files, +234 −105 lines, 261 bytes larger compressed; one line on glass's own Carousel page; and a unit test):

- The strip remembers where it is heading, so its own report never scrolls it again (1). A press still scrolls.
- The neighbours' shrink is drawn by the browser from the scroll position, on the picture inside the slide, with nothing written per frame (2). Firefox, and Safari before 26 (iOS 18 and earlier), have no scroll-driven animations, so they show no shrink. A strip that centres its slides with padding states that offset as its scroll-padding too, as glass's own Carousel page now does; without it the slide at rest stays about 1 % small.
- The trail is gone by default (3, 4); question 1 asks whether it should come back.
- A press releases its hold once; a strip that ends somewhere else commits the slide it rests on (5, 6).
- Dots bound to the Carousel move the strip, and a Carousel that starts on a later slide shows it (7).
- A press reads each slide's own position, and a resize re-measures (8).
- Under reduced motion a press never slides (9): the new slide is put in place at once. That is what the owner's ratified Reduce Motion choice says of this press in 11.1.2; the fade out and back in, 100 ms each way, comes with BM's parts minor (ROOT §13). A press made while the strip is still settling from a swipe or a trackpad gesture used to be lost, on 11.1.1 too; now it holds back the strip's own reports, lets the strip stop, and then puts the slide pressed for in place. The dots and the caption change at the press. The neighbours' dimming, which used to switch in one frame when a slide was chosen (on 11.1.1 too), now fades.
- On a strip that shows several slides whole, the slide beside the one pressed for can no longer take the current mark when the strip reports it late. The patch's own instant press brought this out (fourier's row shape, in Chromium); 11.1.1 read clean in the same test.
- Where the browser has no `scrollend`, 150 ms without a scroll stands in for it (10).

After it, in Chromium, every swipe, flick, carry, trackpad gesture and press runs with no backward step and rests exactly on its slide, and a held finger keeps the picture 1:1: the bare strip's own numbers. The settle is now the browser's own curve, about 0.7 s after a swipe at 1440 (v11.1.0's echo cut it to 0.33 s). In WebKit the trackpad now carries the strip (559 of the bare strip's 602 px when the hand stops), with one snap-back of 8 to 28 px left early in each wheel gesture. It goes away when the neighbours are not dimmed, but its cause is not yet named, and whether Safari with a real trackpad shows it is unread (ROOT §2.2). In Chromium the test for each of the ten faults holds. Under reduced motion, on atlas's shape, glass's own Carousel page and fourier's row shape, a press puts the slide in place in one frame with nothing in between, in both engines. After a swipe in Chromium, a press made 0 to 300 ms after the finger lifts lands on the slide pressed for every time, at 1440 and at 390; 11.1.1 lost four of eight at 1440 and its dots did not move the strip at 390. SWEEP-WEBKIT In WebKit the wheel, pager and logic tests hold apart from that snap-back, and the touch faults have no WebKit test, since Playwright's WebKit cannot send a moving finger.

**Found on the way.** On a deck whose slides hold links, as atlas's previews do, the first arrow key turns the slide and focus then falls out of the strip, so the next presses do nothing (Chromium; in WebKit the Tab key never reaches the strip). It predates the cure, is not jitter, and is placed for a later release.

Atlas reaches the cure by moving its glass line onto 11.1.2 (ROOT §7). The owner's item is closed only when atlas's deck runs it.

## Heavy live content, in glass 11.3.0

On the cure, a page that runs a slide's figure only while that slide is shown and the strip is still is already smooth: in Chromium, with a live figure on every slide, 0 backward steps and no frame over 25 ms in any swipe, flick or carry, at both widths. Mounting only the shown slide and its neighbours instead of all eight changed nothing measurable.

So 11.3.0 adds one signal, `moving`, on the Carousel and on each slide: true from the strip's first scroll or a press, false when it stops. A figure runs while its slide is `active` and not `moving`. It adds 32 bytes. It is more dependable than reading "still" from the strip's position, which is wrong wherever the strip rests between two slide widths, as at the end of a strip whose last slides share a resting place. Which slides mount a figure, pausing off screen and in a hidden tab, and decoding pictures ahead stay with each page.

## What daraksha's slides and portraits teach

- **The frames stand still, and only their contents move**, on `transform` and `opacity`. The Carousel already does this.
- **One live drawing at a time.** The portraits page runs the drawing on show; its stage stops drawing when it leaves the screen or the tab is hidden. That is the rule `moving` serves.
- **Decode ahead.** The photos either side of the one shown are fetched and decoded in advance, so a turn brings its photo in whole. Atlas's first-swipe gap at 390 is what this prevents.
- **Contain the paint of a live figure**, so its redraws stay inside its own box.
- **Under reduced motion, a turn fades** (144 ms out, 144 ms in). In 11.1.2 a Carousel press arrives at once under reduced motion; the fade, 100 ms out and 100 ms in, follows with BM's parts minor.
- **The keys work wherever focus is**, on the window, guarded against fields.

What it does not teach: that a hand-carried glide is smoother than the browser's snap. Its glide jumps the incoming drawing in one frame at every hand-over, by the distance it had followed the hand (122 to 273 px at 1440, 122 to 253 px at 390, in both engines), and a horizontal trackpad does nothing there. The cured snap has neither fault, keeps the browser's momentum, rubber-banding and accessibility scrolling, and drives the neighbours' shrink with no script. The glide's one gain is a mouse drag on a desktop, which no site has asked for.

The portraits page's dots are glass's PagerDots, on a rail without its ring. This study's patches do not touch them. One other 11.1.2 change does: the active dot at either end of a rail without its ring stays whole instead of being cut to a half-moon. Their tap target on a touch screen is already 44 px on 11.1.1 (measured at 390 in both engines). The note to daraksha asks for a look at the first and last portrait on 11.1.2.

## The owner's questions

Each has a default that ships if he says nothing. Questions 2 to 4 are a matter of feel, so each wants a live page with A and B side by side on his phone, like the choice board; this study has not built it.

1. **Should the picture inside a slide trail the slide while it moves?**
   - A, the default: no. The slide and its picture move as one, and the weight is the browser's own coasting and settling, about 0.7 s after a swipe.
   - B: the picture trails by up to 8 % of the slide's width and catches up as it slows. That needs a write on every frame, which costs the trackpad in Safari's engine (it snaps back after each wheel step), and as built it stepped backwards against the slide in every settle.
2. **How should a press move the slides** (next, previous, a dot)?
   - A, the default: the browser's own smooth scroll, about 0.5 s for a full-width slide at 1440 in Chromium and 0.22 s in WebKit, on the browser's curve.
   - B: atlas's spring turn, 0.22 to 0.28 s with no backward step, on glass's dock spring. It pauses the snap while it runs and must give way cleanly to a swipe.
3. **One card per flick, or as far as the flick carries?**
   - A, the default: one card per flick, as now and as the Photos app does.
   - B: the flick's speed picks the landing and can pass several cards, as Apple's Home View does.
4. **What should the dots do while the slides move?**
   - A, the default: today's worm. It moves when the slide is chosen, stretches with its speed and is a dot again at rest.
   - B: Apple's capsule. The current dot is a longer capsule whose length follows the scroll frame by frame, trading length with the next dot.

Held until glass has a media dock for a carousel: how such a dock should enter.
