# 11.0.1 — the merge of release/10.1.5 onto 11.0.0

Seat: claude-opus-5-5 (the merge seat). Branch `release/11.0.1`, cut from `master` at
`993c93d08` (v11.0.0 is `60ce8d49f`, an ancestor). Merged: `release/10.1.5` at its tip
**`ada7d8a8b798d51e9724fb26a213c3eb2f0d554a`** ("10.1.5 CHANGELOG — the round-7 behaviour
cures get entries …"), with `git merge --no-ff`. Merge base: `fd494d7ab` (v10.1.4's
CHANGELOG cut).

Read first: `orchestrator-note-fable-review.md` (item 2's list, items 3-8),
`critique-16.md`, `fix-12.md`, `fix-13.md` (fix 14 and fix 15 have no record file; their
commits `147c79cf9` and `86c68aa50` are CHANGELOG prose only), and the 10.1.5 and 11.0.0
CHANGELOG sections.

Every build, test and browser run went through `~/.claude/guard/guarded` (WebKit 2287
under `--exclusive webkit`), one at a time. Drivers: `scripts/gates.sh` (the five gates),
`scripts/chain.sh` (the browser witnesses, one guarded call per chain). Logs: `logs/`,
browser rows `runs/` (`runs/runs.txt` lists every run with its load).

## The conflicts, file by file

Twelve files conflicted, as the brief predicted. For each: what each side carried, and
how it resolved. "10.1.5" is `ada7d8a8b`, "11.0.0" is `master`.

### `src/components/dock/composables/dockMorphMeasure.ts` (three hunks)

- 11.0.0 carried three perf changes: a capture at rest reads the resting posture's
  endpoint as the root's own box (no overrides); a pane mutation re-observes and lets the
  ResizeObserver's delivery capture (`if (!observer) capture()`); the attach capture rides
  the observer's first delivery.
- 10.1.5 carried the endpoint hold (`restEndpoint`, `constraintOf`, `hostMoved`,
  `ENDPOINT_BAND_PX`), `publishYield` (the `data-run-fits` flag and
  `--dock-run-room-block`), the root-style observer, the cross-extent observer
  (`--dock-plate-cross-px`) and the seat observer (`--dock-seat-max-*`).
- Resolved: both. One rest test (`morphing`), with 11.0.0's `rootNow` read for the
  resting posture's endpoint, then 10.1.5's hold and `publishYield`. Mutations and attach
  keep 11.0.0's observer-delivery capture; 10.1.5's root-style observer stays.
- Two 10.1.5 pieces could not stand on 11.0 as written:
  - **The seat observer is deleted.** It existed to size the run's reserve for a seat's
    hover scale (`--scale-hover-dock`, 1.1). 11.0.0 deleted that token and every hover
    scale, so the reserve formula named a token that no longer exists (its `calc` would
    have been invalid at computed time). The reserve is now the ring alone,
    `round(up, var(--dock-ring-reserve), 1px)`, which is what 11.0.0 reserved; with nothing
    left to read, `--dock-seat-max-inline-px`/`-block-px` and their observer go.
  - **The cross extent rides the observer's delivery.** 10.1.5 read the plate's
    `offsetWidth`/`offsetHeight` synchronously at attach, which is the forced layout inside
    Vue's flush that 11.0.0 removed (one per figure dock on a dashboard scroll). 10.1.5's
    own comment says the ResizeObserver's border box reaches the first paint, so the
    synchronous read now runs only when there is no ResizeObserver (h4 gates that case).

### `src/components/dock/composables/useDockClickIntegrity.ts` (three hunks) and `GlassDock.vue`

- 11.0.0: the approach scope (`approaching`, `flipByApproach`, `onPointerEnter`/`Leave`
  wired on the root): a mid-morph press defers only when a mouse that entered the dock and
  has not pressed opened it.
- 10.1.5: the re-aim arm (`pointerAt`, `flipAt`, `flipByPress`, `REAIM_PX` 6): a mid-morph
  press defers only when the hover dwell opened the dock and the press lands where the
  pointer stood at the flip.
- These cure the same thing two ways. **Kept one: the 10.1.5 re-aim arm**, which
  critique 16 gates (m3 "a press during the expand activates its seat once"). The
  approach scope, its two handlers and their two `GlassDock.vue` bindings are removed.
  The re-aim arm covers 11.0.0's cases: a press-opened flip passes (`flipByPress`), an
  owner-opened flip with no pointer seen passes (`flipAt` null), a touch tap that opened
  the dock is a press. Residual, recorded: a touch user whose last touch in the dock was
  within 6 px of a row, when the owner then opens the dock, has that row's mid-morph tap
  deferred to the settle.
- 11.0.0's vitest `GlassDock.click-integrity.test.ts` "the approach scope" block is
  restated for the re-aim arm: its hover case now moves the pointer before the expand and
  presses at that spot (a synthetic `pointerenter` alone is not a pointer position).

### `src/components/dock/styles/run.css` (two hunks) and the dock's corner

- 11.0.0: the stadium dock's cap rests on `--radius-dock` (1rem) and cuts to `--radius-xs`;
  the series prose names no stadium.
- 10.1.5: `--dock-cap-rest: calc(var(--dock-plate-cross-px) / 2)`, cut `--radius-card`;
  the plate's resting corner is `--dock-cap-rest`.
- Resolved to 10.1.5's values and prose (critique 16 invariant 1 gates them; the owner's
  "squared end" is the 11.0.0 form). On 11.0 that is not enough by itself, because the
  dock's own box no longer carries a stadium: `--radius-dock` is 16 px, so the box's inset
  rim and shadow would keep 16 px corners under a 28 px plate, and 11.0.0's collapsed rules
  (`--radius-circle`; `--radius-dock` beside a persistent seat) would draw the collapsed
  box apart from its plate. So the stadium rule moves from the plate to the box
  (`.glass-dock.shape-pill { border-radius: var(--dock-cap-rest) }`, the plate inherits it,
  as `dock.css` intends), `shell.css`'s `.glass-dock.vertical.shape-pill { --radius-pill }`
  is deleted (the same rule covers both axes), and morph.css's two collapsed rules take
  `:not(.shape-pill)`: the rounded and card shapes keep 11.0.0's circle and bar exactly.
  11.0.0's `dock-hover-corner.test.ts` I-3 block is restated to that form.

### `src/components/dock/styles/controls/icon-button.css`, `tab-button.css`, `src/styles/glass/glass-capsule.css`

- 11.0.0: no hover scale on any dock control or on `.glass-capsule-hover` (the owner's
  "less flashy"), and the token is deleted.
- 10.1.5: the hover arms gated on `@media (hover: hover)`, still carrying the scale.
- Resolved: the gate stays, the scale stays gone. Comments combined.
- **The seat corner (not a textual conflict).** The owner's oval hover plate is 11.0.0's own:
  it moved `.dock-icon-button` to `--radius-circle` (50%), an ellipse on any wide seat (a
  compact label seat, 92 x 36 on daraksha). 10.1.5 never had it, because there the seat read
  `--radius-pill`, 9999 px, a stadium. Nothing in the merge brings that forward, so the
  cure is written here: the seat's default corner is half the control size,
  `calc(var(--dock-control-size, var(--size-icon-btn)) / 2)`, a circle on the icon cell and,
  through the engine's clamp to half the shorter side, a capsule on a wider seat.
  `--dock-control-radius` still wins. No literal 9999 px returns.

### `src/components/dock/composables/useDockRun.ts` (auto-merged; one line changed after the witness)

The ring reserve shrinking from 7 px (10.1.5: ring plus the hover overhang) to 4 px (the
ring alone) exposed reach's whole-pixel slack: `occluded` let a seat sit one pixel into
the reserve before reaching, which on 10.1.5 hid inside the 3 px of overhang room and on
11.0 cuts the ring by that pixel. The first Chromium pass of s2 read it at exactly one cap
per width (1440: cap 273, the end seat's ring cut 1.11 px with a 1 px scroll range left
unused; 390: 0.80 px), reproduced alone, and a probe sweep showed reach staying at 0
where the range was 1 px and reaching from 2 px up. The slack is now half a pixel (the
fractional scroll offset against whole-pixel `offset*`), which still stops a ~0 px glide.
After it: s2 GREEN at both widths (`runs/round1/merged-s2rerun-ch.log` before, `runs/round1/merged-s2fix-ch.log` after).

### `src/components/dock/composables/useDockState.ts` (auto-merged; one line added after the witness)

10.1.5 arms the idle window at mount for a dock mounted `collapse="open"`; an interaction
clears or re-arms it through the hover and focus handlers. A touch pointer fires neither,
so 11.0.0's own witness `u-b7.spec.ts` "a touch drag pans the run and not the page"
(Chromium coarse, an open-mounted vertical dock panned by eight CDP swipes over ~10 s)
went RED on the merged tree twice: the dock folded mid-pan at 3.6 s (a probe read
`is-leaving` and `data-morphing` on the fourth swipe), and the run's range was read off
the folded dock. GREEN on v11.0.0 (`runs/v1100-ub7-ch.log`), which never armed the window
at mount. Cure: a press inside the dock restarts an armed idle window
(`onPressStart`: `if (collapseTimer) scheduleCollapse()`). A mouse inside the dock has
already cleared the window at `mouseenter`, so only a pointer that never enters (touch,
pen without hover) reaches it.

### `src/components/dock/README.md`

11.0.0 added `expandOn`, `anchor`, `collapsedLabel` rows and their paragraph; 10.1.5
rewrote the collapse paragraph (the `"open"` idle window, the exposed methods, the
static plate). Both kept: the three rows, 10.1.5's collapse list, 11.0.0's paragraph, then
10.1.5's run and static-plate paragraph. m3 O-159 (README names every `DockProps` member)
reads it.

### `tests/components/custom/dock/g-dock-lattice.test.ts` (three hunks)

10.1.5's cap-rest assertions (a length, never `%`) kept; the chrome-latch detector
restated to the merged `capture` (`morphing`, then 11.0.0's `rootNow`). The reserve
assertion (not a conflict, but naming `--scale-hover-dock`) is restated to the ring
reserve.

### `CHANGELOG.md`, `package.json`, `package-lock.json`, `.bundle-ratchet`

- CHANGELOG: both sections kept in version order (11.0.0, then 10.1.5, then 10.1.4), and
  a new 11.0.1 entry on top, in consumer prose.
- package.json: `11.0.1`. Lockfile: master's, with the two root version fields at
  `11.0.1`, then `npm install --package-lock-only --offline` (no further change).
- `.bundle-ratchet`: rebound on the committed tree at the close (below).
- The release workflow, scripts and `deploy-demo.yml` are master's (the merge touched none
  of them).

### Auto-merged, read against 11.0.0's breaking list

10.1.5's `src` names none of 11.0.0's removed names (`DockBackdropMode`, `MenuTrigger`,
`deform`, `squishOnTravel`, `activeValues`, the indicator constants and tokens,
`data-eyeglass-*`, `dist/glass-ui.css`) except `--scale-hover-dock`, handled above.
`DropdownMenuTrigger` in the critic harnesses is a part, unchanged in 11.0.
`dockMorphMeasure.test.ts` "a capture keeps the run's scroll position": 10.1.5's
`vi.waitFor` never delivered the test ResizeObserver, which is where 11.0.0's capture runs,
so it now settles (mutation timeout plus delivery) inside the wait.

## The release spec on 11.0 (what was restated, and why)

`tests-visual/release-10-1-5.spec.ts` came across with the merge and read 11.0.0's
deliberate changes as failures in two places. Both are restated to the 11.0 contract; no
cell is skipped.

- `expectHoverScale` asserted that a seat is hover-scaled on a hovering pointer. 11.0.0
  removed hover scale (g1, c4, e1, e2, e3 read it). It now asserts the rest scale on every
  pointer.
- e4 and k3 asserted that a dock capped a few px under its natural width scrolls nothing.
  On 10.1.5 the reserve was 7 px (ring plus hover overhang), so a 4 px cap fell inside the
  yield; on 11.0 the reserve is the 4 px ring, so there is no yield room past the ring
  floor, and the cell is the ring band critique 16 already gates through `fitLaw`
  (s2). They now assert the fit law (flag set, scroll at most the ring floor's shortfall,
  plate round, no seat cut past the bound) with the focused end ring whole.

## The witnesses

The final rows are in `runs/` (`runs/runs.txt`, `runs/queue.txt`); the earlier passes that
found the two post-merge cures above and the spec restatements are kept in `runs/round1/`
and `runs/round2/`. "v11.0.0" is a `git archive v11.0.0` tree inside this worktree
(`./v1100`, node_modules linked, the 10.1.5 release spec, its harness, the 11.0.1 spec and
the daraksha pages copied in, the 11.0.1 WebKit config added), deleted when done. Engines:
Chromium headless (`chromium-headless-new`) and Playwright WebKit 2287
(`release-11-0-1.config.ts`, under `guarded --exclusive webkit`). Exit codes are
Playwright's.

| witness | merged, Chromium | merged, WebKit 2287 | v11.0.0, Chromium | v11.0.0, WebKit 2287 |
|---|---|---|---|---|
| owner cells `release-11-0-1.spec.ts` | 9/9, exit 0 | 9/9, exit 0 | 0/9, exit 1 | 0/9, exit 1 |
| 10.1.5 release spec, part A (84) | 84/84, exit 0 | 84/84, exit 0 | 8 pass, 76 fail, exit 1 | 9 pass, 75 fail, exit 1 |
| 10.1.5 release spec, part B (23) | 23/23, exit 0 | 23/23, exit 0 | 7 pass, 16 fail, exit 1 | 7 pass, 16 fail, exit 1 |
| g6 `release-10-1-4` | 23/23, exit 0 | 15 + 8 skips, exit 0 | (11.0.0's own gate) | |
| g6 `release-10-1-3` | 59/60, exit 1: D-1 at load 15 (below) | 58 + 2 skips, exit 0 | (11.0.0's own gate) | |
| `u-b7.spec.ts` (11.0.0's own witnesses; Chromium desk and coarse) | 21 + 1 skip, exit 0 | no WebKit project | 21 + 1 skip, exit 0 | |
| daraksha pages (a reading) | 2/2 mounted, exit 0 | 2/2, exit 0 | 2/2, exit 0 | 2/2, exit 0 |

The release spec ran as two Playwright processes per engine (part A and part B, split by
title as critique 16 did), so 107 cells per engine in all: **107/107 in Chromium and
107/107 in WebKit 2287 on the merged tree.** No 11.0.0 release spec exists under
`tests-visual` (the 11.0.0 close ran the 10.1.3 and 10.1.4 specs and `u-b7.spec.ts`), so
those three are 11.0.0's gate here.

On v11.0.0 the cells that pass are guards that hold on both lines, recorded, not
forced: h1 (both presets), h3, k3, m5 light, m3 "a press during the expand activates" (both
viewports), n1 (both), p1 (both), q2 (both widths), u1 (and k3 a second time in WebKit). Every
cell the owner named is RED there.

### The owner's named cells

Readings are the computed corners (`border-*-radius`) and the layout box. Captures are
crops of the dock or the seat, banked by the spec (`OWNER_OUT`).

**A wide label seat's hover and active plate is a capsule** (his "Focus" frame,
`~/.dev-logs/owner-1111/shots/10.png`, and "Name ›", `~/.dev-logs/owner-1110/shots/1.png`).

| cell | merged (both engines) | v11.0.0 (both engines) |
|---|---|---|
| "Focus" compact seat, hovered (80 x 35) | `20px` x 4, a stadium (clamped to 17.5) | `50%` x 4, an ellipse |
| "Name ›" active seat, rest and hovered (91 x 35; 88 in WebKit) | `20px` x 4 | `50%` x 4 |

Captures: `runs/owner-merged-ch/o1-focus-hover-chromium-headless-new.png`,
`runs/owner-merged-ch/o1-name-hover-chromium-headless-new.png` (and `-rest-`), the WebKit
pair under `runs/owner-merged-wk/`; v11.0.0: `runs/owner-v1100-ch/` and `runs/owner-v1100-wk/`,
same names.

**The dock's end is round** (his frame `~/.dev-logs/owner-1111/shots/1.png`). Plate
corners, then the box's own; 56 px tall, so half is 28.

| cell | merged (both engines) | v11.0.0 Chromium | v11.0.0 WebKit |
|---|---|---|---|
| open at rest | plate 28 x 4, box 28 x 4 | 16 x 4, box 16 | 16 x 4, box 16 |
| collapsed, a persistent seat beside the summary (102 x 56) | plate 28 x 4, box 28 x 4 | plate `16 4 4 16`, box 16 | plate `16 4 4 16` |
| open on the narrow face, `#persistent-end` | plate 28 x 4, run scroll range 0 | plate `16 4 4 16`, run scrolls 143 px | `16 4 4 16`, 140 px |
| the three above with `--radius-dock: 1.875rem` (daraksha's) | 28 x 4 everywhere | `30 4 4 30` collapsed and narrow | the same |
| every frame of the expand, then the collapse | Chromium 71 + 76 morph frames, WebKit 54 + 49: no frame off 28 x 4 | expand frames `16 5.75 5.75 16`, then 16 x 4 | `16 6.5 6.5 16`, then 16 |

Captures: `runs/owner-merged-ch/o2-{open,collapsed,narrow}-{house,rd}-chromium-headless-new.png`
and `o3-expanded-…`, the WebKit set under `runs/owner-merged-wk/`; v11.0.0 under
`runs/owner-v1100-{ch,wk}/`.

### daraksha's two repro pages

Run read-only from `~/Programming/daraksha-wt/o1110-finish` (the branch's worktree;
commit `34dd4f8`), copied into `daraksha-repro/` with one change each: the dock import is
this tree's source (`@glass/components/dock`) and the stylesheet is this tree's demo
cascade, so the pages ran against the merged source and, in the v11.0.0 tree, against
v11.0.0's. The page's own `#readout`:

| page | merged (both engines) | v11.0.0 |
|---|---|---|
| `dock-cutcap.html?radius-dock=1.875rem&active=page&end=1`, collapsed | box and plate `28px` x 4, run overflow 0, seat 90 x 35 at `20px` | plate `30 8.33 8.33 30` (Chromium), `30 11.04 11.04 30` (WebKit), the collapsed run still scrolls 40 / 35 px, seat at `50%` |
| the same, opened | 28 x 4, run overflow 0 | plate `30 4 4 30`, run overflow 142 / 137 |
| `dock-press-scroll.html` under reduced motion: open, then a quick press on Again | presses 1, scrollLeft 0, the run 113/113 (nothing to scroll) | presses 1, scrollLeft 0, the run 284/105 (Chromium), 281/105 (WebKit) |

The press-scroll defect (booked for 11.0.2) did not reproduce in either tree with
Playwright's mouse: the press landed both times. What changes is its precondition: on the
merged tree the active narrow layer's scroller no longer carries the hidden wider layer's
range (113 = 113), so it has nothing to scroll and nothing to zero; on v11.0.0 it scrolls
179 px. Not cured here, only read.

### D-1 in Chromium, read as an A/B

`release-10-1-3.spec.ts` D-1 ("the summary glyph holds its box through the expand" under an
ancestor zoom of 1.25) failed once per final Chromium pass at 1-minute loads of 15 to 20
(largest step 2.04 and 2.28 px against 2). The fable note's item 2 reads D-1 only at a load
under 10 and only as an A/B against the base. `scripts/d1-ab.sh` ran every D-1 cell (31)
alternately on the merged tree and on v11.0.0, three rounds each, at loads 8 to 10:
**31/31 in all six runs, both trees** (`runs/d1-ab/ab.txt`). WebKit 2287 passed D-1 in the
final pass at load 9 to 12.

## Gates (on the committed merge `81486dbd2`)

`scripts/gates.sh g2`, each step its own guarded call (none refused); logs `logs/g2-*`:

| gate | exit |
|---|---|
| build | 0 |
| typecheck | 0 |
| demo:dist:build | 0 |
| vitest | 0: 270 files, 2511 passed, 10 expected fail, 1 skipped |
| verify:package | 1 at first: the bundle ratchet, 2910925 > 2897947 (+12978 B, 10.1.5's code over 11.0.0's) |
| verify:package after the rebind | 0, `CLEAN` (`logs/g2-verify-rebound.log`) |

`.bundle-ratchet` is rebound from 2897947 to **2910925**, measured on the committed tree.
The first gate pass (`logs/g1-*`, before the post-merge cures) had the same order of
results except vitest's `boot-graph` gate, which needs `dist-demo` and ran before
`demo:dist:build` there; the driver now builds the demo first.

## Not done here, recorded

- The dev server logs a failed dependency scan (92 unresolved imports) on every start:
  the 10.1.5 critic harnesses `tests-visual/release-10-1-5/critic-*-v1014.ts` import from
  `./v1014/`, a v10.1.4 source copy that was never committed. Vite falls back to lazy
  discovery; no witness depends on those files. They came across with the merge as
  10.1.5 committed them.
- The touch residual of the one click guard (above).
- Real Safari: not measured; every WebKit cell is Playwright WebKit 2287.
