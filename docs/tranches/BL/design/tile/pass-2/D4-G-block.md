# D4 · pass 2 · D4-G block test: the selection is a body (REGISTRY §6.2 questions 1 and 2)

| field | value |
|---|---|
| seat | D4 pass 2, BLOCK-TEST seat for D4-G. It prepares question 1 (the owner's glance on Q-11, which the owner answers) and answers question 2 (registration). The verdict is PROCEED or BLOCK |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | The task named `04929544`. The checkout read `476a0cd6` at start and `55e35700` at close; the scratch worktree was cut at `4e178f29`. `git diff --stat 04929544 4e178f29 -- src` touches 5 files, all the 10.1.0 Configurator (`src/components/configurator/*`, `src/index.ts`), none a tile file. `floor.patch` (sha1 `f1476eba`) applied clean. The prototype is `D4-G-block/g-body.patch` (sha1 prefix `2fb5e352`; `ToggleGroup.vue` +71/−1, `styles.css` +77) on HEAD+floor |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| records | everything under `pass-2/D4-G-block/` (the patch; the routes `route-{glide,land,edge,anchor,anchor-pv}/` and `route-common.mjs`; the probes `register.mjs`, `cv-paint.mjs`, `phantom.mjs`; `runs/` JSON and the five `build-g-*.json`; `logs/`) and `pass-2/glance-G/` (the films, `film.json`, `GLANCE.md`). The new tool is `harness/film.mjs`; no existing harness file was edited. Scratch holds only the worktree (removed), the builds, the full-size K2 strips and the raw screencasts; their paths are in `glance-G/film.json` and `runs/cv-paint-run2.json` |
| machine | shared: 20-46 other headless browser processes were running during every run. Load averages ran from 27.25 to 47.81; each run's start and end loads are below and in every log line. No cell here is a wall-clock timing. The registration cells are geometry read once per animation frame, and each one was run at least twice |

---

## 0 · In brief

**Verdict: BLOCK.** The cell is `content-visibility: auto` on K2 in Playwright WebKit. A skipped tile revealed by scrolling paints one frame at its rendered height (100.16 px) while the body still has the skipped placeholder's height (126 px). That is 25.84 px of body below the tile. It happens with both travel forms, in every run, and the paint check shows it (§3.2). The missing primitive is a rect the layout pass carries: the body laid out from its tile in the same pass, not written back by script afterward. The platform has one, CSS anchor positioning, in both engines. It closes this cell and the stress cell (§3.4), but it opens a Chromium cell of its own, where an anchor inside skipped content is not acceptable. So the primitive exists, but it is not yet usable as a drop-in for this cell.

1. **Question 1 is prepared, not answered.** Glide, lift-and-land and the floor's per-tile edge are filmed on K1 and K2, light and dark, in both engines: 8 side-by-side videos and 8 frame strips (`glance-G/GLANCE.md`). The owner's ruling on Q-11 is still owed. Until then Q-11's pass-2 default, (a) hold the header, stands.
2. **Question 2 · the six cells on the engine's one ResizeObserver.** 40 of 44 gating cells pass, identically in runs 3 and 4:
   - mount, a scroll port, an auto-fill reflow (2 → 4 → 1 columns), a resize, a keyed reorder and a font swap all read 0.00 px of drift on every sampled frame, in both engines, with both travel forms;
   - the 4 failures are the one Playwright WebKit content-visibility cell (two transcriptions × two travel forms), at 25.84 px for exactly 1 frame.

   Chromium passes the same reveal with a truly skipped tile (126 → 100.16 px): the tile's size and the body's write land in the same frame (`logs/register-cv-run6.log`).
3. **Outside the six (stress): the one ResizeObserver sees the container, not the tiles.** A direction flip moves every tile while the group keeps its size (424.00×139.16 before and after). The body then stays on the old side, 212 px (K1) and 215 px (K2) off, on 12 of 12 frames, in both engines, until something else re-measures. Any tile move that leaves the container's size alone escapes the writer. The keyed reorder is caught only because it goes through Vue and the options watcher.
4. **Measured on the way:**
   - The registration read has to be taken after paint. Two probe revisions read inside the animation-frame callback and reported drifts that no painted frame shows (§2.3).
   - The body needs flush tiles (Q-2 (b)): a tile's own plate and backdrop blur would sit over it.
   - The selected tile's hover plate is withheld, because it would veil the body (§1).

---

## 1 · What was built

`g-body.patch`, on HEAD+floor:

- **`ToggleGroup.vue`.**
  - A prototype prop, `travel?: "glide" | "land"`.
  - With it and `type="single"`, the group renders `<span class="toggle-group__body" data-selection-body aria-hidden="true">` as its first child. It hands that span to `useSelectionGroup` as `indicatorRef`, with `deform: "none"`, and binds `selection.singleSliderStyle`, the engine's one rect writer.
  - The writer measures on the model, on the options (a keyed reorder re-sorts them through the floor's `onUpdated`), and through its one `ResizeObserver` on the container.
  - A watcher on the model arms `data-body-travel` for 700 ms. Geometry transitions therefore run only on a commit, and a reflow re-measure snaps the body onto its tile.
  - `land` also runs a WAAPI pop: a 110 ms lift (opacity 1 → 0, scale 1.05), then the landing (0.92 → 1.035 → 0.992 → 1, settled at 520 ms). Under PRM there is no pop and no transition.
- **`styles.css`.**
  - `[data-travel]` makes the group the body's containing block and its own stacking context.
  - Items sit above the body and are flush: `--glass-defined-plate` and `--glass-floor-fill` are transparent, there is no backdrop blur, and the floor perimeter is off.
  - The selected item has no on-state fill and no hover plate.
  - The body carries the floor's edge ink (`--selection-edge`, 2 px), a raised light fill (light: `--card` with 55 % white; dark: `--card` with 16 % foreground) and a soft shadow, at `--radius-field`.
  - `glide` transitions translate, width and height on `--spring-panel` (overshoot 1.042).
  - `land` holds the old rect for 110 ms with a zero-duration delayed transition, then jumps.
  - Forced colours paint the body `Canvas` with a `Highlight` border.

The body reads 0.00 px off its tile at mount on K1 (204×61.58) and K2 (207×100.16), in light and dark (the smoke read; the `mount` cell in §2).

**The arms** (`route-common.mjs`) use the library arm's markup. Each adds the floor's cell corner (TF-1), flush tiles (Q-2 (b)) and the lifted pill law, written inside `@layer components` so the library's plate-layer hover (TF-8) still outranks them:
- `glide` and `land` pass `travel`;
- `edge` has no body and switches the floor perimeter on (`--selection-perimeter: 1`);
- `anchor` and `anchor-pv` are registration probes, not glance arms (§3.4).

---

## 2 · Question 2 · registration

### 2.1 · The instrument (`register.mjs`)

- Each cell opens a fresh page (1000×900, DSF 2), makes one mutation (or scrolls one step per frame), then reads on each following animation frame:
  - drift is the largest of |Δx|, |Δy|, |Δw| and |Δh| between the body's and the selected item's border boxes in client coordinates;
  - PASS means every sampled frame reads ≤ 0.5 px.
- The read is **post-paint**: the animation-frame callback queues a MessageChannel task and the task reads. So it reads the layout the frame produced after its ResizeObserver step and the writes that step caused.
- An init script wraps the `ResizeObserver` constructor. Every cell reports `made 1`, observing `toggle-group` (probe-only observers aside), so "the one ResizeObserver" is read, not assumed.

### 2.2 · The six cells, runs 3 and 4 (`runs/register-run{3,4}.json`)

Worst drift in px over the sampled frames. Both runs gave identical cells. Loads were 32.87 → 40.03 (run 3) and 40.74 → 42.26 (run 4). The same numbers hold for `glide` and for `land`.

| cell | site | what moved | Chromium | Playwright WebKit |
|---|---|---|---|---|
| mount | K1, K2 | nothing | 0.00 / 6 frames | 0.00 / 6 |
| scroll port | K2 | FadingScroll port 0 → 180 → 9 px, one step per frame (scrollHeight 532, clientHeight 340) | 0.00 / 40 | 0.00 / 40 |
| content-visibility, as transcribed | K2 | `ease-out-back` offscreen at mount (tile y 491.5 against port bottom 416.0), revealed by scrolling the port to its end | 0.00 / 13 (Chromium had already rendered it: 100.16 → 100.16) | **FAIL 25.84, 1 of 13 frames** (126.00 skipped → 100.16) |
| content-visibility, far (1600 px spacer) | K2 | the tile about 1676 px below the port, revealed by `scrollIntoView` | 0.00 / 13, with the tile truly skipped (126.00 → 100.16; `logs/register-cv-run6.log`, load 33.29-35.91) | **FAIL 25.84, 1 of 13** |
| resize | K1, K2 | host 460 → 380 px (2 columns kept) | 0.00 / 12 | 0.00 / 12 |
| auto-fill reflow | K2 | host 720 px then 300 px: columns 2 → 4 → 1 | 0.00 / 24 | 0.00 / 24 |
| keyed reorder | K1 | order reversed; the selected tile moved from (258.0, 77.0) to (46.0, 146.6) at the same size | 0.00 / 12 | 0.00 / 12 |
| font swap | K1 | a Courier New Bold face at `size-adjust: 260%`, served 700 ms late, `font-display: swap` | 0.00 / 110. The tile did not move: K1's heights are fixed by `leading-normal` and its widths by the grid | 0.02 / 110 |
| font swap | K2 (selected: row 1, right) | the same face; names wrap, so the rows above grow and the selected tile moves | 0.00 / 110. The swap moved the tile at frame 88 and every tile is now 118.31 px | 0.00 / 110. The swap landed at frame 63 |

The six cells in totals: 40/44 gating cells per run. The 4 failures are the Playwright WebKit content-visibility rows (2 transcriptions × 2 travel forms).

In the K1 font-swap cell the tile never moved, so that cell reads registration under a swap that moves nothing. K2 is the swap cell that exercises a move.

### 2.3 · Two probe revisions are superseded, and why

- **Run 1** (`logs/register-run1.log`) read inside the mutation's own animation-frame callback. That read forces a layout the frame has not yet run its ResizeObserver step on. Resize and reflow "failed" on that one read (40 px and 302.5 px, 1 frame each).
- **Run 2** (`logs/register-run2.log`) skipped that frame but still read in the callback. It "failed" the K2 font swap for one frame (18.16 px in Chromium, 18.14 in Playwright WebKit): the font landed between frames and the read forced its layout early.
- **Runs 3 and 4 read post-paint.** Both of those failures read 0.00 there.

The Playwright WebKit content-visibility failure is present in every revision. It was then checked in paint (§3.2), because a post-paint read can still force a layout.

---

## 3 · The blocking cell

### 3.1 · The frame ledger (`content-visibility-ledger`, `logs/register-cv-run6.log`)

A counter advances on every animation frame. A probe-only ResizeObserver on the selected tile logs the frame its new size is delivered in, and a MutationObserver on the body's style logs the frame the writer moved it in. The reveal is frame 0.

| engine | ledger (frame: event) |
|---|---|
| Chromium (tile truly skipped, 126 → 100.16) | 0: read 126 / body 126 · 1: read 126 / 126 · **2: tile's ResizeObserver entry 100.16 · 2: body written 100.16** · 2 and after: 100.16 / 100.16 |
| Playwright WebKit | 0: read 126 / 126 · **1: read 100.16 / body 126** · 2: tile's ResizeObserver entry 100.16 · 2: body written 100.16 · 2 and after: 100.16 / 100.16 (`land`; `glide` gives the same sequence one frame later) |

In both engines the body is written in the frame the tile's size reaches ResizeObserver. In Playwright WebKit, layout already has the tile at its rendered size in the frame before that. So content-visibility's relevance change lands after that frame's ResizeObserver step, and no ResizeObserver, on the container or on the tile, can hear it in time.

### 3.2 · In paint (`cv-paint.mjs`, `runs/cv-paint-run2.json`, `logs/cv-paint-run2.log`, load 43.07-47.81)

- **Method.** K2 is loaded with the Back section never rendered and 200 px of room under the group. The tile is revealed with `scrollIntoView({ block: "center" })`, and the main thread is frozen for 900 ms in the task after frame F's paint. The compositor holds that frame while Playwright's screencast records it. One pixel column 80 px right of the tile's centre is read per video frame.
- **The plant.** A stylesheet rule pins the body at 126 px. The first plant, an inline `!important`, was overwritten by Vue's per-property style patch (`logs/cv-paint-run1.log`); run 2's stylesheet plant held. It shows the body's bottom edge 26 px under the tile on 57 frames (Chromium) and 62 frames (Playwright WebKit), so the read can see the defect.
- **The luma profile across the tile bottom** (mean over x 300-420; rows relative to the tile top):

| held frame | tile's own seam | body's bottom edge | reading |
|---|---|---|---|
| Playwright WebKit, frame 1 (video frame 50) | row 93 (luma 219 against 249) | row 119 (27) | **the tile has rendered, and the body paints 26 px below it** |
| Playwright WebKit, settled (video frame 90) | the body edge at 92-93 | the same | registered |
| Chromium, frame 0 (video frame 45) | none above the edge | row 124 (23) | tile and body both still 126 px: consistent |
| Chromium, settled (video frame 80) | the body edge at 97 | the same | registered |

The crops are `$S/cv-paint2/wkF1.png` and `cF0.png` (scratch). Playwright WebKit held at frame 1 shows the curve, the ball and the name inside a body that runs past the tile's own seam. In real time this lasts one frame, about 16 ms, on the first reveal of a never-rendered tile, and only where the consumer's `contain-intrinsic-size` guess (104 px for the content box, 126 px border box) differs from the rendered tile (100.16 px).

**Real Safari: UNMEASURED (owner's safaridriver checkbox).** Playwright WebKit and Safari have disagreed on this library before, so this cell is a Playwright WebKit fact, not a Safari one.

### 3.3 · The stress cell: tiles that move while the container keeps its size

`stress-dir-flip` sets `dir="rtl"` on the group. The container stays 424.00×139.16 (K1) and 426.00×531.69 (K2; 426.00×557.47 in Playwright WebKit). The body stays on the old side, 212 px (K1) and 215 px (K2) off, on 12 of 12 frames, in both engines, in runs 1-4. It is outside the six and it is not the verdict. It is the same class of hole with no one-frame limit: the writer hears the container's size, the model and the options, and nothing else. Any consumer layout change that moves tiles inside an unchanged box escapes it: a locale flip, CSS `order`, a `grid-auto-flow` change, a column-template change at a fixed height.

### 3.4 · The primitive, measured (`route-anchor/`, `runs/register-anchor-run1.json`, `runs/phantom-run1.json`)

- **Support.** CSS anchor positioning parses in both engines: `anchor-name`, `position-anchor`, `anchor()`, `anchor-size()` and `anchor-scope` all report true in Chromium 149 and Playwright WebKit 26.5.
- **The probe.** `route-anchor` gives the selected item `anchor-name: --tg-on` and the group `anchor-scope: --tg-on`. The body is laid out with `left/top: anchor(…)` and `width/height: anchor-size(…)`, overriding the writer's inline rect with a stylesheet `!important`.
- **Registration** (load 38.39 → 42.08). The six cells pass 23 of 24:
  - Playwright WebKit content-visibility passes as transcribed, far, and in the ledger (0.00 px);
  - the direction flip passes 4 of 4, in both engines.
- **The one failure is new, and it is Chromium's.** With the tile about 1676 px away and skipped, the body reads 2013.53 px off its tile at mount. By the anchor spec, an anchor inside skipped contents is not acceptable, so the body loses it.
- **Paint** (`phantom.mjs`, load 41.88-45.65). While the tile is offscreen, 16 px of the visible port differ from an unselected page: the anchorless body paints a speck. `position-visibility: anchors-valid` (`route-anchor-pv`) leaves the same 16 px. The writer's body paints 0 px while offscreen, in both engines. Playwright WebKit's anchored body also paints 0 px.
- **Unmeasured here, and a design cost.** A change of anchor does not start a CSS transition, so the glide would need its own travel on commit (a FLIP from the old rect). The lift-and-land does not need one.

So the missing primitive is a rect the layout pass carries and that stays valid while its tile is content-visibility-skipped. The writer lacks the first property. CSS anchor positioning has the first and, in Chromium, loses the second. A route that keeps the body with both properties does not exist yet.

---

## 4 · What unblocks D4-G, and what it does not change

- **The owner's glance still stands.** If the owner holds Q-11 (a), G is RETIRED for grids whatever registration does (§6.2 question 1). If the owner picks (b) or (c), G returns when one of these holds:
  1. real Safari does not paint the §3.2 frame and the owner accepts a Playwright-WebKit-only frame;
  2. a registration that is both layout-carried and skip-proof is measured green on §2.2's cells, §3.3's stress and the phantom read;
  3. the ruling takes `content-visibility: auto` off selectable tiles (it is the consumer's, in K2's transcription `EasingTarget.css:117`), which moves the cell into the consumer's tranche.
- **What stays true for the other routes.**
  - The body needs flush tiles (Q-2 (b)).
  - A tile's hover plate over the body has to be withheld on the selected tile.
  - The floor's edge (the `edge` arm) needs no registration at all, because it paints on the tile.
- **Not run by this seat.** Questions 3-5 (T-3 on the body, the commit bar, cost and glass); `vue-tsc`, unit tests and the library build on `g-body.patch`; the harness battery under `--route`. §6.2 orders them after questions 1 and 2, and a BLOCK at question 2 stops the route.

---

## 5 · Fences, as kept

- **One git write beyond `worktree add` and `remove`.** To diff the prototype against the floor, the seat committed the floor inside the scratch worktree (`a1249d0d`, detached, author `x`). That breaks the "worktree add/remove only" fence. The commit sits on no branch, and the worktree that held it was removed (`git worktree remove --force`). It is unreachable, so gc can drop it. No other git write was made, and nothing was written to the checkout's index or refs.
- **Writes in the checkout:**
  - `harness/film.mjs` (new);
  - `pass-2/D4-G-block/` (patch, routes, probes, runs, logs);
  - `pass-2/glance-G/` (films, `film.json`, `GLANCE.md`);
  - this file.

  No tracked file was edited. Sibling repositories were not read or run.
- **Scratch root:** `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p2/bt-G/` (`out/builds/g-*`, `film-scratch/`, `cv-paint/`, `cv-paint2/`).
