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
