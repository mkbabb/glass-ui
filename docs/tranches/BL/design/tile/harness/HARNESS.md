# D4 · the tile witness battery (H3, pass 3)

| field | value |
|---|---|
| seat | D4 pass 2, H2 seat, landed REGISTRY §3.2 rows H-1..H-11 over the pass-1 battery (T-1..T-8, W-A..W-E). D4 pass 3, H3 seat, landed REGISTRY §P2-6.2 rows H3-1..H3-13 in place (§2.2) |
| model | `claude-opus-5-5`, asserted from own system identity |
| engines | Chromium (`channel: "chromium"`) and Playwright WebKit, from `glass-ui/node_modules/playwright`, headless, 1000×900 at DSF 2. Playwright WebKit is not Safari. Real Safari runs through `safari.mjs` (H-11), and every cell reads **UNMEASURED (owner's safaridriver checkbox)** until the owner ticks Develop ▸ Allow Remote Automation |
| results | not here. The self-test and the HEAD baseline under H3 are recorded once, in `../pass-3/H3.md`; under H2, in `../pass-2/H2.md` (P-3). Every run JSON carries `harness.hash` (H3-10): two tallies compare cell for cell only when their hashes match |

## 1 · What it is

One scene page, built against any worktree's library, and thirteen witness scripts that read it. Each witness prints PASS, FAIL or UNMEASURED per cell with the measured numbers. It writes JSON and exits 0 on PASS, 1 on FAIL and 2 on a harness error or a hang. Every read is one of four things: painted pixels (screenshots decoded with pngjs); computed style and layout geometry; the accessibility tree (CDP in Chromium, Playwright's aria snapshot plus DOM states in Playwright WebKit); or a real key press, pointer event or touch tap. No witness reads source text.

| file | role |
|---|---|
| `libbuild.mjs` | `node libbuild.mjs <worktree>`: the library's own `vite build` inside a worktree, with the cache pinned inside it. Needed only for the `dist` flavours (H-9) |
| `build.mjs` | `node build.mjs <worktree> --label <l> --out <dir> [--flavor src\|src-dev\|dist\|dist-dev] [--route <dir>]`: the scene app bundled against the worktree into `<out>/builds/<l>/`. Nothing is written into the worktree |
| `scenes.mjs` | the scene registry (`SCENES`: gates, info, holder class, arms, flags), the transcriptions and the DOM contract |
| `fixtures.mjs` | the hand-made fixture that satisfies every witness, and `FAULTS`, the planted violations (each naming its witnesses, the cell that must fail, or `expect: "pass"` for a control) |
| `lib.mjs` | serving, engines, the mode cells, the in-page helpers (`window.__th`), pixel maths, CDP, the browser lock and the census, the CLI wrapper and its watchdog |
| `measure.mjs` | the shared measurements: the corner story (framed and synchronous), selected separation, ring coverage, AX roles, tab stops, the arrow cells, engagement, the commit bar, consumer paint |
| `t1-…` .. `t8-…`, `wa-…` .. `we-…` | the witnesses |
| `safari.mjs` | H-11, the real-Safari target over safaridriver (W3C WebDriver). T-8 calls it |
| `run.mjs` | the whole battery against one target: `--build <dir> [--webkit]` or `--fixture` |
| `tally.mjs` | `node tally.mjs <out>/runs/<label> [--scenes] [--fails]`: a run's JSON as Markdown rows (verdict, arm tally and load per witness and engine; per-scene gating tallies; every failing line). Reads files only |
| `selftest.mjs` | every witness on the clean fixture (must exit 0) and on each plant aimed at it (must exit 1 with the planted cell among its failing lines, or exit 0 for a control), in Chromium and Playwright WebKit |
| `route-example/` | the H-7 route contract on a real build: `preset` migrated clean (T-7 migrated PASS), `specimen` migrated with one consumer rule on the tile (T-7 migrated FAIL) |
| `glance.mjs` | owner-glance captures. Not a witness |
| `film.mjs` | owner-glance films of a commit across arms; `--pair` (H3-13) the stills pair, plated against flush and focused-selected against selected, each frame checked against its label. Not a witness |
| `canon.mjs` | H3-4: the canon unit's law on 48 widened twins (size × orientation × children × state), parsed by the engine; plants A, S, H on the route's own tile spelling (`route.json` → `canon`) |
| `appsso-probe.mjs` | H3-1: counts the AppSSO checks each navigation form makes in Playwright WebKit, from the unified log |

### 1.1 Running it

```sh
H=docs/tranches/BL/design/tile/harness
S=<scratch>; OUT=$S/out                               # or TILE_HARNESS_OUT
git worktree add --detach $S/wt <rev>
ln -s "$PWD/node_modules" $S/wt/node_modules
node $H/libbuild.mjs $S/wt                            # only for the dist flavours
for f in src src-dev dist dist-dev; do node $H/build.mjs $S/wt --label head-$f --out $OUT --flavor $f; done
node $H/run.mjs --build $OUT/builds/head-src --out $OUT --webkit
node $H/we-one-line.mjs --build $OUT/builds/head-dist --out $OUT          # refusal cells gate on dist only
node $H/selftest.mjs --out $OUT [--engines chromium,webkit] [--only T-5] [--faults t5-input]
node $H/safari.mjs --build $OUT/builds/head-src      # H-11; UNMEASURED until the checkbox (it prints the driver's reason)
git worktree remove --force $S/wt
```

Per witness: `--engine webkit` (every witness except T-8, which runs both itself); `--save <dir>` (T-3 and T-4 write the compared crops); `--deadline <s>` (default 1800); `--wait-quiet <s>` (wait for other seats' headless browsers to exit before starting).

### 1.2 Serialization (H-11)

Every witness takes an exclusive lock (`$TMPDIR/bl-d4-tile-harness.lock`, stale locks broken by pid) before it opens a browser, so one D4 harness process runs at a time on the machine. Other seats' browsers are not ours to stop. Each run prints the census of other headless browser processes at start, the lock wait, and the load average at start and end. Every T-6 commit line carries its load. A commit cell that fails on janky frames (median interval > 20 ms) is re-run twice, and a failure that does not reproduce is printed NOT-REPRODUCED and does not fail the cell.

A browser process that dies mid-run (Chromium did, under load, during the first H2 self-test) is relaunched on the next page open, and the witness prints a note for every disconnect. T-6 keeps each segment's cells only when the segment finishes, and re-runs a segment whose engine closed once on the relaunched browser: a crash that does not reproduce is printed NOT-REPRODUCED beside the re-run's cells, and one that reproduces fails the segment loud. T-7 re-reads a crashed arm the same way. Before this fix a single crash failed every later scene with "Target page, context or browser has been closed".

One level up, `run.mjs`'s `runOne` (which `selftest.mjs` and the battery both use) re-runs a witness process once when it ends in a HARNESS ERROR because its engine closed: a Playwright WebKit page died under load during the H2 self-test (`t1-coarse`, exit 2, "page.waitForTimeout: Target page, context or browser has been closed"; `../pass-2/logs/aborted-run5-selftest-driver-killed.log`). The re-run's verdict stands and the line carries `NOT-REPRODUCED: engine closed during the first run …`; a crash that repeats carries `REPRODUCED` and stays exit 2. A run that exits 0 or 1 is never re-run, and the self-test prints every re-run in its summary.

**H3-1, the routed Playwright WebKit stall, root-caused.** Every http main-frame navigation in Playwright WebKit asks macOS AppSSO (`SOAuthorizationCoordinator::tryAuthorize` → `canPerformAuthorizationWithURL`) before it loads. In the boot epoch that ended 2026-10-07 14:32:54 that reply stopped arriving at the 90th or 91st navigation of one Playwright process, in every process that got that far; the page then never loads, never closes, and a fresh context in the same process stalls too. The routed T-3 was the only witness whose one browser opened 90 pages (`preset-contents (light)` was its 90th). So a WebKit browser is retired every `NAV_CAP` (60) navigations, and a stall reads the unified log for a pending AppSSO check, names it, drops the browser process and re-opens once on a new one (`../pass-3/H3.md` §H3-1). The paragraph below is the H2 history this replaced.

A page load that stalls (the scene never reports ready, or `goto` times out) is re-opened once on a fresh context by `openPage` (D4-F prototype, `../pass-2/D4-F-proto.md` §6.2). The D4-F block test's F1-3 and the prototype's first routed Playwright WebKit T-3 run both died in `openPage` without naming the scene. A stall that does not reproduce is printed as a note, NOT-REPRODUCED, with its scene, mode and load; one that reproduces throws with the scene named. Like the engine-closed relaunch, it is a recovery path, not a check, and every use is printed. T-3 reads a migrated arm the route did not supply (0 items) as UNMEASURED, not FAIL (F1-4).

### 1.3 The DOM contract (scenes and fixture alike)

- `[data-scene]`: the scene root, with `data-arm="library|verbatim|migrated|stripped"`.
- `[data-group]`: the selection group.
- `[data-item]`: each item, the element that owns the corner, the state and the focus.
- `[data-ink]`: consumer content, hidden when a witness reads the plate.
- `[data-line-slot]`: where a witness appends a line.
- `[data-sentinel="before" | "after"]`: focusable buttons around the group.
- `[data-selection-body]`: a route's selection body, if any. T-6 reads its travel.
- `[data-descendant]`: an interactive descendant inside a tile.
- `[data-th-on]`: a harness-only selected hook for a site that exposes its selection to nobody (F1).
- `window.__tile = { ready, dev, flavor, scenes, exports, migration, select(i|null), selected(), reorder() }`.
- URL: `?scene=<id>&mode=dark&sel=<i>|none&shape=…` (`shape` is read by `glance.mjs` only).

### 1.4 Arms (H-7, Q-12 (c))

Every consumer site (`arms: true`) renders in three arms:
- `<site>`, the library arm: the consumer's markup, layout and unconditional content type, with every rule that paints the item dropped. This is the library default.
- `<site>-verbatim`, the unmigrated arm: the consumer's HEAD composition, transcribed and never edited by a route.
- `<site>-migrated`, the migrated arm: a route's migration, read from `--route <dir>`'s `route.json` → `migrated.mjs`. It is absent at HEAD, where the null migration is the library arm.

T-7 reads each consumer arm against its `-stripped` twin: the same markup, with the arm's CSS off and the class attributes of every `[data-item]` and `[data-group]` removed. The verdict gates the library and migrated arms and tallies the unmigrated arm beside them (`[library a/b · unmigrated c/d · migrated e/f]`); `armGates` makes an unmigrated arm gate (T-3 on `preset-verbatim`, the shipped consumer border). A migrated arm that does not exist is UNMEASURED, never a self-paired pass. `route.json` also gives `familyDirs`, the `src/components/<dir>` modules a route adds, whose export names the family witnesses read (H-8: from the route, not a hard-coded list).

### 1.5 Flavours (H-9)

- `src`: `@glass` aliased to the worktree's `src`, production compile.
- `src-dev`: the same with `import.meta.env.DEV` true, which is the only place a DEV-only branch runs.
- `dist`: every `@glass/components/<x>` resolved through the worktree's `package.json` exports to its built `dist`, as a consumer installs it, under a production consumer build.
- `dist-dev`: the same resolved with the `development` condition first (Q-5 (d)), under a consumer dev build.

A refusal or guard cell (W-E's refusal) gates only on a `dist` flavour. On a `src` flavour it is reported. T-5's interactive-descendant cell prints its flavour.

### 1.6 The scenes

| id | what it transcribes | gates | reports |
|---|---|---|---|
| `preset` (+ arms) | K1 keyframes.js SpringPhysicsFacet preset tiles (574642be). Flags: `deselect` (Q-6 a) and `reorder` (a keyed reorder) | T-1 T-3 T-4 T-5 T-6 T-7 T-8 W-B W-E; the unmigrated arm gates T-3 | |
| `specimen` (+ arms) | K2 keyframes.js EasingCatalogue specimen tiles in FadingScroll, in family sections | T-1 T-3 T-4 T-5 T-6 T-7 T-8 W-B W-E | |
| `strip` (+ arms) | V1 value.js EasingSpecimenStrip, selectable Chip icon circles | T-3 T-5 T-7 W-B W-E | T-1 T-6 |
| `f1` (+ arms) | F1 fourier-analysis HarmonicLevelGrid, a thumbnail strip of glass Buttons with no ARIA state, and its `is-bound` sibling state | T-1 T-3 T-4 T-5 T-6 T-7 | |
| `v2` (+ arms) | V2 value.js MixSourceSelector, N-of-M palette thumbnails (`multi`, Q-7 a) | T-1 T-3 T-5 T-7 | |
| `c1` (+ arms) | C1 chicago status filter, radios with a check mark | T-3 T-4 T-5 T-7 | |
| `preset-invalid` | K1 tiles in an invalid group with a selection | T-3 | |
| `preset-sibling` | K1 tiles carrying a sibling state that writes a full-ink border (X-1) | T-3 | |
| `preset-tone-translucent` | `--selection-tone: rgb(120 80 200 / 0.35)` | T-3 | |
| `preset-tone-unresolvable` | `--selection-tone` set to an undefined custom property | T-3 | |
| `preset-contents` | the tiles behind a `display: contents` wrapper | T-1 T-3 T-5 | |
| `preset-input` | the first tile holds an `<input>` (`descendant`) | T-5 | |
| `preset-consumer-aria` | consumer `role="option"` and `tabindex="0"` on every item (H3-12) | T-5 | |
| `<state>-migrated` | `preset-invalid`, `-sibling`, `-tone-*`, `-contents` written onto the route's migrated preset markup (H3-11), when the route migrates `preset` | as the state | |
| `single` | single-line ToggleGroup `sm` | T-2 T-5 | T-3 T-6 |
| `vertical` | four-item vertical ToggleGroup | T-2 T-5 | |
| `tabs` | SegmentedTabs `semantics="radio"` (H3-10) | T-2 T-5 | |
| `tabs-retired` | SegmentedTabs `semantics="toggle"`, a retired value: refused under Q-5 (gates on `dist`) | T-5 | |
| `pill-icon`, `pill-badge` | pills of an icon plus a label, a label plus a Badge (D4-F question 1: they stay pills) | T-2 | |
| `card` | Card's selectable arm, as `demo/stories/display/card.vue` wires it | T-1 T-3 T-4 T-5 T-6 W-C | |
| `chipcell` | selectable Chip `shape="cell"`, two lines | T-1 T-3 T-5 T-6 | |
| `wrap` | control holders whose label wraps: ToggleGroupItem, pill Chip, Button (`holder: control`) | T-1 W-A | |
| `family-d` | the preset tiles as `<ToggleGroup shape="cell">` with no item utilities | W-D | |
| `family-d-undeclared` | the same markup with the declaration removed (H-2's pair) | W-D T-2 | |

### 1.7 Mode cells

- `light`.
- `dark`: `.dark` on `html` plus `colorScheme: dark`.
- `prt`: Chromium emulates `prefers-reduced-transparency: reduce` over CDP. Playwright WebKit cannot, so it takes the forced level-0 path and says so in the cell label.
- `forced`: reported, not gated.
- `prm`.
- `coarse`: `hasTouch`, plus `isMobile` in Chromium, verified as `(hover: none)` and `(pointer: coarse)`.
- `--ui-scale 1.25`: set on `:root` and verified.

A cell whose mode did not apply fails with `MODE NOT APPLIED`. Keyboard traversal in Playwright WebKit uses Option+Tab, because its Tab skips buttons. Playwright WebKit starts its arrow cells with focus plus Space, not a click, because hovering a ToggleGroupItem hangs its renderer (PF-1).

## 2 · The witnesses under H2

| id | property | how the script decides (H2 changes in bold) |
|---|---|---|
| T-1 | past its rung, the used corner meets the ruled bound | Per distinct holder: the used corner (CSS Backgrounds 3 §5.5) at mount and with one and two lines appended. **Each appended reading is framed, after the mutation's frame has painted, and the synchronous read is reported beside it (H-1). The bound follows Q-1 (a): a tile uses `--radius-field` as the document root resolves it, and a wrapped control keeps rung/2. The bound is never a role the item declares for itself. Three cells per scene: fine, coarse and `--ui-scale 1.25`** |
| T-2 | a one-line item stays a stadium | Every item at its rung uses h/2. **A gated item that has left its rung FAILS ("left its rung") and is never skipped (H-2)** |
| T-3 | selected ≥ 3:1 on painted pixels, or a second carrier, in light, dark and PRT | Ink hidden, scale pinned, selected against its nearest-sized unselected sibling. PASS when the inner fill is ≥ 3:1 or the ≥ 3:1 pixels cover a 1 px band along half the perimeter. **The ≥ 3:1 area splits into the 4 px perimeter band and the interior, and the fill is its own reported cell (H-3). New gating scenes: invalid group, sibling state, the shipped consumer border (`preset-verbatim`), a translucent tone and an unresolvable tone** |
| T-4 | focus paints whole, apart from selection | Keyboard traversal from the sentinel; ≥ 1.5 px of painted ring on every side, both selection states. **The focused item's computed `outline-style` must not be `auto`, the UA indicator (H-6)** |
| T-5 | one-of-N ARIA and keys | AX `radiogroup` / `radio` with a checked state. **Exactly one stop of any kind between the sentinels: items, descendants, a focusable port (H-5). All four arrows gate per Q-4 (b): geometric in a grid, a linear step where no item lies that way. Scene flags add cells for no selection (Q-6 a), a keyed reorder, an interactive descendant (production, flavour printed) and N-of-M (Space toggles)** |
| T-6 | engagement | Hover light channel, hover scale, press, PRM light and the coarse latch, as in pass 1. **Hover scale and press now sample every frame of their wait and print the median frame interval and the load. A failing read on janky frames (median > 20 ms) is re-read twice and prints NOT-REPRODUCED if it does not reproduce. A failing read on smooth frames is never re-read, and the plant `t6-still` (no hover scale, no press squish) must still FAIL both cells. Before this, one clean-fixture run under load failed "chipcell hover scale 1.00" and "specimen-migrated press 1.01×1.01" on a single late read (`../pass-2/logs/aborted-selftest-T-6-before-reread.log`).** **The commit bar (H-4), sampled every frame for 800 ms: a pop that peaks ≥ 0.015 above its settle (the last sampled scale) and then bounces ≥ 0.002 below it, or a `[data-selection-body]` that travels ≥ 4 px and overshoots ≥ 0.5 px. The settle, not 1, is the reference, so a selected item that rests scaled (the selectable Chip settles at 1.07 after a commit, `../pass-2/baseline/head-src/T-6-chromium.json`) neither earns a pop by resting nor loses its bounce to the offset. It gates on a keyboard commit (pointer never moved), a programmatic commit (focus elsewhere) and a pointer commit. The travel arm has its own control (`t6-body`, a body that springs with an overshoot and no pop, must PASS) and plant (`t6-glide`, the same body on a linear glide, must FAIL). Tab entry into a group whose choice is made must move no item's scale (its range across the frames, not its departure from 1) and move no body. The flood's arrival and the frame intervals are printed. The pass-1 "a commit transitions" cell is reported only** |
| T-7 | no consumer paint on the tile | **Each consumer arm against its stripped twin in four states. Unmigrated reported, migrated gating, a missing migration UNMEASURED (H-7)** |
| T-8 | both engines | T-1 (fine, coarse, `--ui-scale`) and T-3 on the T-8 scenes in Chromium and Playwright WebKit, **plus the real-Safari cells through `safari.mjs` (H-11)** |
| W-A | curvature never tracks content (A1) | one-line at h/2, unchanged by added lines, **framed; fine, coarse, `--ui-scale` (H-1)** |
| W-B | every multi-line one-of-N site composes the choice card | exports; slot, `radio`, 16 px, one stop; **all four arrows (H-5)**; T-3 |
| W-C | selection is a behaviour | exports; `radiogroup` / `radio`, one stop; arrows; **the stamp's VALUES at rest and after an arrow commit: role, `aria-checked` equal to the model, and a roving tabindex (H-5)** |
| W-D | the tile is declared once, at the group | `family-d`: 16 px equal to `--radius-field`, column, body leading, more than one row. **H-2's pair, `family-d-undeclared`: every item a one-line stadium at its rung** |
| W-E | every option one line, and what a consumer installs refuses one that is not | **the midpoint row test (H-8)**; the refusal **gates only on a `dist` flavour (H-9)** |

### 2.1 The planted violations (`FAULTS`)

H-1: `t1`, `t1-self`, `t1-coarse`, `t1-scale`, `t1-late`, and the control `t1-ro` (which must PASS: stamped before paint). H-2: `t2`, `t2-skip`, `wd`, `wd2`. H-3: `t3`, `t3-border`, `t3-alpha`, `t3-unres`. H-6: `t4`, `t4-auto`. H-5, H-10: `t5`, `t5-cross`, `t5-stop`, `t5-reorder`, `t5-input`, `t5-deselect`, `t5-multi`, `wc`, `wc-stamp`. H-4: `t6-fade`, `t6-tabpop`, `t6-prog`, `t6-glide`, `t6-still` (the re-read must not hide a missing hover scale or press), and the controls `t6-body` (which must PASS: travel with an overshoot) and `t6-rest` (which must PASS: a selected tile that rests scaled at 1.05 and pops around that settle). H-7: `t7`. T-8: `t8`. W-A: `wa`, `t1-late`, `t1-ro`. W-B: `wb`, `t5`. W-E, H-8, H-9: `we`, `we-devonly`, `we-lh1`. Each entry in `fixtures.mjs` says what it breaks and which printed cell must fail.

### 2.2 · H3 (pass 3)

| row | where | what the harness now does | plants (`FAULTS`) |
|---|---|---|---|
| H3-1 | `lib.mjs` (`NAV_CAP`, `appssoPending`, `openPage`, `dropBrowser`), `appsso-probe.mjs` | the AppSSO stall's cause read and cured per browser process (§1.2) | `stall` (exit 2, named), control `navcap` (cap 5, PASS) |
| H3-2 | `t8-both-engines.mjs` | T-8 reads the library arm and the route's migrated arm | `t8-migrated` |
| H3-3 | `t2-one-line-stadium.mjs` (`oneRowCells`), `lib.mjs` (`contentRects`, `cut`, `rows`) | per gating pill scene, item 0 on three fresh pages: a `<br>` and a block `div` inside its label, a `div` beside it, after mount; FAIL when content is CUT, or STACKED and unnamed. `rows()` is now the longest chain under the midpoint test, so two lines beside an icon read two (H2's top-down clustering read one) | `t2-stack`, `t2-cut`, control `t2-named` |
| H3-4 | `canon.mjs` | the canon law on widened twins | `canon-a`, `canon-s`, `canon-h` |
| H3-5 | `measure.mjs` (`hoverLight`, `HOVER_DE`), `lib.mjs` (`meanDeltaE`), `t6-engagement.mjs` | hover light gates on the mean OKLab ΔE over the plate interior (ink hidden), ≥ 0.02; read at rest, PRM and PRT | `t6-faint`, `t6-prt`, control `t6-rung` |
| H3-6 | `t2-one-line-stadium.mjs` | the one-row mutations land ≥ 1.1 s after ready | `t2-mountonly` |
| H3-7 | `t3-selected-separates.mjs` (`containCells`), `measure.mjs` (`edgeThickness`) | the selected edge keeps its thickness under `content-visibility: auto` | `t3-cv` |
| H3-8 | `t4-ring-whole.mjs`, `measure.mjs` (`judgeT4`) | forced colours gate the ring's reach | `t4-forced` |
| H3-9 | `t6-engagement.mjs` (`calm`) | a programmatic commit under `[data-reorder]` clears the commit bar | `t6-calm` |
| H3-10 | `lib.mjs` (`HARNESS`), `run.mjs`, `selftest.mjs`, `tally.mjs`, `scenes.mjs`, `t5-one-of-n-keys.mjs` | the harness hash in every run JSON and printout, tally flags MIXED hashes; `tabs` spelled `semantics="radio"`; `tabs-retired` its own cell, refused under Q-5 (gates on `dist`) | `t5-retired` |
| H3-11 | `scenes.mjs` (`stateOnMigrated`, `migratedArm`), `lib.mjs` (`scenesFor`) | invalid, sibling, both tones and `display: contents` render on the route's migrated preset markup too, gating | `t3-migstate` |
| H3-12 | `scenes.mjs`, `t5-one-of-n-keys.mjs` | `preset-consumer-aria`: consumer `role="option"` and `tabindex="0"` on every item, read by the ordinary ARIA, stop and arrow cells | `t5-consumer` |
| H3-13 | `film.mjs --pair` | the glance pair stills, each frame verified against its label | the fixture's `t5-stop` (Tab lands on the port: the tool stops, exit 2) |

Trace: `TILE_HARNESS_TRACE=1` prints every page step with its duration and the load, and every 5 s this process's browser processes (and Playwright WebKit's XPC services) with CPU, memory and open file descriptors.

## 3 · Notes for the route seats

- A route builds in its own worktree and passes `--route <its dir>` with a `route.json`. Its migrated compositions live there and nowhere else. A route never edits `scenes.mjs`'s verbatim transcriptions (H-7).
- Report every witness with its arm tally, so the unmigrated and migrated consumer read side by side.
- Harness runs are serialized by the lock. Record the load printed beside every timing.
- WebKit T-6 pointer cells on ToggleGroupItem fail loud on the PF-1 hang until the SF-8 token fix lands. The keyboard, programmatic and Tab-entry cells run on a page the pointer never enters, so they stay readable.
- Consumers drift (PF-5). The scenes transcribe the revisions named at the top of `scenes.mjs`. Re-read a consumer before quoting its numbers.
