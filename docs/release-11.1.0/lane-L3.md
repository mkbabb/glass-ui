# glass-ui 11.1.0 · lane L3 (surfaces)

The build seat for lane L3 on `release/11.1.0`, run by claude-opus-5-5. It read `lane-L1.md`,
`lane-L2.md` and the orchestrator note first (no item joined this lane there), then the
INBOUND rows O-158, O-184, O-178 and O-179 and their addenda in W-E.6, W-E.2, W-E.4 and
W-E.3. Every build, test and browser run went through `~/.claude/guard/guarded`; every
WebKit run held `--exclusive webkit`. The guard refused nothing. WebKit runs waited for
the machine-wide WebKit lock; heavy runs queued for a slot. The kernel zone warning
printed `ARMED` at inuse ≈ 30k elements throughout, far below the 8M notify line.

Commits (read from `git log`): `7e22fd6f4` (the four items, their unit tests, the CHANGELOG
section and two demo sections), then the records commit that carries this file (and the
ratchet rebind, if the gates needed one; see Gates).

Records: the witness (`lane-L3/probe.mjs`, `lane-L3/harness/`, chain `lane-L3/chain.sh` →
`witness.sh` → `runprobe.sh`), readings (`lane-L3/out/{green,red}-{chromium,webkit}.json`,
logs beside them, the chain log `lane-L3/out/chain.log`), cropped paint
(`lane-L3/out/png/`), O-178's type witness (`typewitness.sh`, `typewitness/`, logs
`out/type-{green,red}.log`), gates (`gates.sh`, `e2e.sh`, `e2e-webkit.config.ts`, `gates/`).

**RED tree.** `git archive v11.0.0` (tranche records excluded) into `.cache/l3-v1100`,
`node_modules` symlinked, the harness copied in, served the same way. The harness imports
the library by relative source path, so one page runs on both trees. What 11.0.0 lacks
(`variant="bare"`, `.table-container`, the declared `reference` prop,
`--sheet-enter-skew`) falls through and changes nothing.

**WebKit build.** 2287, pinned by `executablePath`, as lanes L1 and L2 and the 11.0.0
records do.

**Run history** (in `out/chain.log`). Run 1 was a Chromium shake-out. Run 2 had two probe
faults, both found in its readings and fixed before run 3. (a) At 390 the popover follow
point sat where the 16 px collision padding legitimately shifts a 336 px card. The point
moved to the viewport's centre. (b) The wide table sits below the 800 px viewport, so its
clipped screenshot came back short and every corner pixel read `undefined`, which
counted as clean on both trees. Containers now scroll into view, and an out-of-capture
pixel throws. Run 2's branch Chromium run also lost one cell to four vite full-reloads
caused by this seat: the type witness wrote a `tsconfig.json` inside a served tree.
`typewitness.sh` now says never to run it beside a chain. Run 3 is the record: every run
had 0 reloads.

## The matrix (run 3)

Per engine, per tree: 390 and 1440, light and dark, for each item (the Badge in a coarse
context: `hasTouch`, and `isMobile` in Chromium; `(pointer: coarse)` matched in both
engines). O-179 adds two hold-line cells at 390 light: the token unset, and reduced
motion with the token set. That gives 18 verdicts a run.

| run | O-158 | O-184 | O-178 (browser) | O-179 | exit |
| --- | --- | --- | --- | --- | --- |
| branch · Chromium headless shell | 4/4 | 4/4 | 4/4 | 6/6 | 0 |
| branch · WebKit 2287 | 4/4 | 4/4 | 4/4 | 6/6 | 0 |
| v11.0.0 · Chromium headless shell | 0/4 | 0/4 | 4/4 | 2/6 | 1 |
| v11.0.0 · WebKit 2287 | 0/4 | 0/4 | 4/4 | 2/6 | 1 |

O-179's two 11.0.0 passes are the hold lines: they assert the absence of shear, which
11.0.0 never draws. Every shear cell is RED on 11.0.0.

**O-178's RED is the type witness.** 11.0.0's `PopoverContent` forwards `$attrs` whole into
reka's content, so an undeclared `reference` already reached reka's `PopperContent` by
fallthrough. The browser behaviour therefore passes on 11.0.0 too, and the browser cells
are a hold line. What 11.0.0 lacks is the API: under the repo's `checkUnknownProps`, a
consumer cannot write it.

| type witness (`vue-tsc` over `typewitness/Consumer.vue`) | exit | errors |
| --- | --- | --- |
| branch | 0 | none |
| v11.0.0 | 2 | TS2305 `PopoverVirtualElement` not exported; TS2353 `reference` not a known property of `PopoverContent` |

(The first two type-witness lines in `chain.log` read `exit 0` on both trees. `$?` was
expanded after a `$(date)` in the same `echo`. The script now captures the code first, and
the third pair is the record.)

## O-158 · the bare Badge

**What changed.** `variant="bare"`, one more value on Badge's existing `variant` axis, not
a parallel component. `.badge-atom--bare` (glass-atom.css) sets `min-inline-size: 0`,
`padding: 0`, `background: none` and `box-shadow: none`, so it has no plate, no rim and
no 1lh floor. It sits after the `prefers-contrast` arm, which would otherwise restore its
ring. The glyph size is now a register variable: the base utility reads
`size-[var(--mark-glyph)]`. `mark.css` declares `--mark-glyph: 1em` on `:where(.badge-atom)`,
and the bare rule re-points it to `1cap`, so the glyph is the text's cap height. The
utility keeps its layer and its (0,2,1) specificity, so every plated badge sizes its glyph
exactly as in 11.0.0. Moving the rule into a stylesheet would have let a consumer's
`w-*`/`h-*` on the icon start winning. A label element beside the glyph (any child that is
not an `svg` and holds none) is visually hidden with a clip and stays in the
accessibility tree. The bare badge inherits the surrounding ink.

**Files.** `src/components/badge/index.ts`, `src/styles/glass/glass-atom.css`,
`src/styles/glass/mark.css`, `demo/stories/display/badge.vue` (a "bare mark" section);
tests `tests/components/badge.contract.test.ts` (the variant union; the glyph register;
a new bare block: stamps, no plate classes, the rule's declarations, the label clip, its
order after the contrast arm), `tests/styles/mark-register.test.ts` (glyph assertion
follows the register).

**Witness.** value.js's markup: an award glyph and a "Featured" label element in a bare
Badge, in a 358 px card beside the palette name and a count. Readings: the badge box, the
glyph box, the cap height of the badge's own font (a probe box of `1cap`), padding,
shadow, background, the label's display and the card's ARIA snapshot. Green: badge box =
glyph box (±0.5 px), glyph = cap (±0.5), no padding, shadow or fill, label not
`display: none`, "Featured" in the accessible text.

| reading (light; dark identical) | v11.0.0 Chromium | v11.0.0 WebKit | branch Chromium | branch WebKit |
| --- | --- | --- | --- | --- |
| badge box, 390 | 120.42 × 28.48 | 124.77 × 28.45 | 13.98 × 13.98 | 13.98 × 13.98 |
| glyph box / cap height, 390 | 18.61 / 13.98 | 18.61 / 13.98 | 13.98 / 13.98 | 13.98 / 13.98 |
| badge box, 1440 | 138.64 × 31.98 | 143.72 × 31.97 | 16.39 × 16.39 | 16.39 × 16.39 |
| padding | 4px 8.80px | 4px 8.80px | 0px | 0px |
| box-shadow | the rim | the rim | none | none |
| palette name width, 390 | 183.6 px (ellipsised) | 179.2 px | 219.5 px (whole) | 219.5 px |
| "Featured" in the ARIA snapshot | yes | yes | yes | yes |

Paint: `out/png/{green,red}-*-o158-*.png`. 11.0.0 draws a 120 px pill that truncates the
name; the branch draws the gold glyph at cap height after the whole name.

## O-184 · rounded table containers

**What changed.** One element rounds, clips and scrolls a table: `.table-container`
(`src/components/table/styles.css`, new). It sets `overflow: auto`,
`border-radius: var(--radius-card)`, `background: var(--glass-plate-quiet)` and
`box-shadow: var(--glass-material-rim)`, with no border. A scroll port clips its content to
its rounded padding box, so the header row, the last row, a sticky header mid-scroll and
rows scrolled sideways all stay inside the outline, and no row or cell needs to know it is
at a corner. The plate is the box's own background, not a positioned `::before` layer, so
it stays put while the content scrolls. `Table.vue` renders its container with this class,
replacing `relative w-full overflow-auto`, and `DataTable` inherits it. A consumer wraps a
plain `<table>` in an element with the class. The sheet is imported in the main cascade
(`src/styles/index.css`), not a component chunk, so a plain table works without importing
`<Table>`. `DataTable`'s root `overflow: hidden` is deleted: it was a second, unrounded
clip.

**Files.** `src/components/table/styles.css` (new), `src/components/table/Table.vue`,
`src/components/data-table/styles.css`, `src/styles/index.css`; tests
`tests/components/table.contract.test.ts` (the container class; the rule's radius, clip and
plate with no border declaration; the main-cascade import; no clip left on `.data-table`).

**Witness.** Three containers: a `<Table>` with header and 6 rows, a consumer's plain
`<table>` in `.table-container` with a sticky header and a 220 px `max-block-size`, and a
`<Table>` whose table is 2200 px wide. Cells are painted strong blue and green, so a cell
outside the outline is unmistakable. In each corner square of `--radius-card` (16 px),
every pixel outside the arc (a 1.5 px band left for anti-aliasing) must match the page
ground sampled just outside the container (max channel Δ ≤ 6). This is checked at rest,
with the header stuck mid-scroll, and at both ends of the horizontal scroll. Borders are
read from computed style.

| reading (120 corner pixels a state) | v11.0.0 Chromium | v11.0.0 WebKit | branch Chromium | branch WebKit |
| --- | --- | --- | --- | --- |
| `Table` at rest: pixels off the ground | 120 (Δ 231 light, 211 dark) | 120 | 0 | 0 |
| plain table at rest / header stuck mid-scroll | 120 / 120 | 104 / 104 | 0 / 0 | 0 / 0 |
| wide table, scroll start / end | 120 / 120 | 120 / 120 | 0 / 0 | 0 / 0 |
| container radius | 0px | 0px | 16px | 16px |
| scrollTop mid / scrollLeft end, 390 | 0 / 1842 (no scroll port) | 0 / 1842 | 352 / 1842 | 352 / 1842 |
| borders: container, table, last row, last cells | 0 | 0 | 0 | 0 |

The border row is a hold line: 11.0.0 drew no border either. The container adds none, so
the edge carries one line (the rim), not two. Paint: `out/png/*-o184-*.png`.

## O-178 · a popover on a virtual point

**What changed.** `PopoverContent` declares `reference?: Element | PopoverVirtualElement`
and hands it to reka's content. reka's own door: `PopperContent` places against
`reference ?? the trigger's anchor`, and both the click arm (`PopoverContent`) and the
hover arm (`HoverCardContent`) accept it. The choice of a prop on the content over a
`PopoverAnchor` component: reka's anchor component exists to register an element. A
virtual point has no element to render, and the content prop is the one reka places
against, so a separate component would be a second door to the same field. Collision
flipping, side, align and dismissal are reka's, unchanged. No `PopoverTrigger` is needed;
the consumer opens it with `v-model:open`. To move the anchor, the consumer passes a new
object (a `computed`). The popover is placed again once per new reference, and nothing
polls in between. `PopoverVirtualElement` (`getBoundingClientRect()` returning a rect, and
an optional `contextElement` so scroll containers are watched) is exported from
`./popover` and the root.

**Files.** `src/components/popover/PopoverContent.vue`, `src/components/popover/index.ts`,
`src/index.ts`, `demo/stories/containers/popover.vue` ("On a point": a card that follows
the pointer over a field); tests `tests/components/popover.contract.test.ts` (the reference
reaches reka's content on the click arm with no trigger, and on the hover arm),
`tests/components/floating.public-contracts.test-d.ts` (`reference` is a declared prop).

**Witness (browser).** The virtual element counts its `getBoundingClientRect()` calls. The
card opens at a point. Readings: calls over 600 ms idle; the point moves to the viewport
centre, then two frames later the card's top = y + 4 (the side offset) and its centre = x;
the point moves 14 px above the viewport foot, and the card must flip to `top` and sit
above it; an outside press must close it.

| reading (every cell, both trees, both engines) | value |
| --- | --- |
| `getBoundingClientRect()` calls while idle (600 ms) | 0 |
| calls per move | 2 |
| followed (top = y + 4, centre = x, ±1.5 px) | yes |
| flipped to `top` at the foot | yes |
| open after an outside press | no |

Paint: `out/png/*-o178-{follow,flip}-*.png`.

## O-179 · the side sheet's entry shear

**What changed.** `--sheet-enter-skew` (declared `0deg` at `:root` in
`sheet/styles.css`). A sliding `SheetContent` writes
`transform: skewY(calc(var(--sheet-enter-skew) × p))` (`skewX` on top and bottom). Here `p`
is the slide spring's own position scalar: 1 off the edge, 0 at rest, on the `panel`
preset the slide already rides. So the shear needs no clock of its own, is whole on the
first entry frame, and straightens exactly as the slide settles. The pure function
`sheetEntryShear` lives in `motion.ts` beside `sheetSlideTransform`. The sign mirrors on
the left and top edges, so one angle reads the same from any edge. Because the scalar is
shared, the close shears symmetrically, and an entry reversed mid-flight turns without a
jump. The spring's small overshoot leans the sheet a hair the other way as it lands, as
the slide overshoots. It is a transform only, with no layout. On the reduced register (the
OS setting, or `motion="reduced"`) the inline transform is `none`. A detented sheet grows
rather than slides and does not shear.

**Files.** `src/components/sheet/SheetContent.vue`, `src/components/sheet/motion.ts`,
`src/components/sheet/styles.css`; tests `tests/components/sheet/sheet-motion.test.ts`
(the function's values and mirror; the inline transform on the full register and `none`
on the reduced one).

**Witness.** A right `SheetContent`, `--sheet-enter-skew: 8deg` on `:root`. From the open,
120 frames of the computed `transform` (angle = atan of the matrix's skew term) and the
plate's left edge, then the settled transform. Green: the first visible frame carries at
least half the angle, no frame exceeds the token (+0.5°), and the settled frame is
identity. Hold lines: with the token unset, and under reduced motion with it set, no frame
shears.

| reading | v11.0.0 Chromium | v11.0.0 WebKit | branch Chromium | branch WebKit |
| --- | --- | --- | --- | --- |
| first visible frame (390, left 381) | 0° | 0° | 7.758° | 7.758° |
| frame 7 (390) | 0° | 0° | 4.84° | 4.71° |
| largest angle | 0° | 0° | 8° | 8° |
| settled | `none` | `none` | `matrix(1, 0, 0, 1, 0, 0)` | identity |
| token unset / reduced motion: largest angle | 0° / 0° | 0° / 0° | 0° / 0° | 0° / 0° |

Paint: `out/png/*-o179-mid-*.png` (70 ms into the entry) and `*-o179-rest-*.png`. The text
stays legible through the entry: the angle never exceeds the token.

## Gates

`lane-L3/gates.sh` runs the build-side gates as ONE guarded heavy run on the committed
tree (`7e22fd6f4`). `lane-L3/e2e.sh` runs the touched e2e specs as guarded browser runs.
Logs and JSON are in `lane-L3/gates/`, exit codes in `lane-L3/gates/chain.log`.

Before the commit, each changed suite ran green under `guarded --light`, and
`npm run typecheck` was clean (exit 0, after the demo sections too).

| gate | result | exit |
| --- | --- | --- |
| `npm run build` | built | 0 |
| `npm run typecheck` | clean | 0 |
| `npm run demo:dist:build` | built | 0 |
| `vitest run --maxWorkers=2` | 274 files; 1 failed: `press.test.ts` "reads the root tempo only when its source changes" (lane L2's O-180 case) | 1 |
| the same file alone, three times (`--light`) | 6/6 each | 0 |
| `vitest run --maxWorkers=2`, re-run on the same tree (`vitest-2.log`) | 274 files; 2543 passed, 10 expected fail, 1 skipped | 0 |
| `npm run verify:package` | `G-BUNDLE-RATCHET` increase 2917350 > 2914675 | 1 |
| ratchet rebind 2914675 → 2917350 (+2,675 B), committed with this record | | |
| `npm run verify:package` | CLEAN; roster 292/292 | 0 |

**The rebind's reason.** The content bytes grow by this lane's code and nothing else: the
bare Badge rule and its label clip, the glyph register variable, the `.table-container`
rule (less `DataTable`'s deleted root clip), the `reference` prop and its type, and the
entry-shear function, its `:root` token and the inline transform. The roster is unchanged:
`.table-container` is a component class and `--sheet-enter-skew` a `:root` token, not
`@theme` or `@utility` entries.

**e2e specs these items touch** (`Sheet.position`, `sheet-inset`, `sheet-radius` for the
Sheet; `overlay-sizing` and `card-padding`, which open popovers), each engine, each tree,
compared by title set:

| run | passed | failed | exit |
| --- | --- | --- | --- |
| branch · Chromium headless shell | 7 | 16 | 1 |
| v11.0.0 · Chromium headless shell | 7 | 16 | 1 |
| branch · WebKit 2287 | 7 | 16 | 1 |
| v11.0.0 · WebKit 2287 | 7 | 16 | 1 |

In each engine the 16 failing titles are identical on both trees, so none is branch-only.
They are 11.0.0's: card-padding's golden-ladder cells (block pad equals inline, 12 = 12)
and its overlay-band cells (a demo-route click times out at 60 s); sheet-inset's
edge-pinned cells (it reads the plate mid-slide, 236 to 372 px off its edge); and
sheet-radius's corner cells. `Sheet.position` (both layers) and `overlay-sizing` (Popover
and DropdownMenu at the right edge, the long menus) pass on both.

## CHANGELOG

A "Surfaces" section in the 11.1.0 entry covers four items: the bare Badge and when to use
it; rounded tables, including how to wrap a hand-written table and how a sticky header
behaves in the container; `reference` on `PopoverContent` with a map-card example and the
exported type; and the opt-in entry shear, its default, and its reduced-motion and detent
behaviour.

## Open gaps

- **O-158, value's markup.** value's icon span carries `w-3 h-3` on the svg. The base
  glyph utility outranks those classes in 11.0.0 and still does, so value's glyph renders
  at cap height on adoption. value should delete its zeroing override and its
  `display: none` on the label (the label element is now hidden accessibly by the bare
  rule). The bare rule hides label ELEMENTS only: a bare text node beside the glyph is
  still drawn, and the CHANGELOG says to put the label in its own element.
- **O-184.** A sticky header sticks to the container, not the page, because the container
  is the scroll port. This was true in 11.0.0 (`overflow-auto`). A `<Table>` consumer who
  wants a scrolling body sets `max-block-size` on `[data-slot="table-container"]`; there
  is no prop for it. The witness covers `<Table>` and a plain table; `DataTable`
  renders `<Table>`, so it shares the mechanism, but it has no browser cell of its own.
  At narrow widths `DataTable` projects cards, which keep their own radius.
- **O-178.** The behaviour was reachable in 11.0.0 by attribute fallthrough. The delta is
  the declared, typed and documented API (RED by type, not by paint). A virtual element
  mutated in place, rather than replaced, is not re-placed: the content follows new
  references only, by design (no polling). The "no layout beyond positioning" claim is
  witnessed as 0 reference reads while idle and 2 per move; layout counts inside
  floating-ui's own placement were not traced.
- **Vitest flake (not this lane's code).** Lane L2's tempo case in `press.test.ts`
  failed once in the full parallel run and passed in the re-run and alone 3/3. The
  assertion expects a root style read on the next mount after an `<html>` attribute
  changes in the same task. Under load, that read was missed once. The tempo cache is L2's
  O-180 work; recorded here for the close.
- **e2e rot.** The 16 shared failures above (card-padding, sheet-inset, sheet-radius) are
  red on 11.0.0 in both engines and unchanged by this lane.
- **O-179.** The addendum leaves N-16 to judge the default; it ships at `0deg`. The close
  shears symmetrically (one scalar). An entry-only shear would need a second clock and
  would jump on a reversed entry.
