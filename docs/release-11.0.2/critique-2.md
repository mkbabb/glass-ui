# 11.0.2 critique, round 2

Seat: a fresh adversarial critic, claude-fable-5-2, 2026-11-13. I built nothing on this branch.
Read: `git log v11.0.1..release/11.0.2`, the three build records, `critique-1.md`, `fix-2.md`,
the seven orchestrator notes (two of them untracked when I read them) and the frozen scope.
Tip under test: `327e63ad9`, with no change to `src`, `tests`, `tests-visual`,
`package.json`, `.bundle-ratchet` or `CHANGELOG.md` in the working tree. Every run went
through `guarded`, WebKit 2287 under `--exclusive webkit`, one browser a run, `--workers=1`,
one heavy run at a time. Paths are relative to `docs/release-11.0.2/` unless they start with
`src`, `tests` or `tests-visual`.

## Verdict

**Not measured to the end, and not ready to tag.** At 04:07 `guarded` REFUSED the next run:

> `[guarded] REFUSED: kernel zone data.kalloc.1024 at 8.01M (panics near 20.8M; heavy and
> browser runs stop at 8M): reboot the Mac`

I stopped there, as the task orders. The Mac needs a reboot before any seat can finish this
reading. What ran is complete for items 4 and 5 and for most of item 1; items 2 and 3 are
read in WebKit only, with three cells unread there; the Chromium leg of items 2 and 3, the
Select probe and the WebKit 2311 edge cell did not run.

| # | item | reading |
|---|---|---|
| 1 | every landed row's witness RED on v11.0.1, GREEN on the tip | GREEN for every cell that ran, in Chromium, coarse-touch and WebKit 2287. **Unread:** the `pager ·` cell on the tip in WebKit (its `page.goto` hung), the Select probe (O-212, O-213's cap, O-214) on both trees, and the dock edge's load cell on WebKit 2311 (O-227) |
| 2 | release-10-1-5 107/107, release-10-1-2/-3/-4 no new failing title | WebKit: 10-1-5 **106 passed and 1 unread** (a `page.goto` hang); 10-1-2 52/52; 10-1-3 and 10-1-4 no failure. **Chromium: not run** |
| 3 | the release-11-0-1 specs | WebKit: the owner cells 9/9, fix-2 14/14, critic 2's pixel reader 9/9, daraksha 2/2, critic 1b 2/2, critic 1 **21 passed and 1 unread** (a `page.goto` hang). **Chromium: not run** |
| 4 | nothing removed or renamed | GREEN on the list as written; one binding ruling on it is unmet (D-1) |
| 5 | typecheck, build, demo:dist:build, vitest, verify:package | GREEN: all five exit 0 |
| 6 | the CHANGELOG entry | true and outward as read; its opening sentence rests on the unmet ruling (D-1) |

One defect, D-1. Everything else that is short is unmeasured, not failed.

## How it was run

- The v11.0.1 tree is seat A's `git archive v11.0.1` at `.cache/red-v11.0.1/tree`. Its `src/`
  is byte-identical to a fresh `git archive v11.0.1 src` (`diff -rq`, run before anything
  else). The tip's 11.0.2 spec, config, harnesses, the forced-colors spec and the nine unit
  witnesses were copied onto it again by my own scripts.
- Each Playwright call brought its own vite through the config's `webServer` (5341 the tip,
  5342 v11.0.1), `GLASS_UI_DEMO_URL` set. Scripts in `critic-2/scripts/`, logs and JSON
  reports in `critic-2/logs/`, one line a run in `critic-2/logs/chain.out` (each `rc=` is the
  run's own exit code).
- `cells.py` prints a report by title, `why.py` the failure text of every failed cell,
  `ann.py` the readings a cell recorded. Every RED and every GREEN below was read twice: the
  run's counts, then the failure text or the recorded reading.
- Refused, and so not run (`chain.out`, the `rc=75` lines): `tip-ch` (the ten older release
  specs in Chromium), the four Select probes, the two WebKit 2311 edge runs. A re-read of the
  hung WebKit cells was queued behind them; I stopped it by PID before it launched. No
  server or browser of this seat is left running (ports 5341 to 5346 are free).

## 5. Gates on the committed tree (`327e63ad9`)

| gate | exit | read |
|---|---|---|
| `npm run typecheck` | 0 | both `vue-tsc` passes |
| `npm run build` | 0 | `glass-ui:ready`, 64 public declaration entries |
| `npm run verify:package` | 0 | `terminal: CLEAN`, 196 claims, 460 declarations, roster 291 of 291, no ratchet line; the packed size is 2916696, the datum |
| `npm run demo:dist:build` | 0 | built |
| `npx vitest run --maxWorkers=2` | 0 | 276 files, 2533 passed, 10 expected fail, 1 skipped |

## 1. Witnesses

### Unit witnesses

Nine files on both trees (`critic-2/logs/units-{v1101,tip}.log`): **v11.0.1 19 failed, 61
passed, every file red; the tip 83 passed, 0 failed.** By file: `useGlobalDark` 3,
`blob-breath` 2 (each printed twice), `dockMorphMeasure` 3, `g-dock-lattice` 2,
`worm-dot-px` 1, `slider.size-tokens` 3, `slider-thumb-bg` 2,
`overlay-plate-inline-bound` 3, `open-input` RED at import.

### The 11.0.2 cells and the forced-colors spec

`critic-2/logs/v1101-{chco,wk}.json`, `tip-chco.json`, `tip-wk-a.json`. "ch" is
chromium-headless-new, "co" coarse-touch, "wk" Playwright WebKit 2287.

| row | cells | v11.0.1 ch / co / wk | tip ch / co / wk |
|---|---|---|---|
| O-223 with O-244, `dark ·` | 2 | RED / RED / RED (`isDark` false; the store holds `auto`) | GREEN / GREEN / GREEN |
| O-267, forced colors | 3 | RED / RED / RED (`outlineStyle: none`) | GREEN / GREEN / GREEN |
| O-232, `static · … no backdrop-filter` | 2 | RED / RED / RED (20 offenders each) | GREEN / GREEN / GREEN |
| O-269, `fill · in dark` | 2 | RED / RED / RED (hover −0.0044 and −0.0078; WebKit −0.0044 and −0.0058) | GREEN / GREEN / GREEN (hover +0.017 and +0.020 over the plate) |
| O-268, `fold · an idle fold` | 1 | RED / RED / skipped (246 layouts where 80 are allowed) | GREEN / GREEN / skipped (74 layouts over 68 morph frames) |
| O-273 and the thumb's default, `slider · the thumb paints` | 1 | RED / RED / RED (`rgb(253, 245, 236)`, the card) | GREEN / GREEN / GREEN (`rgb(28, 25, 23)`, then the host's colour) |
| the thumb's read, `slider · a scrubber's thumb reads` | 3 | RED / RED / RED (16 misses each) | GREEN / GREEN / GREEN |
| O-261, `pager ·` | 1 | RED / RED / RED (neck 301.1 px; WebKit 297.2) | GREEN / GREEN / **unread** (18.8 px on a 28 px pitch; coarse 32.2 on 48) |
| O-263, `wheel ·` | 2 | RED / RED (axes; the wheel cell skips on touch) / RED | GREEN / GREEN / GREEN |
| O-262, `rail ·` | 2 | RED / RED / RED (454.6 px where 89 is allowed; crest 47 px off) | GREEN / GREEN / GREEN |
| O-270, `radius ·` | 2 | RED / RED / RED | GREEN / GREEN / GREEN |
| Slider geometry, `geometry ·` | 2 | RED / RED / RED (371 misses) | GREEN / GREEN / GREEN |
| O-235, `blob · through a sweep, a drag and a release` | 1 | RED / RED / RED (peak 1.380; WebKit 0.731, against 0.3125) | GREEN / GREEN / GREEN (0.3123 and 0.288) |
| O-300 (a), `transition ·` | 1 | RED / skipped / RED | GREEN / skipped / GREEN |
| O-227, `edge ·` colour and load | 2 | GREEN / GREEN / GREEN, the colour cell skipped in WebKit | the same |
| the two `-border` inputs, `edge · a host's …` | 1 | GREEN in all three | GREEN in all three |
| O-240, `press ·` (mouse, and tap on coarse-touch) | 2 | GREEN in all three | GREEN in all three |
| O-241, `cutcap ·` | 2 | GREEN in all three | GREEN in all three |
| O-282, `hover ·` | 13 | GREEN / skipped / GREEN | GREEN / skipped / GREEN |
| O-288, `fold · … content stays inside the plate` | 4 | GREEN in all three | GREEN in all three |
| O-235's older cell, `blob · from 100 ms` | 1 | GREEN / skipped / skipped | the same |

Second reading, against `why.py` on both v11.0.1 reports: every RED cell fails on the
assertion its row names (the values above are from that text); none fails on a timeout or a
missing selector. Where paint is the claim the cell reads paint: `radius ·`, `fill ·` and
the thumb's read take a screenshot and read pixels; the forced-colors cell reads the changed
band. I also read fix seat 2's sheets (`fix-2/capture/sheet-{light,dark}.png`) against its
words: in light the `--card` disc at 0 is nearly lost on the track and the ink disc is plain
at 0, 50 and 100; in dark the `--card` disc is a brown smudge on the fill and the light disc
reads at every value. The sheets say what the record says.

Rows whose witness is not RED on v11.0.1, each by a ruling or by the row's own terms, none
of them mine to reopen: O-240 and O-241 (closed by 11.0.1, kept witnesses); O-219 (the cell
restated to the thumb's read, which is RED on v11.0.1); O-227's Chromium and WebKit 2287
cells (its RED arm is WebKit 2311, which I could not run); O-282 and O-288 (guards for
faults that do not reproduce in glass); the `-border` cell (RED on `ff51cdea3`, the tree
that renamed them, by fix seat 2's reading; I did not rebuild that tree). O-266 is a
test-only restatement by ruling: the eight `O-101 · … reversal` and `mid-expand` cells and
the other ten O-101 cells pass on the tip in WebKit; the Chromium arm is in the leg that did
not run.

**The blob's peak sits on its bound.** Chromium reads 0.31234 against a ceiling of 0.3126.
That is the clamp working (`resolveBodyBreath` holds radius + breath + noise at
`BODY_BOX_HALF`, 0.3125 in UV), not a near miss.

### Unread in item 1

- `pager ·` on the tip in WebKit: `page.goto` waited 60 s for `load` and timed out
  (`critic-2/logs/tip-wk-a.log`, failure 2). No glass assertion ran. Critique 1 and fix seat 2
  both read it GREEN in WebKit (18.9 px).
- The Select probe (O-212, O-213's cap, O-214), both trees, both engines: refused. The two
  unit witnesses for those rows are RED on v11.0.1 and GREEN on the tip, above.
- O-227's load cell on WebKit 2311, both trees: refused.

## 2. The older release specs on the tip (WebKit 2287 only)

`critic-2/logs/tip-wk-{a,b}.json`.

| spec | wk 2287 |
|---|---|
| release-10-1-5 | **106 passed, 1 timed out** |
| release-10-1-2 | 52/52 |
| release-10-1-3 | 58 passed, 2 skipped (the two clickless touch-press cells) |
| release-10-1-4 | 15 passed, 8 skipped (`page.pdf` is Chromium's) |

The 10-1-5 cell is `critique 6, coarse phone › l1 a cap lifted under a run scrolled to its end
rests round (tab:Home,icon,icon,icon,tab:Settings)`: `page.goto` to the release-10-1-5
harness waited 60 s for `load`. The sibling `l1` cells on the same harness passed in the
same run, and no assertion of the cell ran. So in my reading the spec is 106 of 107 with one
cell unread, not 107 of 107; the gate asks for 107 and I cannot give it. No title of
release-10-1-2, -3 or -4 fails in WebKit. The 11.0.1 close's WebKit set
(`../release-11.0.1/close/suite/webkit-failed-titles.txt`) holds the eight O-101 titles, one
`page.pdf` title and `q2 O-187 at 1440`; all of those pass or skip here.

The Chromium leg was refused. Critique 1 read all four specs GREEN in Chromium on
`648d70e59` and fix seat 2 read 348 passed on `14dd41fea` with four failures it then cured;
neither is a reading of this tip.

## 3. The release-11-0-1 specs on the tip (WebKit 2287 only)

| spec | wk 2287 |
|---|---|
| release-11-0-1 (owner cells) | 9/9 |
| release-11-0-1-daraksha | 2/2 |
| release-11-0-1-fix-2 | 14/14 |
| release-11-0-1-critic-1 | **21 passed, 1 timed out** |
| release-11-0-1-critic-1b | 2/2 |
| release-11-0-1-critic-2 (the pixel reader) | 9/9 |

Read by title: `o3 every frame of the expand and of the collapse paints a round end` passes
(the log prints `o3 expand {"frames":87,"morphing":34,"bad":[]}` and the same for the
collapse, no bad frame); the four `f4 … the prerendered figure dock … no script: corners and
paint` cells pass; critic 2's nine cells pass, `v light-1440f` among them (the one fix seat 2
asked a critic to re-read: GREEN here).

The timed-out cell is `critic 1 light-1440f › c light-1440f: frames through the expand and
the collapse`: again `page.goto` waiting 60 s for `load`, no assertion run.

### The three hangs

All three are the same shape: `page.goto`, waiting until `load`, 60 s, on three different
harness pages whose other cells passed minutes either side. They came in the last half hour
before the zone refusal, with the kernel zone climbing through 7.9M. Neither earlier seat
saw any of the three. I read them as the machine, but that is a reading, not a measurement:
the re-read (each cell three times alone) is written (`critic-2/scripts/chain3.sh`) and did
not run. After the reboot it is the first thing to run.

## 4. Nothing removed or renamed

Against the published tarball (`npm pack @mkbabb/glass-ui@11.0.1`, unpacked in the
scratchpad) and this tip's own build and `npm pack --dry-run`:

- **`package.json`**: `exports` (69 entries), `files`, `main`, `module`, `types`,
  `sideEffects`, `peerDependencies`, `dependencies`, `engines` and `type` are equal.
- **File list** (891 against 889): three content-hashed chunks changed their hash (`dark-`,
  `select-`, `tabs-`); two declaration files are new (`blob/composables/bodyBreath.d.ts`,
  `select/openInput.d.ts`). Nothing else is gone.
- **Declarations**: all 566 published `.d.ts` files are present. Four differ; apart from
  comments the changes are two additions, `BODY_BOX_HALF` and `storageKey?: string`.
- **Custom properties**, declared in `src` and in the built CSS (1151 against 1160 in
  `dist`): nine added. Two are no longer *declared* by the library,
  `--dock-plate-expanded-border` and `--dock-plate-collapsed-border`, and both are still
  *read* (`src/components/dock/styles/dock.css:153-159`): that is the ruled cure, an input
  the library leaves unset so a host's value wins, and the `edge · a host's …` cell holds it
  in all three projects. No custom property a host could set has stopped being read, except
  the one in D-1.
- **Read by nothing now**: `--glass-border-dock` (D-1) and `--corner-shape-thumb` (ruled to
  the next patch). `--dock-control-radius` is still read by all three seat kinds.
- **Two generated utility rules are gone from `dist/styles/components.css`**:
  `.min-w-(--overlay-min-width)` and `.min-w-(--reka-select-trigger-width)`. They were
  Tailwind's output for `SelectContent`'s own class list, which O-212 changed; they are not
  on the published class roster (291 of 291). Recorded, not filed.

## 6. The CHANGELOG entry

Read clause by clause against the diff. Outward prose; no internal id; the heading holds the
entry's only em dash. Checked in the source or in a reading: the one-shot `storageKey` and
its throw (`useGlobalDark.ts`); the concrete store with an `initialValue`; the `Highlight`
outline at `outline-offset: 2px`; the one width rule (`--overlay-inline-cap`);
`data-open-input`; `--glass-edge-floating` 5% and `--glass-edge-dock` 8%; "about 245
layouts over 67 frames … now one a frame" (246 over 68 on v11.0.1, 74 over 68 on the tip);
the dark fills at 8%, 11% and 14% of `--foreground`; the per-axis `overscroll-behavior`; the
seat corner `calc(var(--dock-control-size) / 2)` with `--dock-control-radius` still read;
the seat transition as a default and the `inline-size` / `block-size` legs on the dock's own
controls; the morph setting opacity and scale each frame (`layers.css`, `transition: none`
under `[data-morphing]`); the thumb at the track's height, `--slider-thumb-size-*` left
sizing only the spectrum's track; the thumb's default from `--card` to `--foreground`, and
the paragraph saying the fill no longer shows round it at the minimum.

No clause is false. The opening paragraph is the one place it leans on something unsettled,
D-1.

## Defect

### D-1. The dock's edge no longer reads `--glass-border-dock`, against the ruling (items 4 and 6)

The ruling on critique 1's D-2 has two halves. The first is done: the two `-border` names
are inputs again. The second reads "`--glass-border-dock` likewise keeps being read" and
"The CHANGELOG's first sentence stays true." It is not done. On v11.0.1 the dock's expanded
edge was `var(--glass-border-dock)` (`shell.css:150`); on the tip nothing in `src` reads the
token (it is still declared, `src/styles/tokens/glass.css:231`). A site that recoloured the
dock's edge through it loses that silently. The CHANGELOG says so in its opening paragraph
and in the edge clause, so the entry is honest; but "Nothing is removed or renamed" is
followed at once by the hook that stopped working, and the ruling asked for the hook to
keep working instead.

Fix seat 2 says why it stopped, and I checked the reasoning against the source: the library
declares the token at `:root`, so CSS cannot tell a host's value from the library's own, and
reading it on the default path makes the edge a mix of two translucent mixes again, the form
that kills a dock page in Playwright's WebKit build (O-227's whole point). Its two ways out
each break a rule (stop declaring the token at `:root`, or read it only at rest). I found no
third. So this is a choice between O-227 and the ruling, and it is the orchestrator's or the
owner's: either waive the second half for this token and keep the entry as it reads, or name
the mechanism that honours both. It stays a defect until one of them is written down.

## Open gaps, for INBOUND

- **The reading is unfinished** (the refusal): after a reboot, on this tip, run `tip-ch` (the
  last line of `critic-2/scripts/chain1.sh`), `critic-2/scripts/chain2.sh` (the Select probe
  and the WebKit 2311 edge cell on both trees) and `critic-2/scripts/chain3.sh` (the three
  hung cells; add critic 1's `c light-1440f` to its grep and the critic-1 config).
- **The README is wrong about the thumb.** `README.md:65` says `--slider-thumb-bg` is
  "`--card` when unset"; since `a671920c6` it is `--foreground`. The README ships in the
  package. One word; outside my six items, so it is here and not a defect.
- **Rows the binding notes say this release owes, absent from the tip**: O-271 (the row
  overflow beside a persistent region, reverted, fourier waiting); the O-295 reproduction
  (eight dots, hops of 1, 3 and 7, a host-set px size, both trees); the idle window
  (`DOCK_COLLAPSE_DELAY_MS` is still 3600 at `src/components/dock/constants.ts:61`, ruled to
  6000 with its README and CHANGELOG words); the Popover `keep-dock-open` harness cell and
  the dock README's "Controls contributed from outside the dock's tree" paragraph; the trace
  of the vertical dock's hover-only `will-change: transform`; the trace of `publishYield`
  against WebKit's ResizeObserver log.
- **The branch does not carry master's browser-free and sparse-checkout workflows**
  (`4db0b22dd` and `ee1dc2935` are not ancestors of the tip; `tests/gates/ci-browser-free.test.ts`
  is absent). The note binds the close to merge them before the tag and to rebind the
  ratchet after (+72 B). The five gates above are a reading of this tree, not of that one.
- **Two orchestrator notes are untracked**: `orchestrator-note-after-critique-1.md` and
  `orchestrator-note-ci-browser-free.md`. I did not commit them; they are not mine.
- **O-288 as daraksha sees it is not reproduced.** The guard cells pass on v11.0.1 too; the
  teleported composition is the untested shape.
- **A host that set `--dock-plate-expanded-border` now also wins while the dock is held or
  static.** On v11.0.1 the library re-declared that name on the plate in those two states
  (`morph.css`, `adaptive-legibility.css`), so its own floating edge won there; on the tip
  it retunes `--dock-plate-expanded-edge` instead, which a host's colour overrides. Small,
  and arguably what the host meant.
- **`--dock-plate-expanded-edge` and `--dock-plate-collapsed-edge` are new and unnamed in
  the CHANGELOG** (it names the two `--glass-edge-*` strengths). Additive, so not on my list.
- **Not measured**: real Safari; Playwright WebKit 2311 for any cell; v11.0.0; the `ff51cdea3`
  tree.
