# 11.0.2 fix seat 4: critique 3's D-1 and D-2

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.0.2`, branch `release/11.0.2`,
on critique 3 (`7e6c896e1`). Paths are relative to `docs/release-11.0.2/` unless they
start with `src`, `tests` or `tests-visual`. Every run went through `guarded`, each WebKit
run under `--exclusive webkit`, one browser a run, `--workers=1`, one heavy run at a time;
no run was refused. Playwright runs: `fix-4/scripts/pw.sh` (fix seat 3's runner with this
seat's logs), one line a run in `fix-4/logs/chain.out` with the run's own exit code. The
v11.0.1 tree is `.cache/red-v11.0.1/tree`, as earlier seats used it.

## Commits

| item | commit | what |
|---|---|---|
| D-1 | `564031139` | the plate edge reads `--glass-border-floating` again |
| ratchet | `97eaf3985` | rebound to 2916380, the tree's own packed figure |
| D-2 | none | measured to its cause; returned for the orchestrator's ruling |

## D-1: a host's `--glass-border-floating` colours the dock's edge again

**The forms first** (`fix-4/forms-probe.mjs`, `fix-4/logs/forms-*.log`). Critique 3's lead
was to read the token as a relative colour. Reading it as a relative colour of itself,
`rgb(from var(--glass-border-floating) r g b / alpha)`, is not enough: in WebKit 2311 the
page dies as soon as that colour is one arm of a `color-mix()`.

| form | Chromium | WebKit 2311 | WebKit 2287 |
|---|---|---|---|
| two nested translucent arms (O-227's control) | 6.5% | **crashed** | 6.5% |
| a relative colour of a token mix, alone | 5% | 5% | 5% |
| token mix over a relative colour of a token mix | 6.5% | **crashed** | 6.5% |
| two relative colours of a token mix | 5% | **crashed** | 5% |
| a host's literal over the token mix | the host's | the host's | the host's |

So the token itself has to be the relative colour. Fix seat 3's forms log already shows
"relative token over relative ink" and "nested arm over a relative-colour arm" alive in
both WebKit builds.

**Cure (`564031139`).**
- `tokens/glass.css`: `--glass-border-floating` and `--glass-border-dock` are
  `rgb(from var(--foreground) r g b / var(--glass-edge-*))`, the same colour as the
  `color-mix()` with `transparent` they replace (5% and 8%, unpremultiplied ink).
- `dock.css`: the folded end is `var(--glass-border-floating)` again, as in 11.0.1, so it
  resolves where the token does. The default edge is `--_dock-edge-lerp`, the mix of the
  expanded ink into that token by t. The two host `-border` paths are unchanged, and the
  `-by-expanded` path falls back to the token.
- `morph.css` (held) and `adaptive-legibility.css` (static): both ends are the token, and
  the lerp is the token alone, so a host's translucent mix there is never mixed with
  itself (the "two nested translucent arms" form).
- `shell.css`: `--dock-plate-collapsed-edge` and `--dock-plate-expanded-edge`, which this
  branch added and no release shipped, are read by nothing now and are gone. The two
  public strength tokens stay.
- CHANGELOG: the crash paragraph says the two hairlines are now `--foreground` at a
  strength, keep their values, and that `--glass-border-floating` colours the folded end
  and the whole edge of a held or a static dock.

**Witness.** A new cell, `edge · a host's --glass-border-floating colours the folded edge
and a held or static dock's edge`. It sets a literal `rgb(200 0 0 / 0.5)` and a
preset-style `color-mix(in srgb, var(--foreground) 55%, transparent)` on the dock. For
each, it reads a live dock at t = 0 (the host's colour) and t = 0.5 (the even mix with the
library's dock edge), then a held and a static dock at t = 0 and t = 1 (the host's colour).
It also checks the page stays alive. The cell turns the plate's border transition off for
its reads, since a held plate eases its border colour.

| tree | Chromium | coarse-touch | WebKit 2287 | WebKit 2311 |
|---|---|---|---|---|
| the branch before the cure (`7e6c896e1`, the five files stashed for the run) | **RED** (`literal, live dock, t = 0`: the library's 5% ink, not the host's) | **RED** | **RED** | **RED** |
| v11.0.1 | GREEN | GREEN | GREEN | **RED** (page crashed at `goto`, O-227's RED) |
| cure | GREEN | GREEN | GREEN | GREEN |

As with fix seat 3's `--glass-border-dock` cell, this restores an 11.0.1 behaviour, so
v11.0.1 is GREEN wherever its page lives. The RED that names the defect is the branch
before the cure. The other four `edge ·` cells pass on the cure in all four projects
(Chromium 10 of 10 with coarse-touch; WebKit 8 passed and the 2 Chromium-only reference
cells skipped). Logs: `fix-4/logs/d1-{pre,tip,v1101}-*`. The first `d1-tip-chco` and
`d1-v1101-chco` lines in `chain.out` are the cell before its transition fix, which failed
on the eased held read; they were rerun.

## Gates on the cure

`fix-4/scripts/gates.sh`, logs in `fix-4/logs/`.

| gate | exit | read |
|---|---|---|
| `npm run typecheck` | 0 | |
| `npm run build` | 0 | |
| `npm run demo:dist:build` | 0 | |
| `CI=true npx vitest run --maxWorkers=2` | 0 | 278 files, 2535 passed, 10 expected fail, 1 skipped |
| `npm run test:browser` | 0 | 2 files, 12 passed |
| `npm run verify:package` | 1, then 0 | only `G-BUNDLE-RATCHET` (2916380 < 2916685, the shrink); after the rebind (`97eaf3985`) `terminal: CLEAN` |

The token change reaches every surface that reads either hairline, so after the commits
the 11.0.2, release-10-1-5 and release-10-1-2 specs ran whole in Chromium on `97eaf3985`:
**213 passed, 0 failed** (`fix-4/logs/reg-tip-ch.log`).

## D-2: the vertical dock's first expand frame, measured, not cured

`fix-4/vertical-probe.mjs` on critic 2's vertical scene, Chromium
(`fix-4/logs/vertical-tip-chromium.log`):

| | root (inline × block) | padding inline | the pane in flow |
|---|---|---|---|
| 1440, folded | 58 × 58 | 12 px | the summary, 34 × 34 |
| 1440, open | 64 × 200 | 12 px | the column of 40 px seats |
| 390 coarse, folded | 61 × 61 | 12 px | the summary, 37 × 37 |
| 390 coarse, open | 68 × 216 | 12 px | the column of 44 px seats |

**The cause.** The vertical morph scales the main axis only (`shape.css`,
`scale: 1 var(--dock-size-scale)`), and morph.css's vertical rule says the cross axis is
invariant because its padding is pinned. The padding is pinned, but the pane in flow is
not the same width: the folded summary is `--dock-collapsed-summary-min-size` (34 px, 37 on
coarse), and the open column's seats are 40 (44). So the cross extent jumps 6 px (7 on
coarse) on the morph's first frame, in both directions. On a collapse the main extent is
still long when the cross jumps, so the end stays round. On an expand, the first frame is
the folded main extent (58, 61) under the open cross (64, 68), the squashed disc critique 3
captured. The numbers match critique 3's exactly, and the same geometry is in v11.0.1.

**Why no cure here.** Each root cure changes something the frozen list does not name:
- make the cross extent truly invariant: the folded vertical disc grows to the open
  column's width (58 to 64 px at 1440), a change to every folded vertical dock at rest;
- or morph the cross axis too: a second scale axis on the root, its inverse on the layers
  and the persistent regions, and a cross origin in `dockMorphMeasure`'s `anchor`, a
  change to the morph's transform model.

Flooring the expand's start at the cross extent would make the first frame round, but it
hides the jump rather than removing it, and the origins `dockMorphMeasure` computes from
the folded box would disagree with the painted one. The critique asked the orchestrator to
take the cure or rule the frame to INBOUND as 11.0.1's own. This seat leaves that ruling
open and adds the cause above for it.

## Open

- **D-2**, for the orchestrator's ruling (above). Until then, item 3 reads RED in
  Playwright WebKit on the vertical expand's first frame, on this branch and on v11.0.1.
- Not run by this seat: the WebKit sweep of the older release specs after the token change.
  The two hairline tokens compute the same colours as before, and the Chromium read above
  covers the specs.
