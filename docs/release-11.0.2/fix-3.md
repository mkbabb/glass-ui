# 11.0.2 fix seat 3: D-1 from critique 2, then what critique 2 and the binding notes list as owed (unfinished: the WebKit sweep refused on low disk)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.0.2`, branch `release/11.0.2`,
on critique 2 (`15a88380f`) and this seat's first attempt (`b8453c23d`, which measured
nothing before the 2026-11-13 zone stop). Paths are relative to `docs/release-11.0.2/`
unless they start with `src`, `tests` or `tests-visual`. Every run went through `guarded`,
each WebKit run under `--exclusive webkit`, one browser a run, `--workers=1`, one heavy run
at a time. Playwright runs: `fix-3/scripts/pw.sh` (critic 2's runner with this seat's logs
and a `webkit-2311` project), one line a run in `fix-3/logs/chain.out` with the run's own
exit code. The v11.0.1 tree is `.cache/red-v11.0.1/tree` as earlier seats used it.

## Commits

| item | commit | what |
|---|---|---|
| D-1 | `fd9452769` | the edge's expanded end reads `--glass-border-dock` again |
| README thumb word | `ff6c21b7b` | `--foreground`, not `--card` |
| idle window (note item 8) | `e12789fef` | `DOCK_COLLAPSE_DELAY_MS` 3600 to 6000 |
| item 9, restated | `ea27f9a36` | the Popover hold cell and the README paragraph |
| O-271 | `63295892f` | returned open after two attempts (records only) |
| O-295 | `1a99c064c` | the bounding cell |
| O-295 reproduction, O-282 trace | `056489b32` | probes and logs |
| orchestrator notes | `e080063b5` | the two untracked notes committed |
| master merge | `b42405920` | the browser-free and sparse-checkout workflows |
| ratchet | not rebound | the WebKit sweep legs were refused first; see the sweep section |

## D-1: the dock's edge reads `--glass-border-dock` again

**The probe first.** `fix-3/forms-probe.mjs` as committed in `b8453c23d` read nothing: the
div's inline `border: … red` outranked the injected sheet, so every form read
`rgb(255, 0, 0)`. Its base border moved into a `<style>` and it ran again
(`fix-3/logs/forms-{chromium,webkit-2311,webkit-2287}.log`):

| form | Chromium | WebKit 2311 | WebKit 2287 |
|---|---|---|---|
| two nested translucent arms (O-227's control) | 6.5% | **page crashed** | 6.5% |
| nested arm over a relative-colour arm | 6.5% | 6.5% | 6.5% |
| two relative-colour arms of an opaque ink | 6.5% | 6.5% | 6.5% |
| through `var()`: token mix over relative ink | 6.5% | 6.5% | 6.5% |
| through `var()`: relative token over relative ink | 6.5% | 6.5% | 6.5% |
| token over `transparent`, typed ratio | 6.5% | 6.5% | 6.5% |

The relative-colour collapsed arm survives both WebKit builds, so D-1 is cured by the plan,
not waived.

**Cure (`fd9452769`).**
- `shell.css`: the expanded end's colour is `--_dock-edge-expanded-ink:
  var(--glass-border-dock)`.
- `dock.css`: the collapsed end is `rgb(from var(--foreground) r g b /
  var(--dock-plate-collapsed-edge))`. The default edge is `color-mix()` of the ink by
  t over that, which is 11.0.1's lerp with one side a relative colour. The host
  `-border` inputs keep their paths, and the `-by-collapsed` path now mixes from the
  ink as well.
- `morph.css` (held) and `adaptive-legibility.css` (static) set the ink to the
  floating strength as a relative colour. That is the tip's own held and static
  paint, unchanged.
- The CHANGELOG's opening paragraph no longer says the edge stops reading the token.
  The crash clause says the open end is still `--glass-border-dock` and that a host's
  value still colours it.

**Witness.** A new cell, `edge · a host's --glass-border-dock colours the expanded edge`.
It sets a literal `rgb(0 160 0 / 0.5)` and a preset-style `color-mix(in srgb,
var(--foreground) 55%, transparent)` on the dock, then reads t = 0, 0.5 and 1 against
the arithmetic premultiplied mix. It also checks that the page stays alive.

| tree | Chromium | coarse-touch | WebKit 2287 | WebKit 2311 |
|---|---|---|---|---|
| tip before the cure (`b8453c23d`) | **RED** (t = 1 reads the library's 8%) | **RED** | — | — |
| v11.0.1 | GREEN | GREEN | GREEN | **RED** (page crashed, as every edge cell there: O-227's RED) |
| cure | GREEN | GREEN | GREEN | GREEN |

The other three `edge ·` cells pass on the cure in all four projects: the page alive in
2311, 11.0.0's colour at t = 0, 0.5 and 1 in Chromium, and the two `-border` inputs.
Logs: `fix-3/logs/d1-*`.

## The README's thumb word (`ff6c21b7b`)

`README.md:65` now names `--foreground` as the thumb's colour when `--slider-thumb-bg` is
unset. The paint it describes is witnessed by `slider · the thumb paints` (critique 2: RED
on v11.0.1, GREEN on the tip). No new cell.

## The idle window to 6000 ms (`e12789fef`)

- `DOCK_COLLAPSE_DELAY_MS` is 6000. Its comment, and the comments in `useDockState.ts`
  and `useDockShellProps.ts`, no longer carry the old number.
- The dock README says `(6000 ms)`; the release-10-1-5 README gate reads it from the
  constant.
- The CHANGELOG has a clause in consumer words.
- Two specs waited on the old window. `m3 O-176` waits 8 s where it waited 6, and the
  11.0.2 idle-fold layout cell reads from 5.4 s to 7.9 s where it read 3 s to 5.5 s.
- Witness: `tests/components/custom/dock/GlassDock.idle-window.test.ts` (the constant is
  6000; a hovered dock the pointer leaves is open at 5.9 s and folded at 6.1 s).
  - v11.0.1: **2 failed** (`fix-3/logs/idle-v1101.log`).
  - Tip: 2 passed; the dock's 26 unit files pass, 228 passed, 1 expected fail
    (`idle-tip*.log`).
  - `m3 O-176` and the idle-fold cell are GREEN on the tip in Chromium, and `m3` in
    WebKit 2287 (`idle-tip-{ch,wk}.log`).

## Item 9 as restated (`ea27f9a36`)

- A harness, `tests-visual/release-11-0-2/popover-harness.ts`: a collapsible dock with a
  click Popover in its own slot content, `keep-dock-open`, its content teleported to the
  body.
- One cell, `hold · a keep-dock-open Popover in the dock's slot holds it past the idle
  window and closes with it`. It opens the Popover from its seat and moves the pointer
  off both. At 7.5 s the dock is still expanded and the Popover still open. After the
  exposed `collapse()`, both are closed.
- GREEN on the tip in Chromium, coarse-touch and WebKit 2287, and GREEN on v11.0.1, as
  the ruling expects: it is not a glass fault.
- To check that the cell reads the hold, I ran it once with `keepDockOpen: false` (a
  temporary harness edit, reverted before the commit). It fails at "7.5 s after the
  pointer left" (`hold-control-nohold-ch.log`).
- The dock README has the paragraph "Controls contributed from outside the dock's tree":
  the context follows the component tree, so it does not cross a `Teleport` from another
  component. It gives the interim recipe (a template ref, `keepOpen()` while the overlay
  is open, `release()` when it closes, and a watch on `expanded`).

## O-271: returned open after two attempts

The witness is build seat C's reverted `rows ·` cells and harness (`cbe498028`),
restored for the reading and kept in `fix-3/o271/`. They are not in the spec, since no
cure ships. On the tip they are RED in Chromium and coarse-touch: transport 286/278,
316/308, 898/894; editor 172/168. Stretched is GREEN (`o271-tip-red-chco.log`).

**Two causes.**
- (A): the 4 px after a leading persistent region.
- (B): the zeroed end padding. It makes a child that fills the run (a definite face or
  `width: 100%`) end at the client edge, with the trailing ring box past it.

Read with (A) alone (`attempt-A-only.run.css.diff`): the four WebKit cells stay GREEN,
and transport and editor are still 4 px over (`o271-a-*`). Both remaining overflows are
(B).

**Attempt 1** (`attempt-1.run.css.diff`): (A); the run's end padding restored; the
trailing box laid in it by a `-reserve` end margin, with a whole-reserve floor so it never
yields.
- Chromium: all 13 cells GREEN (the nine rows, k3 twice, s2 at 1440 and 390).
- WebKit 2287: the rows GREEN; **k3 at 320, s2 O-201 at 1440 and s2 at 390 RED**. The
  k3 reading is `focus S4 … "past":{"r":0.94} … "seat":[204.8,308.94,…]`, the same 0.94
  px as build C's revert (`o271-t1-*`).

**Attempt 2** (`attempt-2.run.css.diff`): (A); the end padding restored; the trailing box
with no negative end margin. Its margin box ends at the last seat, and `position:
relative; inset-inline-start: reserve` carries its border box past it.
- WebKit 2287: the rows GREEN, **the same three cells RED by the same 0.94 px**
  (`o271-t2-wk.log`).

**What the two attempts show.** The trailing box's form is not the variable. Whenever the
run's end padding comes back, which is what a face sized to the row needs, WebKit's reach
leaves a fractional end seat 0.94 px short of its ring. As the ruling says, I stopped
there and shipped neither half: `run.css` is the tip's, and (A) alone does not cure
fourier's rows. Open for the orchestrator.

## O-295: the reproduction and its one bounding cell

**Reproduction** (`fix-3/o295-probe.mjs`, `056489b32`). It reads eight dots through hops
of 1, 3, 3 and 7, with the library's rem token and with a host's 10 px and 16 px on the
component. It runs on both trees, in Chromium and WebKit 2287. The widest neck against
the hop plus one dot:

| tree | token | hop 1 | hop 3 | hop 7 |
|---|---|---|---|---|
| v11.0.1 | library `.75rem` | **301.1 / 40** (WebKit 299.5) | **739.2 / 96** | **1344 / 208** |
| v11.0.1 | host 10 px, 16 px | 18.8 / 38, 44 | 46.2 / 94, 100 | 84 / 206, 212 |
| tip | library `.75rem` | 18.8 / 40 | 46.2 / 96 | 84 / 208 |
| tip | host 10 px, 16 px | 18.8 / 38, 44 | 46.2 / 94, 100 | 84 / 206, 212 |

So the owner's rectangle is the rem token read as px on v11.0.1, exactly as daraksha
found. A host's px size was right on both trees, and the tip bounds every hop in both
engines (`fix-3/logs/o295-probe-*.log`).

**The cell** (`1a99c064c`): `pager · on the default token a hop of 1, 3 or 7 paints a
neck no wider than the hop plus a dot`, on eight dots and the library's rem token
(`.5rem` on coarse touch). The harness gained `?count=` and `?size=`; its defaults are
unchanged.

| tree | Chromium | coarse-touch | WebKit 2287 |
|---|---|---|---|
| v11.0.1 | RED (300.7 against 40.5) | RED | RED (300.2 against 40.5) |
| tip | GREEN | GREEN | GREEN |

## O-282: the vertical dock's hover-only `will-change`

`fix-3/o282-probe.mjs` covers the hover harness's vertical dock in pill, rounded and
card, at a device scale factor of 2. It reads three states:
- at rest;
- at rest with `will-change: transform` forced on the root (the promotion alone);
- hovered on the dock's own padding, away from every seat.

Each state reads the root's and every seat's box, every seat's first text line box, and a
screenshot diffed against rest (`fix-3/logs/o282-probe-tip-*.log`).

- **Boxes and baselines: 0 px in every state, every shape, both engines.**
- Chromium, pill: the promotion re-rasters 309 of 471960 pixels by at most 3 levels a
  channel, with or without the hover; rounded and card: 0 pixels. Back at rest: 0.
- WebKit 2287: 0 pixels changed in every state. The hover on the padding left
  `will-change` at `auto` there, so the forced state is WebKit's only promoted reading.

The hint moves no box and no baseline in either engine. Its only effect is a sub-level
re-raster of a few hundred edge pixels in Chromium.

## The master merge (`b42405920`)

Master's `4db0b22dd` and `ee1dc2935` came in by `git merge master`. The one conflict was
`.bundle-ratchet`, which kept the branch's datum for the rebind. The two renamed unit files
(`GlassDock.stagger.browser.test.ts`, `slider.size-tokens.browser.test.ts`) carry the
branch's content byte for byte. No gate this seat added reads a docs file.

## Gates on the merged tip (`b42405920`)

`fix-3/scripts/gates.sh`, logs in `fix-3/logs/`.

| gate | exit | read |
|---|---|---|
| `npm run typecheck` | 0 | |
| `npm run build` | 0 | `glass-ui:ready`, 64 public declaration entries |
| `npm run demo:dist:build` | 0 | built |
| `CI=true npx vitest run --maxWorkers=2` | 0 | 277 files, 2532 passed, 10 expected fail, 1 skipped |
| `npm run test:browser` | 0 | 2 files, 12 passed |
| `npm run verify:package` | 1 | only `G-BUNDLE-RATCHET`: 2916314 < 2916696, the shrink the rebind takes |

## The tip sweep (`b42405920`): unfinished, guarded refused

`fix-3/scripts/sweep.sh`:

| leg | read |
|---|---|
| 11.0.2 spec and the forced-colors spec, Chromium and coarse-touch | **93 passed, 17 skipped, 0 failed** (`sweep-chco`) |
| release-10-1-2 to -5 and the six release-11-0-1 specs, Chromium | **300 passed, 0 failed** (`sweep-ch`), release-10-1-5 and the release-10-1-2 reversal titles among them |
| the WebKit legs (2287 and 2311: the 11.0.2 spec, forced colors, 10-1-2, 10-1-5; then the 11.0.1 specs, 10-1-3, 10-1-4) | **not run**: `[guarded] REFUSED: disk low (2026-11-14 15:23:46 free=37G (set below 40G; clears above 60G))` (`sweep-wk-a.log`, `sweep-wk-b.log`, `rc=75`) |

As the task orders, I stopped at the refusal. At 15:31 the volume had 43G free, still
under the 60G that clears it. No server, browser or run of this seat is left (ports 5341
to 5346 free).

**The ratchet is not rebound.** It is to be rebound last on the tree that will be tagged,
after the WebKit legs. The committed tree packs **2916314** bytes
(`verify-package.log`), 382 under the datum. The next seat runs `sweep.sh`'s two WebKit
lines, then writes 2916314 (or the tree's own figure, if anything changes) to
`.bundle-ratchet` and runs `npm run verify:package` once more.

Since the merge, this seat's WebKit readings are only the targeted cells above: D-1's
four `edge ·` cells in 2287 and 2311, `m3 O-176`, the `hold ·` cell, both `pager ·`
cells, and the four O-271 ring cells (GREEN on the tip's `run.css`, `o271-a-wk`). All of
them ran on the tree before the merge, which changed no `src` file.

## Open, for the orchestrator

- **O-271** is open (above). fourier stays on 11.0.0 until a mechanism keeps a
  fractional end seat's ring inside WebKit's reach with the run's end padding counted.
- **The `--glass-border-floating` hook** (from this seat's first attempt, not on the list).
  v11.0.1's collapsed end, and the held and static expanded end, read that token. The tip
  reads the `--glass-edge-floating` strength. It is not built here.
- Not measured: real Safari; v11.0.0.
