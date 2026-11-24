# BM study, pass 2: Critic B (production iOS Safari and the evidence)

Seat: Critic B, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I changed no design, page or source and staged nothing.

**What I read.** `CHARTER.md`, `UNION.md` (whole; §4's pass-2 line and the M7, M9, I12, I13 and I22 rows closely), `union-fold.md`, `INBOUND.md`, `READINGS.md` (no page published, no reading returned), `DESIGN.md` (pass 2's section and its amendments to pass 1's), `pass-1/fold.md`, every file under `pass-2/`, `pages/P2-scroll.html` and `pages/R2.html`, and `read/ios27-glass.md` §2.1 to §2.5 and §4. Behind the claims I re-read: `src/styles/tokens/scheme-spring.css:59-64`, `scheme-motion.css:155-177`, `src/components/scroll-progress-rim/styles.css` (whole) and `ScrollProgressRim.vue:97-133`, `src/composables/motion/scroll/useScrollChrome.ts:119-224`, `src/styles/utilities/base-misc.css:52-158`, `src/components/card/scroll.css:1-56`, `SelectContent.vue:145-160`, `CommandList.vue:28-41`, `bl/dock/wi8:src/components/dock/styles/run.css:733-915` (at `d48c19ec`), keyframes.js `src/animation/orchestration/drag/draggable.ts:270-296` (at `e5c12919`), gaggle `site-redesign:dashboard/src/report/page/PageDock.vue:4`, fourier `f45:web/src/composables/useDockProgress.ts:4-6`, and Home Assistant's `frontend/scripts/gates/bundle_budget.ts:1-60` and `package.json:21-28`.

**What I ran.**
- The page check for P2-scroll and R2, from a copy that writes only to my scratchpad, through `guarded`. Refused at 18:06:23 on the kernel zone (`data.kalloc.1024` at 13.70M) and again at the retry noted at the foot of this file. The zone has only climbed since 17:21 (`zone.log`), so no browser run of mine could pass before a reboot. A headless Chromium check could not have judged any objection below anyway.
- Three Node checks under `guarded --light`, written to my scratchpad, which read the pass's own files: `check-units.mjs` (playSpring for `scale` and `opacity`, and a retarget under a late start; B-1, B-2), `check-curves.mjs` (the panel token's single curve, the dock fits with speed, a transition fed per scroll event; B-3, B-6) and `check-chase.mjs` (today's token against the single curve, fed per scroll event; B-6). Their outputs are quoted where used.

**Verdict.** The pass's central argument holds as an argument: WebKit's accelerated list, the 27.3 note on `linear()`, and one transition curve per property together split the delivery into transitions on a single curve and settles as sampled keyframes. Its arithmetic for `translate` reproduces. It fails in four kinds of place:
- The player it adopts for settles is right only for `translate` in pixels. For `scale` it plays a cut and for `opacity` a truncated curve, and its retarget, the reason for preferring it, is computed but never exercised (B-1, B-2).
- The token swap changes more than the pass tells the owner, and leaves other `linear()` curves on body motion untouched (B-3, B-4).
- Two of the four scroll-linked parts reach further than the pass counted, or move the wrong mechanism for their main use (B-5, B-6, B-7).
- The new reading page cannot separate the thread question from the behaviour change it also shows, and decisions that wait on it are written as settled (B-8, B-9).

P2-scroll should not be published until B-8 is cured, and F's lane until B-7's last point is.

---

## Objections

### B-1 (major). playSpring's horizon is an absolute quarter unit: `scale` plays as a 4 ms cut and `opacity` stops at half its settle; "within 1.06 px at every row" was tested on `translate` only

**Claim.** §4.2 row C: "within 1.06 px at every row … with 14 to 24 keyframes (`sketch-check.json`)". §4.3 rule 2 puts "a dialog's spring" and "a sheet's detent" on `playSpring`, and §4.7 books `useSpringMount` (Dialog's and Sheet's `scale` and `opacity` writes, UNION D15) as "replaced by the player".

**Evidence.**
- `sketch/playSpring.ts:23-26`: the horizon is "the last moment the body is a quarter pixel or more from rest", tested as `Math.abs(x - to) >= 0.25` in the property's own units. `:58` lets `property` be `"translate" | "scale" | "opacity"`.
- `sketch-check.mjs` drives only `"translate"` with travels of 100 and 300 px.
- My `check-units.mjs`, the same player on all six rows, against the spring over the row's settle to 0.5 % of travel: `scale` 0.96 → 1 has no point 0.25 from rest, so the horizon is one 4 ms step. It plays in 4 ms and errs by 99.3 to 99.9 % of its travel: a cut, which law 7 forbids. `opacity` 0 → 1 stops when the body passes 0.75: on the dock row it plays 116 ms of a 244 ms settle, and across the rows it errs by 23.5 to 24.8 % of its travel. `translate` 0 → 100 px holds at 0.3 to 0.6 %.

**Remedy.** Set the horizon relative to the travel (a share of `|to − from|`, with a pixel floor only for lengths), extend `sketch-check.mjs` to `scale` and `opacity` on every row, and restate §4.2's C row as measured for the properties it covers.

### B-2 (major). The retarget that makes C preferable is computed, never exercised, and can jump on a busy page; the hand-off to the follow is unspecified

**Claim.** §4.2 row C: "a retarget starts from the spring's own state, so the speed carries". §4.3: "A mark retargeted mid-glide keeps its speed instead of stopping dead", the reason C serves rule 2 and a transition cannot.

**Evidence.**
- `playSpring.ts:69`: `const started = animation.startTime ?? document.timeline.currentTime`. An animation made by `element.animate()` is pending and its `startTime` is null until the browser resolves it at a later rendering update, so `started` is the timeline time of the frame before the call, not the animation's start. `retarget` (`:72-76`) computes its state from that and cancels.
- The two errors cancel only when frames are evenly spaced. On a busy page, the case §4 is built for, the gap before the first start and the gap before the retarget differ by up to the busy slice. My `check-units.mjs` models a 16.7 ms and a 45 ms late start on the dock row at 60 ms: the retarget begins 13.9 px and 34.1 px from where the body is drawn. This is arithmetic, not a reading; it shows the size of what was not tested.
- `sketch-check.mjs:19` stubs `animate()` to return `startTime: 0` and never calls `retarget`. R2 disables Go until the motion ends (`R2.html:181-183`), so no page reads a retarget either.
- `playSpring.ts:68` plays with `fill: "forwards"`. A filling animation sits above inline style in the cascade, so rule 3's "one write of `translate` per pointer event" is hidden under the last settle's fill until it is removed, and `cancel()` drops the body to its underlying value: a cut, unless the value is committed first. Neither step is in the sketch or in §4.3.

**Remedy.** Compute the retarget from the running animation (`animation.currentTime`) and start the new one at the same timeline time; commit the value (`commitStyles()`) before cancelling at a press; exercise both in `sketch-check.mjs` with a late start; add a mid-glide Go to R2 so the owner sees a retarget while the page is busy.

### B-3 (major). The panel token's single curve overshoots like a ζ 0.68 spring, below the owner's floor; "what the owner sees change" omits it

**Claim.** §4.3, "What the owner sees change": "Every spring transition's shape moves by at most 2.65 % of its travel … No control's curve overshoots".

**Evidence.**
- `curves.json`, `tokenReplacement.panel`: `cubic-bezier(0.198, 0, 0.106, 1.343)`, `bezier_peak` 1.0561. The row's own spring overshoots 4.21 % (`model.panel.overshoot_pct`).
- My `check-curves.mjs`: a 5.61 % overshoot is a damped spring at ζ 0.676. The owner: "Panel, at ζ 0.71, is the bounciest row; nothing below it" (`docs/precepts/README.md:94`).
- Panel is the overlay entrance (`motion-registers.css:69`, `--enter-overlay-spring: var(--spring-panel)`) and the route zoom (`:97`), so the change lands on every overlay that enters on it.
- The 2.65 % figure is a maximum distance between curves; it does not tell the owner that the bounciest row becomes bouncier by a third.

**Remedy.** Fit panel with its peak held at or under the row's own 4.21 %, and report that fit's error; or play panel as sampled keyframes. State the overshoot in "what the owner sees change" either way.

### B-4 (major). Other `linear()` curves on body motion are outside the cure, and the P5 draft would bar them with no disposition

**Claim.** §4.1: "every spring transition glass-ui plays runs on the page's thread", cured by swapping the six `--spring-*` tokens. The P5 draft (§4.6): "The curve must be one the compositor takes in every Safari the library supports".

**Evidence.**
- `src/styles/tokens/scheme-motion.css:163-177`: `--ease-cartoon-punch` is a 13-stop `linear()` with a 22 % overshoot. It drives `translate` and `scale` on `glass/glass-atom.css:50-51`, `scale` on `glass/glass-chip.css:30`, `transform` on `slider/styles.css:317`, and the entrance keyframes in `glass/liquid-enter.css:121`, `:176`. Its own comment (`:157-158`) calls it "compositor-safe, both engines", which the pass's I22 evidence refutes for every Safari before 27.3.
- `src/styles/scroll-choreography.css:54`, `:113`: `--ease-scroll-spring: var(--spring-world)` eases a scroll-driven animation, so the token swap changes a scroll-linked curve the pass does not mention.
- `src/components/handmark/stroke.ts:81-98` builds a `linear()` at run time.
- §4.2 to §4.7 name none of these, and the 11.3.0 ledger prices none.

**Remedy.** Inventory every `linear()` and `steps()` curve in `src/` (one `git grep`), and give each a delivery under §4.3's rules or put it to the owner (the cartoon punch's dip and 22 % overshoot are his question, not a fit). Correct the cartoon punch's comment with the evidence.

### B-5 (major). FadingScroll's register reaches every Select and Command list and the card's scroll host; the bleed and the 430 B removal count only the component

**Claim.** §4.4 FadingScroll: "Adopt on P2-scroll's reading and the sites' answer on padding"; removes "430 + 904". §4.9 asks only FadingScroll's hosts about padding.

**Evidence.**
- `SelectContent.vue:153-160`: the Select viewport carries `fading-scroll fading-scroll--y` with `data-fade-start data-fade-end`, and its inset "and the option corner derived from it are precompiled together in glass/overlay-plate.css". `CommandList.vue:36-41` does the same on the Command list.
- The sketch redefines `.fading-scroll--y` with `margin-block: calc(-1 * var(--fade-scroll-width))` and `padding-block: var(--fade-scroll-width)` (`sketch/fading-scroll.next.css:12-17`). Every Select and Command list on every site would then reach 1rem into its overlay plate's padding and pad its options by 1rem: a box that moves, which atlas's suites fail ([IN atlas 5]).
- `src/components/card/scroll.css:39-55`: `.card-scroll-host` uses `@keyframes gl-fade-end-out` and `--fade-end` from the same register, trailing edge only, because "a leading ramp would feather the STICKY header". `ledger.mjs` cuts every rule matching `gl-fade-(start|end)|--fade-(start|end)` from `base-misc.css` and the two `@property` rules from `base.css` into the 430 B, so the removal takes what the card host still needs.
- The census FadingScroll row (§3.1) counts component imports only.

**Remedy.** List the register's internal users. Either keep the Select and Command viewports and the card host on their own rule and narrow the removal and its bytes, or design each (the overlay plate's inset law, the sticky header) and ask the sites about Select and Command geometry too.

### B-6 (major). Scroll progress is a function of scroll position, which §4.3 rule 4 gives to a scroll-driven animation; the rim keeps a script value and a transition, which chases the scroll by half a second

**Claim.** §4.4 rim row: "a scroll timeline cannot replace the script's value", since atlas feeds beats and fourier a job; "It keeps gliding while the page is busy". UNION M9 gave pass 2 this question: "Whether a scroll-driven timeline on an accelerated property can draw a border that follows the radius is pass 2's."

**Evidence.**
- The rim's two scroll-fed consumers: gaggle's report dock, "a hairline on the dock's rim (glass ScrollProgressRim) shows how far down the page the reader is" (`PageDock.vue:4`), and fourier's "reading progress" (`useDockProgress.ts:4-6`; `usePageScroll.ts` in the census). The owner's order is scroll progress (`docs/precepts/README.md:105-108`).
- §4.3 rule 4: "A function of scroll position: a scroll-driven animation of an accelerated property". The pass's own window-and-stroke pair is two `translate`s, which a `scroll(root)` or named timeline can drive on the compositor from 26.4 ([IOS §2.1]); the non-scroll uses keep `value`.
- With `value`, the line moves only when a scroll event reaches the page's thread, so on a busy page it is late by the busy slice whatever thread the 210 ms leg then plays on.
- A transition whose end value changes restarts from the current value at the start of its curve. A curve that leaves rest at no speed, fed every frame, never catches a steady scroll. My `check-chase.mjs`: today's `linear()` token trails a steady scroll by 368 ms fed every 17 ms; the proposed single curve trails by 550 ms. Fed every 60 ms (a busy page), both trail by about 167 ms. This is a model of the transition rules, not a reading.
- P2-scroll asks for stutter, freezes and jumps; lag is not on the page, so the reading cannot show this.

**Remedy.** Split the rim by its source. Scroll progress: the same window and stroke on a scroll-driven `translate`, no script, no transition, under rule 4 (P2-scroll's F as that). Script progress: keep `value` and the transition. Ask the owner whether the line keeps up with the finger as well as whether it stutters.

### B-7 (major). The rim's sliding window moves the progressbar itself, drops the RTL arm, and is not what P2-scroll's F lane tests

**Claim.** §4.4 rim row: "The rim's root is a window with a still, square clip that slides by the unfilled share … The fill pill (`edge="inset"`) takes the same pair"; Adopt, in 11.3.0.

**Evidence.**
- `ScrollProgressRim.vue:98-107`: the root `.scroll-progress-rim` carries `role="progressbar"`, `aria-label` and the values. The sketch translates that root by up to its own width (`sketch/scroll-progress-rim.next.css:6-12`), so the element VoiceOver reads slides off its host. (Inference: VoiceOver draws its cursor at the transformed frame; atlas keeps VoiceOver order, [IN atlas 5].)
- `styles.css:129-131` has a `:dir(rtl)` arm for the stroke; the sketch has none, so in RTL the line grows from the wrong end. A box translated outside a host that does not clip adds to its scroll container's overflow, which RTL and the vertical arm both reach.
- The inset pill: "its track clips round" (sketch header, `:4-5`). `styles.css:10-15` records why the track is not clipped: the dots overhang the 3 px band by 1.5 px per cross edge and a clip would cut them. The inset variant is neither sketched nor priced.
- P2-scroll's F lane clips the window with `overflow: clip` (`P2-scroll.html:150`); the sketch rejects `overflow: clip` and uses `clip-path: inset(0)` (`sketch:7-10`). WebKit composites the two differently, and §4.1 itself lists `clip-path` among what WebKit never hands over. A clean F says nothing about the sketch.

**Remedy.** Put the window on an `aria-hidden` inner span and leave the progressbar's box on the host; keep the RTL arm; clip at the host; sketch and price the inset variant or take it out of the decision; make F's lane the sketch's mechanism.

### B-8 (major; cure before P2-scroll is published). P2-scroll cannot separate the page's thread from the behaviour change it also shows

**Claim.** §4.4 rests its three decisions on P2-scroll; §4.8: "Which of A to F stutter, freeze or jump while the page is busy".

**Evidence.**
- There is no run with Busy page off (`P2-scroll.html:158`). A lane that stutters for another reason, such as WebKit redrawing the backdrop under B's scaling glass bar, is charged to the page's thread. Four live `backdrop-filter` surfaces over a 1,500 px striped ground are themselves a load on the phone.
- A, glass-ui today, snaps at every scroll stop by design (`:220`). The owner will report A as "jumps" whether or not the thread stalls, and B starts its change late on a busy page by design. The A/B answer cannot be read as a thread answer.
- The ask is three gestures (scroll to the end, scroll back, swipe two strips) while watching six lanes at the top, middle and foot of the page, with no screen recording asked; R2 asks for one.
- The legend names A, C and E "glass-ui today" and B, D and F "the proposal", and the note tells the owner what to expect: "A motion the browser plays on its own animation thread keeps gliding; one the page works out each frame stalls" (`:169-171`, `:180`).
- D's visual claim, a sharp edge at rest at both ends with the chips passing under the ramp, is not asked; "swipe both strips sideways from their start" never reaches the end, where a horizontal scroller's inline-end padding is the case to see.

**Remedy.** One pair per screen, or one pair at a time behind a picker. Two passes, Busy off then on. Neutral letters with no "today" or "proposal" and no stated expectation. A screen recording asked for. For C and D, swipe to the end and back. For E and F, after B-6, ask which line keeps up as well as which stutters.

### B-9 (major). Decisions that wait on R2 and P2-scroll are written as settled where later passes will read them

**Claim.** Pass 2's first line makes Q6 provisional until R2, R6 and P2-scroll return.

**Evidence.**
- §1 law 5 (pass 1's table, amended by pass 2, `DESIGN.md:23`) now measures the law by §4.3's answer: "A transition rides the row's single `cubic-bezier()` token, a settle with speed rides keyframes sampled from the row". It carries no provisional mark, and passes 5 to 8 design against §1.
- §4.4's scroll-chrome and rim rows end in a bare "**Adopt.**"; the FadingScroll row's adoption waits on P2-scroll, but the other two do not say so.
- The P7 draft writes "within 2.65 % of the former `linear()`" into the canon text, which B-3 shows is not the whole change.
- UNION §4: "A pass whose reading has not returned says so in its first line, and its decision stays provisional until pass 9."

**Remedy.** Mark §1 law 5's amended measure, the two §4.4 adoptions and the P5 and P7 drafts "provisional until R2 and P2-scroll (pass 9)".

### B-10 (minor). R2 reads neither proposed form exactly, and one phone reads one Safari

**Claim.** §4.3, "What R2 settles": lane C's reading settles rule 2, and the Low Power Mode run settles law 7's 30 fps reading.

**Evidence.**
- R2's lanes animate `transform: translateX()` (`R2.html:159-180`); rules 1 and 2 animate `translate` and `scale`. Lane C plays 16 keyframes at even times (`:175-178`), not playSpring's bend-placed ones. Lane D is a WAAPI animation whose curve carries the flick (`:136-141`, `:180`), the form §4.2 rejects for controls; rule 1's form, a transition from rest on the token, is on P2-scroll's B only.
- The phone runs one Safari. §4.3's table has a 27.2 column and a 27.3 column; whichever the phone runs, the other stays a release-note inference ([27.3] 190761783). In 27.2 an accelerated animation is a Core Animation animation; in 27.3 WebKit runs it in the remote layer tree ([IOS §2.3]). Whether Low Power Mode's halving reaches the second is unread, so a Low Power Mode reading on one does not carry to the other.

**Remedy.** Make R2's C lane the sketch's player on `translate`, and say which column a reading settles. Keep the other column inference until a second phone or a later Safari reads it.

### B-11 (minor). "B is dominated" holds for settles, not for the tokens, and the P5 draft writes a version gap into the canon with no end

**Claim.** §4.3: "B is dominated. It equals C from 27.3 and is page-thread work before it … The `linear()` tokens leave". P5 draft: "`linear()` and `steps()` reach WebKit's compositor only from 27.3."

**Evidence.**
- The tokens serve transitions, which take one curve, so the choice for them is B against D, not B against C (§4.1's own split). From 27.3 a `linear()` token is accelerated and exact ([27.3]), while D is up to 2.65 % off with panel's overshoot raised (B-3).
- What share of readers runs 27.3 when 11.3.0 ships is Q7(d), unanswered (UNION Q7). Before 27.3 D wins on thread; after, B wins on fidelity.
- The P5 text carries no end condition, so it outlives the gap it answers.

**Remedy.** Put the trade to the owner as one: D's thread gain on iOS 26, Safari 27.2 and Home Assistant's WKWebView against its shape change on 27.3 and later, beside Q7(d). Bound P5's line to the oldest Safari the library supports.

### B-12 (minor). The follow probe cannot measure what I10 asks, and §4.5 overstates what a direct write saves

**Claim.** §4.5: kf's draw "waits for the page's thread twice: once for the event and once for the frame. Rule 3 writes `translate` in the move handler at the finger". §4.8 lists `probe/probe.mjs` as owed evidence for §4.5 and §4.4.

**Evidence.**
- In the probe's direct lane, `pointerX` is set by a capturing listener and `drawnX` by the same event's handler (`probe.mjs`, FOLLOW page), so the lag it records is zero by construction. In the kf lane it records the spring's state against the pointer, which follows from the spring's parameters without a browser. Neither reads where the puck is drawn when the frame is shown.
- A style write in a `pointermove` handler is still drawn at the next rendering update, so a direct write waits for the event and the frame just as kf's does. What it removes is the spring's trail (`draggable.ts:286-296` sets the spring's target per move; its comment: "a stiff spring tracks 1:1").
- Chromium aligns input to its frames and composites `linear()` easing. WebKit before 27.3 does not composite `linear()` (I22), and how it delivers touch input on iOS is R6's question. So the scroll half's counts of main-thread recalcs and paints in Chromium cannot stand for WebKit's, and the follow half reads Chromium's input path, not Safari's.

**Remedy.** State the gain as the spring's trail, with its size from the spring's parameters. Leave event delivery to R6. Keep the probe's scroll counts out of §4.4's evidence, or label them Chromium's.

---

## Dropped on the second reading

- **Home Assistant's 0.2 kB.** I first read the token saving as CSS against a JS entry bound. HA's `no-css-asset` gate and `bundle_budget.ts:28` ("their CSS in the entry's sheet") put glass-ui's CSS inside the entry, so the 1,487 B token saving does count against its entry; §4.7's direction holds, as an upper-bound estimate.
- **The I22 inference.** It is labelled an inference, it agrees with the 27.3 note and with [IOS §2.3], and R2 reads it. No objection.
- **The dock fits with speed.** §4.2's "passes its target by 0.7 to 2.9 %" at speeds of −6 to 12 travels a second reproduces (`check-curves.mjs`: 2.90, 2.23, 1.52, 0.69 %).
- **The run's caps.** The wi8 lines cited (`run.css:733-747`, `:857-915`) match at `d48c19ec`, the proposal waits for BL, and a still `border-radius` clip is geometry that headless Chromium can show. No objection beyond BL's own moving branch.
- **The early stop on retries.** Pass 2 recorded its runs as owed after 34 minutes, not 60. The zone only climbs until a reboot and `guarded` names a reboot as the cure, so the remaining retries could not have passed.
- **scroll-chrome's three properties on one node.** A law-4 count, and today's recipe also moves three. Left to Critic A.

## Run log

- 18:06:23 page check (P2-scroll, R2) through `guarded --timeout 8`: REFUSED, kernel zone `data.kalloc.1024` at 13.70M.
- 18:16:36 the same, retried after ten minutes: REFUSED at 13.75M. The count rose about 75 a second all afternoon (`zone.log`), so further retries inside the hour cannot pass. Owed after a reboot, with pass 2's own owed runs (`pass-2/retry.log`); none of B-1 to B-12 waits on it.
