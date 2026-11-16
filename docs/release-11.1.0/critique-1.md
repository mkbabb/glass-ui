# glass-ui 11.1.0 · critique 1

A fresh adversarial critic (round 1), run by claude-opus-5-5, on `release/11.1.0` at
`3ce352870` (source identical to `d4d30bc71`: `git diff --stat d4d30bc71 HEAD -- src
package.json` is empty). It built nothing on the branch. It read every commit in
`master..release/11.1.0` (33) and every file in `docs/release-11.1.0/` (the seven lane
records and the three orchestrator notes).

Every browser run went through `~/.claude/guard/guarded`; every WebKit run held
`--exclusive webkit`. The guard refused nothing. The WebKit runs waited for the machine-wide
WebKit lock (held by the design loops in the main checkout); see "What ran" for which WebKit
cells landed.

Records, all under `critic-1/`:

- `rerun/lane-L{1..7}/`: each lane's own witness (probe, harness path, runner) copied
  unchanged, re-run by `chain2.sh` on the branch and on a fresh `git archive v11.0.0`
  (`.cache/c1-v1100`, tranche records excluded, `HandMark.vue` checked byte-identical to the
  tag); readings in each `out/`.
- `harness/`, `probe.mjs`, `runprobe.sh`: the critic's own witness for the items the
  orchestrator notes handed to critics (O-212, O-214, G13, G14, O-213, K12), a consumer
  check on the Collapsible, and a HandMark in-view check on the HEAD tree. Readings in
  `out/{green,red}-{chromium,webkit}.json`, paint in `out/png/`.
- `o211/`: the bundle measure. `vitest/`: the flake runs. `gates/`: the committed-tree gates.
- `chain.log`: every run and its exit code, in order.

## What ran

| run | engine | branch | v11.0.0 | notes |
| --- | --- | --- | --- | --- |
| lane L1 witness (O-164, O-188, O-169) | Chromium | 27/27, exit 0 | 0/27, exit 1 | matches `lane-L1.md` |
| lane L2 witness (O-181 … O-180) | Chromium | not read: the first try lost its port to another server (exit 3); the retry queued behind 14 browser waiters | 3/29 (the three reduced-motion hold lines), exit 1 | the RED half matches `lane-L2.md` |
| lane L3 witness (O-158, O-184, O-178, O-179) | Chromium | 18/18, exit 0 | 6/18 (hold lines), exit 1 | matches `lane-L3.md` |
| lane L4 witness (O-175, O-185, O-204 (3), O-173 G2, O-163) | Chromium | 18 + 10 pass, exit 0 | 4 + 2 pass, exit 1 | matches `lane-L4.md` |
| lane L5 witness (O-183, O-190) | Chromium | **crashes** (`getComputedStyle` on a missing `.hm-guide`), exit 1 | 26/60, exit 1 | see finding 10 |
| lane L6 witness (O-194, O-197, O-198, O-199) | Chromium | 161/161, exit 0 | 31/161, exit 1 | matches `lane-L6.md` |
| lane L7 witness (O-206) | Chromium | 80/80, exit 0 | 4/64, exit 1 | at-rest look: 16/16 Chromium crops hold |
| critic probe | Chromium | see findings | see findings (the HEAD HandMark cell was not taken on v11.0.0) | |
| critic probe | WebKit 2287 | see findings | **not taken** | waited 40+ min on the `webkit` lock |
| every lane witness | WebKit 2287 | **not taken** | **not taken** | stopped: the `webkit` lock is a non-fair `flock` with five other waiters, and the design loops in the main checkout reacquire it run after run |
| vitest, the two suspect files, six times | jsdom | 2 of 6 runs fail | | finding 9 |
| O-211 measure | rolldown + gzip -9 | see finding 6 | see finding 6 | |
| committed-tree gates | | **not taken** | | queued behind the lane reruns; stopped |

So the WebKit half of every lane re-run is owed. The lane records carry the lanes' own WebKit
readings; this critic re-ran none of them. Every Chromium reading above agrees with its
lane record cell for cell, except lane L5, which no longer runs on the HEAD tree.

## Findings (reproduced)

Ranked by what a consumer meets. Each says where its evidence is.

### 1. O-212 is not built: a Select plate still clips its own rows (high)

The orchestrator note says 11.1.0 must carry the 11.0.1 cure so the forward-merge is clean.
The branch still has `max-inline-size: min(22rem, 100vw - 2rem)` on the plate
(`src/styles/glass/overlay-plate.css:333`) and `min-w-(--reka-select-trigger-width)` on the
viewport (`src/components/select/SelectContent.vue:152`).

Critic probe, 1440, light and dark, in both engines on the branch: with a 386 px trigger the
viewport is 386 px in a 352 px plate. All six rows overflow it by up to 31 px, and
`elementFromPoint` at each row's right edge less 12 px misses the row 6/6. With a 600 px
trigger the overflow reaches 245 px. Triggers of 200 and 352 px pass, and so does 390, where
the Select is the phone sheet. v11.0.0 reads the same in Chromium. Paint:
`critic-1/out/png/green-{chromium,webkit}-o212-1440-tw386.png`: the highlighted pill runs
square into the plate's right edge.

### 2. O-214 is not built: a pointer open rings the selected row (high)

Critic probe, after a mouse click on the trigger, at 390 and 1440, light and dark, in both
engines on the branch: focus is on the checked row ("Quiet season"). It matches
`:focus-visible` and computes `outline: solid 2px` (the foreground at 0.48), so the row
carries a ring and the highlight pill together. v11.0.0 is the same in Chromium. Paint:
`critic-1/out/png/green-*-o214-*.png`.

### 3. The Collapsible breaks consumer CSS written against 11.0.0 (high, minor-release law)

`CollapsibleContent` no longer renders reka's content. So the `--reka-collapsible-content-height`
variable reka set on the content element is gone, and the slot now sits inside an extra
`.disclosure-content-clip` wrapper. The `CollapsibleContent` props are unchanged
(`dist/components/collapsible/CollapsibleContent.vue.d.ts` is byte-identical to the 11.0.0
tarball's), so the type checker cannot warn anyone.

Critic probe, 390, Chromium. A consumer opens a Collapsible whose content has
`class="consumer-content"` and the rule `.consumer-content > p { color: rgb(200,0,0) }`:

| reading | v11.0.0 | branch Chromium | branch WebKit |
| --- | --- | --- | --- |
| `--reka-collapsible-content-height` on the open content | `39.1875px` | empty | empty |
| the `>` rule reaches the paragraph | yes (`rgb(200,0,0)`) | no (`rgb(95,75,58)`) | no |
| the paragraph's parent | the content | `.disclosure-content-clip` | same |

Any consumer animating with `var(--reka-collapsible-content-height)` (the common
`animate-collapsible-down` keyframes) loses its height in a minor. The CHANGELOG mentions
the `>` rule only as advice ("should drop the `>`"), under a headline that says nothing needs
to change (finding 8). It never mentions the variable. Either keep both contracts
(write the variable on the region, and keep the slot's children as the content's children),
or this is a break for 12.0.0.

### 4. G13 is not built: `aside-side="left"` hands the stage the aside's width (medium)

Critic probe, 1440, light and dark, in both engines on the branch. With `asideSide="left"`
the stage is 400 px and the aside 1038 px. With `"right"` it is 1038 and 400. v11.0.0 is
the same in Chromium. Paint: `critic-1/out/png/green-*-g13-left.png`. The source still flips
only `grid-column` under `[data-aside-side="left"]`
(`src/components/configurator/styles.css:551-557`), not the template.

### 5. G14 is not built: SegmentedTabs pills are 26.3 px under a coarse pointer (medium)

Critic probe, 390, `hasTouch` (`(pointer: coarse)` matches), light and dark, in both engines
on the branch: both tabs are 26.3 px tall, against the 44 px floor. v11.0.0 is the same in
Chromium. Paint: `critic-1/out/png/green-*-g14.png`.

### 6. O-211 is not built: a DockLayerGroup with no switcher still costs 5.8 KB (medium)

`critic-1/o211/measure.mjs`, rolldown minified, gzip -9, with vue, reka, vueuse, lucide and
keyframes external, against `dist/dock.js`:

| | GlassDock + DockControl | + DockLayerGroup + DockLayer | delta | gate (≤ base + 1,024) |
| --- | --- | --- | --- | --- |
| 11.0.0 tarball | 15,554 B | 21,339 B | +5,785 | fail |
| branch | 16,937 B | 22,705 B | +5,768 | fail |

The base dock also grew by 1,383 B gz (+8.9 %) on the branch, which widens daraksha's
per-route overrun rather than closing it.

### 7. K12 is not built: a playing Slider writes layout properties every frame (medium)

Critic probe, a scrubber Slider whose `modelValue` a rAF clock writes, 2 s, at 390 and 1440
on the branch. `.slider-range` gets 240 `style` writes in Chromium (120 in WebKit), and the
thumb's wrapper as many. The written properties include `left` and `right`
(`rangeStyle: "left: 0%; right: 39.17%"`), which are layout properties, not `transform`.
v11.0.0 is the same in Chromium. O-181 coalesced the hand's emits; the clock's writes still
lay out every frame.

### 8. The CHANGELOG entry is inaccurate in two places (medium)

- **"A minor release: new things you can opt into, and nothing you need to change."** That is
  not true of this entry. The dock's resting corner changes by default (a capsule), and so
  does HandMark's default colour. A page with no `.dark` class now paints light on a dark OS.
  The Collapsible bullet tells consumers to drop `>` selectors, and its variable is gone
  (finding 3). `useStagger`'s default spacing changes too. The first sentence should say
  what changes by default and point to those bullets.
- **"Each line of a mark draws on the same spring as menus and popovers
  (`--spring-present`)".** Menus now open on `--spring-bloom`
  (`src/styles/glass/reveal.css:278`, `glass-menu-grow`), as this same entry's "Menus grow
  from their trigger" describes. Drop "menus", or name the spring alone.

No internal ids, lane, wave, seat or record paths appear in the entry (read in full).

### 9. Two vitest cases are flaky on the committed tree (medium, gate)

`vitest run` of `GlassDock.persistent-face.test.ts` and `press.test.ts`, six times under
`guarded --light` (`critic-1/vitest/flake-{1..6}.log`): runs 3 and 5 fail.

- Run 3: "a fine press on a #persistent-end seat inside the hover dwell never expands the
  dock", `onClick` called 0 times (`:102`). The test's own comment names the cause: Vue drops
  an event stamped before its handler was attached, and the test clicks in the mount's
  millisecond.
- Run 5: "reads the root tempo only when its source changes", `expected +0 to be 1` (`:156`).
  The root tempo read after an `<html>` attribute change did not happen. This is O-180's
  staleness path, and it misses about one time in six.

Lanes L3, L6 and L7 each recorded one of these as a flake and re-ran the suite until it was
green. A gate that passes on a re-run is not a gate. The tempo case may be a real miss in
`motionTempo()` (`src/composables/motion/core/motionTempo.ts`); it needs a root cause before
the close.

### 10. Lane L5's witness no longer runs on the HEAD tree (medium, record)

Lane L7 replaced the dash-offset draw with the clip window and removed the `.hm-guide` mask
from the three non-ring shapes. Lane L5's probe reads that guide, so on HEAD it throws
(`critic-1/rerun/lane-L5/out/green-chromium.log`: "getComputedStyle … parameter 1 is not of
type 'Element'"). Lane L5's GREEN for O-183 and O-190 (focal ink, band hue, retrigger, the
off-screen wait, the draw-in strip) was read on a tree that no longer exists. Lane L7's
witness covers the new draw, `drawn`, reduced motion and print, but not O-190's wait and draw
on scroll or `retrigger`.

The critic checked O-190 on HEAD in both engines with lane L5's own harness (Chromium
and WebKit read the same). A mark 1705 px down
reads `data-ink="wait"` with no running animation. On entry it starts `hm-reveal` and
`hm-frame` and paints 0 ink pixels at their start. At rest it paints the stroke (dark: 197
ink pixels; light: drawn in paint, `critic-1/out/png/green-webkit-o190-rest-390-light.png`).
The critic's chroma-based ink count reads 0 there because light `--primary` is near-grey,
which is a probe fault. With `retrigger`, leaving reads `wait` and re-entry runs 3 animations.
So the behaviour holds on HEAD in both engines (the v11.0.0 half of this check was queued
when the critic stopped; lane L5's own RED reading stands for it). The lane L5 witness itself still needs porting to the clip-window draw so its
claims are witnessed on the shipping tree.

### 11. The opt-in sheet shear leans the other way as it lands (low, restraint)

O-179's shear rides the slide's `panel` scalar, the one preset whose rebound is intrinsic, so
the sheet shears past zero. Critic re-run of lane L3's witness, Chromium,
`--sheet-enter-skew: 8deg`: the angle reaches −0.337° for 14 to 17 frames in every cell
(`critic-1/rerun/lane-L3/out/green-chromium.json`). Lane L3's own record reads the same
(−0.334° to −0.337°, 16 to 20 frames, both engines). The restraint note bans new overshoot on
a text or reader surface, and a sheet is one. The slide's own overshoot predates this release,
but the counter-lean is new motion. Clamp the shear at zero (`max(0, p)`), so it straightens
once and stays straight.

## Not reproduced, or not tested

- **O-213** (the shell floor): the critic's harness put `margin-inline` on the Configurator
  with a `style` prop, and the margin never reached `.configurator-shell` (shell 1..319 in a
  320 column at both margins). That is a harness fault, not a pass. The source still reads
  `min-inline-size: min(20rem, 100%)` (`src/components/configurator/styles.css:72`), unbuilt.
- **K15** (the Sheet detent CLS): not tested.
- **The dock's postures at 390 and 1440, fine and coarse**: lane L6's witness, re-run in
  Chromium, reads 161/161 on the branch (every posture, both pointer types, light and dark).
  Paint read: `rerun/lane-L6/out/png/green-chromium-o199-*` and `-o194-*` show capsules and
  circles with no flattened or cut corner. Not re-run in WebKit.
- **Public API against the 11.0.0 tarball**: `package.json` `exports` add only
  `./styles/font-files`. No export name is missing from any of the 66 entry `.d.ts` modules
  (checked with the TypeScript checker against the 11.0.0 tarball at `.cache/l4-pack/package`). Four component `.d.ts` differ, all additive:
  HandMark (`trigger`, `retrigger`, `drawn`), Slider (`grab`, `release`), ScrollProgressRim
  (`edge`), and PopoverContent (`reference`, `PopoverVirtualElement`).

## Gates

The critic's own committed-tree gate run (`critic-1/gates.sh`: build, typecheck,
demo:dist:build, vitest, verify:package, no rebind) did not run: it was queued behind the
browser reruns, and the critic stopped the queue at 21:48 (`critic-1/chain.log`). What
stands is the lanes' record: lane L7's chain on `d4d30bc71` (the HEAD source) reads build,
typecheck and demo:dist:build exit 0, verify:package clean after the 3011926 → 3014587
rebind, and vitest green only on its second run (finding 9). The critic did read the
published surface from the `dist/` that chain built (16:50, from `d4d30bc71`).

The e2e specs the items touch were not re-run by this critic. Each lane records its touched
specs failing the same title set on both trees; the critic did not test that claim.

## For the fix seat

1. O-212 and O-214: carry the 11.0.1 cure (master `docs/tranches/BL/driver/glass-11.0.1-scope.md`
   items 2 and 2b) so the forward-merge is clean.
2. The Collapsible: restore `--reka-collapsible-content-height` on the region and keep the
   slot's children as the content's children, or move the change to 12.0.0.
3. G13, G14, O-211 and K12: booked to critics and fix seats by the orchestrator notes, and
   reproduced here as not built. O-213 (its source is unchanged) and K15 were not tested here.
4. The CHANGELOG headline and the "menus" spring line.
5. The two flaky cases: root-cause the tempo miss; give the press test a clock that cannot
   lose the click.
6. Port lane L5's witness to the clip-window draw.
7. Clamp the sheet shear at zero.

## Open for the next critic

- Every lane witness in WebKit 2287, on both trees.
- The critic probe on v11.0.0 in WebKit, and its HEAD HandMark cell on v11.0.0 in Chromium.
- Lane L2's witness on the branch in Chromium (the try lost its port).
- The committed-tree gates and the touched e2e specs.
- O-213 with a harness that puts the margin on the shell, and K15.

