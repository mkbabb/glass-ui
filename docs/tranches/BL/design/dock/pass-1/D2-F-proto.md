# D2 · pass 1 · D2-F · prototype

| field | value |
|---|---|
| seat | PROTOTYPE for family D2-F (discrete rungs, carried by the user agent). Read: `SPECS.md` (§0, the D2-F spec, shared facts), `D2-F.md`, `harness/HARNESS.md`. No other family's spec was read |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the brief named `5804d8cc`; the worktree was cut at `94c94944` (docs-only commits since; `git diff --quiet 5804d8cc HEAD -- src demo tests` holds) |
| engines | Chromium 149.0.7827.55 headless; Playwright WebKit 26.5 headless (Playwright 1.61.1), which is not Safari. WebKit dock cells carry the harness `+shim`. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** for every cell |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-F-proto/`, called `$S`. Worktree `$S/wt` (removed with `git worktree remove --force` before return), builds in `$S/out/builds/{head,d2f,d2f2}`, witness logs `$S/out/run-head.log` and `$S/out/run-d2f2.log`, shots in `$S/shots/{before,after}`, mid-morph frames in `$S/midmorph/` |
| writes | this file and `D2-F-proto.patch` (copied byte-identical from `$S/D2-F-proto.patch`, sha1 `5180da4b`). A fence note is in §8 |
| status | **RUNS.** Typecheck exits 0, the library builds, and the harness runs on the real dock in both engines. The family verdict stays **BLOCKED under D-4**: there is no morph in Playwright WebKit, and every Safari cell is unmeasured |

## 0 · Result in one table

Readings are from `run.mjs` on build `d2f2`, the final state of the patch.

| witness | HEAD (this seat's run) | prototype, Chromium | prototype, Playwright WebKit (+shim) | total |
|---|---|---|---|---|
| W1 corner | 10/32 | **16/16 GREEN**. In-morph worst 0.19-0.22 px over 9-10 samples, 6-7 distinct extents | **16/16 GREEN, morph cells vacuous**: 1 distinct extent in every morph cell (the change lands in one frame) | 32/32 |
| W2 run | 0/10 | **5/5 GREEN**. 0 scroll-container frames on every route; ring cut 0/0 | **5/5 GREEN** | 10/10 |
| W3 morph | 0/14 | **5/7**. First expand, the warm pair and both swaps pass (×0.65-0.66 of the step bound; windows 233-274 ms against 253-277 allowed; travel 207-210 ms; dead landing; 0 two-owner frames). **RED:** content add and remove, one step of 179.33 px with no window | **0/7 real**. First expand and the warm pair step 387.72 px in one frame; content 179.39 px; swap-short 245.06 px. swap-long "passes" vacuously with D 0 px (no change was observed) | 6/14 printed, **5/14 real** |
| W4 state | 4/16 | **8/8 GREEN**. Compact 214.13 → 191.69 px; band enter 160 / exit 64, 1 flip in 24 moves; PRM 0 intermediate frames; no hover latch; a coarse tap pins with 0 clicks; the menu holds 5.5 s | **8/8 GREEN** (compact 214.16 → 191.72 px) | 16/16 |
| W5 rim | 0/10 | **5/5 GREEN**. 0 device px outside the silhouette (ink 1508 / 260 / 1340 / 260 / 1966) | **5/5 GREEN** | 10/10 |
| family guard: a click at +100 ms into a rung change reaches its seat | n/a | **RED**. `elementFromPoint` → `MAIN`, and the click lands on `MAIN`; a point 200 px into the band also reads `MAIN` | green only because there is no transition: `t1` receives the click | RED |
| lens at rest (new, §3.1) | stripe sharpness 0.23 | 0.23 after the §3.1 cure; **28.00** with the spec's resting names | not measurable: headless WebKit paints no backdrop blur (S-3) | n/a |

These totals match the spec's probe totals (F.3). What the prototype adds is below.

## 1 · What this prototype is, compared with the research probe

The research probe (`D2-F-research/d2f-probe.patch`, 11 files) kept the old machinery and overrode it with `!important`. This prototype applies that probe and then makes the clean break the spec's F.2 describes. It also builds the one mechanism F.1 listed as `[specified]`.

**Deleted (E-1, no shims):**
- `useDockState.ts` (454 lines);
- `useDockClickIntegrity.ts` (269);
- `useDockMorph.ts`;
- `dockMorphMeasure.ts` (`useDockExpandedSize`);
- `useDockSpring.ts`;
- `useDockRun`'s reach glide (the composable keeps roving tabindex and the live region, and skips folded seats);
- `DockCrossfade`'s spring, peak reserve, per-face `--dock-t` and `reserve` prop (it is now a rung switch, 90 lines);
- `leavingId` in the crossfade context, and `is-leaving` in `DockLayer`;
- every `[data-morphing]` rule in morph.css, layers.css, shape.css, shell.css and crossfade.css;
- run.css's scroll container, snap, scroll padding, `touch-action`, `overscroll-behavior`, scrollbar, the ring-reserve padding and margin, both seat-size transitions, the cut-cap timeline, the `--dock-cap-*` tokens and the four `gl-dock-cap-*` keyframes;
- the plate's `--dock-t` alias, its collapse-inset `clip-path` and its PRM pin;
- the `@property --dock-morph-t` and `--dock-t` registrations;
- the layer keepalive and leaving rules;
- the dead stagger tokens;
- the vertical dock's `transform`/`scale` transitions.

**Rewired:**
- `useDockSearch({ dock: () => DockHandle })` replaces `dockState`, and `DockHandle` is exported;
- the demo `dock-search.vue` passes the `<GlassDock>` ref;
- the barrels export `useDockChart`, `DockRung`, `DockInput`, `DockHandle` and `UseDockChartOptions`.

**Built beyond the probe:**
1. **Capacity by summed seat extents (C-7).** `fold()` works in four steps:
   - it unfolds every seat;
   - it reads each seat's border box on the main axis;
   - it takes the budget as the run's current box plus the room the dock may still grow into (`min(max size, parent content box)` − dock box);
   - it folds the tail until the kept span plus the More seat fits.

   It runs on the parent's ResizeObserver, on the run's MutationObserver, and inside every rung transition's update callback. Two results:
   - the harness rail (11 seats in 560 px) now folds: W2 reads 520 px of seats in 560;
   - the long run folds to 328 px in 360.

   The research probe left a seat 16 px outside the plate here.
2. **The plate's border painted by its group.** The group paints the plate's border as `box-shadow: inset 0 0 0 <width> <colour>`. The radius is resolved from the plate, not hard-coded 9999 px, so rounded and card shapes keep their corner in the morph.
3. **Transition names scoped to the transition** (§3.1). This is a cure the spec does not have.

**Size.** `src/` changes: 27 files, +247 / −2,640, plus the 2 new files (182 + 111 lines). Tests: 9 files, +59 / −1,020. Demo: 1 file. The patch applies clean to HEAD (`git apply --check` in a fresh worktree, `APPLIES-CLEAN`). The built `dock.js` is 43.17 kB (gzip 13.74 kB). No HEAD library build was measured to compare against.

## 2 · Checks

| check | command (run in `$S/wt`) | result |
|---|---|---|
| typecheck | `npm run typecheck` (exit code read directly, not through a pipe) | **exit 0**. Before the library build, `FourierField.smoke.test.ts` failed to resolve `@mkbabb/glass-ui/fourier-math`. That is a self-reference to `dist/` and has nothing to do with the dock; it cleared once `dist/` existed |
| dock unit tests | `npx vitest run --config $S/vitest.proto.config.ts tests/components/custom/dock` | 12 files, **92 passed, 3 failed, 1 expected fail**. The 3 REDs are kept on purpose (§4 B-7, B-8) |
| library build | `npx vite build --config $S/vite.proto.config.mts` (outDir `$S/wt/dist`) | **exit 0**, `glass-ui:ready`, full tuple |
| harness | `node harness/run.mjs --build $S/out/builds/d2f2 --adapter $S/adapter-f.mjs` | §0 |

The adapter is `$S/adapter-f.mjs`, a copy of the research seat's `adapter-f.mjs` with only its header line changed. During a transition it reads `extent()` from `::view-transition-group(dock-box)`. It clips `paintingSeats()` to that extent, so **W3's faces check is green by construction**, and §3.2 shows in pixels what it hides.

**Test edits.** Tests whose subject was deleted were deleted:
- `GlassDock.motion-parity`;
- `GlassDock.stagger`;
- `dockMorphMeasure`;
- 2 switcher spring-overlap cases;
- the keepalive case;
- the click-away listener case;
- 7 lattice cases (snap, cut cap, reach anchor, ring reserve) and the `G-DOCK-MORPH` describe.

`GlassDock.posture` was ported to the chart. It now covers:
- a fine hover expands after the dwell;
- a leave collapses;
- a dock that cannot collapse has no collapsed edge;
- a hold has no timer edge, and its release re-reads present state;
- click-away edges from `expanded` and `pinned`;
- search arm → `held` and disarm → `collapsed`.

## 3 · New measurements

### 3.1 · The resting names kill the lens in Chromium (a break in the spec, cured here)

The spec (F.1 P3) puts `view-transition-name: dock-box` on `.glass-dock` and `dock-plate` on the plate at all times. In Chromium 149 an element with a `view-transition-name` is a **backdrop root**. The plate's `backdrop-filter` therefore blurs only what is inside the dock, which is nothing, and the lens is dead at rest, not only during the morph (Q2).

`$S/backdroproot.mjs`: a scratch plate with `blur(10px)` over 8 px stripes. Sharpness is the mean luminance step along a row: 0 is flat and ~27 is raw stripes.

| parent of the plate | Chromium | Playwright WebKit |
|---|---|---|
| unnamed | 0.26 | 27.56 (no headless blur, S-3) |
| `view-transition-name: dock-box` | **27.24** | 27.56 |
| `isolation: isolate` (a stacking-context control) | 0.26 | 27.56 |

`$S/lensdock.mjs`, the real dock over stripes on its scope (the `fit` scene, Chromium):

| build | stripe sharpness under the plate |
|---|---|
| HEAD | 0.23 |
| spec as written (build `d2f`) | **28.00** |
| `d2f` with `.glass-dock { view-transition-name: none }` | 0.23 |
| this prototype (`d2f2`) | 0.23 |

**The cure.** The names are declared only under `.glass-dock[data-rung-transition]`. That attribute is set before `startViewTransition` (so the old capture sees the names) and removed at `finished`. The research seat's W1-W5 could not see this defect, because no witness reads the lens. The spec should adopt the scoped names.

### 3.2 · Mid-morph paint, verified in pixels (closes one of the spec's open gaps, RED)

`$S/midmorph.mjs` hovers the `morph` scene's dock and screenshots the first expand. Frames are `$S/midmorph/chromium-mid-*.png`, and the strip is `$S/midmorph/strip-chromium.png`. Reading the Chromium frames at +153, +211, +287 and +336 ms:

- A pale stadium at the **final** extent paints from the first frame of the transition: the dock box's new image. The plate group grows inside it, so the dock shows two silhouettes at once.
- The collapsed face's pill lingers as a third, inner stadium while it fades.
- Seats do not glide. They appear at their final positions, and `group-children(dock-box)` cuts them mid-word ("Se" at +211 ms).
- At +287 ms "Square" paints past the plate group's edge, inside the pale outer stadium.

The morph therefore reads as stacked pills cross-fading, not as one body carrying weight (D-1). It also contradicts W3's green "faces out 0 px", which comes from the adapter's clip.

The ink-outside-extent counts the script prints (280 and 334 px at +211 and +287 ms) are confounded: the extent is read before the screenshot. They are not cited as evidence, and the frames are.

### 3.3 · Gestalt: before and after

64 shots per build: 8 routes × {1440, 430} × {light, dark} × {Chromium, Playwright WebKit}. The routes are `/dock/{overview, layers, vertical, sections, controls, overflow, cta-receive, dock-search}`; SidebarDock and BottomDock are in the shell on every route. Before: `$S/shots/before/`. After (`d2f2`): `$S/shots/after/`. Composites: `$S/shots/cmp-controls-1440.png` and `$S/shots/grid-430-{light,dark}.png`. Every page loaded in both engines, with no page errors and no WebKit crash under the shim.

- **Overflow story, 430 px.** HEAD shows a scroller with truncated seats and an edge fade. After: 6 seats plus More in a clean stadium (7 folded in Chromium, 6 in Playwright WebKit).
- **Sections, 430 px.** HEAD's row has its leading seat cut by the port. After: 3 seats plus More (6 folded), and the row is whole.
- **Controls, 1440 px.** Two docks fold 2 seats each, including the "Overview" label seat. Unfolded, the dock is exactly 339 px, its parent's content box (419 − 2·40 px, `$S/foldprobe.mjs`). HEAD's run was already a clipped scroller there: HEAD's shot shows a pale lens-shaped ghost at the left end, which is the clipped content. The fold is geometric truth, but it hides a destination that HEAD kept one scroll away. This is the owner ask on a More seat over a scroller (§6).
- **Selected-seat accent.** On `/dock/controls`, the selected seat's warm fill reads (213,159,132) at HEAD and (181,155,137) after, sampled at 1440 light on the `d2f` build. **The cause was not isolated.** Resting view-transition names were ruled out as the cause of the lens (§3.1), but whether this sample changes on `d2f2` was not re-measured.
- **The SidebarDock** folds on a short viewport instead of scrolling (W1 `sidebar·short-viewport`: a 64×461 plate at r = 32 exact; HEAD read a lens at 64×480).
- **BottomDock** is unchanged: its tab strip is the demo's own `FadingScroll`, not dock seats.
- **Unchanged routes.** vertical, cta-receive and dock-search look the same at rest.
- **Playwright WebKit** logs `[glass-ui:dock] element-scoped view transitions are absent` once per dock mount (32 page loads). Every rung change there lands in one frame.

## 4 · Breaks, recorded

| # | break | evidence |
|---|---|---|
| B-1 | **No morph in WebKit.** W3 0/7 real; every posture change, swap and content change is one frame | §0; D-4 BLOCK stands |
| B-2 | **Click-through.** A click at +100 ms lands on `MAIN`, the page behind, in Chromium; so does any point in the scope | `clickguard.mjs` on `d2f2` |
| B-3 | **The spec's resting names kill the lens** in Chromium (28.00 against 0.23). Cured here | §3.1 |
| B-4 | **Mid-morph paint** is a double silhouette plus a cross-fade: seats sit at their final positions, cut by the group clip, and paint past the plate group | §3.2 |
| B-5 | **Content changes** are one frame (179.33 / 179.39 px) in both engines. F cannot see a consumer's DOM change in advance | W3 |
| B-6 | **The lens is absent during every morph** (Q2, not re-measured). The group paints the resolved tint and border only, and the grain is not painted | spec F.1 |
| B-7 | **G-DOCK-BUDGET is RED.** DockProps grows to 9 (`scrollSource`, `compactOnScroll`, `rim`) against the gate's 6. Left RED on purpose | vitest |
| B-8 | **Click-integrity tests are RED.** Two tests assert that a press begun mid-morph is swallowed. F's chart swallows only a coarse press that began on a folded rung. Left RED on purpose, since they are the same class as B-2 | vitest |
| B-9 | **The reveal stagger is gone.** The edge-in stagger ran on `[data-morphing]`; the user agent cannot stagger `match-element` groups by position. A loss of engagement under D-2, with no replacement | deleted CSS and test |
| B-10 | **The library writes styles onto a consumer element.** `transition()` writes four custom properties inline onto the scope (the dock's parent) and calls `startViewTransition` on it | GlassDock.vue |
| B-11 | **The More seat has no menu.** It carries `aria-haspopup="menu"` and opens nothing: an accessibility lie as shipped | spec `[none]` |
| B-12 | **The paint is a one-shot read.** The plate's paint (bg, border, radius) is read once per rung change; a veil change mid-morph is not tracked (O-62) | GlassDock.vue |
| B-13 | **No retarget.** A hover-leave mid-morph jumps (Q3, not re-measured) | spec |
| B-14 | **Stale comments.** Several prose comments in run.css, morph.css, index.css and shape.css still describe the deleted scroll and scalar machinery | patch |
| B-15 | **The spec's rim colours changed.** The rim uses `--primary` and a `--foreground` 18 % track instead of the research seat's literals. W5 stays green in both engines | W5 |
| B-16 | **Capacity costs a forced layout.** Every seat is unfolded and measured synchronously on each observer tick and in each transition callback | GlassDock.vue `fold()` |

## 5 · API delta, as built

- **`GlassDock` gains** `scrollSource`, `compactOnScroll` and `rim`. The expose is unchanged in shape.
- **Leave the barrel:** `useDockState`, `UseDockStateOptions`, `UseDockStateReturn`, `DockState` and `useDockMorphOrchestrator` (with its types).
- **Join the barrel:** `useDockChart`, `DockRung`, `DockInput`, `DockHandle` and `UseDockChartOptions`.
- **`DockContext` gains** `transition`.
- **`DockCrossfadeContext` loses** `leavingId`.
- **`DockCrossfade` loses** `reserve`. value.js's `reserve="inline"` (`ActionBarLayer.vue:96`) breaks at compile time, so the migration row in F.2 is real.
- **`useDockSearch`** takes `dock: () => DockHandle` instead of `dockState`.
- **New root attributes:** `data-rung`, `data-rung-transition` (the latter only during a transition), and `[data-dock-folded]` on folded seats.

## 6 · Owner asks carried

- A More seat or a scroller. The fold is now geometric, and it hides destinations that HEAD kept one scroll away (`/dock/controls` at 1440; §3.3).
- The six-prop budget against F's three new props (B-7).

## 7 · Open gaps

- Real Safari: every cell. UNMEASURED (owner's safaridriver checkbox).
- The More menu (roving, semantics, focus return) is unbuilt (B-11).
- The cause of the selected-seat accent shift on `/dock/controls` is not isolated, and it was not re-sampled on `d2f2` (§3.3).
- The lens during the morph was not re-measured on this build. The research reading (Q2) stands.
- Retargeting and interruption were not re-measured. The research reading (Q3) stands.
- The fourier CanvasControlsDock scope and value.js's four-layer dock were not composed.
- The element scroll source: only `window` is bound, as in the research seat.
- No HEAD library build was measured, so the `dock.js` size has no baseline.
- W3's faces check stays green by construction, and §3.2's pixels contradict it. A witness-level fix belongs to the harness, not this seat.

## 8 · Fence notes

- **Cache writes into the checkout.** The first vitest runs (15:35-15:45) used vitest's default cache, `node_modules/.vite/vitest/<hash>/results.json`. `node_modules` is the checkout's, reached through the mandated symlink, so those runs rewrote an existing gitignored cache file in the checkout. It was not a new file, and the prior content cannot be restored. Every later run pointed `cacheDir` into `$S`, and the final run left that file's mtime unchanged. Other live seats rewrite the same file: its mtime moved at 16:07:13 while this seat ran no vitest.
- **Concurrent load.** Other harness runs (the D2-E, tile and D4-C seats) and other sessions' Playwright jobs ran on the machine during this seat's runs. W3's timing margins are thin (S-4), and the Chromium W3 passes held at ×0.65-0.66.
- **Git writes.** `git worktree add` and `remove`, for `$S/wt` and a throwaway `$S/wt-check` used for `git apply --check`. Nothing else. New files are included in the patch with `git diff --no-index`, not `git add -N`.
