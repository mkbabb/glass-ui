# D2 · pass 1 · D2-A · prototype (the total lattice)

| field | value |
|---|---|
| seat | D2 pass 1, PROTOTYPE for family D2-A. It test-implements `SPECS.md` §D2-A on the real dock source and runs every harness witness over it |
| model | `claude-opus-5-5`, asserted from own system identity |
| tree | The brief named `5804d8cc`; the worktree was cut at the checkout's HEAD `a1e72ebd`. `git diff --quiet 5804d8cc a1e72ebd -- src` holds, so the base is the v10.0.1 dock |
| engines | Chromium 149.0.7827.55 headless; Playwright WebKit 26.5 headless (Playwright's build, not Safari). Node v26.0.0. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** |
| scratch | `S` = `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-A-proto`. The worktree `$S/wt` was removed before return |
| patch | `D2-A-proto.patch` beside this file. It is `git diff HEAD` plus the two new files. `git apply --check` passes against the checkout's HEAD |
| verdict | **RUNS.** It passes typecheck on `src`, builds the library and runs all five witnesses. It reads **58/82** cells against HEAD's **13/82**, and **64/82** with the cut cap dropped (one token line) |

The research seat's probe files (`D2-A-research/r2/proto/`) were gone from scratch, so the prototype was rebuilt from `SPECS.md` §D2-A and `D2-A.md` alone. Every number below comes from a command in §7. WebKit numbers are Playwright WebKit and carry the harness `+shim` (`HARNESS.md` §4).

## 0 · Result

| witness | HEAD (re-run here) | prototype, Chromium | prototype, Playwright WebKit | total | with the cut dropped |
|---|---|---|---|---|---|
| W1 corner | 9/32 | 13/16 | 13/16 | **26/32** | **32/32** |
| W2 run | 0/10 | 3/5 | 3/5 | **6/10** | — |
| W3 morph | 0/14 | 3/7 | 3/7 | **6/14** | — |
| W4 state | 4/16 | 5/8 | 5/8 | **10/16** | — |
| W5 rim | 0/10 | 5/5 | 5/5 | **10/10** | — |
| **all** | **13/82** | 29/41 | 29/41 | **58/82** | **64/82** |

Each engine's column counts that engine's cells only, so the total is the sum of the two columns. The totals match the research seat's (`SPECS.md` A.3) cell for cell. The HEAD re-run on the same base reproduced `HARNESS.md` exactly: 9/0/0/4/0.

**Green** (both engines):
- W1: every rest and every sampled morph frame reads a stadium (worst 0.137 px in Chromium, 0.035 px in WebKit, bound 1 px). HEAD read 4.6-11.8 px there.
- W2: route 1 (long runs, h and v): ring cut 0.5/0.5 px in Chromium (exactly at the bound), 0/0 in WebKit. HEAD cut 2.5/2.5. Route 2 (collapsed layer): 0/73 and 0/36 frames with a seat scroll container. HEAD had 81/81.
- W3: first expand, warm collapse and warm expand. D 379.66 px, largest step ×0.65-0.66 of the bound, faces 0 px out, dead landing (0 reversals), window 216.1-216.7 ms (Chromium) and 216 ms (WebKit) against the 210 ms clock, 0 two-owner frames. HEAD: a one-frame 387.66 px first expand and windows of 545-552 ms.
- W4: compaction 206.13 → 56 px (posture `compact`). Hover, leave, focus, blur and top read 206.13 / 56 / 206.13 / 56 / 206.13. Reduced motion shows 0 intermediate frames on both compaction and posture. The menu holds.
- W5: rim ink 1337 / 1338 device px expanded, 185 / 186 collapsed and compact, 0 px outside the silhouette.

**Red, and why:**
- W1: rail rest, rail scrolled end and the demo sidebar at 1440×600, both engines. The worst read is 4.638-4.679 px (mean r 29.99 against 28). The cause is the kept cut cap (C-5, an owner ruling), and with the cut dropped they read 0.133 / 0.027 px.
- W2 routes 3 and 4: a fitting active run is still an `overflow-x: auto` container, in 238/238 and 210/210 frames (Chromium) and 126/126 and 118/118 (WebKit). The range is 0 in every frame (C-1: pure CSS cannot compare Σk against the budget).
- W3: content add and remove is 179.33 px in one frame, and a layer swap 244.98 px, with no window (C-2, C-3; the spec has no mechanism for either).
- W4 no-bounce: 24 flips in 24 moves (C-4: the compaction is a function of offset). Coarse no-hover-latch and coarse tap-pins: floor row 3 is not in the spec, so it was not built.

## 1 · What was built

**Files.**
- Tracked: 15 files, +139 / −974 (`git diff HEAD --numstat`).
- New: `styles/aperture.css` (341 lines), `composables/useDockScrollTimeline.ts` (89 lines).
- Rewritten: `composables/useDockMorph.ts` (99 lines, no spring).
- Deleted: `composables/dockMorphMeasure.ts` (142) and its test `dockMorphMeasure.test.ts` (171).

| problem | spec line | as built |
|---|---|---|
| P1 corner | pad concentric, corner = cross/2, `--dock-cap-rest` deleted | `--dock-pad: var(--dock-padding-block)` on every side (8 px). `--dock-cross` = seat + 2·pad = 56. `--dock-corner` = 28. `--dock-cap-rest` is gone with no alias. The plate's per-corner radius reads two registered lengths, `--dock-cap-s` / `--dock-cap-e` |
| P1 cut cap | a ruling, one token line | Kept by default: `--dock-cap-cut: var(--radius-card)`, with ranges `0 min(pitch, 50%)` and `calc(100% − min(pitch, 50%)) 100%`. Dropping it is `--dock-cap-cut: var(--dock-corner)` (measured through the adapter, `D2A_NOCUT=1`) |
| P3 carrier | `--dock-extent-t` registered, transitioned on the dock clock; the script writes only the posture class | As specified. `@property --dock-extent-t` is `<number>`, `inherits: true`, initial 1, and `.collapsed` sets 0. The transition is `var(--spring-dock-duration) var(--spring-dock)`. `[data-morphing]` runs from the flip to the scalar's own `transitionend`. A flip that starts no transition (reduced motion) settles in the same flush: `getAnimations()` flushes style, so it finds no `CSSTransition` |
| P3 closed form | E_c from `:has()` rungs; a = clamp(0, min(t, 1 − c), 1) | As specified: n_c = n_persistent + n_summary + n_persistent-end, three rungs per region, and an `:empty` summary counts 0. The full face stays in flow at every posture. The summary is out of flow at the run's start |
| P3 carriers | δ on the plate's own `clip-path`, the row's glide and clip, and the `.dock-shadow` insets | **Deviation:** δ is stamped on the plate's own **insets** (`left`/`right`, `top`/`bottom` vertical). The plate therefore *is* the aperture, and its border, its elevation (`box-shadow` moved off the root) and its rim follow it. The spec's plate `clip-path` cuts the 1.5 px border off the collapsed caps, because the border sits at the full-footprint box edges, and it needs a fourth box for the shadow. There is still no wrapper, so the backdrop-root rule (Q-BR) holds. The row carries the glide `translate` and an `inset(… round corner)` clip, and both exist only under `.collapsed`, `[data-morphing]` or `[data-compact-on-scroll]`. At expanded rest the row is transform-free and unclipped |
| P3 row clip | `round` at corner + pad (S-7) | `round var(--dock-corner)`. The row's clip rect, extended by −pad on three sides and cut by span − pad on the fourth, is exactly the plate's rect, so its radius is the plate's corner |
| P3 anchor (S-6) | derived, not probed | **Built and measured** (§3.3): an `anchor` prop sets `data-anchor` start/end, and s ∈ {0, 0.5, 1} splits the span. The trailing `#persistent-end` region takes `left: −(1 − a)(100% + 2·pad − E_c)` (horizontal only). The vertical twin is not built, since a percentage `top` against an auto-height row is not sound |
| P2 run | native snap scroller plus a paint gutter; inactive faces `overflow: clip` | `.dock-run.is-active` gets `padding: var(--dock-paint-reach)` with an equal negative margin on both axes. `scroll-padding` is pitch/2 + reach. `--dock-paint-reach` = (`--scale-hover-dock` − 1)·seat/2 + `--scale-hover-dock`·`--dock-ring-reserve` = 6.4 px ≤ pad (S-5 holds). The inactive run is `overflow: clip`. The timeline is named only on the active run. The open seat's 11.2 px main-axis reach is not covered (S-5 names two cures and this prototype picked neither) |
| P4 compaction | ramp × gate; the binder fails loud (S-8) | `gl-dock-compact` on `animation-timeline: var(--dock-page)`, range 0 to `--dock-compact-distance` (200 px). `--dock-c-gate` is registered and transitioned with a 150 ms delay that `:focus-within`, `[data-held]`, `[data-kept-open]` and `(hover: hover) :hover` zero. `data-compact-on-scroll` is set only after `useDockScrollTimeline` binds. The window gets `scroll(root block)`. An element gets a per-dock name appended to its `scroll-timeline-name` / `-axis` lists and to `:root`'s `timeline-scope`, and the originals are restored on dispose. A getter that resolves `null` logs `console.error` and leaves the dock full. It does not throw, because a throw inside a post-flush watcher reaches the app's error handler |
| P5 rim | a child of the plate, clipped by the plate | A `progressRim` prop renders `<span class="dock-rim">` inside the plate, and `overflow: clip` on the plate rounds it (S-29). **Addition:** a track under the fill (`--foreground` 14 %, one translucent `color-mix` arm, so it cannot trip the WebKit crash). A fill-only rim paints 0 px at scroll 0, which W5 read as "rim ink 0" on the first run |
| stale readers | `crossfade.css:122,130` must be rewired (C-16) | Deleted. The row's own aperture clip cuts a spilling face |

**Deleted as dead:**
- the box `scale` and its counter-scale (`shape.css`);
- the `--dock-live` / `--dock-size-scale` blend and the `--dock-expanded-px` reserve (`layers.css`);
- the `--dock-expand-t` class forks and the padding lerps (`morph.css`);
- `--dock-morph-t` and its registration, and the plate's `--dock-t` alias and its PRM pin (`dock.css`);
- the plate `clip-path` and its grasp stand-down;
- the vertical root `transition` list (`shell.css`).

`--dock-expand-t` is now `var(--dock-extent-t)` everywhere, and the plate ink, the stagger and the shape-card corner read it.

**Public API delta:**
- `GlassDock` gains `scrollSource`, `compactOnScroll`, `progressRim` and `anchor`.
- The root gains `data-kept-open`, `data-anchor`, `data-compact-on-scroll` and `data-rim`.
- `useDockScrollTimeline` is exported from the dock composables barrel.

## 2 · Build gates

| gate | command (in the worktree) | result |
|---|---|---|
| typecheck | `npm run typecheck` | `src` pass. The test config fails on 2 lines in `tests/components/fourier-field/FourierField.smoke.test.ts`: `@mkbabb/glass-ui/fourier-math` resolves to `dist/fourier-math.d.ts` (package.json:58-59), which a fresh worktree lacks. That file is untouched by this patch. After the `g-dock-lattice` import fix, nothing else fails |
| dock unit tests | `npx vitest run tests/components/custom/dock` | 14 files. **112 pass, 9 fail**, 1 expected fail. The 9 failures are listed below |
| library build | vite build of `vite.config.ts` through `vite.runnerImport` (`$S/libbuild.mjs`) | pass in 7.96 s. 222 entries in the worktree's `dist/`. `dist/components/dock/styles/aperture.css` carries `@property --dock-extent-t{syntax: "<number>";inherits: true;initial-value: 1;}` |

The 9 unit failures:
- **`GlassDock.motion-parity.test.ts`, 4 tests.** These specify the deleted spring driver: a stray `transitionend` must be inert, A→B→A keeps the flag, a reversal starts from the live plate, and reduced motion settles. Under D2-A the `transitionend` *is* the settle, and jsdom runs no CSS transitions, so the flag settles at once. These re-point, and they cannot simply pass.
- **`g-dock-lattice.test.ts`, 5 source gates that the spec's surface crosses:**
  - "DockProps is at most six members": it now has 10.
  - "exactly one member flexes": `.dock-controls` now flexes too.
  - "the cap keyframes only through the rest/cut token pair": the keyframes now write `--dock-cap-s/e`.
  - "the ring reserve is stated in the box model": the active run's padding is now the paint reach.
  - "the cut cap is the band's only animated radius": the gate expected the four old keyframe names.
- The G-DOCK-MORPH measurement tests were deleted with the code they tested, and replaced by one gate: `useDockMorph.ts` contains no `ResizeObserver`, `offsetWidth` or `getBoundingClientRect`.

## 3 · Witnesses, cell by cell

Command: `node harness/run.mjs --build $S/out/builds/d2a --adapter $S/adapter-d2a.mjs --out $S/out/runs-d2a`. The build is `node harness/build.mjs $S/wt --out $S/out --label d2a`.

The prototype adapter differs from `adapter-head.mjs` in five reads:
- `config` binds `scrollSource: "@window"`, `compactOnScroll` and `progressRim` on the compact scene, and `progressRim` on the rim scenes;
- `insetOf` resolves `calc()` / percentage insets in a computed `clip-path`, which lib's parser reads as 0, through a probe element's `margin-left`;
- `posture()` reads `compact` when `--dock-c-scroll × --dock-c-gate` ≥ 0.5;
- `rim()` is the plate's `.dock-rim`;
- `compact()` is `[data-compact-on-scroll]`.

### 3.1 · The five witnesses

| cell | Chromium | Playwright WebKit (+shim) |
|---|---|---|
| W1 fit rest / hovered rest | 0.137 / 0.137 px | 0.035 / 0.035 px |
| W1 sidebar 1440×900 | 0.133 | 0.027 |
| W1 sidebar 1440×600, rail rest, rail end (cut kept) | **4.638, 4.679, 4.638** | **4.644, 4.643, 4.644** |
| same, cut dropped (`D2A_NOCUT=1 … --only W1`) | 0.133 each | 0.027 each |
| W1 morph and vmorph, collapsed and expanded rest | 0.137 / 0.133 | 0.027-0.032 |
| W1 morph frames (first expand, warm collapse, warm expand, h and v) | 0.133-0.137; 7-9 distinct extents per transition | 0.027-0.032, but **1 distinct extent per transition: vacuous** (§4) |
| W2 route 1 h / v | cut 0.5/0.5 (clipped 3.75 against free 4.25) | 0/0 |
| W2 route 2 | 0/73 frames with a scroller | 0/36 |
| W2 route 3 | **238/238** container frames, range 0 | **126/126**, range 0 |
| W2 route 4 | **210/210**, range 0; ring cut 0/0 | **118/118**, range 0 |
| W3 first expand | step ×0.66 (31.28 against 47.7 px), window 216.7 ms (allow 253.3), travel 208.2 ms | ×0.65, window 216 ms (allow 263), travel 199 ms |
| W3 warm collapse / expand | ×0.65 / ×0.65; windows 216.1 / 216.7 ms | ×0.65 / ×0.65; 216 / 216 ms |
| W3 content add / remove | **179.33 px in one frame**, no window | **179.39**, no window |
| W3 swap long / short | **244.98 px in one frame**, no window; faces 0 px out | **245.06**, no window |
| W4 compacts / engagement | 206.13 → 56; 206.13 / 56 / 206.13 / 56 / 206.13 | 206.16 → 56; same pattern |
| W4 no-bounce | **24 flips** (enter 100, exit 96, band 4 px) | **24 flips** |
| W4 PRM compact / posture | 0 / 0 intermediate frames | 0 / 0 |
| W4 coarse no-hover-latch | **scale 1 → 1.1 and the tint latched 1.5 s after the tap** | **same** |
| W4 coarse tap-pins | **pinned, but 1 click fired on "Play"** | **same** |
| W4 menu holds | open, pinned, 177.47 px | open, pinned, 177.5 px |
| W5 h/v expanded, h/v collapsed, compact | ink 1337 / 1337 / 185 / 185 / 185; 0 outside | 1338 / 1338 / 186 / 186 / 186; 0 outside |

Swap-short faces read 0 px out here; the research read 3.19 px. The gutter is 6.4 px on the main axis too, not 11.2, so the run box stays inside the pad.

### 3.2 · Smoke (Chromium, `$S/smoke.mjs`)

| state | plate | row clip | row translate |
|---|---|---|---|
| collapsed rest | 102×56, `left` 189.828 px | `inset(-8px calc(100% - 94px) -8px -8px round 28px)` | `calc(50% - 43px)` |
| expanded rest | 481.66×56 | `none` | `none` |

The root stays 482×56 in both postures. 0 page errors, 0 console errors.

### 3.3 · Anchor (S-6, `$S/anchor.mjs`)

Collapsed morph dock; the root spans 479.17-960.83.

| anchor | plate, Chromium | gaps to root start / end | painting seats |
|---|---|---|---|
| start | 479.17-581.17 | 0.00 / 379.66 | 487.17-527.17, 533.17-573.17 |
| center | 669.00-771.00 | 189.83 / 189.83 | — |
| end | 858.83-960.83 | 379.66 / **0.00** | 866.83-906.83, 912.83-952.83 |

Playwright WebKit: identical to ±0.06 px (end gap 0.00). The research read an 83 px gap from the anchor at `end` without S-6 (C-10). The painting seats sit 8 px inside the plate at every anchor.

## 4 · Engines: the WebKit screenshot completes registered-property transitions

**The symptom.** Every Playwright WebKit W1 morph-frame cell sampled **1 distinct extent** in 12-16 screenshots over 220-233 ms, and passed only because the one extent was a rest. HEAD's WebKit cells sampled 15-16 distinct extents, and the prototype's Chromium cells 7-9.

**First probe (`$S/wkpaint.mjs`).** It samples the painted plate width by screenshot after a `mouseenter`:
- Playwright WebKit reads 102 px until 65 ms, then 482 px from 77 ms on. That is 2 distinct widths in 30 samples, and an in-page rAF read loop does not change it.
- Chromium reads 102 → 107 → 140 → … → 482: 15 distinct widths.

**Scratch page (`$S/qwk.mjs`).** It compares carriers, 600 ms linear, 14 screenshots:

| carrier | Playwright WebKit | Chromium |
|---|---|---|
| plain `left` transition | 14 distinct | 14 distinct |
| a registered `--t` transition read by `left` (B), by `translate` (C), or inherited from a parent (D) | **1** (300 from the first shot) | 14 distinct |
| a `@keyframes` animation of `--t` (E) | 14 distinct | 14 distinct |
| `--t` and `left` both transitioned (F) | 14 distinct | 14 distinct |

**Cause (`$S/qwk2.mjs`, 900 ms linear).** The screenshot is the cause, not paint:
- **Reads alone, no screenshot:** the box reads 0, 36, 69, 104 … 300 over 908 ms in WebKit, a transition that runs.
- **Read, shot, read at about 300 ms:** 98 → `page.screenshot()` → **300** in WebKit, against 100 → 103 in Chromium.
- **The screencast (`recordVideo`, decoded at 25 fps with ffmpeg):** the WebKit box paints 0, 14, 26, 42, 52 … 300 and back down again. It snaps to 300 only at the frame where the screenshot was taken.

So Playwright WebKit's `page.screenshot()` finishes a running transition of a registered custom property. Paint follows the transition between shots.

**Consequences:**
- W1's WebKit morph-frame cells cannot observe a CSS-owned posture morph. Any family whose carrier is a registered-property transition inherits this. D2-F's "WebKit morph cells vacuous" (`SPECS.md` witness totals) may be the same instrument artifact; nobody has measured whether it is.
- W3, which reads without screenshots, is unaffected: 199-201 ms of travel in WebKit.
- Real Safari: UNMEASURED (owner's safaridriver checkbox).

## 5 · Gestalt read

**Method.** `node $S/shots.mjs <build> <label>`, Chromium, over `/dock/{overview, layers, vertical, sections, controls, overflow, cta-receive, dock-search}`. These pages also carry the demo's `SidebarDock` and `BottomDock`. Each page is shot at 1440×900 and at 430×848 (mobile, touch), in light and dark, plus a 1440 light full page: 32 page states per build. The PNGs and `docks.json` (every dock's box, plate and posture) are in `$S/shots/head/` and `$S/shots/d2a/`, with side-by-side pairs `$S/cmp-*.png` and zooms `$S/zoom-*.png`. 0 page errors in either build.

**What reads better:**
- The lens corners are gone. HEAD's "Assets · Layers · Libraries" dock and the layer-switcher dock (`/dock/layers`) show HEAD's percentage-radius lens bulge at the caps. The prototype paints clean stadiums (`cmp-layers-1440-light.png`).
- Mid-morph, the border and the elevation follow the aperture, and the caps stay round (`crop-smoke-chromium-morph-mid.png`).
- `overview`, `controls`, `sections`, `overflow` and `cta-receive` are otherwise near-identical at both widths and in both schemes.

**What changed:**
- Every dock is 8 px narrower on the main axis, and every vertical dock 8 px narrower on the cross axis. The concentric pad is 8 px, not the 12 px inline pad. `SidebarDock` goes 64 → 56 wide and `BottomDock` 963 → 955.
- A collapsed dock's *box* now keeps its expanded footprint: "Starts compact" 56 → 219, `dock-capture` 56 → 493, the vertical "Starts compact" 64×110 → 56×321. Its plate is unchanged at 56 / 102. Surrounding layout reserves the expanded space (portfolio risk 3).
- The glass rims (`--glass-rim-top` / `-bottom`, inset shadows) now paint over the plate's own background. At HEAD they painted on the root under the plate.

**Regressions that no witness covers:**
- **`dock-nested-collapsible`** (`/dock/layers`, a collapsible dock around a `DockLayerGroup` with a column switcher) collapses to a **56×108** plate with its glyph at the top, against HEAD's 56×56 circle. Expanded, it is a 251.7×108 rounded rectangle with r = 28, not a stadium (`cmp-nested.png`). The in-flow full face carries the switcher's 108 px onto the cross axis. The closed form knows the cross only as the `--dock-cross` token, so a dock whose content is taller than one seat breaks both the collapsed circle and the stadium.
- **The collapsible vertical "Starts compact" dock** (`/dock/vertical`) collapses to a 56×102 pill that floats mid-column in its reserved 321 px box (`cmp-vertical-1440-dark.png`). HEAD's pill sat at the top. A vertical column wants `anchor="start"`, and the demo does not pass it.
- **Crossfade overlap.** On the posture morph the summary glyph ("P") fades out over the full face's first seat ("1"), which sits at the same run-start position. Mid-expand the two glyphs read as one smudged mark (`crop-smoke-chromium-morph-mid.png`).

## 6 · Breaks recorded

1. W1 ×6: the kept cut cap, 4.64-4.68 px. It is an owner ruling (C-5), and dropping it takes W1 to 32/32.
2. W2 ×4: a fitting active run is a scroll container, range 0 (C-1).
3. W3 ×8: content change and layer swap in one frame (C-2, C-3).
4. W4 ×2: no position hysteresis, 24/24 flips (C-4).
5. W4 ×4: floor row 3 is not built (coarse hover latch, tap-pins); the spec has no mechanism for it.
6. Unit tests: 4 motion-parity specs of the deleted spring driver; 5 `g-dock-lattice` source gates, including the six-member `DockProps` law, now 10.
7. Gestalt: the nested switcher dock (56×108 collapsed, and not a stadium expanded) and the vertical collapsed pill floating mid-column (§5).
8. Harness: Playwright WebKit's screenshot completes registered-property transitions, so W1's WebKit morph frames are vacuous for this family (§4).
9. Not re-measured, carried from the research (`SPECS.md` A.1, A.3):
   - reversal velocity (C-13: a CSS transition restarts at zero velocity, against D-1);
   - main-thread cost (C-14);
   - the mid-engage gate hold (C-18).
   The prototype uses the same carriers.
10. Fence note: the two `npx vitest run` invocations let vite's dependency optimizer create `node_modules/.vite/deps` in the checkout (birth time 11:59:47), because `node_modules` is the symlinked checkout's. It is an ignored cache and was left in place. Another process was writing `node_modules/.vite-temp` at 12:00:28, outside this seat's runs.

## 7 · Commands (all under `$S`, harness `H=docs/tranches/BL/design/dock/harness`)

| what | command | output |
|---|---|---|
| builds | `node $H/build.mjs $S/wt --out $S/out --label head` (before any edit), then `… --label d2a` | `$S/out/builds/{head,d2a}` |
| HEAD witnesses | `node $H/run.mjs --build $S/out/builds/head --out $S/out/runs-head` | `$S/out/run-head.log`: 9/0/0/4/0 |
| prototype witnesses | `node $H/run.mjs --build $S/out/builds/d2a --adapter $S/adapter-d2a.mjs --out $S/out/runs-d2a` | `$S/out/run-d2a.log`, `$S/out/runs-d2a/runs/W*-d2a/W*.json` |
| W1, cut dropped | `D2A_NOCUT=1 node $H/run.mjs … --only W1 --out $S/out/runs-d2a-nocut` | `$S/out/run-d2a-nocut.log`: 32/32 |
| typecheck / unit / build | `npm run typecheck`; `npx vitest run tests/components/custom/dock`; `node $S/libbuild.mjs $S/wt $S/libbuild` | §2 |
| smoke, anchor | `node $S/smoke.mjs <build> <adapter> chromium morph`; `node $S/anchor.mjs <build> <adapter>` | §3.2, §3.3 |
| WebKit screenshot probes | `node $S/wkpaint.mjs <build> <adapter> <engine> bare\|forced`; `node $S/qwk.mjs`; `node $S/qwk2.mjs` + `ffmpeg -i video-*/…webm -vf fps=25` | §4 |
| gestalt | `node $S/shots.mjs $S/out/builds/{head,d2a} {head,d2a}`; `node $S/nested.mjs <label> /dock/layers '[data-testid=dock-nested-collapsible]'` | §5 |

## 8 · Open gaps

- **Real Safari 26.4, every cell:** UNMEASURED (owner's safaridriver checkbox). That includes whether shipping Safari paints the registered-property transition, which Playwright WebKit's screencast does.
- **W1 per-frame corner in WebKit:** unobserved, because the instrument snaps the transition (§4). A screencast-based W1 sampler would close it, at video-compression precision.
- **A cross axis taller than one seat:** the closed form reads the cross from tokens, and a dock hosting a column switcher breaks it (§5). No design exists in this family.
- **Vertical `#persistent-end` offset:** not built (percentage `top` against an auto-height row). The horizontal offset is built but not measured on a served page.
- **The open seat's 11.2 px main-axis reach:** not covered by the 6.4 px gutter (S-5). Neither cure was chosen.
- **Floor row 3, C-2, C-3, C-4, C-13:** no mechanism in the family, as the spec states.
- **Reversal velocity, main-thread cost and the gate hold** were not re-measured here. The research numbers stand (`D2-A.md` §3.3, Q6).
- **The unit gates** (motion-parity, `g-dock-lattice`) need re-pointing to a CSS-owned carrier, and the six-member `DockProps` law needs a ruling.
