# glass-ui 11.1.0 · lane L1 (dock)

The build seat for lane L1 on `release/11.1.0`, run by claude-opus-5-5. L1 is the first
lane, so this folder held no earlier records. Every build, test and browser run went
through `~/.claude/guard/guarded`; every WebKit run held `--exclusive webkit`. The guard
refused nothing. Heavy runs queued for a slot (the heavy FIFO stood at 10 to 14 waiters
behind long-lived servers), so each tree is served from inside its own guarded browser
run (`lane-L1/runprobe.sh`), the pattern the 11.0.0 records use for spec servers.

Commits (read from `git log`): `1263cd5cf` (the three items, their tests, the CHANGELOG
entry, README, DESIGN.md and demo), `a95fdd1c0` (`.published-roster` adds the new public
rung), `8c2d5c583` (`.bundle-ratchet` rebind), and the records commit that carries this
file. Two orchestrator notes (`6388abbed`, `f01f530e7`, docs only) landed on the branch
between them.

Records: the witness (`lane-L1/probe.mjs`, `lane-L1/harness/`, chain `lane-L1/witness.sh`),
its readings (`lane-L1/out/{green,red}-{chromium,webkit}.json`, logs beside them, the
chain log `lane-L1/out/chain.log`), the cropped paint (`lane-L1/out/png/`), and the gates
(`lane-L1/gates.sh`, `lane-L1/gates/`).

**RED tree.** `git archive v11.0.0` into `.cache/l1-v1100` (node_modules symlinked, the
tranche records pruned, the harness copied in), served the same way. The harness imports
the library by relative source path, so one page runs on both trees; the props it sets
that 11.0.0 lacks (`edge`) fall through as attributes and change nothing.

**WebKit build.** Playwright 1.61 installs WebKit 2311, which crashed the harness page on
its first GlassDock in both trees (`out/{green,red}-webkit-2311-crash.log`, "Page
crashed"). The repo's own `tests-visual/webkit-2287.config.ts` records the same crash
(the dock's nested translucent `color-mix()`), and the 11.0.0 records run WebKit on build
2287. The probe pins 2287 (`executablePath`), and every WebKit reading below is 2287.

## The matrix

The branch readings are from the committed tree (`1263cd5cf`; the two later commits
change only the roster and ratchet datums). An earlier branch run on the working tree,
before the collapsed face lost its own padding, read the same 27/27; it is overwritten.

Each engine, each tree: 390 and 1440, light and dark; the rim at DPR 1 and 2 and at
progress 1 and 0.5; the nav mark also under reduced motion; one tick-trace cell.
27 verdicts per run.

| run | O-164 | O-188 | O-169 | exit |
| --- | --- | --- | --- | --- |
| branch · Chromium headless shell | 4/4 | 6/6 | 17/17 | 0 |
| branch · WebKit 2287 | 4/4 | 6/6 | 17/17 | 0 |
| v11.0.0 · Chromium headless shell | 0/4 | 0/6 | 0/17 | 1 |
| v11.0.0 · WebKit 2287 | 0/4 | 0/6 | 0/17 | 1 |

## O-164 · the collapsed seat sizes to its content

**What changed.** A collapsed dock's `#collapsed` face holding a glyph and a reading
("⌁ 12", "Now") was clipped: the summary pane is `aspect-ratio: 1`, and its explicit
`min-width` (the summary token) let the ratio pin the width to the height, so wider
content overflowed a 40 × 40 box. The root cure is one declaration: the pane's inline
minimum is `auto`. For a box with an aspect ratio, `auto` is its min-content width, so one
glyph is still a square pane (and a circular dock), while a wider face widens the pane.
The pane carries no padding of its own, so the square holds under either box model (a
first draft padded it and needed `box-sizing`, which the dock band's one-owner box-model
gate rightly refused); the dock's own collapsed padding keeps the face 8 px off the
ends. The settled collapsed radius is a stadium, a new primitive rung
`--radius-stadium: calc(infinity * 1px)` beside `--radius-circle` (the engine clamps it to
half the shorter side): a circle on the square box, round ends on the wide one, never the
oval lozenge `50%` draws on a box wider than tall. The rung is public and additive (the
token manifest, the published roster and DESIGN.md's radius table carry it; Tailwind
consumers get `rounded-stadium`). A literal in the dock's rule was refused by the
radius-ladder gate, which is right: a radius value lives on the ladder.

**Files.** `src/components/dock/styles/morph.css`, `src/styles/theme/radius.css`,
`src/styles/tokens/manifest.ts`, `.published-roster`, `DESIGN.md`, the README slot line;
tests `tests/components/custom/dock/collapsed-face-content-sized.test.ts` (new),
`tests/components/custom/dock/dock-hover-corner.test.ts` (the square-dock arm reads the
stadium) and `tests/styles/radius-role-canon.test.ts` (the stadium sits beside the circle,
outside the px role spine).

**Witness.** Scene `collapsed`: a closed dock whose face is a glyph plus "Now 12", and one
whose face is a single glyph. Green when the face is not clipped (`scrollWidth ≤
clientWidth`), sits at least 4 px inside the dock at both ends, and the single-glyph dock
stays square.

| reading (390 light) | v11.0.0 | branch Chromium | branch WebKit |
| --- | --- | --- | --- |
| wide dock | 56 × 56; face 77 px in a 40 px pane (`scrollWidth` 58 > 40), 10.5 px past each end | 92.9 × 56, face 8 px from each end | 93.0 × 56, 8 px |
| square dock | 56 × 56 | 56 × 56 | 56 × 56 |

RED in every cell on v11.0.0 (`unclipped: false, inside: false`), GREEN in every cell on
the branch, both engines. Paint: `out/png/{red,green}-{chromium,webkit}-o164-{wide,square}-*.png`.

## O-188 · a gliding active mark on a DockControl nav run

**What changed.** A run whose destination carries `aria-current` (the predicate the run
already reads for its open seat, `useDockRun.openIndexOf`, and that `RouterLink` sets) now
paints ONE selected plate, the run's `::before`, and `useDockRunMark` moves it between
seats on `useDockSpring(DOCK_SPRING)`, which is `springPreset("dock")`. The marked seat
stops painting its own fill, so the run never shows two. The mark rides the run's own
coordinates: its containing block is the run's scrolled content box, so it scrolls with
the seats and nothing listens to scroll. The arriving seat widens as it opens (run.css's
volume transfer), so its final box does not exist when the change lands; each frame the
mark draws `start + (L(t) − start) · p(t)` from the arriving seat's live box L(t), and
lands on it exactly at p = 1. Reduced motion: the spring jumps (`respectReducedMotion`)
and the global PRM rule zeroes the seat transitions, so the mark cuts in one frame. A
destination inside its own scroller (the demo's fading tab strip) is not on the run's
coordinates, so that run draws no mark and its tab keeps its own fill. The plate's box
and corner come from the seat's own computed `background-clip`, so the mark at rest is
the fill the seat painted on 11.0.0. A pseudo-element is no seat, no snap target and no
toolbar child, so the lattice, roving and toolbar claim are untouched.

**Files.** `src/components/dock/composables/useDockRunMark.ts` (new),
`src/components/dock/GlassDock.vue` (one call), `src/components/dock/styles/run.css`
(the mark and the seat's fill), the README contract lines; test
`tests/components/custom/dock/GlassDock.run-mark.test.ts` (new).

**Witness.** Scene `nav`: four `DockControl shape="tab"` seats, `aria-current="page"` on
the selected one. Select tab 3 from tab 0 and read the mark's computed `translate` every
frame for 1.4 s. Green: at least 3 distinct positions strictly between start and end, and
the last on the target's plate (±1 px); under reduced motion the first frame is already
on the target and no position lies between.

| reading | v11.0.0 | branch Chromium | branch WebKit |
| --- | --- | --- | --- |
| intermediate positions (390 light, 390 dark, 1440 light, 1440 dark) | 0 (no mark) | 27, 31, 29, 31 | 23, 23, 23, 24 |
| lands on target | no | yes | yes |
| reduced motion | no mark | first frame on target, 0 between | same |

Paint mid-glide and at rest: `out/png/green-*-o188-{mid,rest}-*.png`.

## O-169 · `ScrollProgressRim edge="border"`

**What changed.** A new `edge` prop (`"inset"` default, unchanged; `"border"`). On the
border edge the rim renders one stroke: a box over the host's padding edge with a
transparent-fill border the host's border width, `border-radius: inherit`, coloured with
one ink (`--scroll-progress-rim-ink`, the first of `stops` when given, else the rim's
focal violet), clipped along the axis (`clip-path: inset(...)` off
`--scroll-progress-rim-fill`), gliding on `--spring-dock`, cut under reduced motion.
Nothing paints where it is unfilled, so at rest the host's border is as it was. The fill
variable is written on the stroke itself, so a tick restyles one element. GlassDock names
its plate border width once (`--dock-plate-border-width: 1.5px`), draws the plate with it
and hands it to the rim (`--scroll-progress-rim-stroke`), and passes its corner through
`.dock-controls` and `.dock-persistent` (neither paints, clips or has a background) so a
rim seated in a persistent slot traces the dock's radius. GlassDock gets no new prop. A
host with its own CSS border sets `--scroll-progress-rim-outset` to its width. `segments`
draw no checkpoints on the border edge. The demo's progress story shows it on three docks.

**SVG path or border mask — why neither, and why that is crisper.** The stroke is a CSS
border on a box the size and corner of the host's border, so the engine's own border
rasterizer draws it: it lands on the host's border pixel for pixel at DPR 1 and 2,
corners included. An SVG path re-derives the rounded rect in script (and must reimplement
the engine's radius clamping) and drifts by fractions of a pixel against the real border
at DPR 1; a mask needs `mask-composite`, which this component's own test rules out.

**Files.** `src/components/scroll-progress-rim/{ScrollProgressRim.vue,types.ts,index.ts,styles.css}`,
`src/components/dock/styles/{shell.css,dock.css}`, `demo/stories/feedback/progress.vue`,
the README contract line; tests in
`tests/components/custom/scroll-progress-rim/ScrollProgressRim.test.ts` (five new cases).

**Witness.** Scene `rim`: a GlassDock with a `ScrollProgressRim edge="border"` (ink
magenta) in its persistent slot. A cropped screenshot of the dock is read pixel by pixel:
coverage is the fraction of the dock's columns holding ink; off-border counts ink pixels
deeper than the border band (border width + 1 px) from every edge, outside the corner
squares. Green at progress 1: coverage ≥ 0.99, off-border 0. At 0.5: coverage 0.5 ± 0.03,
ink in the left half only, off-border 0. At DPR 1 and 2.

| reading (390 light) | v11.0.0 | branch Chromium | branch WebKit |
| --- | --- | --- | --- |
| progress 1, DPR 1 | coverage 0.935, 426 px off the border | 1.000, 0 | 1.000, 0 |
| progress 1, DPR 2 | 0.933, 2135 off | 0.998, 0 | 1.000, 0 |
| progress 0.5, DPR 1 | 0.469, 213 off | 0.502, 0, left half | 0.502, 0, left half |
| progress 0.5, DPR 2 | 0.466, 1064 off | 0.501, 0, left half | 0.501, 0, left half |

**The tick.** One progress change, 0.4 → 0.5 after rest. DOM writes: the stroke's `style`
and the root's `aria-valuenow`, nothing else (both engines; on v11.0.0 the root's `style`
moves, RED). Chromium trace (devtools.timeline): all 21 `UpdateLayoutTree` events in the
window (the tick and the clip's spring frames) restyle 1 element each, and there are 0
`Layout` events (v11.0.0: the first restyles 3). WebKit has no trace channel in
Playwright; its reading is the DOM-write set alone.

## Gates

`lane-L1/gates.sh` runs the build-side gates as ONE guarded heavy run on the committed
tree; `lane-L1/e2e.sh` runs the touched e2e specs as guarded browser runs. Logs and
JSON reports in `lane-L1/gates/`, exit codes in `lane-L1/gates/chain.log`.

The first chain, on the working tree, logged every step `exit 0` because its helper read
`$?` after a `$(date)` substitution had reset it; its readings were read from the logs,
not the codes, and the helper now captures `rc` first. That run (the logs, superseded)
found three lane defects, all cured before commit: an exported constant nothing imported
(`DOCK_RUN_MARK_ATTR`, now module-private), a radius literal off the ladder (now the
`--radius-stadium` rung), and a `box-sizing` on the summary pane (now no padding). It
also ran vitest before `demo:dist:build`, which boot-graph needs; the chain now builds the
demo first. A second chain at `1263cd5cf` stopped at the build: the published roster
lacked the new rung (`run-1263cd5cf/`), rebound in `a95fdd1c0`.

| gate (committed tree `a95fdd1c0`) | result | exit |
| --- | --- | --- |
| `npm run build` | built | 0 |
| `npm run typecheck` | clean | 0 |
| `npm run demo:dist:build` | built | 0 |
| `vitest run --maxWorkers=2` | 272 files; 2522 passed, 10 expected fail, 1 skipped | 0 |
| `npm run verify:package` | `G-BUNDLE-RATCHET` increase 2903711 > 2897947 | 1 |
| ratchet rebind 2897947 → 2903711 (+5,764 B), committed as `8c2d5c583` | | |
| `npm run verify:package` | CLEAN; roster 292/292 | 0 |

**The rebind's reason.** The content bytes grow by the lane's new code and nothing
else: the run mark composable and its rule, the border-edge stroke, its prop and type,
and the stadium rung.

**e2e specs these items touch** (`scroll-progress-rim`, `nav-dock-fix`,
`dock-animation-live`), each engine, each tree, compared by title set:

| run | passed | failed | exit |
| --- | --- | --- | --- |
| branch · Chromium headless shell | 1 | 6 | 1 |
| v11.0.0 · Chromium headless shell | 1 | 6 | 1 |
| branch · WebKit 2287 | 1 | 6 | 1 |
| v11.0.0 · WebKit 2287 | 1 | 6 | 1 |

The six failing titles are identical on both trees in both engines (no failure is
branch-only): the rim spec asks for a progress bar named "Example scroll progress" that
the story no longer has, the nav-dock gestalt asks for a rail `mode="facets"` the demo no
longer renders, and the morph-clock spec reads `--dock-morph-t` frozen at 0. They are
11.0.0's rot, not this lane's. The branch e2e runs were on the working tree before the
collapsed face lost its padding; none of the six touches that pane. The one passing title,
the bottom dock's tab strip, is the run whose tabs sit in their own scroller, which keeps
its own fill.

## CHANGELOG

The 11.1.0 entry is opened (`## 11.1.0 — unreleased`) with a Dock section holding all
three items and the new rung, in outward prose.

## Open gaps

None for the three items. Two notes for later lanes and the close:

- The rot in the three touched e2e specs (above) predates this lane and is shared with
  v11.0.0; the close compares the visual suite by title set against v11.0.0.
- WebKit has no trace channel in Playwright, so the WebKit half of the O-169 tick gate is
  the DOM-write set alone, not a layout count.
