# glass-ui 11.1.0 · lane L6 (dock follow-through)

The build seat for lane L6 on `release/11.1.0`, run by claude-opus-5-5. Before building it read
`lane-L1.md` through `lane-L5.md` and all three orchestrator notes. It also read the four dock
items in `orchestrator-note-daraksha.md` in full, with their amendments: O-194 and its
`#persistent-end` amendment, O-197 and O-198 in the second amendment, and O-199 in the third. L1's
collapsed-seat sizing (O-164, the `--radius-stadium` rung, the `min-width: auto` summary) is the
base the four items build on. The four share one surface, so they were designed and built together
in one commit.

Every build, test and browser run went through `~/.claude/guard/guarded`, and every WebKit run held
`--exclusive webkit`. The guard refused nothing: runs waited for headroom or the WebKit lock, and
none was refused. Each tree is served from inside its own guarded browser run
(`lane-L6/runprobe.sh`), as L1 to L5 do.

Commits (read from `git log`): `72f2d5ec5` (the four items, their unit tests, the CHANGELOG entry,
README and DESIGN.md), then the records commit that carries this file (and the ratchet rebind,
if one was needed; see Gates).

Records: the witness (`lane-L6/probe.mjs`, `lane-L6/harness/`, chain `lane-L6/chain.sh` and
`lane-L6/witness.sh`), its readings (`lane-L6/out/{green,red}-{chromium,webkit}.json`, logs beside
them, exit codes in `lane-L6/out/chain.log`), the cropped paint (`lane-L6/out/png/`), and the gates
(`lane-L6/gates.sh`, `lane-L6/e2e.sh`, `lane-L6/gates/`). `out/pre-chromium.json` is the branch
before this lane's build (at `80b385e24`), kept as a second RED reading.

**RED tree.** `git archive v11.0.0` (`60ce8d49f`) into `.cache/l6-v1100`, with the tranche records
excluded, `node_modules` symlinked and the harness copied in. It is served the same way. The harness
imports the library by relative source path, so one page runs on both trees.

**WebKit build.** WebKit is Playwright's build 2287, pinned by `executablePath` as in L1 to L5
(build 2311 crashes on a GlassDock).

## The matrix

The branch readings come from the tree committed at `72f2d5ec5`. Its source is byte-identical to the
working tree the runs served, because only records changed after them.

The O-198 column is from the gate's final form, which counts scroll-driven animations too
(`out/{green,red}-o198-{chromium,webkit}.json`). The first form set them aside, and that
under-reported v11.0.0: it read 1/3 there either way. The other columns are from
`out/{green,red}-{chromium,webkit}.json`.

| run | O-194 | O-197 | O-198 | O-199 | exit |
| --- | --- | --- | --- | --- | --- |
| branch · Chromium headless shell | 66/66 | 10/10 | 3/3 | 82/82 | 0 |
| branch · WebKit 2287 | 60/60 | 10/10 | 3/3 | 82/82 | 0 |
| v11.0.0 · Chromium headless shell | 24/66 | 0/10 | 1/3 | 6/82 | 1 |
| v11.0.0 · WebKit 2287 | 30/60 | 0/10 | 1/3 | 6/82 | 1 |

What v11.0.0 passes is hold lines, not item claims. For O-194 these are the paint fit (the plate
already fit a lone seat there, through L1's empty-summary rules) and the fine-pointer hover and
keyboard paths. In WebKit they also include the fine click, because WebKit does not focus a button
on click. For O-198 it is the planted bite, which catches the plant on both trees. For O-199 it is
the six `--radius-dock: 1rem` host-bar cells, which are already 16 px there. Every claim the items
make fails on v11.0.0 in both engines, and passes on the branch in both.

The first branch WebKit run (`out/green-webkit-plain-tab.{json,log}`) failed the six keyboard
cells, and nothing else. The cause was the probe, not the dock. WebKit on macOS tabs only to text
fields unless Option is held (Safari's "Press Tab to highlight each item" default), so focus never
left `<body>`. The probe now walks WebKit with `Alt+Tab`, and the rerun is the reading above. The
v11.0.0 WebKit run already used the corrected walk.

## O-194 · the persistent seats are the collapsed face, and a press on one is its own

**What changed.** When no `#collapsed` slot is authored and `#persistent` or `#persistent-end`
holds a seat, those seats are the whole collapsed face. `GlassDock` computes `persistentFace`, and
the summary pane then carries no `role`, `tabindex`, `aria-label`, `aria-expanded` or
`aria-controls`. It is an empty, zero-size pane that morph.css already shrinks to nothing, so the
plate shrink-wraps the seats on the one dock spring. The collapsed accessibility tree is the seats
alone. With both regions authored, the leading seats come first, then the trailing ones at one
region gap (morph.css, the persistent-face rule). On a vertical dock the empty summary also gives
up its block size.

When a collapse takes focus out of the full face, focus goes to the first persistent seat, since
there is no summary to take it. The leading region gains the class `dock-persistent-start`
(additive), so each region can own its gap (O-197).

The root of "the press expands the dock" was in `useDockState`. A press on a seat stood in for the
dock's own expand gesture in three ways. The focus that Chromium gives the button on press was
deferred, then run when the press resolved (O-110). The hover dwell started by the pointer's arrival
committed 60 ms later. And a tap's compatibility `mouseenter` started a dwell of its own.

A press now records whether it began on a `.dock-persistent` seat (`seatAct`). While it holds (from
that `pointerdown` until the pointer leaves the dock or presses elsewhere), the deferred expand
lapses with the press and no hover dwell commits. A hover-opened dock that the pointer leaves after
a seat press collapses at once instead of waiting out the 3.6 s patient dwell. A press on any
other control keeps the dwell.

**The coarse expand path: a long press.** A coarse pointer has no hover, so it needs one deliberate
expand path that leaves the tap to the seat. The seat chose a long press and records why:

- **A press on the plate outside the seat** was measured first, and rejected. On a touch screen the
  engine adjusts a tap to the nearest clickable target. Tapping the 8 px plate ring 4 px from the
  dock's edge pressed the toggle in Chromium (`out/pre-chromium.json`, `expand-path` cells:
  `presses: 1`). A real finger is wider still, so the ring can never be its own target.
- **A swipe along the axis** needs `touch-action` handed over on the collapsed dock and a gesture
  recogniser beside the page's own pan, which is a second owner of one gesture. That was the reason
  the dock's old touch gate was deleted.
- **A long press** takes the seat's whole face as its target. It is the Dynamic Island idiom: a tap
  is the control's, a hold opens the island. And it needs only a timer on the press the dock already
  tracks.

A touch or pen press held still (10 px slop) on a collapsed dock's seat for 500 ms
(`DOCK_LONG_PRESS_MS`) pins the dock open. Its release presses nothing: the click and any context
menu are swallowed until that click, the next press, or 500 ms after the release. An engine that
raises its context menu before 500 ms has recognised the same hold, and that menu fires the long
press at once.

The keyboard path is unchanged: Tab onto a seat expands the dock (focus with no press behind it).
Tab carries focus on into the full face, or Shift+Tab does for a trailing seat, and Tab walks out of
the dock. Focus is not trapped.

**Files.** `src/components/dock/GlassDock.vue`, `src/components/dock/composables/useDockState.ts`,
`src/components/dock/constants.ts` (`DOCK_LONG_PRESS_MS`, `DOCK_LONG_PRESS_SLOP_PX`),
`src/components/dock/styles/morph.css` (the persistent-face spacing and the vertical empty summary),
and `src/components/dock/README.md`. Tests: `tests/components/custom/dock/GlassDock.persistent-face.test.ts`
(new, 12 cases), and `tests/components/custom/dock/GlassDock.press-posture.test.ts`, whose four
expectations of "the seat press expands after it resolves" now read collapsed, per the ruling.

**Witness.** Scene `face`, cases `lead` (`#persistent`), `trail` (`#persistent-end`) and `both`. The
seat is a theme toggle (`DockControl` with its own name, "Dark theme", and its own `aria-pressed`).
The scene runs at 390 and 1440, with a fine pointer and a coarse one (`hasTouch`, `isMobile`).

- **Tree.** The collapsed `ariaSnapshot` holds exactly the seats, the toggle among them with its
  `aria-pressed`, and no "Expand dock".
- **Fit.** The dock's content box is the seats' union, within 1 px.
- **Press.** Fine: a click, and a 700 ms hover dwell followed by a click. Coarse: a tap. Then the
  pointer moves off the dock. At 1.5 s the dock reads collapsed, the theme is toggled, and the seat
  was pressed exactly once.
- **Expand path.** Fine: hover. Coarse: a long press. In both engines this is the touch pointer
  sequence held 700 ms, with a click after the release (the worst case). In Chromium a second cell
  runs its own touch pipeline (CDP `Input.dispatchTouchEvent`). The dock must open, with no press
  and the theme unchanged.
- **Keyboard.** The walk described above.

| reading (lead, 390) | v11.0.0 | branch Chromium | branch WebKit |
| --- | --- | --- | --- |
| collapsed controls | "Dark theme", "Expand dock" | "Dark theme" | "Dark theme" |
| fine click, then off | expanded at 1.5 s | collapsed, never expanded | collapsed |
| fine dwell, click, then off | expanded at 1.5 s | collapsed (hover had opened it) | collapsed |
| coarse tap | expanded at 1.5 s | collapsed, never expanded | collapsed |
| coarse long press | toggled the theme, stayed collapsed | expanded, no press | expanded, no press |

Paint: `out/png/{green,red}-{chromium,webkit}-o194-{lead,trail,both}-{390,1440}-{fine,coarse}-*.png`
(rest and open).

## O-197 · the trailing persistent gap

**What changed.** Each persistent region owns its gap toward the run, on the dock's axis in both
orientations: `.dock-persistent-start` keeps `--dock-layer-gap` after itself, and
`.dock-persistent-end` keeps it before itself (`shell-regions.css`). The layers-side rule
`.dock-persistent + .dock-layers` is deleted, because it only ever saw the leading region. The
vertical dock's root `gap` is deleted too. It was a second owner of the same spacing, and it doubled
the leading gap on a vertical dock (12 px against 6 px, measured).

**Files.** `src/components/dock/styles/shell-regions.css`, `src/components/dock/styles/shell.css`,
and `src/components/dock/styles/morph.css` (the persistent face zeroes the region margins).

**Witness.** Scene `gap`: three open docks (leading only, trailing only, both), each with a run of
four seats, horizontal and vertical, at 360, 390, 430, 820 and 1440. The cell is green when no two
control hit rects overlap and every gap equals the leading dock's gap (±0.5 px).

| reading (every width) | v11.0.0 | branch (both engines) |
| --- | --- | --- |
| horizontal: leading / trailing gap | 6 / 0 px | 6 / 6 px |
| vertical: leading / trailing gap | 12 / 6 px | 6 / 6 px |

No hit rects overlap on either tree: a zero gap abuts, it does not overlap. So the RED is the gap,
which is what put daraksha's "More" cell flush under the khatam. Paint:
`out/png/*-o197-trail-{h,v}-*.png`.

## O-198 · under reduced motion only opacity animates on the dock, at 144 ms or less

**What changed.** Under emulated `prefers-reduced-motion: reduce`, two motions remained on the
dock, both measured in both engines. The library's PRM wildcard already zeroes every transition's
duration, and the dock spring already jumps.

1. **The pane visibility hold.** `.dock-layer` carries `transition: visibility 0s linear
   var(--duration-normal)`. The wildcard zeroes its duration but not its delay, so the leaving pane
   ran a `visibility` transition for 300 ms after every expand and collapse. Under reduce,
   `.dock-layer` now has `transition: none` (`layers.css`). The pane is already at opacity 0, so it
   hides at once.
2. **The scroll-driven cut cap**, which animates the plate's `border-*-radius` along the run's
   scroll. It is now authored under `prefers-reduced-motion: no-preference`, as the library's
   scroll-driven register is (`run.css`). Under reduce the corner holds still, and the half-visible
   next seat still reports the overflow.

The same change scopes the cap to `.glass-dock:not(.collapsed)`. On a collapsed dock the run is out
of flow and inert behind the face, yet its overflow had cut the collapsed plate's trailing corners
to 4 px. This is visible on v11.0.0 at rest, in the `col-*` crops, as `16px 4px 4px 16px`.

The radius daraksha saw animating under PRM on 10.1.4 reads, on v11.0.0, as the cut cap: its two
`border-*-radius` animations run on the plate at rest and through the hover-expand, because the
collapsed run overflows and the timeline is live. No CSS transition on the radius survives the
wildcard. On the branch, the dock's corner is also one value in every posture (O-199), so a posture
change has no radius left to move.

**Files.** `src/components/dock/styles/layers.css`, `src/components/dock/styles/run.css`.

**Witness.** Scene `prm`: a collapsible dock with a summary, a Play seat and a two-face
`DockLayerGroup`, under emulated reduce, at 390 and 1440. The probe samples
`getAnimations({ subtree: true })` and every element's (and pseudo-element's) computed transitions
on each frame, through four steps: hover-expand, a face swap, a press on a run seat, and collapse.
It also records that the states really changed: open with 3 seats, then 5 after the swap, then
closed.

A cell is green when every running animation animates opacity alone in 144 ms or less, and every
nonzero computed transition is opacity in 144 ms or less. The bite plants `transition:
border-radius 300ms` with a radius change on expand, in the components layer. The gate must catch
it, and does on both trees in both engines.

| reading | v11.0.0 | branch (both engines) |
| --- | --- | --- |
| running animations, 390 and 1440 | the cut cap's two `border-*-radius` animations on the plate (rest, expand, swap, press, collapse); `visibility` on the summary (expand) and the full pane (collapse) | none |
| nonzero transitions | none | none |
| planted radius transition | caught | caught |

## O-199 · the dock rests as a capsule

**What changed.**

- **The token.** `--radius-dock` is `var(--radius-stadium)` (`theme/radius.css`), so the dock's
  one corner rule (`shape.css`, `border-radius: var(--radius-dock)`) is a capsule in every posture.
  The engine clamps the stadium to half the box's shorter side, in px, never `%`. That gives a
  stadium open, a circle collapsed square, a capsule collapsed wide or two cells wide, and a stadium
  on the long axis vertically.
- **The posture rules.** The two collapsed posture rules in morph.css are deleted: L1's stadium arm
  and atlas's two-cell bar arm (F-20). So is the vertical `shape-pill` 1rem rule in shell.css, along
  with the vertical duplicate of the corner. The rest corner has one rule.

**Through the morph.** The capsule exposed a defect that 11.0.0 already had. The morph scales the
box on its axis, and a scale carries the corner with it. At the first expand frame, a 56 px circle
painted 6.1 × 28 px corners on the branch, and 3.5 × 16 px on v11.0.0. That is a squashed rounded
box, a silhouette swap on every expand and collapse.

While `[data-morphing]` is set, the pill corner is now stated counter-scaled: `R / k` along the axis
and `R` across it, where `k` is `--dock-size-scale` (`shape.css`). The engine's overlap clamp scales
both radii by one factor, so any `R` at or past the half cross extent paints exactly half the
visible cross extent on both axes, whatever the content's height.

`R` is `--dock-corner`, the capsule stated as a finite length: half the token cross extent, bounded
by `--radius-dock`. The cut cap's keyframe rest uses the same value (`run.css`), since a clamped
rest would hold to the end of its range and snap. A host's `--radius-dock: 1rem` passes through the
`min()`, so the bar corner stays round through the morph too. The `rounded` and `card` shapes keep
their own corners.

**A host restores the bar.** Setting `--radius-dock: 1rem` on any ancestor gives the dock a 16 px
corner in every posture. The CHANGELOG says so in consumer prose, and `rounded-dock` follows the
token. The orchestrator owes atlas word of the new default, as the owner ordered.

**Files.** `src/styles/theme/radius.css`, `src/components/dock/styles/{shape,morph,shell,run}.css`,
and `DESIGN.md` (the radius table). Tests: `tests/styles/radius-role-canon.test.ts` (`--radius-dock`
leaves the px pill spine for a stadium-alias set, and resolves to the stadium),
`tests/components/custom/dock/dock-hover-corner.test.ts` (one corner rule, no collapsed posture
rule), and `tests/components/custom/dock/g-dock-lattice.test.ts` (the cap rest is `--dock-corner`).

**Witness.** Scene `capsule`, at 390 and 1440, in light and dark. It covers eleven postures: open
horizontal, open with a persistent seat, collapsed square, collapsed two-cell (seat plus summary),
collapsed wide (O-164's glyph plus reading), collapsed persistent face (one seat, and both regions),
a morphing dock at rest, open vertical, collapsed vertical, and collapsed vertical persistent face.

- **At rest.** The dock's and the plate's computed corners contain no `%`. Every used corner (the
  CSS Backgrounds 3 overlap clamp applied to the computed radii) on both axes is half the cross
  extent, within 0.5 px.
- **Through the morph.** Expand and collapse are sampled every frame while `[data-morphing]` is
  set (65 to 67 frames each). Five evenly spaced frames, and separately every frame, must paint a
  visible corner (the used corner times the measured scale) at half the visible cross extent on
  both axes, within 0.5 px.
- **Host bar.** With `--radius-dock: 1rem` on the host, every posture reads 16 px.

| reading (390 light) | v11.0.0 | branch Chromium | branch WebKit |
| --- | --- | --- | --- |
| open horizontal, 256 × 56 | 16 px | 28 px | 28 px |
| collapsed square, 56 × 56 | computed `50%`; plate cut to 16/4/4/16 | 28 px (circle) | 28 px |
| collapsed two-cell, 102 × 56 | 16 px; plate cut to 16/4/4/16 | 28 px (capsule) | 28 px |
| open vertical, 64 × 200 | 16 px | 32 px | 32 px |
| collapsed vertical, 58 × 58 | 16 px; plate cut to 16/16/4/4 | 29 px | 29 px |
| morph, worst visible corner | 3.5 × 16 px against half 28 | 28.01 × 28 px | 28 × 28 px |
| host `--radius-dock: 1rem` | 16 px | 16 px | 16 px |

Paint: `out/png/{green,red}-{chromium,webkit}-o199-*-{390,1440}-{light,dark}.png`, and
`o199-bar-open-h-*` for the host bar.

## Gates

`lane-L6/gates.sh` runs the build-side gates as ONE guarded heavy run on the committed tree
(`72f2d5ec5`), and `lane-L6/e2e.sh` runs the touched e2e specs as guarded browser runs. Logs and JSON
reports are in `lane-L6/gates/`, with exit codes in `lane-L6/gates/chain.log`.

| gate (committed tree `72f2d5ec5`) | result | exit |
| --- | --- | --- |
| `npm run build` | built | 0 |
| `npm run typecheck` | clean | 0 |
| `npm run demo:dist:build` | built | 0 |
| `vitest run --maxWorkers=2` (in the chain) | 276 files; 2556 passed, 1 failed, 10 expected fail, 1 skipped | 1 |
| the one failure, `tests/composables/motion/press.test.ts`, run alone three times | 6/6, 6/6, 6/6 | 0 |
| `vitest run --maxWorkers=2` again, same tree (`gates/vitest-2.log`) | 276 files; 2557 passed, 10 expected fail, 1 skipped | 0 |
| `npm run verify:package` | `G-BUNDLE-RATCHET` increase 3011926 > 3008867 | 1 |
| ratchet rebind 3008867 → 3011926 (+3,059 B), committed with this record | | |
| `npm run verify:package` again | clean | 0 |

**The vitest failure** is L2's "reads the root tempo only when its source changes" (`useLiquidPress`).
This lane does not touch that code. It fails only under the full suite's load, and passes alone and
on the rerun, so it is a load-sensitive flake in that test's read count. It is noted for the close,
not cured here.

**The rebind's reason.** The content bytes grow by this lane's code and nothing else
(`git diff --stat 80b385e24 72f2d5ec5 -- src` names only the dock files and `theme/radius.css`).
The growth is the seat-press model and the long press in `useDockState`, the persistent face in
`GlassDock`, the counter-scaled morph corner and `--dock-corner`, the region-owned gaps, and the
reduced-motion arms, less the deleted posture rules.

**e2e specs these items touch** (`dock-morph-family`, `dock-morph-insitu`, `dock-animation-live`,
`nav-dock-fix`, `dockmorph-cta`), in each engine on each tree, compared by title set:

| run | passed | failed | exit |
| --- | --- | --- | --- |
| branch · Chromium headless shell | 4 | 13 | 1 |
| v11.0.0 · Chromium headless shell | 4 | 13 | 1 |
| branch · WebKit 2287 | 4 | 13 | 1 |
| v11.0.0 · WebKit 2287 | 4 | 13 | 1 |

The 13 failing titles are identical on both trees in both engines, and no failure is branch-only,
so the branch leaves them where 11.0.0 had them. Their first error lines, read from the reports, are:

- `dock-animation-live`: "`--dock-morph-t` ramped over only 0 rising frame(s)". L1 recorded
  the same.
- `dock-morph-family` (a)/(b): "the morph-axis box composites a transform mid-morph (got none)".
- `dock-morph-family` (c): "every dock control seats INSIDE the box under PRM (2/13 outside)".
- `dock-morph-family` (d): "`--dock-layer-peak-block-size` is a measured non-zero peak (got )".
- `dock-morph-family` (e): "`--dock-local-scale: 1.4` … (base 1 → threaded 1)".
- `dock-morph-insitu` 6a–6d: "the shell morph handle is present", then null reads of the demo's
  in-situ scene.
- `nav-dock-fix`, four gestalt cells: "the rail renders `mode="facets"`". L1 recorded the same.

Why each fails on 11.0.0 is not this lane's question, and is not diagnosed here.

The four passing titles (the vertical plate chrome, the CTA seat's box and its PRM reveal, and the
bottom dock's tab strip with persistent prev/next) pass on both trees. The specs changed no tracked
file.

## CHANGELOG

The 11.1.0 entry's Dock section gains five bullets in outward prose: the capsule (and how to keep
the bar corner, with a CSS example), the persistent face (with an example, and the hover, keyboard
and long-press paths), the press that only presses, the trailing spacing (and the vertical leading
gap, which is now one gap rather than two), and the dock under reduced motion.

## Open gaps

- **The token cross extent.** `--dock-corner` is half the token cross extent: the layer height
  plus the cross padding. It is a finite stand-in where CSS needs a number: the cut cap's keyframe
  rest, and the morph's counter-scaled corner. At rest the dock reads the stadium and is exact for
  any content. Through the morph the clamp corrects any `R` at or past the true half, so the corner
  is exact whenever the content is no taller than the layer. The collapsed vertical dock is the
  case: 58 px wide against a token 64, and exact through the clamp.

  A consumer seat taller than the layer height would make the dock taller than `R` covers. Its
  ends would then paint slightly short of round mid-morph only, and only while the run scrolls for
  the cap. No shipped dock does this.
- **The collapsed vertical dock's cross axis moves.** A collapsible vertical dock with a summary
  is 58 px wide collapsed and 64 px open, because its summary pane is 34 px. morph.css documents
  the cross axis as pinned. This predates the lane, and is not changed here. The capsule holds in
  both postures (29 and 32 px).
- **The long press is witnessed as the pointer sequence a touch engine dispatches**, in both
  engines, and through Chromium's own touch pipeline (CDP). Playwright's WebKit has no touch-hold
  API, and real iOS Safari and Android Chrome are not measured.
- **Real Safari** is not measured: WebKit is Playwright's build 2287.
- **L2's `press.test.ts` tempo-read test** failed once under full-suite load and passed alone
  (3/3) and on the full rerun. It is a flake in a lane this one does not touch.
- **Atlas.** O-199 removes the two-cell bar corner atlas's F-20 register asked for, by the owner's
  ruling. The CHANGELOG gives the one-line restore. Telling atlas is the orchestrator's, as the
  owner ordered.
