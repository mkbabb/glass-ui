# 11.1.1 fix seat 14 (after critique 13)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`,
from `bc939bd24` (critique 13; master merged at `d464304d7`). Every orchestrator note in this
folder was read first (fifteen), with `critique-13.md`, `fix-13.md` and the lift probe critique
13 ran. The list is critique 13's one defect. No tag, no push, no publish.

**Measured.** Every server and browser run went through `~/.claude/guard/guarded`, WebKit under
`--exclusive webkit`. The guard refused nothing; it printed its zone warning (armed, a warning
only) on every call. The WebKit list waited 49 minutes for the machine-wide WebKit lock (20:10:51
to 20:59:44; another session's runs held it), under the 60-minute bound. The 1-minute load at
each run's start ran 17 to 44 (other sessions). Ports 5351 to 5354, each Playwright process on
its own server (`GLASS_UI_DEMO_OWN`). No server or browser of this seat is left running, and the
probe's copy under `tests-visual/` was removed after its run. The two trees under `.cache/`
(`fix14-red`, `fix14-norule`, 27 MB each, ignored) are left in place: their deletion was refused
by the session's permissions. `fix-14/trees.sh` rebuilds them.

## Commits

| item | commit | what |
|---|---|---|
| 1. the lift cell | a50130e48 | the controls harness builds from its own stylesheet, the demo's with the harness scanned, so the page carries `scale-on-hover`; the lift cell reads that the tile carries the rule, then the tap at 390 and a mouse hover at 1440 |

No source file changed, so the package did not move and `.bundle-ratchet` is not rebound. No
CHANGELOG line: the library's line for the lift still describes the source.

## 1. Row 10's lift cell bites again

**Cause, confirmed.** The controls harness imported `demo/demo.css` and nothing else. Tailwind
generates a utility only for a class it finds in a scanned file, and the demo's scan is
`source("../demo")` plus four `src/components` globs. `scale-on-hover` is used by the harness
alone (under `tests-visual/`, not scanned) since master's `931e2409f` deleted the CSS Utilities
page. Read on this seat's dev server (`logs/harness-vs-demo.diff`, the demo stylesheet as Vite
serves it): 0 occurrences of `scale-on-hover`. So the cell compared `none` with `none` on every
tree.

**Cure, in the harness (the consumer of the utility), not in the demo.**
- `tests-visual/release-11-1-1/controls-harness.css` (new): `@import "../../demo/demo.css";`
  and `@source "./controls-harness.ts";`. The harness imports it in place of `demo.css`.
- Read on the same server, both stylesheets fetched with `?direct`, split at each `}` and
  diffed (`logs/harness-vs-demo.diff`, which keeps the sizes and hashes of the two dumps and
  the diff, the dumps themselves not kept): the harness stylesheet is the demo's (364,141 B)
  with one rule added (364,344 B), `.scale-on-hover { scale: 1; transition: …; @media (hover:
  hover) { &:hover { scale: var(--scale-hover) } } }`. The font URLs are rebased the same
  (`/src/fonts/fira-code/…`, served 200). Nothing else the round and weight cells read
  changes.
- The demo's stylesheet and build are untouched; the other harnesses still import `demo.css`.

**The cell** (`tests-visual/release-11-1-1-controls.spec.ts`, `lift · a scale-on-hover element
lifts under a hovering mouse and returns to rest after a tap`; the title changed with the
claim, and the gate's part A still selects it by `lift · `):
1. **The tile carries the rule** (every project): its computed `scale` at rest is `1`, the
   utility's base. An element without the rule reads `none`.
2. **390, touch:** after a tap the scale equals that rest scale (v11.1.0's unguarded `:hover`
   leaves 1.08).
3. **1440, mouse** (the cell now runs in the desktop projects): a hover lifts the tile to
   `--scale-hover` (1.08) within 0.001. This also shows the cure did not take the lift away
   where the pointer hovers.

**Why not the hover clause inside the 390 cell.** The first form of the cell opened a second,
mouse context at 1440 from the 390 project's browser and hovered there. It read `scale 1` on the
tip in Chromium 390 three times in three (`logs/first/tip-chromium-phone.log`). A probe
(`probe-hover/hover.probe.ts`, `logs/first/hover-chromium-{phone,desktop}.log`) found why: in
headless Chromium, a context opened from the phone project's browser reports `(hover: none)`
and `(pointer: coarse)` like the touch context, while the desktop project reads `(hover: hover)`
and `(pointer: fine)` and lifts the tile to 1.08. The hover is a fact of a mouse project, so it
is read in the 1440 projects, and the 390 projects read the rule on the tile itself.

## Witness

Trees (`fix-14/trees.sh`, logged in `logs/trees.txt`):
- **tip**: the worktree with the change.
- **red**: `git archive HEAD` without `docs/`, this seat's three harness and spec files from the
  worktree, and `src/` from `git archive v11.1.0 -- src` (678 blobs of 678 equal to v11.1.0's;
  its `btn.css` has no `@media (hover: hover)`). v11.1.0's library under the branch's demo,
  specs and harnesses, as critique 13's red tree.
- **norule**: `git archive HEAD` without `docs/` with this seat's spec only: the harness still
  imports `demo.css`, so the page has no rule for the tile (the merged tree before the cure,
  read with the new clause).

Each Playwright process ran the controls spec's cells three times (`--repeat-each=3`,
`fix-14/job.sh`); `tools/sum.py` reads the JSON reports.

Readings, three per tree and project (`logs/sum.txt`; logs and JSON reports
`logs/{tip,red,norule}-{chromium,webkit}-{phone,desktop}.*`):

| lift cell | Chromium 390 | Chromium 1440 | WebKit 390 | WebKit 1440 |
|---|---|---|---|---|
| tip | 3 passed | 3 passed | 3 passed | 3 passed |
| red (v11.1.0's library) | 3 failed: "scale after the tap: 1.08" | 3 passed | 3 failed: "scale after the tap: 1.08" | 3 passed |
| norule (no rule on the page) | 3 failed: rests at `none` | 3 failed: rests at `none` | 3 failed: rests at `none` | 3 failed: rests at `none` |

- **RED on v11.1.0, GREEN on the tip** in Chromium 390 and WebKit 390, where the tap is the
  claim: the matrix line goes from critique 13's `G/G -/- G/G -/-` to `R/G G/G R/G G/G`.
- **At 1440** both trees lift under the hover (`G/G`): a no-regression read that the lift stays
  where the pointer hovers.
- **The new clause is RED on a tree without the rule** in all four projects: the tile rests at
  `none`, `--scale-hover` reads 1.08. That is the merged tree before this commit, so the cell
  can no longer pass on an absent rule.
- The first form of the cell (the hover in a second context inside the 390 cell) is kept in
  `logs/first/` with the probe that explained it; those runs also took the exits spec's four
  "busy ground" glass cells, because a grep on `round · ` matches them. `job.sh` now names the
  controls spec as a file filter.

The round and weight cells read on the same runs as critique 13's matrix has them: the compact
strip GREEN on both trees at 390, the wide strip RED on v11.1.0 at 390 (corner 15 on a 50 px
box) and GREEN on the tip, the weight cell RED on v11.1.0 and GREEN on the tip in all four
projects, every reading three times in three. The harness's new stylesheet moved neither.

## Open gaps

For INBOUND; outside the list, so not built here.

- **A. The same cause in two other harnesses.** The exits and leave harnesses also build from
  `demo.css` and ask for widths no demo page names since the demo was rebuilt: `w-52` on the
  DropdownMenuContent (`exits-harness.ts:98`, `leave-harness.ts:46`) and `min-w-[12rem]` on the
  SelectContent (`exits-harness.ts:91`). The built demo stylesheet (`dist-demo/assets/*.css`,
  built 13:53 today on the merged tree) holds neither (0 each; `w-40`, `w-56` and `sr-only`
  are there). On v11.1.0 the dock overview page used `w-52`. So those surfaces open at their
  content's width, not the width the harness asks for. No cell reads that width as its claim,
  and critique 13 read those cells RED on v11.1.0 and GREEN on the tip at the width they now
  have; the cure would be the one built here (each harness scanned as a source), if the
  harnesses are to keep the width they ask for.
- Critique 13's open gaps A to I stand as written; this seat touched none.
