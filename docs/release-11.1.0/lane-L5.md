# glass-ui 11.1.0 · lane L5 (HandMark)

The build seat for lane L5 on `release/11.1.0`, run by claude-opus-5-5. Before building, it read
`lane-L1.md` through `lane-L4.md`, both orchestrator notes, the INBOUND rows O-183 and O-190, and
W-B.6 in full, including its O-183 and O-190 addenda.

**Complete.** On 2026-11-09 at 22:28:19, `guarded` refused the v11.0.0 witness runs at kernel zone
8.19M (exit 75; the logs are kept in `lane-L5/out/refused-2026-11-09/`), and the gates and e2e
runs did not start. After the reboot, the resume on 2026-11-10 ran everything that was refused,
with no rebuild: the RED half of `chain.sh` (`witness.sh .cache/l5-v1100 7992 red red`), then
`gates.sh` on the committed tree at `a4ff25387`, then `e2e.sh`. `guarded` admitted every run. The
WebKit runs waited for the machine-wide `webkit` lock and were not refused.

**Runs:**

| run | result | exit |
| --- | --- | --- |
| `vue-tsc --noEmit -p tsconfig.src.json` (guarded `--light`, build run) | clean | 0 |
| `vitest run tests/components/custom/handmark tests/components/handmark` (guarded `--light`, build run) | 3 files, 67 passed | 0 |
| branch witness · Chromium headless shell (2026-11-09) | 60/60 | 0 |
| branch witness · WebKit 2287 (`--exclusive webkit`, 2026-11-09) | 60/60 | 0 |
| v11.0.0 witness · Chromium headless shell (2026-11-10 13:05) | 26/60 (RED) | 1 |
| v11.0.0 witness · WebKit 2287 (`--exclusive webkit`, 13:27) | 26/60 (RED) | 1 |
| `gates.sh` · `npm run build` | built | 0 |
| `gates.sh` · `npm run typecheck` | clean | 0 |
| `gates.sh` · `npm run demo:dist:build` | built | 0 |
| `gates.sh` · `vitest run --maxWorkers=2` | 275 files; 2545 passed, 10 expected fail, 1 skipped | 0 |
| `gates.sh` · `npm run verify:package` (first pass) | ratchet increase forbidden: 3008867 > 3007136 | 1 |
| `gates.sh` · ratchet rebind, then `verify:package` again | `terminal: CLEAN` | 0 |
| `e2e.sh` · `handmark.spec.ts` · branch · Chromium headless shell | 10 passed | 0 |
| `e2e.sh` · `handmark.spec.ts` · branch · WebKit 2287 | 10 passed | 0 |
| `e2e.sh` · `handmark.spec.ts` · v11.0.0 · Chromium headless shell | 10 passed | 0 |
| `e2e.sh` · `handmark.spec.ts` · v11.0.0 · WebKit 2287 | 10 passed | 0 |

The 26 checks that v11.0.0 passes are the hold lines (nib scale, no ornament, marks at rest drawn,
the final state under reduced motion) and the cells that the old defaults already met (the wrap, and
the light focal ink, since `currentColor` equals `--primary` in light). Every claim the items make
fails on v11.0.0 and passes on the branch, in both engines. The two engines agree cell for cell.
Readings: `lane-L5/out/{green,red}-{chromium,webkit}.json`; logs and exit codes:
`lane-L5/out/chain.log` and `lane-L5/gates/chain.log`.

Commit (read from `git log`): `325d022f4` holds the code, the updated unit test and the CHANGELOG
section. The records commit carries this file and `lane-L5/`.

**Harness.** `lane-L5/harness/` is a vite-served page that imports HandMark by relative source path,
so the same page runs on either tree. On v11.0.0, `trigger` and `retrigger` are not props, so they
fall through as attributes and the mark behaves as it did. The page has two scenes. `heading`: a hero
`h1` at 56 px (capped at 340 px wide, so the phrase wraps) with an underline, a 24 px section `h2`
with a highlight, and a 16 px body underline. None of the marks has `color`. `fold`: a 24 px
`h2` with an underline mark and `trigger="in-view"`, mounted after a 200vh spacer, and optionally
`retrigger`. `probe.mjs` launches one browser per run, opens a new context per cell and closes both
in `finally`. Each cell is 390 and 1440, light and dark. Readings are in
`out/green-{chromium,webkit}.json`, and cropped paint is in `out/png/`. The first Chromium shakedown
run is kept in `out/trial/`.

## O-183 · HandMark as the heading mark

**What changed** (`src/components/handmark/HandMark.vue`):
1. **Focal ink.** `color` no longer defaults to `currentColor`. With no `color`, a stroke fills
   `var(--primary)`, and the highlight band is
   `light-dark(oklch(from var(--primary) 0.86 0.16 var(--hm-h, h)), oklch(from var(--primary) 0.44 0.16 var(--hm-h, h)))`.
   That is the old band law, with the hue read from the focal ink. A numeric `color` still sets
   `--hm-h` (inline, only when given). The host declares no fixed hue, so the old `--hm-h: 78` is
   gone.
2. **The preset clock.** The draw is now CSS, not WAAPI on `markDuration`/`minJerk`. Guides carry
   `pathLength="1"`, `stroke-dasharray: 1`, and `hm-draw` (dash offset 1 → 0) on
   `var(--spring-present-duration) var(--spring-present)`. Line `i` is delayed by
   `--hm-lead + i × --spring-present-duration`, where `--hm-lead` is the frame-rank lead
   (`line × 4 × FRAME_MS`), unchanged. `present` is ζ = 1, so the stroke never overshoots its end
   (the restraint precept). Because the draw lives in CSS, a re-measure (fonts.ready, resize) only
   rewrites `d` and no longer restarts the draw. The `getTotalLength` read is gone. Re-ink keeps its
   behaviour (a 4 % swell and the last third pulled shut). It now runs on the `press` row:
   the easing is `--spring-press` and the duration is `--spring-press-settle` × `motionTempo`. Its
   220 ms literals and `setTimeout` are gone (it restores on `finished`), its fill is `none` so it
   never masks a later redraw, and it is skipped while a mark waits or under reduced motion.
   `markDuration` and `minJerk` stay exported from `./handmark`: they are public, and removing them
   would break a consumer in a minor. The component no longer calls them.
3. **In view.** The new props are `trigger: "mount" | "in-view"` (default `"mount"`, unchanged
   behaviour) and `retrigger`. The draw state is `data-ink="wait" | "draw" | "rest"` on the host
   (`rest` when `draw` is false). An in-view mark starts in `wait` (dash offset 1, settle animation
   off). One `IntersectionObserver` (thresholds 0 and 0.5) moves it to `draw` at ratio ≥ 0.5, and
   without `retrigger` it then disconnects. With `retrigger`, a mark wholly out goes back to `wait`,
   which restarts the CSS animation on the next entry. `play()` moves a waiting mark to `draw`, or
   replays the running animations.
   **Why not `useScrollTrigger`.** The addendum names "the library's existing scroll-trigger
   composable". `useScrollTrigger` crosses pixel offsets on one named scroller. A mark lives in any
   scroller (a document, an app pane, a dialog), and "in view" is viewport intersection, which needs
   no scroller. The library's in-view primitive is `useIntersectionPause`, which HandMark already
   composes for ink-lag, but its `isIntersecting` defaults to `true` until observed. A mark mounted
   off-screen would therefore read as visible before the first report, and an on-screen mark's first
   report changes nothing. So the trigger reads the observer's own first entry.
4. **Print.** `@media (prefers-reduced-motion: reduce), print` pins every guide at dash offset 0
   with no animation, including a waiting in-view mark. Print also drops the ink-lag transform and
   the settle animation.
5. **Scale.** No change: the nib already follows the font size.

No glow, sheen, shadow, gradient or filter was added (the restraint precept). The witness checks it.

**Files.** `src/components/handmark/HandMark.vue`; `tests/components/custom/handmark/g-hm-layer.test.ts`
(the band-law test now asserts the focal-hue law and that no fixed `--hm-h` digit is declared).

**Witness readings (branch, both engines, every cell 390 and 1440 × light and dark: 4/4 each):**

| claim | Chromium headless shell | WebKit 2287 |
| --- | --- | --- |
| wrapped hero phrase: lines = frames ≥ 2 | 4/4 | 4/4 |
| stroke fill = computed `--primary` (light `rgb(28, 25, 23)`, dark `oklch(0.739 0.134 318.1)`) | 4/4 | 4/4 |
| band hue = focal hue (light band `oklch(0.86 0.16 55.98)` vs focal H 56.04, gap 0.06°; dark `oklch(0.44 0.16 318.1)`, gap 0) | 4/4 | 4/4 |
| each guide's draw duration = `--spring-present-settle` × tempo = 200 ms, easing = computed `--spring-present` | 4/4 (hero line delays 0, 200 ms) | 4/4 |
| reduced motion: dash offset 0 and 0 running animations at frame 0 (heading, fold) | 4/4, 4/4 | 4/4, 4/4 |
| print: the same at frame 0 (heading, and the fold's waiting in-view mark) | 4/4, 4/4 | 4/4, 4/4 |
| retrigger: draws (19–23 mid frames), wholly out reads `wait` at offset 1, draws again | 4/4 | 4/4 |
| hold lines: nib ratio follows the font size; no filter, box-shadow, text-shadow, gradient or filter element; marks rest drawn | 4/4 each | 4/4 each |

Paint: `out/png/green-*-o183-{hero,section}-*.png` (the marks at rest),
`green-*-o183-{reduced-motion,print}-frame0-*.png` (fully drawn at frame 0). In light the default
highlight is now a warm peach (the hue of the light `--primary`). In dark it is the violet of the
dark `--primary`.

**RED readings on v11.0.0 (2026-11-10; Chromium exit 1, WebKit exit 1; the same in both engines):**

| claim | Chromium | WebKit 2287 | what v11.0.0 reads |
| --- | --- | --- | --- |
| wrapped hero phrase: lines = frames ≥ 2 | 4/4 | 4/4 | holds (not part of the change) |
| stroke fill = `--primary` | 2/4 | 2/4 | light holds (`currentColor` is `rgb(28, 25, 23)`, the light `--primary`); dark fails: the fill is `rgb(233, 230, 226)` (the text colour), not `oklch(0.739 0.134 318.1)` |
| band hue = focal hue | 0/4 | 0/4 | band `oklch(0.86 0.16 78)` against focal H 56.04, gap 21.96° |
| draw on the present clock | 0/4 | 0/4 | WAAPI durations by length (Chromium 310, 248, 250, 179 ms; WebKit 325, 256, 257, 179 ms) against 200 ms; easing not `--spring-present` |
| print final at frame 0 (heading / fold) | 0/4, 0/4 | 0/4, 0/4 | dash fraction about 1 (undrawn), 8 and 2 animations running |
| reduced-motion final at frame 0 (heading / fold) | 4/4, 4/4 | 4/4, 4/4 | holds (a hold line) |
| retrigger redraws on each entry | 0/4 | 0/4 | fraction 0 on first entry, after leaving, and on re-entry: drawn throughout, nothing redraws |
| nib follows font size; no ornament; marks rest drawn (holds) | 4/4 each | 4/4 each | holds |

The predictions from source all held.

## O-190 · off-screen marks wait undrawn and draw in when scrolled to

**What changed.** O-183's `trigger="in-view"` is the cure (item 3 above): a mark first observed
off-screen holds at `wait` until it intersects, then draws once.

**Witness readings (branch; 4/4 in each engine):**

| claim | Chromium | WebKit 2287 |
| --- | --- | --- |
| 1.5 s after mount, the mark 1705 px down (viewport 800) reads dash fraction 1, `data-ink="wait"` | 4/4 | 4/4 |
| scrolled to centre: per-rAF fractions start at 1, show ≥ 3 mid frames (Chromium 22–23, WebKit 18), end at 0 | 4/4 | 4/4 |
| paint strip: the draw paused on entry and stepped 0/25/50/75/100 %, ink pixels below the baseline (Chromium 0, 77, 140, 161, 166; WebKit 0, 87, 159, 188, 245) | 4/4 | 4/4 |

Paint: `out/png/green-*-o190-strip-*-{0,25,50,75,100}.png`.

**RED readings on v11.0.0 (0/4 on every claim, in each engine; exit 1):**

| claim | Chromium | WebKit 2287 | what v11.0.0 reads |
| --- | --- | --- | --- |
| off-screen mark waits undrawn | 0/4 | 0/4 | the mark 1704–1705 px down already reads dash fraction 0 (drawn) at 1.5 s, with no `data-ink` |
| draws in on entry (≥ 3 mid frames) | 0/4 | 0/4 | 0 draw frames (fraction 0 first and last) |
| paint: undrawn at entry, then drawn in | 0/4 | 0/4 | no animation running on entry (2 already finished and paused), so there is no strip |

## Gates

All ran on 2026-11-10, each inside one `guarded` run, on the committed tree at `a4ff25387`
(`lane-L5/gates/chain.log`, a log per step): build 0, typecheck 0, demo:dist:build 0, vitest 0
(275 files; 2545 passed, 10 expected fail, 1 skipped), verify:package 0 after the rebind.

**Ratchet rebind: `.bundle-ratchet` 3007136 → 3008867 (+1,731 B).** The first `verify:package`
exited 1 on `bundle ratchet increase forbidden: 3008867 > 3007136`, and the second, on the new
datum, reads `terminal: CLEAN`. The datum 3007136 is lane L4's committed-tree measure, taken before
this lane's code commit. The +1,731 content bytes are HandMark's: the `IntersectionObserver`
trigger and its `data-ink` states, the CSS draw keyframes with their per-line delay rules, and the
reduced-motion and print rules, net of the removed WAAPI clock and `getTotalLength` read.
`git diff --stat d4b06c675 HEAD -- src package.json` names one file, `HandMark.vue`. The rebind is
deliberate, and this is its record.

**e2e (`handmark.spec.ts`, `lane-L5/gates/e2e-*.{log,json}`):** 10 passed in each of the four runs
(branch and v11.0.0, Chromium headless shell and WebKit 2287), exit 0 each. The spec guards the
hand voice's existing paint (the band under the letterforms, the ring's room, one path per line
rect, the mark whole at rest). It passes on both trees, so the branch keeps every existing paint
claim, and the RED/GREEN split lives in the witness above. The spec's captures were moved to
`lane-L5/gates/png/`, and the tracked `docs/tranches/BK/audit/visual` files were restored and not
changed.

## CHANGELOG

The 11.1.0 entry gains a "HandMark" section with four bullets: focal-colour marks (and
`color="78"` for the old band), `trigger="in-view"` and `retrigger` with an example, the draw on
the library's spring and tempo (and no restart on re-measure), and the finished mark under reduced
motion and print.

## Open gaps

- **The dock items O-194, O-197, O-198 and O-199 move to lane L6** (the resume's computed task),
  and are not built here. They share one surface (the collapsed face as the persistent region, the
  trailing gap that the collapsed `:has(.dock-layer--summary:empty)` rules also own, PRM over the
  dock's springs and transitions, and a capsule radius that must compute to half the cross extent
  in px in every posture and morph frame), so one dock seat should design them together.
- **O-206 (a compositor-run draw and a `drawn` event) moves to lane L7** and is not built here.
  An orchestrator note had added it to this lane during the build run (`ce2b7ed12`). The new CSS draw still animates
  `stroke-dashoffset`, which is not a compositor property in either engine, so a main-thread task
  can still stall it. The `drawn` event does not exist yet. The CSS draw is the right base for it
  (one clock, one `animationend` per mark to emit `drawn` on), but the clip-path or mask-scale reveal
  and its throttled-CPU witness are owed.
- **`markDuration` / `minJerk`** stay exported but unused by the component. Removing them is a
  major.
- **The default highlight hue changed** (78 → the focal ink's hue). This is the addendum's ask,
  and it is a visible change for a consumer that passed no `color`. The CHANGELOG says how to keep
  the old band.
- **W-K.7 (the second draw on `fonts.ready`)** is cured as a side effect: the re-measure no longer
  restarts the CSS draw. That row is not witnessed here.
- **Real Safari** is not measured; WebKit is Playwright's build 2287.
