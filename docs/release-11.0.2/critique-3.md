# 11.0.2 critique, round 3

Seat: a fresh adversarial critic, claude-fable-5-2, 2026-11-14. I built nothing on this branch.
Read: `git log v11.0.1..release/11.0.2`, the three build records, critiques 1 and 2,
`fix-2.md`, `fix-3.md`, the eight orchestrator notes and the frozen scope.
Tip under test: `8014614e4`, with no change to `src`, `tests`, `tests-visual`,
`package.json`, `.bundle-ratchet` or `CHANGELOG.md` in the working tree. Every run went
through `guarded`, each WebKit run under `--exclusive webkit`, one browser a run,
`--workers=1`, one heavy run at a time; no run was refused. Paths are relative to
`docs/release-11.0.2/` unless they start with `src`, `tests` or `tests-visual`.

## Verdict

**Measured to the end. Not ready to tag: two defects.**

| # | item | reading |
|---|---|---|
| 1 | every landed row's witness RED on v11.0.1, GREEN on the tip | GREEN in Chromium, coarse-touch, WebKit 2287 and WebKit 2311. Every cell critique 2 left unread is read. One WebKit cell failed in the sweep on a lost page and is 5 of 5 alone |
| 2 | release-10-1-5 107/107, release-10-1-2/-3/-4 no new failing title | GREEN: 107/107 in both engines; no title of -2, -3 or -4 fails in either |
| 3 | the release-11-0-1 specs | Chromium: all 58 GREEN. WebKit: the owner cells 9/9, fix-2 14/14, critic 1 22/22, critic 1b 2/2, daraksha 2/2; **critic 2's pixel reader 7/9, its two vertical cells RED on the expand's first frame (D-2)**. The same frame is RED on v11.0.1 |
| 4 | nothing removed or renamed | exports, file list and declarations hold; no custom property is deleted; **one host hook stopped working (D-1)** |
| 5 | typecheck, build, demo:dist:build, vitest, verify:package | GREEN: all five exit 0, and `test:browser` |
| 6 | the CHANGELOG entry | outward prose, every clause read true; **silent on D-1** |

## How it was run

- The v11.0.1 tree is `.cache/red-v11.0.1/tree`. Its `src/` is byte-identical to a fresh
  `git archive v11.0.1 src` (`diff -rq`, run first). The tip's 11.0.2 spec, config,
  harnesses, forced-colors spec and unit witnesses were copied onto it by my scripts.
- Each Playwright call brought its own vite through the config's `webServer` (5341 the
  tip, 5342 v11.0.1), `GLASS_UI_DEMO_URL` set; the probes served on 5343 and 5344.
- Scripts in `critic-3/scripts/` (`chain.sh`, then `chain2.sh` to `chain4.sh`), logs and
  JSON reports in `critic-3/logs/`, one line a run in `critic-3/logs/chain.out`, each
  `rc=` the run's own exit code. `cells.py`, `why.py` and `ann.py` are critique 2's;
  `c2rows.py` prints the pixel reader's off-round frames.
- Every RED and GREEN below was read twice: the run's counts, then the failure text, the
  recorded reading or the capture.
- No server, browser or run of this seat is left (ports 5341 to 5346 free).
- The captures named below are on disk in `critic-3/capture/` and `critic-3/select/*/png/`;
  the repository ignores `*.png`, so they are not in the commit.

## 5. Gates on the committed tree (`8014614e4`)

| gate | exit | read |
|---|---|---|
| `npm run typecheck` | 0 | both `vue-tsc` passes |
| `npm run build` | 0 | `glass-ui:ready`, 64 public declaration entries |
| `npm run demo:dist:build` | 0 | built |
| `CI=true npx vitest run --maxWorkers=2` | 0 | 278 files, 2535 passed, 10 expected fail, 1 skipped |
| `npm run test:browser` | 0 | 2 files, 12 passed |
| `npm run verify:package` | 0 | `terminal: CLEAN`, 196 claims, 460 declarations, roster 291 of 291, packed 2916685 bytes, the ratchet's datum |

The installed `reka-ui` is 2.10.1, the new floor, so the full suite above is also the
second row's "unit suite green on the floor version".

## 1. Witnesses

### Unit witnesses

Eleven files on v11.0.1, ten on the tip (`critic-3/logs/units-{v1101,tip}.log`):
**v11.0.1 22 failed, 63 passed, every file red; the tip 85 passed, 0 failed.** By file on
v11.0.1: `useGlobalDark` 3, `blob-breath` 2, `dockMorphMeasure` 3, `g-dock-lattice` 2,
`GlassDock.idle-window` 2 (3600 against 6000; folded at 5.9 s), `worm-dot-px` 1 (302.2
against 40), `Slider.loupe` 1 (the default grasp mounts the lens), `slider.size-tokens` 3,
`slider-thumb-bg` 2, `overlay-plate-inline-bound` 3, `open-input` RED at import. The
size-tokens file is a browser test on the tip and passes there under `test:browser`.

### The 11.0.2 cells and the forced-colors spec

`critic-3/logs/{v1101,tip}-chco.json`, `v1101-wk.json`, `tip-wk-a.json`. "ch" is
chromium-headless-new, "co" coarse-touch, "wk" WebKit 2287, "w3" WebKit 2311. Counts:
the tip 95 passed and 17 skipped in ch and co, 52 of 53 and 3 skipped in wk, 50 and 3
skipped in w3; v11.0.1 52 failed in ch and co, 76 failed across wk and w3.

| row | cells | v11.0.1 ch / co / wk / w3 | tip ch / co / wk / w3 |
|---|---|---|---|
| O-223 with O-244, `dark ·` | 2 | RED in all four (`isDark` false; the store holds `auto`) | GREEN in all four |
| O-267, forced colors | 3 | RED / RED / RED / not matched (`outlineStyle: none`) | GREEN / GREEN / GREEN |
| the lens row, `lens ·` | 1 | RED in all four (lens 1, veil 1, the track's end 18.7% darker; wk 18.5%) | GREEN in all four (lens 0, veil 0, opacity 1, change 0) |
| O-232, `static · … no backdrop-filter` | 2 | RED in all four (20 offenders each) | GREEN |
| O-269, `fill · in dark` | 2 | RED in all four (hover −0.0044 and −0.0078 under the plate) | GREEN (hover +0.017 and +0.020 over it) |
| O-268, `fold · an idle fold` | 1 | RED / RED / skipped / skipped, see the note below | GREEN / GREEN / skipped (81 layouts over 75 morph frames) |
| O-273 and the thumb's default, `slider · the thumb paints` | 1 | RED in all four (`rgb(253, 245, 236)`, the card) | GREEN (`rgb(28, 25, 23)`, then the host's colour) |
| the thumb's read, `slider · a scrubber's thumb reads` | 3 | RED in all four (16 misses each) | GREEN |
| O-261, `pager · a neighbour hop` | 1 | RED in all four (300.8 px against 40.5) | GREEN in all four (18.8 px on a 28 px pitch; coarse 32.2 on 48) |
| O-295, `pager · on the default token` | 1 | RED in all four (299.8; w3 301.7) | GREEN (18.6, 46.2, 84 for hops of 1, 3, 7) |
| O-263, `wheel ·` | 2 | RED (the page moved 0 px; both axes `contain`); co skips the wheel cell | GREEN (300 px; `x: contain, y: auto`) |
| O-262, `rail ·` | 2 | RED in all four (454.6 px where 89 is allowed; crest 47 px off) | GREEN |
| O-270, `radius ·` | 2 | RED in all four (corner area 49.7 against 55.3) | GREEN |
| Slider geometry, `geometry ·` | 2 | RED in all four (371 misses) | GREEN |
| O-235, `blob · through a sweep` | 1 | RED in all four (peak 1.537; w3 0.814, against 0.3126) | GREEN (0.277; wk 0.280) |
| O-300 (a), `transition ·` | 1 | RED / skipped / RED / RED | GREEN / skipped / GREEN / GREEN |
| O-227, `edge · a GlassDock page` | 1 | GREEN / GREEN / GREEN / **RED (page crashed)** | GREEN in all four |
| the `-border` inputs and `--glass-border-dock`, `edge · a host's …` | 2 | GREEN / GREEN / GREEN / RED (page crashed) | GREEN in all four |
| O-240, `press ·` | 2 | GREEN / GREEN / GREEN / RED (page crashed) | GREEN in all four |
| O-241, `cutcap ·` | 2 | the same | GREEN in all four |
| O-282, `hover ·` | 13 | GREEN / skipped / GREEN / RED (page crashed) | GREEN / skipped / 12 of 13, then 5 of 5 / GREEN |
| O-288, `fold · … content stays inside the plate` | 4 | GREEN / GREEN / GREEN / RED (page crashed) | GREEN in all four |
| item 9, `hold ·` | 1 | the same | GREEN in all four |

On WebKit 2311 every dock-bearing page of v11.0.1 crashes at `page.goto` and every one
loads on the tip: that is O-227's RED and GREEN. The dock rows' RED in that column is
the crash; the rows without a dock fail there on their own assertions.

**The Select rows (O-212, O-213's cap, O-214)**, `o212/probe.mjs` on both trees
(`critic-3/select/`, `critic-3/logs/select-*.log`): v11.0.1 14 of 20, 2 of 4 and 0 of 4 in
Chromium and in WebKit (rows 31 and 245 px outside the plate at 386 and 600 px triggers;
the 358 px anchor's panel 352; the pointer-opened row ringed `solid 2px`); the tip 20 of
20, 4 of 4, 4 of 4, and 12 of 12 keyboard cells in both engines. Read in paint: at a
386 px trigger v11.0.1's highlighted row runs square off the plate's right edge with a
ring, and the tip's sits inside it with an even inset
(`critic-3/select/{v1101,tip}/png/*-webkit-o212-1440-light-tw386.png`).

**The reka-ui floor**: static. v11.0.1 declares the peer `^2.0` and the dev dependency
`^2.9`; the tip declares `^2.10.1` in both, the lock resolves 2.10.1, and the README's
peer table says the same. Fix seat 3's scratch copy is gone from `.cache/`.

**O-266** is a test-only restatement by ruling: the eight `O-101 · … reversal` and
`mid-expand` cells pass on the tip in both engines (item 2).

Rows whose witness is not RED on v11.0.1 outside WebKit 2311, each by a ruling or by the
row's own terms: O-240 and O-241 (closed by 11.0.1, kept witnesses); O-227 (its RED arm is
2311, above); the three host-input `edge ·` cells (RED on the trees that dropped the
inputs); O-282 (accepted as guarded); `hold ·` (ruled not a glass fault); O-288 (not
reproduced in glass; no note says it is accepted as O-282's was, see the gaps).

**Second readings.** Every v11.0.1 failure in Chromium fails on the assertion its row
names (`why.py`, the values above), with one exception: the `fold · an idle fold` cell
now reads from 5.4 s, the tip's window, so on v11.0.1, which folds at 3.6 s, it fails on
"no morph frame in the window" (0 where more than 10 is asked), not on the layout count.
I read it again with the wait set to 3 s in the v11.0.1 tree's copy only
(`chain3.sh`): **267 layouts over 73 morph frames where 85 are allowed**, RED on the row's
own claim (`critic-3/logs/fold-v1101-ch.json`). The copy is restored.

**The `hover ·` failure.** `hover · a vertical rounded dock, collapsed` failed once in
the WebKit sweep with `TypeError: Cannot read properties of undefined (reading
'filter')`: the cell's `window.__frames` was gone when it was read back, so no box was
compared. Alone at `--repeat-each=5` it is 5 passed (`critic-3/logs/hover-tip-wk`). It is
the same shape as the `fold ·` failure fix seat 3 saw in its sweep. Not a dock reading.

## 2. The older release specs on the tip

`critic-3/logs/tip-ch.json`, `tip-wk-a.json`, `tip-wk-b.json`.

| spec | Chromium | WebKit 2287 |
|---|---|---|
| release-10-1-5 | **107/107** | **107/107** |
| release-10-1-2 | 52/52 | 52/52 |
| release-10-1-3 | 60/60 | 58 passed, 2 skipped (the clickless touch-press cells) |
| release-10-1-4 | 23/23 | 15 passed, 8 skipped (`page.pdf` is Chromium's) |

The cell critique 2 could not read, `l1 a cap lifted under a run scrolled to its end rests
round (tab:Home,icon,icon,icon,tab:Settings)`, passed in the sweep in both of its
describes. The eight O-101 reversal and mid-expand titles pass in both engines, after
O-262. No title fails, so none fails that passes on v11.0.1.

## 3. The release-11-0-1 specs on the tip

| spec | Chromium | WebKit 2287 |
|---|---|---|
| release-11-0-1 (owner cells) | 9/9 | 9/9 |
| release-11-0-1-daraksha | 2/2 | 2/2 |
| release-11-0-1-fix-2 | 14/14 | 14/14 |
| release-11-0-1-critic-1 | 22/22 | 22/22 |
| release-11-0-1-critic-1b | 2/2 | 2/2 |
| release-11-0-1-critic-2 (the pixel reader) | 9/9 | **7 passed, 2 failed** |

By title: `o3 every frame of the expand and of the collapse paints a round end` passes in
both engines (Chromium 180 and 177 frames, 71 and 69 morphing, no bad frame; WebKit 97 and
94, 38 and 38, none). The four `f4 … the prerendered figure dock … no script: corners and
paint` cells pass in both. Critic 1's `c light-1440f`, unread in critique 2, passes. The
two failures are D-2.

## 4. Nothing removed or renamed

Against the published tarball (`npm pack @mkbabb/glass-ui@11.0.1`, unpacked in the
scratchpad) and this tip's build and `npm pack --dry-run --ignore-scripts`:

- **`package.json`**: `exports` (69 entries), `files`, `main`, `module`, `types`,
  `sideEffects`, `dependencies`, `engines` and `type` are equal. `peerDependencies`
  differs in one entry, `reka-ui` `^2.0` to `^2.10.1`, the ruled row.
- **File list** (889 against 891): ten content-hashed chunks changed their hash; two
  declaration files are new (`blob/composables/bodyBreath.d.ts`,
  `select/openInput.d.ts`). Nothing else is gone.
- **Entry exports**: the 128 `.js` and `.d.ts` export targets export the same names.
- **Declarations**: all 566 published `.d.ts` files are present. Seven differ; apart from
  comments the changes are `BODY_BOX_HALF` (new), `loupe` (new, twice),
  `storageKey?: string` (new) and `DOCK_COLLAPSE_DELAY_MS` 3600 to 6000 (the ruled value).
- **Custom properties** in `dist` (1152 declared against 1161): eleven new. Two are no
  longer declared by the library, `--dock-plate-expanded-border` and
  `--dock-plate-collapsed-border`, and both are still read, the ruled cure, held by the
  `edge · a host's …` cell in all four projects. `--glass-border-dock` is read again
  (`src/components/dock/styles/shell.css:153`). No custom property is deleted.
- **Read by nothing now**: `--corner-shape-thumb` (ruled to the next patch) and reka's
  own `--reka-select-trigger-width`.
- **One hook no longer reaches the dock: D-1.**

## 6. The CHANGELOG entry

Read clause by clause against the diff and the readings above. Outward prose; no internal
id; the heading holds the entry's only em dash. Checked in source or in a reading: the
one-shot `storageKey` and its throw; the concrete store with an `initialValue`; the
`Highlight` outline 2px out; `loupe` (default off, the lens and the frost together);
the peer floor and why (`unmountOnHide` from 2.10.0; the Popover contract test fails on
2.10.0 and passes on 2.10.1 in fix seat 3's logs); the one width rule; `data-open-input`;
the two edge strengths at 5% and 8% and the edge's colour unchanged at t = 0, 0.5 and 1;
`--glass-border-dock` and the two `-border` names still colouring their ends; the static
dock's controls; the Blob; "about 245 layouts over 67 frames" (267 over 73 here); six
seconds and `DOCK_COLLAPSE_DELAY_MS`; the dark fills at 8%, 11% and 14%; `--slider-thumb-bg`
and `Canvas` under forced colours; the worm's measure; the per-axis overscroll; the anchored
edge; the seat corner; the seat transition as a default; the thumb at the track's height
and its default from `--card` to `--foreground`.

No clause is false. One moved behaviour is unnamed: D-1.

## Defects

### D-1. A host's `--glass-border-floating` no longer colours the dock's edge (items 4 and 6)

On v11.0.1 the dock plate's folded end is `var(--glass-border-floating)`
(`shell.css`), and the open end of a held or a static dock is the same token
(`morph.css`, `adaptive-legibility.css`). On the tip all three read the strength
`--glass-edge-floating` through `rgb(from var(--foreground) …)`, and no dock rule reads
`--glass-border-floating`. Measured with `critic-3/floating-probe.mjs`, which sets
`--glass-border-floating: rgb(200 0 0 / 0.5)` on the dock's root
(`critic-3/logs/floating-{v1101,tip}.log`, Chromium):

| edge | v11.0.1 | tip |
|---|---|---|
| folded (t = 0) | `color(srgb 0.784 0 0 / 0.502)`, the host's | `color(srgb 0.11 0.098 0.09 / 0.05)`, the library's |
| static dock, open (t = 1) | the host's | the library's |
| token unset | 5% and 8% of the ink on both trees | the same |

This is the fault critique 1's D-2 and critique 2's D-1 were ruled on, for the third of
the three names: an input a host could set in 11.0.1 that the dock stops honouring, with
the CHANGELOG's "Nothing is removed or renamed" above it and no word about it. Fix seat 3
named it in its open list and did not build it. The entry says the folded end "is now the
dock's `--foreground` at a strength", which is true, and then that
`--glass-border-floating` and `--glass-border-dock` "keep their values", which a reader
takes to mean both still work on the dock.

A lead, not a prescription: fix seat 3's forms probe found "two relative-colour arms of an
opaque ink" and "relative token over relative ink" alive in both WebKit builds, so the
folded end can read the token if the token itself is the relative colour; a host's
translucent mix in both tokens would then be the host's own nested form. Either the hook
is honoured with a cell like the `--glass-border-dock` one, or the orchestrator waives it
and the entry says a host recolours the folded end with `--dock-plate-collapsed-border`.

### D-2. The pixel reader's vertical cells are RED in WebKit on the expand's first frame (item 3)

`v light-1440f` and `v dark-390c` of `release-11-0-1-critic-2.spec.ts` failed in the tip
sweep (`critic-3/logs/tip-wk-b.json`): frame 0 of the vertical dock's expand, 26 ms and
25 ms after the press, root `scale: 1 0.29`, is a plate 58 px on the main axis and 64 px
across (60.7 by 68 on the phone), its end 2.45 px (2.98 px) short of a circle of half the
cross extent. In paint it is a disc squashed top and bottom
(`critic-3/capture/v-light-1440f-wk-expand-00-crop.png`); the next frame, at 67 ms, is
round. The cross extent takes its open value on the morph's first frame while the main
extent is still the closed disc's.

It is not this branch's. Repeated on both trees:

| run | tip | v11.0.1 |
|---|---|---|
| the sweep (`tip-wk-b`) | 2 of 2 RED | not run |
| the two cells alone, ten times each | 0 of 20 | 0 of 20 |
| the whole file, five times, first pass | 0 of 10 | 0 of 10 |
| the whole file, five times, second pass | 6 of 10 RED | 2 of 10 RED |

Every RED row on both trees is the same frame with the same numbers (58 by 64, −2.45;
60.7 by 68, −2.98; `c2rows.py`). The frame is caught only when the first screenshot lands
within about 25 ms of the press; the passing runs first sample at 32 ms or later. Fix
seat 2 saw the same 2.45 px once on `14dd41fea` and read it as passing alone. The v11.0.1
reading rests on the report's rows; the frame kept on disk for that tree is a later,
passing repeat.

So item 3 as written ("the dock end round on every frame") does not hold in Playwright
WebKit, on the tip or on the published 11.0.1, and no title here fails that passes on
v11.0.1. It is filed because the gate is on the list and read RED. The orchestrator
either takes the cure into this patch (the vertical dock's cross extent on the first
morph frame) or rules it to INBOUND as 11.0.1's own; Chromium never caught the frame and
real Safari is unmeasured.

## Open gaps, for INBOUND

- **A WebKit sweep cell can lose its page.** `window.__frames` vanished mid-cell twice in
  two sweeps (fix seat 3's `fold ·` at 390, this seat's `hover ·`), each GREEN alone. The
  rAF samplers in `release-11-0-2.spec.ts` have no guard against a reload; the cause of
  the reload is untraced.
- **The `fold · an idle fold` cell cannot show O-268's RED on v11.0.1 as committed**: its
  5.4 s wait is the tip's idle window. The RED is real (267 layouts over 73 frames with a
  3 s wait); the cell fails there for the window instead.
- **O-288 has no ruling.** Its four guard cells pass on v11.0.1, the binding note asks
  for RED on v11.0.1, and no later note accepts it as moved the way O-282 was. The
  teleported composition daraksha uses is still the untested shape.
- **O-271 is open** after two attempts (fix seat 3); fourier stays on 11.0.0. The note
  keeps the row in the release.
- **`--corner-shape-thumb` is declared and read by nothing**, and the CHANGELOG does not
  say the spectrum thumb stopped reading it (ruled to the next patch).
- **`--dock-plate-expanded-edge` and `--dock-plate-collapsed-edge` are new and unnamed**
  in the CHANGELOG (additive).
- **A host's `--dock-plate-expanded-border` now also wins on a held or static dock**
  (critique 2's note; unchanged).
- **The vertical dock's summary glyph sits left of centre in the first two expand frames**
  in WebKit (the two crops in `critic-3/capture/`); not measured on v11.0.1.
- **The CHANGELOG heading still reads "unreleased"**; the close seat's.
- **Not measured**: real Safari; v11.0.0; reka-ui 2.9.9 installed; the `ff51cdea3` tree.
