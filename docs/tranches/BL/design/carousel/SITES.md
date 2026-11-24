# Notes to the sites: the home deck's uneven scrolling

Two notes, ready to send. Each stands alone.

---

## To atlas

**What I saw.** On your home deck the preview pages jump while they scroll. I filmed the deck frame by frame in Playwright's Chromium on the Mac's GPU and in Playwright's WebKit, which is not Safari; no phone was measured. In Chromium, a one-slide swipe at 1440 throws the picture 316 px backwards in one frame (153 px at 390), the motion changes direction 29 times in one swipe, and a trackpad gesture ends with a 352 px jump. The source is in your glass line, `u/sp-integ-glass`: each time the strip reports the slide it is settling on, the Carousel calls its page turn for that slide, so an instant jump to that slide and a `translate` spring start while the browser's own snap is still running, and the two fight. The browser's snap on its own is smooth (no backward step at all in the same films), and so is your pager: presses already turn with no backward step.

**What glass will ship.**
- **11.1.2, the patch after 11.1.1**: the Carousel never scrolls the strip for a slide the strip itself reported; the neighbours' shrink is drawn by the browser with nothing written per frame (Firefox, and Safari before 26, draw no shrink); the picture no longer trails its slide; dots bound to `v-model:active` move the strip; presses read each slide's own offset and survive a resize; under reduced motion a press puts the slide in place at once and fades it in, so nothing slides and nothing appears in one frame; a Safari without `scrollend` is covered. In Chromium every swipe, flick, carry, trackpad gesture and press then runs with no backward step and rests exactly on its slide.
- **11.3.0**: a `moving` flag on the Carousel and on each slide's slot (true from the strip's first scroll or a press until it stops) and the one-pass autoplay from your line. Also planned there, not yet built: the slide is chosen at the moment the finger lifts, not when it is 55 % in view.

**What I'd ask atlas to change.**
1. **Move your glass line onto 11.1.2.** Drop the line's own `useDeckSnap.ts` changes (the commits "suspend the strip's snap while a page turn travels" and "a page turn lands on its snap on the dock spring") in favour of 11.1.2, which carries their live slide offsets, resize handling, rest without `scrollend`, single release and reduced-motion handling. Keep the autoplay commit (`9235d026c`) until 11.3.0 carries it, but leave out its change to `useCarousel.ts`: it adds `watch(active, (i) => deck.go(i))` and the `watch` import, 11.1.2 adds the same watch in the same place, and keeping both conflicts. Your line branches from glass before 11.0.0, so the move also brings you 11.0.0's changes; plan it as one step.
2. **Presses will use the browser's smooth scroll** (about 0.5 s at 1440) until I decide whether your spring turn (0.22 to 0.28 s) should come back for presses. If I choose it, glass ships it for presses only, so a swipe never runs it.
3. **Live figures in the slides.** Run a figure only on the shown slide and only while the strip is still. On 11.1.2 the strip tells you when it moves: from its first `scroll` event to its `scrollend`, which 11.1.2 sends itself where Safari 26.0 and 26.1 have none. `<CarouselContent @scroll="moving = true" @scrollend="moving = false">` is enough. Don't read "still" from the deck's `position` being a whole number: when a slide's width is not a whole number of pixels, the position at rest sits a few thousandths off (7.0035 for the eighth slide at an 808.4 px pitch). On 11.3.0, use `active && !moving` from the slot, which is the same signal. With that rule, glass's film of a live figure on every slide runs with no backward step and no frame over 25 ms. Also pause a figure when the deck is off screen or the tab is hidden, and put `contain: paint` on the figure's box.
4. **Decode the neighbours ahead.** On the first swipe at 390, slide 2's preview was on screen and empty for 9 frames (lazy loading). Load the slides either side of the shown one eagerly, or decode them ahead as daraksha's portraits do.
5. **Tell me when your deck runs 11.1.2.** I'll count the jitter as fixed only then, once I've filmed your deck again.

**Two things I found that are not yet fixed.** Your previews are links: in a keyboard test in Chromium, the first arrow key turns the slide and then focus falls out of the strip, because the slide it was in becomes inert, so further presses do nothing. This predates 11.1.2 and is planned for a later release. And in WebKit, one trackpad snap-back of 8 to 28 px remains early in a wheel gesture; its cause is still being traced.

The rings on the map and making the slides interactive figures are yours; glass's part is the strip they sit in. I can send the full study, with every table, if you want it.

Thanks,
Mike

---

## To value.js and daraksha

**What I asked.** I found atlas's home deck jittery while scrolling between slides, and asked that the design of daraksha's slides and portraits be taken into account. I filmed the deck, glass's Carousel and daraksha's portraits frame by frame, in Playwright's Chromium on the Mac's GPU and in Playwright's WebKit, which is not Safari; no phone was measured.

**What I found about snap and glide.** HOME-DECK-REFS.md says a hand-carried glide like daraksha's "would replace snap-scroll's jitter". The films do not bear that out. The browser's snapping strip, with nothing of glass's around it, runs every swipe, flick and trackpad gesture with no backward step and keeps the picture 1:1 under a held finger. The jitter was glass's own code around the strip (it scrolled the strip again after the strip reported its slide, and rewrote the slides on every scroll frame). Please correct that line, so atlas is not steered toward replacing the snap.

**What glass will ship.** 11.1.2 cures the Carousel; 11.3.0 adds a `moving` flag for live content. Daraksha does not use the Carousel, and the Carousel changes in this study do not touch PagerDots. Other changes planned for 11.1.2 do: on a touch screen each dot's tap target grows to 44 px, and on a rail without its ring the active dot at either end is no longer cut to a half-moon (a fix from atlas). The portraits page renders glass's PagerDots, so its dots are worth a look on 11.1.2, at phone width and on the first and last portrait.

**What glass is taking from daraksha**, with thanks: frames that stand still while their contents move on transform and opacity; one live drawing at a time, paused off screen and in a hidden tab; neighbours decoded ahead; `contain: paint` on a live figure; and a turn that fades rather than cuts under reduced motion. Glass ships the signal for the second (`moving`) and the last (under reduced motion a press puts the slide in place at once and fades it in over 150 ms, close to daraksha's 144 ms), and leaves the rest to each page, as daraksha does.

**What daraksha could change.**
1. **The hand-over jump.** At every hand-over the incoming drawing jumps in one frame by the distance it had already followed the hand: 189, 122 and 273 px for a swipe, a flick and a slow carry at 1440, and 175, 122 and 253 px at 390, the same in Chromium and WebKit. The size suggests the arriving drawing starts from its stand-in's resting place rather than from where the hand left the stand-in (`glide.ts`, where `glideIn` reads `from`). That is a reading of the numbers, not a traced cause.
2. **Two long frames on a first swipe.** In a fresh browser context at 1440, the first swipe had a 367 ms frame and the flick a 182 ms frame, with no script attributed; warm runs had none. A trace of a cold load would show what runs there.
3. **A horizontal trackpad does nothing on the portraits page.** That may be deliberate; if not, a sideways wheel could turn the portrait as the arrow keys do.

I can send the full study, with every table, if you want it.

Thanks,
Mike
