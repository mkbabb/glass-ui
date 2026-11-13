# 11.0.2 fix seat 2: D-1 to D-5 from critique 1

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.0.2`, branch `release/11.0.2`,
on critique 1 (`ff51cdea3`). Every run went through `guarded`, WebKit 2287 under
`--exclusive webkit`, one browser a run, `--workers=1`. No run was refused. Paths are
relative to `docs/release-11.0.2/` unless they start with `src`, `tests` or `tests-visual`.

## Commits

| item | commit | what |
|---|---|---|
| (records) | 5ee8dceb1 | seat C's `build-C.md` (its last chain marked unfinished), the orchestrator notes, seat C's scripts and logs, as the after-build-C note asks |
| D-2 | beb176f5f | the two dock edge names are inputs again |
| D-1 | a671920c6 | the restated Slider cell, the thumb on `--foreground`, the CHANGELOG |
| D-3 | 38337ea66 | a Blob browser cell RED on v11.0.1 |
| D-5 | 46ec8d30f | O-300 (a) cured, the fold's seats on the morph clock, the O-288 reproduction and guard cells |
| D-4 | 14dd41fea | the bundle ratchet rebound on the committed tree |
| D-5 | e2ad38076 | the fold cells' opacity bound read from the morph's progress, not the frame clock (below) |

## Trees and runs

- **tip**: the branch. **v11.0.1**: seat A's `.cache/red-v11.0.1/tree`. **ff51**: a new
  `git archive ff51cdea3` at `.cache/red-ff51/tree`, `node_modules` as per-entry
  symlinks, for the RED arm of the two regressions this branch made (D-1 and D-2).
- `fix-2/scripts/pw.sh` copies the 11.0.2 spec, config and harnesses onto the RED trees
  and runs one guarded Playwright call on the tree's own port (5341 tip, 5342 v11.0.1,
  5343 ff51), `GLASS_UI_DEMO_URL` set. Chains `fix-2/scripts/chain{1..4}.sh`, one line a
  run in `fix-2/logs/chain.out`. Probes: `serve-probe.sh` with `slider-read-probe.mjs`,
  `slider-capture.mjs` and `fold-content-probe.mjs`.
- Witness reports: `fix-2/logs/c1-{tip,v1101,ff51}-chco.json` (Chromium and coarse-touch,
  the tip before the morph-transition cure), `c2-tip-chco.json`, and
  `c2-{tip,v1101,ff51}-wk.json` (WebKit 2287).

## D-1. The Slider at its minimum

**Ruling taken** (after-build-C note, item 1). The cell is restated at W-B.18's G-READ
floor and the least paint admitted that holds it.

- **Cell.** `slider · a scrubber's thumb reads on its track and its fill at 0, 50 and 100`
  (sm, md, lg) on the geometry harness: the thumb's Rec. 709 luma against the fill's and
  the track's wherever each shows beside it, light and dark, default ink and a violet
  `--slider-range-bg`. Floors: 60 from the fill, 30 from the track. The three
  `slider · a scrubber at its minimum draws its value` cells (the fill-rim premise the
  geometry cure removed) are replaced, and their crop helper with them.
- **Paint read.** `fix-2/logs/slider-read-chromium.log`, the tones the prototype offers,
  injected one at a time, the worst reading over sizes and values:

  | thumb (track) | light, default ink: fill / track | dark, default ink: fill / track |
  |---|---|---|
  | `--card` (the branch) | 30.4 / 0.9 | 15.9 / 24.5 |
  | `--background` | 34.4 / 3.1 | 49.5 / 9.1 |
  | `--background`, track `currentColor` 16% | 38.3 / 35.8 | 70.1 / 34.9 |
  | `--foreground` | 190.2 / 221.5 | 170.5 / 211.1 |

  The fill stays as it is (the ruling allows the thumb's tone and the track's ink), and
  the light fill is the cream capsule, about 215 of luma, so no light thumb reaches 60
  from it. `--foreground` is the one tone that holds in both schemes, and with it the
  track's ink is not needed, so the track is untouched.
- **Paint judged.** `fix-2/capture/sheet-{light,dark}.png` (3x, sm and lg at 0, 50, 100;
  the upper six rows the branch, the lower six `--foreground`). In light the branch's
  cream disc at 0 is nearly lost on the track; the ink disc is plain at every value. In
  dark the branch's `--card` disc is a brown smudge on the grey fill; the light disc
  reads at every value. The light scheme's dark knob on a cream fill is a visible change
  of look, and the CHANGELOG says so.
- **Cure** (`src/components/slider/styles.css`): `background: var(--slider-thumb-bg,
  var(--foreground))`, its comment rewritten. `--slider-thumb-bg` still wins; forced
  colours still paint `Canvas`. The O-273 cell and `tests/styles/slider-thumb-bg.test.ts`
  now read `--foreground`.
- **CHANGELOG.** The opening paragraph names the new default; the O-273 clause drops "as
  before"; the geometry clause gains a paragraph: at the minimum the thumb covers the
  fill and itself marks the value, so its default moves from `--card` to `--foreground`.

| cells | v11.0.1 ch / co / wk | ff51 ch / co / wk | tip ch / co / wk |
|---|---|---|---|
| the three G-READ cells | RED / RED / RED | RED / RED / RED (light at 0: 246.1 on 246.9) | GREEN / GREEN / GREEN |
| `--foreground` by default | RED / RED / RED | RED / RED / RED | GREEN / GREEN / GREEN |

## D-2. The two renamed dock properties

- **Cure** (`src/components/dock/styles/dock.css`), no removal: the library declares
  neither `--dock-plate-expanded-border` nor `--dock-plate-collapsed-border`, and the
  plate's border reads `var(--_dock-edge-by-expanded, var(--_dock-edge-by-collapsed,
  <the strength lerp>))`. Each `--_dock-edge-by-*` holds a reference to its host name with
  no fallback, so with the name unset it is invalid at computed-value time and the edge
  falls through to the one-arm lerp that keeps Playwright's WebKit alive. A host that
  sets either name colours that end as in 11.0.1, mixed toward the other end's strength
  colour by t. Only a host that sets one of them reaches a two-colour mix, which is
  11.0.1's own edge.
- **CHANGELOG.** The edge clause says the two names still apply. The opening paragraph
  keeps "Nothing is removed or renamed" and names the one token the edge stops reading,
  `--glass-border-dock` (already described in the clause; a removed hook named honestly,
  as critique 1 says).
- **Cell** `edge · a host's --dock-plate-expanded-border and --dock-plate-collapsed-border
  still colour the plate edge`: literal colours set on the dock host, read at t = 0 and
  1 with both, one and the other set.

| v11.0.1 ch / co / wk | ff51 ch / co / wk | tip ch / co / wk |
|---|---|---|
| GREEN / GREEN / GREEN | RED / RED / RED (t = 1 reads the 8% ink, not the host's red) | GREEN / GREEN / GREEN |

## D-3. The Blob's browser witness

- **Cell** `blob · through a sweep, a drag and a release the body's drawn reach stays
  inside its box`: an init script hides `navigator.gpu` (so every engine draws on the
  WebGL2 leg, which reads the same `resolveBodyBreath` as the WebGPU one) and wraps
  `getUniformLocation`, `uniform1f` and `drawArrays`, recording each draw's
  `uBodyRadius + |uPulseAmp| + uNoiseAmp`. A 600 ms sweep paced one move a frame, a
  three-stroke drag and its release; the peak must stay at or under 0.3125 UV.
- Test-only; the cure is O-235's 97d86a66d.

| v11.0.1 ch / co / wk | ff51 and tip ch / co / wk |
|---|---|
| RED 1.530 / RED / RED 1.135 | GREEN 0.277 to 0.289 in all three |

## D-4. The bundle ratchet

`verify:package` on 46ec8d30f: `G-BUNDLE-RATCHET: 2916696 > 2911472`
(`fix-2/logs/verify-package.log`). `.bundle-ratchet` set to 2916696 (+5224 on 11.0.1):
CLEAN, 196 claims, 460 declarations, roster 291 of 291
(`fix-2/logs/verify-package-rebound.log`). Nothing in the package changed after it.

## D-5. The fold-content row (O-288 with O-300 a)

### O-288: reproduced in glass's composition, not found

- **Harness** `tests-visual/release-11-0-2/fold-content-harness`: a GlassDock whose full
  layer holds three DockControls, a 240 px Slider and a slotted button with its own
  `transition` (in `@layer components`); the same button outside the dock;
  `?orientation`, `?theme`, `?collapse=open`, `?fit=1`.
- **Probe** (`fix-2/scripts/fold-content-probe.mjs`, logs `fix-2/logs/fold-content-*`):
  every frame of an unfold and a fold, each item's box cut by the dock's own clip and the
  run's scroll port where they clip, against the plate's painted box, and each item's
  effective opacity. Also an idle fold of a `collapse="open"` dock after a Slider drag.
  On v11.0.1 and the tip, Chromium and WebKit 2287, both orientations, 390 and 1440: no
  visible item stands outside the plate in any frame (the box's morph-axis clip, 10.1.3's
  O-110, holds it), and the leaving pane fades on `1 − t` in steps of 0.07 to 0.33. The
  13 px spill and the one-frame drop daraksha measured do not reproduce in glass's own
  composition. Daraksha renders its dock controls under the page and teleports them in
  (the after-build-C note, item 9), which this harness does not do; that is where to look.
- **Guard cells** `fold · a {horizontal,vertical} dock's content stays inside the plate and
  fades by steps through the fold and unfold at {1440,390}`, light and dark in each: no
  visible item more than 0.5 px outside; between two samples no item's opacity moves by
  more than the reveal ramp's slope (one over `--dock-stagger-window-size`, 0.4 on the
  shell) times the change in `--dock-expand-t`, plus 0.05. The first form bounded the raw
  step at 0.5; under the sweep's load WebKit dropped frames and one sample of an unfold
  covered 0.2 of the morph (one cell RED on the tip, `sweep-wk-a`), so e2ad38076 reads
  the bound from the morph's own progress. A drop from 1 to 0 while t barely moves still
  fails (the 0 to 1 first frame above would).

| v11.0.1 ch / co / wk | ff51 ch / co / wk | tip ch / co / wk |
|---|---|---|
| 4 GREEN each | 4 GREEN each | 4 GREEN each |

  Every reading (`fix-2/logs/c5-fold-*.json`): 0 px outside, and the largest step 0.05
  under its bound, that is, opacity follows the ramp exactly.

The note's "RED on v11.0.1" cannot be met for a fault that does not reproduce; these
cells are a guard, as the O-282 hover spec is.

### O-300 (a): a slotted control's own transition

- **Root.** `run.css`'s two seat rules set `transition: inline-size` (`block-size`
  vertical) at class specificity on every direct child of the run, replacing a slotted
  control's list. Glass's own icon and tab controls lost their hover and press tweens in
  a run the same way.
- **Cure.** The seat's transition is a `:where()` default on every seat, open or not, so a
  control that declares a transition keeps it. `dock-icon-button` and `dock-tab-button`
  add `inline-size` and `block-size` legs to their own lists, so they still take part in
  the seat exchange.
- **What the fold cells caught.** With the seats' own lists live, the icon control's
  `opacity` and `scale` legs trailed the morph's per-frame reveal: Home, Search and
  Settings went from 0 to 1 in the unfold's first frame (`c1-tip-chco.json`, eight
  cells). The reveal rule (`layers.css`) now sets `transition: none` on the active
  pane's children while `[data-morphing]` is set; their lists resume at settle.
- **Cell** `transition · a control slotted into a dock's run keeps its own transition`:
  the inside and outside buttons compute the same transition, the dock's icon control
  lists `background-color` and the extent, and both buttons are mid-tween 120 ms into a
  hover. Skipped on coarse-touch (hover).

| v11.0.1 ch / wk | ff51 ch / wk | tip ch / wk |
|---|---|---|
| RED / RED (inside `inline-size 0.21s`, outside `background-color 0.4s`; inside at its end colour) | RED / RED | GREEN / GREEN |

- **CHANGELOG.** A new clause: a control placed in a dock keeps its own transitions; add
  `inline-size` (`block-size` vertical) to tween as the open seat; during a fold or
  unfold the dock sets its controls' opacity and scale each frame.

## Gates on the committed tip (14dd41fea)

e2ad38076 after it changes one Playwright spec, which none of these gates reads.

`fix-2/logs/chain.out`:

| gate | exit |
|---|---|
| `npm run typecheck` | 0 (46ec8d30f; the ratchet commit changes no source) |
| `npm run build` | 0 |
| `npm run verify:package` | 0 after the rebind, CLEAN |
| `npm run demo:dist:build` | 0 |
| `npx vitest run --maxWorkers=2` | 0: 276 files, 2533 passed, 10 expected fail, 1 skipped |

Note: `chain3.sh` logged `verify:package rc=0` before the rebind although the log ends on
the ratchet error; the log, not that line, is the reading.

## The tip sweep

Every release spec on 14dd41fea (`fix-2/scripts/chain4.sh`; reports
`fix-2/logs/sweep-{wk-a,wk-b,ch,co}.json`):

| leg | passed | skipped | failed |
|---|---|---|---|
| WebKit 2287: 11-0-2, forced colors, 10-1-2, 10-1-5 | 207 | 3 | 1: `fold · a vertical ... at 390` (the frame-clock bound, restated in e2ad38076) |
| WebKit 2287: 11-0-1 (all six), 10-1-3, 10-1-4 | 130 | 10 | 1: critic 2's `v light-1440f` (2.45 px on the expand's first frame) |
| chromium-headless-new, all twelve | 348 | 0 | 4: the four `fold ·` cells, run with an intermediate bound of 1 / 0.55 written while the sweep ran (the shell's window is 0.4) |
| coarse-touch, all twelve | 331 | 17 | 4: 10-1-3's two D-1 summary-glyph cells and critic 1's `a light-1440f` and `a dark-1440f` |

- The coarse four are the same four critique 1 read: the two 10-1-3 cells are in the
  v11.0.0 baseline and the 11.0.1 close's coarse set, and critic 1's two assert a fine
  pointer on their first line. No title fails here that passes on v11.0.1.
- Critic 2's `v light-1440f` passed alone on the tip twice and on ff51cdea3 once
  (`fix-2/logs/c5-v-*`); critique 1 read it GREEN on 648d70e59. Read as the sweep's load
  (the WebKit leg ran 21 minutes before it), not a regression; it is the one cell a
  critic should re-read.
- The fold cells after e2ad38076: GREEN on all three trees in all three projects
  (`c5-fold-*`).
- release-10-1-5 107 of 107 in Chromium, coarse-touch and WebKit (no failure there in any
  leg).

## Open

- O-288 as daraksha sees it is not reproduced in glass; the teleported composition is
  the untested shape.
- Not measured: real Safari; Playwright WebKit 2311 for the new cells (only the
  `webkit` 2287 project ran).
