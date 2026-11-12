# 11.0.2 build seat B: O-267, O-212, O-214, O-219, O-227, O-232, O-235, O-241, O-245

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.0.2`, branch `release/11.0.2`,
on seat A's record (fc8eac7e8). Seat A returned without taking O-267, so per
`orchestrator-note-forced-colors-slider.md` this seat took it first, before its own rows.

## Setup

- Seat A's RED trees reused (`.cache/red-v11.0.1/tree`, `.cache/red-v11.0.0/tree`); every new
  spec, harness and config was copied into each tree's `tests-visual/` before a run there.
- Servers, each `guarded --timeout 90` (5341 restarted once with `--timeout 60`): 5341 the
  branch, 5342 v11.0.1, 5343 v11.0.0. Chromium runs through
  `scripts/build-B-chromium.sh` (`chromium-headless-new` and `coarse-touch`), WebKit through
  `scripts/build-B-webkit.sh`, each call `guarded --exclusive webkit`. `scripts/summary.py`
  prints a report's cells. Every WebKit cell is Playwright WebKit 2287 unless it says 2311.
- `tests-visual/release-11-0-2.config.ts` now also matches `slider-forced-colors.spec.ts` and
  has a `webkit-2311` project: the WebKit build the repo's Playwright (1.61.1) resolves,
  unshimmed, for the 11.0.2 spec.

## Rows

| row | commit | disposition |
|---|---|---|
| O-267 | 3aa871c28 | landed, source and tests only (for the 10.1.x cherry-pick); CHANGELOG clause in ab7cf6aec |
| O-212 (with O-213's cap) | 3235cd3a7 | cherry-pick of 617d62f73, clean; witness ported, below |
| O-214 | 704fa0663 | cherry-pick of b6393d385, clean; witness ported, below |
| O-219 | 6ed444b72 | witness only: closed by 11.0.1 (its thumb and lane), RED on v11.0.0 |
| O-227 | ac27d0868 | landed, source, tests and CHANGELOG |
| (CHANGELOG) | ab7cf6aec | the clauses for O-267, O-212 and O-214, kept out of their source commits |
| O-232 | 9d0b77e12 | landed, source, tests and CHANGELOG |
| O-235 | 97d86a66d | landed, source, tests and CHANGELOG; the Chromium cell is a hold, not a RED witness (below) |
| O-241 | 3f1b3cafb | witness only: closed by 11.0.1's forward merge, RED on v11.0.0 |
| O-245 | none | the read, below |

### O-267: a focused Slider under forced colors

- **Root.** 10.1.5 added `.slider-thumb:focus-visible { outline: none }` because the ring is
  on the track, and the track's ring is a `box-shadow`, which forced colors drop. Under
  `(forced-colors: active)` the focused track (valid and invalid arms) and the focused
  spectrum thumb now take `outline: var(--focus-ring-width) solid Highlight` at a 2px offset
  (`src/components/slider/styles.css`).
- **Audit.** `git diff v10.1.4 v10.1.5 -- src` and `git diff v11.0.0 v11.0.1 -- src` each add
  exactly one `outline: none` (this one; the other match is a comment). The spectrum thumb's
  `outline: none` predates 10.1.5 (v11.0.0 has it beside a `box-shadow` ring), so that arm was
  never visible under forced colors either; the same rule now covers it.
- **Witness.** `tests-visual/slider-forced-colors.spec.ts` over `slider-forced-colors/harness`
  (a new spec and harness, no edit to a shared file, so the commit cherry-picks onto 10.1.x):
  per arm, under `forcedColors: 'active'`, a key step focuses the thumb, then the arm's
  computed outline must be solid, at least 2px wide and offset at least 1px, and the band
  around it must change against the unfocused frame.

  | tree | chromium-headless-new | coarse-touch | webkit 2287 |
  |---|---|---|---|
  | v11.0.1 | 3 RED | 3 RED | 3 RED |
  | branch | 3 GREEN | 3 GREEN | 3 GREEN |

  RED reads `outlineStyle: none` in every cell. In Chromium the two track arms also paint
  nothing (`painted: false`); WebKit's forced-colors emulation matches the media query but
  keeps the `box-shadow`, so its RED is the computed outline alone. Logs `o267-*`.

### O-212 and O-214: the two cherry-picks

`git cherry-pick -x` of 617d62f73 then b6393d385; `overlay-plate.css` auto-merged with
11.0.1's change to it, and the result was read (the cap, the Select floor, the viewport's
`min-w` removed). The witness is 11.1.0's fix-2 probe cut to its O-212, O-213 and O-214 cells,
unchanged otherwise (`o212/probe.mjs`, `o212/harness/`), run against the served trees.

| item | cells | v11.0.1 Chromium | v11.0.1 WebKit | branch Chromium | branch WebKit |
|---|---|---|---|---|---|
| O-212 rows inside the plate | 20 | 14/20 | 14/20 | 20/20 | 20/20 |
| O-213 anchored 358 px panel | 4 | 2/4 | 2/4 | 4/4 | 4/4 |
| O-214 pointer open, no ring | 4 | 0/4 | 0/4 | 4/4 | 4/4 |
| O-214 keyboard open rings the row (hold) | 12 | 12/12 | 12/12 | 12/12 | 12/12 |

The same counts 11.1.0 read on v11.0.0. Readings `o212/out/*.json`, logs `o212-*`.

One finding for both lines, not acted on here because the commit is shared with 11.1.0:
b6393d385 adds `[data-open-input="pointer"] .glass-menu-row:focus-visible { outline: none }`,
and no forced-colors rule restores the highlight, so under forced colors a pointer-opened
Select marks its focused row with nothing (`menu.css` has no forced-colors block). O-267's
rule ("never `outline: none` without an indicator that survives forced colors") applies.

### O-219: a Slider at its minimum

11.0.1 already cures it: the thumb is a painted disc of `--slider-thumb-size` and the range
rides a lane, so the fill is at least one thumb wide at min (11.0.1's CHANGELOG, "The Slider
shows its thumb at the minimum and maximum"). No source change; the witness is kept.
`release-11-0-2.spec.ts` "slider ·" over `release-11-0-2/slider-harness` (min 50, value 50,
fourier's Duration, at sm, md and lg): thumb painted and wider than 0, fill at least the thumb
wide, the well's leading end differing from its empty trailing end (mean channel delta > 8).

| tree | chromium-headless-new | coarse-touch | webkit 2287 |
|---|---|---|---|
| v11.0.0 | 3 RED | 3 RED | 3 RED |
| v11.0.1 | 3 GREEN | 3 GREEN | 3 GREEN |
| branch | 3 GREEN | 3 GREEN | 3 GREEN |

RED reads thumb 0 wide at opacity 0, fill 0 wide, delta 2.5 to 4.2; GREEN 9.2 to 13.1.
RED on v11.0.0, not on v11.0.1: the row was closed before this branch. No CHANGELOG clause.

### O-227: the dock edge and Playwright WebKit

- **What crashes.** `o227/forms-probe.mjs` sets border colours on a plain div in WebKit 2311
  (`logs/o227-forms-2311.log`). It kills the page whenever a `color-mix()` has two arms that
  are themselves translucent `color-mix()` values, written out, through `var()`, as
  registered `<color>` properties, as relative colours, or in oklab. It survives literal
  translucent arms, one nested arm over an opaque colour, and one nested arm over
  `transparent`. So no lerp between two colour endpoints is crash-free; the endpoints must
  be strengths.
- **Cure.** `--glass-edge-floating: 5%` and `--glass-edge-dock: 8%` are new tokens;
  `--glass-border-floating` and `--glass-border-dock` are composed from them (same values).
  The dock's endpoints are `--dock-plate-{collapsed,expanded}-edge` (shell.css, and the
  static and held arms), and the edge is
  `color-mix(in srgb, var(--foreground) calc(c + (e − c)·t), transparent)` (dock.css).
- **Judgment the critic should check.** The internal endpoint names
  `--dock-plate-{collapsed,expanded}-border` are replaced by `-edge` (undocumented and read by
  no test or sibling `src/`), and the dock no longer reads `--glass-border-dock`, so a
  consumer that recoloured the dock edge through that token loses the override. One sibling
  does (bbnf-buddy `src/styles/preset.css:206`, on glass 10.1.0). The CHANGELOG says so and
  names the replacement. The edge's ink is now the plate's own `--foreground`, where the old
  tokens baked `:root`'s; identical on every page read here.
- **Witness.** "edge ·" in `release-11-0-2.spec.ts` over seat A's press harness (a GlassDock):
  the page opens and stays alive with the dock opened, and in Chromium the plate edge equals
  11.0.0's formula (a reference span inside the plate) at t = 0, 0.5 and 1.

  | tree | webkit-2311 (load) | webkit 2287 (load) | Chromium + coarse (load, colour) |
  |---|---|---|---|
  | v11.0.0 | RED (page crashed on `goto`) | | GREEN, GREEN (delta 0) |
  | v11.0.1 | RED (page crashed on `goto`) | | |
  | branch | GREEN | GREEN | GREEN, GREEN (delta 0 at all three t) |

  Logs `o227-*`.

### O-232: a static dock's controls

- **Root.** The capsule register's `backdrop-filter` reads `--glass-blur-floating`, which
  `:root` composes with `:root`'s `--glass-level` (1), so the static dock's `--glass-level: 0`
  never reached it, and `blur(0px)` would still be a filter. Read on v11.0.1: only the active
  icon (`.glass-capsule`) carries one, `blur(20px) saturate(1.5)`, at rest, hover and press;
  hover and press add none. Cure: the static arm (`adaptive-legibility.css`) sets
  `backdrop-filter: none` on `.glass-capsule` and `.glass-capsule-track` inside a
  `data-backdrop-mode="static"` dock.
- **Witness.** "static ·" over `release-11-0-2/static-harness` (icon, active icon, compact,
  tab, active tab, separator; light and dark): every box each control paints, and their
  pseudo-elements, compute `none` at rest, hover (fine pointer), press and active; plus a
  control cell, a live dock's active icon keeps its lens.

  | tree | chromium-headless-new | coarse-touch | webkit 2287 |
  |---|---|---|---|
  | v11.0.0 | 2 RED | 2 RED | |
  | v11.0.1 | 2 RED | 2 RED | 2 RED |
  | branch | 2 GREEN | 2 GREEN | 2 GREEN |

  The live control cell is GREEN in every tree and engine. Logs `o232-*`.

### O-235: the hero blob's kick

- **Root, two halves.** `blobSimulation.ts` kicked `pointer.click()` on every decelerating
  frame; it now kicks on an episode's first decelerating frame. The body's reach
  (`uBodyRadius + |uPulseAmp| + uNoiseAmp`, value's own metric, canvas UV) had no bound; both
  upload legs now read one `resolveBodyBreath()` (`composables/bodyBreath.ts`), which holds
  the breath to the room `BODY_BOX_HALF` (0.5 body units, 0.3125 UV) leaves after the radius
  and the noise. The edge trigger alone is value's own trial (`~/.dev-logs/o1110/D1-blob`,
  fix-r1: sweep 0.318, still past the box), and the bound alone would leave the kick stacking.
- **Witness.** `tests/components/custom/blob/blob-breath.test.ts`, vitest over the real
  pointer, mood, satellites and simulation, a pointer driven through `pointermove` on a 200 px
  host, both legs' uniforms read each frame.

  | case | v11.0.1 | branch | branch, bound lifted |
  |---|---|---|---|
  | 600 ms sweep | 38 kicks, reach 0.725 | GREEN | GREEN |
  | three-stroke drag, then release | 10 kicks, reach 0.703 | GREEN | reach 0.328, RED |
  | still release | GREEN | GREEN | GREEN |

  Logs `o235-unit-*`. The blob suite (6 files) is green.
- **The Chromium cell is a hold.** "blob ·" over `release-11-0-2/blob-harness` reads eight
  frames from 100 ms after a fast sweep and release (centre painted, the canvas box's corners
  the page ground). It is GREEN on the branch and also GREEN on v11.0.1: under Playwright's
  pointer the flash does not reproduce in sampled frames. One diagnostic run on v11.0.1
  (`o235/frames-probe.mjs`) caught a frame at 150 ms with the body gone entirely, the stacked
  pulse swinging the other way, but the cell's own run did not catch it. The first two
  versions of the cell read nothing at all: the harness Blob had no `pressLabel`, so its hit
  surface never mounted and the pointer never reached the engine.

### O-241: the open narrow face with an end seat

daraksha's `dock-cutcap` repro (seat A's copy in `daraksha-repro/`) ported to `src/` as
`release-11-0-2/cutcap-harness`, run as `?radius-dock=1.875rem&active=page&end=1` with the dock
opened (hover, or tap under coarse-touch): four equal plate corners, and any rounded clip
inset equal on all four.

| tree | chromium-headless-new | coarse-touch | webkit 2287 |
|---|---|---|---|
| v11.0.0 | 2 RED `[30,4,4,30]` | 2 RED | 2 RED |
| v11.0.1 | 2 GREEN `[28,28,28,28]` | 2 GREEN (30 each) | 2 GREEN |
| branch | 2 GREEN | 2 GREEN | 2 GREEN |

On v11.0.0 the run also overflows by 128 to 149 px; on 11.0.1 it fits. Closed by the forward
merge; no source change, no CHANGELOG clause. Logs `o241-*`.

### O-245: the read of daraksha's dark gloss glow

Read on the branch (whose overlay and material CSS are 11.0.1's apart from O-212's inline
bound): `o245/harness` puts an open PopoverContent card in dark on a plain dark ground;
`o245/read.mjs` reads its layers and crops it with the pointer away and on the card
(`logs/o245-read-branch.log`). The v11.0.0 read did not run: the 5343 server reached its
90-minute limit while the read waited for a slot. `material.css` is unchanged since v11.0.0.

- Away from the card the plate paints **no radial at all**: a flat (41,26,23) across the row.
  The `::before` catch-light is at opacity 0.
- On hover the catch-light rises to 0.08 (the dark hover rung). With no pointer wiring its
  position falls back to 50%/50%, so it is a centred cream disc under `plus-lighter`: about +7
  on every channel at the centre, blue included.
- daraksha's frame (`gloss-1440-dark.png`) rises from (43,26,24) at the card edge to (58,37,23)
  across most of its width: +15 red, +11 green, blue down by 1. An additive cream cannot lower
  a channel, and glass paints nothing of that size or hue on a plain ground.
- **So it is not O-182's halo.** That was an outer shadow in `--shadow-color`, outside the box,
  and 11.0.1 already sets it to the ground in dark. The hover catch-light accounts for a small
  centred share at most. The rest is not drawn by the plate on a plain ground; the likeliest
  source is the warm content behind the card coming through the plate's backdrop blur. A read
  on daraksha's own page (the same card with `backdrop-filter: none`, or nothing behind it)
  settles it. That belongs with 12.0.0's W-R.1 shading budget, where INBOUND placed the row.
- In passing: the plate's dark fill computes `color(srgb 0.093 0.050 0.009 / 0.22)`, the same
  warm light-scheme ink O-269 reports for the dark dock hover fill.

## Final gates

After the last row (3f1b3cafb), under `guarded`:

- `npm run typecheck`: exit 0 (`logs/typecheck-final-B.log`).
- `npx vitest run --maxWorkers=2`: 274 files, 2525 passed, 10 expected fail, 1 skipped, and 1
  failed: `tests/gates/boot-graph.test.ts`'s build arm ("the dist-demo it measures is NEWER
  than every source"), because seat A's `dist-demo/` predates this seat's source changes
  (`logs/vitest-final-B.log`). After `npm run demo:dist:build` (exit 0) that file passes 14
  of 14 (`logs/vitest-boot-graph-B.log`). The library suite is 2526 passing: seat A's 2517
  plus this seat's nine.
- Every server this seat started is stopped. No guarded run was refused; several waited for
  a slot (the WebKit lock and the machine-wide ceiling), one long enough that a server expired.

## Open, for the orchestrator

- O-269 joined the 11.0.2 scope during this seat; it is not this seat's row.
- O-268's layout count was seat A's to take with O-266; seat A moved O-266 and did not count it.
- The forced-colors gap in the O-214 cherry-pick (above), on 11.0.2 and 11.1.0 alike.
- O-227's override note: `--glass-border-dock` no longer reaches the dock edge.
