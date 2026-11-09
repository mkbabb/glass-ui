# glass-ui 11.1.0 · lane L2 (motion and forms)

The build seat for lane L2 on `release/11.1.0`, run by claude-opus-5-5. It read
`lane-L1.md` and the orchestrator note first (O-196 joined this lane there). Every build,
test and browser run went through `~/.claude/guard/guarded`; every WebKit run held
`--exclusive webkit`. The guard refused nothing. One run queued for a heavy slot rather
than a browser slot (a trace script whose command line named no browser); it was stopped
and rerun in the browser pool. The kernel zone warning printed `ARMED` at inuse ≈ 30k to
1.2M elements throughout, far below the 8M notify line.

Commits (read from `git log`): `8d3dc8d2d` (the six items, their unit tests, the CHANGELOG
entry, the canon section and the demo), then the records commit that carries this file
(and the ratchet rebind, if the gates needed one; see Gates).

Records: the witness (`lane-L2/probe.mjs`, `lane-L2/harness/`, chain `lane-L2/witness.sh`
→ `runprobe.sh`), readings (`lane-L2/out/{green,red}-{chromium,webkit}.json`, logs beside
them, the chain log `lane-L2/out/chain.log`), cropped paint (`lane-L2/out/png/`), the
mount-read trace (`trace-probe.sh`, `mount-trace-probe.mjs`), gates (`gates.sh`, `e2e.sh`,
`e2e-webkit.config.ts`, `gates/`).

**RED tree.** `git archive v11.0.0` into `.cache/l2-v1100` (tranche records excluded,
node_modules symlinked, the harness copied in), served the same way. The harness imports
the library by relative source path, so one page runs on both trees; what 11.0.0 lacks
(`grab`/`release`, `--collapsible-gap`, the `.viz-*` classes) falls through and changes
nothing. On 11.0.0 the harness gives the Collapsible root the consumer's `gap: 12px`
(11.0.0 has no other way to space it); on the branch it sets `--collapsible-gap: 12px`.

**WebKit build.** 2287, pinned by `executablePath`, as lane L1 and the 11.0.0 records do.

## The matrix

Per engine, per tree: 390 and 1440, light and dark, for the Slider (two witnesses), the
Collapsible, the menu, the chart entrances and the card swap; the mount reads at 390 and
1440; reduced motion at 390 light for the menu, the chart and the swap. 29 verdicts a run.

| run | O-181 | O-196 | O-189 | O-171 | O-168 | O-173 | O-180 | exit |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| branch · Chromium headless shell | 4/4 | 4/4 | 4/4 | 5/5 | 5/5 | 5/5 | 2/2 | 0 |
| branch · WebKit 2287 | 4/4 | 4/4 | 4/4 | 5/5 | 5/5 | 5/5 | 2/2 | 0 |
| v11.0.0 · Chromium headless shell | 0/4 | 0/4 | 0/4 | 1/5 | 1/5 | 1/5 | 0/2 | 1 |
| v11.0.0 · WebKit 2287 | 0/4 | 0/4 | 0/4 | 1/5 | 1/5 | 1/5 | 0/2 | 1 |

The one 11.0.0 pass in each of O-171, O-168 and O-173 is the reduced-motion cell, which
asserts the absence of motion (no menu geometry, no chart animation, zero view-transition
animations); 11.0.0 already cut motion there. Every motion cell is RED on 11.0.0.

## O-181 · the Slider sends one update per frame

**What changed.** reka's root is no longer bound to the prop. Slider owns `own`, the value
it paints, and drives reka with it. reka's `update:modelValue` lands in `own` at once (the
thumb follows the pointer that frame) and, during a pointer drag, goes to the consumer
through `useFrameCoalesce`: at most one emit per animation frame, the latest value. The
pending value is delivered before `valueCommit` (reka's commit fires on its own pointerup,
which runs before Slider's bubble-phase release listener). A key step is not a drag and
emits synchronously. The helper is `src/composables/dom/useFrameCoalesce.ts`, one helper
for every control that streams a drag value: the Slider and the EasingPicker's handle drag
(whose model writes now coalesce the same way and flush on release). It is not exported;
it has its two sites.

**Files.** `src/components/slider/Slider.vue`, `src/components/easing/EasingPicker.vue`,
`src/composables/dom/useFrameCoalesce.ts` (new); test `tests/components/slider.stream.test.ts`
(new: burst, flush order, key steps, hand and model).

**Witness.** A real press on the track (pointer 1, captured by reka), then 120 synthetic
`pointermove`s for that pointer on the captured element at 240 Hz; emits bucketed by
frame. Green: ≤ 1 emit per frame, the commit equals the last emitted value and the thumb,
one ArrowRight emits inside its own keydown dispatch.

| reading (390 light) | v11.0.0 Chromium | v11.0.0 WebKit | branch Chromium | branch WebKit |
| --- | --- | --- | --- | --- |
| emits for 120 moves | 118 | 118 | 58 | 93 |
| most emits in one frame | 3 (35 at 1440 dark) | 3 | 1 | 1 |
| commit = last value | yes | yes | yes | yes |
| key step synchronous | yes | yes | yes | yes |

## O-196 · a clock-driven scrubber the hand always wins

**What changed.** Same root as O-181: from the press (capture-phase `pointerdown`) to the
release (`pointerup`, `pointercancel`, `lostpointercapture`, bubble phase) a `modelValue`
written by the consumer does not reach `own`, so the thumb stays under the pointer. On
release Slider flushes, emits `release`, and on the next tick follows the model again
from what the consumer then holds. **The grab signal is two events, `grab` and
`release(value)`, not `v-model:scrubbing`**: the grab is the hand's state and flows only
out; a v-model would accept a write that cannot hold or release a pointer, and the
consumer's job (pause the clock, resume it from a value) is two calls, which `release`
hands the value for.

**Witness.** A 60 Hz clock in the page writes `modelValue` from its own time
(`clockPos += 0.4` each frame), the pattern of a playback scrubber; the harness pauses it
on `grab` and resumes it from the released value on `release`. A real 1 s drag (60
moves), sampled every frame: the thumb's painted position (`aria-valuenow` → px) against
the pointer's px, from the first move that leaves the press point (reka seats the press
centred on the thumb, then drags at the grab offset, a constant 2.88 px). Green: every
sampled frame within 1 px of that constant offset, and the first frame after release
within one clock step of the released value.

| reading | v11.0.0 Chromium | v11.0.0 WebKit | branch Chromium | branch WebKit |
| --- | --- | --- | --- | --- |
| frames sampled (390 light) | 176 | 129 | 179 | 110 |
| worst thumb-to-pointer deviation | 305 px (380 at 1440) | 338 px | 0.02 px | 0.02 px |
| grab events | 0 | 0 | 1 | 1 |
| first frame after release | clock's own time | clock's own time | released value + 0.4 | released value + 0.4 |

v11.0.0 fights: the clock drags the thumb away between moves. The branch holds.

## O-189 (with O-171's height clause) · Collapsible animates its height

**What changed.** `CollapsibleContent` no longer renders reka's content (which measured
the region with a forced `getBoundingClientRect` on every toggle and animated
`block-size` keyframes from `--reka-collapsible-content-height`, with a fade). It renders
its own region on reka's root context: a grid whose one row is `0fr` closed and `1fr`
open, transitioned on `--spring-present`; the content sits in one clip
(`.disclosure-content-clip`, `min-block-size: 0; overflow: hidden`), laid out at its final
size. A transition starts from the current value, so a press mid-flight turns where it
stands. It opens with `@starting-style` from `0fr`; a region that loads open carries no
`data-state` until its first frame, so nothing animates on load. The region mounts as it
opens and unmounts when its close has finished (`transitionend` on the row; under reduced
motion at once), unless `forceMount`; while closing it is `inert`. **`--collapsible-gap`**
is the trigger-to-content space, a block inside the clip, so it opens and closes with the
height (a `gap` on the root appeared in one frame when the region mounted). The demo
story moves its roots from `gap-3` to `--collapsible-gap`. Accordion keeps reka's content
and its measured keyframes (open gap below).

**Files.** `src/components/collapsible/CollapsibleContent.vue`,
`src/components/_shared/disclosure/disclosure.css`, `demo/stories/containers/collapsible.vue`;
tests `tests/components/collapsible.contract.test.ts` (one assertion follows the clip; a
new engine case: mounted through the close, inert, unmounted at `transitionend`).

**Witness.** Per frame from the press: the root's height, `extra` = root − trigger −
content box (the 12 px the consumer asked for, and where it lives), the content's
opacity. Then a reversal: open, close four frames in. Green: ≥ 6 moving frames each way,
`extra` 0 at every frame, opacity 1 at every frame, and the frame after the reversal lies
between where it was and closed.

| reading (390 light) | v11.0.0 Chromium | v11.0.0 WebKit | branch Chromium | branch WebKit |
| --- | --- | --- | --- | --- |
| moving frames open / close | 23 / 24 | 20 / 20 | 23 / 25 | 21 / 20 |
| `extra` worst, open / close | 12 / 12 px (snaps in and out) | 12 / 12 | 0 / 0 | 0 / 0 |
| lowest opacity while opening | 0.083 | 0.054 | 1 | 1 |
| reversal: height before → after (closed 24) | 66.5 → 153 (jumps to full) | 75.2 → 151.8 | 56.5 → 49.6 | 68.5 → 60.6 |

Paint mid-open: `out/png/{green,red}-*-o189-open-*.png`.

## O-171 R-1 · the menu plate grows from its trigger

**What changed.** `data-reveal="menu"` (Select, DropdownMenu and its submenu, and every
menu that stamps the role) no longer blooms. Its bloom channels are neutral (scale 1,
squish 1, blur 0, slide 0) and it opens on `glass-menu-grow`: a `clip-path: inset()`
that uncovers the laid-out plate from the edge facing its anchor, from a strip the
anchor's own height (`--reka-popper-anchor-height`) to the whole plate, on
`--spring-bloom` over `--spring-bloom-duration`. The plate on the anchor's top side
(`data-side="top"`, which includes the phone sheet anchored on the viewport foot, height
0) grows upward. The clip's resting edges sit `--menu-grow-bleed` (2rem) outside the
plate, so the plate's shadow is inside the clip when the animation ends and lets go.
Opacity holds at 1 from the first frame (`@starting-style` overrides the shared fade). The
close, `glass-menu-recede`, runs the clip back into the strip with opacity held to 90%
and cut in the last tenth (the route grammar's cut). **Clip, not scale**: the rows stay
at their final size and sharp, which a plate scale with counter-held rows only
approximates. Reduced motion: no geometry; the menu fades in and out on the reveal's
short reduced clock.

**Files.** `src/styles/glass/reveal.css`, `src/styles/animations.css`.

**Witness.** Screenshot before opening; open; pause every document-timeline animation at
t = 0; screenshot; finish; screenshot at rest. Rows that differ from the page in the
plate's own columns are the painted plate. Opacity sampled every frame from the click.
Green: frame one paints from the plate's edge facing the anchor a strip the anchor's
height (±2 px; none for the sheet's 0-height anchor), the rest paints the plate, opacity
1 on every frame, the growth ends within `--spring-bloom-duration`.

| reading | v11.0.0 Chromium | v11.0.0 WebKit | branch Chromium | branch WebKit |
| --- | --- | --- | --- | --- |
| 1440 dark: frame-one paint (plate top 116 / 124, anchor 40) | none (opacity 0) | none | rows 123–163, 41 px | rows 124–163, 40 px |
| 390 light (sheet, anchor 0): frame-one paint | 232 rows, opacity 0 → fade | none | none (0-height strip) | none |
| lowest opacity while opening | 0 | 0 | 1 | 1 |
| animations | opacity, scale, filter, translate | same | `glass-menu-grow(-up)`, 370 ms = bloom | same |

Paint: `out/png/green-*-o171-{first,rest}-*.png` (frame one is the trigger-height strip
with the first row in it, at full opacity).

## O-168 · the data-viz entrance register

**What changed.** One register over the existing rows, no new spring.
`src/composables/motion/reveal/entranceRegister.ts` names it (`VIZ_ENTRANCE`: mark →
`present`, bar → `panel`, ripple → `bloom`) and `src/styles/glass/viz-enter.css` is its
CSS twin: `.viz-mark` scales a mark up from its own centre (`transform-box: fill-box`,
no fade); `.viz-bar` uncovers a bar from its baseline with a clip (`data-viz-from` names
another edge), so `panel`'s intrinsic rebound runs the clip past the bar's own box and
the bar never draws past its value; `.viz-ripple` opens a circle clip from
`--viz-ripple-at`. The stagger is one spacing: `min(--motion-stagger-default,
--spring-panel-duration / --viz-n)`, by `--i`. `useStagger`'s default `delayMs` becomes
`cascadeStaggerMs(items)`, the same cap in JS (an explicit `delayMs` is unchanged). The
module ships on the engine-free `/motion-core` surface, so it solves the panel settle from
the closed-form step response; a test holds it to the engine's settle. The register is
written up in `docs/canon/motion-system.md`; the Motion Lab story gains a "Chart
entrances" section. Reduced motion: no animation.

**Files.** `entranceRegister.ts` (new), `viz-enter.css` (new), `src/styles/glass.css`
(import), `src/composables/motion/reveal/useStagger.ts`,
`src/composables/motion/core/index.ts`, `docs/canon/motion-system.md`,
`demo/stories/motion/curve-gallery.vue`; test
`tests/composables/motion/entrance-register.test.ts` (new).

**Witness.** A 12-bar chart with a point on each bar and a ripple; `getAnimations()` per
mark. Green: 12 `gl-viz-grow-up`, 12 `gl-viz-land`, one `gl-viz-ripple`; spacing
`min(80, panel / 12)`; the last bar starts within one panel duration.

| reading | v11.0.0 (both engines) | branch Chromium | branch WebKit |
| --- | --- | --- | --- |
| bar / mark / ripple animations | 0 / 0 / 0 | 12 / 12 / 1 | 12 / 12 / 1 |
| spacing; last bar starts at (panel 450 ms) | n/a | 37.5 ms; 412.5 ms | 37.5 ms; 412.5 ms |
| reduced motion | 0 | 0 | 0 |

Paint mid-cascade (all animations paused at 160 ms) and at rest:
`out/png/green-*-o168-{mid,rest}-*.png`.

## O-180 · no style reads on the mount path

**What changed.**
1. **The press cap.** `useLiquidPress`'s `maxStretch` getter no longer calls
   `effectiveCap` (a `getComputedStyle` read, re-run each frame of a press). The element's
   `--motion-weight` is read once, as the press begins (`activate`), through
   `motionWeightOf`, which returns the values `writeVelocityWeight` wrote when it wrote
   them; the velocity term is the press's own `flexVel`. The formula is `capAtWeight`, and
   `effectiveCap` composes the two. Both are new, additive exports of `/motion-core`.
2. **The tempo.** `motionTempo()`'s `:root` value is one shared value, read once and
   marked stale only when its source can have changed: an attribute on `<html>`, a
   stylesheet added to or removed from `<head>` (a `MutationObserver`, whose pending
   records are taken synchronously so a change earlier in the same task is seen), or the
   reduced-motion and colour-scheme queries. 11.0.0 read it once per task.
3. **The luma sampler.** A surface's first sample, its resize re-sample and its
   reduced-motion sample go to a frame batch: every surface asking in one frame is
   measured (rect, `elementsFromPoint`, computed style, canvas), then all are written, so
   reads never interleave with writes. `sampleNow()` (public) still samples in the task.

The dock layer measure (the fourth site) is W-0.8's, not this lane's.

**Files.** `src/composables/motion/spring/useLiquidPress.ts`,
`src/composables/motion/core/{writeVelocityWeight.ts,motionTempo.ts}`,
`src/composables/glass/useGlassBackdropLuminance.ts`; tests
`tests/composables/motion/press.test.ts` (the tempo case rewritten: read only on a source
change; the cap read once per press), `useGlassBackdropLuminance.live.test.ts` (the mount
samples on the next frame).

**Witness.** A scene of 40 `Button`s (each a `useLiquidPress`) and 4 sampled glass
surfaces is swapped for a fresh one; `getComputedStyle`, `getBoundingClientRect` and
`elementsFromPoint` are counted from the state change to the end of Vue's flush
(`nextTick`). Three frames later the four surfaces must carry a sample state. Then a real
press on one Button: computed-style reads over the 12 frames after the press began.

| reading (390) | v11.0.0 (both engines) | branch Chromium | branch WebKit |
| --- | --- | --- | --- |
| mount task: computed style / rects / `elementsFromPoint` | 14 / 8 / 4 | 0 / 0 / 0 | 0 / 0 / 0 |
| surfaces sampled by the third frame | 4 | 4 | 4 |
| computed-style reads in 12 press frames | 12 | 0 | 0 |

keyframes' own release gates (scene swap ≤ 250 ms commit, LoAF ≤ 50 ms at 1440 CPU 4x)
are theirs to run at the release.

## O-173 G1 · `lateral` becomes an opaque card swap

**What changed.** In `src/styles/view-transition.css`: the lateral root pair loses
`gl-vt-route-out/-in` and the world push: the old root is not shown (`opacity: 0`, no
animation) and the new root is drawn as it is (`mix-blend-mode: normal`), so the page does
not fade. The window pair loses its cross-fade: both halves stay opaque
(`mix-blend-mode: normal`), new above old; the old card recedes in place
(`gl-route-card-recede`: scale to `--route-card-recede` 0.94, a `--route-card-sink` 1.5%
block translate, `brightness` to `--route-card-dim` 0.92) and the new card enters from
`calc(var(--route-direction) * var(--route-card-travel))` (`min(6rem, 24vw)`), scale
`--route-card-enter-scale` 0.98 → 1; direction 0 is scale and recede only. One spring,
`--route-lateral-spring` (`dock`), drives the group and both halves; the group still
animates the rect when the sizes differ. An unpartnered card fades on
`--route-inhale-clock`, as does `gl-route-label`. Reduced motion: zero animations (the
existing rule). The route table's `lateral` row has no world now (`world: null`), its
comment and the registers mirror say so, and the unused `--route-slide`,
`--route-world-slide` and their four keyframes are deleted (internal; no consumer
reference in the published roster).

**Files.** `src/styles/view-transition.css`, `src/styles/tokens/motion-registers.css`,
`src/composables/motion/route/{routeGrammar.ts,useRouteTransition.ts}`; test
`tests/styles/route-motion.test.ts` (lateral leaves the root-pair and world arms; a new
card-swap block: no opacity keyframe on root or window, recede and signed enter, one
spring for the pair and the group).

**Witness.** A named `gl-route-window` card swapped by `startViewTransition({ types:
["lateral"] })` with `--route-direction` 1, then −1; at `ready`, every view-transition
animation paused at 0 and read.

| reading | v11.0.0 (both engines) | branch Chromium | branch WebKit |
| --- | --- | --- | --- |
| opacity keyframes on the root pair / window pair | 4 / 4 | 0 / 0 | 0 / 0 |
| new card's start translate sign, forward / back | +1 / −1 | +1 / −1 | +1 / −1 |
| group animations | 1 | 1 | 1 |
| reduced motion: animations | 0 | 0 | 0 |

Paint mid-swap (90 ms): `out/png/green-*-o173-mid-*.png`, the new card opaque over the
receding one.

## Gates

`lane-L2/gates.sh` runs the build-side gates as ONE guarded heavy run on the committed
tree (`8d3dc8d2d`); `lane-L2/e2e.sh` runs the touched e2e specs as guarded browser runs.
Logs and JSON in `lane-L2/gates/`, exit codes in `lane-L2/gates/chain.log`.

Before the commit each changed suite ran green under `guarded --light`, and
`npm run typecheck` was clean (exit 0).

**The build-side chain (build, typecheck, demo:dist:build, vitest, verify:package with
the bundle ratchet) is queued.** At 16:59 it stood second in the guard's heavy FIFO
(13 waiters), behind slots held by four long-lived preview servers (timeouts 6 to 12 h)
and one 90-minute run. The guard has not refused it; it waits. Its readings land in
`gates/chain.log` and in a follow-up records commit.

**e2e specs these items touch** (`a11y-slider`, `Select.bound`, `easing-primitive`,
`dock-with-slider-live`), each engine, each tree, compared by title set:

| run | passed | failed | exit |
| --- | --- | --- | --- |
| branch · Chromium headless shell | 9 | 7 | 1 |
| v11.0.0 · Chromium headless shell | 9 | 7 | 1 |
| branch · WebKit 2287 | 9 | 7 | 1 |
| v11.0.0 · WebKit 2287 | 9 | 7 | 1 |

The seven failing titles are identical on both trees in both engines, so none is
branch-only: the a11y-slider aurora route's nameless-thumb census, the four
dock-with-slider live drag captures, and the easing curve's violet stroke (P3). They are
11.0.0's rot. `Select.bound` (the menu plate's collision bound) passes on both.

## CHANGELOG

A "Motion and forms" section in the 11.1.0 entry: the Slider's one update per frame, the
hand over a clock (`grab`/`release`), the Collapsible's height and `--collapsible-gap`
(with the note that the content now sits in one wrapper), menus growing from their
trigger, the chart entrance classes, `useStagger`'s spacing, lighter mounting, and the
`lateral` card swap.

## Open gaps

- **Accordion** keeps reka's content and its measured `block-size` keyframes. Its content
  is reka's `AccordionContent`, which wraps reka's own Collapsible content, so moving it
  onto the grid-row engine means rendering Accordion's region the way Collapsible's now
  is; the engine is shared CSS and ready for it.
- **The menu's reduced-motion clock** is the reveal's existing reduced fade
  (`--duration-fast`, 200 ms), not the 120 ms the addendum names: no 120 ms overlay rung
  exists, and minting one for one site fails the two-consumer bar.
- **O-173 G1's clocks**: the lateral spring stays `dock` (ζ 0.88, whose 0.3% peak sits
  under its 2% band, so it already lands without a visible rebound); a duration
  proportional to the travel is not built. There is no `gl-route-sheet` group in the
  library to put on the same spring. The frame-time p95 gate at 1440@2 on ANGLE Metal is
  not run: the witness uses the headless shell, which has no Metal path.
- **The card swap clips the arriving card at the window group's edge** (the group's
  existing `overflow: clip`), so it slides into the window's rect rather than over the
  page. That is the grammar's reveal-by-clip rule; whether a lateral swap should lift it
  is a design call for the close.
- **O-180**: the first spring a page ever constructs still reads the tempo once (that read
  primes the shared value); nothing reads it again until its source changes. keyframes'
  own load gates are theirs to run.
- **O-168**: a JS consumer that drives a cascade without `useStagger` reads
  `cascadeStaggerMs` itself; the CSS classes need `--viz-n` on the series to cap.
