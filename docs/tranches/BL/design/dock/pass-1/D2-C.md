# D2 · pass 1 · D2-C · the physical dock (one integrator, a transform track, no scroll container)

| field | value |
|---|---|
| seat | D2 pass 1, research seat for family D2-C. It develops this family alone: `PORTFOLIO.md` §0-2 and the D2-C sections (§4, §6, §7) were read, no other family's section was |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the brief named `5804d8cc`. The worktree was cut at `991067c8`; the checkout read `21b3824f` at the end. All docs-only: `git diff --quiet v10.0.1 991067c8 -- src` and `git diff --quiet v10.0.1 21b3824f -- src` both hold, so `src/` is v10.0.1 throughout |
| engines | Chromium 149.0.7827.55 headless; **Playwright WebKit** 26.5 (the Playwright 1.61.1 build, not Safari). Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**. iOS Safari, VoiceOver and TalkBack were not run: **UNMEASURED** |
| instruments | The D2 harness (`docs/tranches/BL/design/dock/harness/`, run from the worktree's copy) on three builds: `head` (the worktree at HEAD), `d2c` (the probe) and `d2c-clock` (the probe with one token changed, §2.3). My own scripts under the scratch root `…/scratchpad/D2/p1/D2-C-research/mine/`: `fam.mjs` (sections A-G: family witness, gesture, accessibility, loop accounting, squish, wheel, clip), `idle.mjs` (who requests frames at idle), `q6-clip.mjs` (a plain page, no dock code), `drag/` (keyframes `Draggable` on a seat track). Outputs in `mine/res/`, harness runs in `out/`, `out2/`, `out3/` |
| scratch history | A previous instance of this seat, stopped by the redeploy, left logs and a probe script in the same scratch root; its worktree was already removed. I read its `probes/family.mjs` and adapted it into `mine/fam.mjs`. Its logged numbers are not used here: every number below comes from a command this instance ran on source it wrote |
| writes | This file in the checkout. Everything else in the worktree and scratch. Two git index writes happened inside my own worktree beyond `worktree add/remove`: a `git rm --cached` on the three deleted composables and a `git add -N` on the two new ones (to get a diff stat). Both were in the scratch worktree's index only, not the checkout's, and the worktree was removed with `git worktree remove --force` |

## 0 · Findings in one table

| # | question | answer | measured by |
|---|---|---|---|
| Q1 | Without a native scroller, do `touch-action: pan-y` and pointer events give flick, momentum and overscroll containment that match HEAD's snap scroller on iOS Safari? | **iOS Safari: UNMEASURED.** In Chromium touch emulation the body owns the horizontal gesture (1 down, 10 moves, 0 cancels) and lands on the lattice 182 ms after the gesture, where HEAD's native fling landed 496 ms after it. A vertical pan that starts on the dock goes to the page (524 px scrolled). At HEAD it does not (0 px, because `touch-action: pan-x` claims it). Momentum is the body's own: `decayRest` with iOS's documented deceleration rate (k = 2.0 /s), then a spring to the nearest rest. It is not the platform's physics | `fam.mjs` B, §3.1 |
| Q2 | Do VoiceOver and TalkBack swipes reach off-track seats, and does reach on `focusin` cover them? | **VoiceOver and TalkBack: UNMEASURED.** All 14 seats are in the accessibility tree, and a clipped seat is not hit-testable. `focus()` on seat 12 moves the track (s 0 → 328, fully visible) in both engines. `scrollIntoView()` does nothing (s stays 0), where HEAD's port moves to 264. So reach covers keyboard focus and activation. It does not cover an AT cursor that moves without DOM focus, or a consumer that calls `scrollIntoView` | `fam.mjs` C, `q6-clip.mjs` |
| Q3 | Can one rAF integrate e, s, c and the rim follower, park within the R3b budget, and replace `useDockSpring`'s three instances? | **Yes.** One body steps five lanes (extent, track, compaction, rim, and the crossfade that replaced DockCrossfade's spring). It ran 0 frames in 2 s at rest in both engines, 30 frames (Chromium) / 17 (Playwright WebKit) on a first expand, and parked after. `useDockSpring.ts`, `useDockMorph.ts` and `dockMorphMeasure.ts` are deleted in the probe. The page still requests 240 frames per 2 s at idle (Chromium; 120 in WebKit), at HEAD and in the probe alike. The source is `useGlassBackdropLuminance`'s `useRAFLoop`, which is not the dock's motion | `idle.mjs`, `fam.mjs` D |
| Q4 | How much cross-axis stretch per unit of velocity reads as the squish while staying on the plate? | **A swell, never a thinning, and a resize, not a scale.** A plate thinned by 4 % uncovered the seats: faces sat 1.11 px outside the plate (W3). The probe swells: σ = 0.04 · min(1, \|v_e\| / 3000 px/s), which is +2.22 px on a 56 px dock at peak (measured live in both engines), and W1 still passes on every sampled morph frame. Resizing the plate keeps the corner within 0.14 px of the circle (0.24 in WebKit) up to 10 %. Scaling it reads 0.35 px of corner error at 4 % and 0.60 px at 10 %. Whether 4 % reads as the hallmark is a perceptual call that no instrument here makes | W3, W1, `fam.mjs` E, `idle.mjs` |
| Q5 | How should pixel-mode and line-mode wheel deltas map, with `preventDefault` only when the track can move? | Take the main-axis delta, and only when it dominates the cross delta. Pixel mode maps 1:1. Line mode maps 1 line to 1 pitch (3 lines → 144 px → rest 120). Page mode maps to one port length. The deltas accumulate a target on the track lane, which lands on the lattice after 90 ms idle. `preventDefault` applies whenever s_max > 0, **including at the ends**, where the track overpulls. That is the containment HEAD's `overscroll-behavior: contain` gave. It never applies on a dock that fits (measured: `[false, false]`), and a vertical wheel over a horizontal dock scrolls the page (+100 px). At HEAD the page did not scroll (Chromium) | `fam.mjs` F |
| Q6 | Is `overflow-x: clip; overflow-y: visible` a non-scroller on Safari 26.4? | **Safari 26.4: UNMEASURED (owner's safaridriver checkbox).** Playwright WebKit 26.5 and Chromium 149 both compute `clip/visible`. `scrollLeft =`, `scrollBy`, `scrollTo`, `scrollIntoView` and `focus()` leave it at 0, and a horizontal wheel scrolls neither the element nor the page. The same page's `overflow-x: auto; overflow-y: visible` computes `auto/auto`, which re-confirms §2.3 | `q6-clip.mjs`, `fam.mjs` G |
| W | The five harness witnesses on the real dock source | HEAD at `991067c8`: W1 10/32, W2 0/10, W3 0/14, W4 4/16, W5 0/10. **Probe: W1 32/32, W2 10/10, W3 3/14, W4 12/16, W5 10/10.** Every W3 failure is the window, 1-6 ms over a 210 ms clock. With `--spring-dock-settle: 0.26s`, **W3 is 14/14 in both engines**. The four W4 failures are the coarse floor rows (hover latch, tap-through), which the probe does not implement | `run.mjs`, §2 |
| F | The family's own born-RED witness: no scroll container in the dock, a flick rests on the lattice, an overpull returns | **GREEN.** 0 elements with `auto`, `scroll` or `hidden` overflow across 9 scenes (fit, long, rail, morph, morph expanded, swap, rim, compact, the demo sidebar) in both engines. A flick rests on the lattice (328, a rest) and a 120 px overpull shows −55.38 px, then returns to 0 in 254 ms (Chromium) / 259 ms (WebKit) | `fam.mjs` A, B |

## 1 · The probe

The probe is built on the real dock in the worktree. Its paths match today's layout.

| file | change |
|---|---|
| `composables/useDockBody.ts` | **New.** One rAF steps N lanes. Each lane is a keyframes `SpringProgress` advanced by `tickDt`; the spring's own `.play()` loop is never started. The body parks when every lane has seated. Lane API: `to(target)` retargets from the current (value, velocity); `hold(value)` follows a drag and writes synchronously; `fling(value, v, target)` releases. `provideDockBody()` shares one body through inject, and a standalone owner mints its own. `bodyEpisode()` gives DockCrossfade its 0→1 handle on a body lane. 177 code lines |
| `composables/useDockExtent.ts` | **New.** It replaces `useDockMorph.ts` + `dockMorphMeasure.ts` (§4 item 3). 262 code lines |
| `composables/useDockRun.ts` | **Rewritten.** The track, reach writing s, the gesture and the wheel (§4 items 5-7). 242 code lines (HEAD 190) |
| `DockCrossfade.vue` | Its spring is a body lane (`bodyEpisode`); 10 lines changed |
| `GlassDock.vue` | Adds `<div class="dock-track">` around the default slot. Wires the body and its lanes. Adds compaction (bistable target + engagement gate), the rim element inside the plate, and the squish |
| `useDockShellProps.ts` | `scrollSource`, `compactOnScroll`, `rim` |
| `styles/run.css` | The run is `overflow-x: clip; overflow-y: visible` (the vertical run swaps the axes), with a main-axis ring reserve and a `.dock-track` translated by `--dock-s`. **Deleted:** snap type, scroll padding, `overscroll-behavior`, the `--dock-run` scroll timeline, the four cut-cap keyframes and their plate animations. The live region's `overflow: hidden` becomes `clip` |
| `styles/shape.css`, `styles/layers.css` | **Deleted:** the `scale: var(--dock-size-scale)` box morph, its counter-scale on the faces, the `--dock-live` blend and the held `inline-size: var(--dock-expanded-px)`. **Added:** the faces' main-axis aperture clip while `[data-dock-moving]` |
| `styles/dock.css` | The plate's collapse `clip-path` becomes main-axis `inset-inline` from the body. It gains the cross inset (compaction, squish), `overflow: clip` when it holds the rim, and the rim rules |
| `styles/morph.css` | Root padding reads a class constant `--dock-pad-t` (0 or 1), not the morphing `--dock-expand-t`, so nothing relayouts per frame |
| deleted | `useDockSpring.ts`, `useDockMorph.ts`, `dockMorphMeasure.ts`; the `useDockMorphOrchestrator` export in `composables/index.ts` |

Size: 15 files, +1,019 / −811 lines by `git diff --stat` (the deleted files are comment-heavy). `vue-tsc --noEmit -p tsconfig.src.json` reported 0 errors. The unit tests were not run: three dock test files import the deleted modules (`GlassDock.motion-parity.test.ts`, `g-dock-lattice.test.ts`, `dockMorphMeasure.test.ts`).

## 2 · The witnesses on the probe

Commands (run from the scratch root, `H` = the worktree's harness):

```sh
node $H/build.mjs wt --out out3 --label d2c
node $H/run.mjs --build out3/builds/d2c --adapter adapter-d2c.mjs --out out3        # → final-d2c.txt
node $H/w3-morph.mjs --build out3/builds/d2c-clock --adapter adapter-d2c.mjs --out out3
```

`adapter-d2c.mjs` is `adapter-head.mjs` with five reads changed:
- `morphing()` reads `[data-dock-moving]`, the extent window;
- `posture()` reads `compact` first;
- `rim()` returns `.dock-rim`;
- `compact()` is true on the compact scene;
- `config` binds `{scrollSource: "@window", compactOnScroll: true, rim: true}`.

### 2.1 Totals

| witness | HEAD `991067c8` | probe `d2c` | probe with `--spring-dock-settle: 0.26s` |
|---|---|---|---|
| W1 corner | 10/32 | **32/32** (worst 0.137 px Chromium, every morph frame included, squish on) | not re-run |
| W2 run | 0/10 | **10/10** (0 scroll-container frames on every route; ring cut 0/0 on the long runs and under hover) | not re-run |
| W3 morph | 0/14 | **3/14**: every failure is the window alone | **14/14** |
| W4 state | 4/16 | **12/16**: the compact rung 8/8 and PRM 4/4 pass; coarse latch and tap-pins fail (floor row 3, not built) | not re-run |
| W5 rim | 0/10 | **10/10** (0 device px outside the plate in all five rungs, both engines) | not re-run |

After the harness run, one line changed: the live region went from `overflow: hidden` to `overflow: clip`, so that family witness A reads 0. It is a 1 px visually-hidden node that is not a seat ancestor. W1-W5 were not re-run after it.

### 2.2 W3 in detail (probe `d2c`)

| transition (Chromium / Playwright WebKit) | continuity (max step ÷ bound) | faces out | landing | window vs allowance | owners |
|---|---|---|---|---|---|
| first expand, D 387.66 | ×0.66 / ×0.65 | 0.13 / 0.10 px | dead, 0 reversals | 258.3 ≤ 259.9 PASS / 263 ≤ 263 PASS | 0 |
| warm collapse | ×0.66 / ×0.66 | 0.13 / 0.10 | dead | 258.3 > 253.3 / 266 > 264 | 0 |
| warm expand | ×0.66 / ×0.65 | 0.14 / 0.11 | dead | 259.3 > 253.7 / 262 ≤ 263 PASS | 0 |
| content add, remove (D 179.33) | ×0.65 | 0 | dead | 257-258 > 253 / 265-267 > 262 | 0 |
| swap long, short (D 244.98) | ×0.65 | 0-0.01 | dead | 258-259 > 253 / 265-268 > 263 | 0 |

- **O-64 R-1** (first-morph endpoint): cured. The first expand is continuous in both engines, where HEAD held its width, then jumped 387.66 px in one frame.
- **R-2** (content-width change): cured. A content add is a retarget, where HEAD jumped 179.33 px in one frame; the face swap is the same class (244.98 px at HEAD).
- **R-3** (sub-pixel ring): cured. The extent lands dead with 0 reversals.
- **R-5** (one owner per property): 0 two-owner frames.
- **R-4** (the window on the rung's clock): the one row the probe fails at the shipped clock. It is taken up in §2.3.

### 2.3 The clock: what fails R-4, and the two ways to close it

The dock register is `(response 0.30 s, ζ 0.88)`, and its clock token `--spring-dock-settle: 0.21s` is its 2 % settle (`scheme-spring.css:104`). The same seconds are the horizon its CSS `linear()` curve is sampled over.

The closed form, computed in node (§8):
- the spring is inside 2 % of any travel at 215 ms;
- it is inside 0.5 px only at 245 ms (D 100) to 262 ms (D 600);
- its undesigned overshoot is M·D = 0.3 % of D (1.15 px on 387).

So a body that lands dead at the LayoutUnit floor lands at 248-268 ms, and R-4 fails against 210 ms by the frame allowance's margin. I built and measured three seat rules:

| seat rule | W3 | terminal step (Chromium, per-frame strip) |
|---|---|---|
| \|Δ\| ≤ 0.5 px and \|v\| ≤ 60 px/s (first probe) | Chromium: window only. Playwright WebKit: at ~17 ms frames it overshot 1.13 px with 1 reversal, and the window ran to 412 ms | 0.25 px (first expand), 0.68 px (content add) |
| \|Δ\| ≤ 2 % of the travel (the register's own settle band) | **7/7 Chromium**; windows 215-226 ms | **8.53 px after 2.75 px** (first expand); **4.68 after 1.41** (content add). A visible terminal snap: the class W's P10 measured on the CSS curve, and N-15's "not smooth" |
| \|Δ\| ≤ 0.5 px **or** the frame that crosses the target (final probe; overshoot below the settle band is undesigned, so it is seated) | 3/14 at a 210 ms clock (window only); **14/14 at 260 ms** | sub-pixel, 0 reversals in both engines |

**The ruling this family needs** has two options:
1. The dock register's clock becomes its 0.5 px horizon for the largest travel the dock makes. That is 0.26 s for D ≤ 600 at (0.30, 0.88). It is one fact serving the CSS curve's horizon and the body's seat, so it is P-3, not a second clock.
2. The body seats at the 2 % band and ships the terminal snap.

The first is the one that satisfies R-3, R-4 and N-15 together. The token change alone was measured (`d2c-clock`: windows 257.6-268 ms against allowances of 302.8-319.3 ms). Regenerating the `linear()` curve on the same horizon was not done in the probe. The token belongs to the motion register rather than the dock, so it is routed as an ask.

## 3 · The research questions, measured

### 3.1 Q1 · the gesture without a scroller

`fam.mjs` B, `long` scene (14 seats, s_max 328, rests [0, 24, 72, 120, 168, 216, 264, 312, 328]):

| gesture | probe, Chromium | probe, Playwright WebKit | HEAD, Chromium |
|---|---|---|---|
| mouse: 80 px in ~48 ms, release | rest 328 (on the lattice) after 254 ms, 0 clicks | 328 after 254 ms, 0 clicks | no movement: a native scroller ignores a mouse drag |
| mouse: 120 px overpull at s = 0 | track shows −55.38 px (rubber band, c = 0.55, d = port), returns to 0 in 254 ms | −55.38, 259 ms | 0 |
| mouse: 60 px, 150 ms pause, release | **rest 168**, 0 clicks | **rest 216** | 0 |
| touch (CDP `synthesizeScrollGesture`, −180 px at 2,400 px/s, 430×848) | pointer down 1 / move 10 / cancel 0; rest 384 (on the lattice) 182 ms after the gesture | not measurable: Playwright WebKit has no synthetic touch-move | native: 1 pointercancel; rest 384 after 496 ms |
| touch, vertical pan starting on the dock (−300 px) | 1 pointercancel; the page scrolled 524 px | not measurable | 32 pointer moves, 0 cancels; the page scrolled **0** |

Readings:
- The row with the pause is a defect in the probe, not the family. The release velocity was averaged over moves that ended 150 ms before the lift, so a held-then-released drag flung. The strongest form (§4 item 6) specifies velocity from samples inside the 100 ms before `pointerup`, zero when there are none.
- HEAD's `touch-action: pan-x` blocks a page pan that starts on the dock in Chromium emulation. The probe hands it to the page.
- Momentum is authored: `decayRest` with k = −ln(0.998)·1000 ≈ 2.0 /s. That is UIKit's documented `DecelerationRate.normal` (0.998 per ms), cited, not measured. Whether it feels like iOS Safari's own scroller on a phone is **UNMEASURED**.

### 3.2 Q2 · accessibility reach

`fam.mjs` C, `long` scene, seat 12 initially outside the port:

| read | probe (both engines) | HEAD (both engines) |
|---|---|---|
| buttons in Playwright's ARIA snapshot | 14 | 14 |
| `elementFromPoint` at the clipped seat's centre | a `div`, not the seat | a `div`, not the seat |
| `seat.scrollIntoView()` | s 0, seat 0 % visible | s 264, 100 % visible |
| `seat.focus()` | s 328, 100 % visible (the reach runs on `focusin`) | s 264, 100 % |
| Arrow-key walk seat 1 → 14 | every focused seat 100 % visible | every focused seat 100 % visible |

The plain page (`q6-clip.mjs`) confirms the platform half. Focusing a seat inside an `overflow-x: clip` box scrolls neither the box nor the page, in both engines, so without the body's reach a focused seat stays invisible.

### 3.3 Q3 · one loop

`idle.mjs` wraps `requestAnimationFrame` and records each caller's stack; the body exposes a frame counter:

| read | probe, Chromium | probe, Playwright WebKit | HEAD |
|---|---|---|---|
| body frames in 2 s at rest (`morph`, `fit`) | **0** | **0** | n/a |
| body frames on a first expand | 30 (headless runs at ~120 Hz), parked after | 17 | n/a |
| page rAF calls at idle, 2 s | 240, all from one site: `useRAFLoop` in `useGlassBackdropLuminance` | 120, same site | 240 / 120, same site |
| rAF callbacks in a 1.2 s window around a morph, Chromium (`fam.mjs` D) | 180 over 147 frames | 94 over 75 | 225 over 147 (WebKit 120 over 75) |
| the same around a swap | 196 | 100 | 212 (WebKit 109) |

The body meets R3b for the dock's motion: 0 frames at rest. The luminance sampler throttles its work to 4 Hz but requests every frame, at HEAD as here. It belongs to the veil and ink interface (O-62, F-23), not D2.

`new SpringProgress` has one site in the band either way. At HEAD, though, `useDockSpring` mints a spring per episode, each on its own `.play()` loop, across three owners. In the probe, five lanes are allocated once and stepped by one loop.

### 3.4 Q4 · the squish

`fam.mjs` E applies a static cross change to the plate and reads its corner against a circle of cross/2 (W1's method):

| form | cross change | fit (56 px), Chromium / WebKit | rail (64 px), Chromium / WebKit |
|---|---|---|---|
| resize (inset) | 0, 2, 4, 6, 10 % | 0.14, 0.11, 0.11, 0.10, 0.09 / 0.04, 0.02, 0.03, 0.05, 0.08 px | 0.14, 0.11, 0.11, 0.14, 0.10 / 0.01, 0.04, 0.06, 0.03, 0.24 px |
| `scale` on the plate | 2, 4, 6, 10 % | 0.19, 0.35, 0.52, 0.60 / 0.16, 0.28, 0.43, 0.69 px | 0.28, 0.26, 0.46, n/a / 0.16, 0.32, 0.47, n/a |

- The first probe thinned the plate. W3 then read faces 1.11 px outside the plate on the expands, in both engines. A thinning plate uncovers the seats, because the seat cells reach the plate's cross edges.
- The final probe swells by σ = 0.04 · min(1, \|v_e\| / 3000). Peak \|v_e\| on the 387 px expand is about 3,200 px/s: 27.5 px in an 8.5 ms frame in W3's strip.
- Measured live: 56 → 58.22 px at peak, in both engines. W1 still passes 32/32 with the swell on, and W3's faces read ≤ 0.14 px.
- The swell paints σ·cross/2 = 1.1 px outside the dock's layout box on each cross side. The root carries no transform, so the fence holds.

### 3.5 Q5 · the wheel

`fam.mjs` F (`long` scene, pointer over the run):

| input | probe, Chromium | probe, Playwright WebKit | HEAD, Chromium |
|---|---|---|---|
| vertical wheel 100 over the horizontal dock | not taken; page +100 | page +100 | page **0** (the port's `contain` eats it) |
| horizontal wheel 100 (delivered as `deltaX` 50 in headless Chromium at DSF 2, 100 in WebKit) | at 60 ms s 18.6; rest 72 (on the lattice) | rest 120 (a rest; the helper's lattice list read 118 because it used the hovered seat's scaled rect) | native, rest 120 |
| at the end, one more +100 | `preventDefault` true; s 329.0 (overpull), returns to 328 | true; 329.0 | `preventDefault` false; the native port contains it |
| synthetic line-mode notch, 3 lines | `preventDefault` true; target 3 × 48 = 144; rest 120 | same | an untrusted event scrolls nothing |
| fitting dock, horizontal and vertical wheel | `preventDefault` `[false, false]`; page +100 | same | `[false, false]`; page 0 |

### 3.6 Q6 · the clip is not a scroller

`q6-clip.mjs` (plain HTML, 14 × 44 px seats in a 300 px `overflow-x: clip; overflow-y: visible` box):

| read | Chromium 149 | Playwright WebKit 26.5 |
|---|---|---|
| computed | `clip/visible` | `clip/visible` |
| `overflow-x: auto; overflow-y: visible` beside it | `auto/auto` | `auto/auto` |
| `scrollLeft = 120` / `scrollBy(60)` / `scrollTo(200)` / `scrollIntoView` / `focus()` | 0 / 0 / 0 / 0 / 0; the page stays at (0, 0) | same |
| horizontal wheel 150 over it | element 0, page 0 | same |
| vertical wheel 150 over it | page +150 | same |

In the dock (`fam.mjs` G), the probe's run computes `clip/visible` in both engines, and every programmatic scroll leaves it at 0. HEAD's run computes `auto/hidden` and moves to 72, 120 and 328 under the same calls. **Safari 26.4: UNMEASURED (owner's safaridriver checkbox).** BCD lists `overflow: clip` from Safari 16.

### 3.7 A side measurement: keyframes `Draggable` on a seat track

The charter names `Draggable`, so it was tested as the track's gesture (`mine/drag/`: a `Draggable` attached to the port, a real mouse click on seat 2). The result: seat click listeners fired 0 times and the port's fired once, with the port as the target, in both engines. `Draggable.handleDown` calls `setPointerCapture` on `pointerdown`, so the click retargets to the port and every tap on a seat is lost. It also drives its spring's target during the drag, so the track trails the finger instead of following it 1:1. The probe writes its own gesture: capture only past a 6 px slop on the dominant axis, a 1:1 hold, and click suppression only after a captured drag. It composes `decayRest`, not `Draggable`.

## 4 · The strongest form (what it must specify)

1. **The body.** It owns a fixed set of lanes, allocated once, on one `requestAnimationFrame` stepping every lane by `tickDt`. It runs no loop of its own at rest.
   - Lanes are extent e (px), track s (px), compaction c (0-1), the rim follower r (0-1), and the face crossfade (0-1).
   - One body per dock is provided by inject. A standalone crossfade mints its own.
   - PRM: every lane is built with `respectReducedMotion: true`, so a retarget seats in the same frame. Measured: 0 intermediate frames on the posture morph and on compaction (W4 PRM cells).
2. **Seating.** An extent lane seats when \|Δ\| ≤ 0.5 px, or on the frame it would cross its target. The track lane keeps its overshoot, because a flick's bounce is designed. **The register's clock is its 0.5 px horizon (§2.3)**, one token for CSS and JS.
3. **The extent.** One lane, retargeted by every change of the dock's natural extent: the posture flip, a content change, a face swap, compaction.
   - **Endpoints.** The target is the root's natural box in the target DOM, read after the DOM changed and before paint: a `flush: "post"` watcher for the posture, and a ResizeObserver on boxes the hold cannot resize (the track, the summary's children, the persistent regions) for content. The source is the in-flow box, never an out-of-flow measure.
   - **The hold.** While moving, the root holds a layout box of max(from, to), so nothing relayouts per frame.
   - **Per-frame writes (px custom properties only):**
     - the plate's two main-axis insets, which resize a contentless absolute leaf and keep its border and stadium radius true;
     - one translate per region: persistent regions lerp between their page positions in the from and to layouts, an entering face sits at its target, a leaving face stays where it was;
     - the faces' aperture `clip-path`, clipped on the main axis only.
   - **Anchoring.** Edges lerp in page coordinates, so a centred, start-anchored or end-anchored dock morphs about whatever its layout anchors.
   - **The window.** One attribute spans every extent episode. The probe used two: `data-dock-moving` for the window, and `data-morphing` kept for the posture fade CSS. The clean form keeps one (`data-morphing`, which value.js's e2e fixture already waits on) and keys the posture fade on the posture classes.
4. **The plate.** Its corner is `border-radius` on the plate, a stadium in every rung, because the plate is resized, never scaled. **No cut cap:** W1 requires a circle of cross/2 at the scrolled ends too, so "the cap reads s/s_max" cannot be a corner. The cue for hidden seats has to be content-level (an end fade on the run, masked with its cross-axis ring reserve inside the mask box). It was not built or measured here.
5. **The run and the track.**
   - The run is `overflow-x: clip; overflow-y: visible` (`overflow-y: clip` on a vertical dock), plus a main-axis ring reserve (padding and an equal negative margin).
   - `.dock-track` carries the seats and `translate: calc(-1 * var(--dock-s))`.
   - s_max is the track's layout length minus the port's content length.
   - Lattice rests are each seat's start in the track's own coordinates, minus P/2, plus both ends.
   - Seats are read as the track's children here. Floor row 1 (`[data-dock-seat]` at any depth) supersedes that.
6. **The gesture.**
   - Pointer events on the run with `touch-action: pan-y` (`pan-x` on a vertical dock).
   - Capture only after a 6 px slop on the dominant axis; suppress the click only after a captured drag.
   - Hold s 1:1 under the finger, with rubber band f(x) = (1 − 1/(x·0.55/d + 1))·d past the ends.
   - **Release velocity** comes from samples inside the 100 ms before `pointerup`, including the up event, and is zero when there are none.
   - Project the release with `decayRest` (k = 2.0 /s) and fling to the nearest rest, keeping the velocity.
   - A press on a moving track catches it where it is.
7. **The wheel.** As §3.5. The track takes the main-axis delta only when it dominates. Pixel maps 1:1, a line to a pitch, a page to a port length. The deltas accumulate a target on the track lane and land on the lattice after 90 ms idle. `preventDefault` applies whenever s_max > 0, and never when the dock fits.
8. **Reach.** `focusin`, click and roving retarget s to the seat's anchor and announce it. Nothing else can move the track, so every programmatic path has to go through reach (§7 C-2).
9. **Compaction** (O-55 R-1).
   - **The input:** a `scrollSource` getter or element (never a selector). The target c* flips to 1 above T + h and to 0 below T − h or at 0. The probe used T = 120, h = 40; measured enter 161 px, exit 76 px, 1 flip in 24 ±4 px moves.
   - **The engagement gate:** hover from a fine pointer, or focus within, holds c at 0 (measured: hover and focus return exactly to rest, leaving returns to compact, top returns to rest).
   - **The paint:** compaction resizes the plate about its centre by k = 1 − 0.16c and scales the regions about the dock's centre. Measured: 214.13 → 179.88 px.
   - **The posture:** `compact`.
10. **The rim** (O-55 R-2). A child of the plate, which is `overflow: clip` while it holds one, so the plate's own radius clips it in every rung. Its fill is the r lane (response 0.2, ζ 1) following the scroll source's progress. Measured: 0 px outside in five rungs, both engines.
11. **The squish.** A cross-axis swell of σ = 0.04 · min(1, \|v_e\|/3000), applied as an inset, never a thinning and never a scale.

## 5 · Public API and consumer impact

**GlassDock:**
- **Gains:** `scrollSource`, `compactOnScroll` (boolean, or `{threshold, band}`) and `rim` (boolean; a `#rim` slot is the alternative if consumers want to style the fill), plus the posture class `compact`.
- **Keeps:** the `expanded`, `isTransitioning`, `expand()`, `collapse()`, `keepOpen()` and `release()` exposes. `data-morphing` stays the settle signal (§4 item 3).
- **Loses:** nothing public. The deleted `useDockMorphOrchestrator` was on the internal composables barrel, not on `/dock`.
- **Changes shape:** consumer seats become children of `.dock-track`, one level deeper, and the run stops being a native scroller.

**Tests:** the three test files above and the 21 files that name the morph or cap internals (portfolio §1.3) are rewritten.

| consumer (X.md ids) | impact |
|---|---|
| **chicago** | Delete `.page-dock .dock-run { overflow: visible }` (X-2). It would un-clip the main axis; harmless on its fitting dock, but it is a stale override (E-6 addendum). Delete `--dock-cap-rest: 9999px` (X-1): the token and the cut cap no longer exist. Its `window` scroll source binds directly to `scrollSource` |
| **value.js** (pinned 7.0.0) | Its e2e fixture waits on `[data-morphing]` count 0 (A-8), which still works. A-1's veil: the probe has no infinite scroll-timeline animation, which was the cause of "veiled forever on WebKit-mobile", so its `getAnimations` fallback resolves. X-11's Tools seat animates its width with CSS inside the run, so the extent lane is retargeted on every frame of that transition (§7 C-5) |
| **keyframes.js** | A-2's font wait before mount stops being necessary: endpoints are re-read in flow at every retarget. The transport's collapsed face, which is wider than its 40 px summary (M-A), **still paints outside the plate at rest**, because D2-C clips faces only while moving (§7 C-6). `expand()` is unchanged. Its jsdom setup already shims ResizeObserver (`test/demo/setup/jsdom-layout.ts`) |
| **fourier-analysis** | X-4's `.animation-dock:where(.expanded) { width }` becomes part of the natural target, so the one-frame 102 → 960 (M-C) would morph. M-6's right-anchored dock would morph about its right edge, because the edges lerp in page coordinates. **Both are by mechanism only: no scene for either was built or measured here.** The `expanded` expose is unchanged |

## 6 · Chrome and Playwright WebKit

- **The same behaviour in both engines:**
  - W1, W2 and W5 pass every cell; the compact and PRM cells of W4 pass;
  - family witness A reads 0 scroll containers;
  - the gesture, reach, wheel and clip readings match, except where the input differs: headless Chromium delivered `deltaX` 50 for a 100 px wheel at DSF 2, and Playwright WebKit cannot synthesise a touch move.
- **Frame cadence** is the one engine difference in the motion. Headless Chromium ran at ~8.5 ms frames and Playwright WebKit at ~17 ms. That is what exposed the velocity-gated seat's missed landing in WebKit, where the first probe overshot 1.13 px with 1 reversal. The crossing seat removed it in both engines.
- **WebKit cells carry the harness's `+shim`** (the nested translucent `color-mix()` crash on the plate border, HARNESS.md §4). The probe's rim uses opaque and single-alpha colours, so it adds no new crash trigger.
- **Real Safari:** UNMEASURED (owner's safaridriver checkbox).

## 7 · Weaknesses, as named counterexamples

- **C-1 · An AT cursor that does not move focus.** `scrollIntoView` does nothing on a transform track (§3.2). A VoiceOver or TalkBack swipe onto a clipped seat reaches the seat in the tree but shows nothing, unless the AT also moves DOM focus. Whether each does is **UNMEASURED**. Activation still works: an AT press dispatches a click, and click reach moves the track.
- **C-2 · Consumer `scrollIntoView` and `focus({preventScroll: true})` are no-ops on the track.** A consumer that reveals a seat by scrolling it into view gets nothing. Only the body's reach moves s.
- **C-3 · iOS momentum parity.** The flick physics are authored (UIKit's documented rate), not the platform's. A native-feeling fling on a phone is unmeasured, and so is any deviation, which is exactly what the lattice gave up native scroll for (portfolio risk 4).
- **C-4 · The shipped clock cannot hold R-3, R-4 and N-15 together** (§2.3). One of them gives unless the register's clock token moves to 0.26 s, and that token is not the dock's to change.
- **C-5 · A CSS transition on a seat's size** (value.js X-11, and HEAD's own `inline-size` transition on `aria-current` seats in `run.css`) changes the natural extent every frame. Each frame's ResizeObserver callback retargets the lane, so the extent chases a transition it does not own: two owners of one geometry. Not measured. The cure is that seat presence and size changes are not CSS transitions inside the dock.
- **C-6 · Faces are clipped only while moving.** A collapsed face wider than its box (keyframes M-A, fourier M-B) still paints outside the plate at rest, because the in-flow natural box does not contain the overflow. A permanent aperture clip would cut hover and ring paint at the faces' main-axis ends.
- **C-7 · A thinning squish uncovers the seats** (measured: 1.11 px). The hallmark can only swell, and a swell paints outside the dock's layout box.
- **C-8 · Page-coordinate lerp and a scrolling ancestor.** Edges and regions are lerped in page coordinates measured at arm. An in-flow dock inside a scroller other than the window, scrolled mid-morph, would read stale geometry. The probe corrects only for window scroll.
- **C-9 · `Draggable` cannot be the gesture** (§3.7): pointer capture on `pointerdown` retargets every seat tap to the port. The charter's composition does not work as written.
- **C-10 · The probe's release-velocity bug** (§3.1): a 150 ms pause before the lift flung the track 108-156 px. The specification fixes it (§4 item 6). It shows the gesture is the family's to get exactly right, where the platform used to own it.
- **C-11 · The page is not idle.** The body parks, but the live-backdrop luminance sampler requests every frame at HEAD and here (§3.3). R3b cannot close for a `backdropMode: "live"` dock until that interface changes.

## 8 · Open gaps

- iOS Safari, real Safari 26.4, VoiceOver and TalkBack: every cell UNMEASURED.
- The register clock (§2.3) is an ask to the motion canon. The probe measured only the token change, not a regenerated `linear()` curve.
- No content-level cue for hidden seats was built: the cut cap is gone and nothing replaces it.
- Floor row 3 (the coarse hover latch, tap-pins) was not built, and W4 fails those four cells.
- fourier's M-C and M-6, and value.js's X-11 under the body, are unmeasured.
- Per-frame cost was not profiled. W3's strips ran continuous 8.5 ms frames in Chromium.
- The unit tests that import the deleted modules were not rewritten or run.
- A V↔H morph on a two-dimensional extent was not attempted.

Closed-form numbers in §2.3 come from this node one-liner (ζ 0.88, response 0.30):

```sh
node -e 'const z=.88,w=2*Math.PI/.3,wd=w*Math.sqrt(1-z*z);for(const D of [100,245,387,600]){let a,b,p=0;for(let t=0;t<1.2;t+=5e-4){const x=D*Math.exp(-z*w*t)*(Math.cos(wd*t)+z*w/wd*Math.sin(wd*t));if(a==null&&Math.abs(x)<=.5)a=t;if(b==null&&Math.abs(x)<=.02*D)b=t;p=Math.max(p,-x)}console.log(D,a,b,p)}'
# D=100: 0.5 px at 245 ms, 2 % at 215 ms, overshoot 0.30 px … D=600: 262 ms, 215 ms, 1.78 px
```

## 9 · Reproduce

Scratch root `S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-C-research`. The worktree was removed, so the probe source does not survive this seat. The builds under `out3/builds/` and the scripts under `mine/` do.

```sh
node $S/mine/q6-clip.mjs                                   # Q6 plain page, both engines
node $S/mine/drag/build.mjs && node $S/mine/drag/run.mjs   # Draggable tap capture
OUTDIR=$S/mine/res node $S/mine/fam.mjs $S/out3/builds/d2c $S/adapter-d2c.mjs chromium A,B,C,D,E,F,G d2c
node $S/mine/idle.mjs $S/out3/builds/d2c $S/adapter-d2c.mjs webkit
```
